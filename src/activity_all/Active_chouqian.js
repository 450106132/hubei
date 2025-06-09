/**
 * Created by WuXiaoDong on 2019/1/10.
 */

var chunjiechouqianLayer = cc.Layer.extend({
    _back:null,
    _data:null,
    _closeCallback:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("Active_chunjiechouqian.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.75, 0.75], [0.5, 0.5], [0, 0]);

        //关闭按钮
        var close = this._back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
                if (this._closeCallback) {
                    this._closeCallback();
                }
            }
        }, this);

        this._Node_gofinish = this._back.getChildByName("Node_gofinish");
        this._Node_qian = this._back.getChildByName("Node_qian");
        this._Node_gofinish.setVisible(false);
        this._Node_qian.setVisible(false);

        this._textTime = this._back.getChildByName("Text_time");
        this._textTime.ignoreContentAdaptWithSize(true);
        this._textTime.setVisible(false);

        this._textDi = this._back.getChildByName("Text_di");
        this._textDi.ignoreContentAdaptWithSize(true);
        this._textDi.setVisible(false);

        this.initData();

        return true;
    },

    initData:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.newYearBallotInfo",{},function(rtn){
            cc.log("wxd pkplayer.handler.newYearBallotInfo:"+JSON.stringify(rtn))
            MjClient.unblock();
            if(rtn.code == 0) {
                self._data = rtn.data;
                self.initUI();
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    },

    initUI:function () {
        if(this._data.isBallot){
            this._Node_gofinish.setVisible(false);
            this._Node_qian.setVisible(true);
            this.initQianUI();

            if(this._data.isShare){

            }else {
                this._textDi.setVisible(true);
                this._textDi.setString("新年运势很不错哦！分享结果晒好运！");
            }
        }else {
            this._Node_gofinish.setVisible(true);
            this._Node_qian.setVisible(false);
            this.initGofinishUI();

            this._textDi.setVisible(true);
            if(this._data.isPlay){
                this._textDi.setString("请摇动手机或者点击摇一摇，财运摇出来！");
            }else {
                this._textDi.setString("完成任意一把对局就可以摇一摇哦~");
            }
        }

        var startTime = MjClient.dateFormat(new Date(parseInt(this._data.startTime)), 'yyyy年MM月dd日');
        var endTime = MjClient.dateFormat(new Date(parseInt(this._data.endTime)), 'MM月dd日');
        this._textTime.setString("活动时间："+startTime+"至"+endTime);
        this._textTime.setVisible(true);
    },

    initQianUI:function () {
        var self = this;
        var imageLight = this._Node_qian.getChildByName("Image_light");
        imageLight.runAction(cc.rotateBy(5, 360).repeatForever());

        var textQian = this._Node_qian.getChildByName("Text_qian");
        textQian.setString(this._data.remark);

        var btnXy = this._Node_qian.getChildByName("Button_xy");
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("active_chouqian/xuanyao.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        //clipper.setAlphaThreshold(0.5);
        sten.setPosition(cc.p(btnXy.width/2, btnXy.height/2));
        btnXy.addChild(clipper,2);
        var sprite = new cc.Sprite("active_chouqian/saoguan.png");
        //sprite.setScale(2)
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction); //进行向右移动的重复动作
        var imageShare = this._Node_qian.getChildByName("Image_share");
        imageShare.runAction(cc.sequence(cc.moveBy(0.5, cc.p(0, -5)), cc.moveBy(1, cc.p(0, 10)), cc.moveBy(0.5, cc.p(0, -5))).repeatForever());
        if(this._data.isShare){
            btnXy.setVisible(false);
            imageShare.setVisible(false);
        }
        btnXy.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                ChunJieChouQian_share(self._data);
            }
        }, this);

        UIEventBind(null, btnXy, "WX_SHARE_SUCCESS", function(wxdata) {
            MjClient.wxShareImageToPYQ = false;
            if (parseInt(wxdata.errCode) == 0) {
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.newYearBallotShare",{},function(rtn){
                    cc.log("wxd pkplayer.handler.newYearBallotShare:"+JSON.stringify(rtn))
                    MjClient.unblock();
                    if(rtn.code == 0) {
                        self.removeFromParent();
                        MjClient.Scene.addChild(new chouqianRewardLayer(rtn.data));
                    }else {
                        MjClient.showToast(rtn.message);
                    }
                });
            }
        });
    },

    initGofinishUI:function () {
        var self = this;
        //添加小光点
        for (var j = 0; j < 20; j++) {
            var _sp = new cc.Sprite("shareToday/icon_dian.png");
            var pos_x = Math.floor(Math.random() * 200)-100;
            var pos_y = Math.floor(Math.random() * 300)-150;
            this._Node_gofinish.addChild(_sp);
            _sp.setPosition(cc.p(pos_x, pos_y));
            _sp.runAction(cc.sequence(cc.moveBy(0.7, cc.p(0, -10)), cc.moveBy(1.4, cc.p(0, 20)), cc.moveBy(0.7, cc.p(0, -10))).repeatForever());
        }

        var imageQiantong = this._Node_gofinish.getChildByName("Image_qiantong");
        imageQiantong.runAction(cc.sequence(cc.moveBy(0.7, cc.p(0, -5)), cc.moveBy(1.4, cc.p(0, 10)), cc.moveBy(0.7, cc.p(0, -5))).repeatForever());

        var btnGf = this._Node_gofinish.getChildByName("Button_gf");
        if(this._data.isPlay){
            btnGf.loadTextureNormal("active_chouqian/yaoyiyao.png")
        }else {
            btnGf.loadTextureNormal("active_chouqian/gofinish.png")
        }
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("active_chouqian/gofinish.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        //clipper.setAlphaThreshold(0.5);
        sten.setPosition(cc.p(btnGf.width/2, btnGf.height/2));
        btnGf.addChild(clipper,2);
        var sprite = new cc.Sprite("active_chouqian/saoguan.png");
        //sprite.setScale(2)
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction); //进行向右移动的重复动作
        btnGf.setTouchEnabled(true);
        btnGf.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if(self._data.isPlay){//摇一摇
                    btnGf.setTouchEnabled(false);
                    cc.inputManager.setAccelerometerEnabled(false);
                    imageQiantong.runAction(cc.sequence(cc.rotateBy(0.2,10), cc.rotateBy(0.4, -20), cc.rotateBy(0.2, 10)).repeat(4));
                    imageQiantong.runAction(cc.sequence(cc.delayTime(3),cc.callFunc(function () {
                        MjClient.block();
                        MjClient.gamenet.request("pkplayer.handler.newYearBallot", {}, function(rtn) {
                            cc.log("wxd pkplayer.handler.newYearBallot:"+JSON.stringify(rtn))
                            MjClient.unblock();
                            if (rtn.code != 0) {
                                MjClient.showToast(rtn.message);
                                return;
                            }
                            self.initData();
                        });
                    })))
                }else {//去打牌
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.clubList", {clubId: 0}, function(rtn) {
                        MjClient.unblock();
                        if (rtn.code != 0) {
                            MjClient.showToast(rtn.message);
                            return;
                        }

                        self.removeFromParent();
                        if(rtn.data.list.length > 0){//跳转俱乐部
                            MjClient.Scene.addChild(new FriendCard_main());
                        }else {//跳转开房界面
                            if (!MjClient.data.sData) {
                                postEvent("createRoom",{});
                                MjClient.native.umengEvent4CountWithProperty("ChuangjianfangjianClick", {uid:SelfUid()});
                            }
                            else {
                                MjClient.showMsg("房间已经创建,请直接加入房间。");
                            }
                        }
                    });
                }
            }
        }, this);

        if(self._data.isPlay){
            cc.inputManager.setAccelerometerEnabled(true);
            cc.eventManager.addListener({
                event: cc.EventListener.ACCELERATION,
                callback: function(acc, event){
                    var fource = 4;
                    if(Math.abs(acc.x) >= fource || Math.abs(acc.y) >= fource)
                    {
                        cc.log("检测剧烈摇晃手机");
                        cc.inputManager.setAccelerometerEnabled(false);
                        btnGf.setTouchEnabled(false);
                        imageQiantong.runAction(cc.sequence(cc.rotateBy(0.2,10), cc.rotateBy(0.4, -20), cc.rotateBy(0.2, 10)).repeat(4));
                        imageQiantong.runAction(cc.sequence(cc.delayTime(3),cc.callFunc(function () {
                            MjClient.block();
                            MjClient.gamenet.request("pkplayer.handler.newYearBallot", {}, function(rtn) {
                                cc.log("wxd pkplayer.handler.newYearBallot:"+JSON.stringify(rtn))
                                MjClient.unblock();
                                if (rtn.code != 0) {
                                    MjClient.showToast(rtn.message);
                                    return;
                                }
                                self.initData();
                            });
                        })))
                    }
                }.bind(this)}, this);
        }else {
            cc.inputManager.setAccelerometerEnabled(false);
        }
    },

    setCloseCallback: function(callback) {
        this._closeCallback = callback;
    }
});

