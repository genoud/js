/**
 * Created by maglo on 27/09/2016.
 */
Ext.define("JS.article.List",{
    extend:"JS.panel.HistoryGridPanel",
    config:{
        panelData: {
            url: "",
            panelClass: "",
            gridUrl: Routing.generate("get_manuscrits"),
            actions: []
        },
        grid: {
            store: {
                proxy: {
                    url: Routing.generate("get_manuscrits", {_format: "json"})
                }
            },
            type: "custom",
            dynamicTplClass: "JS.article.GridCustom"
        },
        status:1,
        eventBound:false,
        jsApp:null
    },
    initialize:function(){

        var me = this;
        var panelData = me.getPanelData(),
            actions = [];

        var action = {
            param: {
                "url": "get_manuscrits",
                "panelClass": "JS.article.AdvancedSearch",
                "formUrl": "",
                "gridUrl": "get_manuscrits"
            },
            libelle: "Advanced search",
            description: "Advanced search"
        };

        me.config.grid.store.proxy.url=Routing.generate("get_manuscrits", {
            _format: "json",
            status: me.getStatus()
        });

        //console.log("grid url: "+me.config.grid.store.proxy.url);
        actions.push(action);
        panelData.actions = actions;
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
                console.log("article detail clicked");
                console.log(e);
                me.getJsApp().showPanel("JS.article.View",{
                    title: e.context.titre_court,
                    article: e.context
                });
            });

            grid.binder.on('show-edit', function(e){
                console.log("article edit clicked");
                console.log(e);
                me.getJsApp().showPanel("JS.article.ManuscritForm",{
                    title: e.context.titre_court,
                    article: e.context
                });
            });

            grid.binder.on('delete', function(e){
                console.log("article edit clicked");
                console.log(e);
                Xfr.Msg.show({
                    message: "Do you really want to delete this submission?",
                    title: "Delete confirmation",
                    icon: Xfr.Msg.QUESTION.iconClass,
                    btn: [
                        {text: Xfr.Msg.YES.text, type: 'btn'},
                        {text: Xfr.Msg.NO.text, type: 'btn'}
                    ],
                    action:function(btn){
                        if(btn==="yes"){
                            console.log("Click on btn yes");
                            console.log("Deleting article");

                            grid.getStore().load();
                        }
                    }
                });

            });
            me.setEventBound(true);
        }

    }
});