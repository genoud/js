/**
 * @class Xfr.panel.Pagination
 * 
 */
Ext.define("Xfr.plugin.Summary", {
    extend: 'Xfr.Component',
    requires: [],
    alias: 'plugin.summary',
    config: {
        cmp: null,
        data: {},
    },
    init: function(cmp) {
        var me = this;
        me.setCmp(cmp);

        me.$this.addClass("summary");
        // console.log("-----------init plugin pagination");

        var store = me.getCmp().getStore();
        store.on({
            "load": {
                scope: me,
                fn: "onStoreLoaded"
            }
        });

        me.initSummary(store.getSummary());
    },
    setData: function() {
        var me = this;
        this.callParent(arguments);
       // me.initPagingEvt();
    },
    initSummary: function(summary) {
        var me = this

        console.log("summary: "+ summary);
        me.setData({
            "summary": summary
        });

         console.log("dataaaaaaaaaaaaaaaaaaaaaaaa in Summary.js");
         console.log(me.getData());

        me.binder.set("data", me.getData());
        //me.initPagesEltEvents();
    },
    onStoreLoaded: function(store, data, successful) {
        var me = this,
            cmp = me.getCmp();

        console.log("on storle loaded in summary.js");

        var summary=store.getSummary();
        if(summary){
            me.initSummary(summary);
        }
        else{
            me.initSummary("error");
        }
    }

});
