

function SetEndOneUserUI_PaoDeKuaiTY(node, off) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;

    var selfindex = getPlayerIndex(0);
    off = MjClient.data.sData.tData.fieldId? (selfindex + off ): off;//金币场要求头像，第一个是自己，然后按出牌顺序排列
    off = off % 3;//MjClient.MaxPlayerNum;
    var pl = MjClient.getPlayerByIndex(off);

    node.setVisible(false);
    if (!pl) {
        // 二人玩时，显示剩余的底牌
        if(tData.otherCards) {
            node.setVisible(true);
            for(var i in node.children) {
                var child = node.children[i];
                child.setVisible(false);
            }

            //添加手牌
            var stand_other = node.getChildByName("stand_other");
            
            node.getChildByName("stand_other_desc").setVisible(true);
            node.getChildByName("stand_other_desc").ignoreContentAdaptWithSize(true);
            stand_other.setVisible(false)

            var stand = stand_other//head.getChildByName("stand");
            var offX = stand.x;
            var upSize = stand.getSize();
            var upS = stand.scale;


            var otrCards = MjClient.majiang.sortHandCards(tData.otherCards, 0);
            for (var i = 0; i < otrCards.length; i++) {
                var card = getNewCard_card(node, "stand_other", "mjhand", otrCards[i], 0);
                card.visible = true;
                card.enabled = false;
                card.setScale(0.48);
                if (i != 0) {
                    offX += upSize.width * upS * 0.4;//调牌的距离的
                    card.x = offX;//调牌的距离的
                }else {
                    card.x = offX + upSize.width * upS * 0.1;
                }

            }

        }
        return;
    }
    node.setVisible(true);
    setUserOfflineWinGamePanel(node,pl);
    node = node.getChildByName("head");

    // var zhuangNode = node.getChildByName("zhuang");
    // var tempZhuang = (typeof MjClient.preZhuang != 'undefined') ? MjClient.preZhuang : tData.zhuang;
    // zhuangNode.setVisible(tData.uids[tempZhuang] == pl.info.uid);
    // zhuangNode.zIndex=10;

    //add by sking
    var name = node.getChildByName("name");
    name.ignoreContentAdaptWithSize(true);


    var uibind = {
        head_bg: {
            _run:function()
            {
                this.ignoreContentAdaptWithSize(true);
            },
        },
        head: {
            name: {
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                },
                _text: function () {
                    var _nameStr = unescape(pl.info.nickname ) + "";
                    //this.ignoreContentAdaptWithSize(true);
                    return getNewName(_nameStr);
                }
            },
            id: {
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return "ID:" + pl.info.uid.toString();
                }
            },
            stand: {
                _visible: false,
                _run: function () {
                    var arry = [];
                    if (pl.mjhandRecord)
                    {
                        //添加手牌
                        for (var i = 0; i < pl.mjhandRecord.length; i++) {
                            var card = getNewCard_card(node, "stand", "mjhand", pl.mjhandRecord[i], 0);
                            arry.push(card);
                            // 如果是打出去的牌， 显示遮罩
                            if( pl.mjhand.indexOf(pl.mjhandRecord[i]) < 0) {
                                card.isGray = true;
                                card.setColor(MjClient.grayColor);
                            }
                        }
                    }

                    for (var i = 0; i < arry.length; i++) {
                        arry[i].visible = true;
                        arry[i].enabled = false;
                        arry[i].setScale(arry[i].getScale() * 0.75);
                    }
                    CardLayoutRestoreForEndOne_ty(node, pl);
                }
            }
        }
        , desc: {
            _visible: false,
            _run: function () {
                this.ignoreContentAdaptWithSize(true);
                if(pl.mjdesc.length > 0)    this.visible = true;
            },
            _text: function () {
                var str = '';

                var bMgrDis = false;
                if (MjClient.isDismiss) {
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    var p = sData.players[tData.firstDel];
                    if (!p) {
                        bMgrDis = true;
                    }
                }

                for(var i in pl.mjdesc) {
                    var istr = pl.mjdesc[i];
                    cc.log("gameover==mjdesc===", istr);
                    if( istr.length > 16 ) {if (bMgrDis)continue; else istr = '申请解散'};
                    if(str.length > 0)  str += '\n';
                    str += istr;
                }
                return str;
            },  
        }
        , desc0: {
            _visible: false,
            _run: function () {
                this.ignoreContentAdaptWithSize(true);
                if(pl.mjdesc0.length > 0)    this.visible = true;
            },
            _text: function () {
                var str = '';

                for(var i in pl.mjdesc0) {
                    var istr = pl.mjdesc0[i];
                    if(str.length > 0)  str += ',';
                    str += istr;
                }
                return str;
            },
        }
        , desc1: {
            _visible: false,
            _run: function () {
                this.ignoreContentAdaptWithSize(true);
                //if(pl.mjdesc1.length > 0)    this.visible = true;
                this.visible = false;
            },
            _text: function () {
                var str = '';

                for(var i in pl.mjdesc1) {
                    var istr = pl.mjdesc1[i];
                    if(str.length > 0)  str += '\n';
                    str += istr;
                }
                return str;
            },
        }
        , desc2: {
            _visible: false,
            _run: function () {
                this.ignoreContentAdaptWithSize(true);
                // if(pl.mjdesc2.length > 0)    this.visible = true;
                this.visible = false;
            },
            _text: function () {
                var str = '';

                for(var i in pl.mjdesc2) {
                    var istr = pl.mjdesc2[i];
                    if(str.length > 0)  str += '\n';
                    str += istr;
                }
                return str;
            },
        }
        , winNum1:{
            _visible: false,
            _run: function () {
                this.ignoreContentAdaptWithSize(true);
                if(pl.mjdescScore.length > 0 && Number(pl.mjdescScore) >= 0)
                {
                    this.visible = true;
                    this.setString(Math.abs(Number(pl.mjdescScore)) + "");
                }
            },
        }
        , winNum2:{
            _visible: false,
            _run: function () {
                this.ignoreContentAdaptWithSize(true);
                if(pl.mjdescScore.length > 0 && Number(pl.mjdescScore) < 0)
                {
                    this.visible = true;
                    this.setString(Math.abs(Number(pl.mjdescScore)) + "");
                }
            },
        }
    }
    BindUiAndLogic(node.parent, uibind);
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
     MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
        // 背景切换
        for(var i in pl.mjdesc2) {
            var str = pl.mjdesc2[i];
            var s_num = 0;
            if (str.indexOf("总分") != -1 ) {
                s_num = str.slice(str.indexOf(":") + 1);
                cc.log("jiangcw: s_num = " + s_num);
            }
            if (Number(s_num) > 0) {
                uibind.head_bg._node.loadTexture("gameOver/di_red.png");
            }
        }
        // 头像圆形裁剪
        var pl = MjClient.getPlayerByIndex(off);
        CircularCuttingHeadImg(uibind.head._node, pl);
    }
    else {
        addWxHeadToEndUI(uibind.head._node, off);
    }
    //uibind.winNum._node.y=uibind.head._node.y;
}

