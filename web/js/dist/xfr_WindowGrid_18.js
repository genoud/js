Ext.define("Xfr.panel.WindowGrid", {
    extend: "Xfr.panel.Grid",
    requires: [
        //"Xfr.plugin.Pagination",
        //"Xfr.plugin.PagingSize",
        //"Xfr.plugin.GridSearch"
    ],
    config: {
        height: '100%',
        plugins: [
            {
                xtype: "pagination",
                showSummary: true,
                summaryClass: "Xfr.plugin.Summary"
            },
            {
                xtype: "pagingsize",
                position: "[data-table-page-size]"
            }, {
                xtype: "gridsearch",
                position: "[data-table-form-search]"
            }
        ]
    },
    constructor: function (config) {

        Ext.apply(config, {
            type: "standard",
            store: Ext.create("Xfr.data.Store", {
                proxy: {
                    url: config.urlPath,
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
        this.callParent(arguments);
    }, onStoreLoaded: function (store, data, successful) {
        this.callParent(arguments);
        var me = this;
        var btn = $("[grid-box-btn-save]");
        var msg = $("[grid-box-norecord-msg]");
        var storeData = store.getData();
        if (storeData.length > 0) {
            msg.hide();
            btn.show();
            btn.on("click", function (event) {
                me.config.action();
            });
        }
        else {
            msg.show();
            btn.hide();
        }
    }
});
