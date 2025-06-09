/**
 * Created by lms.
 */

var ShopOfJifen_layer = cc.Layer.extend({
    _DBData:null,
    ctor: function(data) {
        this._super();
        var UI = ccs.load("ShopOfJiFen_main.json");
        this.addChild(UI.node);
        MjClient.ShopOfJifen_mainUI = this;
        var self = this;
        this._data = data;
        this._canGet = false;
        this._myType = 1;
        // this._schedule = false;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);

        this._back_DB = UI.node.getChildByName("back_DB");
        setWgtLayout(this._back_DB, [1, 1], [0.5, 0.5], [0, 0]);
        this._back_DB.visible = false;

        this.panelTop = UI.node.getChildByName("panelTop");
        setWgtLayout(this.panelTop, [1, 1], [0.5, 1], [0, 0]);

        var closeBtn = this.panelTop.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                playEffect("ShopOfJiFen/click_btn", false);
                MjClient.JFHXJ_mainUI = null;
                self.removeFromParent();
                MjClient.native.umengEvent4CountWithProperty("Duihuanshangcheng_Tuichu", {
                    uid: SelfUid()
                });
            }
        });

        this._list_btn = this._back.getChildByName("ListView_btn");
        this._cell_btn = this._back.getChildByName("cell_mall");
        this._cell_btn.setVisible(false);
        this._scroll_main = this._back.getChildByName("ScrollView_1");
        this._list_rule = this._scroll_main.getChildByName("ListView_rule");
        this._list_thing = this._scroll_main.getChildByName("ListView_thing");
        this._cell_rule = this._back.getChildByName("cell_rule");
        this._cell_thing = this._back.getChildByName("cell_thing");
        this._cell_rule.visible = false;

        this._shareType = null;
        UIEventBind(null, this._list_rule, "WX_SHARE_SUCCESS", function(data) {
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

        this.btn_rule = this.panelTop.getChildByName("btn_wenhao");
        this.btn_rule.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.play_voice(1);
                var layer = new ShopOfJifen_ruleLayer(); // 
                MjClient.Scene.addChild(layer);
                MjClient.native.umengEvent4CountWithProperty("Duihuanshangcheng_Shangpshuoming", {
                    uid: SelfUid()
                });
            }
        }, this);

        this.btn_shezhi = this.panelTop.getChildByName("btn_shezhi");
        this.btn_shezhi.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.play_voice(1);
                var layer = new ShopOfJifen_remainInfoLayer();
                MjClient.Scene.addChild(layer);
                MjClient.native.umengEvent4CountWithProperty("Duihuanshangcheng_Duihuanjil", {
                    uid: SelfUid()
                });
            }
        }, this);

        this.btn_jilu = this.panelTop.getChildByName("btn_jilu");
        this.btn_jilu.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.play_voice(1);
                var layer = new ShopOfJifen_listLayer(this._data);
                MjClient.Scene.addChild(layer);

            }
        }, this);

        this.btn_shop = this.panelTop.getChildByName("btn_shop");
        this.btn_duobao = this.panelTop.getChildByName("btn_duobao");

        // 去掉礼券夺宝功能（从没上线过）
        this.btn_duobao.setVisible(false);
        this.btn_shop.setVisible(false);

        UIEventBind(null, this, "waitReady", function(eD) {
            self.removeFromParent();
        });

        UIEventBind(null, this, MjClient.native.mobgiAdsCallbackEvent.VIDEO_ADS_COMPLETED, function(data) {
            if(data.type == MjClient.native.mobgiAdsType.SHIPIN_SHANGCHENG || data.indexOf("type:"+MjClient.native.mobgiAdsType.SHIPIN_SHANGCHENG) >= 0) {
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.userAdClick", {
                    type: 1
                }, function (rtn) {
                    MjClient.unblock();
                    if (rtn.code == -1) {
                        MjClient.showToast(rtn.message);
                    } else if (rtn.code == 0) {
                        if (cc.sys.isObjectValid(MjClient.ShopOfJifen_mainUI)) {
                            MjClient.ShopOfJifen_mainUI.reqTableMsg();
                        }
                        var layer = new ShopOfJifen_actLayer();
                        playEffect("ShopOfJiFen/click_btn", false);
                        MjClient.Scene.addChild(layer);
                        MjClient.showToast("积分领取成功");
                    }
                });
            }
        });
        UIEventBind(null, this, MjClient.native.mobgiAdsCallbackEvent.VIDEO_ADS_ERROR, function(data) {
            if(!data.isObject()){
                data = JSON.parse(data);
            }
            if(data.type == MjClient.native.mobgiAdsType.SHIPIN_SHANGCHENG) {
                MjClient.showToast("广告加载错误");
            }
        });
        UIEventBind(null, this, MjClient.native.mobgiAdsCallbackEvent.VIDEO_ADS_SKIPPED, function(data) {
            if(!data.isObject()){
                data = JSON.parse(data);
            }
            if(data.type == MjClient.native.mobgiAdsType.SHIPIN_SHANGCHENG) {
                MjClient.showToast("广告没有播放完，不会发放奖励");
            }
        });
        UIEventBind(null, this, MjClient.native.mobgiAdsCallbackEvent.VIDEO_ADS_NOT_READY, function(data) {
            if(!data.isObject()){
                data = JSON.parse(data);
            }
            if(data.type == MjClient.native.mobgiAdsType.SHIPIN_SHANGCHENG) {
                MjClient.showToast("广告还没加载完");
            }
        });

        UIEventBind(null, this, "exchangeMall", function(data) {
            if(!self._DBData){
                return;
            }
            for(var i = 0; i < self._DBData.length; i++){
                if(self._DBData[i].productId == data.productId){
                    if(data.type == 1){
                        self._DBData[i].activityWinnerId = data.winnerId;
                        self._DBData[i].activityWinnerName = data.winnerName;
                        self._DBData[i].activityWinnerHeadUrl = data.WinnerHeadUrl;
                        self._DBData[i].activityWinnerCode = data.winnerCode;
                        self._DBData[i].activityBuyNum = data.buyNum;
                        self._DBData[i].activityPhaseId = data.phaseId;
                        self._DBData[i].productPhaseNum = data.productPhaseNum;
                        self._DBData[i].activityPhaseNum = data.activityPhaseNum;
                        self._DBData[i].activityEndTime = data.endTime;
                    }else if(data.type == 2){
                        self._DBData[i].activityCurrentUser = data.members;
                        self._DBData[i].activitySurplusTime = data.surplusTime;
                        self._DBData[i].activityWinnerId = 0;
                        self._DBData[i].activityPhaseId = data.phaseId;
                        self._DBData[i].productPhaseNum = data.productPhaseNum;
                        self._DBData[i].activityPhaseNum = data.activityPhaseNum;
                    }
                }
            }
            var scrollViewDB = this._back_DB.getChildByName("ScrollView_DB");
            var itemArr = scrollViewDB.getChildren();
            for(var i = 0; i < itemArr.length; i++){
                if(itemArr[i].productId == data.productId){
                    this.refreshDBUI(itemArr[i]);
                }
            }
        });

        this._arrow_left = this._back.getChildByName("arrow_left");
        var pos1_x = this._arrow_left.getPosition().x;
        var pos1_y = this._arrow_left.getPosition().y;
        var act_1 = cc.moveBy(0.5, cc.p(60, 0));
        var act_2 = cc.moveBy(0.5, cc.p(-60, 0));


        this._arrow_left.runAction(cc.sequence(cc.callFunc(function() {
            self._arrow_left.visible = true;
        }), act_1, cc.callFunc(function() {
            self._arrow_left.visible = false;
        }), act_2).repeatForever());
        this._arrow_right = this._back.getChildByName("arrow_right");
        var act_3 = cc.moveBy(0.5, cc.p(60, 0));
        var act_4 = cc.moveBy(0.5, cc.p(-60, 0));

        this._arrow_right.runAction(cc.sequence(cc.callFunc(function() {
            self._arrow_right.visible = true;
        }), act_4, cc.callFunc(function() {
            self._arrow_right.visible = false;
        }), act_3).repeatForever());
        self._arrow_left.setOpacity(0);
        self._arrow_right.setOpacity(0);
        this.schedule(function() {
            var _scroll = self._scroll_main;
            var pos_rightX = _scroll.getContentSize().width - _scroll.getInnerContainerSize().width;
            var pos_leftX = 0;
            var getpos_X = _scroll.getInnerContainerPosition().x;
            if (getpos_X == pos_leftX) {
                self._arrow_left.setOpacity(0);
                self._arrow_right.setOpacity(255);
            } else if (getpos_X == pos_rightX) {
                self._arrow_left.setOpacity(255);
                self._arrow_right.setOpacity(0);
            } else {
                self._arrow_left.setOpacity(0);
                self._arrow_right.setOpacity(0);
            }
            if (_scroll.getInnerContainerSize().width <= 1080) {
                self._arrow_left.setOpacity(0);
                self._arrow_right.setOpacity(0);
            }
        }, 0.5);


        this.Text_lijuan = this.panelTop.getChildByName("Text_lijuan");
        this.Text_lijuan.setString("");

        this.Text_yuanbao = this.panelTop.getChildByName("Text_yuanbao");
        this.Text_yuanbao.setString("");

        if (data) {
            this.refresh_table(1);
        } else {
            this.reqTableMsg();
        }


    },

    refresh_table: function() {
        if (!cc.sys.isObjectValid(this)) {
            return;
        }
        this._canGet = false;
        var integral = this._data.integral;
        if (this._data.integral >= 10E7) {
            integral = (this._data.integral / 10E7).toFixed(2) + "亿";
        } else if (this._data.integral >= 10E5) {
            integral = (this._data.integral / 10E3).toFixed(2) + "万";
        }
        this.Text_lijuan.setString(integral);
        var money = this._data.money;
        if (this._data.money >= 10E7) {
            money = (this._data.money / 10E7).toFixed(2) + "亿";
        } else if (this._data.money >= 10E5) {
            money = (this._data.money / 10E3).toFixed(2) + "万";
        }
        this.Text_yuanbao.setString(money);

        this.addItems_work();
        this.addItems_btn();
        this.changeNode_fresh(this._myType);
        this["_clickBtn_" + this._myType].setBright(false);

    },
    //第一排
    changeNode_createItem: function(oneData, number) {
        var copyNode = this._cell_thing.clone();
        copyNode.visible = true;
        var bg_1 = copyNode.getChildByName("img_bg");
        bg_1.visible = false;
        var sprite_bg = new cc.Sprite("ShopOfJiFen/icon_empty.png");
        sprite_bg.setPosition(bg_1.getPosition());
        var imageUrl = oneData.image;
        cc.loader.loadImg(imageUrl ? imageUrl : "ShopOfJiFen/icon_empty.png", {
            isCrossOrigin: true
        }, function(err, img) {
            if (err) {
                cc.log(err);
            } else if (img && cc.sys.isObjectValid(sprite_bg)) {
                sprite_bg.setTexture(img);
                var _scale = bg_1.height / sprite_bg.height;
                sprite_bg.setScale(_scale);
            }
        });

        copyNode.addChild(sprite_bg);
        var _text_jiage = copyNode.getChildByName("text_jiage");
        _text_jiage.width = 500;
        var _price = oneData.price;
        if(oneData.exchange && oneData.exchange.integral >= 0) _price = oneData.exchange.integral
        if (oneData.price >= 10E7) {
            _price = (oneData.price / 10E7).toFixed(2) + "亿";

        } else if (oneData.price >= 10E5) {
            _price = (oneData.price / 10E3).toFixed(2) + "万";
        }
        
        _text_jiage.setString("" + _price);
        if(oneData.exchange && oneData.exchange.integral >= 0) _text_jiage.setString(_price + "起");

        var _text_shengyu = copyNode.getChildByName("text_shengyu");
        _text_shengyu.setTextColor(cc.color("#8c1515"));
        _text_shengyu.width = 500;
        var _limit = oneData.limit;
        if (oneData.limit >= 10E7) {
            _limit = (oneData.limit / 10E7).toFixed(2) + "亿";
        } else if (oneData.limit >= 10E5) {
            _limit = (oneData.limit / 10E3).toFixed(2) + "万";
        }
        _text_shengyu.setString("剩余" + _limit + "份");

        var text_title = copyNode.getChildByName("text_title");
        text_title.ignoreContentAdaptWithSize(true);
        text_title.setString("" + oneData.title);

        var btn_1 = copyNode.getChildByName("bg_cell");
        btn_1.setTouchEnabled(true);
        btn_1.data = oneData;
        btn_1.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.play_voice(1);
                var pos_click = sender.getParent().getPosition();
                if (this._data.integral < sender.data.price) {
                    // 积分不够
                    MjClient.showToast("持有礼券不够");
                    MjClient.native.umengEvent4CountWithProperty("Duihuanshangcheng_Duihuan", {
                        uid: SelfUid(),
                        id: sender.data.id,
                        title: sender.data.title,
                        enough: 0
                    });
                } else {

                    var layer = new ShopOfJifen_changeChooseLayer(sender.data, this._data);
                    MjClient.Scene.addChild(layer);
                    MjClient.native.umengEvent4CountWithProperty("Duihuanshangcheng_Duihuan", {
                        uid: SelfUid(),
                        id: sender.data.id,
                        title: sender.data.title,
                        enough: 1
                    });
                    //this.reqExchange(sender.data);
                }

            }
        }, this);

        // this["changItem_" + number] = copyNode;
        return copyNode;

    },
    changeNode_fresh: function(type) {
        var _List2 = this._data.productList;
        var _List = [];
        this._myType = type;
        if (type == 1) {

            _List = _List2;
        } else {
            for (var i = 0; i < _List2.length; i++) {
                if (type == _List2[i].category) {
                    _List.push(_List2[i]);
                }
            }
        }
        var cell_width = 295; //每个选项之间的 x 间隔
        this._list_thing.setInnerContainerSize(cc.size(Math.ceil(_List.length / 3) * (cell_width), 560));
        this._scroll_main.setInnerContainerSize(cc.size(Math.ceil(_List.length / 3) * (cell_width) + 553, 600));
        this._scroll_main.setScrollBarOpacity(0);
        this._list_thing.removeAllChildren();
        for (var i = 0; i < _List.length; i++) {
            var pos_topY = this._list_thing.getInnerContainerSize().height;
            if (cc.sys.isObjectValid(this._cell_thing)) {
                var item = this.changeNode_createItem(_List[i], i);
                var lieshu = Math.floor(i / 3);
                var hangshu = i % 3;
                var pos_x = lieshu * cell_width;
                var pos_y = (2 - hangshu) * 196 - 5 ;

                item.setPosition(cc.p(5 + pos_x, pos_y));

                this._list_thing.addChild(item);
            }

        }

    },

    type_work: function(type) {
        var self = this;
        switch (type) {
            case 1:
                // 登录
                break;
            case 2:
                //大赢家
                break;
            case 3: //首充  商城
                var layer;
                if (MjClient.APP_TYPE.QXNTQP == MjClient.getAppType())
                    layer = new StoreTipDialog();
                else
                    layer = enter_store();
                MjClient.Scene.addChild(layer);
                break;
            case 4: // 分享 首页
                this._shareType = 1;
                if (cc.sys.OS_WINDOWS == cc.sys.os) {
                    MjClient.wxShareImageToPYQ = true;
                    postEvent("WX_SHARE_SUCCESS", {
                        errCode: 0
                    });
                }

                var fileContent = MjClient.getShareImageMallFileToPYQ();
                MjClient.native.wxShareImageToPYQ(fileContent.file, fileContent.content);
                break;
            case 5: // 分享 活动图
                this._shareType = 2;
                if (cc.sys.OS_WINDOWS == cc.sys.os) {
                    MjClient.wxShareImageToPYQ = true;
                    postEvent("WX_SHARE_SUCCESS", {
                        errCode: 0
                    });
                }

                var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "ShopOfJiFen/participator_1.jpg";
                MjClient.native.wxShareImageToPYQ(filePath);
                break;
            case 6: //开房 对战
                postEvent("createRoom", {});
                this.removeFromParent();
                break;
            case 7: // 亲友圈场次
                MjClient.Scene.addChild(new FriendCard_main());
                this.removeFromParent();
                break;
            case 8: // 推荐有礼
                MjClient.Scene.addChild(new recommendLayer_active());
                this.removeFromParent();
                break;
            case 9: //看广告
                MjClient.native.mobgiAds.showVideoAd(MjClient.native.mobgiAdsType.SHIPIN_SHANGCHENG);
                break;
            case 10: // 金币场
                MjClient.homeui.showJinbiView();
                this.removeFromParent();
              
                break;
        }
    },

    play_voice: function(type) {
        switch (type) {
            case 1:
                playEffect("ShopOfJiFen/click_btn", false);
                break;
            case 2:
                playEffect("ShopOfJiFen/play_getMusic", false);
                break;
        }
    },

    createItem_work: function(oneData, number) {
        var self = this;
        var copyNode = this._cell_rule.clone();
        copyNode.visible = true;

        var Text_rule = copyNode.getChildByName("Text_rule");
        Text_rule.ignoreContentAdaptWithSize(true);
        Text_rule.setString("" + oneData.title);

        var Text_get = copyNode.getChildByName("Text_get");
        Text_get.ignoreContentAdaptWithSize(true);
        Text_get.setString(oneData.score + "礼券");

        var bg_1 = copyNode.getChildByName("bg_1");
        bg_1.setScale9Enabled(true);
        if (oneData.type == 9) {
            bg_1.width = 95;
        }else{
            bg_1.width = 100;
        }

        var Text_1 = copyNode.getChildByName("Text_1");
        Text_1.setTextColor(cc.color("#8c1515"));
        Text_1.ignoreContentAdaptWithSize(true);
        if (oneData.type == 9) {
            Text_1.setString("剩余" + (oneData.totalRecvCount - oneData.recvCount) + "次");
        } else {
            Text_1.setString(oneData.count + "/" + oneData.total);
        }
        self["btn_rule_" + number] = copyNode.getChildByName("btn_rule");
        self["btn_rule_" + number].data = oneData;
        self["btn_rule_" + number].addTouchEventListener(function(sender, type) {
            var tag = sender.data.type;
            var id = sender.data.id;
            if (type == 2) {
                this.play_voice(1);
                if (sender.data.type == 9) {
                    this.type_work(tag);
                } else {
                    if (sender.data.count >= sender.data.total) {
                        this.reqGetJiFen(id);
                        var actionStr = "";
                        switch (tag) {
                            case 1:
                                // 登录
                                actionStr = "Liquanhuoqu_Shoudenglingqu"
                                break;
                            case 2:
                                //大赢家
                                break;
                            case 3: //首充  商城
                                actionStr = "Liquanhuoqu_Shouchongzhilingqu"
                                break;
                            case 4: // 分享 首页
                                break;
                            case 5: // 分享 活动图
                                actionStr = "Liquanhuoqu_Shoufenxianglingqu"
                                break;
                            case 6: //开房 对战
                                if (1 == sender.data.total) {
                                    actionStr = "Liquanhuoqu_Yichanglingqu"
                                } else if (2 == sender.data.total) {
                                    actionStr = "liqianhuoqu_Liangchanglingqu"
                                } else if (5 == sender.data.total) {
                                    actionStr = "liquanshangcheng_Wuchanglingqu"
                                } else if (10 == sender.data.total) {
                                    actionStr = "Liquanhuoqu_Shichanglingqu"
                                }
                                break;
                            case 7: // 亲友圈场次
                                break;
                            case 8: // 推荐有礼
                                actionStr = "Liquanhuoqu_Yaoqinghaoyoulingqu"
                                break;
                        }
                        if (actionStr.length > 0) {
                            MjClient.native.umengEvent4CountWithProperty(actionStr, {
                                uid: SelfUid()
                            });
                        }
                    } else {
                        this.type_work(tag);
                    }
                }
            }
        }, this);

        if (oneData.type == 9) {
            if (oneData.totalRecvCount - oneData.recvCount > 0) {
                if (oneData.leftTime > 0) {
                    self["btn_rule_" + number].loadTextureNormal("ShopOfJiFen/btn_adv_shijian.png");
                    self["btn_rule_" + number].setTouchEnabled(false);

                    var str1 = Math.ceil(oneData.leftTime);
                    self["btn_rule_" + number].getChildByName("num").setString(str1);
                    self["btn_rule_" + number].getChildByName("num").setVisible(true);
                    self["btn_rule_" + number].getChildByName("num").unscheduleAllCallbacks();
                    self["btn_rule_" + number].getChildByName("num").schedule(function() {
                        var str2 = Math.ceil(oneData.leftTime);
                        self["btn_rule_" + number].getChildByName("num").setString(str2);
                        if (oneData.leftTime > 0) {
                            oneData.leftTime--;
                        } else {
                            self._canGet = true;
                            self["btn_rule_" + number].loadTextureNormal("ShopOfJiFen/btn_adv_get.png");
                            self["btn_rule_" + number].setTouchEnabled(true);
                            self["btn_rule_" + number].getChildByName("num").setString("");
                        }
                    }, 60, cc.REPEAT_FOREVER, 0);
                } else {
                    self._canGet = true;
                    self["btn_rule_" + number].loadTextureNormal("ShopOfJiFen/btn_adv_get.png");
                    self["btn_rule_" + number].setTouchEnabled(true);
                }
            } else {
                self["btn_rule_" + number].loadTextureNormal("ShopOfJiFen/btn_adv_notget.png");
                self["btn_rule_" + number].setTouchEnabled(false);
            }
        } else {
            if (oneData.recved) {
                self["btn_rule_" + number].loadTextureNormal("ShopOfJiFen/btn_yiling.png");
                self["btn_rule_" + number].setTouchEnabled(false);
            } else {
                if (oneData.count >= oneData.total) {
                    self._canGet = true;
                    self["btn_rule_" + number].loadTextureNormal("ShopOfJiFen/btn_get.png");
                    self["btn_rule_" + number].setTouchEnabled(true);
                } else {
                    self["btn_rule_" + number].loadTextureNormal("ShopOfJiFen/btn_go.png");
                    self["btn_rule_" + number].setTouchEnabled(true);
                }
            }
        }



        return copyNode;
    },
    addItems_work: function() {
        var _emailList = this._data.list;
        this._list_rule.removeAllItems();
        for (var i = 0; i < _emailList.length; i++) {
            if (cc.sys.isObjectValid(this._cell_rule)) {
                this._list_rule.pushBackCustomItem(this.createItem_work(_emailList[i], i));
            }
        }
        this._list_rule.setScrollBarOpacity(0);
    },

    press_btn: function(id) {
        var _emailList = this._data.categoryList;
        for (var i = 0; i < _emailList.length; i++) {
            var number = _emailList[i].category;
            if (id == number) {
                this["_clickBtn_" + number].setBright(false);
                this.changeNode_fresh(id);
                if (id == 1) {
                    MjClient.native.umengEvent4CountWithProperty("Duihuanshangcheng_Quanbushangping", {
                        uid: SelfUid()
                    });
                } else if (id == 2) {
                    MjClient.native.umengEvent4CountWithProperty("Duihuanshangcheng_Shenghuoyongping", {
                        uid: SelfUid()
                    });
                } else if (id == 3) {
                    MjClient.native.umengEvent4CountWithProperty("Duihuanshangcheng_Shipliangyou", {
                        uid: SelfUid()
                    });
                } else if (id == 4) {
                    MjClient.native.umengEvent4CountWithProperty("Duihuanshangcheng_Shumachanping", {
                        uid: SelfUid()
                    });
                } else if (id == 0) {
                    MjClient.native.umengEvent4CountWithProperty("Duihuanshangcheng_Xuniwuping", {
                        uid: SelfUid()
                    });
                }
            } else {
                this["_clickBtn_" + number].setBright(true);
            }
        }
    },
    createItem_btn: function(oneData, number) {
        var self = this;
        var copyNode = this._cell_btn.clone();
        copyNode.visible = true;
        copyNode.loadTextureNormal("ShopOfJiFen/btn_" + number + "_s.png");
        copyNode.loadTexturePressed("ShopOfJiFen/btn_" + number + "_n.png");
        copyNode.loadTextureDisabled("ShopOfJiFen/btn_" + number + "_n.png");
        // copyNode.setBright(false);
        copyNode.setTag(number);
        copyNode.addTouchEventListener(function(sender, type) {
            var tag = sender.getTag();
            if (type == 2) {
                self.play_voice(1);
                this.press_btn(tag);
            }
        }, this);


        this["_clickBtn_" + number] = copyNode;


        return copyNode;
    },
    addItems_btn: function() {
        var _emailList = this._data.categoryList;
        // var wdd = {
        //     "category": 0,
        //     "title": "元宝红包"
        // }
        // _emailList.push(wdd);
        this._list_btn.removeAllItems();
        for (var i = 0; i < _emailList.length; i++) {
            if (cc.sys.isObjectValid(this._cell_btn)) {
                this._list_btn.pushBackCustomItem(this.createItem_btn(_emailList[i], _emailList[i].category));
            }
        }
        this._list_btn.setScrollBarOpacity(0);
    },


    initDBUI:function () {
        var self = this;
        this._back_DB.visible = true;
        var scrollViewDB = this._back_DB.getChildByName("ScrollView_DB");
        var len = this._DBData.length;
        var itemDB = scrollViewDB.getChildByName("item_DB");
        itemDB.setVisible(false);
        scrollViewDB.setInnerContainerSize(cc.size(itemDB.x*2+(itemDB.width +28)*(len-1), scrollViewDB.height))
        for(var i = 0; i < this._DBData.length; i++){
            var item = itemDB.clone();
            item.setVisible(true);
            scrollViewDB.addChild(item);
            item.x = itemDB.x + (itemDB.width +28)*i;
            item.i = i;
            item.productId = this._DBData[i].productId;
            item.addTouchEventListener(function (sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED) {
                    cc.log("跳转到详情")
                    MjClient.Scene.addChild(new ShopOfJifen_DBDetailLayer(self._DBData[sender.i]));
                }
            }, this);

            var biaoqian = item.getChildByName("biaoqian");
            var reward_di = item.getChildByName("reward_di");
            var imgOver = reward_di.getChildByName("over");
            var reward = reward_di.getChildByName("reward");
            var imageOver = item.getChildByName("Image_over");
            var textTitle = item.getChildByName("Text_title");
            textTitle.ignoreContentAdaptWithSize(true);
            textTitle.setString(this._DBData[i].productName);

            var Node_DB_start = item.getChildByName("Node_DB_start");
            var btnLiquanDB = Node_DB_start.getChildByName("Button_liquan_DB");
            btnLiquanDB.setTouchEnabled(false);
            var textLiquan = btnLiquanDB.getChildByName("Text_liquan");
            textLiquan.ignoreContentAdaptWithSize(true);
            var sliderDB = Node_DB_start.getChildByName("Slider_DB");
            sliderDB.setTouchEnabled(false);
            var timeBg = Node_DB_start.getChildByName("time_bg");
            var min = timeBg.getChildByName("min");
            min.ignoreContentAdaptWithSize(true);
            var sec = timeBg.getChildByName("sec");
            sec.ignoreContentAdaptWithSize(true);
            var sec1 = timeBg.getChildByName("sec_1");
            sec1.ignoreContentAdaptWithSize(true);
            var imageLine = Node_DB_start.getChildByName("Image_line");

            var Node_DB_lottery = item.getChildByName("Node_DB_lottery");
            var numBg = Node_DB_lottery.getChildByName("num_bg");

            var Node_DB_over = item.getChildByName("Node_DB_over");
            var headBg = Node_DB_over.getChildByName("head_bg");
            var _headFrame = Node_DB_over.getChildByName("headFrame");
            var textName = Node_DB_over.getChildByName("Text_name");
            textName.ignoreContentAdaptWithSize(true);
            var textNum = Node_DB_over.getChildByName("Text_num");
            textNum.ignoreContentAdaptWithSize(true);

            if(this._DBData[i].activityType == 1){//秒杀
                biaoqian.loadTexture("ShopOfJiFen/duobao/miaosha.png");
                sliderDB.setVisible(false);
                imageLine.setVisible(true);
                btnLiquanDB.y = 100;
                if(this._DBData[i].activityWinnerId === 0){//未结束
                    if(this._DBData[i].activitySurplusTime>0){//可以购买
                        Node_DB_start.setVisible(true);
                        Node_DB_lottery.setVisible(false);
                        textLiquan.setString(this._DBData[i].productPrice);
                        timeBg.setVisible(true);
                        min.setString(parseInt(this._DBData[i].activitySurplusTime/1000/60));
                        sec.setString(parseInt(this._DBData[i].activitySurplusTime/1000%60));
                        sec1.setString(parseInt(this._DBData[i].activitySurplusTime%1000/100));
                        timeBg.i = i;
                        timeBg.unscheduleAllCallbacks();
                        timeBg.schedule(function () {
                            this.getChildByName("min").setString(parseInt(self._DBData[this.i].activitySurplusTime/1000/60));
                            this.getChildByName("sec").setString(parseInt(self._DBData[this.i].activitySurplusTime/1000%60));
                            this.getChildByName("sec_1").setString(parseInt(self._DBData[this.i].activitySurplusTime%1000/100));
                            self._DBData[this.i].activitySurplusTime = self._DBData[this.i].activitySurplusTime - 100;
                            if(self._DBData[this.i].activitySurplusTime < 0){
                                this.getChildByName("min").setString("0");
                                this.getChildByName("sec").setString("0");
                                this.getChildByName("sec_1").setString("0");
                            }
                        }.bind(timeBg),0.1);

                        var richText = new ccui.RichText();
                        richText.setName("richText");
                        var richTextItem1 = new ccui.RichElementText(1, cc.color("#d1840a"), 255, "已抢", "fonts/lanting.TTF", 20);
                        var richTextItem2 = new ccui.RichElementText(2, cc.color("#d3260e"), 255, this._DBData[i].activityCurrentUser, "fonts/lanting.TTF", 20);
                        var richTextItem3 = new ccui.RichElementText(3, cc.color("#d1840a"), 255, "次", "fonts/lanting.TTF", 20);
                        richText.pushBackElement(richTextItem1);
                        richText.pushBackElement(richTextItem2);
                        richText.pushBackElement(richTextItem3);
                        richText.y = 40;
                        Node_DB_start.addChild(richText);
                    }else {
                        Node_DB_start.setVisible(false);
                        Node_DB_lottery.setVisible(true);
                        timeBg.setVisible(false);
                        this.luckyNumFunc(numBg);
                    }
                }else {//已结束
                    Node_DB_start.setVisible(false);
                    Node_DB_lottery.setVisible(false);
                    timeBg.setVisible(false);
                }
            }else if(this._DBData[i].activityType == 2){//人气
                biaoqian.loadTexture("ShopOfJiFen/duobao/renqi.png");
                timeBg.setVisible(false);
                imageLine.setVisible(false);
                if(this._DBData[i].activityWinnerId === 0){//未结束
                    if(this._DBData[i].activityCurrentUser < this._DBData[i].activityMaxUser){//可以购买
                        Node_DB_start.setVisible(true);
                        Node_DB_lottery.setVisible(false);
                        textLiquan.setString(this._DBData[i].productPrice);
                        sliderDB.setVisible(true);
                        sliderDB.setPercent(this._DBData[i].activityCurrentUser/this._DBData[i].activityMaxUser*100);

                        var richText = new ccui.RichText();
                        richText.setName("richText");
                        var richTextItem1 = new ccui.RichElementText(1, cc.color("#d1840a"), 255, "已抢", "fonts/lanting.TTF", 20);
                        var richTextItem2 = new ccui.RichElementText(2, cc.color("#d3260e"), 255, this._DBData[i].activityCurrentUser, "fonts/lanting.TTF", 20);
                        var richTextItem3 = new ccui.RichElementText(3, cc.color("#d1840a"), 255, "次/"+this._DBData[i].activityMaxUser+"次", "fonts/lanting.TTF", 20);
                        richText.pushBackElement(richTextItem1);
                        richText.pushBackElement(richTextItem2);
                        richText.pushBackElement(richTextItem3);
                        richText.y = 60;
                        Node_DB_start.addChild(richText);
                    }else {
                        Node_DB_start.setVisible(false);
                        Node_DB_lottery.setVisible(true);
                        sliderDB.setVisible(false);
                        this.luckyNumFunc(numBg);
                    }
                }else {//已结束
                    Node_DB_start.setVisible(false);
                    Node_DB_lottery.setVisible(false);
                    sliderDB.setVisible(false);
                }
            }

            if(this._DBData[i].productImage){
                reward.setVisible(false);
                var url = this._DBData[i].productImage;
                cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
                {
                    if(!err&&texture && cc.sys.isObjectValid(this))
                    {
                        var productImage = new cc.Sprite(texture);
                        productImage.setName("productImage");
                        productImage.setPosition(reward.getPosition());
                        productImage.setScaleX(reward.width/productImage.getContentSize().width);
                        productImage.setScaleY(reward.height/productImage.getContentSize().height);
                        this.addChild(productImage,-1);
                    }
                }.bind(reward_di));
            }

            if(this._DBData[i].activityWinnerId === 0){//未结束
                imgOver.setVisible(false);
                Node_DB_over.setVisible(false);
                imageOver.setVisible(false);
            }else {//已结束
                imgOver.setVisible(true);
                Node_DB_over.setVisible(true);
                imageOver.setVisible(true);

                function loadHead(i, _headFrame) {
                    var url = self._DBData[i].activityWinnerHeadUrl;
                    cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
                    {
                        if(!err&&texture&&cc.sys.isObjectValid(Node_DB_over))
                        {
                            var clipper = new cc.ClippingNode();
                            var sten = cc.Sprite.create("ShopOfJiFen/duobao/head_clip.png");
                            var stenSize = sten.getContentSize();
                            sten.setPosition(_headFrame.getPosition());
                            clipper.setContentSize(stenSize);
                            clipper.setStencil(sten);
                            clipper.setAlphaThreshold(0.5);
                            _headFrame.getParent().addChild(clipper);
                            var headSprite = new cc.Sprite(texture);
                            headSprite.setPosition(sten.getPosition());
                            headSprite.setScaleX(_headFrame.width/headSprite.width);
                            headSprite.setScaleY(_headFrame.height/headSprite.height);
                            clipper.addChild(headSprite);
                        }
                    });
                }
                loadHead(i, _headFrame);

                textName.setString(unescape(this._DBData[i].activityWinnerName));
                textNum.setString("幸运码："+this._DBData[i].activityWinnerCode);
            }

            // btnLiquanDB.addTouchEventListener(function(sender, type) {
            //     if (type == 2) {
            //         cc.log("跳转到购买");
            //     }
            // });
        }
    },

    refreshDBUI:function (item) {
        var self = this;
        for(var i = 0; i < this._DBData.length; i++){
            if( this._DBData[i].productId == item.productId){
                var biaoqian = item.getChildByName("biaoqian");
                var reward_di = item.getChildByName("reward_di");
                var imgOver = reward_di.getChildByName("over");
                var reward = reward_di.getChildByName("reward");
                var imageOver = item.getChildByName("Image_over");
                var textTitle = item.getChildByName("Text_title");
                textTitle.ignoreContentAdaptWithSize(true);
                textTitle.setString(this._DBData[i].productName);

                var Node_DB_start = item.getChildByName("Node_DB_start");
                var btnLiquanDB = Node_DB_start.getChildByName("Button_liquan_DB");
                btnLiquanDB.setTouchEnabled(false);
                var textLiquan = btnLiquanDB.getChildByName("Text_liquan");
                textLiquan.ignoreContentAdaptWithSize(true);
                var sliderDB = Node_DB_start.getChildByName("Slider_DB");
                var timeBg = Node_DB_start.getChildByName("time_bg");
                var min = timeBg.getChildByName("min");
                min.ignoreContentAdaptWithSize(true);
                var sec = timeBg.getChildByName("sec");
                sec.ignoreContentAdaptWithSize(true);
                var sec1 = timeBg.getChildByName("sec_1");
                sec1.ignoreContentAdaptWithSize(true);
                var imageLine = Node_DB_start.getChildByName("Image_line");

                var Node_DB_lottery = item.getChildByName("Node_DB_lottery");
                var numBg = Node_DB_lottery.getChildByName("num_bg");

                var Node_DB_over = item.getChildByName("Node_DB_over");
                var headBg = Node_DB_over.getChildByName("head_bg");
                var _headFrame = Node_DB_over.getChildByName("headFrame");
                var textName = Node_DB_over.getChildByName("Text_name");
                textName.ignoreContentAdaptWithSize(true);
                var textNum = Node_DB_over.getChildByName("Text_num");
                textNum.ignoreContentAdaptWithSize(true);

                if(this._DBData[i].activityType == 1){//秒杀
                    biaoqian.loadTexture("ShopOfJiFen/duobao/miaosha.png");
                    sliderDB.setVisible(false);
                    imageLine.setVisible(true);
                    btnLiquanDB.y = 100;
                    if(this._DBData[i].activityWinnerId === 0){//未结束
                        if(this._DBData[i].activitySurplusTime>0){//可以购买
                            Node_DB_start.setVisible(true);
                            Node_DB_lottery.setVisible(false);
                            textLiquan.setString(this._DBData[i].productPrice);
                            timeBg.setVisible(true);
                            min.setString(parseInt(this._DBData[i].activitySurplusTime/1000/60));
                            sec.setString(parseInt(this._DBData[i].activitySurplusTime/1000%60));
                            sec1.setString(parseInt(this._DBData[i].activitySurplusTime%1000/100));
                            timeBg.i = i;
                            timeBg.unscheduleAllCallbacks();
                            timeBg.schedule(function () {
                                this.getChildByName("min").setString(parseInt(self._DBData[this.i].activitySurplusTime/1000/60));
                                this.getChildByName("sec").setString(parseInt(self._DBData[this.i].activitySurplusTime/1000%60));
                                this.getChildByName("sec_1").setString(parseInt(self._DBData[this.i].activitySurplusTime%1000/100));
                                self._DBData[this.i].activitySurplusTime = self._DBData[this.i].activitySurplusTime - 100;
                                if(self._DBData[this.i].activitySurplusTime < 0){
                                    this.getChildByName("min").setString("0");
                                    this.getChildByName("sec").setString("0");
                                    this.getChildByName("sec_1").setString("0");
                                }
                            }.bind(timeBg),0.1);

                            var richText1 = Node_DB_start.getChildByName("richText");
                            if(richText1){
                                richText1.removeFromParent();
                            }
                            var richText = new ccui.RichText();
                            richText.setName("richText");
                            var richTextItem1 = new ccui.RichElementText(1, cc.color("#d1840a"), 255, "已抢", "fonts/lanting.TTF", 20);
                            var richTextItem2 = new ccui.RichElementText(2, cc.color("#d3260e"), 255, this._DBData[i].activityCurrentUser, "fonts/lanting.TTF", 20);
                            var richTextItem3 = new ccui.RichElementText(3, cc.color("#d1840a"), 255, "次", "fonts/lanting.TTF", 20);
                            richText.pushBackElement(richTextItem1);
                            richText.pushBackElement(richTextItem2);
                            richText.pushBackElement(richTextItem3);
                            richText.y = 40;
                            Node_DB_start.addChild(richText);
                        }else {
                            Node_DB_start.setVisible(false);
                            Node_DB_lottery.setVisible(true);
                            timeBg.setVisible(false);
                            this.luckyNumFunc(numBg);
                        }
                    }else {//已结束
                        Node_DB_start.setVisible(false);
                        Node_DB_lottery.setVisible(true);
                        timeBg.setVisible(false);
                        this.luckyNumFunc(numBg);
                    }
                }else if(this._DBData[i].activityType == 2){//人气
                    biaoqian.loadTexture("ShopOfJiFen/duobao/renqi.png");
                    timeBg.setVisible(false);
                    imageLine.setVisible(false);
                    if(this._DBData[i].activityWinnerId === 0){//未结束
                        if(this._DBData[i].activityCurrentUser < this._DBData[i].activityMaxUser){//可以购买
                            Node_DB_start.setVisible(true);
                            Node_DB_lottery.setVisible(false);
                            textLiquan.setString(this._DBData[i].productPrice);
                            sliderDB.setVisible(true);
                            sliderDB.setPercent(this._DBData[i].activityCurrentUser/this._DBData[i].activityMaxUser*100);

                            var richText1 = Node_DB_start.getChildByName("richText");
                            if(richText1){
                                richText1.removeFromParent();
                            }
                            var richText = new ccui.RichText();
                            richText.setName("richText");
                            var richTextItem1 = new ccui.RichElementText(1, cc.color("#d1840a"), 255, "已抢", "fonts/lanting.TTF", 20);
                            var richTextItem2 = new ccui.RichElementText(2, cc.color("#d3260e"), 255, this._DBData[i].activityCurrentUser, "fonts/lanting.TTF", 20);
                            var richTextItem3 = new ccui.RichElementText(3, cc.color("#d1840a"), 255, "次/"+this._DBData[i].activityMaxUser+"次", "fonts/lanting.TTF", 20);
                            richText.pushBackElement(richTextItem1);
                            richText.pushBackElement(richTextItem2);
                            richText.pushBackElement(richTextItem3);
                            richText.y = 60;
                            Node_DB_start.addChild(richText);
                        }else {
                            Node_DB_start.setVisible(false);
                            Node_DB_lottery.setVisible(true);
                            sliderDB.setVisible(false);
                            this.luckyNumFunc(numBg);
                        }
                    }else {//已结束
                        Node_DB_start.setVisible(false);
                        Node_DB_lottery.setVisible(true);
                        sliderDB.setVisible(false);
                        this.luckyNumFunc(numBg);
                    }
                }

                if(this._DBData[i].productImage){
                    reward.setVisible(false);
                    var url = this._DBData[i].productImage;
                    cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
                    {
                        if(!err&&texture && cc.sys.isObjectValid(this))
                        {
                            var productImage = new cc.Sprite(texture);
                            productImage.setName("productImage");
                            productImage.setPosition(reward.getPosition());
                            productImage.setScaleX(reward.width/productImage.getContentSize().width);
                            productImage.setScaleY(reward.height/productImage.getContentSize().height);
                            this.addChild(productImage,-1);
                        }
                    }.bind(reward_di));
                }

                if(this._DBData[i].activityWinnerId === 0){//未结束
                    imgOver.setVisible(false);
                    Node_DB_over.setVisible(false);
                    imageOver.setVisible(false);
                }else {//已结束
                    this.schedule(function () {
                        imgOver.setVisible(true);
                        Node_DB_over.setVisible(true);
                        imageOver.setVisible(true);
                        Node_DB_lottery.setVisible(false);
                    },5,1);

                    function loadHead(i, _headFrame) {
                        var url = self._DBData[i].activityWinnerHeadUrl;
                        cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
                        {
                            if(!err&&texture&&cc.sys.isObjectValid(Node_DB_over))
                            {
                                var clipper = new cc.ClippingNode();
                                var sten = cc.Sprite.create("ShopOfJiFen/duobao/head_clip.png");
                                var stenSize = sten.getContentSize();
                                sten.setPosition(_headFrame.getPosition());
                                clipper.setContentSize(stenSize);
                                clipper.setStencil(sten);
                                clipper.setAlphaThreshold(0.5);
                                _headFrame.getParent().addChild(clipper);
                                var headSprite = new cc.Sprite(texture);
                                headSprite.setPosition(sten.getPosition());
                                headSprite.setScaleX(_headFrame.width/headSprite.width);
                                headSprite.setScaleY(_headFrame.height/headSprite.height);
                                clipper.addChild(headSprite);
                            }
                        });
                    }
                    loadHead(i, _headFrame);

                    textName.setString(unescape(this._DBData[i].activityWinnerName));
                    textNum.setString("幸运码："+this._DBData[i].activityWinnerCode);
                }
            }
        }
    },

    luckyNumFunc:function (numBg) {
        var maArr = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        for(var i = 0; i < 8; i++){
            var num = numBg.getChildByName("num_"+i);
            num.unscheduleAllCallbacks();
            num.schedule(function () {
                this.setString(maArr[Math.round(Math.random()*35)]);
            }.bind(num), 0.1);
        }
    },

    reqGetJiFen: function(number) {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.integralRecv", {
                id: number
            },
            function(rtn) {
                // cc.log(" ===== integralRecv === " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                    self.reqTableMsg();
                    var layer = new ShopOfJifen_actLayer();
                    self.play_voice(2);
                    MjClient.Scene.addChild(layer);
                    MjClient.showToast("积分领取成功");

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
    reqTableMsg: function() {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.integralInfo", {},
            function(rtn) {
                // cc.log(" ===== integralInfo integralInfo 22222 === " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                    self._data = rtn.data;
                    self.refresh_table();
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
    reqExchange: function(param) {
        var self = this;
        cc.log(" =========  请求兑换 ----- ");
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.integralExchange", param,
            function(rtn) {
                if (rtn.code == 0) {
                    if (param.category == 6) {

                        MjClient.Scene.addChild(new ShopOfJifen_ktvBack(param.title));
                    }else{
                        MjClient.showToast("兑换成功");
                    }
                    
                } else {

                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }
                }
                self.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(function() {
                    self.reqTableMsg();
                })));


                MjClient.unblock();
            }
        );

    },

    reqRemainInfo: function(param) {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.integralRecordUpdate", param,
            function(rtn) {
                if (rtn.code == 0) {
                    MjClient.showToast("信息提交成功");
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }
                }
                self.reqTableMsg();

                MjClient.unblock();
            }
        );

    },

    reqTreasureExchange: function(param) {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.treasureExchange", param,
            function(rtn) {
                if (rtn.code == 0) {
                    MjClient.showToast("成功参与");
                    if (cc.sys.isObjectValid(MjClient.ShopOfJifen_mainUI)) {
                        MjClient.ShopOfJifen_mainUI.reqTableMsg();
                    }
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

    reqTodayShare: function() {
        var self = this;
        MjClient.gamenet.request("pkplayer.handler.lotteryShare", {
                key: "INTEGRAL"
            },
            function(rtn) {
                if (rtn.code == 0) {
                    // cc.log(" ===== lotteryShare jifen lijuan===   " + JSON.stringify(rtn));
                    self.reqTableMsg();
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

    reqTreasureProductList:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.treasureProductList",{},function(rtn){
            // cc.log("wxd pkplayer.handler.treasureProductList:"+JSON.stringify(rtn))
            MjClient.unblock();
            if(rtn.code == 0) {
                self._DBData = rtn.data;
                self.initDBUI();
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    }
});



var ShopOfJifen_listLayer = cc.Layer.extend({

    ctor: function(data) {
        this._super();
        var UI = ccs.load("ShopOfJiFen_Rank.json");
        this.addChild(UI.node);
        var self = this;
        this.prizeBtn = null;
        MjClient.ShopOfJifen_listUI = this;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1.2, 1.2], [0.5, 0.5], [0, 0]);

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                playEffect("ShopOfJiFen/click_btn", false);
                MjClient.ShopOfJifen_listUI = null;
                self.removeFromParent();
            }
        }, this);
        
        this.node_duihuan =  _back.getChildByName("node_dh");
        this.node_duobao =  _back.getChildByName("node_db");
        this.node_huojiang =  _back.getChildByName("node_hj");
        this.btn_duihuan =  _back.getChildByName("btn_duihuan");
        this.btn_duobao =  _back.getChildByName("btn_duobao");
        this.btn_jiang =  _back.getChildByName("btn_jiang");

        var selectFunc = function (type) {
            this.node_duihuan.visible = type === 1;
            this.node_duobao.visible = type === 2;
            this.node_huojiang.visible = type === 3;
            if(type === 1){
                this.btn_duihuan.loadTextureNormal("ShopOfJiFen/btn_jilu_s.png");
                this.btn_duobao.loadTextureNormal("ShopOfJiFen/btn_duobao_n.png");
                this.btn_jiang.loadTextureNormal("ShopOfJiFen/btn_jiang_n.png");
            }else if(type === 2){
                this.btn_duihuan.loadTextureNormal("ShopOfJiFen/btn_jilu_n.png");
                this.btn_duobao.loadTextureNormal("ShopOfJiFen/btn_duobao_s.png");
                this.btn_jiang.loadTextureNormal("ShopOfJiFen/btn_jiang_n.png");
            }else if(type === 3){
                this.btn_duihuan.loadTextureNormal("ShopOfJiFen/btn_jilu_n.png");
                this.btn_duobao.loadTextureNormal("ShopOfJiFen/btn_duobao_n.png");
                this.btn_jiang.loadTextureNormal("ShopOfJiFen/btn_jiang_s.png");
            }
        }.bind(this);

        this.btn_duihuan.addTouchEventListener(function(sender, type){
            if(type == ccui.Widget.TOUCH_ENDED){
                selectFunc(1);
                this.reqDuiHuan(0, 15);
            }
        },this);

        this.btn_duobao.addTouchEventListener(function(sender, type){
            if(type == ccui.Widget.TOUCH_ENDED){
                selectFunc(2);
                this.reqDuoBao_huoJiang(1);
            }
        },this);

        this.btn_jiang.addTouchEventListener(function(sender, type){
            if(type == ccui.Widget.TOUCH_ENDED){
                selectFunc(3);
                this.reqDuoBao_huoJiang(2);
            }
        },this);
        selectFunc(1);
        this.node_duihuan.visible = true;
        this.node_duobao.visible = false;
        this.node_huojiang.visible = false;

        this.btn_duihuan.visible = false;
        this.btn_duobao.visible = false;
        this.btn_jiang.visible = false;


        // var btn_dianhua = _back.getChildByName("btn_dianhua");
        // btn_dianhua.visible = false;
        // btn_dianhua.addTouchEventListener(function(sender, type) {
        //     if (type == 2) {
        //         playEffect("ShopOfJiFen/click_btn", false);
        //         if (data) {
        //             var layer = new ShopOfJifen_remainInfoLayer();
        //             MjClient.Scene.addChild(layer);
        //         }
        //     }
        // }, this);

        this._cell = this.node_duihuan.getChildByName("cell_prize");
        this._cell.visible = false;

        this._listDataCount = 0;
        this._ListView = this.node_duihuan.getChildByName("ListView_Prize");
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
                        self.reqDuiHuan(self._listDataCount, 15);
                    }
                    _listViewState = 0;
                    break;
            }
        });

        this._cell2 = this.node_duobao.getChildByName("cell_duobao");
        this._cell2.visible = false;

        this._listDataCount2 = 0;
        this._ListView2 = this.node_duobao.getChildByName("ListView_duobao");
        var _listViewState2 = 0;
        this._ListView2.addCCSEventListener(function(sender, type) {
            switch (type) {
                case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                    if (_listViewState2 == 0) {
                        _listViewState2 = 1;
                    }
                    break;
                case ccui.ScrollView.EVENT_AUTOSCROLL_ENDED:
                    if (_listViewState2 == 1) {
                        self.reqDuoBao_huoJiang(1);
                    }
                    _listViewState2 = 0;
                    break;
            }
        });

        this._cell3 = this.node_huojiang.getChildByName("cell_prize");
        this._cell3.visible = false;

        this._listDataCount3 = 0;
        this._ListView3 = this.node_huojiang.getChildByName("ListView_Prize");
        var _listViewState3 = 0;
        this._ListView3.addCCSEventListener(function(sender, type) {
            switch (type) {
                case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                    if (_listViewState3 == 0) {
                        _listViewState3 = 1;
                    }
                    break;
                case ccui.ScrollView.EVENT_AUTOSCROLL_ENDED:
                    if (_listViewState3 == 1) {
                        self.reqDuoBao_huoJiang(2);
                    }
                    _listViewState3 = 0;
                    break;
            }
        });

        this._nullTip_text = _back.getChildByName("nullTip_text");
        this._nullTip_image = _back.getChildByName("nullTip_image");
        if (this._nullTip_text) {
            this._nullTip_text.visible = false;
            this._nullTip_image.visible = false;
        }

        this.reqDuiHuan();

    },
    createItem: function(oneData) {
        if (!cc.sys.isObjectValid(this._cell)) return;
        var copyNode = this._cell.clone();
        copyNode.visible = true;

        var _time = copyNode.getChildByName("Text_time");
        var _timeStr = MjClient.dateFormat(new Date(parseInt(oneData.createTime)), 'yyyy/MM/dd');
        _time.ignoreContentAdaptWithSize(true);
        _time.setString(_timeStr);
        var _time_1 = copyNode.getChildByName("Text_time_1");
        _time_1.ignoreContentAdaptWithSize(true);
        if (oneData.deliveryTime != null) {
            var _timeStr1 = MjClient.dateFormat(new Date(parseInt(oneData.deliveryTime)), 'yyyy/MM/dd');
            _time_1.setString(_timeStr1);
        } else {
            _time_1.setString("");
        }


        var _tai = copyNode.getChildByName("Text_tai");
        _tai.ignoreContentAdaptWithSize(true);
        if (oneData.status == 0) {
            _tai.setString("未发货");
        } else if (oneData.status == 1) {
            _tai.setString("已发货");
        } else if (oneData.status == 2) {
            _tai.setString("发货中");
        } else if (oneData.status == 9) {
            _tai.setString("发货失败");
        }

        var _content = copyNode.getChildByName("Text_content");
        _content.ignoreContentAdaptWithSize(true);
        _content.setString(oneData.title);

        var _beizhu = copyNode.getChildByName("Text_beizhu");
        if (_beizhu) {
            _beizhu.ignoreContentAdaptWithSize(true);
            // oneData.remark = "诉讼费的说法非的故事";
            _beizhu.setString(oneData.remark);
        }


        this._lastId = oneData.id;
        return copyNode;
    },

    createItem_duobao: function(oneData, number) {
        if (!cc.sys.isObjectValid(this._cell2)) return;
        var copyNode = this._cell2.clone();
        copyNode.visible = true;

        var _time = copyNode.getChildByName("text_time");
        var _timeStr = MjClient.dateFormat(new Date(parseInt(oneData.activityEndTime)), 'yyyy年MM月dd日hh:mm');
        _time.ignoreContentAdaptWithSize(true);
        if(oneData.activityEndTime)
            _time.setString(_timeStr + "结束");
        else
            _time.setString("本期活动正在进行中");
        var text_qima = copyNode.getChildByName("text_qima");
        text_qima.ignoreContentAdaptWithSize(true);
        text_qima.setString( "[第 " + oneData.activityPhaseNum +" 期]");

        var text_shopName = copyNode.getChildByName("text_shopName");
        text_shopName.ignoreContentAdaptWithSize(true);
        text_shopName.setString(oneData.productName);

        var text_playerName = copyNode.getChildByName("text_playerName");
        text_playerName.ignoreContentAdaptWithSize(true);
        text_playerName.setString(unescape(oneData.activityWinnerName));

        var text_myCode = copyNode.getChildByName("text_myCode");
        text_myCode.ignoreContentAdaptWithSize(true);
        text_myCode.setString( "我的夺宝码：" + oneData.activityPhaseCode);
        var btn_myCode = copyNode.getChildByName("btn_myCode");
        btn_myCode.myCodes = oneData.activityPhaseCode;
        btn_myCode.prizeCode = oneData.activityWinnerCode;
        btn_myCode.addTouchEventListener(function(sender, type){
            if(type == 2){
                var layer = new ShopOfJifen_myCodeLayer(sender);
                MjClient.Scene.addChild(layer);
            };
            
        },this);

        var icon_tubiao = copyNode.getChildByName("icon_tubiao");
        if(oneData.activityType === 1){
            icon_tubiao.loadTexture("ShopOfJiFen/duobao/miaosha.png");
        }else if(oneData.activityType === 2){
            icon_tubiao.loadTexture("ShopOfJiFen/duobao/renqi.png");
        }

        var text_luckCode = copyNode.getChildByName("text_luckCode");
        text_luckCode.ignoreContentAdaptWithSize(true);
        text_luckCode.setString("幸运码：" + oneData.activityWinnerCode);

        var iamge_jiang = copyNode.getChildByName("iamge_jiang");

        var iamge_jiang = copyNode.getChildByName("iamge_jiang");
        var url = oneData.productImage;
        if (!url) url = "ShopOfJiFen/avatar_mask.png";
        cc.loader.loadImg(url, {
            isCrossOrigin: true
        }, function(err, texture) {
            if (!err && texture && cc.sys.isObjectValid(iamge_jiang)) {
                 
                var headSprite = new cc.Sprite(texture);
                headSprite.setPosition(iamge_jiang.getContentSize().width / 2, iamge_jiang.getContentSize().height / 2);
                headSprite.setScale((iamge_jiang.getContentSize().width - 4) / iamge_jiang.getContentSize().width);
                iamge_jiang.addChild(headSprite);
                var _scale = iamge_jiang.height / headSprite.height;
                iamge_jiang.setScale(_scale);
            }
        });

        var _head = copyNode.getChildByName("bg_head");
        var url2 = oneData.activityWinnerHeadUrl;
        if (!url2) url2 = "ShopOfJiFen/avatar_mask.png";
        cc.loader.loadImg(url2, {
            isCrossOrigin: true
        }, function(err, texture) {
            if (!err && texture && cc.sys.isObjectValid(_head)) {
                var stencil = new cc.Sprite("ShopOfJiFen/avatar_mask.png");
                var clip = new cc.ClippingNode(stencil);
                clip.setAlphaThreshold(0);
                var avatar = new cc.Sprite(texture);
                clip.addChild(avatar);
                clip.setPosition(_head.width / 2, _head.height / 2);
                _head.addChild(clip);
            }
        });
        

        var btn_lq = copyNode.getChildByName("btn_lq");
        btn_lq.code = oneData.activityPhaseId;
        btn_lq.shareImage = oneData.productImage;
        btn_lq.title = oneData.productName;
        if(oneData.productType === 1 || oneData.productType === 2){
            btn_lq.type = 3;
        }else{
            btn_lq.type = 1;
        }
        btn_lq.addTouchEventListener(function(sender, type){
            if(type == 2){
                this.prizeBtn = sender;
                var str = "恭喜您夺宝成功，确认分享并领取吗？";
                var layer = new ShopOfJifen_changeInfoLayer(sender, str, 1);
                MjClient.Scene.addChild(layer);
                // if (cc.sys.OS_WINDOWS == cc.sys.os) {
                //     MjClient.wxShareImageToPYQ = true;
                //     postEvent("WX_SHARE_SUCCESS", {
                //         errCode: 0
                //     });
                // }

                // var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "ShopOfJiFen/participator_1.jpg";
                // MjClient.native.wxShareImageToPYQ(filePath);
                
                //this.reqLingQu();
            }
        },this);
        var text_yiguoqi = copyNode.getChildByName("text_yiguoqi");
        text_yiguoqi.visible = false;

        var icon_zhongjiang = copyNode.getChildByName("icon_zhongjiang");
        if(SelfUid() != oneData.activityWinnerId){
            btn_lq.visible = false;
            icon_zhongjiang.loadTexture("ShopOfJiFen/duobao/icon_wzj.png");
            icon_zhongjiang.x += 15;
        }else{
            btn_lq.visible = true;
            btn_lq.setTouchEnabled(false);
            icon_zhongjiang.loadTexture("ShopOfJiFen/duobao/icon_yzj.png")
            if(oneData.activityIsReceive){
                btn_lq.loadTextureNormal("ShopOfJiFen/btn_yiling.png");
            }else if(oneData.activityIsExpire){
                text_yiguoqi.visible = true;
                btn_lq.loadTextureNormal("ShopOfJiFen/btn_get2.png");
            }else{
                btn_lq.loadTextureNormal("ShopOfJiFen/btn_get.png");
                btn_lq.setTouchEnabled(true);
            }
            
        }
        icon_zhongjiang.visible = oneData.activityWinnerId;
        return copyNode;
    },

    createItem_huojiang: function(oneData) {
        if (!cc.sys.isObjectValid(this._cell3)) return;
        var copyNode = this._cell3.clone();
        copyNode.visible = true;

        var _time = copyNode.getChildByName("Text_time");
        _time.ignoreContentAdaptWithSize(true);
        _time.setString(oneData.buyingTime);
        var _time_1 = copyNode.getChildByName("Text_time_1");
        _time_1.ignoreContentAdaptWithSize(true);
        _time_1.setString(oneData.deliveryTime);


        var _tai = copyNode.getChildByName("Text_tai");
        _tai.ignoreContentAdaptWithSize(true);
        _tai.setString(oneData.deliveryStatus);

        var _content = copyNode.getChildByName("Text_content");
        _content.ignoreContentAdaptWithSize(true);
        _content.setString(oneData.productName);

        var _beizhu = copyNode.getChildByName("Text_beizhu");
        if (_beizhu) {
            _beizhu.ignoreContentAdaptWithSize(true);
            // oneData.remark = "诉讼费的说法非的故事";
            _beizhu.setString(oneData.deliveryMsg);
        }
        return copyNode;
    },
    addItems: function(data, type) {
        var isShow = false;
        if(type == 1){
            var _emailList = data;
            this._listDataCount += _emailList.length;
            for (var i = 0; i < _emailList.length; i++) {
                this._ListView.pushBackCustomItem(this.createItem(_emailList[i]));
            }

            if (this._listDataCount == 0) {
                if (this._nullTip_text) {
                    isShow = true;
                } else {
                    MjClient.showToast("已显示所有记录");
                }
            }
        }else if(type == 2){
            var _emailList = data;
            this._listDataCount2 += _emailList.length;
            for (var i = 0; i < _emailList.length; i++) {
                this._ListView2.pushBackCustomItem(this.createItem_duobao(_emailList[i], i));
            }

            if (this._listDataCount2 == 0) {
                if (this._nullTip_text) {
                    isShow = true;
                } else {
                    MjClient.showToast("已显示所有记录");
                }
            }

        }else if(type == 3){
            var _emailList = data;
            this._listDataCount3 += _emailList.length;
            for (var i = 0; i < _emailList.length; i++) {
                this._ListView3.pushBackCustomItem(this.createItem_huojiang(_emailList[i]));
            }

            if (this._listDataCount3 == 0) {
                if (this._nullTip_text) {
                    isShow = true;
                } else {
                    MjClient.showToast("已显示所有记录");
                }
            }
        }
        if (isShow) {
            this._nullTip_text.visible = true;
            this._nullTip_image.visible = true;
        } else {
            this._nullTip_text.visible = false;
            this._nullTip_image.visible = false;
        }
        
    },

    reqLingQu: function(param) {
        var self = this;
        var id = self.prizeBtn.code;
        param.phaseId = id;
        MjClient.gamenet.request("pkplayer.handler.treasureDraw", param,
            function(rtn) {
                cc.log(" ===== treasureDraw === " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                    MjClient.showToast("领取成功");
                    self.prizeBtn.setTouchEnabled(false);
                    self.prizeBtn.loadTextureNormal("ShopOfJiFen/btn_yiling.png");
                    if (MjClient.ShopOfJifen_mainUI) {
                        MjClient.ShopOfJifen_mainUI.reqTableMsg();

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

    reqDuiHuan: function() {
        var self = this;
        var _lastId = this._lastId;
        MjClient.gamenet.request("pkplayer.handler.integralRecords", {
                lastId: _lastId
            },
            function(rtn) {
                cc.log(" ===== integralRecords === " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                    self.addItems(rtn.data, 1);
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

    reqDuoBao_huoJiang: function(type) {
        var self = this;
        var _lastId = this._listDataCount2;
        if(type == 2){
            _lastId = this._listDataCount3;
        }
        cc.log("=== _lastId type",_lastId,type);
        MjClient.gamenet.request("pkplayer.handler.treasureBuyerPrizeList", {
            offset: _lastId,
            length: 20,
            type: type,
        },
            function (rtn) {
                cc.log(" ===== treasureBuyerPrizeList === " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                    if(type == 1){
                        self.addItems(rtn.data, 2);
                    }else if(type == 2){
                        self.addItems(rtn.data, 3);
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
    }
});

var ShopOfJifen_myCodeLayer = cc.Layer.extend({

    ctor: function(node) {
        this._super();
        var UI = ccs.load("ShopOfJiFen_myCode.json");
        this.addChild(UI.node);
        var self = this;
        this._data = node.myCodes;
        this._oneData = node.prizeCode;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1.2, 1.2], [0.5, 0.5], [0, 0]);

        var closeBtn = _back.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                playEffect("ShopOfJiFen/click_btn", false);
                self.removeFromParent();
            }
        }, this);

        this.scrollView_myCode = _back.getChildByName("scrollView_myCode");
        this.text_1 = _back.getChildByName("text_1");
        this.text_1.visible = false;
        var _heigh = Math.ceil(this._data.length / 4) * 25 + 100;
        if(_heigh <= 350) _heigh = 350;
        this.scrollView_myCode.setInnerContainerSize(cc.size(680, _heigh));
        this.scrollView_myCode.setClippingEnabled(true);

        var addFunc = function(start, end){
            for (var i = start; i < end; i++) {
                if(!this._data[i]) break;
                var _node = this.createItem(this._data[i]);
                var lie = i % 4;
                var hang = Math.floor(i / 4) + 1;
                var pos_x = lie * 170 + 100;
                var pos_y = _heigh - 25 * hang;
                _node.setPosition(cc.p(pos_x, pos_y));
                this.scrollView_myCode.addChild(_node);
            }
        }.bind(this);
        var geshu = 50;
        if(this._data.length > geshu){
            
            var cishu = Math.ceil(this._data.length /geshu) ;
            var runFunc = function(index){
                self.runAction(cc.sequence(cc.DelayTime(index * 0.1), cc.callFunc(function() {
                    addFunc(index * geshu,(index+1) * geshu);
                })));
            }
            for (let index = 0; index < cishu; index++) {
                runFunc(index);
            }
        }else{
            addFunc(0, this._data.length);
        }
        


    },
    createItem:function(oneData){
        if (!cc.sys.isObjectValid(this.text_1)) return;
        var copyNode = this.text_1.clone();
        copyNode.visible = true;
        copyNode.setString(oneData);
        cc.log("===== oneData this._oneData",oneData,this._oneData)
        if(oneData == this._oneData){
            cc.log("===== oneData WWWWWWWW")
            copyNode.setTextColor(cc.color(0xe6,0x00,0x12));
        }else{
            copyNode.setTextColor(cc.color(0x8c,0x15,0x15));
        }
        return copyNode;
    },

});

var ShopOfJifen_changeChooseLayer = cc.Layer.extend({

    ctor: function(data, allData) {
        this._super();
        var UI = ccs.load("ShopOfJiFen_info_0.json");
        this.addChild(UI.node);
        var self = this;
        this._data = data;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1.2, 1.2], [0.5, 0.5], [0, 0]);

        var closeBtn = _back.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                playEffect("ShopOfJiFen/click_btn", false);
                self.removeFromParent();
            }
        }, this);
        var btn_yes = _back.getChildByName("btn_yes");
        btn_yes.addTouchEventListener(function(sender, type){
            if(type == 2){
                var str = "确定消耗 " + data.price + "礼券兑换" + data.title;
                var layer = new ShopOfJifen_changeInfoLayer(data, str);
                MjClient.Scene.addChild(layer);
                self.removeFromParent();
            }
        });

        var Text_lijuan = btn_yes.getChildByName("Text_lijuan");
        Text_lijuan.ignoreContentAdaptWithSize(true);
        var _price = data.price;
        if (data.price >= 10E7) {
            _price = (data.price / 10E7).toFixed(2) + "亿";
        } else if (data.price >= 10E5) {
            _price = (data.price / 10E3).toFixed(2) + "万";
        }
        Text_lijuan.setString(_price + "");
        var Text_tile = _back.getChildByName("Text_tile");
        //Text_tile.ignoreContentAdaptWithSize(true);
        data.title = data.title.slice(0, 11);
        Text_tile.setString("商品名称："+data.title);

        var Text_xiangqing = _back.getChildByName("Text_xiangqing");
        //Text_xiangqing.ignoreContentAdaptWithSize(true);
        if(data.desc){
            Text_xiangqing.setString("商品详情："+data.desc);
        }else{
            Text_xiangqing.setString("商品详情：无");
        }

        var btn_yes2 = _back.getChildByName("btn_yes2");
        btn_yes2.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var str = "确定消耗 " + data.exchange.integral + "礼券+" + data.exchange.cash + "兑换" + data.title;
                var type = 0;
                if(data.exchange.cash > 0) type = 2;
                var layer = new ShopOfJifen_changeInfoLayer(data, str, type);
                MjClient.Scene.addChild(layer);
                self.removeFromParent();
            }
        });
        if(data.exchange){
            
            btn_yes2.visible = true;
            var Text_lijuan_2 = btn_yes2.getChildByName("Text_lijuan_2");
            Text_lijuan_2.ignoreContentAdaptWithSize(true);
            Text_lijuan_2.setString("" + data.exchange.integral);
            var Text_xianjin = btn_yes2.getChildByName("Text_xianjin");
            Text_xianjin.ignoreContentAdaptWithSize(true);
            Text_xianjin.setString("" + data.exchange.cash);
        }else{
            btn_yes2.visible = false;
            btn_yes.x += 140;
        }
        

        var bg_1 = _back.getChildByName("img_bg");
        bg_1.visible = false;
        var sprite_bg = new cc.Sprite("ShopOfJiFen/icon_empty.png");
        sprite_bg.setPosition(bg_1.getPosition());
        var imageUrl = data.image;
        cc.loader.loadImg(imageUrl ? imageUrl : "ShopOfJiFen/icon_empty.png", {
            isCrossOrigin: true
        }, function(err, img) {
            if (err) {
                cc.log(err);
            } else if (img && cc.sys.isObjectValid(sprite_bg)) {
                sprite_bg.setTexture(img);
            }
        });
        _back.addChild(sprite_bg);
    }
});

