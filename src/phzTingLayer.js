
var PhzTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_hongZi(0)){
                        checkTingCards_hongZi();
                    }2
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat || 
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        checkTingCards_hongZi();
                    }else{
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    }
                }
                // getPut2TingStats_hongZi();
            },
            mjhand: function() {
            },
            HZAddCards: function(){
                checkTingCards_hongZi();
            },
            HZPickCard: function(eD) {
                checkTingCards_hongZi();
                // getPut2TingStats_hongZi();
            },
            HZNewCard: function() {
                checkTingCards_hongZi();
            },
            MJPut: function() {
                checkTingCards_hongZi();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_hongZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_hongZi();
                }
                // getPut2TingStats_hongZi();
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_hongZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_hongZi();
                }

                // getPut2TingStats_hongZi();
            },
            HZGangCard: function(eD) {
                checkTingCards_hongZi();
            },
            HZWeiCard: function(eD) {
                checkTingCards_hongZi();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            showTingLayer : function(cards){
                if(MjClient.playui.tingLayer){ 
                    MjClient.playui.tingLayer.showTingCard(cards);
                    if(MjClient.playui.newTingLayer)
                        MjClient.playui.newTingLayer.visible = false;
                }
            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("phzTingLayer.json");
        this.addChild(UI.node);

        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;
 
        setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
        this.backX = this._back.x;
 

    },

    //显示听的牌
    showTingCard : function(cards){
        cc.log("showTingCard:", cards); 
        // cards = [1,2,3,4,5,6,7,8,9,10,21,22,23,24,25];//,26,27,28,29,30];
        if(cards && cards.length > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            var len = cards.length;
            if(len > 4){
                this._bg.width = 305 + (len - 4) * (45);
            }else{
                this._bg.width = 150 + (len -1) * 45;
            }
            this.width = this._bg.width;

            this._ting.x = 48 + (305 - this._bg.width) * 0.5
            var tx = 96 + (305 - this._bg.width) * 0.5;
            var ty = this._card.y;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card); 
                this._cardList.push(card);
                card.loadTexture(MjClient.cardPath_hongZi + "out" + cards[i] + ".png");
                card.visible = true;
                card.x = tx;
                card.y = ty; 
                tx += card.width + 5;
            }

            if((this.backX - this.width * this._back.getScale() * 0.5) < 0){
                this._back.x = this.width * 0.5 * this._back.getScale();
            }else{
                this._back.x = this.backX;
            }

        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
}) 

var PhzTingLayer_yongzhou = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_leiyang(0)){
                        checkTingCards_leiyang();
                    }
                }else if(MjClient.data.sData.tData.tState == TableState.waitEat || 
                        MjClient.data.sData.tData.tState == TableState.waitCard)
                {
                    checkTingCards_leiyang();
                }else if(MjClient.data.sData.tData.tState == TableState.roundFinish){
                    if(MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            HZAddCards: function(){
                checkTingCards_leiyang();
            },
            HZPickCard: function(eD) {
                checkTingCards_leiyang();
            },
            HZNewCard: function() {
                checkTingCards_leiyang();
            },
            MJPut: function() {
                checkTingCards_leiyang();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_leiyang(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_leiyang();
                }
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_leiyang(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_leiyang();
                }
            },
            HZGangCard: function(eD) {
                checkTingCards_leiyang();
            },
            HZWeiCard: function(eD) {
                checkTingCards_leiyang();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            endRoom: function(msg) {
                if(MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui){
                            MjClient.playui.tingLayer.visible = false;
                        }
                        
                    },500);
                    MjClient.playui.tingLayer.visible = false;
                }
            },
            showTingLayer : function(cards){
                if(MjClient.playui.tingLayer){
                    MjClient.playui.tingLayer.showTingCard(cards);
                }
                
            },
            HZCheckRaise: function(eD) {
                checkTingCards_leiyang();
            },

        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("phzTingLayer.json");
        this.addChild(UI.node);
        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        _back.setSwallowTouches(false);
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;

        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ || 
            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP){
            setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
        }else{
            setWgtLayout(_back, [305 / 1280, 0], [0.5, 0.825], [0, 0]);
        }
        

    },

    //显示听的牌
    showTingCard : function(cards){
        // cc.log("showTingCard:", cards);
        if(ziPai && (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)){
            if(ziPai.getTingPaiType() == 0){
                this.visible = false;
                return;
            }
        }

        if(MjClient.data.sData.tData.tState == TableState.roundFinish){
            this.visible = false;
            return;
        }
        // cards = [1];
        if(cards && cards.length > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            var len = cards.length;
            if(len > 4){
                this._bg.width = 305 + (len - 4) * (42);
            }else{
                this._bg.width = 150 + (len -1) * 42;
            }
            this.width = this._bg.width;

            this._ting.x = 48 + (305 - this._bg.width) * 0.5
            var tx = 96 + (305 - this._bg.width) * 0.5;
            var ty = this._card.y;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card);
                this._cardList.push(card);
                var path = MjClient.cardPath_leiyang;
                if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                    path = ziPai.getCardFilePath();
                }else if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
                    path = MjClient.cardPath_hengYang;
                }else if (MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
                    path = MjClient.cardPath_xiangxiang;
                }
                card.loadTexture(path + "out" + cards[i] + ".png");
                card.visible = true;
                card.x = tx;
                card.y = ty;

                tx += card.width + 5;
            }

        }else{
            this.visible = false;
            // cc.log("phzTingLayer.visible:", this.visible);
        }
    }
}) 

if(isYongZhouProject()){
    PhzTingLayer = PhzTingLayer_yongzhou;
}

// 新听牌效果  
var NewTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_hongZi(0)){
                        checkTingCards_hongZi();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat || 
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        newCheckTingCards_hongZi();
                    }
                    
                }
                getPut2TingStats_hongZi();
            },
            mjhand: function() {
                // getPut2TingStats_hongZi();
            },
            HZAddCards: function(){
                checkTingCards_hongZi();
            },
            HZPickCard: function(eD) {
                newCheckTingCards_hongZi();
                getPut2TingStats_hongZi();
            },
            HZNewCard: function() {
                checkTingCards_hongZi();
            },
            MJPut: function() {
                checkTingCards_hongZi();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_hongZi(0)){
                    MjClient.playui.newTingLayer.visible = false;
                }else{
                    checkTingCards_hongZi();
                }
                getPut2TingStats_hongZi();
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_hongZi(0)){
                    MjClient.playui.newTingLayer.visible = false;
                }else{
                    checkTingCards_hongZi();
                }

                getPut2TingStats_hongZi();
            },
            HZGangCard: function(eD) {
                checkTingCards_hongZi();
            },
            HZWeiCard: function(eD) {
                checkTingCards_hongZi();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.newTingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.newTingLayer){
                            MjClient.playui.newTingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.newTingLayer){
                        MjClient.playui.newTingLayer.visible = false;
                    }
                }
            },
            showNewTingLayer : function(cards){
                var tb = sData = MjClient.data.sData; 
                var pl = sData.players[SelfUid()]; 
                // 做状态修改
                if(MjClient.playui.newTingLayer && pl.mjState == TableState.waitPut){ 
                    MjClient.playui.newTingLayer.showNewTingCard(cards);  
                    if(MjClient.playui.tingLayer)
                        MjClient.playui.tingLayer.visible = false;
                }
                
            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("syNewTingLayer.json");
        this.addChild(UI.node);

        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._cardItem = this._back.getChildByName("cardItem"); 
        this._cardItem.visible = false;
  
        setWgtLayout(_back, [350 / 1280, 0], [0.5, 0.7], [0, 0]);
        

    },
 
    //显示听的牌
    showNewTingCard : function(cards){

          
        if(!curPlayerIsMe_hongZi(0) )
            return; 
        var len = 0;
        for (var index in cards) {
            len++;
        }

 
        // cards = [1];
        if(cards && len > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;
 
            this.width = this._bg.width;
 
            this._bg.width = 350;
            this._bg.height = 135;
            var subX = 0;
            var title =  this._back.getChildByName("title");
            var ty = this._cardItem.y; 
            if(len > 4 && len < 13){ 
                title.setPositionY(this._bg.height - 30);
                subX = ((len - 3)  * this._cardItem.width);
                this._bg.width = ( this._bg.width + subX);
            }else if(len >= 13){   

                subX = (10  * this._cardItem.width);
                this._bg.width = ( this._bg.width + subX); 
                this._bg.height = 220;
                ty += 40;

                title.setPositionY(this._bg.height - 65);
            }

            
            

            var tempLen = len > 13 ? 13 : len;
            var posX = this._bg.width / (tempLen +1); 
            
            var chText = ["零","一","二","三","四"];
            var indexX = 1; // X坐标数量 

            // for(var i = 0; i < len; i++){
            for (var id in cards) { 

                var card = this._cardItem.clone();
                this._back.addChild(card);
                this._cardList.push(card);  
                // var text = textData[cards[i] + ""];
                card.getChildByName("card").loadTexture(MjClient.cardPath_hongZi + "out" + id + ".png"); 
                card.getChildByName("text").setString("余" + chText[cards[id]] + "张" );
                card.visible = true;
                card.x = posX * indexX - (subX / 2);
                card.y = ty;
                if(indexX >= 13){
                    indexX = 0;
                    ty -= 85;
                }
                indexX++;
 
            }

        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});


var xyPhzTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_xyHongZi(0)){
                        checkTingCards_xyHongZi();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat || 
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        checkTingCards_xyHongZi();
                    }else{
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    }
                }
                // getPut2TingStats_xyHongZi();
            },
            mjhand: function() {
            },
            HZAddCards: function(){
                checkTingCards_xyHongZi();
            },
            HZPickCard: function(eD) {
                checkTingCards_xyHongZi();
                // getPut2TingStats_xyHongZi();
            },
            HZNewCard: function() {
                checkTingCards_xyHongZi();
            },
            MJPut: function() {
                checkTingCards_xyHongZi();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_xyHongZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_xyHongZi();
                }
                // getPut2TingStats_xyHongZi();
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_xyHongZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_xyHongZi();
                }

                // getPut2TingStats_xyHongZi();
            },
            HZGangCard: function(eD) {
                checkTingCards_xyHongZi();
            },
            HZWeiCard: function(eD) {
                checkTingCards_xyHongZi();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            showTingLayer : function(cards){
                if(MjClient.playui.tingLayer){ 
                    MjClient.playui.tingLayer.showTingCard(cards);
                    if(MjClient.playui.newTingLayer)
                        MjClient.playui.newTingLayer.visible = false;
                }
                
            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("phzTingLayer.json");
        this.addChild(UI.node);

        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;
 
        setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
        this.backX = this._back.x;
 

    },

    //显示听的牌
    showTingCard : function(cards){
        cc.log("showTingCard:", cards); 
        // cards = [1,2,3,4,5,6,7,8,9,10,21,22,23,24,25];//,26,27,28,29,30];
        if(cards && cards.length > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            var len = cards.length;
            if(len > 4){
                this._bg.width = 305 + (len - 4) * (45);
            }else{
                this._bg.width = 150 + (len -1) * 45;
            }
            this.width = this._bg.width;

            this._ting.x = 48 + (305 - this._bg.width) * 0.5
            var tx = 96 + (305 - this._bg.width) * 0.5;
            var ty = this._card.y;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card);
                this._cardList.push(card);
                card.loadTexture(MjClient.cardPath_xyHongZi + "out" + cards[i] + ".png");
                card.visible = true;
                card.x = tx;
                card.y = ty; 
                tx += card.width + 5;
            }

            if((this.backX - this.width * this._back.getScale() * 0.5) < 0){
                this._back.x = this.width * 0.5 * this._back.getScale();
            }else{
                this._back.x = this.backX;
            }

        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
}) 



