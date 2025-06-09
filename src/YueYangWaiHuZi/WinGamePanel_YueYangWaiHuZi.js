function addPlayerHandCards_YueYangWaiHuZi(node, off) {
    var card = node.getChildByName("card");
    card.visible = false;
    var pl = getUIPlayer_YueYangWaiHuZi(off);
    var cardArr = MjClient.majiang.sortCardTemp(pl.mjhand);
    cc.log("chow", "addPlayerHandCards_YueYangWaiHuZi" + " cardArr = " + JSON.stringify(cardArr));
    for(var i  = 0; i < cardArr.length; i++){
        var lineNode = new cc.Node();
        for(var j = 0; j < cardArr[i].length; j++){
            var cardClone = card.clone();
            cardClone.visible = true;
            cardClone.loadTexture(MjClient.cardPath_YueYangWaiHuZi + "out" + cardArr[i][j] + ".png");
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
function addDiPaiCards_YueYangWaiHuZi(node) {
    var card = node.getChildByName("card");
    card.visible = false;

    var tData = MjClient.data.sData.tData;
    var cards = MjClient.data.sData.cards;
    for(var i = tData.cardNext; i < MjClient.majiang.getAllCardsTotal(MjClient.data.sData); i++){
        var cardClone = card.clone();
        cardClone.visible = true;
        node.addChild(cardClone);
        cardClone.loadTexture(MjClient.cardPath_YueYangWaiHuZi + "out" + cards[i] + ".png");

        cardClone.x = (i - tData.cardNext) % 40 * cardClone.width * cardClone.scale;
        cardClone.y = node.height - Math.floor((i - tData.cardNext) / 40) * cardClone.height * cardClone.scale;
    }
}
function addMaiPaiCards_YueYangWaiHuZi(node) {
    var card = node.getChildByName("card");
    card.visible = false;

    var tData = MjClient.data.sData.tData;
    var cards = MjClient.data.sData.cards;
    var index = MjClient.majiang.getAllCardsTotal(MjClient.data.sData);
    for(var i = index; i < cards.length; i++){
        var cardClone = card.clone();
        cardClone.visible = true;
        node.addChild(cardClone);
        cardClone.loadTexture(MjClient.cardPath_YueYangWaiHuZi + "out" + cards[i] + ".png");

        cardClone.x = (i - index) % 40 * cardClone.width * cardClone.scale;
        cardClone.y = (1 - Math.floor((i - index) / 40)) * cardClone.height * cardClone.scale;
    }
}
function CircularCuttingHeadImg_YueYangWaiHuZi(node, pl) {
    var url = pl.info.headimgurl;
    if(!url) url = "png/default_headpic.png";
    cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
    {
        if(!err && texture && cc.sys.isObjectValid(node))
        {
            var clippingNode = new cc.ClippingNode();
            var mask = new cc.Sprite("gameOver/gameOver_headBg2.png");
            clippingNode.setAlphaThreshold(0);
            clippingNode.setStencil(mask);
            var img = new cc.Sprite(texture);
            img.setScale(mask.getContentSize().width / img.getContentSize().width);
            clippingNode.addChild(img);
            clippingNode.setPosition(node.getContentSize().width / 2, node.getContentSize().height / 2);
            //遮罩框
            var hideblock = new cc.Sprite("gameOver/gameOver_headBg3.png");
            hideblock.setPosition(node.getContentSize().width / 2, node.getContentSize().height / 2);
            node.addChild(clippingNode);
            node.addChild(hideblock);
        }
    });
}
function setSortCard_YueYangWaiHuZi(node, item, pl) {
    var sortArr = pl.mjsort;
    var sortTitle = {
                mjgang1:{resPath:"playing/waihuzi/liu.png", count:4},
                mjgang0:{resPath:"playing/waihuzi/liu.png", count:4},
                mjwei:{resPath:"playing/waihuzi/wai.png", count:3},
                mjpeng:{resPath:"playing/waihuzi/peng.png", count:3},
                mjchi:{resPath:"playing/waihuzi/chi.png", count:3},

                liu:{resPath:"playing/waihuzi/liu.png", count:4},
                kan:{resPath:"playing/waihuzi/kan.png", count:3},
                shun:{resPath:"playing/waihuzi/shun.png", count:3},
                jiang:{resPath:"playing/waihuzi/jiang.png", count:2},
                men:{resPath:"playing/waihuzi/men.png", count:2},
                dan:{resPath:"playing/waihuzi/dan.png", count:1}
    };
    
    function addOneItem(itemName, cards, cardNum) {
        var itemClone = item.clone();
        itemClone.visible = true;
        node.addChild(itemClone);
        var huCardShow = false;

        var head = itemClone.getChildByName("head");
        head.loadTexture(sortTitle[itemName].resPath);

        var card = itemClone.getChildByName("card");
        card.visible  = false;

        for(var i = 0; i < cards.length; i++){
            var cardClone = card.clone();
            cardClone.visible = true;
            cardClone.loadTexture(MjClient.cardPath_YueYangWaiHuZi + "out" + cards[i] + ".png");
            itemClone.addChild(cardClone);

            if(cardNum && cardNum != -1 && !huCardShow && cards[i] == cardNum){
                var huIcon = ccui.ImageView.create("playing/paohuzi/huIcon.png");
                huIcon.setAnchorPoint(cc.p(1,0));
                huIcon.setPosition(cc.p(cardClone.width * cardClone.scale,0));
                cardClone.addChild(huIcon);
                huCardShow = true;
            }

            cardClone.y -= i * cardClone.height * cardClone.scale;
        }
        item.x += item.width;
    }

    cc.log("chow", "setSortCard_YueYangWaiHuZi : " + " sortArr = " + JSON.stringify(sortArr));
    for(var i = 0; i < sortArr.length; i++){
       var name =  sortArr[i].name;
       var pos = sortArr[i].pos;

        if(name == "mjchi"){
            var eatCards = pl[name][pos].eatCards;
            var biCards = pl[name][pos].biCards;

            addOneItem(name, eatCards);

            if(biCards){
                for(var j = 0; j < biCards.length; j++){
                    addOneItem(name, biCards[j]);
                }
            }
        }else{
            var cardsTemp = [];
            for(var j = 0; j < sortTitle[name].count; j++){
                cardsTemp.push(pl[name][pos]);
            }
            addOneItem(name, cardsTemp);
        }
    }

    var handArr;
    var huCardNum = -1;
    var huCardLine = -1;
    var tData = MjClient.data.sData.tData;
    if(tData.uids[tData.winner] == pl.info.uid){
        handArr = pl.handSort;
        huCardNum = pl.huCard;
        huCardLine = pl.huCardPos;
    }else{
        handArr = MjClient.majiang.sortCardTemp(pl.mjhand, 1);
        MjClient.majiang.sortCard2(handArr);
    }
    cc.log("chow", "setSortCard_YueYangWaiHuZi" + " handArr" + JSON.stringify(handArr) + " huCardNum = " + huCardNum + " huCardLine = " + huCardLine);
    for(var i = 0; i < handArr.length; i++){
        if(handArr[i].name){
            if(i == huCardLine){
                addOneItem(handArr[i].name, handArr[i].cards, huCardNum);
            }else{
                addOneItem(handArr[i].name, handArr[i].cards);
            }
        }else{
            if(isLiu(handArr[i])){
                addOneItem("liu", handArr[i]);
            }else if(isKan(handArr[i])){
                addOneItem("kan", handArr[i]);
            }else if(isShun(handArr[i])){
                addOneItem("shun", handArr[i]);
            }else if(isJiang(handArr[i])){
                addOneItem("jiang", handArr[i]);
            }else if(isMen(handArr[i])){
                addOneItem("men", handArr[i]);
            }else if(isDan(handArr[i])){
                addOneItem("dan", handArr[i]);
            }else{
                addOneItem("dan", handArr[i]);
            }
        }
    }
    function isLiu(cards) {
        return (cards.length == 4 && cards[0] == cards[1] && cards[0] == cards[2] && cards[0] == cards[3]);
    }
    function isKan(cards) {
        return (cards.length == 3 && cards[0] == cards[1] && cards[0] == cards[2]);
    }
    function isShun(cards) {
        if(cards.length != 3){
            return false;
        }
        var cardTemp = cards.slice();
        cardTemp.sort(sortCard);
        return (cardTemp[0] == cardTemp[1] - 1 && cardTemp[0] == cardTemp[2] - 2)
            || (cardTemp[0] == 2 && cardTemp[1] == 7 && cardTemp[2] == 10)
            || (cardTemp[0] == 22 && cardTemp[1] == 27 && cardTemp[2] == 30);
    }
    function isJiang(cards) {
        return (cards.length == 2 && cards[0] == cards[1]);
    }
    function isMen(cards) {
        if(cards.length != 2){
            return false;
        }
        var cardTemp = cards.slice();
        cardTemp.sort(sortCard);
        return (Math.abs(cardTemp[0] - cardTemp[1]) <= 2)
            || (cardTemp[0] != cardTemp[1] && (([2, 7, 10].indexOf(cardTemp[0]) >= 0 && [2, 7, 10].indexOf(cardTemp[1]) >= 0) ||
            ([22, 27, 30].indexOf(cardTemp[0]) >= 0 && [22, 27, 30].indexOf(cardTemp[1]) >= 0)));
    }
    function isDan(cards) {
        return (cards.length == 1);
    }
    function sortCard(a, b) {
        return a - b;
    }
}
function setScore_YueYangWaiHuZi(node, pl){
    var score = node.getChildByName("score");
    var title = score.getChildByName("title");
    var num1 = score.getChildByName("num1");
    num1.ignoreContentAdaptWithSize(true);
    num1.visible = false;
    var num2 = score.getChildByName("num2");
    num2.ignoreContentAdaptWithSize(true);
    num2.visible = false;
    if(pl.winone >= 0){
        num1.visible = true;
        num1.setString(pl.winone);
    }else{
        num2.visible = true;
        num2.setString(Math.abs(pl.winone));
    }
    if(pl.winone <= 0){
        title.visible = false;
    }
    var piao = node.getChildByName("piao");
    if(pl.piaoFen >= 0){
        piao.visible = true;

        var piaoTitle = piao.getChildByName("title");
        var piaoNum = piao.getChildByName("num");
        if(pl.winPiaoFen >= 0){
            piaoNum.setString("+" + pl.winPiaoFen);
            //piaoTitle.setTextColor(cc.color(226,43,0));
            //piaoNum.setTextColor(cc.color(226,43,0));
        }else{
            piaoNum.setString("" + pl.winPiaoFen);
            //piaoTitle.setTextColor(cc.color(34,116,12));
            //piaoNum.setTextColor(cc.color(34,116,12));
        }
        piaoNum.ignoreContentAdaptWithSize(true);
    }
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var chuizi_tips = node.getChildByName("chuizi_tips");
    if(tData.areaSelectMode.piaoFen > 0){
        chuizi_tips.setVisible(true);
        var fileName = "playing/chenzhouzipai/biao_piao" + pl.piaoFen + ".png";
        chuizi_tips.loadTexture(fileName);
        chuizi_tips.zIndex = chuizi_tips.zIndex +99;
    }
}
function setPlayerWinner_YueYangWaiHuZi(node, pl) {
    var tData = MjClient.data.sData.tData;

    if(tData.winner == -1){
        if(SelfUid() == pl.info.uid){
            node.loadTexture("playing/waihuzi/g_b_1.png");
        }else{
            node.loadTexture("playing/waihuzi/g_b.png");
        }
    }else{
        if(tData.uids[tData.winner] == pl.info.uid){
            node.loadTexture("playing/waihuzi/r_b_1.png");
        }else{
            if(SelfUid() == pl.info.uid){
                node.loadTexture("playing/waihuzi/g_b_1.png");
            }else{
                node.loadTexture("playing/waihuzi/g_b.png");
            }
        }
    }

    var huIcon = node.getChildByName("huIcon");
    huIcon.visible = false;
    if(tData.winner != -1 && tData.uids[tData.winner] == pl.info.uid){
        huIcon.visible = true;
    }

    var headBg = node.getChildByName("headBg");
    CircularCuttingHeadImg_YueYangWaiHuZi(headBg, pl);

    setOfflineShow_YueYangWaiHuZi(headBg, pl);

    var playerName = node.getChildByName("playerName");
    playerName.ignoreContentAdaptWithSize(true);
    playerName.setString(sliceStrByLen_YueYangWaiHuZi(unescape(pl.info.nickname), 5));

    var cardSort = node.getChildByName("cardSort");
    var cardItem = cardSort.getChildByName("cardItem");
    cardItem.visible = false;
    setSortCard_YueYangWaiHuZi(cardSort, cardItem, pl);

    setScore_YueYangWaiHuZi(node, pl);

    var score = node.getChildByName("score");
    var huxi = node.getChildByName("huxi");
    var num1 = huxi.getChildByName("num1");
    num1.ignoreContentAdaptWithSize(true);
    if(tData.winner == -1 || tData.uids[tData.winner] != pl.info.uid){
        huxi.visible = false;
        score.x = node.width / 2;
    }else{
        num1.setString(pl.huXi + "");//胡息
    }

    var yingXi = node.getChildByName("yingXi");
    yingXi.ignoreContentAdaptWithSize(true);
    if(tData.winner == -1 || tData.uids[tData.winner] != pl.info.uid){
        yingXi.visible = false;
    }else{
        yingXi.setString("硬息:" + pl.hardHuXi);
    }

    var haoItem = node.getChildByName("haoItem");
    haoItem.visible = false;
    var offestY = 0;
    var haoTitle = {sanHao:"散毫", liuHao:"溜毫", neiHao:"内毫", waiHao:"外毫"};
    var haoFen = {sanHao:40, liuHao:30, neiHao:20, waiHao:10};
    //test hao
    //var testHao = {sanHao:[1, 2], liuHao:[3, 4, 5, 8], neiHao:[6], waiHao:[7]};
    //pl.hao = testHao;
    if(tData.uids[tData.winner] == pl.info.uid){
        for(var key in pl.hao){
            var value = pl.hao[key];
            if(value.length > 0){
                var haoItemClone = haoItem.clone();
                haoItemClone.visible = true;
                var title = haoItemClone.getChildByName("title");
                title.setString(haoTitle[key]);

                var item = haoItemClone.getChildByName("item");
                item.visible = false;
                for(var i = 0; i < value.length; i++){
                    var itemClone = item.clone();
                    itemClone.visible = true;
                    haoItemClone.addChild(itemClone);

                    var card = itemClone.getChildByName("card");
                    var num = itemClone.getChildByName("num");
                    card.loadTexture(MjClient.cardPath_YueYangWaiHuZi + "out" + value[i] + ".png");
                    num.setString(haoFen[key] + (tData.areaSelectMode.haoFen == 0 ? 0 : 10) + "");

                    itemClone.x += i % 3 * itemClone.width;
                    itemClone.y -= Math.floor(i / 3) * itemClone.height;
                }
                node.addChild(haoItemClone);
                haoItemClone.y -= offestY;
                offestY += Math.ceil(value.length / 3) * item.height;
            }
        }
    }

    var mingTangTitle = {tianHu:"天胡", diHu:"地胡", tingHu:"听胡", tianHu:"天胡", shiSanHong:"十三红",
        yiDianHong:"一点红", quanHei:"全黑", quanDa:"全大", quanXiao:"全小", wuDui:"无对", shiDui:"十对",
        yiDui:"一对", jiuDui:"九对", hangHangXi:"行行息", duiZiXi:"对子息", haiLao:"海捞", quanQiuRen:"全求人", piaoFen:"飘分"};
    var mingTangItem = node.getChildByName("mingTangItem");
    mingTangItem.visible = false;
    var count = 0;
    //test mingtang
    //var testMingtTang = {tianHu:200, diHu:30, duiZiXi:200, quanQiuRen:200, hangHangXi:200};
    //pl.hzdesc = testMingtTang;
    if(tData.uids[tData.winner] == pl.info.uid) {
        for (var key in pl.hzdesc) {
            var mingTangItemClone = mingTangItem.clone();
            mingTangItemClone.visible = true;
            node.addChild(mingTangItemClone);

            //mingTangItemClone.ignoreContentAdaptWithSize(true);
            mingTangItemClone.setString(mingTangTitle[key] + ":" + pl.hzdesc[key]);

            mingTangItemClone.x += count % 2 * mingTangItemClone.width;
            mingTangItemClone.y -= Math.floor(count / 2) * mingTangItemClone.height;

            count++;
        }
    }
}
function setPlayerPlayer_YueYangWaiHuZi(node, pl) {
    if(SelfUid() == pl.info.uid){
        node.loadTexture("playing/waihuzi/g_s_1.png");
    }else{
        node.loadTexture("playing/waihuzi/g_s.png");
    }

    var headBg = node.getChildByName("headBg");
    CircularCuttingHeadImg_YueYangWaiHuZi(headBg, pl);

    setOfflineShow_YueYangWaiHuZi(headBg, pl);

    var playerName = node.getChildByName("playerName");
    playerName.ignoreContentAdaptWithSize(true);
    playerName.setString(sliceStrByLen_YueYangWaiHuZi(unescape(pl.info.nickname), 5));

    var cardSort = node.getChildByName("cardSort");
    var cardItem = cardSort.getChildByName("cardItem");
    cardItem.visible = false;
    setSortCard_YueYangWaiHuZi(cardSort, cardItem, pl);

    setScore_YueYangWaiHuZi(node, pl);
}
function addPlayerItem_YueYangWaiHuZi(node) {
    var winner = node.getChildByName("winner");
    winner.visible = false;
    var player = node.getChildByName("player");
    player.visible = false;

    var sData = MjClient.data.sData;
    var tData = sData.tData;

    var firstIndex = tData.winner != -1 ? tData.winner : tData.uids.indexOf(SelfUid());
    var firstPlayer = tData.uids[firstIndex];
    var item = winner.clone();
    item.visible = true;
    setPlayerWinner_YueYangWaiHuZi(item, sData.players[firstPlayer]);
    winner.x += winner.width;
    winner.x += 23;
    node.addChild(item);

    for(var uid in sData.players){
        if(uid == firstPlayer){
            continue;
        }
        var item;
        if(MjClient.data.sData.tData.maxPlayer == 2){
            item = winner.clone();
            item.visible = true;
            setPlayerWinner_YueYangWaiHuZi(item, sData.players[uid]);

            winner.x += winner.width;
            winner.x += 23;
        }else{
            item = player.clone();
            item.visible = true;
            setPlayerPlayer_YueYangWaiHuZi(item, sData.players[uid]);

            player.y -= player.height;
            player.y -= 10;
        }
        node.addChild(item);
    }
}
var EndOneView_YueYangWaiHuZi = cc.Layer.extend({
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
                    addPlayerHandCards_YueYangWaiHuZi(this, MjClient.data.sData.tData.maxPlayer - 1);
                }
            },
            rightPanel: {
                _run: function () {
                    if (MjClient.data.sData.tData.maxPlayer == 2 || MjClient.rePlayVideo != -1) {
                        this.visible = false;
                    }
                    addPlayerHandCards_YueYangWaiHuZi(this, MjClient.data.sData.tData.maxPlayer - 2);
                }
            },
        },
        resultPanel: {
            _layout: [[1, 1], [0.5, 0.5], [0, 0]],
            _run: function () {
                MjClient.endoneui.resultPanel = this;
                addPlayerItem_YueYangWaiHuZi(this);
            },
            titleResult: {
                _run: function () {
                    var tData = MjClient.data.sData.tData;
                    if (tData.winner == -1) {
                        this.loadTexture("gameOver/pingju_03.png");
                        if (MjClient.isDismiss) {
                            this.loadTexture("gameOver/jiesan.png");
                        }
                    } else {
                        if (tData.uids[tData.winner] == SelfUid()) {
                            this.loadTexture("gameOver/duihuan_10.png");
                        } else {
                            this.loadTexture("gameOver/duihuan_16.png");
                        }
                    }
                }
            },
            diPai:{
                cardList:{
                    _run:function () {
                        addDiPaiCards_YueYangWaiHuZi(this);
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
                        addMaiPaiCards_YueYangWaiHuZi(this);
                    }
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
                    this.setString(getRoundInfo_YueYangWaiHuZi());
                }
            },
        }
    },
    ctor: function () {
        this._super();
        MjClient.endoneui = this;
        if (MjClient.playui.getCardFilePath) {
            //兼容新版
            MjClient.cardPath_YueYangWaiHuZi = MjClient.playui.getCardFilePath();
        }
        var endoneui = ccs.load("endOne_yueyangwaihuzi.json");
        BindUiAndLogic(endoneui.node, this.jsBind);
        this.addChild(endoneui.node);
        return true;
    }
});