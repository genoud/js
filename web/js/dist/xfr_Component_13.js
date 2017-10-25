//@define Component
/**
 * @class Xfr.Component
 *
 */
Ext.define("Xfr.Component", {
    requires: [
        //"Xfr.ComponentManager",
        ////"Xfr.Mustache"
        //"Xfr.Ractive",
        //"Xfr.Slimscroll",
        //"Xfr.Loadmask",
        //"Xfr.Utils"
    ],
    requiresTpl: [],
    extend: 'Ext.Component',
    xtype: 'xcomponent',
    config: {
        title:"",
        subtitle:"",
        cls: "xfr-cmp",
        fullscreen: false,
        pageLevelPositionning: false,
        parent: null,
        children: [],
        slimscroll: null,
        /*********************************************************************************************************************/
        /**
         *If "cmpTpl" is not empty, the template of the component will be the content of "cmpTpl".
         *If "cmpTpl" is empty  there are many case:
         *  1- "dynamicTpl" is set to false : in this case the template will be loaded remotely from "tplUrl"
         *  2- "dynamicTpl" is set to true : in this case it will follow the dynamic template loading process.
         *   The dynamic template loading process consist of :
         *   first finding the template in a local script which has a special id which is generated based on the component package.
         *   Example if the component package is "Test.pck1.MyComponent" the id of the script will be "test-pck1-mycomponent".
         *   If that specific script doesn't exist, the template will be loaded remotely from a generated url also based on the
         *   Example if the component package is "Test.pck1.MyComponent" the url will be "/locationOfTest.pck1/tpl/testpck1mycomponent.tpl".

         *   When generating the special script id or the remote file url,
         *   if "dynamicTplSrc" is set to "component", the package used for the generation will be a component  package :
         *      by default it is the current component package, but if "dynamicTplClass" is set to a specific component full className
         *      the package used for generation will be the package of that specific component;
         *   if "dynamicTplSrc" is set to "parent" the package used will be the current parent component package.
         *   if "dynamicTplSrc" is set to "custom" the package used will be the current component package; but the
         *   generated script id and generated  remote file url  will have a suffix which is "_" and the the value of "dynamicTplName"
         **/
        cmpTpl: null,
        tplUrl: null,
        dynamicTpl: true,
        /*
         * values : "component", "parent" , "custom"
         */
        dynamicTplSrc: "component",
        /*
         * description : a simple string with no space
         */
        dynamicTplName: "custom",
        dynamicTplClass: null,
        /**
         * When set to true, the loading of the template is launch in synchronic mode
         * otherwise it is launch in asynchronic mode
         * @type {Boolean}
         */
        syncTplLoading: true,
        /**
         * Mask the component on the loading of the items templates
         */
        maskOnItemsLoading: false,
        /******************************************************************************************************************************/
        attr: {},
        control: {},
        refs: {},
        data: {},
        items: null,
        events: {},
        listeners: {
            /**
             * fire after the rendering of the component tpl
             */
            "afterrendertpl": Ext.emptyFn
        },
        parentName: "",
        parentPane: null,
        parentTitle: "",
        cache:true
    },
    $id: null,
    isMasked: false,
    constructor: function (config) {
        console.log("component constructor");
        var me = this;

        if (!Ext.isEmpty(me.requiresTpl)) {
            for (var i = 0; i < me.requiresTpl.length; i++) {
                var tplClass = me.requiresTpl[i],
                    tplClassId = Xfr.Utils.getCmpClassId(tplClass);

                if ($("script#" + tplClassId).length === 0) {
                    var tplPath = me.getCmpTplPath(tplClass);
                    $.ajax({
                        url: tplPath,
                        dataType: "html",
                        async: false,
                        success: function (template) {
                            $('<script id="' + tplClassId + '" type="text/xfr-tpl">' + template + '</script>').appendTo($("body"));
                        },
                        error: function (data) {
                            throw new Error(tplClass + " " + Xfr.trans("tplLoadingFail", []));
                        }
                    });
                }
            }
            this.callParent(arguments);
        } else {
            this.callParent(arguments);
        }

    },
    initialize: function () {
        var me = this;
        this.callParent(arguments);

        //me.setUtils({});

        me.$this = $("#" + this.getId());

        //check fullscreen initialisation
        if (this.getFullscreen()) {
            var windowHeight = $(window).height();
            // console.log("windowsHeight = " + windowHeight);
            // console.log("windowsHeight2 = " + $(window).innerHeight());
            // console.log("windowsHeight3 = " + $(window).outerHeight());
            // console.log("windowsHeight3 = " + $(document).height());
            me.$this.height(windowHeight);

            me.$this.width($(window).width());
        }

        //init tpl
        this.initTpl();


        console.log("Tpl initialize");
        //init component items 
        var items = this.getItems();

        me.initItems(items);


        // //init components jquery events
        // var events = this.getEvents();
        // for (var event in events) {
        //     var eventCallBack = events[event];
        //     if (!Ext.isEmpty(eventCallBack)) {
        //         me.$this.on(event, eventCallBack);
        //         //                 me.$this.on(event, function(evt){
        //         //                    eventCallBack(evt, me);
        //         //                });
        //     }
        // }

        //init plugins
        me.initPlugins();




        me.on({
            "show": {
                scope: me,
                fn: "onShow"
            }
        });


    },

    beforeBackStep: function () {

    },
    onLoadTpl: function (tpl) {
    },
    afterRenderTpl: function (me) {
        var me = this;

        // console.log("afterRenderTpl from original component");
        me.initAllSize();

        var slimscroll = this.getSlimscroll();

        if (!Ext.isEmpty(slimscroll)) {
            console.log('slimscroll set '+ me.getId());
            if (slimscroll === true) {
                console.log('slimscroll is true '+ me.getId());
                me.$this.slimscroll();
            } else if (Ext.isObject(slimscroll)) {
                console.log('slimscroll is object '+ me.getId());
                me.$this.slimscroll(slimscroll);
            }
        }
        $(".slimscroll", me.$this).slimscroll();

        $(window).resize(function () {

            // console.log("on window resize----------");
            me.initAllSize();
            if (!Ext.isEmpty(me.getChildren())) {
                for (var i = 0; i < me.getChildren().length; i++) {
                    var child = me.getChildren()[i];
                    child.initAllSize();
                }
            }
        });

        //Gestion du clique sur le lien précédent


        if (!Ext.isEmpty(me.config.parentPane)){

            $("a[data-action-type=back]", me.$this).on('click', function () {

                console.log("affichage parent");
                console.log(me.$this);

                me.beforeBackStep();
                me.fireEvent('beforeBackStep', me);
                me.destroy();

                me.config.parentPane.show();

            });
        }
    },
    onShow: function (me) {
        //console.log("after show component");
        var me = this;

        $("a[data-action-type=back]", me.$this).on('click', function () {
            me.beforeBackStep();
            me.fireEvent('beforeBackStep', me);
            //console.log("destroying me on back");
            me.destroy();
            if (me.config.parentPane != null) {
                me.config.parentPane.show();
            }
        });
        //me.initAllSize();
    },
    initAllSize: function () {
        var me = this;
        //check fullscreen initialisation
        if (this.getFullscreen()) {
            me.$this.height($(window).height());
            me.$this.width($(window).width());
        }
        this.initVboxAvailable();
    },
    initVboxAvailable: function () {
        // console.log("----------------------initVboxAvailable");
        var me = this;



        var cmpHeight = me.$this.height();

        // console.log("classname= " + Ext.getClassName(me));
        // console.log("cmpHeight = " + cmpHeight);
        // console.log("children length = " + me.$this.children("*").length);
        // console.log(me.$this.children());

        var availableHeight = cmpHeight - 20;
        me.$this.children("*>:not(.vbox-available-height)").each(function (index, child) {
            // console.log("--child-----------");
            // console.log(child);
            var childElt = $(child);
            var childHeight = childElt.outerHeight();
            // console.log("------------childHeight = " + childHeight);
            if (!childElt.hasClass('vbox-available-height')) {
                availableHeight -= childHeight;
            }
        });
        //me.$this.children(".vbox-available-height:first").height(availableHeight + "px").css;
        // console.log("vbox availableHeight");
        // console.log(me.$this.children(".vbox-available-height:first").length);
        // console.log(me.$this.children(".vbox-available-height:first"));

        var child = me.$this.children(".vbox-available-height:first");

        if (child.length > 0) {
            var takeOffTitle=child.attr("data-takeoff-title");
            if( $.isNumeric(takeOffTitle) && takeOffTitle>0 ){
                availableHeight=availableHeight-takeOffTitle;
            }
            child.css("height", availableHeight + "px").attr("data-available-height", availableHeight);
            var recursive=child.attr("data-vbox-recursive");
            if(recursive=="data-vbox-recursive"){
                console.log("Appliquer la recursivité");
                Xfr.Utils.initVboxAvailable(child);
            }

        }

    },
    initElement: function () {
        this.callParent(arguments);
        this.renderElement.setHtml("");
    },
    //updateData: function() {},
    initTpl: function () {
        var me = this;
        var tpl = this.getCmpTpl();


        //If no custom component template was provived
        if (Ext.isEmpty(tpl)) {
            // if (!Xfr.ComponentMgr.cmpInClassMap(this)) {
            //if the component template is not in the cache

            if (me.getDynamicTpl()) {
                //apply dynamic template loading proccess
                var tplId = this.getTplId(),
                    loadedTpl = $("script#" + tplId).html();
                if (!Ext.isEmpty(tplId) && !Ext.isEmpty(loadedTpl)) {
                    //check template from script with component id
                    tpl = loadedTpl;
                } else {
                    //Check remote loaded TPL"
                    tpl = this.loadTpl();
                }
            } else {
                var tplUrl = me.getTplUrl();
                tpl = this.loadTpl(tplUrl);
            }

            // } else {
            //     //if the component template is in the cache
            //     //get cached TPL
            //     tpl = Xfr.ComponentMgr.getTpl(this);
            // }
        }

        if (me.getSyncTplLoading()) {
            me.setCmpTpl(tpl);
            me.initTplBinder();
            if (Ext.isEmpty(me.getItems())) {
                if (me.getMaskOnItemsLoading()) {
                    me.unmask();
                }

                me.afterRenderTpl(me);
                me.fireEvent('afterrendertpl', me);
            }
        }
        return true;
    },
    getBindObject: function () {
        var bindObj = {},
            me = this;

        bindObj = Ext.merge(bindObj, this.getInitialConfig());
        //bindObj = Ext.merge(bindObj, this.getConfig());
        try {
            //if (!Ext.isEmpty(appConfig)) {
            //    bindObj.appConfig = appConfig;
            //}
            bindObj.Utils = Xfr.Utils;
            bindObj.Ext = Ext;

            //console.log("Utilis in dinding");
            //console.log(bindObj.Utils);
        } catch (exc) {

            console.log("Exeption");
            console.log(exc);
        }
        return bindObj;
    },
    initTplBinder: function () {

        var me = this,
            bindObj = {},
            tpl = this.getCmpTpl(),
            tplObj = {
                html: tpl
            };

        if (!Ext.isEmpty(tpl)) {
            bindObj = me.getBindObject();

            me.beforeBindData(tplObj, bindObj);

            this.binder = new Ractive({
                el: '#' + this.getId(),
                template: tplObj.html,
                data: bindObj
            });

            ///this.binder.set('personne', {nom:'Magloire'})

            Xfr.ComponentManager.register(this);

        }
        else {
            console.log('Template is empty' + this.getId());
        }
    },
    resetBinder: function () {
        var bindObj = {},
            me = this;

        bindObj = me.getBindObject();
        bindObj.data = null;

        if (!Ext.isEmpty(me.binder)) {
            me.binder.reset(bindObj);
            if (!Ext.isEmpty(me.getChildren())) {
                for (var i = 0; i < me.getChildren().length; i++) {
                    var child = me.getChildren()[i];
                    child.resetBinder();
                }
            }
        }
    },
    beforeBindData: function (tplObj, bindObj) {
    },
    updateData: function (newData) {

        var me = this;
        if (!Ext.isEmpty(me.binder)) {
            //console.log("setting data on ractive");
            //console.log(newData);
            me.binder.set("data", newData);
            if (!Ext.isEmpty(me.getChildren())) {
                for (var i = 0; i < me.getChildren().length; i++) {
                    var child = me.getChildren()[i];
                    child.setData(newData);
                }
            }
        }
    },
    getData: function (fromView) {
        var me = this;
        if (Ext.isEmpty(fromView)) {
            fromView = true;
        }

        if (!Ext.isEmpty(me.binder) && fromView) {

            var result = me.binder.get("data");
            if (!Ext.isEmpty(me.getChildren())) {
                for (var i = 0; i < me.getChildren().length; i++) {
                    var child = me.getChildren()[i];
                    var childData = child.binder.get("data");
                    if (!Ext.isEmpty(childData)) {
                        Ext.merge(result, childData);
                    }
                }
            }

            return result;
        } else {
            return me.callParent(arguments);
        }
    },
    getCmpTplPath: function (cmpClassName) {
        var me = this,
            cmpPath, pathArray, cmpFile;


        var className = cmpClassName;
        cmpPath = Ext.Loader.getPath(className);


        pathArray = cmpPath.split("/");
        cmpFile = pathArray.pop();


        cmpFile = cmpFile.substr(0, cmpFile.length - 2);
        cmpFile = cmpFile.toLowerCase() + "tpl";


        pathArray.push("tpl");
        pathArray.push(cmpFile);
        return pathArray.join("/");
    },
    getTplPath: function () {
        var me = this,
            cmpPath, pathArray, cmpFile;

        if (me.getDynamicTplSrc() === "component" || me.getDynamicTplSrc() === "custom") {
            console.log("Test Magloire tpl src is custom or component");
            var className = me.getDynamicTplClass();
            console.log("Tpl class name "+className);
            if (Ext.isEmpty(className)) {
                className = me.self.getName();
            }
            cmpPath = Ext.Loader.getPath(className);
        } else if (me.getDynamicTplSrc() === "parent") {
            cmpPath = Ext.Loader.getPath(Ext.getClass(me).superclass.self.getName());
        }

        pathArray = cmpPath.split("/");
        cmpFile = pathArray.pop();
        if (me.getDynamicTplSrc() === "custom") {
            cmpFile = cmpFile.substr(0, cmpFile.length - 3);
            cmpFile = cmpFile.toLowerCase() + "_" + me.getDynamicTplName() + ".tpl";
        } else {
            cmpFile = cmpFile.substr(0, cmpFile.length - 2);
            cmpFile = cmpFile.toLowerCase() + "tpl";
        }

        pathArray.push("tpl");
        pathArray.push(cmpFile);
        return pathArray.join("/");
    },
    getTplId: function () {
        var me = this,
            pathArray;

        if (me.getDynamicTplSrc() === "component") {
            pathArray = me.self.getName().toLowerCase().split(".");
        } else if (me.getDynamicTplSrc() === "parent") {
            pathArray = Ext.getClass(me).superclass.self.getName().toLowerCase().split(".");
        } else if (me.getDynamicTplSrc() === "custom") {
            pathArray = (me.self.getName() + "_" + me.getDynamicTplName()).toLowerCase().split(".");
        }

        return pathArray.join("-");
    },
    loadTpl: function (tplPath) {
        var tpl = "",
            me = this;

        if (Ext.isEmpty(tplPath)) {
            tplPath = me.getTplPath();
        }

        if (!Ext.isEmpty(Xfr.Component.loadedTpls[tplPath]) && me.getCache()) {
            console.log("TPL "+tplPath+" Loaded from cache "+me.getCache() );
            var template = Xfr.Component.loadedTpls[tplPath];
            tpl = me.loadTplSuccess(template);
        } else {
            console.log("TPL "+tplPath+" ReLoaded from server "+me.getCache() );
            $.ajax({
                url: tplPath,
                dataType: "html",
                async: !me.getSyncTplLoading(),
                success: function (template) {
                    //if(!me.getDynamicTpl()){
                        Xfr.Component.loadedTpls[tplPath] = template;
                    //}
                    me.loadTplSuccess(template);
                    tpl = template;
                    return tpl;
                },
                error: function (data) {
                    return null;
                    throw new Error("The template loading failed");
                }
            });
        }

        return tpl;
    },
    loadTplSuccess: function (template) {
        var tplObj = {
                html: ""
            },
            me = this;


        tplObj.html = template;

        //me.onLoadTpl(tplObj);
        me.fireEvent('loadtpl', me, tplObj);


        if (!me.getSyncTplLoading()) {

            me.setCmpTpl(tplObj.html);
            me.initTplBinder();

            if (Ext.isEmpty(me.getItems())) {
                if (me.getMaskOnItemsLoading()) {
                    me.unmask();
                }

                me.afterRenderTpl(me);
                me.fireEvent('afterrendertpl', me);
            }

        }
        return tplObj.html;
    },
    mask: function (label, opt) {
        var me = this;

        if (Ext.isEmpty(opt)) {
            opt = {};
        }
        if (Ext.isEmpty(label) || label == undefined) {
            label = Xfr.translations.loading; //appConfig.translations.loading;
        }

        // console.log("label==============" + label);
        /*if (Ext.isEmpty(opt.size)) {
         opt.size = 64;
         }*/
        if (Ext.isEmpty(opt.backgroundColor)) {
            opt.backgroundColor = "black";
        }

        me.isMasked = true;
        me.$this.mask(label, opt);
    },
    unmask: function () {
        var me = this;
        me.$this.unmask();
        me.isMasked = false;
    },
    applyPlugins: function (config) {
        //console.log("applyPlugins");
        return config;
    },
    initItems: function (items, controlListener) {
        var me = this;

        if (Ext.isEmpty(controlListener)) {
            controlListener = true;
        }

        me.childrenRef = {};
        if (!Ext.isEmpty(items)) {
            me.itemsRendered = 0;
            me.setChildren([]);

            if (me.getMaskOnItemsLoading()) {
                me.mask();
            }

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (!Ext.isEmpty(item)) {
                    if (me.getPageLevelPositionning()) {
                        item.renderTo = $(item.position)[0];
                    }
                    else {
                        item.renderTo = $("#" + this.getId() + " " + item.position)[0];
                    }

                    //item.renderTo = $("#"+ item.position)[0];
                    item.parent = me;

                    if (controlListener) {
                        if (Ext.isEmpty(item.listeners)) {
                            item.listeners = {};
                        }
                        item.listeners["afterrendertpl"] = function () {
                            me.itemsRendered++;
                            if (me.itemsRendered === me.getItems().length) {

                                me.afterRenderTpl(me);
                                me.fireEvent('afterrendertpl', me);

                                if (me.getMaskOnItemsLoading()) {
                                    me.unmask();
                                }
                            }
                        };
                    }

                    var instance = Xfr.createWidget(item);
                    me.getChildren().push(instance);


                    if (!Ext.isEmpty(item.ref)) {
                        me.childrenRef[item.ref] = instance;
                    }
                }
            }

            if (me.getMaskOnItemsLoading()) {
                me.unmask();
            }
        }
    },
    initPlugins: function () {
        var me = this;
        var config = me.getPlugins();

        var ln, i, configObj;

        if (!config) {
            return config;
        }

        config = [].concat(config);

        for (i = 0, ln = config.length; i < ln; i++) {

            configObj = config[i];
            if (Ext.isString(configObj)) {
                configObj = {
                    xtype: configObj
                };
            }

            //<deprecated product=touch since=2.0>
            if (Ext.isObject(configObj) && configObj.ptype) {
                //<debug warn>
                Ext.Logger.deprecate('Using a ptype is now deprecated, please use type instead', 1);
                //</debug>
                configObj.type = configObj.ptype;
            }
            //</deprecated>

            var renderTo = null;
            if (!Ext.isEmpty(configObj.position)) {
                renderTo = $(configObj.position, me.$this)[0];
            } else {
                renderTo = me.$this[0];
            }
            configObj.renderTo = renderTo;

            var onAfterRenderEvent = function () {
                this.init(me);
            };
            if (Ext.isEmpty(configObj.listeners)) {
                configObj.listeners = {
                    afterrendertpl: onAfterRenderEvent
                };
            } else {
                configObj.listeners["afterrendertpl"] = onAfterRenderEvent;
            }

            //if(configObj.className=="Xfr.plugin.Summary"){
            //    console.log(configObj);
            //}

            if (!Ext.isEmpty(configObj.className)) {
                config[i] = Ext.create(configObj.className, configObj);
            } else if (!Ext.isEmpty(configObj.xclass)) {
                config[i] = Ext.create(configObj.xclass, configObj);
            } else if (!Ext.isEmpty(configObj.xtype)) {
                config[i] = Ext.createByAlias("plugin." + configObj.xtype, configObj);
            }
            /*    config[i].on({
             afterrender: function() {
             alert("afterrender");
             this.init(me);
             }
             });*/
            //config[i] = Ext.factory(configObj, 'Ext.plugin.Plugin', null, 'plugin');
        }

        me.setPlugins(config);

        return config;
    },
    updatePlugins: function (newPlugins, oldPlugins) {
        //console.log("update plugins");
        /* var ln, i;

         if (newPlugins) {
         for (i = 0, ln = newPlugins.length; i < ln; i++) {
         newPlugins[i].init(this);
         }
         }

         if (oldPlugins) {
         for (i = 0, ln = oldPlugins.length; i < ln; i++) {
         Ext.destroy(oldPlugins[i]);
         }
         }*/
    },
    destroy: function () {
        me = this;

        // console.log("on Destroy ---------" + Ext.getClassName(me));

        if (!Ext.isEmpty(me.getChildren())) {
            for (var i = 0; i < me.getChildren().length; i++) {
                var child = me.getChildren()[i];
                child.destroy();
            }
            ;
            ;

        }
        if (!Ext.isEmpty(me.getPlugins())) {
            for (var i = 0; i < me.getChildren().length; i++) {
                var child = me.getPlugins()[i];
                child.destroy();
            }
            ;
            ;

        }
        this.callParent(arguments);
    },
    remove: function () {

    },
    // controlEvents: function() {
    //     var me = this;
    //     var control = this.getControl();
    //     var refs = this.getRefs();

    //     if (!Ext.isEmpty(control)) {
    //         for (var controlLbl in control) {

    //             var controlObj = control[controlLbl];
    //             if (!Ext.isEmpty(controlObj)) {
    //                 for (var item in controlObj) {
    //                     var itemVal = controlObj[item];
    //                     if (!Ext.isEmpty(itemVal)) {
    //                         if (!Ext.isEmpty(refs) && !Ext.isEmpty(refs[controlLbl])) {
    //                             $("#" + me.getId() + " " + refs[controlLbl]).bind(item, function() {
    //                                 me[itemVal](this);
    //                             });
    //                         } else {
    //                             var arg = {};
    //                             $("#" + me.getId() + " " + controlLbl).bind(item, function() {
    //                                 me[itemVal](this);
    //                             });
    //                         }
    //                     }
    //                 }
    //             }

    //         }
    //     }
    // },
    statics: {
        loadedTpls: {}
    }

});
