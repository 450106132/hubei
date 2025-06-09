// 通用斗地主

var GameOverLayer_DoudizhuHBTY =  GameOverLayer_Poker.extend({
    ctor: function() {
        this._super();
    },

    _infoText : function (){
        var sData=MjClient.data.sData;
        var tData=sData.tData;
        var text = "";//GameCnName[MjClient.gameType];

        if (0) {
            text += "-" + tData.maxPlayer + "人\n";
            var roundNumPre = typeof(tData.roundNumPre) != "undefined" ? tData.roundNumPre : tData.roundNum;
            text += "房号：" + tData.tableid
            if (roundNumPre && tData.roundAll - tData.roundNumPre + 1 <= tData.roundAll)
            {
                var extraNum = tData.extraNum ? tData.extraNum:0;
                text += " 局数：" + (tData.roundAll - tData.roundNumPre + 1 + extraNum) + "/" + tData.roundAll;
            }
                
            text += "\n";
            if(MjClient.roundEndTime)
                text += MjClient.roundEndTime + "";
        } else {
            var strPayWay = "";
            switch (tData.areaSelectMode.payWay)
            {
                case 0:
                    strPayWay = ",房主付";
                    break;
                case 1:
                    strPayWay = ",AA付";
                    break;
                case 2:
                    strPayWay = ",大赢家付";
                    break;
            }
            text += strPayWay;

            if(tData.areaSelectMode.zhafengding != null)
            {
                if(tData.areaSelectMode.zhafengding <= 0)
                {
                    text +=  ",不封顶";
                }
                else
                {
                    text += ","+tData.areaSelectMode.zhafengding+"炸封顶";
                }
            }


            switch (tData.areaSelectMode.jifengding)
            {
                case 3:
                    text += ",3级封顶";
                    break;
                case 5:
                    text += ",5级封顶";
                    break;
                case 0:
                    text += ",不封顶";
                    break;
            }
            if(tData.areaSelectMode.beishufengding)
            {
                text +=  "," + tData.areaSelectMode.beishufengding+ "倍封顶 ";
            }
            text += tData.areaSelectMode.koudi? ",扣底加级" : "";
            text += tData.areaSelectMode.zhuangdanjiabei? ",庄家单打赢双倍" : "";
            text += tData.areaSelectMode.bijiaoShuangwang ? ",双王必叫" : "";
            text += tData.areaSelectMode.bijiaoSigeer ? ",4个2必叫" : "";
            text += tData.areaSelectMode.bijiaoWangshuanger ? ",王+双2必叫" : "";
            text += tData.areaSelectMode.bijiaoZhadan ? ",炸弹必叫" : "";
            text += tData.areaSelectMode.daiti ? ",带踢" : "";
            text += tData.areaSelectMode.sidaier ? ",四带二" : "";
            text += tData.areaSelectMode.yingjiaxianchu ? ",赢家先出" : "";
            text += tData.areaSelectMode.difen ? "," + tData.areaSelectMode.difen + "积分底分" : "";
            text += tData.areaSelectMode.jiabei ? ",加倍" : "";
            text += tData.areaSelectMode.sidaisi ? ",四带两对" : "";
            
            if(tData.areaSelectMode.sandai != null && typeof(tData.areaSelectMode.sandai) == "number"){
                var str = "";
                switch (tData.areaSelectMode.sandai) {
                    case 0:
                        str = ",三带一";
                        break; 
                    case 1:
                        str = ",三带一对";
                        break;
                    case 2:
                        str = ",三带一+三带一对";
                        break;  
                }
                text += str;
            }

            // text += ",房间号:";
            // text += tData.tableid;
            var clubInfoTable = getClubInfoInTable();
            if (clubInfoTable){
                //需求：海安、晋中、南通 对于俱乐部牌局，在大结算、大结算分享图中，增加显示，亲友圈ID，并显示对应的玩法名称【是会长建立玩法时设定的玩法名称】
                if(MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
                    isJinZhongAPPType() ||
                    MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ){
                    text += ",亲友圈ID:";
                    text += clubInfoTable.clubId;
                    if(clubInfoTable.ruleName){
                        text = text+"（"+unescape(clubInfoTable.ruleName)+"）";
                    }
                }
            }
        }

        return text;
    },

    getPlayInfo: function(){
        return this._infoText();
    },
    
    setListInfo: function(node, _listInfo){
        var listView = node;
        var pl = _listInfo.pl;
        // var winCount = _listInfo.winCount;
        // var loseCount = _listInfo.loseCount;
        // var loseScore = _listInfo.loseScore;
        // var winScore = _listInfo.winScore;


        var tableMsg = pl.roomStatistics;
        if(!tableMsg)
            tableMsg = [0,0,0,0,0];

        for(var i = 0 ; i < tableMsg.length; i++)
        {
            listView.pushBackDefaultItem();
            var children = listView.children;
            var insertItem = children[children.length-1];
            insertItem.getChildByName("title").setString("第" + (i+1) + "局");
            var scoreLabel = insertItem.getChildByName("score");
            scoreLabel.ignoreContentAdaptWithSize(true);

            if(tableMsg[i])
            {
                scoreLabel.setString(tableMsg[i]+"");
            }
            else {
                scoreLabel.setString("0");
            }
        }
    },
    
});

var actionZindex = 1000;
var PlayLayer_doudizhuHBTY = cc.Layer.extend({
    ctor: function () {
        this._super();
        var playui = ccs.load(res.Play_doudizhuHBTY_json);
        MjClient.MaxPlayerNum = parseInt(MjClient.data.sData.tData.maxPlayer);
        playMusic("doudizhu/table_background_music");
        MjClient.playui = this;
        MjClient.sortClassType = 0; //必不可少，会影响到banner上花色的正确显示
        MjClient.playui.node = playui.node;
        MjClient.playui.putCardType = 1;//  出牌方式 1 滑动出牌 2 提示出牌

        MjClient.playui.initUI();
        MjClient.playui.initTagList();
        MjClient.playui.hideAllUI();

        MjClient.playui.initHeadWget();
        var tState = MjClient.data.sData.tData.tState;
        MjClient.playui.initData(tState == TableState.roundFinish ? true : false);
        MjClient.playui.initClockWget();
        MjClient.playui.initClickEvent();
        MjClient.playui.initMsgEvent();
        MjClient.playui.initOnce();

        this.addChild(playui.node);
        //触摸事件监听注册
        cc.eventManager.addListener(cc.EventListener.create(this.handleCardsTouchListener()), this._downNode);
        MjClient.lastMJTick = Date.now();
        this.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function () {
            if (MjClient.game_on_show) {
                MjClient.tickGame(0);
            }
        }), cc.delayTime(7))));
        return true;
    },
    onEnterTransitionDidFinish: function () {
        this._super();
    },

    onExit: function () {
        this._super();
    },
});

// =========================[[ 判断 ]] =========================

PlayLayer_doudizhuHBTY.prototype.isJD = function () {
    var _diZhuType = MjClient.data.sData.tData.areaSelectMode.diZhuType;
    return (MjClient.data.sData.tData.areaSelectMode.type == "jingdian") || _diZhuType == 1;
};

PlayLayer_doudizhuHBTY.prototype.isRoundEnd = function () {
    var tState = MjClient.data.sData.tData.tState;
    return tState == TableState.waitReady || tState == TableState.roundFinish || tState == TableState.waitJoin || tState == TableState.isReady;
}

// 检查出牌是否合法
PlayLayer_doudizhuHBTY.prototype.isCanPutCards = function (putCards) {
    if (!this.isSDataValid()) {
        return false;
    }
    var tData = MjClient.data.sData.tData;
    if (!IsTurnToMe() || tData.tState != TableState.waitPut) {
        return false;
    }
    if (putCards == null) {
        putCards = this.handCardsWgetArr[0].getUpCardArr();
    }
    if (putCards.length == 0) {
        return false;
    }
    var pl = getUIPlayer(0);
    if (!pl) {
        return false;
    }
    var isNotFirst = tData.lastPutPlayer != tData.curPlayer && tData.lastPutPlayer != -1;
    var lastPutCards = isNotFirst ? tData.lastPutCard : null;
    var ret = MjClient.majiang.checkPut(pl.mjhand, putCards, lastPutCards)
    return ret != null;
};

// =========================[[ 出牌 ]] =========================

//出牌提示
PlayLayer_doudizhuHBTY.prototype.showTipCards = function () {
    this.handCardsWgetArr[0].clearCardsUpStatus();
    var length = this.cardTipsArr.length;
    if (length <= 0) {
        return;
    }

    if (this.cardTipsArr[this.tipsIdx] == null) {
        this.tipsIdx = 0;
    }
    var tipsCardArray = this.cardTipsArr[this.tipsIdx].slice();
    this.handCardsWgetArr[0].liftCardUp(tipsCardArray);
    this.tipsIdx++;
    MjClient.playui.putCardType = 2;
    var tData = MjClient.data.sData.tData;
    var isFirst = !(tData.lastPutPlayer != tData.curPlayer && tData.lastPutPlayer != -1);
    MjClient.playui.handlePutCardBtn(true, isFirst);
    MjClient.playui.enablePutCardBtn(true);
}

// 处理斗地主智能提牌
PlayLayer_doudizhuHBTY.prototype.handleDoudizhuCardsAutoUp = function (bTouchMove) {
    if (!this.isSDataValid()) {
        return ;
    }
    var tData = MjClient.data.sData.tData;
    if (!IsTurnToMe() || tData.tState != TableState.waitPut) {
        return;
    }
    var upSelectCards = this.handCardsWgetArr[0].getUpCardArr();
    if (upSelectCards.length == 0) {
        return;
    }
    if (!this.isValidAutoUpCards) {
        return;
    } // 智能提牌已经失效
    var pl = getUIPlayer(0);
    if (!pl) {
        return ;
    }
    var data = {};
    if (tData.lastPutPlayer == tData.curPlayer || tData.lastPutPlayer == -1) {// 首出
        data = MjClient.majiang.calAutoPutCardWithFirstOut(upSelectCards, pl.mjhand);
        this.isValidAutoUpCards = false;
    } else { // 接牌
        var lastPutType = MjClient.majiang.calType(tData.lastPutCard);
        if (lastPutType == MjClient.majiang.CARDTPYE.danpai) {
            return;
        } // 单牌不做自动提示
        data = MjClient.majiang.calAutoPutCards(bTouchMove, this.cardTipsArr, upSelectCards, tData.lastPutCard, pl.mjhand);
    }

    if (!data.hasCardToUp) {
        return;
    }
    this.handCardsWgetArr[0].clearCardsUpStatus();
    this.handCardsWgetArr[0].liftCardUp(data.tSelectCards);
    this.isValidAutoUpCards = false;
};

