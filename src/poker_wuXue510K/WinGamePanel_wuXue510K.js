var GameOverLayer_wuXue510K = GameOverLayer_Poker.extend({
    ctor: function() {
        this._super();
    },
    getPlayInfo: function(){
        return getPlayingRoomInfo(0);
    },
    setListInfo: function(node, _listInfo){
        var listView = node;
        var pl = _listInfo.pl;

        var max = -9999999999;
        var all = 0;
        var loseCount = 0;
        var winCount = 0;
        for(var i = 0; i < pl.roomStatistics.length ; i ++){
            if(pl.roomStatistics[i] != null && typeof(pl.roomStatistics[i]) != "undefined"){
                if(pl.roomStatistics[i] > max){
                    max = pl.roomStatistics[i];
                }

                if(pl.roomStatistics[i] > 0 ){
                    winCount++;
                }

                if(pl.roomStatistics[i] < 0){
                    loseCount++;
                }

                all += pl.roomStatistics[i];
            }
        }

        for(var i = 0;i < 3;i++){
            listView.pushBackDefaultItem();
            var children = listView.children;
            var insertItem = children[children.length-1];

            insertItem.getChildByName("title").setString("第" + (i+1) + "局");
            var scoreLabel = insertItem.getChildByName("score");
            scoreLabel.ignoreContentAdaptWithSize(true);
            insertItem.getChildByName("title").ignoreContentAdaptWithSize(true);

            if(i == 0) {
                insertItem.getChildByName("title").setString("牌局输赢");
                scoreLabel.setString(all);
            }
            else if(i == 1) {
                insertItem.getChildByName("title").setString("单局最高");
                scoreLabel.setString(max);
            }
            else if(i == 2) {
                insertItem.getChildByName("title").setString("胜负局数");
                scoreLabel.setString(winCount + "赢" +  loseCount + "输");
            }
        }
    },

});

