Ext.define("JS.article.AdvancedSearchAdmin", {
    extend: "Xfr.Component",
    requires: [],
    config: {
        slimscroll: false
    },
    initialize: function () {

        console.log("initializing advanced search");
        var me = this;

        me.on({
            afterrendertpl: {
                scope: me,
                fn: "onAfterRenderTpl"
            }
        });

        this.callParent();

        //$('#form_pme').select2({
        //    ajax: select2AjaxConfig('api_v1_get_pmes'),
        //    escapeMarkup: function (markup) {
        //        return markup;
        //    },
        //    placeholder: "Sélection PME",
        //    allowClear: true,
        //    minimumInputLength: 1,
        //    templateResult: function (data) {
        //        if (null != data && undefined != data) {
        //            if (data.rso) {
        //                return data.id + '-' + data.rso;
        //            }
        //            else {
        //                return data.text;
        //            }
        //        }
        //        return null;
        //    },
        //    templateSelection: function (data) {
        //        if (null != data && undefined != data) {
        //            if (data.rso) {
        //                return data.id + '-' + data.rso;
        //            }
        //            else {
        //                return data.text;
        //            }
        //        }
        //        return null;
        //    }
        //});

    },
    onAfterRenderTpl: function (me) {
        var me = this;

        //console.log("after render tpl filter form");

        $('#filter-all-date-creation').daterangepicker(
            {
                autoUpdateInput: false,
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                startDate: moment().subtract(29, 'days'),
                endDate: moment(),
                "locale": {
                    "format": "DD/MM/YYYY",
                    cancelLabel: 'Clear'
                }
            }
        );



        $('#filter-all-date-creation').on('apply.daterangepicker', function(ev, picker) {
            $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
        });

        $('#filter-all-date-creation').on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('');
        });


        $('#filter-all-date-soummission').daterangepicker(
            {
                autoUpdateInput: false,
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                startDate: moment().subtract(29, 'days'),
                endDate: moment(),
                "locale": {
                    "format": "DD/MM/YYYY",
                    cancelLabel: 'Clear'
                }
            }
        );

        $('#filter-all-date-soummission').on('apply.daterangepicker', function(ev, picker) {
            $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
        });

        $('#filter-all-date-soummission').on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('');
        });


        $("#article-form_status").select2({
            placeholder: 'Select a status',
            allowClear: true,
            ajax: {
                url: Routing.generate('get_status_list', {
                    _format:'json'
                }),
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used
                    params.page = params.page || 1;

                    return {
                        results: data.data,
                        pagination: {
                            more: (params.page * 30) < data.recordsFiltered
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
            minimumInputLength: 0,
            templateResult: function(data){
                console.log(data);
                return data.id+" "+data.libelle;
            }, // omitted for brevity, see the source of this page
            templateSelection: function (data){
                console.log(data);
                if(data && data.id){
                    return data.id+" "+data.libelle;
                }
                return data.text;
            } // omitted for brevity, see the source of this page
        });



        $("#article-form_categorie").select2({
            placeholder: 'Select a category',
            allowClear: true,
            ajax: {
                url: Routing.generate('get_categories', {
                    _format:'json'
                }),
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used
                    params.page = params.page || 1;

                    return {
                        results: data.data,
                        pagination: {
                            more: (params.page * 30) < data.recordsFiltered
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
            minimumInputLength: 1,
            templateResult: function(data){
                console.log(data);
                return data.id+" "+data.intitule;
            }, // omitted for brevity, see the source of this page
            templateSelection: function (data){
                console.log(data);
                if(data && data.id){
                    return data.id+" "+data.intitule;
                }
                return data.text;
            } // omitted for brevity, see the source of this page
        });

        $("#article-form_type").select2({
            placeholder: 'Select an article type',
            allowClear: true,
            ajax: {
                url: Routing.generate('get_typearticles', {
                    _format:'json'
                }),
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used
                    console.log("processing result");
                    console.log(data);
                    console.log(params);

                    params.page = params.page || 1;

                    return {
                        results: data.data,
                        pagination: {
                            more: (params.page * 30) < data.recordsFiltered
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
            minimumInputLength: 1,
            templateResult: function(data){
                console.log(data);
                return data.id+" "+data.libelle;
            }, // omitted for brevity, see the source of this page
            templateSelection: function (data){
                console.log(data);
                if(data && data.id){
                    return data.id+" "+data.libelle;
                }
                else{
                    return data.text;
                }

            } // omitted for brevity, see the source of this page
        });

        $("#article-form_author").select2({
            placeholder: 'Select an author',
            allowClear: true,
            ajax: {
                url: Routing.generate('get_auteurs', {
                    _format:'json'
                }),
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used
                    params.page = params.page || 1;

                    return {
                        results: data.data,
                        pagination: {
                            more: (params.page * 30) < data.recordsFiltered
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
            minimumInputLength: 1,
            templateResult: function(data){
                console.log(data);
                return data.id + " - "+ data.personne.prenom+ " " + data.personne.nom;
            }, // omitted for brevity, see the source of this page
            templateSelection: function (data){
                console.log(data);
                if(data && data.id){
                    return data.id + " - "+ data.personne.prenom+ " " + data.personne.nom;
                }
                return data.text;
            } // omitted for brevity, see the source of this page
        });


        $("#article-form_editor").select2({
            placeholder: 'Select an editor',
            allowClear: true,
            ajax: {
                url: Routing.generate('get_editors', {
                    _format:'json'
                }),
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used
                    params.page = params.page || 1;

                    return {
                        results: data.data,
                        pagination: {
                            more: (params.page * 30) < data.recordsFiltered
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
            minimumInputLength: 1,
            templateResult: function(data){
                console.log(data);
                return data.id + " - "+ data.personne.prenom+ " " + data.personne.nom;
            }, // omitted for brevity, see the source of this page
            templateSelection: function (data){
                console.log(data);
                if(data && data.id){
                    return data.id + " - "+ data.personne.prenom+ " " + data.personne.nom;
                }
                return data.text;
            } // omitted for brevity, see the source of this page
        });



        $("#article-form_reviewer").select2({
            placeholder: 'Select an reviewer',
            allowClear: true,
            ajax: {
                url: Routing.generate('get_reviewers', {
                    _format:'json'
                }),
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used
                    params.page = params.page || 1;

                    return {
                        results: data.data,
                        pagination: {
                            more: (params.page * 30) < data.recordsFiltered
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
            minimumInputLength: 1,
            templateResult: function(data){
                console.log(data);
                return data.id + " - "+ data.personne.prenom+ " " + data.personne.nom;
            }, // omitted for brevity, see the source of this page
            templateSelection: function (data){
                console.log(data);
                if(data && data.id){
                    return data.id + " - "+ data.personne.prenom+ " " + data.personne.nom;
                }
                return data.text;
            } // omitted for brevity, see the source of this page
        });

    }
});