PlayLayer_doudizhuHBTY.prototype.handleCardsTouchListener = function () {
    return {
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: false,                       // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
        onTouchBegan: function (touch, event) {
            var pl = getUIPlayer(0);
            if (!pl) return false;
            if (pl.mjState == TableState.roundFinish) { //已经完成
                return false;
            }
            var flag = MjClient.playui.handleTouchCards(touch, event, true);
            if (!flag) {
                MjClient.playui.handCardsWgetArr[0].clearCardsUpStatus();
                MjClient.playui.isValidAutoUpCards = true;
                var tmp = IsTurnToMe();
                cc.log("touchbegan" + tmp);
                if (tmp == null) {
                    return;
                }
                MjClient.playui.enablePutCardBtn(false);
            }
            return flag;
        },
        onTouchMoved: function (touch, event) {         // 触摸移动时触发
            MjClient.playui.handleTouchCards(touch, event, false);
            if (!MjClient.playui.isSDataValid()) {
                return ;
            }
            if (MjClient.data.sData.tData.curPlayer == null || !cc.isFunction(MjClient.playui.handCardsWgetArr[0].handleTouchMoveOutOfRange)) {
                return;
            }
            MjClient.playui.handCardsWgetArr[0].handleTouchMoveOutOfRange(MjClient.playui.firstMouseIn, MjClient.playui.lastMouseIn);
        },
        onTouchEnded: function (touch, event) {         // 点击事件结束处理
            playEffectInPlay("clickCards");
            if (Math.abs(MjClient.playui.lastMouseIn - MjClient.playui.firstMouseIn + 1) >= 2) {
                MjClient.playui.bTouchMove = true;
            }
            MjClient.playui.putCardType = 1;
            if (MjClient.data.sData.tData.curPlayer == null || !cc.isFunction(MjClient.playui.handCardsWgetArr[0].handleTouchMoveOutOfRange)) {
                return;
            }
            MjClient.playui.handCardsWgetArr[0].updatePostionInMoveRange(MjClient.playui.firstMouseIn, MjClient.playui.lastMouseIn);
            MjClient.playui.handleDoudizhuCardsAutoUp(MjClient.playui.bTouchMove);
            MjClient.playui.enablePutCardBtn(MjClient.playui.isCanPutCards());
        }
    };
};

// 处理点击
PlayLayer_doudizhuHBTY.prototype.handleTouchCards = function (touch, event, isBegan) {
    MjClient.playui.bTouchMove = !isBegan;
    var lastMouseIn = MjClient.playui.handCardsWgetArr[0].getSelectCardsIdx(touch.getLocation());
    if (lastMouseIn > -1) {
        MjClient.playui.lastMouseIn = lastMouseIn;
        MjClient.playui.firstMouseIn = isBegan ? lastMouseIn : MjClient.playui.firstMouseIn;
        return true;
    }
    return false;
};

// 处理玩家提起提起得牌，保留正确的牌
PlayLayer_doudizhuHBTY.prototype.handleUpRightCards = function (isFirst, off) {
    if (isFirst) {
        return;
    }
    var upSelectCards = this.handCardsWgetArr[off].getUpCardArr();
    var tCards = MjClient.playui.isCanPutCards(upSelectCards);
    if (tCards == null) {
        this.handCardsWgetArr[off].clearCardsUpStatus();
    }
}

// =========================[[ 流程 ]] =========================
// 断线重连/初始化
PlayLayer_doudizhuHBTY.prototype.dealInitSceneData = function () {
    if (!this.isSDataValid()) {
        return ;
    }
    var tData = MjClient.data.sData.tData;
    var tState = tData.tState;
    MjClient.playui.showRoundInfo();
    MjClient.playui.initData(tState == TableState.roundFinish ? true : false);
    var isRoundEnd = MjClient.playui.isRoundEnd()
    for (var i = 0; i < this.headOffLen; i++) {
        var off = this.headOffArr[i];
        MjClient.playui.handleNoPutTag(off, false);
        MjClient.playui.handleJiabeiTag(off, 0);
        MjClient.playui.dealQiangDizhuText(off, false);
        if (!isRoundEnd) {
            continue;
        }
        this.handCardsWgetArr[off].removeAllCards();
        this.deskCardsWgetArr[off].removeAllCards();
    }
    MjClient.playui.handleDifen();
    MjClient.playui.setTextMult(tState != TableState.waitJoin && tState != TableState.waitReady);
    // 发牌、叫地主、发底牌、加注、等待出牌
    MjClient.playui.handleMjHand();
    var player = getUIPlayer(0);
    if (player &&
        tData.zhuang == -1 &&
        tData.tState == TableState.waitJiazhu &&
        player.mjState == TableState.waitJiazhu &&
        player.info.uid == tData.uids[tData.curPlayer]) {
        //todo 判断当前出牌玩家
        MjClient.playui.dealWaitJiaodizhu({mustJiao: tData.mustJiao});
    }

    MjClient.playui.dealDiCards(tData.zhuang, tData.diCards, {}, false, false);
    MjClient.playui.dealWaitJiazhu({zhuang: tData.zhuang});

    for (var i = 0; i < this.headOffLen; i++) {
        var off = this.headOffArr[i];
        var pl = getUIPlayer(off);
        if (pl == null) continue;
        MjClient.playui.dealMJJiazhu(true, off, 0, tData.curPlayer);
    }
    if (!isRoundEnd && tData.lastPutCard != null && tData.lastPutCard.length > 0) {
        var off = getOffByIndex(tData.lastPutPlayer);

        this.deskCardsWgetArr[off].addPutCards(tData.lastPutCard);
    }

    this.setVisibleJiaoFenText();
    MjClient.playui.dealWaitPut();
};

PlayLayer_doudizhuHBTY.prototype.dealChangePKImg = function () {
    MjClient.playui.handleDoudizhuDiCards();
    this.handCardsWgetArr[0].changPkImageBack(getCurrentPKImgType());
    for (var i = 0; i < this.headOffLen; i++) {
        var off = this.headOffArr[i];
        this.deskCardsWgetArr[off].changPkImageBack(getCurrentPKImgType());
    }
};

// 结算
PlayLayer_doudizhuHBTY.prototype.dealRoundEnd = function (eD) {
    if (!this.isSDataValid()) {
        return ;
    }
    MjClient.playui.jiaoFen = MjClient.data.sData.tData.minJiaofen;

    var zhuang = MjClient.data.sData.tData.zhuang;
    var rate = MjClient.data.sData.tData.rate;
    MjClient.playui.initData(true);
    MjClient.clockNode.visible = false;
    var self = MjClient.playui.node;
    function delayExe() {
        MjClient.playui.dealInitSceneData();
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        if (sData.tData.roundNum <= 0) {
            if (!tData.matchId) {
                self.addChild(new GameOverLayer_DoudizhuHBTY(), 500);
            } else {
                self.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function () {
                    self.addChild(new GameOverLayer_DoudizhuHBTY(), 500);
                })))
            }
        }
        self.addChild(new EndOneView_doudizhuHBTY(zhuang, rate), 500);
    }
    var time = MjClient.data.sData.tData.roundNum <= 0 ? 0.2 : 1;
    var Anitime = MjClient.playui.AniLayer.getAniTime();
    if (Anitime) {
        time = Anitime;
    }
    this.runAction(cc.sequence(cc.DelayTime(time), cc.callFunc(delayExe)));
    MjClient.playui.killTimeClock();
};

// 过、准备
PlayLayer_doudizhuHBTY.prototype.dealPKPass = function (eD) {
    MjClient.playui.killTimeClock();
    var off = getUiOffByUid(eD.uid);
    MjClient.playui.handleNoPutTag(off, true);
    MjClient.playui.handleNoPutTips(false);
}
// 出牌
PlayLayer_doudizhuHBTY.prototype.dealPKPut = function (msg) {
    cc.log("----------dealpkput");
    var tData = MjClient.data.sData.tData;
    tData.rate = msg.rate;
    MjClient.playui.setTextMult(true);
    //隐藏出牌按钮
    MjClient.playui.handleHimtAndNoPutBtn(false);
    MjClient.playui.handlePutCardBtn(false);
    var index = tData.uids.indexOf(msg.uid);
    var off = getOffByIndex(index);
    if (msg.autoSend || msg.uid != SelfUid() || MjClient.rePlayVideo != -1) {
        MjClient.playui.dealPKPutcard(off, msg);
    }
    if (msg.uid == SelfUid() && MjClient.rePlayVideo == -1) { //正常打牌会出现少牌的情况，这里做验证，回放不用验证
        var pl = getUIPlayer(0);
        if (pl && this.handCardsWgetArr[0].countCards() != pl.handCount) {
            this.handCardsWgetArr[0].initHandCards();
        }
    }
    var pl = getUIPlayer(off);
    if (pl == null) {
        return;
    }
    if (pl.handCount == 1) {
        playEffectInPlay("singer");
    }
}

// 等待出牌
PlayLayer_doudizhuHBTY.prototype.dealWaitPut = function (eD) {
    var tData = MjClient.data.sData.tData;
    if (tData.tState != TableState.waitPut) {
        MjClient.playui.handleNoPutTips(false);
        MjClient.playui.handleHimtAndNoPutBtn(false);
        MjClient.playui.handlePutCardBtn(false);
        MjClient.playui.handlePassBtn(false);
        return;
    }
    this.isValidAutoUpCards = true;
    var off = getOffByIndex(tData.curPlayer);
    this.deskCardsWgetArr[off].removeAllCards();
    var isMe = off == 0;
    var isNotFirst = tData.lastPutPlayer != tData.curPlayer && tData.lastPutPlayer != -1;
    this.cardTipsArr = [];
    if (isMe) {
        var pl = getUIPlayer(0);
        if (pl) {
            if (!isNotFirst) {
                tData.lastPutCard = null;
            }
            this.cardTipsArr = MjClient.majiang.tipCards(pl.mjhand, tData.lastPutCard);
            this.tipsIdx = 0;
        }
    }
    MjClient.playui.handleNoPutTips(isMe && isNotFirst && this.cardTipsArr.length == 0);
    MjClient.playui.handleNoPutTag(off, false);
    MjClient.playui.handleUpRightCards(!isNotFirst, off);
    this.isCardsSend = false;
    var isFirstPut = tData.lastPutPlayer == -1 ? true : false;

    if (isFirstPut) {
        var autofunc = function () {
            MjClient.playui.startTimeClock(MjClient.playui.clockNumberUpdate);
            MjClient.playui.handleHimtAndNoPutBtn(isMe, isNotFirst);
            MjClient.playui.handlePutCardBtn(isMe, !isNotFirst);
            MjClient.playui.enablePutCardBtn(MjClient.playui.isCanPutCards());
        }
        MjClient.playui.node.runAction(cc.sequence(cc.DelayTime(1.0), cc.callFunc(autofunc)));
        return;
    }
    MjClient.playui.node.stopAllActions();
    MjClient.playui.startTimeClock(MjClient.playui.clockNumberUpdate);
    var isCanPut = !(isMe && isNotFirst && this.cardTipsArr.length == 0);
    if (isCanPut) {
        MjClient.playui.handleHimtAndNoPutBtn(isMe, isNotFirst);
        MjClient.playui.handlePutCardBtn(isMe, !isNotFirst);
        MjClient.playui.enablePutCardBtn(MjClient.playui.isCanPutCards());
        MjClient.playui.handlePassBtn(false);
    } else {
        MjClient.playui.handlePassBtn(true);
    }

};

