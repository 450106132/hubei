/**
 * Created by WuXiaoDong on 2018/11/28.
 */

var friendsPKNewLayer = cc.Layer.extend({
    _back:null,
    _nodeApply:null,
    _nodeActive:null,
    _imageJiayou:null,
    _ID:null,//盒子id
    _data:null,
    _heziData:null,//盒子数据
    _closeCallback:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("Active_newFriendsPK.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;
        MjClient.friendsPKNewui = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.9, 0.9], [0.5, 0.5], [0, 0]);

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

        this._nodeApply = this._back.getChildByName("Node_apply");
        this._nodeApply.setVisible(false);
        this._nodeActive = this._back.getChildByName("Node_active");
        this._nodeActive.setVisible(false);

        this._imageJiayou = this._back.getChildByName("Image_jiayou");
        this._imageJiayou.setVisible(false);

        this.initData();

        return true;
    },

    initData:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.clubMoneyCostActivityInfo",{},function(rtn){
            cc.log("wxd pkplayer.handler.clubMoneyCostActivityInfo:"+JSON.stringify(rtn));
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
        var data = this._data;
        if(data.isSignUp){//已报名
            this._nodeApply.setVisible(false);
            this._nodeActive.setVisible(true);
            this.initActive(data);
            this._imageJiayou.setVisible(true);
            if(data.isRecv){//已领取
                this._imageJiayou.loadTexture("active_friendsPKNew/jy_2.png");
            }else {//未领取
                if(data.canRecv){//可领取
                    this._imageJiayou.loadTexture("active_friendsPKNew/jy_1.png");
                }else {//不可领取
                    this._imageJiayou.loadTexture("active_friendsPKNew/jy_0.png");
                }
            }
        }else {//未报名
            this._nodeApply.setVisible(true);
            this._nodeActive.setVisible(false);
            this.initApply(data);
            this._imageJiayou.setVisible(false);
        }

        var btnRule = this._back.getChildByName("btn_rule");
        btnRule.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                MjClient.Scene.addChild(new friendsPKNewRuleLayer(data));
            }
        }, this);
    },

    initApply:function () {//未报名
        var self = this;
        var data = this._data;

        //时间显示
        var textApplyTime = this._nodeApply.getChildByName("Text_applyTime");
        textApplyTime.ignoreContentAdaptWithSize(true);
        var textActiveTime = this._nodeApply.getChildByName("Text_activeTime");
        textActiveTime.ignoreContentAdaptWithSize(true);
        var applyTime = "报名时间："+ MjClient.dateFormat(new Date(parseInt(data.signStartTime)), 'MM月dd日hh:mm') +"-"+ MjClient.dateFormat(new Date(parseInt(data.signEndTime)), 'MM月dd日hh:mm');
        textApplyTime.setString(applyTime);
        var activeTime = "活动时间："+ MjClient.dateFormat(new Date(parseInt(data.activityStartTime)), 'MM月dd日hh:mm') +"-"+ MjClient.dateFormat(new Date(parseInt(data.activityEndTime)), 'MM月dd日hh:mm');
        textActiveTime.setString(activeTime);

        //列表
        var scrollView = this._nodeApply.getChildByName("ScrollView");
        var hezi = this._nodeApply.getChildByName("lihe");
        hezi.setVisible(false);
        var listData = data.giftBoxConfig;
        scrollView.setInnerContainerSize(cc.size(hezi.width*listData.length, 230));
        scrollView.setInnerContainerPosition(cc.p(scrollView.width - hezi.width*listData.length, 0));
        scrollView.setScrollBarEnabled(false);
        this._ID = listData.length-1;
        this._heziData = listData[this._ID];
        for(var i = 0; i< listData.length; i++){
            var item = hezi.clone();
            item.setName("item_"+i);
            item.setVisible(true);
            item.setPosition(cc.p(hezi.width*i, 0));
            scrollView.addChild(item);

            var bg = item.getChildByName("bg");

            var btnXuanze = item.getChildByName("btn_xuanze");

            var imageQipao = btnXuanze.getChildByName("Image_qipao");
            var textQipao = imageQipao.getChildByName("Text_qipao");
            textQipao.ignoreContentAdaptWithSize(true);
            var qipaoStr = "";
            qipaoStr += "消耗"+ listData[i].cost +"元宝"+"\n奖励"+listData[i].award.integral+"礼券";
            if(listData[i].award.goods){
                qipaoStr += "+\n"+listData[i].award.goods;
            }
            textQipao.setString(qipaoStr);

            var imageLihe = btnXuanze.getChildByName("Image_lihe");
            imageLihe.loadTexture("active_friendsPKNew/hezi_"+listData[i].id+".png");

            var textName = btnXuanze.getChildByName("Text_name");
            textName.ignoreContentAdaptWithSize(true);
            textName.setString(listData[i].text);

            if(this._ID == i){
                this._ID = listData[i].id;
                bg.setVisible(true);
                imageQipao.setVisible(true);
                imageLihe.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.3, 0, 2), cc.moveBy(0.6, 0, -4), cc.moveBy(0.3, 0, 2))));
                imageQipao.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.3, 0, 2), cc.moveBy(0.6, 0, -4), cc.moveBy(0.3, 0, 2))));
            }else {
                bg.setVisible(false);
                imageQipao.setVisible(false);
            }

            btnXuanze.id = listData[i].id;
            btnXuanze.addTouchEventListener(function (sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED) {
                    for(var j = 0; j< listData.length; j++){
                        var itemHezi = scrollView.getChildByName("item_"+j);
                        var btnXuanze = itemHezi.getChildByName("btn_xuanze");
                        var imageLihe = btnXuanze.getChildByName("Image_lihe");
                        var imageQipao = btnXuanze.getChildByName("Image_qipao");
                        var bg = itemHezi.getChildByName("bg");
                        if(sender.id == listData[j].id){
                            self._ID = listData[j].id;
                            self._heziData = listData[j];

                            bg.setVisible(true);
                            imageQipao.setVisible(true);
                            imageLihe.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.3, 0, 2), cc.moveBy(0.6, 0, -4), cc.moveBy(0.3, 0, 2))));
                            imageQipao.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.3, 0, 2), cc.moveBy(0.6, 0, -4), cc.moveBy(0.3, 0, 2))));
                        }else {
                            bg.setVisible(false);
                            imageQipao.setVisible(false);
                            imageLihe.stopAllActions();
                            imageQipao.stopAllActions();
                        }
                    }
                }
            }, this);
        }

        var btnApply = this._nodeApply.getChildByName("btn_apply");
        btnApply.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {

                MjClient.Scene.addChild(new friendsPKNewChoiceLayer(self._heziData));
            }
        }, this);
    },

    initActive:function () {//已报名
        var self = this;
        var data = this._data;

        //时间显示
        var textActiveTime = this._nodeActive.getChildByName("Text_activeTime_0");
        textActiveTime.ignoreContentAdaptWithSize(true);
        var textGetRewardTime = this._nodeActive.getChildByName("Text_getRewardTime");
        textGetRewardTime.ignoreContentAdaptWithSize(true);
        var activeTime = "活动时间："+ MjClient.dateFormat(new Date(parseInt(data.activityStartTime)), 'MM月dd日hh:mm') +"-"+ MjClient.dateFormat(new Date(parseInt(data.activityEndTime)), 'MM月dd日hh:mm');
        textActiveTime.setString(activeTime);
        var getRewardTime = "领奖时间："+ MjClient.dateFormat(new Date(parseInt(data.recvStartTime)), 'MM月dd日hh:mm') +"-"+ MjClient.dateFormat(new Date(parseInt(data.recvEndTime)), 'MM月dd日hh:mm');
        textGetRewardTime.setString(getRewardTime);

        //进度条
        var loadingBarBg1 = this._nodeActive.getChildByName("LoadingBarBg_1");
        var loadingBar = loadingBarBg1.getChildByName("LoadingBar");
        var percent = parseInt(data.costMoney/data.targetMoney*100);
        if(percent > 100){
            percent = 100;
        }
        loadingBar.setPercent(percent);
        var textPercent = loadingBarBg1.getChildByName("Text_percent");
        textPercent.ignoreContentAdaptWithSize(true);
        textPercent.setString(percent+"%");

        var imageBg = this._nodeActive.getChildByName("Image_bg");
        var textMubiao = imageBg.getChildByName("Text_mubiao");
        textMubiao.ignoreContentAdaptWithSize(true);
        textMubiao.setString("目标消耗元宝数："+data.targetMoney);
        var textYixiaohao = imageBg.getChildByName("Text_yixiaohao");
        textYixiaohao.ignoreContentAdaptWithSize(true);
        textYixiaohao.setString("已消耗元宝数："+data.costMoney);

        var lihe = this._nodeActive.getChildByName("lihe");
        var imageQipao = lihe.getChildByName("Image_qipao");
        imageQipao.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.3, 0, 2), cc.moveBy(0.6, 0, -4), cc.moveBy(0.3, 0, 2))));
        var textQipao = imageQipao.getChildByName("Text_qipao");
        textQipao.ignoreContentAdaptWithSize(true);
        var qipaoStr = "";
        qipaoStr += "消耗"+ data.mineGiftBoxConfig.cost +"元宝"+"\n奖励"+data.mineGiftBoxConfig.award.integral+"礼券";
        if(data.mineGiftBoxConfig.award.goods){
            qipaoStr += "+\n"+data.mineGiftBoxConfig.award.goods;
        }
        textQipao.setString(qipaoStr);
        var imageLihe = lihe.getChildByName("Image_lihe");
        imageLihe.loadTexture("active_friendsPKNew/hezi_"+data.mineGiftBoxConfig.id+".png");
        imageLihe.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.3, 0, 2), cc.moveBy(0.6, 0, -4), cc.moveBy(0.3, 0, 2))));
        var textName = lihe.getChildByName("Text_name");
        textName.ignoreContentAdaptWithSize(true);
        textName.setString(data.mineGiftBoxConfig.text);

        var btnGetReward = this._nodeActive.getChildByName("btn_getReward");
        btnGetReward.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.clubMoneyCostActivityRecv",{},function(rtn){
                    cc.log("wxd pkplayer.handler.clubMoneyCostActivityRecv:"+JSON.stringify(rtn));
                    MjClient.unblock();
                    if(rtn.code == 0) {
                        MjClient.showToast(rtn.message);
                        MjClient.Scene.addChild(new friendsPKNewSureTipLayer(rtn.data));
                        self.removeFromParent();
                    }else {
                        MjClient.showToast(rtn.message);
                    }
                });
            }
        }, this);
        if(data.isRecv){//已领取
            btnGetReward.loadTextureNormal("active_friendsPKNew/btn_yilingqu.png");
            btnGetReward.setTouchEnabled(false);
        }else {//未领取
            if(data.canRecv){//可领取
                btnGetReward.loadTextureNormal("active_friendsPKNew/btn_linqujiangli_liang.png");
            }else {//不可领取
                btnGetReward.loadTextureNormal("active_friendsPKNew/btn_linqujiangli.png");
                btnGetReward.setTouchEnabled(false);
            }
        }
    },

    setCloseCallback: function(callback) {
        this._closeCallback = callback;
    }
});


