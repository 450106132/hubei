
/*
    通用弹窗提示框
 */
function NewPopMsgView(uiPara) {
    var popui;
	var PopMsgLayer = cc.Layer.extend({
		jsBind:{
			block:{
				_event:{
                    connect:function(){
                        popui.removeFromParent(true);
                    },
                    MJPut:function(){
                        if (MjClient.rePlayVideo != -1) {
                            popui.removeFromParent(true);
                        }
                    },
                    MJGang:function(){
                        if (MjClient.rePlayVideo != -1) {
                            popui.removeFromParent(true);
                        }
                    },
                    MJPeng:function(){
                        if (MjClient.rePlayVideo != -1) {
                            popui.removeFromParent(true);
                        }
                    },
                    MJChi:function(){
                        if (MjClient.rePlayVideo != -1) {
                            popui.removeFromParent(true);
                        }
                    },
                    roundEnd:function(){
                        popui.removeFromParent(true);
                    },
                    initSceneData: function(){
                        popui.removeFromParent(true);
                    },
                    beTrust: function(){
                        if (uiPara.dialogName == "sdhTouXiangDialog")
                            return;
                        
                        popui.removeFromParent(true);
                    }
				}
			}
		},
		ctor:function () {
			this._super();
			cc.log("uiPara.style    ",uiPara.style);
            var jsfile = "PopUpMsg" + uiPara.style + ".json";
            var bUseUIv3 = MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.isFriendCardUseUIv3();
            bUseUIv3 = MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ? true : bUseUIv3;
            if (bUseUIv3) {
                jsfile = "PopUpMsg" + uiPara.style + "_3.0.json";
            }
			var msgui = ccs.load(jsfile);
            
			BindUiAndLogic(msgui.node,this.jsBind);
			this.addChild(msgui.node);

            var _block = msgui.node.getChildByName("block");
            setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

            var _back = msgui.node.getChildByName("back");
            setWgtLayout(_back,[0.64,0.78],[0.5,0.5],[0,0]);

            var _no = _back.getChildByName("no");
            if (uiPara.param.noNormal && _no) {
                btn = new ccui.Button(uiPara.param.noNormal);
                btn.setScale(uiPara.param.noScale || _no.height/btn.height);
                btn.setPosition(_no.getPosition());
                _no.getParent().addChild(btn);
                _no.removeFromParent();
                _no = btn;
            }
            _no.visible = !!uiPara.no;//为啥搞2个！号？？？
            _no.addTouchEventListener(function(sender,Type){
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        var data = {};
                        if(uiPara.style == 3){//沅江鬼胡子碰，不再提示
                            var checkBox = _back.getChildByName("CheckBox");
                            if(checkBox){
                                data.isSelect = checkBox.isSelected()
                            }
                        }
                        popui.removeFromParent(true);
                        MjClient.PopUpMsgBackHall = null;
                        if(uiPara.no){
                            if(uiPara.style == 3){
                                uiPara.no(data);
                            }else{
                                uiPara.no();
                            }
                        }
                        break;
                    default :
                        break;
                }
            },this);
            if(uiPara.msg){
                //红包局解散增加提示
                if(uiPara.msg.indexOf("确认解散房间？") > -1 || uiPara.msg.indexOf("确认解散房间?") > -1){
                    dismissTipInRedPackageRoom();
                }
            }
            var _msg = _back.getChildByName("msg");
            cc.log("============uiPara.msg = " + JSON.stringify(uiPara.msg));
            if(uiPara.msg)
            {
                _msg.setString(uiPara.msg);

                // 如果消息包含解散房间，更换表头为解散申请
                var str = "确认解散房间？";
                if(isJinZhongAPPType() && uiPara.msg.indexOf(str) === 0)
                {
                    _back.getChildByName("Image_3").loadTexture("game_picture/xiaotanchuan_43.png")
                }
                if(uiPara.param.align == "left" && isYongZhouProject()){
                    _msg.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
                }

            }

            var _yes = _back.getChildByName("yes");
            if (uiPara.param.yesNormal && _yes) {
                btn = new ccui.Button(uiPara.param.yesNormal);
                btn.setScale(uiPara.param.yesScale || _yes.height/btn.height);
                btn.setPosition(_yes.getPosition());
                _yes.getParent().addChild(btn);
                _yes.removeFromParent();
                _yes = btn;
            }
            _yes.addTouchEventListener(function(sender,Type){
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        var data = {};
                        if(uiPara.style == 3 || uiPara.style == 5){//岳阳过胡过杠提示，增加不再提示checkbox
                            var checkBox = _back.getChildByName("CheckBox");
                            if(checkBox){
                                data.isSelect = checkBox.isSelected()
                            }
                        }
                        popui.removeFromParent(true);
                        MjClient.PopUpMsgBackHall = null;
                        if(uiPara.yes){
                            if(uiPara.style == 3 || uiPara.style == 5){
                                uiPara.yes(data);
                            }else{
                                uiPara.yes();
                            }
                        }
                        break;
                    default :
                        break;
                }
            },this);

            var Text_title = _back.getChildByName("Text_title");
            var titleImage = _back.getChildByName("Image_1");
            if (uiPara.param.titleText && Text_title) {
                Text_title.setString(uiPara.param.titleText);
            }
            else if (uiPara.param.titleImage && titleImage) {
                titleImage.loadTexture(uiPara.param.titleImage);
            }

            if (uiPara.param == "nantongReplay")
            {
                var p = _yes.getPosition();
                _yes.setPosition(_no.getPosition());
                _no.setPosition(p);

            }
            else if (uiPara.param == "nantongAgain")
            {
                var p = _yes.getPosition();
                _yes.setPosition(_no.getPosition());
                _no.setPosition(p);
            }
			return true;
		}
	   
	});
    popui=new PopMsgLayer();
    popui.setName("NewPopMsgView");
    return popui;
};


