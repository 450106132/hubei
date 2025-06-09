(function(){


function startLogin(mail,code,isLocalGuest)
{
    MjClient.block();
    /*
     for test by sking
     */
     if ((cc.sys.OS_WINDOWS == cc.sys.os && !MjClient.remoteCfg.guestLogin) || TestConfig.isDebug)
     {
		mail = TestConfig.mail;
        code = TestConfig.code;
         mail = 3605653;
         code = "RPGwJc8xpvLS";
     }

    // if (mail == null || mail == undefined){
    //     var num = Math.floor(Math.random() * 100);
    //     mail = 1000001 + num;
    //     code = "ABCDEF";
    // }

    cc.log(" loginData code = " + code);
    cc.log(" loginData mail = " + mail);
    var loginData=code? {  mail: mail, code: code}:mail;
    if (!loginData)//新用户
    {
        loginData={};
    }


    loginData.appVersion=MjClient.native.GetVersionName();
    loginData.resVersion=MjClient.resVersion;
    loginData.app={appid:AppEnv[MjClient.getAppType()],os:cc.sys.os};
    loginData.remoteIP=MjClient.remoteIP;
    loginData.area={longitude:MjClient.native.GetLongitudePos(), latitude:MjClient.native.GetLatitudePos()};
    loginData.umid=MjClient.native.umengGetUMID();
    loginData.deviceModel=MjClient.native.getDeviceModel();

    if (isLocalGuest === false)
    {
        doLogin(loginData, isLocalGuest);
    }
    else
    {
        MjClient.ConnectServer(loginData.openid||loginData.mail, function()
        {
            doLogin(loginData, isLocalGuest);
        });
    }
}

function doLogin(loginData, isLocalGuest) {
    MjClient.gamenet.request("pkcon.handler.doLogin", loginData,
        function (rtn) {
            cc.log("login  ------------sking " + rtn.result);
            var unblock = true;
            if (cc.isUndefined(rtn.result)) {
                if (isLocalGuest) {
                    unblock = false;
                    getGuestData();
                }
                else {
                    MjClient.showMsg("登录失败");
                    postEvent("autoLoginFailed");
                }
            }
            else if (rtn.result == 0) {
                try {
                    if (rtn.pinfo.uid) loginData.mail = rtn.pinfo.uid;
                    if (rtn.pinfo.loginCode) loginData.code = rtn.pinfo.loginCode;
                    util.localStorageEncrypt.setStringItem("loginData", JSON.stringify(loginData));
                }
                catch (e) { }
                MjClient.getSystemConfig(function () {
                    postEvent("loginOK", rtn);
                }, function () {
                    postEvent("autoLoginFailed");
                });
            }
            else if (rtn.result == 1001) {
                if (rtn.message) {
                    MjClient.showMsg(rtn.message);
                }
                else {
                    MjClient.showMsg("账号被封，请联系客服");
                }
                postEvent("autoLoginFailed");
            }
            else if (rtn.result == 1002) {
                MjClient.Scene.addChild(new mobilePhoneRegisterLayer(rtn.data));
            } else if (rtn.result == 1003) {
                MjClient.showToast(rtn.message);
                MjClient.Scene.addChild(new mobilePhone_selectRole(rtn.data, LoginByPhoneChildren));
            }

            if (unblock) MjClient.unblock();

        }
    );
}
function startMobileLogin(mail, id,isLocalGuest)
{
    MjClient.block();
    /*
     for test by sking
     */
    // if ((cc.sys.OS_WINDOWS == cc.sys.os && !MjClient.remoteCfg.guestLogin) || TestConfig.isDebug)
    // {
    //     mail = TestConfig.mail;
    //     code = TestConfig.code;
    //     //mail = 1509844;
    //     //code = "7XtIEe9FkwKM";
    // }


    cc.log(" loginData id = " + id);
    cc.log(" loginData mail = " + mail);
    var loginData=mail;
    if (!loginData)//新用户
    {
        loginData={};
    }

    loginData.id = id;
    loginData.appVersion=MjClient.native.GetVersionName();
    loginData.resVersion=MjClient.resVersion;
    loginData.app={appid:AppEnv[MjClient.getAppType()],os:cc.sys.os};
    loginData.remoteIP=MjClient.remoteIP;
    loginData.area={longitude:MjClient.native.GetLongitudePos(), latitude:MjClient.native.GetLatitudePos()};
    loginData.umid=MjClient.native.umengGetUMID();
    loginData.deviceModel=MjClient.native.getDeviceModel();
    cc.log("==== lms ----loginData ",JSON.stringify(loginData));

    if (isLocalGuest === false)
    {
        mobileLogin(loginData, isLocalGuest);
    }
    else
    {
        MjClient.ConnectServer(loginData.openid||loginData.mail, function()
        {
            mobileLogin(loginData, isLocalGuest);
        });
    }
}
function mobileLogin(loginData, isLocalGuest) {
    MjClient.gamenet.request("pkcon.handler.mobileLogin", loginData,
        function (rtn) {
            cc.log(" ===mobileLogin -----  " + rtn.result);
            var unblock = true;
            if (cc.isUndefined(rtn.result)) {
                if (isLocalGuest) {
                    unblock = false;
                    getGuestData();
                }
                else {
                    MjClient.showMsg("登录失败");
                    postEvent("autoLoginFailed");
                }
            }
            else if (rtn.result == 0) {
                try {
                    if (rtn.pinfo.uid) loginData.mail = rtn.pinfo.uid;
                    if (rtn.pinfo.loginCode) loginData.code = rtn.pinfo.loginCode;
                    util.localStorageEncrypt.setStringItem("loginData", JSON.stringify(loginData));
                }
                catch (e) { }
                MjClient.getSystemConfig(function () {
                    postEvent("loginOK", rtn);
                }, function () {
                    postEvent("autoLoginFailed");
                });
            }
            else if (rtn.result == 1001) {
                if (rtn.message) {
                    MjClient.showMsg(rtn.message);
                }
                else {
                    MjClient.showMsg("账号被封，请联系客服");
                }
                postEvent("autoLoginFailed");
            }
            else if (rtn.result == 1002) {
                MjClient.Scene.addChild(new mobilePhoneRegisterLayer(rtn.data));
            } else if (rtn.result == 1003) {
                MjClient.showToast(rtn.message);
                MjClient.Scene.addChild(new mobilePhone_selectRole(rtn.data, LoginByPhoneChildren));
            }

            if (unblock) MjClient.unblock();

        }
    );
}

function getGuestData()
{
      MjClient.gamenet.request("pkcon.handler.reqGuestID", { app:"zjh"},function(rtn){
          if(rtn.result==0)
          {
              util.localStorageEncrypt.setStringItem("guestData", JSON.stringify(rtn));
              startLogin(rtn.mail,rtn.code,false);//getGuest
          }
      });
}
function LoginByGuestAccount()
{
     var guest=util.localStorageEncrypt.getStringItem('guestData');

     if(guest.length>0)
     {
         guest=JSON.parse(guest);
         if(guest.mail&&guest.code)
         {
             startLogin(guest.mail,guest.code,true);//guest login
         }
         else
         {
             startLogin(null,null,true);//guest login
         }
     }
    else
     {
         startLogin(null,null,true);//guest login
     }
}
function LoginByWeChatAccount(wxInfo)
{
    wxInfo.lType="wx";
    wxInfo.sign = util.md5.hex_md5(wxInfo.unionid + "JTCF@8888");
    startLogin(wxInfo);
}

function LoginByPhone(mobileNum, verifyCode)
{
    var phoneCodeInfo = {mobileNum:mobileNum, verifyCode:verifyCode};
    startLogin(phoneCodeInfo);
}

function LoginByPhone_0(info){
    var loginInfo = {};
    loginInfo.mobileNum = info.mobileNum;
    loginInfo.verifyCode = info.verifyCode;
    loginInfo.nickname = info.nickname;
    loginInfo.sex = info.sex;
    loginInfo.headimgurl = '';
    loginInfo.isRegister = info.isRegister;
    startLogin(loginInfo);
}

function LoginByPhoneChildren(mobileNum, verifyCode, id)
{
    var phoneCodeInfo = {mobileNum:mobileNum, verifyCode:verifyCode};
    startMobileLogin(phoneCodeInfo, id);
}

function LoginByXianLiaoAccount(xlInfo)
{
    var loginInfo = {};
    loginInfo.lType="xl";
    loginInfo.xianliaoid = xlInfo.openId;
    loginInfo.nickname = xlInfo.nickName;
    loginInfo.sex = xlInfo.gender;
    loginInfo.headimgurl = xlInfo.smallAvatar;
    startLogin(loginInfo);
}

function LoginByDuoLiaoAccount(dlInfo)
{
    var loginInfo = {};
    loginInfo.lType="dl";
    loginInfo.duoliaoid = dlInfo.openId;
    loginInfo.nickname = dlInfo.nickName;
    loginInfo.sex = dlInfo.gender;
    loginInfo.headimgurl = dlInfo.originalAvatar;
    loginInfo.code = dlInfo.code;   // 多聊给的，暂时用不上
    startLogin(loginInfo);
}

function LoginByMoWangAccount(mwInfo)
{
    var loginInfo = {};
    loginInfo.lType="mw";
    loginInfo.mowangid = mwInfo.open_id;
    loginInfo.nickname = mwInfo.nick_name;
    loginInfo.sex = mwInfo.gender;
    loginInfo.headimgurl = mwInfo.user_icon;
    startLogin(loginInfo);
}


MjClient.autoLogin=function()
{
    cc.log("MjClient.autoLogin");
    if(!util.localStorageEncrypt.getBoolItem("_agree_user_protocol", false)) {
        MjClient.showToast("请先阅读并同意用户协议");
        setTimeout(function () {
            postEvent("autoLoginFailed");
        });
        return;
    }

    var WX_USER_LOGIN=util.localStorageEncrypt.getStringItem("WX_USER_LOGIN");
    var XL_USER_LOGIN=util.localStorageEncrypt.getStringItem("XL_USER_LOGIN");
    var DL_USER_LOGIN=util.localStorageEncrypt.getStringItem("DL_USER_LOGIN");
    var MW_USER_LOGIN=util.localStorageEncrypt.getStringItem("MW_USER_LOGIN");

    var loginData=util.localStorageEncrypt.getStringItem("loginData");
    if(WX_USER_LOGIN.length>0) {
        WX_USER_LOGIN=JSON.parse(WX_USER_LOGIN);
        LoginByWeChatAccount(WX_USER_LOGIN);
    }
    else if (XL_USER_LOGIN.length>0) {
        XL_USER_LOGIN=JSON.parse(XL_USER_LOGIN);
        LoginByXianLiaoAccount(XL_USER_LOGIN);
    }
    else if (DL_USER_LOGIN.length>0) {
        DL_USER_LOGIN=JSON.parse(DL_USER_LOGIN);
        LoginByDuoLiaoAccount(DL_USER_LOGIN);
    }
    else if (MW_USER_LOGIN.length>0) {
        MW_USER_LOGIN=JSON.parse(MW_USER_LOGIN);
        LoginByMoWangAccount(MW_USER_LOGIN);
    }
    else if (loginData.length>0) {
        loginData=JSON.parse(loginData);
        startLogin(loginData.mail,loginData.code);
    }
    else {
        setTimeout(function () {
            postEvent("autoLoginFailed");
        });
    }
};


var acceptNode;

function ResetLoginPanel(back){
    if(MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP && MjClient.getAppType() != MjClient.APP_TYPE.BDYZPHZ){
        return;
    }
    //竹叶动作
    var zuyeArr = [];
    zuyeArr.push(back.getChildByName("left_zuye"));
    zuyeArr.push(back.getChildByName("right_zuye"));
    zuyeArr.push(back.getChildByName("down_zuye"));
    for(var i = 0;i < zuyeArr.length;i++){
        var zuye = zuyeArr[i];
        var pos = zuye.getPosition();
        var zuyeMoveAction2 = cc.MoveTo.create(1,cc.p(pos.x, pos.y + 6));
        var zuyeMoveAction3 = cc.MoveTo.create(1,cc.p(pos.x, pos.y - 6));
        var zuyeSeqAction = cc.sequence(zuyeMoveAction2, zuyeMoveAction3);
        zuyeArr[i].runAction(cc.repeatForever(zuyeSeqAction));
    }
    //top牌动作
    var topArr = [];
    topArr.push(back.getChildByName("top_2"));
    topArr.push(back.getChildByName("top_7"));
    topArr.push(back.getChildByName("top_10"));
    for(var i = 0;i < topArr.length;i++){
        var topDelayAction1 = cc.delayTime(i * 0.2);
        var topMoveAction = cc.MoveBy.create(0.2,cc.p(0,1.5));
        var topScaleAction = cc.scaleBy(0.2,1.21);
        var topSpawn1 = cc.spawn(topMoveAction,topScaleAction);
        var topSpawn2 = cc.spawn(topMoveAction.reverse(),topScaleAction.reverse());
        var topDelayAction2 = cc.delayTime(4 - i * 0.2);
        var topSeqAction = cc.sequence(topDelayAction1,topSpawn1, topSpawn2, topDelayAction2);
        topArr[i].runAction(cc.repeatForever(topSeqAction));
    }
    //骰子动作
    var touzi = back.getChildByName("touzi");
    var touziMoveAction = cc.MoveBy.create(0.5,cc.p(4,4));
    var touziSeqAction = cc.sequence(touziMoveAction, touziMoveAction.reverse());
    touzi.runAction(cc.repeatForever(touziSeqAction));
    //底部牌的滑动动作
    var downLeft = back.getChildByName("move_10");
    var downLeftMoveAction = cc.MoveBy.create(0.1,cc.p(-280,-120));
    var downLeftCallFunc = cc.CallFunc.create(function(){
        downLeft.loadTexture("login/stop_10.png");
        var pos = downLeft.getPosition();
        var repeatAction = cc.RepeatForever.create(cc.sequence(
            cc.MoveTo.create(0.6,cc.p(pos.x, pos.y + 3)),
            cc.MoveTo.create(0.6,cc.p(pos.x, pos.y - 3))
        ));
        downLeft.runAction(repeatAction);
    });
    downLeft.runAction(cc.sequence(downLeftMoveAction,downLeftCallFunc));

    var downRight = back.getChildByName("move_7");
    var downRightMoveAction = cc.MoveBy.create(0.1,cc.p(220,-110));
    var downRightCallFunc = cc.CallFunc.create(function(){
        downRight.loadTexture("login/stop_7.png");
        var pos = downRight.getPosition();
        var repeatAction = cc.RepeatForever.create(cc.sequence(
            cc.MoveTo.create(0.6,cc.p(pos.x, pos.y + 3)),
            cc.MoveTo.create(0.6,cc.p(pos.x, pos.y - 3))
        ));
        downRight.runAction(repeatAction);

    });
    downRight.runAction(cc.sequence(downRightMoveAction,downRightCallFunc));

    //闪光动作
    var logoNode = back.getChildByName("load");
    var weichatNode = back.getParent().getChildByName("wechatLogin");
    var createChipNode = function(pos){
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("game_picture/logo_da.png");
        var stenSize = sten.getContentSize();
        clipper.setInverted(false);
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        logoNode.addChild(clipper);
        var sprite = new cc.Sprite("login/guang.png");
        sprite.setBlendFunc(cc.ONE,cc.ONE);
        sprite.setOpacity(255);
        sprite.setScale(1.5);
        sprite.setPosition(pos);
        clipper.addChild(sprite, 1);

        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(1.5, cc.p(logoNode.width - pos.x, sten.height / 2)),
            cc.CallFunc.create(function(){
                sprite.visible = false;
            }),
            cc.delayTime(1),
            cc.CallFunc.create(function(){
                sprite.visible = true;
            }),
            cc.MoveTo.create(1.5, cc.p(pos.x, sten.height / 2)),
            cc.CallFunc.create(function(){
                sprite.visible = false;
            }),
            cc.delayTime(1)));
        sprite.runAction(repeatAction);
    };
    createChipNode(cc.p(0, logoNode.height / 2));
    createChipNode(cc.p(logoNode.width, logoNode.height / 2));
}


