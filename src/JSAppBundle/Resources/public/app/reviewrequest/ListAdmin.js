/**
 * Created by maglo on 27/09/2016.
 */
Ext.define("JS.reviewrequest.ListAdmin",{
    extend:"JS.panel.HistoryGridPanelAdmin",
    config:{
        page: {
            title: "Reviews request",
            data: null,
            parent: null
        },
        panelData: {
            url: "",
            panelClass: "",
            gridUrl: Routing.generate("get_reviewrequests"),
            actions: [{
                param: {
                    "url": "get_reviewrequests",
                    "panelClass": "JS.reviewrequest.AdvancedSearchAdmin",
                    "formUrl": "",
                    "gridUrl": "get_reviewrequests"
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
                    url: Routing.generate("get_reviewrequests", {_format: "json"})
                }
            },
            type: "custom",
            dynamicTplClass: "JS.reviewrequest.GridCustomAdmin"
        },
        status:1,
        eventBound:false,
        jsApp:null
    },
    initialize:function(){

        var me = this;
        me.config.grid.store.proxy.url=Routing.generate("get_reviewrequests", {
            _format: "json"
        });
        this.callParent(arguments);


    },
    onGridSelect: function (grid, selectedIndex, selectedRecord, selectedIndexes, selectedRecords) {
        var me = this;
        this.callParent(arguments);
    },
    onStoreLoaded: function () {
        var me = this;
        var grid = me.getGrid();

        me.callParent();

        if(!me.getEventBound()){
            grid.binder.on('show-detail', function(e){
                console.log("review request detail clicked");
                console.log(e);
                me.getJsApp().showPanel("JS.reviewrequest.View",{
                    title: e.context.article.titre_court,
                    reviewrequest: e.context,
                    editor: false,
                    author: true,
                    reviewer:false
                });
            });

            grid.binder.on('accept-request', function(e){
                console.log("Accept request clicked");
                console.log(e);
                me.handleRequest(e.context, true);
            });

            grid.binder.on('reject-request', function(e){
                console.log("reviewrequest reject request clicked");
                console.log(e);
                me.handleRequest(e.context, false);
            });
            me.setEventBound(true);
        }
        me.getJsApp().addjustHeight();

    },
    handleRequest:function(request, decision){
        console.log("handle request");
        console.log(request);
        console.log("decision: "+ decision);

        var me=this;
        var reviewrequest=request;
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
    onShow:function(){
        var me = this;
        var grid = me.getGrid();
        grid.reload();
    },
    afterRenderTpl:function(){
        var me=this;
        me.callParent(arguments);



    }
});