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
        jsApp:null
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
                    title: e.context.titre_court,
                    article: e.context
                });
            });

            grid.binder.on('show-edit', function(e){
                //console.log("article edit clicked");
                //console.log(e);
                me.getJsApp().showPanel("JS.typearticle.Form",{
                    title: e.context.titre_court,
                    article: e.context
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
    afterRenderTpl:function(){
        var me=this;
        me.callParent(arguments);
        me.binder.on('add-type', function (e) {

            console.log("add type button clicked");
            //me.showDialogAdd();
        });

        me.binder.on('edit-type', function (e) {

            console.log("Edit type button clicked");
            //me.showDialogAdd();
        });

        me.binder.on('delete-type', function (e) {

            console.log("Delete type button clicked");
            //me.showDialogAdd();
        });


    }
});