var ShopOfJifen_changeInfoLayer = cc.Layer.extend({

    ctor: function(data, str, type) {
        this._super();
        var UI = ccs.load("ShopOfJiFen_info.json");
        this.addChild(UI.node);
        allData = MjClient.ShopOfJifen_mainUI._data;
        var self = this;
        this._data = data;
        this._select = {};
        this._select.province = ""; 
        this._select.city = ""; 
        this._select.district = "";
        this._select.number = 1;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1.2, 1.2], [0.5, 0.5], [0, 0]);

        var closeBtn = _back.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, ed) {
            if (ed == 2) {
                playEffect("ShopOfJiFen/click_btn", false);
                self.removeFromParent();
            }
        }, this);

        var Text_tile = _back.getChildByName("Text_yes");
        Text_tile.ignoreContentAdaptWithSize(true);
        Text_tile.setString(str);

        this.bg_info = _back.getChildByName("bg_infolist");
        this.info_list = this.bg_info.getChildByName("info_list");
        this.info_list_2 = this.bg_info.getChildByName("info_list_2");
        this.info_list_3 = this.bg_info.getChildByName("info_list_3");
        // this.info_list.height = 435;
        // this.info_list.y += 13;
        this.info_cell = this.bg_info.getChildByName("info_cell");
        this.info_cell.setVisible(false);
        this.bg_info.visible = false;
        this.bg_info.setZOrder(1);
        var input_ren = _back.getChildByName("input_ren");
        this.input_ren = new cc.EditBox(cc.size(575, 42), new cc.Scale9Sprite("ShopOfJiFen/input_1.png"));
        this.input_ren.setFontColor(cc.color(0x8c, 0x15, 0x15));
        this.input_ren.setMaxLength(20);
        this.input_ren.setFontSize(22);
        this.input_ren.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_ren.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        if (data.type != 3) {
            this.input_ren.setPlaceHolder("兑换此物品可不填信息");
        } else {
            this.input_ren.setPlaceHolder("请输入收货人名字");
        }

        this.input_ren.setPlaceholderFontSize(20);
        this.input_ren.setPlaceholderFontColor(cc.color(0xff, 0xff, 0xff));
        this.input_ren.setPosition(input_ren.getContentSize().width / 2, input_ren.getContentSize().height / 2);
        input_ren.addChild(this.input_ren);
        if (allData.addressInfo && allData.addressInfo.realname) {
            this.input_ren.setString(allData.addressInfo.realname);
        }

        var input_number = _back.getChildByName("input_number");
        this.input_number = new cc.EditBox(cc.size(575, 42), new cc.Scale9Sprite("ShopOfJiFen/input_1.png"));
        this.input_number.setFontColor(cc.color(0x8c, 0x15, 0x15));
        this.input_number.setMaxLength(11);
        this.input_number.setFontSize(22);
        this.input_number.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_number.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this.input_number.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        if (data.type != 3) {
            this.input_number.setPlaceHolder("兑换此物品可不填信息");
        } else {
            this.input_number.setPlaceHolder("请输入收货人电话");
        }

        this.input_number.setPlaceholderFontSize(20);
        this.input_number.setPlaceholderFontColor(cc.color(0xff, 0xff, 0xff));
        this.input_number.setPosition(input_number.getContentSize().width / 2, input_number.getContentSize().height / 2);
        input_number.addChild(this.input_number);
        if (allData.addressInfo && allData.addressInfo.mobileNum) {
            this.input_number.setString(allData.addressInfo.mobileNum);
        }



        var input_dizhi_2 = _back.getChildByName("input_dizhi_2");
        input_dizhi_2.setTouchEnabled(true);
        input_dizhi_2.addTouchEventListener(function(sender, ed) {
            if (ed == 2) {
                this.bg_info.visible = true;
                this.fresh_listView();
            }
        }, this);
        var icon_arrow = input_dizhi_2.getChildByName("img_arrow");
        icon_arrow.setZOrder(2);
        this.input_dizhi_2 = new cc.EditBox(cc.size(575, 42), new cc.Scale9Sprite("ShopOfJiFen/input_1.png"));
        this.input_dizhi_2.setFontColor(cc.color(0x8c, 0x15, 0x15));
        this.input_dizhi_2.setMaxLength(50);
        this.input_dizhi_2.setFontSize(22);
        this.input_dizhi_2.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_dizhi_2.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        if (data.type != 3) {
            this.input_dizhi_2.setPlaceHolder("兑换此物品可不填信息");
        } else {
            this.input_dizhi_2.setPlaceHolder("所在地区");
        }

        this.input_dizhi_2.setPlaceholderFontSize(20);
        this.input_dizhi_2.setPlaceholderFontColor(cc.color(0xff, 0xff, 0xff));
        this.input_dizhi_2.setPosition(input_dizhi_2.getContentSize().width / 2, input_dizhi_2.getContentSize().height / 2);
        input_dizhi_2.addChild(this.input_dizhi_2);
        this.input_dizhi_2.setTouchEnabled(false);
        this.input_dizhi_2.setSwallowTouches(false);
        if (allData.addressInfo && allData.addressInfo.address) {
            var str = allData.addressInfo.address.split(",");
            this.input_dizhi_2.setString(str[0]);
        }

        if (allData.addressInfo && allData.addressInfo.addressCode) {
            var _address = allData.addressInfo.addressCode.split(",");
            if (_address[0] || _address[0] === 0) {
                this._select.province = _address[0];
            }
            if (_address[1] || _address[1] === 0) {
                this._select.city = _address[1];
            }
            if (_address[2] || _address[2] === 0) {
                this._select.district = _address[2];
            }
        }



        var input_dizhi = _back.getChildByName("input_dizhi");
        this.input_dizhi = new cc.EditBox(cc.size(575, 93), new cc.Scale9Sprite("ShopOfJiFen/input_2.png"));
        this.input_dizhi.setFontColor(cc.color(0x8c, 0x15, 0x15));
        this.input_dizhi.setMaxLength(50);
        this.input_dizhi.setFontSize(22);
        // this.input_dizhi.setPlaceholderFontSize(9);
        this.input_dizhi.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_dizhi.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        if (data.type != 3) {
            this.input_dizhi.setPlaceHolder("兑换此物品可不填信息");
        } else {
            this.input_dizhi.setPlaceHolder("如乡镇、街道、门牌号等");
        }
        this.input_dizhi.setPlaceholderFontSize(20);
        this.input_dizhi.setPlaceholderFontColor(cc.color(0xff, 0xff, 0xff));
        this.input_dizhi.setPosition(input_dizhi.getContentSize().width / 2, input_dizhi.getContentSize().height / 2);
        input_dizhi.addChild(this.input_dizhi);
        if (allData.addressInfo && allData.addressInfo.address) {
            var str = allData.addressInfo.address.split(",");
            this.input_dizhi.setString(str[1]);
        }

        var btn_yes = _back.getChildByName("btn_yes");
        var _imageUrl = data.shareImage;
        if(type === 1){
            data.title = "成功夺宝了" + data.title;
        }else{
            data.title = "免费兑换" + data.title;
        }
        cc.loader.loadImg(_imageUrl,   {
            isCrossOrigin :  true
        },  function(err, img) {
            if (err) {
                cc.log(err);
            } else if (img && sys.isObjectValid(self)) {
                var sprite_bg = new cc.Sprite("ShopOfJiFen/prize_1.png");
                sprite_bg.setTexture(img);
                ShopOfJiFen_share(data, sprite_bg);
            }
        });
        if(type === 1){
            btn_yes.loadTextureNormal("ShopOfJiFen/btn_shareGet.png");
        }else{
            btn_yes.loadTextureNormal("ShopOfJiFen/btn_yes.png");
        }

        btn_yes.addTouchEventListener(function(sender, ed) {
            if (ed == 2) {
                var str_1 = this.input_number.getString();
                var str_2 = this.input_dizhi.getString();
                var str_3 = this.input_ren.getString();
                var str_4 = this.input_dizhi_2.getString();
                if (!str_1 || !str_2 || !str_3 || !str_4) {
                    if (data.type == 3) {
                        MjClient.showToast("请填写完整的地址信息！");
                        return;
                    }

                }
                if (this._select.province === "" || this._select.city === "" ||this._select.district === "") {
                    if (data.type == 3) {
                        MjClient.showToast("请填写完整所在地区地址！");
                        return;
                    }
                }
                if(type == 2)
                {
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_jifenShop_xianjin_duihuan", {uid:SelfUid()});

                    if(!MjClient.systemConfig ||!MjClient.systemConfig.recharge)
                    {
                        return MjClient.showToast("获取支付数据失败");
                    }

                    var itagID = sender.getTag();
                    if (MjClient.systemConfig.recharge.length > 1) {
                        cc.log("rechange 长度 > 1 " + itagID);
                        MjClient.Scene.addChild(new payWayLayer(function(platform){
                            MjClient.recharge(itagID, parseInt(platform));
                        }));
                    }
                    else {
                        MjClient.recharge(itagID, parseInt(MjClient.systemConfig.recharge[0].platform))
                    }
                }else{
                    playEffect("ShopOfJiFen/click_btn", false);
                    btn_yes.setTouchEnabled(false);
                    if (cc.sys.OS_WINDOWS == cc.sys.os) {
                        MjClient.wxShareImageToPYQ = true;
                        postEvent("WX_SHARE_SUCCESS", {
                            errCode: 0
                        });
                    }
                    var _filePath = jsb.fileUtils.getWritablePath() + "wxcapture_screen.jpg";
                    MjClient.native.wxShareImageToPYQ(_filePath);

                }



                

            }
        }, this);

        UIEventBind(null, this, "rechargeResult", function () {
            btn_yes.setTouchEnabled(false);
            if (cc.sys.OS_WINDOWS == cc.sys.os) {
                MjClient.wxShareImageToPYQ = true;
                postEvent("WX_SHARE_SUCCESS", {
                    errCode: 0
                });
            }
            var _filePath = jsb.fileUtils.getWritablePath() + "wxcapture_screen.jpg";
            MjClient.native.wxShareImageToPYQ(_filePath);
        });

        UIEventBind(null, btn_yes, "WX_SHARE_SUCCESS", function(data) {
            if (parseInt(data.errCode) == 0) {

                var province = self._select.province;
                var city = self._select.city;
                var district = self._select.district;

                var param = {};
                param.realname = self.input_ren.getString();
                param.mobileNum = self.input_number.getString();
                param.address = self.input_dizhi_2.getString() + "," + self.input_dizhi.getString();
                param.addressCode = province + "," + city + "," + district;
                param.id = self._data.id;
                param.category = self._data.category;
                param.title = self._data.title;
                
                if (type == 1) {
                    var _node = MjClient.ShopOfJifen_listUI;
                    if (cc.sys.isObjectValid(_node)) {
                        MjClient.wxShareImageToPYQ = false;
                        if (parseInt(data.errCode) == 0) {
                            _node.reqLingQu(param);
                        }
                    }
                } else {
                    if (MjClient.ShopOfJifen_mainUI) {
                        MjClient.ShopOfJifen_mainUI.reqExchange(param);

                    }
                }
                
                self.removeFromParent();


            }
            MjClient.wxShareImageToPYQ = false;
            if (MjClient.ShopOfJifen_mainUI)
                MjClient.ShopOfJifen_mainUI._shareType = 0;

        });

        this.btn_sheng = this.bg_info.getChildByName("btn_1");
        this.btn_sheng.addTouchEventListener(function(sender, ed) {
            if (ed == 2) {
                this._select.number = 1;
                this.addItems(this._select);
            }
        }, this);
        this.btn_shi = this.bg_info.getChildByName("btn_2");
        this.btn_shi.addTouchEventListener(function(sender, ed) {
            if (ed == 2) {
                this._select.number = 2;
                this.addItems(this._select);
            }
        }, this);

        this.btn_xian = this.bg_info.getChildByName("btn_3");

        this.btn_close = this.bg_info.getChildByName("btn_close");
        this.btn_close.addTouchEventListener(function(sender, ed){
            if(ed == 2){
                this.bg_info.visible = false;
            }
        },this)


        this.btn_yes2 = this.bg_info.getChildByName("btn_yes2");
        this.btn_yes2.addTouchEventListener(function(sender, ed) {
            if (ed == 2) {
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
        // if (this._select.district || this._select.district === 0) {
        //     this._select.number = 3;
        // }else if (this._select.city || this._select.city === 0) {
        //     this._select.number = 2;
        // }else 
        // {
        //     this._select.number = 1;
        // }
        this._select.number = 1;
        
        this.addItems(this._select);
    },

    select_district: function(number) {
        this.btn_sheng.loadTextureNormal("ShopOfJiFen/btnCity_n.png");
        this.btn_shi.loadTextureNormal("ShopOfJiFen/btnCity_n.png");
        this.btn_xian.loadTextureNormal("ShopOfJiFen/btnCity_n.png");
        if (number == 1) {
            this.btn_sheng.loadTextureNormal("ShopOfJiFen/btnCity_s.png");
            this.btn_sheng.setTitleText("请选择省份");
            this.btn_shi.setTitleText("请选择城市");
            this.btn_xian.setTitleText("请选择县/区");
        } else if (number == 2) {
            this.btn_shi.loadTextureNormal("ShopOfJiFen/btnCity_s.png");
            this.btn_shi.setTitleText("请选择城市");
            this.btn_xian.setTitleText("请选择县/区");
        } else if (number >= 3) {
            this.btn_xian.loadTextureNormal("ShopOfJiFen/btnCity_s.png");
        }
    },
    addItems: function(data) {
        var dataList = null;
        var i = 0;
        this.info_list_3.removeAllItems();
        if (data.number == 1) {
            this.info_list.removeAllItems();
            this.select_district(data.number);
            this._select.city = "";
            this._select.district = "";
            dataList = GameConfig_area.root.province;
            for (i = 0; i < dataList.length; i++) {
                this.info_list.pushBackCustomItem(this.createItems(dataList[i], i, 1, dataList.length));
            }
            this.info_list_2.removeAllItems();
        } else if (data.number == 2 && data.province >= 0) {
            var _area = GameConfig_area.root.province[data.province];
            if (!_area) {
                return;
            }
            this.select_district(data.number);
            this.info_list_2.removeAllItems();
            if (_area.name.length > 11) {
                var _name = _area.name.substring(0, 11);
                _name += "...";
                this.btn_sheng.setTitleText(_name);
            } else {
                this.btn_sheng.setTitleText(_area.name);
            }
            this._select.district = "";
            dataList = _area.city;
            for (i = 0; i < dataList.length; i++) {
                this.info_list_2.pushBackCustomItem(this.createItems(dataList[i], i, 2, dataList.length));
            }
        } else if (data.number == 3 && data.province >= 0 && data.city >= 0) {
            var area = GameConfig_area.root.province[data.province].city[data.city];
            if (!area) {
                return;
            }
            this.select_district(data.number);
            this.info_list_3.removeAllItems();
            var _area = GameConfig_area.root.province[data.province];
            if (_area.name.length > 11) {
                var _name = _area.name.substring(0, 11);
                _name += "...";
                this.btn_sheng.setTitleText(_name);
            } else {
                this.btn_sheng.setTitleText(_area.name);
            }
            if (area.name.length > 11) {
                var _name = area.name.substring(0, 11);
                _name += "...";
                this.btn_shi.setTitleText(_name);
            } else {
                this.btn_shi.setTitleText(area.name);
            }
            var area2 = _area.city[data.city].district[data.district];
            if (area2) {
                if (area2.name.length > 11) {
                    var _name2 = area2.name.substring(0, 11);
                    _name2 += "...";
                    this.btn_xian.setTitleText(_name2);
                } else {
                    this.btn_xian.setTitleText(area2.name);
                }
            }
            
            dataList = area.district;
            for (i = 0; i < dataList.length; i++) {
                this.info_list_3.pushBackCustomItem(this.createItems(dataList[i], i, 3, dataList.length));
            }
        } else if (data.number == 4) {
            this.select_district(data.number);
            var area_1 = GameConfig_area.root.province[data.province];
            var str = area_1.name + area_1.city[data.city].name + area_1.city[data.city].district[data.district].name;
            this.input_dizhi_2.setString(str);
            this.bg_info.visible = false;
            var area2 = area_1.city[data.city].district[data.district];
            if (area2.name.length > 11) {
                var _name2 = area2.name.substring(0, 11);
                _name2 += "...";
                this.btn_xian.setTitleText(_name2);
            } else {
                this.btn_xian.setTitleText(area2.name);
            }

            
        }
    },


    createItems: function(oneData, number, number_area, dataLen) {
        var self = this;
        if(!this["area_" + number_area]) this["area_" + number_area] = {};
        var copyNode = this.info_cell.clone();
        copyNode.visible = true;
        copyNode.getChildByName("Image_bg").visible = false;
        copyNode.setTouchEnabled(true);
        copyNode.setTag(number);
        copyNode.len = dataLen;
        copyNode.addTouchEventListener(function(sender, ed) {
            if (ed == 2) {
                var tag = sender.getTag();
                if (number_area == 1) {
                    this._select.province = tag;

                } else if (number_area == 2) {
                    this._select.city = tag;
                } else if (number_area == 3) {
                    this._select.district = tag;
                }
                for (var i = 0; i < sender.len; i++) {
                    self["area_" + number_area][i] .getChildByName("Image_bg").visible = false;
                    if(i == tag)
                        self["area_" + number_area][i] .getChildByName("Image_bg").visible = true;
                    
                }
                
                this._select.number = number_area + 1;
                this.addItems(this._select);

            }
        }, this);
        var text = copyNode.getChildByName("Text_1");
        if (oneData.name.length > 9) {
            var _name = oneData.name.substring(0, 8);
            _name += "...";
            text.setString(_name);
        } else {
            text.setString(oneData.name);
        }

        
        
        this["area_" + number_area][number] = copyNode;
        return copyNode;
    },
});

