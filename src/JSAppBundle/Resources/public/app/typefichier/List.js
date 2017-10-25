/**
 * Created by maglo on 27/09/2016.
 */
Ext.define("JS.typefichier.List",{
    extend:"JS.panel.HistoryGridPanelAdmin",
    config:{
        page: {
            title: "Attachement types",
            data: null,
            parent: null
        },
        panelData: {
            url: "",
            panelClass: "",
            gridUrl: Routing.generate("get_typefichiers"),
            actions: [{
                param: {
                    "url": "get_typefichiers",
                    "panelClass": "JS.typefichier.AdvancedSearch",
                    "formUrl": "",
                    "gridUrl": "get_typefichiers"
                },
                libelle: "Advanced search",
                description: "Advanced search"
            }],
            buttons:[{
                    buttonClass:"btn-primary",
                    iconClass:"glyphicon glyphicon-plus",
                    buttonLabel:"Add",
                    buttonAction:"add-typefichier"

            },
                {
                    buttonClass:"btn-primary",
                    iconClass:"glyphicon glyphicon-ok-sign",
                    buttonLabel:"Edit",
                    buttonAction:"edit-typefichier"

                },{
                    buttonClass:"btn-danger",
                    iconClass:"fa fa-trash",
                    buttonLabel:"Delete",
                    buttonAction:"delete-typefichier"

                }

            ]
        },
        grid: {
            store: {
                proxy: {
                    url: Routing.generate("get_typefichiers", {_format: "json", status:1})
                }
            },
            type: "custom",
            dynamicTplClass: "JS.typefichier.GridCustom"
        },
        status:1,
        eventBound:false,
        jsApp:null,
        showSearch: false
    },
    initialize:function(){

        var me = this;
        me.config.grid.store.proxy.url=Routing.generate("get_typefichiers", {
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
                me.getJsApp().showPanel("JS.typefichier.View",{
                    title: e.context.intitule,
                    typefichier: e.context,
                    subtitle: "View",
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
                me.getJsApp().showPanel("JS.typefichier.Form",{
                    title: e.context.intitule,
                    typefichier: e.context,
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
                    message: "Do you really want to delete this typefichier?",
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
    editTypefichier:function(user){
        var me=this;
        me.getGrid().reload();
    },
    addTypefichier:function(user){
        var me=this;
        me.getGrid().reload();
    },
    afterRenderTpl:function(){
        var me=this;
        me.callParent(arguments);
        me.binder.on('add-typefichier', function (e) {

            console.log("add typefichier button clicked");

            var form=me.getJsApp().showPanel("JS.typefichier.Form",{
                title: "Attachement type",
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

        me.binder.on('edit-typefichier', function (e) {

            console.log("Edit typefichier button clicked");

            if(me.getSelectedItems().length>1){
                Xfr.Msg.show({
                    message: "Select only one attachement type to edit.",
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
                    message: "Select one attachement type to edit.",
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

            var form=me.getJsApp().showPanel("JS.typefichier.Form",{
                title: selectedType.intitule,
                subtitle: "Edit",
                typefichier: selectedType,
                parentCmp: me,
                listeners: {
                    "onCancel": function(){
                        console.log("Cancel event fired");
                        me.getJsApp().back();
                    }
                }

            });
        });

        me.binder.on('delete-typefichier', function (e) {

            console.log("Delete typefichier button clicked");
            //me.showDialogAdd();
        });


    }
});