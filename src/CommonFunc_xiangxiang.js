
/* ======================================
 *  放一些共用的方法
 *  ====================================== */

// 湘乡字牌全局变量
MjClient.MaxPlayerNum_xiangxiang = 3;
MjClient.cardPath_xiangxiang = "playing/paohuzi/";

var ActionType_xiangxiang =  //图片提示
{
    CHI:1,
    PENG:2,
    WEI:3,
    PAO:4,
    TI:5,
    HU:6,
    WANGDIAO:7,
    WANGCHUANG:8,
    WANGZHA:9,
    XIAHUO:10,
    FANXING:11,
};

//初始化玩家金币、名字、胡息
function InitUserCoinAndName_xiangxiang(node, off){
    var pl = getUIPlayer_xiangxiang(off);
    if(!pl){
        return;
    }

    var tData = MjClient.data.sData.tData;

    //金币场添加金币，金币图标 start
    var showJinBi = tData.fieldId;
    var jinbiIcon = node.getChildByName("head").getChildByName("jinbiIcon");
    var jinbi = node.getChildByName("head").getChildByName("jinbi");
    var coin = node.getChildByName("head").getChildByName("coin");
    if(showJinBi){
        if (!jinbiIcon){
            var jinbiBg = ccui.ImageView("playing/gameTable/gold/di_jinbi.png");
            jinbiBg.setAnchorPoint(0,0.5);
            node.getChildByName("head").addChild(jinbiBg);

            jinbiIcon = ccui.ImageView("playing/gameTable/jinbi.png");
            jinbiIcon.setAnchorPoint(0.5,0.5);
            jinbiIcon.setPosition(coin.getPositionX() + 10, coin.getPositionY());
            if(node.getName() == "right"){
                jinbiIcon.setPosition(coin.getPositionX() - 90, coin.getPositionY());
            }
            jinbiIcon.setName("jinbiIcon");
            node.getChildByName("head").addChild(jinbiIcon);

            jinbiBg.x = jinbiIcon.x - 10;
            jinbiBg.y = jinbiIcon.y;
        }
        if (!jinbi){
            jinbi = new ccui.Text();

            jinbi.setFontSize(20);
            jinbi.setAnchorPoint(0.5,0.5);
            jinbi.setPosition(coin.getPositionX()+5, coin.getPositionY());
            jinbi.setName("jinbi");
            node.getChildByName("head").addChild(jinbi);
        }
        jinbi.ignoreContentAdaptWithSize(true);
        if (tData.fieldFee){
            if(tData.roundNum <= 0){//结算后台费已经扣了不用再减去台费
                jinbi.setString(MjClient.simplifyGoldNumStr(Number(pl.info.gold)));
            }else{
                jinbi.setString(MjClient.simplifyGoldNumStr(Number(pl.info.gold-tData.fieldFee)));
            }
        }else{
            jinbi.setString(MjClient.simplifyGoldNumStr(pl.info.gold));
        }
        jinbi.setPositionX(jinbiIcon.getPositionX() + jinbi.width/2 + jinbiIcon.width/2 + 10);
        if(node.getName() == "right"){
            jinbi.setAnchorPoint(1,0.5);
            jinbi.setPosition(coin.getPositionX() - 8, coin.getPositionY());
        }   
    }else{
        if (jinbiIcon){
            node.getChildByName("head").removeChildByName("jinbiIcon")
        }
        if (jinbi){
            node.getChildByName("head").removeChildByName("jinbi")
        }
    }//金币场添加金币，金币图标 end

    var bind ={
        head:{
            name:{
                _run: function() {
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                },
                _text: function()
                {
                    var _nameStr = unescape(pl.info.nickname);
                    return getNewName(_nameStr);
                }
            },
            coin:{
                _visible:function(){
                    if(showJinBi){
                        return false
                    }
                    return true;
                },
                _run: function(){
                    if(showJinBi){
                        return;
                    }
                    //sk,todo,这里有问题，服务器的pl.winall没有赋值，这里加了有个毛用？
                    var coin = tData.initCoin;
                    //this.setString("" + coin);
                    changeAtalsForLabel(this, coin + pl.winall);
                }
            },
        }
    };
    //add by sking
    var name = node.getChildByName("head").getChildByName("name");
    name.ignoreContentAdaptWithSize(true);

    BindUiAndLogic(node, bind);
}

//向服务器发送打牌操作
function HZPutCardToServer_xiangxiang(card){
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJPut",
        card: card
    });
}

// 向服务器发送吃牌
function HZChiToServer_xiangxiang(eatCards, biCards){
    if (MjClient.rePlayVideo != -1) {
        return; // 回放时候不能请求
    }

    var tData = MjClient.data.sData.tData;
    if (biCards) {
        MjClient.gamenet.request("pkroom.handler.tableMsg", {
            cmd: "MJChi",
            eatCards: eatCards,
            biCards: biCards,
            cardNext: tData.cardNext,
            card: tData.lastPutCard
        });
    } else {
        MjClient.gamenet.request("pkroom.handler.tableMsg", {
            cmd: "MJChi",
            eatCards: eatCards,
            cardNext: tData.cardNext,
            card: tData.lastPutCard
        });
    }

}

function commitEatCards_xiangxiang(eatCards, biArr){
    if ((MjClient.data.sData.players[SelfUid()].eatFlag & 32) > 0) {
        MjClient.showMsg("吃牌后视为过胡，确定吃吗？", function() {
            setChiVisible_xiangxiang();
            HZChiToServer_xiangxiang(eatCards, biArr); 
        }, function() {}, "1");
    } else {
        setChiVisible_xiangxiang();
        HZChiToServer_xiangxiang(eatCards, biArr); 
    }
}

//像服务器发送碰牌
function HZPengToServer_xiangxiang()
{
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJPeng"
    });
}

// 向服务器发送过牌
function HZPassConfirmToServer_xiangxiang() {
    if (MjClient.rePlayVideo != -1)  {
        return; // 回放时候不能请求
    }

    var tData = MjClient.data.sData.tData;
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJPass",
        eatFlag: EatFlag_xiangxiang(),
        cardNext: tData.cardNext,
        card: tData.lastPutCard
    });
}

//发送跑牌命令
function HZGangToServer_xiangxiang(type){
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJGang",
        type: type,
        eatFlag: EatFlag_xiangxiang()
    });
}

//发送偎牌命令
function HZWeiToServer_xiangxiang(type){
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "HZWeiCard"
    });
}

//向服务器发送发牌命令
function HZNewCardToServer_xiangxiang(){
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "HZNewCard"
    });
}

//向服务器发送胡牌命令
function MJHuToServer_xiangxiang(){
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJHu",
        eatFlag: EatFlag_xiangxiang()
    });
}

function showSelectEatCards_xiangxiang(node,cardNum){
    var eat = MjClient.playui.jsBind.eat;
    eat.chi._node.visible = false;
    eat.guo._node.visible = false;
    eat.peng._node.visible = false;
    eat.hu._node.visible = false;
    eat.cancel._node.visible = true;

    eat.chi._node.setTouchEnabled(false);
    eat.guo._node.setTouchEnabled(false);
    eat.peng._node.setTouchEnabled(false);
    eat.hu._node.setTouchEnabled(false);
    eat.cancel._node.setTouchEnabled(true);
    eat.cancel._node.setBright(true);

    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var putCard = tData.lastPutCard;
    cc.log("显示吃牌：" + putCard);
    var pl = sData.players[SelfUid()];
    var chiSet = MjClient.majiang.getChiCards(pl.mjhand,putCard);
    if(chiSet.length <= 0){
        eat.cancel._node.visible = false;
        eat.cancel._node.setTouchEnabled(false);
        return;
    }

    var parent = node.getParent();
    var chiBg = parent.getChildByName("chiSelect");
    if(!initSize){
        //保存chiBg的初始大小
        initSize = chiBg.getContentSize();
    }
    var cardArr = pl.mjhand.slice();
    addEatCards_xiangxiang(parent,cardArr,putCard);
}

//添加可以吃的牌
function addEatCards_xiangxiang(node,handCardArr,putCard){
    var cardPath = ziPai.getCardFilePath();

    var chiBg = node.getChildByName("chiSelect");
    setWgtLayout(chiBg, [0,0.38],[0.5,0.76],[0,0]);
    
    if(ziPai.getUiLayoutType() == 0){//新布局
        chiBg.x = cc.winSize.width - chiBg.width * chiBg.getScale() * 0.5 - cc.winSize.width * 0.15;
    }else{
        chiBg.x = cc.winSize.width * 0.5;
    }
    chiBg.visible = true;

    var children = chiBg.children;
    for(var i = 0; i < children.length; i++){
        if(children[i].getName() == "cloneBtn"){
            children[i].removeFromParent(true);
        }
    }

    var off_x = 20,off_y = 20;
    var selectBtn = chiBg.getChildByName("selectBtn");
    var startPos = selectBtn.getPosition();
    var chiSet = MjClient.majiang.getChiCards(handCardArr,putCard);
    var off_width = (initSize.width-selectBtn.width)/2;
    chiBg.setContentSize(cc.size(selectBtn.width * chiSet.length + (chiSet.length-1) * off_x + off_width*2,initSize.height));

    for(var i = 0;i < chiSet.length;i++){
        var chiCloneBtn = selectBtn.clone();
        chiCloneBtn.visible = true;
        chiCloneBtn.setName("cloneBtn");

        var cardList = chiSet[i];
        for(var k = 0;k < cardList.length;k++){
            var card = cardList[k];
            var cardNode = chiCloneBtn.getChildByName("card_" + k);
            cardNode.visible = true;
            cardNode.loadTexture(cardPath +"hand" + card + ".png");

            cardNode.zIndex = cardList.length - k;
        }
        chiCloneBtn.setPosition(cc.p(startPos.x + (chiCloneBtn.width + off_x) * i , startPos.y));
        chiBg.addChild(chiCloneBtn);
        chiCloneBtn.setUserData(cardList);

        chiCloneBtn.addClickEventListener(function(chiBtn){
            if(MjClient.playui.jsBind.eat.biSelect._node.visible){
                MjClient.playui.jsBind.eat.biSelect.hasShow = true;
            }else{
                MjClient.playui.jsBind.eat.biSelect.hasShow = false;
            }
            MjClient.playui.jsBind.eat.biSelect._node.visible = false;
            MjClient.playui.jsBind.eat.biSelect1._node.visible = false;
            MjClient.playui.jsBind.eat.biSelect._node.setTouchEnabled(false);
            MjClient.playui.jsBind.eat.biSelect1._node.setTouchEnabled(false);

            var btnList = chiBg.children;
            for(var m = 0;m < btnList.length;m++){
                btnList[m].setBright(true);
            }
            chiBtn.setBright(false);
            var chiArr = chiBtn.getUserData();
            var tmpHandCardArr = handCardArr.slice();
            var ttArr = chiArr.slice();
            ttArr.splice(ttArr.indexOf(putCard),1);
            for(var i = 0;i < ttArr.length;i++){
                tmpHandCardArr.splice(tmpHandCardArr.indexOf(ttArr[i]),1);
            }
            if(tmpHandCardArr.indexOf(putCard) < 0){
                // setChiVisible_hengYang();
                // HZChiToServer_hengYang(chiArr,null);

                commitEatCards_xiangxiang(chiArr, null);
            }else{
                var biSet = MjClient.majiang.getBiCards(tmpHandCardArr,putCard);
                if(biSet && biSet.length > 0){
                    addFirstBiCards_xiangxiang(node,biSet,putCard,tmpHandCardArr,chiArr);
                }
            }
        });
    }
    if(ziPai.getUiLayoutType() == 0){//新布局
        doMoveCenterAction_xiangxiang([chiBg], false);
    }
}

//添加第一个比牌
function addFirstBiCards_xiangxiang(node,biSet,putCard,handCardArr,chiArr){
    var cardPath = ziPai.getCardFilePath();

    var biBg = node.getChildByName("biSelect");
    setWgtLayout(biBg, [0.3,0.3],[0.5,0.76],[0,0]);
    
    biBg.x = cc.winSize.width * 0.5;
    biBg.visible = true;
    biBg.setTouchEnabled(true);

    var children = biBg.children;
    for(var i = 0; i < children.length; i++){
        if(children[i].getName() == "cloneBtn"){
            children[i].removeFromParent(true);
        }
    }
    var off_x = 20,off_y = 20;
    var selectBtn = biBg.getChildByName("selectBtn");
    var startPos = selectBtn.getPosition();

    var off_width = (initSize.width-selectBtn.width)/2;
    biBg.setContentSize(cc.size(selectBtn.width * biSet.length + (biSet.length-1) * off_x + off_width*2,initSize.height));

    for(var i = 0;i < biSet.length;i++){
        var cardList = biSet[i];
        var cloneBtn = selectBtn.clone();
        cloneBtn.visible = true;
        cloneBtn.setName("cloneBtn");
        cloneBtn.setUserData(cardList);

        for(var k = 0;k < cardList.length;k++){
            var card = cardList[k];
            var cardNode = cloneBtn.getChildByName("card_" + k);
            cardNode.visible = true;
            cardNode.loadTexture(cardPath +"hand" + card + ".png");

            cardNode.zIndex = cardList.length - k;
        }
        cloneBtn.setPosition(cc.p(startPos.x + (cloneBtn.width + off_x) * i , startPos.y));
        biBg.addChild(cloneBtn);

        cloneBtn.addClickEventListener(function(btn){
            if(MjClient.playui.jsBind.eat.biSelect1._node.visible){
                MjClient.playui.jsBind.eat.biSelect1.hasShow = true;
            }else{
                MjClient.playui.jsBind.eat.biSelect1.hasShow = false;
            }
            MjClient.playui.jsBind.eat.biSelect1._node.visible = false;
            MjClient.playui.jsBind.eat.biSelect1._node.setTouchEnabled(false);
            var btnList = biBg.children;
            for(var m = 0;m < btnList.length;m++){
                btnList[m].setBright(true);
            }
            btn.setBright(false);
            var tmpHandCardArr = handCardArr.slice();
            var biArr = btn.getUserData();
            for(var i = 0;i < biArr.length;i++){
                tmpHandCardArr.splice(tmpHandCardArr.indexOf(biArr[i]),1);
            }

            if(tmpHandCardArr.indexOf(putCard) >= 0){
                var biSet = MjClient.majiang.getBiCards(tmpHandCardArr,putCard);
                if(biSet && biSet.length > 0){
                    addSecBiCards_xiangxiang(node,biSet,putCard,tmpHandCardArr,chiArr,biArr);
                }
            }else{
                // setChiVisible_hengYang();
                // HZChiToServer_hengYang(chiArr,[biArr]);
                commitEatCards_xiangxiang(chiArr,[biArr]);
            }
        });
    }

    var isScale = true;
    if(MjClient.playui.jsBind.eat.biSelect.hasShow){
        isScale = false;
    }
    var chiBg = node.getChildByName("chiSelect");
    biBg.scale = chiBg.scale;
    if(ziPai.getUiLayoutType() == 0){//新布局
        doMoveCenterAction_xiangxiang([chiBg,biBg],isScale);
    }else{
        doMoveCenterAction([chiBg,biBg],isScale);
    }
}

//添加第二个比牌
function addSecBiCards_xiangxiang(node,biSet,putCard,handCardArr,chiArr,firstBiArr){
    var cardPath = ziPai.getCardFilePath();
    
    var biBg = node.getChildByName("biSelect1");
    
    setWgtLayout(biBg, [0.3,0.3],[0.5,0.76],[0,0]);

    biBg.x = cc.winSize.width * 0.5;
    biBg.visible = true;
    biBg.setTouchEnabled(true);

    var children = biBg.children;
    for(var i = 0; i < children.length; i++){
        if(children[i].getName() == "cloneBtn"){
            children[i].removeFromParent(true);
        }
    }
    var off_x = 20,off_y = 20;
    var selectBtn = biBg.getChildByName("selectBtn");
    var startPos = selectBtn.getPosition();

    var off_width = (initSize.width-selectBtn.width)/2;
    biBg.setContentSize(cc.size(selectBtn.width * biSet.length + (biSet.length-1) * off_x + off_width*2,initSize.height));

    for(var i = 0;i < biSet.length;i++){
        var cardList = biSet[i];
        var cloneBtn = selectBtn.clone();
        cloneBtn.visible = true;
        cloneBtn.setName("cloneBtn");
        cloneBtn.setUserData(cardList);

        for(var k = 0;k < cardList.length;k++){
            var card = cardList[k];
            var cardNode = cloneBtn.getChildByName("card_" + k);
            cardNode.visible = true;
            cardNode.loadTexture(cardPath +"hand" + card + ".png");

            cardNode.zIndex = cardList.length - k;
        }
        cloneBtn.setPosition(cc.p(startPos.x + (cloneBtn.width + off_x) * i , startPos.y));
        biBg.addChild(cloneBtn);

        cloneBtn.addClickEventListener(function(btn){
            var biArr = btn.getUserData();
            var btnList = biBg.children;
            for(var m = 0;m < btnList.length;m++){
                btnList[m].setBright(true);
            }
            btn.setBright(false);
            // setChiVisible_hengYang();
            // HZChiToServer_hengYang(chiArr,[firstBiArr,biArr]);

            commitEatCards_xiangxiang(chiArr,[firstBiArr,biArr]);
        });
    }

    var isScale = true;
    if(MjClient.playui.jsBind.eat.biSelect1.hasShow){
        isScale = false;
    }
    var chiBg = node.getChildByName("chiSelect");
    var biBg0 = node.getChildByName("biSelect");
    biBg.scale = chiBg.scale;
    biBg0.scale = chiBg.scale;
    if(ziPai.getUiLayoutType() == 0){//新布局
        doMoveCenterAction_xiangxiang([chiBg,biBg0,biBg],isScale);
    }else{
        doMoveCenterAction([chiBg,biBg0,biBg],isScale);
    }
}

