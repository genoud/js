/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.article.ManuscritAuthorsCmp", {
    //extend: "JS.panel.Form",
    extend: "Xfr.Component",
    config: {
        dynamicTpl: false,
        listeners: {
            "loadtpl": {
                fn: "onLoadTpl"
            },
            //"afterrendertpl": {
            //    fn: "afterRenderTpl"
            //},
            "render": {
                fn: "onShow"
            }
        },
        eventBound:false,
        action:"",
        article:null,
        title: 'View',
        subtitle: '',
        coauteurs: [],
        jsApp:null
    },
    onLoadTpl: function () {
        var me = this;
        console.log("View tpl form loaded");
        me.callParent(arguments);

    },
    afterRenderTpl: function () {
        var me = this;
        me.callParent(arguments);

        //On set les données du template

        if(!me.getEventBound()){
            console.log("Event not yet bound");
            me.binder.on('add-author', function (e) {
                console.log("add button clicked");
                me.showDialogAdd();
            });
            me.binder.on('edit-author', function (e) {
                console.log("edit button clicked");
                me.showDialogEdit(e);
            });
            me.binder.on('remove-author', function (e) {
                console.log("remove button clicked");
                me.removeAuthor(e);
            });
            me.binder.on('set-principal', function (e) {
                console.log("set principal button clicked");
                me.setPrincipal(e);
            });
            me.setEventBound(true);
        }
        else{
            console.log("Event already bound");
        }
        me.loadData();





    },
    loadData: function(){
        var me = this;
        $.ajax({
            url: Routing.generate('get_coauteurs', {
                _format: 'json',
                articleId: me.getArticle().id
            }),
            cache: false,
            contentType: false,
            processData: false,
            type: "GET",
            data: null,
            dataType: "json",
            success: function (response, textStatus, jqXHR) {
                console.log("ajax success");
                console.log(response);
                if(response && response.success){
                    console.log("Response success");
                    console.log(response);
                    me.setCoauteurs(response.data);
                    var data={
                        article: me.getArticle(),
                        coauteurs: response.data,
                        baseUrl:baseUrl
                    };

                    console.log(data);
                    me.setData(data);
                    me.fireEvent('afterauthorloaded', me);
                }
                else{
                    console.log("Success False");
                    $("li[data-step="+currentStep+"]").removeClass('completed');

                }
                //$("li.current").toggleClass('current');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: "+ errorThrown);
                $("li[data-step="+currentStep+"]").removeClass('completed');
            }
        });
    },
    addCoauteur: function(coauteur){
        var me=this;
        var coauteurs=me.getCoauteurs();
        coauteurs.push(coauteur);
        var data={
            article: me.getArticle(),
            coauteurs: coauteurs,
            baseUrl:baseUrl
        };
        console.log(data);
        me.setData(data);
    },
    editCoauteur:function(coauteur){
        var me=this;
        var coauteurs=me.getCoauteurs();
        for (var i=0; i<coauteurs.length; i++){
            if(coauteurs[i].id==coauteur.id){
                coauteurs[i]=coauteur;
                break;
            }
        }
        var data={
            article: me.getArticle(),
            coauteurs: coauteurs,
            baseUrl:baseUrl
        };
        console.log(data);
        me.setData(data);
    },
    showDialogAdd: function(){

        var me=this;
        var dialog=Ext.create("Xfr.panel.Window", {
            size: 'medium',
            title:  "Adding author",
            renderTo: document.body,
            items: [{
                className: "JS.auteur.CoAuteurForm",
                height: "100%",
                position: '[xfr-window-content]',
                coAuteur: null,
                parentCmp : me,
                jsApp: me.getJsApp(),
                listeners: {
                    "onCancel": function(){
                        console.log("Cancel event fired");
                        dialog.hide();
                    }
                }
            }]
        });
        dialog.show();
    },
    showDialogEdit: function(context){

        console.log(context);

        var me=this;
        var dialog=Ext.create("Xfr.panel.Window", {
            size: 'medium',
            title:  "Adding author",
            renderTo: document.body,
            items: [{
                className: "JS.auteur.CoAuteurForm",
                height: "100%",
                position: '[xfr-window-content]',
                coAuteur: context.context,
                parentCmp : me,
                jsApp: me.getJsApp(),
                listeners: {
                    "onCancel": function(){
                        console.log("Cancel event fired");
                        dialog.hide();
                    }
                }
            }]
        });
        dialog.show();
    },
    removeAuthor:function(context){
        var me=this;
        console.log(context);
        $.ajax({
            url: Routing.generate('delete_coauteur', {
                _format: 'json',
                id: context.context.id
            }),
            cache: false,
            contentType: false,
            processData: false,
            type: "DELETE",
            data: null,
            dataType: "json",
            success: function (response, textStatus, jqXHR) {
                console.log("ajax success");
                console.log(response);
                if(response && response.success){
                    console.log("Response success");
                    console.log(response);
                    var coauteurs=me.getCoauteurs();
                    var newList=[];
                    for (var i=0; i<coauteurs.length; i++){
                        if(coauteurs[i].id==context.context.id){

                            continue;
                        }
                        else{
                            newList.push(coauteurs[i]);
                        }
                    }
                    me.setCoauteurs(newList);
                    var data={
                        article: me.getArticle(),
                        coauteurs: newList,
                        baseUrl:baseUrl
                    };
                    console.log(data);
                    me.setData(data);
                }


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: "+ errorThrown);
                //$("li[data-step="+currentStep+"]").removeClass('completed');
            }
        });
    },
    setPrincipal:function(context){
        console.log(context);
        var me=this;
        console.log(context);
        $.ajax({
            url: Routing.generate('put_coauteur', {
                _format: 'json',
                id: context.context.id,
                principal:true
            }),
            cache: false,
            contentType: false,
            processData: false,
            type: "PUT",
            data: null,
            dataType: "json",
            success: function (response, textStatus, jqXHR) {
                console.log("ajax success");
                console.log(response);
                if(response && response.success){
                    console.log("Response success");
                    console.log(response);
                    var coauteurs=me.getCoauteurs();

                    var coauteur=response.data;
                    for (var i=0; i<coauteurs.length; i++){
                        if(coauteurs[i].id==coauteur.id){
                            coauteurs[i]=coauteur;
                            continue;
                        }
                        else{
                            coauteurs[i].principal=false;
                        }
                    }
                    var data={
                        article: me.getArticle(),
                        coauteurs: coauteurs,
                        baseUrl:baseUrl
                    };
                    console.log(data);
                    me.setData(data);
                }


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: "+ errorThrown);
                //$("li[data-step="+currentStep+"]").removeClass('completed');
            }
        });
    },
    onShow: function () {
        var me = this;
        Xfr.log("View form rendered or shown");
        me.callParent(arguments);

    },
    initialize: function () {
        var me = this;
        console.log("Initialising View class");
        me.callParent(arguments);
    },
    statics: {

    }
});