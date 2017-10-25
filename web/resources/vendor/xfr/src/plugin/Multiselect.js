/**
 * @class Xfr.panel.Multiselect
 * 
 */
Ext.define("Xfr.plugin.Multiselect", {
    //extend: 'Xfr.Component',
    extend: 'Xfr.panel.Form',
    requires: [],
    alias: 'plugin.multiselect',
    config: {
        //height : 50,
        cmp: null,
        data: {},
        urlActionSelect: null,
        select2Field: null //,
        // placeHolder: null
    },
    init: function(cmp) {
        var me = this;
        me.setCmp(cmp);

        //console.log("multiselect size = " + $('select[data-multiselect]', me.$this).length);
        // $('select[data-multiselect]', me.$this).select2({
        //     allowClear: true,
        //     placeholder: cmp.getPlaceHolder(),
        //     ajax: select2AjaxConfig(cmp.getUrlPathSelect()),
        //     escapeMarkup: function(markup) {
        //         return markup;
        //     },
        //     minimumInputLength: 1,
        //     templateResult: function(data) {
        //         if (null != data && undefined != data) {
        //             return data.id;
        //         }
        //         return null;
        //     },
        //     templateSelection: function(data) {
        //         if (null != data && undefined != data) {
        //             return data.id;
        //         }
        //         return null;
        //     }
        // });
        // 
        // 
        // console.log("me.getSelect2Field()");
        // console.log(me.getSelect2Field());

        me.iniSelect2Field(Ext.merge(me.getSelect2Field(), {
            xtype: "select2",
            selector: "select[data-multiselect]"
        }));

        $('[data-button-insert]', me.$this).click(function() {
            me.onAddClicked();
        });
    },
    onAddClicked: function() {
        var me = this;
        var form = $("form[name=multiselect-frm]", me.$this);

        //Xfr.Mask.show("Opération en cours ...");
        me.getCmp().mask("Opération en cours ...");

        var formData = form.serialize();

        $.ajax({
            url: Routing.generate(me.getUrlActionSelect(), {
                _locale: appConfig.locale
            }) + '?id=' + me.getCmp().config.relatedData.id + '&' + formData + "&" + me.getCmp().customParams,
            type: "POST",
            success: function(data, textStatus, jqXHR) {
                //Xfr.Mask.hide();
                me.getCmp().unmask();
                var response = JSON.parse(data);
                if (response.success) {

                    //$('[data-multiselect]', me.$this).select2("val", "");
                    me.setSelect2Value('[data-multiselect]', "", "");

                    Xfr.Msg.show({
                        title: "SUCCESS",
                        message: response.message,
                        icon: Xfr.Msg.SUCCESS,
                        action: function(btn) {
                            if (btn === Xfr.Msg.OK.text) {
                                me.getCmp().reloadGrid();
                            }
                        }
                    });
                } else {
                    Xfr.Msg.show({
                        title: "ERROR",
                        message: response.message,
                        icon: Xfr.Msg.ERROR
                    });
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                //Xfr.Mask.hide();
                me.getCmp().unmask();
                Xfr.Msg.show({
                    title: "ERROR",
                    message: "AN ERROR OCCURED IN SERVER",
                    icon: Xfr.Msg.ERROR
                });
            }
        });

    }
});
