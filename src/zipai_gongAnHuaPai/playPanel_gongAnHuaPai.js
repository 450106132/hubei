/*
* @Author: Administrator
* @Date:   2020-01-04 14:19:50
* @Last Modified by:   zzj
* @Last Modified time: 2020-01-10 10:24:24
*/
// 公安花牌
var playPanel_gongAnHuaPai = playPanel_huBeiHuaPai.extend({
    getJsBind: function() {
        var pBind = this._super();
        var jsBind = {
            node_down: {
                img_nieFlag: {
                    _visible:false,
                    _layout:[[197/1280, 0], [640/1280, 380/720], [0, 0]],
                    _event: {
                        initSceneData:function() {
                            MjClient.playui.checkNiePaiFlagVisible(this);
                        },
                        HZAutoSkip: function() {
                            MjClient.playui.checkNiePaiFlagVisible(this);
                        },
                        clearCardUI:function() {
                            this.visible = false;
                        }
                    }
                }
            },
            node_left: {
                img_nieFlag: {
                    _visible:false,
                    _layout:[[197/1280, 0], [377/1280, 528/720], [0, 0]],
                    _event: {
                        initSceneData:function() {
                            MjClient.playui.checkNiePaiFlagVisible(this);
                        },
                        HZAutoSkip: function() {
                            MjClient.playui.checkNiePaiFlagVisible(this);
                        },
                        clearCardUI:function() {
                            this.visible = false;
                        }
                    }
                }
            },
            node_right: {
                img_nieFlag: {
                    _visible:false,
                    _layout:[[197/1280, 0], [942/1280, 528/720], [0, 0]],
                    _event: {
                        initSceneData:function() {
                            MjClient.playui.checkNiePaiFlagVisible(this);
                        },
                        HZAutoSkip: function() {
                            MjClient.playui.checkNiePaiFlagVisible(this);
                        },
                        clearCardUI:function() {
                            this.visible = false;
                        }
                    }
                }
            },
            node_xing: {
                img_nieFlag: {
                    _visible:false,
                    _event: {
                        initSceneData:function() {
                            MjClient.playui.checkNiePaiFlagVisible(this);
                        },
                        HZAutoSkip: function() {
                            MjClient.playui.checkNiePaiFlagVisible(this);
                        },
                        clearCardUI:function() {
                            this.visible = false;
                        }
                    }
                }
            },
            btn_nie: {
                _visible:false,
                _layout:[[73/1280, 0], [0.152, 0.945], [0, 0]],
                _click: function() {
                    MjClient.showMsg("捏牌后无法出牌，是否确定捏牌？", function() {
                        MjClient.gamenet.request("pkroom.handler.tableMsg", {cmd:'HZAutoSkip'});
                    }, function() {}, "1");
                },
                _event: {
                    initSceneData: function() {
                        MjClient.playui.checkNiePaiBtnVisible(this);
                    },
                    mjhand: function() {
                        MjClient.playui.checkNiePaiBtnVisible(this);
                    },
                    clearCardUI: function() {
                        this.visible = false;
                    },
                    HZAutoSkip: function() {
                        MjClient.playui.checkNiePaiBtnVisible(this);
                    }
                }
            },
            img_cutLine: {
                _event: {
                    clearCardUI: function() {
                        MjClient.playui.checkCutLineVisible(this);
                    }
                }
            }
        }

        util.assign(jsBind, pBind); 
        return jsBind;
    }
});

playPanel_gongAnHuaPai.prototype.checkNiePaiFlagVisible = function(node) {
    node.visible = false;
    var off = this.getUIOffByNode(node);
    var pl = this.getUIPlayer(off);
    var tData = MjClient.data.sData.tData;
    if (!pl || !this.isInPlay())
        return;
    node.visible = pl.isDead;
};

playPanel_gongAnHuaPai.prototype.checkNiePaiBtnVisible = function(node) {
    node.visible = false;
    var pl = this.getUIPlayer(0);
    var tData = MjClient.data.sData.tData;
    if (!tData.areaSelectMode.isNiePai) {
        return;
    }
    if (!pl || !this.isInPlay())
        return;
    node.visible = !pl.isDead;
};


playPanel_gongAnHuaPai.prototype.shouldDealyNewCard = function() {
    var tData = MjClient.data.sData.tData;
    var off = (tData.curPlayer - 1 - tData.uids.indexOf(SelfUid()) + tData.maxPlayer) % tData.maxPlayer;
    var pl = this.getUIPlayer(off);
    if(pl.isDead){
        return true;
    }

    if (this.getUIPlayer(off).mjput.length <= 0) {
        return false;
    }

    var imgPutCard = this.getUINode(off).getChildByName("img_putCard");
    if (!imgPutCard.isVisible()) { // 无展示牌
        return false;
    }

    return true;
};

playPanel_gongAnHuaPai.prototype.showOutCardAnimation = function (node) {
    if(node.isPick){
        delete node.isPick;
        return;
    }
    var off = this.getUIOffByNode(node);
    var tData = MjClient.data.sData.tData;
    var lastPlayer = (tData.curPlayer - 1 + tData.maxPlayer) % tData.maxPlayer;
    if (this.getIndexInUids(off) != lastPlayer && tData.lastDrawPlayer != tData.curPlayer) { // 不是发牌玩家上家
        return;
    }

    var pl = this.getUIPlayer(off);
    var uiNode = this.getUINode(off);

    if (!node.isVisible()) { // 没有展示牌
        return;
    }

    if (pl.mjput.length <= 0) {
        return;
    }

    var endPos = this.getOutCardPos(off);
    var outLayout = uiNode.getChildByName("layout_outCards");
    var outCard = this.getNewCard("out", pl.mjput[pl.mjput.length - 1], off, false);
    outCard.setPosition(endPos);
    outLayout.addChild(outCard);

    var anmEndPos = outLayout.convertToWorldSpace(cc.p(endPos.x, endPos.y)); // 动画结束坐标
    var actTime = this.getAniTimeByType("land");
    outCard.setOpacity(0);
    var initScale = outCard.scale;
    outCard.setScale(0.4);
    var spa = cc.spawn(cc.fadeIn(0.05), cc.scaleTo(0.05, initScale));
    outCard.runAction(cc.sequence(cc.delayTime(actTime - 0.05), spa, cc.callFunc(function() {
        outCard.visible = true;
        this.addOutFrame(outCard, pl, pl.mjput.length - 1);
    }.bind(this))));

    // 播放缩小动画到outcard的所在位置
    var scy = (outCard.height * outCard.scaleY) / node.height;
    var spa = cc.spawn(cc.scaleTo(actTime, scy), cc.fadeTo(actTime, 255 * 0.6), cc.moveTo(actTime, cc.p(anmEndPos)))
    var seq = cc.sequence(spa, cc.callFunc(function() {
        node.setOpacity(255);
        node.visible = false;

    }));

    node.stopAllActions();
    node.runAction(seq);

    this.outCardExp(pl, outCard, pl.mjput.length - 1);
};

playPanel_gongAnHuaPai.prototype.checkCutLineVisible = function(node) {
    var cutLine = node || this.jsBind.img_cutLine._node;
    var finger = this.jsBind.img_finger._node
    cutLine.visible = false;
    finger.visible = false;
    if (!this.isInPlay()) {
        return;
    }
    playLayer_ziPai.prototype.checkCutLineVisible.apply(this, [node]);
}
