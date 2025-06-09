/**create by Tom
 * @DateTime:      2019/1/8
 * @Description:   主要放置一些公用的Layer
 *
 */


/**
 * Home界面的咨询Layer
 * 目前应用于： 江苏、海安、淮安、徐州、南通、
 * @type {void | Class | *}
 */
var HomeZiXunLayer = cc.Layer.extend({
    jsBind:{
        block:{
            _layout:[[1, 1], [0.5, 0.5], [0, 0], true]
        },
        back:{
            _layout:[[1, 1], [0.50, 0.5], [0, 0]],
            btnClose:{
                _click: function () {
                    if(MjClient.homeZiXunLayer) {
                        MjClient.homeZiXunLayer.removeFromParent(true);
                        MjClient.homeZiXunLayer = null;
                    }
                }
            },
            btnCopy1:{  // 客服公众号复制按钮
                _click:function(){
                    MjClient.native.doCopyToPasteBoard(MjClient.homeZiXunLayer.getGongZhongHao());
                    MjClient.showToast("复制成功，打开微信查找添加");
                    MjClient.native.openWeixin();
                    MjClient.native.umengEvent4CountWithProperty("GongzhonghaoCopy", {uid:SelfUid()});
                }
            },
            btnCopy2:{   // 代理微信号复制按钮
                _click:function () {
                    MjClient.native.doCopyToPasteBoard(MjClient.homeZiXunLayer.getDaiLiWX());
                    MjClient.showToast("复制成功，打开微信查找添加");
                    MjClient.native.openWeixin();
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Gonggao_Fuzhi_Youxiwentizixun", {uid:SelfUid()});
                }
            },
            textGongZhongHao:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    this.setText(MjClient.homeZiXunLayer.getGongZhongHao());
                },
            },
            textDaiLiWX:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    this.setText(MjClient.homeZiXunLayer.getDaiLiWX());
                },
            },
        }
    },
    ctor: function () {
        this._super();
        var UI = ccs.load("ZiXunLayer.json");
        MjClient.homeZiXunLayer = this;
        BindUiAndLogic(UI.node, this.jsBind);
        this.addChild(UI.node);
        return true;
    },
    getGongZhongHao: function () {
        return MjClient.systemConfig.gongzhonghao ? MjClient.systemConfig.gongzhonghao.toString() : "qxqipai";
    },
    getDaiLiWX: function () {
        if(MjClient.getAppType() === MjClient.APP_TYPE.QXJSMJ || MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ) {
            return MjClient.systemConfig.suqianDaili ? MjClient.systemConfig.suqianDaili.toString() : "SQqixing";
        }
        return MjClient.systemConfig.dailiZixun ? MjClient.systemConfig.dailiZixun.toString() : "qixing364";
    }
});