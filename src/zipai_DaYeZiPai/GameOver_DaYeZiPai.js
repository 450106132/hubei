function addWxHeadToEndUI_DaYeZiPai_GO(node, off) {
    var pl = MjClient.getPlayerByIndex(off);
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
        setRoundEndUserOffline_DaYeZiPai(frame,pl);
        frame.addChild(hideblock);
    }
}

function setRoundEndUserOffline_DaYeZiPai(frame, pl){
    if(!pl){
        return;
    }

    if (pl.onLine == false){
        //添加离线图片
        var _offline = new cc.Sprite("playing/paohuzi/offLine.png");
        var mask = new cc.Sprite("gameOver/gameOver_headBg2.png");
        var clippingNode = new cc.ClippingNode();

        clippingNode.setAlphaThreshold(0);
        clippingNode.setStencil(mask);
        _offline.setScale(mask.getContentSize().width / _offline.getContentSize().width);
        clippingNode.addChild(_offline);
        clippingNode.setPosition(frame.getContentSize().width / 2, frame.getContentSize().height / 2);
        frame.addChild(clippingNode);

        //添加离线具体时间
        var _currentTime = new Date().getTime();
        _timeNode = new ccui.Text();
        _timeNode.setFontSize(22);
        frame.addChild(_timeNode);
        _timeNode.setPosition(cc.p(frame.getContentSize().width/2,frame.getContentSize().height * 0.73));
        if (pl.offLineTime){
            var _showTime = _currentTime - pl.offLineTime;
            _timeNode.setString(MjClient.dateFormat(new Date(_showTime),"mm:ss"));
        }
        else{
            _timeNode.setString("");
        }
    }
}

