var tingLayer_ziPai = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!MjClient.playui.isCurPlayer(0)){
                        MjClient.playui.checkTingCards();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat ||
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        MjClient.playui.checkTingCards();
                    }else{
                        this.visible = false;
                    }
                }
            },
            HZCheckRaise: function() {
                MjClient.playui.checkTingCards();
            },
            HZAddCards: function(){
                MjClient.playui.checkTingCards();
            },
            HZPickCard: function(eD) {
                MjClient.playui.checkTingCards();
            },
            HZNewCard: function() {
                MjClient.playui.checkTingCards();
            },
            MJPut: function() {
                MjClient.playui.checkTingCards();
            },
            MJPeng: function(eD) {
                if(MjClient.playui.isCurPlayer(0)){
                    this.visible = false;
                }else{
                    MjClient.playui.checkTingCards();
                }
            },
            HZChiCard: function(eD) {
                if(MjClient.playui.isCurPlayer(0)){
                    this.visible = false;
                }else{
                    MjClient.playui.checkTingCards();
                }
            },
            HZGangCard:function (eD) {
                MjClient.playui.checkTingCards();
            },
            HZLiuCard: function(eD) {
                MjClient.playui.checkTingCards();
            },
            HZWeiCard: function(eD) {
                MjClient.playui.checkTingCards();
            },
            roundEnd: function(eD){
                this.visible = false;
            },
            showTingLayer : function(cards){
                this.showTingCard(cards);

            },
            EZP_tingPai:function (index) {
                MjClient.playui.checkTingCards();
            },
            EZP_cardType : function(eD){
                MjClient.playui.changeCardFrame(this, eD.type);
            },
            clearCardUI: function() {
                this.visible = false;
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
        BindUiAndLogic(this, this.jsBind);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._card = this._back.getChildByName("card");
        this._ting = this._back.getChildByName("tingIcon");
        this._card.visible = false;

        setWgtLayout(_back, [305 / 1280, 0], [0.22, 0.5], [0, 0]);
        this.backX = this._back.x;
    },

    isShowTing: function () {
        if (!MjClient.playui.isInPlay()) {
            return false;
        }
        return MjClient.playui.getTingPaiType() == 0 ? true : false;
    },
    //显示听的牌
    showTingCard : function(cards){
        this.visible = this.isShowTing();
        if(!this.visible){
            return;
        }
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
                var src = MjClient.playui.getCardSrc("out", cards[i])
                //card.loadTexture(src, MjClient.playui.getResType());
                MjClient.playui.loadCardTexture(card, src, MjClient.playui.getResType());
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
        }
    }
});

var tingByPutLayer_ziPai = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!MjClient.playui.isCurPlayer(0)){
                        MjClient.playui.checkTingCards();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat ||
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        MjClient.playui.checkTingCards();
                    }
                }
            },
            HZAddCards: function(){
                MjClient.playui.checkTingCards();
            },
            HZPickCard: function(eD) {
                MjClient.playui.checkTingCardsNew();
            },
            HZNewCard: function() {
                MjClient.playui.checkTingCards();
            },
            MJPut: function() {
                MjClient.playui.checkTingCards();
            },
            MJPeng: function(eD) {
                if(MjClient.playui.isCurPlayer(0)){
                    this.visible = false;
                }else{
                    MjClient.playui.checkTingCards();
                }
            },
            HZChiCard: function(eD) {
                if(MjClient.playui.isCurPlayer(0)){
                    this.visible = false;
                }else{
                    MjClient.playui.checkTingCards();
                }
            },
            HZGangCard:function (eD) {
                MjClient.playui.checkTingCards();
            },
            HZLiuCard: function(eD) {
                MjClient.playui.checkTingCards();
            },
            HZWeiCard: function(eD) {
                MjClient.playui.checkTingCards();
            },
            roundEnd: function(eD){
                this.visible = false;
            },
            showNewTingLayer : function(cards){
                var pl = MjClient.data.sData.players[SelfUid()];
                // 做状态修改
                if(pl.mjState == TableState.waitPut){
                    this.showNewTingCard(cards);
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

        BindUiAndLogic(this, this.jsBind);

        var _back = UI.node.getChildByName("back");
        this._back = _back;
        this._bg = _back.getChildByName("bg");
        this._cardItem = this._back.getChildByName("cardItem");
        this._cardItem.visible = false;

        setWgtLayout(_back, [350 / 1280, 0], [0.5, 0.7], [0, 0]);
    },

    isShowTing: function () {
        return MjClient.playui.getTingPaiType() == 0 ? true : false;
    },

    //显示听的牌
    showNewTingCard : function(cards){
        if(!MjClient.playui.isCurPlayer(0))
            return;
        this.visible = this.isShowTing();
        if(!this.visible){
            return;
        }
        var len = 0;
        for (var index in cards) {
            len++;
        }

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

            for (var id in cards) {

                var card = this._cardItem.clone();
                this._back.addChild(card);
                this._cardList.push(card);
                var src = MjClient.playui.getCardSrc("out", id);
                //card.getChildByName("card").loadTexture(src, MjClient.playui.getResType());
                MjClient.playui.loadCardTexture(card.getChildByName("card"), src, MjClient.playui.getResType());
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
        }
    }
});

