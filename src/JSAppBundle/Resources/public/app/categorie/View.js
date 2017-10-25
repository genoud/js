/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.categorie.View", {
    //extend: "JS.panel.Form",
    extend: "Xfr.Component",
    config: {
        dynamicTpl: false,

        panelData: {
            formUrl: Routing.generate("get_categorie", {id: "new", _format: 'html'})
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
        categorie:null,
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
    editCategorie:function(categorie){
        var me=this;
        me.setCategorie(categorie);
        me.getParentCmp().editCategorie(categorie);
        me.binder.set("categorie", categorie);
    },
    addCategorie:function(categorie){
        var me=this;
        me.setCategorie(categorie);
        me.getParentCmp().addCategorie(categorie);
        me.binder.set("categorie", categorie);
    },
    afterRenderTpl: function () {
        var me = this;
        me.callParent(arguments);

        var id="new";
        if(me.getCategorie()!=null){
            id=me.getCategorie().id;
        }

        var data=me.getData();

        data.baseUrl=baseUrl;

        me.setData(data);

        me.binder.on('on-edit', function (e) {

            var form=me.getJsApp().showPanel("JS.categorie.Form",{
                title: me.getCategorie().intitule,
                subtitle: "Edit",
                parentCmp: me,
                categorie: me.getCategorie(),
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