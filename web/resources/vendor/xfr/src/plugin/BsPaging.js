/**
 * @class Xfr.panel.Pagination
 * 
 */
Ext.define("Xfr.plugin.BsPaging", {
    extend: 'Xfr.Component',
    requires: [],
    alias: 'plugin.bspaging',
    config: {
        cmp: null,
        data: {},
    },
    init: function(cmp) {
        var me = this;
        me.setCmp(cmp);
        // console.log("-----------init plugin pagination");

        var store = me.getCmp().getStore();
        store.on({
            "load": {
                scope: me,
                fn: "onStoreLoaded"
            }
        });

        $("li[data-prev-page]>a", me.$this).on("click", function() {
            me.clickOnPrevPage($(this));
        });
        $("li[data-next-page]>a", me.$this).on("click", function() {
            me.clickOnNextPage($(this));
        });
        me.initPaging(store);
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
            "totalCount": store.getTotalCount(),
            "first": first,
            "currentPageLength": currentPageLength
        });

        //console.log("dataaaaaaaaaaaaaaaaaaaaaaaa");
        //console.log(me.getData());

        me.binder.set("data", me.getData());
        me.initPagesEltEvents();
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
        me.initPaging(store);

        //activate the current page
        $("ul[data-pagination] li.active", me.$this).removeClass('active');
        $("ul[data-pagination] li[data-page-num=" + store.currentPage + "]", me.$this).addClass('active');

        var firstPageNum = parseInt($("ul[data-pagination] li[data-page-num]:first", me.$this).data("page-num")),
            lastPageNum = parseInt($("ul[data-pagination] li[data-page-num]:last", me.$this).data("page-num"));

        //check first page and last page disabling
        $("ul[data-pagination] li[data-prev-page],ul[data-pagination] li[data-next-page]", me.$this).removeClass('disabled');
        if (store.currentPage === firstPageNum) {
            $("ul[data-pagination] li[data-prev-page]", me.$this).addClass('disabled');
        } else if (store.currentPage === lastPageNum) {
            $("ul[data-pagination] li[data-next-page]", me.$this).addClass('disabled');
        }
        if (store.getPageSize() === store.getTotalCount()) {
            $("ul[data-pagination] li[data-next-page]", me.$this).addClass('disabled');
            $("ul[data-pagination] li[data-prev-page]", me.$this).addClass('disabled');
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
