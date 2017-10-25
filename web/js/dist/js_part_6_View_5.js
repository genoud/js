/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.utilisateur.View", {
    //extend: "JS.panel.Form",
    extend: "Xfr.Component",
    config: {
        dynamicTpl: false,

        panelData: {
            formUrl: Routing.generate("get_utilisateur", {id: "new", _format: 'html'})
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
        utilisateur:null,
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
    afterRenderTpl: function () {
        var me = this;
        me.callParent(arguments);

        var id="new";
        if(me.getUtilisateur()!=null){
            id=me.getUtilisateur().id;
        }

        var data=me.getData();

        data.baseUrl=baseUrl;

        me.setData(data);

        me.binder.on('on-edit', function (e) {

            var form=me.getJsApp().showPanel("JS.utilisateur.Form",{
                title: me.getUtilisateur().personne.prenom?me.getUtilisateur().personne.prenom:''+ me.getUtilisateur().personne.nom,
                subtitle: "Edit",
                parentCmp: me,
                utilisateur: me.getUtilisateur(),
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