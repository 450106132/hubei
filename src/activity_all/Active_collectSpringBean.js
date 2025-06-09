/**
 * Created by WuXiaoDong on 2019/4/13.
 */

var collectSpringBeanLayer = cc.Layer.extend({
    _data:null,
    _rewardData:null,
    _back:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("Active_collectSpringBean.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;
        this._closeCallback = null;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.95,0.95],[0.5,0.5],[0,0]);

        this._btnShare = UI.node.getChildByName("btn_share");
        setWgtLayout(this._btnShare, [0.3,0.3],[0.98,1],[0,0]);
        this._btnShare.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if (cc.sys.OS_WINDOWS == cc.sys.os) {
                    MjClient.wxShareImageToPYQ = true;
                    postEvent("WX_SHARE_SUCCESS", {
                        errCode: 0
                    });
                }
                var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "active/active_collectSpringBean/participator_1.jpg";
                MjClient.native.wxShareImageToPYQ(filePath);
            }
        }, this);

        UIEventBind(null, this._btnShare, "WX_SHARE_SUCCESS", function(wxdata) {
            MjClient.wxShareImageToPYQ = false;
            if (parseInt(wxdata.errCode) == 0) {
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.lotteryShare",{key: "SPRING_BEAN"},function(rtn){
                    cc.log("wxd pkplayer.handler.lotteryShare:"+JSON.stringify(rtn))
                    MjClient.unblock();
                    if(rtn.code == 0) {
                        self.getSpringBeanInfo();
                    }else {
                        MjClient.showToast(rtn.message);
                    }
                });
            }
        });

        //关闭按钮
        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
                if (this._closeCallback) {
                    this._closeCallback();
                }
            }
        }, this);

        this._textTime = this._back.getChildByName("Text_time");
        this._textTime.ignoreContentAdaptWithSize(true);
        this._textTime.setVisible(false);

        this._nodeDailijiangli = this._back.getChildByName("Node_dailijiangli");
        this._nodeDailijiangli.setVisible(false);

        this._nodeQuanfujiangli = this._back.getChildByName("Node_quanfujiangli");
        this._nodeQuanfujiangli.setVisible(false);

        this._textQuanfuchundou = this._back.getChildByName("Text_quanfuchundou");
        this._textQuanfuchundou.ignoreContentAdaptWithSize(true);
        this._textQuanfuchundou.setVisible(false);

        this._TextWodechundou = this._back.getChildByName("Text_wodechundou");
        this._TextWodechundou.ignoreContentAdaptWithSize(true);
        this._TextWodechundou.setVisible(false);

        var btn_rule = this._back.getChildByName("btn_rule");
        btn_rule.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                MjClient.Scene.addChild(new collectSpringBeanRuleLayer());
            }
        }, this);

        this.getSpringBeanInfo();
        return true;
    },

    initUI:function () {
        var self = this;
        var startTime = MjClient.dateFormat(new Date(parseInt(this._data.startTime)), 'MM月dd日hh:mm');
        var endTime = MjClient.dateFormat(new Date(parseInt(this._data.endTime)), 'MM月dd日hh:mm');
        this._textTime.setString("活动时间："+startTime+"至"+endTime);
        this._textTime.setVisible(true);

        this._textQuanfuchundou.setString("全服春豆："+this._data.allCount);
        this._textQuanfuchundou.setVisible(true);

        this._TextWodechundou.setString("我的春豆："+this._data.personalCount);
        this._TextWodechundou.setVisible(true);

        //代理奖励
        this._nodeDailijiangli.setVisible(true);
        for(var i = 0; i < 5; i++){
            var item = this._nodeDailijiangli.getChildByName("Item_"+i);
            item.setVisible(false);
            if(this._data.personalAwardData[i]){
                item.setVisible(true);
                var Text_bean = item.getChildByName("Text_bean");
                Text_bean.ignoreContentAdaptWithSize(true);
                Text_bean.setString(this._data.personalAwardData[i].target +"春豆");

                var Text_liquan = item.getChildByName("Text_liquan");
                Text_liquan.ignoreContentAdaptWithSize(true);
                Text_liquan.setString(this._data.personalAwardData[i].integral +"礼券")

                var Text_yuanbao = item.getChildByName("Text_yuanbao");
                Text_yuanbao.ignoreContentAdaptWithSize(true);
                Text_yuanbao.setString(this._data.personalAwardData[i].money +"元宝")

                var btnGet = item.getChildByName("Button_7");
                btnGet.type = this._data.personalAwardData[i].type;
                if(this._data.personalAwardData[i].status == -1){
                    btnGet.loadTextureNormal("active/active_collectSpringBean/btn_weidabiao.png");
                    btnGet.setTouchEnabled(false);
                }else if(this._data.personalAwardData[i].status == 0){
                    btnGet.loadTextureNormal("active/active_collectSpringBean/btn_lingqu.png");
                    btnGet.setTouchEnabled(true);
                }else if(this._data.personalAwardData[i].status == 1){
                    btnGet.loadTextureNormal("active/active_collectSpringBean/btn_yilingqu.png");
                    btnGet.setTouchEnabled(false);
                }
                btnGet.addTouchEventListener(function (sender, type) {
                    if (type == ccui.Widget.TOUCH_ENDED) {
                        self.getSpringBeanExchange(sender.type);
                    }
                }, this);
            }
        }

        //全服奖励
        this._nodeQuanfujiangli.setVisible(true);
        for(var i = 0; i < 5; i++){
            var item = this._nodeQuanfujiangli.getChildByName("Item_"+i);
            item.setVisible(false);
            if(this._data.allAwardData[i]){
                item.setVisible(true);
                var Text_bean = item.getChildByName("Text_bean");
                Text_bean.ignoreContentAdaptWithSize(true);
                Text_bean.setString(this._data.allAwardData[i].target +"春豆");

                var btnGet = item.getChildByName("Button_7");
                btnGet.type = this._data.allAwardData[i].type;
                if(this._data.allAwardData[i].status == -1){
                    btnGet.loadTextureNormal("active/active_collectSpringBean/btn_weidabiao.png");
                    btnGet.setTouchEnabled(false);
                }else if(this._data.allAwardData[i].status == 0){
                    btnGet.loadTextureNormal("active/active_collectSpringBean/btn_lingqu.png");
                    btnGet.setTouchEnabled(true);
                }else if(this._data.allAwardData[i].status == 1){
                    btnGet.loadTextureNormal("active/active_collectSpringBean/btn_yilingqu.png");
                    btnGet.setTouchEnabled(false);
                }
                btnGet.addTouchEventListener(function (sender, type) {
                    if (type == ccui.Widget.TOUCH_ENDED) {
                        self.getSpringBeanExchange(sender.type);
                    }
                }, this);
            }
        }
    },

    getSpringBeanInfo:function () {//页面数据
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.springBeanInfo",{},function(rtn){
            cc.log("wxd pkplayer.handler.springBeanInfo:"+JSON.stringify(rtn));
            MjClient.unblock();
            if(rtn.code == 0) {
                self._data = rtn.data;
                self.initUI();
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    },

    getSpringBeanExchange:function (type) {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.springBeanExchange",{type:type},function(rtn){
            cc.log("wxd pkplayer.handler.springBeanExchange:"+JSON.stringify(rtn));
            MjClient.unblock();
            if(rtn.code == 0) {
                self.getSpringBeanInfo();
                MjClient.Scene.addChild(new collectSpringBeanRewardLayer(rtn.data))
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    },

    setCloseCallback:function(callback) {
        this._closeCallback = callback;
    },
});

