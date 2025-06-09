/**create by Lms
 * @DateTime:     2018-09-04 
 * @Description:  签到抽奖类  
 * 老板命名为 新转盘签到 便取了这个名字 luckyTableNew_layer
 * 跟老转盘 对应
 */

var luckyTableNew_layer = cc.Layer.extend({
    _getChance: null,
    _data: null,
    _lastChance: null,
    _lotteryList: null,
    _useChance: null,
    _number: null,
    _schedule: false,
    _prizeType: null,
    _closeCallback: null,
    luckyPrize_number: null,
    luckyPrize_type: null,
    luckyHead: null,
    luckyName: null,
    ctor: function(data) {
        this._super();

        var UI = ccs.load("LucklyTable_new.json");
        this.addChild(UI.node);
        MjClient.luckyTableNew_ui = this;
        this._canGet = false;

        var self = this;
        this._data = data;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);
        this._pointNode = this._back.getChildByName("nodePoint");
        this.bg_shine = this._pointNode.getChildByName("bg_shine");

        this.btn_start = this._pointNode.getChildByName("btn_start");
        //退出
        this._close = this._back.getChildByName("close");
        this._close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (this._closeCallback) {
                    this._closeCallback();
                }
                self.removeFromParent();
            }
        }, this);
        this._node_top = this._back.getChildByName("node_top");

        this.btn_prize = this._back.getChildByName("btn_prize");
        if (this.btn_prize) {
            this.btn_prize.addTouchEventListener(function(sender, type) {
                if (type == 2) {

                }
            }, this);
        }

        for (var i = 0; i <= 9; i++) {
            this["shine_" + i] = this._pointNode.getChildByName("node_shine").getChildByName("Image_" + i);
            this["img_" + i] = this._pointNode.getChildByName("node_img").getChildByName("Image_" + i);
            this["shine_" + i].visible = false;
        }

        this._node_rule = this._back.getChildByName("node_rule");
        this._work_list = this._node_rule.getChildByName("ListView_1");
        this._work_cell = this._node_rule.getChildByName("cell");
        this._work_cell.visible = false;
        this._shareType = null;

        UIEventBind(null, this._work_list, "WX_SHARE_SUCCESS", function(data) {
            cc.log(" ====== data", JSON.stringify(data));
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

        var _prizeNum = 0;
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ|| isJinZhongAPPType()) {
            _prizeNum = 7;
        }else{
            _prizeNum = 6;
        }

        var touchFunc = function(sender, type) {
            var tag = sender.getTag();
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:

                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    if (!this._data) {
                        return;
                    }

                    if (self.loginLadder.ladder[tag - 1].recved) {
                        MjClient.showToast("已经领取");
                    } else {
                        if (self.loginLadder.ladder[tag - 1].isRecv) {
                            this.reqQianDao(this.loginLadder.ladder[(tag - 1)].key, tag, this.loginLadder.ladder[(tag - 1)]);
                        } else {
                            for (var i = 1; i <= _prizeNum; i++) {
                                if (i == tag) {
                                    self["imgtishi_" + tag].visible = true;
                                    self["imgtishi_" + tag].stopAllActions();
                                    self["imgtishi_" + tag].runAction(cc.sequence(cc.DelayTime(2), cc.callFunc(function() {
                                        self["imgtishi_" + tag].setVisible(false);
                                    })));
                                } else {
                                    self["imgtishi_" + i].visible = false;
                                }

                            }
                        }
                    }

                    // if (this.loginLadder.days >= this.loginLadder.ladder[(tag - 1)].amount) {
                    //     this.reqQianDao(this.loginLadder.ladder[(tag - 1)].key);
                    // }

                    break;
                case ccui.Widget.TOUCH_CANCELED:

                    break;
                default:
                    break;
            }
        }.bind(this);



        for (var i = 1; i <= _prizeNum; i++) {
            var _node = this._node_top.getChildByName("bg_bar").getChildByName("icon_" + i);
            this["prize_" + i] = _node.getChildByName("btn_lingjiang");

            this["imgtishi_" + i] = this._node_top.getChildByName("bg_bar").getChildByName("bg_xinxi_" + i);
            if (this["imgtishi_" + i]) {

                this["imgtishi_" + i].visible = false;
            }
            this["txttishi_" + i] = this["imgtishi_" + i].getChildByName("text_xinxi");
            this["txttishi_" + i].ignoreContentAdaptWithSize(true);

            var _sp = _node.getChildByName("Sprite_1");
            _sp.visible = false;

            this["imgshine_" + i] = _node.getChildByName("bg_guangxiao");
            var _sp = new cc.Sprite("luckyTable_new/icon_keling.png");
            // _sp.setScale(0.7);
            _sp.setPosition(cc.p(_node.width * 0.63, _node.height * 0.65));
            _node.addChild(_sp);
            _sp.visible = false;
            this["keling_" + i] = _sp;

            // this["imgshine_"+i].setZOrder(-1);
            if (this["imgshine_" + i]) {
                var act_func = function(d) {
                    self["imgshine_" + d].runAction(cc.rotateBy(10, 360).repeatForever());
                };
                act_func(i);
                this["imgshine_" + i].visible = false;
            }
            this["prize_" + i].setTag(i);
            this["prize_" + i].addTouchEventListener(touchFunc);
        }


        this.loadBar = this._node_top.getChildByName("bg_bar").getChildByName("loadBar");
        this.loadBar.setPercent(0);

        this._panelRecv = this._node_top.getChildByName("PanelRecv");
        this._panelRecv.setVisible(false);
        this._recvItem = this._node_top.getChildByName("RecvItem");
        this._recvItem.setVisible(false);

        if (data) {
            this.initSelf();
        } else {
            this.reqlucky();
        }

        var node_head = this._node_top.getChildByName("Image_head");
        var _head = node_head.getChildByName("img_head");
        _head.runAction(cc.sequence(cc.rotateBy(0.8, 5), cc.rotateBy(1.5, -10), cc.rotateBy(0.8, 5)).repeatForever());

        var _hand = node_head.getChildByName("img_hand");
        _hand.runAction(cc.sequence(cc.rotateBy(0.3, 3), cc.rotateBy(0.6, -6), cc.rotateBy(0.3, 3)).repeatForever());

        this._btn_list = node_head.getChildByName("btn_mylist");
        this._btn_list.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    if(MjClient.isUseUIv3 && MjClient.isUseUIv3())
                        self.addChild(new luckyList_newLayer_v3(this._data), 1);
                    else
                        self.addChild(new luckyList_newLayer(this._data), 1);
                    break;
                default:
                    break;
            }
        }, this);
        this._btn_list.runAction(cc.sequence(cc.rotateBy(1, 5), cc.rotateBy(2, -10), cc.rotateBy(1, 5)).repeatForever());

        var bg_xian = this._back.getChildByName("bg_close");
        bg_xian.runAction(cc.sequence(cc.rotateBy(1, 5), cc.rotateBy(2, -10), cc.rotateBy(1, 5)).repeatForever());

        this._tip_text = this._node_top.getChildByName("bg_tip").getChildByName("Text_tip");
        this._tip_text.ignoreContentAdaptWithSize(true);
        this._tip_text.setString("");
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
        self.loginLadder = self._data.loginLadder;
        self._canGet = false;
        self.setCanTouch(true);
        // this.loginLadder.days=14;
        // MjClient.Scene.addChild(new luckyBack_QiandaoLayer(this.loginLadder.ladder[0],1));
        var _len = self.loginLadder.ladder.length - 1;
        var imgFunc = function(_node, imageUrl) {
            cc.loader.loadImg(imageUrl,   {
                isCrossOrigin :  true
            },  function(err, img) {
                if (err) {
                    cc.log(err);
                } else if (img && sys.isObjectValid(_node)) {
                    var _sp = _node.getChildByName("Sprite_1");
                    _sp.visible = true;
                    _sp.setTexture(img);

                }
            });
        };
        for (var i = 1; i <= self.loginLadder.ladder.length; i++) {
            var str = "";
            var _money = self.loginLadder.ladder[i - 1].award.money;
            var _redpacket = self.loginLadder.ladder[i - 1].award.redpacket;
            var _integral = self.loginLadder.ladder[i - 1].award.integral;
            var _gold = self.loginLadder.ladder[i - 1].award.gold;
            if (_money) {
                str += _money + "元宝";
            }
            if (_integral) {
                if (str.length > 0) {
                    str += "+";
                }
                str += _integral + "礼券";
            }
            if (_redpacket) {
                if (str.length > 0) {
                    str += "+";
                }
                str += "现金红包";
            }
            if (_gold) {
                if (str.length > 0) {
                    str += "+";
                }
                str += _gold +"金币";
            }


            this["txttishi_" + i].setString(str);
            var _node = this._node_top.getChildByName("bg_bar").getChildByName("icon_" + i);
            var _txtDay = _node.getChildByName("text_day");
            _txtDay.setString(self.loginLadder.ladder[i - 1].amount + "天");            

            var imageUrl = self.loginLadder.ladder[i - 1].image;
            imgFunc(_node,imageUrl);

            var posx = 0;
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ|| isJinZhongAPPType()) {
                posx = 780/7*i -65;
            }else{
                posx = 780/6*i -65;
            }
            cc.log(" ===== posx ",posx,posx + _node.width);
            // self.loginLadder.ladder[i - 1].amount / self.loginLadder.ladder[_len].amount * 780;
            _node.setPositionX(posx);
            this["imgtishi_" + i].setPositionX(posx + 30);

            if (!self.loginLadder.ladder[i - 1].recved && self.loginLadder.ladder[i - 1].isRecv) {
                this["imgshine_" + i].visible = true;
                this._canGet = true;
                this["keling_" + i].visible = true;

            } else {
                this["imgshine_" + i].visible = false;
                this["keling_" + i].visible = false;
            }

            if (self.loginLadder.ladder[i - 1].recved) {
                // _node.getChildByName("Sprite_1").setColor(cc.color(150*0.3,150*0.59,150*0.11));
                // var _label = new cc.LabelTTF("已领取",MjClient.fzcyfont,30);
                // _label.setRotation(-30);
                // _label.createWithSystemFont(cc.color(255,0,0));
                // _label.setColor(cc.color(255,0,0));
                // _label.setPosition(cc.p(_node.width/2,_node.height/2));
                // _node.addChild(_label);
                var _sp = new cc.Sprite("luckyTable_new/icon_yiling.png");
                _sp.setScale(0.7);
                _sp.setPosition(cc.p(_node.width/2,_node.height/2));
                _node.addChild(_sp);
            }
        }
        var _day = self.loginLadder.days;
        var _per = 0;
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ|| isJinZhongAPPType()) {
            _per = self.loginLadder.days / (self.loginLadder.ladder[_len].amount);
        } else {            
            if (_day <= 3) {
                _per = 65 / 780 * _day / 3;
            } else if (_day <= 7) {
                _per = (56 * (_day - 3) / 4 + 139) / 780;
            } else if (_day <= 14) {
                _per = (56 * (_day - 7) / 7 + 269) / 780;
            } else if (_day <= 21) {
                _per = (56 * (_day - 14) / 7 + 399) / 780;
            } else if (_day <= 25) {
                _per = (56 * (_day - 21) / 4 + 529) / 780;
            } else if (_day <= 30) {
                _per = (56 * (_day - 25) / 5 + 659) / 780;
            }
        }
        

        // var _per = self.loginLadder.days / self.loginLadder.ladder[_len].amount;
        this.loadBar.setPercent(_per*100);
        this._tip_text.setString("您已连续登录" + self.loginLadder.days + "天");

        for (var i = 0; i < self.luckyImgList.length; i++) {
            this.init_prize(i, self.luckyImgList[i].image);
        }
        this.refreshTable();
        if (self._lastChance <= 0) {
            this.btn_start.loadTextureNormal("luckyTable_new/btn_prize2.png");
        } else {
            this.btn_start.loadTextureNormal("luckyTable_new/btn_prize.png");
            this._canGet = true;
        }
        this.btn_start.addTouchEventListener(function(sender, Type) {

            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    cc.log(" === _lastChance  btn_start", self._lastChance);
                    playEffect("LuckyTable_new/click_btn", false);
                    if (self._lastChance > 0)
                        self.reqRun();
                    else
                        MjClient.showToast("当前没有抽奖机会");

                    MjClient.native.umengEvent4CountWithProperty("Dazhuanpan_Kaishi", {
                        uid: SelfUid()
                    });
                    break;
                default:
                    break;
            }
        }, this);

        if (this._data.lotteryList.length > 0) {
            this._panelRecv.setVisible(true);
            this.initPanelRecv(this._data.lotteryList);
        } else {
            this._panelRecv.setVisible(false);
        }

    },

    initPanelRecv: function(dataList) {
        var self = this;
        this._panelRecv.removeAllChildren();
        for (var i = 0; i < dataList.length; i++) {
            var item = this._recvItem.clone();
            item.setVisible(true);
            this._panelRecv.addChild(item);
            item.setPosition(cc.p(item.width * (i), 0));
            var textRecv = item.getChildByName("TextRecv");
            textRecv.ignoreContentAdaptWithSize(true);
            textRecv.setString(getNewName(unescape(dataList[i].nickname)) + "领取了" + dataList[i].title);

            var delay1 = new cc.DelayTime(0);
            var moveBy1 = new cc.MoveBy(3, cc.p(-item.width, 0));
            var callBack1 = new cc.CallFunc(function() {
                if (this.x < 0) {
                    this.setPositionX((dataList.length - 1) * this.width);
                }
            }.bind(item));
            if (dataList.length > 0) {
                item.runAction(cc.repeatForever(cc.sequence(delay1, moveBy1, callBack1)));
            }
        }
    },

    init_prize: function(number, vecImageUrl) {
        /*
         图片节点
         */
        cc.log("vecImageUrl ============== " + JSON.stringify(vecImageUrl));

        var imageUrl = vecImageUrl;
        var node_shine = this["img_" + number];
        var self = this;
        cc.loader.loadImg(imageUrl,   {
            isCrossOrigin :  true
        },  function(err, img) {
            if (err) {
                cc.log(err);
            } else if (img && sys.isObjectValid(self) && sys.isObjectValid(self._pointNode) && sys.isObjectValid(node_shine)) {
                var sprite_bg = new cc.Sprite("luckyTable_new/bg_prize.png");
                sprite_bg.setTexture(img);
                sprite_bg.setPosition(cc.p(node_shine.width / 2, node_shine.height / 2));
                node_shine.addChild(sprite_bg);
            }
        });

    },

    setCanTouch: function(isbool) {
        for (var i = 0; i <= 10; i++) {
            if (cc.sys.isObjectValid(this["btn_rule_" + i]))
                this["btn_rule_" + i].setTouchEnabled(isbool);
            if (cc.sys.isObjectValid(this["prize_" + i])) 
                this["prize_" + i].setTouchEnabled(isbool);
            
        }
        if (cc.sys.isObjectValid(this._btn_list))
            this._btn_list.setTouchEnabled(isbool);
    },

    setNewName: function(name, length) {
        var _newName = name;
        var strlen = name.length;
        if (cc.isUndefined(length) || length == null) {
            length = 4; //默认名字限制6个字符
        }
        if (length < 4) {
            length = 4;
        }
        if (strlen >= length) {
            _newName = name.substring(0, length - 1);
            _newName += "...";
        }
        return _newName;
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

                var fileContent = MjClient.getShareImageFileToPYQ();
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

                var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "ShopOfJiFen/share_bg.jpg";
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

    createItem_work: function(oneData, number) {
        var self = this;
        var copyNode = this._work_cell.clone();
        copyNode.visible = true;

        var Text_rule = copyNode.getChildByName("Text_rule");
        Text_rule.ignoreContentAdaptWithSize(true);
        Text_rule.setString("" + oneData.title);

        var Text_1 = copyNode.getChildByName("Text_1");
        Text_1.ignoreContentAdaptWithSize(true);
        Text_1.setString(oneData.count + "/" + oneData.total);
        self["btn_rule_" + number] = copyNode.getChildByName("btn_rule");
        self["btn_rule_" + number].setTag(oneData.type);
        self["btn_rule_" + number].position = number + 1;
        self["btn_rule_" + number].addTouchEventListener(function(sender, type) {
            var tag = sender.getTag();
            if (type == 2) {
                this.type_work(tag);
                if (1 == sender.position) {
                    MjClient.native.umengEvent4CountWithProperty("Dazhuanpan_Qianwangyilingqu", {
                        uid: SelfUid()
                    });
                } else if (2 == sender.position) {
                    MjClient.native.umengEvent4CountWithProperty("Dazhuanpan_Qianwangerlingqu", {
                        uid: SelfUid()
                    });
                } else if (3 == sender.position) {
                    MjClient.native.umengEvent4CountWithProperty("Dazhuanpan_Qianwangsanlingqu", {
                        uid: SelfUid()
                    });
                }
            }
        }, this);

        if (oneData.count >= oneData.total) {
            self["btn_rule_" + number].loadTextureNormal("luckyTable_new/btn_ok.png");
            self["btn_rule_" + number].setTouchEnabled(false);
            self["btn_rule_" + number].setSize(cc.size(95, 68));
        } else {
            self["btn_rule_" + number].loadTextureNormal("luckyTable_new/btn_go.png");
            self["btn_rule_" + number].setTouchEnabled(true);
            self["btn_rule_" + number].setSize(cc.size(136, 64));
        }


        return copyNode;
    },
    addItems_work: function() {
        var _emailList = this._data.arr;
        this._work_list.removeAllItems();
        for (var i = 0; i < _emailList.length; i++) {
            cc.log(" ======this._data.arr new  ", i);
            if (cc.sys.isObjectValid(this._work_cell)) {
                this._work_list.pushBackCustomItem(this.createItem_work(_emailList[i], i));
            }
        }
        this._work_list.setScrollBarOpacity(0);
    },

    refreshTable: function() {
        if (!cc.sys.isObjectValid(this._back)) return;

        // var _text_1 = this._node_rule.getChildByName("text_rule");
        // _text_1.ignoreContentAdaptWithSize(true);
        // _text_1.setString("完成每项任务可转一次 每人每日最多可转" + this._data.arr.length+ "次");
        var text_start = this._pointNode.getChildByName("Text_number");
        text_start.setString("完成每项任务可转一次\n 每人每日最多可转" + this._data.arr.length + "次");
        var text_tishi = this._back.getChildByName("text_tishi");
        text_tishi.setVisible(false);
        text_tishi.setString("领取红包请前往公众号(" + MjClient.systemConfig.gongzhonghao + ")实物奖加微信(" + this._data.weixin + ")");

        this.addItems_work();



    },
    reqRun: function() {
        var self = this;
        // MjClient.block();
        self.btn_start.setTouchEnabled(false);
        self.setCanTouch(false);
        MjClient.gamenet.request("pkplayer.handler.lottery", {
                key: "TURN"
            },
            function(rtn) {
                if (rtn.code == 0) {
                    cc.log(" =========== haian lottery " + JSON.stringify(rtn));
                    self._number = rtn.data.num;
                    _title = rtn.data.title;
                    self._prizeType = rtn.data.type;
                    self.luckyPrize_number = rtn.data.amount;
                    self.luckyPrize_type = rtn.data.type;
                    self.RotationAct(self._number);
                    // var _rotation = cc.rotateBy(3.5, sum); //.easing(cc.easeExponentialInOut());


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

    reqQianDao: function(key, number, data) {
        var self = this;
        // MjClient.block();
        self.btn_start.setTouchEnabled(false);
        self.setCanTouch(false);
        MjClient.gamenet.request("pkplayer.handler.lottery", {
                key: key
            },
            function(rtn) {
                if (rtn.code == 0) {
                    cc.log(" =========== 签到 lottery " + JSON.stringify(rtn));
                    self.refreshAct();
                    MjClient.Scene.addChild(new luckyBack_QiandaoLayer(data, number));
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

    RotationAct: function(number) {
        if (!cc.sys.isObjectValid(this)) return;
        var self = this;
        for (var i = 0; i < 10; i++) {
            self["shine_" + i].setVisible(false);
        }
        var sum = 10 * 3 + number;
        cc.log(" ====== sum ", sum, " 中奖数字：", number);
        var _sum = sum - 6;
        var timedelay = 1.5 / _sum;
        var timedelay2 = 0.23;
        var type = this._timeType;
        playEffect("LuckyTable_new/music_prize", false);
        var _sp;
        var func = function(d, time, time2) {
            var num = d % 10;

            self["shine_" + num].runAction(cc.sequence(cc.DelayTime(time), cc.callFunc(function() {
                self["shine_" + num].setVisible(true);
                if (d == sum) {
                    _sp = new cc.Sprite("luckyTable_new/shine_2.png");
                    _sp.setPosition(cc.p(self["shine_" + num].width/2,self["shine_" + num].height/2));
                    self["shine_" + num].addChild(_sp);
                    _sp.setScale(0.2);
                    _sp.runAction(cc.spawn(cc.scaleTo(0.3,1),cc.fadeOut(0.3)) );

                }
            }), cc.DelayTime(time2), cc.callFunc(function() {
                if (d < sum) {
                    self["shine_" + num].setVisible(false);
                }

            })));

        };

        for (var i = 0; i <= sum; i++) {
            if (i <= _sum) {
                var time = i * timedelay;
                func(i, time, timedelay);

            } else {
                var time = (_sum) * timedelay + (i - (_sum)) * timedelay2;
                func(i, time, timedelay2);
            }
        }

        this.runAction(cc.sequence(cc.DelayTime(time + 0.3), cc.callFunc(function() {
            self.refreshAct();
            // if (self.luckyPrize_type) {
            //     self.reqShare();
            // }  
            self.addChild(new luckyBack_newLayer(self.luckyPrize_type, self.luckyPrize_number), 1);
        })));


    },

    reqlucky: function() {
        var self = this;
        // MjClient.block();
        self.setCanTouch(false);
        MjClient.gamenet.request("pkplayer.handler.lotteryMsg", {
                key: "TURN"
            },
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
        MjClient.gamenet.request("pkplayer.handler.lotteryCallback", {
                key: "TURN"
            },
            function(rtn) {
                if (rtn.code == 0) {
                    cc.log(" ===== haianLotteryCallback ===   " + JSON.stringify(rtn));
                    if (self._prizeType == 1) {
                        MjClient.showToast("元宝已发放到账户中");
                    } else if (self._prizeType == 2) {
                        MjClient.showToast("请去公众号领取");
                    } else if (self._prizeType == 4) {
                        MjClient.showToast("礼券已发放到账户中");
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

    refreshAct: function() {
        if (!cc.sys.isObjectValid(this.btn_start)) return;
        var self = this;
        self.btn_start.setTouchEnabled(true);
        self.setCanTouch(true);
        self.stopAllActions();
        self.reqlucky();

    },
    reqTodayShare: function() {
        var self = this;
        MjClient.gamenet.request("pkplayer.handler.lotteryShare", {
                key: "TURN"
            },
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
    setCloseCallback: function(callback) {
        this._closeCallback = callback;
    }

});

var luckyTableNew_layer_30 = cc.Layer.extend({
    _getChance: null,
    _data: null,
    _lastChance: null,
    _lotteryList: null,
    _useChance: null,
    _number: null,
    _schedule: false,
    _prizeType: null,
    _closeCallback: null,
    luckyPrize_number: null,
    luckyPrize_type: null,
    luckyHead: null,
    luckyName: null,
    ctor: function(data) {
        this._super();

        var UI = ccs.load("LucklyTable_new_3.0.json");
        this.addChild(UI.node);
        MjClient.luckyTableNew_ui = this;
        this._canGet = false;

        var self = this;
        this._data = data;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);
        this._pointNode = this._back.getChildByName("nodePoint");
        this.bg_shine = this._pointNode.getChildByName("bg_shine");

        this._animNode =createSpine("luckyTable_new_3.0/choujiang.json", "luckyTable_new_3.0/choujiang.atlas");
        this._animNode.setPosition(cc.p(220, 110));
        this._animNode.setAnimation(0, "daiji", true);
        //this._animNode.setRotation(20);
        this._animNode.setScale(0.8);
        this._back.addChild(this._animNode);

        this.btn_start = this._pointNode.getChildByName("btn_start");
        //退出
        this._close = this._back.getChildByName("close");
        this._close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (this._closeCallback) {
                    this._closeCallback();
                }
                self.removeFromParent();
            }
        }, this);
        this._node_top = this._back.getChildByName("node_top");
        this._node_bottom = this._back.getChildByName("node_bottom");

        this.btn_prize = this._back.getChildByName("btn_prize");
        if (this.btn_prize) {
            this.btn_prize.addTouchEventListener(function(sender, type) {
                if (type == 2) {

                }
            }, this);
        }

        this.img_num = this._back.getChildByName("Image_num");
        this.img_num.visible = false;

        this.btn_help = this._back.getChildByName("Button_help");
        this.btn_help.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if(this.img_num.visible){
                    this.img_num.visible = false;
                }else {
                    this.img_num.visible = true;
                }

            }
        }, this);

        for (var i = 0; i <= 9; i++) {
            this["shine_" + i] = this._pointNode.getChildByName("node_shine").getChildByName("Image_" + i);
            this["img_" + i] = this._pointNode.getChildByName("node_img").getChildByName("Image_" + i);
            this["shine_" + i].visible = false;
        }

        this._node_rule = this._back.getChildByName("node_rule");
        this._work_list = this._node_rule.getChildByName("ListView_1");
        this._work_cell = this._node_rule.getChildByName("cell");
        this._work_cell.visible = false;
        this._shareType = null;

        UIEventBind(null, this._work_list, "WX_SHARE_SUCCESS", function(data) {
            cc.log(" ====== data", JSON.stringify(data));
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

        var deng = this._pointNode.getChildByName("Image_deng");
        var index = 1;
        deng.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.5),cc.callFunc(function () {
            this.loadTexture("luckyTable_new_3.0/bg_deng_"+index%2+".png");
            index++;
        }.bind(deng)))));


        var _prizeNum = 7;
        // if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ|| isJinZhongAPPType()) {
        //     _prizeNum = 7;
        // }else{
        //     _prizeNum = 6;
        // }

        var touchFunc = function(sender, type) {
            var tag = sender.i;
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:

                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    if (!this._data) {
                        return;
                    }

                    if (self.loginLadder.ladder[tag - 1].recved) {
                        MjClient.showToast("已经领取");
                    } else {
                        if (self.loginLadder.ladder[tag - 1].isRecv) {
                            this.reqQianDao(this.loginLadder.ladder[(tag - 1)].key, tag, this.loginLadder.ladder[(tag - 1)]);
                        } else {
                            for (var i = 1; i <= _prizeNum; i++) {
                                if (i == tag) {
                                    self["imgtishi_" + tag].visible = true;
                                    self["imgtishi_" + tag].stopAllActions();
                                    self["imgtishi_" + tag].runAction(cc.sequence(cc.DelayTime(2), cc.callFunc(function() {
                                        self["imgtishi_" + tag].setVisible(false);
                                    })));
                                } else {
                                    self["imgtishi_" + i].visible = false;
                                }

                            }
                        }
                    }

                    // if (this.loginLadder.days >= this.loginLadder.ladder[(tag - 1)].amount) {
                    //     this.reqQianDao(this.loginLadder.ladder[(tag - 1)].key);
                    // }

                    break;
                case ccui.Widget.TOUCH_CANCELED:

                    break;
                default:
                    break;
            }
        }.bind(this);



        for (var i = 1; i <= _prizeNum; i++) {
            var _node = this._node_bottom.getChildByName("bg_bar").getChildByName("icon_" + i);
            _node.visible = false;
            this["prize_" + i] = _node.getChildByName("btn_lingjiang");

            this["imgtishi_" + i] = this._node_bottom.getChildByName("bg_bar").getChildByName("bg_xinxi_" + i);
            if (this["imgtishi_" + i]) {

                this["imgtishi_" + i].visible = false;
            }
            this["txttishi_" + i] = this["imgtishi_" + i].getChildByName("text_xinxi");
            this["txttishi_" + i].ignoreContentAdaptWithSize(true);

            var _sp = _node.getChildByName("Sprite_1");
            _sp.visible = false;

            this["imgshine_" + i] = _node.getChildByName("bg_guangxiao");
            this["keling_" + i] = _node.getChildByName("btn_lingqu");
            this["keling_" + i].visible = false;
            this["keling_" + i].i = i;
            this["keling_" + i].addTouchEventListener(touchFunc);

            // this["imgshine_"+i].setZOrder(-1);
            if (this["imgshine_" + i]) {
                var act_func = function(d) {
                    self["imgshine_" + d].runAction(cc.rotateBy(10, 360).repeatForever());
                };
                act_func(i);
                this["imgshine_" + i].visible = false;
            }
            this["prize_" + i].i = i;
            this["prize_" + i].addTouchEventListener(touchFunc);
        }



        this.loadBar = this._node_bottom.getChildByName("bg_bar").getChildByName("loadBar");
        this.loadBar.setPercent(0);

        this._panelRecv = this._node_top.getChildByName("PanelRecv");
        this._panelRecv.setVisible(false);
        this._recvItem = this._node_top.getChildByName("RecvItem");
        this._recvItem.setVisible(false);

        if (data) {
            this.initSelf();
        } else {
            this.reqlucky();
        }

        this._btn_list = this._back.getChildByName("btn_mylist");
        //this._btn_list.setLocalZOrder(1);
        this._btn_list.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    if(MjClient.isUseUIv3 && MjClient.isUseUIv3())
                        self.addChild(new luckyList_newLayer_v3(this._data), 1);
                    else
                        self.addChild(new luckyList_newLayer(this._data), 1);
                    break;
                default:
                    break;
            }
        }, this);
        this._btn_list.runAction(cc.sequence(cc.rotateBy(1, 5), cc.rotateBy(2, -10), cc.rotateBy(1, 5)).repeatForever());

        // var bg_xian = this._back.getChildByName("bg_close");
        // bg_xian.runAction(cc.sequence(cc.rotateBy(1, 5), cc.rotateBy(2, -10), cc.rotateBy(1, 5)).repeatForever());

        this._tip_text = this._node_top.getChildByName("bg_tip").getChildByName("Text_tip");
        this._tip_text.ignoreContentAdaptWithSize(true);
        this._tip_text.setString("");
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
        self.loginLadder = self._data.loginLadder;
        self._canGet = false;
        self.setCanTouch(true);
        // this.loginLadder.days=14;
        // MjClient.Scene.addChild(new luckyBack_QiandaoLayer(this.loginLadder.ladder[0],1));
        var _len = self.loginLadder.ladder.length - 1;
        var imgFunc = function(_node, imageUrl) {
            cc.loader.loadImg(imageUrl,   {
                isCrossOrigin :  true
            },  function(err, img) {
                if (err) {
                    cc.log(err);
                } else if (img && sys.isObjectValid(_node)) {
                    var _sp = _node.getChildByName("Sprite_1");
                    _sp.visible = true;
                    _sp.setTexture(img);

                }
            });
        };
        for (var i = 1; i <= self.loginLadder.ladder.length; i++) {
            var str = "";
            var _money = self.loginLadder.ladder[i - 1].award.money;
            var _redpacket = self.loginLadder.ladder[i - 1].award.redpacket;
            var _integral = self.loginLadder.ladder[i - 1].award.integral;
            var _gold = self.loginLadder.ladder[i - 1].award.gold;
            if (_money) {
                str += _money + "元宝";
            }
            if (_integral) {
                if (str.length > 0) {
                    str += "+";
                }
                str += _integral + "礼券";
            }
            if (_redpacket) {
                if (str.length > 0) {
                    str += "+";
                }
                str += "现金红包";
            }
            if (_gold) {
                if (str.length > 0) {
                    str += "+";
                }
                str += _gold +"金币";
            }


            this["txttishi_" + i].setString(str);
            var _node = this._node_bottom.getChildByName("bg_bar").getChildByName("icon_" + i);
            _node.visible = true;
            var _txtDay = _node.getChildByName("text_day");
            _txtDay.setString(self.loginLadder.ladder[i - 1].amount + "天");

            var imageUrl = self.loginLadder.ladder[i - 1].image;
            imgFunc(_node,imageUrl);

            var posx = 0;
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ|| isJinZhongAPPType()) {
                posx = 780/7*i -65;
            }else{
                posx = 780/6*i -65;
            }
            cc.log(" ===== posx ",posx,posx + _node.width);
            // self.loginLadder.ladder[i - 1].amount / self.loginLadder.ladder[_len].amount * 780;
            //_node.setPositionX(posx);
            //this["imgtishi_" + i].setPositionX(posx + 30);

            if (!self.loginLadder.ladder[i - 1].recved && self.loginLadder.ladder[i - 1].isRecv) {
                this["imgshine_" + i].visible = true;
                this._canGet = true;
                this["keling_" + i].visible = true;

            } else {
                this["imgshine_" + i].visible = false;
                this["keling_" + i].visible = false;
            }

            if (self.loginLadder.ladder[i - 1].recved) {
                // _node.getChildByName("Sprite_1").setColor(cc.color(150*0.3,150*0.59,150*0.11));
                // var _label = new cc.LabelTTF("已领取",MjClient.fzcyfont,30);
                // _label.setRotation(-30);
                // _label.createWithSystemFont(cc.color(255,0,0));
                // _label.setColor(cc.color(255,0,0));
                // _label.setPosition(cc.p(_node.width/2,_node.height/2));
                // _node.addChild(_label);
                var img_yiling = _node.getChildByName("Image_yiling")
                img_yiling.setVisible(true);
            }
        }
        var _day = self.loginLadder.days;
        var _per = 0;
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ|| isJinZhongAPPType()) {
            _per = self.loginLadder.days / (self.loginLadder.ladder[_len].amount);
        } else {
            if (_day <= 3) {
                _per = 65 / 780 * _day / 3;
            } else if (_day <= 7) {
                _per = (56 * (_day - 3) / 4 + 139) / 780;
            } else if (_day <= 14) {
                _per = (56 * (_day - 7) / 7 + 269) / 780;
            } else if (_day <= 21) {
                _per = (56 * (_day - 14) / 7 + 399) / 780;
            } else if (_day <= 25) {
                _per = (56 * (_day - 21) / 4 + 529) / 780;
            } else if (_day <= 30) {
                _per = (56 * (_day - 25) / 5 + 659) / 780;
            }
        }


        // var _per = self.loginLadder.days / self.loginLadder.ladder[_len].amount;
        this.loadBar.setPercent(_per*100);
        this._tip_text.setString("您已连续登录" + self.loginLadder.days + "天");

        for (var i = 0; i < self.luckyImgList.length; i++) {
            this.init_prize(i, self.luckyImgList[i].image);
        }
        this.refreshTable();
        if (self._lastChance <= 0) {
            this.btn_start.setEnabled(false);
        } else {
            this.btn_start.setEnabled(true);
            this._canGet = true;
        }
        this.btn_start.addTouchEventListener(function(sender, Type) {

            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    cc.log(" === _lastChance  btn_start", self._lastChance);
                    playEffect("LuckyTable_new/click_btn", false);
                    if (self._lastChance > 0)
                        self.reqRun();
                    else
                        MjClient.showToast("当前没有抽奖机会");

                    MjClient.native.umengEvent4CountWithProperty("Dazhuanpan_Kaishi", {
                        uid: SelfUid()
                    });
                    break;
                default:
                    break;
            }
        }, this);

        if (this._data.lotteryList.length > 0) {
            this._panelRecv.setVisible(true);
            this.initPanelRecv(this._data.lotteryList);
        } else {
            this._panelRecv.setVisible(false);
        }

    },

    initPanelRecv: function(dataList) {
        var self = this;
        this._panelRecv.removeAllChildren();
        for (var i = 0; i < dataList.length; i++) {
            var item = this._recvItem.clone();
            item.setVisible(true);
            this._panelRecv.addChild(item);
            item.setPosition(cc.p(item.width * (i), 0));
            var textRecv = item.getChildByName("TextRecv");
            textRecv.ignoreContentAdaptWithSize(true);
            textRecv.setString(getNewName(unescape(dataList[i].nickname)) + "领取了" + dataList[i].title);

            var delay1 = new cc.DelayTime(0);
            var moveBy1 = new cc.MoveBy(3, cc.p(-item.width, 0));
            var callBack1 = new cc.CallFunc(function() {
                if (this.x < 0) {
                    this.setPositionX((dataList.length - 1) * this.width);
                }
            }.bind(item));
            if (dataList.length > 0) {
                item.runAction(cc.repeatForever(cc.sequence(delay1, moveBy1, callBack1)));
            }
        }
    },

    init_prize: function(number, vecImageUrl) {
        /*
         图片节点
         */
        cc.log("vecImageUrl ============== " + JSON.stringify(vecImageUrl));

        var imageUrl = vecImageUrl;
        var node_shine = this["img_" + number];
        var self = this;
        cc.loader.loadImg(imageUrl,   {
            isCrossOrigin :  true
        },  function(err, img) {
            if (err) {
                cc.log(err);
            } else if (img && sys.isObjectValid(self) && sys.isObjectValid(self._pointNode) && sys.isObjectValid(node_shine)) {
                var sprite_bg = new cc.Sprite("luckyTable_new/bg_prize.png");
                sprite_bg.setTexture(img);
                sprite_bg.setPosition(cc.p(node_shine.width / 2, node_shine.height / 2));
                node_shine.addChild(sprite_bg);
            }
        });

    },

    setCanTouch: function(isbool) {
        for (var i = 0; i <= 10; i++) {
            if (cc.sys.isObjectValid(this["btn_rule_" + i]))
                this["btn_rule_" + i].setTouchEnabled(isbool);
            if (cc.sys.isObjectValid(this["prize_" + i]))
                this["prize_" + i].setTouchEnabled(isbool);

        }
        if (cc.sys.isObjectValid(this._btn_list))
            this._btn_list.setTouchEnabled(isbool);
    },

    setNewName: function(name, length) {
        var _newName = name;
        var strlen = name.length;
        if (cc.isUndefined(length) || length == null) {
            length = 4; //默认名字限制6个字符
        }
        if (length < 4) {
            length = 4;
        }
        if (strlen >= length) {
            _newName = name.substring(0, length - 1);
            _newName += "...";
        }
        return _newName;
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

                var fileContent = MjClient.getShareImageFileToPYQ();
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

                var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "ShopOfJiFen/share_bg.jpg";
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

    createItem_work: function(oneData, number) {
        var self = this;
        var copyNode = this._work_cell.clone();
        copyNode.visible = true;

        var Text_rule = copyNode.getChildByName("Text_rule");
        Text_rule.ignoreContentAdaptWithSize(true);
        Text_rule.setString("" + oneData.title);

        var Slider_1= copyNode.getChildByName("Slider_1");
        Slider_1.setTouchEnabled(false);
        Slider_1.setPercent(oneData.count/oneData.total*100);

        var Text_1 = copyNode.getChildByName("Text_1");
        Text_1.ignoreContentAdaptWithSize(true);
        Text_1.setString(oneData.count + "/" + oneData.total);
        self["btn_rule_" + number] = copyNode.getChildByName("btn_rule");
        //self["btn_rule_" + number].ignoreContentAdaptWithSize(true);
        self["btn_rule_" + number].setTag(oneData.type);
        self["btn_rule_" + number].position = number + 1;
        self["btn_rule_" + number].addTouchEventListener(function(sender, type) {
            var tag = sender.getTag();
            if (type == 2) {
                this.type_work(tag);
                if (1 == sender.position) {
                    MjClient.native.umengEvent4CountWithProperty("Dazhuanpan_Qianwangyilingqu", {
                        uid: SelfUid()
                    });
                } else if (2 == sender.position) {
                    MjClient.native.umengEvent4CountWithProperty("Dazhuanpan_Qianwangerlingqu", {
                        uid: SelfUid()
                    });
                } else if (3 == sender.position) {
                    MjClient.native.umengEvent4CountWithProperty("Dazhuanpan_Qianwangsanlingqu", {
                        uid: SelfUid()
                    });
                }
            }
        }, this);

        if (oneData.count >= oneData.total) {
            self["btn_rule_" + number].loadTextureNormal("luckyTable_new_3.0/btn_ok.png");
            self["btn_rule_" + number].setTouchEnabled(false);
            self["btn_rule_" + number].setSize(cc.size(95, 68));
        } else {
            self["btn_rule_" + number].loadTextureNormal("luckyTable_new_3.0/btn_quwancheng.png");
            self["btn_rule_" + number].setTouchEnabled(true);
            self["btn_rule_" + number].setSize(cc.size(137, 56));
        }


        return copyNode;
    },
    addItems_work: function() {
        var _emailList = this._data.arr;
        this._work_list.removeAllItems();
        for (var i = 0; i < _emailList.length; i++) {
            cc.log(" ======this._data.arr new  ", i);
            if (cc.sys.isObjectValid(this._work_cell)) {
                this._work_list.pushBackCustomItem(this.createItem_work(_emailList[i], i));
            }
        }
        this._work_list.setScrollBarOpacity(0);
    },

    refreshTable: function() {
        if (!cc.sys.isObjectValid(this._back)) return;

        // var _text_1 = this._node_rule.getChildByName("text_rule");
        // _text_1.ignoreContentAdaptWithSize(true);
        // _text_1.setString("完成每项任务可转一次 每人每日最多可转" + this._data.arr.length+ "次");
        var text_start = this.img_num.getChildByName("Text_number");
        text_start.setString("完成每项任务可转1次\n 每人每日最多可转" + this._data.arr.length + "次");
        var image_tishikuang = this._back.getChildByName("Image_tishikuang");
        image_tishikuang.setVisible(false);
        var text_gongzhonghao = image_tishikuang.getChildByName("text_gongzhonghao");
        text_gongzhonghao.ignoreContentAdaptWithSize(true);
        text_gongzhonghao.setString(MjClient.systemConfig.gongzhonghao);
        var text_weixin = image_tishikuang.getChildByName("text_weixin");
        text_weixin.ignoreContentAdaptWithSize(true);
        text_weixin.setString(this._data.weixin);

        this.addItems_work();



    },
    reqRun: function() {
        var self = this;
        // MjClient.block();
        self.btn_start.setTouchEnabled(false);
        self.setCanTouch(false);
        MjClient.gamenet.request("pkplayer.handler.lottery", {
                key: "TURN"
            },
            function(rtn) {
                if (rtn.code == 0) {
                    cc.log(" =========== haian lottery " + JSON.stringify(rtn));
                    self._number = rtn.data.num;
                    _title = rtn.data.title;
                    self._prizeType = rtn.data.type;
                    self.luckyPrize_number = rtn.data.amount;
                    self.luckyPrize_type = rtn.data.type;
                    self.RotationAct(self._number);
                    // var _rotation = cc.rotateBy(3.5, sum); //.easing(cc.easeExponentialInOut());

                    self._animNode.setAnimation(0, "daiji1", true);
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

    reqQianDao: function(key, number, data) {
        var self = this;
        // MjClient.block();
        self.btn_start.setTouchEnabled(false);
        self.setCanTouch(false);
        MjClient.gamenet.request("pkplayer.handler.lottery", {
                key: key
            },
            function(rtn) {
                if (rtn.code == 0) {
                    cc.log(" =========== 签到 lottery " + JSON.stringify(rtn));
                    self.refreshAct();
                    MjClient.Scene.addChild(new luckyBack_QiandaoLayer(data, number));
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

    RotationAct: function(number) {
        if (!cc.sys.isObjectValid(this)) return;
        var self = this;
        for (var i = 0; i < 10; i++) {
            self["shine_" + i].setVisible(false);
        }
        var sum = 10 * 3 + number;
        cc.log(" ====== sum ", sum, " 中奖数字：", number);
        var _sum = sum - 6;
        var timedelay = 1.5 / _sum;
        var timedelay2 = 0.23;
        var type = this._timeType;
        playEffect("LuckyTable_new/music_prize", false);
        var _sp;
        var func = function(d, time, time2) {
            var num = d % 10;

            self["shine_" + num].runAction(cc.sequence(cc.DelayTime(time), cc.callFunc(function() {
                self["shine_" + num].setVisible(true);
                if (d == sum) {
                    _sp = new cc.Sprite("luckyTable_new/shine_2.png");
                    _sp.setPosition(cc.p(self["shine_" + num].width/2,self["shine_" + num].height/2));
                    self["shine_" + num].addChild(_sp);
                    _sp.setScale(0.2);
                    _sp.runAction(cc.spawn(cc.scaleTo(0.3,1),cc.fadeOut(0.3)) );

                }
            }), cc.DelayTime(time2), cc.callFunc(function() {
                if (d < sum) {
                    self["shine_" + num].setVisible(false);
                }

            })));

        };

        for (var i = 0; i <= sum; i++) {
            if (i <= _sum) {
                var time = i * timedelay;
                func(i, time, timedelay);

            } else {
                var time = (_sum) * timedelay + (i - (_sum)) * timedelay2;
                func(i, time, timedelay2);
            }
        }

        this.runAction(cc.sequence(cc.DelayTime(time + 0.3), cc.callFunc(function() {
            self.refreshAct();
            // if (self.luckyPrize_type) {
            //     self.reqShare();
            // }
            self._animNode.setAnimation(0, "daiji", true);
            self.addChild(new luckyBack_newLayer(self.luckyPrize_type, self.luckyPrize_number), 1);
        })));


    },

    reqlucky: function() {
        var self = this;
        // MjClient.block();
        self.setCanTouch(false);
        MjClient.gamenet.request("pkplayer.handler.lotteryMsg", {
                key: "TURN"
            },
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
        MjClient.gamenet.request("pkplayer.handler.lotteryCallback", {
                key: "TURN"
            },
            function(rtn) {
                if (rtn.code == 0) {
                    cc.log(" ===== haianLotteryCallback ===   " + JSON.stringify(rtn));
                    if (self._prizeType == 1) {
                        MjClient.showToast("元宝已发放到账户中");
                    } else if (self._prizeType == 2) {
                        MjClient.showToast("请去公众号领取");
                    } else if (self._prizeType == 4) {
                        MjClient.showToast("礼券已发放到账户中");
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

    refreshAct: function() {
        if (!cc.sys.isObjectValid(this.btn_start)) return;
        var self = this;
        self.btn_start.setTouchEnabled(true);
        self.setCanTouch(true);
        self.stopAllActions();
        self.reqlucky();

    },
    reqTodayShare: function() {
        var self = this;
        MjClient.gamenet.request("pkplayer.handler.lotteryShare", {
                key: "TURN"
            },
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
    setCloseCallback: function(callback) {
        this._closeCallback = callback;
    }

});

var luckyBack_QiandaoLayer = cc.Layer.extend({

    ctor: function(data, number) {
        this._super();
        var UI = ccs.load("LucklyTable_qianDaoBack.json");
        this.addChild(UI.node);
        var self = this;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        _block.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                self.removeFromParent();
            }
        }, this);
        MjClient.showToast("奖励已发放到账，请注意查收");
        playEffect("LuckyTable_new/music_get", false);
        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);

        this._luckyNode_1 = _back.getChildByName("lucky_1");
        var str = "";
        if (data.award) {
            var _money = data.award.money;
            var _integral = data.award.integral;
            var _redpacket = data.award.redpacket;
            var _gold = data.award.gold;
        }
        if (_money) {
            str += _money + "元宝";
            data.image = data.image || "shareToday/icon_yuanbao.png";
        }else if (_integral) {
            if (str.length > 0) {
                str += "+";
            }
            data.image = data.image || "shareToday/icon_liquan.png";
            str += _integral + "礼券";
        }else if (_redpacket) {
            if (str.length > 0) {
                str += "+";
            }
            data.image = data.image || "shareToday/icon_redpacket.png";
            str += _redpacket + "现金红包";
        }else if (_gold) {
            if (str.length > 0) {
                str += "+";
            }
            data.image = data.image || "shareToday/icon_jinbi.png";
            str += _gold + "金币";
        }else if(data.title) {
            str += data.count + data.title;
        }
        var _txt1 = this._luckyNode_1.getChildByName("Text_desc");
        _txt1.ignoreContentAdaptWithSize(true);
        var _str = "";
        // if (!_redpacket) {
            _str = "恭喜你获得" + str + "奖励";
        // } else {
        //     _str = "恭喜你获得" + str + ",红包奖励请关注" + MjClient.systemConfig.gongzhonghao + "公众号领取";
        // }
        _txt1.setString(_str);
        var _time = 0.08;
        var _rat = 3;
        var bg_a = this._luckyNode_1.getChildByName("bg_a");
        bg_a.visible = false
        // bg_a.runAction(cc.sequence(cc.rotateBy(_time,_rat),cc.rotateBy(_time*2,-_rat*2),cc.rotateBy(_time,_rat)).repeatForever());

        var bg_b = this._luckyNode_1.getChildByName("bg_b");
        bg_b.visible = false
        // bg_b.runAction(cc.sequence(cc.rotateBy(_time,-_rat),cc.rotateBy(_time*2,_rat*2),cc.rotateBy(_time,-_rat)).repeatForever());
        var bg_c = _back.getChildByName("bg_c");
        this._luckyNode_1.runAction(cc.fadeIn(1));
        bg_c.runAction(cc.spawn(cc.scaleTo(0.7,2),cc.fadeOut(0.5)));

        var _sprite = this._luckyNode_1.getChildByName("Sprite_1");
        var imageUrl = data.image;
        cc.loader.loadImg(imageUrl,   {
            isCrossOrigin :  true
        },  function(err, img) {
            if (err) {
                cc.log(err);
            } else if (img && sys.isObjectValid(_sprite)) {
                var _sp = _sprite;
                _sp.visible = true;
                _sp.setTexture(img);

            }
        });


        // _sprite.setTexture("luckyTable_new/btnQian_" + number + ".png");
    },

});

var luckyBack_newLayer = cc.Layer.extend({

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
                    var getNum ;
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ|| isJinZhongAPPType()) {
                        getNum= getRandomRange(0,100);
                        if (getNum < 33) {
                            filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "luckyTable_new/participator_hongbao.jpg";
                        }else if (getNum < 66) {
                            filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "luckyTable_new/participator_liquan.jpg";
                        }else{
                            filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "luckyTable_new/participator_jinbi.jpg";
                        }
                    }else{
                        getNum= getRandomRange(0,100)<50 ? 0 : 1;
                        if (getNum) {
                            filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "luckyTable_new/participator_hongbao.jpg";
                        }else{
                            filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "luckyTable_new/participator_liquan.jpg";
                        }

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
                            if (MjClient.LucklyNew_ui) {
                                MjClient.LucklyNew_ui.getShare();
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
        MjClient.luckyTableNew_ui.luckyPrize_number = number;
        MjClient.luckyTableNew_ui.luckyPrize_type = type;
        var UI = ccs.load("LucklyTable_newBack.json");
        BindUiAndLogic(UI.node, this.jsBind);
        this.addChild(UI.node);
        MjClient.LucklyNew_ui = this;
        var self = this;
        this._number = MjClient.luckyTableNew_ui._number;
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
        var _txt = this._luckyNode_2.getChildByName("Text_desc");
        _txt.ignoreContentAdaptWithSize(true);

        var _time = 0.08;
        var _rat = 3;
        var bg_a = this._luckyNode_2.getChildByName("bg_a");
        bg_a.runAction(cc.sequence(cc.rotateBy(_time,_rat),cc.rotateBy(_time*2,-_rat*2),cc.rotateBy(_time,_rat)).repeatForever());

        var bg_b = this._luckyNode_2.getChildByName("bg_b");
        bg_b.runAction(cc.sequence(cc.rotateBy(_time,-_rat),cc.rotateBy(_time*2,_rat*2),cc.rotateBy(_time,-_rat)).repeatForever());
        var bg_c = _back.getChildByName("bg_c");
        if (!type) {
            bg_c.visible = false;
        }else{
            this._luckyNode_2.runAction(cc.fadeIn(1));
            bg_c.runAction(cc.spawn(cc.scaleTo(0.7,2),cc.fadeOut(0.5)));
        }
        

        //this._number
        var _sp = this._luckyNode_2.getChildByName("Sprite_1");
        var _num = this._number;
        var imageUrl = MjClient.luckyTableNew_ui._data.awardList[_num].image;

        cc.loader.loadImg(imageUrl,   {
            isCrossOrigin :  true
        },  function(err, img) {
            if (err) {
                cc.log(err);
            } else if (img && sys.isObjectValid(self)) {
                _sp.setTexture(img);
            }
        });
        

        if (type == 0) {
            this._luckyNode_1.setVisible(true);
            _btn_share.setVisible(false);
            close.setVisible(false);
            _block.setTouchEnabled(true);
            cc.log(" ---- _block ----------");
            _block.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    self.removeFromParent();
                    // if (type) {
                    //     MjClient.luckyTableNew_ui.reqShare();
                    // }
                    
                }
            }, this);

        } else if (type == 1) {
            this._luckyNode_2.setVisible(true);
            _txt.setString("恭喜你获得" + number + "元宝奖励,分享成功后自动到账");
        } else if (type == 2) {
            this._luckyNode_2.setVisible(true);
            // _txt.setString("恭喜你获得" + number + "红包奖励");
            _txt.setString("恭喜你获得" + number + "元红包奖励,分享成功后,请关注" + MjClient.systemConfig.gongzhonghao + "公众号领取");
        } else if (type == 4) {
            this._luckyNode_2.setVisible(true);
            _txt.setString("恭喜你获得" + number + "礼券奖励,分享成功后自动到账");
        } else if (type == 5) {
            this._luckyNode_2.setVisible(true);
            _txt.setString("恭喜你获得" + number + "金币奖励,分享成功后自动到账");
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
    getShare: function() {
        this.removeFromParent();
        MjClient.luckyTableNew_ui.reqShare();
    }


});


var luckyList_newLayer = cc.Layer.extend({

    ctor: function(data) {
        this._super();
        var UI = ccs.load("LucklyTable_newRank.json");
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
        var str_1 = "温馨提示：现金红包请前往公众号（" + MjClient.systemConfig.gongzhonghao + "）领取。";
        text_desc.setString(str_1);
        this._text_desc = text_desc;
        this._text_desc.setVisible(false);

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
        } else if (oneData.type == 5) {
            _content.setString(oneData.amount + "金币");
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

var luckyList_newLayer_v3 = cc.Layer.extend({

    ctor: function(data) {
        this._super();
        var UI = ccs.load("LucklyTable_newRank_3.0.json");
        this.addChild(UI.node);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);

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
        var str_1 = "温馨提示：现金红包请前往公众号（" + MjClient.systemConfig.gongzhonghao + "）领取。";
        text_desc.setString(str_1);
        this._text_desc = text_desc;
        this._text_desc.setVisible(false);

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
        } else if (oneData.type == 5) {
            _content.setString(oneData.amount + "金币");
        } else {
            _content.setString("谢谢参与");
        }
        _tai.setString(oneData.remark);
        if(oneData.type == 1 || oneData.type == 2 || oneData.type == 4 || oneData.type == 5){
            _content.setTextColor(cc.color("#ff6f20"));
        }else{
            _content.setTextColor(cc.color("#38ae6f"));
        }
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