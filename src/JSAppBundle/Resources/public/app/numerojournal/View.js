/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.numerojournal.View", {
    //extend: "JS.panel.Form",
    extend: "Xfr.Component",
    config: {
        dynamicTpl: false,

        panelData: {
            formUrl: Routing.generate("get_numerojournal", {id: "new", _format: 'html'})
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
        numeroJournal:null,
        title: 'Jouanal number',
        subtitle: 'View',
        parentCmp:null,
        baseUrl: baseUrl,
        jsApp:null
    },
    onLoadTpl: function () {
        var me = this;
        me.callParent(arguments);

    },
    editTypefichier:function(numeroJournal){
        var me=this;
        me.setNumeroJournal(numeroJournal);
        me.getParentCmp().editNumeroJournal(numeroJournal);
        me.binder.set("numeroJournal", numeroJournal);
    },
    addNumeroJournal:function(numeroJournal){
        var me=this;
        me.setNumeroJournal(numeroJournal);
        me.getParentCmp().addNumeroJournal(numeroJournal);
        me.binder.set("numeroJournal", numeroJournal);
    },
    afterRenderTpl: function () {
        var me = this;
        me.callParent(arguments);

        var id="new";
        if(me.getNumeroJournal()!=null){
            id=me.getNumeroJournal().id;
        }

        var data=me.getData();

        data.baseUrl=baseUrl;

        me.setData(data);

        me.binder.on('on-edit', function (e) {

            var form=me.getJsApp().showPanel("JS.numerojournal.Form",{
                title: me.getNumeroJournal().numero,
                subtitle: "Edit",
                parentCmp: me,
                typefichier: me.getNumeroJournal(),
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