//居中动画,数组里的节点居中排列 只关心x轴
doMoveCenterAction_xiangxiang = function(arr,isScale){
    arr.reverse();
    var gap = 5;
    isScale = isScale === undefined ? true : isScale;
    if(arr && arr.length > 0){
        var len = arr.length;
        var w = 0;
        for(var i = 0; i < len; i++){
            var node = arr[i];
            if(node && node.width){
                w += node.width * node.scale;
                w += gap;
            }
        }        
    }
    var size = cc.size(cc.winSize.width - cc.winSize.width*0.09, cc.winSize.height);
    var tx = (size.width - w);
    if(size.width < w){
        tx = 0;
    }
    var preNode = null;
    var oldScale = 0.4;
    for(var i = 0; i < len - 1; i++){
        var node = arr[i];
        if(i == 0){
            oldScale = node.scale;
        }

        if(node){
            node.stopAllActions();
            tx += node.width * 0.5 * node.scale + gap;
            var p = cc.p(tx, node.y);
            var ac = cc.moveTo(ziPai.acTime, p).easing(cc.easeExponentialOut(0.2));;
            node.runAction(ac);

            tx += node.width * 0.5 * node.scale;
        }
    }

    var node = arr[len - 1];
    if(node){
        node.stopAllActions();
        tx += node.width * 0.5 * node.scale + gap;
        node.x = tx;

        if(isScale){
            node.scale = 0.1;
            var ac = cc.scaleTo(0.1, oldScale).easing(cc.easeExponentialOut(0.1));
            node.runAction(ac);
        }
    }
        
};

//添加吃的牌
function addEatCard_xiangxiang(node,name,mjNum,off){
    //根据牌的类型获得需要添加的节点
    var eatNode = node.getChildByName("eatNode");
    if(!eatNode){
        return;
    }
    var type = 2;
    //设置牌
    var newCard = getNewCard_xiangxiang(mjNum,type,off);
    var parentCount = eatNode.childrenCount;
    //首先根据name判断cpNode中是否已经添加
    var cardParent = eatNode.getChildByName(name);
    if(!cardParent){
        cardParent = new cc.Node();
        cardParent.setName(name);
        if(node.getName() == "down"){
            cardParent.x = parentCount * newCard.width;
            cardParent.y = 0;
        }else if (node.getName() == "right"){
            cardParent.x = eatNode.width - parentCount * newCard.width;
            cardParent.y = eatNode.height;
        }else if (node.getName() == "left"){
            cardParent.x = parentCount * newCard.width;
            cardParent.y = eatNode.height;
        }else if (node.getName() == "xing"){
            cardParent.x = eatNode.width - parentCount * newCard.width;
            cardParent.y = 0;
        }
        eatNode.addChild(cardParent);
    }
    var off_y = 0;
    if(node.getName() == "down"){
        off_y = newCard.height;
        newCard.anchorX = 0;
        newCard.anchorY = 0;
    }else if(node.getName() == "right"){
        off_y = -newCard.height;
        newCard.anchorX = 1;
        newCard.anchorY = 1;
    }else if(node.getName() == "left"){
        off_y = -newCard.height;
        newCard.anchorX = 0;
        newCard.anchorY = 1;
    }else if (node.getName() == "xing"){
        off_y = newCard.height;
        newCard.anchorX = 1;
        newCard.anchorY = 0;
    }

    //怀化红拐弯吃碰牌堆不倒置
    // if(MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN){
    //     if(node.getName() == "right"){
    //         off_y = newCard.height;
    //         newCard.anchorX = 1;
    //         newCard.anchorY = 0;
    //     }else if(node.getName() == "left"){
    //         off_y = newCard.height;
    //         newCard.anchorX = 0;
    //         newCard.anchorY = 0;
    //     }
    // }

    var cardCount = cardParent.childrenCount;
    newCard.zIndex = 4 - cardCount;
    newCard.x = 0;
    newCard.y = cardCount * off_y;

    // 耒阳吃牌不颠倒顺序
    if (name.substr(0, 5) ==  "mjchi" || name.substr(0, 4) == "mjbi") {
        if (node.getName() == "right" || node.getName() == "left") {
            newCard.y = (2 - cardCount) * off_y;
        }
    }

    cardParent.addChild(newCard);
}

/**
 添加手牌(回放)
 */
function addHandCardReplay_xiangxiang(tagName,index,mjNum,off){
    var _node = getNode_xiangxiang(off);
    //根据牌的类型获得需要添加的节点
    var addNode = _node.getChildByName("replayNode");
    if(!addNode){
        return;
    }
    //设置牌
    var type = 2;
    var newCard = getNewCard_xiangxiang(mjNum,type,off);
    var scale_y = newCard.scaleY;
    var parentCount = addNode.childrenCount;
    //首先根据name判断cpNode中是否已经添加
    var cardParent = addNode.getChildByTag(tagName);
    if(!cardParent){
        cardParent = new cc.Node();
        cardParent.tag = tagName;
        if(_node.getName() == "down"){
            cardParent.x = parentCount * newCard.width;
            cardParent.y = 0;
        }else if (_node.getName() == "right"){
            cardParent.x = addNode.width - parentCount * newCard.width;
            cardParent.y = 0;
        }else if (_node.getName() == "left"){
            cardParent.x = parentCount * newCard.width;
            cardParent.y = 0;
        }else if (_node.getName() == "xing"){
            cardParent.x = addNode.width - parentCount * newCard.width;
            cardParent.y = 0;
        }
        addNode.addChild(cardParent);
    }
    var off_y = 0;
    if(_node.getName() == "down" || _node.getName() == "left"){
        off_y = newCard.height;
        newCard.anchorX = 0;
        newCard.anchorY = 0;
    }else if(_node.getName() == "right" || _node.getName() == "xing"){
        off_y = newCard.height;
        newCard.anchorX = 1;
        newCard.anchorY = 0;
    }
    var cardCount = cardParent.childrenCount;
    newCard.zIndex = 4 - cardCount;
    newCard.x = 0;
    newCard.y = cardCount * off_y;
    cardParent.addChild(newCard);
}

function checkCard_xiangxiang(node, off){
    if(off != 0 || MjClient.rePlayVideo != -1){
        return;
    }
    if(off == 0 && node.getName() != "down"){
        return;//2人玩法right节点同为玩家节点
    }
    var pl = getUIPlayer_xiangxiang(off);
    if(!pl){
        return;
    }

    var sData = MjClient.data.sData;
    var tData = sData.tData; 

    // 在小结算数据的时候，不需要在去检测手牌内容了
    if(tData.tState == TableState.roundFinish ){
        return;
    }
    var cardHandArr = [];
    if (MjClient.HandCardArr) {
        for(var i = 0; i < MjClient.HandCardArr.length; i++){
            for(var j = 0; j < MjClient.HandCardArr[i].length; j++){
                cardHandArr.push(MjClient.HandCardArr[i][j]);
            }
        }
    }
    var cardHand = [];
    if(pl.mjhand){
        cardHand = pl.mjhand.slice();
    }
    if(cardHandArr.length > cardHand.length){
        cardHandArr.sort(function (a, b) {
            return a - b;
        });
        cardHand.sort(function (a, b) {
            return a - b;
        });
        for(var i = 0;i < cardHandArr.length; i++){
            if(cardHandArr[i] != cardHand[i]){
                RemoveHandCard_xiangxiang(node, cardHandArr[i], off);
                cardHandArr.splice(i, 1);
                i--;
            }
        }
    }
}

/*
 添加手牌(正常打牌)
 每一组添加到一个节点,比如4个同样的为一个节点，单牌也为一个节点
 */
function addHandCard_xiangxiang(tagName,index,mjNum,off,total,showStatus){
    if(off != 0){
        return;
    }
    var _node = getNode_xiangxiang(off);
    //根据牌的类型获得需要添加的节点
    var addNode = _node.getChildByName("handNode");
    if(!addNode){
        return;
    }
    //设置牌
    var newCard = getNewCard_xiangxiang(mjNum,1,off);
    var scale_y = newCard.scaleY;
    var scale_x = newCard.scaleX;
    //var parentCount = addNode.childrenCount
    //首先根据name判断cpNode中是否已经添加
    var cardParent = addNode.getChildByTag(tagName);
    if(!cardParent){
        cardParent = new cc.Node();
        cardParent.tag = tagName;
        // cardParent.setName(0);           //用于标记子节点的name,用于排序
        cardParent.width = newCard.width;
        addNode.addChild(cardParent);
        // SetTouchCardHandler_xiangxiang(cardParent);
        //添加胡息背景
        AddScoreMask_xiangxiang(cardParent, newCard.width * newCard.scaleX, showStatus);
    }

    var beginPoint = cc.p(0,0);
    var off_y = (newCard.height - newCard.height/4) * scale_y;
    var cardCount = cardParent.childrenCount - 1;
    newCard.setName(index);
    newCard.zIndex = 4 - index;
    newCard.anchorX = 0;
    newCard.anchorY = 0;
    newCard.x = beginPoint.x;
    newCard.y = beginPoint.y + cardCount * off_y;
    cardParent.addChild(newCard);
    // cc.log("x:" + newCard.x + "---y:" + newCard.y);
    var pl = getUIPlayer_xiangxiang(off);
    if(pl && pl.canNotPutCard){
        if(pl.canNotPutCard.indexOf(mjNum) != -1){
            newCard.setColor(cc.color(170, 170, 170));
        }
    }

    if(index == total - 1 && total > 2){
        var children = cardParent.getChildren();
        var array = [];
        for(var i = 0; i < children.length;i++){
            var child = children[i];
            if(child.tag > 0 && child.tag != 180501){
                array.push(child);
            }
        }

        var cardArr = GetSameCount_xiangxiang(array);
        if(cardArr.length >= 3){
            for(var i = 0;i < cardArr.length;i++){
                cardArr[i].setColor(cc.color(170, 170, 170));
            }
        }
        UpdateLieHuXi_xiangxiang(cardParent);
    }
}

function GetSameCount_xiangxiang(cardArr){
    var card = 0;
    var array = [];
    for(var i = 0; i < cardArr.length; i++){
        if(card == 0 || cardArr[i].tag == card){
            if(card == 0){
                card = cardArr[i].tag;
            }
            array.push(cardArr[i]);
        }
    }
    return array;
}

function AddScoreMask_xiangxiang(parent, width, isShow){
    var scoreMask = new cc.Sprite("gameTable/youxizhong-2_29.png");
    scoreMask.setAnchorPoint(cc.p(0.5,0));
    scoreMask.setPosition(cc.p(width/2,0));
    scoreMask.setName("score");
    scoreMask.visible = isShow;
    var tag = 180501;
    scoreMask.setTag(tag);
    parent.addChild(scoreMask,100);


    var scale_x = width / scoreMask.getContentSize().width;
    scoreMask.setScale(scale_x);
    var size = scoreMask.getContentSize();

    var content = cc.LabelTTF("0胡","fonts/fzcy.ttf",24);
    content.setContentSize(size);
    content.setAnchorPoint(cc.p(0.5,0.5));
    content.setPosition(cc.p(size.width/2,size.height/2));
    content.setName("score");
    scoreMask.addChild(content);
}

function UpdateScoreMask_xiangxiang(showStatus){
    var handNode = MjClient.playui._downNode.getChildByName("handNode");
    var children = handNode.getChildren();
    for(var index in children){
        children[index].getChildByName("score").visible = showStatus;
    }
}

/**
 * 更新每列的胡息
 **/
function UpdateLieHuXi_xiangxiang(parent){
    var scoreMask = parent.getChildByName("score");
    if(scoreMask){
        var children = parent.getChildren();
        var array = [];
        for(var i = 0; i < children.length;i++){
            var child = children[i];
            if(child.tag > 0 && child.tag != 180501){
                array.push(child.tag);
            }
        }
        array.sort(function(a, b){
            return a - b;
        });
        
        var score = GetHuXi_xiangxiang(array);
        var content = scoreMask.getChildByName("score");
        content.setString(score + "胡");
    }
}

function GetHuXi_xiangxiang(cardArr){
    var chiArr_xiangxiang = [[1,2,3],[21,22,23],[2,7,10],[22,27,30]];
    var score = 0;
    if(cardArr.length <= 2){
        return score;
    }

    if(cardArr.length == 3){
        if(cardArr[0] == cardArr[1] && cardArr[2] == cardArr[1]){
            return huXiScore_paohuzi("weiPai",cardArr[0]);
        }
        if(MjClient.data.sData.tData.areaSelectMode.isYiwushi){
            chiArr_xiangxiang.push([1, 5, 10], [21, 25, 30]);
        }
        for(var k = 0; k < chiArr_xiangxiang.length;k++){
            if(cardArr.toString() == chiArr_xiangxiang[k].toString()){
                return huXiScore_paohuzi("chi",cardArr[0]);
            }
        }
    }

    if(cardArr.length == 4){
        if(cardArr[0] == cardArr[1] && cardArr[2] == cardArr[1] && cardArr[2] == cardArr[3]){
            return huXiScore_paohuzi("tiPai",cardArr[0]);
        }
    }
    return score;
}

function GetPlayerAllHuXi_xiangxiang(off){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var score = 0;
    var pl = getUIPlayer_xiangxiang(off);
    if(!pl){
        return 0;
    }
    return pl.winall;    
}

//刷新胡息
function UpdateHuXi_xiangxiang(off){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var score = 0;
    var pl = getUIPlayer_xiangxiang(off);
    if(!pl){
        return;
    }
    //跑牌
    var mjpao = pl.mjgang0;
    if(mjpao && mjpao.length>0){
        for(var p=0;p<mjpao.length;p++){
            score += huXiScore_xiangxiang("paoPai",mjpao[p]);
        }
    }

    //碰
    var mjpeng = pl.mjpeng;
    if(mjpeng && mjpeng.length>0){
        for(var i=0;i<mjpeng.length;i++){
            score += huXiScore_xiangxiang("peng",mjpeng[i]);
        }
    }

    //吃
    var mjchi = pl.mjchi;
    if(mjchi && mjchi.length>0){
        var chiScore = function(cards){
            cards = [].concat(cards);
            cards.sort(function(a, b) {return a - b}); // 耒阳调整了eatCards顺序
            var chiXiArr = [[1,2,3],[21,22,23],[2,7,10],[22,27,30], [1, 5, 10], [21, 25, 30]];
            for(var k=0;k<chiXiArr.length;k++){
                var chiXiList = chiXiArr[k];
                if(cards.toString() == chiXiList.toString()){
                    score += huXiScore_xiangxiang("chi",cards[0]);
                }
            }
        };

        for(var i=0;i<mjchi.length;i++){
            var eatCards = mjchi[i].eatCards;
            var biCards = mjchi[i].biCards;
            chiScore(eatCards);
            if(biCards){
                for(var m = 0;m<biCards.length;m++){
                    chiScore(biCards[m]);
                }
            }
        }
    }

    //耒阳提偎算胡息
    if((MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI ||
        MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN)&&pl.info.uid!=SelfUid()){
        //提牌
        var mjti = pl.mjgang1;
        if(MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN){
            if(mjti && mjti.length>0){
                for (var t = 0; t < mjti.length; t++) {
                    score += huXiScore_xiangxiang("tiPai", mjti[t]);
                }
            }
        }else{
            if(mjti && mjti.length>0){
                for (var t = 0; t < mjti.length; t++) {
                    if(MjClient.majiang.getCardShowType(pl.info.uid, mjti[t]) != 0){
                        score += huXiScore_xiangxiang("tiPai", mjti[t]);
                    }
                }
            }
        }
        //偎牌
        var mjwei = pl.mjwei;
        if(mjwei && mjwei.length>0){
            for (var w = 0; w < mjwei.length; w++) {
                if(MjClient.majiang.getCardShowType(pl.info.uid, mjwei[w]) != 0) {
                    score += huXiScore_xiangxiang("weiPai", mjwei[w]);
                }
            }
        }
    }else {
        //提牌
        var mjti = pl.mjgang1;
        if(mjti &&　mjti.length>0){
            for (var t = 0; t < mjti.length; t++) {
                score += huXiScore_xiangxiang("tiPai", mjti[t]);
            }
        }
        //偎牌
        var mjwei = pl.mjwei;
        if(mjwei && mjwei.length>0){
            for (var w = 0; w < mjwei.length; w++) {
                score += huXiScore_xiangxiang("weiPai", mjwei[w]);
            }
        }
    }

    var selfIndex = tData.uids.indexOf(SelfUid());
    if(tData.xingPlayer == selfIndex){
        pl = getUIPlayer_xiangxiang(2);
        //提牌
        var mjti = pl.mjgang1;
        if(mjti && mjti.length>0){
            for(var t=0;t<mjti.length;t++){
                score += huXiScore_xiangxiang("tiPai",mjti[t]);
            }
        }
        //偎牌
        var mjwei = pl.mjwei;
        if(mjwei && mjwei.length>0){
            for(var w=0;w<mjwei.length;w++){
                score += huXiScore_xiangxiang("weiPai",mjwei[w]);
            }
        }
    }

    //邵阳娄底放炮罚不需要算手牌胡息
    // if(MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA || MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA){
    //     return score;
    // }
    
    //耒阳手牌也要算胡息
    if(off == 0){
        var cardArr = MjClient.HandCardArr;
        score +=  MjClient.majiang.getHandHuxi(cardArr);
    }
    return score;
}

//小结算胡息显示
function getPlayerTotalHuXi_xiangxiang(pl){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var score = 0;
    if(!pl){
        return;
    }
    //跑牌
    var mjpao = pl.mjgang0;
    if(mjpao && mjpao.length>0){
        for(var p=0;p<mjpao.length;p++){
            score += huXiScore_xiangxiang("paoPai",mjpao[p]);
        }
    }

    //碰
    var mjpeng = pl.mjpeng;
    if(mjpeng && mjpeng.length>0){
        for(var i=0;i<mjpeng.length;i++){
            score += huXiScore_xiangxiang("peng",mjpeng[i]);
        }
    }

    //吃
    var mjchi = pl.mjchi;
    if(mjchi && mjchi.length>0){
        var chiScore = function(cards){
            cards = [].concat(cards);
            cards.sort(function(a, b) {return a - b}); 
            var chiXiArr = [[1,2,3],[21,22,23],[2,7,10],[22,27,30], [1, 5, 10], [21, 25, 30]];
            for(var k=0;k<chiXiArr.length;k++){
                var chiXiList = chiXiArr[k];
                if(cards.toString() == chiXiList.toString()){
                    score += huXiScore_xiangxiang("chi",cards[0]);
                }
            }
        };

        for(var i=0;i<mjchi.length;i++){
            var eatCards = mjchi[i].eatCards;
            var biCards = mjchi[i].biCards;
            chiScore(eatCards);
            if(biCards){
                for(var m = 0;m<biCards.length;m++){
                    chiScore(biCards[m]);
                }
            }
        }
    }

    //提牌
    var mjti = pl.mjgang1;
    if(mjti &&　mjti.length>0){
        for (var t = 0; t < mjti.length; t++) {
            score += huXiScore_xiangxiang("tiPai", mjti[t]);
        }
    }

    //偎牌
    var mjwei = pl.mjwei;
    if(mjwei && mjwei.length>0){
        for (var w = 0; w < mjwei.length; w++) {
            score += huXiScore_xiangxiang("weiPai", mjwei[w]);
        }
    }
    
    //手牌胡息
    // var cardArr = MjClient.majiang.sortHandCardSpecial(pl.mjhand)
    // score +=  MjClient.majiang.getHandHuxi(cardArr);

    return score;
}

