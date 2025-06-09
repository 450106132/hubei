/**
 * Created by sking on 2017/5/8.
 */

var shareLayer = cc.Layer.extend({


    ctor: function (url, shareTitle, shareContent, callback) {
        this._super();

        this.SHARE_TO_WX = 1;
        this.SHARE_TO_PYQ = 2;
        var UI = ccs.load("ShareLayer.json");
        var selectUiIndex = MjClient.isUseUIv3 && MjClient.isUseUIv3();
        if(selectUiIndex && !cc.sys.isObjectValid(MjClient.FriendCard_main_ui)){
            UI = ccs.load("ShareLayer_3.0.json");
        }
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        var that = this;
        //_block.addTouchEventListener(function (sender, type) {
        //    if (type == 2) {
        //        that.removeFromParent();
        //    }
        //}, this);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.8, 0.8], [0.5, 0.5], [0, -0.04]);

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent();
            }
        }, this);

        if (!url)
            url = MjClient.remoteCfg.wxShareUrl;

        if (!shareTitle){
            shareTitle = AppCnName[MjClient.getAppType()].substr(2, 2) + "人自己的棋牌，最正宗！最流畅！和我一起玩吧~";
            if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
            {
                shareTitle = "本地人自己的棋牌，最正宗！最流畅！和我一起玩吧~";
            }
        }
        if (!shareContent){
            shareContent = AppCnName[MjClient.getAppType()] + "火热上线，麻将、跑得快、斗地主，玩法多多~稳定流畅无外挂！点击链接跳转下载页面，新玩家点击谁的下载链接就是被谁推荐。";
            if (MjClient.getAppType() == MjClient.GAME_TYPE.QXYZQP)
            {
                shareContent = AppCnName[MjClient.getAppType()] + "火热上线，扯胡子、落地扫，玩法多多~稳定流畅无外挂！点击链接跳转下载页面，新玩家点击谁的下载链接就是被谁推荐。";
            }
            else if (MjClient.getAppType() == MjClient.GAME_TYPE.QXNTQP)
            {
                shareContent = AppCnName[MjClient.getAppType()] + "火热上线，长牌、麻将、斗地主，玩法多多~稳定流畅无外挂！点击链接跳转下载页面，新玩家点击谁的下载链接就是被谁推荐。";
            }
            else if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
            {
                shareContent = AppCnName[MjClient.getAppType()] + "火热上线，2筒子、剥皮、放炮罚、红拐弯，玩法多多~稳定流畅无外挂！点击链接跳转下载页面，新玩家点击谁的下载链接就是被谁推荐。";
            }else if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
                shareContent = AppCnName[MjClient.getAppType()] + "火热上线，字牌、麻将、跑得快，玩法多多~稳定流畅无外挂！点击链接跳转下载页面，新玩家点击谁的下载链接就是被谁推荐。";
            }
        }
        
        cc.log("share title=" + shareTitle + ",content=" + shareContent);
        var _btnWenXin = _back.getChildByName("Btn_share1");
        _btnWenXin.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(callback) {
                    callback(this, this.SHARE_TO_WX);
                } else {
                    //分享到微信
                    if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb())
                    {
                        h5.weixinHelper.wxShareUrl(url, shareTitle, shareContent);
                    }
                    else
                    {
                        MjClient.native.wxShareUrl(url, shareTitle, shareContent);
                    }
                }
            }
        }, this);


        var _btnFriends = _back.getChildByName("Btn_share2");
        _btnFriends.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(callback) {
                    callback(this, this.SHARE_TO_PYQ);
                } else {
                    //分享朋友
                    if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb())
                    {
                        h5.weixinHelper.wxShareUrlToPYQ(url, shareTitle+shareContent);
                    }
                    else
                    {
                        MjClient.native.wxShareUrlToPYQ(url, shareTitle, shareContent);
                    }
                }
            }
        }, this);

    }
});


