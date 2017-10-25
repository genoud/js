//@tag foundation,core
//@define Xfr

/**
 * @class Xfr
 * @singleton
 */
(function() {

    var global = this;
    if (typeof Xfr === 'undefined') {
        global.Xfr = {};
    }

    //Xfr = Ext;

    Xfr.env="dev";

    Xfr.log=function(message, caller){
        if(Xfr.env=="dev"){
            console.log(caller);
            console.log(message);
        }
    };

    Xfr.loadTranslations=function(locale){
        if(undefined===locale){
            locale="en";
        }
        var translationsPath=Ext.Loader.getPath("Xfr");
        console.log("PAth: "+translationsPath);
        translationsPath=translationsPath+"/translations/message_"+locale+".json";
        console.log("PAth: "+translationsPath);
        $.ajax({
            url: translationsPath,
            dataType: "json",
            async: false,
            success: function (translations) {
                console.log(translations);
                Xfr.translations=translations;
            },
            error: function (data) {
                throw new Error("Unable to load translations");
            }
        });
    };

    Xfr.trans=function(key, params){
        var rawMessage=Xfr.translations[key];
        if(typeof params==='undefined'){
            return rawMessage;
        }
        else{
            Ext.Array.each(params, function(param, index, countriesItSelf) {
                console.log(param);
                rawMessage=rawMessage.replace("%"+param.name+"%",param.value);
            });
            return rawMessage;
        }
    };

    Xfr.isXfrInstance = function(obj) {
        var val = false;
        Ext.isEmpty(Ext.getClassName(obj)) ? val = false : val = true;
        return val;
    };

    Xfr.getInstance = function(obj, aliasGroup) {
        var me = this,
            result = null,
            tempName = null;

        if(Xfr.isXfrInstance(obj))    {
            return obj;
        }

        if (!Ext.isEmpty(obj.className)) {
            tempName = obj.className;
            delete obj.className;
            result = Ext.create(tempName, obj);
        } else if (!Ext.isEmpty(obj.xclass)) {
            tempName = obj.xclass;
            delete obj.xclass;
            result = Ext.create(tempName, obj);
        } else if (!Ext.isEmpty(obj.xtype)) {
            tempName = obj.xtype;
            delete obj.xtype;
            if (Ext.isEmpty(aliasGroup)) {
                aliasGroup = "widget";
            }
            //result = Ext.widget(tempName, obj);
            result = Ext.createByAlias(aliasGroup + "." + tempName, obj);
        }
        return result;
    };

    Xfr.createWidget = function(obj) {
        return Xfr.getInstance(obj, "widget");
        /*
        var me = this
            result = null,
            tempName = null;
        if (!Ext.isEmpty(obj.className)) {
            tempName = obj.className;
            delete obj.className;
            result = Ext.create(tempName, obj);
        } else if (!Ext.isEmpty(obj.xclass)) {
            tempName = obj.xclass;
            delete obj.xclass;
            result = Ext.create(tempName, obj);
        } else if (!Ext.isEmpty(obj.xtype)) {
            tempName = obj.xtype;
            delete obj.xtype;
            result = Ext.widget(tempName, obj);
        }
        return result;
        */
    };

})();
