/**
 *  斗地主头像
 */
var PokerHeadNode_Doudizhu = cc.Node.extend({
    node: null,
    ctor: function (off) {
        this._super();
        // 加载csb资源 断线重连不走 构造函数需把这部分独立出来
        var csbNode = ccs.load(res.Doudizhu_HeadNode_json);
        this.node = csbNode.node;
        this.initHeadUI(off);
        this.initHeadTouch(off);
        this.hideHeadUI();
    }
});

PokerHeadNode_Doudizhu.prototype.hideHeadUI = function () {
    this.createFangIcon();
    this.setIconDiZhu(false);
    this.setWxHead(false);
    this.setTiIcon(false);
    this.setJiaBeiIcon(false);
    this.updateCoin();
    this.updateName();
    this.setUserTrust();
    this.setUserOffline();
    this.showCurrentLeftCardCount();
};

PokerHeadNode_Doudizhu.prototype.initHeadUI = function (off) {
    this.node.getChildByName("zhuang").visible = false;
    this.bgScore = this.node.getChildByName("score_bg");
    if (MjClient.data.sData.tData.fieldId) {
        if(MjClient.getGoldFiledType() == 1){
            this.bgScore.loadTexture("play/douzizhu_play_fen.png");

        }else{
            this.bgScore.loadTexture("game_picture/dating-1_75.png");
        }
    }
    this.textCoin = this.node.getChildByName("coin");
    this.textCoin.ignoreContentAdaptWithSize(true);
    this.textCoin.setScale(1.2);
    this.bgName = this.node.getChildByName("name_bg")
    this.bgName.zIndex = 101;
    this.textName = this.node.getChildByName("name");
    this.textName.zIndex = 103;
    this.textName.setScale(1.5);
    this.textName.ignoreContentAdaptWithSize(true);
    this.offLine = this.node.getChildByName("offline");
    this.offLine.zIndex = 99;
    this.imgTrust = this.node.getChildByName("imgTrust");
    this.imgTrust.zIndex = 100;
    this.iconDiZhu = this.node.getChildByName("icon_dizhu");
    this.nodeCardCount = this.node.getChildByName("tingCard");
    this._sprite_single = this.node.getChildByName("sprite_single");
    this.emoji = this.node.getChildByName("emoji");
    this.chatbg = this.node.getChildByName("chatbg");
    this.iconDiZhu.setPositionX((off == 1 ? -90.5 : 90.5));
    this.nodeCardCount.setPositionX((off == 1 ? -93 : 88.7));
    this._sprite_single.setPositionX((off==1 ?-93 : 88.7));
    this.chatbg.setPositionX((off == 1 ? -90 : 89));
    this.tiIcon = this.node.getChildByName("tiTagicon");
    if (this.tiIcon) {
        this.tiIcon.setPositionX(off == 3 ? 49 : -42.81);
        this.tiIcon.setPositionY(off == 3 ? 141.46 : 121.98);
    }
    if ((MjClient.MaxPlayerNum == 4 || MjClient.MaxPlayerNum == 2) && off == 2) {
        this.chatbg.setPositionY(100);
    }
    this.chatbg.setAnchorPoint((off == 1 ? 1 : 0), 0.5);
    var tmp = "playing/other/";
    this.chatbg.loadTexture((off == 1 ? (tmp + "chatbg_rd.png") : (tmp + "chatbg_ld.png")));
    if (off == 0) {
        this.emoji.setPosition(108, 142);
    } else if (off == 1) {
        this.emoji.setPosition(-111, 5);
    } else if (off == 2) {
        this.emoji.setPosition(114, -10);
    }
}
PokerHeadNode_Doudizhu.prototype.initHeadTouch = function (off) {
    var headFrame = this.node.getChildByName("headFrame");
    headFrame.setTouchEnabled(true);
    headFrame.addTouchEventListener(function (sender, type) {
        if (type == 2) {
            if (MjClient.data.sData && MjClient.data.sData.tData && MjClient.data.sData.tData.fieldId) {
                MjClient.native.umengEvent4CountWithProperty("Jinbichang_Fangjiannei_Wanjiaxinxi", {uid: SelfUid()});
            }
            showPlayerInfo(off, sender);
        }
    }, headFrame);
};

