/**
 * Created by maglo on 27/09/2016.
 */
Ext.define("JS.categorie.List",{
    extend:"JS.panel.HistoryGridPanelAdmin",
    config:{
        page: {
            title: "Articles Types",
            data: null,
            parent: null
        },
        panelData: {
            url: "",
            panelClass: "",
            gridUrl: Routing.generate("get_categories"),
            actions: [{
                param: {
                    "url": "get_categories",
                    "panelClass": "JS.categorie.AdvancedSearch",
                    "formUrl": "",
                    "gridUrl": "get_categories"
                },
                libelle: "Advanced search",
                description: "Advanced search"
            }],
            buttons:[{
                    buttonClass:"btn-primary",
                    iconClass:"glyphicon glyphicon-plus",
                    buttonLabel:"Add",
                    buttonAction:"add-categorie"

            },
                {
                    buttonClass:"btn-primary",
                    iconClass:"glyphicon glyphicon-ok-sign",
                    buttonLabel:"Edit",
                    buttonAction:"edit-categorie"

                },{
                    buttonClass:"btn-danger",
                    iconClass:"fa fa-trash",
                    buttonLabel:"Delete",
                    buttonAction:"delete-categorie"

                }

            ]
        },
        grid: {
            store: {
                proxy: {
                    url: Routing.generate("get_categories", {_format: "json", status:1})
                }
            },
            type: "custom",
            dynamicTplClass: "JS.categorie.GridCustom"
        },
        status:1,
        eventBound:false,
        jsApp:null,
        showSearch: false
    },
    initialize:function(){

        var me = this;
        me.config.grid.store.proxy.url=Routing.generate("get_categories", {
            _format: "json",
            status: me.getStatus()
        });
        this.callParent(arguments);

    },
    onGridSelect: function (grid, selectedIndex, selectedRecord, selectedIndexes, selectedRecords) {
        var me = this;
        this.callParent(arguments);
    },
    onStoreLoaded: function () {
        var me = this;
        var grid = me.getGrid();

        me.callParent();

        if(!me.getEventBound()){
            grid.binder.on('show-detail', function(e){
                //console.log("article detail clicked");
                //console.log(e);

                me.getJsApp().showPanel("JS.categorie.View",{
                    title: e.context.intitule,
                    subtitle: "View",
                    categorie: e.context,
                    parentCmp: me,
                    listeners: {
                        "onCancel": function(){
                            console.log("Cancel event fired");
                            me.getJsApp().back();
                        }
                    }
                });
            });

            grid.binder.on('show-edit', function(e){
                //console.log("article edit clicked");
                //console.log(e);
                me.getJsApp().showPanel("JS.categorie.Form",{
                    title: e.context.intitule,
                    categorie: e.context,
                    parentCmp: me,
                    listeners: {
                        "onCancel": function(){
                            console.log("Cancel event fired");
                            me.getJsApp().back();
                        }
                    }
                });
            });

            grid.binder.on('delete', function(e){
                //console.log("article edit clicked");
                //console.log(e);
                Xfr.Msg.show({
                    message: "Do you really want to delete this categorie?",
                    title: "Delete confirmation",
                    icon: Xfr.Msg.QUESTION.iconClass,
                    btn: [
                        {text: Xfr.Msg.YES.text, type: 'btn'},
                        {text: Xfr.Msg.NO.text, type: 'btn'}
                    ],
                    action:function(btn){
                        if(btn==="yes"){
                            //console.log("Click on btn yes");
                            //console.log("Deleting article");

                            grid.getStore().load();
                        }
                    }
                });

            });
            me.setEventBound(true);
        }
        me.getJsApp().addjustHeight();

    },
    editCategorie:function(categorie){
        var me=this;
        me.getGrid().reload();
    },
    addCategorie:function(categorie){
        var me=this;
        me.getGrid().reload();
    },
    afterRenderTpl:function(){
        var me=this;
        me.callParent(arguments);
        me.binder.on('add-categorie', function (e) {

            console.log("add categorie button clicked");
            var form=me.getJsApp().showPanel("JS.categorie.Form",{
                title: "Categories / Sections",
                subtitle: "New",
                parentCmp: me,
                listeners: {
                    "onCancel": function(){
                        console.log("Cancel event fired");
                        me.getJsApp().back();
                    }
                }

            });
        });

        me.binder.on('edit-categorie', function (e) {

            console.log("Edit categorie button clicked");
            if(me.getSelectedItems().length>1){
                Xfr.Msg.show({
                    message: "Select only one categorie to edit.",
                    title: "Edit Error",
                    icon: Xfr.Msg.INFO.iconClass,
                    btn: [
                        {text: Xfr.Msg.OK.text, type: 'btn'},
                        {text: Xfr.Msg.CANCEL.text, type: 'btn'}
                    ],
                    action:null
                });
                return;
            }
            if(me.getSelectedItems().length==0){
                Xfr.Msg.show({
                    message: "Select one categorie to edit.",
                    title: "Edit Error",
                    icon: Xfr.Msg.INFO.iconClass,
                    btn: [
                        {text: Xfr.Msg.OK.text, type: 'btn'},
                        {text: Xfr.Msg.CANCEL.text, type: 'btn'}
                    ],
                    action:null
                });
                return;
            }
            var selectedCategorie=me.getSelectedItems()[0];

            var form=me.getJsApp().showPanel("JS.categorie.Form",{
                title: selectedCategorie.intitule,
                subtitle: "Edit",
                typearticle: selectedCategorie,
                parentCmp: me,
                listeners: {
                    "onCancel": function(){
                        console.log("Cancel event fired");
                        me.getJsApp().back();
                    }
                }

            });
        });

        me.binder.on('delete-categorie', function (e) {

            console.log("Delete categorie button clicked");
            //me.showDialogAdd();
        });


    }
});