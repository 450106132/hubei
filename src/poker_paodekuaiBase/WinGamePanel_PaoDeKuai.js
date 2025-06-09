

var jsBind_paoDeKuaiRoundOver = {
    block: {
        _layout: [[1, 1], [0.5, 0.5], [0, 0], true]
    }, 
    
    back: {
        //_layout: [[1, 1], [0.5, 0.5], [0, 0]],
        
        _run: function () {

            var valuePct = [1, 1];
            var valuePos = [0.5, 0.5];
            var valueOff = [0, 0];

            switch(MjClient.gameType){
                    
                case MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY:

                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP && isIPhoneX()) {
                        // 永州跑得快超框处理
                        valuePct = [0.8, 0.8];
                    }
                    break;
                case MjClient.GAME_TYPE.PAO_DE_KUAI_JZ:
                    if (isIPhoneX()) {

                        valuePct = [0.9, 0.9];
                    }
                    break;
            }

            setWgtLayout(this, valuePct, valuePos, valueOff);

            if (isIPhoneX())
            {
                switch(MjClient.gameType){
                    
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU:
                    
                        setWgtLayout(this, valuePct, valuePos, valueOff, true);
                        break;
                }
            }
        },

        wintitle: {
            _visible: function () {
                var pl = getUIPlayer(0);
                if (pl) {
                    return pl.winone >= 1;
                }
                return false;
            }
        }, 

        losetitle: {
            _visible: function () {
                var pl = getUIPlayer(0);
                if (pl) {
                    return pl.winone < 0;
                }
                return false;
            }
        }, 

        pingju: {
            _visible: function () {

                var pl = getUIPlayer(0);

                if (pl) {
                    
                    return pl.winone == 0;
                }
                return false;
            }, 
            _run: function () {
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
            },

            _event:{
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
            },

            _visible: function () {
                if(MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_TY || MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN || MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY){
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    return !MjClient.remoteCfg.guestLogin && !tData.matchId;
                }
                return !MjClient.remoteCfg.guestLogin;
            }
        },
        
        ready: {
            _run: function () {
                if (MjClient.remoteCfg.guestLogin) {
                    setWgtLayout(this, [0.15, 0.15], [0.5, 0.085], [0, 0], false, true);
                }

                if(MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_TY || MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN || MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY){
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    if (tData.matchId) {
                        this.setVisible(false);
                    }

                }
            },
            _click: function (btn, eT) {

                var sData = MjClient.data.sData;
                var tData = sData.tData;

                function clearEndOneUI()
                {
                    postEvent("clearCardUI");

                    
                    if(MjClient.endoneui){
                        MjClient.endoneui.removeFromParent(true);
                        MjClient.endoneui = null;
                            
                        // if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ){
                        //     var _lay = MjClient.endoneui.getParent().getChildByTag(650);
                        //     if(_lay){
                        //         _lay.removeFromParent(true);
                        //         _lay = null;
                        //         MjClient.endoneui = null;
                        //     }else{
                        //         MjClient.endoneui.removeFromParent(true);
                        //         MjClient.endoneui = null; 
                        //     }
                        // }else{
                        //     MjClient.endoneui.removeFromParent(true);
                        //     MjClient.endoneui = null; 
                        // }
                    }
                    
                }

                switch(MjClient.gameType){
                    
                    case MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY:
                        if(!tData.fieldId)
                        {
                            clearEndOneUI();
                        }

                        if (MjClient.rePlayVideo >= 0 && MjClient.replayui && !MjClient.endallui) {
                            MjClient.replayui.replayEnd();
                        }
                        else {
                            if (tData.fieldId){
                                leaveGameClearUI();
                                MjClient.Scene.addChild(new goldMatchingLayer({matching:false}));
                                MjClient.goldfieldEnter(tData.fieldId,tData.gameType);
                                return;
                            }else{
                                PKPassConfirmToServer_card();
                            }
                        }
                        if (MjClient.arrowbkNode && cc.sys.isObjectValid( MjClient.arrowbkNode )) {
                            MjClient.arrowbkNode.setVisible(false);
                        }
                        if (MjClient.endallui && sys.isObjectValid(MjClient.endallui))
                        {
                            MjClient.endallui.setVisible(true);
                        }
                        else
                            MjClient.endallui = null;

                        break;

                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_NT:
                        
                        clearEndOneUI();
                        
                        if (MjClient.rePlayVideo >= 0 && MjClient.replayui) {
                            MjClient.replayui.replayEnd();
                        }
                        else {
                            PKPassConfirmToServer_card();
                        }

                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_LYG:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_JZ:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HA:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI:

                        if (sData.tData.roundNum <= 0 && MjClient.gameType !=MjClient.GAME_TYPE.PAO_DE_KUAI ) 
                            MjClient.endoneui.getParent().addChild(new GameOverLayer(),500);

                        clearEndOneUI();

                        if (MjClient.rePlayVideo >= 0 && MjClient.replayui) {
                            MjClient.replayui.replayEnd();
                        }
                        else {
                            PKPassConfirmToServer_card();
                        }

                        if (MjClient.arrowbkNode && cc.sys.isObjectValid( MjClient.arrowbkNode )) {
                            MjClient.arrowbkNode.setVisible(false);
                        }
                        break;

                    case MjClient.GAME_TYPE.PAO_DE_KUAI_TY:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY:
                        if(!tData.fieldId){
                            if (sData.tData.roundNum <= 0)
                                MjClient.endoneui.getParent().addChild(new GameOverLayer(),500);
                        }
                        if(!tData.fieldId){
                            clearEndOneUI();
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
                        break;


                }
            }
        },

        close:
        {
            _visible: function () {

                var bRet = false;

                switch(MjClient.gameType){
                    
                    case MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY:
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        if(tData.fieldId){
                            bRet =  true;
                        }

                        bRet = false;
                        break;
                }
                return bRet;
            },

            _click: function (btn, eT) {

                switch(MjClient.gameType){
                    
                    case MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY:
                        leaveGameClearUI();
                        break;
                }
            }

        },

        delText:
        {
            _visible: function () {
                var bRet = true;

                switch(MjClient.gameType){
                    
                    case MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY:
                        bRet = MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ;
                        break;
                }

                return bRet;
            },
            _run: function() {

                var strRet = "";
                function getStrInfo()
                {
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
                                delStr = tData.dissolveWay == -1? '系统停服自动解散房间':'会长或管理员解散房间';//pl.mjdesc[0];
                                if (MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU ||
                                    MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_LYG || 
                                    MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI ||
                                    MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_JZ)
                                {
                                   delStr = pl.mjdesc[0]; 
                                }
                            }
                        }

                        strRet = delStr;
                    }
                }

                if ( MjClient.gameType == MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY)
                {
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());

                }

                getStrInfo();

                this.setString(strRet);
                
            }
        },
        
        dir:
        {
            _visible: true,
            _run:function()
            {
                var bRet = true; 
                
                switch(MjClient.gameType){
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN:
                        bRet = false;
                        if(MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN &&
                            MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP)
                        {
                            bRet =true;
                        }
                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_TY:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY:
                    //case MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN:
                        bRet = false;
                        if (!MjClient.endoneui.isNewUi && MjClient.getAppType() != MjClient.APP_TYPE.AYGUIZHOUMJ){
                            bRet = true;
                            break;
                        }
                        break;
                    case MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY:
                        bRet = false;
                        if(MjClient.getAppType() != MjClient.APP_TYPE.HUNANWANGWANG && MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ && 
                            MjClient.getAppType() != MjClient.APP_TYPE.QXLYQP){
                            bRet = true;
                        }
                        break;
                }

                this.ignoreContentAdaptWithSize(bRet);
            },
            _text: function () {
                var text = "";
                
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

                // switch(MjClient.gameType){
                    
                //     case MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY:

                //         if(MjClient.data.sData.tData.fieldId){
                //             text = GameCnName[MjClient.gameType] + " " + tData.maxPlayer + " 人";
                //         }else{
                //             text = GameCnName[MjClient.gameType] + " " + tData.maxPlayer + " 人   房号：" + tData.tableid;
                //         }
                //         break;
                    
                //     case MjClient.GAME_TYPE.PAO_DE_KUAI_JZ:
                        
                //         text += GameCnName[MjClient.gameType] + ",";
                //         text += tData.areaSelectMode.cardNumIndex == 0 ? "16张," : "15张,";

                //         if (tData.areaSelectMode.firstHeiTao3)
                //             text += "黑桃3先出,";
                //         else if (tData.areaSelectMode.firstOutOption == 2)
                //             text += "轮庄,";
                //         else
                //             text += "赢家先出,";

                        // text += tData.areaSelectMode.hongTao10Niao ? "红桃10扎鸟," : "";
                        // text += tData.areaSelectMode.mustPut ? "能管必管," : "";
                        // text += tData.areaSelectMode.isPlayerShuffle == 1 ? "手动切牌," : "";

                //         if (typeof(tData.areaSelectMode.fengDing) == "number") {
                //             switch (tData.areaSelectMode.fengDing)
                //             {
                //                 case 1:
                //                     text += "30/32分封顶,";
                //                     break;
                //                 case 2:
                //                     text += "60/64分封顶,";
                //                     break;
                //             }
                //         }

                //         text += tData.areaSelectMode.difen ? "底分X" + tData.areaSelectMode.difen + ",":"";
                //         if (typeof(tData.areaSelectMode.fanBei) != 'undefined') 
                //             text += tData.areaSelectMode.fanBei == 0 ? "不翻倍," : "低于" + tData.areaSelectMode.fanBeiScore + "分翻倍,";

                //         text += tData.areaSelectMode.baoDanPutMax ? "下家报单出大牌," : "";
                //         text += tData.areaSelectMode.playerPutZhaDan ? "打出玩家," : "";
                //         text += tData.areaSelectMode.zhaDanBuFanBei ? "炸弹不翻倍," : "";

                //         if (text.charAt(text.length - 1) == ",")
                //             text = text.substring(0, text.length - 1);
                    
                //         break;
                //     case MjClient.GAME_TYPE.PAO_DE_KUAI_TY:
                //         if (MjClient.endoneui.isNewUi){
                //             if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                //                 if(MjClient.data.sData.tData.fieldId){
                //                     text = GameCnName[MjClient.gameType] + " " + tData.maxPlayer + " 人";
                //                 }else{
                //                     text = GameCnName[MjClient.gameType] + " " + tData.maxPlayer + " 人   房号：" + tData.tableid;
                //                 }
                //                 //return text;
                //             }
                //         }

                //         break;
                // }
                return text;
            }
        },

        dir_fee: {
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
        },

        oneScore_title: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
            },
        },
        allScore_title: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
            },
        },
        
        head0: {
            head: {
                //zhuang:{_visible:false}
            },
            winNum: {
            },
        //    _run: function () { SetEndOneUserUI_paodekuai(this, 0); },

        }, 

        head1: {
            head: {
                //:{_visible:false}
            },
            winNum: {
                // _layout:[[0.08,0.08],[1,0.5],[-2.5,0.75]]
            },
        //    _run: function () { SetEndOneUserUI_paodekuai(this, 1); }
        }, 

        head2: {
            head: {
                //zhuang:{_visible:false}
            },
            winNum: {
                // _layout:[[0.08,0.08],[1,0.5],[-2.5,-0.75]]
            },
        //    _run: function () { SetEndOneUserUI_paodekuai(this, 2); }
        }
    }
};

