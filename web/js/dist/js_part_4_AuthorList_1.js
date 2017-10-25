/**
 * Created by maglo on 10/09/2016.
 */
Ext.define('JS.Article.AuthorList', {
    config: {
    },
    constructor: function (config) {
        var me = this;
        console.log("constructeur Author List");
        console.log(config);
        Ext.apply(me.config, config);
        me.initialize();
    },
    initialize: function () {
        var me = this;
        Xfr.log("Initialising app class");
        Xfr.log("Loading pageClass");

        console.log(me.config);

        me.bindEvent();
        //me.innitNotification();
    },
    bindEvent: function () {
        console.log("binding events");
        var me = this;

        $("#btn-edition-home-new-article").on('click', function () {
            //chargement de la classe Emprunt Manager
            //console.log("Chargement du portefeuille");

            console.log("Clique sur le boutoon nouveau article")
            Xfr.Mask.show('Chargement...');

            $("#edition-main-container").empty();
            //me.destroyCurrentPanel();
            var panel = Ext.create('JS.article.ManuscritForm', {
                renderTo: "edition-main-container"
            });

            //me.setCurrentPanel(panel);
            //
            //$("ul.nav.child_menu>li").removeClass("active");
            //$( this).parent().addClass("active");

        });


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
