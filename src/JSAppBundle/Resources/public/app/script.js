/**
 * Created by magloire on 09/06/2016.
 */
(function () {

    //var footerHeight = $(".erating-footer").height();
    //
    //var mainContainerHeight=height-bannerHeight-footerHeight;
    //
    //$('.erating-midle-row').height(mainContainerHeight);


    Ext.Loader.setPath("Ext", baseUrl + "resources/vendor/touch/src");
    Ext.Loader.setPath("Xfr", baseUrl + "resources/vendor/xfr/src");
    Ext.Loader.setPath("JS", baseUrl + "bundles/jsapp/app");



    //console.log("Loading translations");

    Xfr.loadTranslations('fr');


    //console.log("creating app");




    var opt = {};
    opt.size = 64;
    opt.backgroundColor = "#898513";

    Xfr.Mask.show('Chargement...', opt, ".body");

    var height = document.documentElement.clientHeight;

    var bannerHeight = $(".loadmask-msg").height();

    var top = (height - bannerHeight) / 2;

    $(".loadmask-msg").css({
        position: "absolute",
        top: top + "px"
    });

    $.ajax({
        url: Routing.generate('get_app_config'),
        type: "GET",
        data: {},
        dataType: "json",
        success: function (response, textStatus, jqXHR) {
            //console.log(response);
            //console.log(textStatus);
            //console.log(jqXHR);
            //if (response.status==200) {
            //ERating.App.user=response.user;

            Xfr.Component.loadedTpls=response.tpls;
            console.log("Current Page Class from script", currentPageConfig);
            Ext.create("JS.App", {
                renderTo: "",
                user: response.user,
                currentPageConfig: currentPageConfig //"JS.utilisateur.Registration"
            });

            //Remove active class and current-page classes on menu items
            $("ul.nav.side-menu li.current-page").removeClass("current-page");
            $(".body").unmask();
            //} else {
            //
            //}


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("erreur lors du chargement des configurations de l'application", "Error ajax script.js");
            Xfr.log([textStatus,jqXHR,  errorThrown], "Error ajax script.js");
        }
    });








})();


var ERATING_MAX_PAGE_SIZE = 10;

var select2AjaxConfig = function (url, urlParam) {
    if (urlParam == undefined) {
        urlParam = {_locale: "fr"};
    }
    return {
        url: Routing.generate(url, urlParam),
        dataType: 'json',
        delay: 250,
        data: function (params) {
            params.page = params.page || 1
            return {
                q: params.term, // search term
                page: params.page,
                length: ERATING_MAX_PAGE_SIZE
            };
        },
        processResults: function (data, params) {
            params.page = params.page || 1
            return {
                results: data.data,
                pagination: {
                    more: params.page * ERATING_MAX_PAGE_SIZE < data.recordsTotal
                }
            };
        },
        cache: true
    }
};

var getDefaultSelect2Options = function () {
    return {
        // escapeMarkup: function(markup) {
        //     return markup;
        // },
        //minimumInputLength: 1,
        ajax: {
            dataType: 'json',
            delay: 250,
            data: function (params, extraParams) {
                //console.log("extraParams on data load");
                //                         console.log(params);
                //console.log(extraParams);
                // console.log(elt);
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
            // data: function(params) {
            //     console.log("Params");
            //     console.log(params);
            //     return {
            //         "page": params.page,
            //         "search[value]": params.term,
            //         "length": CAPV_MAX_PAGE_SIZE
            //     };
            // },
            processResults: function (data, params) {
                // console.log("prossResults");
                // console.log(data);
                // console.log(params);
                params.page = params.page || 1;
                return {
                    results: data.data,
                    pagination: {
                        more: (params.page * ERATING_MAX_PAGE_SIZE) < data.recordsFiltered
                    }
                };
            },
            cache: true
        }
    }
};

var addToList=function(liste, object){
    if(liste && liste.length>0){
        var found=false;
        for(var i=0;i<liste.length;i++){
            if(liste[i].id==object.id){
                found=true;
                break;
            }
        }
        if(!found){
            liste.push(object);
        }
    }
    else{
        liste.push(object);
    }

};

var removeFromList=function(liste, object){
    if(liste && liste.length>0){

        for(var i=0;i<liste.length;i++){
            if(liste[i].id==object.id){
                liste.splice(i,1);
                break;
            }
        }
    }

};


