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
        }
    },
    initialize:function(){

        var me = this;
        var panelData = me.getPanelData(),
            actions = [];

        var action = {
            param: {"url": "get_manuscrits", "panelClass": "ERating.emprunt.UserFilterForm", "formUrl": "", "gridUrl": "api_v1_get_filtered_emprunt"},
            libelle: "Filtre utilisateur",
            description: "Advanced search"
        };



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
    }
});