/**
 * Created by maglo on 10/09/2016.
 */
Ext.define('JS.reviewer.ReviewerHome', {
    "extend": "Xfr.Component",
    config: {
        jsApp: null,
        eventBound: false,
        title:"Reviewer Home",
        eventBound:false
    },
    initialize: function () {
        var me = this;


        me.callParent(arguments);

        //me.innitNotification();
    },
    afterRenderTpl: function () {
        var me = this;
        me.callParent(arguments);
        Xfr.Mask.show("Loading...", null, me.$this);
        $.ajax({
            url: Routing.generate("get_reviewer_count", {
                _format: "json"
            }),
            type: "GET",
            dataType: "json",
            success: function (response, textStatus, jqXHR) {
                console.log("Response");
                console.log(response);
                Xfr.Mask.hide();
                me.setData(response);
                if(!me.getEventBound()){
                    me.bindEvent();
                    me.setEventBound(true);
                }
            }
        });


    },
    bindEvent: function () {
        console.log("binding events...");
        var me = this;


        me.binder.on('rev-request', function(e){
            console.log("Review request clicked");
            me.getJsApp().showPanel("JS.reviewrequest.List",{
                title:"Review Requests",
                subtitle: "List"
            });
        });

        me.binder.on('rev-in-progress', function(e){
            console.log("Review in progress clicked");
            me.getJsApp().showPanel("JS.review.List",{
                title:"Review in progress",
                subtitle: "List",
                status:1
            });
        });

        me.binder.on('submitted-review', function(e){
            console.log("Completed review clicked");
            me.getJsApp().showPanel("JS.review.List",{
                title:"Completed review",
                subtitle: "List",
                status:2
            });
        });

        me.binder.on('validated-review', function(e){
            console.log("Completed review clicked");
            me.getJsApp().showPanel("JS.review.List",{
                title:"Completed review",
                subtitle: "List",
                status:3
            });
        });

        me.binder.on('rejected-review', function(e){
            console.log("Completed review clicked");
            me.getJsApp().showPanel("JS.review.List",{
                title:"Completed review",
                subtitle: "List",
                status:4
            });
        });






    },
    innitNotification: function () {

    },
    onShow:function(me){
        var me = this;
        me.callParent(arguments);
        Xfr.Mask.show("Loading...", null, me.$this);
        $.ajax({
            url: Routing.generate("get_reviewer_count", {
                _format: "json"
            }),
            type: "GET",
            dataType: "json",
            success: function (response, textStatus, jqXHR) {
                console.log("Response");
                console.log(response);
                Xfr.Mask.hide();
                me.setData(response);
                if(!me.getEventBound()){
                    me.bindEvent();
                    me.setEventBound(true);
                }
            }
        });
    }
});
