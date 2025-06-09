/**
 * @Author:      XiaoMaoGe
 * @Email:       lms_190865480@163.com
 * @QQ:       190865480
 * @DateTime:     2017-12-26 
 * @Description: 砸金蛋活动 原名：元旦活动 
 */

var NewYearLayer = cc.Layer.extend({
    _closeCallback:null,
    _getChance: null,
    _data:null,
    _lastChance: null,
    _prizeType: null,
    luckyPrize_number:null,
    luckyPrize_type:null,
    _selectNumber:null,
    ctor: function(initData) {
        this._super();
        
        var UI = ccs.load("NewYear_main.json");
        this.addChild(UI.node);
        MjClient.newYearLayer_ui = this;
        this._shareType = null;

        var self = this;
        this._initData = initData;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);
        
        //退出
        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (this._closeCallback)
                {
                    this._closeCallback();
                }
                self.removeFromParent(); 
            }
        }, this);
        this._node_rule = this._back.getChildByName("node_rule");
        this._node_prize = this._back.getChildByName("node_prize");

        function runLightEffectAction(lightNode) {
            var _Image_light_scale = lightNode.getScale();
            var a = cc.scaleTo(1, _Image_light_scale * 1.1);
            var a1 = cc.scaleTo(0.8, _Image_light_scale * 0.8);
            lightNode.runAction(cc.sequence(a, a1).repeatForever());
        }

        for (var i = 1; i <= 3; i++) {
            this["guang_" + i] = this._node_prize.getChildByName("guang_" + i);
            runLightEffectAction(this["guang_" + i]);
        }
       
        
        this._btn_list = this._back.getChildByName("btn_mylist");
        this._btn_list.addTouchEventListener(function(sender, Type) {
        switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.Scene.addChild(new NewYearListLayer(), 5);
                    break;
                default:
                    break;
            }
        }, this);
        this._work_list = this._node_rule.getChildByName("ListView_1");
        this._work_cell = this._node_rule.getChildByName("cell");
        this._work_cell.visible = false;
        
        this._shareType = null;
        UIEventBind(null, this._btn_list, "WX_SHARE_SUCCESS", function(data) {
            if (parseInt(data.errCode) == 0) {
                    if (self._shareType) {
                        this.runAction(cc.sequence(cc.DelayTime(0.3), cc.callFunc(function() {
                            self.reqTodayShare();
                        })));
                    }
                    
            }
            if (self._shareType != 1) {
                MjClient.wxShareImageToPYQ = false;
            }
            

        });
        if (this._initData) {
            
            this.initSelf();
        }else{
            this.reqNewYear();
        }
        
    },

    type_work:function(type){
        var self = this;
        switch(type) {
            case 1:
                // 登录
                break;
            case 2:
                //大赢家
                break;
            case 3://首充  商城
                var layer;
                if (MjClient.APP_TYPE.QXNTQP == MjClient.getAppType()) {
                    layer = new StoreTipDialog();
                    MjClient.Scene.addChild(layer);
                }else{
                    layer = enter_store();
                    MjClient.Scene.addChild(layer);
                }
                break;
            case 4: // 分享 首页
                this._shareType = 1;
                if (cc.sys.OS_WINDOWS == cc.sys.os) {
                    MjClient.wxShareImageToPYQ = true;
                    postEvent("WX_SHARE_SUCCESS", {
                        errCode: 0
                    });
                }

                var fileContent = MjClient.getShareImageFileToPYQ();
                MjClient.native.wxShareImageToPYQ(fileContent.file, fileContent.content);
                break;
            case 5:// 分享 活动图
                this._shareType = 2;
                if (cc.sys.OS_WINDOWS == cc.sys.os) {
                    MjClient.wxShareImageToPYQ = true;
                    postEvent("WX_SHARE_SUCCESS", {
                        errCode: 0
                    });
                }

                var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "newYear/participator_hongbao.jpg";
                MjClient.native.wxShareImageToPYQ(filePath);
                break;
            case 6://开房 对战
                postEvent("createRoom", {});
                this.removeFromParent();
                break;
            case 7:// 亲友圈场次
                MjClient.Scene.addChild(new FriendCard_main());
                this.removeFromParent();
                break;
        }
    },

     createItem_work:function(oneData,number)
    {
        var self = this;
        var copyNode = this._work_cell.clone();
        copyNode.visible = true;

        var Text_rule = copyNode.getChildByName("Text_rule");
        Text_rule.ignoreContentAdaptWithSize(true);
        Text_rule.setString("·"+oneData.title);

        var Text_1 = copyNode.getChildByName("Text_1");
        Text_1.ignoreContentAdaptWithSize(true);
        Text_1.setString(oneData.count + "/" + oneData.total);
        self["btn_rule_" + number] = copyNode.getChildByName("btn_rule");
        self["btn_rule_" + number].setTag(oneData.type);
        self["btn_rule_" + number].addTouchEventListener(function(sender,type){
            var tag = sender.getTag();
            if (type == 2) {
                this.type_work(tag);
            }
        },this);

        if (oneData.count >= oneData.total) {
            self["btn_rule_" + number].loadTextureNormal("newYear/btn_ok.png");
            self["btn_rule_" + number].setTouchEnabled(false);
        } else {
            self["btn_rule_" + number].loadTextureNormal("newYear/btn_go.png");
            self["btn_rule_" + number].setTouchEnabled(true);
        }
      

        return copyNode;
    },
    addItems_work:function()
    {
        var _emailList = this._initData.arr;
        this._work_list.removeAllItems();
        for(var i = 0;i < _emailList.length ;i++)
        {
            if(cc.sys.isObjectValid(this._work_cell)) {
                this._work_list.pushBackCustomItem(this.createItem_work(_emailList[i],i));
            }
        }
        this._work_list.setScrollBarOpacity(0);
    },

    initSelf: function() {
        if (!cc.sys.isObjectValid(this)) return;
        var self = this;
        self.setCanTouch();
        this._getChance = this._initData.getChance;
        this._lastChance = this._initData.lastChance;
        

        var _date =  this._node_rule.getChildByName("text_time");
        _date.ignoreContentAdaptWithSize(true);
        _date.setString(this._initData.startDate + "至" + this._initData.endDate);

        // text_desc
        var text_desc =  this._node_rule.getChildByName("text_desc");
        text_desc.setString("活动时间：\n当天完成任务，当日砸开金蛋有效，砸到元宝实时到账，现金红包请前往公众号("+ MjClient.systemConfig.gongzhonghao + ")领取");

        for (var i = 1; i <= 3; i++) {
            this["prize_" + i] = this._node_prize.getChildByName("prize_" + i);
            this["prize_" + i].setTag(i);
            this["prize_" + i].addTouchEventListener(function(sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        var selectNum = this.getTag();
                        self._selectNumber = selectNum;
                        if (self._lastChance) {
                            self.reqChoujiang();
                            // self.setNoTouch();
                        }else{
                            self.choujiangAct(true);
                        }

                        break;
                    default:
                        break;
                }
            });

        }
        this.refreshTable();
    },

    choujiangAct: function(noChance) {
        if (!cc.sys.isObjectValid(this)) return;
        var self = this;
        var number = self._selectNumber;
        var chuizi = this["prize_" + number].getChildByName("image_chuizi");
        chuizi.setVisible(true);
        var act_1 = cc.rotateBy(0.2, 40);
        var act_2 = cc.rotateBy(0.15, -75);
        if (noChance) {
            this.setNoTouch();
            chuizi.runAction(cc.sequence(act_1, act_2, cc.callFunc(function() {
                
                self["prize_" + number].loadTextureNormal("newYear/egg_2.png");
            }),cc.delayTime(0.15), cc.callFunc(function() {
                chuizi.setVisible(false);
            }),  cc.delayTime(0.2), cc.callFunc(function() {
                chuizi.setVisible(false);
                self["prize_" + number].loadTextureNormal("newYear/egg_3.png");
            }), cc.delayTime(0.35), cc.callFunc(function() {
                self["prize_" + number].loadTextureNormal("newYear/egg_4.png");
                MjClient.showToast("您当前没有抽奖机会");
                
            }), cc.delayTime(0.2), cc.callFunc(function() { 
                // self.reqNewYear();  没有抽奖机会 直接刷新桌面 不再 请求 后台 信息
                self.initSelf();
            })));
        } else {
            chuizi.runAction(cc.sequence(act_1, act_2, cc.callFunc(function() {
                self["prize_" + number].loadTextureNormal("newYear/egg_2.png");
            }), cc.delayTime(0.15), cc.callFunc(function() {
                chuizi.setVisible(false);
            }),  cc.delayTime(0.2), cc.callFunc(function() {
                chuizi.setVisible(false);
                self["prize_" + number].loadTextureNormal("newYear/egg_3.png");
            }),cc.delayTime(0.35), cc.callFunc(function() {
                self["prize_" + number].loadTextureNormal("newYear/egg_4.png");
                if (self._data[2].type == 1) {
                    self.setYuanbao(self["prize_" + number]);
                } else if (self._data[2].type == 2) {
                    self.setHongbao(self["prize_" + number]);
                } else if (self._data[2].type == 4) {
                    self.setLiQuan(self["prize_" + number]);
                }

            }), cc.delayTime(0.5), cc.callFunc(function() { // 打开其他的奖品
                for (var i = 1; i <= 3; i++) {
                    if (i != number) {
                        self["prize_" + i].loadTextureNormal("newYear/egg_4.png");
                        var number_1 = i - 1;
                        cc.log(" ===== number_1 ", number_1);
                        if (self._data[number_1].type == 1) {
                            self.setYuanbao(self["prize_" + i], self._data[number_1].amount, true);
                        } else if (self._data[number_1].type == 2) {
                            self.setHongbao(self["prize_" + i], self._data[number_1].amount, true);
                        } else if (self._data[number_1].type == 4) {
                            self.setLiQuan(self["prize_" + i], self._data[number_1].amount, true);
                        }
                    }
                }
            }), cc.delayTime(1.8), cc.callFunc(function() { // 进入获奖页面   NewYearBackLayer
                self.addChild(new NewYearBackLayer(self._data[2].type, self._data[2].amount, true), 200);
                self.reqNewYear();
            })));
        }

    },

    setHongbao:function(node,number,isTrue){
        var node_1 = node.getChildByName("image_1");
        var node_2 = node.getChildByName("image_2");
        if (number) {
            node_1.setVisible(true);
            var txt = node_1.getChildByName("Text");
            txt.setString(number +"");
        }else{
            node_2.setVisible(true);
        }
        if (isTrue) {
            node.setColor(cc.color(120,120,120));
        }

    },
    setYuanbao:function(node,number,isTrue){
        var node_1 = node.getChildByName("image_3");
        node_1.setVisible(true);
        if (number) {
            var txt = node.getChildByName("Text");
            txt.setVisible(true);
            txt.setString(number + "元宝");
        }
        if (isTrue) {
            node.setColor(cc.color(120,120,120));
        }
    },

    setLiQuan:function(node,number,isTrue){
        var node_1 = node.getChildByName("image_4");
        node_1.setVisible(true);
        if (number) {
            var txt = node.getChildByName("Text_1");
            txt.setVisible(true);
            txt.setString(number +"礼券");
        }
        if (isTrue) {
            node.setColor(cc.color(120,120,120));
        }

    },


    setNoTouch:function(){
        if (cc.sys.isObjectValid(this._btn_list))
            this._btn_list.setTouchEnabled(false);
        for (var i = 1; i <= 10; i++) {
            if (cc.sys.isObjectValid(this["prize_" + i])){
                this["prize_" + i].setTouchEnabled(false);
            }
            if (cc.sys.isObjectValid(this["btn_rule_" + i])) {
                this["btn_rule_" + i].setTouchEnabled(false);
            }        
        }
    },

    setCanTouch:function(){
        if (cc.sys.isObjectValid(this._btn_list))
            this._btn_list.setTouchEnabled(true);
        for (var i = 1; i <= 10; i++) {
            if (cc.sys.isObjectValid(this["prize_" + i])){
                this["prize_" + i].setTouchEnabled(true);
            }
            if (cc.sys.isObjectValid(this["btn_rule_" + i])) {
                this["btn_rule_" + i].setTouchEnabled(true);
            }        
        }
    },

    refreshTable: function() {
        if (!cc.sys.isObjectValid(this._back)) return;
        this.addItems_work();
        

        for (var i = 1; i <= 3; i++) {
            for (var j = 1; j <= 4; j++) {
                this["image_" +(10*i+ j)] = this["prize_" + i].getChildByName("image_" + j);
                if (this["image_" +(10*i+ j)]) {

                    this["image_" +(10*i+ j)].setVisible(false); 
                }
            }
            if (this["prize_" + i].getChildByName("image_chuizi")) {
                this["prize_" + i].getChildByName("image_chuizi").setVisible(false);
            }
            if (this["prize_" + i].getChildByName("image_chuizi")) {
                this["prize_" + i].getChildByName("image_chuizi").setRotation(0);
            }
            if (this["prize_" + i].getChildByName("Text")) {
                this["prize_" + i].getChildByName("Text").setVisible(false);
            }
            if (this["prize_" + i].getChildByName("Text_1")) {
                this["prize_" + i].getChildByName("Text_1").setVisible(false); 
            }            
            
            this["prize_" + i].loadTextureNormal("newYear/egg_1.png");
            this["prize_" + i].setColor(cc.color(255,255,255));
        }

    },
    reqChoujiang:function() {
        var self = this;
        // MjClient.block();
        this.setNoTouch();
        MjClient.gamenet.request("pkplayer.handler.lottery", {key:"EGG"},
            function(rtn) {
                if (rtn.code == 0) {
                    cc.log(" ===== newYearLottery WWWWWWWWW === " + JSON.stringify(rtn));
                   self._data = rtn.data;
                    self.choujiangAct();
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }
                }
                
                
                // MjClient.unblock();
            }
        );

       
    },

    reqNewYear: function() {
        var self = this;
        // MjClient.block();
        self.setNoTouch();

        MjClient.gamenet.request("pkplayer.handler.lotteryMsg", {key:"EGG"},
            function(rtn) {
                cc.log(" ===== lotteryMsg === " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                    cc.log(" ===== lotteryMsg 2222 === " + JSON.stringify(rtn.data));
                    self._initData = rtn.data;
                    self.initSelf();
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }
                }

                // MjClient.unblock();
            }
        );

        
    },

    reqShare: function() {
        var self = this;

        MjClient.gamenet.request("pkplayer.handler.lotteryCallback", {key:"EGG"},
            function(rtn) {
                if (rtn.code == 0) {
                    cc.log(" ===== yz_js_ly_NewYearLotteryCallback ===   " + JSON.stringify(rtn));
                    if (self._prizeType == 1) {
                        MjClient.showToast("元宝已发放到账户中");
                    } else if (self._prizeType == 2) {
                        MjClient.showToast("请去公众号领取");
                    } else if (self._prizeType == 4) {
                        MjClient.showToast("礼券已发放到账户中");
                    }
                    self.addChild(new NewYearBackLayer(self._data[2].type,self._data[2].amount,false), 200);
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
    reqTodayShare: function() {
        var self = this;
        MjClient.gamenet.request("pkplayer.handler.lotteryShare", {key: "EGG"},
            function(rtn) {
                if (rtn.code == 0) {
                    cc.log(" ===== lotteryShare ===   " + JSON.stringify(rtn));
                    self.reqNewYear();
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
    setCloseCallback:function(callback)
    {
        this._closeCallback = callback;
    }

});

/**
 * @Author:      XiaoMaoGe
 * @Email:       lms_190865480@163.com
 * @QQ:       190865480
 * @DateTime:     2017-12-26 
 * @Description: Description 
 */

var NewYearBackLayer = cc.Layer.extend({
    
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
                    var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "newYear/participator_hongbao.jpg";
                    MjClient.native.wxShareImageToPYQ(filePath);
                                       
                },
                _event: {
                    WX_SHARE_SUCCESS: function(data) {
                        MjClient.wxShareImageToPYQ = false;
                        if (parseInt(data.errCode) == 0) {
                            if (MjClient.NwYearBack_ui) {
                                MjClient.NwYearBack_ui.getShare();
                                // MjClient.showToast("分享成功"); 回调已经有飘提示了
                            }

                        }
                    }
                },
            },
        }
    },
    ctor: function(type, number,isbool) {
        this._super();
        var UI = ccs.load("NewYear_Back.json");
        BindUiAndLogic(UI.node,this.jsBind);
        this.addChild(UI.node);
        MjClient.NwYearBack_ui = this;
        MjClient.newYearLayer_ui.luckyPrize_number = number;
        MjClient.newYearLayer_ui.luckyPrize_type = type;
        var self = this;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);

        var _btn_share = _back.getChildByName("btn_share");
        var close = _back.getChildByName("close");
        this._luckyNode_1 = _back.getChildByName("lucky_1");
        this._luckyNode_1.setVisible(false);
        this._luckyNode_2 = _back.getChildByName("lucky_2");
        this._luckyNode_2.setVisible(false);
        this._luckyNode_3 = _back.getChildByName("lucky_3");
        this._luckyNode_3.setVisible(false);
        this._luckyNode_4 = _back.getChildByName("lucky_4");
        if (this._luckyNode_4) {
            this._luckyNode_4.setVisible(false);
        }
        
        for (var i = 2; i <= 4; i++) {
            for (var j = 1; j <= 3; j++) {
                if (this["_luckyNode_" + i]) {
                    this["Image_" + (10 * i + j)] = this["_luckyNode_" + i].getChildByName("Image_" + j);
                    if (this["Image_" + (10 * i + j)]) {
                        this["Image_" + (10 * i + j)].setVisible(false);
                    }
                }

            }
            if (this["_luckyNode_" + i]) {
                this["Text_1_" + i] = this["_luckyNode_" + i].getChildByName("Text_1");
                this["Text_1_" + i].setVisible(false);
            }
            
        }
        close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                MjClient.showMsg("取消分享会视为您放弃此次奖励哦 ！",
                    function() {
                        self.removeFromParent();
                    },
                    function() {}, "1");
            }
        }, this);
        

        var _img;
        var _txt;
        var _img_2;
        if (!isbool) {
            _block.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    self.removeFromParent();
                }
            }, this);
            _btn_share.setVisible(false);
            close.setVisible(false);
            
            if (type == 0) {
                this._luckyNode_1.setVisible(true);
                _btn_share.setVisible(false);
                close.setVisible(false);
                _block.setTouchEnabled(true);
                cc.log(" ---- _block ----------");
                _block.addTouchEventListener(function(sender, type) {
                    if (type == 2) {
                        self.removeFromParent();
                    }
                }, this);

            } else if (type == 1) {
                this._luckyNode_2.setVisible(true);
                _img = this._luckyNode_2.getChildByName("Image_1");
                _img.setVisible(true);
                _txt = this._luckyNode_2.getChildByName("Text_1");
                _txt.setVisible(true);
                _txt.ignoreContentAdaptWithSize(true);
                if (number >= 100) {
                    _txt.setFontSize(35);
                    _txt.setScaleY(2.5);
                }
                _txt.setString("" + number);
            } else if (type == 2) {
                this._luckyNode_3.setVisible(true);
                _img = this._luckyNode_3.getChildByName("Image_1");
                _img.setVisible(true);
                _txt = this._luckyNode_3.getChildByName("Text_1");
                _txt.setVisible(true);
                _txt.ignoreContentAdaptWithSize(true);
                _txt.setString("" + number + "");
            } else if (type == 4) {
                this._luckyNode_4.setVisible(true);
                _img = this._luckyNode_4.getChildByName("Image_1");
                _img.setVisible(true);
                _txt = this._luckyNode_4.getChildByName("Text_1");
                _txt.setVisible(true);
                _txt.ignoreContentAdaptWithSize(true);
                _txt.setString("" + number + "");
            }

        } else {
            if (type == 1) {
                this._luckyNode_2.setVisible(true);
                _img = this._luckyNode_2.getChildByName("Image_3");
                _img_2 = this._luckyNode_2.getChildByName("Image_2");
                _img.setVisible(true);
                _img_2.setVisible(true);
            } else if (type == 2) {
                this._luckyNode_3.setVisible(true);
                _img = this._luckyNode_3.getChildByName("Image_3");
                _img_2 = this._luckyNode_3.getChildByName("Image_2");
                _img.setVisible(true);
                _img_2.setVisible(true);
            } else if (type == 4) {
                this._luckyNode_4.setVisible(true);
                _img = this._luckyNode_4.getChildByName("Image_3");
                _img_2 = this._luckyNode_4.getChildByName("Image_2");
                _img.setVisible(true);
                _img_2.setVisible(true);
            }

        }
        
        // var _btn_share = _back.getChildByName("btn_share");
        // _btn_share.addTouchEventListener(function(sender, type) {
        //     if (type == 2) {
        //         postEvent("capture_screen");
        //         MjClient.native.wxShareImage();
        //         this.reqShare();
        //     }
        // }, this);
    },
    getShare:function(){
        cc.log(" ============newYearLayer_ui  newYearLayer_ui");
        this.removeFromParent();
        MjClient.newYearLayer_ui.reqShare();
    }
    

});

