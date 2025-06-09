// add by cyc

var goldField_updateListener = function(goldFieldBtn) {

    var clipper = null;
    var sprite1 = null;
    var sprite2 = null;
    var perText = null;
    var sprite3 = null;
    var init = function() {
        var btnFileName = goldFieldBtn.getRendererNormal().getResourceName();

        clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create(btnFileName);
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        goldFieldBtn.addChild(clipper, 100);

        sprite1 = new cc.Sprite("game_picture/mainMenu/ylch_hsk.png");
        sprite1.setAnchorPoint(cc.p(0.0, 0.5));
        sprite1.setScaleX(goldFieldBtn.width / sprite1.width);
        sprite1.setScaleY(goldFieldBtn.height / sprite1.height);
        sprite1.y = sten.height / 2;
        clipper.addChild(sprite1, 1);

        sprite2 = new cc.Sprite("game_picture/mainMenu/ylch_fgt.png");
        sprite2.setScaleY(goldFieldBtn.height / sprite2.height);
        sprite2.y = goldFieldBtn.height / 2 + 8;
        clipper.addChild(sprite2, 1);

        perText = new ccui.Text("0%", MjClient.fzcyfont, 30);
        perText.setAnchorPoint(cc.p(0.0, 0.5));
        perText.y = sprite1.y;
        clipper.addChild(perText, 1);

        if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
            clipper.setScale(1.05);
            clipper.x += 4;
        }
    }

    var refreshPer = function(per) {
        sprite1.setVisible(true);
        sprite2.setVisible(true);
        perText.setVisible(true);

        sprite1.setScaleX((goldFieldBtn.width * (1 - per * 0.01)) / sprite1.width);
        sprite1.x = goldFieldBtn.width * per * 0.01;

        sprite2.x = goldFieldBtn.width * per * 0.01 - 20;

        perText.setString(per + "%");
        perText.x = sprite2.x + 30;
    }

    var shanGuang = function() {
        sprite1.setVisible(false);
        sprite2.setVisible(false);
        perText.setVisible(false);

        sprite3 = new cc.Sprite("game_picture/mainMenu/ylch_shanguang.png");
        sprite3.setScaleY(goldFieldBtn.height / sprite3.height);
        sprite3.x = -sprite3.width / 2;
        sprite3.y = goldFieldBtn.height / 2;
        clipper.addChild(sprite3, 1);

        sprite3.runAction(cc.sequence(cc.MoveTo(1.0, cc.p(goldFieldBtn.width + sprite3.width / 2, sprite3.y)), cc.callFunc(function() {
            clipper.removeFromParent();
            clipper = null;
            sprite1 = null;
            sprite2 = null;
            sprite3 = null;
            perText = null;
        })));
    }

    UIEventBind(null, goldFieldBtn, "goldField_refreshUpdatePer", function(rtn) {
        if (MjClient.goldFieldJingMoUpdate)
            return;

        if (!clipper)
            init();
        refreshPer(rtn);

        if (rtn >= 100) {
            if (sprite3 == null)
                shanGuang();
        } else if (sprite3) {
            sprite3.removeFromParent();
            sprite3 = null;
        }
    });

    UIEventBind(null, goldFieldBtn, "goldField_refreshUpdateFail", function(rtn) {
        if (clipper)
            clipper.removeFromParent();
        clipper = null;
        sprite1 = null;
        sprite2 = null;
        sprite3 = null;
        perText = null;
    });

    if (MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP &&
        MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&
        MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ) {
        goldField_checkJingMoUpdate();
    }
}

// 金币场静默更新
var goldField_checkJingMoUpdate = function() {
    //邵阳直接退出娱乐场
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
        return;
    }

    if (util.localStorageEncrypt.getStringItem("VERSION_RESOURCE_CLASS_" + MjClient.RESOURCE_CLASS.GOLD_FIELD).length > 0 ||
        (cc.sys.OS_WINDOWS == cc.sys.os && !MjClient.windowUpdate)) {//资源存在
        return;
    }

    var check = function() {
        var isNetGood = MjClient.reqPingPong < 400;
        if (!isNetGood && cc.sys.isObjectValid(MjClient.updateResourceClassUI))
            return;

        MjClient.UpdateResourceClassViewCallback = true;
        MjClient.native.umengEvent4CountWithProperty("goldField_JingMoUpdate_start", {uid:SelfUid()});
        var updateView = new UpdateResourceClassView(MjClient.RESOURCE_CLASS.GOLD_FIELD, function() {
            MjClient.native.umengEvent4CountWithProperty("goldField_JingMoUpdate_success", {uid:SelfUid()});
        });
        MjClient.goldFieldJingMoUpdate = true;
        updateView.setVisible(false);
        MjClient.Scene.addChild(updateView, 9999999);
        MjClient.Scene.stopActionByTag(20191225);
    }

    var action = cc.sequence(cc.delayTime(3.0), cc.callFunc(check)).repeatForever();
    action.setTag(20191225);
    MjClient.Scene.runAction(action);
}