/**
 mjNum:牌的数字
 type:类型，1:手牌 2：吃牌 3：打的牌
 **/
function getNewCard_xiangxiang(mjNum, type, off, isTurn ,isSelf){
    var _node = getNode_xiangxiang(off);
    var copyNode = null;
    if(type == 1){
        //手牌
        copyNode = _node.getChildByName("handCard");
    }else if(type == 2){
        //吃的牌
        copyNode = _node.getChildByName("out0");
    }else if(type == 4){
        //醒牌
        copyNode = _node.getChildByName("xingPai");
    }else{
        //打出的牌
        copyNode = _node.getChildByName("put");
    }
    var mjNode = copyNode.clone(); //克隆一个白板，上面没有任何条纹的麻将 ，by sking
    mjNode.removeAllChildren();
    mjNode.visible = true;

    if(mjNum > 0){
        //创建一个带有麻将信息的麻将 cp为创建后的麻将
        setCardSprite_xiangxiang(mjNode, mjNum, type, isTurn, isSelf);
        if(type == 1){
            //只有手牌才会有点击事件
            SetTouchCardHandler_xiangxiang(mjNode,off);
        }
    }

    return mjNode;
}

/**
 设置牌的渲染
 mjNode:麻将node
 mjNum:麻将tag
 type:类型，1:手牌 2：吃牌 3：打的牌
 */
function setCardSprite_xiangxiang(mjNode, mjNum, type, isTurn, isSelf){
    var ZiPaitypeIndex = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, 1);
    if(ZiPaitypeIndex != 0 && ZiPaitypeIndex != 1 && ZiPaitypeIndex != 2){
        ZiPaitypeIndex = 1;
    }
    var path = "playing/ziPai/";
    var handSizeType = ["big", "small", "super"];
    var ziPaiType = ["type1", "type2", "type3"];
    var handSize = ziPai.getHandSizeType();
    //fix by zhenggang 解决湘乡没有super牌，导致的资源加载失败
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
        handSizeType = ["big", "small"];
        handSize = handSize > 1 ? 0 : handSize;
    }
    path += handSizeType[handSize];
    path += "/" + ziPaiType[ZiPaitypeIndex];
    path += "/";
    MjClient.cardPath_xiangxiang = path;

    if((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) && MjClient.gameType != MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN){
        ziPaiType = ["type1", "type4", "type3"];
        path = "playing/ziPai/";
        path += handSizeType[handSize];
        path += "/" + ziPaiType[ZiPaitypeIndex];
        path += "/";
        MjClient.cardPath_xiangxiang = path;
    }

    if((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ) && MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN){
        MjClient.cardPath_xiangxiang = ziPai.getCardFilePath();
    }

    if(MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA){
        MjClient.cardPath_xiangxiang = ziPai.getCardFilePath();
    }

    if(type == 1){
        mjNode.loadTexture(MjClient.cardPath_xiangxiang+"hand" + mjNum + ".png");
    }
    if(type == 2){
        mjNode.loadTexture(MjClient.cardPath_xiangxiang+"out" + mjNum + ".png");
        if(isTurn){
            if(isSelf){
                var sp = cc.Sprite.create("playing/ziPai/shadow_card.png");
                var size = mjNode.getCustomSize();
                sp.setAnchorPoint(0.5,0.5);
                sp.setPosition(cc.p(size.width / 2 ,size.height / 2));
                sp.setScale(size.width/sp.getContentSize().width);
                mjNode.addChild(sp);
            }else{
                mjNode.loadTexture(MjClient.cardPath_xiangxiang+"huxiBG.png");
            }
        }
    }
    if(type == 3 || type == 4){
        mjNode.loadTexture(MjClient.cardPath_xiangxiang+"put" + mjNum + ".png");
        if(isTurn){
            mjNode.loadTexture(MjClient.cardPath_xiangxiang+"normalBG.png");
        }
    }
    mjNode.tag = mjNum;
}

function checkTingCards_xiangxiang(putCard){
    if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
        //听牌检测
        var sData = MjClient.data.sData;

        if(MjClient.data.sData.tData.tState == TableState.waitPut && curPlayerIsMe_xiangxiang(0) && putCard === undefined){
             postEvent("showTingLayer", []);
            return;
        }

        if(putCard && (!curPlayerIsMe_xiangxiang(0) || sData.tData.tState != TableState.waitPut)){
            putCard = undefined;
        }

        var pl = sData.players[SelfUid()];
        if(pl && pl.mjhand){ //回放时 initSceneData事件时 pl.mjhand 没值
            var cards = MjClient.huzi.getTingCards(sData, pl, putCard);
            postEvent("showTingLayer", cards);
        }
        
    }
}

//刷新手牌移动时的坐标
var btn_oPos = null;
function updateBtnMovedPosition_xiangxiang(btn, eventType){
    if (eventType == ccui.Widget.TOUCH_BEGAN) {
        if(!btn_oPos){
            btn_oPos = btn.getTouchBeganPosition();
        }
    }else if(eventType == ccui.Widget.TOUCH_MOVED){
        if(!btn_oPos){
            //在移动牌的过程中，有吃碰偎跑操作导致btn_oPos=null
            btn.setPosition(cc.pSub(btn.getTouchMovePosition(), btn.parent.getPosition()));
            btn_oPos = btn.getPosition();
        }else{
            var touchPos = btn.getTouchMovePosition();
            var deltePos = cc.pSub(touchPos, btn_oPos);
            var factPos = cc.pAdd(btn.getPosition(), deltePos);
            btn.setPosition(factPos);
            btn_oPos = touchPos;
        }
    }else if(eventType == ccui.Widget.TOUCH_ENDED || eventType == ccui.Widget.TOUCH_CANCELED){
        btn_oPos = null;
    }
}

MjClient.movingCard_paohuzi = null;
MjClient.originPosOfCard_paohuzi = null; //记录所移动牌的原始位置
MjClient.doubleClickToPutCard = false;   //双击出牌
MjClient.timeIntervalOfDoubleClick = 0; 
MjClient.lastClickCard = null;
//MjClient.cloneCard = null;
//MjClient.putCard = null;
MjClient.hasPut = false;
function SetTouchCardHandler_xiangxiang(card,off){
    var cardTag = card.tag;
    var pl = getUIPlayer_xiangxiang(off);
    var mjhand = pl.mjhand;
    var cardArr = {};
    for(var i = 0;i< mjhand.length;i++){
        if(!cardArr[mjhand[i]]){
            cardArr[mjhand[i]] = 1;
        }else{
            cardArr[mjhand[i]] ++;
        }
    }
    if(cardArr[cardTag + ""] >= 3 && !MjClient.majiang.isEqualHunCard(cardTag)){

        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
            card.setColor(cc.color(170, 170, 170));
        }
        return;
    }

    card.setColor(cc.color(255, 255, 255));

    var _node = getNode_xiangxiang(off);
    // var movingCard_paohuzi = null;

    var acTime = 0.2;    //牌打出去的时间
    var acTempo = cc.winSize.width * 1.563;  //牌打出去的速度
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP || MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN
        || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA){
        acTime = 0.25;
        acTempo = cc.winSize.width * 1.25;  //牌打出去的速度
    }

    card.addTouchEventListener(function(btn,eventType){

        //禁止同时移动多个牌
        if(MjClient.movingCard_paohuzi !== null && cc.sys.isObjectValid(MjClient.movingCard_paohuzi) && MjClient.movingCard_paohuzi !== btn){
            return;
        }

        if(eventType == ccui.Widget.TOUCH_BEGAN){
            MjClient.movingCard_paohuzi = btn;
            MjClient.originPosOfCard_paohuzi = btn.parent.convertToWorldSpace(btn.getPosition());
            //
            var beginPos = btn.getPosition();
            var touchPos = beginPos;//btn.parent.convertToWorldSpace(beginPos);
            touchPos = cc.p(touchPos.x + (0.5 - btn.anchorX) * btn.width * btn.scaleX,
                touchPos.y + (0.5 - btn.anchorY) * btn.height * btn.scaleY);
            var cloneCard = btn.clone();
            setCardSprite_xiangxiang(cloneCard, cardTag, 1, false);
            cloneCard.opacity = 100;
            if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ){

            }else{
                btn.parent.addChild(cloneCard);
            }

            //按产品需求:天天项目所有字牌拖动牌时改为整张长牌
            if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ){
                MjClient.btnSc = {};
                MjClient.btnSc["x"] = btn.getScaleX();
                MjClient.btnSc["y"] = btn.getScaleY();
                var alignWidth = btn.scale * btn.width;
                setCardSprite_xiangxiang(btn, btn.tag, 3, false);
                btn.scale = alignWidth / btn.width;
                var tingSign = btn.getChildByName("tingImg");
                if(cc.sys.isObjectValid(tingSign) && tingSign.isVisible()){
                    tingSign.y = btn.getContentSize().height;
                    tingSign.x = 0;
                }
            }

            btn.anchorX = 0.5;
            btn.anchorY = 0.5;
            var maxZOrder = -1;
            if (btn.parent && btn.parent.parent)
            {
                var handNode = btn.parent.parent;
                for (var i=0; i<handNode.getChildrenCount(); i++)
                {
                    var zorder = handNode.getChildren()[i].getLocalZOrder();
                    if (maxZOrder < zorder) maxZOrder = zorder;
                }
            }
            else
            {
                maxZOrder = 2000;
            }
            btn.parent.zIndex = maxZOrder+1;
            btn.zIndex = 5;
            btn.x = touchPos.x;
            btn.y = touchPos.y;
            updateBtnMovedPosition_xiangxiang(btn, eventType);
            ShowPutCardIcon_xiangxiang();

            checkTingCards_xiangxiang(btn.tag);

            return true;
        }
        if(eventType == ccui.Widget.TOUCH_MOVED){
            if (MjClient.movingCard_paohuzi==null) return;
            // var movePos = btn.getTouchMovePosition();
            // movePos = cc.pSub(movePos, btn.parent.getPosition());
            // btn.x = movePos.x;
            // btn.y = movePos.y;
            updateBtnMovedPosition_xiangxiang(btn, eventType);
        }
        if(eventType == ccui.Widget.TOUCH_ENDED || 
            eventType == ccui.Widget.TOUCH_CANCELED){ //fix by 千千 统一处理
            if (MjClient.movingCard_paohuzi==null) return;
            updateBtnMovedPosition_xiangxiang(btn, eventType);
            //湘乡APP可以双击出牌
            if((MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ||
                MjClient.gameType == MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA ||
                MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI ||
                MjClient.gameType == MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI) 
                && ziPai.getDoubleClickType() === 1){

                if(MjClient.timeIntervalOfDoubleClick && MjClient.lastClickCard){
                    var currentTouchTime = new Date().getTime();
                    MjClient.timeIntervalOfDoubleClick = currentTouchTime - MjClient.timeIntervalOfDoubleClick;
                    MjClient.doubleClickToPutCard = MjClient.lastClickCard === MjClient.movingCard_paohuzi.tag && MjClient.timeIntervalOfDoubleClick < 300;
                    MjClient.timeIntervalOfDoubleClick = currentTouchTime;
                }else{
                    var currentTouchTime = new Date().getTime();
                    MjClient.timeIntervalOfDoubleClick = currentTouchTime;          
                }
            }
            //天天所有字牌拖动改为长牌，松手还原
            if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
                setCardSprite_xiangxiang(btn, btn.tag, 1, false);
                btn.setScaleX(MjClient.btnSc.x);
                btn.setScaleY(MjClient.btnSc.y);
            }
            MjClient.lastClickCard = MjClient.movingCard_paohuzi.tag;
            MjClient.movingCard_paohuzi = null;
            var btnParent = btn.parent;
            var btnTag = btn.tag;
            var btnName = btn.name;
            var scale_x = btn.scaleX;
            var endPos = btn.getTouchEndPosition();
            var pl = getUIPlayer_xiangxiang(0);
            var tData = MjClient.data.sData.tData;
            var isPut = false;
            var cutLine = MjClient.playui.jsBind.cutLine._node;
            var hintPutList = MjClient.hintPutList_ziPai;

            if(((!pl.canNotPutCard||pl.canNotPutCard.indexOf(btnTag)==-1) &&(getOtherWeiCards_xiangxiang(btnTag)||(pl.limitHuPutCard && pl.limitHuPutCard.indexOf(btnTag) != -1))) &&
                IsTurnToMe() && tData.tState == TableState.waitPut && pl.mjState == TableState.waitPut &&
                !MjClient.isCommon && (endPos.y >= cutLine.y || MjClient.doubleClickToPutCard) && !MjClient.hasPut)
            {
                MjClient.doubleClickToPutCard = false;
                MjClient.timeIntervalOfDoubleClick = 0;

                if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI && tData.areaSelectMode.mingwei && getOtherWeiCards_xiangxiang(btnTag)
                    && hintPutList.indexOf(btnTag) == -1 && getHandNumBesidesKan(0) > 5){
                    MjClient.playui.ResetHandCard(MjClient.playui._downNode,0);
                    ShowPutCardIcon_xiangxiang();
                    MjClient.showToast("未听牌不能放偎！");
                    return ;
                }

                //出牌后直接落牌，add by maoyu
                var putNode = MjClient.playui._downNode.getChildByName("put");
                putNode.removeAllChildren();
                var putCard = getNewCard_xiangxiang(btnTag, 3 ,off);
                putCard.scaleX = putCard.width/putNode.width - 0.16;
                putCard.scaleY = putCard.width/putNode.width - 0.06;
                putCard.x = putCard.width/2;
                putCard.y = putCard.height/2;
                putNode.addChild(putCard);
                putNode.visible = true;
                var pos = putNode.getUserData().pos;
                if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
                    //邵阳的要求还原了
                    // putNode.setScale(0);
                    // putNode.setPosition(cc.p(pos.x ,pos.y - 200));
                    // var action1 = cc.scaleTo(acTime,putNode.getUserData().scale);
                    // var action2 = cc.moveTo(acTime,pos.x,pos.y);
                    // putNode.runAction(cc.spawn(action1,action2));
                    putNode.loadTexture("playing/paohuzi/chupai_bj.png");
                    putCard.setPosition(cc.p(putCard.width / 2, putCard.height / 2));
                    var p = btn.parent.convertToWorldSpace(cc.p(btn.x, btn.y));
                    putNode.setPosition(putNode.parent.convertToNodeSpace(p));
                    putNode.setScale(putNode.getUserData().scale);
                    var action = cc.moveTo(ziPai.acTime, pos.x, pos.y);
                    putNode.runAction(action);
                } else {
                    //putNode.setScale(0);
                    putNode.setScale(putNode.getUserData().scale);
                    putNode.setPosition(cc.p(pos.x ,pos.y - 200));
                    var action1 = cc.scaleTo(acTime,putNode.getUserData().scale);
                    var action2 = cc.moveTo(acTime,pos.x,pos.y);
                    //putNode.runAction(cc.spawn(action1,action2));
                    putNode.runAction(action2);  //按产品需求:出牌过程去掉缩放动画
                }

                btn.removeFromParent();

                if(getOtherWeiCards_xiangxiang(btnTag) && MjClient.gameType != MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN && 
                    !(MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI && !tData.areaSelectMode.mingwei)){
                    MjClient.showMsg("放偎之后这局将不能再吃碰，是否确定？",
                        function(){
                            if(pl.limitHuPutCard && pl.limitHuPutCard.indexOf(btnTag) != -1){
                                MjClient.showMsg("吃边打边，这局将只能胡"+ MjClient.majiang.getLimitHuDesc(btnTag, tData)+"，是否确定？",
                                    function(){
                                        MjClient.hasPut = true;
                                        MjClient.isCommon = false;
                                        MjClient.HandCardArr[btnParent.tag].splice(parseInt(btnName),1);
                                        HZPutCardToServer_xiangxiang(btnTag);
                                        MjClient.playui.ResetHandCard(MjClient.playui._downNode,0);

                                        checkTingCards_xiangxiang(btnTag);
                                    },
                                    function(){
                                        MjClient.playui.ResetHandCard(MjClient.playui._downNode,0);
                                        ShowPutCardIcon_xiangxiang();
                                        putNode.removeAllChildren();
                                        putNode.setVisible(false);
                                    }, "1");
                                return;
                            }
                            MjClient.hasPut = true;
                            MjClient.isCommon = false;
                            MjClient.HandCardArr[btnParent.tag].splice(parseInt(btnName),1);
                            HZPutCardToServer_xiangxiang(btnTag);
                            MjClient.playui.ResetHandCard(MjClient.playui._downNode,0);

                            checkTingCards_xiangxiang(btnTag);
                        },
                        function(){
                            MjClient.playui.ResetHandCard(MjClient.playui._downNode,0);
                            ShowPutCardIcon_xiangxiang();
                            putNode.removeAllChildren();
                            putNode.setVisible(false);

                            checkTingCards_xiangxiang();
                        }, "1");
                }else if((pl.limitHuPutCard && pl.limitHuPutCard.indexOf(btnTag) != -1) && MjClient.gameType != MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN && 
                    !(MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI && !tData.areaSelectMode.mingwei)){
                    MjClient.showMsg("吃边打边，这局将只能胡"+ MjClient.majiang.getLimitHuDesc(btnTag, tData)+"，是否确定？",
                        function(){
                            MjClient.hasPut = true;
                            MjClient.isCommon = false;
                            MjClient.HandCardArr[btnParent.tag].splice(parseInt(btnName),1);
                            HZPutCardToServer_xiangxiang(btnTag);
                            MjClient.playui.ResetHandCard(MjClient.playui._downNode,0);

                            checkTingCards_xiangxiang(btnTag);
                        },
                        function(){
                            MjClient.playui.ResetHandCard(MjClient.playui._downNode,0);
                            ShowPutCardIcon_xiangxiang();
                            putNode.removeAllChildren();
                            putNode.setVisible(false);

                            checkTingCards_xiangxiang();
                        }, "1");
                }else if(MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN || 
                    (MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI && !tData.areaSelectMode.mingwei)){
                    MjClient.hasPut = true;
                    MjClient.isCommon = false;
                    MjClient.HandCardArr[btnParent.tag].splice(parseInt(btnName),1);
                    HZPutCardToServer_xiangxiang(btnTag);
                    MjClient.playui.ResetHandCard(MjClient.playui._downNode,0);

                    checkTingCards_xiangxiang(btnTag);
                }
            }
            else
            {
                var isWangBa = MjClient.majiang.isEqualHunCard(btnTag);

                //耒阳新添加玩法
                var isNoPut = false;
                if(pl.canNotPutCard && pl.canNotPutCard.indexOf(btnTag) != -1 && MjClient.majiang.getCanPutCardNum(pl)>0){
                    isNoPut = true;
                }

                if(!isNoPut && !isWangBa && IsTurnToMe() && tData.tState == TableState.waitPut && pl.mjState == TableState.waitPut)
                {
                    if(!MjClient.isCommon && (endPos.y >= cutLine.y || MjClient.doubleClickToPutCard) && !MjClient.hasPut)
                    {
                        isPut = true;
                        MjClient.hasPut = true;
                        MjClient.isCommon = false;
                        MjClient.doubleClickToPutCard = false;
                        MjClient.timeIntervalOfDoubleClick = 0;
                        MjClient.HandCardArr[btnParent.tag].splice(parseInt(btnName),1);
                        HZPutCardToServer_xiangxiang(btnTag);
                        //MjClient.playui.ResetHandCard(MjClient.playui._downNode,off);

                        checkTingCards_xiangxiang(btnTag);


                        //出牌后直接落牌，add by maoyu
                        var putNode = MjClient.playui._downNode.getChildByName("put");
                        putNode.removeAllChildren();
                        var putCard = getNewCard_xiangxiang(btnTag, 3 ,off);
                        putCard.scaleX = putCard.width/putNode.width - 0.16;
                        putCard.scaleY = putCard.width/putNode.width - 0.06;
                        putCard.x = putCard.width/2;
                        putCard.y = putCard.height/2;
                        putNode.addChild(putCard);
                        putNode.visible = true;
                        var pos = putNode.getUserData().pos;
                        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
                            //邵阳的要求还原了
                            // putNode.setScale(0);
                            // putNode.setPosition(cc.p(pos.x ,pos.y - 200));
                            // var action1 = cc.scaleTo(acTime,putNode.getUserData().scale);
                            // var action2 = cc.moveTo(acTime,pos.x,pos.y);
                            // putNode.runAction(cc.spawn(action1,action2));
                            putNode.loadTexture("playing/paohuzi/chupai_bj.png");
                            putCard.setPosition(cc.p(putCard.width / 2, putCard.height / 2));
                            var p = btn.parent.convertToWorldSpace(cc.p(btn.x, btn.y));
                            putNode.setPosition(putNode.parent.convertToNodeSpace(p));
                            putNode.setScale(putNode.getUserData().scale);
                            var action = cc.moveTo(ziPai.acTime, pos.x, pos.y);
                            putNode.runAction(action);
                        } else {
                            //putNode.setScale(0);
                            putNode.setScale(putNode.getUserData().scale);
                            // putNode.setPosition(cc.p(pos.x ,pos.y - 200));
                            // var action1 = cc.scaleTo(acTime,putNode.getUserData().scale);
                            // var action2 = cc.moveTo(acTime,pos.x,pos.y);
                            //putNode.runAction(cc.spawn(action1,action2));

                            //出牌的起始位置由牌的起始位置决定
                            var originPos = MjClient.originPosOfCard_paohuzi;
                            var moveDis = Math.sqrt(Math.pow(pos.y - originPos.y, 2) + Math.pow(pos.x - originPos.x, 2));
                            var action3 = cc.moveTo(moveDis / acTempo, pos.x, pos.y);
                            putNode.zIndex = 99999;
                            putNode.setPosition(cc.p(originPos.x ,originPos.y));

                            putNode.runAction(action3);  //按产品需求:出牌过程去掉缩放动画
                        }
                    }
                }
                btn.removeFromParent(true);
                if(!isPut || isWangBa || isNoPut)
                {
                    var count = btnParent.parent.childrenCount;
                    var totalWidth = btnParent.width * scale_x * count;
                    var min_x = (MjClient.size.width - totalWidth)/2;
                    var selectIndex = Math.ceil((endPos.x - min_x)/(btnParent.width * scale_x));
                    var selectParentTag = selectIndex - 1;
                    if(selectParentTag == btnParent.tag){
                        //位置没有发生变化
                        //if (MjClient.cloneCard) MjClient.cloneCard.opacity = 255;

                        //fix 千千
                        var selectArr = MjClient.HandCardArr[selectParentTag];
                        _changeArrIndex_xiangxiang(selectArr, btnTag, btn);
                    }
                    else if(selectParentTag >= 0 && selectParentTag < count){
                        //在手牌node的范围内
                        var selectArr = MjClient.HandCardArr[selectParentTag];
                        var cardNum = 4;//耒阳一竖条可以放4张牌
                        if(selectArr.length >= cardNum){
                            //if (MjClient.cloneCard) MjClient.cloneCard.opacity = 255;
                        }else{
                            // selectArr.push(btnTag);
                            // MjClient.HandCardArr[btnParent.tag].splice(parseInt(btnName),1);

                            //todo 千千
                            _fixArrIndex_xiangxiang(selectArr, btnTag, btn);
                            MjClient.HandCardArr[btnParent.tag].splice(parseInt(btnName),1);
                        }
                    }
                    else{
                        if((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                            MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA) && count >= 10){

                        }else{
                            //最左边的牌的坐标不能小于头像的坐标
                            var head = MjClient.playui._downNode.getChildByName("head");
                            var head_max_x = head.x + (1 - head.anchorX) * head.width * head.scaleX;
                            var handCard = MjClient.playui._downNode.getChildByName("handCard");
                            var handNode = MjClient.playui._downNode.getChildByName("handNode");
                            var children = handNode.children;
                            var singleWidth = handCard.width * handCard.scaleX;
                            var minX = (MjClient.size.width - (children.length+1) * singleWidth)/2;
                            if(minX > head_max_x){
                                MjClient.HandCardArr[btnParent.tag].splice(parseInt(btnName),1);
                                var arr = [];
                                arr.push(btnTag);
                                if(selectParentTag < 0){
                                    MjClient.HandCardArr.splice(0,0,arr);
                                }else if(selectParentTag >= count){
                                    MjClient.HandCardArr.push(arr);
                                }
                            }else{
                                //if (MjClient.cloneCard) MjClient.cloneCard.opacity = 255;
                            }
                        }
                    }

                    checkTingCards_xiangxiang();
                    //MjClient.playui.ResetHandCard(MjClient.playui._downNode,off);
                }
                MjClient.playui.ResetHandCard(MjClient.playui._downNode,off);
                ShowPutCardIcon_xiangxiang();
            }
        }
        // if(eventType == ccui.Widget.TOUCH_CANCELED){
        //     if (movingCard_paohuzi==null) return;
        //     movingCard_paohuzi = null;
        //     MjClient.playui.ResetHandCard(MjClient.playui._downNode,off);
        //     ShowPutCardIcon_xiangxiang();
        // }
    });
}

