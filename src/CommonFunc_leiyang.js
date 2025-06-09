
/* ======================================
 *  放一些共用的方法
 *  ====================================== */

// 耒阳字牌全局方法
MjClient.MaxPlayerNum_leiyang = 3;
MjClient.cardPath_leiyang = "playing/paohuzi/";
var ActionType_leiyang =  //图片提示
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

function getSuDuType_leiYang(){
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_SU_DU_TYPE, 1);//默认标准
};

function getActionTime_leiYang() {
    var acTime = t;
    var type = getSuDuType_leiYang();
    var t = 0.2;
    switch (type) {
        case 0: //慢
            t = 0.2 * 1.2;
            break;
        case 1: //标准
            t = 0.2;
            break;
        case 2: //快
            t = 0.2 * 0.8;
            break;
        case 3: //急速
            t = 0.2 * 0.60;
            break;
    }
    console.log("getActionTime_leiYang:" + t);
    return t;
};

//初始化玩家金币、名字、胡息
function InitUserCoinAndName_leiyang(node, off){
    var pl = getUIPlayer_leiyang(off);
    if(!pl){
        return;
    }

    var tData = MjClient.data.sData.tData;
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
                _visible: true,
                _run: function(){
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

//向服务器发送王闯王钓操作
function HZWangChuangToServer_leiyang(type){
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "HZWangChuang",
        type: type
    });
}

//向服务器发送打牌操作
function HZPutCardToServer_leiyang(card){
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJPut",
        card: card
    });
}

// 向服务器发送吃牌
function HZChiToServer_leiyang(eatCards, biCards){
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

function commitEatCards_leiyang(eatCards, biArr){
    if ((MjClient.data.sData.players[SelfUid()].eatFlag & 32) > 0) {
        MjClient.showMsg("吃牌后视为过胡，确定吃吗？", function() {
            setChiVisible_leiyang();
            HZChiToServer_leiyang(eatCards, biArr); 
        }, function() {}, "1");
    } else {
        setChiVisible_leiyang();
        HZChiToServer_leiyang(eatCards, biArr); 
    }
}

//像服务器发送碰牌
function HZPengToServer_leiyang()
{
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJPeng"
    });
}

// 向服务器发送过牌
function HZPassConfirmToServer_leiyang() {
    if (MjClient.rePlayVideo != -1)  {
        return; // 回放时候不能请求
    }

    var tData = MjClient.data.sData.tData;
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJPass",
        eatFlag: EatFlag_leiyang(),
        cardNext: tData.cardNext,
        card: tData.lastPutCard
    });
}

//发送跑牌命令
function HZGangToServer_leiyang(type){
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJGang",
        type: type,
        eatFlag: EatFlag_leiyang()
    });
}

//发送偎牌命令
function HZWeiToServer_leiyang(type){
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "HZWeiCard"
    });
}

//向服务器发送发牌命令
function HZNewCardToServer_leiyang(){
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "HZNewCard"
    });
}

//向服务器发送胡牌命令
function MJHuToServer_leiyang(){
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJHu",
        eatFlag: EatFlag_leiyang()
    });
}

//添加吃的牌
function addEatCard_leiyang(node,name,mjNum,off){
    //根据牌的类型获得需要添加的节点
    var eatNode = node.getChildByName("eatNode");
    if(!eatNode){
        return;
    }
    var type = 2;
    //设置牌
    var newCard = getNewCard_leiyang(mjNum,type,off);
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
    if(MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN){
        if(node.getName() == "right"){
            off_y = newCard.height;
            newCard.anchorX = 1;
            newCard.anchorY = 0;
        }else if(node.getName() == "left"){
            off_y = newCard.height;
            newCard.anchorX = 0;
            newCard.anchorY = 0;
        }
    }

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
function addHandCardReplay_leiyang(tagName,index,mjNum,off){
    var _node = getNode_leiyang(off);
    //根据牌的类型获得需要添加的节点
    var addNode = _node.getChildByName("replayNode");
    if(!addNode){
        return;
    }
    //设置牌
    var type = 2;
    var newCard = getNewCard_leiyang(mjNum,type,off);
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

function getEmptyIndexCommon(cardArray) {
    var empty = [];
    for(var i = 0; i < cardArray.length; i++){
        if(cardArray[i].length == 0){
            empty.push(i);
        }
    }
    return empty;
}

function cleanCardNodeCommon(off, area) {
    //获取结点
    if(off != 0){
        return;
    }
    var _node = null;
    switch(area){
        case 0:
            _node = getNode_hengYang(off);
            break;
        case 1:
            _node = getNode_leiyang(off);
            break;
        default:
            _node = getNode_hengYang(off);
            break
    }
    //根据牌的类型获得需要添加的节点
    var addNode = _node.getChildByName("handNode");
    if(!addNode){
        return;
    }
    //root列节点 card 牌节点
    addNode.cardRoot = [];
    addNode.cardList = [];

    //获取所有的牌节点
    var children1 = addNode.getChildren();
    //cc.log("chow children1", JSON.stringify(children1, null, "  ") + "");
    if(children1){
        for(var i = 0; i < children1.length; i++){
            var children2 = children1[i].getChildren();
            //cc.log("chow children2", JSON.stringify(children2, null, "  ") + "");
            if(children2){
                for(var j = 0; j < children2.length; j++){
                    if(children2[j]){
                        addNode.cardList.push(children2[j]);
                    }
                }
            }
        }
    }
    //去除非卡牌节点,例如胡息显示
    function clearNotNumber(cardList) {
        if(cardList){
            for(var i = cardList.length - 1; i >= 0; i--){
                if(!((cardList[i].tag >= 1 && cardList[i].tag <= 10) || (cardList[i].tag >= 21 && cardList[i].tag <= 30))){
                    var node = cardList.splice(i, 1);
                    node[0].removeFromParent();
                }
            }
        }
    }
    clearNotNumber(addNode.cardList);
    if(addNode.cardList.length == 0){
        return;
    }
    //按列从下而上排序 与上一次数据一一对应起来
    addNode.cardList.sort(function (a, b) {
        if(a.parent.tag < b.parent.tag){
            return -1;
        }else if(a.parent.tag == b.parent.tag){
            if(a.name < b.name){
                return -1;
            }else if(a.name == b.name){
                return 0;
            } else{
                return 1;
            }
        }else{
            return 1;
        }
    })
    /*for(var k = 0; k < addNode.cardList.length; k++){
     cc.log("chow", "cleanCardNode cardList: k = " + k + " tag = " + addNode.cardList[k].tag + " name = " + addNode.cardList[k].name + " parentTag =" + addNode.cardList[k].parent.tag);
     }*/
    //查找当前移动的牌 并更新移动位置
    if(MjClient.moveCard){
        cc.log("chow", "cleanCardNode" + " moveCard curCIndex = " + MjClient.moveCard.curCIndex + " curRIndex = " + MjClient.moveCard.curRIndex
            + " nexCIndex = " + MjClient.moveCard.nexCIndex + " nexRIndex = " + MjClient.moveCard.nexRIndex);

        var oldIndex = addNode.cardList.length;
        //var moveCard;
        //查找当前移动牌
        for(var i = 0; i < addNode.cardList.length; i++){
            if(addNode.cardList[i].parent.tag == MjClient.moveCard.curCIndex && addNode.cardList[i].name == MjClient.moveCard.curRIndex){
                //cc.log("chow", "cleanCardNode" + " addNode i = " + i + " tag = " + addNode.cardList[i].parent.tag + " name = " + addNode.cardList[i].name);
                oldIndex = i;
                //moveCard = addNode.cardList.splice(i, 1);
                break;
            }
        }
        if(oldIndex != addNode.cardList.length){
            //转化成当前坐标
            //moveCard[0].setPosition(moveCard[0].parent.convertToNodeSpace(MjClient.moveCard.curPosition));
            addNode.cardList[oldIndex].setPosition(addNode.cardList[oldIndex].parent.convertToNodeSpace(MjClient.moveCard.curPosition));

            if(MjClient.moveCard.curCIndex != MjClient.moveCard.nexCIndex
                || MjClient.moveCard.curRIndex != MjClient.moveCard.nexRIndex){
                var moveCard = addNode.cardList.splice(oldIndex, 1);
                //cc.log("chow", "cleanCardNode" + " moveCard tag = " + moveCard[0].tag + " name = " + moveCard[0].name);
                var newIndex = addNode.cardList.length;
                //查到当前移动牌移动的目标位置
                for(var i = 0; i < addNode.cardList.length; i++){
                    //cc.log("chow", "cleanCardNode" + " addNode.cardList tag = " + addNode.cardList[i].parent.tag + " name = " + addNode.cardList[i].name);
                    if(addNode.cardList[i].parent.tag == MjClient.moveCard.nexCIndex && addNode.cardList[i].name >= MjClient.moveCard.nexRIndex || addNode.cardList[i].parent.tag > MjClient.moveCard.nexCIndex){
                        newIndex = i;
                        break;
                    }
                }
                cc.log("chow", "cleanCardNode" + " newIndex = " + newIndex);
                if(newIndex == addNode.cardList.length){
                    addNode.cardList.push(moveCard[0]);
                }else{
                    addNode.cardList.splice(newIndex, 0, moveCard[0]);
                }
            }/*else{
             //00位置移动到00位置
             addNode.cardList.unshift(moveCard[0]);
             }*/
        }
    }
    //将按数据排序好的牌复用 后续直接取
    cc.log("chow cleanCardNode cardList.length = ", addNode.cardList.length + "");
    /*for(var k = 0; k < addNode.cardList.length; k++){
     cc.log("chow", "cleanCardNode cardList: k = " + k + " tag = " + addNode.cardList[k].tag + " name = " + addNode.cardList[k].name + " parentTag =" + addNode.cardList[k].parent.tag);
     }*/
    //cc.log("chow", JSON.stringify(addNode.cardList, null, "  ") + "");
    for(var k = 0; k < addNode.cardList.length; k++){
        addNode.cardList[k].lastPosition = addNode.cardList[k].parent.convertToWorldSpace(addNode.cardList[k].getPosition());
        addNode.cardList[k].isSelect = false;
        addNode.cardList[k].retain();
        addNode.cardList[k].removeFromParent(false);
        cc.log("chow", "cleanCardNode cardList: k = " + k + " tag = " + addNode.cardList[k].tag + " pos = " + JSON.stringify(addNode.cardList[k].lastPosition), null, "  " + " opacity = " + addNode.cardList[k].opacity);
    }

    //获取所有的列节点 按照数据顺序0-X
    for(var i = 0; i < addNode.childrenCount; i++){
        addNode.cardRoot.push(addNode.getChildByTag(i));
    }
    if(addNode.cardRoot.length == 0){
        return;
    }
    //复用列节点 ,后续直接查找使用
    cc.log("chow cleanCardNode cardRoot.length = ", addNode.cardRoot.length + "");
    for(var k = 0; k < addNode.cardRoot.length; k++){
        //cc.log("chow", "cleanCardNode cardRoot: k = " + k + " : " + addNode.cardRoot[k].tag);
        addNode.cardRoot[k].retain();
        addNode.cardRoot[k].removeFromParent(false);

        //addNode.cardRoot[k].lastPosition = addNode.cardRoot[k].getPosition();
        //cc.log("chow", JSON.stringify(addNode.cardRoot[k].lastPosition), null, "  ");
    }
    //查找数据中被删除的列索引
    cc.log("chow", "cleanCardNode : MjClient.HandCardArr = "  + JSON.stringify(MjClient.HandCardArr));
    var empty = getEmptyIndexCommon(MjClient.HandCardArr);
    for(var i = 0; i < empty.length; i++){
        cc.log("chow", "cleanCardNode empty[" + i + "] = " + empty[i]);
    }

    //区分左右新建列和无变化
    cc.log("chow", "cleanCardNode addGroupIndex:" + MjClient.addGroupIndex);
    if(MjClient.addGroupIndex == 0){
        //最左边新建
        if(empty.length == 0){
            //新增列，新增一个列结点插入最前面
            var cardParent = new cc.Node();
            cardParent.width = addNode.cardList[0].width;
            cardParent.retain();
            cardParent.setPosition(cc.p(addNode.cardRoot[0].x - addNode.cardRoot[0].width / 2, addNode.cardRoot[0].y));

            addNode.cardRoot.unshift(cardParent);
        }else{
            //只有当列数大于1时才取出设置 否则不用移动
            if(addNode.cardRoot.length > 1){
                //移动列，取出移动列插入到最前面
                var cardParent = addNode.cardRoot.splice(empty[0] - 1, 1);//这里需要减去前面新增的一个位置
                cardParent[0].setPosition(cc.p(addNode.cardRoot[0].x - addNode.cardRoot[0].width / 2, addNode.cardRoot[0].y));
                addNode.cardRoot.unshift(cardParent[0]);
            }
        }
    }else if(MjClient.addGroupIndex == MjClient.HandCardArr.length - 1){
        //最右边新建
        if(empty.length == 0){
            //新增列，新增一个列结点插入最后面
            var cardParent = new cc.Node();
            cardParent.width = addNode.cardList[0].width;
            cardParent.retain();
            cardParent.setPosition(cc.p(addNode.cardRoot[addNode.cardRoot.length - 1].x + addNode.cardRoot[addNode.cardRoot.length - 1].width / 2, addNode.cardRoot[addNode.cardRoot.length - 1].y));

            addNode.cardRoot.push(cardParent);
        }else{
            //只有当列数大于1时才取出设置 否则不用移动
            if(addNode.cardRoot.length > 1){
                //移动列，取出移动列插入到最后面
                var cardParent = addNode.cardRoot.splice(empty[0], 1);
                cardParent[0].setPosition(cc.p(addNode.cardRoot[addNode.cardRoot.length - 1].x + addNode.cardRoot[addNode.cardRoot.length - 1].width / 2, addNode.cardRoot[addNode.cardRoot.length - 1].y));
                addNode.cardRoot.push(cardParent[0]);
            }
        }
    }else{
        //删除无数据列
        for(var i = empty.length - 1; i >= 0; i--){
            var cardParent = addNode.cardRoot.splice(empty[i], 1);
            cardParent[0].setPosition(cc.p(addNode.cardRoot[addNode.cardRoot.length - 1].x + addNode.cardRoot[addNode.cardRoot.length - 1].width / 2, addNode.cardRoot[addNode.cardRoot.length - 1].y));
            addNode.cardRoot.push(cardParent[0]);
        }
        //刷新时导致列数不够需要先补齐列数
        if(addNode.cardRoot.length > 0){
            var addRootCount = MjClient.HandCardArr.length - addNode.cardRoot.length;
            cc.log("chow", "cleanCardNode" + " addRootCount = " + addRootCount);
            for(var i = 0; i < addRootCount; i++){
                var cardParent = new cc.Node();
                cardParent.width = addNode.cardList[0].width;
                cardParent.retain();
                cardParent.setPosition(cc.p(addNode.cardRoot[addNode.cardRoot.length - 1].x + addNode.cardRoot[addNode.cardRoot.length - 1].width / 2, addNode.cardRoot[addNode.cardRoot.length - 1].y));

                addNode.cardRoot.push(cardParent);
            }
        }
    }
    //排好顺序的列节点，重置顺序Id
    for(var k = 0; k < addNode.cardRoot.length; k++){
        addNode.cardRoot[k].tag = k;
        addNode.cardRoot[k].lastPosition = addNode.cardRoot[k].getPosition();
        cc.log("chow", JSON.stringify(addNode.cardRoot[k].lastPosition), null, "  ");
    }
}

function resetCardNodeCommon(off, area) {
    if(off != 0){
        return;
    }
    var _node = null;
    switch(area){
        case 0:
            _node = getNode_hengYang(off);
            break;
        case 1:
            _node = getNode_leiyang(off);
            break;
        default:
            _node = getNode_hengYang(off);
            break
    }
    //根据牌的类型获得需要添加的节点
    var addNode = _node.getChildByName("handNode");
    if(!addNode){
        return;
    }
    cc.log("chow resetCardNode cardList.length", addNode.cardList.length + "");
    for(var i = 0; i < addNode.cardList.length; i++){
        addNode.cardList[i].release();
    };

    cc.log("chow resetCardNode cardRoot.length", addNode.cardRoot.length + "");
    for(var i = 0; i < addNode.cardRoot.length; i++){
        addNode.cardRoot[i].release();
    }
}

function getCardNodeCommon(cardList, mjNum){
    for(var i = 0; i < cardList.length; i++){
        //防止拖动卡牌时点击刷新或者吃碰导致优先使用了克隆的结点,所以取非透明度结点
        if (cardList[i].tag == mjNum && cardList[i].isSelect == false && cardList[i].opacity == 255) {
            cardList[i].isSelect = true;
            //cc.log("chow", "getCardNode : " + i);
            return cardList[i];
        }
    }
    return null;
}

function getCardRootCommon(cardRoot, tagName){
    for(var i = 0; i < cardRoot.length; i++){
        if (cardRoot[i].tag == tagName) {
            //cc.log("chow", "getCardRoot : " + i);
            return cardRoot[i];
        }
    }
    return null;
}

function setHandCardCommon(tagName,index,mjNum,off, area){
    if(off != 0){
        return;
    }
    var _node = null;
    switch(area){
        case 0:
            _node = getNode_hengYang(off);
            break;
        case 1:
            _node = getNode_leiyang(off);
            break;
        default:
            _node = getNode_hengYang(off);
            break
    }
    //根据牌的类型获得需要添加的节点
    var addNode = _node.getChildByName("handNode");
    if(!addNode){
        return;
    }
    //取一个对应的牌节点
    var newCard = getCardNodeCommon(addNode.cardList, mjNum);
    if(!newCard){
        cc.log("chow", "newCard");
        switch(area){
            case 0:
                newCard = getNewCard_hengYang(mjNum,1,off);
                break;
            case 1:
                newCard = getNewCard_leiyang(mjNum,1,off);
                break;
            default:
                newCard = getNewCard_hengYang(mjNum,1,off);
                break
        }
    }else{
        cc.log("chow", "getCard");
    }
    var scale_y = newCard.scaleY;

    var cardParent = addNode.getChildByTag(tagName);
    if(!cardParent){
        cardParent = getCardRootCommon(addNode.cardRoot, tagName);
        if(!cardParent){
            cc.log("chow", "newRoot");
            cardParent = new cc.Node();
            cardParent.tag = tagName;
            cardParent.width = newCard.width;
            addNode.addChild(cardParent);
        }else{
            cc.log("chow", "getRoot from list");
            addNode.addChild(cardParent);
        }
    }else{
        cc.log("chow", "getRoot from parent");
    }

    var beginPoint = cc.p(0,0);
    var off_y = newCard.height * scale_y - newCard.height/4 * scale_y
    var cardCount = cardParent.childrenCount;

    newCard.setName(index);
    newCard.zIndex = 4 - index;
    newCard.anchorX = 0;
    newCard.anchorY = 0;
    //newCard.x = beginPoint.x;
    //newCard.y = beginPoint.y + cardCount * off_y;
    cardParent.addChild(newCard);
    if(newCard.lastPosition){
        newCard.setPosition(cardParent.convertToNodeSpace(newCard.lastPosition));
        doMovetoActionCommon(newCard, cc.p(beginPoint.x, beginPoint.y + cardCount * off_y));
    }else{
        newCard.x = beginPoint.x;
        newCard.y = beginPoint.y + cardCount * off_y;
    }

    var pl = null;
    switch(area){
        case 0:
            SetTouchCardHandler_hengYang(newCard, off);
            pl = getUIPlayer_hengYang(off);
            break;
        case 1:
            SetTouchCardHandler_leiyang(newCard, off);
            pl = getUIPlayer_leiyang(off);
            break;
        default:
            SetTouchCardHandler_hengYang(newCard, off);
            pl = getUIPlayer_hengYang(off);
            break
    }

    if(pl && pl.canNotPutCard){
        if(pl.canNotPutCard.indexOf(mjNum) != -1){
            newCard.setColor(cc.color(170, 170, 170));
        }
    }
    newCard.setTouchEnabled(true);
    newCard.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {
        if(!newCard.isRunning()){
            newCard.setTouchEnabled(false);
        }
        if(!newCard.isTouchEnabled()){
            newCard.setTouchEnabled(true);
        }
        cc.director.getEventDispatcher().resumeTarget(newCard);
    })));
    //cc.log("chow", "addOrAdjustHandCard_hengYang: name=" + newCard.getName() + " num=" + newCard.num + " tag =" + newCard.tag);
}