var ShopOfJifen_remainInfoLayer = cc.Layer.extend({

    ctor: function(DBData) {
        this._super();
        var UI = ccs.load("ShopOfJiFen_info_2.json");
        this.addChild(UI.node);
        var self = this;
        var allData = MjClient.ShopOfJifen_mainUI._data;
        this._select = {};
        this._select.province = ""; 
        this._select.city = ""; 
        this._select.district = "";
        this._select.number = 1;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);

        var closeBtn = _back.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                playEffect("ShopOfJiFen/click_btn", false);
                self.removeFromParent();
            }
        });

        this.bg_info = _back.getChildByName("bg_infolist");
        this.info_list = this.bg_info.getChildByName("info_list");
        this.info_list_2 = this.bg_info.getChildByName("info_list_2");
        this.info_list_3 = this.bg_info.getChildByName("info_list_3");
        this.info_list.height = 435;
        this.info_list.y += 13;
        this.info_cell = this.bg_info.getChildByName("info_cell");
        this.info_cell.setVisible(false);
        this.bg_info.visible = false;
        this.bg_info.setZOrder(1);

        var input_ren = _back.getChildByName("input_ren");
        this.input_ren = new cc.EditBox(cc.size(575, 42), new cc.Scale9Sprite("ShopOfJiFen/input_1.png"));
        this.input_ren.setFontColor(cc.color(0x8c, 0x15, 0x15));
        this.input_ren.setMaxLength(20);
        this.input_ren.setFontSize(20);
        this.input_ren.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_ren.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        this.input_ren.setPlaceHolder("请输入收货人名字");
        this.input_ren.setPlaceholderFontSize(18);
        this.input_ren.setPosition(input_ren.getContentSize().width / 2, input_ren.getContentSize().height / 2);
        input_ren.addChild(this.input_ren);
        if (allData.addressInfo && allData.addressInfo.realname) {
            this.input_ren.setString(allData.addressInfo.realname);
        }


        var input_number = _back.getChildByName("input_number");
        this.input_number = new cc.EditBox(cc.size(575, 42), new cc.Scale9Sprite("ShopOfJiFen/input_1.png"));
        this.input_number.setFontColor(cc.color(0x8c, 0x15, 0x15));
        this.input_number.setMaxLength(11);
        this.input_number.setFontSize(20);
        this.input_number.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_number.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this.input_number.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        this.input_number.setPlaceHolder("请输入收货人电话");
        this.input_number.setPlaceholderFontSize(18);
        this.input_number.setPosition(input_number.getContentSize().width / 2, input_number.getContentSize().height / 2);
        input_number.addChild(this.input_number);
        if (allData.addressInfo && allData.addressInfo.mobileNum) {
            this.input_number.setString(allData.addressInfo.mobileNum);
        }

        var input_dizhi = _back.getChildByName("input_dizhi");
        this.input_dizhi = new cc.EditBox(cc.size(575, 93), new cc.Scale9Sprite("ShopOfJiFen/input_2.png"));
        this.input_dizhi.setFontColor(cc.color(0x8c, 0x15, 0x15));
        this.input_dizhi.setMaxLength(50);
        this.input_dizhi.setFontSize(20);
        this.input_dizhi.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_dizhi.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        this.input_dizhi.setPlaceHolder("如乡镇、街道、门牌号等");
        this.input_dizhi.setPlaceholderFontSize(18);
        this.input_dizhi.setPosition(input_dizhi.getContentSize().width / 2, input_dizhi.getContentSize().height / 2);
        input_dizhi.addChild(this.input_dizhi);
        if (allData.addressInfo && allData.addressInfo.address) {
            var str = allData.addressInfo.address.split(",");
            this.input_dizhi.setString(str[1]);
        }

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
        this.input_dizhi_2 = new cc.EditBox(cc.size(575, 42), new cc.Scale9Sprite("ShopOfJiFen/input_1.png"));
        this.input_dizhi_2.setFontColor(cc.color(0x8c, 0x15, 0x15));
        this.input_dizhi_2.setMaxLength(50);
        this.input_dizhi_2.setFontSize(20);
        this.input_dizhi_2.setPlaceHolder("所在地区");
        this.input_dizhi_2.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_dizhi_2.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        if (allData.addressInfo && allData.addressInfo.address) {
            var str = allData.addressInfo.address.split(",");
            this.input_dizhi_2.setString(str[0]);
            
        }

        if (allData.addressInfo && allData.addressInfo.addressCode) {
            var _address = allData.addressInfo.addressCode.split(",");
            if (_address[0] || _address[0] === 0) {
                this._select.province = _address[0];
            }
            if (_address[1] || _address[1] === 0) {
                this._select.city = _address[1];
            }
            if (_address[2] || _address[2] === 0) {
                this._select.district = _address[2];
            }
        }

        this.input_dizhi_2.setPlaceholderFontSize(18);
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

                if(DBData){
                    DBData.receiverName = this.input_ren.getString();
                    DBData.receiverPhone = this.input_number.getString();
                    DBData.receiverAddress = this.input_dizhi_2.getString() + "," + this.input_dizhi.getString();
                    DBData.receiverAddressCode = province + "," + city + "," + district;
                    if(MjClient.ShopOfJifen_mainUI){
                        MjClient.ShopOfJifen_mainUI.reqTreasureExchange(DBData);
                    }
                }else {
                    var param = {};
                    param.realname = this.input_ren.getString();
                    param.mobileNum = this.input_number.getString();
                    param.address = this.input_dizhi_2.getString() + "," + this.input_dizhi.getString();
                    param.addressCode = province + "," + city + "," + district;
                    if (MjClient.ShopOfJifen_mainUI) {
                        MjClient.ShopOfJifen_mainUI.reqRemainInfo(param);
                    }
                }
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

        this.btn_close = this.bg_info.getChildByName("btn_close");
        this.btn_close.addTouchEventListener(function(sender, type){
            if(type == 2){
                this.bg_info.visible = false;
            }
        },this)
    },

    fresh_listView: function(number) {
        // if (this._select.district || this._select.district === 0) {
        //     this._select.number = 3;
        // }else if (this._select.city || this._select.city === 0) {
        //     this._select.number = 2;
        // }else 
        // {
        //     this._select.number = 1;
        // }
        this._select.number = 1;
        this.addItems(this._select);
        
    },
    select_district: function(number) {
        this.btn_sheng.loadTextureNormal("ShopOfJiFen/btnCity_n.png");
        this.btn_shi.loadTextureNormal("ShopOfJiFen/btnCity_n.png");
        this.btn_xian.loadTextureNormal("ShopOfJiFen/btnCity_n.png");
        if (number == 1) {
            this.btn_sheng.loadTextureNormal("ShopOfJiFen/btnCity_s.png");
            this.btn_sheng.setTitleText("请选择省份");
            this.btn_shi.setTitleText("请选择城市");
            this.btn_xian.setTitleText("请选择县/区");
        } else if (number == 2) {
            this.btn_shi.loadTextureNormal("ShopOfJiFen/btnCity_s.png");
            this.btn_shi.setTitleText("请选择城市");
            this.btn_xian.setTitleText("请选择县/区");
        } else if (number >= 3) {
            this.btn_xian.loadTextureNormal("ShopOfJiFen/btnCity_s.png");
        }
    },
    addItems: function(data) {
        var dataList = null;
        var i = 0;
        this.info_list_3.removeAllItems();
        if (data.number == 1) {
            this.info_list.removeAllItems();
            this.select_district(data.number);
            this._select.city = "";
            this._select.district = "";
            dataList = GameConfig_area.root.province;
            for (i = 0; i < dataList.length; i++) {
                this.info_list.pushBackCustomItem(this.createItems(dataList[i], i, 1, dataList.length));
            }
            this.info_list_2.removeAllItems();
        } else if (data.number == 2 && data.province >= 0) {
            var _area = GameConfig_area.root.province[data.province];
            if (!_area) {
                return;
            }
            this.select_district(data.number);
            this.info_list_2.removeAllItems();
            if (_area.name.length > 11) {
                var _name = _area.name.substring(0, 11);
                _name += "...";
                this.btn_sheng.setTitleText(_name);
            } else {
                this.btn_sheng.setTitleText(_area.name);
            }
            this._select.district = "";
            dataList = _area.city;
            for (i = 0; i < dataList.length; i++) {
                this.info_list_2.pushBackCustomItem(this.createItems(dataList[i], i, 2, dataList.length));
            }
        } else if (data.number == 3 && data.province >= 0 && data.city >= 0) {
            var area = GameConfig_area.root.province[data.province].city[data.city];
            if (!area) {
                return;
            }
            this.select_district(data.number);
            this.info_list_3.removeAllItems();
            var _area = GameConfig_area.root.province[data.province];
            if (_area.name.length > 11) {
                var _name = _area.name.substring(0, 11);
                _name += "...";
                this.btn_sheng.setTitleText(_name);
            } else {
                this.btn_sheng.setTitleText(_area.name);
            }
            if (area.name.length > 11) {
                var _name = area.name.substring(0, 11);
                _name += "...";
                this.btn_shi.setTitleText(_name);
            } else {
                this.btn_shi.setTitleText(area.name);
            }
            var area2 = _area.city[data.city].district[data.district];
            if (area2) {
                if (area2.name.length > 11) {
                    var _name2 = area2.name.substring(0, 11);
                    _name2 += "...";
                    this.btn_xian.setTitleText(_name2);
                } else {
                    this.btn_xian.setTitleText(area2.name);
                }
            }
            
            dataList = area.district;
            for (i = 0; i < dataList.length; i++) {
                this.info_list_3.pushBackCustomItem(this.createItems(dataList[i], i, 3, dataList.length));
            }
        } else if (data.number == 4) {
            this.select_district(data.number);
            var area_1 = GameConfig_area.root.province[data.province];
            var str = area_1.name + area_1.city[data.city].name + area_1.city[data.city].district[data.district].name;
            this.input_dizhi_2.setString(str);
            this.bg_info.visible = false;
            var area2 = area_1.city[data.city].district[data.district];
            if (area2.name.length > 11) {
                var _name2 = area2.name.substring(0, 11);
                _name2 += "...";
                this.btn_xian.setTitleText(_name2);
            } else {
                this.btn_xian.setTitleText(area2.name);
            }

            
        }
    },


    createItems: function(oneData, number, number_area, dataLen) {
        var self = this;
        if(!this["area_" + number_area]) this["area_" + number_area] = {};
        var copyNode = this.info_cell.clone();
        copyNode.visible = true;
        copyNode.getChildByName("Image_bg").visible = false;
        copyNode.setTouchEnabled(true);
        copyNode.setTag(number);
        copyNode.len = dataLen;
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
                for (var i = 0; i < sender.len; i++) {
                    self["area_" + number_area][i] .getChildByName("Image_bg").visible = false;
                    if(i == tag)
                        self["area_" + number_area][i] .getChildByName("Image_bg").visible = true;
                    
                }
                
                this._select.number = number_area + 1;
                this.addItems(this._select);

            }
        }, this);
        var text = copyNode.getChildByName("Text_1");
        if (oneData.name.length > 9) {
            var _name = oneData.name.substring(0, 8);
            _name += "...";
            text.setString(_name);
        } else {
            text.setString(oneData.name);
        }

        
        
        this["area_" + number_area][number] = copyNode;
        return copyNode;
    },

});