var shareNewLayer = cc.Layer.extend({


    ctor: function (url, shareTitle, shareContent, callback, sourceName) {
        this._super();

        this.SHARE_TO_WX = 1;
        this.SHARE_TO_PYQ = 2;
        var selectUiIndex = MjClient.isUseUIv3 && MjClient.isUseUIv3();
        if(selectUiIndex && !cc.sys.isObjectValid(MjClient.FriendCard_main_ui)){
            var UI = ccs.load("ShareNewLayer_3.0.json");
        }else {
            var UI = ccs.load("ShareNewLayer.json");
        }
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        var that = this;
        //_block.addTouchEventListener(function (sender, type) {
        //    if (type == 2) {
        //        that.removeFromParent();
        //    }
        //}, this);
        

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.8, 0.8], [0.5, 0.5], [0, -0.04]);

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if (sourceName == "inviteDownload")
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite_InviteDownload_Close", {uid:SelfUid()});
                else if (sourceName == "inviteBack")
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite_InviteBack_Close", {uid:SelfUid()});
                that.removeFromParent();
            }
        }, this);

        if (!url)
            url = MjClient.remoteCfg.wxShareUrl;
        var url2 = "https://cdn.jtcfgames.com/protocol/" + AppEnv[MjClient.getAppType()] + "/download/download.html"; // add by cyc 参数url只供微信使用

        if (!shareTitle) {
            shareTitle = AppCnName[MjClient.getAppType()].substr(2, 2) + "人自己的棋牌，最正宗！最流畅！和我一起玩吧~";
            if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
            {
                shareTitle = "本地人自己的棋牌，最正宗！最流畅！和我一起玩吧~";
            }
        }
        if (!shareContent)
        {
            shareContent = AppCnName[MjClient.getAppType()] + "火热上线，麻将、跑得快、斗地主，玩法多多~稳定流畅无外挂！点击链接跳转下载页面";
            if (MjClient.getAppType() == MjClient.GAME_TYPE.QXYZQP)
            {
                shareContent = AppCnName[MjClient.getAppType()] + "火热上线，扯胡子、落地扫，玩法多多~稳定流畅无外挂！点击链接跳转下载页面";
            }
            else if (MjClient.getAppType() == MjClient.GAME_TYPE.QXNTQP)
            {
                shareContent = AppCnName[MjClient.getAppType()] + "火热上线，长牌、麻将、斗地主，玩法多多~稳定流畅无外挂！点击链接跳转下载页面";
            }
            else if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
            {
                shareContent = AppCnName[MjClient.getAppType()] + "火热上线，2筒子、剥皮、放炮罚、红拐弯，玩法多多~稳定流畅无外挂！点击链接跳转下载页面";
            }else if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
                shareContent = AppCnName[MjClient.getAppType()] + "火热上线，字牌、麻将、跑得快，玩法多多~稳定流畅无外挂！点击链接跳转下载页面";
            }
        }

        cc.log("share title=" + shareTitle + ",content=" + shareContent);
        var _btnWenXin = _back.getChildByName("Btn_share1");
        _btnWenXin.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if (sourceName == "inviteDownload")
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite_InviteDownload_Wechat", {uid:SelfUid()});
                else if (sourceName == "inviteBack")
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite_InviteBack_Wechat", {uid:SelfUid()});

                if(callback) {
                    callback(this, this.SHARE_TO_WX);
                } else {
                    //分享到微信
                    if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb())
                    {
                        h5.weixinHelper.wxShareUrl(url, shareTitle, shareContent+"，新玩家点击谁的下载链接就是被谁推荐。");
                    }
                    else
                    {
                        MjClient.native.wxShareUrl(url, shareTitle, shareContent+"，新玩家点击谁的下载链接就是被谁推荐。");
                    }
                }
            }
        }, this);


        var _btnFriends = _back.getChildByName("Btn_share2");
        _btnFriends.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if (sourceName == "inviteDownload")
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite_InviteDownload_Moments", {uid:SelfUid()});
                else if (sourceName == "inviteBack")
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite_InviteBack_Monments", {uid:SelfUid()});

                if(callback) {
                    callback(this, this.SHARE_TO_PYQ);
                } else {
                    //分享朋友
                    if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb())
                    {
                        h5.weixinHelper.wxShareUrlToPYQ(url2, shareTitle+shareContent+"，新玩家点击谁的下载链接就是被谁推荐。");
                    }
                    else
                    {
                        MjClient.native.wxShareUrlToPYQ(url2, shareTitle, shareContent+"，新玩家点击谁的下载链接就是被谁推荐。");
                    }
                }
            }
        }, this);

        // var realSharePlatforms = MjClient.systemConfig.sharePlatforms;
        // realSharePlatforms = realSharePlatforms || [];
        // if (!cc.isArray(realSharePlatforms)) {
        //     realSharePlatforms = JSON.parse(realSharePlatforms);
        // }
        // for (var i = realSharePlatforms.length - 1; i >= 0; i--) {
        //     var exist = false;
        //     for (var type in SharePlatformType) {
        //         if (realSharePlatforms[i] == SharePlatformType[type]) {
        //             exist = true;
        //             break;
        //         }
        //     }
        //     if (!exist || realSharePlatforms[i] == SharePlatformType.WEIXIN || realSharePlatforms[i] == SharePlatformType.WEIXIN_PYQ) {
        //         realSharePlatforms.splice(i, 1);
        //     }
        // }
        //
        // var y = 80;
        // var btnStrs = ["Btn_shareToDt", "Btn_shareToZFB", "Btn_shareToXL", "Btn_shareToQQ", "Btn_shareToCN", "Btn_shareToXiangLiao"];
        // for (var i = 0; i < btnStrs.length; i ++) {
        //     var btn = _back.getChildByName(btnStrs[i]);
        //     if (btn) {
        //         y = btn.y;
        //         btn.setVisible(false);
        //     }
        // }
        //
        // var spaceWidth = new cc.Sprite("game_picture/weixin_btn.png").width * 0.5 + 16;
        // var x = _back.width / 2 - spaceWidth * realSharePlatforms.length / 2 + spaceWidth / 2;
        // for (var i = 0; i < realSharePlatforms.length; i++) {
        //     var sharePlatform = realSharePlatforms[i];
        //     var cloneBtn = new ccui.Button();
        //     cloneBtn.setPosition(x, y);
        //     x += spaceWidth;
        //     cloneBtn.setUserData(sharePlatform);
        //     _back.addChild(cloneBtn);
        //     var text = "";
        //     var image = "";
        //     switch (sharePlatform) {
        //         case SharePlatformType.XIANLIAO:
        //             text = "闲聊";
        //             image = "game_picture/xianliao.png";
        //             break;
        //         case SharePlatformType.ALIPAY:
        //             text = "支付宝";
        //             image = "game_picture/zhifubao.png";
        //             break;
        //         case SharePlatformType.DINGTALK:
        //             text = "钉钉";
        //             image = "game_picture/dingding.png";
        //             break;
        //         case SharePlatformType.QQ:
        //             text = "QQ";
        //             image = "game_picture/qq.png";
        //             break;
        //         case SharePlatformType.CHUINIU:
        //             text = "吹牛";
        //             image = "game_picture/chuiniu.png";
        //             break;
        //         case SharePlatformType.XIANGLIAO:
        //             text = "乡聊";
        //             image = "game_picture/xiangliao.png";
        //             break;
        //         case SharePlatformType.MOWANG:
        //             text = "默往";
        //             image = "game_picture/mowang.png";
        //             break;
        //         case SharePlatformType.DUOLIAO:
        //             text = "多聊";
        //             image = "game_picture/duoliao.png";
        //             break;
        //     }
        //     cloneBtn.loadTextures(image, "", "");
        //     cloneBtn.setScale(0.5);
        //     cloneBtn.addTouchEventListener(function(sender, type) {
        //         if (type == 2) {
        //             switch (sender.getUserData()) {
        //                 case SharePlatformType.XIANLIAO: //"闲聊"
        //                     cc.log("闲聊");
        //                     if (sourceName == "inviteDownload")
        //                         MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite_InviteDownload_Xianliao", {
        //                             uid: SelfUid()
        //                         });
        //                     else if (sourceName == "inviteBack")
        //                         MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite_InviteBack_Xianliao", {
        //                             uid: SelfUid()
        //                         });
        //
        //                     MjClient.native.xlShareText(shareTitle, shareContent + "。" + url2);
        //                     break;
        //                 case SharePlatformType.ALIPAY: //"支付宝"
        //                     cc.log("支付宝");
        //                     if (sourceName == "inviteDownload")
        //                         MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite_InviteDownload_Alipay", {
        //                             uid: SelfUid()
        //                         });
        //                     else if (sourceName == "inviteBack")
        //                         MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite_InviteBack_Alipay", {
        //                             uid: SelfUid()
        //                         });
        //
        //                     MjClient.native.zfbShareUrl(url2, shareTitle, shareContent + "。");
        //                     break;
        //                 case SharePlatformType.DINGTALK: //"钉钉"
        //                     cc.log("钉钉");
        //                     if (sourceName == "inviteDownload")
        //                         MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite_InviteDownload_Dingtalk", {
        //                             uid: SelfUid()
        //                         });
        //                     else if (sourceName == "inviteBack")
        //                         MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite_InviteBack_Dingtalk", {
        //                             uid: SelfUid()
        //                         });
        //
        //                     MjClient.native.dtShareUrl(url2, shareTitle, shareContent + "。");
        //                     break;
        //                 case SharePlatformType.QQ: //"qq"
        //                     cc.log("QQ");
        //                     if (sourceName == "inviteDownload")
        //                         MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite_InviteDownload_QQ", {
        //                             uid: SelfUid()
        //                         });
        //                     else if (sourceName == "inviteBack")
        //                         MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite_InviteBack_QQ", {
        //                             uid: SelfUid()
        //                         });
        //
        //                     MjClient.native.qqShareUrl(url2, shareTitle, shareContent + "。");
        //                     break;
        //                 case SharePlatformType.CHUINIU: //"吹牛"
        //                     cc.log("吹牛");
        //                     if (sourceName == "inviteDownload")
        //                         MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite_InviteDownload_chuiniu", {
        //                             uid: SelfUid()
        //                         });
        //                     else if (sourceName == "inviteBack")
        //                         MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite_InviteBack_chuiniu", {
        //                             uid: SelfUid()
        //                         });
        //                     MjClient.native.chuiniuShareUrl(url2, shareTitle, shareContent + "。");
        //                     break;
        //                 case SharePlatformType.XIANGLIAO:
        //                     cc.log("乡聊");
        //                     if (sourceName == "inviteDownload")
        //                         MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite_InviteDownload_xiangliao", {
        //                             uid: SelfUid()
        //                         });
        //                     else if (sourceName == "inviteBack")
        //                         MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite_InviteBack_xiangliao", {
        //                             uid: SelfUid()
        //                         });
        //                     MjClient.native.xiangliaoShareUrl(url2, shareTitle, shareContent + "。");
        //                     break;
        //                 case SharePlatformType.MOWANG:
        //                     cc.log("默往");
        //                     if (sourceName == "inviteDownload")
        //                         MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite_InviteDownload_mowang", {
        //                             uid: SelfUid()
        //                         });
        //                     else if (sourceName == "inviteBack")
        //                         MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite_InviteBack_mowang", {
        //                             uid: SelfUid()
        //                         });
        //                     MjClient.native.moWangShareUrl(url2, shareTitle, shareContent + "。");
        //                     break;
        //                 case SharePlatformType.DUOLIAO:
        //                     cc.log("多聊");
        //                     MjClient.native.dlShareUrl(url2, shareTitle, shareContent + "。");
        //                     break;
        //             }
        //         }
        //     });
        // }
    }
});


