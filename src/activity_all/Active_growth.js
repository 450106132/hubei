/**
 * Created by WuXiaoDong on 2019/5/22.
 */

var Active_growthLayer = cc.Layer.extend({
    _data:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("Active_growth.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;
        this._closeCallback = null;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1,1],[0.5,0.5],[0,0]);

        //关闭按钮
        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
                if (this._closeCallback) {
                    this._closeCallback();
                }
            }
        }, this);

        this._textTime = this._back.getChildByName("Text_time");
        this._textTime.ignoreContentAdaptWithSize(true);
        this._textTime.setVisible(false);

        this._imageReward = this._back.getChildByName("Image_reward");
        this._imageReward.setVisible(false);

        this._btn = this._back.getChildByName("Button_1");
        this._btn.setVisible(false);

        this.getMonthActivityInfo();
        return true;
    },

    initUI:function () {
        var self = this;

        this._textTime.setString("报名时间："+MjClient.dateFormat(new Date(parseInt(this._data.startTime)), 'MM月dd日hh:mm')+"-"+MjClient.dateFormat(new Date(parseInt(this._data.endTime)), 'MM月dd日hh:mm'));
        this._textTime.setVisible(true);

        this._imageReward.loadTexture("active/active_growth/reward_"+this._data.awardGrade+".png");
        this._imageReward.setVisible(true);

        this._btn.setVisible(true);
        if(this._data.isSignUp){//已报名
            this._btn.loadTextureNormal("active/active_growth/btn_des.png");
        }else {//未报名
            this._btn.loadTextureNormal("active/active_growth/btn_apply.png");
        }
        this._btn.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.openBrowser",{type : 7},function(rtn){
                    cc.log("wxd pkplayer.handler.openBrowser:"+JSON.stringify(rtn));
                    MjClient.unblock();
                    if(rtn.code == 0) {
                        MjClient.native.OpenUrl(rtn.data);
                    }else {
                        MjClient.showToast(rtn.message);
                    }
                });
            }
        }, this);
    },

    getMonthActivityInfo:function () {//页面数据
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.clubMonthActivityInfo",{},function(rtn){
            cc.log("wxd pkplayer.handler.clubMonthActivityInfo:"+JSON.stringify(rtn));
            MjClient.unblock();
            if(rtn.code == 0) {
                self._data = rtn.data;
                self.initUI();
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    },

    setCloseCallback:function(callback) {
        this._closeCallback = callback;
    },
});