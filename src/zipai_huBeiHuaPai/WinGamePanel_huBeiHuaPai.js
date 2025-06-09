/*
* @Author: Administrator
* @Date:   2019-12-14 14:15:19
* @Last Modified by:   zzj
* @Last Modified time: 2020-01-03 19:39:05
*/
function initCardPath_huBeiHuaPai() {
    MjClient.curCardPath = 'playing/huaPai/big/type1/';
    if (MjClient.playui) {
        MjClient.curCardPath = MjClient.playui.getCardFilePath();
    }
}

//裁剪字符串 超出以...表示
function sliceStrByLen_huBeiHuaPai(str,length) {
    var tempStr = str;
    var strlen = str.length;
    if(cc.isUndefined(length) || length == null)
    {
        return str;
    }
    if(strlen >= length)
    {
        tempStr =  tempStr.substring(0,length - 1);
        tempStr += "...";
        // cc.log("sking mystr =  " + _newName);
    }
    return tempStr;
};

// 手牌.暂不显示.没法摆放
function addPlayerHandCards_huBeiHuaPai(node, off) {
    var card = node.getChildByName("card");
    card.visible = false;
    var pl = MjClient.playui.getUIPlayer(off);
    var cardArr = MjClient.majiang.sortCard(pl.mjhand);
    for(var i  = 0; i < cardArr.length; i++){
        var lineNode = new cc.Node();
        for(var j = 0; j < cardArr[i].length; j++){
            var cardClone = card.clone();
            cardClone.visible = true;
            cardClone.loadTexture(MjClient.curCardPath + "out" + cardArr[i][j] + ".png");
            lineNode.addChild(cardClone);

            cardClone.y = j * cardClone.height * cardClone.scale;
        }
        node.addChild(lineNode);
        if(node.getName() == "leftPanel"){
            lineNode.x = i * card.width * card.scale;
        }else if(node.getName() == "rightPanel"){
            lineNode.x = node.width - i * card.width * card.scale;
        }
    }
}

function addDiPaiCards_huBeiHuaPai(node) {
    var card = node.getChildByName("card");
    card.visible = false;

    var tData = MjClient.data.sData.tData;
    var cards = MjClient.data.sData.cards;
    var cnt = MjClient.majiang.getAllCardsTotal() - tData.cardNext;
    for(var i = tData.cardNext; i < MjClient.majiang.getAllCardsTotal(); i++){
        var cardClone = card.clone();
        cardClone.visible = true;
        node.addChild(cardClone);
        cardClone.loadTexture(MjClient.curCardPath + "out" + cards[i] + ".png");

        cardClone.x = (i - tData.cardNext) % 40 * cardClone.width * cardClone.scale;
        if (cnt <= 40) {
            cardClone.y = node.height / 2 + cardClone.height / 2;
        } else {
            cardClone.y = node.height - Math.floor((i - tData.cardNext) / 40) * cardClone.height * cardClone.scale;
        }  
    }
}

// 无埋牌.备用
function addMaiPaiCards_huBeiHuaPai(node) {
    var tData = MjClient.data.sData.tData;
    if (!tData.areaSelectMode.isMaiPai) {
        return;
    }
    var card = node.getChildByName("card");
    card.visible = false;

    var cards = MjClient.data.sData.cards;
    var index = MjClient.majiang.getAllCardsTotal();
    for(var i = index; i < cards.length; i++){
        var cardClone = card.clone();
        cardClone.visible = true;
        node.addChild(cardClone);
        cardClone.loadTexture(MjClient.curCardPath + "out" + cards[i] + ".png");

        cardClone.x = (i - index) % 40 * cardClone.width * cardClone.scale;
        cardClone.y = (1 - Math.floor((i - index) / 40)) * cardClone.height * cardClone.scale;
    }
} 

