////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.MessageBox
 * 
 */
Ext.define("Xfr.panel.MessageBox", {
    alternateClassName: "Xfr.Msg",
    requires: [
    ],
    extend: 'Xfr.panel.Window',
    config: {
    },
    statics: {
        instance: null,
        window: null,
        init: function (msgConfig) {
            //if (Ext.isEmpty(this.instance)) {
                msgConfig.size = "auto";
                msgConfig.renderTo = document.body;
                this.instance = Ext.create("Xfr.panel.MessageBox", msgConfig);
            //}
        },
        show: function (msgConfig) {
            if (!Ext.isEmpty(this.window)) {
                this.window.unbind('click');
            }
            if (Ext.isEmpty(msgConfig)) {
                msgConfig = {
                    message: "",
                    title: "",
                    icon: Xfr.Msg.NOTIFICATION.iconClass,
                    btn: [{text: Xfr.Msg.OK.text}]
                };
            }
            else {
                if (Ext.isEmpty(msgConfig.message)) {
                    msgConfig.message = "";
                }
                if (Ext.isEmpty(msgConfig.title)) {
                    msgConfig.title = "";
                }
                if (Ext.isEmpty(msgConfig.icon)) {
                    msgConfig.icon = Xfr.Msg.NOTIFICATION.iconClass;
                }
                else {
                    msgConfig.icon.type === 'icon' ? msgConfig.icon = msgConfig.icon.iconClass : msgConfig.icon = Xfr.Msg.NOTIFICATION.iconClass;
                }
                if (Ext.isEmpty(msgConfig.btn)) {
                    msgConfig.btn = [{text: Xfr.Msg.OK.text}];
                }
                else {
                    var btns = [];
                    msgConfig.btn.constructor === Array ? btns = msgConfig.btn : btns.push(msgConfig.btn);
                    msgConfig.btn = [];
                    for (var i = 0; i < btns.length; i++) {
                        btns[i].type === 'btn' ? msgConfig.btn.push({text: btns[i].text}) : msgConfig.btn.push({text: Xfr.Msg.OK.text});
                    }
                }
            }
            if (!Ext.isEmpty(this.instance)) {
                this.instance.destroy();
            }
            this.init(msgConfig);
            this.window = $('#message-window');
            if (!Ext.isEmpty(msgConfig.action)) {
                this.setAction(msgConfig.action);
                delete msgConfig.action;
            }
            this.instance.show();

        },
        alert: function (titleArg, messageArg) {
            var msgConfig = {
                icon  : Xfr.Msg.SUCCESS,
                title: titleArg,
                message: messageArg
            };
            this.show(msgConfig);
        },
        hide: function () {
            if (!Ext.isEmpty(this.instance)) {
                this.instance.hide();
            }
        },
        setAction: function (action) {
            this.window.click(function (e) {
                var btn = $(e.target);
                var text = btn.attr('btn-text');
                if (text) {
                    action(text);
                }
            });
        },
        SUCCESS: {
            type: 'icon',
            iconClass: 'fa fa-check-circle fa-5x xfr-inner-msg-icon-green'
        },
        WARNING: {
            type: 'icon',
            // iconClass: 'icon-warning xfr-inner-msg-icon-yellow'
            iconClass: 'icon-spam xfr-inner-msg-icon-yellow'
        },
        NOTIFICATION: {
            type: 'icon',
            // iconClass: 'icon-notification xfr-inner-msg-icon-blue'
            iconClass: 'icon-new xfr-inner-msg-icon-blue'
        },
        QUESTION: {
            type: 'icon',
            iconClass: 'icon-help xfr-inner-msg-icon-green'
        },
        INFO: {
            type: 'icon',
            //iconClass: 'icon-info xfr-inner-msg-icon-blue'
            iconClass: 'icon-info4 xfr-inner-msg-icon-blue'
        },
        ERROR: {
            type: 'icon',
            // iconClass: 'icon-spam xfr-inner-msg-icon-red'
            iconClass: 'fa fa-ban fa-5x xfr-inner-msg-icon-red'
        },
        YES: {
            type: 'btn',
            text: 'yes'
        },
        NO: {
            type: 'btn',
            text: 'no'
        },
        CANCEL: {
            type: 'btn',
            text: 'cancel'
        },
        OK: {
            type: 'btn',
            text: 'ok'
        }
    }
});

