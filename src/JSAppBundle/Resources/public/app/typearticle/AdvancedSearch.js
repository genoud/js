Ext.define("JS.typearticle.AdvancedSearch", {
    extend: "Xfr.Component",
    requires: [],
    config: {
        slimscroll:false
    },
    initialize: function () {

        console.log("initializing advanced search");
        var me = this;

        me.on({
            afterrendertpl: {
                scope: me,
                fn: "onAfterRenderTpl"
            }
        });

        this.callParent();
        
        //$('#form_pme').select2({
        //    ajax: select2AjaxConfig('api_v1_get_pmes'),
        //    escapeMarkup: function (markup) {
        //        return markup;
        //    },
        //    placeholder: "Sélection PME",
        //    allowClear: true,
        //    minimumInputLength: 1,
        //    templateResult: function (data) {
        //        if (null != data && undefined != data) {
        //            if (data.rso) {
        //                return data.id + '-' + data.rso;
        //            }
        //            else {
        //                return data.text;
        //            }
        //        }
        //        return null;
        //    },
        //    templateSelection: function (data) {
        //        if (null != data && undefined != data) {
        //            if (data.rso) {
        //                return data.id + '-' + data.rso;
        //            }
        //            else {
        //                return data.text;
        //            }
        //        }
        //        return null;
        //    }
        //});

    },
    onAfterRenderTpl: function (me) {
        var me = this;

        //console.log("after render tpl filter form");

        $("#filter-all-date-debut").datepicker({
            format: "dd/mm/yyyy",
            autoclose: true,
            endDate: "+0d",
            startView: 1,
            maxViewMode: 0,
            todayBtn: "linked",
            todayHighlight: true
        });

        $("#filter-all-date-fin").datepicker({
            format: "dd/mm/yyyy",
            autoclose: true,
            endDate: "+0d",
            startView: 1,
            maxViewMode: 0,
            todayBtn: "linked",
            todayHighlight: true
        });

    }
});
