/**
 * Created by WuXiaoDong on 2018/4/17.
 */

var jiaYouRedPacketLayer = cc.Layer.extend({
    _data:null,
    _back0:null,
    _back1:null,
    _back2:null,
    _imageTime:null,
    _panelRecv:null,
    _panelCut:null,
    _closeCallback:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("jiayouRedPacket.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;
        MjClient.jiaYouRedPacketui = this;

        //获取页面信息
        this.getJiaYouPacketData();

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back0 = UI.node.getChildByName("back_0");
        this._back0.setVisible(false);
        setWgtLayout(this._back0, [0.81, 0.81], [0.5, 0], [0, 0]);
        this._back1 = UI.node.getChildByName("back_1");
        this._back1.setVisible(false);
        setWgtLayout(this._back1, [0.821, 0.821], [0.5, 0], [0, 0]);
        this._back2 = UI.node.getChildByName("back_2");
        this._back2.setVisible(false);
        setWgtLayout(this._back2, [0.821, 0.821], [0.5, 0], [0, 0]);

        //关闭按钮
        var _close = UI.node.getChildByName("close");
        setWgtLayout(_close, [0.13, 0.13], [0.95, 0.91], [0, 0]);
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
                delete MjClient.jiaYouRedPacketui;
                if (this._closeCallback) {
                    this._closeCallback();
                }
            }
        }, this);

        var imageTitle = UI.node.getChildByName("ImageTitle");
        setWgtLayout(imageTitle, [0.66, 0.66], [0.5, 0.91], [0, 0]);

        this._imageTime = UI.node.getChildByName("ImageTime");
        this._imageTime.setVisible(false);
        setWgtLayout(this._imageTime, [0.4, 0.4], [0.5, 0.77], [0, 0]);

        var btnRule = UI.node.getChildByName("btn_rule");
        setWgtLayout(btnRule, [0.09, 0.09], [0.964, 0.72], [0, 0]);
        btnRule.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                MjClient.Scene.addChild(new jiayouPacketRuleLayer());
            }
        },this);

        this._panelRecv = UI.node.getChildByName("PanelRecv");
        this._panelRecv.setVisible(false);
        setWgtLayout(this._panelRecv, [0.145, 0.145], [0, 0.92], [0, 0]);
        this._recvItem = UI.node.getChildByName("RecvItem");

        this._panelCut = UI.node.getChildByName("PanelCut");
        this._panelCut.setVisible(false);
        setWgtLayout(this._panelCut, [0.26, 0.26], [0, 0.85], [0, 0]);
        this._panelItem = UI.node.getChildByName("PanelItem");

        var leftGold = UI.node.getChildByName("left_gold");
        setWgtLayout(leftGold, [0.27, 0.27], [0.085, 0.14], [0, 0]);

        var rightDownGold = UI.node.getChildByName("right_down_gold");
        setWgtLayout(rightDownGold, [0.23, 0.23], [0.92, 0.15], [0, 0]);

        var rightTopGold = UI.node.getChildByName("right_top_gold");
        setWgtLayout(rightTopGold, [0.18, 0.18], [0.964, 0.55], [0, 0]);

        return true;
    },

    initUI:function () {
        if(!this._data){
            return;
        }

        this._back0.setVisible(false);
        this._back1.setVisible(false);
        this._back2.setVisible(false);
        this._imageTime.setVisible(false);
        if(this._data.status == 0){
            this.initBack0();
            this._back0.setVisible(true);
        }else if(this._data.status == 1 || this._data.status == 2){
            this.initBack1();
            this._back1.setVisible(true);
        }else if(this._data.status == 3 || this._data.status == 4){
            this.initBack2();
            this._back2.setVisible(true);
        }

        if(this._data.recvList.length > 0){
            this._panelRecv.setVisible(true);
            this.initPanelRecv();
        }else {
            this._panelRecv.setVisible(false);
        }
    },

    initBack0:function () {
        var self = this;
        var btnGetReward = this._back0.getChildByName("btn_getReward");
        btnGetReward.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.jiayouActivityRecv();
            }
        })
    },

    initBack1:function () {
        if(this._data.detachedList.length > 0){
            this._panelCut.setVisible(true);
            var self = this;
            this._panelCut.removeAllChildren();
            for(var i = 0; i< this._data.detachedList.length; i++){
                var item = this._panelItem.clone();
                this._panelCut.addChild(item);
                item.setPosition(cc.p(0, 140-item.height*i));

                var _head = item.getChildByName("head");
                cc.loader.loadImg(this._data.detachedList[i].avatar ? this._data.detachedList[i].avatar : "png/default_headpic.png", {isCrossOrigin : true}, function(err, texture)
                {
                    if(!err&&texture)
                    {
                        var headSprite = new cc.Sprite(texture);
                        headSprite.setPosition(cc.p(this.width/2,this.height/2));
                        headSprite.setScaleX((this.getContentSize().width - 8) / headSprite.getContentSize().width);
                        headSprite.setScaleY((this.getContentSize().height - 8) / headSprite.getContentSize().height);
                        this.addChild(headSprite);
                    }
                }.bind(_head));

                var textRecv = item.getChildByName("TextRecv");
                textRecv.ignoreContentAdaptWithSize(true);
                function _getName()
                {
                    var pinfo = MjClient.data.pinfo;
                    return unescape(self._data.detachedList[i].nickname );
                }
                textRecv.setString(getNewName(_getName()) + "帮你拆了" + this._data.detachedList[i].amount + "元");

                var delay1 = new cc.DelayTime(3);
                var moveBy1 = new cc.MoveBy(1, cc.p(0, item.height));
                var callBack1 = new cc.CallFunc(function(){
                    if(this.y > 140){
                        this.setPosition(cc.p(0, 140 -(self._data.detachedList.length - 1) * this.height))
                    }
                }.bind(item));
                if(this._data.detachedList.length > 3){
                    item.runAction(cc.repeatForever(cc.sequence(delay1, moveBy1, callBack1)));
                }
            }
        }else {
            this._panelCut.setVisible(false);
        }

        if(this._data.countdownSecond && this._data.countdownSecond > 0){
            this._imageTime.setVisible(true);

            var leftTime = this._data.countdownSecond/1000;
            self.timeScheduleFunc(leftTime);
            this._imageTime.schedule(function () {
                self.timeScheduleFunc(leftTime);
                if (leftTime > 0) {
                    leftTime--;
                }
            }, 1, cc.REPEAT_FOREVER, 0);

        }

        var text2 = this._back1.getChildByName("Text_2");
        text2.ignoreContentAdaptWithSize(true);
        var textMoney1 = this._back1.getChildByName("TextMoney1");
        textMoney1.ignoreContentAdaptWithSize(true);
        var textShenyu = this._back1.getChildByName("TextShenyu");
        textShenyu.ignoreContentAdaptWithSize(true);
        var btnContiniuShare = this._back1.getChildByName("ButtonContiniuShare");
        btnContiniuShare.getTitleRenderer().setPosition(cc.p(250, 55));

        if(this._data.status == 1){
            var self = this;
            text2.setString("恭喜你获得红包");
            textMoney1.setString(this._data.amount+"元");
            textShenyu.setVisible(false);
            btnContiniuShare.getTitleRenderer().setString("马上拆开");
            btnContiniuShare.addTouchEventListener(function (sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED) {
                    if(cc.sys.os == cc.sys.OS_WINDOWS){
                        postEvent("WX_SHARE_SUCCESS",{errCode:0})
                    }
                    MjClient.native.wxShareUrl(self._data.shareUrl,"帮我点一下，和我一起领福利",
                        "牌友联盟福利人人有，最高可领188！！");
                    self.jiayouActivityDetached();
                }
            });

        }else if(this._data.status == 2){
            var self = this;
            if(this._data.remain>0){//没有拆完还要继续分享
                text2.setString("恭喜拆得红包");
                textMoney1.setString(this._data.detached+"元");
                textShenyu.setVisible(true);
                textShenyu.setString("剩余"+this._data.remain+"元未拆，快邀请好友帮忙拆开吧！");
                btnContiniuShare.getTitleRenderer().setString("继续分享");
                btnContiniuShare.addTouchEventListener(function (sender, type) {
                    if (type == ccui.Widget.TOUCH_ENDED) {
                        if(cc.sys.os == cc.sys.OS_WINDOWS){
                            postEvent("WX_SHARE_SUCCESS",{errCode:0})

                        }
                        MjClient.native.wxShareUrl(self._data.shareUrl,"帮我点一下，和我一起领福利",
                            "牌友联盟福利人人有，最高可领188！！")
                    }
                });
            }else {//已经拆完还没有拆开
                text2.setString("恭喜你获得红包");
                textMoney1.setString(this._data.amount+"元");
                textShenyu.setVisible(false);
                btnContiniuShare.getTitleRenderer().setString("马上拆开");
                btnContiniuShare.addTouchEventListener(function (sender, type) {
                    if (type == ccui.Widget.TOUCH_ENDED) {
                        self.jiayouActivityUnpick();
                    }
                });
            }
        }
    },

    initBack2:function () {
        var self = this;
        for(var i=0; i<this._data.play.length ; i++){
            var imageIsDone = this._back2.getChildByName("ImageIsDone_"+i);
            var textDay = imageIsDone.getChildByName("TextDay");
            if(this._data.play[i].count == 0){
                imageIsDone.loadTexture("active_jiayouhongbao/img_undone.png");
                textDay.setTextColor(cc.color("#8D8D8D"));
            }else if(this._data.play[i].count >= 1){
                imageIsDone.loadTexture("active_jiayouhongbao/img_done.png");
                textDay.setTextColor(cc.color("#F45542"));
            }
        }
        var btnTixian = this._back2.getChildByName("ButtonTixian");
        btnTixian.getTitleRenderer().setPosition(cc.p(250, 55));
        btnTixian.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.jiayouActivityWithdraw();
            }
        });
        if(this._data.status == 3){
            if(this._data.canWithDraw){
                btnTixian.setBright(true);
                btnTixian.setTouchEnabled(true);
                btnTixian.getTitleRenderer().setString("马上提现");
            }else {
                btnTixian.setBright(false);
                btnTixian.setTouchEnabled(false);
                btnTixian.getTitleRenderer().setString("马上提现");
            }
        }else if(this._data.status == 4){
            btnTixian.setBright(true);
            btnTixian.setTouchEnabled(false);
            btnTixian.getTitleRenderer().setString("已领取");
        }
    },

    initPanelRecv:function () {
        var self = this;
        this._panelRecv.removeAllChildren();
        for(var i = 0; i< this._data.recvList.length; i++){
            var item = this._recvItem.clone();
            this._panelRecv.addChild(item);
            item.setPosition(cc.p(0, -item.height*i));

            var _head = item.getChildByName("head");
            cc.loader.loadImg(this._data.recvList[i].avatar ? this._data.recvList[i].avatar : "png/default_headpic.png", {isCrossOrigin : true}, function(err, texture)
            {
                if (err) {
                    cc.log("红包头像error："+err);
                }
                else if(texture)
                {
                    cc.log("红包头像texture："+texture);
                    var headSprite = new cc.Sprite(texture);
                    headSprite.setPosition(cc.p(this.width/2,this.height/2));
                    headSprite.setScaleX((this.getContentSize().width - 8) / headSprite.getContentSize().width);
                    headSprite.setScaleY((this.getContentSize().height - 8) / headSprite.getContentSize().height);
                    this.addChild(headSprite);
                }
            }.bind(_head));

            var textRecv = item.getChildByName("TextRecv");
            textRecv.ignoreContentAdaptWithSize(true);
            textRecv.setString(this._data.recvList[i].time + "前领取" + this._data.recvList[i].amount + "元红包");

            var delay1 = new cc.DelayTime(3);
            var moveBy1 = new cc.MoveBy(1, cc.p(0, item.height));
            var callBack1 = new cc.CallFunc(function(){
                if(this.y > 0){
                    this.setPosition(cc.p(0, -(self._data.recvList.length - 1) * this.height))
                }
            }.bind(item));
            if(this._data.recvList.length > 1){
                item.runAction(cc.repeatForever(cc.sequence(delay1, moveBy1, callBack1)));
            }
        }
    },

    timeScheduleFunc:function (leftTime) {
        var timeArr = [];
        var h = parseInt(leftTime/3600);
        if(h.toString().length == 1){
            timeArr.push("0");
            timeArr.push(h.toString());
        }else if(h.toString().length == 2){
            timeArr.push(h.toString().charAt(0));
            timeArr.push(h.toString().charAt(1));
        }else {
            cc.log("时间太长了");
        }
        var m = parseInt((leftTime%3600)/60);
        if(m.toString().length == 1){
            timeArr.push("0");
            timeArr.push(m.toString());
        }else if(m.toString().length == 2){
            timeArr.push(m.toString().charAt(0));
            timeArr.push(m.toString().charAt(1));
        }
        var s = parseInt((leftTime%3600)%60);
        if(s.toString().length == 1){
            timeArr.push("0");
            timeArr.push(s.toString());
        }else if(s.toString().length == 2){
            timeArr.push(s.toString().charAt(0));
            timeArr.push(s.toString().charAt(1));
        }
        if(timeArr.length == 6){
            for(var i=0 ; i<6 ; i++){
                var textTime = this._imageTime.getChildByName("TextTime_"+i);
                textTime.ignoreContentAdaptWithSize(true);
                textTime.setString(timeArr[i]);
            }
        }
    },

    getJiaYouPacketData:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.jiayouActivityMsg",{},function(rtn){
            cc.log("wxd pkplayer.handler.jiayouActivityMsg:"+JSON.stringify(rtn))
            MjClient.unblock();
            if(rtn.code == -1)
            {
                MjClient.showToast(rtn.message);
            }else if(rtn.code == 0){
                self._data=rtn.data;
                self.initUI();
            }
        });
    },

    jiayouActivityRecv:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.jiayouActivityRecv",{},function(rtn){
            cc.log("wxd pkplayer.handler.jiayouActivityRecv:"+JSON.stringify(rtn))
            MjClient.unblock();
            if(rtn.code == -1)
            {
                MjClient.showToast(rtn.message);
            }else if(rtn.code == 0){
                self._data.id=rtn.data.id;
                self._data.amount=rtn.data.amount;
                self._data.shareUrl=rtn.data.shareUrl;
                self._data.status=1;
                self.initUI();
                MjClient.Scene.addChild(new jiaYouPacketShareLayer(self._data));
            }
        });
    },

    jiayouActivityDetached:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.jiayouActivityDetached",{},function(rtn){
            cc.log("wxd pkplayer.handler.jiayouActivityDetached:"+JSON.stringify(rtn))
            MjClient.unblock();
            if(rtn.code == -1)
            {
                MjClient.showToast(rtn.message);
            }else if(rtn.code == 0){
                // self._data.detached=rtn.data.detached;
                // self._data.detachedTime=rtn.data.detachedTime;
                // self._data.remain=rtn.data.remain;
                // self._data.shareUrl = rtn.data.shareUrl;
                // self._data.status=2;
                // self.initUI();
                self.getJiaYouPacketData();
            }
        });
    },

    jiayouActivityUnpick:function () {//马上拆开
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.jiayouActivityUnpick",{},function(rtn){
            cc.log("wxd pkplayer.handler.jiayouActivityUnpick:"+JSON.stringify(rtn));
            MjClient.unblock();
            if(rtn.code == -1)
            {
                MjClient.showToast(rtn.message);
            }else if(rtn.code == 0){
                self._data.money=rtn.data.money;
                self._data.redpacket=rtn.data.redpacket;
                self._data.wechat=rtn.data.wechat;
                self._data.status=3;
                self.initUI();
                MjClient.Scene.addChild(new jiaYouPacketSureLayer(self._data));
            }
        });
    },

    jiayouActivityWithdraw:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.jiayouActivityWithdraw",{},function(rtn){
            cc.log("wxd pkplayer.handler.jiayouActivityWithdraw:"+JSON.stringify(rtn));
            MjClient.unblock();
            if(rtn.code == -1)
            {
                MjClient.showToast(rtn.message);
            }else if(rtn.code == 0){
                self._data.canWithDraw=false;
                self._data.status=4;
                self.initUI();
                MjClient.showToast(rtn.message);
            }
        });
    },

    setCloseCallback: function(callback) {
        this._closeCallback = callback;
    }
});