var shareUrlMultiPlatformLayer = cc.Layer.extend({
    ctor: function (url, shareTitle, shareContent, callback) {
        this._super();

        var UI = ccs.load("ShareLayer.json");
        var selectUiIndex = MjClient.isUseUIv3 && MjClient.isUseUIv3();
        if(selectUiIndex && !cc.sys.isObjectValid(MjClient.FriendCard_main_ui)){
            UI = ccs.load("ShareLayer_3.0.json");
        }
        this.addChild(UI.node);
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        var that = this;

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.8, 0.8], [0.5, 0.5], [0, -0.04]);


        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent();
            }
        }, this);

        _back.getChildByName("Btn_share1").setVisible(false);
        _back.getChildByName("Btn_share2").setVisible(false);

        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG)
        {
            _back.getChildByName("Btn_share1_1").setVisible(false);
            _back.getChildByName("Btn_share1_2").setVisible(false);
            _back.getChildByName("Btn_share1_3").setVisible(false);
        }

        var maxWidth = _back.getContentSize().width;
        var realSharePlatforms = MjClient.systemConfig.sharePlatforms;
        realSharePlatforms = realSharePlatforms || [];
        if (!cc.isArray(realSharePlatforms))
        {
            realSharePlatforms = JSON.parse(realSharePlatforms);
        }
        for (var i=realSharePlatforms.length-1; i>=0; i--)
        {
            var exist = false;
            for (var type in SharePlatformType)
            {
                if (realSharePlatforms[i] == SharePlatformType[type])
                {
                    exist = true;
                    break;
                }
            }
            if (!exist)
            {
                realSharePlatforms.splice(i,1);
            }
        }
        var line1count = realSharePlatforms.length;
        var line2count = 0;
        if (realSharePlatforms.length >= 6) {
            line1count = parseInt(realSharePlatforms.length / 2);
            line2count = realSharePlatforms.length - line1count;
        }
        var eachWidthLine1 = maxWidth/(line1count+1);
        var eachWidthLine2 = maxWidth/(line2count+1);
        var btn = _back.getChildByName("Btn_share1");
        if (realSharePlatforms.length >= 4) btn.setScale(btn.getScale()*0.6);
        for (var i=0; i<realSharePlatforms.length; i++)
        {
            var sharePlatform = i;
            var cloneBtn = btn.clone();
            if (line2count > 0) {
                if (i < line1count) {
                    cloneBtn.setPositionX(eachWidthLine1*(i+1));
                    cloneBtn.setPositionY(cloneBtn.y + cloneBtn.getContentSize().height*0.4);
                }
                else {
                    cloneBtn.setPositionX(eachWidthLine2*(i-line1count+1));
                    cloneBtn.setPositionY(cloneBtn.y - cloneBtn.getContentSize().height*0.4);
                }
            }
            else {
                cloneBtn.setPositionX(eachWidthLine1*(i+1));
            }
            cloneBtn.setVisible(true);
            cloneBtn.setUserData(sharePlatform);
            _back.addChild(cloneBtn);
            var text = "";
            var image = "";
            switch (sharePlatform)
            {
                case 0:
                    text = "微信";
                    image = "game_picture/weixin_btn.png";
                    break;
                case 1:
                    text = "闲聊";
                    image = "game_picture/xianliao.png";
                    break;
                case 2:
                    text = "支付宝";
                    image = "game_picture/zhifubao.png";
                    break;
                case 3:
                    text = "钉钉";
                    image = "game_picture/dingding.png";
                    break;
                case 4:
                    text = "QQ";
                    image = "game_picture/qq.png";
                    break;
                case 5:
                    text = "吹牛";
                    image = "game_picture/chuiniu.png";
                    break;
                case 6:
                    text = "乡聊";
                    image = "game_picture/xiangliao.png";
                    break;
                case 7:
                    text = "默往";
                    image = "game_picture/mowang.png";
                    break;
                case 8:
                    text = "多聊";
                    image = "game_picture/duoliao.png";
                    break;

            }
            var text_1 = cloneBtn.getChildByName("Text_1");
            text_1.setString(text);
            text_1.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            text_1.ignoreContentAdaptWithSize(true);
            cloneBtn.loadTextures(image,image,image);
            cloneBtn.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    switch (sender.getUserData())
                    {
                        case 0://"微信"
                            cc.log("微信");
                            if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb())
                            {
                                h5.weixinHelper.wxShareUrl(url, shareTitle, shareContent);
                            }
                            else
                            {
                                MjClient.native.wxShareUrl(url, shareTitle, shareContent);
                            }
                            if(that.isFriendYaoQing){
                                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Yaoqing_Yaoqinghaoyou_Xuanzequdao_Weixin", {uid:SelfUid()});
                            }
                            break;
                        case 1://"闲聊"
                            cc.log("闲聊");
                            MjClient.native.xlShareText(shareTitle, shareContent+url);
                            if(that.isFriendYaoQing){
                                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Yaoqing_Yaoqinghaoyou_Xuanzequdao_Xianliao", {uid:SelfUid()});
                            }
                            break;
                        case 2://"支付宝"
                            cc.log("支付宝");
                            MjClient.native.zfbShareUrl(url, shareTitle, shareContent);
                            if(that.isFriendYaoQing){
                                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Yaoqing_Yaoqinghaoyou_Xuanzequdao_Zhifubao", {uid:SelfUid()});
                            }
                            break;
                        case 3://"钉钉"
                            cc.log("钉钉");
                            MjClient.native.dtShareUrl(url, shareTitle, shareContent);
                            if(that.isFriendYaoQing){
                                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Yaoqing_Yaoqinghaoyou_Xuanzequdao_Dingding", {uid:SelfUid()});
                            }
                            break;
                        case 4://"qq"
                            cc.log("QQ");
                            MjClient.native.qqShareUrl(url, shareTitle, shareContent);
                            if(that.isFriendYaoQing){
                                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Yaoqing_Yaoqinghaoyou_Xuanzequdao_QQ", {uid:SelfUid()});
                            }
                            break;
                        case 5://"吹牛"
                            cc.log("吹牛");
                            MjClient.native.chuiniuShareUrl(url, shareTitle, shareContent);
                            if(that.isFriendYaoQing){
                                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Yaoqing_Yaoqinghaoyou_Xuanzequdao_chuiniu", {uid:SelfUid()});
                            }
                            break;
                        case 6:
                            cc.log("乡聊");
                            MjClient.native.xiangliaoShareUrl(url, shareTitle, shareContent);
                            if(that.isFriendYaoQing){
                                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Yaoqing_Yaoqinghaoyou_Xuanzequdao_xiangliao", {uid:SelfUid()});
                            }
                            break;
                        case 7:
                            cc.log("默往");
                            MjClient.native.moWangShareUrl(url, shareTitle, shareContent);
                            if(that.isFriendYaoQing){
                                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Yaoqing_Yaoqinghaoyou_Xuanzequdao_mowang", {uid:SelfUid()});
                            }
                        case 8:
                            cc.log("多聊");
                            MjClient.native.dlShareUrl(url, shareTitle, shareContent);
                            break;
                    }
                }
            });
        }

    }
});