//判断除手牌中除了坎以外的手牌张数
function getHandNumBesidesKan(off){
    var pl = getUIPlayer_xiangxiang(off);
    var mjhand = pl.mjhand;
    var cardArr = {};
    cardNum = 0;
    for(var i = 0;i< mjhand.length;i++){
        if(!cardArr[mjhand[i]]){
            cardArr[mjhand[i]] = 1;
        }else{
            cardArr[mjhand[i]] ++;
        }
    }

    for(var index in cardArr){
        if(cardArr[index] != 3){
            cardNum += cardArr[index];
        }
    }

    return cardNum;
}

//根据坐标Y，添加到数组对应的位置
function _fixArrIndex_xiangxiang(arr, btnTag, btn){
    if(_isKan_xiangxiang(arr)){
        arr.push(btnTag);
    }else{
        var off_y = btn.height/4 * btn.scaleY;
        var maxH = btn.height * btn.scaleY * 3 - off_y * 2;
        if(btn.y > maxH){
            arr.push(btnTag);
        }else if(btn.y > btn.height * btn.scaleY * 2 - off_y){
            arr.splice(2,0,btnTag);
        }else if(btn.y > btn.height * btn.scaleY){
            arr.splice(1,0,btnTag);
        }else{
            arr.splice(0,0,btnTag);
        }
    }

}

//改变数组元素的位置
function _changeArrIndex_xiangxiang(arr, btnTag, btn){
    if(!_isKan_xiangxiang(arr)){
        var len = arr.length;
        for(var i = 0; i < len; i++){
            var tag = arr[i];
            if(tag == btnTag){
                arr.splice(i,1);
                break;
            }
        }
        _fixArrIndex_xiangxiang(arr, btnTag, btn);
    }
}

//数组里的是否为三个相同的牌
function _isKan_xiangxiang(arr){
    var len = arr.length;
    if(len < 3){
        return false;
    }

    var count = 1;
    var temTag = arr[0];
    for(var i = 1; i < len; i++){
        var tag = arr[i];
        if(tag == temTag){
            count += 1;
        }
    }
    if(count >= 3){
        return true;
    }
    return false;
}


//断线重连之后，显示之前玩家打的牌
function DealOffLineCard_xiangxiang(node, off){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    // if(tData.tState == TableState.roundFinish || tData.tState == TableState.waitReady || tData.tState == TableState.isReady) {
    //     return;
    // }
    if(tData.tState != TableState.waitPut && tData.tState != TableState.waitEat && tData.tState != TableState.waitCard) {
        //不在打牌过程中
        return;
    }

    if(typeof(tData.currCard) != "undefined" && tData.currCard != -1){
        var uids = tData.uids;
        var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_xiangxiang;
        if(uids[selfIndex] == uids[tData.curPlayer]){
            var putCard = getNewCard_xiangxiang(tData.currCard, 3, off);
            var putNode = node.getChildByName("put");
            putNode.stopAllActions();
            putNode.removeAllChildren();
            putNode.scale = putNode.getUserData().scale;
            putCard.scaleX = putCard.width/putNode.width - 0.16;
            putCard.scaleY = putCard.width/putNode.width - 0.06;
            putCard.x = putCard.width/2;
            putCard.y = putCard.height/2;
            putNode.visible = true;
            putNode.setPosition(putNode.getUserData().pos);
            putNode.addChild(putCard);
        }
    }
}

// 通过玩家idx获取UIBind（down left right xing）
function getUIBindByIndex_xiangxiang(idx) {  
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var jsBind = MjClient.playui.jsBind;
    var uiList = [jsBind.down, jsBind.right, jsBind.left];

    if((MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI  || 
        MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI    ||
        MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI  ||
        MjClient.gameType === MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA     ||
        MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN ||
        MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA) 
        && tData.maxPlayer == 2){
        uiList = [jsBind.down, jsBind.left];
    }else if((MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA) 
        && tData.maxPlayer === 4){
        uiList = [jsBind.down, jsBind.xing, jsBind.right, jsBind.left];
    }

    var selfIdx = tData.uids.indexOf(SelfUid());

    var maxPlayer = tData.maxPlayer;
    var off = (idx + maxPlayer - selfIdx) % maxPlayer;
    return uiList[off];
}

// 落牌动画
function fall_xiangxiang() {
    var sData = MjClient.data.sData;
    var tData = sData.tData;

    // tData.lastPlayer没同步!
    var lastPlayer = (tData.curPlayer - 1 + tData.maxPlayer) % tData.maxPlayer;

    if(lastPlayer == tData.xingPlayer){
        lastPlayer = (lastPlayer - 1 + tData.maxPlayer) % tData.maxPlayer;
    }

    var pl = sData.players[tData.uids[lastPlayer]];
    var uiBind = getUIBindByIndex_xiangxiang(lastPlayer);

    if (pl.mjput.length <= 0) {
        return;
    }

    var putNode = uiBind._node.getChildByName("put");

    // 发牌时候不一定有落牌（重跑 偎后死手等)
    if (!(putNode.getChildren().length > 0 && putNode.getChildren()[0].tag == pl.mjput[pl.mjput.length - 1])) {
        putNode.removeAllChildren();
        putNode.visible = false;
        return;
    }

    var outNode = uiBind._node.getChildByName("outNode");
    var out = outNode.getChildren()[pl.mjput.length - 1];
    var moveX = outNode.getPosition().x;
    var moveY = outNode.getPosition().y;
    if (out) {
        var pos = outNode.convertToWorldSpace(out.getPosition());
        pos.x += (0.5 - out.anchorX) * out.width;
        pos.y += (0.5 - out.anchorY) * out.height;
        var pos2 = uiBind._node.convertToNodeSpace(pos);
        moveX = pos2.x;
        moveY = pos2.y;
    }
    
    var targetPos = cc.p(moveX, moveY);
    var scale = putNode.getUserData().scale * 0.3;
    var scaleX = out.width / putNode.getChildren()[0].width;
    var scaleY = out.height / putNode.getChildren()[0].height;

    putNode.stopAllActions();//chow 防止别家位置不对
    putNode.runAction(cc.sequence(
        cc.spawn(cc.moveTo(0.2, targetPos), cc.scaleTo(0.2, scaleX, scaleY)), 
        cc.callFunc(function () {
            this.removeAllChildren();
            this.visible = false;
        }.bind(putNode))
    ));

    if (out) { // 防止putNode已经被移除 out不显示
        out.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function() { 
            this.visible = true;
        }.bind(out))));
    }
}

//发牌
MjClient.isCommon = false;
function DealNewCard_xiangxiang(node, msg, off) {
    //没有发牌过来的时候直接忽略
    if (!msg.newCard) {
        RemovePutCardOut_xiangxiang();
        MjClient.playui.EatVisibleCheck();
        return;
    }

    AddPutCard_xiangxiang(node, msg, off); // 注意各个玩法验证！
    //存在发牌
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_xiangxiang;
    if (uids[selfIndex] == msg.uid) {
        //清理之前玩家打的牌
        var lastPlayer = tData.lastPlayer;
        if (lastPlayer != -1) {
            //var lastOff = (off + MjClient.MaxPlayerNum_xiangxiang - selfIndex) % MjClient.MaxPlayerNum_xiangxiang;
            // RemovePutCardOut_xiangxiang();
          //  if(MjClient.gameType!=MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI)
            fall_xiangxiang();
        }
        //湘潭暗偎发牌有偎时，只展示牌背
        var flag = 0;

        if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI && !tData.areaSelectMode.mingwei){
           for(var key in msg.eatFlags){
                if(msg.eatFlags[key] & 8){
                    flag = 1;
                }

                if(msg.eatFlags[key] & 16){
                    flag = 2;
                }
            } 
        }
        
        if(flag == 1 || flag == 2){
            var putCard = getNewCard_xiangxiang(msg.newCard, 3, off, true);
        }else{
            var putCard = getNewCard_xiangxiang(msg.newCard, 3, off);
        }

        var pl = sData.players[uids[selfIndex]];
        var putNode = node.getChildByName("put");
        putNode.stopAllActions();
        putNode.removeAllChildren();
        putCard.scaleX = putCard.width / putNode.width - 0.16;
        putCard.scaleY = putCard.width / putNode.width - 0.06;
        putCard.x = putCard.width / 2;
        putCard.y = putCard.height / 2;
        putNode.visible = true;
        putNode.addChild(putCard);
        //添加动作
        var acTime = 0.25;
        if ((MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ||
             MjClient.gameType == MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA ||
             MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA ||
             MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA ||
             MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI ||
             MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI) && tData.isLastDraw) {
            acTime = 0.1;
        }
        //putNode.setScale(0);
        putNode.setScale(putNode.getUserData().scale);
        putNode.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2 + 160));
        var action1 = cc.scaleTo(acTime, putNode.getUserData().scale);
        var action2 = cc.moveTo(acTime, putNode.getUserData().pos);
        //putNode.runAction(cc.spawn(action1, action2).easing(cc.easeCubicActionOut()));
        putNode.runAction(action2.easing(cc.easeCubicActionOut()));//按产品需求:去掉发牌过程的缩放动画

        if ((MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ||
                MjClient.gameType == MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA ||
                MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA ||
                MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA ||
                MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI ||
                MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI) && tData.isLastDraw) {
            var movePos = cc.p(cc.winSize.width / 2, putNode.getUserData().pos.y - 160);
            if (off != 0) {
                movePos = node.getChildByName("head").getPosition();
                movePos = cc.p(movePos.x, movePos.y - 50);
            }
            var delay = cc.delayTime(0.5);
            var action1 = cc.moveTo(0.5, movePos);
            var action2 = cc.fadeTo(0.5, 0.1);
            var action3 = cc.fadeIn(0.1);
            var spawn = cc.spawn(action1, action2);
            var seq = cc.sequence(delay, spawn, cc.callFunc(function() {
                RemovePutCardOut_xiangxiang();
            }), action3);
            putNode.runAction(seq);
        }

        if (!msg.isCommon) {
            if (MjClient.rePlayVideo == -1) {
                MjClient.isCommon = true;
                //王霸牌需要收回
                var callback = function() {
                    RemovePutCardOut_xiangxiang();
                    //如果是自己则需要重新整理手牌
                    if (msg.uid == SelfUid()) {
                        var cardArr = MjClient.HandCardArr;
                        var isAdd = false;
                        for (var i = 0; i < cardArr.length; i++) {
                            var tmpArr = cardArr[i];
                            if (tmpArr.length <= 2) {
                                isAdd = true;
                                MjClient.HandCardArr[i].push(msg.newCard);
                                break;
                            }
                        }
                        if (!isAdd) {
                            MjClient.HandCardArr.push([msg.newCard]);
                        }
                        //MjClient.playui.CardLayoutRestore(node,off);
                        MjClient.playui.ResetHandCard(node, off); //mod by maoyu
                    }
                    MjClient.isCommon = false;
                    ShowPutCardIcon_xiangxiang();
                    MjClient.playui.EatVisibleCheck();
                };
                var delay = cc.delayTime(1.3);
                var remove = cc.callFunc(callback);
                var seq = cc.sequence(delay, remove);
                putNode.runAction(seq);
            } else {
                var cardArr = [];
                if (msg.uid == SelfUid()) {
                    cardArr = MjClient.HandCardArr;
                } else {
                    cardArr = MjClient.OtherHandArr[off];
                }
                var isAdd = false;
                putNode.runAction(cc.sequence(
                    cc.delayTime(0.2),
                    cc.callFunc(function() {
                        RemovePutCardOut_xiangxiang();
                    })
                ));
                for (var i = 0; i < cardArr.length; i++) {
                    var tmpArr = cardArr[i];
                    if (tmpArr.length <= 2) {
                        isAdd = true;
                        //addHandCard_leiyang(i,tmpArr.length.length + 1,msg.newCard,off);
                        tmpArr.push(msg.newCard);
                        break;
                    }
                }
                if (!isAdd) {
                    cardArr.push([msg.newCard]);
                }
                MjClient.playui.CardLayoutRestore(node, off);
            }
        } else {
            // MjClient.playui.EatVisibleCheck(off);
        }
    } else {
        // MjClient.playui.ResetPutCard(node, off); // 发牌时候刷新其他玩家弃牌 // 注意各个玩法验证！
    }
}

