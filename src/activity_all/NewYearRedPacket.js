/**create by Lms
 * @DateTime:     2019-01-03 
 * @Description: 春节 金币场红包 
 */

var NewYearRedPacket_Layer = cc.Layer.extend({
    
    onExit:function()
    {
        this._super();
    },
    ctor: function(data) {
        this._super();
        var UI = ccs.load("NewYearRedPacket.json");
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
        //   btn_buy
        this._btnBuy = back.getChildByName("btn_buy");
        this._btnBuy.addTouchEventListener(function(sender, type) {
            if (type == 2) {

            }
        },this);


        if (data) {
            this.refresh_main();
        }else{
            this.reqMainMsg();
        }
        
        // UIEventBind(null, closeBtn, "updateInfo", function () {
        //     self.reqMainMsg();
        // });
        
    },

    refresh_main:function(){
       

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

    reqBuy:function(index){
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

//NewYearRedPacket_tip
var NewYearRedPacket_Tip = cc.Layer.extend({
    
    onExit:function()
    {
        this._super();
    },
    ctor: function(data) {
        this._super();
        var UI = ccs.load("NewYearRedPacket_tip.json");
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

        this._btnBuy = back.getChildByName("btn_buy");
        this._btnBuy.addTouchEventListener(function(sender, type) {
            if (type == 2) {

            }
        },this);


        
        // UIEventBind(null, closeBtn, "updateInfo", function () {
        //     self.reqMainMsg();
        // });
        
    },

    refresh_main:function(){
       

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

    reqBuy:function(index){
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