//清除缓存，重新授权登录
function clearLoginDataCache()
{
    var currentTime = new Date().getTime();
    var lastWXUserLoginTime = util.localStorageEncrypt.getNumberItem("WX_USER_LOGIN_TIME", currentTime);
    if (currentTime == lastWXUserLoginTime && !MjClient.remoteCfg.guestLogin && cc.sys.OS_WINDOWS != cc.sys.os)
    {
        util.localStorageEncrypt.setNumberItem("WX_USER_LOGIN_TIME", currentTime);
    }
    return;//屏蔽清楚登录缓存信息。
    var time = parseInt((currentTime - lastWXUserLoginTime)/1000);
    if (time > 30*86400 /*&& !util.localStorageEncrypt.getBoolItem("isAgent", false)*/)//大于30天
    {
        util.localStorageEncrypt.removeItem("WX_USER_LOGIN");
        util.localStorageEncrypt.removeItem("XL_USER_LOGIN");
        util.localStorageEncrypt.removeItem("DL_USER_LOGIN");
        util.localStorageEncrypt.removeItem("MW_USER_LOGIN");
        util.localStorageEncrypt.removeItem("loginData");
    }
}


LoginView = cc.Layer.extend({
    ctor:function () {
        this._super();
        if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
            var loginui = ccs.load("Login_3.0.json");
        else
            var loginui = ccs.load(res.Login_json);
        //BindUiAndLogic(loginui.node,this.jsBind);
        this.addChild(loginui.node);
        MjClient.loginui=this;


        // loginui.node.getChildByName("Panel_ani").getChildByName("load").visible = true;//wj
        loginui.node.getChildByName("warn_text").visible = false;//wj 登录界面文本
        // loginui.node.getChildByName("Panel_ani").visible = false;//wj
        /*
            changed by sking
         */
        var _back = loginui.node.getChildByName("back");
        setWgtLayout(_back,[1,1],[0.5,0.5],[0,0], true);

        //江苏登录界面动画
        if(MjClient.getAppType() === MjClient.APP_TYPE.QXJSMJ) {
            // 烟花粒子特效
            var yanHuaNode = _back.getChildByName("node_yanhua");
            var particle = new cc.ParticleSystem("Particle/yanhuaya.plist");
            particle.setPosition(yanHuaNode.getContentSize().width/2, yanHuaNode.getContentSize().height/2);
            particle.setTotalParticles(2);
            yanHuaNode.addChild(particle);

            _back.getChildByName("load").setZOrder(10);
            _back.getChildByName("agree").setZOrder(10);

            this._title = _back.getChildByName("load");
            this._title.setScale(0);
            this._title.setOpacity(0);
            setWgtLayout(this._title, [1, 1], [0.12, 0.9], [0, 0], false, true);

            var logo = _back.getChildByName("load");
            var clipper = new cc.ClippingNode();
            var sten = cc.Sprite.create("login/logo.png");
            var stenSize = sten.getContentSize();
            sten.setPosition(stenSize.width / 2, stenSize.height / 2);
            clipper.setContentSize(stenSize);
            clipper.setStencil(sten);
            clipper.setAlphaThreshold(0.5);
            logo.addChild(clipper);
            var sprite1 = new cc.Sprite("login/loginAni/saog3.png");
            sprite1.setBlendFunc(cc.ONE,cc.ONE);
            sprite1.setOpacity(255);
            sprite1.setScale(1.5);
            clipper.addChild(sprite1, 1);
            var repeatAction = cc.repeatForever(cc.sequence(
                cc.moveTo(0.0, cc.p(-sten.width / 2, sten.height / 2)),
                cc.moveTo(3, cc.p(sten.width + sten.width, sten.height / 2)),
                cc.delayTime(0.5)));
            sprite1.runAction(repeatAction); //进行向右移动的重复动作
            var sprite2 = new cc.Sprite("login/loginAni/saog3.png");
            sprite2.setBlendFunc(cc.ONE,cc.ONE);
            sprite2.setOpacity(255);
            sprite2.setScale(1.5);
            clipper.addChild(sprite2, 1);
            var repeatAction2 = cc.repeatForever(cc.sequence(
                cc.moveTo(0.0, cc.p(sten.width + sten.width / 2, sten.height / 2)),
                cc.moveTo(3, cc.p(-sten.width, sten.height / 2)),
                cc.delayTime(0.5)));
            sprite2.runAction(repeatAction2); //进行向右移动的重复动作
        }
        else if(isJinZhongAPPType()) {
            // 粒子
            if (MjClient.getAppType() === MjClient.APP_TYPE.DQSHANXIMJ) {
                var star111 = new cc.ParticleSystem("Particle/xeuk.plist");
                star111.setPosition(_back.getContentSize().width * 0.5, _back.getContentSize().height);
                star111.setScale(1.2);
                _back.addChild(star111);

                //扫光
                var logo = _back.getChildByName("logo");
                var clipper = new cc.ClippingNode();
                var sten = cc.Sprite.create("login/logo.png");
                var stenSize = sten.getContentSize();
                sten.setPosition(stenSize.width / 2, stenSize.height / 2);
                clipper.setContentSize(stenSize);
                clipper.setStencil(sten);
                clipper.setAlphaThreshold(0.5);
                logo.addChild(clipper);
                var sprite1 = new cc.Sprite("login/loginAni/saog3.png");
                sprite1.setBlendFunc(cc.ONE,cc.ONE);
                sprite1.setOpacity(255);
                sprite1.setScale(1.5);
                clipper.addChild(sprite1, 1);
                var repeatAction = cc.repeatForever(cc.sequence(
                    cc.moveTo(0.0, cc.p(-sten.width / 2, sten.height / 2)),
                    cc.moveTo(3, cc.p(sten.width + sten.width, sten.height / 2)),
                    cc.delayTime(0.5)));
                sprite1.runAction(repeatAction); //进行向右移动的重复动作
                var sprite2 = new cc.Sprite("login/loginAni/saog3.png");
                sprite2.setBlendFunc(cc.ONE,cc.ONE);
                sprite2.setOpacity(255);
                sprite2.setScale(1.5);
                clipper.addChild(sprite2, 1);
                var repeatAction2 = cc.repeatForever(cc.sequence(
                    cc.moveTo(0.0, cc.p(sten.width + sten.width / 2, sten.height / 2)),
                    cc.moveTo(3, cc.p(-sten.width, sten.height / 2)),
                    cc.delayTime(0.5)));
                sprite2.runAction(repeatAction2); //进行向右移动的重复动作
            }
            else {
                var star111 = new cc.ParticleSystem("Particle/star.plist");
                star111.setPosition(_back.getContentSize().width * 0.6, _back.getContentSize().height*0.8);
                _back.addChild(star111);

                var starParticle1 = new cc.ParticleSystem("Particle/particle_texture.plist");
                starParticle1.setPosition(-20, _back.getContentSize().height+10);
                starParticle1.setScale(2);
                starParticle1.setTotalParticles(8);
                _back.addChild(starParticle1,1);
            }


            _back.getChildByName("Panel_1").setZOrder(10);
            _back.getChildByName("agree").setZOrder(10);

            this._title = _back.getChildByName("Panel_1");
            this._title.setScale(0);
            this._title.setOpacity(0);
            setWgtLayout(this._title, [1, 1], [0.14, 0.88], [0, 0], false, true);
        }
        else if(MjClient.getAppType() === MjClient.APP_TYPE.YLHUNANMJ){
            this._back = _back;
            var logo = _back.getChildByName("logo");
            var bgMask = _back.getChildByName("bg_mask");
            setWgtLayout(logo, [0.5, 0.5], [0.5, 0.62], [0, 0], false, true);
            setWgtLayout(bgMask, [1, 1], [0.5, 0], [0, 0], false, true);
            if(isIPhoneX()) {
                setWgtLayout(bgMask, [1, 1], [0.5, -0.05], [0, 0], false, true);
                setWgtLayout(logo, [0.5, 0.5], [0.5, 0.65], [0, 0], false, true);
            }
        }
        else if(MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || 
            MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP || 
            MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ) {
            this._aniNode = loginui.node.getChildByName("Panel_ani");
            // var qixiIcon = loginui.node.getChildByName("qixiIcon");
            setWgtLayout(this._aniNode, [0.65, 0.65], [0.5, 0.56], [0, 0]);
            if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
                // setWgtLayout(qixiIcon, [qixiIcon.width/1280, qixiIcon.height/720], [0.837, 0.953], [0, 0]);

                var aniNode = createSpine("login_3.0/long.json", "login_3.0/long.atlas");
                aniNode.setAnimation(0, 'animation', true);
                aniNode.setPosition(0, 0);
                _back.getChildByName("aniNode").addChild(aniNode);
            // }
            // else {
            //     setWgtLayout(qixiIcon, [0.21, 0.129], [0, 1], [0.05, -0.22]);
            }
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ) {
            //竹叶飘
            // var starParticle1 =  new cc.ParticleSystem("Particle/particle_texture.plist");
            // starParticle1.setPosition(_back.getContentSize().width/2, _back.getContentSize().height+20);
            // starParticle1.setScale(2);
            // starParticle1.setTotalParticles(8);
            // _back.addChild(starParticle1);

            // 烟花粒子特效
            var yanHuaNode = _back.getChildByName("node_yanhua");
            var particle = new cc.ParticleSystem("Particle/yanhuaya.plist");
            particle.setPosition(yanHuaNode.getContentSize().width/2, yanHuaNode.getContentSize().height/2);
            particle.setTotalParticles(2);
            yanHuaNode.addChild(particle);

            _back.getChildByName("load").setZOrder(10);
            _back.getChildByName("agree").setZOrder(10);

            var logo = _back.getChildByName("load");
            setWgtLayout(logo, [0.25, 0.25], [0.14, 0.90], [0, 0], false, true);

            //扫光
            var logo = _back.getChildByName("load");
            var clipper = new cc.ClippingNode();
            var sten = cc.Sprite.create("login/loginAni/logo_da.png");
            var stenSize = sten.getContentSize();
            sten.setPosition(stenSize.width / 2, stenSize.height / 2);
            clipper.setContentSize(stenSize);
            clipper.setStencil(sten);
            clipper.setAlphaThreshold(0.5);
            logo.addChild(clipper);
            var sprite1 = new cc.Sprite("login/loginAni/saog3.png");
            sprite1.setBlendFunc(cc.ONE,cc.ONE);
            sprite1.setOpacity(255);
            sprite1.setScale(1.5);
            clipper.addChild(sprite1, 1);
            var repeatAction = cc.repeatForever(cc.sequence(
                cc.moveTo(0.0, cc.p(-sten.width / 2, sten.height / 2)),
                cc.moveTo(3, cc.p(sten.width + sten.width, sten.height / 2)),
                cc.delayTime(0.5)));
            sprite1.runAction(repeatAction); //进行向右移动的重复动作
            var sprite2 = new cc.Sprite("login/loginAni/saog3.png");
            sprite2.setBlendFunc(cc.ONE,cc.ONE);
            sprite2.setOpacity(255);
            sprite2.setScale(1.5);
            clipper.addChild(sprite2, 1);
            var repeatAction2 = cc.repeatForever(cc.sequence(
                cc.moveTo(0.0, cc.p(sten.width + sten.width / 2, sten.height / 2)),
                cc.moveTo(3, cc.p(-sten.width, sten.height / 2)),
                cc.delayTime(0.5)));
            sprite2.runAction(repeatAction2); //进行向右移动的重复动作
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
            var load = loginui.node.getChildByName("load");
            setWgtLayout(load, [0.3, 0.3], [0, 1], [0.05, -0.1]);

            //美女动画
            // var _roleNode = _back.getChildByName("roleNode");
            // setWgtLayout(_roleNode, [0.3, 0.3], [0.485, 0.5], [0, 0], false, true);
            // var roleAni = createSpine("spine/beauty/renwunv.json", "spine/beauty/renwunv.atlas");
            // roleAni.setAnimation(0, 'animation', true);
            // roleAni.setPosition(68,-722);
            // roleAni.setScale(0.63);
            // _roleNode.addChild(roleAni,100);
            // _roleNode.setTouchEnabled(false);
            // if(isIPhoneX())
            // {
            //     roleAni.setPosition(-300  + 40,-210 - 20);
            //     roleAni.setScale(0.95);
            // }

            //lizi
            // var _xingguang = _back.getChildByName("Panel_lizi").getChildByName("Panel_xingguang");
            // var waterParticle = new cc.ParticleSystem("Particle/guang.plist");
            // setWgtLayout(_xingguang, [3.2, 2.2], [0.48, 1.6], [0, 0], false, true);
            // waterParticle.setPosition(0, 0);
            // waterParticle.setScale(0.25);
            // _xingguang.addChild(waterParticle);


            // 烟花粒子特效
            var yanHuaNode = _back.getChildByName("node_yanhua");
            var particle = new cc.ParticleSystem("Particle/yanhuaya.plist");
            particle.setPosition(yanHuaNode.getContentSize().width/2, yanHuaNode.getContentSize().height/2);
            particle.setTotalParticles(2);
            yanHuaNode.addChild(particle);

        }
        else if (MjClient.getAppType() === MjClient.APP_TYPE.QXHAMJ) {
            //竹叶飘
            // var starParticle1 =  new cc.ParticleSystem("Particle/particle_texture.plist");
            // starParticle1.setPosition(_back.getContentSize().width/2, _back.getContentSize().height+20);
            // starParticle1.setScale(2);
            // starParticle1.setTotalParticles(8);
            // _back.addChild(starParticle1);
            // 烟花粒子特效
            var yanHuaNode = _back.getChildByName("node_yanhua");
            var particle = new cc.ParticleSystem("Particle/yanhuaya.plist");
            particle.setPosition(yanHuaNode.getContentSize().width/2, yanHuaNode.getContentSize().height/2);
            particle.setTotalParticles(2);
            yanHuaNode.addChild(particle);

            _back.getChildByName("load").setZOrder(10);
            _back.getChildByName("agree").setZOrder(10);

            // this._title = _back.getChildByName("load");
            // this._title.setScale(0);
            // this._title.setOpacity(0);

            //扫光
            var logo = _back.getChildByName("load");
            setWgtLayout(logo, [0.23, 0.23], [0.12, 0.89], [0, 0], false, true);
            var clipper = new cc.ClippingNode();
            var sten = cc.Sprite.create("login/loginAni/logo_da.png");
            var stenSize = sten.getContentSize();
            sten.setPosition(stenSize.width / 2, stenSize.height / 2);
            clipper.setContentSize(stenSize);
            clipper.setStencil(sten);
            clipper.setAlphaThreshold(0.5);
            logo.addChild(clipper);
            var sprite1 = new cc.Sprite("login/loginAni/saog3.png");
            sprite1.setBlendFunc(cc.ONE,cc.ONE);
            sprite1.setOpacity(255);
            sprite1.setScale(1.5);
            clipper.addChild(sprite1, 1);
            var repeatAction = cc.repeatForever(cc.sequence(
                cc.moveTo(0.0, cc.p(-sten.width / 2, sten.height / 2)),
                cc.moveTo(3, cc.p(sten.width + sten.width, sten.height / 2)),
                cc.delayTime(0.5)));
            sprite1.runAction(repeatAction); //进行向右移动的重复动作
            var sprite2 = new cc.Sprite("login/loginAni/saog3.png");
            sprite2.setBlendFunc(cc.ONE,cc.ONE);
            sprite2.setOpacity(255);
            sprite2.setScale(1.5);
            clipper.addChild(sprite2, 1);
            var repeatAction2 = cc.repeatForever(cc.sequence(
                cc.moveTo(0.0, cc.p(sten.width + sten.width / 2, sten.height / 2)),
                cc.moveTo(3, cc.p(-sten.width, sten.height / 2)),
                cc.delayTime(0.5)));
            sprite2.runAction(repeatAction2); //进行向右移动的重复动作
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP) {

            // var _girlPanel = _back.getChildByName("panel_girl");
            //小姐姐
            // setWgtLayout(_girlPanel, [0.60, 0.60], [0.65, -0.6], [0, 0], false, true);
            // var _bgBone = createSpine("spine/home/girl/renwunv.json", "spine/home/girl/renwunv.atlas");
            // _bgBone.setAnimation(0, 'animation', true);
            // _girlPanel.addChild(_bgBone, 1);
            //
            // var _guangPanel = _back.getChildByName("panel_lizi").getChildByName("panel_guang");
            // var Particle = new cc.ParticleSystem("Particle/guang.plist");
            // setWgtLayout(_guangPanel, [3.2, 2.2], [0.56, 1.8], [0, 0], false, true);
            // Particle.setPosition(0, 0);
            // Particle.setScale(0.25);
            // _guangPanel.addChild(Particle);

            //落叶
            // var _leavesPanel = _back.getChildByName("Panel_leaf");
            // setWgtLayout(_leavesPanel, [1, 1], [1, 1.2], [0, 0], true);
            // var leavesParticle =  new cc.ParticleSystem("Particle/shuye.plist");
            // leavesParticle.setPosition(_back.getContentSize().width, _back.getContentSize().height+20);
            // leavesParticle.setScale(2);
            // leavesParticle.setTotalParticles(8);
            // _leavesPanel.addChild(leavesParticle);

            // 烟花粒子特效
            var yanHuaNode = _back.getChildByName("node_yanhua");
            var particle = new cc.ParticleSystem("Particle/yanhuaya.plist");
            particle.setPosition(yanHuaNode.getContentSize().width/2, yanHuaNode.getContentSize().height/2);
            particle.setTotalParticles(2);
            yanHuaNode.addChild(particle);


            // logo扫光
            var logo = _back.getChildByName("load");
            setWgtLayout(logo, [0.23, 0.23], [0.12, 0.89], [0, 0], false, true);
            var clipper = new cc.ClippingNode();
            var sten = cc.Sprite.create("game_picture/logo_da.png");
            var stenSize = sten.getContentSize();
            sten.setPosition(stenSize.width/2, stenSize.height/2);
            clipper.setContentSize(stenSize);
            clipper.setStencil(sten);
            clipper.setAlphaThreshold(0.03);
            logo.addChild(clipper);
            var scanningLight = new cc.Sprite("game_picture/effect/saoguang1.png");
            scanningLight.setBlendFunc(cc.ONE,cc.ONE);
            scanningLight.setOpacity(50);
            scanningLight.setScale(1.5);
            clipper.addChild(scanningLight, 1004);
            var repeatAction = cc.repeatForever(cc.sequence(
                cc.moveTo(0.0, cc.p(-sten.width / 2, sten.height / 2)),
                cc.moveTo(3, cc.p(sten.width + sten.width, sten.height / 2)),
                cc.delayTime(0.5)));
            scanningLight.runAction(repeatAction); //进行向右移动的重复动作
        } 
        else if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG){
            var logoImg = loginui.node.getChildByName("img_title");
            setWgtLayout(logoImg, [0.65, 0.65], [0.5, 0.65], [0, 0]);         
        }

        var _h = isIPhoneX() ? 0.14 : 0.13;
        var _agree= _back.getChildByName("agree");
        this._agree = _agree;
        acceptNode = _agree;
        acceptNode.setVisible(false);
        _agree.setSelected(util.localStorageEncrypt.getBoolItem("_agree_user_protocol", false));
        if(MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP || 
            MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
            MjClient.getAppType() === MjClient.APP_TYPE.YLHUNANMJ ||
            MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ){
            if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
                setWgtLayout(_agree,[_agree.width/1560, _agree.height/720],[0,0.13],[0,0],true,true);
            else
                setWgtLayout(_agree,[0.03,0.03],[0,0.15],[0,0],true,true);
        } else if(isJinZhongAPPType()){
            setWgtLayout(_agree,[0.03,0.03],[0,_h],[0,0],true,true);
        } else if(MjClient.getAppType() === MjClient.APP_TYPE.AYGUIZHOUMJ){
            // setWgtLayout(_agree,[0.04,0.04],[0,_h],[0,0],true,true);
        } else if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG){
            var _h = isIPhoneX() ? 0.18 : 0.13;
            setWgtLayout(_agree,[0.04,0.04],[0,_h],[0,0],true,true);
        }
        else {
            setWgtLayout(_agree,[0.05,0.05],[0,_h],[0,0],true,true);
        }

        var _legal = _agree.getChildByName("legal");
        var _privacy = _agree.getChildByName("privacy");
        this._legal = _legal;
        this._privacy = _privacy;

        var _logo = _back.getChildByName("load");

        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP) 
        {
            _logo.setAnchorPoint(0, 1);
            setWgtLayout(_agree,[0.03,0.03],[0,0.12],[0,0],true,true);
            setWgtLayout(_logo,[0.12,0.12],[0.03,0.97],[0,0],true,true);
        }
        if (MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP)
        {
            setWgtLayout(_agree,[0.03,0.03],[0,0.17],[0,0],true,true);
        }
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
            setWgtLayout(_agree,[0.03,0.03],[0,0.17],[0,0],true,true);           
        }
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
            setWgtLayout(_agree,[0.03,0.03],[0,0.14],[0,0],true,true);        
        }

        if (_privacy)
            _agree.x = (_back.width - _agree.scaleX * (_privacy.x + _privacy.scaleX * _privacy.width * (1 - _privacy.getAnchorPoint().x) - _agree.width))/2;
        else if (_legal)
            _agree.x = (_back.width - _agree.scaleX * (_legal.x + _legal.scaleX * _legal.width * (1 - _legal.getAnchorPoint().x) - _agree.width))/2;
        if(_legal){
            _legal.addTouchEventListener(function(sender,Type){
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        var url = "www.baidu.com";
                        if (MjClient.updateCfg)
                        {
                            url = MjClient.updateCfg.userProtocol;
                        }
                        MjClient.openWeb({url:url,help:false});
                        break;
                    default :
                        break;
                }
            },this);
        }
        

        if (_privacy) {
            _privacy.addTouchEventListener(function(sender, Type) {
                if (Type == ccui.Widget.TOUCH_ENDED) {
                    var url = "www.baidu.com";
                    if (MjClient.updateCfg) {
                        url = MjClient.updateCfg.privacyProtocol;
                    }
                    MjClient.openWeb({
                        url: url,
                        help: false
                    });
                }
            }, this);
        }

        var _warnText = loginui.node.getChildByName("warn_text");
        setWgtLayout(_warnText,[_warnText.width/1280, 0],[0.5, 0.002],[0, 0.5], true);
        if(MjClient.getAppType() === MjClient.APP_TYPE.QXJSMJ){
            setWgtLayout(_warnText,[_warnText.width/1280,0],[0.5,0.05],[0,0], true);
        }else if(MjClient.getAppType() === MjClient.APP_TYPE.YLHUNANMJ){
            setWgtLayout(_warnText,[_warnText.width/(1280*1.05),0],[0.5,0.053],[0,0], true);
        }
        _warnText.ignoreContentAdaptWithSize(true);
        var bg_mask = _back.getChildByName("bg_mask");
        if (bg_mask && 
            MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && 
            MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ && 
            MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ && 
            MjClient.getAppType() !== MjClient.APP_TYPE.YLHUNANMJ) {
            bg_mask.y = 0;
            bg_mask.setScaleY((_agree.y + _agree.height * 0.75) / bg_mask.height);
        }
        var _warnText_0 = _warnText.getChildByName("warn_text_0");
        if (_warnText_0) _warnText_0.ignoreContentAdaptWithSize(true);
        var _warnText_1 = _warnText.getChildByName("warn_text_1");
        if (_warnText_1) _warnText_1.ignoreContentAdaptWithSize(true);


        var loginBtns = [];

        //手机号登陆
        var _btnPhone = loginui.node.getChildByName("phoneLogin");
        this._btnPhone = _btnPhone;
        if (_btnPhone)
        {
            _btnPhone.setVisible(false);
            if (MjClient.remoteCfg.phoneLogin)
                loginBtns.push(_btnPhone);
        }

        //weChat login  微信登录
        var _btnWeChat = loginui.node.getChildByName("wechatLogin");
        this._btnWeChat = _btnWeChat;
        if (_btnWeChat) {
            _btnWeChat.setVisible(false);
            loginBtns.push(_btnWeChat);
        }


        var _guestLogin = loginui.node.getChildByName("guestLogin");
        this._guestLogin = _guestLogin;
        if (_guestLogin)
        {
            _guestLogin.visible = false;
            // if (MjClient.remoteCfg.guestLogin)
            //     loginBtns.push(_guestLogin);
        }


        var _btnXianliao = loginui.node.getChildByName("xianliaoLogin");
        if (_btnXianliao)
        {
            _btnXianliao.setVisible(false);
        }

        var y = 0.35;
        switch (MjClient.getAppType())
        {
        case MjClient.APP_TYPE.QXHAIANMJ:
            y = 0.22;
            break;
        case MjClient.APP_TYPE.QXNTQP:
        case MjClient.APP_TYPE.QXJSMJ:
        case MjClient.APP_TYPE.QXXZMJ:
        case MjClient.APP_TYPE.QXHAMJ:
        case MjClient.APP_TYPE.AYGUIZHOUMJ:
            y = 0.24;
            break;
        case MjClient.APP_TYPE.QXYYQP:
        case MjClient.APP_TYPE.HUBEIMJ:
        case MjClient.APP_TYPE.QXSYDTZ:
            y = MjClient.isUseUIv3() ? 0.23 : 0.25;
            break;
        case MjClient.APP_TYPE.YLHUNANMJ:
        case MjClient.APP_TYPE.QXYZQP:
        case MjClient.APP_TYPE.BDYZPHZ:
        case MjClient.APP_TYPE.QXLYQP:
            y = 0.25;
            break;
        case MjClient.APP_TYPE.QXXXGHZ:
            y = 0.26;
            break;
        case MjClient.APP_TYPE.BDHYZP:
            y = 0.27;
            break;
        case MjClient.APP_TYPE.HUNANWANGWANG:
            y = 0.3;
            break;
        default:
            if (isJinZhongAPPType())
                y = 0.25;
        }

        var sumWidth = 0;
        for (var i = 0; i < loginBtns.length; i ++) {
            var btn = loginBtns[i];
            setWgtLayout(btn, [btn.width/1280, btn.height/720], [0.5, y], [0,0]);
            if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
                btn.setScale(btn.getScaleX() * 1.2);

            sumWidth += btn.width * btn.getScaleX();
        }

        var space = 0;
        if (loginBtns.length > 1) {
            if (MjClient.size.width * 0.8 > sumWidth) {
                space = (MjClient.size.width * 0.8 - sumWidth) / (loginBtns.length - 1);
                if (space > MjClient.size.width * 0.08)
                    space = MjClient.size.width * 0.08;
            }
            else {
                space = MjClient.size.width * 0.02;
            }
            sumWidth += space * (loginBtns.length - 1);
        }

        var x = (MjClient.size.width - sumWidth)/2;
        for (var i = 0; i < loginBtns.length; i ++) {
            var btn = loginBtns[i];
            btn.x = x + (btn.width * btn.getScaleX())/2;
            x += btn.width * btn.getScaleX() + space;

            btn.addTouchEventListener(function(sender,Type){
                if (Type != ccui.Widget.TOUCH_ENDED)
                    return;
                 
                function func() {      
                    util.localStorageEncrypt.setBoolItem("_agree_user_protocol", true);
                    // if (cc.sys.OS_WINDOWS == cc.sys.os) {
                    //     LoginByGuestAccount();
                    // } else {
                        // sender.onTouchBack();
                    // }
                    sender.onTouchBack();
                }

                if (acceptNode.isSelected()) {
                    func();
                } else {
                    MjClient.showToast("请先阅读并同意用户协议");
                    if (_privacy) {
                        MjClient.Scene.addChild(new LoginLegalDialog(function() {
                            func()
                        }));
                    }
                }
            },this);
        }

        if (_btnWeChat) {
            _btnWeChat.onTouchBack = function() {
                var WX_USER_LOGIN = util.localStorageEncrypt.getStringItem("WX_USER_LOGIN");
                if (WX_USER_LOGIN.length > 0) {
                    MjClient.autoLogin();
                } else if (MjClient.native) {
                    MjClient.native.wxLogin();
                } else {
                    LoginByGuestAccount();
                }
                // MjClient.showToast("功能暂未开放"); xdx
            }
        }

        if (_guestLogin) {
            _guestLogin.onTouchBack = function() {
                LoginByGuestAccount();
            }
        }

        if (_btnPhone) {
            var that = this;
            _btnPhone.onTouchBack = function() {
                MjClient.ConnectServer("", function() {
                    // that.addChild(new mobilePhoneLoginLayer(LoginByPhone));
                    that.addChild(new mobilePhoneLoginLayer_0(LoginByPhone_0));
                });
            }
        }



        //  一键修复按钮
        var _fixBtn = loginui.node.getChildByName("xiufuBtn");
        this._fixBtn = _fixBtn
        if(_fixBtn){
            if(MjClient.getAppType() === MjClient.APP_TYPE.AYGUIZHOUMJ){
                setWgtLayout(_fixBtn,[0.1,0.1],[0.085,0.9],[0,0]);
            }
            else if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
                setWgtLayout(_fixBtn,[_fixBtn.width/1280, _fixBtn.height/720], [0.054,0.911],[0,0]);
            }
            else {
                setWgtLayout(_fixBtn,[0.13,0.13],[0.9,0.89],[0,0]);
            }
            _fixBtn.addTouchEventListener(function(sender,Type){
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        removeUpdataDirectory();
                        break;
                    default :
                        break;
                }
            },this);
        }

        //register event weChat login call back  注册函数 ，微信登录成功回调
        UIEventBind(this.jsBind,loginui.node,"WX_USER_LOGIN",function(para)
        {
            if (cc.isString(para))
            {
                para = JSON.parse(para);
            }

            if(para.openid)
            {
                cc.loader.loadTxt(jsb.fileUtils.getWritablePath()+"nickname.txt",
                    function(er,txt){
                        if(txt)
                        {
                            para.nickname=escape(txt);
                        }
                        util.localStorageEncrypt.setStringItem("WX_USER_LOGIN", JSON.stringify(para));
                        util.localStorageEncrypt.setNumberItem("WX_USER_LOGIN_TIME", (new Date().getTime()));
                        LoginByWeChatAccount(para);
                    });
            }
            else
            {
                MjClient.showToastDelay("微信登录失败，请重试");

            }

        });


        //register event xianliao login call back  注册函数 ，闲聊登录成功回调
        UIEventBind(this.jsBind,loginui.node,"XL_USER_LOGIN",function(para)
        {
            if (cc.isString(para))
            {
                para = JSON.parse(para);
            }

            if(para.openId)
            {
                cc.loader.loadTxt(jsb.fileUtils.getWritablePath()+"nicknameXL.txt",
                    function(er,txt){
                        if(txt)
                        {
                            para.nickName=escape(txt);
                        }
                        util.localStorageEncrypt.setStringItem("XL_USER_LOGIN", JSON.stringify(para));
                        LoginByXianLiaoAccount(para);
                    });
            }
            else
            {
                MjClient.showToastDelay("闲聊登录失败，请重试");
            }

        });

        //register event duoliao login call back  注册函数 ，多聊登录成功回调
        UIEventBind(this.jsBind,loginui.node,"DL_USER_LOGIN",function(para)
        {
            if (cc.isString(para))
            {
                para = JSON.parse(para);
            }

            if(para.openId)
            {
                cc.loader.loadTxt(jsb.fileUtils.getWritablePath()+"nicknameDL.txt",
                    function(er,txt){
                        if(txt)
                        {
                            para.nickName=escape(txt);
                        }
                        util.localStorageEncrypt.setStringItem("DL_USER_LOGIN", JSON.stringify(para));
                        LoginByDuoLiaoAccount(para);
                    });
            }
            else
            {
                MjClient.showToastDelay("多聊登录失败，请重试");
            }

        });

        //register event mowang login call back  注册函数 ，默往登录成功回调
        UIEventBind(this.jsBind,loginui.node,"MOWANG_USER_LOGIN",function(para)
        {
            if (cc.isString(para))
            {
                para = JSON.parse(para);
            }

            if(para.open_id)
            {
                cc.loader.loadTxt(jsb.fileUtils.getWritablePath()+"nicknameMW.txt",
                    function(er,txt){
                        if(txt)
                        {
                            para.nick_name=escape(txt);
                        }
                        util.localStorageEncrypt.setStringItem("MW_USER_LOGIN", JSON.stringify(para));
                        LoginByMoWangAccount(para);
                    });
            }
            else
            {
                MjClient.showToastDelay("默往登录失败，请重试");
            }
        });

        //register event     guest login call back  ，注册函数，游客登录成功回调
        UIEventBind(this.jsBind,loginui.node,"loginOK",function()
        {
            if (MjClient.webViewLayer != null)
            {
                MjClient.webViewLayer.close();
            }

            cc.log("loginOK delete login layer ! --- by sking");
            if(MjClient.loginui){
                MjClient.loginui.removeFromParent(true);
                delete MjClient.loginui;
            }
        });


        UIEventBind(this.jsBind,loginui.node,"autoLoginFailed",function()
        {
            if (acceptNode) {
                acceptNode.setVisible(true);
            }
            if (_btnWeChat) {
                _btnWeChat.visible = true; // !MjClient.remoteCfg.guestLogin;
            }
            if (_guestLogin) {
                // _guestLogin.visible = MjClient.remoteCfg.guestLogin;
            }
            if (_btnPhone) {
                _btnPhone.setVisible(!!MjClient.remoteCfg.phoneLogin);
            }
        });

        //version info，版本信息
        
        var _version = loginui.node.getChildByName("version");
        _version.setVisible(false);
        /*
        if(MjClient.isShenhe == true){
            _version.setVisible(false);
        }
        setWgtLayout(_version,[0.14,0.14],[0.9,0.95],[0,0]);
        if(MjClient.getAppType() === MjClient.APP_TYPE.AYGUIZHOUMJ) {
            setWgtLayout(_version, [0.13, 0.13], [0.1, 0.95], [0, 0]);
        }
        var ver = "Ver:" + MjClient.native.GetVersionName() + "(" + MjClient.resVersion + ")";
        _version.setString(ver);
        _version.ignoreContentAdaptWithSize(true);
        _version.setTouchEnabled(true);
        var playTimeInDex = 0;
        var that = this;
        _version.addTouchEventListener(function(sender,type){
            return;
            if(type == 2) {
                playTimeInDex++;
                if (playTimeInDex >= 10) {
                    cc.log("============== playTimeInDex ");
                    playTimeInDex = 0;
                    var _textFeildName = new cc.EditBox(cc.size(556, 45), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
                    _textFeildName.setFontColor(cc.color(255, 255, 255));
                    _textFeildName.setMaxLength(100);
                    _textFeildName.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
                    _textFeildName.setPlaceHolder("点击输入ID");
                    //_textFeildName.setPosition(cc.winSize.width * 0.45, cc.winSize.height * 0.65);

                    setWgtLayout(_textFeildName,[0.3,0.3],[0.45,0.65],[0,0]);
                    _back.getParent().addChild(_textFeildName);

                    var _textFeildCode = new cc.EditBox(cc.size(556, 45), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
                    _textFeildCode.setFontColor(cc.color(255, 255, 255));
                    _textFeildCode.setMaxLength(100);
                    _textFeildCode.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
                    _textFeildCode.setPlaceHolder("点击输入code");
                    //_textFeildCode.setPosition(cc.winSize.width * 0.45, cc.winSize.height * 0.5);
                    setWgtLayout(_textFeildCode,[0.3,0.3],[0.45,0.5],[0,0]);
                    _back.getParent().addChild(_textFeildCode);

                    var btn = new ccui.Button("game_picture/xiaotanchuan_48.png");
                    //btn.setPosition(cc.winSize.width * 0.85, cc.winSize.height * 0.575);
                    setWgtLayout(btn,[0.15,0.15],[0.85,0.575],[0,0]);

                    btn.addTouchEventListener(function(sender,type)
                    {
                        if(type == 2)
                        {
                            var mail = _textFeildName.getString();
                            var code = _textFeildCode.getString();
                            startLogin(mail, code);
                        }
                    });
                    _back.getParent().addChild(btn);
                }
            }
        },this);
        */

        //耒阳换皮后有动画
        if(MjClient.getAppType() === MjClient.APP_TYPE.QXLYQP) {
            _back.getChildByName("pnl_cardAni").setLocalZOrder(1);
            _back.getChildByName("logo_bg").setLocalZOrder(1);
            _agree.setOpacity(0);
            _btnWeChat.setOpacity(0);
            _guestLogin.setOpacity(0);
            _btnPhone.setOpacity(0);
            _back.runAction(loginui.action);
            loginui.action.gotoFrameAndPlay(0, 30, false);
            loginui.action.setLastFrameCallFunc(function() {
                loginui.action.clearLastFrameCallFunc();
                //登陆按钮、协议出场动画
                var showAni = cc.sequence(cc.delayTime(0.3), cc.FadeTo.create(1, 255));
                var cb = cc.CallFunc.create(function() {
                    //牌的起伏动画
                    loginui.action.gotoFrameAndPlay(30, 180, true);
                    //飞鸟动画
                    var path = "login/xiaoniao0";
                    var butterflys0 = COMMON_UI.creatFrameAni(path,"xiaoniao_",93,45);
                    butterflys0.setPosition(cc.p(-_back.getContentSize().width*0.1 - 50,_back.getContentSize().height*0.8));
                    var a0 = cc.moveTo(20,cc.p(_back.getContentSize().width*1.05,_back.getContentSize().height*0.8));
                    butterflys0.runAction(cc.sequence(a0,cc.callFunc(function(){
                        butterflys0.setPosition(cc.p(-_back.getContentSize().width*0.1 - 50,_back.getContentSize().height*0.8));
                    })).repeatForever());
                    _back.addChild(butterflys0);

                    var path = "login/xiaoniao1";
                    var butterflys = COMMON_UI.creatFrameAni(path,"xiaoxiaoniao_",93,80);
                    butterflys.setPosition(cc.p(-_back.getContentSize().width*0.1,_back.getContentSize().height*0.85));
                    var a0 = cc.moveTo(20,cc.p(_back.getContentSize().width*1.2,_back.getContentSize().height*0.85));
                    butterflys.runAction(cc.sequence(a0,cc.callFunc(function(){
                        butterflys.setPosition(cc.p(-_back.getContentSize().width*0.1,_back.getContentSize().height*0.85));
                    })).repeatForever());
                    _back.addChild(butterflys);

                    var path = "login/xiaoniao1";
                    var butterflys1 = COMMON_UI.creatFrameAni(path,"xiaoxiaoniao_",93);
                    butterflys1.setPosition(cc.p(-_back.getContentSize().width*0.1 - 80,_back.getContentSize().height*0.9));
                    var a0 = cc.moveTo(20,cc.p(_back.getContentSize().width*1.1,_back.getContentSize().height*0.9));
                    butterflys1.runAction(cc.sequence(a0,cc.callFunc(function(){
                        butterflys1.setPosition(cc.p(-_back.getContentSize().width*0.1 - 80,_back.getContentSize().height*0.9));
                    })).repeatForever());
                    _back.addChild(butterflys1);

                    var path = "login/xiaoniao1";
                    var butterflys2 = COMMON_UI.creatFrameAni(path,"xiaoxiaoniao_",93);
                    butterflys2.setPosition(cc.p(-_back.getContentSize().width*0.1 - 200,_back.getContentSize().height*0.45));
                    var a0 = cc.moveTo(20,cc.p(_back.getContentSize().width*1.1,_back.getContentSize().height*0.45));
                    butterflys2.runAction(cc.sequence(a0,cc.callFunc(function(){
                        var a0 = cc.moveTo(20,cc.p(_back.getContentSize().width*1.1- 300,_back.getContentSize().height*0.45));
                    })).repeatForever());
                    _back.addChild(butterflys2);

                    //扫光动画
                    var logo = _back.getChildByName("logo_bg").getChildByName("sp_logo");
                    var clipper = new cc.ClippingNode();
                    var sten = cc.Sprite.create("login/logo.png");
                    var stenSize = sten.getContentSize();
                    sten.setPosition(stenSize.width / 2, stenSize.height / 2);
                    clipper.setContentSize(stenSize);
                    clipper.setStencil(sten);
                    clipper.setAlphaThreshold(0.5);
                    logo.addChild(clipper);
                    var sprite1 = new cc.Sprite("ui/login/saog3.png");
                    sprite1.setBlendFunc(cc.ONE,cc.ONE);
                    sprite1.setOpacity(255);
                    sprite1.setScale(1.5);
                    clipper.addChild(sprite1, 1);
                    var repeatAction = cc.repeatForever(cc.sequence(
                        cc.moveTo(0.0, cc.p(-sten.width / 2, sten.height / 2)),
                        cc.moveTo(3, cc.p(sten.width + sten.width, sten.height / 2)),
                        cc.delayTime(0.5)));
                    sprite1.runAction(repeatAction); //进行向右移动的重复动作
                    var sprite2 = new cc.Sprite("ui/login/saog3.png");
                    sprite2.setBlendFunc(cc.ONE,cc.ONE);
                    sprite2.setOpacity(255);
                    sprite2.setScale(1.5);
                    clipper.addChild(sprite2, 1);
                    var repeatAction2 = cc.repeatForever(cc.sequence(
                        cc.moveTo(0.0, cc.p(sten.width + sten.width / 2, sten.height / 2)),
                        cc.moveTo(3, cc.p(-sten.width, sten.height / 2)),
                        cc.delayTime(0.5)));
                    sprite2.runAction(repeatAction2); //进行向右移动的重复动作
                });
                _agree.runAction(cc.sequence(showAni.clone(), cb));
                _btnWeChat.runAction(showAni.clone());
                _guestLogin.runAction(showAni.clone());
                _btnPhone.runAction(showAni.clone());
            })

            if (isIPhoneX() || (cc.winSize.width/cc.winSize.height > 2)) {
                //动画整体下调
                var cardAni = _back.getChildByName("pnl_cardAni");
                var logoAni = _back.getChildByName("logo_bg");
                cardAni.y -= 50;
                logoAni.y -= 50;
            }
        }

        //衡阳换皮后有动画
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            _back.getChildByName("load").setLocalZOrder(2);
            _back.getChildByName("pnl_cardAni").setLocalZOrder(1);
            _back.runAction(loginui.action);
            loginui.action.gotoFrameAndPlay(0, 30, false);
            loginui.action.setLastFrameCallFunc(function() {
                loginui.action.clearLastFrameCallFunc();
                //牌的起伏动画
                loginui.action.gotoFrameAndPlay(30, 180, true);

                //竹子动画
                var bamBoo = createSpine("ui/login/ani/bamboo/bj.json", "ui/login/ani/bamboo/bj.atlas");
                bamBoo.setAnimation(0, 'animation', true);
                bamBoo.setPosition(_back.getContentSize().width/2+40,30);
                _back.addChild(bamBoo, 1);
               
                //飞鸟动画
                var size = _back.getContentSize();
                var sPos = [[-200, 680], [-100, 700], [-100, 680], [120, 760], [1340, 600], [1300, 700], [1200, 740]];
                var ePos = [[500, 500], [600, 520], [680, 500], [580, 500], [900, 500], [840, 520], [780, 540]];
                for (var i = 0; i < 7; i++) {
                    var name = "niao" + (i + 1);
                    var path = "ui/login/ani/" + name + "/";
                    var birdAni = createSpine(path + name + ".json", path + name + ".atlas");
                    birdAni.setAnimation(0, 'animation', true);
                    //起始坐标
                    var x = sPos[i][0], y = sPos[i][1];
                    birdAni.setPosition(x, y);
                    birdAni.setScale(1.8);
                    birdAni.setUserData({sX:x, sY:y});
                    var move;
                    move = cc.moveTo(8, cc.p(ePos[i][0], ePos[i][1]));
                    var scale;
                    if(i > 3) 
                        scale = cc.scaleTo(8, 1.2);
                    else
                        scale = cc.scaleTo(8, 0.2);
                    var delay = cc.delayTime(2);
                    var cb = cc.callFunc(function(node) {
                        var data = node.getUserData();
                        node.setPosition(cc.p(data.sX, data.sY));
                        node.setScale(1.8);
                    })
                    
                    var act = cc.sequence(cc.spawn(move, scale), cb, delay);
                    birdAni.setLocalZOrder(0);
                    birdAni.runAction(cc.repeatForever(act));
                    _back.addChild(birdAni);
                }

                //扫光动画
                var logo = _back.getChildByName("load");
                var clipper = new cc.ClippingNode();
                var sten = cc.Sprite.create("ui/login/logo.png");
                var stenSize = sten.getContentSize();
                sten.setPosition(stenSize.width / 2, stenSize.height / 2);
                clipper.setContentSize(stenSize);
                clipper.setStencil(sten);
                clipper.setAlphaThreshold(0.5);
                logo.addChild(clipper);
                var sprite1 = new cc.Sprite("ui/login/liuguang.png");
                sprite1.setBlendFunc(cc.ONE,cc.ONE);
                sprite1.setOpacity(255);
                sprite1.setScale(1.5);
                clipper.addChild(sprite1, 1);
                var repeatAction = cc.repeatForever(cc.sequence(
                    cc.moveTo(0.0, cc.p(-sten.width / 2, sten.height / 2)),
                    cc.moveTo(3, cc.p(sten.width + sten.width, sten.height / 2)),
                    cc.delayTime(0.5)));
                sprite1.runAction(repeatAction); //进行向右移动的重复动作
                var sprite2 = new cc.Sprite("ui/login/liuguang.png");
                sprite2.setBlendFunc(cc.ONE,cc.ONE);
                sprite2.setOpacity(255);
                sprite2.setScale(1.5);
                clipper.addChild(sprite2, 1);
                var repeatAction2 = cc.repeatForever(cc.sequence(
                    cc.moveTo(0.0, cc.p(sten.width + sten.width / 2, sten.height / 2)),
                    cc.moveTo(3, cc.p(-sten.width, sten.height / 2)),
                    cc.delayTime(0.5)));
                sprite2.runAction(repeatAction2); //进行向右移动的重复动作
            })
        }

        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG){
            var imgLeft = loginui.node.getChildByName("img_left");
            setWgtLayout(imgLeft, [0.13, 0.35], [0.1, 0.7], [0, 0]);
            var imgRight = loginui.node.getChildByName("img_right");
            setWgtLayout(imgRight, [0.13, 0.35], [0.95, 0.6], [0, 0]);
        }
        clearLoginDataCache();
        MjClient.autoLogin();
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
        {
            ResetLoginPanel(_back);
        }
        return true;
    },
    onEnter:function(){
        this._super();
        if (MjClient.getAppType() === MjClient.APP_TYPE.QXJSMJ || MjClient.getAppType() === MjClient.APP_TYPE.QXHAMJ || MjClient.getAppType() === MjClient.APP_TYPE.QXNTQP)
        {
            if (!cc.sys.isObjectValid(this._title)) return;
            cc.spriteFrameCache.addSpriteFrames("login/title_ani.plist","login/title_ani.png");
            var arry = [];
            for(var i = 0; i < 15; i++)
            {
                var frame = cc.spriteFrameCache.getSpriteFrame("title_" + i + ".png");
                if(frame)
                {
                    arry.push(frame);
                }
            }

            var firstFrame = new cc.Sprite();
            firstFrame.initWithSpriteFrame(arry[0]);
            firstFrame.setPosition(this._title.getPositionX(), this._title.getPositionY());
            this._title.getParent().addChild(firstFrame,this._title.getLocalZOrder()-1);
            var animate = cc.animate(new cc.Animation(arry, 0.8/15));
            firstFrame.setScale(0);
            firstFrame.setOpacity(0);
            firstFrame.runAction(cc.spawn(cc.fadeIn(0.3), cc.scaleTo(0.3,1)));
            firstFrame.runAction(cc.sequence(
                cc.delayTime(0.2),
                animate,
                cc.removeSelf()));

            var _title2 = new cc.Sprite("game_picture/logo_da_4.png");
            _title2.setOpacity(0);
            _title2.setPosition(this._title.getContentSize().width/2, this._title.getContentSize().height/2);
            this._title.addChild(_title2);

            _title2.runAction(cc.sequence(
                //cc.delayTime(0.3),
                cc.fadeIn(0.3),
                cc.spawn(cc.fadeOut(0.5), cc.scaleTo(0.5, 1.2)),
                cc.removeSelf()
            ));
            this._title.runAction(cc.sequence(
                cc.spawn(cc.fadeIn(0.3), cc.scaleTo(0.3,1).easing(cc.easeSineIn()))
            ));
        }
        else if (isJinZhongAPPType())
        {
            if (!cc.sys.isObjectValid(this._title)) return;

            this._title.runAction(cc.spawn(cc.scaleTo(0.1, 0.4), cc.fadeIn(0.3)).easing(cc.easeSineOut()));

            var yuan = this._title.getChildByName("yuan");
            var shuimo = this._title.getChildByName("shuimo");
            var long = this._title.getChildByName("long");
            var yun1 = this._title.getChildByName("yun1");
            var yun2 = this._title.getChildByName("yun2");
            var logo = this._title.getChildByName("logo");

            yuan.setScale(0);
            yuan.setRotation(180);
            yuan.runAction(cc.sequence(cc.delayTime(0), cc.spawn(cc.scaleTo(0.5,1), cc.fadeIn(0.5), cc.rotateTo(0.5, 0))));
            long.runAction(cc.sequence(cc.delayTime(0.5), cc.moveTo(0.5, 129,246).easing(cc.easeBackOut())));

            yun1.setOpacity(0);
            yun2.setOpacity(0);
            yun1.runAction(cc.sequence(cc.delayTime(0.5), cc.spawn(cc.fadeIn(0.5), cc.moveBy(0.5, 70, 0))));
            yun2.runAction(cc.sequence(cc.delayTime(0.5), cc.spawn(cc.fadeIn(0.5), cc.moveBy(0.5, -100, 0))));

            shuimo.setOpacity(0);
            shuimo.runAction(cc.sequence(cc.delayTime(1), cc.fadeIn(0.5)));


            var clipper = new cc.ClippingNode();
            var sten = cc.Sprite.create("login/logo.png");
            var stenSize = sten.getContentSize();
            sten.setPosition(stenSize.width / 2, stenSize.height / 2);
            clipper.setContentSize(stenSize);
            clipper.setStencil(sten);
            clipper.setAlphaThreshold(0.5);
            logo.addChild(clipper);
            var sprite1 = new cc.Sprite("login/saog3.png");
            sprite1.setBlendFunc(cc.ONE,cc.ONE);
            sprite1.setOpacity(255);
            sprite1.setScale(1.5);
            clipper.addChild(sprite1, 1);
            var repeatAction = cc.repeatForever(cc.sequence(
                cc.moveTo(0.0, cc.p(-sten.width / 2, sten.height / 2)),
                cc.moveTo(3, cc.p(sten.width + sten.width, sten.height / 2)),
                cc.delayTime(0.5)));
            sprite1.runAction(repeatAction); //进行向右移动的重复动作
            var sprite2 = new cc.Sprite("login/saog3.png");
            sprite2.setBlendFunc(cc.ONE,cc.ONE);
            sprite2.setOpacity(255);
            sprite2.setScale(1.5);
            clipper.addChild(sprite2, 1);
            var repeatAction2 = cc.repeatForever(cc.sequence(
                cc.moveTo(0.0, cc.p(sten.width + sten.width / 2, sten.height / 2)),
                cc.moveTo(3, cc.p(-sten.width, sten.height / 2)),
                cc.delayTime(0.5)));
            sprite2.runAction(repeatAction2); //进行向右移动的重复动作

        }
        else if(MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP) {
            showLoginAni_qxyyqp(this._aniNode);
        }else if(MjClient.getAppType() === MjClient.APP_TYPE.YLHUNANMJ) {
            showLoginAni_ylhunan(this._back);
        }
    }
});

