/**create by Lms
 * @DateTime:     2019-01-03 
 * @Description: 春节 金币场红包 
 */

var GoldNewYearRedPacket_Layer = cc.Layer.extend({

    onExit: function() {
        this._super();
    },
    ctor: function(data) {
        this._super();
        var UI = ccs.load("Active_goldNewYearRedPacket.json");
        this.addChild(UI.node);
        var self = this;
        this._data = data;
        this._closeCallback = null;
        var block = UI.node.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = UI.node.getChildByName("back");
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        this._back = back;

        this._page_1 = back.getChildByName("Image_1");
        this._page_2 = back.getChildByName("Image_2");
        this._page_2.visible = false;
        // this._page_1.visible = false;

        var closeBtn = back.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (this._closeCallback) {
                    this._closeCallback();
                }
                self.removeFromParent();
            }
        }, this);
        //   btn_buy
        this._btnBuy = this._page_1.getChildByName("btn_buy");        

        this.node_text1 = this._page_1.getChildByName("node_text");
        this.node_text2 = this._page_2.getChildByName("node_text2");

       

        this._node_loadbar = this._page_2.getChildByName("loadbar_bg");
        this._loadbar = this._node_loadbar.getChildByName("LoadingBar_1");
        this._loadbar.setPercent(0);
        for (var i = 0; i < 7; i++) {
            this["_nodeImg_" + i] = this._node_loadbar.getChildByName("img_" + i);
            this["_nodeText_" + i] = this["_nodeImg_" + i].getChildByName("Text_1");
            this["_nodeText_" + i].setString("金币");
        }



        this._textRule = back.getChildByName("Text_desc");
        this._textRule.y += 30;
        this._textRule.height += 50;
        this._textRule.setFontName(MjClient.fzcyfont);
        if (data) {
            this.refresh_main();
        } else {
            this.reqMainMsg();
        }

        UIEventBind(null, this, "rechargeResult", function() {
            self.reqMainMsg();
        })

    },


    refresh_main: function() {
        var self = this;
        var _show = this._data.isRecharge;
        this._page_2.visible = _show;
        this._page_1.visible = !_show;

        if (this._data.days.length > 1) {
            var per = (this._data.days.length - 1)/6 * 100;
            this._loadbar.setPercent(per);
        }

        this._btnBuy.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                MjClient.Scene.addChild(new payWayLayer(function(platform) {
                    // cc.log(" ============== self._data.rechargeLadder.id ",self._data.rechargeLadder[0].id)
                    MjClient.recharge(self._data.rechargeLadder[0].id, parseInt(platform));
                }));
            }
        }, this);

        for (var i = 0; i < 7; i++) {
            if (this._data.days[i]) {
                this["_nodeImg_" + i].loadTexture("active_newYearGoldRedPacket/icon_jinbi.png");
            } else {
                this["_nodeImg_" + i].loadTexture("active_newYearGoldRedPacket/icon_jinbi2.png");
            }
            this["_nodeText_" + i].setString(this._data.goldArr[i] + "金币");
        }
        this._textRule.setString(this._data.desc);

        this._startTime = MjClient.dateFormat(new Date(parseInt(this._data.startTime)), 'MM月dd日');
        this._endTime = MjClient.dateFormat(new Date(parseInt(this._data.endTime)), 'MM月dd日');

         /**create by Lms
         * @Description: ["仅需   ",MjClient.fzcyfont,36,["ff","ff","ff",0],[0,0],0],
         *               ["元,领取",MjClient.fzcyfont,36,[255,255,255,0],[0,0],0],
         *                 字符串   字体             大小  颜色 (透明度)          坐标  换行
         */
        // var _dataList = [
        //     [["仅需  "], MjClient.fzcyfont, 36, ["ff", "ff", "ff"],[0, 0], 0],
        //     [this._data.amount, MjClient.fzcyfont, 36, [245, 243, 94],[0, 0], 0],
        //     ["  元,领取 ", MjClient.fzcyfont, 36, ["ff", "ff", "ff"],[0, 0], 0],
        //     [this._data.gold, MjClient.fzcyfont, 36, [245, 243, 94],[0, 0], 0],
        //     ["  金币", MjClient.fzcyfont, 36, ["ff", "ff", "ff"],[0, 0], 0],
        //     ["活动时间：" + this._startTime + " ~ " + this._endTime, MjClient.fzcyfont, 28, ["ff", "ff", "ff"],[0, -40], 1],
        // ];
        // COMMON_UI.RichText(_dataList, this.node_text1);
        // var _dataList2 = [
        //     ["仅需  ", MjClient.fzcyfont, 36, ["a1", "15", "15"],[0, 0], 0],
        //     [this._data.amount, MjClient.fzcyfont, 36, ["a1", "15", "15"],[0, 0], 0],
        //     ["  元,领取 ", MjClient.fzcyfont, 36, ["a1", "15", "15"],[0, 0], 0],
        //     [this._data.gold, MjClient.fzcyfont, 36, ["a1", "15", "15"],[0, 0], 0],
        //     ["  金币", MjClient.fzcyfont, 36, ["a1", "15", "15"],[0, 0], 0],
        //     ["活动时间：" + this._startTime + " ~ " + this._endTime, MjClient.fzcyfont, 24, ["a1", "15", "15"],[0, -40], 1],
        // ];

        // COMMON_UI.RichText(_dataList2, this.node_text2);

    },

    reqMainMsg: function() {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.goldfieldNewYearInfo", {},
            function(rtn) {
                cc.log(" ===== goldfieldNewYearInfo === " + JSON.stringify(rtn));
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

    setCloseCallback: function(callback) {

        this._closeCallback = callback;

    },


});

