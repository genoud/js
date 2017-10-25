/**
 * Created by maglo on 27/09/2016.
 */
Ext.define("JS.typearticle.List",{
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
            gridUrl: Routing.generate("get_typearticles"),
            actions: [{
                param: {
                    "url": "get_typearticles",
                    "panelClass": "JS.typearticle.AdvancedSearch",
                    "formUrl": "",
                    "gridUrl": "get_typearticles"
                },
                libelle: "Advanced search",
                description: "Advanced search"
            }],
            buttons:[{
                    buttonClass:"btn-primary",
                    iconClass:"glyphicon glyphicon-plus",
                    buttonLabel:"Add",
                    buttonAction:"add-type"

            },
                {
                    buttonClass:"btn-primary",
                    iconClass:"glyphicon glyphicon-ok-sign",
                    buttonLabel:"Edit",
                    buttonAction:"edit-type"

                },{
                    buttonClass:"btn-danger",
                    iconClass:"fa fa-trash",
                    buttonLabel:"Delete",
                    buttonAction:"delete-type"

                }

            ]
        },
        grid: {
            store: {
                proxy: {
                    url: Routing.generate("get_typearticles", {_format: "json", status:1})
                }
            },
            type: "custom",
            dynamicTplClass: "JS.typearticle.GridCustom"
        },
        status:1,
        eventBound:false,
        jsApp:null,
        showSearch: false
    },
    initialize:function(){

        var me = this;
        me.config.grid.store.proxy.url=Routing.generate("get_typearticles", {
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
                me.getJsApp().showPanel("JS.typearticle.View",{
                    title: e.context.libelle,
                    subtitle: "View",
                    typearticle: e.context,
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
                me.getJsApp().showPanel("JS.typearticle.Form",{
                    title: e.context.libelle,
                    typearticle: e.context,
                    subtitle: "Edit",
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
                    message: "Do you really want to delete this type?",
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
    editTypearticle:function(user){
        var me=this;
        me.getGrid().reload();
    },
    addTypearticle:function(user){
        var me=this;
        me.getGrid().reload();
    },
    afterRenderTpl:function(){
        var me=this;
        me.callParent(arguments);
        me.binder.on('add-type', function (e) {

            console.log("add type button clicked");
            var form=me.getJsApp().showPanel("JS.typearticle.Form",{
                title: "Article types",
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

        me.binder.on('edit-type', function (e) {

            console.log("Edit type button clicked");
            if(me.getSelectedItems().length>1){
                Xfr.Msg.show({
                    message: "Select only one article type to edit.",
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
                    message: "Select one article type to edit.",
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
            var selectedType=me.getSelectedItems()[0];

            var form=me.getJsApp().showPanel("JS.typearticle.Form",{
                title: selectedType.intitule,
                subtitle: "Edit",
                typearticle: selectedType,
                parentCmp: me,
                listeners: {
                    "onCancel": function(){
                        console.log("Cancel event fired");
                        me.getJsApp().back();
                    }
                }

            });
        });

        me.binder.on('delete-type', function (e) {

            console.log("Delete type button clicked");
            //me.showDialogAdd();
        });


    }
});