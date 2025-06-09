var majiang_gameOver = cc.Layer.extend({
    _jsBind:{
        bgBox:{
            _layout: [[1, 1], [0.5, 0.5], [0, 0], true]
        },
        back:{
            _run:function() {
                setWgtLayout(this, [1, 1], [0.5, 0.5], [0, 0])
            },

            btn_close :{ 
                _click:function(btn,eT){ 
                    MjClient.endallui.closeOverView();
                },
            },
            // 房间结束的信息
            text_infoMation: {
                _text:function(){
                    return MjClient.endallui.getRoomEndInfoText();
                }
            },
            // 房间信息
            text_roomInfo: {
                _text:function(){
                    return MjClient.endallui.getRoomInfoText();
                }
            },
            btnCopy:{
                _run:function() {
                    var clubInfoTable = getClubInfoInTable();
                    // cc.log(" ====== lms -- YYYY --",JSON.stringify(clubInfoTable))
                    if (clubInfoTable && clubInfoTable.clubId && MjClient.friendCard_replay && !playLogInfoView) {
                        this.loadTextureNormal("gameOver/btn_replay_n.png");
                        this.loadTexturePressed("gameOver/btn_replay_s.png");
                    } 
                },
                _click:function(btn, eventType){
                    var clubInfoTable = getClubInfoInTable();
                    if (clubInfoTable && clubInfoTable.clubId && MjClient.friendCard_replay && !playLogInfoView) {

                        // MjClient.showToast("这是再来一局");
                        clubReplay(clubInfoTable.clubId, clubInfoTable.ruleId, MjClient.gameType);

                    } else {
                        if (MjClient.playui) {
                            MjClient.playui.copyBntSharLogic();
                        }
                    } 

                },
            },
            // 分享按钮
            btn_share :{
                _run:function() {
                    // var clubInfoTable = getClubInfoInTable();
                    // if (clubInfoTable && clubInfoTable.clubId && MjClient.friendCard_replay && !playLogInfoView) {
                    // } 
                },
                _click:function(btn, eventType){
                    MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function(){
                        MjClient.endallui.getShareCodeTexture(MjClient.data.sData.tData.tableInfoUrl, function(){
                            postEvent("capture_screen");
                            if(MjClient.endallui && cc.sys.isObjectValid(MjClient.endallui)){
                                MjClient.endallui.capture_screen = true;
                            }   
                            btn.setTouchEnabled(false);
                        });
                    });
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fanxiang",  {uid:MjClient.playui.getSelfUid(),gameType:MjClient.gameType});
                },
                _visible:function(){ 
                    return !MjClient.remoteCfg.guestLogin && !MjClient.data.sData.tData.matchId;
                },
                _event:{
                    captureScreen_OK:function(){ 
                        if (MjClient.endallui.capture_screen != true)
                            return;
                        MjClient.endallui.capture_screen = false;
                        var writePath = jsb.fileUtils.getWritablePath();
                        var textrueName = "wxcapture_screen.png";
                        var savepath = writePath+textrueName;
                        MjClient.shareImageToSelectedPlatform(savepath);
                        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function()
                        {
                            this.setTouchEnabled(true);
                        }.bind(this))));

                        if(MjClient.Scene.getChildByName("shareCode")) {
                            MjClient.Scene.removeChildByName("shareCode");
                        }
                    }
                }
            } 
        } 
    },
    //用于子类
    jsBind : {},
    
    ctor:function (jsonSrc) {
        this._super(); 
        
        var jsonFile = jsonSrc === undefined ? "endAll_maJiang.json" : jsonSrc;
        var endallui = ccs.load(jsonFile);
        MjClient.endallui=this;
        util.assign(this.jsBind, this._jsBind);
        BindUiAndLogic(endallui.node,this.jsBind);
        endallui.node.setName("endAllUI");
        this.addChild(endallui.node);
         
        var _back = endallui.node.getChildByName("back");
        //四个玩家的详细信息
        this.setEndUserInfo(_back.getChildByName("layout_infoBg"));

        //如果是亲友圈的房间显示亲友圈图标及名称
        this.showClubRoomInfo(_back.getChildByName("img_club"));
 
        //复制战绩 btnCopy 这个文件不能改
        // addCopyBtnToGameOverLayer(endallui.node);
     
        return true;
    },
    onEnter:function(){
        this._super();
        if (MjClient.homeui && MjClient.systemConfig.rankEnable == "true"){
            MjClient.homeui.gameRankLayer();
        }
    }
});