util.deepFreeze(jsBind_paoDeKuaiRoundOver);

var tagRootUINode = 2000;

var EndOneView_PaoDeKuai = cc.Layer.extend({
    getJsBind: function() {
        return {};
    },
    ctor: function (json) {
        this._super();
        var endoneui = ccs.load(json);

        switch(MjClient.gameType){
                    
            case MjClient.GAME_TYPE.PAO_DE_KUAI_TY:
            case MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN:
            case MjClient.GAME_TYPE.PAO_DE_KUAI_HA:
            case MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW:
            case MjClient.GAME_TYPE.PAO_DE_KUAI_LYG:
            case MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI:
            case MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU:
            case MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY:
                this.isNewUi = (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| 
                MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
                MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ);
                MjClient.endoneui = this;
                break;
        }

        //this.isNewUi = (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ);

        this.jsBind = this.getJsBind();
        util.assign(this.jsBind, jsBind_paoDeKuaiRoundOver);

        //MjClient.endoneui = this;

        BindUiAndLogic(endoneui.node, this.jsBind);
        this.addChild(endoneui.node, 0, tagRootUINode);


        //时间
        var _back = endoneui.node.getChildByName("back");
        var _time = _back.getChildByName("time");
        _time.visible = true;

        //this._nodedir = _back.getChildByName("dir");
        
        if( (MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI || MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_LYG 
            || MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI )
             && MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ){
            _time.setPositionY(_time.getPositionY() + 65 );
        }

        _time.setString(MjClient.roundEndTime);
        MjClient.endoneui = this;

        this.nCardScale = 0.5;
        this.setPlayUIDirNodeData();
        this.setPlayUIDir_0NodeData();
        this.SetEndOneUserUI_PaoDeKuai();
        

        return true;
    }

    
});

