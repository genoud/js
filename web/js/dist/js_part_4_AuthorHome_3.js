/**
 * Created by maglo on 10/09/2016.
 */
Ext.define('JS.article.AuthorHome', {
    "extend": "Xfr.Component",
    config: {
        jsApp: null,
        eventBound: false,
        title:"Author Home"
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
        Xfr.Mask.show('Loading data...', null, me.$this);
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
                    me.setEventBound(true);
                }
                Xfr.Mask.hide();
            }
        });


    },
    onShow:function(me){
        var me = this;
        me.callParent(arguments);
        Xfr.Mask.show('Loading data...', null, me.$this);
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
                    me.setEventBound(true);
                }
                Xfr.Mask.hide();
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
                title:"Submission sent back to author",
                subtitle: "List",
                status:1
            });
        });

        me.binder.on('sub2', function(e){
            console.log("Submission sent back to user clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Incomplete submissions",
                subtitle: "List",
                status:2
            });
        });

        me.binder.on('sub3', function(e){
            console.log("Submission waiting for validation clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Submission waiting for validation",
                subtitle: "List",
                status:3
            });
        });

        me.binder.on('sub4', function(e){
            console.log("Submission waiting for validation clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Submission in progress",
                subtitle: "List",
                status:4
            });
        });

        me.binder.on('rev1', function(e){
            console.log("Submission waiting for validation clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Submission waiting for revision",
                subtitle: "List",
                status:5
            });
        });

        me.binder.on('rev2', function(e){
            console.log("Submission waiting for validation clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Revision sent back to the author",
                subtitle: "List",
                status:6
            });
        });

        me.binder.on('rev3', function(e){
            console.log("Submission waiting for validation clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Incomplete revision",
                subtitle: "List",
                status:7
            });
        });

        me.binder.on('rev4', function(e){
            console.log("Submission waiting for validation clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Revision waiting for validation",
                subtitle: "List",
                status:8
            });
        });

        me.binder.on('rev5', function(e){
            console.log("Submission waiting for validation clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Revision in progress",
                subtitle: "List",
                status:9
            });
        });

        me.binder.on('rev6', function(e){
            console.log("Submission waiting for validation clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Revision rejected",
                subtitle: "List",
                status:10
            });
        });

        me.binder.on('com1', function(e){
            console.log("Submission waiting for validation clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Submission with a decision",
                subtitle: "List",
                status:11
            });
        });

        me.binder.on('com2', function(e){
            console.log("Submission waiting for validation clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Submission with completed production",
                subtitle: "List",
                status:12
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
