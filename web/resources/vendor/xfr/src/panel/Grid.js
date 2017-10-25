////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.Grid
 * 
 */
Ext.define("Xfr.panel.Grid", {
    requires: [
        //"Xfr.data.Store"
    ],
    extend: 'Xfr.Component',
    xtype: 'xgrid',
    config: {
        store: null,
        data: [],
        /**
         * extended data
         * @type {Object}
         */
        xdata: {},
        /**
         * the grid layout type  : standard, custom, thumbnail
         */
        type: "standard",
        // listeners: {
        //     afterrendertpl: Ext.emptyFn
        //     // afterrendertpl: {
        //     //     fn: "onAfterRenderTpl"
        //     // }
        // },
        selectStyle: "single",
        listeners: {
            /**
             *Fires after a record is selected
             * select(me, selectedIndex, selectedRecord, selectedIndexes, selectedRecords)
             */
            "select": Ext.emptyFn,
            "afterrendertpl": Ext.emptyFn
        },
        maskOnLoad: true,
        templateHelpers:{}
    },
    selectedIndexes: [],
    initialize: function() {
        //console.log("start initialize-------------------");
        var me = this;

        //init store from config
        if (!Xfr.isXfrInstance(me.getStore())) {
            me.setStore(Xfr.getInstance(me.getStore(), "store"));
        }

        me.on({
            "afterrendertpl": {
                scope: me,
                fn: "onAfterRenderTpl"
            }
        });

        this.callParent(arguments);

        var store = this.getStore();

        store.on({
            "load": {
                scope: me,
                fn: "onStoreLoaded"
            },
            "beforeload": {
                scope: me,
                fn: "onBeforeStoreLoad"
            }
        });


        // //init colmunsize for standard grid
        // if (me.getType() === "standard") {
        //     me.initColumnSize();
        //     me.checkResponsiveColumns();
        // }

        // //init colmunsize for standard grid
        me.initColumnSize();

        // //init data from store
        // me.initData();
        // console.log("end initialize-------------------");
    },
    onAfterRenderTpl: function() {
         //console.log("start onAfterRenderTpl-------------------");
        var me = this;

        // if (me.getMaskOnLoad()) {
        //     if (!me.isMasked) {
        //         me.mask();
        //     }
        // }

        // if (me.getType() === "standard") {
        //     me.checkResponsiveColumns();
        //     // $(window).resize(function(event) {
        //     //     me.checkResponsiveColumns();
        //     // });
        // }

        //me.initColumnSize();
        // me.initAllSize();
        // 
        // if (me.getType() === "standard") {
        //     me.initColumnSize();
        //     me.checkResponsiveColumns();
        // }

        var store = this.getStore();

        if (store.isLoading) {
            if (!me.isMasked) {
                me.mask();
            }
        }



        //init data from store
        me.initData(store, {});

        if (store.getRemoteData()) {
            if (!store.getAutoload() && !store.isLoading) {            
                if (!Ext.isEmpty(store.getPreLoadedData())) {
                    store.loadPage(1, store.getPreLoadedData());
                    me.initData(store, {});                    
                }
            }
        }




        // if (!store.getAutoload()) {
        //     if (me.getMaskOnLoad()) {
        //         me.mask();
        //     }
        //     store.loadPage(1);
        // }
        // 
        // 
        // console.log("end onAfterRenderTpl-------------------");
        //
        //
    },
    initData: function(store, xdata) {
        console.log("XDATA");
        console.log(xdata);
        console.log('Données store: ');
        console.log(store.getData());
        var me = this,
            storeData = store.getData();
        
        // me.mask();
        // if (!store.getAutoload()) {
        //     store.loadPage(1);
        // }

        me.setData(storeData);
        me.setXdata(xdata);
        me.binder.set("xdata", xdata);
        me.binder.set('baseUrl', baseUrl);

        console.log("template helper");
        console.log(me.getTemplateHelpers());

        me.binder.set('helpers', me.getTemplateHelpers());

        //init colmunsize for standard grid
        if (me.getType() === "standard") {
            me.initColumnSize();
            me.checkResponsiveColumns();
        }

        me.initAllSize();

        me.initRowsEvents();

        me.selectedIndexes = [];
    },
    onBeforeStoreLoad: function(store, data, successful, xdata) {
        var me = this;
        if (!me.isMasked) {
            me.mask();
        }
    },
    onStoreLoaded: function(store, data, successful, xdata) {
        var me = this;

        if (me.isMasked) {
            me.unmask();
        }

        console.log("On store loaded");
        me.initData(store, xdata);
    },
    reload: function(resetPage) {
        var me = this,
            store = me.getStore();

        if (!Ext.isEmpty(store)) {
            if (resetPage) {
                store.currentPage = 1;
            }
            store.load();
        }
    },
    initAllSize: function() {
        // console.log("init all size --------------");
        var me = this;

        if (me.getType() === "standard") {
            me.initColumnSize();
            me.checkResponsiveColumns();
        }

        this.callParent(arguments);
    },
    initVboxAvailable: function() {
        // console.log("init vbox available--------------");

        this.callParent(arguments);
        var me = this;

        var tableHeight = $("table", me.$this).data("available-height");
         //console.log("tableHeight = " + tableHeight);
        tableHeight = (Ext.isEmpty(tableHeight)) ? $("table", me.$this).height() : tableHeight;
        var tableHeadHeight = $("table thead>tr>th:first", me.$this).outerHeight(),
            tableFooterHeight = $("table tfoot>tr:first", me.$this).outerHeight();

        tableHeadHeight = Ext.isEmpty(tableHeadHeight) ? 0 : tableHeadHeight;
        tableFooterHeight = Ext.isEmpty(tableFooterHeight) ? 0 : tableFooterHeight;

         //console.log("----------------table height = " + tableHeight);
         //console.log("----------------table head height = " + tableHeadHeight);
         //console.log("----------------table foot height = " + tableFooterHeight);
        $("table tbody", me.$this).css("height", (tableHeight - tableHeadHeight - tableFooterHeight) + "px");
        console.log("calculated width in grid: "+ $("table", me.$this).parent(":first").width() + "px");
        //$("table", me.$this).css("width", $("table", me.$this).parent(":first").width() + "px");

    },
    getSelectedIndexes: function() {
        return this.selectedIndexes;
    },
    getSelectedDatas: function() {
        var me = this,
            data = [];
        //storeData = me.getStore().getData();

        $.each(me.selectedIndexes, function(index, item) {
            //data.push(storeData[item]);
            data.push(me.binder.get("data[" + index + "]"));
        });
        return data;
    },
    getDataAt: function(index) {
        var me = this;
        //storeData = me.getStore().getData();
        //return storeData[index];
        return me.binder.get("data[" + index + "]");
    },
    setDataAt: function(index, data) {
        var me = this;
        //storeData = me.getStore().getData();
        //return storeData[index];
        me.binder.set("data[" + index + "]", data);
    },
    addRowData: function(data) {
        me.binder.push("data", data);
    },
    unselectAllRows: function() {
        var me = this;
        $("table tbody tr.selected", me.$this).removeClass("selected");
        me.selectedIndexes = [];
    },
    initRowsEvents: function() {
        var me = this;
        $("table tbody tr", me.$this).each(function(index, el) {
            if (Ext.isEmpty($(el).attr("data-event-click"))) {
                $(el).click(function(event) {

                    $(this).attr("data-event-click", true);

                    // if ($(this).hasClass('overflow') && me.getType() === "standard") {
                    //     //console.log("click on tr;overflow");
                    //     if (Ext.isEmpty($(this).attr("data-has-child"))) {
                    //         $('<tr class="child"><td> ' + me.getHiddenColumnList($(this)) + ' </td></tr>').insertAfter($(this));
                    //         $(this).attr("data-has-child", true);
                    //         $("td:not(.hidden):first span.icon-plus-minus", $(this)).removeClass('icon-plus2').addClass("icon-minus2");
                    //     } else {
                    //         $(this).removeAttr('data-has-child');
                    //         $(this).find("+tr.child:first").remove();
                    //         $("td:not(.hidden):first span.icon-plus-minus", $(this)).removeClass('icon-minus2').addClass("icon-plus2");
                    //     }
                    // }

                    //console.log("click on tr");
                    if (me.getSelectStyle() === "single") {
                        $("table tbody tr.selected", me.$this).not($(this)).removeClass('selected');
                        if (!$(this).hasClass("selected")) {
                            $(this).addClass("selected")
                        }
                    } else {
                        $(this).toggleClass('selected');
                    }

                    var index = $("table tbody tr", me.$this).index($(this));

                    if ($(this).hasClass('selected')) {
                        if (!Ext.Array.contains(me.selectedIndexes, index)) {
                            me.selectedIndexes.push(index);
                        }
                        me.fireEvent('select', me, index, me.getDataAt(index), me.selectedIndexes, me.getSelectedDatas());
                    } else {
                        Ext.Array.remove(me.selectedIndexes, index);
                    }

                });
            }
        });

        $("table tbody tr span.icon-plus-minus", me.$this).each(function(index, el) {
            if (Ext.isEmpty($(el).attr("data-event-click"))) {
                $(el).click(function(event) {

                    $(this).attr("data-event-click", true);

                    var trParent = $(this).parents("tr:first");
                    if (trParent.hasClass('overflow') && me.getType() === "standard") {
                        //console.log("click on tr;overflow");
                        if (Ext.isEmpty(trParent.attr("data-has-child"))) {
                            $('<tr class="child"><td> ' + me.getHiddenColumnList(trParent) + ' </td></tr>').insertAfter(trParent);
                            trParent.attr("data-has-child", true);
                            $("td:not(.hidden):first span.icon-plus-minus", trParent).removeClass('icon-plus2').addClass("icon-minus2");
                        } else {
                            trParent.removeAttr('data-has-child');
                            trParent.find("+tr.child:first").remove();
                            $("td:not(.hidden):first span.icon-plus-minus", trParent).removeClass('icon-minus2').addClass("icon-plus2");
                        }
                    }

                });
            }
        });
    },
    initColumnSize: function() {
         console.log("initColumnSize-----------");
        var me = this;
        console.log("Grid type:  "+ me.getType());
        if (me.getType() === "standard") {
            console.log("Standard table");
            var sum = 0;
            me.$this.find("table>thead>tr th:not(.hidden)").each(function(index, columnElt) {
                console.log("Calculating number of columns");
                var columnFlex = $(columnElt).data("flex");

                if (Ext.isEmpty(columnFlex)) {
                    columnFlex = 1;
                } else {
                    columnFlex = new String(columnFlex);
                    columnFlex = parseFloat(columnFlex.replace(/\s/g, "").replace(",", "."));
                }
                sum += columnFlex;
            });
            console.log("Nombre de colonne " + sum);
            me.$this.find("table>thead>tr th:not(.hidden),table>tbody tr td:not(.hidden)").each(function(index, columnElt) {
                console.log("initializing columns");
                var columnFlex = $(columnElt).data("flex");
                if (Ext.isEmpty(columnFlex)) {
                    columnFlex = 1;
                } else {
                    columnFlex = new String(columnFlex);
                    columnFlex = parseFloat(columnFlex.replace(/\s/g, "").replace(",", "."));
                }
                $(columnElt).css({
                    width: ((columnFlex / sum) * 100) + "%"
                });
            });

            me.$this.find("table>tbody tr:not(.child)").each(function(index, trElt) {
                var maxHeight = 0;
                $("td:not(.hidden)", $(trElt)).each(function(index, columnElt) {
                    var columnHeight = parseInt($(columnElt).outerHeight());
                    //var columnHeight = $(columnElt).height();
                    if (columnHeight > maxHeight) {
                        maxHeight = columnHeight;
                    }
                });
                if (maxHeight > 0) {
                    $("td:not(.hidden)", $(trElt)).css("height", maxHeight + "px");
                }
            });


        }
        else{
            console.log("Not standard table");
        }
    },
    checkResponsiveColumns: function() {
        var me = this;
        me.restoreOverFlowColumns();
        me.hideOverFlowColumns();

        if ($("table thead>tr th.hidden", me.$this).length > 0) {

            $("table tbody tr", me.$this).each(function(index, el) {
                if (!$(el).hasClass('overflow')) {
                    $(el).addClass('overflow');
                    $("td:not(.hidden):first", $(el)).prepend('<span class="icon-plus-minus icon-plus2"></span>');
                }
            });

        } else {
            $("table tbody tr", me.$this).each(function(index, el) {
                if ($(el).hasClass('overflow')) {
                    $(el).removeClass('overflow');
                    $("td:not(.hidden):first", $(el)).find("span.icon-plus-minus").remove();
                }
            });
        }
    },
    hideOverFlowColumns: function() {
        var me = this;
        if (me.hideOverFlowColumn()) {
            me.hideOverFlowColumns();
        }
    },
    hideOverFlowColumn: function() {
        var me = this,
            vScrollVisible = $("table tbody", me.$this).get(0).scrollHeight > $("table tbody", me.$this).innerHeight(),
            wTbody = $("table tbody", me.$this).innerWidth(),
            swTbody = $("table tbody", me.$this).get(0).scrollWidth + ((vScrollVisible) ? 17 : 0),
            colCount = $("table thead>tr th:not(.hidden)", me.$this).length,
            firstTh = $("table thead>tr th:nth(0)", me.$this),
            secondTh = $("table thead>tr th:nth(1)", me.$this),
            diff = secondTh.offset().left - firstTh.offset().left,
            minColumDistance = 160;

        //console.log("vscrollVIsible = " + ((vScrollVisible) ? 17 : 0) + " tbody width = " + wTbody + "  scrollWidth =" + swTbody + "  diff = " + diff);

        if (colCount > 1) {
            if (swTbody > wTbody || diff < minColumDistance) {
                var lastHiddenThEl = $("table thead>tr th:not(.hidden):last", me.$this);
                lastHiddenThEl.css({
                    "display": "none",
                    "width": "0px"
                }).addClass('hidden');

                $("table tbody tr", me.$this).each(function(index, el) {
                    var lastHiddenTdEl = $("td:not(.hidden):last", $(el));

                    lastHiddenTdEl.css({
                        "display": "none",
                        "width": "0px"
                    }).addClass('hidden');
                });

                me.initColumnSize();
                return true;
            }
        }
        return false;
    },
    restoreOverFlowColumns: function() {
        var me = this;
        if (me.restoreOverFlowColumn()) {
            me.restoreOverFlowColumns();
        }
    },
    restoreOverFlowColumn: function() {
        var me = this;
        var hiddenColCount = $("table thead>tr th.hidden", me.$this).length;


        if (hiddenColCount > 0) {
            var firstHiddenTh = $("table thead>tr th.hidden:first", me.$this);
            firstHiddenTh.css({
                "display": "table-cell"
            }).removeClass('hidden').removeAttr('data-overflow-width');
            $("table tbody tr", me.$this).each(function(index, el) {
                $("td.hidden:first", $(el)).css({
                    "display": "table-cell"
                }).removeClass('hidden').removeAttr('data-overflow-width');
            });
            me.initColumnSize();
            return true;
        }
        return false;
    },
    getHiddenColumnList: function(rowEl) {
        var me = this,
            listHtml = "";

        $("td.hidden", rowEl).each(function(index, el) {
            var label = "",
                val = "",
                col = 0;

            col = $("td", rowEl).index($(el));
            label = $("table thead tr th:nth(" + col + ")", me.$this).text();
            val = $(el).text();
            listHtml += '<li> <label>' + label + ' : </label><span class="val">' + val + '</span>  </li>';
        });
        listHtml = "<ul>" + listHtml + "</ul>";
        return listHtml;
    },
    mask: function() {
        if (this.getMaskOnLoad()) {
            this.callParent(arguments);
        }
    },
    unmask: function() {
        if (this.getMaskOnLoad()) {
            this.callParent(arguments);
        }
    },
    destroy: function() {
        this.getStore().destroy();
        this.callParent(arguments);
    }
});