EndOneView_PaoDeKuai.prototype.SetEndOneUserUI_PaoDeKuai = function() {

    var nodeBack = MjClient.endoneui.getChildByTag(tagRootUINode).getChildByName("back");
    for(var i = 0; i < 3; i++ )
    {
        var strTemp = "head".concat(i);
        var nodeItem = nodeBack.getChildByName(strTemp);
        this.SetEndOneUserUIItem_PaoDeKuai(nodeItem, i);
    }
};

EndOneView_PaoDeKuai.prototype.SetHeadUIItem_PaoDeKuai = function(node, off) {

}; 

EndOneView_PaoDeKuai.prototype.SetInvalidPlayUI_PaoDeKuai = function(node, off) {
    var pl = MjClient.getPlayerByIndex(off);

    if (pl) 
    {
        setUserOfflineWinGamePanel(node, pl);
    }
}; 

EndOneView_PaoDeKuai.prototype.addWXHeadUIItem_PaoDeKuai = function(bindObj, off) {

    var uibind = bindObj;

    addWxHeadToEndUI(uibind.head._node, off);
};  


EndOneView_PaoDeKuai.prototype.showAllCardItem_PaoDeKuai = function(node, pl) {

};  


EndOneView_PaoDeKuai.prototype.BindHeadUIItem_PaoDeKuai = function(node, off) {

    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var pl = MjClient.getPlayerByIndex(off);

    
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
                // _run: function () {
                //     var arry = [];

                //     if (pl.mjhandRecord)
                //     {
                //         //添加手牌
                //         for (var i = 0; i < pl.mjhandRecord.length; i++) {
                //             var card = getNewCard_card(node, "stand", "mjhand", pl.mjhandRecord[i], 0);
                //             arry.push(card);
                //             // 如果是打出去的牌， 显示遮罩
                //             if( pl.mjhand.indexOf(pl.mjhandRecord[i]) < 0) {
                //                 card.isGray = true;
                //                 card.setColor(MjClient.grayColor);
                //             }
                //         }
                //     }

                //     for (var i = 0; i < arry.length; i++) {
                //         arry[i].visible = true;
                //         arry[i].enabled = false;
                //         arry[i].setScale(arry[i].getScale() * 0.75);
                //     }
                //     CardLayoutRestoreForEndOne_ty(node, pl);
                // }
            }
        }, 
        winNum: {
            _text: function () {
                var pre = "";
                if (pl.winone > 0) pre = "+";
                return pre + pl.winone;
            },
            _run: function () {
                switch(MjClient.gameType){
                    
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU:
                        if(pl.winone < 0) { // 分数小于零，改变字体颜色
                            this.setTextColor(cc.color(124,198,236));
                            this.enableOutline(cc.color(92,100,199), 2);
                        }
                        break;
                }
            }
            , fenshu: {
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
            }
            , allScore: {
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    // 计算当前总分
                    var winScore = 0;
                    var tableMsg = pl.roomStatistics;
                    if(!tableMsg)
                    {
                        tableMsg = [0,0,0,0,0];
                    }
                    for(var i = 0;i < tableMsg.length;i++)
                    {
                        winScore += tableMsg[i];
                        // 精度修正
                        winScore = revise(winScore);
                    }

                    var pre = "";
                    if (winScore > 0) pre = "+";
                    return pre + winScore;
                }
            }
        },
        cardNum : {
            _visible: false,
            _run: function() {
                this.ignoreContentAdaptWithSize(true);
                if( pl.mjhand.length > 0)
                    this.visible = true;
            },
            _text: function() {
                return '剩' + pl.mjhand.length + '张';
            }
        },

        zhadanfen : {
            _visible: false,
            _run: function() {
                this.ignoreContentAdaptWithSize(true);
                if(pl.mjdesc2 && pl.mjdesc2.length > 0)
                    this.visible = true;
            },
            _text: function() {
                var ret = "";

                if(pl.mjdesc2 && pl.mjdesc2[0]){
                    ret = pl.mjdesc2[0];
                }

                return ret;
            }
        }, 

        guan_da : {
            _visible: false,
            _run: function() {
                
                if(pl.mjdesc3 && pl.mjdesc3.length != 0)
                {
                    this.visible = (pl.mjdesc3 == "大关");
                }
            },
        }, 

        guan_xiao : {
            _visible: false,
            _run: function() {
                if(pl.mjdesc3 && pl.mjdesc3.length != 0)
                {
                    this.visible = (pl.mjdesc3 == "小关")
                }
            },
        }, 

        desc: {
            _visible: false,
            _run: function () {
                this.ignoreContentAdaptWithSize(true);

                switch(MjClient.gameType){
                    case MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY:
                
                        var iszhaniao = ((tData.areaSelectMode.hongTao10Niao || tData.areaSelectMode.zhaniao > 1) && tData.ht10Player == tData.uids.indexOf(pl.info.uid)) || 
                            (tData.areaSelectMode.zhaniao == 1 && tData.ht9Player == tData.uids.indexOf(pl.info.uid));
                        if(pl.zhaDanCount > 0 || iszhaniao)
                            this.visible = true;
                        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                            if(pl.mjdesc.length > 0) {
                                this.visible = true;
                            }
                        }
                        break;

                    case MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HA:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_LYG:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_TY:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY:
                        if(pl.mjdesc && pl.mjdesc.length && pl.mjdesc.length > 0)     //
                        {
                            this.visible = true;
                        }
                        break;

                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_JZ:
                        this.visible = true;
                        break;
                }
            },
            _text: function () {
                // var sData = MjClient.data.sData;
                // var tData = sData.tData;                

                function getStr()
                {
                    var str = "";

                    for(var i in pl.mjdesc) {
                        var istr = pl.mjdesc[i];
                        if( istr.length > 16 ) istr = '申请解散';
                        if(str.length > 0)  str += '\n';
                        str += istr;
                    }

                    return str;
                }

                var str = "";
               
                if(MjClient.gameType == MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY) {
                    if(pl.zhaDanCount > 0){
                        str += '炸弹:' + pl.zhaDanCount;
                    }
                    var iszhaniao = ((tData.areaSelectMode.hongTao10Niao || tData.areaSelectMode.zhaniao > 1) && tData.ht10Player == tData.uids.indexOf(pl.info.uid)) || 
                        (tData.areaSelectMode.zhaniao == 1 && tData.ht9Player == tData.uids.indexOf(pl.info.uid));
                    if(iszhaniao){
                        if(str.length > 0)  str += '\n';
                        str += '扎鸟';
                    }

                    if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                        bIsYZTYReturn = true;
                        str = getStr();
                    }

                    return str;
                }
                else if(MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_JZ ) {
                    if(pl.zhaDanCount > 0){
                        str += '炸弹:' + pl.zhaDanCount + '\n';
                    }
                    str += getStr();
                    return str;
                }
                else if( MjClient.gameType ==MjClient.GAME_TYPE.PAO_DE_KUAI_TY || MjClient.gameType ==MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN ||MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY) {
                    var str = '';

                    var bMgrDis = false;
                    if (MjClient.isDismiss) {
                        // var sData = MjClient.data.sData;
                        // var tData = sData.tData;
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

                }

                return getStr();
            },  
        }, 

        guanType:{
            _visible: false,
            _run: function () {
                this.ignoreContentAdaptWithSize(true);
                this.visible = true;
            },
            _text: function () {
                var str = "";

                if(pl.mjdesc3.length != 0)
                {
                    str =  pl.mjdesc3[0];
                }

                return str;
            }, 

        },

        desc0: {
            _visible: false,
            _run: function () {
                this.ignoreContentAdaptWithSize(true);

                switch(MjClient.gameType){
                    
                    case MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY:
                        if(pl.mjdesc0.length > 0)    
                        {
                            this.visible = true;
                        }

                        this.visible = (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || 
                            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || 
                            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP);
                        break;

                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN:
                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_TY:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY:
                        if( pl.mjdesc0 && pl.mjdesc0.length && pl.mjdesc0.length > 0)    
                        {
                            this.visible = true;
                        }
                        break;

                }
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
        }, 

        desc1: {
            _visible: false,
            _run: function () {
                this.ignoreContentAdaptWithSize(true);

                switch(MjClient.gameType){
                    case MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY:
                        if(pl.mjdesc1.length > 0)    this.visible = true;
                        this.visible = !(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || 
                            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ);
                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN:
                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU:
                        this.visible = true;
                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_TY:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY:
                        this.visible = false;
                        break;
                }

                if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP &&MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN == MjClient.gameType ){
                    this.visible = true;
                }
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
        }, 

        desc2: {
            _visible: false,
            _run: function () {
                this.ignoreContentAdaptWithSize(true);

                switch(MjClient.gameType){
                    case MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY:
                        if(pl.mjdesc2.length > 0)    this.visible = true;
                        this.visible = !(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || 
                            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ);
                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN:
                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU:
                        this.visible = true;
                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_TY:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN:
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY:
                        this.visible = false;
                        break;
                }

                if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP &&MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN == MjClient.gameType ){
                    this.visible = true;
                }
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
        }, 

        winNum1:{
            _visible: false,
            _run: function () {
            this.ignoreContentAdaptWithSize(true);
            if(pl.mjdescScore && pl.mjdescScore.length && pl.mjdescScore.length > 0 && Number(pl.mjdescScore) >= 0) //pl.mjdescScore && pl.mjdescScore.length &&
            {
                this.visible = true;
                this.setString(Math.abs(Number(pl.mjdescScore)) + "");

                switch(MjClient.gameType){
                    case MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY:
                        this.visible = (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || 
                            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ);
                        break;
                }
            }
            
            },
        }, 

        winNum2:{
            _visible: false,
            _run: function () {
                this.ignoreContentAdaptWithSize(true);
                if(pl.mjdescScore && pl.mjdescScore.length && pl.mjdescScore.length > 0 && Number(pl.mjdescScore) < 0) //pl.mjdescScore && pl.mjdescScore.length &&
                {
                    this.visible = true;
                    this.setString(Math.abs(Number(pl.mjdescScore)) + "");

                    switch(MjClient.gameType){
                        case MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY:
                            this.visible = (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || 
                                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ);
                            break;
                    }
                }
                
            },
        }, 

        zhadanfanbei: {
            _run: function() {
                
            }   
        }
    }

    

    var nodeWinNum = node.parent.getChildByName("winNum");
    if(nodeWinNum)
    {
        this.setHeadUIWinNumColor(nodeWinNum, pl);
    } 
    
    BindUiAndLogic(node.parent, uibind);

    var nodeZhadanfanbei = node.parent.getChildByName("zhadanfanbei");
    if(nodeZhadanfanbei)
    {
        this.setHeadUIZhaDanFanBei(nodeZhadanfanbei, pl);
    }

    this.addWXHeadUIItem_PaoDeKuai(uibind, off);

};  


