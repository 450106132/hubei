/*
* @Author: Administrator
* @Date:   2019-12-14 14:15:19
* @Last Modified by:   zzj
* @Last Modified time: 2019-12-20 18:25:28
*/
function initCardPath_dangYangFanJing() {
    MjClient.curCardPath = 'playing/huaPai/big/type1/';
    if (MjClient.playui) {
        MjClient.curCardPath = MjClient.playui.getCardFilePath();
    }
}

//裁剪字符串 超出以...表示
function sliceStrByLen_dangYangFanJing(str,length) {
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
function addPlayerHandCards_dangYangFanJing(node, off) {
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

function addDiPaiCards_dangYangFanJing(node) {
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
function addMaiPaiCards_dangYangFanJing(node) {
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

function setSortCard_dangYangFanJing(node, item, pl) {
    var sortArr = pl.mjsort;
    var tData = MjClient.data.sData.tData;
    var sortTitle = {
        mjpeng:{resPath:"gameOver/huaPai/icon_dui.png", count:3},
        mjchi:{resPath:"gameOver/huaPai/icon_chi.png", count:3},
        mjgang0:{resPath:"gameOver/huaPai/icon_mao.png", count:4},
        mjgang1:{resPath:"gameOver/huaPai/icon_mao.png", count:4},
        peng:{resPath:"gameOver/huaPai/icon_dui.png", count:3},
        men:{resPath:"gameOver/huaPai/icon_chi.png", count:3},
        kan:{resPath:"gameOver/huaPai/icon_kan.png", count:3},
        san:{resPath:"gameOver/huaPai/icon_kou.png", count:3},
        kou:{resPath:"gameOver/huaPai/icon_kou.png", count:2},
    };
    
    function addOneItem(itemName, cards) {
        var itemClone = item.clone();
        itemClone.visible = true;
        node.addChild(itemClone);

        var head = itemClone.getChildByName("head");
        head.loadTexture(cards.length == 2 ? sortTitle["kou"].resPath: sortTitle[itemName].resPath);

        var card = itemClone.getChildByName("card");
        card.visible  = false;

        for(var i = 0; i < cards.length; i++){
            var cardClone = card.clone();
            cardClone.visible = true;
            cardClone.loadTexture(MjClient.curCardPath + "out" + cards[i] + ".png");
            cardClone.tag = cards[i];
            itemClone.addChild(cardClone);
            cardClone.y -= i * cardClone.height * cardClone.scale;
        }
        item.x += item.width;
        //添加精牌角标
        MjClient.playui.addJingIcon(itemClone);
    }

    var handArr = [];
    for(var i = 0; i < sortArr.length; i++){
       var name =  sortArr[i].name;
       var pos = sortArr[i].pos;
        if(name == "mjchi"){
            var eatCards = pl[name][pos].eatCards;
            addOneItem(name, eatCards);
        }else{
            var cardsTemp = [];
            for(var j = 0; j < sortTitle[name].count; j++){
                cardsTemp.push(pl[name][pos]);
            }
            addOneItem(name, cardsTemp);
        }
    }

    if(tData.uids[tData.winner] == pl.info.uid){
        handArr = pl.handSort;
    }else{
        handArr = MjClient.majiang.sortEndCard(pl.mjhand);
    }

    for(var i = 0; i < handArr.length; i++){
        addOneItem(handArr[i].name, handArr[i].cards);
    }
}

function setScore_dangYangFanJing(node, pl){
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
    if (tData.uids[tData.winner] == pl.info.uid) {
        textXi.visible = true;
        var huxiLab = textXi.getChildByName('text');
        huxiLab.setString(pl.huXi);
        huxiLab.ignoreContentAdaptWithSize(true);
    } else {
        textXi.visible = false;
    }
}

function setWinner_dangYangFanJing(node, pl) {
    var tData = MjClient.data.sData.tData;
    var huIcon = node.getChildByName("huIcon");
    var huCard = node.getChildByName("img_huCard");
    huCard.visible = false;
    huIcon.visible = false;
    if(tData.winner != -1) {
        if (tData.uids[tData.winner] == pl.info.uid) {
            huIcon.visible = true;
            huCard.visible = true;
            var huNum = tData.putType == 0 ? tData.lastPutCard : pl.mjhand[pl.mjhand.length - 1];
            huCard.loadTexture(MjClient.curCardPath + 'out' + huNum + '.png');
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
    playerName.setString(sliceStrByLen_dangYangFanJing(unescape(pl.info.nickname), 5)); //todo

    var cardSort = node.getChildByName("cardSort");
    var cardItem = cardSort.getChildByName("cardItem");
    cardItem.visible = false;
    setSortCard_dangYangFanJing(cardSort, cardItem, pl);
    setScore_dangYangFanJing(node, pl);

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


function setPlayer_dangYangFanJing(node, pl) {
    var headBg = node.getChildByName("headBg");
    MjClient.playui.setPlayerHead(headBg, pl);
    MjClient.playui.setOffLine(headBg, pl); 

    var playerName = node.getChildByName("playerName");
    playerName.ignoreContentAdaptWithSize(true);
    playerName.setString(sliceStrByLen_dangYangFanJing(unescape(pl.info.nickname), 5));

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
    setSortCard_dangYangFanJing(cardSort, cardItem, pl);

    setScore_dangYangFanJing(node, pl);
}


function addPlayerItem_dangYangFanJing(node) {
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
    setWinner_dangYangFanJing(winner, sData.players[firstPlayer]);

    for(var uid in sData.players){
        if(uid == firstPlayer){
            continue;
        }
        var item;
        if(MjClient.playui.getPlayersNum() == 2){
            loseForTwo.visible = true;
            setWinner_dangYangFanJing(loseForTwo, sData.players[uid]);
        }else{
            item = player.clone();
            item.visible = true;
            setPlayer_dangYangFanJing(item, sData.players[uid]);

            player.y -= player.height;
            player.y += 20;
            node.addChild(item);
        }
    }
}

var EndOneView_dangYangFanJing = cc.Layer.extend({
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
                    addPlayerHandCards_dangYangFanJing(this, MjClient.playui.getPlayersNum() - 1);
                }
            },
            rightPanel: {
                _run: function () {
                    if (MjClient.playui.getPlayersNum() == 2 || MjClient.rePlayVideo != -1) {
                        this.visible = false;
                    }
                    addPlayerHandCards_dangYangFanJing(this, MjClient.playui.getPlayersNum() - 2);
                }
            },
        },
        resultPanel: {
            _layout: [[1, 1], [0.5, 0.5], [0, 0]],
            _run: function () {
                MjClient.endoneui.resultPanel = this;
                addPlayerItem_dangYangFanJing(this);
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
                        addDiPaiCards_dangYangFanJing(this);
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
                        addMaiPaiCards_dangYangFanJing(this);
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
        initCardPath_dangYangFanJing();
        MjClient.endoneui = this;
        var endoneui = ccs.load("endOne_dangYangFanJing.json");
        BindUiAndLogic(endoneui.node, this.jsBind);
        this.addChild(endoneui.node);
        return true;
    }
});