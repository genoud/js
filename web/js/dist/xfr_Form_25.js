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