function setSortCard_huBeiHuaPai(node, item, pl) {
    var sortArr = pl.mjsort;
    var tData = MjClient.data.sData.tData;
    var isWinner = false;
    if (tData.winner != -1 && tData.uids[tData.winner] == pl.info.uid) {
        isWinner = true;
    }
    var isScale = false;
    if (!isWinner && tData.maxPlayer != 2 && pl.info.uid != SelfUid()) {
        isScale = true;
    }
    var isMoveY = false;
    if (tData.winner == -1 && pl.info.uid == SelfUid()) {
        isMoveY = true;
    }
    var sortTitle = {
        mjpeng:{resPath:"gameOver/huaPai/icon_dui.png"},

        fan:{resPath:"gameOver/huaPai/icon_fan.png"},
        zhao:{resPath:"gameOver/huaPai/icon_zhao.png"},
        mjgang1:{resPath:"gameOver/huaPai/icon_zha.png"}, 

        kan:{resPath:"gameOver/huaPai/icon_kan.png"},
        kou:{resPath:"gameOver/huaPai/icon_kou.png"},
        ju:{resPath:"gameOver/huaPai/icon_ju.png"},
        dui:{resPath:"gameOver/huaPai/icon_dui.png"},
        dan:{resPath:"gameOver/huaPai/icon_dan.png"}
    };
    
    function addOneItem(itemName, cards) {
        var itemClone = item.clone();
        itemClone.visible = true;
        node.addChild(itemClone);

        var head = itemClone.getChildByName("head");
        head.visible = false;
        var name = itemName;
        if (itemName == 'mjgang0') {
            name = cards.length == 4 ? 'zhao' : 'fan';
        }  
        if (isWinner) {
            head.loadTexture(sortTitle[name].resPath);
            head.visible = true;
        }

        var card = itemClone.getChildByName("card");
        card.visible  = false;

        for(var i = 0; i < cards.length; i++){
            var cardClone = card.clone();
            cardClone.visible = true;
            cardClone.loadTexture(MjClient.curCardPath + "out" + cards[i] + ".png");
            cardClone.tag = cards[i];
            itemClone.addChild(cardClone);
            cardClone.y -= (i * cardClone.height * cardClone.scale - (isMoveY ? card.height*0.8 : 0));
        }
        item.x += item.width * (isScale ? 0.8 : 1);
        item.x -= item.width * 0.3; //再次修正.摆不下
    }

    var handArr = [];
    for(var i = 0; i < sortArr.length; i++){
       var name =  sortArr[i].name;
       var pos = sortArr[i].pos;
       addOneItem(name, pl[name][pos]);
    }

    if(tData.uids[tData.winner] == pl.info.uid){
        handArr = pl.handSort;
    }else{
        handArr = MjClient.majiang.sortEndCard(pl.mjhand, pl.mjgang1);
    }

    for(var i = 0; i < handArr.length; i++){
        addOneItem(handArr[i].name, handArr[i].cards);
    }
}

function setScore_huBeiHuaPai(node, pl){
    var tData = MjClient.data.sData.tData;
    var pnlScore = node.getChildByName("pnl_score");
    //分数
    var textFen = pnlScore.getChildByName('txt_score').getChildByName('text');
    var score = pl.winone >= 0 ? ('+' + pl.winone) : pl.winone;
    if (pl.winone >= 0) {
        textFen.setProperty('+' + pl.winone, 'gameOver/huaPai/zi_ying.png', 32, 43, '+');
    } else {
        textFen.setProperty(pl.winone, 'gameOver/huaPai/zi_shu.png', 32, 43, '+');
    }
    textFen.ignoreContentAdaptWithSize(true);

    //胡息
    var textXi = pnlScore.getChildByName('txt_huxi');
    if (!cc.sys.isObjectValid(textXi)) {
        return;
    }
    textXi.ignoreContentAdaptWithSize(true);
    if (tData.uids[tData.winner] == pl.info.uid) {
        textXi.visible = true;
        var huxiLab = textXi.getChildByName('text');
        huxiLab.setString(pl.huXi);
        huxiLab.ignoreContentAdaptWithSize(true);
    } else {
        textXi.visible = false;
    }
}