// 等待叫地主
PlayLayer_doudizhuHBTY.prototype.dealWaitJiaodizhu = function (msg) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if ((tData.tState != TableState.waitJiazhu && tData.tState != TableState.waitCard) || tData.zhuang != -1) {
        MjClient.playui.setHuanLeBtnVisible(false);
        MjClient.playui.setJingDianBtnVisible(false);
        return;
    }
    //服务端单发
    var index = tData.uids.indexOf(SelfUid());
    var off = getOffByIndex(index);
    var node = getNode_cards(off);
    var diZhuTag = node.getChildByName("jiaodizhuTag");
    diZhuTag.visible = false;
    if (!MjClient.playui.isJD()) {
        //欢乐斗地主
        MjClient.playui.setHuanLeBtnVisible(true);
    } else {  //经典斗地主
        MjClient.playui.setJingDianBtnVisible(true, true, tData.minJiaofen, msg.mustJiao);
    }
    
    // tData.curPlayer = msg.curPlayer;
    // var off = getOffByIndex(msg.curPlayer);
    // var node = getNode_cards(off);
    // var diZhuTag = node.getChildByName("jiaodizhuTag");
    // diZhuTag.visible = false;
    // if (tData.uids[msg.curPlayer] == SelfUid()) {
    //     if (!MjClient.playui.isJD()) { //欢乐斗地主
    //         MjClient.playui.setHuanLeBtnVisible(true);
    //     } else {  //经典斗地主
    //         MjClient.playui.setJingDianBtnVisible(true, true, tData.minJiaofen, msg.mustJiao);
    //     }
    // } else {
    //     MjClient.playui.setHuanLeBtnVisible(false);
    //     MjClient.playui.setJingDianBtnVisible(false);
    // }
    // tData.rate = msg.rate;
    // MjClient.playui.setTextMult(true);
}

// 抢地主
PlayLayer_doudizhuHBTY.prototype.dealQiangDizhu = function (msg) {
    var tData = MjClient.data.sData.tData;
    if (msg.qiang) {
        tData.rate = msg.rate;
        MjClient.playui.setTextMult(true);
    }
    MjClient.playui.killTimeClock();
    MjClient.clockNode.visible = false;
    var index = tData.uids.indexOf(msg.uid);
    var off = getOffByIndex(index);
    MjClient.clockNode.visible = false;
    MjClient.playui.dealQiangDizhuText(off, true, msg);
    MjClient.playui.setHuanLeBtnVisible(false);
    MjClient.playui.setJingDianBtnVisible(false);
}

// 等待准备
PlayLayer_doudizhuHBTY.prototype.dealAllReady = function (bAllReady) {
    for (var i = 0; i < this.headOffLen; i++) {
        var off = this.headOffArr[i];
        MjClient.playui.handleAboutReady(off, bAllReady);
    }
};

// 加倍
PlayLayer_doudizhuHBTY.prototype.dealMJJiazhu = function (isSceneData, off, jiazhuNum, curPlayer) {
    var tData = MjClient.data.sData.tData;
    if (typeof (curPlayer) != "undefined") {
        tData.curPlayer = curPlayer;
    }
    var btmp = (tData.tState == TableState.waitJiazhu) ? jiazhuNum : 0;
    MjClient.playui.handleJiabeiTag(off, btmp);
    if (MjClient.playui.isJD() && tData.areaSelectMode.jiabei == 4) {
        this.headNode[off].setJiaBeiIcon(jiazhuNum == 4);
    } else {
        this.headNode[off].setJiaBeiIcon(jiazhuNum == 2);
    }

    if (!isSceneData) {
        playEffectInPlay(jiazhuNum == 1 ? "bujiabei" : "jiabei");
        MjClient.playui.dealQiangDizhuText(off, false);
        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dingwei", {
            uid: SelfUid(),
            gameType: MjClient.gameType
        });
    }
}
// 等待加倍
PlayLayer_doudizhuHBTY.prototype.dealWaitJiazhu = function (eD) {
    var tData = MjClient.data.sData.tData;
    tData.zhuang = eD.zhuang;
    var pl = getUIPlayer(0);
    if (!pl) {
        return ;
    }
    if (tData.tState != TableState.waitJiazhu || tData.zhuang == -1 || pl.jiazhuNum != 0) {
        return;
    }
    MjClient.playui.handleDifen();
    MjClient.playui.setHLJiabeiVisible(true);
}

// 处理手牌
PlayLayer_doudizhuHBTY.prototype.handleMjHand = function () {
    MjClient.playui.showGps();
    MjClient.playui.handleNoPutTips(false);
    MjClient.playui.dealAllReady();
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
        MjClient.playui.showRoundNum();
    } else {
        MjClient.playui.updateGameRound();

    }
    if (MjClient.rePlayVideo != -1) {
        MjClient.playui.showRoundInfo();
    }
    for (var i = 0; i < this.headOffLen; i++) {
        var off = this.headOffArr[i];
        MjClient.playui.dealQiangDizhuText(off, false);
        var pl = getUIPlayer(off);
        if (!pl) { continue ; }
        MjClient.playui.initUserHandUiDoudizhu(off);
        this.headNode[off].updateUserInfo(pl);
    }
}

// 处理底牌
PlayLayer_doudizhuHBTY.prototype.dealDiCards = function (zhuang, diCards, handCounts, isAddCards, isIconMove) {
    var tData = MjClient.data.sData.tData;
    tData.zhuang = zhuang;
    tData.diCards = diCards == null ? [] : diCards;
    var zhuangOff = getOffByIndex(zhuang);
    if (isAddCards) {
        MjClient.playui.addDiCardsToZhuang(zhuangOff);
    }
    MjClient.playui.handleDoudizhuDiCards();
    MjClient.playui.handleDifen();
    MjClient.clockNode.visible = false;
    for (var i = 0; i < this.headOffLen; i++) {
        var off = this.headOffArr[i];
        MjClient.playui.dealQiangDizhuText(off, false);
        var pl = getUIPlayer(off);
        var isZhuang = false;
        if (pl) {
            isZhuang = tData.uids[tData.zhuang] == pl.info.uid;
            pl.handCount = handCounts[pl.info.uid] ? handCounts[pl.info.uid] : pl.handCount;
        }
        this.headNode[off].showCurrentLeftCardCount(off != 0 ? pl : null, tData.areaSelectMode.showHandCount);
        this.headNode[off].setIconDiZhu(isZhuang);
        if (!isIconMove || zhuangOff != off) {
            continue;
        }
        var node = getNode_cards(off);
        var centerPos = node.convertToNodeSpace(cc.p(MjClient.size.width / 2, MjClient.size.height / 2));
        this.headNode[off].iconMoveToDiZhu(off, centerPos);
    }
}

// =========================[[ 小控件 ]] ========================

PlayLayer_doudizhuHBTY.prototype.updateUserHeadPosition = function (off, bRoundEnd) {
    var node = this.headParentNode[off];
    if (off == 0) {
        if (bRoundEnd) {
            setWgtLayout(node, [0.43, 0.43], [0.5, 0.24], [0, 0]);
        } else if (isIPhoneX()) {
            setWgtLayout(node, [0.43, 0.43], [0.09, 0.46], [0, 0]);
        } else {
            setWgtLayout(node, [0.43, 0.43], [0.041, 0.44], [0, 0]);
        }
    } else if (off == 1) {
        if (bRoundEnd) {
            setWgtLayout(node, [0.43, 0.43], [0.85, 0.53], [0, 0]);
        } else {
            setWgtLayout(node, [0.43, 0.43], [0.958, 0.75], [0, 0]);
        }
    } else if (off == 2) {
        if (bRoundEnd) {
            setWgtLayout(node, [0.43, 0.43], [0.14, 0.53], [0, 0]);
        } else if (isIPhoneX()) {
            setWgtLayout(node, [0.43, 0.43], [0.09, 0.75], [0, 0]);
        } else {
            setWgtLayout(node, [0.43, 0.43], [0.041, 0.75], [0, 0]);
        }
    } else if (off == 3) {
        setWgtLayout(node, [0.43, 0.43], [0.5, 0.5], [0, 0]);
    }
};

PlayLayer_doudizhuHBTY.prototype.updateTimes = function () {
    var times = this._banner.getChildByName("bg_time");
    var text = new ccui.Text();
    text.setFontName("fonts/lanting.TTF");
    text.setFontSize(24);

    text.setAnchorPoint(1, 0.5);
    text.setPosition(66, 12);
    times.addChild(text);
    text.schedule(function () {

        var time = MjClient.getCurrentTime();
        var str = (time[3] < 10 ? "0" + time[3] : time[3]) + ":" +
            (time[4] < 10 ? "0" + time[4] : time[4]);
        this.setString(str);
    });
};

//设置地区信息
PlayLayer_doudizhuHBTY.prototype.showGameName = function () {
    var gameName = this.node.getChildByName("gameName");
    setWgtLayout(gameName, [0.25, 0.25], [0.49, 0.58], [0, 0]);
    var text = GameBg[MjClient.gameType];
    gameName.loadTexture(text);
}
//添加还背景的功能
PlayLayer_doudizhuHBTY.prototype.addChangeBg = function () {
    var btnChange = ccui.Button("playing/gameTable/DDZ/btn_changeBg_normal.png", "playing/gameTable/DDZ/btn_changeBg_press.png");
    var btnSetting = this._banner.getChildByName("setting");

    btnChange.setPosition(btnSetting.x - 70, btnSetting.y);
    this._banner.addChild(btnChange);
    btnChange.addTouchEventListener(function (sender, type) {
        if (type == 2) {
            setCurrentGameBgTypeToNext();
            postEvent("changeGameBgEvent");
            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Pifu", {
                uid: SelfUid(),
                gameType: MjClient.gameType
            });
        }
    }, this);
};

PlayLayer_doudizhuHBTY.prototype.showVoice = function () {
    var voice_btn = this.node.getChildByName("voice_btn");
    initVoiceData();
    voice_btn.addTouchEventListener(function (sender, type) {
        if (type == 0) {
            startRecord();
        } else if (type == 2) {
            endRecord();
        } else if (type == 3) {
            cancelRecord();
        }
    });
    if (MjClient.MaxPlayerNum > 2) {
        setWgtLayout(voice_btn, [0.09, 0.09], [0.97, 0.3], [0, 3]);
    } else {
        setWgtLayout(voice_btn, [0.09, 0.09], [0.97, 0.2], [0, 4.2]);
    }
};

PlayLayer_doudizhuHBTY.prototype.addWaitNode = function () {
    if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
        this.waitNode = new PokerWaitNode_DoudizhuYongZhou();
        this.waitNode.handleYongZhouBtn();
    } else {
        this.waitNode = new PokerWaitNode_Doudizhu();
    }
    this.waitNode.node.setPosition(cc.p(0, 0));
    if (MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) {
        this.waitNode.selfDefineDisplayFriendButtons(0.3, 0.08, 0.2, 0);
    }
    MjClient.playui.node.addChild(this.waitNode.node);
};
PlayLayer_doudizhuHBTY.prototype.setWaitNodeVisible = function (bVisible) {
    if (!MjClient.playui.waitNode) {
        return;
    }
    MjClient.playui.waitNode.setVisible(bVisible);
}

