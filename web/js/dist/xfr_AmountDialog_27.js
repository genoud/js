////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.AmountDialog
 * 
 */


Ext.define("Xfr.panel.AmountDialog", {
    alternateClassName: "Xfr.AmountDialog",
    extend: "Xfr.panel.Window",
    requires: [
    ],
    config: {
    },
    statics: {
        instance: null,
        init: function () {
            this.instance = Ext.create("Xfr.panel.AmountDialog", {
                size: "medium",
                title: "Montant physique",
                renderTo: document.body
            });
        },
        show: function (action, montant) {
            if (!Ext.isEmpty(this.instance)) {
                this.instance.destroy();
            }
            this.init();
            $('#amount-dialog-btn-save').on("click", function (event) {
                action();
            });
            $('#montant_physique').on("change", function (event) {
                var reste = parseInt($('#montant_physique').val()) - montant;
                $('#montant_rembourse').val(reste);
            });

            this.instance.show();
        },
        hide: function () {
            if (!Ext.isEmpty(this.instance)) {
                this.instance.hide();
            }
        }
    }

});


