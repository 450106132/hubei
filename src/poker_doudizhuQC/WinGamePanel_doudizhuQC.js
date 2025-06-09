

function SetEndOneUserUI_doudizhuQC(node, off) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var pl = MjClient.getPlayerByIndex(off);
    node.setVisible(false);
    if (!pl) return;
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

                    //添加手牌
                    for (var i = 0; i < pl.mjhand.length; i++) {
                        arry.push(getNewCard_card(node, "stand", "mjhand", pl.mjhand[i], 0));
                    }

                    for (var i = 0; i < arry.length; i++) {
                        arry[i].visible = true;
                        arry[i].enabled = false;
                        arry[i].setScale(arry[i].getScale() * 0.75);
                    }
                    CardLayoutRestoreForEndOne_doudizhuQC(node, pl);
                }
            },
            cardType: {
                _run:function()
                {
                    this.zIndex = 100;
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return "";
                },
            }
        }
		, winNum: {
            _run:function()
            {
                this.ignoreContentAdaptWithSize(true);
            },
		    _text: function () {
		        var pre = "";
		        if (pl.winone > 0) pre = "+";
		        return pre + pl.winone;
		    }
            , fenshu: {
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
            }, 
            allScore: {
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    var pre = "";
                    if (pl.winall > 0) pre = "+";
                    return pre + pl.winall;
                }
            }
		}
        ,head_bg:{
            _run:function () {
                if(pl && pl.winone > 0)
                {
                    this.loadTexture("common/bg_gameover_win.png");
                }
            },
            Image_dizhu: {
                _run: function () {
                    this.visible = false;
                    var tData = MjClient.data.sData.tData;
                    if(tData.uids[MjClient.playui.zhuang] == pl.info.uid)
                    {
                        this.visible = true;
                        if( MjClient.playui.isJD() &&
                            MjClient.playui.jiaoFen != null && MjClient.playui.jiaoFen > 0 ){
                            // var _string = "叫" + MjClient.playui.jiaoFen + "分";
                            // var _Label = new cc.LabelTTF(_string,"", 25);
                            // _Label.setColor(cc.color(255,0,0));
                            // _Label.setAnchorPoint(0.5,1);
                            // _Label.setPosition(this.getContentSize().width/2, -5);
                            // this.addChild(_Label);
                            
                            
                            var _sp = cc.Sprite("playing/doudizhu/fen" + MjClient.playui.jiaoFen + ".png");
                            _sp.setAnchorPoint(0.5,1);
                            _sp.setPosition(this.getContentSize().width/2, -5);
                            this.addChild(_sp);
                        }
                    }
                }
            },
        }
    }
    BindUiAndLogic(node.parent, uibind);
    if(MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ
        || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG)
    {
        var pl = MjClient.getPlayerByIndex(off);
        CircularCuttingHeadImg(uibind.head._node, pl);
    }else{

        addWxHeadToEndUI(uibind.head._node, off);
    }
}

function CardLayoutRestoreForEndOne_doudizhuQC(node, plNode) {
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

        ci.zIndex  = i;
    }
};


