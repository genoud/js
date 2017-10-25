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
        subtitle: 'New'
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
        var form = Ext.create("Xfr.Component", {
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

        //var me=this;
        //
        //var inputNotList="";
        //var form = form = $("<div>" + tplObj.html + "</div>");
        //var entityName="article";
        //
        //inputNotList += "[name*=_token]";
        //inputNotList += ",[type=submit]";
        //inputNotList += ",[type=reset]";
        //
        //$("input:not(" + inputNotList + "), select, textarea", form).each(function (index, field) {
        //    var fieldName = $(field).attr("name");
        //    var model = "";
        //    if ($(field).attr("type") === "password") {
        //        model = me.getFieldModel(fieldName, entityName, true);
        //    } else {
        //        model = me.getFieldModel(fieldName, entityName);
        //    }
        //
        //    fieldValue = "{{" + model + "}}";
        //    //fieldValue =  model ;
        //
        //
        //
        //    if ($(field).attr("type") === "file") {
        //    }
        //
        //
        //    $(field).attr("value", fieldValue);
        //
        //
        //});
        //tplObj.html = form.html();
        //console.log(tplObj.html);

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
    handleForm:function(){
        var me=this,
            currentStep=me.getCurrentStep();
        var stepList=JS.article.ManuscritForm.stepList;
        var article=me.getArticle();
        var articleId=-1;

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


        if(article!=null){
            articleId=article.id;
        }
        $.ajax({
            url: Routing.generate('post_manuscrit', {
                _format: 'json',
                stepId: currentStep,
                id: articleId
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

        var validateOptions = me.getFormValidation(currentStep);
        //validateOptions.submitHandler = function () {
        //    me.handleForm();
        //};
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
    previous:function(){
        var me = this,
            currentStep=me.getCurrentStep(),
            form = $("form:first", me.getForm().$this);
        me.action="previous";

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
                me.handleForm();
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
                libelle: "Opposed reviewers",
                formUrl: "",
                previous: 9,
                next: 11,
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
                code: 11,
                libelle: "Attachments",
                formUrl: "",
                previous: 10,
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