function setWinner_huBeiHuaPai(node, pl) {
    var tData = MjClient.data.sData.tData;
    var huIcon = node.getChildByName("huIcon");
    var huCard = node.getChildByName("img_huCard");
    huCard.visible = false;
    huIcon.visible = false;
    var jingCard = node.getChildByName("img_jingCard");
    if (cc.sys.isObjectValid(jingCard)) {
        jingCard.visible = false;
    }
    if(tData.winner != -1) {
        if (tData.uids[tData.winner] == pl.info.uid) {
            huIcon.visible = true;
            huCard.visible = true;
            var huNum = tData.putType == 0 ? tData.lastPutCard : pl.mjhand[pl.mjhand.length - 1];
            huCard.loadTexture(MjClient.curCardPath + 'out' + huNum + '.png');
            if (tData.zhuJing > 0 && cc.sys.isObjectValid(jingCard)) {
                jingCard.loadTexture(MjClient.curCardPath + 'out' + tData.zhuJing + '.png');
                jingCard.visible = true;
            }
        } else if (tData.putType == 0 && tData.uids[tData.lastPutPlayer] == pl.info.uid ){
            huIcon.visible = true;
            huIcon.loadTexture('gameOver/huaPai/icon_dianchong.png');
            huCard.visible = false;
        }
    }

    var headBg = node.getChildByName("headBg");
    MjClient.playui.setPlayerHead(headBg, pl);
    MjClient.playui.setOffLine(headBg, pl); 

    var playerName = node.getChildByName("playerName");
    playerName.ignoreContentAdaptWithSize(true);
    playerName.setString(sliceStrByLen_huBeiHuaPai(unescape(pl.info.nickname), 5)); //todo

    var cardSort = node.getChildByName("cardSort");
    var cardItem = cardSort.getChildByName("cardItem");
    cardItem.visible = false;
    setSortCard_huBeiHuaPai(cardSort, cardItem, pl);
    setScore_huBeiHuaPai(node, pl);

    // 名堂
    var pnlMingTang = node.getChildByName("pnl_mingTang");
    pnlMingTang.visible = false;
    var item = pnlMingTang.getChildByName('item');
    item.visible = false;

    var gap = {x:40, y:8};
    var maxW = pnlMingTang.width;
    var cur = {x:item.x, y:item.y};
    if (tData.uids[tData.winner] == pl.info.uid) {
        pnlMingTang.visible = true;
        for (var k in pl.hzdesc) {
            var mtTxt = item.clone();
            mtTxt.ignoreContentAdaptWithSize(true);
            mtTxt.visible = true;
            mtTxt.setString(pl.hzdesc[k]);
            if (cur.x + gap.x + mtTxt.width > maxW) {
                //换行
                mtTxt.x = item.x;
                mtTxt.y = cur.y - item.height - gap.y;
            } else {
                mtTxt.x = cur.x;
                mtTxt.y = cur.y; 
            }
            cur.x = mtTxt.x + mtTxt.width + gap.x;
            cur.y = mtTxt.y;
            pnlMingTang.addChild(mtTxt);
            mtTxt.visible = true;
        }
    }
}


function setPlayer_huBeiHuaPai(node, pl) {
    var headBg = node.getChildByName("headBg");
    MjClient.playui.setPlayerHead(headBg, pl);
    MjClient.playui.setOffLine(headBg, pl); 

    var playerName = node.getChildByName("playerName");
    playerName.ignoreContentAdaptWithSize(true);
    playerName.setString(sliceStrByLen_huBeiHuaPai(unescape(pl.info.nickname), 5));

    // 点铳
    var imgDianChong = node.getChildByName('img_dianchong');
    var isDianChong = false;
    var tData = MjClient.data.sData.tData;
    if (tData.winner != -1 && tData.putType == 0) {
        isDianChong = pl.info.uid == tData.uids[tData.lastPutPlayer];
    }
    imgDianChong.visible = !!isDianChong;

    var cardSort = node.getChildByName("cardSort");
    var cardItem = cardSort.getChildByName("cardItem");
    cardItem.visible = false;
    setSortCard_huBeiHuaPai(cardSort, cardItem, pl);

    setScore_huBeiHuaPai(node, pl);
}


function addPlayerItem_huBeiHuaPai(node) {
    var winner = node.getChildByName("winner");
    winner.visible = true;
    var player = node.getChildByName("player");
    player.visible = false;
    var loseForTwo = node.getChildByName("loseForTwo");
    loseForTwo.visible = false;

    var sData = MjClient.data.sData;
    var tData = sData.tData;

    var firstIndex = tData.winner != -1 ? tData.winner : tData.uids.indexOf(SelfUid());
    var firstPlayer = tData.uids[firstIndex];
    setWinner_huBeiHuaPai(winner, sData.players[firstPlayer]);

    for(var uid in sData.players){
        if(uid == firstPlayer){
            continue;
        }
        var item;
        if(MjClient.playui.getPlayersNum() == 2){
            loseForTwo.visible = true;
            setWinner_huBeiHuaPai(loseForTwo, sData.players[uid]);
        }else{
            item = player.clone();
            item.visible = true;
            setPlayer_huBeiHuaPai(item, sData.players[uid]);

            player.y -= player.height;
            player.y += 20;
            node.addChild(item);
        }
    }
}

