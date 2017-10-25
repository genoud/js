/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.reviewer.ArticleReviewerForm", {
    //extend: "JS.panel.Form",
    extend: "Xfr.Component",
    config: {
        dynamicTpl: false,

        panelData: {
            formUrl: Routing.generate("get_articlereviewer", {id: "new", _format: 'html'})
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
        reviewer:null,
        title: 'New Reviewer',
        subtitle: 'New',
        parentCmp:null,
        opposed:false,
        suggested: false,
        jsApp:null
    },
    onLoadTpl: function () {
        var me = this;
        Xfr.log("Reviewer tpl form loaded");
        me.callParent(arguments);

    },
    afterRenderTpl: function () {
        var me = this;
        me.callParent(arguments);

        var id="new";
        if(me.getReviewer()!=null){
            id=me.getReviewer().id;
        }

        var form = Ext.create("Xfr.Component", {
            //className: "Xfr.panel.Form",
            position: "[data-mode=edit]",
            dynamicTpl: false,
            tplUrl: Routing.generate("get_articlereviewer", {
                id: id,
                _format: 'html'
            }),
            syncTplLoading: false,
            cache:false,
            renderTo: "reviewer-form-place",
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




    },

    handleForm:function(){
        var me=this;
        var reviewer=me.getReviewer();
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


        if(reviewer!=null){
            id=reviewer.id;
        }
        $.ajax({
            url: Routing.generate('post_articlereviewer', {
                _format : 'json',
                id : id,
                articleId : me.getParentCmp().getArticle().id,
                opposed : me.getOpposed(),
                suggested : me.getSuggested()
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
                    console.log("reviewer enregistré");
                    //Ajouter l'auteur dans la liste
                    var parent=me.getParentCmp();
                    if(id>0){
                        parent.editReviewer(response.data);
                    }
                    else{
                        parent.addReviewer(response.data);
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