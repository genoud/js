/**
 * Created by samuel on 27/06/2016.
 */
Ext.define('JS.panel.Form', {
    extend: 'Xfr.panel.Form',
    config: {
        //mode:"",
        //tplUrl: "",
        entityName: "",
        page: {
            title: null,
            data: null,
            parent: null
        },
        panelData: {
            formUrl: ""
        },
        previousPage: null,
        grid: null,
        form: null,
        view: null,
        formPane: null,
        record: null,
        fieldsToInit: [],
        formValidation: {},
        defaultSelect2Options: {},
        parentRecord: null,
        parentName: ""
    },
    initialize: function () {

        console.log("Initializing JS Base Form Class");
        var me = this;
        var panelData = me.getPanelData();
        //console.log("Initialize View");
        me.on({
            "afterrendertpl": {
                scope: me,
                fn: "onAfterRenderTpl"
            }
        });

        me.on({
            formsubmit: {
                scope: me,
                fn: "onFormSubmit"
            }
        });

        console.log(panelData);

        me.setConfig({
            defaultSelect2Options: JS.panel.Form.getDefaultSelect2Options(),
            maskOnItemsLoading: me.getMaskOnItemsLoading(),
            items: [{
                className: "Xfr.Component",
                //className: "Xfr.panel.Form",
                position: "[data-mode=edit]",
                dynamicTpl: false,
                tplUrl: panelData.formUrl,
                syncTplLoading: false,
                listeners: {
                    "loadtpl": {
                        scope: me,
                        fn: "onLoadFormTpl"
                    }
                }
            }]
        });


        this.callParent(arguments);


    },
    onFormSubmit:function(){
        console.log("submitting form JS App form");
    },
    //onAfterRenderTpl: function () {
    //    //console.log("after render tpl View");
    //    //this.update(this.config.record);
    //},
    showForm: function (record) {
        // console.log(record);
        var me = this;
        this.config.record = record;
        // var form=$("form[name='"+me.getEntityName()+"']",me.$this);
        if (!Ext.isEmpty(me.config.formPane)) {
            //me.config.formPane.updateData(record);
            me.setData(record);
            return;
        }



    },
    onLoadFormTpl: function (loadedCmp, tplObj) {

        var me = this,
                form = $("<div>" + tplObj.html + "</div>"),
                inputNotList = "",
                entityName = me.getEntityName(),
                fieldsToInit = me.getFieldsToInit();

        inputNotList += "[name*=_token]";
        inputNotList += ",[type=submit]";
        inputNotList += ",[type=reset]";

        if (!Ext.isEmpty(fieldsToInit)) {
            for (var i = 0; i < fieldsToInit.length; i++) {
                var field = fieldsToInit[i];
                if (field.xtype === "checkboxfieldgroup" && !Ext.isEmpty(field.selector)) {
                    var selector = field.selector + " input[type=checkbox]",
                            fieldContainer = $(field.selector, form).addClass("checkboxfieldgroup");
                    inputNotList += "," + selector;

                    if (field.type === "list") {
                        $(selector, form).each(function (i, field) {
                            var $field = $(field),
                                    $label = $field.next("label:first"),
                                    row = $('<div class="item"></div>');
                            $field.appendTo(row);
                            $label.appendTo(row);
                            row.appendTo(fieldContainer);
                        });
                    }

                }
            }
            ;
        }

        $("input:not(" + inputNotList + "), select, textarea", form).each(function (index, field) {
            var fieldName = $(field).attr("name");
            var model = "";
            if ($(field).attr("type") === "password") {
                model = me.getFieldModel(fieldName, entityName, true);
            } else {
                model = me.getFieldModel(fieldName, entityName);
            }

            fieldValue = "{{" + model + "}}";



            if ($(field).attr("type") === "file") {
            }

            $(field).attr("value", fieldValue);


        });

        tplObj.html = form.html();

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
    setDefaultSelectValue: function (val) {
        var me = this,
                form = $("form:first", me.$this);


        var fieldsToInit = me.getFieldsToInit(),
                checkboxToExclude = "";

        if (!Ext.isEmpty(fieldsToInit)) {
            for (var i = 0; i < fieldsToInit.length; i++) {
                var field = fieldsToInit[i];
                if (field.xtype === "select2" && !Ext.isEmpty(field.selector)) {
                    var $select = $(field.selector, form);
                    if (val) {
                        if (Ext.isEmpty($select.val())) {
                            $select.children('option:first').val(-1);
                            $select.val(-1);
                        }
                    } else {
                        if (Ext.isEmpty($select.val()) || $select.val() === -1) {
                            $select.children('option:first').val("");
                            $select.val("");
                        }
                    }

                }
            }
        }
    },
    statics: {
        getDefaultSelect2Options: function () {
            return {

                ajax: {
                    dataType: 'json',
                    delay: 250,
                    data: function (params, extraParams) {

                        var result = {};
                        if (!Ext.isEmpty(extraParams)) {
                            Ext.merge(result, extraParams);
                        }
                        return Ext.merge(result, {
                            "page": params.page,
                            "search[value]": params.term,
                            "length": 10
                        });
                    },

                    processResults: function (data, params) {
                        // console.log("prossResults");
                        // console.log(data);
                        // console.log(params);
                        params.page = params.page || 1;
                        return {
                            results: data.data,
                            pagination: {
                                more: (params.page * CAPV_MAX_PAGE_SIZE) < data.recordsFiltered
                            }
                        };
                    },
                    cache: true
                }
            };
        }
    },
    afterFormTplRendered: function () {
        console.log("after render form Erating");
        //var record=this.config.record;
        var me = this;
        /*if (!Ext.isEmpty(me.config.formPane)) {
         me.config.formPane.updateData(this.config.record);
         }*/
        var form = $("form:first", me.$this);

        form.on("submit", function (event) {
            console.log("preventing submit");
            event.preventDefault();
        });

        this.initFields();


        var validateOptions = me.getFormValidation();
        validateOptions.submitHandler = function () {
            //me.onFormSubmit(form);
            me.fireEvent("formsubmit", me);
        };
        if (!Ext.isEmpty(form)) {
            console.log("Validate options");
            console.log(validateOptions);
            form.validate(validateOptions);
        }

        $("input[type=checkbox]").iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
            increaseArea: '30%' // optional
        });


    },
    reset: function () {
        this.config.formPane.resetBinder();

    },
    update: function (record) {

        this.config.record = record;
        if (!Ext.isEmpty(this.config.formPane)) {
            this.config.formPane.updateData(this.config.record);
        }

    },
    initFields: function () {
        var me = this,
                form = $("form:first", me.$this);

        $("input[type=checkbox]", form).addClass("xfr-checkbox");

        var fieldsToInit = me.getFieldsToInit(),
                checkboxToExclude = "";
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

        if (me.config.parentRecord) {
            var parentField = $("#" + me.getEntityName() + "_" + me.config.parentName);
            if (parentField) {
                parentField.hide();
            }
        }

    },
    setData: function (data) {
        var me = this;
        me.update(data);
        me.callParent(arguments);
        me.bindSpecialFields(data);

    },
    bindSpecialFields: function (data) {

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
                    });

                } else if (field.xtype === "select2" && !Ext.isEmpty(field.selector)) {

                    var fieldData = Xfr.Utils.getObjectByKeypath(data, field.keyPath),
                            fieldValue = null,
                            displayValue = null,
                            $select = $(field.selector, form);
                    if (!Ext.isEmpty(fieldData)) {
                        fieldValue = fieldData[field.dataFieldValue];
                        displayValue = fieldValue + " - " + Xfr.Utils.getObjectByKeypath(fieldData, field.displayFieldValue);
                        me.setSelect2Value(field.selector, fieldValue, displayValue);
                    } else {
                        me.setSelect2Value(field.selector, '', field.options.placeholder);
                    }
                }

            }
        }
        $("input[type=checkbox]:not(" + checkboxToExclude + ")", form).each(function (i, item) {
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
        if (!Ext.isEmpty(value)) {
            if (!$select.children('option[value=' + value + ']').length > 0) {
                $select.append("<option value='" + value + "'>" + displayHtml + "</option>");
            }
        }

        var $spanSelect = $select.next(".select2.select2-container:first").find(".select2-selection__rendered");

        $spanSelect.html(displayHtml);

        $select.val(value);
    },
    iniSelect2Field: function (field, form) {

        var me = this;
        if (Ext.isEmpty(form) || form === undefined) {
            form = $("form:first", me.$this);
        }

        var options = Ext.merge({}, me.getDefaultSelect2Options());

        if (!Ext.isEmpty(field.tplClass)) {

            options.optionTpl = $("#" + Xfr.Utils.getCmpClassId(field.tplClass)).html();
            if (!Ext.isEmpty(options.optionTpl)) {

                options.templateResult = function (data, optionTpl) {

                    var bindObj = {};
                    if (typeof appConfig !== 'undefined') {
                        bindObj.appConfig = appConfig;
                    }
                    bindObj.data = data;

                    var ractive = new Ractive({
                        template: optionTpl,
                        data: bindObj
                    });
                    var toHtml = ractive.toHTML();
                    return $(toHtml);
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


