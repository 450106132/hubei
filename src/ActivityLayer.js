/**
 * Created by sking on 2017/7/10.
 */

var activityLayer = cc.Layer.extend({
    _closeCallback:null,

    _bg_shouchong:null,
    _bg_duizhan:null,
    _bg_kaifang:null,
    _bg_tuijian:null,
    _bg_renzheng:null,
    _bg_xianshi:null,
    _bg_fenxiang:null,
    _avtivList:null,
    _btnNode:null,

    _currentType:0,//0 活动列表，1 表示公告列表

    ctor:function () {
        this._super();
        var UI = ccs.load("ActivityLayer.json");
        this.addChild(UI.node);
        var that = this;
        this._xianshiImageIndex = 0;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        var _back = UI.node.getChildByName("back");

        // 新版江苏活动界面
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || 
            MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
            MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP ||
            MjClient.getAppType() === MjClient.APP_TYPE.BDYZPHZ) {
            setWgtLayout(_back,[0.95, 0.95], [0.5, 0.5], [0, 0]);
        }
        // 晋中换皮
        else if (isJinZhongAPPType()) {
            setWgtLayout(_back,[1, 1], [0.5, 0.5], [0, 0]);
            if(MjClient.getAppType() === MjClient.APP_TYPE.DQSHANXIMJ) {
                setWgtLayout(_back, [0.9, 0.9], [0.5, 0.5], [0, 0]);
            }
        }
        else {
            setWgtLayout(_back,[0.95, 1], [0.5, 0.5], [0, 0]);
        }


        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent();
                if (this._closeCallback)
                {
                    this._closeCallback();
                }
                MjClient.native.umengEvent4CountWithProperty("Huodong_Tuichu", {uid:SelfUid()});
            }
        }, this);


        this. _avtivList = _back.getChildByName("avtivList");
        this._avtivList.removeAllChildren();
        this. _avtivList.setScrollBarEnabled(false);

        this._btnNode = _back.getChildByName("btnNode");
        this._btnNode.visible = false;


        this._bg_xianshi   = _back.getChildByName("bg_xianshi");
        this._bg_shouchong = _back.getChildByName("bg_shouchong");
        this._bg_duizhan   = _back.getChildByName("bg_duizhan");
        this._bg_kaifang   = _back.getChildByName("bg_kaifang");
        this._bg_tuijian   = _back.getChildByName("bg_tuijian");
        this._bg_renzheng  = _back.getChildByName("bg_renzheng");
        this._bg_fenxiang  = _back.getChildByName("bg_fenxiang");
        this._bg_zhenqing  = _back.getChildByName("bg_zhenqing");
        this._bg_monthRecharge   = _back.getChildByName("bg_monthRechage");

        this._bg_waigua  = _back.getChildByName("bg_fanwaigua");
        this._bg_gengxin  = _back.getChildByName("bg_gengxin");
        this._bg_dubo  = _back.getChildByName("bg_dubo");
        this._bg_jianyi = _back.getChildByName("bg_jianyi");
        this._bg_double_11 = _back.getChildByName("bg_double_11");
        this._bg_screenTime = _back.getChildByName("bg_screenTime");

        var _Image_highte = _back.getChildByName("Image_hight");
        var _Image_notice = _back.getChildByName("Image_notice");
        _Image_notice.setTouchEnabled(true);
        var _Image_activity = _back.getChildByName("Image_activity");
        _Image_activity.setTouchEnabled(true);


         // 新版江苏/晋中活动选项卡设置
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ 
            || isJinZhongAPPType()
            || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP
            || MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ 
            || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
            _Image_notice.enabled = true;
            _Image_activity.enabled = false;
        }

        _Image_notice.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                // 新版江苏/晋中活动选项卡设置
                if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ
                    || isJinZhongAPPType()
                    || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ 
                    || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP
                    || MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ
                    || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
                    _Image_notice.enabled = false;
                    _Image_activity.enabled = true;
                }
                cc.log("===== notice ");
                if(that._currentType != 1)
                {
                    that._currentType = 1;
                    this.initList(this.showNoticeList);
                    _Image_highte.setPositionX(737.41);
                }
                MjClient.native.umengEvent4CountWithProperty("Huodong_Youxigonggao", {uid:SelfUid()});
            }
        }, this);

        _Image_activity.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                // 新版江苏/晋中活动选项卡设置
                if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ
                    || isJinZhongAPPType()
                    || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ
                    || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP 
                    || MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ 
                    || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
                    _Image_notice.enabled = true;
                    _Image_activity.enabled = false;
                }
                cc.log("===== _Image_activity ");
                if(that._currentType != 0)
                {
                    that._currentType = 0;
                    this.initList(this.showActivieList);

                    _Image_highte.setPositionX(516.61);
                }
                MjClient.native.umengEvent4CountWithProperty("Huodong_Jingcaihuodong", {uid:SelfUid()});
            }
        }, this);


        _Image_highte.setPositionX(516.61);
        this._currentType = 0;
        this.showActivieList = MjClient.systemConfig.activity.activity;
        this.showNoticeList = MjClient.systemConfig.activity.notice;


        //初始化活动列表
        this.initList(this.showActivieList);

        cc.log("-------------this.showActivieList-- = " + JSON.stringify(this.showActivieList));

        //初始化
        this.initBgNode(this.showActivieList);
        this.initBgNode(this.showNoticeList);
    },

    initBgNode:function(activityList)
    {
        for (var i=0; i<activityList.length; i++)
        {
            switch (activityList[i].type)
            {
                case MjClient.ACTIVITY_TYPE.DUI_ZHAN:
                    this.init_duizhan(activityList[i]);
                    this.refleshChangCiGiftStatus();
                    break;
                case MjClient.ACTIVITY_TYPE.KAI_FANG:
                    this.init_kaifang(activityList[i]);
                    this.refleshKaiFangGiftStatus();
                    break;
                case MjClient.ACTIVITY_TYPE.REN_ZHENG:
                    this.init_renzheng(activityList[i]);
                    break;
                case MjClient.ACTIVITY_TYPE.JIAN_YI:
                    this.init_jianyi();
                    break;
                case MjClient.ACTIVITY_TYPE.DOUBLE_11:
                    this.init_double11(activityList[i]);
                    break;
                case MjClient.ACTIVITY_TYPE.SCREEN_TIME:
                    this.init_screenTime(activityList[i]);
                    break;
            }
        }
    },
    initList:function(activityList)
    {
        this._avtivList.removeAllChildren();
        
        activityList = activityList || [];
        for(var i = 0;i < activityList.length ; i++)
        {
            if(activityList[i].type == MjClient.ACTIVITY_TYPE.REN_ZHENG &&
                MjClient.data.pinfo.mobileNum &&
                MjClient.data.pinfo.mobileNum.toString().length == 11)
            {
                continue;
            }

            if(MjClient.isShenhe && i == 0){
                continue;
            }

            var btn = this._btnNode.clone();
            btn.visible = true;
            btn.loadTextureNormal("hall/activity_btn_2.png");
            btn.setTag(activityList[i].type);
            btn.setUserData(activityList[i]);
            btn.addTouchEventListener(function (sender,type)
            {
                if (type == 2) {
                    this.updateTouchActivityType(sender,true);
                }
            },this);
            btn.setPressedActionEnabled(false);
            var title = new ccui.Text();
            if( MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
                MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {//岳阳同一使用方正兰亭
                title.setFontName("fonts/lanting.TTF");
            }else{
                title.setFontName(MjClient.fzcyfont);
            }

            title.setString(""+activityList[i].title);
            title.setColor(cc.color.WHITE);
            title.setName("title");

            if (activityList[i].title.length>4)
            {
                title.setFontSize(33);
            }
            else
            {
                title.setFontSize(38);
            }


            if(MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ) {// 晋中换皮
                title.setFontSize(30);
                title.setColor(cc.color(255,255,255));
                title.setPosition(btn.getContentSize().width/2, btn.getContentSize().height/2);
            }
            else {
                title.setPosition(btn.getContentSize().width/2-8, btn.getContentSize().height/2);
                title.enableOutline(cc.color(136,54,7), 2);
            }

            btn.addChild(title);
            this._avtivList.pushBackCustomItem(btn);
        }

        this.updateTouchActivityType(this._avtivList.getItem(0));
    },


    updateTouchActivityType:function(btnNode,isClick)
    {
        this._bg_shouchong.visible = false;
        this._bg_duizhan.visible = false;
        this._bg_kaifang.visible = false;
        this._bg_tuijian.visible = false;
        this._bg_renzheng.visible = false;
        this._bg_xianshi.visible = false;
        this._bg_monthRecharge.visible = false;
        if(this._bg_zhenqing)
            this._bg_zhenqing.visible = false;
        if (this._bg_fenxiang)
            this._bg_fenxiang.visible = false;

        this._bg_waigua.visible = false;
        this._bg_gengxin.visible = false;
        this._bg_dubo.visible = false;
        this._bg_jianyi.visible = false;
        if(this._bg_double_11){
            this._bg_double_11.visible = false;
        }
        if(this._bg_screenTime){
            this._bg_screenTime.visible = false;
        }
        var path = "hall/";

        for(var i = 0; i < this._avtivList.getItems().length ; i++)
        {
            this._avtivList.getItem(i).loadTextureNormal(path + "activity_btn_2.png");
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || 
                MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ
                || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {//新江苏UI样式
                var title = this._avtivList.getItem(i).getChildByName("title");
                title.setColor(cc.color(159,106,54));
                title.enableOutline(cc.color(187,77,24,0), 2); // 设置透明，去掉描边
                title.setFontSize(26);
                title.setPosition(this._avtivList.getItem(i).getContentSize().width/2, this._avtivList.getItem(i).getContentSize().height/2);
            }
            else if (isJinZhongAPPType()) { // 晋中
                var title = this._avtivList.getItem(i).getChildByName("title");
                title.setColor(cc.color(255,255,255));
                title.enableOutline(cc.color(187,77,24,0), 2); // 设置透明，去掉描边
                title.setFontSize(30);
                title.setPosition(this._avtivList.getItem(i).getContentSize().width/2, this._avtivList.getItem(i).getContentSize().height/2);
            }
        }
        if (!btnNode) return;
        btnNode.loadTextureNormal(path + "activity_btn_1.png");
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || 
            MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP || 
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ 
            || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {//新江苏UI样式
            var title = btnNode.getChildByName("title");
            title.setColor(cc.color(255,248,191));
            title.enableOutline(cc.color(187,77,24), 2);
            title.setFontSize(28);
            title.setPosition(btnNode.getContentSize().width/2, btnNode.getContentSize().height/2);
        }
        else if (isJinZhongAPPType()) {//晋中
            var title = btnNode.getChildByName("title");
            title.setColor(cc.color(51,80,109));
            title.setFontSize(30);
            title.setPosition(btnNode.getContentSize().width/2, btnNode.getContentSize().height/2);
            if(MjClient.getAppType() === MjClient.APP_TYPE.DQSHANXIMJ) {
                title.setColor(cc.color("#A75B36"));
            }
        }
        var activityData = btnNode.getUserData();
        if(isClick){
            if ("推荐代理奖" == activityData.title){
                MjClient.native.umengEvent4CountWithProperty("Huodong_Jingcaihuodong_Tuijiandailijiang", {uid:SelfUid()});
            }
            if ("好评有礼" == activityData.title){
                MjClient.native.umengEvent4CountWithProperty("Huodong_Jingcaihuodong_Haopingyouli", {uid:SelfUid()});
            }
            if ("外挂悬赏" == activityData.title){
                MjClient.native.umengEvent4CountWithProperty("Huodong_Youxigonggao_Waiguaxuanshang", {uid:SelfUid()});
            }
        }
        switch (activityData.type)
        {
            case MjClient.ACTIVITY_TYPE.WEN_ZI:
                this._bg_dubo.visible = true;
                this.init_wenzi(activityData);
                break;
            case MjClient.ACTIVITY_TYPE.TU_PIAN:
                this._bg_xianshi.visible = true;
                this.init_tupian(activityData);
                break;
            case MjClient.ACTIVITY_TYPE.MONTH_RECHARGE:
                this._bg_monthRecharge.visible = true;
                this.init_monthRecharge(activityData);
                break;
            case MjClient.ACTIVITY_TYPE.DUI_ZHAN:
                this._bg_duizhan.visible = true;
                break;
            case MjClient.ACTIVITY_TYPE.KAI_FANG:
                this._bg_kaifang.visible = true;
                break;
            case MjClient.ACTIVITY_TYPE.REN_ZHENG:
                this._bg_renzheng.visible = true;
                break;
            case MjClient.ACTIVITY_TYPE.JIAN_YI:
                this._bg_jianyi.visible = true;
                if (isClick){
                    MjClient.native.umengEvent4CountWithProperty("Huodong_Youxigonggao_Tousujianyi", {uid:SelfUid()});
                }
                break;
            case MjClient.ACTIVITY_TYPE.DOUBLE_11:
                this._bg_double_11.visible = true;
                break;
            case MjClient.ACTIVITY_TYPE.SCREEN_TIME:
                this._bg_screenTime.visible = true;
                break;
        }
    },

    setAction:function(node, data)
    {
        if (!node) return;
        switch (data.action)
        {
            case MjClient.ACTIVITY_ACTION_TYPE.SHANG_CHENG:
                node.setTouchEnabled(true);
                node.addTouchEventListener(function (sender, type)
                {
                    if (type == 2)
                    {
                        if (MjClient.data.pinfo.myMemberLevel > 0)//正式代理
                        {
                            MjClient.gamenet.request("pkplayer.handler.openBrowser", { type: 6 }, function (rtn) {
                                if (rtn.code == 0) {
                                    MjClient.native.OpenUrl(rtn.data);
                                }
                                else {
                                    if (rtn.message) {
                                        MjClient.showToast(rtn.message);
                                    }
                                    else {
                                        MjClient.showToast("获取数据失败，请重试");
                                    }
                                }
                            });
                        }
                        else
                        {
                            if(!MjClient.rechargeLadder || MjClient.rechargeLadder.length == 0)
                            {
                                var _gongzhognhao = ""+MjClient.systemConfig.gongzhonghao;
                                MjClient.showMsg("添加微信公众号:" + _gongzhognhao + " 进行充值\n点击\"确定\"按钮即可复制微信公众号。",
                                    function(){
                                        MjClient.showToast("复制公众号成功,前往微信添加公众号！");
                                        MjClient.native.doCopyToPasteBoard("" +_gongzhognhao );
                                        MjClient.native.openWeixin();
                                    });
                            }
                            else
                            {
                                var layer = enter_store();
                                MjClient.Scene.addChild(layer);
                            }
                        }
                    }
                }, this);
                break;
            case MjClient.ACTIVITY_ACTION_TYPE.WEB_VIEW:
                node.setTouchEnabled(true);
                node.addTouchEventListener(function (sender, type)
                {
                    if (type == 2)
                    {
                        MjClient.native.OpenUrl(data.target);
                    }
                }, this);
                break;
            case MjClient.ACTIVITY_ACTION_TYPE.FEN_XIANG:
                node.setTouchEnabled(false);
                break;
            case MjClient.ACTIVITY_ACTION_TYPE.NONE:
                node.setTouchEnabled(false);
                break;
            case MjClient.ACTIVITY_ACTION_TYPE.WEB_VIEW_INSIDE:
                node.setTouchEnabled(true);
                node.addTouchEventListener(function (sender, type)
                {
                    if (type == 2)
                    {
                        MjClient.Scene.addChild(new NormalWebviewLayer(data.target));
                    }
                }, this);
                break;
            case MjClient.ACTIVITY_ACTION_TYPE.BI_SAI:
                node.setTouchEnabled(true);
                node.addTouchEventListener(function (sender, type)
                {
                    if (type == 2)
                    {
                        MjClient.Scene.addChild(new playgroundLayer());
                    }
                }, this);
                break;
            case MjClient.ACTIVITY_ACTION_TYPE.OPEN_BROWSER:
                node.setTouchEnabled(true);
                node.addTouchEventListener(function (sender, type)
                {
                    if (type == 2)
                    {
                        MjClient.block();
                        MjClient.gamenet.request("pkplayer.handler.openBrowser", { type: data.target }, function (rtn) {
                            MjClient.unblock();
                            if (rtn.code == 0) {
                                MjClient.native.OpenUrl(rtn.data);
                            }
                            else {
                                if (rtn.message) {
                                    MjClient.showToast(rtn.message);
                                }
                                else {
                                    MjClient.showToast("获取数据失败，请重试");
                                }
                            }
                        });
                    }
                }, this);
                break;
            case MjClient.ACTIVITY_ACTION_TYPE.OPEN_ZHIFUBAO_HONGBAO:
                node.setTouchEnabled(true);
                node.addTouchEventListener(function (sender, type)
                {
                    if (type == 2)
                    {
                        cc.log("wxd............");
                        MjClient.Scene.addChild(new alipayRedPaketLayer());
                        MjClient.block();
                        MjClient.gamenet.request("pkplayer.handler.clickStatistics", {type:1}, function (rtn) {
                            MjClient.unblock();
                            if (rtn.code == 0) {

                            }
                            else {
                                if (rtn.message) {
                                    MjClient.showToast(rtn.message);
                                }
                                else {
                                    MjClient.showToast("统计失败");
                                }
                            }
                        });
                    }
                }, this);
                break;
            default :
                node.setTouchEnabled(false);
                break;
        }
    },


    init_wenzi:function(data)
    {
        var _back = this._bg_dubo.getChildByName("back");
        var cont_us = _back.getChildByName("cont_us");
        cont_us.visible = true;
        cont_us.setString(""+data.content);

        this.setAction(this._bg_dubo, data);
    },

    init_tupian:function(data)
    {
        var ImageNode = this._bg_xianshi.getChildByName("Image_1");
        cc.loader.loadImg(""+data.content, {isCrossOrigin : true}, function(err,img){
            if (!err && img && cc.sys.isObjectValid(ImageNode))
            {
                ImageNode.setTexture(img);
            }
        });

        this.setAction(this._bg_xianshi, data);
    },

    init_monthRecharge:function(data)
    {
        var ImageNode = this._bg_monthRecharge.getChildByName("Image_1");
        cc.loader.loadImg(""+data.content, {isCrossOrigin : true}, function(err,img){
            if (!err && img && cc.sys.isObjectValid(ImageNode))
            {
                ImageNode.setTexture(img);
            }
        });

        this.setAction(this._bg_monthRecharge, data);
    },

    init_duizhan:function(data)
    {
        var _back = this._bg_duizhan.getChildByName("back");

        if (!MjClient.activityConfig || MjClient.isShenhe )
        {
            //MjClient.getActivityConfig();
            _back.setVisible(false);
            return;
        }



        var playGameConfig = MjClient.activityConfig.playGame;
        if(!playGameConfig) {
            cc.log('error init_duizhan MjClient.activityConfig.playGame is null')
            return;
        }

        /*
         说明描述
         */
        var _Text_desc = _back.getChildByName("Text_dec");
        _Text_desc.setString(""+data.content);

        var that = this;
        var boxClickCallback = function(sender)
        {
            if (cc.isUndefined(sender.status))
            {
                MjClient.showToast("宝箱不可领取");
                return;
            }
            else if (sender.status == 1)
            {
                MjClient.showToast("宝箱已经领取过了");
                return;
            }

            MjClient.gamenet.request("pkplayer.handler.activityAward",{activityType:"playGame", count:parseInt(sender.getTag())},
                function(rtn)
                {
                    cc.log(" ======= pkplayer.handler.activityAward :",JSON.stringify(rtn));
                    if (rtn.code == 0)
                    {
                        var number = 0;
                        for (var i = 0; i < playGameConfig.length; i++) {
                            if(playGameConfig[i].count == parseInt(sender.getTag()))
                                number = i;
                        }
                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang" + number);
                        setBoxNodeState(sender, 1,BGLight);
                        that.refleshChangCiGiftStatus();
                        var data = {type : 1, id : playGameConfig[number].id, award : playGameConfig[number].award};
                        that.addChild(new duizhan_shareLayer(data), 5);
                    }

                    if (!cc.isUndefined(rtn.message))
                    {
                        MjClient.showToast(rtn.message);
                    }
                });
        };


        for(var i = 0;i< 5; i++)
        {
            var BoxNode = _back.getChildByName("Image_1").getChildByName("box_" + i);
            BoxNode.setTouchEnabled(true);
            BoxNode.addClickEventListener(boxClickCallback);
            BoxNode.setTag(parseInt(playGameConfig[i].count));
            BoxNode.setUserData(BoxNode.getScale());
            if (BoxNode.getChildByName("mark")) BoxNode.getChildByName("mark").setVisible(false);

            var _time = BoxNode.getChildByName("time");
            var num = parseInt(playGameConfig[i].count);
            _time.setString(num + "次");
            _time.ignoreContentAdaptWithSize(true);
            var _money = BoxNode.getChildByName("money");
            _money.setString(parseInt(playGameConfig[i].award) + "元宝");
            _money.ignoreContentAdaptWithSize(true);


            var BGLight =  _back.getChildByName("Image_1").getChildByName("guang" + i);
            var act_1 = cc.callFunc(function(){
                BGLight.setRotation(10);
            });
            var act_3 = cc.callFunc(function(){
                BGLight.setRotation(0);
            });
            var act_2 = cc.blink(1,2);
            var act_4 = cc.delayTime(0.5);
            BGLight.runAction(cc.spawn(cc.sequence(act_1,act_4,act_3,act_4),act_2).repeatForever());
            BGLight.setOpacity(0);

        }


        //当前开放次数
        var _openTime =  _back.getChildByName("Text_1");
        _openTime.setString(0);
        _openTime.ignoreContentAdaptWithSize(true);


        //进度条
        var _loadingBar = _back.getChildByName("Image_1").getChildByName("LoadingBar_1");
        _loadingBar.setPercent(0);

        var setBoxNodeState = function(boxNode, status, light)
        {
            boxNode.status = status;
            if (status == 1) {//已领取
                if (boxNode.getChildByName("mark")) boxNode.getChildByName("mark").setVisible(true);
                light.setOpacity(0);
            }else if(status == 0){//未领取
                if (boxNode.getChildByName("mark")) boxNode.getChildByName("mark").setVisible(false);
                light.setOpacity(255);
            }
            
        };
        var _Btn_open = _back.getChildByName("Btn_open");
        if (_Btn_open)
        {
            _Btn_open.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    postEvent("createRoom",{});
                    this.removeFromParent();
                }
            }, this);
        }



        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.getUserPlayGameInfo",{},
            function(rtn)
            {
                MjClient.unblock();
                if (rtn.code == 0)
                {
                    var curPlayNum = parseInt(rtn.data.playNum);
                    _openTime.setString(curPlayNum);

                    var percent = 0;
                    var lastNum = 0;
                    for (var i=0; i<playGameConfig.length; i++)
                    {
                        var num = parseInt(playGameConfig[i].count);
                        if (curPlayNum <= num)
                        {
                            var kuadu = num - lastNum;
                            var duoyu = curPlayNum - lastNum;
                            percent += (duoyu/kuadu*100)*0.2;
                            break;
                        }
                        else
                        {
                            percent += 20;
                            lastNum = num;
                        }
                    }
                    for (var i = 0; i < rtn.data.playAward.length; i++) {
                        playGameConfig[i].id = rtn.data.playAward[i].id;
                    }
                    _loadingBar.setPercent(percent);


                    if (percent >= 20)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_0");
                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang0");
                        if (rtn.data.playAward.length > 0)
                        {
                            setBoxNodeState(BoxNode, rtn.data.playAward[0].status,BGLight);
                        }
                        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                            MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
                        {  
                            BGLight.setVisible(false);
                        }

                    }
                    if (percent >= 40)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_1");
                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang1");
                        if (rtn.data.playAward.length > 1)
                        {
                            setBoxNodeState(BoxNode, rtn.data.playAward[1].status,BGLight);
                        }
                    }
                    if (percent >= 60)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_2");
                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang2");
                        if (rtn.data.playAward.length > 2)
                        {
                            setBoxNodeState(BoxNode, rtn.data.playAward[2].status,BGLight);
                        }
                    }
                    if (percent >= 80)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_3");
                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang3");
                        if (rtn.data.playAward.length > 3)
                        {
                            setBoxNodeState(BoxNode, rtn.data.playAward[3].status,BGLight);
                        }

                    }
                    if (percent >= 100)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_4");
                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang4");
                        if (rtn.data.playAward.length > 4)
                        {
                            setBoxNodeState(BoxNode, rtn.data.playAward[4].status,BGLight);
                        }
                    }
                }
                else if (!cc.isUndefined(rtn.message))
                {
                    MjClient.showMsg(rtn.message);
                }
            });
    },

    init_kaifang:function(data) // 开房 活动
    {
        var _back = this._bg_kaifang.getChildByName("back");
        if (!MjClient.activityConfig)
        {
            //MjClient.getActivityConfig();
            _back.setVisible(false);
            return;
        }

        var createRoomConfig = MjClient.activityConfig.createRoom;
        /*
         说明描述
         */
        var _Text_desc = _back.getChildByName("Text_dec");
        _Text_desc.setString(""+data.content);

        var that = this;
        var boxClickCallback = function(sender)
        {
            if (cc.isUndefined(sender.status))
            {
                MjClient.showToast("宝箱不可领取");
                return;
            }
            else if (sender.status == 1)
            {
                MjClient.showToast("宝箱已经领取过了");
                return;
            }

            MjClient.gamenet.request("pkplayer.handler.activityAward",{activityType:"createRoom", count:parseInt(sender.getTag())},
                function(rtn)
                {
                    if (rtn.code == 0)
                    {
                        setBoxNodeState(sender, 1);
                        that.refleshKaiFangGiftStatus();
                    }

                    if (!cc.isUndefined(rtn.message))
                    {
                        MjClient.showToast(rtn.message);
                    }
                });
        };


        for(var i = 0;i< 4; i++)
        {
            var BoxNode = _back.getChildByName("Image_1").getChildByName("box_" + i);
            BoxNode.setTouchEnabled(true);
            BoxNode.addClickEventListener(boxClickCallback);
            BoxNode.setTag(parseInt(createRoomConfig[i].count));
            BoxNode.setUserData(BoxNode.getScale());

            var _time = BoxNode.getChildByName("time");
            var num = parseInt(createRoomConfig[i].count);
            _time.setString(num + "次");
            _time.ignoreContentAdaptWithSize(true);
            var _money = BoxNode.getChildByName("money");
            _money.setString(parseInt(createRoomConfig[i].award) + "元宝");
            _money.ignoreContentAdaptWithSize(true);


            var BGLight =  _back.getChildByName("Image_1").getChildByName("guang" + i);
            BGLight.runAction(cc.rotateBy(10,360).repeatForever());
        }



        //当前开放次数
        var _openTime =  _back.getChildByName("Text_1");
        _openTime.setString(0);
        _openTime.ignoreContentAdaptWithSize(true);


        //进度条
        var _loadingBar = _back.getChildByName("Image_1").getChildByName("LoadingBar_1");
        _loadingBar.setPercent(0);



        var _Btn_open = _back.getChildByName("Btn_open");
        _Btn_open.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                postEvent("createRoom",{});
                this.removeFromParent();
            }
        }, this);



        var setBoxNodeState = function(boxNode, status)
        {
            boxNode.status = status;
            var oldScale = boxNode.getUserData();
            if (status == 1)//已领取
            {
                boxNode.stopAllActions();
                boxNode.setScale(oldScale);
                var pngFile;
                if (boxNode.getName() == "box_0")
                {
                    pngFile = "KaiFangMoney/kaixiang_1.png";
                }
                else if (boxNode.getName() == "box_1")
                {
                    pngFile = "KaiFangMoney/kaixiang_2.png";
                }
                else if (boxNode.getName() == "box_2")
                {
                    pngFile = "KaiFangMoney/kaixiang_3.png";
                }
                else if (boxNode.getName() == "box_3")
                {
                    pngFile = "KaiFangMoney/kaixiang_4.png";
                }

                boxNode.loadTexture(pngFile);
                boxNode.ignoreContentAdaptWithSize(true);
            }
            else if (status == 0)//未领取
            {
                boxNode.runAction(cc.sequence(cc.scaleTo(0.5, oldScale*1.2), cc.scaleTo(0.5, oldScale)).repeatForever());
            }
        };


        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.getUserCreateRoomInfo",{},
            function(rtn)
            {
                MjClient.unblock();
                if (rtn.code == 0)
                {
                    var curCreateNum = parseInt(rtn.data.createNum);
                    _openTime.setString(curCreateNum);

                    var percent = 0;
                    var lastNum = 0;
                    for (var i=0; i<createRoomConfig.length; i++)
                    {
                        var num = parseInt(createRoomConfig[i].count);
                        if (curCreateNum <= num)
                        {
                            var kuadu = num - lastNum;
                            var duoyu = curCreateNum - lastNum;
                            percent += (duoyu/kuadu*100)*0.25;
                            break;
                        }
                        else
                        {
                            percent += 25;
                            lastNum = num;
                        }
                    }
                    _loadingBar.setPercent(percent);


                    if (percent >= 25)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_0");
                        if (rtn.data.createAward.length > 0)
                        {
                            setBoxNodeState(BoxNode, rtn.data.createAward[0].status);
                        }

                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang0");
                        BGLight.setVisible(false);
                    }
                    if (percent >= 50)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_1");
                        if (rtn.data.createAward.length > 1)
                        {
                            setBoxNodeState(BoxNode, rtn.data.createAward[1].status);
                        }

                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang1");
                        BGLight.setVisible(false);
                    }
                    if (percent >= 75)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_2");
                        if (rtn.data.createAward.length > 2)
                        {
                            setBoxNodeState(BoxNode, rtn.data.createAward[2].status);
                        }

                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang2");
                        BGLight.setVisible(false);
                    }
                    if (percent >= 100)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_3");
                        if (rtn.data.createAward.length > 3)
                        {
                            setBoxNodeState(BoxNode, rtn.data.createAward[3].status);
                        }

                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang3");
                        BGLight.setVisible(false);
                    }
                }
                else if (!cc.isUndefined(rtn.message))
                {
                    MjClient.showMsg(rtn.message);
                }
            });
    },

    init_renzheng:function(data)
    {
        var _back = this._bg_renzheng.getChildByName("back");

        /*
         输入姓名
         */
        var _nameBg = _back.getChildByName("xiaotanchuan_name");
        var _textFeildName0 = new cc.EditBox(cc.size(356,45), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
        _textFeildName0.setFontColor(cc.color(255,255,255));
        _textFeildName0.setMaxLength(10);
        _textFeildName0.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        _textFeildName0.setPlaceHolder("点击输入");
        _textFeildName0.setPosition(_nameBg.getContentSize().width/2, _nameBg.getContentSize().height/2);
        _nameBg.addChild(_textFeildName0);


        /*
         输入手机号
         */
        var _phoneNumBg = _back.getChildByName("xiaotanchuan_phoneNum");
        var _textFeildName1 = new cc.EditBox(cc.size(356,45), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
        _textFeildName1.setFontColor(cc.color(255,255,255));
        _textFeildName1.setMaxLength(11);
        _textFeildName1.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        _textFeildName1.setPlaceHolder("点击输入");
        _textFeildName1.setPosition(_phoneNumBg.getContentSize().width/2, _phoneNumBg.getContentSize().height/2);
        _phoneNumBg.addChild(_textFeildName1);


        /*
         输入验证码
         */
        var _codeNumBg = _back.getChildByName("xiaotanchuan_codeNum");
        var _textFeildName2 = new cc.EditBox(cc.size(200,45), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
        _textFeildName2.setFontColor(cc.color(255,255,255));
        _textFeildName2.setMaxLength(6);
        _textFeildName2.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        _textFeildName2.setPlaceHolder("点击输入");
        _textFeildName2.setPosition(_codeNumBg.getContentSize().width/2, _codeNumBg.getContentSize().height/2);
        _codeNumBg.addChild(_textFeildName2);

        var _Text_desc = _back.getChildByName("Text_desc");
        _Text_desc.setString(""+data.content);


        /*
         获取验证码
         */
        var _Btn_getCode = _back.getChildByName("Btn_getCode");
        _Btn_getCode.addTouchEventListener(function (sender, type) {
            if (type == 2)
            {
                var str = _textFeildName1.getString();
                cc.log("输入的手机号为  =  " + str);
                if (str.length != 11)
                {
                    MjClient.showToast("请输入完整的手机号");
                    return;
                }

                _Btn_getCode.setTouchEnabled(false);
                _Btn_getCode.setBright(false);

                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.getVerifyCode",{mobile_num:str},
                    function(rtn)
                    {
                        MjClient.unblock();
                        if (rtn.message)
                        {
                            MjClient.showToast(rtn.message);
                        }

                        if (rtn.code == 0)
                        {
                            MjClient.getVerifyCodeTime = new Date().getTime();
                        }
                        else
                        {
                            _Btn_getCode.setTouchEnabled(true);
                            _Btn_getCode.setBright(true);
                        }
                    });
            }
        },this);



        /*
         倒计时
         */
        var _timeDes = _back.getChildByName("Text_time");
        _timeDes.ignoreContentAdaptWithSize(true);
        if (cc.isUndefined(MjClient.getVerifyCodeTime))
        {
            MjClient.getVerifyCodeTime = 0;
        }
        _timeDes.schedule(function()
        {
            var time = (new Date().getTime()) - MjClient.getVerifyCodeTime;
            time = parseInt(time/1000);
            if (time >= 60)
            {
                _Btn_getCode.setTouchEnabled(true);
                _Btn_getCode.setBright(true);
                _timeDes.setVisible(false);
            }
            else
            {
                _Btn_getCode.setTouchEnabled(false);
                _Btn_getCode.setBright(false);
                _timeDes.setVisible(true);
                _timeDes.setString((60-time).toString() + "秒后可再次获取");
            }
        });


        /*
         绑定
         */
        var _Btn_Ok = _back.getChildByName("Btn_Ok");
        _Btn_Ok.addTouchEventListener(function (sender, type) {
            if (type == 2)
            {
                var str0 = _textFeildName0.getString();
                cc.log("输入的姓名为  =  " + str0);
                if (str0.length <= 0)
                {
                    MjClient.showToast("请输入您的真实姓名");
                    return;
                }


                var str1 = _textFeildName1.getString();
                cc.log("输入的手机号为  =  " + str1);
                if (str1.length != 11)
                {
                    MjClient.showToast("请输入完整的手机号");
                    return;
                }

                var str2 = _textFeildName2.getString();
                cc.log("输入的验证码为  =  " + str2);
                if (str2.length != 6)
                {
                    MjClient.showToast("请输入完整的验证码");
                    return;
                }
                var that = this;
                _Btn_Ok.setTouchEnabled(false);
                _Btn_Ok.setBright(false);

                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.checkVerifyCode",{real_name:str0, mobile_num:str1, verify_code:str2},
                    function(rtn)
                    {
                        MjClient.unblock();
                        if (rtn.message)
                        {
                            MjClient.showToast(rtn.message);
                        }

                        if (rtn.code == 0)
                        {
                            that.initList();
                        }
                        else
                        {
                            _Btn_Ok.setTouchEnabled(true);
                            _Btn_Ok.setBright(true);
                        }
                    });
                MjClient.native.umengEvent4CountWithProperty("HuodongRenzhengClick", {uid:SelfUid(), name:str0, mobile:str1});
            }
        }, this);
    },

    init_jianyi:function ()
    {
        var back = this._bg_jianyi.getChildByName("back");
        var jianjiEditBox = new cc.EditBox(cc.size(810, 320), new cc.Scale9Sprite());
        jianjiEditBox.setFontColor(cc.color(0, 0, 0));
        jianjiEditBox.setPlaceholderFontColor(cc.color(128, 128, 128));
        jianjiEditBox.setMaxLength(300);
        jianjiEditBox.setFontSize(24);
        jianjiEditBox.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        jianjiEditBox.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        jianjiEditBox.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        jianjiEditBox.setPlaceHolder("点击输入投诉建议内容");
        jianjiEditBox.setPlaceholderFontSize(24);
        jianjiEditBox.setPosition(435, 272);
        back.addChild(jianjiEditBox);

        var send = back.getChildByName("send");
        send.addTouchEventListener(function (sender, type) {
            if (type != ccui.Widget.TOUCH_ENDED)
                return;
            MjClient.native.umengEvent4CountWithProperty("Huodong_Youxigonggao_Tousujianyi_Fasong", {uid:SelfUid()});
            var content = jianjiEditBox.getString();
            if (content.length < 10) {
                MjClient.showToast("投诉建议内容少于10个字符！");
                return;
            }

            MjClient.block();
            cc.log("投诉建议:" + content);
            MjClient.gamenet.request("pkplayer.handler.addSuggest",{content:escape(content)},function(rtn){
                if(rtn.code==0)
                {
                    jianjiEditBox.setString("");
                    MjClient.showToast("发送投诉建议成功");
                }
                else
                {
                    if (rtn.message)
                        MjClient.showToast(rtn.message);
                    else
                        MjClient.showToast("发送投诉建议失败");
                }
                MjClient.unblock();
            });
        }, this);
    },

    init_double11:function (data) {
        cc.log("wxd.....data."+JSON.stringify(data));
        var back = this._bg_double_11.getChildByName("back");
        back.addTouchEventListener(function (sender, type) {
            if (type != ccui.Widget.TOUCH_ENDED)
                return;
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.openBrowser", {type :18},
                function(rtn) {
                    MjClient.unblock();
                    cc.log(" ===== pkplayer.handler.openBrowser === " + JSON.stringify(rtn));
                    if (rtn.code == 0) {
                        if(rtn.data){
                            MjClient.Scene.addChild(new DaiLiWebviewLayer(rtn.data));
                        }
                    } else {
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        }
                    }
                }
            );
        }, this);
    },

    init_screenTime:function (data) {
        cc.log("wxd.....data."+JSON.stringify(data));
    },



    refleshKaiFangGiftStatus:function()
    {
        var _btnKaiFangGift = this._avtivList.getChildByTag(MjClient.ACTIVITY_TYPE.KAI_FANG);
        if (!_btnKaiFangGift)
            return;
        cc.log("pkplayer.handler.getUserCreateRoomInfo");
        MjClient.gamenet.request("pkplayer.handler.getUserCreateRoomInfo",{},
            function(rtn)
            {
                if (rtn.code == 0)
                {
                    var canGet = false;
                    for (var i=0; i<rtn.data.createAward.length; i++)
                    {
                        if (rtn.data.createAward[i].status == 0)
                        {
                            cc.log("can get ");
                            canGet = true;
                            break;
                        }
                    }
                    if (canGet)
                    {
                        var _sprite = _btnKaiFangGift.getChildByName("hongdian");
                        if(!_sprite)
                        {
                            _sprite = new cc.Sprite("hall/hongdian.png");
                            _sprite.setScale(0.7);
                            _sprite.setName("hongdian");
                            _sprite.setPosition(13.5, 65);
                            _btnKaiFangGift.addChild(_sprite);
                        }
                    }
                    else
                    {
                        var _sprite = _btnKaiFangGift.getChildByName("hongdian");
                        if(_sprite)
                        {
                            _sprite.removeFromParent();
                        }
                    }
                }
            });
    },
    refleshChangCiGiftStatus:function()
    {
        var _btnChangCiGift = this._avtivList.getChildByTag(MjClient.ACTIVITY_TYPE.DUI_ZHAN);
        if (!_btnChangCiGift)
            return;

        cc.log("=====refleshChangCiGiftStatus=====");
        MjClient.gamenet.request("pkplayer.handler.getUserPlayGameInfo",{},
            function(rtn)
            {
                if (rtn.code == 0)
                {
                    var canGet = false;
                    for (var i=0; i<rtn.data.playAward.length; i++)
                    {
                        if (rtn.data.playAward[i].status == 0)
                        {

                            canGet = true;
                            break;
                        }
                    }
                    if (canGet)
                    {
                        var _sprite = _btnChangCiGift.getChildByName("hongdian");
                        if(!_sprite)
                        {
                            _sprite = new cc.Sprite("hall/hongdian.png");
                            _sprite.setScale(0.7);
                            _sprite.setName("hongdian");
                            _sprite.setPosition(13.5, 65);
                            _btnChangCiGift.addChild(_sprite);
                        }
                    }
                    else
                    {
                        var _sprite = _btnChangCiGift.getChildByName("hongdian");
                        if(_sprite)
                        {
                            _sprite.removeFromParent();
                        }
                    }
                }
            });
    },


    setCloseCallback:function(callback)
    {
        this._closeCallback = callback;
    }
});

