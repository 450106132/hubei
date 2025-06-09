
/* ======================================
 *  放一些共用的方法（邵阳里面的湘乡玩法专用）
 *  ====================================== */

/**************************[吃碰跑动画]**************************/

//吃牌
function DealChiCard_shaoyang(node, msg, off) {
    cc.log("======DealChiCard_xiangxiang======= " + off);
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_xiangxiang;
    if (tData.curPlayer == selfIndex) {
        RemovePutCardOut_xiangxiang();
        var pl = sData.players[uids[selfIndex]];
        var mjchi = pl.mjchi;
        var eatAndBiCards = mjchi[mjchi.length - 1];
        var mjchiCard = pl.mjchiCard;
        var chiCard = mjchiCard[mjchiCard.length - 1];
        var eatCards = eatAndBiCards.eatCards;
        var tmpEatCards = eatCards.slice();
        tmpEatCards.splice(tmpEatCards.indexOf(chiCard), 1);
        for (var i = 0; i < tmpEatCards.length; i++) {
            RemoveHandCard_xiangxiang(node, tmpEatCards[i], off);
        }
        var biCards = eatAndBiCards.biCards;
        if (biCards) {
            for (var k = 0; k < biCards.length; k++) {
                var biArr = biCards[k];
                var tmpBiArr = biArr.slice();
                for (var m = 0; m < biArr.length; m++) {
                    if (tmpBiArr.indexOf(biArr[m]) >= 0) {
                        tmpBiArr.splice(tmpBiArr.indexOf(biArr[m]), 1);
                        RemoveHandCard_xiangxiang(node, biArr[m], off);
                    }
                }
            }
        }
        MjClient.playui.ResetHandCard(node, off);

        //吃牌动作
        var eatNode = node.getChildByName("eatNode");
        var parent = new cc.Node();
        var cardWidth = 0;
        for (var i = 0; i < eatCards.length; i++) {
            var card = getNewCard_xiangxiang(eatCards[i], 2, off);
            if (i == 2) {
                card.setColor(cc.color(170, 170, 170));
            }

            cardWidth = card.width //*eatNode.scaleX;
            var off_count = (node.getName() == "right" || node.getName() == "left") ? (2 - i) : i;
            card.zIndex = 4 - i;
            card.x = 0;
            card.y = off_count * getOffY_xiangxiang(node, card);
            setChiCardAnchorPoint_xiangxiang(node, card);
            parent.addChild(card);
        }

        var selfColCount = 1;
        if (biCards) {
            selfColCount += biCards.length;
            for (var k = 0; k < biCards.length; k++) {
                var biArr = biCards[k];
                for (var m = 0; m < biArr.length; m++) {
                    var card = getNewCard_xiangxiang(biArr[m], 2, off);
                    if (m == 2) {
                        card.setColor(cc.color(170, 170, 170));
                    } 
                    setChiCardAnchorPoint_xiangxiang(node, card);
                    var off_count = (node.getName() == "right" || node.getName() == "left") ? (2 - m) : m;
                    card.zIndex = 10 - i;
                    card.x = card.width * card.scaleX * (k + 1) * ((node.getName() == "right" || node.getName() == "xing") ? -1 : 1);
                    card.y = off_count * getOffY_xiangxiang(node, card);
                    parent.addChild(card);
                }
            }
        }
        eatNode.addChild(parent);
        var parentPos = getChiCardParentPosition_xiangxiang(node, cardWidth, off, selfColCount);
        var moveX0 = 0;
        var outNodeCount = eatNode.getChildrenCount();
        if (outNodeCount > 0) {
            if (node.getName() == "down" || node.getName() == "left") {
                moveX0 = parentPos.x + 3 * cardWidth;
            } else if (node.getName() == "right" || node.getName() == "xing") {
                moveX0 = parentPos.x - 3 * cardWidth;
            }
        }
        parent.x = moveX0;
        setCardParentPosY_xiangxiang(node, parent);
        var action2 = cc.moveTo(ziPai.acTime, parentPos.x, parentPos.y);
        var callback = function() {
            // parent.removeFromParent(true);
            // MjClient.playui.ResetOtherCard(node, off);
        };
        parent.runAction(cc.sequence(action2,cc.callFunc(callback)));



        if (biCards) {
            ShowEatActionAnim_xiangxiang(node, ActionType_xiangxiang.XIAHUO, off);
        } else {
            ShowEatActionAnim_xiangxiang(node, ActionType_xiangxiang.CHI, off);
        }
    }
    //MjClient.playui.CardLayoutRestore(node,off);
}

