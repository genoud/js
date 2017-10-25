/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.reviewrequest.View", {
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
        reviewrequest:null,
        title: 'View',
        subtitle: '',
        jsApp:null,
        author: false,
        reviewer: false,
        editor:true
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

        var data={
            reviewrequest: me.getReviewrequest(),
            baseUrl: baseUrl
        };
        me.setData(data);

        var request=me.getReviewrequest();
        var articleView=Ext.create("JS.article.View",{
            title: request.article.titre_court,
            article: request.article,
            editor: false,
            author: false,
            reviewer:true,
            showToolBar: false,
            renderTo: "review-request-articleview-container"
        });

        console.log("binding events on buttons");

        me.binder.on('accept-request', function(e){
            console.log("Accept request clicked");
            console.log(e);
            me.handleReviewRequest( true);
        });

        me.binder.on('reject-request', function(e){
            console.log("reviewrequest reject request clicked");
            console.log(e);
            me.handleReviewRequest( false);
        });

        console.log("End event binding on button");



    },
    handleReviewRequest: function(decision){
        var me=this;
        var reviewrequest=me.getReviewrequest();
        var id=-1;

        Xfr.Mask.show("Validating...", null, me.$this);


        if(reviewrequest!=null){
            id=reviewrequest.id;
        }
        $.ajax({
            url: Routing.generate('put_reviewrequest_handle', {
                _format: 'json',
                id: id,
                decision: decision
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

                    var message="Review request accepted. Thanks you!";
                    if(!decision){
                        message="Review request decline successfully";
                    }
                    Xfr.Msg.show({
                        message: message,
                        title: "Review request",
                        icon: Xfr.Msg.SUCCESS.iconClass,
                        action:function(btn){
                            me.getJsApp().back();
                        }
                    });
                }
                else{
                    console.log("Success False");


                }
                //$("li.current").toggleClass('current');

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