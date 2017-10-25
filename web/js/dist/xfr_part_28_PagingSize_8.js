/**
 * @class Xfr.plugin.PagingSize
 * 
 */
Ext.define("Xfr.plugin.PagingSize", {
    extend: 'Xfr.Component',
    requires: [],
    alias: 'plugin.pagingsize',
    config: {
        cls: "table-page-size",
        cmp: null,
        data: {},
        width: "100%"
    },
    init: function(cmp) {
        var me = this;
        me.setCmp(cmp);

        var store = me.getCmp().getStore();
        me.setData({
            pageSize: store.getPageSize()
        });
        me.binder.set("data", me.getData());

        $("select[name=page-size]", me.$this).change(function(event) {
            console.log("on select change on page size ");
            me.onChangePageSize($(this));
        });

    },
    onChangePageSize: function($elt) {
        var me = this,
            cmp = me.getCmp(),
            store = cmp.getStore();

        store.setPageSize($elt.val());
        console.log("grid in pagingSize------------");
        console.log(cmp);
        cmp.mask();
        store.load();
    }


});