function SetGameOverLayer_DaYeZiPai(node,off,isNewUi){
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    if(!pl){
        node.setVisible(false);
        return;
    }
    // setDismissTypeImg(pl,node,0.5,0.19,"chang");
    var uidSelf = SelfUid();
    var MaxWinAll=0;
    var MaxDianPao=0;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;

    setDismissTypeImg(pl,node,0.5,0.27,"chang");

    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi){
            if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){ // 衡阳
                if (MaxWinAll < pi.winall) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;

                }else if (MaxWinAll == pi.winall) {
                    if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                        MaxWinAll = pi.winall;
                        MaxWinPlayer = uid;
                    }
                }
                if (pi.winall < MaxloseAll) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }else if (pi.winall == MaxloseAll) {
                    if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                        MaxloseAll = pi.winall;
                        MaxlosePlayer = uid;
                    }
                }

            }else{ // 邵阳
                if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI) {
                    MaxWinAll = MaxWinAll>pi.winScore?MaxWinAll:pi.winScore;
                }else{
                    if (MaxWinAll < pi.winall) {
                        MaxWinAll = pi.winall;
                        MaxWinPlayer = uid;

                    }else if (MaxWinAll == pi.winall) {
                        if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                            MaxWinAll = pi.winall;
                            MaxWinPlayer = uid;
                        }
                    }
                    if (pi.winall < MaxloseAll) {
                        MaxloseAll = pi.winall;
                        MaxlosePlayer = uid;
                    }else if (pi.winall == MaxloseAll) {
                        if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                            MaxloseAll = pi.winall;
                            MaxlosePlayer = uid;
                        }
                    }
                }
            }
        }
    }

    var uibind={
        name:{
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
            },
            _text:function(){
                if(!pl){
                    return "";
                }
                return getNewName(unescape(pl.info.nickname)+"");
            }
        },
        id: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                if(!pl){
                    return "ID:";
                }
                return  "ID: " + pl.info.uid.toString();
            }
        },
        allscore:{
            winNum1:{
            },
            winNum2:{
            },
            bigWinner:{
                _visible : false
            }
        }
    };

    var wxNode = node.getChildByName("head");
    addWxHeadToEndUI_DaYeZiPai_GO(wxNode,off);
    BindUiAndLogic(node,uibind);


    node.getChildByName("jieSanIcon").setVisible(off == 0 && MjClient.isDismiss);



    var jiachuiIcon = node.getChildByName("jiachui");
    jiachuiIcon.setVisible(pl.jiachuiNum == 1);

    var textNode = node.getChildByName("textNode");

    //最高得分
    var bigWinner = node.getChildByName("bigWinner");
    bigWinner.setVisible(false);

    // 玩家分数
    var winNum = node.getChildByName("score_text");
    winNum.ignoreContentAdaptWithSize(true);
    var icon = node.getChildByName("icon");
    var scoreContnet = 0;
    if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI)
        scoreContnet = pl.winScore;
    else
        scoreContnet = pl.winall;

    // var textFileName = scoreContnet >= 0 ? "gameOver/addScore_zipai.png" : "gameOver/loseScore_zipai.png";
    // var iconImg = scoreContnet >= 0 ? "gameOver/add_zipai.png" : "gameOver/sub_zipai.png";
    var textFileName = scoreContnet >= 0 ? "gameOver/over_add_sub.png" : "gameOver/over_sub_text.png";
    var iconImg = scoreContnet >= 0 ? "gameOver/over_add_icon.png" : "gameOver/over_sub_icon.png";
    icon.loadTexture(iconImg);
    winNum.setProperty(scoreContnet + "", textFileName, 40, 58, "0");
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP)
    {
        textFileName = scoreContnet >= 0 ? "gameOver/pjjs_24.png" : "gameOver/pjjs_29.png";
        winNum.setProperty(scoreContnet + "", textFileName, 40, 58, ".");
    }

    

    // 大赢家
    var nodeParent = node.getParent().getParent();

    if( scoreContnet == MaxWinAll  && scoreContnet != 0  ){
        bigWinner.visible = true;
        node.loadTexture("gameOver/over_box_1.png");
    }

    AddFangKaIcon(sData, node, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, cc.p(50, 435));

    if(tData.isFanBei){
        var fanBei_text = node.getChildByName("fanBei");
        fanBei_text.visible = true;
        fanBei_text.setString("( " + pl.winall * 0.5 + " x2 )");
        fanBei_text.ignoreContentAdaptWithSize(true);
        if(pl.winall < 0){
            fanBei_text.setTextColor(cc.color(165,255,255));
            fanBei_text.enableOutline(cc.color(66,60,102), 2);
        }
    }

    //分数位置移动
    var moveSize = winNum.getCustomSize().width *0.3;
    winNum.x -= moveSize;
    icon.x -= moveSize;


    // 玩家数据信息
    var showRoomStatistics = function(node,showList,data){
        // roomStatistics [] // 胡牌 自摸 点炮 提 跑 最大积分 次数统计
        var showStatistics = {"huNum":0,"ziMoNum":1,"jiFenNum":5};
        for (var i = 0; i < showList.length; i++) {
            var name = showList[i];
            var text = node.getChildByName(name);
            text.setString("" + data[showStatistics[name]]);
        }
    }
    //
    showRoomStatistics(textNode,["huNum","ziMoNum","jiFenNum"],pl.roomStatistics);
}