var ShopOfJifen_ruleLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var UI = ccs.load("ShopOfJiFen_rule.json");
        this.addChild(UI.node);
        var self = this;

        var block = UI.node.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = UI.node.getChildByName("back");
        setWgtLayout(back, [1.0, 1.0], [0.5, 0.5], [0, 0]);
        this.back = back;

        var closeBtn = back.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                playEffect("ShopOfJiFen/click_btn", false);
                self.removeFromParent();
            }
        });
        var _list = back.getChildByName("contentScrollView");
        //_list.setInnerContainerSize(cc.size(610, 30 * 6));
        // _list.setScrollBarOpacity(0);
        var title = _list.getChildByName("title1");
        var _txt = "";
        if (MjClient.APP_TYPE.BDHYZP == MjClient.getAppType() || MjClient.APP_TYPE.QXXXGHZ == MjClient.getAppType()) {
            _txt = "北斗";
        } else if (MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType()) {
            _txt = "天天";
        } else if (MjClient.APP_TYPE.TXJINZHONGMJ == MjClient.getAppType()) {
            _txt = "天星";
        } else if (MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
            _txt = "兜趣";
        } else if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG){
            _txt = "旺旺";
        } else if(MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ){
            _txt = "快乐";
        } else {
            _txt = "牌友联盟";
        }
        var _colorNormal = "#8c1515";
        var _colorRed = "#D3262E";
        // title.ignoreContentAdaptWithSize(true);
        var str = "总则：\n" +
            "①　完成每日任务后需手动领取礼券，未领取的礼券将于每日0点清零，总礼券可累加。\n" +
            "②　所有商品兑换成功后无法退换。\n" +
            "③　实物商品将于兑换成功后7个工作日内发货，（如遇节假日将顺延），礼券奖励即时到账。\n" +
            "④　一经购买，不支持退货，商品如若质量问题请联系客服登记换货。\n" +
            "⑤　请如实填写收货地址以及联系电话，确保能正常收货。";
  
        title.setString(str);
        title.setFontName("fonts/lanting.TTF");
        title.height = title.getVirtualRenderer().height;

        var str4 = "最迟于6月30日23：59结束前兑换与您礼券相对应的商品。过期一律视为自动放弃。\n"+
            "普通兑换规则：\n" +
            "①　每人每天限兑换一次。\n" +
            "②　每个商品有每日兑换数量上限，当天兑完即止。\n" +
            "礼券夺宝规则：\n" +
            "①　每次夺宝都会获得一个随机“夺宝码”，系统会从已产生的夺宝码中随机抽取1个作为本期的幸运码，投入越多，中奖几率越大。\n" +
            "②　夺宝开奖方式分为2种：\n" +
            "【定时开奖】达到指定的开奖时间即可开奖。\n" +
            "【满人次开奖】每期达到指定参与人次即可开奖。\n" +
            "③　中奖用户需主动领取奖品，奖品保留30天，若30天仍未领取，则默认放弃。\n" +
            "④　在夺宝状态中的商品下架，将自动返还参与夺宝的礼券。\n";
        var _dataList2 = [
                ["⑥　", "fonts/lanting.TTF", 18, _colorNormal],
                ["兑换商城礼券每年6月30日23：59进行清零"  , "fonts/lanting.TTF", 18, _colorRed],
                ["（清空上一自然年累计的所有礼券），请广大代理玩家"+ str4, "fonts/lanting.TTF" , 18, _colorNormal],
            ];
        var _richText = COMMON_UI.RichText(_dataList2,title);
        _list.addChild(_richText);
        var tipText = back.getChildByName("tipText");
        tipText.setString("活动一切解释权归" + _txt + "棋牌所有，如有疑问请点击游戏主页的“咨询”联系客服进行咨询。");


    },
});

