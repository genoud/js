/**
 * Created by maglo on 27/09/2016.
 */
Ext.define("JS.utilisateur.List",{
    extend:"JS.panel.HistoryGridPanelAdmin",
    config:{
        page: {
            title: "Attachement types",
            data: null,
            parent: null
        },
        panelData: {
            url: "",
            panelClass: "",
            gridUrl: Routing.generate("get_utilisateurs"),
            actions: [{
                param: {
                    "url": "get_utilisateurs",
                    "panelClass": "JS.utilisateur.AdvancedSearch",
                    "formUrl": "",
                    "gridUrl": "get_utilisateurs"
                },
                libelle: "Advanced search",
                description: "Advanced search"
            }],
            buttons:[{
                    buttonClass:"btn-primary",
                    iconClass:"glyphicon glyphicon-plus",
                    buttonLabel:"Add",
                    buttonAction:"add-utilisateur"

            },
                {
                    buttonClass:"btn-primary",
                    iconClass:"glyphicon glyphicon-pencil",
                    buttonLabel:"Edit",
                    buttonAction:"edit-utilisateur"

                },{
                    buttonClass:"btn-danger",
                    iconClass:"fa fa-trash",
                    buttonLabel:"Delete",
                    buttonAction:"delete-utilisateur"

                }

            ]
        },
        grid: {
            store: {
                proxy: {
                    url: Routing.generate("get_utilisateurs", {_format: "json", status:1})
                }
            },
            type: "custom",
            dynamicTplClass: "JS.utilisateur.GridCustom"
        },
        status:1,
        eventBound:false,

        jsApp:null
    },
    initialize:function(){

        var me = this;
        me.config.grid.store.proxy.url=Routing.generate("get_utilisateurs", {
            _format: "json",
            status: me.getStatus()
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
                //console.log("article detail clicked");
                console.log(e);
                me.getJsApp().showPanel("JS.utilisateur.View",{
                    title: e.context.personne.prenom?e.context.personne.prenom:'' + e.context.personne.nom,
                    subtitle: 'View',
                    parentCmp: me,
                    utilisateur: e.context
                });
            });



            grid.binder.on('show-edit', function(e){
                //console.log("article edit clicked");
                //console.log(e);

                var form=me.getJsApp().showPanel("JS.utilisateur.Form",{
                    title: e.context.personne.prenom? e.context.personne.prenom:""+' '+e.context.personne.nom,
                    subtitle: "Edit",
                    utilisateur: e.context,
                    parentCmp: me,
                    listeners: {
                        "onCancel": function(){
                            console.log("Cancel event fired");
                            me.getJsApp().back();
                        }
                    }

                });

                //me.getJsApp().showPanel("JS.utilisateur.Form",{
                //    title: e.context.titre_court,
                //    article: e.context
                //});
            });

            grid.binder.on('delete', function(e){
                //console.log("article edit clicked");
                //console.log(e);
                Xfr.Msg.show({
                    message: "Do you really want to delete this utilisateur?",
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
    editUtilisateur:function(user){
        var me=this;
        me.getGrid().reload();
    },
    addUtilisateur:function(user){
        var me=this;
        me.getGrid().reload();
    },
    afterRenderTpl:function(){
        var me=this;
        me.callParent(arguments);
        me.binder.on('add-utilisateur', function (e) {

            console.log("add utilisateur button clicked");
            var form=me.getJsApp().showPanel("JS.utilisateur.Form",{
                title: "User",
                subtitle: "New",
                parentCmp: me,
                listeners: {
                    "onCancel": function(){
                        console.log("Cancel event fired");
                        me.getJsApp().back();
                    }
                }

            });
        });

        me.binder.on('edit-utilisateur', function (e) {
            console.log("Edit utilisateur button clicked");

            if(me.getSelectedItems().length>1){
                Xfr.Msg.show({
                    message: "Select only one user to edit.",
                    title: "Edit Error",
                    icon: Xfr.Msg.INFO.iconClass,
                    btn: [
                        {text: Xfr.Msg.OK.text, type: 'btn'},
                        {text: Xfr.Msg.CANCEL.text, type: 'btn'}
                    ],
                    action:null
                });
                return;
            }
            if(me.getSelectedItems().length==0){
                Xfr.Msg.show({
                    message: "Select one user to edit.",
                    title: "Edit Error",
                    icon: Xfr.Msg.INFO.iconClass,
                    btn: [
                        {text: Xfr.Msg.OK.text, type: 'btn'},
                        {text: Xfr.Msg.CANCEL.text, type: 'btn'}
                    ],
                    action:null
                });
                return;
            }
            var selectedUser=me.getSelectedItems()[0];
            var form=me.getJsApp().showPanel("JS.utilisateur.Form",{
                title: selectedUser.personne.prenom?selectedUser.personne.prenom:""+selectedUser.nom,
                subtitle: "Edit",
                utilisateur: selectedUser,
                parentCmp: me,
                listeners: {
                    "onCancel": function(){
                        console.log("Cancel event fired");
                        me.getJsApp().back();
                    }
                }

            });
            //me.showDialogAdd();
        });

        me.binder.on('delete-utilisateur', function (e) {

            console.log("Delete utilisateur button clicked");
            //me.showDialogAdd();
        });


    }
});