var jiaYouPacketShareLayer = cc.Layer.extend({
    ctor: function (_data) {
        this._super();
        var UI = ccs.load("jiayouPacketShare.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;
        MjClient.jiaYouPacketShareui = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = UI.node.getChildByName("back");
        setWgtLayout(back, [0.94, 0.94], [0.5, 0.48], [0, 0]);

        var textMoney = back.getChildByName("TextMoney");
        textMoney.ignoreContentAdaptWithSize(true);
        textMoney.setString(_data.amount+"元");

        var Text_16 = back.getChildByName("Text_16");
        Text_16.x = textMoney.x - textMoney.width/2;
        var Text_17 = back.getChildByName("Text_17");
        Text_17.x = textMoney.x + textMoney.width/2;

        //分享按钮
        var btnShare = back.getChildByName("ButtonShare");
        btnShare.getTitleRenderer().setPosition(cc.p(250, 55));
        btnShare.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if(cc.sys.os == cc.sys.OS_WINDOWS){
                    postEvent("WX_SHARE_SUCCESS",{errCode:0})
                }
                MjClient.native.wxShareUrl(_data.shareUrl,"帮我点一下，和我一起领福利",
                    "牌友联盟福利人人有，最高可领188！！");
                self.removeFromParent();
                delete MjClient.jiaYouPacketShareui;
                if(cc.sys.isObjectValid(MjClient.jiaYouRedPacketui)){
                    MjClient.jiaYouRedPacketui.jiayouActivityDetached();
                }
            }
        }, this);

        return true;
    }
});