function setPutCardPos_xiangxiang(outNode, outCard, idx, off) {
    var tData = MjClient.data.sData.tData;
    var maxPlayer = tData.maxPlayer;
    var type = ziPai.getUiLayoutType();
    var isZuoXing = (tData.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA && tData.areaSelectMode.zuoXing);
    cc.log("setPutCardPos_hengYang:" + isZuoXing);
    if (maxPlayer == 3 /*|| isZuoXing*/) { // 3人
        if (ziPai.getUiLayoutType() == 0 && !isZuoXing) { // 偏右布局
            var off_x = idx % 5;
            var off_y = Math.floor(idx / 5);
            if (off == 0) {
                outCard.anchorX = 1;
                outCard.anchorY = 0;
                outCard.x = outNode.width -  off_x * outCard.width;
                outCard.y = off_y * outCard.height;
            } else if (off == 1) {
                outCard.anchorX = 1;
                outCard.anchorY = 1;
                outCard.x = outNode.width - off_x * outCard.width;
                outCard.y = outNode.height + off_y * outCard.height;
            } else if (off == 2) {
                outCard.anchorX = 0;
                outCard.anchorY = 1;
                outCard.x = off_x * outCard.width;
                outCard.y = outNode.height + off_y * outCard.height;
            }
        } else if(!isZuoXing){ // 传统布局
            var off_x = idx;
            var off_y = 0;

            if (MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ) { // 六胡抢3人15张(todo 判断) 弃牌过多处理
                if(off == 0){
                    off_x = idx % 6;
                    off_y = Math.floor(idx / 6);
                }else{
                    off_x = idx % 30;
                    off_y = Math.floor(idx / 30);
                }
                
            }

            if (off == 0) {
                outCard.anchorX = 1;
                outCard.anchorY = 0;
                outCard.x = outNode.width - off_x * outCard.width;
                outCard.y = off_y * outCard.height;
            } else if (off == 1) {
                outCard.anchorX = 1;
                outCard.anchorY = 1;
                outCard.x = outNode.width - off_x * outCard.width;
                outCard.y = outNode.height + off_y * outCard.height;
            } else if (off == 2) {
                outCard.anchorX = 0;
                outCard.anchorY = 1;
                outCard.x = off_x * outCard.width;
                outCard.y = outNode.height + off_y * outCard.height;
            }
        }else{
            cc.log("setPutCardPos_hengYang isZuoXing");
            if(outNode.getParent().getName() == "down"){
                outCard.anchorX = 1;
                outCard.anchorY = 0;
                outCard.x = outNode.width - idx * outCard.width;
                outCard.y = 0;
            }else if(outNode.getParent().getName() == "right"){
                outCard.anchorX = 1;
                outCard.anchorY = 1;
                outCard.x = outNode.width - idx * outCard.width;
                outCard.y = outNode.height;
            }else if(outNode.getParent().getName() == "left"){
                outCard.anchorX = 0;
                outCard.anchorY = 1;
                outCard.x = idx * outCard.width;
                outCard.y = outNode.height;
            }
        }
    } else if (maxPlayer == 4) { // 4人
        var off_x = idx;
        if (off == 0) {
            outCard.anchorX = 1;
            outCard.anchorY = 0;
            outCard.x = outNode.width - idx * outCard.width;
            outCard.y = 0;
        } else if (off == 1) {
            outCard.anchorX = 1;
            outCard.anchorY = 0;
            outCard.x = outNode.width - idx * outCard.width;
            outCard.y = 0;
        } else if (off == 2) {
            outCard.anchorX = 1;
            outCard.anchorY = 1;
            outCard.x = outNode.width - idx * outCard.width;
            outCard.y = outNode.height;
        } else if (off == 3) {
            outCard.anchorX = 0;
            outCard.anchorY = 1;
            outCard.x = idx * outCard.width;
            outCard.y = outNode.height;
        }
    }else if(maxPlayer == 2) {
        var line = 1;
        var row = 0;
        if (ziPai.getUiLayoutType() == 0)
        {
            line = Math.floor(idx % 6);
            row = Math.floor(idx / 6);
        } else {
            line = Math.floor(idx % 15);
            row = Math.floor(idx / 15);
        }
        cc.log("chow", "setPutCardPos_hengYang off = " + off + " idx = " + idx + " row = " + row + " line = " + line);
        if (off == 0) {
            outCard.anchorX = 1;
            outCard.anchorY = 0;
            outCard.x = outNode.width - line * outCard.width;
            outCard.y = row * outCard.height;
        } else if (off == 1) {
            outCard.anchorX = 1;
            outCard.anchorY = 1;
            outCard.x = outNode.width - line * outCard.width;
            outCard.y = row * outCard.height;
        }

        //按产品需求:天天项目所有字牌2人玩法调整方位后，需要调整出牌位置
        if(MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ ||
          MjClient.getAppType() === MjClient.APP_TYPE.BDHYZP &&
         (MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN ||
          MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || 
          MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA)){
            if (off == 0) {

                line = Math.floor(idx % 6);
                row = Math.floor(idx / 6);

                outCard.anchorX = 1;
                outCard.anchorY = 0;
                outCard.x = outNode.width - line * outCard.width;
                outCard.y = row * outCard.height;
            } else if (off == 1) {

                if (ziPai.getUiLayoutType() == 0)
                {
                    line = Math.floor(idx % 6);
                    row = Math.floor(idx / 6);
                } else {
                    line = Math.floor(idx % 30);
                    row = Math.floor(idx / 30);
                }

                cc.log("切换布局...");
                outCard.anchorX = 1;
                outCard.anchorY = 1;
                if(ziPai.getUiLayoutType() == 0) {
                    outCard.x = (outCard.width ) + (line * outCard.width);
                } else {
                    if(true) {
                        //按产品需求第一排从左到右摆
                        outCard.x = (outCard.width)+  (line * outCard.width);
                    } else {
                        //第二排开始从右往左摆
                        outCard.x = outNode.width*4 - line * outCard.width - 3;
                    }
                }
                if(outNode.parent.getName() == "right"){
                    outCard.x = (outNode.width ) - (line * outCard.width);
                }
                outCard.y = (row+2.3) * outCard.height;
                if(MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN) {
                    outCard.y = (row+2.3) * outCard.height;
                }
            }
        }
    }
}


// 添加弃牌(摸牌或打牌时 弃牌堆直接添加 没人要显示出来) todo!
function AddPutCard_xiangxiang(node, msg, off) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var off_index = (tData.uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_xiangxiang;
    if (off_index == tData.curPlayer) { // off对应玩家为当前玩家
        var pl = sData.players[tData.uids[tData.curPlayer]];
        if (pl.mjput.length <= 0) {
            return;
        }

        var card = pl.mjput[pl.mjput.length - 1];
        var outNode = node.getChildByName("outNode");
        var out = getNewCard_xiangxiang(card, 2, off);
        var count = pl.mjput.length - 1;
        var width = out.width;
        var height = out.height;
        if(MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN || MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA){
            setPutCardPos_hengYang(outNode, out, pl.mjput.length - 1, off);
        }else{
            setPutCardPos_xiangxiang(outNode, out, pl.mjput.length - 1, off);
        }
        out.visible = false;
        outNode.addChild(out);

        var node = new cc.Node();
        out.addChild(node);
        var jsBind = { // 有人要移除 没人要显示
            _event: {
                HZPickCard: function() {
                    out.removeFromParent(true);
                },
                HZChiCard: function() {
                    out.removeFromParent(true);
                },
                MJPeng: function() {
                    out.removeFromParent(true);
                },
                HZWeiCard: function() {
                    out.removeFromParent(true);
                },
                HZGangCard: function(eD) {
                    if (eD.type == 1 && eD.isGangHand) {
                        return;
                    }
                    out.removeFromParent(true);
                },
                HZNewCard: function() {
                    this.removeFromParent(true);
                },
            }
        };
        BindUiAndLogic(node, jsBind);
    }
}

//处理出牌
function DealPutCard_xiangxiang(node, msg, off){
    AddPutCard_xiangxiang(node, msg, off); // 注意各个玩法验证！

    MjClient.hasPut = false;
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_xiangxiang;
    if(uids[selfIndex] == msg.uid)
    {
        // if(SelfUid() == msg.uid){
        //     var putNode = node.getChildByName("put");
        //     if(!putNode.visible || putNode.getChildren().length == 0){
        //         putNode.stopAllActions();
        //         putNode.removeAllChildren();
        //         var putCard = getNewCard_xiangxiang(msg.card, 3 ,off);
        //         putCard.scaleX = putCard.width/putNode.width - 0.16;
        //         putCard.scaleY = putCard.width/putNode.width - 0.06;
        //         putCard.x = putCard.width/2;
        //         putCard.y = putCard.height/2;
        //         putNode.addChild(putCard);
        //         putNode.visible = true; 
        //     }
        // }
        //别人出牌或者回放时，添加动作
        if (SelfUid() != msg.uid || MjClient.rePlayVideo != -1 || (sData.players[msg.uid].trust && sData.tData.areaSelectMode.trustTime > 0)) {
            var putNode = node.getChildByName("put");
            putNode.stopAllActions();
            putNode.removeAllChildren();
            var putCard = getNewCard_xiangxiang(msg.card, 3 ,off);
            putCard.scaleX = putCard.width/putNode.width - 0.16;
            putCard.scaleY = putCard.width/putNode.width - 0.06;
            putCard.x = putCard.width/2;
            putCard.y = putCard.height/2;
            putNode.addChild(putCard);
            putNode.visible = true;
            // putNode.setScale(putNode.getUserData().scale);
            putNode.setPosition(putNode.getUserData().pos);


            var pos = putNode.getUserData().pos;
            //putNode.setScale(0);
            putNode.setScale(putNode.getUserData().scale);
            if(SelfUid() == msg.uid){
                putNode.setPosition(cc.p(pos.x ,pos.y - 100));
            }else {
                putNode.setPosition(node.getChildByName("head").getPosition());
                //putNode.y -= 150;
                //putNode.x -= 100
                if(off == 1){
                    //putNode.x += 230;
                }
            }
            var action1 = cc.scaleTo(0.2,putNode.getUserData().scale);
            var action2 = cc.moveTo(0.2,pos.x,pos.y);
            //putNode.runAction(cc.spawn(action1,action2).easing(cc.easeCubicActionOut()));
            putNode.runAction(action2.easing(cc.easeCubicActionOut()));//按产品需求:去掉出牌过程的缩放动画
        }

        var pl = getUIPlayer_xiangxiang(off);
        if(pl.canNotPutCard){
            pl.canNotPutCard = [];
        }
        if(pl.limitHuPutCard){
            pl.limitHuPutCard = [];
        }
        if(MjClient.rePlayVideo == -1 && off == 0){
            MjClient.playui.ResetHandCard(node,off);
        }

        if(MjClient.rePlayVideo != -1){
            RemoveHandCard_xiangxiang(node,msg.card,off);
            MjClient.playui.ResetHandCard(node,off);
        }
    }
}

//根据设置得到吃碰提跑偎动画时间
function getAcTime_xxghz(t){
    var acTime = t;
    if(MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ){
        var type = ziPai.getSuDuType();
        if(type == 0){
            //慢
            acTime = t;
        }else if(type == 1){
            //标准
            acTime = t * 0.8;
        }else{
            //快
            acTime = t * 0.64;
        }
        return acTime;
    }else{
        acTime = ziPai.getAcTime(t);
    }
    return acTime;
}

function DealPickCard_xiangxiang(node,msg, off){
    var newCard = getNewCard_xiangxiang(msg.card,3,off);
    var pos = cc.p(MjClient.size.width/2,MjClient.size.height*3/4);
    newCard.setPosition(pos);
    newCard.setAnchorPoint(cc.p(0.5,1));
    node.addChild(newCard);

    var move_y = MjClient.size.height*3/4 - newCard.height * newCard.scaleY;

    var delayAction = cc.DelayTime.create(0.5);
    var fadeAction = cc.FadeOut.create(1);
    var moveAction = cc.moveTo(1,MjClient.size.width/2,move_y);
    var spawnAction = cc.Spawn.create(fadeAction,moveAction);
    var callback = cc.CallFunc.create(function(){
        newCard.removeFromParent(true);
        MjClient.playui.ResetHandCard(node,off);
    });
    var seqAction = cc.Sequence.create(delayAction,spawnAction,callback);
    newCard.runAction(seqAction);
}

//吃牌
function DealChiCard_xiangxiang(node, msg, off) {
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
        if(off == 0){
            eatCards.reverse();
        }
        //var changeIndex = off == 0?0:2;
        if(off == 0){
            eatCards.reverse();
        }
        var changeIndex = 2;
        for (var i = 0; i < eatCards.length; i++) {
            var card = getNewCard_xiangxiang(eatCards[i], 2, off);
            if (i == changeIndex) {
                card.setColor(cc.color(170, 170, 170));
            }

            cardWidth = card.width * card.scaleX;
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
                if(off == 0){
                    biArr.reverse();
                }
                if(off == 0){
                    biArr.reverse();
                }
                for (var m = 0; m < biArr.length; m++) {
                    var card = getNewCard_xiangxiang(biArr[m], 2, off);
                    if (m == changeIndex) {
                        card.setColor(cc.color(170, 170, 170));
                    } 
                    setChiCardAnchorPoint_xiangxiang(node, card);
                    var off_count = (node.getName() == "right" || node.getName() == "left") ? (2 - m) : m;
                    card.zIndex = 10 - m;
                    card.x = card.width * card.scaleX * (k + 1) * ((node.getName() == "right" || node.getName() == "xing") ? -1 : 1);
                    card.y = off_count * getOffY_xiangxiang(node, card);
                    parent.addChild(card);
                }
            }
        }
        var putNode = node.getChildByName("put");
        putNode.setPosition(putNode.getUserData().pos);
        var eatNodeConvertPos = eatNode.convertToNodeSpace(putNode.getUserData().pos);
        parent.x = eatNodeConvertPos.x - selfColCount * cardWidth/2;
        var off_y = 0;
        if(off == 0){
            off_y = putNode.height * putNode.scaleY;
        }
        parent.y = eatNodeConvertPos.y;
        var parentScale = parent.scale;
        var eatNodeScale = eatNode.getScale();
        parent.setScale(putNode.getUserData().scale * 0.1/eatNodeScale);
        eatNode.addChild(parent);

        var action1 = cc.scaleTo(getAcTime_xxghz(0.2), putNode.getUserData().scale * 1.7/eatNodeScale);
        var delay = cc.delayTime(getAcTime_xxghz(0.3));
        var action4 = cc.scaleTo(getAcTime_xxghz(0.2), parentScale);

        var moveX = GetEatPosX_paohuzi(node,selfIndex,cardWidth, selfColCount);
        var moveY = 0;
        if(node.getName() == "right" || node.getName() == "left"){
            moveY = eatNode.height;
        }
        var action2 = cc.moveTo(getAcTime_xxghz(0.2),moveX,moveY);

        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
            var moveX0 = 0;
            var outNodeCount = eatNode.getChildrenCount();
            if (outNodeCount > 0) {
                if (node.getName() == "down" || node.getName() == "left") {
                    moveX0 = 7 * cardWidth;
                } else if (node.getName() == "right" || node.getName() == "xing") {
                    moveX0 = eatNode.width - 7 * cardWidth;
                }
            }
            parent.x = moveX0;
            parent.y = moveY;
            parent.setScale(putNode.getUserData().scale * 1.25/eatNodeScale);
            var action5 = cc.scaleTo(getAcTime_xxghz(0.3), parentScale);
            delay = cc.delayTime(getAcTime_xxghz(0.24));
            var action6 = cc.moveTo(getAcTime_xxghz(0.24), moveX, moveY);
            var callback = function() {
                // parent.removeFromParent(true);
                // MjClient.playui.ResetOtherCard(node, off);
            };
            parent.runAction(cc.sequence(action5,delay,action6,cc.callFunc(callback)));
        }else{
            parent.runAction(cc.sequence(action1,delay,cc.spawn(action4, action2)));
        }

        ShowEatActionAnim_xiangxiang(node, ActionType_xiangxiang.CHI, off);
    }
}

