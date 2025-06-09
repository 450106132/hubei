/**
 * @Author:      XiaoMaoGe
 * @Email:       lms_190865480@163.com
 * @QQ:       190865480
 * @DateTime:     2017-12-22 
 * @Description: 暖冬温情季 活动 
 */



var WinterLayer = cc.Layer.extend({
    _closeCallback:null,
    _timeType : null,
    _prizeType:null,
    _prizeNumber :null,
    ctor: function() {
        this._super();     
        var currentStr = MjClient.dateFormat(new Date(), "yyyyMMdd");
        var start_day = parseInt(currentStr + "00");
        var zhong_day = parseInt(currentStr + "12");
        if (0 <= (new Date().getHours()) && (new Date().getHours()) < 12) {
            //上午
            this._timeType = 1;
        } else {
            //下午
            this._timeType = 2;
        }
        cc.log(" ====== this._timeType ",this._timeType)
        var UI = ccs.load("Winter_main.json");
        this.addChild(UI.node);
        MjClient.Winter_ui = this;

        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);
        this._node_prize = this._back.getChildByName("node_prize_AM");       
        this._node_prize_2 = this._back.getChildByName("node_prize_PM");
        this._node_prize_3 = this._back.getChildByName("node_shine");
        if (this._timeType == 1) {
            this._node_prize.setVisible(true);
            this._node_prize_2.setVisible(false);
        }else{
            this._node_prize.setVisible(false);
            this._node_prize_2.setVisible(true);
        }
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
        //点击抽奖
        this._click = this._back.getChildByName("prize_click");
        this._click.addTouchEventListener(function(sender, type) {
            if (type == 2) { 
                cc.log( " ============ _click  ")
                self.reqWinter();
            }
        }, this);

       var bg_1 = this._back.getChildByName("bg_1");
       var bg_2 = this._back.getChildByName("bg_2");
       var bShow = true;
        bg_1.schedule(function () {
            if (bShow) {
                bg_1.setVisible(true);
                bg_2.setVisible(false);
                bShow = false;
            }
            else {
                bg_1.setVisible(false);
                bg_2.setVisible(true);
                bShow = true;
                
            }
        }, 0.5);

        for (var i = 1; i <= 8; i++) {
            this["prize_" + (i-1)] = this._node_prize.getChildByName("prize_" + i);
            this["prize_pm_" + (i-1)] = this._node_prize_2.getChildByName("prize_" + i);
            this["shine_" + (i-1)] = this._node_prize_3.getChildByName("shine_" + i);
            this["shine_" + (i-1)].setVisible(false);
        }

    },


    RotationAct: function(number) {
        if (!cc.sys.isObjectValid(this["prize_" + number])) return;
        var self = this;
        var sum = 8 * 3 + number;
        cc.log(" ====== sum ",sum);
        var timedelay = 0.1 ;
        var type = this._timeType;
        var _act = cc.scaleTo(timedelay, 1.2)
        var _act_1 = cc.scaleTo(timedelay, 1.0)
        for (var i = 0; i <= sum; i++) {
            var time = i * timedelay;
            var func = function(d) {
                var num = d % 8;
                self["shine_" + num].runAction(cc.sequence(cc.DelayTime(time), cc.callFunc(function() {
                    self["shine_" + num].setVisible(true);
                }), _act, cc.callFunc(function() {
                    if (d < sum) {
                        self["shine_" + num].setVisible(false);
                    }

                }), _act_1));
                // if (type == 1) {
                //     self["prize_" + num].runAction(cc.sequence(cc.DelayTime(time), cc.callFunc(function() {
                //         self["prize_" + num].setColor(cc.color(255, 165, 0));
                //     }), _act, cc.callFunc(function() {
                //         if (d < sum ) {
                //             self["prize_" + num].setColor(cc.color(255, 255, 255));
                //         }

                //     }), _act_1));
                // } else if (type == 2) {
                //     self["prize_pm_" + num].runAction(cc.sequence(cc.DelayTime(time), cc.callFunc(function() {
                //         self["prize_pm_" + num].setColor(cc.color(255, 165, 0));
                //     }), _act, cc.callFunc(function() {
                //         if (d < sum ) {
                //             self["prize_pm_" + num].setColor(cc.color(255, 255, 255));
                //         }

                //     }), _act_1));
                // }

            }
            func(i);
        }

        this.runAction(cc.sequence(cc.DelayTime(sum * timedelay + 0.5),cc.callFunc(function() {
                       self.addChild(new WinterBackLayer(self._prizeType,self._prizeNumber), 500);
                    })));

    },

    reqWinter: function() {
        var self = this;
        this._click.setTouchEnabled(false);
        // MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.wxShare", {
                uid: SelfUid()
            },
            function(rtn) {
                 cc.log("pkplayer.handler.reqWinter ----------- " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                    if (rtn.data.money) { // 元宝
                        var typeid = 1;
                        self._prizeType =1;
                        self._prizeNumber = rtn.data.money;
                        self.setPrize(typeid,rtn.data.money);
                    }else if(rtn.data.redPacket){//随机红包
                        self._prizeType =2;
                        self._prizeNumber = rtn.data.redPacket;
                        var typeid = 2;
                        self.setPrize(typeid,rtn.data.redPacket);
                    }else{//谢谢参与
                        var typeid = 0;
                        self._prizeType =0;
                        self.setPrize(typeid);
                    }


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
        // cc.log(" ======== reqWinter =======")
        // this.RotationAct(this._timeType, 5);
    },

    setPrize: function(typeid, number) {
        if (this._timeType == 1) {
            switch (number) {
                case 1:
                    var randomNum = Math.random() < 0.5 ? 2 : 4;
                    this.RotationAct(randomNum);
                    break;
                case 2:
                    var randomNum = Math.random() < 0.5 ? 3 : 6;
                    this.RotationAct(randomNum);
                    break;
                case 5:
                    var randomNum = Math.random() < 0.5 ? 5 : 7;
                    this.RotationAct(randomNum);
                    break;
                case 8:
                    this.RotationAct(1);
                    break;
                case 88:
                    this.RotationAct(0);
                    break;
                default:
                    this.RotationAct(2);
                    break;
            }
        } else {
            if (typeid == 0) {
                this.RotationAct(7);
            } else if (typeid == 1) { //元宝
                switch (number) {
                    case 1:
                        this.RotationAct(4);
                        break;
                    case 10:
                        this.RotationAct(2);
                        break;
                    default:
                        this.RotationAct(7);
                        break;
                }
            } else if (typeid == 2) { // 红包
                switch (number) {
                    case 8.8:
                        this.RotationAct(0);
                        break;
                    case 88:
                        this.RotationAct(1);
                        break;
                    case 10:
                        this.RotationAct(2);
                        break;
                    case 1.88:
                        this.RotationAct(5);
                        break;
                    default:
                        this.RotationAct(3);
                        break;
                }
                
            }
        }

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
 * @DateTime:     2017-12-22 
 * @Description: 暖冬温情季 活动 
 */


var WinterBackLayer = cc.Layer.extend({
    
    ctor: function(type, number) {
        this._super();
        var UI = ccs.load("Winter_Back.json");
        this.addChild(UI.node);
        var self = this;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);

        this._luckyNode_1 = _back.getChildByName("lucky_1");
        this._luckyNode_1.setVisible(false);
        this._luckyNode_2 = _back.getChildByName("lucky_2");
        this._luckyNode_2.setVisible(false);
        this._luckyNode_3 = _back.getChildByName("lucky_3");
        this._luckyNode_3.setVisible(false);
          if (type == 1) {
            this._luckyNode_2.setVisible(true);
            var _txt = this._luckyNode_2.getChildByName("Text_1")
            _txt.setString("" + number);
            
        } else if (type == 2) {
            this._luckyNode_3.setVisible(true);
            var _txt = this._luckyNode_3.getChildByName("Text_1")
            _txt.setString("" + number + "元");
        }else {
            this._luckyNode_1.setVisible(true);
            _block.setTouchEnabled(true);
            cc.log(" ---- _block ----------")
            _block.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    
                    self.removeFromParent();
                    
                    
                }
            }, this);
            
        }
        
        _block.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                self.removeFromParent();
                if (MjClient.Winter_ui) {
                    MjClient.Winter_ui.removeFromParent();
                }
            }
        }, this);

    },
    

});

