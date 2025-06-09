
// 汨罗红字
 
MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT  = "KEY_ZI_PAI_PLAY_UI_LAYOUT";   //字牌布局
MjClient.KEY_ZI_PAI_GAME_BG_TYPE  = "KEY_ZI_PAI_GAME_BG_TYPE";   //字牌游戏背景类型
MjClient.KEY_ZI_PAI_ZI_PAI_TYPE  = "KEY_ZI_PAI_ZI_PAI_TYPE";   //字牌游戏字体类型
MjClient.KEY_ZI_PAI_HAND_SIZE_TYPE  = "KEY_ZI_PAI_HAND_SIZE_TYPE";   //字牌游戏字体大小类型
MjClient.KEY_ZI_PAI_FAST_EAT_TYPE  = "KEY_ZI_PAI_FAST_EAT_TYPE";   //字牌游戏快速吃牌类型
MjClient.KEY_ZI_PAI_HU_XI_TYPE  = "KEY_ZI_PAI_HU_XI_TYPE";   //字牌游戏 显示胡息
MjClient.KEY_ZI_PAI_XU_XIAN_TYPE  = "KEY_ZI_PAI_XU_XIAN_TYPE";   //字牌游戏 虚线位置
MjClient.KEY_ZI_PAI_SU_DU_TYPE  = "KEY_ZI_PAI_SU_DU_TYPE";   //字牌游戏 动画速度 
MjClient.KEY_ZI_PAI_CARD_SIZE = "KEY_ZI_PAI_CARD_SIZE"; // 字牌大小
MjClient.KEY_ZI_PAI_VOICE_TYPE = "KEY_ZI_PAI_VOICE_TYPE"; // 字牌游戏语音
MjClient.KEY_ZI_PAI_PLAY_TING_PAI  = "KEY_ZI_PAI_PLAY_TING_PAI";   //听牌提示
MjClient.KEY_ZI_PAI_HU_XI_TYPE  = "KEY_ZI_PAI_HU_XI_TYPE";   //胡息显示
MjClient.KEY_ZI_PAI_CHU_PAI_TYPE  = "KEY_ZI_PAI_CHU_PAI_TYPE";   //字牌游戏 出牌按钮
MjClient.KEY_ZI_PAI_TING_PAI_TYPE  = "KEY_ZI_PAI_TING_PAI_TYPE";   //字牌游戏 听牌开关
MjClient.KEY_ZI_PAI_DOUBLE_CLICK_TYPE  = "KEY_ZI_PAI_DOUBLE_CLICK_TYPE";   //字牌游戏 双击出牌
/*fix保存游戏背景bug
由于外部一键换肤可能会在不调用ctor的情况下调用设置游戏背景接口，所以会导致各玩法字段依然没有区分
所以直接先提出来
*/
 
var ziPai = ziPai || {};
ziPai.acTime = 0.2; //字牌动画 正常速度

ziPai.isYongZhouProject = function(){
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
    {
        return true;
    }
    return false;
};