majiang_gameOver.prototype.setGameOverLayer = function(node,off){
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.playui.getPlayerWithIndex(off);
    if(!pl){
        node.setVisible(false);
        return;
    }

    var uidSelf = MjClient.playui.getSelfUid();
    var maxWinScore = 0, maxWinPlayer, maxLoseScore = 999999999, maxLosePlayer, maxDianPaoCount = 0;   
    var uid, pi;    
    //计算所有人数据
    for (uid in sData.players) {
        pi = sData.players[uid];
        if(!pi){
            continue;
        }
        maxDianPaoCount = Math.max(maxDianPaoCount,pi.dianpaoTotal);
        if (maxWinScore < pi.winall) {
            maxWinScore = pi.winall;
            maxWinPlayer = uid;

        } else if (maxWinScore == pi.winall) {
            if (parseInt(uid) < parseInt(maxWinPlayer)) {
                maxWinScore = pi.winall;
                maxWinPlayer = uid;
            }
        }
        if (pi.winall < maxLoseScore) {
            maxLoseScore = pi.winall;
            maxLosePlayer = uid;
        } else if (pi.winall == maxLoseScore) {
            if (parseInt(uid) < parseInt(maxLosePlayer)) {
                maxLoseScore = pi.winall;
                maxLosePlayer = uid;
            }
        }
    }

    var paoScore = 9999, paoWang = null;
    for (uid in sData.players) {
        pi = sData.players[uid];
        if(!pi){
            continue;
        }
        if(maxDianPaoCount === pi.dianpaoTotal) {
            if(pi.winall <= paoScore) {
                paoScore = pi.winall;
                paoWang = pi;
            }
        }
    }

    var uibind={
        img_bg: {
            _run: function () {
                if(pl.winall === 0 || pl.winall < maxWinScore){
                    this.loadTexture("gameOver/pjjs_10.png");
                }else{
                    this.loadTexture("gameOver/pjjs_9.png");
                }
            }
        },
        text_name:{
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
            },
            _text:function(){
                return MjClient.playui.formatUserName(unescape(pl.info.nickname)+"", 7, true);
            }
        },
        text_id: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                return  "ID: " + pl.info.uid.toString();
            }
        },
        // 头像
        img_head: {
            _run:function(){
                MjClient.endallui.addWxHeadToEndUI(this,off);   
            }
        },
        img_jieSanIcon: {
            _visible:function(){
                return off == 0 && MjClient.isDismiss;
            }
        },
        text_score: {
            _run:function(){ 
                this.ignoreContentAdaptWithSize(true);

                var _img1 = "gameOver/over_add_sub.png";
                var _img2 = "gameOver/over_sub_text.png";
                var _star_text = "0";

                if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ){
                    _img1 = "gameOver/pjjs_24.png";
                    _img2 = "gameOver/pjjs_29.png";
                    _star_text = ".";
                } else if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                    _img1 = "gameOver/pjjs_24_new.png";
                    _img2 = "gameOver/pjjs_29_new.png";
                    _star_text = ".";
                }

                var _score = pl.winall;
                if((tData.areaSelectMode.scoreNeedEnough == 1) && pl.winall2){
                    _score = pl.winall2;
                }
                var textFileName = _score >= 0 ? _img1 : _img2;
                this.setProperty(_score + "", textFileName, 40, 58, _star_text);
            },
            // 分数加减
            img_icon: {
                _run : function(){
                    var fileName = pl.winall >= 0 ? "gameOver/over_add_icon.png" : "gameOver/over_sub_icon.png";
                    this.loadTexture(fileName);
                }
            }
        },
        // 大赢家
        img_bigWinner: {
            //最高得分  
            _run:function(){
                if(pl.winall == 0 || pl.winall < maxWinScore){
                    this.setVisible(false);
                }
            }
        },
        //最佳炮手
        img_paoShowIcon:{
            _visible:function(){
                if(maxDianPaoCount == 0 || !paoWang)
                    return false;
                return paoWang === pl; 
            }
        },
        text_scoreTips: {
            _run : function(){
                if(!tData.isFanBei && !pl.isNeedFanBei) return;
                node.getChildByName("text_score").y += 20;

                this.visible = true;
                this.setString("( " + pl.winall * 0.5 + " x2 )");
                this.ignoreContentAdaptWithSize(true);
                if(pl.winall < 0){
                    this.setTextColor(cc.color(0x78,0xf7,0xff));
                } else {
                    this.setTextColor(cc.color(0xf0,0xff,0x76));
                }

            }
        }
    }; 
    BindUiAndLogic(node,uibind); 

    var para = {};
    para.scale = 0.7;
    AddFangKaIcon(sData, node, tData, pl, maxWinScore, maxWinPlayer,  maxLoseScore, maxLosePlayer, cc.p(15, 445), para);
    if ((tData.areaSelectMode.scoreNeedEnough == 1) && pl.winall2 && (pl.winall2 < 0) && (pl.winall2 > pl.winall)) {
        var textTip = new ccui.ImageView("gameOver/newOver/jifenbuzu.png");
        textTip.setPosition(cc.p(166, 435));
        node.addChild(textTip);
    }

    this.setRoomStatistics(node.getChildByName("layout_typeText"), pl );
};

