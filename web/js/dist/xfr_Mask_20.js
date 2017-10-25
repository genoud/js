////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.Mask
 * 
 */
Ext.define("Xfr.panel.Mask", {
    alternateClassName: "Xfr.Mask",
    requires: [],
    statics: {
        show: function(label, opt, selector) {
            console.log("showing mask");
            if (Ext.isEmpty(opt)) {
                opt = {};
            }
            if (Ext.isEmpty(opt.size)) {
                opt.size = 64;
            }
            if (Ext.isEmpty(opt.backgroundColor)) {
                opt.backgroundColor = "black";
            }

            if(selector && selector!=undefined && selector!=""){
                console.log("showing mask - selector " + selector);
                $(selector).mask(label, opt);
            }
            else{
                console.log("showing mask - body");
                $("body").mask(label, opt);
            }
            //$("body").mask(label, opt);
        },
        hide: function() {
            $("body").unmask();
        }
    }
});
