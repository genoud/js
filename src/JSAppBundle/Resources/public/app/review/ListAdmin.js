/**
 * Created by maglo on 27/09/2016.
 */
Ext.define("JS.review.ListAdmin",{
    extend:"JS.panel.HistoryGridPanelAdmin",
    config:{
        page: {
            title: "Reviews",
            data: null,
            parent: null
        },
        panelData: {
            url: "",
            panelClass: "",
            gridUrl: Routing.generate("get_reviews"),
            actions: [{
                param: {
                    "url": "get_reviews",
                    "panelClass": "JS.review.AdvancedSearchAdmin",
                    "formUrl": "",
                    "gridUrl": "get_reviews"
                },
                libelle: "Advanced search",
                description: "Advanced search"
            }],
            buttons:[


            ]
        },
        grid: {
            store: {
                proxy: {
                    url: Routing.generate("get_reviews", {_format: "json"})
                }
            },
            type: "custom",
            dynamicTplClass: "JS.review.GridCustomAdmin"
        },
        status:1,
        eventBound:false,
        jsApp:null
    },
    initialize:function(){

        var me = this;
        me.config.grid.store.proxy.url=Routing.generate("get_reviews", {
            _format: "json"
        });
        this.callParent(arguments);


    },
    onGridSelect: function (grid, selectedIndex, selectedRecord, selectedIndexes, selectedRecords) {
        var me = this;
        this.callParent(arguments);
    },
    onShow:function(){
        var me = this;
        var grid = me.getGrid();
        grid.reload();
    },
    onStoreLoaded: function () {
        var me = this;
        var grid = me.getGrid();

        me.callParent();

        if(!me.getEventBound()){
            grid.binder.on('show-detail', function(e){
                me.getJsApp().showPanel("JS.review.View",{
                    title: e.context.article.titre_court,
                    subtitle: "Review",
                    review: e.context,
                    editor: true,
                    author: false,
                    reviewer:false
                });
            });

            grid.binder.on('validate-review', function(e){
                console.log("Edit review clicked");
                console.log(e);
                me.validateReview(e.context);
            });

            grid.binder.on('reject-review', function(e){
                console.log("Submit review clicked");
                console.log(e);
                me.rejectReview(e.context);
            });

            me.setEventBound(true);
        }
        me.getJsApp().addjustHeight();

    },
    rejectReview:function(review){

        var me=this;
        var id=-1;
        if(review!=null){
            id=review.id;
        }

        me.sentAction(Routing.generate('put_review_reject', {
            _format: 'json',
            id: id
        }), function(){
            var message="Review rejected successfully!";
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
    validateReview:function(review){

        var me=this;
        var id=-1;
        if(review!=null){
            id=review.id;
        }

        me.sentAction(Routing.generate('put_review_validate', {
            _format: 'json',
            id: id
        }), function(){
            var message="Review validated successfully!";
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
    afterRenderTpl:function(){
        var me=this;
        me.callParent(arguments);



    }
});