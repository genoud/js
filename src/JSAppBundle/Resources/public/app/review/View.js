/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.review.View", {
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
            "render": {
                fn: "onShow"
            }
        },
        eventBound:false,
        action:"",
        review:null,
        title: 'View',
        subtitle: 'View',
        jsApp:null,
        author: false,
        reviewer: true,
        editor:false
    },
    initialize: function () {
        var me = this;
        console.log("Initialising View class");

        var templateHelpers= {
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

        console.log("Status of the review in after render tpl "+me.getReview().statut);

        console.log(me.getReview());
         console.log("Is Viewser? ");
        console.log(me.getReviewer());

        var data={
            review: me.getReview(),
            baseUrl: baseUrl
        };
        me.setData(data);

        var review=me.getReview();
        var articleView=Ext.create("JS.article.View",{
            title: review.article.titre_court,
            article: review.article,
            editor: false,
            author: false,
            reviewer:true,
            showToolBar: false,
            renderTo: "review-articleview-container"
        });

        console.log("binding events on buttons");

        me.binder.on('edit-review', function(e){
            console.log("Accept request clicked");
            console.log(e);
            me.editReview();
        });

        me.binder.on('submit-review', function(e){
            console.log("Accept request clicked");
            console.log(e);
            me.submitReview();
        });

        me.binder.on('validate-review', function(e){
            console.log("Accept request clicked");
            console.log(e);
            me.validateRewiew();
        });

        me.binder.on('reject-review', function(e){
            console.log("reviewrequest reject request clicked");
            console.log(e);
            me.rejectReview();
        });



        console.log("End event binding on button");



    },
    editReview:function(){
        var me=this;
        var review=me.getReview();
        me.getJsApp().showPanel("JS.review.Form", {
            title: review.titre,
            review: review
        });
    },

    rejectReview:function(){
        var me=this;
        var review=me.getReview();
        var id=-1;
        if(review!=null){
            id=review.id;
        }

        me.sentAction(Routing.generate('put_review_reject', {
            _format: 'json',
            id: id
        }), function(){
            var message="Review validated successfully";
            Xfr.Msg.show({
                message: message,
                title: "Manuscript review",
                icon: Xfr.Msg.SUCCESS.iconClass,
                action:function(btn){
                    me.getJsApp().back();
                }
            });
        });
    },
    validateRewiew:function(){
        var me=this;
        var review=me.getReview();
        var id=-1;
        if(review!=null){
            id=review.id;
        }

        me.sentAction(Routing.generate('put_review_validate', {
            _format: 'json',
            id: id
        }), function(){
            var message="Review validated successfully";
            Xfr.Msg.show({
                message: message,
                title: "Manuscript review",
                icon: Xfr.Msg.SUCCESS.iconClass,
                action:function(btn){
                    me.getJsApp().back();
                }
            });
        });
    },
    submitReview:function(){
        var me=this;
        var review=me.getReview();
        var id=-1;
        if(review!=null){
            id=review.id;
        }

        me.sentAction(Routing.generate('put_review_submit', {
            _format: 'json',
            id: id
        }), function(){
            var message="Review submitted successfully!";
            Xfr.Msg.show({
                message: message,
                title: "Manuscript review",
                icon: Xfr.Msg.SUCCESS.iconClass,
                action:function(btn){
                    me.getJsApp().back();
                }
            });
        });
    },
    sentAction: function(url, callback){
        var me=this;


        Xfr.Mask.show("Submitting review...", null, me.$this);




        $.ajax({
            url: url,
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
                    callback();
                }
                else{
                    console.log("Success False");


                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: "+ errorThrown);
                Xfr.Mask.hide();

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