var EndOneView_doudizhuQC = cc.Layer.extend({
    jsBind: {
        block: {
            _layout: [[1, 1], [0.5, 0.5], [0, 0], true],
        },
        back: {
            // _layout: [[1, 1], [0.5, 0.5], [0, 0]],
            _run:function()
            {
            	var tData = MjClient.data.sData.tData;
                if(isIPhoneX() && MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP)
                    setWgtLayout(this, [0.85,0.85],[0.5,0.5],[0,0], false);
                else
                    setWgtLayout(this, [1,1],[0.5,0.5],[0,0], false);
            },
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
                        this.ignoreContentAdaptWithSize(true);
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
                        //btn.setBright(false);
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
                            //this.setBright(true);
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
                    if (sData.tData.roundNum <= 0) 
                        MjClient.endoneui.getParent().addChild(new GameOverLayer_DoudizhuQC(),500);

                    postEvent("clearCardUI");
                    MjClient.endoneui.removeFromParent(true);
                    MjClient.endoneui = null;
                   
                    if (MjClient.rePlayVideo >= 0 && MjClient.replayui) {
                        MjClient.replayui.replayEnd();
                    }
                    else {
                        PKPassConfirmToServer_card();
                    }
                    // if (MjClient.arrowbkNode) {
                    //     MjClient.arrowbkNode.setVisible(false);
                    // }

                    //reInitarrCardVisible();
                }
            },
            delText:
            {
                _run: function() {
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
                            {
                                for(var i =0;i<pl.mjdesc.length;i++)
                                {
                                    if(pl.mjdesc[i].indexOf("管理员")>=0||pl.mjdesc[i].indexOf("会长")>=0)
                                        delStr=pl.mjdesc[i];
                                }
                                //delStr = pl.mjdesc[0];
                            }

                        }
                        this.setString(delStr);
                    } else {
                        this.setString("");
                    }
                }
            },
            info:
            {
                _visible: true,
                _run: function(){
                    if(MjClient.APP_TYPE.QXYYQP !== MjClient.getAppType() && MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ) return;
                },
                _text: function () {
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    var text = "";
                    text = GameCnName[MjClient.gameType] + tData.maxPlayer + "人\n房间号：" + tData.tableid;
                    return text;
                }
            },
            dir:
            {
                _visible: true,
                _run:function()
                {
                    if (!MjClient.endoneui.isNewUi)
                        this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    var text = "";
                    
                     if (MjClient.endoneui.isNewUi)
                        text = GameCnName[MjClient.gameType] + " " + tData.maxPlayer + " 人   房号：" + tData.tableid + "\n";
                    else
                        text = GameCnName[MjClient.gameType] + ",";

                    cc.log("==============欢乐斗地主 = " + JSON.stringify(tData.areaSelectMode));
                    text +=  tData.areaSelectMode.multi +"倍, ";
                    text +=  tData.areaSelectMode.beishufengding+ "倍封顶, ";
                    text += tData.areaSelectMode.yingjiaxianchu  ? "赢家先出, ":"";
                    text += tData.areaSelectMode.showHandCount  ? "显示手牌张数, ":"";
                    text += tData.difen?"底分 : "+tData.difen:"";
                    if (!MjClient.endoneui.isNewUi)
                        text += ("房间号:" + tData.tableid);

                    if (text.charAt(text.length - 1) == ",")
                        text = text.substring(0, text.length - 1);
                    return text;
                }
            },
            head0: {
                head: {
                    //zhuang:{_visible:false}
                },
                winNum: {
                },
                _run: function () { SetEndOneUserUI_doudizhuQC(this, 0); },

            }
    		, head1: {
    		    head: {
    		        //:{_visible:false}
    		    },
    		    winNum: {
    		        // _layout:[[0.08,0.08],[1,0.5],[-2.5,0.75]]
    		    },
    		    _run: function () { SetEndOneUserUI_doudizhuQC(this, 1); }
    		}

    		, head2: {
    		    head: {
    		        //zhuang:{_visible:false}
    		    },
    		    winNum: {
    		        // _layout:[[0.08,0.08],[1,0.5],[-2.5,-0.75]]
    		    },
    		    _run: function () { SetEndOneUserUI_doudizhuQC(this, 2); }
            }
            , publicMutiple: {
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    var sData  = MjClient.data.sData;
                    var tData = sData.tData;
                    var text = "";
                    var index = tData.uids.indexOf(tData.firstDel);
                    if (index == -1) { // 没有解散
                        text += "叫分X" + revise((MjClient.playui.rate / Math.pow(2, tData.zhadan) / tData.chuntianRate));
                        text += tData.zhadan > 0 ? "，炸弹X" + Math.pow(2, tData.zhadan) : "";
                        text += tData.chuntianRate > 1 ? "，春天X" + tData.chuntianRate : "";
                        text += "=公共底分" + revise(MjClient.playui.rate);
                    } else {
                        for (var i = 0; i < tData.maxPlayer; i++) {
                            var pl = MjClient.getPlayerByIndex((i + index) % tData.maxPlayer);
                            if (pl == null) { continue; }
                            var copy = pl.mjdesc.slice();
                            if(copy.indexOf("底分1")>=0){
                                copy.splice(copy.indexOf("底分1"), 1);
                            }
                            text += (getPlayerName(unescape(pl.info.nickname)) + copy);
                            if (i != (tData.maxPlayer - 1)) {
                                text += "，";
                            }
                        }
                    }    
                    return text;
                },
            }
        }
    },
    ctor: function (zhuang, rate) {
        this._super();
        MjClient.playui.zhuang = zhuang;
        MjClient.playui.rate = rate;
        this.isNewUi = MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ
            || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG;
        MjClient.endoneui = this;

        var endoneui = ccs.load("endOne_doudizhuQC.json");
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