ziPai.initZiPaiData = function(){
    if(MjClient.gameType == MjClient.XIANG_YIN_ZHUO_HONG_ZI ){
        MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT  = "KEY_ZI_PAI_PLAY_UI_LAYOUT_XY";   //字牌布局
        MjClient.KEY_ZI_PAI_GAME_BG_TYPE  = "KEY_ZI_PAI_GAME_BG_TYPE_XY";   //字牌游戏背景类型
        MjClient.KEY_ZI_PAI_ZI_PAI_TYPE  = "KEY_ZI_PAI_ZI_PAI_TYPE_XY";   //字牌游戏字体类型
        MjClient.KEY_ZI_PAI_HAND_SIZE_TYPE  = "KEY_ZI_PAI_HAND_SIZE_TYPE_XY";   //字牌游戏字体大小类型
        MjClient.KEY_ZI_PAI_FAST_EAT_TYPE  = "KEY_ZI_PAI_FAST_EAT_TYPE_XY";   //字牌游戏快速吃牌类型
        MjClient.KEY_ZI_PAI_HU_XI_TYPE  = "KEY_ZI_PAI_HU_XI_TYPE_XY";   //字牌游戏 显示胡息
        MjClient.KEY_ZI_PAI_XU_XIAN_TYPE  = "KEY_ZI_PAI_XU_XIAN_TYPE_XY";   //字牌游戏 虚线位置
        MjClient.KEY_ZI_PAI_SU_DU_TYPE  = "KEY_ZI_PAI_SU_DU_TYPE_XY";   //字牌游戏 动画速度 
        MjClient.KEY_ZI_PAI_CARD_SIZE = "KEY_ZI_PAI_CARD_SIZE_XY"; // 字牌大小
        MjClient.KEY_ZI_PAI_VOICE_TYPE = "KEY_voiceType_HongZi_XY"; // 红字
    }else if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI){
        MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT  = "KEY_ZI_PAI_PLAY_UI_LAYOUT_YUE_YANG_WAI_HU_ZI";   //字牌布局
        MjClient.KEY_ZI_PAI_GAME_BG_TYPE  = "KEY_ZI_PAI_GAME_BG_TYPE_YUE_YANG_WAI_HU_ZI";   //字牌游戏背景类型
        MjClient.KEY_ZI_PAI_ZI_PAI_TYPE  = "KEY_ZI_PAI_ZI_PAI_TYPE_YUE_YANG_WAI_HU_ZI";   //字牌类型
        MjClient.KEY_ZI_PAI_SU_DU_TYPE  = "KEY_ZI_PAI_SU_DU_TYPE_YUE_YANG_WAI_HU_ZI";   //字牌游戏 动画速度
        MjClient.KEY_ZI_PAI_PLAY_TING_PAI  = "KEY_ZI_PAI_PLAY_TING_PAI_YUE_YANG_WAI_HU_ZI";   //听牌提示
        MjClient.KEY_ZI_PAI_VOICE_TYPE = "KEY_ZI_PAI_VOICE_TYPE_YUE_YANG_WAI_HU_ZI"; // 字牌游戏语音
        MjClient.KEY_ZI_PAI_CARD_SIZE = "KEY_ZI_PAI_CARD_SIZE_YUE_YANG_WAI_HU_ZI"; // 字牌大小
        MjClient.KEY_ZI_PAI_CHU_PAI_GUIDE = "KEY_ZI_PAI_CHU_PAI_GUIDE_YUE_YANG_WAI_HU_ZI"; // 出牌提示
    }else if(MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI){
        MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT  = "KEY_ZI_PAI_PLAY_UI_LAYOUT_AN_HUA_PAO_HU_ZI";   //字牌布局
        MjClient.KEY_ZI_PAI_GAME_BG_TYPE  = "KEY_ZI_PAI_GAME_BG_TYPE_AN_HUA_PAO_HU_ZI";   //字牌游戏背景类型
        MjClient.KEY_ZI_PAI_ZI_PAI_TYPE  = "KEY_ZI_PAI_ZI_PAI_TYPE_AN_HUA_PAO_HU_ZI";   //字牌类型
        MjClient.KEY_ZI_PAI_SU_DU_TYPE  = "KEY_ZI_PAI_SU_DU_TYPE_AN_HUA_PAO_HU_ZI";   //字牌游戏 动画速度
        MjClient.KEY_ZI_PAI_PLAY_TING_PAI  = "KEY_ZI_PAI_PLAY_TING_PAI_AN_HUA_PAO_HU_ZI";   //听牌提示
        MjClient.KEY_ZI_PAI_VOICE_TYPE = "KEY_ZI_PAI_VOICE_TYPE_AN_HUA_PAO_HU_ZI"; // 字牌游戏语音
        MjClient.KEY_ZI_PAI_CARD_SIZE = "KEY_ZI_PAI_CARD_SIZE_AN_HUA_PAO_HU_ZI"; // 字牌大小
    }else if(MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI){
        MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT  = "KEY_ZI_PAI_PLAY_UI_LAYOUT_CHEN_ZHOU_ZI_PAI";   //字牌布局
        MjClient.KEY_ZI_PAI_GAME_BG_TYPE  = "KEY_ZI_PAI_GAME_BG_TYPE_CHEN_ZHOU_ZI_PAI";   //字牌游戏背景类型
        MjClient.KEY_ZI_PAI_ZI_PAI_TYPE  = "KEY_ZI_PAI_ZI_PAI_TYPE_CHEN_ZHOU_ZI_PAI";   //字牌类型
        MjClient.KEY_ZI_PAI_SU_DU_TYPE  = "KEY_ZI_PAI_SU_DU_TYPE_CHEN_ZHOU_ZI_PAI";   //字牌游戏 动画速度
        MjClient.KEY_ZI_PAI_PLAY_TING_PAI  = "KEY_ZI_PAI_PLAY_TING_PAI_CHEN_ZHOU_ZI_PAI";   //听牌提示
        MjClient.KEY_ZI_PAI_VOICE_TYPE = "KEY_ZI_PAI_VOICE_TYPE_CHEN_ZHOU_ZI_PAI"; // 字牌游戏语音
        MjClient.KEY_ZI_PAI_CHU_PAI_TYPE = "KEY_ZI_PAI_CHU_PAI_CHEN_ZHOU_ZI_PAI"; // 字牌出牌按钮
        MjClient.KEY_ZI_PAI_CARD_SIZE = "KEY_ZI_PAI_CARD_SIZE_CHEN_ZHOU_ZI_PAI"; // 字牌大小
    }else if(MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI){
        MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT  = "KEY_ZI_PAI_PLAY_UI_LAYOUT_GUI_YANG_ZI_PAI";   //字牌布局
        MjClient.KEY_ZI_PAI_GAME_BG_TYPE  = "KEY_ZI_PAI_GAME_BG_TYPE_GUI_YANG_ZI_PAI";   //字牌游戏背景类型
        MjClient.KEY_ZI_PAI_ZI_PAI_TYPE  = "KEY_ZI_PAI_ZI_PAI_TYPE_GUI_YANG_ZI_PAI";   //字牌类型
        MjClient.KEY_ZI_PAI_SU_DU_TYPE  = "KEY_ZI_PAI_SU_DU_TYPE_GUI_YANG_ZI_PAI";   //字牌游戏 动画速度
        MjClient.KEY_ZI_PAI_PLAY_TING_PAI  = "KEY_ZI_PAI_PLAY_TING_PAI_GUI_YANG_ZI_PAI";   //听牌提示
        MjClient.KEY_ZI_PAI_VOICE_TYPE = "KEY_ZI_PAI_VOICE_TYPE_GUI_YANG_ZI_PAI"; // 字牌游戏语音
        MjClient.KEY_ZI_PAI_CHU_PAI_TYPE = "KEY_ZI_PAI_CHU_PAI_GUI_YANG_ZI_PAI"; // 字牌出牌按钮
        MjClient.KEY_ZI_PAI_CARD_SIZE = "KEY_ZI_PAI_CARD_SIZE_GUI_YANG_ZI_PAI"; // 字牌大小
    }else if(MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI){
        MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT  = "KEY_ZI_PAI_PLAY_UI_LAYOUT_NING_XIANG_ZI_PAI";   //字牌布局
        MjClient.KEY_ZI_PAI_GAME_BG_TYPE  = "KEY_ZI_PAI_GAME_BG_TYPE_NING_XIANG_ZI_PAI";   //字牌游戏背景类型
        MjClient.KEY_ZI_PAI_ZI_PAI_TYPE  = "KEY_ZI_PAI_ZI_PAI_TYPE_NING_XIANG_ZI_PAI";   //字牌类型
        MjClient.KEY_ZI_PAI_SU_DU_TYPE  = "KEY_ZI_PAI_SU_DU_TYPE_NING_XIANG_ZI_PAI";   //字牌游戏 动画速度
        MjClient.KEY_ZI_PAI_PLAY_TING_PAI  = "KEY_ZI_PAI_PLAY_TING_PAI_NING_XIANG_ZI_PAI";   //听牌提示
        MjClient.KEY_ZI_PAI_VOICE_TYPE = "KEY_ZI_PAI_VOICE_TYPE_NING_XIANG_ZI_PAI"; // 字牌游戏语音
        MjClient.KEY_ZI_PAI_CARD_SIZE = "KEY_ZI_PAI_CARD_SIZE_NING_XIANG_ZI_PAI"; // 字牌大小
    }else if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
        MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG){
        MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT  = "KEY_ZI_PAI_PLAY_UI_LAYOUT_FLS";   //字牌布局
        MjClient.KEY_ZI_PAI_GAME_BG_TYPE  = "KEY_ZI_PAI_GAME_BG_TYPE_FLS";   //字牌游戏背景类型
        MjClient.KEY_ZI_PAI_ZI_PAI_TYPE  = "KEY_ZI_PAI_ZI_PAI_TYPE_FLS";   //字牌游戏字体类型
        MjClient.KEY_ZI_PAI_HAND_SIZE_TYPE  = "KEY_ZI_PAI_HAND_SIZE_TYPE_FLS";   //字牌游戏字体大小类型
        MjClient.KEY_ZI_PAI_FAST_EAT_TYPE  = "KEY_ZI_PAI_FAST_EAT_TYPE_FLS";   //字牌游戏快速吃牌类型
        MjClient.KEY_ZI_PAI_HU_XI_TYPE  = "KEY_ZI_PAI_HU_XI_TYPE_FLS";   //字牌游戏 显示胡息
        MjClient.KEY_ZI_PAI_XU_XIAN_TYPE  = "KEY_ZI_PAI_XU_XIAN_TYPE_FLS";   //字牌游戏 虚线位置
        MjClient.KEY_ZI_PAI_SU_DU_TYPE  = "KEY_ZI_PAI_SU_DU_TYPE_FLS";   //字牌游戏 动画速度 
        MjClient.KEY_ZI_PAI_CARD_SIZE = "KEY_ZI_PAI_CARD_SIZE_FLS"; // 字牌大小
        MjClient.KEY_ZI_PAI_VOICE_TYPE = "KEY_voiceType_HongZi_FLS"; // 红字
    }else if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU){
        MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT  = "KEY_ZI_PAI_PLAY_UI_LAYOUT_YANG_PENG_HU";   //字牌布局
        MjClient.KEY_ZI_PAI_GAME_BG_TYPE  = "KEY_ZI_PAI_GAME_BG_TYPE_YANG_PENG_HU";   //字牌游戏背景类型
        MjClient.KEY_ZI_PAI_ZI_PAI_TYPE  = "KEY_ZI_PAI_ZI_PAI_TYPE_YANG_PENG_HU";   //字牌类型
        MjClient.KEY_ZI_PAI_SU_DU_TYPE  = "KEY_ZI_PAI_SU_DU_TYPE_YANG_PENG_HU";   //字牌游戏 动画速度
        MjClient.KEY_ZI_PAI_PLAY_TING_PAI  = "KEY_ZI_PAI_PLAY_TING_PAI_YANG_PENG_HU";   //听牌提示
        MjClient.KEY_ZI_PAI_CARD_SIZE = "KEY_ZI_PAI_CARD_SIZE_YUE_YANG_PENG_HU"; // 字牌大小
    }else if(MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG){
        MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT  = "KEY_ZI_PAI_PLAY_UI_LAYOUT_HY_LIU_HU_QIANG";   //字牌布局
        MjClient.KEY_ZI_PAI_GAME_BG_TYPE  = "KEY_ZI_PAI_GAME_BG_TYPE_HY_LIU_HU_QIANG";   //字牌游戏背景类型
        MjClient.KEY_ZI_PAI_ZI_PAI_TYPE  = "KEY_ZI_PAI_ZI_PAI_TYPE_HY_LIU_HU_QIANG";   //字牌类型
        MjClient.KEY_ZI_PAI_SU_DU_TYPE  = "KEY_ZI_PAI_SU_DU_TYPE_HY_LIU_HU_QIANG";   //字牌游戏 动画速度
        MjClient.KEY_ZI_PAI_PLAY_TING_PAI  = "KEY_ZI_PAI_PLAY_TING_PAI_HY_LIU_HU_QIANG";   //听牌提示
        MjClient.KEY_ZI_PAI_CARD_SIZE = "KEY_ZI_PAI_CARD_SIZE_HY_LIU_HU_QIAN"; // 字牌大小
    }else if(MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ){
        MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT  = "KEY_ZI_PAI_PLAY_UI_LAYOUT_ZP_LY_CHZ";   //字牌布局
        MjClient.KEY_ZI_PAI_GAME_BG_TYPE  = "KEY_ZI_PAI_GAME_BG_TYPE_ZP_LY_CHZ";   //字牌游戏背景类型
        MjClient.KEY_ZI_PAI_ZI_PAI_TYPE  = "KEY_ZI_PAI_ZI_PAI_TYPE_ZP_LY_CHZ";   //字牌类型
        MjClient.KEY_ZI_PAI_SU_DU_TYPE  = "KEY_ZI_PAI_SU_DU_TYPE_ZP_LY_CHZ";   //字牌游戏 动画速度
        MjClient.KEY_ZI_PAI_PLAY_TING_PAI  = "KEY_ZI_PAI_PLAY_TING_PAI_ZP_LY_CHZ";   //听牌提示
        MjClient.KEY_ZI_PAI_CARD_SIZE = "KEY_ZI_PAI_CARD_SIZE_ZP_LY_CHZ"; // 字牌大小
    }else if(ziPai.isYongZhouProject()){
        MjClient.KEY_ZI_PAI_VOICE_TYPE = "_VOICE_TYPE"; // 字牌游戏语音
    }
    else{
        MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT = MjClient.gameType + "_KEY_ZI_PAI_PLAY_UI_LAYOUT";   //字牌布局
        MjClient.KEY_ZI_PAI_GAME_BG_TYPE = MjClient.gameType + "_KEY_ZI_PAI_GAME_BG_TYPE";   //字牌游戏背景类型
        MjClient.KEY_ZI_PAI_ZI_PAI_TYPE = MjClient.gameType + "_KEY_ZI_PAI_ZI_PAI_TYPE";   //字牌游戏字体类型
        MjClient.KEY_ZI_PAI_VOICE_TYPE = MjClient.gameType + "_KEY_ZI_PAI_VOICE_TYPE"; // 字牌游戏语音
        
        MjClient.KEY_ZI_PAI_FAST_EAT_TYPE = MjClient.gameType + "_KEY_ZI_PAI_FAST_EAT_TYPE";   //字牌游戏快速吃牌类型
        MjClient.KEY_ZI_PAI_XU_XIAN_TYPE = MjClient.gameType + "_KEY_ZI_PAI_XU_XIAN_TYPE";   //字牌游戏 虚线位置
        MjClient.KEY_ZI_PAI_SU_DU_TYPE = MjClient.gameType + "_KEY_ZI_PAI_SU_DU_TYPE";   //字牌游戏 动画速度
        MjClient.KEY_ZI_PAI_CARD_SIZE = MjClient.gameType + "_KEY_ZI_PAI_CARD_SIZE"; // 字牌大小
        MjClient.KEY_ZI_PAI_PLAY_TING_PAI = MjClient.gameType + "_KEY_ZI_PAI_PLAY_TING_PAI";   //听牌提示
        MjClient.KEY_ZI_PAI_HU_XI_TYPE = MjClient.gameType + "_KEY_ZI_PAI_HU_XI_TYPE";   //胡息显示
        MjClient.KEY_ZI_PAI_CHU_PAI_TYPE = MjClient.gameType + "_KEY_ZI_PAI_CHU_PAI_TYPE";   //字牌出牌按钮
        MjClient.KEY_ZI_PAI_CHU_PAI_GUIDE = MjClient.gameType + "_KEY_ZI_PAI_CHU_PAI_GUIDE";   //字牌出牌提示
    }
}

ziPai.getAutoPassTime = function(){
    var t = 0.9; //标准
    var type = ziPai.getSuDuType();
    if(type == 0){
        //慢
        t = 1.1;
    }else if(type == 1){
        //标准
        t = 0.9;
    }else{
        //快
        t = 0.7;
    }
    return t;
}
// 是否可以双击出牌
ziPai.getDoubleClickType = function(){
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_DOUBLE_CLICK_TYPE, 1);
}

