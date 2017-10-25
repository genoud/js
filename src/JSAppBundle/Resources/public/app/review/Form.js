/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.review.Form", {
    //extend: "JS.panel.Form",
    extend: "Xfr.Component",
    config: {
        dynamicTpl: false,

        panelData: {
            formUrl: Routing.generate("get_review", {id: "new", _format: 'html'})
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
        review:null,
        title: 'Review',
        subtitle: 'Write',
        parentCmp:null,
        jsApp:null
    },
    onLoadTpl: function () {
        var me = this;
        Xfr.log("Review tpl form loaded");
        me.callParent(arguments);

    },
    afterRenderTpl: function () {
        var me = this;
        me.callParent(arguments);

        var id="new";
        var review=me.getReview();
        if(review!=null){
            id=review.id;
        }

        var form = Ext.create("Xfr.Component", {
            //className: "Xfr.panel.Form",
            position: "[data-mode=edit]",
            dynamicTpl: false,
            tplUrl: Routing.generate("get_review", {
                id: id,
                _format: 'html'
            }),
            syncTplLoading: false,
            cache:false,
            renderTo: "review-form-place",
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
        me.callParent(arguments);

    },
    initialize: function () {
        var me = this;
        me.callParent(arguments);



    },
    onLoadFormTpl:function(loadedCmp, tplObj){

    },
    afterFormTplRendered:function(){

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


        $("input[type=checkbox]").iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
            increaseArea: '30%' // optional
        });

        var editor=CKEDITOR.replace('review_content');


// The "change" event is fired whenever a change is made in the editor.
        editor.on( 'change', function( evt ) {
            var data=evt.editor.getData();
            $("#reivew_content").val(data);
        });

        form = Ext.create("JS.cmp.FichiersCmp", {
            //className: "Xfr.panel.Form",
            position: "review-attachement-position",
            dynamicTpl: false,
            review: me.getReview(),
            syncTplLoading: false,
            cache:false,
            renderTo: "review-attachement-position",
            jsApp: me.getJsApp(),
            listeners: {
                "loadtpl": {
                    scope: me,
                    fn: "onLoadFormTpl"
                },
                "afterrendertpl": {
                    scope: me,
                    fn: Ext.emptyFn
                },
                "afterfilesloaded": {
                    scope: me,
                    fn: "afterFormTplRendered"
                },
                "render": {
                    scope: me,
                    fn: "onShow"
                }
            }
        });


    },

    handleForm:function(){
        var me=this;
        var review=me.getReview();
        var id=-1;

        Xfr.Mask.show("Saving...",null);

        var form = $("form:first", me.getForm().$this);
        var formData=null;
        console.log(form);
        if(form && form!=null){
            formData = new FormData(form[0]);
        }

        console.log("Form Data");
        console.log(formData);


        if(review!=null){
            id=review.id;
        }
        $.ajax({
            url: Routing.generate('post_review', {
                _format: 'json',
                id: id
            }),
            cache: false,
            contentType: false,
            processData: false,
            type: "POST",
            data: formData,
            dataType: "json",
            success: function (response, textStatus, jqXHR) {
                Xfr.Mask.hide();
                Xfr.Msg.show({
                    message: "Review saved successfully!",
                    title: "Review",
                    icon: Xfr.Msg.SUCCESS.iconClass,
                    action:function(btn){
                        me.getJsApp().back();
                    }
                });
                if(response && response.success){

                    me.fireEvent('onCancel', me);
                }
                else{
                    console.log("Success False");
                }
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
                'article[categorie]': {
                    required: true
                }
            },
            messages: {
                'article[categorie]': {
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