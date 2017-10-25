////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.RemoteWindow
 * 
 */
Ext.define("Xfr.panel.RemoteWindow", {
    alternateClassName: "Xfr.RemoteWindow",
    requires: [
    ],
    extend: 'Xfr.panel.Window',
    config: {
        title: "",
        remoteUrl: ""
    },
    initialize: function () {
        this.callParent(arguments);        
        
        var loadingPanel = $(".xfr-mask-loading", this.$this);
        $("iframe", this.$this).on("load", function () {
            loadingPanel.hide();
            $(this).show();
        });
    },
    statics: {
        instance: null,
        init: function (title, remoteUrl, size) {
            if (!Ext.isEmpty(this.instance)) {
                this.instance.destroy();
            }
            
            if(Ext.isEmpty(size)){
                size = "large";
            }
            this.instance = Ext.create("Xfr.panel.RemoteWindow", {
                size: size,
                title: title,
                remoteUrl: remoteUrl,
                renderTo: document.body
            });
        },
        show: function (title, remoteUrl, size) {
            this.init(title, remoteUrl, size);
            this.instance.show();
        },
        alert: function (title, remoteUrl) {
            this.show(title, remoteUrl);
        },
        hide: function () {
            if (!Ext.isEmpty(this.instance)) {
                this.instance.hide();
            }
        }
    }
});