PlayLayer_doudizhuHBTY.prototype.addAniLayer = function () {
    this.AniLayer = new Animature_doudizhu();
    this.AniLayer.setPosition(cc.p(0, 0));
    MjClient.playui.node.addChild(this.AniLayer, 450);
};

PlayLayer_doudizhuHBTY.prototype.showTableID = function (bShow) {
    var textTableId = this._banner.getChildByName("tableid");
    textTableId.ignoreContentAdaptWithSize(true);
    textTableId.setString("房间号  " + MjClient.data.sData.tData.tableid);
}
PlayLayer_doudizhuHBTY.prototype.showRoundNum = function () {
    var roundnumAtlas = this._banner.getChildByName("roundnumAtlas");
    roundnumAtlas.ignoreContentAdaptWithSize(true);
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var extraNum = tData.extraNum ? tData.extraNum:0;
    var str = (tData.roundAll-tData.roundNum + 1 + extraNum)+"/"+tData.roundAll + "局";
    roundnumAtlas.setString(str);
}
PlayLayer_doudizhuHBTY.prototype.setHLJiabeiVisible = function (bVisible) {
    var btnJiaBei = this.node.getChildByName("BtnJiabei");
    var btnBuJiaBei = this.node.getChildByName("Btnbujiabei");
    var tData = MjClient.data.sData.tData;
    var path = "playing/doudizhu/";
    if (MjClient.playui.isJD() && tData.areaSelectMode.jiabei == 4) {
        btnJiaBei.loadTextureNormal(path + "btnSuperjiabei.png");
        btnJiaBei.loadTexturePressed(path + "btnSuperjiabei.png");
    } else {
        btnJiaBei.loadTextureNormal(path + "btnjiabei.png");
        btnJiaBei.loadTexturePressed(path + "btnjiabei.png");
    }
    btnJiaBei.visible = bVisible;
    btnBuJiaBei.visible = bVisible;
    if (!bVisible) {
        return;
    }
    var d = isIPhoneX() ? 0.02 : 0;
    setWgtLayout(btnJiaBei, [0.14, 0.14], [0.6, 0.42 + d], [0, 0]);
    setWgtLayout(btnBuJiaBei, [0.14, 0.14], [0.4, 0.42 + d], [0, 0]);
}

// 出牌按钮
PlayLayer_doudizhuHBTY.prototype.handlePutCardBtn = function (isVisible, isFirst) {
    var btnPutCard = this.node.getChildByName("BtnPutCard");
    var tData = MjClient.data.sData.tData;
    isVisible = tData.tState == TableState.waitPut && isVisible;
    btnPutCard.visible = isVisible
    if (!isVisible) {
        return;
    }
    var d = isIPhoneX() ? 0.02 : 0;
    if (isFirst) {
        setWgtLayout(btnPutCard, [0.135, 0.128], [0.60, 0.43 + d], [0, 0]);
    } else {
        setWgtLayout(btnPutCard, [0.135, 0.128], [0.65, 0.43 + d], [0, 0]);
    }
    this.enablePutCardBtn(false);
};
PlayLayer_doudizhuHBTY.prototype.enablePutCardBtn = function (bAble) {
    var btnPutCard = this.node.getChildByName("BtnPutCard");
    if (!IsTurnToMe()) { return ;}
    if (!btnPutCard.visible) { return ;}
    btnPutCard.setBright(bAble);
    btnPutCard.setTouchEnabled(bAble);
}
//操作按钮(提示和不出) 
PlayLayer_doudizhuHBTY.prototype.handleHimtAndNoPutBtn = function (isVisible, isAble) {
    var btnHimt = this.node.getChildByName("BtnHimt");
    var btnNoPut = this.node.getChildByName("BtnNoPut");

    btnNoPut.visible = isVisible && isAble;;
    btnHimt.visible = isVisible;
    if (!isVisible) {
        return;
    }
    var d = isIPhoneX() ? 0.02 : 0;
    if (!isAble) {
        setWgtLayout(btnHimt, [0.135, 0.128], [0.40, 0.42 + d], [0, 0]);
    } else {
        setWgtLayout(btnHimt, [0.135, 0.128], [0.5, 0.42 + d], [0, 0]);
        setWgtLayout(btnNoPut, [0.135, 0.128], [0.35, 0.42 + d], [0, 0]);
    }
};

//经典斗地主叫分按钮
PlayLayer_doudizhuHBTY.prototype.setJingDianBtnVisible = function (bVisible, buJiaoAble, score, bmustjiao) {
    var btnBuJiaoJD = this.node.getChildByName("Btnbujiao_JD")
    btnBuJiaoJD.visible = bVisible;
    btnBuJiaoJD.setBright(bVisible);
    btnBuJiaoJD.setTouchEnabled(bVisible);

    var d = isIPhoneX() ? 0.02 : 0;

    if (bVisible) {
        setWgtLayout(btnBuJiaoJD, [0.135, 0.128], [0.29, 0.42 + d], [0, 0]);
        if (!MjClient.data.sData.tData.hasJiao) {
            var _res = (MjClient.playui.isJD() && MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) ?
            "playing/doudizhu/btn_buJiao.png" : "playing/doudizhu/buqiang.png";

            btnBuJiaoJD.loadTextureNormal(_res);
        } else {
            var _res = (MjClient.playui.isJD() && MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) ?
            "playing/doudizhu/btn_buJiao.png" : "playing/doudizhu/buqiangtongyong.png"

            btnBuJiaoJD.loadTextureNormal(_res);
        }
    }
    var arr = [0.43, 0.57, 0.71];
    for (var i = 0; i < 3; i++) {
        var tmp = i + 1;
        var btnFen = this.node.getChildByName("Btnfen" + tmp);
        if (btnFen == null) {
            continue;
        }
        btnFen.visible = bVisible;
        if (!bVisible) {
            continue;
        }

        setWgtLayout(btnFen, [0.135, 0.128], [arr[i], 0.42 + d], [0, 0]);
        if ((bmustjiao) && i < 2) {
            btnFen.setBright(false);
            btnFen.setTouchEnabled(false);
            btnBuJiaoJD.setBright(false);
            btnBuJiaoJD.setTouchEnabled(false);
        } else {
            btnFen.setBright(score < tmp);
            btnFen.setTouchEnabled(score < tmp);
        }

    }
}

//欢乐斗地主叫分按钮
PlayLayer_doudizhuHBTY.prototype.setHuanLeBtnVisible = function (bVisible) {
    var btnJiaoDiZhu = this.node.getChildByName("BtnJiaodizhu");
    var btnBuJiao = this.node.getChildByName("Btnbujiao");
    btnJiaoDiZhu.visible = bVisible;
    btnBuJiao.visible = bVisible;
    if (!bVisible) {
        return;
    }
    var d;
    if (isIPhoneX()) {
        d = 0.02;
    } else {
        d = 0;
    }
    setWgtLayout(btnJiaoDiZhu, [0.135, 0.128], [0.4, 0.42 + d], [0, 0]);
    setWgtLayout(btnBuJiao, [0.135, 0.128], [0.6, 0.42 + d], [0, 0]);
    if (!MjClient.data.sData.tData.hasJiao) {
        btnJiaoDiZhu.loadTextureNormal("playing/doudizhu/qiangdizhu.png");
        btnBuJiao.loadTextureNormal("playing/doudizhu/buqiang.png");
    } else {
        btnJiaoDiZhu.loadTextureNormal("playing/doudizhu/qiangdizhutongyong.png");
        btnBuJiao.loadTextureNormal("playing/doudizhu/buqiangtongyong.png");
    }
}

// 牌局信息
PlayLayer_doudizhuHBTY.prototype.showRoundInfo = function () {
    if (!this.isSDataValid()) {
        return ;
    }
    var nodeRoundInfo = this.node.getChildByName("round_info_node");
    var textRoundInfo = nodeRoundInfo.getChildByName("roundInfo");

    var tData = MjClient.data.sData.tData;

    var str = getPlaySelectPara(MjClient.gameType, tData.areaSelectMode);
    if (str.charAt(str.length - 1) == ",") {
        str = str.substring(0, str.length - 1);
    }
    var str2 = "剩余" + (tData.roundNum - 1) + "局";
    if (str.length > 0) {
        str2 += "," + str;
    }
    textRoundInfo.setFontName("fonts/fzcy.ttf");
    textRoundInfo.setString(str2);
    textRoundInfo.ignoreContentAdaptWithSize(true);
    setWgtLayout(nodeRoundInfo, [0.13, 0.13], [0.5, 0.5], [0, 0]);
};

// 局数
PlayLayer_doudizhuHBTY.prototype.updateGameRound = function () {
    var roundNum = this._banner.getChildByName("roundNum");
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var strgametype = MjClient.playui.isJD() ? "经典斗地主  " : "欢乐斗地主  ";

    var extraNum = tData.extraNum ? tData.extraNum:0;
    roundNum.setString(strgametype + (tData.roundAll - tData.roundNum + 1 + extraNum) + "/" + tData.roundAll);
    roundNum.ignoreContentAdaptWithSize(true);
}

// 加倍
PlayLayer_doudizhuHBTY.prototype.setTextMult = function (bShow) {
    var textMult = this._banner.getChildByName("Text_mult");
    textMult.ignoreContentAdaptWithSize(true);
    var str = bShow && MjClient.data.sData.tData.rate > 0 ? MjClient.data.sData.tData.rate + "" : "";
    textMult.setString(str);
    textMult.visible = bShow;
};
//加倍
PlayLayer_doudizhuHBTY.prototype.handleJiabeiTag = function (off, type) {
    var node = getNode_cards(off);
    var jiabeiTag = node.getChildByName("jiabeiTag");
    jiabeiTag.visible = type == 0 ? false : true;
    if (type == 0) {
        return;
    }
    if (off == 0) {
        setWgtLayout(jiabeiTag, [0.082, 0.082], [0.5, 0.32], [0, 1]);
    } else if (off == 1) {

        setWgtLayout(jiabeiTag, [0.082, 0.082], [1, 0.71], [-2.1, 0.5]);
    } else if (off == 2) {
        var dx = isIPhoneX() ? 0.5 : 0.2;
        setWgtLayout(jiabeiTag, [0.082, 0.082], [0.15, 0.71], [dx, 0.5]);
    }
    var jiabeistr;
    jiabeistr = (type == 2 || type == 4) ? "playing/doudizhu/tag_jiabei.png" : "playing/doudizhu/tag_nojiabei.png";
    var scaleData = MjClient.size.width / 74 * 0.08;
    jiabeiTag.setScale(scaleData, scaleData);
    jiabeiTag.ignoreContentAdaptWithSize(true);
    jiabeiTag.loadTexture(jiabeistr);

}