var activityLayer_QXYYQP = cc.Layer.extend({
    _closeCallback:null,

    _bg_shouchong:null,
    _bg_duizhan:null,
    _bg_kaifang:null,
    _bg_tuijian:null,
    _bg_renzheng:null,
    _bg_xianshi:null,
    _bg_fenxiang:null,
    _avtivList:null,
    _btnNode:null,

    _isUseUIv3:null,

    _currentType:0,//0 活动列表，1 表示公告列表

    ctor:function () {
        this._super();
        
        this._isUseUIv3 = MjClient.isUseUIv3 && MjClient.isUseUIv3();
        if(this._isUseUIv3){
            var UI = ccs.load("ActivityLayer_3.0.json");
        }
        else {
            var UI = ccs.load("ActivityLayer.json");
        }
        
        this.addChild(UI.node);
        var that = this;
        this._xianshiImageIndex = 0;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        var _back = UI.node.getChildByName("back");
        if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            setWgtLayout(_back,[0.9, 0.9], [0.5, 0.4836], [0, 0]);
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
            setWgtLayout(_back,[1, 1], [0.5, 0.5], [0, 0]);
        }
        else {
            if(isIPhoneX())
                setWgtLayout(_back,[0.85, 0.85], [0.5, 0.4], [0, 0]);
            else
                setWgtLayout(_back,[0.9, 0.9], [0.5, 0.42], [0, 0]);
        }

        if(this._isUseUIv3){
            setWgtLayout(_back,[1, 1], [0.5, 0.5], [0, 0]);
        }

        var _suizi = _back.getChildByName("suizi");
        cc.log("======================suisuizi=======================");
        //穗子动画
        if(_suizi) 
            COMMON_UI.suiziAni(_suizi,8);
        else
            COMMON_UI.popDialogAni(_back);

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent();
                if (this._closeCallback)
                {
                    this._closeCallback();
                }
                MjClient.native.umengEvent4CountWithProperty("Huodong_Tuichu", {uid:SelfUid()});
            }
        }, this);


        this. _avtivList = _back.getChildByName("avtivList");
        this._avtivList.setScrollBarEnabled(false);
        this._avtivList.removeAllChildren();

        this._btnNode = _back.getChildByName("btnNode");
        this._btnNode.visible = false;


        this._bg_xianshi   = _back.getChildByName("bg_xianshi");
        this._bg_shouchong = _back.getChildByName("bg_shouchong");
        this._bg_duizhan   = _back.getChildByName("bg_duizhan");
        this._bg_kaifang   = _back.getChildByName("bg_kaifang");
        this._bg_tuijian   = _back.getChildByName("bg_tuijian");
        this._bg_renzheng  = _back.getChildByName("bg_renzheng");
        this._bg_fenxiang  = _back.getChildByName("bg_fenxiang");
        this._bg_zhenqing  = _back.getChildByName("bg_zhenqing");
        this._bg_monthRecharge   = _back.getChildByName("bg_monthRechage");

        this._bg_waigua  = _back.getChildByName("bg_fanwaigua");
        this._bg_gengxin  = _back.getChildByName("bg_gengxin");
        this._bg_dubo  = _back.getChildByName("bg_dubo");
        this._bg_jianyi = _back.getChildByName("bg_jianyi");
        this._bg_yuanbaoDuizuanshi = _back.getChildByName("bg_yuanbaoDuizuanshi");
        this._bg_double_11 = _back.getChildByName("bg_double_11");
        this._bg_screenTime = _back.getChildByName("bg_screenTime");

        // 列表数据
        this.showActivieList = MjClient.systemConfig.activity.activity;
        this.showNoticeList = MjClient.systemConfig.activity.notice;
        var listAll = this.showActivieList.concat(this.showNoticeList);

        //初始化活动列表
        this.initList(listAll);

        cc.log("-------------this.showActivieList-- =111111111111111111122 " + JSON.stringify(listAll));

        //初始化
        this.initBgNode(listAll);
    },

    initBgNode:function(activityList)
    {
        for (var i=0; i<activityList.length; i++)
        {
            switch (activityList[i].type)
            {
                case MjClient.ACTIVITY_TYPE.DUI_ZHAN:
                    this.init_duizhan(activityList[i]);
                    this.refleshChangCiGiftStatus();
                    break;
                case MjClient.ACTIVITY_TYPE.KAI_FANG:
                    this.init_kaifang(activityList[i]);
                    this.refleshKaiFangGiftStatus();
                    break;
                case MjClient.ACTIVITY_TYPE.REN_ZHENG:
                    this.init_renzheng(activityList[i]);
                    break;
                case MjClient.ACTIVITY_TYPE.JIAN_YI:
                    this.init_jianyi();
                    break;
                case MjClient.ACTIVITY_TYPE.YUANBAO_DUIHUAN_ZUANSHI:
                    this.init_yuanbaoDuihuanzuanshi(activityList[i]);
                    break;
                case MjClient.ACTIVITY_TYPE.DOUBLE_11:
                    this.init_double11(activityList[i]);
                    break;
                case MjClient.ACTIVITY_TYPE.SCREEN_TIME:
                    this.init_screenTime(activityList[i]);
                    break;
            }
        }
    },
    initList:function(activityList)
    {
        this._avtivList.removeAllChildren();
        
        activityList = activityList || [];
        for(var i = 0;i < activityList.length ; i++)
        {
            if(activityList[i].type == MjClient.ACTIVITY_TYPE.REN_ZHENG &&
                MjClient.data.pinfo.mobileNum &&
                MjClient.data.pinfo.mobileNum.toString().length == 11)
            {
                continue;
            }

            if(MjClient.isShenhe && i == 0){
                continue;
            }

            var btn = this._btnNode.clone();
            btn.visible = true;
            btn.loadTextureNormal("hall/activity_btn_2.png");
            if(this._isUseUIv3){
                btn.loadTextureNormal("hall/activity_btn_3.png");
            }
            btn.setTag(activityList[i].type);
            btn.setUserData(activityList[i]);
            btn.addTouchEventListener(function (sender,type)
            {
                if (type == 2) {
                    this.updateTouchActivityType(sender,true);
                }
            },this);
            btn.setPressedActionEnabled(false);
            var title = new ccui.Text();
            title.setFontName("fonts/lanting.ttf");
            title.setString(""+activityList[i].title);
            // title.setColor(cc.color.WHITE);
            title.setColor(cc.color("#fefefe"));
            title.setName("title");
            title.setFontSize(30);

            // if (activityList[i].title.length>4)
            // {
            //     title.setFontSize(32);
            // }
            // else
            // {
            //     title.setFontSize(36);
            // }

            title.setPosition(btn.getContentSize().width/2, btn.getContentSize().height/2);
            title.enableOutline(cc.color("#af550c"), 2);

            btn.addChild(title);
            this._avtivList.pushBackCustomItem(btn);
        }

        this.updateTouchActivityType(this._avtivList.getItem(0));
    },


    updateTouchActivityType:function(btnNode,isClick)
    {
        this._bg_shouchong.visible = false;
        this._bg_duizhan.visible = false;
        this._bg_kaifang.visible = false;
        this._bg_tuijian.visible = false;
        this._bg_renzheng.visible = false;
        this._bg_monthRecharge.visible = false;
        this._bg_xianshi.visible = false;
        if(this._bg_zhenqing)
            this._bg_zhenqing.visible = false;
        if (this._bg_fenxiang)
            this._bg_fenxiang.visible = false;

        this._bg_waigua.visible = false;
        this._bg_gengxin.visible = false;
        this._bg_dubo.visible = false;
        this._bg_jianyi.visible = false;
        if(this._bg_yuanbaoDuizuanshi){
            this._bg_yuanbaoDuizuanshi.visible = false;
        }
        if(this._bg_double_11){
            this._bg_double_11.visible = false;
        }
        if(this._bg_screenTime){
            this._bg_screenTime.visible = false;
        }
        var path = "hall/";

        for(var i = 0; i < this._avtivList.getItems().length ; i++)
        {
            this._avtivList.getItem(i).loadTextureNormal(path + "activity_btn_2.png");
            if(this._isUseUIv3){
                this._avtivList.getItem(i).loadTextureNormal(path + "activity_btn_3.png");
            }
            var title = this._avtivList.getItem(i).getChildByName("title");
            title.setColor(cc.color("#77390a"));
            title.enableOutline(cc.color(255,255,255,0), 2); // 设置透明，去掉描边
            title.setPosition(this._avtivList.getItem(i).getContentSize().width/2, this._avtivList.getItem(i).getContentSize().height/2);
        }
        if (!btnNode) return;
        btnNode.loadTextureNormal(path + "activity_btn_1.png");
        if(this._isUseUIv3){
            btnNode.loadTextureNormal(path + "activity_btn_4.png");
        }
        var title = btnNode.getChildByName("title");
        title.setColor(cc.color("#fefefe"));
        title.enableOutline(cc.color("#af550c"), 2);
        title.setPosition(btnNode.getContentSize().width/2, btnNode.getContentSize().height/2);

        var activityData = btnNode.getUserData();
        cc.log("===== type =33333333333333  " + activityData.type);
        if(isClick){
            if ("推荐代理奖" == activityData.title){
                MjClient.native.umengEvent4CountWithProperty("Huodong_Jingcaihuodong_Tuijiandailijiang", {uid:SelfUid()});
            }
            if ("好评有礼" == activityData.title){
                MjClient.native.umengEvent4CountWithProperty("Huodong_Jingcaihuodong_Haopingyouli", {uid:SelfUid()});
            }
            if ("外挂悬赏" == activityData.title){
                MjClient.native.umengEvent4CountWithProperty("Huodong_Youxigonggao_Waiguaxuanshang", {uid:SelfUid()});
            }
        }

        switch (activityData.type)
        {
            case MjClient.ACTIVITY_TYPE.WEN_ZI:
                this._bg_dubo.visible = true;
                this.init_wenzi(activityData);
                break;
            case MjClient.ACTIVITY_TYPE.TU_PIAN:
                this._bg_xianshi.visible = true;
                this.init_tupian(activityData);
                break;
            case MjClient.ACTIVITY_TYPE.MONTH_RECHARGE:
                this._bg_monthRecharge.visible = true;
                this.init_monthRecharge(activityData);
                break;
            case MjClient.ACTIVITY_TYPE.DUI_ZHAN:
                this._bg_duizhan.visible = true;
                break;
            case MjClient.ACTIVITY_TYPE.KAI_FANG:
                this._bg_kaifang.visible = true;
                break;
            case MjClient.ACTIVITY_TYPE.REN_ZHENG:
                this._bg_renzheng.visible = true;
                break;
            case MjClient.ACTIVITY_TYPE.JIAN_YI:
                this._bg_jianyi.visible = true;
                if (isClick){
                    MjClient.native.umengEvent4CountWithProperty("Huodong_Youxigonggao_Tousujianyi", {uid:SelfUid()});
                }
                break;
            case MjClient.ACTIVITY_TYPE.YUANBAO_DUIHUAN_ZUANSHI:
                this._bg_yuanbaoDuizuanshi.visible = true;
                break;
            case MjClient.ACTIVITY_TYPE.DOUBLE_11:
                this._bg_double_11.visible = true;
                break;
            case MjClient.ACTIVITY_TYPE.SCREEN_TIME:
                this._bg_screenTime.visible = true;
                break;
        }
    },

    setAction:function(node, data)
    {
        if (!node) return;
        switch (data.action)
        {
            case MjClient.ACTIVITY_ACTION_TYPE.SHANG_CHENG:
                node.setTouchEnabled(true);
                node.addTouchEventListener(function (sender, type)
                {
                    if (type == 2)
                    {
                        if (MjClient.data.pinfo.myMemberLevel > 0)//正式代理
                        {
                            MjClient.gamenet.request("pkplayer.handler.openBrowser", { type: 6 }, function (rtn) {
                                if (rtn.code == 0) {
                                    MjClient.native.OpenUrl(rtn.data);
                                }
                                else {
                                    if (rtn.message) {
                                        MjClient.showToast(rtn.message);
                                    }
                                    else {
                                        MjClient.showToast("获取数据失败，请重试");
                                    }
                                }
                            });
                        }
                        else
                        {
                            if(!MjClient.rechargeLadder || MjClient.rechargeLadder.length == 0)
                            {
                                var _gongzhognhao = ""+MjClient.systemConfig.gongzhonghao;
                                MjClient.showMsg("添加微信公众号:" + _gongzhognhao + " 进行充值\n点击\"确定\"按钮即可复制微信公众号。",
                                    function(){
                                        MjClient.showToast("复制公众号成功,前往微信添加公众号！");
                                        MjClient.native.doCopyToPasteBoard("" +_gongzhognhao );
                                        MjClient.native.openWeixin();
                                    });
                            }
                            else
                            {
                                var layer = enter_store();
                                MjClient.Scene.addChild(layer);
                            }
                        }
                    }
                }, this);
                break;
            case MjClient.ACTIVITY_ACTION_TYPE.WEB_VIEW:
                node.setTouchEnabled(true);
                node.addTouchEventListener(function (sender, type)
                {
                    if (type == 2)
                    {
                        MjClient.native.OpenUrl(data.target);
                    }
                }, this);
                break;
            case MjClient.ACTIVITY_ACTION_TYPE.FEN_XIANG:
                node.setTouchEnabled(false);
                break;
            case MjClient.ACTIVITY_ACTION_TYPE.NONE:
                node.setTouchEnabled(false);
                break;
            case MjClient.ACTIVITY_ACTION_TYPE.WEB_VIEW_INSIDE:
                node.setTouchEnabled(true);
                node.addTouchEventListener(function (sender, type)
                {
                    if (type == 2)
                    {
                        MjClient.Scene.addChild(new NormalWebviewLayer(data.target));
                    }
                }, this);
                break;
            case MjClient.ACTIVITY_ACTION_TYPE.BI_SAI:
                node.setTouchEnabled(true);
                node.addTouchEventListener(function (sender, type)
                {
                    if (type == 2)
                    {
                        MjClient.Scene.addChild(new playgroundLayer());
                    }
                }, this);
                break;
            case MjClient.ACTIVITY_ACTION_TYPE.OPEN_BROWSER:
                node.setTouchEnabled(true);
                node.addTouchEventListener(function (sender, type)
                {
                    if (type == 2)
                    {
                        MjClient.block();
                        MjClient.gamenet.request("pkplayer.handler.openBrowser", { type: data.target }, function (rtn) {
                            MjClient.unblock();
                            if (rtn.code == 0) {
                                MjClient.native.OpenUrl(rtn.data);
                            }
                            else {
                                if (rtn.message) {
                                    MjClient.showToast(rtn.message);
                                }
                                else {
                                    MjClient.showToast("获取数据失败，请重试");
                                }
                            }
                        });
                    }
                }, this);
                break;
            case MjClient.ACTIVITY_ACTION_TYPE.OPEN_ZHIFUBAO_HONGBAO:
                node.setTouchEnabled(true);
                node.addTouchEventListener(function (sender, type)
                {
                    if (type == 2)
                    {
                        cc.log("wxd............");
                        MjClient.Scene.addChild(new alipayRedPaketLayer());
                        MjClient.block();
                        MjClient.gamenet.request("pkplayer.handler.clickStatistics", {type:1}, function (rtn) {
                            MjClient.unblock();
                            if (rtn.code == 0) {

                            }
                            else {
                                if (rtn.message) {
                                    MjClient.showToast(rtn.message);
                                }
                                else {
                                    MjClient.showToast("统计失败");
                                }
                            }
                        });
                    }
                }, this);
                break;
            default :
                node.setTouchEnabled(false);
                break;
        }
    },


    init_wenzi:function(data)
    {
        var _back = this._bg_dubo.getChildByName("back");
        var cont_us = _back.getChildByName("cont_us");
        cont_us.visible = true;
        cont_us.setString(""+data.content);

        this.setAction(this._bg_dubo, data);
    },

    init_tupian:function(data)
    {
        var ImageNode = this._bg_xianshi.getChildByName("Image_1");
        cc.loader.loadImg(""+data.content, {isCrossOrigin : true}, function(err,img){
            if (!err && img && cc.sys.isObjectValid(ImageNode))
            {
                ImageNode.setTexture(img);
            }
        });

        this.setAction(this._bg_xianshi, data);
    },

    init_monthRecharge:function(data)
    {
        var ImageNode = this._bg_monthRecharge.getChildByName("Image_1");
        cc.loader.loadImg(""+data.content, {isCrossOrigin : true}, function(err,img){
            if (!err && img && cc.sys.isObjectValid(ImageNode))
            {
                ImageNode.setTexture(img);
            }
        });

        this.setAction(this._bg_monthRecharge, data);
    },

    init_duizhan:function(data)
    {
        var _back = this._bg_duizhan.getChildByName("back");

        if (!MjClient.activityConfig || MjClient.isShenhe )
        {
            //MjClient.getActivityConfig();
            _back.setVisible(false);
            return;
        }



        var playGameConfig = MjClient.activityConfig.playGame;
        if(!playGameConfig) {
            cc.log('error init_duizhan MjClient.activityConfig.playGame is null')
            return;
        }

        /*
         说明描述
         */
        var _Text_desc = _back.getChildByName("Text_dec");
        _Text_desc.setString(""+data.content);

        var that = this;
        var boxClickCallback = function(sender)
        {
            if (cc.isUndefined(sender.status))
            {
                MjClient.showToast("宝箱不可领取");
                return;
            }
            else if (sender.status == 1)
            {
                MjClient.showToast("宝箱已经领取过了");
                return;
            }

            MjClient.gamenet.request("pkplayer.handler.activityAward",{activityType:"playGame", count:parseInt(sender.getTag())},
                function(rtn)
                {
                    cc.log(" ======= pkplayer.handler.activityAward :",JSON.stringify(rtn));
                    if (rtn.code == 0)
                    {
                        var number = 0;
                        for (var i = 0; i < playGameConfig.length; i++) {
                            if(playGameConfig[i].count == parseInt(sender.getTag()))
                                number = i;
                        }
                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang" + number);
                        setBoxNodeState(sender, 1,BGLight);
                        that.refleshChangCiGiftStatus();
                        var data = {type : 1, id : playGameConfig[number].id, award : playGameConfig[number].award};
                        that.addChild(new duizhan_shareLayer(data), 5);
                    }

                    if (!cc.isUndefined(rtn.message))
                    {
                        MjClient.showToast(rtn.message);
                    }
                });
        };


        for(var i = 0;i< 5; i++)
        {
            var BoxNode = _back.getChildByName("Image_1").getChildByName("box_" + i);
            BoxNode.setTouchEnabled(true);
            BoxNode.addClickEventListener(boxClickCallback);
            BoxNode.setTag(parseInt(playGameConfig[i].count));
            BoxNode.setUserData(BoxNode.getScale());
            if (BoxNode.getChildByName("mark")) BoxNode.getChildByName("mark").setVisible(false);

            var _time = BoxNode.getChildByName("time");
            var num = parseInt(playGameConfig[i].count);
            _time.setString(num + "次");
            _time.ignoreContentAdaptWithSize(true);
            var _money = BoxNode.getChildByName("money");
            _money.setString(parseInt(playGameConfig[i].award) + "元宝");
            _money.ignoreContentAdaptWithSize(true);


            var BGLight =  _back.getChildByName("Image_1").getChildByName("guang" + i);
            var act_1 = cc.callFunc(function(){
                BGLight.setRotation(10);
            });
            var act_3 = cc.callFunc(function(){
                BGLight.setRotation(0);
            });
            var act_2 = cc.blink(1,2);
            var act_4 = cc.delayTime(0.5);
            BGLight.runAction(cc.spawn(cc.sequence(act_1,act_4,act_3,act_4),act_2).repeatForever());
            BGLight.setOpacity(0);

        }


        //当前开放次数
        var _openTime =  _back.getChildByName("Text_1");
        _openTime.setString(0);
        _openTime.ignoreContentAdaptWithSize(true);


        //进度条
        var _loadingBar = _back.getChildByName("Image_1").getChildByName("LoadingBar_1");
        _loadingBar.setPercent(0);

        var setBoxNodeState = function(boxNode, status, light)
        {
            boxNode.status = status;
            if (status == 1) {//已领取
                if (boxNode.getChildByName("mark")) boxNode.getChildByName("mark").setVisible(true);
                light.setOpacity(0);
            }else if(status == 0){//未领取
                if (boxNode.getChildByName("mark")) boxNode.getChildByName("mark").setVisible(false);
                light.setOpacity(255);
            }
            
        };
        var _Btn_open = _back.getChildByName("Btn_open");
        if (_Btn_open)
        {
            _Btn_open.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    postEvent("createRoom",{});
                    this.removeFromParent();
                }
            }, this);
        }



        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.getUserPlayGameInfo",{},
            function(rtn)
            {
                MjClient.unblock();
                if (rtn.code == 0)
                {
                    var curPlayNum = parseInt(rtn.data.playNum);
                    _openTime.setString(curPlayNum);

                    var percent = 0;
                    var lastNum = 0;
                    for (var i=0; i<playGameConfig.length; i++)
                    {
                        var num = parseInt(playGameConfig[i].count);
                        if (curPlayNum <= num)
                        {
                            var kuadu = num - lastNum;
                            var duoyu = curPlayNum - lastNum;
                            percent += (duoyu/kuadu*100)*0.2;
                            break;
                        }
                        else
                        {
                            percent += 20;
                            lastNum = num;
                        }
                    }
                    for (var i = 0; i < rtn.data.playAward.length; i++) {
                        playGameConfig[i].id = rtn.data.playAward[i].id;
                    }
                    _loadingBar.setPercent(percent);


                    if (percent >= 20)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_0");
                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang0");
                        if (rtn.data.playAward.length > 0)
                        {
                            setBoxNodeState(BoxNode, rtn.data.playAward[0].status,BGLight);
                        }

                    }
                    if (percent >= 40)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_1");
                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang1");
                        if (rtn.data.playAward.length > 1)
                        {
                            setBoxNodeState(BoxNode, rtn.data.playAward[1].status,BGLight);
                        }
                    }
                    if (percent >= 60)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_2");
                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang2");
                        if (rtn.data.playAward.length > 2)
                        {
                            setBoxNodeState(BoxNode, rtn.data.playAward[2].status,BGLight);
                        }
                    }
                    if (percent >= 80)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_3");
                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang3");
                        if (rtn.data.playAward.length > 3)
                        {
                            setBoxNodeState(BoxNode, rtn.data.playAward[3].status,BGLight);
                        }

                    }
                    if (percent >= 100)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_4");
                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang4");
                        if (rtn.data.playAward.length > 4)
                        {
                            setBoxNodeState(BoxNode, rtn.data.playAward[4].status,BGLight);
                        }
                    }
                }
                else if (!cc.isUndefined(rtn.message))
                {
                    MjClient.showMsg(rtn.message);
                }
            });
    },

    init_kaifang:function(data) // 开房 活动
    {
        var _back = this._bg_kaifang.getChildByName("back");
        if (!MjClient.activityConfig)
        {
            //MjClient.getActivityConfig();
            _back.setVisible(false);
            return;
        }

        var createRoomConfig = MjClient.activityConfig.createRoom;
        /*
         说明描述
         */
        var _Text_desc = _back.getChildByName("Text_dec");
        _Text_desc.setString(""+data.content);

        var that = this;
        var boxClickCallback = function(sender)
        {
            if (cc.isUndefined(sender.status))
            {
                MjClient.showToast("宝箱不可领取");
                return;
            }
            else if (sender.status == 1)
            {
                MjClient.showToast("宝箱已经领取过了");
                return;
            }

            MjClient.gamenet.request("pkplayer.handler.activityAward",{activityType:"createRoom", count:parseInt(sender.getTag())},
                function(rtn)
                {
                    if (rtn.code == 0)
                    {
                        setBoxNodeState(sender, 1);
                        that.refleshKaiFangGiftStatus();
                    }

                    if (!cc.isUndefined(rtn.message))
                    {
                        MjClient.showToast(rtn.message);
                    }
                });
        };


        for(var i = 0;i< 4; i++)
        {
            var BoxNode = _back.getChildByName("Image_1").getChildByName("box_" + i);
            BoxNode.setTouchEnabled(true);
            BoxNode.addClickEventListener(boxClickCallback);
            BoxNode.setTag(parseInt(createRoomConfig[i].count));
            BoxNode.setUserData(BoxNode.getScale());

            var _time = BoxNode.getChildByName("time");
            var num = parseInt(createRoomConfig[i].count);
            _time.setString(num + "次");
            _time.ignoreContentAdaptWithSize(true);
            var _money = BoxNode.getChildByName("money");
            _money.setString(parseInt(createRoomConfig[i].award) + "元宝");
            _money.ignoreContentAdaptWithSize(true);


            var BGLight =  _back.getChildByName("Image_1").getChildByName("guang" + i);
            BGLight.runAction(cc.rotateBy(10,360).repeatForever());
        }



        //当前开放次数
        var _openTime =  _back.getChildByName("Text_1");
        _openTime.setString(0);
        _openTime.ignoreContentAdaptWithSize(true);


        //进度条
        var _loadingBar = _back.getChildByName("Image_1").getChildByName("LoadingBar_1");
        _loadingBar.setPercent(0);



        var _Btn_open = _back.getChildByName("Btn_open");
        _Btn_open.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                postEvent("createRoom",{});
                this.removeFromParent();
            }
        }, this);



        var setBoxNodeState = function(boxNode, status)
        {
            boxNode.status = status;
            var oldScale = boxNode.getUserData();
            if (status == 1)//已领取
            {
                boxNode.stopAllActions();
                boxNode.setScale(oldScale);
                var pngFile;
                if (boxNode.getName() == "box_0")
                {
                    pngFile = "KaiFangMoney/kaixiang_1.png";
                }
                else if (boxNode.getName() == "box_1")
                {
                    pngFile = "KaiFangMoney/kaixiang_2.png";
                }
                else if (boxNode.getName() == "box_2")
                {
                    pngFile = "KaiFangMoney/kaixiang_3.png";
                }
                else if (boxNode.getName() == "box_3")
                {
                    pngFile = "KaiFangMoney/kaixiang_4.png";
                }

                boxNode.loadTexture(pngFile);
                boxNode.ignoreContentAdaptWithSize(true);
            }
            else if (status == 0)//未领取
            {
                boxNode.runAction(cc.sequence(cc.scaleTo(0.5, oldScale*1.2), cc.scaleTo(0.5, oldScale)).repeatForever());
            }
        };


        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.getUserCreateRoomInfo",{},
            function(rtn)
            {
                MjClient.unblock();
                if (rtn.code == 0)
                {
                    var curCreateNum = parseInt(rtn.data.createNum);
                    _openTime.setString(curCreateNum);

                    var percent = 0;
                    var lastNum = 0;
                    for (var i=0; i<createRoomConfig.length; i++)
                    {
                        var num = parseInt(createRoomConfig[i].count);
                        if (curCreateNum <= num)
                        {
                            var kuadu = num - lastNum;
                            var duoyu = curCreateNum - lastNum;
                            percent += (duoyu/kuadu*100)*0.25;
                            break;
                        }
                        else
                        {
                            percent += 25;
                            lastNum = num;
                        }
                    }
                    _loadingBar.setPercent(percent);


                    if (percent >= 25)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_0");
                        if (rtn.data.createAward.length > 0)
                        {
                            setBoxNodeState(BoxNode, rtn.data.createAward[0].status);
                        }

                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang0");
                        BGLight.setVisible(false);
                    }
                    if (percent >= 50)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_1");
                        if (rtn.data.createAward.length > 1)
                        {
                            setBoxNodeState(BoxNode, rtn.data.createAward[1].status);
                        }

                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang1");
                        BGLight.setVisible(false);
                    }
                    if (percent >= 75)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_2");
                        if (rtn.data.createAward.length > 2)
                        {
                            setBoxNodeState(BoxNode, rtn.data.createAward[2].status);
                        }

                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang2");
                        BGLight.setVisible(false);
                    }
                    if (percent >= 100)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_3");
                        if (rtn.data.createAward.length > 3)
                        {
                            setBoxNodeState(BoxNode, rtn.data.createAward[3].status);
                        }

                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang3");
                        BGLight.setVisible(false);
                    }
                }
                else if (!cc.isUndefined(rtn.message))
                {
                    MjClient.showMsg(rtn.message);
                }
            });
    },

    init_renzheng:function(data)
    {
        var _back = this._bg_renzheng.getChildByName("back");

        /*
         输入姓名
         */
        var _nameBg = _back.getChildByName("xiaotanchuan_name");
        var _textFeildName0 = new cc.EditBox(cc.size(356,45), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
        _textFeildName0.setFontColor(cc.color(255,255,255));
        _textFeildName0.setMaxLength(10);
        _textFeildName0.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        _textFeildName0.setPlaceHolder("点击输入");
        _textFeildName0.setPosition(_nameBg.getContentSize().width/2, _nameBg.getContentSize().height/2);
        _nameBg.addChild(_textFeildName0);


        /*
         输入手机号
         */
        var _phoneNumBg = _back.getChildByName("xiaotanchuan_phoneNum");
        var _textFeildName1 = new cc.EditBox(cc.size(356,45), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
        _textFeildName1.setFontColor(cc.color(255,255,255));
        _textFeildName1.setMaxLength(11);
        _textFeildName1.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        _textFeildName1.setPlaceHolder("点击输入");
        _textFeildName1.setPosition(_phoneNumBg.getContentSize().width/2, _phoneNumBg.getContentSize().height/2);
        _phoneNumBg.addChild(_textFeildName1);


        /*
         输入验证码
         */
        var _codeNumBg = _back.getChildByName("xiaotanchuan_codeNum");
        var _textFeildName2 = new cc.EditBox(cc.size(200,45), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
        _textFeildName2.setFontColor(cc.color(255,255,255));
        _textFeildName2.setMaxLength(6);
        _textFeildName2.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        _textFeildName2.setPlaceHolder("点击输入");
        _textFeildName2.setPosition(_codeNumBg.getContentSize().width/2, _codeNumBg.getContentSize().height/2);
        _codeNumBg.addChild(_textFeildName2);

        var _Text_desc = _back.getChildByName("Text_desc");
        _Text_desc.setString(""+data.content);


        /*
         获取验证码
         */
        var _Btn_getCode = _back.getChildByName("Btn_getCode");
        _Btn_getCode.addTouchEventListener(function (sender, type) {
            if (type == 2)
            {
                var str = _textFeildName1.getString();
                cc.log("输入的手机号为  =  " + str);
                if (str.length != 11)
                {
                    MjClient.showToast("请输入完整的手机号");
                    return;
                }

                _Btn_getCode.setTouchEnabled(false);
                _Btn_getCode.setBright(false);

                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.getVerifyCode",{mobile_num:str},
                    function(rtn)
                    {
                        MjClient.unblock();
                        if (rtn.message)
                        {
                            MjClient.showToast(rtn.message);
                        }

                        if (rtn.code == 0)
                        {
                            MjClient.getVerifyCodeTime = new Date().getTime();
                        }
                        else
                        {
                            _Btn_getCode.setTouchEnabled(true);
                            _Btn_getCode.setBright(true);
                        }
                    });
            }
        },this);



        /*
         倒计时
         */
        var _timeDes = _back.getChildByName("Text_time");
        _timeDes.ignoreContentAdaptWithSize(true);
        if (cc.isUndefined(MjClient.getVerifyCodeTime))
        {
            MjClient.getVerifyCodeTime = 0;
        }
        _timeDes.schedule(function()
        {
            var time = (new Date().getTime()) - MjClient.getVerifyCodeTime;
            time = parseInt(time/1000);
            if (time >= 60)
            {
                _Btn_getCode.setTouchEnabled(true);
                _Btn_getCode.setBright(true);
                _timeDes.setVisible(false);
            }
            else
            {
                _Btn_getCode.setTouchEnabled(false);
                _Btn_getCode.setBright(false);
                _timeDes.setVisible(true);
                _timeDes.setString((60-time).toString() + "秒后可再次获取");
            }
        });


        /*
         绑定
         */
        var _Btn_Ok = _back.getChildByName("Btn_Ok");
        _Btn_Ok.addTouchEventListener(function (sender, type) {
            if (type == 2)
            {
                var str0 = _textFeildName0.getString();
                cc.log("输入的姓名为  =  " + str0);
                if (str0.length <= 0)
                {
                    MjClient.showToast("请输入您的真实姓名");
                    return;
                }


                var str1 = _textFeildName1.getString();
                cc.log("输入的手机号为  =  " + str1);
                if (str1.length != 11)
                {
                    MjClient.showToast("请输入完整的手机号");
                    return;
                }

                var str2 = _textFeildName2.getString();
                cc.log("输入的验证码为  =  " + str2);
                if (str2.length != 6)
                {
                    MjClient.showToast("请输入完整的验证码");
                    return;
                }
                var that = this;
                _Btn_Ok.setTouchEnabled(false);
                _Btn_Ok.setBright(false);

                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.checkVerifyCode",{real_name:str0, mobile_num:str1, verify_code:str2},
                    function(rtn)
                    {
                        MjClient.unblock();
                        if (rtn.message)
                        {
                            MjClient.showToast(rtn.message);
                        }

                        if (rtn.code == 0)
                        {
                            that.initList();
                        }
                        else
                        {
                            _Btn_Ok.setTouchEnabled(true);
                            _Btn_Ok.setBright(true);
                        }
                    });
            }
        }, this);
    },

    init_jianyi:function ()
    {
        var back = this._bg_jianyi.getChildByName("back");
        var jianjiEditBox = new cc.EditBox(cc.size(810, 320), new cc.Scale9Sprite());
        jianjiEditBox.setFontColor(cc.color(0, 0, 0));
        jianjiEditBox.setPlaceholderFontColor(cc.color(128, 128, 128));
        jianjiEditBox.setMaxLength(300);
        jianjiEditBox.setFontSize(24);
        jianjiEditBox.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        jianjiEditBox.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        jianjiEditBox.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        jianjiEditBox.setPlaceHolder("点击输入投诉建议内容");
        jianjiEditBox.setPlaceholderFontSize(24);
        jianjiEditBox.setPosition(435, 272);
        back.addChild(jianjiEditBox);

        var send = back.getChildByName("send");
        send.addTouchEventListener(function (sender, type) {
            if (type != ccui.Widget.TOUCH_ENDED)
                return;
            MjClient.native.umengEvent4CountWithProperty("Huodong_Youxigonggao_Tousujianyi_Fasong", {uid:SelfUid()});
            var content = jianjiEditBox.getString();
            if (content.length < 10) {
                MjClient.showToast("投诉建议内容少于10个字符！");
                return;
            }

            MjClient.block();
            cc.log("投诉建议:" + content);
            MjClient.gamenet.request("pkplayer.handler.addSuggest",{content:escape(content)},function(rtn){
                if(rtn.code==0)
                {
                    jianjiEditBox.setString("");
                    MjClient.showToast("发送投诉建议成功");
                }
                else
                {
                    if (rtn.message)
                        MjClient.showToast(rtn.message);
                    else
                        MjClient.showToast("发送投诉建议失败");
                }
                MjClient.unblock();
            });
        }, this);
    },

    init_yuanbaoDuihuanzuanshi:function (data) {
        var back = this._bg_yuanbaoDuizuanshi.getChildByName("back");
        var _btn_liji = back.getChildByName("Btn_liji");
        _btn_liji.addTouchEventListener(function (sender, type) {
            if (type != ccui.Widget.TOUCH_ENDED)
                return;
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.openBrowser", {type :15},
                function(rtn) {
                    MjClient.unblock();
                    cc.log(" ===== pkplayer.handler.openBrowser === " + JSON.stringify(rtn));
                    if (rtn.code == 0) {
                        MjClient.Scene.addChild(new DaiLiWebviewLayer(rtn.data));
                    } else {
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        }
                    }
                }
            );
        }, this);
    },

    init_double11:function (data) {
        cc.log("wxd.....data."+JSON.stringify(data));
        var back = this._bg_double_11.getChildByName("back");
        back.addTouchEventListener(function (sender, type) {
            if (type != ccui.Widget.TOUCH_ENDED)
                return;
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.openBrowser", {type :18},
                function(rtn) {
                    MjClient.unblock();
                    cc.log(" ===== pkplayer.handler.openBrowser === " + JSON.stringify(rtn));
                    if (rtn.code == 0) {
                        if(rtn.data) {
                            MjClient.Scene.addChild(new DaiLiWebviewLayer(rtn.data));
                        }
                    } else {
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        }
                    }
                }
            );
        }, this);
    },

    init_screenTime:function (data) {
        cc.log("wxd.....data."+JSON.stringify(data));
    },


    refleshKaiFangGiftStatus:function()
    {
        var _btnKaiFangGift = this._avtivList.getChildByTag(MjClient.ACTIVITY_TYPE.KAI_FANG);
        if (!_btnKaiFangGift)
            return;
        cc.log("pkplayer.handler.getUserCreateRoomInfo");
        MjClient.gamenet.request("pkplayer.handler.getUserCreateRoomInfo",{},
            function(rtn)
            {
                if (rtn.code == 0)
                {
                    var canGet = false;
                    for (var i=0; i<rtn.data.createAward.length; i++)
                    {
                        if (rtn.data.createAward[i].status == 0)
                        {
                            cc.log("can get ");
                            canGet = true;
                            break;
                        }
                    }
                    if (canGet)
                    {
                        var _sprite = _btnKaiFangGift.getChildByName("hongdian");
                        if(!_sprite)
                        {
                            _sprite = new cc.Sprite("hall/hongdian.png");
                            _sprite.setScale(0.7);
                            _sprite.setName("hongdian");
                            _sprite.setPosition(13.5, 65);
                            _btnKaiFangGift.addChild(_sprite);
                        }
                    }
                    else
                    {
                        var _sprite = _btnKaiFangGift.getChildByName("hongdian");
                        if(_sprite)
                        {
                            _sprite.removeFromParent();
                        }
                    }
                }
            });
    },
    refleshChangCiGiftStatus:function()
    {
        var _btnChangCiGift = this._avtivList.getChildByTag(MjClient.ACTIVITY_TYPE.DUI_ZHAN);
        if (!_btnChangCiGift)
            return;

        cc.log("=====refleshChangCiGiftStatus=====");
        MjClient.gamenet.request("pkplayer.handler.getUserPlayGameInfo",{},
            function(rtn)
            {
                if (rtn.code == 0)
                {
                    var canGet = false;
                    for (var i=0; i<rtn.data.playAward.length; i++)
                    {
                        if (rtn.data.playAward[i].status == 0)
                        {

                            canGet = true;
                            break;
                        }
                    }
                    if (canGet)
                    {
                        var _sprite = _btnChangCiGift.getChildByName("hongdian");
                        if(!_sprite)
                        {
                            _sprite = new cc.Sprite("hall/hongdian.png");
                            _sprite.setScale(0.7);
                            _sprite.setName("hongdian");
                            _sprite.setPosition(13.5, 65);
                            _btnChangCiGift.addChild(_sprite);
                        }
                    }
                    else
                    {
                        var _sprite = _btnChangCiGift.getChildByName("hongdian");
                        if(_sprite)
                        {
                            _sprite.removeFromParent();
                        }
                    }
                }
            });
    },


    setCloseCallback:function(callback)
    {
        this._closeCallback = callback;
    }
});