var ShopOfJifen_ktvBack = cc.Layer.extend({
    ctor: function(data) {
        this._super();
        var UI = ccs.load("ShopOfJiFen_ktvBack.json");
        this.addChild(UI.node);
        var self = this;

        var block = UI.node.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = UI.node.getChildByName("back");
        setWgtLayout(back, [1.5, 1.5], [0.5, 0.5], [0, 0]);
        this.back = back;

        var closeBtn = back.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                playEffect("ShopOfJiFen/click_btn", false);
                self.removeFromParent();
            }
        });
        var _list = back.getChildByName("contentScrollView");
        _list.setInnerContainerSize(cc.size(610, 30 * 10));
        // _list.setScrollBarOpacity(0);
        
        var title = _list.getChildByName("title1");        
        var str = "                                         兑换成功\n" +
            "恭喜您，成功兑换K歌之王  <  " + data + "  >\n" +
            "我们将于1-3个工作日内将电子码发至您的邮箱和兑换记录处，届时请你注意查收。\n" +
            "温馨提示：请您提前致电KTV预定包厢。出示电子码给KTV工作人员登记即可。\n" +
            "K歌之王地址：邵阳市大祥区敏州东路诚信家园4号楼（地税局斜对面）\n" +
            "K歌之王电话：0739-2918888 2928888\n";
        title.setString(str);
        title.setPositionY(30 * 10);
        title.setContentSize(600, 300);
        var tipText = back.getChildByName("tipText");
        tipText.setString("如有疑问请关注公众号（" + MjClient.systemConfig.gongzhonghao + "）进行咨询");


    },
});