//不删除自己的弹窗
function UnclosedPopMsgView(uiPara) {
    var popui;
    var PopMsgLayer = cc.Layer.extend({
        ctor:function () {
            this._super();
            var msgui = ccs.load("PopUpMsg" + uiPara.style + ".json");
            this.addChild(msgui.node);

            var _block = msgui.node.getChildByName("block");
            setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

            var _back = msgui.node.getChildByName("back");
            setWgtLayout(_back,[0.64,0.78],[0.5,0.5],[0,0]);

            var _no = _back.getChildByName("no");
            _no.visible = !!uiPara.no;//为啥搞2个！号？？？
            _no.addTouchEventListener(function(sender,Type){
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        if(uiPara.no) uiPara.no();
                        break;
                    default :
                        break;
                }
            },this);

            var _msg = _back.getChildByName("msg");
            _msg.setString(uiPara.msg);

            var _yes = _back.getChildByName("yes");
            _yes.addTouchEventListener(function(sender,Type){
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        if(uiPara.yes) uiPara.yes();
                        break;
                    default :
                        break;
                }
            },this);

            return true;
        }

    });
    popui=new PopMsgLayer();
    return popui;
};

//进入房间失败 开启定位弹窗
function PopMsgView_openPos(uiPara) {
    var popui;
    var PopMsgLayer = cc.Layer.extend({
        jsBind:{
            block:{
                _event:{
                    connect:function(){
                        popui.removeFromParent(true);
                    },
                    MJPut:function(){
                        if (MjClient.rePlayVideo != -1) {
                            popui.removeFromParent(true);
                        }
                    },
                    MJGang:function(){
                        if (MjClient.rePlayVideo != -1) {
                            popui.removeFromParent(true);
                        }
                    },
                    MJPeng:function(){
                        if (MjClient.rePlayVideo != -1) {
                            popui.removeFromParent(true);
                        }
                    },
                    MJChi:function(){
                        if (MjClient.rePlayVideo != -1) {
                            popui.removeFromParent(true);
                        }
                    },
                    roundEnd:function(){
                        popui.removeFromParent(true);
                    }
                }
            }
        },
        ctor:function () {
            this._super();
            var msgui = ccs.load("PopUpMsg_openPos.json");
            BindUiAndLogic(msgui.node,this.jsBind);
            this.addChild(msgui.node);

            var _block = msgui.node.getChildByName("block");
            setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

            var _back = msgui.node.getChildByName("back");
            setWgtLayout(_back,[0.64,0.78],[0.5,0.5],[0,0]);

            var btn_close = _back.getChildByName("btn_close");
            btn_close.addTouchEventListener(function(sender,Type){
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        popui.removeFromParent(true);
                        break;
                    default :
                        break;
                }
            },this);

            var _msg = _back.getChildByName("msg");
            cc.log("============uiPara.msg  wechatpaypanel = " + JSON.stringify(uiPara.msg));
            if(uiPara.msg)
            {
                _msg.setString(uiPara.msg);
            }


            var btn_openPosition = _back.getChildByName("btn_openPosition");
            btn_openPosition.addTouchEventListener(function(sender,Type){
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        MjClient.native.openSystemSetting();
                        break;
                    default :
                        break;
                }
            },this);

            var btn_openImpower = _back.getChildByName("btn_openImpower");
            btn_openImpower.addTouchEventListener(function(sender,Type){
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        MjClient.native.openSelfAppSetting();
                        break;
                    default :
                        break;
                }
            },this);

           

            if (cc.sys.os == cc.sys.OS_IOS)
            {
                btn_openPosition.visible = true;
                btn_openImpower.visible = false;
                btn_openPosition.x = _back.width / 2;
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID)
            {
                btn_openPosition.visible = true;
                btn_openImpower.visible = true;
            }
            else if (cc.sys.os == cc.sys.OS_WINDOWS)
            {
                btn_openPosition.visible = true;
                btn_openImpower.visible = true;
                btn_openPosition.enabled = false;
                btn_openImpower.enabled = false;
            } 
            
            if (!isCurrentNativeVersionBiggerThan("11.0.0"))
            {
                btn_openPosition.visible = false;
                btn_openImpower.visible = false;
            }

            return true;
        }
       
    });
    popui=new PopMsgLayer();
    popui.setName("NewPopMsgView");
    return popui;
};

