/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.fichier.FichierForm", {
    //extend: "JS.panel.Form",
    extend: "Xfr.Component",
    config: {
        dynamicTpl: false,

        panelData: {
            formUrl: Routing.generate("get_fichier", {id: "new", _format: 'html'})
        },
        listeners: {
            "loadtpl": {
                fn: "onLoadTpl"
            },
            //"afterrendertpl": {
            //    fn: "afterRenderTpl"
            //},
            "render": {
                fn: "onShow"
            },
            "onCancel": Ext.emptyFn
        },
        form: null,
        eventBound:false,
        //currentStep:1,
        action:"new",
        fichier:null,
        title: 'New Attachement',
        subtitle: 'New',
        parentCmp:null,
        jsApp:null
    },
    onLoadTpl: function () {
        var me = this;
        Xfr.log("Fichier tpl form loaded");
        me.callParent(arguments);

    },
    afterRenderTpl: function () {
        var me = this;
        me.callParent(arguments);

        var id="new";
        if(me.getFichier()!=null){
            id=me.getFichier().id;
        }

        var form = Ext.create("Xfr.Component", {
            //className: "Xfr.panel.Form",
            position: "[data-mode=edit]",
            dynamicTpl: false,
            tplUrl: Routing.generate("get_fichier", {
                id: id,
                _format: 'html'
            }),
            syncTplLoading: false,
            cache:false,
            renderTo: "fichier-form-place",
            listeners: {
                "loadtpl": {
                    scope: me,
                    fn: "onLoadFormTpl"
                },
                "afterrendertpl": {
                    scope: me,
                    fn: "afterFormTplRendered"
                },
                "render": {
                    scope: me,
                    fn: "onShow"
                }
            }
        });
        me.setForm(form);
    },

    onFormLoaded: function () {
        var me = this;
        me.callParent(arguments);
    },
    onShow: function () {
        var me = this;
        Xfr.log("Manuscrit form rendered or shown");
        me.callParent(arguments);

    },
    initialize: function () {
        var me = this;
        console.log("Initialising MAnuscrit class");
        me.callParent(arguments);
    },
    onLoadFormTpl:function(loadedCmp, tplObj){
        console.log('form TPL Loaded');

    },
    afterFormTplRendered:function(){
        console.log('After Form TPL rendered co auteur');

        var me = this,
            form = $("form:first", me.getForm().$this);
        form.submit(function(e){
            e.preventDefault();
            me.save();
        });

        var saveBtn=$("button[data-action-type=save]", form);
        console.log(saveBtn);
        saveBtn.on("click", function(e){
            console.log("Save button clicked");
            e.preventDefault();
            me.save();
        });


        var cancelBtn=$("button[data-action-type=reset]", form);
        console.log(cancelBtn);
        cancelBtn.on("click", function(e){
            console.log("Cancel button clicked");
            e.preventDefault();
            me.fireEvent('onCancel', me);
        });

        var fichier=me.getFichier();
        $("#fichier_typeFichier").select2();
        if(fichier!=null){
            console.log("article.type_article.id");
            console.log(fichier.id);
            $("#fichier_typeFichier").select2().val(fichier.id);
        }


        $("input[type=checkbox]").iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
            increaseArea: '30%' // optional
        });


    },

    handleForm:function(){
        var me=this;
        var fichier=me.getFichier();
        var id=-1;

        Xfr.Mask.show("Saving...",null, me.$this);
        //SAve current step
        console.log("Saving current step");

        var form = $("form:first", me.getForm().$this);
        var formData=null;
        console.log(form);
        if(form && form!=null){
            formData = new FormData(form[0]);
        }

        console.log("Form Data");
        console.log(formData);


        if(fichier!=null){
            id=fichier.id;
        }
        var article=me.getParentCmp().getArticle();
        var review=me.getParentCmp().getReview();

        var articleId, reviewId;
        if(article){
            articleId=article.id;
        }
        if(review){
            reviewId=review.id;
        }
        $.ajax({
            url: Routing.generate('post_fichier', {
                _format : 'json',
                id : id,
                articleId : articleId,
                reviewId: reviewId
            }),
            cache: false,
            contentType: false,
            processData: false,
            type: "POST",
            data: formData,
            dataType: "json",
            success: function (response, textStatus, jqXHR) {
                console.log("ajax success");
                console.log(response);
                Xfr.Mask.hide();
                if(response && response.success){
                    console.log("Response success");
                    console.log("fichier enregistré");
                    //Ajouter l'auteur dans la liste
                    var parent=me.getParentCmp();
                    if(id>0){
                        parent.editFichier(response.data);
                    }
                    else{
                        parent.addFichier(response.data);
                    }

                    me.fireEvent('onCancel', me);
                }
                else{
                    console.log("Success False");


                }
                //$("li.current").toggleClass('current');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: "+ errorThrown);
                Xfr.Mask.hide();

            }
        });


    },

    save:function(){
        var me = this,
            form = $("form:first", me.getForm().$this);
        me.action="previous";

        var validateOptions = me.getFormValidation();
        if (!Ext.isEmpty(form)) {
            console.log("Validate options");
            console.log(validateOptions);
            var validator=form.validate(validateOptions);
            if(validator.form()){
                me.handleForm();
            }
        }
        //form.submit();

    },

    getFormValidation:function(){
        var validation={
                    rules: {
                        'article[typeArticle]': {
                            required: true
                        }
                    },
                    messages: {
                        'article[typeArticle]': {
                            required: ""
                        }
                    }
                };

        return validation;
    },
    reset: function () {
        console.log('Reset');
    },
    onFormSubmit: function () {
        console.log("submitting form Manuscrit form");
        var me = this;
    },
    getFieldModel: function (fieldName, entityName, removeLastField) {
        if (Ext.isEmpty(removeLastField)) {
            removeLastField = false;
        }
        fieldName = $.trim(fieldName);
        var entityExp = new RegExp(entityName, 'i');

        fieldName = fieldName.replace(entityExp, "data");
        fieldName = fieldName.replace(/\[\]/g, "");
        fieldName = fieldName.replace(/\[/g, ".");
        fieldName = fieldName.replace(/\]/g, "");
        if (removeLastField) {
            var tab = fieldName.split(".");
            var last = tab.pop();
            if (last === "first") {
                fieldName = tab.join(".");
            }

        }
        return fieldName;
    }
});