//邵阳换皮后的登陆页面
LoginView_sy = cc.Layer.extend({
    ctor:function () {
        this._super();
        if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
            var loginui = ccs.load("Login_3.0.json");
        else
            var loginui = ccs.load("Login.json");
        this.addChild(loginui.node);
        MjClient.loginui=this;   

        var _back = loginui.node.getChildByName("back");
        setWgtLayout(_back,[1,1],[0.5,0.5],[0,0],true);

        var logo = loginui.node.getChildByName("pnl_logo");
        setWgtLayout(logo,[logo.width/1280, 0], [0.5, 0.64], [0, 0]);

        //动画
        logo.runAction(loginui.action);
        loginui.action.gotoFrameAndPlay(0, 63, false);
        loginui.action.setTimeSpeed(1.2);
        loginui.action.setLastFrameCallFunc(function() {
            /*
            //卡通动画
            var man = logo.getChildByName("img_man");
            var offManAct = cc.RotateBy.create(60/60, -3);
            var dlyManAct = cc.DelayTime.create(15/60);
            man.runAction(cc.repeatForever(cc.Sequence(offManAct, dlyManAct, offManAct.reverse(), dlyManAct)));
            //星星动画
            var star = _back.getChildByName("img_star");
            var aphaStarAct = cc.FadeTo.create(30/60, 255);
            var rtStarAct = cc.RotateBy.create(35/60, -105);
            var dlyStarAct = cc.DelayTime.create(45/60);
            var aphaStarAct2 = cc.FadeTo.create(10/60, 0);
            star.runAction(cc.repeatForever(cc.Sequence(aphaStarAct, rtStarAct, aphaStarAct2, dlyStarAct)));
            */
            //流光裁切动画
            //左扫光
            var tt = logo.getChildByName("img_tiantian");
            var lClipper = new cc.ClippingNode();
            var lSp = cc.Sprite.create("ui/login/tiantain.png");
            var lSize = lSp.getContentSize();
            lSp.setPosition(lSize.width/2, lSize.height/2);
            lClipper.setContentSize(lSize);
            lClipper.setStencil(lSp);
            lClipper.setAlphaThreshold(0.5);
            tt.addChild(lClipper, 1);
            var lSpLight = new cc.Sprite("ui/login/saog3.png");
            lSpLight.setBlendFunc(cc.ONE,cc.ONE);
            lSpLight.setOpacity(255);
            lSpLight.setScale(1.5);
            lClipper.addChild(lSpLight, 1);
            lSpLight.setPosition(-lSp.width/2, lSp.height/2);
            var lMove = cc.MoveTo.create(1, cc.p(lSp.width, lSp.height/2));
            var lMove1 = cc.MoveTo.create(1, cc.p(-lSp.width/2, lSp.height/2));
            lSpLight.runAction(cc.repeatForever(cc.sequence(
                lMove, cc.delayTime(0.5), lMove1, cc.delayTime(0.5)))); //进行向左右移动的重复动作
            //右扫光
            var qp = logo.getChildByName("img_qipai");
            var rClipper = new cc.ClippingNode();
            var rSp = cc.Sprite.create("ui/login/qipai.png");
            var rSize = rSp.getContentSize();
            rSp.setPosition(rSize.width/2, rSize.height/2);
            rClipper.setContentSize(rSize);
            rClipper.setStencil(rSp);
            rClipper.setAlphaThreshold(0.5);
            qp.addChild(rClipper, 1);
            var rSpLight = new cc.Sprite("ui/login/saog3.png");
            rClipper.addChild(rSpLight, 1);
            rSpLight.setBlendFunc(cc.ONE,cc.ONE);
            rSpLight.setOpacity(255);
            rSpLight.setScale(1.5);
            rSpLight.setPosition(rSp.width + rSp.width/2, rSp.height/2);
            var rMove = cc.MoveTo.create(1.4, cc.p(-rSp.width, rSp.height/2));
            var rMove1 = cc.MoveTo.create(1.4, cc.p(rSp.width + rSp.width/2, rSp.height/2));
            rSpLight.runAction(cc.repeatForever(cc.sequence(
                rMove, cc.delayTime(0.1), rMove1, cc.delayTime(0.1)))); //进行向左右移动的重复动作

            //协议动画
            var pnlBtn = _back.getChildByName("img_txtBg");
            var fade = cc.FadeTo(20/60, 255);
            pnlBtn.runAction(fade);
        })
        
        //灯笼动画
        // var lanter = loginui.node.getChildByName("img_denglong");
        // var offLanterAct = cc.RotateBy.create(40/60, -6);
        // var dlyLanterAct = cc.DelayTime.create(5/60);
        // setWgtLayout(lanter, [lanter.width/1280,0], [0.128,0.977],[0,0]);
        // lanter.runAction(cc.repeatForever(cc.Sequence(offLanterAct, dlyLanterAct, offLanterAct.reverse(), dlyLanterAct)));
        //樱花
        var starParticle1 =  new cc.ParticleSystem("Particle/particle_texture.plist");
        starParticle1.setPosition(-20, _back.getContentSize().height+10);
        starParticle1.setScale(2);
        starParticle1.setTotalParticles(8);
        _back.addChild(starParticle1,0);
        
        var imgTitle = loginui.node.getChildByName("img_title");
        setWgtLayout(imgTitle,[imgTitle.width/(1280*1.5), 0], [0.12, 0.9], [0, 0]);

        var pnlBtn = _back.getChildByName("img_txtBg");
        pnlBtn.setOpacity(0);
        setWgtLayout(pnlBtn,[1280/1280,0],[0.5,0.08],[0,0],true,true);
        pnlBtn.y = pnlBtn.getParent().convertToNodeSpace(cc.p(0, 0)).y;

        var _agree= pnlBtn.getChildByName("cb_agree");
        _agree.setSelected(util.localStorageEncrypt.getBoolItem("_agree_user_protocol", false));
        //setWgtLayout(_agree,[0.08,0.08],[0.38,0.75],[0,0]);
        acceptNode = _agree;
        acceptNode.setVisible(false);
        var _legal = acceptNode.getChildByName("txt_legal");
        var _privacy = acceptNode.getChildByName("txt_privacy");
        if(_legal){
            _legal.addTouchEventListener(function(sender,Type){
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        var url = "www.baidu.com";
                        if (MjClient.updateCfg)
                        {
                            url = MjClient.updateCfg.userProtocol;
                        }
                        MjClient.openWeb({url:url,help:false});
                        break;
                    default :
                        break;
                }
            },this);
        }
        

        _privacy.addTouchEventListener(function(sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                var url = "www.baidu.com";
                if (MjClient.updateCfg) {
                    url = MjClient.updateCfg.privacyProtocol;
                }
                MjClient.openWeb({
                    url: url,
                    help: false
                });
            }
        }, this);

        var _warnText = pnlBtn.getChildByName("txt_warn");
        //setWgtLayout(_warnText,[0.06,0.06],[1,0.05],[0,0], true);
        if(MjClient.isShenhe == true){
            //setWgtLayout(_warnText,[0.06,0.06],[0.5,0.05],[0,0], true);
        }
        _warnText.ignoreContentAdaptWithSize(true);
        var _warnText_0 = _warnText.getChildByName("txt_warn_0");
        if (_warnText_0) _warnText_0.ignoreContentAdaptWithSize(true);
        var _warnText_1 = _warnText.getChildByName("txt_warn_1");
        if (_warnText_1) _warnText_1.ignoreContentAdaptWithSize(true);

        //weChat login  微信登录
        var _btnWeChat = pnlBtn.getChildByName("btn_wechatLogin");
        if((!MjClient.remoteCfg.phoneLogin && !!MjClient.remoteCfg.xianliaoLogin) || (!!MjClient.remoteCfg.phoneLogin && !MjClient.remoteCfg.xianliaoLogin)){
            _btnWeChat.x = pnlBtn.width*0.65;
        }else {
            _btnWeChat.x = pnlBtn.width*0.5;
        }

        _btnWeChat.visible = false;
        // _btnWeChat.setPressedActionEnabled(true);
        _btnWeChat.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    function func() {
                        util.localStorageEncrypt.setBoolItem("_agree_user_protocol", true);
                        if (cc.sys.OS_WINDOWS == cc.sys.os)
                        {
                            LoginByGuestAccount();
                        }
                        else
                        {
                            var WX_USER_LOGIN=util.localStorageEncrypt.getStringItem("WX_USER_LOGIN");
                            if(WX_USER_LOGIN.length>0) {
                                MjClient.autoLogin();
                            }
                            else if (MjClient.native) {
                                MjClient.native.wxLogin();
                            }
                            else {
                                LoginByGuestAccount();
                            }
                        }
                    }

                    if (acceptNode.isSelected()) {
                        func();
                    } else {
                        MjClient.showToast("请先阅读并同意用户协议");
                        MjClient.Scene.addChild(new LoginLegalDialog(function() {
                            func()
                        }));
                    }
                    break;
                default :
                    break;
            }
        },this);

        // guest login 游客登录
        var _guestLogin = pnlBtn.getChildByName("btn_guestLogin");
        _guestLogin.visible = false;
        if (MjClient.remoteCfg.guestLogin)
        {
            _guestLogin.x = pnlBtn.width*0.7;
        }
        else
        {
            _guestLogin.x = -pnlBtn.width;  //移出屏外
        }
        _guestLogin.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if(acceptNode.isSelected())
                    {
                        util.localStorageEncrypt.setBoolItem("_agree_user_protocol", true);
                        LoginByGuestAccount();
                    }
                    else
                    {
                        MjClient.showToast("请先阅读并同意用户协议");
                        MjClient.Scene.addChild(new LoginLegalDialog(function() {
                            util.localStorageEncrypt.setBoolItem("_agree_user_protocol", true);
                            LoginByGuestAccount();
                        }));
                    }
                    break;
                default :
                    break;
            }
        },this);

        //手机号登陆
        var _btnPhone = pnlBtn.getChildByName("btn_phoneLogin");
        if (_btnPhone)
        {
            _btnPhone.setVisible(false);
            if(!!MjClient.remoteCfg.phoneLogin && !MjClient.remoteCfg.xianliaoLogin){
                _btnPhone.x = pnlBtn.width*0.35;
            }else if(!!MjClient.remoteCfg.phoneLogin && !!MjClient.remoteCfg.xianliaoLogin){
                _btnPhone.x = pnlBtn.width*0.2;
            }else {
                _btnPhone.x = pnlBtn.width*0.2;
            }

            //_btnPhone.setPressedActionEnabled(true);
            _btnPhone.addTouchEventListener(function(sender,Type){
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        function func() {
                            util.localStorageEncrypt.setBoolItem("_agree_user_protocol", true);

                            MjClient.ConnectServer("", function()
                            {
                                that.addChild(new mobilePhoneLoginLayer(LoginByPhone));
                            });
                        }

                         if (acceptNode.isSelected()) {
                            func();
                        } else {
                            MjClient.showToast("请先阅读并同意用户协议");
                            MjClient.Scene.addChild(new LoginLegalDialog(function() {
                                func()
                            }));
                        }
                        break;
                    default :
                        break;
                }
            },this);
        }


        //  一键修复按钮
        var _fixBtn = loginui.node.getChildByName("xiufuBtn");
        setWgtLayout(_fixBtn,[0.13,0.13],[0.9,0.89],[0,0]);
        // _fixBtn.visible = !MjClient.remoteCfg.guestLogin;
        _fixBtn.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    removeUpdataDirectory();
                    break;
                default :
                    break;
            }
        },this);


        //register event weChat login call back  注册函数 ，微信登录成功回调
        UIEventBind(this.jsBind,loginui.node,"WX_USER_LOGIN",function(para)
        {
            if (cc.isString(para))
            {
                para = JSON.parse(para);
            }

                if(para.openid)
                {
                    cc.loader.loadTxt(jsb.fileUtils.getWritablePath()+"nickname.txt",
                        function(er,txt){
                            if(txt)
                            {
                                para.nickname=escape(txt);
                            }
                            util.localStorageEncrypt.setStringItem("WX_USER_LOGIN", JSON.stringify(para));
                            util.localStorageEncrypt.setNumberItem("WX_USER_LOGIN_TIME", (new Date().getTime()));
                            LoginByWeChatAccount(para);
                        });
                }
                else
                {
                    MjClient.showToastDelay("微信登录失败，请重试");
                }
        });


        //register event xianliao login call back  注册函数 ，闲聊登录成功回调
        UIEventBind(this.jsBind,loginui.node,"XL_USER_LOGIN",function(para)
        {
            if (cc.isString(para))
            {
                para = JSON.parse(para);
            }

            if(para.openId)
            {
                cc.loader.loadTxt(jsb.fileUtils.getWritablePath()+"nicknameXL.txt",
                    function(er,txt){
                        if(txt)
                        {
                            para.nickName=escape(txt);
                        }
                        util.localStorageEncrypt.setStringItem("XL_USER_LOGIN", JSON.stringify(para));
                        LoginByXianLiaoAccount(para);
                    });
            }
            else
            {
                MjClient.showToastDelay("闲聊登录失败，请重试");
            }

        });

        //register event duoliao login call back  注册函数 ，多聊登录成功回调
        UIEventBind(this.jsBind,loginui.node,"DL_USER_LOGIN",function(para)
        {
            if (cc.isString(para))
            {
                para = JSON.parse(para);
            }

            if(para.openId)
            {
                cc.loader.loadTxt(jsb.fileUtils.getWritablePath()+"nicknameDL.txt",
                    function(er,txt){
                        if(txt)
                        {
                            para.nickName=escape(txt);
                        }
                        util.localStorageEncrypt.setStringItem("DL_USER_LOGIN", JSON.stringify(para));
                        LoginByDuoLiaoAccount(para);
                    });
            }
            else
            {
                MjClient.showToastDelay("多聊登录失败，请重试");
            }

        });

        //register event     guest login call back  ，注册函数，游客登录成功回调
        UIEventBind(this.jsBind,loginui.node,"loginOK",function()
        {
            cc.log("loginOK delete login layer ! --- by sking");
            if (MjClient.webViewLayer != null)
            {
                MjClient.webViewLayer.close();
            }
            
            if(MjClient.loginui){
                MjClient.loginui.removeFromParent(true);
                delete MjClient.loginui;
            }
        });

        UIEventBind(this.jsBind,loginui.node,"autoLoginFailed",function()
        {
            if (acceptNode) {
                acceptNode.setVisible(true);
            }
            if (_btnWeChat) {
                _btnWeChat.visible = !MjClient.remoteCfg.guestLogin;
            }
            if (_guestLogin) {
                _guestLogin.visible = MjClient.remoteCfg.guestLogin;
            }
            if (_btnPhone) {
                _btnPhone.setVisible(!!MjClient.remoteCfg.phoneLogin);
            }
        });

        //version info，版本信息
        var _version = loginui.node.getChildByName("version");
        if(MjClient.isShenhe == true){
            _version.setVisible(false);
        }
        //版本号显示多余了
        //_version.setVisible(false);
        setWgtLayout(_version,[0.13,0.13],[0.9,0.95],[0,0]);
        var ver = "Ver:" + MjClient.native.GetVersionName() + "(" + MjClient.resVersion + ")";
        _version.setString(ver);
        _version.ignoreContentAdaptWithSize(true);
        _version.setTouchEnabled(true);
        var playTimeInDex = 0;
        var that = this;
        _version.addTouchEventListener(function(sender,type){
            return;
            if(type == 2) {
                playTimeInDex++;
                if (playTimeInDex >= 10) {
                    cc.log("============== playTimeInDex ");
                    playTimeInDex = 0;
                    var _textFeildName = new cc.EditBox(cc.size(556, 45), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
                    _textFeildName.setFontColor(cc.color(255, 255, 255));
                    _textFeildName.setMaxLength(100);
                    _textFeildName.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
                    _textFeildName.setPlaceHolder("点击输入ID");
                    //_textFeildName.setPosition(cc.winSize.width * 0.45, cc.winSize.height * 0.65);
                    setWgtLayout(_textFeildName,[0.3,0.3],[0.45,0.65],[0,0]);

                    _back.getParent().addChild(_textFeildName);

                    var _textFeildCode = new cc.EditBox(cc.size(556, 45), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
                    _textFeildCode.setFontColor(cc.color(255, 255, 255));
                    _textFeildCode.setMaxLength(100);
                    _textFeildCode.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
                    _textFeildCode.setPlaceHolder("点击输入code");
                    //_textFeildCode.setPosition(cc.winSize.width * 0.45, cc.winSize.height * 0.5);
                    setWgtLayout(_textFeildCode,[0.3,0.3],[0.45,0.5],[0,0]);

                    _back.getParent().addChild(_textFeildCode);

                    var btn = new ccui.Button("game_picture/xiaotanchuan_48.png");
                    //btn.setPosition(cc.winSize.width * 0.85, cc.winSize.height * 0.575);

                    setWgtLayout(btn,[0.15,0.15],[0.85,0.575],[0,0]);
                    btn.addTouchEventListener(function(sender,type)
                    {
                        if(type == 2)
                        {
                            var mail = _textFeildName.getString();
                            var code = _textFeildCode.getString();
                            startLogin(mail, code);
                        }
                    });
                    _back.getParent().addChild(btn);
                }
            }
        },this);

        clearLoginDataCache();
        MjClient.autoLogin();
        ResetLoginPanel(_back);
        // showLoginAni(logo);
        return true;
    },
});
   
