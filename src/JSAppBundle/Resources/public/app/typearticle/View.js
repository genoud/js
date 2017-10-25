/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.typearticle.View", {
    //extend: "JS.panel.Form",
    extend: "Xfr.Component",
    config: {
        dynamicTpl: false,

        panelData: {
            formUrl: Routing.generate("get_typearticle", {id: "new", _format: 'html'})
        },
        listeners: {
            "loadtpl": {
                fn: "onLoadTpl"
            },
            //"afterrendertpl": {
            //    fn: "afterRenderTpl"
            //},
            "render": {
                fn: "onShow"
            },
            "onCancel": Ext.emptyFn
        },
        eventBound:false,
        //currentStep:1,
        action:"new",
        typearticle:null,
        title: 'New author',
        subtitle: 'New',
        parentCmp:null,
        baseUrl: baseUrl,
        jsApp:null
    },
    onLoadTpl: function () {
        var me = this;
        me.callParent(arguments);

    },
    editTypearticle:function(typearticle){
        var me=this;
        me.setTypearticle(typearticle);
        me.getParentCmp().editTypearticle(typearticle);
        me.binder.set("typearticle", typearticle);
    },
    addTypearticle:function(typearticle){
        var me=this;
        me.setTypearticle(typearticle);
        me.getParentCmp().addTypearticle(typearticle);
        me.binder.set("typearticle", typearticle);
    },
    afterRenderTpl: function () {
        var me = this;
        me.callParent(arguments);

        var id="new";
        if(me.getTypearticle()!=null){
            id=me.getTypearticle().id;
        }

        var data=me.getData();

        data.baseUrl=baseUrl;

        me.setData(data);

        me.binder.on('on-edit', function (e) {

            var form=me.getJsApp().showPanel("JS.typearticle.Form",{
                title: me.getTypearticle().intitule,
                subtitle: "Edit",
                parentCmp: me,
                typearticle: me.getTypearticle(),
                listeners: {
                    "onCancel": function(){
                        console.log("Cancel event fired");
                        me.getJsApp().back();
                    }
                }

            });
        });

    },


    onShow: function () {
        var me = this;

        me.callParent(arguments);

    },
    initialize: function () {
        var me = this;

        me.callParent(arguments);



    }
});