EndOneView_PaoDeKuai.prototype.SetEndOneUserUIItem_PaoDeKuai = function(node, off) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;

    off = this.getHeadUIOff(off);
    
    node.setVisible(false);

    this.SetInvalidPlayUI_PaoDeKuai(node, off);

    var pl = MjClient.getPlayerByIndex(off);
    if(!pl)
    {
        return;
    }
    
    node.setVisible(true);
    node = node.getChildByName("head");

    var name = node.getChildByName("name");
    name.ignoreContentAdaptWithSize(true);

    this.BindHeadUIItem_PaoDeKuai(node, off); 

    var pl = MjClient.getPlayerByIndex(off);
    if (pl && node)
    {
        this.showAllCardItem_PaoDeKuai(node, pl);  
    }
    
};


EndOneView_PaoDeKuai.prototype.setPlayUIDir_0NodeData = function() {

    var strText = this.getPlayUIDir_0NodeData();
    if(!strText || (typeof(strText) != "string"))
    {
        return;
    }

    var node = MjClient.endoneui.getChildByTag(tagRootUINode).getChildByName("back").getChildByName("dir_0");
    if (node)
    {
        node.setString(strText);
    }
    
};

EndOneView_PaoDeKuai.prototype.getPlayUIDir_0NodeData = function() {
    return "";
};



EndOneView_PaoDeKuai.prototype.setPlayUIDirNodeData = function() {

    var strText = this.getPlayUIDirNodeData();
    if(!strText || (typeof(strText) != "string"))
    {
        return;
    }

    //MjClient.endoneui._nodedir.setString(strText);

    MjClient.endoneui.getChildByTag(tagRootUINode).getChildByName("back").getChildByName("dir").setString(strText);
    
};

EndOneView_PaoDeKuai.prototype.getPlayUIDirNodeData = function() {
    return "";
};


EndOneView_PaoDeKuai.prototype.getHeadUIOff = function(off) {
    return off;
};

EndOneView_PaoDeKuai.prototype.setHeadUIWinNumColor = function(node,pl) {
    
};


EndOneView_PaoDeKuai.prototype.setHeadUIZhaDanFanBei = function() {

}; 

// EndOneView_PaoDeKuai.prototype.getHeadUICardScale = function() {
//     return this.nCardScale;
// }; 