// 处理碰
function DealPengCard_xiangxiang(node, msg, off){
    cc.log("======DealPengCard_xiangxiang======= ");
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

        RemoveHandCard_xiangxiang(node,pengCard,off);
        RemoveHandCard_xiangxiang(node,pengCard,off);
        MjClient.playui.ResetHandCard(node, off);
        ShowEatActionAnim_xiangxiang(node, ActionType_xiangxiang.PENG, off);

        var putNode = node.getChildByName("put");
        putNode.setPosition(putNode.getUserData().pos);
        var eatNodeConvertPos = eatNode.convertToNodeSpace(putNode.getUserData().pos);
        parent.x = eatNodeConvertPos.x - cardWidth/2;
        var off_y = 0;
        if(off == 0){
            off_y = putNode.height * putNode.scaleY;
        }
        parent.y = eatNodeConvertPos.y;
        var parentScale = parent.scale;
        var eatNodeScale = eatNode.getScale();
        parent.setScale(putNode.getUserData().scale*0.1/eatNodeScale);
        eatNode.addChild(parent);


        var callback = function(){
            ShowPutCardIcon_xiangxiang();
        };

        var action1 = cc.scaleTo(getAcTime_xxghz(0.2), putNode.getUserData().scale * 1.7/eatNodeScale);
        var delay = cc.delayTime(getAcTime_xxghz(0.3));
        var action4 = cc.scaleTo(getAcTime_xxghz(0.2), parentScale);

        var moveX = GetEatPosX_paohuzi(node,selfIndex,cardWidth,1);
        var moveY = 0;
        if(node.getName() == "right" || node.getName() == "left"){
            moveY = eatNode.height;
        }
        var action2 = cc.moveTo(getAcTime_xxghz(0.2),moveX,moveY);
        var action3 = cc.callFunc(callback);

        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
            var moveX0 = 0;
            var outNodeCount = eatNode.getChildrenCount();
            if (outNodeCount > 0) {
                if (node.getName() == "down" || node.getName() == "left") {
                    moveX0 = 7 * cardWidth;
                } else if (node.getName() == "right" || node.getName() == "xing") {
                    moveX0 = eatNode.width - 7 * cardWidth;
                }
            }
            parent.x = moveX0;
            parent.y = moveY;
            parent.setScale(putNode.getUserData().scale * 1.25/eatNodeScale);
            var action5 = cc.scaleTo(getAcTime_xxghz(0.3), parentScale);
            delay = cc.delayTime(getAcTime_xxghz(0.24));
            var action6 = cc.moveTo(getAcTime_xxghz(0.24), moveX, moveY);
            parent.runAction(cc.sequence(action5,delay,action6,action3));
        }else{
            parent.runAction(cc.sequence(action1,delay,cc.spawn(action2, action4),action3));
        }
    }
}

// 处理胡
function DealHu_xiangxiang(node, msg, off){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var selfIndex = (tData.uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_xiangxiang;
    var pl = getUIPlayer_xiangxiang(off);
    if(tData.uids[selfIndex] != msg.uid){
        return;
    }
    if(pl){
        pl.eatFlag = 0;
        MjClient.playui.EatVisibleCheck();
        ShowEatActionAnim_xiangxiang(node,ActionType_xiangxiang.HU,off);
    }
}

// 跑牌或者提牌
function DealGangCard_xiangxiang(node, msg, off) {
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

        var eatNode = node.getChildByName("eatNode");
        var paoMovePos = 0;
        var gangCard = msg.newCard;
        if((msg.type == 2 && msg.pos && msg.pos == 3 || msg.pos == 2) || msg.type == 1){
            var outNodeChilden = eatNode.getChildren();
            for(var i = 0;i < outNodeChilden.length;i++){
                var tmpOutNode = outNodeChilden[i];
                var tmpChildren = tmpOutNode.getChildren();
                if(tmpChildren.length != 3){
                    continue;
                }
                if(tmpChildren[0].tag == gangCard &&　tmpChildren[0].tag == tmpChildren[2].tag){
                    paoMovePos = tmpOutNode.getPosition();
                    tmpOutNode.removeFromParent(true);
                    break;
                }
            }
        }

        var parent = new cc.Node();
        var cardWidth = 0;
        var pl = sData.players[tData.uids[selfIndex] + ""];
        for (var i = 0; i < 4; i++) {
            var isTurn = true;
            var isSelf = false;
            if (msg.type == 2) {
                isTurn = false;
                var card = getNewCard_xiangxiang(gangCard, 2, off, isTurn);
            } else {   
                if(MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN){
                    if(i == getShowCardIdx_xiangxiang(node, "ti")){
                        isTurn = false;
                    }
                    // if(off == 0){
                    //     isSelf = true;
                    // }
                }else if((MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI || MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI) && 
                    i == getShowCardIdx_xiangxiang(node, "ti")){
                    isTurn = false;

                    if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI && !tData.areaSelectMode.mingwei && off != 0){
                        isTurn = true;
                    }
                }else if (i == getShowCardIdx_xiangxiang(node, "ti") && ((tData.isLastDraw && off == 0) || !tData.isLastDraw)) {
                    isTurn = false;
                }
                var card = getNewCard_xiangxiang(gangCard, 2, off, isTurn, isSelf);
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
            cc.log("cardParent.children[0].tag@@ " + cardParent.children[0].tag, " i@@ ", i);
            if (cardParent.children[0].tag == gangCard) {
                orignColPosX = cardParent.x;
                break;
            }
        }

        RemoveHandCard_xiangxiang(node, gangCard, off);
        RemoveHandCard_xiangxiang(node, gangCard, off);
        RemoveHandCard_xiangxiang(node, gangCard, off);
        if (msg.isGangHand) {
            RemoveHandCard_xiangxiang(node, gangCard, off);
        }
        MjClient.playui.ResetHandCard(node, off);

        var putNode = node.getChildByName("put");
        putNode.setPosition(putNode.getUserData().pos);
        var eatNodeConvertPos = eatNode.convertToNodeSpace(putNode.getUserData().pos);
        parent.x = eatNodeConvertPos.x - cardWidth/2;
        var off_y = 0;
        if(off == 0){
            off_y = putNode.height * putNode.scaleY;
        }
        parent.y = eatNodeConvertPos.y;
        var parentScale = parent.scale;
        var eatNodeScale = eatNode.getScale();
        parent.setScale(putNode.getUserData().scale*0.1/eatNodeScale);
        eatNode.addChild(parent);

        var callback = function(){
            ShowPutCardIcon_xiangxiang();
            if(pl.mjState == TableState.waitCard){
                //HZNewCardToServer_paohuzi();
            }else if(pl.mjState == TableState.waitEat){
                MjClient.playui.EatVisibleCheck();
            }
        };
        var action1 = cc.scaleTo(getAcTime_xxghz(0.2), putNode.getUserData().scale * 1.7/eatNodeScale);
        var delay = cc.delayTime(getAcTime_xxghz(0.3));
        var action4 = cc.scaleTo(getAcTime_xxghz(0.2), parentScale);

        var moveX = GetEatPosX_paohuzi(node,selfIndex,cardWidth,1);
        if((msg.type == 2 && msg.pos && msg.pos == 3 || msg.pos == 2) || (msg.type == 1 && paoMovePos != 0)){
            moveX = paoMovePos.x;
        }
        var moveY = 0;
        if(node.getName() == "right" || node.getName() == "left"){
            moveY = eatNode.height;
        }
        var action2 = cc.moveTo(getAcTime_xxghz(0.2),moveX,moveY);
        var action3 = cc.callFunc(callback);

        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
            var moveX0 = 0;
            var outNodeCount = eatNode.getChildrenCount();
            if (outNodeCount > 0) {
                if (node.getName() == "down" || node.getName() == "left") {
                    moveX0 = 7 * cardWidth;
                } else if (node.getName() == "right" || node.getName() == "xing") {
                    moveX0 = eatNode.width - 7 * cardWidth;
                }
            }
            parent.x = moveX0;
            parent.y = moveY;
            parent.setScale(putNode.getUserData().scale * 1.25/eatNodeScale);
            var action5 = cc.scaleTo(getAcTime_xxghz(0.3), parentScale);
            delay = cc.delayTime(getAcTime_xxghz(0.24));
            var action6 = cc.moveTo(getAcTime_xxghz(0.24), moveX, moveY);
            parent.runAction(cc.sequence(action5,delay,action6,action3));
        }else{
            parent.runAction(cc.sequence(action1,delay,cc.spawn(action2, action4),action3));
        }

        if(MjClient.rePlayVideo != -1){
            MjClient.playui.EatVisibleCheck();
        }
    }
}

//偎牌
function DealWeiCard_xiangxiang(node, msg, off) {
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
        //偎牌是否过碰
        var skipPeng = pl.skipPeng;
        var skipPeng_xiangxiang = true;
        if(!skipPeng || skipPeng.indexOf(weiCard) < 0){
            skipPeng_xiangxiang = false;
        }

        for (var i = 0; i < 3; i++) {
            var isTurn = true;
            var isSelf = false;
            if(i == getShowCardIdx_xiangxiang(node, "wei")){
                isTurn = false;
            }

            if(MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN){
                isTurn = true;
                if (i == getShowCardIdx_xiangxiang(node, "wei") && (skipPeng_xiangxiang || off == 0)) {
                    isTurn = false;
                }

                // if(off == 0){
                //     isSelf = true;
                // }
            }

            if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI && !tData.areaSelectMode.mingwei && off != 0){
                if(!skipPeng_xiangxiang || !tData.areaSelectMode.isShowChouWei){
                    isTurn = true;
                }
            }

            var card = getNewCard_xiangxiang(weiCard, 2, off, isTurn, isSelf);
            cardWidth = card.width //*eatNode.scaleX;
            card.zIndex = 4 - i;
            card.x = 0;
            card.y = i * getOffY_xiangxiang(node, card);
            setChiCardAnchorPoint_xiangxiang(node, card);
            parent.addChild(card);
        }

        RemoveHandCard_xiangxiang(node, weiCard, off);
        RemoveHandCard_xiangxiang(node, weiCard, off);
        MjClient.playui.ResetHandCard(node, off);

        var putNode = node.getChildByName("put");
        putNode.setPosition(putNode.getUserData().pos);
        var eatNodeConvertPos = eatNode.convertToNodeSpace(putNode.getUserData().pos);
        parent.x = eatNodeConvertPos.x - cardWidth/2;
        var off_y = 0;
        if(off == 0){
            off_y = putNode.height * putNode.scaleY;
        }
        parent.y = eatNodeConvertPos.y;
        var parentScale = parent.scale;
        var eatNodeScale = eatNode.getScale();
        parent.setScale(putNode.getUserData().scale*0.1/eatNodeScale);
        eatNode.addChild(parent);

        var callback = function(){
            ShowPutCardIcon_xiangxiang();
            if(pl.mjState == TableState.waitEat){
                MjClient.playui.EatVisibleCheck();
            }
        };

        var moveX = GetEatPosX_paohuzi(node,selfIndex,cardWidth,1);
        var moveY = 0;
        if(node.getName() == "right" || node.getName() == "left"){
            moveY = eatNode.height;
        }


        var action1 = cc.scaleTo(getAcTime_xxghz(0.2), putNode.getUserData().scale * 1.7/eatNodeScale);
        var delay = cc.delayTime(getAcTime_xxghz(0.3));
        var action4 = cc.scaleTo(getAcTime_xxghz(0.2), parentScale);

        var action2 = cc.moveTo(getAcTime_xxghz(0.2),moveX,moveY);
        var action3 = cc.callFunc(callback);

        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
            var moveX0 = 0;
            var outNodeCount = eatNode.getChildrenCount();
            if (outNodeCount > 0) {
                if (node.getName() == "down" || node.getName() == "left") {
                    moveX0 = 7 * cardWidth;
                } else if (node.getName() == "right" || node.getName() == "xing") {
                    moveX0 = eatNode.width - 7 * cardWidth;
                }
            }
            parent.x = moveX0;
            parent.y = moveY;
            parent.setScale(putNode.getUserData().scale * 1.25/eatNodeScale);
            var action5 = cc.scaleTo(getAcTime_xxghz(0.3), parentScale);
            delay = cc.delayTime(getAcTime_xxghz(0.24));
            var action6 = cc.moveTo(getAcTime_xxghz(0.24), moveX, moveY);
            parent.runAction(cc.sequence(action5,delay,action6,action3));
        }else{
            parent.runAction(cc.sequence(action1,delay,cc.spawn(action2, action4),action3));
        }

        if(MjClient.rePlayVideo != -1){
            MjClient.playui.EatVisibleCheck();
        }
    }
}

// 获取提 偎桌面上展示的亮牌 的index
function getShowCardIdx_xiangxiang(node, chiTip) {
    var idx;
    switch(node.getName()) {
        case "down":
        case "xing":
            idx = chiTip == "wei" ? 2 : 3
            break;
        case "right":
        case "left":
            idx = 0;
            break;
    }

    return idx;
}

function setChiCardAnchorPoint_xiangxiang(node,newCard) {
    if(node.getName() == "down"){
        newCard.anchorX = 0;
        newCard.anchorY = 0;
    }else if(node.getName() == "right"){
        newCard.anchorX = 1;
        newCard.anchorY = 1;
    }else if(node.getName() == "left"){
        newCard.anchorX = 0;
        newCard.anchorY = 1;
    }else if (node.getName() == "xing"){
        newCard.anchorX = 1;
        newCard.anchorY = 0;
    }

    //怀化红拐弯吃碰牌堆不倒置
    // if(MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN){
    //     if(node.getName() == "right"){
    //         newCard.anchorX = 1;
    //         newCard.anchorY = 0;
    //     }else if(node.getName() == "left"){
    //         newCard.anchorX = 0;
    //         newCard.anchorY = 0;
    //     }
    // }
}

function getOffY_xiangxiang(node,newCard) {
    var off_y = 0;
    if(node.getName() == "down"){
        off_y = newCard.height;
    }else if(node.getName() == "right"){
        off_y = -newCard.height;
    }else if(node.getName() == "left"){
        off_y = -newCard.height;
    }else if (node.getName() == "xing"){
        off_y = newCard.height;
    }

    //怀化红拐弯吃碰牌堆不倒置
    // if(MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN){
    //     if(node.getName() == "right"){
    //         off_y = newCard.height;
    //     }else if(node.getName() == "left"){
    //         off_y = newCard.height;
    //     }
    // }

    return off_y;
}

function DealAddCard_xiangxiang(node,msg, off){
    if(MjClient.rePlayVideo == -1 && off != 0){
        return;
    }
    var cardArr = MjClient.HandCardArr;
    if(off != 0 && MjClient.rePlayVideo != -1){
        cardArr = MjClient.OtherHandArr[off];
    }
    var pl = getUIPlayer_xiangxiang(off);
    if (msg.uid == pl.info.uid) {
        cardArr.push(msg.cardList);
        if(off == 0){
            MjClient.HandCardArr = MjClient.majiang.sortByUser(cardArr);
        }else {
            MjClient.OtherHandArr[off] = MjClient.majiang.sortByUser(cardArr);
        }
    }

    MjClient.playui.ResetHandCard(node,off);
}


//清除打出的牌
function RemovePutCardOut_xiangxiang(noAction) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;

    var jsBind = MjClient.playui.jsBind;
    var uiList = [jsBind.down, jsBind.right, jsBind.left];

    if((MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI || 
        MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI ||
        MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ||
        MjClient.gameType === MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA ||
        MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN ||
        MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA) 
        &&  tData.maxPlayer == 2){
        uiList = [jsBind.down, jsBind.left];
    }else if((MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA)
        && tData.maxPlayer === 4){
        uiList = [jsBind.down, jsBind.xing, jsBind.right, jsBind.left];
    }

    for (var i = 0; i < uiList.length; i++) {
        var _node = uiList[i];
        var putNode = _node._node.getChildByName("put");
        if (!putNode) {
            continue;
        }

        putNode.removeAllChildren();
        putNode.visible = false;
    }
}

//出牌表示状态
function ShowPutCardIcon_xiangxiang() {
    var finger = MjClient.playui.jsBind.finger._node;
    var cutLine = MjClient.playui.jsBind.cutLine._node;
    if(MjClient.hasPut) {
        cutLine.visible = false;
        finger.visible = false;
    } else {
        var tData = MjClient.data.sData.tData;
        var status = true;
        if (!IsTurnToMe() || tData.tState != TableState.waitPut) {
            status = false;
        } else {
            status = true;
            var pl = getUIPlayer_xiangxiang(0);
            if (pl.isQiHu) {
                status = false;
            }
        }
        finger.stopAllActions();
        finger.visible = status;
        var action1 = cc.fadeTo(0.5, 0);
        var action2 = cc.fadeTo(0.5, 255);
        var seq = cc.sequence(action1, action2);
        finger.runAction(cc.repeatForever(seq));

        cutLine.visible = status;
        // if(MjClient.movingCard_leiyang){
        //  cutLine.visible = status;
        // }
    }
}

//清除手牌
function RemoveHandCard_xiangxiang(node,card,off){
    if(MjClient.rePlayVideo == -1 && off != 0){
        return;
    }
    var cardArr = MjClient.HandCardArr;
    if(off != 0 && MjClient.rePlayVideo != -1){
        cardArr = MjClient.OtherHandArr[off];
    }
    for(var i = 0;i < cardArr.length;i++){
        var groupList = cardArr[i];
        var isRemove = false;
        for(var k = 0;k < groupList.length;k++){
            if(groupList[k] == card){
                isRemove = true;
                groupList.splice(k,1);
                if(groupList.length == 0){
                    cardArr.splice(i,1);
                }
                break;
            }
        }
        if(isRemove){
            break;
        }
    }
}


// 初始化吃碰杠胡动作
function InitShowEatActionNode_xiangxiang(plNode){
    var play_tips = plNode.getChildByName("play_tips");
    for(var i = 0; i < play_tips.children.length; i++){
        play_tips.children[i].visible = false;
    }
}

// 重置吃碰杠胡动作
function resetEatActionAnim_xiangxiang()
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var jsBind = MjClient.playui.jsBind;
    var ui = [jsBind.down,jsBind.right,jsBind.left];
    var count = MjClient.MaxPlayerNum_xiangxiang;

    if((MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI || 
        MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI ||
        MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ||
        MjClient.gameType === MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA ||
        MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN ||
        MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA)
        && count === 2){
        ui = [jsBind.down,jsBind.left];
    }else if((MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA)
        && count === 4){
        ui = [jsBind.down, jsBind.xing, jsBind.right, jsBind.left];
    }

    for(var i = 0; i < count; i++)
    {
        InitShowEatActionNode_xiangxiang(ui[i]._node);
    }
}