MjClient.shareWXOrXLLayer = null;
var shareMultiPlatformLayer = cc.Layer.extend({

    ctor: function (sharePlatforms, selectedCallback) {
        this._super();

        MjClient.shareWXOrXLLayer = this;
        var UI = ccs.load("ShareLayer.json");
        var selectUiIndex = MjClient.isUseUIv3 && MjClient.isUseUIv3();
        if(selectUiIndex && !cc.sys.isObjectValid(MjClient.FriendCard_main_ui)){
            UI = ccs.load("ShareLayer_3.0.json");
        }
        this.addChild(UI.node);

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        var that = this;

        var _back = UI.node.getChildByName("back");
        if (MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
            setWgtLayout(_back,[0.68, 0.68], [0.5, 0.5], [0, -0.04]);
        }
        else {
            setWgtLayout(_back,[0.8, 0.8], [0.5, 0.5], [0, -0.04]);
        }


        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent();
                MjClient.shareWXOrXLLayer = null;
            }
        }, this);

        _back.getChildByName("Btn_share1").setVisible(false);
        _back.getChildByName("Btn_share2").setVisible(false);
        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG)
        {
            _back.getChildByName("Btn_share1_1").setVisible(false);
            _back.getChildByName("Btn_share1_2").setVisible(false);
            _back.getChildByName("Btn_share1_3").setVisible(false);
        }

        var realSharePlatforms = sharePlatforms.concat();
        for (var i=realSharePlatforms.length-1; i>=0; i--)
        {
            var exist = false;
            for (var type in SharePlatformType)
            {
                if (realSharePlatforms[i] == SharePlatformType[type])
                {
                    exist = true;
                    break;
                }
            }
            if (!exist)
            {
                realSharePlatforms.splice(i,1);
            }
        }
        var maxWidth = _back.getContentSize().width;

        var line1count = realSharePlatforms.length;
        var line2count = 0;
        if (realSharePlatforms.length >= 6) {
            line1count = parseInt(realSharePlatforms.length / 2);
            line2count = realSharePlatforms.length - line1count;
        }
        var eachWidthLine1 = maxWidth/(line1count+1);
        var eachWidthLine2 = maxWidth/(line2count+1);
        var btn = _back.getChildByName("Btn_share1");
        if(selectUiIndex){
            if (realSharePlatforms.length >= 4) btn.setScale(btn.getScale()*0.7);
        }else {
            if (realSharePlatforms.length >= 4) btn.setScale(btn.getScale()*0.6);
        }
        for (var i=0; i<realSharePlatforms.length; i++)
        {
            var sharePlatform = realSharePlatforms[i];
            var cloneBtn = btn.clone();
            if (line2count > 0) {
                if (i < line1count) {
                    cloneBtn.setPositionX(eachWidthLine1*(i+1));
                    if(selectUiIndex){
                        cloneBtn.setPositionY(cloneBtn.y + cloneBtn.getContentSize().height*0.6);
                    }else {
                        cloneBtn.setPositionY(cloneBtn.y + cloneBtn.getContentSize().height*0.4);
                    }
                }
                else {
                    cloneBtn.setPositionX(eachWidthLine2*(i-line1count+1));
                    cloneBtn.setPositionY(cloneBtn.y - cloneBtn.getContentSize().height*0.3);
                }
            }
            else {
                cloneBtn.setPositionX(eachWidthLine1*(i+1));
            }
            cloneBtn.setVisible(true);
            cloneBtn.setUserData(sharePlatform);
            _back.addChild(cloneBtn);
            var text = "";
            var image = "";
            switch (sharePlatform)
            {
                case SharePlatformType.WEIXIN:
                    text = "微信";
                    cloneBtn.maidianPath = "Weixin"
                    image = "game_picture/weixin_btn.png";
                    break;
                case SharePlatformType.WEIXIN_PYQ:
                    text = "朋友圈";
                    cloneBtn.maidianPath = "Pengyouquan"
                    image = "game_picture/pengyouquan_btn.png";
                    break;
                case SharePlatformType.XIANLIAO:
                    text = "闲聊";
                    cloneBtn.maidianPath = "Xianliao"
                    image = "game_picture/xianliao.png";
                    break;
                case SharePlatformType.ALIPAY:
                    text = "支付宝";
                    cloneBtn.maidianPath = "Zhifubao"
                    image = "game_picture/zhifubao.png";
                    break;
                case SharePlatformType.DINGTALK:
                    text = "钉钉";
                    cloneBtn.maidianPath = "Dingding"
                    image = "game_picture/dingding.png";
                    break;
                case SharePlatformType.QQ:
                    text = "QQ";
                    cloneBtn.maidianPath = "QQ"
                    image = "game_picture/qq.png";
                    break;
                case SharePlatformType.CHUINIU:
                    text = "吹牛";
                    cloneBtn.maidianPath = "Chuiniu"
                    image = "game_picture/chuiniu.png";
                    break;
                case SharePlatformType.XIANGLIAO:
                    text = "乡聊";
                    cloneBtn.maidianPath = "XiangLiao"
                    image = "game_picture/xiangliao.png";
                    break;
                case SharePlatformType.MOWANG:
                    text = "默往";
                    cloneBtn.maidianPath = "MoWang"
                    image = "game_picture/mowang.png";
                    break;
                case SharePlatformType.DUOLIAO:
                    text = "多聊";
                    cloneBtn.maidianPath = "DuoLiao"
                    image = "game_picture/duoliao.png";
                    break;
            }
            var text_1 = cloneBtn.getChildByName("Text_1");
            text_1.setString(text);
            text_1.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            text_1.ignoreContentAdaptWithSize(true);
            cloneBtn.loadTextures(image,image,image);
            cloneBtn.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    that.removeFromParent();

                    if(MjClient.endallui &&  cc.sys.isObjectValid(MjClient.endallui))
                    {
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dajiesuanjiemian_Fenxiang_Qudaoxuanze_" + sender.maidianPath, {uid:SelfUid()});       
                    }
                    // 打开分享时关闭所有的土司提示
                    if (MjClient.Scene.ToastNodeArray && MjClient.Scene.ToastNodeArray.length > 0) {
                        for (var n = 0; n < MjClient.Scene.ToastNodeArray.length; n++) {
                            MjClient.Scene.ToastNodeArray[n].visible = false;
                        }
                    }

                    MjClient.shareWXOrXLLayer = null;
                    var sharePlatform = sender.getUserData();
                    MjClient.currentSelectedSharePlatform = sharePlatform;
                    if (selectedCallback) selectedCallback(sharePlatform);
                }
            });
            cc.log(text);
        }

        var fontsize = 11;
        if(selectUiIndex){
            fontsize == 14;
        }
        var statementText = new ccui.Text("声明：以上打开为第三方公司运营开发的软件，服务由第三方软件公司提供，与我司无任何关联关系。\n" +
            "本游戏是一款根据地区特点开发的合法合规、绿色健康的休闲棋牌游戏，为落实国家法律法规，我司将继续加强合规性工作，\n" +
            "坚决防范赌博违法犯罪活动。我司鼓励游戏玩家积极举报各类赌博违法犯罪活动线索，一经核实将予以重奖。",
            "fonts/lanting.TTF",fontsize);
        statementText.setPosition(cc.p(_back.width/2, 50));
        if (MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
            statementText.setTextColor(cc.color("#5e6792"));
        }
        else {
            statementText.setTextColor(cc.color("#000000"));
        }
        _back.addChild(statementText);
    }
});