// 开始跑得时候把大小结算下面这种类型的东西都放到设置里面去
majiang_gameOver.prototype.getEndallStatisticsName = function() {  
    return ["zimoTotal","dianpaoTotal","jiepaoTotal","angangTotal"];
};

majiang_gameOver.prototype.getEndallStatisticsKey = function() {  
    return ["自摸次数","点炮次数","接炮次数","暗杠次数"];
};

// 设置房间统计内容
majiang_gameOver.prototype.setRoomStatistics = function(layout_typeText,pl) {
    var infoType = this.getEndallStatisticsName();
    var infoName = this.getEndallStatisticsKey();

    var text_score = layout_typeText.getChildByName("text_score");
    var text_type = layout_typeText.getChildByName("text_type");
    var scoreSize = 28 * 1.2; // CSD中的高度 * 额外增加一点间距 
    for (var i = 0; i < infoType.length; i++) {
        var cloneName = text_type;
        var cloneScore = text_score;
        if(i != 0){
            cloneName = text_type.clone();
            cloneScore = text_score.clone();
            layout_typeText.addChild(cloneName);
            layout_typeText.addChild(cloneScore);
        } 
        cloneName.y -= scoreSize*i;
        cloneScore.y -= scoreSize*i;
        cloneName.ignoreContentAdaptWithSize(true);
        cloneScore.ignoreContentAdaptWithSize(true);
        var statistics = pl[ infoType[i] ];
        cloneScore.setTextColor(pl.winall < 0 ? cc.color("#00824C") : cc.color("#D3260E"));
        cloneScore.setString(statistics > 0 ? statistics : "0");
        cloneName.setString(infoName[i]);
        // cloneName.setTextColor(cc.color(144, 111, 63));//wj
        // cloneScore.setTextColor(cc.color(144, 111, 63));//wj
    }
    //wj
    // layout_typeText.parent.getChildByName("text_id").setTextColor(cc.color(144,111,63));
    // layout_typeText.parent.getChildByName("text_name").setTextColor(cc.color(144,111,63));
};

