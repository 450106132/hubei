/*
* @Author: Administrator
* @Date:   2019-12-14 14:15:19
* @Last Modified by:   zzj
* @Last Modified time: 2020-01-16 10:53:03
*/
function initCardPath_tongChengGeZiPai() {
    MjClient.curCardPath = 'playing/huaPai/tongChengGeZiPai/big/type1/';
    if (MjClient.playui) {
        MjClient.curCardPath = MjClient.playui.getCardFilePath();
    }
}

//裁剪字符串 超出以...表示
function sliceStrByLen_tongChengGeZiPai(str,length) {
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
function addPlayerHandCards_tongChengGeZiPai(node, off) {
    var card = node.getChildByName("card");
    card.visible = false;
    var pl = MjClient.playui.getUIPlayer(off);
    var cardArr = MjClient.majiang.sortCardForOtherReplay(pl.mjhand);
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
            lineNode.x = i * card.width * card.scale;
        }else if(node.getName() == 'xingPanel') {
            lineNode.x = node.width - i * card.width * card.scale;
        }
    }
}

function addDiPaiCards_tongChengGeZiPai(node) {
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
function addMaiPaiCards_tongChengGeZiPai(node) {
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

// 是否赢家
function isWinner_tongChengGeZiPai(uid) {
    var tData = MjClient.data.sData.tData;
    if (tData.winners.length == 0) {
        return false;
    }
    var uidIdx = tData.uids.indexOf(uid);
    return tData.winners.indexOf(uidIdx) >= 0;
}

// 获取大赢家
function isMaxWinner_tongChengGeZiPai(uid) {
    var tData = MjClient.data.sData.tData;
    if (tData.winners.length == 0) {
        return false;
    }
    var wins = tData.winners;
    var maxWin = wins[0];
    for (var i = 1; i < wins.length; i++) {
        var p = MjClient.data.sData.players[tData.uids[wins[i]]];
        if (p.winone > maxWin)
            maxWin = wins[i];
    }
    return tData.uids[maxWin] == uid;
}

function setSortCard_tongChengGeZiPai(node, item, pl) {
    var sortArr = pl.mjsort;
    var tData = MjClient.data.sData.tData;
    var isWinner = isWinner_tongChengGeZiPai(pl.info.uid);
    var isMaxWinner = isMaxWinner_tongChengGeZiPai(pl.info.uid);

    var isDuiDie = false;
    if (tData.winners.length > 0) {
        isDuiDie = !isMaxWinner;
    } else {
        isDuiDie = pl.info.uid != SelfUid();
    }

    var isMoveY = false;
    if (tData.winners.length == 0) {
        isMoveY = true;                 //没有赢家.此时不显示门牌名称.上移牌
    } else {
        isMoveY = !isWinner;            //有赢家.输家不显示门牌名称.上移牌
    } 

    // 牌上移因子
    var moveRate = tData.maxPlayer == 3 ? 0.7 : 0.4;

    var sortTitle = {
        mjpeng:{resPath:"gameOver/huaPai/icon_peng.png"},
        dui:{resPath:"gameOver/huaPai/icon_peng.png"},

        zhao:{resPath:"gameOver/huaPai/icon_zhao.png"},
        hua:{resPath:"gameOver/huaPai/icon_hua.png"},
        guan:{resPath:"gameOver/huaPai/icon_guan.png"}, 

        kan:{resPath:"gameOver/huaPai/icon_kan.png"},
        kou:{resPath:"gameOver/huaPai/icon_kou.png"},
        ju:{resPath:"gameOver/huaPai/icon_ju.png"},
    };
    
    function addOneItem(itemName, cards) {
        var itemClone = item.clone();
        itemClone.visible = true;
        node.addChild(itemClone);

        var head = itemClone.getChildByName("head");
        head.visible = false;
        var name = itemName;
        if (itemName == 'mjgang0') {
            name = cards.length == 4 ? 'zhao' : 'hua';
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
            cardClone.zIndex = i;
            itemClone.addChild(cardClone);
            cardClone.y -= (i * cardClone.height * cardClone.scale - (isMoveY ? card.height*moveRate : 0));
            cardClone.y += isDuiDie ? cardClone.height * cardClone.scaleY * 0.4 * i : 0;
        }
        item.x += item.width;
        //item.x -= item.width * 0.3; //再次修正.摆不下
    }

    var handArr = [];
    for(var i = 0; i < sortArr.length; i++){
        var name =  sortArr[i].name;
        var pos = sortArr[i].pos;
        if (name == 'mjgang1' || name == 'mjchi') {
            continue;
        }
        addOneItem(name, pl[name][pos]);
    }

    if(isWinner){
        handArr = pl.handSort;
    }else{
        handArr = MjClient.majiang.sortEndCard(pl.mjhand, pl.mjgang1);
    }

    for(var i = 0; i < handArr.length; i++){
        addOneItem(handArr[i].name, handArr[i].cards);
    }
}

function setScore_tongChengGeZiPai(node, pl){
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
}

function setMingTang_tongChengGeZiPai(node, pl) {
    var tData = MjClient.data.sData.tData;
    var pnlMingTang = node.getChildByName("pnl_mingTang");
    pnlMingTang.visible = false;
    if (tData.winner == -1) 
        return;
    var isWinner = false;
    if (tData.uids[tData.winner] == pl.info.uid) {
        isWinner = true;
    }
    if (!isWinner) 
        return;

    pnlMingTang.visible = true;
    //胡牌
    var huNum = tData.putType == 0 ? tData.lastPutCard : pl.mjhand[pl.mjhand.length - 1];
    var huCard = pnlMingTang.getChildByName('text_huCard').getChildByName('img_huCard');
    huCard.loadTexture(MjClient.curCardPath + 'out' + huNum + '.png');

    //跑牌
    var textPaoCard = pnlMingTang.getChildByName('text_paoCard');
    setPaoCards_tongChengGeZiPai(textPaoCard, pl);

    //胡息
    var textHuXi = pnlMingTang.getChildByName('text_huNum').getChildByName('text');
    textHuXi.setString(pl.huXi);

    //跑牌点数
    var paoData = pl.hzdesc.jingDict;
    var textPaoNum = pnlMingTang.getChildByName('text_paoNum').getChildByName('text');
    textPaoNum.setString(paoData.score);
}

function setWinner_tongChengGeZiPai(node, pl) {
    var tData = MjClient.data.sData.tData;
    var huIcon = node.getChildByName("huIcon");
    huIcon.visible = false;

    var headBg = node.getChildByName("headBg");
    MjClient.playui.setPlayerHead(headBg, pl);
    MjClient.playui.setOffLine(headBg, pl); 

    var playerName = node.getChildByName("playerName");
    playerName.ignoreContentAdaptWithSize(true);
    playerName.setString(sliceStrByLen_tongChengGeZiPai(unescape(pl.info.nickname), 5)); //todo

    //跑分
    var paoIcon = node.getChildByName('img_paoFen');
    paoIcon.visible = false;
    if (pl.piaoFen > 0) {
        paoIcon.visible = true;
        paoIcon.loadTexture('playing/ziPaiTable/tongChengGeZi/paoFen_' + pl.piaoFen + '.png');
    }

    var cardSort = node.getChildByName("cardSort");
    var cardItem = cardSort.getChildByName("cardItem");
    cardItem.visible = false;
    setSortCard_tongChengGeZiPai(cardSort, cardItem, pl);

    setScore_tongChengGeZiPai(node, pl);

    // 名堂
    setMingTang_tongChengGeZiPai(node, pl);
}

function setPaoCards_tongChengGeZiPai(node, pl) {
    if (!isWinner_tongChengGeZiPai(pl.info.uid)) {
        node.visible = false;
        return;
    }

    node.visible = true;
    var paoData = pl.hzdesc.jingDict;
    var paoCard = node.getChildByName('img_paoCard');
    paoCard.visible = false;
    if (paoData.huaCount > 0) {
        var cur = 0;
        for (var k in paoData.dict) {
            var card = paoCard.clone();
            card.visible = true;
            card.loadTexture(MjClient.curCardPath + 'out' + k + '.png');
            var textNum = card.getChildByName('text');
            textNum.visible = false;
            var num = paoData.dict[k.toString()];
            if (num > 1) {
                textNum.visible = true;
                textNum.setString('x' + num);
                textNum.ignoreContentAdaptWithSize(true);
            }
            card.x += cur * card.width * card.scaleX;
            cur++;
            node.addChild(card);
        }
    }
};

function setPlayer_tongChengGeZiPai(node, pl) {
    var headBg = node.getChildByName("headBg");
    MjClient.playui.setPlayerHead(headBg, pl);
    MjClient.playui.setOffLine(headBg, pl); 

    var playerName = node.getChildByName("playerName");
    playerName.ignoreContentAdaptWithSize(true);
    playerName.setString(sliceStrByLen_tongChengGeZiPai(unescape(pl.info.nickname), 5));

    // 点铳
    var imgDianChong = node.getChildByName('img_dianchong');
    var isDianChong = false;
    var tData = MjClient.data.sData.tData;
    if (tData.winners.length > 0 && tData.putType == 0) {
        isDianChong = pl.info.uid == tData.uids[tData.lastPutPlayer];
    }
    imgDianChong.visible = isDianChong;


    // 跑分
    var paoIcon = node.getChildByName('img_paoFen');
    paoIcon.visible = false;
    if (pl.piaoFen > 0) {
        paoIcon.visible = true;
        paoIcon.loadTexture('playing/ziPaiTable/tongChengGeZi/paoFen_' + pl.piaoFen + '.png');
    }

    // 跑牌
    var textPaoCard = node.getChildByName('text_paoCard');
    setPaoCards_tongChengGeZiPai(textPaoCard, pl);

    var cardSort = node.getChildByName("cardSort");
    var cardItem = cardSort.getChildByName("cardItem");
    cardItem.visible = false;
    setSortCard_tongChengGeZiPai(cardSort, cardItem, pl);

    setScore_tongChengGeZiPai(node, pl);
}


function addPlayerItem_tongChengGeZiPai(node) {
    var winner = node.getChildByName("winner");
    winner.visible = true;
    var player = node.getChildByName("player");
    player.visible = false;
    var playerFor4 = node.getChildByName("playerFor4");
    playerFor4.visible = false;

    var sData = MjClient.data.sData;
    var tData = sData.tData;

    //取tData.winners数组字段.支持一炮多响
    function getMaxWinner() {
        var wins = tData.winners;
        var maxWin = wins[0];
        for (var i = 1; i < wins.length; i++) {
            var pl = sData.players[tData.uids[wins[i]]];
            if (pl.winone > maxWin)
                maxWin = wins[i];
        }
        return maxWin;
    }

    var firstIndex = -1;
    if (tData.winners.length > 0) {
        firstIndex = getMaxWinner(); 
    } else {
        firstIndex = tData.uids.indexOf(SelfUid());
    }
    var firstPlayer = tData.uids[firstIndex];
    setWinner_tongChengGeZiPai(winner, sData.players[firstPlayer]);

    for(var uid in sData.players){
        if(uid == firstPlayer){
            continue;
        }
        var item;
        if(MjClient.playui.getPlayersNum() == 3){
            item = player.clone();
            item.visible = true;
            setPlayer_tongChengGeZiPai(item, sData.players[uid]);

            player.y -= player.height - 26;
            node.addChild(item);
        } else if (MjClient.playui.getPlayersNum() == 4) {
            item = playerFor4.clone();
            item.visible = true;
            setPlayer_tongChengGeZiPai(item, sData.players[uid]);

            playerFor4.y -= playerFor4.height + 6;
            node.addChild(item);
        }
    }
}

var EndOneView_tongChengGeZiPai = cc.Layer.extend({
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
                    addPlayerHandCards_tongChengGeZiPai(this, MjClient.playui.getPlayersNum() - 1);
                }
            },
            rightPanel: {
                _run: function () {
                    if (MjClient.playui.getPlayersNum() == 3 || MjClient.rePlayVideo != -1) {
                        this.visible = false;
                    }
                    if (MjClient.playui.getPlayersNum() == 4) {
                        addPlayerHandCards_tongChengGeZiPai(this, MjClient.playui.getPlayersNum() - 2);
                    }
                }
            },
            xingPanel: {
                _run: function() {
                    if (MjClient.rePlayVideo != -1) {
                        this.visible = false;
                    }
                    addPlayerHandCards_tongChengGeZiPai(this, 1);
                }
            }
        },
        resultPanel: {
            _layout: [[1, 1], [0.5, 0.5], [0, 0]],
            _run: function () {
                MjClient.endoneui.resultPanel = this;
                addPlayerItem_tongChengGeZiPai(this);
            },
            titleResult: {
                _run: function () {
                    var tData = MjClient.data.sData.tData;
                    if (tData.winners.length == 0) {
                        this.loadTexture("gameOver/huaPai/title_pingju.png");
                        if (MjClient.isDismiss) {
                            this.loadTexture("gameOver/huaPai/title_jiesan.png"); 
                        }
                    } else {
                        if (isWinner_tongChengGeZiPai(SelfUid())) {
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
                        addDiPaiCards_tongChengGeZiPai(this);
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
                        addMaiPaiCards_tongChengGeZiPai(this);
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
        initCardPath_tongChengGeZiPai();
        MjClient.endoneui = this;
        var endoneui = ccs.load("endOne_tongChengGeZiPai.json");
        BindUiAndLogic(endoneui.node, this.jsBind);
        this.addChild(endoneui.node);
        return true;
    }
});