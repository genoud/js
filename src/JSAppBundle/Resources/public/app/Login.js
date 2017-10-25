/**
 * Created by maglo on 28/08/2016.
 */
Ext.define('JS.Login',{
    extend: "JS.panel.Form",
    config:{
        //position: "[data-registration-container]",
        dynamicTpl: false,
        //tplUrl: Routing.generate("get_auteur", {id: "new", _format: 'html'}),
        //syncTplLoading: false,
        panelData: {
            formUrl: Routing.generate("js_login_form", { _format: 'html'})
        },
        listeners: {
            "loadtpl": {
                fn: "onLoadFormTpl"
            },
            "afterrendertpl": {
                fn: "afterFormTplRendered"
            },
            "render": {
                fn: "onShow"
            }
        },
        loginTarget:"js-author-home"

    },
    onLoadFormTpl:function(){
        var me=this;
        Xfr.log("Registration tpl form loaded");
        me.callParent(arguments);

    },
    afterFormTplRendered:function(){
        var me=this;

        //On masque le champ des rôles

        $("input[type=checkbox]").iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
            increaseArea: '30%' // optional
        });

        $("#js-login-editor-btn").on("click", function(){
            me.setLoginTarget("js-admin-home");
        });

        $("#js-login-reviewer-btn").on("click", function(){
            me.setLoginTarget("js-reviewer-home");
        });

        me.callParent(arguments);
    },
    onShow:function(){
        var me=this;
        Xfr.log("Registration form rendered or shown");
        me.callParent(arguments);

    },
    initialize: function(){
        var me=this;
        console.log("Initialising Registration class");

        me.callParent(arguments);
    },
    register:function(){
        console.log('Registration');
    },
    reset:function(){
        console.log('Reset');
    },
    onFormSubmit:function(){
        console.log("submitting form Registration form");

        var me = this;

        var form = $("form:first", me.$this);
        formData = new FormData(form[0]);

        var opts = {
            url: Routing.generate("js_login_check",{ _format: 'json'}),
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            dataType: "json",
            type: "POST"
        };

        Xfr.Mask.show('Enregistrement...');

        $.ajax(Ext.merge(opts, {
            success: function (response, textStatus, jqXHR) {
                //Xfr.Mask.hide();

                if (response.success) {
                    //console.log("easy");
                    //console.log(response);
                    Xfr.Mask.hide();
                    Xfr.Msg.show({
                        title: "Succès",
                        //message: "Ville enregistrée avec succès",
                        message: response.message,
                        icon: Xfr.Msg.SUCCESS,
                        action:function(){

                        }
                    });
                    window.location=Routing.generate( me.getLoginTarget());

                    //me.afterCreate();
                    //me.clickOnCancel();
                    //me.getForm().reset();
                    //me.getChildren()[0].reload();
                } else {
                    //Gestion de l'affochage des erreurs
                    //console.log("Affichage des messages d'erreurs");


                    var message = "";

                    if (response.errors != undefined && response.errors.form != undefined) {
                        var formError = response.errors.form;
                        //message = me.getErrorMessages(formError);
                        //
                        //message = '<ul class="msgbox-error">' + message + "</ul>";
                    }
                    Xfr.Mask.hide();

                    Xfr.Msg.show({
                        title: "Erreur",
                        message: response.message + " " + message,
                        icon: Xfr.Msg.ERROR
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Xfr.Mask.hide();

                Xfr.Msg.show({
                    title: "Erreur",
                    message: "Une erreur est survenue sur le serveur!",
                    icon: Xfr.Msg.ERROR
                });
            }
        }));
    }
});
