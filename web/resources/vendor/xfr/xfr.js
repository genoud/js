//@tag foundation,core
//@define Xfr

/**
 * @class Xfr
 * @singleton
 */
(function () {
    var global = this;
    if (typeof Xfr === 'undefined') {
        global.Xfr = {};
    }
    Xfr = Ext;
})();