// 底分
PlayLayer_doudizhuHBTY.prototype.handleDifen = function () {
    var textDifen = this._banner.getChildByName("Text_difen");
    var tData = MjClient.data.sData.tData;

    var difen = (MjClient.playui.isJD() && MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ)? tData.minJiaofen : tData.difen;
    var fenStr = difen > 0 ? difen : "";
    textDifen.setString(fenStr);
    textDifen.ignoreContentAdaptWithSize(true);
}

PlayLayer_doudizhuHBTY.prototype.setVisibleJiaoFenText = function () {
    if ( !(MjClient.playui.isJD() && MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) || !this.isSDataValid()) {
        return ;
    }

    function showVisible(off){
        var tData = MjClient.data.sData.tData;
        var visible = (tData.tState == TableState.waitJiazhu || tData.tState == TableState.waitCard) && tData.zhuang == -1;
        var pl = getUIPlayer(off);
        if (visible) {
            visible = pl != null && pl.qiang != null && pl.qiang != 0;
        }
        var node = getNode_cards(off);
        var diZhuTag = node.getChildByName("jiaodizhuTag");
        diZhuTag.visible = visible;
        if (!visible) {
            return;
        }

        if (off == 0) {
            setWgtLayout(diZhuTag, [0.08, 0.08], [0.5, 0.38], [0, 0]);
        } else if (off == 1) {
            var px = MjClient.rePlayVideo == -1 ? 0.85 : 0.75;
            setWgtLayout(diZhuTag, [0.08, 0.08], [px, 0.75], [0, 0]);
        } else if (off == 2) {
            var tmpX = isIPhoneX() ? 0.20 : 0.16;
            var px = MjClient.rePlayVideo == -1 ? tmpX : 0.25;
            setWgtLayout(diZhuTag, [0.08, 0.08], [px, 0.75], [0, 0]);
        } else {
            cc.log("============增加 off=" + off + " 的逻辑======");
        }
        //todo 0.08为缩放比例，74为节点的原来宽度
        var scaleData = MjClient.size.width / 74 * 0.08;
        diZhuTag.setScale(scaleData, scaleData);
        diZhuTag.ignoreContentAdaptWithSize(true);
        if (pl.qiang > 0) {
            if (MjClient.playui.isJD()) {
                diZhuTag.loadTexture("playing/doudizhu/fen_" + pl.qiang + ".png");
            } else {
                var res = tData.hasJiao ? "playing/doudizhu/qiangdizhu2.png" : "playing/doudizhu/jiaodizhu.png";
                diZhuTag.loadTexture(res);
            }
        } else if (pl.qiang < 0){
            var _png = (MjClient.playui.isJD() && MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) ?
            "playing/doudizhu/bujiaofen.png" : "playing/doudizhu/bujiao.png";

            var res = tData.hasJiao ? "playing/doudizhu/buqiang2.png" : _png;
            diZhuTag.loadTexture("playing/doudizhu/bujiaofen.png" );
        }

        //if (!isPlayEffect) { return; }
        if (pl.qiang > 0) {
            if (MjClient.playui.isJD()) {
                playEffectInPlay("robDZScore" + pl.qiang.toString())
            } else {
                tData.hasJiao ? playEffectInPlay("robDZ") : playEffectInPlay("jiaodizhu");
            }
        } else {
            tData.hasJiao ? playEffectInPlay("notRobDZ") : playEffectInPlay("bujiao");
        }
    } 

    for (var i = 0; i < this.headOffLen; i++) {
        var off = this.headOffArr[i];
        var pl = getUIPlayer(off);
        if (pl == null) continue;
        showVisible(off);
    }
}


// 不抢/抢地主
PlayLayer_doudizhuHBTY.prototype.dealQiangDizhuText = function (off, visible, msg) {
    var node = getNode_cards(off);
    var diZhuTag = node.getChildByName("jiaodizhuTag");
    diZhuTag.visible = visible;
    if (!visible) {
        return;
    }
    if (off == 0) {
        setWgtLayout(diZhuTag, [0.08, 0.08], [0.5, 0.38], [0, 0]);
    } else if (off == 1) {
        var px = MjClient.rePlayVideo == -1 ? 0.85 : 0.75;
        setWgtLayout(diZhuTag, [0.08, 0.08], [px, 0.75], [0, 0]);
    } else if (off == 2) {
        var tmpX = isIPhoneX() ? 0.20 : 0.16;
        var px = MjClient.rePlayVideo == -1 ? tmpX : 0.25;
        setWgtLayout(diZhuTag, [0.08, 0.08], [px, 0.75], [0, 0]);
    } else {
        cc.log("============增加 off=" + off + " 的逻辑======");
    }
    //todo 0.08为缩放比例，74为节点的原来宽度
    var scaleData = MjClient.size.width / 74 * 0.08;
    diZhuTag.setScale(scaleData, scaleData);
    diZhuTag.ignoreContentAdaptWithSize(true);
    if (msg.qiang) {
        if (MjClient.playui.isJD()) {
            diZhuTag.loadTexture("playing/doudizhu/fen_" + msg.qiang + ".png");

            playEffectInPlay("robDZScore" + msg.qiang.toString());

            if( (MjClient.playui.isJD() && MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) && msg && msg.qiang == -1 ){
                 diZhuTag.loadTexture("playing/doudizhu/bujiaofen.png");
            }

        } else {
            msg.hasJiao ? playEffectInPlay("robDZ") : playEffectInPlay("jiaodizhu");
            var res = msg.hasJiao ? "playing/doudizhu/qiangdizhu2.png" : "playing/doudizhu/jiaodizhu.png";
            diZhuTag.loadTexture(res);
        }
    } else {
        msg.hasJiao ? playEffectInPlay("notRobDZ") : playEffectInPlay("bujiao");
        var _png = (MjClient.playui.isJD() && MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) ?
        "playing/doudizhu/bujiaofen.png" : "playing/doudizhu/bujiao.png";

        var res = msg.hasJiao ? "playing/doudizhu/buqiang2.png" : _png ;
        diZhuTag.loadTexture(res);
    }

}

// 要不起
PlayLayer_doudizhuHBTY.prototype.handleNoPutTag = function (off, visible) {
    var node = getNode_cards(off);
    var noPut = node.getChildByName("noPutTag");
    noPut.visible = visible;
    if (off == 0) {
        setWgtLayout(noPut, [0.117, 0], [0.5, 0.32], [0, 1]);
    } else if (off == 1) {
        var ox = MjClient.rePlayVideo == -1 ? -2.5 : -4.8;
        setWgtLayout(noPut, [0.117, 0], [1.12, 0.73], [ox, 0.5]);
    } else if (off == 2) {
        var ox = MjClient.rePlayVideo == -1 ? 0.05 : 1.6;
        var addx = isIPhoneX() ? 0.05 : 0;
        setWgtLayout(noPut, [0.117, 0], [0.17 + addx, 0.73], [ox, 0.5]);
    } else {
        cc.log("============增加 off=" + off + " 的逻辑======");
    }
}

// 没有大过上家
PlayLayer_doudizhuHBTY.prototype.handleNoPutTips = function (isVisible) {
    var noPutTips = this.node.getChildByName("noPutTips");
    noPutTips.visible = isVisible;
    if (!isVisible) {
        return;
    }

    setWgtLayout(noPutTips, [0.39, 0], [0.5, 0.1], [0, 0]);
};

// 没有大过上家
PlayLayer_doudizhuHBTY.prototype.handlePassBtn = function (isVisible) {
    var BtnPass = this.node.getChildByName("BtnPass");
    BtnPass.visible = isVisible;
    if (!isVisible) {
        return;
    }
    var d = isIPhoneX() ? 0.02 : 0;
    setWgtLayout(BtnPass, [0.135, 0.128], [0.5, 0.43 + d], [0, 0]);
};

// =========================[[ 系统 ]] ==========================
PlayLayer_doudizhuHBTY.prototype.dealSendVoice = function (fullFilePath) {
    if (!fullFilePath) {
        console.log("sendVoice No fileName");
        return;
    }
    var getFileName = /[^\/]+$/;
    var extensionName = getFileName.exec(fullFilePath);
    var fileName = extensionName[extensionName.length - 1];
    console.log("sfileName is:" + fileName);

    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "downAndPlayVoice",
        uid: SelfUid(),
        type: 3,
        msg: fileName,
        num: MjClient.data._JiaheTempTime//录音时长
    });
    MjClient.native.HelloOC("download file");
}

PlayLayer_doudizhuHBTY.prototype.dealDownAndPlayVoice = function (msg) {
    MjClient.native.HelloOC("downloadPlayVoice ok");
    MjClient.data._tempMessage = msg;
    MjClient.native.HelloOC("mas is" + JSON.stringify(msg));
    downAndPlayVoice(msg.uid, msg.msg);
}

PlayLayer_doudizhuHBTY.prototype.dealUploadRecord = function (filePath) {
    if (filePath) {
        MjClient.native.HelloOC("upload voice file");
        MjClient.native.UploadFile(filePath, MjClient.remoteCfg.voiceUrl, "sendVoice");
    } else {
        MjClient.native.HelloOC("No voice file update");
    }
};

// =========================[[ 界面 ]] ==========================

// 绘制手牌
PlayLayer_doudizhuHBTY.prototype.initUserHandUiDoudizhu = function (off) {
    var pl = getUIPlayer(off);
    if (pl == null) {
        return;
    }
    var tData = MjClient.data.sData.tData;
    var node = getNode_cards(off);
    if (tData.tState != TableState.waitPut &&
        tData.tState != TableState.waitEat &&
        tData.tState != TableState.waitCard &&
        tData.tState != TableState.waitJiazhu) {
        return;
    }
    this.handCardsWgetArr[off].initHandCards();
};

//处理出牌,打牌动作
PlayLayer_doudizhuHBTY.prototype.dealPKPutcard = function (off, msg) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if (off == 0 || MjClient.rePlayVideo != -1) { // 自己视角或回放
        this.handCardsWgetArr[off].removeHandCardByValueArr(msg.card);
    }

    this.deskCardsWgetArr[off].addPutCards(msg.card);
    if (!msg || !msg.noPlayEffect) {
        this.playAnimation(msg.card, off);
    }
    var pl = getUIPlayer(off);
    if (pl == null) {
        return;
    }
    if (off != 0) {
        this.headNode[off].showCurrentLeftCardCount(pl, tData.areaSelectMode.showHandCount);
    }
};

PlayLayer_doudizhuHBTY.prototype.playAnimation = function (cards, off) {
    var pl = getUIPlayer(off);
    if (!pl) { return ; }
    var pos = this.deskCardsWgetArr[off].getMiddleCardsPos();
    var nodePos = this.deskCardsWgetArr[off].node.convertToWorldSpaceAR(pos);
    var cardType = MjClient.majiang.cardsType(cards);
    this.AniLayer.loadCardTypeAni(cardType, nodePos, off, pl.isChunTian);
}

// 增加底牌
PlayLayer_doudizhuHBTY.prototype.addDiCardsToZhuang = function (zhuangOff) {
    var tData = MjClient.data.sData.tData;
    if (tData.diCards.length == 0) {
        return;
    }
    if (zhuangOff == 0 || MjClient.rePlayVideo != -1) {
        this.handCardsWgetArr[zhuangOff].addCardsForHand(tData.diCards)
    }
};