var ShopOfJifen_actLayer = cc.Layer.extend({
    onEnter: function() {
        this._super();
    },

    onExit: function() {
        this._super();
    },
    ctor: function() {
        this._super();

        var UI = ccs.load("ShopOfJiFen_act.json");
        this.addChild(UI.node);
        var self = this;

        var block = UI.node.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = UI.node.getChildByName("back");
        setWgtLayout(back, [1, 1], [0.5, 0], [0, 0]);
        this.back = back;

        var starParticle1 = new cc.ParticleSystem("ShopOfJiFen/fly_coin.plist");
        starParticle1.setPosition(back.getContentSize().width / 2, back.getContentSize().height / 2);
        back.addChild(starParticle1);

        this._cell = back.getChildByName("icon_money");
        this._cell.visible = false;

        var bg_1 = back.getChildByName("bg_1");
        bg_1.visible = false;

        // for (var i = 0; i < 100; i++) {
        //     cc.log(" ====== wwww ",i)
        //     var icon = this._cell.clone();
        //     icon.visible = true;
        //     var rat = Math.random()  * 360;
        //     cc.log(" ====== rat",rat)
        //     icon.setRotation(rat);
        //     var rat_1 = Math.random();
        //     var rat_x ;
        //     if (rat_1 < 0.35 ) {
        //         rat_x = Math.random() > 0.7 ? rat_1 : rat_1*2;
        //     }else if (rat_1 > 0.7) {
        //         rat_x = Math.random() > 0.7 ? rat_1 : rat_1 * 0.5;
        //     }else {
        //         rat_x = rat_1;
        //     }
        //     rat_x = rat_x * 600;

        //     icon.setPositionX(rat_x);
        //     var rat_y = Math.random() * 80;
        //     if (rat_x >200 && rat_x < 400) {
        //         rat_y = rat_y * 1.9;
        //     }
        //     icon.runAction(cc.sequence(cc.delayTime(0.01*i),cc.moveTo(0.3,cc.p(rat_x,rat_y))));
        //     back.addChild(icon);
        // }
        this.runAction(cc.sequence(cc.delayTime(2.0), cc.callFunc(function() {
            self.removeFromParent();
        })));


    },
});