// 新听牌效果  
var xyNewTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_xyHongZi(0)){
                        checkTingCards_xyHongZi();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat || 
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        newCheckTingCards_xyHongZi();
                    }
                    
                }
                getPut2TingStats_xyHongZi();
            },
            mjhand: function() {
                // getPut2TingStats_xyHongZi();
            },
            HZAddCards: function(){
                checkTingCards_xyHongZi();
            },
            HZPickCard: function(eD) {
                newCheckTingCards_xyHongZi();
                getPut2TingStats_xyHongZi();
            },
            HZNewCard: function() {
                checkTingCards_xyHongZi();
            },
            MJPut: function() {
                checkTingCards_xyHongZi();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_xyHongZi(0)){
                    MjClient.playui.newTingLayer.visible = false;
                }else{
                    checkTingCards_xyHongZi();
                }
                getPut2TingStats_xyHongZi();
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_xyHongZi(0)){
                    MjClient.playui.newTingLayer.visible = false;
                }else{
                    checkTingCards_xyHongZi();
                }

                getPut2TingStats_xyHongZi();
            },
            HZGangCard: function(eD) {
                checkTingCards_xyHongZi();
            },
            HZWeiCard: function(eD) {
                checkTingCards_xyHongZi();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.newTingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.newTingLayer){
                            MjClient.playui.newTingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.newTingLayer){
                        MjClient.playui.newTingLayer.visible = false;
                    }
                }
            },
            showNewTingLayer : function(cards){
                var tb = sData = MjClient.data.sData; 
                var pl = sData.players[SelfUid()]; 
                // 做状态修改
                if(MjClient.playui.newTingLayer && pl.mjState == TableState.waitPut){ 
                    MjClient.playui.newTingLayer.showNewTingCard(cards);  
                    if(MjClient.playui.tingLayer)
                        MjClient.playui.tingLayer.visible = false;
                }
                
            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("syNewTingLayer.json");
        this.addChild(UI.node);

        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._cardItem = this._back.getChildByName("cardItem"); 
        this._cardItem.visible = false;
  
        setWgtLayout(_back, [350 / 1280, 0], [0.5, 0.7], [0, 0]);
        

    },
 
    //显示听的牌
    showNewTingCard : function(cards){

          
        if(!curPlayerIsMe_xyHongZi(0) )
            return; 
        var len = 0;
        for (var index in cards) {
            len++;
        }

 
        // cards = [1];
        if(cards && len > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;
 
            this.width = this._bg.width;
 
            this._bg.width = 350;
            this._bg.height = 135;
            var subX = 0;
            var title =  this._back.getChildByName("title");
            var ty = this._cardItem.y; 
            if(len > 4 && len < 13){ 
                title.setPositionY(this._bg.height - 30);
                subX = ((len - 3)  * this._cardItem.width);
                this._bg.width = ( this._bg.width + subX);
            }else if(len >= 13){   

                subX = (10  * this._cardItem.width);
                this._bg.width = ( this._bg.width + subX); 
                this._bg.height = 220;
                ty += 40;

                title.setPositionY(this._bg.height - 65);
            }

            
            

            var tempLen = len > 13 ? 13 : len;
            var posX = this._bg.width / (tempLen +1); 
            
            var chText = ["零","一","二","三","四"];
            var indexX = 1; // X坐标数量 

            // for(var i = 0; i < len; i++){
            for (var id in cards) { 

                var card = this._cardItem.clone();
                this._back.addChild(card);
                this._cardList.push(card);  
                // var text = textData[cards[i] + ""];  
                card.getChildByName("card").loadTexture(MjClient.cardPath_xyHongZi + "out" + id + ".png");
                card.getChildByName("text").setString("余" + chText[cards[id]] + "张" );
                card.visible = true;
                card.x = posX * indexX - (subX / 2);
                card.y = ty;
                if(indexX >= 13){
                    indexX = 0;
                    ty -= 85;
                }
                indexX++;
 
            }

        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
})

var YueYangWaiHuZiPhzTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_YueYangWaiHuZi(0)){
                        checkTingCards_YueYangWaiHuZi();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat ||
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        checkTingCards_YueYangWaiHuZi();
                    }else{
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    }
                }
                // getPut2TingStats_YueYangWaiHuZi();
            },
            HZCheckRaise: function() {
                checkTingCards_YueYangWaiHuZi();
            },
            HZAddCards: function(){
                checkTingCards_YueYangWaiHuZi();
            },
            HZPickCard: function(eD) {
                checkTingCards_YueYangWaiHuZi();
                // getPut2TingStats_YueYangWaiHuZi();
            },
            HZNewCard: function() {
                checkTingCards_YueYangWaiHuZi();
            },
            MJPut: function() {
                checkTingCards_YueYangWaiHuZi();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_YueYangWaiHuZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_YueYangWaiHuZi();
                }
                // getPut2TingStats_YueYangWaiHuZi();
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_YueYangWaiHuZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_YueYangWaiHuZi();
                }

                // getPut2TingStats_YueYangWaiHuZi();
            },
            HZLiuCard: function(eD) {
                checkTingCards_YueYangWaiHuZi();
            },
            HZWeiCard: function(eD) {
                checkTingCards_YueYangWaiHuZi();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            showTingLayer : function(cards){
                if(MjClient.playui.tingLayer){
                    MjClient.playui.tingLayer.showTingCard(cards);
                    if(MjClient.playui.newTingLayer)
                        MjClient.playui.newTingLayer.visible = false;
                }

            },
            EZP_tingPai:function (index) {
                /*if(index == 0){
                    checkTingCards_YueYangWaiHuZi();
                }else{
                    MjClient.playui.tingLayer.visible = false;
                }*/
            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("phzTingLayer.json");
        this.addChild(UI.node);

        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;

        setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
        this.backX = this._back.x;


    },

    //显示听的牌
    showTingCard : function(cards){
        cc.log("showTingCard:", cards);
        // cards = [1,2,3,4,5,6,7,8,9,10,21,22,23,24,25];//,26,27,28,29,30];
        if(cards && cards.length > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            var len = cards.length;
            if(len > 4){
                this._bg.width = 305 + (len - 4) * (45);
            }else{
                this._bg.width = 150 + (len -1) * 45;
            }
            this.width = this._bg.width;

            this._ting.x = 48 + (305 - this._bg.width) * 0.5
            var tx = 96 + (305 - this._bg.width) * 0.5;
            var ty = this._card.y;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card);
                this._cardList.push(card);
                card.loadTexture(MjClient.cardPath_YueYangWaiHuZi + "out" + cards[i] + ".png");
                card.visible = true;
                card.x = tx;
                card.y = ty;
                tx += card.width + 5;
            }

            if((this.backX - this.width * this._back.getScale() * 0.5) < 0){
                this._back.x = this.width * 0.5 * this._back.getScale();
            }else{
                this._back.x = this.backX;
            }
            //MjClient.playui.tingLayer.visible = ziPai.getTingPai() == 0 ? true : false;
        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});
// 新听牌效果
var YueYangWaiHuZiNewTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_YueYangWaiHuZi(0)){
                        checkTingCards_YueYangWaiHuZi();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat ||
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        newCheckTingCards_YueYangWaiHuZi();
                    }

                }
                getPut2TingStats_YueYangWaiHuZi();
            },
            mjhand: function() {
                // getPut2TingStats_YueYangWaiHuZi();
            },
            HZAddCards: function(){
                checkTingCards_YueYangWaiHuZi();
            },
            HZPickCard: function(eD) {
                newCheckTingCards_YueYangWaiHuZi();
                getPut2TingStats_YueYangWaiHuZi();
            },
            HZNewCard: function() {
                checkTingCards_YueYangWaiHuZi();
            },
            MJPut: function() {
                checkTingCards_YueYangWaiHuZi();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_YueYangWaiHuZi(0)){
                    MjClient.playui.newTingLayer.visible = false;
                }else{
                    checkTingCards_YueYangWaiHuZi();
                }
                getPut2TingStats_YueYangWaiHuZi();
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_YueYangWaiHuZi(0)){
                    MjClient.playui.newTingLayer.visible = false;
                }else{
                    checkTingCards_YueYangWaiHuZi();
                }

                getPut2TingStats_YueYangWaiHuZi();
            },
            HZLiuCard: function(eD) {
                checkTingCards_YueYangWaiHuZi();
            },
            HZWeiCard: function(eD) {
                checkTingCards_YueYangWaiHuZi();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.newTingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.newTingLayer){
                            MjClient.playui.newTingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.newTingLayer){
                        MjClient.playui.newTingLayer.visible = false;
                    }
                }
            },
            showNewTingLayer : function(cards){
                var tb = sData = MjClient.data.sData;
                var pl = sData.players[SelfUid()];
                // 做状态修改
                if(MjClient.playui.newTingLayer && pl.mjState == TableState.waitPut){
                    MjClient.playui.newTingLayer.showNewTingCard(cards);
                    if(MjClient.playui.tingLayer)
                        MjClient.playui.tingLayer.visible = false;
                }

            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("syNewTingLayer.json");
        this.addChild(UI.node);

        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._cardItem = this._back.getChildByName("cardItem");
        this._cardItem.visible = false;

        setWgtLayout(_back, [350 / 1280, 0], [0.5, 0.7], [0, 0]);


    },

    //显示听的牌
    showNewTingCard : function(cards){


        if(!curPlayerIsMe_YueYangWaiHuZi(0) )
            return;
        var len = 0;
        for (var index in cards) {
            len++;
        }


        // cards = [1];
        if(cards && len > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            this.width = this._bg.width;

            this._bg.width = 350;
            this._bg.height = 135;
            var subX = 0;
            var title =  this._back.getChildByName("title");
            var ty = this._cardItem.y;
            if(len > 4 && len < 13){
                title.setPositionY(this._bg.height - 30);
                subX = ((len - 3)  * this._cardItem.width);
                this._bg.width = ( this._bg.width + subX);
            }else if(len >= 13){

                subX = (10  * this._cardItem.width);
                this._bg.width = ( this._bg.width + subX);
                this._bg.height = 220;
                ty += 40;

                title.setPositionY(this._bg.height - 65);
            }




            var tempLen = len > 13 ? 13 : len;
            var posX = this._bg.width / (tempLen +1);

            var chText = ["零","一","二","三","四"];
            var indexX = 1; // X坐标数量

            // for(var i = 0; i < len; i++){
            for (var id in cards) {

                var card = this._cardItem.clone();
                this._back.addChild(card);
                this._cardList.push(card);
                // var text = textData[cards[i] + ""];
                card.getChildByName("card").loadTexture(MjClient.cardPath_YueYangWaiHuZi + "out" + id + ".png");
                card.getChildByName("text").setString("余" + chText[cards[id]] + "张" );
                card.visible = true;
                card.x = posX * indexX - (subX / 2);
                card.y = ty;
                if(indexX >= 13){
                    indexX = 0;
                    ty -= 85;
                }
                indexX++;

            }
            MjClient.playui.newTingLayer.visible = ziPai.getTingPai() == 0 ? true : false;
        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});