MjClient.shareMultiPlatform = function(sharePlatforms, selectedCallback)
{
    sharePlatforms = sharePlatforms || [];
    selectedCallback = selectedCallback || function(){};
    if (!cc.isArray(sharePlatforms))
    {
        sharePlatforms = JSON.parse(sharePlatforms);
    }
    if (sharePlatforms.length == 0)
    {
        return;
    }

    if (sharePlatforms.length == 1)
    {
        MjClient.currentSelectedSharePlatform = sharePlatforms[0];
        if (selectedCallback) selectedCallback(sharePlatforms[0]);
    }
    else
    {
        if (MjClient.shareWXOrXLLayer == null)
        {
            var layer = new shareMultiPlatformLayer(sharePlatforms, selectedCallback);
            MjClient.Scene.addChild(layer);
        }
    }
};



MjClient.shareImageToSelectedPlatform = function(savepath)
{
    var shareCallbacks = {};
    shareCallbacks[SharePlatformType.WEIXIN] = function(){MjClient.native.wxShareImageToWX(savepath)};
    shareCallbacks[SharePlatformType.WEIXIN_PYQ] = function(){MjClient.native.wxShareImageToPYQ(savepath)};
    shareCallbacks[SharePlatformType.XIANLIAO] = function(){MjClient.native.xlShareImageToXL(savepath)};
    shareCallbacks[SharePlatformType.ALIPAY] = function(){MjClient.native.zfbShareImageToZFB(savepath)};
    shareCallbacks[SharePlatformType.DINGTALK] = function(){MjClient.native.dtShareImageToDingTalk(savepath)};
    shareCallbacks[SharePlatformType.QQ] = function(){MjClient.native.qqShareImageToQQ(savepath)};
    shareCallbacks[SharePlatformType.CHUINIU] = function(){MjClient.native.chuiniuShareImage(savepath)};
    shareCallbacks[SharePlatformType.XIANGLIAO] = function(){MjClient.native.xiangliaoShareImage(savepath)};
    shareCallbacks[SharePlatformType.MOWANG] = function(){MjClient.native.moWangShareImage(savepath)};
    shareCallbacks[SharePlatformType.DUOLIAO] = function(){MjClient.native.dlShareImageToDL(savepath)};
    var callbackFunc = shareCallbacks[MjClient.currentSelectedSharePlatform];
    if (callbackFunc) callbackFunc();
};