// 设置玩家信息
majiang_gameOver.prototype.setEndUserInfo = function(layout_infoBg) {

    var sData = MjClient.data.sData,
        playerNum = Object.keys(sData.players).length,
        infoItem = layout_infoBg.getChildByName("info"),
        itemWidth = infoItem.getContentSize().width,
        itemMargin = [0, 0, 130, 30, 0][playerNum];

    for(var i = 0; i < playerNum; i++){
        var item = infoItem.clone();
        MjClient.endallui.setGameOverLayer(item, i);
        COMMON_UI.addGameOverNotSameClubUI(item, MjClient.playui.getPlayerWithIndex(i));
        layout_infoBg.pushBackCustomItem(item);
    }

    layout_infoBg.removeItem(0);
    layout_infoBg.setItemsMargin(itemMargin);
    layout_infoBg.width = itemWidth * playerNum + itemMargin * (playerNum - 1);
    layout_infoBg.setScrollBarEnabled(false);
    layout_infoBg.refreshView();
};

// 显示俱乐部内容
majiang_gameOver.prototype.showClubRoomInfo = function(clubNode) {  
    var tData=MjClient.data.sData.tData;
    var clubInfoTable = getClubInfoInTable();
    if (clubInfoTable && typeof(clubInfoTable.clubAvatar) != "undefined" && clubInfoTable.clubId && clubNode != null){ 
        var clubName = clubNode.getChildByName("text_clubName");
        clubName.ignoreContentAdaptWithSize(true);
        clubName.setString("" + unescape(clubInfoTable.clubTitle));

        var nameStr = unescape(clubInfoTable.ruleName);
        var ruleName = clubName.clone();
        ruleName.ignoreContentAdaptWithSize(true);
        ruleName.setString(nameStr);
        ruleName.y = clubName.y + clubName.height/2 + ruleName.height/2;
        ruleName.x = clubName.x;
        clubNode.addChild(ruleName);

        cc.loader.loadImg(clubInfoTable.clubAvatar, {
            isCrossOrigin: true
        }, function(err, texture) {
            if (err || !texture || !sys.isObjectValid(clubNode))
                return;

            var sp = new cc.Sprite(texture);
            if (!sp)
                return;

            sp.setScale((clubNode.width - 8) / sp.width);
            sp.setPosition(cc.p(clubNode.width / 2, clubNode.height / 2));
            clubNode.addChild(sp);
        });
    }else if (clubNode != null){
        clubNode.setVisible(false);
    }
};

// 获取房间信息
majiang_gameOver.prototype.getRoomInfoText = function() {  
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var text = "";
    text += GameCnName[MjClient.gameType];
    text += "-" + tData.maxPlayer + "人\n";
    var roundNumPre = typeof(tData.roundNumPre) != "undefined" ? tData.roundNumPre : tData.roundNum;
    text += "房号：" + tData.tableid;
    if (roundNumPre && tData.roundAll - tData.roundNumPre + 1 <= tData.roundAll)
        text += " 局数：" + (tData.roundAll - tData.roundNumPre + 1) + "/" + tData.roundAll;
    text += "\n";
    if(MjClient.roundEndTime)
    text += MjClient.roundEndTime + "";
 
    return text;
};

// 获取房间结束的信息
majiang_gameOver.prototype.getRoomEndInfoText = function() {  
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    //描述结算  
    if (MjClient.isDismiss){  
        var id = tData.firstDel;
        var pl = sData.players[id];
        var delStr = "";
        if(pl) {
            var name  =  unescape(pl.info.nickname);
            delStr = name + pl.mjdesc[0]; 
        } else {
            delStr = tData.dissolveWay == -1? '系统停服自动解散房间':'会长或管理员解散房间';
        }  
        return delStr; 
    }
    // 结束时间 
    return MjClient.roundEndTime+"";
};

