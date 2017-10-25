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

/**
 * Created by magloire on 09/06/2016.
 */
(function () {

    //var footerHeight = $(".erating-footer").height();
    //
    //var mainContainerHeight=height-bannerHeight-footerHeight;
    //
    //$('.erating-midle-row').height(mainContainerHeight);


    Ext.Loader.setPath("Ext", baseUrl + "resources/vendor/touch/src");
    Ext.Loader.setPath("Xfr", baseUrl + "resources/vendor/xfr/src");
    Ext.Loader.setPath("JS", baseUrl + "bundles/jsapp/app");



    //console.log("Loading translations");

    Xfr.loadTranslations('fr');


    //console.log("creating app");




    var opt = {};
    opt.size = 64;
    opt.backgroundColor = "#898513";

    Xfr.Mask.show('Chargement...', opt, ".body");

    var height = document.documentElement.clientHeight;

    var bannerHeight = $(".loadmask-msg").height();

    var top = (height - bannerHeight) / 2;

    $(".loadmask-msg").css({
        position: "absolute",
        top: top + "px"
    });

    $.ajax({
        url: Routing.generate('get_app_config'),
        type: "GET",
        data: {},
        dataType: "json",
        success: function (response, textStatus, jqXHR) {
            //console.log(response);
            //console.log(textStatus);
            //console.log(jqXHR);
            //if (response.status==200) {
            //ERating.App.user=response.user;

            Xfr.Component.loadedTpls=response.tpls;
            console.log("Current Page Class from script", currentPageConfig);
            Ext.create("JS.App", {
                renderTo: "",
                user: response.user,
                currentPageConfig: currentPageConfig //"JS.utilisateur.Registration"
            });

            //Remove active class and current-page classes on menu items
            $("ul.nav.side-menu li.current-page").removeClass("current-page");
            $(".body").unmask();
            //} else {
            //
            //}


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("erreur lors du chargement des configurations de l'application", "Error ajax script.js");
            Xfr.log([textStatus,jqXHR,  errorThrown], "Error ajax script.js");
        }
    });








})();


var ERATING_MAX_PAGE_SIZE = 10;

var select2AjaxConfig = function (url, urlParam) {
    if (urlParam == undefined) {
        urlParam = {_locale: "fr"};
    }
    return {
        url: Routing.generate(url, urlParam),
        dataType: 'json',
        delay: 250,
        data: function (params) {
            params.page = params.page || 1
            return {
                q: params.term, // search term
                page: params.page,
                length: ERATING_MAX_PAGE_SIZE
            };
        },
        processResults: function (data, params) {
            params.page = params.page || 1
            return {
                results: data.data,
                pagination: {
                    more: params.page * ERATING_MAX_PAGE_SIZE < data.recordsTotal
                }
            };
        },
        cache: true
    }
};

var getDefaultSelect2Options = function () {
    return {
        // escapeMarkup: function(markup) {
        //     return markup;
        // },
        //minimumInputLength: 1,
        ajax: {
            dataType: 'json',
            delay: 250,
            data: function (params, extraParams) {
                //console.log("extraParams on data load");
                //                         console.log(params);
                //console.log(extraParams);
                // console.log(elt);
                var result = {};
                if (!Ext.isEmpty(extraParams)) {
                    Ext.merge(result, extraParams);
                }
                return Ext.merge(result, {
                    "page": params.page,
                    "search[value]": params.term,
                    "length": 10
                });
            },
            // data: function(params) {
            //     console.log("Params");
            //     console.log(params);
            //     return {
            //         "page": params.page,
            //         "search[value]": params.term,
            //         "length": CAPV_MAX_PAGE_SIZE
            //     };
            // },
            processResults: function (data, params) {
                // console.log("prossResults");
                // console.log(data);
                // console.log(params);
                params.page = params.page || 1;
                return {
                    results: data.data,
                    pagination: {
                        more: (params.page * ERATING_MAX_PAGE_SIZE) < data.recordsFiltered
                    }
                };
            },
            cache: true
        }
    }
};

var addToList=function(liste, object){
    if(liste && liste.length>0){
        var found=false;
        for(var i=0;i<liste.length;i++){
            if(liste[i].id==object.id){
                found=true;
                break;
            }
        }
        if(!found){
            liste.push(object);
        }
    }
    else{
        liste.push(object);
    }

};

var removeFromList=function(liste, object){
    if(liste && liste.length>0){

        for(var i=0;i<liste.length;i++){
            if(liste[i].id==object.id){
                liste.splice(i,1);
                break;
            }
        }
    }

};



/**
 * Created by samuel on 27/06/2016.
 */
Ext.define('JS.panel.Form', {
    extend: 'Xfr.panel.Form',
    config: {
        //mode:"",
        //tplUrl: "",
        entityName: "",
        page: {
            title: null,
            data: null,
            parent: null
        },
        panelData: {
            formUrl: ""
        },
        previousPage: null,
        grid: null,
        form: null,
        view: null,
        formPane: null,
        record: null,
        fieldsToInit: [],
        formValidation: {},
        defaultSelect2Options: {},
        parentRecord: null,
        parentName: ""
    },
    initialize: function () {

        console.log("Initializing JS Base Form Class");
        var me = this;
        var panelData = me.getPanelData();
        //console.log("Initialize View");
        me.on({
            "afterrendertpl": {
                scope: me,
                fn: "onAfterRenderTpl"
            }
        });

        me.on({
            formsubmit: {
                scope: me,
                fn: "onFormSubmit"
            }
        });

        console.log(panelData);

        me.setConfig({
            defaultSelect2Options: JS.panel.Form.getDefaultSelect2Options(),
            maskOnItemsLoading: me.getMaskOnItemsLoading(),
            items: [{
                className: "Xfr.Component",
                //className: "Xfr.panel.Form",
                position: "[data-mode=edit]",
                dynamicTpl: false,
                tplUrl: panelData.formUrl,
                syncTplLoading: false,
                listeners: {
                    "loadtpl": {
                        scope: me,
                        fn: "onLoadFormTpl"
                    }
                }
            }]
        });


        this.callParent(arguments);


    },
    onFormSubmit:function(){
        console.log("submitting form JS App form");
    },
    //onAfterRenderTpl: function () {
    //    //console.log("after render tpl View");
    //    //this.update(this.config.record);
    //},
    showForm: function (record) {
        // console.log(record);
        var me = this;
        this.config.record = record;
        // var form=$("form[name='"+me.getEntityName()+"']",me.$this);
        if (!Ext.isEmpty(me.config.formPane)) {
            //me.config.formPane.updateData(record);
            me.setData(record);
            return;
        }



    },
    onLoadFormTpl: function (loadedCmp, tplObj) {

        var me = this,
                form = $("<div>" + tplObj.html + "</div>"),
                inputNotList = "",
                entityName = me.getEntityName(),
                fieldsToInit = me.getFieldsToInit();

        inputNotList += "[name*=_token]";
        inputNotList += ",[type=submit]";
        inputNotList += ",[type=reset]";

        if (!Ext.isEmpty(fieldsToInit)) {
            for (var i = 0; i < fieldsToInit.length; i++) {
                var field = fieldsToInit[i];
                if (field.xtype === "checkboxfieldgroup" && !Ext.isEmpty(field.selector)) {
                    var selector = field.selector + " input[type=checkbox]",
                            fieldContainer = $(field.selector, form).addClass("checkboxfieldgroup");
                    inputNotList += "," + selector;

                    if (field.type === "list") {
                        $(selector, form).each(function (i, field) {
                            var $field = $(field),
                                    $label = $field.next("label:first"),
                                    row = $('<div class="item"></div>');
                            $field.appendTo(row);
                            $label.appendTo(row);
                            row.appendTo(fieldContainer);
                        });
                    }

                }
            }
            ;
        }

        $("input:not(" + inputNotList + "), select, textarea", form).each(function (index, field) {
            var fieldName = $(field).attr("name");
            var model = "";
            if ($(field).attr("type") === "password") {
                model = me.getFieldModel(fieldName, entityName, true);
            } else {
                model = me.getFieldModel(fieldName, entityName);
            }

            fieldValue = "{{" + model + "}}";



            if ($(field).attr("type") === "file") {
            }

            $(field).attr("value", fieldValue);


        });

        tplObj.html = form.html();

    },
    getFieldModel: function (fieldName, entityName, removeLastField) {
        if (Ext.isEmpty(removeLastField)) {
            removeLastField = false;
        }
        fieldName = $.trim(fieldName);
        var entityExp = new RegExp(entityName, 'i');

        fieldName = fieldName.replace(entityExp, "data");
        fieldName = fieldName.replace(/\[\]/g, "");
        fieldName = fieldName.replace(/\[/g, ".");
        fieldName = fieldName.replace(/\]/g, "");
        if (removeLastField) {
            var tab = fieldName.split(".");
            var last = tab.pop();
            if (last === "first") {
                fieldName = tab.join(".");
            }

        }
        return fieldName;
    },
    setDefaultSelectValue: function (val) {
        var me = this,
                form = $("form:first", me.$this);


        var fieldsToInit = me.getFieldsToInit(),
                checkboxToExclude = "";

        if (!Ext.isEmpty(fieldsToInit)) {
            for (var i = 0; i < fieldsToInit.length; i++) {
                var field = fieldsToInit[i];
                if (field.xtype === "select2" && !Ext.isEmpty(field.selector)) {
                    var $select = $(field.selector, form);
                    if (val) {
                        if (Ext.isEmpty($select.val())) {
                            $select.children('option:first').val(-1);
                            $select.val(-1);
                        }
                    } else {
                        if (Ext.isEmpty($select.val()) || $select.val() === -1) {
                            $select.children('option:first').val("");
                            $select.val("");
                        }
                    }

                }
            }
        }
    },
    statics: {
        getDefaultSelect2Options: function () {
            return {

                ajax: {
                    dataType: 'json',
                    delay: 250,
                    data: function (params, extraParams) {

                        var result = {};
                        if (!Ext.isEmpty(extraParams)) {
                            Ext.merge(result, extraParams);
                        }
                        return Ext.merge(result, {
                            "page": params.page,
                            "search[value]": params.term,
                            "length": 10
                        });
                    },

                    processResults: function (data, params) {
                        // console.log("prossResults");
                        // console.log(data);
                        // console.log(params);
                        params.page = params.page || 1;
                        return {
                            results: data.data,
                            pagination: {
                                more: (params.page * CAPV_MAX_PAGE_SIZE) < data.recordsFiltered
                            }
                        };
                    },
                    cache: true
                }
            };
        }
    },
    afterFormTplRendered: function () {
        console.log("after render form Erating");
        //var record=this.config.record;
        var me = this;
        /*if (!Ext.isEmpty(me.config.formPane)) {
         me.config.formPane.updateData(this.config.record);
         }*/
        var form = $("form:first", me.$this);

        form.on("submit", function (event) {
            console.log("preventing submit");
            event.preventDefault();
        });

        this.initFields();


        var validateOptions = me.getFormValidation();
        validateOptions.submitHandler = function () {
            //me.onFormSubmit(form);
            me.fireEvent("formsubmit", me);
        };
        if (!Ext.isEmpty(form)) {
            console.log("Validate options");
            console.log(validateOptions);
            form.validate(validateOptions);
        }

        $("input[type=checkbox]").iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
            increaseArea: '30%' // optional
        });


    },
    reset: function () {
        this.config.formPane.resetBinder();

    },
    update: function (record) {

        this.config.record = record;
        if (!Ext.isEmpty(this.config.formPane)) {
            this.config.formPane.updateData(this.config.record);
        }

    },
    initFields: function () {
        var me = this,
                form = $("form:first", me.$this);

        $("input[type=checkbox]", form).addClass("xfr-checkbox");

        var fieldsToInit = me.getFieldsToInit(),
                checkboxToExclude = "";
        if (!Ext.isEmpty(fieldsToInit)) {
            for (var i = 0; i < fieldsToInit.length; i++) {
                var field = fieldsToInit[i];

                if (field.xtype === "checkboxfieldgroup" && !Ext.isEmpty(field.selector)) {
                    var selector = field.selector + " input[type=checkbox]",
                            checkboxToExclude = selector;

                    $(selector, form).each(function (i, field) {
                        var $field = $(field);
                        me.initCheckboxField($field);
                    });
                } else if (field.xtype === "select2" && !Ext.isEmpty(field.selector)) {
                    me.iniSelect2Field(field);
                }
            }
        }

        $("input[type=checkbox]:not(" + checkboxToExclude + ")", form).each(function (i, item) {
            me.initCheckboxField($(item), $(item).val() === 1);
        });

        var now = new Date();
        $("input[type=datetime]", form).datetimepicker({
            showTodayButton: true,
            showClear: true,
            format: "YYYY-MM-DD H:mm",
            locale: 'fr',
            inline: true,
            maxDate: now
        });

        if (me.config.parentRecord) {
            var parentField = $("#" + me.getEntityName() + "_" + me.config.parentName);
            if (parentField) {
                parentField.hide();
            }
        }

    },
    setData: function (data) {
        var me = this;
        me.update(data);
        me.callParent(arguments);
        me.bindSpecialFields(data);

    },
    bindSpecialFields: function (data) {

        if (Ext.isEmpty(data))
            return;

        var me = this,
                form = $("form:first", me.$this),
                fieldsToInit = me.getFieldsToInit(),
                simpleCbToExclude = "",
                checkboxToExclude = "";

        if (!Ext.isEmpty(fieldsToInit) && !Ext.isEmpty(data)) {
            for (var i = 0; i < fieldsToInit.length; i++) {
                var field = fieldsToInit[i];
                if (field.xtype === "checkboxfieldgroup" && !Ext.isEmpty(field.selector)) {
                    var selector = field.selector + " input[type=checkbox]",
                            checkboxToExclude = selector;
                    keyPath = field.keyPath,
                            fieldContainer = $(field.selector, form).addClass("checkboxfieldgroup"),
                            fieldData = data[keyPath];

                    $(selector, form).each(function (i, field) {
                        var $field = $(field),
                                objToFind = {
                                    id: $field.attr("value")
                                };

                        if (!Ext.isEmpty(fieldData) && Xfr.Utils.arrayContains(fieldData, objToFind, false)) {
                            me.checkCheckbox($field, true);
                        } else {
                            me.checkCheckbox($field, false);
                        }
                    });

                } else if (field.xtype === "select2" && !Ext.isEmpty(field.selector)) {

                    var fieldData = Xfr.Utils.getObjectByKeypath(data, field.keyPath),
                            fieldValue = null,
                            displayValue = null,
                            $select = $(field.selector, form);
                    if (!Ext.isEmpty(fieldData)) {
                        fieldValue = fieldData[field.dataFieldValue];
                        displayValue = fieldValue + " - " + Xfr.Utils.getObjectByKeypath(fieldData, field.displayFieldValue);
                        me.setSelect2Value(field.selector, fieldValue, displayValue);
                    } else {
                        me.setSelect2Value(field.selector, '', field.options.placeholder);
                    }
                }

            }
        }
        $("input[type=checkbox]:not(" + checkboxToExclude + ")", form).each(function (i, item) {
            me.initCheckboxField($(item), true);
        });

    },
    getSelect2FieldBySelector: function (selector) {
        var me = this,
                fieldsToInit = me.getFieldsToInit();
        if (!Ext.isEmpty(fieldsToInit)) {
            for (var i = 0; i < fieldsToInit.length; i++) {
                var field = fieldsToInit[i];

                if (field.xtype === "select2" && !Ext.isEmpty(field.selector) && field.selector === selector) {
                    return field;
                }
            }
        }
        return null;
    },
    getSelect2SelectedData: function (selector, form) {
        var me = this;
        if (Ext.isEmpty(form)) {
            form = $("form:first", me.$this);
        }
        var results = $(selector, form).select2("data");

        if (!Ext.isEmpty(results)) {
            return results[0];
        } else {
            return null;
        }
    },
    setSelect2Value: function (selector, value, displayHtml, form) {
        var me = this;

        if (Ext.isEmpty(form)) {
            form = $("form:first", me.$this);
        }

        var field = me.getSelect2FieldBySelector(selector);
        var $select = $(selector, form);
        if (!Ext.isEmpty(value)) {
            if (!$select.children('option[value=' + value + ']').length > 0) {
                $select.append("<option value='" + value + "'>" + displayHtml + "</option>");
            }
        }

        var $spanSelect = $select.next(".select2.select2-container:first").find(".select2-selection__rendered");

        $spanSelect.html(displayHtml);

        $select.val(value);
    },
    iniSelect2Field: function (field, form) {

        var me = this;
        if (Ext.isEmpty(form) || form === undefined) {
            form = $("form:first", me.$this);
        }

        var options = Ext.merge({}, me.getDefaultSelect2Options());

        if (!Ext.isEmpty(field.tplClass)) {

            options.optionTpl = $("#" + Xfr.Utils.getCmpClassId(field.tplClass)).html();
            if (!Ext.isEmpty(options.optionTpl)) {

                options.templateResult = function (data, optionTpl) {

                    var bindObj = {};
                    if (typeof appConfig !== 'undefined') {
                        bindObj.appConfig = appConfig;
                    }
                    bindObj.data = data;

                    var ractive = new Ractive({
                        template: optionTpl,
                        data: bindObj
                    });
                    var toHtml = ractive.toHTML();
                    return $(toHtml);
                };

            }

        }

        if (!Ext.isEmpty(field.type)) {
            if (field.type === "local") {
                delete options.ajax;
            } else if (field.type === "remote") {
                if (Ext.isEmpty(options.ajax)) {
                    options.ajax = {};
                }
                options.ajax.url = field.url;
            }
        }

        Ext.merge(options, Ext.isEmpty(field.options) ? {} : field.options);

        $(field.selector, form).css({
            width: "100%"
        }).select2(options);
    },
    initCheckboxField: function ($checkbox, initValue) {

        var me = this;

        if (Ext.isEmpty(initValue)) {
            initValue = false;
        }
        if (initValue) {
            if ($checkbox.val() === true || $checkbox.val() === 1 || $checkbox.val() === "1" || $checkbox.val() === "true") {
                me.checkCheckbox($checkbox, true);
            } else {
                me.checkCheckbox($checkbox, false);
            }
        } else {
            if ($checkbox.is(':checked')) {
                me.checkCheckbox($checkbox, true);
            } else {
                me.checkCheckbox($checkbox, false);
            }
        }

        if ($checkbox.attr("data-checked-evt") !== "inited") {
            $checkbox.attr("data-checked-evt", "inited").change(function (event) {
                if ($(this).is(':checked')) {
                    if (initValue) {
                        $(this).val(true);
                    }
                    me.checkCheckbox($(this), true);
                } else {
                    if (initValue) {
                        $(this).val(false);
                    }
                    me.checkCheckbox($(this), false);
                }
            });
        }

    },
    checkCheckbox: function ($checkbox, val) {
        if (val) {
            $checkbox.prop("checked", true).removeClass('icon-checkbox-unchecked').addClass('icon-checkbox-checked');
        } else {
            $checkbox.prop("checked", false).removeClass('icon-checkbox-checked').addClass('icon-checkbox-unchecked');
        }
    }

});