var goldField_start = function(byShare) {
    //邵阳直接退出娱乐场
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
        return;
    }

    if (!MjClient.data.fieldServers || !MjClient.data.fieldServers.ip || MjClient.data.fieldServers.ip.length <= 0) {
        MjClient.showToast("即将开放,敬请期待");
        return;
    }

    if (cc.sys.isObjectValid(MjClient.updateResourceClassUI)) {
        if (MjClient.goldFieldJingMoUpdate) {
            MjClient.updateResourceClassUI.setVisible(true);
            MjClient.goldFieldJingMoUpdate = false;
        }
        MjClient.showToast("正在加载资源，请加载完成后再试");
        return;
    }

    util.localStorageEncrypt.setBoolItem("goldField_needTipInto", false);
    if (util.localStorageEncrypt.getStringItem("VERSION_RESOURCE_CLASS_" + MjClient.RESOURCE_CLASS.GOLD_FIELD).length > 0 ||
        (cc.sys.OS_WINDOWS == cc.sys.os && !MjClient.windowUpdate)) {//资源存在
        goldField_into(byShare);
    }
    else {
        MjClient.UpdateResourceClassViewCallback = true;
        MjClient.goldFieldJingMoUpdate = false;
        var updateView = new UpdateResourceClassView(MjClient.RESOURCE_CLASS.GOLD_FIELD, function() {
            if (/*byShare && */!cc.sys.isObjectValid(MjClient.playui) && !cc.sys.isObjectValid(MjClient.FriendCard_main_ui)) {
                goldField_into(byShare);
            }
            else {
                //MjClient.showToast("娱乐场资源加载成功！");
                util.localStorageEncrypt.setBoolItem("goldField_needTipInto", true);
            }
        });
        MjClient.Scene.addChild(updateView, 9999999);
    }
}

var goldField_registerApi = function() {
    var api = {};

    api.backToGame = function () {
        cc.log("GoldField api backToGame");
        MjClient.NetMsgQueue = [];//清空消息队列，防止在金币场没注册的消息跑到房卡场次
        MjClient.atGoldField = false;
        if(cc.sys.isObjectValid(MjClient.homeui)){
            if(MjClient.homeui.doShowAction){
                MjClient.homeui.doShowAction();
            }
        }else{
            MjClient.addHomeView();
        }
        MjClient.Scene.scheduleUpdate();
        var action = cc.sequence(cc.callFunc(function() {
            postEvent("disconnect", 6);
        }))
        action.setTag(20190319);
        MjClient.Scene.runAction(action);
    }
    api.logout = function (loginToGoldField) {
        cc.log("GoldField api logout")
        MjClient.loginToGoldField = loginToGoldField;

    }

    api.native = MjClient.native;
    api.isCurrentNativeVersionBiggerThan = isCurrentNativeVersionBiggerThan;
    api.checkChatWords = checkChatWords;
    api.getPayWay = function () {
        var payWayList = [].concat(MjClient.systemConfig.recharge ? MjClient.systemConfig.recharge:[]);
        return payWayList;
    };
    api.getShareWay = function () {
        var shareWayList = [].concat(MjClient.systemConfig.sharePlatforms ? MjClient.systemConfig.sharePlatforms:[]);
        return shareWayList;
    };

    return api;
}

var goldField_into = function(byShare) {
    cc.log("goldField_into");
    
    if (MjClient.atGoldField) {
        cc.log("已经在娱乐场");
        return;
    }
    MjClient.atGoldField = true;
    
    var goldFieldMainPath = "";
    if (cc.sys.OS_WINDOWS != cc.sys.os) {
        goldFieldMainPath = jsb.fileUtils.getWritablePath() + MjClient.RESOURCE_DIR[MjClient.RESOURCE_CLASS.GOLD_FIELD] + "/src/GoldField_main.js";
    }
    else {
        goldFieldMainPath = MjClient.Window_AppPath + "../goldField/src/GoldField_main.js";
    }

    cc.log("-----goldFieldMainPath=" + goldFieldMainPath);
    if (!jsb.fileUtils.isFileExist(goldFieldMainPath) && !jsb.fileUtils.isFileExist(goldFieldMainPath + "c")) {
        cc.log("不存在GoldField_main.js GoldField_main.jsc");
        return;
    }
    
    MjClient.Scene.unscheduleUpdate();
    if(MjClient.gamenet){
        MjClient.gamenet.disconnect();
    }

    cc.sys.cleanScript(goldFieldMainPath);
    require(goldFieldMainPath);

    var data = {};
    data.gameType = MjClient.gameType;
    data.size = MjClient.size;
    var goldFiledloginData = {};
    goldFiledloginData.appid = AppEnv[MjClient.getAppType()];
    goldFiledloginData.headimgurl = MjClient.data.pinfo.headimgurl;
    goldFiledloginData.latitude = MjClient.native.GetLatitudePos();
    goldFiledloginData.longitude = MjClient.native.GetLongitudePos();
    goldFiledloginData.nickname = MjClient.data.pinfo.nickname;
    goldFiledloginData.openid = MjClient.data.pinfo.openid;
    goldFiledloginData.unionid = MjClient.data.pinfo.unionid;
    goldFiledloginData.sex = MjClient.data.pinfo.sex;
    goldFiledloginData.uid = MjClient.data.pinfo.uid;
    goldFiledloginData.os = cc.sys.os;
    data.loginData = goldFiledloginData;
    data.fieldServers = MjClient.data.fieldServers;
    data.api = goldField_registerApi();
    data.byShare = byShare;
    cc.log("goldField_into time 1:" + new Date().getTime());
    goldField_main(data);
    cc.log("goldField_into time 2:" + new Date().getTime());
}