var jiaYouPacketSureLayer = cc.Layer.extend({
    ctor: function (_data) {
        this._super();
        var UI = ccs.load("jiayouPacketSure.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = UI.node.getChildByName("back");
        setWgtLayout(back, [0.94, 0.94], [0.5, 0.48], [0, 0]);

        var textMoney = back.getChildByName("TextMoney");
        textMoney.ignoreContentAdaptWithSize(true);
        textMoney.setString(_data.redpacket+"元现金");

        var textYuanbao = back.getChildByName("TextYuanbao");
        textYuanbao.ignoreContentAdaptWithSize(true);
        textYuanbao.setString(_data.money+"元宝");

        var Text_16 = back.getChildByName("Text_16");
        var Text_17 = back.getChildByName("Text_17");
        var leftWidth = (back.width - textMoney.width - textYuanbao.width - Text_16.width - Text_17.width)/2;
        Text_16.x = leftWidth + Text_16.width/2;
        textMoney.x = leftWidth + Text_16.width + textMoney.width/2;
        Text_17.x = leftWidth + Text_16.width + textMoney.width + Text_17.width/2;
        textYuanbao.x = leftWidth + Text_16.width + textMoney.width + Text_17.width + textYuanbao.width/2;

        var textGongzhonghao = back.getChildByName("TextGongzhonghao");
        textGongzhonghao.ignoreContentAdaptWithSize(true);
        textGongzhonghao.setString("温馨提示：现金奖励请关注公众号（"+_data.wechat+"）领取");

        //分享按钮
        var btnSure = back.getChildByName("ButtonSure");
        btnSure.getTitleRenderer().setPosition(cc.p(250, 55));
        btnSure.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
                if(cc.sys.isObjectValid(MjClient.jiaYouRedPacketui)){
                    MjClient.jiaYouRedPacketui.getJiaYouPacketData();
                }
            }
        }, this);
        return true;
    }
});



var jiayouPacketRuleLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var UI = ccs.load("jiayouPacketRule.json");
        this.addChild(UI.node);
        var that = this;

        var block = UI.node.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = UI.node.getChildByName("back");
        setWgtLayout(back, [0.828, 0.98], [0.5, 0.485], [0, 0]);
        this.back = back;

        var closeBtn = back.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent();
            }
        });

        var contentScrollView = back.getChildByName("contentScrollView");
        var contentStrs = this.getContentStrs();
        var content = [];
        for (var i = 0; i < 3; i++) {
            var title = contentScrollView.getChildByName("title" + (i + 1));
            var line = contentScrollView.getChildByName("line" + (i + 1));
            content[i] = contentScrollView.getChildByName("content" + (i + 1));
            if(i == 0){
                title.ignoreContentAdaptWithSize(true);
                title.setString(contentStrs[i * 2]);
                if (i != 0)
                    title.y = content[i - 1].y - content[i - 1].height - 80;

                line.y = title.y - 30;

                content[i].ignoreContentAdaptWithSize(false);
                content[i].getVirtualRenderer().setDimensions(750, -1);
                content[i].setString(contentStrs[i * 2 + 1]);
                content[i].height = content[i].getVirtualRenderer().height;
                content[i].y = line.y - 20;
            }else {
                title.setVisible(false);
                line.setVisible(false);
                content[i].setVisible(false);
            }
        }

        var height = contentScrollView.height + content[0].height - content[0].y;
        contentScrollView.setInnerContainerSize(cc.size(contentScrollView.getInnerContainerSize().width, height));
        var children = contentScrollView.getChildren();
        for (var i = 0; i < children.length; i++) {
            children[i].y += height - contentScrollView.height;
        }
    },

    getContentStrs: function() {
        var gongzhonghao = "";
        var award = [];
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
            gongzhonghao = "qxqipai";
            award = [888, 688, 588, 388, 288, 188, 88, 38];
        } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ) {
            gongzhonghao = "qxxuzhou";
            award = [588, 388, 288, 188, 88, 68, 38, 28];
        } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP) {
            gongzhonghao = "qxnantong";
            award = [588, 388, 288, 188, 128, 88, 68, 28];
        } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ) {
            gongzhonghao = "qxhuaian";
            award = [588, 388, 288, 188, 128, 88, 68, 28];
        } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
            gongzhonghao = "qxhaian";
        } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            gongzhonghao = "qxyueyang";
        } else if (isJinZhongAPPType()) {
            gongzhonghao = "TXqipai";
        }

        var tipText = this.back.getChildByName("tipText");
        tipText.ignoreContentAdaptWithSize(true);
        tipText.setString("温馨提示：如有疑问，请咨询牌友联盟公众号（" + gongzhonghao + "）");

        return [
            "活动规则",
            "1、活动期间每人可领取1个加油红包\n\
2、加油红包需分享给朋友，邀请好友帮忙拆红包，拆完所有金额即可领取\n\
3、活动期间只能帮同一好友拆1次，总计有5次拆红包机会\n\
4、帮拆好友也能获得一个分享红包\n\
5、加油红包需在领取后36小时内拆完并领取，超过36小时红包将过期\n\
6、现金奖励需关注微信公众号（" + gongzhonghao + "）领取\n\
\n\
\n\
\n"
        ];
    },
});