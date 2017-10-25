/**
 * @class Xfr.plugin.GridSearch
 * 
 */
Ext.define("Xfr.plugin.GridSearch", {
    extend: 'Xfr.Component',
    requires: [],
    alias: 'plugin.gridsearch',
    config: {
        cls: "table-form-search",
        cmp: null,
        data: {
            searchValue: "",
        },
        searchLocal:false,
        width: "100%"
    },
    init: function(cmp) {
        var me = this;
        me.setCmp(cmp);

        /*console.log("-----------init plugin GridSearch");*/

        console.log("Search locally: "+me.getSearchLocal());

        var store = me.getCmp().getStore();

         $("input[name=search-value]", me.$this).change(function(event) {            
             me.getCmp().mask();

            store.filterCollectionByQuery($(this).val(), me.getSearchLocal());
        });

        // me.binder.observe('data.searchValue', function(newValue) {
        //     console.log("on change value =  " + newValue);
        //     //me.filter(newValue);
        //     me.getCmp().mask();
        //     store.filterCollectionByQuery(newValue);
        // });
    }

});
