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

