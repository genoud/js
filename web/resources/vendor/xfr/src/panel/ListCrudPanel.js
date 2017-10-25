////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.ListCrudPanel
 * 
 */
Ext.define("Xfr.panel.ListCrudPanel", {
    extend: "Xfr.Component",
    requires: [
        //"Xfr.plugin.Pagination",
        //"Xfr.plugin.PagingSize",
        //"Xfr.plugin.GridSearch",
        //"Xfr.plugin.Multiselect",
        //"Xfr.plugin.AddNewElement"
    ],
    config: {
        cls: "xfr-list-crud-panel",
        dynamicTplClass: "Xfr.panel.ListCrudPanel",
        canAddNew: false,
        canEdit: false,
        canAddExist: true,
        searchArea: false,
        canDeleteCrud: false,
        form: null,
        grid: null,
        plugins: [],
        entityName: '',
        placeHolder: '',
        urlPathGrid: '',
        urlPathSelect: '',
        urlActionSelect: '',
        urlRemoveGrid: '',
        urlEditGrid: '',
        urlAddNew: '',
        multiselect: null
    },
    toolbarAction: "",
    property: '',
    id: '',
    customParams: '',
    initialize: function() {
        var me = this;
        this.innitPlugins();

        this.callParent(arguments);

        this.innitCustomParams();

        if (this.getCanAddNew() || this.getCanEdit()) {
            this.innitForm();
        }

        this.innitGrid();

        $("[data-button-back]", me.$this).click(function() {
            me.clickOnBackButton();
        });
        $("[data-button-save]", me.$this).click(function() {
            me.clickOnSaveButton();
        });

        $("[data-form-tab]", me.$this).hide();

    },
    clickOnBackButton: function() {
        this.closeForm();
    },
    clickOnSaveButton: function() {
        var me = this,
            formCmp = me.getForm(),
            form = $("form:first", formCmp.$this);

        form.submit();
    },
    innitCustomParams: function() {
        var me = this;
        $("span[data-span-additionals]").each(function(index, span) {
            var property = $(this).attr("data-xfr-params-add-name");
            var value = $(this).attr("data-xfr-params-add-value");
            if (value === undefined) {
                value = me.config.relatedData.id;
            }
            if (me.customParams.length > 0) {
                me.customParams = me.customParams + "&";
            }
            me.customParams = me.customParams + "" + property + "=" + value;
        });
    },
    innitGrid: function() {
        var me = this;
        var positions = $('[data-xfr-list-grid-container]');
        var position = positions[0];

        var pluginsItems = [{
            xtype: "pagination",
            position: "[data-table-paging]"
        }, {
            xtype: "pagingsize",
            position: "[data-table-page-size]"
        }, {
            xtype: "gridsearch",
            position: "[data-table-form-search]"
        }];

        var gridConfig = Ext.apply(this.getGrid(), {
            renderTo: position,
            maskOnLoad: false,
            height: '100%',
            width: '100%',
            plugins: pluginsItems,
            type: "standard",
            store: Ext.create("Xfr.data.Store", {
                //xtype: "xstore",
                //autoload: false,
                proxy: {
                    url: Routing.generate(this.getUrlPathGrid(), {
                        _locale: appConfig.locale
                    }) + "?id=" + this.config.relatedData.id + "&" + this.customParams,
                    reader: {
                        totalProperty: "recordsFiltered"
                    },
                    limitParam: "length",
                    startParam: "start",
                    searchParam: "search[value]"
                },
                pageSize: 10
            })
        });

        this.setGrid(Ext.create("Xfr.panel.Grid", gridConfig));

        var grid = me.getGrid();

        grid.getStore().on({
            load: {
                scope: me,
                fn: "onStoreLoaded"
            },
            beforeload: {
                scope: me,
                fn: "beforeLoadStore"
            }
        });

        me.mask();
    },
    beforeLoadStore: function() {
        var me = this;
        // var grid = me.getGrid();
        //alert("before load store");
        me.mask();
    },
    onStoreLoaded: function() {
        //alert("onStoreLoaded");
        var me = this;
        me.innitGridActions();
        me.unmask();
        // var grid = me.getGrid();
        // grid.unmask();
    },
    reloadGrid: function() {
        this.getGrid().reload();
    },
    innitGridActions: function() {
        var me = this;
        if (this.getCanEdit() === false) {
            $("button[data-table-button-edit]").each(function(index, button) {
                $(button).hide();
            });
        } else {
            $("button[data-table-button-edit]").each(function(index, button) {
                $(button).click(function() {
                    var i = $(this).attr("data-edit-id");
                    me.property = $(this).attr("data-edit-property");
                    me.id = i;
                    me.onEditClick(i);
                });
            });
        }
        $("button[data-table-button-delete]").each(function(index, button) {

            $(button).click(function() {
                var id = $(this).attr("data-delete-id");
                var property = $(this).attr("data-delete-property");
                me.onDeleteClick(id, property);
            });
        });
    },
    onDeleteClick: function(id, property) {
        var me = this;
        //Xfr.Mask.show("Opération encours ...");
        me.mask(appConfig.translations.operationInProgress);


        var del = '';
        if (me.getCanDeleteCrud()) {
            del = '&delete=true';
        }
        $.ajax({
            url: Routing.generate(me.getUrlRemoveGrid(), {
                _locale: appConfig.locale
            }) + '?id=' + me.config.relatedData.id + '&' + property + "=" + id + del + "&" + me.customParams,
            type: "POST",
            success: function(data, textStatus, jqXHR) {
                //Xfr.Mask.hide();
                me.unmask();
                var response = JSON.parse(data);
                if (response.success) {
                    Xfr.Msg.show({
                        title: appConfig.translations.success,
                        message: response.message,
                        icon: Xfr.Msg.SUCCESS,
                        action: function(btn) {
                            if (btn === Xfr.Msg.OK.text) {
                                me.reloadGrid();
                            }
                        }
                    });
                } else {
                    Xfr.Msg.show({
                        title: appConfig.translations.error,
                        message: response.message,
                        icon: Xfr.Msg.ERROR
                    });
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // Xfr.Mask.hide();
                me.unmask();
                Xfr.Msg.show({
                    title: appConfig.translations.error,
                    message: appConfig.translations.serverError,
                    icon: Xfr.Msg.ERROR
                });
            }
        });
    },
    innitPlugins: function() {
        var me = this;

        if (this.config.canAddExist) {
            this.config.plugins.push(
                Ext.merge(me.getMultiselect(), {
                    xtype: "multiselect",
                    position: "[data-multiselect-pos]"
                })
            );
        }

        if (this.config.canAddNew) {
            this.config.plugins.push({
                xtype: "addnewelement",
                position: "[data-add-new-pos]"
            });
        }
    },
    innitForm: function() {
        var me = this;
        var classname = me.getForm().className;
        var formConfig = Ext.apply(me.getForm(), {
            height: "100%",
            padding: "10px 20px",
            slimscroll: {
                height: '100%',
                alwaysVisible: true,
                color: "#004826"
            },
            renderTo: $("[data-xfr-list-form-container]")[0],
            listeners: {
                "afterrendertpl": {
                    scope: me,
                    fn: "afterRenderForm"
                },
                "formsubmit": {
                    scope: me,
                    fn: "onFormSubmit"
                }
            }
        });
        this.setForm(Ext.create(classname, formConfig));

    },
    afterRenderForm: function() {
        console.log("after render form");
        var me = this,
            formCmp = me.getForm(),
            form = $("form:first", formCmp.$this);

        console.log(formCmp);
        console.log(form);

        form.find("button[data-xfr-btn-create]").parent().remove();
    },
    onFormSubmit: function() {
        var me = this;
        if (me.toolbarAction === "create") {
            me.createAction();

        } else if (me.toolbarAction === "edit") {
            me.updateAction();
        }
    },
    createAction: function() {
        var me = this;

        // Xfr.Mask.show("Waiting Create Operation ...");
        me.mask("Waiting Create Operation ...");

        me.fireEvent('beforecreate', me);

        //var formData = new FormData(me.getForm().$form[0]);
        //var formData = me.getForm().getData();
        var formData = me.getForm().getFormData();

        // console.log("create action ------------");
        // console.log(formData);

        $.ajax({
            url: Routing.generate(me.getUrlAddNew(), {
                _locale: appConfig.locale
            }) + "?" + me.customParams,
            type: "POST",
            data: formData,
            success: function(data) {
                // Xfr.Mask.hide();
                me.unmask();
                var response = JSON.parse(data);
                if (response.success) {
                    me.closeForm();
                    // me.table.row.add(data.data).draw();
                    //me.getGrid().setDataAt(me.selectedGridIndex, data.data);
                    me.getGrid().reload();

                    Xfr.Msg.alert(appConfig.translations.success, response.message);
                } else {
                    Xfr.Msg.show({
                        title: appConfig.translations.error,
                        message: response.message,
                        icon: Xfr.Msg.ERROR
                    });
                }
            },
            error: function() {
                // Xfr.Mask.hide();
                me.unmask();
                Xfr.Msg.show({
                    title: appConfig.translations.error,
                    message: appConfig.translations.serverError,
                    icon: Xfr.Msg.ERROR
                });
            }

        });
    },
    updateAction: function() {
        var me = this;

        me.fireEvent('beforeupdate', me);

        // Xfr.Mask.show("Waiting Update Operation ...");
        me.mask(appConfig.translations.operationInProgress);

        //var formData = new FormData(me.getForm().$form[0]);
        //var formData = me.getForm().getData();
        var formData = me.getForm().getFormData();

        console.log("update action ------------");
        console.log(formData);

        $.ajax({
            url: Routing.generate(me.getUrlEditGrid(), {
                _locale: appConfig.locale
            }) + '?' + me.property + "=" + me.id + "&" + me.customParams,
            data: formData,
            type: "POST",
            success: function(data) {
                // Xfr.Mask.hide();
                me.unmask();
                var response = JSON.parse(data);
                if (response.success) {
                    me.closeForm();
                    me.getGrid().reload();
                    Xfr.Msg.alert(appConfig.translations.success, response.message);
                } else {
                    Xfr.Msg.show({
                        title: appConfig.translations.error,
                        message:  response.message,
                        icon: Xfr.Msg.ERROR
                    });
                }
            },
            error: function() {
                //Xfr.Mask.hide();
                me.unmask();
                Xfr.Msg.show({
                    title: appConfig.translations.error,
                    message: appConfig.translations.serverError,
                    icon: Xfr.Msg.ERROR
                });
            }

        });

    },
    openForm: function() {
        var me = this;
        // $('[data-xfr-list-grid-container]').hide();
        // $('[data-xfr-list-form-container]').show();
        $('[data-grid-tab]', me.$this).hide();
        $('[data-form-tab]', me.$this).show();

        this.toolbarAction = "create";
    },
    closeForm: function() {
        var me = this;
        // $('[data-xfr-list-grid-container]').show();
        // $('[data-xfr-list-form-container]').hide();

        $('[data-form-tab]', me.$this).hide();
        $('[data-grid-tab]', me.$this).show();

        this.toolbarAction = "edit";
    },
    onEditClick: function(id) {
        id = parseInt(id);
        var grid = this.getGrid();
        var data = {};
        for (var i = 0; i < grid._data.length; i++) {
            if (grid._data[i].id === id) {
                data = grid._data[i];
            }

        }

        this.getForm().setData(data);
        this.getForm().setMode('edit');
        this.getForm().binder.set("mode", 'edit');
        this.openForm();
        this.toolbarAction = "edit";
    }
});
