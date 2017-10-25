/**
 * Created by maglo on 10/09/2016.
 */
Ext.define('JS.Article.AuthorHome', {
    "extend": "Xfr.Component",
    config: {
        jsApp: null,
        eventBound: false,
        title:"Home"
    },
    //constructor: function (config) {
    //    var me = this;
    //    console.log("constructeur Author List");
    //    console.log(config);
    //    Ext.apply(me.config, config);
    //    me.initialize();
    //},
    initialize: function () {
        var me = this;
        Xfr.log("Initialising app class");
        Xfr.log("Loading pageClass");

        console.log(me.config);

        me.callParent(arguments);

        //me.innitNotification();
    },
    afterRenderTpl: function () {
        var me = this;
        me.callParent(arguments);
        $.ajax({
            url: Routing.generate("get_author_manuscrit_count", {
                _format: "json"
            }),
            type: "GET",
            dataType: "json",
            success: function (response, textStatus, jqXHR) {
                console.log("Response");
                console.log(response);
                me.setData(response);
                if(!me.getEventBound()){
                    me.bindEvent();
                }
            }
        });


    },
    bindEvent: function () {
        console.log("binding events...");
        var me = this;
        me.binder.on('new', function(e){
            console.log("button clicked");
            me.getJsApp().showPanel("JS.article.ManuscritForm",{});
        });

        me.binder.on('sub1', function(e){
            console.log("Submission sent back to user clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Submission sent back to author"
            });
        });

        //$("#btn-edition-home-new-article").on('click', function () {
        //    //chargement de la classe Emprunt Manager
        //    //console.log("Chargement du portefeuille");
        //
        //    console.log("Clique sur le boutoon nouveau article")
        //    Xfr.Mask.show('Chargement...');
        //
        //    $("#edition-main-container").empty();
        //    //me.destroyCurrentPanel();
        //    var panel = Ext.create('JS.article.ManuscritForm', {
        //        renderTo: "edition-main-container"
        //    });
        //
        //    //me.setCurrentPanel(panel);
        //    //
        //    //$("ul.nav.child_menu>li").removeClass("active");
        //    //$( this).parent().addClass("active");
        //
        //});


    },
    innitNotification: function () {

    },
    destroyCurrentPanel: function () {
        var me = this;
        if (me.getCurrentPanel() !== null) {
            console.log("Desctruction du panneau courant");
            $("#erating-main-container").empty();
            me.getCurrentPanel().destroy();
        }
    }
});