//福禄寿听牌
var flsPhzTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_fuLuShou(0)){
                        checkTingCards_fuLuShou();
                    }
                }else if(MjClient.data.sData.tData.tState == TableState.waitEat || 
                    MjClient.data.sData.tData.tState == TableState.waitCard){
                    checkTingCards_fuLuShou();
                }else {
                    MjClient.playui.tingLayer.visible = false;
                }
                // getPut2TingStats_hongZi();  
            },
            mjhand: function() {
                checkTingCards_fuLuShou();
            },
            HZAddCards: function(){
                checkTingCards_fuLuShou();
            },
            HZPickCard: function(eD) {
                checkTingCards_fuLuShou();
                // getPut2TingStats_hongZi();
            },
            HZNewCard: function() {
                checkTingCards_fuLuShou();
            },
            MJPut: function() {
                //checkTingCards_fuLuShou();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_fuLuShou(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_fuLuShou();
                }
                // getPut2TingStats_hongZi();
            },
            FLSChiCard: function(eD) {
                if(curPlayerIsMe_fuLuShou(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_fuLuShou();
                }

                // getPut2TingStats_hongZi();
            },
            MJGang: function(eD) {
                checkTingCards_fuLuShou();
            },
            MJZhao: function(eD) {
                checkTingCards_fuLuShou();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            showTingLayer : function(cards){
                if(MjClient.playui.tingLayer){ 
                    MjClient.playui.tingLayer.showTingCard(cards);
                    if(MjClient.playui.newTingLayer)
                        MjClient.playui.newTingLayer.visible = false;
                }
                
            },
            EZP_tingPai:function (index) {
                cc.log("监听听牌事件...--------@zzj", index);
                if(index == 0){
                    calculateHintPutList_fuLuShou();
                    addTingSign_fuLuShou(MjClient.playui._downNode);
                    checkTingCards_fuLuShou();
                }else{
                    removeTingSign_fuLuShou(MjClient.playui._downNode);
                    MjClient.playui.tingLayer.visible = false;
                }
            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("phzTingLayer.json");
        this.addChild(UI.node);

        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;
 
        //setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
        setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.04], [0, 0]);
        this.backX = this._back.x;
 

    },

    //显示听的牌
    showTingCard : function(cards){
        //trace();
        cc.log("标识", MjClient.majiang.isTingAll);
        if(!cards || cards.length == 0) {
            this.visible = false;
            return;
        }
        if(MjClient.majiang.isTingAll) {
            var img = this._back.getChildByName("ALL_CARDS")
            if(!img) {
                var img = ccui.ImageView.create("playing/fulushou/allCards.png");
                if(!img)
                    return;
                img.setName("ALL_CARDS");
                this._back.addChild(img);
                img.setVisible(true);
                this._ting.x = 45;
                img.x = 105;
                img.y = this._ting.y;
            } else {
                img.setVisible(true);
            }
            
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this.visible = true;
            this._bg.width = 150;
            this._bg.height = 60;
            this._bg.setAnchorPoint(0, 1);
            this._bg.setPosition(cc.p(10, 50));
            return;
        }

        if(this._back.getChildByName("ALL_CARDS")) {
            this._back.getChildByName("ALL_CARDS").setVisible(false);
        }

        if(cards && cards.length > 0){
            //test
            //cards = cards.concat([11, 12, 13, 21, 22, 23, 31, 32, 33, 41, 42, 43, 51, 52, 53, 61, 62, 63, 71]);
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            var len = cards.length;
            //现在改为在最下层摆一行了
            this._bg.height = 60;
            this._bg.width = 125 + (len-1) * 45 + (len-1)*5/2;
            this._bg.setAnchorPoint(0, 1);
            this._bg.setPosition(cc.p(10, 55));
            this.width = this._bg.width;
            this._ting.x = 45;
            var txTemp = 45+50;
            var tyTemp = this._card.y;
            var tx = txTemp;
            var ty = tyTemp;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card); 
                this._cardList.push(card);
                card.loadTexture(MjClient.cardPath_fuLuShou + "out_" + cards[i] + ".png"); 
                card.visible = true;
                card.x = tx;
                card.y = ty;
                tx += card.width + 5;
            }

            /*
            this._bg.height = 60 + (Math.ceil(len/5)-1) * 50;
            if(len > 4){
                this._bg.width = 310;
            }else{
                this._bg.width = 125 + (len -1) * 45;
            }
            this._bg.setAnchorPoint(0, 1);
            this._bg.setPosition(cc.p(10, 55));

            this.width = this._bg.width;
            
            this._ting.x = 45;
            var txTemp = 45+50;
            var tyTemp = this._card.y;
            var tx = txTemp;
            var ty = tyTemp;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card); 
                this._cardList.push(card);
                card.loadTexture(MjClient.cardPath_fuLuShou + "out_" + cards[i] + ".png"); 
                card.visible = true;
                card.x = tx;
                card.y = ty;
                tx += card.width + 5;
                if ((i+1) % 5 == 0) {  //每5个为一行
                    tx = txTemp;
                    ty = ty - 50;
                }
            }

            if((this.backX - this.width * this._back.getScale() * 0.5) < 0){
                this._back.x = this.width * 0.5 * this._back.getScale();
            }else{
                this._back.x = this.backX;
            }
            */

        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
})

// 新听牌效果  
var flsNewTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_fuLuShou(0)){
                        checkTingCards_fuLuShou();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat || 
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        newCheckTingCards_fuLuShou();
                    }
                    
                }
                getPut2TingStats_fuLuShou();  //断线重连待处理 
            },
            mjhand: function() {
                // getPut2TingStats_hongZi();
            },
            HZAddCards: function(){
                //checkTingCards_fuLuShou();
            },
            HZPickCard: function(eD) {  //补张用的。。。待处理mark
                newCheckTingCards_fuLuShou();
                //getPut2TingStats_fuLuShou();  //没实现
            },
            HZNewCard: function() {
                //checkTingCards_fuLuShou();
            },
            MJPut: function() {
                //checkTingCards_fuLuShou();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_fuLuShou(0)){
                    MjClient.playui.newTingLayer.visible = false;
                }else{
                    //checkTingCards_fuLuShou();
                }
                //getPut2TingStats_fuLuShou();  没实现
            },
            FLSChiCard: function(eD) {
                if(curPlayerIsMe_fuLuShou(0)){
                    MjClient.playui.newTingLayer.visible = false;
                }else{
                    //checkTingCards_fuLuShou();
                }

                getPut2TingStats_fuLuShou();
            },
            MJGang: function(eD) {
                //checkTingCards_fuLuShou();
            },
            MJZhao: function(eD) {
                //newCheckTingCards_fuLuShou();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.newTingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.newTingLayer){
                            MjClient.playui.newTingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.newTingLayer){
                        MjClient.playui.newTingLayer.visible = false;
                    }
                }
            },
            showNewTingLayer : function(cards){
                var tb = sData = MjClient.data.sData; 
                var pl = sData.players[SelfUid()]; 
                // 做状态修改
                if(MjClient.playui.newTingLayer && pl.mjState == TableState.waitPut){ 
                    MjClient.playui.newTingLayer.showNewTingCard(cards);  
                    if(MjClient.playui.tingLayer) 
                        MjClient.playui.tingLayer.visible = false; 
                }
                
            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("syNewTingLayer.json");
        this.addChild(UI.node);

        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._cardItem = this._back.getChildByName("cardItem"); 
        this._cardItem.visible = false;
  
        setWgtLayout(_back, [350 / 1280, 0], [0.5, 0.7], [0, 0]);
        

    },
 
    //显示听的牌
    showNewTingCard : function(cards){
        if(!curPlayerIsMe_fuLuShou(0) )
            return; 
        var len = 0;
        for (var index in cards) {
            len++;
        }

        // cards = [1];
        if(cards && len > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;
 
            this.width = this._bg.width;
 
            this._bg.width = 350;
            this._bg.height = 135;
            var subX = 0;
            var title =  this._back.getChildByName("title");
            var ty = this._cardItem.y; 
            if(len > 4 && len < 13){ 
                title.setPositionY(this._bg.height - 30);
                subX = ((len - 3)  * this._cardItem.width);
                this._bg.width = ( this._bg.width + subX);
            }else if(len >= 13){   

                subX = (10  * this._cardItem.width);
                this._bg.width = ( this._bg.width + subX); 
                this._bg.height = 220;
                ty += 40;

                title.setPositionY(this._bg.height - 65);
            }

            
            

            var tempLen = len > 13 ? 13 : len;
            var posX = this._bg.width / (tempLen +1); 
            
            var chText = ["零","一","二","三","四"];
            var indexX = 1; // X坐标数量 

            // for(var i = 0; i < len; i++){
            for (var id in cards) { 

                var card = this._cardItem.clone();
                this._back.addChild(card);
                this._cardList.push(card);  
                // var text = textData[cards[i] + ""];
                card.getChildByName("card").loadTexture(MjClient.cardPath_fuLuShou + "out_" + id + ".png");
                card.getChildByName("text").setString("余" + chText[cards[id]] + "张" );
                card.visible = true;
                card.x = posX * indexX - (subX / 2);
                card.y = ty;
                if(indexX >= 13){
                    indexX = 0;
                    ty -= 85;
                }
                indexX++;
 
            }

        }else{
            this.visible = false;
            cc.log("newphzTingLayer.visible:", this.visible);
        }
    }
});


var AnHuaPaoHuZiTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_ahPaoHuZi(0)){
                        checkTingCards_ahPaoHuZi();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat ||
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        checkTingCards_ahPaoHuZi();
                    }else{
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    }
                }
            },
            HZAddCards: function(){
                checkTingCards_ahPaoHuZi();
            },
            HZPickCard: function(eD) {
                checkTingCards_ahPaoHuZi();
            },
            HZNewCard: function() {
                checkTingCards_ahPaoHuZi();
            },
            MJPut: function() {
                checkTingCards_ahPaoHuZi();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_ahPaoHuZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_ahPaoHuZi();
                }
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_ahPaoHuZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_ahPaoHuZi();
                }
            },
            HZGangCard: function(eD) {
                if (!eD.tData.isLastDraw){
                    checkTingCards_ahPaoHuZi();
                }
            },
            HZCheckRaise: function(eD) {
                checkTingCards_ahPaoHuZi();
            },
            HZWeiCard: function(eD) {
                checkTingCards_ahPaoHuZi();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            showTingLayer : function(cards){
                if(MjClient.playui.tingLayer){
                    MjClient.playui.tingLayer.showTingCard(cards);
                }

            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("phzTingLayer.json");
        this.addChild(UI.node);
        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        _back.setSwallowTouches(false);
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;

        setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
    },

    //显示听的牌
    showTingCard : function(cards){
        cc.log("showTingCard:", cards);
        if(ziPai.getTingPai() == 1){
            this.visible = false;
            return;
        }

        if(MjClient.data.sData.tData.tState == TableState.roundFinish){
            this.visible = false;
            return;
        }
        // cards = [1];
        if(cards && cards.length > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            var len = cards.length;
            if(len > 4){
                this._bg.width = 305 + (len - 4) * (42);
            }else{
                this._bg.width = 150 + (len -1) * 42;
            }
            this.width = this._bg.width;

            this._ting.x = 48 + (305 - this._bg.width) * 0.5
            var tx = 96 + (305 - this._bg.width) * 0.5;
            var ty = this._card.y;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card);
                this._cardList.push(card);
                var path = ziPai.getCardFilePath();
                card.loadTexture(path + "out" + cards[i] + ".png");
                card.visible = true;
                card.x = tx;
                card.y = ty;

                tx += card.width + 5;
            }

        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});

var ChenZhouZiPaiTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_chenZhouZiPai(0)){
                        checkTingCards_chenZhouZiPai();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat ||
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        checkTingCards_chenZhouZiPai();
                    }else{
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    }
                }
            },
            HZAddCards: function(){
                checkTingCards_chenZhouZiPai();
            },
            HZPickCard: function(eD) {
                checkTingCards_chenZhouZiPai();
            },
            HZNewCard: function() {
                checkTingCards_chenZhouZiPai();
            },
            MJPut: function() {
                checkTingCards_chenZhouZiPai();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_chenZhouZiPai(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_chenZhouZiPai();
                }
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_chenZhouZiPai(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_chenZhouZiPai();
                }
            },
            HZGangCard: function(eD) {
                checkTingCards_chenZhouZiPai();
            },
            HZCheckRaise: function(eD) {
                checkTingCards_chenZhouZiPai();
            },
            HZWeiCard: function(eD) {
                checkTingCards_chenZhouZiPai();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            showTingLayer : function(cards){
                if(MjClient.playui.tingLayer){
                    MjClient.playui.tingLayer.showTingCard(cards);
                }

            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("phzTingLayer.json");
        this.addChild(UI.node);
        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        _back.setSwallowTouches(false);
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;

        setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
    },

    //显示听的牌
    showTingCard : function(cards){
        cc.log("showTingCard:", cards);
        if(ziPai.getTingPai() == 1){
            this.visible = false;
            return;
        }

        if(MjClient.data.sData.tData.tState == TableState.roundFinish){
            this.visible = false;
            return;
        }
        // cards = [1];
        if(cards && cards.length > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            var len = cards.length;
            if(len > 4){
                this._bg.width = 305 + (len - 4) * (42);
            }else{
                this._bg.width = 150 + (len -1) * 42;
            }
            this.width = this._bg.width;

            this._ting.x = 48 + (305 - this._bg.width) * 0.5
            var tx = 96 + (305 - this._bg.width) * 0.5;
            var ty = this._card.y;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card);
                this._cardList.push(card);
                var path = ziPai.getCardFilePath();
                card.loadTexture(path + "out" + cards[i] + ".png");
                card.visible = true;
                card.x = tx;
                card.y = ty;

                tx += card.width + 5;
            }

        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});

var NingXiangPaoHuZiTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_ningXiangPaoHuZi(0)){
                        checkTingCards_ningXiangPaoHuZi();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat ||
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        checkTingCards_ningXiangPaoHuZi();
                    }else{
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    }
                }
            },
            HZAddCards: function(){
                checkTingCards_ningXiangPaoHuZi();
            },
            HZPickCard: function(eD) {
                checkTingCards_ningXiangPaoHuZi();
            },
            HZNewCard: function() {
                checkTingCards_ningXiangPaoHuZi();
            },
            MJPut: function() {
                checkTingCards_ningXiangPaoHuZi();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_ningXiangPaoHuZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_ningXiangPaoHuZi();
                }
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_ningXiangPaoHuZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_ningXiangPaoHuZi();
                }
            },
            HZGangCard: function(eD) {
                if (!eD.tData.isLastDraw){
                    checkTingCards_ningXiangPaoHuZi();
                }
            },
            HZCheckRaise: function(eD) {
                checkTingCards_ningXiangPaoHuZi();
            },
            HZWeiCard: function(eD) {
                checkTingCards_ningXiangPaoHuZi();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            showTingLayer : function(cards){
                if(MjClient.playui.tingLayer){
                    MjClient.playui.tingLayer.showTingCard(cards);
                }

            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("phzTingLayer.json");
        this.addChild(UI.node);
        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        _back.setSwallowTouches(false);
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;

        setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
    },

    //显示听的牌
    showTingCard : function(cards){
        cc.log("showTingCard:", cards);
        if(ziPai.getTingPai() == 1){
            this.visible = false;
            return;
        }

        if(MjClient.data.sData.tData.tState == TableState.roundFinish){
            this.visible = false;
            return;
        }
        // cards = [1];
        if(cards && cards.length > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            var len = cards.length;
            if(len > 4){
                this._bg.width = 305 + (len - 4) * (42);
            }else{
                this._bg.width = 150 + (len -1) * 42;
            }
            this.width = this._bg.width;

            this._ting.x = 48 + (305 - this._bg.width) * 0.5
            var tx = 96 + (305 - this._bg.width) * 0.5;
            var ty = this._card.y;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card);
                this._cardList.push(card);
                var path = ziPai.getCardFilePath();
                card.loadTexture(path + "out" + cards[i] + ".png");
                card.visible = true;
                card.x = tx;
                card.y = ty;

                tx += card.width + 5;
            }

        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});

var YueYangPengHuTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_yueYangPengHu(0)){
                        checkTingCards_yueYangPengHu();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat ||
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        checkTingCards_yueYangPengHu();
                    }else{
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    }
                }
            },
            HZAddCards: function(){
                checkTingCards_yueYangPengHu();
            },
            HZPickCard: function(eD) {
                checkTingCards_yueYangPengHu();
            },
            HZNewCard: function() {
                checkTingCards_yueYangPengHu();
            },
            MJPut: function() {
                checkTingCards_yueYangPengHu();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_yueYangPengHu(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_yueYangPengHu();
                }
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_yueYangPengHu(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_yueYangPengHu();
                }
            },
            HZGangCard: function(eD) {
                checkTingCards_yueYangPengHu();
            },
            HZCheckRaise: function(eD) {
                checkTingCards_yueYangPengHu();
            },
            HZWeiCard: function(eD) {
                checkTingCards_yueYangPengHu();
            },
            HZAlarm: function(eD) {
                checkTingCards_yueYangPengHu();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            showTingLayer : function(cards){
                if(MjClient.playui.tingLayer){
                    MjClient.playui.tingLayer.showTingCard(cards);
                }

            },
            changeMJBgEvent: function() {
                changeMJBg_yueYangPengHu(this, ziPai.getZiPaiType());
            },
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("phzTingLayer.json");
        this.addChild(UI.node);
        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        _back.setSwallowTouches(false);
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;

        setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
    },

    //显示听的牌
    showTingCard : function(cards){
        cc.log("showTingCard:", cards);
        if(ziPai.getTingPai() == 1){
            this.visible = false;
            return;
        }

        if(MjClient.data.sData.tData.tState == TableState.roundFinish){
            this.visible = false;
            return;
        }
        // cards = [1];
        if(cards && cards.length > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            var len = cards.length;
            if(len > 4){
                this._bg.width = 305 + (len - 4) * (42);
            }else{
                this._bg.width = 150 + (len -1) * 42;
            }
            this.width = this._bg.width;

            this._ting.x = 48 + (305 - this._bg.width) * 0.5
            var tx = 96 + (305 - this._bg.width) * 0.5;
            var ty = this._card.y;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card);
                this._cardList.push(card);
                var path = ziPai.getCardFilePath();
                card.loadTexture(path + "out" + cards[i] + ".png");
                card.visible = true;
                card.x = tx;
                card.y = ty;

                tx += card.width + 5;
            }

        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});

var YiYangWaiHuZiPhzTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_YiYangWaiHuZi(0)){
                        checkTingCards_YiYangWaiHuZi();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat ||
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        checkTingCards_YiYangWaiHuZi();
                    }else{
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    }
                }
                // getPut2TingStats_YiYangWaiHuZi();
            },
            HZCheckRaise: function() {
                checkTingCards_YiYangWaiHuZi();
            },
            HZAddCards: function(){
                checkTingCards_YiYangWaiHuZi();
            },
            HZPickCard: function(eD) {
                checkTingCards_YiYangWaiHuZi();
                // getPut2TingStats_YiYangWaiHuZi();
            },
            HZNewCard: function() {
                checkTingCards_YiYangWaiHuZi();
            },
            MJPut: function() {
                checkTingCards_YiYangWaiHuZi();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_YiYangWaiHuZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_YiYangWaiHuZi();
                }
                // getPut2TingStats_YiYangWaiHuZi();
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_YiYangWaiHuZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_YiYangWaiHuZi();
                }

                // getPut2TingStats_YiYangWaiHuZi();
            },
            HZLiuCard: function(eD) {
                checkTingCards_YiYangWaiHuZi();
            },
            HZWeiCard: function(eD) {
                checkTingCards_YiYangWaiHuZi();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            showTingLayer : function(cards){
                if(MjClient.playui.tingLayer){
                    MjClient.playui.tingLayer.showTingCard(cards);
                    if(MjClient.playui.newTingLayer)
                        MjClient.playui.newTingLayer.visible = false;
                }

            },
            EZP_tingPai:function (index) {
                /*if(index == 0){
                 checkTingCards_YiYangWaiHuZi();
                 }else{
                 MjClient.playui.tingLayer.visible = false;
                 }*/
            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("phzTingLayer.json");
        this.addChild(UI.node);

        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;

        setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
        this.backX = this._back.x;


    },

    //显示听的牌
    showTingCard : function(cards){
        cc.log("showTingCard:", cards);
        // cards = [1,2,3,4,5,6,7,8,9,10,21,22,23,24,25];//,26,27,28,29,30];
        if(cards && cards.length > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            var len = cards.length;
            if(len > 4){
                this._bg.width = 305 + (len - 4) * (45);
            }else{
                this._bg.width = 150 + (len -1) * 45;
            }
            this.width = this._bg.width;

            this._ting.x = 48 + (305 - this._bg.width) * 0.5
            var tx = 96 + (305 - this._bg.width) * 0.5;
            var ty = this._card.y;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card);
                this._cardList.push(card);
                card.loadTexture(MjClient.cardPath_YiYangWaiHuZi + "out" + cards[i] + ".png");
                card.visible = true;
                card.x = tx;
                card.y = ty;
                tx += card.width + 5;
            }

            if((this.backX - this.width * this._back.getScale() * 0.5) < 0){
                this._back.x = this.width * 0.5 * this._back.getScale();
            }else{
                this._back.x = this.backX;
            }
            //MjClient.playui.tingLayer.visible = ziPai.getTingPai() == 0 ? true : false;
        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});