var friendsPKNewChoiceLayer = cc.Layer.extend({
    ctor: function (data) {
        this._super();
        var UI = ccs.load("Active_newFriendsPKChoice.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.6, 0.6], [0.5, 0.5], [0, 0]);

        //关闭按钮
        var close = this._back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        cc.log("wxd======================data"+JSON.stringify(data));
        var imageHezi = this._back.getChildByName("Image_hezi");
        imageHezi.loadTexture("active_friendsPKNew/hezi_"+data.id+".png");

        var name = this._back.getChildByName("name");
        var textName = name.getChildByName("Text_name");
        textName.ignoreContentAdaptWithSize(true);
        textName.setString("目标礼盒："+data.text);
        name.width = textName.width+10;

        var yuanbao = this._back.getChildByName("yuanbao")
        var textYuanbao = yuanbao.getChildByName("Text_yuanbao");
        textYuanbao.ignoreContentAdaptWithSize(true);
        textYuanbao.setString("消耗元宝："+data.cost+"元宝");
        yuanbao.width = textYuanbao.width+10;

        var liquan = this._back.getChildByName("liquan")
        var textLiquan = liquan.getChildByName("Text_liquan");
        textLiquan.ignoreContentAdaptWithSize(true);
        var liquanStr = "";
        liquanStr += "获得奖励："+data.award.integral+"礼券";
        if(data.award.goods){
            liquanStr += "+"+data.award.goods;
        }
        textLiquan.setString(liquanStr);
        liquan.width = textLiquan.width+10;

        var btnShareApply = this._back.getChildByName("btn_shareApply");
        btnShareApply.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if (cc.sys.OS_WINDOWS == cc.sys.os) {
                    MjClient.wxShareImageToPYQ = true;
                    postEvent("WX_SHARE_SUCCESS", {
                        errCode: 0
                    });
                }
                var filePath = jsb.fileUtils.getWritablePath() + "update/" + "res/active_friendsPKNew/participator_1.jpg";
                MjClient.native.wxShareImageToPYQ(filePath);
            }
        }, this);
        UIEventBind(null, btnShareApply, "WX_SHARE_SUCCESS", function(wxdata) {
            MjClient.wxShareImageToPYQ = false;
            if (parseInt(wxdata.errCode) == 0) {
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.clubMoneyCostActivitySignUp",{id:data.id},function(rtn){
                    cc.log("wxd pkplayer.handler.clubMoneyCostActivitySignUp:"+JSON.stringify(rtn))
                    MjClient.unblock();
                    if(rtn.code == 0) {
                        MjClient.showToast(rtn.message);
                        if(cc.sys.isObjectValid(MjClient.friendsPKNewui)){
                            MjClient.friendsPKNewui.initData();
                        }
                        self.removeFromParent();
                    }else {
                        MjClient.showToast(rtn.message);
                    }
                });
            }
        });

        //重选按钮
        var btnReelect = this._back.getChildByName("btn_reelect");
        btnReelect.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        return true;
    },
});

