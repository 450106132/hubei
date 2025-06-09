var setting_maJiang = cc.Layer.extend({
	_jsBind:{
        block:{
            _layout: [[1, 1], [0.5, 0.5], [0, 0], true]
        },
		back: {
            _layout:[[0,1],[1,0],[0,0],true],
		    close:{
				_click:function(){
					MjClient.setui.removeFromParent(true);
                    MjClient.setui = null;
				}
			},
            // 画面/功能按钮
            menu : {
                _click:function(sender){
                    sender._type += 1;
                    if(sender._type > 2){
                        sender._type = 1;
                    }
                    sender.checkType();
                    postEvent("MJSetType",{type:sender._type});
                    MjClient.playui.setMaJiangSettingType(sender._type);
                },
                _run : function(){
                    this._type = MjClient.playui.getMaJiangSettingType();
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
            // 画面设置
            layout_picture : {
                _visible: false,
                _run : function(){
                    var is3D = MjClient.playui.get3DType();
                    var type = MjClient.playui.getMaJiangSettingType();
                    this.visible = (type === 1);
                    // MjClient.setui.view3DMenuChange(is3D, this);
                    MjClient.setui.change3DTable(is3D, this.getChildByName("btn_3D"));
                },
                _event : {
                    MJSetType : function(ed){
                        this.visible = (ed.type == 1);
                    }
                },
                btn_3D:{
                    _visible:true,
                    _click:function (btn){
                        MjClient.setui.change3DTable(true, btn);
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Huamianshezhi_Shitu_Xinban3D", {uid: SelfUid()});
                    }
                },
                btn_2D:{
                    _visible:true,
                    _click:function(btn) {
                        MjClient.setui.change3DTable(false, btn);
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Huamianshezhi_Shitu_Jingdian2D", {uid: SelfUid()});
                    }
                },
            },
            // 功能设置
            layout_function : {
                _visible: false,
                _run : function(){
                    var type = MjClient.playui.getMaJiangSettingType();
                    this.visible = (type === 2);
                },
                _event : {
                    MJSetType : function(ed){
                        this.visible = (ed.type == 2);
                    }
                },
                node_soundMusic:{
                    box_music:{
                        _run:function(){ 
                            MjClient.setui.initSoundEvent(this, MjClient.KEY_MJ_MUSIC_VOLUME, "Zhujiemian_Shezhi_Yinyuekaiguan");
                        },
                        _click: function(btn){
                            MjClient.setui._boxMusicUpdate(btn,"soundMusic"); 
                        } 
                    },
                    slider_music:{
                        _run:function(){ 
                            this.setPercent(MjClient.playui.getMusicVolume() *100); 
                        },
                        _slider:function(sdr,tp){  
                            MjClient.playui.setMusicVolume(this.getPercent()/100);
                            this.getParent().getChildByName("box_music").setSelected(false);
                        }
                    }
                },
                node_soundEffect:{
                    box_music:{
                        _run:function(){ 
                            MjClient.setui.initSoundEvent(this,MjClient.KEY_MJ_EFFECT_VOLUME,"Zhujiemian_Shezhi_Yinxiaokaiguan"); 
                        },
                        _click: function(btn){
                            MjClient.setui._boxMusicUpdate(btn,"soundEffect"); 
                        }
                    },
                    slider_music:{
                        _run:function(){ this.setPercent(getEffectsVolume(-1)*100); },
                        _slider:function(sdr,tp){ 
                            MjClient.playui.setEffectVolume(this.getPercent()/100);
                            this.getParent().getChildByName("box_music").setSelected(false);
                        }
                    }
                },
                node_soundSpeak:{
                    box_music:{
                        _run:function(){ 
                            MjClient.setui.initSoundEvent(this,MjClient.KEY_MJ_SPEAK_VOLUME,"Zhujiemian_Shezhi_YuYinYinLiangkaiguan");
                        },
                        _click: function(btn){
                            MjClient.setui._boxMusicUpdate(btn,"soundSpeak"); 
                        }
                    },
                    slider_music:{
                        _run:function(){ this.setPercent(getSpeakVolume(-1)*100); },
                        _slider:function(sdr,tp){ 
                            MjClient.playui.setSpeakVolume(this.getPercent()/100);
                            this.getParent().getChildByName("box_music").setSelected(false);
                        }
                    }
                },
                text_chupai: {
                    _run:function () {
                        this.visible = MjClient.playui.isShowDonXiaoText();
                    }
                },
                // 出牌动画
                btn_outEnlarge:{
                    text_outEnlarge:{
                        _run:function () {
                            this.ignoreContentAdaptWithSize(true);
                        },
                        _click: function(btn, eventType) {
                            if(eventType === ccui.Widget.TOUCH_ENDED){
                                var isOutEnlarge = MjClient.playui.getPutCardScaleConfig();
                                if(isOutEnlarge){
                                    btn.getParent().loadTexture("createNewPng/box_unselect.png");
                                    btn.setTextColor(COLOR.SETTNG_COLOR_2);
                                    MjClient.playui.setPutCardScaleConfig(false);
                                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Dongxiao_Chupaifangda_Quxiaoxuanzhong", {uid: SelfUid(),gameType:MjClient.gameType});
                                }else {
                                    btn.getParent().loadTexture("createNewPng/box_selected.png");
                                    btn.setTextColor(COLOR.SETTNG_COLOR_1);
                                    MjClient.playui.setPutCardScaleConfig(true);
                                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Dongxiao_Chupaifangda_Xuanzhong", {uid: SelfUid(),gameType:MjClient.gameType});
                                }
                            }
                        }
                    },
                    _run:function () {
                        this.visible = MjClient.playui.isShowPutCardScale();   // 是否显示出牌放大开关;
                        var isOutEnlarge = MjClient.playui.getPutCardScaleConfig();
                        if(isOutEnlarge){
                            this.loadTexture("createNewPng/box_selected.png");
                            this.getChildByName("text_outEnlarge").setTextColor(COLOR.SETTNG_COLOR_1);
                        }else{
                            this.loadTexture("createNewPng/box_unselect.png");
                            this.getChildByName("text_outEnlarge").setTextColor(COLOR.SETTNG_COLOR_2);
                        }
                    },
                    _click: function(sender, eventType) {
                        if(eventType === ccui.Widget.TOUCH_ENDED){
                            var isOutEnlarge = MjClient.playui.getPutCardScaleConfig();
                            if(isOutEnlarge){
                                sender.loadTexture("createNewPng/box_unselect.png");
                                sender.getChildByName("text_outEnlarge").setTextColor(COLOR.SETTNG_COLOR_2);
                                MjClient.playui.setPutCardScaleConfig(false);
                            }else {
                                sender.loadTexture("createNewPng/box_selected.png");
                                sender.getChildByName("text_outEnlarge").setTextColor(COLOR.SETTNG_COLOR_1);
                                MjClient.playui.setPutCardScaleConfig(true);
                            }
                        }
                    }
                },
                // 插牌动画
                btn_insertCardAni:{
                    text_insertCardAni:{
                        _run:function () {
                            this.ignoreContentAdaptWithSize(true);
                        },
                        _click: function(btn, eventType) {
                            if(eventType === ccui.Widget.TOUCH_ENDED){
                                var isInsertCardAni = MjClient.playui.getInsertCardAniConfig();
                                if(isInsertCardAni){
                                    btn.getParent().loadTexture("createNewPng/box_unselect.png");
                                    btn.setTextColor(COLOR.SETTNG_COLOR_2);
                                    MjClient.playui.setInsertCardAniConfig(false);
                                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Dongxiao_Chapaidonghua_Quxiaoxuanzhong", {uid: SelfUid(),gameType:MjClient.gameType});
                                }else {
                                    btn.getParent().loadTexture("createNewPng/box_selected.png");
                                    btn.setTextColor(COLOR.SETTNG_COLOR_1);
                                    MjClient.playui.setInsertCardAniConfig(true);
                                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Dongxiao_Chapaidonghua_Xuanzhong", {uid: SelfUid(),gameType:MjClient.gameType});
                                }
                            }
                        }
                    },
                    _run:function () {
                        this.visible = MjClient.playui.isShowInsertCard();    // 是否显示插牌动画开关;
                        var isInsertCardAni = MjClient.playui.getInsertCardAniConfig();
                        if(isInsertCardAni){
                            this.loadTexture("createNewPng/box_selected.png");
                            this.getChildByName("text_insertCardAni").setTextColor(COLOR.SETTNG_COLOR_1);
                        }else{
                            this.loadTexture("createNewPng/box_unselect.png");
                            this.getChildByName("text_insertCardAni").setTextColor(COLOR.SETTNG_COLOR_2);
                        }
                    },
                    _click: function(sender, eventType) {
                        if(eventType === ccui.Widget.TOUCH_ENDED){
                            var isInsertCardAni = MjClient.playui.getInsertCardAniConfig();
                            if(isInsertCardAni){
                                sender.loadTexture("createNewPng/box_unselect.png");
                                sender.getChildByName("text_insertCardAni").setTextColor(COLOR.SETTNG_COLOR_2);
                                MjClient.playui.setInsertCardAniConfig(false);
                            }else {
                                sender.loadTexture("createNewPng/box_selected.png");
                                sender.getChildByName("text_insertCardAni").setTextColor(COLOR.SETTNG_COLOR_1);
                                MjClient.playui.setInsertCardAniConfig(true);
                            }
                        }
                    }
                },
            },
            // 解散/退出 房间
            btn_delRoom:{
                _click:function(){
                    if (!IsRoomCreator() &&
                        (MjClient.data.sData.tData.tState == TableState.waitJoin || MjClient.data.sData.tData.tState == TableState.waitReady))
                    {
                        MjClient.showMsg("确定要退出房间吗？",
                            function() {
                                MjClient.leaveGame();
                                if(MjClient.setui)
                                {
                                    MjClient.setui.removeFromParent(true);
                                    MjClient.setui = null;
                                }
                            },
                            function() {});
                    }
                    else {
                        MjClient.showMsg("是否解散房间？", function () {
                            MjClient.delRoom(true);
                            if(MjClient.setui)
                            {
                                MjClient.setui.removeFromParent(true);
                                MjClient.setui = null;
                            }
                            MjClient.delRoomTime = new Date().getTime();//记录点击申请解散房间按钮的时间
                        }, function(){}, 1);
                    }
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Jiesanfangjian", {uid:SelfUid()});
                }
            },
            // 切换帐号
            exitBtn:{
                _visible:false,
                _click:function(){
                   MjClient.logout();
                   MjClient.setui.removeFromParent(true);
                }
            },
            // 一键修复
            btn_fix:{
                _click:function(){
                    removeUpdataDirectory();
                    if(MjClient.playui || MjClient.goldMatchingui){
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Yijianxiufu", {uid:SelfUid()});
                    }else{
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yijianxiufu", {uid:SelfUid()});
                    }
                }
            }

        }
    },

    //用于子类
    jsBind : {},
    
    ctor:function (jsonSrc) {
        this._super();

        var jsonFile = jsonSrc === undefined ? "setting_majiang.json" : jsonSrc;
        var setui = ccs.load(jsonFile);
        this.addChild(setui.node);
		this._uiNode = setui.node;
        MjClient.setui = this;


        util.assign(this.jsBind, this._jsBind);
        BindUiAndLogic(setui.node,this.jsBind);

        this.initParam();
        return true;
    },

    onEnter : function(){
        this._super();

    },

    initParam : function(){ 
        var is3D = COMMON_UI3D.getIs3DFromLocalStorage();

        var back = this._uiNode.getChildByName("back");
        var layout_picture = back.getChildByName("layout_picture"); 
        var layout_function = back.getChildByName("layout_function"); 
        var scrollView_play = layout_picture.getChildByName("scrollView_play");

        //黑色背景适配
        var block = this._uiNode.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        // 初始化桌面背景
        this.initGameBgImg(is3D, scrollView_play);
        // 初始化手牌选项
        this.initCardBgImg(is3D, scrollView_play)
        // 初始化普通话，本地化 按钮
        this.initVoiceMenu(layout_function);
        // 初始化特效开关
        this.initShowEffectMenu(layout_function);
        // 初始化手牌大小选项
        this.initHandCardSizeMenu(layout_function);
    },

    // 3D切换 
    change3DTable : function(is3D, target){ 
        var scrollView_play = target.getParent().getChildByName("scrollView_play");
        
        // 防止连续点击, 导致卡顿
        if(is3D !== MjClient.playui.is3DStyle()){ 
            MjClient.playui.set3DType(is3D);  
            postEvent("switch2Dor3D", {is3D: is3D}); 
            postEvent("changeGameBgEvent");  
        }

        // 初始化UI
        MjClient.setui.initGameBgImg(is3D, scrollView_play);
        MjClient.setui.initCardBgImg(is3D, scrollView_play); 
        MjClient.setui.view3DMenuChange(is3D,target.getParent());   
    },
 
    // 初始化/修改 背景选项内容
    initGameBgImg : function(is3D,scrollView_play){
        var imgList = MjClient.playui.getGameBgList(is3D);
        var nameList = MjClient.playui.getGameBgNameList(is3D);
        var list = [];
        for (var i = 0; i < 4; i++) {
            var name = "box_gameBg" + (i + 1);
            var item = scrollView_play.getChildByName(name);
            item.visible = (i < imgList.length);
            if(i >= imgList.length) continue; 
            list.push(item);

            item.getChildByName("img_bg").loadTexture(imgList[i]);
            var text = item.getChildByName("text");
            text.setString(nameList[i]);
            text.ignoreContentAdaptWithSize(true);
        }

        var callFunc = function(index){
            MjClient.playui.setGameBgType(index);
            postEvent("changeGameBgEvent");
        };

        var curGameBgType = MjClient.playui.getGameBgType();
        this._playNode_MJGameBg_radio = createRadioBoxForCheckBoxs(list, null, curGameBgType);
        this._playNode_MJGameBg_radio.setSelectCallBack(function(index, sender, nodeList){
            this._changeMenuColor(list, this._playNode_MJGameBg_radio, index);
            callFunc(index);
        }.bind(this));
        this._changeMenuColor(list, this._playNode_MJGameBg_radio, curGameBgType);

        // 文字和图片设置点击事件
        for (var i = 0; i < list.length; i++) {
            cc.eventManager.addListener(this.setTextClick(list, i, this._playNode_MJGameBg_radio, callFunc), list[i].getChildByName("img_bg") );
            cc.eventManager.addListener(this.setTextClick(list, i, this._playNode_MJGameBg_radio, callFunc), list[i].getChildByName("text") );
        }
    },

    // 初始化麻将风格选项
    initCardBgImg : function(is3D, scrollView_play){
        var cardBgList = MjClient.playui.getCardBgList(is3D);
        var cardBgNameList = MjClient.playui.getCardBgNameList(is3D);
        var cardFront = MjClient.playui.getCardFrontList(is3D);
        var list = [];
        for (var i = 0; i < 4; i++) {
            var name = "box_cardBg" + (i + 1);
            var item = scrollView_play.getChildByName(name);
            item.visible = (i < cardBgList.length);
            // if(i >= cardBgList.length) continue; 
            list.push(item);

            item.getChildByName("img_bg").loadTexture(cardBgList[i] + "/Mj_up_4.png");
            item.getChildByName("img_bg").getChildByName("Image").loadTexture(cardFront[i] + "/Green.png");
            var text = item.getChildByName("text");
            text.setString(cardBgNameList[i] || "");
            text.ignoreContentAdaptWithSize(true);
        }

        var callFunc = function(index){
            MjClient.playui.setMaJiangBgType(index);
            postEvent("changeMJBgEvent", index);
        };

        var type = MjClient.playui.getMaJiangBgType(); 
        
        if(!this._playNode_MJCardBg_radio){
            this._playNode_MJCardBg_radio = createRadioBoxForCheckBoxs(list,null,type);
            this._playNode_MJCardBg_radio.setSelectCallBack(function(index, sender, nodeList){ 
                this._changeMenuColor(list, this._playNode_MJCardBg_radio, index);
                callFunc(index);
            }.bind(this));
            this._changeMenuColor(list, this._playNode_MJCardBg_radio, type); 
        }else{
            this._playNode_MJCardBg_radio.selectItem(type || 0);
            return;
        }

        
        // 文字和图片设置点击事件
        for (var i = 0; i < list.length; i++) {
            cc.eventManager.addListener(this.setTextClick(list, i, this._playNode_MJCardBg_radio, callFunc), list[i].getChildByName("img_bg") );
            cc.eventManager.addListener(this.setTextClick(list, i, this._playNode_MJCardBg_radio, callFunc), list[i].getChildByName("text") );
        }
    },

    // 初始化普通话，本地话，长沙话 选项
    initVoiceMenu : function(layout_function){
        var nameList = MjClient.playui.getVoiceNameList();
        var node_voice = layout_function.getChildByName("node_voice");
        var list = [];
        for (var i = 0; i < 3; i++) {
            var box = node_voice.getChildByName("box_voice" + (i + 1));
            box.visible = i < nameList.length; 
            if(i >= nameList.length) continue;
            list.push(box);
            var text = box.getChildByName("text");
            text.ignoreContentAdaptWithSize(true);
            text.setString(nameList[i]);
        }

        var callFunc = function(index){
            MjClient.playui.setVoiceType(index);
            if (index == 0)
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyin_Putonghua", {uid:SelfUid()});
            else
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyin_Bendihua", {uid:SelfUid()});
        };

        var voiceType = MjClient.playui.getVoiceType();
        this._playNode_VoiceMenu_radio = createRadioBoxForCheckBoxs(list, null, voiceType);
        this._playNode_VoiceMenu_radio.setSelectCallBack(function(index, sender, nodeList){
            this._changeMenuColor(list, this._playNode_VoiceMenu_radio, index); 
            callFunc(index);
        }.bind(this));
        this._changeMenuColor(list, this._playNode_VoiceMenu_radio, voiceType);

        // 文字和图片设置点击事件
        for (var i = 0; i < list.length; i++) {
            cc.eventManager.addListener(this.setTextClick(list, i, this._playNode_VoiceMenu_radio, callFunc), list[i].getChildByName("text") );
        }
    },

    // 特效开关
    initShowEffectMenu : function(layout_function){ 
        var node_showEffect = layout_function.getChildByName("node_showEffect");
        var list = [];
        list.push(node_showEffect.getChildByName("box_texiao1"));
        list.push(node_showEffect.getChildByName("box_texiao2"));

        var callFunc = function(index){
            MjClient.playui.set3DTeXiaoType(index);
            MjClient.Game3DTexiao = index;
        };

        var effectType = MjClient.playui.get3DTeXiaoType();
        this._playNode_EffectMenu_radio = createRadioBoxForCheckBoxs(list, null, effectType);
        this._playNode_EffectMenu_radio.setSelectCallBack(function(index, sender, nodeList){ 
            this._changeMenuColor(list, this._playNode_EffectMenu_radio, index);
            callFunc(index);
            postEvent(MjClient.playui.PlayEventType.SET_EATBTN_TEXIAO); // 设置麻将的吃碰杠按钮特效
        }.bind(this));
        this._changeMenuColor(list, this._playNode_EffectMenu_radio, effectType);

        for (var i = 0; i < list.length; i++) {
            cc.eventManager.addListener(this.setTextClick(list, i, this._playNode_EffectMenu_radio, callFunc), list[i].getChildByName("text") );
        }
    },

    // 大小按钮控制
    initHandCardSizeMenu : function(layout_function){
        var node_handSize = layout_function.getChildByName("node_handSize");
        var list = [];
        for(var i = 1; true; i++){
            var child = node_handSize.getChildByName("box_cardSize" + i);
            if(!child) break;
            list.push(child);
        }

        var callFunc = function(index){
            MjClient.playui.setCardSizeType(index); 
            postEvent("switch2Dor3D",{is3D: COMMON_UI3D.getIs3DFromLocalStorage()});
            if(index == 0)
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Shoupaidaxiao_Xiao", {uid: SelfUid()});
            else
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Shoupaidaxiao_Da", {uid: SelfUid()});
        };

        var sizeType = MjClient.playui.getCardSizeType();
        this._playNode_HandSize_radio = createRadioBoxForCheckBoxs(list, null, sizeType);
        this._playNode_HandSize_radio.setSelectCallBack(function(index, sender, nodeList){ 
            this._changeMenuColor(list, this._playNode_HandSize_radio, index);
            callFunc(index);
        }.bind(this));
        this._changeMenuColor(list, this._playNode_HandSize_radio, sizeType);

        for (var i = 0; i < list.length; i++) {
            cc.eventManager.addListener(this.setTextClick(list, i, this._playNode_HandSize_radio, callFunc), list[i].getChildByName("text") );
        }
    },
    // 选视图3d/2d 的效果切换
    view3DMenuChange : function(is3D,temp){
        if(is3D){
            temp.getChildByName("btn_3D").loadTextureNormal("setting/setting_new/3D_s.png");
            temp.getChildByName("btn_2D").loadTextureNormal("setting/setting_new/2D_n.png");
        }else{
            temp.getChildByName("btn_3D").loadTextureNormal("setting/setting_new/3D_n.png");
            temp.getChildByName("btn_2D").loadTextureNormal("setting/setting_new/2D_s.png");
        }
    },
    _boxMusicUpdate : function(node,name){ 
        // var value = node.isSelected() ? 0.5 : -1
        // if(name == "soundSpeak"){
        //     MjClient.playui.setSpeakVolume(value);
        // }else if(name == "soundEffect"){
        //     MjClient.playui.setEffectVolume(value);
        // }else if(name == "soundMusic"){
        //     MjClient.playui.setMusicVolume(value);
        // }  
        // var slider_music = node.getParent().getChildByName("slider_music");
        // slider_music.setPercent(50);
    }, 
    // 被选中或者取消选择更换颜色
    _changeMenuColor : function(listnode,radio,number){
        if(!listnode) return;
        for (var i = 0; i < listnode.length; i++) {
            if (i==number) {
                listnode[i].setSelected(true); 
                radio.selectItem(i);
                listnode[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_1);
            }else{
                listnode[i].setSelected(false);
                listnode[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_2);
            } 
        }
    },

    //点击范围扩大 使得文字也能点击
    setTextClick:function (listnode, number, radio, callBack) {   
        var that = this;
        var callBack = callBack || function(){};
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
                    that._changeMenuColor(listnode,radio,number);
                }else{
                    // 如果触碰起始地点在本区域中
                    if(!cc.rectContainsPoint(target.getBoundingBox(), pos))
                        return;
                    target.parent.setSelected(!target.parent.isSelected());
                }
                callBack(number, target.parent);
            }
        });       
    },

    initSoundEvent : function(temp,name,umenName){
        //this,"oldMusicVolume",Zhujiemian_Shezhi_Yinyuekaiguan
        var tempData = util.localStorageEncrypt.getNumberItem(name, 0.5);   
        temp.setSelected(tempData <= 0); 
        var slider = temp.getParent().getChildByName("slider_music");
        temp.addEventListener(function(sender, type) {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    MjClient.native.umengEvent4CountWithProperty("umenName", {
                        uid: SelfUid()
                    });
                    temp.setSelected(true);
                    slider.setPercent(0);
                    
                    if(name == MjClient.KEY_MJ_MUSIC_VOLUME){
                        // 背景音乐是实时的
                        MjClient.playui.setMusicVolume(0);
                    }else{
                        util.localStorageEncrypt.setNumberItem(name, 0);
                    }

                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    MjClient.native.umengEvent4CountWithProperty("umenName", {
                        uid: SelfUid()
                    });
                    
                    if(name == MjClient.KEY_MJ_MUSIC_VOLUME){
                        // 背景音乐是实时的
                        MjClient.playui.setMusicVolume(0.5);
                    }else{
                        util.localStorageEncrypt.setNumberItem(name, 0.5);
                    }

                    var v = util.localStorageEncrypt.getNumberItem(name, 0);
                    temp.setSelected(false);
                    slider.setPercent(v * 100);

                    break;
            }
        }, temp);
    }
});