//进入房间失败 元宝不足弹窗
function PopUpMsg_addYB(uiPara) {
    var popui;
    var PopMsgLayer = cc.Layer.extend({
        ctor:function () {
            this._super();

            if(isJinZhongAPPType() && MjClient.FriendCard_main_ui)
                var msgui = ccs.load("friendcard_addYB.json");
            else
                var msgui = ccs.load("PopUpMsg_addYB.json");
                
            this.addChild(msgui.node);

            var _block = msgui.node.getChildByName("block");
            setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

            var _back = msgui.node.getChildByName("back");
            setWgtLayout(_back,[0.64,0.78],[0.5,0.5],[0,0]);

            var _msg = _back.getChildByName("msg");
            if(uiPara.message)
            {
                _msg.setString(uiPara.message);
            }


            var btn_ok = _back.getChildByName("btn_ok");
            btn_ok.addTouchEventListener(function(sender,Type){
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        this.removeFromParent();
                        break;
                    default :
                        break;
                }
            },this);

            var btn_goumai = _back.getChildByName("btn_goumai");
            btn_goumai.addTouchEventListener(function(sender,Type){
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        if(MjClient.getAppType() ==  MjClient.APP_TYPE.QXNTQP)
                            MjClient.Scene.addChild(new StoreTipDialog());
                        else
                            MjClient.Scene.addChild(enter_store());
                        this.removeFromParent();
                        break;
                    default :
                        break;
                }
            },this);

            var btn_close = _back.getChildByName("btn_close");
            if(btn_close)
            {
               btn_close.addTouchEventListener(function(sender,Type){
                    switch (Type)
                    {
                        case ccui.Widget.TOUCH_ENDED:
                            this.removeFromParent();
                            break;
                        default :
                            break;
                    }
                },this); 
            }  

            return true;
        }
       
    });
    popui=new PopMsgLayer();
    popui.setName("PopUpMsg_addYB");
    return popui;
};


/*
 退出弹窗提示框
 */
var ExitLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var jsfile = "PopUpMsg1.json"
        var bUseUIv3 = MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.isFriendCardUseUIv3();
        bUseUIv3 = MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ? true : bUseUIv3;

        if (bUseUIv3 && !MjClient.atGoldField) {
            jsfile = "PopUpMsg1_3.0.json";
        }
        var msgui = ccs.load(jsfile);
        this.addChild(msgui.node);
        MjClient.exitLayer = this;
        MjClient.native.umengEvent4CountWithProperty("Likaiyouxi", {uid:SelfUid()});
        var isBlock = cc.sys.isObjectValid(MjClient.blockui) && MjClient.blockui.zIndex > 0;
        if (isBlock) MjClient.unblock();

        var _block = msgui.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = msgui.node.getChildByName("back");
        setWgtLayout(_back,[0.64,0.78],[0.5,0.5],[0,0]);

        var _no = _back.getChildByName("no");
        _no.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if (isBlock) MjClient.block();
                    MjClient.exitLayer.removeFromParent(true);
                    MjClient.exitLayer = null;
                    var key = "Zhujiemian_Shezhi_Tuichuyouxi_Quxiao";
                    if(isYongZhouProject()){
                        key = "Zhujiemian_Likaiyouxi_Quxiao";
                    }
					MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid()});
                    break;
                default :
                    break;
            }
        },this);

        var _msg = _back.getChildByName("msg");
        _msg.setString("真的要离开游戏吗？");

        var _yes = _back.getChildByName("yes");
        _yes.addTouchEventListener(function(sender,Type){
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var key = "Zhujiemian_Shezhi_Tuichuyouxi_Sure";
                    if(isYongZhouProject()){
                        key = "Zhujiemian_Likaiyouxi_Queding";
                    }
                    MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid()});
                    MjClient.exitLayer.removeFromParent(true);
                    MjClient.exitLayer = null;
                    if (cc.sys.isNative) {
                        if( cc.sys.os == cc.sys.OS_WINDOWS)
                        {
                            cc.director.end();
                        }
                        else
                        {
                            cc.game.end();
                        }
                    } else {
                        window.history && window.history.go(-1);
                    }
                    break;
                default :
                    break;
            }
        },this);

        return true;
    }

});

/*
 退出弹窗提示框2
 */
var ExitWithAdLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var msgui = ccs.load("PopUpMsg4.json");
        this.addChild(msgui.node);
        MjClient.exitLayer = this;
        MjClient.native.umengEvent4CountWithProperty("Likaiyouxi", {uid:SelfUid()});
        var isBlock = cc.sys.isObjectValid(MjClient.blockui) && MjClient.blockui.zIndex > 0;
        if (isBlock) MjClient.unblock();

        var _block = msgui.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = msgui.node.getChildByName("back");
        setWgtLayout(_back,[0.85,0.85],[0.5,0.5],[0,0]);

        var _no = _back.getChildByName("no");
        _no.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Tuichuyouxi_Quxiao", {uid:SelfUid()});
                    if (isBlock) MjClient.block();
                    MjClient.exitLayer.removeFromParent(true);
                    MjClient.exitLayer = null;
                    MjClient.native.mobgiAds.closeNativeAds(MjClient.native.mobgiAdsType.YUANSHENG_TUICHU);
                    break;
                default :
                    break;
            }
        },this);

        var _msg = _back.getChildByName("msg");
        _msg.setString("真的要离开游戏吗？");
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
            _msg.setString("离开游戏");
        }

        var advImage = _back.getChildByName("advImage");
        advImage.setOpacity(0);


        UIEventBind(null, this, MjClient.native.mobgiAdsCallbackEvent.NATIVE_ADS_INFO, function(str) {
            try{
                var data = str;
                if (cc.isString(str))
                {
                    data = JSON.parse(str);
                }

                if (data.type != MjClient.native.mobgiAdsType.YUANSHENG_TUICHU)
                {
                    return;
                }
                var url = data.imageUrl[0];
                cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
                {
                    if(!cc.sys.isObjectValid(advImage)){
                        return
                    }
                    if(!err&&texture)
                    {
                        var advImage1 = new cc.Sprite(texture);
                        advImage1.setName("advImage1");
                        advImage1.setPosition(advImage.getPosition());
                        advImage1.setScaleX(advImage.width/advImage1.getContentSize().width);
                        advImage1.setScaleY(advImage.height/advImage1.getContentSize().height);
                        advImage.getParent().addChild(advImage1);

                        MjClient.native.mobgiAds.showNativeAds(MjClient.native.mobgiAdsType.YUANSHENG_TUICHU);
                        advImage.setTouchEnabled(true);
                        advImage.addTouchEventListener(function(sender, type){
                            switch (type) {
                                case ccui.Widget.TOUCH_ENDED:
                                    MjClient.native.mobgiAds.clickNativeAds(MjClient.native.mobgiAdsType.YUANSHENG_TUICHU);
                                    break;
                                default :
                                    break;
                            }
                        });
                    }
                });
            }
            catch(e){

            }

        });
        MjClient.native.mobgiAds.getNativeAdsInfo(MjClient.native.mobgiAdsType.YUANSHENG_TUICHU);

        var _yes = _back.getChildByName("yes");
        _yes.addTouchEventListener(function(sender,Type){
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Tuichuyouxi_Sure", {uid:SelfUid()});
                    MjClient.exitLayer.removeFromParent(true);
                    MjClient.native.mobgiAds.closeNativeAds(MjClient.native.mobgiAdsType.YUANSHENG_TUICHU);
                    MjClient.exitLayer = null;
                    if (cc.sys.isNative) {
                        if( cc.sys.os == cc.sys.OS_WINDOWS)
                        {
                            cc.director.end();
                        }
                        else
                        {
                            cc.game.end();
                        }
                    } else {
                        window.history && window.history.go(-1);
                    }
                    break;
                default :
                    break;
            }
        },this);

        return true;
    }

});

