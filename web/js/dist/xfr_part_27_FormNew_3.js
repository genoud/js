/**
 * @class Xfr.panel.FormNew
 * 
 */
Ext.define("Xfr.plugin.FormNew", {
    extend: 'Xfr.Component',
    requires: [],
    alias: 'plugin.FormNew',
    config: {
        cmp: null,
        data: {}
    },
    init: function(cmp) {
        var me = this;
        me.setCmp(cmp);       

    }
});
