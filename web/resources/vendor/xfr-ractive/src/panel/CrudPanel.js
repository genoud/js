////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.CrudPanel
 * 
 */

Ext.define("Xfr.panel.CrudPanel", {
    extend: "Xfr.Component",
    requires: [
    ],
    config: {
        cls: "xfr-crud-panel",
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
    initialize: function () {
        this.callParent(arguments);
        var me = this;

        me.setToolbarDisabled(true);

        me.initGrid();
        me.initForm();

        me.switchMode(me.mode);

        me.initCrudPanel();

    },
    initGrid: function () {
        var me = this;
//        console.log("--init grid----------e.getCrudActions().read");
//        console.log(me.getCrudActions());

        var gridConfig = {};
        if (!Ext.isEmpty(me.getGridConfig())) {
            Ext.apply(gridConfig, me.getGridConfig());
        }

        Ext.apply(gridConfig, {
            "processing": true,
            "serverSide": true,
            responsive: true,
            select: {
                style: 'single'
            },
            ajax: {
                url: me.getCrudActions().read,
//                "url": "http://localhost/home/dev/sanaya/customApp/server/ajax.php?mod=user&action=getUsers&callback=jQuery21106965968464501202_1442594610258&_=1442594610259",
                "dataType": "json"
//                "dataType": "jsonp"
            }
        });

//        console.log("grid config ");
//        console.log(gridConfig);

        me.table = $("[data-xfr-grid]", me.$this)
                .addClass("table table-striped display responsive no-wrap")
                .attr({
                    width: "100%"
                })
                .DataTable(gridConfig);


        me.table.on('init', function (e, settings) {
            me.table.columns.adjust();
            me.table.responsive.recalc();
            me.gridInited = true;
            if (me.formLoaded && !me.crudReady) {
                me.switchMode('read');
                me.setToolbarDisabled(false);
                me.crudReady = true;
            }
//            if (!Ext.isEmpty(me.table.row(".selected"))) {
////                $("button[data-xfr-btn-edit],button[data-xfr-btn-delete]", me.$this).show();
//            }
        });
        me.table.on('select', function (e, dt, type, indexes) {
            me.onTableSelect(e, dt, type, indexes);
        });
        me.table.on('deselect', function (e, dt, type, indexes) {
            me.onTableDeselect(e, dt, type, indexes);
        });
    },
    onTableDeselect: function (e, dt, type, indexes) {
        var me = this;
        $("button[data-xfr-btn-edit],button[data-xfr-btn-delete]", me.$this).hide();
        me.formData = null;
        me.selectedTableRow = null;
        me.form.resetForm();

    },
    onTableSelect: function (e, dt, type, indexes) {
        var me = this;
//        var $btnEdit = $("button[data-xfr-btn-edit]", me.$this);
//        var $btnDelete = $("button[data-xfr-btn-delete]", me.$this);
//        if ($btnEdit.hasClass("hide")) {
//            $btnEdit.removeClass("hide");
//        }
//        if ($btnDelete.hasClass("hide")) {
//            $btnDelete.removeClass("hide");
//        }
        $("button[data-xfr-btn-edit],button[data-xfr-btn-delete]", me.$this).show();
        me.selectedTableRow = me.table.rows(indexes);

        var rowData = me.table.rows(indexes).data().toArray();
        var data = rowData[0];

//        delete(data.password);

        me.formData = data;
        console.log("on table select Data");
        console.log(data);
        me.form.setFormData(data);
        $("input[type=hidden][name=id]").val(data.id);
    },
    initForm: function () {
        var me = this;

        var formConfig = {
            renderTo: $("[data-xfr-form-container]", me.$this)[0]
        };
        Ext.apply(formConfig, me.getFormConfig());
//        formConfig.events["formSubmit"] = me.onFormSubmit;
        if (Ext.isEmpty(formConfig.events)) {
            formConfig.events = {};
        }
        formConfig.events["formSubmit"] = function ($elt) {
            me.onFormSubmit();
        };
        formConfig.events["formLoaded"] = function (evt, form) {
            me.onFormLoaded(evt, form);
        };
//        
//         "formLoaded": function (evt, form) {
//                        me.onFormLoaded(evt, form);
//                    }

        me.form = Ext.create(this.getFormClass(), formConfig);
//        $(Mustache.render('<input id="{{id}}" type="hidden" value="{{value}}" />',{
//            id : "i"+me.form.getId())
//        });
    },
    onFormLoaded: function () {
        var me = this;
        me.formLoaded = true;
        if (this.gridInited) {
            me.table.columns.adjust();
            me.table.responsive.recalc();
            if (!me.crudReady) {
                me.switchMode('read');
                me.setToolbarDisabled(false);
                me.crudReady = true;
            }
        }
    },
    onFormSubmit: function () {
        var me = this;
        if (me.toolbarAction === "create") {
            me.createAction();
        } else if (me.toolbarAction === "edit") {
            me.updateAction();
        }

    },
    initCrudPanel: function () {
        var me = this;
        var $crudPanel = $("[data-xfr-crud-grid-form]");
//        $crudPanel.addClass("gridview-tab");
        me.$this.addClass("gridview-tab");
        var $viewsToolbar = $("[data-xfr-views-toolbar]");
        var $gridviewBtn = $("[data-xfr-btn-gridview]");
        $gridviewBtn.addClass("active");

        $("button", $viewsToolbar).click(function () {
            $("button", $viewsToolbar).removeClass("active");
            $(this).addClass("active");
        });

        $("button[data-xfr-btn-create]", me.$this).on("click", function () {
            me.clickOnCreate();
        });
        $("button[data-xfr-btn-edit]", me.$this).on("click", function () {
            me.clickOnEdit();
        });
        $("button[data-xfr-btn-delete]", me.$this).on("click", function () {
            me.clickOnDelete();
        });
        $("button[data-xfr-btn-save]", me.$this).on("click", function () {
            me.clickOnSave();
        });
        $("button[data-xfr-btn-cancel]", me.$this).on("click", function () {
            me.clickOnCancel();
        });
        $("button[data-xfr-btn-formview]", me.$this).on("click", function () {
            me.tabFormView();
        });
        $("button[data-xfr-btn-gridview]", me.$this).on("click", function () {
            me.tabGridView();
        });

//        me.switchMode(me.mode);

    },
    clickOnCreate: function () {
        this.switchMode('edit');
        this.toolbarAction = "create";
        this.form.resetForm();
    },
    clickOnEdit: function () {
        this.toolbarAction = "edit";
        this.switchMode('edit');

    },
    clickOnDelete: function () {
        var me = this;

//        this.table.row('.selected').remove().draw(false);
//
//        var mask = Ext.getCmp("main-mask"), me = this;
//        mask.show();
//        var result = null;
//
//        $.ajax({
//            url: "server/ajax.php?mod=user&action=deleteUser",
//            data: me.$form.serialize(),
//            dataType: "json",
//            success: function (data) {
//                mask.hide();
//                if (data.success) {
//                    me.switchMode('read');
//                    alert(data.message);
//                } else {
//                    if (data.nextAction !== undefined && data.nextAction === "login") {
//                        window.location = "index.php?page=home";
//                    } else if (data.nextAction !== undefined && data.nextAction === "reload") {
//                        window.location = window.location;
//                    } else {
//                        alert("An error occur on server");
//                    }
//                }
//            },
//            error: function () {
//                alert("An error occur on server");
//            }
//
//        });

        Xfr.Msg.show({
            title: "DELETION",
            message: "DO YOU REALLY WANT TO DELETE THIS ITEM?",
            icon: Xfr.Msg.QUESTION,
            btn: [Xfr.Msg.YES, Xfr.Msg.NO],
            action: function (btn) {
                if (btn === Xfr.Msg.YES.text) {
                    me.deleteAction();
                }

            }
        });
    },
    clickOnSave: function () {
        var me = this;
        this.form.$form.submit();
    },
    clickOnCancel: function () {
        this.switchMode('read');
    },
    switchMode: function (mode) {
        console.log("switch mode = " + mode);
        var me = this;
//        view-mode gridview-tab
//        var $crudPanel = $("[data-xfr-crud-grid-form]");
        var me = this;
        if (mode === "read") {
//            $crudPanel.removeClass("edit-mode").addClass("view-mode");
            me.$this.removeClass("edit-mode").addClass("view-mode");
            $("button[data-xfr-btn-create]", me.$this).show();
//            $("button[data-xfr-btn-edit],button[data-xfr-btn-delete]", me.$this).hide();
//            $("", me.$this).hide();
            $(
                    "div[data-xfr-crud-toolbar] button[data-xfr-btn-save], " +
                    "div[data-xfr-crud-toolbar] button[data-xfr-btn-cancel], " +
                    "div[data-xfr-crud-toolbar] button[data-xfr-btn-edit], " +
                    "div[data-xfr-crud-toolbar] button[data-xfr-btn-delete]"
                    ,
                    me.$this
                    ).hide();
            me.mode = "view";

//            console.log("before set disabled true in crud panel");
//            console.log(this.form.$form);
            this.form.setDisabled(true);
        } else if (mode === "edit") {
//            $crudPanel.removeClass("view-mode").addClass("edit-mode");
            me.$this.removeClass("view-mode").addClass("edit-mode");
            $("button[data-xfr-btn-create]", me.$this).hide();
            $("button[data-xfr-btn-edit]", me.$this).hide();
            $("button[data-xfr-btn-delete]", me.$this).hide();
            $("button[data-xfr-btn-save]", me.$this).show();
            $("button[data-xfr-btn-cancel]", me.$this).show();
            me.mode = "edit";
            this.form.setDisabled(false);
        }
    },
    tabFormView: function () {
        var me = this;
        me.$this.removeClass("gridview-tab").addClass("formview-tab");
    },
    tabGridView: function () {
        var me = this;
        me.$this.removeClass("formview-tab").addClass("gridview-tab");
    },
    setToolbarDisabled: function (value) {
        var me = this;
        if (value) {
            $("div[data-xfr-crud-toolbar] button", me.$this).addClass("disabled");
        } else {
            $("div[data-xfr-crud-toolbar] button", me.$this).removeClass("disabled");
        }
    },
    createAction: function () {
        var me = this;
        var crudActions = this.getCrudActions();

        Xfr.Mask.show("Waiting Create Operation ...");

        var formData = new FormData(me.form.$form[0]);
        $.ajax({
            url: crudActions.create,
            ////////*********************/////////////////////
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            ////////*********************/////////////////////            
//            data: me.form.$form.serialize(),
            dataType: "json",
            type: "POST",
            success: function (data) {
                Xfr.Mask.hide();
                if (data.success) {
                    me.switchMode('read');
                    me.table.row.add(data.data).draw();
                    Xfr.Msg.alert("success", data.message);
                } else {
                    Xfr.Msg.show({
                        title: "ERROR",
                        message: "ERROR WHILE CREATING : " + data.message,
                        icon: Xfr.Msg.ERROR
                    });
                }
            },
            error: function () {
                Xfr.Mask.hide();
                Xfr.Msg.show({
                    title: "ERROR",
                    message: "AN ERROR OCCURED IN SERVER",
                    icon: Xfr.Msg.ERROR
                });
            }

        });
    },
    updateAction: function () {
        var me = this;
        me.$this.trigger('beforeUpdate', me);

        var crudActions = this.getCrudActions();

        Xfr.Mask.show("Waiting Update Operation ...");

        var formData = new FormData(me.form.$form[0]);
        $.ajax({
            url: crudActions.update,
            ////////*********************/////////////////////
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            ////////*********************/////////////////////            
//            data: me.form.$form.serialize(),
            dataType: "json",
            type: "POST",
            success: function (data) {
                Xfr.Mask.hide();
                if (data.success) {
                    var row = me.table.row('.selected');
                    console.log('data.data');
                    console.log(data.data);
                    row.data(data.data).draw();
                    Xfr.Msg.alert("success", data.message);
                    me.switchMode('read');
                } else {
                    Xfr.Msg.show({
                        title: "ERROR",
                        message: "ERROR WHILE UPDATING : " + data.message,
                        icon: Xfr.Msg.ERROR
                    });
                }
            },
            error: function () {
                Xfr.Mask.hide();
                Xfr.Msg.show({
                    title: "ERROR",
                    message: "AN ERROR OCCURED IN SERVER",
                    icon: Xfr.Msg.ERROR
                });
            }

        });

    },
    deleteAction: function () {
        var me = this;
        console.log("Waiting Delete Operation ...");
        me.$this.trigger('beforeDelete', me);

        var crudActions = this.getCrudActions();
//        console.log(crudActions);
//        console.log(crudActions.update);
        
        Xfr.Mask.show("Waiting Delete Operation ...");
        $.ajax({
            url: crudActions.destroy+"&id="+me.formData.id,
            dataType: "json",
            type: "POST",
            success: function (data) {
                Xfr.Mask.hide();
                console.log(data);
                if (data.success) {
                    var row = me.table.row('.selected');
                    row.data(data.data).draw();
                    Xfr.Msg.alert("success", data.message);
                    me.switchMode('read');
                } else {
                    Xfr.Msg.show({
                        title: "ERROR",
                        message: "ERROR WHILE DELETING : " + data.message,
                        icon: Xfr.Msg.ERROR
                    });
                }
            },
            error: function () {
                Xfr.Mask.hide();
               Xfr.Msg.show({
                    title: "ERROR",
                    message: "AN ERROR OCCURED IN SERVER",
                    icon: Xfr.Msg.ERROR
                });
            }
        });
    }
});