var EndOneView_huBeiHuaPai = cc.Layer.extend({
    jsBind: {
        block: {
            _layout: [[1, 0], [0.5, 0.5], [0, 0]],
            _run:function () {
                MjClient.endoneui.block = this;
            }
        },
        playPanel: {
            _layout: [[1, 1], [0.5, 0.5], [0, 0]],
            _run: function () {
                this.visible = false;
                MjClient.endoneui.playerPanel = this;
            },
            leftPanel: {
                _run: function () {
                    if(MjClient.rePlayVideo != -1){
                        this.visible = false;
                    }
                    addPlayerHandCards_huBeiHuaPai(this, MjClient.playui.getPlayersNum() - 1);
                }
            },
            rightPanel: {
                _run: function () {
                    if (MjClient.playui.getPlayersNum() == 2 || MjClient.rePlayVideo != -1) {
                        this.visible = false;
                    }
                    addPlayerHandCards_huBeiHuaPai(this, MjClient.playui.getPlayersNum() - 2);
                }
            },
        },
        resultPanel: {
            _layout: [[1, 1], [0.5, 0.5], [0, 0]],
            _run: function () {
                MjClient.endoneui.resultPanel = this;
                addPlayerItem_huBeiHuaPai(this);
            },
            titleResult: {
                _run: function () {
                    var tData = MjClient.data.sData.tData;
                    if (tData.winner == -1) {
                        this.loadTexture("gameOver/huaPai/title_pingju.png");
                        if (MjClient.isDismiss) {
                            this.loadTexture("gameOver/huaPai/title_jiesan.png"); 
                        }
                    } else {
                        if (tData.uids[tData.winner] == SelfUid()) {
                            this.loadTexture("gameOver/huaPai/title_shengli.png");
                        } else {
                            this.loadTexture("gameOver/huaPai/title_shibai.png");
                        }
                    }
                }
            },
            diPai:{
                cardList:{
                    _run:function () {
                        addDiPaiCards_huBeiHuaPai(this);
                    }
                }
            },
            maiPai:{
                _run:function () {
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    this.visible = tData.areaSelectMode.isMaiPai ? true : false;
                },
                cardList:{
                    _run:function () {
                        addMaiPaiCards_huBeiHuaPai(this);
                    }
                }
            },
            txt_roomNum: {
                _run:function() {
                    this.setString('房号: ' + MjClient.data.sData.tData.tableid);
                    this.ignoreContentAdaptWithSize(true);
                }
            },
            txt_roomInfo: {
                _run:function() {
                    var tData = MjClient.data.sData.tData;
                    var str = '玩法: ' + tData.gameCnName;
                    str += '    ' + '第' + MjClient.playui.curRound + '/' + tData.roundAll + '局';
                    this.setString(str);
                    this.ignoreContentAdaptWithSize(true);
                }
            },
            txt_start: {
                _visible: false, //未找到此参数
                _run:function() {
                    this.ignoreContentAdaptWithSize(true);
                }
            },
            txt_end: {
                _run:function() {
                    this.setString('结束 ' + MjClient.roundEndTime);
                    this.ignoreContentAdaptWithSize(true);
                }
            },
            dissType: {
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    this.setVisible(MjClient.isDismiss);
                    if (MjClient.isDismiss)
                    {  
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;

                        var id = tData.firstDel;
                        var pl = sData.players[id];
                        var delStr = "";
                        if(pl) {
                            var name  =  unescape(pl.info.nickname );
                            delStr = name + pl.mjdesc[0]; 
                        } else {
                            delStr = tData.dissolveWay == -1? '系统停服自动解散房间':'会长或管理员解散房间';
                        }  
                        this.setString("" + delStr) ;
                    }
                }
            }
        },
        commonPanel: {
            _layout: [[1, 1], [0.5, 0.5], [0, 0]],
            switchBtn: {
                buttonBg: {
                    _run: function () {
                        MjClient.endoneui.switchButtonBg = this;
                    }
                },
                resultShow: {
                    _click: function (btn, eT) {
                        MjClient.endoneui.switchButtonBg.x = btn.x;
                        MjClient.endoneui.block.visible = true;
                        MjClient.endoneui.playerPanel.visible = false;
                        MjClient.endoneui.resultPanel.visible = true;
                    }
                },
                playShow: {
                    _click: function (btn, eT) {
                        MjClient.endoneui.switchButtonBg.x = btn.x;
                        MjClient.endoneui.block.visible = false;
                        MjClient.endoneui.playerPanel.visible = true;
                        MjClient.endoneui.resultPanel.visible = false;
                    }
                }
            },
            continueBtn: {
                _click: function (btn, eT) {
                    playMusic("bgHongZi");
                    postEvent("clearCardUI");
                    postEvent("clearCardArr");
                    MjClient.endoneui.removeFromParent(true);
                    MjClient.endoneui = null;
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    if (MjClient.rePlayVideo >= 0 && MjClient.replayui) {
                        MjClient.replayui.replayEnd();
                    }
                    else {
                        MjClient.gamenet.request("pkroom.handler.tableMsg", {
                            cmd: "MJPass"
                        });
                    }
                    if (MjClient.endallui)
                    {
                        MjClient.endallui.visible = true;
                    }
                }
            },
            roundInfo: {
                _run: function () {
                    this.setString(MjClient.playui.getGameCnDesc());
                }
            },
        }
    },
    
    ctor: function () {
        this._super();
        initCardPath_huBeiHuaPai();
        MjClient.endoneui = this;
        var endoneui = ccs.load("endOne_huBeiHuaPai.json");
        BindUiAndLogic(endoneui.node, this.jsBind);
        this.addChild(endoneui.node);
        return true;
    }
});