/**
 * @Author:      XiaoMaoGe
 * @Email:       lms_190865480@163.com
 * @QQ:       190865480
 * @DateTime:     2017-12-26 
 * @Description: 我的中奖列表
 */

var NewYearListLayer = cc.Layer.extend({

    ctor: function() {
        this._super();
        var UI = ccs.load("Luckly_Rank.json");
        this.addChild(UI.node);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [0.9, 0.9], [0.5, 0.5], [0, 0]);

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                self.removeFromParent();
            }
        }, this);

        this._cell = _back.getChildByName("cell_prize");
        this._cell.visible = false;

        this._listDataCount = 0;
        this._ListView = _back.getChildByName("ListView_Prize");
        var _listViewState = 0;
        this._ListView.addCCSEventListener(function(sender, type) {
            switch (type) {
                case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                    if (_listViewState == 0) {
                        _listViewState = 1;
                    }
                    break;
                case ccui.ScrollView.EVENT_AUTOSCROLL_ENDED:
                    if (_listViewState == 1) {
                        self.reqprize(self._listDataCount, 15);
                    }
                    _listViewState = 0;
                    break;
            }
        });

        this._nullTip_text = _back.getChildByName("nullTip_text");
        this._nullTip_image = _back.getChildByName("nullTip_image");
        if (this._nullTip_text) {
            this._nullTip_text.visible = false;
            this._nullTip_image.visible = false;
        }

        var text_desc = _back.getChildByName("Text_2");
        text_desc.ignoreContentAdaptWithSize(true);
        var str_1 = "温馨提示：现金红包请前往公众号领取，元宝实时到账。";
        text_desc.setString(str_1);
        this._text_desc = text_desc;

        this._text_1 = _back.getChildByName("Text_3");
        this._text_2 = _back.getChildByName("Text_3_0");
        this._text_3 = _back.getChildByName("Text_3_1");
        this._text_4 = _back.getChildByName("img_line_0");

        this.reqprize(0, 15);

    },
    createItem: function(oneData) {
        if (!cc.sys.isObjectValid(this._cell)) return;
        var copyNode = this._cell.clone();
        copyNode.visible = true;

        var _time = copyNode.getChildByName("Text_time");
        var _tai = copyNode.getChildByName("Text_tai");
        var _content = copyNode.getChildByName("Text_content");
        var _timeStr = MjClient.dateFormat(new Date(parseInt(oneData.createTime)), 'yyyy-MM-dd hh:mm:ss');
        _content.ignoreContentAdaptWithSize(true);
        _time.ignoreContentAdaptWithSize(true);
        _time.setString(_timeStr);
        if (oneData.type == 1) {
            _content.setString("元宝X" + oneData.amount);
        } else if (oneData.type == 2) {
            _content.setString(oneData.amount + "元现金");
        } else if (oneData.type == 4) {
            _content.setString(oneData.amount + "礼券");
        } else {
            _content.setString("谢谢参与");
        }
        _tai.setString(oneData.remark);
        this._lastId = oneData.id;
        return copyNode;
    },
    addItems: function(data) {
        var _emailList = data;
        this._listDataCount += _emailList.length;
        for (var i = 0; i < _emailList.length; i++) {
            this._ListView.pushBackCustomItem(this.createItem(_emailList[i]));
        }

        if (this._listDataCount == 0) {
            if (this._nullTip_text) {
                this._nullTip_text.visible = true;
                this._nullTip_image.visible = true;
                this._text_desc.setVisible(false);
            } else {
                MjClient.showToast("已显示所有记录");
            }

            for (i = 1; i < 5; i++) {
                if (this["_text_" +i]) {
                    this["_text_" +i].visible = false;
                }                
            }
        }else{
            for (i = 1; i < 5; i++) {
                if (this["_text_" +i]) {
                    this["_text_" +i].visible = true;
                }                
            }
        }
    },
    reqprize: function() {
        var self = this;
        var _lastId = this._lastId;
        MjClient.gamenet.request("pkplayer.handler.personLottery", {
                lastId: _lastId,
                key:"EGG"
            },
            function(rtn) {
                if (rtn.code == 0) {
                    self.addItems(rtn.data);
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }

                }
            }
        );

        
    }
});

