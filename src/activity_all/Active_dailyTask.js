/**
 * Created by WuXiaoDong on 2018/10/18.
 */

var activeDailyTaskLayer = cc.Layer.extend({
    _taskItem:null,
    _PanelRecv:null,
    _RecvItem:null,
    taskItemData:null,
    RecvItemData:null,
    _back:null,
    _closeCallback:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("Active_dailyTask.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.85, 0.85], [0.52, 0.48], [0, 0]);

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

        var btnRule = this._back.getChildByName("btn_rule");
        btnRule.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                MjClient.Scene.addChild(new activeDailyTaskRuleLayer());
            }
        }, this);

        this._taskItem = this._back.getChildByName("taskItem");
        this._taskItem.setVisible(false);

        this._PanelRecv = this._back.getChildByName("PanelRecv");
        this._RecvItem = this._back.getChildByName("RecvItem");
        this._RecvItem.setVisible(false);

        this.initData();

        return true;
    },

    initData:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.dailyTaskInfo",{},function(rtn){
            cc.log("wxd pkplayer.handler.dailyTaskInfo:"+JSON.stringify(rtn))
            MjClient.unblock();
            if(rtn.code == 0) {
                self.taskItemData = rtn.data.list;
                self.RecvItemData = rtn.data.recvRecord;
                self.initUI();
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    },

    initUI:function () {
        var self = this;

        if(this.taskItemData){
            for(var i = 0; i< this.taskItemData.length; i++){
                var data = this.taskItemData[i];
                var taskItem = this._taskItem.clone();
                taskItem.setVisible(true);
                taskItem.x = this._taskItem.x;
                taskItem.y = this._taskItem.y - 80*i;
                this._back.addChild(taskItem);

                var Text_title = taskItem.getChildByName("Text_title");
                Text_title.ignoreContentAdaptWithSize(true);
                Text_title.setString(data.desc);

                var Text_19 = taskItem.getChildByName("Text_19");
                Text_19.ignoreContentAdaptWithSize(true);

                var btnGet = taskItem.getChildByName("btn");
                if(data.canRecv){
                    if(data.recved){
                        btnGet.loadTextureNormal("active_dailyTask/btn_finished.png");
                        btnGet.setTouchEnabled(false);
                    }else {
                        btnGet.loadTextureNormal("active_dailyTask/btn_lingqu.png");
                        btnGet.typeID = 1;//可领取
                    }
                }else {
                    btnGet.loadTextureNormal("active_dailyTask/btn_toFinish.png");
                    btnGet.typeID = 2;//去完成
                    // btnGet.setBright(false);
                }
                btnGet.key = data.key;
                btnGet.type = data.type;
                btnGet.addTouchEventListener(function (sender, type) {
                    if (type == ccui.Widget.TOUCH_ENDED) {
                        if(sender.typeID == 1){//可领取
                            cc.log("wxd==typetypetype==="+sender.type);
                            self.removeFromParent();
                            MjClient.Scene.addChild(new activeDailyTaskHBLayer(sender.type))
                        }else if(sender.typeID == 2){//去完成
                            if(sender.key == "play"){
                                // MjClient.block();
                                // MjClient.gamenet.request("pkplayer.handler.clubList", {clubId: 0}, function(rtn) {
                                //     MjClient.unblock();
                                //     if (rtn.code != 0) {
                                //         MjClient.showToast(rtn.message);
                                //         return;
                                //     }
                                //
                                //     self.removeFromParent();
                                //     if(rtn.data.list.length > 0){//跳转俱乐部
                                        MjClient.Scene.addChild(new FriendCard_main());
                                //     }else {//跳转开房界面
                                //         if (!MjClient.data.sData) {
                                //             postEvent("createRoom",{});
                                //             MjClient.native.umengEvent4CountWithProperty("ChuangjianfangjianClick", {uid:SelfUid()});
                                //         }
                                //         else {
                                //             MjClient.showMsg("房间已经创建,请直接加入房间。");
                                //         }
                                //     }
                                // });
                            }else {
                                self.removeFromParent();
                                MjClient.Scene.addChild(new recommendLayer_active())
                            }
                        }
                    }
                }, this)
            }
        }

        if(this.RecvItemData){
            this._PanelRecv.removeAllChildren();
            for (var i = 0; i < this.RecvItemData.length; i++) {
                var data = this.RecvItemData[i];
                var item = this._RecvItem.clone();
                item.setVisible(true);
                this._PanelRecv.addChild(item);
                item.setPosition(cc.p(item.width * (i), 0));
                item.getChildByName("TextRecv").setString("恭喜"+getNewName(unescape(data.nickname)) +"完成每日任务，得到"+ data.amount + "元红包");

                var delay1 = new cc.DelayTime(0);
                var moveBy1 = new cc.MoveBy(5, cc.p(-item.width,0));
                var callBack1 = new cc.CallFunc(function() {
                    if (this.x < 0) {
                        this.setPositionX((self.RecvItemData.length -1) * this.width);
                    }
                }.bind(item));
                if (this.RecvItemData.length > 0) {
                    item.runAction(cc.repeatForever(cc.sequence(delay1, moveBy1, callBack1)));
                }
            }
        }
    },

    setCloseCallback: function(callback) {
        this._closeCallback = callback;
    }
});


var activeDailyTaskRuleLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var UI = ccs.load("Active_dailyTaskHelp.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.7, 0.7], [0.5, 0.48], [0, 0]);

        //关闭按钮
        var close = this._back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        var TextRule = this._back.getChildByName("Text_rule");
        TextRule.setString("1、每日红包的任务每天会刷新，任务内容随机出现。\n2、邀请新玩家和邀请好友回归活动，需要被邀请人对战一场才算完成任务。\n3、红包为手气红包，金额随机。\n4、有疑问请咨询客服，客服微信："+MjClient.systemConfig.dailiZixun+"\n5、最终解释权归本公司所有。");
        return true;
    },
});


