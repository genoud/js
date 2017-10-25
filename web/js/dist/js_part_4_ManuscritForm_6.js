/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.article.ManuscritForm", {
    //extend: "JS.panel.Form",
    extend: "Xfr.Component",
    config: {
        dynamicTpl: false,

        panelData: {
            formUrl: Routing.generate("get_manuscrit_step", {stepId: "new", _format: 'html'})
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
            }
        },
        form: null,
        eventBound:false,
        currentStep:1,
        action:"",
        article:null,
        title: 'Article Submission',
        subtitle: 'New',
        jsApp:null
    },
    onLoadTpl: function () {
        var me = this;
        Xfr.log("Manuscrit tpl form loaded");
        me.callParent(arguments);

    },
    afterRenderTpl: function () {
        var me = this;
        var currentStep=me.getCurrentStep();
        me.callParent(arguments);

        //On set les données du template
        var data={
            stepList: JS.article.ManuscritForm.stepList
        };
        me.setData(data);

        if(currentStep==null || currentStep<0){
            currentStep=JS.article.ManuscritForm.stepList[0].code;
            me.setCurrentStep(currentStep);
        }

        //Création du formulaire

        me.loadStep(currentStep);


        var next = $("button[data-action=next]");
        var previous = $("button[data-action=previous]");

        next.on('click', function () {
            console.log("Next button clicked");
            me.next();
        });
        previous.on('click', function () {
            console.log("Previous button clicked");
            me.previous();
        });

        if(!me.getEventBound()){
            me.binder.on('step-click', function (e) {
                //console.log("Step cliqued");
                //console.log("event context");
                //console.log(e);
                me.loadStep(e.context.code);
            });
            me.setEventBound(true);
        }

        me.initStepState();

    },
    initStepState:function(){
        var me=this;

        var article=me.getArticle();

        if(article && article!=null){
            if (article.step1){
                $("li[data-step=1]").addClass('completed');
            }
            if (article.step2){
                $("li[data-step=2]").addClass('completed');
            }
            if (article.step3){
                $("li[data-step=3]").addClass('completed');
            }
            if (article.step4){
                $("li[data-step=4]").addClass('completed');
            }
            if (article.step5){
                $("li[data-step=5]").addClass('completed');
            }
            if (article.step6){
                $("li[data-step=6]").addClass('completed');
            }
            if (article.step7){
                $("li[data-step=7]").addClass('completed');
            }
            if (article.step8){
                $("li[data-step=8]").addClass('completed');
            }
            if (article.step9){
                $("li[data-step=9]").addClass('completed');
            }
            if (article.step10){
                $("li[data-step=10]").addClass('completed');
            }
            if (article.step11){
                $("li[data-step=11]").addClass('completed');
            }
        }
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
    loadStep: function (step) {
        console.log("loading step");
        console.log(step);
        var me=this;
        var article=me.getArticle();
        var articleId=-1

        if(step==null || step==undefined){
            step=me.getCurrentStep();
        }

        var formContainer=$("#form-place");

        formContainer.empty();

        if(article!=null){
            articleId=article.id;
        }

        me.setCurrentStep(step);
        var form=null;
        if(step==3){ //Author Step
            form = Ext.create("JS.article.ManuscritAuthorsCmp", {
                //className: "Xfr.panel.Form",
                position: "[data-mode=edit]",
                dynamicTpl: false,

                article: article,
                syncTplLoading: false,
                cache:false,
                renderTo: "form-place",
                jsApp: me.getJsApp(),
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
        }
        else if(step==4){
            //Financial step
            console.log("Loading funding step");
            form = Ext.create("JS.article.ManuscritFundingsCmp", {
                //className: "Xfr.panel.Form",
                position: "[data-mode=edit]",
                dynamicTpl: false,

                article: article,
                syncTplLoading: false,
                cache:false,
                renderTo: "form-place",
                jsApp: me.getJsApp(),
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
        }
        else if(step==7){
            //keyword step
            console.log("Article avant création du composant");
            console.log(article);
            console.log("Loading keyword step");
            form = Ext.create("JS.cmp.MotsClesCmp", {
                //className: "Xfr.panel.Form",
                position: "[data-mode=edit]",
                dynamicTpl: false,

                article: article,
                syncTplLoading: false,
                cache:false,
                renderTo: "form-place",
                jsApp: me.getJsApp(),
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
        }
        else if(step==10){
            //keyword step
            console.log("Article avant création du composant");
            console.log(article);
            console.log("Loading keyword step");
            form = Ext.create("JS.cmp.ReviewersCmp", {
                //className: "Xfr.panel.Form",
                position: "[data-mode=edit]",
                dynamicTpl: false,

                article: article,
                opposed:false,
                suggested:true,
                syncTplLoading: false,
                cache:false,
                renderTo: "form-place",
                jsApp: me.getJsApp(),
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
        }
        else if(step==11){
            //keyword step
            console.log("Article avant création du composant");
            console.log(article);
            console.log("Loading keyword step");
            form = Ext.create("JS.cmp.ReviewersCmp", {
                //className: "Xfr.panel.Form",
                position: "[data-mode=edit]",
                dynamicTpl: false,
                opposed:true,
                suggested:false,
                article: article,
                syncTplLoading: false,
                cache:false,
                renderTo: "form-place",
                jsApp: me.getJsApp(),
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
        }
        else if(step==12){
            //keyword step
            console.log("Article avant création du composant");
            console.log(article);
            console.log("Loading keyword step");
            form = Ext.create("JS.cmp.FichiersCmp", {
                //className: "Xfr.panel.Form",
                position: "[data-mode=edit]",
                dynamicTpl: false,
                article: article,
                syncTplLoading: false,
                cache:false,
                renderTo: "form-place",
                jsApp: me.getJsApp(),
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
        }
        else{
            form = Ext.create("Xfr.Component", {
                //className: "Xfr.panel.Form",
                position: "[data-mode=edit]",
                dynamicTpl: false,
                tplUrl: Routing.generate("get_manuscrit_step", {
                    stepId: step,
                    _format: 'html',
                    id:articleId
                }),
                syncTplLoading: false,
                cache:false,
                renderTo: "form-place",
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
        }


        me.setForm(form);

        //Manage current step
        $("li.current").toggleClass('current');
        $("li[data-step="+step+"]").toggleClass('current');

        var data=me.getData();
        data.currentStep=JS.article.ManuscritForm.getStepByCode(step);

        console.log("Data before update");
        console.log(data);
        me.setData(data);


    },
    onLoadFormTpl:function(loadedCmp, tplObj){
        console.log('form TPL Loaded');

    },
    afterFormTplRendered:function(){
        console.log('After Form TPL rendered');

        var me = this,
            currentStep=me.getCurrentStep(),
            form = $("form:first", me.getForm().$this);

        console.log("Current step:  --   "+ currentStep);
        switch (currentStep){
            case 1:
                me.initializeStep1();
                break;
            case 6:
                //Abstract step
                me.initializeStep6();
                break;
        }


    },
    initializeStep1:function(){
        var me=this,
            article=me.getArticle();
        console.log("initialize step1");
        $("#manuscrit_step1_typeArticle").select2();
        if(article!=null){
            console.log("article.type_article.id");
            console.log(article.type_article.id);
            $("#manuscrit_step1_typeArticle").select2().val(article.type_article.id);
        }

    },
    initializeStep6:function(){
        //var me=this,
        //    article=me.getArticle();
        console.log("initialize step 6");
        var editor=CKEDITOR.replace('manuscrit_step6_abstract')


// The "change" event is fired whenever a change is made in the editor.
        editor.on( 'change', function( evt ) {
            // getData() returns CKEditor's HTML content.
            console.log( 'Total bytes: ' + evt.editor.getData().length );
            var data=evt.editor.getData();
            $("#manuscrit_step6_abstract").val(data);
        });

    },
    handleForm:function(validForm){
        var me=this,
            currentStep=me.getCurrentStep();
        var stepList=JS.article.ManuscritForm.stepList;
        var article=me.getArticle();
        var articleId=-1;

        //SAve current step
        console.log("Saving current step");

        var formData=null;

        if(validForm){
            var form = $("form:first", me.getForm().$this);
            console.log(form);
            if(form && form!=null){
                formData = new FormData(form[0]);
            }

        }

        var extraData=null;

        if (typeof me.getForm().getExtraData !== "undefined") {
            extraData=me.getForm().getExtraData();
        }
        console.log("Form Data");
        console.log(formData);

        console.log("Form Data");
        console.log("extra data");
        console.log(extraData);


        if(article!=null){
            articleId=article.id;
        }
        $.ajax({
            url: Routing.generate('post_manuscrit', {
                _format: 'json',
                stepId: currentStep,
                id: articleId,
                extraData:extraData
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
                    console.log("Response success");
                    $("li[data-step="+currentStep+"]").addClass('completed');
                    me.setArticle(response.data);
                    if(me.action=="next"){
                        console.log("handle next");
                        if(currentStep<stepList[stepList.length-1].code){
                            currentStep++;
                            me.setCurrentStep(currentStep);
                            me.loadStep(currentStep);
                        }
                    }
                    else  if(me.action=="previous"){
                        console.log("handle previous");

                        if(currentStep>1){
                            currentStep--;
                            me.setCurrentStep(currentStep);
                            me.loadStep(currentStep);
                        }
                    }
                }
                else{
                    console.log("Success False");
                    $("li[data-step="+currentStep+"]").removeClass('completed');

                }
                //$("li.current").toggleClass('current');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: "+ errorThrown);
                $("li[data-step="+currentStep+"]").removeClass('completed');
            }
        });


    },
    next:function(){
        console.log("Next function");
        var me = this,
            currentStep=me.getCurrentStep(),
            form = $("form:first", me.getForm().$this);
        me.action="next";

        if(currentStep==3 || currentStep==4 || currentStep==7 || currentStep==10 || currentStep==11 || currentStep==12){
            //Step auteur
            me.handleForm(false);
            return;
        }

        var validateOptions = me.getFormValidation(currentStep);
        //validateOptions.submitHandler = function () {
        //    me.handleForm();
        //};
        if (!Ext.isEmpty(form)) {
            console.log("Validate options");
            console.log(validateOptions);
            var validator=form.validate(validateOptions);
            if(validator.form()){
                me.handleForm(true);
            }
        }


        //form.submit();
    },
    previous:function(){
        var me = this,
            currentStep=me.getCurrentStep(),
            form = $("form:first", me.getForm().$this);
        me.action="previous";

        if(currentStep==3 || currentStep==4 || currentStep==7 || currentStep==10 || currentStep==11 || currentStep==12){
            //Step auteur
            me.handleForm(false);
            return;
        }

        var validateOptions = me.getFormValidation(currentStep);
        //validateOptions.submitHandler = function (form) {
        //
        //    console.log("validation submit handler");
        //    console.log(form);
        //    me.handleForm();
        //};
        if (!Ext.isEmpty(form)) {
            console.log("Validate options");
            console.log(validateOptions);
            var validator=form.validate(validateOptions);
            if(validator.form()){
                me.handleForm(true);
            }
        }
        //form.submit();

    },

    getFormValidation:function(step){
        var validation={};
        switch (step){

            case 1:
                validation={
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
                break;
            default:
                break;
        }
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
    },
    statics: {
        getStepByCode:function(stepCode){
            for(var i=0;i<JS.article.ManuscritForm.stepList.length;i++){
                var oneStep=JS.article.ManuscritForm.stepList[i];
                if(oneStep.code==stepCode){
                    return oneStep;
                }
            }
            return null;
        },
        stepList: [
            {
                code: 1,
                libelle: "Article Type",
                formUrl: "",
                previous: null,
                next: 2,
                iconClass: "fa fa-file-text",
                itemClass:"current",
                title:"Selection of the article type",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 2,
                libelle: "Title",
                formUrl: "",
                previous: 1,
                next: 3,
                iconClass: "fa fa-align-justify",
                itemClass:"",
                title:"Article title",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 3,
                libelle: "Authors",
                formUrl: "",
                previous: 2,
                next: 4,
                iconClass: "fa fa-user",
                itemClass:"",
                title:"Authors",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 4,
                libelle: "Financial informations",
                formUrl: "",
                previous: 3,
                next: 5,
                iconClass: "fa fa-usd",
                itemClass:"",
                title:"Financial informations",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 5,
                libelle: "Sections / Categories",
                formUrl: "",
                previous: 4,
                next: 6,
                iconClass: "fa fa-puzzle-piece",
                itemClass:"",
                title:"Sections / Categories",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 6,
                libelle: "Abstract",
                formUrl: "",
                previous: 5,
                next: 7,
                iconClass: "fa fa-paragraph",
                itemClass:"",
                title:"Abstract",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 7,
                libelle: "Key words",
                formUrl: "",
                previous: 6,
                next: 8,
                iconClass: "fa fa-italic",
                itemClass:"",
                title:"Key words",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 8,
                libelle: "Additional information",
                formUrl: "",
                previous: 7,
                next: 9,
                iconClass: "fa fa-plus-square",
                itemClass:"",
                title:"Additional information",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 9,
                libelle: "Comments",
                formUrl: "",
                previous: 8,
                next: 10,
                iconClass: "fa fa-comment-o",
                itemClass:"",
                title:"Comments",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 10,
                libelle: "Suggested reviewers",
                formUrl: "",
                previous: 9,
                next: 11,
                iconClass: "fa fa-user",
                itemClass:"",
                title:"Suggested reviewers",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 11,
                libelle: "Opposed reviewers",
                formUrl: "",
                previous: 9,
                next: 10,
                iconClass: "fa fa-user",
                itemClass:"",
                title:"Opposed reviewers",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            },
            {
                code: 12,
                libelle: "Attachments",
                formUrl: "",
                previous: 11,
                next: null,
                iconClass: "fa fa-upload",
                itemClass:"",
                title:"Attachments",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum vitae " +
                "purus vitae viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere " +
                "cubilia Curae; Suspendisse ullamcorper fermentum nunc sit amet laoreet. Donec lacus massa, " +
                "congue et magna quis, consequat egestas augue. Ut rutrum sapien nulla, in condimentum " +
                "mauris malesuada id. Aliquam ac ante nunc. Phasellus blandit tellus sit amet eros volutpat, " +
                "ac hendrerit orci faucibus. Curabitur eget sem in turpis feugiat tempus. Suspendisse ullamcorper " +
                "quis turpis in volutpat. Proin pulvinar velit non magna congue varius. Donec vulputate lacinia " +
                "enim in laoreet. Donec sit amet sapien id diam dictum aliquam."
            }
        ]
    }
});