function CardLayoutRestoreForEndOne_PaoDeKuaiTY(node, plNode) {
    var layoutType = false;//默认排序
    var newVal = 0; //新牌的值，是几万，几筒，几条....为数字
    var pl; //player 信息

    pl = plNode;//获取玩家信息.off 为0 ，就是自己得信息，能看到自己摸牌 by sking
    var children = node.children;
    var tempMaJiang = MjClient.majiang; //麻将的各种方法判断，是否可以杠，是否可以吃... by sking

    //up stand 是2种麻将的图。
    var up = node.getChildByName("up");
    var stand = node.getChildByName("stand");
    var start;
    start = stand;
    var upSize = start.getSize();
    var upS = start.scale;
    //mjhand standPri out chi peng gang0 gang1
    var uipeng = [];
    var uigang0 = [];
    var uigang1 = [];
    var uichi = [];
    var uistand = [];
    var uihun = [];//癞子牌在最左边
    // var sData = MjClient.data.sData;
    // var tData = sData.tData;
    for (var i = 0; i < children.length; i++) //children 为 "down" 节点下的字节点
    {
        var ci = children[i];
        if (ci.name == "mjhand") {
            if (MjClient.data.sData.tData.hunCard == ci.tag) {
                uihun.push(ci);
            }
            else {
                uistand.push(ci);
            }

            if (MjClient.data.sData.tData.hunCard == ci.tag) {
                //ci.setColor(cc.color(255,255,63));
            }

            var _smallFlower = ci.getChildByName("cardType").getChildByName("smallFlower");
            if (_smallFlower) {
                _smallFlower.setPosition(22, 35)
            }

        }
        else if (ci.name == "standPri") {
            uistand.push(ci);
        }
        else if (ci.name == "mjhand_replay") {
            uistand.push(ci);
            var _smallFlower = ci.getChildByName("cardType").getChildByName("smallFlower");
            if (_smallFlower) {
                _smallFlower.setPosition(22, 35)
            }
        }
    }

    /*
     排序方式
     */
    var rankType = 1;//0 从小到大排序 ，1 按照算法排序
    var pro_rankType = false;
    if (!layoutType) {
        pro_rankType = false;
    }
    else {
        pro_rankType = true;
    }

    if (rankType == 0) {
        uistand.sort(TagOrder);
    }
    else {
        if (pl.mjhand.length > 0) {
            var mjhandPai = tempMaJiang.sortHandCards(pl.mjhand, pro_rankType);
            var cardCount = 0;
            var tempuistand = uistand.slice();
            cc.log(pro_rankType + "=========  mjhandPai = " + JSON.stringify(mjhandPai));
            var myUiStand = []; //重新排序后
            for (var j = 0; j < mjhandPai.length; j++) {
                for (var i = 0; i < tempuistand.length; i++) {
                    var tag = tempuistand[i].tag;
                    if (tag == mjhandPai[j]) {
                        myUiStand.push(tempuistand[i]);
                        var index = tempuistand.indexOf(tempuistand[i]);
                        tempuistand.splice(index, 1);
                        cardCount++;
                    }
                }
            }
            uistand = myUiStand;
        }
    }


    if (uihun.length > 0) //是否有柰子，有则放在最前面 by sking
    {
        for (var i = 0; i < uihun.length; i++) {
            uistand.unshift(uihun[i]); //向数组开头添加一个元素 unshift
        }
    }

    var uiOrder = [uigang1, uigang0, uipeng, uichi, uistand];

    var orders = []; //重新排序后装到数组里 by sking
    for (var j = 0; j < uiOrder.length; j++) {
        var uis = uiOrder[j];
        for (var i = 0; i < uis.length; i++) {
            orders.push(uis[i]);
        }
    }

    //设置麻将位置
    for (var i = 0; i < orders.length; i++) {
        var ci = orders[i];
        if (i != 0) {
            if (ci.name == orders[i - 1].name) {
                if (ci.name == "mjhand") {
                    ci.x = orders[i - 1].x + upSize.width * upS * 0.4;//调牌的距离的
                }
            }
        }
        else {
            ci.x = start.x + upSize.width * upS * 0.1;
        }

        ci.zIndex = i;
    }
};