function doMovetoActionCommon(node,endP){
    node.stopAllActions();
    var action = cc.moveTo(0.15,endP);
    node.runAction(action);
};

function checkCard_leiyang(node, off){
    if(off != 0 || MjClient.rePlayVideo != -1){
        return;
    }
    if(off == 0 && node.getName() != "down"){
        return;//2人玩法right节点同为玩家节点
    }
    var sData = MjClient.data.sData;
    var tData = sData.tData; 

    // 在小结算数据的时候，不需要在去检测手牌内容了
    if(tData.tState == TableState.roundFinish ){
        return;
    }
    var pl = getUIPlayer_leiyang(off);
    if(!pl){
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
                RemoveHandCard_leiyang(node, cardHandArr[i], off);
                cardHandArr.splice(i, 1);
                i--;
            }
        }
    }
}

function resetHandCard_leiyang(posNode,off){
    checkCard_leiyang(posNode, off);
    var handNode = posNode.getChildByName("handNode");
    handNode.visible = true;
    cleanCardNodeCommon(off, 1);
    handNode.removeAllChildren();
    var cardArr = MjClient.HandCardArr;
    //清理空数组
    for(var k = cardArr.length - 1;k >=0;k--){
        if(cardArr[k].length == 0){
            cardArr.splice(k,1);
        }
    }
    for(var k = 0;k < cardArr.length;k++){
        var groupList = cardArr[k];
        for(var j = 0;j < groupList.length;j++){
            setHandCardCommon(k, j, groupList[j],off, 1);
        }
    }
    resetCardNodeCommon(off, 1);
    addTingSign_hengYang(posNode); // 添加听牌角标
    var handCard = posNode.getChildByName("handCard");
    var scale_x = handCard.scaleX;
    var winSize = MjClient.size;
    var totalWidth = handCard.width * cardArr.length * scale_x;
    for(var i = 0;i < cardArr.length;i++){
        var addNode = handNode.getChildByTag(i);

        if(addNode.lastPosition){
            addNode.setPosition(addNode.lastPosition);
            doMovetoActionCommon(addNode, cc.p((winSize.width - totalWidth) / 2 + i * handCard.width * scale_x, 0));
        }else{
            addNode.setPosition(cc.p((winSize.width - totalWidth) / 2 + i * handCard.width * scale_x, 0));
        }
    }
    postEvent("LY_addHandHuXi");
};

/*
 添加手牌(正常打牌)
 每一组添加到一个节点,比如4个同样的为一个节点，单牌也为一个节点
 */
function addHandCard_leiyang(tagName,index,mjNum,off){
    if(off != 0){
        return;
    }
    var _node = getNode_leiyang(off);
    //根据牌的类型获得需要添加的节点
    var addNode = _node.getChildByName("handNode");
    if(!addNode){
        return;
    }
    //设置牌
    var newCard = getNewCard_leiyang(mjNum,1,off);
    var scale_y = newCard.scaleY;
    //var parentCount = addNode.childrenCount;
    //首先根据name判断cpNode中是否已经添加
    var cardParent = addNode.getChildByTag(tagName);
    if(!cardParent){
        cardParent = new cc.Node();
        cardParent.tag = tagName;
        // cardParent.setName(0);			//用于标记子节点的name,用于排序
        cardParent.width = newCard.width;
        addNode.addChild(cardParent);
        // SetTouchCardHandler_leiyang(cardParent);
    }

    var beginPoint = cc.p(0,0);
    var off_y = newCard.height * scale_y - newCard.height/4 * scale_y;

    var cardCount = cardParent.childrenCount;
    newCard.setName(index);
    newCard.zIndex = 4 - index;
    newCard.anchorX = 0;
    newCard.anchorY = 0;
    newCard.x = beginPoint.x;
    newCard.y = beginPoint.y + cardCount * off_y;
    cardParent.addChild(newCard);

    var pl = getUIPlayer_leiyang(off);
    if(pl && pl.canNotPutCard){
        if(pl.canNotPutCard.indexOf(mjNum) != -1){
            newCard.setColor(cc.color(170, 170, 170));
        }
    }
}

/**
 mjNum:牌的数字
 type:类型，1:手牌 2：吃牌 3：打的牌
 **/