// 关闭退出界面
majiang_gameOver.prototype.closeOverView = function() {
    var sData=MjClient.data.sData;
    var tData=sData.tData;

    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Tuichu", {uid:MjClient.playui.getSelfUid(),gameType:MjClient.gameType});
    if(MjClient.Scene.getChildByName("shareCode")) {
        MjClient.Scene.removeChildByName("shareCode");
    }

    var clubInfoTable = getClubInfoInTable();
    if (clubInfoTable && !(MjClient.rePlayVideo >= 0 && MjClient.replayui)) {
        if (!MjClient.FriendCard_main_ui)
            MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));
    } 

    MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
    delete MjClient.data.sData;
    delete MjClient.gameType;
    
    if (!MjClient.enterui && !MjClient.FriendCard_main_ui)
        MjClient.Scene.addChild(new EnterRoomLayer());

    if(MjClient.endallui){
        MjClient.endallui.removeFromParent(true);
        MjClient.endallui = null;
    }
    postEvent("LeaveGame");

    if(MjClient.rePlayVideo >= 0 && MjClient.replayui){
        MjClient.replayui.replayEnd();
    }
};

// 微信头像
majiang_gameOver.prototype.addWxHeadToEndUI = function(node, off) {
    var pl = MjClient.playui.getPlayerWithIndex(off);
    var img = "png/default_headpic.png";
    if (pl && pl.wxHeadImg) {
        img = pl.wxHeadImg;
        loadWxHead();
    } else { // 回放直接弹总结算 没有缓存头像
        cc.loader.loadImg(pl.info.headimgurl, {isCrossOrigin: true}, function(err, texture) {
            if (!err && texture) {
                img = texture;
                loadWxHead();
            }
        });
    }

    function loadWxHead() {
        var sp = new cc.Sprite(img);
        var frame = node;
        var clippingNode = new cc.ClippingNode();
        var mask = new cc.Sprite("gameOver/gameOver_headBg2.png");
        clippingNode.setAlphaThreshold(0);
        clippingNode.setStencil(mask);

        sp.setScale(mask.getContentSize().width / sp.getContentSize().width);
        clippingNode.addChild(sp);
        clippingNode.setPosition(frame.getContentSize().width / 2, frame.getContentSize().height / 2);
        //遮罩框
        var hideblock = new cc.Sprite("gameOver/gameOver_headBg3.png");
        hideblock.setPosition(frame.getContentSize().width / 2, frame.getContentSize().height / 2);
        frame.addChild(clippingNode);
        frame.addChild(hideblock);
    }
};

/**
 * 大结算，分享的二维码
 * @param url
 * @cb  下载图片成功后的回调函数
 */
majiang_gameOver.prototype.getShareCodeTexture = function(url, cb) {
    // 有个性头像，使用个性头像，没有则用传参的 url 即二维码图片
    var sData = MjClient.data.sData;
    var uidSelf = MjClient.playui.getSelfUid();
    var player = sData.players[uidSelf + ""];
    if (player && player.info.photo) {
        url = player.info.photo;
        if (url.indexOf("https") == 0) {
            url = url.replace(/https/, "http");
        }
    }

    if (!url || url == "") {
        if(cb) cb();
        return;
    } else {
        cc.loader.loadImg(url, { isCrossOrigin: true }, function(err, texture) {
            if (!err && texture) {
                var codePic = new cc.Sprite(texture);
                codePic.setPosition(cc.winSize.width,cc.winSize.height);
                codePic.setName("shareCode");
                codePic.setAnchorPoint(1,1);
                MjClient.Scene.addChild(codePic,100);
                setWgtLayout(codePic,[0.12,0.12],[1,1],[0,0], true);
                if(cb) cb();
            }
        });
    }
};