var EndOneView_PaoDeKuaiTY = cc.Layer.extend({
    jsBind: {
        block: {
            _layout: [[1, 1], [0.5, 0.5], [0, 0], true]
        },
        back: {
            _layout: [[1, 1], [0.5, 0.5], [0, 0]], 
            wintitle:
    		{
    		    _visible: function () {
    		        var pl = getUIPlayer(0);
    		        if (pl) {
    		            //playEffect("win");
    		            return pl.winone >= 1;
    		        }
    		        return false;
    		    }
    		}, losetitle:
    		{
    		    _visible: function () {
    		        var pl = getUIPlayer(0);
    		        if (pl) {
    		            //playEffect("lose");
    		            return pl.winone < 0;
    		        }
    		        return false;
    		    }
    		}, pingju:
    		{
    		    _visible: function () {

    		        var pl = getUIPlayer(0);

    		        if (pl) {
    		            //playEffect("lose");
    		            return pl.winone == 0;
    		        }
    		        return false;
    		    }, _run: function () {
    		        var sData = MjClient.data.sData;
    		        var tData = sData.tData;
    		        if (MjClient.isDismiss) {
    		            this.loadTexture("gameOver/jiesan.png");
    		        }
    		    }
    		},
            share: {
                _click:function(btn,eT){
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Xiaojiesuanjiemian_Fenxiang", {uid:SelfUid()});

                    MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
                    {
                        postEvent("capture_screen");
                        MjClient.endoneui.capture_screen = true;
                        btn.setTouchEnabled(false);
                    });
                }
                ,_event:{
                    captureScreen_OK: function () {
                        if (MjClient.endoneui.capture_screen != true)
                            return;
                        MjClient.endoneui.capture_screen = false;
                        var writePath = jsb.fileUtils.getWritablePath();
                        var textrueName = "wxcapture_screen.png";
                        var savepath = writePath+textrueName;
                        MjClient.shareImageToSelectedPlatform(savepath);
                        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function()
                        {
                            this.setTouchEnabled(true);
                        }.bind(this))));
                    }
                }
                ,_visible: function () {
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    return !MjClient.remoteCfg.guestLogin && !tData.matchId;
                }
            },
            ready: {
                _run: function () {
                    if (MjClient.remoteCfg.guestLogin) {
                        setWgtLayout(this, [0.15, 0.15], [0.5, 0.085], [0, 0], false, true);
                    }
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    if (tData.matchId) {
                        this.setVisible(false);
                    }
                },
                _click: function (btn, eT) {
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    if(!tData.fieldId){
                        if (sData.tData.roundNum <= 0)
                            MjClient.endoneui.getParent().addChild(new GameOverLayer(),500);
                    }
                    if(!tData.fieldId){
                        postEvent("clearCardUI");
                        MjClient.endoneui.removeFromParent(true);
                        MjClient.endoneui = null;
                    }
                    if (MjClient.rePlayVideo >= 0 && MjClient.replayui) {
                        MjClient.replayui.replayEnd();
                    }
                    else {
                        if (tData.fieldId){
                            leaveGameClearUI();
                            MjClient.Scene.addChild(new goldMatchingLayer({matching:false,gameType:tData.gameType}));
                            MjClient.goldfieldEnter(tData.fieldId,tData.gameType);
                            return;
                        }else{
                            PKPassConfirmToServer_card();
                        }
                    }
                    if (MjClient.arrowbkNode && cc.sys.isObjectValid( MjClient.arrowbkNode )) {
                        MjClient.arrowbkNode.setVisible(false);
                    }
                    //reInitarrCardVisible();
                }
            },
            close:{
                _visible: function () {
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    if(tData.fieldId){
                        return true;
                    }
                    return false;
                },
                _click: function (btn, eT) {
                    leaveGameClearUI();
                }
            },
            delText:
            {
                _run: function() {
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                    if (MjClient.isDismiss) {
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        var id = tData.firstDel;
                        var pl = sData.players[id];
                        var delStr = "";
                        if (pl) {
                            var name = unescape(pl.info.nickname );
                            delStr = name + pl.mjdesc[0];
                        } else { // 会长或管理员解散房间时 pl 会为 null
                            pl = getUIPlayer(0);
                            if (pl)
                                delStr = tData.dissolveWay == -1? '系统停服自动解散房间':'会长或管理员解散房间';//pl.mjdesc[0];
                        }
                        this.setString(delStr);
                    } else {
                        this.setString("");
                    }
                }
            },
            dir:
            {
                _visible: true,
                _run:function()
                {
                    if (!MjClient.endoneui.isNewUi && MjClient.getAppType() != MjClient.APP_TYPE.AYGUIZHOUMJ)
                        this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    var text = "";

                    if (MjClient.endoneui.isNewUi) {
                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                            text = "";
                        }
                        else {
                            text = GameCnName[MjClient.gameType] + " " + tData.maxPlayer + " 人   房号：" + tData.tableid + "\n";
                        }
                    }

                    //text += "跑得快,";
                    //text += MjClient.MaxPlayerNum == 3 ? "三人玩," : "两人玩,";
                    text += tData.areaSelectMode.cardNumIndex == 0 ? "16张," : "15张,";
                    text += tData.areaSelectMode.mustPut ? "" : "非必管,";
                    var firstOutRuleStr = "";
                    switch (tData.areaSelectMode.firstPutRule){
                        case 1:{
                            firstOutRuleStr = tData.areaSelectMode.isPreRoundFirstRule==true?  "每局先出黑桃3,":"首局先出黑桃3,"
                            break;
                        }
                        case 2:{
                            firstOutRuleStr = ""
                            break;
                        }
                        case 3:{
                            firstOutRuleStr = tData.areaSelectMode.isPreRoundFirstRule==true?  "每局先出黑桃3,":"首局先出黑桃3,"
                            break;
                        }
                        case 4:{
                            firstOutRuleStr = tData.areaSelectMode.isPreRoundFirstRule==true?  "每局随机先手,":"首局随机先手,"
                            break;
                        }
                        default:{
                            firstOutRuleStr = ""
                            break
                        }
                    }
                    text += tData.areaSelectMode.zhaDanBuChai ? "炸弹不可拆," : "";
                    // text += tData.areaSelectMode.firstHeiTao3 ? "首局先出黑桃三," : "";
                    text += firstOutRuleStr;
                    // text += tData.areaSelectMode.can4dai2 ? "四带二," : "";
                    // text += tData.areaSelectMode.can4dai3 ? "四带三," : "";
                    text += tData.areaSelectMode.hongTao10Niao ? "红桃10扎鸟," : "";
                    text += tData.areaSelectMode.hongTao10JiaFen ? "红桃10加5分," :"";
                    text += tData.areaSelectMode.can3aZhaDan ? "3个A算炸弹," : "";
                    text += tData.areaSelectMode.isPlayerShuffle == 1 ? "手动切牌," : "系统切牌,";

                    
                    var piaoFenStr = "";
                    switch (tData.areaSelectMode.piaofen){
                        case 1:{
                            piaoFenStr = "飘123,";
                            break;
                        }
                        case 2:{
                            piaoFenStr = "飘235,";
                            break;
                        }
                        case 3:{
                            piaoFenStr = "飘258,";
                            break;
                        }
                        case 4:{
                            piaoFenStr = "每局飘1,";
                            break;
                        }
                        case 5:{
                            piaoFenStr = "每局飘2,";
                            break;
                        }
                        default:{
                            piaoFenStr = ""
                            break;
                        }
                    }
                    text += piaoFenStr;

                    if (typeof(tData.areaSelectMode.fengDing) == "number") {
                        switch (tData.areaSelectMode.fengDing)
                        {
                            case 1:
                                text += "30/32分封顶,";
                                break;
                            case 2:
                                text += "60/64分封顶,";
                            case 3:
                                text += "120/128分封顶,";
                                break;
                        }
                    }
                    if (typeof(tData.areaSelectMode.fanBei) != 'undefined') 
                        text += tData.areaSelectMode.fanBei == 0 ? "不翻倍," : "低于" + tData.areaSelectMode.fanBeiScore + "分翻倍,";


                    text += tData.areaSelectMode.fangQiangGuan ? "防强关," : "";
                    if (tData.fieldBase) // 金币场底分
                        text += "底分X" + tData.fieldBase + ",";
                    else
                        text += tData.areaSelectMode.paodekuaiTY_difen ? "底分X" + tData.areaSelectMode.paodekuaiTY_difen + ",":"";

                    if (!MjClient.endoneui.isNewUi)
                        text += ("房间号:" + tData.tableid);

                    if (text.charAt(text.length - 1) == ",")
                        text = text.substring(0, text.length - 1);
                    return text;
                }
            },
            dir_0:
            {
                _visible: true,
                _run:function()
                {
                },
                _text: function () {
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    var text = "";

                    if (MjClient.endoneui.isNewUi){
                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                            if(MjClient.data.sData.tData.fieldId){
                                text = GameCnName[MjClient.gameType] + " " + tData.maxPlayer + " 人";
                            }else{
                                text = GameCnName[MjClient.gameType] + " " + tData.maxPlayer + " 人   房号：" + tData.tableid;
                            }
                            return text;
                        }
                    }
                    return text;
                }
            }, dir_fee: {
                _visible:function () {
                    return false;
                },
                _run: function () {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    if (tData.fieldId && tData.fieldFee){
                        return "另扣服务费每人"+tData.fieldFee+"金币";
                    }
                    return "";
                },
            }
            , head0: {
                head: {
                    //zhuang:{_visible:false}
                },
                winNum: {
                },
                _run: function () { SetEndOneUserUI_PaoDeKuaiTY(this, 0); },

            }
    		, head1: {
    		    head: {
    		        //:{_visible:false}
    		    },
    		    winNum: {
    		        // _layout:[[0.08,0.08],[1,0.5],[-2.5,0.75]]
    		    },
    		    _run: function () { SetEndOneUserUI_PaoDeKuaiTY(this, 1); }
    		}

    		, head2: {
    		    head: {
    		        //zhuang:{_visible:false}
    		    },
    		    winNum: {
    		        // _layout:[[0.08,0.08],[1,0.5],[-2.5,-0.75]]
    		    },
    		    _run: function () { SetEndOneUserUI_PaoDeKuaiTY(this, 2); }
    		}
        }
    },
    ctor: function () {
        this._super();
        this.isNewUi = (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ);
        MjClient.endoneui = this;

        var endoneui = ccs.load(res.EndOne_PaoDeKuaiTY_json);
        BindUiAndLogic(endoneui.node, this.jsBind);
        this.addChild(endoneui.node);

        //时间
        var _back = endoneui.node.getChildByName("back");
        var _time = _back.getChildByName("time");
        _time.visible = true;

        //var _laizi = endoneui.node.getChildByName("back").getChildByName("laizi");
        //setCardSprite(_laizi, MjClient.data.sData.tData.hunCard, 4);

        _time.setString(MjClient.roundEndTime);


        return true;
    }
});