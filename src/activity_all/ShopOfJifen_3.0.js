/**
 * 积分商城3.0版
 */

var ShopOfJifen_layer_v3 = cc.Layer.extend({
    _DBData:null,
    ctor: function(data) {
        this._super();
        var UI = ccs.load("ShopOfJiFen_main_3.0.json");
        this.addChild(UI.node);
        MjClient.ShopOfJifen_mainUI = this;
        var self = this;
        this._data = data;
        this._canGet = false;
        this._myType = 1;
        this.uiNode = UI.node;
        
        // this._schedule = false;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 1], [0, 0], true);


        this._back_DB = UI.node.getChildByName("back_DB");
        setWgtLayout(this._back_DB, [1, 1], [0.5, 0.5], [0, 0]);
        this._back_DB.visible = false;

        this.panelTop = UI.node.getChildByName("panelTop");
        
        var bMax = true;
        if (cc.winSize.width/cc.winSize.height < 1280/720) {
            bMax = false;
        }
        setWgtLayout(this.panelTop, [1, 0.0931], [0.5, 1], [0, 0], bMax);
        setWgtLayout(this.uiNode.getChildByName("Panel_btn"), [0.1766, 1], [0, 1], [0, 0], bMax);
        setWgtLayout(this.uiNode.getChildByName("Panel_thing"), [0.4609, 1], [0.1860, 1], [0, 0], bMax);
        setWgtLayout(this.uiNode.getChildByName("Panel_renwu"), [0.3477, 1], [0.6523, 1], [0, 0], bMax);

        var closeBtn = this.panelTop.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                MjClient.JFHXJ_mainUI = null;
                self.removeFromParent();
                MjClient.native.umengEvent4CountWithProperty("Duihuanshangcheng_Tuichu", {
                    uid: SelfUid()
                });
            }
        });


        var Panel_btn = this.uiNode.getChildByName("Panel_btn");
        var Panel_thing = this.uiNode.getChildByName("Panel_thing");
        var Panel_renwu = this.uiNode.getChildByName("Panel_renwu");
        var btnList = Panel_btn.getChildByName("btnList");
        var renwu = Panel_renwu.getChildByName("renwu");
        this._list_btn = btnList.getChildByName("ListView");
        this._list_rule = renwu.getChildByName("ListView");
        this._list_thing = Panel_thing.getChildByName("ListView_thing");
        this._cell_btn = this.uiNode.getChildByName("cell_mall");
        this._cell_rule = this.uiNode.getChildByName("cell_rule");
        this._cell_thing = this.uiNode.getChildByName("cell_thing");
        this._cell_btn.setVisible(false);
        this._cell_rule.setVisible(false);
        this._cell_thing.setVisible(false);

        if(bMax){//铺满适配会导致Y轴超出，调整列表大小
            this._list_btn.height -= Panel_btn.height - Panel_btn.y/Panel_btn.getScale();
            this._list_thing.height -= Panel_thing.height - Panel_thing.y/Panel_btn.getScale();
            this._list_rule.height -= Panel_renwu.height - Panel_renwu.y/Panel_renwu.getScale();
        }else{
            var btnListSize = btnList.getContentSize();
            btnList.setCapInsets(cc.rect(btnListSize.width * 0.45, btnListSize.height * 0.45, 2, 2));
            btnList.setScale9Enabled(true);
            var renwuSize = renwu.getContentSize();
            renwu.setCapInsets(cc.rect(renwuSize.width * 0.45, renwuSize.height * 0.45, 2, 2));
            renwu.setScale9Enabled(true);

            var btnYsub = Panel_btn.y/Panel_btn.getScale() - Panel_btn.height;
            var ruleYsub = Panel_renwu.y/Panel_renwu.getScale() -Panel_renwu.height;
            btnList.height += btnYsub;
            renwu.height += ruleYsub;
            this._list_btn.y += btnYsub;
            this._list_rule.y += ruleYsub;
            this._list_btn.height += btnYsub;
            this._list_thing.height += Panel_thing.y/Panel_btn.getScale() - Panel_thing.height;
            this._list_rule.height += ruleYsub;
        }

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
                var layer = new ShopOfJifen_ruleLayer_v3(); // 
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
                var layer = new ShopOfJifen_remainInfoLayer_v3();
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
                var layer = new ShopOfJifen_listLayer_v3(this._data);
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

        // this._arrow_left = this._back.getChildByName("arrow_left");
        // var pos1_x = this._arrow_left.getPosition().x;
        // var pos1_y = this._arrow_left.getPosition().y;
        // var act_1 = cc.moveBy(0.5, cc.p(60, 0));
        // var act_2 = cc.moveBy(0.5, cc.p(-60, 0));


        // this._arrow_left.runAction(cc.sequence(cc.callFunc(function() {
        //     self._arrow_left.visible = true;
        // }), act_1, cc.callFunc(function() {
        //     self._arrow_left.visible = false;
        // }), act_2).repeatForever());
        // this._arrow_right = this._back.getChildByName("arrow_right");
        // var act_3 = cc.moveBy(0.5, cc.p(60, 0));
        // var act_4 = cc.moveBy(0.5, cc.p(-60, 0));

        // this._arrow_right.runAction(cc.sequence(cc.callFunc(function() {
        //     self._arrow_right.visible = true;
        // }), act_4, cc.callFunc(function() {
        //     self._arrow_right.visible = false;
        // }), act_3).repeatForever());
        // self._arrow_left.setOpacity(0);
        // self._arrow_right.setOpacity(0);
        // this.schedule(function() {
        //     var _scroll = self._scroll_main;
        //     var pos_rightX = _scroll.getContentSize().width - _scroll.getInnerContainerSize().width;
        //     var pos_leftX = 0;
        //     var getpos_X = _scroll.getInnerContainerPosition().x;
        //     if (getpos_X == pos_leftX) {
        //         self._arrow_left.setOpacity(0);
        //         self._arrow_right.setOpacity(255);
        //     } else if (getpos_X == pos_rightX) {
        //         self._arrow_left.setOpacity(255);
        //         self._arrow_right.setOpacity(0);
        //     } else {
        //         self._arrow_left.setOpacity(0);
        //         self._arrow_right.setOpacity(0);
        //     }
        //     if (_scroll.getInnerContainerSize().width <= 1080) {
        //         self._arrow_left.setOpacity(0);
        //         self._arrow_right.setOpacity(0);
        //     }
        // }, 0.5);


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
        _text_shengyu.width = 500;
        var _limit = oneData.limit;
        if (oneData.limit >= 10E7) {
            _limit = (oneData.limit / 10E7).toFixed(2) + "亿";
        } else if (oneData.limit >= 10E5) {
            _limit = (oneData.limit / 10E3).toFixed(2) + "万";
        }
        _text_shengyu.setString("余" + _limit + "份");

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

                    var layer = new ShopOfJifen_changeChooseLayer_v3(sender.data, this._data);
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
        var cell_width = this._cell_thing.width+10; //每个选项之间的 x 间隔
        var cell_height = this._cell_thing.height;
        this._list_thing.setInnerContainerSize(cc.size(this._list_thing.width, Math.ceil(_List.length / 3 +1 ) * (cell_height)));
        // this._scroll_main.setInnerContainerSize(cc.size(Math.ceil(_List.length / 3) * (cell_width) + 553, 600));
        // this._scroll_main.setScrollBarOpacity(0);
        this._list_thing.removeAllChildren();
        for (var i = 0; i < _List.length; i++) {
            var pos_topY = this._list_thing.getInnerContainerSize().height;
            if (cc.sys.isObjectValid(this._cell_thing)) {
                var item = this.changeNode_createItem(_List[i], i);
                var lieshu = i % 3;
                var hangshu = Math.floor(i / 3);
                var pos_x = 5 + lieshu * cell_width;
                var pos_y = pos_topY - (hangshu + 1)*item.height - 10;

                item.setPosition(cc.p(pos_x, pos_y));

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
        // switch (type) {
        //     case 1:
        //         playEffect("ShopOfJiFen/click_btn", false);
        //         break;
        //     case 2:
        //         playEffect("ShopOfJiFen/play_getMusic", false);
        //         break;
        // }
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
        Text_get.setString("x"+oneData.score);

        var bg_1 = copyNode.getChildByName("bg_1");
        bg_1.setScale9Enabled(true);
        if (oneData.type == 9) {
            bg_1.width = 95;
        }else{
            bg_1.width = 100;
        }

        var Text_1 = copyNode.getChildByName("Text_1");
        Text_1.ignoreContentAdaptWithSize(true);
        if (oneData.type == 9) {
            Text_1.setString("余" + (oneData.totalRecvCount - oneData.recvCount) + "次");
        } else {
            Text_1.setString(oneData.count + "/" + oneData.total);
            if (oneData.count == oneData.total) {
                copyNode.getChildByName("bg_1").loadTexture("ShopOfJiFen_3.0/bg_jingdutiao_you.png");
            }else{
                copyNode.getChildByName("bg_1").loadTexture("ShopOfJiFen_3.0/bg_jingdutiao_beijing.png");
            }
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
                            self["btn_rule_" + number].loadTextureNormal("ShopOfJiFen_3.0/btn_adv_get.png");
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
                self["btn_rule_" + number].loadTextureNormal("ShopOfJiFen_3.0/btn_yilingqu.png");
                self["btn_rule_" + number].setTouchEnabled(false);
            } else {
                if (oneData.count >= oneData.total) {
                    self._canGet = true;
                    self["btn_rule_" + number].loadTextureNormal("ShopOfJiFen_3.0/btn_get.png");
                    self["btn_rule_" + number].setTouchEnabled(true);
                } else {
                    self["btn_rule_" + number].loadTextureNormal("ShopOfJiFen_3.0/btn_go.png");
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
        // copyNode.loadTextureNormal("ShopOfJiFen/btn_" + number + "_s.png");
        // copyNode.loadTexturePressed("ShopOfJiFen/btn_" + number + "_n.png");
        // copyNode.loadTextureDisabled("ShopOfJiFen/btn_" + number + "_n.png");
        // copyNode.setBright(false);
        copyNode.getChildByName("Image_2").loadTexture("ShopOfJiFen_3.0/btn_" + number + "_n.png")
        copyNode.setTag(number);
        copyNode.setTouchEnabled(true);
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


var ShopOfJifen_listLayer_v3 = cc.Layer.extend({

    ctor: function(data) {
        this._super();
        var UI = ccs.load("ShopOfJiFen_Rank_3.0.json");
        this.addChild(UI.node);
        var self = this;
        this.prizeBtn = null;
        MjClient.ShopOfJifen_listUI = this;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);
        COMMON_UI.popDialogAni(_back);

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
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
        //_content.ignoreContentAdaptWithSize(true);
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
                var layer = new ShopOfJifen_changeInfoLayer_v3(sender, str, 1);
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

var ShopOfJifen_changeChooseLayer_v3 = cc.Layer.extend({

    ctor: function(data, allData) {
        this._super();
        var UI = ccs.load("ShopOfJiFen_info_0_3.0.json");
        this.addChild(UI.node);
        var self = this;
        this._data = data;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1.2, 1.2], [0.5, 0.5], [0, 0]);
        COMMON_UI.popDialogAni(_back);

        var closeBtn = _back.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                self.removeFromParent();
            }
        }, this);
        var btn_yes = _back.getChildByName("btn_yes");
        btn_yes.addTouchEventListener(function(sender, type){
            if(type == 2){
                var str = "确定消耗 " + data.price + "礼券兑换" + data.title;
                var layer = new ShopOfJifen_changeInfoLayer_v3(data, str);
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
        Text_tile.setString(""+data.title);

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
            //btn_yes.x += 140;
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

var ShopOfJifen_changeInfoLayer_v3 = cc.Layer.extend({

    ctor: function(data, str, type) {
        this._super();
        var UI = ccs.load("ShopOfJiFen_info_3.0.json");
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
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);
        COMMON_UI.popDialogAni(_back);

        var closeBtn = _back.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, ed) {
            if (ed == 2) {
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
        this.input_ren = new cc.EditBox(input_ren.getContentSize(), new cc.Scale9Sprite());
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
        this.input_number = new cc.EditBox(input_number.getContentSize(), new cc.Scale9Sprite());
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
                this.bg_info.setBackGroundColorOpacity(0);
                this.fresh_listView();
            }
        }, this);
        var icon_arrow = input_dizhi_2.getChildByName("img_arrow");
        icon_arrow.setZOrder(2);
        this.input_dizhi_2 = new cc.EditBox(input_dizhi_2.getContentSize(), new cc.Scale9Sprite());
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
        this.input_dizhi = new cc.EditBox(input_dizhi.getContentSize(), new cc.Scale9Sprite());
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
        // if(type === 1){
        //     btn_yes.loadTextureNormal("ShopOfJiFen/btn_shareGet.png");
        // }else{
        //     btn_yes.loadTextureNormal("ShopOfJiFen/btn_yes.png");
        // }

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

var ShopOfJifen_remainInfoLayer_v3 = cc.Layer.extend({

    ctor: function(DBData) {
        this._super();
        var UI = ccs.load("ShopOfJiFen_info_2_3.0.json");
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
        COMMON_UI.popDialogAni(_back);

        var closeBtn = _back.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
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
        this.input_ren = new cc.EditBox(input_ren.getContentSize(), new cc.Scale9Sprite());
        this.input_ren.setFontColor(cc.color(0xff, 0x6f, 0x20));
        this.input_ren.setMaxLength(20);
        this.input_ren.setFontSize(26);
        this.input_ren.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_ren.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        this.input_ren.setPlaceHolder("请输入收货人名字");
        this.input_ren.setPlaceholderFontSize(26);
        this.input_ren.setPosition(input_ren.getContentSize().width / 2, input_ren.getContentSize().height / 2);
        input_ren.addChild(this.input_ren);
        if (allData.addressInfo && allData.addressInfo.realname) {
            this.input_ren.setString(allData.addressInfo.realname);
        }


        var input_number = _back.getChildByName("input_number");
        this.input_number = new cc.EditBox(input_number.getContentSize(), new cc.Scale9Sprite());
        this.input_number.setFontColor(cc.color(0xff, 0x6f, 0x20));
        this.input_number.setMaxLength(11);
        this.input_number.setFontSize(26);
        this.input_number.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_number.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this.input_number.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        this.input_number.setPlaceHolder("请输入收货人电话");
        this.input_number.setPlaceholderFontSize(26);
        this.input_number.setPosition(input_number.getContentSize().width / 2, input_number.getContentSize().height / 2);
        input_number.addChild(this.input_number);
        if (allData.addressInfo && allData.addressInfo.mobileNum) {
            this.input_number.setString(allData.addressInfo.mobileNum);
        }

        var input_dizhi = _back.getChildByName("input_dizhi");
        this.input_dizhi = new cc.EditBox(input_dizhi.getContentSize(), new cc.Scale9Sprite());
        this.input_dizhi.setFontColor(cc.color(0xff, 0x6f, 0x20));
        this.input_dizhi.setMaxLength(50);
        this.input_dizhi.setFontSize(26);
        this.input_dizhi.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_dizhi.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        this.input_dizhi.setPlaceHolder("如乡镇、街道、门牌号等");
        this.input_dizhi.setPlaceholderFontSize(26);
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
                this.bg_info.setBackGroundColorOpacity(0);
                this.fresh_listView();
            }
        }, this);
        var icon_arrow = input_dizhi_2.getChildByName("img_arrow");
        icon_arrow.setZOrder(2);
        this.input_dizhi_2 = new cc.EditBox(input_dizhi_2.getContentSize(), new cc.Scale9Sprite());
        this.input_dizhi_2.setFontColor(cc.color(0xff, 0x6f, 0x20));
        this.input_dizhi_2.setMaxLength(50);
        this.input_dizhi_2.setFontSize(26);
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

var ShopOfJifen_ruleLayer_v3 = cc.Layer.extend({
    ctor: function() {
        this._super();
        var UI = ccs.load("ShopOfJiFen_rule_3.0.json");
        this.addChild(UI.node);
        var self = this;

        var block = UI.node.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = UI.node.getChildByName("back");
        setWgtLayout(back, [1.0, 1.0], [0.5, 0.5], [0, 0]);
        this.back = back;
        COMMON_UI.popDialogAni(back);

        var closeBtn = back.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
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
        var _colorNormal = "#738875";
        var _colorRed = "#ff6f20";
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
                ["⑥　", "fonts/lanting.TTF", 20, _colorNormal],
                ["兑换商城礼券每年6月30日23：59进行清零"  , "fonts/lanting.TTF", 20, _colorRed],
                ["（清空上一自然年累计的所有礼券），请广大代理玩家"+ str4, "fonts/lanting.TTF" , 20, _colorNormal],
            ];
        var _richText = COMMON_UI.RichText(_dataList2,title);
        _list.addChild(_richText);
        var tipText = back.getChildByName("tipText");
        tipText.setString("活动一切解释权归" + _txt + "棋牌所有，如有疑问请点击游戏主页的“咨询”联系客服进行咨询。");


    },
});

