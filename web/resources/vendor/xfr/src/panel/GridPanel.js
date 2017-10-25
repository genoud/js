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