Ext.define("JS.panel.HistoryGridPanel", {
    extend: "Xfr.panel.GridPanel",
    requires: [
        //"Xfr.panel.Grid",
        //"Xfr.plugin.Pagination",
        //"Xfr.plugin.PagingSize",
        //"Xfr.plugin.GridSearch",
        //"Xfr.panel.Form"
    ],
    config: {
        panelData: null,
        grid: {
            xtype: "xgrid",
            height: "100%",
            width: "100%",
            plugins: [{
                xtype: "pagination",
                position: "[data-table-paging]"
            }, {
                xtype: "pagingsize",
                position: "[data-table-page-size]"
            }, {
                xtype: "gridsearch",
                position: "[data-table-form-search]"
            }],
            store: {
                xtype: "xstore",
                proxy: {
                    reader: {
                        totalProperty: "recordsFiltered"
                    },
                    limitParam: "length",
                    startParam: "start",
                    searchParam: "search[value]"
                }
            }
        },
        dynamicTplClass: "JS.panel.HistoryGridPanel"
    },
    initialize: function () {
        //Xfr.Mask.show('Chargement...');
//        me.mask();
        var me = this;
        var panelData = me.getPanelData(),
            actions = [];
        for (var i = 0; i < panelData.actions.length; i++) {
            var action = panelData.actions[i];
            //action.libelle = action.translations[appConfig.locale].libelle;
            //action.description = action.translations[appConfig.locale].description;
            actions.push(action);
        }

        me.setConfig({
            grid: Ext.merge(me.config.grid, me.getGrid()),
            data: {
                filterCategories: actions
            }
        });

        // console.log("getGrid-------------");
        // console.log(panelData);
        // console.log(me.getGrid());
        // console.log(me.getGrid().store.proxy.url);


        this.callParent(arguments);

        var $formContainer = $("[data-xfr-form-container]", me.$this);

        var $filterFormContainer = $("[data-filter-form-container]", $formContainer);

        var elt = $(this);
        //console.log($(elt).data("param"));
        var param = actions[0].param;

        if(param && param.panelClass){
            console.log(param);
            console.log(actions[0]);
            me.filterFormParams = param;
            me.gridUrl = Routing.generate(param.gridUrl, {
                _format: "json",
                status: me.getStatus()
            });
            //console.log("grid URL on toggle action = " + me.gridUrl);
            if (!Ext.isEmpty(me.filterFormCmp)) {
//            me.filterFormCmp.destroy();
//            me.filterFormCmp.mask();
            } else {
                $filterFormContainer.empty();
            }
            me.filterFormCmp = Ext.create(param.panelClass, {
                renderTo: $filterFormContainer[0],
                panelData: param
            });

            $("button[data-btn-filter-action].selected").removeClass('selected');
            if (!elt.hasClass('selected')) {
                elt.addClass('selected');
            }
        }


    },
    onStoreLoaded: function () {
        var me = this;
        Xfr.Mask.hide();
    }
});

Ext.define("JS.panel.HistoryGridPanelAdmin", {
    extend: "Xfr.panel.GridPanel",
    requires: [
        //"Xfr.panel.Grid",
        //"Xfr.plugin.Pagination",
        //"Xfr.plugin.PagingSize",
        //"Xfr.plugin.GridSearch",
        //"Xfr.panel.Form"
    ],
    config: {
        panelData: null,
        grid: {
            xtype: "xgrid",
            height: "100%",
            width: "100%",
            plugins: [{
                xtype: "pagination",
                position: "[data-table-paging]"
            }, {
                xtype: "pagingsize",
                position: "[data-table-page-size]"
            }, {
                xtype: "gridsearchjs",
                position: "[data-table-form-search]"
            } ],
            store: {
                xtype: "xstore",
                proxy: {
                    reader: {
                        totalProperty: "recordsFiltered"
                    },
                    limitParam: "length",
                    startParam: "start",
                    searchParam: "search[value]"
                }
            }
        },
        dynamicTplClass: "JS.panel.HistoryGridPanelAdmin",
        selectedItems:[],
        showSearch: true

    },
    initialize: function () {
        //Xfr.Mask.show('Chargement...');
//        me.mask();
        var me = this;
        this.callParent(arguments);

        var panelData = me.getPanelData(),
            actions = [];
        for (var i = 0; i < panelData.actions.length; i++) {
            var action = panelData.actions[i];
            //action.libelle = action.translations[appConfig.locale].libelle;
            //action.description = action.translations[appConfig.locale].description;
            actions.push(action);
        }


        //console.log("Admin custom Buttons ", panelData);

        me.setConfig({
            grid : Ext.merge(me.config.grid, me.getGrid()),
            data : {
                filterCategories : actions,
                buttons : panelData.buttons
            },
            buttons : panelData.buttons
        });



        var $formContainer = $("[data-xfr-form-container]", me.$this);

        var $filterFormContainer = $("[data-filter-form-container]", $formContainer);

        var elt = $(this);
        //console.log($(elt).data("param"));
        var param = actions[0].param;
        //console.log(param);
        //console.log(actions[0]);
        me.filterFormParams = param;
        me.gridUrl = Routing.generate(param.gridUrl, {
            _format: "json"
        });
        //console.log("grid URL on toggle action = " + me.gridUrl);
        if (!Ext.isEmpty(me.filterFormCmp)) {
//            me.filterFormCmp.destroy();
//            me.filterFormCmp.mask();
        } else {
            $filterFormContainer.empty();
        }
        me.filterFormCmp = Ext.create(param.panelClass, {
            renderTo: $filterFormContainer[0],
            panelData: param
        });

        $("button[data-btn-filter-action].selected").removeClass('selected');
        if (!elt.hasClass('selected')) {
            elt.addClass('selected');
        }



    },
    onStoreLoaded: function () {
        var me = this;
        var grid = me.getGrid();
        Xfr.Mask.hide();
        if(!me.getEventBound()){
            grid.binder.on('on-select', function(e){
                console.log("Article selected");
                console.log(e);
                if(!e.context.selected){
                    e.context.selected=true;
                    addToList(me.getSelectedItems(), e.context);
                }
                else{
                    e.context.selected=false;
                    removeFromList(me.getSelectedItems(), e.context);
                }
                console.log("Selected objects");
                console.log(me.getSelectedItems());
                $(e.node).toggleClass("grid-selected");



            });
        }

    },
    afterRenderTpl:function(){
        console.log("after render tpl historygridadmin");

        //var me=this;
        //me.callParent(arguments);
        //var data=me.getData() || {};
        //data.buttons=me.getButtons();
        //console.log(data);
        //me.setData(data);

        var me=this;

        me.callParent(arguments);


        if(!me.getShowSearch()){
            $(".grid-filter-panel", me.$this).hide();

            $(".xfr-crud-grid", me.$this).removeClass("col-lg-8");
            $(".xfr-crud-grid", me.$this).removeClass("col-md-8");
            $(".xfr-crud-grid", me.$this).removeClass("col-sm-8");
            $(".xfr-crud-grid", me.$this).addClass("col-md-12");


        }
    }
});