var collectSpringBeanRuleLayer = cc.Layer.extend({
    _back:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("Active_collectSpringBeanRule.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.75,0.75],[0.5,0.5],[0,0]);

        //关闭按钮
        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        var Text_rule_huodong = this._back.getChildByName("Text_rule_huodong");
        Text_rule_huodong.setString("1、活动期间统计代理游戏行为，不同行为增加相应活动春豆；\n" +
            "①、每日首次分享活动页面获得5春豆（每日仅一次）\n" +
            "②、代理名下所有亲友圈每增加一场有效场次增加1个春豆（元宝局、无上限）\n" +
            "③、单笔实际充值金额每满10元RMB获得1个春豆（购元宝、无上限）\n" +
            "2、活动进行时及结束后1日内满足领奖要求可在活动页面领取奖励；\n" +
            "3、个人代理累计一定数量春豆可领取对应代理奖励；\n" +
            "4、全服代理累计一定数量春豆可领取对应全服奖励；\n" +
            "5、5月6日23:59前未领取奖励视为主动弃奖；\n" +
            "6、个人代理可在“代理奖励”处领取固定奖励，春豆越多奖励越丰富。\n" +
            "7、全服代理可在“全服奖励”处领取随机奖励，春豆越多奖励越丰富。\n" +
            "8、免费场次不参加本活动。个人春豆、全服春豆数据每5分钟更新一次（视网络情况会有延迟更新）。\n" +
            "9、如有疑问请联系客服："+MjClient.systemConfig.dailiZixun);

        return true;
    },
});

var collectSpringBeanRewardLayer = cc.Layer.extend({
    ctor: function (data) {
        this._super();
        var UI = ccs.load("Active_collectSpringBeanReward.json");
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

        var arr = [];
        if(data.integral && data.integral>0){
            arr.push({name:"integral", num:data.integral})
        }
        if(data.money && data.money>0){
            arr.push({name:"money", num:data.money})
        }

        var node = this._back.getChildByName("Node_1");
        node.setVisible(false);
        for(var i = 0; i < arr.length; i++){
            var item = node.clone();
            item.setVisible(true);
            this._back.addChild(item);
            item.x = node.x - (arr.length-1)*100 + i*200;
            item.y = node.y;

            var TextNum = item.getChildByName("Text_num");
            TextNum.ignoreContentAdaptWithSize(true);

            var iconPrize = item.getChildByName("icon_prize");

            if(arr[i].name == "integral"){
                TextNum.setString("礼券X"+arr[i].num);
                iconPrize.loadTexture("active/active_collectSpringBean/collectBeanReward/icon_liquan.png");
            }else if(arr[i].name == "money"){
                TextNum.setString("元宝X"+arr[i].num);
                iconPrize.loadTexture("active/active_collectSpringBean/collectBeanReward/icon_yuanbao.png");
            }
        }

        var TextDes = this._back.getChildByName("Text_1");
        TextDes.ignoreContentAdaptWithSize(true);
        TextDes.setString("点击确定按钮关闭");

        return true;
    },
});