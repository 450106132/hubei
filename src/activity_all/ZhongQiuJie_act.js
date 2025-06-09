/**
 * @Author:      Lms
 * @DateTime:     2018-09-12
 * @Description: 永州中秋节策划方案
 */

var ZhongQiuJie_layer = cc.Layer.extend({
    onExit: function() {
        this._super();
    },
    ctor: function() {
        this._super();
        var UI = ccs.load("ZhongQiuJie_enter.json");
        this.addChild(UI.node);

        this._data = null;
        this._closeCallback = null;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0], true);
        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (this._closeCallback) {
                    this._closeCallback();
                }
                this.removeFromParent();
            }
        }, this);

        var _enter = _back.getChildByName("btn_enter");
        _enter.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                MjClient.Scene.addChild(new ZhongQiuJie_main());
                this.removeFromParent();
            }
        }, this);


    },

    setCloseCallback: function(callback) {
        this._closeCallback = callback;
    },

});



var ZhongQiuJie_main = cc.Layer.extend({
    ctor: function(data) {
        this._super();
        var UI = ccs.load("ZhongQiuJie_act.json");
        this.addChild(UI.node);
        this._data = data;

        this._schedule = false;
        var self = this;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this.back_left = UI.node.getChildByName("back_left");
        setWgtLayout(this.back_left, [0.61, 0.78], [0.5, 0.48], [0, 0]);

        this.back_right = this.back_left.getChildByName("back_right");
        // this.back_right.ClipAble = false;
        // setWgtLayout(this.back_right, [0.35, 0.88], [0.05, 0.05], [0, 0]);

        this.back_title = UI.node.getChildByName("back_title");
        this.back_title.setVisible(false);
        // setWgtLayout(this.back_title, [0.26, 0.096], [0.27, 0.88], [0, 0]);

        this.back_bottom = UI.node.getChildByName("back_bottom");
        this.back_title.setVisible(false);
        // setWgtLayout(this.back_bottom, [1, 0.07], [0.5, 0.0], [0, 0], true);

        // var _txtDesc = this.back_bottom.getChildByName("Text_desc");
        // _txtDesc.ignoreContentAdaptWithSize(true);
        // _txtDesc.setString("手气红包最高可得188元哦！每天可随时提现，提现后24小时到账公众号，请注意查收");

        var _close = this.back_left.getChildByName("close");
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent();
            }
        }, this);

        this._right_1 = this.back_right.getChildByName("Image_1");
        this._right_1.setVisible(true);
        this._right_2 = this.back_right.getChildByName("Image_2");
        this._right_2.setVisible(false);

        this._panelRecv = UI.node.getChildByName("PanelRecv");
        this._panelRecv.setVisible(false);
        setWgtLayout(this._panelRecv, [1, 1], [0.5, 0.95], [0, 0]);
        this._recvItem = UI.node.getChildByName("RecvItem");
        this._recvItem.setVisible(false);

        this._txt_duizhanNum = this.back_left.getChildByName("txt_duizhanNum");
        this._txt_duizhanNum.ignoreContentAdaptWithSize(true);
        this._txt_duizhanNum.setString("");

        // var Text_23 = this.back_left.getChildByName("Text_23");
        // Text_23.ignoreContentAdaptWithSize(true);
        // Text_23.setString("完成情况 ");

        this._listView = this.back_left.getChildByName("ListView_1");
        this._listCell = this.back_left.getChildByName("cell");
        this._listCell.setVisible(false);

        this.Text_dangqian = this.back_left.getChildByName("Text_dangqian");
        this.Text_dangqian.ignoreContentAdaptWithSize(true);
        this.Text_dangqian.setString("");

        this.Text_yichai = this.back_left.getChildByName("Text_yichai");
        this.Text_yichai.ignoreContentAdaptWithSize(true);
        this.Text_yichai.setString("");

        this.Text_xianjin = this.back_left.getChildByName("Text_xianjin");
        this.Text_xianjin.ignoreContentAdaptWithSize(true);
        this.Text_xianjin.setString("");

        this.Text_num = this._right_1.getChildByName("Text_num");
        this.Text_num.ignoreContentAdaptWithSize(true);
        this.Text_num.setString("");

        this.Text_number = this._right_2.getChildByName("Text_number");
        this.Text_number.ignoreContentAdaptWithSize(true);
        this.Text_number.setString("");

        this.btn_wancheng = this.back_left.getChildByName("btn_wancheng");
        var CREATEROOM_COLOR_1 = cc.color(237, 101, 1);
        var CREATEROOM_COLOR_2 = cc.color(47, 79, 79);
        var CREATEROOM_COLOR_3 = cc.color(158, 118, 78);

        this.btn_wancheng.addTouchEventListener(function(sender, type) {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:

                case ccui.CheckBox.EVENT_UNSELECTED:
                    var txt = sender.getChildByName("text");
                    if (!sender.isSelected()) {
                        txt.setTextColor(CREATEROOM_COLOR_1);
                        this.choose_sort(0);
                    } else {
                        txt.setTextColor(CREATEROOM_COLOR_3);
                        this.choose_sort(1);
                    }

                    break;
            }
        }, this);
        this.btn_wancheng.setSelected(false);

        this._btn_yaoqing = this.back_left.getChildByName("btn_yaoqing");

        this._btn_go = this.back_left.getChildByName("btn_go");

        this.btn_open = this._right_1.getChildByName("btn_open");
        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("zhongQiuJie_act/btn_open.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        this.btn_open.addChild(clipper);
        var sprite = new cc.Sprite("zhongQiuJie_act/enter_2.png");
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction); //进行向右移动的重复动作

        var list_rule = this.back_left.getChildByName("ListView_rule");
        var txt_rule = list_rule.getChildByName("Text_rule");
        var str = "1.完成任意一整场游戏领取10元红包" +

            "\n2.玩家召回一名4日内未登录或者未对战的玩家，召回成功一人可获得5元红包，以此类推、\n3.活动满30元红包才可以提现" +

            "\n4.点击去召回按钮，即可拉起微信分享游戏链接，符合4日内未登录或者未对战的玩家登陆游戏对战一整场即召回成功" +

            "\n5.领取红包进入微信公众号" + MjClient.systemConfig.gongzhonghao + "红包子菜单栏目领取\n";
        txt_rule.setString(str);
        txt_rule.height = 400;

        if (this._data) {
            this.init_main();
        } else {
            this.reqMainMsg();
        }


    },

    init_main: function() {
        var self = this;
        // this.Text_dangqian.setString("￥" + this._data.currentBonus);
        // this.Text_xianjin.setString(this._data.redPacketAmount + "元");
        // this.Text_yichai.setString(this._data.unpickCount + "个");
        this.Text_num.setString(this._data.amount + "");
        this._txt_duizhanNum.setString(this._data.inviteList.length);

        this._btn_yaoqing.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.openBrowser", {
                    type: 3
                }, function(rtn) {
                    if (rtn.code == 0) {
                        var pinfo = MjClient.data.pinfo;
                        var shareTitle = "您的好友" + unescape(pinfo.nickname ) + "，邀请您回来一起玩" + AppCnName[MjClient.getAppType()] + "，登录即送元宝现金，更多福利，等你回来~";
                        var layer = new shareLayer(rtn.data, shareTitle);
                        MjClient.Scene.addChild(layer);
                    } else {
                        if (rtn.message)
                            MjClient.showToast(rtn.message);
                        else
                            MjClient.showToast("请求数据失败");
                    }
                    MjClient.unblock();
                });

            }
        }, this);
        if (this._data.game) {
            this._btn_go.setTouchEnabled(false);
            this._btn_go.loadTextureNormal("zhongQiuJie_act/btn_go2.png");
        } else {
            this._btn_go.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    MjClient.Scene.addChild(new FriendCard_main());
                    this.removeFromParent();
                }

            }, this);
        }

        this.btn_open.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (this._data.amount < 30) {
                    var str = "没有达到30元金额不能开红包";
                    MjClient.Scene.addChild(new ZhongQiuJie_tip(str));
                    // MjClient.showToast("拆红包要求没有达到");
                    return;
                }

                this.reqChaiHongBao(this._data.amount);

                this._right_1.setVisible(false);
                this._right_2.setVisible(true);

            }

        }, this);



        var btn_get = this._right_2.getChildByName("btn_get");
        btn_get.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this._right_2.setVisible(false);
                this._right_1.setVisible(true);
                var str = "可直接到公众号提现";
                MjClient.Scene.addChild(new ZhongQiuJie_tip(str));
                // MjClient.showToast("可到公众号领取");
            }

        }, this);

        this.addItems(this._data.inviteList);

        if (this._data.carousel.length > 0) {
            this._panelRecv.setVisible(true);
            this.initPanelRecv();
        } else {
            this._panelRecv.setVisible(false);
        }

    },

    act_fly: function() {
        var act_sp = new cc.Sprite("zhongQiuJie_act/btn_open.png");
        this.back_right.addChild(act_sp, 100);
        var pos_1 = this.btn_open.getPosition();
        act_sp.setPosition(pos_1);
        var p = this.Text_dangqian.getPosition();
        p = this.Text_dangqian.getParent().convertToWorldSpace(p);
        p = this.btn_open.getParent().convertToNodeSpace(p);
        var pos_des = p;
        act_sp.runAction(cc.sequence(cc.scaleTo(0.8, 0.5), cc.spawn(cc.scaleTo(0.5, 0.1), cc.moveTo(0.5, pos_des), cc.delayTime(1.5)), cc.callFunc(function() {
            act_sp.removeFromParent();
        })));

    },
    choose_sort: function(number) {
        var listData = [];
        if (number == 0) { // 未完成

            var list = this._data.inviteList;
            for (var i = 0; i < list.length; i++) {
                if (list[i].status != 4) {
                    listData.push(list[i]);
                }
            }

        } else if (number == 1) { //完成
            listData = this._data.inviteList;
        }
        this.addItems(listData);
    },

    createItem: function(oneData) {
        if (!cc.sys.isObjectValid(this._listCell)) return;
        var self = this;
        var copyNode = this._listCell.clone();
        copyNode.visible = true;

        var img_head = copyNode.getChildByName("img_head");
        img_head.visible = false;
        var txt_name = copyNode.getChildByName("txt_name");
        txt_name.ignoreContentAdaptWithSize(true);
        txt_name.setString(getNewName(unescape(oneData.nickname)));


        var txt_id = copyNode.getChildByName("txt_id");
        txt_id.ignoreContentAdaptWithSize(true);
        txt_id.setString(oneData.userId);
        // var txt_num = copyNode.getChildByName("txt_num");
        // txt_num.ignoreContentAdaptWithSize(true);
        // txt_num.setString(oneData.game);

        var txt_ok = copyNode.getChildByName("txt_ok");
        txt_ok.ignoreContentAdaptWithSize(true);
        var str = oneData.status == 4 ? "完成" : "未完成";
        txt_ok.setString(str);

        var txt_bangding = copyNode.getChildByName("txt_bangding");
        if (txt_bangding) {
            txt_bangding.ignoreContentAdaptWithSize(true);
            var str_1 = oneData.mobileNum ? "绑定" : "未绑定";
            txt_bangding.setString(str_1);
        }


        var imageUrl = oneData.headimgurl;
        var pos = img_head.getPosition();
        cc.loader.loadImg(imageUrl ? imageUrl : "png/default_headpic.png",   {
            isCrossOrigin :  true
        },  function(err, img) {
            if (err) {
                cc.log(err);
            } else if (img && sys.isObjectValid(self.back_left)) {
                var sprite_bg = new cc.Sprite("zhongQiuJie_act/icon_head.png");
                sprite_bg.setPosition(pos);
                sprite_bg.setTexture(img);
                copyNode.addChild(sprite_bg);
            }
        });

        return copyNode;
    },
    addItems: function(data) {
        if (!data) return;
        var _emailList = data;
        this._listView.removeAllChildren();
        for (var i = 0; i < _emailList.length; i++) {
            this._listView.pushBackCustomItem(this.createItem(_emailList[i]));
        }

    },
    initPanelRecv: function() {
        var self = this;
        this._panelRecv.removeAllChildren();
        for (var i = 0; i < this._data.carousel.length; i++) {
            var item = this._recvItem.clone();
            item.setVisible(true);
            this._panelRecv.addChild(item);
            item.setPosition(cc.p(item.width * (i), 0));
            var textRecv = item.getChildByName("TextRecv");
            textRecv.ignoreContentAdaptWithSize(true);
            textRecv.setString(getNewName(unescape(this._data.carousel[i].nickname)) + "在" + this._data.carousel[i].time + "前领取" + this._data.carousel[i].amount + "元红包");

            var delay1 = new cc.DelayTime(0);
            var moveBy1 = new cc.MoveBy(3, cc.p(-item.width, 0));
            var callBack1 = new cc.CallFunc(function() {
                if (this.x < 0) {
                    this.setPositionX((self._data.carousel.length - 1) * this.width);
                }
            }.bind(item));
            if (this._data.carousel.length > 0) {
                item.runAction(cc.repeatForever(cc.sequence(delay1, moveBy1, callBack1)));
            }
        }
    },



    reqMainMsg: function() {
        var self = this;
        MjClient.gamenet.request("pkplayer.handler.activityInviteInfo", {},
            function(rtn) {
                if (rtn.code == 0) {
                    cc.log(" ===== invitePacketInfo ===   " + JSON.stringify(rtn));
                    self._data = rtn.data;
                    self.init_main();
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

    reqChaiHongBao: function(number) {
        var self = this;
        MjClient.gamenet.request("pkplayer.handler.activityInviteAward", {},
            function(rtn) {
                if (rtn.code == 0) {
                    cc.log(" ===== invitePacketUnpick ===   " + JSON.stringify(rtn));
                    self.Text_number.setString(number + "");
                    // self.act_fly();
                    self.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function() {
                        self.reqMainMsg();

                    })));
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
});



var ZhongQiuJie_tip = cc.Layer.extend({
    ctor: function(dataStr) {
        this._super();
        var UI = ccs.load("ZhongQiuJie_tip.json");
        this.addChild(UI.node);

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);

        var _bg = _back.getChildByName("img_bg");


        var _close = _bg.getChildByName("close");
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent();
            }
        }, this);

        var _text = _bg.getChildByName("Text_1");
        _text.ignoreContentAdaptWithSize(true);
        _text.setString(dataStr);



    },
});