/**create by Lms
 * @DateTime:     2018-09-13 
 * @Description: 中秋节 88元红包活动 
 */


var ActiveZhongQiuJie_enter = cc.Layer.extend({
    ctor: function() {
        this._super();
        var UI = ccs.load("ActiveZhongQiuLayer_enter.json");
        this.addChild(UI.node);
        this._closeCallback = null;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);
        var _back = UI.node.getChildByName("back");
        _back.setTouchEnabled(true);
        _back.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.reqOpenActive();
            }
        }, this);
    },
    reqOpenActive: function() {
        var self = this;
        MjClient.block();

        MjClient.gamenet.request("pkplayer.handler.MidAutumnFestivalOpen", {},
            function(rtn) {
                cc.log(" ===== MidAutumnFestivalOpen === " + JSON.stringify(rtn));
                if (rtn.code == 0) {

                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }
                }
                if (self._closeCallback) {
                    MjClient.Scene.addChild(new ActiveZhongQiuJie_layer(self._closeCallback));
                } else {
                    MjClient.Scene.addChild(new ActiveZhongQiuJie_layer());
                }

                self.removeFromParent();

                MjClient.unblock();
            }
        );


    },
    setCloseCallback: function(callback) {
        this._closeCallback = callback;
    }
});



var ActiveZhongQiuJie_layer = cc.Layer.extend({
    ctor: function(callback) {
        this._super();

        var UI = ccs.load("ActiveZhongQiuLayer_main.json");
        this.addChild(UI.node);
        MjClient.ActZhongQiuJie_ui = this;
        this._shareType = null;

        var self = this;
        this._initData = null;
        this._closeCallback = callback;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);

        //退出
        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (this._closeCallback) {
                    this._closeCallback();
                }
                self.removeFromParent();
            }
        }, this);

        var _btn_rule = this._back.getChildByName("btn_xiangqing");
        _btn_rule.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                MjClient.Scene.addChild(new ActiveZhongQiuJie_rule());
            }
        }, this);

        this._node_work = this._back.getChildByName("node_work");
        this._btn_go = this._node_work.getChildByName("btn_go");
        this._btn_go.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (this._initData.userType) {
                    MjClient.Scene.addChild(new recommendLayer_active());
                }else{
                    MjClient.Scene.addChild(new FriendCard_main());
                }
                
                this.removeFromParent();
            }
        }, this);

        this._btn_get = this._back.getChildByName("btn_lingqu");

        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("active_zhongqiujie88/btn_lingqu.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        this._btn_get.addChild(clipper);
        var sprite = new cc.Sprite("active_zhongqiujie88/enter_2.png");
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction); //进行向右移动的重复动作 
        this._sprite = sprite;
        this._sprite.visible = false;

        this._text_num = this._back.getChildByName("Text_num");
        this._text_num.ignoreContentAdaptWithSize(true);
        this._text_num.setString("");
        this.reqMsg_zhongQiuJie();

        this._bg  = this._back.getChildByName("Image_bg");

    },

    initSelf: function() {
        if (!cc.sys.isObjectValid(this)) return;
        var self = this;
        var _txt= this._node_work.getChildByName("Text_1");
        if (this._initData.userType) {
            _txt.setString("     邀请新人或      \n 回归用户对战一场     ");
            this._bg.loadTexture("active_zhongqiujie88/bg_2.png");
        } else {
            _txt.setString("        对战一场     ");
            this._bg.loadTexture("active_zhongqiujie88/bg_1.png");

        }
        if (this._initData.finish) {
            this._btn_go.setTouchEnabled(false);
            this._btn_go.loadTextureNormal("active_zhongqiujie88/btn_ok.png");
        }
        this._text_num.setString(this._initData.leftRedpacket);
        if (this._initData.finish && this._initData.leftRedpacket && !this._initData.recved) {
            this._sprite.visible = true;
            this._btn_get.setTouchEnabled(true);
            this._btn_get.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    MjClient.Scene.addChild(new ActiveZhongQiuJie_back(3));
                    // this.reqQiangHongBao();
                }
            }, this);
        } else if (this._initData.finish && !this._initData.recved) {
            this._sprite.visible = true;
            this._btn_get.setTouchEnabled(true);
            this._btn_get.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    MjClient.Scene.addChild(new ActiveZhongQiuJie_back(1, 1));
                }
            }, this);
        } else {
            this._sprite.visible = false;
            this._btn_get.setTouchEnabled(false);
            this._btn_get.loadTextureNormal("active_zhongqiujie88/btn_lingqu2.png");
        }

    },
    reqMsg_zhongQiuJie: function() {
        var self = this;
        MjClient.block();

        MjClient.gamenet.request("pkplayer.handler.MidAutumnFestivalInfo", {},
            function(rtn) {
                cc.log(" ===== MidAutumnFestivalInfo === " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                    cc.log(" ===== MidAutumnFestivalInfo 2222 === " + JSON.stringify(rtn.data));
                    self._initData = rtn.data;
                    self.initSelf();
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }
                }

                MjClient.unblock();
            }
        );


    },

    reqQiangHongBao: function() {
        var self = this;
        MjClient.block();

        MjClient.gamenet.request("pkplayer.handler.MidAutumnFestivalRecv", {},
            function(rtn) {
                cc.log(" ===== MidAutumnFestivalRecv === " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                    cc.log(" ===== MidAutumnFestivalRecv 2222 === " + JSON.stringify(rtn.data));
                    MjClient.Scene.addChild(new ActiveZhongQiuJie_back(1, 2, rtn.data.amount));
                } else if (rtn.code == 3) {
                    MjClient.Scene.addChild(new ActiveZhongQiuJie_back(1, 1));
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }
                }

                MjClient.unblock();
            }
        );


    },

    reqShare: function() {

        var self = this;
        MjClient.gamenet.request("pkplayer.handler.MidAutumnFestivalShare", {},
            function(rtn) {
                if (rtn.code == 0) {
                    
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }

                }

            }


        );
    },
    setCloseCallback: function(callback) {
        this._closeCallback = callback;
    }

});



