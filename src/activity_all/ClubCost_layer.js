/**
 * Created by WuXiaoDong on 2019/9/25.
 */


var ClubCost_Layer = cc.Layer.extend({

    onExit: function() {
        this._super();
    },
    ctor: function(data) {
        this._super();
        var UI = ccs.load("Active_clubCost.json");
        this.addChild(UI.node);
        var self = this;
        this._data = data;
        this._closeCallback = null;
        var block = UI.node.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = UI.node.getChildByName("back");
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        this._back = back;

        if(MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ){
            MjClient.CLUBCOST = MjClient.CLUBCOST_XZ;
        }

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
        for (var i = 0; i <= 3; i++) {
            this["_node_" + i] = this._node_bar.getChildByName("node_" + i);
            if (this["_node_" + i]) {
                this["_node_" + i].setPositionY(25);
                this["_shine_" + i] = this["_node_" + i].getChildByName("img_shine");
                this["_shine_" + i].setVisible(false);
                this["_box_" + i] = this["_node_" + i].getChildByName("img_box");
                this["_box_" + i].setPosition(cc.p(50, 47));
                this["_shine_" + i].runAction(cc.sequence(cc.rotateBy(2, 360)).repeatForever());

                this["_shine_2_" + i] = this["_node_" + i].getChildByName("img_shine_2");
                this["_shine_2_" + i].setVisible(false);
                this["_shine_2_" + i].runAction(cc.sequence(cc.spawn(cc.scaleTo(0.5, 2),cc.fadeOut(0.5)), cc.callFunc(function () {
                    this.setScale(1);
                    this.setOpacity(255);
                }.bind(this["_shine_2_" + i]))).repeatForever());

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
                    var layer = new ClubCost_ruleLayer(this._data);
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
        // this._data.cost = 299
        var dataList = MjClient.CLUBCOST;
        var lastData = dataList.length - 1;
        var _len = 681 / MjClient.CLUBCOST.length;
        var _lenBox = 55 / 2;
        var _len2 = 0;
        if (this._data.cost <= dataList[0].cost) {
            _len2 = (_len - _lenBox) * this._data.cost / dataList[0].cost;
        } else if (this._data.cost <= dataList[1].cost) {
            _len2 = _len - _lenBox + _len * (this._data.cost - dataList[0].cost) / (dataList[1].cost - dataList[0].cost);
        } else if (this._data.cost <= dataList[2].cost) {
            _len2 = _len * 2 - _lenBox + _len * (this._data.cost - dataList[1].cost) / (dataList[2].cost - dataList[1].cost);
        } else if (this._data.cost <= dataList[3].cost) {
            _len2 = _len * 3 - _lenBox + _len * (this._data.cost - dataList[2].cost) / (dataList[3].cost - dataList[2].cost);
        }
        // var _len = this._data.cost / dataList[lastData].cost * 100;
        this._bar.setPercent(_len2 / 681 * 100);

        for (var i = 0; i < dataList.length; i++) {
            var _pos = (i + 1) / dataList.length * 681;
            this["_node_" + i].setPositionX(_pos);
            this["_get_" + i].setString(dataList[i].gift + "宝箱");
            this["_cost_" + i].setString(dataList[i].cost + "");
            var filePath = "active_clubCost/prize_" + i + "_n.png";
            this["_box_" + i].loadTexture(filePath);
            if(i == 0){
                if(this._data.cost >= dataList[i].cost){//已完成
                    if(this._data.first == 0){//未领取
                        this["_shine_" + i].setVisible(true);
                        this["_shine_2_" + i].setVisible(true);
                        this["_box_" + i].setTouchEnabled(true);
                        this["_box_" + i].setTag(i+1);
                        this["_box_" + i].addTouchEventListener(function(sender, type) {
                            if (type == 2) {
                                var tag = sender.getTag();
                                this.reqGetYB(tag);
                            }
                        }, this);
                    }else {//已领取
                        filePath = "active_clubCost/prize_" + i + "_s.png";
                        this["_box_" + i].loadTexture(filePath);
                        this["_shine_" + i].setVisible(false);
                        this["_shine_2_" + i].setVisible(false);
                        this["_box_" + i].setTouchEnabled(false);
                    }
                }else {//未完成
                    this["_shine_" + i].setVisible(false);
                    this["_shine_2_" + i].setVisible(false);
                    this["_box_" + i].setTouchEnabled(false);
                }
            }else if(i == 1){
                if(this._data.cost >= dataList[i].cost){//已完成
                    if(this._data.second == 0){//未领取
                        this["_shine_" + i].setVisible(true);
                        this["_shine_2_" + i].setVisible(true);
                        this["_box_" + i].setTouchEnabled(true);
                        this["_box_" + i].setTag(i+1);
                        this["_box_" + i].addTouchEventListener(function(sender, type) {
                            if (type == 2) {
                                var tag = sender.getTag();
                                this.reqGetYB(tag);
                            }
                        }, this);
                    }else {//已领取
                        filePath = "active_clubCost/prize_" + i + "_s.png";
                        this["_box_" + i].loadTexture(filePath);
                        this["_shine_" + i].setVisible(false);
                        this["_shine_2_" + i].setVisible(false);
                        this["_box_" + i].setTouchEnabled(false);
                    }
                }else {//未完成
                    this["_shine_" + i].setVisible(false);
                    this["_shine_2_" + i].setVisible(false);
                    this["_box_" + i].setTouchEnabled(false);
                }
            }else if(i == 2){
                if(this._data.cost >= dataList[i].cost){//已完成
                    if(this._data.third == 0){//未领取
                        this["_shine_" + i].setVisible(true);
                        this["_shine_2_" + i].setVisible(true);
                        this["_box_" + i].setTouchEnabled(true);
                        this["_box_" + i].setTag(i+1);
                        this["_box_" + i].addTouchEventListener(function(sender, type) {
                            if (type == 2) {
                                var tag = sender.getTag();
                                this.reqGetYB(tag);
                            }
                        }, this);
                    }else {//已领取
                        filePath = "active_clubCost/prize_" + i + "_s.png";
                        this["_box_" + i].loadTexture(filePath);
                        this["_shine_" + i].setVisible(false);
                        this["_shine_2_" + i].setVisible(false);
                        this["_box_" + i].setTouchEnabled(false);
                    }
                }else {//未完成
                    this["_shine_" + i].setVisible(false);
                    this["_shine_2_" + i].setVisible(false);
                    this["_box_" + i].setTouchEnabled(false);
                }
            }else if(i == 3){
                if(this._data.cost >= dataList[i].cost){//已完成
                    if(this._data.fourth == 0){//未领取
                        this["_shine_" + i].setVisible(true);
                        this["_shine_2_" + i].setVisible(true);
                        this["_box_" + i].setTouchEnabled(true);
                        this["_box_" + i].setTag(i+1);
                        this["_box_" + i].addTouchEventListener(function(sender, type) {
                            if (type == 2) {
                                var tag = sender.getTag();
                                this.reqGetYB(tag);
                            }
                        }, this);
                    }else {//已领取
                        filePath = "active_clubCost/prize_" + i + "_s.png";
                        this["_box_" + i].loadTexture(filePath);
                        this["_shine_" + i].setVisible(false);
                        this["_shine_2_" + i].setVisible(false);
                        this["_box_" + i].setTouchEnabled(false);
                    }
                }else {//未完成
                    this["_shine_" + i].setVisible(false);
                    this["_shine_2_" + i].setVisible(false);
                    this["_box_" + i].setTouchEnabled(false);
                }
            }
        }
        this.text_yuanbao.setString(this._data.cost);
        var _timeStar = MjClient.dateFormat(new Date(parseInt(this._data.startTime)), 'MM月dd日');
        cc.log(" ====== 开始时间 ", _timeStar);
        var _timeEnd = MjClient.dateFormat(new Date(parseInt(this._data.endTime)), 'MM月dd日');
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
                type: index
            },
            function(rtn) {
                cc.log(" ===== clubCostActivityRecv === " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                    MjClient.showToast("领取成功");
                    self.reqMainMsg();
                    var number = MjClient.CLUBCOST[index-1].gift;
                    var layer = new ClubCost_tipLayer(number);
                    MjClient.Scene.addChild(layer);
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


var ClubCost_tipLayer = cc.Layer.extend({
    ctor: function(number) {
        this._super();
        var UI = ccs.load("Active_clubCosttip.json");
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
        title.setString("恭喜获得" + number + "元宝箱现金券，可在11月元宝宝箱活动中使用");


    },


});

var ClubCost_ruleLayer = cc.Layer.extend({
    ctor: function(data) {
        this._super();
        var UI = ccs.load("Active_clubCostrule.json");
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
        var _timeStar = MjClient.dateFormat(new Date(parseInt(this._data.startTime)), 'yyyy年MM月dd日');
        cc.log(" ====== 开始时间 ", _timeStar);
        var _timeEnd = MjClient.dateFormat(new Date(parseInt(this._data.endTime)), 'yyyy年MM月dd日');
        cc.log(" ====== 结束时间 ", _timeEnd);
        var days = Math.ceil((-parseInt(this._data.startTime) + parseInt(this._data.endTime)) / 86400000);
        var title = _list.getChildByName("Text_1");
        var len = MjClient.CLUBCOST.length - 1;
        var str = "活动时间：" + _timeStar + "-" + _timeEnd + "，活动结束后，停止跑数据，再额外展示2天" + "\n" +
            "活动规则：活动期间，亲友圈累计消耗元宝（" + days + "天累计），会长即可领取宝箱现金劵\n" +
                "消耗越多，奖励越多\n" +
            "1、消耗元宝数量" + MjClient.CLUBCOST[0].cost + "       可领取" + MjClient.CLUBCOST[0].gift + "元宝箱现金券\n" +
            "2、消耗元宝数量" + MjClient.CLUBCOST[1].cost + "       可领取" + MjClient.CLUBCOST[1].gift + "元宝箱现金券\n" +
            "3、消耗元宝数量" + MjClient.CLUBCOST[2].cost + "       可领取" + MjClient.CLUBCOST[2].gift + "元宝箱现金券\n" +
            "4、消耗元宝数量" + MjClient.CLUBCOST[3].cost + "       可领取" + MjClient.CLUBCOST[3].gift + "元宝箱现金券\n" +
            "领奖规则：\n" +
            "1、消耗对应数量元宝，即可领取相应奖励（累计消耗" + MjClient.CLUBCOST[len].cost + "元宝可领取所有奖励）。\n" +
            "2、消耗元宝数量统计为" + days + "天累计值。\n" +
            "3、活动结束后展示两天，若展示完还没领取奖励，则奖励失效。\n" +
            "4、活动期间每个宝箱仅可以领取一次，且宝箱现金劵不能叠加使用。\n" +
            "5、元宝消耗数量将统计会长多个亲友圈的累计消耗。\n" +
            "6、活动领取的宝箱代金劵仅限于11月元宝宝箱活动中使用。"

        title.setString(str);

    },


});

MjClient.CLUBCOST = [
    {cost:128, gift:158},
    {cost:388, gift:166},
    {cost:888, gift:168},
    {cost:2288, gift:198},
];

MjClient.CLUBCOST_XZ = [
    {cost:128, gift:158},
    {cost:328, gift:166},
    {cost:618, gift:168},
    {cost:1288, gift:198},
];