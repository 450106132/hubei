/*
* @Author: Administrator
* @Date:   2019-12-14 14:15:19
* @Last Modified by:   zzj
* @Last Modified time: 2020-01-03 19:39:05
*/
function initCardPath_enShiShaoHu() {
    MjClient.curCardPath = 'playing/huaPai/enShiShaoHu/big/type1/';
    if (MjClient.playui) {
        MjClient.curCardPath = MjClient.playui.getCardFilePath();
    }
}

//裁剪字符串 超出以...表示
function sliceStrByLen_enShiShaoHu(str,length) {
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
    }
    return tempStr;
};

function addPlayerHandCards_enShiShaoHu(node, off) {
    var card = node.getChildByName("card");
    card.visible = false;
    var pl = MjClient.playui.getUIPlayer(off);
    var cardArr = MjClient.majiang.sortCard(pl.mjhand);
    for(var i  = 0; i < cardArr.length; i++){
        var lineNode = new cc.Node();
        for(var j = 0; j < cardArr[i].length; j++){
            var cardClone = card.clone();
            cardClone.visible = true;
            cardClone.loadTexture(MjClient.curCardPath + "hand" + cardArr[i][j] + ".png");
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

function addDiPaiCards_enShiShaoHu(node) {
    var card = node.getChildByName("card");
    card.visible = false;

    var tData = MjClient.data.sData.tData;
    var cards = MjClient.data.sData.cards;
    var cnt = MjClient.majiang.getAllCardsTotal() - tData.cardNext;
    for(var i = tData.cardNext; i < MjClient.majiang.getAllCardsTotal(); i++){
        var cardClone = card.clone();
        cardClone.visible = true;
        node.addChild(cardClone);
        cardClone.loadTexture(MjClient.curCardPath + "hand" + cards[i] + ".png");

        cardClone.x = (i - tData.cardNext) % 40 * cardClone.width * cardClone.scale;
        if (cnt <= 40) {
            cardClone.y = node.height / 2 + cardClone.height / 2;
        } else {
            cardClone.y = node.height - Math.floor((i - tData.cardNext) / 40) * cardClone.height * cardClone.scale;
        }  
    }
}

function addMaiPaiCards_enShiShaoHu(node) {
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
        cardClone.loadTexture(MjClient.curCardPath + "hand" + cards[i] + ".png");

        cardClone.x = (i - index) % 40 * cardClone.width * cardClone.scale;
        cardClone.y = (1 - Math.floor((i - index) / 40)) * cardClone.height * cardClone.scale;
    }
} 

function setSortCard_enShiShaoHu(node, item, pl) {
    var sortArr = pl.mjsort;
    var tData = MjClient.data.sData.tData;

    var sortTitle = {
        mjtie:{resPath:"gameOver/huaPai/enShiShaoHu/icon_k.png"},
        mjchi:{resPath:"gameOver/huaPai/enShiShaoHu/icon_d.png"},
        mjpeng:{resPath:"gameOver/huaPai/enShiShaoHu/icon_p.png", count:3},
        mjwei:{resPath:"gameOver/huaPai/enShiShaoHu/icon_s.png", count:3},
        mjgang1:{resPath:"gameOver/huaPai/enShiShaoHu/icon_axz.png"},
        mjgang0:{resPath:"gameOver/huaPai/enShiShaoHu/icon_mxz.png"},

        mingzhua:{resPath:"gameOver/huaPai/enShiShaoHu/icon_mxz.png"},
        anzhua:{resPath:"gameOver/huaPai/enShiShaoHu/icon_axz.png"},

        kan:{resPath:"gameOver/huaPai/enShiShaoHu/icon_s.png"},
        ju:{resPath:"gameOver/huaPai/enShiShaoHu/icon_d.png"},
        kou:{resPath:"gameOver/huaPai/enShiShaoHu/icon_k.png"},
        keZi:{resPath:"gameOver/huaPai/enShiShaoHu/icon_kz.png"},

        anBanKua:{resPath:"gameOver/huaPai/enShiShaoHu/icon_abk.png"},
        anmanKua:{resPath:"gameOver/huaPai/enShiShaoHu/icon_amk.png"},
        mingBanKua:{resPath:"gameOver/huaPai/enShiShaoHu/icon_mbk.png"},
        mingManKua:{resPath:"gameOver/huaPai/enShiShaoHu/icon_mmk.png"},
    };
    
    function getScore(resPath, cards) {
        var isHunCard = MjClient.majiang.isHunCard(cards[0]);
        for(var key in sortTitle){
            if(sortTitle[key].resPath == resPath){
                if(key == "mjchi" || key == "ju"){
                    return isHunCard ? 3 : 0;
                }else if(key == "mjpeng"){
                    return isHunCard ? 3 : 1;
                }else if(key == "mjwei" || key == "kan" || key == "keZi"){
                    return isHunCard ? 6 : 3;
                }else if(key == "mjgang1" || key == "anzhua"){
                    return isHunCard ? 12 : 6;
                }else if(key == "mjgang0" || key == "mingzhua"){
                    return isHunCard ? 10 : 5;
                }else if(key == "mjgang0" || key == "mingzhua"){
                    return isHunCard ? 10 : 5;
                }else if(key == "mjgang0" || key == "mingzhua"){
                    return isHunCard ? 10 : 5;
                }else if(key == "kou" || key == "mjtie"){
                    return isHunCard ? 2 : 0;
                }else if(key == "anBanKua"){
                    return isHunCard ? 13 : 6;
                }else if(key == "anmanKua"){
                    return isHunCard ? 14 : 6;
                }else if(key == "mingBanKua"){
                    return isHunCard ? 11 : 5;
                }else if(key == "mingManKua"){
                    return isHunCard ? 12 : 5;
                }else{
                    return 0;
                }
            }
        }
    };
    
    function addOneItem(name, cards) {
        var itemClone = item.clone();
        itemClone.visible = true;
        node.addChild(itemClone);

        var head = itemClone.getChildByName("head");
        var resPath = sortTitle[name].resPath;
        if(name == "mjgang1"){
            if(cards.length == 5){
                resPath = "gameOver/huaPai/enShiShaoHu/icon_abk.png"
            }else if(cards.length == 6){
                resPath = "gameOver/huaPai/enShiShaoHu/icon_amk.png"
            }

        }else if(name == "mjgang0"){
            if(cards.length == 5){
                resPath = "gameOver/huaPai/enShiShaoHu/icon_mbk.png"
            }else if(cards.length == 6){
                resPath = "gameOver/huaPai/enShiShaoHu/icon_mmk.png"
            }
        }
        head.loadTexture(resPath);
        head.ignoreContentAdaptWithSize(true);

        var text_score = itemClone.getChildByName("text_score");
        text_score.ignoreContentAdaptWithSize(true);
        if(tData.uids[tData.winner] == pl.info.uid){
            text_score.visible = true;
            var score = getScore(resPath, cards);
            text_score.setString(score);
        }else{
            text_score.visible = false;
        }

        var card = itemClone.getChildByName("card");
        card.visible  = false;

        for(var i = 0; i < cards.length; i++){
            var cardClone = card.clone();
            cardClone.visible = true;
            cardClone.loadTexture(MjClient.curCardPath + "hand" + cards[i] + ".png");
            cardClone.tag = cards[i];
            itemClone.addChild(cardClone);
            cardClone.y -= i * cardClone.height * cardClone.scale * 0.55;
            text_score.y = cardClone.y -  cardClone.height * cardClone.scale
        }
        var width = item.width * ((cards.length >= 4 && name != "kou") ? 2 : 1);
        itemClone.x = item.x + width * 0.5;
        item.x += width;
    }

    var handArr = [];
    //合并
    for(var i = 0; i < sortArr.length; i++){
        var name =  sortArr[i].name;
        var pos = sortArr[i].pos;
        if(name == "mjgang1" || name == "mjgang0"){
            var gangCards = pl[name][pos].gang.concat(pl[name][pos].ex);
            if(gangCards.length == 4){
                for(var j = 0; j < sortArr.length; j++){
                    var name1 = sortArr[j].name;
                    var pos1 = sortArr[j].pos;
                    if(name1 == "mjtie" && sortArr[j].gang == undefined){
                        var tieCards = pl[name1][pos1];
                        if(Math.floor(gangCards[0] / 10) == Math.floor(tieCards[0] / 10)){
                            sortArr[i].tie = j;
                            sortArr[j].gang = i;
                            break;
                        }
                    }
                }
            }
        }
    }
    for(var i = 0; i < sortArr.length; i++){
        var name =  sortArr[i].name;
        var pos = sortArr[i].pos;
        if(name == "mjchi"){
            var eatCards = pl[name][pos].eatCards;
            addOneItem(name, eatCards);
        }else if(name == "mjtie"){
            if(sortArr[i].gang == undefined){
                var eatCards = pl[name][pos];
                addOneItem(name, eatCards);
            }
        }else if(name == "mjgang1" || name == "mjgang0"){
            var gangCards = pl[name][pos].gang.concat(pl[name][pos].ex);
            if(sortArr[i].tie != undefined){
                var name1 = sortArr[sortArr[i].tie].name;
                var pos1 = sortArr[sortArr[i].tie].pos;
                gangCards = gangCards.concat(pl[name1][pos1]);
            }
            addOneItem(name, gangCards);
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
        handArr = MjClient.majiang.sortEndCard(pl.mjhand, pl.mjsort.length);
    }

    for(var i = 0; i < handArr.length; i++){
        addOneItem(handArr[i].name, handArr[i].cards);
    }
}

function setScore_enShiShaoHu(node, pl){
    var textFen = node.getChildByName('txt_score').getChildByName('text');
    if (pl.winone >= 0) {
        textFen.setProperty('+' + pl.winone, 'gameOver/huaPai/zi_ying.png', 32, 43, '+');
    } else {
        textFen.setProperty(pl.winone, 'gameOver/huaPai/zi_shu.png', 32, 43, '+');
    }
    textFen.ignoreContentAdaptWithSize(true);
}

function setWinner_enShiShaoHu(node, pl) {
    var tData = MjClient.data.sData.tData;

    var headBg = node.getChildByName("headBg");
    MjClient.playui.setPlayerHead(headBg, pl);
    MjClient.playui.setOffLine(headBg, pl); 

    var playerName = node.getChildByName("playerName");
    playerName.ignoreContentAdaptWithSize(true);
    playerName.setString(sliceStrByLen_enShiShaoHu(unescape(pl.info.nickname), 5)); //todo

    var cardSort = node.getChildByName("cardSort");
    var cardItem = cardSort.getChildByName("cardItem");
    cardItem.visible = false;
    setSortCard_enShiShaoHu(cardSort, cardItem, pl);
    setScore_enShiShaoHu(node, pl);

    //胡息
    var textXi = node.getChildByName('txt_huShu');
    textXi.ignoreContentAdaptWithSize(true);
    if (tData.uids[tData.winner] == pl.info.uid) {
        textXi.visible = true;
        var huxiLab = textXi.getChildByName('text');
        huxiLab.setString(pl.huXi);
        huxiLab.ignoreContentAdaptWithSize(true);
    } else {
        textXi.visible = false;
    }

    //枪数
    var textXi = node.getChildByName('txt_qiangShu');
    textXi.ignoreContentAdaptWithSize(true);
    if (tData.uids[tData.winner] == pl.info.uid) {
        textXi.visible = true;
        var huxiLab = textXi.getChildByName('text');
        huxiLab.setString(pl.qiangNum);
        huxiLab.ignoreContentAdaptWithSize(true);
    } else {
        textXi.visible = false;
    }
}


function setPlayer_enShiShaoHu(node, pl) {
    var headBg = node.getChildByName("headBg");
    MjClient.playui.setPlayerHead(headBg, pl);
    MjClient.playui.setOffLine(headBg, pl); 

    var playerName = node.getChildByName("playerName");
    playerName.ignoreContentAdaptWithSize(true);
    playerName.setString(sliceStrByLen_enShiShaoHu(unescape(pl.info.nickname), 5));

    var cardSort = node.getChildByName("cardSort");
    var cardItem = cardSort.getChildByName("cardItem");
    cardItem.visible = false;
    setSortCard_enShiShaoHu(cardSort, cardItem, pl);

    setScore_enShiShaoHu(node, pl);
}


function addPlayerItem_enShiShaoHu(node) {
    var winner = node.getChildByName("winner");
    winner.visible = true;
    var player = node.getChildByName("player");
    player.visible = false;

    var sData = MjClient.data.sData;
    var tData = sData.tData;

    var firstIndex = tData.winner != -1 ? tData.winner : tData.uids.indexOf(SelfUid());
    var firstPlayer = tData.uids[firstIndex];
    setWinner_enShiShaoHu(winner, sData.players[firstPlayer]);

    for(var uid in sData.players){
        if(uid == firstPlayer){
            continue;
        }
        var item = player.clone();
        item.visible = true;
        setPlayer_enShiShaoHu(item, sData.players[uid]);

        player.y -= player.height;
        player.y += 25;
        node.addChild(item);
    }
}

var EndOneView_enShiShaoHu = cc.Layer.extend({
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
                    addPlayerHandCards_enShiShaoHu(this, MjClient.playui.getPlayersNum() - 1);
                }
            },
            rightPanel: {
                _run: function () {
                    if (MjClient.playui.getPlayersNum() == 2 || MjClient.rePlayVideo != -1) {
                        this.visible = false;
                    }
                    addPlayerHandCards_enShiShaoHu(this, MjClient.playui.getPlayersNum() - 2);
                }
            },
        },
        resultPanel: {
            _layout: [[1, 1], [0.5, 0.5], [0, 0]],
            _run: function () {
                MjClient.endoneui.resultPanel = this;
                addPlayerItem_enShiShaoHu(this);
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
                        addDiPaiCards_enShiShaoHu(this);
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
                        addMaiPaiCards_enShiShaoHu(this);
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
        initCardPath_enShiShaoHu();
        MjClient.endoneui = this;
        var endoneui = ccs.load("endOne_enShiShaoHu.json");
        BindUiAndLogic(endoneui.node, this.jsBind);
        this.addChild(endoneui.node);
        return true;
    }
});