var ActiveZhongQiuJie_back = cc.Layer.extend({

    jsBind: {
        back: {

            btn_share: {
                _click: function() {
                    if (cc.sys.OS_WINDOWS == cc.sys.os) {
                        MjClient.wxShareImageToPYQ = true;
                        postEvent("WX_SHARE_SUCCESS", {
                            errCode: 0
                        });
                    }
                    var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "active_zhongqiujie88/participator_1.jpg";
                    MjClient.native.wxShareImageToPYQ(filePath);

                },
                _event: {
                    WX_SHARE_SUCCESS: function(data) {
                        MjClient.wxShareImageToPYQ = false;
                        if (parseInt(data.errCode) == 0) {
                            if (MjClient.ZhongqiuJieBack_ui) {
                                MjClient.ZhongqiuJieBack_ui.getShare();
                                // MjClient.showToast("分享成功"); 回调已经有飘提示了
                            }

                        }
                    }
                },
            },
        }
    },
    ctor: function(type, number, money) {
        this._super();
        var UI = ccs.load("ActiveZhongQiuLayer_back.json");
        BindUiAndLogic(UI.node, this.jsBind);
        this.addChild(UI.node);
        MjClient.ZhongqiuJieBack_ui = this;

        var self = this;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1.5, 1.5], [0.5, 0.5], [0, 0]);

        var _back_2 = UI.node.getChildByName("back_2");
        setWgtLayout(_back_2, [1, 1], [0.5, 0.5], [0, 0]);

        var _back_3 = UI.node.getChildByName("back_3");
        setWgtLayout(_back_3, [1, 1], [0.5, 0.5], [0, 0]);
        _back.visible = false;
        _back_2.visible = false;
        _back_3.visible = false;

        var _btn_share = _back.getChildByName("btn_share");
        var close = _back.getChildByName("close");

        if (type == 1) {

            _back.visible = true;
            this._luckyNode_1 = _back.getChildByName("lucky_1");
            this._luckyNode_1.setVisible(false);
            this._luckyNode_2 = _back.getChildByName("lucky_2");
            this._luckyNode_2.setVisible(false);
            this._luckyNode_3 = _back.getChildByName("lucky_3");
            this._luckyNode_3.setVisible(false);

            if (number == 1) {
                _btn_share.visible = false;
                this._luckyNode_1.setVisible(true);
            } else if (number == 2) {
                this._luckyNode_2.setVisible(true);
                close.visible = false;
                var text = this._luckyNode_2.getChildByName("Text_1");
                text.setString("恭喜你获得" + money + " 元团圆红包，\n请分享到公众号" + MjClient.systemConfig.gongzhonghao + "领取")
                var _close = this._luckyNode_2.getChildByName("close_1");
                _close.addTouchEventListener(function(sender, type) {
                    if (type == 2) {
                        this._luckyNode_3.visible = true;
                        close.visible = true;
                        this._luckyNode_2.visible = false;
                        _close.visible = false;
                    }
                }, this);

            } else if (number == 3) {
                this._luckyNode_3.setVisible(true);
            }
        } else if (type == 2) {
            _back_2.visible = true;
            _back_2.setTouchEnabled(true);
            _back_2.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    self.removeFromParent();
                }
            }, this);

        } else if (type == 3) {
            _back_3.visible = true;
            _back_3.setTouchEnabled(true);
            _back_3.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    //领取红包
                    MjClient.ActZhongQiuJie_ui.reqQiangHongBao();
                    self.removeFromParent();
                }
            }, this);
        }



        close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                // MjClient.showMsg("取消分享会视为您放弃此次奖励哦 ！",
                //     function() {
                //         self.removeFromParent();
                //     },
                //     function() {}, "1");
                self.removeFromParent();
                MjClient.ActZhongQiuJie_ui.reqMsg_zhongQiuJie();
            }
        }, this);
    },
    getShare: function() {
        cc.log(" ============newYearLayer_ui  newYearLayer_ui");
        this.removeFromParent();
        MjClient.ActZhongQiuJie_ui.reqShare();
        MjClient.ActZhongQiuJie_ui.reqMsg_zhongQiuJie();
    }


});

var ActiveZhongQiuJie_rule = cc.Layer.extend({

    ctor: function() {
        this._super();
        var UI = ccs.load("ActiveZhongQiuLayer_rule.json");
        this.addChild(UI.node);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1.2, 1.2], [0.5, 0.5], [0, 0]);

        var close = _back.getChildByName("close");
        close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                self.removeFromParent();
            }
        }, this);

        var _txt = _back.getChildByName("Image_bg").getChildByName("Text_2");
        var str = "1、活动时间：9月24日00：00-23：59" +
            "\n2、完成相关任务，领取按钮即可激活，点击可领取红包。" +
            "\n3、点击领取红包后要分享后才可领取，领取后红包会进入公众号，请进入微信公众号"+ MjClient.systemConfig.gongzhonghao+"提现。不分享视为放弃红包。" +
            "\n4、88元团圆大红包为手气红包，最高可得88元，考验运气的时刻来临了！" +
            "\n5、红包有限先到先得，如果完成任务太慢，红包会被其他玩家领光哦，请多多留意剩余红包情况。" +
            "\n6、所有对战均指完整对局，中途解散的牌局不予计算。" +
            "\n7、本活动最终解释权归本公司所有。   ";
        _txt.setString(str);

    },
   
});