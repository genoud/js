Ext.define("JS.panel.SymfonyCrudPanel", {
    extend: "Xfr.panel.CrudPanel",
    requires: [
    ],
    config: {
        form: {},
        grid: {},
        view: {},
        page: {
            title: "",
            data: null,
            parent: null
        },
        panelData: {
            url: "",
            panelClass: "",
            formUrl: "",
            gridUrl: "",
            actions: []
        },
        crudActions: {
            create: "",
            read: "",
            update: "",
            destroy: ""
        },
        crudButtons: [],
        basePageUrl: "homepage",
        dynamicTplClass: "Xfr.panel.CrudPanel",
        gridPosition: "[data-role-grid-container]",
        viewPosition: "[data-role-view-container]",
        formPosition: "[data-role-form-container]",
        selectedRecord: null,
        parentRecord: null,
        indexAction: 0
                //parentName: "",
                //parentPane: null,
                //parentTitle: ""
    },
    initialize: function () {

        Xfr.Mask.show('Chargement...');

        var me = this;

        var panelData = me.getPanelData(),
                basePageUrl = me.getBasePageUrl(),
                crudButtons = [],
                itemButtons = [];


        // console.log("panel data in SymfonyCrudPanel.js++++++++++++++++++++++");
        // console.log(panelData);

        //check crudButtons and itemButtons
        for (var i = 0; i < panelData.actions.length; i++) {
            var action = panelData.actions[i];
            if (!Ext.isEmpty(action.param)) {
                var param = Ext.decode(action.param);
                if (!Ext.isEmpty(param.visibilityMode)) {
                    var mode = $.trim(param.visibilityMode);
                    if (mode === "list") {
                        crudButtons.push({
                            "action": param.actionType,
                            text: action.libelle,
                            url: param.url
                        });
                    } else if (mode === "item") {
                        itemButtons.push({
                            panelClass: param.panelClass,
                            text: action.libelle,
                            icon: action.icon
                        });
                    }
                }
            }
        }



        panelData.url = panelData.formUrl;
        var formUrl = panelData.formUrl;
        var gridUrl = panelData.gridUrl;

        // console.log("in SymfonyCrudPanel.js--------------formUrl = " + formUrl);
        // console.log("in SymfonyCrudPanel.js--------------gridUrl = " + gridUrl);

        me.setConfig({
            height: "100%",
            /*form: Ext.apply(me.config.form, {
             formButtons: itemButtons,
             maskOnItemsLoading: false,
             panelData: panelData,
             }),
             grid: Ext.apply(me.config.grid, {
             xtype: "xgrid",
             height: "100%",
             width: "100%",
             plugins: [{
             xtype: "pagination",
             position: "[data-table-paging]"
             }, {
             xtype: "pagingsize",
             position: "[data-table-page-size]"
             }, {
             xtype: "gridsearch",
             position: "[data-table-form-search]"
             }, ],
             store: {
             xtype: "xstore",
             proxy: {
             url: gridUrl,
             reader: {
             totalProperty: "recordsFiltered"
             },
             limitParam: "length",
             startParam: "start",
             searchParam: "search[value]"
             }
             }
             }),*/
            crudButtons: crudButtons,
            formButtons: itemButtons,
            crudActions: {
                create: formUrl + "",
                read: gridUrl + "",
                update: formUrl + "",
                destroy: formUrl + "&delete=true"
            },
            listeners: {
                "beforeupdate": {
                    scope: me,
                    fn: "beforeUpdate"
                },
                "beforedelete": {
                    scope: me,
                    fn: "beforeDelete"
                }
            }
        });

        this.callParent(arguments);

        //$("a[data-action-type=back]").on('click', function () {
        //
        //
        //    me.destroy();
        //    me.config.parentPane.show();
        //});

        me.afterInnitialize();
    },
    afterRenderForm: function (formCmp) {
        this.callParent();

        // var formCmp = this.getForm();


        var me = this,
                form = $("form:first", formCmp.$this);
        formCmp.$this.attr("data-xfr-form", "");

        formCmp.$this.find("input[type=submit]").parent().remove();


        //formCmp.$this.find("button[data-form-button]").each(function(index, button) {
        $("button[data-form-button]", formCmp.$this).each(function (index, button) {
            // console.log("init button");
            // console.log(button);

            $(button).click(function () {
                // console.log("on click on action");
                var url = $(this).attr("data-url");
                var title = $(this).attr("data-panel-title");
                //console.log("Form Data");
                //console.log(formCmp.getData());
                if (url && url != undefined && url != "") {
                    /* Xfr.RemoteWindow.show(title, Routing.generate(url,
                     {_locale: appConfig.locale, _format: "pdf"}) + '?id=' + formCmp.getData().id);*/
                    return;
                }
                var panelClass = $(this).attr("data-panel-class");

                var size = $(this).attr("data-panel-size");
                if (size === undefined) {
                    size = 'auto';
                }
                var principals = $("[xfr-window-conteiner-principal]");
                //if(principals.length>0){
                principals.remove();
                //}
                var window = Ext.create("Xfr.panel.Window", {
                    size: size,
                    title: title,
                    renderTo: document.body,
                    items: [{
                            className: panelClass,
                            height: "100%",
                            position: '[xfr-window-content]',
                            relatedData: formCmp.getData()
                        }]
                });
                window.show();
            });
        });


    },
    afterCreate: function () {
        var me = this;
        console.log("after create");
        //me.getGrid().reload();

        // me.getForm().setDefaultSelectValue(false);
    },
    beforeCreate: function (opts) {
        var me = this;
        var crudActions = me.getCrudActions();
        if (!Ext.isEmpty(crudActions.create)) {
            me.getForm().setDefaultSelectValue(true);
            var form = $("form:first", me.getForm().$this);
            var formData = new FormData(form[0]);
            opts.data = formData;
        }
    },
    afterUpdate: function () {
        var me = this;
        me.getForm().setDefaultSelectValue(false);
    },
    beforeUpdate: function (opts) {
        var me = this;
        var crudActions = me.getCrudActions();
        if (!Ext.isEmpty(crudActions.update)) {
            me.getForm().setDefaultSelectValue(true);
            var form = $("form:first", me.getForm().$this);
            var formData = new FormData(form[0]);
            opts.data = formData;
            opts.url = crudActions.update + "&id=" + me.getForm().getData().id;
        }
    },
    beforeDelete: function (opts) {
        var me = this;
        var crudActions = me.getCrudActions();
        alert("beforeDelete");
        if (!Ext.isEmpty(crudActions.destroy)) {
            me.getForm().setDefaultSelectValue(true);
            var form = $("form:first", me.getForm().$this);
            var formData = new FormData(form[0]);
            opts.data = formData;
            opts.url = crudActions.destroy + "&id=" + me.getForm().getData().id;
        }
    },
    initGrid: function () {
        var me = this;
        var extraP = {};
        if (me.config.parentRecord) {
            var prop = me.config.parentName;
            extraP[prop] = me.config.parentRecord.id;
        }
        var panelData = me.getPanelData();
        var gridContainer = $(me.getGridPosition(), me.$this)[0];
        var grid = Ext.create("Xfr.panel.Grid", {
            position: me.getGridPosition(),
            renderTo: gridContainer,
            dynamicTplClass: me.config.grid.dynamicTplClass,
            store: {
                xtype: "xstore",
                proxy: {
                    url: panelData.gridUrl,
                    reader: {
                        totalProperty: "recordsFiltered"
                    },
                    limitParam: "length",
                    startParam: "start",
                    searchParam: "search",
                    extraParams: extraP
                }
            },
            type: me.config.grid.type,
            height: "100%",
            width: "100%",
            plugins: [{
                    xtype: "pagination",
                    position: "[data-table-paging]"
                }, {
                    xtype: "pagingsize",
                    position: "[data-table-page-size]"
                }, {
                    xtype: "gridsearch",
                    position: "[data-table-form-search]"
                }]
        });

        /*grid.on({
         select: {
         scope: me,
         fn: "onGridSelect"
         }
         });*/

        me.getChildren().push(grid);
        grid.setParent(me);
        grid.mask();
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

        //this.setGrid(grid);
    },
    onStoreLoaded: function () {
        console.log('store loaded symfonycrudpanel');
        Xfr.Mask.hide();
    },
    beforeLoadStore: function () {
        console.log('before load store loaded symfonycrudpanel');
    },
    initView: function () {

        var me = this;

        var viewContainer = $(me.getViewPosition(), me.$this)[0];
        var view = Ext.create(me.config.view.className, {
            position: me.getViewPosition(),
            renderTo: viewContainer,
            crudButtons: me.getCrudButtons(),
            formButtons: me.config.formButtons
        });
        //console.log('crudButtons');
        //console.log(me);
        $("button[data-action-type=create]", viewContainer).on("click", function () {
            console.log('Test fonction create : si c est aussi pour un suivi');
            me.clickOnCreate();
            //alert("create");
        });
        $("button[data-action-type=edit]", viewContainer).on("click", function () {
            me.clickOnEdit();
        });
        $("button[data-action-type=delete]", viewContainer).on("click", function () {
            me.clickOnDelete();
        });


        $("button[data-action-type=custom]", viewContainer).on("click", function () {
            me.clickOnCustom(viewContainer);
        });






        var h = $(me.getGridPosition()).css("height");
        var xpanel = $("div .x_panel", viewContainer);
        xpanel.css({"height": h, "border-radius": "5px"});
        var xcontent = $("div .x_content", viewContainer);
        var nh = xpanel.height() - 43;
        xcontent.css({"overflow-y": "scroll", "overflow-x": "hidden", "margin-top": "-5px", "height": nh + "px"});
        var defObj = {};
        defObj.baseUrl = baseUrl;
        defObj.img_url = "uploads/images/" + this.getEntityName() + "/default.png";
        view.updateData(defObj);
        me.setView(view);
    },
    initForm: function () {
        var me = this;
        var record = me.config.parentRecord;
        var panelData = me.getPanelData();
        var formContainer = $(me.getFormPosition(), me.$this)[0];
        var form = Ext.create(me.config.form.className, {
            position: me.getFormPosition(),
            renderTo: formContainer,
            maskOnItemsLoading: false,
            panelData: panelData,
            parentRecord: record,
            parentName: me.config.parentName,
            listeners: {
                "formsubmit": {
                    scope: me,
                    fn: "onFormSubmit"
                }
            }
        });
        var h = $(me.getGridPosition()).css("height");
        var xpanel = $("div .x_panel", formContainer);
        xpanel.css({"height": h});
        var xcontent = $("div .x_content", formContainer);
        var nh = xpanel.height() - 43;
        xcontent.css({"overflow-y": "scroll", "overflow-x": "hidden", "margin-top": "-5px", "height": nh + "px"});


        me.setForm(form);

        $(me.getFormPosition(), me.$this).hide();



        $("button[data-action-type=save]", formContainer).on("click", function () {
            me.clickOnSave();
        });
        $("button[data-action-type=cancel]", formContainer).on("click", function () {
            me.clickOnCancel();
        });

        me.afterInnitForm();

    },
    onGridSelect: function (grid, selectedIndex, selectedRecord, selectedIndexes, selectedRecords) {
        var me = this;
        //$("button[data-action-type=edit],button[data-action-type=delete]", me.$this).show();
        me.selectedGridIndex = selectedIndex;
        selectedRecord.baseUrl = baseUrl;
        me.getView().updateData(selectedRecord);
        me.setSelectedRecord(selectedRecord);
        var parentRecordName=null;

        try{
            parentRecordName = me.getView().getRecordName();
        }
        catch(e){
            
        }
        
        var entityName = me.getEntityName();
        
        if (parentRecordName == undefined) {
            parentRecordName = me.getEntityName();
        }
        
        var viewContainer = $(me.getViewPosition(), me.$this)[0];
        $("a[data-action-type=rel]", viewContainer).unbind("click");
        $("a[data-action-type=rel]", viewContainer).on('click', function () {
            var record = me.getSelectedRecord();
            if (Ext.isEmpty(record)) {
                Xfr.Msg.show({
                    title: "Alerte!",
                    message: "Vous devez sélectionner un élément avant de faire ce traitement"
                });
                return;
            }
            //$("#erating-main-container").empty();

            var ind = $(this).attr("index");
            me.hide();
            //me.destroy();

            var paneClass = $(this).attr('data-action-pane');
            var panel = Ext.create(paneClass, {
                renderTo: "erating-main-container",
                parentRecord: record,
                parentName: entityName,
                //parentName: me.getEntityName(),
                parentPane: me,
                parentTitle: parentRecordName,
                //parentTitle: me.config.page.title,
                indexAction: ind

            });

        });
        // console.log(selectedRecord);

    }, switchMode: function (mode) {
        // console.log("switch mode = " + mode);
        var me = this;
        var viewContainer = $(' div' + me.getViewPosition(), me.$this);
        var formContainer = $(' div' + me.getFormPosition(), me.$this);
        if (mode === "read") {
            viewContainer.show();
            formContainer.hide();

        } else if (mode === "edit") {
            viewContainer.hide();
            formContainer.show();
        }
    },
    clickOnCreate: function () {
        this.toolbarAction = "create";
        this.getForm().showForm();
        this.switchMode('edit');
        //this.getGrid().unselectAllRows();
    },
    clickOnEdit: function () {
        var record = this.getSelectedRecord();
       
        if (Ext.isEmpty(record)) {
            Xfr.Msg.show({
                title: "Erreur",
                message: "Vous devez sélectionner un élément avant de modifier"
            });
            return;
        }
        this.toolbarAction = "edit";
        console.log(record);
        record.baseUrl = baseUrl;
        console.log(record.baseUrl); 
        this.getForm().showForm(record);
        //this.getForm().update(record);       
        this.switchMode('edit');
    },
    onFormSubmit: function () {
        //console.log('submitting form');
        if (this.toolbarAction === "create") {
            this.createObject();
        } else {
            this.editObject();
        }
    },
    clickOnSave: function () {
        console.log("on a cliquer sur enregistrer");
        console.log("Clique on save");
        var me = this,
                $form = $("form:first", me.getForm().$this);
        console.log("Form being submitted");
        console.log($form);
        $form.submit();

        //
        //if (this.toolbarAction === "create") {
        //    this.createObject();
        //} else {
        //    this.editObject();
        //}


    },
    clickOnDelete: function () {
        var me = this;
        var record = this.getSelectedRecord();
        //this.toolbarAction = "edit";
        //this.getForm().showForm(record);

        if (Ext.isEmpty(record)) {
            Xfr.Msg.show({
                title: "Erreur",
                message: "Vous devez sélectionner un élément avant de supprimer"
            });
            return;
        }
        this.toolbarAction = "del";
        this.getForm().showForm(record);
        //this.getForm().updateData();       
        this.switchMode('del');
        Xfr.Msg.show({
            title: "Confirmation",
            message: "Voulez vous vraiment supprimer cet élément? Cette action est irréversible!",
            icon: Xfr.Msg.QUESTION,
            btn: [Xfr.Msg.YES, Xfr.Msg.NO],
            action: function (btn) {
                if (btn === Xfr.Msg.YES.text) {
                    me.deleteObject();
                }
            }
        });
    },
    createObject: function () {
        var me = this;
        var urlAdd = "";
        //var formData = me.getFormData();
        if (me.config.parentRecord) {
            urlAdd = this.getUrlAction('create', me.config.parentRecord.id, me.config.parentName);
        }
        else {
            urlAdd = this.getUrlAction('create');
        }

        var form = $("form:first", me.$this);
        formData = new FormData(form[0]);

        var opts = {
            url: urlAdd,
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            dataType: "json",
            type: "POST"
        };


        Xfr.Mask.show('Enregistrement...');
        $.ajax(Ext.merge(opts, {
            success: function (response, textStatus, jqXHR) {
                //Xfr.Mask.hide();

                if (response.success) {
                    //console.log("easy");
                    //console.log(response);
                    Xfr.Mask.hide();
                    Xfr.Msg.show({
                        title: "Succès",
                        //message: "Ville enregistrée avec succès",
                        message: response.message,
                        icon: Xfr.Msg.SUCCESS
                    });
                    me.afterCreate();
                    me.clickOnCancel();
                    me.getForm().reset();
                    me.getChildren()[0].reload();
                } else {
                    //Gestion de l'affochage des erreurs
                    //console.log("Affichage des messages d'erreurs");


                    var message = "";

                    if (response.errors != undefined && response.errors.form != undefined) {
                        var formError = response.errors.form;


                        message = me.getErrorMessages(formError);

                        message = '<ul class="msgbox-error">' + message + "</ul>";

                        //for (var field in formError.children) {
                        //    if( formError.children.hasOwnProperty(field) ) {
                        //        var fieldValue=formError.children[field];
                        //        if(fieldValue.errors!=undefined && Array.isArray(fieldValue.errors) ){
                        //            Ext.each(fieldValue.errors, function(error){
                        //                message=message+"<p><span>"+field+": </span>"+error+"</p>";
                        //            });
                        //        }
                        //    }
                        //}
                    }
                    Xfr.Mask.hide();

                    Xfr.Msg.show({
                        title: "Erreur",
                        message: response.message + " " + message,
                        icon: Xfr.Msg.ERROR
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Xfr.Mask.hide();

                Xfr.Msg.show({
                    title: "Erreur",
                    message: "Une erreur est survenue sur le serveur!",
                    icon: Xfr.Msg.ERROR
                });
            }
        }));
    },
    editObject: function () {
        var me = this;
        //var formData = me.getFormData();

        var form = $("form:first", me.$this);
        formData = new FormData(form[0]);
        //console.log("form");
        //console.log(form);
        var record = this.getSelectedRecord();

        var opts = {
            url: this.getUrlAction('edit', record.id),
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            dataType: "json",
            type: "POST"
        };

        Xfr.Mask.show('Enregistrement...');

        $.ajax(Ext.merge(opts, {
            success: function (response, textStatus, jqXHR) {
                //Xfr.Mask.hide();

                //me.getForm().reset();

                if (response.success) {
                    Xfr.Mask.hide();
                    Xfr.Msg.show({
                        title: "Succès",
                        // message: "Ville modifiée avec succès",
                        message: response.message,
                        icon: Xfr.Msg.SUCCESS
                    });
                    me.clickOnCancel();
                    me.getChildren()[0].reload();
                    me.getView().updateData(response.data);
                    me.getForm().update(response.data);
                    me.afterEdit();
                } else {

                    console.log("Affichage des messages d'erreurs");

                    console.log(response.data);
                    //  console.log(response.data.errors);
                    console.log(response.errors);


                    var message = "";
                    if (response.errors != undefined && response.errors.form != undefined) {

                        var formError = response.errors.form;

                        message = me.getErrorMessages(formError);

                        message = '<ul class="msgbox-error">' + message + "</ul>";
                        //for (var field in formError.children) {
                        //    if( formError.children.hasOwnProperty(field) ) {
                        //        var fieldValue=formError.children[field];
                        //        if(fieldValue.errors!=undefined && Array.isArray(fieldValue.errors) ){
                        //            Ext.each(fieldValue.errors, function(error){
                        //                message=message+"<p><span>"+field+": </span>"+error+"</p>";
                        //            });
                        //        }
                        //    }
                        //}
                    }


                    Xfr.Mask.hide();

                    Xfr.Msg.show({
                        title: "Erreur",
                        message: response.message + " " + message,
                        icon: Xfr.Msg.ERROR
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Xfr.Mask.hide();

                Xfr.Msg.show({
                    title: "Erreur",
                    message: "Une erreur est survenue sur le serveur!",
                    icon: Xfr.Msg.ERROR
                });
            }
        }));
    },
    getErrorMessages: function (form) {
        var me = this;

        message = "";

        for (var field in form.children) {
            if (form.children.hasOwnProperty(field)) {
                var fieldValue = form.children[field];
                if (fieldValue.errors != undefined && Array.isArray(fieldValue.errors)) {
                    Ext.each(fieldValue.errors, function (error) {
                        message = message + "<li><span>" + field + ": </span>" + error + "</li>";
                    });
                }
                if (fieldValue.children != undefined) {
                    message = message + me.getErrorMessages(fieldValue);
                }
            }
        }
        return message;
    },
    deleteObject: function () {
        var me = this;
        var record = this.getSelectedRecord();
        console.log("entité selectionner");
        console.log(me.getEntityName());
        var entity = me.getEntityName();
        var methode = "GET";
        if (entity === "utilisateur"){
            methode = "POST";
        } 
        /*this.getForm().showForm(record);
         var formData = me.getFormData();*/
        Xfr.Mask.show('Suppression...');
        $.ajax({
            url: this.getUrlAction('delete', record.id),
            type: methode,
            dataType: "json",
            success: function (response, textStatus, jqXHR) {
                //Xfr.Mask.hide();
                me.clickOnCancel();
                //me.getForm().reset();
                me.getChildren()[0].reload();
                if (response.success) {
                    Xfr.Mask.hide();
                    Xfr.Msg.show({
                        title: "Succès",
                        //message: "Ville supprimée avec succès",
                        message: response.message,
                        icon: Xfr.Msg.SUCCESS
                    });
                    me.getView().updateData({});
                } else {
                    Xfr.Mask.hide();
                    Xfr.Msg.show({
                        title: "Erreur",
                        message: response.message,
                        icon: Xfr.Msg.ERROR
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Xfr.Mask.hide();
                Xfr.Msg.show({
                    title: "Erreur",
                    message: "Une erreur est survenue sur le serveur!",
                    icon: Xfr.Msg.ERROR
                });
            }
        });
    },
    clickOnCancel: function () {
        var record = this.getSelectedRecord();
        this.callParent(arguments);
        var defObj = {};
        /**** ligne ajoutée pour garder l'objet selectionée dans la vue apres annulation modification ***/
        defObj = record;
        if (Ext.isEmpty(defObj)) {
            defObj = {};
        }
        defObj.baseUrl = baseUrl;
        //defObj.img_url = "uploads/images/" + this.getEntityName() + "/default.png";
        this.getView().updateData(defObj);
    },
    getFormData: function () {
        var me = this;
        var formContainer = $(me.getFormPosition(), me.$this)[0];
        return  $("form:first", formContainer).serialize();
    },
    getUrlAction: function (action, id, label) {
        var actions = this.getCrudButtons();
        for (var i = 0; i < actions.length; i++) {
            if (actions[i].action === action) {
                if (Ext.isEmpty(id)) {
                    return actions[i].url;
                }
                else {
                    if (Ext.isEmpty(label)) {
                        return actions[i].url + "&id" + this.getEntityName() + "=" + id;
                    }
                    else {
                        return actions[i].url + "&id" + label + "=" + id;
                    }
                }
            }
        }
        return null;
    },
    beforeBackStep: function () {
        if (!Ext.isEmpty(this.config.parentPane.config.formButtons)) {
            this.config.parentPane.config.formButtons[this.config.indexAction].number = this.getChildren()[0].getStore().getTotalCount();
        }
    },
    afterEdit: function () {

    },
    afterInnitForm: function () {

    },
    afterInnitialize: function () {

    }

});
