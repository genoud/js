////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.Mask
 * 
 */

Ext.define("Xfr.panel.Mask", {
    alternateClassName: "Xfr.Mask",
    requires: [
    ],
    extend: 'Xfr.panel.Window',
    config: {
    },      
    statics: {
        instance: null,
        init: function () {
            if (Ext.isEmpty(this.instance)) {
                this.instance = Ext.create("Xfr.panel.Mask", {
                    size: "small",
                    waitingMessage: "Loading ...",
                    renderTo: document.body
                });
            }
        },
        show: function (waitingMsg) {
            if (Ext.isEmpty(waitingMsg)) {
                waitingMsg = "Loading ...";
            }
            if (Ext.isEmpty(this.instance)) {
                this.init();
            } else {
                this.instance.setInfos({
                    "waitingMsg" :  waitingMsg
                });
            }
            this.instance.show();
        },
        hide: function () {
            if (!Ext.isEmpty(this.instance)) {
                this.instance.hide();
            }
        }
    }
});

