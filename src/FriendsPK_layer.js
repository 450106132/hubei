/**create by Lms
 * @DateTime:     2018-04-09 
 * @Description: 亲友圈 对战活动 淮安 南通改成淮安模式 所有APP都是淮安 
 */



var FriendsPK_Layer = cc.Layer.extend({

    onExit: function() {
        this._super();
    },
    ctor: function(data) {
        this._super();
        var UI = ccs.load("Active_friendsPK.json");
        this.addChild(UI.node);
        var self = this;
        this._data = data;
        this._closeCallback = null;
        var block = UI.node.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = UI.node.getChildByName("back");
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        this._back = back;

        var closeBtn = back.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (self._closeCallback) {
                    self._closeCallback();
                }
                self.removeFromParent();
            }
        });
        this.text_time = this._back.getChildByName("Text_1");
        this.text_2 = this._back.getChildByName("Text_2");
        this.text_yuanbao = this._back.getChildByName("Text_3");
        this.text_time.ignoreContentAdaptWithSize(true);
        this.text_2.ignoreContentAdaptWithSize(true);
        this.text_yuanbao.ignoreContentAdaptWithSize(true);
        this.text_time.setString("");
        this.text_2.setString("累计消耗元宝越多，奖励越多");
        this.text_yuanbao.setString("");

        this._node_bar = this._back.getChildByName("bar_node");
        this._bar = this._node_bar.getChildByName("bar_1");
        for (var i = 0; i <= 4; i++) {
            this["_node_" + i] = this._node_bar.getChildByName("node_" + i);
            if (this["_node_" + i]) {
                this["_node_" + i].setPositionY(25);
                this["_shine_" + i] = this["_node_" + i].getChildByName("img_shine");
                this["_shine_" + i].setOpacity(0);
                this["_box_" + i] = this["_node_" + i].getChildByName("img_box");
                this["_box_" + i].setPosition(cc.p(50, 47));
                this["_shine_" + i].runAction(cc.sequence(cc.blink(2, 5)).repeatForever());

                this["_cost_" + i] = this["_node_" + i].getChildByName("Text_cost");
                this["_cost_" + i].ignoreContentAdaptWithSize(true);
                this["_cost_" + i].setPositionY(-10);
                this["_cost_" + i].setString("");
                this["_get_" + i] = this["_node_" + i].getChildByName("Text_get");
                this["_get_" + i].ignoreContentAdaptWithSize(true);
                this["_get_" + i].setString("");

            }
        }

        var btn_rule = this._back.getChildByName("btn_rule");
        btn_rule.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (this._data) {
                    var layer = new FriendsPK_ruleLayer(this._data);
                    MjClient.Scene.addChild(layer);
                }

            }
        }, this);

        if (data) {
            this.refresh_main();
        } else {
            this.reqMainMsg();
        }

        // UIEventBind(null, closeBtn, "updateInfo", function () {
        //     self.reqMainMsg();
        // });

    },

    refresh_main: function() {
        //  test
        // for (var i = 0; i < 5; i++) {
        //     this._data.list[i].cost = 200 * i + 100;
        // }
        // this._data.maxCost = 299
        var dataList = this._data.list;
        var lastData = dataList.length - 1;
        var _len = 681 / 5;
        var _lenBox = 55 / 2;
        var _len2 = 0;
        if (this._data.maxCost <= dataList[0].cost) {
            _len2 = (_len - _lenBox) * this._data.maxCost / dataList[0].cost;
        } else if (this._data.maxCost <= dataList[1].cost) {
            _len2 = _len - _lenBox + _len * (this._data.maxCost - dataList[0].cost) / (dataList[1].cost - dataList[0].cost);
        } else if (this._data.maxCost <= dataList[2].cost) {
            _len2 = _len * 2 - _lenBox + _len * (this._data.maxCost - dataList[1].cost) / (dataList[2].cost - dataList[1].cost);
        } else if (this._data.maxCost <= dataList[3].cost) {
            _len2 = _len * 3 - _lenBox + _len * (this._data.maxCost - dataList[2].cost) / (dataList[3].cost - dataList[2].cost);
        } else {
            _len2 = _len * 4 - _lenBox + _len * (this._data.maxCost - dataList[3].cost) / (dataList[4].cost - dataList[3].cost);
        }
        // var _len = this._data.maxCost / dataList[lastData].cost * 100;
        this._bar.setPercent(_len2 / 681 * 100);

        for (var i = 0; i < dataList.length; i++) {
            var _pos = (i + 1) / dataList.length * 681;
            this["_node_" + i].setPositionX(_pos);
            this["_get_" + i].setString(dataList[i].gift + "宝箱");
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || isJinZhongAPPType() || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
                this["_get_" + i].setString(dataList[i].gift + "礼券");
            }
            this["_cost_" + i].setString(dataList[i].cost + "");
            var filePath = "active_friendsPK/prize_" + i + "_n.png";
            this["_box_" + i].loadTexture(filePath);
            if (dataList[i].recved) {
                filePath = "active_friendsPK/prize_" + i + "_s.png";
                this["_box_" + i].loadTexture(filePath);
                this["_shine_" + i].setOpacity(0);
                this["_box_" + i].setTouchEnabled(false);

            } else if (dataList[i].canRecv) {
                this["_shine_" + i].setOpacity(255);
                this["_box_" + i].setTouchEnabled(true);
                this["_box_" + i].setTag(i);
                this["_box_" + i].addTouchEventListener(function(sender, type) {
                    if (type == 2) {
                        var tag = sender.getTag();
                        this.reqGetYB(tag);
                    }
                }, this);

            } else {
                this["_shine_" + i].setOpacity(0);
                this["_box_" + i].setTouchEnabled(false);
            }



        }
        this.text_yuanbao.setString("累计消耗元宝数：" + this._data.maxCost + "");
        var _timeStar = MjClient.dateFormat(new Date(parseInt(this._data.start)), 'MM月dd日');
        cc.log(" ====== 开始时间 ", _timeStar);
        var _timeEnd = MjClient.dateFormat(new Date(parseInt(this._data.end - 86400000)), 'MM月dd日');
        cc.log(" ====== 结束时间 ", _timeEnd);
        this.text_time.setString("" + _timeStar + "~" + _timeEnd);

    },

    reqMainMsg: function() {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.clubCostActivityInfo", {},
            function(rtn) {
                cc.log(" ===== clubCostActivityInfo === " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                    self._data = rtn.data;
                    self.refresh_main();
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

    reqGetYB: function(index) {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.clubCostActivityRecv", {
                index: index
            },
            function(rtn) {
                cc.log(" ===== clubCostActivityRecv === " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                    MjClient.showToast("领取成功");
                    self.reqMainMsg();
                    if (self._data) {
                        var number = self._data.list[index].gift;
                        var layer = new FriendsPK_tipLayer(number);
                        MjClient.Scene.addChild(layer);
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

    setCloseCallback: function(callback) {

        this._closeCallback = callback;

    },


});


var FriendsPK_tipLayer = cc.Layer.extend({
    ctor: function(number) {
        this._super();
        var UI = ccs.load("Active_friendsPKtip.json");
        this.addChild(UI.node);
        var self = this;
        var block = UI.node.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = UI.node.getChildByName("back");
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0], true);
        this.back = back;

        var closeBtn = back.getChildByName("btn_close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                self.removeFromParent();
            }
        });
        var title = back.getChildByName("Text_desc");
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP)  {
            title.setString("恭喜获得" + number + "宝箱奖励，已发放到代理后台！");
        }else{
            title.setString("恭喜获得" + number + "宝箱奖励，请点击邮件领取奖励！");
        }
        

    },


});

