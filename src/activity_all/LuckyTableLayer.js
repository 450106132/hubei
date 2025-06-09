/**
 * Created by lms.
 */

var luckyTableLayer = cc.Layer.extend({
    _getChance: null,
    _data:null,
    _lastChance: null,
    _lotteryList: null,
    _useChance: null,
    _number: null,
    _schedule: false,
    _prizeType: null,
    _closeCallback:null,
    luckyPrize_number:null,
    luckyPrize_type:null,
    luckyHead:null,
    luckyName:null,
    _shine_open:false,
    ctor: function(data) {
        this._super();
        
        var UI = ccs.load("Luckly_Table.json");
        this.addChild(UI.node);
        MjClient.luckyTableLayer_ui = this;

        var self = this;
        this._data = data;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);
        this._pointNode = this._back.getChildByName("nodePoint");
        this.bg_shine = this._pointNode.getChildByName("bg_shine");
        
        this.bg_shine2 = this._pointNode.getChildByName("bg_shine2");

        this.bg_shine.visible = true;
        this._act = cc.sequence(cc.callFunc(function(){
            self.bg_shine2.visible = true;
            self.bg_shine.visible = false;
        }),cc.DelayTime(0.8),(cc.callFunc(function(){
            self.bg_shine2.visible = false;
            self.bg_shine.visible = true;
        })),cc.DelayTime(0.8)).repeatForever();
        this.runAction(this._act);
        this._point = this._pointNode.getChildByName("point");
        this.btn_start = this._pointNode.getChildByName("btn_start");
        this.btn_start.loadTextureNormal("luckyTable/icon_bgpoint2.png");
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
        this._node_scroll = this._back.getChildByName("node_scroll");
        this._node_rule.setVisible(true);
        this._node_scroll.setVisible(true);



        this._node_scroll.setVisible(false);
        this.btn_rule = this._back.getChildByName("btn_rule");
        if (this.btn_rule) {
            this.btn_rule.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    this._node_rule.setVisible(true);
                    this._node_scroll.setVisible(false);
                    MjClient.native.umengEvent4CountWithProperty("Dazhuanpan_Huodguiz", {uid:SelfUid()});
                }
            }, this);
        }


        this.btn_prize = this._back.getChildByName("btn_prize");
        if (this.btn_prize) {
            this.btn_prize.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    this._node_rule.setVisible(false);
                    this._node_scroll.setVisible(true);
                    MjClient.native.umengEvent4CountWithProperty("Dazhuanpan_Huojiangxinxi", {uid:SelfUid()});
                }
            }, this);
        }
        

        this._btn_list = this._back.getChildByName("btn_mylist");
        this._btn_list.addTouchEventListener(function(sender, Type) {
        switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    self.addChild(new luckyListLayer(this._data), 500);
                    MjClient.native.umengEvent4CountWithProperty("Dazhuanpan_Lingqujilu", {uid:SelfUid()});
                    break;
                default:
                    break;
            }
        }, this);

        for (var i = 0; i <= 9; i++) {
            this["shine_" + i] = this._pointNode.getChildByName("node_shine").getChildByName("Image_" + i);
            this["shine_" + i].visible = false;
        }

        this._pointNode.schedule(function() {
            var dushu = self._point.getRotation() % 360;
            if (self._shine_open) {
                if (dushu >= 18 && dushu <= 54) {
                    self["shine_1"].setVisible(true);
                } else {
                    self["shine_1"].setVisible(false);
                }
                if (dushu >= 54 && dushu <= 90) {
                    self["shine_2"].setVisible(true);
                } else {
                    self["shine_2"].setVisible(false);
                }
                if (dushu >= 90 && dushu <= 126) {
                    self["shine_3"].setVisible(true);
                } else {
                    self["shine_3"].setVisible(false);
                }
                if (dushu >= 126 && dushu <= 162) {
                    self["shine_4"].setVisible(true);
                } else {
                    self["shine_4"].setVisible(false);
                }
                if (dushu >= 162 && dushu <= 198) {
                    self["shine_5"].setVisible(true);
                } else {
                    self["shine_5"].setVisible(false);
                }
                if (dushu >= 198 && dushu <= 234) {
                    self["shine_6"].setVisible(true);
                } else {
                    self["shine_6"].setVisible(false);
                }
                if (dushu >= 234 && dushu <= 270) {
                    self["shine_7"].setVisible(true);
                } else {
                    self["shine_7"].setVisible(false);
                }
                if (dushu >= 270 && dushu <= 306) {
                    self["shine_8"].setVisible(true);
                } else {
                    self["shine_8"].setVisible(false);
                }
                if (dushu >= 306 && dushu <= 342) {
                    self["shine_9"].setVisible(true);
                } else {
                    self["shine_9"].setVisible(false);
                }
                if ((dushu >= 342 && dushu < 360) || (dushu >= 0 && dushu <= 18)) {
                    self["shine_0"].setVisible(true);
                } else {
                    self["shine_0"].setVisible(false);
                }
            }

        }, 0.01);

        this._work_list = this._node_rule.getChildByName("ListView_1");
        this._work_cell = this._node_rule.getChildByName("cell");
        this._work_cell.visible = false;
        this._shareType = null;

        UIEventBind(null, this._work_list, "WX_SHARE_SUCCESS", function(data) {
            cc.log(" ====== data",JSON.stringify(data));
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
        if (data) {
            this.initSelf();
        }else{
            this.reqlucky();
        }
        
    },

    initSelf: function() {
        if (!cc.sys.isObjectValid(this.btn_start)) return;
        var self = this;
        self._getChance = self._data.getChance;
        self._lastChance = self._data.lastChance;
        self._lotteryList = self._data.lotteryList;
        self._useChance = self._data.useChance;
        self.luckyHead = self._data.headimgurl;
        self.luckyName = self._data.nickname;
        self.luckyImgList = self._data.awardList;
        self.setCanTouch();
        for (var i = 0; i < self.luckyImgList.length; i++) {
            this.init_prize(i,self.luckyImgList[i].image);
        }
        this.refreshTable();
        if (self._lastChance <= 0) {
            this.btn_start.loadTextureNormal("luckyTable/icon_bgpoint2.png");
        }
        else{
            this.btn_start.loadTextureNormal("luckyTable/icon_bgpoint.png");
        }
        this.btn_start.addTouchEventListener(function(sender, Type) {

            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    cc.log(" === _lastChance  btn_start",self._lastChance)
                    if (self._lastChance > 0) 
                        self.reqRun();
                    else
                        MjClient.showToast("抽奖机会已用完");

                    MjClient.native.umengEvent4CountWithProperty("Dazhuanpan_Kaishi", {uid:SelfUid()});
                    break;
                default:
                    break;
            }
        }, this);


        var _scroll = this._back.getChildByName("node_scroll").getChildByName("scroll");
        this._scroll = _scroll;

        var _txt = this._back.getChildByName("node_scroll").getChildByName("text_desc");
        var elements = this._lotteryList;
        var bar_high = 50;

        _scroll.setInnerContainerSize(cc.size(440, elements.length * bar_high));
        _scroll.setScrollBarOpacity(0);
        _scroll.setTouchEnabled(false);
        
        var pos_topY = _scroll.getContentSize().height - _scroll.getInnerContainerSize().height;
        var pos_BotY = 0;
        var number_bar = pos_topY / 50;
        var per = bar_high * 300 / -pos_topY; // 每条3500像素高度 * 每次滚几条 
        var pos_to = 0;
        _scroll.removeAllChildren();
        for (var i = 0; i < elements.length; i++) {
            // cc.log(" -----i === ", i, elements[i],elements[i]["nickname"],elements[i]["title"]);
            var _txt1 = _txt.clone();
            var _txt2 = ""
            if (i < elements.length - 1) {
                _txt2 += " " + this.setNewName(unescape(elements[i]["nickname"]), 6) + "：" + "获得" + (elements[i]["title"]) + "\n";
            } else {
                _txt2 += " " + this.setNewName(unescape(elements[i]["nickname"]), 6) + "：" + "获得" + (elements[i]["title"]) + "";
            }
            _txt1.setString(_txt2);
            _txt1.setFontSize(28);
            _txt1.setPosition(0, (elements.length - i -1) * bar_high - 10);
            _scroll.addChild(_txt1);
        }
        var bar_numbers = 7;
        if (!self._schedule) {
            if (elements.length > bar_numbers) {
                _scroll.schedule(function() {

                    self._schedule = true;
                    if (pos_to >= 98) {
                        pos_to = -per;
                        //_scroll.jumpToBottom();
                        _scroll.jumpToTop();
                    }
                    pos_to = pos_to + per;
                    _scroll.scrollToPercentVertical(pos_to  , 1, 0.8) // pos_to 位置稍微上调一点
                }, 3);
            }  
        } 


        

    },

    init_prize: function(number,vecImageUrl) {
        /*
         图片节点
         */
        cc.log("vecImageUrl ============== " + JSON.stringify(vecImageUrl));

        var imageUrl = vecImageUrl;
        var rot = this["shine_" + number].getRotationX();
        var pos = this["shine_" + number].getPosition();
        var node_shine = this._pointNode.getChildByName("node_shine");
        var self = this;
        cc.loader.loadImg(imageUrl,   {
            isCrossOrigin :  true
        },  function(err, img) {
            if (err) {
                cc.log(err);
            }
            else if (img && sys.isObjectValid(self) && sys.isObjectValid(self._pointNode) && sys.isObjectValid(node_shine))
            {
                var sprite_bg = new cc.Sprite("luckyTable/icon_guang.png");
                sprite_bg.setPosition(pos);
                sprite_bg.setRotation(36*number);
                sprite_bg.setTexture(img);
                node_shine.addChild(sprite_bg);
            }
        });
        
    },

    setNoTouch:function(){
        for (var i = 0; i <= 10; i++) {
            if (cc.sys.isObjectValid(this["btn_rule_" + i]))
                this["btn_rule_" + i].setTouchEnabled(false);
        }
        if (cc.sys.isObjectValid(this._btn_list))
            this._btn_list.setTouchEnabled(false);
    },

    setCanTouch:function(){
        for (var i = 0; i <= 10; i++) {
            if (cc.sys.isObjectValid(this["btn_rule_" + i]))
                this["btn_rule_" + i].setTouchEnabled(true);
        }
        if (cc.sys.isObjectValid(this._btn_list))
            this._btn_list.setTouchEnabled(true);
    },

    setNewName:function (name,length) {
        var _newName = name;
        var strlen = name.length;
        if(cc.isUndefined(length) || length == null)
        {
            length = 4;//默认名字限制6个字符
        }
        if(length < 4)
        {
            length  = 4;
        }
        if(strlen >= length)
        {
            _newName =  name.substring(0,length - 1);
            _newName += "...";
        }
        return _newName;
    },
    type_work:function(type){
        switch(type) {
            case 1:
                // 登录
                break;
            case 2:
                //大赢家
                break;
            case 3://首充  商城

                if (MjClient.APP_TYPE.QXNTQP == MjClient.getAppType()) {
                    var layer = new StoreTipDialog();
                    MjClient.Scene.addChild(layer);
                }else{
                    var layer = enter_store();
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

                var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "luckyTable/participator_hongbao.jpg";
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
        self["btn_rule_" + number].position = number+1;
        self["btn_rule_" + number].addTouchEventListener(function(sender,type){
            var tag = sender.getTag();
            if (type == 2) {
                this.type_work(tag);
                if (1 == sender.position){
                    MjClient.native.umengEvent4CountWithProperty("Dazhuanpan_Qianwangyilingqu", {uid:SelfUid()});
                }else if (2 == sender.position){
                    MjClient.native.umengEvent4CountWithProperty("Dazhuanpan_Qianwangerlingqu", {uid:SelfUid()});
                }else if (3 == sender.position){
                    MjClient.native.umengEvent4CountWithProperty("Dazhuanpan_Qianwangsanlingqu", {uid:SelfUid()});
                }
            }
        },this);

        if (oneData.count >= oneData.total) {
            self["btn_rule_" + number].loadTextureNormal("luckyTable/btn_ok.png");
            self["btn_rule_" + number].setTouchEnabled(false);
        } else {
            self["btn_rule_" + number].loadTextureNormal("luckyTable/btn_go.png");
            self["btn_rule_" + number].setTouchEnabled(true);
        }
      

        return copyNode;
    },
    addItems_work:function()
    {
        var _emailList = this._data.arr;
        this._work_list.removeAllItems();
        for(var i = 0;i < _emailList.length ;i++)
        {
            cc.log(" ======this._data.arr ",i);
            if(cc.sys.isObjectValid(this._work_cell)) {
                this._work_list.pushBackCustomItem(this.createItem_work(_emailList[i],i));
            }
        }
        this._work_list.setScrollBarOpacity(0);
    },

    refreshTable: function() {
        if (!cc.sys.isObjectValid(this._back)) return;

        var _text_1 = this._node_rule.getChildByName("text_rule");
        _text_1.ignoreContentAdaptWithSize(true);
        _text_1.setString("完成每项任务可转一次 每人每日最多可转" + this._data.arr.length+ "次");
        var text_start = this._pointNode.getChildByName("Text_number");
        text_start.setString("还剩" + this._lastChance + "次机会");
        var text_tishi = this._back.getChildByName("text_tishi");
        text_tishi.setString("领取红包请前往公众号(" + MjClient.systemConfig.gongzhonghao + ")实物奖加微信(" + this._data.weixin + ")");

        this.addItems_work();
        
        



    },
    reqRun: function() {
        var self = this;
        // MjClient.block();
        self.btn_start.setTouchEnabled(false);
        self.setNoTouch();
        self._shine_open = true;
        self._point.setRotation(0);
        MjClient.gamenet.request("pkplayer.handler.lottery", {key: "TURN"},
            function(rtn) {
                if (rtn.code == 0) {
                    cc.log(" =========== haian lottery "+ JSON.stringify(rtn));
                    self._number = rtn.data.num ;
                    _title = rtn.data.title ;
                    var sum = 3 * 360 + self._number * 36;
                    self._prizeType = rtn.data.type;
                    var _rotation = cc.rotateBy(3.5, sum); //.easing(cc.easeExponentialInOut());
                    if (MjClient.luckyTableLayer_ui) {
                        self.stopAllActions();
                    }
                    self._point.runAction(cc.sequence(cc.spawn(_rotation,cc.sequence(cc.DelayTime(0.25),cc.callFunc(function() {
                        var act = cc.sequence(cc.callFunc(function(){
                            self.bg_shine2.visible = true;
                            self.bg_shine.visible = false;
                        }),cc.DelayTime(0.15),(cc.callFunc(function(){
                            self.bg_shine2.visible = false;
                            self.bg_shine.visible = true;
                        })),cc.DelayTime(0.15)).repeatForever();                       
                        self.runAction(act);
                    }))), cc.DelayTime(0.3), cc.callFunc(function() {
                        self._shine_open = false;
                        self.shine_action();
                    }), cc.DelayTime(0.2), cc.callFunc(function() {
                        self.addChild(new luckyBackLayer(self._prizeType, rtn.data.amount), 400);
                        // self._point.setRotation(0);
                        self.refreshTable();
                        self.refreshAct();
                        
                    })));


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

    reqlucky: function() {
        var self = this;
        // MjClient.block();
        self.setNoTouch();
        MjClient.gamenet.request("pkplayer.handler.lotteryMsg", {key: "TURN"},
            function(rtn) {
                cc.log(" ===== haianLotteryMsg === " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                    cc.log(" ===== haianLotteryMsg 2222 === " + JSON.stringify(rtn.data));
                    self._data = rtn.data;
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
        MjClient.gamenet.request("pkplayer.handler.lotteryCallback", {key: "TURN"},
            function(rtn) {
                if (rtn.code == 0) {
                    cc.log(" ===== haianLotteryCallback ===   " + JSON.stringify(rtn));
                    if (self._prizeType == 1) {
                        MjClient.showToast("元宝已发放到账户中");
                    } else if (self._prizeType == 2) {
                        MjClient.showToast("请去公众号领取");
                    }

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
    shine_action:function(){
        var self = this;
        var dushu = self._point.getRotation() % 360;
        var _shine = null;
        if (dushu >= 18 && dushu <= 54) {
            _shine = self["shine_1"];
        } 
        if (dushu >= 54 && dushu <= 90) {
            _shine = self["shine_2"];
        }
        if (dushu >= 90 && dushu <= 126) {
            _shine = self["shine_3"];
        }
        if (dushu >= 126 && dushu <= 162) {
            _shine = self["shine_4"];
        }
        if (dushu >= 162 && dushu <= 198) {
            _shine = self["shine_5"];
        }
        if (dushu >= 198 && dushu <= 234) {
            _shine = self["shine_6"];
        }
        if (dushu >= 234 && dushu <= 270) {
            _shine = self["shine_7"];
        }
        if (dushu >= 270 && dushu <= 306) {
            _shine = self["shine_8"];
        } 
        if (dushu >= 306 && dushu <= 342) {
            _shine = self["shine_9"];
        }
        if ((dushu >= 342 && dushu < 360) || (dushu >= 0 && dushu <= 18)) {
            _shine = self["shine_0"];
        } 
        _shine.runAction(cc.sequence(cc.blink(1.5,6),cc.callFunc(function(){
            _shine.visible = false;
        })));
    },
    refreshAct: function() {
        if (!cc.sys.isObjectValid(this.btn_start)) return;
        var self = this;
        self.btn_start.setTouchEnabled(true);
        self.setCanTouch();
        self.stopAllActions(); 
        var _act = cc.sequence(cc.callFunc(function() {
            self.bg_shine2.visible = true;
            self.bg_shine.visible = false;
        }), cc.DelayTime(0.8), (cc.callFunc(function() {
            self.bg_shine2.visible = false;
            self.bg_shine.visible = true;
        })), cc.DelayTime(0.8)).repeatForever();

        self.runAction(_act);
        self.reqlucky();
        
    },
    reqTodayShare: function() {
        var self = this;
        MjClient.gamenet.request("pkplayer.handler.lotteryShare", {key: "TURN"},
            function(rtn) {
                if (rtn.code == 0) {
                    cc.log(" ===== lotteryShare ===   " + JSON.stringify(rtn));
                    self.reqlucky();
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

var luckyBackLayer = cc.Layer.extend({
    
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
                    var filePath;
                    if (MjClient.luckyTableLayer_ui.luckyPrize_type == 1) {
                        filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "luckyTable/participator_yuanbao.jpg";
                    }else if (MjClient.luckyTableLayer_ui.luckyPrize_type == 2) {
                        filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "luckyTable/participator_hongbao.jpg";
                    }else if (MjClient.luckyTableLayer_ui.luckyPrize_type == 4) {
                        filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "luckyTable/participator_liquan.jpg";   
                    }
                    MjClient.native.wxShareImageToPYQ(filePath);
                                       
                },
                _event: {
                    captureScreen_OK: function() {
                        MjClient.native.wxShareCaptureScreenToPYQ();
                    },
                    WX_SHARE_SUCCESS: function(data) {
                        MjClient.wxShareImageToPYQ = false;
                        if (parseInt(data.errCode) == 0) {
                            if (MjClient.Luckly_ui) {
                                MjClient.Luckly_ui.getShare();
                                // MjClient.showToast("分享成功"); 回调已经有飘提示了
                            }

                        }
                    }
                },
            },
        }
    },
    ctor: function(type, number) {
        this._super();
        MjClient.luckyTableLayer_ui.luckyPrize_number = number;
        MjClient.luckyTableLayer_ui.luckyPrize_type = type;
        var UI = ccs.load("Luckly_Back.json");
        BindUiAndLogic(UI.node,this.jsBind);
        this.addChild(UI.node);
        MjClient.Luckly_ui = this;
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
        var _txt2 = this._luckyNode_3.getChildByName("Text_2");
        if (_txt2 && MjClient.luckyTableLayer_ui) {
            _txt2.ignoreContentAdaptWithSize(true);
            _txt2.setString("分享成功后，关注公众号(" + MjClient.systemConfig.gongzhonghao + ")领取");
        }
        this._luckyNode_4 = _back.getChildByName("lucky_4");
        if (this._luckyNode_4) {
            this._luckyNode_4.setVisible(false);
            var _txt1 = this._luckyNode_4.getChildByName("Text_1");
            _txt1.ignoreContentAdaptWithSize(true);
            _txt1.setString(" 恭喜您获得" + number + "礼券，分享成功后，自动到账 ");
        }
        

            

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
            var _txt = this._luckyNode_2.getChildByName("Text_1");
            _txt.setString("" + number);
        } else if (type == 2) {
            this._luckyNode_3.setVisible(true);
            var _txt = this._luckyNode_3.getChildByName("Text_1");
            _txt.setString("" + number + "");
        }else if (type == 4) {
            this._luckyNode_4.setVisible(true);
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
        this.removeFromParent();
        MjClient.luckyTableLayer_ui.reqShare();
    }
    

});


var luckyListLayer = cc.Layer.extend({

    ctor: function(data) {
        this._super();
        var UI = ccs.load("Luckly_Rank.json");
        this.addChild(UI.node);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [0.676, 0.788], [0.5, 0.5], [0, 0]);

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

        var text_desc = _back.getChildByName("Text_2");
        text_desc.ignoreContentAdaptWithSize(true);
        var str_1 = "温馨提示：现金红包请前往公众号（"+ MjClient.systemConfig.gongzhonghao +"）领取。";
        text_desc.setString(str_1);       
        this._text_desc = text_desc;

        this._nullTip_text = _back.getChildByName("nullTip_text");
        this._nullTip_image = _back.getChildByName("nullTip_image");
        if (this._nullTip_text) {
            this._nullTip_text.visible = false;
            this._nullTip_image.visible = false;
        }

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
        _tai.ignoreContentAdaptWithSize(true);
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
        }
    },
    reqprize: function() {
        var self = this;
        var _lastId = this._lastId;
        MjClient.gamenet.request("pkplayer.handler.personLottery", {
                lastId: _lastId,
                key: "TURN"
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