var ShopOfJiFen_share = function(data, sp) {

    MjClient.block();
    var fileName = "wxcapture_screen.jpg";

    var ui = ccs.load("ShopOfJiFen_share.json");
    var node = ui.node;
    MjClient.Scene.addChild(node);
    node.setZOrder(-10);

    var bg = node.getChildByName("back");

    var _img_ma = bg.getChildByName("Image_prize");
    _img_ma.setVisible(false);

    var sprite_bg = sp;
    var pos = _img_ma.getPosition();
    sprite_bg.setPosition(pos);
    bg.addChild(sprite_bg);

    var text_name = bg.getChildByName("text_name");
    text_name.ignoreContentAdaptWithSize(true);
    text_name.setString(data.title);

    //保存成图片
    MjClient.saveNodeToImage(bg, fileName, function(pnode, savepath) {
        if (cc.sys.isObjectValid(node)) {
            node.removeFromParent();
        }
        cc.log(" ====== savepath ", savepath);
        // 分享图片到微信
        // MjClient.shareImageToMultiPlatform(savepath);

        MjClient.unblock();
    });


};


var ShopOfJifen_DBDetailLayer = cc.Layer.extend({
    _data:null,
    _isFirst:true,
    ctor: function (data) {
        this._super();
        var UI = ccs.load("ShopOfJiFen_DB_detail.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        this._data = JSON.parse(JSON.stringify(data));
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1,1],[0.5,0.5],[0,0]);

        //关闭按钮
        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        var btnDBnum = this._back.getChildByName("btn_DBnum");
        btnDBnum.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                MjClient.Scene.addChild(new ShopOfJifen_DBCodeLayer(this._data.activityPhaseId));
            }
        }, this);

        var btnHuojiangjilv = this._back.getChildByName("btn_huojiangjilv");
        btnHuojiangjilv.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                MjClient.Scene.addChild(new ShopOfJifen_DBRecordLayer(this._data.productId));
            }
        }, this);

        var textNum = this._back.getChildByName("Image_num_time").getChildByName("Text_num");
        textNum.ignoreContentAdaptWithSize(true);
        textNum.setString("1");

        UIEventBind(null, this, "exchangeMall", function(data) {
            if(self._data.productId == data.productId){
                if(data.type == 1){
                    self._data.activityWinnerId = data.winnerId;
                    self._data.activityWinnerName = data.winnerName;
                    self._data.activityWinnerHeadUrl = data.WinnerHeadUrl;
                    self._data.activityWinnerCode = data.winnerCode;
                    self._data.activityBuyNum = data.buyNum;
                    self._data.activityPhaseId = data.phaseId;
                    self._data.productPhaseNum = data.productPhaseNum;
                    self._data.activityPhaseNum = data.activityPhaseNum;
                    self._data.activityEndTime = data.endTime;
                }else if(data.type == 2){
                    self._data.activityCurrentUser = data.members;
                    self._data.activitySurplusTime = data.surplusTime;
                    self._data.activityWinnerId = 0;
                    self._data.activityPhaseId = data.phaseId;
                    self._data.productPhaseNum = data.productPhaseNum;
                    self._data.activityPhaseNum = data.activityPhaseNum;
                }
                self.refreshUI();
            }
        });

        this.refreshUI(true);

        return true;
    },

    refreshUI:function (isSchdul) {
        var self = this;
        var rewardDi = this._back.getChildByName("reward_di");
        var reward = rewardDi.getChildByName("reward");
        var biaoqian = rewardDi.getChildByName("biaoqian");
        var textTitle = this._back.getChildByName("Text_title");
        textTitle.ignoreContentAdaptWithSize(true);
        textTitle.setString(this._data.productName);
        var textQishu = this._back.getChildByName("Text_qishu");
        textQishu.ignoreContentAdaptWithSize(true);
        textQishu.setString("[第" + this._data.activityPhaseNum + "/" + this._data.productPhaseNum + "期]");
        var textDetail = this._back.getChildByName("Text_detail");
        textDetail.ignoreContentAdaptWithSize(true);
        textDetail.setString(this._data.productDesc);
        var imageNaozhong = this._back.getChildByName("Image_naozhong");
        var timeBg = imageNaozhong.getChildByName("time_bg");
        var texTime = imageNaozhong.getChildByName("Text_time");
        texTime.ignoreContentAdaptWithSize(true);
        var sliderDB = this._back.getChildByName("Slider_DB");
        sliderDB.setTouchEnabled(false);
        var imageNumTime = this._back.getChildByName("Image_num_time");
        var btnJian = imageNumTime.getChildByName("btn_jian");
        var btnJia = imageNumTime.getChildByName("btn_jia");
        var btnJiawu = imageNumTime.getChildByName("btn_jiawu");
        var textNum = imageNumTime.getChildByName("Text_num");
        var btnDB = imageNumTime.getChildByName("btn_DB");
        var textLiquan = btnDB.getChildByName("Text_liquan");
        textLiquan.ignoreContentAdaptWithSize(true);
        textLiquan.setString(this._data.productPrice);
        var imageLottery = this._back.getChildByName("Image_lottery");
        var imageDi = this._back.getChildByName("Image_di");
        var _headFrame = imageDi.getChildByName("headFrame");
        var textName = imageDi.getChildByName("Text_name");
        textName.ignoreContentAdaptWithSize(true);
        var textCishu = imageDi.getChildByName("Text_cishu");
        textCishu.ignoreContentAdaptWithSize(true);
        var textMa = imageDi.getChildByName("Text_ma");
        textMa.ignoreContentAdaptWithSize(true);

        if(this._data.productImage){
            reward.setVisible(false);
            var url = this._data.productImage;
            cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
            {
                if(!err&&texture && cc.sys.isObjectValid(this))
                {
                    var productImage = new cc.Sprite(texture);
                    productImage.setName("productImage");
                    productImage.setPosition(reward.getPosition());
                    productImage.setScaleX(reward.width/productImage.getContentSize().width);
                    productImage.setScaleY(reward.height/productImage.getContentSize().height);
                    this.addChild(productImage,-1);
                }
            }.bind(rewardDi));
        }

        if(this._data.activityType == 1){//秒杀
            biaoqian.loadTexture("ShopOfJiFen/duobao/miaosha.png");
            texTime.setString(MjClient.dateFormat(new Date(parseInt(this._data.activityEndTime)), 'yyyy年MM月dd日hh:mm开奖'));
            sliderDB.setVisible(false);
            if(this._data.activityWinnerId === 0){//未结束
                if(this._data.activitySurplusTime>0){//可以购买
                    imageNumTime.setVisible(true);
                    imageLottery.setVisible(false);
                    timeBg.setVisible(true);
                    if(this._isFirst) {
                        this._isFirst = false;
                        timeBg.getChildByName("min").setString(parseInt(this._data.activitySurplusTime / 1000 / 60));
                        timeBg.getChildByName("min").ignoreContentAdaptWithSize(true);
                        timeBg.getChildByName("sec").setString(parseInt(this._data.activitySurplusTime / 1000 % 60));
                        timeBg.getChildByName("sec").ignoreContentAdaptWithSize(true);
                        timeBg.getChildByName("sec_1").setString(parseInt(this._data.activitySurplusTime % 1000 / 100));
                        timeBg.getChildByName("sec_1").ignoreContentAdaptWithSize(true);
                        timeBg.schedule(function () {
                            this.getChildByName("min").setString(parseInt(self._data.activitySurplusTime / 1000 / 60));
                            this.getChildByName("sec").setString(parseInt(self._data.activitySurplusTime / 1000 % 60));
                            this.getChildByName("sec_1").setString(parseInt(self._data.activitySurplusTime % 1000 / 100));
                            self._data.activitySurplusTime = self._data.activitySurplusTime - 100;
                            if (self._data.activitySurplusTime < 0) {
                                this.getChildByName("min").setString("0");
                                this.getChildByName("sec").setString("0");
                                this.getChildByName("sec_1").setString("0");
                            }
                        }.bind(timeBg), 0.1);
                    }
                    texTime.setVisible(false);
                }else {
                    timeBg.setVisible(false);
                    texTime.setVisible(true);
                    imageNumTime.setVisible(false);
                    imageLottery.setVisible(true);
                }
            }else {//已结束
                timeBg.setVisible(false);
                texTime.setVisible(true);
                imageNumTime.setVisible(false);
                if(isSchdul) {
                    imageLottery.setVisible(false);
                }else {
                    imageLottery.setVisible(true);
                }
            }
        }else if(this._data.activityType == 2) {//人气
            biaoqian.loadTexture("ShopOfJiFen/duobao/renqi.png");
            imageNaozhong.setVisible(false);
            sliderDB.setVisible(true);
            sliderDB.setPercent(this._data.activityCurrentUser / this._data.activityMaxUser * 100);

            var richText1 = this._back.getChildByName("richText");
            if(richText1){
                richText1.removeFromParent();
            }
            var richText = new ccui.RichText();
            richText.setName("richText");
            var richTextItem1 = new ccui.RichElementText(1, cc.color("#d1840a"), 255, "已抢", "fonts/lanting.TTF", 16);
            var richTextItem2 = new ccui.RichElementText(2, cc.color("#d3260e"), 255, this._data.activityCurrentUser, "fonts/lanting.TTF", 16);
            var richTextItem3 = new ccui.RichElementText(3, cc.color("#d1840a"), 255, "次/"+this._data.activityMaxUser+"次", "fonts/lanting.TTF", 16);
            richText.pushBackElement(richTextItem1);
            richText.pushBackElement(richTextItem2);
            richText.pushBackElement(richTextItem3);
            richText.x = 800;
            richText.y = 310;
            this._back.addChild(richText);
            if (this._data.activityWinnerId === 0) {//未结束
                if (this._data.activityCurrentUser < this._data.activityMaxUser) {//可以购买
                    imageNumTime.setVisible(true);
                    imageLottery.setVisible(false);
                } else {
                    imageNumTime.setVisible(false);
                    imageLottery.setVisible(true);
                }
            } else {//已结束
                imageNumTime.setVisible(false);
                if(isSchdul) {
                    imageLottery.setVisible(false);
                }else {
                    imageLottery.setVisible(true);
                }
            }
        }

        if(this._data.activityWinnerId === 0){//未结束
            imageDi.setVisible(false);
        }else {//已结束
            if(isSchdul){
                imageDi.setVisible(true);
            }else {
                this.schedule(function () {
                    imageDi.setVisible(true);
                    imageLottery.setVisible(false);
                },5,1);
            }
            function loadHead(_headFrame) {
                var url = self._data.activityWinnerHeadUrl;
                cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
                {
                    if (!err && texture && cc.sys.isObjectValid(_headFrame))
                    {
                        var clipper = new cc.ClippingNode();
                        var sten = cc.Sprite.create("ShopOfJiFen/duobao/head_clip.png");
                        var stenSize = sten.getContentSize();
                        sten.setPosition(_headFrame.getPosition());
                        clipper.setContentSize(stenSize);
                        clipper.setStencil(sten);
                        clipper.setAlphaThreshold(0.5);
                        _headFrame.getParent().addChild(clipper);
                        var headSprite = new cc.Sprite(texture);
                        headSprite.setPosition(sten.getPosition());
                        headSprite.setScaleX(_headFrame.width/headSprite.width);
                        headSprite.setScaleY(_headFrame.height/headSprite.height);
                        clipper.addChild(headSprite);
                    }
                });
            }
            loadHead(_headFrame);

            textName.setString(unescape(this._data.activityWinnerName));
            textCishu.setString("参加了"+this._data.activityBuyNum+"次");
            textMa.setString("幸运码："+this._data.activityWinnerCode);
        }

        btnJian.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if(parseInt(textNum.getString())<=1){
                    return;
                }
                textNum.setString(parseInt(textNum.getString())-1);
                textLiquan.setString(parseInt(textNum.getString())*self._data.productPrice);
            }
        }, this);
        btnJia.addTouchEventListener(function (sender, type) {
            if (self._data.activityType == 2&&type == ccui.Widget.TOUCH_ENDED) {
                if((parseInt(textNum.getString())+1)>(self._data.activityMaxUser - self._data.activityCurrentUser)){
                    return;
                }
                textNum.setString(parseInt(textNum.getString())+1);
                textLiquan.setString(parseInt(textNum.getString())*self._data.productPrice);
            }
        }, this);
        btnJiawu.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if(self._data.activityType == 2&&(parseInt(textNum.getString())+5)>(self._data.activityMaxUser - self._data.activityCurrentUser)){
                    return;
                }
                textNum.setString(parseInt(textNum.getString())+5);
                textLiquan.setString(parseInt(textNum.getString())*self._data.productPrice);
            }
        }, this);

        btnDB.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                // if(self._data.productType == 1){
                //     var DBData = {};
                //     DBData.phaseId = self._data.activityPhaseId;
                //     DBData.num = parseInt(textNum.getString());
                //     MjClient.Scene.addChild(new ShopOfJifen_remainInfoLayer(DBData))
                // }else {
                    var DBData = {};
                    DBData.phaseId = self._data.activityPhaseId;
                    DBData.num = parseInt(textNum.getString());
                    if(MjClient.ShopOfJifen_mainUI){
                        MjClient.ShopOfJifen_mainUI.reqTreasureExchange(DBData);
                    }
                    textNum.setString("1");
                // }

            }
        }, this);
    }
});


