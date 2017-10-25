/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.cmp.ReviewersCmp", {
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
        reviewers: [],
        opposed:false,
        suggested:true,
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
            me.binder.on('add-reviewer', function (e) {
                console.log("add button clicked");
                me.showDialogAdd();
            });
            me.binder.on('edit-reviewer', function (e) {
                console.log("edit button clicked");
                me.showDialogEdit(e);
            });
            me.binder.on('remove-reviewer', function (e) {
                console.log("remove button clicked");
                me.removeReviewer(e);
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
            url: Routing.generate('get_articlereviewers', {
                _format: 'json',
                articleId: me.getArticle().id,
                opposed:me.getOpposed(),
                suggested:me.getSuggested()
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
                    me.setReviewers(response.data);
                    var data={
                        article: me.getArticle(),
                        reviewers: response.data,
                        baseUrl:baseUrl
                    };

                    console.log(data);
                    me.setData(data);

                    me.fireEvent('afterreviewerloaded', me);
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
    addReviewer: function(reviewer){
        var me=this;
        var reviewers=me.getReviewers();
        reviewers.push(reviewer);
        var data={
            article: me.getArticle(),
            reviewers: reviewers,
            baseUrl:baseUrl
        };
        console.log(data);
        me.setData(data);
    },
    editReviewer:function(reviewer){
        var me=this;
        var reviewers=me.getReviewers();
        for (var i=0; i<reviewers.length; i++){
            if(reviewers[i].id==reviewer.id){
                reviewers[i]=reviewer;
                break;
            }
        }
        var data={
            article: me.getArticle(),
            reviewers: reviewers,
            baseUrl:baseUrl
        };
        console.log(data);
        me.setData(data);
    },
    showDialogAdd: function(){

        var me=this;
        var dialog=Ext.create("Xfr.panel.Window", {
            size: 'medium',
            title:  "Adding reviewer",
            renderTo: document.body,
            items: [{
                className: "JS.reviewer.ArticleReviewerForm",
                height: "100%",
                position: '[xfr-window-content]',
                reviewer: null,
                opposed : me.getOpposed(),
                suggested : me.getSuggested(),
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
            title:  "Editing Reviewer",
            renderTo: document.body,
            items: [{
                className: "JS.reviewer.ArticleReviewerForm",
                height: "100%",
                position: '[xfr-window-content]',
                reviewer: context.context,
                opposed : me.getOpposed(),
                suggested : me.getSuggested(),
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
    removeReviewer:function(context){
        var me=this;
        console.log(context);
        $.ajax({
            url: Routing.generate('delete_articlereviewer', {
                _format: 'json',
                id: context.context.id,
                opposed: me.getOpposed(),
                suggested: me.getSuggested()
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
                    var reviewers=me.getReviewers();
                    var newList=[];
                    for (var i=0; i<reviewers.length; i++){
                        if(reviewers[i].id==context.context.id){

                            continue;
                        }
                        else{
                            newList.push(reviewers[i]);
                        }
                    }
                    me.setReviewers(newList);
                    var data={
                        article: me.getArticle(),
                        reviewers: newList,
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