var setting_ziPai = cc.Layer.extend({
	_jsBind:{
		block:{
			_layout:[[1,1],[0.5,0.5],[0,0],true]
		},
		back:
		{	
            _layout:[[0, 1],[1, 0],[-1, 0]],
		    close:{
				_click:function(){
					MjClient.setui.removeFromParent(true);
				}
			},

            menu : {
                _click:function(sender){
                    sender._type += 1;
                    if(sender._type > 2){
                        sender._type = 1;
                    }
                    sender.checkType();
                    postEvent("ZPaiSetType",{type:sender._type});
                    util.localStorageEncrypt.setNumberItem("ziPaiMenu", sender._type);
                },
                _run : function(){
                    this._type = util.localStorageEncrypt.getNumberItem("ziPaiMenu", 1);
                    this.frame = this.getChildByName("frame");        // 画面设置
                    this.function = this.getChildByName("function");  // 功能设置

                    this.checkType = function(){
                        if(this._type == 1){
                            this.frame.setVisible(true);
                            this.function.setVisible(false);
                        }else{
                            this.frame.setVisible(false);
                            this.function.setVisible(true);
                        }
                    }
                    this.checkType();
                },
            },
            img_title: {
                _run:function() {
                    this.visible = false;
                }
            },

            huaMian : {
                _visible: false,
                _run : function(){
                    var type = util.localStorageEncrypt.getNumberItem("ziPaiMenu", 1);
                    if(type === 1)
                    {
                        this.visible = true;
                    }
                },
                _event : {
                    ZPaiSetType : function(ed){
                        if(ed.type == 1){
                            this.visible = true;
                        }else{
                            this.visible = false;
                        }
                    }
                },

                music : {
                    _run : function(){
                        var yyin = this.getChildByName("yyin");
                        var voice_1 = this.getChildByName("voice_1");
                        var voice_2 = this.getChildByName("voice_2");

                        this.noEffect = this.getChildByName("noEffect");
                        this.noMusic = this.getChildByName("noMusic");
                        this.noSpeak = this.getChildByName("noSpeak");
                        this.Slider_effect = this.getChildByName("Slider_effect");
                        this.Slider_music = this.getChildByName("Slider_music");
                        this.Slider_speak = this.getChildByName("Slider_speak");
                        this.noEffect.setSelected(util.localStorageEncrypt.getNumberItem("oldEffectVolume", -1) != -1);
                        this.noMusic.setSelected(util.localStorageEncrypt.getNumberItem("oldMusicVolume", -1) != -1);
                        

                        MjClient.setui.noEffect = this.noEffect;
                        MjClient.setui.noMusic = this.noMusic;
                        

                        this.noEffect.addEventListener(function(sender,type)
                        {
                            switch (type) {
                                case ccui.CheckBox.EVENT_SELECTED:
                                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinxiaokaiguan", {uid:SelfUid()});
                                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", this.Slider_effect.getPercent() / 100);
                                    this.noEffect.setSelected(true);
                                    this.Slider_effect.setPercent(0);
                                    setEffectsVolume(0);
                                    break;
                                case ccui.CheckBox.EVENT_UNSELECTED:
                                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinxiaokaiguan", {uid:SelfUid()});
                                    this.noEffect.setSelected(false);
                                    var v = util.localStorageEncrypt.getNumberItem("oldEffectVolume", 0);
                                    this.Slider_effect.setPercent(v * 100);
                                    setEffectsVolume(v);
                                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                                    break;
                            }
                        },this);

                        this.noMusic.addEventListener(function(sender,type)
                        {
                            switch (type) {
                                case ccui.CheckBox.EVENT_SELECTED:
                                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinyuekaiguan", {uid:SelfUid()});
                                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", this.Slider_music.getPercent() / 100);
                                    this.noMusic.setSelected(true);
                                    this.Slider_music.setPercent(0);
                                    setMusicVolume(0);
                                    break;
                                case ccui.CheckBox.EVENT_UNSELECTED:
                                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinyuekaiguan", {uid:SelfUid()});
                                    this.noMusic.setSelected(false);
                                    var v = util.localStorageEncrypt.getNumberItem("oldMusicVolume", 0);
                                    this.Slider_music.setPercent(v * 100);
                                    setMusicVolume(v);
                                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                                    break;
                            }
                        },this);
                        if (this.noSpeak) {
                            MjClient.setui.noSpeak = this.noSpeak;
                            this.noSpeak.setSelected(util.localStorageEncrypt.getNumberItem("oldSpeakVolume", -1) != -1);
                            this.noSpeak.addEventListener(function(sender, type) {
                                switch (type) {
                                    case ccui.CheckBox.EVENT_SELECTED:
                                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_YuYinYinLiangkaiguan", {
                                            uid: SelfUid()
                                        });
                                        util.localStorageEncrypt.setNumberItem("oldSpeakVolume", this.Slider_speak.getPercent() / 100);
                                        this.noSpeak.setSelected(true);
                                        this.Slider_speak.setPercent(0);
                                        setSpeakVolume(0);
                                        break;
                                    case ccui.CheckBox.EVENT_UNSELECTED:
                                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_YuYinYinLiangkaiguan", {
                                            uid: SelfUid()
                                        });
                                        this.noSpeak.setSelected(false);
                                        var v = util.localStorageEncrypt.getNumberItem("oldSpeakVolume", 0);
                                        this.Slider_speak.setPercent(v * 100);
                                        setSpeakVolume(v);
                                        util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                                        break;
                                }
                            }, this);
                        }
                        
                    },
                    Slider_effect:{
                        _run:function(){ this.setPercent(getEffectsVolume()*100); },
                        _slider:function(sdr,tp){
                            setEffectsVolume(this.getPercent()/100);
                            MjClient.setui.noEffect.setSelected(false);
                            util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                        }
                    },
                    Slider_music:{
                        _run:function(){ this.setPercent(setMusicVolume(-1)*100); },
                        _slider:function(sdr,tp){
                            setMusicVolume(this.getPercent()/100);
                            MjClient.setui.noMusic.setSelected(false);
                            util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                        }
                    },
                    Slider_speak:{
                    _run:function(){ this.setPercent(getSpeakVolume()*100); },
                    _slider:function(sdr,tp){
                        setSpeakVolume(this.getPercent()/100);
                        MjClient.setui.noSpeak.setSelected(false);
                        util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                    }
                },

                },
                delBtn:{
                    _run : function(){
                        this.visible = false;
                    },
                    _click:function(){
                        if (!IsRoomCreator() &&
                            (MjClient.data.sData.tData.tState == TableState.waitJoin || MjClient.data.sData.tData.tState == TableState.waitReady))
                        {
                            MjClient.showMsg("确定要退出房间吗？",
                                function() {
                                    MjClient.leaveGame();
                                    // MjClient.setui.removeFromParent(true);
                                    MjClient.delRoomTime = new Date().getTime();//记录点击申请解散房间按钮的时间
                                    if (!MjClient.enterui && !getClubInfoInTable())
                                        MjClient.Scene.addChild(new EnterRoomLayer());
                                },
                                function() {});
                        }
                        else {
                            MjClient.showMsg("是否解散房间？", function () {
                                MjClient.delRoom(true);
                                // MjClient.setui.removeFromParent(true);
                                MjClient.delRoomTime = new Date().getTime();//记录点击申请解散房间按钮的时间
                            }, function(){}, 1);
                        }

                        MjClient.setui.removeFromParent();
                    }
                },
                tingpai : {
                    _visible: false,
                },
                suDu : {
                    _visible: false,
                }
            },
            Text_ver:
                {
                    _visible:true,
                    _run:function(){
                      this.ignoreContentAdaptWithSize(true);
                      
                      if(MjClient.isShenhe == true){
                          this.setVisible(false);
                      }
                        this.setPositionY(this.getPositionY()+(this.getContentSize().height * 1.6));
                        //  一键修复按钮
                        var _fixBtn = new ccui.Button();
                        _fixBtn.loadTextureNormal("game_picture/yijianxiufu.png");
                        _fixBtn.loadTexturePressed("game_picture/yijianxiufu_p.png");
                        _fixBtn.addTouchEventListener(function(sender,Type){
                            switch (Type)
                            {
                                case ccui.Widget.TOUCH_ENDED:
                                    removeUpdataDirectory();
                                    break;
                                default :
                                    break;
                            }
                        });
                        _fixBtn.setPosition(this.getContentSize().width*0.4 - 10, -this.getContentSize().height*2/3 + 10);
                        _fixBtn.setScale(1);
                        this.addChild(_fixBtn);
                    },
                    _text:function(){
                        return "      ";
                    }
                },

            gongNeng : {
                _visible: false,
                _run : function(){
                    var type = util.localStorageEncrypt.getNumberItem("ziPaiMenu", 1);
                    if(type === 2)
                    {
                        this.visible = true;
                    }
                },

                _event : {
                    ZPaiSetType : function(ed){
                        if(ed.type == 2){
                            this.visible = true;
                        }else{
                            this.visible = false;
                        }
                    }
                },

                delBtn:{
                    _visible:function () {
                        return !MjClient.playui.isCoinField();
                    },
                    _click:function(){
                        if (!IsRoomCreator() &&
                            (MjClient.data.sData.tData.tState == TableState.waitJoin || MjClient.data.sData.tData.tState == TableState.waitReady))
                        {
                            MjClient.showMsg("确定要退出房间吗？",
                                function() {
                                    MjClient.leaveGame();
                                    // MjClient.setui.removeFromParent(true);
                                    MjClient.delRoomTime = new Date().getTime();//记录点击申请解散房间按钮的时间
                                    if (!MjClient.enterui && !getClubInfoInTable())
                                        MjClient.Scene.addChild(new EnterRoomLayer());
                                },
                                function() {});
                        }
                        else {
                            MjClient.showMsg("是否解散房间？", function () {
                                MjClient.delRoom(true);
                                // MjClient.setui.removeFromParent(true);
                                MjClient.delRoomTime = new Date().getTime();//记录点击申请解散房间按钮的时间
                            }, function(){}, 1);
                        }

                        MjClient.setui.removeFromParent();
                    }
                },
                exitBtn:
                {
                    _visible:false,
                    _click:function(){
                       MjClient.logout();
                       MjClient.setui.removeFromParent(true);
                    }
                },
            },
            btn_vibrato:{//振动开关
                _run:function () {
                    var isVibrato = util.localStorageEncrypt.getBoolItem("isVibrato", true);
                    if(isVibrato){
                        this.loadTextureNormal("game_picture/vibrato_on.png");
                    }else {
                        this.loadTextureNormal("game_picture/vibrato_off.png");
                    }
                },
                _click: function(btn) {
                    cc.log("wxd=======_click===");
                    var isVibrato = util.localStorageEncrypt.getBoolItem("isVibrato", true);
                    if(isVibrato){
                        btn.loadTextureNormal("game_picture/vibrato_off.png");
                        util.localStorageEncrypt.setBoolItem("isVibrato", false);
                    }else {
                        btn.loadTextureNormal("game_picture/vibrato_on.png");
                        util.localStorageEncrypt.setBoolItem("isVibrato", true);
                    }
                }
            }
        }
    },

    //用于子类
    jsBind : {},
    
    ctor:function (jsonSrc) {
        this._super();

        var jsonFile = jsonSrc === undefined ? "ziPai_Setting.json" : jsonSrc;
        //var jsonFile = jsonSrc === undefined ? "settingPanel_ziPai.json" : jsonSrc;
        var setui = ccs.load(jsonFile);
        this.addChild(setui.node);
		this._uiNode = setui.node
        settingView = this;
        MjClient.setui = this;
        util.assign(this.jsBind, this._jsBind);
        BindUiAndLogic(setui.node,this.jsBind);

        this.initParam();
        return true;
    },

    onEnter : function(){
        this._super();

        if (this.getName() == "HomeClick") 
        {
            var back = this._uiNode.getChildByName("back");
            var gongNeng = back.getChildByName("gongNeng");
            var delBtn = gongNeng.getChildByName("delBtn");
            var exitBtn = gongNeng.getChildByName("exitBtn");
            if(exitBtn){
                exitBtn.visible = true;
                delBtn.visible = false;
            }
        }
    },

    initParam : function(){
        var back = this._uiNode.getChildByName("back");
        var huaMian = back.getChildByName("huaMian");
        var gongNeng = back.getChildByName("gongNeng");

        //出牌语音
        this.initYuYin(huaMian);

        //布局
        this.initBuJu(huaMian);

        //游戏背景
        this.initBeiJiang(huaMian);

        //字牌字体
        this.initCardType(huaMian);

        //快速吃牌
        this.initFastEat(gongNeng);

        //出牌虚线
        this.initXuXian(gongNeng);

        //出牌速度
        this.initSuDu(gongNeng);

        //手牌大小
        this.initCardSize(gongNeng);

        //听牌提示
        this.initTingPai(gongNeng);

        //双击出牌
        this.initDoubleClick(gongNeng);

        //胡息显示
        this.initHuXi(gongNeng);

        //出牌
        this.initChuPai(gongNeng);

        //出牌提示
        this.initChuPaiGuide(gongNeng);

        //扩展
        this.initExtend(huaMian, gongNeng);
    },

    //出牌语音
    initYuYin : function(huaMian){
        var yuYinList = [];
        yuYinList.push(huaMian.getChildByName("music").getChildByName("voice_1"));
        yuYinList.push(huaMian.getChildByName("music").getChildByName("voice_2"));
        var type = MjClient.playui.getVoiceType();
        this.yuYinRadio = createRadioBoxForCheckBoxs(yuYinList, null, type);
        cc.eventManager.addListener(this.setTextClick(yuYinList,0,this.yuYinRadio),yuYinList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(yuYinList,1,this.yuYinRadio),yuYinList[1].getChildByName("text"));
        this.yuYinRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_VOICE_TYPE, index);
        });
    },

    //布局
    initBuJu : function(huaMian){
        var buJuList = [];
        buJuList.push(huaMian.getChildByName("buJu").getChildByName("layout1"));
        buJuList.push(huaMian.getChildByName("buJu").getChildByName("layout2"));
        var type = MjClient.playui.getLayoutType();
        this.buJuRadio = createRadioBoxForCheckBoxs(buJuList, null, type);
        cc.eventManager.addListener(this.setTextClick(buJuList,0,this.buJuRadio),buJuList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(buJuList,1,this.buJuRadio),buJuList[1].getChildByName("text"));
        this.buJuRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT, index);
            postEvent("EZP_layout", {});
        });
    },

    //游戏背景
    initBeiJiang : function(huaMian){
        var beiJingList = [];
        beiJingList.push(huaMian.getChildByName("beiJing").getChildByName("gameBg1"));
        beiJingList.push(huaMian.getChildByName("beiJing").getChildByName("gameBg2"));
        beiJingList.push(huaMian.getChildByName("beiJing").getChildByName("gameBg3"));
        if(huaMian.getChildByName("beiJing").getChildByName("gameBg4")){
            beiJingList.push(huaMian.getChildByName("beiJing").getChildByName("gameBg4"));
        }
        this.loadGameBgTexture(huaMian);
        huaMian.getChildByName("beiJing").x = huaMian.getChildByName("beiJing").x + 60;
        var gameBg4 = huaMian.getChildByName("beiJing").getChildByName("gameBg4");
        if(cc.sys.isObjectValid(gameBg4))
            gameBg4.visible = false;
        var type = MjClient.playui.getGameBgIdx();
        this.beiJingRadio = createRadioBoxForCheckBoxs(beiJingList, null, type);
        cc.eventManager.addListener(this.setTextClick(beiJingList,0,this.beiJingRadio),beiJingList[0].getChildByName("Image_1"));
        cc.eventManager.addListener(this.setTextClick(beiJingList,1,this.beiJingRadio),beiJingList[1].getChildByName("Image_1"));
        cc.eventManager.addListener(this.setTextClick(beiJingList,2,this.beiJingRadio),beiJingList[2].getChildByName("Image_1"));
        if(gameBg4){
            cc.eventManager.addListener(this.setTextClick(beiJingList,3,this.beiJingRadio),beiJingList[3].getChildByName("Image_1"));
        }
        this.beiJingRadio.setSelectCallBack(function(index, sender, nodeList){
            cc.log("EZP_gameBG : " + index);
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE,  index);
            // postEvent("changeGameBgEvent", {});
            postEvent("EZP_gameBG", {});
        });
    },

    loadBgAsync : function(gameBg,imageView,file) {
        cc.textureCache.addImageAsync(file,function(texture) {
            gameBg.setVisible(true);
            imageView.loadTexture(file);
        });
    },

    loadGameBgTexture : function(huaMian){
        for (var i = 0; i<3; i ++)
        {
            var gameBg = huaMian.getChildByName("beiJing").getChildByName("gameBg" + (i + 1));
            if (!gameBg)
                break;

            var file = "playing/anhuapaohuzi/bg/beijing_"+(i+1)+".jpg";
            if (file != "")
            {
                var texture = cc.textureCache.getTextureForKey(file);
                if (texture)
                    gameBg.getChildByName("Image_1").loadTexture(file);
                else {
                    // 预加载游戏背景
                    gameBg.setVisible(false);
                    this.loadBgAsync(gameBg,gameBg.getChildByName("Image_1"),file);
                }
            }
            else
                gameBg.setVisible(false);
        }
    },

    //字牌字体
    initCardType : function(huaMian){
        var ziPaiList = [];
        ziPaiList.push(huaMian.getChildByName("ziPai").getChildByName("ziPai1"));
        ziPaiList.push(huaMian.getChildByName("ziPai").getChildByName("ziPai2"));
        ziPaiList.push(huaMian.getChildByName("ziPai").getChildByName("ziPai3"));
        var ziPai4 = huaMian.getChildByName("ziPai").getChildByName("ziPai4");
        ziPai4.visible = false;
        ziPaiList[0].getChildByName("Image").loadTexture("setting/ziPai_1.png");
        ziPaiList[1].getChildByName("Image").loadTexture("setting/ziPai_5.png");
        ziPaiList[2].getChildByName("Image").loadTexture("setting/ziPai_3.png");
        var type = MjClient.playui.getCardFontIdx();
        this.ziPaiRadio = createRadioBoxForCheckBoxs(ziPaiList, null, type);
        for(var i = 0; i < ziPaiList.length; i++){
            cc.eventManager.addListener(this.setTextClick(ziPaiList,i,this.ziPaiRadio),ziPaiList[i].getChildByName("Image"));
        }
        this.ziPaiRadio.setSelectCallBack(function(index, sender, nodeList){ 
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, index);
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJBgType, index);
            postEvent("EZP_cardType", {idx:index, type:"font"});
        });
    },

    //快速吃牌
    initFastEat : function(gongNeng){
        var fastEatList = [];
        fastEatList.push(gongNeng.getChildByName("chiPai").getChildByName("no"));
        fastEatList.push(gongNeng.getChildByName("chiPai").getChildByName("yes"));
        var type = MjClient.playui.getFastEatType();
        this.fastEatRadio = createRadioBoxForCheckBoxs(fastEatList, null, type);
        cc.eventManager.addListener(this.setTextClick(fastEatList,0,this.fastEatRadio),fastEatList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(fastEatList,1,this.fastEatRadio),fastEatList[1].getChildByName("text"));
        this.fastEatRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_FAST_EAT_TYPE, index);
            postEvent("EZP_faseEat", {});
        });
    },

    //出牌虚线
    initXuXian : function(gongNeng){
        var xuXianList = [];
        xuXianList.push(gongNeng.getChildByName("xuXian").getChildByName("bz"));
        xuXianList.push(gongNeng.getChildByName("xuXian").getChildByName("gao"));
        var type = MjClient.playui.getXuXianType();
        this.xuXianRadio = createRadioBoxForCheckBoxs(xuXianList, null, type);
        cc.eventManager.addListener(this.setTextClick(xuXianList,0,this.xuXianRadio),xuXianList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(xuXianList,1,this.xuXianRadio),xuXianList[1].getChildByName("text"));
        this.xuXianRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_XU_XIAN_TYPE, index);
            postEvent("EZP_xuXian", {});
        });
    },

    //出牌速度
    initSuDu : function(gongNeng){
        var suDuList = [];
        suDuList.push(gongNeng.getChildByName("suDu").getChildByName("yb"));
        suDuList.push(gongNeng.getChildByName("suDu").getChildByName("bz"));
        var man = gongNeng.getChildByName("suDu").getChildByName("man");
        var jiKuai = gongNeng.getChildByName("suDu").getChildByName("jiKuai");
        man.visible = true;
        jiKuai.visible = true;
        var daxiao = gongNeng.getChildByName("daxiao")
        var off = -daxiao.height * 0.8;
        daxiao.y += off;
        var tingpai = gongNeng.getChildByName("tingpai");
        tingpai.y += off;
        var huxi = gongNeng.getChildByName("huxi");
        huxi.y += off;
        var chupai = gongNeng.getChildByName("chupai");
        chupai.y += off;
        suDuList.push(man);
        suDuList.push(jiKuai);
        var type = MjClient.playui.getSuDuType();
        this.suDuRadio = createRadioBoxForCheckBoxs(suDuList, null, type);
        for(var i = 0; i < suDuList.length; i++){
            cc.eventManager.addListener(this.setTextClick(suDuList,i,this.suDuRadio),suDuList[i].getChildByName("text"));
        }
        this.suDuRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_SU_DU_TYPE, index);
            postEvent("EZP_suDu", {});
        });
    },

    //手牌大小
    initCardSize : function(gongNeng){
        var cardSizeList = [];
        cardSizeList.push(gongNeng.getChildByName("daxiao").getChildByName("da"));
        cardSizeList.push(gongNeng.getChildByName("daxiao").getChildByName("xiao"));
        var superCard = gongNeng.getChildByName("daxiao").getChildByName("super");
        superCard.visible = true;
        var smallCard = gongNeng.getChildByName("daxiao").getChildByName("xiao");
        var tempX = smallCard.x;
        smallCard.x = superCard.x;
        superCard.x = tempX;
        cardSizeList.push(superCard);
        // cardSizeList.push(gongNeng.getChildByName("suDu").getChildByName("js"));
        var type = MjClient.playui.getCardSizeIdx();
        this.cardSizeRadio = createRadioBoxForCheckBoxs(cardSizeList, null, type);
        for(var i = 0; i < cardSizeList.length; i++){
            cc.eventManager.addListener(this.setTextClick(cardSizeList,i,this.cardSizeRadio),cardSizeList[i].getChildByName("text"));
        }
        this.cardSizeRadio.setSelectCallBack(function(index, sender, nodeList){  
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_CARD_SIZE, index);
            // postEvent("changeMJBgEvent", {});
            postEvent("EZP_cardType", {idx:index, type:"size"});
        });
    },

    //听牌提示
    initTingPai : function(gongNeng){
        var tingpai = gongNeng.getChildByName("tingpai");
        tingpai.getChildByName("title").ignoreContentAdaptWithSize(true);
        tingpai.visible = true;
        var tingPaiList = [];
        tingPaiList.push(tingpai.getChildByName("kaiqi"));
        tingPaiList.push(tingpai.getChildByName("guanbi"));
        var type = MjClient.playui.getTingPaiType();
        this.tingPaiRadio = createRadioBoxForCheckBoxs(tingPaiList, null, type);
        cc.eventManager.addListener(this.setTextClick(tingPaiList,0,this.tingPaiRadio),tingPaiList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(tingPaiList,1,this.tingPaiRadio),tingPaiList[1].getChildByName("text"));
        this.tingPaiRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_PLAY_TING_PAI, index);
            postEvent("EZP_tingPai", index);
        });
    },

    //双击出牌
    initDoubleClick : function(gongNeng){
        var doubleClickToPut = gongNeng.getChildByName("doubleClickToPut");
        if (!doubleClickToPut) {
            return;
        }

        doubleClickToPut.visible = false;//默认没有双击出牌
        doubleClickToPut.y = gongNeng.getChildByName("tingpai").y;//默认放在听牌的位置
        doubleClickToPut.getChildByName("title").ignoreContentAdaptWithSize(true);
        var doubleClickToPutList = [];
        doubleClickToPutList.push(doubleClickToPut.getChildByName("guanbi"));
        doubleClickToPutList.push(doubleClickToPut.getChildByName("kaiqi"));
        var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_DOUBLE_CLICK_TYPE, 1);
        this.doubleClickToPutRadio = createRadioBoxForCheckBoxs(doubleClickToPutList, null, type);
        cc.eventManager.addListener(this.setTextClick(doubleClickToPutList,0,this.doubleClickToPutRadio),doubleClickToPutList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(doubleClickToPutList,1,this.doubleClickToPutRadio),doubleClickToPutList[1].getChildByName("text"));
        this.doubleClickToPutRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_DOUBLE_CLICK_TYPE, index);
        });
    },

    //胡息显示
    initHuXi : function(gongNeng){
        var huxi = gongNeng.getChildByName("huxi");
        huxi.getChildByName("title").ignoreContentAdaptWithSize(true);
        huxi.visible = true;
        var huXiList = [];
        huXiList.push(huxi.getChildByName("kaiqi"));
        huXiList.push(huxi.getChildByName("guanbi"));
        var type = MjClient.playui.getHuXiType();
        this.huXiRadio = createRadioBoxForCheckBoxs(huXiList, null, type);
        for(var i = 0; i < huXiList.length; i++){
            cc.eventManager.addListener(this.setTextClick(huXiList,i,this.huXiRadio),huXiList[i].getChildByName("text"));
        }
        this.huXiRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_HU_XI_TYPE, index);
            postEvent("EZP_huXi", index);
        });
    },

    //出牌按钮
    initChuPai : function(gongNeng){
        var chupai = gongNeng.getChildByName("chupai");
        chupai.getChildByName("title").ignoreContentAdaptWithSize(true);
        chupai.visible = false; //默认没有出牌按钮
        var type = MjClient.playui.getChuPaiType();
        var chupaiList = [];
        chupaiList.push(chupai.getChildByName("kaiqi"));
        chupaiList.push(chupai.getChildByName("guanbi"));
        this.chupaiRadio = createRadioBoxForCheckBoxs(chupaiList, null, type);
        for(var i = 0; i < chupaiList.length; i++){
            cc.eventManager.addListener(this.setTextClick(chupaiList,i,this.chupaiRadio),chupaiList[i].getChildByName("text"));
        }
        this.chupaiRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_CHU_PAI_TYPE, index);
            postEvent("EZP_chuPai", index);
        });
    },

    //出牌提示
    initChuPaiGuide : function(gongNeng){
        var chuPaiGuide = gongNeng.getChildByName("chuPaiGuide");
        chuPaiGuide.getChildByName("title").ignoreContentAdaptWithSize(true);
        chuPaiGuide.visible = false; //默认没有
        var type = MjClient.playui.getChuPaiGuide();
        var chuPaiGuideList = [];
        chuPaiGuideList.push(chuPaiGuide.getChildByName("kaiqi"));
        chuPaiGuideList.push(chuPaiGuide.getChildByName("guanbi"));
        this.chuPaiGuideRadio = createRadioBoxForCheckBoxs(chuPaiGuideList, null, type);
        for(var i = 0; i < chuPaiGuideList.length; i++){
            cc.eventManager.addListener(this.setTextClick(chuPaiGuideList,i,this.chuPaiGuideRadio),chuPaiGuideList[i].getChildByName("text"));
        }
        this.chuPaiGuideRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_CHU_PAI_GUIDE, index);
            postEvent("EZP_chuPaiGuide", index);
        });
    },

    //扩展初始化
    initExtend: function(huaMian, gongNeng) {

    },

    radioBoxSelectCB: function(index, sender, list) {
        if (sender) {
            var txt = sender.getChildByName("text");
            txt.setTextColor(CREATEROOM_COLOR_1);
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var radioBox = list[i];
                if (radioBox !== sender || sender.isSelected() == false) {
                    txt = radioBox.getChildByName("text");
                    txt.setTextColor(CREATEROOM_COLOR_3);
                }
            }
        }
    },

    //创建房间 点击范围扩大 使得文字也能点击
    setTextClick:function (listnode,number,radio) 
    {   
        var that = this;
        return cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {

                var target = event.getCurrentTarget();
                var parent = target;
                for (; parent; parent = parent.parent)
                {
                    if (!parent.visible)
                        return false;
                }

                var pos = target.getParent().convertTouchToNodeSpace(touch); // 世界坐标转换 (子节点相对于父节点的位置)

                // 如果触碰起始地点在本区域中
                var box = target.getBoundingBox();
                box.width += 10;
                box.height += 10;
                box.x -= 10;
                box.y -= 10;
                if(!cc.rectContainsPoint(box, pos))
                {
                    return false;
                }
                return true;
            },
            onTouchEnded: function (touch, event) { 

                var target = event.getCurrentTarget();
                var pos = target.getParent().convertTouchToNodeSpace(touch); // 世界坐标转换 (子节点相对于父节点的位置)
                if (listnode) {
                    for (var i = 0; i < listnode.length; i++) {
                        if (i==number) {
                            listnode[i].setSelected(true); 
                            radio.selectItem(i);
                        }else{
                            listnode[i].setSelected(false);
                        } 
                    }

                    //游戏语音
                    if (radio == that.yuYinRadio) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_VOICE_TYPE, number);
                    }

                    //游戏布局
                    if (radio == that.buJuRadio) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT, number);
                        postEvent("EZP_layout", {});
                    }

                    //游戏背景
                    if (radio == that.beiJingRadio) {
                        cc.log("EZP_gameBG : " + number);
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE, number);
                        setCurrentGameBgType(number);
                        postEvent("EZP_gameBG", {});
                    }

                    //字牌字体
                    if (radio == that.ziPaiRadio) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, number);
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJBgType, number);
                        postEvent("EZP_cardType", {idx:number, type:"font"});
                    }


                    //快速吃牌
                    if (radio == that.fastEatRadio) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_FAST_EAT_TYPE, number);
                        postEvent("EZP_faseEat", {});
                    }

                    //显示胡息
                    if (radio == that.huXiRadio) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_HU_XI_TYPE, number);
                        postEvent("EZP_huXi", {});
                    }

                    //出牌虚线
                    if (radio == that.xuXianRadio) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_XU_XIAN_TYPE, number);
                        postEvent("EZP_xuXian", {});
                    }

                    //出牌速度
                    if (radio == that.suDuRadio) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_SU_DU_TYPE, number);
                        postEvent("EZP_suDu", {});
                    }
                    //手牌大小
                    if (radio == that.cardSizeRadio){
                        cc.log("cardSizeRadio touch");
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_CARD_SIZE, number);
                        postEvent("EZP_cardType", {idx:number, type:"size"});
                    }

                    //出牌
                    if (radio == that.chupaiRadio){
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_CHU_PAI_TYPE, number);
                        postEvent("EZP_chuPai", {});
                    }

                    //出牌
                    if (radio == that.tingPaiRadio){
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_PLAY_TING_PAI, number);
                        postEvent("EZP_tingPai", number);
                    }

                    //听牌提示
                    if (radio == that.tingPaiRadio){
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_PLAY_TING_PAI, number);
                        postEvent("EZP_tingPai", number);
                    }

                    //出牌提示
                    if (radio == that.chuPaiGuideRadio){
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_CHU_PAI_GUIDE, number);
                        postEvent("EZP_chuPaiGuide", number);
                    }

                }else{
                    // 如果触碰起始地点在本区域中
                    if(!cc.rectContainsPoint(target.getBoundingBox(), pos))
                        return;
                    target.parent.setSelected(!target.parent.isSelected());
                }
                
            }
        });       
    }
});