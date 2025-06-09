/**
 * Created by WuXiaoDong on 2019/3/19.
 */

var flyAKiteLayer = cc.Layer.extend({
    _data:null,
    _rewardData:null,
    _back:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("Active_flyAKiteLayer.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;
        this._closeCallback = null;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.95,0.95],[0.5,0.5],[0,0]);

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

        this._paomadeng = this._back.getChildByName("Panel_paomadeng");
        this._paomadeng.setVisible(false);

        for(var i = 0; i < 12; i++){
            var item = this._back.getChildByName("item_"+i);
            item.setVisible(false);
        }

        var CheckBox = self._back.getChildByName("CheckBox_1");
        var CheckBoxBool = util.localStorageEncrypt.getBoolItem("FLY_A_KITE_IS_ACTION", false);
        CheckBox.setSelected(CheckBoxBool);
        CheckBox.addEventListener(function (sender, type) {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setBoolItem("FLY_A_KITE_IS_ACTION", true);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    util.localStorageEncrypt.setBoolItem("FLY_A_KITE_IS_ACTION", false);
                    break;
            }
        },this);

        //风筝
        this.fly_kite = this._back.getChildByName("fly_kite");
        this.kite = this._back.getChildByName("kite");
        this.fly_kite.runAction(cc.repeatForever(cc.sequence(cc.moveBy(1,cc.p(10, 10)).easing(cc.easeSineOut()),cc.moveBy(1,cc.p(-10, -10)).easing(cc.easeSineOut()))));
        this.kite.runAction(cc.repeatForever(cc.sequence(cc.moveBy(1.2,cc.p(10, 5)).easing(cc.easeSineInOut()),cc.moveBy(0.8,cc.p(-5, 10)).easing(cc.easeSineInOut()),cc.moveBy(1.2,cc.p(-10, -5)).easing(cc.easeSineInOut()),cc.moveBy(0.8,cc.p(5, -10)).easing(cc.easeSineInOut()),cc.moveBy(1.2,cc.p(-10, 10)).easing(cc.easeSineInOut()),cc.moveBy(0.8,cc.p(10, -10)).easing(cc.easeSineInOut()))));

        this.getQingMingInfo();
        return true;
    },

    initUI:function () {
        var self = this;
        var Text_time = this._back.getChildByName("Text_time");
        var startTime = MjClient.dateFormat(new Date(parseInt(this._data.startTime)), 'MM月dd日hh:mm');
        var endTime = MjClient.dateFormat(new Date(parseInt(this._data.endTime)), 'MM月dd日hh:mm');
        Text_time.ignoreContentAdaptWithSize(true);
        Text_time.setString("活动时间："+startTime+"至"+endTime);

        var Text_Num = this._back.getChildByName("Text_Num");
        Text_Num.ignoreContentAdaptWithSize(true);
        Text_Num.setString(this._data.leftLotteryAmount);

        //跑马灯
        if(this._data.marquee.length>0){
            this._paomadeng.setVisible(true);
            var Text_PMD = this._paomadeng.getChildByName("Text_PMD");
            Text_PMD.setVisible(false);
            Text_PMD.retain();
            this._paomadeng.removeAllChildren();
            this._paomadeng.addChild(Text_PMD);
            Text_PMD.release();
            for(var i = 0; i < this._data.marquee.length; i++){
                var item = Text_PMD.clone();
                item.setVisible(true);
                item.setString("恭喜"+unescape(this._data.marquee[i].nickname)+"抽到"+this._data.marquee[i].title);
                item.x = Text_PMD.width*(i+1);
                this._paomadeng.addChild(item);
                var callBack1 = new cc.CallFunc(function () {
                    if (this.x < -this.width) {
                        if(self._data.marquee.length == 1){
                            this.setPositionX(self._paomadeng.width);
                        }else {
                            this.setPositionX((self._data.marquee.length -1) * (this.width));
                        }
                    }
                }.bind(item));
                item.runAction(cc.repeatForever(cc.sequence(cc.moveBy((item.width)/125,cc.p(-(item.width),0)), callBack1)));
            }
        }

        //奖品
        for(var i = 0; i < this._data.award.length; i++){
            var item = this._back.getChildByName("item_"+i);
            item.setVisible(true);
            var light = item.getChildByName("light");
            light.setVisible(false);
            var Text_reward = item.getChildByName("Text_reward");
            Text_reward.ignoreContentAdaptWithSize(true);
            Text_reward.setString(this._data.award[i].title);

            var icon = item.getChildByName("Icon");
            var url = this._data.award[i].image;
            cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
            {
                if(!err&&texture && cc.sys.isObjectValid(this))
                {
                    var headSprite = new cc.Sprite(texture);
                    headSprite.setName("headSprite");
                    headSprite.setPosition(cc.p(this.width/2, this.height/2));
                    headSprite.setScaleX(this.width/headSprite.getContentSize().width);
                    headSprite.setScaleY(this.height/headSprite.getContentSize().height);
                    this.addChild(headSprite);
                }
            }.bind(icon));

            item.type = this._data.award[i].type;
            item.amount = this._data.award[i].amount;
        }

        var btn_once = this._back.getChildByName("btn_once");
        btn_once.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if(this._data.lotteryAward.length > 0){
                    MjClient.showToast("请点击【领取奖励】领取奖品");
                    return;
                }
                if(this._data.leftLotteryAmount < 1){
                    MjClient.showToast("抽奖次数不足，亲友圈消耗元宝可以增加抽奖次数哦");
                    return;
                }
                sender.setTouchEnabled(false);
                self.getQingMingLottery(1);
            }
        }, this);

        var btn_ten = this._back.getChildByName("btn_ten");
        btn_ten.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if(this._data.lotteryAward.length > 0){
                    MjClient.showToast("请点击【领取奖励】领取奖品");
                    return;
                }
                if(this._data.leftLotteryAmount < 10){
                    MjClient.showToast("抽奖次数不足，亲友圈消耗元宝可以增加抽奖次数哦");
                    return;
                }
                sender.setTouchEnabled(false);
                self.getQingMingLottery(2);
            }
        }, this);

        var btn_getReward = this._back.getChildByName("btn_getReward");
        btn_getReward.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if(this._data.lotteryAward.length <= 0){
                    MjClient.showToast("没有可领取的奖励");
                    return;
                }
                self.getQingMingAwardRecv();
            }
        }, this);

        var btn_paihang = this._back.getChildByName("btn_paihang");
        btn_paihang.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                MjClient.Scene.addChild(new flyAKiteRankLayer());
            }
        }, this);

        var btn_rule = this._back.getChildByName("btn_rule");
        btn_rule.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                MjClient.Scene.addChild(new flyAKiteRuleLayer(self._data.costMoney));
            }
        }, this);

        self.showReward(false);
    },

    showReward:function (isAction) {//抽中奖品展示   isAction:是否有动画
        var self = this;
        var Text_Num = this._back.getChildByName("Text_Num");
        Text_Num.setString(this._data.leftLotteryAmount);
        var btn_once = this._back.getChildByName("btn_once");
        var btn_ten = this._back.getChildByName("btn_ten");

        if(isAction){
            for(var i = 0; i < this._data.award.length; i++){
                var item = this._back.getChildByName("item_"+i);
                var light = item.getChildByName("light");
                light.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.1*Math.floor(Math.random()*9+1)),
                    cc.callFunc(function () {
                        this.setVisible(true);
                    }.bind(light)),
                    cc.delayTime(0.1),
                    cc.callFunc(function () {
                        this.setVisible(false);
                    }.bind(light)),
                    cc.delayTime(0.1*Math.floor(Math.random()*9+1))
                )));
            }
            this._back.runAction(cc.sequence(cc.delayTime(2),
                cc.callFunc(function () {
                    btn_once.setTouchEnabled(true);
                    btn_ten.setTouchEnabled(true);
                    for(var i = 0; i < self._data.award.length; i++){
                        var item = self._back.getChildByName("item_"+i);
                        var light = item.getChildByName("light");
                        light.stopAllActions();
                        light.setVisible(false);
                    }
                    for(var i = 0; i < self._data.lotteryAward.length; i++){
                        for(var j = 0; j < self._data.award.length; j++){
                            var item = self._back.getChildByName("item_"+j);
                            var light = item.getChildByName("light");
                            if(self._data.lotteryAward[i].type == item.type && self._data.lotteryAward[i].amount == item.amount){
                                light.setVisible(true);
                                break;
                            }
                        }
                    }
                })
            ))
        }else {
            btn_once.setTouchEnabled(true);
            btn_ten.setTouchEnabled(true);
            for(var i = 0; i < this._data.lotteryAward.length; i++){
                for(var j = 0; j < this._data.award.length; j++){
                    var item = this._back.getChildByName("item_"+j);
                    var light = item.getChildByName("light");
                    if(this._data.lotteryAward[i].type == item.type && this._data.lotteryAward[i].amount == item.amount){
                        light.setVisible(true);
                        break;
                    }
                }
            }
        }
    },

    getQingMingInfo:function () {//页面数据
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.qingMingInfo",{},function(rtn){
            cc.log("wxd pkplayer.handler.qingMingInfo:"+JSON.stringify(rtn));
            MjClient.unblock();
            if(rtn.code == 0) {
                self._data = rtn.data;
                self.initUI();
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    },

    getQingMingLottery:function (data1) {//抽奖
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.qingMingLottery",{key:data1},function(rtn){
            cc.log("wxd pkplayer.handler.qingMingLottery:"+JSON.stringify(rtn));
            MjClient.unblock();
            if(rtn.code == 0) {
                self._data.lotteryAward = rtn.data;
                if(data1 == 1){
                    self._data.leftLotteryAmount = self._data.leftLotteryAmount -1;
                }else if(data1 == 2){
                    self._data.leftLotteryAmount = self._data.leftLotteryAmount -10;
                }
                var CheckBox = self._back.getChildByName("CheckBox_1");
                self.showReward(!CheckBox.isSelected());
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    },

    getQingMingAwardRecv:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.qingMingAwardRecv",{},function(rtn){
            cc.log("wxd pkplayer.handler.qingMingAwardRecv:"+JSON.stringify(rtn));
            MjClient.unblock();
            if(rtn.code == 0) {
                MjClient.showToast(rtn.message);
                self.getQingMingInfo();
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    },

    setCloseCallback:function(callback) {
        this._closeCallback = callback;
    },
});