// 处理准备字准备相关
PlayLayer_doudizhuHBTY.prototype.handleAboutReady = function (off, bAllReady) {
    var isFull = !IsInviteVisible();
    var pl = getUIPlayer(off);
    if (off < 0 || pl == null) {
        if (off >= 0) {
            var imgReady = getNode_cards(off).getChildByName("ready");
            imgReady.visible = false;
        }
        return;
    }
    if (!this.isSDataValid()) {
        return false;
    }
    var tData = MjClient.data.sData.tData;
    var isShowText = isFull && pl.mjState == TableState.isReady && tData.tState != TableState.waitJoin && !bAllReady;
    if (off == 0) {
        MjClient.playui.setWaitNodeVisible(!isFull);
        var btnReady = MjClient.playui.node.getChildByName("BtnReady");
        var isShow = isFull && pl.mjState == TableState.waitReady;
        btnReady.visible = isShow;
        if (isShow) {
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                setWgtLayout(btnReady, [0.16, 0], [0.5, 0.37], [0, 0]);
            }
            else {
                setWgtLayout(btnReady, [0.2, 0.2], [0.5, 0.37], [0, 0]);
            }
        }
    }
    var imgReady = getNode_cards(off).getChildByName("ready");
    imgReady.visible = isShowText;
    if (!isShowText) {
        return;
    }
    var arr = [[0, -1.5], [3.5, 0.5], [-3.5, 0.5]];
    var arr2 = [[0, -1.5], [-2, 0.5], [2, 0.5]];
    var arrPos = [[0.5, 0.46], [0.98, 0.73], [0.02, 0.73]];
    var tData = MjClient.data.sData.tData;
    var roundNum = tData.roundAll - tData.roundNum + 1;
    setWgtLayout(imgReady, [0.07, 0.07], (roundNum == 1 ? [0.5, 0.5] : arrPos[off]), (roundNum == 1 ? arr[off] : arr2[off]));

};

PlayLayer_doudizhuHBTY.prototype.startTimeClock = function (func) {
    var number = MjClient.clockNode.getChildByName("number");
    number.ignoreContentAdaptWithSize(true);
    number.setString("00");
    MjClient.playui.killTimeClock();
    var tData = MjClient.data.sData.tData;
    var off = getOffByIndex(tData.curPlayer);
    var cardNode = getNode_cards(off);
    var clockNode = cardNode.getChildByName("clocknode")
    MjClient.clockNode.setPosition(clockNode.getPosition());
    MjClient.clockNode.visible = true;
    if (tData.tState == TableState.waitPut && off == 0) {
        if (isIPhoneX()) {
            setWgtLayout(clockNode, [0.052, 0], [0.50, 0.24], [0, 3.0]);
        } else {
            setWgtLayout(clockNode, [0.052, 0], [0.50, 0.3], [0, 3.0]);
        }
    }
    if (func != undefined && func != null) {
        func(number);
    }
}

PlayLayer_doudizhuHBTY.prototype.killTimeClock = function () {
    MjClient.clockNode.getChildByName("number").stopAllActions();
    stopEffect(playTimeUpEff);
    playTimeUpEff = null;
};

PlayLayer_doudizhuHBTY.prototype.clockNumberUpdate = function (node, endFunc) {
    return arrowbkNumberUpdate(node, endFunc);
}

PlayLayer_doudizhuHBTY.prototype.checkRoomUiDelete = function () {
    if (MjClient.rePlayVideo != -1) return; //回放的时候，不弹解散窗口
    if (!this.isSDataValid()) {
        return ;
    }
    var sData = MjClient.data.sData;
    if (sData.tData.delEnd != 0 && !MjClient.delroomui) {
        MjClient.Scene.addChild(new RemoveRoomView());
        if (MjClient.webViewLayer != null) {
            MjClient.webViewLayer.close();
        }
    } else if (sData.tData.delEnd == 0 && MjClient.delroomui) {
        MjClient.delroomui.removeFromParent(true);
        delete MjClient.delroomui;
    }
    if (MjClient.gemewaitingui) {
        MjClient.gemewaitingui.removeFromParent(true);
        delete MjClient.gemewaitingui;
    }
    if (cc.sys.isObjectValid(MjClient.playerChatLayer)) {
        MjClient.playerChatLayer.removeFromParent(true);
        delete MjClient.playerChatLayer;
    }
}

PlayLayer_doudizhuHBTY.prototype.showGps = function () {
    if (MjClient.endoneui != null) {
        MjClient.endoneui.removeFromParent(true);
        MjClient.endoneui = null;
    }
    if (!this.isSDataValid()) {
        return ;
    }
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    if (tData.roundNum != tData.roundAll) return;
    var pls = sData.players;
    var ip2pl = {};
    for (var uid in pls) {
        var pi = pls[uid];
        var ip = pi.info.remoteIP;
        if (ip) {
            if (!ip2pl[ip]) ip2pl[ip] = [];
            ip2pl[ip].push(unescape(pi.info.nickname));
        }
    }
    var ipmsg = [];
    for (var ip in ip2pl) {
        var ips = ip2pl[ip];
        if (ips.length > 1) {
            ipmsg.push("玩家:" + ips.join("，") + "为同一IP地址。")
        }
    }
};

// 地主的三张牌
PlayLayer_doudizhuHBTY.prototype.handleDoudizhuDiCards = function () {
    var cards = MjClient.data.sData.tData.diCards;
    var isShow = cards != null && cards.length > 0;
    var diCardsNum = 3;
    for (var i = 0; i < diCardsNum; i++) {
        var cardNode = this._banner.getChildByName("dizhuCards_" + i);
        if (!isShow) {
            cardNode.removeAllChildren();
            cardNode.loadTexture("playing/cardPic2/beimian_puke.png");
        } else {
            setCardSprite_card(cardNode, cards[i], false);
        }
    }
}
// =========================[[ 事件 ]] ==========================

PlayLayer_doudizhuHBTY.prototype.dealMJTick = function (eD) {
    for (var i = 0; i < this.headOffLen; i++) {
        var off = this.headOffArr[i];
        var pl = getUIPlayer(off);
        if (!pl) { continue ; }
        this.headNode[off].setUserOffline(pl);
    }
}

PlayLayer_doudizhuHBTY.prototype.dealLogout = function () {
    if (MjClient.playui) {
        MjClient.addHomeView();
        MjClient.playui.removeFromParent(true);
        delete MjClient.playui;
        delete MjClient.endoneui;
        delete MjClient.endallui;
    }
}

PlayLayer_doudizhuHBTY.prototype.dealEndRoom = function (msg) {
    mylog(JSON.stringify(msg));
    if (msg.showEnd) {
        this.addChild(new GameOverLayer_DoudizhuHBTY(), 500);
    } else {
        MjClient.Scene.addChild(new StopRoomView());
    }
}

PlayLayer_doudizhuHBTY.prototype.dealLeaveGame = function () {
    MjClient.playui.killTimeClock();
    MjClient.addHomeView();
    MjClient.playui.removeFromParent(true);
    delete MjClient.playui;
    delete MjClient.endoneui;
    delete MjClient.endallui;
    cc.audioEngine.stopAllEffects();
    playMusic("bgMain");
}

PlayLayer_doudizhuHBTY.prototype.dealLoadWxHead = function (eD) {
    for (var i = 0; i < this.headOffLen; i++) {
        var off = this.headOffArr[i];
        if (eD.uid == getUIHeadByOff(off).uid) {
            this.headNode[off].setWxHead(true, eD.img);
        }
    }
}

PlayLayer_doudizhuHBTY.prototype.dealPlayVoice = function (msg) {
    for (var i = 0; i < this.headOffLen; i++) {
        var off = this.headOffArr[i];
        this.headNode[off].showUserChat(off, msg);
    }
}

PlayLayer_doudizhuHBTY.prototype.dealChangeGameBgEvent = function () {
    var back = MjClient.playui.node.getChildByName("back");
    var back2 = back.getChildByName("back");
    setWgtLayout(back2, [1, 1], [0.5, 0.5], [0, 0], true);
    changeGameBg(back2);
};

// 1 add 2 remove 3 online
PlayLayer_doudizhuHBTY.prototype.handlePlayerChange = function (action, uid) {
    if (!this.isSDataValid()) {
        return ;
    }
    var targetOff = -1;
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    if (action == 2 && uid != null) {
        var targetIndex = uids.indexOf(uid);
        if (targetIndex == -1) {
            targetIndex = uids.indexOf(0);
            //0是删除的位置。

        }
        targetOff = getOffByIndex(targetIndex);

    }
    var tData = MjClient.data.sData.tData;
    var roundNum = tData.roundAll - tData.roundNum + 1;
    var isRoundEnd = MjClient.playui.isRoundEnd() && (roundNum <= 1);
    for (var i = 0; i < this.headOffLen; i++) {
        var off = this.headOffArr[i];
        MjClient.playui.handleAboutReady(off);
        var node = getNode(off);
        var pl = null;

        if (targetOff != off) {
            pl = getUIPlayer(off);
        }
        this.headNode[off].updateUserInfo(pl);
        if (action == 3) {
            cc.log("lijmm==================playerchanger", isRoundEnd);
            MjClient.playui.updateUserHeadPosition(off, isRoundEnd);
        }
    }
}

PlayLayer_doudizhuHBTY.prototype.dealMoveHead = function () {
    var that = this;
    var fun1 = function () {
        MjClient.playui.dealAllReady(true);
    }
    var fun2 = function () {
        for (var i = 0; i < that.headOffLen; i++) {
            var off = that.headOffArr[i];
            var node = that.headParentNode[off];
            var srcPos = cc.p(node.x, node.y);
            MjClient.playui.updateUserHeadPosition(off, false);
            var nodePos = cc.p(node.x, node.y)
            node.setPosition(srcPos);
            node.runAction(cc.moveTo(0.3, nodePos).easing(cc.easeCubicActionOut()));
        }
    }
    MjClient.playui.node.runAction(cc.sequence(cc.callFunc(fun1), cc.callFunc(fun2)));
    sendGPS();
    MjClient.checkChangeLocationApp();
    postEvent("returnPlayerLayer");
}
// =========================[[ 消息 ]] ===========================
// 加倍
PlayLayer_doudizhuHBTY.prototype.sendJiaBeiToServer = function (beishu) {
    MjClient.playui.setHLJiabeiVisible(false);
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "MJJiazhu",
        jiazhuNum: beishu,
    });
}
// 叫地主、不叫、叫分
PlayLayer_doudizhuHBTY.prototype.sendQiangdizhuToServer = function (bQiang) {
    MjClient.playui.setJingDianBtnVisible(false);
    MjClient.playui.setHuanLeBtnVisible(false);
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "Qiangdizhu",
        qiang: bQiang
    });
};
// 出牌
PlayLayer_doudizhuHBTY.prototype.sendPutCardsToServer = function () {
    if (this.isCardsSend) {
        return;
    }
    ;
    var outCardArr = this.handCardsWgetArr[0].getUpCardArr();
    if (outCardArr.length <= 0) return;
    if (!MjClient.playui.isCanPutCards(outCardArr)) { // 出牌不合法
        return;
    }
    MjClient.playui.handleHimtAndNoPutBtn(false);
    MjClient.playui.handlePutCardBtn(false);
    MjClient.clockNode.visible = false;
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
        cmd: "PKPut",
        putCardType: MjClient.playui.putCardType,
        card: outCardArr,
        tingAfterPut: false
    });
    this.isCardsSend = true;
    MjClient.playui.dealPKPutcard(0, {card: outCardArr}); // 提前出牌
};