var EndOneView_wuXue510K = cc.Layer.extend({
    jsBind: {
        block: {
            _layout: [
                [1, 1],
                [0.5, 0.5],
                [0, 0], true
            ]
        },
        back: {
            _run:function(){
                if(isIPhoneX())
                    setWgtLayout(this, [0.85,0.85],[0.5,0.5],[0,0.05], false);
                else
                    setWgtLayout(this, [1,0.84],[0.5,0.5],[0,0.05], false);
            },
            dissType: {
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    this.setVisible(MjClient.isDismiss);
                    if (MjClient.isDismiss)
                    {
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;

                        var id = tData.firstDel;
                        var pl = sData.players[id];
                        var delStr = "";
                        if(pl) {
                            var name  =  unescape(pl.info.nickname );
                            delStr = name + pl.mjdesc[0];
                        } else {
                            delStr = tData.dissolveWay == -1? '系统停服自动解散房间':'会长或管理员解散房间';
                        }
                        this.setString("" + delStr) ;
                    }
                }
            },
            shareBtn: {
                _click:function(btn){
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Xiaojiesuanjiemian_Fenxiang", {uid:SelfUid()});
                    MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function() {
                        postEvent("capture_screen");
                        MjClient.endoneui.capture_screen = true;
                        btn.setTouchEnabled(false);
                    });
                },
                _event:{
                    captureScreen_OK: function () {
                        if (MjClient.endoneui.capture_screen != true) return;
                        MjClient.endoneui.capture_screen = false;
                        var writePath = jsb.fileUtils.getWritablePath();
                        var textrueName = "wxcapture_screen.png";
                        var savepath = writePath+textrueName;
                        MjClient.shareImageToSelectedPlatform(savepath);
                        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() {
                            this.setTouchEnabled(true);
                        }.bind(this))));
                    }
                }
            },
            readyBtn: {
                _click: function (btn, eT) {
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    if(!tData.fieldId && sData.tData.roundNum <= 0){
                        MjClient.endoneui.getParent().addChild(new GameOverLayer_wuXue510K(), 500);
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
                        PKPassConfirmToServer_card();
                    }
                    if (MjClient.arrowbkNode && cc.sys.isObjectValid( MjClient.arrowbkNode )) {
                        MjClient.arrowbkNode.setVisible(false);
                    }
                }
            },
            text_rule: {
                _run: function() {
                    this.setString(getPlayingRoomInfo(0));
                }
            },
            image_player_myself: {
                _run: function() {
                    MjClient.endoneui.SetEndOneUserUI_wuXue510K(this, MjClient.endoneui.offs[0]);
                }
            },
            image_player_1: {
                _run: function() {
                    MjClient.endoneui.SetEndOneUserUI_wuXue510K(this, MjClient.endoneui.offs[1]);
                },
            },
            image_player_2: {
                _run: function() {
                    MjClient.endoneui.SetEndOneUserUI_wuXue510K(this, MjClient.endoneui.offs[2]);
                }
            },
            image_player_3: {
                _run: function() {
                    MjClient.endoneui.SetEndOneUserUI_wuXue510K(this, MjClient.endoneui.offs[3]);
                }
            },
        }
    },
    ctor: function() {
        this._super();
        MjClient.endoneui = this;
        var endoneui = ccs.load("endOne_wuXue510K.json");
        var offs = [];
        for (var i = 0; i < MjClient.MaxPlayerNum; i ++) {
            var pl = getUIPlayer(i);
            if (!pl) continue;
            offs.push(i);
        }
        MjClient.endoneui.offs = offs;
        BindUiAndLogic(endoneui.node, this.jsBind);
        this.addChild(endoneui.node);
        return true;
    },

    SetEndOneUserUI_wuXue510K: function (node, off) {
        var pl = getUIPlayer(off);
        if (!pl) {
            node.setVisible(false);
            return;
        }
        setUserOfflineWinGamePanel(node,pl);
        var tData = MjClient.data.sData.tData;

        addWxHeadToEndUI(node.getChildByName("image_head"), getPlayerIndex(off));

        node.getChildByName("text_shuyingfen").ignoreContentAdaptWithSize(true);
        node.getChildByName("text_hua").ignoreContentAdaptWithSize(true);
        node.getChildByName("text_xi").ignoreContentAdaptWithSize(true);
        node.getChildByName("text_xi").setVisible(false);
        node.getChildByName("text_hua").setVisible(false);

        node.getChildByName("dissText").setVisible(false);

        var text_name = node.getChildByName("text_name");
        text_name.ignoreContentAdaptWithSize(true);
        text_name.setString(getNewName(unescape(pl.info.nickname ) + ""));

        var image_ji = node.getChildByName("image_ji");
        image_ji.setVisible(false);
        if(tData.chickenCard != -1 && tData.chickenCard != null ){
            if( tData.zhuangPartner >= 0 && pl.info.uid == tData.uids[tData.zhuangPartner] ){
                image_ji.visible = true;
            }

            if(tData.zhuangPartnerHidden >= 0 && pl.info.uid == tData.uids[tData.zhuangPartnerHidden] ){
                image_ji.visible = true;
            }
        }

        var text_shuyingbei = node.getChildByName("text_shuyingbei");
        if(text_shuyingbei){
            var _color = pl.mult < 0 ? cc.color("#84a7ca") : cc.color("#e7cb40");

            text_shuyingbei.setTextColor(_color);
        }

        var image_zhuang = node.getChildByName("image_zhuang");
        image_zhuang.setVisible(false);

        if(pl.info.uid == tData.uids[tData.zhuang]){
            image_zhuang.setVisible(true);
        }

        var image_you = node.getChildByName("image_you");
        image_you.setVisible(false);
        if(pl.rank > 0 ){
            image_you.visible = true;
            image_you.loadTexture("playing/damazi/ui_you" + pl.rank + ".png");
        }

        var image_state_score = node.getChildByName("image_state").getChildByName("score");
        image_state_score.ignoreContentAdaptWithSize(true);
        image_state_score.setString( pl.zhuaFen  + "");
        
        var Node_shuying = node.getChildByName("Node_shuying");
        var _shuying0 = Node_shuying.getChildByName("score_0");
        var _shuying1 = Node_shuying.getChildByName("score_1");
        _shuying0.ignoreContentAdaptWithSize(true);
        _shuying1.ignoreContentAdaptWithSize(true);
        _shuying0.setVisible(pl.mult < 0 );
        _shuying1.setVisible(pl.mult >= 0);
        _shuying0.setString("/" + pl.mult  + "");
        _shuying1.setString("/" + pl.mult  + "");

        var Node_huapaifen = node.getChildByName("Node_huapaifen");
        Node_huapaifen.setVisible(false);
        
        var Node_xifen = node.getChildByName("Node_xifen");
        Node_xifen.setVisible(false);
        
        var text_addScore = node.getChildByName("text_addScore");
        var text_subScore = node.getChildByName("text_subScore");

        text_addScore.setVisible(pl.winone >= 0);
        text_subScore.setVisible(pl.winone < 0);
        text_addScore.ignoreContentAdaptWithSize(true);
        text_subScore.ignoreContentAdaptWithSize(true);
        text_addScore.setString("+" + pl.winone + "");
        text_subScore.setString( pl.winone + "");
    }
});