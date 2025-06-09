//作弊检测界面

var ScanCheatLayer = cc.Layer.extend({

    str_tips: [
        "正在检测有无外挂",
        "正在检测玩家是否开启定位",
        "正在检测玩家是否距离过近",
        "正在检测玩家是否安装插件"
    ],

    //显示状态配置
    show_cfg: {
        check:{color:"#f2c242", img_res:"ScanCheat/detection_pass.png", img_opacity:0, img_visible:true, ani_visible:true},
        pass:{color:"#7edf30", img_res:"ScanCheat/detection_pass.png", img_opacity:255, img_visible:true, ani_visible:false},
        fail:{color:"#ff7a36", img_res:"ScanCheat/detection_fail.png", img_opacity:255, img_visible:true, ani_visible:false}
    },

    armature_png: "ScanCheat/DHfangzuobi0.png",
    armature_plist: "ScanCheat/DHfangzuobi0.plist",
    armature_json: "ScanCheat/DHfangzuobi.ExportJson",

    sprite_plist: "ScanCheat/ScanCheat.plist",
    sprite_png: "ScanCheat/ScanCheat.png",
    jsBind: {
        _run : function(){
            this.visible = false;
        },
        _event: {
            initSceneData:function (d) {
                MjClient.checkChangeLocationApp();
            },
            mjhand : function(){
                this.visible = true;
                this.schedule(this.timerSec, 0.1);
            },
            roundEnd : function(){
                if(this && cc.sys.isObjectValid(this)){
                    this.removeFromParent(true);
                }
            }
        }
    },
    ctor: function() {
        this._super();

        //检测配置 check:检查1秒，show：结果显示2秒，state：检查状态标记，checkType：检测类型
        this.check_cfg = [
            {check:0.6, show:0, state:0, now:0, checkType:null, result:null},
            {check:0.6, show:0, state:0, now:0, checkType:null, result:null},
            {check:0.6, show:0, state:0, now:0, checkType:null, result:null},
            {check:0.6, show:2, state:0, now:0, checkType:null, result:null}
        ];

        this.gpsBtn = null;
        this.time_sec = 0.0;
        this.bIsTest = false;

        cc.spriteFrameCache.addSpriteFrames(this.sprite_plist, this.sprite_png);
        ccs.armatureDataManager.addArmatureFileInfo(this.armature_png, this.armature_plist, this.armature_json);

        var layer_json = ccs.load("ScanCheatLayer.json");
        this.layer = layer_json.node;

        this.addChild(this.layer);

        this.node_list = [];
        var img, text, ani, obj;

        this.bg = this.layer.getChildByName("bg");
        setWgtLayout(this.bg, [0.5, 0.5], [0.5, 0.5], [0, 0]);

        this.ArmatureNode_1 = new ccs.Armature("DHfangzuobi");
        this.ArmatureNode_1.animation.play("fangzuobidonghua01", -1, 1);
        this.ArmatureNode_1.setPosition(115, 115);
        this.bg.addChild(this.ArmatureNode_1);

        for (var i = 1; i <= 4; i++) {

            img = this.bg.getChildByName("Image_" + i);
            text = img.getChildByName("text");
            text.setString("");

            ani = new ccs.Armature("DHfangzuobi");
            ani.animation.play("fangzuobidonghua02", -1, 1);
            ani.setPosition(13, 16);
            img.addChild(ani);

            img.setCascadeOpacityEnabled(false);

            text.ignoreContentAdaptWithSize(true);
            text.setTextAreaSize(cc.size(350, 0));

            img.visible = false;
            ani.visible = false;

            obj = {"img":img, "text":text, "ani":ani};
            this.node_list.push(obj);
        }

        // ccui.Helper.doLayout(this.layer);
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
            MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
            (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI))
        { 
            BindUiAndLogic(this, this.jsBind);
        }else{
            this.schedule(this.timerSec, 0.1);
        }
    },

    updateLayout: function() {
        var node, textHei;
        var total_height = 10;

        var t_posY = [];
        var need_layout = false;
        var lines = 0;

        for(var i = this.node_list.length - 1; i >= 0; i--) {
            node = this.node_list[i];
            textHei = node.text.getAutoRenderSize().height;
            lines = textHei / 25;
            textHei = lines * 22;

            if (i == this.node_list.length - 1) {
                total_height = total_height + textHei;
                t_posY[i] = total_height;

                if (textHei > 44) {
                    need_layout = true;
                }

            } else {
                t_posY[i] = textHei / 2 + total_height + 10;
                total_height = total_height + textHei + 10;

                if (textHei > 66) {
                    need_layout = true;
                }
            }
        }

        total_height = Math.max(total_height + 10, 230);

        if (need_layout || total_height > 230) {
            total_height = total_height + 10;

            for(var i = t_posY.length - 1; i >= 0; i--) {
                node = this.node_list[i];
                node.img.setPositionY(t_posY[i]);
            }

            this.ArmatureNode_1.setPositionY(total_height / 2);
            this.bg.setContentSize(cc.size(536, total_height));
        }
    },

    timerSec: function(dt) {

        this.time_sec += dt;

        for(var j = 0; j < 4; j++) {

            if (this.check_cfg[j].state == 0) {//未开始检查
                var str = this.str_tips[j];
                this.setState(j, "check", str);
                this.check_cfg[j].state = 1;

                this.check_cfg[j].now = this.time_sec;

                return;

            } else if (this.check_cfg[j].state == 1) {//检查中

                if (this.time_sec - this.check_cfg[j].now >= this.check_cfg[j].check) {
                    var ret = this.getCheckResult(j);
                    this.setState(j, ret.result, ret.tips);
                    this.check_cfg[j].state = 2;
                    this.check_cfg[j].now = this.time_sec;
                    this.check_cfg[j].result = ret.result;
                    this.check_cfg[j].checkType = ret.checkType;
                }

                return;

            } else if (this.check_cfg[j].state == 2) {//检查完毕，间隔等待检查下一条
                if (j == 3) {
                    this.ArmatureNode_1.getAnimation().gotoAndPause(50);
                }

                if (this.time_sec - this.check_cfg[j].now >= this.check_cfg[j].show) {
                    this.check_cfg[j].state = 3;
                }

                return;
            }

        }

        //所有的检测完毕
        this.unschedule(this.timerSec);
        this.endAction();
    },

    endAction: function() {

        if(cc.isUndefined(MjClient.playui)) {
        	this.removeFromParent();
        	return;
        }

        if (this.gpsBtn == null) {
            var downNode = MjClient.playui.playerNodeArr ? MjClient.playui.getNodeByName("node_down") : MjClient.playui._downNode; 
            var name = MjClient.playui.playerNodeArr ? "btn_gps" : "gps_btn";
            this.gpsBtn = ccui.helper.seekWidgetByName(downNode.getParent(), name);
        }

        if(this.gpsBtn == null && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI){
            this.gpsBtn = MjClient.playui.jsBind.img_banner.btn_gps._node;
        }

        if (MjClient.playui.isNewFrameMaJiang) {
            this.gpsBtn = MjClient.playui.jsBind.node_wait.btn_gps._node;
        }

        var ac1 = null;
        if (this.gpsBtn) {
            var wpos = this.gpsBtn.convertToWorldSpace(cc.p(33, 33));
            var pos = this.layer.convertToNodeSpace(wpos);
            ac1 = cc.spawn(cc.MoveTo(0.3, pos), cc.ScaleTo(0.3, 0.1));
        } else {
            ac1 = cc.ScaleTo(0.3, 0.1);
        }

        var self = this;
        var removeMe = function(){
            if (self.gpsBtn && cc.sys.isObjectValid(self.gpsBtn)) {
                var isFail = false;
                for(var i = 0; i < self.check_cfg.length; i++) {
                    if (self.check_cfg[i].result == "fail" 
                        && (self.check_cfg[i].checkType == "isOpenGPS" || self.check_cfg[i].checkType == "isTooClose") // 未开启定位或者距离过近
                    ) {
                        isFail = true;
                        break;
                    }
                }
                if(MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || 
                    MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER || 
                    MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN)
                {
                    if (isFail) {
                        self.gpsBtn.loadTextures("playing/daqi/new/dingwei_red.png","playing/daqi/new/dingwei_red.png")
                    } else {
                        self.gpsBtn.loadTextures("playing/daqi/new/dingwei.png","playing/daqi/new/dingwei.png")
                    }
                }else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                            MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
                            (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI))
                {
                    var path = self.getGpsImgPath(isFail);
                    self.gpsBtn.loadTextures(path, self.getGpsImgPath(false), self.getGpsImgPath(false));
                }
                else {
                    if (MjClient.gameType == MjClient.GAME_TYPE.XU_PU_LAO_PAI) {
                        if (isFail) {
                            self.gpsBtn.loadTextures("playing/ziPaiBanner/dingwei_hong.png");
                        }
                        else {
                            self.gpsBtn.loadTextures("playing/ziPaiBanner/dingwei.png");
                        }
                    }
                    else {
                        if (isFail) {
                            self.gpsBtn.loadTextures("ScanCheat/gps_btn_red1.png", "ScanCheat/gps_btn_red2.png", "ScanCheat/gps_btn_red1.png")
                        } else {
                            self.gpsBtn.loadTextures("ScanCheat/gps_btn_yellow1.png", "ScanCheat/gps_btn_yellow2.png", "ScanCheat/gps_btn_yellow1.png")
                        }
                    }
                }
            }

            self.removeFromParent();
        }
        var ac2 = cc.CallFunc(removeMe)

        this.bg.runAction(cc.sequence(ac1, ac2));
    },

    getGpsImgPath : function(isFail){
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var path = isFail ? "ScanCheat/gps_btn_red1.png" : "playing/paohuzi/dd.png";
        if(MjClient.GAME_CLASS.PAO_HU_ZI == GameClass[tData.gameType] 
            || MjClient.gameType == MjClient.GAME_TYPE.XU_PU_LAO_PAI){
            path = isFail ? "playing/ziPaiBanner/dingwei_hong.png" : "playing/ziPaiBanner/dingwei.png";
        }else if(MjClient.GAME_CLASS.PAO_DE_KUAI == GameClass[tData.gameType]){
            path = isFail ? "ScanCheat/gps_btn_yellow3.png" : "ScanCheat/gps_btn_yellow1.png";
        }
        return path;
    },

    setState: function(idx, state, tips) {
        var node = this.node_list[idx];
        if (node) {
            var cfg = this.show_cfg[state];
            node.text.setString(tips);
            node.text.setTextColor(cc.color(cfg.color));
            node.img.loadTexture(cfg.img_res, 1);
            node.img.setOpacity(cfg.img_opacity);
            node.img.visible = cfg.img_visible;
            node.ani.visible = cfg.ani_visible;

            this.updateLayout();
        }
    },

    getCheckResult: function(idx) {
        switch(idx) {
            case 0:
                return this.hasCheatApp(); break;

            case 1:
                return this.isOpenGPS(); break;

            case 2:
                return this.isTooClose(); break;

            case 3:
                return this.isInstallPlugin(); break;
        }
    },

    //是否有玩家安装插件
    isInstallPlugin: function() {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var str = "";
        var pl = null;

        for (var i = 0; i < tData.uids.length; i++) {
            pl = sData.players[tData.uids[i]];
            if (pl && pl.locationApps && pl.locationApps.length > 0) {
                var name = getPlayerName(unescape(pl.info.nickname ));
                var app_name = [];
                for (var j = 0; j < pl.locationApps.length; j++) {
                    app_name.push(pl.locationApps[j].name);
                }
                var info = name + "安装了" + app_name.join(",");
                if (str == "") {
                    str = info;
                } else {
                    str = str + "\n" + info;
                }
            }
        }

        if (this.bIsTest) {
            var min = 0;
            var max = 4;
            var num = Math.floor(Math.random() * (max - min + 1) + min);

            for(var i = 1; i <= num; i++) {
                min = 1;
                max = 8;
                var num2 = Math.floor(Math.random() * (max - min + 1) + min);
                var test_name = [];
                for(var ii = 1; ii <= num2; ii++) {
                    test_name.push("测试插件名称" + ii);
                }
                var info = "测试玩家名称" + i + "安装了" + test_name.join(",");

                if (str == "") {
                    str = info;
                } else {
                    str = str + "\n" + info;
                }
            }
        }

        if (str == "") {
            return {result:"pass", tips:"没有玩家安装插件", checkType:"isInstallPlugin"};
        } else {
            return {result:"fail", tips:str, checkType:"isInstallPlugin"};
        }
    },

    //有无外挂
    hasCheatApp: function() {
        return {result:"pass", tips:"无外挂", checkType:"hasCheatApp"};
    },

    //玩家是否开启定位
    isOpenGPS: function() {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var gps_warning = [];
        var pl = null;

        for (var i = 0; i < tData.uids.length; i++) {
            pl = sData.players[tData.uids[i]];
            if (pl && pl.locationMsg) {
                var plyoneV = new Array();
                plyoneV = pl.locationMsg.split(";");
                if (plyoneV[0] <= 0 || plyoneV[1] <= 0)//未取到定位数据
                {
                    var name = getPlayerName(unescape(pl.info.nickname ));
                    gps_warning.push(name);
                }
            }
        }

        if (this.bIsTest) {
            var min = 0;
            var max = 5;
            var num = Math.floor(Math.random() * (max - min + 1) + min);

            for(var i = 1; i <= num; i++) {
                gps_warning.push("名字测试长度");
            }
        }

        if (gps_warning.length == 0) {
            return {result:"pass", tips:"玩家均开启定位", checkType:"isOpenGPS"};
        } else {
            return {result:"fail", tips:gps_warning.join(",")+"未开启定位", checkType:"isOpenGPS"};
        }
    },

    //是否有玩家同IP
    isSameIP: function() {

        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var pls = sData.players;
        var ip2pl = {};

        for (var uid in pls) {
            var pi = pls[uid];
            var ip = pi.info.remoteIP;
            if (ip) {
                if (!ip2pl[ip]) ip2pl[ip] = [];
                ip2pl[ip].push(getPlayerName(unescape(pi.info.nickname )));
            }
        }

        var ipmsg = [];
        for (var ip in ip2pl) {
            var ips = ip2pl[ip];
            if (ips.length > 1) {
                ipmsg.push(ips.join("和"));
            }
        }

        if (ipmsg.length == 0) {
            return {result:"pass", tips:"玩家IP正常", checkType:"isSameIP"};
        } else {
            return {result:"fail", tips:ipmsg.join(",")+"的IP相同", checkType:"isSameIP"};
        }
    },

    //是否有玩家距离过近
    isTooClose: function() {
        var sData = MjClient.data.sData;
        if(!sData) return;
        var tData = sData.tData;
        var geogData = [];
        var pl = null;

        for (var i = 0; i < tData.uids.length; i++) {
            pl = sData.players[tData.uids[i]];
            if (pl && pl.locationMsg) {
                geogData.push(pl.locationMsg);
            }
        }

        var distance_warning = [];

        for(var i = 0; i < geogData.length; i++) {
            for(var j = i + 1; j < geogData.length; j++) {
                var plyoneV = new Array();
                var plytwoV = new Array();
                plyoneV = geogData[i].split(";");
                plytwoV = geogData[j].split(";");

                var plone = getUIPlayerByUID(plyoneV[3]);
                var _oneLatitude = plone.info.location.latitude;
                var _oneLongitude = plone.info.location.longitude;
                if(!_oneLatitude)  _oneLatitude = plyoneV[0];
                if(!_oneLongitude)  _oneLongitude =  plyoneV[1];

                var pltwo = getUIPlayerByUID(plytwoV[3]);
                var _twoLatitude = pltwo.info.location.latitude;
                var _twoLongitude = pltwo.info.location.longitude;
                if(!_twoLatitude) _twoLatitude = plytwoV[0];
                if(!_twoLongitude) _twoLongitude =  plytwoV[1];

                var distance = MjClient.native.CalculateLineDistance(_oneLatitude, _oneLongitude, _twoLatitude, _twoLongitude);

                if (distance >= 0 && distance <= 50) {
                    var uid1 = parseInt(plyoneV[3]);
                    var uid2 = parseInt(plytwoV[3]);
                    var pl1 = sData.players[uid1];
                    var pl2 = sData.players[uid2];

                    if (pl1 && pl2) {
                        var name1 = getPlayerName(unescape(pl1.info.nickname));
                        var name2 = getPlayerName(unescape(pl2.info.nickname));
                        var str = name1 + "和" + name2;
                        distance_warning.push(str);
                    }
                }
            }
        }

        if (this.bIsTest) {
            var min = 0;
            var max = 8;
            var num = Math.floor(Math.random() * (max - min + 1) + min);

            for(var i = 1; i <= num; i++) {
                distance_warning.push("名字测试长度1和名字测试长度2");
            }
        }

        if (distance_warning.length == 0) {
            return {result:"pass", tips:"玩家距离正常", checkType:"isTooClose"};
        } else {
            return {result:"fail", tips:distance_warning.join(",")+"距离过近", checkType:"isTooClose"};
        }
    },

    setGPSBtn: function(gpsBtn) {
        this.gpsBtn = gpsBtn;
    },

    onEnter: function() {
        this._super();
    },

    onExit: function() {
        this._super();

        this.unschedule(this.timerSec);
        // cc.spriteFrameCache.removeSpriteFramesFromFile(this.sprite_plist);
        ccs.armatureDataManager.removeArmatureFileInfo(this.armature_json);
        ScanCheatLayer.pInstance = null;
    }

});


