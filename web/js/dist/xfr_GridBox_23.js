////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.GridBox
 * 
 */

Ext.define("Xfr.panel.GridBox", {
    alternateClassName: "Xfr.GridBox",
    requires: [
    ],
    extend: 'Xfr.panel.Window',
    config: {
    },
    statics: {
        instance: null,
        init: function (title, url,action, customClass) {

            if (Ext.isEmpty(this.instance)) {
                this.instance = Ext.create("Xfr.panel.GridBox", {
                    size: "large",
                    title: title,
                    customClass: customClass,
                    renderTo: document.body,
                    items: [
                        {
                            className: "Xfr.panel.WindowGrid",
                            position: '[xfr-grid-box-grid-pos]',
                            action : action,
                            urlPath: url
                        }
                    ]
                });
               
            }

        },
        show: function (title, url,action, customClass) {
            this.instance=null;
            //if (Ext.isEmpty(this.instance)) {
                this.init(title, url,action, customClass);
//            }
//            else{
//                this.setUrl(url);
//            }
            this.instance.show();
        },
        hide: function () {
            if (!Ext.isEmpty(this.instance)) {
                this.instance.hide();
            }
        },
        count: function () {
            if (!Ext.isEmpty(this.instance)) {
                var count = this.instance.getItems()[0].store.totalCount;
                return count;
            }
            else {
                return 0;
            }
        },
        setUrl: function(url){           
            this.instance.getItems()[0].store.config.proxy.url=url;
            this.instance.getItems()[0].store.load();
        }
    }
});