//获取字牌布局
ziPai.getUiLayoutType = function(){
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ){
        return 1;
    }
    if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
        MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710) {
        return 1;
    }
    var defValue = 1;
    if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || 
        MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA || 
        MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ ||
        MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710||
        MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ
    ){
        defValue = 0;
    }
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT, defValue);
}

ziPai.getVoiceType = function()
{
    var defValue = 0;
    //默认本地话
    if(MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
        MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI ||
        MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI){
        defValue = 1;
    }

    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_VOICE_TYPE, defValue);
}

//游戏背景
ziPai.getGameBgType = function() {
    //trace();
    if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI){
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE, 2);
    }else if (MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
        MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI || 
        MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || 
        MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
        MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ ||
        MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710
        ){
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE, 2);
    }else if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU){
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE, 0);
    }else if(MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI){
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE, 1);
    }

    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE, 0);
}
//一键换肤
ziPai.setCurrentGameBgTypeToNext = function()
{
    if (!MjClient.playui || typeof(GameClass[MjClient.gameType]) == "undefined")
        return;

    var max = 4;
    for (; max > 0; max --)
    {
        if (getGameBgFile(max) != "")
            break;
    }

    var current = ziPai.getGameBgType();
    if (current < max)
        current ++;
    else
        current = 0;
 
    util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE, current);
}

//字牌字体
ziPai.getZiPaiType = function() { 
    if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI){
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, 2);
    }
    //安化默认选择第二套字牌字体
    else if(MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
        MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI ||
        MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710 ||
        MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI
        ){
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, 1);
    }
    //宁乡跑胡子 默认第二套
    else if(MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI){
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, 1);
    }else if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
        MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG) {
        return 0;  //福禄寿不读本地记录
    }else if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI){
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, 1);
    }else if(MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI){
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, 1);
    }else if(MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI){
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, 0);
    }else if(this.isYongZhouProject())
    {
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, 2);
    }else{
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, 1);
    } 
}

ziPai.getChuPaiType = function()
{
    //汉寿没有出牌按钮 可能后续需要 先预留 这里直接返回1(关闭)
    if (MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI){
        return 1;
    }
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_CHU_PAI_TYPE, 0);
}

ziPai.getChuPaiGuide = function()
{
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_CHU_PAI_GUIDE, 0);
}


//
// //字牌大小
// ziPai.getHandSizeType = function() {
//     if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU) {
//         return 0;
//     }
//     else {
//         return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_HAND_SIZE_TYPE, 0);
//     }
// }
//字牌大小
ziPai.getHandSizeType = function() {
    var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_HAND_SIZE_TYPE, 0);
    if(type != 0 && type != 1 && type != 2){
        type = 0;
    }
    return type;
}
// 是否可以双击出牌
ziPai.getDoubleClickType = function(){
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_DOUBLE_CLICK_TYPE, 1);
}
//快速吃牌
ziPai.getHasFastEat = function() {
    if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
        MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG) {
        return 0;
    }
    if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI){
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_FAST_EAT_TYPE, 1);
    }
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_FAST_EAT_TYPE, 0);
}

//显示胡息 多余 后面弃用
ziPai.getHasHuXi = function() {
    if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
        MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG) {
        return 1;  //默认显示胡息
    }
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_HU_XI_TYPE, 0);
}

//出牌虚线
ziPai.getXuXianType = function() {
    if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
        MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG) {
        return 0;
    }
    var typeIndex = 0;
    if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
        typeIndex = 1; //邵阳默认高
    }
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_XU_XIAN_TYPE, typeIndex);
}

//出牌速度
ziPai.getSuDuType = function() {
    /*
    if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU) {
        return 0;
    }

    var defValue = 0;
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_SU_DU_TYPE, defValue);
    */
    var defValue = 0;
    if(this.isYongZhouProject())
    {
        defValue = 1;
        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
            defValue = 2;//默认快
        }
    }
    if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI){
        defValue = 1;
    }
    var val = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_SU_DU_TYPE, defValue);
    if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
        MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG) {
        val = val > 1 ? 0 : val; 
    }

    return val;
};

// 是否显示听牌
ziPai.getTingPaiType = function(){ 
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_TING_PAI_TYPE, 1);
};

//手牌大小
ziPai.getCardSize = function() {
    if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
        MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG) {
        return 0;
    }
    var defValue = 0;

    //宁乡跑胡子 默认超大
    if(MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI) {
        defValue = 2;
    }

    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_CARD_SIZE, defValue);
}

//听牌提示
ziPai.getTingPai = function () {
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_PLAY_TING_PAI, 0);
}

//胡息显示
ziPai.getHuXiType = function() {
    // if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU) {
    //     return 1;  //默认显示胡息
    // }

    var defValue = 0;
    //郴州桂阳 安化 默认不显示胡息
    if(MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
        MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI ||
        MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG|| 
        MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
        MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ ||
        MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710 ||
        MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI||
        MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI||
        MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI){
        defValue = 1;
    }
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_HU_XI_TYPE, defValue);
}

ziPai.getCardTypes = function(){
    var ziPaiType = ["type1", "type2", "type3"];
    if (MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
        MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI || 
        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU || 
        MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || 
        MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
        MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ ||
        MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710
    ){
        ziPaiType = ["type1", "type5", "type3"];
    }else if (MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI){
        ziPaiType = ["type5", "type4", "type3"];
    }else if (MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI){
        ziPaiType = ["type3", "type2", "type1"];
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI
        || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI){
        ziPaiType = [];
    }else if (MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI){
        ziPaiType = ["type1", "type5", "type3"];
    }else if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA){
        ziPaiType = ["type1", "type4", "type3"];
    }

    return ziPaiType;
}

//字牌资源路径
ziPai.getCardFilePath = function(){
    var path = "playing/ziPai/";
    var handSizeType = ["big", "small", "super"];
    var ziPaiType = ziPai.getCardTypes();
    var handSize = ziPai.getCardSize();
    if(MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP &&
        MjClient.getAppType() != MjClient.APP_TYPE.QXLYQP &&
        MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP &&
        MjClient.getAppType() != MjClient.APP_TYPE.HUNANWANGWANG &&
        MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ &&
        MjClient.getAppType() != MjClient.APP_TYPE.QXXXGHZ)
    {
        //永州、邵阳、衡阳、耒阳、湘乡使用字段
        handSize = ziPai.getHandSizeType();
    }
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
        handSizeType = ["big", "small"];
        handSize = handSize > 1 ? 0 : handSize;
    }

    path += handSizeType[handSize];
    path += "/" + ziPaiType[ziPai.getZiPaiType()];
    path += "/";
    return path;
}

ziPai.getNewFilePath = function(oldFile, type){
    var ziPaiType = ziPai.getCardTypes();

    var newFile = "";
    for(var i = 0; i < ziPaiType.length; i++){
        if(oldFile.indexOf(ziPaiType[i]) != -1){
            newFile = oldFile.replace(ziPaiType[i], ziPaiType[type]);
            break;
        }
    }
    
    if (newFile != "" && !jsb.fileUtils.isFileExist(newFile)) {
        newFile = "";
    }

    return newFile != "" ? newFile : oldFile;
}

//布局手牌
ziPai.setWgtLayoutHandCard = function(handCard){
    var sizeType = ziPai.getZiPaiType();

    // cc.log("sizeType:", sizeType);

    // handCard.loadTexture(ziPai.getCardFilePath() + "hand1.png");
    // if (handCard.toString() == "[object ImageView]") {
        var oldFile = handCard.getRenderFile().file;
        var newFile = getNewMJBgFile_hongZi(oldFile, 1);

        if (newFile != oldFile) {
            handCard.loadTexture(newFile);
        }
    // }

    if (MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
        MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI  ||
        MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI || 
        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU || 
        MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || 
        MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
        MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ ||
        MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710 ||
        MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z ||
        MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO ||
        MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI ||
        this.isYongZhouProject()
    ){
        handCard.loadTexture(ziPai.getCardFilePath() + "hand1.png");
        sizeType = ziPai.getCardSize();
        if(this.isYongZhouProject())
        {
            sizeType = ziPai.getHandSizeType();
        }
        if (sizeType == 0) {
            setWgtLayout(handCard, [87 / 1280, 0], [0.27, 0.75], [0, 0]);
        } else if (sizeType == 1)  {
            setWgtLayout(handCard, [75 / 1280, 0], [0.27, 0.75], [0, 0]);
        } else {
            setWgtLayout(handCard, [95 / 1280, 0], [0.27, 0.75], [0, 0]);
        }
    }
    // // handCard.setScale(1);
    // if (sizeType == 0) {
    //     setWgtLayout(handCard, [0.08, 0], [0.27, 0.75], [0, 0]);
    // }else if(sizeType == 1){
    //     setWgtLayout(handCard, [0.1, 0], [0.27, 0.75], [0, 0]);
    // }else {
    //     setWgtLayout(handCard, [105 / 1280, 0], [0.27, 0.75], [0, 0]);
    // }
}

//布局出牌虚线
ziPai.setWgtLayoutCutLine = function(cutLine){
    var type = ziPai.getXuXianType();
    if(type == 0){
        setWgtLayout(cutLine,[1, 0.3], [0.5, 0.5], [0, -2]);
    }else{
        setWgtLayout(cutLine,[1, 0.3], [0.5, 0.6], [0, -2]);
    }
}

//获取设置里快慢时所对应的时间
ziPai.getAcTime = function(t){
    var acTime = t;
    var type = ziPai.getSuDuType();
    if(this.isYongZhouProject())
    {
        if(type == 0){
            //慢
            acTime = t * 1.2;
        }else if(type == 1){
            //标准
            acTime = t;
        }else if(type == 2){
            //快
            acTime = t * 0.8;
        }else{
            //急速
            acTime = t * 0.8 * 0.8;
        }
    } else {
        if(type == 0){
            //标准
            acTime = t;
        }else if(type == 1){
            //快
            acTime = t * 0.8;
        }else if(type == 2){
            //慢
            acTime = t * 1.2;
        }else{
            //极快
            acTime = t * 0.5;
        }
    }
    return acTime;
}