var ChunJieChouQian_share = function(data) {

    MjClient.block();
    var fileName = "wxcapture_screen.jpg";

    var ui = ccs.load("Active_chouqian_share.json");
    var node = ui.node;
    MjClient.Scene.addChild(node);
    node.setZOrder(-10);

    var bg = node.getChildByName("back");
    // setWgtLayout(bg, [0.61, 0.78], [0.32, 0.48], [0, 0]);

    var textQian = bg.getChildByName("Text_qian");
    textQian.setString(data.remark);

    //保存成图片
    MjClient.saveNodeToImage(bg, fileName, function(pnode, savepath) {
        if (cc.sys.isObjectValid(node)) {
            node.removeFromParent();
        }
        // 分享图片到微信
        if (cc.sys.OS_WINDOWS == cc.sys.os) {
            MjClient.wxShareImageToPYQ = true;
            postEvent("WX_SHARE_SUCCESS", {
                errCode: 0
            });
        }
        MjClient.native.wxShareImageToPYQ(savepath);
        MjClient.unblock();
    });
};

var chouqianRewardLayer = cc.Layer.extend({
    ctor: function (data) {
        this._super();
        var UI = ccs.load("Active_chouqianReward.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);

        //关闭按钮
        var close = this._back.getChildByName("btn_yes");
        close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        var TextDes = this._back.getChildByName("Text_1");
        TextDes.ignoreContentAdaptWithSize(true);

        var TextNum = this._back.getChildByName("Text_num");
        TextNum.ignoreContentAdaptWithSize(true);

        var iconPrize = this._back.getChildByName("icon_prize");

        switch (data.type){
            case 1:
                TextDes.setString("分享成功，恭喜您获得"+data.amount+"元宝，请点击领取");
                TextNum.setString("元宝X"+data.amount);
                iconPrize.loadTexture("active_chouqian/chouqianReward/icon_yuanbao.png");
                break;
            case 2:
                TextDes.setString("分享成功，恭喜您获得"+data.amount+"红包，请点击领取");
                TextNum.setString("红包X"+data.amount);
                iconPrize.loadTexture("active_chouqian/chouqianReward/icon_hongbao.png");
                break;
            case 4:
                TextDes.setString("分享成功，恭喜您获得"+data.amount+"礼券，请点击领取");
                TextNum.setString("礼券X"+data.amount);
                iconPrize.loadTexture("active_chouqian/chouqianReward/icon_liquan.png");
                break;
            case 5:
                TextDes.setString("分享成功，恭喜您获得"+data.amount+"金币，请点击领取");
                TextNum.setString("金币X"+data.amount);
                iconPrize.loadTexture("active_chouqian/chouqianReward/icon_jinbi.png");
                break;
            default:
                TextDes.setString("分享成功，恭喜您获得"+data.amount+"元宝，请点击领取");
                TextNum.setString("元宝X"+data.amount);
                iconPrize.loadTexture("active_chouqian/chouqianReward/icon_yuanbao.png");
                break;
        }

        return true;
    },
});