createLoginView = function() {
    MjClient.native.initAllSdk();
    if (MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ) {
        if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
            return new LoginView();
        else
            return new LoginView_sy();
    }
    else {
        return new LoginView();        
    }
}


})();

var showLoginAni_qxyyqp = function(_aniNode) {
    if (!cc.sys.isObjectValid(_aniNode)) return;

    _aniNode.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.3, MjClient.size.width/1280), cc.fadeIn(0.3)).easing(cc.easeSineOut())));

    var longtou = _aniNode.getChildByName("Image_tou");
    longtou.runAction(cc.sequence(cc.rotateBy(2,6).easing(cc.easeQuadraticActionInOut()), cc.rotateBy(2,-6).easing(cc.easeQuadraticActionInOut())).repeatForever());

    var zhuao = longtou.getChildByName("Image_zhua_0");
    zhuao.runAction(cc.sequence(cc.rotateBy(2,30).easing(cc.easeQuadraticActionInOut()), cc.rotateBy(2,-30).easing(cc.easeQuadraticActionInOut())).repeatForever());

    var zhuao0 = _aniNode.getChildByName("Image_zhua");
    zhuao0.runAction(cc.sequence(cc.rotateBy(2,30).easing(cc.easeQuadraticActionInOut()), cc.rotateBy(2,-30).easing(cc.easeQuadraticActionInOut())).repeatForever());

    var shenxia = _aniNode.getChildByName("Image_shenxia");

    var a = cc.scaleTo(1,shenxia.getScaleX(),shenxia.getScaleY()*0.9).easing(cc.easeQuadraticActionInOut());
    var a0 = cc.scaleTo(1,shenxia.getScaleX(),shenxia.getScaleY()*1).easing(cc.easeQuadraticActionInOut());
    shenxia.runAction(cc.sequence(a,a0).repeatForever());

    var shenshang = _aniNode.getChildByName("Image_shenshang");
    var a = cc.scaleTo(1,shenxia.getScaleX(),shenxia.getScaleY()*1.1).easing(cc.easeQuadraticActionInOut());
    var a0 = cc.scaleTo(1,shenxia.getScaleX(),shenxia.getScaleY()*1).easing(cc.easeQuadraticActionInOut());
    shenshang.runAction(cc.sequence(a,a0).repeatForever());

    var wei = _aniNode.getChildByName("Image_wei");
    wei.runAction(cc.sequence(cc.rotateBy(2,10).easing(cc.easeQuadraticActionInOut()), cc.rotateBy(2,-10).easing(cc.easeQuadraticActionInOut())).repeatForever());

    //扫光
    var logo = _aniNode.getChildByName("load");
    var clipper = new cc.ClippingNode();
    var sten = cc.Sprite.create("login/loginAni/logo_da.png");
    var stenSize = sten.getContentSize();
    sten.setPosition(stenSize.width / 2, stenSize.height / 2);
    clipper.setContentSize(stenSize);
    clipper.setStencil(sten);
    clipper.setAlphaThreshold(0.5);
    logo.addChild(clipper);
    var sprite1 = new cc.Sprite("login/loginAni/saog3.png");
    sprite1.setBlendFunc(cc.ONE,cc.ONE);
    sprite1.setOpacity(255);
    sprite1.setScale(1.5);
    clipper.addChild(sprite1, 1);
    var repeatAction = cc.repeatForever(cc.sequence(
        cc.moveTo(0.0, cc.p(-sten.width / 2, sten.height / 2)),
        cc.moveTo(3, cc.p(sten.width + sten.width, sten.height / 2)),
        cc.delayTime(0.5)));
    sprite1.runAction(repeatAction); //进行向右移动的重复动作
    var sprite2 = new cc.Sprite("login/loginAni/saog3.png");
    sprite2.setBlendFunc(cc.ONE,cc.ONE);
    sprite2.setOpacity(255);
    sprite2.setScale(1.5);
    clipper.addChild(sprite2, 1);
    var repeatAction2 = cc.repeatForever(cc.sequence(
        cc.moveTo(0.0, cc.p(sten.width + sten.width / 2, sten.height / 2)),
        cc.moveTo(3, cc.p(-sten.width, sten.height / 2)),
        cc.delayTime(0.5)));
    sprite2.runAction(repeatAction2); //进行向右移动的重复动作


    //飞鸟
    var _back = _aniNode.getParent();
    var path = "login/loginAni/xiaoniao0";

    var butterflys0 = COMMON_UI.creatFrameAni(path,"xiaoniao_",93,45);
    butterflys0.setPosition(cc.p(-_back.getContentSize().width*0.1 - 50,_back.getContentSize().height*0.8));
    var a0 = cc.moveTo(20,cc.p(_back.getContentSize().width*1.05,_back.getContentSize().height*0.8));
    butterflys0.runAction(cc.sequence(a0,cc.callFunc(function(){
        butterflys0.setPosition(cc.p(-_back.getContentSize().width*0.1 - 50,_back.getContentSize().height*0.8));
    })).repeatForever());
    _back.addChild(butterflys0);

    var path = "login/loginAni/xiaoniao1";
    var butterflys = COMMON_UI.creatFrameAni(path,"xiaoxiaoniao_",93,80);
    butterflys.setPosition(cc.p(-_back.getContentSize().width*0.1,_back.getContentSize().height*0.85));
    var a0 = cc.moveTo(20,cc.p(_back.getContentSize().width*1.2,_back.getContentSize().height*0.85));
    butterflys.runAction(cc.sequence(a0,cc.callFunc(function(){
        butterflys.setPosition(cc.p(-_back.getContentSize().width*0.1,_back.getContentSize().height*0.85));
    })).repeatForever());
    _back.addChild(butterflys);


    var path = "login/loginAni/xiaoniao1";
    var butterflys1 = COMMON_UI.creatFrameAni(path,"xiaoxiaoniao_",93);
    butterflys1.setPosition(cc.p(-_back.getContentSize().width*0.1 - 80,_back.getContentSize().height*0.9));
    var a0 = cc.moveTo(20,cc.p(_back.getContentSize().width*1.1,_back.getContentSize().height*0.9));
    butterflys1.runAction(cc.sequence(a0,cc.callFunc(function(){
        butterflys1.setPosition(cc.p(-_back.getContentSize().width*0.1 - 80,_back.getContentSize().height*0.9));
    })).repeatForever());
    _back.addChild(butterflys1);


    var path = "login/loginAni/xiaoniao1";
    var butterflys2 = COMMON_UI.creatFrameAni(path,"xiaoxiaoniao_",93);
    butterflys2.setPosition(cc.p(-_back.getContentSize().width*0.1 - 200,_back.getContentSize().height*0.45));
    var a0 = cc.moveTo(20,cc.p(_back.getContentSize().width*1.1,_back.getContentSize().height*0.45));
    butterflys2.runAction(cc.sequence(a0,cc.callFunc(function(){
        var a0 = cc.moveTo(20,cc.p(_back.getContentSize().width*1.1- 300,_back.getContentSize().height*0.45));
    })).repeatForever());
    _back.addChild(butterflys2);


    //闪光
    var Image_light = _aniNode.getChildByName("Image_light");
    var Image_light0 = _aniNode.getChildByName("Image_light0");
    Image_light.runAction(cc.sequence(cc.fadeOut(1),cc.fadeIn(0.5)).repeatForever());
    Image_light0.runAction(cc.sequence(cc.fadeOut(1),cc.fadeIn(0.5)).repeatForever());
};