// 房主icon
PokerHeadNode_Doudizhu.prototype.createFangIcon = function () {
    this.fangTag = this.node.getChildByName("fangTag");
    var headFrame = this.node.getChildByName("headFrame");
    if (this.fangTag == null) {
        var sp = new cc.Sprite("playing/gameTable/fangzhu3.png");
        sp.setScale(1.2);
        sp.setPosition(headFrame.getContentSize().width / 2 + 10, 0);
        sp.setAnchorPoint(1, 0);
        sp.zIndex = 102;
        sp.setName("fangTag");
        this.fangTag = sp;
        this.node.addChild(sp, 110);
    }
    this.fangTag.visible = false;
};
PokerHeadNode_Doudizhu.prototype.updateName = function (pl) {
    this.bgName.visible = (pl != null);
    this.textName.visible = (pl != null);
    if (pl == null) {
        return;
    }
    if (!MjClient.data.sData.tData.fieldId) {
        var strname = getPlayerName(unescape(pl.info.nickname));
        this.textName.setString(strname);
    } else {
        this.bgName.visible = false;
        this.textName.visible = false;
    }
}

PokerHeadNode_Doudizhu.prototype.updateCoin = function (pl) {
    this.textCoin.visible = (pl != null);
    this.bgScore.visible = (pl != null);
    if (pl == null) {
        return;
    }
    if (!MjClient.data.sData.tData.fieldId) {
        var coin = MjClient.data.sData.tData.initCoin;
        var countCopy = Number(coin + pl.winall);
        countCopy = revise(countCopy);
        var tmpcount = countCopy < 0 ? ("-" + (-countCopy)) : countCopy;
        this.textCoin.setString(tmpcount);
    } else {
        if (MjClient.data.sData.tData.fieldFee) {
            if (MjClient.data.sData.tData.roundNum <= 0) {//结算后台费已经扣了不用再减去台费
                this.textCoin.setString(MjClient.simplifyGoldNumStr(Number(pl.info.gold)));
            } else {
                this.textCoin.setString(MjClient.simplifyGoldNumStr(Number(pl.info.gold - MjClient.data.sData.tData.fieldFee)));
            }
        } else {
            this.textCoin.setString(MjClient.simplifyGoldNumStr(pl.info.gold));
        }

    }
}
PokerHeadNode_Doudizhu.prototype.setWxHead = function (flag, imgUrl) {
    var nobody = this.node.getChildByName("nobody");
    var WxHead = nobody.getChildByName("WxHead");
    if (WxHead) {
        WxHead.removeFromParent();
    }
    if (flag) {
        var headSprite = new cc.Sprite(imgUrl);
        loadzhezhao(headSprite, nobody);
    }
};

PokerHeadNode_Doudizhu.prototype.loadWxHead = function (uid, url) {
    if (!url) url = "png/default_headpic.png";
    if (uid && url) cc.loader.loadImg(url, {isCrossOrigin: true}, function (err, texture) {
        if (!err && texture) {
            //postEvent("QueueNetMsg", ["loadWxHead", { uid: uid, img: texture }]);
            //使用新的事件循环机制
            MjClient.Scene.pushQueueNetMsg(["loadWxHead", {uid: uid, img: texture}]);
        }
    });
};

//设置玩家掉线头像
PokerHeadNode_Doudizhu.prototype.setUserOffline = function (pl) {
    this.offLine.visible = false;
    if (pl == null) {
        return;
    }
    if (!pl.onLine) {
        var textTime = this.offLine.getChildByName("offLineTime");
        if (textTime == null) {
            textTime = new ccui.Text();
            textTime.setName("offLineTime");
            textTime.setFontSize(26);
            this.offLine.addChild(textTime)
        }
        textTime.setPosition(cc.p(this.offLine.getContentSize().width / 2, this.offLine.getContentSize().height * 0.8));
        this.offLine.unscheduleAllCallbacks();
        this.offLine.schedule(function () {
            if (pl.offLineTime) {
                var _currentTime = new Date().getTime();
                var _showTime = _currentTime - pl.offLineTime;
                if (_showTime < 0) _showTime = 0;
                textTime.setString(MjClient.dateFormat(new Date(_showTime), "mm:ss"));
            } else {
                textTime.setString("");
            }
        });
    }
    this.offLine.visible = !pl.onLine;
};
//设置玩家托管
PokerHeadNode_Doudizhu.prototype.setUserTrust = function (pl) {
    this.imgTrust.visible = false;
    if (pl == null) {
        return;
    }
    if (pl.info.type == 4) { //机器人不显示托管
        return ;
    }
    this.imgTrust.visible = pl.trust;
}
// off 是四个位置，根据off 显示四个位置的信息 
PokerHeadNode_Doudizhu.prototype.updateUserInfo = function (pl) {
    if (pl == null) {
        this.hideHeadUI();
        return;
    }

    var tData = MjClient.data.sData.tData;
    this.loadWxHead(pl.info.uid, pl.info.headimgurl);
    if (!tData.fieldId) {
        this.setUserOffline(pl);
        this.fangTag.visible = tData.owner == pl.info.uid;
    } else {
        this.fangTag.visible = false;
    }
    this.updateCoin(pl);
    this.updateName(pl);
};