//更改动画执行时间
ziPai.changeAcTime = function(){
    var type = ziPai.getSuDuType();
    if(this.isYongZhouProject()){
        if(type == 0){
            //慢
            ziPai.acTime = 0.2 * 1.2;
        }else if(type == 1){
            //标准
            ziPai.acTime = 0.2;
        }else if(type == 2){
            //快
            ziPai.acTime = 0.2 * 0.8;
        }else{
            //急速
            ziPai.acTime = 0.16 * 0.8;
        }
    }else {
        if(type == 0){
            //标准
            ziPai.acTime = 0.2 * 0.8;
        }else{
            //快
            ziPai.acTime = 0.2 * 0.8;
        }
    }
}
ziPai.changeAcTime();
ziPai.showCardsHuXi = function(node){
    var tag = 180501;

    var type = ziPai.getHuXiType();
    if(type == 1){
        node.removeChildByTag(tag);
        return;
    }
    var cards = node.getChildren().slice();
    var len = cards.length;
    var arr = [];
    var w = 0;
    var scale = 1;
    for(var i = 0; i < len; i++){
        var c = cards[i];
        if(c.tag){
            arr.push(c.tag);
            w = c.width;
            scale = c.getScaleX();
        }
    }
    
    var txt = null;
    var sp = node.getChildByTag(tag); 
    if(!sp){
        sp = new cc.Sprite("gameTable/youxizhong-2_29.png");
        sp.setTag(tag);
        sp.setAnchorPoint(0.5,0);
        sp.setScaleX(scale);
        sp.setScaleY(scale);
        sp.x = w * scale * 0.5;
        node.addChild(sp, 100);
        var txt = new cc.LabelTTF("0胡息",MjClient.fzcyfont,25);
        txt.setTag(tag);
        sp.addChild(txt, 100);
        txt.x = sp.width * 0.5;
        txt.y = sp.height * 0.5;
    }else{
        txt = sp.getChildByTag(tag);
    }

    if(!MjClient.majiang.getRowHuxi_hand){
        var hx = MjClient.huzi.getRowHuxi_hand(arr, MjClient.data.sData.tData);
    }else{
        var hx = MjClient.majiang.getRowHuxi_hand(arr, MjClient.data.sData.tData);
    }
    
    hx += "胡息";
    txt.setString(hx);
    sp.hx = hx;
    sp.scheduleOnce(function(){
        txt = this.getChildByTag(tag);
        if(txt && cc.sys.isObjectValid(txt)){
            txt.removeFromParent(true);
        }
        if(true){
            var txt = new cc.LabelTTF("0胡息",MjClient.fzcyfont,25);
            txt.setTag(tag);
            this.addChild(txt, 100);
            txt.x = this.width * 0.5;
            txt.y = this.height * 0.5;
        }
        if(!MjClient.majiang.getRowHuxi_hand){
            var hx = MjClient.huzi.getRowHuxi_hand(arr, MjClient.data.sData.tData);
        }else{
            var hx = MjClient.majiang.getRowHuxi_hand(arr, MjClient.data.sData.tData);
        }
        hx += "胡息";
        txt.setString(hx);
    }.bind(sp),0.1);
}

ziPai.changePlayUILayoutCopyBySy = function(uiNode){
    var downNode  = uiNode.getChildByName("down");
    var rightNode = uiNode.getChildByName("right");
    var leftNode  = uiNode.getChildByName("left");
    var eat = uiNode.getChildByName("eat");
    var putSureBtn = downNode.getChildByName("put_sure_btn");

    MjClient.playui.EatVisibleCheck();

    var type = ziPai.getUiLayoutType();
    // 新UI离边的间距
    var des = 0.005;
    var ipxSpace = isIPhoneX() ? 0.04 : 0; //ipx 增加间距

    var eatNode = leftNode.getChildByName("eatNode");
    setWgtLayout(eatNode, [0.14, 0.14], [0.035, 0.74], [0, 0]);
    if(type == 0){
        if (putSureBtn){
            setWgtLayout(putSureBtn,  [0.185, 0.143], [0.75, 0.5], [0, 0]);
        }

        var put = downNode.getChildByName("put");
        setWgtLayout(put, [0.35, 0.35], [0.6, 0.6], [0.5, 0]);//按产品要求:出牌位置向右调整一点
        var userData = {scale:put.getScale(), pos:put.getPosition()};
        put.setUserData(userData);

        var outNode = downNode.getChildByName("outNode");
        setWgtLayout(outNode, [0.14, 0.14], [1 - des, des], [0, 0]);

        var outNode = leftNode.getChildByName("outNode");

        if(MjClient.data.sData.tData.maxPlayer == 2){
            setWgtLayout(outNode, [0.14, 0.14], [des + ipxSpace, 270/720], [0, 0]);
        }else{
            setWgtLayout(outNode, [0.14, 0.14], [des + ipxSpace, 320/720], [0, 0]);
        }

        var outNode = rightNode.getChildByName("outNode");
        if(MjClient.data.sData.tData.maxPlayer == 2){
            setWgtLayout(outNode, [0.14, 0.14], [1 - des, 270/720], [0, 0]);
        }else{
            setWgtLayout(outNode, [0.14, 0.14], [1 - des, 320/720], [0, 0]);
        }

        var eatNode = downNode.getChildByName("eatNode");
        var ipxPosY = isIPhoneX() ? 50 : 0;
        setWgtLayout(eatNode, [0.14, 0.14], [533/1280, (300 + ipxPosY)/720], [-0.2, 0]);//按产品要求:门牌位置向左调整一点
        if(MjClient.data.sData.tData.maxPlayer == 2){
            setWgtLayout(eatNode, [0.14, 0.14], [533/1280, (330 + ipxPosY)/720], [-0.2, 0]);//按产品要求:门牌位置向左调整一点);
        }
        var eatNode = leftNode.getChildByName("eatNode");
        setWgtLayout(eatNode, [0.14, 0.14], [des + ipxSpace, 0.82], [0, 0]);

        var eatNode = rightNode.getChildByName("eatNode");
        setWgtLayout(eatNode, [0.14, 0.14], [1-des, 0.82], [0, 0]);

        var chat_btn = uiNode.getChildByName("chat_btn");
        setWgtLayout(chat_btn, [chat_btn.width/1280, 0],[0.97, 0.187],[0, 0]);

        var voice_btn = uiNode.getChildByName("voice_btn");
        setWgtLayout(voice_btn, [43/1280, 0],[0.91, 0.1875],[0, 0]);

        var cancel = eat.getChildByName("cancel");
        setWgtLayout(cancel, [0, 0.16],[0.78, 0.3],[0, 1.12]);
    }else{
        if (putSureBtn){
            setWgtLayout(putSureBtn, [0.185, 0.143], [0.5, 0.5], [0, 0]);
        }

        var put = downNode.getChildByName("put");
        setWgtLayout(put, [0.35, 0.35], [0.6, 0.6], [0.5, 0]);  //按产品要求:传统布局出牌位置调整为和偏右一致
        var userData = {scale:put.getScale(), pos:put.getPosition()};
        put.setUserData(userData);

        var outNode = downNode.getChildByName("outNode");
        setWgtLayout(outNode, [0.14, 0.14], [1 - des, des], [0, 0]);

        var outNode = leftNode.getChildByName("outNode");
        setWgtLayout(outNode, [0.14, 0.14], [des + ipxSpace, 0.84], [0, 0]);

        var outNode = rightNode.getChildByName("outNode");
        if(MjClient.data.sData.tData.maxPlayer == 2){
            setWgtLayout(outNode, [0.14, 0.14], [1-des, 0.83], [0, 0]);
        }else{
            setWgtLayout(outNode, [0.14, 0.14], [1-des, 0.83], [0, 0]);
        }

        var ipxPosY = isIPhoneX() ? 0.01 : 0;

        var eatNode = downNode.getChildByName("eatNode");
        setWgtLayout(eatNode, [0.14, 0.14], [des + ipxSpace, 0.23 - ipxPosY], [0, 0]);

        if(MjClient.data.sData.tData.maxPlayer == 2){
            setWgtLayout(eatNode, [0.14, 0.14], [des + ipxSpace, 0.3 - ipxPosY], [0, 0]);
        }

        var eatNode = leftNode.getChildByName("eatNode");
        setWgtLayout(eatNode, [0.14, 0.14], [des + ipxSpace, 0.76 + ipxPosY], [0, 0]);

        var eatNode = rightNode.getChildByName("eatNode");
        setWgtLayout(eatNode, [0.14, 0.14], [1-des, 0.76 + ipxPosY], [0, 0]);

        var chat_btn = uiNode.getChildByName("chat_btn");
        setWgtLayout(chat_btn, [chat_btn.width/1280, 0],[0.97, 0.5 - 0.007],[0, -0.2]);

        var voice_btn = uiNode.getChildByName("voice_btn");
        setWgtLayout(voice_btn, [43/1280, 0],[0.91, 0.5],[0, -0.2]);

        var cancel = eat.getChildByName("cancel");
        setWgtLayout(cancel, [0, 0.16],[0.78, 0.1],[0, 1.12]);

        //郴州桂阳 传统布局的吃、碰、胡、过、麦克风、聊天按钮同步成和偏右布局一样的位置。
        if (MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI  ||
            MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI
            ){
            setWgtLayout(chat_btn, [chat_btn.width/1280, 0],[0.97, 0.187],[0, 0]);
            setWgtLayout(voice_btn, [43/1280, 0],[0.91, 0.1875],[0, 0]);
            setWgtLayout(cancel, [0, 0.16],[0.78, 0.3],[0, 1.12]);
            if (putSureBtn){
                setWgtLayout(putSureBtn,  [0.185, 0.143], [0.75, 0.5], [0, 0]);
            }
        }

        //湘西二七十吃碰牌牌堆特殊处理
        if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_XI_2710){
            des = 0.2;
            var eatNode = leftNode.getChildByName("eatNode");
            setWgtLayout(eatNode, [0.14, 0.14], [des + ipxSpace, 0.76 + ipxPosY], [0, 0]);

            var eatNode = rightNode.getChildByName("eatNode");
            setWgtLayout(eatNode, [0.14, 0.14], [1-des, 0.76 + ipxPosY], [0, 0]);
        }
    }

}