var FriendsPK_ruleLayer = cc.Layer.extend({
    ctor: function(data) {
        this._super();
        var UI = ccs.load("Active_friendsPKrule.json");
        this.addChild(UI.node);
        var self = this;
        this._data = data;
        var block = UI.node.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = UI.node.getChildByName("back");
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0], true);
        this.back = back;

        var closeBtn = back.getChildByName("btn_close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                self.removeFromParent();
            }
        });
        var _list = back.getChildByName("ListView_1");
        _list.setInnerContainerSize(cc.size(610, 30 * 6));
        // _list.setScrollBarOpacity(0);
        var _timeStar = MjClient.dateFormat(new Date(parseInt(this._data.start)), 'yyyy年MM月dd日');
        cc.log(" ====== 开始时间 ", _timeStar);
        var _timeEnd = MjClient.dateFormat(new Date(parseInt(this._data.end - 86400000)), 'yyyy年MM月dd日');
        cc.log(" ====== 结束时间 ", _timeEnd);
        var days = Math.ceil((-parseInt(this._data.start) + parseInt(this._data.end)) / 86400000);
        var title = _list.getChildByName("Text_1");
        var len = this._data.list.length - 1;
        var str = "活动时间：" + _timeStar + "-" + _timeEnd + "\n" +
            "活动规则：活动期间，亲友圈消耗钻石（" + days + "天累计），部长即可领取礼包\n" +
            "1、消耗元宝数量" + this._data.list[0].cost + "       奖励元宝" + this._data.list[0].gift + "，对战玩家每人" + this._data.list[0].integral + "礼券" + "\n" +
            "2、消耗元宝数量" + this._data.list[1].cost + "       奖励元宝" + this._data.list[1].gift + "，对战玩家每人" + this._data.list[1].integral + "礼券" + "\n" +
            "3、消耗元宝数量" + this._data.list[2].cost + "       奖励元宝" + this._data.list[2].gift + "，对战玩家每人" + this._data.list[2].integral + "礼券" + "\n" +
            "4、消耗元宝数量" + this._data.list[3].cost + "       奖励元宝" + this._data.list[3].gift + "，对战玩家每人" + this._data.list[3].integral + "礼券" + "\n" +
            "5、消耗元宝数量" + this._data.list[4].cost + "       奖励元宝" + this._data.list[4].gift + "，对战玩家每人" + this._data.list[4].integral + "礼券" + "\n" +
            "领奖规则：\n" +
            "1、消耗相应数量元宝，领取相应的奖励（消耗" + this._data.list[len].cost + "元宝可领取之前的所有奖励）。\n" +
            "2、消耗元宝数量统计为" + days + "天累计值。\n" +
            "3、活动结束后展示两天，若展示完还没领取奖励，则奖励失效。\n" +
            "4、每项奖励活动期间仅可以领取一次。\n" +
            "5、场次统计和礼券发放以消耗钻石最多的一个牌友群的数据为准。\n";
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG) {
            str = "活动时间：" + _timeStar + "-" + _timeEnd + "\n" +
            "活动规则：活动期间，亲友圈消耗钻石（" + days + "天累计），部长即可领取礼包\n" +
            "1、消耗元宝数量" + this._data.list[0].cost + "       奖励元宝" + this._data.list[0].gift + "\n" +
            "2、消耗元宝数量" + this._data.list[1].cost + "       奖励元宝" + this._data.list[1].gift + "\n" +
            "3、消耗元宝数量" + this._data.list[2].cost + "       奖励元宝" + this._data.list[2].gift + "\n" +
            "4、消耗元宝数量" + this._data.list[3].cost + "       奖励元宝" + this._data.list[3].gift + "\n" +
            "5、消耗元宝数量" + this._data.list[4].cost + "       奖励元宝" + this._data.list[4].gift + "\n" +
            "领奖规则：\n" +
            "1、消耗相应数量元宝，领取相应的奖励（消耗" + this._data.list[len].cost + "元宝可领取之前的所有奖励）。\n" +
            "2、消耗元宝数量统计为" + days + "天累计值。\n" +
            "3、活动结束后展示两天，若展示完还没领取奖励，则奖励失效。\n" +
            "4、每项奖励活动期间仅可以领取一次。\n" +
            "5、场次统计发放以消耗钻石最多的一个牌友群的数据为准。\n";
        }else if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || isJinZhongAPPType() || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
            str = "活动时间：" + _timeStar + "-" + _timeEnd + "\n" +
                "活动规则：活动期间，亲友圈消耗钻石（" + days + "天累计），部长即可领取礼包\n" +
                "1、消耗元宝数量" + this._data.list[0].cost + "       奖励礼券" + this._data.list[0].gift + "\n" +
                "2、消耗元宝数量" + this._data.list[1].cost + "       奖励礼券" + this._data.list[1].gift + "\n" +
                "3、消耗元宝数量" + this._data.list[2].cost + "       奖励礼券" + this._data.list[2].gift + "\n" +
                "4、消耗元宝数量" + this._data.list[3].cost + "       奖励礼券" + this._data.list[3].gift + "\n" +
                "5、消耗元宝数量" + this._data.list[4].cost + "       奖励礼券" + this._data.list[4].gift + "\n" +
                "领奖规则：\n" +
                "1、消耗相应数量元宝，领取相应的奖励（消耗" + this._data.list[len].cost + "元宝可领取之前的所有奖励）。\n" +
                "2、消耗元宝数量统计为" + days + "天累计值。\n" +
                "3、活动结束后展示两天，若展示完还没领取奖励，则奖励失效。\n" +
                "4、每项奖励活动期间仅可以领取一次。\n" +
                "5、场次统计和礼券发放以消耗钻石最多的一个牌友群的数据为准。\n";
        }

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP) {
            str += "6、元宝发放到代理后台。";
        } else {
            str += "6、奖励通过邮件发放。";
        }
        title.setString(str);

    },


});