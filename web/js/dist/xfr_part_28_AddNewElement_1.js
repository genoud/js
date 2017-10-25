/**
 * @class Xfr.panel.addnewelement
 * 
 */
Ext.define("Xfr.plugin.AddNewElement", {
    extend: 'Xfr.Component',
    requires: [],
    alias: 'plugin.addnewelement',
    config: {
        width : "100%",
        height : "100%",
        cmp: null,
        data: {}
    },
    init: function (cmp) {
        var me = this;
        me.setCmp(cmp);
        //$('#button-add-new').click(function () {
        $('[data-btn-add-new]', me.$this).click(function () {
            me.onAddClicked();
        });
        // $('#button-close-list-form').click(function () {
        //     me.onCloseClicked();
        // });
    },
    onAddClicked: function () {
       this.getCmp().openForm();
    },
    // onCloseClicked: function () {
    //    this.getCmp().closeForm();
    // }
});