ziPai.changePlayUILayout = function(uiNode){
    //福禄寿没有布局选项
    if ( MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
        MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG){return;}
    ziPai.changePlayUILayoutCopyBySy(uiNode);
    // if (MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI ||
    //     MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
    //     MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI ||
    //     MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI ||
    //     MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU ||
    //     MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG ||
    //     MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI ||
    //     MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710
    //     ){
    //     ziPai.changePlayUILayoutCopyBySy(uiNode);
    //     return;
    // }
    //
    // var downNode  = uiNode.getChildByName("down");
    // var rightNode = uiNode.getChildByName("right");
    // var leftNode  = uiNode.getChildByName("left");
    // var eat = uiNode.getChildByName("eat");
    //
    // MjClient.playui.EatVisibleCheck();
    //
    // var type = ziPai.getUiLayoutType();
    //
    // var eatNode = leftNode.getChildByName("eatNode");
    // setWgtLayout(eatNode, [0.14, 0.14], [0.035, 0.74], [0, 0]);
    //
    // cc.log("???????????????????????");
    // if(type == 0){
    //     var eatNode = downNode.getChildByName("eatNode");
    //     setWgtLayout(eatNode, [0.14, 0.14], [533/1280, 361/720], [0, 0]);
    //     var outNode = downNode.getChildByName("outNode");
    //     setWgtLayout(outNode, [0.14, 0.14], [1, 0], [0, 0]);
    //     var put = downNode.getChildByName("put");
    //     setWgtLayout(put, [0.35, 0.35], [0.6, 0.6], [0, 0]);
    //     var userData = {scale:put.getScale(), pos:put.getPosition()};
    //     put.setUserData(userData);
    //
    //     var outNode = leftNode.getChildByName("outNode");
    //     setWgtLayout(outNode, [0.14, 0.14], [0.035, 249/720], [0, 0]);
    //
    //     var outNode = rightNode.getChildByName("outNode");
    //     setWgtLayout(outNode, [0.14, 0.14], [1, 249/720], [0, 0]);
    //
    //     var chat_btn = uiNode.getChildByName("chat_btn");
    //     if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI){
    //         setWgtLayout(chat_btn, [80/1280, 0],[0.97, 0.1875],[0, 0]);
    //     }else{
    //         setWgtLayout(chat_btn, [0.09, 0.09],[0.97, 0.1875],[0, 0]);
    //     }
    //
    //     var voice_btn = uiNode.getChildByName("voice_btn");
    //     if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI){
    //         setWgtLayout(voice_btn, [80/1280, 0],[0.91, 0.1875],[0, 0]);
    //     }else{
    //         setWgtLayout(voice_btn, [0.09, 0.09],[0.91, 0.1875],[0, 0]);
    //     }
    //
    //     if(MjClient.data.sData.tData.maxPlayer == 2 &&
    //         (MjClient.gameType == MjClient.GAME_TYPE.ML_HONG_ZI || MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI)){
    //         setWgtLayout(chat_btn, [0.09, 0.09], [0.97, 0.5], [0, -0.2]);
    //         setWgtLayout(voice_btn, [0.09, 0.09], [0.91, 0.5], [0, -0.2]);
    //     }
    //
    //     var cancel = eat.getChildByName("cancel");
    //     setWgtLayout(cancel, [0, 0.16],[0.78, 0.3],[0, 1.12]);
    // }else{
    //     var eatNode = downNode.getChildByName("eatNode");
    //     setWgtLayout(eatNode, [0.14, 0.14], [0.035, 0.23], [0, 0]);
    //     var outNode = downNode.getChildByName("outNode");
    //     setWgtLayout(outNode, [0.14, 0.14], [0.7, 0.5], [0, 0]);
    //     var put = downNode.getChildByName("put");
    //     setWgtLayout(put, [0.35, 0.35], [0.5, 0.6], [0, 0]);
    //     var userData = {scale:put.getScale(), pos:put.getPosition()};
    //     put.setUserData(userData);
    //
    //     var outNode1 = leftNode.getChildByName("outNode");
    //     setWgtLayout(outNode1, [0.14, 0.14], [0.12, 0.82], [0, 0]);
    //
    //     var outNode2 = rightNode.getChildByName("outNode");
    //     setWgtLayout(outNode2, [0.14, 0.14], [0.88, 0.82], [0, 0]);
    //
    //     if(MjClient.rePlayVideo == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU){
    //         var eatNode1 = leftNode.getChildByName("eatNode");
    //         setWgtLayout(eatNode1, [0.14, 0.14], [0.035, 0.68], [0, 0]);
    //
    //         var eatNode2 = rightNode.getChildByName("eatNode");
    //         setWgtLayout(eatNode2, [0.14, 0.14], [0.96, 0.68], [0, 0]);
    //
    //         setWgtLayout(outNode1, [0.14, 0.14], [0.02, 0.75], [0, 0]);
    //         setWgtLayout(outNode2, [0.14, 0.14], [0.98, 0.75], [0, 0]);
    //     }
    //
    //     var chat_btn = uiNode.getChildByName("chat_btn");
    //     if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI ||
    //        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU){
    //         setWgtLayout(chat_btn, [80/1280, 0],[0.97, 0.5],[0, -0.2]);
    //     }else {
    //         setWgtLayout(chat_btn, [0.09, 0.09], [0.97, 0.5], [0, -0.2]);
    //     }
    //
    //     var voice_btn = uiNode.getChildByName("voice_btn");
    //     if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI ||
    //        MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU){
    //         setWgtLayout(voice_btn, [80/1280, 0],[0.91, 0.5],[0, -0.2]);
    //     }else {
    //         setWgtLayout(voice_btn, [0.09, 0.09], [0.91, 0.5], [0, -0.2]);
    //     }
    //     var cancel = eat.getChildByName("cancel");
    //     setWgtLayout(cancel, [0, 0.16],[0.78, 0.1],[0, 1.12]);
    // }
    
}