// 处理碰
function DealPengCard_shaoyang(node, msg, off){
    cc.log("======DealChiCard_xiangxiang======= ");
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_xiangxiang;
    if(tData.curPlayer == selfIndex){
        RemovePutCardOut_xiangxiang();

        var parent = new cc.Node();
        var eatNode = node.getChildByName("eatNode");
        var cardWidth = 0;
        var pl = sData.players[tData.uids[selfIndex] + ""];
        var pengCard = pl.mjpeng[pl.mjpeng.length-1];
        for(var i = 0;i < 3; i++) {
            var card = getNewCard_xiangxiang(pengCard,2,off);
            cardWidth = card.width//*eatNode.scaleX;
            var childCount = parent.childrenCount;
            card.zIndex = 4 - childCount;
            card.x = 0;
            card.y = childCount * getOffY_xiangxiang(node, card);
            setChiCardAnchorPoint_xiangxiang(node, card);
            parent.addChild(card);
        }
        eatNode.addChild(parent);

        RemoveHandCard_xiangxiang(node,pengCard,off);
        RemoveHandCard_xiangxiang(node,pengCard,off);
        MjClient.playui.ResetHandCard(node, off);
        ShowEatActionAnim_xiangxiang(node, ActionType_xiangxiang.PENG, off);


        var callback = function(){
            ShowPutCardIcon_xiangxiang();
            // parent.removeFromParent(true);
            // MjClient.playui.ResetOtherCard(node, off);
        };

        var parentPos = getChiCardParentPosition_xiangxiang(node, cardWidth, off, 1);
        var moveX0 = 0;
        var outNodeCount = eatNode.getChildrenCount();
        if(outNodeCount>0){
            if(node.getName() == "down" || node.getName() == "left"){
                moveX0 = parentPos.x + 3*cardWidth;
            }else if(node.getName() == "right" || node.getName() == "xing"){
                moveX0 = parentPos.x - 3*cardWidth;
            }
        }
        parent.x = moveX0;
        setCardParentPosY_xiangxiang(node, parent);
        var action2 = cc.moveTo(ziPai.acTime,parentPos.x,parentPos.y);
        var action3 = cc.callFunc(callback);
        parent.runAction(cc.sequence(action2,action3));
    }
}

//偎牌
function DealWeiCard_shaoyang(node, msg, off) {
    cc.log("======DealWeiCard_xiangxiang======= ");
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_xiangxiang;
    if (tData.curPlayer == selfIndex) {
        RemovePutCardOut_xiangxiang();
        ShowEatActionAnim_xiangxiang(node, ActionType_xiangxiang.WEI, off);

        var parent = new cc.Node();
        var eatNode = node.getChildByName("eatNode");
        var cardWidth = 0;
        var pl = sData.players[tData.uids[selfIndex] + ""];
        var weiCard = msg.newCard;
        for (var i = 0; i < 3; i++) {
            var isTurn = true;
            if (i == getShowCardIdx_xiangxiang(node, "wei")) {
                isTurn = false;
            }
            var card = getNewCard_xiangxiang(weiCard, 2, off, isTurn);
            cardWidth = card.width //*eatNode.scaleX;
            card.zIndex = 4 - i;
            card.x = 0;
            card.y = i * getOffY_xiangxiang(node, card);
            setChiCardAnchorPoint_xiangxiang(node, card);
            parent.addChild(card);
        }
        eatNode.addChild(parent);

        RemoveHandCard_xiangxiang(node, weiCard, off);
        RemoveHandCard_xiangxiang(node, weiCard, off);
        MjClient.playui.ResetHandCard(node, off);

        var callback = function() {
            ShowPutCardIcon_xiangxiang();
            // parent.removeFromParent(true);
            // MjClient.playui.ResetOtherCard(node, off);
            if (pl.mjState == TableState.waitEat) {
                MjClient.playui.EatVisibleCheck();
            }
        };

        var parentPos = getChiCardParentPosition_xiangxiang(node, cardWidth, off, 1);
        var moveX0 = 0;
        var outNodeCount = eatNode.getChildrenCount();
        if (outNodeCount > 0) {
            if (node.getName() == "down" || node.getName() == "left") {
                moveX0 = parentPos.x + 3 * cardWidth;
            } else if (node.getName() == "right" || node.getName() == "xing") {
                moveX0 = parentPos.x - 3 * cardWidth;
            }
        }
        parent.x = moveX0;
        setCardParentPosY_xiangxiang(node, parent);
        var action2 = cc.moveTo(ziPai.acTime, parentPos.x, parentPos.y);
        var action3 = cc.callFunc(callback);
        parent.runAction(cc.sequence(action2, action3));
    }
    //MjClient.playui.CardLayoutRestore(node,off);
}