Ext.define("JS.panel.SymfonyCrudPanel", {
    extend: "Xfr.panel.CrudPanel",
    requires: [
    ],
    config: {
        form: {},
        grid: {},
        view: {},
        page: {
            title: "",
            data: null,
            parent: null
        },
        panelData: {
            url: "",
            panelClass: "",
            formUrl: "",
            gridUrl: "",
            actions: []
        },
        crudActions: {
            create: "",
            read: "",
            update: "",
            destroy: ""
        },
        crudButtons: [],
        basePageUrl: "homepage",
        dynamicTplClass: "Xfr.panel.CrudPanel",
        gridPosition: "[data-role-grid-container]",
        viewPosition: "[data-role-view-container]",
        formPosition: "[data-role-form-container]",
        selectedRecord: null,
        parentRecord: null,
        indexAction: 0
                //parentName: "",
                //parentPane: null,
                //parentTitle: ""
    },
    initialize: function () {

        Xfr.Mask.show('Chargement...');

        var me = this;

        var panelData = me.getPanelData(),
                basePageUrl = me.getBasePageUrl(),
                crudButtons = [],
                itemButtons = [];


        // console.log("panel data in SymfonyCrudPanel.js++++++++++++++++++++++");
        // console.log(panelData);

        //check crudButtons and itemButtons
        for (var i = 0; i < panelData.actions.length; i++) {
            var action = panelData.actions[i];
            if (!Ext.isEmpty(action.param)) {
                var param = Ext.decode(action.param);
                if (!Ext.isEmpty(param.visibilityMode)) {
                    var mode = $.trim(param.visibilityMode);
                    if (mode === "list") {
                        crudButtons.push({
                            "action": param.actionType,
                            text: action.libelle,
                            url: param.url
                        });
                    } else if (mode === "item") {
                        itemButtons.push({
                            panelClass: param.panelClass,
                            text: action.libelle,
                            icon: action.icon
                        });
                    }
                }
            }
        }



        panelData.url = panelData.formUrl;
        var formUrl = panelData.formUrl;
        var gridUrl = panelData.gridUrl;

        // console.log("in SymfonyCrudPanel.js--------------formUrl = " + formUrl);
        // console.log("in SymfonyCrudPanel.js--------------gridUrl = " + gridUrl);

        me.setConfig({
            height: "100%",
            /*form: Ext.apply(me.config.form, {
             formButtons: itemButtons,
             maskOnItemsLoading: false,
             panelData: panelData,
             }),
             grid: Ext.apply(me.config.grid, {
             xtype: "xgrid",
             height: "100%",
             width: "100%",
             plugins: [{
             xtype: "pagination",
             position: "[data-table-paging]"
             }, {
             xtype: "pagingsize",
             position: "[data-table-page-size]"
             }, {
             xtype: "gridsearch",
             position: "[data-table-form-search]"
             }, ],
             store: {
             xtype: "xstore",
             proxy: {
             url: gridUrl,
             reader: {
             totalProperty: "recordsFiltered"
             },
             limitParam: "length",
             startParam: "start",
             searchParam: "search[value]"
             }
             }
             }),*/
            crudButtons: crudButtons,
            formButtons: itemButtons,
            crudActions: {
                create: formUrl + "",
                read: gridUrl + "",
                update: formUrl + "",
                destroy: formUrl + "&delete=true"
            },
            listeners: {
                "beforeupdate": {
                    scope: me,
                    fn: "beforeUpdate"
                },
                "beforedelete": {
                    scope: me,
                    fn: "beforeDelete"
                }
            }
        });

        this.callParent(arguments);

        //$("a[data-action-type=back]").on('click', function () {
        //
        //
        //    me.destroy();
        //    me.config.parentPane.show();
        //});

        me.afterInnitialize();
    },
    afterRenderForm: function (formCmp) {
        this.callParent();

        // var formCmp = this.getForm();


        var me = this,
                form = $("form:first", formCmp.$this);
        formCmp.$this.attr("data-xfr-form", "");

        formCmp.$this.find("input[type=submit]").parent().remove();


        //formCmp.$this.find("button[data-form-button]").each(function(index, button) {
        $("button[data-form-button]", formCmp.$this).each(function (index, button) {
            // console.log("init button");
            // console.log(button);

            $(button).click(function () {
                // console.log("on click on action");
                var url = $(this).attr("data-url");
                var title = $(this).attr("data-panel-title");
                //console.log("Form Data");
                //console.log(formCmp.getData());
                if (url && url != undefined && url != "") {
                    /* Xfr.RemoteWindow.show(title, Routing.generate(url,
                     {_locale: appConfig.locale, _format: "pdf"}) + '?id=' + formCmp.getData().id);*/
                    return;
                }
                var panelClass = $(this).attr("data-panel-class");

                var size = $(this).attr("data-panel-size");
                if (size === undefined) {
                    size = 'auto';
                }
                var principals = $("[xfr-window-conteiner-principal]");
                //if(principals.length>0){
                principals.remove();
                //}
                var window = Ext.create("Xfr.panel.Window", {
                    size: size,
                    title: title,
                    renderTo: document.body,
                    items: [{
                            className: panelClass,
                            height: "100%",
                            position: '[xfr-window-content]',
                            relatedData: formCmp.getData()
                        }]
                });
                window.show();
            });
        });


    },
    afterCreate: function () {
        var me = this;
        console.log("after create");
        //me.getGrid().reload();

        // me.getForm().setDefaultSelectValue(false);
    },
    beforeCreate: function (opts) {
        var me = this;
        var crudActions = me.getCrudActions();
        if (!Ext.isEmpty(crudActions.create)) {
            me.getForm().setDefaultSelectValue(true);
            var form = $("form:first", me.getForm().$this);
            var formData = new FormData(form[0]);
            opts.data = formData;
        }
    },
    afterUpdate: function () {
        var me = this;
        me.getForm().setDefaultSelectValue(false);
    },
    beforeUpdate: function (opts) {
        var me = this;
        var crudActions = me.getCrudActions();
        if (!Ext.isEmpty(crudActions.update)) {
            me.getForm().setDefaultSelectValue(true);
            var form = $("form:first", me.getForm().$this);
            var formData = new FormData(form[0]);
            opts.data = formData;
            opts.url = crudActions.update + "&id=" + me.getForm().getData().id;
        }
    },
    beforeDelete: function (opts) {
        var me = this;
        var crudActions = me.getCrudActions();
        alert("beforeDelete");
        if (!Ext.isEmpty(crudActions.destroy)) {
            me.getForm().setDefaultSelectValue(true);
            var form = $("form:first", me.getForm().$this);
            var formData = new FormData(form[0]);
            opts.data = formData;
            opts.url = crudActions.destroy + "&id=" + me.getForm().getData().id;
        }
    },
    initGrid: function () {
        var me = this;
        var extraP = {};
        if (me.config.parentRecord) {
            var prop = me.config.parentName;
            extraP[prop] = me.config.parentRecord.id;
        }
        var panelData = me.getPanelData();
        var gridContainer = $(me.getGridPosition(), me.$this)[0];
        var grid = Ext.create("Xfr.panel.Grid", {
            position: me.getGridPosition(),
            renderTo: gridContainer,
            dynamicTplClass: me.config.grid.dynamicTplClass,
            store: {
                xtype: "xstore",
                proxy: {
                    url: panelData.gridUrl,
                    reader: {
                        totalProperty: "recordsFiltered"
                    },
                    limitParam: "length",
                    startParam: "start",
                    searchParam: "search",
                    extraParams: extraP
                }
            },
            type: me.config.grid.type,
            height: "100%",
            width: "100%",
            plugins: [{
                    xtype: "pagination",
                    position: "[data-table-paging]"
                }, {
                    xtype: "pagingsize",
                    position: "[data-table-page-size]"
                }, {
                    xtype: "gridsearch",
                    position: "[data-table-form-search]"
                }]
        });

        /*grid.on({
         select: {
         scope: me,
         fn: "onGridSelect"
         }
         });*/

        me.getChildren().push(grid);
        grid.setParent(me);
        grid.mask();
        grid.on({
            select: {
                scope: me,
                fn: "onGridSelect"
            }
        });

        grid.getStore().on({
            load: {
                scope: me,
                fn: "onStoreLoaded"
            },
            beforeload: {
                scope: me,
                fn: "beforeLoadStore"
            }
        });

        //this.setGrid(grid);
    },
    onStoreLoaded: function () {
        console.log('store loaded symfonycrudpanel');
        Xfr.Mask.hide();
    },
    beforeLoadStore: function () {
        console.log('before load store loaded symfonycrudpanel');
    },
    initView: function () {

        var me = this;

        var viewContainer = $(me.getViewPosition(), me.$this)[0];
        var view = Ext.create(me.config.view.className, {
            position: me.getViewPosition(),
            renderTo: viewContainer,
            crudButtons: me.getCrudButtons(),
            formButtons: me.config.formButtons
        });
        //console.log('crudButtons');
        //console.log(me);
        $("button[data-action-type=create]", viewContainer).on("click", function () {
            console.log('Test fonction create : si c est aussi pour un suivi');
            me.clickOnCreate();
            //alert("create");
        });
        $("button[data-action-type=edit]", viewContainer).on("click", function () {
            me.clickOnEdit();
        });
        $("button[data-action-type=delete]", viewContainer).on("click", function () {
            me.clickOnDelete();
        });


        $("button[data-action-type=custom]", viewContainer).on("click", function () {
            me.clickOnCustom(viewContainer);
        });






        var h = $(me.getGridPosition()).css("height");
        var xpanel = $("div .x_panel", viewContainer);
        xpanel.css({"height": h, "border-radius": "5px"});
        var xcontent = $("div .x_content", viewContainer);
        var nh = xpanel.height() - 43;
        xcontent.css({"overflow-y": "scroll", "overflow-x": "hidden", "margin-top": "-5px", "height": nh + "px"});
        var defObj = {};
        defObj.baseUrl = baseUrl;
        defObj.img_url = "uploads/images/" + this.getEntityName() + "/default.png";
        view.updateData(defObj);
        me.setView(view);
    },
    initForm: function () {
        var me = this;
        var record = me.config.parentRecord;
        var panelData = me.getPanelData();
        var formContainer = $(me.getFormPosition(), me.$this)[0];
        var form = Ext.create(me.config.form.className, {
            position: me.getFormPosition(),
            renderTo: formContainer,
            maskOnItemsLoading: false,
            panelData: panelData,
            parentRecord: record,
            parentName: me.config.parentName,
            listeners: {
                "formsubmit": {
                    scope: me,
                    fn: "onFormSubmit"
                }
            }
        });
        var h = $(me.getGridPosition()).css("height");
        var xpanel = $("div .x_panel", formContainer);
        xpanel.css({"height": h});
        var xcontent = $("div .x_content", formContainer);
        var nh = xpanel.height() - 43;
        xcontent.css({"overflow-y": "scroll", "overflow-x": "hidden", "margin-top": "-5px", "height": nh + "px"});


        me.setForm(form);

        $(me.getFormPosition(), me.$this).hide();



        $("button[data-action-type=save]", formContainer).on("click", function () {
            me.clickOnSave();
        });
        $("button[data-action-type=cancel]", formContainer).on("click", function () {
            me.clickOnCancel();
        });

        me.afterInnitForm();

    },
    onGridSelect: function (grid, selectedIndex, selectedRecord, selectedIndexes, selectedRecords) {
        var me = this;
        //$("button[data-action-type=edit],button[data-action-type=delete]", me.$this).show();
        me.selectedGridIndex = selectedIndex;
        selectedRecord.baseUrl = baseUrl;
        me.getView().updateData(selectedRecord);
        me.setSelectedRecord(selectedRecord);
        var parentRecordName=null;

        try{
            parentRecordName = me.getView().getRecordName();
        }
        catch(e){
            
        }
        
        var entityName = me.getEntityName();
        
        if (parentRecordName == undefined) {
            parentRecordName = me.getEntityName();
        }
        
        var viewContainer = $(me.getViewPosition(), me.$this)[0];
        $("a[data-action-type=rel]", viewContainer).unbind("click");
        $("a[data-action-type=rel]", viewContainer).on('click', function () {
            var record = me.getSelectedRecord();
            if (Ext.isEmpty(record)) {
                Xfr.Msg.show({
                    title: "Alerte!",
                    message: "Vous devez sélectionner un élément avant de faire ce traitement"
                });
                return;
            }
            //$("#erating-main-container").empty();

            var ind = $(this).attr("index");
            me.hide();
            //me.destroy();

            var paneClass = $(this).attr('data-action-pane');
            var panel = Ext.create(paneClass, {
                renderTo: "erating-main-container",
                parentRecord: record,
                parentName: entityName,
                //parentName: me.getEntityName(),
                parentPane: me,
                parentTitle: parentRecordName,
                //parentTitle: me.config.page.title,
                indexAction: ind

            });

        });
        // console.log(selectedRecord);

    }, switchMode: function (mode) {
        // console.log("switch mode = " + mode);
        var me = this;
        var viewContainer = $(' div' + me.getViewPosition(), me.$this);
        var formContainer = $(' div' + me.getFormPosition(), me.$this);
        if (mode === "read") {
            viewContainer.show();
            formContainer.hide();

        } else if (mode === "edit") {
            viewContainer.hide();
            formContainer.show();
        }
    },
    clickOnCreate: function () {
        this.toolbarAction = "create";
        this.getForm().showForm();
        this.switchMode('edit');
        //this.getGrid().unselectAllRows();
    },
    clickOnEdit: function () {
        var record = this.getSelectedRecord();
       
        if (Ext.isEmpty(record)) {
            Xfr.Msg.show({
                title: "Erreur",
                message: "Vous devez sélectionner un élément avant de modifier"
            });
            return;
        }
        this.toolbarAction = "edit";
        console.log(record);
        record.baseUrl = baseUrl;
        console.log(record.baseUrl); 
        this.getForm().showForm(record);
        //this.getForm().update(record);       
        this.switchMode('edit');
    },
    onFormSubmit: function () {
        //console.log('submitting form');
        if (this.toolbarAction === "create") {
            this.createObject();
        } else {
            this.editObject();
        }
    },
    clickOnSave: function () {
        console.log("on a cliquer sur enregistrer");
        console.log("Clique on save");
        var me = this,
                $form = $("form:first", me.getForm().$this);
        console.log("Form being submitted");
        console.log($form);
        $form.submit();

        //
        //if (this.toolbarAction === "create") {
        //    this.createObject();
        //} else {
        //    this.editObject();
        //}


    },
    clickOnDelete: function () {
        var me = this;
        var record = this.getSelectedRecord();
        //this.toolbarAction = "edit";
        //this.getForm().showForm(record);

        if (Ext.isEmpty(record)) {
            Xfr.Msg.show({
                title: "Erreur",
                message: "Vous devez sélectionner un élément avant de supprimer"
            });
            return;
        }
        this.toolbarAction = "del";
        this.getForm().showForm(record);
        //this.getForm().updateData();       
        this.switchMode('del');
        Xfr.Msg.show({
            title: "Confirmation",
            message: "Voulez vous vraiment supprimer cet élément? Cette action est irréversible!",
            icon: Xfr.Msg.QUESTION,
            btn: [Xfr.Msg.YES, Xfr.Msg.NO],
            action: function (btn) {
                if (btn === Xfr.Msg.YES.text) {
                    me.deleteObject();
                }
            }
        });
    },
    createObject: function () {
        var me = this;
        var urlAdd = "";
        //var formData = me.getFormData();
        if (me.config.parentRecord) {
            urlAdd = this.getUrlAction('create', me.config.parentRecord.id, me.config.parentName);
        }
        else {
            urlAdd = this.getUrlAction('create');
        }

        var form = $("form:first", me.$this);
        formData = new FormData(form[0]);

        var opts = {
            url: urlAdd,
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            dataType: "json",
            type: "POST"
        };


        Xfr.Mask.show('Enregistrement...');
        $.ajax(Ext.merge(opts, {
            success: function (response, textStatus, jqXHR) {
                //Xfr.Mask.hide();

                if (response.success) {
                    //console.log("easy");
                    //console.log(response);
                    Xfr.Mask.hide();
                    Xfr.Msg.show({
                        title: "Succès",
                        //message: "Ville enregistrée avec succès",
                        message: response.message,
                        icon: Xfr.Msg.SUCCESS
                    });
                    me.afterCreate();
                    me.clickOnCancel();
                    me.getForm().reset();
                    me.getChildren()[0].reload();
                } else {
                    //Gestion de l'affochage des erreurs
                    //console.log("Affichage des messages d'erreurs");


                    var message = "";

                    if (response.errors != undefined && response.errors.form != undefined) {
                        var formError = response.errors.form;


                        message = me.getErrorMessages(formError);

                        message = '<ul class="msgbox-error">' + message + "</ul>";

                        //for (var field in formError.children) {
                        //    if( formError.children.hasOwnProperty(field) ) {
                        //        var fieldValue=formError.children[field];
                        //        if(fieldValue.errors!=undefined && Array.isArray(fieldValue.errors) ){
                        //            Ext.each(fieldValue.errors, function(error){
                        //                message=message+"<p><span>"+field+": </span>"+error+"</p>";
                        //            });
                        //        }
                        //    }
                        //}
                    }
                    Xfr.Mask.hide();

                    Xfr.Msg.show({
                        title: "Erreur",
                        message: response.message + " " + message,
                        icon: Xfr.Msg.ERROR
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Xfr.Mask.hide();

                Xfr.Msg.show({
                    title: "Erreur",
                    message: "Une erreur est survenue sur le serveur!",
                    icon: Xfr.Msg.ERROR
                });
            }
        }));
    },
    editObject: function () {
        var me = this;
        //var formData = me.getFormData();

        var form = $("form:first", me.$this);
        formData = new FormData(form[0]);
        //console.log("form");
        //console.log(form);
        var record = this.getSelectedRecord();

        var opts = {
            url: this.getUrlAction('edit', record.id),
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            dataType: "json",
            type: "POST"
        };

        Xfr.Mask.show('Enregistrement...');

        $.ajax(Ext.merge(opts, {
            success: function (response, textStatus, jqXHR) {
                //Xfr.Mask.hide();

                //me.getForm().reset();

                if (response.success) {
                    Xfr.Mask.hide();
                    Xfr.Msg.show({
                        title: "Succès",
                        // message: "Ville modifiée avec succès",
                        message: response.message,
                        icon: Xfr.Msg.SUCCESS
                    });
                    me.clickOnCancel();
                    me.getChildren()[0].reload();
                    me.getView().updateData(response.data);
                    me.getForm().update(response.data);
                    me.afterEdit();
                } else {

                    console.log("Affichage des messages d'erreurs");

                    console.log(response.data);
                    //  console.log(response.data.errors);
                    console.log(response.errors);


                    var message = "";
                    if (response.errors != undefined && response.errors.form != undefined) {

                        var formError = response.errors.form;

                        message = me.getErrorMessages(formError);

                        message = '<ul class="msgbox-error">' + message + "</ul>";
                        //for (var field in formError.children) {
                        //    if( formError.children.hasOwnProperty(field) ) {
                        //        var fieldValue=formError.children[field];
                        //        if(fieldValue.errors!=undefined && Array.isArray(fieldValue.errors) ){
                        //            Ext.each(fieldValue.errors, function(error){
                        //                message=message+"<p><span>"+field+": </span>"+error+"</p>";
                        //            });
                        //        }
                        //    }
                        //}
                    }


                    Xfr.Mask.hide();

                    Xfr.Msg.show({
                        title: "Erreur",
                        message: response.message + " " + message,
                        icon: Xfr.Msg.ERROR
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Xfr.Mask.hide();

                Xfr.Msg.show({
                    title: "Erreur",
                    message: "Une erreur est survenue sur le serveur!",
                    icon: Xfr.Msg.ERROR
                });
            }
        }));
    },
    getErrorMessages: function (form) {
        var me = this;

        message = "";

        for (var field in form.children) {
            if (form.children.hasOwnProperty(field)) {
                var fieldValue = form.children[field];
                if (fieldValue.errors != undefined && Array.isArray(fieldValue.errors)) {
                    Ext.each(fieldValue.errors, function (error) {
                        message = message + "<li><span>" + field + ": </span>" + error + "</li>";
                    });
                }
                if (fieldValue.children != undefined) {
                    message = message + me.getErrorMessages(fieldValue);
                }
            }
        }
        return message;
    },
    deleteObject: function () {
        var me = this;
        var record = this.getSelectedRecord();
        console.log("entité selectionner");
        console.log(me.getEntityName());
        var entity = me.getEntityName();
        var methode = "GET";
        if (entity === "utilisateur"){
            methode = "POST";
        } 
        /*this.getForm().showForm(record);
         var formData = me.getFormData();*/
        Xfr.Mask.show('Suppression...');
        $.ajax({
            url: this.getUrlAction('delete', record.id),
            type: methode,
            dataType: "json",
            success: function (response, textStatus, jqXHR) {
                //Xfr.Mask.hide();
                me.clickOnCancel();
                //me.getForm().reset();
                me.getChildren()[0].reload();
                if (response.success) {
                    Xfr.Mask.hide();
                    Xfr.Msg.show({
                        title: "Succès",
                        //message: "Ville supprimée avec succès",
                        message: response.message,
                        icon: Xfr.Msg.SUCCESS
                    });
                    me.getView().updateData({});
                } else {
                    Xfr.Mask.hide();
                    Xfr.Msg.show({
                        title: "Erreur",
                        message: response.message,
                        icon: Xfr.Msg.ERROR
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Xfr.Mask.hide();
                Xfr.Msg.show({
                    title: "Erreur",
                    message: "Une erreur est survenue sur le serveur!",
                    icon: Xfr.Msg.ERROR
                });
            }
        });
    },
    clickOnCancel: function () {
        var record = this.getSelectedRecord();
        this.callParent(arguments);
        var defObj = {};
        /**** ligne ajoutée pour garder l'objet selectionée dans la vue apres annulation modification ***/
        defObj = record;
        if (Ext.isEmpty(defObj)) {
            defObj = {};
        }
        defObj.baseUrl = baseUrl;
        //defObj.img_url = "uploads/images/" + this.getEntityName() + "/default.png";
        this.getView().updateData(defObj);
    },
    getFormData: function () {
        var me = this;
        var formContainer = $(me.getFormPosition(), me.$this)[0];
        return  $("form:first", formContainer).serialize();
    },
    getUrlAction: function (action, id, label) {
        var actions = this.getCrudButtons();
        for (var i = 0; i < actions.length; i++) {
            if (actions[i].action === action) {
                if (Ext.isEmpty(id)) {
                    return actions[i].url;
                }
                else {
                    if (Ext.isEmpty(label)) {
                        return actions[i].url + "&id" + this.getEntityName() + "=" + id;
                    }
                    else {
                        return actions[i].url + "&id" + label + "=" + id;
                    }
                }
            }
        }
        return null;
    },
    beforeBackStep: function () {
        if (!Ext.isEmpty(this.config.parentPane.config.formButtons)) {
            this.config.parentPane.config.formButtons[this.config.indexAction].number = this.getChildren()[0].getStore().getTotalCount();
        }
    },
    afterEdit: function () {

    },
    afterInnitForm: function () {

    },
    afterInnitialize: function () {

    }

});

Ext.define("JS.article.AdvancedSearch", {
    extend: "Xfr.Component",
    requires: [],
    config: {
        slimscroll:false
    },
    initialize: function () {

        console.log("initializing advanced search");
        var me = this;

        me.on({
            afterrendertpl: {
                scope: me,
                fn: "onAfterRenderTpl"
            }
        });

        this.callParent();
        
        //$('#form_pme').select2({
        //    ajax: select2AjaxConfig('api_v1_get_pmes'),
        //    escapeMarkup: function (markup) {
        //        return markup;
        //    },
        //    placeholder: "Sélection PME",
        //    allowClear: true,
        //    minimumInputLength: 1,
        //    templateResult: function (data) {
        //        if (null != data && undefined != data) {
        //            if (data.rso) {
        //                return data.id + '-' + data.rso;
        //            }
        //            else {
        //                return data.text;
        //            }
        //        }
        //        return null;
        //    },
        //    templateSelection: function (data) {
        //        if (null != data && undefined != data) {
        //            if (data.rso) {
        //                return data.id + '-' + data.rso;
        //            }
        //            else {
        //                return data.text;
        //            }
        //        }
        //        return null;
        //    }
        //});

    },
    onAfterRenderTpl: function (me) {
        var me = this;

        //console.log("after render tpl filter form");

        $("#filter-all-date-debut").datepicker({
            format: "dd/mm/yyyy",
            autoclose: true,
            endDate: "+0d",
            startView: 1,
            maxViewMode: 0,
            todayBtn: "linked",
            todayHighlight: true
        });

        $("#filter-all-date-fin").datepicker({
            format: "dd/mm/yyyy",
            autoclose: true,
            endDate: "+0d",
            startView: 1,
            maxViewMode: 0,
            todayBtn: "linked",
            todayHighlight: true
        });

    }
});

Ext.define("JS.article.AdvancedSearchAdmin", {
    extend: "Xfr.Component",
    requires: [],
    config: {
        slimscroll: false
    },
    initialize: function () {

        console.log("initializing advanced search");
        var me = this;

        me.on({
            afterrendertpl: {
                scope: me,
                fn: "onAfterRenderTpl"
            }
        });

        this.callParent();

        //$('#form_pme').select2({
        //    ajax: select2AjaxConfig('api_v1_get_pmes'),
        //    escapeMarkup: function (markup) {
        //        return markup;
        //    },
        //    placeholder: "Sélection PME",
        //    allowClear: true,
        //    minimumInputLength: 1,
        //    templateResult: function (data) {
        //        if (null != data && undefined != data) {
        //            if (data.rso) {
        //                return data.id + '-' + data.rso;
        //            }
        //            else {
        //                return data.text;
        //            }
        //        }
        //        return null;
        //    },
        //    templateSelection: function (data) {
        //        if (null != data && undefined != data) {
        //            if (data.rso) {
        //                return data.id + '-' + data.rso;
        //            }
        //            else {
        //                return data.text;
        //            }
        //        }
        //        return null;
        //    }
        //});

    },
    onAfterRenderTpl: function (me) {
        var me = this;

        //console.log("after render tpl filter form");

        $('#filter-all-date-creation').daterangepicker(
            {
                autoUpdateInput: false,
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                startDate: moment().subtract(29, 'days'),
                endDate: moment(),
                "locale": {
                    "format": "DD/MM/YYYY",
                    cancelLabel: 'Clear'
                }
            }
        );



        $('#filter-all-date-creation').on('apply.daterangepicker', function(ev, picker) {
            $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
        });

        $('#filter-all-date-creation').on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('');
        });


        $('#filter-all-date-soummission').daterangepicker(
            {
                autoUpdateInput: false,
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                startDate: moment().subtract(29, 'days'),
                endDate: moment(),
                "locale": {
                    "format": "DD/MM/YYYY",
                    cancelLabel: 'Clear'
                }
            }
        );

        $('#filter-all-date-soummission').on('apply.daterangepicker', function(ev, picker) {
            $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
        });

        $('#filter-all-date-soummission').on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('');
        });


        $("#article-form_status").select2({
            placeholder: 'Select a status',
            allowClear: true,
            ajax: {
                url: Routing.generate('get_status_list', {
                    _format:'json'
                }),
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used
                    params.page = params.page || 1;

                    return {
                        results: data.data,
                        pagination: {
                            more: (params.page * 30) < data.recordsFiltered
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
            minimumInputLength: 0,
            templateResult: function(data){
                console.log(data);
                return data.id+" "+data.libelle;
            }, // omitted for brevity, see the source of this page
            templateSelection: function (data){
                console.log(data);
                if(data && data.id){
                    return data.id+" "+data.libelle;
                }
                return data.text;
            } // omitted for brevity, see the source of this page
        });



        $("#article-form_categorie").select2({
            placeholder: 'Select a category',
            allowClear: true,
            ajax: {
                url: Routing.generate('get_categories', {
                    _format:'json'
                }),
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used
                    params.page = params.page || 1;

                    return {
                        results: data.data,
                        pagination: {
                            more: (params.page * 30) < data.recordsFiltered
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
            minimumInputLength: 1,
            templateResult: function(data){
                console.log(data);
                return data.id+" "+data.intitule;
            }, // omitted for brevity, see the source of this page
            templateSelection: function (data){
                console.log(data);
                if(data && data.id){
                    return data.id+" "+data.intitule;
                }
                return data.text;
            } // omitted for brevity, see the source of this page
        });

        $("#article-form_type").select2({
            placeholder: 'Select an article type',
            allowClear: true,
            ajax: {
                url: Routing.generate('get_typearticles', {
                    _format:'json'
                }),
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used
                    console.log("processing result");
                    console.log(data);
                    console.log(params);

                    params.page = params.page || 1;

                    return {
                        results: data.data,
                        pagination: {
                            more: (params.page * 30) < data.recordsFiltered
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
            minimumInputLength: 1,
            templateResult: function(data){
                console.log(data);
                return data.id+" "+data.libelle;
            }, // omitted for brevity, see the source of this page
            templateSelection: function (data){
                console.log(data);
                if(data && data.id){
                    return data.id+" "+data.libelle;
                }
                else{
                    return data.text;
                }

            } // omitted for brevity, see the source of this page
        });

        $("#article-form_author").select2({
            placeholder: 'Select an author',
            allowClear: true,
            ajax: {
                url: Routing.generate('get_auteurs', {
                    _format:'json'
                }),
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used
                    params.page = params.page || 1;

                    return {
                        results: data.data,
                        pagination: {
                            more: (params.page * 30) < data.recordsFiltered
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
            minimumInputLength: 1,
            templateResult: function(data){
                console.log(data);
                return data.id + " - "+ data.personne.prenom+ " " + data.personne.nom;
            }, // omitted for brevity, see the source of this page
            templateSelection: function (data){
                console.log(data);
                if(data && data.id){
                    return data.id + " - "+ data.personne.prenom+ " " + data.personne.nom;
                }
                return data.text;
            } // omitted for brevity, see the source of this page
        });


        $("#article-form_editor").select2({
            placeholder: 'Select an editor',
            allowClear: true,
            ajax: {
                url: Routing.generate('get_editors', {
                    _format:'json'
                }),
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used
                    params.page = params.page || 1;

                    return {
                        results: data.data,
                        pagination: {
                            more: (params.page * 30) < data.recordsFiltered
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
            minimumInputLength: 1,
            templateResult: function(data){
                console.log(data);
                return data.id + " - "+ data.personne.prenom+ " " + data.personne.nom;
            }, // omitted for brevity, see the source of this page
            templateSelection: function (data){
                console.log(data);
                if(data && data.id){
                    return data.id + " - "+ data.personne.prenom+ " " + data.personne.nom;
                }
                return data.text;
            } // omitted for brevity, see the source of this page
        });



        $("#article-form_reviewer").select2({
            placeholder: 'Select an reviewer',
            allowClear: true,
            ajax: {
                url: Routing.generate('get_reviewers', {
                    _format:'json'
                }),
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used
                    params.page = params.page || 1;

                    return {
                        results: data.data,
                        pagination: {
                            more: (params.page * 30) < data.recordsFiltered
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
            minimumInputLength: 1,
            templateResult: function(data){
                console.log(data);
                return data.id + " - "+ data.personne.prenom+ " " + data.personne.nom;
            }, // omitted for brevity, see the source of this page
            templateSelection: function (data){
                console.log(data);
                if(data && data.id){
                    return data.id + " - "+ data.personne.prenom+ " " + data.personne.nom;
                }
                return data.text;
            } // omitted for brevity, see the source of this page
        });

    }
});

/**
 * Created by maglo on 10/09/2016.
 */
Ext.define('JS.article.AuthorHome', {
    "extend": "Xfr.Component",
    config: {
        jsApp: null,
        eventBound: false,
        title:"Author Home"
    },
    //constructor: function (config) {
    //    var me = this;
    //    console.log("constructeur Author List");
    //    console.log(config);
    //    Ext.apply(me.config, config);
    //    me.initialize();
    //},
    initialize: function () {
        var me = this;
        Xfr.log("Initialising app class");
        Xfr.log("Loading pageClass");

        console.log(me.config);

        me.callParent(arguments);

        //me.innitNotification();
    },
    afterRenderTpl: function () {
        var me = this;
        me.callParent(arguments);
        Xfr.Mask.show('Loading data...', null, me.$this);
        $.ajax({
            url: Routing.generate("get_author_manuscrit_count", {
                _format: "json"
            }),
            type: "GET",
            dataType: "json",
            success: function (response, textStatus, jqXHR) {
                console.log("Response");
                console.log(response);
                me.setData(response);
                if(!me.getEventBound()){
                    me.bindEvent();
                    me.setEventBound(true);
                }
                Xfr.Mask.hide();
            }
        });


    },
    onShow:function(me){
        var me = this;
        me.callParent(arguments);
        Xfr.Mask.show('Loading data...', null, me.$this);
        $.ajax({
            url: Routing.generate("get_author_manuscrit_count", {
                _format: "json"
            }),
            type: "GET",
            dataType: "json",
            success: function (response, textStatus, jqXHR) {
                console.log("Response");
                console.log(response);
                me.setData(response);
                if(!me.getEventBound()){
                    me.bindEvent();
                    me.setEventBound(true);
                }
                Xfr.Mask.hide();
            }
        });
    },
    bindEvent: function () {
        console.log("binding events...");
        var me = this;
        me.binder.on('new', function(e){
            console.log("button clicked");
            me.getJsApp().showPanel("JS.article.ManuscritForm",{});
        });

        me.binder.on('sub1', function(e){
            console.log("Submission sent back to user clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Submission sent back to author",
                subtitle: "List",
                status:1
            });
        });

        me.binder.on('sub2', function(e){
            console.log("Submission sent back to user clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Incomplete submissions",
                subtitle: "List",
                status:2
            });
        });

        me.binder.on('sub3', function(e){
            console.log("Submission waiting for validation clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Submission waiting for validation",
                subtitle: "List",
                status:3
            });
        });

        me.binder.on('sub4', function(e){
            console.log("Submission waiting for validation clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Submission in progress",
                subtitle: "List",
                status:4
            });
        });

        me.binder.on('rev1', function(e){
            console.log("Submission waiting for validation clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Submission waiting for revision",
                subtitle: "List",
                status:5
            });
        });

        me.binder.on('rev2', function(e){
            console.log("Submission waiting for validation clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Revision sent back to the author",
                subtitle: "List",
                status:6
            });
        });

        me.binder.on('rev3', function(e){
            console.log("Submission waiting for validation clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Incomplete revision",
                subtitle: "List",
                status:7
            });
        });

        me.binder.on('rev4', function(e){
            console.log("Submission waiting for validation clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Revision waiting for validation",
                subtitle: "List",
                status:8
            });
        });

        me.binder.on('rev5', function(e){
            console.log("Submission waiting for validation clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Revision in progress",
                subtitle: "List",
                status:9
            });
        });

        me.binder.on('rev6', function(e){
            console.log("Submission waiting for validation clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Revision rejected",
                subtitle: "List",
                status:10
            });
        });

        me.binder.on('com1', function(e){
            console.log("Submission waiting for validation clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Submission with a decision",
                subtitle: "List",
                status:11
            });
        });

        me.binder.on('com2', function(e){
            console.log("Submission waiting for validation clicked");
            me.getJsApp().showPanel("JS.article.List",{
                title:"Submission with completed production",
                subtitle: "List",
                status:12
            });
        });

        //$("#btn-edition-home-new-article").on('click', function () {
        //    //chargement de la classe Emprunt Manager
        //    //console.log("Chargement du portefeuille");
        //
        //    console.log("Clique sur le boutoon nouveau article")
        //    Xfr.Mask.show('Chargement...');
        //
        //    $("#edition-main-container").empty();
        //    //me.destroyCurrentPanel();
        //    var panel = Ext.create('JS.article.ManuscritForm', {
        //        renderTo: "edition-main-container"
        //    });
        //
        //    //me.setCurrentPanel(panel);
        //    //
        //    //$("ul.nav.child_menu>li").removeClass("active");
        //    //$( this).parent().addClass("active");
        //
        //});


    },
    innitNotification: function () {

    },
    destroyCurrentPanel: function () {
        var me = this;
        if (me.getCurrentPanel() !== null) {
            console.log("Desctruction du panneau courant");
            $("#erating-main-container").empty();
            me.getCurrentPanel().destroy();
        }
    }
});

/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.article.EditorForm", {
    //extend: "JS.panel.Form",
    extend: "Xfr.Component",
    config: {
        dynamicTpl: false,

        panelData: {
            formUrl: Routing.generate("get_editor", {id: "new", _format: 'html'})
        },
        listeners: {
            "loadtpl": {
                fn: "onLoadTpl"
            },
            //"afterrendertpl": {
            //    fn: "afterRenderTpl"
            //},
            "render": {
                fn: "onShow"
            },
            "onCancel": Ext.emptyFn
        },
        form: null,
        eventBound:false,
        action:"new",
        selectedArticles:[],
        title: 'Assign editor',
        subtitle: '',
        parentCmp:null,
        jsApp:null
    },
    onLoadTpl: function () {
        var me = this;
        me.callParent(arguments);

    },
    afterRenderTpl: function () {
        var me = this;
        me.callParent(arguments);

        var id="new";
        var selectedArticles=me.getSelectedArticles();
        if(selectedArticles!=null && selectedArticles.length==1){
            id=selectedArticles[0].id;
        }

        var form = Ext.create("Xfr.Component", {
            //className: "Xfr.panel.Form",
            position: "[data-mode=edit]",
            dynamicTpl: false,
            tplUrl: Routing.generate("get_editor", {
                id: id,
                _format: 'html'
            }),
            syncTplLoading: false,
            cache:false,
            renderTo: "editor-form-place",
            listeners: {
                "loadtpl": {
                    scope: me,
                    fn: "onLoadFormTpl"
                },
                "afterrendertpl": {
                    scope: me,
                    fn: "afterFormTplRendered"
                },
                "render": {
                    scope: me,
                    fn: "onShow"
                }
            }
        });

        me.setForm(form);



    },

    onFormLoaded: function () {
        var me = this;
        me.callParent(arguments);

    },
    onShow: function () {
        var me = this;
        me.callParent(arguments);

    },
    initialize: function () {
        var me = this;
        me.callParent(arguments);



    },
    onLoadFormTpl:function(loadedCmp, tplObj){
        console.log('form Editor TPL Loaded');

    },
    afterFormTplRendered:function(){
        console.log('After Form Editor TPL rendered co auteur');

        var me = this,
            form = $("form:first", me.getForm().$this);
        form.submit(function(e){
            e.preventDefault();
            me.save();
        });

        var saveBtn=$("button[data-action-type=save]", form);
        console.log(saveBtn);
        saveBtn.on("click", function(e){
            console.log("Save button clicked");
            e.preventDefault();
            me.save();
        });


        var cancelBtn=$("button[data-action-type=reset]", form);
        console.log(cancelBtn);
        cancelBtn.on("click", function(e){
            console.log("Cancel button clicked");
            e.preventDefault();
            me.fireEvent('onCancel', me);
        });


        var selectedArticles=me.getSelectedArticles();
        var article=null;
        if(selectedArticles!=null && selectedArticles.length==1){
            article=selectedArticles[0];
        }


        $("#article_editor_editeur").select2();
        if(article!=null && article.editeur!=null){
            $("#article_editor_editeur").select2().val(article.editeur.id);
        }




    },

    handleForm:function(){
        var me=this;

        var id=-1;

        Xfr.Mask.show("Chargement en cours",null);
        //SAve current step
        console.log("Saving current step");

        var form = $("form:first", me.getForm().$this);
        var formData=null;
        console.log(form);
        if(form && form!=null){
            formData = new FormData(form[0]);
        }

        console.log("Form Data");
        console.log(formData);

        var selectedArticles=me.getSelectedArticles();
        var articleIds='';
        if(selectedArticles!=null && selectedArticles.length>0){
            articleIds=selectedArticles[0].id;
            for(var i=1; i<selectedArticles.length; i++){
                articleIds=articleIds+','+selectedArticles[i].id;
            }
        }

        $.ajax({
            url: Routing.generate('post_editor', {
                _format: 'json',
                id: id,
                articleIds: articleIds
            }),
            cache: false,
            contentType: false,
            processData: false,
            type: "POST",
            data: formData,
            dataType: "json",
            success: function (response, textStatus, jqXHR) {
                console.log("ajax success");
                console.log(response);
                if(response && response.success){
                    //console.log("Response success");
                    //console.log("auteur enregistré");
                    ////Ajouter l'auteur dans la liste
                    //var parent=me.getParentCmp();
                    //if(id>0){
                    //    parent.editCoauteur(response.data);
                    //}
                    //else{
                    //    parent.addCoauteur(response.data);
                    //}

                    me.fireEvent('onCancel', me);
                }
                else{
                    console.log("Success False");


                }
                //$("li.current").toggleClass('current');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: "+ errorThrown);

            }
        });


    },

    save:function(){
        var me = this,
            form = $("form:first", me.getForm().$this);
        me.action="previous";

        var validateOptions = me.getFormValidation();
        if (!Ext.isEmpty(form)) {
            console.log("Validate options");
            console.log(validateOptions);
            var validator=form.validate(validateOptions);
            if(validator.form()){
                me.handleForm();
            }
        }
        //form.submit();

    },

    getFormValidation:function(){
        var validation={
            rules: {
                'article[typeArticle]': {
                    required: true
                }
            },
            messages: {
                'article[typeArticle]': {
                    required: ""
                }
            }
        };

        return validation;
    },
    reset: function () {
        console.log('Reset');
    },
    onFormSubmit: function () {
        console.log("submitting form Manuscrit form");
        var me = this;
    },
    getFieldModel: function (fieldName, entityName, removeLastField) {
        if (Ext.isEmpty(removeLastField)) {
            removeLastField = false;
        }
        fieldName = $.trim(fieldName);
        var entityExp = new RegExp(entityName, 'i');

        fieldName = fieldName.replace(entityExp, "data");
        fieldName = fieldName.replace(/\[\]/g, "");
        fieldName = fieldName.replace(/\[/g, ".");
        fieldName = fieldName.replace(/\]/g, "");
        if (removeLastField) {
            var tab = fieldName.split(".");
            var last = tab.pop();
            if (last === "first") {
                fieldName = tab.join(".");
            }

        }
        return fieldName;
    }
});
/**
 * Created by maglo on 27/09/2016.
 */
Ext.define("JS.article.List",{
    extend:"JS.panel.HistoryGridPanel",
    config:{
        panelData: {
            url: "",
            panelClass: "",
            gridUrl: Routing.generate("get_manuscrits"),
            actions: []
        },
        grid: {
            store: {
                proxy: {
                    url: Routing.generate("get_manuscrits", {_format: "json"})
                }
            },
            type: "custom",
            dynamicTplClass: "JS.article.GridCustom",
            templateHelpers: {
                isArticleEditable: function(article){
                    console.log("IsArticleEditable called");
                    console.log(article);
                    return article.statut=="SOUMISSION_RETOURNE_A_L_AUTEUR" ||
                        article.statut=="SOUMISSION_INCOMPLETE"||
                        article.statut=="SOUMISSION_EN_ATTENTE_DE_VALIDATION"||
                        article.statut=="REVISION_RENVOYE_A_L_AUTEUR"||
                        article.statut=="REVISION_INCOMPLETE"||
                        article.statut=="REVISION_EN_ATTENTE_DE_VALIDATION";
                }

            }
        },
        status:1,
        eventBound:false,
        jsApp:null
    },
    initialize:function(){

        var me = this;
        var panelData = me.getPanelData(),
            actions = [];

        var action = {
            param: {
                "url": "get_manuscrits",
                "panelClass": "JS.article.AdvancedSearch",
                "formUrl": "",
                "gridUrl": "get_manuscrits"
            },
            libelle: "Advanced search",
            description: "Advanced search"
        };

        me.config.grid.store.proxy.url=Routing.generate("get_manuscrits", {
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
                console.log("article detail clicked");
                console.log(e);
                me.getJsApp().showPanel("JS.article.View",{
                    title: e.context.titre_court,
                    article: e.context,
                    editor: false,
                    author: true,
                    reviewer:false
                });
            });

            grid.binder.on('show-edit', function(e){
                console.log("article edit clicked");
                console.log(e);
                me.getJsApp().showPanel("JS.article.ManuscritForm",{
                    title: e.context.titre_court,
                    article: e.context
                });
            });

            grid.binder.on('delete', function(e){
                console.log("article edit clicked");
                console.log(e);
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
                            console.log("Click on btn yes");
                            console.log("Deleting article");

                            grid.getStore().load();
                        }
                    }
                });

            });
            me.setEventBound(true);
        }

    }
});
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
/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.article.ManuscritAuthorsCmp", {
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
        coauteurs: [],
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
            me.binder.on('add-author', function (e) {
                console.log("add button clicked");
                me.showDialogAdd();
            });
            me.binder.on('edit-author', function (e) {
                console.log("edit button clicked");
                me.showDialogEdit(e);
            });
            me.binder.on('remove-author', function (e) {
                console.log("remove button clicked");
                me.removeAuthor(e);
            });
            me.binder.on('set-principal', function (e) {
                console.log("set principal button clicked");
                me.setPrincipal(e);
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
            url: Routing.generate('get_coauteurs', {
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
                    me.setCoauteurs(response.data);
                    var data={
                        article: me.getArticle(),
                        coauteurs: response.data,
                        baseUrl:baseUrl
                    };

                    console.log(data);
                    me.setData(data);
                    me.fireEvent('afterauthorloaded', me);
                }
                else{
                    console.log("Success False");
                    $("li[data-step="+currentStep+"]").removeClass('completed');

                }
                //$("li.current").toggleClass('current');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: "+ errorThrown);
                $("li[data-step="+currentStep+"]").removeClass('completed');
            }
        });
    },
    addCoauteur: function(coauteur){
        var me=this;
        var coauteurs=me.getCoauteurs();
        coauteurs.push(coauteur);
        var data={
            article: me.getArticle(),
            coauteurs: coauteurs,
            baseUrl:baseUrl
        };
        console.log(data);
        me.setData(data);
    },
    editCoauteur:function(coauteur){
        var me=this;
        var coauteurs=me.getCoauteurs();
        for (var i=0; i<coauteurs.length; i++){
            if(coauteurs[i].id==coauteur.id){
                coauteurs[i]=coauteur;
                break;
            }
        }
        var data={
            article: me.getArticle(),
            coauteurs: coauteurs,
            baseUrl:baseUrl
        };
        console.log(data);
        me.setData(data);
    },
    showDialogAdd: function(){

        var me=this;
        var dialog=Ext.create("Xfr.panel.Window", {
            size: 'medium',
            title:  "Adding author",
            renderTo: document.body,
            items: [{
                className: "JS.auteur.CoAuteurForm",
                height: "100%",
                position: '[xfr-window-content]',
                coAuteur: null,
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
            title:  "Adding author",
            renderTo: document.body,
            items: [{
                className: "JS.auteur.CoAuteurForm",
                height: "100%",
                position: '[xfr-window-content]',
                coAuteur: context.context,
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
    removeAuthor:function(context){
        var me=this;
        console.log(context);
        $.ajax({
            url: Routing.generate('delete_coauteur', {
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
                    var coauteurs=me.getCoauteurs();
                    var newList=[];
                    for (var i=0; i<coauteurs.length; i++){
                        if(coauteurs[i].id==context.context.id){

                            continue;
                        }
                        else{
                            newList.push(coauteurs[i]);
                        }
                    }
                    me.setCoauteurs(newList);
                    var data={
                        article: me.getArticle(),
                        coauteurs: newList,
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
    setPrincipal:function(context){
        console.log(context);
        var me=this;
        console.log(context);
        $.ajax({
            url: Routing.generate('put_coauteur', {
                _format: 'json',
                id: context.context.id,
                principal:true
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
                if(response && response.success){
                    console.log("Response success");
                    console.log(response);
                    var coauteurs=me.getCoauteurs();

                    var coauteur=response.data;
                    for (var i=0; i<coauteurs.length; i++){
                        if(coauteurs[i].id==coauteur.id){
                            coauteurs[i]=coauteur;
                            continue;
                        }
                        else{
                            coauteurs[i].principal=false;
                        }
                    }
                    var data={
                        article: me.getArticle(),
                        coauteurs: coauteurs,
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
/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.article.ManuscritForm", {
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
            //"afterrendertpl": {
            //    fn: "afterRenderTpl"
            //},
            "render": {
                fn: "onShow"
            }
        },
        form: null,
        eventBound:false,
        currentStep:1,
        action:"",
        article:null,
        title: 'Article Submission',
        subtitle: 'New',
        jsApp:null
    },
    onLoadTpl: function () {
        var me = this;
        Xfr.log("Manuscrit tpl form loaded");
        me.callParent(arguments);

    },
    afterRenderTpl: function () {
        var me = this;
        var currentStep=me.getCurrentStep();
        me.callParent(arguments);

        //On set les données du template
        var data={
            stepList: JS.article.ManuscritForm.stepList
        };
        me.setData(data);

        if(currentStep==null || currentStep<0){
            currentStep=JS.article.ManuscritForm.stepList[0].code;
            me.setCurrentStep(currentStep);
        }

        //Création du formulaire

        me.loadStep(currentStep);


        var next = $("button[data-action=next]");
        var previous = $("button[data-action=previous]");

        next.on('click', function () {
            console.log("Next button clicked");
            me.next();
        });
        previous.on('click', function () {
            console.log("Previous button clicked");
            me.previous();
        });

        if(!me.getEventBound()){
            me.binder.on('step-click', function (e) {
                //console.log("Step cliqued");
                //console.log("event context");
                //console.log(e);
                me.loadStep(e.context.code);
            });
            me.setEventBound(true);
        }

        me.initStepState();

    },
    initStepState:function(){
        var me=this;

        var article=me.getArticle();

        if(article && article!=null){
            if (article.step1){
                $("li[data-step=1]").addClass('completed');
            }
            if (article.step2){
                $("li[data-step=2]").addClass('completed');
            }
            if (article.step3){
                $("li[data-step=3]").addClass('completed');
            }
            if (article.step4){
                $("li[data-step=4]").addClass('completed');
            }
            if (article.step5){
                $("li[data-step=5]").addClass('completed');
            }
            if (article.step6){
                $("li[data-step=6]").addClass('completed');
            }
            if (article.step7){
                $("li[data-step=7]").addClass('completed');
            }
            if (article.step8){
                $("li[data-step=8]").addClass('completed');
            }
            if (article.step9){
                $("li[data-step=9]").addClass('completed');
            }
            if (article.step10){
                $("li[data-step=10]").addClass('completed');
            }
            if (article.step11){
                $("li[data-step=11]").addClass('completed');
            }
        }
    },
    onFormLoaded: function () {
        var me = this;
        me.callParent(arguments);

    },
    onShow: function () {
        var me = this;
        Xfr.log("Manuscrit form rendered or shown");
        me.callParent(arguments);

    },
    initialize: function () {
        var me = this;
        console.log("Initialising MAnuscrit class");
        me.callParent(arguments);


    },
    loadStep: function (step) {
        console.log("loading step");
        console.log(step);



        var me=this;
        var article=me.getArticle();
        var articleId=-1;

        Xfr.Mask.show("Loading Step...", null, me.$this);

        if(step==null || step==undefined){
            step=me.getCurrentStep();
        }

        var formContainer=$("#form-place");

        formContainer.empty();

        if(article!=null){
            articleId=article.id;
        }

        me.setCurrentStep(step);
        var form=null;
        if(step==3){ //Author Step
            form = Ext.create("JS.article.ManuscritAuthorsCmp", {
                //className: "Xfr.panel.Form",
                position: "[data-mode=edit]",
                dynamicTpl: false,

                article: article,
                syncTplLoading: false,
                cache:false,
                renderTo: "form-place",
                jsApp: me.getJsApp(),
                listeners: {
                    "loadtpl": {
                        scope: me,
                        fn: "onLoadFormTpl"
                    },
                    "afterrendertpl": {
                        scope: me,
                        fn: Ext.emptyFn
                    },
                    "afterauthorloaded": {
                        scope: me,
                        fn: "afterFormTplRendered"
                    },
                    "render": {
                        scope: me,
                        fn: "onShow"
                    }
                }
            });
        }
        else if(step==4){
            //Financial step
            console.log("Loading funding step");
            form = Ext.create("JS.article.ManuscritFundingsCmp", {
                //className: "Xfr.panel.Form",
                position: "[data-mode=edit]",
                dynamicTpl: false,

                article: article,
                syncTplLoading: false,
                cache:false,
                renderTo: "form-place",
                jsApp: me.getJsApp(),
                listeners: {
                    "loadtpl": {
                        scope: me,
                        fn: "onLoadFormTpl"
                    },
                    "afterrendertpl": {
                        scope: me,
                        fn: Ext.emptyFn
                    },
                    "afterfundingloaded": {
                        scope: me,
                        fn: "afterFormTplRendered"
                    },
                    "render": {
                        scope: me,
                        fn: "onShow"
                    }
                }
            });
        }
        else if(step==7){
            //keyword step
            console.log("Article avant création du composant");
            console.log(article);
            console.log("Loading keyword step");
            form = Ext.create("JS.cmp.MotsClesCmp", {
                //className: "Xfr.panel.Form",
                position: "[data-mode=edit]",
                dynamicTpl: false,

                article: article,
                syncTplLoading: false,
                cache:false,
                renderTo: "form-place",
                jsApp: me.getJsApp(),
                listeners: {
                    "loadtpl": {
                        scope: me,
                        fn: "onLoadFormTpl"
                    },
                    "afterrendertpl": {
                        scope: me,
                        fn: "afterFormTplRendered"
                    },
                    "render": {
                        scope: me,
                        fn: "onShow"
                    }
                }
            });
        }
        else if(step==10){
            //keyword step
            console.log("Article avant création du composant");
            console.log(article);
            console.log("Loading keyword step");
            form = Ext.create("JS.cmp.ReviewersCmp", {
                //className: "Xfr.panel.Form",
                position: "[data-mode=edit]",
                dynamicTpl: false,

                article: article,
                opposed:false,
                suggested:true,
                syncTplLoading: false,
                cache:false,
                renderTo: "form-place",
                jsApp: me.getJsApp(),
                listeners: {
                    "loadtpl": {
                        scope: me,
                        fn: "onLoadFormTpl"
                    },
                    "afterrendertpl": {
                        scope: me,
                        fn: Ext.emptyFn
                    },
                    "afterreviewerloaded": {
                        scope: me,
                        fn: "afterFormTplRendered"
                    },
                    "render": {
                        scope: me,
                        fn: "onShow"
                    }
                }
            });
        }
        else if(step==11){
            //keyword step
            console.log("Article avant création du composant");
            console.log(article);
            console.log("Loading keyword step");
            form = Ext.create("JS.cmp.ReviewersCmp", {
                //className: "Xfr.panel.Form",
                position: "[data-mode=edit]",
                dynamicTpl: false,
                opposed:true,
                suggested:false,
                article: article,
                syncTplLoading: false,
                cache:false,
                renderTo: "form-place",
                jsApp: me.getJsApp(),
                listeners: {
                    "loadtpl": {
                        scope: me,
                        fn: "onLoadFormTpl"
                    },
                    "afterrendertpl": {
                        scope: me,
                        fn: Ext.emptyFn
                    },
                    "afterreviewerloaded": {
                        scope: me,
                        fn: "afterFormTplRendered"
                    },
                    "render": {
                        scope: me,
                        fn: "onShow"
                    }
                }
            });
        }
        else if(step==12){
            //keyword step
            form = Ext.create("JS.cmp.FichiersCmp", {
                //className: "Xfr.panel.Form",
                position: "[data-mode=edit]",
                dynamicTpl: false,
                article: article,
                syncTplLoading: false,
                cache:false,
                renderTo: "form-place",
                jsApp: me.getJsApp(),
                listeners: {
                    "loadtpl": {
                        scope: me,
                        fn: "onLoadFormTpl"
                    },
                    "afterrendertpl": {
                        scope: me,
                        fn: Ext.emptyFn
                    },
                    "afterfilesloaded": {
                        scope: me,
                        fn: "afterFormTplRendered"
                    },
                    "render": {
                        scope: me,
                        fn: "onShow"
                    }
                }
            });
        }
        else{
            form = Ext.create("Xfr.Component", {
                //className: "Xfr.panel.Form",
                position: "[data-mode=edit]",
                dynamicTpl: false,
                tplUrl: Routing.generate("get_manuscrit_step", {
                    stepId: step,
                    _format: 'html',
                    id:articleId
                }),
                syncTplLoading: false,
                cache:false,
                renderTo: "form-place",
                listeners: {
                    "loadtpl": {
                        scope: me,
                        fn: "onLoadFormTpl"
                    },
                    "afterrendertpl": {
                        scope: me,
                        fn: "afterFormTplRendered"
                    },
                    "render": {
                        scope: me,
                        fn: "onShow"
                    }
                }
            });
        }


        me.setForm(form);

        //Manage current step
        $("li.current").toggleClass('current');
        $("li[data-step="+step+"]").toggleClass('current');

        var data=me.getData();
        data.currentStep=JS.article.ManuscritForm.getStepByCode(step);

        console.log("Data before update");
        console.log(data);
        me.setData(data);


    },
    onLoadFormTpl:function(loadedCmp, tplObj){
        console.log('form TPL Loaded');

    },
    afterFormTplRendered:function(){
        console.log('After Form TPL rendered');

        var me = this,
            currentStep=me.getCurrentStep(),
            form = $("form:first", me.getForm().$this);

        console.log("Current step:  --   "+ currentStep);
        switch (currentStep){
            case 1:
                me.initializeStep1();
                break;
            case 6:
                //Abstract step
                me.initializeStep6();
                break;
        }

        $("input[type=checkbox]").iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
            increaseArea: '30%' // optional
        });

        Xfr.Mask.hide();


    },
    initializeStep1:function(){
        var me=this,
            article=me.getArticle();
        console.log("initialize step1");
        $("#manuscrit_step1_typeArticle").select2();
        if(article!=null){
            console.log("article.type_article.id");
            console.log(article.type_article.id);
            $("#manuscrit_step1_typeArticle").select2().val(article.type_article.id);
        }

    },
    initializeStep6:function(){
        //var me=this,
        //    article=me.getArticle();
        console.log("initialize step 6");
        var editor=CKEDITOR.replace('manuscrit_step6_abstract');


// The "change" event is fired whenever a change is made in the editor.
        editor.on( 'change', function( evt ) {
            // getData() returns CKEditor's HTML content.
            console.log( 'Total bytes: ' + evt.editor.getData().length );
            var data=evt.editor.getData();
            $("#manuscrit_step6_abstract").val(data);
        });

    },
    handleForm:function(validForm){
        var me=this,
            currentStep=me.getCurrentStep();
        var stepList=JS.article.ManuscritForm.stepList;
        var article=me.getArticle();
        var articleId=-1;

        Xfr.Mask.show('Saving...');

        //SAve current step
        console.log("Saving current step");

        var formData=null;

        if(validForm){
            var form = $("form:first", me.getForm().$this);
            console.log(form);
            if(form && form!=null){
                formData = new FormData(form[0]);
            }

        }

        var extraData=null;

        if (typeof me.getForm().getExtraData !== "undefined") {
            extraData=me.getForm().getExtraData();
        }
        console.log("Form Data");
        console.log(formData);

        console.log("Form Data");
        console.log("extra data");
        console.log(extraData);


        if(article!=null){
            articleId=article.id;
        }
        $.ajax({
            url: Routing.generate('post_manuscrit', {
                _format: 'json',
                stepId: currentStep,
                id: articleId,
                extraData:extraData
            }),
            cache: false,
            contentType: false,
            processData: false,
            type: "POST",
            data: formData,
            dataType: "json",
            success: function (response, textStatus, jqXHR) {
                console.log("ajax success");
                console.log(response);
                Xfr.Mask.hide();
                if(response && response.success){
                    console.log("Response success");
                    $("li[data-step="+currentStep+"]").addClass('completed');
                    me.setArticle(response.data);
                    if(me.action=="next"){
                        console.log("handle next");
                        if(currentStep<stepList[stepList.length-1].code){
                            currentStep++;
                            me.setCurrentStep(currentStep);
                            me.loadStep(currentStep);
                        }
                        else if (currentStep==12){
                            article=me.getArticle();
                            me.getJsApp().showPanel("JS.article.View",{
                                title: article.titre_court,
                                article: article,
                                editor: false,
                                author: true,
                                reviewer:false
                            });
                        }
                    }
                    else  if(me.action=="previous"){
                        console.log("handle previous");

                        if(currentStep>1){
                            currentStep--;
                            me.setCurrentStep(currentStep);
                            me.loadStep(currentStep);
                        }
                    }
                }
                else{
                    console.log("Success False");
                    $("li[data-step="+currentStep+"]").removeClass('completed');

                }

                //$("li.current").toggleClass('current');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: "+ errorThrown);
                $("li[data-step="+currentStep+"]").removeClass('completed');
                Xfr.Mask.hide();
            }
        });


    },
    next:function(){
        console.log("Next function");
        var me = this,
            currentStep=me.getCurrentStep(),
            form = $("form:first", me.getForm().$this);
        me.action="next";

        if(currentStep==3 || currentStep==4 || currentStep==7 || currentStep==10 || currentStep==11 || currentStep==12){
            //Step auteur
            me.handleForm(false);
            return;
        }

        var validateOptions = me.getFormValidation(currentStep);
        //validateOptions.submitHandler = function () {
        //    me.handleForm();
        //};
        if (!Ext.isEmpty(form)) {
            console.log("Validate options");
            console.log(validateOptions);
            var validator=form.validate(validateOptions);
            if(validator.form()){
                me.handleForm(true);
            }
        }


        //form.submit();
    },
    previous:function(){
        var me = this,
            currentStep=me.getCurrentStep(),
            form = $("form:first", me.getForm().$this);
        me.action="previous";

        if(currentStep==3 || currentStep==4 || currentStep==7 || currentStep==10 || currentStep==11 || currentStep==12){
            //Step auteur
            me.handleForm(false);
            return;
        }

        var validateOptions = me.getFormValidation(currentStep);
        //validateOptions.submitHandler = function (form) {
        //
        //    console.log("validation submit handler");
        //    console.log(form);
        //    me.handleForm();
        //};
        if (!Ext.isEmpty(form)) {
            console.log("Validate options");
            console.log(validateOptions);
            var validator=form.validate(validateOptions);
            if(validator.form()){
                me.handleForm(true);
            }
        }
        //form.submit();

    },

    getFormValidation:function(step){
        var validation={};
        switch (step){

            case 1:
                validation={
                    rules: {
                        'article[typeArticle]': {
                            required: true
                        }
                    },
                    messages: {
                        'article[typeArticle]': {
                            required: ""
                        }
                    }
                };
                break;
            default:
                break;
        }
        return validation;
    },
    reset: function () {
        console.log('Reset');
    },
    onFormSubmit: function () {
        console.log("submitting form Manuscrit form");
        var me = this;
    },
    getFieldModel: function (fieldName, entityName, removeLastField) {
        if (Ext.isEmpty(removeLastField)) {
            removeLastField = false;
        }
        fieldName = $.trim(fieldName);
        var entityExp = new RegExp(entityName, 'i');

        fieldName = fieldName.replace(entityExp, "data");
        fieldName = fieldName.replace(/\[\]/g, "");
        fieldName = fieldName.replace(/\[/g, ".");
        fieldName = fieldName.replace(/\]/g, "");
        if (removeLastField) {
            var tab = fieldName.split(".");
            var last = tab.pop();
            if (last === "first") {
                fieldName = tab.join(".");
            }

        }
        return fieldName;
    },
    statics: {
        getStepByCode:function(stepCode){
            for(var i=0;i<JS.article.ManuscritForm.stepList.length;i++){
                var oneStep=JS.article.ManuscritForm.stepList[i];
                if(oneStep.code==stepCode){
                    return oneStep;
                }
            }
            return null;
        },
        stepList: [
            {
                code: 1,
                libelle: "Article Type",
                formUrl: "",
                previous: null,
                next: 2,
                iconClass: "fa fa-file-text",
                itemClass:"current",
                title:"Selection of the article type",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 2,
                libelle: "Title",
                formUrl: "",
                previous: 1,
                next: 3,
                iconClass: "fa fa-align-justify",
                itemClass:"",
                title:"Article title",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 3,
                libelle: "Authors",
                formUrl: "",
                previous: 2,
                next: 4,
                iconClass: "fa fa-user",
                itemClass:"",
                title:"Authors",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 4,
                libelle: "Financial informations",
                formUrl: "",
                previous: 3,
                next: 5,
                iconClass: "fa fa-usd",
                itemClass:"",
                title:"Financial informations",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 5,
                libelle: "Sections / Categories",
                formUrl: "",
                previous: 4,
                next: 6,
                iconClass: "fa fa-puzzle-piece",
                itemClass:"",
                title:"Sections / Categories",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 6,
                libelle: "Abstract",
                formUrl: "",
                previous: 5,
                next: 7,
                iconClass: "fa fa-paragraph",
                itemClass:"",
                title:"Abstract",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 7,
                libelle: "Key words",
                formUrl: "",
                previous: 6,
                next: 8,
                iconClass: "fa fa-italic",
                itemClass:"",
                title:"Key words",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 8,
                libelle: "Additional information",
                formUrl: "",
                previous: 7,
                next: 9,
                iconClass: "fa fa-plus-square",
                itemClass:"",
                title:"Additional information",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 9,
                libelle: "Comments",
                formUrl: "",
                previous: 8,
                next: 10,
                iconClass: "fa fa-comment-o",
                itemClass:"",
                title:"Comments",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 10,
                libelle: "Suggested reviewers",
                formUrl: "",
                previous: 9,
                next: 11,
                iconClass: "fa fa-user",
                itemClass:"",
                title:"Suggested reviewers",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 11,
                libelle: "Opposed reviewers",
                formUrl: "",
                previous: 9,
                next: 10,
                iconClass: "fa fa-user",
                itemClass:"",
                title:"Opposed reviewers",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 12,
                libelle: "Attachments",
                formUrl: "",
                previous: 11,
                next: null,
                iconClass: "fa fa-upload",
                itemClass:"",
                title:"Attachments",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            }
        ]
    }
});
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
                    me.fireEvent('afterfundingloaded', me);
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
/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.article.ReviewRequestForm", {
    //extend: "JS.panel.Form",
    extend: "Xfr.Component",
    config: {
        dynamicTpl: false,

        panelData: {
            formUrl: Routing.generate("get_reviewrequest", {id: "new", _format: 'html'})
        },
        listeners: {
            "loadtpl": {
                fn: "onLoadTpl"
            },
            //"afterrendertpl": {
            //    fn: "afterRenderTpl"
            //},
            "render": {
                fn: "onShow"
            },
            "onCancel": Ext.emptyFn
        },
        form: null,
        eventBound:false,
        action:"new",
        selectedArticles:[],
        title: 'Proposing reviewer',
        subtitle: '',
        parentCmp:null,
        jsApp:null
    },
    onLoadTpl: function () {
        var me = this;
        me.callParent(arguments);

    },
    afterRenderTpl: function () {
        var me = this;
        me.callParent(arguments);

        var id="new";
        var selectedArticles=me.getSelectedArticles();
        if(selectedArticles!=null && selectedArticles.length==1){
            id=selectedArticles[0].id;
        }

        var form = Ext.create("Xfr.Component", {
            //className: "Xfr.panel.Form",
            position: "[data-mode=edit]",
            dynamicTpl: false,
            tplUrl: Routing.generate("get_reviewrequest", {
                id: id,
                _format: 'html'
            }),
            syncTplLoading: false,
            cache:false,
            renderTo: "reviewrequest-form-place",
            listeners: {
                "loadtpl": {
                    scope: me,
                    fn: "onLoadFormTpl"
                },
                "afterrendertpl": {
                    scope: me,
                    fn: "afterFormTplRendered"
                },
                "render": {
                    scope: me,
                    fn: "onShow"
                }
            }
        });

        me.setForm(form);



    },

    onFormLoaded: function () {
        var me = this;
        me.callParent(arguments);

    },
    onShow: function () {
        var me = this;
        me.callParent(arguments);

    },
    initialize: function () {
        var me = this;
        me.callParent(arguments);



    },
    onLoadFormTpl:function(loadedCmp, tplObj){
        console.log('form reviewrequest TPL Loaded');

    },
    afterFormTplRendered:function(){
        console.log('After Form reviewrequest TPL rendered co auteur');

        var me = this,
            form = $("form:first", me.getForm().$this);
        form.submit(function(e){
            e.preventDefault();
            me.save();
        });

        var saveBtn=$("button[data-action-type=save]", form);
        console.log(saveBtn);
        saveBtn.on("click", function(e){
            console.log("Save button clicked");
            e.preventDefault();
            me.save();
        });


        var cancelBtn=$("button[data-action-type=reset]", form);
        console.log(cancelBtn);
        cancelBtn.on("click", function(e){
            console.log("Cancel button clicked");
            e.preventDefault();
            me.fireEvent('onCancel', me);
        });


        var selectedArticles=me.getSelectedArticles();
        var article=null;
        if(selectedArticles!=null && selectedArticles.length==1){
            article=selectedArticles[0];
        }


        $("#review_request_reviewers").select2({
            allowClear: true
        });
        if(article!=null && article.editeur!=null){
            $("#review_request_reviewers").select2({
                allowClear: true
            }).val(article.editeur.id);
        }




    },

    handleForm:function(){
        var me=this;

        var id=-1;

        Xfr.Mask.show("Chargement en cours",null);
        //SAve current step
        console.log("Saving current step");

        var form = $("form:first", me.getForm().$this);
        var formData=null;
        console.log(form);
        if(form && form!=null){
            formData = new FormData(form[0]);
        }

        console.log("Form Data");
        console.log(formData);

        var selectedArticles=me.getSelectedArticles();
        var articleIds='';
        if(selectedArticles!=null && selectedArticles.length>0){
            articleIds=selectedArticles[0].id;
            for(var i=1; i<selectedArticles.length; i++){
                articleIds=articleIds+','+selectedArticles[i].id;
            }
        }

        $.ajax({
            url: Routing.generate('post_reviewrequest', {
                _format: 'json',
                id: id,
                articleIds: articleIds
            }),
            cache: false,
            contentType: false,
            processData: false,
            type: "POST",
            data: formData,
            dataType: "json",
            success: function (response, textStatus, jqXHR) {
                console.log("ajax success");
                console.log(response);
                if(response && response.success){
                    //console.log("Response success");
                    //console.log("auteur enregistré");
                    ////Ajouter l'auteur dans la liste
                    //var parent=me.getParentCmp();
                    //if(id>0){
                    //    parent.editCoauteur(response.data);
                    //}
                    //else{
                    //    parent.addCoauteur(response.data);
                    //}

                    me.fireEvent('onCancel', me);
                }
                else{
                    console.log("Success False");


                }
                //$("li.current").toggleClass('current');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: "+ errorThrown);

            }
        });


    },

    save:function(){
        var me = this,
            form = $("form:first", me.getForm().$this);
        me.action="previous";

        var validateOptions = me.getFormValidation();
        if (!Ext.isEmpty(form)) {
            console.log("Validate options");
            console.log(validateOptions);
            var validator=form.validate(validateOptions);
            if(validator.form()){
                me.handleForm();
            }
        }
        //form.submit();

    },

    getFormValidation:function(){
        var validation={
            rules: {
                'article[typeArticle]': {
                    required: true
                }
            },
            messages: {
                'article[typeArticle]': {
                    required: ""
                }
            }
        };

        return validation;
    },
    reset: function () {
        console.log('Reset');
    },
    onFormSubmit: function () {
        console.log("submitting form Manuscrit form");
        var me = this;
    },
    getFieldModel: function (fieldName, entityName, removeLastField) {
        if (Ext.isEmpty(removeLastField)) {
            removeLastField = false;
        }
        fieldName = $.trim(fieldName);
        var entityExp = new RegExp(entityName, 'i');

        fieldName = fieldName.replace(entityExp, "data");
        fieldName = fieldName.replace(/\[\]/g, "");
        fieldName = fieldName.replace(/\[/g, ".");
        fieldName = fieldName.replace(/\]/g, "");
        if (removeLastField) {
            var tab = fieldName.split(".");
            var last = tab.pop();
            if (last === "first") {
                fieldName = tab.join(".");
            }

        }
        return fieldName;
    }
});
/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.article.View", {
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
        jsApp:null,
        author: false,
        reviewer: false,
        editor:true,
        showToolBar:true
    },
    initialize: function () {
        var me = this;
        console.log("Initialising View class");

        var templateHelpers= {
            isArticleEditable: function(article){
                console.log("IsArticleEditable called");
                console.log(article);
                return article.statut=="SOUMISSION_RETOURNE_A_L_AUTEUR" ||
                    article.statut=="SOUMISSION_INCOMPLETE"||
                    article.statut=="SOUMISSION_EN_ATTENTE_DE_VALIDATION"||
                    article.statut=="REVISION_RENVOYE_A_L_AUTEUR"||
                    article.statut=="REVISION_INCOMPLETE"||
                    article.statut=="REVISION_EN_ATTENTE_DE_VALIDATION";
            }

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
            article: me.getArticle(),
            baseUrl: baseUrl,
            getColor: function(index) {
                // validate hex strisng
                console.log("Generating random color");
                var letters = '012345'.split('');
                var color = '#';
                if(index>5){
                    index=Math.round(Math.random() * 5);
                }
                color += index; //letters[Math.round(Math.random() * 5)];
                letters = '0123456789ABCDEF'.split('');
                for (var i = 0; i < 5; i++) {
                    color += letters[Math.round(Math.random() * 15)];
                }
                return color;
            },
            getFontSize: function(index) {
                // validate hex strisng
                console.log("Generating random font size");

                var fontSize = '%';

                index=Math.round(Math.random() * 60);

                index=index+80;

                fontSize=index+fontSize;

                return fontSize;
            }
        };
        me.setData(data);

        $('.box-body.article-view-box').slimScroll({
            height: '225px'
        });


        console.log("binding events on buttons");

        me.binder.on('assing-editor-view', function (e) {
            console.log("Assign editor button clicked");
            me.showDialogEditor();
        });

        me.binder.on('propose-reviewer-view', function (e) {

            console.log("Propose reviewer button clicked");
            me.showDialogReviewers();
        });

        me.binder.on('sent-back-to-author-view', function (e) {

            console.log("Sent back to author button clicked");
            me.sentBackToAuthor();
        });

        me.binder.on('js-cancel-view', function (e) {

            console.log("Cancel button clicked");
            me.rejectArticle();
        });

        me.binder.on('js-validate-view', function (e) {

            console.log("Cancel button clicked");
            me.acceptArticle();
        });

        me.binder.on('validate-manuscript-view', function (e) {

            console.log("Validate manuscript clicked");
            me.validateManuscript();
            //me.showDialogAdd();
        });

        me.binder.on('show-edit', function(e){
            me.editManuscript();
        });

        me.binder.on('start-revision', function(e){
            me.createRevision();
        });

        console.log("End event binding on button");



    },
    editManuscript: function(){
        var me=this;
        var article=me.getArticle();
        me.getJsApp().showPanel("JS.article.ManuscritForm",{
            title: article.titre_court,
            article: article
        });
    },
    createRevision: function(){
        var me=this;
        var article=me.getArticle();
        var id=-1;

        Xfr.Mask.show("Creating Revision...", null, me.$this);


        if(article!=null){
            id=article.id;
        }
        $.ajax({
            url: Routing.generate('get_article_revision', {
                _format: 'json',
                id: id
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
                Xfr.Mask.hide();
                if(response && response.success){
                    var article=response.data;
                    me.getJsApp().showPanel("JS.article.ManuscritForm",{
                        title: article.titre_court,
                        article: article
                    });
                }
                else{
                    Xfr.Msg.show({
                        message: "An error occured durring revision creation. Please retry in few minutes.",
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
                Xfr.Mask.hide();

            }
        });
    },
    validateManuscript: function(){
        var me=this;
        var article=me.getArticle();
        var id=-1;

        Xfr.Mask.show("Validating...", null, me.$this);


        if(article!=null){
            id=article.id;
        }
        $.ajax({
            url: Routing.generate('put_manuscript_validate', {
                _format: 'json',
                id: id
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

                    Xfr.Msg.show({
                        message: "Your manuscript has been submitted successfully!",
                        title: "Success",
                        icon: Xfr.Msg.INFO.iconClass,
                        btn: [
                            {text: Xfr.Msg.OK.text, type: 'btn'}
                        ],
                        action:function(btn){
                            //me.fireEvent('onCancel', me);
                            me.getJsApp().back();
                            Xfr.Mask.hide();
                        }

                    });
                }
                else{
                    Xfr.Msg.show({
                        message: "An error occured durring submission. Please retry in few minutes.",
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
                Xfr.Mask.hide();

            }
        });
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
                selectedArticles : [me.getArticle()],
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
                selectedArticles : [me.getArticle()],
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

        var selectedArticles=[me.getArticle()];
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

        var selectedArticles=[me.getArticle()];
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

        var selectedArticles=[me.getArticle()];
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
    onShow: function () {
        var me = this;
        Xfr.log("View form rendered or shown");
        me.callParent(arguments);

    },

    statics: {

    }
});