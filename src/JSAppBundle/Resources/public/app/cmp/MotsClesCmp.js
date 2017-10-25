/**
 * Created by maglo on 08/09/2016.
 */
Ext.define("JS.cmp.MotsClesCmp", {
    //extend: "JS.panel.Form",
    extend: "Xfr.Component",
    config: {
        dynamicTpl: false,
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
        eventBound:false,
        action:"",
        article:null,
        title: 'View',
        subtitle: '',
        motcles: [],
        jsApp:null
    },
    onLoadTpl: function () {
        var me = this;
        console.log("View tpl form loaded");
        me.callParent(arguments);

    },
    afterRenderTpl: function () {
        var me = this;
        me.callParent(arguments);

        //On set les données du template

        if(!me.getEventBound()){
            console.log("Event not yet bound");
            me.binder.on('add-keyword', function (e) {

                me.addKeyword();
            });
            me.binder.on('js-keypress', function (e) {

                if(e.original.which==13){
                    me.addKeyword();
                }
            });
            me.binder.on('delete-keyword', function (e) {
                console.log("delete button clicked");
                console.log(e);
                me.deleteKeyWord(e.index.index);
            });

            me.setEventBound(true);
        }
        else{
            console.log("Event already bound");
        }
        me.loadData();
    },
    loadData: function(){
        var me = this;
        var article=me.getArticle();
        var motsCles=article.motscles;
        var listeMots=[];
        var listeCouleur=[];
        var listeTaille=[];
        if(motsCles){
            listeMots=motsCles.split(';');
        }
        me.setMotcles(listeMots);
        var data={
            article: me.getArticle(),
            motscles: listeMots,
            newKeyword:"",
            getColor: function(index) {
                // validate hex strisng
                if(index<listeCouleur.length){
                    return listeCouleur[index];
                }
                console.log("Generating random color");
                var letters = '012345'.split('');
                var color = '#';
                if(index>5){
                    index=Math.round(Math.random() * 5);
                }
                color += index; //letters[Math.round(Math.random() * 5)];
                letters = '0123456789ABCDEF'.split('');
                for (var i = 0; i < 5; i++) {
                    color += letters[Math.round(Math.random() * 15)];
                }
                listeCouleur[listeCouleur.length]=color;
                return color;
            },
            getFontSize: function(index) {
                // validate hex strisng
                console.log("Generating random font size");

                if(index<listeTaille.length){
                    return listeTaille[index];
                }
                var fontSize = '%';

                index=Math.round(Math.random() * 60);

                index=index+80;

                fontSize=index+fontSize;

                listeTaille[listeTaille.length]=fontSize;

                return fontSize;
            }
        };
        me.setData(data);
    },
    addKeyword:function(){
        var me=this;
        var data=me.getData();
        newKeyWord=data.newKeyword;
        if(!me.containsKeyWord(newKeyWord)){
            var listeMotCles=me.getMotcles();
            if(newKeyWord && newKeyWord.trim()!=""){
                listeMotCles.push(newKeyWord);
                data.motscles=listeMotCles;
                data.newKeyword="";
                me.setData(data);
            }
        }

    },
    containsKeyWord:function(keyword){
        var me=this;
        var listeMotCles=me.getMotcles();
        for(var i=0; i<listeMotCles.length;i++){
            if(listeMotCles[i].toLowerCase()==keyword.toLowerCase()){
                return true;
            }
        }
        return false;
    },
    deleteKeyWord:function(index){
        var me=this;
        console.log(index);
        var listeMotCles=me.getMotcles();
        listeMotCles.splice(index, 1);
    },
    getExtraData:function(){
        var me=this;
        var listeMotCles=me.getMotcles();
        var strKeyWords= listeMotCles.join(";");
        me.getArticle().motscles=strKeyWords;
        return strKeyWords;

    },
    onShow: function () {
        var me = this;
        Xfr.log("View form rendered or shown");
        me.callParent(arguments);

    },
    initialize: function () {
        var me = this;
        console.log("Initialising View class");
        me.callParent(arguments);
    },
    statics: {

    }
});