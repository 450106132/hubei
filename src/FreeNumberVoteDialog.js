var addFreeNumberBtn = function (pos, off) {
 
    var parentNode = null;

    if (MjClient.playui.isNewFrameMaJiang) {
        // 新版麻将兼容
        parentNode = MjClient.playui.getChildByName("playui");
    } else{
        parentNode = MjClient.playui._downNode.getParent();
    }

    var waitNode = parentNode.getChildByName("wait");
    if(!waitNode){ 
        //兼容新版字牌
        waitNode = parentNode;
    }
    cc.log("----------------我擦 走到这里了 ")
    if (!waitNode) {
        cc.log("addFreeNumberBtn waitNode is null");
        return;
    }

    var freeNumberBtn = new ccui.Button();
    var refreshBtnFunc = function (isInit) {
        var tData = MjClient.data.sData.tData;
        var playerCount = Object.keys(MjClient.data.sData.players).length;
        var needCount = tData.maxPlayer - playerCount;
        var isVisible = playerCount > 1 && needCount > 0 && tData.freeBegin <= 0;

        /* 有选座的功能的时候自由人数  add by sking 2019.2.19*/
        if (GameClass[MjClient.gameType] === MjClient.GAME_CLASS.MA_JIANG && !MjClient.data.sData.tData.fieldId)
        {
            if(isJinZhongAPPType()) //金币场不选座
            {
                if(MjClient.data.sData.tData.areaSelectMode["xuanzuo"] || MjClient.gameType != MjClient.GAME_TYPE.JIN_ZHONG_KD) //目前只有晋中APP 只有晋中扣点有 选座的开房选项
                {
                    var dirCount = 0;//已经选座的人数
                    for (var uid in MjClient.data.sData.players) {
                        var pl = MjClient.data.sData.players[uid];
                        if(pl.dir >= 0) dirCount++;
                    }
                    if(dirCount < playerCount) isVisible = false; //如果有人在房间但是又没选座，择不显示开局的按钮！
                }
                // else if(MjClient.gameType != MjClient.GAME_TYPE.JIN_ZHONG_KD)
                // {
                //     var dirCount = 0;//已经选座的人数
                //     for (var uid in MjClient.data.sData.players) {
                //         var pl = MjClient.data.sData.players[uid];
                //         if(pl.dir >= 0) dirCount++;
                //     }
                //     if(dirCount < playerCount) isVisible = false; //如果有人在房间但是又没选座，择不显示开局的按钮！
                // }
            }

            // 湖北宜昌血流麻将，自由人数只能3,4人，不能2人开局
            if(MjClient.gameType === MjClient.GAME_TYPE.YI_CHANG_XUE_LIU_MJ) {
                isVisible = playerCount >= 2 && needCount > 0 && tData.freeBegin <= 0;
            }
        }
        cc.log(isVisible,"--------isVisible  叼你个还")
        freeNumberBtn.setVisible(isVisible);
        if (isVisible || isInit) {
            if (!isVisible)
                playerCount = 2;
            freeNumberBtn.loadTextureNormal("playing/gameTable/FreeNumber/" + playerCount + "PlayerStart_n.png");
            freeNumberBtn.loadTexturePressed("playing/gameTable/FreeNumber/" + playerCount + "PlayerStart_s.png");
            freeNumberBtn.playerCount = playerCount;
        }
    }

    refreshBtnFunc(true);
    freeNumberBtn.setName("freeNumberBtn");
    waitNode.addChild(freeNumberBtn);
    freeNumberBtn.addTouchEventListener(function(sender, type) {
        if (type == 2) {
            if (sender.playerCount == 2)
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_2renkaishi", {uid:SelfUid()});
            else if (sender.playerCount == 3)
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_3renkaishi", {uid:SelfUid()});
            else
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_4renkaishi", {uid:SelfUid()});

            FreeBeginToServer(true);
        }
    }, this);

    if(isYongZhouProject()){
        pos = pos || [0.5, 0.38];
    }else{
        pos = pos || [0.5, 0.16];
    }
    
    off = off || [0, 0];
    setWgtLayout(freeNumberBtn, [0.15, 0.106], pos, off);

    var refreshFreeNumberVoteDialog = function (isInit) {
        var tData = MjClient.data.sData.tData;
        var freeNumberVoteDialog = MjClient.playui.getChildByName("freeNumberVoteDialog");
        var needCount = tData.maxPlayer - Object.keys(MjClient.data.sData.players).length;
        if (tData.freeBegin > 0 && needCount > 0) {
            if (isInit && freeNumberVoteDialog) {
                freeNumberVoteDialog.removeFromParent();
                freeNumberVoteDialog = null;
            }

            if (!freeNumberVoteDialog)
                MjClient.playui.addChild(new FreeNumberVoteDialog());
        }
        else {
            if (freeNumberVoteDialog)
                freeNumberVoteDialog.removeFromParent();
        }
    }

    UIEventBind(null, freeNumberBtn, "addPlayer", function (eD) {
        refreshBtnFunc();
        refreshFreeNumberVoteDialog();
    });

    UIEventBind(null, freeNumberBtn, "removePlayer", function (eD) {
        refreshBtnFunc();
    });

    UIEventBind(null, freeNumberBtn, "FreeBegin", function(eD) {
        refreshFreeNumberVoteDialog();
        refreshBtnFunc();
    });

    UIEventBind(null, freeNumberBtn, "FreeEnd", function(eD) {
        refreshFreeNumberVoteDialog();
        refreshBtnFunc();
    });

    UIEventBind(null, freeNumberBtn, "initSceneData", function(eD) {
        refreshFreeNumberVoteDialog(true);
        refreshBtnFunc();
    });

    //add by sking 晋中的自由人数开局
    UIEventBind(null, freeNumberBtn, "selectDir_event", function (eD) {
        var off =  getUiOffByUid(eD.uid);
        var pl = getUIPlayer(off);
        if(pl && pl.info.uid == eD.uid)
        {
            pl.dir = eD.dir;
        }
        refreshFreeNumberVoteDialog(true);
        refreshBtnFunc();
    });
}

