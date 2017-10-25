Ext.define("JS.panel.HistoryGridPanel", {
    extend: "Xfr.panel.GridPanel",
    requires: [
        //"Xfr.panel.Grid",
        //"Xfr.plugin.Pagination",
        //"Xfr.plugin.PagingSize",
        //"Xfr.plugin.GridSearch",
        //"Xfr.panel.Form"
    ],
    config: {
        panelData: null,
        grid: {
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
            }],
            store: {
                xtype: "xstore",
                proxy: {
                    reader: {
                        totalProperty: "recordsFiltered"
                    },
                    limitParam: "length",
                    startParam: "start",
                    searchParam: "search[value]"
                }
            }
        },
        dynamicTplClass: "JS.panel.HistoryGridPanel"
    },
    initialize: function () {
        //Xfr.Mask.show('Chargement...');
//        me.mask();
        var me = this;
        var panelData = me.getPanelData(),
            actions = [];
        for (var i = 0; i < panelData.actions.length; i++) {
            var action = panelData.actions[i];
            //action.libelle = action.translations[appConfig.locale].libelle;
            //action.description = action.translations[appConfig.locale].description;
            actions.push(action);
        }

        me.setConfig({
            grid: Ext.merge(me.config.grid, me.getGrid()),
            data: {
                filterCategories: actions
            }
        });

        // console.log("getGrid-------------");
        // console.log(panelData);
        // console.log(me.getGrid());
        // console.log(me.getGrid().store.proxy.url);


        this.callParent(arguments);

        var $formContainer = $("[data-xfr-form-container]", me.$this);

        var $filterFormContainer = $("[data-filter-form-container]", $formContainer);

        var elt = $(this);
        //console.log($(elt).data("param"));
        var param = actions[0].param;

        if(param && param.panelClass){
            console.log(param);
            console.log(actions[0]);
            me.filterFormParams = param;
            me.gridUrl = Routing.generate(param.gridUrl, {
                _format: "json",
                status: me.getStatus()
            });
            //console.log("grid URL on toggle action = " + me.gridUrl);
            if (!Ext.isEmpty(me.filterFormCmp)) {
//            me.filterFormCmp.destroy();
//            me.filterFormCmp.mask();
            } else {
                $filterFormContainer.empty();
            }
            me.filterFormCmp = Ext.create(param.panelClass, {
                renderTo: $filterFormContainer[0],
                panelData: param
            });

            $("button[data-btn-filter-action].selected").removeClass('selected');
            if (!elt.hasClass('selected')) {
                elt.addClass('selected');
            }
        }


    },
    onStoreLoaded: function () {
        var me = this;
        Xfr.Mask.hide();
    }
});