// 新听牌效果
var YiYangWaiHuZiNewTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_YiYangWaiHuZi(0)){
                        checkTingCards_YiYangWaiHuZi();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat ||
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        newCheckTingCards_YiYangWaiHuZi();
                    }

                }
                getPut2TingStats_YiYangWaiHuZi();
            },
            mjhand: function() {
                // getPut2TingStats_YiYangWaiHuZi();
            },
            HZAddCards: function(){
                checkTingCards_YiYangWaiHuZi();
            },
            HZPickCard: function(eD) {
                newCheckTingCards_YiYangWaiHuZi();
                getPut2TingStats_YiYangWaiHuZi();
            },
            HZNewCard: function() {
                checkTingCards_YiYangWaiHuZi();
            },
            MJPut: function() {
                checkTingCards_YiYangWaiHuZi();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_YiYangWaiHuZi(0)){
                    MjClient.playui.newTingLayer.visible = false;
                }else{
                    checkTingCards_YiYangWaiHuZi();
                }
                getPut2TingStats_YiYangWaiHuZi();
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_YiYangWaiHuZi(0)){
                    MjClient.playui.newTingLayer.visible = false;
                }else{
                    checkTingCards_YiYangWaiHuZi();
                }

                getPut2TingStats_YiYangWaiHuZi();
            },
            HZLiuCard: function(eD) {
                checkTingCards_YiYangWaiHuZi();
            },
            HZWeiCard: function(eD) {
                checkTingCards_YiYangWaiHuZi();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.newTingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.newTingLayer){
                            MjClient.playui.newTingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.newTingLayer){
                        MjClient.playui.newTingLayer.visible = false;
                    }
                }
            },
            showNewTingLayer : function(cards){
                var tb = sData = MjClient.data.sData;
                var pl = sData.players[SelfUid()];
                // 做状态修改
                if(MjClient.playui.newTingLayer && pl.mjState == TableState.waitPut){
                    MjClient.playui.newTingLayer.showNewTingCard(cards);
                    if(MjClient.playui.tingLayer)
                        MjClient.playui.tingLayer.visible = false;
                }

            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("syNewTingLayer.json");
        this.addChild(UI.node);

        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._cardItem = this._back.getChildByName("cardItem");
        this._cardItem.visible = false;

        setWgtLayout(_back, [350 / 1280, 0], [0.5, 0.7], [0, 0]);


    },

    //显示听的牌
    showNewTingCard : function(cards){


        if(!curPlayerIsMe_YiYangWaiHuZi(0) )
            return;
        var len = 0;
        for (var index in cards) {
            len++;
        }


        // cards = [1];
        if(cards && len > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            this.width = this._bg.width;

            this._bg.width = 350;
            this._bg.height = 135;
            var subX = 0;
            var title =  this._back.getChildByName("title");
            var ty = this._cardItem.y;
            if(len > 4 && len < 13){
                title.setPositionY(this._bg.height - 30);
                subX = ((len - 3)  * this._cardItem.width);
                this._bg.width = ( this._bg.width + subX);
            }else if(len >= 13){

                subX = (10  * this._cardItem.width);
                this._bg.width = ( this._bg.width + subX);
                this._bg.height = 220;
                ty += 40;

                title.setPositionY(this._bg.height - 65);
            }




            var tempLen = len > 13 ? 13 : len;
            var posX = this._bg.width / (tempLen +1);

            var chText = ["零","一","二","三","四"];
            var indexX = 1; // X坐标数量

            // for(var i = 0; i < len; i++){
            for (var id in cards) {

                var card = this._cardItem.clone();
                this._back.addChild(card);
                this._cardList.push(card);
                // var text = textData[cards[i] + ""];
                card.getChildByName("card").loadTexture(MjClient.cardPath_YiYangWaiHuZi + "out" + id + ".png");
                card.getChildByName("text").setString("余" + chText[cards[id]] + "张" );
                card.visible = true;
                card.x = posX * indexX - (subX / 2);
                card.y = ty;
                if(indexX >= 13){
                    indexX = 0;
                    ty -= 85;
                }
                indexX++;

            }
            MjClient.playui.newTingLayer.visible = ziPai.getTingPai() == 0 ? true : false;
        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});

var NanXianGuiHuZiPhzTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_NanXianGuiHuZi(0)){
                        checkTingCards_NanXianGuiHuZi();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat ||
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        checkTingCards_NanXianGuiHuZi();
                    }else{
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    }
                }
                // getPut2TingStats_NanXianGuiHuZi();
            },
            HZCheckRaise: function() {
                checkTingCards_NanXianGuiHuZi();
            },
            HZAddCards: function(){
                checkTingCards_NanXianGuiHuZi();
            },
            HZPickCard: function(eD) {
                checkTingCards_NanXianGuiHuZi();
                // getPut2TingStats_NanXianGuiHuZi();
            },
            HZNewCard: function() {
                checkTingCards_NanXianGuiHuZi();
            },
            MJPut: function() {
                checkTingCards_NanXianGuiHuZi();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_NanXianGuiHuZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_NanXianGuiHuZi();
                }
                // getPut2TingStats_NanXianGuiHuZi();
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_NanXianGuiHuZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_NanXianGuiHuZi();
                }

                // getPut2TingStats_NanXianGuiHuZi();
            },
            HZLiuCard: function(eD) {
                checkTingCards_NanXianGuiHuZi();
            },
            HZWeiCard: function(eD) {
                checkTingCards_NanXianGuiHuZi();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            showTingLayer : function(cards){
                if(MjClient.playui.tingLayer){
                    MjClient.playui.tingLayer.showTingCard(cards);
                    if(MjClient.playui.newTingLayer)
                        MjClient.playui.newTingLayer.visible = false;
                }

            },
            EZP_tingPai:function (index) {
                /*if(index == 0){
                 checkTingCards_NanXianGuiHuZi();
                 }else{
                 MjClient.playui.tingLayer.visible = false;
                 }*/
            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("phzTingLayer.json");
        this.addChild(UI.node);

        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;

        setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
        this.backX = this._back.x;


    },

    //显示听的牌
    showTingCard : function(cards){
        cc.log("showTingCard:", cards);
        // cards = [1,2,3,4,5,6,7,8,9,10,21,22,23,24,25];//,26,27,28,29,30];
        if(cards && cards.length > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            var len = cards.length;
            if(len > 4){
                this._bg.width = 305 + (len - 4) * (45);
            }else{
                this._bg.width = 150 + (len -1) * 45;
            }
            this.width = this._bg.width;

            this._ting.x = 48 + (305 - this._bg.width) * 0.5
            var tx = 96 + (305 - this._bg.width) * 0.5;
            var ty = this._card.y;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card);
                this._cardList.push(card);
                card.loadTexture(MjClient.cardPath_NanXianGuiHuZi + "out" + cards[i] + ".png");
                card.visible = true;
                card.x = tx;
                card.y = ty;
                tx += card.width + 5;
            }

            if((this.backX - this.width * this._back.getScale() * 0.5) < 0){
                this._back.x = this.width * 0.5 * this._back.getScale();
            }else{
                this._back.x = this.backX;
            }
            //MjClient.playui.tingLayer.visible = ziPai.getTingPai() == 0 ? true : false;
        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});

var NanXianGuiHuZiNewTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_NanXianGuiHuZi(0)){
                        checkTingCards_NanXianGuiHuZi();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat ||
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        newCheckTingCards_NanXianGuiHuZi();
                    }

                }
                getPut2TingStats_NanXianGuiHuZi();
            },
            mjhand: function() {
                // getPut2TingStats_NanXianGuiHuZi();
            },
            HZAddCards: function(){
                checkTingCards_NanXianGuiHuZi();
            },
            HZPickCard: function(eD) {
                newCheckTingCards_NanXianGuiHuZi();
                getPut2TingStats_NanXianGuiHuZi();
            },
            HZNewCard: function() {
                checkTingCards_NanXianGuiHuZi();
            },
            MJPut: function() {
                checkTingCards_NanXianGuiHuZi();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_NanXianGuiHuZi(0)){
                    MjClient.playui.newTingLayer.visible = false;
                }else{
                    checkTingCards_NanXianGuiHuZi();
                }
                getPut2TingStats_NanXianGuiHuZi();
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_NanXianGuiHuZi(0)){
                    MjClient.playui.newTingLayer.visible = false;
                }else{
                    checkTingCards_NanXianGuiHuZi();
                }

                getPut2TingStats_NanXianGuiHuZi();
            },
            HZLiuCard: function(eD) {
                checkTingCards_NanXianGuiHuZi();
            },
            HZWeiCard: function(eD) {
                checkTingCards_NanXianGuiHuZi();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.newTingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.newTingLayer){
                            MjClient.playui.newTingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.newTingLayer){
                        MjClient.playui.newTingLayer.visible = false;
                    }
                }
            },
            showNewTingLayer : function(cards){
                var tb = sData = MjClient.data.sData;
                var pl = sData.players[SelfUid()];
                // 做状态修改
                if(MjClient.playui.newTingLayer && pl.mjState == TableState.waitPut){
                    MjClient.playui.newTingLayer.showNewTingCard(cards);
                    if(MjClient.playui.tingLayer)
                        MjClient.playui.tingLayer.visible = false;
                }

            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("syNewTingLayer.json");
        this.addChild(UI.node);

        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._cardItem = this._back.getChildByName("cardItem");
        this._cardItem.visible = false;

        setWgtLayout(_back, [350 / 1280, 0], [0.5, 0.7], [0, 0]);


    },

    //显示听的牌
    showNewTingCard : function(cards){


        if(!curPlayerIsMe_NanXianGuiHuZi(0) )
            return;
        var len = 0;
        for (var index in cards) {
            len++;
        }


        // cards = [1];
        if(cards && len > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            this.width = this._bg.width;

            this._bg.width = 350;
            this._bg.height = 135;
            var subX = 0;
            var title =  this._back.getChildByName("title");
            var ty = this._cardItem.y;
            if(len > 4 && len < 13){
                title.setPositionY(this._bg.height - 30);
                subX = ((len - 3)  * this._cardItem.width);
                this._bg.width = ( this._bg.width + subX);
            }else if(len >= 13){

                subX = (10  * this._cardItem.width);
                this._bg.width = ( this._bg.width + subX);
                this._bg.height = 220;
                ty += 40;

                title.setPositionY(this._bg.height - 65);
            }




            var tempLen = len > 13 ? 13 : len;
            var posX = this._bg.width / (tempLen +1);

            var chText = ["零","一","二","三","四"];
            var indexX = 1; // X坐标数量

            // for(var i = 0; i < len; i++){
            for (var id in cards) {

                var card = this._cardItem.clone();
                this._back.addChild(card);
                this._cardList.push(card);
                // var text = textData[cards[i] + ""];
                card.getChildByName("card").loadTexture(MjClient.cardPath_NanXianGuiHuZi + "out" + id + ".png");
                card.getChildByName("text").setString("余" + chText[cards[id]] + "张" );
                card.visible = true;
                card.x = posX * indexX - (subX / 2);
                card.y = ty;
                if(indexX >= 13){
                    indexX = 0;
                    ty -= 85;
                }
                indexX++;

            }
            MjClient.playui.newTingLayer.visible = ziPai.getTingPai() == 0 ? true : false;
        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});

var YuanJiangGuiHuZiPhzTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_YuanJiangGuiHuZi(0)){
                        checkTingCards_YuanJiangGuiHuZi();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat ||
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        checkTingCards_YuanJiangGuiHuZi();
                    }else{
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    }
                }
                // getPut2TingStats_YuanJiangGuiHuZi();
            },
            HZCheckRaise: function() {
                checkTingCards_YuanJiangGuiHuZi();
            },
            HZAddCards: function(){
                checkTingCards_YuanJiangGuiHuZi();
            },
            HZPickCard: function(eD) {
                checkTingCards_YuanJiangGuiHuZi();
                // getPut2TingStats_YuanJiangGuiHuZi();
            },
            HZNewCard: function() {
                checkTingCards_YuanJiangGuiHuZi();
            },
            MJPut: function() {
                checkTingCards_YuanJiangGuiHuZi();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_YuanJiangGuiHuZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_YuanJiangGuiHuZi();
                }
                // getPut2TingStats_YuanJiangGuiHuZi();
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_YuanJiangGuiHuZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_YuanJiangGuiHuZi();
                }

                // getPut2TingStats_YuanJiangGuiHuZi();
            },
            HZLiuCard: function(eD) {
                checkTingCards_YuanJiangGuiHuZi();
            },
            HZWeiCard: function(eD) {
                checkTingCards_YuanJiangGuiHuZi();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            showTingLayer : function(cards){
                if(MjClient.playui.tingLayer){
                    MjClient.playui.tingLayer.showTingCard(cards);
                    if(MjClient.playui.newTingLayer)
                        MjClient.playui.newTingLayer.visible = false;
                }

            },
            EZP_tingPai:function (index) {
                /*if(index == 0){
                 checkTingCards_YuanJiangGuiHuZi();
                 }else{
                 MjClient.playui.tingLayer.visible = false;
                 }*/
            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("phzTingLayer.json");
        this.addChild(UI.node);

        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;

        setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
        this.backX = this._back.x;


    },

    //显示听的牌
    showTingCard : function(cards){
        cc.log("showTingCard:", cards);
        // cards = [1,2,3,4,5,6,7,8,9,10,21,22,23,24,25];//,26,27,28,29,30];
        if(cards && cards.length > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            var len = cards.length;
            if(len > 4){
                this._bg.width = 305 + (len - 4) * (45);
            }else{
                this._bg.width = 150 + (len -1) * 45;
            }
            this.width = this._bg.width;

            this._ting.x = 48 + (305 - this._bg.width) * 0.5
            var tx = 96 + (305 - this._bg.width) * 0.5;
            var ty = this._card.y;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card);
                this._cardList.push(card);
                card.loadTexture(MjClient.cardPath_YuanJiangGuiHuZi + "out" + cards[i] + ".png");
                card.visible = true;
                card.x = tx;
                card.y = ty;
                tx += card.width + 5;
            }

            if((this.backX - this.width * this._back.getScale() * 0.5) < 0){
                this._back.x = this.width * 0.5 * this._back.getScale();
            }else{
                this._back.x = this.backX;
            }
            //MjClient.playui.tingLayer.visible = ziPai.getTingPai() == 0 ? true : false;
        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});

var YuanJiangGuiHuZiNewTingLayer  = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_YuanJiangGuiHuZi(0)){
                        checkTingCards_YuanJiangGuiHuZi();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat ||
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        newCheckTingCards_YuanJiangGuiHuZi();
                    }

                }
                getPut2TingStats_YuanJiangGuiHuZi();
            },
            mjhand: function() {
                // getPut2TingStats_YuanJiangGuiHuZi();
            },
            HZAddCards: function(){
                checkTingCards_YuanJiangGuiHuZi();
            },
            HZPickCard: function(eD) {
                newCheckTingCards_YuanJiangGuiHuZi();
                getPut2TingStats_YuanJiangGuiHuZi();
            },
            HZNewCard: function() {
                checkTingCards_YuanJiangGuiHuZi();
            },
            MJPut: function() {
                checkTingCards_YuanJiangGuiHuZi();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_YuanJiangGuiHuZi(0)){
                    MjClient.playui.newTingLayer.visible = false;
                }else{
                    checkTingCards_YuanJiangGuiHuZi();
                }
                getPut2TingStats_YuanJiangGuiHuZi();
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_YuanJiangGuiHuZi(0)){
                    MjClient.playui.newTingLayer.visible = false;
                }else{
                    checkTingCards_YuanJiangGuiHuZi();
                }

                getPut2TingStats_YuanJiangGuiHuZi();
            },
            HZLiuCard: function(eD) {
                checkTingCards_YuanJiangGuiHuZi();
            },
            HZWeiCard: function(eD) {
                checkTingCards_YuanJiangGuiHuZi();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.newTingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.newTingLayer){
                            MjClient.playui.newTingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.newTingLayer){
                        MjClient.playui.newTingLayer.visible = false;
                    }
                }
            },
            showNewTingLayer : function(cards){
                var tb = sData = MjClient.data.sData;
                var pl = sData.players[SelfUid()];
                // 做状态修改
                if(MjClient.playui.newTingLayer && pl.mjState == TableState.waitPut){
                    MjClient.playui.newTingLayer.showNewTingCard(cards);
                    if(MjClient.playui.tingLayer)
                        MjClient.playui.tingLayer.visible = false;
                }

            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("syNewTingLayer.json");
        this.addChild(UI.node);

        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._cardItem = this._back.getChildByName("cardItem");
        this._cardItem.visible = false;

        setWgtLayout(_back, [350 / 1280, 0], [0.5, 0.7], [0, 0]);


    },

    //显示听的牌
    showNewTingCard : function(cards){


        if(!curPlayerIsMe_YuanJiangGuiHuZi(0) )
            return;
        var len = 0;
        for (var index in cards) {
            len++;
        }


        // cards = [1];
        if(cards && len > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            this.width = this._bg.width;

            this._bg.width = 350;
            this._bg.height = 135;
            var subX = 0;
            var title =  this._back.getChildByName("title");
            var ty = this._cardItem.y;
            if(len > 4 && len < 13){
                title.setPositionY(this._bg.height - 30);
                subX = ((len - 3)  * this._cardItem.width);
                this._bg.width = ( this._bg.width + subX);
            }else if(len >= 13){

                subX = (10  * this._cardItem.width);
                this._bg.width = ( this._bg.width + subX);
                this._bg.height = 220;
                ty += 40;

                title.setPositionY(this._bg.height - 65);
            }




            var tempLen = len > 13 ? 13 : len;
            var posX = this._bg.width / (tempLen +1);

            var chText = ["零","一","二","三","四"];
            var indexX = 1; // X坐标数量

            // for(var i = 0; i < len; i++){
            for (var id in cards) {

                var card = this._cardItem.clone();
                this._back.addChild(card);
                this._cardList.push(card);
                // var text = textData[cards[i] + ""];
                card.getChildByName("card").loadTexture(MjClient.cardPath_YuanJiangGuiHuZi + "out" + id + ".png");
                card.getChildByName("text").setString("余" + chText[cards[id]] + "张" );
                card.visible = true;
                card.x = posX * indexX - (subX / 2);
                card.y = ty;
                if(indexX >= 13){
                    indexX = 0;
                    ty -= 85;
                }
                indexX++;

            }
            MjClient.playui.newTingLayer.visible = ziPai.getTingPai() == 0 ? true : false;
        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});

var LiuHuQiangPhzTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_liuHuQiang(0)){
                        checkTingCards_liuHuQiang();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat || 
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        checkTingCards_liuHuQiang();
                    }else{
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    }
                }
                // getPut2TingStats_hongZi();
            },
            mjhand: function() {
            },
            HZAddCards: function(){
                checkTingCards_liuHuQiang();
            },
            HZPickCard: function(eD) {
                checkTingCards_liuHuQiang();
                // getPut2TingStats_hongZi();
            },
            HZNewCard: function() {
                checkTingCards_liuHuQiang();
            },
            MJPut: function() {
                checkTingCards_liuHuQiang();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_liuHuQiang(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_liuHuQiang();
                }
                // getPut2TingStats_hongZi();
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_liuHuQiang(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_liuHuQiang();
                }

                // getPut2TingStats_hongZi();
            },
            HZGangCard: function(eD) {
                checkTingCards_liuHuQiang();
            },
            HZWeiCard: function(eD) {
                checkTingCards_liuHuQiang();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            showTingLayer : function(cards){
                if(MjClient.playui.tingLayer && ziPai.getTingPai() == 0){ 
                    MjClient.playui.tingLayer.showTingCard(cards);
                    if(MjClient.playui.newTingLayer)
                        MjClient.playui.newTingLayer.visible = false;
                }
                
            },
            changeMJBgEvent : function() {
                MjClient.cardPath_liuHuQiang = ziPai.getCardFilePath();
                checkTingCards_liuHuQiang();
            },
            EZP_tingPai : function() {
                if(MjClient.playui.tingLayer && ziPai.getTingPai() == 1){ 
                    MjClient.playui.tingLayer.visible = false;
                    return;
                }
                checkTingCards_liuHuQiang();
            }

        }
    },
    ctor: function () {
        this._super();
        MjClient.cardPath_liuHuQiang = ziPai.getCardFilePath();
        
        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("phzTingLayer.json");
        this.addChild(UI.node);

        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;
 
        setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
        this.backX = this._back.x;
 

    },

    //显示听的牌
    showTingCard : function(cards){
        cc.log("showTingCard:", cards); 
        // cards = [1,2,3,4,5,6,7,8,9,10,21,22,23,24,25];//,26,27,28,29,30];
        if(cards && cards.length > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            var len = cards.length;
            if(len > 4){
                this._bg.width = 305 + (len - 4) * (45);
            }else{
                this._bg.width = 150 + (len -1) * 45;
            }
            this.width = this._bg.width;

            this._ting.x = 48 + (305 - this._bg.width) * 0.5
            var tx = 96 + (305 - this._bg.width) * 0.5;
            var ty = this._card.y;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card); 
                this._cardList.push(card);
                card.loadTexture(MjClient.cardPath_liuHuQiang + "out" + cards[i] + ".png");
                card.visible = true;
                card.x = tx;
                card.y = ty; 
                tx += card.width + 5;
            }

            if((this.backX - this.width * this._back.getScale() * 0.5) < 0){
                this._back.x = this.width * 0.5 * this._back.getScale();
            }else{
                this._back.x = this.backX;
            }

        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});

var ChenZhouMaoHuZiTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_chenZhouZiPai(0)){
                        checkTingCards_chenZhouZiPai();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat ||
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        checkTingCards_chenZhouZiPai();
                    }else{
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    }
                }
            },
            HZAddCards: function(){
                checkTingCards_chenZhouZiPai();
            },
            HZPickCard: function(eD) {
                checkTingCards_chenZhouZiPai();
            },
            HZNewCard: function() {
                checkTingCards_chenZhouZiPai();
            },
            MJPut: function() {
                checkTingCards_chenZhouZiPai();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_chenZhouZiPai(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_chenZhouZiPai();
                }
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_chenZhouZiPai(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_chenZhouZiPai();
                }
            },
            HZGangCard: function(eD) {
                checkTingCards_chenZhouZiPai();
            },
            HZCheckRaise: function(eD) {
                checkTingCards_chenZhouZiPai();
            },
            HZWeiCard: function(eD) {
                checkTingCards_chenZhouZiPai();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            showTingLayer : function(cards){
                if(MjClient.playui.tingLayer){
                    MjClient.playui.tingLayer.showTingCard(cards);
                }

            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("phzTingLayer.json");
        this.addChild(UI.node);
        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        _back.setSwallowTouches(false);
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;

        setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
    },

    //显示听的牌
    showTingCard : function(cards){
        cc.log("showTingCard:", cards);
        if(ziPai.getTingPai() == 1){
            this.visible = false;
            return;
        }

        if(MjClient.data.sData.tData.tState == TableState.roundFinish){
            this.visible = false;
            return;
        }
        // cards = [1];
        if(cards && cards.length > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            var len = cards.length;
            if(len > 4){
                this._bg.width = 305 + (len - 4) * (42);
            }else{
                this._bg.width = 150 + (len -1) * 42;
            }
            this.width = this._bg.width;

            this._ting.x = 48 + (305 - this._bg.width) * 0.5
            var tx = 96 + (305 - this._bg.width) * 0.5;
            var ty = this._card.y;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card);
                this._cardList.push(card);
                var path = ziPai.getCardFilePath();
                card.loadTexture(path + "out" + cards[i] + ".png");
                card.visible = true;
                card.x = tx;
                card.y = ty;

                tx += card.width + 5;
            }

        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});

var xiangXiRQSTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_chenZhouZiPai(0)){
                        checkTingCards_chenZhouZiPai();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat ||
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        checkTingCards_chenZhouZiPai();
                    }else{
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    }
                }
            },
            HZAddCards: function(){
                checkTingCards_chenZhouZiPai();
            },
            HZPickCard: function(eD) {
                checkTingCards_chenZhouZiPai();
            },
            HZNewCard: function() {
                checkTingCards_chenZhouZiPai();
            },
            MJPut: function() {
                checkTingCards_chenZhouZiPai();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_chenZhouZiPai(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_chenZhouZiPai();
                }
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_chenZhouZiPai(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_chenZhouZiPai();
                }
            },
            HZGangCard: function(eD) {
                checkTingCards_chenZhouZiPai();
            },
            HZCheckRaise: function(eD) {
                checkTingCards_chenZhouZiPai();
            },
            HZWeiCard: function(eD) {
                checkTingCards_chenZhouZiPai();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            showTingLayer : function(cards){
                if(MjClient.playui.tingLayer){
                    MjClient.playui.tingLayer.showTingCard(cards);
                }

            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("phzTingLayer.json");
        this.addChild(UI.node);
        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        _back.setSwallowTouches(false);
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;

        setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
    },

    //显示听的牌
    showTingCard : function(cards){
        cc.log("showTingCard:", cards);
        if(ziPai.getTingPai() == 1){
            this.visible = false;
            return;
        }

        if(MjClient.data.sData.tData.tState == TableState.roundFinish){
            this.visible = false;
            return;
        }
        // cards = [1];
        if(cards && cards.length > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            var len = cards.length;
            if(len > 4){
                this._bg.width = 305 + (len - 4) * (42);
            }else{
                this._bg.width = 150 + (len -1) * 42;
            }
            this.width = this._bg.width;

            this._ting.x = 48 + (305 - this._bg.width) * 0.5
            var tx = 96 + (305 - this._bg.width) * 0.5;
            var ty = this._card.y;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card);
                this._cardList.push(card);
                var path = ziPai.getCardFilePath();
                card.loadTexture(path + "out" + cards[i] + ".png");
                card.visible = true;
                card.x = tx;
                card.y = ty;

                tx += card.width + 5;
            }

        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});

var changDePaoHuZiTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_changDePaoHuZi(0)){
                        checkTingCards_changDePaoHuZi();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat ||
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        checkTingCards_changDePaoHuZi();
                    }else{
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    }
                }
            },
            HZAddCards: function(){
                checkTingCards_changDePaoHuZi();
            },
            HZPickCard: function(eD) {
                checkTingCards_changDePaoHuZi();
            },
            HZNewCard: function() {
                checkTingCards_changDePaoHuZi();
            },
            MJPut: function() {
                checkTingCards_changDePaoHuZi();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_changDePaoHuZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_changDePaoHuZi();
                }
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_changDePaoHuZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_changDePaoHuZi();
                }
            },
            HZGangCard: function(eD) {
                checkTingCards_changDePaoHuZi();
            },
            HZCheckRaise: function(eD) {
                checkTingCards_changDePaoHuZi();
            },
            HZWeiCard: function(eD) {
                checkTingCards_changDePaoHuZi();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            showTingLayer : function(cards){
                if(MjClient.playui.tingLayer){
                    MjClient.playui.tingLayer.showTingCard(cards);
                }

            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("phzTingLayer.json");
        this.addChild(UI.node);
        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        _back.setSwallowTouches(false);
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;

        setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
    },

    //显示听的牌
    showTingCard : function(cards){
        cc.log("showTingCard:", cards);
        if(ziPai.getTingPai() == 1){
            this.visible = false;
            return;
        }

        if(MjClient.data.sData.tData.tState == TableState.roundFinish){
            this.visible = false;
            return;
        }
        // cards = [1];
        if(cards && cards.length > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            var len = cards.length;
            if(len > 4){
                this._bg.width = 305 + (len - 4) * (42);
            }else{
                this._bg.width = 150 + (len -1) * 42;
            }
            this.width = this._bg.width;

            this._ting.x = 48 + (305 - this._bg.width) * 0.5
            var tx = 96 + (305 - this._bg.width) * 0.5;
            var ty = this._card.y;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card);
                this._cardList.push(card);
                var path = ziPai.getCardFilePath();
                if(ziPai.getZiPaiType() == 3)
                {
                    path ="playing/paohuzi/MJBg3/";
                }
                card.loadTexture(path + "out" + cards[i] + ".png");
                card.visible = true;
                card.x = tx;
                card.y = ty;

                tx += card.width + 5;
            }

        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});
var yuanLingPaoHuZiTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_yuanLingPaoHuZi(0)){
                        checkTingCards_yuanLingPaoHuZi();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat ||
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        checkTingCards_yuanLingPaoHuZi();
                    }else{
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    }
                }
            },
            HZAddCards: function(){
                checkTingCards_yuanLingPaoHuZi();
            },
            HZPickCard: function(eD) {
                checkTingCards_yuanLingPaoHuZi();
            },
            HZNewCard: function() {
                checkTingCards_yuanLingPaoHuZi();
            },
            MJPut: function() {
                checkTingCards_yuanLingPaoHuZi();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_yuanLingPaoHuZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_yuanLingPaoHuZi();
                }
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_yuanLingPaoHuZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_yuanLingPaoHuZi();
                }
            },
            HZGangCard: function(eD) {
                checkTingCards_yuanLingPaoHuZi();
            },
            HZCheckRaise: function(eD) {
                checkTingCards_yuanLingPaoHuZi();
            },
            HZWeiCard: function(eD) {
                checkTingCards_yuanLingPaoHuZi();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            showTingLayer : function(cards){
                if(MjClient.playui.tingLayer){
                    MjClient.playui.tingLayer.showTingCard(cards);
                }

            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("phzTingLayer.json");
        this.addChild(UI.node);
        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        _back.setSwallowTouches(false);
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;

        setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
    },

    //显示听的牌
    showTingCard : function(cards){
        cc.log("showTingCard:", cards);
        if(ziPai.getTingPai() == 1){
            this.visible = false;
            return;
        }

        if(MjClient.data.sData.tData.tState == TableState.roundFinish){
            this.visible = false;
            return;
        }
        // cards = [1];
        if(cards && cards.length > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            var len = cards.length;
            if(len > 4){
                this._bg.width = 305 + (len - 4) * (42);
            }else{
                this._bg.width = 150 + (len -1) * 42;
            }
            this.width = this._bg.width;

            this._ting.x = 48 + (305 - this._bg.width) * 0.5
            var tx = 96 + (305 - this._bg.width) * 0.5;
            var ty = this._card.y;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card);
                this._cardList.push(card);
                var path = ziPai.getCardFilePath();
                if(ziPai.getZiPaiType() == 3)
                {
                    path ="playing/paohuzi/MJBg3/";
                }
                card.loadTexture(path + "out" + cards[i] + ".png");
                card.visible = true;
                card.x = tx;
                card.y = ty;

                tx += card.width + 5;
            }

        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});
var shiMenPaoHuZiTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_changDePaoHuZi(0)){
                        checkTingCards_changDePaoHuZi();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat ||
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        checkTingCards_changDePaoHuZi();
                    }else{
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    }
                }
            },
            HZAddCards: function(){
                checkTingCards_changDePaoHuZi();
            },
            HZPickCard: function(eD) {
                checkTingCards_changDePaoHuZi();
            },
            HZNewCard: function() {
                checkTingCards_changDePaoHuZi();
            },
            MJPut: function() {
                checkTingCards_changDePaoHuZi();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_changDePaoHuZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_changDePaoHuZi();
                }
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_changDePaoHuZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_changDePaoHuZi();
                }
            },
            HZGangCard: function(eD) {
                checkTingCards_changDePaoHuZi();
            },
            HZCheckRaise: function(eD) {
                checkTingCards_changDePaoHuZi();
            },
            HZWeiCard: function(eD) {
                checkTingCards_changDePaoHuZi();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            showTingLayer : function(cards){
                if(MjClient.playui.tingLayer){
                    MjClient.playui.tingLayer.showTingCard(cards);
                }

            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("phzTingLayer.json");
        this.addChild(UI.node);
        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        _back.setSwallowTouches(false);
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;

        setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
    },

    //显示听的牌
    showTingCard : function(cards){
        cc.log("showTingCard:", cards);
        if(ziPai.getTingPai() == 1){
            this.visible = false;
            return;
        }

        if(MjClient.data.sData.tData.tState == TableState.roundFinish){
            this.visible = false;
            return;
        }
        // cards = [1];
        if(cards && cards.length > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            var len = cards.length;
            if(len > 4){
                this._bg.width = 305 + (len - 4) * (42);
            }else{
                this._bg.width = 150 + (len -1) * 42;
            }
            this.width = this._bg.width;

            this._ting.x = 48 + (305 - this._bg.width) * 0.5
            var tx = 96 + (305 - this._bg.width) * 0.5;
            var ty = this._card.y;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card);
                this._cardList.push(card);
                var path = ziPai.getCardFilePath();
                card.loadTexture(path + "out" + cards[i] + ".png");
                card.visible = true;
                card.x = tx;
                card.y = ty;

                tx += card.width + 5;
            }

        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});
var zplychzPhzTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_leiyang(0)){
                        checkTingCards_leiyang();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat || 
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        checkTingCards_leiyang();
                    }else{
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    }
                }
                // getPut2TingStats_hongZi();
            },
            mjhand: function() {
            },
            HZAddCards: function(){
                checkTingCards_leiyang();
            },
            HZPickCard: function(eD) {
                checkTingCards_leiyang();
                // getPut2TingStats_hongZi();
            },
            HZNewCard: function() {
                checkTingCards_leiyang();
            },
            MJPut: function() {
                checkTingCards_leiyang();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_leiyang(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_leiyang();
                }
                // getPut2TingStats_hongZi();
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_leiyang(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_leiyang();
                }

                // getPut2TingStats_hongZi();
            },
            HZGangCard: function(eD) {
                checkTingCards_leiyang();
            },
            HZWeiCard: function(eD) {
                checkTingCards_leiyang();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            showTingLayer : function(cards){
                if(MjClient.playui.tingLayer){ 
                    MjClient.playui.tingLayer.showTingCard(cards);
                    if(MjClient.playui.newTingLayer)
                        MjClient.playui.newTingLayer.visible = false;
                }
                
            }
        }
    },
    ctor: function () {
        this._super();

        MjClient.cardPath_leiyang = ziPai.getCardFilePath();
        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("phzTingLayer.json");
        this.addChild(UI.node);

        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;
 
        setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
        this.backX = this._back.x;
 

    },

    //显示听的牌
    showTingCard : function(cards){
        cc.log("showTingCard:", cards); 
        // cards = [1,2,3,4,5,6,7,8,9,10,21,22,23,24,25];//,26,27,28,29,30];
        if(cards && cards.length > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            var len = cards.length;
            if(len > 4){
                this._bg.width = 305 + (len - 4) * (45);
            }else{
                this._bg.width = 150 + (len -1) * 45;
            }
            this.width = this._bg.width;

            this._ting.x = 48 + (305 - this._bg.width) * 0.5
            var tx = 96 + (305 - this._bg.width) * 0.5;
            var ty = this._card.y;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card); 
                this._cardList.push(card);
                card.loadTexture(MjClient.cardPath_leiyang + "out" + cards[i] + ".png");
                card.visible = true;
                card.x = tx;
                card.y = ty; 
                tx += card.width + 5;
            }

            if((this.backX - this.width * this._back.getScale() * 0.5) < 0){
                this._back.x = this.width * 0.5 * this._back.getScale();
            }else{
                this._back.x = this.backX;
            }

        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});

var HanShouPaoHuZiTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_hanShouPaoHuZi(0)){
                        checkTingCards_hanShouPaoHuZi();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat ||
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        checkTingCards_hanShouPaoHuZi();
                    }else{
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    }
                }
            },
            HZAddCards: function(){
                checkTingCards_hanShouPaoHuZi();
            },
            HZPickCard: function(eD) {
                checkTingCards_hanShouPaoHuZi();
            },
            HZNewCard: function() {
                checkTingCards_hanShouPaoHuZi();
            },
            MJPut: function() {
                checkTingCards_hanShouPaoHuZi();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_hanShouPaoHuZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_hanShouPaoHuZi();
                }
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_hanShouPaoHuZi(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_hanShouPaoHuZi();
                }
            },
            HZGangCard: function(eD) {
                checkTingCards_hanShouPaoHuZi();
            },
            HZCheckRaise: function(eD) {
                checkTingCards_hanShouPaoHuZi();
            },
            HZWeiCard: function(eD) {
                checkTingCards_hanShouPaoHuZi();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            showTingLayer : function(cards){
                if(MjClient.playui.tingLayer){
                    MjClient.playui.tingLayer.showTingCard(cards);
                }

            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("phzTingLayer.json");
        this.addChild(UI.node);
        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        _back.setSwallowTouches(false);
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;

        setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
    },

    //显示听的牌
    showTingCard : function(cards){
        cc.log("showTingCard:", cards);
        if(ziPai.getTingPai() == 1){
            this.visible = false;
            return;
        }

        if(MjClient.data.sData.tData.tState == TableState.roundFinish){
            this.visible = false;
            return;
        }
        // cards = [1];
        if(cards && cards.length > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            var len = cards.length;
            if(len > 4){
                this._bg.width = 305 + (len - 4) * (42);
            }else{
                this._bg.width = 150 + (len -1) * 42;
            }
            this.width = this._bg.width;

            this._ting.x = 48 + (305 - this._bg.width) * 0.5
            var tx = 96 + (305 - this._bg.width) * 0.5;
            var ty = this._card.y;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card);
                this._cardList.push(card);
                var path = ziPai.getCardFilePath();
                card.loadTexture(path + "out" + cards[i] + ".png");
                card.visible = true;
                card.x = tx;
                card.y = ty;

                tx += card.width + 5;
            }

        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});


var YlShiHuKaPhzTingLayer = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!curPlayerIsMe_hengYang(0)){
                        checkTingCards_hengYang();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat || 
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        checkTingCards_hengYang();
                    }else{
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    }
                }
                // getPut2TingStats_hongZi();
            },
            mjhand: function() {
            },
            HZAddCards: function(){
                checkTingCards_hengYang();
            },
            HZPickCard: function(eD) {
                checkTingCards_hengYang();
                // getPut2TingStats_hongZi();
            },
            HZNewCard: function() {
                checkTingCards_hengYang();
            },
            MJPut: function() {
                checkTingCards_hengYang();
            },
            MJPeng: function(eD) {
                if(curPlayerIsMe_hengYang(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_hengYang();
                }
                // getPut2TingStats_hongZi();
            },
            HZChiCard: function(eD) {
                if(curPlayerIsMe_hengYang(0)){
                    MjClient.playui.tingLayer.visible = false;
                }else{
                    checkTingCards_hengYang();
                }

                // getPut2TingStats_hongZi();
            },
            HZGangCard: function(eD) {
                checkTingCards_hengYang();
            },
            HZWeiCard: function(eD) {
                checkTingCards_hengYang();
            },
            roundEnd: function(eD){
                if(MjClient.playui && MjClient.playui.tingLayer){
                    setTimeout(function(){
                        if(MjClient.playui && MjClient.playui.tingLayer){
                            MjClient.playui.tingLayer.visible = false;
                        }
                    },2000);
                    if(MjClient.playui && MjClient.playui.tingLayer){
                        MjClient.playui.tingLayer.visible = false;
                    }
                }
            },
            showTingLayer : function(cards){
                if(MjClient.playui.tingLayer){ 
                    MjClient.playui.tingLayer.showTingCard(cards);
                    if(MjClient.playui.newTingLayer)
                        MjClient.playui.newTingLayer.visible = false;
                }
                
            }
        }
    },
    ctor: function () {
        this._super();

        this._initUI();
    },

    _initUI : function(){
        this.visible = false;
        this._cardList = [];

        var UI = ccs.load("phzTingLayer.json");
        this.addChild(UI.node);

        BindUiAndLogic(UI.node, this.jsBind);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;
 
        setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
        this.backX = this._back.x;
 

    },

    //显示听的牌
    showTingCard : function(cards){
        cc.log("showTingCard:", cards); 
        // cards = [1,2,3,4,5,6,7,8,9,10,21,22,23,24,25];//,26,27,28,29,30];
        if(cards && cards.length > 0){
            for(var i = 0; i < this._cardList.length; i++){
                var c = this._cardList[i];
                if(c && cc.sys.isObjectValid(c)){
                    c.removeFromParent(true);
                }
                c = null;
            }
            this._cardList = [];

            this.visible = true;

            var len = cards.length;
            if(len > 4){
                this._bg.width = 305 + (len - 4) * (45);
            }else{
                this._bg.width = 150 + (len -1) * 45;
            }
            this.width = this._bg.width;

            this._ting.x = 48 + (305 - this._bg.width) * 0.5
            var tx = 96 + (305 - this._bg.width) * 0.5;
            var ty = this._card.y;
            for(var i = 0; i < len; i++){
                var card = this._card.clone();
                this._back.addChild(card); 
                this._cardList.push(card);
                card.loadTexture(MjClient.cardPath_hengYang + "out" + cards[i] + ".png");
                card.visible = true;
                card.x = tx;
                card.y = ty; 
                tx += card.width + 5;
            }

            if((this.backX - this.width * this._back.getScale() * 0.5) < 0){
                this._back.x = this.width * 0.5 * this._back.getScale();
            }else{
                this._back.x = this.backX;
            }

        }else{
            this.visible = false;
            cc.log("phzTingLayer.visible:", this.visible);
        }
    }
});