var friendsPKNewSureTipLayer = cc.Layer.extend({
    ctor: function (data) {
        this._super();
        var UI = ccs.load("Active_newFriendsPKTip.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.6, 0.6], [0.5, 0.5], [0, 0]);

        var textDesc = this._back.getChildByName("Text_desc");
        textDesc.ignoreContentAdaptWithSize(true);
        var str1 = "恭喜完成目标，得到"+data.mineGiftBoxConfig.award.integral+"礼券";
        var str2 = "";
        var str3 = "\n请到邮件中领取奖励。";
        var str4 = "\n领取实物奖励时请填写收货信息。";
        if(data.mineGiftBoxConfig.award.goods){
            str2 = "+"+data.mineGiftBoxConfig.award.goods;
            textDesc.setString(str1+str2+str3+str4);
        }else {
            textDesc.setString(str1+str3);
        }

        //关闭按钮
        var close = this._back.getChildByName("btn_close");
        close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
                if(data.mineGiftBoxConfig.award.goods){
                    MjClient.Scene.addChild(new friendsPKNew_distanceInfoLayer(data.id));
                }
            }
        }, this);

        return true;
    },
});

var friendsPKNewRuleLayer = cc.Layer.extend({
    ctor: function (data) {
        this._super();
        var UI = ccs.load("Active_newFriendsPKRule.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.9, 0.9], [0.5, 0.5], [0, 0]);



        // var richText = new ccui.RichText();
        // richText.width = textRule.width;
        // richText.ignoreContentAdaptWithSize(false);
        // richText.setVerticalSpace(1);
        // richText.setPosition(textRule.getPosition());
        //this._back.addChild(richText);

        var str1 = "活动需先报名后参加，报名时要选取一个目标礼盒，完成任务后可打开礼盒，领取奖励。\n点击礼盒可查看打开礼盒的条件和奖励。";
        var str2 = "报名时间："+ MjClient.dateFormat(new Date(parseInt(data.signStartTime)), 'MM月dd日hh:mm') +"-"+ MjClient.dateFormat(new Date(parseInt(data.signEndTime)), 'MM月dd日hh:mm')+
            "\n活动时间："+ MjClient.dateFormat(new Date(parseInt(data.activityStartTime)), 'MM月dd日hh:mm') +"-"+ MjClient.dateFormat(new Date(parseInt(data.activityEndTime)), 'MM月dd日hh:mm')+
            "\n领奖时间："+ MjClient.dateFormat(new Date(parseInt(data.recvStartTime)), 'MM月dd日hh:mm') +"-"+ MjClient.dateFormat(new Date(parseInt(data.recvEndTime)), 'MM月dd日hh:mm');
        var str3 = "活动期间完成任务可立即领取奖励。\n活动结束后额外展示三天供代理领奖，在此期间不计算数据。\n礼盒详情：";
        var str4 = "";
        for(var i = 0; i< data.giftBoxConfig.length; i++){
            var goodstr = "";
            if(data.giftBoxConfig[i].award.goods){
                goodstr = "+"+data.giftBoxConfig[i].award.goods;
            }
            if(i == 0){
                str4 += (data.giftBoxConfig[i].text+"  活动期间消耗"+data.giftBoxConfig[i].cost+"元宝可打开  获得"+data.giftBoxConfig[i].award.integral+"礼券"+goodstr)
            }else {
                str4 += ("\n"+data.giftBoxConfig[i].text+"  活动期间消耗"+data.giftBoxConfig[i].cost+"元宝可打开  获得"+data.giftBoxConfig[i].award.integral+"礼券"+goodstr)
            }
        }
        var str5 = "注意事项：\n1.活动统计报名代理的全部亲友圈所消耗的元宝。\n2.不报名的代理无法参加活动。\n3.奖励需自行领取，通过邮件发放，请及时领取。\n4.本次活动解释权归本公司所有，如有疑问请咨询"+MjClient.systemConfig.dailiZixun;

        var color1 = cc.color("#425E70");
        if(MjClient.APP_TYPE.QXXXGHZ == MjClient.getAppType()){
            color1 = cc.color("#D3A353");
        }
        var color2 = cc.color("#B9332A");

        var scrollView = this._back.getChildByName("ScrollView_1");

        var textRule1 = scrollView.getChildByName("Text_rule");
        textRule1.ignoreContentAdaptWithSize(true);
        textRule1.setTextColor(color1);
        textRule1.setString(str1);

        var textRule2 = textRule1.clone();
        textRule2.x = textRule1.x;
        textRule2.setTextColor(color2);
        textRule2.setString(str2);
        scrollView.addChild(textRule2);

        var textRule3 = textRule1.clone();
        textRule3.x = textRule1.x;
        textRule3.setTextColor(color1);
        textRule3.setString(str3);
        scrollView.addChild(textRule3);

        var textRule4 = textRule1.clone();
        textRule4.x = textRule1.x;
        textRule4.setTextColor(color2);
        textRule4.setString(str4);
        scrollView.addChild(textRule4);

        var textRule5 = textRule1.clone();
        textRule5.x = textRule1.x;
        textRule5.setTextColor(color1);
        textRule5.setString(str5);
        scrollView.addChild(textRule5);

        var scrollHeight = textRule1.height + textRule2.height + textRule3.height + textRule4.height + textRule5.height;
        scrollView.setInnerContainerSize(cc.size(920, scrollHeight));
        textRule1.y = scrollHeight;
        textRule2.y = scrollHeight - textRule1.height;
        textRule3.y = scrollHeight - textRule1.height - textRule2.height;
        textRule4.y = scrollHeight - textRule1.height - textRule2.height - textRule3.height;
        textRule5.y = scrollHeight - textRule1.height - textRule2.height - textRule3.height - textRule4.height;


        //关闭按钮
        var close = this._back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        return true;
    },
});

var friendsPKNewDistanceTipLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var UI = ccs.load("Active_newFriendsPKTip.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.6, 0.6], [0.5, 0.5], [0, 0]);

        var textDesc = this._back.getChildByName("Text_desc");
        textDesc.ignoreContentAdaptWithSize(true);
        textDesc.setString("实物奖励会在活动结束后统一发货，\n如有疑问请咨询客服"+MjClient.systemConfig.dailiZixun+",\n感谢您的参与！");

        //关闭按钮
        var close = this._back.getChildByName("btn_close");
        close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        return true;
    },
});