var GameOverLayer_DaYeZiPai = cc.Layer.extend({
    sprite:null,
    jsBind:{
        back:{
            close :{
            },
            share :{
                img_shine:{
                    _visible:false
                },
                img_txt:{
                    _visible:false
                },
                img_point:{
                    _visible:false
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
                        if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    }
                }
            }
        }

    },
    ctor:function () {
        this._super();
        var endallui = ccs.load("endAll_daYeZiPai.json");
        BindUiAndLogic(endallui.node,this.jsBind);
        this.addChild(endallui.node);
        // setWgtLayout(endallui.node,[0,1],[0,0],[0,0]);
        MjClient.endallui=this;


        // 要测试后面的遮罩
        var _bgBox = endallui.node.getChildByName("bgBox");
        setWgtLayout(_bgBox,[1,1],[0.5,0.5],[0,0],true);

        var _back = endallui.node.getChildByName("back");
        setWgtLayout(_back,[0.95,0.95],[0.5,0.5],[0,0]);
        // //分享
        var _share =  _back.getChildByName("share");
        this._share = _share;
        var sData=MjClient.data.sData;
        var tData=sData.tData;
        _share.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;

        //_share.x = 713.24;//屏蔽再来一局的时候，坐标要移动一下
        _share.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
                    {
                        COMMON_UI.getShareCodeTexture(tData.tableInfoUrl,_back,function(){
                            cc.log("====================capture_screen=======================");
                            postEvent("capture_screen");
                            if(MjClient.endallui && cc.sys.isObjectValid(MjClient.endallui)){
                                MjClient.endallui.capture_screen = true;
                            }
                            _share.setTouchEnabled(false);
                        });
                    });
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fanxiang",  {uid:SelfUid(),gameType:MjClient.gameType});
                    break;
                default :
                    break;
            }
        },this);


        //四个玩家的详细信息
        var infoBg = _back.getChildByName("infoBg");
        var infoBgSize = infoBg.getCustomSize();

        var info = infoBg.getChildByName("info");
        info.visible = false;
        var bgSize = info.getCustomSize();
        var sData = MjClient.data.sData;
        var players = sData.players;
        var playerCount = Object.keys(players).length;




        var num = playerCount == 4 ? 3.5 : 3.5;
        var pos = (infoBgSize.width /  num  - 10 );
        var space = (infoBgSize.width - playerCount * bgSize.width) / (playerCount + 1);
        var startPosX = space + bgSize.width / 2;

        var clone = null;
        for(var i = 0 ; i < playerCount ; i++){
            clone = info.clone();
            clone.visible = true;
            if(playerCount == 4){
                clone.setPosition(cc.p(pos * i + (bgSize.width*0.32 ),infoBgSize.height/2));
            }else if(playerCount == 2){
                clone.setPosition(cc.p(startPosX + (space + bgSize.width) * i, infoBgSize.height/2));
            }else{
                clone.setPosition(cc.p(pos * i + (infoBgSize.width*0.23),infoBgSize.height/2));
            }

            infoBg.addChild(clone);
            SetGameOverLayer_DaYeZiPai(clone,i, false);

            COMMON_UI.addGameOverNotSameClubUI(clone,MjClient.getPlayerByIndex(i))
            // startPos = cc.p(startPos.x + bgSize.width+off_x,startPos.y);
        }
        var clubInfoTable = getClubInfoInTable();
        // // 如果是亲友圈的房间显示亲友圈图标及名称
        var clubNode = _back.getChildByName("Image_club");
        if (clubInfoTable && typeof(clubInfoTable.clubAvatar) != "undefined" && clubInfoTable.clubId && clubNode != null)
        {
            var clubName = clubNode.getChildByName("Text_name");
            clubName.ignoreContentAdaptWithSize(true);
            clubName.setString("" + unescape(clubInfoTable.clubTitle));

            var _nameStr = unescape(clubInfoTable.ruleName);
            var _ruleName = clubName.clone();
            _ruleName.ignoreContentAdaptWithSize(true);
            _ruleName.setString(_nameStr);
            _ruleName.y = clubName.y + clubName.height/2 + _ruleName.height/2;
            _ruleName.x = clubName.x;
            clubNode.addChild(_ruleName);

            
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
        }
        else if (clubNode != null)
        {
            clubNode.setVisible(false);
        }

        var sData=MjClient.data.sData;
        var tData=sData.tData;

        // var jieSanIcon = _back.getChildByName("jieSanIcon");
        // jieSanIcon.setVisible(MjClient.isDismiss);

        var _infoMation =  _back.getChildByName("infoMation");
        if (_infoMation) {
            _infoMation.setString("")
            _infoMation.visible = true;
            //描述结算
            if (MjClient.isDismiss)
            {

                var id = tData.firstDel;
                var pl = sData.players[id];
                var delStr = "";
                if(pl) {
                    var name  =  unescape(pl.info.nickname );
                    delStr = name + pl.mjdesc[0];
                } else {
                    delStr = tData.dissolveWay == -1? '系统停服自动解散房间':'会长或管理员解散房间';
                }
                _infoMation.setString("" + delStr) ;
            }
        }

        // 结束时间
        if(!MjClient.isDismiss && _infoMation){
            _infoMation.setString( MjClient.roundEndTime+"");
        }

        function _infoText(){
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            var text = "";//GameCnName[MjClient.gameType];
            var roomID = tData.tableid;
            text += GameCnName[MjClient.gameType] +  ",房间号:" + roomID +  "," + getPlaySelectPara(MjClient.gameType, tData.areaSelectMode);

            if(MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI) {
                var textArr = text.split(",");
                var tempText = "";
                for (var i = 0; i < textArr.length; i++) {
                    if(i != 0 && textArr[i] != "" && i < textArr.length  )
                        tempText += ",";
                    tempText += textArr[i];
                }
                return tempText;
            }
            return text;
        }


        var information = _back.getChildByName("information");
        information.ignoreContentAdaptWithSize(false);
        information.setSize(cc.size(370, 90));


        information.setString(_infoText());

        cc.log(JSON.stringify(MjClient.data.sData));

        // //close ,关闭
        var _close1 =  _back.getChildByName("close");
        this._close1 = _close1;
        _close1.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Tuichu", {uid:SelfUid(),gameType:MjClient.gameType});
                    var clubInfoTable = getClubInfoInTable();
                    if (clubInfoTable && !(MjClient.rePlayVideo >= 0 && MjClient.replayui)) {
                        if (!MjClient.FriendCard_main_ui)
                            MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));
                    }
                    //MjClient.leaveGame();
                    //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                    //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                    MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                    delete MjClient.data.sData;
                    delete MjClient.gameType;
                    postEvent("LeaveGame");
                    if (!MjClient.enterui && !MjClient.FriendCard_main_ui)
                        MjClient.Scene.addChild(new EnterRoomLayer());

                    if(MjClient.endallui){
                        MjClient.endallui.removeFromParent(true);
                        MjClient.endallui = null;
                    }

                    if(MjClient.rePlayVideo >= 0 && MjClient.replayui){
                        MjClient.replayui.replayEnd();
                    }


                    break;
                default :
                    break;
            }
        },this);

        // 显示复制按钮
        addCopyBtnToGameOverLayer(endallui.node);

        return true;
    },
    onEnter:function()
    {
        this._super();
        if (MjClient.homeui && MjClient.systemConfig.rankEnable == "true")
        {
            MjClient.homeui.gameRankLayer();
        }
    },

    //提前查看总结算的一些设置
    replaySet : function(cb){
        var btn = new ui.Button("ui/zhanji/huikanMj_n.png", "ui/zhanji/huikanMj_s.png", "ui/zhanji/huikanMj_s.png", ccui.Widget.LOCAL_TEXTURE);
        btn.addClickEvent(function(){
            MjClient.goOnReplay();
        }, this);
        btn.x = this._share.x + 120;
        btn.y = this._share.y;
        // btn.scale = 1.2;
        this._share.parent.addChild(btn);
        this._share.x -= 120;

        this._close1.addTouchEventListener(function(sender,Type){
            if(MjClient.endallui){
                MjClient.endallui.removeFromParent(true);
                MjClient.endallui = null;
            }

            if(MjClient.rePlayVideo >= 0 && MjClient.replayui){
                MjClient.replayui.replayEnd();
            }
        },this);
    }
});
