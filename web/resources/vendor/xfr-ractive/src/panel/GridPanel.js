////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.GridPanel
 * 
 */

Ext.define("Xfr.panel.GridPanel", {
    extend: "Xfr.Component",
    requires: [],
    config: {
        //        cls: "xfr-crud-panel xfr-grid-panel",
        cls: "xfr-grid-panel",
        formClass: "",
        formConfig: null,
        gridConfig: null,
        crudActions: {
            create: "",
            read: "",
            update: "",
            destroy: ""
        }
    },
    gridInited: false,
    formLoaded: false,
    crudReady: false,
    table: null,
    form: null,
    mode: "read",
    toolbarAction: "",
    formData: null,
    selectedTableRow: null,
    initialize: function() {
        this.callParent(arguments);
        var me = this;

        //        me.setToolbarDisabled(true);

        me.initGrid();
        me.initForm();

        //        me.switchMode(me.mode);

        me.initGridPanel();

    },
    initGrid: function() {
        var me = this;
        //        console.log("--init grid----------e.getCrudActions().read");
        //        console.log(me.getCrudActions());

        var gridConfig = {};
        if (!Ext.isEmpty(me.getGridConfig())) {
            Ext.apply(gridConfig, me.getGridConfig());
        }

        gridConfig = Ext.merge(gridConfig, {
            "processing": true,
            "serverSide": true,
            responsive: true,
            select: {
                style: 'single'
            },
            ajax: {
                //                url: me.getCrudActions().read,
                //                "url": "http://localhost/home/dev/sanaya/customApp/server/ajax.php?mod=user&action=getUsers&callback=jQuery21106965968464501202_1442594610258&_=1442594610259",
                "dataType": "json",
                //                "params": function () {
                //                    return {
                //                        "param1": "qsfqsdfqs",
                //                        "param4": "qsfqsdfqs",
                //                    };
                //                }
                //                "dataType": "jsonp"
            }
        });
        me.gridUrl = gridConfig.ajax.url;


        me.table = $("[data-xfr-grid]", me.$this)
            .addClass("table table-striped display responsive no-wrap")
            .attr({
                width: "100%"
            })
            .DataTable(gridConfig);


        me.table.on('init', function(e, settings) {
            me.table.columns.adjust();
            me.table.responsive.recalc();
            me.gridInited = true;
            //            if (me.formLoaded && !me.crudReady) {
            //                me.switchMode('read');
            //                me.setToolbarDisabled(false);
            //                me.crudReady = true;
            //            }
            //            if (!Ext.isEmpty(me.table.row(".selected"))) {
            ////                $("button[data-xfr-btn-edit],button[data-xfr-btn-delete]", me.$this).show();
            //            }
        });
        //        me.table.on('select', function (e, dt, type, indexes) {
        //            me.onTableSelect(e, dt, type, indexes);
        //        });
        //        me.table.on('deselect', function (e, dt, type, indexes) {
        //            me.onTableDeselect(e, dt, type, indexes);
        //        });
    },
    initForm: function() {
        var me = this;

        var formConfig = {
            renderTo: $("[data-xfr-form-container]", me.$this)[0],
            listeners : {
                initialize : "onFormInitialized",
                scope : me
            }
        };
        Ext.apply(formConfig, me.getFormConfig());
        //        formConfig.events["formSubmit"] = me.onFormSubmit;


        if (Ext.isEmpty(formConfig.events)) {
            formConfig.events = {};
        }
        /*
        formConfig.events["initialized"] = function($elt) {
            me.onFormInitialized();
        };
        */
        //        formConfig.events["formLoaded"] = function (evt, form) {
        //            me.onFormLoaded(evt, form);
        //        };

        var actions = this.getPanelData().actions;
        formConfig.actions = actions;
        me.form = Ext.create(this.getFormClass(), formConfig);

    },
    onFormInitialized: function() {
        console.log("on form initialized");
        var me = this;

        var $formContainer = $("[data-xfr-form-container]", me.$this);
        var $filterFormContainer = $("[data-filter-form-container]", $formContainer);
        var $form = $("form", $formContainer);
        $("button[data-xfr-btn-reset]", $formContainer).on("click", function() {
            $form[0].reset();
        });

        $("button[data-xfr-btn-apply]", $formContainer).on("click", function() {
            var $form = $("form", $formContainer);
            var formData = $form.serialize();

            var url = me.gridUrl + "?" + formData;
            me.table.ajax.url(url);
            console.log("reload--------");
            me.table.ajax.reload();
        });
        $("button[data-btn-filter-action]", $formContainer).each(function(index, item) {
            console.log("item index");
            console.log(index);

            console.log("item");
            console.log(item);

            $(item).click(function() {
                console.log("click on filter action");
                console.log($(this));
                var elt = $(this);
                //console.log($(elt).data("param"));
                var param = $(elt).data("param");
                //console.log("panelClass=" + param.panelClass);
                //console.log("gridUrl=" + param.gridUrl);
                me.gridUrl = param.gridUrl;
                if (!Ext.isEmpty(me.filterFormCmp)) {
                    me.filterFormCmp.destroy();
                } else {
                    $filterFormContainer.empty();
                }
                me.filterFormCmp = Ext.create(param.panelClass, {
                    renderTo: $filterFormContainer[0]
                });

            });

        });
    },
    onFormSubmit: function() {
        var me = this;
        if (me.toolbarAction === "create") {
            me.createAction();
        } else if (me.toolbarAction === "edit") {
            me.updateAction();
        }

    },
    initGridPanel: function() {
        var me = this;
        var $crudPanel = $("[data-xfr-crud-grid-form]");

        $("button[data-xfr-btn-filter]", me.$this).on("click", function() {
            console.log("filter");
            me.toggleFilter();
        });
    },
    toggleFilter: function() {
        var me = this;
        //        me.$this.removeClass("gridview-tab").addClass("formview-tab");
        $("[data-grid-filter]").animate({
            width: 'toggle'
        }, {
            duration: 300,
            complete: function() {
                console.log("complete");
                if (!$(this).is(":visible")) {
                    $(this).removeClass("filter-visibility").removeAttr("style");
                    //                    $(this).addClass("filter-visibility").removeAttr("style");
                } else {
                    $(this).addClass("filter-visibility").removeAttr("style");
                }
            }
        });
        //                .toggleClass("filter-visibility");
    }
});