//openType 为从哪个地方调用
MjClient.shareImageToMultiPlatform = function(savepath,openType,sharePlatforms)
{
    var shareCallbacks = {};
    shareCallbacks[SharePlatformType.WEIXIN] = function(){MjClient.native.wxShareImageToWX(savepath)};
    shareCallbacks[SharePlatformType.WEIXIN_PYQ] = function(){MjClient.native.wxShareImageToPYQ(savepath)};
    shareCallbacks[SharePlatformType.XIANLIAO] = function(){MjClient.native.xlShareImageToXL(savepath)};
    shareCallbacks[SharePlatformType.ALIPAY] = function(){MjClient.native.zfbShareImageToZFB(savepath)};
    shareCallbacks[SharePlatformType.DINGTALK] = function(){MjClient.native.dtShareImageToDingTalk(savepath)};
    shareCallbacks[SharePlatformType.QQ] = function(){MjClient.native.qqShareImageToQQ(savepath)};
    shareCallbacks[SharePlatformType.CHUINIU] = function(){MjClient.native.chuiniuShareImage(savepath)};
    shareCallbacks[SharePlatformType.XIANGLIAO] = function(){MjClient.native.xiangliaoShareImage(savepath)};
    shareCallbacks[SharePlatformType.MOWANG] = function(){MjClient.native.moWangShareImage(savepath)};
    shareCallbacks[SharePlatformType.DUOLIAO] = function(){MjClient.native.dlShareImageToDL(savepath)};
    MjClient.shareMultiPlatform(cc.isArray(sharePlatforms)?sharePlatforms:MjClient.systemConfig.sharePlatforms, function(sharePlatform)
    {
        if (shareCallbacks[sharePlatform]) (shareCallbacks[sharePlatform])();
    },openType);
};

