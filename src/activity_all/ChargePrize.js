/**create by Lms
 * @DateTime:     2018-04-09 
 * @Description: 充值有礼 
 */



var ChargePrize_Layer = cc.Layer.extend({
    
    onExit:function()
    {
        this._super();
    },
    ctor: function(data) {
        this._super();
        var UI = ccs.load("ChargePrize.json");
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
                if (this._closeCallback)
                {
                    this._closeCallback();
                }
                self.removeFromParent();
            }
        },this);
        this._list_desc = [];
        this.text_charge = this._back.getChildByName("text_charge");
        this.text_yuanbao = this._back.getChildByName("text_yuanbao");
        this.text_time = this._back.getChildByName("text_time");
        this.text_charge.ignoreContentAdaptWithSize(true);
        this.text_yuanbao.ignoreContentAdaptWithSize(true);
        this.text_time.ignoreContentAdaptWithSize(true);
        this.text_charge.setString("");
        this.text_yuanbao.setString("");
        this.text_time.setString("");

        for (var i = 0; i <= 4; i++) {
            this["ruleText_" + i]  = this._back.getChildByName("text_" + i);
            this["ruleText_" + i].setString("");
            this["ruleText_" + i].ignoreContentAdaptWithSize(true);
            this["textTiao_" + i]  = this._back.getChildByName("textTiao_" + i);
            this["textTiao_" + i].setString("");
            this["textTiao_" + i].ignoreContentAdaptWithSize(true);
            this["btnGet_" + i] = this._back.getChildByName("btn_" + i);
            this["btnGet_" + i].setTag(i);
            this["btnGet_" + i].addTouchEventListener(function(sender,type){
                var tag = sender.getTag();
                cc.log(" ====== tag ",tag);
                if (!this._data) return;
                if (type == 2) {
                    if (this._data.list[tag].recved) {
                        MjClient.showToast("已领取");
                    }else if (this._data.list[tag].canRecv) {
                        this.reqGetYB(tag);
                    }else{
                        
                        // if (MjClient.rechargeLadder) {
                            // this.removeFromParent();
                            var layer = enter_store();
                            MjClient.Scene.addChild(layer);
                        // } else {
                        //     MjClient.getRechargeLadder();
                        //     MjClient.showMsg("获取商品失败，请重试！");
                        // }
                        // MjClient.showToast("请前往商城充值");
                    }
                    
                }
            },this);

        }
        if (data) {
            this.refresh_main();
        }else{
            this.reqMainMsg();
        }
        
        UIEventBind(null, closeBtn, "updateInfo", function () {
            self.reqMainMsg();
        });
        
    },

    refresh_main:function(){
        var total_num = 0;
        for (var i = 0; i <= 4; i++) {
            this._list_desc[i] = "充值满"+this._data.list[i].recharge +"\n赠送"+this._data.list[i].gift+"元宝";
            this["ruleText_" + i].setString(""+ this._list_desc[i]);
            var max_num = this._data.totalRecharge > this._data.list[i].recharge ? this._data.list[i].recharge : this._data.totalRecharge;
            this["textTiao_" + i].setString(max_num +"/"+ this._data.list[i].recharge);

            if (this._data.list[i].recved) {
                total_num = total_num + this._data.list[i].gift;
                this["btnGet_" + i].loadTextureNormal("chargePrize/btn_get.png");
            } else if (this._data.list[i].canRecv) {
                this["btnGet_" + i].loadTextureNormal("chargePrize/btn_ok.png");
            } else {
                this["btnGet_" + i].loadTextureNormal("chargePrize/btn_go.png");
            }

        }

        this.text_charge.setString(this._data.totalRecharge+"");
        this.text_yuanbao.setString(total_num+"");
        var _timeStar = MjClient.dateFormat(new Date(parseInt(this._data.start)), 'MM月dd日');
        cc.log(" ====== 开始时间 ",_timeStar);
        var _timeEnd = MjClient.dateFormat(new Date(parseInt(this._data.end)), 'MM月dd日');
        cc.log(" ====== 结束时间 ",_timeEnd);
        this.text_time.setString("活动时间:" + _timeStar +"到" + _timeEnd);

    },

    reqMainMsg:function(){
        var self = this;
        MjClient.block();
         MjClient.gamenet.request("pkplayer.handler.jzRechargeActivityInfo", {},
            function(rtn) {
                cc.log(" ===== jzRechargeActivityInfo === " + JSON.stringify(rtn))
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

    reqGetYB:function(index){
        var self = this;
        MjClient.block();
         MjClient.gamenet.request("pkplayer.handler.jzRechargeActivityRecv", {index:index},
            function(rtn) {
                cc.log(" ===== jzRechargeActivityRecv === " + JSON.stringify(rtn))
                if (rtn.code == 0) {
                    MjClient.showToast("领取成功");
                    self.reqMainMsg();
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

    setCloseCallback:function(callback)
    {
        
        this._closeCallback = callback;

    },

    
});
