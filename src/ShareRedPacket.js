/**
 * Created by WuXiaoDong on 2017/8/24.
 */

var shareRedPacketLayer = cc.Layer.extend({
    ctor:function (moneyValue,text) {
        this._super();
        var UI = ccs.load("shareRedPacket.json");
        this.addChild(UI.node);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);



        var _back = _block.getChildByName("back");
        var _moneyText = _back.getChildByName("Text_1");
        if(moneyValue && _moneyText)
        {
            _moneyText.setString(moneyValue.toFixed(2) + "");            
        }
        var Text_hao = _back.getChildByName("Text_hao");
        if (Text_hao && text) {
            Text_hao.ignoreContentAdaptWithSize(true);
            Text_hao.setString(text);
        }

        //关闭按钮
        _block.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        return true;
    }
});
//shareLiQuanLayer
var shareLiQuanLayer = cc.Layer.extend({
    ctor:function (text) {
        this._super();
        var UI = ccs.load("shareLiQuanLayer.json");
        this.addChild(UI.node);
        var self = this;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        var _back = _block.getChildByName("back");
        var _moneyText = _back.getChildByName("Text_1");
        var advBtn = _back.getChildByName("Button_1");
        _moneyText.ignoreContentAdaptWithSize(true);
        _moneyText.setString(text);           
        //关闭按钮
        _block.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        //广告按钮
        if(advBtn){
            if(cc.sys.os != cc.sys.OS_IOS && MjClient.systemConfig.fenXiangFanBei == "true"){
                advBtn.setVisible(true);
            }else {
                advBtn.setVisible(false);
            }
            advBtn.addTouchEventListener(function (sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED) {
                    MjClient.native.mobgiAds.showVideoAd(MjClient.native.mobgiAdsType.SHIPIN_FENXIANG);
                }
            },this);
        }

        UIEventBind(null, this, MjClient.native.mobgiAdsCallbackEvent.VIDEO_ADS_COMPLETED, function(data) {
            if(data.type == MjClient.native.mobgiAdsType.SHIPIN_FENXIANG || data.indexOf("type:"+MjClient.native.mobgiAdsType.SHIPIN_FENXIANG) >= 0) {
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.userAdClick",{type:3},function(rtn){
                    MjClient.unblock();
                    if(rtn.code == -1) {
                        MjClient.showToast(rtn.message);
                    }else if(rtn.code == 0){
                        self.removeFromParent();
                        MjClient.showToast("奖励已翻倍");
                    }else {
                        MjClient.showToast(rtn.message);
                    }
                });
            }
        });
        UIEventBind(null, this, MjClient.native.mobgiAdsCallbackEvent.VIDEO_ADS_ERROR, function(data) {
            if(!data.isObject()){
                data = JSON.parse(data);
            }
            if(data.type == MjClient.native.mobgiAdsType.SHIPIN_FENXIANG) {
                MjClient.showToast("广告加载错误");
            }
        });
        UIEventBind(null, this, MjClient.native.mobgiAdsCallbackEvent.VIDEO_ADS_SKIPPED, function(data) {
            if(!data.isObject()){
                data = JSON.parse(data);
            }
            if(data.type == MjClient.native.mobgiAdsType.SHIPIN_FENXIANG) {
                MjClient.showToast("广告没有播放完，不会发放奖励");
            }
        });
        UIEventBind(null, this, MjClient.native.mobgiAdsCallbackEvent.VIDEO_ADS_NOT_READY, function(data) {
            if(!data.isObject()){
                data = JSON.parse(data);
            }
            if(data.type == MjClient.native.mobgiAdsType.SHIPIN_FENXIANG) {
                MjClient.showToast("广告还没加载完");
            }
        });
        return true;
    }
});