// 准备-1， 提示过牌0， 不出 1
PlayLayer_doudizhuHBTY.prototype.sendPassToServer = function (isActivePass) {
    this.handCardsWgetArr[0].clearCardsUpStatus();
    MjClient.gamenet.request("pkroom.handler.tableMsg", {cmd: "PKPass", activePass: isActivePass});
    if (isActivePass != -1) {
        //隐藏出牌按钮
        MjClient.playui.handleHimtAndNoPutBtn(false);
        MjClient.playui.handlePutCardBtn(false);
        MjClient.playui.handleNoPutTag(0, true);
        MjClient.playui.handleNoPutTips(false);
        MjClient.playui.handlePassBtn(false);
    }
}

// =========================[[ 初始化 ]] ==========================
PlayLayer_doudizhuHBTY.prototype.initTagList = function () {
    this.btnTagList = {
        BtnPutCard: 1,
        BtnHimt: 2,
        BtnNoPut: 3,
        BtnJiaodizhu: 4,
        Btnbujiao: 5,
        BtnReady: 6,
        BtnJiabei: 7,
        Btnbujiabei: 8,
        Btnbujiao_JD: 9,
        Btnfen1: 10,
        Btnfen2: 11,
        Btnfen3: 12,
        setting: 13,
        back_btn: 14,
        Button_1: 15,
        gps_btn: 16,
        chat_btn: 17,
        BtnPass:18
    };
}
PlayLayer_doudizhuHBTY.prototype.initData = function (isRoundEnd) {
    this.cardTipsArr = [];
    this.tipsIdx = 0;
    this.isCardsSend = false; // 判断是否已经出牌
    this.isValidAutoUpCards = true; // 斗地主提牌
    this.lastMouseIn = 0; //触碰中当前最后的一张牌
    this.firstMouseIn = 0;
    this.bTouchMove = false; //是否滑动出牌
    this.isDealInitScene = true; // 防止重启，会刷两遍 dealInitSceneData()
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
        MjClient.playui.showRoundNum();
    } else {
        MjClient.playui.updateGameRound();
    }
    if (!isRoundEnd || !this.isSDataValid()) {
        return;
    }
    var tData = MjClient.data.sData.tData;
    tData.diCards = [];
    tData.zhuang = -1;
    tData.minJiaofen = -1;
    tData.rate = 0;
    for (var i = 0; i < this.headOffLen; i++) {
        var off = this.headOffArr[i];
        var pl = getUIPlayer(off);
        if (pl == null) continue;
        pl.handCount = 0;
        pl.jiazhuNum = 0;
    }

}

PlayLayer_doudizhuHBTY.prototype.initOnce = function () {
    cc.log("=============initOnce=============");
    MjClient.playui.showRoundInfo();
    MjClient.playui.showVoice();
    MjClient.playui.dealChangeGameBgEvent();
    MjClient.playui.addChangeBg();
    MjClient.playui.addWaitNode();
    MjClient.playui.addAniLayer();
    MjClient.playui.showTableID();
    MjClient.playui.showGameName();
    MjClient.playui.updateTimes();
    if (!this.isDealInitScene) {
        MjClient.playui.dealInitSceneData();
        return;
    } else {
        this.isDealInitScene = false;
    }
};
PlayLayer_doudizhuHBTY.prototype.hideAllUI = function () {
    for (var off = 0; off < 4; off++) {
        var node = getNode_cards(off);
        if (off == 3) node.visible = false;
        var ready = node.getChildByName("ready");
        var noPutTag = node.getChildByName("noPutTag");
        var jiaodizhuTag = node.getChildByName("jiaodizhuTag");
        var jiabeiTag = node.getChildByName("jiabeiTag");
        ready.visible = false;
        noPutTag.visible = false;
        jiaodizhuTag.visible = false;
        jiabeiTag.visible = false;
    }
    var BtnPutCard = this.node.getChildByName("BtnPutCard");
    var BtnHimt = this.node.getChildByName("BtnHimt");
    var BtnNoPut = this.node.getChildByName("BtnNoPut");
    var BtnJiaodizhu = this.node.getChildByName("BtnJiaodizhu");
    var Btnbujiao = this.node.getChildByName("Btnbujiao");
    var BtnReady = this.node.getChildByName("BtnReady");
    var BtnJiabei = this.node.getChildByName("BtnJiabei");
    var Btnbujiabei = this.node.getChildByName("Btnbujiabei");
    var BtnPass = this.node.getChildByName("BtnPass");
    var noPutTips = this.node.getChildByName("noPutTips");
    BtnPutCard.visible = false;
    BtnHimt.visible = false;
    BtnNoPut.visible = false;
    BtnJiaodizhu.visible = false;
    Btnbujiao.visible = false;
    BtnReady.visible = false;
    BtnJiabei.visible = false;
    Btnbujiabei.visible = false;
    BtnPass.visible = false;
    noPutTips.visible = false;
}
PlayLayer_doudizhuHBTY.prototype.initUI = function () {
    this._downNode = this.node.getChildByName("down");
    this._rightNode = this.node.getChildByName("right");
    this._topNode = this.node.getChildByName("top");
    this._leftNode = this.node.getChildByName("left");
    this._AniNode = this.node.getChildByName("eat");
    this._banner = this.node.getChildByName("banner");
    this._jiazhuWait = this.node.getChildByName("jiazhuWait");
    var wifi = this._banner.getChildByName("wifi");
    updateWifiState(wifi);
    var powerBar = this._banner.getChildByName("powerBar");
    updateBattery(powerBar);
    var Button_1 = this._banner.getChildByName("Button_1");
    Button_1.visible = true;
    MjClient.clockNode = this.node.getChildByName("clock");
    setWgtLayout(MjClient.clockNode, [0.135, 0.128], [0.41, 0.40], [0, 0]);
    MjClient.clockNode.visible = false;
    this.clockNodePosX = MjClient.clockNode.getPositionX();
    this.clockNodePosY = MjClient.clockNode.getPositionY();
    var positionCard = this.node.getChildByName("positionCard");
    positionCard.visible = false;
    var btnChat = this.node.getChildByName("chat_btn");
    setWgtLayout(btnChat, [0.09, 0.09], [0.97, 0.1], [0, 4.1]);
    // setWgtLayout(this._banner, [0.27, 0.3], [0.5, 0.98], [0, 0]);
    var Pos = (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ? 0.52 : 0.5);
    setWgtLayout(this._banner, [0.27, 0.3], [Pos, 0.98], [0, 0]);

    var _Image_difenNode = this._banner.getChildByName("Image_difen");
    if( MjClient.playui.isJD() && MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ){
        _Image_difenNode.loadTexture("playing/doudizhu/difen_jinbi.png");
    }

    var gps_btn = this.node.getChildByName("gps_btn");
    setWgtLayout(gps_btn, [0.09, 0.09], [0.97, 0.1], [0, 3.0]);
    gps_btn.visible = MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ;
};

// 初始化节点
PlayLayer_doudizhuHBTY.prototype.initHeadWget = function () {
    this.headOffArr = [];
    this.headNode = {};
    this.AniMotion = [];
    this.handCardsWgetArr = {}
    this.deskCardsWgetArr = {}
    this.headParentNode = {}
    this.headOffLen = MjClient.MaxPlayerNum;
    for (var off = 0; off < 4; off++) {
        var _node = getNode(off);
        if (off == 3) {
            _node.visible = false;
            return;
        }
        var nodeStand = _node.getChildByName("stand_node");
        var nodeDeskCard = _node.getChildByName("deskCard");
        var head_node = _node.getChildByName("head");
        this.headParentNode[off] = head_node;
        this.headOffArr.push(off);
        var cardScale = isIPhoneX() ? 0.12:0.13;
        this.newHeadAndCardsNode(off, cardScale);
        
        head_node.addChild(this.headNode[off].node);
        this.headNode[off].node.setPosition(cc.p(64, 41.5));
        this.headNode[off].node.setScale(0.3);
        nodeStand.addChild(this.handCardsWgetArr[off].node);
        nodeDeskCard.addChild(this.deskCardsWgetArr[off].node);
        var play_tips = _node.getChildByName("play_tips");// 无用UI
        play_tips.visible = false;
        nodeStand.setAnchorPoint(0,0.5);
        if (off == 0) {
            setWgtLayout(nodeStand, [cardScale, 0], [0.0, 0.30], [0, 0]);
            if (isIPhoneX()) {
                setWgtLayout(nodeStand, [cardScale, 0], [0.0, 0.32], [0, 0]);
            }
            setWgtLayout(nodeDeskCard, [0.075, 0], [0.0, 0.55], [0, 0]);
        } else if (off == 1) {
            setWgtLayout(nodeStand, [0, 0.09], [0.85, 1.03], [0, 0]);
            setWgtLayout(nodeDeskCard, [0.075, 0], [0.88, 0.82], [0, 0]);
        } else if (off == 2) {
            setWgtLayout(nodeStand, [0, 0.09], [0.18, 0.88], [0, 0]);
            setWgtLayout(nodeDeskCard, [0.075, 0], [0.21, 0.82], [0, 0]);
        }
        if (!this.isSDataValid()) { continue ; }
        var tData = MjClient.data.sData.tData;
        var roundNum = tData.roundAll - tData.roundNum + 1;
        var isRoundEnd = MjClient.playui.isRoundEnd() && (roundNum <= 1);
        MjClient.playui.updateUserHeadPosition(off, isRoundEnd);
    }
}

PlayLayer_doudizhuHBTY.prototype.newHeadAndCardsNode = function (off, cardScale) {
    var classCard = PokerCardNode_DoudizhuSpecial;//MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ? PokerCardNode_Doudizhu : PokerCardNode_DoudizhuSpecial;
    if (MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) {
        this.headNode[off] = new PokerHeadNode_Doudizhulyg(off);
    } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ) {
        this.headNode[off] = new PokerHeadNode_DoudizhuXuZhou(off);
    } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
        this.headNode[off] = new PokerHeadNode_DoudizhuYueYang(off);
    } else if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
        this.headNode[off] = new PokerHeadNode_DoudizhuYongZhou(off);
    }
    this.handCardsWgetArr[off] = new classCard(off,cardScale);
    this.deskCardsWgetArr[off] = new classCard(off,cardScale);
}