//GoldNewYearRedPacket_tip
var GoldNewYearRedPacket_Tip = cc.Layer.extend({

    onExit: function() {
        this._super();
    },
    ctor: function(data) {
        this._super();
        var UI = ccs.load("Active_goldNewYearRedPacket_tip.json");
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
                if (this._closeCallback) {
                    this._closeCallback();
                }
                self.removeFromParent();
            }
        }, this);

        this._btnBuy = back.getChildByName("btn_buy");

        this._text_buy= this._btnBuy.getChildByName("Text_num");
        this._text_buy.setString("");
        // Text_rule

        this._text_rule = back.getChildByName("Text_rule");
        this._text_rule.setString("");

        // UIEventBind(null, closeBtn, "updateInfo", function () {
        //     self.reqMainMsg();
        // });

        if (data) {
            this.refresh_main();
        } else {
            this.reqMainMsg();
        }
        UIEventBind(null, this, "rechargeResult", function() {
            MjClient.Scene.addChild(new GoldNewYearRedPacket_Layer());
            self.removeFromParent();
        });

    },

    refresh_main: function() {
        var self = this;
        this._text_buy.setString("" + this._data.amount);
        this._text_rule.setString("" + this._data.desc);

        this._btnBuy.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                MjClient.Scene.addChild(new payWayLayer(function(platform) {
                    // cc.log(" ============== self._data.rechargeLadder.id ",self._data.rechargeLadder[0].id)
                    MjClient.recharge(self._data.rechargeLadder[0].id, parseInt(platform));
                }));
            }
        }, this);

        if (this._data.isRecharge) {
            MjClient.Scene.addChild(new GoldNewYearRedPacket_Layer(self._data));
            self.removeFromParent();
        }

    },

    reqMainMsg: function() {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.goldfieldNewYearInfo", {},
            function(rtn) {
                cc.log(" ===== pkplayer.handler.goldfieldNewYearInfo 2222 === " + JSON.stringify(rtn))
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

    setCloseCallback: function(callback) {

        this._closeCallback = callback;

    },


});