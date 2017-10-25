/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.article.ManuscritFundingsCmp", {
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
        fundings: [],
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
            me.binder.on('add-funding', function (e) {
                console.log("add button clicked");
                me.showDialogAdd();
            });
            me.binder.on('edit-funding', function (e) {
                console.log("edit button clicked");
                me.showDialogEdit(e);
            });
            me.binder.on('remove-funding', function (e) {
                console.log("remove button clicked");
                me.removeFunding(e);
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
            url: Routing.generate('get_fundings', {
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
                    me.setFundings(response.data);
                    var data={
                        article: me.getArticle(),
                        fundings: response.data,
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
    addFunding: function(funding){
        var me=this;
        var fundings=me.getFundings();
        fundings.push(funding);
        var data={
            article: me.getArticle(),
            fundings: fundings,
            baseUrl:baseUrl
        };
        console.log(data);
        me.setData(data);
    },
    editFunding:function(funding){


        var me=this;
        var fundings=me.getFundings();
        for (var i=0; i<fundings.length; i++){
            if(fundings[i].id==funding.id){
                fundings[i]=funding;
                break;
            }
        }
        var data={
            article: me.getArticle(),
            fundings: fundings,
            baseUrl:baseUrl
        };
        console.log(data);
        me.setData(data);
    },
    showDialogAdd: function(){

        var me=this;
        var dialog=Ext.create("Xfr.panel.Window", {
            size: 'medium',
            title:  "Adding funding",
            renderTo: document.body,
            items: [{
                className: "JS.funding.FundingForm",
                height: "100%",
                position: '[xfr-window-content]',
                funding: null,
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
            title:  "Editing funding",
            renderTo: document.body,
            items: [{
                className: "JS.funding.FundingForm",
                height: "100%",
                position: '[xfr-window-content]',
                funding: context.context,
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
    removeFunding:function(context){
        console.log(context);
        var me=this;
        $.ajax({
            url: Routing.generate('delete_funding', {
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
                    var fundings=me.getFundings();
                    var newList=[];
                    for (var i=0; i<fundings.length; i++){
                        if(fundings[i].id==context.context.id){

                            continue;
                        }
                        else{
                            newList.push(fundings[i]);
                        }
                    }
                    me.setFundings(newList);
                    var data={
                        article: me.getArticle(),
                        fundings: newList,
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