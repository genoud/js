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
            gridUrl: Routing.generate("get_editor_manuscrits"),
            actions: [{
                param: {
                    "url": "get_editor_manuscrits",
                    "panelClass": "JS.article.AdvancedSearchAdmin",
                    "formUrl": "",
                    "gridUrl": "get_editor_manuscrits"
                },
                libelle: "Advanced search",
                description: "Advanced search"
            }],
            buttons:[{
                    buttonClass:"btn-primary",
                    iconClass:"fa fa-pencil-square",
                    buttonLabel:"Assign Editor",
                    buttonAction:"assing-editor"

            },
                {
                    buttonClass:"btn-primary",
                    iconClass:"fa fa-question-circle",
                    buttonLabel:"Propose reviewer",
                    buttonAction:"propose-reviewer"

                },
                {
                    buttonClass:"btn-success",
                    iconClass:"fa fa-check",
                    buttonLabel:"Accept Article",
                    buttonAction:"js-validate"

                },
                {
                    buttonClass:"btn-warning",
                    iconClass:"fa fa-hand-o-left",
                    buttonLabel:"Send back to Author",
                    buttonAction:"sent-back-to-author"

                },{
                    buttonClass:"btn-danger",
                    iconClass:"fa fa-exclamation-triangle",
                    buttonLabel:"Reject article",
                    buttonAction:"js-cancel"

                }

            ]
        },
        grid: {
            store: {
                proxy: {
                    url: Routing.generate("get_editor_manuscrits", {_format: "json"})
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
        me.config.grid.store.proxy.url=Routing.generate("get_editor_manuscrits", {
            _format: "json"
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
        console.log("adjusting height");
        me.getJsApp().addjustHeight();

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
                selectedArticles : me.getSelectedItems(),
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
                selectedArticles : me.getSelectedItems(),
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

        var selectedArticles=me.getSelectedItems();
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

        var selectedArticles=me.getSelectedItems();
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

        var selectedArticles=me.getSelectedItems();
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
    afterRenderTpl:function(){
        var me=this;
        me.callParent(arguments);
        me.binder.on('assing-editor', function (e) {
            console.log("Assign editor button clicked");
            me.showDialogEditor();
        });

        me.binder.on('propose-reviewer', function (e) {

            console.log("PRopose reviewer button clicked");
            me.showDialogReviewers();
        });

        me.binder.on('js-validate', function (e) {

            console.log("Cancel button clicked");
            me.acceptArticle();
        });

        me.binder.on('sent-back-to-author', function (e) {

            console.log("Sent back to author button clicked");
            me.sentBackToAuthor();
        });

        me.binder.on('js-cancel', function (e) {

            console.log("Cancel button clicked");
            me.rejectArticle();
        });

    }
});