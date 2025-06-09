/**
 * Created by sking on 2017/5/2.
 */

/**create by Lms
 * @DateTime:     2018-11-29 
 * @Description:  首页弹窗  金币场弹窗 俱乐部弹窗 优化成 一个函数
 *  
 */

var showAdvLayer = cc.Layer.extend({
    _closeCallback: null,
    ctor: function(type) {
        this._super();
        var UI = ccs.load("AdvLayer.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        //_block.addTouchEventListener(function (sender, type) {
        //    if (type == 2) {
        //        that.removeFromParent();
        //    }
        //}, this);
        //
        var popAdvConfig = null;
        if (!type) {
            popAdvConfig = MjClient.systemConfig.advConfig;
        }else if (type == 1) {
            popAdvConfig = MjClient.systemConfig.advGoldConfig;
        }else if (type == 2) {
            popAdvConfig = MjClient.systemConfig.advClubConfig;
        }

        var _back = UI.node.getChildByName("back");
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {
            setWgtLayout(_back, [0.75, 0.75], [0.5, 0.5], [0, 0]);
        } else if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            setWgtLayout(_back,[0.8, 0.8], [0.5, 0.5], [0, 0]);
        } else {
            setWgtLayout(_back, [840 / 1280, 457 / 720], [0.5, 0.5], [0, 0]);
        }

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent();
                if (this._closeCallback) {
                    this._closeCallback();
                }
            }
        }, this);

        var _Image_1 = _back.getChildByName("Image_1");
        if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            _Image_1.loadTexture("ui/common/fenxiang_03.png");
        }
        else {
            _Image_1.loadTexture("game_picture/fenxiang_03.png");
        }
        _Image_1.setTouchEnabled(true);
        _Image_1.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                // cc.log("this._bg_xianshi touched");
                // MjClient.gamenet.request("pkplayer.handler.openBrowser",{type:5, index:index}, function(rtn) {
                //     if (rtn.code == 0 && rtn.data.length>0) {
                //         MjClient.native.OpenUrl(rtn.data);
                //     }
                // });
                //cc.log("----------------------add--------------------" + MjClient.remoteCfg.advUrl);
                //MjClient.native.OpenUrl(MjClient.remoteCfg.moreGameUrl);

                //MjClient.native.OpenUrl(MjClient.systemConfig.advUrl);
                if (popAdvConfig && popAdvConfig.target)
                    MjClient.Scene.addChild(new NormalWebviewLayer(popAdvConfig.target));
            }
        }, this);
        var imageUrl = "";
        if (popAdvConfig && popAdvConfig.imgUrl) {
            imageUrl = popAdvConfig.imgUrl;
        }
        cc.loader.loadImg(imageUrl,   {
            isCrossOrigin :  true
        },  function(err, img) {
            if (!err && img && cc.sys.isObjectValid(_Image_1)) {
                var spriteImg = new cc.Sprite(img);
                spriteImg.setPosition(_Image_1.getContentSize().width / 2, _Image_1.getContentSize().height / 2);
                _Image_1.addChild(spriteImg);
            }
        });


        var _weiXinHao = _back.getChildByName("Text_weixin");
        _weiXinHao.ignoreContentAdaptWithSize(true);
        _weiXinHao.setFontSize(36);
        _weiXinHao.setColor(cc.color(255, 255, 255));
        // cc.log(" ===========_weiXinHao ",_weiXinHao.getFontSize(),JSON.stringify(_weiXinHao.getColor()),_weiXinHao.get);
        var weiXinNum = "";

        //复制按钮
        var _Button_copy = _back.getChildByName("Button_copy");
        _Button_copy.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                MjClient.native.doCopyToPasteBoard(weiXinNum);
                MjClient.showToast("复制成功，打开微信查找添加");
                MjClient.native.openWeixin();
                MjClient.native.umengEvent4CountWithProperty("AdvLayerCopy", {
                    uid: SelfUid()
                });
            }
        }, this);
        _Button_copy.setScale9Enabled(false);
        if (popAdvConfig && popAdvConfig.item && popAdvConfig.item.length > 0) {
            weiXinNum = "" + popAdvConfig.item[0].labelText;
            _weiXinHao.setString(weiXinNum);
            _weiXinHao.setPosition(popAdvConfig.item[0].labelPlace.x, popAdvConfig.item[0].labelPlace.y);
            _Button_copy.setPosition(popAdvConfig.item[0].buttonPlace.x, popAdvConfig.item[0].buttonPlace.y);
            if (popAdvConfig.item[0].buttonImg) {
                var btnImgUrl = popAdvConfig.item[0].buttonImg;
                var nameArr = btnImgUrl.split("/");
                var nameStr = nameArr[nameArr.length - 1];
                var filePath = jsb.fileUtils.getWritablePath() + nameStr;
                if (!jsb.fileUtils.isFileExist(filePath)) {
                    MjClient.urlImageDown(btnImgUrl, nameStr, function(sprite, savepath) {
                        if (cc.sys.isObjectValid(_Button_copy)) {
                            _Button_copy.loadTextureNormal(savepath);
                            _Button_copy.ignoreContentAdaptWithSize(true);
                        }
                    });
                } else {
                    _Button_copy.loadTextureNormal(filePath);
                    _Button_copy.ignoreContentAdaptWithSize(true);
                }
            }
        } else {
            _weiXinHao.setVisible(false);
            _Button_copy.setVisible(false);
        }

        var _weiXinHao1 = _back.getChildByName("Text_weixin_1");
        //复制按钮
        var _Button_copy1 = _back.getChildByName("Button_copy_1");
        if (_weiXinHao1 && _Button_copy1) {
            _weiXinHao1.ignoreContentAdaptWithSize(true);
            var weiXinNum1 = "";


            _Button_copy1.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    MjClient.native.doCopyToPasteBoard(weiXinNum1);
                    MjClient.showToast("复制成功，打开微信查找添加");
                    MjClient.native.openWeixin();
                }
            }, this);
            _Button_copy1.setScale9Enabled(false);

            if (popAdvConfig && popAdvConfig.item && popAdvConfig.item.length > 1) {
                weiXinNum1 = "" + popAdvConfig.item[1].labelText;
                _weiXinHao1.setString(weiXinNum1);
                _weiXinHao1.setPosition(popAdvConfig.item[1].labelPlace.x, popAdvConfig.item[1].labelPlace.y);
                _Button_copy1.setPosition(popAdvConfig.item[1].buttonPlace.x, popAdvConfig.item[1].buttonPlace.y);
                if (popAdvConfig.item[1].buttonImg) {
                    var btnImgUrl = popAdvConfig.item[1].buttonImg;
                    var nameArr = btnImgUrl.split("/");
                    var nameStr = nameArr[nameArr.length - 1];
                    var filePath = jsb.fileUtils.getWritablePath() + nameStr;
                    if (!jsb.fileUtils.isFileExist(filePath)) {
                        MjClient.urlImageDown(btnImgUrl, nameStr, function(sprite, savepath) {
                            _Button_copy1.loadTextureNormal(savepath);
                            _Button_copy1.ignoreContentAdaptWithSize(true);
                        });
                    } else {
                        _Button_copy1.loadTextureNormal(filePath);
                        _Button_copy1.ignoreContentAdaptWithSize(true);
                    }
                }
            } else {
                _weiXinHao1.setVisible(false);
                _Button_copy1.setVisible(false);
            }

        }
        


        var _weiXinHao2 = _back.getChildByName("Text_weixin_2");
        //复制按钮
        var _Button_copy2 = _back.getChildByName("Button_copy_2");

        if (_weiXinHao2 && _weiXinHao2) {
            _weiXinHao2.ignoreContentAdaptWithSize(true);
            var weiXinNum2 = "";
            _Button_copy2.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    MjClient.native.doCopyToPasteBoard(weiXinNum2);
                    MjClient.showToast("复制成功，打开微信查找添加");
                    MjClient.native.openWeixin();
                }
            }, this);
            _Button_copy2.setScale9Enabled(false);
            if (popAdvConfig && popAdvConfig.item && popAdvConfig.item.length > 2) {
                weiXinNum2 = "" + popAdvConfig.item[2].labelText;
                _weiXinHao2.setString(weiXinNum2);
                _weiXinHao2.setPosition(popAdvConfig.item[2].labelPlace.x, popAdvConfig.item[2].labelPlace.y);
                _Button_copy2.setPosition(popAdvConfig.item[2].buttonPlace.x, popAdvConfig.item[2].buttonPlace.y);
                if (popAdvConfig.item[2].buttonImg) {
                    var btnImgUrl = popAdvConfig.item[2].buttonImg;
                    var nameArr = btnImgUrl.split("/");
                    var nameStr = nameArr[nameArr.length - 1];
                    var filePath = jsb.fileUtils.getWritablePath() + nameStr;
                    if (!jsb.fileUtils.isFileExist(filePath)) {
                        MjClient.urlImageDown(btnImgUrl, nameStr, function(sprite, savepath) {
                            _Button_copy2.loadTextureNormal(savepath);
                            _Button_copy2.ignoreContentAdaptWithSize(true);
                        });
                    } else {
                        _Button_copy2.loadTextureNormal(filePath);
                        _Button_copy2.ignoreContentAdaptWithSize(true);
                    }
                }
            } else {
                _weiXinHao2.setVisible(false);
                _Button_copy2.setVisible(false);
            }
        }

    },
    setCloseCallback: function(callback) {
        this._closeCallback = callback;
    }
});