// 跑牌或者提牌
function DealGangCard_shaoyang(node, msg, off) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_xiangxiang;
    var gangUid = msg.cpginfo.uid;
    if (uids.indexOf(gangUid) == selfIndex) {
        if (msg.type == 2) {
            RemovePutCardOut_xiangxiang();
            ShowEatActionAnim_xiangxiang(node, ActionType_xiangxiang.PAO, off);
        } else {
            if (!msg.isGangHand && msg.type == 1) {
                RemovePutCardOut_xiangxiang();
            }
            ShowEatActionAnim_xiangxiang(node, ActionType_xiangxiang.TI, off);
        }

        var parent = new cc.Node();
        var eatNode = node.getChildByName("eatNode");
        var cardWidth = 0;
        var pl = sData.players[tData.uids[selfIndex] + ""];
        var gangCard = msg.newCard;
        for (var i = 0; i < 4; i++) {
            var isTurn = true;
            if(msg.type == 2) {
                isTurn = false;
                var card = getNewCard_xiangxiang(gangCard, 2, off, isTurn);
            }else{
                if((MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA) 
                    && i == getShowCardIdx_xiangxiang(node, "ti")){
                    isTurn = false;
                }
                var card = getNewCard_xiangxiang(gangCard, 2, off, isTurn);
            } 
            cardWidth = card.width //*eatNode.scaleX;
            card.zIndex = 4 - i;
            card.x = 0;
            card.y = i * getOffY_xiangxiang(node, card);
            setChiCardAnchorPoint_xiangxiang(node, card);
            parent.addChild(card);
        }
        var orignColPosX;
        var children = eatNode.children;
        for (var i = 0; i < children.length; i++) {
            var cardParent = children[i];
            if (cardParent.children[0].tag == gangCard) {
                orignColPosX = cardParent.x;
                break;
            }
        }

        eatNode.addChild(parent);

        RemoveHandCard_xiangxiang(node, gangCard, off);
        RemoveHandCard_xiangxiang(node, gangCard, off);
        RemoveHandCard_xiangxiang(node, gangCard, off);
        if (msg.isGangHand) {
            RemoveHandCard_xiangxiang(node, gangCard, off);
        }
        MjClient.playui.ResetHandCard(node, off);
        // addTingSign_xiangxiang(node); // 添加听牌角标 (提 跑可能手牌未变动)

        var callback = function() {
            ShowPutCardIcon_xiangxiang();
            // parent.removeFromParent(true);
            // MjClient.playui.ResetOtherCard(node, off);
            if (pl.mjState == TableState.waitCard) {
                //HZNewCardToServer_xiangxiang();
            } else if (pl.mjState == TableState.waitEat) {
                MjClient.playui.EatVisibleCheck();
            }
        };
        var parentPos = getChiCardParentPosition_xiangxiang(node, cardWidth, off, 1, orignColPosX);
        var moveX0 = 0;
        var outNodeCount = eatNode.getChildrenCount();
        if (outNodeCount > 0) {
            if (node.getName() == "down" || node.getName() == "left") {
                moveX0 = parentPos.x + 3 * cardWidth;
            } else if (node.getName() == "right" || node.getName() == "xing") {
                moveX0 = parentPos.x - 3 * cardWidth;
            }
        }
        parent.x = moveX0;
        setCardParentPosY_xiangxiang(node, parent);
        var action2 = cc.moveTo(ziPai.acTime, parentPos.x, parentPos.y);
        var action3 = cc.callFunc(callback);
        parent.runAction(cc.sequence(action2, action3));


    }
    //MjClient.playui.CardLayoutRestore(node,off);
}

function getChiCardParentPosition_xiangxiang(node, newCardWidth, off, selfColCount, orignColPosX) {
    selfColCount = selfColCount || 1;
    var eatNode = node.getChildByName("eatNode");
    // var parentCount = eatNode.getChildrenCount() - 1;

    var pl = getUIPlayer_xiangxiang(off);
    var totalColCount = pl.mjpeng.length + pl.mjwei.length + pl.mjgang0.length + pl.mjgang1.length;
    for (var i = 0; i < pl.mjchi.length; i++) {
        totalColCount += 1;
        if (pl.mjchi[i].biCards) {
            totalColCount += pl.mjchi[i].biCards.length;
        }
    }

    var preColCount = totalColCount - selfColCount;
    var X = 0;
    var Y = 0;
    if(node.getName() == "down"){
        X = preColCount * newCardWidth;
        Y = 0;
    }else if (node.getName() == "right"){
        X = eatNode.width - preColCount * newCardWidth;
        Y = eatNode.height;
    }else if (node.getName() == "left"){
        X = preColCount * newCardWidth;
        Y = eatNode.height;
    }else if (node.getName() == "xing"){
        X = eatNode.width - preColCount * newCardWidth;
        Y = 0;
    }
    
    if (orignColPosX != undefined) {
        X = orignColPosX
    }

    return cc.p(X, Y);
}