//播放头像移动
function tableStartHeadMoveAction_xiangxiang(node){
    // var down = node.getChildByName("down").getChildByName("head");
    // var left = node.getChildByName("left").getChildByName("head");
    // var right = node.getChildByName("right").getChildByName("head");
    // setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 2.8], false, false);
    // setWgtLayout(left, [0.13, 0.13], [0, 0.5], [0.6, 1.8], false, false);
    // setWgtLayout(right, [0.13, 0.13], [1, 0.5], [-0.6, 2.4], false, false);

    // var downPoint = cc.p(down.x, down.y);
    // var rightPoint = cc.p(right.x, right.y);
    // var leftPoint = cc.p(left.x, left.y);

    // setWgtLayout(down, [0.13, 0.13], [0.5, 0.5], [0, -2], false, false);
    // setWgtLayout(left, [0.13, 0.13], [0.5, 0.5], [-3, 0.1], false, false);
    // setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [3, 0.1], false, false);
    //    down.runAction(cc.moveTo(0.3, downPoint).easing(cc.easeCubicActionOut()));
    //    left.runAction(cc.moveTo(0.3, leftPoint).easing(cc.easeCubicActionOut()));
    //    right.runAction(cc.moveTo(0.3, rightPoint).easing(cc.easeCubicActionOut()));

    sendGPS();
}

//调整头像
function reConectHeadLayout_xiangxiang(node){
    var tData = MjClient.data.sData.tData;
    var down = node.getChildByName("down").getChildByName("head");
    var left = node.getChildByName("left").getChildByName("head");
    var right = node.getChildByName("right").getChildByName("head");
    var xing = node.getChildByName("xing").getChildByName("head");

    resetEatActionAnim_xiangxiang();
    
    if(isIpadSize()){
        setWgtLayout(down, [0.12, 0.12], [0.08, 0.15], [-0.3, -0.6], false, false);
        setWgtLayout(left, [0.12, 0.12], [0.08, 0.87], [-0.3, 0.36], false, false);
        setWgtLayout(right,[0.12, 0.12], [0.92, 0.88], [0.3, 0.31], false, false);
        setWgtLayout(xing,[0.12, 0.12], [0.92, 0.15], [0.3, -0.6], false, false);
    }else{
        setWgtLayout(down, [0.18, 0.18], [0.04, 0.05], [0, 0], false, false);
        setWgtLayout(left, [0.18, 0.18], [0.04, 0.90], [0, 0], false, false);
        setWgtLayout(right,[0.18, 0.18], [0.96, 0.89], [0, 0], false, false);
        setWgtLayout(xing,[0.18, 0.18], [0.96, 0.05], [0, 0], false, false);
    }
    
    // if(tData.tState == TableState.waitJoin || tData.tState == TableState.roundFinish)
    // {
    //  setWgtLayout(down, [0.13, 0.13], [0.5, 0.5], [0, -2], false, false);
    //  setWgtLayout(left, [0.13, 0.13], [0.5, 0.5], [-4.8, 0.1], false, false);
    //  setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [4.8, 0.1], false, false);
    // }
    // else
    // {
    //  setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 2.8], false, false);
    //  setWgtLayout(left, [0.13, 0.13], [0, 0.5], [0.6, 1.8], false, false);
    //  setWgtLayout(right, [0.13, 0.13], [1, 0.5], [-0.6, 2.4], false, false);
    // }
}

//根据偏移获得玩家node
function getNode_xiangxiang(off){
    var _node = null;

    switch (off){
        case 0:
            _node = MjClient.playui._downNode;
            break;
        case 1:
            if((MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI  || 
                MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI    ||
                MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI  ||
                MjClient.gameType === MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA     ||
                MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN ||
                MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA) 
                && MjClient.MaxPlayerNum_xiangxiang === 2){
                _node = MjClient.playui._topNode;
                break;
            }
            _node = MjClient.playui._rightNode;
            break;
        case 2:
            _node = MjClient.playui._topNode;
            break;
        default:
            break;
    }

    if((MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA)
        && MjClient.MaxPlayerNum_xiangxiang === 4){
        switch (off){
            case 0:
                _node = MjClient.playui._downNode;
                break;
            case 1:
                _node = MjClient.playui._xingNode;
                break;
            case 2:
                _node = MjClient.playui._rightNode;
                break;
            case 3:
                _node = MjClient.playui._topNode;
                break;
            default:
                break;
        }
    }
    return _node;
}

/**
 * 通过相对于 我 的偏移量 获取 pl对象 (偏移量：uids的差)  (我的位置down:0)
 * @param  {number} off 相对于我的偏移量
 * @return {object} 玩家数据
 */
function getUIPlayer_xiangxiang(off){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = uids.indexOf(SelfUid());
    selfIndex = (selfIndex + off) % tData.maxPlayer;
    if(selfIndex < uids.length){
        return sData.players[uids[selfIndex]];
    }

    return null;
}

// 获取ui头像，通过偏移值
function getUIHeadByOff_xiangxiang(off){
    var pl = getUIPlayer_xiangxiang(off);
    if(!pl)
    {
        return {};
    }

    return {
        uid: pl.info.uid,
        url: pl.info.headimgurl
    };
}

/**
 * 下载录音, 调用 播放函数
 * */
function downAndPlayVoice_xiangxiang(uid, filePath){
    var index = getUiOffByUid_xiangxiang(uid);
    //console.log("index is downAndPlayVoice" + index);
    MjClient.native.DownLoadFile(jsb.fileUtils.getWritablePath(), index + ".mp3", MjClient.remoteCfg.voiceUrl + filePath, "playVoice");
}

function getUiOffByUid_xiangxiang(uid){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = uids.indexOf(SelfUid());
    var targetIndex = uids.indexOf(uid);
    return (targetIndex - selfIndex + MjClient.MaxPlayerNum_xiangxiang) % MjClient.MaxPlayerNum_xiangxiang;
}

//设置微信头像
function setWxHead_xiangxiang(node, d, off){
    if(d.uid == getUIHeadByOff_xiangxiang(off).uid){
        var nobody = node.getChildByName("nobody");
        var wxHead = nobody.getChildByName("WxHead");
        if(wxHead)
            wxHead.removeFromParent();

        var sp = new cc.Sprite(d.img);
        sp.setName("WxHead");
        nobody.addChild(sp);
        setWgtLayout(sp, [0.87, 0.87], [0.5, 0.5], [0, 0], false, true);
        COMMON_UI.addNobleHeadFrame(nobody,getUIPlayer_xiangxiang(off))
    }
}

//显示玩家庄的ui
function showUserZhuangLogo_xiangxiang(node, off){
    var tData = MjClient.data.sData.tData;
    var pl = getUIPlayer_xiangxiang(off);
    node.zIndex = 100;
    if(tData && pl){
        if(tData.uids[tData.zhuang] == pl.info.uid){
            node.visible = true;
            var linkZhuang = node.getChildByName("linkZhuang");
            var path = "playing/gameTable/shuzi/shuzi_" + pl.linkZhuang + ".png";
            linkZhuang.loadTexture(path);
            // var isVisible = (tData.gameType == MjClient.GAME_TYPE.SHEN_YANG);
            // linkZhuang.setVisible(isVisible);
        }else{
            node.visible = false;
        }
    }
}

//显示房主 
function showFangzhuTagIcon_xiangxiang(node,off)
{
    var pl = getUIPlayer_xiangxiang(off);
    if(!pl) //位置上没人则删掉房主标签
    {
        if(node.getChildByName("fangTag"))
        {
            node.removeChildByName("fangTag");
        }
        if(node.getChildByName("playerDirection"))
        {
            node.removeChildByName("playerDirection");
        }
        return;
    }

    var tData = MjClient.data.sData.tData;
    if (tData.owner == pl.info.uid)
    {
        if(!node.getChildByName("fangTag"))
        {
            var sp = new cc.Sprite("playing/ziPaiBanner/fangzhu.png");
            if(node.getParent().getName() == "left" || node.getParent().getName() == "down"){
                sp.setPosition(15,node.getContentSize().height);
                sp.setAnchorPoint(0,1);
            }else{
                sp.setPosition(node.getContentSize().width - 15,node.getContentSize().height);
                sp.setAnchorPoint(1,1);
            }
            sp.setName("fangTag");
            sp.zIndex = 100;
            node.addChild(sp);
        }
    }
    else
    {
        if(node.getChildByName("fangTag"))
        {
            node.removeChildByName("fangTag");
        }
    }
}

// 清理ui
function clearCardUI_xiangxiang(node,off){
    mylog("clearCardUI_xiangxiang");
    var children = node.children;
    for(var i = 0; i < children.length; i++)
    {
        var ni = children[i];
        if(ni.getName() != "head"
            && ni.getName() != "handNode"
            && ni.getName() != "eatNode"
            && ni.getName() != "outNode"
            && ni.getName() != "out0"
            && ni.getName() != "handCard"
            && ni.getName() != "replayNode"
            && ni.getName() != "put"
            && ni.getName() != "ready"
            && ni.getName() != "play_tips"
            && ni.getName() != "tai_layout"
            && ni.getName() != "tingCardsNode"
            && ni.getName() != "tingCardNumNode"
            && ni.getName() != "fangTag"
            && ni.getName() != "weiSurePanel"
            && ni.getName() != "xingPai"
            && ni.getName() != "eatNode_hu"
        )
        {
            ni.removeFromParent(true);
        }
        else if(ni.getName() == "play_tips")
        {
            InitShowEatActionNode_xiangxiang(ni.getParent());
        }
    }
}

function EatFlag_xiangxiang(){
    var eat = MjClient.playui.jsBind.eat;
    var eatFlag = 0;

    // if(MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN){
    //     if(!eat.hu._node.getChildByName("eat_shadow")){
    //         eatFlag = eatFlag + 32;
    //     }
    //     if(!eat.chi._node.getChildByName("eat_shadow")){
    //         eatFlag = eatFlag + 1;
    //     }
    //     if(!eat.peng._node.getChildByName("eat_shadow")){
    //         eatFlag = eatFlag + 2;
    //     }

    // }else{
        if(eat.hu._node.visible)
        {
            eatFlag = eatFlag + 32;
        }

        if(eat.chi &&　eat.chi._node.visible)
        {
            eatFlag = eatFlag + 1;
        }

        if(eat.peng._node.visible)
        {
            eatFlag = eatFlag + 2;
        }
    // }
    
    mylog("eatFlag" + eatFlag);
    return eatFlag;
}

function huXiScore_xiangxiang(type,card)
{
    var cardType = Math.ceil(card/10);
    var score = 0;
    switch(type)
    {
        case "tiPai":
            if(cardType == 1){
                score += 9;
            }else if(cardType == 3){
                score += 12;
            }
            break;
        case "weiPai":
            if(cardType == 1){
                score += 3;
            }else if(cardType == 3){
                score += 6;
            }
            break;
        case "paoPai":
            if(cardType == 1){
                score += 6;
            }else if(cardType == 3){
                score += 9;
            }
            break;
        case "peng":
            if(cardType == 1){
                score += 1;
            }else if(cardType == 3){
                score += 3;
            }
            break;
        case "kan":
            if(cardType == 1){
                score += 3;
            }else if(cardType == 3){
                score += 6;
            }
            break;
        case "chi":
            if(cardType == 1){
                score += 3;
            }else if(cardType == 3){
                score += 6;
            }
            break;
    }
    return score;
}

//设置转盘显示状态
function IsArrowVisible_xiangxiang(){
    var pl = getUIPlayer_xiangxiang(0);
    if (!pl)
    {
        return;
    }

    if(
        TableState.waitPut == pl.mjState ||
        TableState.waitEat == pl.mjState ||
        TableState.waitCard == pl.mjState ||
        TableState.roundFinish == pl.mjState ||
        TableState.waitJiazhu == pl.mjState
    )
    {
        return true;
    }else{
        return false;
    }
}

// 显示吃碰杠胡动作
function ShowEatActionAnim_xiangxiang(node, actType, off){
    var delayTime = 1;
    switch(actType)
    {
        case ActionType_xiangxiang.FANXING:
            delayTime = 1.6;
            break;
        default:
            break;
    }
    var eatActionNode = node.getChildByName("play_tips");
    if(!eatActionNode){
        return;
    }
    var eatActionChild;
    var callback = function (){
        eatActionChild.visible = false;
    };
    var showEatActionAnim = function(node, name, isHu){
        node.visible = true;
        //邵阳放炮罚和红拐弯也播放吃碰偎跑提的骨骼动画
        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
            var delayActionTime = 2;
            var path1 = "spine/ziPaiEatAnim/" + name + "/skeleton.json";
            var path2 = "spine/ziPaiEatAnim/" + name + "/skeleton.atlas";
            var projNode = createSpine(path1, path2);
            projNode.setAnimation(0, 'animation', false);
            projNode.setPosition(70,20);
            projNode.setScale(0.8);
            projNode.setTimeScale(0.75);

            node.removeAllChildren();
            node.loadTexture("playing/gameTable/empty.png");
            node.runAction(cc.sequence(cc.delayTime(delayActionTime), cc.callFunc(callback)));
            node.addChild(projNode,999999);
        }else if(!isHu){
            node.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
        }
    };
    eatActionNode.visible = true;
    switch(actType)
    {
        case ActionType_xiangxiang.CHI:

            eatActionChild = eatActionNode.getChildByName("chi");
            showEatActionAnim(eatActionChild,"chi");
            break;

        case ActionType_xiangxiang.PENG:

            eatActionChild = eatActionNode.getChildByName("peng");
            showEatActionAnim(eatActionChild,"peng");
            break;

        case ActionType_xiangxiang.WEI:
            eatActionChild = eatActionNode.getChildByName("wei");
            //耒阳不叫啸叫偎
            eatActionChild.loadTexture("playing/paohuzi/t_wei.png");
            showEatActionAnim(eatActionChild,"wei");
            break;

        case ActionType_xiangxiang.HU:

            eatActionChild = eatActionNode.getChildByName("hu");
            showEatActionAnim(eatActionChild,"hu", true);
            break;
        case ActionType_xiangxiang.PAO:
            eatActionChild = eatActionNode.getChildByName("pao");
            showEatActionAnim(eatActionChild,"pao");
            break;
        case ActionType_xiangxiang.TI:

            eatActionChild = eatActionNode.getChildByName("ti");
            //耒阳不叫倾叫提
            eatActionChild.loadTexture("playing/paohuzi/t_ti.png");
            showEatActionAnim(eatActionChild,"ti");
            break;
        case ActionType_xiangxiang.WANGDIAO:
            eatActionChild = eatActionNode.getChildByName("wangDiao");
            eatActionChild.visible = true;
            eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
            break;
        case ActionType_xiangxiang.WANGCHUANG:
            eatActionChild = eatActionNode.getChildByName("wangChuang");
            eatActionChild.visible = true;
            eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
            break;
        case ActionType_xiangxiang.XIAHUO:
            eatActionChild = eatActionNode.getChildByName("xiahuo");
            eatActionChild.visible = true;
            eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
            break;
        case ActionType_xiangxiang.FANXING:
            eatActionChild = eatActionNode.getChildByName("fanxing");
            eatActionChild.visible = true;
            eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
            break;
    }
}

//显示玩家信息
function showPlayerInfo_xiangxiang(off, node){
    //var tData = MjClient.data.sData.tData;
    var pl = getUIPlayer_xiangxiang(off);
    if(pl){
        if (pl.info.uid == SelfUid()){
            MjClient.showPlayerInfo(pl.info, false, true);
        }else{
            MjClient.showPlayerInfoPlaying(pl.info);
        }
    }
}

//展示吃的牌
var initSize = null;				//吃牌背景的初始大小

function resetChiParam_xiangxiang(){

}

function setChiVisible_xiangxiang(){
    var eat = MjClient.playui.jsBind.eat;
    eat.chi._node.visible = false;
    eat.peng._node.visible = false;
    eat.hu._node.visible = false;
    eat.guo._node.visible = false;
    eat.cancel._node.visible = false;
    eat.chiSelect._node.visible = false;
    eat.biSelect._node.visible = false;
    eat.biSelect1._node.visible = false;

    eat.chi._node.setTouchEnabled(false);
    eat.peng._node.setTouchEnabled(false);
    eat.hu._node.setTouchEnabled(false);
    eat.guo._node.setTouchEnabled(false);
    eat.cancel._node.setTouchEnabled(false);
    eat.chiSelect._node.setTouchEnabled(false);
    eat.biSelect._node.setTouchEnabled(false);
    eat.biSelect1._node.setTouchEnabled(false);
}

function GetReadyVisible_xiangxiang(node, off) {
    if (off < 0) {
        node.visible = false;
        return false;
    }


    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if (Object.keys(sData.players).length < tData.maxPlayer) {
        node.visible = false;
        return false;
    }

    var pl = getUIPlayer_xiangxiang(off);
    if (pl && pl.mjState == TableState.isReady && tData.tState != TableState.waitJoin) {
        node.visible = true;
    } else {
        node.visible = false;
    }

    return node.visible;
}

//设置玩家掉线头像（离线计时版）
function setUserOffline_xiangxiang(node, off){
    var pl = getUIPlayer_xiangxiang(off);
    if(!pl)
    {
        return;
    }

    // 离线自己不可见
    if (off == 0) {
        node.getChildByName("head").getChildByName("offlineBg").visible = false;
        node.getChildByName("head").getChildByName("offline").visible = false;
        return;
    }
    
    node.getChildByName("head").getChildByName("offlineBg").visible = !pl.onLine;
    node.getChildByName("head").getChildByName("offline").visible = !pl.onLine;
  
    if (pl.onLine == false)
    { 
        var _offLineNode = node.getChildByName("head").getChildByName("offlineBg");

        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.APP_TYPE.QXSYDTZ === MjClient.getAppType()){
            _offLineNode.setScale(0.97);
            node.getChildByName("head").getChildByName("offline").setScale(0.97);
        }

        _offLineNode.unscheduleAllCallbacks();
        _offLineNode.schedule(function(){
            var _timeNode = _offLineNode.getChildByName("offLineTime");
            if (!_timeNode) { 

                _timeNode = new ccui.Text();
                _timeNode.setName("offLineTime");
                _timeNode.setFontSize(26);
                _offLineNode.addChild(_timeNode)
            }
            else
            {
                _timeNode.visible = true;
            }

            _timeNode.setPosition(cc.p(_offLineNode.getContentSize().width/2,_offLineNode.getContentSize().height*0.75)); 
            if (pl.offLineTime)
            {
                var _currentTime = new Date().getTime();
                var _showTime = _currentTime - pl.offLineTime;
                //cc.log("我是" + pl.info.uid + "  我的离线时间是：" + JSON.stringify(pl.offLineTime));
                _timeNode.setString(MjClient.dateFormat(new Date(_showTime),"mm:ss"));
            }
            else
            {
                _timeNode.setString("");
            }
        });
    }

}