var goldField_exitGameTip = function() {

    var dialog = new NewPopMsgView({
        msg: "正在飞速加载娱乐场资源，再耐心等等吧",
        yes: function() {
            if (cc.sys.isNative) {
                if (cc.sys.os == cc.sys.OS_WINDOWS) {
                    cc.director.end();
                } else {
                    cc.game.end();
                }
            } else {
                window.history && window.history.go(-1);
            }
        },
        no: function() {
            MjClient.exitLayer = null; 
        },
        style: 1,
        param: ""
    });

    var yesBtn = dialog.getChildByName("Node").getChildByName("back").getChildByName("yes");
    yesBtn.removeAllChildren();
    yesBtn.setContentSize(new cc.Sprite("game_picture/goldField/wytch.png").getContentSize());
    yesBtn.loadTextureNormal("game_picture/goldField/wytch.png");
    yesBtn.loadTexturePressed("game_picture/goldField/wytch2.png");

    var noBtn = dialog.getChildByName("Node").getChildByName("back").getChildByName("no");
    noBtn.removeAllChildren();
    noBtn.setContentSize(new cc.Sprite("game_picture/goldField/hd.png").getContentSize());
    noBtn.loadTextureNormal("game_picture/goldField/hd.png");
    noBtn.loadTexturePressed("game_picture/goldField/hd2.png");

    MjClient.Scene.addChild(dialog);

    MjClient.exitLayer = dialog;
}

var goldField_exitGameTip2 = function() {

    var dialog = new NewPopMsgView({
        msg: "娱乐场更新了更多好玩的内容\n还有丰厚的奖励，赶紧去看看吧",
        yes: function() {
            if (cc.sys.isNative) {
                if (cc.sys.os == cc.sys.OS_WINDOWS) {
                    cc.director.end();
                } else {
                    cc.game.end();
                }
            } else {
                window.history && window.history.go(-1);
            }
        },
        no: function() {
            MjClient.exitLayer = null;
            goldField_start();
        },
        style: 1,
        param: ""
    });

    var yesBtn = dialog.getChildByName("Node").getChildByName("back").getChildByName("yes");
    yesBtn.removeAllChildren();
    yesBtn.setContentSize(new cc.Sprite("game_picture/goldField/xczsh.png").getContentSize());
    yesBtn.loadTextureNormal("game_picture/goldField/xczsh.png");
    yesBtn.loadTexturePressed("game_picture/goldField/xczsh2.png");

    var noBtn = dialog.getChildByName("Node").getChildByName("back").getChildByName("no");
    noBtn.removeAllChildren();
    noBtn.setContentSize(new cc.Sprite("game_picture/goldField/qkk_w.png").getContentSize());
    noBtn.loadTextureNormal("game_picture/goldField/qkk_w.png");
    noBtn.loadTexturePressed("game_picture/goldField/qkk_w2.png");

    MjClient.Scene.addChild(dialog);

    MjClient.exitLayer = dialog;
}


