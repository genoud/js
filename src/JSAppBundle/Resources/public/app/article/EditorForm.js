/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.article.EditorForm", {
    //extend: "JS.panel.Form",
    extend: "Xfr.Component",
    config: {
        dynamicTpl: false,

        panelData: {
            formUrl: Routing.generate("get_editor", {id: "new", _format: 'html'})
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
        action:"new",
        selectedArticles:[],
        title: 'Assign editor',
        subtitle: '',
        parentCmp:null,
        jsApp:null
    },
    onLoadTpl: function () {
        var me = this;
        me.callParent(arguments);

    },
    afterRenderTpl: function () {
        var me = this;
        me.callParent(arguments);

        var id="new";
        var selectedArticles=me.getSelectedArticles();
        if(selectedArticles!=null && selectedArticles.length==1){
            id=selectedArticles[0].id;
        }

        var form = Ext.create("Xfr.Component", {
            //className: "Xfr.panel.Form",
            position: "[data-mode=edit]",
            dynamicTpl: false,
            tplUrl: Routing.generate("get_editor", {
                id: id,
                _format: 'html'
            }),
            syncTplLoading: false,
            cache:false,
            renderTo: "editor-form-place",
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
        console.log('form Editor TPL Loaded');

    },
    afterFormTplRendered:function(){
        console.log('After Form Editor TPL rendered co auteur');

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


        var selectedArticles=me.getSelectedArticles();
        var article=null;
        if(selectedArticles!=null && selectedArticles.length==1){
            article=selectedArticles[0];
        }


        $("#article_editor_editeur").select2();
        if(article!=null && article.editeur!=null){
            $("#article_editor_editeur").select2().val(article.editeur.id);
        }




    },

    handleForm:function(){
        var me=this;

        var id=-1;

        Xfr.Mask.show("Chargement en cours",null);
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

        var selectedArticles=me.getSelectedArticles();
        var articleIds='';
        if(selectedArticles!=null && selectedArticles.length>0){
            articleIds=selectedArticles[0].id;
            for(var i=1; i<selectedArticles.length; i++){
                articleIds=articleIds+','+selectedArticles[i].id;
            }
        }

        $.ajax({
            url: Routing.generate('post_editor', {
                _format: 'json',
                id: id,
                articleIds: articleIds
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
                if(response && response.success){
                    //console.log("Response success");
                    //console.log("auteur enregistré");
                    ////Ajouter l'auteur dans la liste
                    //var parent=me.getParentCmp();
                    //if(id>0){
                    //    parent.editCoauteur(response.data);
                    //}
                    //else{
                    //    parent.addCoauteur(response.data);
                    //}

                    me.fireEvent('onCancel', me);
                }
                else{
                    console.log("Success False");


                }
                //$("li.current").toggleClass('current');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: "+ errorThrown);

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