MjClient.shareUrlToMultiPlatform = function(url, title, content,sharePlatforms)
{
    function getQueryStringArgs(url){
        var qs = url.substring(url.lastIndexOf("?") + 1);
        var args = {};
        var items = qs.length > 0 ? qs.split('&') : [];
        var item = null;
        var name = null;
        var value = null;
        for(var i=0; i<items.length; i++){
            item = items[i].split("=");
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            if(name.length){
                args[name] = value;
            }
        }
        return args;
    }
    var shareCallbacks = {};
    if(cc.isArray(sharePlatforms)){
        shareCallbacks[SharePlatformType.WEIXIN] = function(){MjClient.native.wxShareUrl(url, title, content)};
    }else{
        shareCallbacks[SharePlatformType.WEIXIN] = function(){MjClient.native.wxShareMiniProgram(url, title, content)};
    }
    shareCallbacks[SharePlatformType.WEIXIN_PYQ] = function(){MjClient.native.wxShareUrlToPYQ(url, title, content)};
    //shareCallbacks[SharePlatformType.XIANLIAO] = function(){MjClient.native.xlShareText(title, content+url)};
    shareCallbacks[SharePlatformType.XIANLIAO] = function(){
        var roomID = getQueryStringArgs(url).vipTable;
        MjClient.native.xlShareMiniProgram(roomID, title, content+url);
    };
    shareCallbacks[SharePlatformType.ALIPAY] = function(){MjClient.native.zfbShareUrl(url, title, content)};
    shareCallbacks[SharePlatformType.DINGTALK] = function(){MjClient.native.dtShareUrl(url, title, content)};
    shareCallbacks[SharePlatformType.QQ] = function(){MjClient.native.qqShareUrl(url, title, content)};
    shareCallbacks[SharePlatformType.CHUINIU] = function(){
        var roomID = getQueryStringArgs(url).vipTable;
        MjClient.native.chuiniuShareMiniProgram(roomID, title, content, url);
    };
    shareCallbacks[SharePlatformType.XIANGLIAO] = function(){MjClient.native.xiangliaoShareUrl(url, title, content)};
    shareCallbacks[SharePlatformType.MOWANG] = function(){
        var roomID = getQueryStringArgs(url).vipTable;
        MjClient.native.moWangShareMiniProgram(roomID, title, content, url);
    };
    shareCallbacks[SharePlatformType.DUOLIAO] = function(){MjClient.native.dlShareUrl(url, title, content)};
    MjClient.shareMultiPlatform(cc.isArray(sharePlatforms)?sharePlatforms:MjClient.systemConfig.sharePlatforms, function(sharePlatform)
    {
        if (shareCallbacks[sharePlatform]) (shareCallbacks[sharePlatform])();
    });
};


MjClient.openAppToMultiPlatform = function()
{
    var shareCallbacks = {};
    shareCallbacks[SharePlatformType.WEIXIN] = MjClient.native.openWeixin;
    shareCallbacks[SharePlatformType.WEIXIN_PYQ] = MjClient.native.openWeixin;
    shareCallbacks[SharePlatformType.XIANLIAO] = MjClient.native.openXianliao;
    shareCallbacks[SharePlatformType.ALIPAY] = MjClient.native.openAlipay;
    shareCallbacks[SharePlatformType.DINGTALK] = MjClient.native.openDingtalk;
    shareCallbacks[SharePlatformType.QQ] = MjClient.native.openQQ;
    shareCallbacks[SharePlatformType.CHUINIU] = MjClient.native.openChuiniu;
    shareCallbacks[SharePlatformType.XIANGLIAO] = MjClient.native.openXiangLiao;
    shareCallbacks[SharePlatformType.MOWANG] = MjClient.native.openMoWang;
    shareCallbacks[SharePlatformType.DUOLIAO] = MjClient.native.openDuoLiao;
    MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function(sharePlatform)
    {
        if (shareCallbacks[sharePlatform]) (shareCallbacks[sharePlatform])();
    });
};
