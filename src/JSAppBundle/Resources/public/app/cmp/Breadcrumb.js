/**
 * Created by maglo on 17/10/2016.
 */
Ext.define('JS.cmp.Breadcrumb',{
    extend:'Xfr.Component',
    config:{

        jsApp:null
    },
    initialize:function(){
        console.log("initialize site map");
        var me=this;
        me.callParent(arguments);
    },
    afterRenderTpl:function(){
        console.log("After render tpl Site map");
        var me=this;
        me.callParent(arguments);

        me.binder.on('click', function(e){

            console.log("click on site map item");
            console.log(e);

            console.log('index');
            console.log(e.index);
            me.getJsApp().showBreadcrumb(e.index.index);
        });
    }
});