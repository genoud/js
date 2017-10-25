/**
 * Created by maglo on 27/09/2016.
 */
Ext.define("JS.review.List",{
    extend:"JS.panel.HistoryGridPanel",
    config:{
        panelData: {
            url: "",
            panelClass: "",
            gridUrl: Routing.generate("get_reviews_by_reviewer"),
            actions: []
        },
        grid: {
            store: {
                proxy: {
                    url: ""
                }
            },
            type: "custom",
            dynamicTplClass: "JS.review.GridCustom",
            templateHelpers: {
            }
        },
        title:"",
        subtitle:"",
        eventBound:false,
        jsApp:null,
        status:1
    },
    initialize:function(){

        var me = this;
        var panelData = me.getPanelData(),
            actions = [];

        var action = {
        };

        me.config.grid.store.proxy.url=Routing.generate("get_reviews_by_reviewer", {
            _format: "json",
            status: me.getStatus()
        });

        //console.log("grid url: "+me.config.grid.store.proxy.url);
        actions.push(action);
        panelData.actions = actions;
        this.callParent(arguments);

    },
    afterRenderTpl:function(){
        this.callParent(arguments);
        $(".xfr-crud-form").hide();
    },
    onGridSelect: function (grid, selectedIndex, selectedRecord, selectedIndexes, selectedRecords) {
        var me = this;
        this.callParent(arguments);
    },
    beforeLoadStore: function () {
        console.log("Before store load...");
        var me = this;
        me.callParent(arguments);
    },
    onStoreLoaded: function () {
        var me = this;
        var grid = me.getGrid();

        me.callParent();

        if(!me.getEventBound()){
            grid.binder.on('show-detail', function(e){
                console.log("review request detail clicked");
                console.log(e);
                me.getJsApp().showPanel("JS.review.View",{
                    title: e.context.article.titre_court,
                    subtitle: "Review",
                    review: e.context,
                    editor: false,
                    author: false,
                    reviewer:true
                });
            });

            grid.binder.on('edit-review', function(e){
                console.log("Edit review clicked");
                console.log(e);
                me.editReview(e.context);
                //me.getJsApp().showPanel("JS.reviewrequest.ManuscritForm",{
                //    title: e.context.titre_court,
                //    reviewrequest: e.context
                //});
            });

            grid.binder.on('submit-review', function(e){
                console.log("Submit review clicked");
                console.log(e);
                me.submitReview(e.context);
            });

            me.setEventBound(true);
        }

    },
    editReview:function(review){
        var me=this;
        me.getJsApp().showPanel("JS.review.Form", {
            title: review.titre,
            review: review
        });
    },
    submitReview:function(review){

        var me=this;
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
    onShow:function(){
        var me = this;
        var grid = me.getGrid();
        grid.reload();
    }
});