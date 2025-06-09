/***
 * 淮安App，通用设置界面
 * @type {void | Class | *}
 */
var majiang_settingPanel_huaian = setting_maJiang.extend({

    jsBind:{
        back:{
            layout_function:{
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
                                    btn.getParent().loadTexture("setting/cr_check_bg.png");
                                    btn.setTextColor(COLOR.SETTNG_COLOR_2);
                                    MjClient.playui.setPutCardScaleConfig(false);
                                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Dongxiao_Chupaifangda_Quxiaoxuanzhong", {uid: SelfUid(),gameType:MjClient.gameType});
                                }else {
                                    btn.getParent().loadTexture("setting/createroom_check.png");
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
                            this.loadTexture("setting/createroom_check.png");
                            this.getChildByName("text_outEnlarge").setTextColor(COLOR.SETTNG_COLOR_1);
                        }else{
                            this.loadTexture("setting/cr_check_bg.png");
                            this.getChildByName("text_outEnlarge").setTextColor(COLOR.SETTNG_COLOR_2);
                        }
                    },
                    _click: function(sender, eventType) {
                        if(eventType === ccui.Widget.TOUCH_ENDED){
                            var isOutEnlarge = MjClient.playui.getPutCardScaleConfig();
                            if(isOutEnlarge){
                                sender.loadTexture("setting/cr_check_bg.png");
                                sender.getChildByName("text_outEnlarge").setTextColor(COLOR.SETTNG_COLOR_2);
                                MjClient.playui.setPutCardScaleConfig(false);
                            }else {
                                sender.loadTexture("setting/createroom_check.png");
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
                                    btn.getParent().loadTexture("setting/cr_check_bg.png");
                                    btn.setTextColor(COLOR.SETTNG_COLOR_2);
                                    MjClient.playui.setInsertCardAniConfig(false);
                                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Dongxiao_Chapaidonghua_Quxiaoxuanzhong", {uid: SelfUid(),gameType:MjClient.gameType});
                                }else {
                                    btn.getParent().loadTexture("setting/createroom_check.png");
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
                            this.loadTexture("setting/createroom_check.png");
                            this.getChildByName("text_insertCardAni").setTextColor(COLOR.SETTNG_COLOR_1);
                        }else{
                            this.loadTexture("setting/cr_check_bg.png");
                            this.getChildByName("text_insertCardAni").setTextColor(COLOR.SETTNG_COLOR_2);
                        }
                    },
                    _click: function(sender, eventType) {
                        if(eventType === ccui.Widget.TOUCH_ENDED){
                            var isInsertCardAni = MjClient.playui.getInsertCardAniConfig();
                            if(isInsertCardAni){
                                sender.loadTexture("setting/cr_check_bg.png");
                                sender.getChildByName("text_insertCardAni").setTextColor(COLOR.SETTNG_COLOR_2);
                                MjClient.playui.setInsertCardAniConfig(false);
                            }else {
                                sender.loadTexture("setting/createroom_check.png");
                                sender.getChildByName("text_insertCardAni").setTextColor(COLOR.SETTNG_COLOR_1);
                                MjClient.playui.setInsertCardAniConfig(true);
                            }
                        }
                    }
                },
            }
        }
    },

    ctor: function(){
        this._super();
    }
});