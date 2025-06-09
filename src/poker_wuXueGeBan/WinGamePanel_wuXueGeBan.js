
var EndOneView_WuXueGeBan = cc.Layer.extend({
    jsBind: {
        block: {
            _layout: [[1, 1], [0.5, 0.5], [0, 0], true]
        },
        back: {
            _layout: [[1, 1], [0.5, 0.5], [0, 0]], 
            
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
                            MjClient.endoneui.getParent().addChild(new GameOverLayer_wuXueGeBan(),500);
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
                            // leaveGameClearUI();
                            // MjClient.Scene.addChild(new goldMatchingLayer({matching:false,gameType:tData.gameType}));
                            // MjClient.goldfieldEnter(tData.fieldId,tData.gameType);
                            // return;
                        }else{
                            PKPassConfirmToServer_card();
                        }
                    }
                    if (MjClient.arrowbkNode && cc.sys.isObjectValid( MjClient.arrowbkNode )) {
                        MjClient.arrowbkNode.setVisible(false);
                    }
                    
                }
            },
            
        }
    },
    ctor: function () {
        this._super();
        this.isNewUi = (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ);
        MjClient.endoneui = this;

        var endoneui = ccs.load(res.EndOne_wuXueGeBan_json);
        BindUiAndLogic(endoneui.node, this.jsBind);
        this.addChild(endoneui.node);

        

        var nodemask = endoneui.node.getChildByName("back");
        for (var uioff = 0; uioff < 3; uioff++)
        {
            var pl = getUIPlayer(uioff)? getUIPlayer(uioff):{};
            pl.winone = pl.winone? pl.winone:0;

            var winnum1 = nodemask.getChildByName("Atlas_"+ (uioff) +"_0");
            var winnum2 = nodemask.getChildByName("Atlas_"+ (uioff) +"_1");
            
            winnum1.visible = pl.winone >= 0;
            winnum2.visible = pl.winone < 0;
            winnum1.setString("/"+pl.winone);
            winnum2.setString("."+pl.winone);
            winnum1.runAction(cc.moveBy(0.5, cc.p(0,50)));
            winnum2.runAction(cc.moveBy(0.5, cc.p(0,50)));   
        }

        var bipai = endoneui.node.getChildByName("back").getChildByName("bipai");
        var benju = endoneui.node.getChildByName("back").getChildByName("benju");
        bipai.setVisible(false);
        benju.setVisible(false);
        cc.log("----------------bipai------------")
        
        if(MjClient.data.sData.tData.geState == 1){
            bipai.setVisible(true);
        }else{
            benju.setVisible(true);
        }
        
        return true;
    }
});