var activeDailyTaskHBLayer = cc.Layer.extend({
    ctor: function (type) {
        this._type = type;
        this._super();
        var UI = ccs.load("Active_dailyTaskHB.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.7, 0.7], [0.5, 0.48], [0, 0]);

        //关闭按钮
        var close = this._back.getChildByName("close");
        close.setVisible(false);
        close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        //开按钮
        var btnKai = this._back.getChildByName("btn_kai");
        var xuanzhuan = btnKai.getChildByName("xuanzhuan");
        xuanzhuan.runAction(cc.repeatForever(cc.rotateBy(1,360)));
        var ImageQuan = btnKai.getChildByName("Image_quan");
        ImageQuan.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function () {
            ImageQuan.setScale(0.7);
            ImageQuan.setOpacity(225);
        }),cc.spawn(cc.scaleTo(1, 1.2),cc.fadeOut(1)))))
        btnKai.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.dailyTaskOpen",{type:self._type},function(rtn){
                    cc.log("wxd pkplayer.handler.dailyTaskOpen:"+JSON.stringify(rtn))
                    MjClient.unblock();
                    if(rtn.code == 0) {
                        self.removeFromParent();
                        MjClient.Scene.addChild(new activeDailyTaskKuangOneLayer(rtn.data))
                    }else {
                        MjClient.showToast(rtn.message);
                    }
                });
            }
        }, this);

        return true;
    },
});


var activeDailyTaskKuangOneLayer = cc.Layer.extend({
    ctor: function (data) {
        this._super();
        var UI = ccs.load("Active_dailyTaskTankuang.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.6, 0.6], [0.5, 0.48], [0, 0]);

        //关闭按钮
        var close = this._back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
                MjClient.Scene.addChild(new activeDailyTaskKuangTwoLayer(data));
            }
        }, this);

        var TextRule = this._back.getChildByName("Text");
        TextRule.setString("恭喜你获得"+data.redpacket+"元红包，请分享到微信公众号"+MjClient.systemConfig.gongzhonghao+"领取");

        //分享按钮
        var btnGet = this._back.getChildByName("btn_get");
        btnGet.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if (cc.sys.OS_WINDOWS == cc.sys.os) {
                    MjClient.wxShareImageToPYQ = true;
                    postEvent("WX_SHARE_SUCCESS", {
                        errCode: 0
                    });
                }
                var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "active_dailyTask/participator_1.jpg";
                MjClient.native.wxShareImageToPYQ(filePath);
            }
        }, this);

        UIEventBind(null, btnGet, "WX_SHARE_SUCCESS", function(wxdata) {
            MjClient.wxShareImageToPYQ = false;
            if (parseInt(wxdata.errCode) == 0) {
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.dailyTaskRecv",{id:data.id},function(rtn){
                    cc.log("wxd pkplayer.handler.dailyTaskRecv:"+JSON.stringify(rtn))
                    MjClient.unblock();
                    if(rtn.code == 0) {
                        self.removeFromParent();
                        MjClient.Scene.addChild(new activeDailyTaskKuangThreeLayer());
                    }else {
                        MjClient.showToast(rtn.message);
                    }
                });
            }
        });
        return true;
    },
});

var activeDailyTaskKuangTwoLayer = cc.Layer.extend({
    ctor: function (data) {
        this._super();
        var UI = ccs.load("Active_dailyTaskTankuang.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.6, 0.6], [0.5, 0.48], [0, 0]);

        //关闭按钮
        var close = this._back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        var TextRule = this._back.getChildByName("Text");
        TextRule.setString("不分享视为放弃奖励，请分享后到公众号领取红包");

        //分享按钮
        var btnGet = this._back.getChildByName("btn_get");
        btnGet.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if (cc.sys.OS_WINDOWS == cc.sys.os) {
                    MjClient.wxShareImageToPYQ = true;
                    postEvent("WX_SHARE_SUCCESS", {
                        errCode: 0
                    });
                }
                var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "active_dailyTask/participator_1.jpg";
                MjClient.native.wxShareImageToPYQ(filePath);
            }
        }, this);

        UIEventBind(null, btnGet, "WX_SHARE_SUCCESS", function(wxdata) {
            MjClient.wxShareImageToPYQ = false;
            if (parseInt(wxdata.errCode) == 0) {
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.dailyTaskRecv",{id:data.id},function(rtn){
                    cc.log("wxd pkplayer.handler.dailyTaskRecv:"+JSON.stringify(rtn))
                    MjClient.unblock();
                    if(rtn.code == 0) {
                        self.removeFromParent();
                        MjClient.Scene.addChild(new activeDailyTaskKuangThreeLayer());
                    }else {
                        MjClient.showToast(rtn.message);
                    }
                });
            }
        });
        return true;
    },
});

var activeDailyTaskKuangThreeLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var UI = ccs.load("Active_dailyTaskTankuang.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.6, 0.6], [0.5, 0.48], [0, 0]);

        //关闭按钮
        var close = this._back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        var TextRule = this._back.getChildByName("Text");
        TextRule.setString("红包已发放，请到微信公众号"+MjClient.systemConfig.gongzhonghao+"领取哦~");

        //分享按钮
        var btnGet = this._back.getChildByName("btn_get");
        btnGet.loadTextureNormal("active_dailyTask/btn_sure.png");
        btnGet.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);
        return true;
    },
});