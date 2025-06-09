
var majiang_getCard = cc.Layer.extend({
    ctor:function () {
        this._super();
        var UI = ccs.load("maJiang_getCard.json");
        this._node = UI.node;
        this.addChild(this._node);
        MjClient.getCardLayer = this;

        this.initUI()
    },

    initUI:function(){
        let btn_showLayer = this._node.getChildByName("btn_showLayer")
        let block = this._node.getChildByName("block")
        let back = this._node.getChildByName("back")
        let card = back.getChildByName("card")
        let cardnum = back.getChildByName("card_num")

        block.visible = false
        back.visible = false
        this.block = block
        this.back = back
        this.isAuth = true

        setWgtLayout(btn_showLayer, [100/1280, 0], [0, 1], [0, 0]);
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        COMMON_UI.setNodeTextAdapterSize(back);
        btn_showLayer.addTouchEventListener(function(sender, type) {
            if (type == 2 && this.isAuth) {
                this.getData()
            }
        },this);

        block.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                block.visible = false
                back.visible = false
            }
        },this);

        back.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                block.visible = false
                back.visible = false
            }
        },this);

        card.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if(this.cardNumList[sender.tag] <= 0){
                    cc.log("没有这张牌了")
                    return;
                }
                var sendInfo = {
                    cmd: "MJGetCard",
                    card: sender.tag,
                }
                MjClient.gamenet.request("pkroom.handler.tableMsg", sendInfo, function(){});
                block.visible = false
                back.visible = false
            }
        },this);

        var allCardsArray = [
            1,  2,  3,  4,  5,  6,  7,  8,  9,
            11, 12, 13, 14, 15, 16, 17, 18, 19,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 
            31, 41, 51, 61, 71, 81, 91, 
            111, 121, 131, 141, 151, 161, 171, 181
        ];
        this.allCardsArray = allCardsArray
        this.cardNumList = []

        for(let i = 0;i < allCardsArray.length;i++){
            var cardNode = getNewCard(back, "card", "zuoPai", allCardsArray[i], 0);
            cardNode.tag = allCardsArray[i]
            cardNode.setPosition(60+(i%11)*116,20+(Math.floor(i/11))*175 + 85)
            let _cardnum = cardnum.clone()
            cardNode.addChild(_cardnum)
            _cardnum.setPosition(52,5)

            this.cardNumList[allCardsArray[i]] = 0
        }
    },

    getData:function(){
        MjClient.gamenet.request("pkroom.handler.tableMsg", {cmd: "MJRestCard"});
    },

    setData:function(data){
        cc.log("MJRestCard = ",JSON.stringify(data))
        this.isAuth = data.isAuth
        if(data.isAuth == false){
            return;
        }
        // this.grayAllCard()
        for(var i in this.cardNumList){
            this.cardNumList[i] = data.tip[i] || 0
            let card = this.back.getChildByTag(i)
            card.getChildByName("card_num").setString(this.cardNumList[i] + "张")
            if(this.cardNumList[i] > 0){
                card.setColor(cc.color(255,255,255))
            }else{
                card.setColor(cc.color(77,77,77))
            }
        }
        this.block.visible = true
        this.back.visible = true
    },

    grayAllCard:function(){
        for(let i = 0;i < this.allCardsArray.length;i++){
            let card = this.back.getChildByTag(this.allCardsArray[i])
            card.setColor(cc.color(77,77,77))
        }
    },

    onExit: function () {
        this._super();
        MjClient.getCardLayer = null;
    },
});