var flyAKiteRankLayer = cc.Layer.extend({
    _data:null,
    _back:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("Active_flyAKiteRanking.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.8,0.8],[0.5,0.5],[0,0]);

        //关闭按钮
        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);


        //玩家自己的排名
        var Image_di = this._back.getChildByName("Image_di");
        this.AtlasLabel_1 = Image_di.getChildByName("AtlasLabel_1");
        this.AtlasLabel_1.ignoreContentAdaptWithSize(true);
        this.AtlasLabel_1.setVisible(false);

        this.img_rank = Image_di.getChildByName("img_rank");
        this.img_rank.setVisible(false);

        this.head = Image_di.getChildByName("head");
        this.head.setVisible(false);

        this.Text_name = Image_di.getChildByName("Text_name");
        this.Text_name.ignoreContentAdaptWithSize(true);
        this.Text_name.setVisible(false);

        this.Text_ID = Image_di.getChildByName("Text_ID");
        this.Text_ID.ignoreContentAdaptWithSize(true);
        this.Text_ID.setVisible(false);

        this.Text_num = Image_di.getChildByName("Text_num");
        this.Text_num.ignoreContentAdaptWithSize(true);
        this.Text_num.setVisible(false);

        this.Text_reward = Image_di.getChildByName("Text_reward");
        this.Text_reward.ignoreContentAdaptWithSize(true);
        this.Text_reward.setVisible(false);


        this.defaultItem = this._back.getChildByName("item");
        this.defaultItem.setVisible(false);

        this.ListView = this._back.getChildByName("ListView");

        this.getQingMingRankList();
        return true;
    },

    initUI:function () {
        //自己的排行信息
        if(this._data.mine.rank){
            if(this._data.mine.rank <= 3){
                this.img_rank.setVisible(true);
                this.AtlasLabel_1.setVisible(false);
                this.img_rank.loadTexture("active/active_flyAKite/rank_"+(this._data.mine.rank-1)+".png");
            }else {
                this.img_rank.setVisible(false);
                this.AtlasLabel_1.setVisible(true);
                this.AtlasLabel_1.setString(this._data.mine.rank);
            }
        }
        if(this._data.mine.headimgurl){
            this.head.setVisible(true);
            var url = this._data.mine.headimgurl;
            cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
            {
                if(!err&&texture && cc.sys.isObjectValid(this))
                {
                    var headSprite = new cc.Sprite(texture);
                    headSprite.setName("headSprite");
                    headSprite.setPosition(cc.p(this.width/2, this.height/2));
                    headSprite.setScaleX(this.width/headSprite.getContentSize().width);
                    headSprite.setScaleY(this.height/headSprite.getContentSize().height);
                    this.addChild(headSprite);
                }
            }.bind(this.head));
        }
        if(this._data.mine.nickname){
            this.Text_name.setVisible(true);
            this.Text_name.setString(unescape(this._data.mine.nickname));
        }
        if(this._data.mine.id){
            this.Text_ID.setVisible(true);
            this.Text_ID.setString(this._data.mine.id);
        }
        if(this._data.mine.kiteAmount){
            this.Text_num.setVisible(true);
            this.Text_num.setString(this._data.mine.kiteAmount);
        }
        if(this._data.mine.rank){
            this.Text_reward.setVisible(true);
            this.Text_reward.setString(this.getRewardDes(this._data.mine.rank));
        }

        for(var i = 0; i < this._data.rankList.length; i++){
            var item = this.defaultItem.clone();
            item.setVisible(true);
            this.ListView.pushBackCustomItem(item);

            var AtlasLabel = item.getChildByName("AtlasLabel");
            AtlasLabel.ignoreContentAdaptWithSize(true);
            var img_rank = item.getChildByName("img_rank");
            if(this._data.rankList[i].rank <= 3){
                img_rank.setVisible(true);
                AtlasLabel.setVisible(false);
                img_rank.loadTexture("active/active_flyAKite/rank_"+(this._data.rankList[i].rank-1)+".png");
            }else {
                img_rank.setVisible(false);
                AtlasLabel.setVisible(true);
                AtlasLabel.setString(this._data.rankList[i].rank);
            }

            var head = item.getChildByName("head");
            var url = this._data.rankList[i].headimgurl;
            cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
            {
                if(!err&&texture && cc.sys.isObjectValid(this))
                {
                    var headSprite = new cc.Sprite(texture);
                    headSprite.setName("headSprite");
                    headSprite.setPosition(cc.p(this.width/2, this.height/2));
                    headSprite.setScaleX(this.width/headSprite.getContentSize().width);
                    headSprite.setScaleY(this.height/headSprite.getContentSize().height);
                    this.addChild(headSprite);
                }
            }.bind(head));

            var Text_name = item.getChildByName("Text_name");
            //Text_name.ignoreContentAdaptWithSize(true);
            Text_name.setString(unescape(this._data.rankList[i].nickname));

            var Text_ID = item.getChildByName("Text_ID");
            Text_ID.ignoreContentAdaptWithSize(true);
            Text_ID.setString(this._data.rankList[i].id);

            var Text_num = item.getChildByName("Text_num");
            Text_num.ignoreContentAdaptWithSize(true);
            Text_num.setString(this._data.rankList[i].kiteAmount);

            var Text_reward = item.getChildByName("Text_reward");
            Text_reward.ignoreContentAdaptWithSize(true);
            Text_reward.setString(this.getRewardDes(this._data.rankList[i].rank));
        }
    },

    getQingMingRankList:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.qingMingRankList",{},function(rtn){
            cc.log("wxd pkplayer.handler.qingMingRankList:"+JSON.stringify(rtn));
            MjClient.unblock();
            if(rtn.code == 0) {
                self._data = rtn.data;
                self.initUI();
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    },

    getRewardDes:function (rank) {
        switch (rank){
            case 1:
                return "20000元人民币";
                break;
            case 2:
                return "iPhone XS Max 一部";
                break;
            case 3:
                return "5000元人民币";
                break;
            case 4:
                return "1000元人民币";
                break;
            case 5:
                return "500元人民币";
                break;
            case 6:
                return "200元人民币";
                break;
            case 7:
                return "200元人民币";
                break;
            case 8:
                return "200元人民币";
                break;
            case 9:
                return "200元人民币";
                break;
            case 10:
                return "200元人民币";
                break;
            default:
                return "";
                break;
        }
    }
});


var flyAKiteRuleLayer = cc.Layer.extend({
    _back:null,
    ctor: function (costMoney) {
        this._super();
        var UI = ccs.load("Active_flyAKiteRule.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.6,0.6],[0.5,0.5],[0,0]);

        //关闭按钮
        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        var Text_rule = this._back.getChildByName("Text_rule");
        var str = "1、活动期间，代理亲友圈每累计消耗"+costMoney+"元宝可在活动页面放飞一只风筝（数量可累计）；\n" +
            "2、放飞风筝获得礼券、元宝奖励通过邮件发送请注意领取；\n" +
            "3、风筝排行榜还有实物、现金奖励联系客服领取；\n" +
            "4、实物、现金奖励活动结束后1个工作日内联系客服审核，过期未联系客服视为主动弃奖；\n" +
            "5、客服核实获奖信息无误后2个工作日内发放奖励；\n" +
            "6、排行榜TOP10代理可获得奖励，每5分钟刷新一次排行榜（视网络情况会有延迟）;\n" +
            "7、免费场不参加本次活动，客服微信：";
        str += MjClient.systemConfig.dailiZixun;
        Text_rule.setString(str);

        return true;
    },
});