var friendsPKNew_distanceInfoLayer = cc.Layer.extend({

    ctor: function(id) {
        this._super();
        var UI = ccs.load("ShopOfJiFen_info_2.json");
        this.addChild(UI.node);
        var self = this;
        //var allData = MjClient.ShopOfJifen_mainUI._data;
        this._select = {};
        this._select.province = "";
        this._select.city = "";
        this._select.district = "";
        this._select.number = 1;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1.5, 1.5], [0.5, 0.5], [0, 0]);

        var closeBtn = _back.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                playEffect("ShopOfJiFen/click_btn", false);
                self.removeFromParent();
            }
        });

        this.bg_info = _back.getChildByName("bg_infolist");
        this.info_list = this.bg_info.getChildByName("info_list");
        this.info_list.height = 435;
        this.info_list.y += 13;
        this.info_cell = this.bg_info.getChildByName("info_cell");
        this.info_cell.setVisible(false);
        this.bg_info.visible = false;
        this.bg_info.setZOrder(1);

        var input_ren = _back.getChildByName("input_ren");
        this.input_ren = new cc.EditBox(cc.size(379, 42), new cc.Scale9Sprite("ShopOfJiFen/input_1.png"));
        this.input_ren.setFontColor(cc.color(0x40, 0x40, 0x40));
        this.input_ren.setMaxLength(20);
        this.input_ren.setFontSize(28);
        this.input_ren.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_ren.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        this.input_ren.setPlaceHolder("请输入收货人名字");
        this.input_ren.setPlaceholderFontSize(28);
        this.input_ren.setPosition(input_ren.getContentSize().width / 2, input_ren.getContentSize().height / 2);
        input_ren.addChild(this.input_ren);
        // if (allData.addressInfo && allData.addressInfo.realname) {
        //     this.input_ren.setString(allData.addressInfo.realname);
        // }


        var input_number = _back.getChildByName("input_number");
        this.input_number = new cc.EditBox(cc.size(379, 42), new cc.Scale9Sprite("ShopOfJiFen/input_1.png"));
        this.input_number.setFontColor(cc.color(0x40, 0x40, 0x40));
        this.input_number.setMaxLength(11);
        this.input_number.setFontSize(28);
        this.input_number.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_number.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this.input_number.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        this.input_number.setPlaceHolder("请输入收货人电话");
        this.input_number.setPlaceholderFontSize(28);
        this.input_number.setPosition(input_number.getContentSize().width / 2, input_number.getContentSize().height / 2);
        input_number.addChild(this.input_number);
        // if (allData.addressInfo && allData.addressInfo.mobileNum) {
        //     this.input_number.setString(allData.addressInfo.mobileNum);
        // }

        var input_dizhi = _back.getChildByName("input_dizhi");
        this.input_dizhi = new cc.EditBox(cc.size(379, 84), new cc.Scale9Sprite("ShopOfJiFen/input_2.png"));
        this.input_dizhi.setFontColor(cc.color(0x40, 0x40, 0x40));
        this.input_dizhi.setMaxLength(50);
        this.input_dizhi.setFontSize(28);
        this.input_dizhi.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_dizhi.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        this.input_dizhi.setPlaceHolder("如乡镇、街道、门牌号等");
        this.input_dizhi.setPlaceholderFontSize(28);
        this.input_dizhi.setPosition(input_dizhi.getContentSize().width / 2, input_dizhi.getContentSize().height / 2);
        input_dizhi.addChild(this.input_dizhi);
        // if (allData.addressInfo && allData.addressInfo.address) {
        //     var str = allData.addressInfo.address.split(",");
        //     this.input_dizhi.setString(str[1]);
        // }

        var input_dizhi_2 = _back.getChildByName("input_dizhi_2");
        input_dizhi_2.setTouchEnabled(true);
        input_dizhi_2.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.bg_info.visible = true;
                this.fresh_listView();
            }
        }, this);
        var icon_arrow = input_dizhi_2.getChildByName("img_arrow");
        icon_arrow.setZOrder(2);
        this.input_dizhi_2 = new cc.EditBox(cc.size(379, 42), new cc.Scale9Sprite("ShopOfJiFen/input_1.png"));
        this.input_dizhi_2.setFontColor(cc.color(0x40, 0x40, 0x40));
        this.input_dizhi_2.setMaxLength(50);
        this.input_dizhi_2.setFontSize(20);
        this.input_dizhi_2.setPlaceHolder("所在地区");
        this.input_dizhi_2.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_dizhi_2.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        // if (allData.addressInfo && allData.addressInfo.address) {
        //     var str = allData.addressInfo.address.split(",");
        //     this.input_dizhi_2.setString(str[0]);
        //
        // }

        // if (allData.addressInfo && allData.addressInfo.addressCode) {
        //     var _address = allData.addressInfo.addressCode.split(",");
        //     if (_address[0] || _address[0] === 0) {
        //         this._select.province = _address[0];
        //     }
        //     if (_address[1] || _address[1] === 0) {
        //         this._select.city = _address[1];
        //     }
        //     if (_address[2] || _address[2] === 0) {
        //         this._select.district = _address[2];
        //     }
        // }

        this.input_dizhi_2.setPlaceholderFontSize(28);
        this.input_dizhi_2.setPosition(input_dizhi_2.getContentSize().width / 2, input_dizhi_2.getContentSize().height / 2);
        input_dizhi_2.addChild(this.input_dizhi_2);
        this.input_dizhi_2.setTouchEnabled(false);
        this.input_dizhi_2.setSwallowTouches(false);

        var btn_yes = _back.getChildByName("btn_yes");

        btn_yes.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                playEffect("ShopOfJiFen/click_btn", false);
                var str_1 = this.input_number.getString();
                var str_2 = this.input_dizhi.getString();
                var str_3 = this.input_ren.getString();
                var str_4 = this.input_dizhi_2.getString();
                if (!str_1 || !str_2 || !str_3 || !str_4) {
                    MjClient.showToast("请填写完整的地址信息！");
                    return;
                }
                var province = this._select.province;
                var city = this._select.city;
                var district = this._select.district;
                if (this._select.province === "" || this._select.city === "" ||this._select.district === "") {
                    // cc.log(" ====== this._select.province  ",this._select.province == "",this._select.city== "",this._select.district== "")
                    MjClient.showToast("请填写完整所在地区地址！");
                    return;

                }


                var param = {};
                param.id = id;
                param.realname = this.input_ren.getString();
                param.mobileNum = this.input_number.getString();
                param.address = this.input_dizhi_2.getString() + "," + this.input_dizhi.getString();
                param.addressCode = province + "," + city + "," + district;
                var self = this;
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.clubMoneyCostActivityLogistics", param,
                    function(rtn) {
                        if (rtn.code == 0) {
                            MjClient.showToast("信息提交成功");
                            MjClient.Scene.addChild(new friendsPKNewDistanceTipLayer());
                        } else {
                            if (rtn.message) {
                                MjClient.showToast(rtn.message);
                            } else {
                                MjClient.showToast("获取数据失败,请重新打开");
                            }
                        }
                        //self.reqTableMsg();

                        MjClient.unblock();
                    }
                );
                this.removeFromParent();
            }
        }, this);

        this.btn_sheng = this.bg_info.getChildByName("btn_1");
        this.btn_sheng.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this._select.number = 1;
                this.addItems(this._select);
            }
        }, this);
        this.btn_shi = this.bg_info.getChildByName("btn_2");
        this.btn_shi.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this._select.number = 2;
                this.addItems(this._select);
            }
        }, this);

        this.btn_xian = this.bg_info.getChildByName("btn_3");

        this.btn_yes2 = this.bg_info.getChildByName("btn_yes2");
        this.btn_yes2.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var data = this._select;
                var area_1 = GameConfig_area.root.province[data.province];
                var str_1 = "";
                var str_2 = "";
                var str_3 = "";
                if (area_1 && area_1.name) {
                    str_1 = area_1.name;
                    if (area_1.city[data.city] && area_1.city[data.city].name) {
                        str_2 = area_1.city[data.city].name;
                        if (area_1.city[data.city].district[data.district] && area_1.city[data.city].district[data.district].name) {
                            str_3 = area_1.city[data.city].district[data.district].name;
                        }
                    }
                }
                var str = str_1 + str_2 +str_3;
                this.input_dizhi_2.setString(str);
                this.bg_info.visible = false;
            }
        }, this);

    },

    fresh_listView: function(number) {
        if (this._select.district || this._select.district === 0) {
            this._select.number = 3;
        }else if (this._select.city || this._select.city === 0) {
            this._select.number = 2;
        }else {
            this._select.number = 1;
        }
        this.addItems(this._select);
    },
    addItems: function(data) {
        var dataList = null;
        var i = 0;
        if (data.number == 1) {
            this.info_list.removeAllItems();
            this.select_district(data.number);
            this._select.city = "";
            this._select.district = "";
            dataList = GameConfig_area.root.province;
            for (i = 0; i < dataList.length; i++) {
                this.info_list.pushBackCustomItem(this.createItems(dataList[i], i, 1));
            }
        } else if (data.number == 2 && data.province >= 0) {
            var _area = GameConfig_area.root.province[data.province];
            if (!_area) {
                return;
            }
            this.select_district(data.number);
            this.info_list.removeAllItems();
            if (_area.name.length > 6) {
                var _name = _area.name.substring(0, 5);
                _name += "...";
                this.btn_sheng.setTitleText(_name);
            } else {
                this.btn_sheng.setTitleText(_area.name);
            }
            this._select.district = "";
            dataList = _area.city;
            for (i = 0; i < dataList.length; i++) {
                this.info_list.pushBackCustomItem(this.createItems(dataList[i], i, 2));
            }
        } else if (data.number == 3 && data.province >= 0 && data.city >= 0) {
            var area = GameConfig_area.root.province[data.province].city[data.city];
            if (!area) {
                return;
            }
            this.select_district(data.number);
            this.info_list.removeAllItems();
            var _area = GameConfig_area.root.province[data.province];
            if (_area.name.length > 6) {
                var _name = _area.name.substring(0, 5);
                _name += "...";
                this.btn_sheng.setTitleText(_name);
            } else {
                this.btn_sheng.setTitleText(_area.name);
            }
            if (area.name.length > 6) {
                var _name = area.name.substring(0, 5);
                _name += "...";
                this.btn_shi.setTitleText(_name);
            } else {
                this.btn_shi.setTitleText(area.name);
            }
            var area2 = _area.city[data.city].district[data.district];
            if (area2) {
                if (area2.name.length > 6) {
                    var _name2 = area2.name.substring(0, 5);
                    _name2 += "...";
                    this.btn_xian.setTitleText(_name2);
                } else {
                    this.btn_xian.setTitleText(area2.name);
                }
            }

            dataList = area.district;
            for (i = 0; i < dataList.length; i++) {
                this.info_list.pushBackCustomItem(this.createItems(dataList[i], i, 3));
            }
        } else if (data.number == 4) {
            this.select_district(data.number);
            var area_1 = GameConfig_area.root.province[data.province];
            var str = area_1.name + area_1.city[data.city].name + area_1.city[data.city].district[data.district].name;
            this.input_dizhi_2.setString(str);
            this.bg_info.visible = false;
            var area2 = area_1.city[data.city].district[data.district];
            if (area2.name.length > 6) {
                var _name2 = area2.name.substring(0, 5);
                _name2 += "...";
                this.btn_xian.setTitleText(_name2);
            } else {
                this.btn_xian.setTitleText(area2.name);
            }


        }


    },

    select_district: function(number) {
        this.btn_sheng.loadTextureNormal("ShopOfJiFen/btnCity_n.png");
        this.btn_shi.loadTextureNormal("ShopOfJiFen/btnCity_n.png");
        this.btn_xian.loadTextureNormal("ShopOfJiFen/btnCity_n.png");
        if (number == 1) {
            this.btn_sheng.loadTextureNormal("ShopOfJiFen/btnCity_s.png");
            this.btn_shi.setTitleText("请选择城市");
            this.btn_xian.setTitleText("请选择县/区");
        } else if (number == 2) {
            this.btn_shi.loadTextureNormal("ShopOfJiFen/btnCity_s.png");
            this.btn_xian.setTitleText("请选择县/区");
        } else if (number >= 3) {
            this.btn_xian.loadTextureNormal("ShopOfJiFen/btnCity_s.png");
        }
    },

    createItems: function(oneData, number, number_area) {
        var self = this;
        var copyNode = this.info_cell.clone();
        copyNode.visible = true;

        copyNode.setTouchEnabled(true);
        copyNode.setTag(number);

        copyNode.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var tag = sender.getTag();
                if (number_area == 1) {
                    this._select.province = tag;

                } else if (number_area == 2) {
                    this._select.city = tag;
                } else if (number_area == 3) {
                    this._select.district = tag;
                }
                this._select.number = number_area + 1;
                this.addItems(this._select);

            }
        }, this);
        var text = copyNode.getChildByName("Text_1");

        text.setString(oneData.name);

        return copyNode;
    },

});