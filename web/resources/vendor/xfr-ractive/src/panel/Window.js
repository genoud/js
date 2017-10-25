////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.Window
 * 
 */
Ext.define("Xfr.panel.Window", {
    alternateClassName: "Xfr.Window",
    requires: [
    ],
    extend: 'Xfr.Component',
    config: {
    },
    initialize: function () {

        this.callParent();
        $("#" + this.getId() + " .xfr-mask").modal({
            keyboard: false,
            show: false,
            backdrop: 'static'
        });

        $("#" + this.getId() + " .xfr-mask").on('shown.bs.modal', function () {
//            console.log("on shown");
//            $(this).find('.modal-dialog').css({
//                'margin-top': function () {
//                    return -($(this).outerHeight() / 2);
//                },
//                'margin-left': function () {
//                    return -($(this).outerWidth() / 2);
//                }
//            });
            $("body").css({
                "padding": "0px"
            });
        });

    },
    show: function () {
        $("#" + this.getId() + " .xfr-mask").modal('show');
    },
    hide: function () {
        $("#" + this.getId() + " .xfr-mask").modal('hide');
    },
    setInfos: function (infos) {
        for (var key in infos) {
            $("[data-" + $.trim(key) + "]", this.$this).text(infos[key]);
        }
    }
//    ,
//    statics: {
//        instance: null,
//        init: function (title, message) {
//            if (Ext.isEmpty(this.instance)) {
//                this.instance = Ext.create("Xfr.panel.Window", {
//                    size: "auto",
//                    title: title,
//                    message: message,
//                    renderTo: document.body
//                });
//            }
//        },
//        show: function (title, message) {
//            if (Ext.isEmpty(message)) {
//                message = "";
//            }
//            if (Ext.isEmpty(title)) {
//                title = "";
//            }
//            if (Ext.isEmpty(this.instance)) {
//                this.init(title, message);
//            } else {
//                this.instance.setInfos({
//                    title: title,
//                    message: message
//                });
//            }
//            this.instance.show();
//        },
//        alert: function (title, message) {
//            this.show(title, message);
//        },
//        hide: function () {
//            if (!Ext.isEmpty(this.instance)) {
//                this.instance.hide();
//            }
//        }
//    }
});