//大结算和小结算   设置玩家掉线头像
function setRoundEndUserOffline_xiangxiang(node, pl){
    //var pl = getPlayerByIndex(off);
    if(!pl)
    {
        return;
    }
    if (pl.onLine == false)
    {
        var _offline = new cc.Sprite("playing/paohuzi/offLine.png");
        var _offlineBg = new cc.Sprite("playing/paohuzi/offLineBg.png");
        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ){
            _offline = new cc.Sprite("playing/paohuzi/offLine_hyaline.png");
        }
        _offline.setName("offLine");
        _offlineBg.setName("offLineBg");
        _offlineBg.addChild(_offline);
        _offlineBg.getChildByName("offLine").setScale(_offlineBg.getContentSize().width / _offline.getContentSize().width * 0.9);
        _offlineBg.getChildByName("offLine").x = _offlineBg.getContentSize().width * 0.5;
        _offlineBg.getChildByName("offLine").y = _offlineBg.getContentSize().height * 0.21;
        node.addChild(_offlineBg);
        node.getChildByName("offLineBg").setScale(node.getContentSize().width / _offlineBg.getContentSize().width * 0.88);
        node.getChildByName("offLineBg").x = node.getContentSize().width * 0.5;
        node.getChildByName("offLineBg").y = node.getContentSize().height * 0.48;
        node.getChildByName("offLineBg").visible = !pl.onLine;
    }

    if (pl.onLine == false)
    { 
        var _offLineNode = node.getChildByName("offLineBg");
        _offLineNode.unscheduleAllCallbacks();
        var _currentTime = new Date().getTime();
        _offLineNode.schedule(function(){
            var _timeNode = _offLineNode.getChildByName("offLineTime");
            if (!_timeNode) {

                _timeNode = new ccui.Text();
                _timeNode.setName("offLineTime");
                _timeNode.setFontSize(26);
                _offLineNode.addChild(_timeNode)
            }
            else
            {
                _timeNode.visible = true;
            }

            _timeNode.setPosition(cc.p(_offLineNode.getContentSize().width/2,_offLineNode.getContentSize().height*0.6));

            if (pl.offLineTime)
            {
                var _showTime = _currentTime - pl.offLineTime;
                _timeNode.setString(MjClient.dateFormat(new Date(_showTime),"mm:ss"));
            }
            else
            {
                _timeNode.setString("");
            }
        });
    }

}

//显示玩家文字
function showUserChat_xiangxiang(node, off, msg){
    var tData = MjClient.data.sData.tData;
    if(msg.type == 4 && off == 0 && tData.roundNum==tData.roundAll ){ //位置截取
        var geogData = [];
        for (var i = 0; i < tData.uids.length; i++) {
            var pl = MjClient.data.sData.players[tData.uids[i]];
            if (pl && pl.locationMsg) {
                geogData.push(pl.locationMsg);
            }
        }

        if (geogData.length == tData.maxPlayer)
        {
            var displayCount = 0;
            for(var i=0; i<geogData.length; i++)
            {
                for(var j=i+1; j<geogData.length; j++)
                {
                    var plyoneV = new Array();
                    var plytwoV = new Array();
                    plyoneV = geogData[i].split(";");
                    plytwoV = geogData[j].split(";");
                    var plone = getUIPlayerByUID(plyoneV[3]);
                    var _oneLatitude = plone.info.location.latitude;
                    var _oneLongitude = plone.info.location.longitude;
                    if(!_oneLatitude)  _oneLatitude = plyoneV[0];
                    if(!_oneLongitude)  _oneLongitude =  plyoneV[1];

                    var pltwo = getUIPlayerByUID(plytwoV[3]);
                    var _twoLatitude = pltwo.info.location.latitude;
                    var _twoLongitude = pltwo.info.location.longitude;
                    if(!_twoLatitude) _twoLatitude = plytwoV[0];
                    if(!_twoLongitude) _twoLongitude =  plytwoV[1];

                    var distance = MjClient.native.CalculateLineDistance(_oneLatitude, _oneLongitude, _twoLatitude, _twoLongitude);
                    if( distance < 50 && distance >=0 )
                    {
                        displayCount++;
                        break;
                    }
                }

                if (displayCount>0)
                {
                    break;
                }
            }

            //add by sking 当有人距离小于500米 时候提示
            // if(displayCount >= 1 && !tData.matchId)
            // {
            //     if (tData.maxPlayer == 3){
            //         if(!MjClient.showDistance3PlayerTips) MjClient.Scene.addChild(new showDistance3PlayerLayer());
            //     }
            //     else{
            //         if(!MjClient.showDistanceTips) MjClient.Scene.addChild(new showDistanceLayer());
            //     }
            // }
        }

        return;
    }

    var pl = getUIPlayer_xiangxiang(off);
    //var uid = msg.uid;
    var type = msg.type;
    var message = msg.msg;
    var num = msg.num;

    if(pl && msg.uid == pl.info.uid)
    {
        if(type == 0)
        {
            node.getParent().visible = true;
            node.setString(message);
            var callback = function()
            {
                node.getParent().visible = false;
            };

            node.getParent().width = node.stringLength * node.fontSize + 72;
            node.runAction(cc.sequence(cc.delayTime(2.5), cc.callFunc(callback)));
        }
        else if(type == 1)
        {
            node.getParent().visible = true;
            node.setString(message.text);
            var callback = function()
            {
                node.getParent().visible = false;
            };

            var musicnum = msg.num + 1;

            //var one = node.getCustomSize().width / 20.0;
            node.getParent().width = node.stringLength * node.fontSize + 72;
            var voiceType = /*message.voiceType == 0 ? "normal" :*/ MjClient.gameType;
            cc.log("MjClient.gameType:" + MjClient.gameType);
            playEffect(GameSound4Chat[voiceType][getRandomRange(0,GameSound4Chat[voiceType].length-1)] + musicnum, false, pl.info.sex, message.voiceType + 1);
            node.runAction(cc.sequence(cc.delayTime(2.5), cc.callFunc(callback)));
        }
        else if(type == 2)
        {
            var em_node = node.getParent().getParent().getChildByName("emoji");
            PlayEmojiAct(em_node, msg.num);
        }
        else if(type == 3)//播放录音
        {
            playRecord(node, num, message);
        }
        else if (type == 5) // 转运道具
        {
            var em_node = node.getParent().getParent().getChildByName("emoji");
            playZhuanYunPropAct(em_node, msg.num);
        }
    }
}

/**
 * 当前玩家是不是自己
 * @param  {number} off 和‘我’在uids的下标的差
 * @return {bool} true:轮到我操作  false:不是我在操作
 */
function curPlayerIsMe_xiangxiang(off){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if(tData.tState == TableState.waitReady){
        return false;
    }
    var selfIndex = tData.uids.indexOf(SelfUid());
    selfIndex = (selfIndex + off)%MjClient.MaxPlayerNum_xiangxiang;
    return selfIndex == tData.curPlayer;
}

//重新开始后，重置MjClient.HandCardArr
function resetHandAfterBegin_xiangxiang(){
    var sData = MjClient.data.sData;
    var pl = sData.players[SelfUid() + ""];
    if(pl.mjState == TableState.isReady){
        MjClient.HandCardArr = [];
    }
}


/*
 设置弃胡状态
 */
function setQiHuState_xiangxiang()
{
    var pl = getUIPlayer_xiangxiang(0);
    if (pl.isQiHu) {
        var _skipHuIconNode = MjClient.playui._downNode.getChildByName("head").getChildByName("skipHuIconTag");
        _skipHuIconNode.visible = true;
    }
}


function changeMJBg_xiangxiang(node, type)
{
    if (node.toString() == "[object ImageView]") {
        var oldFile = node.getRenderFile().file;
        var newFile = getNewMJBgFile_xiangxiang(oldFile, type);

        if (newFile != oldFile) {
            node.loadTexture(newFile);
        }
    }

    var childArray = node.getChildren();
    for(var index in childArray)
    {
        var child = childArray[index];
        changeMJBg_xiangxiang(child, type);
    }
}

function getNewMJBgFile_xiangxiang(oldFile, type)
{
    if (oldFile.indexOf("playing/ziPai/") == -1)
        return oldFile;

    if (type == undefined)
        type = getCurrentMJBgType();

    return ziPai.getNewFilePath(oldFile, type);

    var newFile = "";
    if (type == 0) {
        if (oldFile.indexOf("playing/paohuzi/MJBg1/") != -1){
            newFile = oldFile.replace("/MJBg1", "");
            MjClient.cardPath_xiangxiang = "playing/paohuzi/";
        }else if (oldFile.indexOf("playing/paohuzi/MJBg2/") != -1){
            newFile = oldFile.replace("/MJBg2", "");
            MjClient.cardPath_xiangxiang = "playing/paohuzi/";
        }
    }
    else if (type == 1) {
        if (oldFile.indexOf("/MJBg1") != -1)
            ;
        else if (oldFile.indexOf("/MJBg2") != -1){
            newFile = oldFile.replace("playing/paohuzi/MJBg2/", "playing/paohuzi/MJBg1/");
            MjClient.cardPath_xiangxiang = "playing/paohuzi/MJBg1/";
        }
        else if (oldFile.indexOf("playing/paohuzi/") != -1) {
            newFile = oldFile.replace("playing/paohuzi/", "playing/paohuzi/MJBg1/");
            MjClient.cardPath_xiangxiang = "playing/paohuzi/MJBg1/";
        }
    }
    else if (type == 2 && MjClient.getAppType() != MjClient.APP_TYPE.QXLYQP) {
        if (oldFile.indexOf("/MJBg2") != -1)
            ;
        else if (oldFile.indexOf("playing/paohuzi/MJBg1/") != -1){
            newFile = oldFile.replace("/MJBg1", "/MJBg2");
            MjClient.cardPath_xiangxiang = "playing/paohuzi/MJBg2/";
        }
        else if (oldFile.indexOf("playing/paohuzi/") != -1) {
            newFile = oldFile.replace("playing/paohuzi/", "playing/paohuzi/MJBg2/");
            MjClient.cardPath_xiangxiang = "playing/paohuzi/MJBg2/";
        }
    }

    if (newFile != "" && !jsb.fileUtils.isFileExist(newFile)) {
        newFile = "";
    }

    return newFile != "" ? newFile : oldFile;
}

function getOtherWeiCards_xiangxiang(card) {
    var sData = MjClient.data.sData;
    for(var uid in sData.players){
        if(Number(uid) != SelfUid()){
            var pl = sData.players[uid + ""];
            var mjSortArr = [];
            if(pl.mjsort){
                mjSortArr = pl.mjsort;
            }
            for(var k = 0;k < mjSortArr.length;k++){
                var mjsort = mjSortArr[k];
                var pos = mjsort.pos;
                var name = mjsort.name;
                //偎
                if(name == "mjwei"){
                    var cardNum = pl.mjwei[pos];
                    if(((MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI) && cardNum == card && MjClient.majiang.getCardShowType(pl.info.uid, cardNum)!=0)||(MjClient.gameType != MjClient.GAME_TYPE.HY_LIU_HU_QIANG && cardNum == card)){
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

//倒计时音效的Handle
var playTimeUpEff = null;
//显示计时器(需要移植)
function arrowbkNumberUpdate_xxghz(node, endFunc)
{
    node.ignoreContentAdaptWithSize(true);
    node.setString("10");
    var number = function()
    {
        if(node.getString() == 0)
        {
            GLog("==================================================arrowbkNumberUpdate 11111 ======================");
            if (endFunc) {
                // endFunc();
            }
            node.stopAllActions();
        }
        else
        {
            var number = node.getString() - 1;
            if(number > 9)
            {
                node.setString(number);
            }
            else
            {
                node.setString(number);
                var sData = MjClient.data.sData;
                var tData = sData.tData;
                var uids = tData.uids;

                if(uids[tData.curPlayer] == SelfUid())
                {
                    if(number == 0)
                    {
                        //记录音效的handle
                        playTimeUpEff = playEffect("loop_alarm", true);
                        MjClient.native.NativeVibrato();
                    }
                }
                else{
                    if(number == 0 && !MjClient.endoneui)
                        MjClient.playui._operateWait.visible = true;
                }
            }
        }
    };

    node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1.0), cc.callFunc(number, node))));
}

function setHuCardMark_xxghz(card,clone){
    var huMark = ccui.ImageView("playing/paohuzi/hu.png");
    if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ){
        var huMark = ccui.ImageView("gameOver/newOver/hu_tips.png");
    }
    huMark.setPosition(cc.p(card.x, card.y + card.height/2));
    clone.addChild(huMark);
}

//怀化红拐弯发牌时要特殊处理
MjClient.isCommon = false;
function DealNewCard_huaihua(node, msg, off) {
    //没有发牌过来的时候直接忽略
    if (!msg.newCard) {
        RemovePutCardOut_xiangxiang();
        MjClient.playui.EatVisibleCheck();
        return;
    }
    AddPutCard_xiangxiang(node, msg, off); // 注意各个玩法验证！
    //存在发牌
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_xiangxiang;

    if (uids[selfIndex] == msg.uid) {
        //清理之前玩家打的牌
        var lastPlayer = tData.lastPlayer;
        if (lastPlayer != -1) {
            //var lastOff = (off + MjClient.MaxPlayerNum_xiangxiang - selfIndex) % MjClient.MaxPlayerNum_xiangxiang;
            // RemovePutCardOut_xiangxiang();
            fall_xiangxiang();
        }

        //发牌有偎时，只展示牌背
        var flag = 0;
        for(var key in msg.eatFlags){
            if(msg.eatFlags[key] & 8){
                flag = 1;
            }
        }
        if(flag == 1){
            var putCard = getNewCard_xiangxiang(msg.newCard, 3, off, true);
        }else{
            var putCard = getNewCard_xiangxiang(msg.newCard, 3, off);
        }

        var pl = sData.players[uids[selfIndex]];
        var putNode = node.getChildByName("put");
        putNode.removeAllChildren();
        putCard.scaleX = putCard.width / putNode.width - 0.16;
        putCard.scaleY = putCard.width / putNode.width - 0.06;
        putCard.x = putCard.width / 2;
        putCard.y = putCard.height / 2;
        putNode.visible = true;
        putNode.addChild(putCard);

        //起手庄家发第一张牌时，判断有没有玩家要胡
        var isHu = false;
        for(var i = 0 ; i < 3 ; i++){
            if(getUIPlayer_xiangxiang(i)){
                var player = getUIPlayer_xiangxiang(i);
                if(player.eatFlag & 32){
                    isHu = true;
                }
            }
        }

        //添加动作
        var acTime = 0.25;
        //起手第一张牌特殊动画
        if (tData.isLastDraw && !isHu) {
            acTime = 0.1;
        }
        //putNode.setScale(0);
        putNode.setScale(putNode.getUserData().scale);
        putNode.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2 + 160));
        var action1 = cc.scaleTo(acTime, putNode.getUserData().scale);
        var action2 = cc.moveTo(acTime, putNode.getUserData().pos);
        //putNode.runAction(cc.spawn(action1, action2).easing(cc.easeCubicActionOut()));
        putNode.runAction(action2.easing(cc.easeCubicActionOut()));//按产品需求:去掉出牌过程的缩放动画

        if (tData.isLastDraw && !isHu) {
            MjClient.hasPut = true;
            var movePos = cc.p(cc.winSize.width / 2, putNode.getUserData().pos.y - 160);
            if (off != 0) {
                movePos = node.getChildByName("head").getPosition();
                movePos = cc.p(movePos.x, movePos.y - 50);
            }
            var delay = cc.delayTime(0.5);
            var action1 = cc.moveTo(0.8, movePos);
            var action2 = cc.fadeTo(0.8, 0.1);
            var action3 = cc.fadeIn(0.1);
            var spawn = cc.spawn(action1, action2);
            var seq = cc.sequence(delay, spawn, cc.callFunc(function() {
                MjClient.hasPut = false;
                RemovePutCardOut_xiangxiang();
            }),action3);
            putNode.runAction(seq);
        }

        if (!msg.isCommon) {
            if (MjClient.rePlayVideo == -1) {
                MjClient.isCommon = true;
                //王霸牌需要收回
                var callback = function() {
                    RemovePutCardOut_xiangxiang();
                    //如果是自己则需要重新整理手牌
                    if (msg.uid == SelfUid()) {
                        var cardArr = MjClient.HandCardArr;
                        var isAdd = false;
                        for (var i = 0; i < cardArr.length; i++) {
                            var tmpArr = cardArr[i];
                            if (tmpArr.length <= 2) {
                                isAdd = true;
                                MjClient.HandCardArr[i].push(msg.newCard);
                                break;
                            }
                        }
                        if (!isAdd) {
                            MjClient.HandCardArr.push([msg.newCard]);
                        }
                        //MjClient.playui.CardLayoutRestore(node,off);
                        MjClient.playui.ResetHandCard(node, off); //mod by maoyu
                    }
                    MjClient.isCommon = false;
                    ShowPutCardIcon_xiangxiang();
                    MjClient.playui.EatVisibleCheck();
                };
                var delay = cc.delayTime(1.3);
                var remove = cc.callFunc(callback);
                var seq = cc.sequence(delay, remove);
                putNode.runAction(seq);
            } else {
                var cardArr = [];
                if (msg.uid == SelfUid()) {
                    cardArr = MjClient.HandCardArr;
                } else {
                    cardArr = MjClient.OtherHandArr[off];
                }
                var isAdd = false;
                putNode.runAction(cc.sequence(
                    cc.delayTime(0.2),
                    cc.callFunc(function() {
                        RemovePutCardOut_xiangxiang();
                    })
                ));
                for (var i = 0; i < cardArr.length; i++) {
                    var tmpArr = cardArr[i];
                    if (tmpArr.length <= 2) {
                        isAdd = true;
                        //addHandCard_leiyang(i,tmpArr.length.length + 1,msg.newCard,off);
                        tmpArr.push(msg.newCard);
                        break;
                    }
                }
                if (!isAdd) {
                    cardArr.push([msg.newCard]);
                }
                MjClient.playui.CardLayoutRestore(node, off);
            }
        } else {
            // MjClient.playui.EatVisibleCheck(off);
        }
    } else {
        // MjClient.playui.ResetPutCard(node, off); // 发牌时候刷新其他玩家弃牌 // 注意各个玩法验证！
    }
}
