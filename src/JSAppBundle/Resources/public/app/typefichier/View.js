/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.typefichier.View", {
    //extend: "JS.panel.Form",
    extend: "Xfr.Component",
    config: {
        dynamicTpl: false,

        panelData: {
            formUrl: Routing.generate("get_typefichier", {id: "new", _format: 'html'})
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
        typefichier:null,
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
    editTypefichier:function(typefichier){
        var me=this;
        me.setTypefichier(typefichier);
        me.getParentCmp().editTypefichier(typefichier);
        me.binder.set("typefichier", typefichier);
    },
    addTypefichier:function(typefichier){
        var me=this;
        me.setTypefichier(typefichier);
        me.getParentCmp().addTypefichier(typefichier);
        me.binder.set("typefichier", typefichier);
    },
    afterRenderTpl: function () {
        var me = this;
        me.callParent(arguments);

        var id="new";
        if(me.getTypefichier()!=null){
            id=me.getTypefichier().id;
        }

        var data=me.getData();

        data.baseUrl=baseUrl;

        me.setData(data);

        me.binder.on('on-edit', function (e) {

            var form=me.getJsApp().showPanel("JS.typefichier.Form",{
                title: me.getTypefichier().intitule,
                subtitle: "Edit",
                parentCmp: me,
                typefichier: me.getTypefichier(),
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