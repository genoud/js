////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.CrudPanel
 * 
 */
Ext.define("Xfr.panel.CrudPanel", {
    extend: "Xfr.Component",
    requires: [],
    config: {
        cls: "xfr-crud-panel",
        /*formClass: "",*/
        /*formConfig: null,
         gridConfig: null,*/
        form: null,
        grid: null,
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
    mode: "read",
    toolbarInited: false,
    toolbarAction: "",
    formData: null,
    selectedGridIndex: -1,
    gridPosition: "data-role-grid-container",
    initialize: function () {
        this.callParent(arguments);

        var me = this;

        if (me.mode === "read") {
            me.$this.removeClass("edit-mode").addClass("view-mode");
        } else if (me.mode === "edit") {
            me.$this.removeClass("view-mode").addClass("edit-mode");
        }

        if(me.getMaskOnItemsLoading()){
            me.mask();
        }


        me.setToolbarDisabled(true);

        me.initGrid();
        
        me.initView();
        
        me.initForm();

        me.switchMode(me.mode);

        //me.initCrudPanel();
    },
    initGrid: function () {

        var me = this;

        if (!Xfr.isXfrInstance(me.getGrid())) {
            var gridConfig = Ext.apply(me.getGrid(), {
                renderTo: $("["+gridPosition+"]", me.$this)[0],
                maskOnLoad: false
            });
            me.setGrid(Xfr.createWidget(gridConfig));
        }

        var grid = me.getGrid();
        me.getChildren().push(grid);
        grid.setParent(me);

        grid.on({
            select: {
                scope: me,
                fn: "onGridSelect"
            }
        });

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

        /*me.table.on('deselect', function(e, dt, type, indexes) {
         me.onTableDeselect(e, dt, type, indexes);
         });*/

    },
    beforeLoadStore: function () {
        var me = this;
        me.mask();
    },
    onStoreLoaded: function () {
        var me = this;
        me.gridInited = true;

        if (me.formLoaded && me.gridInited) {
            me.initCrudOnReady();
        }
    },
    // onGridDeselect: function(grid, selectedIndex, selectedRecord, selectedIndexes, selectedRecords) {
    //     var me = this;
    //     $("button[data-action-type=edit],button[data-action-type=delete]", me.$this).hide();
    //     me.formData = null;
    //     me.selectedTableRow = null;
    //     me.getForm().resetForm();

    // },
    onGridSelect: function (grid, selectedIndex, selectedRecord, selectedIndexes, selectedRecords) {
        var me = this;
        $("button[data-action-type=edit],button[data-action-type=delete]", me.$this).show();
        me.selectedGridIndex = selectedIndex;
        // console.log(selectedRecord);    
        me.getForm().resetForm();
        me.getForm().setData({});
        me.getForm().setData(selectedRecord);
    },
    initForm: function () {
        var me = this;
        if (!Xfr.isXfrInstance(me.getForm())) {
            var formConfig = Ext.merge(me.getForm(), {
                renderTo: $("[data-xfr-form-container]", me.$this)[0],
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
            me.setForm(Xfr.createWidget(formConfig));

            me.getChildren().push(me.getForm());
            me.getForm().setParent(me);

        }
    },
    afterRenderForm: function () {
        // console.log("------on form loaded in crudpanel------------------");
        var me = this;
        me.formLoaded = true;

        if (me.formLoaded && me.gridInited && !me.crudReady) {
            me.initCrudOnReady();
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
    initCrudOnReady: function () {
        var me = this;
        me.setToolbarDisabled(false);
        me.crudReady = true;
        me.switchMode('read');
        me.unmask();
    },
    initCrudPanel: function () {
        var me = this;

        var $crudPanel = $("[data-xfr-crud-grid-form]");

        me.$this.addClass("gridview-tab");
        var $viewsToolbar = $("[data-xfr-views-toolbar]");
        var $gridviewBtn = $("[data-xfr-btn-gridview]");
        $gridviewBtn.addClass("active");

        $("button", $viewsToolbar).click(function () {
            $("button", $viewsToolbar).removeClass("active");
            $(this).addClass("active");
        });

        $("button[data-action-type=create]", me.$this).on("click", function () {
            me.clickOnCreate();
        });
        $("button[data-action-type=edit]", me.$this).on("click", function () {
            me.clickOnEdit();
        });
        $("button[data-action-type=delete]", me.$this).on("click", function () {
            me.clickOnDelete();
        });
        $("button[data-action-type=save]", me.$this).on("click", function () {
            me.clickOnSave();
        });
        $("button[data-action-type=cancel]", me.$this).on("click", function () {
            me.clickOnCancel();
        });
        $("button[data-xfr-btn-formview]", me.$this).on("click", function () {
            me.tabFormView();
        });
        $("button[data-xfr-btn-gridview]", me.$this).on("click", function () {
            me.tabGridView();
        });

        $("button[data-action-type=custom]", me.$this).on("click", function () {
            me.clickOnCustom($(this));
        });

        //        me.switchMode(me.mode);

    },
    clickOnCreate: function () {
        this.toolbarAction = "create";
        this.switchMode('edit');
        this.getForm().resetForm();
        this.getGrid().unselectAllRows();
    },
    clickOnEdit: function () {
        this.toolbarAction = "edit";
        this.switchMode('edit');

    },
    clickOnDelete: function () {
        var me = this;
        Xfr.Msg.show({
            title: appConfig.translations.deletion,
            message: appConfig.translations.deletionMsg,
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
        var me = this,
                $form = $("form:first", me.getForm().$this);
        $form.submit();
    },
    clickOnCancel: function () {
        this.switchMode('read');
    },
    switchMode: function (mode) {
        // console.log("switch mode = " + mode);
        var me = this;

        if (mode === "read") {

            me.removeFormErrors();

            me.$this.removeClass("edit-mode").addClass("view-mode");
            $("button[data-action-type=create]", me.$this).removeAttr("disabled").show();

            $(
                    "div[data-xfr-crud-toolbar] button[data-action-type=save], " +
                    "div[data-xfr-crud-toolbar] button[data-action-type=cancel] ",
                    me.$this
                    ).hide();

            if (me.toolbarAction === "edit" && me.getGrid().getStore().getData().length > 0) {
                console.log("hide edit and delete button on switch mode to read");
                $(
                        "div[data-xfr-crud-toolbar] button[data-action-type=edit], " +
                        "div[data-xfr-crud-toolbar] button[data-action-type=delete]",
                        me.$this
                        ).show();
                //me.toolbarInited = true;
            } else {
                $(
                        "div[data-xfr-crud-toolbar] button[data-action-type=edit], " +
                        "div[data-xfr-crud-toolbar] button[data-action-type=delete]",
                        me.$this
                        ).hide();
            }
            $("button[data-action-type=custom]", me.$this).show();
            me.mode = "read";

            if (me.crudReady) {
                this.getForm().setDisabled(true);
            }
            // 
            // console.log("switching on read mode ================gridSelectionLength=" + me.getGrid().getSelectedIndexes().length);
            // if (me.getGrid().getSelectedIndexes().length > 0) {
            //     if (me.crudReady) {
            //         this.getForm().setMode(mode);
            //     }
            // } 
            // else {
            //     if (me.crudReady) {
            //         me.getForm().setMode("edit");
            //     }
            // }

        } else if (mode === "edit") {
            me.$this.removeClass("view-mode").addClass("edit-mode");

            $("button[data-action-type=create]", me.$this).hide();
            $("button[data-action-type=edit]", me.$this).hide();
            $("button[data-action-type=delete]", me.$this).hide();
            $("button[data-action-type=custom]", me.$this).hide();

            $("button[data-action-type=save]", me.$this).show().removeAttr("disabled");
            ;
            $("button[data-action-type=cancel]", me.$this).show().removeAttr("disabled");
            ;
            me.mode = "edit";

            if (me.crudReady) {
                this.getForm().setDisabled(false);
            }
        }
        this.getForm().setMode(mode);
        this.getForm().binder.set("mode", mode);

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
    removeFormErrors: function () {
        var me = this,
                form = $("form:first", me.getForm().$this);
        $("div.error-panel", form).remove();
    },
    showFormErrors: function (errors) {
        if (Ext.isEmpty(errors)) {
            return;
        }
        var me = this,
                form = $("form:first", me.getForm().$this),
                errorForm = "";


        form.remove(".error-panel");

        for (var i = 0; i < errors.length; i++) {
            var errorsObj = errors[i];
            for (var field in errorsObj) {
                errorForm += '<div class="error-item">' +
                        '<label class="error">' + field + ' : ' + errorsObj[field] + ' </label>' +
                        '</div>';
            }
        }
        ;
        $('<div class="error-panel"> <h5 class="error-title">' + appConfig.translations.formErrors + ':</h5> ' + errorForm + ' </div>').prependTo(form);
        $('<div class="error-panel"> <h5 class="error-title">' + appConfig.translations.formErrors + ':</h5> ' + errorForm + ' </div>').appendTo(form);

    },
    beforeCreate: function (opts) {
    },
    afterCreate: function () {
    },
    createAction: function (callback) {
        var me = this;
        var crudActions = this.getCrudActions();

        Xfr.Mask.show(appConfig.translations.operationInProgress);


        //var formData = new FormData(me.getForm().$form[0]);
        //var formData = me.getForm().getData();
        //var formData = me.getForm().getFormData();
        //var formData = new FormData(this);
        //var form = $("form:first", me.getForm().$this);   

        var form = $("form:first", me.$this);
        formData = new FormData(form[0]);
        //console.log("form");
        //console.log(form);


        var opts = {
            url: crudActions.create,
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            dataType: "json",
            type: "POST"
        };

        me.beforeCreate(opts);
        me.fireEvent('beforecreate', me);


        // console.log("create action ------------");
        // console.log(formData);
        $.ajax(Ext.merge(opts, {
            success: function (data) {
                Xfr.Mask.hide();
                if (data.success) {
                    me.switchMode('read');

                    // me.table.row.add(data.data).draw();
                    //me.getGrid().setDataAt(me.selectedGridIndex, data.data);
                    me.getGrid().reload();
                    me.removeFormErrors();
                    Xfr.Msg.alert("success", data.message);
                    if (typeof (callback) === 'function') {
                        callback(data);
                    }
                } else {
                    me.showFormErrors(data.data);
                    Xfr.Msg.show({
                        title: appConfig.translations.error,
                        message: data.message,
                        icon: Xfr.Msg.ERROR
                    });

                }
            },
            error: function () {
                Xfr.Mask.hide();
                Xfr.Msg.show({
                    title: appConfig.translations.error,
                    message: appConfig.translations.serverError,
                    icon: Xfr.Msg.ERROR
                });
            }
        }));

        me.afterCreate();
        me.fireEvent('aftercreate', me);
    },
    beforeUpdate: function (opts) {
    },
    afterUpdate: function () {
    },
    updateAction: function () {
        var me = this;


        var crudActions = this.getCrudActions();

        Xfr.Mask.show(appConfig.translations.operationInProgress);

        var form = $("form:first", me.getForm().$this);
        console.log("form");
        console.log(form);
        var formData = new FormData(form[0]);
        //var formData = me.getForm().getData();
        //var formData = me.getForm().getFormData();
        //var formData = new FormData(this);

        console.log("update action ------------");
        console.log(formData);
        var opts = {
            url: crudActions.update,
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            dataType: "json",
            type: "POST"
        };

        me.beforeUpdate(opts);
        me.fireEvent('beforeupdate', me);

        $.ajax(Ext.merge(opts, {
            success: function (data) {
                Xfr.Mask.hide();
                if (data.success) {
                    console.log('data.data');
                    console.log(data.data);
                    me.getGrid().setDataAt(me.selectedGridIndex, data.data);
                    me.getForm().setData(data.data);

                    Xfr.Msg.alert("success", data.message);
                    me.removeFormErrors();
                    me.switchMode('read');
                } else {
                    me.showFormErrors(data.data);
                    Xfr.Msg.show({
                        title: appConfig.translations.error,
                        message: data.message,
                        icon: Xfr.Msg.ERROR
                    });
                }
            },
            error: function () {
                Xfr.Mask.hide();
                Xfr.Msg.show({
                    title: appConfig.translations.error,
                    message: appConfig.translations.serverError,
                    icon: Xfr.Msg.ERROR
                });
            }
        }));

        me.afterUpdate();
        me.fireEvent('afterupdate', me);

    },
    beforeDelete: function (opt) {
    },
    deleteAction: function () {
        var me = this;
        console.log(appConfig.translations.operationInProgress);


        var crudActions = this.getCrudActions();
        //        console.log(crudActions);
        //        console.log(crudActions.update);

        Xfr.Mask.show(appConfig.translations.operationInProgress);


        var opts = {
            url: crudActions.destroy,
            dataType: "json",
            type: "POST"
        };

        me.beforeDelete(opts);
        me.fireEvent('beforedelete', me);

        $.ajax(Ext.merge(opts, {
            success: function (data) {
                Xfr.Mask.hide();
                console.log(data);
                if (data.success) {

                    // var row = me.table.row('.selected');                    
                    // row.data(data.data).draw();
                    // 
                    // 
                    me.getGrid().reload();
                    me.getForm().resetForm();

                    Xfr.Msg.alert(appConfig.translations.success, data.message);
                    me.removeFormErrors();
                    me.switchMode('read');
                } else {
                    me.showFormErrors(data.data);
                    Xfr.Msg.show({
                        title: appConfig.translations.error,
                        message: data.message,
                        icon: Xfr.Msg.ERROR
                    });
                }
            },
            error: function () {
                Xfr.Mask.hide();
                Xfr.Msg.show({
                    title: appConfig.translations.error,
                    message: appConfig.translations.serverError,
                    icon: Xfr.Msg.ERROR
                });
            }
        }));
    },
    clickOnCustom: function (button) {
        alert('define custom action');
    },
    initView: function () {
        
    }
});
