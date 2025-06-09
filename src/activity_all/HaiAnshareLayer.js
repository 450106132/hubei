/**
 * @Author:      Lms
 * @Email:       lms_190865480@163.com
 * @QQ:       190865480
 * @DateTime:     2018-04-23 
 * @Description: 海安分享
 */



var HaiAnShareLayer = cc.Layer.extend({
    _closeCallback:null,
    _timeType : null,
    _prizeType:null,
    _prizeNumber :null,
    onExit:function()
    {
        this._super();
        MjClient.HaiAnShare_ui = null;
    },
    ctor: function() {
        this._super();     

        var UI = ccs.load("Winter_main.json");
        this.addChild(UI.node);
        MjClient.HaiAnShare_ui = this;

        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);
     
        this._node_prize_2 = this._back.getChildByName("node_prize_PM");
        this._node_prize_3 = this._back.getChildByName("node_shine");

        //退出
        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (this._closeCallback)
                {
                    this._closeCallback();
                }
                that.removeFromParent(); 
            }
        }, this);
        //点击抽奖
        this._click = this._back.getChildByName("prize_click");
        this._click.addTouchEventListener(function(sender, type) {
            if (type == 2) { 
                cc.log( " ============ _click  ")
                that.reqWinter();
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
            this["prize_pm_" + (i-1)] = this._node_prize_2.getChildByName("prize_" + i);
            this["shine_" + (i-1)] = this._node_prize_3.getChildByName("shine_" + i);
            this["shine_" + (i-1)].setVisible(false);
        }

    },


    RotationAct: function(number) {
        if (!cc.sys.isObjectValid(this["prize_pm_" + number])) return;
        var that = this;
        var sum = 8 * 3 + number;
        cc.log(" ====== sum ",sum);
        var timedelay = 0.1 ;
        var _act = cc.scaleTo(timedelay, 1.2)
        var _act_1 = cc.scaleTo(timedelay, 1.0)
        for (var i = 0; i <= sum; i++) {
            var time = i * timedelay;
            var func = function(d) {
                var num = d % 8;
                that["shine_" + num].runAction(cc.sequence(cc.DelayTime(time), cc.callFunc(function() {
                    that["shine_" + num].setVisible(true);
                }), _act, cc.callFunc(function() {
                    if (d < sum) {
                        that["shine_" + num].setVisible(false);
                    }

                }), _act_1));


            }
            func(i);
        }

        this.runAction(cc.sequence(cc.DelayTime(sum * timedelay + 0.5),cc.callFunc(function() {
                       // that.addChild(new WinterBackLayer(that._prizeType,that._prizeNumber), 500);
                       if (that._prizeType) {
                           MjClient.showToast("恭喜您获得" + that._prizeNumber + "元宝，元宝已到账");
                       }else{
                            MjClient.showToast("谢谢你的参与，祝你手气长虹！")
                       }
                       that.removeFromParent();
                    })));

        // this.runAction(cc.sequence(cc.DelayTime(sum * timedelay + 0.5),cc.callFunc(function() {
        //                that.addChild(new WinterBackLayer(that._prizeType,that._prizeNumber), 500);
        //             })));

    },

    reqWinter: function() {
        var that = this;
        this._click.setTouchEnabled(false);
        // MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.wxShare", {
                uid: SelfUid()
            },
            function(rtn) {
                 cc.log("pkplayer.handler.wxShare ----------- " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                    if (rtn.data.money) { // 元宝
                        var typeid = 1;
                        that._prizeType =1;
                        that._prizeNumber = rtn.data.money;
                        that.setPrize(typeid,rtn.data.money);
                    }else if(rtn.data.redPacket){//随机红包
                        that._prizeType =2;
                        that._prizeNumber = rtn.data.redPacket;
                        var typeid = 2;
                        that.setPrize(typeid,rtn.data.redPacket);
                    }else{//谢谢参与
                        var typeid = 0;
                        that._prizeType =0;
                        that.setPrize(typeid);
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

            if (typeid == 0) {
                this.RotationAct(4);
            } else if (typeid == 1) { //元宝
                switch (number) {
                    case 1:
                        var randomNum = Math.random() < 0.5 ? 2 : 5;
                        this.RotationAct(randomNum);
                        break;
                    case 2:
                        var randomNum = Math.random() < 0.5 ? 3 : 6;
                        this.RotationAct(randomNum);
                        break;
                    case 8:
                        this.RotationAct(1);
                        break;
                    case 88:
                        this.RotationAct(0);
                        break;
                    case 5:
                        this.RotationAct(7);
                        break;
                    default:
                        this.RotationAct(4);
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

    },

    setCloseCallback:function(callback)
    {
        this._closeCallback = callback;
    }

});