function getNewCard_leiyang(mjNum, type, off, isTurn ,isSelf){
    var _node = getNode_leiyang(off);
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
    mjNode.visible = true;

    if(mjNum > 0){
        //创建一个带有麻将信息的麻将 cp为创建后的麻将
        setCardSprite_leiyang(mjNode, mjNum, type, isTurn, isSelf);
        if(type == 1){
            //只有手牌才会有点击事件
            SetTouchCardHandler_leiyang(mjNode,off);
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
function setCardSprite_leiyang(mjNode, mjNum, type, isTurn, isSelf){
    var mjBgType = getCurrentMJBgType();
    if(MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN){
        mjBgType = ziPai.getZiPaiType();
    }
    if(mjBgType == 0){
        MjClient.cardPath_leiyang = "playing/paohuzi/";
    }else if(mjBgType == 1 && MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP){
        MjClient.cardPath_leiyang = "playing/paohuzi/MJBg1/";
    }else if(mjBgType == 2 && MjClient.getAppType() != MjClient.APP_TYPE.QXLYQP && MjClient.getAppType() != MjClient.APP_TYPE.QXXXGHZ && MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP){
        MjClient.cardPath_leiyang = "playing/paohuzi/MJBg2/";
    }else {
        MjClient.cardPath_leiyang = "playing/paohuzi/";
    }

    if((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) && MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA){
        MjClient.cardPath_leiyang = ziPai.getCardFilePath();
    }

    if(type == 1){
        mjNode.loadTexture(MjClient.cardPath_leiyang+"hand" + mjNum + ".png");
    }
    if(type == 2){
        mjNode.loadTexture(MjClient.cardPath_leiyang+"out" + mjNum + ".png");
        if(isTurn){
            if(isSelf){
                var sp = cc.Sprite.create("playing/ziPai/shadow_card.png");
                var size = mjNode.getCustomSize();
                sp.setAnchorPoint(0.5,0.5);
                sp.setPosition(cc.p(size.width / 2 ,size.height / 2));
                sp.setScale(size.width/sp.getContentSize().width);
                mjNode.addChild(sp);
            }else{
                mjNode.loadTexture(MjClient.cardPath_leiyang+"huxiBG.png");
            }
        }
    }
    if(type == 3 || type == 4){
        mjNode.loadTexture(MjClient.cardPath_leiyang+"put" + mjNum + ".png");
        if(isTurn){
            mjNode.loadTexture(MjClient.cardPath_leiyang+"normalBG.png");
        }
    }
    mjNode.tag = mjNum;
}

function checkTingCards_leiyang(putCard){
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ || 
        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP){
        //听牌检测
        var sData = MjClient.data.sData;

        if(MjClient.data.sData.tData.tState == TableState.waitPut && curPlayerIsMe_leiyang(0) && putCard === undefined){
            postEvent("showTingLayer", []);
            return;
        }

        if(putCard && (!curPlayerIsMe_leiyang(0) || sData.tData.tState != TableState.waitPut)){
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
function updateBtnMovedPosition_leiyang(btn, eventType){
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
//MjClient.cloneCard = null;
//MjClient.putCard = null;
MjClient.hasPut = false;
function SetTouchCardHandler_leiyang(card,off){
    var cardTag = card.tag;
    var pl = getUIPlayer_leiyang(off);
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
        card.addTouchEventListener(null);
        card.setTouchEnabled(false);
        if(MjClient.movingCard_paohuzi == card){
            MjClient.movingCard_paohuzi = null;
        }
        return;
    }

    card.setColor(cc.color(255, 255, 255));

    var _node = getNode_leiyang(off);
    // var movingCard_paohuzi = null;

    var acTime = 0.2;
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP || MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.QXHHZP){
        acTime = getActionTime_leiYang();
    }
    var cloneCard = null;
    var touchTime = 0;
    card.addTouchEventListener(function(btn,eventType){

        //禁止同时移动多个牌
        if(MjClient.movingCard_paohuzi !== null && cc.sys.isObjectValid(MjClient.movingCard_paohuzi) && MjClient.movingCard_paohuzi !== btn){
            return;
        }

        if(eventType == ccui.Widget.TOUCH_BEGAN){

            MjClient.movingCard_paohuzi = btn;
            touchTime = new Date().getTime();
            //
            var beginPos = btn.getPosition();
            var touchPos = beginPos;//btn.parent.convertToWorldSpace(beginPos);
            touchPos = cc.p(touchPos.x + (0.5 - btn.anchorX) * btn.width * btn.scaleX,
                touchPos.y + (0.5 - btn.anchorY) * btn.height * btn.scaleY);
            cloneCard = btn.clone();
            cloneCard.setTouchEnabled(false);
            setCardSprite_leiyang(cloneCard, cardTag, 1, false);
            cloneCard.opacity = 100;
            btn.parent.addChild(cloneCard);

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
            // updateBtnMovedPosition_leiyang(btn, eventType);
            ShowPutCardIcon();

            checkTingCards_leiyang(btn.tag);

            return true;
        }
        if(eventType == ccui.Widget.TOUCH_MOVED){
            if (MjClient.movingCard_paohuzi==null) return;
            var movePos = btn.getTouchMovePosition();
            movePos = cc.pSub(movePos, btn.parent.getPosition());
            btn.x = movePos.x;
            btn.y = movePos.y;
            // updateBtnMovedPosition_leiyang(btn, eventType);
        }
        if(eventType == ccui.Widget.TOUCH_ENDED || 
            eventType == ccui.Widget.TOUCH_CANCELED){ //fix by 千千 统一处理
            if (MjClient.movingCard_paohuzi==null) return;
            // updateBtnMovedPosition_leiyang(btn, eventType);
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP && eventType == ccui.Widget.TOUCH_CANCELED){
                touchTime = 0;
            }
            MjClient.movingCard_paohuzi = null;
            var btnParent = btn.parent;
            var btnTag = btn.tag;
            var btnName = btn.name;
            var scale_x = btn.scaleX;
            var endPos = btn.getTouchEndPosition();
            var pl = getUIPlayer_leiyang(0);
            var tData = MjClient.data.sData.tData;
            var isPut = false;
            var cutLine = MjClient.playui.jsBind.cutLine._node;

            if(cloneCard && cc.sys.isObjectValid(cloneCard)){
                cloneCard.opacity = 255;
            }
            cc.log("chow", "TouchEvent : parentTag = " + btnParent.tag + " btnTag = "+ btn.tag + " btnName = " + btn.name);
            MjClient.moveCard = {};
            MjClient.moveCard.curCIndex = MjClient.moveCard.nexCIndex = btnParent.tag;
            MjClient.moveCard.curRIndex = MjClient.moveCard.nexRIndex = btn.name;
            MjClient.moveCard.curPosition = btnParent.convertToWorldSpace(cc.p(btn.x - btn.anchorX * btn.width * btn.scaleX,  btn.y - btn.anchorY * btn.height * btn.scaleY));


            if(((!pl.canNotPutCard||pl.canNotPutCard.indexOf(btnTag)==-1) &&(getOtherWeiCards(btnTag)||(pl.limitHuPutCard && pl.limitHuPutCard.indexOf(btnTag) != -1))) &&
                IsTurnToMe() && tData.tState == TableState.waitPut && pl.mjState == TableState.waitPut &&
                !MjClient.isCommon && endPos.y >= cutLine.y && !MjClient.hasPut)
            {
                btn.removeFromParent();

                //出牌后直接落牌，add by maoyu
                var putNode = MjClient.playui._downNode.getChildByName("put");
                putNode.removeAllChildren();
                var putCard = getNewCard_leiyang(btnTag, 3 ,off);
                putCard.scaleX = putCard.width/putNode.width - 0.16;
                putCard.scaleY = putCard.width/putNode.width - 0.06;
                putCard.x = putCard.width/2;
                putCard.y = putCard.height/2;
                putNode.addChild(putCard);
                putNode.visible = true;
                var pos = putNode.getUserData().pos;
                putNode.setScale(0);
                putNode.setPosition(cc.p(pos.x ,pos.y - 200));
                var action1 = cc.scaleTo(acTime,putNode.getUserData().scale);
                var action2 = cc.moveTo(acTime,pos.x,pos.y);
                putNode.runAction(cc.spawn(action1,action2));

                if(getOtherWeiCards(btnTag) && MjClient.gameType != MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN){
                    MjClient.showMsg("放偎之后这局将不能再吃碰，是否确定？",
                        function(){
                            if(pl.limitHuPutCard && pl.limitHuPutCard.indexOf(btnTag) != -1){
                                MjClient.showMsg("吃边打边，这局将只能胡"+ MjClient.majiang.getLimitHuDesc(btnTag, tData)+"，是否确定？",
                                    function(){
                                        MjClient.hasPut = true;
                                        MjClient.isCommon = false;
                                        MjClient.HandCardArr[btnParent.tag].splice(parseInt(btnName),1);
                                        if(cloneCard && cc.sys.isObjectValid(cloneCard)){
                                            cloneCard.removeFromParent();
                                        }
                                        HZPutCardToServer_leiyang(btnTag);
                                        MjClient.playui.ResetHandCard(MjClient.playui._downNode,0);

                                        checkTingCards_leiyang(btnTag);
                                    },
                                    function(){
                                        MjClient.playui.ResetHandCard(MjClient.playui._downNode,0);
                                        ShowPutCardIcon();
                                        putNode.removeAllChildren();
                                        putNode.setVisible(false);
                                    }, "1");
                                return;
                            }
                            MjClient.hasPut = true;
                            MjClient.isCommon = false;
                            MjClient.HandCardArr[btnParent.tag].splice(parseInt(btnName),1);
                            if(cloneCard && cc.sys.isObjectValid(cloneCard)){
                                cloneCard.removeFromParent();
                            }
                            HZPutCardToServer_leiyang(btnTag);
                            MjClient.playui.ResetHandCard(MjClient.playui._downNode,0);

                            checkTingCards_leiyang(btnTag);
                        },
                        function(){
                            MjClient.playui.ResetHandCard(MjClient.playui._downNode,0);
                            ShowPutCardIcon();
                            putNode.removeAllChildren();
                            putNode.setVisible(false);

                            checkTingCards_leiyang();
                        }, "1");
                }else if((pl.limitHuPutCard && pl.limitHuPutCard.indexOf(btnTag) != -1) && MjClient.gameType != MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN){
                    MjClient.showMsg("吃边打边，这局将只能胡"+ MjClient.majiang.getLimitHuDesc(btnTag, tData)+"，是否确定？",
                        function(){
                            MjClient.hasPut = true;
                            MjClient.isCommon = false;
                            MjClient.HandCardArr[btnParent.tag].splice(parseInt(btnName),1);
                            if(cloneCard && cc.sys.isObjectValid(cloneCard)){
                                cloneCard.removeFromParent();
                            }
                            HZPutCardToServer_leiyang(btnTag);
                            MjClient.playui.ResetHandCard(MjClient.playui._downNode,0);

                            checkTingCards_leiyang(btnTag);
                        },
                        function(){
                            MjClient.playui.ResetHandCard(MjClient.playui._downNode,0);
                            ShowPutCardIcon();
                            putNode.removeAllChildren();
                            putNode.setVisible(false);

                            checkTingCards_leiyang();
                        }, "1");
                }else if(MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN){
                    MjClient.hasPut = true;
                    MjClient.isCommon = false;
                    MjClient.HandCardArr[btnParent.tag].splice(parseInt(btnName),1);
                    if(cloneCard && cc.sys.isObjectValid(cloneCard)){
                        cloneCard.removeFromParent();
                    }
                    HZPutCardToServer_leiyang(btnTag);
                    MjClient.playui.ResetHandCard(MjClient.playui._downNode,0);

                    checkTingCards_leiyang(btnTag);
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

                btn.removeFromParent(true);

                if(!isNoPut && !isWangBa && IsTurnToMe() && tData.tState == TableState.waitPut && pl.mjState == TableState.waitPut)
                {
                    if(!MjClient.isCommon && endPos.y >= cutLine.y && !MjClient.hasPut)
                    {
                        isPut = true;
                        MjClient.hasPut = true;
                        MjClient.isCommon = false;
                        MjClient.HandCardArr[btnParent.tag].splice(parseInt(btnName),1);
                        if(cloneCard && cc.sys.isObjectValid(cloneCard)){
                            cloneCard.removeFromParent();
                        }
                        HZPutCardToServer_leiyang(btnTag);
                        //MjClient.playui.ResetHandCard(MjClient.playui._downNode,off);

                        checkTingCards_leiyang(btnTag);


                        //出牌后直接落牌，add by maoyu
                        var putNode = MjClient.playui._downNode.getChildByName("put");
                        putNode.removeAllChildren();
                        var putCard = getNewCard_leiyang(btnTag, 3 ,off);
                        putCard.scaleX = putCard.width/putNode.width - 0.16;
                        putCard.scaleY = putCard.width/putNode.width - 0.06;
                        putCard.x = putCard.width/2;
                        putCard.y = putCard.height/2;
                        putNode.addChild(putCard);
                        putNode.visible = true;
                        var pos = putNode.getUserData().pos;
                        putNode.setScale(0);
                        putNode.setPosition(cc.p(pos.x ,pos.y - 200));
                        var action1 = cc.scaleTo(acTime,putNode.getUserData().scale);
                        var action2 = cc.moveTo(acTime,pos.x,pos.y);
                        putNode.runAction(cc.spawn(action1,action2));
                    }
                }
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
                        var endTime = new Date().getTime();
                        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP && 
                            (endTime - touchTime) < 0.3 * 1000)
                        {
                            _resetArrIndex_leiyang(selectArr, btnTag, cloneCard);
                        }else{
                            MjClient.HandCardArr[btnParent.tag].splice(parseInt(btnName),1);
                            _fixArrIndex_leiyang(selectArr, btnTag, btn);
                        }
                        //_changeArrIndex_leiyang(selectArr, btnTag, btn);
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
                            MjClient.moveCard.nexCIndex = selectParentTag;
                            MjClient.HandCardArr[btnParent.tag].splice(parseInt(btnName),1);
                            _fixArrIndex_leiyang(selectArr, btnTag, btn);
                            //MjClient.HandCardArr[btnParent.tag].splice(parseInt(btnName),1);
                        }
                    }
                    else{
                        if((MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ && count >= 10) || MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN && count >= 10 ||
                            (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) && MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA && count >= 10){

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

                                    MjClient.addGroupIndex = 0; //新增列标志

                                }else if(selectParentTag >= count){
                                    MjClient.HandCardArr.push(arr);

                                    MjClient.addGroupIndex = MjClient.HandCardArr.length - 1;
                                }
                                MjClient.moveCard.nexCIndex = MjClient.addGroupIndex;
                                MjClient.moveCard.nexRIndex = 0;
                            }else{
                                //if (MjClient.cloneCard) MjClient.cloneCard.opacity = 255;
                            }
                        }
                    }

                    checkTingCards_leiyang();
                    //MjClient.playui.ResetHandCard(MjClient.playui._downNode,off);
                }
                MjClient.playui.ResetHandCard(MjClient.playui._downNode,off);
                ShowPutCardIcon();

                MjClient.addGroupIndex = -1;    //新增列标志
                delete(MjClient.moveCard);
            }
        }
        // if(eventType == ccui.Widget.TOUCH_CANCELED){
        //     if (movingCard_paohuzi==null) return;
        //     movingCard_paohuzi = null;
        //     MjClient.playui.ResetHandCard(MjClient.playui._downNode,off);
        //     ShowPutCardIcon();
        // }
    });
}

