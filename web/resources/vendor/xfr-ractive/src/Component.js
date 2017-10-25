//@define Component

/**
 * @class Xfr.Component
 * 
 */

Ext.define("Xfr.Component", {
    requires: [
        "Xfr.ComponentManager",
        //"Xfr.Mustache"
        "Xfr.Ractive"
    ],
    extend: 'Ext.Component',
    xtype: 'xfr-component',
    config: {
        tpl: "",
        tplUrl: "",
        attr: {
        },
        control: {
        },
        refs: {
        },
        data: {
        },
        items: {
        },
        events: {
        }
    },
    $id: null,
    constructor: function (config) {
//        this.on({
//            initialize: "onInitialize",
//            scope: this
//        });
        this.callParent(arguments);
        this.controlEvents();
    },
    initialize: function () {
//        alert(("initialize"));
        var me = this;
        this.callParent(arguments);

        me.$this = $("#" + this.getId());

        this.initTpl();

        //init component items 
        var items = this.getItems();
        if (!Ext.isEmpty(this.getItems())) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (!Ext.isEmpty(item)) {
                    item.renderTo = $("#" + this.getId() + " " + item.position)[0];
                    var className = item.className;
                    delete item.className;

                    var instance = Ext.create($.trim(className), item);
                    if (!Ext.isEmpty(item.instanceName)) {
                        me[item.instanceName] = instance;
                    }
                }
            }
        }

        //init components jquery events
        var events = this.getEvents();
        for (var event in events) {
            var eventCallBack = events[event];
            if (!Ext.isEmpty(eventCallBack)) {
                me.$this.on(event, eventCallBack);
//                 me.$this.on(event, function(evt){
//                    eventCallBack(evt, me);
//                });
            }
        }

        //trigger initialize event
        me.$this.trigger('initialized', me);
    },
    getElementConfig: function () {
        var me = this;
        var attrObj = {};
        if (!Ext.isEmpty(me.initialConfig.attr)) {
            Ext.apply(attrObj, me.initialConfig.attr);
        }
        return Ext.apply({
            reference: 'element',
            classList: ['xfr-cmp']
        }, attrObj);
    },
    initElement: function () {
        this.callParent(arguments);
        this.renderElement.setHtml("");
    },
//    updateHtml: function (data) {
//        console.log("-----------------updateTpl------------------");
//        var me = this;
//
//        if (!Ext.isEmpty(appConfig)) {
//            data.appConfig = appConfig;
//        }
//
//        var rendered = Mustache.renderTokens(this.tplTokens, data);
////        this.update(rendered);
//        this.renderElement.setHtml(rendered);
//        console.log("-----------------updateTpl------------------");
//    },
    updateData: function () {

    },
    initTpl: function () {
//        var tpl = this.config.tpl;
        var tpl = this.getTpl().html;

//        console.log("----start-------tpl------------------");
//        console.log(tpl);

//        var data = this.config;
        var data = {};
        try{
            if (!Ext.isEmpty(appConfig)) {
                data.appConfig = appConfig;
            }
        }catch(exc){            
        }

        //If no custom component template was provived
        if (Ext.isEmpty(tpl)) {
            if (!Xfr.ComponentMgr.cmpInClassMap(this)) {
                var tplId = this.getTplId(), loadedTpl = $("script#" + tplId).html();
                if (!Ext.isEmpty(tplId) && !Ext.isEmpty(loadedTpl)) {
                    //check template from script with component id
                    tpl = loadedTpl;
                } else {
                    //Check remote loaded TPL"
                    tpl = this.loadTpl();
                }
            } else {
                //get cached TPL
                tpl = Xfr.ComponentMgr.getTpl(this);
            }
        }

        this.setTpl(tpl);
        this.tpl = tpl;
        if (!Ext.isEmpty(tpl)) {
//            console.log("-----------tpl------------------");
//            console.log(tpl);
            data = Ext.merge(data, this.getInitialConfig());

            //console.log("data------" + this.getId());
            //console.log(data);

            this.ractive = new Ractive({
                el: '#' + this.getId(),
                template: tpl,
                data: data
            });
            Xfr.ComponentManager.register(this);

        }
        return true;
    },
    getTplPath: function () {
        var me = this;

        var cmpPath = Ext.Loader.getPath(this.self.getName());
        var pathArray = cmpPath.split("/");
        var cmpFile = pathArray.pop();
        cmpFile = cmpFile.substr(0, cmpFile.length - 2);
        cmpFile = cmpFile.toLowerCase() + "tpl";
        pathArray.push("tpl");
        pathArray.push(cmpFile);
        return pathArray.join("/");
    },
    getTplId: function () {
        var pathArray = this.self.getName().toLowerCase().split(".");
        var result = pathArray.join("-");
        return result;
    },
    loadTpl: function () {
        var tpl = null;
        var me = this;
        var tplPath = me.getTplPath();
        $.ajax({
            url: tplPath,
            dataType: "html",
            async: false,
            success: function (template) {
                tpl = template;
            },
            error: function (data) {
//                console.log(data);
                return null;
                throw new Error("The template loading failed");
            }
        });
        return tpl;
    },
    controlEvents: function () {
        var me = this;
        var control = this.getControl();
        var refs = this.getRefs();

        if (!Ext.isEmpty(control)) {
            for (var controlLbl in control) {

                var controlObj = control[controlLbl];
                if (!Ext.isEmpty(controlObj)) {
                    for (var item in controlObj) {
                        var itemVal = controlObj[item];
                        if (!Ext.isEmpty(itemVal)) {
                            if (!Ext.isEmpty(refs) && !Ext.isEmpty(refs[controlLbl])) {
                                $("#" + me.getId() + " " + refs[controlLbl]).bind(item, function () {
                                    me[itemVal](this);
                                });
                            } else {
                                var arg = {};
                                $("#" + me.getId() + " " + controlLbl).bind(item, function () {
                                    me[itemVal](this);
                                });
                            }
                        }
                    }
                }

            }
        }
    }
});


 //# sourceURL=/uni2grow/prod/CAPV_PLATFORM/web/resources/vendor/xfr/src/Component.js