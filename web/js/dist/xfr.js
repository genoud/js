/*! jQuery Validation Plugin - v1.14.0 - 6/30/2015
 * http://jqueryvalidation.org/
 * Copyright (c) 2015 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.on("click.validate",":submit",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(this).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(this).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.on("submit.validate",function(b){function d(){var d,e;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),e=c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),void 0!==e?e:!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c,d;return a(this[0]).is("form")?b=this.validate().form():(d=[],b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b,d=d.concat(c.errorList)}),c.errorList=d),b},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){return!!a.trim(""+a(b).val())},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(b,c){var d=[16,17,18,20,35,36,37,38,39,40,45,144,225];9===c.which&&""===this.elementValue(b)||-1!==a.inArray(c.keyCode,d)||(b.name in this.submitted||b===this.lastElement)&&this.element(b)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this.form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!a(this).is(e.ignore)&&e[d].call(c,this,b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']",b).on("click.validate","select, option, [type='radio'], [type='checkbox']",b),this.settings.invalidHandler&&a(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c=this.clean(b),d=this.validationTargetFor(c),e=!0;return this.lastElement=d,void 0===d?delete this.invalid[c.name]:(this.prepareElement(d),this.currentElements=a(d),e=this.check(d)!==!1,e?delete this.invalid[d.name]:this.invalid[d.name]=!0),a(b).attr("aria-invalid",!e),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors();var b,c=this.elements().removeData("previousValue").removeAttr("aria-invalid");if(this.settings.unhighlight)for(b=0;c[b];b++)this.settings.unhighlight.call(this,c[b],this.settings.errorClass,"");else c.removeClass(this.settings.errorClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d=a(b),e=b.type;return"radio"===e||"checkbox"===e?this.findByName(b.name).filter(":checked").val():"number"===e&&"undefined"!=typeof b.validity?b.validity.badInput?!1:d.val():(c=d.val(),"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j instanceof TypeError&&(j.message+=".  Exception occurred when checking element "+b.id+", check the '"+e.method+"' method."),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a];return void 0},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),this.errorList.push({message:d,element:b,method:c.method}),this.errorMap[b.name]=d,this.submitted[b.name]=d},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g=this.errorsFor(b),h=this.idOrName(b),i=a(b).attr("aria-describedby");g.length?(g.removeClass(this.settings.validClass).addClass(this.settings.errorClass),g.html(c)):(g=a("<"+this.settings.errorElement+">").attr("id",h+"-error").addClass(this.settings.errorClass).html(c||""),d=g,this.settings.wrapper&&(d=g.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b),g.is("label")?g.attr("for",h):0===g.parents("label[for='"+h+"']").length&&(f=g.attr("id").replace(/(:|\.|\[|\]|\$)/g,"\\$1"),i?i.match(new RegExp("\\b"+f+"\\b"))||(i+=" "+f):i=f,a(b).attr("aria-describedby",i),e=this.groups[b.name],e&&a.each(this.groups,function(b,c){c===e&&a("[name='"+b+"']",this.currentForm).attr("aria-describedby",g.attr("id"))}))),!c&&this.settings.success&&(g.text(""),"string"==typeof this.settings.success?g.addClass(this.settings.success):this.settings.success(g,b)),this.toShow=this.toShow.add(g)},errorsFor:function(b){var c=this.idOrName(b),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+d.replace(/\s+/g,", #")),this.errors().filter(e)},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")})},destroy:function(){this.resetForm(),a(this.currentForm).off(".validate").removeData("validator")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},normalizeAttributeRule:function(a,b,c,d){/min|max/.test(c)&&(null===b||/number|range|text/.test(b))&&(d=Number(d),isNaN(d)&&(d=void 0)),d||0===d?a[c]=d:b===c&&"range"!==b&&(a[c]=!0)},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),this.normalizeAttributeRule(e,g,c,d);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),this.normalizeAttributeRule(e,g,c,d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:delete b[d]}}),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:b.length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c,d,e=0,f=0,g=!1;if(a=a.replace(/\D/g,""),a.length<13||a.length>19)return!1;for(c=a.length-1;c>=0;c--)d=a.charAt(c),f=parseInt(d,10),g&&(f*=2)>9&&(f-=9),e+=f,g=!g;return e%10===0},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.off(".validate-equalTo").on("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e,f,g=this.previousValue(c);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),g.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=g.message,d="string"==typeof d&&{url:d}||d,g.old===b?g.valid:(g.old=b,e=this,this.startRequest(c),f={},f[c.name]=b,a.ajax(a.extend(!0,{mode:"abort",port:"validate"+c.name,dataType:"json",data:f,context:e.currentForm,success:function(d){var f,h,i,j=d===!0||"true"===d;e.settings.messages[c.name].remote=g.originalMessage,j?(i=e.formSubmitted,e.prepareElement(c),e.formSubmitted=i,e.successList.push(c),delete e.invalid[c.name],e.showErrors()):(f={},h=d||e.defaultMessage(c,"remote"),f[c.name]=g.message=a.isFunction(h)?h(b):h,e.invalid[c.name]=!0,e.showErrors(f)),g.valid=j,e.stopRequest(c,j)}},d)),"pending")}}});var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)})});
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return Rd.apply(null,arguments)}function b(a){Rd=a}function c(a){return"[object Array]"===Object.prototype.toString.call(a)}function d(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function e(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function f(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function g(a,b){for(var c in b)f(b,c)&&(a[c]=b[c]);return f(b,"toString")&&(a.toString=b.toString),f(b,"valueOf")&&(a.valueOf=b.valueOf),a}function h(a,b,c,d){return Da(a,b,c,d,!0).utc()}function i(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function j(a){return null==a._pf&&(a._pf=i()),a._pf}function k(a){if(null==a._isValid){var b=j(a);a._isValid=!(isNaN(a._d.getTime())||!(b.overflow<0)||b.empty||b.invalidMonth||b.invalidWeekday||b.nullInput||b.invalidFormat||b.userInvalidated),a._strict&&(a._isValid=a._isValid&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour)}return a._isValid}function l(a){var b=h(NaN);return null!=a?g(j(b),a):j(b).userInvalidated=!0,b}function m(a){return void 0===a}function n(a,b){var c,d,e;if(m(b._isAMomentObject)||(a._isAMomentObject=b._isAMomentObject),m(b._i)||(a._i=b._i),m(b._f)||(a._f=b._f),m(b._l)||(a._l=b._l),m(b._strict)||(a._strict=b._strict),m(b._tzm)||(a._tzm=b._tzm),m(b._isUTC)||(a._isUTC=b._isUTC),m(b._offset)||(a._offset=b._offset),m(b._pf)||(a._pf=j(b)),m(b._locale)||(a._locale=b._locale),Td.length>0)for(c in Td)d=Td[c],e=b[d],m(e)||(a[d]=e);return a}function o(b){n(this,b),this._d=new Date(null!=b._d?b._d.getTime():NaN),Ud===!1&&(Ud=!0,a.updateOffset(this),Ud=!1)}function p(a){return a instanceof o||null!=a&&null!=a._isAMomentObject}function q(a){return 0>a?Math.ceil(a):Math.floor(a)}function r(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=q(b)),c}function s(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&r(a[d])!==r(b[d]))&&g++;return g+f}function t(){}function u(a){return a?a.toLowerCase().replace("_","-"):a}function v(a){for(var b,c,d,e,f=0;f<a.length;){for(e=u(a[f]).split("-"),b=e.length,c=u(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=w(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&s(e,c,!0)>=b-1)break;b--}f++}return null}function w(a){var b=null;if(!Vd[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=Sd._abbr,require("./locale/"+a),x(b)}catch(c){}return Vd[a]}function x(a,b){var c;return a&&(c=m(b)?z(a):y(a,b),c&&(Sd=c)),Sd._abbr}function y(a,b){return null!==b?(b.abbr=a,Vd[a]=Vd[a]||new t,Vd[a].set(b),x(a),Vd[a]):(delete Vd[a],null)}function z(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return Sd;if(!c(a)){if(b=w(a))return b;a=[a]}return v(a)}function A(a,b){var c=a.toLowerCase();Wd[c]=Wd[c+"s"]=Wd[b]=a}function B(a){return"string"==typeof a?Wd[a]||Wd[a.toLowerCase()]:void 0}function C(a){var b,c,d={};for(c in a)f(a,c)&&(b=B(c),b&&(d[b]=a[c]));return d}function D(a){return a instanceof Function||"[object Function]"===Object.prototype.toString.call(a)}function E(b,c){return function(d){return null!=d?(G(this,b,d),a.updateOffset(this,c),this):F(this,b)}}function F(a,b){return a.isValid()?a._d["get"+(a._isUTC?"UTC":"")+b]():NaN}function G(a,b,c){a.isValid()&&a._d["set"+(a._isUTC?"UTC":"")+b](c)}function H(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else if(a=B(a),D(this[a]))return this[a](b);return this}function I(a,b,c){var d=""+Math.abs(a),e=b-d.length,f=a>=0;return(f?c?"+":"":"-")+Math.pow(10,Math.max(0,e)).toString().substr(1)+d}function J(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&($d[a]=e),b&&($d[b[0]]=function(){return I(e.apply(this,arguments),b[1],b[2])}),c&&($d[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function K(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function L(a){var b,c,d=a.match(Xd);for(b=0,c=d.length;c>b;b++)$d[d[b]]?d[b]=$d[d[b]]:d[b]=K(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function M(a,b){return a.isValid()?(b=N(b,a.localeData()),Zd[b]=Zd[b]||L(b),Zd[b](a)):a.localeData().invalidDate()}function N(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Yd.lastIndex=0;d>=0&&Yd.test(a);)a=a.replace(Yd,c),Yd.lastIndex=0,d-=1;return a}function O(a,b,c){qe[a]=D(b)?b:function(a,d){return a&&c?c:b}}function P(a,b){return f(qe,a)?qe[a](b._strict,b._locale):new RegExp(Q(a))}function Q(a){return R(a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}))}function R(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function S(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),"number"==typeof b&&(d=function(a,c){c[b]=r(a)}),c=0;c<a.length;c++)re[a[c]]=d}function T(a,b){S(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function U(a,b,c){null!=b&&f(re,a)&&re[a](b,c._a,c,a)}function V(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function W(a,b){return c(this._months)?this._months[a.month()]:this._months[Be.test(b)?"format":"standalone"][a.month()]}function X(a,b){return c(this._monthsShort)?this._monthsShort[a.month()]:this._monthsShort[Be.test(b)?"format":"standalone"][a.month()]}function Y(a,b,c){var d,e,f;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=h([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}function Z(a,b){var c;return a.isValid()?"string"==typeof b&&(b=a.localeData().monthsParse(b),"number"!=typeof b)?a:(c=Math.min(a.date(),V(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a):a}function $(b){return null!=b?(Z(this,b),a.updateOffset(this,!0),this):F(this,"Month")}function _(){return V(this.year(),this.month())}function aa(a){return this._monthsParseExact?(f(this,"_monthsRegex")||ca.call(this),a?this._monthsShortStrictRegex:this._monthsShortRegex):this._monthsShortStrictRegex&&a?this._monthsShortStrictRegex:this._monthsShortRegex}function ba(a){return this._monthsParseExact?(f(this,"_monthsRegex")||ca.call(this),a?this._monthsStrictRegex:this._monthsRegex):this._monthsStrictRegex&&a?this._monthsStrictRegex:this._monthsRegex}function ca(){function a(a,b){return b.length-a.length}var b,c,d=[],e=[],f=[];for(b=0;12>b;b++)c=h([2e3,b]),d.push(this.monthsShort(c,"")),e.push(this.months(c,"")),f.push(this.months(c,"")),f.push(this.monthsShort(c,""));for(d.sort(a),e.sort(a),f.sort(a),b=0;12>b;b++)d[b]=R(d[b]),e[b]=R(e[b]),f[b]=R(f[b]);this._monthsRegex=new RegExp("^("+f.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+e.join("|")+")$","i"),this._monthsShortStrictRegex=new RegExp("^("+d.join("|")+")$","i")}function da(a){var b,c=a._a;return c&&-2===j(a).overflow&&(b=c[te]<0||c[te]>11?te:c[ue]<1||c[ue]>V(c[se],c[te])?ue:c[ve]<0||c[ve]>24||24===c[ve]&&(0!==c[we]||0!==c[xe]||0!==c[ye])?ve:c[we]<0||c[we]>59?we:c[xe]<0||c[xe]>59?xe:c[ye]<0||c[ye]>999?ye:-1,j(a)._overflowDayOfYear&&(se>b||b>ue)&&(b=ue),j(a)._overflowWeeks&&-1===b&&(b=ze),j(a)._overflowWeekday&&-1===b&&(b=Ae),j(a).overflow=b),a}function ea(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function fa(a,b){var c=!0;return g(function(){return c&&(ea(a+"\nArguments: "+Array.prototype.slice.call(arguments).join(", ")+"\n"+(new Error).stack),c=!1),b.apply(this,arguments)},b)}function ga(a,b){Ge[a]||(ea(b),Ge[a]=!0)}function ha(a){var b,c,d,e,f,g,h=a._i,i=He.exec(h)||Ie.exec(h);if(i){for(j(a).iso=!0,b=0,c=Ke.length;c>b;b++)if(Ke[b][1].exec(i[1])){e=Ke[b][0],d=Ke[b][2]!==!1;break}if(null==e)return void(a._isValid=!1);if(i[3]){for(b=0,c=Le.length;c>b;b++)if(Le[b][1].exec(i[3])){f=(i[2]||" ")+Le[b][0];break}if(null==f)return void(a._isValid=!1)}if(!d&&null!=f)return void(a._isValid=!1);if(i[4]){if(!Je.exec(i[4]))return void(a._isValid=!1);g="Z"}a._f=e+(f||"")+(g||""),wa(a)}else a._isValid=!1}function ia(b){var c=Me.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(ha(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}function ja(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 100>a&&a>=0&&isFinite(h.getFullYear())&&h.setFullYear(a),h}function ka(a){var b=new Date(Date.UTC.apply(null,arguments));return 100>a&&a>=0&&isFinite(b.getUTCFullYear())&&b.setUTCFullYear(a),b}function la(a){return ma(a)?366:365}function ma(a){return a%4===0&&a%100!==0||a%400===0}function na(){return ma(this.year())}function oa(a,b,c){var d=7+b-c,e=(7+ka(a,0,d).getUTCDay()-b)%7;return-e+d-1}function pa(a,b,c,d,e){var f,g,h=(7+c-d)%7,i=oa(a,d,e),j=1+7*(b-1)+h+i;return 0>=j?(f=a-1,g=la(f)+j):j>la(a)?(f=a+1,g=j-la(a)):(f=a,g=j),{year:f,dayOfYear:g}}function qa(a,b,c){var d,e,f=oa(a.year(),b,c),g=Math.floor((a.dayOfYear()-f-1)/7)+1;return 1>g?(e=a.year()-1,d=g+ra(e,b,c)):g>ra(a.year(),b,c)?(d=g-ra(a.year(),b,c),e=a.year()+1):(e=a.year(),d=g),{week:d,year:e}}function ra(a,b,c){var d=oa(a,b,c),e=oa(a+1,b,c);return(la(a)-d+e)/7}function sa(a,b,c){return null!=a?a:null!=b?b:c}function ta(b){var c=new Date(a.now());return b._useUTC?[c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate()]:[c.getFullYear(),c.getMonth(),c.getDate()]}function ua(a){var b,c,d,e,f=[];if(!a._d){for(d=ta(a),a._w&&null==a._a[ue]&&null==a._a[te]&&va(a),a._dayOfYear&&(e=sa(a._a[se],d[se]),a._dayOfYear>la(e)&&(j(a)._overflowDayOfYear=!0),c=ka(e,0,a._dayOfYear),a._a[te]=c.getUTCMonth(),a._a[ue]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=f[b]=d[b];for(;7>b;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];24===a._a[ve]&&0===a._a[we]&&0===a._a[xe]&&0===a._a[ye]&&(a._nextDay=!0,a._a[ve]=0),a._d=(a._useUTC?ka:ja).apply(null,f),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[ve]=24)}}function va(a){var b,c,d,e,f,g,h,i;b=a._w,null!=b.GG||null!=b.W||null!=b.E?(f=1,g=4,c=sa(b.GG,a._a[se],qa(Ea(),1,4).year),d=sa(b.W,1),e=sa(b.E,1),(1>e||e>7)&&(i=!0)):(f=a._locale._week.dow,g=a._locale._week.doy,c=sa(b.gg,a._a[se],qa(Ea(),f,g).year),d=sa(b.w,1),null!=b.d?(e=b.d,(0>e||e>6)&&(i=!0)):null!=b.e?(e=b.e+f,(b.e<0||b.e>6)&&(i=!0)):e=f),1>d||d>ra(c,f,g)?j(a)._overflowWeeks=!0:null!=i?j(a)._overflowWeekday=!0:(h=pa(c,d,e,f,g),a._a[se]=h.year,a._dayOfYear=h.dayOfYear)}function wa(b){if(b._f===a.ISO_8601)return void ha(b);b._a=[],j(b).empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,k=0;for(e=N(b._f,b._locale).match(Xd)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(P(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&j(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),k+=d.length),$d[f]?(d?j(b).empty=!1:j(b).unusedTokens.push(f),U(f,d,b)):b._strict&&!d&&j(b).unusedTokens.push(f);j(b).charsLeftOver=i-k,h.length>0&&j(b).unusedInput.push(h),j(b).bigHour===!0&&b._a[ve]<=12&&b._a[ve]>0&&(j(b).bigHour=void 0),b._a[ve]=xa(b._locale,b._a[ve],b._meridiem),ua(b),da(b)}function xa(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function ya(a){var b,c,d,e,f;if(0===a._f.length)return j(a).invalidFormat=!0,void(a._d=new Date(NaN));for(e=0;e<a._f.length;e++)f=0,b=n({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],wa(b),k(b)&&(f+=j(b).charsLeftOver,f+=10*j(b).unusedTokens.length,j(b).score=f,(null==d||d>f)&&(d=f,c=b));g(a,c||b)}function za(a){if(!a._d){var b=C(a._i);a._a=e([b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],function(a){return a&&parseInt(a,10)}),ua(a)}}function Aa(a){var b=new o(da(Ba(a)));return b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b}function Ba(a){var b=a._i,e=a._f;return a._locale=a._locale||z(a._l),null===b||void 0===e&&""===b?l({nullInput:!0}):("string"==typeof b&&(a._i=b=a._locale.preparse(b)),p(b)?new o(da(b)):(c(e)?ya(a):e?wa(a):d(b)?a._d=b:Ca(a),k(a)||(a._d=null),a))}function Ca(b){var f=b._i;void 0===f?b._d=new Date(a.now()):d(f)?b._d=new Date(+f):"string"==typeof f?ia(b):c(f)?(b._a=e(f.slice(0),function(a){return parseInt(a,10)}),ua(b)):"object"==typeof f?za(b):"number"==typeof f?b._d=new Date(f):a.createFromInputFallback(b)}function Da(a,b,c,d,e){var f={};return"boolean"==typeof c&&(d=c,c=void 0),f._isAMomentObject=!0,f._useUTC=f._isUTC=e,f._l=c,f._i=a,f._f=b,f._strict=d,Aa(f)}function Ea(a,b,c,d){return Da(a,b,c,d,!1)}function Fa(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return Ea();for(d=b[0],e=1;e<b.length;++e)(!b[e].isValid()||b[e][a](d))&&(d=b[e]);return d}function Ga(){var a=[].slice.call(arguments,0);return Fa("isBefore",a)}function Ha(){var a=[].slice.call(arguments,0);return Fa("isAfter",a)}function Ia(a){var b=C(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=z(),this._bubble()}function Ja(a){return a instanceof Ia}function Ka(a,b){J(a,0,0,function(){var a=this.utcOffset(),c="+";return 0>a&&(a=-a,c="-"),c+I(~~(a/60),2)+b+I(~~a%60,2)})}function La(a,b){var c=(b||"").match(a)||[],d=c[c.length-1]||[],e=(d+"").match(Re)||["-",0,0],f=+(60*e[1])+r(e[2]);return"+"===e[0]?f:-f}function Ma(b,c){var e,f;return c._isUTC?(e=c.clone(),f=(p(b)||d(b)?+b:+Ea(b))-+e,e._d.setTime(+e._d+f),a.updateOffset(e,!1),e):Ea(b).local()}function Na(a){return 15*-Math.round(a._d.getTimezoneOffset()/15)}function Oa(b,c){var d,e=this._offset||0;return this.isValid()?null!=b?("string"==typeof b?b=La(ne,b):Math.abs(b)<16&&(b=60*b),!this._isUTC&&c&&(d=Na(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?cb(this,Za(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?e:Na(this):null!=b?this:NaN}function Pa(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Qa(a){return this.utcOffset(0,a)}function Ra(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Na(this),"m")),this}function Sa(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(La(me,this._i)),this}function Ta(a){return this.isValid()?(a=a?Ea(a).utcOffset():0,(this.utcOffset()-a)%60===0):!1}function Ua(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Va(){if(!m(this._isDSTShifted))return this._isDSTShifted;var a={};if(n(a,this),a=Ba(a),a._a){var b=a._isUTC?h(a._a):Ea(a._a);this._isDSTShifted=this.isValid()&&s(a._a,b.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function Wa(){return this.isValid()?!this._isUTC:!1}function Xa(){return this.isValid()?this._isUTC:!1}function Ya(){return this.isValid()?this._isUTC&&0===this._offset:!1}function Za(a,b){var c,d,e,g=a,h=null;return Ja(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(g={},b?g[b]=a:g.milliseconds=a):(h=Se.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:r(h[ue])*c,h:r(h[ve])*c,m:r(h[we])*c,s:r(h[xe])*c,ms:r(h[ye])*c}):(h=Te.exec(a))?(c="-"===h[1]?-1:1,g={y:$a(h[2],c),M:$a(h[3],c),d:$a(h[4],c),h:$a(h[5],c),m:$a(h[6],c),s:$a(h[7],c),w:$a(h[8],c)}):null==g?g={}:"object"==typeof g&&("from"in g||"to"in g)&&(e=ab(Ea(g.from),Ea(g.to)),g={},g.ms=e.milliseconds,g.M=e.months),d=new Ia(g),Ja(a)&&f(a,"_locale")&&(d._locale=a._locale),d}function $a(a,b){var c=a&&parseFloat(a.replace(",","."));return(isNaN(c)?0:c)*b}function _a(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function ab(a,b){var c;return a.isValid()&&b.isValid()?(b=Ma(b,a),a.isBefore(b)?c=_a(a,b):(c=_a(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c):{milliseconds:0,months:0}}function bb(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(ga(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=Za(c,d),cb(this,e,a),this}}function cb(b,c,d,e){var f=c._milliseconds,g=c._days,h=c._months;b.isValid()&&(e=null==e?!0:e,f&&b._d.setTime(+b._d+f*d),g&&G(b,"Date",F(b,"Date")+g*d),h&&Z(b,F(b,"Month")+h*d),e&&a.updateOffset(b,g||h))}function db(a,b){var c=a||Ea(),d=Ma(c,this).startOf("day"),e=this.diff(d,"days",!0),f=-6>e?"sameElse":-1>e?"lastWeek":0>e?"lastDay":1>e?"sameDay":2>e?"nextDay":7>e?"nextWeek":"sameElse",g=b&&(D(b[f])?b[f]():b[f]);return this.format(g||this.localeData().calendar(f,this,Ea(c)))}function eb(){return new o(this)}function fb(a,b){var c=p(a)?a:Ea(a);return this.isValid()&&c.isValid()?(b=B(m(b)?"millisecond":b),"millisecond"===b?+this>+c:+c<+this.clone().startOf(b)):!1}function gb(a,b){var c=p(a)?a:Ea(a);return this.isValid()&&c.isValid()?(b=B(m(b)?"millisecond":b),"millisecond"===b?+c>+this:+this.clone().endOf(b)<+c):!1}function hb(a,b,c){return this.isAfter(a,c)&&this.isBefore(b,c)}function ib(a,b){var c,d=p(a)?a:Ea(a);return this.isValid()&&d.isValid()?(b=B(b||"millisecond"),"millisecond"===b?+this===+d:(c=+d,+this.clone().startOf(b)<=c&&c<=+this.clone().endOf(b))):!1}function jb(a,b){return this.isSame(a,b)||this.isAfter(a,b)}function kb(a,b){return this.isSame(a,b)||this.isBefore(a,b)}function lb(a,b,c){var d,e,f,g;return this.isValid()?(d=Ma(a,this),d.isValid()?(e=6e4*(d.utcOffset()-this.utcOffset()),b=B(b),"year"===b||"month"===b||"quarter"===b?(g=mb(this,d),"quarter"===b?g/=3:"year"===b&&(g/=12)):(f=this-d,g="second"===b?f/1e3:"minute"===b?f/6e4:"hour"===b?f/36e5:"day"===b?(f-e)/864e5:"week"===b?(f-e)/6048e5:f),c?g:q(g)):NaN):NaN}function mb(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)}function nb(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function ob(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?D(Date.prototype.toISOString)?this.toDate().toISOString():M(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):M(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function pb(b){var c=M(this,b||a.defaultFormat);return this.localeData().postformat(c)}function qb(a,b){return this.isValid()&&(p(a)&&a.isValid()||Ea(a).isValid())?Za({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function rb(a){return this.from(Ea(),a)}function sb(a,b){return this.isValid()&&(p(a)&&a.isValid()||Ea(a).isValid())?Za({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function tb(a){return this.to(Ea(),a)}function ub(a){var b;return void 0===a?this._locale._abbr:(b=z(a),null!=b&&(this._locale=b),this)}function vb(){return this._locale}function wb(a){switch(a=B(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function xb(a){return a=B(a),void 0===a||"millisecond"===a?this:this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms")}function yb(){return+this._d-6e4*(this._offset||0)}function zb(){return Math.floor(+this/1e3)}function Ab(){return this._offset?new Date(+this):this._d}function Bb(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function Cb(){var a=this;return{years:a.year(),months:a.month(),date:a.date(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.milliseconds()}}function Db(){return this.isValid()?this.toISOString():"null"}function Eb(){return k(this)}function Fb(){return g({},j(this))}function Gb(){return j(this).overflow}function Hb(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function Ib(a,b){J(0,[a,a.length],0,b)}function Jb(a){return Nb.call(this,a,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function Kb(a){return Nb.call(this,a,this.isoWeek(),this.isoWeekday(),1,4)}function Lb(){return ra(this.year(),1,4)}function Mb(){var a=this.localeData()._week;return ra(this.year(),a.dow,a.doy)}function Nb(a,b,c,d,e){var f;return null==a?qa(this,d,e).year:(f=ra(a,d,e),b>f&&(b=f),Ob.call(this,a,b,c,d,e))}function Ob(a,b,c,d,e){var f=pa(a,b,c,d,e),g=ka(f.year,0,f.dayOfYear);return this.year(g.getUTCFullYear()),this.month(g.getUTCMonth()),this.date(g.getUTCDate()),this}function Pb(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}function Qb(a){return qa(a,this._week.dow,this._week.doy).week}function Rb(){return this._week.dow}function Sb(){return this._week.doy}function Tb(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function Ub(a){var b=qa(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}function Vb(a,b){return"string"!=typeof a?a:isNaN(a)?(a=b.weekdaysParse(a),"number"==typeof a?a:null):parseInt(a,10)}function Wb(a,b){return c(this._weekdays)?this._weekdays[a.day()]:this._weekdays[this._weekdays.isFormat.test(b)?"format":"standalone"][a.day()]}function Xb(a){return this._weekdaysShort[a.day()]}function Yb(a){return this._weekdaysMin[a.day()]}function Zb(a,b,c){var d,e,f;for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),d=0;7>d;d++){if(e=Ea([2e3,1]).day(d),c&&!this._fullWeekdaysParse[d]&&(this._fullWeekdaysParse[d]=new RegExp("^"+this.weekdays(e,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[d]=new RegExp("^"+this.weekdaysShort(e,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[d]=new RegExp("^"+this.weekdaysMin(e,"").replace(".",".?")+"$","i")),this._weekdaysParse[d]||(f="^"+this.weekdays(e,"")+"|^"+this.weekdaysShort(e,"")+"|^"+this.weekdaysMin(e,""),this._weekdaysParse[d]=new RegExp(f.replace(".",""),"i")),c&&"dddd"===b&&this._fullWeekdaysParse[d].test(a))return d;if(c&&"ddd"===b&&this._shortWeekdaysParse[d].test(a))return d;if(c&&"dd"===b&&this._minWeekdaysParse[d].test(a))return d;if(!c&&this._weekdaysParse[d].test(a))return d}}function $b(a){if(!this.isValid())return null!=a?this:NaN;var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=Vb(a,this.localeData()),this.add(a-b,"d")):b}function _b(a){if(!this.isValid())return null!=a?this:NaN;var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function ac(a){return this.isValid()?null==a?this.day()||7:this.day(this.day()%7?a:a-7):null!=a?this:NaN}function bc(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function cc(){return this.hours()%12||12}function dc(a,b){J(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}function ec(a,b){return b._meridiemParse}function fc(a){return"p"===(a+"").toLowerCase().charAt(0)}function gc(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function hc(a,b){b[ye]=r(1e3*("0."+a))}function ic(){return this._isUTC?"UTC":""}function jc(){return this._isUTC?"Coordinated Universal Time":""}function kc(a){return Ea(1e3*a)}function lc(){return Ea.apply(null,arguments).parseZone()}function mc(a,b,c){var d=this._calendar[a];return D(d)?d.call(b,c):d}function nc(a){var b=this._longDateFormat[a],c=this._longDateFormat[a.toUpperCase()];return b||!c?b:(this._longDateFormat[a]=c.replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a])}function oc(){return this._invalidDate}function pc(a){return this._ordinal.replace("%d",a)}function qc(a){return a}function rc(a,b,c,d){var e=this._relativeTime[c];return D(e)?e(a,b,c,d):e.replace(/%d/i,a)}function sc(a,b){var c=this._relativeTime[a>0?"future":"past"];return D(c)?c(b):c.replace(/%s/i,b)}function tc(a){var b,c;for(c in a)b=a[c],D(b)?this[c]=b:this["_"+c]=b;this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function uc(a,b,c,d){var e=z(),f=h().set(d,b);return e[c](f,a)}function vc(a,b,c,d,e){if("number"==typeof a&&(b=a,a=void 0),a=a||"",null!=b)return uc(a,b,c,e);var f,g=[];for(f=0;d>f;f++)g[f]=uc(a,f,c,e);return g}function wc(a,b){return vc(a,b,"months",12,"month")}function xc(a,b){return vc(a,b,"monthsShort",12,"month")}function yc(a,b){return vc(a,b,"weekdays",7,"day")}function zc(a,b){return vc(a,b,"weekdaysShort",7,"day")}function Ac(a,b){return vc(a,b,"weekdaysMin",7,"day")}function Bc(){var a=this._data;return this._milliseconds=qf(this._milliseconds),this._days=qf(this._days),this._months=qf(this._months),a.milliseconds=qf(a.milliseconds),a.seconds=qf(a.seconds),a.minutes=qf(a.minutes),a.hours=qf(a.hours),a.months=qf(a.months),a.years=qf(a.years),this}function Cc(a,b,c,d){var e=Za(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}function Dc(a,b){return Cc(this,a,b,1)}function Ec(a,b){return Cc(this,a,b,-1)}function Fc(a){return 0>a?Math.floor(a):Math.ceil(a)}function Gc(){var a,b,c,d,e,f=this._milliseconds,g=this._days,h=this._months,i=this._data;return f>=0&&g>=0&&h>=0||0>=f&&0>=g&&0>=h||(f+=864e5*Fc(Ic(h)+g),g=0,h=0),i.milliseconds=f%1e3,a=q(f/1e3),i.seconds=a%60,b=q(a/60),i.minutes=b%60,c=q(b/60),i.hours=c%24,g+=q(c/24),e=q(Hc(g)),h+=e,g-=Fc(Ic(e)),d=q(h/12),h%=12,i.days=g,i.months=h,i.years=d,this}function Hc(a){return 4800*a/146097}function Ic(a){return 146097*a/4800}function Jc(a){var b,c,d=this._milliseconds;if(a=B(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+Hc(b),"month"===a?c:c/12;switch(b=this._days+Math.round(Ic(this._months)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}function Kc(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*r(this._months/12)}function Lc(a){return function(){return this.as(a)}}function Mc(a){return a=B(a),this[a+"s"]()}function Nc(a){return function(){return this._data[a]}}function Oc(){return q(this.days()/7)}function Pc(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function Qc(a,b,c){var d=Za(a).abs(),e=Gf(d.as("s")),f=Gf(d.as("m")),g=Gf(d.as("h")),h=Gf(d.as("d")),i=Gf(d.as("M")),j=Gf(d.as("y")),k=e<Hf.s&&["s",e]||1>=f&&["m"]||f<Hf.m&&["mm",f]||1>=g&&["h"]||g<Hf.h&&["hh",g]||1>=h&&["d"]||h<Hf.d&&["dd",h]||1>=i&&["M"]||i<Hf.M&&["MM",i]||1>=j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,Pc.apply(null,k)}function Rc(a,b){return void 0===Hf[a]?!1:void 0===b?Hf[a]:(Hf[a]=b,!0)}function Sc(a){var b=this.localeData(),c=Qc(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function Tc(){var a,b,c,d=If(this._milliseconds)/1e3,e=If(this._days),f=If(this._months);a=q(d/60),b=q(a/60),d%=60,a%=60,c=q(f/12),f%=12;var g=c,h=f,i=e,j=b,k=a,l=d,m=this.asSeconds();return m?(0>m?"-":"")+"P"+(g?g+"Y":"")+(h?h+"M":"")+(i?i+"D":"")+(j||k||l?"T":"")+(j?j+"H":"")+(k?k+"M":"")+(l?l+"S":""):"P0D"}
//! moment.js locale configuration
//! locale : belarusian (be)
//! author : Dmitry Demidov : https://github.com/demidov91
//! author: Praleska: http://praleska.pro/
//! Author : Menelion Elensúle : https://github.com/Oire
function Uc(a,b){var c=a.split("_");return b%10===1&&b%100!==11?c[0]:b%10>=2&&4>=b%10&&(10>b%100||b%100>=20)?c[1]:c[2]}function Vc(a,b,c){var d={mm:b?"хвіліна_хвіліны_хвілін":"хвіліну_хвіліны_хвілін",hh:b?"гадзіна_гадзіны_гадзін":"гадзіну_гадзіны_гадзін",dd:"дзень_дні_дзён",MM:"месяц_месяцы_месяцаў",yy:"год_гады_гадоў"};return"m"===c?b?"хвіліна":"хвіліну":"h"===c?b?"гадзіна":"гадзіну":a+" "+Uc(d[c],+a)}
//! moment.js locale configuration
//! locale : breton (br)
//! author : Jean-Baptiste Le Duigou : https://github.com/jbleduigou
function Wc(a,b,c){var d={mm:"munutenn",MM:"miz",dd:"devezh"};return a+" "+Zc(d[c],a)}function Xc(a){switch(Yc(a)){case 1:case 3:case 4:case 5:case 9:return a+" bloaz";default:return a+" vloaz"}}function Yc(a){return a>9?Yc(a%10):a}function Zc(a,b){return 2===b?$c(a):a}function $c(a){var b={m:"v",b:"v",d:"z"};return void 0===b[a.charAt(0)]?a:b[a.charAt(0)]+a.substring(1)}
//! moment.js locale configuration
//! locale : bosnian (bs)
//! author : Nedim Cholich : https://github.com/frontyard
//! based on (hr) translation by Bojan Marković
function _c(a,b,c){var d=a+" ";switch(c){case"m":return b?"jedna minuta":"jedne minute";case"mm":return d+=1===a?"minuta":2===a||3===a||4===a?"minute":"minuta";case"h":return b?"jedan sat":"jednog sata";case"hh":return d+=1===a?"sat":2===a||3===a||4===a?"sata":"sati";case"dd":return d+=1===a?"dan":"dana";case"MM":return d+=1===a?"mjesec":2===a||3===a||4===a?"mjeseca":"mjeseci";case"yy":return d+=1===a?"godina":2===a||3===a||4===a?"godine":"godina"}}function ad(a){return a>1&&5>a&&1!==~~(a/10)}function bd(a,b,c,d){var e=a+" ";switch(c){case"s":return b||d?"pár sekund":"pár sekundami";case"m":return b?"minuta":d?"minutu":"minutou";case"mm":return b||d?e+(ad(a)?"minuty":"minut"):e+"minutami";break;case"h":return b?"hodina":d?"hodinu":"hodinou";case"hh":return b||d?e+(ad(a)?"hodiny":"hodin"):e+"hodinami";break;case"d":return b||d?"den":"dnem";case"dd":return b||d?e+(ad(a)?"dny":"dní"):e+"dny";break;case"M":return b||d?"měsíc":"měsícem";case"MM":return b||d?e+(ad(a)?"měsíce":"měsíců"):e+"měsíci";break;case"y":return b||d?"rok":"rokem";case"yy":return b||d?e+(ad(a)?"roky":"let"):e+"lety"}}
//! moment.js locale configuration
//! locale : austrian german (de-at)
//! author : lluchs : https://github.com/lluchs
//! author: Menelion Elensúle: https://github.com/Oire
//! author : Martin Groller : https://github.com/MadMG
//! author : Mikolaj Dadela : https://github.com/mik01aj
function cd(a,b,c,d){var e={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[a+" Tage",a+" Tagen"],M:["ein Monat","einem Monat"],MM:[a+" Monate",a+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[a+" Jahre",a+" Jahren"]};return b?e[c][0]:e[c][1]}
//! moment.js locale configuration
//! locale : german (de)
//! author : lluchs : https://github.com/lluchs
//! author: Menelion Elensúle: https://github.com/Oire
//! author : Mikolaj Dadela : https://github.com/mik01aj
function dd(a,b,c,d){var e={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[a+" Tage",a+" Tagen"],M:["ein Monat","einem Monat"],MM:[a+" Monate",a+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[a+" Jahre",a+" Jahren"]};return b?e[c][0]:e[c][1]}
//! moment.js locale configuration
//! locale : estonian (et)
//! author : Henry Kehlmann : https://github.com/madhenry
//! improvements : Illimar Tambek : https://github.com/ragulka
function ed(a,b,c,d){var e={s:["mõne sekundi","mõni sekund","paar sekundit"],m:["ühe minuti","üks minut"],mm:[a+" minuti",a+" minutit"],h:["ühe tunni","tund aega","üks tund"],hh:[a+" tunni",a+" tundi"],d:["ühe päeva","üks päev"],M:["kuu aja","kuu aega","üks kuu"],MM:[a+" kuu",a+" kuud"],y:["ühe aasta","aasta","üks aasta"],yy:[a+" aasta",a+" aastat"]};return b?e[c][2]?e[c][2]:e[c][1]:d?e[c][0]:e[c][1]}function fd(a,b,c,d){var e="";switch(c){case"s":return d?"muutaman sekunnin":"muutama sekunti";case"m":return d?"minuutin":"minuutti";case"mm":e=d?"minuutin":"minuuttia";break;case"h":return d?"tunnin":"tunti";case"hh":e=d?"tunnin":"tuntia";break;case"d":return d?"päivän":"päivä";case"dd":e=d?"päivän":"päivää";break;case"M":return d?"kuukauden":"kuukausi";case"MM":e=d?"kuukauden":"kuukautta";break;case"y":return d?"vuoden":"vuosi";case"yy":e=d?"vuoden":"vuotta"}return e=gd(a,d)+" "+e}function gd(a,b){return 10>a?b?fg[a]:eg[a]:a}
//! moment.js locale configuration
//! locale : hrvatski (hr)
//! author : Bojan Marković : https://github.com/bmarkovic
function hd(a,b,c){var d=a+" ";switch(c){case"m":return b?"jedna minuta":"jedne minute";case"mm":return d+=1===a?"minuta":2===a||3===a||4===a?"minute":"minuta";case"h":return b?"jedan sat":"jednog sata";case"hh":return d+=1===a?"sat":2===a||3===a||4===a?"sata":"sati";case"dd":return d+=1===a?"dan":"dana";case"MM":return d+=1===a?"mjesec":2===a||3===a||4===a?"mjeseca":"mjeseci";case"yy":return d+=1===a?"godina":2===a||3===a||4===a?"godine":"godina"}}function id(a,b,c,d){var e=a;switch(c){case"s":return d||b?"néhány másodperc":"néhány másodperce";case"m":return"egy"+(d||b?" perc":" perce");case"mm":return e+(d||b?" perc":" perce");case"h":return"egy"+(d||b?" óra":" órája");case"hh":return e+(d||b?" óra":" órája");case"d":return"egy"+(d||b?" nap":" napja");case"dd":return e+(d||b?" nap":" napja");case"M":return"egy"+(d||b?" hónap":" hónapja");case"MM":return e+(d||b?" hónap":" hónapja");case"y":return"egy"+(d||b?" év":" éve");case"yy":return e+(d||b?" év":" éve")}return""}function jd(a){return(a?"":"[múlt] ")+"["+pg[this.day()]+"] LT[-kor]"}
//! moment.js locale configuration
//! locale : icelandic (is)
//! author : Hinrik Örn Sigurðsson : https://github.com/hinrik
function kd(a){return a%100===11?!0:a%10===1?!1:!0}function ld(a,b,c,d){var e=a+" ";switch(c){case"s":return b||d?"nokkrar sekúndur":"nokkrum sekúndum";case"m":return b?"mínúta":"mínútu";case"mm":return kd(a)?e+(b||d?"mínútur":"mínútum"):b?e+"mínúta":e+"mínútu";case"hh":return kd(a)?e+(b||d?"klukkustundir":"klukkustundum"):e+"klukkustund";case"d":return b?"dagur":d?"dag":"degi";case"dd":return kd(a)?b?e+"dagar":e+(d?"daga":"dögum"):b?e+"dagur":e+(d?"dag":"degi");case"M":return b?"mánuður":d?"mánuð":"mánuði";case"MM":return kd(a)?b?e+"mánuðir":e+(d?"mánuði":"mánuðum"):b?e+"mánuður":e+(d?"mánuð":"mánuði");case"y":return b||d?"ár":"ári";case"yy":return kd(a)?e+(b||d?"ár":"árum"):e+(b||d?"ár":"ári")}}
//! moment.js locale configuration
//! locale : Luxembourgish (lb)
//! author : mweimerskirch : https://github.com/mweimerskirch, David Raison : https://github.com/kwisatz
function md(a,b,c,d){var e={m:["eng Minutt","enger Minutt"],h:["eng Stonn","enger Stonn"],d:["een Dag","engem Dag"],M:["ee Mount","engem Mount"],y:["ee Joer","engem Joer"]};return b?e[c][0]:e[c][1]}function nd(a){var b=a.substr(0,a.indexOf(" "));return pd(b)?"a "+a:"an "+a}function od(a){var b=a.substr(0,a.indexOf(" "));return pd(b)?"viru "+a:"virun "+a}function pd(a){if(a=parseInt(a,10),isNaN(a))return!1;if(0>a)return!0;if(10>a)return a>=4&&7>=a?!0:!1;if(100>a){var b=a%10,c=a/10;return pd(0===b?c:b)}if(1e4>a){for(;a>=10;)a/=10;return pd(a)}return a/=1e3,pd(a)}function qd(a,b,c,d){return b?"kelios sekundės":d?"kelių sekundžių":"kelias sekundes"}function rd(a,b,c,d){return b?td(c)[0]:d?td(c)[1]:td(c)[2]}function sd(a){return a%10===0||a>10&&20>a}function td(a){return rg[a].split("_")}function ud(a,b,c,d){var e=a+" ";return 1===a?e+rd(a,b,c[0],d):b?e+(sd(a)?td(c)[1]:td(c)[0]):d?e+td(c)[1]:e+(sd(a)?td(c)[1]:td(c)[2])}function vd(a,b,c){return c?b%10===1&&11!==b?a[2]:a[3]:b%10===1&&11!==b?a[0]:a[1]}function wd(a,b,c){return a+" "+vd(sg[c],a,b)}function xd(a,b,c){return vd(sg[c],a,b)}function yd(a,b){return b?"dažas sekundes":"dažām sekundēm"}function zd(a,b,c,d){var e="";if(b)switch(c){case"s":e="काही सेकंद";break;case"m":e="एक मिनिट";break;case"mm":e="%d मिनिटे";break;case"h":e="एक तास";break;case"hh":e="%d तास";break;case"d":e="एक दिवस";break;case"dd":e="%d दिवस";break;case"M":e="एक महिना";break;case"MM":e="%d महिने";break;case"y":e="एक वर्ष";break;case"yy":e="%d वर्षे"}else switch(c){case"s":e="काही सेकंदां";break;case"m":e="एका मिनिटा";break;case"mm":e="%d मिनिटां";break;case"h":e="एका तासा";break;case"hh":e="%d तासां";break;case"d":e="एका दिवसा";break;case"dd":e="%d दिवसां";break;case"M":e="एका महिन्या";break;case"MM":e="%d महिन्यां";break;case"y":e="एका वर्षा";break;case"yy":e="%d वर्षां"}return e.replace(/%d/i,a)}function Ad(a){return 5>a%10&&a%10>1&&~~(a/10)%10!==1}function Bd(a,b,c){var d=a+" ";switch(c){case"m":return b?"minuta":"minutę";case"mm":return d+(Ad(a)?"minuty":"minut");case"h":return b?"godzina":"godzinę";case"hh":return d+(Ad(a)?"godziny":"godzin");case"MM":return d+(Ad(a)?"miesiące":"miesięcy");case"yy":return d+(Ad(a)?"lata":"lat")}}
//! moment.js locale configuration
//! locale : romanian (ro)
//! author : Vlad Gurdiga : https://github.com/gurdiga
//! author : Valentin Agachi : https://github.com/avaly
function Cd(a,b,c){var d={mm:"minute",hh:"ore",dd:"zile",MM:"luni",yy:"ani"},e=" ";return(a%100>=20||a>=100&&a%100===0)&&(e=" de "),a+e+d[c]}
//! moment.js locale configuration
//! locale : russian (ru)
//! author : Viktorminator : https://github.com/Viktorminator
//! Author : Menelion Elensúle : https://github.com/Oire
function Dd(a,b){var c=a.split("_");return b%10===1&&b%100!==11?c[0]:b%10>=2&&4>=b%10&&(10>b%100||b%100>=20)?c[1]:c[2]}function Ed(a,b,c){var d={mm:b?"минута_минуты_минут":"минуту_минуты_минут",hh:"час_часа_часов",dd:"день_дня_дней",MM:"месяц_месяца_месяцев",yy:"год_года_лет"};return"m"===c?b?"минута":"минуту":a+" "+Dd(d[c],+a)}function Fd(a){return a>1&&5>a}function Gd(a,b,c,d){var e=a+" ";switch(c){case"s":return b||d?"pár sekúnd":"pár sekundami";case"m":return b?"minúta":d?"minútu":"minútou";case"mm":return b||d?e+(Fd(a)?"minúty":"minút"):e+"minútami";break;case"h":return b?"hodina":d?"hodinu":"hodinou";case"hh":return b||d?e+(Fd(a)?"hodiny":"hodín"):e+"hodinami";break;case"d":return b||d?"deň":"dňom";case"dd":return b||d?e+(Fd(a)?"dni":"dní"):e+"dňami";break;case"M":return b||d?"mesiac":"mesiacom";case"MM":return b||d?e+(Fd(a)?"mesiace":"mesiacov"):e+"mesiacmi";break;case"y":return b||d?"rok":"rokom";case"yy":return b||d?e+(Fd(a)?"roky":"rokov"):e+"rokmi"}}
//! moment.js locale configuration
//! locale : slovenian (sl)
//! author : Robert Sedovšek : https://github.com/sedovsek
function Hd(a,b,c,d){var e=a+" ";switch(c){case"s":return b||d?"nekaj sekund":"nekaj sekundami";case"m":return b?"ena minuta":"eno minuto";case"mm":return e+=1===a?b?"minuta":"minuto":2===a?b||d?"minuti":"minutama":5>a?b||d?"minute":"minutami":b||d?"minut":"minutami";case"h":return b?"ena ura":"eno uro";case"hh":return e+=1===a?b?"ura":"uro":2===a?b||d?"uri":"urama":5>a?b||d?"ure":"urami":b||d?"ur":"urami";case"d":return b||d?"en dan":"enim dnem";case"dd":return e+=1===a?b||d?"dan":"dnem":2===a?b||d?"dni":"dnevoma":b||d?"dni":"dnevi";case"M":return b||d?"en mesec":"enim mesecem";case"MM":return e+=1===a?b||d?"mesec":"mesecem":2===a?b||d?"meseca":"mesecema":5>a?b||d?"mesece":"meseci":b||d?"mesecev":"meseci";case"y":return b||d?"eno leto":"enim letom";case"yy":return e+=1===a?b||d?"leto":"letom":2===a?b||d?"leti":"letoma":5>a?b||d?"leta":"leti":b||d?"let":"leti"}}function Id(a){var b=a;return b=-1!==a.indexOf("jaj")?b.slice(0,-3)+"leS":-1!==a.indexOf("jar")?b.slice(0,-3)+"waQ":-1!==a.indexOf("DIS")?b.slice(0,-3)+"nem":b+" pIq"}function Jd(a){var b=a;return b=-1!==a.indexOf("jaj")?b.slice(0,-3)+"Hu’":-1!==a.indexOf("jar")?b.slice(0,-3)+"wen":-1!==a.indexOf("DIS")?b.slice(0,-3)+"ben":b+" ret"}function Kd(a,b,c,d){var e=Ld(a);switch(c){case"mm":return e+" tup";case"hh":return e+" rep";case"dd":return e+" jaj";case"MM":return e+" jar";case"yy":return e+" DIS"}}function Ld(a){var b=Math.floor(a%1e3/100),c=Math.floor(a%100/10),d=a%10,e="";return b>0&&(e+=Lg[b]+"vatlh"),c>0&&(e+=(""!==e?" ":"")+Lg[c]+"maH"),d>0&&(e+=(""!==e?" ":"")+Lg[d]),""===e?"pagh":e}function Md(a,b,c,d){var e={s:["viensas secunds","'iensas secunds"],m:["'n míut","'iens míut"],mm:[a+" míuts",""+a+" míuts"],h:["'n þora","'iensa þora"],hh:[a+" þoras",""+a+" þoras"],d:["'n ziua","'iensa ziua"],dd:[a+" ziuas",""+a+" ziuas"],M:["'n mes","'iens mes"],MM:[a+" mesen",""+a+" mesen"],y:["'n ar","'iens ar"],yy:[a+" ars",""+a+" ars"]};return d?e[c][0]:b?e[c][0]:e[c][1]}
//! moment.js locale configuration
//! locale : ukrainian (uk)
//! author : zemlanin : https://github.com/zemlanin
//! Author : Menelion Elensúle : https://github.com/Oire
function Nd(a,b){var c=a.split("_");return b%10===1&&b%100!==11?c[0]:b%10>=2&&4>=b%10&&(10>b%100||b%100>=20)?c[1]:c[2]}function Od(a,b,c){var d={mm:b?"хвилина_хвилини_хвилин":"хвилину_хвилини_хвилин",hh:b?"година_години_годин":"годину_години_годин",dd:"день_дні_днів",MM:"місяць_місяці_місяців",yy:"рік_роки_років"};return"m"===c?b?"хвилина":"хвилину":"h"===c?b?"година":"годину":a+" "+Nd(d[c],+a)}function Pd(a,b){var c={nominative:"неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),accusative:"неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"),genitive:"неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split("_")},d=/(\[[ВвУу]\]) ?dddd/.test(b)?"accusative":/\[?(?:минулої|наступної)? ?\] ?dddd/.test(b)?"genitive":"nominative";return c[d][a.day()]}function Qd(a){return function(){return a+"о"+(11===this.hours()?"б":"")+"] LT"}}var Rd,Sd,Td=a.momentProperties=[],Ud=!1,Vd={},Wd={},Xd=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Yd=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Zd={},$d={},_d=/\d/,ae=/\d\d/,be=/\d{3}/,ce=/\d{4}/,de=/[+-]?\d{6}/,ee=/\d\d?/,fe=/\d\d\d\d?/,ge=/\d\d\d\d\d\d?/,he=/\d{1,3}/,ie=/\d{1,4}/,je=/[+-]?\d{1,6}/,ke=/\d+/,le=/[+-]?\d+/,me=/Z|[+-]\d\d:?\d\d/gi,ne=/Z|[+-]\d\d(?::?\d\d)?/gi,oe=/[+-]?\d+(\.\d{1,3})?/,pe=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,qe={},re={},se=0,te=1,ue=2,ve=3,we=4,xe=5,ye=6,ze=7,Ae=8;J("M",["MM",2],"Mo",function(){return this.month()+1}),J("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),J("MMMM",0,0,function(a){return this.localeData().months(this,a)}),A("month","M"),O("M",ee),O("MM",ee,ae),O("MMM",function(a,b){return b.monthsShortRegex(a)}),O("MMMM",function(a,b){return b.monthsRegex(a)}),S(["M","MM"],function(a,b){b[te]=r(a)-1}),S(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);null!=e?b[te]=e:j(c).invalidMonth=a});var Be=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,Ce="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),De="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),Ee=pe,Fe=pe,Ge={};a.suppressDeprecationWarnings=!1;var He=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,Ie=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,Je=/Z|[+-]\d\d(?::?\d\d)?/,Ke=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],Le=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],Me=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=fa("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),J("Y",0,0,function(){var a=this.year();return 9999>=a?""+a:"+"+a}),J(0,["YY",2],0,function(){return this.year()%100}),J(0,["YYYY",4],0,"year"),J(0,["YYYYY",5],0,"year"),J(0,["YYYYYY",6,!0],0,"year"),A("year","y"),O("Y",le),O("YY",ee,ae),O("YYYY",ie,ce),O("YYYYY",je,de),O("YYYYYY",je,de),S(["YYYYY","YYYYYY"],se),S("YYYY",function(b,c){c[se]=2===b.length?a.parseTwoDigitYear(b):r(b)}),S("YY",function(b,c){c[se]=a.parseTwoDigitYear(b)}),S("Y",function(a,b){b[se]=parseInt(a,10)}),a.parseTwoDigitYear=function(a){return r(a)+(r(a)>68?1900:2e3)};var Ne=E("FullYear",!1);a.ISO_8601=function(){};var Oe=fa("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var a=Ea.apply(null,arguments);return this.isValid()&&a.isValid()?this>a?this:a:l()}),Pe=fa("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var a=Ea.apply(null,arguments);return this.isValid()&&a.isValid()?a>this?this:a:l()}),Qe=function(){return Date.now?Date.now():+new Date};Ka("Z",":"),Ka("ZZ",""),O("Z",ne),O("ZZ",ne),S(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=La(ne,a)});var Re=/([\+\-]|\d\d)/gi;a.updateOffset=function(){};var Se=/(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,Te=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;Za.fn=Ia.prototype;var Ue=bb(1,"add"),Ve=bb(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";var We=fa("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});J(0,["gg",2],0,function(){return this.weekYear()%100}),J(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Ib("gggg","weekYear"),Ib("ggggg","weekYear"),Ib("GGGG","isoWeekYear"),Ib("GGGGG","isoWeekYear"),A("weekYear","gg"),A("isoWeekYear","GG"),O("G",le),O("g",le),O("GG",ee,ae),O("gg",ee,ae),O("GGGG",ie,ce),O("gggg",ie,ce),O("GGGGG",je,de),O("ggggg",je,de),T(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=r(a)}),T(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),J("Q",0,"Qo","quarter"),A("quarter","Q"),O("Q",_d),S("Q",function(a,b){b[te]=3*(r(a)-1)}),J("w",["ww",2],"wo","week"),J("W",["WW",2],"Wo","isoWeek"),A("week","w"),A("isoWeek","W"),O("w",ee),O("ww",ee,ae),O("W",ee),O("WW",ee,ae),T(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=r(a)});var Xe={dow:0,doy:6};J("D",["DD",2],"Do","date"),A("date","D"),O("D",ee),O("DD",ee,ae),O("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),S(["D","DD"],ue),S("Do",function(a,b){b[ue]=r(a.match(ee)[0],10)});var Ye=E("Date",!0);J("d",0,"do","day"),J("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),J("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),J("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),J("e",0,0,"weekday"),J("E",0,0,"isoWeekday"),A("day","d"),A("weekday","e"),A("isoWeekday","E"),O("d",ee),O("e",ee),O("E",ee),O("dd",pe),O("ddd",pe),O("dddd",pe),T(["dd","ddd","dddd"],function(a,b,c,d){var e=c._locale.weekdaysParse(a,d,c._strict);null!=e?b.d=e:j(c).invalidWeekday=a}),T(["d","e","E"],function(a,b,c,d){b[d]=r(a)});var Ze="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),$e="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),_e="Su_Mo_Tu_We_Th_Fr_Sa".split("_");J("DDD",["DDDD",3],"DDDo","dayOfYear"),A("dayOfYear","DDD"),O("DDD",he),O("DDDD",be),S(["DDD","DDDD"],function(a,b,c){c._dayOfYear=r(a)}),J("H",["HH",2],0,"hour"),J("h",["hh",2],0,cc),J("hmm",0,0,function(){return""+cc.apply(this)+I(this.minutes(),2)}),J("hmmss",0,0,function(){return""+cc.apply(this)+I(this.minutes(),2)+I(this.seconds(),2)}),J("Hmm",0,0,function(){return""+this.hours()+I(this.minutes(),2)}),J("Hmmss",0,0,function(){return""+this.hours()+I(this.minutes(),2)+I(this.seconds(),2)}),dc("a",!0),dc("A",!1),A("hour","h"),O("a",ec),O("A",ec),O("H",ee),O("h",ee),O("HH",ee,ae),O("hh",ee,ae),O("hmm",fe),O("hmmss",ge),O("Hmm",fe),O("Hmmss",ge),S(["H","HH"],ve),S(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),S(["h","hh"],function(a,b,c){b[ve]=r(a),j(c).bigHour=!0}),S("hmm",function(a,b,c){var d=a.length-2;b[ve]=r(a.substr(0,d)),b[we]=r(a.substr(d)),j(c).bigHour=!0}),S("hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[ve]=r(a.substr(0,d)),b[we]=r(a.substr(d,2)),b[xe]=r(a.substr(e)),j(c).bigHour=!0}),S("Hmm",function(a,b,c){var d=a.length-2;b[ve]=r(a.substr(0,d)),b[we]=r(a.substr(d))}),S("Hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[ve]=r(a.substr(0,d)),b[we]=r(a.substr(d,2)),b[xe]=r(a.substr(e))});var af=/[ap]\.?m?\.?/i,bf=E("Hours",!0);J("m",["mm",2],0,"minute"),A("minute","m"),O("m",ee),O("mm",ee,ae),S(["m","mm"],we);var cf=E("Minutes",!1);J("s",["ss",2],0,"second"),A("second","s"),O("s",ee),O("ss",ee,ae),S(["s","ss"],xe);var df=E("Seconds",!1);J("S",0,0,function(){return~~(this.millisecond()/100)}),J(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),J(0,["SSS",3],0,"millisecond"),J(0,["SSSS",4],0,function(){return 10*this.millisecond()}),J(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),J(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),J(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),J(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),J(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),A("millisecond","ms"),O("S",he,_d),O("SS",he,ae),O("SSS",he,be);var ef;for(ef="SSSS";ef.length<=9;ef+="S")O(ef,ke);for(ef="S";ef.length<=9;ef+="S")S(ef,hc);var ff=E("Milliseconds",!1);J("z",0,0,"zoneAbbr"),J("zz",0,0,"zoneName");var gf=o.prototype;gf.add=Ue,gf.calendar=db,gf.clone=eb,gf.diff=lb,gf.endOf=xb,gf.format=pb,gf.from=qb,gf.fromNow=rb,gf.to=sb,gf.toNow=tb,gf.get=H,gf.invalidAt=Gb,gf.isAfter=fb,gf.isBefore=gb,gf.isBetween=hb,gf.isSame=ib,gf.isSameOrAfter=jb,gf.isSameOrBefore=kb,gf.isValid=Eb,gf.lang=We,gf.locale=ub,gf.localeData=vb,gf.max=Pe,gf.min=Oe,gf.parsingFlags=Fb,gf.set=H,gf.startOf=wb,gf.subtract=Ve,gf.toArray=Bb,gf.toObject=Cb,gf.toDate=Ab,gf.toISOString=ob,gf.toJSON=Db,gf.toString=nb,gf.unix=zb,gf.valueOf=yb,gf.creationData=Hb,gf.year=Ne,gf.isLeapYear=na,gf.weekYear=Jb,gf.isoWeekYear=Kb,gf.quarter=gf.quarters=Pb,gf.month=$,gf.daysInMonth=_,gf.week=gf.weeks=Tb,gf.isoWeek=gf.isoWeeks=Ub,gf.weeksInYear=Mb,gf.isoWeeksInYear=Lb,gf.date=Ye,gf.day=gf.days=$b,gf.weekday=_b,gf.isoWeekday=ac,gf.dayOfYear=bc,gf.hour=gf.hours=bf,gf.minute=gf.minutes=cf,gf.second=gf.seconds=df,gf.millisecond=gf.milliseconds=ff,gf.utcOffset=Oa,gf.utc=Qa,gf.local=Ra,gf.parseZone=Sa,gf.hasAlignedHourOffset=Ta,gf.isDST=Ua,gf.isDSTShifted=Va,gf.isLocal=Wa,gf.isUtcOffset=Xa,gf.isUtc=Ya,gf.isUTC=Ya,gf.zoneAbbr=ic,gf.zoneName=jc,gf.dates=fa("dates accessor is deprecated. Use date instead.",Ye),gf.months=fa("months accessor is deprecated. Use month instead",$),gf.years=fa("years accessor is deprecated. Use year instead",Ne),gf.zone=fa("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",Pa);var hf=gf,jf={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},kf={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},lf="Invalid date",mf="%d",nf=/\d{1,2}/,of={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},pf=t.prototype;pf._calendar=jf,pf.calendar=mc,pf._longDateFormat=kf,pf.longDateFormat=nc,pf._invalidDate=lf,pf.invalidDate=oc,pf._ordinal=mf,pf.ordinal=pc,pf._ordinalParse=nf,pf.preparse=qc,pf.postformat=qc,pf._relativeTime=of,pf.relativeTime=rc,pf.pastFuture=sc,pf.set=tc,pf.months=W,pf._months=Ce,pf.monthsShort=X,pf._monthsShort=De,pf.monthsParse=Y,pf._monthsRegex=Fe,pf.monthsRegex=ba,pf._monthsShortRegex=Ee,pf.monthsShortRegex=aa,pf.week=Qb,pf._week=Xe,pf.firstDayOfYear=Sb,pf.firstDayOfWeek=Rb,pf.weekdays=Wb,pf._weekdays=Ze,pf.weekdaysMin=Yb,pf._weekdaysMin=_e,pf.weekdaysShort=Xb,pf._weekdaysShort=$e,pf.weekdaysParse=Zb,pf.isPM=fc,pf._meridiemParse=af,pf.meridiem=gc,x("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===r(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),a.lang=fa("moment.lang is deprecated. Use moment.locale instead.",x),a.langData=fa("moment.langData is deprecated. Use moment.localeData instead.",z);var qf=Math.abs,rf=Lc("ms"),sf=Lc("s"),tf=Lc("m"),uf=Lc("h"),vf=Lc("d"),wf=Lc("w"),xf=Lc("M"),yf=Lc("y"),zf=Nc("milliseconds"),Af=Nc("seconds"),Bf=Nc("minutes"),Cf=Nc("hours"),Df=Nc("days"),Ef=Nc("months"),Ff=Nc("years"),Gf=Math.round,Hf={s:45,m:45,h:22,d:26,M:11},If=Math.abs,Jf=Ia.prototype;Jf.abs=Bc,Jf.add=Dc,Jf.subtract=Ec,Jf.as=Jc,Jf.asMilliseconds=rf,Jf.asSeconds=sf,Jf.asMinutes=tf,Jf.asHours=uf,Jf.asDays=vf,Jf.asWeeks=wf,Jf.asMonths=xf,Jf.asYears=yf,Jf.valueOf=Kc,Jf._bubble=Gc,Jf.get=Mc,Jf.milliseconds=zf,Jf.seconds=Af,Jf.minutes=Bf,Jf.hours=Cf,Jf.days=Df,Jf.weeks=Oc,Jf.months=Ef,Jf.years=Ff,Jf.humanize=Sc,Jf.toISOString=Tc,Jf.toString=Tc,Jf.toJSON=Tc,Jf.locale=ub,Jf.localeData=vb,Jf.toIsoString=fa("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Tc),Jf.lang=We,J("X",0,0,"unix"),J("x",0,0,"valueOf"),O("x",le),O("X",oe),S("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),S("x",function(a,b,c){c._d=new Date(r(a))}),
//! moment.js
//! version : 2.11.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
a.version="2.11.1",b(Ea),a.fn=hf,a.min=Ga,a.max=Ha,a.now=Qe,a.utc=h,a.unix=kc,a.months=wc,a.isDate=d,a.locale=x,a.invalid=l,a.duration=Za,a.isMoment=p,a.weekdays=yc,a.parseZone=lc,a.localeData=z,a.isDuration=Ja,a.monthsShort=xc,a.weekdaysMin=Ac,a.defineLocale=y,a.weekdaysShort=zc,a.normalizeUnits=B,a.relativeTimeThreshold=Rc,a.prototype=hf;var Kf=a,Lf=(Kf.defineLocale("af",{months:"Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"),weekdays:"Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"),weekdaysShort:"Son_Maa_Din_Woe_Don_Vry_Sat".split("_"),weekdaysMin:"So_Ma_Di_Wo_Do_Vr_Sa".split("_"),meridiemParse:/vm|nm/i,isPM:function(a){return/^nm$/i.test(a)},meridiem:function(a,b,c){return 12>a?c?"vm":"VM":c?"nm":"NM"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Vandag om] LT",nextDay:"[Môre om] LT",nextWeek:"dddd [om] LT",lastDay:"[Gister om] LT",lastWeek:"[Laas] dddd [om] LT",sameElse:"L"},relativeTime:{future:"oor %s",past:"%s gelede",s:"'n paar sekondes",m:"'n minuut",mm:"%d minute",h:"'n uur",hh:"%d ure",d:"'n dag",dd:"%d dae",M:"'n maand",MM:"%d maande",y:"'n jaar",yy:"%d jaar"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(a){return a+(1===a||8===a||a>=20?"ste":"de")},week:{dow:1,doy:4}}),Kf.defineLocale("ar-ma",{months:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),monthsShort:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),weekdays:"الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},week:{dow:6,doy:12}}),{1:"١",2:"٢",3:"٣",4:"٤",5:"٥",6:"٦",7:"٧",8:"٨",9:"٩",0:"٠"}),Mf={"١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","٠":"0"},Nf=(Kf.defineLocale("ar-sa",{months:"يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),monthsShort:"يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/ص|م/,isPM:function(a){return"م"===a},meridiem:function(a,b,c){return 12>a?"ص":"م"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},preparse:function(a){return a.replace(/[١٢٣٤٥٦٧٨٩٠]/g,function(a){return Mf[a]}).replace(/،/g,",")},postformat:function(a){return a.replace(/\d/g,function(a){return Lf[a]}).replace(/,/g,"،")},week:{dow:6,doy:12}}),Kf.defineLocale("ar-tn",{months:"جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),monthsShort:"جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},week:{dow:1,doy:4}}),{1:"١",2:"٢",3:"٣",4:"٤",5:"٥",6:"٦",7:"٧",8:"٨",9:"٩",0:"٠"}),Of={"١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","٠":"0"},Pf=function(a){return 0===a?0:1===a?1:2===a?2:a%100>=3&&10>=a%100?3:a%100>=11?4:5},Qf={s:["أقل من ثانية","ثانية واحدة",["ثانيتان","ثانيتين"],"%d ثوان","%d ثانية","%d ثانية"],m:["أقل من دقيقة","دقيقة واحدة",["دقيقتان","دقيقتين"],"%d دقائق","%d دقيقة","%d دقيقة"],h:["أقل من ساعة","ساعة واحدة",["ساعتان","ساعتين"],"%d ساعات","%d ساعة","%d ساعة"],d:["أقل من يوم","يوم واحد",["يومان","يومين"],"%d أيام","%d يومًا","%d يوم"],M:["أقل من شهر","شهر واحد",["شهران","شهرين"],"%d أشهر","%d شهرا","%d شهر"],y:["أقل من عام","عام واحد",["عامان","عامين"],"%d أعوام","%d عامًا","%d عام"]},Rf=function(a){return function(b,c,d,e){var f=Pf(b),g=Qf[a][Pf(b)];return 2===f&&(g=g[c?0:1]),g.replace(/%d/i,b)}},Sf=["كانون الثاني يناير","شباط فبراير","آذار مارس","نيسان أبريل","أيار مايو","حزيران يونيو","تموز يوليو","آب أغسطس","أيلول سبتمبر","تشرين الأول أكتوبر","تشرين الثاني نوفمبر","كانون الأول ديسمبر"],Tf=(Kf.defineLocale("ar",{months:Sf,monthsShort:Sf,weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/‏M/‏YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/ص|م/,isPM:function(a){return"م"===a},meridiem:function(a,b,c){return 12>a?"ص":"م"},calendar:{sameDay:"[اليوم عند الساعة] LT",nextDay:"[غدًا عند الساعة] LT",nextWeek:"dddd [عند الساعة] LT",lastDay:"[أمس عند الساعة] LT",lastWeek:"dddd [عند الساعة] LT",sameElse:"L"},relativeTime:{future:"بعد %s",past:"منذ %s",s:Rf("s"),m:Rf("m"),mm:Rf("m"),h:Rf("h"),hh:Rf("h"),d:Rf("d"),dd:Rf("d"),M:Rf("M"),MM:Rf("M"),y:Rf("y"),yy:Rf("y")},preparse:function(a){return a.replace(/\u200f/g,"").replace(/[١٢٣٤٥٦٧٨٩٠]/g,function(a){return Of[a]}).replace(/،/g,",")},postformat:function(a){return a.replace(/\d/g,function(a){return Nf[a]}).replace(/,/g,"،")},week:{dow:6,doy:12}}),{1:"-inci",5:"-inci",8:"-inci",70:"-inci",80:"-inci",2:"-nci",7:"-nci",20:"-nci",50:"-nci",3:"-üncü",4:"-üncü",100:"-üncü",6:"-ncı",9:"-uncu",10:"-uncu",30:"-uncu",60:"-ıncı",90:"-ıncı"}),Uf=(Kf.defineLocale("az",{months:"yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),monthsShort:"yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),weekdays:"Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə".split("_"),weekdaysShort:"Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən".split("_"),weekdaysMin:"Bz_BE_ÇA_Çə_CA_Cü_Şə".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[bugün saat] LT",nextDay:"[sabah saat] LT",nextWeek:"[gələn həftə] dddd [saat] LT",lastDay:"[dünən] LT",lastWeek:"[keçən həftə] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s əvvəl",s:"birneçə saniyyə",m:"bir dəqiqə",mm:"%d dəqiqə",h:"bir saat",hh:"%d saat",d:"bir gün",dd:"%d gün",M:"bir ay",MM:"%d ay",y:"bir il",yy:"%d il"},meridiemParse:/gecə|səhər|gündüz|axşam/,isPM:function(a){return/^(gündüz|axşam)$/.test(a)},meridiem:function(a,b,c){return 4>a?"gecə":12>a?"səhər":17>a?"gündüz":"axşam"},ordinalParse:/\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,ordinal:function(a){if(0===a)return a+"-ıncı";var b=a%10,c=a%100-b,d=a>=100?100:null;return a+(Tf[b]||Tf[c]||Tf[d])},week:{dow:1,doy:7}}),Kf.defineLocale("be",{months:{format:"студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня".split("_"),standalone:"студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань".split("_")},monthsShort:"студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж".split("_"),weekdays:{format:"нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу".split("_"),standalone:"нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота".split("_"),isFormat:/\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/},weekdaysShort:"нд_пн_ат_ср_чц_пт_сб".split("_"),weekdaysMin:"нд_пн_ат_ср_чц_пт_сб".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY г.",LLL:"D MMMM YYYY г., HH:mm",LLLL:"dddd, D MMMM YYYY г., HH:mm"},calendar:{sameDay:"[Сёння ў] LT",nextDay:"[Заўтра ў] LT",lastDay:"[Учора ў] LT",nextWeek:function(){return"[У] dddd [ў] LT"},lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return"[У мінулую] dddd [ў] LT";case 1:case 2:case 4:return"[У мінулы] dddd [ў] LT"}},sameElse:"L"},relativeTime:{future:"праз %s",past:"%s таму",s:"некалькі секунд",m:Vc,mm:Vc,h:Vc,hh:Vc,d:"дзень",dd:Vc,M:"месяц",MM:Vc,y:"год",yy:Vc},meridiemParse:/ночы|раніцы|дня|вечара/,isPM:function(a){return/^(дня|вечара)$/.test(a)},meridiem:function(a,b,c){return 4>a?"ночы":12>a?"раніцы":17>a?"дня":"вечара"},ordinalParse:/\d{1,2}-(і|ы|га)/,ordinal:function(a,b){switch(b){case"M":case"d":case"DDD":case"w":case"W":return a%10!==2&&a%10!==3||a%100===12||a%100===13?a+"-ы":a+"-і";case"D":return a+"-га";default:return a}},week:{dow:1,doy:7}}),Kf.defineLocale("bg",{months:"януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),monthsShort:"янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),weekdays:"неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),weekdaysShort:"нед_пон_вто_сря_чет_пет_съб".split("_"),weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[Днес в] LT",nextDay:"[Утре в] LT",nextWeek:"dddd [в] LT",lastDay:"[Вчера в] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[В изминалата] dddd [в] LT";case 1:case 2:case 4:case 5:return"[В изминалия] dddd [в] LT"}},sameElse:"L"},relativeTime:{future:"след %s",past:"преди %s",s:"няколко секунди",m:"минута",mm:"%d минути",h:"час",hh:"%d часа",d:"ден",dd:"%d дни",M:"месец",MM:"%d месеца",y:"година",yy:"%d години"},ordinalParse:/\d{1,2}-(ев|ен|ти|ви|ри|ми)/,ordinal:function(a){var b=a%10,c=a%100;return 0===a?a+"-ев":0===c?a+"-ен":c>10&&20>c?a+"-ти":1===b?a+"-ви":2===b?a+"-ри":7===b||8===b?a+"-ми":a+"-ти"},week:{dow:1,doy:7}}),{1:"১",2:"২",3:"৩",4:"৪",5:"৫",6:"৬",7:"৭",8:"৮",9:"৯",0:"০"}),Vf={"১":"1","২":"2","৩":"3","৪":"4","৫":"5","৬":"6","৭":"7","৮":"8","৯":"9","০":"0"},Wf=(Kf.defineLocale("bn",{months:"জানুয়ারী_ফেবুয়ারী_মার্চ_এপ্রিল_মে_জুন_জুলাই_অগাস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর".split("_"),monthsShort:"জানু_ফেব_মার্চ_এপর_মে_জুন_জুল_অগ_সেপ্ট_অক্টো_নভ_ডিসেম্".split("_"),weekdays:"রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পত্তিবার_শুক্রবার_শনিবার".split("_"),weekdaysShort:"রবি_সোম_মঙ্গল_বুধ_বৃহস্পত্তি_শুক্র_শনি".split("_"),weekdaysMin:"রব_সম_মঙ্গ_বু_ব্রিহ_শু_শনি".split("_"),longDateFormat:{LT:"A h:mm সময়",LTS:"A h:mm:ss সময়",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm সময়",LLLL:"dddd, D MMMM YYYY, A h:mm সময়"},calendar:{sameDay:"[আজ] LT",nextDay:"[আগামীকাল] LT",nextWeek:"dddd, LT",lastDay:"[গতকাল] LT",lastWeek:"[গত] dddd, LT",sameElse:"L"},relativeTime:{future:"%s পরে",past:"%s আগে",s:"কয়েক সেকেন্ড",m:"এক মিনিট",mm:"%d মিনিট",h:"এক ঘন্টা",hh:"%d ঘন্টা",d:"এক দিন",dd:"%d দিন",M:"এক মাস",MM:"%d মাস",y:"এক বছর",yy:"%d বছর"},preparse:function(a){return a.replace(/[১২৩৪৫৬৭৮৯০]/g,function(a){return Vf[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return Uf[a]})},meridiemParse:/রাত|সকাল|দুপুর|বিকাল|রাত/,isPM:function(a){return/^(দুপুর|বিকাল|রাত)$/.test(a)},meridiem:function(a,b,c){return 4>a?"রাত":10>a?"সকাল":17>a?"দুপুর":20>a?"বিকাল":"রাত"},week:{dow:0,doy:6}}),{1:"༡",2:"༢",3:"༣",4:"༤",5:"༥",6:"༦",7:"༧",8:"༨",9:"༩",0:"༠"}),Xf={"༡":"1","༢":"2","༣":"3","༤":"4","༥":"5","༦":"6","༧":"7","༨":"8","༩":"9","༠":"0"},Yf=(Kf.defineLocale("bo",{months:"ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"),monthsShort:"ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"),weekdays:"གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་".split("_"),weekdaysShort:"ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),weekdaysMin:"ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm",LLLL:"dddd, D MMMM YYYY, A h:mm"},calendar:{sameDay:"[དི་རིང] LT",nextDay:"[སང་ཉིན] LT",nextWeek:"[བདུན་ཕྲག་རྗེས་མ], LT",lastDay:"[ཁ་སང] LT",lastWeek:"[བདུན་ཕྲག་མཐའ་མ] dddd, LT",sameElse:"L"},relativeTime:{future:"%s ལ་",past:"%s སྔན་ལ",s:"ལམ་སང",m:"སྐར་མ་གཅིག",mm:"%d སྐར་མ",h:"ཆུ་ཚོད་གཅིག",hh:"%d ཆུ་ཚོད",d:"ཉིན་གཅིག",dd:"%d ཉིན་",M:"ཟླ་བ་གཅིག",MM:"%d ཟླ་བ",y:"ལོ་གཅིག",yy:"%d ལོ"},preparse:function(a){return a.replace(/[༡༢༣༤༥༦༧༨༩༠]/g,function(a){return Xf[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return Wf[a]})},meridiemParse:/མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,isPM:function(a){return/^(ཉིན་གུང|དགོང་དག|མཚན་མོ)$/.test(a)},meridiem:function(a,b,c){return 4>a?"མཚན་མོ":10>a?"ཞོགས་ཀས":17>a?"ཉིན་གུང":20>a?"དགོང་དག":"མཚན་མོ"},week:{dow:0,doy:6}}),Kf.defineLocale("br",{months:"Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),monthsShort:"Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),weekdays:"Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),weekdaysShort:"Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),weekdaysMin:"Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),longDateFormat:{LT:"h[e]mm A",LTS:"h[e]mm:ss A",L:"DD/MM/YYYY",LL:"D [a viz] MMMM YYYY",LLL:"D [a viz] MMMM YYYY h[e]mm A",LLLL:"dddd, D [a viz] MMMM YYYY h[e]mm A"},calendar:{sameDay:"[Hiziv da] LT",nextDay:"[Warc'hoazh da] LT",nextWeek:"dddd [da] LT",lastDay:"[Dec'h da] LT",lastWeek:"dddd [paset da] LT",sameElse:"L"},relativeTime:{future:"a-benn %s",past:"%s 'zo",s:"un nebeud segondennoù",m:"ur vunutenn",mm:Wc,h:"un eur",hh:"%d eur",d:"un devezh",dd:Wc,M:"ur miz",MM:Wc,y:"ur bloaz",yy:Xc},ordinalParse:/\d{1,2}(añ|vet)/,ordinal:function(a){var b=1===a?"añ":"vet";return a+b},week:{dow:1,doy:4}}),Kf.defineLocale("bs",{months:"januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"),weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[jučer u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[prošlu] dddd [u] LT";case 6:return"[prošle] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[prošli] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",m:_c,mm:_c,h:_c,hh:_c,d:"dan",dd:_c,M:"mjesec",MM:_c,y:"godinu",yy:_c},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),Kf.defineLocale("ca",{months:"gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),monthsShort:"gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.".split("_"),weekdays:"diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),weekdaysShort:"dg._dl._dt._dc._dj._dv._ds.".split("_"),weekdaysMin:"Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd D MMMM YYYY H:mm"},calendar:{sameDay:function(){return"[avui a "+(1!==this.hours()?"les":"la")+"] LT"},nextDay:function(){return"[demà a "+(1!==this.hours()?"les":"la")+"] LT"},nextWeek:function(){return"dddd [a "+(1!==this.hours()?"les":"la")+"] LT"},lastDay:function(){return"[ahir a "+(1!==this.hours()?"les":"la")+"] LT"},lastWeek:function(){return"[el] dddd [passat a "+(1!==this.hours()?"les":"la")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"fa %s",s:"uns segons",m:"un minut",mm:"%d minuts",h:"una hora",hh:"%d hores",d:"un dia",dd:"%d dies",M:"un mes",MM:"%d mesos",y:"un any",yy:"%d anys"},ordinalParse:/\d{1,2}(r|n|t|è|a)/,ordinal:function(a,b){var c=1===a?"r":2===a?"n":3===a?"r":4===a?"t":"è";return("w"===b||"W"===b)&&(c="a"),a+c},week:{dow:1,doy:4}}),"leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_")),Zf="led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_"),$f=(Kf.defineLocale("cs",{months:Yf,monthsShort:Zf,monthsParse:function(a,b){var c,d=[];for(c=0;12>c;c++)d[c]=new RegExp("^"+a[c]+"$|^"+b[c]+"$","i");return d}(Yf,Zf),shortMonthsParse:function(a){var b,c=[];for(b=0;12>b;b++)c[b]=new RegExp("^"+a[b]+"$","i");return c}(Zf),longMonthsParse:function(a){var b,c=[];for(b=0;12>b;b++)c[b]=new RegExp("^"+a[b]+"$","i");return c}(Yf),weekdays:"neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),weekdaysShort:"ne_po_út_st_čt_pá_so".split("_"),weekdaysMin:"ne_po_út_st_čt_pá_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm"},calendar:{sameDay:"[dnes v] LT",nextDay:"[zítra v] LT",nextWeek:function(){switch(this.day()){case 0:return"[v neděli v] LT";case 1:case 2:return"[v] dddd [v] LT";case 3:return"[ve středu v] LT";case 4:return"[ve čtvrtek v] LT";case 5:return"[v pátek v] LT";case 6:return"[v sobotu v] LT"}},lastDay:"[včera v] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulou neděli v] LT";case 1:case 2:return"[minulé] dddd [v] LT";case 3:return"[minulou středu v] LT";case 4:case 5:return"[minulý] dddd [v] LT";case 6:return"[minulou sobotu v] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"před %s",s:bd,m:bd,mm:bd,h:bd,hh:bd,d:bd,dd:bd,M:bd,MM:bd,y:bd,yy:bd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("cv",{months:"кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав".split("_"),monthsShort:"кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш".split("_"),weekdays:"вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун".split("_"),weekdaysShort:"выр_тун_ытл_юн_кӗҫ_эрн_шӑм".split("_"),weekdaysMin:"вр_тн_ыт_юн_кҫ_эр_шм".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]",LLL:"YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm",LLLL:"dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm"},calendar:{sameDay:"[Паян] LT [сехетре]",nextDay:"[Ыран] LT [сехетре]",lastDay:"[Ӗнер] LT [сехетре]",nextWeek:"[Ҫитес] dddd LT [сехетре]",lastWeek:"[Иртнӗ] dddd LT [сехетре]",sameElse:"L"},relativeTime:{future:function(a){var b=/сехет$/i.exec(a)?"рен":/ҫул$/i.exec(a)?"тан":"ран";return a+b},past:"%s каялла",s:"пӗр-ик ҫеккунт",m:"пӗр минут",mm:"%d минут",h:"пӗр сехет",hh:"%d сехет",d:"пӗр кун",dd:"%d кун",M:"пӗр уйӑх",MM:"%d уйӑх",y:"пӗр ҫул",yy:"%d ҫул"},ordinalParse:/\d{1,2}-мӗш/,ordinal:"%d-мӗш",week:{dow:1,doy:7}}),Kf.defineLocale("cy",{months:"Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),monthsShort:"Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),weekdays:"Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),weekdaysShort:"Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),weekdaysMin:"Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Heddiw am] LT",nextDay:"[Yfory am] LT",nextWeek:"dddd [am] LT",lastDay:"[Ddoe am] LT",lastWeek:"dddd [diwethaf am] LT",sameElse:"L"},relativeTime:{future:"mewn %s",past:"%s yn ôl",s:"ychydig eiliadau",m:"munud",mm:"%d munud",h:"awr",hh:"%d awr",d:"diwrnod",dd:"%d diwrnod",M:"mis",MM:"%d mis",y:"blwyddyn",yy:"%d flynedd"},ordinalParse:/\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,ordinal:function(a){var b=a,c="",d=["","af","il","ydd","ydd","ed","ed","ed","fed","fed","fed","eg","fed","eg","eg","fed","eg","eg","fed","eg","fed"];return b>20?c=40===b||50===b||60===b||80===b||100===b?"fed":"ain":b>0&&(c=d[b]),a+c},week:{dow:1,doy:4}}),Kf.defineLocale("da",{months:"januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),weekdaysShort:"søn_man_tir_ons_tor_fre_lør".split("_"),weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd [d.] D. MMMM YYYY HH:mm"},calendar:{sameDay:"[I dag kl.] LT",nextDay:"[I morgen kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[I går kl.] LT",lastWeek:"[sidste] dddd [kl] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s siden",s:"få sekunder",m:"et minut",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dage",M:"en måned",MM:"%d måneder",y:"et år",yy:"%d år"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("de-at",{months:"Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd, D. MMMM YYYY HH:mm"},calendar:{sameDay:"[heute um] LT [Uhr]",sameElse:"L",nextDay:"[morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:cd,mm:"%d Minuten",h:cd,hh:"%d Stunden",d:cd,dd:cd,M:cd,MM:cd,y:cd,yy:cd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("de",{months:"Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd, D. MMMM YYYY HH:mm"},calendar:{sameDay:"[heute um] LT [Uhr]",sameElse:"L",nextDay:"[morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:dd,mm:"%d Minuten",h:dd,hh:"%d Stunden",d:dd,dd:dd,M:dd,MM:dd,y:dd,yy:dd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),["ޖެނުއަރީ","ފެބްރުއަރީ","މާރިޗު","އޭޕްރީލު","މޭ","ޖޫން","ޖުލައި","އޯގަސްޓު","ސެޕްޓެމްބަރު","އޮކްޓޯބަރު","ނޮވެމްބަރު","ޑިސެމްބަރު"]),_f=["އާދިއްތަ","ހޯމަ","އަންގާރަ","ބުދަ","ބުރާސްފަތި","ހުކުރު","ހޮނިހިރު"],ag=(Kf.defineLocale("dv",{months:$f,monthsShort:$f,weekdays:_f,weekdaysShort:_f,weekdaysMin:"އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/M/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/މކ|މފ/,isPM:function(a){return""===a},meridiem:function(a,b,c){return 12>a?"މކ":"މފ"},calendar:{sameDay:"[މިއަދު] LT",nextDay:"[މާދަމާ] LT",nextWeek:"dddd LT",lastDay:"[އިއްޔެ] LT",lastWeek:"[ފާއިތުވި] dddd LT",sameElse:"L"},relativeTime:{future:"ތެރޭގައި %s",past:"ކުރިން %s",s:"ސިކުންތުކޮޅެއް",m:"މިނިޓެއް",mm:"މިނިޓު %d",h:"ގަޑިއިރެއް",hh:"ގަޑިއިރު %d",d:"ދުވަހެއް",dd:"ދުވަސް %d",M:"މަހެއް",MM:"މަސް %d",y:"އަހަރެއް",yy:"އަހަރު %d"},preparse:function(a){return a.replace(/،/g,",")},postformat:function(a){return a.replace(/,/g,"،")},week:{dow:7,doy:12}}),Kf.defineLocale("el",{monthsNominativeEl:"Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"),monthsGenitiveEl:"Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου".split("_"),months:function(a,b){return/D/.test(b.substring(0,b.indexOf("MMMM")))?this._monthsGenitiveEl[a.month()]:this._monthsNominativeEl[a.month()]},monthsShort:"Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ".split("_"),weekdays:"Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"),weekdaysShort:"Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),weekdaysMin:"Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),meridiem:function(a,b,c){return a>11?c?"μμ":"ΜΜ":c?"πμ":"ΠΜ"},isPM:function(a){return"μ"===(a+"").toLowerCase()[0]},meridiemParse:/[ΠΜ]\.?Μ?\.?/i,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendarEl:{sameDay:"[Σήμερα {}] LT",nextDay:"[Αύριο {}] LT",nextWeek:"dddd [{}] LT",lastDay:"[Χθες {}] LT",lastWeek:function(){switch(this.day()){case 6:return"[το προηγούμενο] dddd [{}] LT";default:return"[την προηγούμενη] dddd [{}] LT"}},sameElse:"L"},calendar:function(a,b){var c=this._calendarEl[a],d=b&&b.hours();return D(c)&&(c=c.apply(b)),c.replace("{}",d%12===1?"στη":"στις")},relativeTime:{future:"σε %s",past:"%s πριν",s:"λίγα δευτερόλεπτα",m:"ένα λεπτό",mm:"%d λεπτά",h:"μία ώρα",hh:"%d ώρες",d:"μία μέρα",dd:"%d μέρες",M:"ένας μήνας",MM:"%d μήνες",y:"ένας χρόνος",yy:"%d χρόνια"},ordinalParse:/\d{1,2}η/,ordinal:"%dη",week:{dow:1,doy:4}}),Kf.defineLocale("en-au",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c},week:{dow:1,doy:4}}),Kf.defineLocale("en-ca",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"YYYY-MM-DD",LL:"D MMMM, YYYY",LLL:"D MMMM, YYYY h:mm A",LLLL:"dddd, D MMMM, YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),Kf.defineLocale("en-gb",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c},week:{dow:1,doy:4}}),Kf.defineLocale("en-ie",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c},week:{dow:1,doy:4}}),Kf.defineLocale("en-nz",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c},week:{dow:1,doy:4}}),Kf.defineLocale("eo",{months:"januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),weekdays:"Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato".split("_"),
weekdaysShort:"Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Ĵa_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D[-an de] MMMM, YYYY",LLL:"D[-an de] MMMM, YYYY HH:mm",LLLL:"dddd, [la] D[-an de] MMMM, YYYY HH:mm"},meridiemParse:/[ap]\.t\.m/i,isPM:function(a){return"p"===a.charAt(0).toLowerCase()},meridiem:function(a,b,c){return a>11?c?"p.t.m.":"P.T.M.":c?"a.t.m.":"A.T.M."},calendar:{sameDay:"[Hodiaŭ je] LT",nextDay:"[Morgaŭ je] LT",nextWeek:"dddd [je] LT",lastDay:"[Hieraŭ je] LT",lastWeek:"[pasinta] dddd [je] LT",sameElse:"L"},relativeTime:{future:"je %s",past:"antaŭ %s",s:"sekundoj",m:"minuto",mm:"%d minutoj",h:"horo",hh:"%d horoj",d:"tago",dd:"%d tagoj",M:"monato",MM:"%d monatoj",y:"jaro",yy:"%d jaroj"},ordinalParse:/\d{1,2}a/,ordinal:"%da",week:{dow:1,doy:7}}),"ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_")),bg="ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),cg=(Kf.defineLocale("es",{months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),monthsShort:function(a,b){return/-MMM-/.test(b)?bg[a.month()]:ag[a.month()]},weekdays:"domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),weekdaysShort:"dom._lun._mar._mié._jue._vie._sáb.".split("_"),weekdaysMin:"do_lu_ma_mi_ju_vi_sá".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY H:mm",LLLL:"dddd, D [de] MMMM [de] YYYY H:mm"},calendar:{sameDay:function(){return"[hoy a la"+(1!==this.hours()?"s":"")+"] LT"},nextDay:function(){return"[mañana a la"+(1!==this.hours()?"s":"")+"] LT"},nextWeek:function(){return"dddd [a la"+(1!==this.hours()?"s":"")+"] LT"},lastDay:function(){return"[ayer a la"+(1!==this.hours()?"s":"")+"] LT"},lastWeek:function(){return"[el] dddd [pasado a la"+(1!==this.hours()?"s":"")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un día",dd:"%d días",M:"un mes",MM:"%d meses",y:"un año",yy:"%d años"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}}),Kf.defineLocale("et",{months:"jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),monthsShort:"jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),weekdays:"pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"),weekdaysShort:"P_E_T_K_N_R_L".split("_"),weekdaysMin:"P_E_T_K_N_R_L".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[Täna,] LT",nextDay:"[Homme,] LT",nextWeek:"[Järgmine] dddd LT",lastDay:"[Eile,] LT",lastWeek:"[Eelmine] dddd LT",sameElse:"L"},relativeTime:{future:"%s pärast",past:"%s tagasi",s:ed,m:ed,mm:ed,h:ed,hh:ed,d:ed,dd:"%d päeva",M:ed,MM:ed,y:ed,yy:ed},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("eu",{months:"urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),monthsShort:"urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),weekdays:"igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),weekdaysShort:"ig._al._ar._az._og._ol._lr.".split("_"),weekdaysMin:"ig_al_ar_az_og_ol_lr".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY[ko] MMMM[ren] D[a]",LLL:"YYYY[ko] MMMM[ren] D[a] HH:mm",LLLL:"dddd, YYYY[ko] MMMM[ren] D[a] HH:mm",l:"YYYY-M-D",ll:"YYYY[ko] MMM D[a]",lll:"YYYY[ko] MMM D[a] HH:mm",llll:"ddd, YYYY[ko] MMM D[a] HH:mm"},calendar:{sameDay:"[gaur] LT[etan]",nextDay:"[bihar] LT[etan]",nextWeek:"dddd LT[etan]",lastDay:"[atzo] LT[etan]",lastWeek:"[aurreko] dddd LT[etan]",sameElse:"L"},relativeTime:{future:"%s barru",past:"duela %s",s:"segundo batzuk",m:"minutu bat",mm:"%d minutu",h:"ordu bat",hh:"%d ordu",d:"egun bat",dd:"%d egun",M:"hilabete bat",MM:"%d hilabete",y:"urte bat",yy:"%d urte"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),{1:"۱",2:"۲",3:"۳",4:"۴",5:"۵",6:"۶",7:"۷",8:"۸",9:"۹",0:"۰"}),dg={"۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","۰":"0"},eg=(Kf.defineLocale("fa",{months:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),monthsShort:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),weekdays:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),weekdaysShort:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),weekdaysMin:"ی_د_س_چ_پ_ج_ش".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},meridiemParse:/قبل از ظهر|بعد از ظهر/,isPM:function(a){return/بعد از ظهر/.test(a)},meridiem:function(a,b,c){return 12>a?"قبل از ظهر":"بعد از ظهر"},calendar:{sameDay:"[امروز ساعت] LT",nextDay:"[فردا ساعت] LT",nextWeek:"dddd [ساعت] LT",lastDay:"[دیروز ساعت] LT",lastWeek:"dddd [پیش] [ساعت] LT",sameElse:"L"},relativeTime:{future:"در %s",past:"%s پیش",s:"چندین ثانیه",m:"یک دقیقه",mm:"%d دقیقه",h:"یک ساعت",hh:"%d ساعت",d:"یک روز",dd:"%d روز",M:"یک ماه",MM:"%d ماه",y:"یک سال",yy:"%d سال"},preparse:function(a){return a.replace(/[۰-۹]/g,function(a){return dg[a]}).replace(/،/g,",")},postformat:function(a){return a.replace(/\d/g,function(a){return cg[a]}).replace(/,/g,"،")},ordinalParse:/\d{1,2}م/,ordinal:"%dم",week:{dow:6,doy:12}}),"nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" ")),fg=["nolla","yhden","kahden","kolmen","neljän","viiden","kuuden",eg[7],eg[8],eg[9]],gg=(Kf.defineLocale("fi",{months:"tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),monthsShort:"tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),weekdays:"sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),weekdaysShort:"su_ma_ti_ke_to_pe_la".split("_"),weekdaysMin:"su_ma_ti_ke_to_pe_la".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"Do MMMM[ta] YYYY",LLL:"Do MMMM[ta] YYYY, [klo] HH.mm",LLLL:"dddd, Do MMMM[ta] YYYY, [klo] HH.mm",l:"D.M.YYYY",ll:"Do MMM YYYY",lll:"Do MMM YYYY, [klo] HH.mm",llll:"ddd, Do MMM YYYY, [klo] HH.mm"},calendar:{sameDay:"[tänään] [klo] LT",nextDay:"[huomenna] [klo] LT",nextWeek:"dddd [klo] LT",lastDay:"[eilen] [klo] LT",lastWeek:"[viime] dddd[na] [klo] LT",sameElse:"L"},relativeTime:{future:"%s päästä",past:"%s sitten",s:fd,m:fd,mm:fd,h:fd,hh:fd,d:fd,dd:fd,M:fd,MM:fd,y:fd,yy:fd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("fo",{months:"januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split("_"),weekdaysShort:"sun_mán_týs_mik_hós_frí_ley".split("_"),weekdaysMin:"su_má_tý_mi_hó_fr_le".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D. MMMM, YYYY HH:mm"},calendar:{sameDay:"[Í dag kl.] LT",nextDay:"[Í morgin kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[Í gjár kl.] LT",lastWeek:"[síðstu] dddd [kl] LT",sameElse:"L"},relativeTime:{future:"um %s",past:"%s síðani",s:"fá sekund",m:"ein minutt",mm:"%d minuttir",h:"ein tími",hh:"%d tímar",d:"ein dagur",dd:"%d dagar",M:"ein mánaði",MM:"%d mánaðir",y:"eitt ár",yy:"%d ár"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("fr-ca",{months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd'hui à] LT",nextDay:"[Demain à] LT",nextWeek:"dddd [à] LT",lastDay:"[Hier à] LT",lastWeek:"dddd [dernier à] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinalParse:/\d{1,2}(er|e)/,ordinal:function(a){return a+(1===a?"er":"e")}}),Kf.defineLocale("fr-ch",{months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd'hui à] LT",nextDay:"[Demain à] LT",nextWeek:"dddd [à] LT",lastDay:"[Hier à] LT",lastWeek:"dddd [dernier à] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinalParse:/\d{1,2}(er|e)/,ordinal:function(a){return a+(1===a?"er":"e")},week:{dow:1,doy:4}}),Kf.defineLocale("fr",{months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd'hui à] LT",nextDay:"[Demain à] LT",nextWeek:"dddd [à] LT",lastDay:"[Hier à] LT",lastWeek:"dddd [dernier à] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinalParse:/\d{1,2}(er|)/,ordinal:function(a){return a+(1===a?"er":"")},week:{dow:1,doy:4}}),"jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_")),hg="jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),ig=(Kf.defineLocale("fy",{months:"jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"),monthsShort:function(a,b){return/-MMM-/.test(b)?hg[a.month()]:gg[a.month()]},weekdays:"snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"),weekdaysShort:"si._mo._ti._wo._to._fr._so.".split("_"),weekdaysMin:"Si_Mo_Ti_Wo_To_Fr_So".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[hjoed om] LT",nextDay:"[moarn om] LT",nextWeek:"dddd [om] LT",lastDay:"[juster om] LT",lastWeek:"[ôfrûne] dddd [om] LT",sameElse:"L"},relativeTime:{future:"oer %s",past:"%s lyn",s:"in pear sekonden",m:"ien minút",mm:"%d minuten",h:"ien oere",hh:"%d oeren",d:"ien dei",dd:"%d dagen",M:"ien moanne",MM:"%d moannen",y:"ien jier",yy:"%d jierren"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(a){return a+(1===a||8===a||a>=20?"ste":"de")},week:{dow:1,doy:4}}),["Am Faoilleach","An Gearran","Am Màrt","An Giblean","An Cèitean","An t-Ògmhios","An t-Iuchar","An Lùnastal","An t-Sultain","An Dàmhair","An t-Samhain","An Dùbhlachd"]),jg=["Faoi","Gear","Màrt","Gibl","Cèit","Ògmh","Iuch","Lùn","Sult","Dàmh","Samh","Dùbh"],kg=["Didòmhnaich","Diluain","Dimàirt","Diciadain","Diardaoin","Dihaoine","Disathairne"],lg=["Did","Dil","Dim","Dic","Dia","Dih","Dis"],mg=["Dò","Lu","Mà","Ci","Ar","Ha","Sa"],ng=(Kf.defineLocale("gd",{months:ig,monthsShort:jg,monthsParseExact:!0,weekdays:kg,weekdaysShort:lg,weekdaysMin:mg,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[An-diugh aig] LT",nextDay:"[A-màireach aig] LT",nextWeek:"dddd [aig] LT",lastDay:"[An-dè aig] LT",lastWeek:"dddd [seo chaidh] [aig] LT",sameElse:"L"},relativeTime:{future:"ann an %s",past:"bho chionn %s",s:"beagan diogan",m:"mionaid",mm:"%d mionaidean",h:"uair",hh:"%d uairean",d:"latha",dd:"%d latha",M:"mìos",MM:"%d mìosan",y:"bliadhna",yy:"%d bliadhna"},ordinalParse:/\d{1,2}(d|na|mh)/,ordinal:function(a){var b=1===a?"d":a%10===2?"na":"mh";return a+b},week:{dow:1,doy:4}}),Kf.defineLocale("gl",{months:"Xaneiro_Febreiro_Marzo_Abril_Maio_Xuño_Xullo_Agosto_Setembro_Outubro_Novembro_Decembro".split("_"),monthsShort:"Xan._Feb._Mar._Abr._Mai._Xuñ._Xul._Ago._Set._Out._Nov._Dec.".split("_"),weekdays:"Domingo_Luns_Martes_Mércores_Xoves_Venres_Sábado".split("_"),weekdaysShort:"Dom._Lun._Mar._Mér._Xov._Ven._Sáb.".split("_"),weekdaysMin:"Do_Lu_Ma_Mé_Xo_Ve_Sá".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd D MMMM YYYY H:mm"},calendar:{sameDay:function(){return"[hoxe "+(1!==this.hours()?"ás":"á")+"] LT"},nextDay:function(){return"[mañá "+(1!==this.hours()?"ás":"á")+"] LT"},nextWeek:function(){return"dddd ["+(1!==this.hours()?"ás":"a")+"] LT"},lastDay:function(){return"[onte "+(1!==this.hours()?"á":"a")+"] LT"},lastWeek:function(){return"[o] dddd [pasado "+(1!==this.hours()?"ás":"a")+"] LT"},sameElse:"L"},relativeTime:{future:function(a){return"uns segundos"===a?"nuns segundos":"en "+a},past:"hai %s",s:"uns segundos",m:"un minuto",mm:"%d minutos",h:"unha hora",hh:"%d horas",d:"un día",dd:"%d días",M:"un mes",MM:"%d meses",y:"un ano",yy:"%d anos"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:7}}),Kf.defineLocale("he",{months:"ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"),monthsShort:"ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳".split("_"),weekdays:"ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),weekdaysShort:"א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),weekdaysMin:"א_ב_ג_ד_ה_ו_ש".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [ב]MMMM YYYY",LLL:"D [ב]MMMM YYYY HH:mm",LLLL:"dddd, D [ב]MMMM YYYY HH:mm",l:"D/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY HH:mm",llll:"ddd, D MMM YYYY HH:mm"},calendar:{sameDay:"[היום ב־]LT",nextDay:"[מחר ב־]LT",nextWeek:"dddd [בשעה] LT",lastDay:"[אתמול ב־]LT",lastWeek:"[ביום] dddd [האחרון בשעה] LT",sameElse:"L"},relativeTime:{future:"בעוד %s",past:"לפני %s",s:"מספר שניות",m:"דקה",mm:"%d דקות",h:"שעה",hh:function(a){return 2===a?"שעתיים":a+" שעות"},d:"יום",dd:function(a){return 2===a?"יומיים":a+" ימים"},M:"חודש",MM:function(a){return 2===a?"חודשיים":a+" חודשים"},y:"שנה",yy:function(a){return 2===a?"שנתיים":a%10===0&&10!==a?a+" שנה":a+" שנים"}}}),{1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"}),og={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"},pg=(Kf.defineLocale("hi",{months:"जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"),monthsShort:"जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"),weekdays:"रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),weekdaysShort:"रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"),weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),longDateFormat:{LT:"A h:mm बजे",LTS:"A h:mm:ss बजे",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm बजे",LLLL:"dddd, D MMMM YYYY, A h:mm बजे"},calendar:{sameDay:"[आज] LT",nextDay:"[कल] LT",nextWeek:"dddd, LT",lastDay:"[कल] LT",lastWeek:"[पिछले] dddd, LT",sameElse:"L"},relativeTime:{future:"%s में",past:"%s पहले",s:"कुछ ही क्षण",m:"एक मिनट",mm:"%d मिनट",h:"एक घंटा",hh:"%d घंटे",d:"एक दिन",dd:"%d दिन",M:"एक महीने",MM:"%d महीने",y:"एक वर्ष",yy:"%d वर्ष"},preparse:function(a){return a.replace(/[१२३४५६७८९०]/g,function(a){return og[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return ng[a]})},meridiemParse:/रात|सुबह|दोपहर|शाम/,meridiemHour:function(a,b){return 12===a&&(a=0),"रात"===b?4>a?a:a+12:"सुबह"===b?a:"दोपहर"===b?a>=10?a:a+12:"शाम"===b?a+12:void 0},meridiem:function(a,b,c){return 4>a?"रात":10>a?"सुबह":17>a?"दोपहर":20>a?"शाम":"रात"},week:{dow:0,doy:6}}),Kf.defineLocale("hr",{months:{format:"siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_"),standalone:"siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_")},monthsShort:"sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[jučer u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[prošlu] dddd [u] LT";case 6:return"[prošle] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[prošli] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",m:hd,mm:hd,h:hd,hh:hd,d:"dan",dd:hd,M:"mjesec",MM:hd,y:"godinu",yy:hd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),"vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(" ")),qg=(Kf.defineLocale("hu",{months:"január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),monthsShort:"jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),weekdays:"vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),weekdaysShort:"vas_hét_kedd_sze_csüt_pén_szo".split("_"),weekdaysMin:"v_h_k_sze_cs_p_szo".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"YYYY.MM.DD.",LL:"YYYY. MMMM D.",LLL:"YYYY. MMMM D. H:mm",LLLL:"YYYY. MMMM D., dddd H:mm"},meridiemParse:/de|du/i,isPM:function(a){return"u"===a.charAt(1).toLowerCase()},meridiem:function(a,b,c){return 12>a?c===!0?"de":"DE":c===!0?"du":"DU"},calendar:{sameDay:"[ma] LT[-kor]",nextDay:"[holnap] LT[-kor]",nextWeek:function(){return jd.call(this,!0)},lastDay:"[tegnap] LT[-kor]",lastWeek:function(){return jd.call(this,!1)},sameElse:"L"},relativeTime:{future:"%s múlva",past:"%s",s:id,m:id,mm:id,h:id,hh:id,d:id,dd:id,M:id,MM:id,y:id,yy:id},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),Kf.defineLocale("hy-am",{months:{format:"հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի".split("_"),standalone:"հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր".split("_")},monthsShort:"հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ".split("_"),weekdays:"կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ".split("_"),weekdaysShort:"կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),weekdaysMin:"կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY թ.",LLL:"D MMMM YYYY թ., HH:mm",LLLL:"dddd, D MMMM YYYY թ., HH:mm"},calendar:{sameDay:"[այսօր] LT",nextDay:"[վաղը] LT",lastDay:"[երեկ] LT",nextWeek:function(){return"dddd [օրը ժամը] LT"},lastWeek:function(){return"[անցած] dddd [օրը ժամը] LT"},sameElse:"L"},relativeTime:{future:"%s հետո",past:"%s առաջ",s:"մի քանի վայրկյան",m:"րոպե",mm:"%d րոպե",h:"ժամ",hh:"%d ժամ",d:"օր",dd:"%d օր",M:"ամիս",MM:"%d ամիս",y:"տարի",yy:"%d տարի"},meridiemParse:/գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,isPM:function(a){return/^(ցերեկվա|երեկոյան)$/.test(a)},meridiem:function(a){return 4>a?"գիշերվա":12>a?"առավոտվա":17>a?"ցերեկվա":"երեկոյան"},ordinalParse:/\d{1,2}|\d{1,2}-(ին|րդ)/,ordinal:function(a,b){switch(b){case"DDD":case"w":case"W":case"DDDo":return 1===a?a+"-ին":a+"-րդ";default:return a}},week:{dow:1,doy:7}}),Kf.defineLocale("id",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),weekdays:"Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),weekdaysShort:"Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|siang|sore|malam/,meridiemHour:function(a,b){return 12===a&&(a=0),"pagi"===b?a:"siang"===b?a>=11?a:a+12:"sore"===b||"malam"===b?a+12:void 0},meridiem:function(a,b,c){return 11>a?"pagi":15>a?"siang":19>a?"sore":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Besok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kemarin pukul] LT",lastWeek:"dddd [lalu pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lalu",s:"beberapa detik",m:"semenit",mm:"%d menit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}}),Kf.defineLocale("is",{months:"janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"),monthsShort:"jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),weekdays:"sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"),weekdaysShort:"sun_mán_þri_mið_fim_fös_lau".split("_"),weekdaysMin:"Su_Má_Þr_Mi_Fi_Fö_La".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] H:mm",LLLL:"dddd, D. MMMM YYYY [kl.] H:mm"},calendar:{sameDay:"[í dag kl.] LT",nextDay:"[á morgun kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[í gær kl.] LT",lastWeek:"[síðasta] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"eftir %s",past:"fyrir %s síðan",s:ld,m:ld,mm:ld,h:"klukkustund",hh:ld,d:ld,dd:ld,M:ld,MM:ld,y:ld,yy:ld},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("it",{months:"gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),monthsShort:"gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),weekdays:"Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato".split("_"),weekdaysShort:"Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),weekdaysMin:"Do_Lu_Ma_Me_Gi_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Oggi alle] LT",nextDay:"[Domani alle] LT",nextWeek:"dddd [alle] LT",lastDay:"[Ieri alle] LT",lastWeek:function(){switch(this.day()){case 0:return"[la scorsa] dddd [alle] LT";default:return"[lo scorso] dddd [alle] LT"}},sameElse:"L"},relativeTime:{future:function(a){return(/^[0-9].+$/.test(a)?"tra":"in")+" "+a},past:"%s fa",s:"alcuni secondi",m:"un minuto",mm:"%d minuti",h:"un'ora",hh:"%d ore",d:"un giorno",dd:"%d giorni",M:"un mese",MM:"%d mesi",y:"un anno",yy:"%d anni"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}}),Kf.defineLocale("ja",{months:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),weekdaysShort:"日_月_火_水_木_金_土".split("_"),weekdaysMin:"日_月_火_水_木_金_土".split("_"),longDateFormat:{LT:"Ah時m分",LTS:"Ah時m分s秒",L:"YYYY/MM/DD",LL:"YYYY年M月D日",LLL:"YYYY年M月D日Ah時m分",LLLL:"YYYY年M月D日Ah時m分 dddd"},meridiemParse:/午前|午後/i,isPM:function(a){return"午後"===a},meridiem:function(a,b,c){return 12>a?"午前":"午後"},calendar:{sameDay:"[今日] LT",nextDay:"[明日] LT",nextWeek:"[来週]dddd LT",lastDay:"[昨日] LT",lastWeek:"[前週]dddd LT",sameElse:"L"},relativeTime:{future:"%s後",past:"%s前",s:"数秒",m:"1分",mm:"%d分",h:"1時間",hh:"%d時間",d:"1日",dd:"%d日",M:"1ヶ月",MM:"%dヶ月",y:"1年",yy:"%d年"}}),Kf.defineLocale("jv",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"),weekdays:"Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"),weekdaysShort:"Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/enjing|siyang|sonten|ndalu/,meridiemHour:function(a,b){return 12===a&&(a=0),"enjing"===b?a:"siyang"===b?a>=11?a:a+12:"sonten"===b||"ndalu"===b?a+12:void 0},meridiem:function(a,b,c){return 11>a?"enjing":15>a?"siyang":19>a?"sonten":"ndalu"},calendar:{sameDay:"[Dinten puniko pukul] LT",nextDay:"[Mbenjang pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kala wingi pukul] LT",lastWeek:"dddd [kepengker pukul] LT",sameElse:"L"},relativeTime:{future:"wonten ing %s",past:"%s ingkang kepengker",s:"sawetawis detik",m:"setunggal menit",mm:"%d menit",h:"setunggal jam",hh:"%d jam",d:"sedinten",dd:"%d dinten",M:"sewulan",MM:"%d wulan",y:"setaun",yy:"%d taun"},week:{dow:1,doy:7}}),Kf.defineLocale("ka",{months:{standalone:"იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split("_"),format:"იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს".split("_")},monthsShort:"იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"),weekdays:{standalone:"კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"),format:"კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს".split("_"),isFormat:/(წინა|შემდეგ)/},weekdaysShort:"კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"),weekdaysMin:"კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[დღეს] LT[-ზე]",nextDay:"[ხვალ] LT[-ზე]",lastDay:"[გუშინ] LT[-ზე]",nextWeek:"[შემდეგ] dddd LT[-ზე]",lastWeek:"[წინა] dddd LT-ზე",sameElse:"L"},relativeTime:{future:function(a){return/(წამი|წუთი|საათი|წელი)/.test(a)?a.replace(/ი$/,"ში"):a+"ში"},past:function(a){return/(წამი|წუთი|საათი|დღე|თვე)/.test(a)?a.replace(/(ი|ე)$/,"ის წინ"):/წელი/.test(a)?a.replace(/წელი$/,"წლის წინ"):void 0},s:"რამდენიმე წამი",m:"წუთი",mm:"%d წუთი",h:"საათი",hh:"%d საათი",d:"დღე",dd:"%d დღე",M:"თვე",MM:"%d თვე",y:"წელი",yy:"%d წელი"},ordinalParse:/0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,ordinal:function(a){return 0===a?a:1===a?a+"-ლი":20>a||100>=a&&a%20===0||a%100===0?"მე-"+a:a+"-ე"},week:{dow:1,doy:7}}),{0:"-ші",1:"-ші",2:"-ші",3:"-ші",4:"-ші",5:"-ші",6:"-шы",7:"-ші",8:"-ші",9:"-шы",10:"-шы",20:"-шы",30:"-шы",40:"-шы",50:"-ші",60:"-шы",70:"-ші",80:"-ші",90:"-шы",100:"-ші"}),rg=(Kf.defineLocale("kk",{months:"Қаңтар_Ақпан_Наурыз_Сәуір_Мамыр_Маусым_Шілде_Тамыз_Қыркүйек_Қазан_Қараша_Желтоқсан".split("_"),monthsShort:"Қаң_Ақп_Нау_Сәу_Мам_Мау_Шіл_Там_Қыр_Қаз_Қар_Жел".split("_"),weekdays:"Жексенбі_Дүйсенбі_Сейсенбі_Сәрсенбі_Бейсенбі_Жұма_Сенбі".split("_"),weekdaysShort:"Жек_Дүй_Сей_Сәр_Бей_Жұм_Сен".split("_"),weekdaysMin:"Жк_Дй_Сй_Ср_Бй_Жм_Сн".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Бүгін сағат] LT",nextDay:"[Ертең сағат] LT",nextWeek:"dddd [сағат] LT",lastDay:"[Кеше сағат] LT",lastWeek:"[Өткен аптаның] dddd [сағат] LT",sameElse:"L"},relativeTime:{future:"%s ішінде",past:"%s бұрын",s:"бірнеше секунд",m:"бір минут",mm:"%d минут",h:"бір сағат",hh:"%d сағат",d:"бір күн",dd:"%d күн",M:"бір ай",MM:"%d ай",y:"бір жыл",yy:"%d жыл"},ordinalParse:/\d{1,2}-(ші|шы)/,ordinal:function(a){var b=a%10,c=a>=100?100:null;return a+(qg[a]||qg[b]||qg[c])},week:{dow:1,doy:7}}),Kf.defineLocale("km",{months:"មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),monthsShort:"មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),weekdays:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),weekdaysShort:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),weekdaysMin:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[ថ្ងៃនេះ ម៉ោង] LT",nextDay:"[ស្អែក ម៉ោង] LT",nextWeek:"dddd [ម៉ោង] LT",lastDay:"[ម្សិលមិញ ម៉ោង] LT",lastWeek:"dddd [សប្តាហ៍មុន] [ម៉ោង] LT",sameElse:"L"},relativeTime:{future:"%sទៀត",past:"%sមុន",s:"ប៉ុន្មានវិនាទី",m:"មួយនាទី",mm:"%d នាទី",h:"មួយម៉ោង",hh:"%d ម៉ោង",d:"មួយថ្ងៃ",dd:"%d ថ្ងៃ",M:"មួយខែ",MM:"%d ខែ",y:"មួយឆ្នាំ",yy:"%d ឆ្នាំ"},week:{dow:1,doy:4}}),Kf.defineLocale("ko",{months:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),monthsShort:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),weekdays:"일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),weekdaysShort:"일_월_화_수_목_금_토".split("_"),weekdaysMin:"일_월_화_수_목_금_토".split("_"),longDateFormat:{LT:"A h시 m분",LTS:"A h시 m분 s초",L:"YYYY.MM.DD",LL:"YYYY년 MMMM D일",LLL:"YYYY년 MMMM D일 A h시 m분",LLLL:"YYYY년 MMMM D일 dddd A h시 m분"},calendar:{sameDay:"오늘 LT",nextDay:"내일 LT",nextWeek:"dddd LT",lastDay:"어제 LT",lastWeek:"지난주 dddd LT",sameElse:"L"},relativeTime:{future:"%s 후",past:"%s 전",s:"몇초",ss:"%d초",m:"일분",mm:"%d분",h:"한시간",hh:"%d시간",d:"하루",dd:"%d일",M:"한달",MM:"%d달",y:"일년",yy:"%d년"},ordinalParse:/\d{1,2}일/,ordinal:"%d일",meridiemParse:/오전|오후/,isPM:function(a){return"오후"===a},meridiem:function(a,b,c){return 12>a?"오전":"오후"}}),Kf.defineLocale("lb",{months:"Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),weekdays:"Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),weekdaysShort:"So._Mé._Dë._Më._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mé_Dë_Më_Do_Fr_Sa".split("_"),longDateFormat:{LT:"H:mm [Auer]",LTS:"H:mm:ss [Auer]",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm [Auer]",LLLL:"dddd, D. MMMM YYYY H:mm [Auer]"},calendar:{sameDay:"[Haut um] LT",sameElse:"L",nextDay:"[Muer um] LT",nextWeek:"dddd [um] LT",lastDay:"[Gëschter um] LT",lastWeek:function(){switch(this.day()){case 2:case 4:return"[Leschten] dddd [um] LT";default:return"[Leschte] dddd [um] LT"}}},relativeTime:{future:nd,past:od,s:"e puer Sekonnen",m:md,mm:"%d Minutten",h:md,hh:"%d Stonnen",d:md,dd:"%d Deeg",M:md,MM:"%d Méint",y:md,yy:"%d Joer"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("lo",{months:"ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"),monthsShort:"ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"),weekdays:"ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),weekdaysShort:"ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),weekdaysMin:"ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"ວັນdddd D MMMM YYYY HH:mm"},meridiemParse:/ຕອນເຊົ້າ|ຕອນແລງ/,isPM:function(a){return"ຕອນແລງ"===a},meridiem:function(a,b,c){return 12>a?"ຕອນເຊົ້າ":"ຕອນແລງ"},calendar:{sameDay:"[ມື້ນີ້ເວລາ] LT",nextDay:"[ມື້ອື່ນເວລາ] LT",nextWeek:"[ວັນ]dddd[ໜ້າເວລາ] LT",lastDay:"[ມື້ວານນີ້ເວລາ] LT",lastWeek:"[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT",sameElse:"L"},relativeTime:{future:"ອີກ %s",past:"%sຜ່ານມາ",s:"ບໍ່ເທົ່າໃດວິນາທີ",m:"1 ນາທີ",mm:"%d ນາທີ",h:"1 ຊົ່ວໂມງ",hh:"%d ຊົ່ວໂມງ",d:"1 ມື້",dd:"%d ມື້",M:"1 ເດືອນ",MM:"%d ເດືອນ",y:"1 ປີ",yy:"%d ປີ"},ordinalParse:/(ທີ່)\d{1,2}/,ordinal:function(a){
return"ທີ່"+a}}),{m:"minutė_minutės_minutę",mm:"minutės_minučių_minutes",h:"valanda_valandos_valandą",hh:"valandos_valandų_valandas",d:"diena_dienos_dieną",dd:"dienos_dienų_dienas",M:"mėnuo_mėnesio_mėnesį",MM:"mėnesiai_mėnesių_mėnesius",y:"metai_metų_metus",yy:"metai_metų_metus"}),sg=(Kf.defineLocale("lt",{months:{format:"sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"),standalone:"sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis".split("_")},monthsShort:"sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),weekdays:{format:"sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį".split("_"),standalone:"sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split("_"),isFormat:/dddd HH:mm/},weekdaysShort:"Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),weekdaysMin:"S_P_A_T_K_Pn_Š".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY [m.] MMMM D [d.]",LLL:"YYYY [m.] MMMM D [d.], HH:mm [val.]",LLLL:"YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",l:"YYYY-MM-DD",ll:"YYYY [m.] MMMM D [d.]",lll:"YYYY [m.] MMMM D [d.], HH:mm [val.]",llll:"YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"},calendar:{sameDay:"[Šiandien] LT",nextDay:"[Rytoj] LT",nextWeek:"dddd LT",lastDay:"[Vakar] LT",lastWeek:"[Praėjusį] dddd LT",sameElse:"L"},relativeTime:{future:"po %s",past:"prieš %s",s:qd,m:rd,mm:ud,h:rd,hh:ud,d:rd,dd:ud,M:rd,MM:ud,y:rd,yy:ud},ordinalParse:/\d{1,2}-oji/,ordinal:function(a){return a+"-oji"},week:{dow:1,doy:4}}),{m:"minūtes_minūtēm_minūte_minūtes".split("_"),mm:"minūtes_minūtēm_minūte_minūtes".split("_"),h:"stundas_stundām_stunda_stundas".split("_"),hh:"stundas_stundām_stunda_stundas".split("_"),d:"dienas_dienām_diena_dienas".split("_"),dd:"dienas_dienām_diena_dienas".split("_"),M:"mēneša_mēnešiem_mēnesis_mēneši".split("_"),MM:"mēneša_mēnešiem_mēnesis_mēneši".split("_"),y:"gada_gadiem_gads_gadi".split("_"),yy:"gada_gadiem_gads_gadi".split("_")}),tg=(Kf.defineLocale("lv",{months:"janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"),monthsShort:"jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"),weekdays:"svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"),weekdaysShort:"Sv_P_O_T_C_Pk_S".split("_"),weekdaysMin:"Sv_P_O_T_C_Pk_S".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY.",LL:"YYYY. [gada] D. MMMM",LLL:"YYYY. [gada] D. MMMM, HH:mm",LLLL:"YYYY. [gada] D. MMMM, dddd, HH:mm"},calendar:{sameDay:"[Šodien pulksten] LT",nextDay:"[Rīt pulksten] LT",nextWeek:"dddd [pulksten] LT",lastDay:"[Vakar pulksten] LT",lastWeek:"[Pagājušā] dddd [pulksten] LT",sameElse:"L"},relativeTime:{future:"pēc %s",past:"pirms %s",s:yd,m:xd,mm:wd,h:xd,hh:wd,d:xd,dd:wd,M:xd,MM:wd,y:xd,yy:wd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),{words:{m:["jedan minut","jednog minuta"],mm:["minut","minuta","minuta"],h:["jedan sat","jednog sata"],hh:["sat","sata","sati"],dd:["dan","dana","dana"],MM:["mjesec","mjeseca","mjeseci"],yy:["godina","godine","godina"]},correctGrammaticalCase:function(a,b){return 1===a?b[0]:a>=2&&4>=a?b[1]:b[2]},translate:function(a,b,c){var d=tg.words[c];return 1===c.length?b?d[0]:d[1]:a+" "+tg.correctGrammaticalCase(a,d)}}),ug=(Kf.defineLocale("me",{months:["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar"],monthsShort:["jan.","feb.","mar.","apr.","maj","jun","jul","avg.","sep.","okt.","nov.","dec."],weekdays:["nedjelja","ponedjeljak","utorak","srijeda","četvrtak","petak","subota"],weekdaysShort:["ned.","pon.","uto.","sri.","čet.","pet.","sub."],weekdaysMin:["ne","po","ut","sr","če","pe","su"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sjutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[juče u] LT",lastWeek:function(){var a=["[prošle] [nedjelje] [u] LT","[prošlog] [ponedjeljka] [u] LT","[prošlog] [utorka] [u] LT","[prošle] [srijede] [u] LT","[prošlog] [četvrtka] [u] LT","[prošlog] [petka] [u] LT","[prošle] [subote] [u] LT"];return a[this.day()]},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"nekoliko sekundi",m:tg.translate,mm:tg.translate,h:tg.translate,hh:tg.translate,d:"dan",dd:tg.translate,M:"mjesec",MM:tg.translate,y:"godinu",yy:tg.translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),Kf.defineLocale("mk",{months:"јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември".split("_"),monthsShort:"јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек".split("_"),weekdays:"недела_понеделник_вторник_среда_четврток_петок_сабота".split("_"),weekdaysShort:"нед_пон_вто_сре_чет_пет_саб".split("_"),weekdaysMin:"нe_пo_вт_ср_че_пе_сa".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[Денес во] LT",nextDay:"[Утре во] LT",nextWeek:"[Во] dddd [во] LT",lastDay:"[Вчера во] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[Изминатата] dddd [во] LT";case 1:case 2:case 4:case 5:return"[Изминатиот] dddd [во] LT"}},sameElse:"L"},relativeTime:{future:"после %s",past:"пред %s",s:"неколку секунди",m:"минута",mm:"%d минути",h:"час",hh:"%d часа",d:"ден",dd:"%d дена",M:"месец",MM:"%d месеци",y:"година",yy:"%d години"},ordinalParse:/\d{1,2}-(ев|ен|ти|ви|ри|ми)/,ordinal:function(a){var b=a%10,c=a%100;return 0===a?a+"-ев":0===c?a+"-ен":c>10&&20>c?a+"-ти":1===b?a+"-ви":2===b?a+"-ри":7===b||8===b?a+"-ми":a+"-ти"},week:{dow:1,doy:7}}),Kf.defineLocale("ml",{months:"ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ".split("_"),monthsShort:"ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.".split("_"),weekdays:"ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച".split("_"),weekdaysShort:"ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി".split("_"),weekdaysMin:"ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ".split("_"),longDateFormat:{LT:"A h:mm -നു",LTS:"A h:mm:ss -നു",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm -നു",LLLL:"dddd, D MMMM YYYY, A h:mm -നു"},calendar:{sameDay:"[ഇന്ന്] LT",nextDay:"[നാളെ] LT",nextWeek:"dddd, LT",lastDay:"[ഇന്നലെ] LT",lastWeek:"[കഴിഞ്ഞ] dddd, LT",sameElse:"L"},relativeTime:{future:"%s കഴിഞ്ഞ്",past:"%s മുൻപ്",s:"അൽപ നിമിഷങ്ങൾ",m:"ഒരു മിനിറ്റ്",mm:"%d മിനിറ്റ്",h:"ഒരു മണിക്കൂർ",hh:"%d മണിക്കൂർ",d:"ഒരു ദിവസം",dd:"%d ദിവസം",M:"ഒരു മാസം",MM:"%d മാസം",y:"ഒരു വർഷം",yy:"%d വർഷം"},meridiemParse:/രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,isPM:function(a){return/^(ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി)$/.test(a)},meridiem:function(a,b,c){return 4>a?"രാത്രി":12>a?"രാവിലെ":17>a?"ഉച്ച കഴിഞ്ഞ്":20>a?"വൈകുന്നേരം":"രാത്രി"}}),{1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"}),vg={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"},wg=(Kf.defineLocale("mr",{months:"जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"),monthsShort:"जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"),weekdays:"रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),weekdaysShort:"रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"),weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),longDateFormat:{LT:"A h:mm वाजता",LTS:"A h:mm:ss वाजता",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm वाजता",LLLL:"dddd, D MMMM YYYY, A h:mm वाजता"},calendar:{sameDay:"[आज] LT",nextDay:"[उद्या] LT",nextWeek:"dddd, LT",lastDay:"[काल] LT",lastWeek:"[मागील] dddd, LT",sameElse:"L"},relativeTime:{future:"%sमध्ये",past:"%sपूर्वी",s:zd,m:zd,mm:zd,h:zd,hh:zd,d:zd,dd:zd,M:zd,MM:zd,y:zd,yy:zd},preparse:function(a){return a.replace(/[१२३४५६७८९०]/g,function(a){return vg[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return ug[a]})},meridiemParse:/रात्री|सकाळी|दुपारी|सायंकाळी/,meridiemHour:function(a,b){return 12===a&&(a=0),"रात्री"===b?4>a?a:a+12:"सकाळी"===b?a:"दुपारी"===b?a>=10?a:a+12:"सायंकाळी"===b?a+12:void 0},meridiem:function(a,b,c){return 4>a?"रात्री":10>a?"सकाळी":17>a?"दुपारी":20>a?"सायंकाळी":"रात्री"},week:{dow:0,doy:6}}),Kf.defineLocale("ms-my",{months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|tengahari|petang|malam/,meridiemHour:function(a,b){return 12===a&&(a=0),"pagi"===b?a:"tengahari"===b?a>=11?a:a+12:"petang"===b||"malam"===b?a+12:void 0},meridiem:function(a,b,c){return 11>a?"pagi":15>a?"tengahari":19>a?"petang":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Esok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kelmarin pukul] LT",lastWeek:"dddd [lepas pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lepas",s:"beberapa saat",m:"seminit",mm:"%d minit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}}),Kf.defineLocale("ms",{months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|tengahari|petang|malam/,meridiemHour:function(a,b){return 12===a&&(a=0),"pagi"===b?a:"tengahari"===b?a>=11?a:a+12:"petang"===b||"malam"===b?a+12:void 0},meridiem:function(a,b,c){return 11>a?"pagi":15>a?"tengahari":19>a?"petang":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Esok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kelmarin pukul] LT",lastWeek:"dddd [lepas pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lepas",s:"beberapa saat",m:"seminit",mm:"%d minit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}}),{1:"၁",2:"၂",3:"၃",4:"၄",5:"၅",6:"၆",7:"၇",8:"၈",9:"၉",0:"၀"}),xg={"၁":"1","၂":"2","၃":"3","၄":"4","၅":"5","၆":"6","၇":"7","၈":"8","၉":"9","၀":"0"},yg=(Kf.defineLocale("my",{months:"ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ".split("_"),monthsShort:"ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ".split("_"),weekdays:"တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ".split("_"),weekdaysShort:"နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),weekdaysMin:"နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[ယနေ.] LT [မှာ]",nextDay:"[မနက်ဖြန်] LT [မှာ]",nextWeek:"dddd LT [မှာ]",lastDay:"[မနေ.က] LT [မှာ]",lastWeek:"[ပြီးခဲ့သော] dddd LT [မှာ]",sameElse:"L"},relativeTime:{future:"လာမည့် %s မှာ",past:"လွန်ခဲ့သော %s က",s:"စက္ကန်.အနည်းငယ်",m:"တစ်မိနစ်",mm:"%d မိနစ်",h:"တစ်နာရီ",hh:"%d နာရီ",d:"တစ်ရက်",dd:"%d ရက်",M:"တစ်လ",MM:"%d လ",y:"တစ်နှစ်",yy:"%d နှစ်"},preparse:function(a){return a.replace(/[၁၂၃၄၅၆၇၈၉၀]/g,function(a){return xg[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return wg[a]})},week:{dow:1,doy:4}}),Kf.defineLocale("nb",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),weekdaysShort:"sø._ma._ti._on._to._fr._lø.".split("_"),weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] HH:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"},calendar:{sameDay:"[i dag kl.] LT",nextDay:"[i morgen kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[i går kl.] LT",lastWeek:"[forrige] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"for %s siden",s:"noen sekunder",m:"ett minutt",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dager",M:"en måned",MM:"%d måneder",y:"ett år",yy:"%d år"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),{1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"}),zg={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"},Ag=(Kf.defineLocale("ne",{months:"जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split("_"),monthsShort:"जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split("_"),weekdays:"आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split("_"),weekdaysShort:"आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"),weekdaysMin:"आ._सो._मं._बु._बि._शु._श.".split("_"),longDateFormat:{LT:"Aको h:mm बजे",LTS:"Aको h:mm:ss बजे",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, Aको h:mm बजे",LLLL:"dddd, D MMMM YYYY, Aको h:mm बजे"},preparse:function(a){return a.replace(/[१२३४५६७८९०]/g,function(a){return zg[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return yg[a]})},meridiemParse:/राति|बिहान|दिउँसो|साँझ/,meridiemHour:function(a,b){return 12===a&&(a=0),"राति"===b?4>a?a:a+12:"बिहान"===b?a:"दिउँसो"===b?a>=10?a:a+12:"साँझ"===b?a+12:void 0},meridiem:function(a,b,c){return 3>a?"राति":12>a?"बिहान":16>a?"दिउँसो":20>a?"साँझ":"राति"},calendar:{sameDay:"[आज] LT",nextDay:"[भोलि] LT",nextWeek:"[आउँदो] dddd[,] LT",lastDay:"[हिजो] LT",lastWeek:"[गएको] dddd[,] LT",sameElse:"L"},relativeTime:{future:"%sमा",past:"%s अगाडि",s:"केही क्षण",m:"एक मिनेट",mm:"%d मिनेट",h:"एक घण्टा",hh:"%d घण्टा",d:"एक दिन",dd:"%d दिन",M:"एक महिना",MM:"%d महिना",y:"एक बर्ष",yy:"%d बर्ष"},week:{dow:0,doy:6}}),"jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_")),Bg="jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),Cg=(Kf.defineLocale("nl",{months:"januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),monthsShort:function(a,b){return/-MMM-/.test(b)?Bg[a.month()]:Ag[a.month()]},weekdays:"zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),weekdaysShort:"zo._ma._di._wo._do._vr._za.".split("_"),weekdaysMin:"Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[vandaag om] LT",nextDay:"[morgen om] LT",nextWeek:"dddd [om] LT",lastDay:"[gisteren om] LT",lastWeek:"[afgelopen] dddd [om] LT",sameElse:"L"},relativeTime:{future:"over %s",past:"%s geleden",s:"een paar seconden",m:"één minuut",mm:"%d minuten",h:"één uur",hh:"%d uur",d:"één dag",dd:"%d dagen",M:"één maand",MM:"%d maanden",y:"één jaar",yy:"%d jaar"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(a){return a+(1===a||8===a||a>=20?"ste":"de")},week:{dow:1,doy:4}}),Kf.defineLocale("nn",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),weekdaysShort:"sun_mån_tys_ons_tor_fre_lau".split("_"),weekdaysMin:"su_må_ty_on_to_fr_lø".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] H:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"},calendar:{sameDay:"[I dag klokka] LT",nextDay:"[I morgon klokka] LT",nextWeek:"dddd [klokka] LT",lastDay:"[I går klokka] LT",lastWeek:"[Føregåande] dddd [klokka] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"for %s sidan",s:"nokre sekund",m:"eit minutt",mm:"%d minutt",h:"ein time",hh:"%d timar",d:"ein dag",dd:"%d dagar",M:"ein månad",MM:"%d månader",y:"eit år",yy:"%d år"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),"styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_")),Dg="stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_"),Eg=(Kf.defineLocale("pl",{months:function(a,b){return""===b?"("+Dg[a.month()]+"|"+Cg[a.month()]+")":/D MMMM/.test(b)?Dg[a.month()]:Cg[a.month()]},monthsShort:"sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),weekdays:"niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),weekdaysShort:"nie_pon_wt_śr_czw_pt_sb".split("_"),weekdaysMin:"Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Dziś o] LT",nextDay:"[Jutro o] LT",nextWeek:"[W] dddd [o] LT",lastDay:"[Wczoraj o] LT",lastWeek:function(){switch(this.day()){case 0:return"[W zeszłą niedzielę o] LT";case 3:return"[W zeszłą środę o] LT";case 6:return"[W zeszłą sobotę o] LT";default:return"[W zeszły] dddd [o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"%s temu",s:"kilka sekund",m:Bd,mm:Bd,h:Bd,hh:Bd,d:"1 dzień",dd:"%d dni",M:"miesiąc",MM:Bd,y:"rok",yy:Bd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("pt-br",{months:"Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),weekdaysMin:"Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY [às] HH:mm",LLLL:"dddd, D [de] MMMM [de] YYYY [às] HH:mm"},calendar:{sameDay:"[Hoje às] LT",nextDay:"[Amanhã às] LT",nextWeek:"dddd [às] LT",lastDay:"[Ontem às] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[Último] dddd [às] LT":"[Última] dddd [às] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"%s atrás",s:"poucos segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um mês",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinalParse:/\d{1,2}º/,ordinal:"%dº"}),Kf.defineLocale("pt",{months:"Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),weekdaysMin:"Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY HH:mm",LLLL:"dddd, D [de] MMMM [de] YYYY HH:mm"},calendar:{sameDay:"[Hoje às] LT",nextDay:"[Amanhã às] LT",nextWeek:"dddd [às] LT",lastDay:"[Ontem às] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[Último] dddd [às] LT":"[Última] dddd [às] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"há %s",s:"segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um mês",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}}),Kf.defineLocale("ro",{months:"ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),monthsShort:"ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),weekdays:"duminică_luni_marți_miercuri_joi_vineri_sâmbătă".split("_"),weekdaysShort:"Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),weekdaysMin:"Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[azi la] LT",nextDay:"[mâine la] LT",nextWeek:"dddd [la] LT",lastDay:"[ieri la] LT",lastWeek:"[fosta] dddd [la] LT",sameElse:"L"},relativeTime:{future:"peste %s",past:"%s în urmă",s:"câteva secunde",m:"un minut",mm:Cd,h:"o oră",hh:Cd,d:"o zi",dd:Cd,M:"o lună",MM:Cd,y:"un an",yy:Cd},week:{dow:1,doy:7}}),[/^янв/i,/^фев/i,/^мар/i,/^апр/i,/^ма[й|я]/i,/^июн/i,/^июл/i,/^авг/i,/^сен/i,/^окт/i,/^ноя/i,/^дек/i]),Fg=(Kf.defineLocale("ru",{months:{format:"Января_Февраля_Марта_Апреля_Мая_Июня_Июля_Августа_Сентября_Октября_Ноября_Декабря".split("_"),standalone:"Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь".split("_")},monthsShort:{format:"янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек".split("_"),standalone:"янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_")},weekdays:{standalone:"Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота".split("_"),format:"Воскресенье_Понедельник_Вторник_Среду_Четверг_Пятницу_Субботу".split("_"),isFormat:/\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/},weekdaysShort:"Вс_Пн_Вт_Ср_Чт_Пт_Сб".split("_"),weekdaysMin:"Вс_Пн_Вт_Ср_Чт_Пт_Сб".split("_"),monthsParse:Eg,longMonthsParse:Eg,shortMonthsParse:Eg,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY г.",LLL:"D MMMM YYYY г., HH:mm",LLLL:"dddd, D MMMM YYYY г., HH:mm"},calendar:{sameDay:"[Сегодня в] LT",nextDay:"[Завтра в] LT",lastDay:"[Вчера в] LT",nextWeek:function(a){if(a.week()===this.week())return 2===this.day()?"[Во] dddd [в] LT":"[В] dddd [в] LT";switch(this.day()){case 0:return"[В следующее] dddd [в] LT";case 1:case 2:case 4:return"[В следующий] dddd [в] LT";case 3:case 5:case 6:return"[В следующую] dddd [в] LT"}},lastWeek:function(a){if(a.week()===this.week())return 2===this.day()?"[Во] dddd [в] LT":"[В] dddd [в] LT";switch(this.day()){case 0:return"[В прошлое] dddd [в] LT";case 1:case 2:case 4:return"[В прошлый] dddd [в] LT";case 3:case 5:case 6:return"[В прошлую] dddd [в] LT"}},sameElse:"L"},relativeTime:{future:"через %s",past:"%s назад",s:"несколько секунд",m:Ed,mm:Ed,h:"час",hh:Ed,d:"день",dd:Ed,M:"месяц",MM:Ed,y:"год",yy:Ed},meridiemParse:/ночи|утра|дня|вечера/i,isPM:function(a){return/^(дня|вечера)$/.test(a)},meridiem:function(a,b,c){return 4>a?"ночи":12>a?"утра":17>a?"дня":"вечера"},ordinalParse:/\d{1,2}-(й|го|я)/,ordinal:function(a,b){switch(b){case"M":case"d":case"DDD":return a+"-й";case"D":return a+"-го";case"w":case"W":return a+"-я";default:return a}},week:{dow:1,doy:7}}),Kf.defineLocale("se",{months:"ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu".split("_"),monthsShort:"ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov".split("_"),weekdays:"sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat".split("_"),weekdaysShort:"sotn_vuos_maŋ_gask_duor_bear_láv".split("_"),weekdaysMin:"s_v_m_g_d_b_L".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"MMMM D. [b.] YYYY",LLL:"MMMM D. [b.] YYYY [ti.] HH:mm",LLLL:"dddd, MMMM D. [b.] YYYY [ti.] HH:mm"},calendar:{sameDay:"[otne ti] LT",nextDay:"[ihttin ti] LT",nextWeek:"dddd [ti] LT",lastDay:"[ikte ti] LT",lastWeek:"[ovddit] dddd [ti] LT",sameElse:"L"},relativeTime:{future:"%s geažes",past:"maŋit %s",s:"moadde sekunddat",m:"okta minuhta",mm:"%d minuhtat",h:"okta diimmu",hh:"%d diimmut",d:"okta beaivi",dd:"%d beaivvit",M:"okta mánnu",MM:"%d mánut",y:"okta jahki",yy:"%d jagit"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("si",{months:"ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්".split("_"),monthsShort:"ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ".split("_"),weekdays:"ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා".split("_"),weekdaysShort:"ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන".split("_"),weekdaysMin:"ඉ_ස_අ_බ_බ්‍ර_සි_සෙ".split("_"),longDateFormat:{LT:"a h:mm",LTS:"a h:mm:ss",L:"YYYY/MM/DD",LL:"YYYY MMMM D",LLL:"YYYY MMMM D, a h:mm",LLLL:"YYYY MMMM D [වැනි] dddd, a h:mm:ss"},calendar:{sameDay:"[අද] LT[ට]",nextDay:"[හෙට] LT[ට]",nextWeek:"dddd LT[ට]",lastDay:"[ඊයේ] LT[ට]",lastWeek:"[පසුගිය] dddd LT[ට]",sameElse:"L"},relativeTime:{future:"%sකින්",past:"%sකට පෙර",s:"තත්පර කිහිපය",m:"මිනිත්තුව",mm:"මිනිත්තු %d",h:"පැය",hh:"පැය %d",d:"දිනය",dd:"දින %d",M:"මාසය",MM:"මාස %d",y:"වසර",yy:"වසර %d"},ordinalParse:/\d{1,2} වැනි/,ordinal:function(a){return a+" වැනි"},meridiem:function(a,b,c){return a>11?c?"ප.ව.":"පස් වරු":c?"පෙ.ව.":"පෙර වරු"}}),"január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_")),Gg="jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_"),Hg=(Kf.defineLocale("sk",{months:Fg,monthsShort:Gg,weekdays:"nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),weekdaysShort:"ne_po_ut_st_št_pi_so".split("_"),weekdaysMin:"ne_po_ut_st_št_pi_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm"},calendar:{sameDay:"[dnes o] LT",nextDay:"[zajtra o] LT",nextWeek:function(){switch(this.day()){case 0:return"[v nedeľu o] LT";case 1:case 2:return"[v] dddd [o] LT";case 3:return"[v stredu o] LT";case 4:return"[vo štvrtok o] LT";case 5:return"[v piatok o] LT";case 6:return"[v sobotu o] LT"}},lastDay:"[včera o] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulú nedeľu o] LT";case 1:case 2:return"[minulý] dddd [o] LT";case 3:return"[minulú stredu o] LT";case 4:case 5:return"[minulý] dddd [o] LT";case 6:return"[minulú sobotu o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"pred %s",s:Gd,m:Gd,mm:Gd,h:Gd,hh:Gd,d:Gd,dd:Gd,M:Gd,MM:Gd,y:Gd,yy:Gd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("sl",{months:"januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),weekdays:"nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),weekdaysShort:"ned._pon._tor._sre._čet._pet._sob.".split("_"),weekdaysMin:"ne_po_to_sr_če_pe_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danes ob] LT",nextDay:"[jutri ob] LT",nextWeek:function(){switch(this.day()){case 0:return"[v] [nedeljo] [ob] LT";case 3:return"[v] [sredo] [ob] LT";case 6:return"[v] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[v] dddd [ob] LT"}},lastDay:"[včeraj ob] LT",lastWeek:function(){switch(this.day()){case 0:return"[prejšnjo] [nedeljo] [ob] LT";case 3:return"[prejšnjo] [sredo] [ob] LT";case 6:return"[prejšnjo] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[prejšnji] dddd [ob] LT"}},sameElse:"L"},relativeTime:{future:"čez %s",past:"pred %s",s:Hd,m:Hd,mm:Hd,h:Hd,hh:Hd,d:Hd,dd:Hd,M:Hd,MM:Hd,y:Hd,yy:Hd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),Kf.defineLocale("sq",{months:"Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"),monthsShort:"Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),weekdays:"E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split("_"),weekdaysShort:"Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),weekdaysMin:"D_H_Ma_Më_E_P_Sh".split("_"),meridiemParse:/PD|MD/,isPM:function(a){return"M"===a.charAt(0)},meridiem:function(a,b,c){return 12>a?"PD":"MD"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Sot në] LT",nextDay:"[Nesër në] LT",nextWeek:"dddd [në] LT",lastDay:"[Dje në] LT",lastWeek:"dddd [e kaluar në] LT",sameElse:"L"},relativeTime:{future:"në %s",past:"%s më parë",s:"disa sekonda",m:"një minutë",mm:"%d minuta",h:"një orë",hh:"%d orë",d:"një ditë",dd:"%d ditë",M:"një muaj",MM:"%d muaj",y:"një vit",yy:"%d vite"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),{words:{m:["један минут","једне минуте"],mm:["минут","минуте","минута"],h:["један сат","једног сата"],hh:["сат","сата","сати"],dd:["дан","дана","дана"],MM:["месец","месеца","месеци"],yy:["година","године","година"]},correctGrammaticalCase:function(a,b){return 1===a?b[0]:a>=2&&4>=a?b[1]:b[2]},translate:function(a,b,c){var d=Hg.words[c];return 1===c.length?b?d[0]:d[1]:a+" "+Hg.correctGrammaticalCase(a,d)}}),Ig=(Kf.defineLocale("sr-cyrl",{months:["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар"],monthsShort:["јан.","феб.","мар.","апр.","мај","јун","јул","авг.","сеп.","окт.","нов.","дец."],weekdays:["недеља","понедељак","уторак","среда","четвртак","петак","субота"],weekdaysShort:["нед.","пон.","уто.","сре.","чет.","пет.","суб."],weekdaysMin:["не","по","ут","ср","че","пе","су"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[данас у] LT",nextDay:"[сутра у] LT",nextWeek:function(){switch(this.day()){case 0:return"[у] [недељу] [у] LT";case 3:return"[у] [среду] [у] LT";case 6:return"[у] [суботу] [у] LT";case 1:case 2:case 4:case 5:return"[у] dddd [у] LT"}},lastDay:"[јуче у] LT",lastWeek:function(){var a=["[прошле] [недеље] [у] LT","[прошлог] [понедељка] [у] LT","[прошлог] [уторка] [у] LT","[прошле] [среде] [у] LT","[прошлог] [четвртка] [у] LT","[прошлог] [петка] [у] LT","[прошле] [суботе] [у] LT"];return a[this.day()]},sameElse:"L"},relativeTime:{future:"за %s",past:"пре %s",s:"неколико секунди",m:Hg.translate,mm:Hg.translate,h:Hg.translate,hh:Hg.translate,d:"дан",dd:Hg.translate,M:"месец",MM:Hg.translate,y:"годину",yy:Hg.translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),{words:{m:["jedan minut","jedne minute"],mm:["minut","minute","minuta"],h:["jedan sat","jednog sata"],hh:["sat","sata","sati"],dd:["dan","dana","dana"],MM:["mesec","meseca","meseci"],yy:["godina","godine","godina"]},correctGrammaticalCase:function(a,b){return 1===a?b[0]:a>=2&&4>=a?b[1]:b[2]},translate:function(a,b,c){var d=Ig.words[c];return 1===c.length?b?d[0]:d[1]:a+" "+Ig.correctGrammaticalCase(a,d)}}),Jg=(Kf.defineLocale("sr",{months:["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar"],monthsShort:["jan.","feb.","mar.","apr.","maj","jun","jul","avg.","sep.","okt.","nov.","dec."],weekdays:["nedelja","ponedeljak","utorak","sreda","četvrtak","petak","subota"],weekdaysShort:["ned.","pon.","uto.","sre.","čet.","pet.","sub."],weekdaysMin:["ne","po","ut","sr","če","pe","su"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedelju] [u] LT";case 3:return"[u] [sredu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[juče u] LT",lastWeek:function(){var a=["[prošle] [nedelje] [u] LT","[prošlog] [ponedeljka] [u] LT","[prošlog] [utorka] [u] LT","[prošle] [srede] [u] LT","[prošlog] [četvrtka] [u] LT","[prošlog] [petka] [u] LT","[prošle] [subote] [u] LT"];return a[this.day()]},sameElse:"L"},relativeTime:{future:"za %s",past:"pre %s",s:"nekoliko sekundi",m:Ig.translate,mm:Ig.translate,h:Ig.translate,hh:Ig.translate,d:"dan",dd:Ig.translate,M:"mesec",MM:Ig.translate,y:"godinu",yy:Ig.translate
},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),Kf.defineLocale("sv",{months:"januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),weekdaysShort:"sön_mån_tis_ons_tor_fre_lör".split("_"),weekdaysMin:"sö_må_ti_on_to_fr_lö".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Idag] LT",nextDay:"[Imorgon] LT",lastDay:"[Igår] LT",nextWeek:"[På] dddd LT",lastWeek:"[I] dddd[s] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"för %s sedan",s:"några sekunder",m:"en minut",mm:"%d minuter",h:"en timme",hh:"%d timmar",d:"en dag",dd:"%d dagar",M:"en månad",MM:"%d månader",y:"ett år",yy:"%d år"},ordinalParse:/\d{1,2}(e|a)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"e":1===b?"a":2===b?"a":"e";return a+c},week:{dow:1,doy:4}}),Kf.defineLocale("sw",{months:"Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"),weekdays:"Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split("_"),weekdaysShort:"Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"),weekdaysMin:"J2_J3_J4_J5_Al_Ij_J1".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[leo saa] LT",nextDay:"[kesho saa] LT",nextWeek:"[wiki ijayo] dddd [saat] LT",lastDay:"[jana] LT",lastWeek:"[wiki iliyopita] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s baadaye",past:"tokea %s",s:"hivi punde",m:"dakika moja",mm:"dakika %d",h:"saa limoja",hh:"masaa %d",d:"siku moja",dd:"masiku %d",M:"mwezi mmoja",MM:"miezi %d",y:"mwaka mmoja",yy:"miaka %d"},week:{dow:1,doy:7}}),{1:"௧",2:"௨",3:"௩",4:"௪",5:"௫",6:"௬",7:"௭",8:"௮",9:"௯",0:"௦"}),Kg={"௧":"1","௨":"2","௩":"3","௪":"4","௫":"5","௬":"6","௭":"7","௮":"8","௯":"9","௦":"0"},Lg=(Kf.defineLocale("ta",{months:"ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),monthsShort:"ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),weekdays:"ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை".split("_"),weekdaysShort:"ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி".split("_"),weekdaysMin:"ஞா_தி_செ_பு_வி_வெ_ச".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, HH:mm",LLLL:"dddd, D MMMM YYYY, HH:mm"},calendar:{sameDay:"[இன்று] LT",nextDay:"[நாளை] LT",nextWeek:"dddd, LT",lastDay:"[நேற்று] LT",lastWeek:"[கடந்த வாரம்] dddd, LT",sameElse:"L"},relativeTime:{future:"%s இல்",past:"%s முன்",s:"ஒரு சில விநாடிகள்",m:"ஒரு நிமிடம்",mm:"%d நிமிடங்கள்",h:"ஒரு மணி நேரம்",hh:"%d மணி நேரம்",d:"ஒரு நாள்",dd:"%d நாட்கள்",M:"ஒரு மாதம்",MM:"%d மாதங்கள்",y:"ஒரு வருடம்",yy:"%d ஆண்டுகள்"},ordinalParse:/\d{1,2}வது/,ordinal:function(a){return a+"வது"},preparse:function(a){return a.replace(/[௧௨௩௪௫௬௭௮௯௦]/g,function(a){return Kg[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return Jg[a]})},meridiemParse:/யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,meridiem:function(a,b,c){return 2>a?" யாமம்":6>a?" வைகறை":10>a?" காலை":14>a?" நண்பகல்":18>a?" எற்பாடு":22>a?" மாலை":" யாமம்"},meridiemHour:function(a,b){return 12===a&&(a=0),"யாமம்"===b?2>a?a:a+12:"வைகறை"===b||"காலை"===b?a:"நண்பகல்"===b&&a>=10?a:a+12},week:{dow:0,doy:6}}),Kf.defineLocale("te",{months:"జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జూలై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్".split("_"),monthsShort:"జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జూలై_ఆగ._సెప్._అక్టో._నవ._డిసె.".split("_"),weekdays:"ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం".split("_"),weekdaysShort:"ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని".split("_"),weekdaysMin:"ఆ_సో_మం_బు_గు_శు_శ".split("_"),longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm",LLLL:"dddd, D MMMM YYYY, A h:mm"},calendar:{sameDay:"[నేడు] LT",nextDay:"[రేపు] LT",nextWeek:"dddd, LT",lastDay:"[నిన్న] LT",lastWeek:"[గత] dddd, LT",sameElse:"L"},relativeTime:{future:"%s లో",past:"%s క్రితం",s:"కొన్ని క్షణాలు",m:"ఒక నిమిషం",mm:"%d నిమిషాలు",h:"ఒక గంట",hh:"%d గంటలు",d:"ఒక రోజు",dd:"%d రోజులు",M:"ఒక నెల",MM:"%d నెలలు",y:"ఒక సంవత్సరం",yy:"%d సంవత్సరాలు"},ordinalParse:/\d{1,2}వ/,ordinal:"%dవ",meridiemParse:/రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,meridiemHour:function(a,b){return 12===a&&(a=0),"రాత్రి"===b?4>a?a:a+12:"ఉదయం"===b?a:"మధ్యాహ్నం"===b?a>=10?a:a+12:"సాయంత్రం"===b?a+12:void 0},meridiem:function(a,b,c){return 4>a?"రాత్రి":10>a?"ఉదయం":17>a?"మధ్యాహ్నం":20>a?"సాయంత్రం":"రాత్రి"},week:{dow:0,doy:6}}),Kf.defineLocale("th",{months:"มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"),monthsShort:"มกรา_กุมภา_มีนา_เมษา_พฤษภา_มิถุนา_กรกฎา_สิงหา_กันยา_ตุลา_พฤศจิกา_ธันวา".split("_"),weekdays:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"),weekdaysShort:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split("_"),weekdaysMin:"อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),longDateFormat:{LT:"H นาฬิกา m นาที",LTS:"H นาฬิกา m นาที s วินาที",L:"YYYY/MM/DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY เวลา H นาฬิกา m นาที",LLLL:"วันddddที่ D MMMM YYYY เวลา H นาฬิกา m นาที"},meridiemParse:/ก่อนเที่ยง|หลังเที่ยง/,isPM:function(a){return"หลังเที่ยง"===a},meridiem:function(a,b,c){return 12>a?"ก่อนเที่ยง":"หลังเที่ยง"},calendar:{sameDay:"[วันนี้ เวลา] LT",nextDay:"[พรุ่งนี้ เวลา] LT",nextWeek:"dddd[หน้า เวลา] LT",lastDay:"[เมื่อวานนี้ เวลา] LT",lastWeek:"[วัน]dddd[ที่แล้ว เวลา] LT",sameElse:"L"},relativeTime:{future:"อีก %s",past:"%sที่แล้ว",s:"ไม่กี่วินาที",m:"1 นาที",mm:"%d นาที",h:"1 ชั่วโมง",hh:"%d ชั่วโมง",d:"1 วัน",dd:"%d วัน",M:"1 เดือน",MM:"%d เดือน",y:"1 ปี",yy:"%d ปี"}}),Kf.defineLocale("tl-ph",{months:"Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),monthsShort:"Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),weekdays:"Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),weekdaysShort:"Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),weekdaysMin:"Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"MM/D/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY HH:mm",LLLL:"dddd, MMMM DD, YYYY HH:mm"},calendar:{sameDay:"[Ngayon sa] LT",nextDay:"[Bukas sa] LT",nextWeek:"dddd [sa] LT",lastDay:"[Kahapon sa] LT",lastWeek:"dddd [huling linggo] LT",sameElse:"L"},relativeTime:{future:"sa loob ng %s",past:"%s ang nakalipas",s:"ilang segundo",m:"isang minuto",mm:"%d minuto",h:"isang oras",hh:"%d oras",d:"isang araw",dd:"%d araw",M:"isang buwan",MM:"%d buwan",y:"isang taon",yy:"%d taon"},ordinalParse:/\d{1,2}/,ordinal:function(a){return a},week:{dow:1,doy:4}}),"pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut".split("_")),Mg=(Kf.defineLocale("tlh",{months:"tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’".split("_"),monthsShort:"jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’".split("_"),weekdays:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),weekdaysShort:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),weekdaysMin:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[DaHjaj] LT",nextDay:"[wa’leS] LT",nextWeek:"LLL",lastDay:"[wa’Hu’] LT",lastWeek:"LLL",sameElse:"L"},relativeTime:{future:Id,past:Jd,s:"puS lup",m:"wa’ tup",mm:Kd,h:"wa’ rep",hh:Kd,d:"wa’ jaj",dd:Kd,M:"wa’ jar",MM:Kd,y:"wa’ DIS",yy:Kd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),{1:"'inci",5:"'inci",8:"'inci",70:"'inci",80:"'inci",2:"'nci",7:"'nci",20:"'nci",50:"'nci",3:"'üncü",4:"'üncü",100:"'üncü",6:"'ncı",9:"'uncu",10:"'uncu",30:"'uncu",60:"'ıncı",90:"'ıncı"}),Ng=(Kf.defineLocale("tr",{months:"Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),monthsShort:"Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),weekdays:"Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),weekdaysShort:"Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),weekdaysMin:"Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[bugün saat] LT",nextDay:"[yarın saat] LT",nextWeek:"[haftaya] dddd [saat] LT",lastDay:"[dün] LT",lastWeek:"[geçen hafta] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s önce",s:"birkaç saniye",m:"bir dakika",mm:"%d dakika",h:"bir saat",hh:"%d saat",d:"bir gün",dd:"%d gün",M:"bir ay",MM:"%d ay",y:"bir yıl",yy:"%d yıl"},ordinalParse:/\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,ordinal:function(a){if(0===a)return a+"'ıncı";var b=a%10,c=a%100-b,d=a>=100?100:null;return a+(Mg[b]||Mg[c]||Mg[d])},week:{dow:1,doy:7}}),Kf.defineLocale("tzl",{months:"Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar".split("_"),monthsShort:"Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec".split("_"),weekdays:"Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi".split("_"),weekdaysShort:"Súl_Lún_Mai_Már_Xhú_Vié_Sát".split("_"),weekdaysMin:"Sú_Lú_Ma_Má_Xh_Vi_Sá".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"D. MMMM [dallas] YYYY",LLL:"D. MMMM [dallas] YYYY HH.mm",LLLL:"dddd, [li] D. MMMM [dallas] YYYY HH.mm"},meridiem:function(a,b,c){return a>11?c?"d'o":"D'O":c?"d'a":"D'A"},calendar:{sameDay:"[oxhi à] LT",nextDay:"[demà à] LT",nextWeek:"dddd [à] LT",lastDay:"[ieiri à] LT",lastWeek:"[sür el] dddd [lasteu à] LT",sameElse:"L"},relativeTime:{future:"osprei %s",past:"ja%s",s:Md,m:Md,mm:Md,h:Md,hh:Md,d:Md,dd:Md,M:Md,MM:Md,y:Md,yy:Md},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("tzm-latn",{months:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),monthsShort:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),weekdays:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),weekdaysShort:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),weekdaysMin:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[asdkh g] LT",nextDay:"[aska g] LT",nextWeek:"dddd [g] LT",lastDay:"[assant g] LT",lastWeek:"dddd [g] LT",sameElse:"L"},relativeTime:{future:"dadkh s yan %s",past:"yan %s",s:"imik",m:"minuḍ",mm:"%d minuḍ",h:"saɛa",hh:"%d tassaɛin",d:"ass",dd:"%d ossan",M:"ayowr",MM:"%d iyyirn",y:"asgas",yy:"%d isgasn"},week:{dow:6,doy:12}}),Kf.defineLocale("tzm",{months:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),monthsShort:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),weekdays:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),weekdaysShort:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),weekdaysMin:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[ⴰⵙⴷⵅ ⴴ] LT",nextDay:"[ⴰⵙⴽⴰ ⴴ] LT",nextWeek:"dddd [ⴴ] LT",lastDay:"[ⴰⵚⴰⵏⵜ ⴴ] LT",lastWeek:"dddd [ⴴ] LT",sameElse:"L"},relativeTime:{future:"ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s",past:"ⵢⴰⵏ %s",s:"ⵉⵎⵉⴽ",m:"ⵎⵉⵏⵓⴺ",mm:"%d ⵎⵉⵏⵓⴺ",h:"ⵙⴰⵄⴰ",hh:"%d ⵜⴰⵙⵙⴰⵄⵉⵏ",d:"ⴰⵙⵙ",dd:"%d oⵙⵙⴰⵏ",M:"ⴰⵢoⵓⵔ",MM:"%d ⵉⵢⵢⵉⵔⵏ",y:"ⴰⵙⴳⴰⵙ",yy:"%d ⵉⵙⴳⴰⵙⵏ"},week:{dow:6,doy:12}}),Kf.defineLocale("uk",{months:{format:"січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_"),standalone:"січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_")},monthsShort:"січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),weekdays:Pd,weekdaysShort:"нд_пн_вт_ср_чт_пт_сб".split("_"),weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY р.",LLL:"D MMMM YYYY р., HH:mm",LLLL:"dddd, D MMMM YYYY р., HH:mm"},calendar:{sameDay:Qd("[Сьогодні "),nextDay:Qd("[Завтра "),lastDay:Qd("[Вчора "),nextWeek:Qd("[У] dddd ["),lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return Qd("[Минулої] dddd [").call(this);case 1:case 2:case 4:return Qd("[Минулого] dddd [").call(this)}},sameElse:"L"},relativeTime:{future:"за %s",past:"%s тому",s:"декілька секунд",m:Od,mm:Od,h:"годину",hh:Od,d:"день",dd:Od,M:"місяць",MM:Od,y:"рік",yy:Od},meridiemParse:/ночі|ранку|дня|вечора/,isPM:function(a){return/^(дня|вечора)$/.test(a)},meridiem:function(a,b,c){return 4>a?"ночі":12>a?"ранку":17>a?"дня":"вечора"},ordinalParse:/\d{1,2}-(й|го)/,ordinal:function(a,b){switch(b){case"M":case"d":case"DDD":case"w":case"W":return a+"-й";case"D":return a+"-го";default:return a}},week:{dow:1,doy:7}}),Kf.defineLocale("uz",{months:"январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split("_"),monthsShort:"янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),weekdays:"Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"),weekdaysShort:"Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"),weekdaysMin:"Як_Ду_Се_Чо_Па_Жу_Ша".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"D MMMM YYYY, dddd HH:mm"},calendar:{sameDay:"[Бугун соат] LT [да]",nextDay:"[Эртага] LT [да]",nextWeek:"dddd [куни соат] LT [да]",lastDay:"[Кеча соат] LT [да]",lastWeek:"[Утган] dddd [куни соат] LT [да]",sameElse:"L"},relativeTime:{future:"Якин %s ичида",past:"Бир неча %s олдин",s:"фурсат",m:"бир дакика",mm:"%d дакика",h:"бир соат",hh:"%d соат",d:"бир кун",dd:"%d кун",M:"бир ой",MM:"%d ой",y:"бир йил",yy:"%d йил"},week:{dow:1,doy:7}}),Kf.defineLocale("vi",{months:"tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"),monthsShort:"Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),weekdays:"chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),weekdaysShort:"CN_T2_T3_T4_T5_T6_T7".split("_"),weekdaysMin:"CN_T2_T3_T4_T5_T6_T7".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM [năm] YYYY",LLL:"D MMMM [năm] YYYY HH:mm",LLLL:"dddd, D MMMM [năm] YYYY HH:mm",l:"DD/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY HH:mm",llll:"ddd, D MMM YYYY HH:mm"},calendar:{sameDay:"[Hôm nay lúc] LT",nextDay:"[Ngày mai lúc] LT",nextWeek:"dddd [tuần tới lúc] LT",lastDay:"[Hôm qua lúc] LT",lastWeek:"dddd [tuần rồi lúc] LT",sameElse:"L"},relativeTime:{future:"%s tới",past:"%s trước",s:"vài giây",m:"một phút",mm:"%d phút",h:"một giờ",hh:"%d giờ",d:"một ngày",dd:"%d ngày",M:"một tháng",MM:"%d tháng",y:"một năm",yy:"%d năm"},ordinalParse:/\d{1,2}/,ordinal:function(a){return a},week:{dow:1,doy:4}}),Kf.defineLocale("zh-cn",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"Ah点mm分",LTS:"Ah点m分s秒",L:"YYYY-MM-DD",LL:"YYYY年MMMD日",LLL:"YYYY年MMMD日Ah点mm分",LLLL:"YYYY年MMMD日ddddAh点mm分",l:"YYYY-MM-DD",ll:"YYYY年MMMD日",lll:"YYYY年MMMD日Ah点mm分",llll:"YYYY年MMMD日ddddAh点mm分"},meridiemParse:/凌晨|早上|上午|中午|下午|晚上/,meridiemHour:function(a,b){return 12===a&&(a=0),"凌晨"===b||"早上"===b||"上午"===b?a:"下午"===b||"晚上"===b?a+12:a>=11?a:a+12},meridiem:function(a,b,c){var d=100*a+b;return 600>d?"凌晨":900>d?"早上":1130>d?"上午":1230>d?"中午":1800>d?"下午":"晚上"},calendar:{sameDay:function(){return 0===this.minutes()?"[今天]Ah[点整]":"[今天]LT"},nextDay:function(){return 0===this.minutes()?"[明天]Ah[点整]":"[明天]LT"},lastDay:function(){return 0===this.minutes()?"[昨天]Ah[点整]":"[昨天]LT"},nextWeek:function(){var a,b;return a=Kf().startOf("week"),b=this.unix()-a.unix()>=604800?"[下]":"[本]",0===this.minutes()?b+"dddAh点整":b+"dddAh点mm"},lastWeek:function(){var a,b;return a=Kf().startOf("week"),b=this.unix()<a.unix()?"[上]":"[本]",0===this.minutes()?b+"dddAh点整":b+"dddAh点mm"},sameElse:"LL"},ordinalParse:/\d{1,2}(日|月|周)/,ordinal:function(a,b){switch(b){case"d":case"D":case"DDD":return a+"日";case"M":return a+"月";case"w":case"W":return a+"周";default:return a}},relativeTime:{future:"%s内",past:"%s前",s:"几秒",m:"1 分钟",mm:"%d 分钟",h:"1 小时",hh:"%d 小时",d:"1 天",dd:"%d 天",M:"1 个月",MM:"%d 个月",y:"1 年",yy:"%d 年"},week:{dow:1,doy:4}}),Kf.defineLocale("zh-tw",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"週日_週一_週二_週三_週四_週五_週六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"Ah點mm分",LTS:"Ah點m分s秒",L:"YYYY年MMMD日",LL:"YYYY年MMMD日",LLL:"YYYY年MMMD日Ah點mm分",LLLL:"YYYY年MMMD日ddddAh點mm分",l:"YYYY年MMMD日",ll:"YYYY年MMMD日",lll:"YYYY年MMMD日Ah點mm分",llll:"YYYY年MMMD日ddddAh點mm分"},meridiemParse:/早上|上午|中午|下午|晚上/,meridiemHour:function(a,b){return 12===a&&(a=0),"早上"===b||"上午"===b?a:"中午"===b?a>=11?a:a+12:"下午"===b||"晚上"===b?a+12:void 0},meridiem:function(a,b,c){var d=100*a+b;return 900>d?"早上":1130>d?"上午":1230>d?"中午":1800>d?"下午":"晚上"},calendar:{sameDay:"[今天]LT",nextDay:"[明天]LT",nextWeek:"[下]ddddLT",lastDay:"[昨天]LT",lastWeek:"[上]ddddLT",sameElse:"L"},ordinalParse:/\d{1,2}(日|月|週)/,ordinal:function(a,b){switch(b){case"d":case"D":case"DDD":return a+"日";case"M":return a+"月";case"w":case"W":return a+"週";default:return a}},relativeTime:{future:"%s內",past:"%s前",s:"幾秒",m:"一分鐘",mm:"%d分鐘",h:"一小時",hh:"%d小時",d:"一天",dd:"%d天",M:"一個月",MM:"%d個月",y:"一年",yy:"%d年"}}),Kf);return Ng.locale("en"),Ng});
/*! version : 4.17.37
 =========================================================
 bootstrap-datetimejs
 https://github.com/Eonasdan/bootstrap-datetimepicker
 Copyright (c) 2015 Jonathan Peterson
 =========================================================
 */
/*
 The MIT License (MIT)

 Copyright (c) 2015 Jonathan Peterson

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
/*global define:false */
/*global exports:false */
/*global require:false */
/*global jQuery:false */
/*global moment:false */
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD is used - Register as an anonymous module.
        define(['jquery', 'moment'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'), require('moment'));
    } else {
        // Neither AMD nor CommonJS used. Use global variables.
        if (typeof jQuery === 'undefined') {
            throw 'bootstrap-datetimepicker requires jQuery to be loaded first';
        }
        if (typeof moment === 'undefined') {
            throw 'bootstrap-datetimepicker requires Moment.js to be loaded first';
        }
        factory(jQuery, moment);
    }
}(function ($, moment) {
    'use strict';
    if (!moment) {
        throw new Error('bootstrap-datetimepicker requires Moment.js to be loaded first');
    }

    var dateTimePicker = function (element, options) {
        var picker = {},
            date,
            viewDate,
            unset = true,
            input,
            component = false,
            widget = false,
            use24Hours=true,
            minViewModeNumber = 0,
            actualFormat,
            parseFormats,
            currentViewMode,
            datePickerModes = [
                {
                    clsName: 'days',
                    navFnc: 'M',
                    navStep: 1
                },
                {
                    clsName: 'months',
                    navFnc: 'y',
                    navStep: 1
                },
                {
                    clsName: 'years',
                    navFnc: 'y',
                    navStep: 10
                },
                {
                    clsName: 'decades',
                    navFnc: 'y',
                    navStep: 100
                }
            ],
            viewModes = ['days', 'months', 'years', 'decades'],
            verticalModes = ['top', 'bottom', 'auto'],
            horizontalModes = ['left', 'right', 'auto'],
            toolbarPlacements = ['default', 'top', 'bottom'],
            keyMap = {
                'up': 38,
                38: 'up',
                'down': 40,
                40: 'down',
                'left': 37,
                37: 'left',
                'right': 39,
                39: 'right',
                'tab': 9,
                9: 'tab',
                'escape': 27,
                27: 'escape',
                'enter': 13,
                13: 'enter',
                'pageUp': 33,
                33: 'pageUp',
                'pageDown': 34,
                34: 'pageDown',
                'shift': 16,
                16: 'shift',
                'control': 17,
                17: 'control',
                'space': 32,
                32: 'space',
                't': 84,
                84: 't',
                'delete': 46,
                46: 'delete'
            },
            keyState = {},

            /********************************************************************************
             *
             * Private functions
             *
             ********************************************************************************/
            getMoment = function (d) {
                var tzEnabled = false,
                    returnMoment,
                    currentZoneOffset,
                    incomingZoneOffset,
                    timeZoneIndicator,
                    dateWithTimeZoneInfo;

                if (moment.tz !== undefined && options.timeZone !== undefined && options.timeZone !== null && options.timeZone !== '') {
                    tzEnabled = true;
                }
                if (d === undefined || d === null) {
                    if (tzEnabled) {
                        returnMoment = moment().tz(options.timeZone).startOf('d');
                    } else {
                        returnMoment = moment().startOf('d');
                    }
                } else {
                    if (tzEnabled) {
                        currentZoneOffset = moment().tz(options.timeZone).utcOffset();
                        incomingZoneOffset = moment(d, parseFormats, options.useStrict).utcOffset();
                        if (incomingZoneOffset !== currentZoneOffset) {
                            timeZoneIndicator = moment().tz(options.timeZone).format('Z');
                            dateWithTimeZoneInfo = moment(d, parseFormats, options.useStrict).format('YYYY-MM-DD[T]HH:mm:ss') + timeZoneIndicator;
                            returnMoment = moment(dateWithTimeZoneInfo, parseFormats, options.useStrict).tz(options.timeZone);
                        } else {
                            returnMoment = moment(d, parseFormats, options.useStrict).tz(options.timeZone);
                        }
                    } else {
                        returnMoment = moment(d, parseFormats, options.useStrict);
                    }
                }
                return returnMoment;
            },
            isEnabled = function (granularity) {
                if (typeof granularity !== 'string' || granularity.length > 1) {
                    throw new TypeError('isEnabled expects a single character string parameter');
                }
                switch (granularity) {
                    case 'y':
                        return actualFormat.indexOf('Y') !== -1;
                    case 'M':
                        return actualFormat.indexOf('M') !== -1;
                    case 'd':
                        return actualFormat.toLowerCase().indexOf('d') !== -1;
                    case 'h':
                    case 'H':
                        return actualFormat.toLowerCase().indexOf('h') !== -1;
                    case 'm':
                        return actualFormat.indexOf('m') !== -1;
                    case 's':
                        return actualFormat.indexOf('s') !== -1;
                    default:
                        return false;
                }
            },
            hasTime = function () {
                return (isEnabled('h') || isEnabled('m') || isEnabled('s'));
            },

            hasDate = function () {
                return (isEnabled('y') || isEnabled('M') || isEnabled('d'));
            },

            getDatePickerTemplate = function () {
                var headTemplate = $('<thead>')
                        .append($('<tr>')
                            .append($('<th>').addClass('prev').attr('data-action', 'previous')
                                .append($('<span>').addClass(options.icons.previous))
                                )
                            .append($('<th>').addClass('picker-switch').attr('data-action', 'pickerSwitch').attr('colspan', (options.calendarWeeks ? '6' : '5')))
                            .append($('<th>').addClass('next').attr('data-action', 'next')
                                .append($('<span>').addClass(options.icons.next))
                                )
                            ),
                    contTemplate = $('<tbody>')
                        .append($('<tr>')
                            .append($('<td>').attr('colspan', (options.calendarWeeks ? '8' : '7')))
                            );

                return [
                    $('<div>').addClass('datepicker-days')
                        .append($('<table>').addClass('table-condensed')
                            .append(headTemplate)
                            .append($('<tbody>'))
                            ),
                    $('<div>').addClass('datepicker-months')
                        .append($('<table>').addClass('table-condensed')
                            .append(headTemplate.clone())
                            .append(contTemplate.clone())
                            ),
                    $('<div>').addClass('datepicker-years')
                        .append($('<table>').addClass('table-condensed')
                            .append(headTemplate.clone())
                            .append(contTemplate.clone())
                            ),
                    $('<div>').addClass('datepicker-decades')
                        .append($('<table>').addClass('table-condensed')
                            .append(headTemplate.clone())
                            .append(contTemplate.clone())
                            )
                ];
            },

            getTimePickerMainTemplate = function () {
                var topRow = $('<tr>'),
                    middleRow = $('<tr>'),
                    bottomRow = $('<tr>');

                if (isEnabled('h')) {
                    topRow.append($('<td>')
                        .append($('<a>').attr({href: '#', tabindex: '-1', 'title': options.tooltips.incrementHour}).addClass('btn').attr('data-action', 'incrementHours')
                            .append($('<span>').addClass(options.icons.up))));
                    middleRow.append($('<td>')
                        .append($('<span>').addClass('timepicker-hour').attr({'data-time-component':'hours', 'title': options.tooltips.pickHour}).attr('data-action', 'showHours')));
                    bottomRow.append($('<td>')
                        .append($('<a>').attr({href: '#', tabindex: '-1', 'title': options.tooltips.decrementHour}).addClass('btn').attr('data-action', 'decrementHours')
                            .append($('<span>').addClass(options.icons.down))));
                }
                if (isEnabled('m')) {
                    if (isEnabled('h')) {
                        topRow.append($('<td>').addClass('separator'));
                        middleRow.append($('<td>').addClass('separator').html(':'));
                        bottomRow.append($('<td>').addClass('separator'));
                    }
                    topRow.append($('<td>')
                        .append($('<a>').attr({href: '#', tabindex: '-1', 'title': options.tooltips.incrementMinute}).addClass('btn').attr('data-action', 'incrementMinutes')
                            .append($('<span>').addClass(options.icons.up))));
                    middleRow.append($('<td>')
                        .append($('<span>').addClass('timepicker-minute').attr({'data-time-component': 'minutes', 'title': options.tooltips.pickMinute}).attr('data-action', 'showMinutes')));
                    bottomRow.append($('<td>')
                        .append($('<a>').attr({href: '#', tabindex: '-1', 'title': options.tooltips.decrementMinute}).addClass('btn').attr('data-action', 'decrementMinutes')
                            .append($('<span>').addClass(options.icons.down))));
                }
                if (isEnabled('s')) {
                    if (isEnabled('m')) {
                        topRow.append($('<td>').addClass('separator'));
                        middleRow.append($('<td>').addClass('separator').html(':'));
                        bottomRow.append($('<td>').addClass('separator'));
                    }
                    topRow.append($('<td>')
                        .append($('<a>').attr({href: '#', tabindex: '-1', 'title': options.tooltips.incrementSecond}).addClass('btn').attr('data-action', 'incrementSeconds')
                            .append($('<span>').addClass(options.icons.up))));
                    middleRow.append($('<td>')
                        .append($('<span>').addClass('timepicker-second').attr({'data-time-component': 'seconds', 'title': options.tooltips.pickSecond}).attr('data-action', 'showSeconds')));
                    bottomRow.append($('<td>')
                        .append($('<a>').attr({href: '#', tabindex: '-1', 'title': options.tooltips.decrementSecond}).addClass('btn').attr('data-action', 'decrementSeconds')
                            .append($('<span>').addClass(options.icons.down))));
                }

                if (!use24Hours) {
                    topRow.append($('<td>').addClass('separator'));
                    middleRow.append($('<td>')
                        .append($('<button>').addClass('btn btn-primary').attr({'data-action': 'togglePeriod', tabindex: '-1', 'title': options.tooltips.togglePeriod})));
                    bottomRow.append($('<td>').addClass('separator'));
                }

                return $('<div>').addClass('timepicker-picker')
                    .append($('<table>').addClass('table-condensed')
                        .append([topRow, middleRow, bottomRow]));
            },

            getTimePickerTemplate = function () {
                var hoursView = $('<div>').addClass('timepicker-hours')
                        .append($('<table>').addClass('table-condensed')),
                    minutesView = $('<div>').addClass('timepicker-minutes')
                        .append($('<table>').addClass('table-condensed')),
                    secondsView = $('<div>').addClass('timepicker-seconds')
                        .append($('<table>').addClass('table-condensed')),
                    ret = [getTimePickerMainTemplate()];

                if (isEnabled('h')) {
                    ret.push(hoursView);
                }
                if (isEnabled('m')) {
                    ret.push(minutesView);
                }
                if (isEnabled('s')) {
                    ret.push(secondsView);
                }

                return ret;
            },

            getToolbar = function () {
                var row = [];
                if (options.showTodayButton) {
                    row.push($('<td>').append($('<a>').attr({'data-action':'today', 'title': options.tooltips.today}).append($('<span>').addClass(options.icons.today))));
                }
                if (!options.sideBySide && hasDate() && hasTime()) {
                    row.push($('<td>').append($('<a>').attr({'data-action':'togglePicker', 'title': options.tooltips.selectTime}).append($('<span>').addClass(options.icons.time))));
                }
                if (options.showClear) {
                    row.push($('<td>').append($('<a>').attr({'data-action':'clear', 'title': options.tooltips.clear}).append($('<span>').addClass(options.icons.clear))));
                }
                if (options.showClose) {
                    row.push($('<td>').append($('<a>').attr({'data-action':'close', 'title': options.tooltips.close}).append($('<span>').addClass(options.icons.close))));
                }
                return $('<table>').addClass('table-condensed').append($('<tbody>').append($('<tr>').append(row)));
            },

            getTemplate = function () {
                var template = $('<div>').addClass('bootstrap-datetimepicker-widget dropdown-menu'),
                    dateView = $('<div>').addClass('datepicker').append(getDatePickerTemplate()),
                    timeView = $('<div>').addClass('timepicker').append(getTimePickerTemplate()),
                    content = $('<ul>').addClass('list-unstyled'),
                    toolbar = $('<li>').addClass('picker-switch' + (options.collapse ? ' accordion-toggle' : '')).append(getToolbar());

                if (options.inline) {
                    template.removeClass('dropdown-menu');
                }

                if (use24Hours) {
                    template.addClass('usetwentyfour');
                }
                if (isEnabled('s') && !use24Hours) {
                    template.addClass('wider');
                }

                if (options.sideBySide && hasDate() && hasTime()) {
                    template.addClass('timepicker-sbs');
                    if (options.toolbarPlacement === 'top') {
                        template.append(toolbar);
                    }
                    template.append(
                        $('<div>').addClass('row')
                            .append(dateView.addClass('col-md-6'))
                            .append(timeView.addClass('col-md-6'))
                    );
                    if (options.toolbarPlacement === 'bottom') {
                        template.append(toolbar);
                    }
                    return template;
                }

                if (options.toolbarPlacement === 'top') {
                    content.append(toolbar);
                }
                if (hasDate()) {
                    content.append($('<li>').addClass((options.collapse && hasTime() ? 'collapse in' : '')).append(dateView));
                }
                if (options.toolbarPlacement === 'default') {
                    content.append(toolbar);
                }
                if (hasTime()) {
                    content.append($('<li>').addClass((options.collapse && hasDate() ? 'collapse' : '')).append(timeView));
                }
                if (options.toolbarPlacement === 'bottom') {
                    content.append(toolbar);
                }
                return template.append(content);
            },

            dataToOptions = function () {
                var eData,
                    dataOptions = {};

                if (element.is('input') || options.inline) {
                    eData = element.data();
                } else {
                    eData = element.find('input').data();
                }

                if (eData.dateOptions && eData.dateOptions instanceof Object) {
                    dataOptions = $.extend(true, dataOptions, eData.dateOptions);
                }

                $.each(options, function (key) {
                    var attributeName = 'date' + key.charAt(0).toUpperCase() + key.slice(1);
                    if (eData[attributeName] !== undefined) {
                        dataOptions[key] = eData[attributeName];
                    }
                });
                return dataOptions;
            },

            place = function () {
                var position = (component || element).position(),
                    offset = (component || element).offset(),
                    vertical = options.widgetPositioning.vertical,
                    horizontal = options.widgetPositioning.horizontal,
                    parent;

                if (options.widgetParent) {
                    parent = options.widgetParent.append(widget);
                } else if (element.is('input')) {
                    parent = element.after(widget).parent();
                } else if (options.inline) {
                    parent = element.append(widget);
                    return;
                } else {
                    parent = element;
                    element.children().first().after(widget);
                }

                // Top and bottom logic
                if (vertical === 'auto') {
                    if (offset.top + widget.height() * 1.5 >= $(window).height() + $(window).scrollTop() &&
                        widget.height() + element.outerHeight() < offset.top) {
                        vertical = 'top';
                    } else {
                        vertical = 'bottom';
                    }
                }

                // Left and right logic
                if (horizontal === 'auto') {
                    if (parent.width() < offset.left + widget.outerWidth() / 2 &&
                        offset.left + widget.outerWidth() > $(window).width()) {
                        horizontal = 'right';
                    } else {
                        horizontal = 'left';
                    }
                }

                if (vertical === 'top') {
                    widget.addClass('top').removeClass('bottom');
                } else {
                    widget.addClass('bottom').removeClass('top');
                }

                if (horizontal === 'right') {
                    widget.addClass('pull-right');
                } else {
                    widget.removeClass('pull-right');
                }

                // find the first parent element that has a relative css positioning
                if (parent.css('position') !== 'relative') {
                    parent = parent.parents().filter(function () {
                        return $(this).css('position') === 'relative';
                    }).first();
                }

                if (parent.length === 0) {
                    throw new Error('datetimepicker component should be placed within a relative positioned container');
                }

                widget.css({
                    top: vertical === 'top' ? 'auto' : position.top + element.outerHeight(),
                    bottom: vertical === 'top' ? position.top + element.outerHeight() : 'auto',
                    left: horizontal === 'left' ? (parent === element ? 0 : position.left) : 'auto',
                    right: horizontal === 'left' ? 'auto' : parent.outerWidth() - element.outerWidth() - (parent === element ? 0 : position.left)
                });
            },

            notifyEvent = function (e) {
                if (e.type === 'dp.change' && ((e.date && e.date.isSame(e.oldDate)) || (!e.date && !e.oldDate))) {
                    return;
                }
                element.trigger(e);
            },

            viewUpdate = function (e) {
                if (e === 'y') {
                    e = 'YYYY';
                }
                notifyEvent({
                    type: 'dp.update',
                    change: e,
                    viewDate: viewDate.clone()
                });
            },

            showMode = function (dir) {
                if (!widget) {
                    return;
                }
                if (dir) {
                    currentViewMode = Math.max(minViewModeNumber, Math.min(3, currentViewMode + dir));
                }
                widget.find('.datepicker > div').hide().filter('.datepicker-' + datePickerModes[currentViewMode].clsName).show();
            },

            fillDow = function () {
                var row = $('<tr>'),
                    currentDate = viewDate.clone().startOf('w').startOf('d');

                if (options.calendarWeeks === true) {
                    row.append($('<th>').addClass('cw').text('#'));
                }

                while (currentDate.isBefore(viewDate.clone().endOf('w'))) {
                    row.append($('<th>').addClass('dow').text(currentDate.format('dd')));
                    currentDate.add(1, 'd');
                }
                widget.find('.datepicker-days thead').append(row);
            },

            isInDisabledDates = function (testDate) {
                return options.disabledDates[testDate.format('YYYY-MM-DD')] === true;
            },

            isInEnabledDates = function (testDate) {
                return options.enabledDates[testDate.format('YYYY-MM-DD')] === true;
            },

            isInDisabledHours = function (testDate) {
                return options.disabledHours[testDate.format('H')] === true;
            },

            isInEnabledHours = function (testDate) {
                return options.enabledHours[testDate.format('H')] === true;
            },

            isValid = function (targetMoment, granularity) {
                if (!targetMoment.isValid()) {
                    return false;
                }
                if (options.disabledDates && granularity === 'd' && isInDisabledDates(targetMoment)) {
                    return false;
                }
                if (options.enabledDates && granularity === 'd' && !isInEnabledDates(targetMoment)) {
                    return false;
                }
                if (options.minDate && targetMoment.isBefore(options.minDate, granularity)) {
                    return false;
                }
                if (options.maxDate && targetMoment.isAfter(options.maxDate, granularity)) {
                    return false;
                }
                if (options.daysOfWeekDisabled && granularity === 'd' && options.daysOfWeekDisabled.indexOf(targetMoment.day()) !== -1) {
                    return false;
                }
                if (options.disabledHours && (granularity === 'h' || granularity === 'm' || granularity === 's') && isInDisabledHours(targetMoment)) {
                    return false;
                }
                if (options.enabledHours && (granularity === 'h' || granularity === 'm' || granularity === 's') && !isInEnabledHours(targetMoment)) {
                    return false;
                }
                if (options.disabledTimeIntervals && (granularity === 'h' || granularity === 'm' || granularity === 's')) {
                    var found = false;
                    $.each(options.disabledTimeIntervals, function () {
                        if (targetMoment.isBetween(this[0], this[1])) {
                            found = true;
                            return false;
                        }
                    });
                    if (found) {
                        return false;
                    }
                }
                return true;
            },

            fillMonths = function () {
                var spans = [],
                    monthsShort = viewDate.clone().startOf('y').startOf('d');
                while (monthsShort.isSame(viewDate, 'y')) {
                    spans.push($('<span>').attr('data-action', 'selectMonth').addClass('month').text(monthsShort.format('MMM')));
                    monthsShort.add(1, 'M');
                }
                widget.find('.datepicker-months td').empty().append(spans);
            },

            updateMonths = function () {
                var monthsView = widget.find('.datepicker-months'),
                    monthsViewHeader = monthsView.find('th'),
                    months = monthsView.find('tbody').find('span');

                monthsViewHeader.eq(0).find('span').attr('title', options.tooltips.prevYear);
                monthsViewHeader.eq(1).attr('title', options.tooltips.selectYear);
                monthsViewHeader.eq(2).find('span').attr('title', options.tooltips.nextYear);

                monthsView.find('.disabled').removeClass('disabled');

                if (!isValid(viewDate.clone().subtract(1, 'y'), 'y')) {
                    monthsViewHeader.eq(0).addClass('disabled');
                }

                monthsViewHeader.eq(1).text(viewDate.year());

                if (!isValid(viewDate.clone().add(1, 'y'), 'y')) {
                    monthsViewHeader.eq(2).addClass('disabled');
                }

                months.removeClass('active');
                if (date.isSame(viewDate, 'y') && !unset) {
                    months.eq(date.month()).addClass('active');
                }

                months.each(function (index) {
                    if (!isValid(viewDate.clone().month(index), 'M')) {
                        $(this).addClass('disabled');
                    }
                });
            },

            updateYears = function () {
                var yearsView = widget.find('.datepicker-years'),
                    yearsViewHeader = yearsView.find('th'),
                    startYear = viewDate.clone().subtract(5, 'y'),
                    endYear = viewDate.clone().add(6, 'y'),
                    html = '';

                yearsViewHeader.eq(0).find('span').attr('title', options.tooltips.prevDecade);
                yearsViewHeader.eq(1).attr('title', options.tooltips.selectDecade);
                yearsViewHeader.eq(2).find('span').attr('title', options.tooltips.nextDecade);

                yearsView.find('.disabled').removeClass('disabled');

                if (options.minDate && options.minDate.isAfter(startYear, 'y')) {
                    yearsViewHeader.eq(0).addClass('disabled');
                }

                yearsViewHeader.eq(1).text(startYear.year() + '-' + endYear.year());

                if (options.maxDate && options.maxDate.isBefore(endYear, 'y')) {
                    yearsViewHeader.eq(2).addClass('disabled');
                }

                while (!startYear.isAfter(endYear, 'y')) {
                    html += '<span data-action="selectYear" class="year' + (startYear.isSame(date, 'y') && !unset ? ' active' : '') + (!isValid(startYear, 'y') ? ' disabled' : '') + '">' + startYear.year() + '</span>';
                    startYear.add(1, 'y');
                }

                yearsView.find('td').html(html);
            },

            updateDecades = function () {
                var decadesView = widget.find('.datepicker-decades'),
                    decadesViewHeader = decadesView.find('th'),
                    startDecade = moment({y: viewDate.year() - (viewDate.year() % 100) - 1}),
                    endDecade = startDecade.clone().add(100, 'y'),
                    startedAt = startDecade.clone(),
                    html = '';

                decadesViewHeader.eq(0).find('span').attr('title', options.tooltips.prevCentury);
                decadesViewHeader.eq(2).find('span').attr('title', options.tooltips.nextCentury);

                decadesView.find('.disabled').removeClass('disabled');

                if (startDecade.isSame(moment({y: 1900})) || (options.minDate && options.minDate.isAfter(startDecade, 'y'))) {
                    decadesViewHeader.eq(0).addClass('disabled');
                }

                decadesViewHeader.eq(1).text(startDecade.year() + '-' + endDecade.year());

                if (startDecade.isSame(moment({y: 2000})) || (options.maxDate && options.maxDate.isBefore(endDecade, 'y'))) {
                    decadesViewHeader.eq(2).addClass('disabled');
                }

                while (!startDecade.isAfter(endDecade, 'y')) {
                    html += '<span data-action="selectDecade" class="decade' + (startDecade.isSame(date, 'y') ? ' active' : '') +
                        (!isValid(startDecade, 'y') ? ' disabled' : '') + '" data-selection="' + (startDecade.year() + 6) + '">' + (startDecade.year() + 1) + ' - ' + (startDecade.year() + 12) + '</span>';
                    startDecade.add(12, 'y');
                }
                html += '<span></span><span></span><span></span>'; //push the dangling block over, at least this way it's even

                decadesView.find('td').html(html);
                decadesViewHeader.eq(1).text((startedAt.year() + 1) + '-' + (startDecade.year()));
            },

            fillDate = function () {
                var daysView = widget.find('.datepicker-days'),
                    daysViewHeader = daysView.find('th'),
                    currentDate,
                    html = [],
                    row,
                    clsName,
                    i;

                if (!hasDate()) {
                    return;
                }

                daysViewHeader.eq(0).find('span').attr('title', options.tooltips.prevMonth);
                daysViewHeader.eq(1).attr('title', options.tooltips.selectMonth);
                daysViewHeader.eq(2).find('span').attr('title', options.tooltips.nextMonth);

                daysView.find('.disabled').removeClass('disabled');
                daysViewHeader.eq(1).text(viewDate.format(options.dayViewHeaderFormat));

                if (!isValid(viewDate.clone().subtract(1, 'M'), 'M')) {
                    daysViewHeader.eq(0).addClass('disabled');
                }
                if (!isValid(viewDate.clone().add(1, 'M'), 'M')) {
                    daysViewHeader.eq(2).addClass('disabled');
                }

                currentDate = viewDate.clone().startOf('M').startOf('w').startOf('d');

                for (i = 0; i < 42; i++) { //always display 42 days (should show 6 weeks)
                    if (currentDate.weekday() === 0) {
                        row = $('<tr>');
                        if (options.calendarWeeks) {
                            row.append('<td class="cw">' + currentDate.week() + '</td>');
                        }
                        html.push(row);
                    }
                    clsName = '';
                    if (currentDate.isBefore(viewDate, 'M')) {
                        clsName += ' old';
                    }
                    if (currentDate.isAfter(viewDate, 'M')) {
                        clsName += ' new';
                    }
                    if (currentDate.isSame(date, 'd') && !unset) {
                        clsName += ' active';
                    }
                    if (!isValid(currentDate, 'd')) {
                        clsName += ' disabled';
                    }
                    if (currentDate.isSame(getMoment(), 'd')) {
                        clsName += ' today';
                    }
                    if (currentDate.day() === 0 || currentDate.day() === 6) {
                        clsName += ' weekend';
                    }
                    row.append('<td data-action="selectDay" data-day="' + currentDate.format('L') + '" class="day' + clsName + '">' + currentDate.date() + '</td>');
                    currentDate.add(1, 'd');
                }

                daysView.find('tbody').empty().append(html);

                updateMonths();

                updateYears();

                updateDecades();
            },

            fillHours = function () {
                var table = widget.find('.timepicker-hours table'),
                    currentHour = viewDate.clone().startOf('d'),
                    html = [],
                    row = $('<tr>');

                if (viewDate.hour() > 11 && !use24Hours) {
                    currentHour.hour(12);
                }
                while (currentHour.isSame(viewDate, 'd') && (use24Hours || (viewDate.hour() < 12 && currentHour.hour() < 12) || viewDate.hour() > 11)) {
                    if (currentHour.hour() % 4 === 0) {
                        row = $('<tr>');
                        html.push(row);
                    }
                    row.append('<td data-action="selectHour" class="hour' + (!isValid(currentHour, 'h') ? ' disabled' : '') + '">' + currentHour.format(use24Hours ? 'HH' : 'hh') + '</td>');
                    currentHour.add(1, 'h');
                }
                table.empty().append(html);
            },

            fillMinutes = function () {
                var table = widget.find('.timepicker-minutes table'),
                    currentMinute = viewDate.clone().startOf('h'),
                    html = [],
                    row = $('<tr>'),
                    step = options.stepping === 1 ? 5 : options.stepping;

                while (viewDate.isSame(currentMinute, 'h')) {
                    if (currentMinute.minute() % (step * 4) === 0) {
                        row = $('<tr>');
                        html.push(row);
                    }
                    row.append('<td data-action="selectMinute" class="minute' + (!isValid(currentMinute, 'm') ? ' disabled' : '') + '">' + currentMinute.format('mm') + '</td>');
                    currentMinute.add(step, 'm');
                }
                table.empty().append(html);
            },

            fillSeconds = function () {
                var table = widget.find('.timepicker-seconds table'),
                    currentSecond = viewDate.clone().startOf('m'),
                    html = [],
                    row = $('<tr>');

                while (viewDate.isSame(currentSecond, 'm')) {
                    if (currentSecond.second() % 20 === 0) {
                        row = $('<tr>');
                        html.push(row);
                    }
                    row.append('<td data-action="selectSecond" class="second' + (!isValid(currentSecond, 's') ? ' disabled' : '') + '">' + currentSecond.format('ss') + '</td>');
                    currentSecond.add(5, 's');
                }

                table.empty().append(html);
            },

            fillTime = function () {
                var toggle, newDate, timeComponents = widget.find('.timepicker span[data-time-component]');

                if (!use24Hours) {
                    toggle = widget.find('.timepicker [data-action=togglePeriod]');
                    newDate = date.clone().add((date.hours() >= 12) ? -12 : 12, 'h');

                    toggle.text(date.format('A'));

                    if (isValid(newDate, 'h')) {
                        toggle.removeClass('disabled');
                    } else {
                        toggle.addClass('disabled');
                    }
                }
                timeComponents.filter('[data-time-component=hours]').text(date.format(use24Hours ? 'HH' : 'hh'));
                timeComponents.filter('[data-time-component=minutes]').text(date.format('mm'));
                timeComponents.filter('[data-time-component=seconds]').text(date.format('ss'));

                fillHours();
                fillMinutes();
                fillSeconds();
            },

            update = function () {
                if (!widget) {
                    return;
                }
                fillDate();
                fillTime();
            },

            setValue = function (targetMoment) {
                var oldDate = unset ? null : date;

                // case of calling setValue(null or false)
                if (!targetMoment) {
                    unset = true;
                    input.val('');
                    element.data('date', '');
                    notifyEvent({
                        type: 'dp.change',
                        date: false,
                        oldDate: oldDate
                    });
                    update();
                    return;
                }

                targetMoment = targetMoment.clone().locale(options.locale);

                if (options.stepping !== 1) {
                    targetMoment.minutes((Math.round(targetMoment.minutes() / options.stepping) * options.stepping) % 60).seconds(0);
                }

                if (isValid(targetMoment)) {
                    date = targetMoment;
                    viewDate = date.clone();
                    input.val(date.format(actualFormat));
                    element.data('date', date.format(actualFormat));
                    unset = false;
                    update();
                    notifyEvent({
                        type: 'dp.change',
                        date: date.clone(),
                        oldDate: oldDate
                    });
                } else {
                    if (!options.keepInvalid) {
                        input.val(unset ? '' : date.format(actualFormat));
                    }
                    notifyEvent({
                        type: 'dp.error',
                        date: targetMoment
                    });
                }
            },

            hide = function () {
                ///<summary>Hides the widget. Possibly will emit dp.hide</summary>
                var transitioning = false;
                if (!widget) {
                    return picker;
                }
                // Ignore event if in the middle of a picker transition
                widget.find('.collapse').each(function () {
                    var collapseData = $(this).data('collapse');
                    if (collapseData && collapseData.transitioning) {
                        transitioning = true;
                        return false;
                    }
                    return true;
                });
                if (transitioning) {
                    return picker;
                }
                if (component && component.hasClass('btn')) {
                    component.toggleClass('active');
                }
                widget.hide();

                $(window).off('resize', place);
                widget.off('click', '[data-action]');
                widget.off('mousedown', false);

                widget.remove();
                widget = false;

                notifyEvent({
                    type: 'dp.hide',
                    date: date.clone()
                });

                input.blur();

                return picker;
            },

            clear = function () {
                setValue(null);
            },

            /********************************************************************************
             *
             * Widget UI interaction functions
             *
             ********************************************************************************/
            actions = {
                next: function () {
                    var navFnc = datePickerModes[currentViewMode].navFnc;
                    viewDate.add(datePickerModes[currentViewMode].navStep, navFnc);
                    fillDate();
                    viewUpdate(navFnc);
                },

                previous: function () {
                    var navFnc = datePickerModes[currentViewMode].navFnc;
                    viewDate.subtract(datePickerModes[currentViewMode].navStep, navFnc);
                    fillDate();
                    viewUpdate(navFnc);
                },

                pickerSwitch: function () {
                    showMode(1);
                },

                selectMonth: function (e) {
                    var month = $(e.target).closest('tbody').find('span').index($(e.target));
                    viewDate.month(month);
                    if (currentViewMode === minViewModeNumber) {
                        setValue(date.clone().year(viewDate.year()).month(viewDate.month()));
                        if (!options.inline) {
                            hide();
                        }
                    } else {
                        showMode(-1);
                        fillDate();
                    }
                    viewUpdate('M');
                },

                selectYear: function (e) {
                    var year = parseInt($(e.target).text(), 10) || 0;
                    viewDate.year(year);
                    if (currentViewMode === minViewModeNumber) {
                        setValue(date.clone().year(viewDate.year()));
                        if (!options.inline) {
                            hide();
                        }
                    } else {
                        showMode(-1);
                        fillDate();
                    }
                    viewUpdate('YYYY');
                },

                selectDecade: function (e) {
                    var year = parseInt($(e.target).data('selection'), 10) || 0;
                    viewDate.year(year);
                    if (currentViewMode === minViewModeNumber) {
                        setValue(date.clone().year(viewDate.year()));
                        if (!options.inline) {
                            hide();
                        }
                    } else {
                        showMode(-1);
                        fillDate();
                    }
                    viewUpdate('YYYY');
                },

                selectDay: function (e) {
                    var day = viewDate.clone();
                    if ($(e.target).is('.old')) {
                        day.subtract(1, 'M');
                    }
                    if ($(e.target).is('.new')) {
                        day.add(1, 'M');
                    }
                    setValue(day.date(parseInt($(e.target).text(), 10)));
                    if (!hasTime() && !options.keepOpen && !options.inline) {
                        hide();
                    }
                },

                incrementHours: function () {
                    var newDate = date.clone().add(1, 'h');
                    if (isValid(newDate, 'h')) {
                        setValue(newDate);
                    }
                },

                incrementMinutes: function () {
                    var newDate = date.clone().add(options.stepping, 'm');
                    if (isValid(newDate, 'm')) {
                        setValue(newDate);
                    }
                },

                incrementSeconds: function () {
                    var newDate = date.clone().add(1, 's');
                    if (isValid(newDate, 's')) {
                        setValue(newDate);
                    }
                },

                decrementHours: function () {
                    var newDate = date.clone().subtract(1, 'h');
                    if (isValid(newDate, 'h')) {
                        setValue(newDate);
                    }
                },

                decrementMinutes: function () {
                    var newDate = date.clone().subtract(options.stepping, 'm');
                    if (isValid(newDate, 'm')) {
                        setValue(newDate);
                    }
                },

                decrementSeconds: function () {
                    var newDate = date.clone().subtract(1, 's');
                    if (isValid(newDate, 's')) {
                        setValue(newDate);
                    }
                },

                togglePeriod: function () {
                    setValue(date.clone().add((date.hours() >= 12) ? -12 : 12, 'h'));
                },

                togglePicker: function (e) {
                    var $this = $(e.target),
                        $parent = $this.closest('ul'),
                        expanded = $parent.find('.in'),
                        closed = $parent.find('.collapse:not(.in)'),
                        collapseData;

                    if (expanded && expanded.length) {
                        collapseData = expanded.data('collapse');
                        if (collapseData && collapseData.transitioning) {
                            return;
                        }
                        if (expanded.collapse) { // if collapse plugin is available through bootstrap.js then use it
                            expanded.collapse('hide');
                            closed.collapse('show');
                        } else { // otherwise just toggle in class on the two views
                            expanded.removeClass('in');
                            closed.addClass('in');
                        }
                        if ($this.is('span')) {
                            $this.toggleClass(options.icons.time + ' ' + options.icons.date);
                        } else {
                            $this.find('span').toggleClass(options.icons.time + ' ' + options.icons.date);
                        }

                        // NOTE: uncomment if toggled state will be restored in show()
                        //if (component) {
                        //    component.find('span').toggleClass(options.icons.time + ' ' + options.icons.date);
                        //}
                    }
                },

                showPicker: function () {
                    widget.find('.timepicker > div:not(.timepicker-picker)').hide();
                    widget.find('.timepicker .timepicker-picker').show();
                },

                showHours: function () {
                    widget.find('.timepicker .timepicker-picker').hide();
                    widget.find('.timepicker .timepicker-hours').show();
                },

                showMinutes: function () {
                    widget.find('.timepicker .timepicker-picker').hide();
                    widget.find('.timepicker .timepicker-minutes').show();
                },

                showSeconds: function () {
                    widget.find('.timepicker .timepicker-picker').hide();
                    widget.find('.timepicker .timepicker-seconds').show();
                },

                selectHour: function (e) {
                    var hour = parseInt($(e.target).text(), 10);

                    if (!use24Hours) {
                        if (date.hours() >= 12) {
                            if (hour !== 12) {
                                hour += 12;
                            }
                        } else {
                            if (hour === 12) {
                                hour = 0;
                            }
                        }
                    }
                    setValue(date.clone().hours(hour));
                    actions.showPicker.call(picker);
                },

                selectMinute: function (e) {
                    setValue(date.clone().minutes(parseInt($(e.target).text(), 10)));
                    actions.showPicker.call(picker);
                },

                selectSecond: function (e) {
                    setValue(date.clone().seconds(parseInt($(e.target).text(), 10)));
                    actions.showPicker.call(picker);
                },

                clear: clear,

                today: function () {
                    var todaysDate = getMoment();
                    if (isValid(todaysDate, 'd')) {
                        setValue(todaysDate);
                    }
                },

                close: hide
            },

            doAction = function (e) {
                if ($(e.currentTarget).is('.disabled')) {
                    return false;
                }
                actions[$(e.currentTarget).data('action')].apply(picker, arguments);
                return false;
            },

            show = function () {
                ///<summary>Shows the widget. Possibly will emit dp.show and dp.change</summary>
                var currentMoment,
                    useCurrentGranularity = {
                        'year': function (m) {
                            return m.month(0).date(1).hours(0).seconds(0).minutes(0);
                        },
                        'month': function (m) {
                            return m.date(1).hours(0).seconds(0).minutes(0);
                        },
                        'day': function (m) {
                            return m.hours(0).seconds(0).minutes(0);
                        },
                        'hour': function (m) {
                            return m.seconds(0).minutes(0);
                        },
                        'minute': function (m) {
                            return m.seconds(0);
                        }
                    };

                if (input.prop('disabled') || (!options.ignoreReadonly && input.prop('readonly')) || widget) {
                    return picker;
                }
                if (input.val() !== undefined && input.val().trim().length !== 0) {
                    setValue(parseInputDate(input.val().trim()));
                } else if (options.useCurrent && unset && ((input.is('input') && input.val().trim().length === 0) || options.inline)) {
                    currentMoment = getMoment();
                    if (typeof options.useCurrent === 'string') {
                        currentMoment = useCurrentGranularity[options.useCurrent](currentMoment);
                    }
                    setValue(currentMoment);
                }

                widget = getTemplate();

                fillDow();
                fillMonths();

                widget.find('.timepicker-hours').hide();
                widget.find('.timepicker-minutes').hide();
                widget.find('.timepicker-seconds').hide();

                update();
                showMode();

                $(window).on('resize', place);
                widget.on('click', '[data-action]', doAction); // this handles clicks on the widget
                widget.on('mousedown', false);

                if (component && component.hasClass('btn')) {
                    component.toggleClass('active');
                }
                widget.show();
                place();

                if (options.focusOnShow && !input.is(':focus')) {
                    input.focus();
                }

                notifyEvent({
                    type: 'dp.show'
                });
                return picker;
            },

            toggle = function () {
                /// <summary>Shows or hides the widget</summary>
                return (widget ? hide() : show());
            },

            parseInputDate = function (inputDate) {
                if (options.parseInputDate === undefined) {
                    if (moment.isMoment(inputDate) || inputDate instanceof Date) {
                        inputDate = moment(inputDate);
                    } else {
                        inputDate = getMoment(inputDate);
                    }
                } else {
                    inputDate = options.parseInputDate(inputDate);
                }
                inputDate.locale(options.locale);
                return inputDate;
            },

            keydown = function (e) {
                var handler = null,
                    index,
                    index2,
                    pressedKeys = [],
                    pressedModifiers = {},
                    currentKey = e.which,
                    keyBindKeys,
                    allModifiersPressed,
                    pressed = 'p';

                keyState[currentKey] = pressed;

                for (index in keyState) {
                    if (keyState.hasOwnProperty(index) && keyState[index] === pressed) {
                        pressedKeys.push(index);
                        if (parseInt(index, 10) !== currentKey) {
                            pressedModifiers[index] = true;
                        }
                    }
                }

                for (index in options.keyBinds) {
                    if (options.keyBinds.hasOwnProperty(index) && typeof (options.keyBinds[index]) === 'function') {
                        keyBindKeys = index.split(' ');
                        if (keyBindKeys.length === pressedKeys.length && keyMap[currentKey] === keyBindKeys[keyBindKeys.length - 1]) {
                            allModifiersPressed = true;
                            for (index2 = keyBindKeys.length - 2; index2 >= 0; index2--) {
                                if (!(keyMap[keyBindKeys[index2]] in pressedModifiers)) {
                                    allModifiersPressed = false;
                                    break;
                                }
                            }
                            if (allModifiersPressed) {
                                handler = options.keyBinds[index];
                                break;
                            }
                        }
                    }
                }

                if (handler) {
                    handler.call(picker, widget);
                    e.stopPropagation();
                    e.preventDefault();
                }
            },

            keyup = function (e) {
                keyState[e.which] = 'r';
                e.stopPropagation();
                e.preventDefault();
            },

            change = function (e) {
                var val = $(e.target).val().trim(),
                    parsedDate = val ? parseInputDate(val) : null;
                setValue(parsedDate);
                e.stopImmediatePropagation();
                return false;
            },

            attachDatePickerElementEvents = function () {
                input.on({
                    'change': change,
                    'blur': options.debug ? '' : hide,
                    'keydown': keydown,
                    'keyup': keyup,
                    'focus': options.allowInputToggle ? show : ''
                });

                if (element.is('input')) {
                    input.on({
                        'focus': show
                    });
                } else if (component) {
                    component.on('click', toggle);
                    component.on('mousedown', false);
                }
            },

            detachDatePickerElementEvents = function () {
                input.off({
                    'change': change,
                    'blur': blur,
                    'keydown': keydown,
                    'keyup': keyup,
                    'focus': options.allowInputToggle ? hide : ''
                });

                if (element.is('input')) {
                    input.off({
                        'focus': show
                    });
                } else if (component) {
                    component.off('click', toggle);
                    component.off('mousedown', false);
                }
            },

            indexGivenDates = function (givenDatesArray) {
                // Store given enabledDates and disabledDates as keys.
                // This way we can check their existence in O(1) time instead of looping through whole array.
                // (for example: options.enabledDates['2014-02-27'] === true)
                var givenDatesIndexed = {};
                $.each(givenDatesArray, function () {
                    var dDate = parseInputDate(this);
                    if (dDate.isValid()) {
                        givenDatesIndexed[dDate.format('YYYY-MM-DD')] = true;
                    }
                });
                return (Object.keys(givenDatesIndexed).length) ? givenDatesIndexed : false;
            },

            indexGivenHours = function (givenHoursArray) {
                // Store given enabledHours and disabledHours as keys.
                // This way we can check their existence in O(1) time instead of looping through whole array.
                // (for example: options.enabledHours['2014-02-27'] === true)
                var givenHoursIndexed = {};
                $.each(givenHoursArray, function () {
                    givenHoursIndexed[this] = true;
                });
                return (Object.keys(givenHoursIndexed).length) ? givenHoursIndexed : false;
            },

            initFormatting = function () {
                var format = options.format || 'L LT';

                actualFormat = format.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (formatInput) {
                    var newinput = date.localeData().longDateFormat(formatInput) || formatInput;
                    return newinput.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (formatInput2) { //temp fix for #740
                        return date.localeData().longDateFormat(formatInput2) || formatInput2;
                    });
                });


                parseFormats = options.extraFormats ? options.extraFormats.slice() : [];
                if (parseFormats.indexOf(format) < 0 && parseFormats.indexOf(actualFormat) < 0) {
                    parseFormats.push(actualFormat);
                }

                use24Hours = (actualFormat.toLowerCase().indexOf('a') < 1 && actualFormat.replace(/\[.*?\]/g, '').indexOf('h') < 1);

                if (isEnabled('y')) {
                    minViewModeNumber = 2;
                }
                if (isEnabled('M')) {
                    minViewModeNumber = 1;
                }
                if (isEnabled('d')) {
                    minViewModeNumber = 0;
                }

                currentViewMode = Math.max(minViewModeNumber, currentViewMode);

                if (!unset) {
                    setValue(date);
                }
            };

        /********************************************************************************
         *
         * Public API functions
         * =====================
         *
         * Important: Do not expose direct references to private objects or the options
         * object to the outer world. Always return a clone when returning values or make
         * a clone when setting a private variable.
         *
         ********************************************************************************/
        picker.destroy = function () {
            ///<summary>Destroys the widget and removes all attached event listeners</summary>
            hide();
            detachDatePickerElementEvents();
            element.removeData('DateTimePicker');
            element.removeData('date');
        };

        picker.toggle = toggle;

        picker.show = show;

        picker.hide = hide;

        picker.disable = function () {
            ///<summary>Disables the input element, the component is attached to, by adding a disabled="true" attribute to it.
            ///If the widget was visible before that call it is hidden. Possibly emits dp.hide</summary>
            hide();
            if (component && component.hasClass('btn')) {
                component.addClass('disabled');
            }
            input.prop('disabled', true);
            return picker;
        };

        picker.enable = function () {
            ///<summary>Enables the input element, the component is attached to, by removing disabled attribute from it.</summary>
            if (component && component.hasClass('btn')) {
                component.removeClass('disabled');
            }
            input.prop('disabled', false);
            return picker;
        };

        picker.ignoreReadonly = function (ignoreReadonly) {
            if (arguments.length === 0) {
                return options.ignoreReadonly;
            }
            if (typeof ignoreReadonly !== 'boolean') {
                throw new TypeError('ignoreReadonly () expects a boolean parameter');
            }
            options.ignoreReadonly = ignoreReadonly;
            return picker;
        };

        picker.options = function (newOptions) {
            if (arguments.length === 0) {
                return $.extend(true, {}, options);
            }

            if (!(newOptions instanceof Object)) {
                throw new TypeError('options() options parameter should be an object');
            }
            $.extend(true, options, newOptions);
            $.each(options, function (key, value) {
                if (picker[key] !== undefined) {
                    picker[key](value);
                } else {
                    throw new TypeError('option ' + key + ' is not recognized!');
                }
            });
            return picker;
        };

        picker.date = function (newDate) {
            ///<signature helpKeyword="$.fn.datetimepicker.date">
            ///<summary>Returns the component's model current date, a moment object or null if not set.</summary>
            ///<returns type="Moment">date.clone()</returns>
            ///</signature>
            ///<signature>
            ///<summary>Sets the components model current moment to it. Passing a null value unsets the components model current moment. Parsing of the newDate parameter is made using moment library with the options.format and options.useStrict components configuration.</summary>
            ///<param name="newDate" locid="$.fn.datetimepicker.date_p:newDate">Takes string, Date, moment, null parameter.</param>
            ///</signature>
            if (arguments.length === 0) {
                if (unset) {
                    return null;
                }
                return date.clone();
            }

            if (newDate !== null && typeof newDate !== 'string' && !moment.isMoment(newDate) && !(newDate instanceof Date)) {
                throw new TypeError('date() parameter must be one of [null, string, moment or Date]');
            }

            setValue(newDate === null ? null : parseInputDate(newDate));
            return picker;
        };

        picker.format = function (newFormat) {
            ///<summary>test su</summary>
            ///<param name="newFormat">info about para</param>
            ///<returns type="string|boolean">returns foo</returns>
            if (arguments.length === 0) {
                return options.format;
            }

            if ((typeof newFormat !== 'string') && ((typeof newFormat !== 'boolean') || (newFormat !== false))) {
                throw new TypeError('format() expects a sting or boolean:false parameter ' + newFormat);
            }

            options.format = newFormat;
            if (actualFormat) {
                initFormatting(); // reinit formatting
            }
            return picker;
        };

        picker.timeZone = function (newZone) {
            if (arguments.length === 0) {
                return options.timeZone;
            }

            options.timeZone = newZone;

            return picker;
        };

        picker.dayViewHeaderFormat = function (newFormat) {
            if (arguments.length === 0) {
                return options.dayViewHeaderFormat;
            }

            if (typeof newFormat !== 'string') {
                throw new TypeError('dayViewHeaderFormat() expects a string parameter');
            }

            options.dayViewHeaderFormat = newFormat;
            return picker;
        };

        picker.extraFormats = function (formats) {
            if (arguments.length === 0) {
                return options.extraFormats;
            }

            if (formats !== false && !(formats instanceof Array)) {
                throw new TypeError('extraFormats() expects an array or false parameter');
            }

            options.extraFormats = formats;
            if (parseFormats) {
                initFormatting(); // reinit formatting
            }
            return picker;
        };

        picker.disabledDates = function (dates) {
            ///<signature helpKeyword="$.fn.datetimepicker.disabledDates">
            ///<summary>Returns an array with the currently set disabled dates on the component.</summary>
            ///<returns type="array">options.disabledDates</returns>
            ///</signature>
            ///<signature>
            ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of
            ///options.enabledDates if such exist.</summary>
            ///<param name="dates" locid="$.fn.datetimepicker.disabledDates_p:dates">Takes an [ string or Date or moment ] of values and allows the user to select only from those days.</param>
            ///</signature>
            if (arguments.length === 0) {
                return (options.disabledDates ? $.extend({}, options.disabledDates) : options.disabledDates);
            }

            if (!dates) {
                options.disabledDates = false;
                update();
                return picker;
            }
            if (!(dates instanceof Array)) {
                throw new TypeError('disabledDates() expects an array parameter');
            }
            options.disabledDates = indexGivenDates(dates);
            options.enabledDates = false;
            update();
            return picker;
        };

        picker.enabledDates = function (dates) {
            ///<signature helpKeyword="$.fn.datetimepicker.enabledDates">
            ///<summary>Returns an array with the currently set enabled dates on the component.</summary>
            ///<returns type="array">options.enabledDates</returns>
            ///</signature>
            ///<signature>
            ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of options.disabledDates if such exist.</summary>
            ///<param name="dates" locid="$.fn.datetimepicker.enabledDates_p:dates">Takes an [ string or Date or moment ] of values and allows the user to select only from those days.</param>
            ///</signature>
            if (arguments.length === 0) {
                return (options.enabledDates ? $.extend({}, options.enabledDates) : options.enabledDates);
            }

            if (!dates) {
                options.enabledDates = false;
                update();
                return picker;
            }
            if (!(dates instanceof Array)) {
                throw new TypeError('enabledDates() expects an array parameter');
            }
            options.enabledDates = indexGivenDates(dates);
            options.disabledDates = false;
            update();
            return picker;
        };

        picker.daysOfWeekDisabled = function (daysOfWeekDisabled) {
            if (arguments.length === 0) {
                return options.daysOfWeekDisabled.splice(0);
            }

            if ((typeof daysOfWeekDisabled === 'boolean') && !daysOfWeekDisabled) {
                options.daysOfWeekDisabled = false;
                update();
                return picker;
            }

            if (!(daysOfWeekDisabled instanceof Array)) {
                throw new TypeError('daysOfWeekDisabled() expects an array parameter');
            }
            options.daysOfWeekDisabled = daysOfWeekDisabled.reduce(function (previousValue, currentValue) {
                currentValue = parseInt(currentValue, 10);
                if (currentValue > 6 || currentValue < 0 || isNaN(currentValue)) {
                    return previousValue;
                }
                if (previousValue.indexOf(currentValue) === -1) {
                    previousValue.push(currentValue);
                }
                return previousValue;
            }, []).sort();
            if (options.useCurrent && !options.keepInvalid) {
                var tries = 0;
                while (!isValid(date, 'd')) {
                    date.add(1, 'd');
                    if (tries === 7) {
                        throw 'Tried 7 times to find a valid date';
                    }
                    tries++;
                }
                setValue(date);
            }
            update();
            return picker;
        };

        picker.maxDate = function (maxDate) {
            if (arguments.length === 0) {
                return options.maxDate ? options.maxDate.clone() : options.maxDate;
            }

            if ((typeof maxDate === 'boolean') && maxDate === false) {
                options.maxDate = false;
                update();
                return picker;
            }

            if (typeof maxDate === 'string') {
                if (maxDate === 'now' || maxDate === 'moment') {
                    maxDate = getMoment();
                }
            }

            var parsedDate = parseInputDate(maxDate);

            if (!parsedDate.isValid()) {
                throw new TypeError('maxDate() Could not parse date parameter: ' + maxDate);
            }
            if (options.minDate && parsedDate.isBefore(options.minDate)) {
                throw new TypeError('maxDate() date parameter is before options.minDate: ' + parsedDate.format(actualFormat));
            }
            options.maxDate = parsedDate;
            if (options.useCurrent && !options.keepInvalid && date.isAfter(maxDate)) {
                setValue(options.maxDate);
            }
            if (viewDate.isAfter(parsedDate)) {
                viewDate = parsedDate.clone().subtract(options.stepping, 'm');
            }
            update();
            return picker;
        };

        picker.minDate = function (minDate) {
            if (arguments.length === 0) {
                return options.minDate ? options.minDate.clone() : options.minDate;
            }

            if ((typeof minDate === 'boolean') && minDate === false) {
                options.minDate = false;
                update();
                return picker;
            }

            if (typeof minDate === 'string') {
                if (minDate === 'now' || minDate === 'moment') {
                    minDate = getMoment();
                }
            }

            var parsedDate = parseInputDate(minDate);

            if (!parsedDate.isValid()) {
                throw new TypeError('minDate() Could not parse date parameter: ' + minDate);
            }
            if (options.maxDate && parsedDate.isAfter(options.maxDate)) {
                throw new TypeError('minDate() date parameter is after options.maxDate: ' + parsedDate.format(actualFormat));
            }
            options.minDate = parsedDate;
            if (options.useCurrent && !options.keepInvalid && date.isBefore(minDate)) {
                setValue(options.minDate);
            }
            if (viewDate.isBefore(parsedDate)) {
                viewDate = parsedDate.clone().add(options.stepping, 'm');
            }
            update();
            return picker;
        };

        picker.defaultDate = function (defaultDate) {
            ///<signature helpKeyword="$.fn.datetimepicker.defaultDate">
            ///<summary>Returns a moment with the options.defaultDate option configuration or false if not set</summary>
            ///<returns type="Moment">date.clone()</returns>
            ///</signature>
            ///<signature>
            ///<summary>Will set the picker's inital date. If a boolean:false value is passed the options.defaultDate parameter is cleared.</summary>
            ///<param name="defaultDate" locid="$.fn.datetimepicker.defaultDate_p:defaultDate">Takes a string, Date, moment, boolean:false</param>
            ///</signature>
            if (arguments.length === 0) {
                return options.defaultDate ? options.defaultDate.clone() : options.defaultDate;
            }
            if (!defaultDate) {
                options.defaultDate = false;
                return picker;
            }

            if (typeof defaultDate === 'string') {
                if (defaultDate === 'now' || defaultDate === 'moment') {
                    defaultDate = getMoment();
                }
            }

            var parsedDate = parseInputDate(defaultDate);
            if (!parsedDate.isValid()) {
                throw new TypeError('defaultDate() Could not parse date parameter: ' + defaultDate);
            }
            if (!isValid(parsedDate)) {
                throw new TypeError('defaultDate() date passed is invalid according to component setup validations');
            }

            options.defaultDate = parsedDate;

            if ((options.defaultDate && options.inline) || input.val().trim() === '') {
                setValue(options.defaultDate);
            }
            return picker;
        };

        picker.locale = function (locale) {
            if (arguments.length === 0) {
                return options.locale;
            }

            if (!moment.localeData(locale)) {
                throw new TypeError('locale() locale ' + locale + ' is not loaded from moment locales!');
            }

            options.locale = locale;
            date.locale(options.locale);
            viewDate.locale(options.locale);

            if (actualFormat) {
                initFormatting(); // reinit formatting
            }
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.stepping = function (stepping) {
            if (arguments.length === 0) {
                return options.stepping;
            }

            stepping = parseInt(stepping, 10);
            if (isNaN(stepping) || stepping < 1) {
                stepping = 1;
            }
            options.stepping = stepping;
            return picker;
        };

        picker.useCurrent = function (useCurrent) {
            var useCurrentOptions = ['year', 'month', 'day', 'hour', 'minute'];
            if (arguments.length === 0) {
                return options.useCurrent;
            }

            if ((typeof useCurrent !== 'boolean') && (typeof useCurrent !== 'string')) {
                throw new TypeError('useCurrent() expects a boolean or string parameter');
            }
            if (typeof useCurrent === 'string' && useCurrentOptions.indexOf(useCurrent.toLowerCase()) === -1) {
                throw new TypeError('useCurrent() expects a string parameter of ' + useCurrentOptions.join(', '));
            }
            options.useCurrent = useCurrent;
            return picker;
        };

        picker.collapse = function (collapse) {
            if (arguments.length === 0) {
                return options.collapse;
            }

            if (typeof collapse !== 'boolean') {
                throw new TypeError('collapse() expects a boolean parameter');
            }
            if (options.collapse === collapse) {
                return picker;
            }
            options.collapse = collapse;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.icons = function (icons) {
            if (arguments.length === 0) {
                return $.extend({}, options.icons);
            }

            if (!(icons instanceof Object)) {
                throw new TypeError('icons() expects parameter to be an Object');
            }
            $.extend(options.icons, icons);
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.tooltips = function (tooltips) {
            if (arguments.length === 0) {
                return $.extend({}, options.tooltips);
            }

            if (!(tooltips instanceof Object)) {
                throw new TypeError('tooltips() expects parameter to be an Object');
            }
            $.extend(options.tooltips, tooltips);
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.useStrict = function (useStrict) {
            if (arguments.length === 0) {
                return options.useStrict;
            }

            if (typeof useStrict !== 'boolean') {
                throw new TypeError('useStrict() expects a boolean parameter');
            }
            options.useStrict = useStrict;
            return picker;
        };

        picker.sideBySide = function (sideBySide) {
            if (arguments.length === 0) {
                return options.sideBySide;
            }

            if (typeof sideBySide !== 'boolean') {
                throw new TypeError('sideBySide() expects a boolean parameter');
            }
            options.sideBySide = sideBySide;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.viewMode = function (viewMode) {
            if (arguments.length === 0) {
                return options.viewMode;
            }

            if (typeof viewMode !== 'string') {
                throw new TypeError('viewMode() expects a string parameter');
            }

            if (viewModes.indexOf(viewMode) === -1) {
                throw new TypeError('viewMode() parameter must be one of (' + viewModes.join(', ') + ') value');
            }

            options.viewMode = viewMode;
            currentViewMode = Math.max(viewModes.indexOf(viewMode), minViewModeNumber);

            showMode();
            return picker;
        };

        picker.toolbarPlacement = function (toolbarPlacement) {
            if (arguments.length === 0) {
                return options.toolbarPlacement;
            }

            if (typeof toolbarPlacement !== 'string') {
                throw new TypeError('toolbarPlacement() expects a string parameter');
            }
            if (toolbarPlacements.indexOf(toolbarPlacement) === -1) {
                throw new TypeError('toolbarPlacement() parameter must be one of (' + toolbarPlacements.join(', ') + ') value');
            }
            options.toolbarPlacement = toolbarPlacement;

            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.widgetPositioning = function (widgetPositioning) {
            if (arguments.length === 0) {
                return $.extend({}, options.widgetPositioning);
            }

            if (({}).toString.call(widgetPositioning) !== '[object Object]') {
                throw new TypeError('widgetPositioning() expects an object variable');
            }
            if (widgetPositioning.horizontal) {
                if (typeof widgetPositioning.horizontal !== 'string') {
                    throw new TypeError('widgetPositioning() horizontal variable must be a string');
                }
                widgetPositioning.horizontal = widgetPositioning.horizontal.toLowerCase();
                if (horizontalModes.indexOf(widgetPositioning.horizontal) === -1) {
                    throw new TypeError('widgetPositioning() expects horizontal parameter to be one of (' + horizontalModes.join(', ') + ')');
                }
                options.widgetPositioning.horizontal = widgetPositioning.horizontal;
            }
            if (widgetPositioning.vertical) {
                if (typeof widgetPositioning.vertical !== 'string') {
                    throw new TypeError('widgetPositioning() vertical variable must be a string');
                }
                widgetPositioning.vertical = widgetPositioning.vertical.toLowerCase();
                if (verticalModes.indexOf(widgetPositioning.vertical) === -1) {
                    throw new TypeError('widgetPositioning() expects vertical parameter to be one of (' + verticalModes.join(', ') + ')');
                }
                options.widgetPositioning.vertical = widgetPositioning.vertical;
            }
            update();
            return picker;
        };

        picker.calendarWeeks = function (calendarWeeks) {
            if (arguments.length === 0) {
                return options.calendarWeeks;
            }

            if (typeof calendarWeeks !== 'boolean') {
                throw new TypeError('calendarWeeks() expects parameter to be a boolean value');
            }

            options.calendarWeeks = calendarWeeks;
            update();
            return picker;
        };

        picker.showTodayButton = function (showTodayButton) {
            if (arguments.length === 0) {
                return options.showTodayButton;
            }

            if (typeof showTodayButton !== 'boolean') {
                throw new TypeError('showTodayButton() expects a boolean parameter');
            }

            options.showTodayButton = showTodayButton;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.showClear = function (showClear) {
            if (arguments.length === 0) {
                return options.showClear;
            }

            if (typeof showClear !== 'boolean') {
                throw new TypeError('showClear() expects a boolean parameter');
            }

            options.showClear = showClear;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.widgetParent = function (widgetParent) {
            if (arguments.length === 0) {
                return options.widgetParent;
            }

            if (typeof widgetParent === 'string') {
                widgetParent = $(widgetParent);
            }

            if (widgetParent !== null && (typeof widgetParent !== 'string' && !(widgetParent instanceof $))) {
                throw new TypeError('widgetParent() expects a string or a jQuery object parameter');
            }

            options.widgetParent = widgetParent;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.keepOpen = function (keepOpen) {
            if (arguments.length === 0) {
                return options.keepOpen;
            }

            if (typeof keepOpen !== 'boolean') {
                throw new TypeError('keepOpen() expects a boolean parameter');
            }

            options.keepOpen = keepOpen;
            return picker;
        };

        picker.focusOnShow = function (focusOnShow) {
            if (arguments.length === 0) {
                return options.focusOnShow;
            }

            if (typeof focusOnShow !== 'boolean') {
                throw new TypeError('focusOnShow() expects a boolean parameter');
            }

            options.focusOnShow = focusOnShow;
            return picker;
        };

        picker.inline = function (inline) {
            if (arguments.length === 0) {
                return options.inline;
            }

            if (typeof inline !== 'boolean') {
                throw new TypeError('inline() expects a boolean parameter');
            }

            options.inline = inline;
            return picker;
        };

        picker.clear = function () {
            clear();
            return picker;
        };

        picker.keyBinds = function (keyBinds) {
            options.keyBinds = keyBinds;
            return picker;
        };

        picker.getMoment = function (d) {
            return getMoment(d);
        };

        picker.debug = function (debug) {
            if (typeof debug !== 'boolean') {
                throw new TypeError('debug() expects a boolean parameter');
            }

            options.debug = debug;
            return picker;
        };

        picker.allowInputToggle = function (allowInputToggle) {
            if (arguments.length === 0) {
                return options.allowInputToggle;
            }

            if (typeof allowInputToggle !== 'boolean') {
                throw new TypeError('allowInputToggle() expects a boolean parameter');
            }

            options.allowInputToggle = allowInputToggle;
            return picker;
        };

        picker.showClose = function (showClose) {
            if (arguments.length === 0) {
                return options.showClose;
            }

            if (typeof showClose !== 'boolean') {
                throw new TypeError('showClose() expects a boolean parameter');
            }

            options.showClose = showClose;
            return picker;
        };

        picker.keepInvalid = function (keepInvalid) {
            if (arguments.length === 0) {
                return options.keepInvalid;
            }

            if (typeof keepInvalid !== 'boolean') {
                throw new TypeError('keepInvalid() expects a boolean parameter');
            }
            options.keepInvalid = keepInvalid;
            return picker;
        };

        picker.datepickerInput = function (datepickerInput) {
            if (arguments.length === 0) {
                return options.datepickerInput;
            }

            if (typeof datepickerInput !== 'string') {
                throw new TypeError('datepickerInput() expects a string parameter');
            }

            options.datepickerInput = datepickerInput;
            return picker;
        };

        picker.parseInputDate = function (parseInputDate) {
            if (arguments.length === 0) {
                return options.parseInputDate;
            }

            if (typeof parseInputDate !== 'function') {
                throw new TypeError('parseInputDate() sholud be as function');
            }

            options.parseInputDate = parseInputDate;

            return picker;
        };

        picker.disabledTimeIntervals = function (disabledTimeIntervals) {
            ///<signature helpKeyword="$.fn.datetimepicker.disabledTimeIntervals">
            ///<summary>Returns an array with the currently set disabled dates on the component.</summary>
            ///<returns type="array">options.disabledTimeIntervals</returns>
            ///</signature>
            ///<signature>
            ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of
            ///options.enabledDates if such exist.</summary>
            ///<param name="dates" locid="$.fn.datetimepicker.disabledTimeIntervals_p:dates">Takes an [ string or Date or moment ] of values and allows the user to select only from those days.</param>
            ///</signature>
            if (arguments.length === 0) {
                return (options.disabledTimeIntervals ? $.extend({}, options.disabledTimeIntervals) : options.disabledTimeIntervals);
            }

            if (!disabledTimeIntervals) {
                options.disabledTimeIntervals = false;
                update();
                return picker;
            }
            if (!(disabledTimeIntervals instanceof Array)) {
                throw new TypeError('disabledTimeIntervals() expects an array parameter');
            }
            options.disabledTimeIntervals = disabledTimeIntervals;
            update();
            return picker;
        };

        picker.disabledHours = function (hours) {
            ///<signature helpKeyword="$.fn.datetimepicker.disabledHours">
            ///<summary>Returns an array with the currently set disabled hours on the component.</summary>
            ///<returns type="array">options.disabledHours</returns>
            ///</signature>
            ///<signature>
            ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of
            ///options.enabledHours if such exist.</summary>
            ///<param name="hours" locid="$.fn.datetimepicker.disabledHours_p:hours">Takes an [ int ] of values and disallows the user to select only from those hours.</param>
            ///</signature>
            if (arguments.length === 0) {
                return (options.disabledHours ? $.extend({}, options.disabledHours) : options.disabledHours);
            }

            if (!hours) {
                options.disabledHours = false;
                update();
                return picker;
            }
            if (!(hours instanceof Array)) {
                throw new TypeError('disabledHours() expects an array parameter');
            }
            options.disabledHours = indexGivenHours(hours);
            options.enabledHours = false;
            if (options.useCurrent && !options.keepInvalid) {
                var tries = 0;
                while (!isValid(date, 'h')) {
                    date.add(1, 'h');
                    if (tries === 24) {
                        throw 'Tried 24 times to find a valid date';
                    }
                    tries++;
                }
                setValue(date);
            }
            update();
            return picker;
        };

        picker.enabledHours = function (hours) {
            ///<signature helpKeyword="$.fn.datetimepicker.enabledHours">
            ///<summary>Returns an array with the currently set enabled hours on the component.</summary>
            ///<returns type="array">options.enabledHours</returns>
            ///</signature>
            ///<signature>
            ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of options.disabledHours if such exist.</summary>
            ///<param name="hours" locid="$.fn.datetimepicker.enabledHours_p:hours">Takes an [ int ] of values and allows the user to select only from those hours.</param>
            ///</signature>
            if (arguments.length === 0) {
                return (options.enabledHours ? $.extend({}, options.enabledHours) : options.enabledHours);
            }

            if (!hours) {
                options.enabledHours = false;
                update();
                return picker;
            }
            if (!(hours instanceof Array)) {
                throw new TypeError('enabledHours() expects an array parameter');
            }
            options.enabledHours = indexGivenHours(hours);
            options.disabledHours = false;
            if (options.useCurrent && !options.keepInvalid) {
                var tries = 0;
                while (!isValid(date, 'h')) {
                    date.add(1, 'h');
                    if (tries === 24) {
                        throw 'Tried 24 times to find a valid date';
                    }
                    tries++;
                }
                setValue(date);
            }
            update();
            return picker;
        };

        picker.viewDate = function (newDate) {
            ///<signature helpKeyword="$.fn.datetimepicker.viewDate">
            ///<summary>Returns the component's model current viewDate, a moment object or null if not set.</summary>
            ///<returns type="Moment">viewDate.clone()</returns>
            ///</signature>
            ///<signature>
            ///<summary>Sets the components model current moment to it. Passing a null value unsets the components model current moment. Parsing of the newDate parameter is made using moment library with the options.format and options.useStrict components configuration.</summary>
            ///<param name="newDate" locid="$.fn.datetimepicker.date_p:newDate">Takes string, viewDate, moment, null parameter.</param>
            ///</signature>
            if (arguments.length === 0) {
                return viewDate.clone();
            }

            if (!newDate) {
                viewDate = date.clone();
                return picker;
            }

            if (typeof newDate !== 'string' && !moment.isMoment(newDate) && !(newDate instanceof Date)) {
                throw new TypeError('viewDate() parameter must be one of [string, moment or Date]');
            }

            viewDate = parseInputDate(newDate);
            viewUpdate();
            return picker;
        };

        // initializing element and component attributes
        if (element.is('input')) {
            input = element;
        } else {
            input = element.find(options.datepickerInput);
            if (input.size() === 0) {
                input = element.find('input');
            } else if (!input.is('input')) {
                throw new Error('CSS class "' + options.datepickerInput + '" cannot be applied to non input element');
            }
        }

        if (element.hasClass('input-group')) {
            // in case there is more then one 'input-group-addon' Issue #48
            if (element.find('.datepickerbutton').size() === 0) {
                component = element.find('.input-group-addon');
            } else {
                component = element.find('.datepickerbutton');
            }
        }

        if (!options.inline && !input.is('input')) {
            throw new Error('Could not initialize DateTimePicker without an input element');
        }

        // Set defaults for date here now instead of in var declaration
        date = getMoment();
        viewDate = date.clone();

        $.extend(true, options, dataToOptions());

        picker.options(options);

        initFormatting();

        attachDatePickerElementEvents();

        if (input.prop('disabled')) {
            picker.disable();
        }
        if (input.is('input') && input.val().trim().length !== 0) {
            setValue(parseInputDate(input.val().trim()));
        }
        else if (options.defaultDate && input.attr('placeholder') === undefined) {
            setValue(options.defaultDate);
        }
//        if (options.inline) {
//            show();
//        }
        return picker;
    };

    /********************************************************************************
     *
     * jQuery plugin constructor and defaults object
     *
     ********************************************************************************/

    $.fn.datetimepicker = function (options) {
        return this.each(function () {
            var $this = $(this);
            if (!$this.data('DateTimePicker')) {
                // create a private copy of the defaults object
                options = $.extend(true, {}, $.fn.datetimepicker.defaults, options);
                $this.data('DateTimePicker', dateTimePicker($this, options));
            }
        });
    };

    $.fn.datetimepicker.defaults = {
        timeZone: 'Etc/UTC',
        format: false,
        dayViewHeaderFormat: 'MMMM YYYY',
        extraFormats: false,
        stepping: 1,
        minDate: false,
        maxDate: false,
        useCurrent: true,
        collapse: true,
        locale: moment.locale(),
        defaultDate: false,
        disabledDates: false,
        enabledDates: false,
        icons: {
            time: 'glyphicon glyphicon-time',
            date: 'glyphicon glyphicon-calendar',
            up: 'glyphicon glyphicon-chevron-up',
            down: 'glyphicon glyphicon-chevron-down',
            previous: 'glyphicon glyphicon-chevron-left',
            next: 'glyphicon glyphicon-chevron-right',
            today: 'glyphicon glyphicon-screenshot',
            clear: 'glyphicon glyphicon-trash',
            close: 'glyphicon glyphicon-remove'
        },
        tooltips: {
            today: 'Go to today',
            clear: 'Clear selection',
            close: 'Close the picker',
            selectMonth: 'Select Month',
            prevMonth: 'Previous Month',
            nextMonth: 'Next Month',
            selectYear: 'Select Year',
            prevYear: 'Previous Year',
            nextYear: 'Next Year',
            selectDecade: 'Select Decade',
            prevDecade: 'Previous Decade',
            nextDecade: 'Next Decade',
            prevCentury: 'Previous Century',
            nextCentury: 'Next Century',
            pickHour: 'Pick Hour',
            incrementHour: 'Increment Hour',
            decrementHour: 'Decrement Hour',
            pickMinute: 'Pick Minute',
            incrementMinute: 'Increment Minute',
            decrementMinute: 'Decrement Minute',
            pickSecond: 'Pick Second',
            incrementSecond: 'Increment Second',
            decrementSecond: 'Decrement Second',
            togglePeriod: 'Toggle Period',
            selectTime: 'Select Time'
        },
        useStrict: false,
        sideBySide: false,
        daysOfWeekDisabled: false,
        calendarWeeks: false,
        viewMode: 'days',
        toolbarPlacement: 'default',
        showTodayButton: false,
        showClear: false,
        showClose: false,
        widgetPositioning: {
            horizontal: 'auto',
            vertical: 'auto'
        },
        widgetParent: null,
        ignoreReadonly: false,
        keepOpen: false,
        focusOnShow: true,
        inline: false,
        keepInvalid: false,
        datepickerInput: '.datepickerinput',
        keyBinds: {
            up: function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().subtract(7, 'd'));
                } else {
                    this.date(d.clone().add(this.stepping(), 'm'));
                }
            },
            down: function (widget) {
                if (!widget) {
                    this.show();
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().add(7, 'd'));
                } else {
                    this.date(d.clone().subtract(this.stepping(), 'm'));
                }
            },
            'control up': function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().subtract(1, 'y'));
                } else {
                    this.date(d.clone().add(1, 'h'));
                }
            },
            'control down': function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().add(1, 'y'));
                } else {
                    this.date(d.clone().subtract(1, 'h'));
                }
            },
            left: function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().subtract(1, 'd'));
                }
            },
            right: function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().add(1, 'd'));
                }
            },
            pageUp: function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().subtract(1, 'M'));
                }
            },
            pageDown: function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().add(1, 'M'));
                }
            },
            enter: function () {
                this.hide();
            },
            escape: function () {
                this.hide();
            },
            //tab: function (widget) { //this break the flow of the form. disabling for now
            //    var toggle = widget.find('.picker-switch a[data-action="togglePicker"]');
            //    if(toggle.length > 0) toggle.click();
            //},
            'control space': function (widget) {
                if (widget.find('.timepicker').is(':visible')) {
                    widget.find('.btn[data-action="togglePeriod"]').click();
                }
            },
            t: function () {
                this.date(this.getMoment());
            },
            'delete': function () {
                this.clear();
            }
        },
        debug: false,
        allowInputToggle: false,
        disabledTimeIntervals: false,
        disabledHours: false,
        enabledHours: false,
        viewDate: false
    };
}));

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Ractive=e()}(this,function(){"use strict";function t(t){var e;if(t&&"boolean"!=typeof t)return"undefined"!=typeof window&&document&&t?t.nodeType?t:"string"==typeof t&&(e=document.getElementById(t),!e&&document.querySelector&&(e=document.querySelector(t)),e&&e.nodeType)?e:t[0]&&t[0].nodeType?t[0]:null:null}function e(t){return t&&"unknown"!=typeof t.parentNode&&t.parentNode&&t.parentNode.removeChild(t),t}function n(t){return null!=t&&t.toString?t:""}function r(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;e>r;r++)n[r-1]=arguments[r];for(var i,s;s=n.shift();)for(i in s)ja.call(s,i)&&(t[i]=s[i]);return t}function i(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;e>r;r++)n[r-1]=arguments[r];return n.forEach(function(e){for(var n in e)!e.hasOwnProperty(n)||n in t||(t[n]=e[n])}),t}function s(t){return"[object Array]"===Ra.call(t)}function o(t){return Na.test(Ra.call(t))}function a(t,e){return null===t&&null===e?!0:"object"==typeof t||"object"==typeof e?!1:t===e}function u(t){return!isNaN(parseFloat(t))&&isFinite(t)}function h(t){return t&&"[object Object]"===Ra.call(t)}function c(t,e){return t.replace(/%s/g,function(){return e.shift()})}function l(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;e>r;r++)n[r-1]=arguments[r];throw t=c(t,n),new Error(t)}function f(){Kw.DEBUG&&Pa.apply(null,arguments)}function d(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;e>r;r++)n[r-1]=arguments[r];t=c(t,n),Ta(t,n)}function p(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;e>r;r++)n[r-1]=arguments[r];t=c(t,n),Da[t]||(Da[t]=!0,Ta(t,n))}function m(){Kw.DEBUG&&d.apply(null,arguments)}function v(){Kw.DEBUG&&p.apply(null,arguments)}function g(t,e,n){var r=y(t,e,n);return r?r[t][n]:null}function y(t,e,n){for(;e;){if(n in e[t])return e;if(e.isolated)return null;e=e.parent}}function w(t){return function(){return t}}function b(t){var e,n,r,i,s,o;for(e=t.split("."),(n=$a[e.length])||(n=x(e.length)),s=[],r=function(t,n){return t?"*":e[n]},i=n.length;i--;)o=n[i].map(r).join("."),s.hasOwnProperty(o)||(s.push(o),s[o]=!0);return s}function x(t){var e,n,r,i,s,o,a,u,h="";if(!$a[t]){for(r=[];h.length<t;)h+=1;for(e=parseInt(h,2),i=function(t){return"1"===t},s=0;e>=s;s+=1){for(n=s.toString(2);n.length<t;)n="0"+n;for(u=[],a=n.length,o=0;a>o;o++)u.push(i(n[o]));r[s]=u}$a[t]=r}return $a[t]}function k(t,e,n,r){var i=t[e];if(!i||!i.equalsOrStartsWith(r)&&i.equalsOrStartsWith(n))return t[e]=i?i.replace(n,r):r,!0}function E(t){var e=t.slice(2);return"i"===t[1]&&u(e)?+e:e}function _(t){return null==t?t:(Za.hasOwnProperty(t)||(Za[t]=new Ha(t)),Za[t])}function A(t,e){function n(e,n){var r,i,o;return n.isRoot?o=[].concat(Object.keys(t.viewmodel.data),Object.keys(t.viewmodel.mappings),Object.keys(t.viewmodel.computations)):(r=t.viewmodel.wrapped[n.str],i=r?r.get():t.viewmodel.get(n),o=i?Object.keys(i):null),o&&o.forEach(function(t){"_ractive"===t&&s(i)||e.push(n.join(t))}),e}var r,i,o;for(r=e.str.split("."),o=[Ga];i=r.shift();)"*"===i?o=o.reduce(n,[]):o[0]===Ga?o[0]=_(i):o=o.map(S(i));return o}function S(t){return function(e){return e.join(t)}}function C(t){return t?t.replace(qa,".$1"):""}function O(t,e,n){if("string"!=typeof e||!u(n))throw new Error("Bad arguments");var r=void 0,i=void 0;if(/\*/.test(e))return i={},A(t,_(C(e))).forEach(function(e){var r=t.viewmodel.get(e);if(!u(r))throw new Error(Ja);i[e.str]=r+n}),t.set(i);if(r=t.get(e),!u(r))throw new Error(Ja);return t.set(e,+r+n)}function P(t,e){return Ya(this,t,void 0===e?1:+e)}function T(t){this.event=t,this.method="on"+t,this.deprecate=ru[t]}function F(t,e){var n=t.indexOf(e);-1===n&&t.push(e)}function j(t,e){for(var n=0,r=t.length;r>n;n++)if(t[n]==e)return!0;return!1}function R(t,e){var n;if(!s(t)||!s(e))return!1;if(t.length!==e.length)return!1;for(n=t.length;n--;)if(t[n]!==e[n])return!1;return!0}function N(t){return"string"==typeof t?[t]:void 0===t?[]:t}function D(t){return t[t.length-1]}function L(t,e){var n=t.indexOf(e);-1!==n&&t.splice(n,1)}function I(t){for(var e=[],n=t.length;n--;)e[n]=t[n];return e}function V(t){setTimeout(t,0)}function W(t,e){return function(){for(var n;n=t.shift();)n(e)}}function M(t,e,n,r){var i;if(e===t)throw new TypeError("A promise's fulfillment handler cannot return the same promise");if(e instanceof iu)e.then(n,r);else if(!e||"object"!=typeof e&&"function"!=typeof e)n(e);else{try{i=e.then}catch(s){return void r(s)}if("function"==typeof i){var o,a,u;a=function(e){o||(o=!0,M(t,e,n,r))},u=function(t){o||(o=!0,r(t))};try{i.call(e,a,u)}catch(s){if(!o)return r(s),void(o=!0)}}else n(e)}}function U(t,e,n){var r;return e=C(e),"~/"===e.substr(0,2)?(r=_(e.substring(2)),$(t,r.firstKey,n)):"."===e[0]?(r=z(cu(n),e),r&&$(t,r.firstKey,n)):r=B(t,_(e),n),r}function z(t,e){var n;if(void 0!=t&&"string"!=typeof t&&(t=t.str),"."===e)return _(t);if(n=t?t.split("."):[],"../"===e.substr(0,3)){for(;"../"===e.substr(0,3);){if(!n.length)throw new Error('Could not resolve reference - too many "../" prefixes');n.pop(),e=e.substring(3)}return n.push(e),_(n.join("."))}return _(t?t+e.replace(/^\.\//,"."):e.replace(/^\.\/?/,""))}function B(t,e,n,r){var i,s,o,a,u;if(e.isRoot)return e;for(s=e.firstKey;n;)if(i=n.context,n=n.parent,i&&(a=!0,o=t.viewmodel.get(i),o&&("object"==typeof o||"function"==typeof o)&&s in o))return i.join(e.str);return q(t.viewmodel,s)?e:t.parent&&!t.isolated&&(a=!0,n=t.component.parentFragment,s=_(s),u=B(t.parent,s,n,!0))?(t.viewmodel.map(s,{origin:t.parent.viewmodel,keypath:u}),e):r||a?void 0:(t.viewmodel.set(e,void 0),e)}function $(t,e){var n;!t.parent||t.isolated||q(t.viewmodel,e)||(e=_(e),(n=B(t.parent,e,t.component.parentFragment,!0))&&t.viewmodel.map(e,{origin:t.parent.viewmodel,keypath:n}))}function q(t,e){return""===e||e in t.data||e in t.computations||e in t.mappings}function Q(t){t.teardown()}function Z(t){t.unbind()}function H(t){t.unrender()}function K(t){t.cancel()}function G(t){t.detach()}function Y(t){t.detachNodes()}function J(t){!t.ready||t.outros.length||t.outroChildren||(t.outrosComplete||(t.parent?t.parent.decrementOutros(t):t.detachNodes(),t.outrosComplete=!0),t.intros.length||t.totalChildren||("function"==typeof t.callback&&t.callback(),t.parent&&t.parent.decrementTotal()))}function X(){for(var t,e,n;du.ractives.length;)e=du.ractives.pop(),n=e.viewmodel.applyChanges(),n&&gu.fire(e,n);for(tt(),t=0;t<du.views.length;t+=1)du.views[t].update();for(du.views.length=0,t=0;t<du.tasks.length;t+=1)du.tasks[t]();return du.tasks.length=0,du.ractives.length?X():void 0}function tt(){var t,e,n,r;for(t=vu.length;t--;)e=vu[t],e.keypath?vu.splice(t,1):(n=lu(e.root,e.ref,e.parentFragment))&&((r||(r=[])).push({item:e,keypath:n}),vu.splice(t,1));r&&r.forEach(et)}function et(t){t.item.resolve(t.keypath)}function nt(t,e,n){var r,i,s,o,a,u,h,c,l,f,d,p,m,v;if(r=new hu(function(t){return i=t}),"object"==typeof t){n=e||{},u=n.easing,h=n.duration,a=[],c=n.step,l=n.complete,(c||l)&&(d={},n.step=null,n.complete=null,f=function(t){return function(e,n){d[t]=n}});for(s in t)t.hasOwnProperty(s)&&((c||l)&&(p=f(s),n={easing:u,duration:h},c&&(n.step=p)),n.complete=l?p:Ea,a.push(rt(this,s,t[s],n)));return v={easing:u,duration:h},c&&(v.step=function(t){return c(t,d)}),l&&r.then(function(t){return l(t,d)}),v.complete=i,m=rt(this,null,null,v),a.push(m),r.stop=function(){for(var t;t=a.pop();)t.stop();m&&m.stop()},r}return n=n||{},n.complete&&r.then(n.complete),n.complete=i,o=rt(this,t,e,n),r.stop=function(){return o.stop()},r}function rt(t,e,n,r){var i,s,o,u;return e&&(e=_(C(e))),null!==e&&(u=t.viewmodel.get(e)),xu.abort(e,t),a(u,n)?(r.complete&&r.complete(r.to),Au):(r.easing&&(i="function"==typeof r.easing?r.easing:t.easing[r.easing],"function"!=typeof i&&(i=null)),s=void 0===r.duration?400:r.duration,o=new Eu({keypath:e,from:u,to:n,root:t,duration:s,easing:i,interpolator:r.interpolator,step:r.step,complete:r.complete}),xu.add(o),t._animations.push(o),o)}function it(){return this.detached?this.detached:(this.el&&L(this.el.__ractive_instances__,this),this.detached=this.fragment.detach(),Cu.fire(this),this.detached)}function st(t){return this.el?this.fragment.find(t):null}function ot(t,e){var n;return n=this._isComponentQuery?!this.selector||t.name===this.selector:t.node?fa(t.node,this.selector):null,n?(this.push(t.node||t.instance),e||this._makeDirty(),!0):void 0}function at(t){var e;return(e=t.parentFragment)?e.owner:t.component&&(e=t.component.parentFragment)?e.owner:void 0}function ut(t){var e,n;for(e=[t],n=at(t);n;)e.push(n),n=at(n);return e}function ht(t,e,n,r){var i=[];return Sa(i,{selector:{value:e},live:{value:n},_isComponentQuery:{value:r},_test:{value:Pu}}),n?(Sa(i,{cancel:{value:Tu},_root:{value:t},_sort:{value:Ru},_makeDirty:{value:Nu},_remove:{value:Du},_dirty:{value:!1,writable:!0}}),i):i}function ct(t,e){var n,r;return this.el?(e=e||{},n=this._liveQueries,(r=n[t])?e&&e.live?r:r.slice():(r=Lu(this,t,!!e.live,!1),r.live&&(n.push(t),n["_"+t]=r),this.fragment.findAll(t,r),r)):[]}function lt(t,e){var n,r;return e=e||{},n=this._liveComponentQueries,(r=n[t])?e&&e.live?r:r.slice():(r=Lu(this,t,!!e.live,!0),r.live&&(n.push(t),n["_"+t]=r),this.fragment.findAllComponents(t,r),r)}function ft(t){return this.fragment.findComponent(t)}function dt(t){return this.container?this.container.component&&this.container.component.name===t?this.container:this.container.findContainer(t):null}function pt(t){return this.parent?this.parent.component&&this.parent.component.name===t?this.parent:this.parent.findParent(t):null}function mt(t,e){var n=void 0===arguments[2]?{}:arguments[2];if(e){n.event?n.event.name=e:n.event={name:e,_noArg:!0};var r=_(e).wildcardMatches();vt(t,r,n.event,n.args,!0)}}function vt(t,e,n,r){var i,s,o=void 0===arguments[4]?!1:arguments[4],a=!0;for(Bu.enqueue(t,n),s=e.length;s>=0;s--)i=t._subs[e[s]],i&&(a=gt(t,i,n,r)&&a);if(Bu.dequeue(t),t.parent&&a){if(o&&t.component){var u=t.component.name+"."+e[e.length-1];e=_(u).wildcardMatches(),n&&(n.component=t)}vt(t.parent,e,n,r)}}function gt(t,e,n,r){var i=null,s=!1;n&&!n._noArg&&(r=[n].concat(r)),e=e.slice();for(var o=0,a=e.length;a>o;o+=1)e[o].apply(t,r)===!1&&(s=!0);return n&&!n._noArg&&s&&(i=n.original)&&(i.preventDefault&&i.preventDefault(),i.stopPropagation&&i.stopPropagation()),!s}function yt(t){var e={args:Array.prototype.slice.call(arguments,1)};$u(this,t,e)}function wt(t){var e;return t=_(C(t)),e=this.viewmodel.get(t,Zu),void 0===e&&this.parent&&!this.isolated&&lu(this,t.str,this.component.parentFragment)&&(e=this.viewmodel.get(t)),e}function bt(e,n){if(!this.fragment.rendered)throw new Error("The API has changed - you must call `ractive.render(target[, anchor])` to render your Ractive instance. Once rendered you can use `ractive.insert()`.");if(e=t(e),n=t(n)||null,!e)throw new Error("You must specify a valid target to insert into");e.insertBefore(this.detach(),n),this.el=e,(e.__ractive_instances__||(e.__ractive_instances__=[])).push(this),this.detached=null,xt(this)}function xt(t){Ku.fire(t),t.findAllComponents("*").forEach(function(t){xt(t.instance)})}function kt(t,e,n){var r,i;return t=_(C(t)),r=this.viewmodel.get(t),s(r)&&s(e)?(i=yu.start(this,!0),this.viewmodel.merge(t,r,e,n),yu.end(),i):this.set(t,e,n&&n.complete)}function Et(t,e){var n,r;return n=A(t,e),r={},n.forEach(function(e){r[e.str]=t.get(e.str)}),r}function _t(t,e,n,r){var i,s,o;e=_(C(e)),r=r||ch,e.isPattern?(i=new uh(t,e,n,r),t.viewmodel.patternObservers.push(i),s=!0):i=new Xu(t,e,n,r),i.init(r.init),t.viewmodel.register(e,i,s?"patternObservers":"observers"),i.ready=!0;var a={cancel:function(){var n;o||(s?(n=t.viewmodel.patternObservers.indexOf(i),t.viewmodel.patternObservers.splice(n,1),t.viewmodel.unregister(e,i,"patternObservers")):t.viewmodel.unregister(e,i,"observers"),o=!0)}};return t._observers.push(a),a}function At(t,e,n){var r,i,s,o;if(h(t)){n=e,i=t,r=[];for(t in i)i.hasOwnProperty(t)&&(e=i[t],r.push(this.observe(t,e,n)));return{cancel:function(){for(;r.length;)r.pop().cancel()}}}if("function"==typeof t)return n=e,e=t,t="",hh(this,t,e,n);if(s=t.split(" "),1===s.length)return hh(this,t,e,n);for(r=[],o=s.length;o--;)t=s[o],t&&r.push(hh(this,t,e,n));return{cancel:function(){for(;r.length;)r.pop().cancel()}}}function St(t,e,n){var r=this.observe(t,function(){e.apply(this,arguments),r.cancel()},{init:!1,defer:n&&n.defer});return r}function Ct(t,e){var n,r=this;if(t)n=t.split(" ").map(dh).filter(ph),n.forEach(function(t){var n,i;(n=r._subs[t])&&(e?(i=n.indexOf(e),-1!==i&&n.splice(i,1)):r._subs[t]=[])});else for(t in this._subs)delete this._subs[t];return this}function Ot(t,e){var n,r,i,s=this;if("object"==typeof t){n=[];for(r in t)t.hasOwnProperty(r)&&n.push(this.on(r,t[r]));return{cancel:function(){for(var t;t=n.pop();)t.cancel()}}}return i=t.split(" ").map(dh).filter(ph),i.forEach(function(t){(s._subs[t]||(s._subs[t]=[])).push(e)}),{cancel:function(){return s.off(t,e)}}}function Pt(t,e){var n=this.on(t,function(){e.apply(this,arguments),n.cancel()});return n}function Tt(t,e,n){var r,i,s,o,a,u,h=[];if(r=Ft(t,e,n),!r)return null;for(i=t.length,a=r.length-2-r[1],s=Math.min(i,r[0]),o=s+r[1],u=0;s>u;u+=1)h.push(u);for(;o>u;u+=1)h.push(-1);for(;i>u;u+=1)h.push(u+a);return h.touchedFrom=0!==a?r[0]:t.length,h}function Ft(t,e,n){switch(e){case"splice":for(void 0!==n[0]&&n[0]<0&&(n[0]=t.length+Math.max(n[0],-t.length));n.length<2;)n.push(0);return n[1]=Math.min(n[1],t.length-n[0]),n;case"sort":case"reverse":return null;case"pop":return t.length?[t.length-1,1]:[0,0];case"push":return[t.length,0].concat(n);case"shift":return[0,t.length?1:0];case"unshift":return[0,0].concat(n)}}function jt(e,n){var r,i,s,o=this;if(s=this.transitionsEnabled,this.noIntro&&(this.transitionsEnabled=!1),r=yu.start(this,!0),yu.scheduleTask(function(){return Th.fire(o)},!0),this.fragment.rendered)throw new Error("You cannot call ractive.render() on an already rendered instance! Call ractive.unrender() first");if(e=t(e)||this.el,n=t(n)||this.anchor,this.el=e,this.anchor=n,!this.append&&e){var a=e.__ractive_instances__;a&&a.length&&Rt(a),e.innerHTML=""}return this.cssId&&Oh.apply(),e&&((i=e.__ractive_instances__)?i.push(this):e.__ractive_instances__=[this],n?e.insertBefore(this.fragment.render(),n):e.appendChild(this.fragment.render())),yu.end(),this.transitionsEnabled=s,r.then(function(){return Fh.fire(o)})}function Rt(t){t.splice(0,t.length).forEach(Q)}function Nt(t,e){for(var n=t.slice(),r=e.length;r--;)~n.indexOf(e[r])||n.push(e[r]);return n}function Dt(t,e){var n,r,i;return r='[data-ractive-css~="{'+e+'}"]',i=function(t){var e,n,i,s,o,a,u,h=[];for(e=[];n=Ih.exec(t);)e.push({str:n[0],base:n[1],modifiers:n[2]});for(s=e.map(It),u=e.length;u--;)a=s.slice(),i=e[u],a[u]=i.base+r+i.modifiers||"",o=s.slice(),o[u]=r+" "+o[u],h.push(a.join(" "),o.join(" "));return h.join(", ")},n=Wh.test(t)?t.replace(Wh,r):t.replace(Lh,"").replace(Dh,function(t,e){var n,r;return Vh.test(e)?t:(n=e.split(",").map(Lt),r=n.map(i).join(", ")+" ",t.replace(e,r))})}function Lt(t){return t.trim?t.trim():t.replace(/^\s+/,"").replace(/\s+$/,"")}function It(t){return t.str}function Vt(t){t&&t.constructor!==Object&&("function"==typeof t||("object"!=typeof t?l("data option must be an object or a function, `"+t+"` is not valid"):m("If supplied, options.data should be a plain JavaScript object - using a non-POJO as the root object may work, but is discouraged")))}function Wt(t,e){Vt(e);var n="function"==typeof t,r="function"==typeof e;return e||n||(e={}),n||r?function(){var i=r?Mt(e,this):e,s=n?Mt(t,this):t;return Ut(i,s)}:Ut(e,t)}function Mt(t,e){var n=t.call(e);if(n)return"object"!=typeof n&&l("Data function must return an object"),n.constructor!==Object&&v("Data function returned something other than a plain JavaScript object. This might work, but is strongly discouraged"),n}function Ut(t,e){if(t&&e){for(var n in e)n in t||(t[n]=e[n]);return t}return t||e}function zt(t){var e,n,r;return t.matchString("=")?(e=t.pos,t.allowWhitespace(),(n=t.matchPattern(Lc))?t.matchPattern(Ic)?(r=t.matchPattern(Lc))?(t.allowWhitespace(),t.matchString("=")?[n,r]:(t.pos=e,null)):(t.pos=e,null):null:(t.pos=e,null)):null}function Bt(t){var e;return(e=t.matchPattern(Wc))?{t:gc,v:e}:null}function $t(t){var e,n;if(t.interpolate[t.inside]===!1)return null;for(n=0;n<t.tags.length;n+=1)if(e=qt(t,t.tags[n]))return e}function qt(t,e){var n,r,i,s;if(n=t.pos,t.matchString("\\"+e.open)){if(0===n||"\\"!==t.str[n-1])return e.open}else if(!t.matchString(e.open))return null;if(r=Dc(t))return t.matchString(e.close)?(e.open=r[0],e.close=r[1],t.sortMustacheTags(),Uc):null;if(t.allowWhitespace(),t.matchString("/")){t.pos-=1;var o=t.pos;Vc(t)?t.pos=o:(t.pos=o-e.close.length,t.error("Attempted to close a section that wasn't open"))}for(s=0;s<e.readers.length;s+=1)if(i=e.readers[s],r=i(t,e))return e.isStatic&&(r.s=!0),t.includeLinePositions&&(r.p=t.getLinePos(n)),r;return t.pos=n,null}function Qt(t){var e;return(e=t.matchPattern(qc))?{t:fc,v:e}:null}function Zt(t){var e=t.remaining();return"true"===e.substr(0,4)?(t.pos+=4,{t:vc,v:"true"}):"false"===e.substr(0,5)?(t.pos+=5,{t:vc,v:"false"}):null}function Ht(t){var e;return(e=Jc(t))?el.test(e.v)?e.v:'"'+e.v.replace(/"/g,'\\"')+'"':(e=$c(t))?e.v:(e=t.matchPattern(Xc))?e:void 0}function Kt(t){var e,n,r;return e=t.pos,t.allowWhitespace(),n=tl(t),null===n?(t.pos=e,null):(t.allowWhitespace(),t.matchString(":")?(t.allowWhitespace(),r=Fl(t),null===r?(t.pos=e,null):{t:wc,k:n,v:r}):(t.pos=e,null))}function Gt(t){var e,n,r,i;return e=t.pos,r=nl(t),null===r?null:(n=[r],t.matchString(",")?(i=Gt(t),i?n.concat(i):(t.pos=e,null)):n)}function Yt(t){function e(t){r.push(t)}var n,r,i,s;return n=t.pos,t.allowWhitespace(),i=Fl(t),null===i?null:(r=[i],t.allowWhitespace(),t.matchString(",")&&(s=Yt(t),null===s&&t.error(zc),s.forEach(e)),r)}function Jt(t){return $c(t)||Qc(t)||Jc(t)||il(t)||ol(t)||Vc(t)}function Xt(t){var e,n,r,i,s,o;return e=t.pos,r=t.matchPattern(/^@(?:keypath|index|key)/),r||(n=t.matchPattern(hl)||"",r=!n&&t.relaxedNames&&t.matchPattern(dl)||t.matchPattern(fl),r||"."!==n||(n="",r=".")),r?n||t.relaxedNames||!Hc.test(r)?!n&&Zc.test(r)?(i=Zc.exec(r)[0],t.pos=e+i.length,{t:yc,v:i}):(s=(n||"")+C(r),t.matchString("(")&&(o=s.lastIndexOf("."),-1!==o?(s=s.substr(0,o),t.pos=e+s.length):t.pos-=1),{t:bc,n:s.replace(/^this\./,"./").replace(/^this$/,".")}):(t.pos=e,null):null}function te(t){var e,n;return e=t.pos,t.matchString("(")?(t.allowWhitespace(),n=Fl(t),n||t.error(zc),t.allowWhitespace(),t.matchString(")")||t.error(Bc),{t:_c,x:n}):null}function ee(t){var e,n,r;if(e=t.pos,t.allowWhitespace(),t.matchString(".")){if(t.allowWhitespace(),n=t.matchPattern(Xc))return{t:xc,n:n};t.error("Expected a property name")}return t.matchString("[")?(t.allowWhitespace(),r=Fl(t),r||t.error(zc),t.allowWhitespace(),t.matchString("]")||t.error("Expected ']'"),{t:xc,x:r}):null}function ne(t){var e,n,r,i;return(n=Pl(t))?(e=t.pos,t.allowWhitespace(),t.matchString("?")?(t.allowWhitespace(),r=Fl(t),r||t.error(zc),t.allowWhitespace(),t.matchString(":")||t.error('Expected ":"'),t.allowWhitespace(),i=Fl(t),i||t.error(zc),{t:Ac,o:[n,r,i]}):(t.pos=e,n)):null}function re(t){return Tl(t)}function ie(t){function e(t){switch(t.t){case vc:case yc:case fc:case gc:return t.v;case dc:return JSON.stringify(String(t.v));case pc:return"["+(t.m?t.m.map(e).join(","):"")+"]";case mc:return"{"+(t.m?t.m.map(e).join(","):"")+"}";case wc:return t.k+":"+e(t.v);case Ec:return("typeof"===t.s?"typeof ":t.s)+e(t.o);case Sc:return e(t.o[0])+("in"===t.s.substr(0,2)?" "+t.s+" ":t.s)+e(t.o[1]);case Cc:return e(t.x)+"("+(t.o?t.o.map(e).join(","):"")+")";case _c:return"("+e(t.x)+")";case kc:return e(t.x)+e(t.r);case xc:return t.n?"."+t.n:"["+e(t.x)+"]";case Ac:return e(t.o[0])+"?"+e(t.o[1])+":"+e(t.o[2]);case bc:return"_"+n.indexOf(t.n);default:throw new Error("Expected legal JavaScript")}}var n;return se(t,n=[]),{r:n,s:e(t)}}function se(t,e){var n,r;if(t.t===bc&&-1===e.indexOf(t.n)&&e.unshift(t.n),r=t.o||t.m)if(h(r))se(r,e);else for(n=r.length;n--;)se(r[n],e);t.x&&se(t.x,e),t.r&&se(t.r,e),t.v&&se(t.v,e)}function oe(t,e){var n;if(t){for(;t.t===_c&&t.x;)t=t.x;return t.t===bc?e.r=t.n:t.t===fc&&Nl.test(t.v)?e.r=t.v:(n=ae(t))?e.rx=n:e.x=jl(t),e}}function ae(t){for(var e,n=[];t.t===kc&&t.r.t===xc;)e=t.r,n.unshift(e.x?e.x.t===bc?e.x:jl(e.x):e.n),t=t.x;return t.t!==bc?null:{r:t.n,m:n}}function ue(t,e){var n,r=Fl(t);return r?(t.matchString(e.close)||t.error("Expected closing delimiter '"+e.close+"'"),n={t:Jh},Rl(r,n),n):null}function he(t,e){var n,r;return t.matchString("&")?(t.allowWhitespace(),(n=Fl(t))?(t.matchString(e.close)||t.error("Expected closing delimiter '"+e.close+"'"),r={t:Jh},Rl(n,r),r):null):null}function ce(t,e){var n,r,i,s,o;return n=t.pos,t.matchString(">")?(t.allowWhitespace(),r=t.pos,t.relaxedNames=!0,i=Fl(t),t.relaxedNames=!1,t.allowWhitespace(),s=Fl(t),t.allowWhitespace(),i?(o={t:rc},Rl(i,o),t.allowWhitespace(),s&&(o={t:Xh,n:Fc,f:[o]},Rl(s,o)),t.matchString(e.close)||t.error("Expected closing delimiter '"+e.close+"'"),o):null):null}function le(t,e){var n;return t.matchString("!")?(n=t.remaining().indexOf(e.close),-1!==n?(t.pos+=n+e.close.length,{t:ic}):void 0):null}function fe(t,e){var n,r,i;if(n=t.pos,r=Fl(t),!r)return null;for(i=0;i<e.length;i+=1)if(t.remaining().substr(0,e[i].length)===e[i])return r;return t.pos=n,ul(t)}function de(t,e){var n,r,i,s;n=t.pos;try{r=Wl(t,[e.close])}catch(o){s=o}if(!r){if("!"===t.str.charAt(n))return t.pos=n,null;if(s)throw s}if(!t.matchString(e.close)&&(t.error("Expected closing delimiter '"+e.close+"' after reference"),!r)){if("!"===t.nextChar())return null;t.error("Expected expression or legal reference")}return i={t:Yh},Rl(r,i),i}function pe(t,e){var n,r,i;return t.matchPattern(zl)?(n=t.pos,r=t.matchPattern(/^[a-zA-Z_$][a-zA-Z_$0-9\-]*/),t.allowWhitespace(),t.matchString(e.close)||t.error("expected legal partial name"),i={t:hc},r&&(i.n=r),i):null}function me(t,e){var n,r,i,s;return n=t.pos,t.matchString(e.open)?(t.allowWhitespace(),t.matchString("/")?(t.allowWhitespace(),r=t.remaining(),i=r.indexOf(e.close),-1!==i?(s={t:ec,r:r.substr(0,i).split(" ")[0]},t.pos+=i,t.matchString(e.close)||t.error("Expected closing delimiter '"+e.close+"'"),s):(t.pos=n,null)):(t.pos=n,null)):null}function ve(t,e){var n=t.pos;return t.matchString(e.open)?t.matchPattern(ql)?(t.matchString(e.close)||t.error("Expected closing delimiter '"+e.close+"'"),{t:Rc}):(t.pos=n,null):null}function ge(t,e){var n,r=t.pos;return t.matchString(e.open)?t.matchPattern(Zl)?(n=Fl(t),t.matchString(e.close)||t.error("Expected closing delimiter '"+e.close+"'"),{t:Nc,x:n}):(t.pos=r,null):null}function ye(t,e){var n,r,i,s,o,a,u,h,c,l,f,d;if(n=t.pos,t.matchString("^"))i={t:Xh,f:[],n:Pc};else{if(!t.matchString("#"))return null;i={t:Xh,f:[]},t.matchString("partial")&&(t.pos=n-t.standardDelimiters[0].length,t.error("Partial definitions can only be at the top level of the template, or immediately inside components")),(u=t.matchPattern(Jl))&&(d=u,i.n=Hl[u])}if(t.allowWhitespace(),r=Fl(t),r||t.error("Expected expression"),f=t.matchPattern(Gl)){var p=void 0;i.i=(p=t.matchPattern(Yl))?f+","+p:f}t.allowWhitespace(),t.matchString(e.close)||t.error("Expected closing delimiter '"+e.close+"'"),t.sectionDepth+=1,o=i.f,c=[];do if(s=Bl(t,e))d&&s.r!==d&&t.error("Expected "+e.open+"/"+d+e.close),t.sectionDepth-=1,l=!0;else if(s=Ql(t,e))i.n===Pc&&t.error("{{else}} not allowed in {{#unless}}"),a&&t.error("illegal {{elseif...}} after {{else}}"),h||(h=we(r,i.n)),h.f.push({t:Xh,n:Oc,x:jl(xe(c.concat(s.x))),f:o=[]}),c.push(be(s.x));else if(s=$l(t,e))i.n===Pc&&t.error("{{else}} not allowed in {{#unless}}"),a&&t.error("there can only be one {{else}} block, at the end of a section"),a=!0,h?h.f.push({t:Xh,n:Oc,x:jl(xe(c)),f:o=[]}):(h=we(r,i.n),o=h.f);else{if(s=t.read(rd),!s)break;o.push(s)}while(!l);return h&&(i.n===Fc&&(i.n=jc),i.l=h),Rl(r,i),i.f.length||delete i.f,i}function we(t,e){var n;return e===Fc?(n={t:Xh,n:Oc,f:[]},Rl(be(t),n)):(n={t:Xh,n:Pc,f:[]},Rl(t,n)),n}function be(t){return t.t===Ec&&"!"===t.s?t.o:{t:Ec,s:"!",o:ke(t)}}function xe(t){return 1===t.length?t[0]:{t:Sc,s:"&&",o:[ke(t[0]),ke(xe(t.slice(1)))]}}function ke(t){return{t:_c,x:t}}function Ee(t){var e,n,r,i,s;return e=t.pos,t.matchString(tf)?(r=t.remaining(),i=r.indexOf(ef),-1===i&&t.error("Illegal HTML - expected closing comment sequence ('-->')"),n=r.substr(0,i),t.pos+=i+3,s={t:ic,c:n},t.includeLinePositions&&(s.p=t.getLinePos(e)),s):null}function _e(t){return t.replace(Al,function(t,e){var n;return n="#"!==e[0]?El[e]:"x"===e[1]?parseInt(e.substring(2),16):parseInt(e.substring(1),10),n?String.fromCharCode(Ae(n)):t})}function Ae(t){return t?10===t?32:128>t?t:159>=t?_l[t-128]:55296>t?t:57343>=t?65533:65535>=t?t:65533:65533}function Se(t){return t.replace(Ol,"&amp;").replace(Sl,"&lt;").replace(Cl,"&gt;")}function Ce(t){return"string"==typeof t}function Oe(t){return t.t===ic||t.t===sc}function Pe(t){return(t.t===Xh||t.t===tc)&&t.f}function Te(t,e,n,r,i){var o,a,u,h,c,l,f,d;for(ff(t),o=t.length;o--;)a=t[o],a.exclude?t.splice(o,1):e&&a.t===ic&&t.splice(o,1);for(df(t,r?gf:null,i?yf:null),o=t.length;o--;){if(a=t[o],a.f){var p=a.t===nc&&vf.test(a.e);c=n||p,!n&&p&&df(a.f,wf,bf),c||(u=t[o-1],h=t[o+1],(!u||"string"==typeof u&&yf.test(u))&&(l=!0),(!h||"string"==typeof h&&gf.test(h))&&(f=!0)),Te(a.f,e,c,l,f)}if(a.l&&(Te(a.l.f,e,n,l,f),t.splice(o+1,0,a.l),delete a.l),a.a)for(d in a.a)a.a.hasOwnProperty(d)&&"string"!=typeof a.a[d]&&Te(a.a[d],e,n,l,f);if(a.m&&Te(a.m,e,n,l,f),a.v)for(d in a.v)a.v.hasOwnProperty(d)&&(s(a.v[d].n)&&Te(a.v[d].n,e,n,l,f),s(a.v[d].d)&&Te(a.v[d].d,e,n,l,f))}for(o=t.length;o--;)"string"==typeof t[o]&&("string"==typeof t[o+1]&&(t[o]=t[o]+t[o+1],t.splice(o+1,1)),n||(t[o]=t[o].replace(mf," ")),""===t[o]&&t.splice(o,1))}function Fe(t){var e,n;return e=t.pos,t.matchString("</")?(n=t.matchPattern(kf))?t.inside&&n!==t.inside?(t.pos=e,null):{t:ac,e:n}:(t.pos-=2,void t.error("Illegal closing tag")):null}function je(t){var e,n,r;return t.allowWhitespace(),(n=t.matchPattern(Af))?(e={name:n},r=Re(t),null!=r&&(e.value=r),e):null}function Re(t){var e,n,r,i;return e=t.pos,/[=\/>\s]/.test(t.nextChar())||t.error("Expected `=`, `/`, `>` or whitespace"),t.allowWhitespace(),t.matchString("=")?(t.allowWhitespace(),n=t.pos,r=t.sectionDepth,i=Le(t,"'")||Le(t,'"')||De(t),null===i&&t.error("Expected valid attribute value"),t.sectionDepth!==r&&(t.pos=n,t.error("An attribute value must contain as many opening section tags as closing section tags")),i.length?1===i.length&&"string"==typeof i[0]?_e(i[0]):i:""):(t.pos=e,null)}function Ne(t){var e,n,r,i,s;return e=t.pos,(n=t.matchPattern(Sf))?(r=n,i=t.tags.map(function(t){return t.open}),-1!==(s=Ef(r,i))&&(n=n.substr(0,s),t.pos=e+n.length),n):null}function De(t){var e,n;for(t.inAttribute=!0,e=[],n=Mc(t)||Ne(t);null!==n;)e.push(n),n=Mc(t)||Ne(t);return e.length?(t.inAttribute=!1,e):null}function Le(t,e){var n,r,i;if(n=t.pos,!t.matchString(e))return null;for(t.inAttribute=e,r=[],i=Mc(t)||Ie(t,e);null!==i;)r.push(i),i=Mc(t)||Ie(t,e);return t.matchString(e)?(t.inAttribute=!1,r):(t.pos=n,null)}function Ie(t,e){var n,r,i,s;return n=t.pos,i=t.remaining(),s=t.tags.map(function(t){return t.open}),s.push(e),r=Ef(i,s),-1===r&&t.error("Quoted attribute value must have a closing quote"),r?(t.pos+=r,i.substr(0,r)):null}function Ve(t){var e,n,r;return t.allowWhitespace(),(e=tl(t))?(r={key:e},t.allowWhitespace(),t.matchString(":")?(t.allowWhitespace(),(n=t.read())?(r.value=n.v,r):null):null):null}function We(t,e){var n,r,i,s,o,a,u,h,c;if("string"==typeof t){if(r=Tf.exec(t)){var l=t.lastIndexOf(")");return Ff.test(t)||e.error("Invalid input after method call expression '"+t.slice(l+1)+"'"),n={m:r[1]},s="["+t.slice(n.m.length+1,l)+"]",i=new Cf(s),n.a=jl(i.result[0]),n}if(-1===t.indexOf(":"))return t.trim();t=[t]}if(n={},u=[],h=[],t){for(;t.length;)if(o=t.shift(),"string"==typeof o){if(a=o.indexOf(":"),-1!==a){a&&u.push(o.substr(0,a)),o.length>a+1&&(h[0]=o.substring(a+1));break}u.push(o)}else u.push(o);h=h.concat(t)}return u.length?h.length||"string"!=typeof u?(n={n:1===u.length&&"string"==typeof u[0]?u[0]:u},1===h.length&&"string"==typeof h[0]?(c=Of("["+h[0]+"]"),n.a=c?c.value:h[0].trim()):n.d=h):n=u:n="",n}function Me(t){var e,n,r,i,s,o,a,u,h,c,l,f,d,p,m,v;if(e=t.pos,t.inside||t.inAttribute)return null;if(!t.matchString("<"))return null;if("/"===t.nextChar())return null;if(n={},t.includeLinePositions&&(n.p=t.getLinePos(e)),t.matchString("!"))return n.t=lc,t.matchPattern(/^doctype/i)||t.error("Expected DOCTYPE declaration"),n.a=t.matchPattern(/^(.+?)>/),n;if(n.t=nc,n.e=t.matchPattern(Rf),!n.e)return null;for(Nf.test(t.nextChar())||t.error("Illegal tag name"),s=function(e,r){var i=r.n||r;If.test(i)&&(t.pos-=i.length,t.error("Cannot use reserved event names (change, reset, teardown, update, construct, config, init, render, unrender, detach, insert)")),n.v[e]=r},t.allowWhitespace();o=Mc(t)||_f(t);)o.name?(r=Vf[o.name])?n[r]=Pf(o.value,t):(i=Lf.exec(o.name))?(n.v||(n.v={}),a=Pf(o.value,t),s(i[1],a)):t.sanitizeEventAttributes&&Df.test(o.name)||(n.a||(n.a={}),n.a[o.name]=o.value||(""===o.value?"":0)):(n.m||(n.m=[]),n.m.push(o)),t.allowWhitespace();if(t.allowWhitespace(),t.matchString("/")&&(u=!0),!t.matchString(">"))return null;var g=n.e.toLowerCase(),y=t.preserveWhitespace;if(!u&&!kl.test(n.e)){t.elementStack.push(g),("script"===g||"style"===g)&&(t.inside=g),h=[],c=_a(null);do if(p=t.pos,m=t.remaining(),Ue(g,m))if(v=xf(t)){d=!0;var w=v.e.toLowerCase();if(w!==g&&(t.pos=p,!~t.elementStack.indexOf(w))){var b="Unexpected closing tag";kl.test(w)&&(b+=" (<"+w+"> is a void element - it cannot contain children)"),t.error(b)}}else(f=Bl(t,{open:t.standardDelimiters[0],close:t.standardDelimiters[1]}))?(d=!0,t.pos=p):(f=t.read(id))?(c[f.n]&&(t.pos=p,t.error("Duplicate partial definition")),pf(f.f,t.stripComments,y,!y,!y),c[f.n]=f.f,l=!0):(f=t.read(rd))?h.push(f):d=!0;else d=!0;while(!d);h.length&&(n.f=h),l&&(n.p=c),t.elementStack.pop()}return t.inside=null,t.sanitizeElements&&-1!==t.sanitizeElements.indexOf(g)?Wf:n}function Ue(t,e){var n,r;return n=/^<([a-zA-Z][a-zA-Z0-9]*)/.exec(e),r=jf[t],n&&r?!~r.indexOf(n[1].toLowerCase()):!0}function ze(t){var e,n,r,i;return n=t.remaining(),i=t.inside?"</"+t.inside:"<",t.inside&&!t.interpolate[t.inside]?e=n.indexOf(i):(r=t.tags.map(function(t){return t.open}),r=r.concat(t.tags.map(function(t){return"\\"+t.open})),t.inAttribute===!0?r.push('"',"'","=","<",">","`"):r.push(t.inAttribute?t.inAttribute:i),e=Ef(n,r)),e?(-1===e&&(e=n.length),t.pos+=e,t.inside?n.substr(0,e):_e(n.substr(0,e))):null}function Be(t){return t.replace($f,"\\$&")}function $e(t){var e=t.pos,n=t.standardDelimiters[0],r=t.standardDelimiters[1],i=void 0,s=void 0;if(!t.matchPattern(Qf)||!t.matchString(n))return t.pos=e,null;var o=t.matchPattern(Zf);if(v("Inline partial comments are deprecated.\nUse this...\n  {{#partial "+o+"}} ... {{/partial}}\n\n...instead of this:\n  <!-- {{>"+o+"}} --> ... <!-- {{/"+o+"}} -->'"),!t.matchString(r)||!t.matchPattern(Hf))return t.pos=e,null;i=[];var a=new RegExp("^<!--\\s*"+Bf(n)+"\\s*\\/\\s*"+o+"\\s*"+Bf(r)+"\\s*-->");do t.matchPattern(a)?s=!0:(Mf=t.read(rd),Mf||t.error("expected closing comment ('<!-- "+n+"/"+o+r+" -->')"),i.push(Mf));while(!s);return{t:cc,f:i,n:o}}function qe(t){var e,n,r,i,s;e=t.pos;var o=t.standardDelimiters;if(!t.matchString(o[0]))return null;if(!t.matchPattern(Gf))return t.pos=e,null;n=t.matchPattern(/^[a-zA-Z_$][a-zA-Z_$0-9\-]*/),n||t.error("expected legal partial name"),t.matchString(o[1])||t.error("Expected closing delimiter '"+o[1]+"'"),r=[];do(i=Bl(t,{open:t.standardDelimiters[0],close:t.standardDelimiters[1]}))?("partial"===!i.r&&t.error("Expected "+o[0]+"/partial"+o[1]),s=!0):(i=t.read(rd),i||t.error("Expected "+o[0]+"/partial"+o[1]),r.push(i));while(!s);return{t:cc,n:n,f:r}}function Qe(t){for(var e=[],n=_a(null),r=!1,i=t.preserveWhitespace;t.pos<t.str.length;){var s=t.pos,o=void 0,a=void 0;(a=t.read(id))?(n[a.n]&&(t.pos=s,t.error("Duplicated partial definition")),pf(a.f,t.stripComments,i,!i,!i),n[a.n]=a.f,r=!0):(o=t.read(rd))?e.push(o):t.error("Unexpected template content");

}var u={v:oa,t:e};return r&&(u.p=n),u}function Ze(t,e){return new nd(t,e||{}).result}function He(t){var e=_a(hd);return e.parse=function(e,n){return Ke(e,n||t)},e}function Ke(t,e){if(!Jf)throw new Error("Missing Ractive.parse - cannot parse template. Either preparse or use the version that includes the parser");return Jf(t,e||this.options)}function Ge(t,e){var n;if(!Xo){if(e&&e.noThrow)return;throw new Error("Cannot retrieve template #"+t+" as Ractive is not running in a browser.")}if(Ye(t)&&(t=t.substring(1)),!(n=document.getElementById(t))){if(e&&e.noThrow)return;throw new Error("Could not find template element with id #"+t)}if("SCRIPT"!==n.tagName.toUpperCase()){if(e&&e.noThrow)return;throw new Error("Template element with id #"+t+", must be a <script> element")}return"textContent"in n?n.textContent:n.innerHTML}function Ye(t){return t&&"#"===t[0]}function Je(t){return!("string"==typeof t)}function Xe(t){return t.defaults&&(t=t.defaults),ud.reduce(function(e,n){return e[n]=t[n],e},{})}function tn(t){var e,n=t._config.template;if(n&&n.fn)return e=en(t,n.fn),e!==n.result?(n.result=e,e=rn(e,t)):void 0}function en(t,e){var n=nn(cd.getParseOptions(t));return e.call(t,n)}function nn(t){var e=_a(cd);return e.parse=function(e,n){return cd.parse(e,n||t)},e}function rn(t,e){if("string"==typeof t)"#"===t[0]&&(t=cd.fromId(t)),t=Jf(t,cd.getParseOptions(e));else{if(void 0==t)throw new Error("The template cannot be "+t+".");if("number"!=typeof t.v)throw new Error("The template parser was passed a non-string template, but the template doesn't have a version.  Make sure you're passing in the template you think you are.");if(t.v!==oa)throw new Error("Mismatched template version (expected "+oa+", got "+t.v+") Please ensure you are using the latest version of Ractive.js in your build process as well as in your app")}return t}function sn(t,e,n){if(e)for(var r in e)(n||!t.hasOwnProperty(r))&&(t[r]=e[r])}function on(t,e,n){if(!/_super/.test(n))return n;var r=function(){var t,i=an(r._parent,e),s="_super"in this,o=this._super;return this._super=i,t=n.apply(this,arguments),s?this._super=o:delete this._super,t};return r._parent=t,r._method=n,r}function an(t,e){var n,r;return e in t?(n=t[e],r="function"==typeof n?n:function(){return n}):r=Ea,r}function un(t,e,n){return"options."+t+" has been deprecated in favour of options."+e+"."+(n?" You cannot specify both options, please use options."+e+".":"")}function hn(t,e,n){if(e in t){if(n in t)throw new Error(un(e,n,!0));m(un(e,n)),t[n]=t[e]}}function cn(t){hn(t,"beforeInit","onconstruct"),hn(t,"init","onrender"),hn(t,"complete","oncomplete"),hn(t,"eventDefinitions","events"),s(t.adaptors)&&hn(t,"adaptors","adapt")}function ln(t,e,n,r){xd(r);for(var i in r)if(yd.hasOwnProperty(i)){var s=r[i];"el"!==i&&"function"==typeof s?m(""+i+" is a Ractive option that does not expect a function and will be ignored","init"===t?n:null):n[i]=s}wd.forEach(function(i){i[t](e,n,r)}),Rh[t](e,n,r),fd[t](e,n,r),zh[t](e,n,r),fn(e.prototype,n,r)}function fn(t,e,n){for(var r in n)if(!gd[r]&&n.hasOwnProperty(r)){var i=n[r];"function"==typeof i&&(i=bd(t,r,i)),e[r]=i}}function dn(t){var e={};return t.forEach(function(t){return e[t]=!0}),e}function pn(){this.dirtyValue=this.dirtyArgs=!0,this.bound&&"function"==typeof this.owner.bubble&&this.owner.bubble()}function mn(){var t;return 1===this.items.length?this.items[0].detach():(t=document.createDocumentFragment(),this.items.forEach(function(e){var n=e.detach();n&&t.appendChild(n)}),t)}function vn(t){var e,n,r,i;if(this.items){for(n=this.items.length,e=0;n>e;e+=1)if(r=this.items[e],r.find&&(i=r.find(t)))return i;return null}}function gn(t,e){var n,r,i;if(this.items)for(r=this.items.length,n=0;r>n;n+=1)i=this.items[n],i.findAll&&i.findAll(t,e);return e}function yn(t,e){var n,r,i;if(this.items)for(r=this.items.length,n=0;r>n;n+=1)i=this.items[n],i.findAllComponents&&i.findAllComponents(t,e);return e}function wn(t){var e,n,r,i;if(this.items){for(e=this.items.length,n=0;e>n;n+=1)if(r=this.items[n],r.findComponent&&(i=r.findComponent(t)))return i;return null}}function bn(t){var e,n=t.index;return e=this.items[n+1]?this.items[n+1].firstNode():this.owner===this.root?this.owner.component?this.owner.component.findNextNode():null:this.owner.findNextNode(this)}function xn(){return this.items&&this.items[0]?this.items[0].firstNode():null}function kn(t,e,n,r){return r=r||0,t.map(function(t){var i,s,o;return t.text?t.text:t.fragments?t.fragments.map(function(t){return kn(t.items,e,n,r)}).join(""):(i=n+"-"+r++,o=t.keypath&&(s=t.root.viewmodel.wrapped[t.keypath.str])?s.value:t.getValue(),e[i]=o,"${"+i+"}")}).join("")}function En(){var t,e,n,r;return this.dirtyArgs&&(e=Fd(this.items,t={},this.root._guid),n=Of("["+e+"]",t),r=n?n.value:[this.toString()],this.argsList=r,this.dirtyArgs=!1),this.argsList}function _n(){var t=this;do if(t.pElement)return t.pElement.node;while(t=t.parent);return this.root.detached||this.root.el}function An(){var t,e,n,r;return this.dirtyValue&&(e=Fd(this.items,t={},this.root._guid),n=Of(e,t),r=n?n.value:this.toString(),this.value=r,this.dirtyValue=!1),this.value}function Sn(){this.registered&&this.root.viewmodel.unregister(this.keypath,this),this.resolver&&this.resolver.unbind()}function Cn(){return this.value}function On(t,e){for(var n,r=0;r<e.prop.length;r++)if(void 0!==(n=t[e.prop[r]]))return n}function Pn(t,e){var n,r,i,s,o,a={},u=!1;for(e||(a.refs=n={});t;){if((o=t.owner)&&(r=o.indexRefs)){if(e&&(i=o.getIndexRef(e)))return a.ref={fragment:t,ref:i},a;if(!e)for(s in r)i=r[s],n[i.n]||(u=!0,n[i.n]={fragment:t,ref:i})}!t.parent&&t.owner&&t.owner.component&&t.owner.component.parentFragment&&!t.owner.component.instance.isolated?(a.componentBoundary=!0,t=t.owner.component.parentFragment):t=t.parent}return u?a:void 0}function Tn(t,e,n){var r;return"@"===e.charAt(0)?new $d(t,e,n):(r=Zd(t.parentFragment,e))?new Qd(t,r,n):new Ud(t,e,n)}function Fn(t,e){var n,r;if(Yd[t])return Yd[t];for(r=[];e--;)r[e]="_"+e;return n=new Function(r.join(","),"return("+t+")"),Yd[t]=n,n}function jn(t){return t.call()}function Rn(t,e){return t.replace(/_([0-9]+)/g,function(t,n){var r,i;return+n>=e.length?"_"+n:(r=e[n],void 0===r?"undefined":r.isSpecial?(i=r.value,"number"==typeof i?i:'"'+i+'"'):r.str)})}function Nn(t){return _("${"+t.replace(/[\.\[\]]/g,"-").replace(/\*/,"#MUL#")+"}")}function Dn(t){return void 0!==t&&"@"!==t[0]}function Ln(t,e){var n,r,i;if(t.__ractive_nowrap)return t;if(r="__ractive_"+e._guid,n=t[r])return n;if(/this/.test(t.toString())){Aa(t,r,{value:Jd.call(t,e),configurable:!0});for(i in t)t.hasOwnProperty(i)&&(t[r][i]=t[i]);return e._boundFunctions.push({fn:t,prop:r}),t[r]}return Aa(t,"__ractive_nowrap",{value:t}),t.__ractive_nowrap}function In(t){return t.value}function Vn(t){return void 0!=t}function Wn(t){t.forceResolution()}function Mn(t,e){function n(e){t.resolve(e)}function r(e){var n=t.keypath;e!=n&&(t.resolve(e),void 0!==n&&t.fragments&&t.fragments.forEach(function(t){t.rebind(n,e)}))}var i,s,o;s=e.parentFragment,o=e.template,t.root=s.root,t.parentFragment=s,t.pElement=s.pElement,t.template=e.template,t.index=e.index||0,t.isStatic=e.template.s,t.type=e.template.t,t.registered=!1,(i=o.r)&&(t.resolver=Kd(t,i,n)),e.template.x&&(t.resolver=new Xd(t,s,e.template.x,r)),e.template.rx&&(t.resolver=new rp(t,e.template.rx,r)),t.template.n!==Pc||t.hasOwnProperty("value")||t.setValue(void 0)}function Un(t){var e,n,r;return t&&t.isSpecial?(this.keypath=t,void this.setValue(t.value)):(this.registered&&(this.root.viewmodel.unregister(this.keypath,this),this.registered=!1,e=!0),this.keypath=t,void 0!=t&&(n=this.root.viewmodel.get(t),this.root.viewmodel.register(t,this),this.registered=!0),this.setValue(n),void(e&&(r=this.twowayBinding)&&r.rebound()))}function zn(t,e){this.fragments&&this.fragments.forEach(function(n){return n.rebind(t,e)}),this.resolver&&this.resolver.rebind(t,e)}function Bn(){this.parentFragment.bubble()}function $n(){var t;return 1===this.fragments.length?this.fragments[0].detach():(t=document.createDocumentFragment(),this.fragments.forEach(function(e){t.appendChild(e.detach())}),t)}function qn(t){var e,n,r;for(n=this.fragments.length,e=0;n>e;e+=1)if(r=this.fragments[e].find(t))return r;return null}function Qn(t,e){var n,r;for(r=this.fragments.length,n=0;r>n;n+=1)this.fragments[n].findAll(t,e)}function Zn(t,e){var n,r;for(r=this.fragments.length,n=0;r>n;n+=1)this.fragments[n].findAllComponents(t,e)}function Hn(t){var e,n,r;for(n=this.fragments.length,e=0;n>e;e+=1)if(r=this.fragments[e].findComponent(t))return r;return null}function Kn(t){return this.fragments[t.index+1]?this.fragments[t.index+1].firstNode():this.parentFragment.findNextNode(this)}function Gn(){var t,e,n;if(t=this.fragments.length)for(e=0;t>e;e+=1)if(n=this.fragments[e].firstNode())return n;return this.parentFragment.findNextNode(this)}function Yn(t){var e,n,r,i,s,o,a,u=this;if(!this.shuffling&&!this.unbound&&this.currentSubtype===Tc){if(this.shuffling=!0,yu.scheduleTask(function(){return u.shuffling=!1}),e=this.parentFragment,s=[],t.forEach(function(t,e){var r,i,o,a,h;return t===e?void(s[t]=u.fragments[e]):(r=u.fragments[e],void 0===n&&(n=e),-1===t?(u.fragmentsToUnrender.push(r),void r.unbind()):(i=t-e,o=u.keypath.join(e),a=u.keypath.join(t),r.index=t,(h=r.registeredIndexRefs)&&h.forEach(Jn),r.rebind(o,a),void(s[t]=r)))}),i=this.root.viewmodel.get(this.keypath).length,void 0===n){if(this.length===i)return;n=this.length}for(this.length=this.fragments.length=i,this.rendered&&yu.addView(this),o={template:this.template.f,root:this.root,owner:this},r=n;i>r;r+=1)a=s[r],a||this.fragmentsToCreate.push(r),this.fragments[r]=a}}function Jn(t){t.rebind("","")}function Xn(){var t=this;return this.docFrag=document.createDocumentFragment(),this.fragments.forEach(function(e){return t.docFrag.appendChild(e.render())}),this.renderedFragments=this.fragments.slice(),this.fragmentsToRender=[],this.rendered=!0,this.docFrag}function tr(t){var e,n,r=this;this.updating||(this.updating=!0,this.keypath&&(e=this.root.viewmodel.wrapped[this.keypath.str])&&(t=e.get()),this.fragmentsToCreate.length?(n={template:this.template.f||[],root:this.root,pElement:this.pElement,owner:this},this.fragmentsToCreate.forEach(function(t){var e;n.context=r.keypath.join(t),n.index=t,e=new xw(n),r.fragmentsToRender.push(r.fragments[t]=e)}),this.fragmentsToCreate.length=0):nr(this,t)&&(this.bubble(),this.rendered&&yu.addView(this)),this.value=t,this.updating=!1)}function er(t,e,n){if(e===Tc&&t.indexRefs&&t.indexRefs[0]){var r=t.indexRefs[0];(n&&"i"===r.t||!n&&"k"===r.t)&&(n||(t.length=0,t.fragmentsToUnrender=t.fragments.slice(0),t.fragmentsToUnrender.forEach(function(t){return t.unbind()}))),r.t=n?"k":"i"}t.currentSubtype=e}function nr(t,e){var n={template:t.template.f||[],root:t.root,pElement:t.parentFragment.pElement,owner:t};if(t.hasContext=!0,t.subtype)switch(t.subtype){case Oc:return t.hasContext=!1,ar(t,e,!1,n);case Pc:return t.hasContext=!1,ar(t,e,!0,n);case Fc:return or(t,n);case jc:return sr(t,e,n);case Tc:if(h(e))return er(t,t.subtype,!0),ir(t,e,n)}return t.ordered=!!o(e),t.ordered?(er(t,Tc,!1),rr(t,e,n)):h(e)||"function"==typeof e?t.template.i?(er(t,Tc,!0),ir(t,e,n)):(er(t,Fc,!1),or(t,n)):(er(t,Oc,!1),t.hasContext=!1,ar(t,e,!1,n))}function rr(t,e,n){var r,i,s;if(i=e.length,i===t.length)return!1;if(i<t.length)t.fragmentsToUnrender=t.fragments.splice(i,t.length-i),t.fragmentsToUnrender.forEach(Z);else if(i>t.length)for(r=t.length;i>r;r+=1)n.context=t.keypath.join(r),n.index=r,s=new xw(n),t.fragmentsToRender.push(t.fragments[r]=s);return t.length=i,!0}function ir(t,e,n){var r,i,s,o,a,u;for(s=t.hasKey||(t.hasKey={}),i=t.fragments.length;i--;)o=t.fragments[i],o.key in e||(a=!0,o.unbind(),t.fragmentsToUnrender.push(o),t.fragments.splice(i,1),s[o.key]=!1);for(i=t.fragments.length;i--;)o=t.fragments[i],o.index!==i&&(o.index=i,(u=o.registeredIndexRefs)&&u.forEach(cr));i=t.fragments.length;for(r in e)s[r]||(a=!0,n.context=t.keypath.join(r),n.key=r,n.index=i++,o=new xw(n),t.fragmentsToRender.push(o),t.fragments.push(o),s[r]=!0);return t.length=t.fragments.length,a}function sr(t,e,n){return e?or(t,n):ur(t)}function or(t,e){var n;return t.length?void 0:(e.context=t.keypath,e.index=0,n=new xw(e),t.fragmentsToRender.push(t.fragments[0]=n),t.length=1,!0)}function ar(t,e,n,r){var i,s,a,u,c;if(s=o(e)&&0===e.length,a=!1,!o(e)&&h(e)){a=!0;for(c in e){a=!1;break}}return i=n?s||a||!e:e&&!s&&!a,i?t.length?t.length>1?(t.fragmentsToUnrender=t.fragments.splice(1),t.fragmentsToUnrender.forEach(Z),!0):void 0:(r.index=0,u=new xw(r),t.fragmentsToRender.push(t.fragments[0]=u),t.length=1,!0):ur(t)}function ur(t){return t.length?(t.fragmentsToUnrender=t.fragments.splice(0,t.fragments.length).filter(hr),t.fragmentsToUnrender.forEach(Z),t.length=t.fragmentsToRender.length=0,!0):void 0}function hr(t){return t.rendered}function cr(t){t.rebind("","")}function lr(t){var e,n,r;for(e="",n=0,r=this.length,n=0;r>n;n+=1)e+=this.fragments[n].toString(t);return e}function fr(){var t=this;this.fragments.forEach(Z),this.fragmentsToRender.forEach(function(e){return L(t.fragments,e)}),this.fragmentsToRender=[],Vd.call(this),this.length=0,this.unbound=!0}function dr(t){this.fragments.forEach(t?pr:mr),this.renderedFragments=[],this.rendered=!1}function pr(t){t.unrender(!0)}function mr(t){t.unrender(!1)}function vr(){var t,e,n,r,i,s,o;for(n=this.renderedFragments;t=this.fragmentsToUnrender.pop();)t.unrender(!0),n.splice(n.indexOf(t),1);for(;t=this.fragmentsToRender.shift();)t.render();for(this.rendered&&(i=this.parentFragment.getNode()),o=this.fragments.length,s=0;o>s;s+=1)t=this.fragments[s],e=n.indexOf(t,s),e!==s?(this.docFrag.appendChild(t.detach()),-1!==e&&n.splice(e,1),n.splice(s,0,t)):this.docFrag.childNodes.length&&(r=t.firstNode(),i.insertBefore(this.docFrag,r));this.rendered&&this.docFrag.childNodes.length&&(r=this.parentFragment.findNextNode(this),i.insertBefore(this.docFrag,r)),this.renderedFragments=this.fragments.slice()}function gr(){var t,e;if(this.docFrag){for(t=this.nodes.length,e=0;t>e;e+=1)this.docFrag.appendChild(this.nodes[e]);return this.docFrag}}function yr(t){var e,n,r,i;for(n=this.nodes.length,e=0;n>e;e+=1)if(r=this.nodes[e],1===r.nodeType){if(fa(r,t))return r;if(i=r.querySelector(t))return i}return null}function wr(t,e){var n,r,i,s,o,a;for(r=this.nodes.length,n=0;r>n;n+=1)if(i=this.nodes[n],1===i.nodeType&&(fa(i,t)&&e.push(i),s=i.querySelectorAll(t)))for(o=s.length,a=0;o>a;a+=1)e.push(s[a])}function br(){return this.rendered&&this.nodes[0]?this.nodes[0]:this.parentFragment.findNextNode(this)}function xr(t){return Np[t]||(Np[t]=la(t))}function kr(t){var e,n,r;t&&"select"===t.name&&t.binding&&(e=I(t.node.options).filter(Er),t.getAttribute("multiple")?r=e.map(function(t){return t.value}):(n=e[0])&&(r=n.value),void 0!==r&&t.binding.setValue(r),t.bubble())}function Er(t){return t.selected}function _r(){if(this.rendered)throw new Error("Attempted to render an item that was already rendered");return this.docFrag=document.createDocumentFragment(),this.nodes=Dp(this.value,this.parentFragment.getNode(),this.docFrag),Lp(this.pElement),this.rendered=!0,this.docFrag}function Ar(t){var e;(e=this.root.viewmodel.wrapped[this.keypath.str])&&(t=e.get()),t!==this.value&&(this.value=t,this.parentFragment.bubble(),this.rendered&&yu.addView(this))}function Sr(){return void 0!=this.value?_e(""+this.value):""}function Cr(t){this.rendered&&t&&(this.nodes.forEach(e),this.rendered=!1)}function Or(){var t,e;if(this.rendered){for(;this.nodes&&this.nodes.length;)t=this.nodes.pop(),t.parentNode.removeChild(t);e=this.parentFragment.getNode(),this.nodes=Dp(this.value,e,this.docFrag),e.insertBefore(this.docFrag,this.parentFragment.findNextNode(this)),Lp(this.pElement)}}function Pr(){var t,e=this.node;return e?((t=e.parentNode)&&t.removeChild(e),e):void 0}function Tr(){return null}function Fr(){return this.node}function jr(t){return this.attributes&&this.attributes[t]?this.attributes[t].value:void 0}function Rr(){var t=this.useProperty||!this.rendered?this.fragment.getValue():this.fragment.toString();a(t,this.value)||("id"===this.name&&this.value&&delete this.root.nodes[this.value],this.value=t,"value"===this.name&&this.node&&(this.node._ractive.value=t),this.rendered&&yu.addView(this))}function Nr(t){var e=t.fragment.items;if(1===e.length)return e[0].type===Yh?e[0]:void 0}function Dr(t){return this.type=oc,this.element=t.element,this.root=t.root,um(this,t.name),this.isBoolean=xl.test(this.name),t.value&&"string"!=typeof t.value?(this.parentFragment=this.element.parentFragment,this.fragment=new xw({template:t.value,root:this.root,owner:this}),this.value=this.fragment.getValue(),this.interpolator=hm(this),this.isBindable=!!this.interpolator&&!this.interpolator.isStatic,void(this.ready=!0)):void(this.value=this.isBoolean?!0:t.value||"")}function Lr(t,e){this.fragment&&this.fragment.rebind(t,e)}function Ir(t){var e;this.node=t,t.namespaceURI&&t.namespaceURI!==ra.html||(e=dm[this.name]||this.name,void 0!==t[e]&&(this.propertyName=e),(this.isBoolean||this.isTwoway)&&(this.useProperty=!0),"value"===e&&(t._ractive.value=this.value)),this.rendered=!0,this.update()}function Vr(){var t=this,e=t.name,n=t.namespacePrefix,r=t.value,i=t.interpolator,s=t.fragment;if(("value"!==e||"select"!==this.element.name&&"textarea"!==this.element.name)&&("value"!==e||void 0===this.element.getAttribute("contenteditable"))){if("name"===e&&"input"===this.element.name&&i)return"name={{"+(i.keypath.str||i.ref)+"}}";if(this.isBoolean)return r?e:"";if(s){if(1===s.items.length&&null==s.items[0].value)return"";r=s.toString()}return n&&(e=n+":"+e),r?e+'="'+Wr(r)+'"':e}}function Wr(t){return t.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Mr(){this.fragment&&this.fragment.unbind(),"id"===this.name&&delete this.root.nodes[this.value]}function Ur(){var t,e,n,r,i=this.value;if(!this.locked)for(this.node._ractive.value=i,t=this.node.options,r=t.length;r--;)if(e=t[r],n=e._ractive?e._ractive.value:e.value,n==i){e.selected=!0;break}}function zr(){var t,e,n,r,i=this.value;for(s(i)||(i=[i]),t=this.node.options,e=t.length;e--;)n=t[e],r=n._ractive?n._ractive.value:n.value,n.selected=j(i,r)}function Br(){var t=this,e=t.node,n=t.value;e.checked=n==e._ractive.value}function $r(){var t,e,n,r,i=this.node;if(t=i.checked,i.value=this.element.getAttribute("value"),i.checked=this.element.getAttribute("value")===this.element.getAttribute("name"),t&&!i.checked&&this.element.binding&&(n=this.element.binding.siblings,r=n.length)){for(;r--;){if(e=n[r],!e.element.node)return;if(e.element.node.checked)return yu.addRactive(e.root),e.handleChange()}this.root.viewmodel.set(e.keypath,void 0)}}function qr(){var t,e,n=this,r=n.element,i=n.node,o=n.value,a=r.binding;if(t=r.getAttribute("value"),s(o)){for(e=o.length;e--;)if(t==o[e])return void(a.isChecked=i.checked=!0);a.isChecked=i.checked=!1}else a.isChecked=i.checked=o==t}function Qr(){this.node.className=n(this.value)}function Zr(){var t=this,e=t.node,n=t.value;this.root.nodes[n]=e,e.id=n}function Hr(){var t,e;t=this.node,e=this.value,void 0===e&&(e=""),t.style.setAttribute("cssText",e)}function Kr(){var t=this.value;void 0===t&&(t=""),this.locked||(this.node.innerHTML=t)}function Gr(){var t=this,e=t.node,n=t.value;e._ractive.value=n,this.locked||(e.value=void 0==n?"":n)}function Yr(){this.locked||(this.node[this.propertyName]=this.value)}function Jr(){var t=this,e=t.node,n=t.namespace,r=t.name,i=t.value,s=t.fragment;n?e.setAttributeNS(n,r,(s||i).toString()):this.isBoolean?i?e.setAttribute(r,""):e.removeAttribute(r):null==i?e.removeAttribute(r):e.setAttribute(r,(s||i).toString())}function Xr(){var t,e,n=this,r=n.name,i=n.element,s=n.node;"id"===r?e=km:"value"===r?"select"===i.name&&"value"===r?e=i.getAttribute("multiple")?gm:vm:"textarea"===i.name?e=Am:null!=i.getAttribute("contenteditable")?e=_m:"input"===i.name&&(t=i.getAttribute("type"),e="file"===t?Ea:"radio"===t&&i.binding&&"name"===i.binding.name?wm:Am):this.isTwoway&&"name"===r?"radio"===s.type?e=ym:"checkbox"===s.type&&(e=bm):"style"===r&&s.style.setAttribute?e=Em:"class"!==r||s.namespaceURI&&s.namespaceURI!==ra.html?this.useProperty&&(e=Sm):e=xm,e||(e=Cm),this.update=e,this.update()}function ti(t,e){var n=e?"svg":"div";return Tm.innerHTML="<"+n+" "+t+"></"+n+">",I(Tm.childNodes[0].attributes)}function ei(t,e){for(var n=t.length;n--;)if(t[n].name===e.name)return!1;return!0}function ni(t){for(;t=t.parent;)if("form"===t.name)return t}function ri(){this._ractive.binding.handleChange()}function ii(){var t;Wm.call(this),t=this._ractive.root.viewmodel.get(this._ractive.binding.keypath),this.value=void 0==t?"":t}function si(){var t=this._ractive.binding,e=this;t._timeout&&clearTimeout(t._timeout),t._timeout=setTimeout(function(){t.rendered&&Wm.call(e),t._timeout=void 0},t.element.lazy)}function oi(t,e,n){var r=t+e+n;return $m[r]||($m[r]=[])}function ai(t){return t.isChecked}function ui(t){return t.element.getAttribute("value")}function hi(t){var e,n,r,i,s,o=t.attributes;return t.binding&&(t.binding.teardown(),t.binding=null),(t.getAttribute("contenteditable")||o.contenteditable&&ci(o.contenteditable))&&ci(o.value)?n=zm:"input"===t.name?(e=t.getAttribute("type"),"radio"===e||"checkbox"===e?(r=ci(o.name),i=ci(o.checked),r&&i&&m("A radio input can have two-way binding on its name attribute, or its checked attribute - not both",{ractive:t.root}),r?n="radio"===e?Hm:Gm:i&&(n="radio"===e?Qm:Jm)):"file"===e&&ci(o.value)?n=iv:ci(o.value)&&(n="number"===e||"range"===e?sv:Mm)):"select"===t.name&&ci(o.value)?n=t.getAttribute("multiple")?nv:tv:"textarea"===t.name&&ci(o.value)&&(n=Mm),n&&(s=new n(t))&&s.keypath?s:void 0}function ci(t){return t&&t.isBindable}function li(){var t=this.getAction();t&&!this.hasListener?this.listen():!t&&this.hasListener&&this.unrender()}function fi(t){$u(this.root,this.getAction(),{event:t})}function di(){return this.action.toString().trim()}function pi(t,e,n){var r,i,s,o=this;this.element=t,this.root=t.root,this.parentFragment=t.parentFragment,this.name=e,-1!==e.indexOf("*")&&(l('Only component proxy-events may contain "*" wildcards, <%s on-%s="..."/> is not valid',t.name,e),this.invalid=!0),n.m?(i=n.a.r,this.method=n.m,this.keypaths=[],this.fn=Gd(n.a.s,i.length),this.parentFragment=t.parentFragment,s=this.root,this.refResolvers=[],i.forEach(function(t,e){var n=void 0;(n=lv.exec(t))?o.keypaths[e]={eventObject:!0,refinements:n[1]?n[1].split("."):[]}:o.refResolvers.push(Kd(o,t,function(t){return o.resolve(e,t)}))}),this.fire=mi):(r=n.n||n,"string"!=typeof r&&(r=new xw({template:r,root:this.root,owner:this})),this.action=r,n.d?(this.dynamicParams=new xw({template:n.d,root:this.root,owner:this.element}),this.fire=gi):n.a&&(this.params=n.a,this.fire=vi))}function mi(t){var e,n,r;if(e=this.root,"function"!=typeof e[this.method])throw new Error('Attempted to call a non-existent method ("'+this.method+'")');n=this.keypaths.map(function(n){var r,i,s;if(void 0===n)return void 0;if(n.eventObject){if(r=t,i=n.refinements.length)for(s=0;i>s;s+=1)r=r[n.refinements[s]]}else r=e.viewmodel.get(n);return r}),Bu.enqueue(e,t),r=this.fn.apply(null,n),e[this.method].apply(e,r),Bu.dequeue(e)}function vi(t){$u(this.root,this.getAction(),{event:t,args:this.params})}function gi(t){var e=this.dynamicParams.getArgsList();"string"==typeof e&&(e=e.substr(1,e.length-2)),$u(this.root,this.getAction(),{event:t,args:e})}function yi(t){var e,n,r,i={};e=this._ractive,n=e.events[t.type],(r=Zd(n.element.parentFragment))&&(i=Zd.resolve(r)),n.fire({node:this,original:t,index:i,keypath:e.keypath.str,context:e.root.viewmodel.get(e.keypath)})}function wi(){var t,e=this.name;if(!this.invalid){if(t=g("events",this.root,e))this.custom=t(this.node,bi(e));else{if(!("on"+e in this.node||window&&"on"+e in window||ta))return void(mv[e]||v(Va(e,"event"),{node:this.node}));this.node.addEventListener(e,fv,!1)}this.hasListener=!0}}function bi(t){return pv[t]||(pv[t]=function(e){var n=e.node._ractive;e.index=n.index,e.keypath=n.keypath.str,e.context=n.root.viewmodel.get(n.keypath),n.events[t].fire(e)}),pv[t]}function xi(t,e){function n(n){n&&n.rebind(t,e)}var r;return this.method?(r=this.element.parentFragment,void this.refResolvers.forEach(n)):("string"!=typeof this.action&&n(this.action),void(this.dynamicParams&&n(this.dynamicParams)))}function ki(){this.node=this.element.node,this.node._ractive.events[this.name]=this,(this.method||this.getAction())&&this.listen()}function Ei(t,e){this.keypaths[t]=e}function _i(){return this.method?void this.refResolvers.forEach(Z):("string"!=typeof this.action&&this.action.unbind(),void(this.dynamicParams&&this.dynamicParams.unbind()))}function Ai(){this.custom?this.custom.teardown():this.node.removeEventListener(this.name,fv,!1),this.hasListener=!1}function Si(){var t=this;this.dirty||(this.dirty=!0,yu.scheduleTask(function(){Ci(t),t.dirty=!1})),this.parentFragment.bubble()}function Ci(t){var e,n,r,i,s;e=t.node,e&&(i=I(e.options),n=t.getAttribute("value"),r=t.getAttribute("multiple"),void 0!==n?(i.forEach(function(t){var e,i;e=t._ractive?t._ractive.value:t.value,i=r?Oi(n,e):n==e,i&&(s=!0),t.selected=i}),s||(i[0]&&(i[0].selected=!0),t.binding&&t.binding.forceUpdate())):t.binding&&t.binding.forceUpdate())}function Oi(t,e){for(var n=t.length;n--;)if(t[n]==e)return!0}function Pi(t,e){t.select=Fi(t.parent),t.select&&(t.select.options.push(t),e.a||(e.a={}),void 0!==e.a.value||e.a.hasOwnProperty("disabled")||(e.a.value=e.f),"selected"in e.a&&void 0!==t.select.getAttribute("value")&&delete e.a.selected)}function Ti(t){t.select&&L(t.select.options,t)}function Fi(t){if(t)do if("select"===t.name)return t;while(t=t.parent)}function ji(t){var e,n,r,i,s,o,a;this.type=nc,e=this.parentFragment=t.parentFragment,n=this.template=t.template,this.parent=t.pElement||e.pElement,this.root=r=e.root,this.index=t.index,this.key=t.key,this.name=am(n.e),"option"===this.name&&Pi(this,n),"select"===this.name&&(this.options=[],this.bubble=Si),"form"===this.name&&(this.formBindings=[]),a=sm(this,n),this.attributes=jm(this,n.a),this.conditionalAttributes=Dm(this,n.m),n.f&&(this.fragment=new xw({template:n.f,root:r,owner:this,pElement:this,cssIds:null})),o=r.twoway,a.twoway===!1?o=!1:a.twoway===!0&&(o=!0),this.twoway=o,this.lazy=a.lazy,o&&(i=ov(this,n.a))&&(this.binding=i,s=this.root._twowayBindings[i.keypath.str]||(this.root._twowayBindings[i.keypath.str]=[]),s.push(i)),n.v&&(this.eventHandlers=Ev(this,n.v)),n.o&&(this.decorator=new Ov(this,n.o)),this.intro=n.t0||n.t1,this.outro=n.t0||n.t2}function Ri(t,e){function n(n){n.rebind(t,e)}var r,i,s,o;if(this.attributes&&this.attributes.forEach(n),this.conditionalAttributes&&this.conditionalAttributes.forEach(n),this.eventHandlers&&this.eventHandlers.forEach(n),this.decorator&&n(this.decorator),this.fragment&&n(this.fragment),s=this.liveQueries)for(o=this.root,r=s.length;r--;)s[r]._makeDirty();this.node&&(i=this.node._ractive)&&k(i,"keypath",t,e)}function Ni(t){var e;(t.attributes.width||t.attributes.height)&&t.node.addEventListener("load",e=function(){var n=t.getAttribute("width"),r=t.getAttribute("height");void 0!==n&&t.node.setAttribute("width",n),void 0!==r&&t.node.setAttribute("height",r),t.node.removeEventListener("load",e,!1)},!1)}function Di(t){t.node.addEventListener("reset",Ii,!1)}function Li(t){t.node.removeEventListener("reset",Ii,!1)}function Ii(){var t=this._ractive.proxy;yu.start(),t.formBindings.forEach(Vi),yu.end()}function Vi(t){t.root.viewmodel.set(t.keypath,t.resetValue)}function Wi(t,e,n){var r,i,s;this.element=t,this.root=r=t.root,this.isIntro=n,i=e.n||e,("string"==typeof i||(s=new xw({template:i,root:r,owner:t}),i=s.toString(),s.unbind(),""!==i))&&(this.name=i,e.a?this.params=e.a:e.d&&(s=new xw({template:e.d,root:r,owner:t}),this.params=s.getArgsList(),s.unbind()),this._fn=g("transitions",r,i),this._fn||v(Va(i,"transition"),{ractive:this.root}))}function Mi(t){return t}function Ui(){ig.hidden=document[tg]}function zi(){ig.hidden=!0}function Bi(){ig.hidden=!1}function $i(){var t,e,n,r=this;return t=this.node=this.element.node,e=t.getAttribute("style"),this.complete=function(i){n||(!i&&r.isIntro&&qi(t,e),t._ractive.transition=null,r._manager.remove(r),n=!0)},this._fn?void this._fn.apply(this.root,[this].concat(this.params)):void this.complete()}function qi(t,e){e?t.setAttribute("style",e):(t.getAttribute("style"),t.removeAttribute("style"))}function Qi(){var t,e,n,r=this,i=this.root;return t=Zi(this),e=this.node=la(this.name,t),this.parentFragment.cssIds&&this.node.setAttribute("data-ractive-css",this.parentFragment.cssIds.map(function(t){return"{"+t+"}"}).join(" ")),Aa(this.node,"_ractive",{value:{proxy:this,keypath:cu(this.parentFragment),events:_a(null),root:i}}),this.attributes.forEach(function(t){return t.render(e)}),this.conditionalAttributes.forEach(function(t){return t.render(e)}),this.fragment&&("script"===this.name?(this.bubble=mg,this.node.text=this.fragment.toString(!1),this.fragment.unrender=Ea):"style"===this.name?(this.bubble=pg,this.bubble(),this.fragment.unrender=Ea):this.binding&&this.getAttribute("contenteditable")?this.fragment.unrender=Ea:this.node.appendChild(this.fragment.render())),this.binding&&(this.binding.render(),this.node._ractive.binding=this.binding),this.eventHandlers&&this.eventHandlers.forEach(function(t){return t.render()}),"option"===this.name&&Hi(this),"img"===this.name?Ni(this):"form"===this.name?Di(this):"input"===this.name||"textarea"===this.name?this.node.defaultValue=this.node.value:"option"===this.name&&(this.node.defaultSelected=this.node.selected),this.decorator&&this.decorator.fn&&yu.scheduleTask(function(){r.decorator.torndown||r.decorator.init()},!0),i.transitionsEnabled&&this.intro&&(n=new vg(this,this.intro,!0),yu.registerTransition(n),yu.scheduleTask(function(){return n.start()},!0),this.transition=n),this.node.autofocus&&yu.scheduleTask(function(){return r.node.focus()},!0),Ki(this),this.node}function Zi(t){var e,n,r;return e=(n=t.getAttribute("xmlns"))?n:"svg"===t.name?ra.svg:(r=t.parent)?"foreignObject"===r.name?ra.html:r.node.namespaceURI:t.root.el.namespaceURI}function Hi(t){var e,n,r;if(t.select&&(n=t.select.getAttribute("value"),void 0!==n))if(e=t.getAttribute("value"),t.select.node.multiple&&s(n)){for(r=n.length;r--;)if(e==n[r]){t.node.selected=!0;break}}else t.node.selected=e==n}function Ki(t){var e,n,r,i,s;e=t.root;do for(n=e._liveQueries,r=n.length;r--;)i=n[r],s=n["_"+i],s._test(t)&&(t.liveQueries||(t.liveQueries=[])).push(s);while(e=e.parent)}function Gi(t){var e,n,r;if(e=t.getAttribute("value"),void 0===e||!t.select)return!1;if(n=t.select.getAttribute("value"),n==e)return!0;if(t.select.getAttribute("multiple")&&s(n))for(r=n.length;r--;)if(n[r]==e)return!0}function Yi(t){var e,n,r,i;return e=t.attributes,n=e.type,r=e.value,i=e.name,n&&"radio"===n.value&&r&&i.interpolator&&r.value===i.interpolator.value?!0:void 0}function Ji(t){var e=t.toString();return e?" "+e:""}function Xi(){this.fragment&&this.fragment.unbind(),this.binding&&this.binding.unbind(),this.eventHandlers&&this.eventHandlers.forEach(Z),"option"===this.name&&Ti(this),this.attributes.forEach(Z),this.conditionalAttributes.forEach(Z)}function ts(t){var e,n,r;(r=this.transition)&&r.complete(),"option"===this.name?this.detach():t&&yu.detachWhenReady(this),this.fragment&&this.fragment.unrender(!1),(e=this.binding)&&(this.binding.unrender(),this.node._ractive.binding=null,n=this.root._twowayBindings[e.keypath.str],n.splice(n.indexOf(e),1)),this.eventHandlers&&this.eventHandlers.forEach(H),this.decorator&&yu.registerDecorator(this.decorator),this.root.transitionsEnabled&&this.outro&&(r=new vg(this,this.outro,!1),yu.registerTransition(r),yu.scheduleTask(function(){return r.start()})),this.liveQueries&&es(this),"form"===this.name&&Li(this)}function es(t){var e,n,r;for(r=t.liveQueries.length;r--;)e=t.liveQueries[r],n=e.selector,e._remove(t.node)}function ns(t,e){var n=_g.exec(e)[0];return null===t||n.length<t.length?n:t}function rs(t,e,n){var r;if(r=is(t,e,n||{}))return r;if(r=cd.fromId(e,{noThrow:!0})){r=Ag(r);var i=cd.parse(r,cd.getParseOptions(t));return t.partials[e]=i.t;

}}function is(t,e,n){var r=void 0,i=as(e,n.owner);if(i)return i;var s=y("partials",t,e);if(s){if(i=s.partials[e],"function"==typeof i&&(r=i.bind(s),r.isOwner=s.partials.hasOwnProperty(e),i=r.call(t,cd)),!i&&""!==i)return void m(Ia,e,"partial","partial",{ractive:t});if(!cd.isParsed(i)){var o=cd.parse(i,cd.getParseOptions(s));o.p&&m("Partials ({{>%s}}) cannot contain nested inline partials",e,{ractive:t});var a=r?s:ss(s,e);a.partials[e]=i=o.t}return r&&(i._fn=r),i.v?i.t:i}}function ss(t,e){return t.partials.hasOwnProperty(e)?t:os(t.constructor,e)}function os(t,e){return t?t.partials.hasOwnProperty(e)?t:os(t._Parent,e):void 0}function as(t,e){if(e){if(e.template&&e.template.p&&e.template.p[t])return e.template.p[t];if(e.parentFragment&&e.parentFragment.owner)return as(t,e.parentFragment.owner)}}function us(t,e){var n,r=y("components",t,e);if(r&&(n=r.components[e],!n._Parent)){var i=n.bind(r);if(i.isOwner=r.components.hasOwnProperty(e),n=i(),!n)return void m(Ia,e,"component","component",{ractive:t});"string"==typeof n&&(n=us(t,n)),n._fn=i,r.components[e]=n}return n}function hs(){var t=this.instance.fragment.detach();return Lg.fire(this.instance),t}function cs(t){return this.instance.fragment.find(t)}function ls(t,e){return this.instance.fragment.findAll(t,e)}function fs(t,e){e._test(this,!0),this.instance.fragment&&this.instance.fragment.findAllComponents(t,e)}function ds(t){return t&&t!==this.name?this.instance.fragment?this.instance.fragment.findComponent(t):null:this.instance}function ps(){return this.parentFragment.findNextNode(this)}function ms(){return this.rendered?this.instance.fragment.firstNode():null}function vs(t,e,n){function r(t){var n,r;t.value=e,t.updating||(r=t.ractive,n=t.keypath,t.updating=!0,yu.start(r),r.viewmodel.mark(n),yu.end(),t.updating=!1)}var i,s,o,a,u,h;if(i=t.obj,s=t.prop,n&&!n.configurable){if("length"===s)return;throw new Error('Cannot use magic mode with property "'+s+'" - object is not configurable')}n&&(o=n.get,a=n.set),u=o||function(){return e},h=function(t){a&&a(t),e=o?o():t,h._ractiveWrappers.forEach(r)},h._ractiveWrappers=[t],Object.defineProperty(i,s,{get:u,set:h,enumerable:!0,configurable:!0})}function gs(t,e){var n,r,i,s;if(this.adaptors)for(n=this.adaptors.length,r=0;n>r;r+=1)if(i=this.adaptors[r],i.filter(e,t,this.ractive))return s=this.wrapped[t]=i.wrap(this.ractive,e,t,ws(t)),void(s.value=e)}function ys(t,e){var n,r={};if(!e)return t;e+=".";for(n in t)t.hasOwnProperty(n)&&(r[e+n]=t[n]);return r}function ws(t){var e;return oy[t]||(e=t?t+".":"",oy[t]=function(n,r){var i;return"string"==typeof n?(i={},i[e+n]=r,i):"object"==typeof n?e?ys(n,t):n:void 0}),oy[t]}function bs(t){var e,n,r=[Ga];for(e=t.length;e--;)for(n=t[e].parent;n&&!n.isRoot;)-1===t.indexOf(n)&&F(r,n),n=n.parent;return r}function xs(t,e,n){var r;Es(t,e),n||(r=e.wildcardMatches(),r.forEach(function(n){ks(t,n,e)}))}function ks(t,e,n){var r,i,s;e=e.str||e,r=t.depsMap.patternObservers,i=r&&r[e],i&&i.forEach(function(e){s=n.join(e.lastKey),Es(t,s),ks(t,e,s)})}function Es(t,e){t.patternObservers.forEach(function(t){t.regex.test(e.str)&&t.update(e)})}function _s(){function t(t){var r=t.key;t.viewmodel===o?(o.clearCache(r.str),t.invalidate(),n.push(r),e(r)):t.viewmodel.mark(r)}function e(n){var r,i;o.noCascade.hasOwnProperty(n.str)||((i=o.deps.computed[n.str])&&i.forEach(t),(r=o.depsMap.computed[n.str])&&r.forEach(e))}var n,r,i,s=this,o=this,a={};return n=this.changes,n.length?(n.slice().forEach(e),r=ay(n),r.forEach(function(e){var r;-1===n.indexOf(e)&&(r=o.deps.computed[e.str])&&r.forEach(t)}),this.changes=[],this.patternObservers.length&&(r.forEach(function(t){return uy(s,t,!0)}),n.forEach(function(t){return uy(s,t)})),this.deps.observers&&(r.forEach(function(t){return As(s,null,t,"observers")}),Cs(this,n,"observers")),this.deps["default"]&&(i=[],r.forEach(function(t){return As(s,i,t,"default")}),i.length&&Ss(this,i,n),Cs(this,n,"default")),n.forEach(function(t){a[t.str]=s.get(t)}),this.implicitChanges={},this.noCascade={},a):void 0}function As(t,e,n,r){var i,s;(i=Os(t,n,r))&&(s=t.get(n),i.forEach(function(t){e&&t.refineValue?e.push(t):t.setValue(s)}))}function Ss(t,e,n){e.forEach(function(e){for(var r=!1,i=0,s=n.length,o=[];s>i;){var a=n[i];if(a===e.keypath){r=!0;break}a.slice(0,e.keypath.length)===e.keypath&&o.push(a),i++}r&&e.setValue(t.get(e.keypath)),o.length&&e.refineValue(o)})}function Cs(t,e,n){function r(t){t.forEach(i),t.forEach(s)}function i(e){var r=Os(t,e,n);r&&a.push({keypath:e,deps:r})}function s(e){var i;(i=t.depsMap[n][e.str])&&r(i)}function o(e){var n=t.get(e.keypath);e.deps.forEach(function(t){return t.setValue(n)})}var a=[];r(e),a.forEach(o)}function Os(t,e,n){var r=t.deps[n];return r?r[e.str]:null}function Ps(){this.captureGroups.push([])}function Ts(t,e){var n,r;if(e||(r=this.wrapped[t])&&r.teardown()!==!1&&(this.wrapped[t]=null),this.cache[t]=void 0,n=this.cacheMap[t])for(;n.length;)this.clearCache(n.pop())}function Fs(t,e){var n=e.firstKey;return!(n in t.data||n in t.computations||n in t.mappings)}function js(t,e){var n=new my(t,e);return this.ready&&n.init(this),this.computations[t.str]=n}function Rs(t,e){var n,r,i,s,o,a=this.cache,u=t.str;if(e=e||wy,e.capture&&(s=D(this.captureGroups))&&(~s.indexOf(t)||s.push(t)),ja.call(this.mappings,t.firstKey))return this.mappings[t.firstKey].get(t,e);if(t.isSpecial)return t.value;if(void 0===a[u]?((r=this.computations[u])&&!r.bypass?(n=r.get(),this.adapt(u,n)):(i=this.wrapped[u])?n=i.value:t.isRoot?(this.adapt("",this.data),n=this.data):n=Ns(this,t),a[u]=n):n=a[u],!e.noUnwrap&&(i=this.wrapped[u])&&(n=i.get()),t.isRoot&&e.fullRootGet)for(o in this.mappings)n[o]=this.mappings[o].getValue();return n===gy?void 0:n}function Ns(t,e){var n,r,i,s;return n=t.get(e.parent),(s=t.wrapped[e.parent.str])&&(n=s.get()),null!==n&&void 0!==n?((r=t.cacheMap[e.parent.str])?-1===r.indexOf(e.str)&&r.push(e.str):t.cacheMap[e.parent.str]=[e.str],"object"!=typeof n||e.lastKey in n?(i=n[e.lastKey],t.adapt(e.str,i,!1),t.cache[e.str]=i,i):t.cache[e.str]=gy):void 0}function Ds(){var t;for(t in this.computations)this.computations[t].init(this)}function Ls(t,e){var n=this.mappings[t.str]=new ky(t,e);return n.initViewmodel(this),n}function Is(t,e){var n,r=t.str;e&&(e.implicit&&(this.implicitChanges[r]=!0),e.noCascade&&(this.noCascade[r]=!0)),(n=this.computations[r])&&n.invalidate(),-1===this.changes.indexOf(t)&&this.changes.push(t);var i=e?e.keepExistingWrapper:!1;this.clearCache(r,i),this.ready&&this.onchange()}function Vs(t,e,n,r){var i,s,o,a;if(this.mark(t),r&&r.compare){o=Ms(r.compare);try{i=e.map(o),s=n.map(o)}catch(u){m('merge(): "%s" comparison failed. Falling back to identity checking',t),i=e,s=n}}else i=e,s=n;a=_y(i,s),this.smartUpdate(t,n,a,e.length!==n.length)}function Ws(t){return JSON.stringify(t)}function Ms(t){if(t===!0)return Ws;if("string"==typeof t)return Sy[t]||(Sy[t]=function(e){return e[t]}),Sy[t];if("function"==typeof t)return t;throw new Error("The `compare` option must be a function, or a string representing an identifying field (or `true` to use JSON.stringify)")}function Us(t,e){var n,r,i,s=void 0===arguments[2]?"default":arguments[2];e.isStatic||((n=this.mappings[t.firstKey])?n.register(t,e,s):(r=this.deps[s]||(this.deps[s]={}),i=r[t.str]||(r[t.str]=[]),i.push(e),this.depsMap[s]||(this.depsMap[s]={}),t.isRoot||zs(this,t,s)))}function zs(t,e,n){for(var r,i,s;!e.isRoot;)r=t.depsMap[n],i=r[e.parent.str]||(r[e.parent.str]=[]),s=e.str,void 0===i["_"+s]&&(i["_"+s]=0,i.push(e)),i["_"+s]+=1,e=e.parent}function Bs(){return this.captureGroups.pop()}function $s(t){this.data=t,this.clearCache("")}function qs(t,e){var n,r,i,s,o=void 0===arguments[2]?{}:arguments[2];if(!o.noMapping&&(n=this.mappings[t.firstKey]))return n.set(t,e);if(r=this.computations[t.str]){if(r.setting)return;r.set(e),e=r.get()}a(this.cache[t.str],e)||(i=this.wrapped[t.str],i&&i.reset&&(s=i.reset(e)!==!1,s&&(e=i.get())),r||s||Qs(this,t,e),o.silent?this.clearCache(t.str):this.mark(t))}function Qs(t,e,n){var r,i,s,o;s=function(){r.set?r.set(e.lastKey,n):(i=r.get(),o())},o=function(){i||(i=ty(e.lastKey),t.set(e.parent,i,{silent:!0})),i[e.lastKey]=n},r=t.wrapped[e.parent.str],r?s():(i=t.get(e.parent),(r=t.wrapped[e.parent.str])?s():o())}function Zs(t,e,n){var r,i,s,o=this;if(i=n.length,n.forEach(function(e,n){-1===e&&o.mark(t.join(n),Ry)}),this.set(t,e,{silent:!0}),(r=this.deps["default"][t.str])&&r.filter(Hs).forEach(function(t){return t.shuffle(n,e)}),i!==e.length){for(this.mark(t.join("length"),jy),s=n.touchedFrom;s<e.length;s+=1)this.mark(t.join(s));for(s=e.length;i>s;s+=1)this.mark(t.join(s),Ry)}}function Hs(t){return"function"==typeof t.shuffle}function Ks(){var t,e=this;for(Object.keys(this.cache).forEach(function(t){return e.clearCache(t)});t=this.unresolvedImplicitDependencies.pop();)t.teardown()}function Gs(t,e){var n,r,i,s=void 0===arguments[2]?"default":arguments[2];if(!e.isStatic){if(n=this.mappings[t.firstKey])return n.unregister(t,e,s);if(r=this.deps[s][t.str],i=r.indexOf(e),-1===i)throw new Error("Attempted to remove a dependant that was no longer registered! This should not happen. If you are seeing this bug in development please raise an issue at https://github.com/RactiveJS/Ractive/issues - thanks");r.splice(i,1),t.isRoot||Ys(this,t,s)}}function Ys(t,e,n){for(var r,i;!e.isRoot;)r=t.depsMap[n],i=r[e.parent.str],i["_"+e.str]-=1,i["_"+e.str]||(L(i,e),i["_"+e.str]=void 0),e=e.parent}function Js(t){this.hook=new su(t),this.inProcess={},this.queue={}}function Xs(t,e){return t[e._guid]||(t[e._guid]=[])}function to(t,e){var n=Xs(t.queue,e);for(t.hook.fire(e);n.length;)to(t,n.shift());delete t.queue[e._guid]}function eo(t,e){var n,r={};for(n in e)r[n]=no(t,n,e[n]);return r}function no(t,e,n){var r,i;return"function"==typeof n&&(r=io(n,t)),"string"==typeof n&&(r=ro(t,n)),"object"==typeof n&&("string"==typeof n.get?r=ro(t,n.get):"function"==typeof n.get?r=io(n.get,t):l("`%s` computation must have a `get()` method",e),"function"==typeof n.set&&(i=io(n.set,t))),{getter:r,setter:i}}function ro(t,e){var n,r,i;return n="return ("+e.replace(My,function(t,e){return r=!0,'__ractive.get("'+e+'")'})+");",r&&(n="var __ractive = this; "+n),i=new Function(n),r?i.bind(t):i}function io(t,e){return/this/.test(t.toString())?t.bind(e):t}function so(e){var n,i,s=void 0===arguments[1]?{}:arguments[1],o=void 0===arguments[2]?{}:arguments[2];if(Kw.DEBUG&&Fa(),uo(e,o),Aa(e,"data",{get:ho}),Uy.fire(e,s),qy.forEach(function(t){e[t]=r(_a(e.constructor[t]||null),s[t])}),i=new Iy({adapt:oo(e,e.adapt,s),data:$h.init(e.constructor,e,s),computed:Wy(e,r(_a(e.constructor.prototype.computed),s.computed)),mappings:o.mappings,ractive:e,onchange:function(){return yu.addRactive(e)}}),e.viewmodel=i,i.init(),kd.init(e.constructor,e,s),zy.fire(e),By.begin(e),e.template){var a=void 0;(o.cssIds||e.cssId)&&(a=o.cssIds?o.cssIds.slice():[],e.cssId&&a.push(e.cssId)),e.fragment=new xw({template:e.template,root:e,owner:e,cssIds:a})}if(By.end(e),n=t(e.el)){var u=e.render(n,e.append);Kw.DEBUG_PROMISES&&u["catch"](function(t){throw v("Promise debugging is enabled, to help solve errors that happen asynchronously. Some browsers will log unhandled promise rejections, in which case you can safely disable promise debugging:\n  Ractive.DEBUG_PROMISES = false;"),m("An error happened during rendering",{ractive:e}),t.stack&&f(t.stack),t})}}function oo(t,e,n){function r(e){return"string"==typeof e&&(e=g("adaptors",t,e),e||l(Va(e,"adaptor"))),e}var i,s,o;if(e=e.map(r),i=N(n.adapt).map(r),i=ao(e,i),s="magic"in n?n.magic:t.magic,o="modifyArrays"in n?n.modifyArrays:t.modifyArrays,s){if(!na)throw new Error("Getters and setters (magic mode) are not supported in this browser");o&&i.push(iy),i.push(ry)}return o&&i.push(Jg),i}function ao(t,e){for(var n=t.slice(),r=e.length;r--;)~n.indexOf(e[r])||n.push(e[r]);return n}function uo(t,e){t._guid="r-"+$y++,t._subs=_a(null),t._config={},t._twowayBindings=_a(null),t._animations=[],t.nodes={},t._liveQueries=[],t._liveComponentQueries=[],t._boundFunctions=[],t._observers=[],e.component?(t.parent=e.parent,t.container=e.container||null,t.root=t.parent.root,t.component=e.component,e.component.instance=t,t._inlinePartials=e.inlinePartials):(t.root=t,t.parent=t.container=null)}function ho(){throw new Error("Using `ractive.data` is no longer supported - you must use the `ractive.get()` API instead")}function co(t,e,n){this.parentFragment=t.parentFragment,this.callback=n,this.fragment=new xw({template:e,root:t.root,owner:this}),this.update()}function lo(t,e,n){var r;return e.r?r=Kd(t,e.r,n):e.x?r=new Xd(t,t.parentFragment,e.x,n):e.rx&&(r=new rp(t,e.rx,n)),r}function fo(t){return 1===t.length&&t[0].t===Yh}function po(t,e){var n;for(n in e)e.hasOwnProperty(n)&&mo(t.instance,t.root,n,e[n])}function mo(t,e,n,r){"string"!=typeof r&&l("Components currently only support simple events - you cannot include arguments. Sorry!"),t.on(n,function(){var t,n;return arguments.length&&arguments[0]&&arguments[0].node&&(t=Array.prototype.shift.call(arguments)),n=Array.prototype.slice.call(arguments),$u(e,r,{event:t,args:n}),!1})}function vo(t,e){var n,r;if(!e)throw new Error('Component "'+this.name+'" not found');n=this.parentFragment=t.parentFragment,r=n.root,this.root=r,this.type=uc,this.name=t.template.e,this.index=t.index,this.indexRefBindings={},this.yielders={},this.resolvers=[],Hy(this,e,t.template.a,t.template.f,t.template.p),Ky(this,t.template.v),(t.template.t0||t.template.t1||t.template.t2||t.template.o)&&m('The "intro", "outro" and "decorator" directives have no effect on components',{ractive:this.instance}),Gy(this)}function go(t,e){function n(n){n.rebind(t,e)}var r;this.resolvers.forEach(n);for(var i in this.yielders)this.yielders[i][0]&&n(this.yielders[i][0]);(r=this.root._liveComponentQueries["_"+this.name])&&r._makeDirty()}function yo(){var t=this.instance;return t.render(this.parentFragment.getNode()),this.rendered=!0,t.fragment.detach()}function wo(){return this.instance.fragment.toString()}function bo(){var t=this.instance;this.resolvers.forEach(Z),xo(this),t._observers.forEach(K),t.fragment.unbind(),t.viewmodel.teardown(),t.fragment.rendered&&t.el.__ractive_instances__&&L(t.el.__ractive_instances__,t),nw.fire(t)}function xo(t){var e,n;e=t.root;do(n=e._liveComponentQueries["_"+t.name])&&n._remove(t);while(e=e.parent)}function ko(t){this.shouldDestroy=t,this.instance.unrender()}function Eo(t){var e=this;this.owner=t.owner,this.parent=this.owner.parentFragment,this.root=t.root,this.pElement=t.pElement,this.context=t.context,this.index=t.index,this.key=t.key,this.registeredIndexRefs=[],this.cssIds="cssIds"in t?t.cssIds:this.parent?this.parent.cssIds:null,this.items=t.template.map(function(n,r){return _o({parentFragment:e,pElement:t.pElement,template:n,index:r})}),this.value=this.argsList=null,this.dirtyArgs=this.dirtyValue=!0,this.bound=!0}function _o(t){if("string"==typeof t.template)return new Id(t);switch(t.template.t){case hc:return new hw(t);case Yh:return new hp(t);case Xh:return new Pp(t);case Jh:return new Zp(t);case nc:var e=void 0;return(e=Ng(t.parentFragment.root,t.template.e))?new sw(t,e):new kg(t);case rc:return new Rg(t);case ic:return new aw(t);case lc:return new lw(t);default:throw new Error("Something very strange happened. Please file an issue at https://github.com/ractivejs/ractive/issues. Thanks!")}}function Ao(t,e){(!this.owner||this.owner.hasContext)&&k(this,"context",t,e),this.items.forEach(function(n){n.rebind&&n.rebind(t,e)})}function So(){var t;return 1===this.items.length?t=this.items[0].render():(t=document.createDocumentFragment(),this.items.forEach(function(e){t.appendChild(e.render())})),this.rendered=!0,t}function Co(t){return this.items?this.items.map(t?Po:Oo).join(""):""}function Oo(t){return t.toString()}function Po(t){return t.toString(!0)}function To(){this.bound&&(this.items.forEach(Fo),this.bound=!1)}function Fo(t){t.unbind&&t.unbind()}function jo(t){if(!this.rendered)throw new Error("Attempted to unrender a fragment that was not rendered");this.items.forEach(function(e){return e.unrender(t)}),this.rendered=!1}function Ro(t){var e,n,r,i,s;if(t=t||{},"object"!=typeof t)throw new Error("The reset method takes either no arguments, or an object containing new data");for((n=this.viewmodel.wrapped[""])&&n.reset?n.reset(t)===!1&&this.viewmodel.reset(t):this.viewmodel.reset(t),r=kd.reset(this),i=r.length;i--;)if(Ew.indexOf(r[i])>-1){s=!0;break}if(s){var o=void 0;this.viewmodel.mark(Ga),(o=this.component)&&(o.shouldDestroy=!0),this.unrender(),o&&(o.shouldDestroy=!1),this.fragment.template!==this.template&&(this.fragment.unbind(),this.fragment=new xw({template:this.template,root:this,owner:this})),e=this.render(this.el,this.anchor)}else e=yu.start(this,!0),this.viewmodel.mark(Ga),yu.end();return _w.fire(this,t),e}function No(t){var e,n;fd.init(null,this,{template:t}),e=this.transitionsEnabled,this.transitionsEnabled=!1,(n=this.component)&&(n.shouldDestroy=!0),this.unrender(),n&&(n.shouldDestroy=!1),this.fragment.unbind(),this.fragment=new xw({template:this.template,root:this,owner:this}),this.render(this.el,this.anchor),this.transitionsEnabled=e}function Do(t,e){var n,r;if(r=yu.start(this,!0),h(t)){n=t;for(t in n)n.hasOwnProperty(t)&&(e=n[t],Lo(this,t,e))}else Lo(this,t,e);return yu.end(),r}function Lo(t,e,n){e=_(C(e)),e.isPattern?A(t,e).forEach(function(e){t.viewmodel.set(e,n)}):t.viewmodel.set(e,n)}function Io(t,e){return Ya(this,t,void 0===e?-1:-e)}function Vo(){var t;return this.fragment.unbind(),this.viewmodel.teardown(),this._observers.forEach(K),this.fragment.rendered&&this.el.__ractive_instances__&&L(this.el.__ractive_instances__,this),this.shouldDestroy=!0,t=this.fragment.rendered?this.unrender():hu.resolve(),Nw.fire(this),this._boundFunctions.forEach(Wo),t}function Wo(t){delete t.fn[t.prop]}function Mo(t){var e=this;if("string"!=typeof t)throw new TypeError(La);var n=void 0;return/\*/.test(t)?(n={},A(this,_(C(t))).forEach(function(t){n[t.str]=!e.viewmodel.get(t)}),this.set(n)):this.set(t,!this.get(t))}function Uo(){return this.fragment.toString(!0)}function zo(){var t,e;if(!this.fragment.rendered)return m("ractive.unrender() was called on a Ractive instance that was not rendered"),hu.resolve();for(t=yu.start(this,!0),e=!this.component||this.component.shouldDestroy||this.shouldDestroy;this._animations[0];)this._animations[0].stop();return this.fragment.unrender(e),L(this.el.__ractive_instances__,this),Vw.fire(this),yu.end(),t}function Bo(t){var e;return t=_(t)||Ga,e=yu.start(this,!0),this.viewmodel.mark(t),yu.end(),Uw.fire(this,t),e}function $o(t,e){var n,r,i;if("string"!=typeof t||e){i=[];for(r in this._twowayBindings)(!t||_(r).equalsOrStartsWith(t))&&i.push.apply(i,this._twowayBindings[r])}else i=this._twowayBindings[t];return n=qo(this,i),this.set(n)}function qo(t,e){var n={},r=[];return e.forEach(function(t){var e,i;if(!t.radioName||t.element.node.checked){if(t.checkboxName)return void(r[t.keypath.str]||t.changed()||(r.push(t.keypath),r[t.keypath.str]=t));e=t.attribute.value,i=t.getValue(),R(e,i)||a(e,i)||(n[t.keypath.str]=i)}}),r.length&&r.forEach(function(t){var e,i,s;e=r[t.str],i=e.attribute.value,s=e.getValue(),R(i,s)||(n[t.str]=s)}),n}function Qo(t,e){return"function"==typeof e&&/_super/.test(t)}function Zo(t){for(var e={};t;)Ho(t,e),Go(t,e),t=t._Parent!==Kw?t._Parent:!1;return e}function Ho(t,e){wd.forEach(function(n){Ko(n.useDefaults?t.prototype:t,e,n.name)})}function Ko(t,e,n){var r,i=Object.keys(t[n]);i.length&&((r=e[n])||(r=e[n]={}),i.filter(function(t){return!(t in r)}).forEach(function(e){return r[e]=t[n][e]}))}function Go(t,e){Object.keys(t.prototype).forEach(function(n){if("computed"!==n){var r=t.prototype[n];if(n in e){if("function"==typeof e[n]&&"function"==typeof r&&e[n]._method){var i=void 0,s=r._method;s&&(r=r._method),i=$w(e[n]._method,r),s&&(i._method=i),e[n]=i}}else e[n]=r._method?r._method:r}})}function Yo(){for(var t=arguments.length,e=Array(t),n=0;t>n;n++)e[n]=arguments[n];return e.length?e.reduce(Jo,this):Jo(this)}function Jo(t){var e,n,i=void 0===arguments[1]?{}:arguments[1];return i.prototype instanceof Kw&&(i=qw(i)),e=function(t){return this instanceof e?void Qy(this,t):new e(t)},n=_a(t.prototype),n.constructor=e,Sa(e,{defaults:{value:n},extend:{value:Yo,writable:!0,configurable:!0},_Parent:{value:t}}),kd.extend(t,n,i),$h.extend(t,n,i),i.computed&&(n.computed=r(_a(t.prototype.computed),i.computed)),e.prototype=n,e}var Xo,ta,ea,na,ra,ia,sa,oa=3,aa={el:void 0,append:!1,template:{v:oa,t:[]},preserveWhitespace:!1,sanitize:!1,stripComments:!0,delimiters:["{{","}}"],tripleDelimiters:["{{{","}}}"],interpolate:!1,data:{},computed:{},magic:!1,modifyArrays:!0,adapt:[],isolated:!1,twoway:!0,lazy:!1,noIntro:!1,transitionsEnabled:!0,complete:void 0,css:null,noCssTransform:!1},ua=aa,ha={linear:function(t){return t},easeIn:function(t){return Math.pow(t,3)},easeOut:function(t){return Math.pow(t-1,3)+1},easeInOut:function(t){return(t/=.5)<1?.5*Math.pow(t,3):.5*(Math.pow(t-2,3)+2)}};Xo="object"==typeof document,ta="undefined"!=typeof navigator&&/jsDom/.test(navigator.appName),ea="undefined"!=typeof console&&"function"==typeof console.warn&&"function"==typeof console.warn.apply;try{Object.defineProperty({},"test",{value:0}),na=!0}catch(ca){na=!1}ra={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},ia="undefined"==typeof document?!1:document&&document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"),sa=["o","ms","moz","webkit"];var la,fa,da,pa,ma,va,ga,ya,wa;if(la=ia?function(t,e){return e&&e!==ra.html?document.createElementNS(e,t):document.createElement(t)}:function(t,e){if(e&&e!==ra.html)throw"This browser does not support namespaces other than http://www.w3.org/1999/xhtml. The most likely cause of this error is that you're trying to render SVG in an older browser. See http://docs.ractivejs.org/latest/svg-and-older-browsers for more information";return document.createElement(t)},Xo){for(da=la("div"),pa=["matches","matchesSelector"],wa=function(t){return function(e,n){return e[t](n)}},ga=pa.length;ga--&&!fa;)if(ma=pa[ga],da[ma])fa=wa(ma);else for(ya=sa.length;ya--;)if(va=sa[ga]+ma.substr(0,1).toUpperCase()+ma.substring(1),da[va]){fa=wa(va);break}fa||(fa=function(t,e){var n,r,i;for(r=t.parentNode,r||(da.innerHTML="",r=da,t=t.cloneNode(),da.appendChild(t)),n=r.querySelectorAll(e),i=n.length;i--;)if(n[i]===t)return!0;return!1})}else fa=null;var ba,xa,ka,Ea=function(){};"undefined"==typeof window?ka=null:(ba=window,xa=ba.document,ka={},xa||(ka=null),Date.now||(Date.now=function(){return+new Date}),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+/,"").replace(/\s+$/,"")}),Object.keys||(Object.keys=function(){var t=Object.prototype.hasOwnProperty,e=!{toString:null}.propertyIsEnumerable("toString"),n=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],r=n.length;return function(i){if("object"!=typeof i&&"function"!=typeof i||null===i)throw new TypeError("Object.keys called on non-object");var s=[];for(var o in i)t.call(i,o)&&s.push(o);if(e)for(var a=0;r>a;a++)t.call(i,n[a])&&s.push(n[a]);return s}}()),Array.prototype.indexOf||(Array.prototype.indexOf=function(t,e){var n;for(void 0===e&&(e=0),0>e&&(e+=this.length),0>e&&(e=0),n=this.length;n>e;e++)if(this.hasOwnProperty(e)&&this[e]===t)return e;return-1}),Array.prototype.forEach||(Array.prototype.forEach=function(t,e){var n,r;for(n=0,r=this.length;r>n;n+=1)this.hasOwnProperty(n)&&t.call(e,this[n],n,this)}),Array.prototype.map||(Array.prototype.map=function(t,e){var n,r,i,s=this,o=[];for(s instanceof String&&(s=s.toString(),i=!0),n=0,r=s.length;r>n;n+=1)(s.hasOwnProperty(n)||i)&&(o[n]=t.call(e,s[n],n,s));return o}),"function"!=typeof Array.prototype.reduce&&(Array.prototype.reduce=function(t,e){var n,r,i,s;if("function"!=typeof t)throw new TypeError(t+" is not a function");for(i=this.length,s=!1,arguments.length>1&&(r=e,s=!0),n=0;i>n;n+=1)this.hasOwnProperty(n)?s&&(r=t(r,this[n],n,this)):(r=this[n],s=!0);if(!s)throw new TypeError("Reduce of empty array with no initial value");return r}),Array.prototype.filter||(Array.prototype.filter=function(t,e){var n,r,i=[];for(n=0,r=this.length;r>n;n+=1)this.hasOwnProperty(n)&&t.call(e,this[n],n,this)&&(i[i.length]=this[n]);return i}),Array.prototype.every||(Array.prototype.every=function(t,e){var n,r,i;if(null==this)throw new TypeError;if(n=Object(this),r=n.length>>>0,"function"!=typeof t)throw new TypeError;for(i=0;r>i;i+=1)if(i in n&&!t.call(e,n[i],i,n))return!1;return!0}),"function"!=typeof Function.prototype.bind&&(Function.prototype.bind=function(t){var e,n,r,i,s=[].slice;if("function"!=typeof this)throw new TypeError("Function.prototype.bind called on non-function");return e=s.call(arguments,1),n=this,r=function(){},i=function(){var i=this instanceof r&&t?this:t;return n.apply(i,e.concat(s.call(arguments)))},r.prototype=this.prototype,i.prototype=new r,i}),ba.addEventListener||!function(t,e){var n,r,i,s,o,a;t.appearsToBeIELessEqual8=!0,n=function(t,e){var n,r=this;for(n in t)r[n]=t[n];r.currentTarget=e,r.target=t.srcElement||e,r.timeStamp=+new Date,r.preventDefault=function(){t.returnValue=!1},r.stopPropagation=function(){t.cancelBubble=!0}},r=function(t,e){var r,i,s=this;r=s.listeners||(s.listeners=[]),i=r.length,r[i]=[e,function(t){e.call(s,new n(t,s))}],s.attachEvent("on"+t,r[i][1])},i=function(t,e){var n,r,i=this;if(i.listeners)for(n=i.listeners,r=n.length;r--;)n[r][0]===e&&i.detachEvent("on"+t,n[r][1])},t.addEventListener=e.addEventListener=r,t.removeEventListener=e.removeEventListener=i,"Element"in t?(t.Element.prototype.addEventListener=r,t.Element.prototype.removeEventListener=i):(a=e.createElement,e.createElement=function(t){var e=a(t);return e.addEventListener=r,e.removeEventListener=i,e},s=e.getElementsByTagName("head")[0],o=e.createElement("style"),s.insertBefore(o,s.firstChild))}(ba,xa),ba.getComputedStyle||(ka.getComputedStyle=function(){function t(n,r,i,s){var o,a=r[i],u=parseFloat(a),h=a.split(/\d/)[0];return isNaN(u)&&/^thin|medium|thick$/.test(a)&&(u=e(a),h=""),s=null!=s?s:/%|em/.test(h)&&n.parentElement?t(n.parentElement,n.parentElement.currentStyle,"fontSize",null):16,o="fontSize"==i?s:/width/i.test(i)?n.clientWidth:n.clientHeight,"em"==h?u*s:"in"==h?96*u:"pt"==h?96*u/72:"%"==h?u/100*o:u}function e(t){var e,n;return s[t]||(e=document.createElement("div"),e.style.display="block",e.style.position="fixed",e.style.width=e.style.height="0",e.style.borderRight=t+" solid black",document.getElementsByTagName("body")[0].appendChild(e),n=e.getBoundingClientRect(),s[t]=n.right-n.left),s[t]}function n(t,e){var n="border"==e?"Width":"",r=e+"Top"+n,i=e+"Right"+n,s=e+"Bottom"+n,o=e+"Left"+n;t[e]=(t[r]==t[i]==t[s]==t[o]?[t[r]]:t[r]==t[s]&&t[o]==t[i]?[t[r],t[i]]:t[o]==t[i]?[t[r],t[i],t[s]]:[t[r],t[i],t[s],t[o]]).join(" ")}function r(e){var r,i,s,a;r=e.currentStyle,i=this,s=t(e,r,"fontSize",null);for(a in r)"normal"===r[a]&&o.hasOwnProperty(a)?i[a]=o[a]:/width|height|margin.|padding.|border.+W/.test(a)?"auto"===r[a]?/^width|height/.test(a)?i[a]=("width"===a?e.clientWidth:e.clientHeight)+"px":/(?:padding)?Top|Bottom$/.test(a)&&(i[a]="0px"):i[a]=t(e,r,a,s)+"px":"styleFloat"===a?i["float"]=r[a]:i[a]=r[a];return n(i,"margin"),n(i,"padding"),n(i,"border"),i.fontSize=s+"px",i}function i(t){return new r(t)}var s={},o={fontWeight:400,lineHeight:1.2,letterSpacing:0};return r.prototype={constructor:r,getPropertyPriority:Ea,getPropertyValue:function(t){return this[t]||""},item:Ea,removeProperty:Ea,setProperty:Ea,getPropertyCSSValue:Ea},i}()));var _a,Aa,Sa,Ca=ka;try{Object.defineProperty({},"test",{value:0}),Xo&&Object.defineProperty(document.createElement("div"),"test",{value:0}),Aa=Object.defineProperty}catch(Oa){Aa=function(t,e,n){t[e]=n.value}}try{try{Object.defineProperties({},{test:{value:0}})}catch(Oa){throw Oa}Xo&&Object.defineProperties(la("div"),{test:{value:0}}),Sa=Object.defineProperties}catch(Oa){Sa=function(t,e){var n;for(n in e)e.hasOwnProperty(n)&&Aa(t,n,e[n])}}try{Object.create(null),_a=Object.create}catch(Oa){_a=function(){var t=function(){};return function(e,n){var r;return null===e?{}:(t.prototype=e,r=new t,n&&Object.defineProperties(r,n),r)}}()}var Pa,Ta,Fa,ja=Object.prototype.hasOwnProperty,Ra=Object.prototype.toString,Na=/^\[object (?:Array|FileList)\]$/,Da={};ea?!function(){var t=["%cRactive.js %c0.7.3 %cin debug mode, %cmore...","color: rgb(114, 157, 52); font-weight: normal;","color: rgb(85, 85, 85); font-weight: normal;","color: rgb(85, 85, 85); font-weight: normal;","color: rgb(82, 140, 224); font-weight: normal; text-decoration: underline;"],e="You're running Ractive 0.7.3 in debug mode - messages will be printed to the console to help you fix problems and optimise your application.\n\nTo disable debug mode, add this line at the start of your app:\n  Ractive.DEBUG = false;\n\nTo disable debug mode when your app is minified, add this snippet:\n  Ractive.DEBUG = /unminified/.test(function(){/*unminified*/});\n\nGet help and support:\n  http://docs.ractivejs.org\n  http://stackoverflow.com/questions/tagged/ractivejs\n  http://groups.google.com/forum/#!forum/ractive-js\n  http://twitter.com/ractivejs\n\nFound a bug? Raise an issue:\n  https://github.com/ractivejs/ractive/issues\n\n";Fa=function(){var n=!!console.groupCollapsed;console[n?"groupCollapsed":"log"].apply(console,t),console.log(e),n&&console.groupEnd(t),Fa=Ea},Ta=function(t,e){if(Fa(),"object"==typeof e[e.length-1]){var n=e.pop(),r=n?n.ractive:null;if(r){var i=void 0;r.component&&(i=r.component.name)&&(t="<"+i+"> "+t);var s=void 0;(s=n.node||r.fragment&&r.fragment.rendered&&r.find("*"))&&e.push(s)}}console.warn.apply(console,["%cRactive.js: %c"+t,"color: rgb(114, 157, 52);","color: rgb(85, 85, 85);"].concat(e))},Pa=function(){console.log.apply(console,arguments)}}():Ta=Pa=Fa=Ea;var La="Bad arguments",Ia='A function was specified for "%s" %s, but no %s was returned',Va=function(t,e){return'Missing "'+t+'" '+e+" plugin. You may need to download a plugin via http://docs.ractivejs.org/latest/plugins#"+e+"s"},Wa=function(t,e,n,r){if(t===e)return w(e);if(r){var i=g("interpolators",n,r);if(i)return i(t,e)||w(e);l(Va(r,"interpolator"))}return za.number(t,e)||za.array(t,e)||za.object(t,e)||w(e)},Ma=Wa,Ua={number:function(t,e){var n;return u(t)&&u(e)?(t=+t,e=+e,n=e-t,n?function(e){return t+e*n}:function(){return t}):null},array:function(t,e){var n,r,i,o;if(!s(t)||!s(e))return null;for(n=[],r=[],o=i=Math.min(t.length,e.length);o--;)r[o]=Ma(t[o],e[o]);for(o=i;o<t.length;o+=1)n[o]=t[o];for(o=i;o<e.length;o+=1)n[o]=e[o];return function(t){for(var e=i;e--;)n[e]=r[e](t);return n}},object:function(t,e){var n,r,i,s,o;if(!h(t)||!h(e))return null;n=[],s={},i={};for(o in t)ja.call(t,o)&&(ja.call(e,o)?(n.push(o),i[o]=Ma(t[o],e[o])):s[o]=t[o]);for(o in e)ja.call(e,o)&&!ja.call(t,o)&&(s[o]=e[o]);return r=n.length,function(t){for(var e,o=r;o--;)e=n[o],s[e]=i[e](t);return s}}},za=Ua,Ba=b,$a={},qa=/\[\s*(\*|[0-9]|[1-9][0-9]+)\s*\]/g,Qa=/\*/,Za={},Ha=function(t){var e=t.split(".");this.str=t,"@"===t[0]&&(this.isSpecial=!0,this.value=E(t)),this.firstKey=e[0],this.lastKey=e.pop(),this.isPattern=Qa.test(t),this.parent=""===t?null:_(e.join(".")),this.isRoot=!t};Ha.prototype={equalsOrStartsWith:function(t){return t===this||this.startsWith(t)},join:function(t){return _(this.isRoot?String(t):this.str+"."+t)},replace:function(t,e){return this===t?e:this.startsWith(t)?null===e?e:_(this.str.replace(t.str+".",e.str+".")):void 0},startsWith:function(t){return t?t&&this.str.substr(0,t.str.length+1)===t.str+".":!1},toString:function(){throw new Error("Bad coercion")},valueOf:function(){throw new Error("Bad coercion")},wildcardMatches:function(){return this._wildcardMatches||(this._wildcardMatches=Ba(this.str))}};var Ka,Ga=_(""),Ya=O,Ja="Cannot add to a non-numeric value",Xa=P;"undefined"==typeof window?Ka=null:(!function(t,e,n){var r,i;

if(!n.requestAnimationFrame){for(r=0;r<t.length&&!n.requestAnimationFrame;++r)n.requestAnimationFrame=n[t[r]+"RequestAnimationFrame"];n.requestAnimationFrame||(i=n.setTimeout,n.requestAnimationFrame=function(t){var n,r,s;return n=Date.now(),r=Math.max(0,16-(n-e)),s=i(function(){t(n+r)},r),e=n+r,s})}}(sa,0,window),Ka=window.requestAnimationFrame);var tu,eu=Ka;tu="undefined"!=typeof window&&window.performance&&"function"==typeof window.performance.now?function(){return window.performance.now()}:function(){return Date.now()};var nu=tu,ru={construct:{deprecated:"beforeInit",replacement:"onconstruct"},render:{deprecated:"init",message:'The "init" method has been deprecated and will likely be removed in a future release. You can either use the "oninit" method which will fire only once prior to, and regardless of, any eventual ractive instance being rendered, or if you need to access the rendered DOM, use "onrender" instead. See http://docs.ractivejs.org/latest/migrating for more information.'},complete:{deprecated:"complete",replacement:"oncomplete"}};T.prototype.fire=function(t,e){function n(n){return t[n]?(e?t[n](e):t[n](),!0):void 0}n(this.method),!t[this.method]&&this.deprecate&&n(this.deprecate.deprecated)&&(this.deprecate.message?m(this.deprecate.message):m('The method "%s" has been deprecated in favor of "%s" and will likely be removed in a future release. See http://docs.ractivejs.org/latest/migrating for more information.',this.deprecate.deprecated,this.deprecate.replacement)),e?t.fire(this.event,e):t.fire(this.event)};var iu,su=T,ou={},au={},uu={};"function"==typeof Promise?iu=Promise:(iu=function(t){var e,n,r,i,s,o,a=[],u=[],h=ou;r=function(t){return function(r){h===ou&&(e=r,h=t,n=W(h===au?a:u,e),V(n))}},i=r(au),s=r(uu);try{t(i,s)}catch(c){s(c)}return o={then:function(t,e){var r=new iu(function(i,s){var o=function(t,e,n){e.push("function"==typeof t?function(e){var n;try{n=t(e),M(r,n,i,s)}catch(o){s(o)}}:n)};o(t,a,i),o(e,u,s),h!==ou&&V(n)});return r}},o["catch"]=function(t){return this.then(null,t)},o},iu.all=function(t){return new iu(function(e,n){var r,i,s,o=[];if(!t.length)return void e(o);for(s=function(t,i){t&&"function"==typeof t.then?t.then(function(t){o[i]=t,--r||e(o)},n):(o[i]=t,--r||e(o))},r=i=t.length;i--;)s(t[i],i)})},iu.resolve=function(t){return new iu(function(e){e(t)})},iu.reject=function(t){return new iu(function(e,n){n(t)})});var hu=iu,cu=function(t){do if(void 0!==t.context)return t.context;while(t=t.parent);return Ga},lu=U,fu=function(t,e){this.callback=t,this.parent=e,this.intros=[],this.outros=[],this.children=[],this.totalChildren=this.outroChildren=0,this.detachQueue=[],this.decoratorQueue=[],this.outrosComplete=!1,e&&e.addChild(this)};fu.prototype={addChild:function(t){this.children.push(t),this.totalChildren+=1,this.outroChildren+=1},decrementOutros:function(){this.outroChildren-=1,J(this)},decrementTotal:function(){this.totalChildren-=1,J(this)},add:function(t){var e=t.isIntro?this.intros:this.outros;e.push(t)},addDecorator:function(t){this.decoratorQueue.push(t)},remove:function(t){var e=t.isIntro?this.intros:this.outros;L(e,t),J(this)},init:function(){this.ready=!0,J(this)},detachNodes:function(){this.decoratorQueue.forEach(Q),this.detachQueue.forEach(G),this.children.forEach(Y)}};var du,pu,mu=fu,vu=[],gu=new su("change");pu={start:function(t,e){var n,r;return e&&(n=new hu(function(t){return r=t})),du={previousBatch:du,transitionManager:new mu(r,du&&du.transitionManager),views:[],tasks:[],ractives:[],instance:t},t&&du.ractives.push(t),n},end:function(){X(),du.transitionManager.init(),!du.previousBatch&&du.instance&&(du.instance.viewmodel.changes=[]),du=du.previousBatch},addRactive:function(t){du&&F(du.ractives,t)},registerTransition:function(t){t._manager=du.transitionManager,du.transitionManager.add(t)},registerDecorator:function(t){du.transitionManager.addDecorator(t)},addView:function(t){du.views.push(t)},addUnresolved:function(t){vu.push(t)},removeUnresolved:function(t){L(vu,t)},detachWhenReady:function(t){du.transitionManager.detachQueue.push(t)},scheduleTask:function(t,e){var n;if(du){for(n=du;e&&n.previousBatch;)n=n.previousBatch;n.tasks.push(t)}else t()}};var yu=pu,wu=[],bu={tick:function(){var t,e,n;for(n=nu(),yu.start(),t=0;t<wu.length;t+=1)e=wu[t],e.tick(n)||wu.splice(t--,1);yu.end(),wu.length?eu(bu.tick):bu.running=!1},add:function(t){wu.push(t),bu.running||(bu.running=!0,eu(bu.tick))},abort:function(t,e){for(var n,r=wu.length;r--;)n=wu[r],n.root===e&&n.keypath===t&&n.stop()}},xu=bu,ku=function(t){var e;this.startTime=Date.now();for(e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);this.interpolator=Ma(this.from,this.to,this.root,this.interpolator),this.running=!0,this.tick()};ku.prototype={tick:function(){var t,e,n,r,i,s;return s=this.keypath,this.running?(r=Date.now(),t=r-this.startTime,t>=this.duration?(null!==s&&(yu.start(this.root),this.root.viewmodel.set(s,this.to),yu.end()),this.step&&this.step(1,this.to),this.complete(this.to),i=this.root._animations.indexOf(this),-1===i&&m("Animation was not found"),this.root._animations.splice(i,1),this.running=!1,!1):(e=this.easing?this.easing(t/this.duration):t/this.duration,null!==s&&(n=this.interpolator(e),yu.start(this.root),this.root.viewmodel.set(s,n),yu.end()),this.step&&this.step(e,n),!0)):!1},stop:function(){var t;this.running=!1,t=this.root._animations.indexOf(this),-1===t&&m("Animation was not found"),this.root._animations.splice(t,1)}};var Eu=ku,_u=nt,Au={stop:Ea},Su=it,Cu=new su("detach"),Ou=st,Pu=ot,Tu=function(){var t,e,n;t=this._root[this._isComponentQuery?"liveComponentQueries":"liveQueries"],e=this.selector,n=t.indexOf(e),-1!==n&&(t.splice(n,1),t[e]=null)},Fu=function(t,e){var n,r,i,s,o,a,u,h,c,l;for(n=ut(t.component||t._ractive.proxy),r=ut(e.component||e._ractive.proxy),i=D(n),s=D(r);i&&i===s;)n.pop(),r.pop(),o=i,i=D(n),s=D(r);if(i=i.component||i,s=s.component||s,c=i.parentFragment,l=s.parentFragment,c===l)return a=c.items.indexOf(i),u=l.items.indexOf(s),a-u||n.length-r.length;if(h=o.fragments)return a=h.indexOf(c),u=h.indexOf(l),a-u||n.length-r.length;throw new Error("An unexpected condition was met while comparing the position of two components. Please file an issue at https://github.com/RactiveJS/Ractive/issues - thanks!")},ju=function(t,e){var n;return t.compareDocumentPosition?(n=t.compareDocumentPosition(e),2&n?1:-1):Fu(t,e)},Ru=function(){this.sort(this._isComponentQuery?Fu:ju),this._dirty=!1},Nu=function(){var t=this;this._dirty||(this._dirty=!0,yu.scheduleTask(function(){t._sort()}))},Du=function(t){var e=this.indexOf(this._isComponentQuery?t.instance:t);-1!==e&&this.splice(e,1)},Lu=ht,Iu=ct,Vu=lt,Wu=ft,Mu=dt,Uu=pt,zu={enqueue:function(t,e){t.event&&(t._eventQueue=t._eventQueue||[],t._eventQueue.push(t.event)),t.event=e},dequeue:function(t){t._eventQueue&&t._eventQueue.length?t.event=t._eventQueue.pop():delete t.event}},Bu=zu,$u=mt,qu=yt,Qu=wt,Zu={capture:!0,noUnwrap:!0,fullRootGet:!0},Hu=bt,Ku=new su("insert"),Gu=kt,Yu=function(t,e,n,r){this.root=t,this.keypath=e,this.callback=n,this.defer=r.defer,this.context=r&&r.context?r.context:t};Yu.prototype={init:function(t){this.value=this.root.get(this.keypath.str),t!==!1?this.update():this.oldValue=this.value},setValue:function(t){var e=this;a(t,this.value)||(this.value=t,this.defer&&this.ready?yu.scheduleTask(function(){return e.update()}):this.update())},update:function(){this.updating||(this.updating=!0,this.callback.call(this.context,this.value,this.oldValue,this.keypath.str),this.oldValue=this.value,this.updating=!1)}};var Ju,Xu=Yu,th=Et,eh=Array.prototype.slice;Ju=function(t,e,n,r){this.root=t,this.callback=n,this.defer=r.defer,this.keypath=e,this.regex=new RegExp("^"+e.str.replace(/\./g,"\\.").replace(/\*/g,"([^\\.]+)")+"$"),this.values={},this.defer&&(this.proxies=[]),this.context=r&&r.context?r.context:t},Ju.prototype={init:function(t){var e,n;if(e=th(this.root,this.keypath),t!==!1)for(n in e)e.hasOwnProperty(n)&&this.update(_(n));else this.values=e},update:function(t){var e,n=this;if(t.isPattern){e=th(this.root,t);for(t in e)e.hasOwnProperty(t)&&this.update(_(t))}else if(!this.root.viewmodel.implicitChanges[t.str])return this.defer&&this.ready?void yu.scheduleTask(function(){return n.getProxy(t).update()}):void this.reallyUpdate(t)},reallyUpdate:function(t){var e,n,r,i;return e=t.str,n=this.root.viewmodel.get(t),this.updating?void(this.values[e]=n):(this.updating=!0,a(n,this.values[e])&&this.ready||(r=eh.call(this.regex.exec(e),1),i=[n,this.values[e],e].concat(r),this.values[e]=n,this.callback.apply(this.context,i)),void(this.updating=!1))},getProxy:function(t){var e=this;return this.proxies[t.str]||(this.proxies[t.str]={update:function(){return e.reallyUpdate(t)}}),this.proxies[t.str]}};var nh,rh,ih,sh,oh,ah,uh=Ju,hh=_t,ch={},lh=At,fh=St,dh=function(t){return t.trim()},ph=function(t){return""!==t},mh=Ct,vh=Ot,gh=Pt,yh=Tt,wh=Array.prototype,bh=function(t){return function(e){for(var n=arguments.length,r=Array(n>1?n-1:0),i=1;n>i;i++)r[i-1]=arguments[i];var o,a,u,h,c=[];if(e=_(C(e)),o=this.viewmodel.get(e),a=o.length,!s(o))throw new Error("Called ractive."+t+"('"+e.str+"'), but '"+e.str+"' does not refer to an array");return c=yh(o,t,r),h=wh[t].apply(o,r),u=yu.start(this,!0).then(function(){return h}),c?this.viewmodel.smartUpdate(e,o,c):this.viewmodel.mark(e),yu.end(),u}},xh=bh("pop"),kh=bh("push"),Eh="/* Ractive.js component styles */\n",_h=[],Ah=!1;Xo?(ih=document.createElement("style"),ih.type="text/css",sh=document.getElementsByTagName("head")[0],ah=!1,oh=ih.styleSheet,rh=function(){var t=Eh+_h.map(function(t){return"\n/* {"+t.id+"} */\n"+t.styles}).join("\n");oh?oh.cssText=t:ih.innerHTML=t,ah||(sh.appendChild(ih),ah=!0)},nh={add:function(t){_h.push(t),Ah=!0},apply:function(){Ah&&(rh(),Ah=!1)}}):nh={add:Ea,apply:Ea};var Sh,Ch,Oh=nh,Ph=jt,Th=new su("render"),Fh=new su("complete"),jh={extend:function(t,e,n){e.adapt=Nt(e.adapt,N(n.adapt))},init:function(){}},Rh=jh,Nh=Dt,Dh=/(?:^|\})?\s*([^\{\}]+)\s*\{/g,Lh=/\/\*.*?\*\//g,Ih=/((?:(?:\[[^\]+]\])|(?:[^\s\+\>\~:]))+)((?::[^\s\+\>\~\(]+(?:\([^\)]+\))?)?\s*[\s\+\>\~]?)\s*/g,Vh=/^@media/,Wh=/\[data-ractive-css~="\{[a-z0-9-]+\}"]/g,Mh=1,Uh={name:"css",extend:function(t,e,n){if(n.css){var r=Mh++,i=n.noCssTransform?n.css:Nh(n.css,r);e.cssId=r,Oh.add({id:r,styles:i})}},init:function(){}},zh=Uh,Bh={name:"data",extend:function(t,e,n){var r=void 0,i=void 0;if(n.data&&h(n.data))for(r in n.data)i=n.data[r],i&&"object"==typeof i&&(h(i)||s(i))&&m("Passing a `data` option with object and array properties to Ractive.extend() is discouraged, as mutating them is likely to cause bugs. Consider using a data function instead:\n\n  // this...\n  data: function () {\n    return {\n      myObject: {}\n    };\n  })\n\n  // instead of this:\n  data: {\n    myObject: {}\n  }");e.data=Wt(e.data,n.data)},init:function(t,e,n){var r=Wt(t.prototype.data,n.data);return"function"==typeof r&&(r=r.call(e)),r||{}},reset:function(t){var e=this.init(t.constructor,t,t.viewmodel);return t.viewmodel.reset(e),!0}},$h=Bh,qh=/^\s+/;Ch=function(t){this.name="ParseError",this.message=t;try{throw new Error(t)}catch(e){this.stack=e.stack}},Ch.prototype=Error.prototype,Sh=function(t,e){var n,r,i=0;for(this.str=t,this.options=e||{},this.pos=0,this.lines=this.str.split("\n"),this.lineEnds=this.lines.map(function(t){var e=i+t.length+1;return i=e,e},0),this.init&&this.init(t,e),n=[];this.pos<this.str.length&&(r=this.read());)n.push(r);this.leftover=this.remaining(),this.result=this.postProcess?this.postProcess(n,e):n},Sh.prototype={read:function(t){var e,n,r,i;for(t||(t=this.converters),e=this.pos,r=t.length,n=0;r>n;n+=1)if(this.pos=e,i=t[n](this))return i;return null},getLinePos:function(t){for(var e,n=0,r=0;t>=this.lineEnds[n];)r=this.lineEnds[n],n+=1;return e=t-r,[n+1,e+1,t]},error:function(t){var e=this.getLinePos(this.pos),n=e[0],r=e[1],i=this.lines[e[0]-1],s=0,o=i.replace(/\t/g,function(t,n){return n<e[1]&&(s+=1),"  "})+"\n"+new Array(e[1]+s).join(" ")+"^----",a=new Ch(""+t+" at line "+n+" character "+r+":\n"+o);throw a.line=e[0],a.character=e[1],a.shortMessage=t,a},matchString:function(t){return this.str.substr(this.pos,t.length)===t?(this.pos+=t.length,t):void 0},matchPattern:function(t){var e;return(e=t.exec(this.remaining()))?(this.pos+=e[0].length,e[1]||e[0]):void 0},allowWhitespace:function(){this.matchPattern(qh)},remaining:function(){return this.str.substring(this.pos)},nextChar:function(){return this.str.charAt(this.pos)}},Sh.extend=function(t){var e,n,r=this;e=function(t,e){Sh.call(this,t,e)},e.prototype=_a(r.prototype);for(n in t)ja.call(t,n)&&(e.prototype[n]=t[n]);return e.extend=Sh.extend,e};var Qh,Zh,Hh,Kh=Sh,Gh=1,Yh=2,Jh=3,Xh=4,tc=5,ec=6,nc=7,rc=8,ic=9,sc=10,oc=13,ac=14,uc=15,hc=16,cc=17,lc=18,fc=20,dc=21,pc=22,mc=23,vc=24,gc=25,yc=26,wc=27,bc=30,xc=31,kc=32,Ec=33,_c=34,Ac=35,Sc=36,Cc=40,Oc=50,Pc=51,Tc=52,Fc=53,jc=54,Rc=60,Nc=61,Dc=zt,Lc=/^[^\s=]+/,Ic=/^\s+/,Vc=Bt,Wc=/^(\/(?:[^\n\r\u2028\u2029\/\\[]|\\.|\[(?:[^\n\r\u2028\u2029\]\\]|\\.)*])+\/(?:([gimuy])(?![a-z]*\2))*(?![a-zA-Z_$0-9]))/,Mc=$t,Uc={t:sc,exclude:!0},zc="Expected a JavaScript expression",Bc="Expected closing paren",$c=Qt,qc=/^(?:[+-]?)0*(?:(?:(?:[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/,Qc=Zt;Qh=/^(?=.)[^"'\\]+?(?:(?!.)|(?=["'\\]))/,Zh=/^\\(?:['"\\bfnrt]|0(?![0-9])|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|(?=.)[^ux0-9])/,Hh=/^\\(?:\r\n|[\u000A\u000D\u2028\u2029])/;var Zc,Hc,Kc=function(t){return function(e){var n,r,i,s;for(n=e.pos,r='"',i=!1;!i;)s=e.matchPattern(Qh)||e.matchPattern(Zh)||e.matchString(t),s?r+='"'===s?'\\"':"\\'"===s?"'":s:(s=e.matchPattern(Hh),s?r+="\\u"+("000"+s.charCodeAt(1).toString(16)).slice(-4):i=!0);return r+='"',JSON.parse(r)}},Gc=Kc('"'),Yc=Kc("'"),Jc=function(t){var e,n;return e=t.pos,t.matchString('"')?(n=Yc(t),t.matchString('"')?{t:dc,v:n}:(t.pos=e,null)):t.matchString("'")?(n=Gc(t),t.matchString("'")?{t:dc,v:n}:(t.pos=e,null)):null},Xc=/^[a-zA-Z_$][a-zA-Z_$0-9]*/,tl=Ht,el=/^[a-zA-Z_$][a-zA-Z_$0-9]*$/,nl=Kt,rl=Gt,il=function(t){var e,n;return e=t.pos,t.allowWhitespace(),t.matchString("{")?(n=rl(t),t.allowWhitespace(),t.matchString("}")?{t:mc,m:n}:(t.pos=e,null)):(t.pos=e,null)},sl=Yt,ol=function(t){var e,n;return e=t.pos,t.allowWhitespace(),t.matchString("[")?(n=sl(t),t.matchString("]")?{t:pc,m:n}:(t.pos=e,null)):(t.pos=e,null)},al=Jt,ul=Xt,hl=/^(?:~\/|(?:\.\.\/)+|\.\/(?:\.\.\/)*|\.)/;Zc=/^(?:Array|console|Date|RegExp|decodeURIComponent|decodeURI|encodeURIComponent|encodeURI|isFinite|isNaN|parseFloat|parseInt|JSON|Math|NaN|undefined|null)\b/,Hc=/^(?:break|case|catch|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|var|void|while|with)$/;var cl,ll,fl=/^[a-zA-Z$_0-9]+(?:(?:\.[a-zA-Z$_0-9]+)|(?:\[[0-9]+\]))*/,dl=/^[a-zA-Z_$][-a-zA-Z_$0-9]*/,pl=te,ml=function(t){return al(t)||ul(t)||pl(t)},vl=ee,gl=function(t){var e,n,r,i;if(n=ml(t),!n)return null;for(;n;)if(e=t.pos,r=vl(t))n={t:kc,x:n,r:r};else{if(!t.matchString("("))break;t.allowWhitespace(),i=sl(t),t.allowWhitespace(),t.matchString(")")||t.error(Bc),n={t:Cc,x:n},i&&(n.o=i)}return n};ll=function(t,e){return function(n){var r;return(r=e(n))?r:n.matchString(t)?(n.allowWhitespace(),r=Fl(n),r||n.error(zc),{s:t,o:r,t:Ec}):null}},function(){var t,e,n,r,i;for(r="! ~ + - typeof".split(" "),i=gl,t=0,e=r.length;e>t;t+=1)n=ll(r[t],i),i=n;cl=i}();var yl,wl,bl=cl;wl=function(t,e){return function(n){var r,i,s;if(i=e(n),!i)return null;for(;;){if(r=n.pos,n.allowWhitespace(),!n.matchString(t))return n.pos=r,i;if("in"===t&&/[a-zA-Z_$0-9]/.test(n.remaining().charAt(0)))return n.pos=r,i;if(n.allowWhitespace(),s=e(n),!s)return n.pos=r,i;i={t:Sc,s:t,o:[i,s]}}}},function(){var t,e,n,r,i;for(r="* / % + - << >> >>> < <= > >= in instanceof == != === !== & ^ | && ||".split(" "),i=bl,t=0,e=r.length;e>t;t+=1)n=wl(r[t],i),i=n;yl=i}();var xl,kl,El,_l,Al,Sl,Cl,Ol,Pl=yl,Tl=ne,Fl=re,jl=ie,Rl=oe,Nl=/^[0-9][1-9]*$/,Dl=ue,Ll=he,Il=ce,Vl=le,Wl=fe,Ml=de,Ul=pe,zl=/^yield\s*/,Bl=me,$l=ve,ql=/^\s*else\s*/,Ql=ge,Zl=/^\s*elseif\s+/,Hl={each:Tc,"if":Oc,"if-with":jc,"with":Fc,unless:Pc},Kl=ye,Gl=/^\s*:\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/,Yl=/^\s*,\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/,Jl=new RegExp("^("+Object.keys(Hl).join("|")+")\\b"),Xl=Ee,tf="<!--",ef="-->";xl=/^(allowFullscreen|async|autofocus|autoplay|checked|compact|controls|declare|default|defaultChecked|defaultMuted|defaultSelected|defer|disabled|enabled|formNoValidate|hidden|indeterminate|inert|isMap|itemScope|loop|multiple|muted|noHref|noResize|noShade|noValidate|noWrap|open|pauseOnExit|readOnly|required|reversed|scoped|seamless|selected|sortable|translate|trueSpeed|typeMustMatch|visible)$/i,kl=/^(?:area|base|br|col|command|doctype|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i,El={quot:34,amp:38,apos:39,lt:60,gt:62,nbsp:160,iexcl:161,cent:162,pound:163,curren:164,yen:165,brvbar:166,sect:167,uml:168,copy:169,ordf:170,laquo:171,not:172,shy:173,reg:174,macr:175,deg:176,plusmn:177,sup2:178,sup3:179,acute:180,micro:181,para:182,middot:183,cedil:184,sup1:185,ordm:186,raquo:187,frac14:188,frac12:189,frac34:190,iquest:191,Agrave:192,Aacute:193,Acirc:194,Atilde:195,Auml:196,Aring:197,AElig:198,Ccedil:199,Egrave:200,Eacute:201,Ecirc:202,Euml:203,Igrave:204,Iacute:205,Icirc:206,Iuml:207,ETH:208,Ntilde:209,Ograve:210,Oacute:211,Ocirc:212,Otilde:213,Ouml:214,times:215,Oslash:216,Ugrave:217,Uacute:218,Ucirc:219,Uuml:220,Yacute:221,THORN:222,szlig:223,agrave:224,aacute:225,acirc:226,atilde:227,auml:228,aring:229,aelig:230,ccedil:231,egrave:232,eacute:233,ecirc:234,euml:235,igrave:236,iacute:237,icirc:238,iuml:239,eth:240,ntilde:241,ograve:242,oacute:243,ocirc:244,otilde:245,ouml:246,divide:247,oslash:248,ugrave:249,uacute:250,ucirc:251,uuml:252,yacute:253,thorn:254,yuml:255,OElig:338,oelig:339,Scaron:352,scaron:353,Yuml:376,fnof:402,circ:710,tilde:732,Alpha:913,Beta:914,Gamma:915,Delta:916,Epsilon:917,Zeta:918,Eta:919,Theta:920,Iota:921,Kappa:922,Lambda:923,Mu:924,Nu:925,Xi:926,Omicron:927,Pi:928,Rho:929,Sigma:931,Tau:932,Upsilon:933,Phi:934,Chi:935,Psi:936,Omega:937,alpha:945,beta:946,gamma:947,delta:948,epsilon:949,zeta:950,eta:951,theta:952,iota:953,kappa:954,lambda:955,mu:956,nu:957,xi:958,omicron:959,pi:960,rho:961,sigmaf:962,sigma:963,tau:964,upsilon:965,phi:966,chi:967,psi:968,omega:969,thetasym:977,upsih:978,piv:982,ensp:8194,emsp:8195,thinsp:8201,zwnj:8204,zwj:8205,lrm:8206,rlm:8207,ndash:8211,mdash:8212,lsquo:8216,rsquo:8217,sbquo:8218,ldquo:8220,rdquo:8221,bdquo:8222,dagger:8224,Dagger:8225,bull:8226,hellip:8230,permil:8240,prime:8242,Prime:8243,lsaquo:8249,rsaquo:8250,oline:8254,frasl:8260,euro:8364,image:8465,weierp:8472,real:8476,trade:8482,alefsym:8501,larr:8592,uarr:8593,rarr:8594,darr:8595,harr:8596,crarr:8629,lArr:8656,uArr:8657,rArr:8658,dArr:8659,hArr:8660,forall:8704,part:8706,exist:8707,empty:8709,nabla:8711,isin:8712,notin:8713,ni:8715,prod:8719,sum:8721,minus:8722,lowast:8727,radic:8730,prop:8733,infin:8734,ang:8736,and:8743,or:8744,cap:8745,cup:8746,"int":8747,there4:8756,sim:8764,cong:8773,asymp:8776,ne:8800,equiv:8801,le:8804,ge:8805,sub:8834,sup:8835,nsub:8836,sube:8838,supe:8839,oplus:8853,otimes:8855,perp:8869,sdot:8901,lceil:8968,rceil:8969,lfloor:8970,rfloor:8971,lang:9001,rang:9002,loz:9674,spades:9824,clubs:9827,hearts:9829,diams:9830},_l=[8364,129,8218,402,8222,8230,8224,8225,710,8240,352,8249,338,141,381,143,144,8216,8217,8220,8221,8226,8211,8212,732,8482,353,8250,339,157,382,376],Al=new RegExp("&(#?(?:x[\\w\\d]+|\\d+|"+Object.keys(El).join("|")+"));?","g"),Sl=/</g,Cl=/>/g,Ol=/&/g;var nf,rf,sf,of,af,uf,hf,cf=/^\s*\r?\n/,lf=/\r?\n\s*$/,ff=function(t){var e,n,r,i,s;for(e=1;e<t.length;e+=1)n=t[e],r=t[e-1],i=t[e-2],Ce(n)&&Oe(r)&&Ce(i)&&lf.test(i)&&cf.test(n)&&(t[e-2]=i.replace(lf,"\n"),t[e]=n.replace(cf,"")),Pe(n)&&Ce(r)&&lf.test(r)&&Ce(n.f[0])&&cf.test(n.f[0])&&(t[e-1]=r.replace(lf,"\n"),n.f[0]=n.f[0].replace(cf,"")),Ce(n)&&Pe(r)&&(s=D(r.f),Ce(s)&&lf.test(s)&&cf.test(n)&&(r.f[r.f.length-1]=s.replace(lf,"\n"),t[e]=n.replace(cf,"")));return t},df=function(t,e,n){var r;e&&(r=t[0],"string"==typeof r&&(r=r.replace(e,""),r?t[0]=r:t.shift())),n&&(r=D(t),"string"==typeof r&&(r=r.replace(n,""),r?t[t.length-1]=r:t.pop()))},pf=Te,mf=/[ \t\f\r\n]+/g,vf=/^(?:pre|script|style|textarea)$/i,gf=/^[ \t\f\r\n]+/,yf=/[ \t\f\r\n]+$/,wf=/^(?:\r\n|\r|\n)/,bf=/(?:\r\n|\r|\n)$/,xf=Fe,kf=/^([a-zA-Z]{1,}:?[a-zA-Z0-9\-]*)\s*\>/,Ef=function(t,e){var n,r,i;for(n=e.length;n--;){if(r=t.indexOf(e[n]),!r)return 0;-1!==r&&(!i||i>r)&&(i=r)}return i||-1},_f=je,Af=/^[^\s"'>\/=]+/,Sf=/^[^\s"'=<>`]+/;rf={"true":!0,"false":!1,undefined:void 0,"null":null},sf=new RegExp("^(?:"+Object.keys(rf).join("|")+")"),of=/^(?:[+-]?)(?:(?:(?:0|[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/,af=/\$\{([^\}]+)\}/g,uf=/^\$\{([^\}]+)\}/,hf=/^\s*$/,nf=Kh.extend({init:function(t,e){this.values=e.values,this.allowWhitespace()},postProcess:function(t){return 1===t.length&&hf.test(this.leftover)?{value:t[0].v}:null},converters:[function(t){var e;return t.values?(e=t.matchPattern(uf),e&&t.values.hasOwnProperty(e)?{v:t.values[e]}:void 0):null},function(t){var e;return(e=t.matchPattern(sf))?{v:rf[e]}:void 0},function(t){var e;return(e=t.matchPattern(of))?{v:+e}:void 0},function(t){var e,n=Jc(t);return n&&(e=t.values)?{v:n.v.replace(af,function(t,n){return n in e?e[n]:n})}:n},function(t){var e,n;if(!t.matchString("{"))return null;if(e={},t.allowWhitespace(),t.matchString("}"))return{v:e};for(;n=Ve(t);){if(e[n.key]=n.value,t.allowWhitespace(),t.matchString("}"))return{v:e};if(!t.matchString(","))return null}return null},function(t){var e,n;if(!t.matchString("["))return null;if(e=[],t.allowWhitespace(),t.matchString("]"))return{v:e};for(;n=t.read();){if(e.push(n.v),t.allowWhitespace(),t.matchString("]"))return{v:e};if(!t.matchString(","))return null;t.allowWhitespace()}return null}]});var Cf,Of=function(t,e){var n=new nf(t,{values:e});return n.result},Pf=We,Tf=/^([a-zA-Z_$][a-zA-Z_$0-9]*)\(/,Ff=/\)\s*$/;Cf=Kh.extend({converters:[Fl]});var jf,Rf=/^[a-zA-Z]{1,}:?[a-zA-Z0-9\-]*/,Nf=/^[\s\n\/>]/,Df=/^on/,Lf=/^on-([a-zA-Z\\*\\.$_][a-zA-Z\\*\\.$_0-9\-]+)$/,If=/^(?:change|reset|teardown|update|construct|config|init|render|unrender|detach|insert)$/,Vf={"intro-outro":"t0",intro:"t1",outro:"t2",decorator:"o"},Wf={exclude:!0};jf={li:["li"],dt:["dt","dd"],dd:["dt","dd"],p:"address article aside blockquote div dl fieldset footer form h1 h2 h3 h4 h5 h6 header hgroup hr main menu nav ol p pre section table ul".split(" "),rt:["rt","rp"],rp:["rt","rp"],optgroup:["optgroup"],option:["option","optgroup"],thead:["tbody","tfoot"],tbody:["tbody","tfoot"],tfoot:["tbody"],tr:["tr","tbody"],td:["td","th","tr"],th:["td","th","tr"]};var Mf,Uf=Me,zf=ze,Bf=Be,$f=/[-\/\\^$*+?.()|[\]{}]/g,qf=$e,Qf=/^<!--\s*/,Zf=/s*>\s*([a-zA-Z_$][-a-zA-Z_$0-9]*)\s*/,Hf=/\s*-->/,Kf=qe,Gf=/^#\s*partial\s+/,Yf=Qe,Jf=Ze,Xf=[Il,Ll,Kl,Ul,Ml,Vl],td=[Dl],ed=[Ll,Kl,Ml],nd=void 0,rd=[Mc,Xl,Uf,zf],id=[qf,Kf];nd=Kh.extend({init:function(t,e){var n=e.tripleDelimiters||["{{{","}}}"],r=e.staticDelimiters||["[[","]]"],i=e.staticTripleDelimiters||["[[[","]]]"];this.standardDelimiters=e.delimiters||["{{","}}"],this.tags=[{isStatic:!1,isTriple:!1,open:this.standardDelimiters[0],close:this.standardDelimiters[1],readers:Xf},{isStatic:!1,isTriple:!0,open:n[0],close:n[1],readers:td},{isStatic:!0,isTriple:!1,open:r[0],close:r[1],readers:ed},{isStatic:!0,isTriple:!0,open:i[0],close:i[1],readers:td}],this.sortMustacheTags(),this.sectionDepth=0,this.elementStack=[],this.interpolate={script:!e.interpolate||e.interpolate.script!==!1,style:!e.interpolate||e.interpolate.style!==!1},e.sanitize===!0&&(e.sanitize={elements:"applet base basefont body frame frameset head html isindex link meta noframes noscript object param script style title".split(" "),eventAttributes:!0}),this.stripComments=e.stripComments!==!1,this.preserveWhitespace=e.preserveWhitespace,this.sanitizeElements=e.sanitize&&e.sanitize.elements,this.sanitizeEventAttributes=e.sanitize&&e.sanitize.eventAttributes,this.includeLinePositions=e.includeLinePositions},postProcess:function(t){return t.length?(this.sectionDepth>0&&this.error("A section was left open"),pf(t[0].t,this.stripComments,this.preserveWhitespace,!this.preserveWhitespace,!this.preserveWhitespace),t[0]):{t:[],v:oa}},converters:[Yf],sortMustacheTags:function(){this.tags.sort(function(t,e){return e.open.length-t.open.length})}});var sd,od,ad,ud=["preserveWhitespace","sanitize","stripComments","delimiters","tripleDelimiters","interpolate"],hd={fromId:Ge,isHashedId:Ye,isParsed:Je,getParseOptions:Xe,createHelper:He,parse:Ke},cd=hd,ld={name:"template",extend:function(t,e,n){var r;"template"in n&&(r=n.template,e.template="function"==typeof r?r:rn(r,e))},init:function(t,e,n){var r,i;r="template"in n?n.template:t.prototype.template,"function"==typeof r&&(i=r,r=en(e,i),e._config.template={fn:i,result:r}),r=rn(r,e),e.template=r.t,r.p&&sn(e.partials,r.p)},reset:function(t){var e,n=tn(t);return n?(e=rn(n,t),t.template=e.t,sn(t.partials,e.p,!0),!0):void 0}},fd=ld;sd=["adaptors","components","computed","decorators","easing","events","interpolators","partials","transitions"],od=function(t,e){this.name=t,this.useDefaults=e},od.prototype={constructor:od,extend:function(t,e,n){this.configure(this.useDefaults?t.defaults:t,this.useDefaults?e:e.constructor,n)},init:function(){},configure:function(t,e,n){var r,i=this.name,s=n[i];r=_a(t[i]);for(var o in s)r[o]=s[o];e[i]=r},reset:function(t){var e=t[this.name],n=!1;return Object.keys(e).forEach(function(t){var r=e[t];r._fn&&(r._fn.isOwner?e[t]=r._fn:delete e[t],n=!0)}),n}},ad=sd.map(function(t){return new od(t,"computed"===t)});var dd,pd,md,vd,gd,yd,wd=ad,bd=on,xd=cn;vd={adapt:Rh,css:zh,data:$h,template:fd},md=Object.keys(ua),yd=dn(md.filter(function(t){return!vd[t]})),gd=dn(md.concat(wd.map(function(t){return t.name}))),pd=[].concat(md.filter(function(t){return!wd[t]&&!vd[t]}),wd,vd.data,vd.template,vd.css),dd={extend:function(t,e,n){return ln("extend",t,e,n)},init:function(t,e,n){return ln("init",t,e,n)},reset:function(t){return pd.filter(function(e){return e.reset&&e.reset(t)}).map(function(t){return t.name})},order:pd};var kd=dd,Ed=pn,_d=mn,Ad=vn,Sd=gn,Cd=yn,Od=wn,Pd=bn,Td=xn,Fd=kn,jd=En,Rd=_n,Nd=An,Dd=function(){return e(this.node)},Ld=function(t){this.type=Gh,this.text=t.template};Ld.prototype={detach:Dd,firstNode:function(){return this.node},render:function(){return this.node||(this.node=document.createTextNode(this.text)),this.node},toString:function(t){return t?Se(this.text):this.text},unrender:function(t){return t?this.detach():void 0}};var Id=Ld,Vd=Sn,Wd=Cn,Md=function(t,e,n){var r;this.ref=e,this.resolved=!1,this.root=t.root,this.parentFragment=t.parentFragment,this.callback=n,r=lu(t.root,e,t.parentFragment),void 0!=r?this.resolve(r):yu.addUnresolved(this)};Md.prototype={resolve:function(t){this.keypath&&!t&&yu.addUnresolved(this),this.resolved=!0,this.keypath=t,this.callback(t)},forceResolution:function(){this.resolve(_(this.ref))},rebind:function(t,e){var n;void 0!=this.keypath&&(n=this.keypath.replace(t,e),void 0!==n&&this.resolve(n))},unbind:function(){this.resolved||yu.removeUnresolved(this)}};var Ud=Md,zd=function(t,e,n){this.parentFragment=t.parentFragment,this.ref=e,this.callback=n,this.rebind()},Bd={"@keypath":{prefix:"c",prop:["context"]},"@index":{prefix:"i",prop:["index"]},"@key":{prefix:"k",prop:["key","index"]}};zd.prototype={rebind:function(){var t,e=this.ref,n=this.parentFragment,r=Bd[e];if(!r)throw new Error('Unknown special reference "'+e+'" - valid references are @index, @key and @keypath');if(this.cached)return this.callback(_("@"+r.prefix+On(this.cached,r)));if(-1!==r.prop.indexOf("index")||-1!==r.prop.indexOf("key"))for(;n;){if(n.owner.currentSubtype===Tc&&void 0!==(t=On(n,r)))return this.cached=n,n.registerIndexRef(this),this.callback(_("@"+r.prefix+t));n=!n.parent&&n.owner&&n.owner.component&&n.owner.component.parentFragment&&!n.owner.component.instance.isolated?n.owner.component.parentFragment:n.parent}else for(;n;){if(void 0!==(t=On(n,r)))return this.callback(_("@"+r.prefix+t.str));n=n.parent}},unbind:function(){this.cached&&this.cached.unregisterIndexRef(this)}};var $d=zd,qd=function(t,e,n){this.parentFragment=t.parentFragment,this.ref=e,this.callback=n,e.ref.fragment.registerIndexRef(this),this.rebind()};qd.prototype={rebind:function(){var t,e=this.ref.ref;t="k"===e.ref.t?"k"+e.fragment.key:"i"+e.fragment.index,void 0!==t&&this.callback(_("@"+t))},unbind:function(){this.ref.ref.fragment.unregisterIndexRef(this)}};var Qd=qd,Zd=Pn;Pn.resolve=function(t){var e,n,r={};for(e in t.refs)n=t.refs[e],r[n.ref.n]="k"===n.ref.t?n.fragment.key:n.fragment.index;return r};var Hd,Kd=Tn,Gd=Fn,Yd={},Jd=Function.prototype.bind;Hd=function(t,e,n,r){var i,s=this;i=t.root,this.root=i,this.parentFragment=e,this.callback=r,this.owner=t,this.str=n.s,this.keypaths=[],this.pending=n.r.length,this.refResolvers=n.r.map(function(t,e){return Kd(s,t,function(t){s.resolve(e,t)})}),this.ready=!0,this.bubble()},Hd.prototype={bubble:function(){this.ready&&(this.uniqueString=Rn(this.str,this.keypaths),this.keypath=Nn(this.uniqueString),this.createEvaluator(),this.callback(this.keypath))},unbind:function(){for(var t;t=this.refResolvers.pop();)t.unbind()},resolve:function(t,e){this.keypaths[t]=e,this.bubble()},createEvaluator:function(){var t,e,n,r,i,s=this;r=this.keypath,t=this.root.viewmodel.computations[r.str],t?this.root.viewmodel.mark(r):(i=Gd(this.str,this.refResolvers.length),e=this.keypaths.map(function(t){var e;return"undefined"===t?function(){return void 0}:t.isSpecial?(e=t.value,function(){return e}):function(){var e=s.root.viewmodel.get(t,{noUnwrap:!0,fullRootGet:!0});return"function"==typeof e&&(e=Ln(e,s.root)),e}}),n={deps:this.keypaths.filter(Dn),getter:function(){var t=e.map(jn);return i.apply(null,t)}},t=this.root.viewmodel.compute(r,n))},rebind:function(t,e){this.refResolvers.forEach(function(n){return n.rebind(t,e)})}};var Xd=Hd,tp=function(t,e,n){var r=this;this.resolver=e,this.root=e.root,this.parentFragment=n,this.viewmodel=e.root.viewmodel,"string"==typeof t?this.value=t:t.t===bc?this.refResolver=Kd(this,t.n,function(t){r.resolve(t)}):new Xd(e,n,t,function(t){r.resolve(t)})};tp.prototype={resolve:function(t){this.keypath&&this.viewmodel.unregister(this.keypath,this),this.keypath=t,this.value=this.viewmodel.get(t),this.bind(),this.resolver.bubble()},bind:function(){this.viewmodel.register(this.keypath,this)},rebind:function(t,e){this.refResolver&&this.refResolver.rebind(t,e)},setValue:function(t){this.value=t,this.resolver.bubble()},unbind:function(){this.keypath&&this.viewmodel.unregister(this.keypath,this),this.refResolver&&this.refResolver.unbind()},forceResolution:function(){this.refResolver&&this.refResolver.forceResolution()}};var ep=tp,np=function(t,e,n){var r,i,s,o,a=this;this.parentFragment=o=t.parentFragment,this.root=r=t.root,this.mustache=t,this.ref=i=e.r,this.callback=n,this.unresolved=[],(s=lu(r,i,o))?this.base=s:this.baseResolver=new Ud(this,i,function(t){a.base=t,a.baseResolver=null,a.bubble()}),this.members=e.m.map(function(t){return new ep(t,a,o)}),this.ready=!0,this.bubble()};np.prototype={getKeypath:function(){var t=this.members.map(In);return!t.every(Vn)||this.baseResolver?null:this.base.join(t.join("."))},bubble:function(){this.ready&&!this.baseResolver&&this.callback(this.getKeypath())},unbind:function(){this.members.forEach(Z)},rebind:function(t,e){var n;if(this.base){var r=this.base.replace(t,e);r&&r!==this.base&&(this.base=r,n=!0)}this.members.forEach(function(r){r.rebind(t,e)&&(n=!0)}),n&&this.bubble()},forceResolution:function(){this.baseResolver&&(this.base=_(this.ref),this.baseResolver.unbind(),this.baseResolver=null),this.members.forEach(Wn),this.bubble()}};var rp=np,ip=Mn,sp=Un,op=zn,ap={getValue:Wd,init:ip,resolve:sp,rebind:op},up=function(t){this.type=Yh,ap.init(this,t)};up.prototype={update:function(){this.node.data=void 0==this.value?"":this.value},resolve:ap.resolve,rebind:ap.rebind,detach:Dd,unbind:Vd,render:function(){return this.node||(this.node=document.createTextNode(n(this.value))),
this.node},unrender:function(t){t&&e(this.node)},getValue:ap.getValue,setValue:function(t){var e;this.keypath&&(e=this.root.viewmodel.wrapped[this.keypath.str])&&(t=e.get()),a(t,this.value)||(this.value=t,this.parentFragment.bubble(),this.node&&yu.addView(this))},firstNode:function(){return this.node},toString:function(t){var e=""+n(this.value);return t?Se(e):e}};var hp=up,cp=Bn,lp=$n,fp=qn,dp=Qn,pp=Zn,mp=Hn,vp=Kn,gp=Gn,yp=Yn,wp=function(t,e){ap.rebind.call(this,t,e)},bp=Xn,xp=tr,kp=lr,Ep=fr,_p=dr,Ap=vr,Sp=function(t){this.type=Xh,this.subtype=this.currentSubtype=t.template.n,this.inverted=this.subtype===Pc,this.pElement=t.pElement,this.fragments=[],this.fragmentsToCreate=[],this.fragmentsToRender=[],this.fragmentsToUnrender=[],t.template.i&&(this.indexRefs=t.template.i.split(",").map(function(t,e){return{n:t,t:0===e?"k":"i"}})),this.renderedFragments=[],this.length=0,ap.init(this,t)};Sp.prototype={bubble:cp,detach:lp,find:fp,findAll:dp,findAllComponents:pp,findComponent:mp,findNextNode:vp,firstNode:gp,getIndexRef:function(t){if(this.indexRefs)for(var e=this.indexRefs.length;e--;){var n=this.indexRefs[e];if(n.n===t)return n}},getValue:ap.getValue,shuffle:yp,rebind:wp,render:bp,resolve:ap.resolve,setValue:xp,toString:kp,unbind:Ep,unrender:_p,update:Ap};var Cp,Op,Pp=Sp,Tp=gr,Fp=yr,jp=wr,Rp=br,Np={};try{la("table").innerHTML="foo"}catch(Oa){Cp=!0,Op={TABLE:['<table class="x">',"</table>"],THEAD:['<table><thead class="x">',"</thead></table>"],TBODY:['<table><tbody class="x">',"</tbody></table>"],TR:['<table><tr class="x">',"</tr></table>"],SELECT:['<select class="x">',"</select>"]}}var Dp=function(t,e,n){var r,i,s,o,a,u=[];if(null!=t&&""!==t){for(Cp&&(i=Op[e.tagName])?(r=xr("DIV"),r.innerHTML=i[0]+t+i[1],r=r.querySelector(".x"),"SELECT"===r.tagName&&(s=r.options[r.selectedIndex])):e.namespaceURI===ra.svg?(r=xr("DIV"),r.innerHTML='<svg class="x">'+t+"</svg>",r=r.querySelector(".x")):(r=xr(e.tagName),r.innerHTML=t,"SELECT"===r.tagName&&(s=r.options[r.selectedIndex]));o=r.firstChild;)u.push(o),n.appendChild(o);if("SELECT"===e.tagName)for(a=u.length;a--;)u[a]!==s&&(u[a].selected=!1)}return u},Lp=kr,Ip=_r,Vp=Ar,Wp=Sr,Mp=Cr,Up=Or,zp=function(t){this.type=Jh,ap.init(this,t)};zp.prototype={detach:Tp,find:Fp,findAll:jp,firstNode:Rp,getValue:ap.getValue,rebind:ap.rebind,render:Ip,resolve:ap.resolve,setValue:Vp,toString:Wp,unbind:Vd,unrender:Mp,update:Up};var Bp,$p,qp,Qp,Zp=zp,Hp=function(){this.parentFragment.bubble()},Kp=Pr,Gp=function(t){return this.node?fa(this.node,t)?this.node:this.fragment&&this.fragment.find?this.fragment.find(t):void 0:null},Yp=function(t,e){e._test(this,!0)&&e.live&&(this.liveQueries||(this.liveQueries=[])).push(e),this.fragment&&this.fragment.findAll(t,e)},Jp=function(t,e){this.fragment&&this.fragment.findAllComponents(t,e)},Xp=function(t){return this.fragment?this.fragment.findComponent(t):void 0},tm=Tr,em=Fr,nm=jr,rm=/^true|on|yes|1$/i,im=/^[0-9]+$/,sm=function(t,e){var n,r,i;return i=e.a||{},r={},n=i.twoway,void 0!==n&&(r.twoway=0===n||rm.test(n)),n=i.lazy,void 0!==n&&(r.lazy=0!==n&&im.test(n)?parseInt(n):0===n||rm.test(n)),r},om=Rr;Bp="altGlyph altGlyphDef altGlyphItem animateColor animateMotion animateTransform clipPath feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence foreignObject glyphRef linearGradient radialGradient textPath vkern".split(" "),$p="attributeName attributeType baseFrequency baseProfile calcMode clipPathUnits contentScriptType contentStyleType diffuseConstant edgeMode externalResourcesRequired filterRes filterUnits glyphRef gradientTransform gradientUnits kernelMatrix kernelUnitLength keyPoints keySplines keyTimes lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY repeatCount repeatDur requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox viewTarget xChannelSelector yChannelSelector zoomAndPan".split(" "),qp=function(t){for(var e={},n=t.length;n--;)e[t[n].toLowerCase()]=t[n];return e},Qp=qp(Bp.concat($p));var am=function(t){var e=t.toLowerCase();return Qp[e]||e},um=function(t,e){var n,r;if(n=e.indexOf(":"),-1===n||(r=e.substr(0,n),"xmlns"===r))t.name=t.element.namespace!==ra.html?am(e):e;else if(e=e.substring(n+1),t.name=am(e),t.namespace=ra[r.toLowerCase()],t.namespacePrefix=r,!t.namespace)throw'Unknown namespace ("'+r+'")'},hm=Nr,cm=Dr,lm=Lr,fm=Ir,dm={"accept-charset":"acceptCharset",accesskey:"accessKey",bgcolor:"bgColor","class":"className",codebase:"codeBase",colspan:"colSpan",contenteditable:"contentEditable",datetime:"dateTime",dirname:"dirName","for":"htmlFor","http-equiv":"httpEquiv",ismap:"isMap",maxlength:"maxLength",novalidate:"noValidate",pubdate:"pubDate",readonly:"readOnly",rowspan:"rowSpan",tabindex:"tabIndex",usemap:"useMap"},pm=Vr,mm=Mr,vm=Ur,gm=zr,ym=Br,wm=$r,bm=qr,xm=Qr,km=Zr,Em=Hr,_m=Kr,Am=Gr,Sm=Yr,Cm=Jr,Om=Xr,Pm=function(t){this.init(t)};Pm.prototype={bubble:om,init:cm,rebind:lm,render:fm,toString:pm,unbind:mm,update:Om};var Tm,Fm=Pm,jm=function(t,e){var n,r,i=[];for(n in e)"twoway"!==n&&"lazy"!==n&&e.hasOwnProperty(n)&&(r=new Fm({element:t,name:n,value:e[n],root:t.root}),i[n]=r,"value"!==n&&i.push(r));return(r=i.value)&&i.push(r),i};"undefined"!=typeof document&&(Tm=la("div"));var Rm=function(t,e){this.element=t,this.root=t.root,this.parentFragment=t.parentFragment,this.attributes=[],this.fragment=new xw({root:t.root,owner:this,template:[e]})};Rm.prototype={bubble:function(){this.node&&this.update(),this.element.bubble()},rebind:function(t,e){this.fragment.rebind(t,e)},render:function(t){this.node=t,this.isSvg=t.namespaceURI===ra.svg,this.update()},unbind:function(){this.fragment.unbind()},update:function(){var t,e,n=this;t=this.fragment.toString(),e=ti(t,this.isSvg),this.attributes.filter(function(t){return ei(e,t)}).forEach(function(t){n.node.removeAttribute(t.name)}),e.forEach(function(t){n.node.setAttribute(t.name,t.value)}),this.attributes=e},toString:function(){return this.fragment.toString()}};var Nm=Rm,Dm=function(t,e){return e?e.map(function(e){return new Nm(t,e)}):[]},Lm=function(t){var e,n,r,i;if(this.element=t,this.root=t.root,this.attribute=t.attributes[this.name||"value"],e=this.attribute.interpolator,e.twowayBinding=this,n=e.keypath){if("}"===n.str.slice(-1))return v("Two-way binding does not work with expressions (`%s` on <%s>)",e.resolver.uniqueString,t.name,{ractive:this.root}),!1;if(n.isSpecial)return v("Two-way binding does not work with %s",e.resolver.ref,{ractive:this.root}),!1}else{var s=e.template.r?"'"+e.template.r+"' reference":"expression";m("The %s being used for two-way binding is ambiguous, and may cause unexpected results. Consider initialising your data to eliminate the ambiguity",s,{ractive:this.root}),e.resolver.forceResolution(),n=e.keypath}this.attribute.isTwoway=!0,this.keypath=n,r=this.root.viewmodel.get(n),void 0===r&&this.getInitialValue&&(r=this.getInitialValue(),void 0!==r&&this.root.viewmodel.set(n,r)),(i=ni(t))&&(this.resetValue=r,i.formBindings.push(this))};Lm.prototype={handleChange:function(){var t=this;yu.start(this.root),this.attribute.locked=!0,this.root.viewmodel.set(this.keypath,this.getValue()),yu.scheduleTask(function(){return t.attribute.locked=!1}),yu.end()},rebound:function(){var t,e,n;e=this.keypath,n=this.attribute.interpolator.keypath,e!==n&&(L(this.root._twowayBindings[e.str],this),this.keypath=n,t=this.root._twowayBindings[n.str]||(this.root._twowayBindings[n.str]=[]),t.push(this))},unbind:function(){}},Lm.extend=function(t){var e,n=this;return e=function(t){Lm.call(this,t),this.init&&this.init()},e.prototype=_a(n.prototype),r(e.prototype,t),e.extend=Lm.extend,e};var Im,Vm=Lm,Wm=ri;Im=Vm.extend({getInitialValue:function(){return""},getValue:function(){return this.element.node.value},render:function(){var t,e=this.element.node,n=!1;this.rendered=!0,t=this.root.lazy,this.element.lazy===!0?t=!0:this.element.lazy===!1?t=!1:u(this.element.lazy)?(t=!1,n=+this.element.lazy):u(t||"")&&(n=+t,t=!1,this.element.lazy=n),this.handler=n?si:Wm,e.addEventListener("change",Wm,!1),t||(e.addEventListener("input",this.handler,!1),e.attachEvent&&e.addEventListener("keyup",this.handler,!1)),e.addEventListener("blur",ii,!1)},unrender:function(){var t=this.element.node;this.rendered=!1,t.removeEventListener("change",Wm,!1),t.removeEventListener("input",this.handler,!1),t.removeEventListener("keyup",this.handler,!1),t.removeEventListener("blur",ii,!1)}});var Mm=Im,Um=Mm.extend({getInitialValue:function(){return this.element.fragment?this.element.fragment.toString():""},getValue:function(){return this.element.node.innerHTML}}),zm=Um,Bm=oi,$m={},qm=Vm.extend({name:"checked",init:function(){this.siblings=Bm(this.root._guid,"radio",this.element.getAttribute("name")),this.siblings.push(this)},render:function(){var t=this.element.node;t.addEventListener("change",Wm,!1),t.attachEvent&&t.addEventListener("click",Wm,!1)},unrender:function(){var t=this.element.node;t.removeEventListener("change",Wm,!1),t.removeEventListener("click",Wm,!1)},handleChange:function(){yu.start(this.root),this.siblings.forEach(function(t){t.root.viewmodel.set(t.keypath,t.getValue())}),yu.end()},getValue:function(){return this.element.node.checked},unbind:function(){L(this.siblings,this)}}),Qm=qm,Zm=Vm.extend({name:"name",init:function(){this.siblings=Bm(this.root._guid,"radioname",this.keypath.str),this.siblings.push(this),this.radioName=!0},getInitialValue:function(){return this.element.getAttribute("checked")?this.element.getAttribute("value"):void 0},render:function(){var t=this.element.node;t.name="{{"+this.keypath.str+"}}",t.checked=this.root.viewmodel.get(this.keypath)==this.element.getAttribute("value"),t.addEventListener("change",Wm,!1),t.attachEvent&&t.addEventListener("click",Wm,!1)},unrender:function(){var t=this.element.node;t.removeEventListener("change",Wm,!1),t.removeEventListener("click",Wm,!1)},getValue:function(){var t=this.element.node;return t._ractive?t._ractive.value:t.value},handleChange:function(){this.element.node.checked&&Vm.prototype.handleChange.call(this)},rebound:function(t,e){var n;Vm.prototype.rebound.call(this,t,e),(n=this.element.node)&&(n.name="{{"+this.keypath.str+"}}")},unbind:function(){L(this.siblings,this)}}),Hm=Zm,Km=Vm.extend({name:"name",getInitialValue:function(){return this.noInitialValue=!0,[]},init:function(){var t,e;this.checkboxName=!0,this.siblings=Bm(this.root._guid,"checkboxes",this.keypath.str),this.siblings.push(this),this.noInitialValue&&(this.siblings.noInitialValue=!0),this.siblings.noInitialValue&&this.element.getAttribute("checked")&&(t=this.root.viewmodel.get(this.keypath),e=this.element.getAttribute("value"),t.push(e))},unbind:function(){L(this.siblings,this)},render:function(){var t,e,n=this.element.node;t=this.root.viewmodel.get(this.keypath),e=this.element.getAttribute("value"),this.isChecked=s(t)?j(t,e):t==e,n.name="{{"+this.keypath.str+"}}",n.checked=this.isChecked,n.addEventListener("change",Wm,!1),n.attachEvent&&n.addEventListener("click",Wm,!1)},unrender:function(){var t=this.element.node;t.removeEventListener("change",Wm,!1),t.removeEventListener("click",Wm,!1)},changed:function(){var t=!!this.isChecked;return this.isChecked=this.element.node.checked,this.isChecked===t},handleChange:function(){this.isChecked=this.element.node.checked,Vm.prototype.handleChange.call(this)},getValue:function(){return this.siblings.filter(ai).map(ui)}}),Gm=Km,Ym=Vm.extend({name:"checked",render:function(){var t=this.element.node;t.addEventListener("change",Wm,!1),t.attachEvent&&t.addEventListener("click",Wm,!1)},unrender:function(){var t=this.element.node;t.removeEventListener("change",Wm,!1),t.removeEventListener("click",Wm,!1)},getValue:function(){return this.element.node.checked}}),Jm=Ym,Xm=Vm.extend({getInitialValue:function(){var t,e,n,r,i=this.element.options;if(void 0===this.element.getAttribute("value")&&(e=t=i.length,t)){for(;e--;)if(i[e].getAttribute("selected")){n=i[e].getAttribute("value"),r=!0;break}if(!r)for(;++e<t;)if(!i[e].getAttribute("disabled")){n=i[e].getAttribute("value");break}return void 0!==n&&(this.element.attributes.value.value=n),n}},render:function(){this.element.node.addEventListener("change",Wm,!1)},unrender:function(){this.element.node.removeEventListener("change",Wm,!1)},setValue:function(t){this.root.viewmodel.set(this.keypath,t)},getValue:function(){var t,e,n,r,i;for(t=this.element.node.options,n=t.length,e=0;n>e;e+=1)if(r=t[e],t[e].selected)return i=r._ractive?r._ractive.value:r.value},forceUpdate:function(){var t=this,e=this.getValue();void 0!==e&&(this.attribute.locked=!0,yu.scheduleTask(function(){return t.attribute.locked=!1}),this.root.viewmodel.set(this.keypath,e))}}),tv=Xm,ev=tv.extend({getInitialValue:function(){return this.element.options.filter(function(t){return t.getAttribute("selected")}).map(function(t){return t.getAttribute("value")})},render:function(){var t;this.element.node.addEventListener("change",Wm,!1),t=this.root.viewmodel.get(this.keypath),void 0===t&&this.handleChange()},unrender:function(){this.element.node.removeEventListener("change",Wm,!1)},setValue:function(){throw new Error("TODO not implemented yet")},getValue:function(){var t,e,n,r,i,s;for(t=[],e=this.element.node.options,r=e.length,n=0;r>n;n+=1)i=e[n],i.selected&&(s=i._ractive?i._ractive.value:i.value,t.push(s));return t},handleChange:function(){var t,e,n;return t=this.attribute,e=t.value,n=this.getValue(),void 0!==e&&R(n,e)||tv.prototype.handleChange.call(this),this},forceUpdate:function(){var t=this,e=this.getValue();void 0!==e&&(this.attribute.locked=!0,yu.scheduleTask(function(){return t.attribute.locked=!1}),this.root.viewmodel.set(this.keypath,e))},updateModel:function(){void 0!==this.attribute.value&&this.attribute.value.length||this.root.viewmodel.set(this.keypath,this.initialValue)}}),nv=ev,rv=Vm.extend({render:function(){this.element.node.addEventListener("change",Wm,!1)},unrender:function(){this.element.node.removeEventListener("change",Wm,!1)},getValue:function(){return this.element.node.files}}),iv=rv,sv=Mm.extend({getInitialValue:function(){return void 0},getValue:function(){var t=parseFloat(this.element.node.value);return isNaN(t)?void 0:t}}),ov=hi,av=li,uv=fi,hv=di,cv=pi,lv=/^event(?:\.(.+))?/,fv=yi,dv=wi,pv={},mv={touchstart:!0,touchmove:!0,touchend:!0,touchcancel:!0,touchleave:!0},vv=xi,gv=ki,yv=Ei,wv=_i,bv=Ai,xv=function(t,e,n){this.init(t,e,n)};xv.prototype={bubble:av,fire:uv,getAction:hv,init:cv,listen:dv,rebind:vv,render:gv,resolve:yv,unbind:wv,unrender:bv};var kv=xv,Ev=function(t,e){var n,r,i,s,o=[];for(r in e)if(e.hasOwnProperty(r))for(i=r.split("-"),n=i.length;n--;)s=new kv(t,i[n],e[r]),o.push(s);return o},_v=function(t,e){var n,r,i,s=this;this.element=t,this.root=n=t.root,r=e.n||e,("string"==typeof r||(i=new xw({template:r,root:n,owner:t}),r=i.toString(),i.unbind(),""!==r))&&(e.a?this.params=e.a:e.d&&(this.fragment=new xw({template:e.d,root:n,owner:t}),this.params=this.fragment.getArgsList(),this.fragment.bubble=function(){this.dirtyArgs=this.dirtyValue=!0,s.params=this.getArgsList(),s.ready&&s.update()}),this.fn=g("decorators",n,r),this.fn||l(Va(r,"decorator")))};_v.prototype={init:function(){var t,e,n;if(t=this.element.node,this.params?(n=[t].concat(this.params),e=this.fn.apply(this.root,n)):e=this.fn.call(this.root,t),!e||!e.teardown)throw new Error("Decorator definition must return an object with a teardown method");this.actual=e,this.ready=!0},update:function(){this.actual.update?this.actual.update.apply(this.root,this.params):(this.actual.teardown(!0),this.init())},rebind:function(t,e){this.fragment&&this.fragment.rebind(t,e)},teardown:function(t){this.torndown=!0,this.ready&&this.actual.teardown(),!t&&this.fragment&&this.fragment.unbind()}};var Av,Sv,Cv,Ov=_v,Pv=ji,Tv=Ri,Fv=Wi,jv=function(t){return t.replace(/-([a-zA-Z])/g,function(t,e){return e.toUpperCase()})};Xo?(Sv={},Cv=la("div").style,Av=function(t){var e,n,r;if(t=jv(t),!Sv[t])if(void 0!==Cv[t])Sv[t]=t;else for(r=t.charAt(0).toUpperCase()+t.substring(1),e=sa.length;e--;)if(n=sa[e],void 0!==Cv[n+r]){Sv[t]=n+r;break}return Sv[t]}):Av=null;var Rv,Nv,Dv=Av;Xo?(Nv=window.getComputedStyle||Ca.getComputedStyle,Rv=function(t){var e,n,r,i,o;if(e=Nv(this.node),"string"==typeof t)return o=e[Dv(t)],"0px"===o&&(o=0),o;if(!s(t))throw new Error("Transition$getStyle must be passed a string, or an array of strings representing CSS properties");for(n={},r=t.length;r--;)i=t[r],o=e[Dv(i)],"0px"===o&&(o=0),n[i]=o;return n}):Rv=null;var Lv=Rv,Iv=function(t,e){var n;if("string"==typeof t)this.node.style[Dv(t)]=e;else for(n in t)t.hasOwnProperty(n)&&(this.node.style[Dv(n)]=t[n]);return this},Vv=function(t){var e;this.duration=t.duration,this.step=t.step,this.complete=t.complete,"string"==typeof t.easing?(e=t.root.easing[t.easing],e||(v(Va(t.easing,"easing")),e=Mi)):e="function"==typeof t.easing?t.easing:Mi,this.easing=e,this.start=nu(),this.end=this.start+this.duration,this.running=!0,xu.add(this)};Vv.prototype={tick:function(t){var e,n;return this.running?t>this.end?(this.step&&this.step(1),this.complete&&this.complete(1),!1):(e=t-this.start,n=this.easing(e/this.duration),this.step&&this.step(n),!0):!1},stop:function(){this.abort&&this.abort(),this.running=!1}};var Wv,Mv,Uv,zv,Bv,$v,qv,Qv,Zv=Vv,Hv=new RegExp("^-(?:"+sa.join("|")+")-"),Kv=function(t){return t.replace(Hv,"")},Gv=new RegExp("^(?:"+sa.join("|")+")([A-Z])"),Yv=function(t){var e;return t?(Gv.test(t)&&(t="-"+t),e=t.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()})):""},Jv={},Xv={};Xo?(Mv=la("div").style,function(){void 0!==Mv.transition?(Uv="transition",zv="transitionend",Bv=!0):void 0!==Mv.webkitTransition?(Uv="webkitTransition",zv="webkitTransitionEnd",Bv=!0):Bv=!1}(),Uv&&($v=Uv+"Duration",qv=Uv+"Property",Qv=Uv+"TimingFunction"),Wv=function(t,e,n,r,i){setTimeout(function(){var s,o,a,u,h;u=function(){o&&a&&(t.root.fire(t.name+":end",t.node,t.isIntro),i())},s=(t.node.namespaceURI||"")+t.node.tagName,t.node.style[qv]=r.map(Dv).map(Yv).join(","),t.node.style[Qv]=Yv(n.easing||"linear"),t.node.style[$v]=n.duration/1e3+"s",h=function(e){var n;n=r.indexOf(jv(Kv(e.propertyName))),-1!==n&&r.splice(n,1),r.length||(t.node.removeEventListener(zv,h,!1),a=!0,u())},t.node.addEventListener(zv,h,!1),setTimeout(function(){for(var i,c,l,f,d,p=r.length,v=[];p--;)f=r[p],i=s+f,Bv&&!Xv[i]&&(t.node.style[Dv(f)]=e[f],Jv[i]||(c=t.getStyle(f),Jv[i]=t.getStyle(f)!=e[f],Xv[i]=!Jv[i],Xv[i]&&(t.node.style[Dv(f)]=c))),(!Bv||Xv[i])&&(void 0===c&&(c=t.getStyle(f)),l=r.indexOf(f),-1===l?m("Something very strange happened with transitions. Please raise an issue at https://github.com/ractivejs/ractive/issues - thanks!",{node:t.node}):r.splice(l,1),d=/[^\d]*$/.exec(e[f])[0],v.push({name:Dv(f),interpolator:Ma(parseFloat(c),parseFloat(e[f])),suffix:d}));v.length?new Zv({root:t.root,duration:n.duration,easing:jv(n.easing||""),step:function(e){var n,r;for(r=v.length;r--;)n=v[r],t.node.style[n.name]=n.interpolator(e)+n.suffix},complete:function(){o=!0,u()}}):o=!0,r.length||(t.node.removeEventListener(zv,h,!1),a=!0,u())},0)},n.delay||0)}):Wv=null;var tg,eg,ng,rg,ig,sg=Wv;if("undefined"!=typeof document){if(tg="hidden",ig={},tg in document)ng="";else for(rg=sa.length;rg--;)eg=sa[rg],tg=eg+"Hidden",tg in document&&(ng=eg);void 0!==ng?(document.addEventListener(ng+"visibilitychange",Ui),Ui()):("onfocusout"in document?(document.addEventListener("focusout",zi),document.addEventListener("focusin",Bi)):(window.addEventListener("pagehide",zi),window.addEventListener("blur",zi),window.addEventListener("pageshow",Bi),window.addEventListener("focus",Bi)),ig.hidden=!1)}var og,ag,ug,hg=ig;Xo?(ag=window.getComputedStyle||Ca.getComputedStyle,og=function(t,e,n){var r,i=this;if(4===arguments.length)throw new Error("t.animateStyle() returns a promise - use .then() instead of passing a callback");if(hg.hidden)return this.setStyle(t,e),ug||(ug=hu.resolve());"string"==typeof t?(r={},r[t]=e):(r=t,n=e),n||(v('The "%s" transition does not supply an options object to `t.animateStyle()`. This will break in a future version of Ractive. For more info see https://github.com/RactiveJS/Ractive/issues/340',this.name),n=this);var s=new hu(function(t){var e,s,o,a,u,h,c;if(!n.duration)return i.setStyle(r),void t();for(e=Object.keys(r),s=[],o=ag(i.node),u={},h=e.length;h--;)c=e[h],a=o[Dv(c)],"0px"===a&&(a=0),a!=r[c]&&(s.push(c),i.node.style[Dv(c)]=a);return s.length?void sg(i,r,n,s,t):void t()});return s}):og=null;var cg=og,lg=function(t,e){return"number"==typeof t?t={duration:t}:"string"==typeof t?t="slow"===t?{duration:600}:"fast"===t?{duration:200}:{duration:400}:t||(t={}),i({},t,e)},fg=$i,dg=function(t,e,n){this.init(t,e,n)};dg.prototype={init:Fv,start:fg,getStyle:Lv,setStyle:Iv,animateStyle:cg,processParams:lg};var pg,mg,vg=dg,gg=Qi;pg=function(){var t=this.node,e=this.fragment.toString(!1);if(window&&window.appearsToBeIELessEqual8&&(t.type="text/css"),t.styleSheet)t.styleSheet.cssText=e;else{for(;t.hasChildNodes();)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}},mg=function(){this.node.type&&"text/javascript"!==this.node.type||m("Script tag was updated. This does not cause the code to be re-evaluated!",{ractive:this.root}),this.node.text=this.fragment.toString(!1)};var yg=function(){var t,e;return this.template.y?"<!DOCTYPE"+this.template.dd+">":(t="<"+this.template.e,t+=this.attributes.map(Ji).join("")+this.conditionalAttributes.map(Ji).join(""),"option"===this.name&&Gi(this)&&(t+=" selected"),"input"===this.name&&Yi(this)&&(t+=" checked"),t+=">","textarea"===this.name&&void 0!==this.getAttribute("value")?t+=Se(this.getAttribute("value")):void 0!==this.getAttribute("contenteditable")&&(t+=this.getAttribute("value")||""),this.fragment&&(e="script"!==this.name&&"style"!==this.name,t+=this.fragment.toString(e)),kl.test(this.template.e)||(t+="</"+this.template.e+">"),t)},wg=Xi,bg=ts,xg=function(t){this.init(t)};xg.prototype={bubble:Hp,detach:Kp,find:Gp,findAll:Yp,findAllComponents:Jp,findComponent:Xp,findNextNode:tm,firstNode:em,getAttribute:nm,init:Pv,rebind:Tv,render:gg,toString:yg,unbind:wg,unrender:bg};var kg=xg,Eg=/^\s*$/,_g=/^\s*/,Ag=function(t){var e,n,r,i;return e=t.split("\n"),n=e[0],void 0!==n&&Eg.test(n)&&e.shift(),r=D(e),void 0!==r&&Eg.test(r)&&e.pop(),i=e.reduce(ns,null),i&&(t=e.map(function(t){return t.replace(i,"")}).join("\n")),t},Sg=rs,Cg=function(t,e){var n;return e?n=t.split("\n").map(function(t,n){return n?e+t:t}).join("\n"):t},Og='Could not find template for partial "%s"',Pg=function(t){var e,n;e=this.parentFragment=t.parentFragment,this.root=e.root,this.type=rc,this.index=t.index,this.name=t.template.r,this.rendered=!1,this.fragment=this.fragmentToRender=this.fragmentToUnrender=null,ap.init(this,t),this.keypath||((n=Sg(this.root,this.name,e))?(Vd.call(this),this.isNamed=!0,this.setTemplate(n)):v(Og,this.name))};Pg.prototype={bubble:function(){this.parentFragment.bubble()},detach:function(){return this.fragment.detach()},find:function(t){return this.fragment.find(t)},findAll:function(t,e){return this.fragment.findAll(t,e)},findComponent:function(t){return this.fragment.findComponent(t)},findAllComponents:function(t,e){return this.fragment.findAllComponents(t,e)},firstNode:function(){return this.fragment.firstNode()},findNextNode:function(){return this.parentFragment.findNextNode(this)},getPartialName:function(){return this.isNamed&&this.name?this.name:void 0===this.value?this.name:this.value},getValue:function(){return this.fragment.getValue()},rebind:function(t,e){this.isNamed||op.call(this,t,e),this.fragment&&this.fragment.rebind(t,e)},render:function(){return this.docFrag=document.createDocumentFragment(),this.update(),this.rendered=!0,this.docFrag},resolve:ap.resolve,setValue:function(t){var e;(void 0===t||t!==this.value)&&(void 0!==t&&(e=Sg(this.root,""+t,this.parentFragment)),!e&&this.name&&(e=Sg(this.root,this.name,this.parentFragment))&&(Vd.call(this),this.isNamed=!0),e||v(Og,this.name,{ractive:this.root}),this.value=t,this.setTemplate(e||[]),this.bubble(),this.rendered&&yu.addView(this))},setTemplate:function(t){this.fragment&&(this.fragment.unbind(),this.rendered&&(this.fragmentToUnrender=this.fragment)),this.fragment=new xw({template:t,root:this.root,owner:this,pElement:this.parentFragment.pElement}),this.fragmentToRender=this.fragment},toString:function(t){var e,n,r,i;return e=this.fragment.toString(t),n=this.parentFragment.items[this.index-1],n&&n.type===Gh?(r=n.text.split("\n").pop(),(i=/^\s+$/.exec(r))?Cg(e,i[0]):e):e},unbind:function(){this.isNamed||Vd.call(this),this.fragment&&this.fragment.unbind()},unrender:function(t){this.rendered&&(this.fragment&&this.fragment.unrender(t),this.rendered=!1)},update:function(){var t,e;this.fragmentToUnrender&&(this.fragmentToUnrender.unrender(!0),this.fragmentToUnrender=null),this.fragmentToRender&&(this.docFrag.appendChild(this.fragmentToRender.render()),this.fragmentToRender=null),this.rendered&&(t=this.parentFragment.getNode(),e=this.parentFragment.findNextNode(this),t.insertBefore(this.docFrag,e))}};var Tg,Fg,jg,Rg=Pg,Ng=us,Dg=hs,Lg=new su("detach"),Ig=cs,Vg=ls,Wg=fs,Mg=ds,Ug=ps,zg=ms,Bg=function(t,e,n,r){var i=t.root,s=t.keypath;r?i.viewmodel.smartUpdate(s,e,r):i.viewmodel.mark(s)},$g=[],qg=["pop","push","reverse","shift","sort","splice","unshift"];qg.forEach(function(t){var e=function(){for(var e=arguments.length,n=Array(e),r=0;e>r;r++)n[r]=arguments[r];var i,s,o,a;for(i=yh(this,t,n),s=Array.prototype[t].apply(this,arguments),yu.start(),this._ractive.setting=!0,a=this._ractive.wrappers.length;a--;)o=this._ractive.wrappers[a],yu.addRactive(o.root),Bg(o,this,t,i);return yu.end(),this._ractive.setting=!1,s};Aa($g,t,{value:e})}),Tg={},Tg.__proto__?(Fg=function(t){t.__proto__=$g},jg=function(t){t.__proto__=Array.prototype}):(Fg=function(t){var e,n;for(e=qg.length;e--;)n=qg[e],Aa(t,n,{value:$g[n],configurable:!0})},jg=function(t){var e;for(e=qg.length;e--;)delete t[qg[e]]}),Fg.unpatch=jg;var Qg,Zg,Hg,Kg=Fg;Qg={filter:function(t){return s(t)&&(!t._ractive||!t._ractive.setting)},wrap:function(t,e,n){return new Zg(t,e,n)}},Zg=function(t,e,n){this.root=t,this.value=e,this.keypath=_(n),e._ractive||(Aa(e,"_ractive",{value:{wrappers:[],instances:[],setting:!1},configurable:!0}),Kg(e)),e._ractive.instances[t._guid]||(e._ractive.instances[t._guid]=0,e._ractive.instances.push(t)),e._ractive.instances[t._guid]+=1,e._ractive.wrappers.push(this)},Zg.prototype={get:function(){return this.value},teardown:function(){var t,e,n,r,i;if(t=this.value,e=t._ractive,n=e.wrappers,r=e.instances,e.setting)return!1;if(i=n.indexOf(this),-1===i)throw new Error(Hg);if(n.splice(i,1),n.length){if(r[this.root._guid]-=1,!r[this.root._guid]){if(i=r.indexOf(this.root),-1===i)throw new Error(Hg);r.splice(i,1)}}else delete t._ractive,Kg.unpatch(this.value)}},Hg="Something went wrong in a rather interesting way";var Gg,Yg,Jg=Qg,Xg=/^\s*[0-9]+\s*$/,ty=function(t){return Xg.test(t)?[]:{}};try{Object.defineProperty({},"test",{value:0}),Gg={filter:function(t,e,n){var r,i;return e?(e=_(e),(r=n.viewmodel.wrapped[e.parent.str])&&!r.magic?!1:(i=n.viewmodel.get(e.parent),s(i)&&/^[0-9]+$/.test(e.lastKey)?!1:i&&("object"==typeof i||"function"==typeof i))):!1},wrap:function(t,e,n){return new Yg(t,e,n)}},Yg=function(t,e,n){var r,i,s;return n=_(n),this.magic=!0,this.ractive=t,this.keypath=n,this.value=e,this.prop=n.lastKey,r=n.parent,this.obj=r.isRoot?t.viewmodel.data:t.viewmodel.get(r),i=this.originalDescriptor=Object.getOwnPropertyDescriptor(this.obj,this.prop),i&&i.set&&(s=i.set._ractiveWrappers)?void(-1===s.indexOf(this)&&s.push(this)):void vs(this,e,i)},Yg.prototype={get:function(){return this.value},reset:function(t){return this.updating?void 0:(this.updating=!0,this.obj[this.prop]=t,yu.addRactive(this.ractive),this.ractive.viewmodel.mark(this.keypath,{keepExistingWrapper:!0}),this.updating=!1,!0)},set:function(t,e){this.updating||(this.obj[this.prop]||(this.updating=!0,this.obj[this.prop]=ty(t),this.updating=!1),this.obj[this.prop][t]=e)},teardown:function(){var t,e,n,r,i;return this.updating?!1:(t=Object.getOwnPropertyDescriptor(this.obj,this.prop),e=t&&t.set,void(e&&(r=e._ractiveWrappers,i=r.indexOf(this),-1!==i&&r.splice(i,1),r.length||(n=this.obj[this.prop],Object.defineProperty(this.obj,this.prop,this.originalDescriptor||{writable:!0,enumerable:!0,configurable:!0}),this.obj[this.prop]=n))))}}}catch(Oa){Gg=!1}var ey,ny,ry=Gg;ry&&(ey={filter:function(t,e,n){return ry.filter(t,e,n)&&Jg.filter(t)},wrap:function(t,e,n){return new ny(t,e,n)}},ny=function(t,e,n){this.value=e,this.magic=!0,this.magicWrapper=ry.wrap(t,e,n),this.arrayWrapper=Jg.wrap(t,e,n)},ny.prototype={get:function(){return this.value},teardown:function(){this.arrayWrapper.teardown(),this.magicWrapper.teardown()},reset:function(t){return this.magicWrapper.reset(t)}});var iy=ey,sy=gs,oy={},ay=bs,uy=xs,hy=_s,cy=Ps,ly=Ts,fy=function(t,e){this.computation=t,this.viewmodel=t.viewmodel,this.ref=e,this.root=this.viewmodel.ractive,this.parentFragment=this.root.component&&this.root.component.parentFragment};fy.prototype={resolve:function(t){this.computation.softDeps.push(t),this.computation.unresolvedDeps[t.str]=null,this.viewmodel.register(t,this.computation,"computed")}};var dy=fy,py=function(t,e){this.key=t,this.getter=e.getter,this.setter=e.setter,this.hardDeps=e.deps||[],this.softDeps=[],this.unresolvedDeps={},this.depValues={},this._dirty=this._firstRun=!0};py.prototype={constructor:py,init:function(t){var e,n=this;this.viewmodel=t,this.bypass=!0,e=t.get(this.key),t.clearCache(this.key.str),this.bypass=!1,this.setter&&void 0!==e&&this.set(e),this.hardDeps&&this.hardDeps.forEach(function(e){return t.register(e,n,"computed")})},invalidate:function(){this._dirty=!0},get:function(){var t,e,n=this,r=!1;if(this.getting){var i="The "+this.key.str+" computation indirectly called itself. This probably indicates a bug in the computation. It is commonly caused by `array.sort(...)` - if that's the case, clone the array first with `array.slice().sort(...)`";return p(i),this.value}if(this.getting=!0,this._dirty){if(this._firstRun||!this.hardDeps.length&&!this.softDeps.length?r=!0:[this.hardDeps,this.softDeps].forEach(function(t){var e,i,s;if(!r)for(s=t.length;s--;)if(e=t[s],i=n.viewmodel.get(e),!a(i,n.depValues[e.str]))return n.depValues[e.str]=i,void(r=!0)}),r){this.viewmodel.capture();try{this.value=this.getter()}catch(s){m('Failed to compute "%s"',this.key.str),f(s.stack||s),this.value=void 0}t=this.viewmodel.release(),e=this.updateDependencies(t),e&&[this.hardDeps,this.softDeps].forEach(function(t){t.forEach(function(t){n.depValues[t.str]=n.viewmodel.get(t)})})}this._dirty=!1}return this.getting=this._firstRun=!1,this.value},set:function(t){if(this.setting)return void(this.value=t);if(!this.setter)throw new Error("Computed properties without setters are read-only. (This may change in a future version of Ractive!)");this.setter(t)},updateDependencies:function(t){var e,n,r,i,s;for(n=this.softDeps,e=n.length;e--;)r=n[e],-1===t.indexOf(r)&&(i=!0,this.viewmodel.unregister(r,this,"computed"));for(e=t.length;e--;)r=t[e],-1!==n.indexOf(r)||this.hardDeps&&-1!==this.hardDeps.indexOf(r)||(i=!0,Fs(this.viewmodel,r)&&!this.unresolvedDeps[r.str]?(s=new dy(this,r.str),t.splice(e,1),this.unresolvedDeps[r.str]=s,yu.addUnresolved(s)):this.viewmodel.register(r,this,"computed"));return i&&(this.softDeps=t.slice()),i}};var my=py,vy=js,gy={FAILED_LOOKUP:!0},yy=Rs,wy={},by=Ds,xy=Ls,ky=function(t,e){this.localKey=t,this.keypath=e.keypath,this.origin=e.origin,this.deps=[],this.unresolved=[],this.resolved=!1};ky.prototype={forceResolution:function(){
this.keypath=this.localKey,this.setup()},get:function(t,e){return this.resolved?this.origin.get(this.map(t),e):void 0},getValue:function(){return this.keypath?this.origin.get(this.keypath):void 0},initViewmodel:function(t){this.local=t,this.setup()},map:function(t){return void 0===typeof this.keypath?this.localKey:t.replace(this.localKey,this.keypath)},register:function(t,e,n){this.deps.push({keypath:t,dep:e,group:n}),this.resolved&&this.origin.register(this.map(t),e,n)},resolve:function(t){void 0!==this.keypath&&this.unbind(!0),this.keypath=t,this.setup()},set:function(t,e){this.resolved||this.forceResolution(),this.origin.set(this.map(t),e)},setup:function(){var t=this;void 0!==this.keypath&&(this.resolved=!0,this.deps.length&&(this.deps.forEach(function(e){var n=t.map(e.keypath);if(t.origin.register(n,e.dep,e.group),e.dep.setValue)e.dep.setValue(t.origin.get(n));else{if(!e.dep.invalidate)throw new Error("An unexpected error occurred. Please raise an issue at https://github.com/ractivejs/ractive/issues - thanks!");e.dep.invalidate()}}),this.origin.mark(this.keypath)))},setValue:function(t){if(!this.keypath)throw new Error("Mapping does not have keypath, cannot set value. Please raise an issue at https://github.com/ractivejs/ractive/issues - thanks!");this.origin.set(this.keypath,t)},unbind:function(t){var e=this;t||delete this.local.mappings[this.localKey],this.resolved&&(this.deps.forEach(function(t){e.origin.unregister(e.map(t.keypath),t.dep,t.group)}),this.tracker&&this.origin.unregister(this.keypath,this.tracker))},unregister:function(t,e,n){var r,i;if(this.resolved){for(r=this.deps,i=r.length;i--;)if(r[i].dep===e){r.splice(i,1);break}this.origin.unregister(this.map(t),e,n)}}};var Ey=Is,_y=function(t,e){var n,r,i,s;return n={},r=0,i=t.map(function(t,i){var o,a,u;a=r,u=e.length;do{if(o=e.indexOf(t,a),-1===o)return s=!0,-1;a=o+1}while(n[o]&&u>a);return o===r&&(r+=1),o!==i&&(s=!0),n[o]=!0,o})},Ay=Vs,Sy={},Cy=Us,Oy=Bs,Py=$s,Ty=qs,Fy=Zs,jy={implicit:!0},Ry={noCascade:!0},Ny=Ks,Dy=Gs,Ly=function(t){var e,n,r=t.adapt,i=t.data,s=t.ractive,o=t.computed,a=t.mappings;this.ractive=s,this.adaptors=r,this.onchange=t.onchange,this.cache={},this.cacheMap=_a(null),this.deps={computed:_a(null),"default":_a(null)},this.depsMap={computed:_a(null),"default":_a(null)},this.patternObservers=[],this.specials=_a(null),this.wrapped=_a(null),this.computations=_a(null),this.captureGroups=[],this.unresolvedImplicitDependencies=[],this.changes=[],this.implicitChanges={},this.noCascade={},this.data=i,this.mappings=_a(null);for(e in a)this.map(_(e),a[e]);if(i)for(e in i)(n=this.mappings[e])&&void 0===n.getValue()&&n.setValue(i[e]);for(e in o)a&&e in a&&l("Cannot map to a computed property ('%s')",e),this.compute(_(e),o[e]);this.ready=!0};Ly.prototype={adapt:sy,applyChanges:hy,capture:cy,clearCache:ly,compute:vy,get:yy,init:by,map:xy,mark:Ey,merge:Ay,register:Cy,release:Oy,reset:Py,set:Ty,smartUpdate:Fy,teardown:Ny,unregister:Dy};var Iy=Ly;Js.prototype={constructor:Js,begin:function(t){this.inProcess[t._guid]=!0},end:function(t){var e=t.parent;e&&this.inProcess[e._guid]?Xs(this.queue,e).push(t):to(this,t),delete this.inProcess[t._guid]}};var Vy=Js,Wy=eo,My=/\$\{([^\}]+)\}/g,Uy=new su("construct"),zy=new su("config"),By=new Vy("init"),$y=0,qy=["adaptors","components","decorators","easing","events","interpolators","partials","transitions"],Qy=so,Zy=co;co.prototype={bubble:function(){this.dirty||(this.dirty=!0,yu.addView(this))},update:function(){this.callback(this.fragment.getValue()),this.dirty=!1},rebind:function(t,e){this.fragment.rebind(t,e)},unbind:function(){this.fragment.unbind()}};var Hy=function(t,e,n,i,o){var a,u,h,c,l,f,d={},p={},v={},g=[];for(u=t.parentFragment,h=t.root,o=o||{},r(d,o),o.content=i||[],d[""]=o.content,e.defaults.el&&m("The <%s/> component has a default `el` property; it has been disregarded",t.name),c=u;c;){if(c.owner.type===hc){l=c.owner.container;break}c=c.parent}return n&&Object.keys(n).forEach(function(e){var r,i,o=n[e];if("string"==typeof o)r=Of(o),p[e]=r?r.value:o;else if(0===o)p[e]=!0;else{if(!s(o))throw new Error("erm wut");fo(o)?(v[e]={origin:t.root.viewmodel,keypath:void 0},i=lo(t,o[0],function(t){t.isSpecial?f?a.set(e,t.value):(p[e]=t.value,delete v[e]):f?a.viewmodel.mappings[e].resolve(t):v[e].keypath=t})):i=new Zy(t,o,function(t){f?a.set(e,t):p[e]=t}),g.push(i)}}),a=_a(e.prototype),Qy(a,{el:null,append:!0,data:p,partials:o,magic:h.magic||e.defaults.magic,modifyArrays:h.modifyArrays,adapt:h.adapt},{parent:h,component:t,container:l,mappings:v,inlinePartials:d,cssIds:u.cssIds}),f=!0,t.resolvers=g,a},Ky=po,Gy=function(t){var e,n;for(e=t.root;e;)(n=e._liveComponentQueries["_"+t.name])&&n.push(t.instance),e=e.parent},Yy=vo,Jy=go,Xy=yo,tw=wo,ew=bo,nw=new su("teardown"),rw=ko,iw=function(t,e){this.init(t,e)};iw.prototype={detach:Dg,find:Ig,findAll:Vg,findAllComponents:Wg,findComponent:Mg,findNextNode:Ug,firstNode:zg,init:Yy,rebind:Jy,render:Xy,toString:tw,unbind:ew,unrender:rw};var sw=iw,ow=function(t){this.type=ic,this.value=t.template.c};ow.prototype={detach:Dd,firstNode:function(){return this.node},render:function(){return this.node||(this.node=document.createComment(this.value)),this.node},toString:function(){return"<!--"+this.value+"-->"},unrender:function(t){t&&this.node.parentNode.removeChild(this.node)}};var aw=ow,uw=function(t){var e,n;this.type=hc,this.container=e=t.parentFragment.root,this.component=n=e.component,this.container=e,this.containerFragment=t.parentFragment,this.parentFragment=n.parentFragment;var r=this.name=t.template.n||"",i=e._inlinePartials[r];i||(m('Could not find template for partial "'+r+'"',{ractive:t.root}),i=[]),this.fragment=new xw({owner:this,root:e.parent,template:i,pElement:this.containerFragment.pElement}),s(n.yielders[r])?n.yielders[r].push(this):n.yielders[r]=[this],yu.scheduleTask(function(){if(n.yielders[r].length>1)throw new Error("A component template can only have one {{yield"+(r?" "+r:"")+"}} declaration at a time")})};uw.prototype={detach:function(){return this.fragment.detach()},find:function(t){return this.fragment.find(t)},findAll:function(t,e){return this.fragment.findAll(t,e)},findComponent:function(t){return this.fragment.findComponent(t)},findAllComponents:function(t,e){return this.fragment.findAllComponents(t,e)},findNextNode:function(){return this.containerFragment.findNextNode(this)},firstNode:function(){return this.fragment.firstNode()},getValue:function(t){return this.fragment.getValue(t)},render:function(){return this.fragment.render()},unbind:function(){this.fragment.unbind()},unrender:function(t){this.fragment.unrender(t),L(this.component.yielders[this.name],this)},rebind:function(t,e){this.fragment.rebind(t,e)},toString:function(){return this.fragment.toString()}};var hw=uw,cw=function(t){this.declaration=t.template.a};cw.prototype={init:Ea,render:Ea,unrender:Ea,teardown:Ea,toString:function(){return"<!DOCTYPE"+this.declaration+">"}};var lw=cw,fw=Eo,dw=Ao,pw=So,mw=Co,vw=To,gw=jo,yw=function(t){this.init(t)};yw.prototype={bubble:Ed,detach:_d,find:Ad,findAll:Sd,findAllComponents:Cd,findComponent:Od,findNextNode:Pd,firstNode:Td,getArgsList:jd,getNode:Rd,getValue:Nd,init:fw,rebind:dw,registerIndexRef:function(t){var e=this.registeredIndexRefs;-1===e.indexOf(t)&&e.push(t)},render:pw,toString:mw,unbind:vw,unregisterIndexRef:function(t){var e=this.registeredIndexRefs;e.splice(e.indexOf(t),1)},unrender:gw};var ww,bw,xw=yw,kw=Ro,Ew=["template","partials","components","decorators","events"],_w=new su("reset"),Aw=function(t,e){function n(e,r,i){i&&i.partials[t]||e.forEach(function(e){e.type===rc&&e.getPartialName()===t&&r.push(e),e.fragment&&n(e.fragment.items,r,i),s(e.fragments)?n(e.fragments,r,i):s(e.items)?n(e.items,r,i):e.type===uc&&e.instance&&n(e.instance.fragment.items,r,e.instance),e.type===nc&&(s(e.attributes)&&n(e.attributes,r,i),s(e.conditionalAttributes)&&n(e.conditionalAttributes,r,i))})}var r,i=[];return n(this.fragment.items,i),this.partials[t]=e,r=yu.start(this,!0),i.forEach(function(e){e.value=void 0,e.setValue(t)}),yu.end(),r},Sw=No,Cw=bh("reverse"),Ow=Do,Pw=bh("shift"),Tw=bh("sort"),Fw=bh("splice"),jw=Io,Rw=Vo,Nw=new su("teardown"),Dw=Mo,Lw=Uo,Iw=zo,Vw=new su("unrender"),Ww=bh("unshift"),Mw=Bo,Uw=new su("update"),zw=$o,Bw={add:Xa,animate:_u,detach:Su,find:Ou,findAll:Iu,findAllComponents:Vu,findComponent:Wu,findContainer:Mu,findParent:Uu,fire:qu,get:Qu,insert:Hu,merge:Gu,observe:lh,observeOnce:fh,off:mh,on:vh,once:gh,pop:xh,push:kh,render:Ph,reset:kw,resetPartial:Aw,resetTemplate:Sw,reverse:Cw,set:Ow,shift:Pw,sort:Tw,splice:Fw,subtract:jw,teardown:Rw,toggle:Dw,toHTML:Lw,toHtml:Lw,unrender:Iw,unshift:Ww,update:Mw,updateModel:zw},$w=function(t,e,n){return n||Qo(t,e)?function(){var n,r="_super"in this,i=this._super;return this._super=e,n=t.apply(this,arguments),r&&(this._super=i),n}:t},qw=Zo,Qw=Yo,Zw=function(t){var e,n,r={};return t&&(e=t._ractive)?(r.ractive=e.root,r.keypath=e.keypath.str,r.index={},(n=Zd(e.proxy.parentFragment))&&(r.index=Zd.resolve(n)),r):r};ww=function(t){return this instanceof ww?void Qy(this,t):new ww(t)},bw={DEBUG:{writable:!0,value:!0},DEBUG_PROMISES:{writable:!0,value:!0},extend:{value:Qw},getNodeInfo:{value:Zw},parse:{value:Jf},Promise:{value:hu},svg:{value:ia},magic:{value:na},VERSION:{value:"0.7.3"},adaptors:{writable:!0,value:{}},components:{writable:!0,value:{}},decorators:{writable:!0,value:{}},easing:{writable:!0,value:ha},events:{writable:!0,value:{}},interpolators:{writable:!0,value:za},partials:{writable:!0,value:{}},transitions:{writable:!0,value:{}}},Sa(ww,bw),ww.prototype=r(Bw,ua),ww.prototype.constructor=ww,ww.defaults=ww.prototype;var Hw="function";if(typeof Date.now!==Hw||typeof String.prototype.trim!==Hw||typeof Object.keys!==Hw||typeof Array.prototype.indexOf!==Hw||typeof Array.prototype.forEach!==Hw||typeof Array.prototype.map!==Hw||typeof Array.prototype.filter!==Hw||"undefined"!=typeof window&&typeof window.addEventListener!==Hw)throw new Error("It looks like you're attempting to use Ractive.js in an older browser. You'll need to use one of the 'legacy builds' in order to continue - see http://docs.ractivejs.org/latest/legacy-builds for more information.");var Kw=ww;return Kw});
//# sourceMappingURL=ractive-legacy.min.js.map

/*!
 * Select2 4.0.0
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function (jQuery) {
  // This is needed so we can catch the AMD loader configuration and use it
  // The inner file should be wrapped (by `banner.start.js`) in a function that
  // returns the AMD loader references.
  var S2 =
(function () {
  // Restore the Select2 AMD loader so it can be used
  // Needed mostly in the language files, where the loader is not inserted
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
    var S2 = jQuery.fn.select2.amd;
  }
var S2;(function () { if (!S2 || !S2.requirejs) {
if (!S2) { S2 = {}; } else { require = S2; }
/**
 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                name = baseParts.concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

S2.requirejs = requirejs;S2.require = require;S2.define = define;
}
}());
S2.define("almond", function(){});

/* global jQuery:false, $:false */
S2.define('jquery',[],function () {
  var _$ = jQuery || $;

  if (_$ == null && console && console.error) {
    console.error(
      'Select2: An instance of jQuery or a jQuery-compatible library was not ' +
      'found. Make sure that you are including jQuery before Select2 on your ' +
      'web page.'
    );
  }

  return _$;
});

S2.define('select2/utils',[
  'jquery'
], function ($) {
  var Utils = {};

  Utils.Extend = function (ChildClass, SuperClass) {
    var __hasProp = {}.hasOwnProperty;

    function BaseConstructor () {
      this.constructor = ChildClass;
    }

    for (var key in SuperClass) {
      if (__hasProp.call(SuperClass, key)) {
        ChildClass[key] = SuperClass[key];
      }
    }

    BaseConstructor.prototype = SuperClass.prototype;
    ChildClass.prototype = new BaseConstructor();
    ChildClass.__super__ = SuperClass.prototype;

    return ChildClass;
  };

  function getMethods (theClass) {
    var proto = theClass.prototype;

    var methods = [];

    for (var methodName in proto) {
      var m = proto[methodName];

      if (typeof m !== 'function') {
        continue;
      }

      if (methodName === 'constructor') {
        continue;
      }

      methods.push(methodName);
    }

    return methods;
  }

  Utils.Decorate = function (SuperClass, DecoratorClass) {
    var decoratedMethods = getMethods(DecoratorClass);
    var superMethods = getMethods(SuperClass);

    function DecoratedClass () {
      var unshift = Array.prototype.unshift;

      var argCount = DecoratorClass.prototype.constructor.length;

      var calledConstructor = SuperClass.prototype.constructor;

      if (argCount > 0) {
        unshift.call(arguments, SuperClass.prototype.constructor);

        calledConstructor = DecoratorClass.prototype.constructor;
      }

      calledConstructor.apply(this, arguments);
    }

    DecoratorClass.displayName = SuperClass.displayName;

    function ctr () {
      this.constructor = DecoratedClass;
    }

    DecoratedClass.prototype = new ctr();

    for (var m = 0; m < superMethods.length; m++) {
        var superMethod = superMethods[m];

        DecoratedClass.prototype[superMethod] =
          SuperClass.prototype[superMethod];
    }

    var calledMethod = function (methodName) {
      // Stub out the original method if it's not decorating an actual method
      var originalMethod = function () {};

      if (methodName in DecoratedClass.prototype) {
        originalMethod = DecoratedClass.prototype[methodName];
      }

      var decoratedMethod = DecoratorClass.prototype[methodName];

      return function () {
        var unshift = Array.prototype.unshift;

        unshift.call(arguments, originalMethod);

        return decoratedMethod.apply(this, arguments);
      };
    };

    for (var d = 0; d < decoratedMethods.length; d++) {
      var decoratedMethod = decoratedMethods[d];

      DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
    }

    return DecoratedClass;
  };

  var Observable = function () {
    this.listeners = {};
  };

  Observable.prototype.on = function (event, callback) {
    this.listeners = this.listeners || {};

    if (event in this.listeners) {
      this.listeners[event].push(callback);
    } else {
      this.listeners[event] = [callback];
    }
  };

  Observable.prototype.trigger = function (event) {
    var slice = Array.prototype.slice;

    this.listeners = this.listeners || {};

    if (event in this.listeners) {
      this.invoke(this.listeners[event], slice.call(arguments, 1));
    }

    if ('*' in this.listeners) {
      this.invoke(this.listeners['*'], arguments);
    }
  };

  Observable.prototype.invoke = function (listeners, params) {
    for (var i = 0, len = listeners.length; i < len; i++) {
      listeners[i].apply(this, params);
    }
  };

  Utils.Observable = Observable;

  Utils.generateChars = function (length) {
    var chars = '';

    for (var i = 0; i < length; i++) {
      var randomChar = Math.floor(Math.random() * 36);
      chars += randomChar.toString(36);
    }

    return chars;
  };

  Utils.bind = function (func, context) {
    return function () {
      func.apply(context, arguments);
    };
  };

  Utils._convertData = function (data) {
    for (var originalKey in data) {
      var keys = originalKey.split('-');

      var dataLevel = data;

      if (keys.length === 1) {
        continue;
      }

      for (var k = 0; k < keys.length; k++) {
        var key = keys[k];

        // Lowercase the first letter
        // By default, dash-separated becomes camelCase
        key = key.substring(0, 1).toLowerCase() + key.substring(1);

        if (!(key in dataLevel)) {
          dataLevel[key] = {};
        }

        if (k == keys.length - 1) {
          dataLevel[key] = data[originalKey];
        }

        dataLevel = dataLevel[key];
      }

      delete data[originalKey];
    }

    return data;
  };

  Utils.hasScroll = function (index, el) {
    // Adapted from the function created by @ShadowScripter
    // and adapted by @BillBarry on the Stack Exchange Code Review website.
    // The original code can be found at
    // http://codereview.stackexchange.com/q/13338
    // and was designed to be used with the Sizzle selector engine.

    var $el = $(el);
    var overflowX = el.style.overflowX;
    var overflowY = el.style.overflowY;

    //Check both x and y declarations
    if (overflowX === overflowY &&
        (overflowY === 'hidden' || overflowY === 'visible')) {
      return false;
    }

    if (overflowX === 'scroll' || overflowY === 'scroll') {
      return true;
    }

    return ($el.innerHeight() < el.scrollHeight ||
      $el.innerWidth() < el.scrollWidth);
  };

  Utils.escapeMarkup = function (markup) {
    var replaceMap = {
      '\\': '&#92;',
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#39;',
      '/': '&#47;'
    };

    // Do not try to escape the markup if it's not a string
    if (typeof markup !== 'string') {
      return markup;
    }

    return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
      return replaceMap[match];
    });
  };

  // Append an array of jQuery nodes to a given element.
  Utils.appendMany = function ($element, $nodes) {
    // jQuery 1.7.x does not support $.fn.append() with an array
    // Fall back to a jQuery object collection using $.fn.add()
    if ($.fn.jquery.substr(0, 3) === '1.7') {
      var $jqNodes = $();

      $.map($nodes, function (node) {
        $jqNodes = $jqNodes.add(node);
      });

      $nodes = $jqNodes;
    }

    $element.append($nodes);
  };

  return Utils;
});

S2.define('select2/results',[
  'jquery',
  './utils'
], function ($, Utils) {
  function Results ($element, options, dataAdapter) {
    this.$element = $element;
    this.data = dataAdapter;
    this.options = options;

    Results.__super__.constructor.call(this);
  }

  Utils.Extend(Results, Utils.Observable);

  Results.prototype.render = function () {
    var $results = $(
      '<ul class="select2-results__options" role="tree"></ul>'
    );

    if (this.options.get('multiple')) {
      $results.attr('aria-multiselectable', 'true');
    }

    this.$results = $results;

    return $results;
  };

  Results.prototype.clear = function () {
    this.$results.empty();
  };

  Results.prototype.displayMessage = function (params) {
    var escapeMarkup = this.options.get('escapeMarkup');

    this.clear();
    this.hideLoading();

    var $message = $(
      '<li role="treeitem" class="select2-results__option"></li>'
    );

    var message = this.options.get('translations').get(params.message);

    $message.append(
      escapeMarkup(
        message(params.args)
      )
    );

    this.$results.append($message);
  };

  Results.prototype.append = function (data) {
    this.hideLoading();

    var $options = [];

    if (data.results == null || data.results.length === 0) {
      if (this.$results.children().length === 0) {
        this.trigger('results:message', {
          message: 'noResults'
        });
      }

      return;
    }

    data.results = this.sort(data.results);

    for (var d = 0; d < data.results.length; d++) {
      var item = data.results[d];

      var $option = this.option(item);

      $options.push($option);
    }

    this.$results.append($options);
  };

  Results.prototype.position = function ($results, $dropdown) {
    var $resultsContainer = $dropdown.find('.select2-results');
    $resultsContainer.append($results);
  };

  Results.prototype.sort = function (data) {
    var sorter = this.options.get('sorter');

    return sorter(data);
  };

  Results.prototype.setClasses = function () {
    var self = this;

    this.data.current(function (selected) {
      var selectedIds = $.map(selected, function (s) {
        return s.id.toString();
      });

      var $options = self.$results
        .find('.select2-results__option[aria-selected]');

      $options.each(function () {
        var $option = $(this);

        var item = $.data(this, 'data');

        // id needs to be converted to a string when comparing
        var id = '' + item.id;

        if ((item.element != null && item.element.selected) ||
            (item.element == null && $.inArray(id, selectedIds) > -1)) {
          $option.attr('aria-selected', 'true');
        } else {
          $option.attr('aria-selected', 'false');
        }
      });

      var $selected = $options.filter('[aria-selected=true]');

      // Check if there are any selected options
      if ($selected.length > 0) {
        // If there are selected options, highlight the first
        $selected.first().trigger('mouseenter');
      } else {
        // If there are no selected options, highlight the first option
        // in the dropdown
        $options.first().trigger('mouseenter');
      }
    });
  };

  Results.prototype.showLoading = function (params) {
    this.hideLoading();

    var loadingMore = this.options.get('translations').get('searching');

    // var loading = {
    //   disabled: true,
    //   loading: true,
    //   text: loadingMore(params)
    // };
    // var $loading = this.option(loading);
    // $loading.className += ' loading-results';

    // this.$results.prepend($loading);
    // 
    // console.log("show loainding");

    // console.log($(".select2-dropdown").length);
    // console.log(this.$results);    
    this.$results.parents(".select2-dropdown:first").mask("loadingMore", {});

  };

  Results.prototype.hideLoading = function () {
    // this.$results.find('.loading-results').remove();
    this.$results.parents(".select2-dropdown:first").unmask();
  };

  Results.prototype.option = function (data) {
    var option = document.createElement('li');
    option.className = 'select2-results__option';

    var attrs = {
      'role': 'treeitem',
      'aria-selected': 'false'
    };

    if (data.disabled) {
      delete attrs['aria-selected'];
      attrs['aria-disabled'] = 'true';
    }

    if (data.id == null) {
      delete attrs['aria-selected'];
    }

    if (data._resultId != null) {
      option.id = data._resultId;
    }

    if (data.title) {
      option.title = data.title;
    }

    if (data.children) {
      attrs.role = 'group';
      attrs['aria-label'] = data.text;
      delete attrs['aria-selected'];
    }

    for (var attr in attrs) {
      var val = attrs[attr];

      option.setAttribute(attr, val);
    }

    if (data.children) {
      var $option = $(option);

      var label = document.createElement('strong');
      label.className = 'select2-results__group';

      var $label = $(label);
      this.template(data, label);

      var $children = [];

      for (var c = 0; c < data.children.length; c++) {
        var child = data.children[c];

        var $child = this.option(child);

        $children.push($child);
      }

      var $childrenContainer = $('<ul></ul>', {
        'class': 'select2-results__options select2-results__options--nested'
      });

      $childrenContainer.append($children);

      $option.append(label);
      $option.append($childrenContainer);
    } else {
      this.template(data, option);
    }

    $.data(option, 'data', data);

    return option;
  };

  Results.prototype.bind = function (container, $container) {
    var self = this;

    var id = container.id + '-results';

    this.$results.attr('id', id);

    container.on('results:all', function (params) {
      self.clear();
      self.append(params.data);

      if (container.isOpen()) {
        self.setClasses();
      }
    });

    container.on('results:append', function (params) {
      self.append(params.data);

      if (container.isOpen()) {
        self.setClasses();
      }
    });

    container.on('query', function (params) {
      self.showLoading(params);
    });

    container.on('select', function () {
      if (!container.isOpen()) {
        return;
      }

      self.setClasses();
    });

    container.on('unselect', function () {
      if (!container.isOpen()) {
        return;
      }

      self.setClasses();
    });

    container.on('open', function () {
      // When the dropdown is open, aria-expended="true"
      self.$results.attr('aria-expanded', 'true');
      self.$results.attr('aria-hidden', 'false');

      self.setClasses();
      self.ensureHighlightVisible();
    });

    container.on('close', function () {
      // When the dropdown is closed, aria-expended="false"
      self.$results.attr('aria-expanded', 'false');
      self.$results.attr('aria-hidden', 'true');
      self.$results.removeAttr('aria-activedescendant');
    });

    container.on('results:toggle', function () {
      var $highlighted = self.getHighlightedResults();

      if ($highlighted.length === 0) {
        return;
      }

      $highlighted.trigger('mouseup');
    });

    container.on('results:select', function () {
      var $highlighted = self.getHighlightedResults();

      if ($highlighted.length === 0) {
        return;
      }

      var data = $highlighted.data('data');

      if ($highlighted.attr('aria-selected') == 'true') {
        self.trigger('close', {});
      } else {
        self.trigger('select', {
          data: data
        });
      }
    });

    container.on('results:previous', function () {
      var $highlighted = self.getHighlightedResults();

      var $options = self.$results.find('[aria-selected]');

      var currentIndex = $options.index($highlighted);

      // If we are already at te top, don't move further
      if (currentIndex === 0) {
        return;
      }

      var nextIndex = currentIndex - 1;

      // If none are highlighted, highlight the first
      if ($highlighted.length === 0) {
        nextIndex = 0;
      }

      var $next = $options.eq(nextIndex);

      $next.trigger('mouseenter');

      var currentOffset = self.$results.offset().top;
      var nextTop = $next.offset().top;
      var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);

      if (nextIndex === 0) {
        self.$results.scrollTop(0);
      } else if (nextTop - currentOffset < 0) {
        self.$results.scrollTop(nextOffset);
      }
    });

    container.on('results:next', function () {
      var $highlighted = self.getHighlightedResults();

      var $options = self.$results.find('[aria-selected]');

      var currentIndex = $options.index($highlighted);

      var nextIndex = currentIndex + 1;

      // If we are at the last option, stay there
      if (nextIndex >= $options.length) {
        return;
      }

      var $next = $options.eq(nextIndex);

      $next.trigger('mouseenter');

      var currentOffset = self.$results.offset().top +
        self.$results.outerHeight(false);
      var nextBottom = $next.offset().top + $next.outerHeight(false);
      var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;

      if (nextIndex === 0) {
        self.$results.scrollTop(0);
      } else if (nextBottom > currentOffset) {
        self.$results.scrollTop(nextOffset);
      }
    });

    container.on('results:focus', function (params) {
      params.element.addClass('select2-results__option--highlighted');
    });

    container.on('results:message', function (params) {
      self.displayMessage(params);
    });

    if ($.fn.mousewheel) {
      this.$results.on('mousewheel', function (e) {
        var top = self.$results.scrollTop();

        var bottom = (
          self.$results.get(0).scrollHeight -
          self.$results.scrollTop() +
          e.deltaY
        );

        var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
        var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();

        if (isAtTop) {
          self.$results.scrollTop(0);

          e.preventDefault();
          e.stopPropagation();
        } else if (isAtBottom) {
          self.$results.scrollTop(
            self.$results.get(0).scrollHeight - self.$results.height()
          );

          e.preventDefault();
          e.stopPropagation();
        }
      });
    }

    this.$results.on('mouseup', '.select2-results__option[aria-selected]',
      function (evt) {
      var $this = $(this);

      var data = $this.data('data');

      if ($this.attr('aria-selected') === 'true') {
        if (self.options.get('multiple')) {
          self.trigger('unselect', {
            originalEvent: evt,
            data: data
          });
        } else {
          self.trigger('close', {});
        }

        return;
      }

      self.trigger('select', {
        originalEvent: evt,
        data: data
      });
    });

    this.$results.on('mouseenter', '.select2-results__option[aria-selected]',
      function (evt) {
      var data = $(this).data('data');

      self.getHighlightedResults()
          .removeClass('select2-results__option--highlighted');

      self.trigger('results:focus', {
        data: data,
        element: $(this)
      });
    });
  };

  Results.prototype.getHighlightedResults = function () {
    var $highlighted = this.$results
    .find('.select2-results__option--highlighted');

    return $highlighted;
  };

  Results.prototype.destroy = function () {
    this.$results.remove();
  };

  Results.prototype.ensureHighlightVisible = function () {
    var $highlighted = this.getHighlightedResults();

    if ($highlighted.length === 0) {
      return;
    }

    var $options = this.$results.find('[aria-selected]');

    var currentIndex = $options.index($highlighted);

    var currentOffset = this.$results.offset().top;
    var nextTop = $highlighted.offset().top;
    var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);

    var offsetDelta = nextTop - currentOffset;
    nextOffset -= $highlighted.outerHeight(false) * 2;

    if (currentIndex <= 2) {
      this.$results.scrollTop(0);
    } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
      this.$results.scrollTop(nextOffset);
    }
  };

  Results.prototype.template = function (result, container) {
    var template = this.options.get('templateResult');
    var optionTpl = this.options.get('optionTpl');

    var escapeMarkup = this.options.get('escapeMarkup');

    var content = template(result, optionTpl);

    if (content == null) {
      container.style.display = 'none';
    } else if (typeof content === 'string') {
      container.innerHTML = escapeMarkup(content);
    } else {
      $(container).append(content);
    }
  };

  return Results;
});

S2.define('select2/keys',[

], function () {
  var KEYS = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    DELETE: 46
  };

  return KEYS;
});

S2.define('select2/selection/base',[
  'jquery',
  '../utils',
  '../keys'
], function ($, Utils, KEYS) {
  function BaseSelection ($element, options) {
    this.$element = $element;
    this.options = options;

    BaseSelection.__super__.constructor.call(this);
  }

  Utils.Extend(BaseSelection, Utils.Observable);

  BaseSelection.prototype.render = function () {
    var $selection = $(
      '<span class="select2-selection" role="combobox" ' +
      'aria-autocomplete="list" aria-haspopup="true" aria-expanded="false">' +
      '</span>'
    );

    this._tabindex = 0;

    if (this.$element.data('old-tabindex') != null) {
      this._tabindex = this.$element.data('old-tabindex');
    } else if (this.$element.attr('tabindex') != null) {
      this._tabindex = this.$element.attr('tabindex');
    }

    $selection.attr('title', this.$element.attr('title'));
    $selection.attr('tabindex', this._tabindex);

    this.$selection = $selection;

    return $selection;
  };

  BaseSelection.prototype.bind = function (container, $container) {
    var self = this;

    var id = container.id + '-container';
    var resultsId = container.id + '-results';

    this.container = container;

    this.$selection.on('focus', function (evt) {
      self.trigger('focus', evt);
    });

    this.$selection.on('blur', function (evt) {
      self._handleBlur(evt);
    });

    this.$selection.on('keydown', function (evt) {
      self.trigger('keypress', evt);

      if (evt.which === KEYS.SPACE) {
        evt.preventDefault();
      }
    });

    container.on('results:focus', function (params) {
      self.$selection.attr('aria-activedescendant', params.data._resultId);
    });

    container.on('selection:update', function (params) {
      self.update(params.data);
    });

    container.on('open', function () {
      // When the dropdown is open, aria-expanded="true"
      self.$selection.attr('aria-expanded', 'true');
      self.$selection.attr('aria-owns', resultsId);

      self._attachCloseHandler(container);
    });

    container.on('close', function () {
      // When the dropdown is closed, aria-expanded="false"
      self.$selection.attr('aria-expanded', 'false');
      self.$selection.removeAttr('aria-activedescendant');
      self.$selection.removeAttr('aria-owns');

      self.$selection.focus();

      self._detachCloseHandler(container);
    });

    container.on('enable', function () {
      self.$selection.attr('tabindex', self._tabindex);
    });

    container.on('disable', function () {
      self.$selection.attr('tabindex', '-1');
    });
  };

  BaseSelection.prototype._handleBlur = function (evt) {
    var self = this;

    // This needs to be delayed as the actve element is the body when the tab
    // key is pressed, possibly along with others.
    window.setTimeout(function () {
      // Don't trigger `blur` if the focus is still in the selection
      if (
        (document.activeElement == self.$selection[0]) ||
        ($.contains(self.$selection[0], document.activeElement))
      ) {
        return;
      }

      self.trigger('blur', evt);
    }, 1);
  };

  BaseSelection.prototype._attachCloseHandler = function (container) {
    var self = this;

    $(document.body).on('mousedown.select2.' + container.id, function (e) {
      var $target = $(e.target);

      var $select = $target.closest('.select2');

      var $all = $('.select2.select2-container--open');

      $all.each(function () {
        var $this = $(this);

        if (this == $select[0]) {
          return;
        }

        var $element = $this.data('element');

        $element.select2('close');
      });
    });
  };

  BaseSelection.prototype._detachCloseHandler = function (container) {
    $(document.body).off('mousedown.select2.' + container.id);
  };

  BaseSelection.prototype.position = function ($selection, $container) {
    var $selectionContainer = $container.find('.selection');
    $selectionContainer.append($selection);
  };

  BaseSelection.prototype.destroy = function () {
    this._detachCloseHandler(this.container);
  };

  BaseSelection.prototype.update = function (data) {
    throw new Error('The `update` method must be defined in child classes.');
  };

  return BaseSelection;
});

S2.define('select2/selection/single',[
  'jquery',
  './base',
  '../utils',
  '../keys'
], function ($, BaseSelection, Utils, KEYS) {
  function SingleSelection () {
    SingleSelection.__super__.constructor.apply(this, arguments);
  }

  Utils.Extend(SingleSelection, BaseSelection);

  SingleSelection.prototype.render = function () {
    var $selection = SingleSelection.__super__.render.call(this);

    $selection.addClass('select2-selection--single');

    $selection.html(
      '<span class="select2-selection__rendered"></span>' +
      '<span class="select2-selection__arrow" role="presentation">' +
        '<b role="presentation"></b>' +
      '</span>'
    );

    return $selection;
  };

  SingleSelection.prototype.bind = function (container, $container) {
    var self = this;

    SingleSelection.__super__.bind.apply(this, arguments);

    var id = container.id + '-container';

    this.$selection.find('.select2-selection__rendered').attr('id', id);
    this.$selection.attr('aria-labelledby', id);

    this.$selection.on('mousedown', function (evt) {
      // Only respond to left clicks
      if (evt.which !== 1) {
        return;
      }

      self.trigger('toggle', {
        originalEvent: evt
      });
    });

    this.$selection.on('focus', function (evt) {
      // User focuses on the container
    });

    this.$selection.on('blur', function (evt) {
      // User exits the container
    });

    container.on('selection:update', function (params) {
      self.update(params.data);
    });
  };

  SingleSelection.prototype.clear = function () {
    this.$selection.find('.select2-selection__rendered').empty();
  };

  SingleSelection.prototype.display = function (data, container) {
    // console.log("display selection ");
    // console.log(data);

    var template = this.options.get('templateSelection');
    var escapeMarkup = this.options.get('escapeMarkup');

    return escapeMarkup(template(data, container));
  };

  SingleSelection.prototype.selectionContainer = function () {
    return $('<span></span>');
  };

  SingleSelection.prototype.update = function (data) {
    // console.log("update selection---------");
    if (data.length === 0) {
      this.clear();
      return;
    }

    var selection = data[0];

    var $rendered = this.$selection.find('.select2-selection__rendered');
    var formatted = this.display(selection, $rendered);

    $rendered.empty().append(formatted);
    $rendered.prop('title', selection.title || selection.text);
  };

  return SingleSelection;
});

S2.define('select2/selection/multiple',[
  'jquery',
  './base',
  '../utils'
], function ($, BaseSelection, Utils) {
  function MultipleSelection ($element, options) {
    MultipleSelection.__super__.constructor.apply(this, arguments);
  }

  Utils.Extend(MultipleSelection, BaseSelection);

  MultipleSelection.prototype.render = function () {
    var $selection = MultipleSelection.__super__.render.call(this);

    $selection.addClass('select2-selection--multiple');

    $selection.html(
      '<ul class="select2-selection__rendered"></ul>'
    );

    return $selection;
  };

  MultipleSelection.prototype.bind = function (container, $container) {
    var self = this;

    MultipleSelection.__super__.bind.apply(this, arguments);

    this.$selection.on('click', function (evt) {
      self.trigger('toggle', {
        originalEvent: evt
      });
    });

    this.$selection.on(
      'click',
      '.select2-selection__choice__remove',
      function (evt) {
        // Ignore the event if it is disabled
        if (self.options.get('disabled')) {
          return;
        }

        var $remove = $(this);
        var $selection = $remove.parent();

        var data = $selection.data('data');

        self.trigger('unselect', {
          originalEvent: evt,
          data: data
        });
      }
    );
  };

  MultipleSelection.prototype.clear = function () {
    this.$selection.find('.select2-selection__rendered').empty();
  };

  MultipleSelection.prototype.display = function (data, container) {
    var template = this.options.get('templateSelection');
    var escapeMarkup = this.options.get('escapeMarkup');

    return escapeMarkup(template(data, container));
  };

  MultipleSelection.prototype.selectionContainer = function () {
    var $container = $(
      '<li class="select2-selection__choice">' +
        '<span class="select2-selection__choice__remove" role="presentation">' +
          '&times;' +
        '</span>' +
      '</li>'
    );

    return $container;
  };

  MultipleSelection.prototype.update = function (data) {
    this.clear();

    if (data.length === 0) {
      return;
    }

    var $selections = [];

    for (var d = 0; d < data.length; d++) {
      var selection = data[d];

      var $selection = this.selectionContainer();
      var formatted = this.display(selection, $selection);

      $selection.append(formatted);
      $selection.prop('title', selection.title || selection.text);

      $selection.data('data', selection);

      $selections.push($selection);
    }

    var $rendered = this.$selection.find('.select2-selection__rendered');

    Utils.appendMany($rendered, $selections);
  };

  return MultipleSelection;
});

S2.define('select2/selection/placeholder',[
  '../utils'
], function (Utils) {
  function Placeholder (decorated, $element, options) {
    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

    decorated.call(this, $element, options);
  }

  Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {
    if (typeof placeholder === 'string') {
      placeholder = {
        id: '',
        text: placeholder
      };
    }

    return placeholder;
  };

  Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {
    var $placeholder = this.selectionContainer();

    $placeholder.html(this.display(placeholder));
    $placeholder.addClass('select2-selection__placeholder')
                .removeClass('select2-selection__choice');

    return $placeholder;
  };

  Placeholder.prototype.update = function (decorated, data) {
    var singlePlaceholder = (
      data.length == 1 && data[0].id != this.placeholder.id
    );
    var multipleSelections = data.length > 1;

    if (multipleSelections || singlePlaceholder) {
      return decorated.call(this, data);
    }

    this.clear();

    var $placeholder = this.createPlaceholder(this.placeholder);

    this.$selection.find('.select2-selection__rendered').append($placeholder);
  };

  return Placeholder;
});

S2.define('select2/selection/allowClear',[
  'jquery',
  '../keys'
], function ($, KEYS) {
  function AllowClear () { }

  AllowClear.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    if (this.placeholder == null) {
      if (this.options.get('debug') && window.console && console.error) {
        console.error(
          'Select2: The `allowClear` option should be used in combination ' +
          'with the `placeholder` option.'
        );
      }
    }

    this.$selection.on('mousedown', '.select2-selection__clear',
      function (evt) {
        self._handleClear(evt);
    });

    container.on('keypress', function (evt) {
      self._handleKeyboardClear(evt, container);
    });
  };

  AllowClear.prototype._handleClear = function (_, evt) {
    // Ignore the event if it is disabled
    if (this.options.get('disabled')) {
      return;
    }

    var $clear = this.$selection.find('.select2-selection__clear');

    // Ignore the event if nothing has been selected
    if ($clear.length === 0) {
      return;
    }

    evt.stopPropagation();

    var data = $clear.data('data');

    for (var d = 0; d < data.length; d++) {
      var unselectData = {
        data: data[d]
      };

      // Trigger the `unselect` event, so people can prevent it from being
      // cleared.
      this.trigger('unselect', unselectData);

      // If the event was prevented, don't clear it out.
      if (unselectData.prevented) {
        return;
      }
    }

    this.$element.val(this.placeholder.id).trigger('change');

    this.trigger('toggle', {});
  };

  AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {
    if (container.isOpen()) {
      return;
    }

    if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
      this._handleClear(evt);
    }
  };

  AllowClear.prototype.update = function (decorated, data) {
    decorated.call(this, data);

    if (this.$selection.find('.select2-selection__placeholder').length > 0 ||
        data.length === 0) {
      return;
    }

    var $remove = $(
      '<span class="select2-selection__clear">' +
        '&times;' +
      '</span>'
    );
    $remove.data('data', data);

    this.$selection.find('.select2-selection__rendered').prepend($remove);
  };

  return AllowClear;
});

S2.define('select2/selection/search',[
  'jquery',
  '../utils',
  '../keys'
], function ($, Utils, KEYS) {
  function Search (decorated, $element, options) {
    decorated.call(this, $element, options);
  }

  Search.prototype.render = function (decorated) {
    var $search = $(
      '<li class="select2-search select2-search--inline">' +
        '<input class="select2-search__field" type="search" tabindex="-1"' +
        ' autocomplete="off" autocorrect="off" autocapitalize="off"' +
        ' spellcheck="false" role="textbox" />' +
      '</li>'
    );

    this.$searchContainer = $search;
    this.$search = $search.find('input');

    var $rendered = decorated.call(this);

    this._transferTabIndex();

    return $rendered;
  };

  Search.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('open', function () {
      self.$search.trigger('focus');
    });

    container.on('close', function () {
      self.$search.val('');
      self.$search.trigger('focus');
    });

    container.on('enable', function () {
      self.$search.prop('disabled', false);

      self._transferTabIndex();
    });

    container.on('disable', function () {
      self.$search.prop('disabled', true);
    });

    container.on('focus', function (evt) {
      self.$search.trigger('focus');
    });

    this.$selection.on('focusin', '.select2-search--inline', function (evt) {
      self.trigger('focus', evt);
    });

    this.$selection.on('focusout', '.select2-search--inline', function (evt) {
      self._handleBlur(evt);
    });

    this.$selection.on('keydown', '.select2-search--inline', function (evt) {
      evt.stopPropagation();

      self.trigger('keypress', evt);

      self._keyUpPrevented = evt.isDefaultPrevented();

      var key = evt.which;

      if (key === KEYS.BACKSPACE && self.$search.val() === '') {
        var $previousChoice = self.$searchContainer
          .prev('.select2-selection__choice');

        if ($previousChoice.length > 0) {
          var item = $previousChoice.data('data');

          self.searchRemoveChoice(item);

          evt.preventDefault();
        }
      }
    });

    // Workaround for browsers which do not support the `input` event
    // This will prevent double-triggering of events for browsers which support
    // both the `keyup` and `input` events.
    this.$selection.on(
      'input.searchcheck',
      '.select2-search--inline',
      function (evt) {
        // Try to detect the IE version should the `documentMode` property that
        // is stored on the document. This is only implemented in IE and is
        // slightly cleaner than doing a user agent check.
        // This property is not available in Edge, but Edge also doesn't have
        // this bug.
        var msie = document.documentMode;

        // IE will trigger the `input` event when a placeholder is used on a
        // search box. To get around this issue, we are forced to ignore all
        // `input` events in IE and keep using `keyup`.
        if (msie && msie <= 11) {
          self.$selection.off('input.search input.searchcheck');
          return;
        }

        // Unbind the duplicated `keyup` event
        self.$selection.off('keyup.search');
      }
    );

    this.$selection.on(
      'keyup.search input.search',
      '.select2-search--inline',
      function (evt) {
        var key = evt.which;

        // We can freely ignore events from modifier keys
        if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
          return;
        }

        // Tabbing will be handled during the `keydown` phase
        if (key == KEYS.TAB) {
          return;
        }

        self.handleSearch(evt);
      }
    );
  };

  /**
   * This method will transfer the tabindex attribute from the rendered
   * selection to the search box. This allows for the search box to be used as
   * the primary focus instead of the selection container.
   *
   * @private
   */
  Search.prototype._transferTabIndex = function (decorated) {
    this.$search.attr('tabindex', this.$selection.attr('tabindex'));
    this.$selection.attr('tabindex', '-1');
  };

  Search.prototype.createPlaceholder = function (decorated, placeholder) {
    this.$search.attr('placeholder', placeholder.text);
  };

  Search.prototype.update = function (decorated, data) {
    var searchHadFocus = this.$search[0] == document.activeElement;

    this.$search.attr('placeholder', '');

    decorated.call(this, data);

    this.$selection.find('.select2-selection__rendered')
                   .append(this.$searchContainer);

    this.resizeSearch();
    if (searchHadFocus) {
      this.$search.focus();
    }
  };

  Search.prototype.handleSearch = function () {
    this.resizeSearch();

    if (!this._keyUpPrevented) {
      var input = this.$search.val();

      this.trigger('query', {
        term: input
      });
    }

    this._keyUpPrevented = false;
  };

  Search.prototype.searchRemoveChoice = function (decorated, item) {
    this.trigger('unselect', {
      data: item
    });

    this.trigger('open', {});

    this.$search.val(item.text + ' ');
  };

  Search.prototype.resizeSearch = function () {
    this.$search.css('width', '25px');

    var width = '';

    if (this.$search.attr('placeholder') !== '') {
      width = this.$selection.find('.select2-selection__rendered').innerWidth();
    } else {
      var minimumWidth = this.$search.val().length + 1;

      width = (minimumWidth * 0.75) + 'em';
    }

    this.$search.css('width', width);
  };

  return Search;
});

S2.define('select2/selection/eventRelay',[
  'jquery'
], function ($) {
  function EventRelay () { }

  EventRelay.prototype.bind = function (decorated, container, $container) {
    var self = this;
    var relayEvents = [
      'open', 'opening',
      'close', 'closing',
      'select', 'selecting',
      'unselect', 'unselecting'
    ];

    var preventableEvents = ['opening', 'closing', 'selecting', 'unselecting'];

    decorated.call(this, container, $container);

    container.on('*', function (name, params) {
      // Ignore events that should not be relayed
      if ($.inArray(name, relayEvents) === -1) {
        return;
      }

      // The parameters should always be an object
      params = params || {};

      // Generate the jQuery event for the Select2 event
      var evt = $.Event('select2:' + name, {
        params: params
      });

      self.$element.trigger(evt);

      // Only handle preventable events if it was one
      if ($.inArray(name, preventableEvents) === -1) {
        return;
      }

      params.prevented = evt.isDefaultPrevented();
    });
  };

  return EventRelay;
});

S2.define('select2/translation',[
  'jquery',
  'require'
], function ($, require) {
  function Translation (dict) {
    this.dict = dict || {};
  }

  Translation.prototype.all = function () {
    return this.dict;
  };

  Translation.prototype.get = function (key) {
    return this.dict[key];
  };

  Translation.prototype.extend = function (translation) {
    this.dict = $.extend({}, translation.all(), this.dict);
  };

  // Static functions

  Translation._cache = {};

  Translation.loadPath = function (path) {
    if (!(path in Translation._cache)) {
      var translations = require(path);

      Translation._cache[path] = translations;
    }

    return new Translation(Translation._cache[path]);
  };

  return Translation;
});

S2.define('select2/diacritics',[

], function () {
  var diacritics = {
    '\u24B6': 'A',
    '\uFF21': 'A',
    '\u00C0': 'A',
    '\u00C1': 'A',
    '\u00C2': 'A',
    '\u1EA6': 'A',
    '\u1EA4': 'A',
    '\u1EAA': 'A',
    '\u1EA8': 'A',
    '\u00C3': 'A',
    '\u0100': 'A',
    '\u0102': 'A',
    '\u1EB0': 'A',
    '\u1EAE': 'A',
    '\u1EB4': 'A',
    '\u1EB2': 'A',
    '\u0226': 'A',
    '\u01E0': 'A',
    '\u00C4': 'A',
    '\u01DE': 'A',
    '\u1EA2': 'A',
    '\u00C5': 'A',
    '\u01FA': 'A',
    '\u01CD': 'A',
    '\u0200': 'A',
    '\u0202': 'A',
    '\u1EA0': 'A',
    '\u1EAC': 'A',
    '\u1EB6': 'A',
    '\u1E00': 'A',
    '\u0104': 'A',
    '\u023A': 'A',
    '\u2C6F': 'A',
    '\uA732': 'AA',
    '\u00C6': 'AE',
    '\u01FC': 'AE',
    '\u01E2': 'AE',
    '\uA734': 'AO',
    '\uA736': 'AU',
    '\uA738': 'AV',
    '\uA73A': 'AV',
    '\uA73C': 'AY',
    '\u24B7': 'B',
    '\uFF22': 'B',
    '\u1E02': 'B',
    '\u1E04': 'B',
    '\u1E06': 'B',
    '\u0243': 'B',
    '\u0182': 'B',
    '\u0181': 'B',
    '\u24B8': 'C',
    '\uFF23': 'C',
    '\u0106': 'C',
    '\u0108': 'C',
    '\u010A': 'C',
    '\u010C': 'C',
    '\u00C7': 'C',
    '\u1E08': 'C',
    '\u0187': 'C',
    '\u023B': 'C',
    '\uA73E': 'C',
    '\u24B9': 'D',
    '\uFF24': 'D',
    '\u1E0A': 'D',
    '\u010E': 'D',
    '\u1E0C': 'D',
    '\u1E10': 'D',
    '\u1E12': 'D',
    '\u1E0E': 'D',
    '\u0110': 'D',
    '\u018B': 'D',
    '\u018A': 'D',
    '\u0189': 'D',
    '\uA779': 'D',
    '\u01F1': 'DZ',
    '\u01C4': 'DZ',
    '\u01F2': 'Dz',
    '\u01C5': 'Dz',
    '\u24BA': 'E',
    '\uFF25': 'E',
    '\u00C8': 'E',
    '\u00C9': 'E',
    '\u00CA': 'E',
    '\u1EC0': 'E',
    '\u1EBE': 'E',
    '\u1EC4': 'E',
    '\u1EC2': 'E',
    '\u1EBC': 'E',
    '\u0112': 'E',
    '\u1E14': 'E',
    '\u1E16': 'E',
    '\u0114': 'E',
    '\u0116': 'E',
    '\u00CB': 'E',
    '\u1EBA': 'E',
    '\u011A': 'E',
    '\u0204': 'E',
    '\u0206': 'E',
    '\u1EB8': 'E',
    '\u1EC6': 'E',
    '\u0228': 'E',
    '\u1E1C': 'E',
    '\u0118': 'E',
    '\u1E18': 'E',
    '\u1E1A': 'E',
    '\u0190': 'E',
    '\u018E': 'E',
    '\u24BB': 'F',
    '\uFF26': 'F',
    '\u1E1E': 'F',
    '\u0191': 'F',
    '\uA77B': 'F',
    '\u24BC': 'G',
    '\uFF27': 'G',
    '\u01F4': 'G',
    '\u011C': 'G',
    '\u1E20': 'G',
    '\u011E': 'G',
    '\u0120': 'G',
    '\u01E6': 'G',
    '\u0122': 'G',
    '\u01E4': 'G',
    '\u0193': 'G',
    '\uA7A0': 'G',
    '\uA77D': 'G',
    '\uA77E': 'G',
    '\u24BD': 'H',
    '\uFF28': 'H',
    '\u0124': 'H',
    '\u1E22': 'H',
    '\u1E26': 'H',
    '\u021E': 'H',
    '\u1E24': 'H',
    '\u1E28': 'H',
    '\u1E2A': 'H',
    '\u0126': 'H',
    '\u2C67': 'H',
    '\u2C75': 'H',
    '\uA78D': 'H',
    '\u24BE': 'I',
    '\uFF29': 'I',
    '\u00CC': 'I',
    '\u00CD': 'I',
    '\u00CE': 'I',
    '\u0128': 'I',
    '\u012A': 'I',
    '\u012C': 'I',
    '\u0130': 'I',
    '\u00CF': 'I',
    '\u1E2E': 'I',
    '\u1EC8': 'I',
    '\u01CF': 'I',
    '\u0208': 'I',
    '\u020A': 'I',
    '\u1ECA': 'I',
    '\u012E': 'I',
    '\u1E2C': 'I',
    '\u0197': 'I',
    '\u24BF': 'J',
    '\uFF2A': 'J',
    '\u0134': 'J',
    '\u0248': 'J',
    '\u24C0': 'K',
    '\uFF2B': 'K',
    '\u1E30': 'K',
    '\u01E8': 'K',
    '\u1E32': 'K',
    '\u0136': 'K',
    '\u1E34': 'K',
    '\u0198': 'K',
    '\u2C69': 'K',
    '\uA740': 'K',
    '\uA742': 'K',
    '\uA744': 'K',
    '\uA7A2': 'K',
    '\u24C1': 'L',
    '\uFF2C': 'L',
    '\u013F': 'L',
    '\u0139': 'L',
    '\u013D': 'L',
    '\u1E36': 'L',
    '\u1E38': 'L',
    '\u013B': 'L',
    '\u1E3C': 'L',
    '\u1E3A': 'L',
    '\u0141': 'L',
    '\u023D': 'L',
    '\u2C62': 'L',
    '\u2C60': 'L',
    '\uA748': 'L',
    '\uA746': 'L',
    '\uA780': 'L',
    '\u01C7': 'LJ',
    '\u01C8': 'Lj',
    '\u24C2': 'M',
    '\uFF2D': 'M',
    '\u1E3E': 'M',
    '\u1E40': 'M',
    '\u1E42': 'M',
    '\u2C6E': 'M',
    '\u019C': 'M',
    '\u24C3': 'N',
    '\uFF2E': 'N',
    '\u01F8': 'N',
    '\u0143': 'N',
    '\u00D1': 'N',
    '\u1E44': 'N',
    '\u0147': 'N',
    '\u1E46': 'N',
    '\u0145': 'N',
    '\u1E4A': 'N',
    '\u1E48': 'N',
    '\u0220': 'N',
    '\u019D': 'N',
    '\uA790': 'N',
    '\uA7A4': 'N',
    '\u01CA': 'NJ',
    '\u01CB': 'Nj',
    '\u24C4': 'O',
    '\uFF2F': 'O',
    '\u00D2': 'O',
    '\u00D3': 'O',
    '\u00D4': 'O',
    '\u1ED2': 'O',
    '\u1ED0': 'O',
    '\u1ED6': 'O',
    '\u1ED4': 'O',
    '\u00D5': 'O',
    '\u1E4C': 'O',
    '\u022C': 'O',
    '\u1E4E': 'O',
    '\u014C': 'O',
    '\u1E50': 'O',
    '\u1E52': 'O',
    '\u014E': 'O',
    '\u022E': 'O',
    '\u0230': 'O',
    '\u00D6': 'O',
    '\u022A': 'O',
    '\u1ECE': 'O',
    '\u0150': 'O',
    '\u01D1': 'O',
    '\u020C': 'O',
    '\u020E': 'O',
    '\u01A0': 'O',
    '\u1EDC': 'O',
    '\u1EDA': 'O',
    '\u1EE0': 'O',
    '\u1EDE': 'O',
    '\u1EE2': 'O',
    '\u1ECC': 'O',
    '\u1ED8': 'O',
    '\u01EA': 'O',
    '\u01EC': 'O',
    '\u00D8': 'O',
    '\u01FE': 'O',
    '\u0186': 'O',
    '\u019F': 'O',
    '\uA74A': 'O',
    '\uA74C': 'O',
    '\u01A2': 'OI',
    '\uA74E': 'OO',
    '\u0222': 'OU',
    '\u24C5': 'P',
    '\uFF30': 'P',
    '\u1E54': 'P',
    '\u1E56': 'P',
    '\u01A4': 'P',
    '\u2C63': 'P',
    '\uA750': 'P',
    '\uA752': 'P',
    '\uA754': 'P',
    '\u24C6': 'Q',
    '\uFF31': 'Q',
    '\uA756': 'Q',
    '\uA758': 'Q',
    '\u024A': 'Q',
    '\u24C7': 'R',
    '\uFF32': 'R',
    '\u0154': 'R',
    '\u1E58': 'R',
    '\u0158': 'R',
    '\u0210': 'R',
    '\u0212': 'R',
    '\u1E5A': 'R',
    '\u1E5C': 'R',
    '\u0156': 'R',
    '\u1E5E': 'R',
    '\u024C': 'R',
    '\u2C64': 'R',
    '\uA75A': 'R',
    '\uA7A6': 'R',
    '\uA782': 'R',
    '\u24C8': 'S',
    '\uFF33': 'S',
    '\u1E9E': 'S',
    '\u015A': 'S',
    '\u1E64': 'S',
    '\u015C': 'S',
    '\u1E60': 'S',
    '\u0160': 'S',
    '\u1E66': 'S',
    '\u1E62': 'S',
    '\u1E68': 'S',
    '\u0218': 'S',
    '\u015E': 'S',
    '\u2C7E': 'S',
    '\uA7A8': 'S',
    '\uA784': 'S',
    '\u24C9': 'T',
    '\uFF34': 'T',
    '\u1E6A': 'T',
    '\u0164': 'T',
    '\u1E6C': 'T',
    '\u021A': 'T',
    '\u0162': 'T',
    '\u1E70': 'T',
    '\u1E6E': 'T',
    '\u0166': 'T',
    '\u01AC': 'T',
    '\u01AE': 'T',
    '\u023E': 'T',
    '\uA786': 'T',
    '\uA728': 'TZ',
    '\u24CA': 'U',
    '\uFF35': 'U',
    '\u00D9': 'U',
    '\u00DA': 'U',
    '\u00DB': 'U',
    '\u0168': 'U',
    '\u1E78': 'U',
    '\u016A': 'U',
    '\u1E7A': 'U',
    '\u016C': 'U',
    '\u00DC': 'U',
    '\u01DB': 'U',
    '\u01D7': 'U',
    '\u01D5': 'U',
    '\u01D9': 'U',
    '\u1EE6': 'U',
    '\u016E': 'U',
    '\u0170': 'U',
    '\u01D3': 'U',
    '\u0214': 'U',
    '\u0216': 'U',
    '\u01AF': 'U',
    '\u1EEA': 'U',
    '\u1EE8': 'U',
    '\u1EEE': 'U',
    '\u1EEC': 'U',
    '\u1EF0': 'U',
    '\u1EE4': 'U',
    '\u1E72': 'U',
    '\u0172': 'U',
    '\u1E76': 'U',
    '\u1E74': 'U',
    '\u0244': 'U',
    '\u24CB': 'V',
    '\uFF36': 'V',
    '\u1E7C': 'V',
    '\u1E7E': 'V',
    '\u01B2': 'V',
    '\uA75E': 'V',
    '\u0245': 'V',
    '\uA760': 'VY',
    '\u24CC': 'W',
    '\uFF37': 'W',
    '\u1E80': 'W',
    '\u1E82': 'W',
    '\u0174': 'W',
    '\u1E86': 'W',
    '\u1E84': 'W',
    '\u1E88': 'W',
    '\u2C72': 'W',
    '\u24CD': 'X',
    '\uFF38': 'X',
    '\u1E8A': 'X',
    '\u1E8C': 'X',
    '\u24CE': 'Y',
    '\uFF39': 'Y',
    '\u1EF2': 'Y',
    '\u00DD': 'Y',
    '\u0176': 'Y',
    '\u1EF8': 'Y',
    '\u0232': 'Y',
    '\u1E8E': 'Y',
    '\u0178': 'Y',
    '\u1EF6': 'Y',
    '\u1EF4': 'Y',
    '\u01B3': 'Y',
    '\u024E': 'Y',
    '\u1EFE': 'Y',
    '\u24CF': 'Z',
    '\uFF3A': 'Z',
    '\u0179': 'Z',
    '\u1E90': 'Z',
    '\u017B': 'Z',
    '\u017D': 'Z',
    '\u1E92': 'Z',
    '\u1E94': 'Z',
    '\u01B5': 'Z',
    '\u0224': 'Z',
    '\u2C7F': 'Z',
    '\u2C6B': 'Z',
    '\uA762': 'Z',
    '\u24D0': 'a',
    '\uFF41': 'a',
    '\u1E9A': 'a',
    '\u00E0': 'a',
    '\u00E1': 'a',
    '\u00E2': 'a',
    '\u1EA7': 'a',
    '\u1EA5': 'a',
    '\u1EAB': 'a',
    '\u1EA9': 'a',
    '\u00E3': 'a',
    '\u0101': 'a',
    '\u0103': 'a',
    '\u1EB1': 'a',
    '\u1EAF': 'a',
    '\u1EB5': 'a',
    '\u1EB3': 'a',
    '\u0227': 'a',
    '\u01E1': 'a',
    '\u00E4': 'a',
    '\u01DF': 'a',
    '\u1EA3': 'a',
    '\u00E5': 'a',
    '\u01FB': 'a',
    '\u01CE': 'a',
    '\u0201': 'a',
    '\u0203': 'a',
    '\u1EA1': 'a',
    '\u1EAD': 'a',
    '\u1EB7': 'a',
    '\u1E01': 'a',
    '\u0105': 'a',
    '\u2C65': 'a',
    '\u0250': 'a',
    '\uA733': 'aa',
    '\u00E6': 'ae',
    '\u01FD': 'ae',
    '\u01E3': 'ae',
    '\uA735': 'ao',
    '\uA737': 'au',
    '\uA739': 'av',
    '\uA73B': 'av',
    '\uA73D': 'ay',
    '\u24D1': 'b',
    '\uFF42': 'b',
    '\u1E03': 'b',
    '\u1E05': 'b',
    '\u1E07': 'b',
    '\u0180': 'b',
    '\u0183': 'b',
    '\u0253': 'b',
    '\u24D2': 'c',
    '\uFF43': 'c',
    '\u0107': 'c',
    '\u0109': 'c',
    '\u010B': 'c',
    '\u010D': 'c',
    '\u00E7': 'c',
    '\u1E09': 'c',
    '\u0188': 'c',
    '\u023C': 'c',
    '\uA73F': 'c',
    '\u2184': 'c',
    '\u24D3': 'd',
    '\uFF44': 'd',
    '\u1E0B': 'd',
    '\u010F': 'd',
    '\u1E0D': 'd',
    '\u1E11': 'd',
    '\u1E13': 'd',
    '\u1E0F': 'd',
    '\u0111': 'd',
    '\u018C': 'd',
    '\u0256': 'd',
    '\u0257': 'd',
    '\uA77A': 'd',
    '\u01F3': 'dz',
    '\u01C6': 'dz',
    '\u24D4': 'e',
    '\uFF45': 'e',
    '\u00E8': 'e',
    '\u00E9': 'e',
    '\u00EA': 'e',
    '\u1EC1': 'e',
    '\u1EBF': 'e',
    '\u1EC5': 'e',
    '\u1EC3': 'e',
    '\u1EBD': 'e',
    '\u0113': 'e',
    '\u1E15': 'e',
    '\u1E17': 'e',
    '\u0115': 'e',
    '\u0117': 'e',
    '\u00EB': 'e',
    '\u1EBB': 'e',
    '\u011B': 'e',
    '\u0205': 'e',
    '\u0207': 'e',
    '\u1EB9': 'e',
    '\u1EC7': 'e',
    '\u0229': 'e',
    '\u1E1D': 'e',
    '\u0119': 'e',
    '\u1E19': 'e',
    '\u1E1B': 'e',
    '\u0247': 'e',
    '\u025B': 'e',
    '\u01DD': 'e',
    '\u24D5': 'f',
    '\uFF46': 'f',
    '\u1E1F': 'f',
    '\u0192': 'f',
    '\uA77C': 'f',
    '\u24D6': 'g',
    '\uFF47': 'g',
    '\u01F5': 'g',
    '\u011D': 'g',
    '\u1E21': 'g',
    '\u011F': 'g',
    '\u0121': 'g',
    '\u01E7': 'g',
    '\u0123': 'g',
    '\u01E5': 'g',
    '\u0260': 'g',
    '\uA7A1': 'g',
    '\u1D79': 'g',
    '\uA77F': 'g',
    '\u24D7': 'h',
    '\uFF48': 'h',
    '\u0125': 'h',
    '\u1E23': 'h',
    '\u1E27': 'h',
    '\u021F': 'h',
    '\u1E25': 'h',
    '\u1E29': 'h',
    '\u1E2B': 'h',
    '\u1E96': 'h',
    '\u0127': 'h',
    '\u2C68': 'h',
    '\u2C76': 'h',
    '\u0265': 'h',
    '\u0195': 'hv',
    '\u24D8': 'i',
    '\uFF49': 'i',
    '\u00EC': 'i',
    '\u00ED': 'i',
    '\u00EE': 'i',
    '\u0129': 'i',
    '\u012B': 'i',
    '\u012D': 'i',
    '\u00EF': 'i',
    '\u1E2F': 'i',
    '\u1EC9': 'i',
    '\u01D0': 'i',
    '\u0209': 'i',
    '\u020B': 'i',
    '\u1ECB': 'i',
    '\u012F': 'i',
    '\u1E2D': 'i',
    '\u0268': 'i',
    '\u0131': 'i',
    '\u24D9': 'j',
    '\uFF4A': 'j',
    '\u0135': 'j',
    '\u01F0': 'j',
    '\u0249': 'j',
    '\u24DA': 'k',
    '\uFF4B': 'k',
    '\u1E31': 'k',
    '\u01E9': 'k',
    '\u1E33': 'k',
    '\u0137': 'k',
    '\u1E35': 'k',
    '\u0199': 'k',
    '\u2C6A': 'k',
    '\uA741': 'k',
    '\uA743': 'k',
    '\uA745': 'k',
    '\uA7A3': 'k',
    '\u24DB': 'l',
    '\uFF4C': 'l',
    '\u0140': 'l',
    '\u013A': 'l',
    '\u013E': 'l',
    '\u1E37': 'l',
    '\u1E39': 'l',
    '\u013C': 'l',
    '\u1E3D': 'l',
    '\u1E3B': 'l',
    '\u017F': 'l',
    '\u0142': 'l',
    '\u019A': 'l',
    '\u026B': 'l',
    '\u2C61': 'l',
    '\uA749': 'l',
    '\uA781': 'l',
    '\uA747': 'l',
    '\u01C9': 'lj',
    '\u24DC': 'm',
    '\uFF4D': 'm',
    '\u1E3F': 'm',
    '\u1E41': 'm',
    '\u1E43': 'm',
    '\u0271': 'm',
    '\u026F': 'm',
    '\u24DD': 'n',
    '\uFF4E': 'n',
    '\u01F9': 'n',
    '\u0144': 'n',
    '\u00F1': 'n',
    '\u1E45': 'n',
    '\u0148': 'n',
    '\u1E47': 'n',
    '\u0146': 'n',
    '\u1E4B': 'n',
    '\u1E49': 'n',
    '\u019E': 'n',
    '\u0272': 'n',
    '\u0149': 'n',
    '\uA791': 'n',
    '\uA7A5': 'n',
    '\u01CC': 'nj',
    '\u24DE': 'o',
    '\uFF4F': 'o',
    '\u00F2': 'o',
    '\u00F3': 'o',
    '\u00F4': 'o',
    '\u1ED3': 'o',
    '\u1ED1': 'o',
    '\u1ED7': 'o',
    '\u1ED5': 'o',
    '\u00F5': 'o',
    '\u1E4D': 'o',
    '\u022D': 'o',
    '\u1E4F': 'o',
    '\u014D': 'o',
    '\u1E51': 'o',
    '\u1E53': 'o',
    '\u014F': 'o',
    '\u022F': 'o',
    '\u0231': 'o',
    '\u00F6': 'o',
    '\u022B': 'o',
    '\u1ECF': 'o',
    '\u0151': 'o',
    '\u01D2': 'o',
    '\u020D': 'o',
    '\u020F': 'o',
    '\u01A1': 'o',
    '\u1EDD': 'o',
    '\u1EDB': 'o',
    '\u1EE1': 'o',
    '\u1EDF': 'o',
    '\u1EE3': 'o',
    '\u1ECD': 'o',
    '\u1ED9': 'o',
    '\u01EB': 'o',
    '\u01ED': 'o',
    '\u00F8': 'o',
    '\u01FF': 'o',
    '\u0254': 'o',
    '\uA74B': 'o',
    '\uA74D': 'o',
    '\u0275': 'o',
    '\u01A3': 'oi',
    '\u0223': 'ou',
    '\uA74F': 'oo',
    '\u24DF': 'p',
    '\uFF50': 'p',
    '\u1E55': 'p',
    '\u1E57': 'p',
    '\u01A5': 'p',
    '\u1D7D': 'p',
    '\uA751': 'p',
    '\uA753': 'p',
    '\uA755': 'p',
    '\u24E0': 'q',
    '\uFF51': 'q',
    '\u024B': 'q',
    '\uA757': 'q',
    '\uA759': 'q',
    '\u24E1': 'r',
    '\uFF52': 'r',
    '\u0155': 'r',
    '\u1E59': 'r',
    '\u0159': 'r',
    '\u0211': 'r',
    '\u0213': 'r',
    '\u1E5B': 'r',
    '\u1E5D': 'r',
    '\u0157': 'r',
    '\u1E5F': 'r',
    '\u024D': 'r',
    '\u027D': 'r',
    '\uA75B': 'r',
    '\uA7A7': 'r',
    '\uA783': 'r',
    '\u24E2': 's',
    '\uFF53': 's',
    '\u00DF': 's',
    '\u015B': 's',
    '\u1E65': 's',
    '\u015D': 's',
    '\u1E61': 's',
    '\u0161': 's',
    '\u1E67': 's',
    '\u1E63': 's',
    '\u1E69': 's',
    '\u0219': 's',
    '\u015F': 's',
    '\u023F': 's',
    '\uA7A9': 's',
    '\uA785': 's',
    '\u1E9B': 's',
    '\u24E3': 't',
    '\uFF54': 't',
    '\u1E6B': 't',
    '\u1E97': 't',
    '\u0165': 't',
    '\u1E6D': 't',
    '\u021B': 't',
    '\u0163': 't',
    '\u1E71': 't',
    '\u1E6F': 't',
    '\u0167': 't',
    '\u01AD': 't',
    '\u0288': 't',
    '\u2C66': 't',
    '\uA787': 't',
    '\uA729': 'tz',
    '\u24E4': 'u',
    '\uFF55': 'u',
    '\u00F9': 'u',
    '\u00FA': 'u',
    '\u00FB': 'u',
    '\u0169': 'u',
    '\u1E79': 'u',
    '\u016B': 'u',
    '\u1E7B': 'u',
    '\u016D': 'u',
    '\u00FC': 'u',
    '\u01DC': 'u',
    '\u01D8': 'u',
    '\u01D6': 'u',
    '\u01DA': 'u',
    '\u1EE7': 'u',
    '\u016F': 'u',
    '\u0171': 'u',
    '\u01D4': 'u',
    '\u0215': 'u',
    '\u0217': 'u',
    '\u01B0': 'u',
    '\u1EEB': 'u',
    '\u1EE9': 'u',
    '\u1EEF': 'u',
    '\u1EED': 'u',
    '\u1EF1': 'u',
    '\u1EE5': 'u',
    '\u1E73': 'u',
    '\u0173': 'u',
    '\u1E77': 'u',
    '\u1E75': 'u',
    '\u0289': 'u',
    '\u24E5': 'v',
    '\uFF56': 'v',
    '\u1E7D': 'v',
    '\u1E7F': 'v',
    '\u028B': 'v',
    '\uA75F': 'v',
    '\u028C': 'v',
    '\uA761': 'vy',
    '\u24E6': 'w',
    '\uFF57': 'w',
    '\u1E81': 'w',
    '\u1E83': 'w',
    '\u0175': 'w',
    '\u1E87': 'w',
    '\u1E85': 'w',
    '\u1E98': 'w',
    '\u1E89': 'w',
    '\u2C73': 'w',
    '\u24E7': 'x',
    '\uFF58': 'x',
    '\u1E8B': 'x',
    '\u1E8D': 'x',
    '\u24E8': 'y',
    '\uFF59': 'y',
    '\u1EF3': 'y',
    '\u00FD': 'y',
    '\u0177': 'y',
    '\u1EF9': 'y',
    '\u0233': 'y',
    '\u1E8F': 'y',
    '\u00FF': 'y',
    '\u1EF7': 'y',
    '\u1E99': 'y',
    '\u1EF5': 'y',
    '\u01B4': 'y',
    '\u024F': 'y',
    '\u1EFF': 'y',
    '\u24E9': 'z',
    '\uFF5A': 'z',
    '\u017A': 'z',
    '\u1E91': 'z',
    '\u017C': 'z',
    '\u017E': 'z',
    '\u1E93': 'z',
    '\u1E95': 'z',
    '\u01B6': 'z',
    '\u0225': 'z',
    '\u0240': 'z',
    '\u2C6C': 'z',
    '\uA763': 'z',
    '\u0386': '\u0391',
    '\u0388': '\u0395',
    '\u0389': '\u0397',
    '\u038A': '\u0399',
    '\u03AA': '\u0399',
    '\u038C': '\u039F',
    '\u038E': '\u03A5',
    '\u03AB': '\u03A5',
    '\u038F': '\u03A9',
    '\u03AC': '\u03B1',
    '\u03AD': '\u03B5',
    '\u03AE': '\u03B7',
    '\u03AF': '\u03B9',
    '\u03CA': '\u03B9',
    '\u0390': '\u03B9',
    '\u03CC': '\u03BF',
    '\u03CD': '\u03C5',
    '\u03CB': '\u03C5',
    '\u03B0': '\u03C5',
    '\u03C9': '\u03C9',
    '\u03C2': '\u03C3'
  };

  return diacritics;
});

S2.define('select2/data/base',[
  '../utils'
], function (Utils) {
  function BaseAdapter ($element, options) {
    BaseAdapter.__super__.constructor.call(this);
  }

  Utils.Extend(BaseAdapter, Utils.Observable);

  BaseAdapter.prototype.current = function (callback) {
    throw new Error('The `current` method must be defined in child classes.');
  };

  BaseAdapter.prototype.query = function (params, callback) {
    throw new Error('The `query` method must be defined in child classes.');
  };

  BaseAdapter.prototype.bind = function (container, $container) {
    // Can be implemented in subclasses
  };

  BaseAdapter.prototype.destroy = function () {
    // Can be implemented in subclasses
  };

  BaseAdapter.prototype.generateResultId = function (container, data) {
    var id = container.id + '-result-';

    id += Utils.generateChars(4);

    if (data.id != null) {
      id += '-' + data.id.toString();
    } else {
      id += '-' + Utils.generateChars(4);
    }
    return id;
  };

  return BaseAdapter;
});

S2.define('select2/data/select',[
  './base',
  '../utils',
  'jquery'
], function (BaseAdapter, Utils, $) {
  function SelectAdapter ($element, options) {
    this.$element = $element;
    this.options = options;

    SelectAdapter.__super__.constructor.call(this);
  }

  Utils.Extend(SelectAdapter, BaseAdapter);

  SelectAdapter.prototype.current = function (callback) {
    var data = [];
    var self = this;

    this.$element.find(':selected').each(function () {
      var $option = $(this);

      var option = self.item($option);

      data.push(option);
    });

    callback(data);
  };

  SelectAdapter.prototype.select = function (data) {
    var self = this;

    data.selected = true;

    // If data.element is a DOM node, use it instead
    if ($(data.element).is('option')) {
      data.element.selected = true;

      this.$element.trigger('change');

      return;
    }

    if (this.$element.prop('multiple')) {
      this.current(function (currentData) {
        var val = [];

        data = [data];
        data.push.apply(data, currentData);

        for (var d = 0; d < data.length; d++) {
          var id = data[d].id;

          if ($.inArray(id, val) === -1) {
            val.push(id);
          }
        }

        self.$element.val(val);
        self.$element.trigger('change');
      });
    } else {
      var val = data.id;

      this.$element.val(val);
      this.$element.trigger('change');
    }
  };

  SelectAdapter.prototype.unselect = function (data) {
    var self = this;

    if (!this.$element.prop('multiple')) {
      return;
    }

    data.selected = false;

    if ($(data.element).is('option')) {
      data.element.selected = false;

      this.$element.trigger('change');

      return;
    }

    this.current(function (currentData) {
      var val = [];

      for (var d = 0; d < currentData.length; d++) {
        var id = currentData[d].id;

        if (id !== data.id && $.inArray(id, val) === -1) {
          val.push(id);
        }
      }

      self.$element.val(val);

      self.$element.trigger('change');
    });
  };

  SelectAdapter.prototype.bind = function (container, $container) {
    var self = this;

    this.container = container;

    container.on('select', function (params) {
      self.select(params.data);
    });

    container.on('unselect', function (params) {
      self.unselect(params.data);
    });
  };

  SelectAdapter.prototype.destroy = function () {
    // Remove anything added to child elements
    this.$element.find('*').each(function () {
      // Remove any custom data set by Select2
      $.removeData(this, 'data');
    });
  };

  SelectAdapter.prototype.query = function (params, callback) {
    var data = [];
    var self = this;

    var $options = this.$element.children();

    $options.each(function () {
      var $option = $(this);

      if (!$option.is('option') && !$option.is('optgroup')) {
        return;
      }

      var option = self.item($option);

      var matches = self.matches(params, option);

      if (matches !== null) {
        data.push(matches);
      }
    });

    callback({
      results: data
    });
  };

  SelectAdapter.prototype.addOptions = function ($options) {
    Utils.appendMany(this.$element, $options);
  };

  SelectAdapter.prototype.option = function (data) {
    var option;

    if (data.children) {
      option = document.createElement('optgroup');
      option.label = data.text;
    } else {
      option = document.createElement('option');

      if (option.textContent !== undefined) {
        option.textContent = data.text;
      } else {
        option.innerText = data.text;
      }
    }

    if (data.id) {
      option.value = data.id;
    }

    if (data.disabled) {
      option.disabled = true;
    }

    if (data.selected) {
      option.selected = true;
    }

    if (data.title) {
      option.title = data.title;
    }

    var $option = $(option);

    var normalizedData = this._normalizeItem(data);
    normalizedData.element = option;

    // Override the option's data with the combined data
    $.data(option, 'data', normalizedData);

    return $option;
  };

  SelectAdapter.prototype.item = function ($option) {
    var data = {};

    data = $.data($option[0], 'data');

    if (data != null) {
      return data;
    }

    if ($option.is('option')) {
      data = {
        id: $option.val(),
        text: $option.text(),
        disabled: $option.prop('disabled'),
        selected: $option.prop('selected'),
        title: $option.prop('title')
      };
    } else if ($option.is('optgroup')) {
      data = {
        text: $option.prop('label'),
        children: [],
        title: $option.prop('title')
      };

      var $children = $option.children('option');
      var children = [];

      for (var c = 0; c < $children.length; c++) {
        var $child = $($children[c]);

        var child = this.item($child);

        children.push(child);
      }

      data.children = children;
    }

    data = this._normalizeItem(data);
    data.element = $option[0];

    $.data($option[0], 'data', data);

    return data;
  };

  SelectAdapter.prototype._normalizeItem = function (item) {
    if (!$.isPlainObject(item)) {
      item = {
        id: item,
        text: item
      };
    }

    item = $.extend({}, {
      text: ''
    }, item);

    var defaults = {
      selected: false,
      disabled: false
    };

    if (item.id != null) {
      item.id = item.id.toString();
    }

    if (item.text != null) {
      item.text = item.text.toString();
    }

    if (item._resultId == null && item.id && this.container != null) {
      item._resultId = this.generateResultId(this.container, item);
    }

    return $.extend({}, defaults, item);
  };

  SelectAdapter.prototype.matches = function (params, data) {
    var matcher = this.options.get('matcher');

    return matcher(params, data);
  };

  return SelectAdapter;
});

S2.define('select2/data/array',[
  './select',
  '../utils',
  'jquery'
], function (SelectAdapter, Utils, $) {
  function ArrayAdapter ($element, options) {
    var data = options.get('data') || [];

    ArrayAdapter.__super__.constructor.call(this, $element, options);

    this.addOptions(this.convertToOptions(data));
  }

  Utils.Extend(ArrayAdapter, SelectAdapter);

  ArrayAdapter.prototype.select = function (data) {
    var $option = this.$element.find('option').filter(function (i, elm) {
      return elm.value == data.id.toString();
    });

    if ($option.length === 0) {
      $option = this.option(data);

      this.addOptions($option);
    }

    ArrayAdapter.__super__.select.call(this, data);
  };

  ArrayAdapter.prototype.convertToOptions = function (data) {
    var self = this;

    var $existing = this.$element.find('option');
    var existingIds = $existing.map(function () {
      return self.item($(this)).id;
    }).get();

    var $options = [];

    // Filter out all items except for the one passed in the argument
    function onlyItem (item) {
      return function () {
        return $(this).val() == item.id;
      };
    }

    for (var d = 0; d < data.length; d++) {
      var item = this._normalizeItem(data[d]);

      // Skip items which were pre-loaded, only merge the data
      if ($.inArray(item.id, existingIds) >= 0) {
        var $existingOption = $existing.filter(onlyItem(item));

        var existingData = this.item($existingOption);
        var newData = $.extend(true, {}, existingData, item);

        var $newOption = this.option(newData);

        $existingOption.replaceWith($newOption);

        continue;
      }

      var $option = this.option(item);

      if (item.children) {
        var $children = this.convertToOptions(item.children);

        Utils.appendMany($option, $children);
      }

      $options.push($option);
    }

    return $options;
  };

  return ArrayAdapter;
});

S2.define('select2/data/ajax',[
  './array',
  '../utils',
  'jquery'
], function (ArrayAdapter, Utils, $) {
  function AjaxAdapter ($element, options) {
    this.ajaxOptions = this._applyDefaults(options.get('ajax'));

    if (this.ajaxOptions.processResults != null) {
      this.processResults = this.ajaxOptions.processResults;
    }

    AjaxAdapter.__super__.constructor.call(this, $element, options);
  }

  Utils.Extend(AjaxAdapter, ArrayAdapter);

  AjaxAdapter.prototype._applyDefaults = function (options) {
    var defaults = {
      data: function (params) {
        return {          
          q: params.term
        };
      },
      transport: function (params, success, failure) {
        var $request = $.ajax(params);

        $request.then(success);
        $request.fail(failure);

        return $request;
      }
    };

    return $.extend({}, defaults, options, true);
  };

  AjaxAdapter.prototype.processResults = function (results) {
    return results;
  };

  AjaxAdapter.prototype.query = function (params, callback) {
    var matches = [];
    var self = this;

    if (this._request != null) {
      // JSONP requests cannot always be aborted
      if ($.isFunction(this._request.abort)) {
        this._request.abort();
      }

      this._request = null;
    }

    var options = $.extend({
      type: 'GET'
    }, this.ajaxOptions);

    if (typeof options.url === 'function') {
      options.url = options.url(params);
    }

    if (typeof options.data === 'function') {
      //console.log("enter in data -------");
      // console.log(this);
      //console.log(this.$element.select2("extraParams"));
      options.data = options.data(params, this.$element.select2("extraParams"));
    }

    function request () {
      var $request = options.transport(options, function (data) {
        var results = self.processResults(data, params);

        if (self.options.get('debug') && window.console && console.error) {
          // Check to make sure that the response included a `results` key.
          if (!results || !results.results || !$.isArray(results.results)) {
            console.error(
              'Select2: The AJAX results did not return an array in the ' +
              '`results` key of the response.'
            );
          }
        }

        callback(results);
      }, function () {
        // TODO: Handle AJAX errors
      });

      self._request = $request;
    }

    if (this.ajaxOptions.delay && params.term !== '') {
      if (this._queryTimeout) {
        window.clearTimeout(this._queryTimeout);
      }

      this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
    } else {
      request();
    }
  };

  return AjaxAdapter;
});

S2.define('select2/data/tags',[
  'jquery'
], function ($) {
  function Tags (decorated, $element, options) {
    var tags = options.get('tags');

    var createTag = options.get('createTag');

    if (createTag !== undefined) {
      this.createTag = createTag;
    }

    decorated.call(this, $element, options);

    if ($.isArray(tags)) {
      for (var t = 0; t < tags.length; t++) {
        var tag = tags[t];
        var item = this._normalizeItem(tag);

        var $option = this.option(item);

        this.$element.append($option);
      }
    }
  }

  Tags.prototype.query = function (decorated, params, callback) {
    var self = this;

    this._removeOldTags();

    if (params.term == null || params.page != null) {
      decorated.call(this, params, callback);
      return;
    }

    function wrapper (obj, child) {
      var data = obj.results;

      for (var i = 0; i < data.length; i++) {
        var option = data[i];

        var checkChildren = (
          option.children != null &&
          !wrapper({
            results: option.children
          }, true)
        );

        var checkText = option.text === params.term;

        if (checkText || checkChildren) {
          if (child) {
            return false;
          }

          obj.data = data;
          callback(obj);

          return;
        }
      }

      if (child) {
        return true;
      }

      var tag = self.createTag(params);

      if (tag != null) {
        var $option = self.option(tag);
        $option.attr('data-select2-tag', true);

        self.addOptions([$option]);

        self.insertTag(data, tag);
      }

      obj.results = data;

      callback(obj);
    }

    decorated.call(this, params, wrapper);
  };

  Tags.prototype.createTag = function (decorated, params) {
    var term = $.trim(params.term);

    if (term === '') {
      return null;
    }

    return {
      id: term,
      text: term
    };
  };

  Tags.prototype.insertTag = function (_, data, tag) {
    data.unshift(tag);
  };

  Tags.prototype._removeOldTags = function (_) {
    var tag = this._lastTag;

    var $options = this.$element.find('option[data-select2-tag]');

    $options.each(function () {
      if (this.selected) {
        return;
      }

      $(this).remove();
    });
  };

  return Tags;
});

S2.define('select2/data/tokenizer',[
  'jquery'
], function ($) {
  function Tokenizer (decorated, $element, options) {
    var tokenizer = options.get('tokenizer');

    if (tokenizer !== undefined) {
      this.tokenizer = tokenizer;
    }

    decorated.call(this, $element, options);
  }

  Tokenizer.prototype.bind = function (decorated, container, $container) {
    decorated.call(this, container, $container);

    this.$search =  container.dropdown.$search || container.selection.$search ||
      $container.find('.select2-search__field');
  };

  Tokenizer.prototype.query = function (decorated, params, callback) {
    var self = this;

    function select (data) {
      self.trigger('select', {
        data: data
      });
    }

    params.term = params.term || '';

    var tokenData = this.tokenizer(params, this.options, select);

    if (tokenData.term !== params.term) {
      // Replace the search term if we have the search box
      if (this.$search.length) {
        this.$search.val(tokenData.term);
        this.$search.focus();
      }

      params.term = tokenData.term;
    }

    decorated.call(this, params, callback);
  };

  Tokenizer.prototype.tokenizer = function (_, params, options, callback) {
    var separators = options.get('tokenSeparators') || [];
    var term = params.term;
    var i = 0;

    var createTag = this.createTag || function (params) {
      return {
        id: params.term,
        text: params.term
      };
    };

    while (i < term.length) {
      var termChar = term[i];

      if ($.inArray(termChar, separators) === -1) {
        i++;

        continue;
      }

      var part = term.substr(0, i);
      var partParams = $.extend({}, params, {
        term: part
      });

      var data = createTag(partParams);

      if (data == null) {
        i++;
        continue;
      }

      callback(data);

      // Reset the term to not include the tokenized portion
      term = term.substr(i + 1) || '';
      i = 0;
    }

    return {
      term: term
    };
  };

  return Tokenizer;
});

S2.define('select2/data/minimumInputLength',[

], function () {
  function MinimumInputLength (decorated, $e, options) {
    this.minimumInputLength = options.get('minimumInputLength');

    decorated.call(this, $e, options);
  }

  MinimumInputLength.prototype.query = function (decorated, params, callback) {
    params.term = params.term || '';

    if (params.term.length < this.minimumInputLength) {
      this.trigger('results:message', {
        message: 'inputTooShort',
        args: {
          minimum: this.minimumInputLength,
          input: params.term,
          params: params
        }
      });

      return;
    }

    decorated.call(this, params, callback);
  };

  return MinimumInputLength;
});

S2.define('select2/data/maximumInputLength',[

], function () {
  function MaximumInputLength (decorated, $e, options) {
    this.maximumInputLength = options.get('maximumInputLength');

    decorated.call(this, $e, options);
  }

  MaximumInputLength.prototype.query = function (decorated, params, callback) {
    params.term = params.term || '';

    if (this.maximumInputLength > 0 &&
        params.term.length > this.maximumInputLength) {
      this.trigger('results:message', {
        message: 'inputTooLong',
        args: {
          maximum: this.maximumInputLength,
          input: params.term,
          params: params
        }
      });

      return;
    }

    decorated.call(this, params, callback);
  };

  return MaximumInputLength;
});

S2.define('select2/data/maximumSelectionLength',[

], function (){
  function MaximumSelectionLength (decorated, $e, options) {
    this.maximumSelectionLength = options.get('maximumSelectionLength');

    decorated.call(this, $e, options);
  }

  MaximumSelectionLength.prototype.query =
    function (decorated, params, callback) {
      var self = this;

      this.current(function (currentData) {
        var count = currentData != null ? currentData.length : 0;
        if (self.maximumSelectionLength > 0 &&
          count >= self.maximumSelectionLength) {
          self.trigger('results:message', {
            message: 'maximumSelected',
            args: {
              maximum: self.maximumSelectionLength
            }
          });
          return;
        }
        decorated.call(self, params, callback);
      });
  };

  return MaximumSelectionLength;
});

S2.define('select2/dropdown',[
  'jquery',
  './utils'
], function ($, Utils) {
  function Dropdown ($element, options) {
    this.$element = $element;
    this.options = options;

    Dropdown.__super__.constructor.call(this);
  }

  Utils.Extend(Dropdown, Utils.Observable);

  Dropdown.prototype.render = function () {
    var $dropdown = $(
      '<span class="select2-dropdown">' +
        '<span class="select2-results"></span>' +
      '</span>'
    );

    $dropdown.attr('dir', this.options.get('dir'));

    this.$dropdown = $dropdown;

    return $dropdown;
  };

  Dropdown.prototype.position = function ($dropdown, $container) {
    // Should be implmented in subclasses
  };

  Dropdown.prototype.destroy = function () {
    // Remove the dropdown from the DOM
    this.$dropdown.remove();
  };

  return Dropdown;
});

S2.define('select2/dropdown/search',[
  'jquery',
  '../utils'
], function ($, Utils) {
  function Search () { }

  Search.prototype.render = function (decorated) {
    var $rendered = decorated.call(this);

    var $search = $(
      '<span class="select2-search select2-search--dropdown">' +
        '<input class="select2-search__field" type="search" tabindex="-1"' +
        ' autocomplete="off" autocorrect="off" autocapitalize="off"' +
        ' spellcheck="false" role="textbox" />' +
      '</span>'
    );

    this.$searchContainer = $search;
    this.$search = $search.find('input');

    $rendered.prepend($search);

    return $rendered;
  };

  Search.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    this.$search.on('keydown', function (evt) {
      self.trigger('keypress', evt);

      self._keyUpPrevented = evt.isDefaultPrevented();
    });

    // Workaround for browsers which do not support the `input` event
    // This will prevent double-triggering of events for browsers which support
    // both the `keyup` and `input` events.
    this.$search.on('input', function (evt) {
      // Unbind the duplicated `keyup` event
      $(this).off('keyup');
    });

    this.$search.on('keyup input', function (evt) {
      self.handleSearch(evt);
    });

    container.on('open', function () {
      self.$search.attr('tabindex', 0);

      self.$search.focus();

      window.setTimeout(function () {
        self.$search.focus();
      }, 0);
    });

    container.on('close', function () {
      self.$search.attr('tabindex', -1);

      self.$search.val('');
    });

    container.on('results:all', function (params) {
      if (params.query.term == null || params.query.term === '') {
        var showSearch = self.showSearch(params);

        if (showSearch) {
          self.$searchContainer.removeClass('select2-search--hide');
        } else {
          self.$searchContainer.addClass('select2-search--hide');
        }
      }
    });
  };

  Search.prototype.handleSearch = function (evt) {
    if (!this._keyUpPrevented) {
      var input = this.$search.val();

      this.trigger('query', {
        term: input
      });
    }

    this._keyUpPrevented = false;
  };

  Search.prototype.showSearch = function (_, params) {
    return true;
  };

  return Search;
});

S2.define('select2/dropdown/hidePlaceholder',[

], function () {
  function HidePlaceholder (decorated, $element, options, dataAdapter) {
    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

    decorated.call(this, $element, options, dataAdapter);
  }

  HidePlaceholder.prototype.append = function (decorated, data) {
    data.results = this.removePlaceholder(data.results);

    decorated.call(this, data);
  };

  HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {
    if (typeof placeholder === 'string') {
      placeholder = {
        id: '',
        text: placeholder
      };
    }

    return placeholder;
  };

  HidePlaceholder.prototype.removePlaceholder = function (_, data) {
    var modifiedData = data.slice(0);

    for (var d = data.length - 1; d >= 0; d--) {
      var item = data[d];

      if (this.placeholder.id === item.id) {
        modifiedData.splice(d, 1);
      }
    }

    return modifiedData;
  };

  return HidePlaceholder;
});

S2.define('select2/dropdown/infiniteScroll',[
  'jquery'
], function ($) {
  function InfiniteScroll (decorated, $element, options, dataAdapter) {
    this.lastParams = {};

    decorated.call(this, $element, options, dataAdapter);

    this.$loadingMore = this.createLoadingMore();
    this.loading = false;
  }

  InfiniteScroll.prototype.append = function (decorated, data) {
    this.$loadingMore.remove();
    this.loading = false;

    decorated.call(this, data);

    if (this.showLoadingMore(data)) {
      this.$results.append(this.$loadingMore);
    }
  };

  InfiniteScroll.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('query', function (params) {
      self.lastParams = params;
      self.loading = true;
    });

    container.on('query:append', function (params) {
      self.lastParams = params;
      self.loading = true;
    });

    this.$results.on('scroll', function () {
      var isLoadMoreVisible = $.contains(
        document.documentElement,
        self.$loadingMore[0]
      );

      if (self.loading || !isLoadMoreVisible) {
        return;
      }

      var currentOffset = self.$results.offset().top +
        self.$results.outerHeight(false);
      var loadingMoreOffset = self.$loadingMore.offset().top +
        self.$loadingMore.outerHeight(false);

      if (currentOffset + 50 >= loadingMoreOffset) {
        self.loadMore();
      }
    });
  };

  InfiniteScroll.prototype.loadMore = function () {
    this.loading = true;

    var params = $.extend({}, {page: 1}, this.lastParams);

    params.page++;

    this.trigger('query:append', params);
  };

  InfiniteScroll.prototype.showLoadingMore = function (_, data) {
    return data.pagination && data.pagination.more;
  };

  InfiniteScroll.prototype.createLoadingMore = function () {
    var $option = $(
      '<li class="option load-more" role="treeitem"></li>'
    );

    var message = this.options.get('translations').get('loadingMore');

    $option.html(message(this.lastParams));

    return $option;
  };

  return InfiniteScroll;
});

S2.define('select2/dropdown/attachBody',[
  'jquery',
  '../utils'
], function ($, Utils) {
  function AttachBody (decorated, $element, options) {
    this.$dropdownParent = options.get('dropdownParent') || document.body;

    decorated.call(this, $element, options);
  }

  AttachBody.prototype.bind = function (decorated, container, $container) {
    var self = this;

    var setupResultsEvents = false;

    decorated.call(this, container, $container);

    container.on('open', function () {
      self._showDropdown();
      self._attachPositioningHandler(container);

      if (!setupResultsEvents) {
        setupResultsEvents = true;

        container.on('results:all', function () {
          self._positionDropdown();
          self._resizeDropdown();
        });

        container.on('results:append', function () {
          self._positionDropdown();
          self._resizeDropdown();
        });
      }
    });

    container.on('close', function () {
      self._hideDropdown();
      self._detachPositioningHandler(container);
    });

    this.$dropdownContainer.on('mousedown', function (evt) {
      evt.stopPropagation();
    });
  };

  AttachBody.prototype.destroy = function (decorated) {
    decorated.call(this);

    this.$dropdownContainer.remove();
  };

  AttachBody.prototype.position = function (decorated, $dropdown, $container) {
    // Clone all of the container classes
    $dropdown.attr('class', $container.attr('class'));

    $dropdown.removeClass('select2');
    $dropdown.addClass('select2-container--open');

    $dropdown.css({
      position: 'absolute',
      top: -999999
    });

    this.$container = $container;
  };

  AttachBody.prototype.render = function (decorated) {
    var $container = $('<span></span>');

    var $dropdown = decorated.call(this);
    $container.append($dropdown);

    this.$dropdownContainer = $container;

    return $container;
  };

  AttachBody.prototype._hideDropdown = function (decorated) {
    this.$dropdownContainer.detach();
  };

  AttachBody.prototype._attachPositioningHandler = function (container) {
    var self = this;

    var scrollEvent = 'scroll.select2.' + container.id;
    var resizeEvent = 'resize.select2.' + container.id;
    var orientationEvent = 'orientationchange.select2.' + container.id;

    var $watchers = this.$container.parents().filter(Utils.hasScroll);
    $watchers.each(function () {
      $(this).data('select2-scroll-position', {
        x: $(this).scrollLeft(),
        y: $(this).scrollTop()
      });
    });

    $watchers.on(scrollEvent, function (ev) {
      var position = $(this).data('select2-scroll-position');
      $(this).scrollTop(position.y);
    });

    $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent,
      function (e) {
      self._positionDropdown();
      self._resizeDropdown();
    });
  };

  AttachBody.prototype._detachPositioningHandler = function (container) {
    var scrollEvent = 'scroll.select2.' + container.id;
    var resizeEvent = 'resize.select2.' + container.id;
    var orientationEvent = 'orientationchange.select2.' + container.id;

    var $watchers = this.$container.parents().filter(Utils.hasScroll);
    $watchers.off(scrollEvent);

    $(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
  };

  AttachBody.prototype._positionDropdown = function () {
    var $window = $(window);

    var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
    var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');

    var newDirection = null;

    var position = this.$container.position();
    var offset = this.$container.offset();

    offset.bottom = offset.top + this.$container.outerHeight(false);

    var container = {
      height: this.$container.outerHeight(false)
    };

    container.top = offset.top;
    container.bottom = offset.top + container.height;

    var dropdown = {
      height: this.$dropdown.outerHeight(false)
    };

    var viewport = {
      top: $window.scrollTop(),
      bottom: $window.scrollTop() + $window.height()
    };

    var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
    var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);

    var css = {
      left: offset.left,
      top: container.bottom
    };

    if (!isCurrentlyAbove && !isCurrentlyBelow) {
      newDirection = 'below';
    }

    if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
      newDirection = 'above';
    } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
      newDirection = 'below';
    }

    if (newDirection == 'above' ||
      (isCurrentlyAbove && newDirection !== 'below')) {
      css.top = container.top - dropdown.height;
    }

    if (newDirection != null) {
      this.$dropdown
        .removeClass('select2-dropdown--below select2-dropdown--above')
        .addClass('select2-dropdown--' + newDirection);
      this.$container
        .removeClass('select2-container--below select2-container--above')
        .addClass('select2-container--' + newDirection);
    }

    this.$dropdownContainer.css(css);
  };

  AttachBody.prototype._resizeDropdown = function () {
    var css = {
      width: this.$container.outerWidth(false) + 'px'
    };

    if (this.options.get('dropdownAutoWidth')) {
      css.minWidth = css.width;
      css.width = 'auto';
    }

    this.$dropdown.css(css);
  };

  AttachBody.prototype._showDropdown = function (decorated) {
    this.$dropdownContainer.appendTo(this.$dropdownParent);

    this._positionDropdown();
    this._resizeDropdown();
  };

  return AttachBody;
});

S2.define('select2/dropdown/minimumResultsForSearch',[

], function () {
  function countResults (data) {
    var count = 0;

    for (var d = 0; d < data.length; d++) {
      var item = data[d];

      if (item.children) {
        count += countResults(item.children);
      } else {
        count++;
      }
    }

    return count;
  }

  function MinimumResultsForSearch (decorated, $element, options, dataAdapter) {
    this.minimumResultsForSearch = options.get('minimumResultsForSearch');

    if (this.minimumResultsForSearch < 0) {
      this.minimumResultsForSearch = Infinity;
    }

    decorated.call(this, $element, options, dataAdapter);
  }

  MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {
    if (countResults(params.data.results) < this.minimumResultsForSearch) {
      return false;
    }

    return decorated.call(this, params);
  };

  return MinimumResultsForSearch;
});

S2.define('select2/dropdown/selectOnClose',[

], function () {
  function SelectOnClose () { }

  SelectOnClose.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('close', function () {
      self._handleSelectOnClose();
    });
  };

  SelectOnClose.prototype._handleSelectOnClose = function () {
    var $highlightedResults = this.getHighlightedResults();

    if ($highlightedResults.length < 1) {
      return;
    }

    this.trigger('select', {
        data: $highlightedResults.data('data')
    });
  };

  return SelectOnClose;
});

S2.define('select2/dropdown/closeOnSelect',[

], function () {
  function CloseOnSelect () { }

  CloseOnSelect.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('select', function (evt) {
      self._selectTriggered(evt);
    });

    container.on('unselect', function (evt) {
      self._selectTriggered(evt);
    });
  };

  CloseOnSelect.prototype._selectTriggered = function (_, evt) {
    var originalEvent = evt.originalEvent;

    // Don't close if the control key is being held
    if (originalEvent && originalEvent.ctrlKey) {
      return;
    }

    this.trigger('close', {});
  };

  return CloseOnSelect;
});

S2.define('select2/i18n/en',[],function () {
  // English
  return {
    errorLoading: function () {
      return 'The results could not be loaded.';
    },
    inputTooLong: function (args) {
      var overChars = args.input.length - args.maximum;

      var message = 'Please delete ' + overChars + ' character';

      if (overChars != 1) {
        message += 's';
      }

      return message;
    },
    inputTooShort: function (args) {
      var remainingChars = args.minimum - args.input.length;

      var message = 'Please enter ' + remainingChars + ' or more characters';

      return message;
    },
    loadingMore: function () {
      return 'Loading more results…';
    },
    maximumSelected: function (args) {
      var message = 'You can only select ' + args.maximum + ' item';

      if (args.maximum != 1) {
        message += 's';
      }

      return message;
    },
    noResults: function () {
      return 'No results found';
    },
    searching: function () {
      return 'Searching…';
    }
  };
});

S2.define('select2/defaults',[
  'jquery',
  'require',

  './results',

  './selection/single',
  './selection/multiple',
  './selection/placeholder',
  './selection/allowClear',
  './selection/search',
  './selection/eventRelay',

  './utils',
  './translation',
  './diacritics',

  './data/select',
  './data/array',
  './data/ajax',
  './data/tags',
  './data/tokenizer',
  './data/minimumInputLength',
  './data/maximumInputLength',
  './data/maximumSelectionLength',

  './dropdown',
  './dropdown/search',
  './dropdown/hidePlaceholder',
  './dropdown/infiniteScroll',
  './dropdown/attachBody',
  './dropdown/minimumResultsForSearch',
  './dropdown/selectOnClose',
  './dropdown/closeOnSelect',

  './i18n/en'
], function ($, require,

             ResultsList,

             SingleSelection, MultipleSelection, Placeholder, AllowClear,
             SelectionSearch, EventRelay,

             Utils, Translation, DIACRITICS,

             SelectData, ArrayData, AjaxData, Tags, Tokenizer,
             MinimumInputLength, MaximumInputLength, MaximumSelectionLength,

             Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll,
             AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect,

             EnglishTranslation) {
  function Defaults () {
    this.reset();
  }

  Defaults.prototype.apply = function (options) {
    options = $.extend({}, this.defaults, options);

    if (options.dataAdapter == null) {
      if (options.ajax != null) {
        options.dataAdapter = AjaxData;
      } else if (options.data != null) {
        options.dataAdapter = ArrayData;
      } else {
        options.dataAdapter = SelectData;
      }

      if (options.minimumInputLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MinimumInputLength
        );
      }

      if (options.maximumInputLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MaximumInputLength
        );
      }

      if (options.maximumSelectionLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MaximumSelectionLength
        );
      }

      if (options.tags) {
        options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
      }

      if (options.tokenSeparators != null || options.tokenizer != null) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          Tokenizer
        );
      }

      if (options.query != null) {
        var Query = require(options.amdBase + 'compat/query');

        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          Query
        );
      }

      if (options.initSelection != null) {
        var InitSelection = require(options.amdBase + 'compat/initSelection');

        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          InitSelection
        );
      }
    }

    if (options.resultsAdapter == null) {
      options.resultsAdapter = ResultsList;

      if (options.ajax != null) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          InfiniteScroll
        );
      }

      if (options.placeholder != null) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          HidePlaceholder
        );
      }

      if (options.selectOnClose) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          SelectOnClose
        );
      }
    }

    if (options.dropdownAdapter == null) {
      if (options.multiple) {
        options.dropdownAdapter = Dropdown;
      } else {
        var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);

        options.dropdownAdapter = SearchableDropdown;
      }

      if (options.minimumResultsForSearch !== 0) {
        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          MinimumResultsForSearch
        );
      }

      if (options.closeOnSelect) {
        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          CloseOnSelect
        );
      }

      if (
        options.dropdownCssClass != null ||
        options.dropdownCss != null ||
        options.adaptDropdownCssClass != null
      ) {
        var DropdownCSS = require(options.amdBase + 'compat/dropdownCss');

        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          DropdownCSS
        );
      }

      options.dropdownAdapter = Utils.Decorate(
        options.dropdownAdapter,
        AttachBody
      );
    }

    if (options.selectionAdapter == null) {
      if (options.multiple) {
        options.selectionAdapter = MultipleSelection;
      } else {
        options.selectionAdapter = SingleSelection;
      }

      // Add the placeholder mixin if a placeholder was specified
      if (options.placeholder != null) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          Placeholder
        );
      }

      if (options.allowClear) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          AllowClear
        );
      }

      if (options.multiple) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          SelectionSearch
        );
      }

      if (
        options.containerCssClass != null ||
        options.containerCss != null ||
        options.adaptContainerCssClass != null
      ) {
        var ContainerCSS = require(options.amdBase + 'compat/containerCss');

        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          ContainerCSS
        );
      }

      options.selectionAdapter = Utils.Decorate(
        options.selectionAdapter,
        EventRelay
      );
    }

    if (typeof options.language === 'string') {
      // Check if the language is specified with a region
      if (options.language.indexOf('-') > 0) {
        // Extract the region information if it is included
        var languageParts = options.language.split('-');
        var baseLanguage = languageParts[0];

        options.language = [options.language, baseLanguage];
      } else {
        options.language = [options.language];
      }
    }

    if ($.isArray(options.language)) {
      var languages = new Translation();
      options.language.push('en');

      var languageNames = options.language;

      for (var l = 0; l < languageNames.length; l++) {
        var name = languageNames[l];
        var language = {};

        try {
          // Try to load it with the original name
          language = Translation.loadPath(name);
        } catch (e) {
          try {
            // If we couldn't load it, check if it wasn't the full path
            name = this.defaults.amdLanguageBase + name;
            language = Translation.loadPath(name);
          } catch (ex) {
            // The translation could not be loaded at all. Sometimes this is
            // because of a configuration problem, other times this can be
            // because of how Select2 helps load all possible translation files.
            if (options.debug && window.console && console.warn) {
              console.warn(
                'Select2: The language file for "' + name + '" could not be ' +
                'automatically loaded. A fallback will be used instead.'
              );
            }

            continue;
          }
        }

        languages.extend(language);
      }

      options.translations = languages;
    } else {
      var baseTranslation = Translation.loadPath(
        this.defaults.amdLanguageBase + 'en'
      );
      var customTranslation = new Translation(options.language);

      customTranslation.extend(baseTranslation);

      options.translations = customTranslation;
    }

    return options;
  };

  Defaults.prototype.reset = function () {
    function stripDiacritics (text) {
      // Used 'uni range + named function' from http://jsperf.com/diacritics/18
      function match(a) {
        return DIACRITICS[a] || a;
      }

      return text.replace(/[^\u0000-\u007E]/g, match);
    }

    function matcher (params, data) {
      // Always return the object if there is nothing to compare
      if ($.trim(params.term) === '') {
        return data;
      }

      // Do a recursive check for options with children
      if (data.children && data.children.length > 0) {
        // Clone the data object if there are children
        // This is required as we modify the object to remove any non-matches
        var match = $.extend(true, {}, data);

        // Check each child of the option
        for (var c = data.children.length - 1; c >= 0; c--) {
          var child = data.children[c];

          var matches = matcher(params, child);

          // If there wasn't a match, remove the object in the array
          if (matches == null) {
            match.children.splice(c, 1);
          }
        }

        // If any children matched, return the new object
        if (match.children.length > 0) {
          return match;
        }

        // If there were no matching children, check just the plain object
        return matcher(params, match);
      }

      var original = stripDiacritics(data.text).toUpperCase();
      var term = stripDiacritics(params.term).toUpperCase();

      // Check if the text contains the term
      if (original.indexOf(term) > -1) {
        return data;
      }

      // If it doesn't contain the term, don't return anything
      return null;
    }

    this.defaults = {
      amdBase: './',
      amdLanguageBase: './i18n/',
      closeOnSelect: true,
      debug: false,
      dropdownAutoWidth: false,
      escapeMarkup: Utils.escapeMarkup,
      language: EnglishTranslation,
      matcher: matcher,
      minimumInputLength: 0,
      maximumInputLength: 0,
      maximumSelectionLength: 0,
      minimumResultsForSearch: 0,
      selectOnClose: false,
      sorter: function (data) {
        return data;
      },
      templateResult: function (result) {
        return result.text;
      },
      templateSelection: function (selection) {
        return selection.text;
      },
      theme: 'default',
      width: 'resolve'
    };
  };

  Defaults.prototype.set = function (key, value) {
    var camelKey = $.camelCase(key);

    var data = {};
    data[camelKey] = value;

    var convertedData = Utils._convertData(data);

    $.extend(this.defaults, convertedData);
  };

  var defaults = new Defaults();

  return defaults;
});

S2.define('select2/options',[
  'require',
  'jquery',
  './defaults',
  './utils'
], function (require, $, Defaults, Utils) {
  function Options (options, $element) {
    this.options = options;

    if ($element != null) {
      this.fromElement($element);
    }

    this.options = Defaults.apply(this.options);

    if ($element && $element.is('input')) {
      var InputCompat = require(this.get('amdBase') + 'compat/inputData');

      this.options.dataAdapter = Utils.Decorate(
        this.options.dataAdapter,
        InputCompat
      );
    }
  }

  Options.prototype.fromElement = function ($e) {
    var excludedData = ['select2'];

    if (this.options.multiple == null) {
      this.options.multiple = $e.prop('multiple');
    }

    if (this.options.disabled == null) {
      this.options.disabled = $e.prop('disabled');
    }

    if (this.options.language == null) {
      if ($e.prop('lang')) {
        this.options.language = $e.prop('lang').toLowerCase();
      } else if ($e.closest('[lang]').prop('lang')) {
        this.options.language = $e.closest('[lang]').prop('lang');
      }
    }

    if (this.options.dir == null) {
      if ($e.prop('dir')) {
        this.options.dir = $e.prop('dir');
      } else if ($e.closest('[dir]').prop('dir')) {
        this.options.dir = $e.closest('[dir]').prop('dir');
      } else {
        this.options.dir = 'ltr';
      }
    }

    $e.prop('disabled', this.options.disabled);
    $e.prop('multiple', this.options.multiple);

    if ($e.data('select2Tags')) {
      if (this.options.debug && window.console && console.warn) {
        console.warn(
          'Select2: The `data-select2-tags` attribute has been changed to ' +
          'use the `data-data` and `data-tags="true"` attributes and will be ' +
          'removed in future versions of Select2.'
        );
      }

      $e.data('data', $e.data('select2Tags'));
      $e.data('tags', true);
    }

    if ($e.data('ajaxUrl')) {
      if (this.options.debug && window.console && console.warn) {
        console.warn(
          'Select2: The `data-ajax-url` attribute has been changed to ' +
          '`data-ajax--url` and support for the old attribute will be removed' +
          ' in future versions of Select2.'
        );
      }

      $e.attr('ajax--url', $e.data('ajaxUrl'));
      $e.data('ajax--url', $e.data('ajaxUrl'));
    }

    var dataset = {};

    // Prefer the element's `dataset` attribute if it exists
    // jQuery 1.x does not correctly handle data attributes with multiple dashes
    if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {
      dataset = $.extend(true, {}, $e[0].dataset, $e.data());
    } else {
      dataset = $e.data();
    }

    var data = $.extend(true, {}, dataset);

    data = Utils._convertData(data);

    for (var key in data) {
      if ($.inArray(key, excludedData) > -1) {
        continue;
      }

      if ($.isPlainObject(this.options[key])) {
        $.extend(this.options[key], data[key]);
      } else {
        this.options[key] = data[key];
      }
    }

    return this;
  };

  Options.prototype.get = function (key) {
    return this.options[key];
  };

  Options.prototype.set = function (key, val) {
    this.options[key] = val;
  };

  return Options;
});

S2.define('select2/core',[
  'jquery',
  './options',
  './utils',
  './keys'
], function ($, Options, Utils, KEYS) {
  var Select2 = function ($element, options) {
    if ($element.data('select2') != null) {
      $element.data('select2').destroy();
    }

    this.$element = $element;

    this.id = this._generateId($element);

    options = options || {};

    this.options = new Options(options, $element);

    Select2.__super__.constructor.call(this);

    // Set up the tabindex

    var tabindex = $element.attr('tabindex') || 0;
    $element.data('old-tabindex', tabindex);
    $element.attr('tabindex', '-1');

    // Set up containers and adapters

    var DataAdapter = this.options.get('dataAdapter');
    this.dataAdapter = new DataAdapter($element, this.options);

    var $container = this.render();

    this._placeContainer($container);

    var SelectionAdapter = this.options.get('selectionAdapter');
    this.selection = new SelectionAdapter($element, this.options);
    this.$selection = this.selection.render();

    this.selection.position(this.$selection, $container);

    var DropdownAdapter = this.options.get('dropdownAdapter');
    this.dropdown = new DropdownAdapter($element, this.options);
    this.$dropdown = this.dropdown.render();

    this.dropdown.position(this.$dropdown, $container);

    var ResultsAdapter = this.options.get('resultsAdapter');
    this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
    this.$results = this.results.render();

    this.results.position(this.$results, this.$dropdown);

    // Bind events

    var self = this;

    // Bind the container to all of the adapters
    this._bindAdapters();

    // Register any DOM event handlers
    this._registerDomEvents();

    // Register any internal event handlers
    this._registerDataEvents();
    this._registerSelectionEvents();
    this._registerDropdownEvents();
    this._registerResultsEvents();
    this._registerEvents();

    // Set the initial state
    this.dataAdapter.current(function (initialData) {
      self.trigger('selection:update', {
        data: initialData
      });
    });

    // Hide the original select
    $element.addClass('select2-hidden-accessible');
    $element.attr('aria-hidden', 'true');

    // Synchronize any monitored attributes
    this._syncAttributes();

    $element.data('select2', this);
  };

  Utils.Extend(Select2, Utils.Observable);

  Select2.prototype._generateId = function ($element) {
    var id = '';

    if ($element.attr('id') != null) {
      id = $element.attr('id');
    } else if ($element.attr('name') != null) {
      id = $element.attr('name') + '-' + Utils.generateChars(2);
    } else {
      id = Utils.generateChars(4);
    }

    id = 'select2-' + id;

    return id;
  };

  Select2.prototype._placeContainer = function ($container) {
    $container.insertAfter(this.$element);

    var width = this._resolveWidth(this.$element, this.options.get('width'));

    if (width != null) {
      $container.css('width', width);
    }
  };

  Select2.prototype._resolveWidth = function ($element, method) {
    var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;

    if (method == 'resolve') {
      var styleWidth = this._resolveWidth($element, 'style');

      if (styleWidth != null) {
        return styleWidth;
      }

      return this._resolveWidth($element, 'element');
    }

    if (method == 'element') {
      var elementWidth = $element.outerWidth(false);

      if (elementWidth <= 0) {
        return 'auto';
      }

      return elementWidth + 'px';
    }

    if (method == 'style') {
      var style = $element.attr('style');

      if (typeof(style) !== 'string') {
        return null;
      }

      var attrs = style.split(';');

      for (var i = 0, l = attrs.length; i < l; i = i + 1) {
        var attr = attrs[i].replace(/\s/g, '');
        var matches = attr.match(WIDTH);

        if (matches !== null && matches.length >= 1) {
          return matches[1];
        }
      }

      return null;
    }

    return method;
  };

  Select2.prototype._bindAdapters = function () {
    this.dataAdapter.bind(this, this.$container);
    this.selection.bind(this, this.$container);

    this.dropdown.bind(this, this.$container);
    this.results.bind(this, this.$container);
  };

  Select2.prototype._registerDomEvents = function () {
    var self = this;

    this.$element.on('change.select2', function (data) {
        // console.log("on change Select2.js");
        // console.log("data1");
        // console.log(data1);
        // if(Ext.isEmpty(data1)){
        //     console.log("on change data1 is null");
        // }
        // 
      self.dataAdapter.current(function (data) {

        self.trigger('selection:update', {
          data: data
        });

      });

    });

    this._sync = Utils.bind(this._syncAttributes, this);

    if (this.$element[0].attachEvent) {
      this.$element[0].attachEvent('onpropertychange', this._sync);
    }

    var observer = window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver
    ;

    if (observer != null) {
      this._observer = new observer(function (mutations) {
        $.each(mutations, self._sync);
      });
      this._observer.observe(this.$element[0], {
        attributes: true,
        subtree: false
      });
    } else if (this.$element[0].addEventListener) {
      this.$element[0].addEventListener('DOMAttrModified', self._sync, false);
    }
  };

  Select2.prototype._registerDataEvents = function () {
    var self = this;

    this.dataAdapter.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerSelectionEvents = function () {
    var self = this;
    var nonRelayEvents = ['toggle', 'focus'];

    this.selection.on('toggle', function () {
      self.toggleDropdown();
    });

    this.selection.on('focus', function (params) {
      self.focus(params);
    });

    this.selection.on('*', function (name, params) {
      if ($.inArray(name, nonRelayEvents) !== -1) {
        return;
      }

      self.trigger(name, params);
    });
  };

  Select2.prototype._registerDropdownEvents = function () {
    var self = this;

    this.dropdown.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerResultsEvents = function () {
    var self = this;

    this.results.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerEvents = function () {
    var self = this;

    this.on('open', function () {
      self.$container.addClass('select2-container--open');
    });

    this.on('close', function () {
      self.$container.removeClass('select2-container--open');
    });

    this.on('enable', function () {
      self.$container.removeClass('select2-container--disabled');
    });

    this.on('disable', function () {
      self.$container.addClass('select2-container--disabled');
    });

    this.on('blur', function () {
      self.$container.removeClass('select2-container--focus');
    });

    this.on('query', function (params) {
      if (!self.isOpen()) {
        self.trigger('open', {});
      }

      this.dataAdapter.query(params, function (data) {
        self.trigger('results:all', {
          data: data,
          query: params
        });
      });
    });

    this.on('query:append', function (params) {
      this.dataAdapter.query(params, function (data) {
        self.trigger('results:append', {
          data: data,
          query: params
        });
      });
    });

    this.on('keypress', function (evt) {
      var key = evt.which;

      if (self.isOpen()) {
        if (key === KEYS.ESC || key === KEYS.TAB ||
            (key === KEYS.UP && evt.altKey)) {
          self.close();

          evt.preventDefault();
        } else if (key === KEYS.ENTER) {
          self.trigger('results:select', {});

          evt.preventDefault();
        } else if ((key === KEYS.SPACE && evt.ctrlKey)) {
          self.trigger('results:toggle', {});

          evt.preventDefault();
        } else if (key === KEYS.UP) {
          self.trigger('results:previous', {});

          evt.preventDefault();
        } else if (key === KEYS.DOWN) {
          self.trigger('results:next', {});

          evt.preventDefault();
        }
      } else {
        if (key === KEYS.ENTER || key === KEYS.SPACE ||
            (key === KEYS.DOWN && evt.altKey)) {
          self.open();

          evt.preventDefault();
        }
      }
    });
  };

  Select2.prototype._syncAttributes = function () {
    this.options.set('disabled', this.$element.prop('disabled'));

    if (this.options.get('disabled')) {
      if (this.isOpen()) {
        this.close();
      }

      this.trigger('disable', {});
    } else {
      this.trigger('enable', {});
    }
  };

  /**
   * Override the trigger method to automatically trigger pre-events when
   * there are events that can be prevented.
   */
  Select2.prototype.trigger = function (name, args) {
    var actualTrigger = Select2.__super__.trigger;
    var preTriggerMap = {
      'open': 'opening',
      'close': 'closing',
      'select': 'selecting',
      'unselect': 'unselecting'
    };

    if (name in preTriggerMap) {
      var preTriggerName = preTriggerMap[name];
      var preTriggerArgs = {
        prevented: false,
        name: name,
        args: args
      };

      actualTrigger.call(this, preTriggerName, preTriggerArgs);

      if (preTriggerArgs.prevented) {
        args.prevented = true;

        return;
      }
    }

    actualTrigger.call(this, name, args);
  };

  Select2.prototype.toggleDropdown = function () {
    if (this.options.get('disabled')) {
      return;
    }

    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  };

  Select2.prototype.open = function () {
    if (this.isOpen()) {
      return;
    }

    this.trigger('query', {});
  };

  Select2.prototype.close = function () {
    if (!this.isOpen()) {
      return;
    }

    this.trigger('close', {});
  };

  Select2.prototype.isOpen = function () {
    return this.$container.hasClass('select2-container--open');
  };

  Select2.prototype.hasFocus = function () {
    return this.$container.hasClass('select2-container--focus');
  };

  Select2.prototype.focus = function (data) {
    // No need to re-trigger focus events if we are already focused
    if (this.hasFocus()) {
      return;
    }

    this.$container.addClass('select2-container--focus');
    this.trigger('focus', {});
  };

  Select2.prototype.enable = function (args) {
    if (this.options.get('debug') && window.console && console.warn) {
      console.warn(
        'Select2: The `select2("enable")` method has been deprecated and will' +
        ' be removed in later Select2 versions. Use $element.prop("disabled")' +
        ' instead.'
      );
    }

    if (args == null || args.length === 0) {
      args = [true];
    }

    var disabled = !args[0];

    this.$element.prop('disabled', disabled);
  };

  Select2.prototype.data = function () {
    console.log("cal of data");
    if (this.options.get('debug') &&
        arguments.length > 0 && window.console && console.warn) {
      console.warn(
        'Select2: Data can no longer be set using `select2("data")`. You ' +
        'should consider setting the value instead using `$element.val()`.'
      );
    }

    var data = [];
    // console.log("currentData");
    // console.log(currentData);

    this.dataAdapter.current(function (currentData) {
      data = currentData;
    });

    return data;
  };

  Select2.prototype.val = function (args) {    
    console.log(args)

    if (this.options.get('debug') && window.console && console.warn) {
      console.warn(
        'Select2: The `select2("val")` method has been deprecated and will be' +
        ' removed in later Select2 versions. Use $element.val() instead.'
      );
    }

    if (args == null || args.length === 0) {
      return this.$element.val();
    }

    var newVal = args[0];

    if ($.isArray(newVal)) {
      newVal = $.map(newVal, function (obj) {
        return obj.toString();
      });
    }
    
    this.$element.val(newVal).trigger('change');
  }; 

  Select2.prototype.extraParams = function (args) {    
    if (args == null || args.length === 0) {
         if(!Ext.isEmpty(this.extraParams)){
            return this._extraParams;
         }else{
            return {};
         }
    }else{        
        var extraParams = args[0];
        if(!Ext.isEmpty(extraParams)){
            this._extraParams = extraParams;
            console.log("set extra params");
            console.log(this.$element);
            // console.log(this);
        }     
    }
  };

  // Select2.prototype.value = function (args) {
  //   console.log("in select 2  setValue");
  //   console.log(args)

    
  //   if (args == null || args.length === 0) {
  //     return this.$element.val();
  //   }

  //   var value = args[0];
  //   var objectValue = args[1];
    
  //   console.log(this);
  //   console.log(this.dataAdapter.current);
  //   // console.log(this.$element);
  //   //var $rendered = this.$selection.find('.select2-selection__rendered');
  //   // $rendered.empty();
  //   //this.selection.display(newVal, this.$selection);
  //   // this.$selection.html("divine divine eeeeee");
  //   //this.selection.update(newVal);
  //   if(this.$element.children('option[value="'+value+'"]').length < 1){        
  //       var selection = objectValue;    
  //       var $rendered = this.$selection.find('.select2-selection__rendered');
  //       var formatted = this.selection.display(selection, $rendered);
        
  //       $rendered.empty().append(formatted);
  //       $rendered.prop('title', selection.title || selection.text);
        
  //       $('<option value="'+value+'"></option>').appendTo(this.$element);        
  //   }    
  //   this.$element.val(value);
  //   //.trigger('change');
  //   //;
  //   console.log(this);
        
  // };

  Select2.prototype.destroy = function () {
    this.$container.remove();

    if (this.$element[0].detachEvent) {
      this.$element[0].detachEvent('onpropertychange', this._sync);
    }

    if (this._observer != null) {
      this._observer.disconnect();
      this._observer = null;
    } else if (this.$element[0].removeEventListener) {
      this.$element[0]
        .removeEventListener('DOMAttrModified', this._sync, false);
    }

    this._sync = null;

    this.$element.off('.select2');
    this.$element.attr('tabindex', this.$element.data('old-tabindex'));

    this.$element.removeClass('select2-hidden-accessible');
    this.$element.attr('aria-hidden', 'false');
    this.$element.removeData('select2');

    this.dataAdapter.destroy();
    this.selection.destroy();
    this.dropdown.destroy();
    this.results.destroy();

    this.dataAdapter = null;
    this.selection = null;
    this.dropdown = null;
    this.results = null;
  };

  Select2.prototype.render = function () {
    var $container = $(
      '<span class="select2 select2-container">' +
        '<span class="selection"></span>' +
        '<span class="dropdown-wrapper" aria-hidden="true"></span>' +
      '</span>'
    );

    $container.attr('dir', this.options.get('dir'));

    this.$container = $container;

    this.$container.addClass('select2-container--' + this.options.get('theme'));

    $container.data('element', this.$element);

    return $container;
  };

  return Select2;
});

S2.define('jquery.select2',[
  'jquery',
  'require',

  './select2/core',
  './select2/defaults'
], function ($, require, Select2, Defaults) {
  // Force jQuery.mousewheel to be loaded if it hasn't already
  require('jquery.mousewheel');

  if ($.fn.select2 == null) {
    // All methods that should return the element
    var thisMethods = ['open', 'close', 'destroy'];

    $.fn.select2 = function (options) {
      options = options || {};
       // console.log("Select2.js set value");
       // console.log(options);

      if (typeof options === 'object') {
        this.each(function () {
          var instanceOptions = $.extend({}, options, true);

          var instance = new Select2($(this), instanceOptions);
        });

        return this;
      } else if (typeof options === 'string') {
        var instance = this.data('select2');

        if (instance == null && window.console && console.error) {
          console.error(
            'The select2(\'' + options + '\') method was called on an ' +
            'element that is not using Select2.'
          );
        }

        var args = Array.prototype.slice.call(arguments, 1);
        // console.log("arguments ");
        // console.log(args);

        var ret = instance[options](args);

        // Check if we should be returning `this`
        if ($.inArray(options, thisMethods) > -1) {
          return this;
        }

        return ret;
      } else {
        throw new Error('Invalid arguments for Select2: ' + options);
      }
    };
  }

  if ($.fn.select2.defaults == null) {
    $.fn.select2.defaults = Defaults;
  }

  return Select2;
});

S2.define('jquery.mousewheel',[
  'jquery'
], function ($) {
  // Used to shim jQuery.mousewheel for non-full builds.
  return $;
});

  // Return the AMD loader configuration so it can be used outside of this file
  return {
    define: S2.define,
    require: S2.require
  };
}());

  // Autoload the jQuery bindings
  // We know that all of the modules exist above this, so we're safe
  var select2 = S2.require('jquery.select2');

  // Hold the AMD module references on the jQuery function that was just loaded
  // This allows Select2 to use the internal loader outside of this file, such
  // as in the language files.
  jQuery.fn.select2.amd = S2;

  // Return the Select2 instance for anyone who is importing it.
  return select2;
}));

/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false Mustache: true*/

(function defineMustache(global, factory) {
    if (typeof exports === 'object' && exports) {
        factory(exports); // CommonJS
    } else if (typeof define === 'function' && define.amd) {
        define(['exports'], factory); // AMD
    } else {
        Mustache = {};
        factory(Mustache); // script, wsh, asp
    }
}(this, function mustacheFactory(mustache) {

    var objectToString = Object.prototype.toString;
    var isArray = Array.isArray || function isArrayPolyfill(object) {
        return objectToString.call(object) === '[object Array]';
    };

    function isFunction(object) {
        return typeof object === 'function';
    }

    function escapeRegExp(string) {
        return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
    }

    // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
    // See https://github.com/janl/mustache.js/issues/189
    var regExpTest = RegExp.prototype.test;
    function testRegExp(re, string) {
        return regExpTest.call(re, string);
    }

    var nonSpaceRe = /\S/;
    function isWhitespace(string) {
        return !testRegExp(nonSpaceRe, string);
    }

    var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;'
    };

    function escapeHtml(string) {
        return String(string).replace(/[&<>"'\/]/g, function fromEntityMap(s) {
            return entityMap[s];
        });
    }

    var whiteRe = /\s*/;
    var spaceRe = /\s+/;
    var equalsRe = /\s*=/;
    var curlyRe = /\s*\}/;
    var tagRe = /#|\^|\/|>|\{|&|=|!/;

    /**
     * Breaks up the given `template` string into a tree of tokens. If the `tags`
     * argument is given here it must be an array with two string values: the
     * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
     * course, the default is to use mustaches (i.e. mustache.tags).
     *
     * A token is an array with at least 4 elements. The first element is the
     * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
     * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
     * all text that appears outside a symbol this element is "text".
     *
     * The second element of a token is its "value". For mustache tags this is
     * whatever else was inside the tag besides the opening symbol. For text tokens
     * this is the text itself.
     *
     * The third and fourth elements of the token are the start and end indices,
     * respectively, of the token in the original template.
     *
     * Tokens that are the root node of a subtree contain two more elements: 1) an
     * array of tokens in the subtree and 2) the index in the original template at
     * which the closing tag for that section begins.
     */
    function parseTemplate(template, tags) {
        if (!template)
            return [];

        var sections = [];     // Stack to hold section tokens
        var tokens = [];       // Buffer to hold the tokens
        var spaces = [];       // Indices of whitespace tokens on the current line
        var hasTag = false;    // Is there a {{tag}} on the current line?
        var nonSpace = false;  // Is there a non-space char on the current line?

        // Strips all whitespace tokens array for the current line
        // if there was a {{#tag}} on it and otherwise only space.
        function stripSpace() {
            if (hasTag && !nonSpace) {
                while (spaces.length)
                    delete tokens[spaces.pop()];
            } else {
                spaces = [];
            }

            hasTag = false;
            nonSpace = false;
        }

        var openingTagRe, closingTagRe, closingCurlyRe;
        function compileTags(tagsToCompile) {
            if (typeof tagsToCompile === 'string')
                tagsToCompile = tagsToCompile.split(spaceRe, 2);

            if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
                throw new Error('Invalid tags: ' + tagsToCompile);

            openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
            closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
            closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
        }

        compileTags(tags || mustache.tags);

        var scanner = new Scanner(template);

        var start, type, value, chr, token, openSection;
        while (!scanner.eos()) {
            start = scanner.pos;

            // Match any text between tags.
            value = scanner.scanUntil(openingTagRe);

            if (value) {
                for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
                    chr = value.charAt(i);

                    if (isWhitespace(chr)) {
                        spaces.push(tokens.length);
                    } else {
                        nonSpace = true;
                    }

                    tokens.push(['text', chr, start, start + 1]);
                    start += 1;

                    // Check for whitespace on the current line.
                    if (chr === '\n')
                        stripSpace();
                }
            }

            // Match the opening tag.
            if (!scanner.scan(openingTagRe))
                break;

            hasTag = true;

            // Get the tag type.
            type = scanner.scan(tagRe) || 'name';
            scanner.scan(whiteRe);

            // Get the tag value.
            if (type === '=') {
                value = scanner.scanUntil(equalsRe);
                scanner.scan(equalsRe);
                scanner.scanUntil(closingTagRe);
            } else if (type === '{') {
                value = scanner.scanUntil(closingCurlyRe);
                scanner.scan(curlyRe);
                scanner.scanUntil(closingTagRe);
                type = '&';
            } else {
                value = scanner.scanUntil(closingTagRe);
            }

            // Match the closing tag.
            if (!scanner.scan(closingTagRe))
                throw new Error('Unclosed tag at ' + scanner.pos);

            token = [type, value, start, scanner.pos];
            tokens.push(token);

            if (type === '#' || type === '^') {
                sections.push(token);
            } else if (type === '/') {
                // Check section nesting.
                openSection = sections.pop();

                if (!openSection)
                    throw new Error('Unopened section "' + value + '" at ' + start);

                if (openSection[1] !== value)
                    throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
            } else if (type === 'name' || type === '{' || type === '&') {
                nonSpace = true;
            } else if (type === '=') {
                // Set the tags for the next time around.
                compileTags(value);
            }
        }

        // Make sure there are no open sections when we're done.
        openSection = sections.pop();

        if (openSection)
            throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

        return nestTokens(squashTokens(tokens));
    }

    /**
     * Combines the values of consecutive text tokens in the given `tokens` array
     * to a single token.
     */
    function squashTokens(tokens) {
        var squashedTokens = [];

        var token, lastToken;
        for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
            token = tokens[i];

            if (token) {
                if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
                    lastToken[1] += token[1];
                    lastToken[3] = token[3];
                } else {
                    squashedTokens.push(token);
                    lastToken = token;
                }
            }
        }

        return squashedTokens;
    }

    /**
     * Forms the given array of `tokens` into a nested tree structure where
     * tokens that represent a section have two additional items: 1) an array of
     * all tokens that appear in that section and 2) the index in the original
     * template that represents the end of that section.
     */
    function nestTokens(tokens) {
        var nestedTokens = [];
        var collector = nestedTokens;
        var sections = [];

        var token, section;
        for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
            token = tokens[i];

            switch (token[0]) {
                case '#':
                case '^':
                    collector.push(token);
                    sections.push(token);
                    collector = token[4] = [];
                    break;
                case '/':
                    section = sections.pop();
                    section[5] = token[2];
                    collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
                    break;
                default:
                    collector.push(token);
            }
        }

        return nestedTokens;
    }

    /**
     * A simple string scanner that is used by the template parser to find
     * tokens in template strings.
     */
    function Scanner(string) {
        this.string = string;
        this.tail = string;
        this.pos = 0;
    }

    /**
     * Returns `true` if the tail is empty (end of string).
     */
    Scanner.prototype.eos = function eos() {
        return this.tail === '';
    };

    /**
     * Tries to match the given regular expression at the current position.
     * Returns the matched text if it can match, the empty string otherwise.
     */
    Scanner.prototype.scan = function scan(re) {
        var match = this.tail.match(re);

        if (!match || match.index !== 0)
            return '';

        var string = match[0];

        this.tail = this.tail.substring(string.length);
        this.pos += string.length;

        return string;
    };

    /**
     * Skips all text until the given regular expression can be matched. Returns
     * the skipped string, which is the entire tail if no match can be made.
     */
    Scanner.prototype.scanUntil = function scanUntil(re) {
        var index = this.tail.search(re), match;

        switch (index) {
            case -1:
                match = this.tail;
                this.tail = '';
                break;
            case 0:
                match = '';
                break;
            default:
                match = this.tail.substring(0, index);
                this.tail = this.tail.substring(index);
        }

        this.pos += match.length;

        return match;
    };

    /**
     * Represents a rendering context by wrapping a view object and
     * maintaining a reference to the parent context.
     */
    function Context(view, parentContext) {
        this.view = view;
        this.cache = {'.': this.view};
        this.parent = parentContext;
    }

    /**
     * Creates a new context using the given view with this context
     * as the parent.
     */
    Context.prototype.push = function push(view) {
        return new Context(view, this);
    };

    /**
     * Returns the value of the given name in this context, traversing
     * up the context hierarchy if the value is absent in this context's view.
     */
    Context.prototype.lookup = function lookup(name) {
        var cache = this.cache;

        var value;
        if (name in cache) {
            value = cache[name];
        } else {
            var context = this, names, index, lookupHit = false;

            while (context) {
                if (name.indexOf('.') > 0) {
                    value = context.view;
                    names = name.split('.');
                    index = 0;

                    /**
                     * Using the dot notion path in `name`, we descend through the
                     * nested objects.
                     *
                     * To be certain that the lookup has been successful, we have to
                     * check if the last object in the path actually has the property
                     * we are looking for. We store the result in `lookupHit`.
                     *
                     * This is specially necessary for when the value has been set to
                     * `undefined` and we want to avoid looking up parent contexts.
                     **/
                    while (value != null && index < names.length) {
                        if (index === names.length - 1 && value != null)
                            lookupHit = (typeof value === 'object') &&
                                    value.hasOwnProperty(names[index]);
                        value = value[names[index++]];
                    }
                } else if (context.view != null && typeof context.view === 'object') {
                    value = context.view[name];
                    lookupHit = context.view.hasOwnProperty(name);
                }

                if (lookupHit)
                    break;

                context = context.parent;
            }

            cache[name] = value;
        }

        if (isFunction(value))
            value = value.call(this.view);

        return value;
    };

    /**
     * A Writer knows how to take a stream of tokens and render them to a
     * string, given a context. It also maintains a cache of templates to
     * avoid the need to parse the same template twice.
     */
    function Writer() {
        this.cache = {};
    }

    /**
     * Clears all cached templates in this writer.
     */
    Writer.prototype.clearCache = function clearCache() {
        this.cache = {};
    };

    /**
     * ------------------------------------------------------------------extended by divinemercy
     * Parses and caches the given `template` and returns the array of tokens
     * that is generated from the parse.
     * ---extension decription : add the enableCache attribute and logic
     */
    Writer.prototype.parse = function parse(template, tags, enableCache) {
        var tokens = null;
        if (enableCache !== undefined && enableCache === false) {
//            console.log("Mustache--enableCache = false");
            tokens = parseTemplate(template, tags);
        } else {
//            console.log("Mustache--enableCache = true");
            var cache = this.cache;
            tokens = cache[template];
            if (tokens == null)
                tokens = cache[template] = parseTemplate(template, tags);
        }
        return tokens;
    };


    /**
     * High-level method that is used to render the given `template` with
     * the given `view`.
     *
     * The optional `partials` argument may be an object that contains the
     * names and templates of partials that are used in the template. It may
     * also be a function that is used to load partial templates on the fly
     * that takes a single argument: the name of the partial.
     */
    Writer.prototype.render = function render(template, view, partials) {
        var tokens = this.parse(template);
        var context = (view instanceof Context) ? view : new Context(view);
        return this.renderTokens(tokens, context, partials, template);
    };


    /**
     * Low-level method that renders the given array of `tokens` using
     * the given `context` and `partials`.
     *
     * Note: The `originalTemplate` is only ever used to extract the portion
     * of the original template that was contained in a higher-order section.
     * If the template doesn't use higher-order sections, this argument may
     * be omitted.
     */
    Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate) {
        var buffer = '';

        var token, symbol, value;
        for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
            value = undefined;
            token = tokens[i];
            symbol = token[0];

            if (symbol === '#')
                value = this.renderSection(token, context, partials, originalTemplate);
            else if (symbol === '^')
                value = this.renderInverted(token, context, partials, originalTemplate);
            else if (symbol === '>')
                value = this.renderPartial(token, context, partials, originalTemplate);
            else if (symbol === '&')
                value = this.unescapedValue(token, context);
            else if (symbol === 'name')
                value = this.escapedValue(token, context);
            else if (symbol === 'text')
                value = this.rawValue(token);

            if (value !== undefined)
                buffer += value;
        }

        return buffer;
    };

    Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate) {
        var self = this;
        var buffer = '';
        var value = context.lookup(token[1]);

        // This function is used to render an arbitrary template
        // in the current context by higher-order sections.
        function subRender(template) {
            return self.render(template, context, partials);
        }

        if (!value)
            return;

        if (isArray(value)) {
            for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
                buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
            }
        } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
            buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
        } else if (isFunction(value)) {
            if (typeof originalTemplate !== 'string')
                throw new Error('Cannot use higher-order sections without the original template');

            // Extract the portion of the original template that the section contains.
            value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

            if (value != null)
                buffer += value;
        } else {
            buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }
        return buffer;
    };

    Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate) {
        var value = context.lookup(token[1]);

        // Use JavaScript's definition of falsy. Include empty arrays.
        // See https://github.com/janl/mustache.js/issues/186
        if (!value || (isArray(value) && value.length === 0))
            return this.renderTokens(token[4], context, partials, originalTemplate);
    };

    Writer.prototype.renderPartial = function renderPartial(token, context, partials) {
        if (!partials)
            return;

        var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
        if (value != null)
            return this.renderTokens(this.parse(value), context, partials, value);
    };

    Writer.prototype.unescapedValue = function unescapedValue(token, context) {
        var value = context.lookup(token[1]);
        if (value != null)
            return value;
    };

    Writer.prototype.escapedValue = function escapedValue(token, context) {
        var value = context.lookup(token[1]);
        if (value != null)
            return mustache.escape(value);
    };

    Writer.prototype.rawValue = function rawValue(token) {
        return token[1];
    };

    mustache.name = 'mustache.js';
    mustache.version = '2.0.0';
    mustache.tags = ['{{', '}}'];

    // All high-level mustache.* functions use this writer.
    var defaultWriter = new Writer();

    /**
     * Clears all cached templates in the default writer.
     */
    mustache.clearCache = function clearCache() {
        return defaultWriter.clearCache();
    };

    /**
     * -----------------------------------------------------------------extended by divinemercy
     * Parses and caches the given template in the default writer and returns the
     * array of tokens it contains. Doing this ahead of time avoids the need to
     * parse templates on the fly as they are rendered.
     * ---extension description : add enableCache attribute and logic
     */
    mustache.parse = function parse(template, tags, enableCache) {
        return defaultWriter.parse(template, tags, enableCache);
    };

    /**
     * Renders the `template` with the given `view` and `partials` using the
     * default writer.
     */
    mustache.render = function render(template, view, partials) {
        return defaultWriter.render(template, view, partials);
    };

    /**     
     *-------------------------------------------- extension--------------------------------
     * render a template with initialise tokens
     *  added by divinemercy
     */
    mustache.renderTokens = function renderTokens(tokens, view, partials, originalTemplate) {
        var context = (view instanceof Context) ? view : new Context(view);
        return defaultWriter.renderTokens(tokens, context, partials, originalTemplate);
    };

    // This is here for backwards compatibility with 0.4.x.,
    /*eslint-disable */ // eslint wants camel cased function name
    mustache.to_html = function to_html(template, view, partials, send) {
        /*eslint-enable*/

        var result = mustache.render(template, view, partials);

        if (isFunction(send)) {
            send(result);
        } else {
            return result;
        }
    };

    // Export the escaping function so that the user may override it.
    // See https://github.com/janl/mustache.js/issues/244
    mustache.escape = escapeHtml;

    // Export these mainly for testing, but also for advanced usage.
    mustache.Scanner = Scanner;
    mustache.Context = Context;
    mustache.Writer = Writer;

}));



Ext.define("Xfr.Mustache",{
    
});
/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.6
 *
 */
(function(e){e.fn.extend({slimScroll:function(g){var a=e.extend({width:"auto",height:"250px",size:"7px",color:"#000",position:"right",distance:"1px",start:"top",opacity:.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:.2,railDraggable:!0,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,wheelStep:20,touchScrollStep:200,borderRadius:"7px",railBorderRadius:"7px"},g);this.each(function(){function v(d){if(r){d=d||window.event;
var c=0;d.wheelDelta&&(c=-d.wheelDelta/120);d.detail&&(c=d.detail/3);e(d.target||d.srcTarget||d.srcElement).closest("."+a.wrapperClass).is(b.parent())&&m(c,!0);d.preventDefault&&!k&&d.preventDefault();k||(d.returnValue=!1)}}function m(d,e,g){k=!1;var f=d,h=b.outerHeight()-c.outerHeight();e&&(f=parseInt(c.css("top"))+d*parseInt(a.wheelStep)/100*c.outerHeight(),f=Math.min(Math.max(f,0),h),f=0<d?Math.ceil(f):Math.floor(f),c.css({top:f+"px"}));l=parseInt(c.css("top"))/(b.outerHeight()-c.outerHeight());
f=l*(b[0].scrollHeight-b.outerHeight());g&&(f=d,d=f/b[0].scrollHeight*b.outerHeight(),d=Math.min(Math.max(d,0),h),c.css({top:d+"px"}));b.scrollTop(f);b.trigger("slimscrolling",~~f);w();p()}function x(){u=Math.max(b.outerHeight()/b[0].scrollHeight*b.outerHeight(),30);c.css({height:u+"px"});var a=u==b.outerHeight()?"none":"block";c.css({display:a})}function w(){x();clearTimeout(B);l==~~l?(k=a.allowPageScroll,C!=l&&b.trigger("slimscroll",0==~~l?"top":"bottom")):k=!1;C=l;u>=b.outerHeight()?k=!0:(c.stop(!0,
!0).fadeIn("fast"),a.railVisible&&h.stop(!0,!0).fadeIn("fast"))}function p(){a.alwaysVisible||(B=setTimeout(function(){a.disableFadeOut&&r||y||z||(c.fadeOut("slow"),h.fadeOut("slow"))},1E3))}var r,y,z,B,A,u,l,C,k=!1,b=e(this);if(b.parent().hasClass(a.wrapperClass)){var n=b.scrollTop(),c=b.closest("."+a.barClass),h=b.closest("."+a.railClass);x();if(e.isPlainObject(g)){if("height"in g&&"auto"==g.height){b.parent().css("height","auto");b.css("height","auto");var q=b.parent().parent().height();b.parent().css("height",
q);b.css("height",q)}if("scrollTo"in g)n=parseInt(a.scrollTo);else if("scrollBy"in g)n+=parseInt(a.scrollBy);else if("destroy"in g){c.remove();h.remove();b.unwrap();return}m(n,!1,!0)}}else if(!(e.isPlainObject(g)&&"destroy"in g)){a.height="auto"==a.height?b.parent().height():a.height;n=e("<div></div>").addClass(a.wrapperClass).css({position:"relative",overflow:"hidden",width:a.width,height:a.height});b.css({overflow:"hidden",width:a.width,height:a.height});var h=e("<div></div>").addClass(a.railClass).css({width:a.size,
height:"100%",position:"absolute",top:0,display:a.alwaysVisible&&a.railVisible?"block":"none","border-radius":a.railBorderRadius,background:a.railColor,opacity:a.railOpacity,zIndex:90}),c=e("<div></div>").addClass(a.barClass).css({background:a.color,width:a.size,position:"absolute",top:0,opacity:a.opacity,display:a.alwaysVisible?"block":"none","border-radius":a.borderRadius,BorderRadius:a.borderRadius,MozBorderRadius:a.borderRadius,WebkitBorderRadius:a.borderRadius,zIndex:99}),q="right"==a.position?
{right:a.distance}:{left:a.distance};h.css(q);c.css(q);b.wrap(n);b.parent().append(c);b.parent().append(h);a.railDraggable&&c.bind("mousedown",function(a){var b=e(document);z=!0;t=parseFloat(c.css("top"));pageY=a.pageY;b.bind("mousemove.slimscroll",function(a){currTop=t+a.pageY-pageY;c.css("top",currTop);m(0,c.position().top,!1)});b.bind("mouseup.slimscroll",function(a){z=!1;p();b.unbind(".slimscroll")});return!1}).bind("selectstart.slimscroll",function(a){a.stopPropagation();a.preventDefault();return!1});
h.hover(function(){w()},function(){p()});c.hover(function(){y=!0},function(){y=!1});b.hover(function(){r=!0;w();p()},function(){r=!1;p()});b.bind("touchstart",function(a,b){a.originalEvent.touches.length&&(A=a.originalEvent.touches[0].pageY)});b.bind("touchmove",function(b){k||b.originalEvent.preventDefault();b.originalEvent.touches.length&&(m((A-b.originalEvent.touches[0].pageY)/a.touchScrollStep,!0),A=b.originalEvent.touches[0].pageY)});x();"bottom"===a.start?(c.css({top:b.outerHeight()-c.outerHeight()}),
m(0,!0)):"top"!==a.start&&(m(e(a.start).position().top,null,!0),a.alwaysVisible||c.hide());window.addEventListener?(this.addEventListener("DOMMouseScroll",v,!1),this.addEventListener("mousewheel",v,!1)):document.attachEvent("onmousewheel",v)}});return this}});e.fn.extend({slimscroll:e.fn.slimScroll})})(jQuery);
/**
 * Copyright (c) 2009 Sergiy Kovalchuk (serg472@gmail.com)
 * 
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *  
 * Following code is based on Element.mask() implementation from ExtJS framework (http://extjs.com/)
 *
 */
;
(function($) {

    /**
     * Displays loading mask over selected element(s). Accepts both single and multiple selectors.
     *
     * @param label Text message that will be displayed on top of the mask besides a spinner (optional). 
     * 				If not provided only mask will be displayed without a label or a spinner.  	
     * @param delay Delay in milliseconds before element is masked (optional). If unmask() is called 
     *              before the delay times out, no mask is displayed. This can be used to prevent unnecessary 
     *              mask display for quick processes.   	
     */
    $.fn.mask = function(label, opt) {
        $(this).each(function() {

            if (!Ext.isEmpty(opt) && !Ext.isEmpty(opt.delay) && opt.delay > 0) {
                var element = $(this);
                element.data("_mask_timeout", setTimeout(function() {
                    $.maskElement(element, label, opt);
                }, opt.delay));
            } else {
                $.maskElement($(this), label, opt);
            }
        });
    };

    /**
     * Removes mask from the element(s). Accepts both single and multiple selectors.
     */
    $.fn.unmask = function() {
        $(this).each(function() {
            $.unmaskElement($(this));
        });
    };

    /**
     * Checks if a single element is masked. Returns false if mask is delayed or not displayed. 
     */
    $.fn.isMasked = function() {
        return this.hasClass("masked");
    };

    $.maskElement = function(element, label, opt) {
        if (Ext.isEmpty(opt)) {
            opt = {};
        }
        if (Ext.isEmpty(opt.size)) {
            opt.size = 32;
        }
        if (Ext.isEmpty(opt.icon)) {
            opt.icon = "alternative";
        }
        if (Ext.isEmpty(opt.backgroundColor)) {
            opt.backgroundColor = "#CCC";
        }

        //if this element has delayed mask scheduled then remove it and display the new one
        if (element.data("_mask_timeout") !== undefined) {
            clearTimeout(element.data("_mask_timeout"));
            element.removeData("_mask_timeout");
        }

        if (element.isMasked()) {
            $.unmaskElement(element);
        }

        if (element.css("position") == "static") {
            element.addClass("masked-relative");
        }

        element.addClass("masked");

        var maskDiv = $('<div class="loadmask" style="background-color:' + opt.backgroundColor + '" ></div>');

        //auto height fix for IE
        if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
            maskDiv.height(element.height() + parseInt(element.css("padding-top")) + parseInt(element.css("padding-bottom")));
            maskDiv.width(element.width() + parseInt(element.css("padding-left")) + parseInt(element.css("padding-right")));
        }

        //fix for z-index bug with selects in IE6
        if (navigator.userAgent.toLowerCase().indexOf("msie 6") > -1) {
            element.find("select").addClass("masked-hidden");
        }

        element.append(maskDiv);

        if (label !== undefined) {

            var maskMsgDiv = $('<div class="loadmask-msg  size-' + opt.size + ' " style="display:none;"></div>');
            maskMsgDiv.append('<div class="loadmask-label ">' + label + '</div>');
            maskMsgDiv.append('<div class="loadmask-loading loading-icon-' + opt.icon + '"></div>');
            element.append(maskMsgDiv);

            //calculate center position
            maskMsgDiv.css("top", Math.round(element.height() / 2 - (maskMsgDiv.height() - parseInt(maskMsgDiv.css("padding-top")) - parseInt(maskMsgDiv.css("padding-bottom"))) / 2) + "px");
            maskMsgDiv.css("left", Math.round(element.width() / 2 - (maskMsgDiv.width() - parseInt(maskMsgDiv.css("padding-left")) - parseInt(maskMsgDiv.css("padding-right"))) / 2) + "px");

            maskMsgDiv.show();
        }

    };

    $.unmaskElement = function(element) {
        //if this element has delayed mask scheduled then remove it
        if (element.data("_mask_timeout") !== undefined) {
            clearTimeout(element.data("_mask_timeout"));
            element.removeData("_mask_timeout");
        }

        element.find(".loadmask-msg,.loadmask").remove();
        element.removeClass("masked");
        element.removeClass("masked-relative");
        element.find("select").removeClass("masked-hidden");
    };

})(jQuery);

/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 1.0.2
 *
 * Copyright 2015 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */
(function(){"use strict";var t=this,i=t.Chart,e=function(t){this.canvas=t.canvas,this.ctx=t;var i=function(t,i){return t["offset"+i]?t["offset"+i]:document.defaultView.getComputedStyle(t).getPropertyValue(i)},e=this.width=i(t.canvas,"Width")||t.canvas.width,n=this.height=i(t.canvas,"Height")||t.canvas.height;return e=this.width=t.canvas.width,n=this.height=t.canvas.height,this.aspectRatio=this.width/this.height,s.retinaScale(this),this};e.defaults={global:{animation:!0,animationSteps:60,animationEasing:"easeOutQuart",showScale:!0,scaleOverride:!1,scaleSteps:null,scaleStepWidth:null,scaleStartValue:null,scaleLineColor:"rgba(0,0,0,.1)",scaleLineWidth:1,scaleShowLabels:!0,scaleLabel:"<%=value%>",scaleIntegersOnly:!0,scaleBeginAtZero:!1,scaleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",scaleFontSize:12,scaleFontStyle:"normal",scaleFontColor:"#666",responsive:!1,maintainAspectRatio:!0,showTooltips:!0,customTooltips:!1,tooltipEvents:["mousemove","touchstart","touchmove","mouseout"],tooltipFillColor:"rgba(0,0,0,0.8)",tooltipFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipFontSize:14,tooltipFontStyle:"normal",tooltipFontColor:"#fff",tooltipTitleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipTitleFontSize:14,tooltipTitleFontStyle:"bold",tooltipTitleFontColor:"#fff",tooltipTitleTemplate:"<%= label%>",tooltipYPadding:6,tooltipXPadding:6,tooltipCaretSize:8,tooltipCornerRadius:6,tooltipXOffset:10,tooltipTemplate:"<%if (label){%><%=label%>: <%}%><%= value %>",multiTooltipTemplate:"<%= value %>",multiTooltipKeyBackground:"#fff",segmentColorDefault:["#A6CEE3","#1F78B4","#B2DF8A","#33A02C","#FB9A99","#E31A1C","#FDBF6F","#FF7F00","#CAB2D6","#6A3D9A","#B4B482","#B15928"],segmentHighlightColorDefaults:["#CEF6FF","#47A0DC","#DAFFB2","#5BC854","#FFC2C1","#FF4244","#FFE797","#FFA728","#F2DAFE","#9265C2","#DCDCAA","#D98150"],onAnimationProgress:function(){},onAnimationComplete:function(){}}},e.types={};var s=e.helpers={},n=s.each=function(t,i,e){var s=Array.prototype.slice.call(arguments,3);if(t)if(t.length===+t.length){var n;for(n=0;n<t.length;n++)i.apply(e,[t[n],n].concat(s))}else for(var o in t)i.apply(e,[t[o],o].concat(s))},o=s.clone=function(t){var i={};return n(t,function(e,s){t.hasOwnProperty(s)&&(i[s]=e)}),i},a=s.extend=function(t){return n(Array.prototype.slice.call(arguments,1),function(i){n(i,function(e,s){i.hasOwnProperty(s)&&(t[s]=e)})}),t},h=s.merge=function(t,i){var e=Array.prototype.slice.call(arguments,0);return e.unshift({}),a.apply(null,e)},l=s.indexOf=function(t,i){if(Array.prototype.indexOf)return t.indexOf(i);for(var e=0;e<t.length;e++)if(t[e]===i)return e;return-1},r=(s.where=function(t,i){var e=[];return s.each(t,function(t){i(t)&&e.push(t)}),e},s.findNextWhere=function(t,i,e){e||(e=-1);for(var s=e+1;s<t.length;s++){var n=t[s];if(i(n))return n}},s.findPreviousWhere=function(t,i,e){e||(e=t.length);for(var s=e-1;s>=0;s--){var n=t[s];if(i(n))return n}},s.inherits=function(t){var i=this,e=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return i.apply(this,arguments)},s=function(){this.constructor=e};return s.prototype=i.prototype,e.prototype=new s,e.extend=r,t&&a(e.prototype,t),e.__super__=i.prototype,e}),c=s.noop=function(){},u=s.uid=function(){var t=0;return function(){return"chart-"+t++}}(),d=s.warn=function(t){window.console&&"function"==typeof window.console.warn&&console.warn(t)},p=s.amd="function"==typeof define&&define.amd,f=s.isNumber=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},g=s.max=function(t){return Math.max.apply(Math,t)},m=s.min=function(t){return Math.min.apply(Math,t)},v=(s.cap=function(t,i,e){if(f(i)){if(t>i)return i}else if(f(e)&&e>t)return e;return t},s.getDecimalPlaces=function(t){if(t%1!==0&&f(t)){var i=t.toString();if(i.indexOf("e-")<0)return i.split(".")[1].length;if(i.indexOf(".")<0)return parseInt(i.split("e-")[1]);var e=i.split(".")[1].split("e-");return e[0].length+parseInt(e[1])}return 0}),S=s.radians=function(t){return t*(Math.PI/180)},x=(s.getAngleFromPoint=function(t,i){var e=i.x-t.x,s=i.y-t.y,n=Math.sqrt(e*e+s*s),o=2*Math.PI+Math.atan2(s,e);return 0>e&&0>s&&(o+=2*Math.PI),{angle:o,distance:n}},s.aliasPixel=function(t){return t%2===0?0:.5}),y=(s.splineCurve=function(t,i,e,s){var n=Math.sqrt(Math.pow(i.x-t.x,2)+Math.pow(i.y-t.y,2)),o=Math.sqrt(Math.pow(e.x-i.x,2)+Math.pow(e.y-i.y,2)),a=s*n/(n+o),h=s*o/(n+o);return{inner:{x:i.x-a*(e.x-t.x),y:i.y-a*(e.y-t.y)},outer:{x:i.x+h*(e.x-t.x),y:i.y+h*(e.y-t.y)}}},s.calculateOrderOfMagnitude=function(t){return Math.floor(Math.log(t)/Math.LN10)}),C=(s.calculateScaleRange=function(t,i,e,s,o){var a=2,h=Math.floor(i/(1.5*e)),l=a>=h,r=[];n(t,function(t){null==t||r.push(t)});var c=m(r),u=g(r);u===c&&(u+=.5,c>=.5&&!s?c-=.5:u+=.5);for(var d=Math.abs(u-c),p=y(d),f=Math.ceil(u/(1*Math.pow(10,p)))*Math.pow(10,p),v=s?0:Math.floor(c/(1*Math.pow(10,p)))*Math.pow(10,p),S=f-v,x=Math.pow(10,p),C=Math.round(S/x);(C>h||h>2*C)&&!l;)if(C>h)x*=2,C=Math.round(S/x),C%1!==0&&(l=!0);else if(o&&p>=0){if(x/2%1!==0)break;x/=2,C=Math.round(S/x)}else x/=2,C=Math.round(S/x);return l&&(C=a,x=S/C),{steps:C,stepValue:x,min:v,max:v+C*x}},s.template=function(t,i){function e(t,i){var e=/\W/.test(t)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+t.replace(/[\r\t\n]/g," ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):s[t]=s[t];return i?e(i):e}if(t instanceof Function)return t(i);var s={};return e(t,i)}),b=(s.generateLabels=function(t,i,e,s){var o=new Array(i);return t&&n(o,function(i,n){o[n]=C(t,{value:e+s*(n+1)})}),o},s.easingEffects={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return-1*t*(t-2)},easeInOutQuad:function(t){return(t/=.5)<1?.5*t*t:-0.5*(--t*(t-2)-1)},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return 1*((t=t/1-1)*t*t+1)},easeInOutCubic:function(t){return(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return-1*((t=t/1-1)*t*t*t-1)},easeInOutQuart:function(t){return(t/=.5)<1?.5*t*t*t*t:-0.5*((t-=2)*t*t*t-2)},easeInQuint:function(t){return 1*(t/=1)*t*t*t*t},easeOutQuint:function(t){return 1*((t=t/1-1)*t*t*t*t+1)},easeInOutQuint:function(t){return(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},easeInSine:function(t){return-1*Math.cos(t/1*(Math.PI/2))+1},easeOutSine:function(t){return 1*Math.sin(t/1*(Math.PI/2))},easeInOutSine:function(t){return-0.5*(Math.cos(Math.PI*t/1)-1)},easeInExpo:function(t){return 0===t?1:1*Math.pow(2,10*(t/1-1))},easeOutExpo:function(t){return 1===t?1:1*(-Math.pow(2,-10*t/1)+1)},easeInOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},easeInCirc:function(t){return t>=1?t:-1*(Math.sqrt(1-(t/=1)*t)-1)},easeOutCirc:function(t){return 1*Math.sqrt(1-(t=t/1-1)*t)},easeInOutCirc:function(t){return(t/=.5)<1?-0.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeInElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:1==(t/=1)?1:(e||(e=.3),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),-(s*Math.pow(2,10*(t-=1))*Math.sin((1*t-i)*(2*Math.PI)/e)))},easeOutElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:1==(t/=1)?1:(e||(e=.3),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),s*Math.pow(2,-10*t)*Math.sin((1*t-i)*(2*Math.PI)/e)+1)},easeInOutElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:2==(t/=.5)?1:(e||(e=1*(.3*1.5)),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),1>t?-.5*(s*Math.pow(2,10*(t-=1))*Math.sin((1*t-i)*(2*Math.PI)/e)):s*Math.pow(2,-10*(t-=1))*Math.sin((1*t-i)*(2*Math.PI)/e)*.5+1)},easeInBack:function(t){var i=1.70158;return 1*(t/=1)*t*((i+1)*t-i)},easeOutBack:function(t){var i=1.70158;return 1*((t=t/1-1)*t*((i+1)*t+i)+1)},easeInOutBack:function(t){var i=1.70158;return(t/=.5)<1?.5*(t*t*(((i*=1.525)+1)*t-i)):.5*((t-=2)*t*(((i*=1.525)+1)*t+i)+2)},easeInBounce:function(t){return 1-b.easeOutBounce(1-t)},easeOutBounce:function(t){return(t/=1)<1/2.75?1*(7.5625*t*t):2/2.75>t?1*(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1*(7.5625*(t-=2.25/2.75)*t+.9375):1*(7.5625*(t-=2.625/2.75)*t+.984375)},easeInOutBounce:function(t){return.5>t?.5*b.easeInBounce(2*t):.5*b.easeOutBounce(2*t-1)+.5}}),w=s.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}(),P=(s.cancelAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return window.clearTimeout(t,1e3/60)}}(),s.animationLoop=function(t,i,e,s,n,o){var a=0,h=b[e]||b.linear,l=function(){a++;var e=a/i,r=h(e);t.call(o,r,e,a),s.call(o,r,e),i>a?o.animationFrame=w(l):n.apply(o)};w(l)},s.getRelativePosition=function(t){var i,e,s=t.originalEvent||t,n=t.currentTarget||t.srcElement,o=n.getBoundingClientRect();return s.touches?(i=s.touches[0].clientX-o.left,e=s.touches[0].clientY-o.top):(i=s.clientX-o.left,e=s.clientY-o.top),{x:i,y:e}},s.addEvent=function(t,i,e){t.addEventListener?t.addEventListener(i,e):t.attachEvent?t.attachEvent("on"+i,e):t["on"+i]=e}),L=s.removeEvent=function(t,i,e){t.removeEventListener?t.removeEventListener(i,e,!1):t.detachEvent?t.detachEvent("on"+i,e):t["on"+i]=c},k=(s.bindEvents=function(t,i,e){t.events||(t.events={}),n(i,function(i){t.events[i]=function(){e.apply(t,arguments)},P(t.chart.canvas,i,t.events[i])})},s.unbindEvents=function(t,i){n(i,function(i,e){L(t.chart.canvas,e,i)})}),F=s.getMaximumWidth=function(t){var i=t.parentNode,e=parseInt(R(i,"padding-left"))+parseInt(R(i,"padding-right"));return i.clientWidth-e},A=s.getMaximumHeight=function(t){var i=t.parentNode,e=parseInt(R(i,"padding-bottom"))+parseInt(R(i,"padding-top"));return i.clientHeight-e},R=s.getStyle=function(t,i){return t.currentStyle?t.currentStyle[i]:document.defaultView.getComputedStyle(t,null).getPropertyValue(i)},T=(s.getMaximumSize=s.getMaximumWidth,s.retinaScale=function(t){var i=t.ctx,e=t.canvas.width,s=t.canvas.height;window.devicePixelRatio&&(i.canvas.style.width=e+"px",i.canvas.style.height=s+"px",i.canvas.height=s*window.devicePixelRatio,i.canvas.width=e*window.devicePixelRatio,i.scale(window.devicePixelRatio,window.devicePixelRatio))}),M=s.clear=function(t){t.ctx.clearRect(0,0,t.width,t.height)},W=s.fontString=function(t,i,e){return i+" "+t+"px "+e},z=s.longestText=function(t,i,e){t.font=i;var s=0;return n(e,function(i){var e=t.measureText(i).width;s=e>s?e:s}),s},B=s.drawRoundedRectangle=function(t,i,e,s,n,o){t.beginPath(),t.moveTo(i+o,e),t.lineTo(i+s-o,e),t.quadraticCurveTo(i+s,e,i+s,e+o),t.lineTo(i+s,e+n-o),t.quadraticCurveTo(i+s,e+n,i+s-o,e+n),t.lineTo(i+o,e+n),t.quadraticCurveTo(i,e+n,i,e+n-o),t.lineTo(i,e+o),t.quadraticCurveTo(i,e,i+o,e),t.closePath()};e.instances={},e.Type=function(t,i,s){this.options=i,this.chart=s,this.id=u(),e.instances[this.id]=this,i.responsive&&this.resize(),this.initialize.call(this,t)},a(e.Type.prototype,{initialize:function(){return this},clear:function(){return M(this.chart),this},stop:function(){return e.animationService.cancelAnimation(this),this},resize:function(t){this.stop();var i=this.chart.canvas,e=F(this.chart.canvas),s=this.options.maintainAspectRatio?e/this.chart.aspectRatio:A(this.chart.canvas);return i.width=this.chart.width=e,i.height=this.chart.height=s,T(this.chart),"function"==typeof t&&t.apply(this,Array.prototype.slice.call(arguments,1)),this},reflow:c,render:function(t){if(t&&this.reflow(),this.options.animation&&!t){var i=new e.Animation;i.numSteps=this.options.animationSteps,i.easing=this.options.animationEasing,i.render=function(t,i){var e=s.easingEffects[i.easing],n=i.currentStep/i.numSteps,o=e(n);t.draw(o,n,i.currentStep)},i.onAnimationProgress=this.options.onAnimationProgress,i.onAnimationComplete=this.options.onAnimationComplete,e.animationService.addAnimation(this,i)}else this.draw(),this.options.onAnimationComplete.call(this);return this},generateLegend:function(){return C(this.options.legendTemplate,this)},destroy:function(){this.clear(),k(this,this.events);var t=this.chart.canvas;t.width=this.chart.width,t.height=this.chart.height,t.style.removeProperty?(t.style.removeProperty("width"),t.style.removeProperty("height")):(t.style.removeAttribute("width"),t.style.removeAttribute("height")),delete e.instances[this.id]},showTooltip:function(t,i){"undefined"==typeof this.activeElements&&(this.activeElements=[]);var o=function(t){var i=!1;return t.length!==this.activeElements.length?i=!0:(n(t,function(t,e){t!==this.activeElements[e]&&(i=!0)},this),i)}.call(this,t);if(o||i){if(this.activeElements=t,this.draw(),this.options.customTooltips&&this.options.customTooltips(!1),t.length>0)if(this.datasets&&this.datasets.length>1){for(var a,h,r=this.datasets.length-1;r>=0&&(a=this.datasets[r].points||this.datasets[r].bars||this.datasets[r].segments,h=l(a,t[0]),-1===h);r--);var c=[],u=[],d=function(t){var i,e,n,o,a,l=[],r=[],d=[];return s.each(this.datasets,function(t){i=t.points||t.bars||t.segments,i[h]&&i[h].hasValue()&&l.push(i[h])}),s.each(l,function(t){r.push(t.x),d.push(t.y),c.push(s.template(this.options.multiTooltipTemplate,t)),u.push({fill:t._saved.fillColor||t.fillColor,stroke:t._saved.strokeColor||t.strokeColor})},this),a=m(d),n=g(d),o=m(r),e=g(r),{x:o>this.chart.width/2?o:e,y:(a+n)/2}}.call(this,h);new e.MultiTooltip({x:d.x,y:d.y,xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,xOffset:this.options.tooltipXOffset,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,titleTextColor:this.options.tooltipTitleFontColor,titleFontFamily:this.options.tooltipTitleFontFamily,titleFontStyle:this.options.tooltipTitleFontStyle,titleFontSize:this.options.tooltipTitleFontSize,cornerRadius:this.options.tooltipCornerRadius,labels:c,legendColors:u,legendColorBackground:this.options.multiTooltipKeyBackground,title:C(this.options.tooltipTitleTemplate,t[0]),chart:this.chart,ctx:this.chart.ctx,custom:this.options.customTooltips}).draw()}else n(t,function(t){var i=t.tooltipPosition();new e.Tooltip({x:Math.round(i.x),y:Math.round(i.y),xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,caretHeight:this.options.tooltipCaretSize,cornerRadius:this.options.tooltipCornerRadius,text:C(this.options.tooltipTemplate,t),chart:this.chart,custom:this.options.customTooltips}).draw()},this);return this}},toBase64Image:function(){return this.chart.canvas.toDataURL.apply(this.chart.canvas,arguments)}}),e.Type.extend=function(t){var i=this,s=function(){return i.apply(this,arguments)};if(s.prototype=o(i.prototype),a(s.prototype,t),s.extend=e.Type.extend,t.name||i.prototype.name){var n=t.name||i.prototype.name,l=e.defaults[i.prototype.name]?o(e.defaults[i.prototype.name]):{};e.defaults[n]=a(l,t.defaults),e.types[n]=s,e.prototype[n]=function(t,i){var o=h(e.defaults.global,e.defaults[n],i||{});return new s(t,o,this)}}else d("Name not provided for this chart, so it hasn't been registered");return i},e.Element=function(t){a(this,t),this.initialize.apply(this,arguments),this.save()},a(e.Element.prototype,{initialize:function(){},restore:function(t){return t?n(t,function(t){this[t]=this._saved[t]},this):a(this,this._saved),this},save:function(){return this._saved=o(this),delete this._saved._saved,this},update:function(t){return n(t,function(t,i){this._saved[i]=this[i],this[i]=t},this),this},transition:function(t,i){return n(t,function(t,e){this[e]=(t-this._saved[e])*i+this._saved[e]},this),this},tooltipPosition:function(){return{x:this.x,y:this.y}},hasValue:function(){return f(this.value)}}),e.Element.extend=r,e.Point=e.Element.extend({display:!0,inRange:function(t,i){var e=this.hitDetectionRadius+this.radius;return Math.pow(t-this.x,2)+Math.pow(i-this.y,2)<Math.pow(e,2)},draw:function(){if(this.display){var t=this.ctx;t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.closePath(),t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.fillStyle=this.fillColor,t.fill(),t.stroke()}}}),e.Arc=e.Element.extend({inRange:function(t,i){var e=s.getAngleFromPoint(this,{x:t,y:i}),n=e.angle%(2*Math.PI),o=(2*Math.PI+this.startAngle)%(2*Math.PI),a=(2*Math.PI+this.endAngle)%(2*Math.PI)||360,h=o>a?a>=n||n>=o:n>=o&&a>=n,l=e.distance>=this.innerRadius&&e.distance<=this.outerRadius;return h&&l},tooltipPosition:function(){var t=this.startAngle+(this.endAngle-this.startAngle)/2,i=(this.outerRadius-this.innerRadius)/2+this.innerRadius;return{x:this.x+Math.cos(t)*i,y:this.y+Math.sin(t)*i}},draw:function(t){var i=this.ctx;i.beginPath(),i.arc(this.x,this.y,this.outerRadius<0?0:this.outerRadius,this.startAngle,this.endAngle),i.arc(this.x,this.y,this.innerRadius<0?0:this.innerRadius,this.endAngle,this.startAngle,!0),i.closePath(),i.strokeStyle=this.strokeColor,i.lineWidth=this.strokeWidth,i.fillStyle=this.fillColor,i.fill(),i.lineJoin="bevel",this.showStroke&&i.stroke()}}),e.Rectangle=e.Element.extend({draw:function(){var t=this.ctx,i=this.width/2,e=this.x-i,s=this.x+i,n=this.base-(this.base-this.y),o=this.strokeWidth/2;this.showStroke&&(e+=o,s-=o,n+=o),t.beginPath(),t.fillStyle=this.fillColor,t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.moveTo(e,this.base),t.lineTo(e,n),t.lineTo(s,n),t.lineTo(s,this.base),t.fill(),this.showStroke&&t.stroke()},height:function(){return this.base-this.y},inRange:function(t,i){return t>=this.x-this.width/2&&t<=this.x+this.width/2&&i>=this.y&&i<=this.base}}),e.Animation=e.Element.extend({currentStep:null,numSteps:60,easing:"",render:null,onAnimationProgress:null,onAnimationComplete:null}),e.Tooltip=e.Element.extend({draw:function(){var t=this.chart.ctx;t.font=W(this.fontSize,this.fontStyle,this.fontFamily),this.xAlign="center",this.yAlign="above";var i=this.caretPadding=2,e=t.measureText(this.text).width+2*this.xPadding,s=this.fontSize+2*this.yPadding,n=s+this.caretHeight+i;this.x+e/2>this.chart.width?this.xAlign="left":this.x-e/2<0&&(this.xAlign="right"),this.y-n<0&&(this.yAlign="below");var o=this.x-e/2,a=this.y-n;if(t.fillStyle=this.fillColor,this.custom)this.custom(this);else{switch(this.yAlign){case"above":t.beginPath(),t.moveTo(this.x,this.y-i),t.lineTo(this.x+this.caretHeight,this.y-(i+this.caretHeight)),t.lineTo(this.x-this.caretHeight,this.y-(i+this.caretHeight)),t.closePath(),t.fill();break;case"below":a=this.y+i+this.caretHeight,t.beginPath(),t.moveTo(this.x,this.y+i),t.lineTo(this.x+this.caretHeight,this.y+i+this.caretHeight),t.lineTo(this.x-this.caretHeight,this.y+i+this.caretHeight),t.closePath(),t.fill()}switch(this.xAlign){case"left":o=this.x-e+(this.cornerRadius+this.caretHeight);break;case"right":o=this.x-(this.cornerRadius+this.caretHeight)}B(t,o,a,e,s,this.cornerRadius),t.fill(),t.fillStyle=this.textColor,t.textAlign="center",t.textBaseline="middle",t.fillText(this.text,o+e/2,a+s/2)}}}),e.MultiTooltip=e.Element.extend({initialize:function(){this.font=W(this.fontSize,this.fontStyle,this.fontFamily),this.titleFont=W(this.titleFontSize,this.titleFontStyle,this.titleFontFamily),this.titleHeight=this.title?1.5*this.titleFontSize:0,this.height=this.labels.length*this.fontSize+(this.labels.length-1)*(this.fontSize/2)+2*this.yPadding+this.titleHeight,this.ctx.font=this.titleFont;var t=this.ctx.measureText(this.title).width,i=z(this.ctx,this.font,this.labels)+this.fontSize+3,e=g([i,t]);this.width=e+2*this.xPadding;var s=this.height/2;this.y-s<0?this.y=s:this.y+s>this.chart.height&&(this.y=this.chart.height-s),this.x>this.chart.width/2?this.x-=this.xOffset+this.width:this.x+=this.xOffset},getLineHeight:function(t){var i=this.y-this.height/2+this.yPadding,e=t-1;return 0===t?i+this.titleHeight/3:i+(1.5*this.fontSize*e+this.fontSize/2)+this.titleHeight},draw:function(){if(this.custom)this.custom(this);else{B(this.ctx,this.x,this.y-this.height/2,this.width,this.height,this.cornerRadius);var t=this.ctx;t.fillStyle=this.fillColor,t.fill(),t.closePath(),t.textAlign="left",t.textBaseline="middle",t.fillStyle=this.titleTextColor,t.font=this.titleFont,t.fillText(this.title,this.x+this.xPadding,this.getLineHeight(0)),t.font=this.font,s.each(this.labels,function(i,e){t.fillStyle=this.textColor,t.fillText(i,this.x+this.xPadding+this.fontSize+3,this.getLineHeight(e+1)),t.fillStyle=this.legendColorBackground,t.fillRect(this.x+this.xPadding,this.getLineHeight(e+1)-this.fontSize/2,this.fontSize,this.fontSize),t.fillStyle=this.legendColors[e].fill,t.fillRect(this.x+this.xPadding,this.getLineHeight(e+1)-this.fontSize/2,this.fontSize,this.fontSize)},this)}}}),e.Scale=e.Element.extend({initialize:function(){this.fit()},buildYLabels:function(){this.yLabels=[];for(var t=v(this.stepValue),i=0;i<=this.steps;i++)this.yLabels.push(C(this.templateString,{value:(this.min+i*this.stepValue).toFixed(t)}));this.yLabelWidth=this.display&&this.showLabels?z(this.ctx,this.font,this.yLabels)+10:0},addXLabel:function(t){this.xLabels.push(t),this.valuesCount++,this.fit()},removeXLabel:function(){this.xLabels.shift(),this.valuesCount--,this.fit()},fit:function(){this.startPoint=this.display?this.fontSize:0,this.endPoint=this.display?this.height-1.5*this.fontSize-5:this.height,this.startPoint+=this.padding,this.endPoint-=this.padding;var t,i=this.endPoint,e=this.endPoint-this.startPoint;for(this.calculateYRange(e),this.buildYLabels(),this.calculateXLabelRotation();e>this.endPoint-this.startPoint;)e=this.endPoint-this.startPoint,t=this.yLabelWidth,this.calculateYRange(e),this.buildYLabels(),t<this.yLabelWidth&&(this.endPoint=i,this.calculateXLabelRotation())},calculateXLabelRotation:function(){this.ctx.font=this.font;var t,i,e=this.ctx.measureText(this.xLabels[0]).width,s=this.ctx.measureText(this.xLabels[this.xLabels.length-1]).width;if(this.xScalePaddingRight=s/2+3,this.xScalePaddingLeft=e/2>this.yLabelWidth?e/2:this.yLabelWidth,this.xLabelRotation=0,this.display){var n,o=z(this.ctx,this.font,this.xLabels);this.xLabelWidth=o;for(var a=Math.floor(this.calculateX(1)-this.calculateX(0))-6;this.xLabelWidth>a&&0===this.xLabelRotation||this.xLabelWidth>a&&this.xLabelRotation<=90&&this.xLabelRotation>0;)n=Math.cos(S(this.xLabelRotation)),t=n*e,i=n*s,t+this.fontSize/2>this.yLabelWidth&&(this.xScalePaddingLeft=t+this.fontSize/2),this.xScalePaddingRight=this.fontSize/2,this.xLabelRotation++,this.xLabelWidth=n*o;this.xLabelRotation>0&&(this.endPoint-=Math.sin(S(this.xLabelRotation))*o+3)}else this.xLabelWidth=0,this.xScalePaddingRight=this.padding,this.xScalePaddingLeft=this.padding},calculateYRange:c,drawingArea:function(){return this.startPoint-this.endPoint},calculateY:function(t){var i=this.drawingArea()/(this.min-this.max);return this.endPoint-i*(t-this.min)},calculateX:function(t){var i=(this.xLabelRotation>0,this.width-(this.xScalePaddingLeft+this.xScalePaddingRight)),e=i/Math.max(this.valuesCount-(this.offsetGridLines?0:1),1),s=e*t+this.xScalePaddingLeft;return this.offsetGridLines&&(s+=e/2),Math.round(s)},update:function(t){s.extend(this,t),this.fit()},draw:function(){var t=this.ctx,i=(this.endPoint-this.startPoint)/this.steps,e=Math.round(this.xScalePaddingLeft);this.display&&(t.fillStyle=this.textColor,t.font=this.font,n(this.yLabels,function(n,o){var a=this.endPoint-i*o,h=Math.round(a),l=this.showHorizontalLines;t.textAlign="right",t.textBaseline="middle",this.showLabels&&t.fillText(n,e-10,a),0!==o||l||(l=!0),l&&t.beginPath(),o>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),h+=s.aliasPixel(t.lineWidth),l&&(t.moveTo(e,h),t.lineTo(this.width,h),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(e-5,h),t.lineTo(e,h),t.stroke(),t.closePath()},this),n(this.xLabels,function(i,e){var s=this.calculateX(e)+x(this.lineWidth),n=this.calculateX(e-(this.offsetGridLines?.5:0))+x(this.lineWidth),o=this.xLabelRotation>0,a=this.showVerticalLines;0!==e||a||(a=!0),a&&t.beginPath(),e>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),a&&(t.moveTo(n,this.endPoint),t.lineTo(n,this.startPoint-3),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(n,this.endPoint),t.lineTo(n,this.endPoint+5),t.stroke(),t.closePath(),t.save(),t.translate(s,o?this.endPoint+12:this.endPoint+8),t.rotate(-1*S(this.xLabelRotation)),t.font=this.font,t.textAlign=o?"right":"center",t.textBaseline=o?"middle":"top",t.fillText(i,0,0),t.restore()},this))}}),e.RadialScale=e.Element.extend({initialize:function(){this.size=m([this.height,this.width]),this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2},calculateCenterOffset:function(t){var i=this.drawingArea/(this.max-this.min);return(t-this.min)*i},update:function(){this.lineArc?this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2:this.setScaleSize(),this.buildYLabels()},buildYLabels:function(){this.yLabels=[];for(var t=v(this.stepValue),i=0;i<=this.steps;i++)this.yLabels.push(C(this.templateString,{value:(this.min+i*this.stepValue).toFixed(t)}))},getCircumference:function(){return 2*Math.PI/this.valuesCount},setScaleSize:function(){var t,i,e,s,n,o,a,h,l,r,c,u,d=m([this.height/2-this.pointLabelFontSize-5,this.width/2]),p=this.width,g=0;for(this.ctx.font=W(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),i=0;i<this.valuesCount;i++)t=this.getPointPosition(i,d),e=this.ctx.measureText(C(this.templateString,{value:this.labels[i]})).width+5,0===i||i===this.valuesCount/2?(s=e/2,t.x+s>p&&(p=t.x+s,n=i),t.x-s<g&&(g=t.x-s,a=i)):i<this.valuesCount/2?t.x+e>p&&(p=t.x+e,n=i):i>this.valuesCount/2&&t.x-e<g&&(g=t.x-e,a=i);l=g,r=Math.ceil(p-this.width),o=this.getIndexAngle(n),h=this.getIndexAngle(a),c=r/Math.sin(o+Math.PI/2),u=l/Math.sin(h+Math.PI/2),c=f(c)?c:0,u=f(u)?u:0,this.drawingArea=d-(u+c)/2,this.setCenterPoint(u,c)},setCenterPoint:function(t,i){var e=this.width-i-this.drawingArea,s=t+this.drawingArea;this.xCenter=(s+e)/2,this.yCenter=this.height/2},getIndexAngle:function(t){var i=2*Math.PI/this.valuesCount;return t*i-Math.PI/2},getPointPosition:function(t,i){var e=this.getIndexAngle(t);return{x:Math.cos(e)*i+this.xCenter,y:Math.sin(e)*i+this.yCenter}},draw:function(){if(this.display){var t=this.ctx;if(n(this.yLabels,function(i,e){if(e>0){var s,n=e*(this.drawingArea/this.steps),o=this.yCenter-n;if(this.lineWidth>0)if(t.strokeStyle=this.lineColor,t.lineWidth=this.lineWidth,this.lineArc)t.beginPath(),t.arc(this.xCenter,this.yCenter,n,0,2*Math.PI),t.closePath(),t.stroke();else{t.beginPath();for(var a=0;a<this.valuesCount;a++)s=this.getPointPosition(a,this.calculateCenterOffset(this.min+e*this.stepValue)),0===a?t.moveTo(s.x,s.y):t.lineTo(s.x,s.y);t.closePath(),t.stroke()}if(this.showLabels){if(t.font=W(this.fontSize,this.fontStyle,this.fontFamily),this.showLabelBackdrop){var h=t.measureText(i).width;t.fillStyle=this.backdropColor,t.fillRect(this.xCenter-h/2-this.backdropPaddingX,o-this.fontSize/2-this.backdropPaddingY,h+2*this.backdropPaddingX,this.fontSize+2*this.backdropPaddingY)}t.textAlign="center",t.textBaseline="middle",t.fillStyle=this.fontColor,t.fillText(i,this.xCenter,o)}}},this),!this.lineArc){t.lineWidth=this.angleLineWidth,t.strokeStyle=this.angleLineColor;for(var i=this.valuesCount-1;i>=0;i--){var e=null,s=null;if(this.angleLineWidth>0&&(e=this.calculateCenterOffset(this.max),s=this.getPointPosition(i,e),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(s.x,s.y),t.stroke(),t.closePath()),this.backgroundColors&&this.backgroundColors.length==this.valuesCount){null==e&&(e=this.calculateCenterOffset(this.max)),null==s&&(s=this.getPointPosition(i,e));var o=this.getPointPosition(0===i?this.valuesCount-1:i-1,e),a=this.getPointPosition(i===this.valuesCount-1?0:i+1,e),h={x:(o.x+s.x)/2,y:(o.y+s.y)/2},l={x:(s.x+a.x)/2,y:(s.y+a.y)/2};t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(h.x,h.y),t.lineTo(s.x,s.y),t.lineTo(l.x,l.y),t.fillStyle=this.backgroundColors[i],t.fill(),t.closePath()}var r=this.getPointPosition(i,this.calculateCenterOffset(this.max)+5);t.font=W(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),t.fillStyle=this.pointLabelFontColor;var c=this.labels.length,u=this.labels.length/2,d=u/2,p=d>i||i>c-d,f=i===d||i===c-d;0===i?t.textAlign="center":i===u?t.textAlign="center":u>i?t.textAlign="left":t.textAlign="right",f?t.textBaseline="middle":p?t.textBaseline="bottom":t.textBaseline="top",t.fillText(this.labels[i],r.x,r.y)}}}}}),e.animationService={frameDuration:17,animations:[],dropFrames:0,addAnimation:function(t,i){for(var e=0;e<this.animations.length;++e)if(this.animations[e].chartInstance===t)return void(this.animations[e].animationObject=i);this.animations.push({chartInstance:t,animationObject:i}),1==this.animations.length&&s.requestAnimFrame.call(window,this.digestWrapper)},cancelAnimation:function(t){var i=s.findNextWhere(this.animations,function(i){return i.chartInstance===t});i&&this.animations.splice(i,1)},digestWrapper:function(){e.animationService.startDigest.call(e.animationService)},startDigest:function(){var t=Date.now(),i=0;this.dropFrames>1&&(i=Math.floor(this.dropFrames),this.dropFrames-=i);for(var e=0;e<this.animations.length;e++)null===this.animations[e].animationObject.currentStep&&(this.animations[e].animationObject.currentStep=0),this.animations[e].animationObject.currentStep+=1+i,this.animations[e].animationObject.currentStep>this.animations[e].animationObject.numSteps&&(this.animations[e].animationObject.currentStep=this.animations[e].animationObject.numSteps),this.animations[e].animationObject.render(this.animations[e].chartInstance,this.animations[e].animationObject),this.animations[e].animationObject.currentStep==this.animations[e].animationObject.numSteps&&(this.animations[e].animationObject.onAnimationComplete.call(this.animations[e].chartInstance),this.animations.splice(e,1),e--);var n=Date.now(),o=n-t-this.frameDuration,a=o/this.frameDuration;a>1&&(this.dropFrames+=a),this.animations.length>0&&s.requestAnimFrame.call(window,this.digestWrapper)}},s.addEvent(window,"resize",function(){var t;return function(){clearTimeout(t),t=setTimeout(function(){n(e.instances,function(t){t.options.responsive&&t.resize(t.render,!0)})},50)}}()),p?define(function(){return e}):"object"==typeof module&&module.exports&&(module.exports=e),t.Chart=e,e.noConflict=function(){return t.Chart=i,e}}).call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleBeginAtZero:!0,scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,barShowStroke:!0,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>'};i.Type.extend({name:"Bar",defaults:s,initialize:function(t){var s=this.options;this.ScaleClass=i.Scale.extend({offsetGridLines:!0,calculateBarX:function(t,i,e){var n=this.calculateBaseWidth(),o=this.calculateX(e)-n/2,a=this.calculateBarWidth(t);return o+a*i+i*s.barDatasetSpacing+a/2},calculateBaseWidth:function(){return this.calculateX(1)-this.calculateX(0)-2*s.barValueSpacing},calculateBarWidth:function(t){var i=this.calculateBaseWidth()-(t-1)*s.barDatasetSpacing;
return i/t}}),this.datasets=[],this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getBarsAtEvent(t):[];this.eachBars(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),this.BarClass=i.Rectangle.extend({strokeWidth:this.options.barStrokeWidth,showStroke:this.options.barShowStroke,ctx:this.chart.ctx}),e.each(t.datasets,function(i,s){var n={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,bars:[]};this.datasets.push(n),e.each(i.data,function(e,s){n.bars.push(new this.BarClass({value:e,label:t.labels[s],datasetLabel:i.label,strokeColor:i.strokeColor,fillColor:i.fillColor,highlightFill:i.highlightFill||i.fillColor,highlightStroke:i.highlightStroke||i.strokeColor}))},this)},this),this.buildScale(t.labels),this.BarClass.prototype.base=this.scale.endPoint,this.eachBars(function(t,i,s){e.extend(t,{width:this.scale.calculateBarWidth(this.datasets.length),x:this.scale.calculateBarX(this.datasets.length,s,i),y:this.scale.endPoint}),t.save()},this),this.render()},update:function(){this.scale.update(),e.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachBars(function(t){t.save()}),this.render()},eachBars:function(t){e.each(this.datasets,function(i,s){e.each(i.bars,t,this,s)},this)},getBarsAtEvent:function(t){for(var i,s=[],n=e.getRelativePosition(t),o=function(t){s.push(t.bars[i])},a=0;a<this.datasets.length;a++)for(i=0;i<this.datasets[a].bars.length;i++)if(this.datasets[a].bars[i].inRange(n.x,n.y))return e.each(this.datasets,o),s;return s},buildScale:function(t){var i=this,s=function(){var t=[];return i.eachBars(function(i){t.push(i.value)}),t},n={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var i=e.calculateScaleRange(s(),t,this.fontSize,this.beginAtZero,this.integersOnly);e.extend(this,i)},xLabels:t,font:e.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.barShowStroke?this.options.barStrokeWidth:0,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&e.extend(n,{calculateYRange:e.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new this.ScaleClass(n)},addData:function(t,i){e.each(t,function(t,e){this.datasets[e].bars.push(new this.BarClass({value:t,label:i,datasetLabel:this.datasets[e].label,x:this.scale.calculateBarX(this.datasets.length,e,this.scale.valuesCount+1),y:this.scale.endPoint,width:this.scale.calculateBarWidth(this.datasets.length),base:this.scale.endPoint,strokeColor:this.datasets[e].strokeColor,fillColor:this.datasets[e].fillColor}))},this),this.scale.addXLabel(i),this.update()},removeData:function(){this.scale.removeXLabel(),e.each(this.datasets,function(t){t.bars.shift()},this),this.update()},reflow:function(){e.extend(this.BarClass.prototype,{y:this.scale.endPoint,base:this.scale.endPoint});var t=e.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var i=t||1;this.clear();this.chart.ctx;this.scale.draw(i),e.each(this.datasets,function(t,s){e.each(t.bars,function(t,e){t.hasValue()&&(t.base=this.scale.endPoint,t.transition({x:this.scale.calculateBarX(this.datasets.length,s,e),y:this.scale.calculateY(t.value),width:this.scale.calculateBarWidth(this.datasets.length)},i).draw())},this)},this)}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,percentageInnerCutout:50,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>'};i.Type.extend({name:"Doughnut",defaults:s,initialize:function(t){this.segments=[],this.outerRadius=(e.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,this.SegmentArc=i.Arc.extend({ctx:this.chart.ctx,x:this.chart.width/2,y:this.chart.height/2}),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];e.each(this.segments,function(t){t.restore(["fillColor"])}),e.each(i,function(t){t.fillColor=t.highlightColor}),this.showTooltip(i)}),this.calculateTotal(t),e.each(t,function(i,e){i.color||(i.color="hsl("+360*e/t.length+", 100%, 50%)"),this.addData(i,e,!0)},this),this.render()},getSegmentsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.segments,function(t){t.inRange(s.x,s.y)&&i.push(t)},this),i},addData:function(t,e,s){var n=void 0!==e?e:this.segments.length;"undefined"==typeof t.color&&(t.color=i.defaults.global.segmentColorDefault[n%i.defaults.global.segmentColorDefault.length],t.highlight=i.defaults.global.segmentHighlightColorDefaults[n%i.defaults.global.segmentHighlightColorDefaults.length]),this.segments.splice(n,0,new this.SegmentArc({value:t.value,outerRadius:this.options.animateScale?0:this.outerRadius,innerRadius:this.options.animateScale?0:this.outerRadius/100*this.options.percentageInnerCutout,fillColor:t.color,highlightColor:t.highlight||t.color,showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,startAngle:1.5*Math.PI,circumference:this.options.animateRotate?0:this.calculateCircumference(t.value),label:t.label})),s||(this.reflow(),this.update())},calculateCircumference:function(t){return this.total>0?2*Math.PI*(t/this.total):0},calculateTotal:function(t){this.total=0,e.each(t,function(t){this.total+=Math.abs(t.value)},this)},update:function(){this.calculateTotal(this.segments),e.each(this.activeElements,function(t){t.restore(["fillColor"])}),e.each(this.segments,function(t){t.save()}),this.render()},removeData:function(t){var i=e.isNumber(t)?t:this.segments.length-1;this.segments.splice(i,1),this.reflow(),this.update()},reflow:function(){e.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.outerRadius=(e.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,e.each(this.segments,function(t){t.update({outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout})},this)},draw:function(t){var i=t?t:1;this.clear(),e.each(this.segments,function(t,e){t.transition({circumference:this.calculateCircumference(t.value),outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout},i),t.endAngle=t.startAngle+t.circumference,t.draw(),0===e&&(t.startAngle=1.5*Math.PI),e<this.segments.length-1&&(this.segments[e+1].startAngle=t.endAngle)},this)}}),i.types.Doughnut.extend({name:"Pie",defaults:e.merge(s,{percentageInnerCutout:0})})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,bezierCurve:!0,bezierCurveTension:.4,pointDot:!0,pointDotRadius:4,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>',offsetGridLines:!1};i.Type.extend({name:"Line",defaults:s,initialize:function(t){this.PointClass=i.Point.extend({offsetGridLines:this.options.offsetGridLines,strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx,inRange:function(t){return Math.pow(t-this.x,2)<Math.pow(this.radius+this.hitDetectionRadius,2)}}),this.datasets=[],this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),e.each(t.datasets,function(i){var s={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,pointColor:i.pointColor,pointStrokeColor:i.pointStrokeColor,points:[]};this.datasets.push(s),e.each(i.data,function(e,n){s.points.push(new this.PointClass({value:e,label:t.labels[n],datasetLabel:i.label,strokeColor:i.pointStrokeColor,fillColor:i.pointColor,highlightFill:i.pointHighlightFill||i.pointColor,highlightStroke:i.pointHighlightStroke||i.pointStrokeColor}))},this),this.buildScale(t.labels),this.eachPoints(function(t,i){e.extend(t,{x:this.scale.calculateX(i),y:this.scale.endPoint}),t.save()},this)},this),this.render()},update:function(){this.scale.update(),e.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachPoints(function(t){t.save()}),this.render()},eachPoints:function(t){e.each(this.datasets,function(i){e.each(i.points,t,this)},this)},getPointsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.datasets,function(t){e.each(t.points,function(t){t.inRange(s.x,s.y)&&i.push(t)})},this),i},buildScale:function(t){var s=this,n=function(){var t=[];return s.eachPoints(function(i){t.push(i.value)}),t},o={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,offsetGridLines:this.options.offsetGridLines,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var i=e.calculateScaleRange(n(),t,this.fontSize,this.beginAtZero,this.integersOnly);e.extend(this,i)},xLabels:t,font:e.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.pointDotRadius+this.options.pointDotStrokeWidth,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&e.extend(o,{calculateYRange:e.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new i.Scale(o)},addData:function(t,i){e.each(t,function(t,e){this.datasets[e].points.push(new this.PointClass({value:t,label:i,datasetLabel:this.datasets[e].label,x:this.scale.calculateX(this.scale.valuesCount+1),y:this.scale.endPoint,strokeColor:this.datasets[e].pointStrokeColor,fillColor:this.datasets[e].pointColor}))},this),this.scale.addXLabel(i),this.update()},removeData:function(){this.scale.removeXLabel(),e.each(this.datasets,function(t){t.points.shift()},this),this.update()},reflow:function(){var t=e.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var i=t||1;this.clear();var s=this.chart.ctx,n=function(t){return null!==t.value},o=function(t,i,s){return e.findNextWhere(i,n,s)||t},a=function(t,i,s){return e.findPreviousWhere(i,n,s)||t};this.scale&&(this.scale.draw(i),e.each(this.datasets,function(t){var h=e.where(t.points,n);e.each(t.points,function(t,e){t.hasValue()&&t.transition({y:this.scale.calculateY(t.value),x:this.scale.calculateX(e)},i)},this),this.options.bezierCurve&&e.each(h,function(t,i){var s=i>0&&i<h.length-1?this.options.bezierCurveTension:0;t.controlPoints=e.splineCurve(a(t,h,i),t,o(t,h,i),s),t.controlPoints.outer.y>this.scale.endPoint?t.controlPoints.outer.y=this.scale.endPoint:t.controlPoints.outer.y<this.scale.startPoint&&(t.controlPoints.outer.y=this.scale.startPoint),t.controlPoints.inner.y>this.scale.endPoint?t.controlPoints.inner.y=this.scale.endPoint:t.controlPoints.inner.y<this.scale.startPoint&&(t.controlPoints.inner.y=this.scale.startPoint)},this),s.lineWidth=this.options.datasetStrokeWidth,s.strokeStyle=t.strokeColor,s.beginPath(),e.each(h,function(t,i){if(0===i)s.moveTo(t.x,t.y);else if(this.options.bezierCurve){var e=a(t,h,i);s.bezierCurveTo(e.controlPoints.outer.x,e.controlPoints.outer.y,t.controlPoints.inner.x,t.controlPoints.inner.y,t.x,t.y)}else s.lineTo(t.x,t.y)},this),this.options.datasetStroke&&s.stroke(),this.options.datasetFill&&h.length>0&&(s.lineTo(h[h.length-1].x,this.scale.endPoint),s.lineTo(h[0].x,this.scale.endPoint),s.fillStyle=t.fillColor,s.closePath(),s.fill()),e.each(h,function(t){t.draw()})},this))}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleShowLabelBackdrop:!0,scaleBackdropColor:"rgba(255,255,255,0.75)",scaleBeginAtZero:!0,scaleBackdropPaddingY:2,scaleBackdropPaddingX:2,scaleShowLine:!0,segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>'};i.Type.extend({name:"PolarArea",defaults:s,initialize:function(t){this.segments=[],this.SegmentArc=i.Arc.extend({showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,ctx:this.chart.ctx,innerRadius:0,x:this.chart.width/2,y:this.chart.height/2}),this.scale=new i.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,lineArc:!0,width:this.chart.width,height:this.chart.height,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,valuesCount:t.length}),this.updateScaleRange(t),this.scale.update(),e.each(t,function(t,i){this.addData(t,i,!0)},this),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];e.each(this.segments,function(t){t.restore(["fillColor"])}),e.each(i,function(t){t.fillColor=t.highlightColor}),this.showTooltip(i)}),this.render()},getSegmentsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.segments,function(t){t.inRange(s.x,s.y)&&i.push(t)},this),i},addData:function(t,i,e){var s=i||this.segments.length;this.segments.splice(s,0,new this.SegmentArc({fillColor:t.color,highlightColor:t.highlight||t.color,label:t.label,value:t.value,outerRadius:this.options.animateScale?0:this.scale.calculateCenterOffset(t.value),circumference:this.options.animateRotate?0:this.scale.getCircumference(),startAngle:1.5*Math.PI})),e||(this.reflow(),this.update())},removeData:function(t){var i=e.isNumber(t)?t:this.segments.length-1;this.segments.splice(i,1),this.reflow(),this.update()},calculateTotal:function(t){this.total=0,e.each(t,function(t){this.total+=t.value},this),this.scale.valuesCount=this.segments.length},updateScaleRange:function(t){var i=[];e.each(t,function(t){i.push(t.value)});var s=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:e.calculateScaleRange(i,e.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);e.extend(this.scale,s,{size:e.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2})},update:function(){this.calculateTotal(this.segments),e.each(this.segments,function(t){t.save()}),this.reflow(),this.render()},reflow:function(){e.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.updateScaleRange(this.segments),this.scale.update(),e.extend(this.scale,{xCenter:this.chart.width/2,yCenter:this.chart.height/2}),e.each(this.segments,function(t){t.update({outerRadius:this.scale.calculateCenterOffset(t.value)})},this)},draw:function(t){var i=t||1;this.clear(),e.each(this.segments,function(t,e){t.transition({circumference:this.scale.getCircumference(),outerRadius:this.scale.calculateCenterOffset(t.value)},i),t.endAngle=t.startAngle+t.circumference,0===e&&(t.startAngle=1.5*Math.PI),e<this.segments.length-1&&(this.segments[e+1].startAngle=t.endAngle),t.draw()},this),this.scale.draw()}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers;i.Type.extend({name:"Radar",defaults:{scaleShowLine:!0,angleShowLineOut:!0,scaleShowLabels:!1,scaleBeginAtZero:!0,angleLineColor:"rgba(0,0,0,.1)",angleLineWidth:1,pointLabelFontFamily:"'Arial'",pointLabelFontStyle:"normal",pointLabelFontSize:10,pointLabelFontColor:"#666",pointDot:!0,pointDotRadius:3,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>'},initialize:function(t){this.PointClass=i.Point.extend({strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx}),this.datasets=[],this.buildScale(t),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),e.each(t.datasets,function(i){var s={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,pointColor:i.pointColor,pointStrokeColor:i.pointStrokeColor,points:[]};this.datasets.push(s),e.each(i.data,function(e,n){var o;this.scale.animation||(o=this.scale.getPointPosition(n,this.scale.calculateCenterOffset(e))),s.points.push(new this.PointClass({value:e,label:t.labels[n],datasetLabel:i.label,x:this.options.animation?this.scale.xCenter:o.x,y:this.options.animation?this.scale.yCenter:o.y,strokeColor:i.pointStrokeColor,fillColor:i.pointColor,highlightFill:i.pointHighlightFill||i.pointColor,highlightStroke:i.pointHighlightStroke||i.pointStrokeColor}))},this)},this),this.render()},eachPoints:function(t){e.each(this.datasets,function(i){e.each(i.points,t,this)},this)},getPointsAtEvent:function(t){var i=e.getRelativePosition(t),s=e.getAngleFromPoint({x:this.scale.xCenter,y:this.scale.yCenter},i),n=2*Math.PI/this.scale.valuesCount,o=Math.round((s.angle-1.5*Math.PI)/n),a=[];return(o>=this.scale.valuesCount||0>o)&&(o=0),s.distance<=this.scale.drawingArea&&e.each(this.datasets,function(t){a.push(t.points[o])}),a},buildScale:function(t){this.scale=new i.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backgroundColors:this.options.scaleBackgroundColors,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,angleLineColor:this.options.angleLineColor,angleLineWidth:this.options.angleShowLineOut?this.options.angleLineWidth:0,pointLabelFontColor:this.options.pointLabelFontColor,pointLabelFontSize:this.options.pointLabelFontSize,pointLabelFontFamily:this.options.pointLabelFontFamily,pointLabelFontStyle:this.options.pointLabelFontStyle,height:this.chart.height,width:this.chart.width,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,labels:t.labels,valuesCount:t.datasets[0].data.length}),this.scale.setScaleSize(),this.updateScaleRange(t.datasets),this.scale.buildYLabels()},updateScaleRange:function(t){var i=function(){var i=[];return e.each(t,function(t){t.data?i=i.concat(t.data):e.each(t.points,function(t){i.push(t.value)})}),i}(),s=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:e.calculateScaleRange(i,e.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);e.extend(this.scale,s)},addData:function(t,i){this.scale.valuesCount++,e.each(t,function(t,e){var s=this.scale.getPointPosition(this.scale.valuesCount,this.scale.calculateCenterOffset(t));this.datasets[e].points.push(new this.PointClass({value:t,label:i,datasetLabel:this.datasets[e].label,x:s.x,y:s.y,strokeColor:this.datasets[e].pointStrokeColor,fillColor:this.datasets[e].pointColor}))},this),this.scale.labels.push(i),this.reflow(),this.update()},removeData:function(){this.scale.valuesCount--,this.scale.labels.shift(),e.each(this.datasets,function(t){t.points.shift()},this),this.reflow(),this.update()},update:function(){this.eachPoints(function(t){t.save()}),this.reflow(),this.render()},reflow:function(){e.extend(this.scale,{width:this.chart.width,height:this.chart.height,size:e.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2}),this.updateScaleRange(this.datasets),this.scale.setScaleSize(),this.scale.buildYLabels()},draw:function(t){var i=t||1,s=this.chart.ctx;this.clear(),this.scale.draw(),e.each(this.datasets,function(t){e.each(t.points,function(t,e){t.hasValue()&&t.transition(this.scale.getPointPosition(e,this.scale.calculateCenterOffset(t.value)),i)},this),s.lineWidth=this.options.datasetStrokeWidth,s.strokeStyle=t.strokeColor,s.beginPath(),e.each(t.points,function(t,i){0===i?s.moveTo(t.x,t.y):s.lineTo(t.x,t.y)},this),s.closePath(),s.stroke(),s.fillStyle=t.fillColor,this.options.datasetFill&&s.fill(),e.each(t.points,function(t){t.hasValue()&&t.draw()})},this)}})}.call(this);
//@tag foundation,core
//@define Xfr

/**
 * @class Xfr
 * @singleton
 */
(function() {

    var global = this;
    if (typeof Xfr === 'undefined') {
        global.Xfr = {};
    }

    //Xfr = Ext;

    Xfr.env="dev";

    Xfr.log=function(message, caller){
        if(Xfr.env=="dev"){
            console.log(caller);
            console.log(message);
        }
    };

    Xfr.loadTranslations=function(locale){
        if(undefined===locale){
            locale="en";
        }
        var translationsPath=Ext.Loader.getPath("Xfr");
        console.log("PAth: "+translationsPath);
        translationsPath=translationsPath+"/translations/message_"+locale+".json";
        console.log("PAth: "+translationsPath);
        $.ajax({
            url: translationsPath,
            dataType: "json",
            async: false,
            success: function (translations) {
                console.log(translations);
                Xfr.translations=translations;
            },
            error: function (data) {
                throw new Error("Unable to load translations");
            }
        });
    };

    Xfr.trans=function(key, params){
        var rawMessage=Xfr.translations[key];
        if(typeof params==='undefined'){
            return rawMessage;
        }
        else{
            Ext.Array.each(params, function(param, index, countriesItSelf) {
                console.log(param);
                rawMessage=rawMessage.replace("%"+param.name+"%",param.value);
            });
            return rawMessage;
        }
    };

    Xfr.isXfrInstance = function(obj) {
        var val = false;
        Ext.isEmpty(Ext.getClassName(obj)) ? val = false : val = true;
        return val;
    };

    Xfr.getInstance = function(obj, aliasGroup) {
        var me = this,
            result = null,
            tempName = null;

        if(Xfr.isXfrInstance(obj))    {
            return obj;
        }

        if (!Ext.isEmpty(obj.className)) {
            tempName = obj.className;
            delete obj.className;
            result = Ext.create(tempName, obj);
        } else if (!Ext.isEmpty(obj.xclass)) {
            tempName = obj.xclass;
            delete obj.xclass;
            result = Ext.create(tempName, obj);
        } else if (!Ext.isEmpty(obj.xtype)) {
            tempName = obj.xtype;
            delete obj.xtype;
            if (Ext.isEmpty(aliasGroup)) {
                aliasGroup = "widget";
            }
            //result = Ext.widget(tempName, obj);
            result = Ext.createByAlias(aliasGroup + "." + tempName, obj);
        }
        return result;
    };

    Xfr.createWidget = function(obj) {
        return Xfr.getInstance(obj, "widget");
        /*
        var me = this
            result = null,
            tempName = null;
        if (!Ext.isEmpty(obj.className)) {
            tempName = obj.className;
            delete obj.className;
            result = Ext.create(tempName, obj);
        } else if (!Ext.isEmpty(obj.xclass)) {
            tempName = obj.xclass;
            delete obj.xclass;
            result = Ext.create(tempName, obj);
        } else if (!Ext.isEmpty(obj.xtype)) {
            tempName = obj.xtype;
            delete obj.xtype;
            result = Ext.widget(tempName, obj);
        }
        return result;
        */
    };

})();

/**
 * @class Xfr.Utils
 * Description
 */
Ext.define('Xfr.Utils', {
    singleton: true,
    instance: function () {
        return this;
    },
    testMethod: function (val) {
        return val + " juste pou voir";
    },
    getCmpClassId: function (cmpClassName) {
        return (new String(cmpClassName)).toLowerCase().split(".").join("-");
    },
    getCmpTplFromScript: function (cmpClassName) {
        var scriptId = this.getCmpClassId(cmpClassName);
        return $("#" + scriptId).html();
    },
    getObjectByKeypath: function (obj, path) {
        try {
            return eval("obj." + path);
        } catch (e) {
            return undefined;
        }
    },
    arrayContains: function (array, obj, compareAllFields) {

        if (Ext.isEmpty(compareAllFields) || compareAllFields) {
            return Ext.Array.contains(array, obj);
        } else {
            for (var i = 0; i < array.length; i++) {
                var item = array[i],
                        founded = true;

                for (var key in obj) {
                    var val = obj[key];
                    if (Ext.isEmpty(item[key]) || item[key] != val) {
                        founded = false;
                        break;
                    }
                }
                if (founded) {
                    return true;
                }
            }
            return false;
        }
    },
    filterCollection: function (collection, searchValue) {
        var record = collection.first();
        return Xfr.Utils.filterCollectionByRecord(collection, searchValue, record);
    },
    filterCollectionByRecord: function (collection, searchValue, record) {
        var result = [],
                tempArray = null;
        if (!Ext.isEmpty(record) && Ext.isObject(record) && !Ext.isEmpty(collection)) {
            for (var fieldName in record) {
                if (Ext.isObject(record[fieldName])) {
                    tempArray = Xfr.Utils.filterCollection(collection, record[fieldName], searchValue);
                } else {
                    tempArray = Xfr.Utils.filterCollectionByFieldName(collection, fieldName, searchValue);
                }
                result = Ext.Array.merge(result, tempArray);
            }
        }
        return result;
    },
    filterCollectionByFieldName: function (collection, fieldName, searchValue) {
        var filter = new Ext.util.Filter({
            anyMatch: true,
            property: fieldName,
            value: searchValue
        }),
                data = collection.filter(filter);

        return data.items;
    },
    getUrlParam: function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results === null) {
            return null;
        } else {
            return results[1] || 0;
        }

    },
    getDateStr: function (strDate) {
        var now = new Date();
        if (strDate) {
            var day = strDate.substring(0, 2);
            var month = strDate.substring(3, 5);
            var year = strDate.substring(6, 10);
            now.setDate(day);
            now.setMonth(month);
            now.setFullYear(year);
        }

        var annee = now.getFullYear();
        var mois = now.getMonth() + 1;
        if (mois < 10) {
            mois = "0" + String(mois);
        }
        var jour = now.getDate();
        if (jour < 10) {
            jour = "0" + String(jour);
        }
        var date = annee + "-" + mois + "-" + jour;
        return date;
    },
    shortenString: function (str, size) {
        var strObj = new String(str);
        return strObj.substr(0, size);
    },
    formatNumber: function (num) {

        if (Ext.isEmpty(num)) {
            return "0";
        }
        // console.log("valeur a formater");
        // console.log(num);
        var prefix = "";
        if (num < 0) {
            prefix = "-";
        }
        var indexDecimal = String(num).indexOf(".");
        tabnum = String(num).split('').reverse().join('').match(/\d{1,3}/g);
        if (indexDecimal > 0) {
            var test = false;
            var cum = 0;
            var i = tabnum.length;
            i--;
            while (!test) {
                cum = cum + tabnum[i].length;
                if (cum >= indexDecimal) {
                    test = true;
                    i--;
                    tabnum[i] = tabnum[i] + ",";
                }
                i--;
            }
        }
        if (Ext.isEmpty(tabnum)) {
            return "0";
        }
        tabnum = tabnum.join(' ').split('').reverse().join('');
        tabnum = tabnum.replace(" ,", ",");
        return prefix + tabnum;
    },
    dropMsg: function (msg) {
        if (msg.length >= 25) {
            return msg.substring(0, 25) + "...";
        }
        return msg;

    },
    initVboxAvailable: function (cmp) {
        // console.log("----------------------initVboxAvailable");
        var me = this;

console.log("vbox available height in utilis");
        var cmpHeight = cmp.height();

        // console.log("classname= " + Ext.getClassName(me));
        // console.log("cmpHeight = " + cmpHeight);
        // console.log("children length = " + me.$this.children("*").length);
        // console.log(me.$this.children());

        var availableHeight = cmpHeight-0;
        cmp.children("*>:not(.vbox-available-height)").each(function (index, child) {
            // console.log("--child-----------");
            // console.log(child);
            var childElt = $(child);
            var childHeight = childElt.outerHeight();
            // console.log("------------childHeight = " + childHeight);
            if (!childElt.hasClass('vbox-available-height')) {
                availableHeight -= childHeight;
            }
        });
        //me.$this.children(".vbox-available-height:first").height(availableHeight + "px").css;
        // console.log("vbox availableHeight");
        // console.log(me.$this.children(".vbox-available-height:first").length);
        // console.log(me.$this.children(".vbox-available-height:first"));
        var child=cmp.children(".vbox-available-height:first");

        if(child.length>0){
            var takeOffTitle=child.attr("data-takeoff-title");
            if( $.isNumeric(takeOffTitle) && takeOffTitle>0 ){
                availableHeight=availableHeight-takeOffTitle;
            }
            child.css("height", availableHeight + "px").attr("data-available-height", availableHeight);
            me.initVboxAvailable(child);
        }



    }
});


/**
 * @private
 *
 * Provides a registry of all Components (instances of {@link Xfr.Component} or any subclass
 * thereof) on a page so that they can be easily accessed by {@link Xfr.Component component}
 * {@link Xfr.Component#getId id} (see {@link #get}, or the convenience method {@link Xfr#getCmp Ext.getCmp}).
 *
 * This object also provides a registry of available Component _classes_
 * indexed by a mnemonic code known as the Component's `xtype`.
 * The `xtype` provides a way to avoid instantiating child Components
 * when creating a full, nested config object for a complete Xfr page.
 *
 * A child Component may be specified simply as a _config object_
 * as long as the correct `xtype` is specified so that if and when the Component
 * needs rendering, the correct type can be looked up for lazy instantiation.
 *
 * For a list of all available `xtype`, see {@link Xfr.Component}.
 */
Ext.define('Xfr.ComponentManager', {
    alternateClassName: 'Xfr.ComponentMgr',
    singleton: true,
    constructor: function () {
        this.idMap = {};
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
     * Registers an item to be managed.
     * @param {Object} component The item to register.
     */
    register: function (component) {
        var id = component.getId();

        // <debug>
        if (this.idMap[id]) {

            var msg = Xfr.trans('cmpRegisterFail',[{'id':id}]);
            Ext.Logger.warn(msg);
//            Ext.Logger.warn('Registering a component with a id (`' + id + '`) which has already been used. Please ensure the existing component has been destroyed (`Xfr.Component#destroy()`.');
        }
        // </debug>

        this.idMap[component.getId()] = component;

    },
    /**
     * Register component template
     * @param {Xfr.Component} component
     * @returns {undefined}
     */
    registerCmpTpl: function (component) {
//        console.log("--register component template--");
        if (!this.cmpInClassMap(component)) {
            this.classMap[component.self.getName()] = {
                tplTokens: component.tplTokens
            };
        } else {
            this.classMap[component.self.getName()].tplTokens = component.tplTokens;
        }
    },
    /**
     * Unregisters an item by removing it from this manager.
     * @param {Object} component The item to unregister.
     */
    unregister: function (component) {
        delete this.idMap[component.getId()];
    },
    /**
     * Checks if an item type is registered.
     * @param {String} component The mnemonic string by which the class may be looked up.
     * @return {Boolean} Whether the type is registered.
     */
    isRegistered: function (component) {
        return this.map[component] !== undefined;
    },
    /**
     * Returns an item by id.
     * For additional details see {@link Ext.util.HashMap#get}.
     * @param {String} id The `id` of the item.
     * @return {Object} The item, or `undefined` if not found.
     */
    get: function (id) {
        return this.idMap[id];
    },
    getTplTokens: function (component) {
        var obj = this.classMap[component.self.getName()];
        if (!Ext.isEmpty(obj)) {
            return obj.tplTokens;
        }
        return null;
    }
//    ,
//    /**
//     * Creates a new Component from the specified config object using the
//     * config object's `xtype` to determine the class to instantiate.
//     * @param {Object} component A configuration object for the Component you wish to create.
//     * @param {Function} [defaultType] The constructor to provide the default Component type if
//     * the config object does not contain a `xtype`. (Optional if the config contains an `xtype`).
//     * @return {Xfr.Component} The newly instantiated Component.
//     */
//    create: function (component, defaultType) {
//        if (component.isComponent) {
//            return component;
//        }
//        else if (Ext.isString(component)) {
//            return Ext.createByAlias('widget.' + component);
//        }
//        else {
//            var type = component.xtype || defaultType;
//
//            return Ext.createByAlias('widget.' + type, component);
//        }
//    },
//    registerType: Ext.emptyFn
});

//@define Component
/**
 * @class Xfr.Component
 *
 */
Ext.define("Xfr.Component", {
    requires: [
        //"Xfr.ComponentManager",
        ////"Xfr.Mustache"
        //"Xfr.Ractive",
        //"Xfr.Slimscroll",
        //"Xfr.Loadmask",
        //"Xfr.Utils"
    ],
    requiresTpl: [],
    extend: 'Ext.Component',
    xtype: 'xcomponent',
    config: {
        title:"",
        subtitle:"",
        cls: "xfr-cmp",
        fullscreen: false,
        pageLevelPositionning: false,
        parent: null,
        children: [],
        slimscroll: null,
        /*********************************************************************************************************************/
        /**
         *If "cmpTpl" is not empty, the template of the component will be the content of "cmpTpl".
         *If "cmpTpl" is empty  there are many case:
         *  1- "dynamicTpl" is set to false : in this case the template will be loaded remotely from "tplUrl"
         *  2- "dynamicTpl" is set to true : in this case it will follow the dynamic template loading process.
         *   The dynamic template loading process consist of :
         *   first finding the template in a local script which has a special id which is generated based on the component package.
         *   Example if the component package is "Test.pck1.MyComponent" the id of the script will be "test-pck1-mycomponent".
         *   If that specific script doesn't exist, the template will be loaded remotely from a generated url also based on the
         *   Example if the component package is "Test.pck1.MyComponent" the url will be "/locationOfTest.pck1/tpl/testpck1mycomponent.tpl".

         *   When generating the special script id or the remote file url,
         *   if "dynamicTplSrc" is set to "component", the package used for the generation will be a component  package :
         *      by default it is the current component package, but if "dynamicTplClass" is set to a specific component full className
         *      the package used for generation will be the package of that specific component;
         *   if "dynamicTplSrc" is set to "parent" the package used will be the current parent component package.
         *   if "dynamicTplSrc" is set to "custom" the package used will be the current component package; but the
         *   generated script id and generated  remote file url  will have a suffix which is "_" and the the value of "dynamicTplName"
         **/
        cmpTpl: null,
        tplUrl: null,
        dynamicTpl: true,
        /*
         * values : "component", "parent" , "custom"
         */
        dynamicTplSrc: "component",
        /*
         * description : a simple string with no space
         */
        dynamicTplName: "custom",
        dynamicTplClass: null,
        /**
         * When set to true, the loading of the template is launch in synchronic mode
         * otherwise it is launch in asynchronic mode
         * @type {Boolean}
         */
        syncTplLoading: true,
        /**
         * Mask the component on the loading of the items templates
         */
        maskOnItemsLoading: false,
        /******************************************************************************************************************************/
        attr: {},
        control: {},
        refs: {},
        data: {},
        items: null,
        events: {},
        listeners: {
            /**
             * fire after the rendering of the component tpl
             */
            "afterrendertpl": Ext.emptyFn
        },
        parentName: "",
        parentPane: null,
        parentTitle: "",
        cache:true
    },
    $id: null,
    isMasked: false,
    constructor: function (config) {
        console.log("component constructor");
        var me = this;

        if (!Ext.isEmpty(me.requiresTpl)) {
            for (var i = 0; i < me.requiresTpl.length; i++) {
                var tplClass = me.requiresTpl[i],
                    tplClassId = Xfr.Utils.getCmpClassId(tplClass);

                if ($("script#" + tplClassId).length === 0) {
                    var tplPath = me.getCmpTplPath(tplClass);
                    $.ajax({
                        url: tplPath,
                        dataType: "html",
                        async: false,
                        success: function (template) {
                            $('<script id="' + tplClassId + '" type="text/xfr-tpl">' + template + '</script>').appendTo($("body"));
                        },
                        error: function (data) {
                            throw new Error(tplClass + " " + Xfr.trans("tplLoadingFail", []));
                        }
                    });
                }
            }
            this.callParent(arguments);
        } else {
            this.callParent(arguments);
        }

    },
    initialize: function () {
        var me = this;
        this.callParent(arguments);

        //me.setUtils({});

        me.$this = $("#" + this.getId());

        //check fullscreen initialisation
        if (this.getFullscreen()) {
            var windowHeight = $(window).height();
            // console.log("windowsHeight = " + windowHeight);
            // console.log("windowsHeight2 = " + $(window).innerHeight());
            // console.log("windowsHeight3 = " + $(window).outerHeight());
            // console.log("windowsHeight3 = " + $(document).height());
            me.$this.height(windowHeight);

            me.$this.width($(window).width());
        }

        //init tpl
        this.initTpl();


        console.log("Tpl initialize");
        //init component items 
        var items = this.getItems();

        me.initItems(items);


        // //init components jquery events
        // var events = this.getEvents();
        // for (var event in events) {
        //     var eventCallBack = events[event];
        //     if (!Ext.isEmpty(eventCallBack)) {
        //         me.$this.on(event, eventCallBack);
        //         //                 me.$this.on(event, function(evt){
        //         //                    eventCallBack(evt, me);
        //         //                });
        //     }
        // }

        //init plugins
        me.initPlugins();




        me.on({
            "show": {
                scope: me,
                fn: "onShow"
            }
        });


    },

    beforeBackStep: function () {

    },
    onLoadTpl: function (tpl) {
    },
    afterRenderTpl: function (me) {
        var me = this;

        // console.log("afterRenderTpl from original component");
        me.initAllSize();

        var slimscroll = this.getSlimscroll();

        if (!Ext.isEmpty(slimscroll)) {
            console.log('slimscroll set '+ me.getId());
            if (slimscroll === true) {
                console.log('slimscroll is true '+ me.getId());
                me.$this.slimscroll();
            } else if (Ext.isObject(slimscroll)) {
                console.log('slimscroll is object '+ me.getId());
                me.$this.slimscroll(slimscroll);
            }
        }
        $(".slimscroll", me.$this).slimscroll();

        $(window).resize(function () {

            // console.log("on window resize----------");
            me.initAllSize();
            if (!Ext.isEmpty(me.getChildren())) {
                for (var i = 0; i < me.getChildren().length; i++) {
                    var child = me.getChildren()[i];
                    child.initAllSize();
                }
            }
        });

        //Gestion du clique sur le lien précédent


        if (!Ext.isEmpty(me.config.parentPane)){

            $("a[data-action-type=back]", me.$this).on('click', function () {

                console.log("affichage parent");
                console.log(me.$this);

                me.beforeBackStep();
                me.fireEvent('beforeBackStep', me);
                me.destroy();

                me.config.parentPane.show();

            });
        }
    },
    onShow: function (me) {
        //console.log("after show component");
        var me = this;

        $("a[data-action-type=back]", me.$this).on('click', function () {
            me.beforeBackStep();
            me.fireEvent('beforeBackStep', me);
            //console.log("destroying me on back");
            me.destroy();
            if (me.config.parentPane != null) {
                me.config.parentPane.show();
            }
        });
        //me.initAllSize();
    },
    initAllSize: function () {
        var me = this;
        //check fullscreen initialisation
        if (this.getFullscreen()) {
            me.$this.height($(window).height());
            me.$this.width($(window).width());
        }
        this.initVboxAvailable();
    },
    initVboxAvailable: function () {
        // console.log("----------------------initVboxAvailable");
        var me = this;



        var cmpHeight = me.$this.height();

        // console.log("classname= " + Ext.getClassName(me));
        // console.log("cmpHeight = " + cmpHeight);
        // console.log("children length = " + me.$this.children("*").length);
        // console.log(me.$this.children());

        var availableHeight = cmpHeight - 20;
        me.$this.children("*>:not(.vbox-available-height)").each(function (index, child) {
            // console.log("--child-----------");
            // console.log(child);
            var childElt = $(child);
            var childHeight = childElt.outerHeight();
            // console.log("------------childHeight = " + childHeight);
            if (!childElt.hasClass('vbox-available-height')) {
                availableHeight -= childHeight;
            }
        });
        //me.$this.children(".vbox-available-height:first").height(availableHeight + "px").css;
        // console.log("vbox availableHeight");
        // console.log(me.$this.children(".vbox-available-height:first").length);
        // console.log(me.$this.children(".vbox-available-height:first"));

        var child = me.$this.children(".vbox-available-height:first");

        if (child.length > 0) {
            var takeOffTitle=child.attr("data-takeoff-title");
            if( $.isNumeric(takeOffTitle) && takeOffTitle>0 ){
                availableHeight=availableHeight-takeOffTitle;
            }
            child.css("height", availableHeight + "px").attr("data-available-height", availableHeight);
            var recursive=child.attr("data-vbox-recursive");
            if(recursive=="data-vbox-recursive"){
                console.log("Appliquer la recursivité");
                Xfr.Utils.initVboxAvailable(child);
            }

        }

    },
    initElement: function () {
        this.callParent(arguments);
        this.renderElement.setHtml("");
    },
    //updateData: function() {},
    initTpl: function () {
        var me = this;
        var tpl = this.getCmpTpl();


        //If no custom component template was provived
        if (Ext.isEmpty(tpl)) {
            // if (!Xfr.ComponentMgr.cmpInClassMap(this)) {
            //if the component template is not in the cache

            if (me.getDynamicTpl()) {
                //apply dynamic template loading proccess
                var tplId = this.getTplId(),
                    loadedTpl = $("script#" + tplId).html();
                if (!Ext.isEmpty(tplId) && !Ext.isEmpty(loadedTpl)) {
                    //check template from script with component id
                    tpl = loadedTpl;
                } else {
                    //Check remote loaded TPL"
                    tpl = this.loadTpl();
                }
            } else {
                var tplUrl = me.getTplUrl();
                tpl = this.loadTpl(tplUrl);
            }

            // } else {
            //     //if the component template is in the cache
            //     //get cached TPL
            //     tpl = Xfr.ComponentMgr.getTpl(this);
            // }
        }

        if (me.getSyncTplLoading()) {
            me.setCmpTpl(tpl);
            me.initTplBinder();
            if (Ext.isEmpty(me.getItems())) {
                if (me.getMaskOnItemsLoading()) {
                    me.unmask();
                }

                me.afterRenderTpl(me);
                me.fireEvent('afterrendertpl', me);
            }
        }
        return true;
    },
    getBindObject: function () {
        var bindObj = {},
            me = this;

        bindObj = Ext.merge(bindObj, this.getInitialConfig());
        //bindObj = Ext.merge(bindObj, this.getConfig());
        try {
            //if (!Ext.isEmpty(appConfig)) {
            //    bindObj.appConfig = appConfig;
            //}
            bindObj.Utils = Xfr.Utils;
            bindObj.Ext = Ext;

            //console.log("Utilis in dinding");
            //console.log(bindObj.Utils);
        } catch (exc) {

            console.log("Exeption");
            console.log(exc);
        }
        return bindObj;
    },
    initTplBinder: function () {

        var me = this,
            bindObj = {},
            tpl = this.getCmpTpl(),
            tplObj = {
                html: tpl
            };

        if (!Ext.isEmpty(tpl)) {
            bindObj = me.getBindObject();

            me.beforeBindData(tplObj, bindObj);

            this.binder = new Ractive({
                el: '#' + this.getId(),
                template: tplObj.html,
                data: bindObj
            });

            ///this.binder.set('personne', {nom:'Magloire'})

            Xfr.ComponentManager.register(this);

        }
        else {
            console.log('Template is empty' + this.getId());
        }
    },
    resetBinder: function () {
        var bindObj = {},
            me = this;

        bindObj = me.getBindObject();
        bindObj.data = null;

        if (!Ext.isEmpty(me.binder)) {
            me.binder.reset(bindObj);
            if (!Ext.isEmpty(me.getChildren())) {
                for (var i = 0; i < me.getChildren().length; i++) {
                    var child = me.getChildren()[i];
                    child.resetBinder();
                }
            }
        }
    },
    beforeBindData: function (tplObj, bindObj) {
    },
    updateData: function (newData) {

        var me = this;
        if (!Ext.isEmpty(me.binder)) {
            //console.log("setting data on ractive");
            //console.log(newData);
            me.binder.set("data", newData);
            if (!Ext.isEmpty(me.getChildren())) {
                for (var i = 0; i < me.getChildren().length; i++) {
                    var child = me.getChildren()[i];
                    child.setData(newData);
                }
            }
        }
    },
    getData: function (fromView) {
        var me = this;
        if (Ext.isEmpty(fromView)) {
            fromView = true;
        }

        if (!Ext.isEmpty(me.binder) && fromView) {

            var result = me.binder.get("data");
            if (!Ext.isEmpty(me.getChildren())) {
                for (var i = 0; i < me.getChildren().length; i++) {
                    var child = me.getChildren()[i];
                    var childData = child.binder.get("data");
                    if (!Ext.isEmpty(childData)) {
                        Ext.merge(result, childData);
                    }
                }
            }

            return result;
        } else {
            return me.callParent(arguments);
        }
    },
    getCmpTplPath: function (cmpClassName) {
        var me = this,
            cmpPath, pathArray, cmpFile;


        var className = cmpClassName;
        cmpPath = Ext.Loader.getPath(className);


        pathArray = cmpPath.split("/");
        cmpFile = pathArray.pop();


        cmpFile = cmpFile.substr(0, cmpFile.length - 2);
        cmpFile = cmpFile.toLowerCase() + "tpl";


        pathArray.push("tpl");
        pathArray.push(cmpFile);
        return pathArray.join("/");
    },
    getTplPath: function () {
        var me = this,
            cmpPath, pathArray, cmpFile;

        if (me.getDynamicTplSrc() === "component" || me.getDynamicTplSrc() === "custom") {
            console.log("Test Magloire tpl src is custom or component");
            var className = me.getDynamicTplClass();
            console.log("Tpl class name "+className);
            if (Ext.isEmpty(className)) {
                className = me.self.getName();
            }
            cmpPath = Ext.Loader.getPath(className);
        } else if (me.getDynamicTplSrc() === "parent") {
            cmpPath = Ext.Loader.getPath(Ext.getClass(me).superclass.self.getName());
        }

        pathArray = cmpPath.split("/");
        cmpFile = pathArray.pop();
        if (me.getDynamicTplSrc() === "custom") {
            cmpFile = cmpFile.substr(0, cmpFile.length - 3);
            cmpFile = cmpFile.toLowerCase() + "_" + me.getDynamicTplName() + ".tpl";
        } else {
            cmpFile = cmpFile.substr(0, cmpFile.length - 2);
            cmpFile = cmpFile.toLowerCase() + "tpl";
        }

        pathArray.push("tpl");
        pathArray.push(cmpFile);
        return pathArray.join("/");
    },
    getTplId: function () {
        var me = this,
            pathArray;

        if (me.getDynamicTplSrc() === "component") {
            pathArray = me.self.getName().toLowerCase().split(".");
        } else if (me.getDynamicTplSrc() === "parent") {
            pathArray = Ext.getClass(me).superclass.self.getName().toLowerCase().split(".");
        } else if (me.getDynamicTplSrc() === "custom") {
            pathArray = (me.self.getName() + "_" + me.getDynamicTplName()).toLowerCase().split(".");
        }

        return pathArray.join("-");
    },
    loadTpl: function (tplPath) {
        var tpl = "",
            me = this;

        if (Ext.isEmpty(tplPath)) {
            tplPath = me.getTplPath();
        }

        if (!Ext.isEmpty(Xfr.Component.loadedTpls[tplPath]) && me.getCache()) {
            console.log("TPL "+tplPath+" Loaded from cache "+me.getCache() );
            var template = Xfr.Component.loadedTpls[tplPath];
            tpl = me.loadTplSuccess(template);
        } else {
            console.log("TPL "+tplPath+" ReLoaded from server "+me.getCache() );
            $.ajax({
                url: tplPath,
                dataType: "html",
                async: !me.getSyncTplLoading(),
                success: function (template) {
                    //if(!me.getDynamicTpl()){
                        Xfr.Component.loadedTpls[tplPath] = template;
                    //}
                    me.loadTplSuccess(template);
                    tpl = template;
                    return tpl;
                },
                error: function (data) {
                    return null;
                    throw new Error("The template loading failed");
                }
            });
        }

        return tpl;
    },
    loadTplSuccess: function (template) {
        var tplObj = {
                html: ""
            },
            me = this;


        tplObj.html = template;

        //me.onLoadTpl(tplObj);
        me.fireEvent('loadtpl', me, tplObj);


        if (!me.getSyncTplLoading()) {

            me.setCmpTpl(tplObj.html);
            me.initTplBinder();

            if (Ext.isEmpty(me.getItems())) {
                if (me.getMaskOnItemsLoading()) {
                    me.unmask();
                }

                me.afterRenderTpl(me);
                me.fireEvent('afterrendertpl', me);
            }

        }
        return tplObj.html;
    },
    mask: function (label, opt) {
        var me = this;

        if (Ext.isEmpty(opt)) {
            opt = {};
        }
        if (Ext.isEmpty(label) || label == undefined) {
            label = Xfr.translations.loading; //appConfig.translations.loading;
        }

        // console.log("label==============" + label);
        /*if (Ext.isEmpty(opt.size)) {
         opt.size = 64;
         }*/
        if (Ext.isEmpty(opt.backgroundColor)) {
            opt.backgroundColor = "black";
        }

        me.isMasked = true;
        me.$this.mask(label, opt);
    },
    unmask: function () {
        var me = this;
        me.$this.unmask();
        me.isMasked = false;
    },
    applyPlugins: function (config) {
        //console.log("applyPlugins");
        return config;
    },
    initItems: function (items, controlListener) {
        var me = this;

        if (Ext.isEmpty(controlListener)) {
            controlListener = true;
        }

        me.childrenRef = {};
        if (!Ext.isEmpty(items)) {
            me.itemsRendered = 0;
            me.setChildren([]);

            if (me.getMaskOnItemsLoading()) {
                me.mask();
            }

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (!Ext.isEmpty(item)) {
                    if (me.getPageLevelPositionning()) {
                        item.renderTo = $(item.position)[0];
                    }
                    else {
                        item.renderTo = $("#" + this.getId() + " " + item.position)[0];
                    }

                    //item.renderTo = $("#"+ item.position)[0];
                    item.parent = me;

                    if (controlListener) {
                        if (Ext.isEmpty(item.listeners)) {
                            item.listeners = {};
                        }
                        item.listeners["afterrendertpl"] = function () {
                            me.itemsRendered++;
                            if (me.itemsRendered === me.getItems().length) {

                                me.afterRenderTpl(me);
                                me.fireEvent('afterrendertpl', me);

                                if (me.getMaskOnItemsLoading()) {
                                    me.unmask();
                                }
                            }
                        };
                    }

                    var instance = Xfr.createWidget(item);
                    me.getChildren().push(instance);


                    if (!Ext.isEmpty(item.ref)) {
                        me.childrenRef[item.ref] = instance;
                    }
                }
            }

            if (me.getMaskOnItemsLoading()) {
                me.unmask();
            }
        }
    },
    initPlugins: function () {
        var me = this;
        var config = me.getPlugins();

        var ln, i, configObj;

        if (!config) {
            return config;
        }

        config = [].concat(config);

        for (i = 0, ln = config.length; i < ln; i++) {

            configObj = config[i];
            if (Ext.isString(configObj)) {
                configObj = {
                    xtype: configObj
                };
            }

            //<deprecated product=touch since=2.0>
            if (Ext.isObject(configObj) && configObj.ptype) {
                //<debug warn>
                Ext.Logger.deprecate('Using a ptype is now deprecated, please use type instead', 1);
                //</debug>
                configObj.type = configObj.ptype;
            }
            //</deprecated>

            var renderTo = null;
            if (!Ext.isEmpty(configObj.position)) {
                renderTo = $(configObj.position, me.$this)[0];
            } else {
                renderTo = me.$this[0];
            }
            configObj.renderTo = renderTo;

            var onAfterRenderEvent = function () {
                this.init(me);
            };
            if (Ext.isEmpty(configObj.listeners)) {
                configObj.listeners = {
                    afterrendertpl: onAfterRenderEvent
                };
            } else {
                configObj.listeners["afterrendertpl"] = onAfterRenderEvent;
            }

            //if(configObj.className=="Xfr.plugin.Summary"){
            //    console.log(configObj);
            //}

            if (!Ext.isEmpty(configObj.className)) {
                config[i] = Ext.create(configObj.className, configObj);
            } else if (!Ext.isEmpty(configObj.xclass)) {
                config[i] = Ext.create(configObj.xclass, configObj);
            } else if (!Ext.isEmpty(configObj.xtype)) {
                config[i] = Ext.createByAlias("plugin." + configObj.xtype, configObj);
            }
            /*    config[i].on({
             afterrender: function() {
             alert("afterrender");
             this.init(me);
             }
             });*/
            //config[i] = Ext.factory(configObj, 'Ext.plugin.Plugin', null, 'plugin');
        }

        me.setPlugins(config);

        return config;
    },
    updatePlugins: function (newPlugins, oldPlugins) {
        //console.log("update plugins");
        /* var ln, i;

         if (newPlugins) {
         for (i = 0, ln = newPlugins.length; i < ln; i++) {
         newPlugins[i].init(this);
         }
         }

         if (oldPlugins) {
         for (i = 0, ln = oldPlugins.length; i < ln; i++) {
         Ext.destroy(oldPlugins[i]);
         }
         }*/
    },
    destroy: function () {
        me = this;

        // console.log("on Destroy ---------" + Ext.getClassName(me));

        if (!Ext.isEmpty(me.getChildren())) {
            for (var i = 0; i < me.getChildren().length; i++) {
                var child = me.getChildren()[i];
                child.destroy();
            }
            ;
            ;

        }
        if (!Ext.isEmpty(me.getPlugins())) {
            for (var i = 0; i < me.getChildren().length; i++) {
                var child = me.getPlugins()[i];
                child.destroy();
            }
            ;
            ;

        }
        this.callParent(arguments);
    },
    remove: function () {

    },
    // controlEvents: function() {
    //     var me = this;
    //     var control = this.getControl();
    //     var refs = this.getRefs();

    //     if (!Ext.isEmpty(control)) {
    //         for (var controlLbl in control) {

    //             var controlObj = control[controlLbl];
    //             if (!Ext.isEmpty(controlObj)) {
    //                 for (var item in controlObj) {
    //                     var itemVal = controlObj[item];
    //                     if (!Ext.isEmpty(itemVal)) {
    //                         if (!Ext.isEmpty(refs) && !Ext.isEmpty(refs[controlLbl])) {
    //                             $("#" + me.getId() + " " + refs[controlLbl]).bind(item, function() {
    //                                 me[itemVal](this);
    //                             });
    //                         } else {
    //                             var arg = {};
    //                             $("#" + me.getId() + " " + controlLbl).bind(item, function() {
    //                                 me[itemVal](this);
    //                             });
    //                         }
    //                     }
    //                 }
    //             }

    //         }
    //     }
    // },
    statics: {
        loadedTpls: {}
    }

});

 /**
  * @class Xfr.Page
  * @extends Xfr.Component**
  * Description
  */
 Ext.define('Xfr.Page', {
     extend: 'Xfr.Component',
     requires: [],
     config: {
         fullscreen: true,
         cls: "page"         
     }
 });

/**
 * @class Xfr.data.Store
 *
 * Description
 */
Ext.define('Xfr.data.Store', {
    extend: 'Ext.Evented',
    requires: [
        //"Xfr.Utils"
    ],
    alias: "store.xstore",
    config: {
        autoload: true,
        remoteData: true,
        preLoadedData: null,
        proxy: {
            /**
             *proxy type : "ajax", "rest", "jsonp"
             **/
            type: "ajax",
            url: null,
            api: {
                create: null,
                read: null,
                update: null,
                destroy: null
            },
            reader: {
                /**
                 *reader type : "json", "xml"
                 **/
                type: "json",
                rootProperty: "data",
                successProperty: "success",
                successValues: [true, "true"],
                messageProperty: "message",
                totalProperty: "total",
                summaryProperty: "summary"
            },
            extraParams: {},
            limitParam: "limit",
            startParam: "start",
            pageParam: "page",
            searchParam: "query"
        },
        params: {},
        pageSize: 10,
        searchValue:"",
        data: [],
        localData:[],
        listeners: {
            /**
             *Fires whenever records have been loaded into the store
             * load(this, records,successful);
             */
            "load": Ext.emptyFn,
            /**
             *Fires before load
             * beforeload(this);
             */
            "beforeload": Ext.emptyFn
        }
    },
    isLoading: false,
    currentPage: 1,
    totalCount: 0,
    pageCount: 0,
    summary: null,
    rawData: [],
    rawCollection: null,
    searchValue: "",
    /**
     * @method constructor
     * @param  {Object} config Configuration
     * @return {Object}
     */
    constructor: function (config) {
        var me = this;
        this.initConfig(config);

        this.callParent(arguments);

        // console.log("in store getAutoload() = " + this.getAutoload());

        if (this.getRemoteData()) {
            if (this.getAutoload()) {
                // console.log("autoload Store ------");
                this.loadPage(1);
            }
        } else {
            //me.rawData = Ext.clone(me.getData());
            me.rawData = me.getData();
            me.rawCollection = new Ext.util.MixedCollection();
            me.rawCollection.addAll(this.getData());
        }
    },
    getTotalCount: function () {
        return this.totalCount;
    },
    getSummary: function () {
        return this.summary;
    },
    getCurrentPage: function () {
        return this.currentPage;
    },
    getPageCount: function () {
        var me = this;

        me.pageCount = parseInt(me.getTotalCount() / me.getPageSize());
        if (me.getTotalCount() % me.getPageSize() > 0) {
            me.pageCount++;
        }
        return this.pageCount;
    },
    load: function () {
        var me = this;
        me.loadPage();
    },
    loadPage: function (page, preLoadedData) {
        var me = this,
                pageSize = me.getPageSize(),
                proxy = me.getProxy();


        if (Ext.isEmpty(page)) {
            page = me.currentPage;
        } else {
            me.currentPage = page;
        }



        var pageParam = proxy.pageParam,
                startParam = proxy.startParam,
                limitParam = proxy.limitParam,
                searchParam = proxy.searchParam;

        var options = {};
        options[pageParam] = page;
        options[startParam] = (page - 1) * pageSize;
        options[limitParam] = pageSize;
        options[searchParam] = me.getSearchValue();

        me.loadStore(options, preLoadedData);
    },
    /**
     * Loads the first 'page' in the current data set.
     */
    firstPage: function () {
        this.loadPage(1);
    },
    /**
     * Loads the last 'page' in the current data set.
     */
    lastPage: function () {
        // console.log("---------------pageCount = " + this.getPageCount());
        this.loadPage(this.getPageCount());
    },
    /**
     * Loads the next 'page' in the current data set.
     */
    nextPage: function () {
        this.loadPage(this.currentPage + 1);
    },
    /**
     * Loads the previous 'page' in the current data set.
     */
    previousPage: function () {
        this.loadPage(this.currentPage - 1);
    },
    exeApi: function (apiAction) {
        if (me.getRemoteData()) {

        }
    },
    loadStore: function (options, preLoadedData) {
        // console.log("load store-----------------");
        var me = this,
                proxy = me.getProxy();

        me.isLoading = true;

        if (me.getRemoteData()) {
            if (Ext.isEmpty(preLoadedData)) {
                if (!Ext.isEmpty(proxy.type) && proxy.type === "ajax") {
                    $.ajax({
                        url: proxy.url,
                        dataType: proxy.reader.type,
                        data: Ext.merge(me.getParams(), proxy.extraParams, options),
                        beforeSend: function () {
                            console.log("before Sent store request");
                            me.fireEvent('beforeload', me);
                        },
                        success: function (data) {
                            if ($.inArray(data[proxy.reader.successProperty], proxy.reader.successValues) !== -1) {
                                me.setData(data[proxy.reader.rootProperty]);
                                me.setLocalData(data[proxy.reader.rootProperty]);
                                me.totalCount = parseInt(data[proxy.reader.totalProperty]);
                                me.summary = data[proxy.reader.summaryProperty];


                                //console.log("in store count===============" + me.totalCount);
//                            var xdata = Ext.clone(data);
//                            delete xdata[proxy.reader.rootProperty];
//                            me.fireEvent('load', me, data[proxy.reader.rootProperty], data[proxy.reader.successProperty], xdata);

                            } else {
                                var titleSuccess="success";
                                if(typeof appConfig!='undefined' ){
                                    titleSuccess=appConfig.translations.success;
                                }
                                Xfr.Msg.show({
                                    title: titleSuccess,
                                    message: "An error occur during process ..." + data[proxy.reader.messageProperty],
                                    icon: Xfr.Msg.SUCCESS
                                });
                                //alert("An error occur during process ..." + data[proxy.reader.messageProperty]);
                            }
                            var xdata = Ext.clone(data);
                            delete xdata[proxy.reader.rootProperty];
                            me.fireEvent('load', me, data[proxy.reader.rootProperty], data[proxy.reader.successProperty], xdata);

                            me.isLoading = false;
                        },
                        error: function (data) {
                            var titleError="success";
                            if(typeof appConfig!='undefined' ){
                                titleError=appConfig.translations.error;
                            }

                            Xfr.Msg.show({
                                title: titleError,//appConfig.translations.error,
                                message: "An error occur on server",
                                icon: Xfr.Msg.ERROR
                            });
                            //alert("An error occur on server = ");
                            //
                            // console.log(data);
                        }
                    });
                }
                else{
                    me.fireEvent('beforeload', me);
                    me.onLoadStoreSuccess(preLoadedData);
                }
            }

        } else {
            //local data
            var data = [],
                    start = parseInt(options[proxy.startParam]),
                    limit = parseInt(options[proxy.limitParam]),
                    tempArray = me.rawData,
                    index = start,
                    max = index + limit,
                    continueLoop = true;

            /*console.log("load page ");
             console.log("otherParams");
             console.log(otherParams);
             console.log("start = " + start + "  limit = " + limit);
             console.log("tempArray");
             console.log(tempArray);*/

            /*console.log("-------limit = " + limit);*/
            while (continueLoop && max > index) {
                if (!Ext.isEmpty(tempArray[index])) {
                    data.push(tempArray[index]);
                } else {
                    continueLoop = false;
                }
                index++;
            }

            me.setData(data);
            me.setLocalData(data);
            me.totalCount = me.rawData.length;

            /*console.log("totalCount = " + me.totalCount);
             console.log("data");
             console.log(me.getData());*/

            me.fireEvent('load', me, data, true);
        }
    },
    searchInObject: function(obj, searchValue){
        var me=this;
        var found=false;
        for(key in obj) {
            var prop=obj[key];
            if(typeof prop === 'object'){
                found=me.searchInObject(prop, searchValue);
                if(found){
                    return found;
                }
            }
            else if(typeof prop ==='string'){
                if(prop.toLowerCase().indexOf(searchValue.toLowerCase())!=-1) {
                    return true;
                }
            }

        }
        return false;
    },
    filterCollectionByQuery: function (searchValue, searchLocal) {
        var me = this;
        me.setSearchValue(searchValue);

        if(searchLocal){

            console.log("Searching locally");
            var localdata=me.getLocalData();
            var results=[];
            //for
            console.log("Local data");
            console.log(localdata);
            for(var i=0; i<localdata.length; i++) {
                var found=me.searchInObject(localdata[i], searchValue);
                if(found){
                    results.push(localdata[i]);
                }
            }
            me.setData(results);
            me.totalCount = me.rawData.length;

            /*console.log("totalCount = " + me.totalCount);
             console.log("data");
             console.log(me.getData());*/

            me.fireEvent('load', me, results, true);
        }
        else{
            if (!me.getRemoteData()) {
                me.rawData = Xfr.Utils.filterCollection(me.rawCollection, searchValue);
            } else {

            }
            me.load();
        }

    }
});


////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.Window
 * 
 */
Ext.define("Xfr.panel.Window", {
    alternateClassName: "Xfr.Window",
    requires: [],
    extend: 'Xfr.Component',
    config: {},
    initialize: function() {
        var me = this,
            items = me.getItems();

        me.setConfig({
            items: []
        });

        this.callParent();

        $("#" + this.getId() + " .xfr-mask").modal({
            keyboard: false,
            show: false,
            backdrop: 'static'
        });

        $("#" + this.getId() + " .xfr-mask").on('shown.bs.modal', function() {
            $("body").css({
                "padding": "0px"
            });

            //init items without managing afterrender listener            
            me.initItems(items, false);

        });

        $("#" + this.getId() + " .xfr-mask").on('hidden.bs.modal', function() {
            console.log("hidding modal");
            me.destroy();

        });

    },
    show: function() {
        $("#" + this.getId() + " .xfr-mask").modal('show');
    },
    hide: function() {
        $("#" + this.getId() + " .xfr-mask").modal('hide');
    },
    setInfos: function(infos) {
            for (var key in infos) {
                $("[data-" + $.trim(key) + "]", this.$this).text(infos[key]);
            }
        }
        //    ,
        //    statics: {
        //        instance: null,
        //        init: function (title, message) {
        //            if (Ext.isEmpty(this.instance)) {
        //                this.instance = Ext.create("Xfr.panel.Window", {
        //                    size: "auto",
        //                    title: title,
        //                    message: message,
        //                    renderTo: document.body
        //                });
        //            }
        //        },
        //        show: function (title, message) {
        //            if (Ext.isEmpty(message)) {
        //                message = "";
        //            }
        //            if (Ext.isEmpty(title)) {
        //                title = "";
        //            }
        //            if (Ext.isEmpty(this.instance)) {
        //                this.init(title, message);
        //            } else {
        //                this.instance.setInfos({
        //                    title: title,
        //                    message: message
        //                });
        //            }
        //            this.instance.show();
        //        },
        //        alert: function (title, message) {
        //            this.show(title, message);
        //        },
        //        hide: function () {
        //            if (!Ext.isEmpty(this.instance)) {
        //                this.instance.hide();
        //            }
        //        }
        //    }
});

////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.Grid
 * 
 */
Ext.define("Xfr.panel.Grid", {
    requires: [
        //"Xfr.data.Store"
    ],
    extend: 'Xfr.Component',
    xtype: 'xgrid',
    config: {
        store: null,
        data: [],
        /**
         * extended data
         * @type {Object}
         */
        xdata: {},
        /**
         * the grid layout type  : standard, custom, thumbnail
         */
        type: "standard",
        // listeners: {
        //     afterrendertpl: Ext.emptyFn
        //     // afterrendertpl: {
        //     //     fn: "onAfterRenderTpl"
        //     // }
        // },
        selectStyle: "single",
        listeners: {
            /**
             *Fires after a record is selected
             * select(me, selectedIndex, selectedRecord, selectedIndexes, selectedRecords)
             */
            "select": Ext.emptyFn,
            "afterrendertpl": Ext.emptyFn
        },
        maskOnLoad: true,
        templateHelpers:{}
    },
    selectedIndexes: [],
    initialize: function() {
        //console.log("start initialize-------------------");
        var me = this;

        //init store from config
        if (!Xfr.isXfrInstance(me.getStore())) {
            me.setStore(Xfr.getInstance(me.getStore(), "store"));
        }

        me.on({
            "afterrendertpl": {
                scope: me,
                fn: "onAfterRenderTpl"
            }
        });

        this.callParent(arguments);

        var store = this.getStore();

        store.on({
            "load": {
                scope: me,
                fn: "onStoreLoaded"
            },
            "beforeload": {
                scope: me,
                fn: "onBeforeStoreLoad"
            }
        });


        // //init colmunsize for standard grid
        // if (me.getType() === "standard") {
        //     me.initColumnSize();
        //     me.checkResponsiveColumns();
        // }

        // //init colmunsize for standard grid
        me.initColumnSize();

        // //init data from store
        // me.initData();
        // console.log("end initialize-------------------");
    },
    onAfterRenderTpl: function() {
         //console.log("start onAfterRenderTpl-------------------");
        var me = this;

        // if (me.getMaskOnLoad()) {
        //     if (!me.isMasked) {
        //         me.mask();
        //     }
        // }

        // if (me.getType() === "standard") {
        //     me.checkResponsiveColumns();
        //     // $(window).resize(function(event) {
        //     //     me.checkResponsiveColumns();
        //     // });
        // }

        //me.initColumnSize();
        // me.initAllSize();
        // 
        // if (me.getType() === "standard") {
        //     me.initColumnSize();
        //     me.checkResponsiveColumns();
        // }

        var store = this.getStore();

        if (store.isLoading) {
            if (!me.isMasked) {
                me.mask();
            }
        }



        //init data from store
        me.initData(store, {});

        if (store.getRemoteData()) {
            if (!store.getAutoload() && !store.isLoading) {            
                if (!Ext.isEmpty(store.getPreLoadedData())) {
                    store.loadPage(1, store.getPreLoadedData());
                    me.initData(store, {});                    
                }
            }
        }




        // if (!store.getAutoload()) {
        //     if (me.getMaskOnLoad()) {
        //         me.mask();
        //     }
        //     store.loadPage(1);
        // }
        // 
        // 
        // console.log("end onAfterRenderTpl-------------------");
        //
        //
    },
    initData: function(store, xdata) {
        console.log("XDATA");
        console.log(xdata);
        console.log('Données store: ');
        console.log(store.getData());
        var me = this,
            storeData = store.getData();
        
        // me.mask();
        // if (!store.getAutoload()) {
        //     store.loadPage(1);
        // }

        me.setData(storeData);
        me.setXdata(xdata);
        me.binder.set("xdata", xdata);
        me.binder.set('baseUrl', baseUrl);

        console.log("template helper");
        console.log(me.getTemplateHelpers());

        me.binder.set('helpers', me.getTemplateHelpers());

        //init colmunsize for standard grid
        if (me.getType() === "standard") {
            me.initColumnSize();
            me.checkResponsiveColumns();
        }

        me.initAllSize();

        me.initRowsEvents();

        me.selectedIndexes = [];
    },
    onBeforeStoreLoad: function(store, data, successful, xdata) {
        var me = this;
        if (!me.isMasked) {
            me.mask();
        }
    },
    onStoreLoaded: function(store, data, successful, xdata) {
        var me = this;

        if (me.isMasked) {
            me.unmask();
        }

        console.log("On store loaded");
        me.initData(store, xdata);
    },
    reload: function(resetPage) {
        var me = this,
            store = me.getStore();

        if (!Ext.isEmpty(store)) {
            if (resetPage) {
                store.currentPage = 1;
            }
            store.load();
        }
    },
    initAllSize: function() {
        // console.log("init all size --------------");
        var me = this;

        if (me.getType() === "standard") {
            me.initColumnSize();
            me.checkResponsiveColumns();
        }

        this.callParent(arguments);
    },
    initVboxAvailable: function() {
        // console.log("init vbox available--------------");

        this.callParent(arguments);
        var me = this;

        var tableHeight = $("table", me.$this).data("available-height");
         //console.log("tableHeight = " + tableHeight);
        tableHeight = (Ext.isEmpty(tableHeight)) ? $("table", me.$this).height() : tableHeight;
        var tableHeadHeight = $("table thead>tr>th:first", me.$this).outerHeight(),
            tableFooterHeight = $("table tfoot>tr:first", me.$this).outerHeight();

        tableHeadHeight = Ext.isEmpty(tableHeadHeight) ? 0 : tableHeadHeight;
        tableFooterHeight = Ext.isEmpty(tableFooterHeight) ? 0 : tableFooterHeight;

         //console.log("----------------table height = " + tableHeight);
         //console.log("----------------table head height = " + tableHeadHeight);
         //console.log("----------------table foot height = " + tableFooterHeight);
        $("table tbody", me.$this).css("height", (tableHeight - tableHeadHeight - tableFooterHeight) + "px");
        console.log("calculated width in grid: "+ $("table", me.$this).parent(":first").width() + "px");
        //$("table", me.$this).css("width", $("table", me.$this).parent(":first").width() + "px");

    },
    getSelectedIndexes: function() {
        return this.selectedIndexes;
    },
    getSelectedDatas: function() {
        var me = this,
            data = [];
        //storeData = me.getStore().getData();

        $.each(me.selectedIndexes, function(index, item) {
            //data.push(storeData[item]);
            data.push(me.binder.get("data[" + index + "]"));
        });
        return data;
    },
    getDataAt: function(index) {
        var me = this;
        //storeData = me.getStore().getData();
        //return storeData[index];
        return me.binder.get("data[" + index + "]");
    },
    setDataAt: function(index, data) {
        var me = this;
        //storeData = me.getStore().getData();
        //return storeData[index];
        me.binder.set("data[" + index + "]", data);
    },
    addRowData: function(data) {
        me.binder.push("data", data);
    },
    unselectAllRows: function() {
        var me = this;
        $("table tbody tr.selected", me.$this).removeClass("selected");
        me.selectedIndexes = [];
    },
    initRowsEvents: function() {
        var me = this;
        $("table tbody tr", me.$this).each(function(index, el) {
            if (Ext.isEmpty($(el).attr("data-event-click"))) {
                $(el).click(function(event) {

                    $(this).attr("data-event-click", true);

                    // if ($(this).hasClass('overflow') && me.getType() === "standard") {
                    //     //console.log("click on tr;overflow");
                    //     if (Ext.isEmpty($(this).attr("data-has-child"))) {
                    //         $('<tr class="child"><td> ' + me.getHiddenColumnList($(this)) + ' </td></tr>').insertAfter($(this));
                    //         $(this).attr("data-has-child", true);
                    //         $("td:not(.hidden):first span.icon-plus-minus", $(this)).removeClass('icon-plus2').addClass("icon-minus2");
                    //     } else {
                    //         $(this).removeAttr('data-has-child');
                    //         $(this).find("+tr.child:first").remove();
                    //         $("td:not(.hidden):first span.icon-plus-minus", $(this)).removeClass('icon-minus2').addClass("icon-plus2");
                    //     }
                    // }

                    //console.log("click on tr");
                    if (me.getSelectStyle() === "single") {
                        $("table tbody tr.selected", me.$this).not($(this)).removeClass('selected');
                        if (!$(this).hasClass("selected")) {
                            $(this).addClass("selected")
                        }
                    } else {
                        $(this).toggleClass('selected');
                    }

                    var index = $("table tbody tr", me.$this).index($(this));

                    if ($(this).hasClass('selected')) {
                        if (!Ext.Array.contains(me.selectedIndexes, index)) {
                            me.selectedIndexes.push(index);
                        }
                        me.fireEvent('select', me, index, me.getDataAt(index), me.selectedIndexes, me.getSelectedDatas());
                    } else {
                        Ext.Array.remove(me.selectedIndexes, index);
                    }

                });
            }
        });

        $("table tbody tr span.icon-plus-minus", me.$this).each(function(index, el) {
            if (Ext.isEmpty($(el).attr("data-event-click"))) {
                $(el).click(function(event) {

                    $(this).attr("data-event-click", true);

                    var trParent = $(this).parents("tr:first");
                    if (trParent.hasClass('overflow') && me.getType() === "standard") {
                        //console.log("click on tr;overflow");
                        if (Ext.isEmpty(trParent.attr("data-has-child"))) {
                            $('<tr class="child"><td> ' + me.getHiddenColumnList(trParent) + ' </td></tr>').insertAfter(trParent);
                            trParent.attr("data-has-child", true);
                            $("td:not(.hidden):first span.icon-plus-minus", trParent).removeClass('icon-plus2').addClass("icon-minus2");
                        } else {
                            trParent.removeAttr('data-has-child');
                            trParent.find("+tr.child:first").remove();
                            $("td:not(.hidden):first span.icon-plus-minus", trParent).removeClass('icon-minus2').addClass("icon-plus2");
                        }
                    }

                });
            }
        });
    },
    initColumnSize: function() {
         console.log("initColumnSize-----------");
        var me = this;
        console.log("Grid type:  "+ me.getType());
        if (me.getType() === "standard") {
            console.log("Standard table");
            var sum = 0;
            me.$this.find("table>thead>tr th:not(.hidden)").each(function(index, columnElt) {
                console.log("Calculating number of columns");
                var columnFlex = $(columnElt).data("flex");

                if (Ext.isEmpty(columnFlex)) {
                    columnFlex = 1;
                } else {
                    columnFlex = new String(columnFlex);
                    columnFlex = parseFloat(columnFlex.replace(/\s/g, "").replace(",", "."));
                }
                sum += columnFlex;
            });
            console.log("Nombre de colonne " + sum);
            me.$this.find("table>thead>tr th:not(.hidden),table>tbody tr td:not(.hidden)").each(function(index, columnElt) {
                console.log("initializing columns");
                var columnFlex = $(columnElt).data("flex");
                if (Ext.isEmpty(columnFlex)) {
                    columnFlex = 1;
                } else {
                    columnFlex = new String(columnFlex);
                    columnFlex = parseFloat(columnFlex.replace(/\s/g, "").replace(",", "."));
                }
                $(columnElt).css({
                    width: ((columnFlex / sum) * 100) + "%"
                });
            });

            me.$this.find("table>tbody tr:not(.child)").each(function(index, trElt) {
                var maxHeight = 0;
                $("td:not(.hidden)", $(trElt)).each(function(index, columnElt) {
                    var columnHeight = parseInt($(columnElt).outerHeight());
                    //var columnHeight = $(columnElt).height();
                    if (columnHeight > maxHeight) {
                        maxHeight = columnHeight;
                    }
                });
                if (maxHeight > 0) {
                    $("td:not(.hidden)", $(trElt)).css("height", maxHeight + "px");
                }
            });


        }
        else{
            console.log("Not standard table");
        }
    },
    checkResponsiveColumns: function() {
        var me = this;
        me.restoreOverFlowColumns();
        me.hideOverFlowColumns();

        if ($("table thead>tr th.hidden", me.$this).length > 0) {

            $("table tbody tr", me.$this).each(function(index, el) {
                if (!$(el).hasClass('overflow')) {
                    $(el).addClass('overflow');
                    $("td:not(.hidden):first", $(el)).prepend('<span class="icon-plus-minus icon-plus2"></span>');
                }
            });

        } else {
            $("table tbody tr", me.$this).each(function(index, el) {
                if ($(el).hasClass('overflow')) {
                    $(el).removeClass('overflow');
                    $("td:not(.hidden):first", $(el)).find("span.icon-plus-minus").remove();
                }
            });
        }
    },
    hideOverFlowColumns: function() {
        var me = this;
        if (me.hideOverFlowColumn()) {
            me.hideOverFlowColumns();
        }
    },
    hideOverFlowColumn: function() {
        var me = this,
            vScrollVisible = $("table tbody", me.$this).get(0).scrollHeight > $("table tbody", me.$this).innerHeight(),
            wTbody = $("table tbody", me.$this).innerWidth(),
            swTbody = $("table tbody", me.$this).get(0).scrollWidth + ((vScrollVisible) ? 17 : 0),
            colCount = $("table thead>tr th:not(.hidden)", me.$this).length,
            firstTh = $("table thead>tr th:nth(0)", me.$this),
            secondTh = $("table thead>tr th:nth(1)", me.$this),
            diff = secondTh.offset().left - firstTh.offset().left,
            minColumDistance = 160;

        //console.log("vscrollVIsible = " + ((vScrollVisible) ? 17 : 0) + " tbody width = " + wTbody + "  scrollWidth =" + swTbody + "  diff = " + diff);

        if (colCount > 1) {
            if (swTbody > wTbody || diff < minColumDistance) {
                var lastHiddenThEl = $("table thead>tr th:not(.hidden):last", me.$this);
                lastHiddenThEl.css({
                    "display": "none",
                    "width": "0px"
                }).addClass('hidden');

                $("table tbody tr", me.$this).each(function(index, el) {
                    var lastHiddenTdEl = $("td:not(.hidden):last", $(el));

                    lastHiddenTdEl.css({
                        "display": "none",
                        "width": "0px"
                    }).addClass('hidden');
                });

                me.initColumnSize();
                return true;
            }
        }
        return false;
    },
    restoreOverFlowColumns: function() {
        var me = this;
        if (me.restoreOverFlowColumn()) {
            me.restoreOverFlowColumns();
        }
    },
    restoreOverFlowColumn: function() {
        var me = this;
        var hiddenColCount = $("table thead>tr th.hidden", me.$this).length;


        if (hiddenColCount > 0) {
            var firstHiddenTh = $("table thead>tr th.hidden:first", me.$this);
            firstHiddenTh.css({
                "display": "table-cell"
            }).removeClass('hidden').removeAttr('data-overflow-width');
            $("table tbody tr", me.$this).each(function(index, el) {
                $("td.hidden:first", $(el)).css({
                    "display": "table-cell"
                }).removeClass('hidden').removeAttr('data-overflow-width');
            });
            me.initColumnSize();
            return true;
        }
        return false;
    },
    getHiddenColumnList: function(rowEl) {
        var me = this,
            listHtml = "";

        $("td.hidden", rowEl).each(function(index, el) {
            var label = "",
                val = "",
                col = 0;

            col = $("td", rowEl).index($(el));
            label = $("table thead tr th:nth(" + col + ")", me.$this).text();
            val = $(el).text();
            listHtml += '<li> <label>' + label + ' : </label><span class="val">' + val + '</span>  </li>';
        });
        listHtml = "<ul>" + listHtml + "</ul>";
        return listHtml;
    },
    mask: function() {
        if (this.getMaskOnLoad()) {
            this.callParent(arguments);
        }
    },
    unmask: function() {
        if (this.getMaskOnLoad()) {
            this.callParent(arguments);
        }
    },
    destroy: function() {
        this.getStore().destroy();
        this.callParent(arguments);
    }
});

Ext.define("Xfr.panel.WindowGrid", {
    extend: "Xfr.panel.Grid",
    requires: [
        //"Xfr.plugin.Pagination",
        //"Xfr.plugin.PagingSize",
        //"Xfr.plugin.GridSearch"
    ],
    config: {
        height: '100%',
        plugins: [
            {
                xtype: "pagination",
                showSummary: true,
                summaryClass: "Xfr.plugin.Summary"
            },
            {
                xtype: "pagingsize",
                position: "[data-table-page-size]"
            }, {
                xtype: "gridsearch",
                position: "[data-table-form-search]"
            }
        ]
    },
    constructor: function (config) {

        Ext.apply(config, {
            type: "standard",
            store: Ext.create("Xfr.data.Store", {
                proxy: {
                    url: config.urlPath,
                    reader: {
                        totalProperty: "recordsFiltered"
                    },
                    limitParam: "length",
                    startParam: "start",
                    searchParam: "search[value]"
                },
                pageSize: 10
            })
        });
        this.callParent(arguments);
    }, onStoreLoaded: function (store, data, successful) {
        this.callParent(arguments);
        var me = this;
        var btn = $("[grid-box-btn-save]");
        var msg = $("[grid-box-norecord-msg]");
        var storeData = store.getData();
        if (storeData.length > 0) {
            msg.hide();
            btn.show();
            btn.on("click", function (event) {
                me.config.action();
            });
        }
        else {
            msg.show();
            btn.hide();
        }
    }
});

////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.RemoteWindow
 * 
 */
Ext.define("Xfr.panel.RemoteWindow", {
    alternateClassName: "Xfr.RemoteWindow",
    requires: [
    ],
    extend: 'Xfr.panel.Window',
    config: {
        title: "",
        remoteUrl: ""
    },
    initialize: function () {
        this.callParent(arguments);        
        
        var loadingPanel = $(".xfr-mask-loading", this.$this);
        $("iframe", this.$this).on("load", function () {
            loadingPanel.hide();
            $(this).show();
        });
    },
    statics: {
        instance: null,
        init: function (title, remoteUrl, size) {
            if (!Ext.isEmpty(this.instance)) {
                this.instance.destroy();
            }
            
            if(Ext.isEmpty(size)){
                size = "large";
            }
            this.instance = Ext.create("Xfr.panel.RemoteWindow", {
                size: size,
                title: title,
                remoteUrl: remoteUrl,
                renderTo: document.body
            });
        },
        show: function (title, remoteUrl, size) {
            this.init(title, remoteUrl, size);
            this.instance.show();
        },
        alert: function (title, remoteUrl) {
            this.show(title, remoteUrl);
        },
        hide: function () {
            if (!Ext.isEmpty(this.instance)) {
                this.instance.hide();
            }
        }
    }
});


////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.MessageBox
 * 
 */
Ext.define("Xfr.panel.MessageBox", {
    alternateClassName: "Xfr.Msg",
    requires: [
    ],
    extend: 'Xfr.panel.Window',
    config: {
    },
    statics: {
        instance: null,
        window: null,
        init: function (msgConfig) {
            //if (Ext.isEmpty(this.instance)) {
                msgConfig.size = "auto";
                msgConfig.renderTo = document.body;
                this.instance = Ext.create("Xfr.panel.MessageBox", msgConfig);
            //}
        },
        show: function (msgConfig) {
            if (!Ext.isEmpty(this.window)) {
                this.window.unbind('click');
            }
            if (Ext.isEmpty(msgConfig)) {
                msgConfig = {
                    message: "",
                    title: "",
                    icon: Xfr.Msg.NOTIFICATION.iconClass,
                    btn: [{text: Xfr.Msg.OK.text}]
                };
            }
            else {
                if (Ext.isEmpty(msgConfig.message)) {
                    msgConfig.message = "";
                }
                if (Ext.isEmpty(msgConfig.title)) {
                    msgConfig.title = "";
                }
                if (Ext.isEmpty(msgConfig.icon)) {
                    msgConfig.icon = Xfr.Msg.NOTIFICATION.iconClass;
                }
                else {
                    msgConfig.icon.type === 'icon' ? msgConfig.icon = msgConfig.icon.iconClass : msgConfig.icon = Xfr.Msg.NOTIFICATION.iconClass;
                }
                if (Ext.isEmpty(msgConfig.btn)) {
                    msgConfig.btn = [{text: Xfr.Msg.OK.text}];
                }
                else {
                    var btns = [];
                    msgConfig.btn.constructor === Array ? btns = msgConfig.btn : btns.push(msgConfig.btn);
                    msgConfig.btn = [];
                    for (var i = 0; i < btns.length; i++) {
                        btns[i].type === 'btn' ? msgConfig.btn.push({text: btns[i].text}) : msgConfig.btn.push({text: Xfr.Msg.OK.text});
                    }
                }
            }
            if (!Ext.isEmpty(this.instance)) {
                this.instance.destroy();
            }
            this.init(msgConfig);
            this.window = $('#message-window');
            if (!Ext.isEmpty(msgConfig.action)) {
                this.setAction(msgConfig.action);
                delete msgConfig.action;
            }
            this.instance.show();

        },
        alert: function (titleArg, messageArg) {
            var msgConfig = {
                icon  : Xfr.Msg.SUCCESS,
                title: titleArg,
                message: messageArg
            };
            this.show(msgConfig);
        },
        hide: function () {
            if (!Ext.isEmpty(this.instance)) {
                this.instance.hide();
            }
        },
        setAction: function (action) {
            this.window.click(function (e) {
                var btn = $(e.target);
                var text = btn.attr('btn-text');
                if (text) {
                    action(text);
                }
            });
        },
        SUCCESS: {
            type: 'icon',
            iconClass: 'fa fa-check-circle fa-5x xfr-inner-msg-icon-green'
        },
        WARNING: {
            type: 'icon',
            // iconClass: 'icon-warning xfr-inner-msg-icon-yellow'
            iconClass: 'icon-spam xfr-inner-msg-icon-yellow'
        },
        NOTIFICATION: {
            type: 'icon',
            // iconClass: 'icon-notification xfr-inner-msg-icon-blue'
            iconClass: 'icon-new xfr-inner-msg-icon-blue'
        },
        QUESTION: {
            type: 'icon',
            iconClass: 'icon-help xfr-inner-msg-icon-green'
        },
        INFO: {
            type: 'icon',
            //iconClass: 'icon-info xfr-inner-msg-icon-blue'
            iconClass: 'icon-info4 xfr-inner-msg-icon-blue'
        },
        ERROR: {
            type: 'icon',
            // iconClass: 'icon-spam xfr-inner-msg-icon-red'
            iconClass: 'fa fa-ban fa-5x xfr-inner-msg-icon-red'
        },
        YES: {
            type: 'btn',
            text: 'yes'
        },
        NO: {
            type: 'btn',
            text: 'no'
        },
        CANCEL: {
            type: 'btn',
            text: 'cancel'
        },
        OK: {
            type: 'btn',
            text: 'ok'
        }
    }
});


////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.Mask
 * 
 */
Ext.define("Xfr.panel.Mask", {
    alternateClassName: "Xfr.Mask",
    requires: [],
    statics: {
        show: function(label, opt, selector) {
            console.log("showing mask");
            if (Ext.isEmpty(opt)) {
                opt = {};
            }
            if (Ext.isEmpty(opt.size)) {
                opt.size = 64;
            }
            if (Ext.isEmpty(opt.backgroundColor)) {
                opt.backgroundColor = "black";
            }

            if(selector && selector!=undefined && selector!=""){
                console.log("showing mask - selector " + selector);
                $(selector).mask(label, opt);
            }
            else{
                console.log("showing mask - body");
                $("body").mask(label, opt);
            }
            //$("body").mask(label, opt);
        },
        hide: function() {
            $("body").unmask();
        }
    }
});

////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.ListCrudPanel
 * 
 */
Ext.define("Xfr.panel.ListCrudPanel", {
    extend: "Xfr.Component",
    requires: [
        //"Xfr.plugin.Pagination",
        //"Xfr.plugin.PagingSize",
        //"Xfr.plugin.GridSearch",
        //"Xfr.plugin.Multiselect",
        //"Xfr.plugin.AddNewElement"
    ],
    config: {
        cls: "xfr-list-crud-panel",
        dynamicTplClass: "Xfr.panel.ListCrudPanel",
        canAddNew: false,
        canEdit: false,
        canAddExist: true,
        searchArea: false,
        canDeleteCrud: false,
        form: null,
        grid: null,
        plugins: [],
        entityName: '',
        placeHolder: '',
        urlPathGrid: '',
        urlPathSelect: '',
        urlActionSelect: '',
        urlRemoveGrid: '',
        urlEditGrid: '',
        urlAddNew: '',
        multiselect: null
    },
    toolbarAction: "",
    property: '',
    id: '',
    customParams: '',
    initialize: function() {
        var me = this;
        this.innitPlugins();

        this.callParent(arguments);

        this.innitCustomParams();

        if (this.getCanAddNew() || this.getCanEdit()) {
            this.innitForm();
        }

        this.innitGrid();

        $("[data-button-back]", me.$this).click(function() {
            me.clickOnBackButton();
        });
        $("[data-button-save]", me.$this).click(function() {
            me.clickOnSaveButton();
        });

        $("[data-form-tab]", me.$this).hide();

    },
    clickOnBackButton: function() {
        this.closeForm();
    },
    clickOnSaveButton: function() {
        var me = this,
            formCmp = me.getForm(),
            form = $("form:first", formCmp.$this);

        form.submit();
    },
    innitCustomParams: function() {
        var me = this;
        $("span[data-span-additionals]").each(function(index, span) {
            var property = $(this).attr("data-xfr-params-add-name");
            var value = $(this).attr("data-xfr-params-add-value");
            if (value === undefined) {
                value = me.config.relatedData.id;
            }
            if (me.customParams.length > 0) {
                me.customParams = me.customParams + "&";
            }
            me.customParams = me.customParams + "" + property + "=" + value;
        });
    },
    innitGrid: function() {
        var me = this;
        var positions = $('[data-xfr-list-grid-container]');
        var position = positions[0];

        var pluginsItems = [{
            xtype: "pagination",
            position: "[data-table-paging]"
        }, {
            xtype: "pagingsize",
            position: "[data-table-page-size]"
        }, {
            xtype: "gridsearch",
            position: "[data-table-form-search]"
        }];

        var gridConfig = Ext.apply(this.getGrid(), {
            renderTo: position,
            maskOnLoad: false,
            height: '100%',
            width: '100%',
            plugins: pluginsItems,
            type: "standard",
            store: Ext.create("Xfr.data.Store", {
                //xtype: "xstore",
                //autoload: false,
                proxy: {
                    url: Routing.generate(this.getUrlPathGrid(), {
                        _locale: appConfig.locale
                    }) + "?id=" + this.config.relatedData.id + "&" + this.customParams,
                    reader: {
                        totalProperty: "recordsFiltered"
                    },
                    limitParam: "length",
                    startParam: "start",
                    searchParam: "search[value]"
                },
                pageSize: 10
            })
        });

        this.setGrid(Ext.create("Xfr.panel.Grid", gridConfig));

        var grid = me.getGrid();

        grid.getStore().on({
            load: {
                scope: me,
                fn: "onStoreLoaded"
            },
            beforeload: {
                scope: me,
                fn: "beforeLoadStore"
            }
        });

        me.mask();
    },
    beforeLoadStore: function() {
        var me = this;
        // var grid = me.getGrid();
        //alert("before load store");
        me.mask();
    },
    onStoreLoaded: function() {
        //alert("onStoreLoaded");
        var me = this;
        me.innitGridActions();
        me.unmask();
        // var grid = me.getGrid();
        // grid.unmask();
    },
    reloadGrid: function() {
        this.getGrid().reload();
    },
    innitGridActions: function() {
        var me = this;
        if (this.getCanEdit() === false) {
            $("button[data-table-button-edit]").each(function(index, button) {
                $(button).hide();
            });
        } else {
            $("button[data-table-button-edit]").each(function(index, button) {
                $(button).click(function() {
                    var i = $(this).attr("data-edit-id");
                    me.property = $(this).attr("data-edit-property");
                    me.id = i;
                    me.onEditClick(i);
                });
            });
        }
        $("button[data-table-button-delete]").each(function(index, button) {

            $(button).click(function() {
                var id = $(this).attr("data-delete-id");
                var property = $(this).attr("data-delete-property");
                me.onDeleteClick(id, property);
            });
        });
    },
    onDeleteClick: function(id, property) {
        var me = this;
        //Xfr.Mask.show("Opération encours ...");
        me.mask(appConfig.translations.operationInProgress);


        var del = '';
        if (me.getCanDeleteCrud()) {
            del = '&delete=true';
        }
        $.ajax({
            url: Routing.generate(me.getUrlRemoveGrid(), {
                _locale: appConfig.locale
            }) + '?id=' + me.config.relatedData.id + '&' + property + "=" + id + del + "&" + me.customParams,
            type: "POST",
            success: function(data, textStatus, jqXHR) {
                //Xfr.Mask.hide();
                me.unmask();
                var response = JSON.parse(data);
                if (response.success) {
                    Xfr.Msg.show({
                        title: appConfig.translations.success,
                        message: response.message,
                        icon: Xfr.Msg.SUCCESS,
                        action: function(btn) {
                            if (btn === Xfr.Msg.OK.text) {
                                me.reloadGrid();
                            }
                        }
                    });
                } else {
                    Xfr.Msg.show({
                        title: appConfig.translations.error,
                        message: response.message,
                        icon: Xfr.Msg.ERROR
                    });
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // Xfr.Mask.hide();
                me.unmask();
                Xfr.Msg.show({
                    title: appConfig.translations.error,
                    message: appConfig.translations.serverError,
                    icon: Xfr.Msg.ERROR
                });
            }
        });
    },
    innitPlugins: function() {
        var me = this;

        if (this.config.canAddExist) {
            this.config.plugins.push(
                Ext.merge(me.getMultiselect(), {
                    xtype: "multiselect",
                    position: "[data-multiselect-pos]"
                })
            );
        }

        if (this.config.canAddNew) {
            this.config.plugins.push({
                xtype: "addnewelement",
                position: "[data-add-new-pos]"
            });
        }
    },
    innitForm: function() {
        var me = this;
        var classname = me.getForm().className;
        var formConfig = Ext.apply(me.getForm(), {
            height: "100%",
            padding: "10px 20px",
            slimscroll: {
                height: '100%',
                alwaysVisible: true,
                color: "#004826"
            },
            renderTo: $("[data-xfr-list-form-container]")[0],
            listeners: {
                "afterrendertpl": {
                    scope: me,
                    fn: "afterRenderForm"
                },
                "formsubmit": {
                    scope: me,
                    fn: "onFormSubmit"
                }
            }
        });
        this.setForm(Ext.create(classname, formConfig));

    },
    afterRenderForm: function() {
        console.log("after render form");
        var me = this,
            formCmp = me.getForm(),
            form = $("form:first", formCmp.$this);

        console.log(formCmp);
        console.log(form);

        form.find("button[data-xfr-btn-create]").parent().remove();
    },
    onFormSubmit: function() {
        var me = this;
        if (me.toolbarAction === "create") {
            me.createAction();

        } else if (me.toolbarAction === "edit") {
            me.updateAction();
        }
    },
    createAction: function() {
        var me = this;

        // Xfr.Mask.show("Waiting Create Operation ...");
        me.mask("Waiting Create Operation ...");

        me.fireEvent('beforecreate', me);

        //var formData = new FormData(me.getForm().$form[0]);
        //var formData = me.getForm().getData();
        var formData = me.getForm().getFormData();

        // console.log("create action ------------");
        // console.log(formData);

        $.ajax({
            url: Routing.generate(me.getUrlAddNew(), {
                _locale: appConfig.locale
            }) + "?" + me.customParams,
            type: "POST",
            data: formData,
            success: function(data) {
                // Xfr.Mask.hide();
                me.unmask();
                var response = JSON.parse(data);
                if (response.success) {
                    me.closeForm();
                    // me.table.row.add(data.data).draw();
                    //me.getGrid().setDataAt(me.selectedGridIndex, data.data);
                    me.getGrid().reload();

                    Xfr.Msg.alert(appConfig.translations.success, response.message);
                } else {
                    Xfr.Msg.show({
                        title: appConfig.translations.error,
                        message: response.message,
                        icon: Xfr.Msg.ERROR
                    });
                }
            },
            error: function() {
                // Xfr.Mask.hide();
                me.unmask();
                Xfr.Msg.show({
                    title: appConfig.translations.error,
                    message: appConfig.translations.serverError,
                    icon: Xfr.Msg.ERROR
                });
            }

        });
    },
    updateAction: function() {
        var me = this;

        me.fireEvent('beforeupdate', me);

        // Xfr.Mask.show("Waiting Update Operation ...");
        me.mask(appConfig.translations.operationInProgress);

        //var formData = new FormData(me.getForm().$form[0]);
        //var formData = me.getForm().getData();
        var formData = me.getForm().getFormData();

        console.log("update action ------------");
        console.log(formData);

        $.ajax({
            url: Routing.generate(me.getUrlEditGrid(), {
                _locale: appConfig.locale
            }) + '?' + me.property + "=" + me.id + "&" + me.customParams,
            data: formData,
            type: "POST",
            success: function(data) {
                // Xfr.Mask.hide();
                me.unmask();
                var response = JSON.parse(data);
                if (response.success) {
                    me.closeForm();
                    me.getGrid().reload();
                    Xfr.Msg.alert(appConfig.translations.success, response.message);
                } else {
                    Xfr.Msg.show({
                        title: appConfig.translations.error,
                        message:  response.message,
                        icon: Xfr.Msg.ERROR
                    });
                }
            },
            error: function() {
                //Xfr.Mask.hide();
                me.unmask();
                Xfr.Msg.show({
                    title: appConfig.translations.error,
                    message: appConfig.translations.serverError,
                    icon: Xfr.Msg.ERROR
                });
            }

        });

    },
    openForm: function() {
        var me = this;
        // $('[data-xfr-list-grid-container]').hide();
        // $('[data-xfr-list-form-container]').show();
        $('[data-grid-tab]', me.$this).hide();
        $('[data-form-tab]', me.$this).show();

        this.toolbarAction = "create";
    },
    closeForm: function() {
        var me = this;
        // $('[data-xfr-list-grid-container]').show();
        // $('[data-xfr-list-form-container]').hide();

        $('[data-form-tab]', me.$this).hide();
        $('[data-grid-tab]', me.$this).show();

        this.toolbarAction = "edit";
    },
    onEditClick: function(id) {
        id = parseInt(id);
        var grid = this.getGrid();
        var data = {};
        for (var i = 0; i < grid._data.length; i++) {
            if (grid._data[i].id === id) {
                data = grid._data[i];
            }

        }

        this.getForm().setData(data);
        this.getForm().setMode('edit');
        this.getForm().binder.set("mode", 'edit');
        this.openForm();
        this.toolbarAction = "edit";
    }
});

////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.GridPanel
 * 
 */
Ext.define("Xfr.panel.GridPanel", {
    extend: "Xfr.Component",
    requires: [],
    config: {
        //        cls: "xfr-crud-panel xfr-grid-panel",
        cls: "xfr-grid-panel",
        grid: null,
        data: null,
        //height: "100%"
    },
    gridInited: false,
    //formLoaded: false,    
    form: null,
    //mode: "read",
    //toolbarAction: "",
    //formData: null,
    // selectedTableRow: null,
    initialize: function () {

        this.callParent(arguments);
        var me = this;

        me.initForm();
        me.initGrid();
        me.initGridPanel();

    },
    initGrid: function () {
        var me = this;
      //  me.unmask();
        if (!Xfr.isXfrInstance(me.getGrid())) {
            var gridConfig = Ext.apply(me.getGrid(), {
                renderTo: $("[data-xfr-grid-container]", me.$this)[0],
                maskOnLoad: true
            });
            
//             console.log("init grid in gripanel.js");
//             console.log(gridConfig);

            me.setGrid(Xfr.createWidget(gridConfig));
        }
        
        var grid = me.getGrid();

       // me.getChildren().push(grid);

//         grid.on({
//             select: {
//                 scope: me,
//                 fn: "onGridSelect"
//             }
//         });

        grid.getStore().on({
            load: {
                scope: me,
                fn: "onStoreLoaded"
            },
            beforeload: {
                scope: me,
                fn: "beforeLoadStore"
            }
        });
        
        /////////////////////////
        $("button[data-btn-filter-action]:first", me.$this).click();
        
    },
    beforeLoadStore: function () {

        var me = this;
//        me.mask();
    },
    onStoreLoaded: function () {
        var me = this;
        me.gridInited = true;
        me.unmask();
    },
    initForm: function () {
        var me = this;

        var $formContainer = $("[data-xfr-form-container]", me.$this);
        var formContainerHeight = $formContainer.height();

        // if ($(".grid-filter", $formContainer).length === 1) {
        //     formContainerHeight -= $(".grid-filter", $formContainer).height();
        //     console.log("header 1 height  = " + $(".grid-filter", $formContainer).height());
        // }
        var filterToolbarHeight = $(".grid-filter", me.$this).outerHeight();
        // console.log('grid filter toolbar height = ' + filterToolbarHeight);

        formContainerHeight = formContainerHeight - filterToolbarHeight;
        var $filterFormContainer = $("[data-filter-form-container]", $formContainer);

        /*
        $(".form-with-filters", $formContainer)
                //$("[data-filter-form-container]", $formContainer)
                //.height(formContainerHeight - 20)
                .slimscroll({
                    //height: (formContainerHeight - filterToolbarHeight - 48)
                    height: (formContainerHeight)
                            //height : $(".form-with-filters", $formContainer).height() 
                });

*/
        var $form = $("form", $formContainer);
        $("button[data-xfr-btn-reset]", $formContainer).on("click", function () {

            if (!Ext.isEmpty(me.filterFormCmp)) {
                me.filterFormCmp.destroy();
                me.filterFormCmp = Ext.create(me.filterFormParams.panelClass, {
                    renderTo: $filterFormContainer[0],
                    panelData: me.filterFormParams
                });
            }

        });

        $("button[data-xfr-btn-apply]", $formContainer).on("click", function () {
            // console.log("click on apply----------------");            
            var $form = $("[data-filter-form-container] form", me.$this),
                    formData = $form.serialize(),
                    grid = me.getGrid(),
                    store = grid.getStore(),
                    storeProxy = store.getProxy();
                    //console.log("formData AAAAAAAAAAAAAAAA");
                    //console.log(formData);
            // console.log("grid URL on apply = " + me.gridUrl);
            // console.log("formData");
            // console.log(formData);
//            var url = me.gridUrl + "?" + formData;
            storeProxy.url = me.gridUrl;
            store.setParams(formData);
            store.setProxy(storeProxy);
//            me.mask();
            grid.reload();
        });

        $("button[data-xfr-btn-print]").on("click", function () {
            var $form = $("form", $formContainer);
            var formData = $form.serialize();
            me.onPrint(formData);
        });

        $("button[data-btn-filter-action]", $formContainer).each(function (index, item) {

            $(item).click(function () {
                // console.log("click on filter action----------------");

                var elt = $(this);
                //console.log($(elt).data("param"));
                var param = $(elt).data("param");
                //console.log("panelClass=" + param.panelClass);
                //console.log("gridUrl=" + param.gridUrl);
                me.filterFormParams = param;
                me.gridUrl = Routing.generate(param.gridUrl, {
                    _locale: appConfig.locale
                });
                //console.log("grid URL on toggle action = " + me.gridUrl);
                if (!Ext.isEmpty(me.filterFormCmp)) {
                    me.filterFormCmp.destroy();
                } else {
                    $filterFormContainer.empty();
                }
                me.filterFormCmp = Ext.create(param.panelClass, {
                    renderTo: $filterFormContainer[0],
                    panelData: param
                });

                $("button[data-btn-filter-action].selected").removeClass('selected');
                if (!elt.hasClass('selected')) {
                    elt.addClass('selected');
                }
            });

        });
    },
    // onFormSubmit: function() {
    //     var me = this;
    //     if (me.toolbarAction === "create") {
    //         me.createAction();
    //     } else if (me.toolbarAction === "edit") {
    //         me.updateAction();
    //     }

    // },
    initGridPanel: function () {
        var me = this;
        //var $crudPanel = $("[data-xfr-crud-grid-form]");

        $("button[data-xfr-btn-filter]", me.$this).on("click", function () {
            // console.log("filter");
            me.toggleFilter();
        });
    },
    toggleFilter: function () {
        var me = this;
        $("[data-grid-filter]").animate({
            width: 'toggle'
        }, {
            duration: 300,
            complete: function () {
                //console.log("complete");
                if (!$(this).is(":visible")) {
                    $(this).removeClass("filter-visibility").removeAttr("style");
                    //                    $(this).addClass("filter-visibility").removeAttr("style");
                } else {
                    $(this).addClass("filter-visibility").removeAttr("style");
                }
            }
        });
        //                .toggleClass("filter-visibility");
    },
    onPrint: function (formData) {
        Xfr.RemoteWindow.show("History ", this.gridUrl + '/print.pdf?' + formData);
    }
});

////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.GridBox
 * 
 */

Ext.define("Xfr.panel.GridBox", {
    alternateClassName: "Xfr.GridBox",
    requires: [
    ],
    extend: 'Xfr.panel.Window',
    config: {
    },
    statics: {
        instance: null,
        init: function (title, url,action, customClass) {

            if (Ext.isEmpty(this.instance)) {
                this.instance = Ext.create("Xfr.panel.GridBox", {
                    size: "large",
                    title: title,
                    customClass: customClass,
                    renderTo: document.body,
                    items: [
                        {
                            className: "Xfr.panel.WindowGrid",
                            position: '[xfr-grid-box-grid-pos]',
                            action : action,
                            urlPath: url
                        }
                    ]
                });
               
            }

        },
        show: function (title, url,action, customClass) {
            this.instance=null;
            //if (Ext.isEmpty(this.instance)) {
                this.init(title, url,action, customClass);
//            }
//            else{
//                this.setUrl(url);
//            }
            this.instance.show();
        },
        hide: function () {
            if (!Ext.isEmpty(this.instance)) {
                this.instance.hide();
            }
        },
        count: function () {
            if (!Ext.isEmpty(this.instance)) {
                var count = this.instance.getItems()[0].store.totalCount;
                return count;
            }
            else {
                return 0;
            }
        },
        setUrl: function(url){           
            this.instance.getItems()[0].store.config.proxy.url=url;
            this.instance.getItems()[0].store.load();
        }
    }
});


////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.Form
 * 
 */

Ext.define("Xfr.panel.Form", {
    requires: [
        //"Xfr.Utils",
        //"Xfr.Select2"
    ],
    extend: 'Xfr.Component',
    config: {
        // slimscroll: {
        //     height: 'auto'
        // },
        data: {},
        mode: "edit",
        modeSwitching: false,
        listeners: {
            /**
             * fire on form submit
             */
            "formsubmit": Ext.emptyFn,
            "formsaved": Ext.emptyFn
        },
        formValidation: {},
        fieldsToInit: [],
        // fieldsToInit: [{
        //     xtype: "checkboxfieldgroup",
        //     selector: "#utilisateur_role",
        //     keyPath: "role",
        //     //values : "list", "tree"
        //     type: "list"
        // }, {
        //     xtype: "select2",
        //     selector: "#utilisateur_role",
        //     keyPath: "role",            
        // }, ]
        defaultSelect2Options: {}
    },
    initialize: function () {
        var me = this;
        this.callParent();

        me.setMode(me.getMode());
        me.on({
            formsubmit: {
                scope: me,
                fn: "onFormSubmit"
            }
        });
    },
    setMode: function (mode) {
        // console.log("+++++++++++++++++++++++++upate mode = " + mode);
        var me = this;
        if (me.getModeSwitching()) {
            if (mode === "read") {
                $("[data-mode=edit]", me.$this).css("display", "none");
                $("[data-mode=read]", me.$this).removeClass("hide hidden").css("display", "block");
            } else if (mode === "edit") {
                $("[data-mode=read]", me.$this).css("display", "none");
                $("[data-mode=edit]", me.$this).removeClass("hide hidden").css("display", "block");
            }
        }
    },
    setDisabled: function (value) {
        var me = this,
                form = $("form:first", me.$this);

        if (value) {
            $("input, textarea", form).attr("readonly", " ");
            $("select, input[type=checkbox]", form).attr("disabled", "disabled");
        } else {
            $("input, textarea", form).removeAttr("readonly");
            $("select, input[type=checkbox]", form).removeAttr("disabled");
        }
    },
    getForm: function () {
        return $("form:first", this.$this);
    },
    getFormData: function () {
        var me = this;
        return me.getForm().serialize();
    },
    resetForm: function () {
        var me = this,
                form = $("form:first", me.$this);

        //this.setData(null);        
        //this.binder.reset(null);
        //$("input[type=checkbox], input[type=radiobox]", form).removeAttr('checked');
        //form[0].reset();
        //
        this.resetBinder();
        $("input[type=checkbox]", form).each(function (index, el) {
            me.checkCheckbox($(this), false);
        });
        $("input[type=file]", form).val("");

        $("select", form).each(function () {
            var $select = $(this);
            if (!$select.children('option[value=""]').length > 0) {
                $select.append("<option value=''></option>");
            }
            var $spanSelect = $select.next(".select2.select2-container:first").find(".select2-selection__rendered");
            $spanSelect.html("");
            $select.val("");
        });
        $("[xfr-data-statics]", form).each(function () {
            $(this).val("");
        });
    },
    afterRenderTpl: function () {
        // console.log("after render tpl in Xfr.panel.Form mmmmmmmmmm");
        this.callParent(arguments);

        this.onFormLoaded();
    },
    onFormLoaded: function () {
        //console.log("on form loaded in xfr.panel.Formmmmmmmmmmm");

        var me = this,
                form = $("form:first", me.$this);

        me.isFormLoaded = true;
        me.initFields();
        me.bindSpecialFields();
        //form initialisation
        //form.attr("enctype", "multipart/form-data");
        form.on("submit", function (event) {
            console.log("preventing dfault");
            event.preventDefault();
        });
        var validateOptions = me.getFormValidation();
        validateOptions.submitHandler = function () {
            //me.onFormSubmit(form);
            console.log("Submiting form after validation")
            me.fireEvent("formsubmit", me);
        };
        if (!Ext.isEmpty(form)) {
            console.log("Validate options");
            console.log(validateOptions);
            form.validate(validateOptions);
        }

    },
    onFormSubmit: function ($form) {
        console.log("submitting form!!!");
        //document.utilisateur1.submit();
    },
    // beforeBindData: function(tplObj) {
    //     this.callParent(arguments);

    //     var me = this;
    //     me.initFields(tplObj);
    // },
    setData: function (data) {
        var me = this;
        if (me.isFormLoaded) {
            me.callParent(arguments);
            me.bindSpecialFields(data);
        }
    },
    initFields: function () {
        var me = this,
                form = $("form:first", me.$this);

        //init Default Checkbox state
        $("input[type=checkbox]", form).addClass("xfr-checkbox");
        // .each(function(index, el) {
        //     me.checkCheckbox($(this), false);
        // });

        //init checkbox of complex fields
        var fieldsToInit = me.getFieldsToInit(),
                checkboxToExclude = "";

        // console.log("Fields to Init");
        // console.log(fieldsToInit);
        if (!Ext.isEmpty(fieldsToInit)) {
            for (var i = 0; i < fieldsToInit.length; i++) {
                var field = fieldsToInit[i];

                if (field.xtype === "checkboxfieldgroup" && !Ext.isEmpty(field.selector)) {
                    var selector = field.selector + " input[type=checkbox]",
                            checkboxToExclude = selector;

                    $(selector, form).each(function (i, field) {
                        var $field = $(field);
                        me.initCheckboxField($field);
                    });
                } else if (field.xtype === "select2" && !Ext.isEmpty(field.selector)) {
                    me.iniSelect2Field(field);
                }
            }
        }

        //init simple chekbox        
        $("input[type=checkbox]:not(" + checkboxToExclude + ")", form).each(function (i, item) {
            me.initCheckboxField($(item), $(item).val() === 1);
        });

        var now = new Date();
        $("input[type=datetime]", form).datetimepicker({
            showTodayButton: true,
            showClear: true,
            format: "YYYY-MM-DD H:mm",
            locale: 'fr',
            inline: true,
            maxDate: now
        });

    },
    bindSpecialFields: function (data) {
        // console.log("Trace BindSpaecial Fields Magloire");
        // console.trace();
        if (Ext.isEmpty(data))
            return;

        var me = this,
                form = $("form:first", me.$this),
                fieldsToInit = me.getFieldsToInit(),
                simpleCbToExclude = "",
                checkboxToExclude = "";

        if (!Ext.isEmpty(fieldsToInit) && !Ext.isEmpty(data)) {
            for (var i = 0; i < fieldsToInit.length; i++) {
                var field = fieldsToInit[i];
                if (field.xtype === "checkboxfieldgroup" && !Ext.isEmpty(field.selector)) {
                    var selector = field.selector + " input[type=checkbox]",
                            checkboxToExclude = selector;
                    keyPath = field.keyPath,
                            fieldContainer = $(field.selector, form).addClass("checkboxfieldgroup"),
                            fieldData = data[keyPath];

                    $(selector, form).each(function (i, field) {
                        var $field = $(field),
                                objToFind = {
                                    id: $field.attr("value")
                                };

                        if (!Ext.isEmpty(fieldData) && Xfr.Utils.arrayContains(fieldData, objToFind, false)) {
                            me.checkCheckbox($field, true);
                        } else {
                            me.checkCheckbox($field, false);
                        }
                        //me.initCheckboxField($field);
                    });

                } else if (field.xtype === "select2" && !Ext.isEmpty(field.selector)) {

                    // console.log(" Magloire: Param�tre select 2");
                    // console.log(form);
                    var fieldData = Xfr.Utils.getObjectByKeypath(data, field.keyPath),
                            fieldValue = null,
                            displayValue = null,
                            $select = $(field.selector, form);

                    // console.log(" Magloire: Select 2 initialis�");
                    // console.log($select);
                    if (!Ext.isEmpty(fieldData)) {
                        fieldValue = fieldData[field.dataFieldValue];
                        //                        displayValue = fieldValue + " - " + fieldData[field.displayFieldValue];
                        displayValue = fieldValue + " - " + Xfr.Utils.getObjectByKeypath(fieldData, field.displayFieldValue);
                        // console.log("displayValue");
                        // console.log(displayValue);

                        //$(field.selector, form).val(fieldValue);
                        // if ($select.children('option[value="' + fieldValue + '"]').length < 1) {
                        //     console.log("not have devault option");
                        //     $select.select2("data", [fieldData]);
                        // }
                        // $select.select2("val", fieldValue);
                        // $select.select2("value", fieldValue, fieldData);
                        //

                        me.setSelect2Value(field.selector, fieldValue, displayValue);

                        //$select.select2("destroy");
                        //$select.empty();
                        //$select.append("<option value='" + fieldValue + "'>" + displayValue + "</option>");
                        //me.iniSelect2Field(field);
                        ////$select.val(fieldValue).trigger("change");
                        //var $spanSelect = $select.next(".select2.select2-container:first").find(".select2-selection__rendered");
                        //$spanSelect.html($spanSelect.attr("title"));
                    } else {
                        me.setSelect2Value(field.selector, '', field.options.placeholder);

                        //$select.select2("destroy");
                        //$select.empty();
                        //$select.append("<option value=''>" + field.options.placeholder + "</option>");
                        //var fieldClone = Ext.clone(field);
                        //delete fieldClone.options.placeholder;
                        //me.iniSelect2Field(fieldClone);
                        //var $spanSelect = $select.next(".select2.select2-container:first").find(".select2-selection__rendered");
                        //$spanSelect.html($spanSelect.attr("title"));

                    }
                }

            }
        }

        // console.log("init simple checkbox fields----------------------");
        //init simple checkbox fields
        //<input checked="{{data.checkbox1}}" value="{{data.checkbox1}}" class="xfr-checkbox icon-checkbox-{{data.checkbox1 == true ? 'checked' : 'unchecked'}}" />
        // console.log("checkbox to exclude exclude--------------------------");
        // console.log(checkboxToExclude);
        // console.log("checkbox to exclude exclude--------------------------");
        // 
        $("input[type=checkbox]:not(" + checkboxToExclude + ")", form).each(function (i, item) {
            // console.log("checkbox");
            // console.log($(item));
            me.initCheckboxField($(item), true);
        });

    },
    getSelect2FieldBySelector: function (selector) {
        var me = this,
                fieldsToInit = me.getFieldsToInit();
        if (!Ext.isEmpty(fieldsToInit)) {
            for (var i = 0; i < fieldsToInit.length; i++) {
                var field = fieldsToInit[i];

                if (field.xtype === "select2" && !Ext.isEmpty(field.selector) && field.selector === selector) {
                    return field;
                }
            }
        }
        return null;
    },
    getSelect2SelectedData: function (selector, form) {
        var me = this;
        if (Ext.isEmpty(form)) {
            form = $("form:first", me.$this);
        }
        var results = $(selector, form).select2("data");

        if (!Ext.isEmpty(results)) {
            return results[0];
        } else {
            return null;
        }
    },
    setSelect2Value: function (selector, value, displayHtml, form) {
        var me = this;

        if (Ext.isEmpty(form)) {
            form = $("form:first", me.$this);
        }

        var field = me.getSelect2FieldBySelector(selector);
        var $select = $(selector, form);
        //        $select.select2("destroy");
        //        $select.empty();
        if (!Ext.isEmpty(value)) {
            if (!$select.children('option[value=' + value + ']').length > 0) {
                $select.append("<option value='" + value + "'>" + displayHtml + "</option>");
            }
        }

        //        me.iniSelect2Field(field);
        //$select.val(fieldValue).trigger("change");
        var $spanSelect = $select.next(".select2.select2-container:first").find(".select2-selection__rendered");
        //if ($spanSelect.attr("title")===undefined) {
            $spanSelect.html(displayHtml);
        /*} else {
            $spanSelect.html($spanSelect.attr("title"));
        }*/
        $select.val(value);
    },
    iniSelect2Field: function (field, form) {
        // console.log("trace Magloire");
        // console.trace();
        var me = this;
        if (Ext.isEmpty(form) || form === undefined) {
            form = $("form:first", me.$this);
        }

        var options = Ext.merge({}, me.getDefaultSelect2Options());

        if (!Ext.isEmpty(field.tplClass)) {
            //console.log("Fiels Tpl class");
            //console.log(field.tplClass);
            options.optionTpl = $("#" + Xfr.Utils.getCmpClassId(field.tplClass)).html();
            if (!Ext.isEmpty(options.optionTpl)) {
                //console.log( "Creating template result");
                options.templateResult = function (data, optionTpl) {
                    //console.log("template result--------");
                    //console.log(data);
                    var bindObj = {};
                    if (typeof appConfig !== 'undefined') {
                        bindObj.appConfig = appConfig;
                    }
                    bindObj.data = data;

                    var ractive = new Ractive({
                        template: optionTpl,
                        data: bindObj
                    });
                    return $(ractive.toHTML());
                };

            }

        }

        if (!Ext.isEmpty(field.type)) {
            if (field.type === "local") {
                delete options.ajax;
            } else if (field.type === "remote") {
                if (Ext.isEmpty(options.ajax)) {
                    options.ajax = {};
                }
                options.ajax.url = field.url;
            }
        }

        Ext.merge(options, Ext.isEmpty(field.options) ? {} : field.options);

                //console.log("options");
                //console.log(options);

        $(field.selector, form).css({
            width: "100%"
        }).select2(options);
    },
    initCheckboxField: function ($checkbox, initValue) {

        var me = this;

        if (Ext.isEmpty(initValue)) {
            initValue = false;
        }
        if (initValue) {
            if ($checkbox.val() === true || $checkbox.val() === 1 || $checkbox.val() === "1" || $checkbox.val() === "true") {
                me.checkCheckbox($checkbox, true);
            } else {
                me.checkCheckbox($checkbox, false);
            }
        } else {
            if ($checkbox.is(':checked')) {
                me.checkCheckbox($checkbox, true);
            } else {
                me.checkCheckbox($checkbox, false);
            }
        }

        if ($checkbox.attr("data-checked-evt") !== "inited") {
            $checkbox.attr("data-checked-evt", "inited").change(function (event) {
                if ($(this).is(':checked')) {
                    if (initValue) {
                        $(this).val(true);
                    }
                    me.checkCheckbox($(this), true);
                } else {
                    if (initValue) {
                        $(this).val(false);
                    }
                    me.checkCheckbox($(this), false);
                }
            });
        }

    },
    checkCheckbox: function ($checkbox, val) {
        if (val) {
            $checkbox.prop("checked", true).removeClass('icon-checkbox-unchecked').addClass('icon-checkbox-checked');
        } else {
            $checkbox.prop("checked", false).removeClass('icon-checkbox-checked').addClass('icon-checkbox-unchecked');
        }
    }

});

////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.CrudPanel
 * 
 */
Ext.define("Xfr.panel.CrudPanel", {
    extend: "Xfr.Component",
    requires: [],
    config: {
        cls: "xfr-crud-panel",
        /*formClass: "",*/
        /*formConfig: null,
         gridConfig: null,*/
        form: null,
        grid: null,
        crudActions: {
            create: "",
            read: "",
            update: "",
            destroy: ""
        }
    },
    gridInited: false,
    formLoaded: false,
    crudReady: false,
    mode: "read",
    toolbarInited: false,
    toolbarAction: "",
    formData: null,
    selectedGridIndex: -1,
    gridPosition: "data-role-grid-container",
    initialize: function () {
        this.callParent(arguments);

        var me = this;

        if (me.mode === "read") {
            me.$this.removeClass("edit-mode").addClass("view-mode");
        } else if (me.mode === "edit") {
            me.$this.removeClass("view-mode").addClass("edit-mode");
        }

        if(me.getMaskOnItemsLoading()){
            me.mask();
        }


        me.setToolbarDisabled(true);

        me.initGrid();
        
        me.initView();
        
        me.initForm();

        me.switchMode(me.mode);

        //me.initCrudPanel();
    },
    initGrid: function () {

        var me = this;

        if (!Xfr.isXfrInstance(me.getGrid())) {
            var gridConfig = Ext.apply(me.getGrid(), {
                renderTo: $("["+gridPosition+"]", me.$this)[0],
                maskOnLoad: false
            });
            me.setGrid(Xfr.createWidget(gridConfig));
        }

        var grid = me.getGrid();
        me.getChildren().push(grid);
        grid.setParent(me);

        grid.on({
            select: {
                scope: me,
                fn: "onGridSelect"
            }
        });

        grid.getStore().on({
            load: {
                scope: me,
                fn: "onStoreLoaded"
            },
            beforeload: {
                scope: me,
                fn: "beforeLoadStore"
            }
        });

        /*me.table.on('deselect', function(e, dt, type, indexes) {
         me.onTableDeselect(e, dt, type, indexes);
         });*/

    },
    beforeLoadStore: function () {
        var me = this;
        me.mask();
    },
    onStoreLoaded: function () {
        var me = this;
        me.gridInited = true;

        if (me.formLoaded && me.gridInited) {
            me.initCrudOnReady();
        }
    },
    // onGridDeselect: function(grid, selectedIndex, selectedRecord, selectedIndexes, selectedRecords) {
    //     var me = this;
    //     $("button[data-action-type=edit],button[data-action-type=delete]", me.$this).hide();
    //     me.formData = null;
    //     me.selectedTableRow = null;
    //     me.getForm().resetForm();

    // },
    onGridSelect: function (grid, selectedIndex, selectedRecord, selectedIndexes, selectedRecords) {
        var me = this;
        $("button[data-action-type=edit],button[data-action-type=delete]", me.$this).show();
        me.selectedGridIndex = selectedIndex;
        // console.log(selectedRecord);    
        me.getForm().resetForm();
        me.getForm().setData({});
        me.getForm().setData(selectedRecord);
    },
    initForm: function () {
        var me = this;
        if (!Xfr.isXfrInstance(me.getForm())) {
            var formConfig = Ext.merge(me.getForm(), {
                renderTo: $("[data-xfr-form-container]", me.$this)[0],
                listeners: {
                    "afterrendertpl": {
                        scope: me,
                        fn: "afterRenderForm"
                    },
                    "formsubmit": {
                        scope: me,
                        fn: "onFormSubmit"
                    }
                }
            });
            me.setForm(Xfr.createWidget(formConfig));

            me.getChildren().push(me.getForm());
            me.getForm().setParent(me);

        }
    },
    afterRenderForm: function () {
        // console.log("------on form loaded in crudpanel------------------");
        var me = this;
        me.formLoaded = true;

        if (me.formLoaded && me.gridInited && !me.crudReady) {
            me.initCrudOnReady();
        }
    },
    onFormSubmit: function () {
        var me = this;
        if (me.toolbarAction === "create") {
            me.createAction();
        } else if (me.toolbarAction === "edit") {
            me.updateAction();
        }
    },
    initCrudOnReady: function () {
        var me = this;
        me.setToolbarDisabled(false);
        me.crudReady = true;
        me.switchMode('read');
        me.unmask();
    },
    initCrudPanel: function () {
        var me = this;

        var $crudPanel = $("[data-xfr-crud-grid-form]");

        me.$this.addClass("gridview-tab");
        var $viewsToolbar = $("[data-xfr-views-toolbar]");
        var $gridviewBtn = $("[data-xfr-btn-gridview]");
        $gridviewBtn.addClass("active");

        $("button", $viewsToolbar).click(function () {
            $("button", $viewsToolbar).removeClass("active");
            $(this).addClass("active");
        });

        $("button[data-action-type=create]", me.$this).on("click", function () {
            me.clickOnCreate();
        });
        $("button[data-action-type=edit]", me.$this).on("click", function () {
            me.clickOnEdit();
        });
        $("button[data-action-type=delete]", me.$this).on("click", function () {
            me.clickOnDelete();
        });
        $("button[data-action-type=save]", me.$this).on("click", function () {
            me.clickOnSave();
        });
        $("button[data-action-type=cancel]", me.$this).on("click", function () {
            me.clickOnCancel();
        });
        $("button[data-xfr-btn-formview]", me.$this).on("click", function () {
            me.tabFormView();
        });
        $("button[data-xfr-btn-gridview]", me.$this).on("click", function () {
            me.tabGridView();
        });

        $("button[data-action-type=custom]", me.$this).on("click", function () {
            me.clickOnCustom($(this));
        });

        //        me.switchMode(me.mode);

    },
    clickOnCreate: function () {
        this.toolbarAction = "create";
        this.switchMode('edit');
        this.getForm().resetForm();
        this.getGrid().unselectAllRows();
    },
    clickOnEdit: function () {
        this.toolbarAction = "edit";
        this.switchMode('edit');

    },
    clickOnDelete: function () {
        var me = this;
        Xfr.Msg.show({
            title: appConfig.translations.deletion,
            message: appConfig.translations.deletionMsg,
            icon: Xfr.Msg.QUESTION,
            btn: [Xfr.Msg.YES, Xfr.Msg.NO],
            action: function (btn) {
                if (btn === Xfr.Msg.YES.text) {
                    me.deleteAction();
                }

            }
        });
    },
    clickOnSave: function () {
        var me = this,
                $form = $("form:first", me.getForm().$this);
        $form.submit();
    },
    clickOnCancel: function () {
        this.switchMode('read');
    },
    switchMode: function (mode) {
        // console.log("switch mode = " + mode);
        var me = this;

        if (mode === "read") {

            me.removeFormErrors();

            me.$this.removeClass("edit-mode").addClass("view-mode");
            $("button[data-action-type=create]", me.$this).removeAttr("disabled").show();

            $(
                    "div[data-xfr-crud-toolbar] button[data-action-type=save], " +
                    "div[data-xfr-crud-toolbar] button[data-action-type=cancel] ",
                    me.$this
                    ).hide();

            if (me.toolbarAction === "edit" && me.getGrid().getStore().getData().length > 0) {
                console.log("hide edit and delete button on switch mode to read");
                $(
                        "div[data-xfr-crud-toolbar] button[data-action-type=edit], " +
                        "div[data-xfr-crud-toolbar] button[data-action-type=delete]",
                        me.$this
                        ).show();
                //me.toolbarInited = true;
            } else {
                $(
                        "div[data-xfr-crud-toolbar] button[data-action-type=edit], " +
                        "div[data-xfr-crud-toolbar] button[data-action-type=delete]",
                        me.$this
                        ).hide();
            }
            $("button[data-action-type=custom]", me.$this).show();
            me.mode = "read";

            if (me.crudReady) {
                this.getForm().setDisabled(true);
            }
            // 
            // console.log("switching on read mode ================gridSelectionLength=" + me.getGrid().getSelectedIndexes().length);
            // if (me.getGrid().getSelectedIndexes().length > 0) {
            //     if (me.crudReady) {
            //         this.getForm().setMode(mode);
            //     }
            // } 
            // else {
            //     if (me.crudReady) {
            //         me.getForm().setMode("edit");
            //     }
            // }

        } else if (mode === "edit") {
            me.$this.removeClass("view-mode").addClass("edit-mode");

            $("button[data-action-type=create]", me.$this).hide();
            $("button[data-action-type=edit]", me.$this).hide();
            $("button[data-action-type=delete]", me.$this).hide();
            $("button[data-action-type=custom]", me.$this).hide();

            $("button[data-action-type=save]", me.$this).show().removeAttr("disabled");
            ;
            $("button[data-action-type=cancel]", me.$this).show().removeAttr("disabled");
            ;
            me.mode = "edit";

            if (me.crudReady) {
                this.getForm().setDisabled(false);
            }
        }
        this.getForm().setMode(mode);
        this.getForm().binder.set("mode", mode);

    },
    tabFormView: function () {
        var me = this;
        me.$this.removeClass("gridview-tab").addClass("formview-tab");
    },
    tabGridView: function () {
        var me = this;
        me.$this.removeClass("formview-tab").addClass("gridview-tab");
    },
    setToolbarDisabled: function (value) {
        var me = this;
        if (value) {
            $("div[data-xfr-crud-toolbar] button", me.$this).addClass("disabled");
        } else {
            $("div[data-xfr-crud-toolbar] button", me.$this).removeClass("disabled");
        }
    },
    removeFormErrors: function () {
        var me = this,
                form = $("form:first", me.getForm().$this);
        $("div.error-panel", form).remove();
    },
    showFormErrors: function (errors) {
        if (Ext.isEmpty(errors)) {
            return;
        }
        var me = this,
                form = $("form:first", me.getForm().$this),
                errorForm = "";


        form.remove(".error-panel");

        for (var i = 0; i < errors.length; i++) {
            var errorsObj = errors[i];
            for (var field in errorsObj) {
                errorForm += '<div class="error-item">' +
                        '<label class="error">' + field + ' : ' + errorsObj[field] + ' </label>' +
                        '</div>';
            }
        }
        ;
        $('<div class="error-panel"> <h5 class="error-title">' + appConfig.translations.formErrors + ':</h5> ' + errorForm + ' </div>').prependTo(form);
        $('<div class="error-panel"> <h5 class="error-title">' + appConfig.translations.formErrors + ':</h5> ' + errorForm + ' </div>').appendTo(form);

    },
    beforeCreate: function (opts) {
    },
    afterCreate: function () {
    },
    createAction: function (callback) {
        var me = this;
        var crudActions = this.getCrudActions();

        Xfr.Mask.show(appConfig.translations.operationInProgress);


        //var formData = new FormData(me.getForm().$form[0]);
        //var formData = me.getForm().getData();
        //var formData = me.getForm().getFormData();
        //var formData = new FormData(this);
        //var form = $("form:first", me.getForm().$this);   

        var form = $("form:first", me.$this);
        formData = new FormData(form[0]);
        //console.log("form");
        //console.log(form);


        var opts = {
            url: crudActions.create,
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            dataType: "json",
            type: "POST"
        };

        me.beforeCreate(opts);
        me.fireEvent('beforecreate', me);


        // console.log("create action ------------");
        // console.log(formData);
        $.ajax(Ext.merge(opts, {
            success: function (data) {
                Xfr.Mask.hide();
                if (data.success) {
                    me.switchMode('read');

                    // me.table.row.add(data.data).draw();
                    //me.getGrid().setDataAt(me.selectedGridIndex, data.data);
                    me.getGrid().reload();
                    me.removeFormErrors();
                    Xfr.Msg.alert("success", data.message);
                    if (typeof (callback) === 'function') {
                        callback(data);
                    }
                } else {
                    me.showFormErrors(data.data);
                    Xfr.Msg.show({
                        title: appConfig.translations.error,
                        message: data.message,
                        icon: Xfr.Msg.ERROR
                    });

                }
            },
            error: function () {
                Xfr.Mask.hide();
                Xfr.Msg.show({
                    title: appConfig.translations.error,
                    message: appConfig.translations.serverError,
                    icon: Xfr.Msg.ERROR
                });
            }
        }));

        me.afterCreate();
        me.fireEvent('aftercreate', me);
    },
    beforeUpdate: function (opts) {
    },
    afterUpdate: function () {
    },
    updateAction: function () {
        var me = this;


        var crudActions = this.getCrudActions();

        Xfr.Mask.show(appConfig.translations.operationInProgress);

        var form = $("form:first", me.getForm().$this);
        console.log("form");
        console.log(form);
        var formData = new FormData(form[0]);
        //var formData = me.getForm().getData();
        //var formData = me.getForm().getFormData();
        //var formData = new FormData(this);

        console.log("update action ------------");
        console.log(formData);
        var opts = {
            url: crudActions.update,
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            dataType: "json",
            type: "POST"
        };

        me.beforeUpdate(opts);
        me.fireEvent('beforeupdate', me);

        $.ajax(Ext.merge(opts, {
            success: function (data) {
                Xfr.Mask.hide();
                if (data.success) {
                    console.log('data.data');
                    console.log(data.data);
                    me.getGrid().setDataAt(me.selectedGridIndex, data.data);
                    me.getForm().setData(data.data);

                    Xfr.Msg.alert("success", data.message);
                    me.removeFormErrors();
                    me.switchMode('read');
                } else {
                    me.showFormErrors(data.data);
                    Xfr.Msg.show({
                        title: appConfig.translations.error,
                        message: data.message,
                        icon: Xfr.Msg.ERROR
                    });
                }
            },
            error: function () {
                Xfr.Mask.hide();
                Xfr.Msg.show({
                    title: appConfig.translations.error,
                    message: appConfig.translations.serverError,
                    icon: Xfr.Msg.ERROR
                });
            }
        }));

        me.afterUpdate();
        me.fireEvent('afterupdate', me);

    },
    beforeDelete: function (opt) {
    },
    deleteAction: function () {
        var me = this;
        console.log(appConfig.translations.operationInProgress);


        var crudActions = this.getCrudActions();
        //        console.log(crudActions);
        //        console.log(crudActions.update);

        Xfr.Mask.show(appConfig.translations.operationInProgress);


        var opts = {
            url: crudActions.destroy,
            dataType: "json",
            type: "POST"
        };

        me.beforeDelete(opts);
        me.fireEvent('beforedelete', me);

        $.ajax(Ext.merge(opts, {
            success: function (data) {
                Xfr.Mask.hide();
                console.log(data);
                if (data.success) {

                    // var row = me.table.row('.selected');                    
                    // row.data(data.data).draw();
                    // 
                    // 
                    me.getGrid().reload();
                    me.getForm().resetForm();

                    Xfr.Msg.alert(appConfig.translations.success, data.message);
                    me.removeFormErrors();
                    me.switchMode('read');
                } else {
                    me.showFormErrors(data.data);
                    Xfr.Msg.show({
                        title: appConfig.translations.error,
                        message: data.message,
                        icon: Xfr.Msg.ERROR
                    });
                }
            },
            error: function () {
                Xfr.Mask.hide();
                Xfr.Msg.show({
                    title: appConfig.translations.error,
                    message: appConfig.translations.serverError,
                    icon: Xfr.Msg.ERROR
                });
            }
        }));
    },
    clickOnCustom: function (button) {
        alert('define custom action');
    },
    initView: function () {
        
    }
});

////@tag Grid
//@define Grid

/**
 * @class Xfr.panel.AmountDialog
 * 
 */


Ext.define("Xfr.panel.AmountDialog", {
    alternateClassName: "Xfr.AmountDialog",
    extend: "Xfr.panel.Window",
    requires: [
    ],
    config: {
    },
    statics: {
        instance: null,
        init: function () {
            this.instance = Ext.create("Xfr.panel.AmountDialog", {
                size: "medium",
                title: "Montant physique",
                renderTo: document.body
            });
        },
        show: function (action, montant) {
            if (!Ext.isEmpty(this.instance)) {
                this.instance.destroy();
            }
            this.init();
            $('#amount-dialog-btn-save').on("click", function (event) {
                action();
            });
            $('#montant_physique').on("change", function (event) {
                var reste = parseInt($('#montant_physique').val()) - montant;
                $('#montant_rembourse').val(reste);
            });

            this.instance.show();
        },
        hide: function () {
            if (!Ext.isEmpty(this.instance)) {
                this.instance.hide();
            }
        }
    }

});



/**
 * @class Xfr.panel.addnewelement
 * 
 */
Ext.define("Xfr.plugin.AddNewElement", {
    extend: 'Xfr.Component',
    requires: [],
    alias: 'plugin.addnewelement',
    config: {
        width : "100%",
        height : "100%",
        cmp: null,
        data: {}
    },
    init: function (cmp) {
        var me = this;
        me.setCmp(cmp);
        //$('#button-add-new').click(function () {
        $('[data-btn-add-new]', me.$this).click(function () {
            me.onAddClicked();
        });
        // $('#button-close-list-form').click(function () {
        //     me.onCloseClicked();
        // });
    },
    onAddClicked: function () {
       this.getCmp().openForm();
    },
    // onCloseClicked: function () {
    //    this.getCmp().closeForm();
    // }
});

/**
 * @class Xfr.panel.Pagination
 * 
 */
Ext.define("Xfr.plugin.BsPaging", {
    extend: 'Xfr.Component',
    requires: [],
    alias: 'plugin.bspaging',
    config: {
        cmp: null,
        data: {},
    },
    init: function(cmp) {
        var me = this;
        me.setCmp(cmp);
        // console.log("-----------init plugin pagination");

        var store = me.getCmp().getStore();
        store.on({
            "load": {
                scope: me,
                fn: "onStoreLoaded"
            }
        });

        $("li[data-prev-page]>a", me.$this).on("click", function() {
            me.clickOnPrevPage($(this));
        });
        $("li[data-next-page]>a", me.$this).on("click", function() {
            me.clickOnNextPage($(this));
        });
        me.initPaging(store);
    },
    initPaging: function(store) {
        var me = this,
            pageCount = 0;

        pageCount = parseInt(store.getTotalCount() / store.getPageSize());
        if (store.getTotalCount() % store.getPageSize() > 0) {
            pageCount++;
        }

        var pages = [];
        for (var i = 0; i < pageCount; i++) {
            pages.push({
                "pageNum": (i + 1)
            });
        }
        var start = (store.currentPage - 1) * parseInt(store.getPageSize()),
            currentPageLength = 0,
            first = 0;
        if (store.getTotalCount() === 0) {
            first = 0;
        } else {
            first = start + 1;
            currentPageLength = (store.currentPage == pageCount || pageCount === 1) ? store.getTotalCount() : start + parseInt(store.getPageSize())
        }
        me.setData({
            "pages": pages,
            "totalCount": store.getTotalCount(),
            "first": first,
            "currentPageLength": currentPageLength
        });

        //console.log("dataaaaaaaaaaaaaaaaaaaaaaaa");
        //console.log(me.getData());

        me.binder.set("data", me.getData());
        me.initPagesEltEvents();
    },
    initPagesEltEvents: function() {
        var me = this;
        $("li[data-page-num] a", me.$this).each(function(index, el) {

            if (!$(el).attr("data-event-inited")) {
                $(el).attr("data-event-inited", "true");
                $(el).on("click", function() {
                    me.clickOnPageNum($(this));
                });
            }

        });
    },
    onStoreLoaded: function(store, data, successful) {
        var me = this,
            cmp = me.getCmp();
        me.initPaging(store);

        //activate the current page
        $("ul[data-pagination] li.active", me.$this).removeClass('active');
        $("ul[data-pagination] li[data-page-num=" + store.currentPage + "]", me.$this).addClass('active');

        var firstPageNum = parseInt($("ul[data-pagination] li[data-page-num]:first", me.$this).data("page-num")),
            lastPageNum = parseInt($("ul[data-pagination] li[data-page-num]:last", me.$this).data("page-num"));

        //check first page and last page disabling
        $("ul[data-pagination] li[data-prev-page],ul[data-pagination] li[data-next-page]", me.$this).removeClass('disabled');
        if (store.currentPage === firstPageNum) {
            $("ul[data-pagination] li[data-prev-page]", me.$this).addClass('disabled');
        } else if (store.currentPage === lastPageNum) {
            $("ul[data-pagination] li[data-next-page]", me.$this).addClass('disabled');
        }
        if (store.getPageSize() === store.getTotalCount()) {
            $("ul[data-pagination] li[data-next-page]", me.$this).addClass('disabled');
            $("ul[data-pagination] li[data-prev-page]", me.$this).addClass('disabled');
        }

    },
    clickOnPageNum: function($elt) {
        var liParentEl = $elt.parents("li:first");
        var me = this,
            cmp = me.getCmp();
        var store = cmp.getStore();
        cmp.mask();
        var page = parseInt(liParentEl.data("page-num"));

        store.loadPage(page);
    },
    clickOnPrevPage: function($elt) {
        var liParentEl = $elt.parents("li:first");
        if (liParentEl.hasClass('disabled')) return;

        var me = this,
            cmp = me.getCmp();
        var store = cmp.getStore();
        cmp.mask();
        store.previousPage();
    },
    clickOnNextPage: function($elt) {
        var liParentEl = $elt.parents("li:first");
        if (liParentEl.hasClass('disabled')) return;

        var me = this,
            cmp = me.getCmp();
        var store = cmp.getStore();
        cmp.mask();
        store.nextPage();
    }

});

/**
 * @class Xfr.panel.FormNew
 * 
 */
Ext.define("Xfr.plugin.FormNew", {
    extend: 'Xfr.Component',
    requires: [],
    alias: 'plugin.FormNew',
    config: {
        cmp: null,
        data: {}
    },
    init: function(cmp) {
        var me = this;
        me.setCmp(cmp);       

    }
});

/**
 * @class Xfr.plugin.GridSearch
 * 
 */
Ext.define("Xfr.plugin.GridSearch", {
    extend: 'Xfr.Component',
    requires: [],
    alias: 'plugin.gridsearch',
    config: {
        cls: "table-form-search",
        cmp: null,
        data: {
            searchValue: "",
        },
        searchLocal:false,
        width: "100%"
    },
    init: function(cmp) {
        var me = this;
        me.setCmp(cmp);

        /*console.log("-----------init plugin GridSearch");*/

        console.log("Search locally: "+me.getSearchLocal());

        var store = me.getCmp().getStore();

         $("input[name=search-value]", me.$this).change(function(event) {            
             me.getCmp().mask();

            store.filterCollectionByQuery($(this).val(), me.getSearchLocal());
        });

        // me.binder.observe('data.searchValue', function(newValue) {
        //     console.log("on change value =  " + newValue);
        //     //me.filter(newValue);
        //     me.getCmp().mask();
        //     store.filterCollectionByQuery(newValue);
        // });
    }

});

/**
 * @class Xfr.plugin.GridSearch
 * 
 */
Ext.define("Xfr.plugin.GridSearchJs", {
    extend: 'Xfr.Component',
    requires: [],
    alias: 'plugin.gridsearchjs',
    config: {
        cls: "table-form-search",
        cmp: null,
        data: {
            searchValue: ""
        },
        searchLocal:false,
        width: "100%"
    },
    init: function(cmp) {
        var me = this;
        me.setCmp(cmp);

        /*console.log("-----------init plugin GridSearch");*/

        console.log("Search locally: "+me.getSearchLocal());

        var store = me.getCmp().getStore();

         $("input[name=search-value]", me.$this).change(function(event) {            
             me.getCmp().mask();

             store.setSearchValue($(this).val());
            store.filterCollectionByQuery($(this).val(), me.getSearchLocal());
        });

        // me.binder.observe('data.searchValue', function(newValue) {
        //     console.log("on change value =  " + newValue);
        //     //me.filter(newValue);
        //     me.getCmp().mask();
        //     store.filterCollectionByQuery(newValue);
        // });
    }

});

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

/**
 * @class Xfr.panel.Pagination
 * 
 */
Ext.define("Xfr.plugin.Pagination", {
    extend: 'Xfr.Component',
    requires: [],
    alias: 'plugin.pagination',
    config: {
        cmp: null,
        data: {},
        showSummary:false,
        summaryClass:"Xfr.plugin.Summary"
        //plugins: [
        //     {
        //        className: "Xfr.plugin.Summary",
        //        position: "[data-table-summary]"
        //    }
        //]
    },
    summary: null,
    init: function(cmp) {
        var me = this;
        me.setCmp(cmp);

        me.$this.addClass("paging");
        // console.log("-----------init plugin pagination");

        var store = me.getCmp().getStore();
        store.on({
            "load": {
                scope: me,
                fn: "onStoreLoaded"
            }
        });

        me.initPagingEvt();
        me.initPaging(store);
    },
    getStore: function(){
        var me = this;
        var store = me.getCmp().getStore();
        return store;
    },
    setData: function() {
        var me = this;
        this.callParent(arguments);
        // console.log("set data on pagination");
        me.initPagingEvt();
    },
    initPagingEvt: function() {
        var me = this;

        // console.log("Enter in initPagingEvt");

        var $item = null;

        $item = $("li[data-prev-page]>a", me.$this);
        if ($item.attr("data-click-evt") !== "true") {
            // console.log("adding click evt for the first times")
            $("li[data-prev-page]>a", me.$this).on("click", function() {
                me.clickOnPrevPage($(this));
            });
            $item.attr("data-click-evt", "true");
        }

        $item = $("li[data-next-page]>a", me.$this);
        if ($item.attr("data-click-evt") !== "true") {
            $item.on("click", function() {
                me.clickOnNextPage($(this));
            })
            $item.attr("data-click-evt", "true");
        }

        $item = $("li[data-first-page]>a", me.$this);
        if ($item.attr("data-click-evt") !== "true") {
            $item.on("click", function() {
                me.clickOnFirstPage($(this));
            })
            $item.attr("data-click-evt", "true");
        }

        $item = $("li[data-last-page]>a", me.$this);
        if ($item.attr("data-click-evt") !== "true") {
            $item.on("click", function() {
                me.clickOnLastPage($(this));
            })
            $item.attr("data-click-evt", "true");
        }

        $item = $("input[name=current-page]", me.$this);
        if ($item.attr("data-change-evt") !== "true") {
            $item.change(function() {
                me.changeCurrentPage($(this));
            });
            $item.attr("data-change-evt", "true");
        }
    },
    initPaging: function(store) {
        var me = this,
            pageCount = 0;

        pageCount = parseInt(store.getTotalCount() / store.getPageSize());
        if (store.getTotalCount() % store.getPageSize() > 0) {
            pageCount++;
        }

        var pages = [];
        for (var i = 0; i < pageCount; i++) {
            pages.push({
                "pageNum": (i + 1)
            });
        }
        var start = (store.currentPage - 1) * parseInt(store.getPageSize()),
            currentPageLength = 0,
            first = 0;
        if (store.getTotalCount() === 0) {
            first = 0;
        } else {
            first = start + 1;
            currentPageLength = (store.currentPage == pageCount || pageCount === 1) ? store.getTotalCount() : start + parseInt(store.getPageSize())
        }
        me.setData({
            "pages": pages,
            "pageCount": pageCount,
            "totalCount": store.getTotalCount(),
            "first": first,
            "currentPage": store.currentPage,
            "currentPageLength": currentPageLength
        });

        // console.log("dataaaaaaaaaaaaaaaaaaaaaaaa in Pagination.js");
        // console.log(me.getData());

        me.binder.set("data", me.getData());
        //me.initPagesEltEvents();
    },
    initPagesEltEvents: function() {
        var me = this;
        $("li[data-page-num] a", me.$this).each(function(index, el) {
            if (!$(el).attr("data-event-inited")) {
                $(el).attr("data-event-inited", "true");
                $(el).on("click", function() {
                    me.clickOnPageNum($(this));
                });
            }
        });
    },
    onStoreLoaded: function(store, data, successful) {
        var me = this,
            cmp = me.getCmp();

        // console.log("on storle loaded in pagination.js");

        me.initPaging(store);


        //activate the current page
        // $("ul[data-pagination] li.active", me.$this).removeClass('active');
        // $("ul[data-pagination] li[data-page-num=" + store.currentPage + "]", me.$this).addClass('active');

        // var firstPageNum = parseInt($("ul[data-pagination] li[data-page-num]:first", me.$this).data("page-num")),
        //     lastPageNum = parseInt($("ul[data-pagination] li[data-page-num]:last", me.$this).data("page-num"));

        //check first page and last page disabling
        $("ul[data-pagination] li[data-next-page]," +
            "ul[data-pagination] li[data-prev-page]," +
            "ul[data-pagination] li[data-first-page]," +
            "ul[data-pagination] li[data-last-page]",
            me.$this).removeClass('disabled');
        if (store.getCurrentPage() === 1) {
            $("ul[data-pagination] li[data-prev-page]," +
                "ul[data-pagination] li[data-first-page]",
                me.$this).addClass('disabled');
        } else if (store.getCurrentPage() === store.getPageCount()) {
            $("ul[data-pagination] li[data-next-page]," +
                "ul[data-pagination] li[data-last-page]",
                me.$this).addClass('disabled');
        }
        if (store.getTotalCount() <= store.getPageSize()) {

            $("ul[data-pagination] li[data-next-page]," +
                "ul[data-pagination] li[data-prev-page]," +
                "ul[data-pagination] li[data-first-page]," +
                "ul[data-pagination] li[data-last-page]",
                me.$this).addClass('disabled');
        }

        if(me.getShowSummary()){
            if(me.summary){
                me.summary.destroy();
                me.summary=null;
            }
            if(!me.summary){
                var renderTo=$("[data-table-summary]",me.$this)[0];
                console.log("Render to");
                console.log(renderTo);

                var configObj={
                    renderTo: renderTo
                };
                var onAfterRenderEvent = function() {
                    this.init(me);
                };
                if (Ext.isEmpty(configObj.listeners)) {
                    configObj.listeners = {
                        afterrendertpl: onAfterRenderEvent
                    };
                } else {
                    configObj.listeners["afterrendertpl"] = onAfterRenderEvent;
                }

                me.summary=Ext.create(me.getSummaryClass(),configObj);
                console.log("Summary");
                console.log(me.summary);

                me.summary.setCmp(me);
                me.summary.initSummary(store.getSummary());
                var config = me.getPlugins();
                config=[].concat(config);
                config[0]=me.summary;

                me.setPlugins(config);
            }
        }

        //console.log("Store data");
        //console.log(data);
        //console.log("summaryClass");
        //console.log(me.getSummaryClass());


        //if(data.summary){
        //    summary=data.symmary;
        //}
        //$("[data-table-summary]", me.$this).html(summary);

    },
    changeCurrentPage: function($elt) {
        var me = this,
            cmp = me.getCmp(),
            store = cmp.getStore();

        var val = parseInt($elt.val());
        if (Ext.isNumber(val)) {
            if (val >= 1 && val <= store.getPageCount()) {
                cmp.mask();
                store.loadPage(val);
            }
        } else {
            $elt.val(store.getCurrentPage());
        }
    },
    clickOnPageNum: function($elt) {
        var liParentEl = $elt.parents("li:first");
        var me = this,
            cmp = me.getCmp();
        var store = cmp.getStore();
        cmp.mask();
        var page = parseInt(liParentEl.data("page-num"));

        store.loadPage(page);
    },
    clickOnFirstPage: function($elt) {
        var liParentEl = $elt.parents("li:first");
        if (liParentEl.hasClass('disabled')) return;

        var me = this,
            cmp = me.getCmp();
        var store = cmp.getStore();
        cmp.mask();
        store.firstPage();
    },
    clickOnLastPage: function($elt) {
        var liParentEl = $elt.parents("li:first");
        if (liParentEl.hasClass('disabled')) return;

        var me = this,
            cmp = me.getCmp();
        var store = cmp.getStore();
        cmp.mask();
        store.lastPage();
    },
    clickOnPrevPage: function($elt) {
        var liParentEl = $elt.parents("li:first");
        if (liParentEl.hasClass('disabled')) return;

        var me = this,
            cmp = me.getCmp();
        var store = cmp.getStore();
        cmp.mask();
        store.previousPage();
    },
    clickOnNextPage: function($elt) {
        var liParentEl = $elt.parents("li:first");
        if (liParentEl.hasClass('disabled')) return;

        var me = this,
            cmp = me.getCmp();
        var store = cmp.getStore();
        cmp.mask();
        store.nextPage();
    }

});

/**
 * @class Xfr.plugin.PagingSize
 * 
 */
Ext.define("Xfr.plugin.PagingSize", {
    extend: 'Xfr.Component',
    requires: [],
    alias: 'plugin.pagingsize',
    config: {
        cls: "table-page-size",
        cmp: null,
        data: {},
        width: "100%"
    },
    init: function(cmp) {
        var me = this;
        me.setCmp(cmp);

        var store = me.getCmp().getStore();
        me.setData({
            pageSize: store.getPageSize()
        });
        me.binder.set("data", me.getData());

        $("select[name=page-size]", me.$this).change(function(event) {
            console.log("on select change on page size ");
            me.onChangePageSize($(this));
        });

    },
    onChangePageSize: function($elt) {
        var me = this,
            cmp = me.getCmp(),
            store = cmp.getStore();

        store.setPageSize($elt.val());
        console.log("grid in pagingSize------------");
        console.log(cmp);
        cmp.mask();
        store.load();
    }


});

/**
 * @class Xfr.panel.Pagination
 * 
 */
Ext.define("Xfr.plugin.Summary", {
    extend: 'Xfr.Component',
    requires: [],
    alias: 'plugin.summary',
    config: {
        cmp: null,
        data: {},
    },
    init: function(cmp) {
        var me = this;
        me.setCmp(cmp);

        me.$this.addClass("summary");
        // console.log("-----------init plugin pagination");

        var store = me.getCmp().getStore();
        store.on({
            "load": {
                scope: me,
                fn: "onStoreLoaded"
            }
        });

        me.initSummary(store.getSummary());
    },
    setData: function() {
        var me = this;
        this.callParent(arguments);
       // me.initPagingEvt();
    },
    initSummary: function(summary) {
        var me = this

        console.log("summary: "+ summary);
        me.setData({
            "summary": summary
        });

         console.log("dataaaaaaaaaaaaaaaaaaaaaaaa in Summary.js");
         console.log(me.getData());

        me.binder.set("data", me.getData());
        //me.initPagesEltEvents();
    },
    onStoreLoaded: function(store, data, successful) {
        var me = this,
            cmp = me.getCmp();

        console.log("on storle loaded in summary.js");

        var summary=store.getSummary();
        if(summary){
            me.initSummary(summary);
        }
        else{
            me.initSummary("error");
        }
    }

});

(function ($, undefined) {
    'use strict';
    var defaults = {
        item: 3,
        autoWidth: false,
        slideMove: 1,
        slideMargin: 10,
        addClass: '',
        mode: 'slide',
        useCSS: true,
        cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',
        easing: 'linear', //'for jquery animation',//
        speed: 400, //ms'
        auto: false,
        pauseOnHover: false,
        loop: false,
        slideEndAnimation: true,
        pause: 2000,
        keyPress: false,
        controls: true,
        prevHtml: '',
        nextHtml: '',
        rtl: false,
        adaptiveHeight: false,
        vertical: false,
        verticalHeight: 500,
        vThumbWidth: 100,
        thumbItem: 10,
        pager: true,
        gallery: false,
        galleryMargin: 5,
        thumbMargin: 5,
        currentPagerPosition: 'middle',
        enableTouch: true,
        enableDrag: true,
        freeMove: true,
        swipeThreshold: 40,
        responsive: [],
        /* jshint ignore:start */
        onBeforeStart: function ($el) {},
        onSliderLoad: function ($el) {},
        onBeforeSlide: function ($el, scene) {},
        onAfterSlide: function ($el, scene) {},
        onBeforeNextSlide: function ($el, scene) {},
        onBeforePrevSlide: function ($el, scene) {}
        /* jshint ignore:end */
    };
    $.fn.lightSlider = function (options) {
        if (this.length === 0) {
            return this;
        }

        if (this.length > 1) {
            this.each(function () {
                $(this).lightSlider(options);
            });
            return this;
        }

        var plugin = {},
            settings = $.extend(true, {}, defaults, options),
            settingsTemp = {},
            $el = this;
        plugin.$el = this;

        if (settings.mode === 'fade') {
            settings.vertical = false;
        }
        var $children = $el.children(),
            windowW = $(window).width(),
            breakpoint = null,
            resposiveObj = null,
            length = 0,
            w = 0,
            on = false,
            elSize = 0,
            $slide = '',
            scene = 0,
            property = (settings.vertical === true) ? 'height' : 'width',
            gutter = (settings.vertical === true) ? 'margin-bottom' : 'margin-right',
            slideValue = 0,
            pagerWidth = 0,
            slideWidth = 0,
            thumbWidth = 0,
            interval = null,
            isTouch = ('ontouchstart' in document.documentElement);
        var refresh = {};

        refresh.chbreakpoint = function () {
            windowW = $(window).width();
            if (settings.responsive.length) {
                var item;
                if (settings.autoWidth === false) {
                    item = settings.item;
                }
                if (windowW < settings.responsive[0].breakpoint) {
                    for (var i = 0; i < settings.responsive.length; i++) {
                        if (windowW < settings.responsive[i].breakpoint) {
                            breakpoint = settings.responsive[i].breakpoint;
                            resposiveObj = settings.responsive[i];
                        }
                    }
                }
                if (typeof resposiveObj !== 'undefined' && resposiveObj !== null) {
                    for (var j in resposiveObj.settings) {
                        if (resposiveObj.settings.hasOwnProperty(j)) {
                            if (typeof settingsTemp[j] === 'undefined' || settingsTemp[j] === null) {
                                settingsTemp[j] = settings[j];
                            }
                            settings[j] = resposiveObj.settings[j];
                        }
                    }
                }
                if (!$.isEmptyObject(settingsTemp) && windowW > settings.responsive[0].breakpoint) {
                    for (var k in settingsTemp) {
                        if (settingsTemp.hasOwnProperty(k)) {
                            settings[k] = settingsTemp[k];
                        }
                    }
                }
                if (settings.autoWidth === false) {
                    if (slideValue > 0 && slideWidth > 0) {
                        if (item !== settings.item) {
                            scene = Math.round(slideValue / ((slideWidth + settings.slideMargin) * settings.slideMove));
                        }
                    }
                }
            }
        };

        refresh.calSW = function () {
            if (settings.autoWidth === false) {
                slideWidth = (elSize - ((settings.item * (settings.slideMargin)) - settings.slideMargin)) / settings.item;
            }
        };

        refresh.calWidth = function (cln) {
            var ln = cln === true ? $slide.find('.lslide').length : $children.length;
            if (settings.autoWidth === false) {
                w = ln * (slideWidth + settings.slideMargin);
            } else {
                w = 0;
                for (var i = 0; i < ln; i++) {
                    w += (parseInt($children.eq(i).width()) + settings.slideMargin);
                }
            }
            return w;
        };
        plugin = {
            doCss: function () {
                var support = function () {
                    var transition = ['transition', 'MozTransition', 'WebkitTransition', 'OTransition', 'msTransition', 'KhtmlTransition'];
                    var root = document.documentElement;
                    for (var i = 0; i < transition.length; i++) {
                        if (transition[i] in root.style) {
                            return true;
                        }
                    }
                };
                if (settings.useCSS && support()) {
                    return true;
                }
                return false;
            },
            keyPress: function () {
                if (settings.keyPress) {
                    $(document).on('keyup.lightslider', function (e) {
                        if (!$(':focus').is('input, textarea')) {
                            if (e.preventDefault) {
                                e.preventDefault();
                            } else {
                                e.returnValue = false;
                            }
                            if (e.keyCode === 37) {
                                $el.goToPrevSlide();
                            } else if (e.keyCode === 39) {
                                $el.goToNextSlide();
                            }
                        }
                    });
                }
            },
            controls: function () {
                if (settings.controls) {
                    $el.after('<div class="lSAction"><a class="lSPrev">' + settings.prevHtml + '</a><a class="lSNext">' + settings.nextHtml + '</a></div>');
                    if (!settings.autoWidth) {
                        if (length <= settings.item) {
                            $slide.find('.lSAction').hide();
                        }
                    } else {
                        if (refresh.calWidth(false) < elSize) {
                            $slide.find('.lSAction').hide();
                        }
                    }
                    $slide.find('.lSAction a').on('click', function (e) {
                        if (e.preventDefault) {
                            e.preventDefault();
                        } else {
                            e.returnValue = false;
                        }
                        if ($(this).attr('class') === 'lSPrev') {
                            $el.goToPrevSlide();
                        } else {
                            $el.goToNextSlide();
                        }
                        return false;
                    });
                }
            },
            initialStyle: function () {
                var $this = this;
                if (settings.mode === 'fade') {
                    settings.autoWidth = false;
                    settings.slideEndAnimation = false;
                }
                if (settings.auto) {
                    settings.slideEndAnimation = false;
                }
                if (settings.autoWidth) {
                    settings.slideMove = 1;
                    settings.item = 1;
                }
                if (settings.loop) {
                    settings.slideMove = 1;
                    settings.freeMove = false;
                }
                settings.onBeforeStart.call(this, $el);
                refresh.chbreakpoint();
                $el.addClass('lightSlider').wrap('<div class="lSSlideOuter ' + settings.addClass + '"><div class="lSSlideWrapper"></div></div>');
                $slide = $el.parent('.lSSlideWrapper');
                if (settings.rtl === true) {
                    $slide.parent().addClass('lSrtl');
                }
                if (settings.vertical) {
                    $slide.parent().addClass('vertical');
                    elSize = settings.verticalHeight;
                    $slide.css('height', elSize + 'px');
                } else {
                    elSize = $el.outerWidth();
                }
                $children.addClass('lslide');
                if (settings.loop === true && settings.mode === 'slide') {
                    refresh.calSW();
                    refresh.clone = function () {
                        if (refresh.calWidth(true) > elSize) {
                            /**/
                            var tWr = 0,
                                tI = 0;
                            for (var k = 0; k < $children.length; k++) {
                                tWr += (parseInt($el.find('.lslide').eq(k).width()) + settings.slideMargin);
                                tI++;
                                if (tWr >= (elSize + settings.slideMargin)) {
                                    break;
                                }
                            }
                            var tItem = settings.autoWidth === true ? tI : settings.item;

                            /**/
                            if (tItem < $el.find('.clone.left').length) {
                                for (var i = 0; i < $el.find('.clone.left').length - tItem; i++) {
                                    $children.eq(i).remove();
                                }
                            }
                            if (tItem < $el.find('.clone.right').length) {
                                for (var j = $children.length - 1; j > ($children.length - 1 - $el.find('.clone.right').length); j--) {
                                    scene--;
                                    $children.eq(j).remove();
                                }
                            }
                            /**/
                            for (var n = $el.find('.clone.right').length; n < tItem; n++) {
                                $el.find('.lslide').eq(n).clone().removeClass('lslide').addClass('clone right').appendTo($el);
                                scene++;
                            }
                            for (var m = $el.find('.lslide').length - $el.find('.clone.left').length; m > ($el.find('.lslide').length - tItem); m--) {
                                $el.find('.lslide').eq(m - 1).clone().removeClass('lslide').addClass('clone left').prependTo($el);
                            }
                            $children = $el.children();
                        } else {
                            if ($children.hasClass('clone')) {
                                $el.find('.clone').remove();
                                $this.move($el, 0);
                            }
                        }
                    };
                    refresh.clone();
                }
                refresh.sSW = function () {
                    length = $children.length;
                    if (settings.rtl === true && settings.vertical === false) {
                        gutter = 'margin-left';
                    }
                    if (settings.autoWidth === false) {
                        $children.css(property, slideWidth + 'px');
                    }
                    $children.css(gutter, settings.slideMargin + 'px');
                    w = refresh.calWidth(false);
                    $el.css(property, w + 'px');
                    if (settings.loop === true && settings.mode === 'slide') {
                        if (on === false) {
                            scene = $el.find('.clone.left').length;
                        }
                    }
                };
                refresh.calL = function () {
                    $children = $el.children();
                    length = $children.length;
                };
                if (this.doCss()) {
                    $slide.addClass('usingCss');
                }
                refresh.calL();
                if (settings.mode === 'slide') {
                    refresh.calSW();
                    refresh.sSW();
                    if (settings.loop === true) {
                        slideValue = $this.slideValue();
                        this.move($el, slideValue);
                    }
                    if (settings.vertical === false) {
                        this.setHeight($el, false);
                    }

                } else {
                    this.setHeight($el, true);
                    $el.addClass('lSFade');
                    if (!this.doCss()) {
                        $children.fadeOut(0);
                        $children.eq(scene).fadeIn(0);
                    }
                }
                if (settings.loop === true && settings.mode === 'slide') {
                    $children.eq(scene).addClass('active');
                } else {
                    $children.first().addClass('active');
                }
            },
            pager: function () {
                var $this = this;
                refresh.createPager = function () {
                    thumbWidth = (elSize - ((settings.thumbItem * (settings.thumbMargin)) - settings.thumbMargin)) / settings.thumbItem;
                    var $children = $slide.find('.lslide');
                    var length = $slide.find('.lslide').length;
                    var i = 0,
                        pagers = '',
                        v = 0;
                    for (i = 0; i < length; i++) {
                        if (settings.mode === 'slide') {
                            // calculate scene * slide value
                            if (!settings.autoWidth) {
                                v = i * ((slideWidth + settings.slideMargin) * settings.slideMove);
                            } else {
                                v += ((parseInt($children.eq(i).width()) + settings.slideMargin) * settings.slideMove);
                            }
                        }
                        var thumb = $children.eq(i * settings.slideMove).attr('data-thumb');
                        if (settings.gallery === true) {
                            pagers += '<li style="width:100%;' + property + ':' + thumbWidth + 'px;' + gutter + ':' + settings.thumbMargin + 'px"><a href="#"><img src="' + thumb + '" /></a></li>';
                        } else {
                            pagers += '<li><a href="#">' + (i + 1) + '</a></li>';
                        }
                        if (settings.mode === 'slide') {
                            if ((v) >= w - elSize - settings.slideMargin) {
                                i = i + 1;
                                var minPgr = 2;
                                if (settings.autoWidth) {
                                    pagers += '<li><a href="#">' + (i + 1) + '</a></li>';
                                    minPgr = 1;
                                }
                                if (i < minPgr) {
                                    pagers = null;
                                    $slide.parent().addClass('noPager');
                                } else {
                                    $slide.parent().removeClass('noPager');
                                }
                                break;
                            }
                        }
                    }
                    var $cSouter = $slide.parent();
                    $cSouter.find('.lSPager').html(pagers); 
                    if (settings.gallery === true) {
                        if (settings.vertical === true) {
                            // set Gallery thumbnail width
                            $cSouter.find('.lSPager').css('width', settings.vThumbWidth + 'px');
                        }
                        pagerWidth = (i * (settings.thumbMargin + thumbWidth)) + 0.5;
                        $cSouter.find('.lSPager').css({
                            property: pagerWidth + 'px',
                            'transition-duration': settings.speed + 'ms'
                        });
                        if (settings.vertical === true) {
                            $slide.parent().css('padding-right', (settings.vThumbWidth + settings.galleryMargin) + 'px');
                        }
                        $cSouter.find('.lSPager').css(property, pagerWidth + 'px');
                    }
                    var $pager = $cSouter.find('.lSPager').find('li');
                    $pager.first().addClass('active');
                    $pager.on('click', function () {
                        if (settings.loop === true && settings.mode === 'slide') {
                            scene = scene + ($pager.index(this) - $cSouter.find('.lSPager').find('li.active').index());
                        } else {
                            scene = $pager.index(this);
                        }
                        $el.mode(false);
                        if (settings.gallery === true) {
                            $this.slideThumb();
                        }
                        return false;
                    });
                };
                if (settings.pager) {
                    var cl = 'lSpg';
                    if (settings.gallery) {
                        cl = 'lSGallery';
                    }
                    $slide.after('<ul class="lSPager ' + cl + '"></ul>');
                    var gMargin = (settings.vertical) ? 'margin-left' : 'margin-top';
                    $slide.parent().find('.lSPager').css(gMargin, settings.galleryMargin + 'px');
                    refresh.createPager();
                }

                setTimeout(function () {
                    refresh.init();
                }, 0);
            },
            setHeight: function (ob, fade) {
                var obj = null,
                    $this = this;
                if (settings.loop) {
                    obj = ob.children('.lslide ').first();
                } else {
                    obj = ob.children().first();
                }
                var setCss = function () {
                    var tH = obj.outerHeight(),
                        tP = 0,
                        tHT = tH;
                    if (fade) {
                        tH = 0;
                        tP = ((tHT) * 100) / elSize;
                    }
                    ob.css({
                        'height': tH + 'px',
                        'padding-bottom': tP + '%'
                    });
                };
                setCss();
                if (obj.find('img').length) {
                    if ( obj.find('img')[0].complete) {
                        setCss();
                        if (!interval) {
                            $this.auto();
                        }   
                    }else{
                        obj.find('img').load(function () {
                            setTimeout(function () {
                                setCss();
                                if (!interval) {
                                    $this.auto();
                                }
                            }, 100);
                        });
                    }
                }else{
                    if (!interval) {
                        $this.auto();
                    }
                }
            },
            active: function (ob, t) {
                if (this.doCss() && settings.mode === 'fade') {
                    $slide.addClass('on');
                }
                var sc = 0;
                if (scene * settings.slideMove < length) {
                    ob.removeClass('active');
                    if (!this.doCss() && settings.mode === 'fade' && t === false) {
                        ob.fadeOut(settings.speed);
                    }
                    if (t === true) {
                        sc = scene;
                    } else {
                        sc = scene * settings.slideMove;
                    }
                    //t === true ? sc = scene : sc = scene * settings.slideMove;
                    var l, nl;
                    if (t === true) {
                        l = ob.length;
                        nl = l - 1;
                        if (sc + 1 >= l) {
                            sc = nl;
                        }
                    }
                    if (settings.loop === true && settings.mode === 'slide') {
                        //t === true ? sc = scene - $el.find('.clone.left').length : sc = scene * settings.slideMove;
                        if (t === true) {
                            sc = scene - $el.find('.clone.left').length;
                        } else {
                            sc = scene * settings.slideMove;
                        }
                        if (t === true) {
                            l = ob.length;
                            nl = l - 1;
                            if (sc + 1 === l) {
                                sc = nl;
                            } else if (sc + 1 > l) {
                                sc = 0;
                            }
                        }
                    }

                    if (!this.doCss() && settings.mode === 'fade' && t === false) {
                        ob.eq(sc).fadeIn(settings.speed);
                    }
                    ob.eq(sc).addClass('active');
                } else {
                    ob.removeClass('active');
                    ob.eq(ob.length - 1).addClass('active');
                    if (!this.doCss() && settings.mode === 'fade' && t === false) {
                        ob.fadeOut(settings.speed);
                        ob.eq(sc).fadeIn(settings.speed);
                    }
                }
            },
            move: function (ob, v) {
                if (settings.rtl === true) {
                    v = -v;
                }
                if (this.doCss()) {
                    if (settings.vertical === true) {
                        ob.css({
                            'transform': 'translate3d(0px, ' + (-v) + 'px, 0px)',
                            '-webkit-transform': 'translate3d(0px, ' + (-v) + 'px, 0px)'
                        });
                    } else {
                        ob.css({
                            'transform': 'translate3d(' + (-v) + 'px, 0px, 0px)',
                            '-webkit-transform': 'translate3d(' + (-v) + 'px, 0px, 0px)',
                        });
                    }
                } else {
                    if (settings.vertical === true) {
                        ob.css('position', 'relative').animate({
                            top: -v + 'px'
                        }, settings.speed, settings.easing);
                    } else {
                        ob.css('position', 'relative').animate({
                            left: -v + 'px'
                        }, settings.speed, settings.easing);
                    }
                }
                var $thumb = $slide.parent().find('.lSPager').find('li');
                this.active($thumb, true);
            },
            fade: function () {
                this.active($children, false);
                var $thumb = $slide.parent().find('.lSPager').find('li');
                this.active($thumb, true);
            },
            slide: function () {
                var $this = this;
                refresh.calSlide = function () {
                    if (w > elSize) {
                        slideValue = $this.slideValue();
                        $this.active($children, false);
                        if ((slideValue) > w - elSize - settings.slideMargin) {
                            slideValue = w - elSize - settings.slideMargin;
                        } else if (slideValue < 0) {
                            slideValue = 0;
                        }
                        $this.move($el, slideValue);
                        if (settings.loop === true && settings.mode === 'slide') {
                            if (scene >= (length - ($el.find('.clone.left').length / settings.slideMove))) {
                                $this.resetSlide($el.find('.clone.left').length);
                            }
                            if (scene === 0) {
                                $this.resetSlide($slide.find('.lslide').length);
                            }
                        }
                    }
                };
                refresh.calSlide();
            },
            resetSlide: function (s) {
                var $this = this;
                $slide.find('.lSAction a').addClass('disabled');
                setTimeout(function () {
                    scene = s;
                    $slide.css('transition-duration', '0ms');
                    slideValue = $this.slideValue();
                    $this.active($children, false);
                    plugin.move($el, slideValue);
                    setTimeout(function () {
                        $slide.css('transition-duration', settings.speed + 'ms');
                        $slide.find('.lSAction a').removeClass('disabled');
                    }, 50);
                }, settings.speed + 100);
            },
            slideValue: function () {
                var _sV = 0;
                if (settings.autoWidth === false) {
                    _sV = scene * ((slideWidth + settings.slideMargin) * settings.slideMove);
                } else {
                    _sV = 0;
                    for (var i = 0; i < scene; i++) {
                        _sV += (parseInt($children.eq(i).width()) + settings.slideMargin);
                    }
                }
                return _sV;
            },
            slideThumb: function () {
                var position;
                switch (settings.currentPagerPosition) {
                case 'left':
                    position = 0;
                    break;
                case 'middle':
                    position = (elSize / 2) - (thumbWidth / 2);
                    break;
                case 'right':
                    position = elSize - thumbWidth;
                }
                var sc = scene - $el.find('.clone.left').length;
                var $pager = $slide.parent().find('.lSPager');
                if (settings.mode === 'slide' && settings.loop === true) {
                    if (sc >= $pager.children().length) {
                        sc = 0;
                    } else if (sc < 0) {
                        sc = $pager.children().length;
                    }
                }
                var thumbSlide = sc * ((thumbWidth + settings.thumbMargin)) - (position);
                if ((thumbSlide + elSize) > pagerWidth) {
                    thumbSlide = pagerWidth - elSize - settings.thumbMargin;
                }
                if (thumbSlide < 0) {
                    thumbSlide = 0;
                }
                this.move($pager, thumbSlide);
            },
            auto: function () {
                if (settings.auto) {
                    clearInterval(interval);
                    interval = setInterval(function () {
                        $el.goToNextSlide();
                    }, settings.pause);
                }
            },
            pauseOnHover: function(){
                var $this = this;
                if (settings.auto && settings.pauseOnHover) {
                    $slide.on('mouseenter', function(){
                        $(this).addClass('ls-hover');
                        $el.pause();
                        settings.auto = true;
                    });
                    $slide.on('mouseleave',function(){
                        $(this).removeClass('ls-hover');
                        if (!$slide.find('.lightSlider').hasClass('lsGrabbing')) {
                            $this.auto();
                        }
                    });
                }
            },
            touchMove: function (endCoords, startCoords) {
                $slide.css('transition-duration', '0ms');
                if (settings.mode === 'slide') {
                    var distance = endCoords - startCoords;
                    var swipeVal = slideValue - distance;
                    if ((swipeVal) >= w - elSize - settings.slideMargin) {
                        if (settings.freeMove === false) {
                            swipeVal = w - elSize - settings.slideMargin;
                        } else {
                            var swipeValT = w - elSize - settings.slideMargin;
                            swipeVal = swipeValT + ((swipeVal - swipeValT) / 5);

                        }
                    } else if (swipeVal < 0) {
                        if (settings.freeMove === false) {
                            swipeVal = 0;
                        } else {
                            swipeVal = swipeVal / 5;
                        }
                    }
                    this.move($el, swipeVal);
                }
            },

            touchEnd: function (distance) {
                $slide.css('transition-duration', settings.speed + 'ms');
                if (settings.mode === 'slide') {
                    var mxVal = false;
                    var _next = true;
                    slideValue = slideValue - distance;
                    if ((slideValue) > w - elSize - settings.slideMargin) {
                        slideValue = w - elSize - settings.slideMargin;
                        if (settings.autoWidth === false) {
                            mxVal = true;
                        }
                    } else if (slideValue < 0) {
                        slideValue = 0;
                    }
                    var gC = function (next) {
                        var ad = 0;
                        if (!mxVal) {
                            if (next) {
                                ad = 1;
                            }
                        }
                        if (!settings.autoWidth) {
                            var num = slideValue / ((slideWidth + settings.slideMargin) * settings.slideMove);
                            scene = parseInt(num) + ad;
                            if (slideValue >= (w - elSize - settings.slideMargin)) {
                                if (num % 1 !== 0) {
                                    scene++;
                                }
                            }
                        } else {
                            var tW = 0;
                            for (var i = 0; i < $children.length; i++) {
                                tW += (parseInt($children.eq(i).width()) + settings.slideMargin);
                                scene = i + ad;
                                if (tW >= slideValue) {
                                    break;
                                }
                            }
                        }
                    };
                    if (distance >= settings.swipeThreshold) {
                        gC(false);
                        _next = false;
                    } else if (distance <= -settings.swipeThreshold) {
                        gC(true);
                        _next = false;
                    }
                    $el.mode(_next);
                    this.slideThumb();
                } else {
                    if (distance >= settings.swipeThreshold) {
                        $el.goToPrevSlide();
                    } else if (distance <= -settings.swipeThreshold) {
                        $el.goToNextSlide();
                    }
                }
            },



            enableDrag: function () {
                var $this = this;
                if (!isTouch) {
                    var startCoords = 0,
                        endCoords = 0,
                        isDraging = false;
                    $slide.find('.lightSlider').addClass('lsGrab');
                    $slide.on('mousedown', function (e) {
                        if (w < elSize) {
                            if (w !== 0) {
                                return false;
                            }
                        }
                        if ($(e.target).attr('class') !== ('lSPrev') && $(e.target).attr('class') !== ('lSNext')) {
                            startCoords = (settings.vertical === true) ? e.pageY : e.pageX;
                            isDraging = true;
                            if (e.preventDefault) {
                                e.preventDefault();
                            } else {
                                e.returnValue = false;
                            }
                            // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
                            $slide.scrollLeft += 1;
                            $slide.scrollLeft -= 1;
                            // *
                            $slide.find('.lightSlider').removeClass('lsGrab').addClass('lsGrabbing');
                            clearInterval(interval);
                        }
                    });
                    $(window).on('mousemove', function (e) {
                        if (isDraging) {
                            endCoords = (settings.vertical === true) ? e.pageY : e.pageX;
                            $this.touchMove(endCoords, startCoords);
                        }
                    });
                    $(window).on('mouseup', function (e) {
                        if (isDraging) {
                            $slide.find('.lightSlider').removeClass('lsGrabbing').addClass('lsGrab');
                            isDraging = false;
                            endCoords = (settings.vertical === true) ? e.pageY : e.pageX;
                            var distance = endCoords - startCoords;
                            if (Math.abs(distance) >= settings.swipeThreshold) {
                                $(window).on('click.ls', function (e) {
                                    if (e.preventDefault) {
                                        e.preventDefault();
                                    } else {
                                        e.returnValue = false;
                                    }
                                    e.stopImmediatePropagation();
                                    e.stopPropagation();
                                    $(window).off('click.ls');
                                });
                            }

                            $this.touchEnd(distance);

                        }
                    });
                }
            },




            enableTouch: function () {
                var $this = this;
                if (isTouch) {
                    var startCoords = {},
                        endCoords = {};
                    $slide.on('touchstart', function (e) {
                        endCoords = e.originalEvent.targetTouches[0];
                        startCoords.pageX = e.originalEvent.targetTouches[0].pageX;
                        startCoords.pageY = e.originalEvent.targetTouches[0].pageY;
                        clearInterval(interval);
                    });
                    $slide.on('touchmove', function (e) {
                        if (w < elSize) {
                            if (w !== 0) {
                                return false;
                            }
                        }
                        var orig = e.originalEvent;
                        endCoords = orig.targetTouches[0];
                        var xMovement = Math.abs(endCoords.pageX - startCoords.pageX);
                        var yMovement = Math.abs(endCoords.pageY - startCoords.pageY);
                        if (settings.vertical === true) {
                            if ((yMovement * 3) > xMovement) {
                                e.preventDefault();
                            }
                            $this.touchMove(endCoords.pageY, startCoords.pageY);
                        } else {
                            if ((xMovement * 3) > yMovement) {
                                e.preventDefault();
                            }
                            $this.touchMove(endCoords.pageX, startCoords.pageX);
                        }

                    });
                    $slide.on('touchend', function () {
                        if (w < elSize) {
                            if (w !== 0) {
                                return false;
                            }
                        }
                        var distance;
                        if (settings.vertical === true) {
                            distance = endCoords.pageY - startCoords.pageY;
                        } else {
                            distance = endCoords.pageX - startCoords.pageX;
                        }
                        $this.touchEnd(distance);
                    });
                }
            },
            build: function () {
                var $this = this;
                $this.initialStyle();
                if (this.doCss()) {

                    if (settings.enableTouch === true) {
                        $this.enableTouch();
                    }
                    if (settings.enableDrag === true) {
                        $this.enableDrag();
                    }
                }

                $(window).on('focus', function(){
                    $this.auto();
                });
                
                $(window).on('blur', function(){
                    clearInterval(interval);
                });

                $this.pager();
                $this.pauseOnHover();
                $this.controls();
                $this.keyPress();
            }
        };
        plugin.build();
        refresh.init = function () {
            refresh.chbreakpoint();
            if (settings.vertical === true) {
                if (settings.item > 1) {
                    elSize = settings.verticalHeight;
                } else {
                    elSize = $children.outerHeight();
                }
                $slide.css('height', elSize + 'px');
            } else {
                elSize = $slide.outerWidth();
            }
            if (settings.loop === true && settings.mode === 'slide') {
                refresh.clone();
            }
            refresh.calL();
            if (settings.mode === 'slide') {
                $el.removeClass('lSSlide');
            }
            if (settings.mode === 'slide') {
                refresh.calSW();
                refresh.sSW();
            }
            setTimeout(function () {
                if (settings.mode === 'slide') {
                    $el.addClass('lSSlide');
                }
            }, 1000);
            if (settings.pager) {
                refresh.createPager();
            }
            if (settings.adaptiveHeight === true && settings.vertical === false) {
                $el.css('height', $children.eq(scene).outerHeight(true));
            }
            if (settings.adaptiveHeight === false) {
                if (settings.mode === 'slide') {
                    if (settings.vertical === false) {
                        plugin.setHeight($el, false);
                    }else{
                        plugin.auto();
                    }
                } else {
                    plugin.setHeight($el, true);
                }
            }
            if (settings.gallery === true) {
                plugin.slideThumb();
            }
            if (settings.mode === 'slide') {
                plugin.slide();
            }
            if (settings.autoWidth === false) {
                if ($children.length <= settings.item) {
                    $slide.find('.lSAction').hide();
                } else {
                    $slide.find('.lSAction').show();
                }
            } else {
                if ((refresh.calWidth(false) < elSize) && (w !== 0)) {
                    $slide.find('.lSAction').hide();
                } else {
                    $slide.find('.lSAction').show();
                }
            }
        };
        $el.goToPrevSlide = function () {
            if (scene > 0) {
                settings.onBeforePrevSlide.call(this, $el, scene);
                scene--;
                $el.mode(false);
                if (settings.gallery === true) {
                    plugin.slideThumb();
                }
            } else {
                if (settings.loop === true) {
                    settings.onBeforePrevSlide.call(this, $el, scene);
                    if (settings.mode === 'fade') {
                        var l = (length - 1);
                        scene = parseInt(l / settings.slideMove);
                    }
                    $el.mode(false);
                    if (settings.gallery === true) {
                        plugin.slideThumb();
                    }
                } else if (settings.slideEndAnimation === true) {
                    $el.addClass('leftEnd');
                    setTimeout(function () {
                        $el.removeClass('leftEnd');
                    }, 400);
                }
            }
        };
        $el.goToNextSlide = function () {
            var nextI = true;
            if (settings.mode === 'slide') {
                var _slideValue = plugin.slideValue();
                nextI = _slideValue < w - elSize - settings.slideMargin;
            }
            if (((scene * settings.slideMove) < length - settings.slideMove) && nextI) {
                settings.onBeforeNextSlide.call(this, $el, scene);
                scene++;
                $el.mode(false);
                if (settings.gallery === true) {
                    plugin.slideThumb();
                }
            } else {
                if (settings.loop === true) {
                    settings.onBeforeNextSlide.call(this, $el, scene);
                    scene = 0;
                    $el.mode(false);
                    if (settings.gallery === true) {
                        plugin.slideThumb();
                    }
                } else if (settings.slideEndAnimation === true) {
                    $el.addClass('rightEnd');
                    setTimeout(function () {
                        $el.removeClass('rightEnd');
                    }, 400);
                }
            }
        };
        $el.mode = function (_touch) {
            if (settings.adaptiveHeight === true && settings.vertical === false) {
                $el.css('height', $children.eq(scene).outerHeight(true));
            }
            if (on === false) {
                if (settings.mode === 'slide') {
                    if (plugin.doCss()) {
                        $el.addClass('lSSlide');
                        if (settings.speed !== '') {
                            $slide.css('transition-duration', settings.speed + 'ms');
                        }
                        if (settings.cssEasing !== '') {
                            $slide.css('transition-timing-function', settings.cssEasing);
                        }
                    }
                } else {
                    if (plugin.doCss()) {
                        if (settings.speed !== '') {
                            $el.css('transition-duration', settings.speed + 'ms');
                        }
                        if (settings.cssEasing !== '') {
                            $el.css('transition-timing-function', settings.cssEasing);
                        }
                    }
                }
            }
            if (!_touch) {
                settings.onBeforeSlide.call(this, $el, scene);
            }
            if (settings.mode === 'slide') {
                plugin.slide();
            } else {
                plugin.fade();
            }
            if (!$slide.hasClass('ls-hover')) {
                plugin.auto();
            }
            setTimeout(function () {
                if (!_touch) {
                    settings.onAfterSlide.call(this, $el, scene);
                }
            }, settings.speed);
            on = true;
        };
        $el.play = function () {
            $el.goToNextSlide();
            settings.auto = true;
            plugin.auto();
        };
        $el.pause = function () {
            settings.auto = false;
            clearInterval(interval);
        };
        $el.refresh = function () {
            refresh.init();
        };
        $el.getCurrentSlideCount = function () {
            var sc = scene;
            if (settings.loop) {
                var ln = $slide.find('.lslide').length,
                    cl = $el.find('.clone.left').length;
                if (scene <= cl - 1) {
                    sc = ln + (scene - cl);
                } else if (scene >= (ln + cl)) {
                    sc = scene - ln - cl;
                } else {
                    sc = scene - cl;
                }
            }
            return sc + 1;
        }; 
        $el.getTotalSlideCount = function () {
            return $slide.find('.lslide').length;
        };
        $el.goToSlide = function (s) {
            if (settings.loop) {
                scene = (s + $el.find('.clone.left').length - 1);
            } else {
                scene = s;
            }
            $el.mode(false);
            if (settings.gallery === true) {
                plugin.slideThumb();
            }
        };
        $el.destroy = function () {
            if ($el.lightSlider) {
                $el.goToPrevSlide = function(){};
                $el.goToNextSlide = function(){};
                $el.mode = function(){};
                $el.play = function(){};
                $el.pause = function(){};
                $el.refresh = function(){};
                $el.getCurrentSlideCount = function(){};
                $el.getTotalSlideCount = function(){};
                $el.goToSlide = function(){}; 
                $el.lightSlider = null;
                refresh = {
                    init : function(){}
                };
                $el.parent().parent().find('.lSAction, .lSPager').remove();
                $el.removeClass('lightSlider lSFade lSSlide lsGrab lsGrabbing leftEnd right').removeAttr('style').unwrap().unwrap();
                $el.children().removeAttr('style');
                $children.removeClass('lslide active');
                $el.find('.clone').remove();
                $children = null;
                interval = null;
                on = false;
                scene = 0;
            }

        };
        setTimeout(function () {
            settings.onSliderLoad.call(this, $el);
        }, 10);
        $(window).on('resize orientationchange', function (e) {
            setTimeout(function () {
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
                refresh.init();
            }, 200);
        });
        return this;
    };
}(jQuery));