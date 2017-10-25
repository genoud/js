/**
 * @class Xfr.Utils
 * Description
 */
Ext.define('Xfr.Utils', {
    singleton: true,
    instance: function () {
        return this;
    },
    testMethod: function (val) {
        return val + " juste pou voir";
    },
    getCmpClassId: function (cmpClassName) {
        return (new String(cmpClassName)).toLowerCase().split(".").join("-");
    },
    getCmpTplFromScript: function (cmpClassName) {
        var scriptId = this.getCmpClassId(cmpClassName);
        return $("#" + scriptId).html();
    },
    getObjectByKeypath: function (obj, path) {
        try {
            return eval("obj." + path);
        } catch (e) {
            return undefined;
        }
    },
    arrayContains: function (array, obj, compareAllFields) {

        if (Ext.isEmpty(compareAllFields) || compareAllFields) {
            return Ext.Array.contains(array, obj);
        } else {
            for (var i = 0; i < array.length; i++) {
                var item = array[i],
                        founded = true;

                for (var key in obj) {
                    var val = obj[key];
                    if (Ext.isEmpty(item[key]) || item[key] != val) {
                        founded = false;
                        break;
                    }
                }
                if (founded) {
                    return true;
                }
            }
            return false;
        }
    },
    filterCollection: function (collection, searchValue) {
        var record = collection.first();
        return Xfr.Utils.filterCollectionByRecord(collection, searchValue, record);
    },
    filterCollectionByRecord: function (collection, searchValue, record) {
        var result = [],
                tempArray = null;
        if (!Ext.isEmpty(record) && Ext.isObject(record) && !Ext.isEmpty(collection)) {
            for (var fieldName in record) {
                if (Ext.isObject(record[fieldName])) {
                    tempArray = Xfr.Utils.filterCollection(collection, record[fieldName], searchValue);
                } else {
                    tempArray = Xfr.Utils.filterCollectionByFieldName(collection, fieldName, searchValue);
                }
                result = Ext.Array.merge(result, tempArray);
            }
        }
        return result;
    },
    filterCollectionByFieldName: function (collection, fieldName, searchValue) {
        var filter = new Ext.util.Filter({
            anyMatch: true,
            property: fieldName,
            value: searchValue
        }),
                data = collection.filter(filter);

        return data.items;
    },
    getUrlParam: function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results === null) {
            return null;
        } else {
            return results[1] || 0;
        }

    },
    getDateStr: function (strDate) {
        var now = new Date();
        if (strDate) {
            var day = strDate.substring(0, 2);
            var month = strDate.substring(3, 5);
            var year = strDate.substring(6, 10);
            now.setDate(day);
            now.setMonth(month);
            now.setFullYear(year);
        }

        var annee = now.getFullYear();
        var mois = now.getMonth() + 1;
        if (mois < 10) {
            mois = "0" + String(mois);
        }
        var jour = now.getDate();
        if (jour < 10) {
            jour = "0" + String(jour);
        }
        var date = annee + "-" + mois + "-" + jour;
        return date;
    },
    shortenString: function (str, size) {
        var strObj = new String(str);
        return strObj.substr(0, size);
    },
    formatNumber: function (num) {

        if (Ext.isEmpty(num)) {
            return "0";
        }
        // console.log("valeur a formater");
        // console.log(num);
        var prefix = "";
        if (num < 0) {
            prefix = "-";
        }
        var indexDecimal = String(num).indexOf(".");
        tabnum = String(num).split('').reverse().join('').match(/\d{1,3}/g);
        if (indexDecimal > 0) {
            var test = false;
            var cum = 0;
            var i = tabnum.length;
            i--;
            while (!test) {
                cum = cum + tabnum[i].length;
                if (cum >= indexDecimal) {
                    test = true;
                    i--;
                    tabnum[i] = tabnum[i] + ",";
                }
                i--;
            }
        }
        if (Ext.isEmpty(tabnum)) {
            return "0";
        }
        tabnum = tabnum.join(' ').split('').reverse().join('');
        tabnum = tabnum.replace(" ,", ",");
        return prefix + tabnum;
    },
    dropMsg: function (msg) {
        if (msg.length >= 25) {
            return msg.substring(0, 25) + "...";
        }
        return msg;

    },
    initVboxAvailable: function (cmp) {
        // console.log("----------------------initVboxAvailable");
        var me = this;

console.log("vbox available height in utilis");
        var cmpHeight = cmp.height();

        // console.log("classname= " + Ext.getClassName(me));
        // console.log("cmpHeight = " + cmpHeight);
        // console.log("children length = " + me.$this.children("*").length);
        // console.log(me.$this.children());

        var availableHeight = cmpHeight-0;
        cmp.children("*>:not(.vbox-available-height)").each(function (index, child) {
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
        var child=cmp.children(".vbox-available-height:first");

        if(child.length>0){
            var takeOffTitle=child.attr("data-takeoff-title");
            if( $.isNumeric(takeOffTitle) && takeOffTitle>0 ){
                availableHeight=availableHeight-takeOffTitle;
            }
            child.css("height", availableHeight + "px").attr("data-available-height", availableHeight);
            me.initVboxAvailable(child);
        }



    }
});
