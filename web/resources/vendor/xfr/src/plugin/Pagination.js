/**
 * @class Xfr.panel.Pagination
 * 
 */
Ext.define("Xfr.plugin.Pagination", {
    extend: 'Xfr.Component',
    requires: [],
    alias: 'plugin.pagination',
    config: {
        cmp: null,
        data: {},
        showSummary:false,
        summaryClass:"Xfr.plugin.Summary"
        //plugins: [
        //     {
        //        className: "Xfr.plugin.Summary",
        //        position: "[data-table-summary]"
        //    }
        //]
    },
    summary: null,
    init: function(cmp) {
        var me = this;
        me.setCmp(cmp);

        me.$this.addClass("paging");
        // console.log("-----------init plugin pagination");

        var store = me.getCmp().getStore();
        store.on({
            "load": {
                scope: me,
                fn: "onStoreLoaded"
            }
        });

        me.initPagingEvt();
        me.initPaging(store);
    },
    getStore: function(){
        var me = this;
        var store = me.getCmp().getStore();
        return store;
    },
    setData: function() {
        var me = this;
        this.callParent(arguments);
        // console.log("set data on pagination");
        me.initPagingEvt();
    },
    initPagingEvt: function() {
        var me = this;

        // console.log("Enter in initPagingEvt");

        var $item = null;

        $item = $("li[data-prev-page]>a", me.$this);
        if ($item.attr("data-click-evt") !== "true") {
            // console.log("adding click evt for the first times")
            $("li[data-prev-page]>a", me.$this).on("click", function() {
                me.clickOnPrevPage($(this));
            });
            $item.attr("data-click-evt", "true");
        }

        $item = $("li[data-next-page]>a", me.$this);
        if ($item.attr("data-click-evt") !== "true") {
            $item.on("click", function() {
                me.clickOnNextPage($(this));
            })
            $item.attr("data-click-evt", "true");
        }

        $item = $("li[data-first-page]>a", me.$this);
        if ($item.attr("data-click-evt") !== "true") {
            $item.on("click", function() {
                me.clickOnFirstPage($(this));
            })
            $item.attr("data-click-evt", "true");
        }

        $item = $("li[data-last-page]>a", me.$this);
        if ($item.attr("data-click-evt") !== "true") {
            $item.on("click", function() {
                me.clickOnLastPage($(this));
            })
            $item.attr("data-click-evt", "true");
        }

        $item = $("input[name=current-page]", me.$this);
        if ($item.attr("data-change-evt") !== "true") {
            $item.change(function() {
                me.changeCurrentPage($(this));
            });
            $item.attr("data-change-evt", "true");
        }
    },
    initPaging: function(store) {
        var me = this,
            pageCount = 0;

        pageCount = parseInt(store.getTotalCount() / store.getPageSize());
        if (store.getTotalCount() % store.getPageSize() > 0) {
            pageCount++;
        }

        var pages = [];
        for (var i = 0; i < pageCount; i++) {
            pages.push({
                "pageNum": (i + 1)
            });
        }
        var start = (store.currentPage - 1) * parseInt(store.getPageSize()),
            currentPageLength = 0,
            first = 0;
        if (store.getTotalCount() === 0) {
            first = 0;
        } else {
            first = start + 1;
            currentPageLength = (store.currentPage == pageCount || pageCount === 1) ? store.getTotalCount() : start + parseInt(store.getPageSize())
        }
        me.setData({
            "pages": pages,
            "pageCount": pageCount,
            "totalCount": store.getTotalCount(),
            "first": first,
            "currentPage": store.currentPage,
            "currentPageLength": currentPageLength
        });

        // console.log("dataaaaaaaaaaaaaaaaaaaaaaaa in Pagination.js");
        // console.log(me.getData());

        me.binder.set("data", me.getData());
        //me.initPagesEltEvents();
    },
    initPagesEltEvents: function() {
        var me = this;
        $("li[data-page-num] a", me.$this).each(function(index, el) {
            if (!$(el).attr("data-event-inited")) {
                $(el).attr("data-event-inited", "true");
                $(el).on("click", function() {
                    me.clickOnPageNum($(this));
                });
            }
        });
    },
    onStoreLoaded: function(store, data, successful) {
        var me = this,
            cmp = me.getCmp();

        // console.log("on storle loaded in pagination.js");

        me.initPaging(store);


        //activate the current page
        // $("ul[data-pagination] li.active", me.$this).removeClass('active');
        // $("ul[data-pagination] li[data-page-num=" + store.currentPage + "]", me.$this).addClass('active');

        // var firstPageNum = parseInt($("ul[data-pagination] li[data-page-num]:first", me.$this).data("page-num")),
        //     lastPageNum = parseInt($("ul[data-pagination] li[data-page-num]:last", me.$this).data("page-num"));

        //check first page and last page disabling
        $("ul[data-pagination] li[data-next-page]," +
            "ul[data-pagination] li[data-prev-page]," +
            "ul[data-pagination] li[data-first-page]," +
            "ul[data-pagination] li[data-last-page]",
            me.$this).removeClass('disabled');
        if (store.getCurrentPage() === 1) {
            $("ul[data-pagination] li[data-prev-page]," +
                "ul[data-pagination] li[data-first-page]",
                me.$this).addClass('disabled');
        } else if (store.getCurrentPage() === store.getPageCount()) {
            $("ul[data-pagination] li[data-next-page]," +
                "ul[data-pagination] li[data-last-page]",
                me.$this).addClass('disabled');
        }
        if (store.getTotalCount() <= store.getPageSize()) {

            $("ul[data-pagination] li[data-next-page]," +
                "ul[data-pagination] li[data-prev-page]," +
                "ul[data-pagination] li[data-first-page]," +
                "ul[data-pagination] li[data-last-page]",
                me.$this).addClass('disabled');
        }

        if(me.getShowSummary()){
            if(me.summary){
                me.summary.destroy();
                me.summary=null;
            }
            if(!me.summary){
                var renderTo=$("[data-table-summary]",me.$this)[0];
                console.log("Render to");
                console.log(renderTo);

                var configObj={
                    renderTo: renderTo
                };
                var onAfterRenderEvent = function() {
                    this.init(me);
                };
                if (Ext.isEmpty(configObj.listeners)) {
                    configObj.listeners = {
                        afterrendertpl: onAfterRenderEvent
                    };
                } else {
                    configObj.listeners["afterrendertpl"] = onAfterRenderEvent;
                }

                me.summary=Ext.create(me.getSummaryClass(),configObj);
                console.log("Summary");
                console.log(me.summary);

                me.summary.setCmp(me);
                me.summary.initSummary(store.getSummary());
                var config = me.getPlugins();
                config=[].concat(config);
                config[0]=me.summary;

                me.setPlugins(config);
            }
        }

        //console.log("Store data");
        //console.log(data);
        //console.log("summaryClass");
        //console.log(me.getSummaryClass());


        //if(data.summary){
        //    summary=data.symmary;
        //}
        //$("[data-table-summary]", me.$this).html(summary);

    },
    changeCurrentPage: function($elt) {
        var me = this,
            cmp = me.getCmp(),
            store = cmp.getStore();

        var val = parseInt($elt.val());
        if (Ext.isNumber(val)) {
            if (val >= 1 && val <= store.getPageCount()) {
                cmp.mask();
                store.loadPage(val);
            }
        } else {
            $elt.val(store.getCurrentPage());
        }
    },
    clickOnPageNum: function($elt) {
        var liParentEl = $elt.parents("li:first");
        var me = this,
            cmp = me.getCmp();
        var store = cmp.getStore();
        cmp.mask();
        var page = parseInt(liParentEl.data("page-num"));

        store.loadPage(page);
    },
    clickOnFirstPage: function($elt) {
        var liParentEl = $elt.parents("li:first");
        if (liParentEl.hasClass('disabled')) return;

        var me = this,
            cmp = me.getCmp();
        var store = cmp.getStore();
        cmp.mask();
        store.firstPage();
    },
    clickOnLastPage: function($elt) {
        var liParentEl = $elt.parents("li:first");
        if (liParentEl.hasClass('disabled')) return;

        var me = this,
            cmp = me.getCmp();
        var store = cmp.getStore();
        cmp.mask();
        store.lastPage();
    },
    clickOnPrevPage: function($elt) {
        var liParentEl = $elt.parents("li:first");
        if (liParentEl.hasClass('disabled')) return;

        var me = this,
            cmp = me.getCmp();
        var store = cmp.getStore();
        cmp.mask();
        store.previousPage();
    },
    clickOnNextPage: function($elt) {
        var liParentEl = $elt.parents("li:first");
        if (liParentEl.hasClass('disabled')) return;

        var me = this,
            cmp = me.getCmp();
        var store = cmp.getStore();
        cmp.mask();
        store.nextPage();
    }

});