// 加倍icon
PokerHeadNode_Doudizhu.prototype.setJiaBeiIcon = function (isJiaBei, jiazhuNum) {
    var iconJiaBei = this.node.getChildByName("icon_jiabei");
    iconJiaBei.zIndex = 110;
    iconJiaBei.visible = isJiaBei;
    var pathNormal = "playing/doudizhu/jiabeiicon.png";
    var pathSupper = "playing/doudizhu/Superjiabeiicon.png";
    var tData = MjClient.data.sData.tData;
    var imagepath = (MjClient.playui.isJD() && tData.areaSelectMode.jiabei == 4) ? pathSupper : pathNormal;
    
    if(MjClient.isInGoldFieldNormal() && jiazhuNum == 4){
        iconJiaBei.visible = true;
        imagepath = pathSupper;
    }
    
    iconJiaBei.loadTexture(imagepath);
};

// 地主 icon
PokerHeadNode_Doudizhu.prototype.setIconDiZhu = function (isShow) {
    this.iconDiZhu.visible = isShow;
};
//踢icon
PokerHeadNode_Doudizhu.prototype.setTiIcon = function (bTi) {
    var tiIcon = this.node.getChildByName("tiTagicon")
    tiIcon.visible = bTi;
}
// 剩余牌数
PokerHeadNode_Doudizhu.prototype.showCurrentLeftCardCount = function (pl, bShowHandCount) {
    if (!pl || !pl.handCount || pl.handCount <= 0) {
        this.nodeCardCount.visible = false;
        this._sprite_single.visible =false;
        return;
    }
    var tData = MjClient.data.sData.tData;
    if (tData.zhuang == -1) {
        this.nodeCardCount.visible = false;
        this._sprite_single.visible =false;
        return;
    }
    //this.nodeCardCount.visible = true;
    var textCount = this.nodeCardCount.getChildByName("Text_count");
    textCount.setString(pl.handCount);
    if (bShowHandCount) {
        this.nodeCardCount.getChildByName("unKnow").visible = false;
        textCount.visible = true;
    } else {
        this.nodeCardCount.getChildByName("unKnow").visible = true;
        textCount.visible = false;
    }

    var _sprite_single = this.node.getChildByName("sprite_single");
    _sprite_single.visible =pl.handCount == 1;
    this.nodeCardCount.visible=pl.handCount != 1;
    var shining = _sprite_single.getChildByName("shining");
    var alarm = _sprite_single.getChildByName("alarm");
    if (!shining.getActionByTag(51839)) {
        var fadeAction = cc.sequence(cc.FadeIn(0.6), cc.FadeOut(0.6)).repeatForever();
        fadeAction.setTag(51839);
        shining.runAction(fadeAction);

        var rotateAction = cc.sequence(cc.RotateTo(0.4,-15), cc.RotateTo(0.4,0)).repeatForever();
        alarm.runAction(rotateAction);
    }
}

PokerHeadNode_Doudizhu.prototype.iconMoveToDiZhu = function (off, centerPos) {
    var iconDiZhuPos = this.iconDiZhu.getPosition();
    this.iconDiZhu.visible = true;
    var centerPos2 = this.node.convertToNodeSpace(cc.p(centerPos.x, centerPos.y));
    this.iconDiZhu.setPosition(cc.p(centerPos2.x, centerPos2.y + 80));
    this.iconDiZhu.setScale(3);
    var ac1 = cc.MoveTo(0.3, iconDiZhuPos);
    var ac2 = cc.ScaleTo(0.3, 1);
    this.iconDiZhu.runAction(cc.sequence(cc.DelayTime(0.6), cc.spawn(ac1, ac2)));
};