//点击换牌的位置
function _resetArrIndex_leiyang(arr, btnTag, btn){
    if(arr && !_isKan_paohuzi(arr)){
        if(arr.length <= 1){
            return;
        }
        var copyArr = arr.slice();
        var len = copyArr.length;
        for(var i = 0; i < len; i++){
            var tag = copyArr[i];
            if(tag == btnTag){
                copyArr.splice(i,1);
                break;
            }
        }
        if(_isKan_paohuzi(copyArr)){
            return;
        }

        var childArr = btn.parent.children.reverse();
        var pos = btn.getPosition();
        for(var i = 0,count = childArr.length;i< count;i++){
            var childPos = childArr[i].getPosition();
            if(Math.abs(childPos.y - pos.y) <= 1){
                index = i;
                break;
            }
        }
        var changeIndex = index == len - 1 ? index - 1 : index + 1;
        var oCard = arr[index];
        arr[index] = arr[changeIndex];
        arr[changeIndex] = oCard;
    }   
}

//根据坐标Y，添加到数组对应的位置
function _fixArrIndex_leiyang(arr, btnTag, btn){
    if(_isKan_leiyang(arr)){
        arr.push(btnTag);
        MjClient.moveCard.nexRIndex = 3;
    }else{
        var off_y = btn.height/4 * btn.scaleY;
        var maxH = btn.height * btn.scaleY * 3 - off_y * 2;
        if(btn.y > maxH){
            arr.push(btnTag);
            MjClient.moveCard.nexRIndex = 3;
        }else if(btn.y > btn.height * btn.scaleY * 2 - off_y){
            arr.splice(2,0,btnTag);
            MjClient.moveCard.nexRIndex = 1;
        }else if(btn.y > btn.height * btn.scaleY){
            arr.splice(1,0,btnTag);
            MjClient.moveCard.nexRIndex = 1;
        }else{
            arr.splice(0,0,btnTag);
            MjClient.moveCard.nexRIndex = 0;
        }
    }

}

//改变数组元素的位置
function _changeArrIndex_leiyang(arr, btnTag, btn){
    if(!_isKan_leiyang(arr)){
        var len = arr.length;
        for(var i = 0; i < len; i++){
            var tag = arr[i];
            if(tag == btnTag){
                arr.splice(i,1);
                break;
            }
        }
        _fixArrIndex_leiyang(arr, btnTag, btn);
    }
}