var showExitGameLayer = function() {
    if (cc.isUndefined(MjClient.exitLayer) || MjClient.exitLayer == null) {
        if (MjClient.updateResourceClassUI && MjClient.updateResourceClassUI._gameClass == MjClient.RESOURCE_CLASS.GOLD_FIELD) {
            goldField_exitGameTip();
        } else if (util.localStorageEncrypt.getBoolItem("goldField_needTipInto", false)) {
            util.localStorageEncrypt.setBoolItem("goldField_needTipInto", false)
            goldField_exitGameTip2();
        } else if (MjClient.native.mobgiAds.isAdsApp() && MjClient.systemConfig.advShowExit == "true") {
            MjClient.Scene.addChild(new ExitWithAdLayer());
        } else {
            MjClient.Scene.addChild(new ExitLayer());
        }
        if (MjClient.webViewLayer != null) {
            MjClient.webViewLayer.close();
        }
    }
    cc.log("===================退出游戏===============");
}

/*
 玩家无法主动关闭的提示框
 */
var UnclosedTipLayer = cc.Layer.extend({
    ctor:function (msg) {
        this._super();
        if (MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.isFriendCardUseUIv3())
            var msgui = ccs.load("PopUpMsg_3.0.json");
        else
            var msgui = ccs.load("PopUpMsg.json");
        this.addChild(msgui.node);

        var _block = msgui.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = msgui.node.getChildByName("back");
        setWgtLayout(_back,[0.64,0.78],[0.5,0.5],[0,0]);

        var _no = _back.getChildByName("no");
        _no.setVisible(false);
        _no.setTouchEnabled(false);


        this._msg = _back.getChildByName("msg");
        this._msg.setString(""+msg);

        var _yes = _back.getChildByName("yes");
        _yes.setVisible(false);
        _yes.setTouchEnabled(false);

        return true;
    }
    ,setMsg:function(msg){
        if (cc.isObjectValid(this._msg))
            this._msg.setString(""+msg);
    }
});

/*
 玩家无法主动关闭的提示框 适用于内容很多, 一面显示不下的情况
 */
var UnclosedTipLayer_New = cc.Layer.extend({
    ctor:function (msg) {
        this._super();
        if(FriendCard_Common.getSkinType() != 0 && FriendCard_Common.getSkinType() !=3)
            var msgui = ccs.load("friendCard_showOpeMsg.json");
        else if((MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP &&  MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ)|| MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
            var msgui = ccs.load("PopUpMsg2.json");
        else
            var msgui = ccs.load("PopUpMsg_new.json");
        this.addChild(msgui.node);

        var _block = msgui.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = msgui.node.getChildByName("back");
        setWgtLayout(_back,[0.64,0.78],[0.5,0.5],[0,0]);

        var _no = _back.getChildByName("no");
        _no.setVisible(false);
        _no.setTouchEnabled(false);

        var scrollView = _back.getChildByName("scrollView")
        var _msg = scrollView.getChildByName("msg");

        var regex = new RegExp("\n", 'g'); 
        var result = msg.match(regex);
        var count = !result ? 0 : result.length;
        if(result && count <= 3 )
            count = 5

        if(MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&  MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ)
        {
            _msg.setFontSize(30);
        }
        _msg.height = msg.length/22 * _msg.getFontSize() + count * _msg.getFontSize()
        
        scrollView.setInnerContainerSize(cc.size(scrollView.getInnerContainerSize().width, _msg.height))
        _msg.setString(""+msg);
        _msg.y = scrollView.getInnerContainerSize().height;


        var _yes = _back.getChildByName("yes");
        _yes.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    this.removeFromParent(true);
                    break;
                default :
                    break;
            }
        },this);
        return true;
    }
});


/*
    充值提示tips 页面
 */