//显示玩家文字
PokerHeadNode_Doudizhu.prototype.showUserChat = function (off, msg) {
    var node1 = this.node.getChildByName("chatbg");
    var node = node1.getChildByName("chattext");
    var tData = MjClient.data.sData.tData;
    if (msg.type == 4 && off == 0 && tData.roundNum == tData.roundAll) { //位置截取
        var geogData = [];
        for (var i = 0; i < tData.uids.length; i++) {
            var pl = MjClient.data.sData.players[tData.uids[i]];
            if (pl && pl.locationMsg) {
                geogData.push(pl.locationMsg);
            }
        }

        if (geogData.length == tData.maxPlayer && tData.maxPlayer > 2 && MjClient.tableid != tData.tableid) {
            MjClient.tableid = tData.tableid;
            var displayCount = 0;
            for (var i = 0; i < geogData.length; i++) {
                for (var j = i + 1; j < geogData.length; j++) {
                    var plyoneV = new Array();
                    var plytwoV = new Array();
                    plyoneV = geogData[i].split(";");
                    plytwoV = geogData[j].split(";");

                    var plone = getUIPlayerByUID(plyoneV[3]);
                    var _oneLatitude = plone.info.location.latitude;
                    var _oneLongitude = plone.info.location.longitude;
                    if (!_oneLatitude) _oneLatitude = plyoneV[0];
                    if (!_oneLongitude) _oneLongitude = plyoneV[1];

                    var pltwo = getUIPlayerByUID(plytwoV[3]);
                    var _twoLatitude = pltwo.info.location.latitude;
                    var _twoLongitude = pltwo.info.location.longitude;
                    if (!_twoLatitude) _twoLatitude = plytwoV[0];
                    if (!_twoLongitude) _twoLongitude = plytwoV[1];

                    var distance = MjClient.native.CalculateLineDistance(_oneLatitude, _oneLongitude, _twoLatitude, _twoLongitude);
                    if (distance <= 50 && distance >= 0) {
                        displayCount++;
                        break;
                    }
                }
                if (displayCount > 0) {
                    break;
                }
            }

            //当有人距离小于50米 时候提示
            if (displayCount >= 1 && !tData.matchId && !tData.fieldId) {
                if (tData.maxPlayer == 4)
                    MjClient.Scene.addChild(new showDistanceLayer());
                else
                    MjClient.Scene.addChild(new showDistance3PlayerLayer(tData.maxPlayer));
            }
        }
        return;
    }

    var pl = getUIPlayer(off);
    var type = msg.type;
    var message = msg.msg;
    var num = msg.num;

    if (pl && msg.uid == pl.info.uid) {
        if (type == 0) {
            node.getParent().visible = true;
            node.setString(message);
            var callback = function () {
                node.getParent().visible = false;
            };

            node.getParent().width = node.getString().length * node.getFontSize() + 72;
            node.runAction(cc.sequence(cc.delayTime(2.5), cc.callFunc(callback)));
        } else if (type == 1) {
            node.getParent().visible = true;
            var text = message.text;
            node.setString(text);
            var callback = function () {
                node.getParent().visible = false;
            };

            var musicnum = msg.num + 1;
            node.getParent().width = node.getString().length * node.getFontSize() + 72;

            var voiceType = message.voiceType == 0 ? "normal" : MjClient.gameType;
            if (cc.sys.isObjectValid(MjClient.playui) && MjClient.playui.__proto__.getCahtText) {
                voiceType = MjClient.gameType;
            }
            if(MjClient.isInGoldField() && MjClient.getGoldFiledType() == 1){
                voiceType = GoldPrefix + MjClient.gameType;
            }
            if (GameSound4Chat[voiceType]) {
                playEffect(GameSound4Chat[voiceType][getRandomRange(0, GameSound4Chat[voiceType].length - 1)] + musicnum, false, pl.info.sex);
            }
            node.runAction(cc.sequence(cc.delayTime(2.5), cc.callFunc(callback)));
        } else if (type == 2) {
            var em_node = node.getParent().getParent().getChildByName("emoji");
            PlayEmojiAct(em_node, msg.num);
        } else if (type == 3) { //播放录音
            playRecord(node, num, message);
        }
        else if (type == 5) // 转运道具
        {
            var em_node = node.getParent().getParent().getChildByName("emoji");
            playZhuanYunPropAct(em_node, msg.num);
        }

    }
}


