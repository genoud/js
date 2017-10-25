Ext.define("JS.panel.HistoryGridPanelAdmin", {
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
                xtype: "gridsearchjs",
                position: "[data-table-form-search]"
            } ],
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
        dynamicTplClass: "JS.panel.HistoryGridPanelAdmin",
        selectedItems:[],
        showSearch: true

    },
    initialize: function () {
        //Xfr.Mask.show('Chargement...');
//        me.mask();
        var me = this;
        this.callParent(arguments);

        var panelData = me.getPanelData(),
            actions = [];
        for (var i = 0; i < panelData.actions.length; i++) {
            var action = panelData.actions[i];
            //action.libelle = action.translations[appConfig.locale].libelle;
            //action.description = action.translations[appConfig.locale].description;
            actions.push(action);
        }


        //console.log("Admin custom Buttons ", panelData);

        me.setConfig({
            grid : Ext.merge(me.config.grid, me.getGrid()),
            data : {
                filterCategories : actions,
                buttons : panelData.buttons
            },
            buttons : panelData.buttons
        });



        var $formContainer = $("[data-xfr-form-container]", me.$this);

        var $filterFormContainer = $("[data-filter-form-container]", $formContainer);

        var elt = $(this);
        //console.log($(elt).data("param"));
        var param = actions[0].param;
        //console.log(param);
        //console.log(actions[0]);
        me.filterFormParams = param;
        me.gridUrl = Routing.generate(param.gridUrl, {
            _format: "json"
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



    },
    onStoreLoaded: function () {
        var me = this;
        var grid = me.getGrid();
        Xfr.Mask.hide();
        if(!me.getEventBound()){
            grid.binder.on('on-select', function(e){
                console.log("Article selected");
                console.log(e);
                if(!e.context.selected){
                    e.context.selected=true;
                    addToList(me.getSelectedItems(), e.context);
                }
                else{
                    e.context.selected=false;
                    removeFromList(me.getSelectedItems(), e.context);
                }
                console.log("Selected objects");
                console.log(me.getSelectedItems());
                $(e.node).toggleClass("grid-selected");



            });
        }

    },
    afterRenderTpl:function(){
        console.log("after render tpl historygridadmin");

        //var me=this;
        //me.callParent(arguments);
        //var data=me.getData() || {};
        //data.buttons=me.getButtons();
        //console.log(data);
        //me.setData(data);

        var me=this;

        me.callParent(arguments);


        if(!me.getShowSearch()){
            $(".grid-filter-panel", me.$this).hide();

            $(".xfr-crud-grid", me.$this).removeClass("col-lg-8");
            $(".xfr-crud-grid", me.$this).removeClass("col-md-8");
            $(".xfr-crud-grid", me.$this).removeClass("col-sm-8");
            $(".xfr-crud-grid", me.$this).addClass("col-md-12");


        }
    }
});
