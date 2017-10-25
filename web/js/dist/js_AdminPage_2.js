/**
 * Created by maglo on 27/09/2016.
 */
Ext.define("JS.AdminPage",{
    extend: "Xfr.Component",
    config:{
        title: "Administration",
        jsApp:null
    },
    initialize:function(){
        var me=this;
        console.log("initialise admin page");
        me.callParent(arguments);
    },
    afterRenderTpl:function(){
        var me=this;
        //custom implementation goes here
        me.callParent(arguments);
        console.log("After render admin page");

    }
});