// 岳阳app
if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP
    || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ
     || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ
    || MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
    activityLayer = activityLayer_QXYYQP;
}

var activityLayer_QXSYDTZ = cc.Layer.extend({
    _closeCallback:null,

    _bg_shouchong:null,
    _bg_duizhan:null,
    _bg_kaifang:null,
    _bg_tuijian:null,
    _bg_renzheng:null,
    _bg_xianshi:null,
    _bg_fenxiang:null,
    _avtivList:null,
    _btnNode:null,

    _isUseUIv3:null,

    _currentType:0,//0 活动列表，1 表示公告列表

    ctor:function () {
        this._super();
        this._isUseUIv3 = MjClient.isUseUIv3 && MjClient.isUseUIv3();
        if(this._isUseUIv3){
            var UI = ccs.load("ActivityLayer_3.0.json");
        }
        else {
            var UI = ccs.load("ActivityLayer.json");
        }
        this.addChild(UI.node);
        var that = this;
        this._xianshiImageIndex = 0;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        var _back = UI.node.getChildByName("back");
        
        if(isIPhoneX())
            setWgtLayout(_back,[0.85, 0.85], [0.5, 0.4], [0, 0]);
        else
            setWgtLayout(_back,[0.9, 0.9], [0.5, 0.42], [0, 0]);

        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            setWgtLayout(_back,[1, 1], [0.5, 0.5], [0, 0]);
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG) 
        {
            setWgtLayout(_back,[0.95, 0.95], [0.5, 0.5], [0, 0]);
        }

        if(this._isUseUIv3){
            setWgtLayout(_back,[1, 1], [0.5, 0.5], [0, 0]);
        }

        var _suizi = _back.getChildByName("suizi");
        cc.log("======================suisuizi=======================");
        //穗子动画
        if(_suizi) 
            COMMON_UI.suiziAni(_suizi,8);
        else
            COMMON_UI.popDialogAni(_back);

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent();
                if (this._closeCallback)
                {
                    this._closeCallback();
                }
                MjClient.native.umengEvent4CountWithProperty("Huodong_Tuichu", {uid:SelfUid()});
            }
        }, this);


        this. _avtivList = _back.getChildByName("avtivList");
        this._avtivList.removeAllChildren();

        this._btnNode = _back.getChildByName("btnNode");
        this._btnNode.visible = false;


        this._bg_xianshi   = _back.getChildByName("bg_xianshi");
        this._bg_shouchong = _back.getChildByName("bg_shouchong");
        this._bg_duizhan   = _back.getChildByName("bg_duizhan");
        this._bg_kaifang   = _back.getChildByName("bg_kaifang");
        this._bg_tuijian   = _back.getChildByName("bg_tuijian");
        this._bg_renzheng  = _back.getChildByName("bg_renzheng");
        this._bg_fenxiang  = _back.getChildByName("bg_fenxiang");
        this._bg_zhenqing  = _back.getChildByName("bg_zhenqing");
        this._bg_monthRecharge   = _back.getChildByName("bg_monthRechage");
        

        this._bg_waigua  = _back.getChildByName("bg_fanwaigua");
        this._bg_gengxin  = _back.getChildByName("bg_gengxin");
        this._bg_dubo  = _back.getChildByName("bg_dubo");
        this._bg_jianyi = _back.getChildByName("bg_jianyi");
        this._bg_yuanbaoDuizuanshi = _back.getChildByName("bg_yuanbaoDuizuanshi");
        this._bg_double_11 = _back.getChildByName("bg_double_11");
        this._bg_screenTime = _back.getChildByName("bg_screenTime");

        // 列表数据
        this.showActivieList = MjClient.systemConfig.activity.activity;
        this.showNoticeList = MjClient.systemConfig.activity.notice;
        var listAll = this.showActivieList.concat(this.showNoticeList);

        //初始化活动列表
        this.initList(listAll);

        cc.log("-------------this.showActivieList-- =111111111111111111122 " + JSON.stringify(listAll));

        //初始化
        this.initBgNode(listAll);
    },

    initBgNode:function(activityList)
    {
        for (var i=0; i<activityList.length; i++)
        {
            switch (activityList[i].type)
            {
                case MjClient.ACTIVITY_TYPE.DUI_ZHAN:
                    this.init_duizhan(activityList[i]);
                    this.refleshChangCiGiftStatus();
                    break;
                case MjClient.ACTIVITY_TYPE.KAI_FANG:
                    this.init_kaifang(activityList[i]);
                    this.refleshKaiFangGiftStatus();
                    break;
                case MjClient.ACTIVITY_TYPE.REN_ZHENG:
                    this.init_renzheng(activityList[i]);
                    break;
                case MjClient.ACTIVITY_TYPE.JIAN_YI:
                    this.init_jianyi();
                    break;
                case MjClient.ACTIVITY_TYPE.YUANBAO_DUIHUAN_ZUANSHI:
                    this.init_yuanbaoDuihuanzuanshi(activityList[i]);
                    break;
                case MjClient.ACTIVITY_TYPE.DOUBLE_11:
                    this.init_double11(activityList[i]);
                    break;
                case MjClient.ACTIVITY_TYPE.SCREEN_TIME:
                    this.init_screenTime(activityList[i]);
                    break;
            }
        }
    },
    initList:function(activityList)
    {
        this._avtivList.removeAllChildren();
        
        activityList = activityList || [];
        for(var i = 0;i < activityList.length ; i++)
        {
            if(activityList[i].type == MjClient.ACTIVITY_TYPE.REN_ZHENG &&
                MjClient.data.pinfo.mobileNum &&
                MjClient.data.pinfo.mobileNum.toString().length == 11)
            {
                continue;
            }

            if(MjClient.isShenhe && i == 0){
                continue;
            }

            var btn = this._btnNode.clone();
            btn.visible = true;
            btn.loadTextureNormal("ui/activity/activity_btn_2.png");
            if(this._isUseUIv3){
                btn.loadTextureNormal("ui/activity/activity_btn_3.png");
            }
            btn.setTag(activityList[i].type);
            btn.setUserData(activityList[i]);
            btn.addTouchEventListener(function (sender,type)
            {
                if (type == 2) {
                    this.updateTouchActivityType(sender,true);
                }
            },this);
            btn.setPressedActionEnabled(false);
            var title = new ccui.Text();
            title.setFontName("fonts/lanting.ttf");
            title.setString(""+activityList[i].title);
            // title.setColor(cc.color.WHITE);
            title.setColor(cc.color("#fefefe"));
            title.setName("title");
            title.setFontSize(30);

            // if (activityList[i].title.length>4)
            // {
            //     title.setFontSize(32);
            // }
            // else
            // {
            //     title.setFontSize(36);
            // }

            title.setPosition(btn.getContentSize().width/2, btn.getContentSize().height/2);
            title.enableOutline(cc.color("#af550c"), 2);

            btn.addChild(title);
            this._avtivList.pushBackCustomItem(btn);
        }

        this.updateTouchActivityType(this._avtivList.getItem(0));
    },


    updateTouchActivityType:function(btnNode,isClick)
    {
        this._bg_shouchong.visible = false;
        this._bg_duizhan.visible = false;
        this._bg_kaifang.visible = false;
        this._bg_tuijian.visible = false;
        this._bg_renzheng.visible = false;
        this._bg_xianshi.visible = false;
        this._bg_monthRecharge.visible = false;
        if(this._bg_zhenqing)
            this._bg_zhenqing.visible = false;
        if (this._bg_fenxiang)
            this._bg_fenxiang.visible = false;

        this._bg_waigua.visible = false;
        this._bg_gengxin.visible = false;
        this._bg_dubo.visible = false;
        this._bg_jianyi.visible = false;
        if(this._bg_yuanbaoDuizuanshi){
            this._bg_yuanbaoDuizuanshi.visible = false;
        }
        if(this._bg_double_11){
            this._bg_double_11.visible = false;
        }
        if(this._bg_screenTime){
            this._bg_screenTime.visible = false;
        }
        var path = "ui/activity/";

        for(var i = 0; i < this._avtivList.getItems().length ; i++)
        {
            this._avtivList.getItem(i).loadTextureNormal(path + "activity_btn_2.png");
            if(this._isUseUIv3){
                this._avtivList.getItem(i).loadTextureNormal(path + "activity_btn_3.png");
            }
            var title = this._avtivList.getItem(i).getChildByName("title");
            title.setColor(cc.color("#77390a"));
            title.enableOutline(cc.color(255,255,255,0), 2); // 设置透明，去掉描边
            title.setPosition(this._avtivList.getItem(i).getContentSize().width/2, this._avtivList.getItem(i).getContentSize().height/2);
        }
        if (!btnNode) return;
        btnNode.loadTextureNormal(path + "activity_btn_1.png");
        if(this._isUseUIv3){
            btnNode.loadTextureNormal(path + "activity_btn_4.png");
        }
        var title = btnNode.getChildByName("title");
        title.setColor(cc.color("#fefefe"));
        title.enableOutline(cc.color("#af550c"), 2);
        title.setPosition(btnNode.getContentSize().width/2, btnNode.getContentSize().height/2);

        var activityData = btnNode.getUserData();
        cc.log("===== type =33333333333333  " + activityData.type);
        if(isClick){
            if ("推荐代理奖" == activityData.title){
                MjClient.native.umengEvent4CountWithProperty("Huodong_Jingcaihuodong_Tuijiandailijiang", {uid:SelfUid()});
            }
            if ("好评有礼" == activityData.title){
                MjClient.native.umengEvent4CountWithProperty("Huodong_Jingcaihuodong_Haopingyouli", {uid:SelfUid()});
            }
            if ("外挂悬赏" == activityData.title){
                MjClient.native.umengEvent4CountWithProperty("Huodong_Youxigonggao_Waiguaxuanshang", {uid:SelfUid()});
            }
        }
        switch (activityData.type)
        {
            case MjClient.ACTIVITY_TYPE.WEN_ZI:
                this._bg_dubo.visible = true;
                this.init_wenzi(activityData);
                break;
            case MjClient.ACTIVITY_TYPE.TU_PIAN:
                this._bg_xianshi.visible = true;
                this.init_tupian(activityData);
                break;
            case MjClient.ACTIVITY_TYPE.MONTH_RECHARGE:
                this._bg_monthRecharge.visible = true;
                this.init_monthRecharge(activityData);
                break;
                
            case MjClient.ACTIVITY_TYPE.DUI_ZHAN:
                this._bg_duizhan.visible = true;
                break;
            case MjClient.ACTIVITY_TYPE.KAI_FANG:
                this._bg_kaifang.visible = true;
                break;
            case MjClient.ACTIVITY_TYPE.REN_ZHENG:
                this._bg_renzheng.visible = true;
                break;
            case MjClient.ACTIVITY_TYPE.JIAN_YI:
                this._bg_jianyi.visible = true;
                if (isClick){
                    MjClient.native.umengEvent4CountWithProperty("Huodong_Youxigonggao_Tousujianyi", {uid:SelfUid()});
                }
                break;
            case MjClient.ACTIVITY_TYPE.YUANBAO_DUIHUAN_ZUANSHI:
                this._bg_yuanbaoDuizuanshi.visible = true;
                break;
            case MjClient.ACTIVITY_TYPE.DOUBLE_11:
                this._bg_double_11.visible = true;
                break;
            case MjClient.ACTIVITY_TYPE.SCREEN_TIME:
                this._bg_screenTime.visible = true;
                break;
        }
    },

    setAction:function(node, data)
    {
        if (!node) return;
        switch (data.action)
        {
            case MjClient.ACTIVITY_ACTION_TYPE.SHANG_CHENG:
                node.setTouchEnabled(true);
                node.addTouchEventListener(function (sender, type)
                {
                    if (type == 2)
                    {
                        if (MjClient.data.pinfo.myMemberLevel > 0)//正式代理
                        {
                            MjClient.gamenet.request("pkplayer.handler.openBrowser", { type: 6 }, function (rtn) {
                                if (rtn.code == 0) {
                                    MjClient.native.OpenUrl(rtn.data);
                                }
                                else {
                                    if (rtn.message) {
                                        MjClient.showToast(rtn.message);
                                    }
                                    else {
                                        MjClient.showToast("获取数据失败，请重试");
                                    }
                                }
                            });
                        }
                        else
                        {
                            if(MjClient.rechargeLadder.length == 0)
                            {
                                var _gongzhognhao = ""+MjClient.systemConfig.gongzhonghao;
                                MjClient.showMsg("添加微信公众号:" + _gongzhognhao + " 进行充值\n点击\"确定\"按钮即可复制微信公众号。",
                                    function(){
                                        MjClient.showToast("复制公众号成功,前往微信添加公众号！");
                                        MjClient.native.doCopyToPasteBoard("" +_gongzhognhao );
                                        MjClient.native.openWeixin();
                                    });
                            }
                            else
                            {
                                var layer = enter_store();
                                MjClient.Scene.addChild(layer);
                            }
                        }
                    }
                }, this);
                break;
            case MjClient.ACTIVITY_ACTION_TYPE.WEB_VIEW:
                node.setTouchEnabled(true);
                node.addTouchEventListener(function (sender, type)
                {
                    if (type == 2)
                    {
                        MjClient.native.OpenUrl(data.target);
                    }
                }, this);
                break;
            case MjClient.ACTIVITY_ACTION_TYPE.FEN_XIANG:
                node.setTouchEnabled(false);
                break;
            case MjClient.ACTIVITY_ACTION_TYPE.NONE:
                node.setTouchEnabled(false);
                break;
            case MjClient.ACTIVITY_ACTION_TYPE.WEB_VIEW_INSIDE:
                node.setTouchEnabled(true);
                node.addTouchEventListener(function (sender, type)
                {
                    if (type == 2)
                    {
                        MjClient.Scene.addChild(new NormalWebviewLayer(data.target));
                    }
                }, this);
                break;
            case MjClient.ACTIVITY_ACTION_TYPE.BI_SAI:
                node.setTouchEnabled(true);
                node.addTouchEventListener(function (sender, type)
                {
                    if (type == 2)
                    {
                        MjClient.Scene.addChild(new playgroundLayer());
                    }
                }, this);
                break;
            case MjClient.ACTIVITY_ACTION_TYPE.OPEN_BROWSER:
                node.setTouchEnabled(true);
                node.addTouchEventListener(function (sender, type)
                {
                    if (type == 2)
                    {
                        MjClient.block();
                        MjClient.gamenet.request("pkplayer.handler.openBrowser", { type: data.target }, function (rtn) {
                            MjClient.unblock();
                            if (rtn.code == 0) {
                                MjClient.native.OpenUrl(rtn.data);
                            }
                            else {
                                if (rtn.message) {
                                    MjClient.showToast(rtn.message);
                                }
                                else {
                                    MjClient.showToast("获取数据失败，请重试");
                                }
                            }
                        });
                    }
                }, this);
                break;
            case MjClient.ACTIVITY_ACTION_TYPE.OPEN_ZHIFUBAO_HONGBAO:
                node.setTouchEnabled(true);
                node.addTouchEventListener(function (sender, type)
                {
                    if (type == 2)
                    {
                        cc.log("wxd............");
                        MjClient.Scene.addChild(new alipayRedPaketLayer());
                        MjClient.block();
                        MjClient.gamenet.request("pkplayer.handler.clickStatistics", {type:1}, function (rtn) {
                            MjClient.unblock();
                            if (rtn.code == 0) {

                            }
                            else {
                                if (rtn.message) {
                                    MjClient.showToast(rtn.message);
                                }
                                else {
                                    MjClient.showToast("统计失败");
                                }
                            }
                        });
                    }
                }, this);
                break;
            default :
                node.setTouchEnabled(false);
                break;
        }
    },


    init_wenzi:function(data)
    {
        var _back = this._bg_dubo.getChildByName("back");
        var cont_us = _back.getChildByName("cont_us");
        cont_us.visible = true;
        cont_us.setString(""+data.content);

        this.setAction(this._bg_dubo, data);
    },

    init_tupian:function(data)
    {
        var ImageNode = this._bg_xianshi.getChildByName("Image_1");
        cc.loader.loadImg(""+data.content, {isCrossOrigin : true}, function(err,img){
            if (!err && img && cc.sys.isObjectValid(ImageNode))
            {
                ImageNode.setTexture(img);
            }
        });

        this.setAction(this._bg_xianshi, data);
    },

    init_monthRecharge:function(data)
    {
        var ImageNode = this._bg_monthRecharge.getChildByName("Image_1");
        cc.loader.loadImg(""+data.content, {isCrossOrigin : true}, function(err,img){
            if (!err && img && cc.sys.isObjectValid(ImageNode))
            {
                ImageNode.setTexture(img);
            }
        });

        this.setAction(this._bg_monthRecharge, data);
    },

    init_duizhan:function(data)
    {
        var _back = this._bg_duizhan.getChildByName("back");

        if (!MjClient.activityConfig || MjClient.isShenhe )
        {
            //MjClient.getActivityConfig();
            _back.setVisible(false);
            return;
        }



        var playGameConfig = MjClient.activityConfig.playGame;
        if(!playGameConfig) {
            cc.log('error init_duizhan MjClient.activityConfig.playGame is null')
            return;
        }

        /*
         说明描述
         */
        var _Text_desc = _back.getChildByName("Text_dec");
        _Text_desc.setString(""+data.content);

        var that = this;
        var boxClickCallback = function(sender)
        {
            if (cc.isUndefined(sender.status))
            {
                MjClient.showToast("宝箱不可领取");
                return;
            }
            else if (sender.status == 1)
            {
                MjClient.showToast("宝箱已经领取过了");
                return;
            }

            MjClient.gamenet.request("pkplayer.handler.activityAward",{activityType:"playGame", count:parseInt(sender.getTag())},
                function(rtn)
                {
                    cc.log(" ======= pkplayer.handler.activityAward :",JSON.stringify(rtn));
                    if (rtn.code == 0)
                    {
                        var number = 0;
                        for (var i = 0; i < playGameConfig.length; i++) {
                            if(playGameConfig[i].count == parseInt(sender.getTag()))
                                number = i;
                        }
                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang" + number);
                        setBoxNodeState(sender, 1,BGLight);
                        that.refleshChangCiGiftStatus();
                        var data = {type : 1, id : playGameConfig[number].id, award : playGameConfig[number].award};
                        that.addChild(new duizhan_shareLayer(data), 5);
                    }

                    if (!cc.isUndefined(rtn.message))
                    {
                        MjClient.showToast(rtn.message);
                    }
                });
        };


        for(var i = 0;i< 5; i++)
        {
            var BoxNode = _back.getChildByName("Image_1").getChildByName("box_" + i);
            BoxNode.setTouchEnabled(true);
            BoxNode.addClickEventListener(boxClickCallback);
            BoxNode.setTag(parseInt(playGameConfig[i].count));
            BoxNode.setUserData(BoxNode.getScale());
            if (BoxNode.getChildByName("mark")) BoxNode.getChildByName("mark").setVisible(false);

            var _time = BoxNode.getChildByName("time");
            var num = parseInt(playGameConfig[i].count);
            _time.setString(num + "次");
            _time.ignoreContentAdaptWithSize(true);
            var _money = BoxNode.getChildByName("money");
            _money.setString(parseInt(playGameConfig[i].award) + "元宝");
            _money.ignoreContentAdaptWithSize(true);


            var BGLight =  _back.getChildByName("Image_1").getChildByName("guang" + i);
            var act_1 = cc.callFunc(function(){
                BGLight.setRotation(10);
            });
            var act_3 = cc.callFunc(function(){
                BGLight.setRotation(0);
            });
            var act_2 = cc.blink(1,2);
            var act_4 = cc.delayTime(0.5);
            BGLight.runAction(cc.spawn(cc.sequence(act_1,act_4,act_3,act_4),act_2).repeatForever());
            BGLight.setOpacity(0);

        }


        //当前开放次数
        var _openTime =  _back.getChildByName("Text_1");
        _openTime.setString(0);
        _openTime.ignoreContentAdaptWithSize(true);


        //进度条
        var _loadingBar = _back.getChildByName("Image_1").getChildByName("LoadingBar_1");
        _loadingBar.setPercent(0);

        var setBoxNodeState = function(boxNode, status, light)
        {
            boxNode.status = status;
            if (status == 1) {//已领取
                if (boxNode.getChildByName("mark")) boxNode.getChildByName("mark").setVisible(true);
                light.setOpacity(0);
            }else if(status == 0){//未领取
                if (boxNode.getChildByName("mark")) boxNode.getChildByName("mark").setVisible(false);
                light.setOpacity(255);
            }
            
        };
        var _Btn_open = _back.getChildByName("Btn_open");
        if (_Btn_open)
        {
            _Btn_open.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    postEvent("createRoom",{});
                    this.removeFromParent();
                }
            }, this);
        }



        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.getUserPlayGameInfo",{},
            function(rtn)
            {
                MjClient.unblock();
                if (rtn.code == 0)
                {
                    var curPlayNum = parseInt(rtn.data.playNum);
                    _openTime.setString(curPlayNum);

                    var percent = 0;
                    var lastNum = 0;
                    for (var i=0; i<playGameConfig.length; i++)
                    {
                        var num = parseInt(playGameConfig[i].count);
                        if (curPlayNum <= num)
                        {
                            var kuadu = num - lastNum;
                            var duoyu = curPlayNum - lastNum;
                            percent += (duoyu/kuadu*100)*0.2;
                            break;
                        }
                        else
                        {
                            percent += 20;
                            lastNum = num;
                        }
                    }
                    for (var i = 0; i < rtn.data.playAward.length; i++) {
                        playGameConfig[i].id = rtn.data.playAward[i].id;
                    }
                    _loadingBar.setPercent(percent);


                    if (percent >= 20)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_0");
                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang0");
                        if (rtn.data.playAward.length > 0)
                        {
                            setBoxNodeState(BoxNode, rtn.data.playAward[0].status,BGLight);
                        }

                    }
                    if (percent >= 40)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_1");
                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang1");
                        if (rtn.data.playAward.length > 1)
                        {
                            setBoxNodeState(BoxNode, rtn.data.playAward[1].status,BGLight);
                        }
                    }
                    if (percent >= 60)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_2");
                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang2");
                        if (rtn.data.playAward.length > 2)
                        {
                            setBoxNodeState(BoxNode, rtn.data.playAward[2].status,BGLight);
                        }
                    }
                    if (percent >= 80)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_3");
                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang3");
                        if (rtn.data.playAward.length > 3)
                        {
                            setBoxNodeState(BoxNode, rtn.data.playAward[3].status,BGLight);
                        }

                    }
                    if (percent >= 100)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_4");
                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang4");
                        if (rtn.data.playAward.length > 4)
                        {
                            setBoxNodeState(BoxNode, rtn.data.playAward[4].status,BGLight);
                        }
                    }
                }
                else if (!cc.isUndefined(rtn.message))
                {
                    MjClient.showMsg(rtn.message);
                }
            });
    },

    init_kaifang:function(data) // 开房 活动
    {
        var _back = this._bg_kaifang.getChildByName("back");
        if (!MjClient.activityConfig)
        {
            //MjClient.getActivityConfig();
            _back.setVisible(false);
            return;
        }

        var createRoomConfig = MjClient.activityConfig.createRoom;
        /*
         说明描述
         */
        var _Text_desc = _back.getChildByName("Text_dec");
        _Text_desc.setString(""+data.content);

        var that = this;
        var boxClickCallback = function(sender)
        {
            if (cc.isUndefined(sender.status))
            {
                MjClient.showToast("宝箱不可领取");
                return;
            }
            else if (sender.status == 1)
            {
                MjClient.showToast("宝箱已经领取过了");
                return;
            }

            MjClient.gamenet.request("pkplayer.handler.activityAward",{activityType:"createRoom", count:parseInt(sender.getTag())},
                function(rtn)
                {
                    if (rtn.code == 0)
                    {
                        setBoxNodeState(sender, 1);
                        that.refleshKaiFangGiftStatus();
                    }

                    if (!cc.isUndefined(rtn.message))
                    {
                        MjClient.showToast(rtn.message);
                    }
                });
        };


        for(var i = 0;i< 4; i++)
        {
            var BoxNode = _back.getChildByName("Image_1").getChildByName("box_" + i);
            BoxNode.setTouchEnabled(true);
            BoxNode.addClickEventListener(boxClickCallback);
            BoxNode.setTag(parseInt(createRoomConfig[i].count));
            BoxNode.setUserData(BoxNode.getScale());

            var _time = BoxNode.getChildByName("time");
            var num = parseInt(createRoomConfig[i].count);
            _time.setString(num + "次");
            _time.ignoreContentAdaptWithSize(true);
            var _money = BoxNode.getChildByName("money");
            _money.setString(parseInt(createRoomConfig[i].award) + "元宝");
            _money.ignoreContentAdaptWithSize(true);


            var BGLight =  _back.getChildByName("Image_1").getChildByName("guang" + i);
            BGLight.runAction(cc.rotateBy(10,360).repeatForever());
        }



        //当前开放次数
        var _openTime =  _back.getChildByName("Text_1");
        _openTime.setString(0);
        _openTime.ignoreContentAdaptWithSize(true);


        //进度条
        var _loadingBar = _back.getChildByName("Image_1").getChildByName("LoadingBar_1");
        _loadingBar.setPercent(0);



        var _Btn_open = _back.getChildByName("Btn_open");
        _Btn_open.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                postEvent("createRoom",{});
                this.removeFromParent();
            }
        }, this);



        var setBoxNodeState = function(boxNode, status)
        {
            boxNode.status = status;
            var oldScale = boxNode.getUserData();
            if (status == 1)//已领取
            {
                boxNode.stopAllActions();
                boxNode.setScale(oldScale);
                var pngFile;
                if (boxNode.getName() == "box_0")
                {
                    pngFile = "KaiFangMoney/kaixiang_1.png";
                }
                else if (boxNode.getName() == "box_1")
                {
                    pngFile = "KaiFangMoney/kaixiang_2.png";
                }
                else if (boxNode.getName() == "box_2")
                {
                    pngFile = "KaiFangMoney/kaixiang_3.png";
                }
                else if (boxNode.getName() == "box_3")
                {
                    pngFile = "KaiFangMoney/kaixiang_4.png";
                }

                boxNode.loadTexture(pngFile);
                boxNode.ignoreContentAdaptWithSize(true);
            }
            else if (status == 0)//未领取
            {
                boxNode.runAction(cc.sequence(cc.scaleTo(0.5, oldScale*1.2), cc.scaleTo(0.5, oldScale)).repeatForever());
            }
        };


        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.getUserCreateRoomInfo",{},
            function(rtn)
            {
                MjClient.unblock();
                if (rtn.code == 0)
                {
                    var curCreateNum = parseInt(rtn.data.createNum);
                    _openTime.setString(curCreateNum);

                    var percent = 0;
                    var lastNum = 0;
                    for (var i=0; i<createRoomConfig.length; i++)
                    {
                        var num = parseInt(createRoomConfig[i].count);
                        if (curCreateNum <= num)
                        {
                            var kuadu = num - lastNum;
                            var duoyu = curCreateNum - lastNum;
                            percent += (duoyu/kuadu*100)*0.25;
                            break;
                        }
                        else
                        {
                            percent += 25;
                            lastNum = num;
                        }
                    }
                    _loadingBar.setPercent(percent);


                    if (percent >= 25)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_0");
                        if (rtn.data.createAward.length > 0)
                        {
                            setBoxNodeState(BoxNode, rtn.data.createAward[0].status);
                        }

                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang0");
                        BGLight.setVisible(false);
                    }
                    if (percent >= 50)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_1");
                        if (rtn.data.createAward.length > 1)
                        {
                            setBoxNodeState(BoxNode, rtn.data.createAward[1].status);
                        }

                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang1");
                        BGLight.setVisible(false);
                    }
                    if (percent >= 75)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_2");
                        if (rtn.data.createAward.length > 2)
                        {
                            setBoxNodeState(BoxNode, rtn.data.createAward[2].status);
                        }

                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang2");
                        BGLight.setVisible(false);
                    }
                    if (percent >= 100)
                    {
                        var BoxNode =  _back.getChildByName("Image_1").getChildByName("box_3");
                        if (rtn.data.createAward.length > 3)
                        {
                            setBoxNodeState(BoxNode, rtn.data.createAward[3].status);
                        }

                        var BGLight =  _back.getChildByName("Image_1").getChildByName("guang3");
                        BGLight.setVisible(false);
                    }
                }
                else if (!cc.isUndefined(rtn.message))
                {
                    MjClient.showMsg(rtn.message);
                }
            });
    },

    init_renzheng:function(data)
    {
        var _back = this._bg_renzheng.getChildByName("back");

        /*
         输入姓名
         */
        var _nameBg = _back.getChildByName("xiaotanchuan_name");
        var _textFeildName0 = new cc.EditBox(cc.size(356,45), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
        _textFeildName0.setFontColor(cc.color(255,255,255));
        _textFeildName0.setMaxLength(10);
        _textFeildName0.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        _textFeildName0.setPlaceHolder("点击输入");
        _textFeildName0.setPosition(_nameBg.getContentSize().width/2, _nameBg.getContentSize().height/2);
        _nameBg.addChild(_textFeildName0);


        /*
         输入手机号
         */
        var _phoneNumBg = _back.getChildByName("xiaotanchuan_phoneNum");
        var _textFeildName1 = new cc.EditBox(cc.size(356,45), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
        _textFeildName1.setFontColor(cc.color(255,255,255));
        _textFeildName1.setMaxLength(11);
        _textFeildName1.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        _textFeildName1.setPlaceHolder("点击输入");
        _textFeildName1.setPosition(_phoneNumBg.getContentSize().width/2, _phoneNumBg.getContentSize().height/2);
        _phoneNumBg.addChild(_textFeildName1);


        /*
         输入验证码
         */
        var _codeNumBg = _back.getChildByName("xiaotanchuan_codeNum");
        var _textFeildName2 = new cc.EditBox(cc.size(200,45), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
        _textFeildName2.setFontColor(cc.color(255,255,255));
        _textFeildName2.setMaxLength(6);
        _textFeildName2.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        _textFeildName2.setPlaceHolder("点击输入");
        _textFeildName2.setPosition(_codeNumBg.getContentSize().width/2, _codeNumBg.getContentSize().height/2);
        _codeNumBg.addChild(_textFeildName2);

        var _Text_desc = _back.getChildByName("Text_desc");
        _Text_desc.setString(""+data.content);


        /*
         获取验证码
         */
        var _Btn_getCode = _back.getChildByName("Btn_getCode");
        _Btn_getCode.addTouchEventListener(function (sender, type) {
            if (type == 2)
            {
                var str = _textFeildName1.getString();
                cc.log("输入的手机号为  =  " + str);
                if (str.length != 11)
                {
                    MjClient.showToast("请输入完整的手机号");
                    return;
                }

                _Btn_getCode.setTouchEnabled(false);
                _Btn_getCode.setBright(false);

                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.getVerifyCode",{mobile_num:str},
                    function(rtn)
                    {
                        MjClient.unblock();
                        if (rtn.message)
                        {
                            MjClient.showToast(rtn.message);
                        }

                        if (rtn.code == 0)
                        {
                            MjClient.getVerifyCodeTime = new Date().getTime();
                        }
                        else
                        {
                            _Btn_getCode.setTouchEnabled(true);
                            _Btn_getCode.setBright(true);
                        }
                    });
            }
        },this);



        /*
         倒计时
         */
        var _timeDes = _back.getChildByName("Text_time");
        _timeDes.ignoreContentAdaptWithSize(true);
        if (cc.isUndefined(MjClient.getVerifyCodeTime))
        {
            MjClient.getVerifyCodeTime = 0;
        }
        _timeDes.schedule(function()
        {
            var time = (new Date().getTime()) - MjClient.getVerifyCodeTime;
            time = parseInt(time/1000);
            if (time >= 60)
            {
                _Btn_getCode.setTouchEnabled(true);
                _Btn_getCode.setBright(true);
                _timeDes.setVisible(false);
            }
            else
            {
                _Btn_getCode.setTouchEnabled(false);
                _Btn_getCode.setBright(false);
                _timeDes.setVisible(true);
                _timeDes.setString((60-time).toString() + "秒后可再次获取");
            }
        });


        /*
         绑定
         */
        var _Btn_Ok = _back.getChildByName("Btn_Ok");
        _Btn_Ok.addTouchEventListener(function (sender, type) {
            if (type == 2)
            {
                var str0 = _textFeildName0.getString();
                cc.log("输入的姓名为  =  " + str0);
                if (str0.length <= 0)
                {
                    MjClient.showToast("请输入您的真实姓名");
                    return;
                }


                var str1 = _textFeildName1.getString();
                cc.log("输入的手机号为  =  " + str1);
                if (str1.length != 11)
                {
                    MjClient.showToast("请输入完整的手机号");
                    return;
                }

                var str2 = _textFeildName2.getString();
                cc.log("输入的验证码为  =  " + str2);
                if (str2.length != 6)
                {
                    MjClient.showToast("请输入完整的验证码");
                    return;
                }
                var that = this;
                _Btn_Ok.setTouchEnabled(false);
                _Btn_Ok.setBright(false);

                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.checkVerifyCode",{real_name:str0, mobile_num:str1, verify_code:str2},
                    function(rtn)
                    {
                        MjClient.unblock();
                        if (rtn.message)
                        {
                            MjClient.showToast(rtn.message);
                        }

                        if (rtn.code == 0)
                        {
                            that.initList();
                        }
                        else
                        {
                            _Btn_Ok.setTouchEnabled(true);
                            _Btn_Ok.setBright(true);
                        }
                    });
            }
        }, this);
    },

    init_jianyi:function ()
    {
        var back = this._bg_jianyi.getChildByName("back");
        var jianjiEditBox = new cc.EditBox(cc.size(810, 320), new cc.Scale9Sprite());
        jianjiEditBox.setFontColor(cc.color(0, 0, 0));
        jianjiEditBox.setPlaceholderFontColor(cc.color(128, 128, 128));
        jianjiEditBox.setMaxLength(300);
        jianjiEditBox.setFontSize(24);
        jianjiEditBox.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        jianjiEditBox.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        jianjiEditBox.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        jianjiEditBox.setPlaceHolder("点击输入投诉建议内容");
        jianjiEditBox.setPlaceholderFontSize(24);
        jianjiEditBox.setPosition(435, 272);
        back.addChild(jianjiEditBox);

        var send = back.getChildByName("send");
        send.addTouchEventListener(function (sender, type) {
            if (type != ccui.Widget.TOUCH_ENDED)
                return;
            MjClient.native.umengEvent4CountWithProperty("Huodong_Youxigonggao_Tousujianyi_Fasong", {uid:SelfUid()});
            var content = jianjiEditBox.getString();
            if (content.length < 10) {
                MjClient.showToast("投诉建议内容少于10个字符！");
                return;
            }

            MjClient.block();
            cc.log("投诉建议:" + content);
            MjClient.gamenet.request("pkplayer.handler.addSuggest",{content:escape(content)},function(rtn){
                if(rtn.code==0)
                {
                    jianjiEditBox.setString("");
                    MjClient.showToast("发送投诉建议成功");
                }
                else
                {
                    if (rtn.message)
                        MjClient.showToast(rtn.message);
                    else
                        MjClient.showToast("发送投诉建议失败");
                }
                MjClient.unblock();
            });
        }, this);
    },

    init_yuanbaoDuihuanzuanshi:function (data) {
        cc.log("wxd.....data."+JSON.stringify(data));
        var back = this._bg_yuanbaoDuizuanshi.getChildByName("back");
        var _btn_liji = back.getChildByName("Btn_liji");
        _btn_liji.addTouchEventListener(function (sender, type) {
            if (type != ccui.Widget.TOUCH_ENDED)
                return;
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.openBrowser", {type :15},
                function(rtn) {
                    MjClient.unblock();
                    cc.log(" ===== pkplayer.handler.openBrowser === " + JSON.stringify(rtn));
                    if (rtn.code == 0) {
                        MjClient.Scene.addChild(new DaiLiWebviewLayer(rtn.data));
                    } else {
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        }
                    }
                }
            );
        }, this);
    },


    init_double11:function (data) {
        cc.log("wxd.....data."+JSON.stringify(data));
        var back = this._bg_double_11.getChildByName("back");
        back.addTouchEventListener(function (sender, type) {
            if (type != ccui.Widget.TOUCH_ENDED)
                return;
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.openBrowser", {type :18},
                function(rtn) {
                    MjClient.unblock();
                    cc.log(" ===== pkplayer.handler.openBrowser === " + JSON.stringify(rtn));
                    if (rtn.code == 0) {
                        if(rtn.data) {
                            MjClient.Scene.addChild(new DaiLiWebviewLayer(rtn.data));
                        }
                    } else {
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        }
                    }
                }
            );
        }, this);
    },

    init_screenTime:function (data) {
        cc.log("wxd.....data."+JSON.stringify(data));
    },

    refleshKaiFangGiftStatus:function()
    {
        var _btnKaiFangGift = this._avtivList.getChildByTag(MjClient.ACTIVITY_TYPE.KAI_FANG);
        if (!_btnKaiFangGift)
            return;
        cc.log("pkplayer.handler.getUserCreateRoomInfo");
        MjClient.gamenet.request("pkplayer.handler.getUserCreateRoomInfo",{},
            function(rtn)
            {
                if (rtn.code == 0)
                {
                    var canGet = false;
                    for (var i=0; i<rtn.data.createAward.length; i++)
                    {
                        if (rtn.data.createAward[i].status == 0)
                        {
                            cc.log("can get ");
                            canGet = true;
                            break;
                        }
                    }
                    if (canGet)
                    {
                        var _sprite = _btnKaiFangGift.getChildByName("hongdian");
                        if(!_sprite)
                        {
                            _sprite = new cc.Sprite("hall/hongdian.png");
                            _sprite.setScale(0.7);
                            _sprite.setName("hongdian");
                            _sprite.setPosition(13.5, 65);
                            _btnKaiFangGift.addChild(_sprite);
                        }
                    }
                    else
                    {
                        var _sprite = _btnKaiFangGift.getChildByName("hongdian");
                        if(_sprite)
                        {
                            _sprite.removeFromParent();
                        }
                    }
                }
            });
    },
    refleshChangCiGiftStatus:function()
    {
        var _btnChangCiGift = this._avtivList.getChildByTag(MjClient.ACTIVITY_TYPE.DUI_ZHAN);
        if (!_btnChangCiGift)
            return;

        cc.log("=====refleshChangCiGiftStatus=====");
        MjClient.gamenet.request("pkplayer.handler.getUserPlayGameInfo",{},
            function(rtn)
            {
                if (rtn.code == 0)
                {
                    var canGet = false;
                    for (var i=0; i<rtn.data.playAward.length; i++)
                    {
                        if (rtn.data.playAward[i].status == 0)
                        {

                            canGet = true;
                            break;
                        }
                    }
                    if (canGet)
                    {
                        var _sprite = _btnChangCiGift.getChildByName("hongdian");
                        if(!_sprite)
                        {
                            _sprite = new cc.Sprite("hall/hongdian.png");
                            _sprite.setScale(0.7);
                            _sprite.setName("hongdian");
                            _sprite.setPosition(13.5, 65);
                            _btnChangCiGift.addChild(_sprite);
                        }
                    }
                    else
                    {
                        var _sprite = _btnChangCiGift.getChildByName("hongdian");
                        if(_sprite)
                        {
                            _sprite.removeFromParent();
                        }
                    }
                }
            });
    },


    setCloseCallback:function(callback)
    {
        this._closeCallback = callback;
    }
});

