Ext.define('Xfr.ComponentManager', {
    alternateClassName: 'Xfr.ComponentMgr',
    singleton: true,
    constructor: function () {
        this.classMap = {};
    },
    cmpInClassMap: function (component) {
        if (this.classMap[component.self.getName()]) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * Register component template     
     */
    register: function (component) {
//        console.log("--register component template--");
        if (!this.cmpInClassMap(component)) {
            this.classMap[component.self.getName()] = {
//                tplTokens: component.tplTokens
                tpl: component.tpl
            };
        } else {
            this.classMap[component.self.getName()].tpl = component.tpl;
        }
    },    
    /**
     * Register component template     
     */
    getTpl: function (component) {
        var obj = this.classMap[component.self.getName()];
        if (!Ext.isEmpty(obj)) {
            return obj.tpl;
        }
        return null;
    }
});