var FreeNumberVoteDialog = cc.Layer.extend({
    ctor: function() {
        this._super();
        var that = this;
        that.setName("freeNumberVoteDialog");

        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var players = sData.players;
        var uids = Object.keys(players);
        uids.splice(uids.indexOf(tData.firstFree + ""), 1);
        uids.unshift(tData.firstFree + "");

        var node = ccs.load("FreeNumberVoteDialog.json").node;
        node.setAnchorPoint(cc.p(0.5, 0.5));
        setWgtLayout(node, [1, 1], [0.5, 0.5], [0, 0], 2);
        this.addChild(node);

        var bgNode = node.getChildByName("Image_bg");
        var timeNode = bgNode.getChildByName("Image_time_di").getChildByName("Text_time");
        timeNode.ignoreContentAdaptWithSize(true);
        timeNode.setString("");

        var callback = function() {
            var sData = MjClient.data.sData;
            var tData = sData.tData;
            var time = sData.serverNow + Date.now();
            var needtime = tData.freeBegin - time;
            var need_s = Math.floor((needtime / 1000));
            timeNode.setString("" + need_s);
            if (need_s <= 0) {
                timeNode.stopAllActions();
                that.removeFromParent();

                tData.freeBegin = 0;
                tData.firstFree = 0;
                postEvent("FreeEnd", {});
            }
        };
        timeNode.runAction(cc.repeatForever(cc.sequence(cc.callFunc(callback), cc.delayTime(0.5))));

        var playerNumNode = bgNode.getChildByName("Text_info_2");
        playerNumNode.ignoreContentAdaptWithSize(true);
        playerNumNode.setString("" + uids.length);

        bgNode.getChildByName("Text_info_1").ignoreContentAdaptWithSize(true);
        bgNode.getChildByName("Text_info_3").ignoreContentAdaptWithSize(true);

        var infoNode = bgNode.getChildByName("Text_info_0");
        infoNode.ignoreContentAdaptWithSize(true);
        infoNode.setFontName("Arial");
        infoNode.setFontSize(infoNode.getFontSize());

        var firstPlayer = players[uids[0]];
        if (firstPlayer)
            infoNode.setString(getNewName(unescape(firstPlayer.info.nickname)));
        else
            infoNode.setString("");

        var headNodeSrc = bgNode.getChildByName("Image_head1");
        var width = bgNode.width * 0.7 / uids.length;
        var x = bgNode.width * 0.15 + width/2;
        var y = headNodeSrc.y;
        var headNodes = [];

        for (var i = 0; i < uids.length; i ++) {
            var pl = players[uids[i]];
            if (!pl)
                continue;

            var headNode = i == 0 ? headNodeSrc : headNodeSrc.clone();
            if (i != 0)
                bgNode.addChild(headNode);
            headNode.setPosition(x, y);
            x += width;
            this.refreshHead(headNode, pl.info.headimgurl);

            var nameNode = headNode.getChildByName("Text_name");
            nameNode.ignoreContentAdaptWithSize(true);
            nameNode.setString(getNewName(unescape(pl.info.nickname )));
            nameNode.setFontName("Arial");
            nameNode.setFontSize(nameNode.getFontSize());

            var stateNode = headNode.getChildByName("Text_state");
            stateNode.ignoreContentAdaptWithSize(true);

            // var stateNodeBG = headNode.getChildByName("Text_state_bg");
            // if(stateNodeBG){
            //     stateNodeBG.ignoreContentAdaptWithSize(true);
            //     stateNodeBG.loadTexture("res/DisRoom/disroom_1.png");
            // }

            headNodes.push(headNode);
        }

        var refreshState = function () {
            var sData = MjClient.data.sData;
            var players = sData.players;
            for (var i = 0; i < uids.length; i ++) {
                var headNode = headNodes[i];
                var pl = players[uids[i]];
                var stateNode = headNode.getChildByName("Text_state");
                if (i == 0)
                    stateNode.setString("申请开局");
                else if (pl.freeBegin > 0)
                    stateNode.setString("已同意");
                else
                    stateNode.setString("未表态");
            }

            waitBtn.setVisible(players[SelfUid()].freeBegin == 0);
            startBtn.setVisible(players[SelfUid()].freeBegin == 0);
        }
        var refreshState_LYG = function () {
            var sData = MjClient.data.sData;
            var players = sData.players;
            for (var i = 0; i < uids.length; i ++) {
                var headNode = headNodes[i];
                var pl = players[uids[i]];
                var stateNode = headNode.getChildByName("Text_state");
                var stateNodeBG = headNode.getChildByName("Text_state_bg");
                if(stateNodeBG) stateNodeBG.loadTexture("res/DisRoom/disroom_1.png");
                if (i == 0)
                {
                    stateNode.setString("申请开局");
                    if(stateNodeBG) {
                        stateNodeBG.loadTexture("res/DisRoom/disroom_2.png");
                        stateNode.setTextColor(cc.color("#358B5F"));
                    }
                }
                else if (pl.freeBegin > 0)
                {
                    stateNode.setString("已同意");
                    if(stateNodeBG) {
                        stateNodeBG.loadTexture("res/DisRoom/disroom_2.png");
                        stateNode.setTextColor(cc.color("#358B5F"));
                    }
                }
                else
                {
                    stateNode.setString("未表态");
                    if(stateNodeBG) {
                        stateNodeBG.loadTexture("res/DisRoom/disroom_1.png");
                        stateNode.setTextColor(cc.color("#4884A2"));
                    }
                }
            }

            waitBtn.setVisible(players[SelfUid()].freeBegin == 0);
            startBtn.setVisible(players[SelfUid()].freeBegin == 0);
        }
        var refreshState_LYG = function () {
            var sData = MjClient.data.sData;
            var players = sData.players;
            for (var i = 0; i < uids.length; i ++) {
                var headNode = headNodes[i];
                var pl = players[uids[i]];
                var stateNode = headNode.getChildByName("Text_state");
                if (i == 0)
                    stateNode.loadTexture("playing/gameTable/FreeNumber/Apply.png");
                else if (pl.freeBegin > 0)
                    stateNode.loadTexture("playing/gameTable/FreeNumber/agree.png");
                else
                    stateNode.loadTexture("playing/gameTable/FreeNumber/weibiaotai.png");
            }

            waitBtn.setVisible(players[SelfUid()].freeBegin == 0);
            startBtn.setVisible(players[SelfUid()].freeBegin == 0);
        }

        var waitBtn = bgNode.getChildByName("Button_wait");
        waitBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                FreeBeginToServer(false);
            }
        });

        var startBtn = bgNode.getChildByName("Button_start");
        startBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                FreeBeginToServer(true);
            }
        });

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ) 
        {
            refreshState_LYG();
        }
        else
        {
            refreshState();
        }

        UIEventBind(null, this, "FreeBegin", function(rtn) {
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ) 
            {
                refreshState_LYG();
            }
            else
            {
                refreshState();
            }
        });
    },
    leaveGame: function() {
        FreeBeginToServer(false);
        this.removeFromParent();
    },
    refreshHead: function(head, url) {
        var that = this;
        cc.loader.loadImg(url ? url : "png/default_headpic.png", {
            isCrossOrigin: true
        }, function(err, texture) {
            if (err || !texture || !sys.isObjectValid(head))
                return;

            if(isJinZhongAPPType())
            {
                var clippingNode = new cc.ClippingNode();
                var maskImg = "home/zhezhao.png";
                var hideblockImg = "home/homeHeadCusPic.png";
                var mask = new cc.Sprite(maskImg);
                clippingNode.setAlphaThreshold(0);
                clippingNode.setStencil(mask);
                var img = new cc.Sprite(texture);
                img.setScale(mask.getContentSize().width / img.getContentSize().width);
                clippingNode.addChild(img);
                clippingNode.setScale(0.97);
                clippingNode.setPosition(head.getContentSize().width / 2, head.getContentSize().height / 2);
                //遮罩框
                var hideblock = new cc.Sprite(hideblockImg);
                hideblock.setPosition(hideblock.getContentSize().width / 2, hideblock.getContentSize().height / 2);
                head.addChild(clippingNode);
                head.addChild(hideblock);
            }
            else
            {
                var sp = new cc.Sprite(texture);
                if (!sp)
                    return;
                if (MjClient.getAppType() != MjClient.APP_TYPE.QXJSMJ)
                sp.setScale(head.width / sp.width);
                sp.setPosition(cc.p(head.width / 2, head.height / 2));
                if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ)
                    that.CuttingHeadImg(head,texture);
                else
                    head.addChild(sp);
            }

        });
    },
    CuttingHeadImg:function (node,texture)
    {
        var head = node;
        var clippingNode = new cc.ClippingNode();
        var mask = new cc.Sprite("playing/gameTable/FreeNumber/hide.png");
        clippingNode.setAlphaThreshold(0);
        clippingNode.setStencil(mask);
        //clippingNode.setScale(0.75);
        var img = new cc.Sprite(texture);
        img.setScale(mask.getContentSize().width / img.getContentSize().width);
        clippingNode.addChild(img);
        clippingNode.setPosition(head.getContentSize().width / 2, head.getContentSize().height / 2 );
        head.addChild(clippingNode);
    }
});