function setCardParentPosY_xiangxiang(node, cardParent) {
    var eatNode = node.getChildByName("eatNode");
    if(node.getName() == "down"){
        cardParent.y = 0;
    }else if (node.getName() == "right"){
        cardParent.y = eatNode.height;
    }else if (node.getName() == "left"){
        cardParent.y = eatNode.height;
    }else if (node.getName() == "xing"){
        cardParent.y = 0;
    }
}

/**************************[坐醒玩法]**************************/

function DealXingPlayerAddCard_xiangxiang(node,msg,off){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var xingIndex = (tData.uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_leiyang;
    if(tData.xingPlayer == tData.uids.indexOf(msg.uid)){
        var sortArr = function(sortArr){
            var tmpArr = [];
            for(var i = 0;i < sortArr.length;i++){
                tmpArr = tmpArr.concat(sortArr[i]);
            }
            return MjClient.majiang.sortHandCardSpecial(tmpArr);
        }
        
        var cardArr;
        if(off != 0){
            cardArr = MjClient.OtherHandArr[off];
            cardArr.push(msg.cardList);
            MjClient.OtherHandArr[off] = sortArr(cardArr);
        }else if(off == 0){
            cardArr = MjClient.HandCardArr;
            cardArr.push(msg.cardList);
            MjClient.HandCardArr = sortArr(cardArr);
        }
        MjClient.playui.ResetHandCard(node,off);
    }
}

/**************************[结算]**************************/

//战况横幅
function loadWinGameImg(node){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var jiesanImg = "playing/paohuzi/jiesan.png";
    var huangzhuangImg = "playing/paohuzi/huangzhuang.png";
    var winImg = "playing/paohuzi/win.png";
    var loseImg = "playing/paohuzi/lose.png";

    if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
        jiesanImg = "gameOver/newOver/title_2.png";
        huangzhuangImg = "gameOver/newOver/title_1.png";
        winImg = "gameOver/newOver/title_3.png";
        loseImg = "gameOver/newOver/title_4.png";
    }

    if (MjClient.isDismiss){
        node.loadTexture(jiesanImg);
    }else{
        var selfPlayer = getUiOffByUid(SelfUid());
        var isHuang = false;
        if(tData.winner == -1){
            node.loadTexture(huangzhuangImg);
        }else{
            var uids = tData.uids;
            var selfIndex = uids.indexOf(SelfUid());
            var sub = (selfIndex - tData.winner + tData.maxPlayer) % tData.maxPlayer;
            if(sub == 0){
                node.loadTexture(winImg);
            }else{
                node.loadTexture(loseImg);
            }
        }
    }
}

//原形头像
function addWxHeadToEndUI_shaoYang_XXZiPai(node,off)
{
    var pl = getUIPlayer_xiangxiang(off);
    //var pl= getUIPlayer_changpai(off);
    var img = "png/default_headpic.png";
    if(pl && pl.wxHeadImg)
    {
        img = pl.wxHeadImg;
    }
    else
    {
        return;
    }
    var sp = new cc.Sprite(img);
    //node.addChild(sp);
    var frame = node.getChildByName("frame");
    if (frame){
        frame.zIndex = sp.zIndex + 1;
    }

    var clippingNode = new cc.ClippingNode();
    var mask = new cc.Sprite("gameOver/gameOver_headBg2.png");
    clippingNode.setAlphaThreshold(0);
    clippingNode.setStencil(mask);

    sp.setScale(mask.getContentSize().width / sp.getContentSize().width);
    clippingNode.addChild(sp);
    clippingNode.setPosition(frame.getContentSize().width / 2, frame.getContentSize().height / 2);
    // //遮罩框
    var hideblock = new cc.Sprite("gameOver/gameOver_headBg3.png");
    hideblock.setPosition(frame.getContentSize().width / 2, frame.getContentSize().height / 2);
    frame.addChild(clippingNode);
    
    setRoundEndUserOffline_shaoyang(frame,pl);
    frame.addChild(hideblock);
    //setWgtLayout(sp,[0.88,0.88],[0.5,0.5],[0,0],false,true);
}