// 新邵阳活动界面
if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
    MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
    MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
    MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
    activityLayer = activityLayer_QXSYDTZ;
}

var duizhan_shareLayer = cc.Layer.extend({
    type:0,
    id:0,
    number:0,
    shareSwitch:false,
    jsBind: {
        back: {

            btn_share: {
                _click: function() {
                    if (cc.sys.OS_WINDOWS == cc.sys.os) {
                        MjClient.wxShareImageToPYQ = true;
                        postEvent("WX_SHARE_SUCCESS", {
                            errCode: 0
                        });
                    }
                    MjClient.duizhanShare_ui.shareSwitch = true;
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.openBrowser", {
                        type: 3, 
                    }, function(rtn) {
                        if (rtn.code == 0) {
                            if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb())
                            {
                                h5.weixinHelper.wxShareUrl(rtn.data,
                                    "敢点，就让你玩到凌晨三点！",
                                    "对局即可获得元宝，分享还翻倍！操作简单，玩法多样，来试试？");
                            }
                            else
                            {
                                MjClient.native.wxShareUrl(rtn.data,
                                    "敢点，就让你玩到凌晨三点！",
                                    "对局即可获得元宝，分享还翻倍！操作简单，玩法多样，来试试？" );
                            }

                        } else {
                            MjClient.showToast(rtn.msg); 
                        }
                        MjClient.unblock(); 
                        
                    });
                                  
                },
                _event: {
                    WX_SHARE_SUCCESS: function(data) {
                        MjClient.wxShareImageToPYQ = false;
                        if (parseInt(data.errCode) == 0 && cc.sys.isObjectValid(MjClient.duizhanShare_ui) && MjClient.duizhanShare_ui.shareSwitch) {
                            // MjClient.showToast("分享成功..."); //回调已经有飘提示了
                            MjClient.block();
                            MjClient.gamenet.request("pkplayer.handler.activityAwardShareDouble", { activityId : MjClient.duizhanShare_ui.id},
                                function(rtn) {
                                    cc.log(" ===== activityAwardShareDouble === " + JSON.stringify(rtn))
                                    if (rtn.code == 0) {
                                        var _data = {};
                                        if (rtn.data > 0 ) {
                                            _data.type = 2;
                                            _data.award = rtn.data;
                                        }else{
                                            _data.type = 0;
                                        }
                                        MjClient.duizhanShare_ui.show_duizhan(_data);
                                    } else {
                                        if (rtn.message) {
                                            MjClient.showToast(rtn.message);
                                        } else {
                                            MjClient.showToast("获取数据失败,请重新打开");
                                        }
                                    }
                                    MjClient.duizhanShare_ui.shareSwitch = false;
                                    MjClient.unblock();
                                }
                            )

                        }
                    }
                },
            },
        }
    },
    ctor: function(data) {
        this._super();
        MjClient.duizhanShare_ui = this;
        
        this.type = data.type; //  1 分享界面 2 获得界面   0 没有中奖
        this.id  = data.id;
        this.number = data.award;
        var UI = ccs.load("Act_duizhan.json");
        BindUiAndLogic(UI.node,this.jsBind);
        this.addChild(UI.node);
        
        
        var that = this;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);
        this._back = _back;
        this._block = _block;

        this.show_duizhan(data);
        
    },
    show_duizhan : function(data){
        this.type = data.type; //  1 分享界面 2 获得界面   0 没有中奖
        this.id  = data.id;
        this.number = data.award;
        var _back = this._back;
        var _block = this._block;
        var _btn_share = _back.getChildByName("btn_share");
        var close = _back.getChildByName("close");
        var that = this;
        this.img_1 = _back.getChildByName("img_1");
        this.img_1.setVisible(false);
        this.img_2 = _back.getChildByName("img_2");
        this.img_2.setVisible(false);
        this.img_0 = _back.getChildByName("img_0");
        this.img_0.setVisible(false);
        _btn_share.setVisible(false);
        close.setVisible(false);
        if (this.type == 0) {
            this.img_0.setVisible(true);
            _block.setTouchEnabled(true);
            cc.log(" ---- _block ----------")
            _block.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent();
                MjClient.duizhanShare_ui = null;
            }
        }, this);
        }else if (this.type == 1) {
            _btn_share.setVisible(true);
            close.setVisible(true);
            this.img_1.setVisible(true);            
            var _txt = this.img_1.getChildByName("Text_1")
            _txt.setString("" + this.number);

        }else if(this.type == 2){
            this.img_2.setVisible(true);
            var _txt = this.img_2.getChildByName("Text_1")
            _txt.setString("" + this.number);
            _block.setTouchEnabled(true);
            cc.log(" ---- _block ----------")
            _block.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent();
                MjClient.duizhanShare_ui = null;
            }
        }, this);
        }
        
        
        close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                MjClient.showMsg("取消分享会视为您放弃此次翻倍机会哦 ！",
                    function() {
                        that.removeFromParent();
                        MjClient.duizhanShare_ui = null;
                    },
                    function() {}, "1");
            }
        }, this);
    }

});
var showHomeActivityIcon = function(homeui, viewType) {
    cc.log("\n",
        "                   _ooOoo_\n",
        "                  o8888888o\n",
        "                  88  .  88\n",
        "                  (| -_- |)\n",
        "                  O-  =  -O\n",
        "               ____|`---'|____\n",
        "             .'  |||     |//  `.\n",
        "            |  |||||  :  |||||  |\n",
        "          |   _||||| -:- |||||-   |\n",
        "           |   | |||  -  ||| |   |\n",
        "           | ||  ''|---|''  |   |\n",
        "           |  .-|__  `-`  ___|-. |\n",
        "         ___`. .'  |--.--|  `. . __\n",
        "      .   '<  `.___|_<|>_|___.'  >'  .\n",
        "     | | :  `- |`.;`| _ |`;.`| - ` : | |\n",
        "     |  | `-.   |_ __| |__ _|   .-` |  |\n",
        "======`-.____`-.___|_____|___.-`____.-'======\n",
        "                   `=---='\n",
        "^^^^^^^^^^^佛祖保佑       永无BUG^^^^^^^^^^^^^\n");
    cc.log('showHomeActivityIcon 初始化主页活动按钮');
    var appType = MjClient.getAppType();
    var allActivity = MjClient.FUNCTION_CONFIG_TYPE;
    var function_config_app = {};
    for(var i in MjClient.APP_TYPE) {
        function_config_app[MjClient.APP_TYPE[i]] = {};
    }

    var addAppLayoutData = function(appType, activityType,layoutData) {
        if(function_config_app[appType] ) {
            // cc.log(" =========== 配置活动id 配置活动id")

            if( allActivity[activityType] ) {
                if (MjClient.systemConfig.functionConfigXY&& MjClient.systemConfig.functionConfigXY[activityType] && 
                    MjClient.systemConfig.functionConfigXY[activityType].x && MjClient.systemConfig.functionConfigXY[activityType].x != 0 &&
                    MjClient.systemConfig.functionConfigXY[activityType].y && MjClient.systemConfig.functionConfigXY[activityType].y !=0){
                    var posx = MjClient.systemConfig.functionConfigXY[activityType].x / 1280;
                    var posy = MjClient.systemConfig.functionConfigXY[activityType].y / 720;
                    layoutData[1] = [posx,posy];                    

                }

                if (MjClient.systemConfig.functionConfigXY&& MjClient.systemConfig.functionConfigXY[activityType]) {
                    if (MjClient.systemConfig.functionConfigXY[activityType].page == HallPageTypeList.COMMON_TYPE) {
                        //主 大厅界面  
                        if (viewType == HallPageTypeList. GOLD_TYPE) {
                            MjClient.systemConfig.functionConfigXY[activityType].isShow = false;
                        }else{
                            MjClient.systemConfig.functionConfigXY[activityType].isShow = true;
                        } 
                                                
                    }else if (MjClient.systemConfig.functionConfigXY[activityType].page == HallPageTypeList. GOLD_TYPE){
                        //金币场 界面
                        if (viewType == HallPageTypeList. GOLD_TYPE) {
                            MjClient.systemConfig.functionConfigXY[activityType].isShow = true;
                        }else{
                            MjClient.systemConfig.functionConfigXY[activityType].isShow = false;
                        }
                        
                    }else{
                        // 两个界面 都有·~~~~
                        MjClient.systemConfig.functionConfigXY[activityType].isShow = true;
                    }
                }
                 
                function_config_app[appType][activityType] = layoutData;
                
            } else {
                cc.log('error FUNCTION_CONFIG_TYPE 没有配置活动id', activityType);
            }

        }
    }

    // QXJSMJ:0,//牌友联盟江苏麻将  
    addAppLayoutData(MjClient.APP_TYPE.QXJSMJ, allActivity.JIA_YOU_HONG_BAO, [[0.12, 0.12], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXJSMJ, allActivity.CAI_SHEN, [[0.11, 0.19], [0.92, 0.0], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXJSMJ, allActivity.QIAN_DAO_YOU_LI, [[0.088, 0.12], [0.92, 0.05], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXJSMJ, allActivity.ZHUA_ZHUA_LE, [[0.122, 0.111], [0.92, 0.7], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXJSMJ, allActivity.JI_FEN_SHANG_CHENG, [[0.079, 0.146], [0.92, 0.1], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXJSMJ, allActivity.DA_ZHUAN_PAN, [[0.076, 0.145], [0.92, 0.3], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXJSMJ, allActivity.ZA_JIN_DAN, [[0.11, 0.16], [0.92, 0.7], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXJSMJ, allActivity.SAI_LONG_ZHOU, [[0.08, 0.143], [0.92, 0.7], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXJSMJ, allActivity.BANG_DING_SHOU_JI, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXJSMJ, allActivity.SHI_MING_REN_ZHENG, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXJSMJ, allActivity.QIAN_DAO_CHOU_JIANG, [[0.08, 0.155], [0.9, 0.5], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXJSMJ, allActivity.ZHONG_QIU_JIE_88_YUAN, [[0.085, 0.125], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXJSMJ, allActivity.FRIENDS_PK, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXJSMJ, allActivity.MIAN_FEI_LI_QUAN, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXJSMJ, allActivity.LI_CAI_BAO_XIANG, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXJSMJ, allActivity.CHUN_JIE_CHOU_QIAN, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXJSMJ, allActivity.JIN_BI_CHANG_HONG_BAO_2019, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXJSMJ, allActivity.FLY_A_KITE, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXJSMJ, allActivity.COLLECT_SPRING_BEAN, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXJSMJ, allActivity.ER_REN_RANK, [[0.1, 0.146], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXJSMJ, allActivity.CLUB_COST_ACTIVITY, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);

    //2,//牌友联盟淮安麻将
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.QIAN_DAO_CHOU_JIANG, [[0.08, 0.155], [0.9, 0.5], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.ACTIVE_RANK, [[0.079, 0.139], [0.95, 0.2], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.FRIENDS_PK, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.JIA_YOU_HONG_BAO, [[0.12, 0.12], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.ZA_JIN_DAN, [[0.11, 0.16], [0.92, 0.7], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.DA_ZHUAN_PAN, [[0.076, 0.145], [0.92, 0.3], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.ZHUA_ZHUA_LE, [[0.122, 0.111], [0.92, 0.7], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.QIAN_DAO_YOU_LI, [[0.088, 0.12], [0.92, 0.05], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.CAI_SHEN, [[0.11, 0.19], [0.92, 0.0], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.JI_FEN_SHANG_CHENG, [[0.079, 0.146], [0.92, 0.1], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.XIN_SHOU_LI_BAO, [[0.125, 0.178], [0.95, 0.75], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.SAI_LONG_ZHOU, [[0.08, 0.143], [0.92, 0.7], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.JU_LE_BU_FU_LI, [[0.088, 0.132], [0.935, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.YAO_QING_HONG_BAO, [[0.078, 0.146], [0.935, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.BANG_DING_SHOU_JI, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.SHI_MING_REN_ZHENG, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.ZHONG_QIU_JIE_88_YUAN, [[0.085, 0.125], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.ZHONG_QIU_JIE_RANK, [[0.094, 0.139], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.MIAN_FEI_LI_QUAN, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.MEI_RI_REN_WU, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.LI_CAI_BAO_XIANG, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.CHUN_JIE_CHOU_QIAN, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.FLY_A_KITE, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.COLLECT_SPRING_BEAN, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.ACTIVITY_DOUBLE_11, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAMJ, allActivity.CLUB_COST_ACTIVITY, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);

    //3,//牌友联盟徐州麻将
    addAppLayoutData(MjClient.APP_TYPE.QXXZMJ, allActivity.QIAN_DAO_CHOU_JIANG, [[0.08, 0.155], [0.9, 0.5], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXZMJ, allActivity.JIA_YOU_HONG_BAO, [[0.12, 0.12], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXZMJ, allActivity.JI_FEN_SHANG_CHENG, [[0.079, 0.146], [0.92, 0.1], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXZMJ, allActivity.DA_ZHUAN_PAN, [[0.076, 0.145], [0.92, 0.3], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXZMJ, allActivity.XIN_SHOU_LI_BAO, [[0.125, 0.178], [0.95, 0.75], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXZMJ, allActivity.QIAN_DAO_YOU_LI, [[0.088, 0.12], [0.92, 0.05], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXZMJ, allActivity.CAI_SHEN, [[0.11, 0.19], [0.92, 0.0], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXZMJ, allActivity.ZHUA_ZHUA_LE, [[0.122, 0.111], [0.92, 0.7], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXZMJ, allActivity.ZA_JIN_DAN, [[0.11, 0.16], [0.92, 0.7], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXZMJ, allActivity.BANG_DING_SHOU_JI, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXZMJ, allActivity.SHI_MING_REN_ZHENG, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXZMJ, allActivity.ZHONG_QIU_JIE_88_YUAN, [[0.085, 0.125], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXZMJ, allActivity.FRIENDS_PK, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXZMJ, allActivity.MIAN_FEI_LI_QUAN, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXZMJ, allActivity.LI_CAI_BAO_XIANG, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXZMJ, allActivity.CHUN_JIE_CHOU_QIAN, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXZMJ, allActivity.FLY_A_KITE, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXZMJ, allActivity.COLLECT_SPRING_BEAN, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXZMJ, allActivity.ACTIVITY_DOUBLE_11, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXZMJ, allActivity.CLUB_COST_ACTIVITY, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);

    //5,//牌友联盟南通棋牌
    addAppLayoutData(MjClient.APP_TYPE.QXNTQP, allActivity.QIAN_DAO_CHOU_JIANG, [[0.08, 0.155], [0.9, 0.5], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXNTQP, allActivity.ACTIVE_RANK, [[0.079, 0.139], [0.95, 0.2], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXNTQP, allActivity.JIA_YOU_HONG_BAO, [[0.12, 0.12], [0.96, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXNTQP, allActivity.ZA_JIN_DAN, [[0.11, 0.16], [0.95, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXNTQP, allActivity.ZHONG_JIN_ZHAO_MU, [[0.125, 0.178], [0.9, 0.75], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXNTQP, allActivity.QIAN_DAO_YOU_LI, [[0.088, 0.12], [0.85, 0.05], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXNTQP, allActivity.CAI_SHEN, [[0.11, 0.19], [0.84, 0.0], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXNTQP, allActivity.ZHUA_ZHUA_LE, [[0.122, 0.111], [0.8, 0.71], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXNTQP, allActivity.DA_ZHUAN_PAN, [[0.076, 0.145], [0.93, 0.1], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXNTQP, allActivity.JI_FEN_SHANG_CHENG, [[0.079, 0.146], [0.95, 0.1], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXNTQP, allActivity.XIN_SHOU_LI_BAO, [[0.125, 0.178], [0.95, 0.75], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXNTQP, allActivity.JU_LE_BU_FU_LI, [[0.088, 0.132], [0.935, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXNTQP, allActivity.YAO_QING_HONG_BAO, [[0.078, 0.146], [0.935, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXNTQP, allActivity.BANG_DING_SHOU_JI, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXNTQP, allActivity.FRIENDS_PK, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXNTQP, allActivity.SHI_MING_REN_ZHENG, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXNTQP, allActivity.ZHONG_QIU_JIE_88_YUAN, [[0.085, 0.125], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXNTQP, allActivity.MIAN_FEI_LI_QUAN, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXNTQP, allActivity.MEI_RI_REN_WU, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXNTQP, allActivity.LI_CAI_BAO_XIANG, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXNTQP, allActivity.CHUN_JIE_CHOU_QIAN, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);


    //8,//牌友联盟岳阳棋牌
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.JIA_YOU_HONG_BAO, [[0.12, 0.12], [0.933, 0.5], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.JU_LE_BU_FU_LI, [[0.088, 0.132], [0.935, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.ZHONG_JIN_ZHAO_MU, [[0.106, 0.1513], [0.894, 0.68], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.XIN_SHOU_LI_BAO, [[0.125, 0.178], [0.95, 0.75], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.DA_ZHUAN_PAN, [[0.076, 0.145], [0.933, 0.50], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.CHONG_ZHI_YOU_LI, [[0.106, 0.1513], [0.934, 0.49], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.QIAN_DAO_YOU_LI, [[0.088, 0.12], [0.918, 0.32], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.ZA_JIN_DAN, [[0.11, 0.16], [0.92, 0.30], [0.0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.ZHUA_ZHUA_LE, [[0.122, 0.111], [0.92, 0.7], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.SAI_LONG_ZHOU, [[0.08, 0.143], [0.92, 0.7], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.JI_FEN_SHANG_CHENG, [[0.079, 0.146], [0.92, 0.1], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.BANG_DING_SHOU_JI, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.SHI_MING_REN_ZHENG, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.YAO_QING_HONG_BAO, [[0.078, 0.146], [0.935, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.QIAN_DAO_CHOU_JIANG, [[0.08, 0.155], [0.9, 0.5], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.ZHONG_QIU_JIE_88_YUAN, [[0.085, 0.125], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.ZHONG_QIU_JIE_RANK, [[0.094, 0.139], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.JIN_BI_CHANG_HUO_DONG, [[0.076, 0.136], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.MIAN_FEI_LI_QUAN, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.GOLD_YAO_QING_HONG_BAO, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.FRIENDS_PK, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.LI_CAI_BAO_XIANG, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.JIN_BI_CHANG_HONG_BAO_2019, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.CHUN_JIE_CHOU_QIAN, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.FLY_A_KITE, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.COLLECT_SPRING_BEAN, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.ACTIVITY_CLUB_MONTH, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYYQP, allActivity.LI_CAI_BAO_XIANG_ZS, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);

    //9,//牌友联盟海安麻将
    addAppLayoutData(MjClient.APP_TYPE.QXHAIANMJ, allActivity.JI_FEN_SHANG_CHENG, [[0.079, 0.146], [0.92, 0.1], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAIANMJ, allActivity.YAO_QING_HONG_BAO, [[0.078, 0.146], [0.935, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAIANMJ, allActivity.JIA_YOU_HONG_BAO, [[0.12, 0.12], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAIANMJ, allActivity.JU_LE_BU_FU_LI, [[0.088, 0.132], [0.935, 0.15], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAIANMJ, allActivity.DA_ZHUAN_PAN, [[0.076, 0.145], [0.92, 0.1], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAIANMJ, allActivity.ZHONG_JIN_ZHAO_MU, [[0.125, 0.178], [0.92, 0.75], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAIANMJ, allActivity.ZHUA_ZHUA_LE, [[0.122, 0.111], [0.92, 0.05], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAIANMJ, allActivity.ZA_JIN_DAN, [[0.11, 0.16], [0.92, 0.10], [0.0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAIANMJ, allActivity.XIN_SHOU_LI_BAO, [[0.125, 0.178], [0.95, 0.75], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAIANMJ, allActivity.SAI_LONG_ZHOU, [[0.08, 0.143], [0.92, 0.7], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAIANMJ, allActivity.CHONG_ZHI_YOU_LI, [[0.106, 0.1513], [0.934, 0.49], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAIANMJ, allActivity.BANG_DING_SHOU_JI, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAIANMJ, allActivity.SHI_MING_REN_ZHENG, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAIANMJ, allActivity.MIAN_FEI_LI_QUAN, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAIANMJ, allActivity.QIAN_DAO_CHOU_JIANG, [[0.08, 0.155], [0.9, 0.5], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAIANMJ, allActivity.LI_CAI_BAO_XIANG, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAIANMJ, allActivity.CHUN_JIE_CHOU_QIAN, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAIANMJ, allActivity.COLLECT_SPRING_BEAN, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXHAIANMJ, allActivity.ACTIVITY_DOUBLE_11, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);

    //10,//天星晋中麻将
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.ACTIVE_RANK, [[0.079, 0.139], [0.95, 0.2], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.JIA_YOU_HONG_BAO, [[0.12, 0.12], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.ZHUA_ZHUA_LE, [[0.122, 0.111], [0.9, 0.65], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.DA_ZHUAN_PAN, [[0.076, 0.145], [0.95, 0.15], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.CHONG_ZHI_YOU_LI, [[0.106, 0.1513], [0.934, 0.49], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.QIAN_DAO_YOU_LI, [[0.088, 0.12], [0.918, 0.64], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.JU_LE_BU_FU_LI, [[0.088, 0.132], [0.935, 0.32], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.XIN_SHOU_LI_BAO, [[0.125, 0.178], [0.95, 0.09], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.SAI_LONG_ZHOU, [[0.08, 0.143], [0.92, 0.7], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.JI_FEN_SHANG_CHENG, [[0.079, 0.146], [0.92, 0.1], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.ZA_JIN_DAN, [[0.11, 0.16], [0.92, 0.10], [0.0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.BANG_DING_SHOU_JI, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.SHI_MING_REN_ZHENG, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.MIAN_FEI_LI_QUAN, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.ZHONG_QIU_JIE_88_YUAN, [[0.085, 0.125], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.ZHONG_QIU_JIE_RANK, [[0.094, 0.139], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.YAO_QING_HONG_BAO, [[0.078, 0.146], [0.935, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.FRIENDS_PK, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.GOLD_YAO_QING_HONG_BAO, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.LI_CAI_BAO_XIANG, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.QIAN_DAO_CHOU_JIANG, [[0.08, 0.155], [0.9, 0.5], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.CHUN_JIE_CHOU_QIAN, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.JIN_BI_CHANG_HONG_BAO_2019, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.FLY_A_KITE, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.COLLECT_SPRING_BEAN, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.TXJINZHONGMJ, allActivity.ACTIVITY_CLUB_MONTH, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);


    //4,//牌友联盟永州棋牌
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.JIA_YOU_HONG_BAO, [[0.12, 0.12], [0.96, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.QIAN_DAO_YOU_LI, [[0.088, 0.12], [0.94, 0.22], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.CAI_SHEN, [[0.11, 0.19], [0.84, 0.0], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.YAO_QING_HONG_BAO, [[0.078, 0.146], [0.935, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.ZHUA_ZHUA_LE, [[0.122, 0.111], [0.94, 0.65], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.JU_LE_BU_FU_LI, [[0.088, 0.132], [0.95, 0.5], [0.0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.DA_ZHUAN_PAN, [[0.076, 0.145], [0.95, 0.57], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.ZA_JIN_DAN, [[0.11, 0.16], [0.95, 0.55], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.JI_FEN_SHANG_CHENG, [[0.079, 0.146], [0.95, 0.1], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.SAI_LONG_ZHOU, [[0.08, 0.143], [0.92, 0.7], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.BANG_DING_SHOU_JI, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.SHI_MING_REN_ZHENG, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.ZHONG_QIU_JIE_YONGZHOU , [[0.1, 0.158], [0.935, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.ZHONG_QIU_JIE_88_YUAN, [[0.085, 0.125], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.MIAN_FEI_LI_QUAN, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.FRIENDS_PK, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.LI_CAI_BAO_XIANG, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.FRIENDS_PK_NEW, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.CHUN_JIE_CHOU_QIAN, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.FLY_A_KITE, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.COLLECT_SPRING_BEAN, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.ACTIVITY_DOUBLE_11, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXYZQP, allActivity.LI_CAI_BAO_XIANG_ZS, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);

    //8,//牌友联盟耒阳棋牌
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.JU_LE_BU_FU_LI, [[0.088, 0.132], [0.95, 0.5], [0.0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.JI_FEN_SHANG_CHENG, [[0.079, 0.146], [0.95, 0.1], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.JIA_YOU_HONG_BAO, [[0.12, 0.12], [0.96, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.DA_ZHUAN_PAN, [[0.076, 0.145], [0.95, 0.15], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.ZA_JIN_DAN, [[0.11, 0.16], [0.92, 0.10], [0.0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.CAI_SHEN, [[0.11, 0.19], [0.84, 0.0], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.XIN_REN_FU_LI, [[0.08, 0.12], [1.0, 0.6], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.CHONG_ZHI_YOU_LI, [[0.106, 0.1513], [0.934, 0.49], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.ZHUA_ZHUA_LE, [[0.122, 0.111], [0.94, 0.65], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.SAI_LONG_ZHOU, [[0.08, 0.143], [0.92, 0.7], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.XIN_SHOU_LI_BAO, [[0.125, 0.178], [0.83, 0.09], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.YAO_QING_HONG_BAO, [[0.078, 0.146], [0.935, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.BANG_DING_SHOU_JI, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.SHI_MING_REN_ZHENG, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.QIAN_DAO_CHOU_JIANG, [[0.08, 0.155], [0.9, 0.5], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.ZHONG_QIU_JIE_88_YUAN, [[0.085, 0.125], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.ZHONG_QIU_JIE_RANK, [[0.094, 0.139], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.ACTIVE_RANK, [[0.079, 0.139], [0.95, 0.2], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.MIAN_FEI_LI_QUAN, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.FRIENDS_PK, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.LI_CAI_BAO_XIANG, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.CHUN_JIE_CHOU_QIAN, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.FLY_A_KITE, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.COLLECT_SPRING_BEAN, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXLYQP, allActivity.ACTIVITY_DOUBLE_11, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);

    //9,//北斗衡阳字牌
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.JIA_YOU_HONG_BAO, [[0.12, 0.12], [0.96, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.ZA_JIN_DAN, [[0.11, 0.16], [0.95, 0.55], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.DA_ZHUAN_PAN, [[0.076, 0.145], [1, 1.02], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.CHONG_ZHI_YOU_LI, [[0.106, 0.1513], [0.95, 0.4], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.JU_LE_BU_FU_LI, [[0.088, 0.132], [0.95, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.ZHUA_ZHUA_LE, [[0.122, 0.111], [0.90, 0.35], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.XIN_SHOU_LI_BAO, [[0.125, 0.178], [0.83, 0.09], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.SAI_LONG_ZHOU, [[0.08, 0.143], [0.92, 0.7], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.YAO_QING_HONG_BAO, [[0.078, 0.146], [0.935, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.JI_FEN_SHANG_CHENG, [[0.079, 0.146], [0.95, 0.1], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.BANG_DING_SHOU_JI, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.SHI_MING_REN_ZHENG, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.QIAN_DAO_CHOU_JIANG, [[0.08, 0.155], [0.9, 0.5], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.ZHONG_QIU_JIE_88_YUAN, [[0.085, 0.125], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.ZHONG_QIU_JIE_RANK, [[0.094, 0.139], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.MIAN_FEI_LI_QUAN, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.FRIENDS_PK, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.LI_CAI_BAO_XIANG, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.CHUN_JIE_CHOU_QIAN, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.JIN_BI_CHANG_HONG_BAO_2019, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.FLY_A_KITE, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.COLLECT_SPRING_BEAN, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.BDHYZP, allActivity.ACTIVITY_DOUBLE_11, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    // BDYZPHZ:10,//北斗永州跑胡子
    
    
    // QXSYDTZ:11,//牌友联盟邵阳打筒子
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.ACTIVE_RANK, [[0.079, 0.139], [0.95, 0.2], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.JI_FEN_SHANG_CHENG, [[0.079, 0.146], [0.95, 0.1], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.CHONG_ZHI_YOU_LI, [[0.106, 0.1513], [0.95, 0.40], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.JU_LE_BU_FU_LI, [[0.088, 0.132], [0.95, 0.6], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.ZHONG_JIN_ZHAO_MU, [[0.125, 0.178], [0.9, 0.60], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.CAI_SHEN, [[0.11, 0.19], [0.84, 0.0], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.DA_ZHUAN_PAN, [[0.076, 0.145], [1, 1.02], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.ZA_JIN_DAN, [[0.11, 0.16], [0.95, 0.6], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.ZHUA_ZHUA_LE, [[0.122, 0.111], [0.90, 0.35], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.SAI_LONG_ZHOU, [[0.08, 0.143], [0.92, 0.7], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.SHI_MING_REN_ZHENG, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.BANG_DING_SHOU_JI, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.QIAN_DAO_CHOU_JIANG, [[0.08, 0.155], [0.9, 0.5], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.ZHONG_QIU_JIE_88_YUAN, [[0.085, 0.125], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.ZHONG_QIU_JIE_RANK, [[0.094, 0.139], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.MIAN_FEI_LI_QUAN, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.FRIENDS_PK, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.GOLD_YAO_QING_HONG_BAO, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.LI_CAI_BAO_XIANG, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.JIN_BI_CHANG_HUO_DONG_2, [[0.076, 0.136], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.CHUN_JIE_CHOU_QIAN, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.JIN_BI_CHANG_HONG_BAO_2019, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.FLY_A_KITE, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.COLLECT_SPRING_BEAN, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.ACTIVITY_CLUB_MONTH, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXSYDTZ, allActivity.LI_CAI_BAO_XIANG_ZS, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);


    //12 永利湖南棋牌游戏  add by sking
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.JIA_YOU_HONG_BAO, [[0.12, 0.12], [0.933, 0.5], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.JU_LE_BU_FU_LI, [[0.088, 0.132], [0.935, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.ZHONG_JIN_ZHAO_MU, [[0.106, 0.1513], [0.894, 0.68], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.XIN_SHOU_LI_BAO, [[0.125, 0.178], [0.95, 0.75], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.DA_ZHUAN_PAN, [[0.076, 0.145], [0.933, 0.50], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.CHONG_ZHI_YOU_LI, [[0.106, 0.1513], [0.934, 0.49], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.QIAN_DAO_YOU_LI, [[0.088, 0.12], [0.918, 0.32], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.ZA_JIN_DAN, [[0.11, 0.16], [0.92, 0.30], [0.0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.ZHUA_ZHUA_LE, [[0.122, 0.111], [0.92, 0.7], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.SAI_LONG_ZHOU, [[0.08, 0.143], [0.92, 0.7], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.JI_FEN_SHANG_CHENG, [[0.079, 0.146], [0.92, 0.1], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.BANG_DING_SHOU_JI, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.SHI_MING_REN_ZHENG, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.YAO_QING_HONG_BAO, [[0.078, 0.146], [0.935, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.QIAN_DAO_CHOU_JIANG, [[0.08, 0.155], [0.9, 0.5], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.ZHONG_QIU_JIE_88_YUAN, [[0.085, 0.125], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.ZHONG_QIU_JIE_RANK, [[0.094, 0.139], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.JIN_BI_CHANG_HUO_DONG, [[0.076, 0.136], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.MIAN_FEI_LI_QUAN, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.GOLD_YAO_QING_HONG_BAO, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.FRIENDS_PK, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.LI_CAI_BAO_XIANG, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.JIN_BI_CHANG_HONG_BAO_2019, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.CHUN_JIE_CHOU_QIAN, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.YLHUNANMJ, allActivity.COLLECT_SPRING_BEAN, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);

    //13,//贵州AYGUIZHOUMJ
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.ACTIVE_RANK, [[0.079, 0.139], [0.95, 0.2], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.JIA_YOU_HONG_BAO, [[0.12, 0.12], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.ZHUA_ZHUA_LE, [[0.122, 0.111], [0.9, 0.65], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.DA_ZHUAN_PAN, [[0.076, 0.145], [0.95, 0.15], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.CHONG_ZHI_YOU_LI, [[0.106, 0.1513], [0.934, 0.49], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.QIAN_DAO_YOU_LI, [[0.088, 0.12], [0.918, 0.64], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.JU_LE_BU_FU_LI, [[0.088, 0.132], [0.935, 0.32], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.XIN_SHOU_LI_BAO, [[0.125, 0.178], [0.95, 0.09], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.SAI_LONG_ZHOU, [[0.08, 0.143], [0.92, 0.7], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.JI_FEN_SHANG_CHENG, [[0.079, 0.146], [0.92, 0.1], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.ZA_JIN_DAN, [[0.11, 0.16], [0.92, 0.10], [0.0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.BANG_DING_SHOU_JI, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.SHI_MING_REN_ZHENG, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.MIAN_FEI_LI_QUAN, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.ZHONG_QIU_JIE_88_YUAN, [[0.085, 0.125], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.ZHONG_QIU_JIE_RANK, [[0.094, 0.139], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.YAO_QING_HONG_BAO, [[0.078, 0.146], [0.935, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.FRIENDS_PK, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.GOLD_YAO_QING_HONG_BAO, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.LI_CAI_BAO_XIANG, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.QIAN_DAO_CHOU_JIANG, [[0.08, 0.155], [0.9, 0.5], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.CHUN_JIE_CHOU_QIAN, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.AYGUIZHOUMJ, allActivity.JIN_BI_CHANG_HONG_BAO_2019, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);

    //13,//四川LYSICHUANMJ
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.ACTIVE_RANK, [[0.079, 0.139], [0.95, 0.2], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.JIA_YOU_HONG_BAO, [[0.12, 0.12], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.ZHUA_ZHUA_LE, [[0.122, 0.111], [0.9, 0.65], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.DA_ZHUAN_PAN, [[0.076, 0.145], [0.95, 0.15], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.CHONG_ZHI_YOU_LI, [[0.106, 0.1513], [0.934, 0.49], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.QIAN_DAO_YOU_LI, [[0.088, 0.12], [0.918, 0.64], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.JU_LE_BU_FU_LI, [[0.088, 0.132], [0.935, 0.32], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.XIN_SHOU_LI_BAO, [[0.125, 0.178], [0.95, 0.09], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.SAI_LONG_ZHOU, [[0.08, 0.143], [0.92, 0.7], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.JI_FEN_SHANG_CHENG, [[0.079, 0.146], [0.92, 0.1], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.ZA_JIN_DAN, [[0.11, 0.16], [0.92, 0.10], [0.0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.BANG_DING_SHOU_JI, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.SHI_MING_REN_ZHENG, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.MIAN_FEI_LI_QUAN, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.ZHONG_QIU_JIE_88_YUAN, [[0.085, 0.125], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.ZHONG_QIU_JIE_RANK, [[0.094, 0.139], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.YAO_QING_HONG_BAO, [[0.078, 0.146], [0.935, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.FRIENDS_PK, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.GOLD_YAO_QING_HONG_BAO, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.LI_CAI_BAO_XIANG, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.QIAN_DAO_CHOU_JIANG, [[0.08, 0.155], [0.9, 0.5], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.CHUN_JIE_CHOU_QIAN, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.LYSICHUANMJ, allActivity.JIN_BI_CHANG_HONG_BAO_2019, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);


    // QXXXGHZ:12,//牌友联盟湘乡告胡子
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.JI_FEN_SHANG_CHENG, [[0.079, 0.146], [0.95, 0.1], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.DA_ZHUAN_PAN, [[0.076, 0.145], [1, 1.02], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.JU_LE_BU_FU_LI, [[0.088, 0.132], [0.95, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.XIN_SHOU_LI_BAO, [[0.125, 0.178], [0.83, 0.09], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.BANG_DING_SHOU_JI, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.SHI_MING_REN_ZHENG, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.CHONG_ZHI_YOU_LI, [[0.106, 0.1513], [0.95, 0.40], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.QIAN_DAO_YOU_LI, [[0.088, 0.12], [0.94, 0.22], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.ZA_JIN_DAN, [[0.11, 0.16], [0.95, 0.6], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.QIAN_DAO_CHOU_JIANG, [[0.08, 0.155], [0.9, 0.5], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.YAO_QING_HONG_BAO, [[0.078, 0.146], [0.935, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.ZHONG_QIU_JIE_88_YUAN, [[0.085, 0.125], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.ZHONG_QIU_JIE_RANK, [[0.094, 0.139], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.FRIENDS_PK, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.MIAN_FEI_LI_QUAN, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.MEI_RI_REN_WU, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.LI_CAI_BAO_XIANG, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.FRIENDS_PK_NEW, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.CHUN_JIE_CHOU_QIAN, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.FLY_A_KITE, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.COLLECT_SPRING_BEAN, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.QXXXGHZ, allActivity.ACTIVITY_DOUBLE_11, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    // QXHHZP:13, //牌友联盟怀化字牌

    // HUNANWANGWANG:11,//牌友联盟邵阳打筒子
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.ACTIVE_RANK, [[0.079, 0.139], [0.95, 0.2], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.JI_FEN_SHANG_CHENG, [[0.079, 0.146], [0.95, 0.1], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.CHONG_ZHI_YOU_LI, [[0.106, 0.1513], [0.95, 0.40], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.JU_LE_BU_FU_LI, [[0.088, 0.132], [0.95, 0.6], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.ZHONG_JIN_ZHAO_MU, [[0.125, 0.178], [0.9, 0.60], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.CAI_SHEN, [[0.11, 0.19], [0.84, 0.0], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.DA_ZHUAN_PAN, [[0.076, 0.145], [1, 1.02], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.ZA_JIN_DAN, [[0.11, 0.16], [0.95, 0.6], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.ZHUA_ZHUA_LE, [[0.122, 0.111], [0.90, 0.35], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.SAI_LONG_ZHOU, [[0.08, 0.143], [0.92, 0.7], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.SHI_MING_REN_ZHENG, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.BANG_DING_SHOU_JI, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.QIAN_DAO_CHOU_JIANG, [[0.08, 0.155], [0.9, 0.5], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.ZHONG_QIU_JIE_88_YUAN, [[0.085, 0.125], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.ZHONG_QIU_JIE_RANK, [[0.094, 0.139], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.MIAN_FEI_LI_QUAN, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.FRIENDS_PK, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.GOLD_YAO_QING_HONG_BAO, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.LI_CAI_BAO_XIANG, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.JIN_BI_CHANG_HUO_DONG_2, [[0.076, 0.136], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.CHUN_JIE_CHOU_QIAN, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.JIN_BI_CHANG_HONG_BAO_2019, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.FLY_A_KITE, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUNANWANGWANG, allActivity.COLLECT_SPRING_BEAN, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);

    //逗趣山西麻将
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.ACTIVE_RANK, [[0.079, 0.139], [0.95, 0.2], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.JIA_YOU_HONG_BAO, [[0.12, 0.12], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.ZHUA_ZHUA_LE, [[0.122, 0.111], [0.9, 0.65], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.DA_ZHUAN_PAN, [[0.076, 0.145], [0.95, 0.15], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.CHONG_ZHI_YOU_LI, [[0.106, 0.1513], [0.934, 0.49], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.QIAN_DAO_YOU_LI, [[0.088, 0.12], [0.918, 0.64], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.JU_LE_BU_FU_LI, [[0.088, 0.132], [0.935, 0.32], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.XIN_SHOU_LI_BAO, [[0.125, 0.178], [0.95, 0.09], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.SAI_LONG_ZHOU, [[0.08, 0.143], [0.92, 0.7], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.JI_FEN_SHANG_CHENG, [[0.079, 0.146], [0.92, 0.1], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.ZA_JIN_DAN, [[0.11, 0.16], [0.92, 0.10], [0.0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.BANG_DING_SHOU_JI, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.SHI_MING_REN_ZHENG, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.MIAN_FEI_LI_QUAN, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.ZHONG_QIU_JIE_88_YUAN, [[0.085, 0.125], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.ZHONG_QIU_JIE_RANK, [[0.094, 0.139], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.YAO_QING_HONG_BAO, [[0.078, 0.146], [0.935, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.FRIENDS_PK, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.GOLD_YAO_QING_HONG_BAO, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.LI_CAI_BAO_XIANG, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.QIAN_DAO_CHOU_JIANG, [[0.08, 0.155], [0.9, 0.5], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.CHUN_JIE_CHOU_QIAN, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.JIN_BI_CHANG_HONG_BAO_2019, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.FLY_A_KITE, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.COLLECT_SPRING_BEAN, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.DQSHANXIMJ, allActivity.ACTIVITY_CLUB_MONTH, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);

    //湖北棋牌
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.JIA_YOU_HONG_BAO, [[0.12, 0.12], [0.933, 0.5], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.JU_LE_BU_FU_LI, [[0.088, 0.132], [0.935, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.ZHONG_JIN_ZHAO_MU, [[0.106, 0.1513], [0.894, 0.68], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.XIN_SHOU_LI_BAO, [[0.125, 0.178], [0.95, 0.75], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.DA_ZHUAN_PAN, [[0.076, 0.145], [0.933, 0.50], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.CHONG_ZHI_YOU_LI, [[0.106, 0.1513], [0.934, 0.49], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.QIAN_DAO_YOU_LI, [[0.088, 0.12], [0.918, 0.32], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.ZA_JIN_DAN, [[0.11, 0.16], [0.92, 0.30], [0.0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.ZHUA_ZHUA_LE, [[0.122, 0.111], [0.92, 0.7], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.SAI_LONG_ZHOU, [[0.08, 0.143], [0.92, 0.7], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.JI_FEN_SHANG_CHENG, [[0.079, 0.146], [0.92, 0.1], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.BANG_DING_SHOU_JI, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.SHI_MING_REN_ZHENG, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.YAO_QING_HONG_BAO, [[0.078, 0.146], [0.935, 0.20], [0, 0.0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.QIAN_DAO_CHOU_JIANG, [[0.08, 0.155], [0.9, 0.5], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.ZHONG_QIU_JIE_88_YUAN, [[0.085, 0.125], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.ZHONG_QIU_JIE_RANK, [[0.094, 0.139], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.JIN_BI_CHANG_HUO_DONG, [[0.076, 0.136], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.MIAN_FEI_LI_QUAN, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.GOLD_YAO_QING_HONG_BAO, [[0.09, 0.167], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.FRIENDS_PK, [[0.08, 0.126], [0.7, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.LI_CAI_BAO_XIANG, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.JIN_BI_CHANG_HONG_BAO_2019, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ , allActivity.ACTIVITY_CLUB_MONTH, [[0.08, 0.14], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.COLLECT_SPRING_BEAN, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.FLY_A_KITE, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);
    addAppLayoutData(MjClient.APP_TYPE.HUBEIMJ, allActivity.CHUN_JIE_CHOU_QIAN, [[0.08, 0.138], [0.92, 0.4], [0, 0]]);


    var getLayoutData = function(function_type) {
        var layoutData = function_config_app[appType][function_type];
        if(!layoutData) { 
            cc.log('暂未同步此活动资源', function_type);
        } else {
            cc.log('此活动资源已同步', function_type);
        }
        return layoutData;
    };

    
    // 积分商城  
    var layoutData = getLayoutData(allActivity.JI_FEN_SHANG_CHENG);
    if(layoutData)  showHomeActivityIcon_jifenShop(homeui, layoutData);


    // 朋友圈对战
    layoutData = getLayoutData(allActivity.FRIENDS_PK);
    if(layoutData) showHomeActivityIcon_friendsPK(homeui, layoutData); 

     // 加油红包
    layoutData = getLayoutData(allActivity.JIA_YOU_HONG_BAO);
    if(layoutData) showHomeActivityIcon_jiayouhongbao(homeui, layoutData);

     // 抓娃娃
    layoutData = getLayoutData(allActivity.ZHUA_ZHUA_LE);
    if(layoutData) showHomeActivityIcon_zhuazhuale(homeui, layoutData);

    // 砸金蛋
    layoutData = getLayoutData(allActivity.ZA_JIN_DAN);
    if(layoutData) showHomeActivityIcon_zajindan(homeui, layoutData);

    // 排行榜活动
    layoutData = getLayoutData(allActivity.ACTIVE_RANK);
    if(layoutData) showHomeActivityIcon_activerank(homeui, layoutData);

    // 大转盘
    layoutData = getLayoutData(allActivity.DA_ZHUAN_PAN);
    if(layoutData) showHomeActivityIcon_dazhuanpan(homeui, layoutData);

    // 邀请红包
    layoutData = getLayoutData(allActivity.YAO_QING_HONG_BAO);
    if(layoutData) showHomeActivityIcon_yaoqinghongbao(homeui, layoutData);

    // 赛龙舟
    layoutData = getLayoutData(allActivity.SAI_LONG_ZHOU);
    if(layoutData) showHomeActivityIcon_sailongzhou(homeui, layoutData);

    // 签到有礼
    layoutData = getLayoutData(allActivity.QIAN_DAO_YOU_LI);
    if(layoutData) showHomeActivityIcon_qiandaoyouli(homeui, layoutData);

    // 财神活动
    layoutData = getLayoutData(allActivity.CAI_SHEN);
    if(layoutData) showHomeActivityIcon_caishen(homeui, layoutData);

    // 充值有礼
    layoutData = getLayoutData(allActivity.CHONG_ZHI_YOU_LI);
    if(layoutData) showHomeActivityIcon_chongzhiyouli(homeui, layoutData);

    // 800 1200 重金招募
    layoutData = getLayoutData(allActivity.ZHONG_JIN_ZHAO_MU);
    if(layoutData) showHomeActivityIcon_zhongjinzhaomu(homeui, layoutData);

    // 新人福利
    layoutData = getLayoutData(allActivity.XIN_REN_FU_LI);
    if(layoutData) showHomeActivityIcon_xinrenfuli(homeui, layoutData);

    // 亲友圈福利
    layoutData = getLayoutData(allActivity.JU_LE_BU_FU_LI);
    if(layoutData) showHomeActivityIcon_julebufuli(homeui, layoutData);

    // 新手礼包
    layoutData = getLayoutData(allActivity.XIN_SHOU_LI_BAO);
    if(layoutData) showHomeActivityIcon_xinshoulibao(homeui, layoutData);

    //绑定手机
    layoutData = getLayoutData(allActivity.BANG_DING_SHOU_JI);
    if(layoutData) showHomeActivityIcon_bangdingshouji(homeui, layoutData);

    //实名认证
    layoutData = getLayoutData(allActivity.SHI_MING_REN_ZHENG);
    if(layoutData) showHomeActivityIcon_shimingrenzheng(homeui, layoutData);

    //免费礼券
    layoutData = getLayoutData(allActivity.MIAN_FEI_LI_QUAN);
    if(layoutData) showHomeActivityIcon_mianfeiliquan(homeui, layoutData);

    //签到抽奖
    layoutData = getLayoutData(allActivity.QIAN_DAO_CHOU_JIANG);
    if(layoutData) showHomeActivityIcon_qiandaochoujiang(homeui, layoutData);

    //中秋 永州方案
    layoutData = getLayoutData(allActivity.ZHONG_QIU_JIE_YONGZHOU );
    if(layoutData) showHomeActivityIcon_yongzhouZhongQiuJie(homeui, layoutData);

    //中秋节88元红包活动
    layoutData = getLayoutData(allActivity.ZHONG_QIU_JIE_88_YUAN);
    if(layoutData) showHomeActivityIcon_zhongqiujie88(homeui, layoutData);

    //中秋节排行榜活动
    layoutData = getLayoutData(allActivity.ZHONG_QIU_JIE_RANK);
    if(layoutData) showHomeActivityIcon_zhongqiujieRank(homeui, layoutData);

    // 朋友圈对战
    layoutData = getLayoutData(allActivity.FRIENDS_PK);
    if(layoutData) showHomeActivityIcon_friendsPK(homeui, layoutData);

    //金币场活动
    layoutData = getLayoutData(allActivity.JIN_BI_CHANG_HUO_DONG);
    if(layoutData) showHomeActivityIcon_jinbinchangActive(homeui, layoutData);

    //每日任务活动
    layoutData = getLayoutData(allActivity.MEI_RI_REN_WU);
    if(layoutData) showHomeActivityIcon_meirirenwu(homeui, layoutData);

    //金币场邀请红包
    layoutData = getLayoutData(allActivity.GOLD_YAO_QING_HONG_BAO);
    if(layoutData) showHomeActivityIcon_goldInviteRedpacket(homeui, layoutData);

    //理财宝箱
    layoutData = getLayoutData(allActivity.LI_CAI_BAO_XIANG);
    if(layoutData) showHomeActivityIcon_InvestmentBox(homeui, layoutData);

    //金币场活动2
    layoutData = getLayoutData(allActivity.JIN_BI_CHANG_HUO_DONG_2);
    if(layoutData) showHomeActivityIcon_jinbinchangActive_2(homeui, layoutData);

    // 新朋友圈对战
    layoutData = getLayoutData(allActivity.FRIENDS_PK_NEW);
    if(layoutData) showHomeActivityIcon_friendsPKNew(homeui, layoutData);

    //理财宝箱
    layoutData = getLayoutData(allActivity.JIN_BI_CHANG_HONG_BAO_2019);
    if(layoutData) showHomeActivityIcon_goldNewYearRedPacket(homeui, layoutData);

	//春节抽签
    layoutData = getLayoutData(allActivity.CHUN_JIE_CHOU_QIAN);
    if(layoutData) showHomeActivityIcon_chunjiechouqian(homeui, layoutData);

    //放风筝活动
    layoutData = getLayoutData(allActivity.FLY_A_KITE);
    if(layoutData) showHomeActivityIcon_flyAKite(homeui, layoutData);

    //五一集春豆
    layoutData = getLayoutData(allActivity.COLLECT_SPRING_BEAN);
    if(layoutData) showHomeActivityIcon_collectSpringBean(homeui, layoutData);

    //场次增长
    layoutData = getLayoutData(allActivity.ACTIVITY_CLUB_MONTH);
    if(layoutData) showHomeActivityIcon_changciGrowth(homeui, layoutData);

    // 二人排行榜
    layoutData = getLayoutData(allActivity.ER_REN_RANK);
    if(layoutData) showHomeActivityIcon_erRenRank(homeui, layoutData);

    // 亲友圈元宝消耗活动(新版)
    layoutData = getLayoutData(allActivity.CLUB_COST_ACTIVITY);
    if(layoutData) showHomeActivityIcon_clubCost(homeui, layoutData);

    //双11活动
    layoutData = getLayoutData(allActivity.ACTIVITY_DOUBLE_11);
    if(layoutData) showHomeActivityIcon_double11(homeui, layoutData);

    //钻石宝箱
    layoutData = getLayoutData(allActivity.LI_CAI_BAO_XIANG_ZS);
    if(layoutData) showHomeActivityIcon_InvestmentBoxZS(homeui, layoutData);
};

var showHomeActivityIcon_jifenShop = function(homeui, layoutData) {
    // 积分商城
    var _btn_jifenShop = homeui.node.getChildByName("btn_jifenShop");
    cc.log(" ======== _btn_jifenShop ",_btn_jifenShop);
    if (_btn_jifenShop) {
        _btn_jifenShop.setVisible( MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JI_FEN_SHANG_CHENG) && !MjClient.isShenhe && !MjClient.remoteCfg.guestLogin 
            && MjClient.systemConfig.functionConfigXY["JI_FEN_SHANG_CHENG"] && MjClient.systemConfig.functionConfigXY["JI_FEN_SHANG_CHENG"].isShow);
        setWgtLayout(_btn_jifenShop, layoutData[0], layoutData[1], layoutData[2]);

        var hongbao = _btn_jifenShop.getChildByName("bg_1");
        hongbao.x += 10;
        hongbao.visible = false;
        hongbao.runAction(cc.RepeatForever.create(cc.Sequence.create(
            cc.spawn(cc.scaleTo(1.0, 0.5), cc.fadeTo(1.0, 0)), cc.spawn(cc.scaleTo(1.0, 1.0), cc.fadeTo(1.0, 255)))));
        var bg_2 = _btn_jifenShop.getChildByName("bg_2");
        // if (bg_2) {
        //     bg_2.runAction(cc.RepeatForever.create(cc.rotateBy(2,180)))
        // }
        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("ShopOfJiFen/enter_1.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        if (bg_2) {
            bg_2.addChild(clipper);
        }
        else {
            _btn_jifenShop.addChild(clipper);
        }
        var sprite = new cc.Sprite("ShopOfJiFen/enter_3.png");
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction); //进行向右移动的重复动作

        _btn_jifenShop.addTouchEventListener(function(sender, Type) {
            if(!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JI_FEN_SHANG_CHENG)) return;
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Duihuanshangcheng", {uid:SelfUid()});
                    updateUserBehavior("兑换商城");
                    if (MjClient.isUseUIv3 && MjClient.isUseUIv3()){
                        MjClient.Scene.addChild(new ShopOfJifen_layer_v3());
                    }else{
                        MjClient.Scene.addChild(new ShopOfJifen_layer());
                    }
                    break;
            }
        }, this); 

        // _btn_jifenShop.schedule(function () {
            
        //     if (MjClient.ShopOfJifen_mainUI) {
        //        if (MjClient.ShopOfJifen_mainUI._canGet) {
        //            hongbao.visible = true;
        //        }else{
        //             hongbao.visible = false;
        //        }
        //     }

        // }, 1);
    }

};


var showHomeActivityIcon_jiayouhongbao = function(homeui, layoutData) {
    //加油红包
    var btn_jiayouhongbao = homeui.node.getChildByName("btn_jiayouhongbao");
    if(btn_jiayouhongbao){
        if(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JIA_YOU_HONG_BAO) 
            && MjClient.systemConfig.functionConfigXY["JIA_YOU_HONG_BAO"] && MjClient.systemConfig.functionConfigXY["JIA_YOU_HONG_BAO"].isShow){
            btn_jiayouhongbao.setVisible(true);
        }else {
            btn_jiayouhongbao.setVisible(false);
        }

        setWgtLayout(btn_jiayouhongbao, layoutData[0], layoutData[1], layoutData[2]);


        var imageHongbao = btn_jiayouhongbao.getChildByName("ImageHongbao");
        var rotateTo1 = new cc.RotateTo(0.2, -5);
        var rotateTo2 = new cc.RotateTo(0.4, 5);
        var rotateTo3 = new cc.RotateTo(0.4, -5);
        var rotateTo4 = new cc.RotateTo(0.2, 0);
        var delayTime = new cc.DelayTime(1);
        imageHongbao.runAction(cc.repeatForever(cc.sequence(rotateTo1, rotateTo2, rotateTo3, rotateTo2, rotateTo4, delayTime)));

        btn_jiayouhongbao.addTouchEventListener(function(sender, type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JIA_YOU_HONG_BAO)) return;
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.Scene.addChild(new jiaYouRedPacketLayer());
                    break;
            }
        }, this);

    }
};


var showHomeActivityIcon_zhuazhuale = function(homeui, layoutData) {
    // 抓娃娃
    var _btn_ZhuaWaWa = homeui.node.getChildByName("btn_ZhuaWaWa");
    if (_btn_ZhuaWaWa) {
        _btn_ZhuaWaWa.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ZHUA_ZHUA_LE) && !MjClient.isShenhe && !MjClient.remoteCfg.guestLogin 
            && MjClient.systemConfig.functionConfigXY["ZHUA_ZHUA_LE"]&& MjClient.systemConfig.functionConfigXY["ZHUA_ZHUA_LE"].isShow);

        setWgtLayout(_btn_ZhuaWaWa, layoutData[0], layoutData[1], layoutData[2]);

        

        var _btn_1 = _btn_ZhuaWaWa.getChildByName("btn_1");
        _btn_1.addTouchEventListener(function(sender, Type) {
            if(!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ZHUA_ZHUA_LE)) return;
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.Scene.addChild(new ZhuaWaWa_mainLayer());
                    break;
            }
        }, this);

        var img_1 = _btn_ZhuaWaWa.getChildByName("img_1");
        img_1.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.rotateBy(0.4, -25).easing(cc.easeSineOut()), cc.rotateBy(0.4, 25).easing(cc.easeSineOut()))));

        var shine = function(number) {
            var _xing = _btn_ZhuaWaWa.getChildByName("xing_" + number);
            _xing.runAction(cc.blink(2, number).repeatForever());

        };

        for (var i = 1; i < 5; i++) {
            shine(i);
        }
    }
};

var showHomeActivityIcon_zajindan = function(homeui, layoutData) {
    //砸金蛋活动（原来用于元旦起名newyear 后面用于常用活动）  
    var _btnNewYear = homeui.node.getChildByName("btn_NewYear");
    if (_btnNewYear) {
        cc.log(" ========== 砸金蛋活动",MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ZA_JIN_DAN));
        _btnNewYear.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ZA_JIN_DAN) 
            && MjClient.systemConfig.functionConfigXY["ZA_JIN_DAN"] && MjClient.systemConfig.functionConfigXY["ZA_JIN_DAN"].isShow);
        setWgtLayout(_btnNewYear, layoutData[0], layoutData[1], layoutData[2]);
        if(MjClient.isShenhe){
            _btnNewYear.setVisible(false);
        }

        _btnNewYear.addTouchEventListener(function(sender, Type) {
            if(!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ZA_JIN_DAN)) return;
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.Scene.addChild(new NewYearLayer());
                    break;
            }
        });
        for (var i = 0; i < 3; i++) {
            homeui["img_new_" + i] = _btnNewYear.getChildByName("img_" + i);
            homeui["img_new_" + i].setZOrder(-10);
        }
        homeui.img_new_1.setZOrder(-1);
        homeui.img_new_2.setZOrder(1);
        var act_1 = cc.rotateBy(1, 18).repeatForever();
        var act_2 = cc.rotateBy(5, -18).repeatForever();
        var _Image_light_scale = homeui.img_new_1.getScale();
        var a = cc.scaleTo(0.5, _Image_light_scale * 1.15);
        var aa = cc.fadeIn(0.5);
        var a1 = cc.scaleTo(1.0, _Image_light_scale * 1.45);
        var a2 = cc.fadeOut(1.0);
        var a3 = cc.callFunc(function() {
            //this.setOpacity(255);
            homeui.img_new_1.setScale(_Image_light_scale * 1.05);
        }.bind(homeui));
        homeui.img_new_0.runAction(act_1);
        homeui.img_new_2.runAction(act_2);
        homeui.img_new_1.runAction(cc.sequence(cc.spawn(a, aa), cc.spawn(a1, a2).easing(cc.easeCubicActionOut()), a3, cc.delayTime(0.2)).repeatForever());

        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("newYear/enter_1.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        _btnNewYear.addChild(clipper);
        var sprite = new cc.Sprite("newYear/enter_2.png");
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction); //进行向右移动的重复动作

    }
}

var showHomeActivityIcon_dazhuanpan = function(homeui, layoutData) {
    // 幸运大转盘
    var _btnLucky = homeui.node.getChildByName("btnLucky");
    if (_btnLucky) {
        _btnLucky.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.DA_ZHUAN_PAN) 
            && MjClient.systemConfig.functionConfigXY["DA_ZHUAN_PAN"] && MjClient.systemConfig.functionConfigXY["DA_ZHUAN_PAN"].isShow);
        setWgtLayout(_btnLucky, layoutData[0], layoutData[1], layoutData[2]);
        _btnLucky.addTouchEventListener(function(sender, Type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.DA_ZHUAN_PAN)) return;
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Dazhuanpan", {uid:SelfUid()});
                    var layer = new luckyTableLayer();
                    MjClient.Scene.addChild(layer);
                    break;
                default:
                    break;
            }

        }, this);
    }

};

//朋友圈对战
var showHomeActivityIcon_friendsPK = function(homeui, layoutData) {

    var btn_friendsPK = homeui.node.getChildByName("btn_friendsPK");
    if (btn_friendsPK) {
        btn_friendsPK.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.FRIENDS_PK) 
            && MjClient.systemConfig.functionConfigXY["FRIENDS_PK"] && MjClient.systemConfig.functionConfigXY["FRIENDS_PK"].isShow);
        setWgtLayout(btn_friendsPK, layoutData[0], layoutData[1], layoutData[2]);

        var img11 = btn_friendsPK.getChildByName("img11");
        if(img11){
            for(var i = 0; i<6; i++){
                var qiu = btn_friendsPK.getChildByName("qiu_"+i);
                qiu.setVisible(false);
                qiu.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.2*i),cc.callFunc(function () {this.setVisible(true)}.bind(qiu)),cc.delayTime(0.2),cc.callFunc(function () {this.setVisible(false)}.bind(qiu)),cc.sequence(cc.delayTime(1.2 - 0.2*i)))));
            }
        }

        btn_friendsPK.addTouchEventListener(function(sender, Type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.FRIENDS_PK)) return;
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer;
                    layer = new FriendsPK_Layer();                        

                    MjClient.Scene.addChild(layer);
                    break;
                default:
                    break;
            }

        }, this);
    }

};

var showHomeActivityIcon_qiandaoyouli = function(homeui, layoutData) {
    // 签到有礼
    var _btnQiandao = homeui.node.getChildByName("btn_Qiandao");
    if (_btnQiandao) {
        _btnQiandao.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.QIAN_DAO_YOU_LI) 
            && MjClient.systemConfig.functionConfigXY["QIAN_DAO_YOU_LI"] && MjClient.systemConfig.functionConfigXY["QIAN_DAO_YOU_LI"].isShow);
        setWgtLayout(_btnQiandao, layoutData[0], layoutData[1], layoutData[2]);
        _btnQiandao.addTouchEventListener(function(sender, Type) {
            if(!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.QIAN_DAO_YOU_LI)) return;
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer = new QiandaoLayer();
                    MjClient.Scene.addChild(layer);                    
                    break;
            }
        }, this);
    }
}

var showHomeActivityIcon_caishen = function(homeui, layoutData) {
    // 财神活动
    var _btnCaiShen = homeui.node.getChildByName("btnCaiShen");
    if (_btnCaiShen) {
        _btnCaiShen.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.CAI_SHEN) 
            && MjClient.systemConfig.functionConfigXY["CAI_SHEN"] && MjClient.systemConfig.functionConfigXY["CAI_SHEN"].isShow);
        setWgtLayout(_btnCaiShen, layoutData[0], layoutData[1], layoutData[2]);

        var hongbao = _btnCaiShen.getChildByName("hongbao");
        hongbao.runAction(cc.RepeatForever.create(cc.Sequence.create(
            cc.spawn(cc.scaleTo(1.0, 0.5), cc.fadeTo(1.0, 0)), cc.spawn(cc.scaleTo(1.0, 1.0), cc.fadeTo(1.0, 255)))));

        _btnCaiShen.addTouchEventListener(function(sender, Type) {
            if(!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.CAI_SHEN)) return;
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.caishenRankList", {},
                        function(rtn) {
                            MjClient.unblock();
                            if (rtn.code == 0) {
                                MjClient.Scene.addChild(new Active_caiShen(rtn.data));
                            } else {
                                if (rtn.message)
                                    MjClient.showToast(rtn.message);
                                else
                                    MjClient.showToast("请求数据失败");
                            }
                        });
                    break;
            }
        }, this);
    }
}

var showHomeActivityIcon_zhongjinzhaomu = function(homeui, layoutData) {
    // 800元红包
    var _btn_800yuan = homeui.node.getChildByName("btn_800yuan");
    if (_btn_800yuan) {
        _btn_800yuan.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ZHONG_JIN_ZHAO_MU) 
            && MjClient.systemConfig.functionConfigXY["ZHONG_JIN_ZHAO_MU"] && MjClient.systemConfig.functionConfigXY["ZHONG_JIN_ZHAO_MU"].isShow);
        setWgtLayout(_btn_800yuan, layoutData[0], layoutData[1], layoutData[2]);
        _btn_800yuan.addTouchEventListener(function(sender, Type) {
            if(!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ZHONG_JIN_ZHAO_MU)) return;
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer = new showAdvLayer();
                    MjClient.Scene.addChild(layer);
                    break;
            }
        });

        for (var i = 0; i <= 3; i++) {
            homeui["img_800_" + i] = _btn_800yuan.getChildByName("bg_" + i);
            homeui["img_800_" + i].setZOrder(-i);
        }
        var act_1 = cc.rotateBy(1, 18).repeatForever();
        var act_2 = cc.rotateBy(1, -18).repeatForever();
        homeui.img_800_2.runAction(act_1);
        homeui.img_800_3.runAction(act_2);
        var _Image_light_scale = homeui.img_800_1.getScale();
        var a = cc.scaleTo(0.5, _Image_light_scale * 1.15);
        var aa = cc.fadeIn(0.5);
        var a1 = cc.scaleTo(1.0, _Image_light_scale * 1.45);
        var a2 = cc.fadeOut(1.0);
        var a3 = cc.callFunc(function() {
            homeui.img_800_1.setScale(_Image_light_scale * 1.05);
        }.bind(homeui));
        homeui.img_800_1.runAction(cc.sequence(cc.spawn(a, aa), cc.spawn(a1, a2).easing(cc.easeCubicActionOut()), a3, cc.delayTime(0.2)).repeatForever());

        var that = homeui;
        var a5 = cc.rotateBy(2.5, 10).repeatForever();
        homeui.img_800_0.runAction(a5);

        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("game_picture/btn_800yuan.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        _btn_800yuan.addChild(clipper);
        var sprite = new cc.Sprite("game_picture/btn_800yuan_gx.png");
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.8, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));

        sprite.runAction(repeatAction); //进行向右移动的重复动作

    }
}

var showHomeActivityIcon_chongzhiyouli = function(homeui, layoutData) {
    // 充值有礼
    var btnChargePrize = homeui.node.getChildByName("btnChargePrize");
    if (btnChargePrize) {
        btnChargePrize.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.CHONG_ZHI_YOU_LI) 
            && MjClient.systemConfig.functionConfigXY["CHONG_ZHI_YOU_LI"] && MjClient.systemConfig.functionConfigXY["CHONG_ZHI_YOU_LI"].isShow);
        setWgtLayout(btnChargePrize, layoutData[0], layoutData[1], layoutData[2]);
        btnChargePrize.addTouchEventListener(function(sender, Type) {
            if(!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.CHONG_ZHI_YOU_LI)) return;
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var Layer = new ChargePrize_Layer();
                    MjClient.Scene.addChild(Layer);
                    break;
            }
        });

        for (var i = 0; i < 3; i++) {
            homeui["img_new_" + i] = btnChargePrize.getChildByName("img_" + i);
            homeui["img_new_" + i].setZOrder(-10);
        }
        homeui.img_new_1.setZOrder(-1);
        homeui.img_new_2.setZOrder(1);
        var act_1 = cc.rotateBy(1, 18).repeatForever();
        var act_2 = cc.rotateBy(5, -18).repeatForever();
        var _Image_light_scale = homeui.img_new_1.getScale();
        var a = cc.scaleTo(0.5, _Image_light_scale * 1.15);
        var aa = cc.fadeIn(0.5);
        var a1 = cc.scaleTo(1.0, _Image_light_scale * 1.45);
        var a2 = cc.fadeOut(1.0);
        var a3 = cc.callFunc(function() {
            //this.setOpacity(255);
            homeui.img_new_1.setScale(_Image_light_scale * 1.05);
        }.bind(homeui));
        homeui.img_new_0.runAction(act_1);
        homeui.img_new_2.runAction(act_2);
        homeui.img_new_1.runAction(cc.sequence(cc.spawn(a, aa), cc.spawn(a1, a2).easing(cc.easeCubicActionOut()), a3, cc.delayTime(0.2)).repeatForever());

        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("chargePrize/enter_1.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        btnChargePrize.addChild(clipper);
        var sprite = new cc.Sprite("chargePrize/enter_2.png");
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction); //进行向右移动的重复动作



    }
}

var showHomeActivityIcon_xinrenfuli = function(homeui, layoutData) {
    // 新人福利
    var _btn_xinren = homeui.node.getChildByName("btn_xinren");
    var time_start = Date.parse("2018-03-15"); //"20180316";
    var time_end = Date.parse("2018-03-26");
    cc.log(" ======time_start  time_end  MjClient.data.serverTime MjClient.data.pinfo.createTime", time_start, time_end, MjClient.data.serverTime, MjClient.data.pinfo.createTime);
    if (_btn_xinren) {
        var time_x = function() {
            if (MjClient.data.pinfo.createTime >= time_start && MjClient.data.pinfo.createTime <= time_end &&
                MjClient.data.serverTime >= time_start && MjClient.data.serverTime <= time_end) {
                return true;
            }
            return false;
        }
        _btn_xinren.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.XIN_REN_FU_LI) &&
            !MjClient.isShenhe && !MjClient.remoteCfg.guestLogin && time_x());
        setWgtLayout(_btn_xinren, layoutData[0], layoutData[1], layoutData[2]);

        _btn_xinren.addTouchEventListener(function(sender, Type) {
            if(!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.XIN_REN_FU_LI)) return;
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.newUserAwardInfo", {},
                        function(rtn) {
                            MjClient.unblock();
                            if (rtn.code == 0) {
                                MjClient.Scene.addChild(new newBeeFuliLayer(rtn.data));
                            } else {
                                if (rtn.message)
                                    MjClient.showToast(rtn.message);
                                else
                                    MjClient.showToast("请求数据失败");
                            }
                        });
                    break;
            }
        }, this);
    }
}

var showHomeActivityIcon_julebufuli = function(homeui, layoutData) {
    //亲友圈福利
    var btnJulebuFuli = homeui.node.getChildByName("btnJulebuFuli");

    if (btnJulebuFuli) {
        btnJulebuFuli.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JU_LE_BU_FU_LI) && !MjClient.isShenhe && !MjClient.remoteCfg.guestLogin 
            && MjClient.systemConfig.functionConfigXY["JU_LE_BU_FU_LI"] && MjClient.systemConfig.functionConfigXY["JU_LE_BU_FU_LI"].isShow);
        setWgtLayout(btnJulebuFuli, layoutData[0], layoutData[1], layoutData[2]);

        btnJulebuFuli.addTouchEventListener(function(sender, Type) {
            if(!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JU_LE_BU_FU_LI)) return;
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.openBrowser", {
                        type: 4
                    }, function(rtn) {
                        cc.log(" ===== _btn_clubFuli ===   " + JSON.stringify(rtn));
                        if (rtn.code == 0) {
                            MjClient.native.OpenUrl(rtn.data);
                        } else {
                            if (rtn.message) {
                                MjClient.showToast(rtn.message);
                            } else {
                                MjClient.showToast("获取数据失败");
                            }
                        }
                        MjClient.unblock();
                    });
                    break;
            }
        }, this);

    }
}

var showHomeActivityIcon_sailongzhou = function(homeui, layoutData) {
    //duanwujie
    var btn_duanwujie = homeui.node.getChildByName("btn_duanwujie");
    cc.log(" ======== btn_duanwujie ",btn_duanwujie,MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.SAI_LONG_ZHOU))
    if (btn_duanwujie) {
        btn_duanwujie.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.SAI_LONG_ZHOU) && !MjClient.isShenhe && !MjClient.remoteCfg.guestLogin 
            && MjClient.systemConfig.functionConfigXY["SAI_LONG_ZHOU"] && MjClient.systemConfig.functionConfigXY["SAI_LONG_ZHOU"].isShow);
        setWgtLayout(btn_duanwujie, layoutData[0], layoutData[1], layoutData[2]);
        btn_duanwujie.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer = new DuanWuJieLayer();   
                    MjClient.Scene.addChild(layer);
                    break;
            }
        }, this);

        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("DuanWuJie/enter_1.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        btn_duanwujie.addChild(clipper);
        var sprite = new cc.Sprite("DuanWuJie/enter_2.png");
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction); //进行向右移动的重复动作

    }
}

var showHomeActivityIcon_xinshoulibao = function(homeui, layoutData) {
    // 新手礼包
    var btn_newPlayerPrize = homeui.node.getChildByName("btn_newPlayerPrize");

    if (btn_newPlayerPrize) {
        var _timeStr = MjClient.dateFormat(new Date(parseInt(MjClient.data.pinfo.createTime)), 'yyyy-MM-dd');
        cc.log(" ====== 出生日期 ", _timeStr);
        var time_1 = Date.parse(_timeStr);
        // cc.log(" ====== time_1 ",time_1);
        var _timeStr = MjClient.dateFormat(new Date(parseInt(MjClient.data.serverTime)), 'yyyy-MM-dd');
        cc.log(" ====== 服务器时间 ", _timeStr);
        var _timeStr = MjClient.dateFormat(new Date(parseInt(time_1 + 6 * 86400000)), 'yyyy-MM-dd');
        cc.log(" ====== 活动寄截止时间 ", _timeStr);


        if (time_1 + 6 * 86400000 > MjClient.data.serverTime && MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.XIN_SHOU_LI_BAO) 
            && MjClient.systemConfig.functionConfigXY["XIN_SHOU_LI_BAO"] && MjClient.systemConfig.functionConfigXY["XIN_SHOU_LI_BAO"].isShow) {
            btn_newPlayerPrize.visible = true;
        } else {
            btn_newPlayerPrize.visible = false;
        }
        setWgtLayout(btn_newPlayerPrize, layoutData[0], layoutData[1], layoutData[2]);
        btn_newPlayerPrize.addTouchEventListener(function(sender, Type) {

            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var Layer = new NewPlayerPrizeLayer();
                    MjClient.Scene.addChild(Layer);
                    break;
            }
        });
        for (var i = 0; i < 3; i++) {
            homeui["img_new_" + i] = btn_newPlayerPrize.getChildByName("img_" + i);
            homeui["img_new_" + i].setZOrder(-10);
        }
        homeui.img_new_1.setZOrder(-1);
        homeui.img_new_2.setZOrder(1);
        var act_1 = cc.rotateBy(1, 18).repeatForever();
        var act_2 = cc.rotateBy(5, -18).repeatForever();
        var _Image_light_scale = homeui.img_new_1.getScale();
        var a = cc.scaleTo(0.5, _Image_light_scale * 1.15);
        var aa = cc.fadeIn(0.5);
        var a1 = cc.scaleTo(1.0, _Image_light_scale * 1.45);
        var a2 = cc.fadeOut(1.0);
        var a3 = cc.callFunc(function() {
            //this.setOpacity(255);
            homeui.img_new_1.setScale(_Image_light_scale * 1.05);
        }.bind(homeui));
        homeui.img_new_0.runAction(act_1);
        homeui.img_new_2.runAction(act_2);
        homeui.img_new_1.runAction(cc.sequence(cc.spawn(a, aa), cc.spawn(a1, a2).easing(cc.easeCubicActionOut()), a3, cc.delayTime(0.2)).repeatForever());

        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("newPlayerPrize/enter_1.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        btn_newPlayerPrize.addChild(clipper);
        var sprite = new cc.Sprite("newPlayerPrize/enter_2.png");
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction); //进行向右移动的重复动作



    }
}

var showHomeActivityIcon_bangdingshouji = function(homeui, layoutData) {
    var btn_bangdingshouji = homeui.node.getChildByName("btn_bangdingshouji");
    MjClient.homeui._btn_bangdingshouji = btn_bangdingshouji;
    var pinfo = MjClient.data.pinfo;
    if(btn_bangdingshouji){
        if(!pinfo.mobileNum && MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.BANG_DING_SHOU_JI)
            && MjClient.systemConfig.functionConfigXY["BANG_DING_SHOU_JI"] && MjClient.systemConfig.functionConfigXY["BANG_DING_SHOU_JI"].isShow){
            btn_bangdingshouji.setVisible(true);
        }else {
            btn_bangdingshouji.setVisible(false);
        }
        setWgtLayout(btn_bangdingshouji, layoutData[0], layoutData[1], layoutData[2]);
        btn_bangdingshouji.addTouchEventListener(function(sender, type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.BANG_DING_SHOU_JI)) return;
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.Scene.addChild(new bindPhoneNumNewLayer());
                    MjClient.native.umengEvent4CountWithProperty("Huodong_Jingcaihuodong_Bangdingshouji", {uid:SelfUid()});
                    break;
            }
        }, this)

    }
}

var showHomeActivityIcon_shimingrenzheng = function(homeui, layoutData) {
    var btn_shimingrenzheng = homeui.node.getChildByName("btn_shimingrenzheng");
    MjClient.homeui._btn_shimingrenzheng = btn_shimingrenzheng;
    var pinfo = MjClient.data.pinfo;
    if(btn_shimingrenzheng){
        if(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.SHI_MING_REN_ZHENG) 
            && MjClient.systemConfig.functionConfigXY["SHI_MING_REN_ZHENG"] && MjClient.systemConfig.functionConfigXY["SHI_MING_REN_ZHENG"].isShow){
            btn_shimingrenzheng.setVisible(true);
        }else {
            btn_shimingrenzheng.setVisible(false);
        }
        if(pinfo.identityNum) 
            btn_shimingrenzheng.setVisible(false);

        setWgtLayout(btn_shimingrenzheng, layoutData[0], layoutData[1], layoutData[2]);
        btn_shimingrenzheng.addTouchEventListener(function(sender, type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.SHI_MING_REN_ZHENG)) return;
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.Scene.addChild(new shiMingRenZhengLayer());
                    break;
            }
        }, this)

    }
}

var showHomeActivityIcon_yaoqinghongbao = function(homeui, layoutData) {
    // 邀请红包
    var btn_yaoqingHB = homeui.node.getChildByName("btn_yaoqingHB");
    if (btn_yaoqingHB) {
        btn_yaoqingHB.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.YAO_QING_HONG_BAO) 
            && MjClient.systemConfig.functionConfigXY["YAO_QING_HONG_BAO"] && MjClient.systemConfig.functionConfigXY["YAO_QING_HONG_BAO"].isShow);
        setWgtLayout(btn_yaoqingHB, layoutData[0], layoutData[1], layoutData[2]);
        btn_yaoqingHB.addTouchEventListener(function(sender, Type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.YAO_QING_HONG_BAO)) return;
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer;
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP)                                    
                        layer = new YaoQingHaoBao_layer();
                    else
                        layer = new YaoQingHaoBaoNT_layer();
                    MjClient.Scene.addChild(layer);
                    break;
                default:
                    break;
            }

        }, this);
    }

};

var showHomeActivityIcon_activerank = function(homeui, layoutData) {

    if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP || MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ 
        || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
        if (MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ACTIVE_RANK) && !MjClient.isShenhe && !MjClient.remoteCfg.guestLogin 
            && MjClient.systemConfig.functionConfigXY["ACTIVE_RANK"] && MjClient.systemConfig.functionConfigXY["ACTIVE_RANK"].isShow) {
            var layer = new Active_rankNanTong();
            homeui.node.addChild(layer,5);
        }
        
    } else {
        var btn_rank = homeui.node.getChildByName("btn_rank");
        if (btn_rank) {
            btn_rank.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ACTIVE_RANK) && !MjClient.isShenhe && !MjClient.remoteCfg.guestLogin 
                && MjClient.systemConfig.functionConfigXY["ACTIVE_RANK"] && MjClient.systemConfig.functionConfigXY["ACTIVE_RANK"].isShow);
            setWgtLayout(btn_rank, layoutData[0], layoutData[1], layoutData[2]);

            var bg_2 = btn_rank.getChildByName("bg_2");
            // 闪光效果
            var clipper = cc.ClippingNode.create();
            var sten = cc.Sprite.create("active_rank/enter_2.png");
            var stenSize = sten.getContentSize();
            clipper.setContentSize(stenSize);
            clipper.setStencil(sten);
            clipper.setAlphaThreshold(0.5);
            sten.setPosition(stenSize.width / 2, stenSize.height / 2);
            bg_2.addChild(clipper);
            var sprite = new cc.Sprite("active_rank/enter_3.png");
            clipper.addChild(sprite, 1);
            var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
                cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
                cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
                cc.delayTime(0.8)));
            sprite.runAction(repeatAction); //进行向右移动的重复动作

            btn_rank.addTouchEventListener(function(sender, Type) {
                if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ACTIVE_RANK)) return;
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        MjClient.Scene.addChild(new Active_rankLayer());
                        break;
                }
            }, this);

        }
    }

};

var showHomeActivityIcon_mianfeiliquan = function(homeui, layoutData) {
    var btn_mianfeiliquan = homeui.node.getChildByName("btn_mianfeiliquan");
    if(!btn_mianfeiliquan) return MjClient.showToast("btn_mianfeiliquan is null ");
    var panelTime = btn_mianfeiliquan.getChildByName("Panel_Time");
    var imgMianfeiliquan = btn_mianfeiliquan.getChildByName("Image_Mianfei");
    panelTime.setVisible(false);
    imgMianfeiliquan.setVisible(true);
    if(btn_mianfeiliquan){
        btn_mianfeiliquan.setVisible(false);
        MjClient.homeui._btn_mianfeiliquan = btn_mianfeiliquan;

        UIEventBind(null, btn_mianfeiliquan, MjClient.native.mobgiAdsCallbackEvent.VIDEO_ADS_COMPLETED, function(data) {
            if(data.type == MjClient.native.mobgiAdsType.SHIPIN_ZHUJIEMIAN || data.indexOf("type:"+MjClient.native.mobgiAdsType.SHIPIN_ZHUJIEMIAN) >= 0) {
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.userAdClick", {type: 2}, function (rtn) {
                    MjClient.unblock();
                    if (rtn.code == -1) {
                        MjClient.showToast(rtn.message);
                    } else if (rtn.code == 0) {
                        var layer = new ShopOfJifen_actLayer();
                        playEffect("ShopOfJiFen/click_btn", false);
                        MjClient.Scene.addChild(layer);
                        MjClient.showToast("积分领取成功");

                        MjClient.gamenet.request("pkplayer.handler.userAd2Info", {}, function (rtn) {
                            if ((rtn.code == 0) && btn_mianfeiliquan) {
                                if (rtn.data.recvCount >= rtn.data.maxCount) {
                                    //MjClient.homeui._btn_mianfeiliquan.setVisible(false);
                                    btn_mianfeiliquan.setTouchEnabled(true);
                                    panelTime.setVisible(false);
                                    imgMianfeiliquan.setVisible(true);
                                } else {
                                    btn_mianfeiliquan.setTouchEnabled(false);
                                    panelTime.setVisible(true);
                                    imgMianfeiliquan.setVisible(false);

                                    var leftTime = parseInt(rtn.data.leftTime / 1000);//秒
                                    var m = parseInt(leftTime / 60);//分
                                    if (m.toString().length == 1) {
                                        m = "0" + m;
                                    }
                                    var s = leftTime % 60;//秒
                                    if (s.toString().length == 1) {
                                        s = "0" + s;
                                    }
                                    var M = panelTime.getChildByName("AtlasLabel_1");
                                    var S = panelTime.getChildByName("AtlasLabel_2");
                                    M.setString(m);
                                    S.setString(s);
                                    btn_mianfeiliquan.getTitleRenderer().unscheduleAllCallbacks();
                                    btn_mianfeiliquan.getTitleRenderer().schedule(function () {
                                        m = parseInt(leftTime / 60);//分
                                        if (m.toString().length == 1) {
                                            m = "0" + m;
                                        }
                                        s = leftTime % 60;//秒
                                        if (s.toString().length == 1) {
                                            s = "0" + s;
                                        }
                                        M.setString(m);
                                        S.setString(s);
                                        if (leftTime > 0) {
                                            leftTime--;
                                        } else {
                                            btn_mianfeiliquan.setTouchEnabled(true);
                                            panelTime.setVisible(false);
                                            imgMianfeiliquan.setVisible(true);
                                        }
                                    }, 1, cc.REPEAT_FOREVER, 0);
                                }
                            }
                        });
                    } else {
                        MjClient.showToast(rtn.message);
                    }
                });
            }
        });
        UIEventBind(null, btn_mianfeiliquan, MjClient.native.mobgiAdsCallbackEvent.VIDEO_ADS_ERROR, function(data) {
            if(!data.isObject()){
                data = JSON.parse(data);
            }
            if(data.type == MjClient.native.mobgiAdsType.SHIPIN_ZHUJIEMIAN) {
                MjClient.showToast("广告加载错误");
            }
        });
        UIEventBind(null, btn_mianfeiliquan, MjClient.native.mobgiAdsCallbackEvent.VIDEO_ADS_SKIPPED, function(data) {
            if(!data.isObject()){
                data = JSON.parse(data);
            }
            if(data.type == MjClient.native.mobgiAdsType.SHIPIN_ZHUJIEMIAN) {
                MjClient.showToast("广告没有播放完，不会发放奖励");
            }
        });
        UIEventBind(null, btn_mianfeiliquan, MjClient.native.mobgiAdsCallbackEvent.VIDEO_ADS_NOT_READY, function(data) {
            if(!data.isObject()){
                data = JSON.parse(data);
            }
            if(data.type == MjClient.native.mobgiAdsType.SHIPIN_ZHUJIEMIAN) {
                MjClient.showToast("广告还没加载完");
            }
        });

        var pinfo = MjClient.data.pinfo;
        // MjClient.gamenet.request("pkplayer.handler.userAd2Info",{},function(rtn){
        //     if((rtn.code == 0) && cc.sys.isObjectValid(btn_mianfeiliquan)){
        //         //if(cc.sys.os != cc.sys.OS_IOS && MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.MIAN_FEI_LI_QUAN) && (rtn.data.recvCount < rtn.data.maxCount)){
        //         if(cc.sys.os != cc.sys.OS_IOS && MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.MIAN_FEI_LI_QUAN) 
        //             && MjClient.systemConfig.functionConfigXY["MIAN_FEI_LI_QUAN"] && MjClient.systemConfig.functionConfigXY["MIAN_FEI_LI_QUAN"].isShow){
        //             btn_mianfeiliquan.setVisible(true);
        //         }else {
        //             btn_mianfeiliquan.setVisible(false);
        //         }

        //         setWgtLayout(btn_mianfeiliquan, layoutData[0], layoutData[1], layoutData[2]);

        //         if(rtn.data.leftTime > 0){
        //             btn_mianfeiliquan.setTouchEnabled(false);
        //             var panelTime = btn_mianfeiliquan.getChildByName("Panel_Time");
        //             var imgMianfeiliquan = btn_mianfeiliquan.getChildByName("Image_Mianfei");
        //             panelTime.setVisible(true);
        //             imgMianfeiliquan.setVisible(false);

        //             var leftTime = parseInt(rtn.data.leftTime/1000);//秒
        //             var m = parseInt(leftTime/60);//分
        //             if(m.toString().length == 1){
        //                 m = "0"+m;
        //             }
        //             var s = leftTime%60;//秒
        //             if(s.toString().length == 1){
        //                 s = "0"+s;
        //             }
        //             var M = panelTime.getChildByName("AtlasLabel_1");
        //             var S = panelTime.getChildByName("AtlasLabel_2");
        //             M.setString(m);
        //             S.setString(s);
        //             btn_mianfeiliquan.getTitleRenderer().unscheduleAllCallbacks();
        //             btn_mianfeiliquan.getTitleRenderer().schedule(function () {
        //                 m = parseInt(leftTime/60);//分
        //                 if(m.toString().length == 1){
        //                     m = "0"+m;
        //                 }
        //                 s = leftTime%60;//秒
        //                 if(s.toString().length == 1){
        //                     s = "0"+s;
        //                 }
        //                 M.setString(m);
        //                 S.setString(s);
        //                 if (leftTime > 0) {
        //                     leftTime--;
        //                 }else {
        //                     btn_mianfeiliquan.setTouchEnabled(true);
        //                     panelTime.setVisible(false);
        //                     imgMianfeiliquan.setVisible(true);
        //                 }
        //             }, 1, cc.REPEAT_FOREVER, 0);
        //         }

        //         btn_mianfeiliquan.addTouchEventListener(function(sender, type) {
        //             if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.MIAN_FEI_LI_QUAN)) return;
        //             switch (type) {
        //                 case ccui.Widget.TOUCH_ENDED:
        //                     MjClient.native.mobgiAds.showVideoAd(MjClient.native.mobgiAdsType.SHIPIN_ZHUJIEMIAN);
        //                     break;
        //             }
        //         }, this)

        //     }
        // });
    }
};

// 签到抽奖
var showHomeActivityIcon_qiandaochoujiang = function(homeui, layoutData) {
    // 签到抽奖
    var btn_qiandaochoujiang = homeui.node.getChildByName("btn_qiandaochoujiang");
    if (btn_qiandaochoujiang) {
        btn_qiandaochoujiang.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.QIAN_DAO_CHOU_JIANG) 
            && MjClient.systemConfig.functionConfigXY["QIAN_DAO_CHOU_JIANG"] && MjClient.systemConfig.functionConfigXY["QIAN_DAO_CHOU_JIANG"].isShow);
        setWgtLayout(btn_qiandaochoujiang, layoutData[0], layoutData[1], layoutData[2]);
        btn_qiandaochoujiang.addTouchEventListener(function(sender, Type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.QIAN_DAO_CHOU_JIANG)) return;
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer = new luckyTableNew_layer();
                    var selectUiIndex = MjClient.isUseUIv3 && MjClient.isUseUIv3();
                    if(selectUiIndex){
                        layer = new luckyTableNew_layer_30();
                    }
                    MjClient.Scene.addChild(layer);
                    updateUserBehavior("免费福利");
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Dazhuanpan", {
                        uid: SelfUid()
                    });
                    break;
                default:
                    break;
            }

        }, this);

        var _getSprite = new cc.Sprite("luckyTable_new/enter_2.png");
        //-20 79
        if (_getSprite) {
            _getSprite.visible = false;
            _getSprite.setPosition(cc.p(-20, 79));
            btn_qiandaochoujiang.addChild(_getSprite);
            _getSprite.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.spawn(cc.scaleTo(1.0, 0.5), cc.fadeTo(1.0, 0)), cc.spawn(cc.scaleTo(1.0, 1.0), cc.fadeTo(1.0, 255)))));
            UIEventBind(null, btn_qiandaochoujiang, "lotteryCanGet", function(d) {
                cc.log(" ====== lotteryCanGet", JSON.stringify(d));
                if (d.canGet) {
                    _getSprite.visible = true;
                }
            });
            btn_qiandaochoujiang.schedule(function() {
                if (MjClient.luckyTableNew_ui) {
                    // cc.log(" ======MjClient.luckyTableNew_ui ",MjClient.luckyTableNew_ui._canGet);
                    if (MjClient.luckyTableNew_ui._canGet) {
                        _getSprite.visible = true;
                    } else {
                        _getSprite.visible = false;
                    }
                }

            }, 0.5);

        }



    }

};

var showHomeActivityIcon_yongzhouZhongQiuJie = function(homeui, layoutData) {
   // 永州中秋节策划方案
    var btn_yzZQJ = homeui.node.getChildByName("btn_yongZhouZQJ");
    if (btn_yzZQJ) {
        btn_yzZQJ.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ZHONG_QIU_JIE_YONGZHOU ) 
            && MjClient.systemConfig.functionConfigXY["ZHONG_QIU_JIE_YONGZHOU"] && MjClient.systemConfig.functionConfigXY["ZHONG_QIU_JIE_YONGZHOU"].isShow);

        setWgtLayout(btn_yzZQJ, layoutData[0], layoutData[1], layoutData[2]);

        btn_yzZQJ.addTouchEventListener(function(sender, Type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ZHONG_QIU_JIE_YONGZHOU )) return;
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer;
                    layer = new ZhongQiuJie_layer();                    
                    MjClient.Scene.addChild(layer);
                    break;
                default:
                    break;
            }

        }, this);
    }

};

// 中秋88元
var showHomeActivityIcon_zhongqiujie88 = function(homeui, layoutData) {
    // 中秋88元
    var btn_zhongqiujie88yuan = homeui.node.getChildByName("btn_zhongqiujie88");
    if (btn_zhongqiujie88yuan) {
        btn_zhongqiujie88yuan.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ZHONG_QIU_JIE_88_YUAN) 
            && MjClient.systemConfig.functionConfigXY["ZHONG_QIU_JIE_88_YUAN"] && MjClient.systemConfig.functionConfigXY["ZHONG_QIU_JIE_88_YUAN"].isShow);

        setWgtLayout(btn_zhongqiujie88yuan, layoutData[0], layoutData[1], layoutData[2]);

         // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("active_zhongqiujie88/enter_1.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        btn_zhongqiujie88yuan.addChild(clipper);
        var sprite = new cc.Sprite("active_zhongqiujie88/enter_2.png");
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction); //进行向右移动的重复动作 


        // setWgtLayout(_btnLucky, layoutData[0], layoutData[1], layoutData[2]);
        btn_zhongqiujie88yuan.addTouchEventListener(function(sender, Type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ZHONG_QIU_JIE_88_YUAN)) return;
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer;
                    layer = new ActiveZhongQiuJie_enter();
                    MjClient.Scene.addChild(layer);
                    break;
                default:
                    break;
            }

        }, this);
    }

};

//中秋排行榜
var showHomeActivityIcon_zhongqiujieRank = function(homeui, layoutData) {
    // 中秋排行榜
    var btn_zhongQiuJieRank = homeui.node.getChildByName("btn_zhongQiuJieRank");
    if (btn_zhongQiuJieRank) {
        btn_zhongQiuJieRank.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ZHONG_QIU_JIE_RANK) 
            && MjClient.systemConfig.functionConfigXY["ZHONG_QIU_JIE_RANK"] && MjClient.systemConfig.functionConfigXY["ZHONG_QIU_JIE_RANK"].isShow);

        setWgtLayout(btn_zhongQiuJieRank, layoutData[0], layoutData[1], layoutData[2]);

        // setWgtLayout(_btnLucky, layoutData[0], layoutData[1], layoutData[2]);
        btn_zhongQiuJieRank.addTouchEventListener(function(sender, Type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ZHONG_QIU_JIE_RANK)) return;
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer;
                    layer = new Active_zhongQiuRank();
                    MjClient.Scene.addChild(layer);
                    break;
                default:
                    break;
            }

        }, this);
    }

};

//金币场活动
var showHomeActivityIcon_jinbinchangActive = function(homeui, layoutData) {
    // 金币场活动
    var btn_jinbichangAct = homeui.node.getChildByName("btn_actJinBiChang");
    if (btn_jinbichangAct) {
        btn_jinbichangAct.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JIN_BI_CHANG_HUO_DONG) 
            && MjClient.systemConfig.functionConfigXY["JIN_BI_CHANG_HUO_DONG"] && MjClient.systemConfig.functionConfigXY["JIN_BI_CHANG_HUO_DONG"].isShow);

        setWgtLayout(btn_jinbichangAct, layoutData[0], layoutData[1], layoutData[2]);

        // setWgtLayout(_btnLucky, layoutData[0], layoutData[1], layoutData[2]);
        btn_jinbichangAct.addTouchEventListener(function(sender, Type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JIN_BI_CHANG_HUO_DONG)) return;
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer;
                    layer = new Active_jinBiChang();
                    MjClient.Scene.addChild(layer);
                    break;
                default:
                    break;
            }

        }, this);
    }

};

//活动每日任务（红包）
var showHomeActivityIcon_meirirenwu = function(homeui, layoutData) {
    var btn_dailyTask = homeui.node.getChildByName("btn_dailyTask");
    MjClient.homeui._btn_dailyTask = btn_dailyTask;
    cc.log("wxd========每日任务=========");
    if(btn_dailyTask){
        if(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.MEI_RI_REN_WU) 
            && MjClient.systemConfig.functionConfigXY["MEI_RI_REN_WU"] && MjClient.systemConfig.functionConfigXY["MEI_RI_REN_WU"].isShow){
            btn_dailyTask.setVisible(true);
        }else {
            btn_dailyTask.setVisible(false);
        }

        setWgtLayout(btn_dailyTask, layoutData[0], layoutData[1], layoutData[2]);

        var lizitexiao =  new cc.ParticleSystem("Particle/hongbao.plist");
        lizitexiao.setPosition(btn_dailyTask.width/2, btn_dailyTask.height/2);
        lizitexiao.setScale(1);
        lizitexiao.setBlendFunc(cc.SRC_ALPHA,cc.ONE_MINUS_SRC_ALPHA);
        btn_dailyTask.getChildByName("daily_task").setLocalZOrder(1);
        btn_dailyTask.addChild(lizitexiao);

        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("active_dailyTask/daily_task.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(btn_dailyTask.getChildByName("daily_task").getPosition());
        btn_dailyTask.addChild(clipper,2);
        var sprite = new cc.Sprite("ShopOfJiFen/enter_3.png");
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction); //进行向右移动的重复动作

        btn_dailyTask.addTouchEventListener(function(sender, type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.MEI_RI_REN_WU)) return;
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.Scene.addChild(new activeDailyTaskLayer());
                    break;
            }
        }, this)

    }
};

//金币场邀请红包
var showHomeActivityIcon_goldInviteRedpacket = function(homeui, layoutData) {
    var btn_goldInviteRedpacket = homeui.node.getChildByName("btn_goldInviteRedpacket");
    MjClient.homeui._btn_goldInviteRedpacket = btn_goldInviteRedpacket;
    cc.log("wxd========金币场邀请红包=========");
    if(btn_goldInviteRedpacket){
        if(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.GOLD_YAO_QING_HONG_BAO) 
            && MjClient.systemConfig.functionConfigXY["GOLD_YAO_QING_HONG_BAO"] && MjClient.systemConfig.functionConfigXY["GOLD_YAO_QING_HONG_BAO"].isShow){
            btn_goldInviteRedpacket.setVisible(true);
            cc.log("wxd========金币场邀请红包=========111"+MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.GOLD_YAO_QING_HONG_BAO));
        }else {
            btn_goldInviteRedpacket.setVisible(false);
            cc.log("wxd========金币场邀请红包=========222"+MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.GOLD_YAO_QING_HONG_BAO));
        }

        setWgtLayout(btn_goldInviteRedpacket, layoutData[0], layoutData[1], layoutData[2]);

        for(var i = 0; i<5; i++){
            var light = btn_goldInviteRedpacket.getChildByName("light_"+i);
            light.setVisible(false);
            light.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.2*i),cc.callFunc(function () {this.setVisible(true)}.bind(light)),cc.delayTime(0.2),cc.callFunc(function () {this.setVisible(false)}.bind(light)),cc.sequence(cc.delayTime(1.2 - 0.2*i)))));
        }

        btn_goldInviteRedpacket.addTouchEventListener(function(sender, type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.GOLD_YAO_QING_HONG_BAO)) return;
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    cc.log("金币场邀请红包");
                    let layer = new goldInviteRedPacketLayer();
                    COMMON_UI.layerShowEffect(layer);
                    MjClient.Scene.addChild(layer);
                    break;
            }
        }, this)

    }
};

var showHomeActivityIcon_InvestmentBox = function(homeui, layoutData) {
    var btnLCBX = homeui.node.getChildByName("btnLCBX");
    if(btnLCBX){
        if(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.LI_CAI_BAO_XIANG) 
            && MjClient.systemConfig.functionConfigXY["LI_CAI_BAO_XIANG"] && MjClient.systemConfig.functionConfigXY["LI_CAI_BAO_XIANG"].isShow){
            btnLCBX.setVisible(true);
        }else {
            btnLCBX.setVisible(false);
        }

        setWgtLayout(btnLCBX, layoutData[0], layoutData[1], layoutData[2]);

        
        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("active_licaibaoxiang/enter_1.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        var img_1 = btnLCBX.getChildByName("img_1");
        if (img_1)
            sten.setPosition(img_1.getPosition());
        else
            sten.setPosition(btnLCBX.width/2, btnLCBX.height/2);
        btnLCBX.addChild(clipper);
        var sprite = new cc.Sprite("ShopOfJiFen/enter_3.png");
        clipper.addChild(sprite);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction); //进行向右移动的重复动作
        btnLCBX.setTouchEnabled(true);
        btnLCBX.addTouchEventListener(function(sender, type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.LI_CAI_BAO_XIANG)) return;
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.Scene.addChild(new LiCaiBaoXiang_Layer());
                    break;
            }
        }, this)

    }
};

var showHomeActivityIcon_InvestmentBoxZS = function(homeui, layoutData) {
    var btnLCBX = homeui.node.getChildByName("btnLCBX_ZS");
    if(btnLCBX){
        if(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.LI_CAI_BAO_XIANG_ZS)
            && MjClient.systemConfig.functionConfigXY["LI_CAI_BAO_XIANG_ZS"] && MjClient.systemConfig.functionConfigXY["LI_CAI_BAO_XIANG_ZS"].isShow){
            btnLCBX.setVisible(true);
        }else {
            btnLCBX.setVisible(false);
        }

        setWgtLayout(btnLCBX, layoutData[0], layoutData[1], layoutData[2]);


        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("active_licaibaoxiang/enter_1.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        var img_1 = btnLCBX.getChildByName("img_1");
        if (img_1)
            sten.setPosition(img_1.getPosition());
        else
            sten.setPosition(btnLCBX.width/2, btnLCBX.height/2);
        btnLCBX.addChild(clipper);
        var sprite = new cc.Sprite("ShopOfJiFen/enter_3.png");
        clipper.addChild(sprite);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction); //进行向右移动的重复动作
        btnLCBX.setTouchEnabled(true);
        btnLCBX.addTouchEventListener(function(sender, type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.LI_CAI_BAO_XIANG_ZS)) return;
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.Scene.addChild(new ZuanShiBaoXiang());
                    break;
            }
        }, this)

    }
};

//金币场活动 2
var showHomeActivityIcon_jinbinchangActive_2 = function(homeui, layoutData) {
    // 金币场活动
    var btn_jinbichangAct = homeui.node.getChildByName("btn_actJinBiChang_2");
    if (btn_jinbichangAct) {
        btn_jinbichangAct.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JIN_BI_CHANG_HUO_DONG_2) 
            && MjClient.systemConfig.functionConfigXY["JIN_BI_CHANG_HUO_DONG_2"] && MjClient.systemConfig.functionConfigXY["JIN_BI_CHANG_HUO_DONG_2"].isShow);

        setWgtLayout(btn_jinbichangAct, layoutData[0], layoutData[1], layoutData[2]);

        // setWgtLayout(_btnLucky, layoutData[0], layoutData[1], layoutData[2]);
        btn_jinbichangAct.addTouchEventListener(function(sender, Type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JIN_BI_CHANG_HUO_DONG_2)) return;
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer;
                    layer = new Active_jinBiChang();
                    MjClient.Scene.addChild(layer);
                    break;
                default:
                    break;
            }

        }, this);
    }

};

//新亲友圈对战
var showHomeActivityIcon_friendsPKNew = function(homeui, layoutData) {
    var btn_friendsPKNew = homeui.node.getChildByName("btn_friendsPKNew");
    cc.log("wxd========新亲友圈对战=========");
    if(btn_friendsPKNew){
        if(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.FRIENDS_PK_NEW)
            && MjClient.systemConfig.functionConfigXY["FRIENDS_PK_NEW"] && MjClient.systemConfig.functionConfigXY["FRIENDS_PK_NEW"].isShow){
            btn_friendsPKNew.setVisible(true);
        }else {
            btn_friendsPKNew.setVisible(false);
        }

        setWgtLayout(btn_friendsPKNew, layoutData[0], layoutData[1], layoutData[2]);

        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("active_friendsPKNew/btn_hezi.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(btn_friendsPKNew.width/2, btn_friendsPKNew.height/2);
        btn_friendsPKNew.addChild(clipper);
        var sprite = new cc.Sprite("active_friendsPKNew/saoguang.png");
        clipper.addChild(sprite);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction); //进行向右移动的重复动作

        for(var i = 0; i<5; i++){
            var light = btn_friendsPKNew.getChildByName("light_"+i);
            light.setVisible(false);
            light.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.2*i),cc.callFunc(function () {this.setVisible(true)}.bind(light)),cc.delayTime(0.2),cc.callFunc(function () {this.setVisible(false)}.bind(light)),cc.sequence(cc.delayTime(1.2 - 0.2*i)))));
        }

        btn_friendsPKNew.setTouchEnabled(true);
        btn_friendsPKNew.addTouchEventListener(function(sender, type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.FRIENDS_PK_NEW)) return;
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.Scene.addChild(new friendsPKNewLayer());
                    break;
            }
        }, this)

    }
};

//金币场新年红包
var showHomeActivityIcon_goldNewYearRedPacket = function(homeui, layoutData) {
    // 金币场活动
    cc.log(" ============ 金币场新年红包 ===============");
    var btn_newYearRedPacket = homeui.node.getChildByName("btn_newYearRedPacket");
    if (btn_newYearRedPacket) {
        btn_newYearRedPacket.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JIN_BI_CHANG_HONG_BAO_2019) 
            && MjClient.systemConfig.functionConfigXY["JIN_BI_CHANG_HONG_BAO_2019"] && MjClient.systemConfig.functionConfigXY["JIN_BI_CHANG_HONG_BAO_2019"].isShow);

        setWgtLayout(btn_newYearRedPacket, layoutData[0], layoutData[1], layoutData[2]);

        // setWgtLayout(_btnLucky, layoutData[0], layoutData[1], layoutData[2]);
        btn_newYearRedPacket.addTouchEventListener(function(sender, Type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.JIN_BI_CHANG_HONG_BAO_2019)) return;
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer;
                    layer = new GoldNewYearRedPacket_Layer();
                    COMMON_UI.layerShowEffect(layer);
                    MjClient.Scene.addChild(layer);
                    break;
                default:
                    break;
            }

        }, this);
    }

};

//春节抽签活动
var showHomeActivityIcon_chunjiechouqian = function(homeui, layoutData) {
    var btn_chouqian = homeui.node.getChildByName("btn_chouqian");
    MjClient.homeui._btn_chouqian = btn_chouqian;
    cc.log("wxd========春节抽签=========");
    if(btn_chouqian){
        if(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.CHUN_JIE_CHOU_QIAN)
            && MjClient.systemConfig.functionConfigXY["CHUN_JIE_CHOU_QIAN"] && MjClient.systemConfig.functionConfigXY["CHUN_JIE_CHOU_QIAN"].isShow){
            btn_chouqian.setVisible(true);
        }else {
            btn_chouqian.setVisible(false);
        }

        setWgtLayout(btn_chouqian, layoutData[0], layoutData[1], layoutData[2]);

        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("active_chouqian/main_btn.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(cc.p(btn_chouqian.width/2, btn_chouqian.height/2));
        btn_chouqian.addChild(clipper,2);
        var sprite = new cc.Sprite("ShopOfJiFen/enter_3.png");
        sprite.setScale(2)
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction); //进行向右移动的重复动作

        btn_chouqian.addTouchEventListener(function(sender, type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.CHUN_JIE_CHOU_QIAN)) return;
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.Scene.addChild(new chunjiechouqianLayer());
                    break;
            }
        }, this)

    }
};

//清明放风筝活动
var showHomeActivityIcon_flyAKite = function(homeui, layoutData) {
    var btn_flyAKite = homeui.node.getChildByName("btn_flyAKite");
    MjClient.homeui.btn_flyAKite = btn_flyAKite;
    cc.log("wxd========放风筝=========");
    if(btn_flyAKite){
        if(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.FLY_A_KITE)
            && MjClient.systemConfig.functionConfigXY["FLY_A_KITE"] && MjClient.systemConfig.functionConfigXY["FLY_A_KITE"].isShow){
            btn_flyAKite.setVisible(true);
        }else {
            btn_flyAKite.setVisible(false);
        }

        setWgtLayout(btn_flyAKite, layoutData[0], layoutData[1], layoutData[2]);

        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("res/active/active_flyAKite/btn_flyAKite.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(cc.p(btn_flyAKite.width/2, btn_flyAKite.height/2));
        btn_flyAKite.addChild(clipper,2);
        var sprite = new cc.Sprite("ShopOfJiFen/enter_3.png");
        sprite.setScale(2)
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction); //进行向右移动的重复动作

        btn_flyAKite.addTouchEventListener(function(sender, type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.FLY_A_KITE)) return;
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    cc.log("wxd========放风筝=========");
                    MjClient.Scene.addChild(new flyAKiteLayer());
                    break;
            }
        }, this)

    }
};

//五一集春豆活动
var showHomeActivityIcon_collectSpringBean = function(homeui, layoutData) {
    var btn_collectSpringBean = homeui.node.getChildByName("btn_collectSpringBean");
    MjClient.homeui.btn_collectSpringBean = btn_collectSpringBean;
    cc.log("wxd========五一集春豆=========");
    if(btn_collectSpringBean){
        if(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.COLLECT_SPRING_BEAN)
            && MjClient.systemConfig.functionConfigXY["COLLECT_SPRING_BEAN"] && MjClient.systemConfig.functionConfigXY["COLLECT_SPRING_BEAN"].isShow){
            btn_collectSpringBean.setVisible(true);
        }else {
            btn_collectSpringBean.setVisible(false);
        }

        setWgtLayout(btn_collectSpringBean, layoutData[0], layoutData[1], layoutData[2]);

        var light = btn_collectSpringBean.getChildByName("Image_light");
        light.runAction(cc.repeatForever(cc.rotateBy(2, 360)));

        btn_collectSpringBean.addTouchEventListener(function(sender, type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.COLLECT_SPRING_BEAN)) return;
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    cc.log("wxd========五一集春豆=========");
                    MjClient.Scene.addChild(new collectSpringBeanLayer());
                    break;
            }
        }, this)

    }
};


//五一集春豆活动
var showHomeActivityIcon_changciGrowth = function(homeui, layoutData) {
    var btn_growth = homeui.node.getChildByName("btn_growth");
    MjClient.homeui.btn_growth = btn_growth;
    cc.log("wxd========场次增长=========");
    if(btn_growth){
        if(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ACTIVITY_CLUB_MONTH)
            && MjClient.systemConfig.functionConfigXY["ACTIVITY_CLUB_MONTH"] && MjClient.systemConfig.functionConfigXY["ACTIVITY_CLUB_MONTH"].isShow){
            btn_growth.setVisible(true);
        }else {
            btn_growth.setVisible(false);
        }

        setWgtLayout(btn_growth, layoutData[0], layoutData[1], layoutData[2]);

        btn_growth.addTouchEventListener(function(sender, type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ACTIVITY_CLUB_MONTH)) return;
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    cc.log("wxd========场次增长=========");
                    MjClient.Scene.addChild(new Active_growthLayer());
                    break;
            }
        }, this)

    }
};

//  二人排行榜  showHomeActivityIcon_erRenRank
var showHomeActivityIcon_erRenRank = function(homeui, layoutData) {
    var btn_erRenRank = homeui.node.getChildByName("btn_erRenRank");
    cc.log("=======  btn_erRenRank  =========");
    if(btn_erRenRank){
        if(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ER_REN_RANK)
            && MjClient.systemConfig.functionConfigXY["ER_REN_RANK"] && MjClient.systemConfig.functionConfigXY["ER_REN_RANK"].isShow){
                btn_erRenRank.setVisible(true);
        }else {
            btn_erRenRank.setVisible(false);
        }

        setWgtLayout(btn_erRenRank, layoutData[0], layoutData[1], layoutData[2]);

        btn_erRenRank.addTouchEventListener(function(sender, type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ER_REN_RANK)) return;
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    cc.log("==  btn_erRenRank  ====");
                        MjClient.block();
                        MjClient.gamenet.request("pkplayer.handler.openBrowser", { type: 2 }, function (rtn) {
                            MjClient.unblock();
                            if (rtn.code == 0) {
                                MjClient.native.OpenUrl(rtn.data);
                            }
                            else {
                                if (rtn.message) {
                                    MjClient.showToast(rtn.message);
                                }
                                else {
                                    MjClient.showToast("获取数据失败，请重试");
                                }
                            }
                        });
                    
                    break;
            }
        }, this);
    }
};


//亲友圈元宝消耗活动(新版)
var showHomeActivityIcon_clubCost = function(homeui, layoutData) {

    var btn_clubCost = homeui.node.getChildByName("btn_clubCost");
    if (btn_clubCost) {
        btn_clubCost.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.CLUB_COST_ACTIVITY)
            && MjClient.systemConfig.functionConfigXY["CLUB_COST_ACTIVITY"] && MjClient.systemConfig.functionConfigXY["CLUB_COST_ACTIVITY"].isShow);
        setWgtLayout(btn_clubCost, layoutData[0], layoutData[1], layoutData[2]);

        var img11 = btn_clubCost.getChildByName("img11");
        if(img11){
            for(var i = 0; i<6; i++){
                var qiu = btn_clubCost.getChildByName("qiu_"+i);
                qiu.setVisible(false);
                qiu.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.2*i),cc.callFunc(function () {this.setVisible(true)}.bind(qiu)),cc.delayTime(0.2),cc.callFunc(function () {this.setVisible(false)}.bind(qiu)),cc.sequence(cc.delayTime(1.2 - 0.2*i)))));
            }
        }

        btn_clubCost.addTouchEventListener(function(sender, Type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.CLUB_COST_ACTIVITY)) return;
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer;
                    layer = new ClubCost_Layer();

                    MjClient.Scene.addChild(layer);
                    break;
                default:
                    break;
            }

        }, this);
    }

};


//亲友圈元宝消耗活动(新版)
var showHomeActivityIcon_double11 = function(homeui, layoutData) {
    cc.log("=======  btn_double_11  =========");
    var btn_double_11 = homeui.node.getChildByName("btn_double_11");
    if (btn_double_11) {
        btn_double_11.setVisible(MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ACTIVITY_DOUBLE_11)
            && MjClient.systemConfig.functionConfigXY["ACTIVITY_DOUBLE_11"] && MjClient.systemConfig.functionConfigXY["ACTIVITY_DOUBLE_11"].isShow);
        setWgtLayout(btn_double_11, layoutData[0], layoutData[1], layoutData[2]);

        cc.log("=======  btn_double_11  ========="+btn_double_11.visible);
        btn_double_11.addTouchEventListener(function(sender, Type) {
            if (!MjClient.isOpentFunctionType(MjClient.FUNCTION_CONFIG_TYPE.ACTIVITY_DOUBLE_11)) return;
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer = new Active_double11_Layer();
                    MjClient.Scene.addChild(layer);
                    break;
                default:
                    break;
            }

        }, this);
    }

};