var tingPanel_ziPai = cc.Layer.extend({
    _cardList : null,
    jsBind:{
        _event:{
            initSceneData: function() {
                if(MjClient.data.sData.tData.tState == TableState.waitPut){
                    if(!MjClient.playui.isCurPlayer(0)){
                        MjClient.playui.checkTingStats();
                    }
                }else{
                    if(MjClient.data.sData.tData.tState == TableState.waitEat ||
                        MjClient.data.sData.tData.tState == TableState.waitCard){
                        MjClient.playui.checkTingStats();
                    }else{
                        this.visible = false;
                    }
                }
            },
            HZCheckRaise: function() {
                MjClient.playui.checkTingStats();
            },
            HZAddCards: function(){
                MjClient.playui.checkTingStats();
            },
            HZPickCard: function(eD) {
                MjClient.playui.checkTingStats();
            },
            HZNewCard: function() {
                MjClient.playui.checkTingStats();
            },
            MJPut: function() {
                MjClient.playui.checkTingStats();
            },
            MJPeng: function(eD) {
                if(MjClient.playui.isCurPlayer(0)){
                    this.visible = false;
                }else{
                    MjClient.playui.checkTingStats();
                }
            },
            HZChiCard: function(eD) {
                if(MjClient.playui.isCurPlayer(0)){
                    this.visible = false;
                }else{
                    MjClient.playui.checkTingStats();
                }
            },
            HZGangCard:function (ed) {
                MjClient.playui.checkTingStats();
            },
            HZLiuCard: function(eD) {
                MjClient.playui.checkTingStats();
            },
            HZWeiCard: function(eD) {
                MjClient.playui.checkTingStats();
            },
            MJPass:function () {
                MjClient.playui.checkTingStats();
            },
            roundEnd: function(eD){
                this.visible = false;
            },
            showTingStats : function(tingStats){
                this.showTingStats(tingStats);
            },
            EZP_tingPai:function () {
                MjClient.playui.checkTingStats();
            },
            EZP_cardType : function(eD){
                MjClient.playui.changeCardFrame(this, eD.type);
            },
            clearCardUI: function() {
                this.visible = false;
            }
        }
    },
    ctor: function () {
        this._super();
        this._initUI();
    },

    _initUI : function(){
        this.visible = false;

        var UI = ccs.load("tingPanel_ziPai.json");
        this.addChild(UI.node);
        BindUiAndLogic(this, this.jsBind);

        this.layout_back = UI.node.getChildByName("layout_back");
        this.img_bg = this.layout_back.getChildByName("img_bg");
        this.layout_item = this.layout_back.getChildByName("layout_item");
        this.layout_item.visible = false;
        this.tingStatsList = [];

        setWgtLayout(this.layout_back, [293 / 1280, 0], [0.3, 0.5], [0, 0]);
    },

    isShowTing: function () {
        if (!MjClient.playui.isInPlay()) {
            return false;
        }
        return MjClient.playui.getTingPaiType() == 0 ? true : false;
    },
    //显示听的牌
    showTingStats : function(tingStats){
        this.visible = this.isShowTing();
        if(!this.visible){
            return;
        }
        this.visible = false;
        for(var i = 0; i < this.tingStatsList.length; i++){
            this.tingStatsList[i].removeFromParent(true);
        }
        this.tingStatsList = [];
        var i = 0;
        if(tingStats){
            for(var card in tingStats){
                var item = this.layout_item.clone();
                item.visible = true;
                item.x = this.layout_item.x + i * this.layout_item.width;
                this.layout_back.addChild(item);
                this.tingStatsList.push(item);
                var img_card = item.getChildByName("img_card");
                var text_num = item.getChildByName("text_num");
                var src = MjClient.playui.getCardSrc("out", Number(card));
                MjClient.playui.loadCardTexture(img_card, src, MjClient.playui.getResType());
                text_num.setString(tingStats[card]);

                i++;

                if(!this.visible){
                    this.visible = true;
                }
            }
            this.img_bg.width = Math.max((i + 1), 6) * this.layout_item.width;
        }
    }
});