var showLoginAni_ylhunan = function (back) {
    if(!back) return;
    var _back = back;
    var logo = _back.getChildByName("logo");
    var shaizi = logo.getChildByName("anim_shaizi");
    var animationPanel = _back.getChildByName("animationPanel");
    var animBird = _back.getChildByName("animationBirdPanel");
    var animLeft = animationPanel.getChildByName("anim_left");
    var animRight = animationPanel.getChildByName("anim_right");

    if (shaizi){
        shaizi.runAction(cc.repeatForever(cc.sequence(
            cc.delayTime(0.01),
            cc.moveBy(0.3, cc.p(5, 5)),
            cc.moveBy(0.3, cc.p(-5, -5))
        )));
    }


    if(animLeft && animRight) {
        animLeft.runAction(cc.repeatForever(cc.sequence(
            cc.delayTime(0.01),
            cc.moveBy(0.8, cc.p(0, 5)),
            cc.moveBy(0.4, cc.p(0, -5))
        )));

        animRight.runAction(cc.repeatForever(cc.sequence(
            cc.delayTime(0.01),
            cc.moveBy(0.8, cc.p(0, -10)),
            cc.moveBy(0.4, cc.p(0, 10))
        )));
    }



    //飞鸟
    if(animBird){

        var path = "login/loginAni/xiaoniao0";

        var butterflys0 = COMMON_UI.creatFrameAni(path,"xiaoniao_",93,45);
        butterflys0.setPosition(cc.p(-_back.getContentSize().width*0.1 - 50,_back.getContentSize().height*0.8));
        var a0 = cc.moveTo(20,cc.p(_back.getContentSize().width*1.05,_back.getContentSize().height*0.8));
        butterflys0.runAction(cc.sequence(a0,cc.callFunc(function(){
            butterflys0.setPosition(cc.p(-_back.getContentSize().width*0.1 - 50,_back.getContentSize().height*0.8));
        })).repeatForever());
        animBird.addChild(butterflys0);

        var path = "login/loginAni/xiaoniao1";
        var butterflys = COMMON_UI.creatFrameAni(path,"xiaoxiaoniao_",93,80);
        butterflys.setPosition(cc.p(-_back.getContentSize().width*0.1,_back.getContentSize().height*0.85));
        var a0 = cc.moveTo(20,cc.p(_back.getContentSize().width*1.2,_back.getContentSize().height*0.85));
        butterflys.runAction(cc.sequence(a0,cc.callFunc(function(){
            butterflys.setPosition(cc.p(-_back.getContentSize().width*0.1,_back.getContentSize().height*0.85));
        })).repeatForever());
        animBird.addChild(butterflys);


        var path = "login/loginAni/xiaoniao1";
        var butterflys1 = COMMON_UI.creatFrameAni(path,"xiaoxiaoniao_",93);
        butterflys1.setPosition(cc.p(-_back.getContentSize().width*0.1 - 80,_back.getContentSize().height*0.9));
        var a0 = cc.moveTo(20,cc.p(_back.getContentSize().width*1.1,_back.getContentSize().height*0.9));
        butterflys1.runAction(cc.sequence(a0,cc.callFunc(function(){
            butterflys1.setPosition(cc.p(-_back.getContentSize().width*0.1 - 80,_back.getContentSize().height*0.9));
        })).repeatForever());
        animBird.addChild(butterflys1);


        var path = "login/loginAni/xiaoniao1";
        var butterflys2 = COMMON_UI.creatFrameAni(path,"xiaoxiaoniao_",93);
        butterflys2.setPosition(cc.p(-_back.getContentSize().width*0.1 - 200,_back.getContentSize().height*0.45));
        var a0 = cc.moveTo(20,cc.p(_back.getContentSize().width*1.1,_back.getContentSize().height*0.45));
        butterflys2.runAction(cc.sequence(a0,cc.callFunc(function(){
            a0 = cc.moveTo(20,cc.p(_back.getContentSize().width*1.1- 300,_back.getContentSize().height*0.45));
        })).repeatForever());
        animBird.addChild(butterflys2);
    }



    //扫光
    if(logo){
        var clipper = new cc.ClippingNode();
        var sten = cc.Sprite.create("login/logo2.png");
        var stenSize = sten.getContentSize();
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        logo.addChild(clipper);
        var sprite1 = new cc.Sprite("login/shao.png");
        sprite1.setBlendFunc(cc.ONE,cc.ONE);
        sprite1.setOpacity(255);
        sprite1.setScale(1.5);
        clipper.addChild(sprite1, 1);
        var repeatAction = cc.repeatForever(cc.sequence(
            cc.moveTo(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.moveTo(3, cc.p(sten.width + sten.width, sten.height / 2)),
            cc.delayTime(0.5)));
        sprite1.runAction(repeatAction); //进行向右移动的重复动作
        var sprite2 = new cc.Sprite("login/shao.png");
        sprite2.setBlendFunc(cc.ONE,cc.ONE);
        sprite2.setOpacity(255);
        sprite2.setScale(1.5);
        clipper.addChild(sprite2, 1);
        var repeatAction2 = cc.repeatForever(cc.sequence(
            cc.moveTo(0.0, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.moveTo(3, cc.p(-sten.width, sten.height / 2)),
            cc.delayTime(0.5)));
        sprite2.runAction(repeatAction2); //进行向右移动的重复动作
    }
};

// 登录界面动画(邵阳，耒阳)
var showLoginAni = function(_aniNode) {
    if (!cc.sys.isObjectValid(_aniNode)) return;

    setWgtLayout(_aniNode, [0.11, 0.11], [0.35, 0.92], [0, 0]);

    var _back = _aniNode.getParent().getChildByName("back");
    if(!_back) _back = _aniNode.getParent();
    // var qianjing = _back.getChildByName("Image_qianjing");
    //
    // var yanhuaBg = _back.getChildByName("yanhua");
    // var yanhua1 =  new cc.ParticleSystem("login/loginAni/yanhua1.plist");
    // yanhua1.setPosition(-150, -200);
    // yanhua1.setScale(0.2);
    // yanhua1.runAction(cc.sequence(cc.delayTime(0.5),cc.moveBy(7,0,2500),cc.callFunc(function () {
    //     yanhua1.y = -200;
    // })).repeatForever());
    // yanhuaBg.addChild(yanhua1);
    // var yanhua2 =  new cc.ParticleSystem("login/loginAni/yanhua2.plist");
    // yanhua2.setPosition(-240, -200);
    // yanhua2.setScale(0.2);
    // yanhua2.runAction(cc.sequence(cc.moveBy(5,0,2500),cc.callFunc(function () {
    //     yanhua2.y = -200;
    // })).repeatForever());
    // yanhuaBg.addChild(yanhua2);
    // var yanhua3 =  new cc.ParticleSystem("login/loginAni/yanhua3.plist");
    // yanhua3.setPosition(200, -200);
    // yanhua3.setScale(0.1);
    // yanhua3.runAction(cc.sequence(cc.delayTime(1),cc.moveBy(7,0,2500),cc.callFunc(function () {
    //     yanhua3.y = -200;
    // }),cc.delayTime(1)).repeatForever())
    // yanhuaBg.addChild(yanhua3);
    // var yanhua4 =  new cc.ParticleSystem("login/loginAni/yanhua4.plist");
    // yanhua4.setPosition(330, -200);
    // yanhua4.setScale(0.1);
    // yanhua4.runAction(cc.sequence(cc.delayTime(1.5),cc.moveBy(5,0,2500),cc.callFunc(function () {
    //     yanhua4.y = -200;
    // })).repeatForever())
    // yanhuaBg.addChild(yanhua4);
    // var yanhua5 =  new cc.ParticleSystem("login/loginAni/yanhua4.plist");
    // yanhua5.setPosition(900, -400);
    // yanhua5.setScale(0.2);
    // yanhua5.runAction(cc.sequence(cc.delayTime(0.7),cc.moveBy(4,0,3500),cc.callFunc(function () {
    //     yanhua5.y = -400;
    // })).repeatForever())
    // yanhuaBg.addChild(yanhua5);
    //
    // var shou = qianjing.getChildByName("shou");
    // shou.runAction(cc.sequence(cc.rotateBy(1,5).easing(cc.easeQuadraticActionInOut()),cc.rotateBy(1,-5)).easing(cc.easeQuadraticActionInOut()).repeatForever());
    //
    // var yuanbao = qianjing.getChildByName("yuanbao");
    // yuanbao.runAction(cc.sequence(cc.rotateBy(1,5).easing(cc.easeQuadraticActionInOut()),cc.rotateBy(1,-5)).easing(cc.easeQuadraticActionInOut()).repeatForever());
    // var stars = new cc.ParticleSystem("login/loginAni/stars.plist");
    // stars.setPosition(750, 300);
    // yuanbao.addChild(stars,0);
    _aniNode.setLocalZOrder(50);

};




