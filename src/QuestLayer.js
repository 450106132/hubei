/**
 * 目前  【邵阳，耒阳】地区在用
 * @type {void | Class | *}
 */
var QuestLayer = cc.Layer.extend({
    ctor:function (msg) {
        this._super();
        var UI = ccs.load("PopUpQuest.json");
        this._rootUI = UI.node;
        this.addChild(UI.node);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        if(!isYongZhouProject()){
            if (isIPhoneX()) { // IphoneX的恶心刘海问题
                setWgtLayout(_back, [0.75, 0.75], [0, 0.5], [-0.28, 0]);
            }
            else {
                setWgtLayout(_back, [0.75, 0.75], [0, 0.5], [-0.35, 0]);
            }
        } else{
            setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);
        }

        var _back_1 = _back.getChildByName("back_1");
        if(!isYongZhouProject()){
            var _ImgGan = _back_1.getChildByName("Image_gan");
            _ImgGan.setAnchorPoint(1,0.5);
            // 弹窗拉出动画
            _back_1.width = 200;
            _ImgGan.x = _back_1.width;
            var speed_1 = 10;
            var speed_2 = 10;
            _back_1.runAction(cc.sequence(
                cc.delayTime(0.01), 
                cc.callFunc(function(){
                    speed_1 = speed_1 * 1.1;
                    _back_1.width += speed_1;
                    _ImgGan.x = _back_1.width;
                    if (_back_1.width >= 675) {
                        _back_1.width = 675;
                        _ImgGan.x = _back_1.width;
                        _back_1.stopAllActions();
                    }
                })
            ).repeatForever());
        }

        var _bg = _back_1.getChildByName("bg");
        if(!isYongZhouProject()){
            // 遮罩蒙层关闭触摸时间
            _block.addTouchEventListener(function (sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED) {
                    var that = self;
                    _back_1.runAction(cc.sequence(
                        cc.delayTime(0.01), 
                        cc.callFunc(function(){
                            speed_2 = speed_2 * 1.1;
                            _back_1.width -= speed_2;
                            _ImgGan.x = _back_1.width;
                            if (_back_1.width <= 200) {
                                _back_1.stopAllActions();

                                that.removeFromParent();
                                if (that._closeCallback) {
                                    that._closeCallback();
                                }
                            }
                        })
                    ).repeatForever());

                }
            }, this);
        }

        if(isYongZhouProject()){
            var close = _bg.getChildByName("close");
            close.addTouchEventListener(function(sender, type){
                if (type == ccui.Widget.TOUCH_ENDED) {
                     self.removeFromParent();
                }
            })
        }

        _bg.getChildByName("Text_1").setString(""+MjClient.systemConfig.gongzhonghao);
        // _bg.getChildByName("Text_1").ignoreContentAdaptWithSize(true);
        var zixuHao = MjClient.systemConfig.xinNingZiXunHao;
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP){
            zixuHao = MjClient.systemConfig.majiangqun;
        }
        _bg.getChildByName("Text_2").setString(""+zixuHao);
        // _bg.getChildByName("Text_2").ignoreContentAdaptWithSize(true);

        var copy1Cb = function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.doCopyToPasteBoard(""+MjClient.systemConfig.gongzhonghao);
                    MjClient.showToast("复制成功，打开微信查找添加~~");
                    MjClient.native.openWeixin();
                    break;
                default:
                    break;
            }
        };
        var _btnCopy_1 = _bg.getChildByName("btnCopy_1");
        _btnCopy_1.addTouchEventListener(copy1Cb, this);

        var copy2Cb = function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.doCopyToPasteBoard(""+zixuHao);
                    MjClient.showToast("复制成功，打开微信查找添加~~~~");
                    MjClient.native.openWeixin();
                    break;
                default:
                    break;
            }
        };
        var _btnCopy_2 = _bg.getChildByName("btnCopy_2");
        _btnCopy_2.addTouchEventListener(copy2Cb, this);

        return true;
    }

});