/**
 * Created by maglo on 27/09/2016.
 */
Ext.define("JS.article.ListAdmin",{
    extend:"JS.panel.HistoryGridPanelAdmin",
    config:{
        page: {
            title: "Articles",
            data: null,
            parent: null
        },
        panelData: {
            url: "",
            panelClass: "",
            gridUrl: Routing.generate("get_manuscrits"),
            actions: [{
                param: {
                    "url": "get_manuscrits",
                    "panelClass": "JS.article.AdvancedSearchAdmin",
                    "formUrl": "",
                    "gridUrl": "get_manuscrits"
                },
                libelle: "Advanced search",
                description: "Advanced search"
            }],
            buttons:[{
                    buttonClass:"btn-primary",
                    iconClass:"glyphicon glyphicon-plus",
                    buttonLabel:"Assign Editor",
                    buttonAction:"assing-editor"

            },
                {
                    buttonClass:"btn-success",
                    iconClass:"glyphicon glyphicon-ok-sign",
                    buttonLabel:"Propose reviewer",
                    buttonAction:"propose-reviewer"

                },{
                    buttonClass:"btn-primary",
                    iconClass:"glyphicon glyphicon-plus",
                    buttonLabel:"Send back to Author",
                    buttonAction:"sent-back-to-author"

                },{
                    buttonClass:"btn-success",
                    iconClass:"glyphicon glyphicon-plus",
                    buttonLabel:"Cancel",
                    buttonAction:"js-cancel"

                }

            ]
        },
        grid: {
            store: {
                proxy: {
                    url: Routing.generate("get_manuscrits", {_format: "json", status:1})
                }
            },
            type: "custom",
            dynamicTplClass: "JS.article.GridCustomAdmin"
        },
        status:1,
        eventBound:false,
        jsApp:null
    },
    initialize:function(){

        var me = this;
        me.config.grid.store.proxy.url=Routing.generate("get_manuscrits", {
            _format: "json",
            status: me.getStatus()
        });
        this.callParent(arguments);

        /**
        var panelData = me.getPanelData(),
            actions = [],
            buttons=[];

        var action = {
            param: {
                "url": "get_manuscrits",
                "panelClass": "JS.article.AdvancedSearchAdmin",
                "formUrl": "",
                "gridUrl": "get_manuscrits"
            },
            libelle: "Advanced search",
            description: "Advanced search"
        };

        var button= {
                buttonClass:"Custom",
                iconClass:"Custom",
                buttonLabel:"Custom",
                buttonAction:"Custom"
        };


        me.config.grid.store.proxy.url=Routing.generate("get_manuscrits", {
            _format: "json",
            status: me.getStatus()
        });

        //console.log("grid url: "+me.config.grid.store.proxy.url);
        buttons.push(button);
        actions.push(action);
        panelData.actions = actions;
        panelData.buttons=buttons;
         */


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
                //console.log("article detail clicked");
                //console.log(e);
                me.getJsApp().showPanel("JS.article.View",{
                    title: e.context.titre_court,
                    article: e.context
                });
            });

            grid.binder.on('show-edit', function(e){
                //console.log("article edit clicked");
                //console.log(e);
                me.getJsApp().showPanel("JS.article.ManuscritForm",{
                    title: e.context.titre_court,
                    article: e.context
                });
            });

            grid.binder.on('delete', function(e){
                //console.log("article edit clicked");
                //console.log(e);
                Xfr.Msg.show({
                    message: "Do you really want to delete this submission?",
                    title: "Delete confirmation",
                    icon: Xfr.Msg.QUESTION.iconClass,
                    btn: [
                        {text: Xfr.Msg.YES.text, type: 'btn'},
                        {text: Xfr.Msg.NO.text, type: 'btn'}
                    ],
                    action:function(btn){
                        if(btn==="yes"){
                            //console.log("Click on btn yes");
                            //console.log("Deleting article");

                            grid.getStore().load();
                        }
                    }
                });

            });
            me.setEventBound(true);
        }
        me.getJsApp().addjustHeight();

    },
    showDialogEditor: function(){

        var me=this;
        var dialog=Ext.create("Xfr.panel.Window", {
            size: 'medium',
            title:  "Adding reviewer",
            renderTo: document.body,
            items: [{
                className: "JS.article.EditorForm",
                height: "100%",
                position: '[xfr-window-content]',
                reviewer: null,
                selectedArticles : me.getSelectedItems(),
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
    afterRenderTpl:function(){
        var me=this;
        me.callParent(arguments);
        me.binder.on('assing-editor', function (e) {
            console.log("Assign editor button clicked");
            me.showDialogAdd();
        });

        me.binder.on('propose-reviewer', function (e) {

            console.log("PRopose reviewer button clicked");
            //me.showDialogAdd();
        });

        me.binder.on('sent-back-to-author', function (e) {

            console.log("Sent back to author button clicked");
            //me.showDialogAdd();
        });

        me.binder.on('js-cancel', function (e) {

            console.log("Cancel button clicked");
            //me.showDialogAdd();
        });

    }
});