var ShopOfJifen_DBRecordLayer = cc.Layer.extend({
    _productId:null,
    _Data:null,
    _offset:0,
    ctor: function (productId) {
        this._super();
        var UI = ccs.load("ShopOfJiFen_DB_record.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        this._productId = productId;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1,1],[0.5,0.5],[0,0]);

        //关闭按钮
        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        this._listView_DB = this._back.getChildByName("ListView_DB");
        var _listViewState = 0;
        this._listView_DB.addCCSEventListener(function(sender, type) {
            switch (type) {
                case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                    if (_listViewState == 0) {
                        _listViewState = 1;
                    }
                    break;
                case ccui.ScrollView.EVENT_AUTOSCROLL_ENDED:
                    if (_listViewState == 1) {
                        self.reqTreasureProductPrizeList();
                    }
                    _listViewState = 0;
                    break;
            }
        });

        this.reqTreasureProductPrizeList();
        return true;
    },

    initUI:function () {
        if(this._Data.length == 0){
            return;
        }
        var self = this;
        var itemRecord = this._back.getChildByName("item_record");
        for(var i = 0; i < this._Data.length; i++){
            var item = itemRecord.clone();

            var textQishu = item.getChildByName("Text_qishu");
            textQishu.ignoreContentAdaptWithSize(true);
            textQishu.setString("第" + this._Data[i].activityPhaseNum + "期");

            var _headFrame = item.getChildByName("headFrame");
            function loadHead(i, _headFrame) {
                var url = self._Data[i].activityWinnerHeadUrl;
                cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
                {
                    if(!err&&texture&&cc.sys.isObjectValid(item))
                    {
                        var clipper = new cc.ClippingNode();
                        var sten = cc.Sprite.create("ShopOfJiFen/duobao/head_clip.png");
                        var stenSize = sten.getContentSize();
                        sten.setPosition(_headFrame.getPosition());
                        clipper.setContentSize(stenSize);
                        clipper.setStencil(sten);
                        clipper.setAlphaThreshold(0.5);
                        _headFrame.getParent().addChild(clipper);
                        var headSprite = new cc.Sprite(texture);
                        headSprite.setPosition(sten.getPosition());
                        headSprite.setScaleX(_headFrame.width/headSprite.width);
                        headSprite.setScaleY(_headFrame.height/headSprite.height);
                        clipper.addChild(headSprite);
                    }
                });
            }
            loadHead(i, _headFrame);

            var textName = item.getChildByName("Text_name");
            textName.ignoreContentAdaptWithSize(true);
            textName.setString(unescape(this._Data[i].activityWinnerName));

            var textJoinNum = item.getChildByName("Text_join_num");
            textJoinNum.ignoreContentAdaptWithSize(true);
            textJoinNum.setString("参加"+this._Data[i].activityWinnerBuyCount+"次");

            var textTime = item.getChildByName("Text_time");
            textTime.ignoreContentAdaptWithSize(true);
            textTime.setString(MjClient.dateFormat(new Date(parseInt(this._Data[i].activityEndTime)), 'yyyy.MM.dd hh:mm结束'));

            var textXinyunma = item.getChildByName("Image_xinyunma").getChildByName("Text_xinyunma");
            textXinyunma.ignoreContentAdaptWithSize(true);
            textXinyunma.setString("幸运码："+this._Data[i].activityWinnerCode);

            this._listView_DB.pushBackCustomItem(item);
        }
    },

    reqTreasureProductPrizeList:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.treasureProductPrizeList",{productId:this._productId, offset:this._offset, length:20},function(rtn){
            cc.log("wxd pkplayer.handler.treasureProductPrizeList:"+JSON.stringify(rtn))
            MjClient.unblock();
            if(rtn.code == 0) {
                self._Data = rtn.data;
                self._offset += self._Data.length;
                self.initUI();
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    }
});


var ShopOfJifen_DBCodeLayer = cc.Layer.extend({
    _activityPhaseId:null,
    _Data:null,
    ctor: function (activityPhaseId) {
        this._super();
        var UI = ccs.load("ShopOfJiFen_DB_code.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        this._activityPhaseId = activityPhaseId;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1,1],[0.5,0.5],[0,0]);

        //关闭按钮
        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        this._scrollViewDuojiangma = this._back.getChildByName("ScrollView_duojiangma");
        this._textDBMa = this._scrollViewDuojiangma.getChildByName("Text_DBMa");
        this._textDBMa.ignoreContentAdaptWithSize(true);
        this._textDBMa.setVisible(false);

        this.reqTreasureBuyerCodeList();
        return true;
    },

    initUI:function () {
        if(this._Data.length == 0){
            MjClient.showToast("您还没有参加本次夺宝哦");
            return;
        }
        var self = this;
        var height = 20+Math.ceil(this._Data.length/4)*30;
        var heightS = height>300 ? height : 300;
        this._scrollViewDuojiangma.setInnerContainerSize(cc.size(590, heightS));
        for(var i = 0; i < this._Data.length; i++){
            var item = this._textDBMa.clone();
            item.setVisible(true);
            item.x = 30+ (i%4*140);
            item.y = heightS - (20 + Math.floor(i/4)*30);
            this._scrollViewDuojiangma.addChild(item);
            item.setString(this._Data[i].code);
            if(this._Data[i].isWinning === 1){
                item.setTextColor(cc.color("#e60012"));
            }
        }
    },

    reqTreasureBuyerCodeList:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.treasureBuyerCodeList",{phaseId:this._activityPhaseId},function(rtn){
            cc.log("wxd pkplayer.handler.treasureBuyerCodeList:"+JSON.stringify(rtn))
            MjClient.unblock();
            if(rtn.code == 0) {
                self._Data = rtn.data;
                self.initUI();
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    }
});