ScanCheatLayer.pInstance = null;

ScanCheatLayer.initButton = function(parent, ratiox, ratioy) {
    if (MjClient.rePlayVideo != -1) return;
    cc.spriteFrameCache.addSpriteFrames("ScanCheat/ScanCheat.plist", "ScanCheat/ScanCheat.png");

    var btn = new ccui.Button("ScanCheat/gps_btn_yellow1.png", "ScanCheat/gps_btn_yellow2.png", "ScanCheat/gps_btn_yellow1.png", 1);
    parent.addChild(btn);
    setWgtLayout(btn, [0.1, 0.1], [ratiox, ratioy], [0, 0]);

    var click = function() {
        ScanCheatLayer.getInstance(btn);
    }

    btn.addClickEventListener(click);

    return btn;
}

ScanCheatLayer.showStartOnce = function() {
    if (MjClient.rePlayVideo != -1) return;
    var tData = MjClient.data.sData.tData;

    //cc.log("ScanCheatLayer.showStartOnce===>", tData.roundNum, tData.roundAll)
    if (tData.roundNum != tData.roundAll) return;

    ScanCheatLayer.getInstance(null);
}

ScanCheatLayer.getInstance = function(gpsBtn) {

    if(MjClient.data.sData.tData.maxPlayer === 2) return;

    if (ScanCheatLayer.pInstance == null) {
        ScanCheatLayer.pInstance = new ScanCheatLayer();
        if(MjClient.gameType == MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
        {
            //这玩法要求，这个作弊在加倍的层级之下----->梁玉嫣
            MjClient.playui._downNode.addChild(ScanCheatLayer.pInstance,100);
        }
        else
        {
            MjClient.Scene.addChild(ScanCheatLayer.pInstance);
        }

    }

    ScanCheatLayer.pInstance.setGPSBtn(gpsBtn);

    return ScanCheatLayer.pInstance;
};