var ZiPaiSettingView = cc.Layer.extend({
	jsBind:{
		block:{
			_layout:[[1,1],[0.5,0.5],[0,0],true]
            // _run:function(){ 
            //     // if(isIPhoneX()){ 
            //     //     setWgtLayout(this, [0.1, 0.1],[0.9, 0.2],[0, 0]);
            //     // }else{
            //     //     setWgtLayout(this, [0.1, 0.1],[0.7, 0.2],[0, 0]);
            //     // }
                
            // }
		},
		back:
		{	
            // _layout:[[1,0],[0,0],[0,0]],
            _layout:[[0, 1],[1, 0],[-1, 0]],
            // _run:function(){ 
            //     if(isIPhoneX()){ 
            //         setWgtLayout(this, [0, 1],[1, 0],[-1, 0]); 
            //     }else{
            //         setWgtLayout(this, [1, 0],[0, 0],[0, 0]);
            //     }

            // },
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
                    if(MjClient.gametType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
                        MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG) {
                        sender._type = 1;  //只选中第一项
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
                    if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
                        MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG) {
                        this.visible = false;
                    }
                },
            },
            title : {
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
                    this.bg = this.getChildByName("bg");
                    this.huaMianTxt = this.getChildByName("huaMianTxt");
                    this.huaMianTxt.ignoreContentAdaptWithSize(true);
                    this.gongNengTxt = this.getChildByName("gongNengTxt");
                    this.gongNengTxt.ignoreContentAdaptWithSize(true);

                    this.checkType = function(){
                        if(this._type == 1){
                            if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
                                this.huaMianTxt.visible = true;
                                this.gongNengTxt.visible = false;
                            }else{
                                this.bg.setScaleX(1);
                                this.huaMianTxt.setTextColor(cc.color(158, 81, 43));
                                this.gongNengTxt.setTextColor(cc.color(244, 205, 167));
                            }
                        }else{
                            if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
                                this.huaMianTxt.visible = false;
                                this.gongNengTxt.visible = true;
                            }else{
                                this.bg.setScaleX(-1);
                                this.gongNengTxt.setTextColor(cc.color(158, 81, 43));
                                this.huaMianTxt.setTextColor(cc.color(244, 205, 167));
                            } 
                        }
                    };
                    this.checkType();
                },
            },
            img_title: {
                _run:function() {
                    this.visible = (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
                    MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG);
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
                    if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
                        MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG) {
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
                        if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
                            MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG ||
                            MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ || 
                            MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG ||
                            MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
                            ((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) &&
                                MjClient.gameType != MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN))
                        {
                            yyin.visible = false;
                            voice_1.visible = false;
                            voice_2.visible = false;
                        }


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
                                        setMusicVolume(0);
                                        break;
                                    case ccui.CheckBox.EVENT_UNSELECTED:
                                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_YuYinYinLiangkaiguan", {
                                            uid: SelfUid()
                                        });
                                        this.noSpeak.setSelected(false);
                                        var v = util.localStorageEncrypt.getNumberItem("oldSpeakVolume", 0);
                                        this.Slider_speak.setPercent(v * 100);
                                        setMusicVolume(v);
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
                        if(ziPai.isYongZhouProject()){
                            _fixBtn.setPosition(50, -this.getContentSize().height * 2/3);
                            _fixBtn.setScale(0.7);
                        }else{
                            _fixBtn.setPosition(this.getContentSize().width*0.4 - 10, -this.getContentSize().height*2/3 + 10);
                            _fixBtn.setScale(1);
                        }
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
                    if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
                        MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG) {
                        this.visible = false; //不需要
                    }
                },

                _event : {
                    ZPaiSetType : function(ed){
                        if(ed.type == 2){
                            this.visible = true;
                        }else{
                            this.visible = false;
                        }
                        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
                            MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG) {
                            this.visible = false; //不需要
                        }
                    }
                },

                delBtn:{
                    _visible:function () {
                        if(ziPai.isYongZhouProject()){
                            if(MjClient.data.sData.tData.fieldId){
                                this.visible = false;
                            }
                        }else{
                            if (MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI){
                                return !MjClient.data.sData.tData.fieldId;
                            }else{
                                return true;
                            } 
                        }
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
    ctor:function (jsonSrc) {
        this._super();

        var jsonFile = jsonSrc === undefined ? "ziPai_Setting.json" : jsonSrc;
        var setui = ccs.load(jsonFile);
        this.addChild(setui.node);
		this._uiNode = setui.node
        settingView = this;
        MjClient.setui = this;
        BindUiAndLogic(setui.node,this.jsBind);
        this.loadBg();
        this.initParam();
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
            var gongNeng = setui.node.getChildByName("back").getChildByName("gongNeng");
            this.initVibrato(gongNeng);
        }
        return true;
    },

    initVibrato : function(back){
        var vibratoTypes = [];
        var type1 = back.getChildByName("vibratoKai");
        vibratoTypes.push(type1);
        var type2 = back.getChildByName("vibratoGuan");
        vibratoTypes.push(type2);
        this.vibratoTypes = createRadioBoxForCheckBoxs(vibratoTypes,function(index, sender, list){
            util.localStorageEncrypt.setBoolItem("isVibrato", index == 0);
        });
        var flg = util.localStorageEncrypt.getBoolItem("isVibrato", true);
        var index = flg ? 0 : 1;
        this.vibratoTypes.selectItem(index);
        // cc.eventManager.addListener(this.setTextClick(vibratoTypes,0,this.vibratoTypes),vibratoTypes[0].getChildByName("text"));
        // cc.eventManager.addListener(this.setTextClick(vibratoTypes,1,this.vibratoTypes),vibratoTypes[1].getChildByName("text"));
    },

    loadBg : function (){
        if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA){
            //邵阳 娄底放炮罚 背景特殊处理
            //游戏背景
            var back = this._uiNode.getChildByName("back");
            var huaMian = back.getChildByName("huaMian");
            var url = "setting/louDiFPF/beijing_";
            var beiJingList = [];
            beiJingList.push(huaMian.getChildByName("beiJing").getChildByName("gameBg1").getChildByName("Image_1"));
            beiJingList.push(huaMian.getChildByName("beiJing").getChildByName("gameBg2").getChildByName("Image_1"));
            beiJingList.push(huaMian.getChildByName("beiJing").getChildByName("gameBg3").getChildByName("Image_1"));
            for(var i = 0; i < beiJingList.length; i++){
                var imgUI = beiJingList[i];
                imgUI.loadTexture(url + (i + 1) + ".png");
            }
        }
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
        var speed = huaMian.getChildByName("suDu");

        var tData = MjClient.data.sData.tData;
        var isPost = tData.tState != TableState.roundFinish;

        if (speed) {
            speed.setVisible(false);
            speed.setLocalZOrder(-1);
        }
        var tingTips = huaMian.getChildByName("tingpai");
        if (tingTips) {
            tingTips.setVisible(false);
            tingTips.setLocalZOrder(-1);
        }

        //出牌语音
        var yuYinList = [];
        yuYinList.push(huaMian.getChildByName("music").getChildByName("voice_1"));
        yuYinList.push(huaMian.getChildByName("music").getChildByName("voice_2"));
        var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_VOICE_TYPE, 0);
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
            type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_VOICE_TYPE, 1);
        }
        //默认本地话
        if(MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI || MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI
            || MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI
            || MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI
            || MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI
            || MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI
            || MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI
            || MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI  ||
            MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI){
            type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_VOICE_TYPE, 1);
        }

        this.yuYinRadio = createRadioBoxForCheckBoxs(yuYinList, null, type);
        cc.eventManager.addListener(this.setTextClick(yuYinList,0,this.yuYinRadio),yuYinList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(yuYinList,1,this.yuYinRadio),yuYinList[1].getChildByName("text"));
        this.yuYinRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_VOICE_TYPE, index);
        });

        //布局
        var buJuList = [];
        buJuList.push(huaMian.getChildByName("buJu").getChildByName("layout1"));
        buJuList.push(huaMian.getChildByName("buJu").getChildByName("layout2"));
        var type = ziPai.getUiLayoutType();//util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT, 1);
        if(ziPai.isYongZhouProject()){
            type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT, 0);
        }
        //湘乡的需要与大厅同步
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
            var type1 = util.localStorageEncrypt.getNumberItem(MjClient.KEY_XXZP_LAYOUT_SELECT,0);
            if(type != type1){
                type = type1;
            }
        }
        //邵阳放炮罚坐醒玩法禁用布局
        if((MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA)
            && MjClient.data.sData.tData.maxPlayer === 4 && MjClient.data.sData.tData.areaSelectMode.zuoXing){
            type = 1;
            huaMian.getChildByName("buJu").getChildByName("layout1").visible = false;
        }
        //湘西二七十玩法禁用布局
        if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_XI_2710){
            type = 1;
            huaMian.getChildByName("buJu").getChildByName("layout1").visible = false;
        }
        this.buJuRadio = createRadioBoxForCheckBoxs(buJuList, null, type);
        cc.eventManager.addListener(this.setTextClick(buJuList,0,this.buJuRadio),buJuList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(buJuList,1,this.buJuRadio),buJuList[1].getChildByName("text"));
        var tData = MjClient.data.sData.tData;
        var isPost = tData.tState != TableState.roundFinish;
        this.buJuRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_PLAY_UI_LAYOUT, index);
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
                util.localStorageEncrypt.setNumberItem(MjClient.KEY_XXZP_LAYOUT_SELECT, index);
            }
            if(isPost || !ziPai.isYongZhouProject()){
                postEvent("EZP_layout", {});
            }
        });
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
            MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG) {
            huaMian.getChildByName("line_0").setVisible(false);
            huaMian.getChildByName("buJu").setVisible(false);

            //声音下移
            huaMian.getChildByName("line").y -= 20;
            //huaMian.getChildByName("bg_1").y -= 20;
            //huaMian.getChildByName("bg_2").y -= 20;
            huaMian.getChildByName("music").y -= 20;

            //背景选择上移
            //huaMian.getChildByName("line_1").y += 40;
            //huaMian.getChildByName("beiJing").y += 40;

            //显示速度选项
            speed.setVisible(true);
            speed.setLocalZOrder(1);

            //显示听牌提示选项
            tingTips.setVisible(true);
            tingTips.setLocalZOrder(1);
        }

        //游戏背景
        var beiJingList = [];
        var loadBgAsync = function(gameBg,imageView,file) {
            cc.textureCache.addImageAsync(file,function(texture) {
                gameBg.setVisible(true);
                imageView.loadTexture(file);
            });
        }
        beiJingList.push(huaMian.getChildByName("beiJing").getChildByName("gameBg1"));
        beiJingList.push(huaMian.getChildByName("beiJing").getChildByName("gameBg2"));
        beiJingList.push(huaMian.getChildByName("beiJing").getChildByName("gameBg3"));
        if(huaMian.getChildByName("beiJing").getChildByName("gameBg4")){
            beiJingList.push(huaMian.getChildByName("beiJing").getChildByName("gameBg4"));
        }
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
            || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI){
            for (var i = 0; i<4; i ++)
            {
                var gameBg = huaMian.getChildByName("beiJing").getChildByName("gameBg" + (i + 1));
                if (!gameBg)
                    break;

                var file = "playing/paohuziTable/beijing_"+(i+1)+".jpg";
                if (file != "")
                {
                    var texture = cc.textureCache.getTextureForKey(file);
                    if (texture)
                        gameBg.getChildByName("Image_1").loadTexture(file);
                    else {
                        // 预加载游戏背景
                        gameBg.setVisible(false);
                        loadBgAsync(gameBg,gameBg.getChildByName("Image_1"),file);
                    }
                }
                else
                    gameBg.setVisible(false);
            }

            // huaMian.getChildByName("beiJing").getChildByName("gameBg1").getChildByName("Image_1").loadTexture("playing/paohuziTable/beijing_1.jpg");
            // huaMian.getChildByName("beiJing").getChildByName("gameBg2").getChildByName("Image_1").loadTexture("playing/paohuziTable/beijing_2.jpg");
            // huaMian.getChildByName("beiJing").getChildByName("gameBg3").getChildByName("Image_1").loadTexture("playing/paohuziTable/beijing_3.jpg");
            // huaMian.getChildByName("beiJing").getChildByName("gameBg4").getChildByName("Image_1").loadTexture("playing/paohuziTable/beijing_4.jpg");
        }else if (MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI || MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI || 
            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU || MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG ||
            MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
            MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710 || MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ  ||
            MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI){
            for (var i = 0; i<3; i ++)
            {
                var gameBg = huaMian.getChildByName("beiJing").getChildByName("gameBg" + (i + 1));
                if (!gameBg)
                    break;

                var file = "playing/anhuapaohuzi/bg/beijing_"+(i+1)+".jpg";
                //汉寿和常德桌面背景一样
                if(MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
                    MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
                    MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_HU_ZI ||
                    MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI)
                {
                     file = "playing/paohuziTable/bg_changDe/beijing_"+(i+1)+".jpg";
                }
                if (file != "")
                {
                    var texture = cc.textureCache.getTextureForKey(file);
                    if (texture)
                        gameBg.getChildByName("Image_1").loadTexture(file);
                    else {
                        // 预加载游戏背景
                        gameBg.setVisible(false);
                        loadBgAsync(gameBg,gameBg.getChildByName("Image_1"),file);
                    }
                }
                else
                    gameBg.setVisible(false);
            }

            // huaMian.getChildByName("beiJing").getChildByName("gameBg1").getChildByName("Image_1").loadTexture("playing/anhuapaohuzi/bg/beijing_1.jpg");
            // huaMian.getChildByName("beiJing").getChildByName("gameBg2").getChildByName("Image_1").loadTexture("playing/anhuapaohuzi/bg/beijing_2.jpg");
            // huaMian.getChildByName("beiJing").getChildByName("gameBg3").getChildByName("Image_1").loadTexture("playing/anhuapaohuzi/bg/beijing_3.jpg");
            huaMian.getChildByName("beiJing").x = huaMian.getChildByName("beiJing").x + 60;
            huaMian.getChildByName("beiJing").getChildByName("gameBg4").visible = false;
        }else if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
                MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG ){
            for (var i = 0; i<4; i ++)
            {
                var gameBg = huaMian.getChildByName("beiJing").getChildByName("gameBg" + (i + 1));
                if (!gameBg)
                    break;

                var file = "playing/gameTable/bg"+i+".jpg";
                if (file != "")
                {
                    var texture = cc.textureCache.getTextureForKey(file);
                    if (texture)
                        gameBg.getChildByName("Image_1").loadTexture(file);
                    else {
                        // 预加载游戏背景
                        gameBg.setVisible(false);
                        loadBgAsync(gameBg,gameBg.getChildByName("Image_1"),file);
                    }
                }
                else
                    gameBg.setVisible(false);
            }

            // huaMian.getChildByName("beiJing").getChildByName("gameBg1").getChildByName("Image_1").loadTexture("playing/gameTable/bg0.jpg");
            // huaMian.getChildByName("beiJing").getChildByName("gameBg2").getChildByName("Image_1").loadTexture("playing/gameTable/bg1.jpg");
            // huaMian.getChildByName("beiJing").getChildByName("gameBg3").getChildByName("Image_1").loadTexture("playing/gameTable/bg2.jpg");
            // huaMian.getChildByName("beiJing").getChildByName("gameBg4").getChildByName("Image_1").loadTexture("playing/gameTable/bg3.jpg");
        }
        var type = ziPai.getGameBgType();//util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE, 0);
        // var type1 = util.localStorageEncrypt.getNumberItem(MjClient.KEY_gameBgType, 0); 
        // if(type != type1){
        //     //兼容下大厅里的设置
        //     type = type1;
        // }
        this.beiJingRadio = createRadioBoxForCheckBoxs(beiJingList, null, type);
        cc.eventManager.addListener(this.setTextClick(beiJingList,0,this.beiJingRadio),beiJingList[0].getChildByName("Image_1"));
        cc.eventManager.addListener(this.setTextClick(beiJingList,1,this.beiJingRadio),beiJingList[1].getChildByName("Image_1"));
        cc.eventManager.addListener(this.setTextClick(beiJingList,2,this.beiJingRadio),beiJingList[2].getChildByName("Image_1"));
        if(huaMian.getChildByName("beiJing").getChildByName("gameBg4")){
            cc.eventManager.addListener(this.setTextClick(beiJingList,3,this.beiJingRadio),beiJingList[3].getChildByName("Image_1"));
        }
        this.beiJingRadio.setSelectCallBack(function(index, sender, nodeList){
            cc.log("changeGameBgEvent : " + index);
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE,  index);
            setCurrentGameBgType(parseInt(index));
            postEvent("changeGameBgEvent", {});
        });

        //字牌字体
        var ziPaiList = [];
        ziPaiList.push(huaMian.getChildByName("ziPai").getChildByName("ziPai1"));
        ziPaiList.push(huaMian.getChildByName("ziPai").getChildByName("ziPai2"));
        ziPaiList.push(huaMian.getChildByName("ziPai").getChildByName("ziPai3"));
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
            MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG) {
            //福禄寿用不上
            huaMian.getChildByName("line_2").setVisible(false);
            huaMian.getChildByName("ziPai").setVisible(false);
            huaMian.getChildByName("delBtn").setVisible(true);
        }
        else {
            huaMian.getChildByName("delBtn").setVisible(false);
        }
        var ziPai4 = huaMian.getChildByName("ziPai").getChildByName("ziPai4");
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
            || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI
            || MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI){
            ziPai4.visible = true;
            ziPaiList.push(ziPai4);

            for(var i = 0; i < ziPaiList.length; i++){
                ziPaiList[i].x = (huaMian.getChildByName("ziPai").width - 40) / (ziPaiList.length) * (i + 1);
            }
        }else{
            ziPai4.visible = false;
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI || 
            MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || 
            MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
            MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ ||
            MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710){
            ziPaiList[0].getChildByName("Image").loadTexture("setting/ziPai_1.png");
            ziPaiList[1].getChildByName("Image").loadTexture("setting/ziPai_5.png");
            ziPaiList[2].getChildByName("Image").loadTexture("setting/ziPai_3.png");
        }else if ( MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI){
            ziPaiList[0].getChildByName("Image").loadTexture("setting/ziPai_5.png");
            ziPaiList[1].getChildByName("Image").loadTexture("setting/ziPai_4.png");
            ziPaiList[2].getChildByName("Image").loadTexture("setting/ziPai_3.png");
        }else if ( MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI){
            ziPaiList[0].getChildByName("Image").loadTexture("setting/ziPai_3.png");
            ziPaiList[1].getChildByName("Image").loadTexture("setting/ziPai_2.png");
            ziPaiList[2].getChildByName("Image").loadTexture("setting/ziPai_1.png");
        }

        var type = ziPai.getZiPaiType();//util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, 1);
        this.ziPaiRadio = createRadioBoxForCheckBoxs(ziPaiList, null, type);
        for(var i = 0; i < ziPaiList.length; i++){
            cc.eventManager.addListener(this.setTextClick(ziPaiList,i,this.ziPaiRadio),ziPaiList[i].getChildByName("Image"));
        }
        /*cc.eventManager.addListener(this.setTextClick(ziPaiList,0,this.ziPaiRadio),ziPaiList[0].getChildByName("Image"));
        cc.eventManager.addListener(this.setTextClick(ziPaiList,1,this.ziPaiRadio),ziPaiList[1].getChildByName("Image"));
        cc.eventManager.addListener(this.setTextClick(ziPaiList,2,this.ziPaiRadio),ziPaiList[2].getChildByName("Image"));*/
        this.ziPaiRadio.setSelectCallBack(function(index, sender, nodeList){ 
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, index);
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJBgType, index);
            postEvent("changeMJBgEvent", type);
        });

        //湘乡字体移动到功能界面
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
            var ziPaiList = [];
            ziPaiList.push(gongNeng.getChildByName("ziPai").getChildByName("ziPai1"));
            ziPaiList.push(gongNeng.getChildByName("ziPai").getChildByName("ziPai3"));
            var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, 1);
            var type1 = util.localStorageEncrypt.getNumberItem(MjClient.KEY_MJBgType, 1);
            if(type != type1){
                type = type1;
            }
            this.ziPaiRadio = createRadioBoxForCheckBoxs(ziPaiList, null, type);
            cc.eventManager.addListener(this.setTextClick(ziPaiList,0,this.ziPaiRadio),ziPaiList[0].getChildByName("Image"));
            cc.eventManager.addListener(this.setTextClick(ziPaiList,1,this.ziPaiRadio),ziPaiList[1].getChildByName("Image"));
            this.ziPaiRadio.setSelectCallBack(function(index, sender, nodeList){
                util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, index);
                util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJBgType, index);
                postEvent("changeMJBgEvent", type);
            });            
        }

        //手牌大小
        var sizeTypeList = [];
        sizeTypeList.push(gongNeng.getChildByName("shouPai").getChildByName("da"));
        sizeTypeList.push(gongNeng.getChildByName("shouPai").getChildByName("xiao"));
        var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_HAND_SIZE_TYPE, 0);
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
            var type1 = util.localStorageEncrypt.getNumberItem(MjClient.KEY_XXZP_CARD_SIZE,0);
            if(type != type1){
                type = type1;
            }
        }
        // this.sizeTypeRadio = createRadioBoxForCheckBoxs(sizeTypeList, null, type);
        // cc.eventManager.addListener(this.setTextClick(sizeTypeList,0,this.sizeTypeRadio),sizeTypeList[0].getChildByName("text"));
        // cc.eventManager.addListener(this.setTextClick(sizeTypeList,1,this.sizeTypeRadio),sizeTypeList[1].getChildByName("text"));
        // this.sizeTypeRadio.setSelectCallBack(function(index, sender, nodeList){
        //     util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_HAND_SIZE_TYPE, index);
        //     if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ || MjClient.getAppType() == MjClient.APP_TYPE.QXHHZP){
        //         util.localStorageEncrypt.setNumberItem(MjClient.KEY_XXZP_CARD_SIZE, index);
        //         postEvent("changeMJBgSize", index);
        //     }else{
        //         postEvent("changeMJBgEvent", ziPai.getZiPaiType());
        //     }
        // });

        //快速吃牌
        var fastEatList = [];
        fastEatList.push(gongNeng.getChildByName("chiPai").getChildByName("no"));
        fastEatList.push(gongNeng.getChildByName("chiPai").getChildByName("yes"));
        var type = ziPai.getHasFastEat();//util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_FAST_EAT_TYPE, 0);
        this.fastEatRadio = createRadioBoxForCheckBoxs(fastEatList, null, type);
        cc.eventManager.addListener(this.setTextClick(fastEatList,0,this.fastEatRadio),fastEatList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(fastEatList,1,this.fastEatRadio),fastEatList[1].getChildByName("text"));
        this.fastEatRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_FAST_EAT_TYPE, index);
            postEvent("EZP_faseEat", {});
        });

        //显示胡息
        // var huXiList = [];
        // huXiList.push(gongNeng.getChildByName("huXi").getChildByName("no"));
        // huXiList.push(gongNeng.getChildByName("huXi").getChildByName("yes"));
        // var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_HU_XI_TYPE, 0);
        // if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
        //     huXiList = [];
        //     huXiList.push(gongNeng.getChildByName("huXi").getChildByName("yes"));
        //     huXiList.push(gongNeng.getChildByName("huXi").getChildByName("no"));
        //     type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_HU_XI_TYPE, 0);
        //     var type1 = util.localStorageEncrypt.getNumberItem(MjClient.KEY_XXZP_HUXISHOW_SELECT,0);
        //     if(type != type1){
        //         type = type1;
        //     }
        // }
        // this.huXiRadio = createRadioBoxForCheckBoxs(huXiList, null, type);
        // cc.eventManager.addListener(this.setTextClick(huXiList,0,this.huXiRadio),huXiList[0].getChildByName("text"));
        // cc.eventManager.addListener(this.setTextClick(huXiList,1,this.huXiRadio),huXiList[1].getChildByName("text"));
        // this.huXiRadio.setSelectCallBack(function(index, sender, nodeList){
        //     util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_HU_XI_TYPE, index);
        //     if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
        //         util.localStorageEncrypt.setNumberItem(MjClient.KEY_XXZP_HUXISHOW_SELECT, index);
        //     }
        //     postEvent("EZP_huXi", {});
        // });

        //出牌虚线
        var xuXianList = [];
        xuXianList.push(gongNeng.getChildByName("xuXian").getChildByName("bz"));
        xuXianList.push(gongNeng.getChildByName("xuXian").getChildByName("gao"));
        var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_XU_XIAN_TYPE, 0);
        this.xuXianRadio = createRadioBoxForCheckBoxs(xuXianList, null, type);
        cc.eventManager.addListener(this.setTextClick(xuXianList,0,this.xuXianRadio),xuXianList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(xuXianList,1,this.xuXianRadio),xuXianList[1].getChildByName("text"));
        this.xuXianRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_XU_XIAN_TYPE, index);
            postEvent("EZP_xuXian", {});
        });

        //出牌速度
        var suDuList = [];
        suDuList.push(gongNeng.getChildByName("suDu").getChildByName("yb"));
        suDuList.push(gongNeng.getChildByName("suDu").getChildByName("bz"));
        var man = gongNeng.getChildByName("suDu").getChildByName("man");
        var jiKuai = gongNeng.getChildByName("suDu").getChildByName("jiKuai");
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI || MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG  || MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA || MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710 || MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ  ||
            MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI){
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
            suDuList.push(jiKuai)
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
                MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG) { //变态的福禄寿，出牌速度要求放在画面上，而不是统一放在功能设置里
            suDuList = [];
            suDuList.push(huaMian.getChildByName("suDu").getChildByName("kuai"));
            suDuList.push(huaMian.getChildByName("suDu").getChildByName("man"));
        }
        else{
            man.visible = false;
            jiKuai.visible = false;
        }
        var type = ziPai.getSuDuType();
        this.suDuRadio = createRadioBoxForCheckBoxs(suDuList, null, type);
        for(var i = 0; i < suDuList.length; i++){
            cc.eventManager.addListener(this.setTextClick(suDuList,i,this.suDuRadio),suDuList[i].getChildByName("text"));
        }
        this.suDuRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_SU_DU_TYPE, index);
            postEvent("EZP_suDu", {});
            ziPai.changeAcTime();
        });

        //手牌大小
        var cardSizeList = [];
        cardSizeList.push(gongNeng.getChildByName("daxiao").getChildByName("da"));
        cardSizeList.push(gongNeng.getChildByName("daxiao").getChildByName("xiao"));
        var superCard = gongNeng.getChildByName("daxiao").getChildByName("super");
        if(MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ ||
            MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG ||
            MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU ||
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710 ||
            MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI
        ){
            superCard.visible = true;
            var smallCard = gongNeng.getChildByName("daxiao").getChildByName("xiao");
            var tempX = smallCard.x;
            smallCard.x = superCard.x;
            superCard.x = tempX;

            cardSizeList.push(superCard);
        }else{
            superCard.visible = false;
        }
        // cardSizeList.push(gongNeng.getChildByName("suDu").getChildByName("js"));
        var type = ziPai.getCardSize();//util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_CARD_SIZE, 0);
        this.cardSizeRadio = createRadioBoxForCheckBoxs(cardSizeList, null, type);
        for(var i = 0; i < cardSizeList.length; i++){
            cc.eventManager.addListener(this.setTextClick(cardSizeList,i,this.cardSizeRadio),cardSizeList[i].getChildByName("text"));
        }
        this.cardSizeRadio.setSelectCallBack(function(index, sender, nodeList){  
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_CARD_SIZE, index);
            postEvent("changeMJBgEvent", {});
            // ziPai.changeAcTime();
        });

        //听牌提示
        var tingpai = gongNeng.getChildByName("tingpai");
        tingpai.getChildByName("title").ignoreContentAdaptWithSize(true);
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI || MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI  ||
            MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI || 
            MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA || MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710 || MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ ||
            MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI){
            tingpai.visible = true;
        }else{
            tingpai.visible = false;
        }
        var tingPaiList = [];
        tingPaiList.push(tingpai.getChildByName("kaiqi"));
        tingPaiList.push(tingpai.getChildByName("guanbi"));
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
           MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG) { //变态的福禄寿，听牌提示要求放在画面上，而不是统一放在功能设置里
            tingPaiList = [];
            tingPaiList.push(tingTips.getChildByName("kaiqi"));
            tingPaiList.push(tingTips.getChildByName("guanbi"));
        }
        var type = ziPai.getTingPai();
        this.tingPaiRadio = createRadioBoxForCheckBoxs(tingPaiList, null, type);
        cc.eventManager.addListener(this.setTextClick(tingPaiList,0,this.tingPaiRadio),tingPaiList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(tingPaiList,1,this.tingPaiRadio),tingPaiList[1].getChildByName("text"));
        this.tingPaiRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_PLAY_TING_PAI, index);
            postEvent("EZP_tingPai", index);
        });

        //胡息显示
        var huxi = gongNeng.getChildByName("huxi");
        huxi.getChildByName("title").ignoreContentAdaptWithSize(true);
        if(MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI  ||
            MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI || 
            MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || 
            MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
            MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ ||
            MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI){
            huxi.visible = true;
        }else{
            huxi.visible = false;
        }
        var huXiList = [];
        huXiList.push(huxi.getChildByName("kaiqi"));
        huXiList.push(huxi.getChildByName("guanbi"));
        var type = ziPai.getHuXiType();
        this.huXiRadio = createRadioBoxForCheckBoxs(huXiList, null, type);
        for(var i = 0; i < huXiList.length; i++){
            cc.eventManager.addListener(this.setTextClick(huXiList,i,this.huXiRadio),huXiList[i].getChildByName("text"));
        }
        this.huXiRadio.setSelectCallBack(function(index, sender, nodeList){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_HU_XI_TYPE, index);
            postEvent("EZP_huXi", index);
        });

        //出牌
        var chupai = gongNeng.getChildByName("chupai");
        chupai.getChildByName("title").ignoreContentAdaptWithSize(true);
        if(MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710){
            chupai.visible = true;
        }else{
            chupai.visible = false;
        }
        var type = ziPai.getChuPaiType();
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

        //出牌提示
        var type = ziPai.getChuPaiGuide();
        var chuPaiGuide = gongNeng.getChildByName("chuPaiGuide");
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI){
            chuPaiGuide.visible = true;
            chuPaiGuide.y = huxi.y;
        }else{
            chuPaiGuide.visible = false;
        }
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
                var tData = MjClient.data.sData.tData;
                var isPost = tData.tState != TableState.roundFinish;
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
                        if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
                            util.localStorageEncrypt.setNumberItem(MjClient.KEY_XXZP_LAYOUT_SELECT, number);
                        }
                        if(!isPost && ziPai.isYongZhouProject()){
                            return;
                        }
                        postEvent("EZP_layout", {});
                    }

                    //游戏背景
                    if (radio == that.beiJingRadio) {
                        cc.log("changeGameBgEvent : " + number);
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE, number);
                        setCurrentGameBgType(number);
                        postEvent("changeGameBgEvent", {});
                    }

                    //字牌字体
                    if (radio == that.ziPaiRadio) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, number);
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJBgType, number);
                        if(!isPost && ziPai.isYongZhouProject()){
                            return;
                        }
                        postEvent("changeMJBgEvent", number);
                    }

                    //字牌大小
                    if (radio == that.sizeTypeRadio) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_HAND_SIZE_TYPE, number);
                        if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||　MjClient.getAppType() == MjClient.APP_TYPE.QXHHZP){
                            util.localStorageEncrypt.setNumberItem(MjClient.KEY_XXZP_CARD_SIZE, number);
                            if(!isPost && ziPai.isYongZhouProject()){
                                return;
                            }
                            postEvent("changeMJBgSize", number);
                        }else{
                            if(!isPost && ziPai.isYongZhouProject()){
                                return;
                            }
                            postEvent("changeMJBgEvent", ziPai.getZiPaiType());
                        }
                    }

                    //快速吃牌
                    if (radio == that.fastEatRadio) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_FAST_EAT_TYPE, number);
                        postEvent("EZP_faseEat", {});
                    }

                    //显示胡息
                    if (radio == that.huXiRadio) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_HU_XI_TYPE, number);
                        if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
                            util.localStorageEncrypt.setNumberItem(MjClient.KEY_XXZP_HUXISHOW_SELECT, number);
                        }
                        if(!isPost && ziPai.isYongZhouProject()){
                            return;
                        }
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
                        ziPai.changeAcTime();
                    }

                    // 听牌提示
                    if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                        if (radio == that.tingPaiEat){
                            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_TING_PAI_TYPE, number);
                            if(!isPost){
                                return;
                            }
                            postEvent("EZP_tingPai", {});
                        }
                    }

                    // 双击出牌
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
                        if (radio == that.doubleClick){
                            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_DOUBLE_CLICK_TYPE, number);
                            postEvent("EZP_doubleClick", {});
                        }
                    }

                    //手牌大小
                    if (radio == that.cardSizeRadio){
                        cc.log("cardSizeRadio touch");
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_CARD_SIZE, number);
                        postEvent("changeMJBgEvent", {});
                    }

                    //出牌
                    if (radio == that.chupaiRadio){
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_CHU_PAI_TYPE, number);
                        postEvent("EZP_chuPai", {});
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