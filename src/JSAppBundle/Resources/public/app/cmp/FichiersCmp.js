/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.cmp.FichiersCmp", {
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
        review:null,
        title: 'View',
        subtitle: '',
        fichiers: [],
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
            me.binder.on('add-fichier', function (e) {
                console.log("add button clicked");
                me.showDialogAdd();
            });
            me.binder.on('edit-fichier', function (e) {
                console.log("edit button clicked");
                me.showDialogEdit(e);
            });
            me.binder.on('remove-fichier', function (e) {
                console.log("remove button clicked");
                me.removeFichier(e);
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
        var article=me.getArticle();
        var review=me.getReview();
        var articleId, reviewId;
        if(article){
            articleId=article.id;
        }
        if(review){
            reviewId=review.id;
        }
        $.ajax({
            url: Routing.generate('get_fichiers', {
                _format: 'json',
                articleId: articleId,
                reviewId: reviewId
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
                    me.setFichiers(response.data);
                    var data={
                        article: me.getArticle(),
                        fichiers: response.data,
                        baseUrl:baseUrl
                    };

                    console.log(data);
                    me.setData(data);

                    me.fireEvent('afterfilesloaded', me);
                }
                else{
                    console.log("Success False");
                    console.log(response);
                    //$("li[data-step="+currentStep+"]").removeClass('completed');

                }
                //$("li.current").toggleClass('current');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: "+ errorThrown);

                //$("li[data-step="+currentStep+"]").removeClass('completed');
            }
        });
    },
    addFichier: function(fichier){
        var me=this;
        var fichiers=me.getFichiers();
        fichiers.push(fichier);
        var data={
            article: me.getArticle(),
            fichiers: fichiers,
            baseUrl:baseUrl
        };
        console.log(data);
        me.setData(data);
    },
    editFichier:function(fichier){
        var me=this;
        var fichiers=me.getFichiers();
        for (var i=0; i<fichiers.length; i++){
            if(fichiers[i].id==fichier.id){
                fichiers[i]=fichier;
                break;
            }
        }
        var data={
            article: me.getArticle(),
            fichiers: fichiers,
            baseUrl:baseUrl
        };
        console.log(data);
        me.setData(data);
    },
    showDialogAdd: function(){

        var me=this;
        var dialog=Ext.create("Xfr.panel.Window", {
            size: 'medium',
            title:  "Adding attachment",
            renderTo: document.body,
            items: [{
                className: "JS.fichier.FichierForm",
                height: "100%",
                position: '[xfr-window-content]',
                fichier: null,
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
            title:  "Editing attachment",
            renderTo: document.body,
            items: [{
                className: "JS.fichier.FichierForm",
                height: "100%",
                position: '[xfr-window-content]',
                fichier: context.context,
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
    removeFichier:function(context){
        var me=this;
        console.log(context);
        $.ajax({
            url: Routing.generate('delete_fichier', {
                _format: 'json',
                id: context.context.id,
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
                    var fichiers=me.getFichiers();
                    var newList=[];
                    for (var i=0; i<fichiers.length; i++){
                        if(fichiers[i].id==context.context.id){

                            continue;
                        }
                        else{
                            newList.push(fichiers[i]);
                        }
                    }
                    me.setFichiers(newList);
                    var data={
                        article: me.getArticle(),
                        fichiers: newList,
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