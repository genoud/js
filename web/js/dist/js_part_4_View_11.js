/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.article.View", {
    //extend: "JS.panel.Form",
    extend: "Xfr.Component",
    config: {
        dynamicTpl: false,

        panelData: {
            formUrl: Routing.generate("get_manuscrit_step", {stepId: "new", _format: 'html'})
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
            }
        },
        eventBound:false,
        action:"",
        article:null,
        title: 'View',
        subtitle: '',
        jsApp:null,
        author: false,
        reviewer: false,
        editor:true,
        showToolBar:true
    },
    initialize: function () {
        var me = this;
        console.log("Initialising View class");

        var templateHelpers= {
            isArticleEditable: function(article){
                console.log("IsArticleEditable called");
                console.log(article);
                return article.statut=="SOUMISSION_RETOURNE_A_L_AUTEUR" ||
                    article.statut=="SOUMISSION_INCOMPLETE"||
                    article.statut=="SOUMISSION_EN_ATTENTE_DE_VALIDATION"||
                    article.statut=="REVISION_RENVOYE_A_L_AUTEUR"||
                    article.statut=="REVISION_INCOMPLETE"||
                    article.statut=="REVISION_EN_ATTENTE_DE_VALIDATION";
            }

        };

        me.callParent(arguments);

        me.binder.set("helpers", templateHelpers);
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

        var data={
            article: me.getArticle(),
            baseUrl: baseUrl,
            getColor: function(index) {
                // validate hex strisng
                console.log("Generating random color");
                var letters = '012345'.split('');
                var color = '#';
                if(index>5){
                    index=Math.round(Math.random() * 5);
                }
                color += index; //letters[Math.round(Math.random() * 5)];
                letters = '0123456789ABCDEF'.split('');
                for (var i = 0; i < 5; i++) {
                    color += letters[Math.round(Math.random() * 15)];
                }
                return color;
            },
            getFontSize: function(index) {
                // validate hex strisng
                console.log("Generating random font size");

                var fontSize = '%';

                index=Math.round(Math.random() * 60);

                index=index+80;

                fontSize=index+fontSize;

                return fontSize;
            }
        };
        me.setData(data);

        $('.box-body.article-view-box').slimScroll({
            height: '225px'
        });


        console.log("binding events on buttons");

        me.binder.on('assing-editor-view', function (e) {
            console.log("Assign editor button clicked");
            me.showDialogEditor();
        });

        me.binder.on('propose-reviewer-view', function (e) {

            console.log("Propose reviewer button clicked");
            me.showDialogReviewers();
        });

        me.binder.on('sent-back-to-author-view', function (e) {

            console.log("Sent back to author button clicked");
            me.sentBackToAuthor();
        });

        me.binder.on('js-cancel-view', function (e) {

            console.log("Cancel button clicked");
            me.rejectArticle();
        });

        me.binder.on('js-validate-view', function (e) {

            console.log("Cancel button clicked");
            me.acceptArticle();
        });

        me.binder.on('validate-manuscript-view', function (e) {

            console.log("Validate manuscript clicked");
            me.validateManuscript();
            //me.showDialogAdd();
        });

        me.binder.on('show-edit', function(e){
            me.editManuscript();
        });

        me.binder.on('start-revision', function(e){
            me.createRevision();
        });

        console.log("End event binding on button");



    },
    editManuscript: function(){
        var me=this;
        var article=me.getArticle();
        me.getJsApp().showPanel("JS.article.ManuscritForm",{
            title: article.titre_court,
            article: article
        });
    },
    createRevision: function(){
        var me=this;
        var article=me.getArticle();
        var id=-1;

        Xfr.Mask.show("Creating Revision...", null, me.$this);


        if(article!=null){
            id=article.id;
        }
        $.ajax({
            url: Routing.generate('get_article_revision', {
                _format: 'json',
                id: id
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
                Xfr.Mask.hide();
                if(response && response.success){
                    var article=response.data;
                    me.getJsApp().showPanel("JS.article.ManuscritForm",{
                        title: article.titre_court,
                        article: article
                    });
                }
                else{
                    Xfr.Msg.show({
                        message: "An error occured durring revision creation. Please retry in few minutes.",
                        title: "Error",
                        icon: Xfr.Msg.ERROR.iconClass,
                        btn: [
                            {text: Xfr.Msg.OK.text, type: 'btn'}
                        ],
                        action:function(btn){
                            //me.fireEvent('onCancel', me);
                            Xfr.Mask.hide();
                        }

                    });


                }
                //$("li.current").toggleClass('current');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: "+ errorThrown);
                Xfr.Mask.hide();

            }
        });
    },
    validateManuscript: function(){
        var me=this;
        var article=me.getArticle();
        var id=-1;

        Xfr.Mask.show("Validating...", null, me.$this);


        if(article!=null){
            id=article.id;
        }
        $.ajax({
            url: Routing.generate('put_manuscript_validate', {
                _format: 'json',
                id: id
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
                Xfr.Mask.hide();
                if(response && response.success){

                    Xfr.Msg.show({
                        message: "Your manuscript has been submitted successfully!",
                        title: "Success",
                        icon: Xfr.Msg.INFO.iconClass,
                        btn: [
                            {text: Xfr.Msg.OK.text, type: 'btn'}
                        ],
                        action:function(btn){
                            //me.fireEvent('onCancel', me);
                            me.getJsApp().back();
                            Xfr.Mask.hide();
                        }

                    });
                }
                else{
                    Xfr.Msg.show({
                        message: "An error occured durring submission. Please retry in few minutes.",
                        title: "Error",
                        icon: Xfr.Msg.ERROR.iconClass,
                        btn: [
                            {text: Xfr.Msg.OK.text, type: 'btn'}
                        ],
                        action:function(btn){
                            //me.fireEvent('onCancel', me);
                            Xfr.Mask.hide();
                        }

                    });


                }
                //$("li.current").toggleClass('current');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: "+ errorThrown);
                Xfr.Mask.hide();

            }
        });
    },
    showDialogEditor: function(){
        var me=this;
        var dialog=Ext.create("Xfr.panel.Window", {
            size: 'medium',
            title:  "Assigning editor",
            renderTo: document.body,
            items: [{
                className: "JS.article.EditorForm",
                height: "100%",
                position: '[xfr-window-content]',
                reviewer: null,
                selectedArticles : [me.getArticle()],
                parentCmp : me,
                jsApp: me.getJsApp(),
                listeners: {
                    "onCancel": function(){
                        console.log("Cancel event fired");
                        dialog.hide();
                        me.getGrid().reload();
                    }
                }
            }]
        });
        dialog.show();
    },
    showDialogReviewers: function(){
        var me=this;
        var dialog=Ext.create("Xfr.panel.Window", {
            size: 'medium',
            title:  "Proposing reviewers",
            renderTo: document.body,
            items: [{
                className: "JS.article.ReviewRequestForm",
                height: "100%",
                position: '[xfr-window-content]',
                reviewer: null,
                selectedArticles : [me.getArticle()],
                parentCmp : me,
                jsApp: me.getJsApp(),
                listeners: {
                    "onCancel": function(){
                        console.log("Cancel event fired");
                        dialog.hide();
                        me.getGrid().reload();
                    }
                }
            }]
        });
        dialog.show();
    },
    acceptArticle:function(){
        var me=this;

        var id=-1;

        Xfr.Mask.show("Saving...",null);
        //SAve current step

        var selectedArticles=[me.getArticle()];
        var articleIds='';
        if(selectedArticles!=null && selectedArticles.length>0){
            articleIds=selectedArticles[0].id;
            for(var i=1; i<selectedArticles.length; i++){
                articleIds=articleIds+','+selectedArticles[i].id;
            }
        }

        $.ajax({
            url: Routing.generate('post_validate', {
                _format: 'json',
                id: id,
                articleIds: articleIds
            }),
            cache: false,
            contentType: false,
            processData: false,
            type: "POST",
            data: null,
            dataType: "json",
            success: function (response, textStatus, jqXHR) {
                console.log("ajax success");
                console.log(response);
                if(response && response.success){
                    Xfr.Msg.show({
                        message: "Selected articles accepted successfully",
                        title: "Success",
                        icon: Xfr.Msg.INFO.iconClass,
                        btn: [
                            {text: Xfr.Msg.OK.text, type: 'btn'}
                        ],
                        action:function(btn){
                            //me.fireEvent('onCancel', me);
                            Xfr.Mask.hide();
                        }

                    });
                }
                else{
                    console.log("Success False");

                    Xfr.Msg.show({
                        message: response.message,
                        title: "Error",
                        icon: Xfr.Msg.ERROR.iconClass,
                        btn: [
                            {text: Xfr.Msg.OK.text, type: 'btn'}
                        ],
                        action:function(btn){
                            //me.fireEvent('onCancel', me);
                            Xfr.Mask.hide();
                        }
                    });

                }
                //$("li.current").toggleClass('current');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: "+ errorThrown);

            }
        });
    },
    sentBackToAuthor: function(){
        var me=this;

        var id=-1;

        Xfr.Mask.show("Saving...",null);
        //SAve current step

        var selectedArticles=[me.getArticle()];
        var articleIds='';
        if(selectedArticles!=null && selectedArticles.length>0){
            articleIds=selectedArticles[0].id;
            for(var i=1; i<selectedArticles.length; i++){
                articleIds=articleIds+','+selectedArticles[i].id;
            }
        }

        $.ajax({
            url: Routing.generate('post_sentbacktouser', {
                _format: 'json',
                id: id,
                articleIds: articleIds
            }),
            cache: false,
            contentType: false,
            processData: false,
            type: "POST",
            data: null,
            dataType: "json",
            success: function (response, textStatus, jqXHR) {
                console.log("ajax success");
                console.log(response);
                if(response && response.success){
                    Xfr.Msg.show({
                        message: "Selected articles sent back to author successfully",
                        title: "Success",
                        icon: Xfr.Msg.INFO.iconClass,
                        btn: [
                            {text: Xfr.Msg.OK.text, type: 'btn'}
                        ],
                        action:function(btn){
                            Xfr.Mask.hide();
                            //me.fireEvent('onCancel', me);
                        }
                    });
                }
                else{
                    console.log("Success False");

                    Xfr.Msg.show({
                        message: response.message,
                        title: "Error",
                        icon: Xfr.Msg.ERROR.iconClass,
                        btn: [
                            {text: Xfr.Msg.OK.text, type: 'btn'}
                        ],
                        action:function(btn){
                            //me.fireEvent('onCancel', me);
                            Xfr.Mask.hide();
                        }
                    });


                }

                //$("li.current").toggleClass('current');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: "+ errorThrown);

            }
        });
    },
    rejectArticle:function(){
        var me=this;

        var id=-1;

        Xfr.Mask.show("Saving...",null);
        //SAve current step

        var selectedArticles=[me.getArticle()];
        var articleIds='';
        if(selectedArticles!=null && selectedArticles.length>0){
            articleIds=selectedArticles[0].id;
            for(var i=1; i<selectedArticles.length; i++){
                articleIds=articleIds+','+selectedArticles[i].id;
            }
        }

        $.ajax({
            url: Routing.generate('post_reject', {
                _format: 'json',
                id: id,
                articleIds: articleIds
            }),
            cache: false,
            contentType: false,
            processData: false,
            type: "POST",
            data: null,
            dataType: "json",
            success: function (response, textStatus, jqXHR) {
                console.log("ajax success");
                console.log(response);
                if(response && response.success){
                    Xfr.Msg.show({
                        message: "Selected articles rejected successfully",
                        title: "Success",
                        icon: Xfr.Msg.INFO.iconClass,
                        btn: [
                            {text: Xfr.Msg.OK.text, type: 'btn'}
                        ],
                        action:function(btn){
                            //me.fireEvent('onCancel', me);
                            Xfr.Mask.hide();
                        }
                    });
                }
                else{
                    console.log("Success False");

                    Xfr.Msg.show({
                        message: response.message,
                        title: "Error",
                        icon: Xfr.Msg.ERROR.iconClass,
                        btn: [
                            {text: Xfr.Msg.OK.text, type: 'btn'}
                        ],
                        action:function(btn){
                            //me.fireEvent('onCancel', me);
                            Xfr.Mask.hide();
                        }
                    });


                }
                //$("li.current").toggleClass('current');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: "+ errorThrown);

            }
        });
    },
    onShow: function () {
        var me = this;
        Xfr.log("View form rendered or shown");
        me.callParent(arguments);

    },

    statics: {

    }
});