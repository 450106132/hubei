/**
 * @Author:      XiaoMaoGe
 * @Email:       lms_190865480@163.com
 * @QQ:       190865480
 * @DateTime:     2017-12-18 
 * @Description: 圣诞节活动  Merry Christmas  christmas
 */


var MerryChristmasLayer = cc.Layer.extend({
    _getChance: null,
    _data:null,
    _lastChance: null,
    _selectNum :null,
    _prizeType:null,
    _prizeData:null,
    _closeCallback:null,
    ctor: function() {
        this._super();

        var UI = ccs.load("Christmas_main.json");
        this.addChild(UI.node);
        MjClient.Christmas_ui = this;

        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);

        this._node_rule = this._back.getChildByName("node_rule");

        // this.btn_1 = this._node_rule.getChildByName("btn_1");
        // this.btn_2 = this._node_rule.getChildByName("btn_2");

        this._node_prize = this._back.getChildByName("node_prize");

        

        this._btn_list = this._back.getChildByName("btn_mylist");
        this._btn_list.addTouchEventListener(function(sender, Type) {
        switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    self.addChild(new ChristmasListLayer(), 500);
                    break;
                default:
                    break;
            }
        }, this);

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

       this.reqChristmas();
    },

    initSelf: function() {
        var self = this;
        for (var i = 1; i <= 6; i++) {
            this["prize_" + i] = this._node_prize.getChildByName("prize_" + i);
            this["prize_" + i].setTag(i);
            this["prize_" + i].addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    var select = this.getTag();
                    self._selectNum = select;
                    cc.log(" ======== prize_prize_prize_ ",select);
                    if (self._lastChance > 0) {
                        self.reqChouJiang(); 
                        self.setNoTouch();
                    }else if (self._getChance.win6 >= 6) {
                        MjClient.showToast("今日抽奖机会已用完");
                    }else{
                        MjClient.showToast("你还没有完成每日任务");
                    }
                                     
                }
            });
        }
        

        for (var i = 1; i <= 2; i++) {
            this["btn_" + i] = this._node_rule.getChildByName("btn_" + i);
            this["btn_" + i].addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    postEvent("createRoom", {});
                    this.removeFromParent();
                }
            }, this);
        }

       this.refreshData();

    },

    fanpaiAct:function(){
        var number = this._selectNum;
        cc.log(" ======== _selectNum ",number);
        // var _act = cc.scaleTo(0.8,-1,1)
        var _act = cc.rotateBy(0.5,0,180)
        var self = this;
        if (!cc.sys.isObjectValid(this["prize_" + number])) return;
        this["prize_" + number].runAction(cc.sequence(_act, cc.callFunc(function() {
            if (self._prizeData[5].type == 1) {
                self.setYuanbao(self["prize_" + number], self._prizeData[5].amount);
            } else if (self._prizeData[5].type == 2) {
                self.setHongbao(self["prize_" + number], self._prizeData[5].amount);
            }else{
                    self.setThanks(self["prize_" + number]);
            }
        })));




        var j = 0;
        for (var i = 1; i <= 6; i++) {
            var time = (j + 1) * 0.5;
            if (i != number) {
                var func = function(d, i) {
                    self["prize_" + i].runAction(cc.sequence(cc.DelayTime(time), _act, cc.callFunc(function() {
                        var number_1 = d;
                        if (self._prizeData[number_1].type == 1) {
                            self.setYuanbao(self["prize_" + i], self._prizeData[number_1].amount, true);
                        } else if (self._prizeData[number_1].type == 2) {
                            self.setHongbao(self["prize_" + i], self._prizeData[number_1].amount, true);
                        }else if (self._prizeData[number_1].type == 0) {
                            self.setThanks(self["prize_" + i]);
                        }else{
                            self.setIphoneX(self["prize_" + i]);
                        }

                    })));
                }
                func(j, i);

                j++;
            }
        }

        this.runAction(cc.sequence(cc.DelayTime(3.5),cc.callFunc(function() {
            var layer = new ChristmasBackLayer(self._prizeData[5].type,self._prizeData[5].amount);
            MjClient.Scene.addChild(layer);
            self.setCanTouch();
            self.reqChristmas();
        })))
        
    },

    setNoTouch:function(){
        if (cc.sys.isObjectValid(this.btn_1))
            this.btn_1.setTouchEnabled(false);
        if (cc.sys.isObjectValid(this.btn_2))
            this.btn_2.setTouchEnabled(false);
        if (cc.sys.isObjectValid(this._btn_list))
            this._btn_list.setTouchEnabled(false);
        for (var i = 1; i <= 6; i++) {
            if (cc.sys.isObjectValid(this["prize_" + i])){
                this["prize_" + i].setTouchEnabled(false);
            }
            
        }
    },

    setCanTouch:function(){
        if (cc.sys.isObjectValid(this.btn_1))
            this.btn_1.setTouchEnabled(true);
        if (cc.sys.isObjectValid(this.btn_2))
            this.btn_2.setTouchEnabled(true);
        if (cc.sys.isObjectValid(this._btn_list))
            this._btn_list.setTouchEnabled(true);
        for (var i = 1; i <= 6; i++) {
            if (cc.sys.isObjectValid(this["prize_" + i])){
                this["prize_" + i].removeAllChildren();
                this["prize_" + i].setTouchEnabled(true);
                this["prize_" + i].setColor(cc.color(255,255,255));
            }
            
        }
    },

    setHongbao:function(node,number,isTrue){
        node.setRotationY(0);
        var _sprite = new cc.Sprite("MerryChristmas/prize_hongbao.png");
        _sprite.setPosition(node.getContentSize().width/2, node.getContentSize().height/2);

        var _label = new cc.LabelTTF(number + "",MjClient.fzcyfont,40);
        _label.setPosition(node.getContentSize().width/2, node.getContentSize().height * 0.55);
        _sprite.addChild(_label);
        node.addChild(_sprite);
        if (isTrue) {
            node.setColor(cc.color(120,120,120));
        }

    },
    setYuanbao:function(node,number,isTrue){
        node.setRotationY(0);
        var _sprite = new cc.Sprite("MerryChristmas/prize_yuanbao.png");
        _sprite.setPosition(node.getContentSize().width/2, node.getContentSize().height/2);
        node.addChild(_sprite);
        if (isTrue) {
            node.setColor(cc.color(120,120,120));
        }
    },
    setIphoneX:function(node){
        node.setRotationY(0);
        var randomNum = Math.random() + 1;
        var number = randomNum >= 1.5 ? 2 : 1;
        var _sprite = new cc.Sprite( "MerryChristmas/prize_iphone_" + number +".png");
        _sprite.setPosition(node.getContentSize().width/2, node.getContentSize().height/2);
        node.addChild(_sprite);
    },
    setThanks:function(node){
        node.setRotationY(0);

        var _sprite = new cc.Sprite("MerryChristmas/prize_thanks.png");
        _sprite.setPosition(node.getContentSize().width/2, node.getContentSize().height/2);
        node.addChild(_sprite);
    },
    refreshData: function() {
        if (!cc.sys.isObjectValid(this._back)) return;
        var _back = this._back.getChildByName("node_rule");
        var text_1 = _back.getChildByName("text_1");
        text_1.setString("" + this._getChance.win3 + "/3" + "");

        var text_2 = _back.getChildByName("text_2");
        text_2.setString("" + this._getChance.win6 + "/6" + "");

        
        if (this._getChance.win3 >= 3) {
            this.btn_1.loadTextureNormal("MerryChristmas/btn_ok.png");
            this.btn_1.setTouchEnabled(false);
        }else{
            this.btn_1.loadTextureNormal("MerryChristmas/btn_go.png");
            this.btn_1.setTouchEnabled(true);
        }
        
        if (this._getChance.win6 >= 6) {
            this.btn_2.loadTextureNormal("MerryChristmas/btn_ok.png");
            this.btn_2.setTouchEnabled(false);
        }else{
            this.btn_2.loadTextureNormal("MerryChristmas/btn_go.png");
            this.btn_2.setTouchEnabled(true);
        }
        
    },
   

    reqChristmas: function() {
        var self = this;
        // MjClient.block();
        // self.setNoTouch();
        MjClient.gamenet.request("pkplayer.handler.christmasLotteryMsg", {},
            function(rtn) {
                if (rtn.code == 0) {
                    self._getChance = rtn.data.getChance;
                    self._lastChance = rtn.data.lastChance;
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

    reqChouJiang: function() {
        var self = this;
        // MjClient.block();
        // self.setNoTouch();
        MjClient.gamenet.request("pkplayer.handler.christmasLottery", {},
            function(rtn) {
                cc.log(" ========== christmasLottery =====" + JSON.stringify(rtn))
                if (rtn.code == 0) {
                    self._prizeData = rtn.data;
                    self.fanpaiAct();
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
        MjClient.gamenet.request("pkplayer.handler.christmasLotteryCallback", {},
            function(rtn) {
                if (rtn.code == 0) {
                    cc.log(" ===== christmasLotteryCallback ===   " + JSON.stringify(rtn))
                    if (self._prizeType == 1) {
                        MjClient.showToast("元宝已发放到账户中")
                    } else if (self._prizeType == 2) {
                        MjClient.showToast("请去公众号领取")
                    }
                    // if (MjClient.Christmas_ui) {
                    //     cc.log(" ------- Christmas_ui ========= ")
                    //     MjClient.Christmas_ui.removeFromParent();
                    // }

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
 * @DateTime:     2017-12-19 
 * @Description: 圣诞节获奖回调  Merry Christmas 
 */

var ChristmasBackLayer = cc.Layer.extend({
    
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
                    if (MjClient.Christmas_ui._prizeType == 1) {
                        var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "MerryChristmas/participator_yuanbao.jpg";
                        MjClient.native.wxShareImageToPYQ(filePath);
                    }else if (MjClient.Christmas_ui._prizeType == 2) {
                        var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "MerryChristmas/participator_hongbao.jpg";
                        MjClient.native.wxShareImageToPYQ(filePath);
                    }
                                       
                },
                _event: {
                    captureScreen_OK: function() {
                        MjClient.native.wxShareCaptureScreenToPYQ();
                    },
                    WX_SHARE_SUCCESS: function(data) {
                        MjClient.wxShareImageToPYQ = false;
                        if (parseInt(data.errCode) == 0) {
                            if (MjClient.ChristmasBack_ui) {
                                MjClient.ChristmasBack_ui.getShare();
                                // MjClient.showToast("分享成功"); //回调已经有飘提示了
                            }

                        }
                    }
                },
            },
        }
    },
    ctor: function(type, number) {
        this._super();
        MjClient.Christmas_ui._prizeType = type;
        var UI = ccs.load("Christmas_Back.json");
        BindUiAndLogic(UI.node,this.jsBind);
        this.addChild(UI.node);
        MjClient.ChristmasBack_ui = this;
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
        var _bg_1 = null;
          if (type == 1) {
            this._luckyNode_2.setVisible(true);
            // var _txt = this._luckyNode_2.getChildByName("Text_1")
            // _txt.setString("" + number);
            _bg_1 = this._luckyNode_2.getChildByName("Image_3");
            
        } else if (type == 2) {
            this._luckyNode_3.setVisible(true);
            var _txt = this._luckyNode_3.getChildByName("Text_1")
            _txt.setString("" + number + "");
            _bg_1 = this._luckyNode_3.getChildByName("Image_3");
        }else {
            this._luckyNode_1.setVisible(true);
            _btn_share.setVisible(false);
            close.setVisible(false);
            _block.setTouchEnabled(true);
            cc.log(" ---- _block ----------")
            _block.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    
                    self.removeFromParent();
                    
                    
                }
            }, this);
            
        }

        if (_bg_1) {
            var merry_show = false;
            _bg_1.schedule(function () {
                if (merry_show) {
                    _bg_1.setScale(1);
                    _bg_1.setRotation(0)
                    merry_show = false;
                }
                else {
                    merry_show = true;
                    _bg_1.setRotation(15)
                    _bg_1.setScale(0.8);
                }
            }, 0.5);
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

    },
    getShare:function(){
        this.removeFromParent();
        if (MjClient.Christmas_ui) {
            MjClient.Christmas_ui.reqShare();
        }        
    }
    

});

/**
 * @Author:      XiaoMaoGe
 * @Email:       lms_190865480@163.com
 * @QQ:       190865480
 * @DateTime:     2017-12-19 
 * @Description: 圣诞节获奖列表沿用大转盘 Merry Christmas 
 */


var ChristmasListLayer = cc.Layer.extend({

    ctor: function() {
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
        _time.setString(_timeStr);
        if (oneData.type == 1) {
            _content.setString("元宝X" + oneData.amount);
        } else if (oneData.type == 2) {
            _content.setString(oneData.amount + "元现金");
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
            } else {
                MjClient.showToast("已显示所有记录");
            }
        }
    },
    reqprize: function() {
        var self = this;
        var _lastId = this._lastId;
        MjClient.gamenet.request("pkplayer.handler.christmasPersonLottery", {
                lastId: _lastId
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