//数组里的是否为三个相同的牌
function _isKan_leiyang(arr){
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
function DealOffLineCard_leiyang(node, off){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if(tData.tState == TableState.roundFinish || tData.tState == TableState.waitReady || tData.tState == TableState.isReady || tData.tState == TableState.waitShuffle) {
        return;
    }

    if(typeof(tData.currCard) != "undefined" && tData.currCard != -1){
        var uids = tData.uids;
        var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_leiyang;
        if(uids[selfIndex] == uids[tData.curPlayer]){
            var putCard = getNewCard_leiyang(tData.currCard, 3, off);
            var putNode = node.getChildByName("put");
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
function getUIBindByIndex_leiyang(idx) {  
    var sData = MjClient.data.sData;
    var tData = sData.tData;

    var jsBind = MjClient.playui.jsBind;
    var uiList = [jsBind.down, jsBind.right, jsBind.left];
    if (MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR
        || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King
    ) { // 四人坐醒
        uiList = [jsBind.down, jsBind.right, jsBind.xing, jsBind.left];
    } else if (MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO
        || MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG 
        || MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z 
        || (MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI/* && !tData.areaSelectMode.zuoXing*/)
    ) { // 有4人选项
        if (tData.maxPlayer == 4) {
            uiList = [jsBind.down, jsBind.xing, jsBind.right, jsBind.left];
        } 
    }
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP &&
        (MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
         MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG)) {

         if (MjClient.MaxPlayerNum_leiyang == 2) {
            uiList = [jsBind.down, jsBind.left];
         }
    }
    var selfIdx = tData.uids.indexOf(SelfUid());
    // if(selfIdx == tData.xingPlayer){
    //     selfIdx = (selfIdx - 2 + tData.maxPlayer) % tData.maxPlayer;
    // }
    var maxPlayer = tData.maxPlayer;
    var off = (idx + maxPlayer - selfIdx) % maxPlayer;
    // if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI && tData.areaSelectMode.zuoXing){
    //     var isHad = false;
    //     var indexArr = [0,1,2,3];
    //     var selfIndex = indexArr.indexOf(selfIdx);
    //     var idxIndex = indexArr.indexOf(idx);
    //     for(var i = 1; i <= 4; i++){
    //         var k = i + selfIndex;
    //         k = k >= indexArr.length ? k - indexArr.length : k;
    //         var nextIndex = indexArr[k];
    //         if(nextIndex == idx){
    //             break;
    //         }
    //         if(k == indexArr.indexOf(tData.xingPlayer)){
    //             isHad = true;
    //         }
    //     }
    //     if(isHad && selfIdx != idx){
    //         off -= 1;
    //     }
    // }
    return uiList[off];
}

// 落牌动画
function fall_leiyang() {
    var sData = MjClient.data.sData;
    var tData = sData.tData;

    // tData.lastPlayer没同步!
    var lastPlayer = (tData.curPlayer - 1 + tData.maxPlayer) % tData.maxPlayer;
    if(lastPlayer == tData.xingPlayer){
        lastPlayer = (lastPlayer - 1 + tData.maxPlayer) % tData.maxPlayer;
    }
   
    var pl = sData.players[tData.uids[lastPlayer]];
    var uiBind = getUIBindByIndex_leiyang(lastPlayer);

    if (pl.mjput.length <= 0) {
        return;
    }

    var putNode = uiBind._node.getChildByName("put");

    var acTime = getActionTime_leiYang();
    var outNode = uiBind._node.getChildByName("outNode");
    var out = outNode.getChildren()[pl.mjput.length - 1];
    if (out) { // 防止putNode已经被移除 out不显示
        out.runAction(cc.sequence(cc.delayTime(acTime), cc.callFunc(function() { 
            this.visible = true;
        }.bind(out))));
    }
    // 发牌时候不一定有落牌（重跑 偎后死手等)
    if (!(putNode.getChildren().length > 0 && putNode.getChildren()[0].tag == pl.mjput[pl.mjput.length - 1])) {
        putNode.removeAllChildren();
        putNode.visible = false;
        return;
    }

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

    putNode.stopAllActions();
    putNode.runAction(cc.sequence(
        cc.spawn(cc.moveTo(acTime, targetPos), cc.scaleTo(acTime, scaleX, scaleY)), 
        cc.callFunc(function () {
            this.removeAllChildren();
            this.visible = false;
        }.bind(putNode))
    ));
}

//发牌
MjClient.isCommon = false;
function DealNewCard_leiyang(node, msg, off) {
    //没有发牌过来的时候直接忽略
    if (!msg.newCard) {
        RemovePutCardOut_leiyang();
        MjClient.playui.EatVisibleCheck();
        return;
    }

    AddPutCard_leiyang(node, msg, off); // 注意各个玩法验证！
    //存在发牌
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_leiyang;
    if (uids[selfIndex] == msg.uid) {
        //清理之前玩家打的牌
        var lastPlayer = tData.lastPlayer;
        if (lastPlayer != -1) {
            //var lastOff = (off + MjClient.MaxPlayerNum_leiyang - selfIndex) % MjClient.MaxPlayerNum_leiyang;
            // RemovePutCardOut_leiyang();
            fall_leiyang();
        }

        var putCard = getNewCard_leiyang(msg.newCard, 3, off);
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
        var acTime = getActionTime_leiYang();
        putNode.setScale(0);
        putNode.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2 + 160));
        var action1 = cc.scaleTo(acTime, putNode.getUserData().scale);
        var action2 = cc.moveTo(acTime, putNode.getUserData().pos);
        putNode.runAction(cc.spawn(action1, action2).easing(cc.easeCubicActionOut()));

        if (!msg.isCommon) {
            if (MjClient.rePlayVideo == -1) {
                MjClient.isCommon = true;
                //王霸牌需要收回
                var callback = function() {
                    RemovePutCardOut_leiyang();
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
                    ShowPutCardIcon();
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
                        RemovePutCardOut_leiyang();
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

function setPutCardPos_leiyang(outNode, outCard, idx, off) {
    var tData = MjClient.data.sData.tData;
    var maxPlayer = tData.maxPlayer;
    // var type = ziPai.getUiLayoutType();
    if (maxPlayer == 3) { // 3人
        var off_x = idx;
        var off_y = 0;
        if (MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG && off != 0) { // 六胡抢3人15张(todo 判断) 弃牌过多处理
            off_x = idx % 8;
            off_y = Math.floor(idx / 8);
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN && off == 0){
            off_x = idx % 7;
            off_y = Math.floor(idx / 7);
            if(MjClient.gameType != MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN){
                off_y = -off_y;
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
        {
            line = Math.floor(idx % 15);
            row = Math.floor(idx / 15);
        }
        if (off == 0) {
            outCard.anchorX = 1;
            outCard.anchorY = 0;
            outCard.x = outNode.width - line * outCard.width;
            outCard.y = row * outCard.height;
        } else if (off == 1) {
            outCard.anchorX = 1;
            outCard.anchorY = 1;
            outCard.x = outNode.width + line * outCard.width;
            outCard.y = row * outCard.height;
        }
    }
}

// 添加弃牌(摸牌或打牌时 弃牌堆直接添加 没人要显示出来) todo!
function AddPutCard_leiyang(node, msg, off) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var off_index = (tData.uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_leiyang;
    if (off_index == tData.curPlayer) { // off对应玩家为当前玩家
        var pl = sData.players[tData.uids[tData.curPlayer]];
        if (pl.mjput.length <= 0) {
            return;
        }

        var card = pl.mjput[pl.mjput.length - 1];
        var outNode = node.getChildByName("outNode");
        var out = getNewCard_leiyang(card, 2, off);
        var count = pl.mjput.length - 1;
        var width = out.width;
        var height = out.height;
        setPutCardPos_leiyang(outNode, out, pl.mjput.length - 1, off);
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

//翻醒发牌
function DealFanXingNewCard_leiyang(card){
    var putCard = getNewCard_leiyang(card, 4, 0);
    var putNode = MjClient.playui._downNode.getChildByName("xingPai");
    putNode.removeAllChildren();
    putCard.scaleX = putCard.width/putNode.width - 0.16;
    putCard.scaleY = putCard.width/putNode.width - 0.06;
    putCard.x = putCard.width/2;
    putCard.y = putCard.height/2;
    putNode.visible = true;
    putNode.addChild(putCard);
    putNode.zIndex = 10;

    //添加动作
    putNode.setScale(0);
    putNode.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2+120));
    var action1 = cc.scaleTo(0.2,putNode.getUserData().scale);
    var action2 = cc.moveTo(0.2,putNode.getUserData().pos);
    putNode.runAction(cc.spawn(action1,action2).easing(cc.easeCubicActionOut()));
}

//王闯/王钓
function DealWangChuang_leiyang(node,msg,off){
    var sData = MjClient.data.sData;
    var tData = sData.tData;

    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_leiyang;
    if(uids[selfIndex] == msg.uid){
        var pl = sData.players[uids[selfIndex]];
        var lastPlayer = tData.lastPlayer;
        if(lastPlayer != -1){
            //var lastOff = (off + MjClient.MaxPlayerNum_leiyang - selfIndex) % MjClient.MaxPlayerNum_leiyang;
            RemovePutCardOut_leiyang();
        }
        if(pl.wangType == 1){
            var putCard = getNewCard_leiyang(91, 3, off);
            var putNode = node.getChildByName("put");
            putCard.scaleX = putCard.width/putNode.width - 0.16;
            putCard.scaleY = putCard.width/putNode.width - 0.06;
            putCard.x = putCard.width/2;
            putCard.y = putCard.height/2;
            putNode.visible = true;
            putNode.setPosition(putNode.getUserData().pos);
            putNode.setScale(putNode.getUserData().scale);
            putNode.addChild(putCard);

            ShowEatActionAnim_leiyang(node, ActionType_leiyang.WANGDIAO, off);

            var delay = cc.delayTime(1.5);
            var callback = function(){
                RemovePutCardOut_leiyang();
                //HZNewCardToServer_leiyang();
            }
            //putNode.runAction(cc.sequence(delay,cc.callFunc(callback)));
        }else if(pl.wangType == 2){
            var putCard = getNewCard_leiyang(91, 3, off);
            var putCard1 = getNewCard_leiyang(91, 3, off);
            var putNode = node.getChildByName("put");
            putCard.scaleX = putCard.width/putNode.width - 0.16;
            putCard.scaleY = putCard.width/putNode.width - 0.06;
            putCard1.scaleX = putCard.width/putNode.width - 0.16;
            putCard1.scaleY = putCard.width/putNode.width - 0.06;
            if(node.getName() == "down"){
                putCard.x = - 15;
                putCard.y = putCard.height/2;
                putCard1.x = putCard.width + 15;
                putCard1.y = putCard.height/2;
            }else if(node.getName() == "right"){
                putCard.x = putCard.width/2;
                putCard.y = putCard.height/2;
                putCard1.x = - putCard.width/2 - 30;
                putCard1.y = putCard.height/2;
            }else if(node.getName() == "left"){
                putCard.x = putCard.width/2;
                putCard.y = putCard.height/2;
                putCard1.x = putCard.width/2 + putCard.width + 30;
                putCard1.y = putCard.height/2;
            }
            putNode.visible = true;
            putNode.setPosition(putNode.getUserData().pos);
            putNode.setScale(putNode.getUserData().scale);
            putNode.addChild(putCard);
            putNode.addChild(putCard1);
            ShowEatActionAnim_leiyang(node, ActionType_leiyang.WANGCHUANG, off);
            var delay = cc.delayTime(1.5);
            var callback = function(){
                RemovePutCardOut_leiyang();
                //HZNewCardToServer_leiyang();
            }
            //putNode.runAction(cc.sequence(delay,cc.callFunc(callback)));
        }else if(pl.wangType == 4){
            var putCard = getNewCard_leiyang(91, 3, off);
            var putCard1 = getNewCard_leiyang(91, 3, off);
            var putCard2 = getNewCard_leiyang(91, 3, off);
            var putNode = node.getChildByName("put");
            putCard.scaleX = putCard.width/putNode.width - 0.16;
            putCard.scaleY = putCard.width/putNode.width - 0.06;
            putCard1.scaleX = putCard.width/putNode.width - 0.16;
            putCard1.scaleY = putCard.width/putNode.width - 0.06;
            putCard2.scaleX = putCard.width/putNode.width - 0.16;
            putCard2.scaleY = putCard.width/putNode.width - 0.06;
            if(node.getName() == "down"){
                putCard.x = putCard.width/2;
                putCard.y = putCard.height/2;
                putCard1.x = -(putCard.width/2 + 15);
                putCard1.y = putCard.height/2;
                putCard2.x = putCard.width/2 + putCard.width + 15;
                putCard2.y = putCard.height/2;
            }else if(node.getName() == "right"){
                putCard.x = putCard.width/2;
                putCard.y = putCard.height/2;
                putCard1.x = - putCard.width/2 - 30;
                putCard1.y = putCard.height/2;
                putCard2.x = - putCard.width/2 - putCard.width - 45;
                putCard2.y = putCard.height/2;
            }else if(node.getName() == "left"){
                putCard.x = putCard.width/2;
                putCard.y = putCard.height/2;
                putCard1.x = putCard.width/2 + putCard.width + 30;
                putCard1.y = putCard.height/2;
                putCard2.x = putCard.width/2 + (putCard.width + 30) * 2;
                putCard2.y = putCard.height/2;
            }
            putNode.visible = true;
            putNode.setPosition(putNode.getUserData().pos);
            putNode.setScale(putNode.getUserData().scale);
            putNode.addChild(putCard);
            putNode.addChild(putCard1);
            putNode.addChild(putCard2);
            ShowEatActionAnim_leiyang(node, ActionType_leiyang.WANGZHA, off);
            var delay = cc.delayTime(1.5);
            var callback = function(){
                RemovePutCardOut_leiyang();
                //HZNewCardToServer_leiyang();
            }
            //putNode.runAction(cc.sequence(delay,cc.callFunc(callback)));
        }

        var eat = MjClient.playui.jsBind.eat;
        eat.guo._node.visible = false;
        eat.wangDiao._node.visible = false;
        eat.wangChuang._node.visible = false;
        eat.wangZha._node.visible = false;
        eat.guo._node.setTouchEnabled(false);
        eat.wangDiao._node.setTouchEnabled(false);
        eat.wangChuang._node.setTouchEnabled(false);
        eat.wangZha._node.setTouchEnabled(false);
    }
}

//处理出牌
function DealPutCard_leiyang(node, msg, off){
    AddPutCard_leiyang(node, msg, off); // 注意各个玩法验证！

    MjClient.hasPut = false;
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_leiyang;
    if(uids[selfIndex] == msg.uid)
    {
        //别人出牌或者回放时，添加动作
        if (SelfUid() != msg.uid || MjClient.rePlayVideo != -1 ||
            (sData.players[msg.uid].trust  && sData.tData.areaSelectMode.trustTime > 0))
        {
            var putNode = node.getChildByName("put");
            putNode.stopAllActions();
            putNode.removeAllChildren();
            var putCard = getNewCard_leiyang(msg.card, 3 ,off);
            putCard.scaleX = putCard.width/putNode.width - 0.16;
            putCard.scaleY = putCard.width/putNode.width - 0.06;
            putCard.x = putCard.width/2;
            putCard.y = putCard.height/2;
            putNode.addChild(putCard);
            putNode.visible = true;
            // putNode.setScale(putNode.getUserData().scale);
            putNode.setPosition(putNode.getUserData().pos);


            var pos = putNode.getUserData().pos;
            putNode.setScale(0);
            if(SelfUid() == msg.uid){
                putNode.setPosition(cc.p(pos.x ,pos.y - 100));
            }else {
                // putNode.setPosition(node.getChildByName("head").getPosition());
                putNode.y -= 150;
                putNode.x -= 100
                if(off == 1){
                    putNode.x += 230;
                }
            }
            var action1 = cc.scaleTo(getActionTime_leiYang(),putNode.getUserData().scale);
            var action2 = cc.moveTo(getActionTime_leiYang(),pos.x,pos.y);
            putNode.runAction(cc.spawn(action1,action2).easing(cc.easeCubicActionOut()));
        }

        var pl = getUIPlayer_leiyang(off);
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
            RemoveHandCard_leiyang(node,msg.card,off);
            MjClient.playui.ResetHandCard(node,off);
        }

        if (off == 0) {
            removeTingSign_hengYang(node);
        }
    }
}

//吃牌
function DealChiCard_leiyang(node, msg, off) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_leiyang;
    if (tData.curPlayer == selfIndex) {
        RemovePutCardOut_leiyang();
        var pl = sData.players[uids[selfIndex]];
        var mjchi = pl.mjchi;
        var eatAndBiCards = mjchi[mjchi.length - 1];
        var mjchiCard = pl.mjchiCard;
        var chiCard = mjchiCard[mjchiCard.length - 1];
        var eatCards = eatAndBiCards.eatCards;
        var tmpEatCards = eatCards.slice();
        tmpEatCards.splice(tmpEatCards.indexOf(chiCard), 1);
        for (var i = 0; i < tmpEatCards.length; i++) {
            RemoveHandCard_leiyang(node, tmpEatCards[i], off);
        }
        var biCards = eatAndBiCards.biCards;
        if (biCards) {
            for (var k = 0; k < biCards.length; k++) {
                var biArr = biCards[k];
                var tmpBiArr = biArr.slice();
                for (var m = 0; m < biArr.length; m++) {
                    if (tmpBiArr.indexOf(biArr[m]) >= 0) {
                        tmpBiArr.splice(tmpBiArr.indexOf(biArr[m]), 1);
                        RemoveHandCard_leiyang(node, biArr[m], off);
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
            var card = getNewCard_leiyang(eatCards[i], 2, off);
            if (i == 2) {
                card.setColor(cc.color(170, 170, 170));
            }

            cardWidth = card.width //*eatNode.scaleX;
            var off_count = (node.getName() == "right" || node.getName() == "left") ? (2 - i) : i;
            card.zIndex = 4 - i;
            card.x = 0;
            card.y = off_count * getOffY_leiyang(node, card);
            setChiCardAnchorPoint_leiyang(node, card);
            parent.addChild(card);
        }

        var selfColCount = 1;
        if (biCards) {
            selfColCount += biCards.length;
            for (var k = 0; k < biCards.length; k++) {
                var biArr = biCards[k];
                for (var m = 0; m < biArr.length; m++) {
                    var card = getNewCard_leiyang(biArr[m], 2, off);
                    if (m == 2) {
                        card.setColor(cc.color(170, 170, 170));
                    } 
                    setChiCardAnchorPoint_leiyang(node, card);
                    var off_count = (node.getName() == "right" || node.getName() == "left") ? (2 - m) : m;
                    card.zIndex = 10 - m;
                    card.x = card.width * card.scaleX * (k + 1) * ((node.getName() == "right" || node.getName() == "xing") ? -1 : 1);
                    card.y = off_count * getOffY_leiyang(node, card);
                    parent.addChild(card);
                }
            }
        }
        eatNode.addChild(parent);
        var parentPos = getChiCardParentPosition_leiyang(node, cardWidth, off, selfColCount);
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
        setCardParentPosY_leiyang(node, parent);
        var action2 = cc.moveTo(getActionTime_leiYang(), parentPos.x, parentPos.y);
        var callback = function() {
            // parent.removeFromParent(true);
            // MjClient.playui.ResetOtherCard(node, off);
        };
        parent.runAction(cc.sequence(action2,cc.callFunc(callback)));



        if (biCards) {
            ShowEatActionAnim_leiyang(node, ActionType_leiyang.XIAHUO, off);
        } else {
            ShowEatActionAnim_leiyang(node, ActionType_leiyang.CHI, off);
        }
    }
    //MjClient.playui.CardLayoutRestore(node,off);
}

function setChiCardAnchorPoint_leiyang(node,newCard) {
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
    if(MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN){
        if(node.getName() == "right"){
            newCard.anchorX = 1;
            newCard.anchorY = 0;
        }else if(node.getName() == "left"){
            newCard.anchorX = 0;
            newCard.anchorY = 0;
        }
    }
}
function getOffY_leiyang(node,newCard) {
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
    if(MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN){
        if(node.getName() == "right"){
            off_y = newCard.height;
        }else if(node.getName() == "left"){
            off_y = newCard.height;
        }
    }

    return off_y;
}
function getChiCardParentPosition_leiyang(node, newCardWidth, off, selfColCount, orignColPosX) {
    selfColCount = selfColCount || 1;
    var eatNode = node.getChildByName("eatNode");
    // var parentCount = eatNode.getChildrenCount() - 1;

    var pl = getUIPlayer_leiyang(off);
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
function setCardParentPosY_leiyang(node, cardParent) {
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

// 获取提 偎桌面上展示的亮牌 的index
function getShowCardIdx_leiyang(node, chiTip) {
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

// 处理碰
function DealPengCard_leiyang(node, msg, off){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_leiyang;
    if(tData.curPlayer == selfIndex){
        RemovePutCardOut_leiyang();

        var parent = new cc.Node();
        var eatNode = node.getChildByName("eatNode");
        var cardWidth = 0;
        var pl = sData.players[tData.uids[selfIndex] + ""];
        var pengCard = pl.mjpeng[pl.mjpeng.length-1];
        for(var i = 0;i < 3; i++) {
            var card = getNewCard_leiyang(pengCard,2,off);
            cardWidth = card.width//*eatNode.scaleX;
            var childCount = parent.childrenCount;
            card.zIndex = 4 - childCount;
            card.x = 0;
            card.y = childCount * getOffY_leiyang(node, card);
            setChiCardAnchorPoint_leiyang(node, card);
            parent.addChild(card);
        }
        eatNode.addChild(parent);

        RemoveHandCard_leiyang(node,pengCard,off);
        RemoveHandCard_leiyang(node,pengCard,off);
        MjClient.playui.ResetHandCard(node, off);
        ShowEatActionAnim_leiyang(node, ActionType_leiyang.PENG, off);


        var callback = function(){
            ShowPutCardIcon();
            // parent.removeFromParent(true);
            // MjClient.playui.ResetOtherCard(node, off);
        };

        var parentPos = getChiCardParentPosition_leiyang(node, cardWidth, off, 1);
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
        setCardParentPosY_leiyang(node, parent);
        var action2 = cc.moveTo(getActionTime_leiYang(),parentPos.x,parentPos.y);
        var action3 = cc.callFunc(callback);
        parent.runAction(cc.sequence(action2,action3));
    }
}

//偎牌
function DealWeiCard_leiyang(node, msg, off) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_leiyang;
    if (tData.curPlayer == selfIndex) {
        RemovePutCardOut_leiyang();
        ShowEatActionAnim_leiyang(node, ActionType_leiyang.WEI, off);

        var parent = new cc.Node();
        var eatNode = node.getChildByName("eatNode");
        var cardWidth = 0;
        var pl = sData.players[tData.uids[selfIndex] + ""];
        var weiCard = msg.newCard;
        for (var i = 0; i < 3; i++) {
            var isTurn = true;
            if (MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ || MjClient.majiang.getCardShowType(tData.uids[tData.curPlayer], weiCard) == 2) 
            {
                if (i == getShowCardIdx_leiyang(node, "wei")) {
                    isTurn = false;
                }
                var card = getNewCard_leiyang(weiCard, 2, off, isTurn);
            } else if (MjClient.majiang.getCardShowType(tData.uids[tData.curPlayer], weiCard) == 1) {
                var card = getNewCard_leiyang(weiCard, 2, off);
                var shade = new cc.Sprite("playing/paohuzi/huxiBG1.png");
                shade.opacity = 100;
                shade.x = shade.width / 2;
                shade.y = shade.height / 2;
                card.addChild(shade);
            } else if (MjClient.majiang.getCardShowType(tData.uids[tData.curPlayer], weiCard) == 0) {
                var card = getNewCard_leiyang(weiCard, 2, off, true);
            }
            cardWidth = card.width //*eatNode.scaleX;
            card.zIndex = 4 - i;
            card.x = 0;
            card.y = i * getOffY_leiyang(node, card);
            setChiCardAnchorPoint_leiyang(node, card);
            parent.addChild(card);
        }
        eatNode.addChild(parent);

        RemoveHandCard_leiyang(node, weiCard, off);
        RemoveHandCard_leiyang(node, weiCard, off);
        MjClient.playui.ResetHandCard(node, off);

        var callback = function() {
            ShowPutCardIcon();
            // parent.removeFromParent(true);
            // MjClient.playui.ResetOtherCard(node, off);
            if (pl.mjState == TableState.waitEat) {
                MjClient.playui.EatVisibleCheck();
            }
        };

        var parentPos = getChiCardParentPosition_leiyang(node, cardWidth, off, 1);
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
        setCardParentPosY_leiyang(node, parent);
        var action2 = cc.moveTo(getActionTime_leiYang(), parentPos.x, parentPos.y);
        var action3 = cc.callFunc(callback);
        parent.runAction(cc.sequence(action2, action3));
    }
    //MjClient.playui.CardLayoutRestore(node,off);
}

// 跑牌或者提牌
function DealGangCard_leiyang(node, msg, off) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_leiyang;
    var gangUid = msg.cpginfo.uid;
    if (uids.indexOf(gangUid) == selfIndex) {
        if (msg.type == 2) {
            RemovePutCardOut_leiyang();
            ShowEatActionAnim_leiyang(node, ActionType_leiyang.PAO, off);
        } else {
            if (!msg.isGangHand && msg.type == 1) {
                RemovePutCardOut_leiyang();
            }
            ShowEatActionAnim_leiyang(node, ActionType_leiyang.TI, off);
        }

        var parent = new cc.Node();
        var eatNode = node.getChildByName("eatNode");
        var cardWidth = 0;
        var pl = sData.players[tData.uids[selfIndex] + ""];
        var gangCard = msg.newCard;
        for (var i = 0; i < 4; i++) {
            var isTurn = true;
            if (msg.type == 2) {
                isTurn = false;
                var card = getNewCard_leiyang(gangCard, 2, off, isTurn);
            } else if (MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ || MjClient.majiang.getCardShowType(tData.uids[tData.curPlayer], gangCard) == 2) 
            {
                if (i == getShowCardIdx_leiyang(node, "ti")) {
                    isTurn = false;
                }
                var card = getNewCard_leiyang(gangCard, 2, off, isTurn);
            } else if (MjClient.majiang.getCardShowType(tData.uids[tData.curPlayer], gangCard) == 1) {
                var card = getNewCard_leiyang(gangCard, 2, off, false);
                var shade = new cc.Sprite("playing/paohuzi/huxiBG1.png");
                shade.opacity = 100;
                shade.x = shade.width / 2;
                shade.y = shade.height / 2;
                card.addChild(shade);
            } else if (MjClient.majiang.getCardShowType(tData.uids[tData.curPlayer], gangCard) == 0) {
                var card = getNewCard_leiyang(gangCard, 2, off, true);
            }
            cardWidth = card.width //*eatNode.scaleX;
            card.zIndex = 4 - i;
            card.x = 0;
            card.y = i * getOffY_leiyang(node, card);
            setChiCardAnchorPoint_leiyang(node, card);
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

        RemoveHandCard_leiyang(node, gangCard, off);
        RemoveHandCard_leiyang(node, gangCard, off);
        RemoveHandCard_leiyang(node, gangCard, off);
        if (msg.isGangHand) {
            RemoveHandCard_leiyang(node, gangCard, off);
        }
        MjClient.playui.ResetHandCard(node, off);



        var callback = function() {
            ShowPutCardIcon();
            // parent.removeFromParent(true);
            // MjClient.playui.ResetOtherCard(node, off);
            if (pl.mjState == TableState.waitCard) {
                //HZNewCardToServer_leiyang();
            } else if (pl.mjState == TableState.waitEat) {
                MjClient.playui.EatVisibleCheck();
            }
        };
        var parentPos = getChiCardParentPosition_leiyang(node, cardWidth, off, 1, orignColPosX);
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
        setCardParentPosY_leiyang(node, parent);
        var action2 = cc.moveTo(getActionTime_leiYang(), parentPos.x, parentPos.y);
        var action3 = cc.callFunc(callback);
        parent.runAction(cc.sequence(action2, action3));
    }
    //MjClient.playui.CardLayoutRestore(node,off);
}

// 处理胡
function DealHu_leiyang(node, msg, off){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var selfIndex = (tData.uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_leiyang;
    var pl = getUIPlayer_leiyang(off);
    if(tData.uids[selfIndex] != msg.uid){
        return;
    }
    if(pl){
        pl.eatFlag = 0;
        MjClient.playui.EatVisibleCheck();
        ShowEatActionAnim_leiyang(node,ActionType_leiyang.HU,off);
    }
}

function DealAddCard_leiyang(node,msg, off){
    if(MjClient.rePlayVideo == -1 && off != 0){
        return;
    }
    var cardArr = MjClient.HandCardArr;
    if(off != 0 && MjClient.rePlayVideo != -1){
        cardArr = MjClient.OtherHandArr[off];
    }
    var pl = getUIPlayer_leiyang(off);
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
function RemovePutCardOut_leiyang(noAction) {
    var jsBind = MjClient.playui.jsBind;
    var uiList = [jsBind.down, jsBind.right, jsBind.left];
    if (MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King) {
        uiList = [jsBind.down, jsBind.right, jsBind.xing, jsBind.left];
    } else if (MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO || MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z ||
        MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI) {
        if (MjClient.MaxPlayerNum_leiyang == 3) {
            uiList = [jsBind.down, jsBind.right, jsBind.left];
        } else {
            uiList = [jsBind.down, jsBind.xing, jsBind.right, jsBind.left];
        }
    }

    //字牌2人方位调整
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP &&
        (MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
         MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG)) {

         if (MjClient.MaxPlayerNum_leiyang == 2) {
            uiList = [jsBind.down, jsBind.left];
         }
    }

    for (var i = 0; i < uiList.length; i++) {
        var _node = uiList[i];
        var putNode = _node._node.getChildByName("put");
        if (!putNode) {
            continue;
        }

        putNode.removeAllChildren();
        putNode.visible = false;

        // var pl = getUIPlayer_leiyang(i);
        // if (MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King) {
        //     pl = getUIPlayer_leiyang(getOffByXing_leiyang(i));
        // }

        // if (!noAction &&
        //     MjClient.data.sData.tData.xingPlayer != MjClient.data.sData.tData.uids.indexOf(SelfUid()) && //醒家视角时播动作有bug未解决
        //     pl &&
        //     pl.mjput.length > 0 &&
        //     putNode.getChildren().length > 0 &&
        //     putNode.getChildren()[0].tag == pl.mjput[pl.mjput.length - 1]
        // ) {
        //     var outNode = _node._node.getChildByName("outNode");

        //     var moveX = outNode.getPosition().x;
        //     var outNodeChilden = outNode.getChildren();
        //     var outNodeCount = outNode.getChildrenCount();
        //     var moveY = outNode.getPosition().y;
        //     if (outNodeCount > 0) {
        //         if ((MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO ||
        //                 MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG ||
        //                 MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI) &&
        //             MjClient.MaxPlayerNum_leiyang == 4) {
        //             if (_node._node.getName() == "down" || _node._node.getName() == "xing" || _node._node.getName() == "right") {
        //                 moveX = outNode.getPosition().x - outNodeChilden[0].width * outNodeCount * outNode.getScale();
        //             } else if (_node._node.getName() == "left") {
        //                 moveX = outNode.getPosition().x + outNodeChilden[0].width * outNodeCount * outNode.getScale();
        //             }
        //         } else {
        //             if (_node._node.getName() == "down" || _node._node.getName() == "right") {
        //                 moveX = outNode.getPosition().x - outNodeChilden[0].width * outNodeCount * outNode.getScale();
        //                 if (_node._node.getName() == "right" && outNodeCount >= 8 && (MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI)) {
        //                     moveX = outNode.getPosition().x - outNodeChilden[0].width * (outNodeCount - 8) * outNode.getScale();
        //                     moveY = outNode.getPosition().y + outNodeChilden[0].height * outNode.getScale();
        //                 }
        //             } else if (_node._node.getName() == "left") {
        //                 moveX = outNode.getPosition().x + outNodeChilden[0].width * outNodeCount * outNode.getScale();
        //                 if (outNodeCount >= 8 && (MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI)) {
        //                     moveX = outNode.getPosition().x + outNodeChilden[0].width * (outNodeCount - 8) * outNode.getScale();
        //                     moveY = outNode.getPosition().y + outNodeChilden[0].height * outNode.getScale();
        //                 }
        //             }
        //         }
        //     }

        //     var targetPos = cc.p(moveX, moveY);
        //     putNode.runAction(cc.sequence(
        //         cc.spawn(cc.moveTo(0.2, targetPos), cc.scaleTo(0.2, putNode.getUserData().scale * 0.3)),
        //         cc.callFunc(function() {
        //             this.removeAllChildren();
        //             this.visible = false;
        //         }.bind(putNode))
        //     ));
        // } else {
        //     putNode.removeAllChildren();
        //     putNode.visible = false;
        // }
    }
}

//发手牌时再清理一遍
function clearMJHandCardUI_leiyang() {
    // var handNode = MjClient.playui._downNode.getChildByName("handNode");
    // handNode.removeAllChildren();
    var eatNode = MjClient.playui._downNode.getChildByName("eatNode");
    eatNode.removeAllChildren();
    var outNode = MjClient.playui._downNode.getChildByName("outNode");
    outNode.removeAllChildren();
    var eatNodeR = MjClient.playui._rightNode.getChildByName("eatNode");
    eatNodeR.removeAllChildren();
    var outNodeR = MjClient.playui._rightNode.getChildByName("outNode");
    outNodeR.removeAllChildren();
    var eatNodeL = MjClient.playui._topNode.getChildByName("eatNode");
    eatNodeL.removeAllChildren();
    var outNodeL = MjClient.playui._topNode.getChildByName("outNode");
    outNodeL.removeAllChildren();
    if((MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO || MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z) && MjClient.MaxPlayerNum_leiyang == 4){
        var eatNodeX = MjClient.playui._xingNode.getChildByName("eatNode");
        eatNodeX.removeAllChildren();
        var outNodeX = MjClient.playui._xingNode.getChildByName("outNode");
        outNodeX.removeAllChildren();
    }
    RemovePutCardOut_leiyang(true);
}

//出牌表示状态
function ShowPutCardIcon() {
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
            var pl = getUIPlayer_leiyang(0);
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
function RemoveHandCard_leiyang(node,card,off){
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
function InitShowEatActionNode_leiyang(plNode){
    var play_tips = plNode.getChildByName("play_tips");
    for(var i = 0; i < play_tips.children.length; i++){
        play_tips.children[i].visible = false;
    }
}

// 重置吃碰杠胡动作
function resetEatActionAnim_leiyang()
{
    var jsBind = MjClient.playui.jsBind;
    var ui = [jsBind.down,jsBind.right,jsBind.left];
    var tData = MjClient.data.sData.tData;
    if((MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO || 
        MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || 
        MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z ||
        MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI)&& 
        tData.maxPlayer == 4){
        ui = [jsBind.down, jsBind.xing,jsBind.right, jsBind.left];
    }
    var count = MjClient.MaxPlayerNum_leiyang;
    if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King){
        count = 3;
    }
    for(var i = 0; i < count; i++)
    {
        InitShowEatActionNode_leiyang(ui[i]._node);
    }
}

//播放头像移动
function tableStartHeadMoveAction_leiyang(node){
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

//重置3家头像位置
function reConectHeadLayout_leiyang(node){
    var tData = MjClient.data.sData.tData;
    var down = node.getChildByName("down").getChildByName("head");
    var left = node.getChildByName("left").getChildByName("head");
    var right = node.getChildByName("right").getChildByName("head");
    var xing = node.getChildByName("xing").getChildByName("head");

    resetEatActionAnim_leiyang();
    setWgtLayout(down, [0.12, 0.12], [0.06, 0.15], [0, 0], false, false);
    setWgtLayout(left, [0.12, 0.12], [0.06, 0.87], [0, 0], false, false);
    setWgtLayout(right,[0.12, 0.12], [0.94, 0.88], [0, 0], false, false);
    setWgtLayout(xing,[0.12, 0.12], [0.94, 0.15], [0, 0], false, false);
    // if(tData.tState == TableState.waitJoin || tData.tState == TableState.roundFinish)
    // {
    // 	setWgtLayout(down, [0.13, 0.13], [0.5, 0.5], [0, -2], false, false);
    // 	setWgtLayout(left, [0.13, 0.13], [0.5, 0.5], [-4.8, 0.1], false, false);
    // 	setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [4.8, 0.1], false, false);
    // }
    // else
    // {
    // 	setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 2.8], false, false);
    // 	setWgtLayout(left, [0.13, 0.13], [0, 0.5], [0.6, 1.8], false, false);
    // 	setWgtLayout(right, [0.13, 0.13], [1, 0.5], [-0.6, 2.4], false, false);
    // }
}

//根据偏移获得玩家node
function getNode_leiyang(off){
    var _node = null;
    if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King){
        var tData = MjClient.data.sData.tData;
        var selfIndex = tData.uids.indexOf(SelfUid());
        if(selfIndex == tData.xingPlayer){
            // off = (tData.zhuang + 2 + off + MjClient.MaxPlayerNum_leiyang) % MjClient.MaxPlayerNum_leiyang;
            if(off == MjClient.MaxPlayerNum_leiyang - 1){
                //如果是最后一个玩家，则偏移需要移动一个，换算成3人
                off -= 1;
            }
        }else{
            if(selfIndex + 1 == tData.xingPlayer && off != 0){
                //如果下家是醒家，则另外两家的偏移都要往前移动一位
                off -= 1;
            }
            if(off == MjClient.MaxPlayerNum_leiyang - 1){
                off -= 1;
            }
        }
    }
    switch (off){
        case 0:
            _node = MjClient.playui._downNode;
            break;
        case 1:
            _node = MjClient.playui._rightNode;
            break;
        case 2:
            _node = MjClient.playui._topNode;
            break;
        default:
            break;
    }
    if(MjClient.MaxPlayerNum_leiyang == 4 && (MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO || 
                                                MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || 
                                                MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z ||
                                                MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI))
    {
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

    //字牌2人方位调整
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP &&
        (MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
         MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG)) {

         if (MjClient.MaxPlayerNum_leiyang == 2) {
            switch (off){
                case 0:
                    _node = MjClient.playui._downNode;
                    break;
                case 1:
                    _node = MjClient.playui._topNode;
                    break;
                default:
                    break;
            }
         }
    }
    return _node;
}

/**
 * 通过相对于 我 的偏移量 获取 pl对象 (偏移量：uids的差)  (我的位置down:0)
 * @param  {number} off 相对于我的偏移量
 * @return {object} 玩家数据
 */
function getUIPlayer_leiyang(off){
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
function getUIHeadByOff_leiyang(off){
    var pl = getUIPlayer_leiyang(off);
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
function downAndPlayVoice_leiyang(uid, filePath){
    var index = getUiOffByUid_leiyang(uid);
    //console.log("index is downAndPlayVoice" + index);
    MjClient.native.DownLoadFile(jsb.fileUtils.getWritablePath(), index + ".mp3", MjClient.remoteCfg.voiceUrl + filePath, "playVoice");
}

function getUiOffByUid_leiyang(uid){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = uids.indexOf(SelfUid());
    var targetIndex = uids.indexOf(uid);
    return (targetIndex - selfIndex + MjClient.MaxPlayerNum_leiyang) % MjClient.MaxPlayerNum_leiyang;
}

//设置微信头像
function setWxHead_leiyang(node, d, off){
    if(d.uid == getUIHeadByOff_leiyang(off).uid){
        var nobody = node.getChildByName("nobody");
        var wxHead = nobody.getChildByName("WxHead");
        if(wxHead)
            wxHead.removeFromParent();

        var sp = new cc.Sprite(d.img);
        sp.setName("WxHead");
        nobody.addChild(sp);
        setWgtLayout(sp, [0.91, 0.91], [0.5, 0.5], [0, 0], false, true);
        COMMON_UI.addNobleHeadFrame(nobody,getUIPlayer_leiyang(off))
    }
}

//显示玩家庄的ui
function showUserZhuangLogo_leiyang(node, off){
    var tData = MjClient.data.sData.tData;
    var pl = getUIPlayer_leiyang(off);
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

//显示房主  add by sking
function showFangzhuTagIcon_leiyang(node,off)
{
    var pl = getUIPlayer_leiyang(off);
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
            var sp = new cc.Sprite("playing/gameTable/fangzhu.png");
            sp.setPosition(node.getContentSize().width - 7,17);
            sp.setAnchorPoint(1,0);
            sp.setName("fangTag");
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


    // 显示东南西北
    var directionGameType = [];
    directionGameType.push(MjClient.GAME_TYPE.LUO_DI_SAO);
    directionGameType.push(MjClient.GAME_TYPE.JIANG_YONG_15Z);
    directionGameType.push(MjClient.GAME_TYPE.PAO_HU_ZI_SR);
    directionGameType.push(MjClient.GAME_TYPE.PAO_HU_ZI);
    directionGameType.push(MjClient.GAME_TYPE.PAO_HU_ZI_ER);
    directionGameType.push(MjClient.GAME_TYPE.PAO_HU_ZI_King);
    directionGameType.push(MjClient.GAME_TYPE.PAO_HU_ZI_SR_King);
    directionGameType.push(MjClient.GAME_TYPE.ZP_LY_CHZ);
    directionGameType.push(MjClient.GAME_TYPE.HY_LIU_HU_QIANG);
    directionGameType.push(MjClient.GAME_TYPE.HY_SHI_HU_KA);
    directionGameType.push(MjClient.GAME_TYPE.SHAO_YANG_BO_PI);

    //改成文字
    if( directionGameType.indexOf(MjClient.gameType) >= 0 ){
        var uidIndex = tData.uids.indexOf(pl.info.uid);
        var font = ['东', '南', '西', '北'];
        var sp = new cc.LabelTTF( font[uidIndex],"fonts/fzcy.ttf",25);
        sp.setName('playerDirection')
        sp.x = -20;
        sp.y = -56;
        if(node.getChildByName('playerDirection'))  node.getChildByName('playerDirection').removeFromParent();
        node.addChild(sp);
    }

}

// 清理ui
function clearCardUI_leiyang(node,off){
    mylog("clearCardUI_leiyang");
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
            InitShowEatActionNode_leiyang(ni.getParent());
        }
    }
}

function EatFlag_leiyang(){
    var eat = MjClient.playui.jsBind.eat;
    var eatFlag = 0;

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
    
    mylog("eatFlag" + eatFlag);
    return eatFlag;
}

function huXiScore_leiyang(type,card)
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

//刷新胡息
function UpdateHuXi_leiyang(off){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var score = 0;
    var pl = getUIPlayer_leiyang(off);
    if(!pl){
        return;
    }
    //跑牌
    var mjpao = pl.mjgang0;
    if(mjpao && mjpao.length>0){
        for(var p=0;p<mjpao.length;p++){
            score += huXiScore_leiyang("paoPai",mjpao[p]);
        }
    }

    //碰
    var mjpeng = pl.mjpeng;
    if(mjpeng && mjpeng.length>0){
        for(var i=0;i<mjpeng.length;i++){
            score += huXiScore_leiyang("peng",mjpeng[i]);
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
                    score += huXiScore_leiyang("chi",cards[0]);
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
                    score += huXiScore_leiyang("tiPai", mjti[t]);
                }
            }
        }else{
            if(mjti && mjti.length>0){
                for (var t = 0; t < mjti.length; t++) {
                    if(MjClient.majiang.getCardShowType(pl.info.uid, mjti[t]) != 0){
                        score += huXiScore_leiyang("tiPai", mjti[t]);
                    }
                }
            }
        }
        //偎牌
        var mjwei = pl.mjwei;
        if(mjwei && mjwei.length>0){
            for (var w = 0; w < mjwei.length; w++) {
                if(MjClient.majiang.getCardShowType(pl.info.uid, mjwei[w]) != 0) {
                    score += huXiScore_leiyang("weiPai", mjwei[w]);
                }
            }
        }
    }else {
        //提牌
        var mjti = pl.mjgang1;
        if(mjti &&　mjti.length>0){
            for (var t = 0; t < mjti.length; t++) {
                score += huXiScore_leiyang("tiPai", mjti[t]);
            }
        }
        //偎牌
        var mjwei = pl.mjwei;
        if(mjwei && mjwei.length>0){
            for (var w = 0; w < mjwei.length; w++) {
                score += huXiScore_leiyang("weiPai", mjwei[w]);
            }
        }
    }

    var selfIndex = tData.uids.indexOf(SelfUid());
    if(tData.xingPlayer == selfIndex){
        pl = getUIPlayer_leiyang(2);
        //提牌
        var mjti = pl.mjgang1;
        if(mjti && mjti.length>0){
            for(var t=0;t<mjti.length;t++){
                score += huXiScore_leiyang("tiPai",mjti[t]);
            }
        }
        //偎牌
        var mjwei = pl.mjwei;
        if(mjwei && mjwei.length>0){
            for(var w=0;w<mjwei.length;w++){
                score += huXiScore_leiyang("weiPai",mjwei[w]);
            }
        }
    }

    //邵阳娄底放炮罚不需要算手牌胡息
    if(MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA || MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA){
        return score;
    }
    
    //耒阳手牌也要算胡息
    if(off == 0){
        var cardArr = MjClient.HandCardArr;
        score +=  MjClient.majiang.getHandHuxi(cardArr);
    }
    return score;
}

//设置转盘显示状态
function IsArrowVisible_leiyang(){
    var pl = getUIPlayer_leiyang(0);
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
function ShowEatActionAnim_leiyang(node, actType, off){
    var delayTime = 1;
    switch(actType)
    {
        case ActionType_leiyang.FANXING:
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
    eatActionNode.visible = true;
    switch(actType)
    {
        case ActionType_leiyang.CHI:

            eatActionChild = eatActionNode.getChildByName("chi");
            eatActionChild.visible = true;
            eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
            break;

        case ActionType_leiyang.PENG:

            eatActionChild = eatActionNode.getChildByName("peng");
            eatActionChild.visible = true;
            eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
            break;

        case ActionType_leiyang.WEI:
            eatActionChild = eatActionNode.getChildByName("wei");
            //耒阳不叫啸叫偎
            eatActionChild.loadTexture("playing/paohuzi/t_wei.png");
            eatActionChild.visible = true;
            eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
            break;

        case ActionType_leiyang.HU:
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ){
                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.removeAllChildren();
                eatActionChild.visible = true;
                var projNode = createSpine("spine/zipaiHu/skeleton.json", "spine/zipaiHu/skeleton.atlas");
                projNode.setAnimation(0, 'animation', false);
                projNode.setPosition(50,50);
                projNode.setScale(0.5);
                projNode.setTimeScale(0.75);
                eatActionChild.addChild(projNode,999999);
            }else{
                eatActionChild = eatActionNode.getChildByName("hu");
                eatActionChild.visible = true;
            }
            break;
        case ActionType_leiyang.PAO:
            eatActionChild = eatActionNode.getChildByName("pao");
            eatActionChild.visible = true;
            eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
            break;
        case ActionType_leiyang.TI:

            eatActionChild = eatActionNode.getChildByName("ti");
            //耒阳不叫倾叫提
            eatActionChild.loadTexture("playing/paohuzi/t_ti.png");
            eatActionChild.visible = true;
            eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
            break;
        case ActionType_leiyang.WANGDIAO:
            eatActionChild = eatActionNode.getChildByName("wangDiao");
            eatActionChild.visible = true;
            eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
            break;
        case ActionType_leiyang.WANGCHUANG:
            eatActionChild = eatActionNode.getChildByName("wangChuang");
            eatActionChild.visible = true;
            eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
            break;
        case ActionType_leiyang.XIAHUO:
            eatActionChild = eatActionNode.getChildByName("xiahuo");
            eatActionChild.visible = true;
            eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
            break;
        case ActionType_leiyang.FANXING:
            eatActionChild = eatActionNode.getChildByName("fanxing");
            eatActionChild.visible = true;
            eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
            break;
        case ActionType_paohuzi.GENXING:
            eatActionChild = eatActionNode.getChildByName("genxing");
            eatActionChild.visible = true;
            eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
            break;
    }
}

//显示玩家信息
function showPlayerInfo_leiyang(off, node){
    //var tData = MjClient.data.sData.tData;
    var pl = getUIPlayer_leiyang(off);
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

function resetChiParam_leiyang(){

}

function setChiVisible_leiyang(){
    var eat = MjClient.playui.jsBind.eat;
    eat.chi._node.visible = false;
    eat.peng._node.visible = false;
    eat.hu._node.visible = false;
    eat.guo._node.visible = false;
    eat.cancel._node.visible = false;
    eat.wangDiao._node.visible = false;
    eat.wangChuang._node.visible = false;
    eat.wangZha._node.visible = false;
    eat.chiSelect._node.visible = false;
    eat.biSelect._node.visible = false;
    eat.biSelect1._node.visible = false;

    eat.chi._node.setTouchEnabled(false);
    eat.peng._node.setTouchEnabled(false);
    eat.hu._node.setTouchEnabled(false);
    eat.guo._node.setTouchEnabled(false);
    eat.cancel._node.setTouchEnabled(false);
    eat.wangDiao._node.setTouchEnabled(false);
    eat.wangChuang._node.setTouchEnabled(false);
    eat.wangZha._node.setTouchEnabled(false);
    eat.chiSelect._node.setTouchEnabled(false);
    eat.biSelect._node.setTouchEnabled(false);
    eat.biSelect1._node.setTouchEnabled(false);
}

function showSelectEatCards_leiyang(node,cardNum){
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
    addEatCards_leiyang(parent,cardArr,putCard);
}

//添加可以吃的牌
function addEatCards_leiyang(node,handCardArr,putCard){
    var chiBg = node.getChildByName("chiSelect");
    chiBg.x = cc.winSize.width * 0.5;
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
            cardNode.loadTexture(MjClient.cardPath_leiyang+"out" + card + ".png");
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
                setChiVisible_leiyang();
                HZChiToServer_leiyang(chiArr,null);
            }else{
                var biSet = MjClient.majiang.getBiCards(tmpHandCardArr,putCard);
                if(biSet && biSet.length > 0){
                    addFirstBiCards_leiyang(node,biSet,putCard,tmpHandCardArr,chiArr);
                }
            }
        });
    }
}

//添加第一个比牌
function addFirstBiCards_leiyang(node,biSet,putCard,handCardArr,chiArr){
    var biBg = node.getChildByName("biSelect");
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
            cardNode.loadTexture(MjClient.cardPath_leiyang+"out" + card + ".png");
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
                    addSecBiCards_leiyang(node,biSet,putCard,tmpHandCardArr,chiArr,biArr);
                }
            }else{
                setChiVisible_leiyang();
                HZChiToServer_leiyang(chiArr,[biArr]);
            }
        });
    }

    var isScale = true;
    if(MjClient.playui.jsBind.eat.biSelect.hasShow){
        isScale = false;
    }
    var chiBg = node.getChildByName("chiSelect");
    biBg.scale = chiBg.scale;
    doMoveCenterAction([chiBg,biBg],isScale);
}

//添加第二个比牌
function addSecBiCards_leiyang(node,biSet,putCard,handCardArr,chiArr,firstBiArr){
    var biBg = node.getChildByName("biSelect1");
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
            cardNode.loadTexture(MjClient.cardPath_leiyang+"out" + card + ".png");
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
            setChiVisible_leiyang();
            HZChiToServer_leiyang(chiArr,[firstBiArr,biArr]);
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
    doMoveCenterAction([chiBg,biBg0,biBg],isScale);
}

function GetReadyVisible_leiyang(node, off) {
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

    var pl = getUIPlayer_leiyang(off);
    if (pl && pl.mjState == TableState.isReady && tData.tState != TableState.waitJoin) {
        node.visible = true;
    } else {
        node.visible = false;
    }

    return node.visible;
}

//设置玩家掉线头像
function setUserOffline_leiyang(node, off){
    var pl = getUIPlayer_leiyang(off);
    if(!pl){
        return;
    }

    // 离线自己不可见
    if (off == 0) {
        node.getChildByName("head").getChildByName("offlineBg").visible = false;
        node.getChildByName("head").getChildByName("offline").visible = false;
        return;
    }

    node.getChildByName("head").getChildByName("offlineBg").visible = !pl.onLine;
    //    node.getChildByName("head").getChildByName("offline").y = 80;
    // node.getChildByName("head").getChildByName("offline").zIndex = 99;
    node.getChildByName("head").getChildByName("offline").visible = !pl.onLine;
}

//显示玩家文字
function showUserChat_leiyang(node, off, msg){
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
            //     if (tData.maxPlayer == 3)
            //         MjClient.Scene.addChild(new showDistance3PlayerLayer());
            //     else if(tData.maxPlayer != 2)
            //         MjClient.Scene.addChild(new showDistanceLayer());
            // }
        }

        return;
    }

    var pl = getUIPlayer_leiyang(off);
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
            playEffect(GameSound4Chat[voiceType][getRandomRange(0,GameSound4Chat[voiceType].length-1)] + musicnum, false, pl.info.sex);
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
function curPlayerIsMe_leiyang(off){
    if(MjClient.data.sData.tData.maxPlayer == 2 && off >= 2){
        return false;
    }
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if(tData.tState == TableState.waitReady){
        return false;
    }
    var selfIndex = tData.uids.indexOf(SelfUid());
    selfIndex = (selfIndex + off)%MjClient.MaxPlayerNum_leiyang;
    return selfIndex == tData.curPlayer;
}

function getVisablePlayerCount_leiyang(){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var count = 0;
    for(var i = 0;i < uids.length;i++){
        if(uids[i] != 0){
            count ++;
        }
    }
    return count;
}

/**
 * 获取醒家相对我的位置偏移 (醒家和我的距离) uids下标的差
 * @return {number} [description]
 */
function getXingPlayerIndex_leiyang(){
    if(MjClient.MaxPlayerNum_leiyang != 4){
        return -1;
    }
    if(getVisablePlayerCount_leiyang() < 3){
        return -1;
    }
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var zhuang = tData.zhuang;
    if(zhuang == -1){
        zhuang = 0;
    }
    var xingIndex = (zhuang + 2 + MjClient.MaxPlayerNum_leiyang) % MjClient.MaxPlayerNum_leiyang;
    var selfIndex = tData.uids.indexOf(SelfUid());
    xingIndex = (xingIndex - selfIndex + MjClient.MaxPlayerNum_leiyang) % MjClient.MaxPlayerNum_leiyang;
    return xingIndex;
}

/**
 * 获取 我和off的距离（我和off在uids的下标的差） (如果醒家,醒家传过来的off固定是2)
 * @param  {number} off 在ui层上的位置 (down=0 right=1 left/top=3 xing=2)
 * @return {number} 返回偏移后的resoff  则 selfIndex 和 off位置的玩家 的距离,
 *                  提供 getUIPlayer_leiyang(resoff) 获取 off位置玩家数据
 */
function getOffByXing_leiyang(off){
    var resOff = off
    if(MjClient.MaxPlayerNum_leiyang != 4){
        return resOff;
    }
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var zhuang = tData.zhuang;
    //当庄还没确定的时候
    if(zhuang == -1){
        zhuang = 0;
    }
    var xingIndex = (zhuang + 2 + MjClient.MaxPlayerNum_leiyang) % MjClient.MaxPlayerNum_leiyang;
    //开局之后的判断
    var selfIndex = tData.uids.indexOf(SelfUid());
    if(selfIndex == xingIndex){ // xing为off固定为2， 参数off
        resOff = (2 + off) % MjClient.MaxPlayerNum_leiyang;
    }else{
        // 如果我的下家是醒家，且是ui层传过来的是位置是1 则跳过
        if((selfIndex + 1 + MjClient.MaxPlayerNum_leiyang) % MjClient.MaxPlayerNum_leiyang == xingIndex && off == 1){
            resOff = off + 1;

            // 如果我的上家是醒家，且是ui层传过来的是位置是3 则跳过
        }else if((selfIndex -1 + MjClient.MaxPlayerNum_leiyang) % MjClient.MaxPlayerNum_leiyang == xingIndex
            && off == MjClient.MaxPlayerNum_leiyang - 1){
            resOff = off - 1;

            // 如果我的上家是醒家, 且 传过来的是位置是2 , (发表情时发的是2）
        }else if( off==2 ){
            if((selfIndex + 1 + MjClient.MaxPlayerNum_leiyang) % MjClient.MaxPlayerNum_leiyang == xingIndex ){
                resOff = 1;
            }
            if((selfIndex - 1 + MjClient.MaxPlayerNum_leiyang) % MjClient.MaxPlayerNum_leiyang == xingIndex ){
                resOff = 3;
            }
        }
    }
    return resOff;
}

//重新开始后，重置MjClient.HandCardArr
function resetHandAfterBegin_leiyang(){
    var sData = MjClient.data.sData;
    var pl = sData.players[SelfUid() + ""];
    if(pl.mjState == TableState.isReady){
        MjClient.HandCardArr = [];
    }
}


/*
 设置弃胡状态
 */
function setQiHuState_leiyang()
{
    var pl = getUIPlayer_leiyang(0);
    if (pl.isQiHu) {
        var _skipHuIconNode = MjClient.playui._downNode.getChildByName("head").getChildByName("skipHuIconTag");
        _skipHuIconNode.visible = true;
    }
}


function changeMJBg_leiyang(node, type)
{
    if (node.toString() == "[object ImageView]") {
        var oldFile = node.getRenderFile().file;
        var newFile = getNewMJBgFile_leiyang(oldFile, type);

        if (newFile != oldFile) {
            node.loadTexture(newFile);
        }
    }

    var childArray = node.getChildren();
    for(var index in childArray)
    {
        var child = childArray[index];
        changeMJBg_leiyang(child, type);
    }
}

function getNewMJBgFile_leiyang(oldFile, type)
{
    if (oldFile.indexOf("playing/paohuzi/") == -1)
        return oldFile;

    if (type == undefined)
        type = getCurrentMJBgType();

    var newFile = "";
    if (type == 0) {
        if (oldFile.indexOf("playing/paohuzi/MJBg1/") != -1){
            newFile = oldFile.replace("/MJBg1", "");
            MjClient.cardPath_leiyang = "playing/paohuzi/";
        }else if (oldFile.indexOf("playing/paohuzi/MJBg2/") != -1){
            newFile = oldFile.replace("/MJBg2", "");
            MjClient.cardPath_leiyang = "playing/paohuzi/";
        }
    }
    else if (type == 1) {
        if (oldFile.indexOf("/MJBg1") != -1)
            ;
        else if (oldFile.indexOf("/MJBg2") != -1){
            newFile = oldFile.replace("playing/paohuzi/MJBg2/", "playing/paohuzi/MJBg1/");
            MjClient.cardPath_leiyang = "playing/paohuzi/MJBg1/";
        }
        else if (oldFile.indexOf("playing/paohuzi/") != -1) {
            newFile = oldFile.replace("playing/paohuzi/", "playing/paohuzi/MJBg1/");
            MjClient.cardPath_leiyang = "playing/paohuzi/MJBg1/";
        }
    }
    else if (type == 2 && MjClient.getAppType() != MjClient.APP_TYPE.QXLYQP) {
        if (oldFile.indexOf("/MJBg2") != -1)
            ;
        else if (oldFile.indexOf("playing/paohuzi/MJBg1/") != -1){
            newFile = oldFile.replace("/MJBg1", "/MJBg2");
            MjClient.cardPath_leiyang = "playing/paohuzi/MJBg2/";
        }
        else if (oldFile.indexOf("playing/paohuzi/") != -1) {
            newFile = oldFile.replace("playing/paohuzi/", "playing/paohuzi/MJBg2/");
            MjClient.cardPath_leiyang = "playing/paohuzi/MJBg2/";
        }
    }

    if (newFile != "" && !jsb.fileUtils.isFileExist(newFile)) {
        newFile = "";
    }

    return newFile != "" ? newFile : oldFile;
}

function getOtherWeiCards(card) {
    var sData = MjClient.data.sData;
    for(var uid in sData.players){
        if(Number(uid) != SelfUid()){
            var pl = sData.players[uid + ""];
            var mjSortArr = pl.mjsort;
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

function setHuCardMark(card){
    var huMark = ccui.ImageView("playing/paohuzi/hu.png");
    huMark.setPosition(cc.p(card.width-10,card.height-10));
    card.addChild(huMark);
}

/**
* 单选组件
* @param  {array} nodes 多个CheckBox节点组成的列表
* @param  {Function} callback 点击组件后的回调 默认值:空
* @param  {number} defaultIndex 默认选择的节点 默认值:0
* @return {obj} 返回单选组件的实例
*         var radioNode = createRadioBoxForCheckBoxs([node0, node1], function(index){}, 0);
*/
function createRadioBoxForCheckBoxs_leiyang(nodes, callback, defaultIndex){
    var newobj = {};

    newobj._nodeList = nodes;
    newobj._selectIndex = defaultIndex || -1;
    newobj._callback = callback || function(){};

    for (var i in newobj._nodeList){
        var item = newobj._nodeList[i];
        item._index = i;
        item.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    newobj.selectItem(sender._index);
                    newobj._callback(sender._index, sender, newobj._nodeList);
                    break;
            }
        }, item);
    }

    newobj.selectItem = function(index){
        index = Number(index);
        if(index >= newobj._nodeList.length){
            return;
        }

        if(index != newobj._selectIndex){
            for(var j in newobj._nodeList){
                if(parseInt(j) != index){
                    newobj._nodeList[j].setSelected(false);
                }else if(parseInt(j) == index){
                    newobj._nodeList[j].setSelected(true);
                    newobj._selectIndex = parseInt(j);
                }
            }

        }else{
            if(newobj._nodeList[index]){
                newobj._nodeList[index].setSelected(false);
                newobj._selectIndex = -1
            }
        }
    }

    newobj.getSelectItem = function(){
        return newobj._nodeList[newobj._selectIndex];
    }

    newobj.getSelectIndex = function(){
        return newobj._selectIndex;
    }

    newobj.setSelectCallBack = function(callback){
        newobj._callback = callback;
    }

    newobj.selectItem(newobj._selectIndex);

    return newobj;
}
// 向服务器发送过牌
function HZPassConfirmToServer_leiyang() {
    if (MjClient.rePlayVideo != -1)  {
        return; // 回放时候不能请求
    }

    var tData = MjClient.data.sData.tData;
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJPass",
        eatFlag: EatFlag_leiyang(),
        cardNext: tData.cardNext,
        card: tData.lastPutCard
    });
}
