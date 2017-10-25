/**
 * Created by magloire on 09/06/2016.
 */
Ext.define('JS.App', {
    config: {
        currentPanel: null,
        user: null,
        currentPageConfig: null,
        panelStack: [],
        mainPosition: "",
        homePanel: "",
        breadcrumb:null,
        headerPosition:"",
        baseHeight:0
    },
    constructor: function (config) {
        var me = this;
        console.log("constructeur");
        console.log(config);
        JS.App.user = config.user;
        Ext.apply(me.config, config);
        me.initialize();
    },
    initialize: function () {

        var me = this;
        Xfr.log("Initialising app class");
        Xfr.log("Loading pageClass");

        console.log(me.config);
        var pageConfig = me.config.currentPageConfig;

        if (pageConfig.panelClass != undefined && pageConfig.panelClass != "" && pageConfig.panelClass != null) {
            me.setMainPosition(pageConfig.renderTo);
            me.setHomePanel(pageConfig.panelClass);
            if(pageConfig.headerSectionId && pageConfig.headerSectionId!=null && pageConfig.headerSectionId!=""){
                me.setHeaderPosition(pageConfig.headerSectionId);
            }
            else{
                me.setHeaderPosition(pageConfig.renderTo);
            }


            console.log('Main position: ' + me.getMainPosition());
            console.log('Main home panel: ' + me.getHomePanel());

            if(!pageConfig.notLoadBreadcumb){
                var breadcrumb=Ext.create('JS.cmp.Breadcrumb',{
                    renderTo:me.getHeaderPosition(),
                    jsApp: me
                });

                me.setBreadcrumb(breadcrumb);
            }


            if(pageConfig.isAdmin){
                //Bind admin menu events

                var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
                var window_height = $(window).height();

                //$('#main-content').slimScroll({
                //    height: window_height-neg-50
                //});


                me.bindMenuEvent();
                //Fire the initial menu click event
                $("#"+pageConfig.initMenu).trigger("click");
            }
            else{
                me.showPanel();
            }
        }


    },
    bindMenuEvent: function () {
        console.log("binding events");
        var me = this;

        $("#js-app-dashboard").on('click', function () {
            console.log("Dashboard menu clicked");
            //Xfr.Mask.show('Chargement...');
            me.destroyCurrentStack();
            me.showPanel("JS.dashboard.Main", {
                title: "Dashboard",
                subtitle: "view"
            });
            $(this).parent().addClass("active");
            $(this).parent().siblings().removeClass("active");



        });
        $("#js-app-article").on('click', function () {
            console.log("Article menu clicked");
            //Xfr.Mask.show('Chargement...');

            me.destroyCurrentStack();

            me.showPanel("JS.article.ListAdmin",{
                title:"Manuscripts"
            });

            $(this).parent().addClass("active");
            $(this).parent().siblings().removeClass("active");

        });

        $("#js-app-reviewrequest").on('click', function () {
            console.log("Article menu clicked");
            //Xfr.Mask.show('Chargement...');

            me.destroyCurrentStack();

            me.showPanel("JS.reviewrequest.ListAdmin",{
                title:"Review requests"
            });

            $(this).parent().addClass("active");
            $(this).parent().siblings().removeClass("active");

        });

        $("#js-app-review").on('click', function () {


            me.destroyCurrentStack();

            me.showPanel("JS.review.ListAdmin",{
                title:"Reviews"
            });

            $(this).parent().addClass("active");
            $(this).parent().siblings().removeClass("active");

        });

        $("#js-app-publications").on('click', function () {


            console.log("publication clicked");

            me.destroyCurrentStack();

            me.showPanel("JS.numerojournal.List",{
                title:"journal Number"
            });

            $(this).parent().addClass("active");
            $(this).parent().siblings().removeClass("active");

        });



        $("#js-app-article-type").on('click', function () {
            console.log("Article Type menu clicked");
            //Xfr.Mask.show('Chargement...');
            me.destroyCurrentStack();

            me.showPanel("JS.typearticle.List",{
                title:"Article Types"
            });

            $(this).parent().addClass("active");
            $(this).parent().siblings().removeClass("active");
        });

        $("#js-app-article-categorie").on('click', function () {
            console.log("Article Categorie menu clicked");
            //Xfr.Mask.show('Chargement...');
            me.destroyCurrentStack();

            me.showPanel("JS.categorie.List",{
                title:"Article Categories / Sections"
            });

            $(this).parent().addClass("active");
            $(this).parent().siblings().removeClass("active");

        });

        $("#js-app-article-fichier").on('click', function () {
            console.log("Attachement type menu clicked");
            //Xfr.Mask.show('Chargement...');
            me.destroyCurrentStack();

            me.showPanel("JS.typefichier.List",{
                title:"Attachement types"
            });

            $(this).parent().addClass("active");
            $(this).parent().siblings().removeClass("active");
        });

        $("#js-app-users").on('click', function () {
            console.log("Users menu clicked");
            //Xfr.Mask.show('Chargement...');
            me.destroyCurrentStack();

            me.showPanel("JS.utilisateur.List",{
                title:"Utilisateurs"
            });


            $(this).parent().addClass("active");
            $(this).parent().siblings().removeClass("active");
        });

        $("#js-app-role").on('click', function () {
            console.log("Roles menu clicked");
            //Xfr.Mask.show('Chargement...');
            me.destroyCurrentStack();


            $(this).parent().addClass("active");
            $(this).parent().siblings().removeClass("active");
        });


    },
    innitNotification: function () {

    },

    addjustHeight:function(){
        //console.log("adjusting height");
        //var me=this;
        //var myHeight = me.getBaseHeight();
        //
        //if(myHeight == undefined || myHeight == null || myHeight == 0){
        //    myHeight=$("#"+me.getMainPosition()).height();
        //}
        //
        //var maxHeight = 0;
        //
        //$("*", $("#"+me.getMainPosition())).each(function(){
        //    var thisH = $(this).height();
        //    if (thisH > maxHeight) { maxHeight = thisH; }
        //});
        //
        ////if(maxHeight>myHeight){
        //    $("#"+me.getMainPosition()).height(maxHeight);
        ////}

    },
    showPanel: function (panelClass, config) {
        var me = this;
        var addConfig = {
            renderTo: me.getMainPosition(),
            jsApp: me
        };

        console.log('Add config');
        console.log(addConfig);

        config = config ? config : {};

        config = Ext.merge(config, addConfig);

        var currentPanel=me.getCurrentPanel();

        if(currentPanel){
            currentPanel.hide();
            //currentPanel.destroy();
            //$("#"+me.getMainPosition()).empty();
        }

        var panelStack=me.getPanelStack();

        if (panelClass != undefined && panelClass != "" && panelClass != null) {
            console.log("Showing panel " + panelClass);
            var panel = Ext.create(panelClass, config);
            this.setCurrentPanel(panel);


            if(panelStack){
                console.log("Longueur panel: "+ panelStack.length);
            }
            else{
                console.log("panel stack not initialize");
            }


            if(!panelStack || panelStack==undefined){
                console.log("panel stack undefined");
                panelStack=[panel];
                me.setPanelStack(panelStack);
            }
            else{
                console.log("panel stack exists");
                panelStack.push(panel);
            }
            console.log("Admin Page test");
            console.log(panel);
           // me.getPanelStack().push(panel);
           // me.getBreadcrumb().setData(me.config);
            console.log("Longueur panel: "+ panelStack.length);
            var breadCrumb=me.getBreadcrumb();
            if(breadCrumb){
                var data={
                    currentPanel: me.getCurrentPanel(),
                    panelStack: me.getPanelStack()
                };
                console.log(data);
                me.getBreadcrumb().binder.set("data", data);
            }

            me.addjustHeight();

            return panel;

        }
        else {
            //We show the home panel
            var panel = Ext.create(me.getHomePanel(), {
                renderTo: me.getMainPosition(),
                jsApp: me
            });

            this.setCurrentPanel(panel);

            if(panelStack){
                console.log("Longueur panel: "+ panelStack.length);
            }
            else{
                console.log("panel stack not initialize");
            }

            if(!panelStack || panelStack==undefined){
                console.log("panel stack undefined");
                panelStack=[panel];
                me.setPanelStack(panelStack);
            }
            else{
                console.log("panel stack exists");
                panelStack.push(panel);
            }

            //me.getPanelStack().push(panel);
            //me.getBreadcrumb().setData(me.config);

            var breadCrumb=me.getBreadcrumb();
            if(breadCrumb){
                var data={
                    currentPanel:me.getCurrentPanel(),
                    panelStack: me.getPanelStack()
                };
                console.log(data);
                me.getBreadcrumb().binder.set("data", data);
            }


            me.addjustHeight();

            return panel;
        }


    },
    destroyCurrentStack: function () {
        console.log('Showing breadcrumb');
        var me=this;


        var breadcrumb=me.getBreadcrumb();

        var panelStack=me.getPanelStack();


        var currentPanel=me.getCurrentPanel();

        if(currentPanel){
            currentPanel.hide();
        }

        if(panelStack){
            console.log("Longueur: "+panelStack.length);
            console.log(panelStack);
            if(panelStack.length>0){
                for(var i=0;i<panelStack.length;i++){
                    console.log("destroying each panel");
                    panelStack[i].destroy();
                }
            }
        }
        panelStack=[];
        me.setPanelStack(panelStack);
        $("#"+me.getMainPosition()).empty();
    },
    showBreadcrumb:function(index){

        console.log('Showing breadcrumb');
        var me=this;


        var breadcrumb=me.getBreadcrumb();

        var panelStack=me.getPanelStack();


        var currentPanel=me.getCurrentPanel();

        if(currentPanel){
            currentPanel.destroy();
        }

        console.log("Longueur: "+panelStack.length);
        console.log(panelStack);
        if(panelStack.length>0){
            console.log("panelStack length greather than 0");
            console.log("Longueur panel: "+ panelStack.length);
            console.log("index: "+index);
            if(index<panelStack.length){
                console.log("index less than panelStack size");

                var panelCopy=[];
                for(var i=0;i<=index;i++){
                    panelCopy[i]=panelStack[i];
                }

                for(var i=index+1;i<panelStack.length;i++){
                    console.log("destroying each panel");
                    panelStack[i].destroy();
                }

                console.log("Longueur panel: "+ panelCopy.length);
                me.setPanelStack(panelCopy);

            }
            me.setCurrentPanel(panelStack[index]);
            me.getCurrentPanel().show();
        }
        var data={
            currentPanel:me.getCurrentPanel(),
            panelStack: me.getPanelStack()
        };
        console.log(data);
        breadcrumb.binder.set("data", data);

    },
    /**
     * Go back in the panel stack
     */
    back: function () {

        console.log('Showing breadcrumb');
        var me=this;


        var breadcrumb=me.getBreadcrumb();

        var panelStack=me.getPanelStack();

        console.log("Longueur: "+panelStack.length);
        console.log(panelStack);
        if(panelStack.length>0){
            var currentPanel=panelStack.pop();
            currentPanel.destroy();
            if(panelStack.length>0){
                me.setCurrentPanel(panelStack[panelStack.length-1]);
                me.getCurrentPanel().show();
            }
        }
        var data={
            currentPanel:me.getCurrentPanel(),
            panelStack: me.getPanelStack()
        };
        console.log(data);
        breadcrumb.binder.set("data", data);
    },
    statics: {
        user: null,
        isSuperAdmin: function (user) {
            var isAdmin = false;
            Ext.each(user.roles, function (role) {
                if (role != undefined) {
                    if (role.libelle == "ROLE_ERATING_SUPER_ADMIN") {
                        isAdmin = true;
                        return false;
                    }
                }
            });

            return isAdmin;
        },
        isAdmin: function (user) {

            var isSupervisor = false;
            Ext.each(user.roles_entity, function (role) {
                if (role != undefined) {
                    if (role.code == "ROLE_JS_SUPER_ADMIN" ) {
                        isSupervisor = true;
                        return false;
                    }
                }
            });
            return isSupervisor;
        },
        isMainEditor: function (user) {

            var isSupervisor = false;
            Ext.each(user.roles_entity, function (role) {
                if (role != undefined) {
                    if (role.code == "ROLE_JS_MAIN_EDITOR" ) {
                        isSupervisor = true;
                        return false;
                    }
                }
            });
            return isSupervisor;
        },
        isEditor: function (user) {

            var isSupervisor = false;
            Ext.each(user.roles_entity, function (role) {
                if (role != undefined) {
                    if (role.code == "ROLE_JS_EDITOR" ) {
                        isSupervisor = true;
                        return false;
                    }
                }
            });
            return isSupervisor;
        },
        isAuthor: function (user) {

            var isAgent = false;
            Ext.each(user.roles_entity, function (role) {
                if (role != undefined) {
                    if (role.code == "ROLE_JS_AUTHOR") {
                        isAgent = true;
                        return false;
                    }
                }
            });
            if (!isAgent) {
                ERating.App.isSupervisor(user)
            }
            else {
                return isAgent;
            }


        },
        isReviewer: function (user) {

            var isEmfUser = false;
            Ext.each(user.roles_entity, function (role) {
                if (role != undefined) {
                    if (role.code == "ROLE_JS_REVIEWER") {
                        isEmfUser = true;
                        return false;
                    }
                }
            });
            return isEmfUser;

        },
        isPublic: function (user) {

            var isAdminEmf = false;
            Ext.each(user.roles_entity, function (role) {
                if (role != undefined) {
                    if (role.code == "ROLE_JS_PUBLIC") {
                        isAdminEmf = true;
                        return false;
                    }
                }
            });
            return isAdminEmf;
        }
    }
});
