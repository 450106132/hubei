
// 岳阳，大厅设置界面 3.0
var HomeSettingView_yueyang_v3 = cc.Layer.extend({
    jsBind:{
        block:{
            _layout:[[1, 1], [0.5, 0.5], [0, 0], true]
        },
        back:{
            _layout:[[1, 1], [0.5, 0.5], [0, 0]],
            close:{
                _click: function () {
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Close", {uid:SelfUid()});
                    if(MjClient.homeSetUi)
                    {
                        MjClient.homeSetUi.removeFromParent(true);
                        MjClient.homeSetUi = null;
                    }
                }
            },
            SwitchAccount:{
                _click:function(){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Qiehuanzhanghao", {uid:SelfUid()});
                    MjClient.logout();
                    if(MjClient.homeSetUi)
                    {
                        MjClient.homeSetUi.removeFromParent(true);
                        MjClient.homeSetUi = null;
                    }
                }
            },
            ExitGame:{
                _click:function () {
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Tuichuyouxi", {uid:SelfUid()});
                    showExitGameLayer();
                }
            },

            btn_container: {
                _run: function() {
                    // if (cc.sys.os == cc.sys.OS_IOS)
                    // {
                    //     this.width = 530;
                    // }
                    // else if (cc.sys.os == cc.sys.OS_ANDROID)
                    // {
                    //     this.width = 705;
                    // }
                },
                xiufuBtn: {

                },
                btn_vibrato: {//振动开关
                    _run:function () {
                        var isVibrato = util.localStorageEncrypt.getBoolItem("isVibrato", true);
                        if(isVibrato){
                            this.loadTextureNormal("joinGame_3.0/vibrato_on.png");
                        }else {
                            this.loadTextureNormal("joinGame_3.0/vibrato_off.png");
                        }
                    },
                    _click: function(btn) {
                        cc.log("wxd=======_click===");
                        var isVibrato = util.localStorageEncrypt.getBoolItem("isVibrato", true);
                        if(isVibrato){
                            btn.loadTextureNormal("joinGame_3.0/vibrato_off.png");
                            util.localStorageEncrypt.setBoolItem("isVibrato", false);
                            MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Zhendongkaiguan_Off", {uid:SelfUid()});
                        }else {
                            btn.loadTextureNormal("joinGame_3.0/vibrato_on.png");
                            util.localStorageEncrypt.setBoolItem("isVibrato", true);
                            MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Zhendongkaiguan_On", {uid:SelfUid()});
                        }
                    }
                },
                btn_openPosition: {
                    _visible : false,
                    _click: function() {
                        MjClient.native.openSystemSetting();
                    }
                },
                btn_openImpower: {
                    _visible : false,
                    _click: function() {
                        MjClient.native.openSelfAppSetting();
                    }
                },
                btn_repotPlayer: {
                    _click: function() {
                        MjClient.Scene.addChild(new reportPlayerLayer_v3());
                    }
                }
            }

        }

    },
    color1:cc.color("ff6f20"),
    color2:cc.color("08460e"),
    ctor: function () {
        this._super();
        var homeSetUi = ccs.load("setting_home_3.0.json");
        var _back = homeSetUi.node.getChildByName("back");

        this.SliderMusic = _back.getChildByName("SliderMusic");
        this.SliderVoice = _back.getChildByName("SliderVoice");
        this.SliderSpeak = _back.getChildByName("SliderSpeak");
        this.CheckBoxMusic = _back.getChildByName("CheckBoxMusic");   // noMusic
        this.CheckBoxVoice = _back.getChildByName("CheckBoxVoice");   // noVoice
        this.CheckBoxSpeak = _back.getChildByName("CheckBoxSpeak");   // noSpeak
        // 一键修复
        var _fixBtn = _back.getChildByName("btn_container").getChildByName("xiufuBtn");
        if(_fixBtn){
            _fixBtn.addTouchEventListener(function(sender,Type){
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        removeUpdataDirectory();
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yijianxiufu", {uid:SelfUid()});
                        break;
                    default :
                        break;
                }
            },this);
        }

        MjClient.homeSetUi = this;
        BindUiAndLogic(homeSetUi.node, this.jsBind);
        this.addChild(homeSetUi.node);

        var _suizi = _back.getChildByName("suizi");
        //穗子动画
        if(_suizi) 
            COMMON_UI.suiziAni(_suizi,8);
        else
            COMMON_UI.popDialogAni(_back);

            this.CheckBoxMusic.setSelected(util.localStorageEncrypt.getNumberItem("MusicVolume", 0.5) == 0);
            this.CheckBoxVoice.setSelected(util.localStorageEncrypt.getNumberItem("EffectVolume", 0.5) == 0);
    
            this.CheckBoxMusic.addEventListener(function (sender, type) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinyue_Yinyuekaiguan", {uid:SelfUid()});
                switch (type){
                    case ccui.CheckBox.EVENT_SELECTED:
                        this.CheckBoxMusic.setSelected(true);
                        setMusicVolume(0);
                    
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        this.CheckBoxMusic.setSelected(false);
                        setMusicVolume(1);
                        break;
                }
            }, this);
    
    
            this.CheckBoxVoice.addEventListener(function(sender,type)
            {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinxiao_Yinxiaokaiguan", {uid:SelfUid()});
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        this.CheckBoxVoice.setSelected(true);
                        setEffectsVolume(0);
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        this.CheckBoxVoice.setSelected(false);
                        setEffectsVolume(1);
                        
                        break;
                }
            },this);
    
            
            if (this.CheckBoxSpeak) {
                this.CheckBoxSpeak.setSelected(util.localStorageEncrypt.getNumberItem("SpeakVolume", 0.5) == 0);
                this.CheckBoxSpeak.addEventListener(function(sender, type) {
                    switch (type) {
                        case ccui.CheckBox.EVENT_SELECTED:
                            this.CheckBoxSpeak.setSelected(true);
                            setSpeakVolume(0);
                            break;
                        case ccui.CheckBox.EVENT_UNSELECTED:
                            this.CheckBoxSpeak.setSelected(false);
                            setSpeakVolume(1);
                            break;
                    }
                }, this);
            }


        this.isShowOpenPos();

        // 经典版、湖南版切换
        var uiSelectList = [_back.getChildByName("oldUi"), _back.getChildByName("newUi"), _back.getChildByName("superUi")];
        this._uiSelect_radio = createRadioBoxForCheckBoxs(uiSelectList);
        for (var i = 0; i < uiSelectList.length; i++) {
            uiSelectList[i].visible = false;
        }

        var uiSelectEventCb = function(sender, type) {
            if (uiSelectList.indexOf(sender) >= 0) {
                if (type != ccui.CheckBox.EVENT_SELECTED && type != ccui.CheckBox.EVENT_UNSELECTED)
                    return;
            }
            else {
                if (type != 2) 
                    return;
            }

            var type = 0;
            for (var i = 0; i < uiSelectList.length; i++) {
                var isSelect = sender == uiSelectList[i] || sender == uiSelectList[i].getChildByName("text");
                uiSelectList[i].setSelected(isSelect);
                uiSelectList[i].getChildByName("text").setTextColor(isSelect ? this.color1 : this.color2 );
                if (isSelect)
                    type = i;
            }

            MjClient.setSkinToServer(type, function() {
                MjClient.switch_skinFresh();
                if (MjClient.homeui && cc.sys.isObjectValid(MjClient.homeui)) {
                    MjClient.homeui.removeFromParent(true);
                    MjClient.homeui = null;
                    MjClient.addHomeView();
                }
            });
        }

        var uiSelectType = MjClient.getUiIndex();
        for (var i = 0; i < uiSelectList.length; i++) {
            if(!uiSelectList[i]) continue;
            uiSelectList[i].addEventListener(uiSelectEventCb, this);
            uiSelectList[i].getChildByName("text").addTouchEventListener(uiSelectEventCb, this);

            uiSelectList[i].setSelected(uiSelectType == i);
            uiSelectList[i].getChildByName("text").setTextColor(uiSelectType == i ? this.color1 : this.color2 );
        }

        return true;
    },
     //是否显示开启定位
    isShowOpenPos :function()
    {
        var btn_openPosition = this.jsBind.back.btn_container.btn_openPosition._node;
        var btn_openImpower = this.jsBind.back.btn_container.btn_openImpower._node;

        if (!btn_openPosition || !btn_openImpower)
            return;

        if (!isCurrentNativeVersionBiggerThan("11.0.0"))
        {
            btn_openPosition.visible = false;
            btn_openImpower.visible = false;
            return;
        }

        if (cc.sys.os == cc.sys.OS_IOS)
        {
            btn_openPosition.visible = true;
            btn_openImpower.visible = false;
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
    },

});