var PayView = cc.Layer.extend({
    ctor:function () {
        this._super();
        var payLayerui = ccs.load("PayLayer.json");
		//BindUiAndLogic(payLayerui.node,this.jsBind);
        this.addChild(payLayerui.node);
		MjClient.payLayerui = this;

        var _block = payLayerui.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = payLayerui.node.getChildByName("back");
        setWgtLayout(_back,[0.64,0.78],[0.5,0.5],[0,0]);

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.payLayerui.removeFromParent(true);
                    delete MjClient.payLayerui;
                    break;
                default :
                    break;
            }
        },this);

        var _weixinBuy = _back.getChildByName("weixinBuy");
        _weixinBuy.setString(""+MjClient.systemConfig.weixinBuy);

        var _lessMoney = _back.getChildByName("lessMoney");
        _lessMoney.visible = true;

        var _text = _back.getChildByName("text");
        var _textValue = MjClient.remoteCfg.checkTest ?　"请联系所在群主或添加以下微信号。" : "购买元宝请联系所在群主或添加以下微信号。";
        _text.setString(_textValue);

        return true;
    }
   
});





/*
 玩家无法主动关闭的提示框
 */
var UnTouchLayer = cc.Layer.extend({
    ctor:function (msg) {
        this._super();
        if (MjClient.isUseUIv3 && MjClient.isUseUIv3() && !cc.sys.isObjectValid(MjClient.FriendCard_main_ui))
            var msgui = ccs.load("PopUpMsg_3.0.json");
        else
            var msgui = ccs.load("PopUpMsg.json");
        this.addChild(msgui.node);

        var _block = msgui.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);
        _block.setOpacity(0);

        var _back = msgui.node.getChildByName("back");
        setWgtLayout(_back,[0.64,0.78],[0.5,0.5],[0,0]);
        _back.setVisible(false);

        return true;
    }

});


/*
 广告弹窗
 */
var advPopLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var msgui = ccs.load("advShowLayer.json");
        this.addChild(msgui.node);

        var self = this;
        this._closeCallback = null;

        var _block = msgui.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = msgui.node.getChildByName("back");
        setWgtLayout(_back,[0.95,0.95],[0.5,0.5],[0,0]);

        var close = _back.getChildByName("close");
        close.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    self.removeFromParent(true);
                    if (this._closeCallback) {
                        this._closeCallback();
                    }
                    MjClient.native.mobgiAds.closeNativeAds(MjClient.native.mobgiAdsType.YUANSHENG_CHONGQI);
                    break;
                default :
                    break;
            }
        },this);

        this.advImage = _back.getChildByName("advImage");
        this.advImage.setOpacity(0);

        this.advText = _back.getChildByName("advText");
        this.advText.ignoreContentAdaptWithSize(true);

        return true;
    },
    loadImage:function(data)
    {
        if(data.title){
            this.advText.setVisible(true);
            this.advText.setString(data.title);
        }else {
            this.advText.setVisible(false);
        }

        var advImage = this.advImage;
        var imageUrl = data.imageUrl[0];
        cc.loader.loadImg(imageUrl, {isCrossOrigin : true}, function(err, texture)
        {
            if(!cc.sys.isObjectValid(advImage)){
                return
            }
            if(!err&&texture)
            {
                var advImage1 = new cc.Sprite(texture);
                advImage1.setName("advImage1");
                advImage1.setPosition(advImage.getPosition());
                advImage1.setScaleX(advImage.width/advImage1.getContentSize().width);
                advImage1.setScaleY(advImage.height/advImage1.getContentSize().height);
                advImage.getParent().addChild(advImage1);

                MjClient.native.mobgiAds.showNativeAds(MjClient.native.mobgiAdsType.YUANSHENG_CHONGQI);
                advImage.setTouchEnabled(true);
                advImage.addTouchEventListener(function(sender, type){
                    switch (type) {
                        case ccui.Widget.TOUCH_ENDED:
                            MjClient.native.mobgiAds.clickNativeAds(MjClient.native.mobgiAdsType.YUANSHENG_CHONGQI);
                            break;
                        default :
                            break;
                    }
                });
            }
        });
    },
    setCloseCallback:function(callback)
    {

        this._closeCallback = callback;

    },
});


