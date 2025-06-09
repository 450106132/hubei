var EndOneView_PaoDeKuaiHBTY = EndOneView_PaoDeKuaiTY.extend({
	getJsBind: function() {
        return {
            back: {
                xiPai: {
                    _run: function () {
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;

                        // 非回放状态、自动切牌、牌局没有结束  洗牌按钮可见
                        this.visible = MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY && (MjClient.rePlayVideo == -1 && tData.areaSelectMode.isPlayerShuffle == 0 && sData.tData.roundNum > 0 && !tData.matchId);

                        if (!this.visible) {
                            return;
                        }

                        if (tData.areaSelectMode.fangkaCount > 0) {
                            // 元宝场
                            this.getChildByName("icon").loadTexture("gameOver/ico_zuanshi.png");
                            this.getChildByName("numTxt").setString("x" + 1);
                        }
                    },
                    _click: function(btn,eT){ 
                        MjClient.gamenet.request("pkroom.handler.tableMsg", {
                            cmd: "MJShuffle"
                        },function(data) {
                            if (data && data.code == -1)
                            {
                                MjClient.showToast(data.message);
                                return;
                            }

                            postEvent("clearCardUI");
                            MjClient.endoneui.removeFromParent(true);
                            MjClient.endoneui = null;

                            PKPassConfirmToServer_card();

                            if (MjClient.arrowbkNode && cc.sys.isObjectValid( MjClient.arrowbkNode )) {
                                MjClient.arrowbkNode.setVisible(false);
                            }
                        });
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
                            }
                        }

                        if(!tData.fieldId){
                            if (sData.tData.roundNum <= 0)
                                MjClient.endoneui.getParent().addChild(new GameOverLayer_PaoDeKuaiHBTY(),500);
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
                       
                    },
                },
            }
        };
    },
	ctor: function() {
	    this._super(res.EndOne_PaoDeKuaiHBTY_json);

	    return true;
	},
});