//初始化玩家信息
PlayLayer_doudizhuHBTY.prototype.initMsgEvent = function () {
    // ================ 重连 =========================
    UIEventBind(null, this.node, "initSceneData", function (eD) {
        MjClient.playui.handlePlayerChange(3);
        MjClient.playui.checkRoomUiDelete();
        MjClient.playui.dealInitSceneData();
        if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
            checkCanShowDistance();
        }
    });
    // ================ 游戏流程 =========================
    UIEventBind(null, this.node, "waitReady", function (eD) {
        MjClient.playui.dealAllReady();
    });
    UIEventBind(null, this.node, "mjhand", function (eD) {
        if (MjClient.rePlayVideo != -1 && (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || 
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ)) {
            MjClient.data.sData.tData.roundNum = eD.tData.roundNum;
        }
        MjClient.playui.handleMjHand();
    });
    UIEventBind(null, this.node, "waitJiaodizhu", function (eD) {
        MjClient.playui.dealWaitJiaodizhu(eD);
    });
    UIEventBind(null, this.node, "Qiangdizhu", function (eD) {
        MjClient.playui.dealQiangDizhu(eD);
    });
    UIEventBind(null, this.node, "diCards", function (eD) {
        MjClient.playui.dealDiCards(eD.zhuang, eD.diCards, eD.handCounts, true, true);
    });
    UIEventBind(null, this.node, "waitJiazhu", function (eD) {
        MjClient.playui.dealWaitJiazhu(eD);
    });
    UIEventBind(null, this.node, "MJJiazhu", function (eD) {
        var off = getUiOffByUid(eD.uid);
        MjClient.playui.dealMJJiazhu(false, off, eD.jiazhuNum, eD.curPlayer);
    });
    UIEventBind(null, this.node, "waitPut", function (eD) {
        MjClient.playui.dealWaitPut(eD);
    });
    UIEventBind(null, this.node, "PKPut", function (eD) {
        MjClient.playui.dealPKPut(eD);
    });
    UIEventBind(null, this.node, "PKPass", function (eD) {
        MjClient.playui.dealPKPass(eD);
    });
    UIEventBind(null, this.node, "roundEnd", function (eD) {
        MjClient.playui.dealRoundEnd(eD);
    });
    // ================ 房间事件 =========================
    UIEventBind(null, this.node, "LeaveGame", function (eD) {
        MjClient.playui.dealLeaveGame();
    });
    UIEventBind(null, this.node, "DelRoom", function (eD) {
        MjClient.playui.checkRoomUiDelete();
    });
    UIEventBind(null, this.node, "endRoom", function (eD) {
        MjClient.playui.dealEndRoom(eD);
    });
    UIEventBind(null, this.node, "logout", function (eD) {
        MjClient.playui.dealLogout();
    });
    UIEventBind(null, this.node, "addPlayer", function (eD) {
        if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
            sendGPS();
        }
        MjClient.playui.handlePlayerChange(1, null);
    });
    UIEventBind(null, this.node, "removePlayer", function (eD) {
        if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
            checkCanShowDistance();
        }
        MjClient.playui.setWaitNodeVisible(IsInviteVisible());
        MjClient.playui.handlePlayerChange(2, eD.uid);
    });
    UIEventBind(null, this.node, "onlinePlayer", function (eD) {
        MjClient.playui.handlePlayerChange(3, null);
    });
    // ================ 界面 =============================
    UIEventBind(null, this.node, "returnPlayerLayer", function (eD) {
        MjClient.playui.visible = true;
    });
    UIEventBind(null, this.node, "changeGameBgEvent", function (eD) {
        MjClient.playui.dealChangeGameBgEvent();
    });
    UIEventBind(null, this.node, "loadWxHead", function (eD) {
        MjClient.playui.dealLoadWxHead(eD);
    });
    UIEventBind(null, this.node, "changePKImgEvent", function (eD) {
        MjClient.playui.dealChangePKImg();
    });

    UIEventBind(null, this.node, "moveHead", function (eD) {
        cc.log("lijm=========movehead");
        MjClient.playui.dealMoveHead();
    });
    // ================ 系统 =============================
    UIEventBind(null, this.node, "cancelRecord", function (eD) {
        MjClient.native.HelloOC("cancelRecord !!!");
    });
    UIEventBind(null, this.node, "uploadRecord", function (eD) {
        MjClient.playui.dealUploadRecord(eD);
    });
    UIEventBind(null, this.node, "sendVoice", function (eD) {
        MjClient.playui.dealSendVoice(eD);
    });
    UIEventBind(null, this.node, "downAndPlayVoice", function (eD) {
        MjClient.playui.dealDownAndPlayVoice(eD);
    });
    UIEventBind(null, this._banner, "nativePower", function (eD) {
        MjClient.playui._banner.getChildByName("powerBar").setPercent(Number(eD));
    });
    UIEventBind(null, this.node, "playVoice", function (eD) {
        MjClient.data._tempMessage.msg = eD;
        MjClient.playui.dealPlayVoice(MjClient.data._tempMessage);
    });
    UIEventBind(null, this.node, "MJChat", function (eD) {
        if ((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP  || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) && eD.type == 4) {
            //距离位置显示
            checkCanShowDistance();
        }
        MjClient.playui.dealPlayVoice(eD);
    });
    UIEventBind(null, this.node, "playerStatusChange", function (eD) {
        MjClient.playui.dealMJTick(eD);
    });
};

PlayLayer_doudizhuHBTY.prototype.initClickEvent = function () {
    var btnCallback = function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            MjClient.playui.btnEventListener(sender, type);
        }
    }
    var btnList1 = ["BtnPutCard", "BtnHimt", "BtnNoPut", "BtnJiaodizhu", "Btnbujiao",
        "BtnReady", "BtnJiabei", "Btnbujiabei", "Btnbujiao_JD", "Btnfen1", "Btnfen2", "Btnfen3", "gps_btn", "chat_btn", "BtnPass"];
    for (var i = 0; i < btnList1.length; i++) {
        MjClient.playui.btnBindCallBack(MjClient.playui.node, btnList1[i], this.btnTagList[btnList1[i]], btnCallback);
    }

    var btnList2 = ["setting", "Button_1"];
    for (var i = 0; i < btnList2.length; i++) {
        MjClient.playui.btnBindCallBack(MjClient.playui._banner, btnList2[i], this.btnTagList[btnList2[i]], btnCallback);
    }
};

PlayLayer_doudizhuHBTY.prototype.btnBindCallBack = function (parent, str, tag, callback) {
    var tmpNode = parent.getChildByName(str);
    tmpNode.tag = tag;
    tmpNode.addTouchEventListener(callback);
};

PlayLayer_doudizhuHBTY.prototype.btnEventListener = function (sender, type) {
    var tag = sender.getTag();
    if (tag == this.btnTagList.BtnPutCard) { // 出牌
        playEffectInPlay("playingCards");
        MjClient.playui.sendPutCardsToServer();
    } else if (tag == this.btnTagList.BtnHimt) { // 提示
        playEffect("guandan/tishi");
        MjClient.playui.showTipCards();
    } else if (tag == this.btnTagList.BtnPass) {
        playEffectInPlay("clickCards");
        MjClient.playui.sendPassToServer(1);
    } else if (tag == this.btnTagList.BtnNoPut) { // 不出
        playEffectInPlay("clickCards");
        MjClient.playui.sendPassToServer(1);
    } else if (tag == this.btnTagList.BtnReady) {
        MjClient.playui.sendPassToServer(-1);
        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Zhunbei", {
            uid: SelfUid(),
            gameType: MjClient.gameType
        });
    } else if (tag == this.btnTagList.BtnJiaodizhu || tag == this.btnTagList.Btnbujiao) { // 欢乐叫地主/不叫
        MjClient.clockNode.visible = false;
        MjClient.playui.sendQiangdizhuToServer(tag == this.btnTagList.BtnJiaodizhu);
    } else if (tag == this.btnTagList.Btnbujiao_JD || tag == this.btnTagList.Btnfen1 || tag == this.btnTagList.Btnfen2 || tag == this.btnTagList.Btnfen3) { // 经典
        MjClient.clockNode.visible = false;
        var score = {};
        score[this.btnTagList.Btnfen1] = 1;
        score[this.btnTagList.Btnfen2] = 2;
        score[this.btnTagList.Btnfen3] = 3;
        var _default = (MjClient.playui.isJD() && MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) ? -1 : 0;
        MjClient.playui.sendQiangdizhuToServer(score[tag] || _default);
    } else if (tag == this.btnTagList.BtnJiabei || tag == this.btnTagList.Btnbujiabei) { // 加倍 不加倍
        var rate;
        var tData = MjClient.data.sData.tData;
        if (MjClient.playui.isJD()) {
            if (tData.areaSelectMode.jiabei == 4) {
                //超级加倍
                rate = tag == this.btnTagList.Btnbujiabei ? 1 : 4;
            } else if (tData.areaSelectMode.jiabei == 2) {
                //加倍
                rate = tag == this.btnTagList.Btnbujiabei ? 1 : 2;
            }

        } else {
            rate = tag == this.btnTagList.Btnbujiabei ? 1 : 2;
        }
        MjClient.playui.sendJiaBeiToServer(rate);
    } else if (tag == this.btnTagList.setting) {
        var settringLayer = new SettingViewCard();
        settringLayer.setName("PlayLayerClick");
        MjClient.Scene.addChild(settringLayer);
        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi", {
            uid: SelfUid(),
            gameType: MjClient.gameType
        });
    } else if (tag == this.btnTagList.back_btn) {
        MjClient.showMsg("是否解散房间？", function () {
            MjClient.delRoom(true);
        }, function () {
        }, 1);
    } else if (tag == this.btnTagList.Button_1) {
        MjClient.openWeb({url: MjClient.GAME_TYPE.PAO_DE_KUAI, help: true});
    } else if (tag == this.btnTagList.gps_btn) {
        MjClient.Scene.addChild(new showDistance3PlayerLayer());
    } else if (tag == this.btnTagList.chat_btn) {
        var chatlayer = new ChatLayer();
        MjClient.Scene.addChild(chatlayer);
    }
};

// 初始化时钟节点
PlayLayer_doudizhuHBTY.prototype.initClockWget = function () {
    for (var off = 0; off < 4; off++) {
        var _node = getNode(off);
        var nodeClock = _node.getChildByName("clocknode");
        if (off == 0) {
            if (isIPhoneX()) {
                setWgtLayout(nodeClock, [0.052, 0], [0.50, 0.24], [0, 3.3]);
            } else {
                setWgtLayout(nodeClock, [0.052, 0], [0.50, 0.32], [0, 3.3]);
            }
        } else if (off == 1) {
            setWgtLayout(nodeClock, [0.052, 0], [0.82, 0.78], [0, 0]);
        } else if (off == 2) {
            setWgtLayout(nodeClock, [0.052, 0], [0.18, 0.78], [0, 0]);
        }
    }
}

PlayLayer_doudizhuHBTY.prototype.isSDataValid = function() {
    var sData = MjClient.data.sData;
    var strSData = JSON.stringify(sData);
    var pattern=new RegExp("tData");
    var res = pattern.exec(strSData);
    if (res == null) {
        return false;
    }
    return true;
}