MjClient.KEY_voiceType = "_VOICE_TYPE";
MjClient.KEY_gameBgType = "_GAME_BG_TYPE";
MjClient.KEY_gameBgType_3D = "_GAME_BG_TYPE_3D";
MjClient.KEY_pdkTableBgType = "_PDK_TABLE_BG_TYPE_1";  // 跑得快
MjClient.KEY_sdhTableBgType = "_SDH_TABLE_BG_TYPE";  // 三打哈
MjClient.KEY_ddzTableBgType = "_DDZ_TABLE_BG_TYPE";  // 斗地主
MjClient.KEY_dqTableBgType = "_DQ_TABLE_BG_TYPE";    // 打七
MjClient.KEY_dqTableBgType_new = "_DQ_TABLE_BG_TYPE_NEW";    // 新打七
MjClient.KEY_nsbTableBgType = "_NSB_TABLE_BG_TYPE";    // 牛十别
MjClient.KEY_dmzTableBgType = "_DMZ_TABLE_BG_TYPE";    // 打码子
MjClient.KEY_daZhaDanTableBgType = "KEY_daZhaDanTableBgType";    // 打炸弹
MjClient.KEY_YuanJiangQianFenTableBgType = "_YUAN_JIANG_QIAN_FEN_BG_TYPE";    // 沅江千分
MjClient.KEY_YLZiPaiBgType = "_KEY_YONG_LI_ZI_PAI_BG_TYPE";    // 永利地区字牌
MjClient.KEY_gdyTableBgType = "_GDY_TABLE_BG_TYPE";    // 干瞪眼

MjClient.KEY_MJBgType  = "_MJ_BG_TYPE";
MjClient.KEY_CPBgType  = "_CP_BG_TYPE";
MjClient.KEY_3DMJBgType  = "_3DMJ_BG_TYPE";
MjClient.KEY_3DMJTexiaoType  = "_3DMJ_TEXIAO_TYPE";
MjClient.KEY_PKImgType = "_PK_IMG_TYPE";
MjClient.KEY_bgMusicType = "BG_MUSIC_TYPE";
MjClient.KEY_autoRelay = "_AUTO_RELAY";    // 自动准备
MjClient.KEY_voiceType_reset = "_VOICE_TYPE_REST";    // 语音选择重置
MjClient.KEY_mjhand_size = "_MJHAND_SIZE";    // 手牌大小
MjClient.KEY_voiceCHANGSHA = "_VOICE_TYPE_CHANGSHA";    // 长沙话  number 1,0
MjClient.KEY_outEnlarge = "_OUT_TYPE_ENLARGE";    // 出牌放大  
MjClient.KEY_insertCardAni = "_OUT_TYPE_INSERT";    // 插牌动画 
MjClient.KEY_uiSelect = "_UI_Select";    // 岳阳APP 经典版、湖南版切换
MjClient.KEY_QXYZ_CARD_SPEED   = "KEY_QXYZ_CARD_SPEED";   //永州字牌显示消失的速度

//选项选中时的颜色处理  统一处理
var COLOR = {
    SETTNG_COLOR_1: cc.color(255,119,28),    //选中
    SETTNG_COLOR_2: cc.color(118,99,42),     //未选中
};

//永州项目设置
MjClient.KEY_mjTableBgType = "_MJ_TABLE_BG_TYPE";   // 麻将
MjClient.KEY_pdkTableBgType_SY = "_PDK_TABLE_BG_TYPE";  // 邵阳跑得快
MjClient.KEY_ZPFontType  = "_ZP_FONT_TYPE"; // 字牌
MjClient.KEY_daTongZiBgType  = "_DA_TONG_ZI_BG_TYPE";   //打筒子
MjClient.KEY_SYZP_CARD_Bg_Type  = "KEY_SYZP_CARD_Bg_Type";   //邵阳字牌字体类型
MjClient.KEY_XXZP_CARD_SIZE       = "KEY_XXZP_CARD_SIZE";      //湘鄉字牌牌大小設置
MjClient.KEY_XXZP_LAYOUT_SELECT   = "KEY_XXZP_LAYOUT_SELECT";   //湘乡字牌牌局布局设置
MjClient.KEY_XXZP_HUXISHOW_SELECT = "KEY_XXZP_HUXISHOW_SELECT"; //湘乡字牌手牌胡息显示设置
MjClient.KEY_longHuiBaZhaDanBG  = "KEY_longHuiBaZhaDanBG";   //隆回霸炸弹游戏背景
MjClient.KEY_banBianTianZhaBG  = "KEY_banBianTianZhaBG";   //半边天游戏背景
MjClient.KEY_QXYZ_LAYOUT_SELECT   = "KEY_QXYZ_LAYOUT_SELECT";   //永州字牌牌局布局设置
MjClient.KEY_QXSYDTZ_HOME_UI_TYPE = "KEY_QXSYDTZ_HOME_UI_TYPE"; //大厅UI

// 新版江苏选中颜色设置
if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
    MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
    MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
    MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
    MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
        COLOR.SETTNG_COLOR_1 = cc.color(211,60,0);     //选中
        COLOR.SETTNG_COLOR_2 = cc.color(151,101,60);   //未选中
}

// 山西颜色设置
if ( MjClient.getAppType()  ===  MjClient.APP_TYPE.TXJINZHONGMJ ||
    MjClient.getAppType() ===  MjClient.APP_TYPE.AYGUIZHOUMJ ||
    MjClient.getAppType() ===  MjClient.APP_TYPE.LYSICHUANMJ||
    MjClient.getAppType() ===  MjClient.APP_TYPE.LYSICHUANMJ||
    MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ ) {
    COLOR.SETTNG_COLOR_1 = cc.color(52,128,255);   //选中
    COLOR.SETTNG_COLOR_2 = cc.color(66,94,112);    //未选中
}

// 岳阳颜色设置
if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
    COLOR.SETTNG_COLOR_1 = cc.color(0xd3,0x26,0x0e);  // 选中
    COLOR.SETTNG_COLOR_2 = cc.color(0x44,0x33,0x33);  // 未选中
}

if(MjClient.getAppType() ===  MjClient.APP_TYPE.AYGUIZHOUMJ){
    COLOR.SETTNG_COLOR_1 = cc.color("#00713A");  // 选中
    COLOR.SETTNG_COLOR_2 = cc.color("#954500");  // 未选中
}

function getGameTag() {
    if ((MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)&& (MjClient.playui || MjClient.goldMatchingui)){
        return MjClient.gameType + "";
    }
    else if (isJinZhongAPPType() ||
        MjClient.getAppType() ===  MjClient.APP_TYPE.AYGUIZHOUMJ ||
        MjClient.getAppType() ===  MjClient.APP_TYPE.LYSICHUANMJ  && MjClient.playui) {
        if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI ||
            GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU ||
            GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DA_QI ||
            GameClass[MjClient.gameType] == MjClient.GAME_CLASS.GAN_DENG_YAN)
            return MjClient.gameType + "";
        else
            return "";
    }
    else
        return "";
}

//获得语音大小
function getSpeakVolume() {
    return util.localStorageEncrypt.getNumberItem("SpeakVolume", 0.5);
}


function setSpeakVolume(v) {
    util.localStorageEncrypt.setNumberItem("SpeakVolume", v);
    //cc.audioEngine.setEffectsVolume(v + 0.001); //ios系统不识别0的音效设置
}



function getEffectsVolume() {
    return util.localStorageEncrypt.getNumberItem("EffectVolume", 0.5);
}


function setEffectsVolume(v) {
    if (v == getEffectsVolume())
        return;

    util.localStorageEncrypt.setNumberItem("EffectVolume", v);
    //cc.audioEngine.setEffectsVolume(v + 0.001); //ios系统不识别0的音效设置

    if (MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&  MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ && !MjClient.Scene.getActionByTag(20190105)){
        var action = cc.sequence(cc.delayTime(1.0), cc.callFunc(function () {
            if (playTimeUpEff) {
                stopEffect(playTimeUpEff);
                playTimeUpEff = playEffect("loop_alarm", true);
            }
        }))
        action.setTag(20190105);
        MjClient.Scene.runAction(action);
    }
}



function setMusicVolume(v)
{
	if(v<0)
	{
		//var ev=sys.localStorage.getItem("MusicVolume");
        //if(!ev) ev="0.5";
        //v=parseFloat(ev);
        v=util.localStorageEncrypt.getNumberItem("MusicVolume", 0.5);
	}
	else
	{
		//sys.localStorage.setItem("MusicVolume",v);
        util.localStorageEncrypt.setNumberItem("MusicVolume", v);
	}
	cc.audioEngine.setMusicVolume(v);
	return v;
}


/*
    获取语言语音,返回值 0 表示普通话，1 表示本地话
 */
function getCurrentVoiceType()
{
    if(MjClient.playui && MjClient.playui.getVoiceType)  return MjClient.playui.getVoiceType();

    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
        if(MjClient.gameType === MjClient.GAME_TYPE.ML_HONG_ZI){ // 红字的
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType_HongZi, 0);
        }
    }

    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 0);
    else if (MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ) // 徐州默认本地话
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 1);
    else if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA || 
        MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI ||
        MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI)
    {
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 1); //永州项目
    }
    else
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 0);
}

//永州项目
var UserSetting_MJBgType = -1;
var UserSetting_GameBgType = -1;
var UserSetting_pdkTableBgType = -1;
var UserSetting_sdhTableBgType = -1;
var UserSetting_ddzTableBgType = -1;
var UserSetting_mjTableBgType = -1;
var UserSetting_daTongZiBgType = -1;
var UserSetting_longHuiBaZhaDan = -1;
var UserSetting_banBianTianZha = -1;

// 是否自动准备
function currentIsAutoRelay()
{
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ)
            return util.localStorageEncrypt.getBoolItem(MjClient.KEY_autoRelay, false);
    else
        return false;
}

// 背景音乐(通化APP有此选项)
function getCurrentBgMusicType()
{
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_bgMusicType, 0);
}

function getCurrentBgMusicName()
{
    var bgMusicType = getCurrentBgMusicType();
    return ["bg_jindian", "bg_chuxia", "bg_yanran"][bgMusicType];
}

/**
 * 获取当前选择的游戏桌面背景
 * @return {Number}
 */
function getCurrentGameBgType()
{
    if (COMMON_UI3D.is3DUI()) {
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_gameBgType_3D + getGameTag(), 0);
    }

    if ((MjClient.playui || MjClient.goldMatchingui)&& typeof(GameClass[MjClient.gameType]) != "undefined") {
        if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.SAN_DA_HA) {
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
                return util.localStorageEncrypt.getNumberItem(MjClient.KEY_sdhTableBgType, 3);
            else
                return util.localStorageEncrypt.getNumberItem(MjClient.KEY_sdhTableBgType, 2);
        }else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DA_QI) {
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
                return util.localStorageEncrypt.getNumberItem(MjClient.KEY_dqTableBgType_new, 3);
            else if (isJinZhongAPPType())
                return util.localStorageEncrypt.getNumberItem(MjClient.KEY_dqTableBgType_new, 0);
            else
                return util.localStorageEncrypt.getNumberItem(MjClient.KEY_dqTableBgType_new, 0);
        }
        else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.GAN_DENG_YAN) {
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_gdyTableBgType, 0);
        } else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU) {
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
                return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ddzTableBgType, 3);
            else if (isJinZhongAPPType())
                return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ddzTableBgType, 2);
            else
                return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ddzTableBgType, 0);
        } else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI){
            if (isJinZhongAPPType())
                return util.localStorageEncrypt.getNumberItem(MjClient.KEY_pdkTableBgType, 2);
            else
                return util.localStorageEncrypt.getNumberItem(MjClient.KEY_pdkTableBgType, 3);
        } else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.NIU_SHI_BIE){
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
                return util.localStorageEncrypt.getNumberItem(MjClient.KEY_nsbTableBgType, 1);
        } else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DA_MA_ZI){
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
                return util.localStorageEncrypt.getNumberItem(MjClient.KEY_dmzTableBgType, 1);
        } else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DA_ZHA_DAN){
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_daZhaDanTableBgType, 1);
        }
        else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.QIAN_FEN){
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
                return util.localStorageEncrypt.getNumberItem(MjClient.KEY_YuanJiangQianFenTableBgType, 3);
        }else if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI && 
            MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_YLZiPaiBgType, 2);
        }
    }

    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
        isJinZhongAPPType() ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ)
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_gameBgType + getGameTag(), 0);
    else if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ)
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_gameBgType + getGameTag(), 1);
    else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
        if ((MjClient.playui || MjClient.goldMatchingui) && MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU)
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_gameBgType + getGameTag(), 2);
        else if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE)
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_gameBgType + getGameTag(), 1);
        else if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN)
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_gameBgType + getGameTag(), 3);
        else if (MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI)
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_gameBgType + getGameTag(), 1);
        else if (MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN || MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG)
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_gameBgType + getGameTag(), 1);
        else if (MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG)
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_gameBgType + getGameTag(), 1);
        else if (MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K || MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
            MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG)
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_gameBgType + getGameTag(), 1);
        else
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_gameBgType + getGameTag(), 2);
    }
    else
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_gameBgType + getGameTag(), 2);
}

/**
 * 永州项目使用
 * 获取当前选中的游戏背景
 * @return {Number}
 */
function getCurrentGameBgType_yongzhou(){
    if ((MjClient.playui || MjClient.goldMatchingui) && typeof(GameClass[MjClient.gameType]) != "undefined") {
        if (COMMON_UI3D.is3DUI()) {
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_gameBgType_3D, 0);
        }

        if (MjClient.gameType === MjClient.GAME_TYPE.XU_PU_LAO_PAI)
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_mjTableBgType, 1);

        if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG) {
            if (UserSetting_mjTableBgType != -1)
                return UserSetting_mjTableBgType;
            else
                return util.localStorageEncrypt.getNumberItem(MjClient.KEY_mjTableBgType, 2);
        } else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.SAN_DA_HA) {
            if (UserSetting_sdhTableBgType != -1)
                return UserSetting_sdhTableBgType;
            else
                return util.localStorageEncrypt.getNumberItem(MjClient.KEY_sdhTableBgType, 2);
        } else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU) {
            if (UserSetting_ddzTableBgType != -1)
                return UserSetting_ddzTableBgType;
            else
                return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ddzTableBgType, 0);
        } else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI) {
            if (UserSetting_pdkTableBgType != -1)
                return UserSetting_pdkTableBgType;
            else if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG)
                return util.localStorageEncrypt.getNumberItem(MjClient.KEY_pdkTableBgType_SY, 0);
            else
                return util.localStorageEncrypt.getNumberItem(MjClient.KEY_pdkTableBgType, 3);
        }else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DA_TONG_ZI) {
            if (UserSetting_daTongZiBgType != -1)
                return UserSetting_daTongZiBgType;
            else
                return util.localStorageEncrypt.getNumberItem(MjClient.KEY_daTongZiBgType, 0);
        }else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.BA_ZHA_DAN) {
            if (UserSetting_longHuiBaZhaDan != -1)
                return UserSetting_longHuiBaZhaDan;
            else
                return util.localStorageEncrypt.getNumberItem(MjClient.KEY_longHuiBaZhaDanBG, 0);
        }else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.BAN_BIAN_TIAN_ZHA) {
            if (UserSetting_banBianTianZha != -1)
                return UserSetting_banBianTianZha;
            else
                return util.localStorageEncrypt.getNumberItem(MjClient.KEY_banBianTianZhaBG, 0);
        }
    }

    if (UserSetting_GameBgType != -1)
        return UserSetting_GameBgType;
    else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
        MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA ||
        MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI ||
        MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI)
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_gameBgType, 0);
    else if(MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG)
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_daTongZiBgType, 0);
    else if((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) && 
        GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI){
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE,  0);
    }else if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI){
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE,  0);
    }
    else
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_gameBgType, 2); 
}

function setCurrentGameBgType(gameBgType)
{
    if (COMMON_UI3D.is3DUI()) {
        return util.localStorageEncrypt.setNumberItem(MjClient.KEY_gameBgType_3D + getGameTag(), gameBgType);
    }

    if ((MjClient.playui  || MjClient.goldMatchingui) && typeof(GameClass[MjClient.gameType]) != "undefined") {
        if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.SAN_DA_HA) {
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_sdhTableBgType, gameBgType);
            return;
        } else if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DA_QI){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_dqTableBgType_new, gameBgType);
            return;
        }
        else if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.GAN_DENG_YAN){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_gdyTableBgType, gameBgType);
            return;
        } else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU) {
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ddzTableBgType, gameBgType);
            return;
        } else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI) {
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_pdkTableBgType, gameBgType);
            return;
        } else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.NIU_SHI_BIE) {
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_nsbTableBgType, gameBgType);
            return;
        } else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DA_MA_ZI) {
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_dmzTableBgType, gameBgType);
            return;
        } else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DA_ZHA_DAN) {
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_daZhaDanTableBgType, gameBgType);
            return;
        }else if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI && 
            MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_YLZiPaiBgType, gameBgType);
            return;
        }
        else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.QIAN_FEN) {
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_YuanJiangQianFenTableBgType, gameBgType);
            return;
        }
    }
    cc.log(" ====== gameBgType gameBgType ",gameBgType);
    util.localStorageEncrypt.setNumberItem(MjClient.KEY_gameBgType + getGameTag(), gameBgType);
}

/** 
 * 永州项目设置背景
 */
function setCurrentGameBgType_yongzhou(gameBgType){
    cc.log("### GameClass[MjClient.gameType]:", GameClass[MjClient.gameType]);
    if ((MjClient.playui || MjClient.goldMatchingui) && typeof(GameClass[MjClient.gameType]) != "undefined") {

        if (COMMON_UI3D.is3DUI()) {
            return util.localStorageEncrypt.setNumberItem(MjClient.KEY_gameBgType_3D, gameBgType);
        }

        if(MjClient.gameType === MjClient.GAME_TYPE.XU_PU_LAO_PAI){
            return util.localStorageEncrypt.setNumberItem(MjClient.KEY_mjTableBgType, gameBgType);
        }


        if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG) { 
            UserSetting_mjTableBgType = gameBgType; 
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_mjTableBgType, gameBgType);
            return;
        } else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.SAN_DA_HA) {
            UserSetting_sdhTableBgType = gameBgType;
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_sdhTableBgType, gameBgType);
            return;
        } else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU) {
            UserSetting_ddzTableBgType = gameBgType;
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ddzTableBgType, gameBgType);
            return;
        } else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI) {
            UserSetting_pdkTableBgType = gameBgType;
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_pdkTableBgType, gameBgType);
            return;
        }else if(MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG){
            UserSetting_daTongZiBgType = gameBgType;
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_daTongZiBgType, gameBgType);
            return;
        }else if(MjClient.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN){
            UserSetting_longHuiBaZhaDan = gameBgType;
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_longHuiBaZhaDanBG, gameBgType);
            return;
        }else if(MjClient.gameType == MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA){
            UserSetting_longHuiBaZhaDan = gameBgType;
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_banBianTianZhaBG, gameBgType);
            return;
        }

        if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
            if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI){
                util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE,  gameBgType);
            }
        }
        if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA ||
            MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI ||
            MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI)
        {
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_GAME_BG_TYPE,  gameBgType);
        }
    } 

    UserSetting_GameBgType = gameBgType;
    util.localStorageEncrypt.setNumberItem(MjClient.KEY_gameBgType, gameBgType);
}

function setCurrentGameBgTypeToNext()
{
    if ((!MjClient.playui&& !MjClient.goldMatchingui) || typeof(GameClass[MjClient.gameType]) == "undefined")
        return;

    var max = 4;

    // 跑得快目前背景只有4种，第五张背景是适配Iphone X的
    if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)
        max = 3;

    for (; max > 0; max --)
    {
        if (getGameBgFile(max) != "")
            break;
    }

    var current = getCurrentGameBgType();
    if (current < max)
        current ++;
    else
        current = 0;

    setCurrentGameBgType(current);
}


/**
 * 获取当前选择的3D麻将特效
 * @return {Number}
 */
function getCurrent3DMJTexiaoType()
{
    return util.localStorageEncrypt.getNumberItem(MjClient.KEY_3DMJTexiaoType, 0);
}

/**
 * 获取当前选择的麻将背景
 * @return {Number}
 */
function getCurrentMJBgType()
{
    if(COMMON_UI3D.is3DUI()) {
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_3DMJBgType + getGameTag(), 0);
    }
    else if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ)
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_MJBgType + getGameTag(), 2);
    else if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ)
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_MJBgType + getGameTag(), 3);
    else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
        if ((MjClient.playui || MjClient.goldMatchingui)&& MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU)
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_MJBgType + getGameTag(), 2);
        else
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_MJBgType + getGameTag(), 1);
    else
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_MJBgType + getGameTag(), 1);
}

/**
 * 永州项目
 * 获取当前选择的麻将背景
 * @return {Number}
 */
function getCurrentMJBgType_yongzhou(){
    if ((!MjClient.playui && !MjClient.goldMatchingui) || GameClass[MjClient.gameType] != MjClient.GAME_CLASS.MA_JIANG) {
        if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZPFontType, 2);
        } else if (MjClient.playui && (MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI || MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI)) {
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_SYZP_CARD_Bg_Type + MjClient.data.pinfo.uid, 2);
        } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG) {
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZPFontType, 1);
        } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ) {
            return util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZPFontType, 1);
        } else {
            return 0;
        }
    }

    if(COMMON_UI3D.is3DUI())
    {
        return util.localStorageEncrypt.getNumberItem(MjClient.KEY_3DMJBgType, 0);
    } else if (UserSetting_MJBgType !== -1) {
        return UserSetting_MJBgType;
    }else if (MjClient.APP_TYPE.QXSYDTZ === MjClient.getAppType() || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG) {
        var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_MJBgType, 1);
        return type == 0 ? 1 : type;
    }else {
        var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_MJBgType, 2);
        return type == 0 ? 2 : type;
    }
}

function setCurrentMJBgType(mjBgType) {
    if ((!MjClient.playui && !MjClient.goldMatchingui) || GameClass[MjClient.gameType] != MjClient.GAME_CLASS.MA_JIANG) {
        util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_ZI_PAI_TYPE, mjBgType); // 重构时的老代码

        if (MjClient.playui && (MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI)) {
            return util.localStorageEncrypt.setNumberItem(MjClient.KEY_SYZP_CARD_Bg_Type + MjClient.data.pinfo.uid, mjBgType);
        } else {
            return util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZPFontType, mjBgType);
        }
    }

    UserSetting_MJBgType = mjBgType;
    util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJBgType, mjBgType);
}

function getCurrentPKImgType() {

    var PKImgType = 0;
    if (isJinZhongAPPType()) {
        if (MjClient.playui &&
            (MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_LV_LIANG ||
            MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN ||　
            MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || 
            MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN)) {
            PKImgType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_PKImgType + getGameTag(), 1);
        }
        else {
            PKImgType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_PKImgType + getGameTag(), 0);
        }
    }
    else {
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ || 
            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP)
        {
            PKImgType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_PKImgType, 0);
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_NT || 
            MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_NT || 
            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || 
            MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
            MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
            MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG || 
            MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY||
            MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_QC)
        {
            PKImgType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_PKImgType + getGameTag(), 0);
        }
        else {
            PKImgType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_PKImgType + getGameTag(), 1);
        }
    }

    if (!isExistPKImg(PKImgType))
        PKImgType = 0;

    return PKImgType;
}

function getCurrentCPBgType() {
    var CPBgType = 0;
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP) {
        CPBgType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_CPBgType + getGameTag(), 0);
    }
    return CPBgType;
}

var loadBgAsync = function(gameBg,imageView,file) {
    gameBg.setVisible(false);

    cc.textureCache.addImageAsync(file,function(texture) {
        if(!cc.sys.isObjectValid(gameBg)){
            return
        }
        gameBg.setVisible(true);
        imageView.loadTexture(file);
    });
}

var setBgTexture = function(gameBg,imageView,file) {
    if (file !== "") {
        var texture = cc.textureCache.getTextureForKey(file);
        if (texture)
            imageView.loadTexture(file);
        else {
            // 预加载游戏背景
            loadBgAsync(gameBg,imageView,file);
        }
    }
    else
        gameBg.setVisible(false);
};

var SettingView = cc.Layer.extend({
	jsBind:{
        _event:{
            roundEnd: function()
            {
                if(cc.sys.isObjectValid(MjClient.setui))
                {
                    MjClient.setui.removeFromParent(true);
                    delete MjClient.setui;
                }
            },
        },
		block:{
			_layout:[[1,1],[0.5,0.5],[0,0],true]
		},
		back:
		{

            _run:function () {
                if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
                    if (settingView.jsonFile == "setting.json")
                        setWgtLayout(this, [0.664,0.625],[0.5,0.5],[0,0]);
					else
                    	setWgtLayout(this, [0, 520 / 720],[1, 0.5],[-0.5 * 1280 / 982, 0]);
                }
                else{
                    setWgtLayout(this, [0.80,0.93],[0.5,0.5],[0,0]);
                }
            },
		    close:{
				_click:function(){
					if (MjClient.playui || MjClient.goldMatchingui) {
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Close", {uid:SelfUid()});
                    }
                    else
						MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Close", {uid:SelfUid()});
				    if(MjClient.setui)
                    {
                        MjClient.setui.removeFromParent(true);
                        MjClient.setui = null;
                    }
				}
			},
			delBtn:{
				_click:function(){
                    //MjClient.delRoom(true);
                    //if(MjClient.setui)
                    //{
                    //    MjClient.setui.removeFromParent(true);
                    //    MjClient.setui = null;
                    //}
                    //MjClient.delRoomTime = new Date().getTime();//记录点击申请解散房间按钮的时间

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
                                //if (!MjClient.enterui && !getClubInfoInTable())
                                //    MjClient.Scene.addChild(new EnterRoomLayer());
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
			exitBtn:
			{
				_visible:MjClient.playui,
				_click:function(){
					if (MjClient.playui || MjClient.goldMatchingui)
						;
					else
                    	MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Qiehuanzhanghao", {uid:SelfUid()});
                   MjClient.logout();
                    if(MjClient.setui)
                    {
                        MjClient.setui.removeFromParent(true);
                        MjClient.setui = null;
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
            Btn_playrule: {
                _visible : false,
                _click: function() {
                    MjClient.openWeb({url:MjClient.gameType,help:true});
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Chakanguize", {uid: SelfUid()});
                }
            },
            Text_ver:
                {
                    _visible:true,
                    _run:function(){
                      this.ignoreContentAdaptWithSize(true);
                      
                      if((MjClient.APP_TYPE.QXYYQP == MjClient.getAppType()|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) &&
                        MjClient.gameType != MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE && MjClient.gameType != MjClient.GAME_TYPE.DA_YE_510K &&
                          MjClient.gameType != MjClient.GAME_TYPE.QI_CHUN_DA_GONG && MjClient.gameType != MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN &&
                        MjClient.gameType != MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI && MjClient.gameType != MjClient.GAME_TYPE.CHONG_YANG_DA_GUN &&
                        MjClient.gameType != MjClient.GAME_TYPE.DA_YE_DA_GONG && MjClient.gameType != MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ) 
                        this.visible = false;

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
                                    if(MjClient.playui || MjClient.goldMatchingui){
                                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Yijianxiufu", {uid:SelfUid()});
                                    }else{
                                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yijianxiufu", {uid:SelfUid()});
                                    }
                                    break;
                                default :
                                    break;
                            }
                        });
                        _fixBtn.setPosition(this.getContentSize().width*0.4, -this.getContentSize().height*2/3);
                        _fixBtn.setScale(0.7);
                        this.addChild(_fixBtn);
                    },
                    _text:function(){
                        return "Ver:" + MjClient.native.GetVersionName() + "(" + MjClient.resVersion + ")";
                    }
                },
			Slider_effect:{
				_run:function(){ this.setPercent(getEffectsVolume()*100); },
				_slider:function(sdr,tp){
					if (MjClient.playui || MjClient.goldMatchingui)
						;
					else
                    	MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinxiao_Yinxiaohuadongtiao", {uid:SelfUid()});
				    setEffectsVolume(this.getPercent()/100);
                    MjClient.setui.noEffect.setSelected(false);
                    // 新版江苏设置音效音乐开关
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
                            MjClient.setui.noEffect.getChildByName("Image_left").setVisible(false);
                            MjClient.setui.noEffect.getChildByName("Image_right").setVisible(true);
                    }
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
				}
			},
			Slider_music:{
				_run:function(){ this.setPercent(setMusicVolume(-1)*100); },
				_slider:function(sdr,tp){
					if (MjClient.playui || MjClient.goldMatchingui)
						;
					else
                    	MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinxiao_Yinxiaohuadongtiao", {uid:SelfUid()});
				    setMusicVolume(this.getPercent()/100);
				    MjClient.setui.noMusic.setSelected(false);
                    // 新版江苏设置音效音乐开关
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ){
                            MjClient.setui.noMusic.getChildByName("Image_left").setVisible(false);
                            MjClient.setui.noMusic.getChildByName("Image_right").setVisible(true);
                    }
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
				}
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
                        if (MjClient.playui || MjClient.goldMatchingui)
                            ;
                        else
                            MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Zhendongkaiguan_Off", {uid:SelfUid()});
                    }else {
                        btn.loadTextureNormal("game_picture/vibrato_on.png");
                        util.localStorageEncrypt.setBoolItem("isVibrato", true);
                        if (MjClient.playui || MjClient.goldMatchingui)
                            ;
                        else
                            MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Zhendongkaiguan_On", {uid:SelfUid()});
                    }
                }
            },
            btn_repotPlayer: {
                _click: function() {
                    MjClient.Scene.addChild(new reportPlayerLayer());
                }
            }
		}


    },
    ctor:function () {
        this._super();

        var jsonFile = "setting.json";
        if (MjClient.playui && typeof(GameClass[MjClient.gameType]) != "undefined" && typeof(GameClassSettingJson[GameClass[MjClient.gameType]]) != "undefined")
        {
            var file = GameClassSettingJson[GameClass[MjClient.gameType]];
            if (jsb.fileUtils.isFileExist(file))
                jsonFile = file;
        }

        this.jsonFile = jsonFile;
        settingView = this;

        var setui = ccs.load(jsonFile);
		BindUiAndLogic(setui.node,this.jsBind);
        this.addChild(setui.node);
		this.spNode = setui.node

		var _back = setui.node.getChildByName("back");
		var puTongHua = _back.getChildByName("voice_1");
        var puTongHua_txt = puTongHua.getChildByName("text")
        this.puTongHua_txt = puTongHua_txt;
        var benDiHua  = _back.getChildByName("voice_2");
        var benDiHua_txt = benDiHua.getChildByName("text")
        this.benDiHua_txt = benDiHua_txt;
        var nodeListHua = [];
        nodeListHua.push( puTongHua );
        nodeListHua.push( benDiHua );
        this._playNode_Hua_radio = createRadioBoxForCheckBoxs(nodeListHua);
        cc.eventManager.addListener(this.setTextClick(nodeListHua,0,this._playNode_Hua_radio),nodeListHua[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(nodeListHua,1,this._playNode_Hua_radio),nodeListHua[1].getChildByName("text"));

        this.noEffect = _back.getChildByName("noEffect");
        this.noMusic = _back.getChildByName("noMusic");
        this.Slider_effect = _back.getChildByName("Slider_effect");
        this.Slider_music = _back.getChildByName("Slider_music");

        this.noEffect.setSelected(util.localStorageEncrypt.getNumberItem("oldEffectVolume", -1) != -1);
        this.noMusic.setSelected(util.localStorageEncrypt.getNumberItem("oldMusicVolume", -1) != -1);

        // 新版江苏设置音效音乐开关
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
            if (util.localStorageEncrypt.getNumberItem("oldEffectVolume", -1) != -1) {
                this.noEffect.getChildByName("Image_left").setVisible(true);
                this.noEffect.getChildByName("Image_right").setVisible(false);
            }
            else {
                this.noEffect.getChildByName("Image_left").setVisible(false);
                this.noEffect.getChildByName("Image_right").setVisible(true);
            }
            if (util.localStorageEncrypt.getNumberItem("oldMusicVolume", -1) != -1) {
                this.noMusic.getChildByName("Image_left").setVisible(true);
                this.noMusic.getChildByName("Image_right").setVisible(false);
            }
            else {
                this.noMusic.getChildByName("Image_left").setVisible(false);
                this.noMusic.getChildByName("Image_right").setVisible(true);
            }
        }

        this.noEffect.addEventListener(function(sender,type)
        {
            if (MjClient.playui || MjClient.goldMatchingui)
                ;
            else
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinxiao_Yinxiaokaiguan", {uid:SelfUid()});
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", this.Slider_effect.getPercent() / 100);
                    this.noEffect.setSelected(true);
                    this.Slider_effect.setPercent(0);
                    setEffectsVolume(0);
                    // 新版江苏设置音效音乐开关
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
                            this.noEffect.getChildByName("Image_left").setVisible(true);
                            this.noEffect.getChildByName("Image_right").setVisible(false);
                    }
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this.noEffect.setSelected(false);
                    var v = util.localStorageEncrypt.getNumberItem("oldEffectVolume", 0);
                    this.Slider_effect.setPercent(v * 100);
                    setEffectsVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                    // 新版江苏设置音效音乐开关
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
                        this.noEffect.getChildByName("Image_left").setVisible(false);
                        this.noEffect.getChildByName("Image_right").setVisible(true);
                    }
                    break;
            }
        },this);

        this.noMusic.addEventListener(function(sender,type)
        {
            if (MjClient.playui || MjClient.goldMatchingui)
                ;
            else
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinyue_Yinyuekaiguan", {uid:SelfUid()});
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", this.Slider_music.getPercent() / 100);
                    this.noMusic.setSelected(true);
                    this.Slider_music.setPercent(0);
                    setMusicVolume(0);
                    // 新版江苏设置音效音乐开关
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
                        this.noMusic.getChildByName("Image_left").setVisible(true);
                        this.noMusic.getChildByName("Image_right").setVisible(false);
                    }
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this.noMusic.setSelected(false);
                    var v = util.localStorageEncrypt.getNumberItem("oldMusicVolume", 0);
                    this.Slider_music.setPercent(v * 100);
                    setMusicVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                    // 新版江苏设置音效音乐开关
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
                        this.noMusic.getChildByName("Image_left").setVisible(false);
                        this.noMusic.getChildByName("Image_right").setVisible(true);
                    }
                    break;
            }
        },this);

        if(MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ){
            COLOR.SETTNG_COLOR_1 = cc.color(94,119,199);
            COLOR.SETTNG_COLOR_2 = cc.color(91,95,128);
        }

        //海安和株洲牛十别隐藏普通话，本地话声音
        if( MjClient.getAppType() === MjClient.APP_TYPE.QXHAIANMJ || 
            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || 
            MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
            MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
            MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN )
        {
            puTongHua.visible = false;
            benDiHua.visible = false;
            benDiHua.setTouchEnabled(false);
        }

        puTongHua.setSelected(true);
        benDiHua.setSelected(false);
        puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
        benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
        benDiHua_txt.ignoreContentAdaptWithSize(true);
        puTongHua_txt.ignoreContentAdaptWithSize(true);
		var voiceType = getCurrentVoiceType();
        // 2018.4.24 几个版本以后这段代码可以删除
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
            // 默认选择普通话，之前用户选择了本地话也重新置为普通话
            var didReset = util.localStorageEncrypt.getBoolItem(MjClient.KEY_voiceType_reset, false)
            if (util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 1) == 1 && didReset == false) {
                util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, 0);
                voiceType = 0;
            }
            util.localStorageEncrypt.setBoolItem(MjClient.KEY_voiceType_reset, true);
        }
        if(voiceType  == 0)
        {
            puTongHua.setSelected(true);
            benDiHua.setSelected(false);
            puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
            benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
        }else{
            puTongHua.setSelected(false);
            benDiHua.setSelected(true);
            benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
            puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
        }

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ)
        {
            var bgMusic1 = _back.getChildByName("gameBgMusic1");
            var bgMusic2 = _back.getChildByName("gameBgMusic2");
            var bgMusic3 = _back.getChildByName("gameBgMusic3");
            var bgMusic1_txt = bgMusic1.getChildByName("text");
            var bgMusic2_txt = bgMusic2.getChildByName("text");
            var bgMusic3_txt = bgMusic3.getChildByName("text");
            this.bgMusic1_txt = bgMusic1_txt;
            this.bgMusic2_txt = bgMusic2_txt;
            this.bgMusic3_txt = bgMusic3_txt;
            var nodeListbgMusic = [];
            nodeListbgMusic.push( bgMusic1 );
            nodeListbgMusic.push( bgMusic2 );
            nodeListbgMusic.push( bgMusic3 );
            this._playNode_bgMusic_radio = createRadioBoxForCheckBoxs(nodeListbgMusic);
            cc.eventManager.addListener(this.setTextClick(nodeListbgMusic,0,this._playNode_bgMusic_radio),nodeListbgMusic[0].getChildByName("text"));
            cc.eventManager.addListener(this.setTextClick(nodeListbgMusic,1,this._playNode_bgMusic_radio),nodeListbgMusic[1].getChildByName("text"));
            cc.eventManager.addListener(this.setTextClick(nodeListbgMusic,2,this._playNode_bgMusic_radio),nodeListbgMusic[2].getChildByName("text"));


            var bgMusicType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_bgMusicType, 0);
            bgMusic1.setSelected(bgMusicType  == 0);
            bgMusic2.setSelected(bgMusicType  == 1);
            bgMusic3.setSelected(bgMusicType  == 2);
            bgMusic1_txt.setTextColor(bgMusicType  == 0 ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
            bgMusic2_txt.setTextColor(bgMusicType  == 1 ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
            bgMusic3_txt.setTextColor(bgMusicType  == 2 ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);

            var bgMusicEventCb = function (sender, type) {
                if (type == ccui.CheckBox.EVENT_SELECTED || type == ccui.CheckBox.EVENT_UNSELECTED)
                {
                    bgMusic1.setSelected(false);
                    bgMusic2.setSelected(false);
                    bgMusic3.setSelected(false);

                    sender.setSelected(true);
                    var bgMusicType;
                    if (sender == bgMusic1)
                        bgMusicType = 0;
                    else if (sender == bgMusic2)
                        bgMusicType = 1;
                    else
                        bgMusicType = 2;

                    bgMusic1_txt.setTextColor(bgMusicType  == 0 ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
                    bgMusic2_txt.setTextColor(bgMusicType  == 1 ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
                    bgMusic3_txt.setTextColor(bgMusicType  == 2 ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);

                    util.localStorageEncrypt.setNumberItem(MjClient.KEY_bgMusicType, bgMusicType);
                    playMusic(getCurrentBgMusicName());
                }
            }
            bgMusic1.addEventListener(bgMusicEventCb, this);
            bgMusic2.addEventListener(bgMusicEventCb, this);
            bgMusic3.addEventListener(bgMusicEventCb, this);
        }

        benDiHua.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    if (MjClient.playui || MjClient.goldMatchingui)
                        ;
                    else
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyin_Bendihua", {uid:SelfUid()});
                    puTongHua.setSelected(false);
                    benDiHua.setSelected(true);
                    benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
                    puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
                    util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, 1);
                    break;
            }
        },this);

        puTongHua.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    if (MjClient.playui || MjClient.goldMatchingui)
                        ;
                    else
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyin_Putonghua", {uid:SelfUid()});
                    puTongHua.setSelected(true);
                    benDiHua.setSelected(false);
                    puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
                    benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
                    util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, 0);
                    break;
            }
        },this);

        var gameBgText = _back.getChildByName("gameBg");
        if (gameBgText)
            gameBgText.ignoreContentAdaptWithSize(true);

        var MJBgText = _back.getChildByName("MJBg");
        if (MJBgText)
            MJBgText.ignoreContentAdaptWithSize(true);

        var pokerText = _back.getChildByName("poker");
        if (pokerText)
            pokerText.ignoreContentAdaptWithSize(true);

        // 桌面背景设置：
        var nodeListgameBg = [];
        for (var i = 0; true; i ++)
        {
            var gameBg = _back.getChildByName("gameBg" + (i + 1));
            if (!gameBg)
                break;

            var file = getGameBgFile(i);
            if(i == 1 && MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU)
            {
                file = getGameBgFile(4);
            }

            setBgTexture(gameBg,gameBg.getChildByName("Image_" + (i + 1)),file)

            nodeListgameBg.push(gameBg);
        }
        this._playNode_gameBg_radio = createRadioBoxForCheckBoxs(nodeListgameBg);
        for (var i = 0; i < nodeListgameBg.length; i ++)
        {
            var image_node = nodeListgameBg[i].getChildByName("Image_" + (i + 1));
            cc.eventManager.addListener(this.setTextClick(nodeListgameBg, i, this._playNode_gameBg_radio), image_node);
            var text_node = nodeListgameBg[i].getChildByName("text");
            if (text_node)
                cc.eventManager.addListener(this.setTextClick(nodeListgameBg, i, this._playNode_gameBg_radio), text_node);
        }

        var gameBgEventCb = function (sender, type) {
            if (type == ccui.CheckBox.EVENT_SELECTED || type == ccui.CheckBox.EVENT_UNSELECTED)
            {
                var gameBgType = 0;
                for (var i = 0; i < nodeListgameBg.length; i ++)
                {
                    nodeListgameBg[i].setSelected(sender == nodeListgameBg[i]);
                    if (sender == nodeListgameBg[i]){
                        gameBgType = i;
                        // 新版江苏选中颜色设置
                        if (nodeListgameBg[i].getChildByName("text") &&
                            (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
                             MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                             MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
                             MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                             MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
                             MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ)) {
                                nodeListgameBg[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_1);
                        }
                    }
                    else {
                        // 新版江苏选中颜色设置
                        if (nodeListgameBg[i].getChildByName("text") &&
                            (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
                             MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                             MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
                             MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                             MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ)) {
                                nodeListgameBg[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_2);
                        }
                    }
                }

                setCurrentGameBgType(gameBgType);
                postEvent("changeGameBgEvent");
            }
        }

        var gameBgType = getCurrentGameBgType();
        for (var i = 0; i < nodeListgameBg.length; i ++)
        {
            nodeListgameBg[i].setSelected(gameBgType == i);
            nodeListgameBg[i].addEventListener(gameBgEventCb, this);
            // 新版江苏选中颜色设置
            if ((MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) && gameBgType == i && nodeListgameBg[i].getChildByName("text")) {
                    nodeListgameBg[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_1);
            }
        }

        // 麻将背景设置：
        var nodeListMJBg = [];
        for (var i = 0; true; i ++)
        {
            var MJBg = _back.getChildByName("MJBg" + (i + 1));
            if (!MJBg)
                break;

            nodeListMJBg.push(MJBg);
        }
        this._playNode_MJBg_radio = createRadioBoxForCheckBoxs(nodeListMJBg);
        for (var i = 0; i < nodeListMJBg.length; i ++)
        {
            cc.eventManager.addListener(this.setTextClick(nodeListMJBg, i, this._playNode_MJBg_radio), nodeListMJBg[i].getChildByName("Image"));
            var text_node = nodeListMJBg[i].getChildByName("text");
            if (text_node)
                cc.eventManager.addListener(this.setTextClick(nodeListMJBg, i, this._playNode_MJBg_radio), text_node);
        }

        var MJBgEventCb = function (sender, type) {
            if (type == ccui.CheckBox.EVENT_SELECTED || type == ccui.CheckBox.EVENT_UNSELECTED)
            {
                var type = 0;
                for (var i = 0; i < nodeListMJBg.length; i ++)
                {
                    nodeListMJBg[i].setSelected(sender == nodeListMJBg[i]);
                    if (sender == nodeListMJBg[i]){
                        type = i;
                        // 新版江苏选中颜色设置
                        if ( (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) && nodeListMJBg[i].getChildByName("text")) {
                                nodeListMJBg[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_1);
                        }
                    }
                    else {
                        // 新版江苏选中颜色设置
                        if ((MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) && nodeListMJBg[i].getChildByName("text")) {
                            nodeListMJBg[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_2);
                        }
                    }
                }

                if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ)
                {
                    if (type == 0)
                        type = 3;
                }
                util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJBgType + getGameTag(), type);
                postEvent("changeMJBgEvent", type);
            }
        }

        var MJBgType = getCurrentMJBgType();
        cc.log("MJBgType = " + MJBgType);
        for (var i = 0; i < nodeListMJBg.length; i ++)
        {
            if (i == 0 && MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ)
                nodeListMJBg[i].setSelected(MJBgType == 3);
            else
                nodeListMJBg[i].setSelected(MJBgType == i);
            // 新版江苏选中颜色设置
            if ((MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) && MJBgType == i && nodeListMJBg[i].getChildByName("text")) {
                    nodeListMJBg[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_1);
            }
            nodeListMJBg[i].addEventListener(MJBgEventCb, this);
        }

        // 扑克牌设置：
        var nodeListPKImg = [];
        for (var i = 0; true; i ++)
        {
            var PKImg = _back.getChildByName("pokerImg" + (i + 1));
            if (!PKImg)
                break;

            nodeListPKImg.push(PKImg);
        }
        
        this._playNode_PKImg_radio = createRadioBoxForCheckBoxs(nodeListPKImg);
        for (var i = 0; i < nodeListPKImg.length; i ++)
        {
            cc.eventManager.addListener(this.setTextClick(nodeListPKImg, i, this._playNode_PKImg_radio), nodeListPKImg[i].getChildByName("Image"));
            var text_node = nodeListPKImg[i].getChildByName("text");
            if (text_node)
                cc.eventManager.addListener(this.setTextClick(nodeListPKImg, i, this._playNode_PKImg_radio), text_node);
        }

        var PKImgEventCb = function (sender, type) {
            if (type == ccui.CheckBox.EVENT_SELECTED || type == ccui.CheckBox.EVENT_UNSELECTED)
            {
                var type = 0;
                for (var i = 0; i < nodeListPKImg.length; i ++)
                {
                    nodeListPKImg[i].setSelected(sender == nodeListPKImg[i]);
                    if (sender == nodeListPKImg[i])
                        type = i;
                }

                util.localStorageEncrypt.setNumberItem(MjClient.KEY_PKImgType + getGameTag(), type);
                postEvent("changePKImgEvent", type);
            }
        }

        var PKImgType = getCurrentPKImgType();
        cc.log("PKImgType = " + PKImgType);
        for (var i = 0; i < nodeListPKImg.length; i ++)
        {
            nodeListPKImg[i].setSelected(PKImgType == i);
            nodeListPKImg[i].addEventListener(PKImgEventCb, this);
        }

        // 株洲牛十别禁止设置牌面
        if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE || 
            MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
            MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
            MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ) {
            for (var i = 0; i < nodeListPKImg.length; i ++)
            {
                nodeListPKImg[i].setVisible(false)
            }

            var pokerLabel = _back.getChildByName("poker");
            if (pokerLabel)
                pokerLabel.setVisible(false);
        }

        // 声音设置：
        var soundTypes = [];
        var newSound = _back.getChildByName("newSound");
        var oldSound = _back.getChildByName("oldSound");
        if(newSound && oldSound){
            soundTypes.push(newSound);
            soundTypes.push(oldSound);
            var self = this;
            this.soundTypes = createRadioBoxForCheckBoxs(soundTypes,function(index, sender, list){
                var uid = SelfUid();
                util.localStorageEncrypt.setNumberItem(self._soundTypeKey + "_" + uid, index);
            });
            cc.eventManager.addListener(this.setTextClick(soundTypes,0,this.soundTypes),soundTypes[0].getChildByName("text"));
            cc.eventManager.addListener(this.setTextClick(soundTypes,1,this.soundTypes),soundTypes[1].getChildByName("text"));
        }

        // 自动准备
        var autoReadyCheckBox = _back.getChildByName("autoReady");
        if (autoReadyCheckBox) {
            var autoReadyText = autoReadyCheckBox.getChildByName("text");
            autoReadyText.ignoreContentAdaptWithSize(true);

            var isAutoRelay = currentIsAutoRelay();
            autoReadyCheckBox.setSelected(isAutoRelay);
            autoReadyText.setTextColor(isAutoRelay ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);

            var autoReadyCallback = function() {
                var isAutoRelay = autoReadyCheckBox.isSelected();
                autoReadyText.setTextColor(isAutoRelay ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
                util.localStorageEncrypt.setBoolItem(MjClient.KEY_autoRelay, isAutoRelay);
            }

            autoReadyCheckBox.addEventListener(function(sender,type)
            {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        autoReadyCallback();
                        break;
                }
            },this);
            cc.eventManager.addListener(this.setTextClick(null, null, null, autoReadyCallback), autoReadyText);
        }

		MjClient.setui=this;
		//cc.log("machao_data "+JSON.stringify(MjClient.data));
        return true;
    },
    //创建房间 点击范围扩大 使得文字也能点击
    setTextClick:function (listnode,number,radio,callback)
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
                            // 新版江苏选中颜色设置
                            if ((MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
                                MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                                MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
                                MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                                MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) && listnode[i].getChildByName("text")) {
                                    listnode[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_1);
                            }
                        }else{
                            listnode[i].setSelected(false);
                            // 新版江苏选中颜色设置
                            if ((MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
                                MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                                MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
                                MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                                MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) && listnode[i].getChildByName("text")) {
                                    listnode[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_2);
                            }
                        }
                    }
                    // gameBgEventCb  this._playNode_gameBg_radio
                    if (radio == that._playNode_gameBg_radio) {
                         cc.log(" ======= sender  gameBg",number);
                        var gameBgType = number;
                        setCurrentGameBgType(gameBgType);
                        postEvent("changeGameBgEvent");
                    }
                    // _playNode_MJBg_radio
                    if (radio == that._playNode_MJBg_radio) {
                         cc.log(" ======= sender  MJBg  ",number);
                        var type = number;

                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ)
                        {
                            if (type == 0)
                                type = 3;
                        }

                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJBgType + getGameTag(), type);
                        postEvent("changeMJBgEvent", type);
                    }

                    if (radio == that._playNode_PKImg_radio) {
                        var type = number;
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_PKImgType + getGameTag(), type);
                        postEvent("changePKImgEvent", type);
                    }


                    // _playNode_Hua_radio
                    if (radio == that._playNode_Hua_radio) {
                         cc.log(" ======= sender  Hua  ",number);
                        if (number == 0) {
                            that.puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
                            that.benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
                            util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, 0);

                            if (MjClient.playui || MjClient.goldMatchingui)
                                ;
                            else
                                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyin_Putonghua", {uid:SelfUid()});
                        }
                        if (number == 1) {
                            that.benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
                            that.puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
                            util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, 1);

                            if (MjClient.playui || MjClient.goldMatchingui)
                                ;
                            else
                                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyin_Bendihua", {uid:SelfUid()});
                        }
                    }
                    // _playNode_bgMusic_radio
                    if (radio == that._playNode_bgMusic_radio) {
                         cc.log(" ======= sender  bgMusic  ",number);
                    var bgMusicType = number;

                    that.bgMusic1_txt.setTextColor(bgMusicType  == 0 ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
                    that.bgMusic2_txt.setTextColor(bgMusicType  == 1 ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
                    that.bgMusic3_txt.setTextColor(bgMusicType  == 2 ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);

                    util.localStorageEncrypt.setNumberItem(MjClient.KEY_bgMusicType, bgMusicType);
                    playMusic(getCurrentBgMusicName());

                    }

                }else{
                    // 如果触碰起始地点在本区域中
                    if(!cc.rectContainsPoint(target.getBoundingBox(), pos))
                        return;

                    target.parent.setSelected(!target.parent.isSelected());
                    if (callback)
                        callback();
                }

            }
        });
    },
    onEnter:function ()
	{
        this._super();
        this.isShowOpenPos();

       	if (this.getName() == "HomeClick")
       	{
       		this.jsBind.back.exitBtn._node.visible = true;
       		this.jsBind.back.exitBtn._node.setEnabled(true);
       		this.jsBind.back.delBtn._node.visible= false;
       		this.jsBind.back.delBtn._node.setEnabled(false);
       	}
		else if(this.getName() == "PlayLayerClick")
       	{
       		var sData=MjClient.data.sData;
			var tData=sData.tData;
			//cc.log("machao_data "+JSON.stringify(MjClient.data));
       		//cc.log("machao_tdata "+JSON.stringify(tData));

       		this.jsBind.back.exitBtn._node.visible = false;
       		this.jsBind.back.exitBtn._node.setEnabled(false);

            //增加CD时间10s
            this.jsBind.back.delBtn._node.visible = true;
            var text = new ccui.Text();
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {//岳阳同一使用方正兰亭
                text.setFontName("fonts/lanting.TTF");
            }
            text.setTextColor(cc.color(123,78,63));
            text.setFontSize(32);
            text.setString("");
            text.setPosition(94,98);
            // 新版江苏解散房间位置设置
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
                text.setPosition(-150,48);
            }
            text.setName("textString");
            this.jsBind.back.delBtn._node.addChild(text);
            if (cc.isUndefined(MjClient.delRoomTime))
            {
                MjClient.delRoomTime = 0;
            }
            this.jsBind.back.delBtn._node.schedule(function()
            {
                var time = (new Date().getTime()) - MjClient.delRoomTime;
                time = parseInt(time/1000);
                if (time >= 10)
                {
                    if(cc.sys.isObjectValid(MjClient.setui ))
                    {
                        MjClient.setui.jsBind.back.delBtn._node.setEnabled(true);
                        text.setString("");
                    }

                }
                else
                {
                    if(cc.sys.isObjectValid(MjClient.setui )){
                        MjClient.setui.jsBind.back.delBtn._node.setEnabled(false);
                        text.setString((10-time).toString() + "秒后可再次申请");
                    }
                }
            });
            if(tData.matchId || tData.fieldId){
                this.jsBind.back.delBtn._node.visible = false;
                MjClient.setui.jsBind.back.delBtn._node.setEnabled(false);
            }
       	}
	},
    //是否显示开启定位
    isShowOpenPos :function()
    {
        var btn_openPosition = this.jsBind.back.btn_openPosition._node;
        var btn_openImpower = this.jsBind.back.btn_openImpower._node;

        if (!btn_openPosition || !btn_openImpower ||
            !cc.sys.isObjectValid(btn_openPosition) ||
            !cc.sys.isObjectValid(btn_openImpower))
            return;

        if (!isCurrentNativeVersionBiggerThan("11.0.0"))
        {
            btn_openPosition.visible = false;
            btn_openImpower.visible = false;
            return;
        }

        if (this.getName() == "HomeClick")
        {
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
        }
        else if(this.getName() == "PlayLayerClick")
        {
            btn_openPosition.visible = false;
            btn_openImpower.visible = false;
        }
    }
});


var SettingViewCard = cc.Layer.extend({
    jsBind:{
        block:{
            _layout:[[1,1],[0.5,0.5],[0,0],true]
        },
        back:
            {	_layout:[[MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ? 1.0 :0.80,MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ? 1.0: 0.93],[0.5,0.5],[0,0]],
                close:{
                    _click:function(){
                        if(MjClient.setui)
                        {
                            MjClient.setui.removeFromParent(true);
                            MjClient.setui = null;
                        }
                    }
                },
                delBtn:{
                    _click:function(){
                        //MjClient.delRoom(true);
                        //if(MjClient.setui)
                        //{
                        //    MjClient.setui.removeFromParent(true);
                        //    MjClient.setui = null;
                        //}
                        //MjClient.delRoomTime = new Date().getTime();//记录点击申请解散房间按钮的时间

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
                                    //if (!MjClient.enterui && !getClubInfoInTable())
                                    //    MjClient.Scene.addChild(new EnterRoomLayer());
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
                }
                ,
                exitBtn:
                    {
                        _visible:MjClient.playui,
                        _click:function(){
                            MjClient.logout();
                            if(MjClient.setui)
                            {
                                MjClient.setui.removeFromParent(true);
                                MjClient.setui = null;
                            }
                        }
                    },
                Btn_playrule: {
                    _visible : false,
                    _click: function() {
                        MjClient.openWeb({url:MjClient.gameType,help:true});
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Chakanguize", {uid: SelfUid()});
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
                            this.setPositionY(this.getPositionY()+this.getContentSize().height);
                            //  一键修复按钮
                            var _fixBtn = new ccui.Button();
                            _fixBtn.loadTextureNormal("game_picture/yijianxiufu.png");
                            _fixBtn.loadTexturePressed("game_picture/yijianxiufu_p.png");
                            _fixBtn.addTouchEventListener(function(sender,Type){
                                switch (Type)
                                {
                                    case ccui.Widget.TOUCH_ENDED:
                                        removeUpdataDirectory();
                                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Yijianxiufu", {uid:SelfUid()});
                                        break;
                                    default :
                                        break;
                                }
                            });
                            _fixBtn.setPosition(this.getContentSize().width/2, -this.getContentSize().height*2/3);
                            _fixBtn.setScale(0.7);
                            this.addChild(_fixBtn);
                        },
                        _text:function(){
                            return "Ver:" + MjClient.native.GetVersionName() + "(" + MjClient.resVersion + ")";
                        }
                    },
                Slider_effect:{
                    _run:function(){ this.setPercent(getEffectsVolume()*100); },
                    _slider:function(sdr,tp){
                        setEffectsVolume(this.getPercent()/100);
                        MjClient.setui.noEffect.setSelected(false);
                        // 新版江苏设置音效音乐开关
                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
                            MjClient.setui.noEffect.getChildByName("Image_left").setVisible(false);
                            MjClient.setui.noEffect.getChildByName("Image_right").setVisible(true);
                        }
                        util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                    }
                },
                Slider_music:{
                    _run:function(){ this.setPercent(setMusicVolume(-1)*100); },
                    _slider:function(sdr,tp){
                        setMusicVolume(this.getPercent()/100);
                        MjClient.setui.noMusic.setSelected(false);
                        // 新版江苏设置音效音乐开关
                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
                            MjClient.setui.noMusic.getChildByName("Image_left").setVisible(false);
                            MjClient.setui.noMusic.getChildByName("Image_right").setVisible(true);
                        }
                        util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                    }
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
    ctor:function () {
        this._super();

        var jsonFile = "setting.json";
        if (MjClient.playui && typeof(GameClass[MjClient.gameType]) != "undefined" && typeof(GameClassSettingJson[GameClass[MjClient.gameType]]) != "undefined")
        {
            var file = GameClassSettingJson[GameClass[MjClient.gameType]];
            if (jsb.fileUtils.isFileExist(file))
                jsonFile = file;
        }

        var setui = ccs.load(jsonFile);
        BindUiAndLogic(setui.node,this.jsBind);
        this.addChild(setui.node);
        this.spNode = setui.node
        settingView = this;

        var _back = setui.node.getChildByName("back");
        var puTongHua = _back.getChildByName("voice_1");
        var puTongHua_txt = puTongHua.getChildByName("text")
        this.puTongHua_txt = puTongHua_txt;
        var benDiHua  = _back.getChildByName("voice_2");
        var benDiHua_txt = benDiHua.getChildByName("text")
        this.benDiHua_txt = benDiHua_txt;
        var nodeListHua = [];
        nodeListHua.push( puTongHua );
        nodeListHua.push( benDiHua );
        this._playNode_Hua_radio = createRadioBoxForCheckBoxs(nodeListHua);
        cc.eventManager.addListener(this.setTextClick(nodeListHua,0,this._playNode_Hua_radio),nodeListHua[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(nodeListHua,1,this._playNode_Hua_radio),nodeListHua[1].getChildByName("text"));

        this.noEffect = _back.getChildByName("noEffect");
        this.noMusic = _back.getChildByName("noMusic");
        this.Slider_effect = _back.getChildByName("Slider_effect");
        this.Slider_music = _back.getChildByName("Slider_music");

        this.noEffect.setSelected(util.localStorageEncrypt.getNumberItem("oldEffectVolume", -1) != -1);
        this.noMusic.setSelected(util.localStorageEncrypt.getNumberItem("oldMusicVolume", -1) != -1);

        // 新版江苏设置音效音乐开关
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
            if (util.localStorageEncrypt.getNumberItem("oldEffectVolume", -1) != -1) {
                this.noEffect.getChildByName("Image_left").setVisible(true);
                this.noEffect.getChildByName("Image_right").setVisible(false);
            }
            else {
                this.noEffect.getChildByName("Image_left").setVisible(false);
                this.noEffect.getChildByName("Image_right").setVisible(true);
            }
            if (util.localStorageEncrypt.getNumberItem("oldMusicVolume", -1) != -1) {
                this.noMusic.getChildByName("Image_left").setVisible(true);
                this.noMusic.getChildByName("Image_right").setVisible(false);
            }
            else {
                this.noMusic.getChildByName("Image_left").setVisible(false);
                this.noMusic.getChildByName("Image_right").setVisible(true);
            }
        }

        this.noEffect.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinxiaokaiguan", {uid:SelfUid()});
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", this.Slider_effect.getPercent() / 100);
                    this.noEffect.setSelected(true);
                    this.Slider_effect.setPercent(0);
                    setEffectsVolume(0);
                    // 新版江苏设置音效音乐开关
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
                        this.noEffect.getChildByName("Image_left").setVisible(true);
                        this.noEffect.getChildByName("Image_right").setVisible(false);
                    }
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinxiaokaiguan", {uid:SelfUid()});
                    this.noEffect.setSelected(false);
                    var v = util.localStorageEncrypt.getNumberItem("oldEffectVolume", 0);
                    this.Slider_effect.setPercent(v * 100);
                    setEffectsVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                    // 新版江苏设置音效音乐开关
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
                        this.noEffect.getChildByName("Image_left").setVisible(false);
                        this.noEffect.getChildByName("Image_right").setVisible(true);
                    }
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
                    // 新版江苏设置音效音乐开关
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
                        this.noMusic.getChildByName("Image_left").setVisible(true);
                        this.noMusic.getChildByName("Image_right").setVisible(false);
                    }
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinyuekaiguan", {uid:SelfUid()});
                    this.noMusic.setSelected(false);
                    var v = util.localStorageEncrypt.getNumberItem("oldMusicVolume", 0);
                    this.Slider_music.setPercent(v * 100);
                    setMusicVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                    // 新版江苏设置音效音乐开关
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
                        this.noMusic.getChildByName("Image_left").setVisible(false);
                        this.noMusic.getChildByName("Image_right").setVisible(true);
                    }
                    break;
            }
        },this);

        if(MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ){
            COLOR.SETTNG_COLOR_1 = cc.color(94,119,199);
            COLOR.SETTNG_COLOR_2 = cc.color(91,95,128);
        }

        //海安隐藏普通话，本地话声音
        if( MjClient.getAppType() === MjClient.APP_TYPE.QXHAIANMJ)
        {
            puTongHua.visible = false;
            benDiHua.visible = false;
            benDiHua.setTouchEnabled(false);
        }




        puTongHua.setSelected(true);
        benDiHua.setSelected(false);
        puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
        benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
        benDiHua_txt.ignoreContentAdaptWithSize(true);
        puTongHua_txt.ignoreContentAdaptWithSize(true);
        var voiceType = getCurrentVoiceType();
        // 2018.4.24 几个版本以后这段代码可以删除
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
            // 默认选择普通话，之前用户选择了本地话也重新置为普通话
            var didReset = util.localStorageEncrypt.getBoolItem(MjClient.KEY_voiceType_reset, false)
            if (util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 1) == 1 && didReset == false) {
                util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, 0);
                voiceType = 0;
            }
            util.localStorageEncrypt.setBoolItem(MjClient.KEY_voiceType_reset, true);
        }
        if(voiceType  == 0)
        {
            puTongHua.setSelected(true);
            benDiHua.setSelected(false);
            puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
            benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
        }else{
            puTongHua.setSelected(false);
            benDiHua.setSelected(true);
            benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
            puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
        }

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ)
        {
            var bgMusic1 = _back.getChildByName("gameBgMusic1");
            var bgMusic2 = _back.getChildByName("gameBgMusic2");
            var bgMusic3 = _back.getChildByName("gameBgMusic3");
            var bgMusic1_txt = bgMusic1.getChildByName("text");
            var bgMusic2_txt = bgMusic2.getChildByName("text");
            var bgMusic3_txt = bgMusic3.getChildByName("text");
            this.bgMusic1_txt = bgMusic1_txt;
            this.bgMusic2_txt = bgMusic2_txt;
            this.bgMusic3_txt = bgMusic3_txt;
            var nodeListbgMusic = [];
            nodeListbgMusic.push( bgMusic1 );
            nodeListbgMusic.push( bgMusic2 );
            nodeListbgMusic.push( bgMusic3 );
            this._playNode_bgMusic_radio = createRadioBoxForCheckBoxs(nodeListbgMusic);
            cc.eventManager.addListener(this.setTextClick(nodeListbgMusic,0,this._playNode_bgMusic_radio),nodeListbgMusic[0].getChildByName("text"));
            cc.eventManager.addListener(this.setTextClick(nodeListbgMusic,1,this._playNode_bgMusic_radio),nodeListbgMusic[1].getChildByName("text"));
            cc.eventManager.addListener(this.setTextClick(nodeListbgMusic,2,this._playNode_bgMusic_radio),nodeListbgMusic[2].getChildByName("text"));


            var bgMusicType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_bgMusicType, 0);
            bgMusic1.setSelected(bgMusicType  == 0);
            bgMusic2.setSelected(bgMusicType  == 1);
            bgMusic3.setSelected(bgMusicType  == 2);
            bgMusic1_txt.setTextColor(bgMusicType  == 0 ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
            bgMusic2_txt.setTextColor(bgMusicType  == 1 ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
            bgMusic3_txt.setTextColor(bgMusicType  == 2 ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);

            var bgMusicEventCb = function (sender, type) {
                if (type == ccui.CheckBox.EVENT_SELECTED || type == ccui.CheckBox.EVENT_UNSELECTED)
                {
                    bgMusic1.setSelected(false);
                    bgMusic2.setSelected(false);
                    bgMusic3.setSelected(false);

                    sender.setSelected(true);
                    var bgMusicType;
                    if (sender == bgMusic1)
                        bgMusicType = 0;
                    else if (sender == bgMusic2)
                        bgMusicType = 1;
                    else
                        bgMusicType = 2;

                    bgMusic1_txt.setTextColor(bgMusicType  == 0 ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
                    bgMusic2_txt.setTextColor(bgMusicType  == 1 ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
                    bgMusic3_txt.setTextColor(bgMusicType  == 2 ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);

                    util.localStorageEncrypt.setNumberItem(MjClient.KEY_bgMusicType, bgMusicType);
                    playMusic(getCurrentBgMusicName());
                }
            }
            bgMusic1.addEventListener(bgMusicEventCb, this);
            bgMusic2.addEventListener(bgMusicEventCb, this);
            bgMusic3.addEventListener(bgMusicEventCb, this);
        }

        benDiHua.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    puTongHua.setSelected(false);
                    benDiHua.setSelected(true);
                    benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
                    puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
                    util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, 1);
                    break;
            }
        },this);

        puTongHua.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    puTongHua.setSelected(true);
                    benDiHua.setSelected(false);
                    puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
                    benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
                    util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, 0);
                    break;
            }
        },this);

        var gameBgText = _back.getChildByName("gameBg");
        if (gameBgText)
            gameBgText.ignoreContentAdaptWithSize(true);

        var MJBgText = _back.getChildByName("MJBg");
        if (MJBgText)
            MJBgText.ignoreContentAdaptWithSize(true);

        var pokerText = _back.getChildByName("poker");
        if (pokerText)
            pokerText.ignoreContentAdaptWithSize(true);

        // 桌面背景设置：
        var nodeListgameBg = [];
        for (var i = 0; true; i ++)
        {
            var gameBg = _back.getChildByName("gameBg" + (i + 1));
            if (!gameBg)
                break;

            var file = getGameBgFile(i);
            setBgTexture(gameBg,gameBg.getChildByName("Image_" + (i + 1)),file);

            nodeListgameBg.push(gameBg);
        }
        this._playNode_gameBg_radio = createRadioBoxForCheckBoxs(nodeListgameBg);
        for (var i = 0; i < nodeListgameBg.length; i ++)
        {
            var image_node = nodeListgameBg[i].getChildByName("Image_" + (i + 1));
            cc.eventManager.addListener(this.setTextClick(nodeListgameBg, i, this._playNode_gameBg_radio), image_node);
            var text_node = nodeListgameBg[i].getChildByName("text");
            if (text_node)
                cc.eventManager.addListener(this.setTextClick(nodeListgameBg, i, this._playNode_gameBg_radio), text_node);
        }

        var gameBgEventCb = function (sender, type) {
            if (type == ccui.CheckBox.EVENT_SELECTED || type == ccui.CheckBox.EVENT_UNSELECTED)
            {
                var gameBgType = 0;
                for (var i = 0; i < nodeListgameBg.length; i ++)
                {
                    nodeListgameBg[i].setSelected(sender == nodeListgameBg[i]);
                    if (sender == nodeListgameBg[i])
                        gameBgType = i;
                }

                setCurrentGameBgType(gameBgType);
                postEvent("changeGameBgEvent");
            }
        }

        var gameBgType = getCurrentGameBgType();
        for (var i = 0; i < nodeListgameBg.length; i ++)
        {
            nodeListgameBg[i].setSelected(gameBgType == i);
            nodeListgameBg[i].addEventListener(gameBgEventCb, this);
        }

        // 麻将背景设置：
        var nodeListMJBg = [];
        for (var i = 0; true; i ++)
        {
            var MJBg = _back.getChildByName("MJBg" + (i + 1));
            if (!MJBg)
                break;

            nodeListMJBg.push(MJBg);
        }
        this._playNode_MJBg_radio = createRadioBoxForCheckBoxs(nodeListMJBg);
        for (var i = 0; i < nodeListMJBg.length; i ++)
        {
            cc.eventManager.addListener(this.setTextClick(nodeListMJBg, i, this._playNode_MJBg_radio), nodeListMJBg[i].getChildByName("Image"));
            var text_node = nodeListMJBg[i].getChildByName("text");
            if (text_node)
                cc.eventManager.addListener(this.setTextClick(nodeListMJBg, i, this._playNode_MJBg_radio), text_node);
        }

        var MJBgEventCb = function (sender, type) {
            if (type == ccui.CheckBox.EVENT_SELECTED || type == ccui.CheckBox.EVENT_UNSELECTED)
            {
                var type = 0;
                for (var i = 0; i < nodeListMJBg.length; i ++)
                {
                    nodeListMJBg[i].setSelected(sender == nodeListMJBg[i]);
                    if (sender == nodeListMJBg[i])
                        type = i;
                }

                if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ)
                {
                    if (type == 0)
                        type = 3;
                }

                util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJBgType + getGameTag(), type);
                postEvent("changeMJBgEvent", type);
            }
        }

        var MJBgType = getCurrentMJBgType();
        cc.log("MJBgType = " + MJBgType);
        for (var i = 0; i < nodeListMJBg.length; i ++)
        {
            if (i == 0 && MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ)
                nodeListMJBg[i].setSelected(MJBgType == 3);
            else
                nodeListMJBg[i].setSelected(MJBgType == i);
            nodeListMJBg[i].addEventListener(MJBgEventCb, this);
        }

        // 扑克牌设置：
        var nodeListPKImg = [];
        for (var i = 0; true; i ++)
        {
            var PKImg = _back.getChildByName("pokerImg" + (i + 1));
            if (!PKImg)
                break;

            nodeListPKImg.push(PKImg);
        }
        this._playNode_PKImg_radio = createRadioBoxForCheckBoxs(nodeListPKImg);
        for (var i = 0; i < nodeListPKImg.length; i ++)
        {
            cc.eventManager.addListener(this.setTextClick(nodeListPKImg, i, this._playNode_PKImg_radio), nodeListPKImg[i].getChildByName("Image"));
            var text_node = nodeListPKImg[i].getChildByName("text");
            if (text_node){
                text_node.ignoreContentAdaptWithSize(true)
                cc.eventManager.addListener(this.setTextClick(nodeListPKImg, i, this._playNode_PKImg_radio), text_node);
            }
        }

        var PKImgEventCb = function (sender, type) {
            if (type == ccui.CheckBox.EVENT_SELECTED || type == ccui.CheckBox.EVENT_UNSELECTED)
            {
                var type = 0;
                for (var i = 0; i < nodeListPKImg.length; i ++)
                {
                    nodeListPKImg[i].setSelected(sender == nodeListPKImg[i]);
                    if (sender == nodeListPKImg[i])
                        type = i;
                }

                util.localStorageEncrypt.setNumberItem(MjClient.KEY_PKImgType + getGameTag(), type);
                postEvent("changePKImgEvent", type);
            }
        }

        var PKImgType = getCurrentPKImgType();
        cc.log("PKImgType = " + PKImgType);
        for (var i = 0; i < nodeListPKImg.length; i ++)
        {
            nodeListPKImg[i].setSelected(PKImgType == i);
            nodeListPKImg[i].addEventListener(PKImgEventCb, this);
        }

        // 自动准备
        var autoReadyCheckBox = _back.getChildByName("autoReady");
        if (autoReadyCheckBox) {
            var autoReadyText = autoReadyCheckBox.getChildByName("text");
            autoReadyText.ignoreContentAdaptWithSize(true);

            var isAutoRelay = currentIsAutoRelay();
            autoReadyCheckBox.setSelected(isAutoRelay);
            autoReadyText.setTextColor(isAutoRelay ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);

            var autoReadyCallback = function() {
                var isAutoRelay = autoReadyCheckBox.isSelected();
                autoReadyText.setTextColor(isAutoRelay ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
                util.localStorageEncrypt.setBoolItem(MjClient.KEY_autoRelay, isAutoRelay);
            }

            autoReadyCheckBox.addEventListener(function(sender,type)
            {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        autoReadyCallback();
                        break;
                }
            },this);
            cc.eventManager.addListener(this.setTextClick(null, null, null, autoReadyCallback), autoReadyText);
        }

        MjClient.setui=this;
        //cc.log("machao_data "+JSON.stringify(MjClient.data));
        return true;
    },
    //创建房间 点击范围扩大 使得文字也能点击
    setTextClick:function (listnode,number,radio,callback)
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
                    // gameBgEventCb  this._playNode_gameBg_radio
                    if (radio == that._playNode_gameBg_radio) {
                        cc.log(" ======= sender  gameBg",number);
                        var gameBgType = number;
                        setCurrentGameBgType(gameBgType);
                        postEvent("changeGameBgEvent");
                    }
                    // _playNode_MJBg_radio
                    if (radio == that._playNode_MJBg_radio) {
                        cc.log(" ======= sender  MJBg  ",number);
                        var type = number;

                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ)
                        {
                            if (type == 0)
                                type = 3;
                        }

                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJBgType + getGameTag(), type);
                        postEvent("changeMJBgEvent", type);
                    }

                    if (radio == that._playNode_PKImg_radio) {
                        var type = number;
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_PKImgType + getGameTag(), type);
                        postEvent("changePKImgEvent", type);
                    }

                    // _playNode_Hua_radio
                    if (radio == that._playNode_Hua_radio) {
                        cc.log(" ======= sender  Hua  ",number);
                        if (number == 0) {
                            that.puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
                            that.benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
                            util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, 0);
                        }
                        if (number == 1) {
                            that.benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
                            that.puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
                            util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, 1);
                        }
                    }
                    // _playNode_bgMusic_radio
                    if (radio == that._playNode_bgMusic_radio) {
                        cc.log(" ======= sender  bgMusic  ",number);
                        var bgMusicType = number;

                        that.bgMusic1_txt.setTextColor(bgMusicType  == 0 ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
                        that.bgMusic2_txt.setTextColor(bgMusicType  == 1 ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
                        that.bgMusic3_txt.setTextColor(bgMusicType  == 2 ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);

                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_bgMusicType, bgMusicType);
                        playMusic(getCurrentBgMusicName());

                    }

                }else{
                    // 如果触碰起始地点在本区域中
                    if(!cc.rectContainsPoint(target.getBoundingBox(), pos))
                        return;

                    target.parent.setSelected(!target.parent.isSelected());
                    if (callback)
                        callback();
                }

            }
        });
    },
    onEnter:function ()
    {
        this._super();
        if (this.getName() == "HomeClick")
        {
            this.jsBind.back.exitBtn._node.visible = true;
            this.jsBind.back.exitBtn._node.setEnabled(true);
            this.jsBind.back.delBtn._node.visible= false;
            this.jsBind.back.delBtn._node.setEnabled(false);
        }
        else if(this.getName() == "PlayLayerClick")
        {
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            //cc.log("machao_data "+JSON.stringify(MjClient.data));
            //cc.log("machao_tdata "+JSON.stringify(tData));

            this.jsBind.back.exitBtn._node.visible = false;
            this.jsBind.back.exitBtn._node.setEnabled(false);

            //增加CD时间10s
            this.jsBind.back.delBtn._node.visible = true;
            var text = new ccui.Text();
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {//岳阳同一使用方正兰亭
                text.setFontName("fonts/lanting.TTF");
            }
            text.setTextColor(cc.color(123,78,63));
            text.setFontSize(32);
            text.setString("");
            text.setPosition(94,98);
            // 新版江苏解散房间位置设置
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
                    text.setPosition(-150,48);
            }
            text.setName("textString");
            this.jsBind.back.delBtn._node.addChild(text);
            if (cc.isUndefined(MjClient.delRoomTime))
            {
                MjClient.delRoomTime = 0;
            }
            this.jsBind.back.delBtn._node.schedule(function()
            {
                var time = (new Date().getTime()) - MjClient.delRoomTime;
                time = parseInt(time/1000);
                if (time >= 10)
                {
                    if(cc.sys.isObjectValid(MjClient.setui ))
                    {
                        MjClient.setui.jsBind.back.delBtn._node.setEnabled(true);
                        text.setString("");
                    }

                }
                else
                {
                    if(cc.sys.isObjectValid(MjClient.setui )){
                        MjClient.setui.jsBind.back.delBtn._node.setEnabled(false);
                        text.setString((10-time).toString() + "秒后可再次申请");
                    }
                }
            });
            if(tData.matchId || tData.fieldId){
                this.jsBind.back.delBtn._node.visible = false;
                MjClient.setui.jsBind.back.delBtn._node.setEnabled(false);
            }
        }
    }
});

// 南通房间内长牌设置界面
var SettingView_NTChangPai = cc.Layer.extend({
    jsBind:{
        block:{
            _layout:[[1,1],[0.5,0.5],[0,0],true]
        },
        back:
        {

            _run:function () {
                if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
                    if (settingView.jsonFile == "setting.json")
                        setWgtLayout(this, [0.664,0.625],[0.5,0.5],[0,0]);
                    else
                        setWgtLayout(this, [0, 520 / 720],[1, 0.5],[-0.5 * 1280 / 982, 0]);
                }
                else{
                    setWgtLayout(this, [0.80,0.93],[0.5,0.5],[0,0]);
                }
            },
            close:{
                _click:function(){
                    if(MjClient.setui)
                    {
                        MjClient.setui.removeFromParent(true);
                        MjClient.setui = null;
                    }
                }
            },
            delBtn:{
                _click:function(){
                    //MjClient.delRoom(true);
                    //if(MjClient.setui)
                    //{
                    //    MjClient.setui.removeFromParent(true);
                    //    MjClient.setui = null;
                    //}
                    //MjClient.delRoomTime = new Date().getTime();//记录点击申请解散房间按钮的时间

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
                                //if (!MjClient.enterui && !getClubInfoInTable())
                                //    MjClient.Scene.addChild(new EnterRoomLayer());
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
            }
            ,
            exitBtn:
            {
                _visible:MjClient.playui,
                _click:function(){
                   MjClient.logout();
                    if(MjClient.setui)
                    {
                        MjClient.setui.removeFromParent(true);
                        MjClient.setui = null;
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
            Btn_playrule: {
                _visible : false,
                _click: function() {
                    MjClient.openWeb({url:MjClient.gameType,help:true});
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Chakanguize", {uid: SelfUid()});
                }
            },
            Text_ver:
                {
                    _visible:true,
                    _run:function(){
                      this.ignoreContentAdaptWithSize(true);
                      if(MjClient.APP_TYPE.QXYYQP == MjClient.getAppType() || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) this.visible = false;
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
                                    if(MjClient.playui || MjClient.goldMatchingui){
                                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Yijianxiufu", {uid:SelfUid()});
                                    }else{
                                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yijianxiufu", {uid:SelfUid()});
                                    }
                                    break;
                                default :
                                    break;
                            }
                        });
                        _fixBtn.setPosition(this.getContentSize().width*0.4, -this.getContentSize().height*2/3);
                        _fixBtn.setScale(0.7);
                        this.addChild(_fixBtn);
                    },
                    _text:function(){
                        return "Ver:" + MjClient.native.GetVersionName() + "(" + MjClient.resVersion + ")";
                    }
                },
            Slider_effect:{
                _run:function(){ this.setPercent(getEffectsVolume()*100); },
                _slider:function(sdr,tp){
                    setEffectsVolume(this.getPercent()/100);
                    MjClient.setui.noEffect.setSelected(false);
                    // 新版南通设置音效音乐开关
                    MjClient.setui.noEffect.getChildByName("Image_left").setVisible(false);
                    MjClient.setui.noEffect.getChildByName("Image_right").setVisible(true);

                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                }
            },
            Slider_music:{
                _run:function(){ this.setPercent(setMusicVolume(-1)*100); },
                _slider:function(sdr,tp){
                    setMusicVolume(this.getPercent()/100);
                    MjClient.setui.noMusic.setSelected(false);
                    // 新版南通设置音效音乐开关
                    MjClient.setui.noMusic.getChildByName("Image_left").setVisible(false);
                    MjClient.setui.noMusic.getChildByName("Image_right").setVisible(true);

                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                }
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
    ctor:function () {
        this._super();

        var jsonFile = "setting_changpai.json";
        if (MjClient.playui && typeof(GameClass[MjClient.gameType]) != "undefined" && typeof(GameClassSettingJson[GameClass[MjClient.gameType]]) != "undefined")
        {
            var file = GameClassSettingJson[GameClass[MjClient.gameType]];
            if (jsb.fileUtils.isFileExist(file))
                jsonFile = file;
        }

        this.jsonFile = jsonFile;
        settingView = this;

        var setui = ccs.load(jsonFile);
        BindUiAndLogic(setui.node,this.jsBind);
        this.addChild(setui.node);
        this.spNode = setui.node

        var _back = setui.node.getChildByName("back");
        var puTongHua = _back.getChildByName("voice_1");
        var puTongHua_txt = puTongHua.getChildByName("text")
        this.puTongHua_txt = puTongHua_txt;
        var benDiHua  = _back.getChildByName("voice_2");
        var benDiHua_txt = benDiHua.getChildByName("text")
        this.benDiHua_txt = benDiHua_txt;
        var nodeListHua = [];
        nodeListHua.push( puTongHua );
        nodeListHua.push( benDiHua );
        this._playNode_Hua_radio = createRadioBoxForCheckBoxs(nodeListHua);
        cc.eventManager.addListener(this.setTextClick(nodeListHua,0,this._playNode_Hua_radio),nodeListHua[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(nodeListHua,1,this._playNode_Hua_radio),nodeListHua[1].getChildByName("text"));

        this.noEffect = _back.getChildByName("noEffect");
        this.noMusic = _back.getChildByName("noMusic");
        this.Slider_effect = _back.getChildByName("Slider_effect");
        this.Slider_music = _back.getChildByName("Slider_music");

        this.noEffect.setSelected(util.localStorageEncrypt.getNumberItem("oldEffectVolume", -1) != -1);
        this.noMusic.setSelected(util.localStorageEncrypt.getNumberItem("oldMusicVolume", -1) != -1);

        // 新版南通设置音效音乐开关
        if (util.localStorageEncrypt.getNumberItem("oldEffectVolume", -1) != -1) {
            this.noEffect.getChildByName("Image_left").setVisible(true);
            this.noEffect.getChildByName("Image_right").setVisible(false);
        }
        else {
            this.noEffect.getChildByName("Image_left").setVisible(false);
            this.noEffect.getChildByName("Image_right").setVisible(true);
        }
        if (util.localStorageEncrypt.getNumberItem("oldMusicVolume", -1) != -1) {
            this.noMusic.getChildByName("Image_left").setVisible(true);
            this.noMusic.getChildByName("Image_right").setVisible(false);
        }
        else {
            this.noMusic.getChildByName("Image_left").setVisible(false);
            this.noMusic.getChildByName("Image_right").setVisible(true);
        }

        this.noEffect.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinxiaokaiguan", {uid:SelfUid()});
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", this.Slider_effect.getPercent() / 100);
                    this.noEffect.setSelected(true);
                    this.Slider_effect.setPercent(0);
                    setEffectsVolume(0);
                    // 新版南通设置音效音乐开关
                    this.noEffect.getChildByName("Image_left").setVisible(true);
                    this.noEffect.getChildByName("Image_right").setVisible(false);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinxiaokaiguan", {uid:SelfUid()});
                    this.noEffect.setSelected(false);
                    var v = util.localStorageEncrypt.getNumberItem("oldEffectVolume", 0);
                    this.Slider_effect.setPercent(v * 100);
                    setEffectsVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                    // 新版南通设置音效音乐开关
                    this.noEffect.getChildByName("Image_left").setVisible(false);
                    this.noEffect.getChildByName("Image_right").setVisible(true);
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
                    // 新版南通设置音效音乐开关
                    this.noMusic.getChildByName("Image_left").setVisible(true);
                    this.noMusic.getChildByName("Image_right").setVisible(false);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinyuekaiguan", {uid:SelfUid()});
                    this.noMusic.setSelected(false);
                    var v = util.localStorageEncrypt.getNumberItem("oldMusicVolume", 0);
                    this.Slider_music.setPercent(v * 100);
                    setMusicVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                    // 新版南通设置音效音乐开关
                    this.noMusic.getChildByName("Image_left").setVisible(false);
                    this.noMusic.getChildByName("Image_right").setVisible(true);
                    break;
            }
        },this);

        puTongHua.setSelected(true);
        benDiHua.setSelected(false);
        puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
        benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
        benDiHua_txt.ignoreContentAdaptWithSize(true);
        puTongHua_txt.ignoreContentAdaptWithSize(true);
        var voiceType = getCurrentVoiceType();

        if(voiceType  == 0)
        {
            puTongHua.setSelected(true);
            benDiHua.setSelected(false);
            puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
            benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
        }else{
            puTongHua.setSelected(false);
            benDiHua.setSelected(true);
            benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
            puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
        }

        benDiHua.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    puTongHua.setSelected(false);
                    benDiHua.setSelected(true);
                    benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
                    puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
                    util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, 1);
                    break;
            }
        },this);

        puTongHua.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    puTongHua.setSelected(true);
                    benDiHua.setSelected(false);
                    puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
                    benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
                    util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, 0);
                    break;
            }
        },this);

        var gameBgText = _back.getChildByName("gameBg");
        if (gameBgText)
            gameBgText.ignoreContentAdaptWithSize(true);

        var CPBgText = _back.getChildByName("CPBg");
        if (CPBgText)
            CPBgText.ignoreContentAdaptWithSize(true);


        // 桌面背景设置：
        var nodeListgameBg = [];
        for (var i = 0; true; i ++)
        {
            var gameBg = _back.getChildByName("gameBg" + (i + 1));
            if (!gameBg)
                break;

            var file = getGameBgFile(i);
            if (file != "")
                gameBg.getChildByName("Image_" + (i + 1)).loadTexture(file);
            else
                gameBg.setVisible(false);

            nodeListgameBg.push(gameBg);
        }
        this._playNode_gameBg_radio = createRadioBoxForCheckBoxs(nodeListgameBg);
        for (var i = 0; i < nodeListgameBg.length; i ++)
        {
            var image_node = nodeListgameBg[i].getChildByName("Image_" + (i + 1));
            cc.eventManager.addListener(this.setTextClick(nodeListgameBg, i, this._playNode_gameBg_radio), image_node);
            var text_node = nodeListgameBg[i].getChildByName("text");
            if (text_node)
                cc.eventManager.addListener(this.setTextClick(nodeListgameBg, i, this._playNode_gameBg_radio), text_node);
        }

        var gameBgEventCb = function (sender, type) {
            if (type == ccui.CheckBox.EVENT_SELECTED || type == ccui.CheckBox.EVENT_UNSELECTED)
            {
                var gameBgType = 0;
                for (var i = 0; i < nodeListgameBg.length; i ++)
                {
                    nodeListgameBg[i].setSelected(sender == nodeListgameBg[i]);
                    if (sender == nodeListgameBg[i]){
                        gameBgType = i;
                        if (nodeListgameBg[i].getChildByName("text")) {
                            nodeListgameBg[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_1);
                        }
                    }
                    else {
                        if (nodeListgameBg[i].getChildByName("text")) {
                            nodeListgameBg[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_2);
                        }
                    }
                }

                setCurrentGameBgType(gameBgType);
                postEvent("changeGameBgEvent");
            }
        }
        var gameBgType = getCurrentGameBgType();
        for (var i = 0; i < nodeListgameBg.length; i ++)
        {
            nodeListgameBg[i].setSelected(gameBgType == i);
            nodeListgameBg[i].addEventListener(gameBgEventCb, this);
            if (gameBgType == i && nodeListgameBg[i].getChildByName("text")) {
                nodeListgameBg[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_1);
            }
        }

        // 长牌背景设置：
        var nodeListCPBg = [];
        for (var i = 0; true; i ++)
        {
            var CPBg = _back.getChildByName("CPBg" + (i + 1));
            if (!CPBg)
                break;
            nodeListCPBg.push(CPBg);
        }
        this._playNode_CPBg_radio = createRadioBoxForCheckBoxs(nodeListCPBg);
        for (var i = 0; i < nodeListCPBg.length; i ++)
        {
            cc.eventManager.addListener(this.setTextClick(nodeListCPBg, i, this._playNode_CPBg_radio), nodeListCPBg[i].getChildByName("Image"));
            var text_node = nodeListCPBg[i].getChildByName("text");
            if (text_node)
                cc.eventManager.addListener(this.setTextClick(nodeListCPBg, i, this._playNode_CPBg_radio), text_node);
        }

        var CPBgEventCb = function (sender, type) {
            if (type == ccui.CheckBox.EVENT_SELECTED || type == ccui.CheckBox.EVENT_UNSELECTED)
            {
                var type = 0;
                for (var i = 0; i < nodeListCPBg.length; i ++)
                {
                    nodeListCPBg[i].setSelected(sender == nodeListCPBg[i]);
                    if (sender == nodeListCPBg[i]){
                        type = i;
                        if (nodeListCPBg[i].getChildByName("text")) {
                            nodeListCPBg[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_1);
                        }
                    }
                    else {
                        if (nodeListCPBg[i].getChildByName("text")) {
                            nodeListCPBg[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_2);
                        }
                    }
                }
                util.localStorageEncrypt.setNumberItem(MjClient.KEY_CPBgType + getGameTag(), type);
                postEvent("changeCPBgEvent", type);
            }
        }

        var CPBgType = getCurrentCPBgType();
        cc.log("CPBgType = " + CPBgType);
        for (var i = 0; i < nodeListCPBg.length; i ++)
        {
            nodeListCPBg[i].setSelected(CPBgType == i);
            if (CPBgType == i && nodeListCPBg[i].getChildByName("text")) {
                nodeListCPBg[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_1);
            }
            nodeListCPBg[i].addEventListener(CPBgEventCb, this);
        }

        // 自动准备
        var autoReadyCheckBox = _back.getChildByName("autoReady");
        if (autoReadyCheckBox) {
            var autoReadyText = autoReadyCheckBox.getChildByName("text");
            autoReadyText.ignoreContentAdaptWithSize(true);

            var isAutoRelay = currentIsAutoRelay();
            autoReadyCheckBox.setSelected(isAutoRelay);
            autoReadyText.setTextColor(isAutoRelay ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);

            var autoReadyCallback = function() {
                var isAutoRelay = autoReadyCheckBox.isSelected();
                autoReadyText.setTextColor(isAutoRelay ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
                util.localStorageEncrypt.setBoolItem(MjClient.KEY_autoRelay, isAutoRelay);
            }

            autoReadyCheckBox.addEventListener(function(sender,type)
            {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        autoReadyCallback();
                        break;
                }
            },this);
            cc.eventManager.addListener(this.setTextClick(null, null, null, autoReadyCallback), autoReadyText);
        }

        MjClient.setui=this;
        //cc.log("machao_data "+JSON.stringify(MjClient.data));
        return true;
    },
    // 点击范围扩大 使得文字也能点击
    setTextClick:function (listnode,number,radio,callback)
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
                            // 新版南通选中颜色设置
                            if (listnode[i].getChildByName("text")) {
                                listnode[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_1);
                            }
                        }else{
                            listnode[i].setSelected(false);
                            // 新版南通选中颜色设置
                            if (listnode[i].getChildByName("text")) {
                                listnode[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_2);
                            }
                        }
                    }
                    // gameBgEventCb  this._playNode_gameBg_radio
                    if (radio == that._playNode_gameBg_radio) {
                         cc.log(" ======= sender  gameBg",number);
                        var gameBgType = number;
                        setCurrentGameBgType(gameBgType);
                        postEvent("changeGameBgEvent");

                    }
                    // _playNode_MJBg_radio
                    if (radio == that._playNode_CPBg_radio) {
                         cc.log(" ======= sender  CPBg  ",number);
                        var type = number;
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_CPBgType + getGameTag(), type);
                        postEvent("changeCPBgEvent", type);
                    }
                    // _playNode_Hua_radio
                    if (radio == that._playNode_Hua_radio) {
                         cc.log(" ======= sender  Hua  ",number);
                        if (number == 0) {
                            that.puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
                            that.benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
                            util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, 0);
                        }
                        if (number == 1) {
                            that.benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
                            that.puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
                            util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, 1);
                        }
                    }
                    // _playNode_bgMusic_radio
                    if (radio == that._playNode_bgMusic_radio) {
                         cc.log(" ======= sender  bgMusic  ",number);
                    var bgMusicType = number;

                    that.bgMusic1_txt.setTextColor(bgMusicType  == 0 ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
                    that.bgMusic2_txt.setTextColor(bgMusicType  == 1 ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
                    that.bgMusic3_txt.setTextColor(bgMusicType  == 2 ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);

                    util.localStorageEncrypt.setNumberItem(MjClient.KEY_bgMusicType, bgMusicType);
                    playMusic(getCurrentBgMusicName());

                    }

                }else{
                    // 如果触碰起始地点在本区域中
                    if(!cc.rectContainsPoint(target.getBoundingBox(), pos))
                        return;

                    target.parent.setSelected(!target.parent.isSelected());
                    if (callback)
                        callback();
                }

            }
        });
    },
    onEnter:function ()
    {
        this._super();
        this.isShowOpenPos();

        if (this.getName() == "HomeClick")
        {
            this.jsBind.back.exitBtn._node.visible = true;
            this.jsBind.back.exitBtn._node.setEnabled(true);
            this.jsBind.back.delBtn._node.visible= false;
            this.jsBind.back.delBtn._node.setEnabled(false);
        }
        else if(this.getName() == "PlayLayerClick")
        {
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            //cc.log("machao_data "+JSON.stringify(MjClient.data));
            //cc.log("machao_tdata "+JSON.stringify(tData));

            this.jsBind.back.exitBtn._node.visible = false;
            this.jsBind.back.exitBtn._node.setEnabled(false);

            //增加CD时间10s
            this.jsBind.back.delBtn._node.visible = true;
            var text = new ccui.Text();

            text.setTextColor(cc.color(123,78,63));
            text.setFontSize(32);
            text.setString("");
            text.setPosition(-150,48);
            text.setName("textString");
            this.jsBind.back.delBtn._node.addChild(text);
            if (cc.isUndefined(MjClient.delRoomTime))
            {
                MjClient.delRoomTime = 0;
            }
            this.jsBind.back.delBtn._node.schedule(function()
            {
                var time = (new Date().getTime()) - MjClient.delRoomTime;
                time = parseInt(time/1000);
                if (time >= 10)
                {
                    if(cc.sys.isObjectValid(MjClient.setui ))
                    {
                        MjClient.setui.jsBind.back.delBtn._node.setEnabled(true);
                        text.setString("");
                    }

                }
                else
                {
                    if(cc.sys.isObjectValid(MjClient.setui )){
                        MjClient.setui.jsBind.back.delBtn._node.setEnabled(false);
                        text.setString((10-time).toString() + "秒后可再次申请");
                    }
                }
            });
            if(tData.matchId || tData.fieldId){
                this.jsBind.back.delBtn._node.visible = false;
                MjClient.setui.jsBind.back.delBtn._node.setEnabled(false);
            }
        }
    },
    //是否显示开启定位
    isShowOpenPos :function()
    {
        var btn_openPosition = this.jsBind.back.btn_openPosition._node;
        var btn_openImpower = this.jsBind.back.btn_openImpower._node;

        if (!btn_openPosition || !btn_openImpower)
            return;

        if (!isCurrentNativeVersionBiggerThan("11.0.0"))
        {
            btn_openPosition.visible = false;
            btn_openImpower.visible = false;
            return;
        }

        if (this.getName() == "HomeClick")
        {
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
        }
        else if(this.getName() == "PlayLayerClick")
        {
            btn_openPosition.visible = false;
            btn_openImpower.visible = false;
        }
    }
});

// 江苏, 淮安, 徐州 大厅设置界面
var HomeSettingView = cc.Layer.extend({
    jsBind:{
        block:{
            _layout:[[1,1],[0.5,0.5],[0,0],true]
        },
        back:{
            _layout:[[0.7,0.7],[0.50,0.50],[0,0]],
            close:{
                _click: function () {
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Close", {uid:SelfUid()});
                    var languageIndex = 0;
                    if(MjClient.homeSetUi.CheckBoxMandarin.isSelected())
                    {
                        languageIndex = 0;
                    }else if(MjClient.homeSetUi.CheckBoxDialect.isSelected()) {
                        languageIndex = 1;
                    }
                    util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, languageIndex);

                    if(MjClient.homeSetUi)
                    {
                        MjClient.homeSetUi.removeFromParent(true);
                        MjClient.homeSetUi = null;
                    }
                }
            },
            ExitGame:{
                _click:function(){
                    showExitGameLayer();
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
            fixBtn:{
                _visible:true,
                _run:function(){
                    if (MjClient.isShenhe === true) {
                        this.setVisible(false);
                    }
                },
                _click:function () {
                    removeUpdataDirectory();
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yijianxiufu", {uid:SelfUid()});
                }
            },
            SliderVoice:{
                _run: function () {
                    this.setPercent(getEffectsVolume()*100);
                },
                _slider:function(sdr,tp){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinxiao_Yinxiaohuadongtiao", {uid:SelfUid()});
                    setEffectsVolume(this.getPercent()/100);
                    MjClient.homeSetUi.CheckBoxVoice.setSelected(false);
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                }
            },
            SliderMusic:{
                _run:function(){
                    this.setPercent(setMusicVolume(-1)*100);
                },
                _slider:function(sdr,tp){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinyue_Yinyuehuadongtiao", {uid:SelfUid()});
                    setMusicVolume(this.getPercent()/100);
                    MjClient.homeSetUi.CheckBoxMusic.setSelected(false);
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                }
            },
            SliderSpeak:{
                _run:function(){ this.setPercent(getSpeakVolume()*100); },
                _slider:function(sdr,tp){
                    setSpeakVolume(this.getPercent()/100);
                    MjClient.homeSetUi.CheckBoxSpeak.setSelected(false);
                    util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyin_Yuyinhuadongtiao", {uid: SelfUid()});
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
                    MjClient.Scene.addChild(new reportPlayerLayer());
                }
            }
        }
    },
    ctor: function () {
        this._super();
        var homeSetUi = ccs.load("setting_home.json");
        var _back = homeSetUi.node.getChildByName("back");

        this.SliderMusic = _back.getChildByName("SliderMusic");
        this.SliderVoice = _back.getChildByName("SliderVoice");
        this.CheckBoxMusic = _back.getChildByName("CheckBoxMusic");   // noMusic
        this.CheckBoxVoice = _back.getChildByName("CheckBoxVoice");   // noVoice
        this.SliderSpeak = _back.getChildByName("SliderSpeak");
        this.CheckBoxSpeak = _back.getChildByName("CheckBoxSpeak");   // noSpeak
        this.CheckBoxMandarin = _back.getChildByName("CheckBoxMandarin");  // 普通话
        this.CheckBoxDialect = _back.getChildByName("CheckBoxDialect");  // 本地话
        this.CheckBoxPrepare = _back.getChildByName("CheckBoxPrepare"); // 自动准备
        this.CheckBoxShark = _back.getChildByName("CheckBoxShark"); // 震动

        MjClient.homeSetUi = this;
        BindUiAndLogic(homeSetUi.node, this.jsBind);
        this.addChild(homeSetUi.node);

        this.CheckBoxMusic.setSelected(util.localStorageEncrypt.getNumberItem("oldMusicVolume", -1) != -1);
        this.CheckBoxVoice.setSelected(util.localStorageEncrypt.getNumberItem("oldEffectVolume", -1) != -1);

        this.CheckBoxMusic.addEventListener(function (sender, type) {
            MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinyue_Yinyuekaiguan", {uid:SelfUid()});
            switch (type){
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", this.SliderMusic.getPercent() / 100);
                    this.CheckBoxMusic.setSelected(true);
                    this.SliderMusic.setPercent(0);
                    setMusicVolume(0);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var v = util.localStorageEncrypt.getNumberItem("oldMusicVolume", 0);
                    this.CheckBoxMusic.setSelected(false);
                    cc.log("==============v " + v);
                    this.SliderMusic.setPercent(v * 100);
                    setMusicVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                    break;
            }
        }, this);


        this.CheckBoxVoice.addEventListener(function(sender,type)
        {
            MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinxiao_Yinxiaokaiguan", {uid:SelfUid()});
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", this.SliderVoice.getPercent() / 100);
                    this.CheckBoxVoice.setSelected(true);
                    this.SliderVoice.setPercent(0);
                    setEffectsVolume(0);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var v = util.localStorageEncrypt.getNumberItem("oldEffectVolume", 0);
                    this.CheckBoxVoice.setSelected(false);
                    this.SliderVoice.setPercent(v * 100);
                    setEffectsVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                    break;
            }
        },this);
        
        if (this.CheckBoxSpeak) {
            this.CheckBoxSpeak.setSelected(util.localStorageEncrypt.getNumberItem("oldSpeakVolume", -1) != -1);
            this.CheckBoxSpeak.addEventListener(function(sender, type) {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        util.localStorageEncrypt.setNumberItem("oldSpeakVolume", this.SliderSpeak.getPercent() / 100);
                        this.CheckBoxSpeak.setSelected(true);
                        this.SliderSpeak.setPercent(0);
                        setSpeakVolume(0);
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        var v = util.localStorageEncrypt.getNumberItem("oldSpeakVolume", 0);
                        this.CheckBoxSpeak.setSelected(false);
                        this.SliderSpeak.setPercent(v * 100);
                        setSpeakVolume(v);
                        util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                        break;
                }
            }, this);
        }

        // 自动准备
        var autoReadyCheckBox = this.CheckBoxPrepare;
        if (autoReadyCheckBox) {
            var autoReadyText = autoReadyCheckBox.getChildByName("text");
            autoReadyText.ignoreContentAdaptWithSize(true);
            var isAutoRelay = currentIsAutoRelay();
            autoReadyCheckBox.setSelected(isAutoRelay);
            autoReadyText.setTextColor(isAutoRelay ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);

            var autoReadyCallback = function() {
                var isAutoRelay = autoReadyCheckBox.isSelected();
                autoReadyText.setTextColor(isAutoRelay ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
                util.localStorageEncrypt.setBoolItem(MjClient.KEY_autoRelay, isAutoRelay);
            };

            autoReadyCheckBox.addEventListener(function(sender,type)
            {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        autoReadyCallback();
                        break;
                }
            },this);
            cc.eventManager.addListener(this.setTextClick(null, null, null, autoReadyCallback), autoReadyText);
        }

        // 震动
        var sharkCheckBox = this.CheckBoxShark;
        var isVibrato = util.localStorageEncrypt.getBoolItem("isVibrato", true);
        if (sharkCheckBox) {
            var sharkText = sharkCheckBox.getChildByName("text");
            sharkText.ignoreContentAdaptWithSize(true);
            sharkCheckBox.setSelected(isVibrato);
            sharkText.setTextColor(isVibrato ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);

            var sharkCallback = function() {
                var isVibrato = sharkCheckBox.isSelected();
                sharkText.setTextColor(isVibrato ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
                util.localStorageEncrypt.setBoolItem("isVibrato", isVibrato);
                if(isVibrato){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Zhendongkaiguan_Off", {uid:SelfUid()});
                }else {
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Zhendongkaiguan_On", {uid:SelfUid()});
                }
            };

            sharkCheckBox.addEventListener(function(sender,type)
            {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        sharkCallback();
                        break;
                }
            },this);
            cc.eventManager.addListener(this.setTextClick(null, null, null, sharkCallback), sharkText);
        }


        //注册checkBox，以及txt事件
        var listHua = [];
        listHua.push(this.CheckBoxMandarin);
        listHua.push(this.CheckBoxDialect);
        this._playNode_voice_radio = createRadioBoxForCheckBoxs(listHua, this.radioBoxSelectCB);
        this.addListenerText(listHua,this._playNode_voice_radio, function(index) {
            if (index == 0)
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyin_Putonghua", {uid:SelfUid()});
            else
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyin_Bendihua", {uid:SelfUid()});
        });

        //加载默认语音类型
        var voiceType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 0);
        this._playNode_voice_radio.selectItem(voiceType);
        this.radioBoxSelectCB(voiceType, listHua[voiceType], listHua);


        return true;
    },
    onEnter: function(){
        this._super();
        this.isShowOpenPos();
    },
    //是否显示开启定位
    isShowOpenPos :function() {
        var btn_openPosition = this.jsBind.back.btn_openPosition._node;
        var btn_openImpower = this.jsBind.back.btn_openImpower._node;

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
    addListenerText: function(node, radio, callback) {
        if (node && radio) {
            for (var i = 0; i < node.length; i++) {
                node[i].getChildByName("text").ignoreContentAdaptWithSize(true);
                cc.eventManager.addListener(this.setTextClick(node, i, radio, callback), node[i].getChildByName("text"));
            }
        } else if (callback) {
            node.getChildByName("text").ignoreContentAdaptWithSize(true);
            cc.eventManager.addListener(this.setTextClick(null, null, null, callback), node.getChildByName("text"));
        }else {
            node.getChildByName("text").ignoreContentAdaptWithSize(true);
            cc.eventManager.addListener(this.setTextClick(), node.getChildByName("text"));
        }
    },
    radioBoxSelectCB: function(index, sender, list) {
        if (sender) {
            var txt = sender.getChildByName("text");
            txt.setTextColor(COLOR.SETTNG_COLOR_1);
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var radioBox = list[i];
                if (radioBox !== sender || sender.isSelected() == false) {
                    txt = radioBox.getChildByName("text");
                    txt.setTextColor(COLOR.SETTNG_COLOR_2);
                }
            }

            if (list == MjClient.homeSetUi._playNode_voice_radio._nodeList) {
                if (index == 0)
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyin_Putonghua", {uid:SelfUid()});
                else
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyin_Bendihua", {uid:SelfUid()});
            }
        }
    },
    setTextClick: function(listnode, number, radio, callback) {
        var that = this;
        var _callback = callback || function(){};
        return cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event) {
                var target = event.getCurrentTarget();
                var parent = target;
                for (; parent; parent = parent.parent) {
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
                if (!cc.rectContainsPoint(box, pos)) {
                    return false;
                }
                return true;
            },
            onTouchEnded: function(touch, event) {
                var target = event.getCurrentTarget();
                var pos = target.getParent().convertTouchToNodeSpace(touch); // 世界坐标转换 (子节点相对于父节点的位置)
                if (listnode) {
                    for (var i = 0; i < listnode.length; i++) {
                        if (i == number) {
                            listnode[i].setSelected(true);
                            var txt = listnode[i].getChildByName("text");
                            txt.setTextColor(COLOR.SETTNG_COLOR_1);
                            txt.ignoreContentAdaptWithSize(true);
                            radio.selectItem(i);
                        } else {
                            listnode[i].setSelected(false);
                            var txt = listnode[i].getChildByName("text");
                            txt.setTextColor(COLOR.SETTNG_COLOR_2);
                            txt.ignoreContentAdaptWithSize(true);
                        }
                    }

                    if(radio == that.language_radio){
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, number);
                    }

                } else {
                    // 如果触碰起始地点在本区域中
                    if (!cc.rectContainsPoint(target.getBoundingBox(), pos))
                        return;

                    target.parent.setSelected(!target.parent.isSelected());

                    var txt = target.parent.getChildByName("text");
                    txt.ignoreContentAdaptWithSize(true);
                    if (txt && target.parent.isSelected()) {
                        txt.setTextColor(COLOR.SETTNG_COLOR_1);
                    } else {
                        txt.setTextColor(COLOR.SETTNG_COLOR_2);
                    }
                }

                _callback(number);

            }
        });
    }
});

// 山西，大厅设置界面  - by Tom
var HomeSettingView_shanxi = cc.Layer.extend({
    jsBind:{
        block:{
            _layout:[[1,1],[0.5,0.5],[0,0],true]
        },
        back:{
            _layout:[[0.7,0.7],[0.50,0.55],[0,0]],
            close:{
                _click: function () {
                	MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Close", {uid:SelfUid()});
                    var languageIndex = 0;
                    if(MjClient.homeSetUi.CheckBoxMandarin.isSelected())
                    {
                        languageIndex = 0;
                    }else if(MjClient.homeSetUi.CheckBoxDialect.isSelected()) {
                        languageIndex = 1;
                    }
                    util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, languageIndex);

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
            fixBtn:{
                _visible:true,
                _run:function(){
                    if (MjClient.isShenhe === true) {
                        this.setVisible(false);
                    }
                },
                _click:function () {
                    removeUpdataDirectory();
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yijianxiufu", {uid:SelfUid()});
                }
            },
            di1:{
                SliderVoice:{
                    _run: function () {
                        this.setPercent(getEffectsVolume()*100);
                    },
                    _slider:function(sdr,tp){
                    	MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinxiao_Yinxiaohuadongtiao", {uid:SelfUid()});
                        setEffectsVolume(this.getPercent()/100);
                        MjClient.homeSetUi.CheckBoxVoice.setSelected(false);
                        util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                    }
                },
                SliderMusic:{
                    _run:function(){
                        this.setPercent(setMusicVolume(-1)*100);
                    },
                    _slider:function(sdr,tp){
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinyue_Yinyuehuadongtiao", {uid:SelfUid()});
                        setMusicVolume(this.getPercent()/100);
                        MjClient.homeSetUi.CheckBoxMusic.setSelected(false);
                        util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                    }
                },
                SliderSpeak:{
                    _run:function(){ this.setPercent(getSpeakVolume()*100); },
                    _slider:function(sdr,tp){
                        setSpeakVolume(this.getPercent()/100);
                        MjClient.homeSetUi.CheckBoxSpeak.setSelected(false);
                        util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyin_Yuyinhuadongtiao", {uid: SelfUid()});
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
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Zhendongkaiguan_Off", {uid:SelfUid()});
                    }else {
                        btn.loadTextureNormal("game_picture/vibrato_on.png");
                        util.localStorageEncrypt.setBoolItem("isVibrato", true);
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Zhendongkaiguan_On", {uid:SelfUid()});
                    }
                }
            },
            btn_repotPlayer: {
                _click: function() {
                    MjClient.Scene.addChild(new reportPlayerLayer());
                }
            }
        }
    },
    ctor: function () {
        this._super();
        var homeSetUi = ccs.load("setting_home.json");
        var _back = homeSetUi.node.getChildByName("back");
        var _di1 = _back.getChildByName("di1");
        var _di2 = _back.getChildByName("di2");

        this.SliderMusic = _di1.getChildByName("SliderMusic");
        this.SliderVoice = _di1.getChildByName("SliderVoice");
        this.CheckBoxMusic = _di1.getChildByName("CheckBoxMusic");   // noMusic
        this.CheckBoxVoice = _di1.getChildByName("CheckBoxVoice");   // noVoice
        
        this.CheckBoxMandarin = _di2.getChildByName("CheckBoxMandarin");  // 普通话
        this.CheckBoxDialect = _di2.getChildByName("CheckBoxDialect");  // 本地话

        MjClient.homeSetUi = this;
        BindUiAndLogic(homeSetUi.node, this.jsBind);
        this.addChild(homeSetUi.node);

        this.CheckBoxMusic.setSelected(util.localStorageEncrypt.getNumberItem("oldMusicVolume", -1) != -1);
        this.CheckBoxVoice.setSelected(util.localStorageEncrypt.getNumberItem("oldEffectVolume", -1) != -1);

        this.CheckBoxMusic.addEventListener(function (sender, type) {
            MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinyue_Yinyuekaiguan", {uid:SelfUid()});
            switch (type){
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", this.SliderMusic.getPercent() / 100);
                    this.CheckBoxMusic.setSelected(true);
                    this.SliderMusic.setPercent(0);
                    setMusicVolume(0);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var v = util.localStorageEncrypt.getNumberItem("oldMusicVolume", 0);
                    this.CheckBoxMusic.setSelected(false);
                    cc.log("==============v " + v);
                    this.SliderMusic.setPercent(v * 100);
                    setMusicVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                    break;
            }
        }, this);


        this.CheckBoxVoice.addEventListener(function(sender,type)
        {
            MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinxiao_Yinxiaokaiguan", {uid:SelfUid()});
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", this.SliderVoice.getPercent() / 100);
                    this.CheckBoxVoice.setSelected(true);
                    this.SliderVoice.setPercent(0);
                    setEffectsVolume(0);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var v = util.localStorageEncrypt.getNumberItem("oldEffectVolume", 0);
                    this.CheckBoxVoice.setSelected(false);
                    this.SliderVoice.setPercent(v * 100);
                    setEffectsVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                    break;
            }
        },this);
        this.CheckBoxSpeak = _di1.getChildByName("CheckBoxSpeak");   // noSpeak
        this.SliderSpeak = _di1.getChildByName("SliderSpeak");
        if (this.CheckBoxSpeak) {
            this.CheckBoxSpeak.setSelected(util.localStorageEncrypt.getNumberItem("oldSpeakVolume", -1) != -1);
            this.CheckBoxSpeak.addEventListener(function(sender, type) {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        util.localStorageEncrypt.setNumberItem("oldSpeakVolume", this.SliderSpeak.getPercent() / 100);
                        this.CheckBoxSpeak.setSelected(true);
                        this.SliderSpeak.setPercent(0);
                        setSpeakVolume(0);
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        var v = util.localStorageEncrypt.getNumberItem("oldSpeakVolume", 0);
                        this.CheckBoxSpeak.setSelected(false);
                        this.SliderSpeak.setPercent(v * 100);
                        setSpeakVolume(v);
                        util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                        break;
                }
            }, this);
        }
        

        //注册checkBox，以及txt事件
        var listHua = [];
        listHua.push(this.CheckBoxMandarin);
        listHua.push(this.CheckBoxDialect);
        this._playNode_voice_radio = createRadioBoxForCheckBoxs(listHua, this.radioBoxSelectCB);
        this.addListenerText(listHua,this._playNode_voice_radio, function(index) {
            if (index == 0)
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyin_Putonghua", {uid:SelfUid()});
            else
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyin_Bendihua", {uid:SelfUid()});
        });

        //加载默认语音类型
        var voiceType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 0);
        this._playNode_voice_radio.selectItem(voiceType);
        this.radioBoxSelectCB(voiceType, listHua[voiceType], listHua);


        return true;
    },
    onEnter: function(){
        this._super();
    },
    addListenerText: function(node, radio, callback) {
        if (node && radio) {
            for (var i = 0; i < node.length; i++) {
                node[i].getChildByName("text").ignoreContentAdaptWithSize(true);
                cc.eventManager.addListener(this.setTextClick(node, i, radio, callback), node[i].getChildByName("text"));
            }
        } else if (callback) {
            node.getChildByName("text").ignoreContentAdaptWithSize(true);
            cc.eventManager.addListener(this.setTextClick(null, null, null, callback), node.getChildByName("text"));
        }else {
            node.getChildByName("text").ignoreContentAdaptWithSize(true);
            cc.eventManager.addListener(this.setTextClick(), node.getChildByName("text"));
        }
    },
    radioBoxSelectCB: function(index, sender, list) {
        if (sender) {
            var txt = sender.getChildByName("text");
            txt.setTextColor(COLOR.SETTNG_COLOR_1);
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var radioBox = list[i];
                if (radioBox !== sender || sender.isSelected() == false) {
                    txt = radioBox.getChildByName("text");
                    txt.setTextColor(COLOR.SETTNG_COLOR_2);
                }
            }

            if (list == MjClient.homeSetUi._playNode_voice_radio._nodeList) {
                if (index == 0)
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyin_Putonghua", {uid:SelfUid()});
                else
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyin_Bendihua", {uid:SelfUid()});
            }
        }
    },
    setTextClick: function(listnode, number, radio, callback) {
        var that = this;
        var _callback = callback || function(){};
        return cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event) {
                var target = event.getCurrentTarget();
                var parent = target;
                for (; parent; parent = parent.parent) {
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
                if (!cc.rectContainsPoint(box, pos)) {
                    return false;
                }
                return true;
            },
            onTouchEnded: function(touch, event) {
                var target = event.getCurrentTarget();
                var pos = target.getParent().convertTouchToNodeSpace(touch); // 世界坐标转换 (子节点相对于父节点的位置)
                if (listnode) {
                    for (var i = 0; i < listnode.length; i++) {
                        if (i == number) {
                            listnode[i].setSelected(true);
                            var txt = listnode[i].getChildByName("text");
                            txt.setTextColor(COLOR.SETTNG_COLOR_1);
                            txt.ignoreContentAdaptWithSize(true);
                            radio.selectItem(i);
                        } else {
                            listnode[i].setSelected(false);
                            var txt = listnode[i].getChildByName("text");
                            txt.setTextColor(COLOR.SETTNG_COLOR_2);
                            txt.ignoreContentAdaptWithSize(true);
                        }
                    }

                    if(radio == that.language_radio){
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, number);
                    }

                } else {
                    // 如果触碰起始地点在本区域中
                    if (!cc.rectContainsPoint(target.getBoundingBox(), pos))
                        return;

                    target.parent.setSelected(!target.parent.isSelected());

                    var txt = target.parent.getChildByName("text");
                    txt.ignoreContentAdaptWithSize(true);
                    if (txt && target.parent.isSelected()) {
                        txt.setTextColor(COLOR.SETTNG_COLOR_1);
                    } else {
                        txt.setTextColor(COLOR.SETTNG_COLOR_2);
                    }
                }

                _callback(number);

            }
        });
    }
});

// 岳阳，大厅设置界面  - by Tom
var HomeSettingView_yueyang = cc.Layer.extend({
    jsBind:{
        block:{
            _layout:[[1,1],[0.5,0.5],[0,0],true]
        },
        back:{
            _layout:[[0.7,0.7],[0.5,0.5],[0,0]],
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
            SliderVoice:{
                _run: function () {
                    this.setPercent(getEffectsVolume()*100);
                },
                _slider:function(sdr,tp){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinxiao_Yinxiaohuadongtiao", {uid:SelfUid()});
                    setEffectsVolume(this.getPercent()/100);
                    MjClient.homeSetUi.CheckBoxVoice.setSelected(false);
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                }
            },
            SliderMusic:{
                _run:function(){
                    this.setPercent(setMusicVolume(-1)*100);
                },
                _slider:function(sdr,tp){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinyue_Yinyuehuadongtiao", {uid:SelfUid()});
                    setMusicVolume(this.getPercent()/100);
                    MjClient.homeSetUi.CheckBoxMusic.setSelected(false);
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                }
            },
            SliderSpeak: {
                _run: function() {
                    this.setPercent(getSpeakVolume() * 100);
                },
                _slider: function(sdr, tp) {
                    setSpeakVolume(this.getPercent() / 100);
                    MjClient.homeSetUi.CheckBoxSpeak.setSelected(false);
                    util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyin_Yuyinhuadongtiao", {
                        uid: SelfUid(),
                        gameType: MjClient.gameType
                    });
                }
            },
            btn_container: {
                _run: function() {
                    if (cc.sys.os == cc.sys.OS_IOS)
                    {
                        this.width = 530;
                    }
                    else if (cc.sys.os == cc.sys.OS_ANDROID)
                    {
                        this.width = 705;
                    }
                },
                xiufuBtn: {

                },
                btn_vibrato: {//振动开关
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
                            MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Zhendongkaiguan_Off", {uid:SelfUid()});
                        }else {
                            btn.loadTextureNormal("game_picture/vibrato_on.png");
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
                        MjClient.Scene.addChild(new reportPlayerLayer());
                    }
                }
            }

        }

    },
    ctor: function () {
        this._super();
        var homeSetUi = ccs.load("setting_home.json");
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

        this.CheckBoxMusic.setSelected(util.localStorageEncrypt.getNumberItem("oldMusicVolume", -1) != -1);
        this.CheckBoxVoice.setSelected(util.localStorageEncrypt.getNumberItem("oldEffectVolume", -1) != -1);

        this.CheckBoxMusic.addEventListener(function (sender, type) {
            MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinyue_Yinyuekaiguan", {uid:SelfUid()});
            switch (type){
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", this.SliderMusic.getPercent() / 100);
                    this.CheckBoxMusic.setSelected(true);
                    this.SliderMusic.setPercent(0);
                    setMusicVolume(0);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var v = util.localStorageEncrypt.getNumberItem("oldMusicVolume", 0);
                    this.CheckBoxMusic.setSelected(false);
                    this.SliderMusic.setPercent(v * 100);
                    setMusicVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                    break;
            }
        }, this);


        this.CheckBoxVoice.addEventListener(function(sender,type)
        {
            MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinxiao_Yinxiaokaiguan", {uid:SelfUid()});
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", this.SliderVoice.getPercent() / 100);
                    this.CheckBoxVoice.setSelected(true);
                    this.SliderVoice.setPercent(0);
                    setEffectsVolume(0);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var v = util.localStorageEncrypt.getNumberItem("oldEffectVolume", 0);
                    this.CheckBoxVoice.setSelected(false);
                    this.SliderVoice.setPercent(v * 100);
                    setEffectsVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                    break;
            }
        },this);

        
        if (this.CheckBoxSpeak) {
            this.CheckBoxSpeak.setSelected(util.localStorageEncrypt.getNumberItem("oldSpeakVolume", -1) != -1);
            this.CheckBoxSpeak.addEventListener(function(sender, type) {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        util.localStorageEncrypt.setNumberItem("oldSpeakVolume", this.SliderSpeak.getPercent() / 100);
                        this.CheckBoxSpeak.setSelected(true);
                        this.SliderSpeak.setPercent(0);
                        setSpeakVolume(0);
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        var v = util.localStorageEncrypt.getNumberItem("oldSpeakVolume", 0);
                        this.CheckBoxSpeak.setSelected(false);
                        this.SliderSpeak.setPercent(v * 100);
                        setSpeakVolume(v);
                        util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                        break;
                }
            }, this);
        }
        this.isShowOpenPos();

        // 经典版、湖南版切换
        var uiSelectList = [_back.getChildByName("oldUi"), _back.getChildByName("newUi"),_back.getChildByName("superUi")];
        this._uiSelect_radio = createRadioBoxForCheckBoxs(uiSelectList);

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
                uiSelectList[i].getChildByName("text").setTextColor(isSelect ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
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
            uiSelectList[i].getChildByName("text").setTextColor(uiSelectType == i ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
        }
        // 还原旧版本
        // _back.getChildByName("superUi").visible = false;
        // _back.getChildByName("oldUi").x = 250;
        // _back.getChildByName("newUi").x = 478;

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

// 南通 大厅设置界面  - by Tom
var HomeSettingView_nantong = cc.Layer.extend({
    jsBind:{
        block:{
            _layout:[[1,1],[0.5,0.5],[0,0],true]
        },
        back:{
            _layout:[[0.7,0.7],[0.5,0.5],[0,0]],
            close:{
                _click: function () {
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Close", {uid:SelfUid()});
                    if(MjClient.setui)
                    {
                        MjClient.setui.removeFromParent(true);
                        MjClient.setui = null;
                    }
                }
            },
            ExitGame:{
                _click:function () {
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Tuichuyouxi", {uid:SelfUid()});
                    showExitGameLayer();
                }
            },
            SwitchAccount:{
                _click:function () {
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Qiehuanzhanghao", {uid:SelfUid()});
                    MjClient.logout();
                    if(MjClient.setui)
                    {
                        MjClient.setui.removeFromParent(true);
                        MjClient.setui = null;
                    }
                }
            },
            xiufuBtn:{
                _visible:true,
                _run:function(){
                    if (MjClient.isShenhe === true) {
                        this.setVisible(false);
                    }
                },
                _click:function () {
                    removeUpdataDirectory();
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yijianxiufu", {uid:SelfUid()});
                }
            },
            SliderVoice:{
                _run: function () {
                    this.setPercent(getEffectsVolume()*100);
                    if (util.localStorageEncrypt.getNumberItem("oldEffectVolume", -1) !== -1)
                    {
                        MjClient.setui.noEffect.getChildByName("Image_left").setVisible(true);
                        MjClient.setui.noEffect.getChildByName("Image_right").setVisible(false);
                    }
                    else
                    {
                        MjClient.setui.noEffect.getChildByName("Image_left").setVisible(false);
                        MjClient.setui.noEffect.getChildByName("Image_right").setVisible(true);
                    }

                },
                _slider:function(sdr,tp){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinxiao_Yinxiaohuadongtiao", {uid:SelfUid()});
                    setEffectsVolume(this.getPercent()/100);
                    MjClient.setui.noEffect.setSelected(false);
                    MjClient.setui.noEffect.getChildByName("Image_left").setVisible(false);
                    MjClient.setui.noEffect.getChildByName("Image_right").setVisible(true);
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                }
            },
            SliderMusic:{
                _run:function(){
                    this.setPercent(setMusicVolume(-1)*100);
                    if (util.localStorageEncrypt.getNumberItem("oldMusicVolume", -1) !== -1)
                    {
                        MjClient.setui.noMusic.getChildByName("Image_left").setVisible(true);
                        MjClient.setui.noMusic.getChildByName("Image_right").setVisible(false);
                    }
                    else
                    {
                        MjClient.setui.noMusic.getChildByName("Image_left").setVisible(false);
                        MjClient.setui.noMusic.getChildByName("Image_right").setVisible(true);
                    }

                },
                _slider:function(sdr,tp){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinyue_Yinyuehuadongtiao", {uid:SelfUid()});
                    setMusicVolume(this.getPercent()/100);
                    MjClient.setui.noMusic.setSelected(false);
                    MjClient.setui.noMusic.getChildByName("Image_left").setVisible(false);
                    MjClient.setui.noMusic.getChildByName("Image_right").setVisible(true);
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                }
            },
            SliderSpeak:{
                _run:function(){
                    this.setPercent(getSpeakVolume()*100);
                    if (util.localStorageEncrypt.getNumberItem("oldSpeakVolume", -1) !== -1)
                    {
                        MjClient.setui.noSpeak.getChildByName("Image_left").setVisible(true);
                        MjClient.setui.noSpeak.getChildByName("Image_right").setVisible(false);
                    }
                    else
                    {
                        MjClient.setui.noSpeak.getChildByName("Image_left").setVisible(false);
                        MjClient.setui.noSpeak.getChildByName("Image_right").setVisible(true);
                    }

                },
                _slider:function(sdr,tp){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyin_Yuyinhuadongtiao", {uid:SelfUid()});
                    setSpeakVolume(this.getPercent()/100);
                    MjClient.setui.noSpeak.setSelected(false);
                    MjClient.setui.noSpeak.getChildByName("Image_left").setVisible(false);
                    MjClient.setui.noSpeak.getChildByName("Image_right").setVisible(true);
                    util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                }
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
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Zhendongkaiguan_Off", {uid:SelfUid()});
                    }else {
                        btn.loadTextureNormal("game_picture/vibrato_on.png");
                        util.localStorageEncrypt.setBoolItem("isVibrato", true);
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Zhendongkaiguan_On", {uid:SelfUid()});
                    }
                }
            },
            btn_repotPlayer: {
                _click: function() {
                    MjClient.Scene.addChild(new reportPlayerLayer());
                }
            }
        }
    },
    ctor:function(){
        this._super();
        var homeSetUi = ccs.load("setting_home.json");
        var _back = homeSetUi.node.getChildByName("back");

        this.SliderMusic = _back.getChildByName("SliderMusic");
        this.SliderVoice = _back.getChildByName("SliderVoice");
        this.SliderSpeak = _back.getChildByName("SliderSpeak");
        this.noMusic = _back.getChildByName("noMusic");   // noMusic
        this.noEffect = _back.getChildByName("noEffect");   // noVoice
        this.noSpeak = _back.getChildByName("noSpeak");   // noSpeak

        this.noMusic.setSelected(util.localStorageEncrypt.getNumberItem("oldMusicVolume", -1) != -1);
        this.noEffect.setSelected(util.localStorageEncrypt.getNumberItem("oldEffectVolume", -1) != -1);
        this.noSpeak.setSelected(util.localStorageEncrypt.getNumberItem("oldSpeakVolume", -1) != -1);

        this.noEffect.addEventListener(function(sender,type)
        {
            MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinyue_Yinyuekaiguan", {uid:SelfUid()});
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", this.SliderVoice.getPercent() / 100);
                    this.noEffect.setSelected(true);
                    this.SliderVoice.setPercent(0);
                    setEffectsVolume(0);
                    this.noEffect.getChildByName("Image_left").setVisible(true);
                    this.noEffect.getChildByName("Image_right").setVisible(false);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this.noEffect.setSelected(false);
                    var v = util.localStorageEncrypt.getNumberItem("oldEffectVolume", 0);
                    this.SliderVoice.setPercent(v * 100);
                    setEffectsVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                    this.noEffect.getChildByName("Image_left").setVisible(false);
                    this.noEffect.getChildByName("Image_right").setVisible(true);
                    break;
            }
        },this);

        this.noMusic.addEventListener(function(sender,type)
        {
            MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinyue_Yinyuekaiguan", {uid:SelfUid()});
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinyuekaiguan", {uid:SelfUid()});
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", this.SliderMusic.getPercent() / 100);
                    this.noMusic.setSelected(true);
                    this.SliderMusic.setPercent(0);
                    setMusicVolume(0);
                    this.noMusic.getChildByName("Image_left").setVisible(true);
                    this.noMusic.getChildByName("Image_right").setVisible(false);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yinyuekaiguan", {uid:SelfUid()});
                    this.noMusic.setSelected(false);
                    var v = util.localStorageEncrypt.getNumberItem("oldMusicVolume", 0);
                    this.SliderMusic.setPercent(v * 100);
                    setMusicVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                    this.noMusic.getChildByName("Image_left").setVisible(false);
                    this.noMusic.getChildByName("Image_right").setVisible(true);
                    break;
            }
        },this);

        this.noSpeak.addEventListener(function(sender,type)
        {
            MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyin_Yuyinkaiguan", {uid:SelfUid()});
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyinkaiguan", {uid:SelfUid()});
                    util.localStorageEncrypt.setNumberItem("oldSpeakVolume", this.SliderSpeak.getPercent() / 100);
                    this.noSpeak.setSelected(true);
                    this.SliderSpeak.setPercent(0);
                    setSpeakVolume(0);
                    this.noSpeak.getChildByName("Image_left").setVisible(true);
                    this.noSpeak.getChildByName("Image_right").setVisible(false);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyinkaiguan", {uid:SelfUid()});
                    this.noSpeak.setSelected(false);
                    var v = util.localStorageEncrypt.getNumberItem("oldSpeakVolume", 0);
                    this.SliderSpeak.setPercent(v * 100);
                    setSpeakVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                    this.noSpeak.getChildByName("Image_left").setVisible(false);
                    this.noSpeak.getChildByName("Image_right").setVisible(true);
                    break;
            }
        },this);

        MjClient.setui = this;
        BindUiAndLogic(homeSetUi.node, this.jsBind);
        this.addChild(homeSetUi.node);
    }


});


/***
 *   新版房间内设置界面，兼容23D的所有麻将, 扑克设置设置
 **/
var RoomPerfectSettingView = cc.Layer.extend({
    jsBind:{
        _event:{
            roundEnd: function() {
                MjClient.setui.removeSettingPanel();
            },
            LeaveGame: function () {
                MjClient.setui.removeSettingPanel();
            },
            endRoom: function () {
                MjClient.setui.removeSettingPanel();
            }
        },
        block:{
            _layout:[[1,1],[0.5,0.5],[0,0],true],
            _click: function () {
                MjClient.setui.removeSettingPanel();
            }
        },
        back:{
            _layout:[[1,1],[1,0],[0,0]],
            menu:{
                _run: function(){
                    MjClient.setui.getRoomSettingPanel();
                },
                picture:{
                    _click: function () {
                        var type = 1;
                        var curGameType = GameClass[MjClient.gameType];
                        MjClient.setui.getRoomSettingPanel(type);
                        postEvent("showRoomSettingPanel", {type: type, gameType: curGameType});
                        util.localStorageEncrypt.setNumberItem("menu", type);
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Huamianshezhi", {uid: SelfUid()});

                    }
                },
                function:{
                    _click: function () {
                        var type = 2;
                        var curGameType = GameClass[MjClient.gameType];
                        MjClient.setui.getRoomSettingPanel(type);
                        postEvent("showRoomSettingPanel", {type: type, gameType: curGameType});
                        util.localStorageEncrypt.setNumberItem("menu", type);
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi", {uid: SelfUid()});

                    }
                }
            },
            delRoom:{
                _run:function(){
                    if(!MjClient.data || !MjClient.data.sData || !MjClient.data.sData.tData){
                        this.setVisible(false);
                        return;
                    }
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    if (tData.matchId || tData.fieldId) {
                        this.setVisible(false);
                    }
                },
                _click:function()
                {
                    if (!IsRoomCreator() && (MjClient.data.sData.tData.tState === TableState.waitJoin || MjClient.data.sData.tData.tState === TableState.waitReady))
                    {
                        MjClient.showMsg("确定要退出房间吗？",
                            function() {
                                MjClient.leaveGame();
                                if(MjClient.setui)
                                {
                                    MjClient.setui.removeFromParent(true);
                                    MjClient.setui = null;
                                }
                                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Jiesanfangjian_Sure", {uid:SelfUid()});
                            },
                            function() {
                                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Jiesanfangjian_Quxiao", {uid:SelfUid()});
                            });
                    } else {
                        MjClient.showMsg("确认解散房间？", function ()
                        {
                            MjClient.delRoom(true);
                            if(MjClient.setui)
                            {
                                MjClient.setui.removeFromParent(true);
                                MjClient.setui = null;
                            }
                            MjClient.delRoomTime = new Date().getTime();//记录点击申请解散房间按钮的时间
                            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Jiesanfangjian_Sure", {uid:SelfUid()});
                        }, function(){
                            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Jiesanfangjian_Quxiao", {uid:SelfUid()});
                        }, 1);
                    }
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Jiesanfangjian", {uid:SelfUid()});
                }
            },
            panel1:{   // 麻将画面设置
                _visible: false,
                _event: {
                    showRoomSettingPanel: function (ed) {
                        if(ed.gameType === MjClient.GAME_CLASS.MA_JIANG) {
                            if (ed.type === 1) {
                                this.visible = true;
                            } else {
                                this.visible = false;
                            }
                        }
                    },
                },
                _run:function(){
                    var type = util.localStorageEncrypt.getNumberItem("menu", 1);
                    if(GameClass[MjClient.gameType] === MjClient.GAME_CLASS.MA_JIANG && type === 1)
                    {
                        this.visible = true;
                    }
                },
                btn_3D:{
                    _visible:true,
                    _click:function (){
                        var currentTableIs3D = COMMON_UI3D.getIs3DFromLocalStorage();
                        // 不是3D再进行切换, 防止连续点击, 导致卡顿
                        if(currentTableIs3D === false)
                        {
                            COMMON_UI3D.setIs3DFromLocalStorage(true);
                            COMMON_UI3D.switch2DTo3D();
                            MjClient.setui.update3DTo2DView();
                            MjClient.setui.updateGameBgSelected();   // 刷新桌面背景状态
                            MjClient.setui.updateMJSkinSelected();   // 刷新麻将皮肤状态
                            postEvent("changeGameBgEvent");
                            postEvent("changeMJBgEvent");
                        }
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Huamianshezhi_Shitu_Xinban3D", {uid: SelfUid()});
                    }
                },
                btn_2D:{
                    _visible:true,
                    _click:function() {
                        var currentTableIs3D = COMMON_UI3D.getIs3DFromLocalStorage();
                        // 不是2D再进行切换, 防止连续点击, 导致卡顿
                        if(currentTableIs3D === true)
                        {
                            COMMON_UI3D.setIs3DFromLocalStorage(false);
                            COMMON_UI3D.switch2DTo3D();
                            MjClient.setui.update3DTo2DView();
                            MjClient.setui.updateGameBgSelected();   // 刷新桌面背景状态
                            MjClient.setui.updateMJSkinSelected();   // 刷新麻将皮肤状态
                            postEvent("changeGameBgEvent");
                            postEvent("changeMJBgEvent");
                        }
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Huamianshezhi_Shitu_Jingdian2D", {uid: SelfUid()});
                    }
                },
                scrollView_2D:{
                    _run: function(){
                        this.visible = !COMMON_UI3D.is3DUI();
                        this.scrollToTop(0.01, true);
                    }
                },
                scrollView_3D:{
                    _run: function(){
                        this.visible = COMMON_UI3D.is3DUI();
                        this.scrollToTop(0.01, true);
                    }
                },
            },
            panel2:{   // 房间功能设置
                _visible: false,
                _event: {
                    showRoomSettingPanel: function (ed) {
                        if(ed.type === 2) {
                            this.visible = true;
                        } else {
                            this.visible = false;
                        }
                    }
                },
                SliderVoice:{
                    _run:function(){ this.setPercent(getEffectsVolume()*100); },
                    _slider:function(sdr,tp){
                        setEffectsVolume(this.getPercent()/100);
                        MjClient.setui.CheckBoxVoice.setSelected(false);
                        util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_YinXiao_Tuodongtiao", {uid: SelfUid(),gameType:MjClient.gameType});

                    }
                },
                SliderMusic:{
                    _run:function(){ this.setPercent(setMusicVolume(-1)*100); },
                    _slider:function(sdr,tp){
                        setMusicVolume(this.getPercent()/100);
                        MjClient.setui.CheckBoxMusic.setSelected(false);
                        util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Yinyue_Tuodongtiao", {uid: SelfUid(),gameType:MjClient.gameType});
                    }
                },
                SliderSpeak:{
                    _run:function(){ this.setPercent(getSpeakVolume()*100); },
                    _slider:function(sdr,tp){
                        setSpeakVolume(this.getPercent()/100);
                        MjClient.setui.CheckBoxSpeak.setSelected(false);
                        util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_YuYin_Tuodongtiao", {uid: SelfUid(),gameType:MjClient.gameType});
                    }
                },
                text_chupai:{
                    _run:function () {
                        if(MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
                            this.visible = true;
                        }else{
                            this.visible = false;
                        }
                    }
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
                        var isVibrato = util.localStorageEncrypt.getBoolItem("isVibrato", true);
                        if(isVibrato){
                            btn.loadTextureNormal("game_picture/vibrato_off.png");
                            util.localStorageEncrypt.setBoolItem("isVibrato", false);
                            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Zhendong_Guan", {uid: SelfUid(),gameType:MjClient.gameType});
                        }else {
                            btn.loadTextureNormal("game_picture/vibrato_on.png");
                            util.localStorageEncrypt.setBoolItem("isVibrato", true);
                            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Zhendong_Kai", {uid: SelfUid(),gameType:MjClient.gameType});
                        }
                    }
                },
                btn_outEnlarge:{
                    Text_outEnlarge:{
                        _run:function () {
                            this.ignoreContentAdaptWithSize(true);
                        },
                        _click: function(btn, eventType) {
                            if(eventType === ccui.Widget.TOUCH_ENDED){
                                var isOutEnlarge = util.localStorageEncrypt.getBoolItem(MjClient.KEY_outEnlarge, true);
                                if(isOutEnlarge){
                                    btn.getParent().loadTexture("setting/cr_check_bg.png");
                                    btn.setTextColor(COLOR.SETTNG_COLOR_2);
                                    COMMON_UI.isPutScale = false;
                                    util.localStorageEncrypt.setBoolItem(MjClient.KEY_outEnlarge, false);
                                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Dongxiao_Chupaifangda_Quxiaoxuanzhong", {uid: SelfUid(),gameType:MjClient.gameType});
                                }else {
                                    btn.getParent().loadTexture("setting/createroom_check.png");
                                    btn.setTextColor(COLOR.SETTNG_COLOR_1);
                                    COMMON_UI.isPutScale = true;
                                    util.localStorageEncrypt.setBoolItem(MjClient.KEY_outEnlarge, true);
                                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Dongxiao_Chupaifangda_Xuanzhong", {uid: SelfUid(),gameType:MjClient.gameType});

                                }
                            }
                        }
                    },
                    _run:function () {
                        if(MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP ||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
                            this.visible = true;
                            var isOutEnlarge = util.localStorageEncrypt.getBoolItem(MjClient.KEY_outEnlarge, true);
                            if(isOutEnlarge){
                                this.loadTexture("setting/createroom_check.png");
                                this.getChildByName("Text_outEnlarge").setTextColor(COLOR.SETTNG_COLOR_1);
                            }else{
                                this.loadTexture("setting/cr_check_bg.png");
                                this.getChildByName("Text_outEnlarge").setTextColor(COLOR.SETTNG_COLOR_2);
                            }
                        }else{
                            this.visible = false;
                        }
                    },
                    _click: function(sender, eventType) {
                        if(eventType === ccui.Widget.TOUCH_ENDED){
                            var isOutEnlarge = util.localStorageEncrypt.getBoolItem(MjClient.KEY_outEnlarge, true);
                            if(isOutEnlarge){
                                sender.loadTexture("setting/cr_check_bg.png");
                                sender.getChildByName("Text_outEnlarge").setTextColor(COLOR.SETTNG_COLOR_2);
                                COMMON_UI.isPutScale = false;
                                util.localStorageEncrypt.setBoolItem(MjClient.KEY_outEnlarge, false);
                            }else {
                                sender.loadTexture("setting/createroom_check.png");
                                sender.getChildByName("Text_outEnlarge").setTextColor(COLOR.SETTNG_COLOR_1);
                                COMMON_UI.isPutScale = true;
                                util.localStorageEncrypt.setBoolItem(MjClient.KEY_outEnlarge, true);
                            }
                        }
                    }
                },
                btn_insertCardAni:{
                    Text_insertCardAni:{
                        _run:function () {
                            this.ignoreContentAdaptWithSize(true);
                        },
                        _click: function(btn, eventType) {
                            if(eventType === ccui.Widget.TOUCH_ENDED){
                                var isOutEnlarge = util.localStorageEncrypt.getBoolItem(MjClient.KEY_insertCardAni, true);
                                if(isOutEnlarge){
                                    btn.getParent().loadTexture("setting/cr_check_bg.png");
                                    btn.setTextColor(COLOR.SETTNG_COLOR_2);
                                    COMMON_UI.isChaPai = false;
                                    util.localStorageEncrypt.setBoolItem(MjClient.KEY_insertCardAni, false);
                                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Dongxiao_Chapaidonghua_Quxiaoxuanzhong", {uid: SelfUid(),gameType:MjClient.gameType});
                                }else {
                                    btn.getParent().loadTexture("setting/createroom_check.png");
                                    btn.setTextColor(COLOR.SETTNG_COLOR_1);
                                    COMMON_UI.isChaPai = true;
                                    util.localStorageEncrypt.setBoolItem(MjClient.KEY_insertCardAni, true);
                                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Dongxiao_Chapaidonghua_Xuanzhong", {uid: SelfUid(),gameType:MjClient.gameType});

                                }
                            }
                        }
                    },
                    _run:function () {
                        if(MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
                            this.visible = true;
                            var isOutEnlarge = util.localStorageEncrypt.getBoolItem(MjClient.KEY_insertCardAni, true);
                            if(isOutEnlarge){
                                this.loadTexture("setting/createroom_check.png");
                                this.getChildByName("Text_insertCardAni").setTextColor(COLOR.SETTNG_COLOR_1);
                            }else{
                                this.loadTexture("setting/cr_check_bg.png");
                                this.getChildByName("Text_insertCardAni").setTextColor(COLOR.SETTNG_COLOR_2);
                            }
                        }else{
                            this.visible = false;
                        }
                    },
                    _click: function(sender, eventType) {
                        if(eventType === ccui.Widget.TOUCH_ENDED){
                            var isOutEnlarge = util.localStorageEncrypt.getBoolItem(MjClient.KEY_insertCardAni, true);
                            if(isOutEnlarge){
                                sender.loadTexture("setting/cr_check_bg.png");
                                sender.getChildByName("Text_insertCardAni").setTextColor(COLOR.SETTNG_COLOR_2);
                                COMMON_UI.isChaPai = false;
                                util.localStorageEncrypt.setBoolItem(MjClient.KEY_insertCardAni, false);
                            }else {
                                sender.loadTexture("setting/createroom_check.png");
                                sender.getChildByName("Text_insertCardAni").setTextColor(COLOR.SETTNG_COLOR_1);
                                COMMON_UI.isChaPai = true;
                                util.localStorageEncrypt.setBoolItem(MjClient.KEY_insertCardAni, true);
                            }
                        }
                    }
                },
                _run: function(){
                    var type = util.localStorageEncrypt.getNumberItem("menu", 1);
                    if(type === 2)
                    {
                        this.visible = true;
                    }
                }
            },
            fixBtn: {
                _visible: true,
                _run: function()
                {
                    if (MjClient.isShenhe === true)
                    {
                        this.setVisible(false);
                    }
                },
                _click: function ()
                {
                    // 退出语音房间
                    if(MjClient.native.yayaVoice && MjClient.native.yayaVoice._isOpenVoice){ 
                        MjClient.native.yayaVoice.leaveRoom();
                    }
                    removeUpdataDirectory();
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Yijianxiufu", {uid:SelfUid()});
                }
            },
            panel3:{   // 扑克画面设置
                _visible: false,
                _event:
                    {
                        showRoomSettingPanel: function (ed)
                        {
                            if(ed.gameType != MjClient.GAME_CLASS.MA_JIANG)
                            {
                                if (ed.type == 1)
                                {
                                    this.visible = true;
                                }
                                else
                                {
                                    this.visible = false;
                                }
                            }
                        }
                    },
                _run:function(){
                    var type = util.localStorageEncrypt.getNumberItem("menu", 1);
                    if(GameClass[MjClient.gameType] !== MjClient.GAME_CLASS.MA_JIANG && type === 1)
                    {
                        this.visible = true;
                    }
                },
            },
            checkRule:{
                _click:function () {
                    var tmpindex=getgametabindex(MjClient.gameType);
                    MjClient.openWeb({url:MjClient.gameType,help:true,tabindex:tmpindex});
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Chakanguize", {uid: SelfUid()});
                }
            },
        },
    },
    ctor: function () {
        this._super();
        var jsonFile = "setting_new.json";
        var setui = ccs.load(jsonFile);
        var _back = setui.node.getChildByName("back");
        this.menu = _back.getChildByName("menu");
        this.panel1 = _back.getChildByName("panel1");
        this.panel2 = _back.getChildByName("panel2");
        this.panel3 = _back.getChildByName("panel3");
        this.scrollView_2D = this.panel1.getChildByName("scrollView_2D");
        this.scrollView_3D = this.panel1.getChildByName("scrollView_3D");
        // ----------------------------------Panel1 麻将界面 -------------------------------

        // 2D牌桌背景
        var nodeListgame2DMJBg = [];
        for (var i = 0; true; i ++) {
            var gameBg = this.scrollView_2D.getChildByName("gameBg" + (i + 1));
            if (!gameBg) break;
            var file = getGameBgFile(i);
            if (i === 1 && (MjClient.gameType === MjClient.GAME_TYPE.HONG_TONG_WANG_PAI ||
                MjClient.gameType === MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI ||
                MjClient.gameType === MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI ||
                MjClient.gameType === MjClient.GAME_TYPE.FEN_XI_YING_KOU ||
                MjClient.gameType === MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN ||
                MjClient.gameType === MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG)) {
                file = getGameBgFile(4);
            }
            if (i === 3 && (MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) &&
                GameClass[MjClient.gameType] === MjClient.GAME_CLASS.MA_JIANG) {
                if (MjClient.gameType !== MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU) {
                    file = getGameBgFile(5);
                }
            }
            setBgTexture(gameBg,gameBg.getChildByName("Image_" + (i + 1)),file);
            nodeListgame2DMJBg.push(gameBg);
        }
        this._playNode_MJGameBg_radio = createRadioBoxForCheckBoxs(nodeListgame2DMJBg, this.radioBoxSelectCB);
        this.nodeListgame2DMJBg = nodeListgame2DMJBg;

        var gameBGName = null;
        if(MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || 
            MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
            if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU)
                gameBGName = ["经典","海蓝","典雅","翡翠"];
            else if (GameClass[MjClient.gameType] === MjClient.GAME_CLASS.PAO_DE_KUAI ||
                GameClass[MjClient.gameType] === MjClient.GAME_CLASS.DOU_DI_ZHU)
                gameBGName = ["园林","夜市","海岛","经典"];
            else if (GameClass[MjClient.gameType] === MjClient.GAME_CLASS.MA_JIANG)
                gameBGName = ["经典","海蓝","翡翠","碧绿"];
        }

        for (var i = 0; i < nodeListgame2DMJBg.length; i ++) {
            var image_node = nodeListgame2DMJBg[i].getChildByName("Image_" + (i + 1));
            cc.eventManager.addListener(this.setTextClick(nodeListgame2DMJBg, i, this._playNode_MJGameBg_radio), image_node);
            var text_node = nodeListgame2DMJBg[i].getChildByName("text");
            if (text_node) {
                cc.eventManager.addListener(this.setTextClick(nodeListgame2DMJBg, i, this._playNode_MJGameBg_radio), text_node);
                if(gameBGName) text_node.setString(gameBGName[i]);
            }
        }

        var gameBgEventCb_2D = function (sender, type) {
            if (type === ccui.CheckBox.EVENT_SELECTED || type === ccui.CheckBox.EVENT_UNSELECTED) {
                for (var i = 0; i < nodeListgame2DMJBg.length; i ++) {
                    var color = sender === nodeListgame2DMJBg[i] ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2;
                    nodeListgame2DMJBg[i].setSelected(sender === nodeListgame2DMJBg[i]);
                    if(nodeListgame2DMJBg[i].getChildByName("text")) {
                        nodeListgame2DMJBg[i].getChildByName("text").setTextColor(color);
                    }

                    if(sender === nodeListgame2DMJBg[i]) {
                        setCurrentGameBgType(i);
                        postEvent("changeGameBgEvent");
                    }
                }
            }
        };

        // 3D牌桌背景
        var nodeListgame3DMJBg = [];
        for (var i = 0; true; i ++) {
            var game3DBg = this.scrollView_3D.getChildByName("game3DBg_" + (i + 1));
            if (!game3DBg) break;
            var file = getGameBgFile_3D(i);
            setBgTexture(game3DBg, game3DBg.getChildByName("Image"), file);
            nodeListgame3DMJBg.push(game3DBg);
        }
        this.nodeListgame3DMJBg = nodeListgame3DMJBg;
        this._playNode_MJGameBg_3D_radio = createRadioBoxForCheckBoxs(nodeListgame3DMJBg, this.radioBoxSelectCB);

        for (var i = 0; i < nodeListgame3DMJBg.length; i++) {
            cc.eventManager.addListener(this.setTextClick(nodeListgame3DMJBg, i, this._playNode_MJGameBg_3D_radio), nodeListgame3DMJBg[i].getChildByName("Image"));
            var text_node = nodeListgame3DMJBg[i].getChildByName("text");
            if (text_node) cc.eventManager.addListener(this.setTextClick(nodeListgame3DMJBg, i, this._playNode_MJGameBg_3D_radio), text_node);
        }

        var gameBgEventCb_3D = function (sender, type) {
            if (type === ccui.CheckBox.EVENT_SELECTED || type === ccui.CheckBox.EVENT_UNSELECTED) {
                for (var i = 0; i < nodeListgame3DMJBg.length; i ++) {

                    var color = sender === nodeListgame3DMJBg[i] ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2;
                    nodeListgame3DMJBg[i].setSelected(sender === nodeListgame3DMJBg[i]);
                    if(nodeListgame3DMJBg[i].getChildByName("text")) {
                        nodeListgame3DMJBg[i].getChildByName("text").setTextColor(color);
                    }

                    if(sender === nodeListgame3DMJBg[i]) {
                        setCurrentGameBgType(i);
                        postEvent("changeGameBgEvent");
                    }
                }
            }
        };


        // 2、3D桌面背景初始化
        for (var i = 0; i < nodeListgame3DMJBg.length; i ++){
            nodeListgame3DMJBg[i].addEventListener(gameBgEventCb_3D, this);
        }
        for (var i = 0; i < nodeListgame2DMJBg.length; i ++){
            nodeListgame2DMJBg[i].addEventListener(gameBgEventCb_2D, this);
        }
        this.updateGameBgSelected();   // 刷新桌面背景状态


        // 2D麻将皮肤设置：
        var nodeList2DMJBg = [];
        for (var i = 0; true; i ++) {
            var MJBg = this.scrollView_2D.getChildByName("MJBg" + (i + 1));
            if (!MJBg) break;
            if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU && i === 2) {
                MJBg.getChildByName("text").setString("大气");
                var imagebg = MJBg.getChildByName("Image");
                imagebg.loadTexture("playing/MJ/MJBg2/Mj_up_4.png");
                imagebg.getChildByName("Image").loadTexture("playing/MJ/MJCard2/Green.png");
                imagebg.getChildByName("Image").y = 63.2;
                imagebg.getChildByName("Image").scale = 0.78;
            }
            nodeList2DMJBg.push(MJBg);
        }
        this.nodeList2DMJBg = nodeList2DMJBg;
        this._playNode_2DMJBg_radio = createRadioBoxForCheckBoxs(nodeList2DMJBg, this.radioBoxSelectCB);
        this.addListenerText(nodeList2DMJBg, this._playNode_2DMJBg_radio);

        for (var i = 0; i < nodeList2DMJBg.length; i ++) {
            cc.eventManager.addListener(this.setTextClick(nodeList2DMJBg, i, this._playNode_2DMJBg_radio), nodeList2DMJBg[i].getChildByName("Image"));
            var text_node = nodeList2DMJBg[i].getChildByName("text");
            if (text_node) cc.eventManager.addListener(this.setTextClick(nodeList2DMJBg, i, this._playNode_2DMJBg_radio), text_node);
        }

        var MJBg2DEventCb = function (sender, type) {
            if (type === ccui.CheckBox.EVENT_SELECTED || type === ccui.CheckBox.EVENT_UNSELECTED)
            {
                for (var i = 0; i < nodeList2DMJBg.length; i ++)
                {
                    var color = nodeList2DMJBg[i] === sender ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2;
                    nodeList2DMJBg[i].setSelected(sender === nodeList2DMJBg[i]);
                    if(nodeList2DMJBg[i].getChildByName("text"))
                    {
                        nodeList2DMJBg[i].getChildByName("text").setTextColor(color);
                    }

                    if(sender === nodeList2DMJBg[i])
                    {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJBgType + getGameTag(), i);
                        postEvent("changeMJBgEvent", i);
                    }
                }
            }
        };


        // 3D麻将皮肤设置：
        var nodeList3DMJBg = [];
        for (var i = 0; true; i ++) {
            var MJBg = this.scrollView_3D.getChildByName("MJ3D" + (i + 1));
            if (!MJBg) break;
            nodeList3DMJBg.push(MJBg);
        }
        this.nodeList3DMJBg = nodeList3DMJBg;
        this._playNode_3DMJBg_radio = createRadioBoxForCheckBoxs(nodeList3DMJBg, this.radioBoxSelectCB);
        this.addListenerText(nodeList3DMJBg, this._playNode_3DMJBg_radio);

        for (var i = 0; i < nodeList3DMJBg.length; i ++) {
            cc.eventManager.addListener(this.setTextClick(nodeList3DMJBg, i, this._playNode_3DMJBg_radio), nodeList3DMJBg[i].getChildByName("Image"));
            var text_node = nodeList3DMJBg[i].getChildByName("text");
            if (text_node) cc.eventManager.addListener(this.setTextClick(nodeList3DMJBg, i, this._playNode_3DMJBg_radio), text_node);
        }

        var MJBg3DEventCb = function (sender, type) {
            if (type === ccui.CheckBox.EVENT_SELECTED || type === ccui.CheckBox.EVENT_UNSELECTED)
            {
                for (var i = 0; i < nodeList3DMJBg.length; i ++)
                {
                    var color = nodeList3DMJBg[i] === sender ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2;
                    nodeList3DMJBg[i].setSelected(sender === nodeList3DMJBg[i]);
                    if(nodeList3DMJBg[i].getChildByName("text"))
                    {
                        nodeList3DMJBg[i].getChildByName("text").setTextColor(color);
                    }

                    if(sender === nodeList3DMJBg[i])
                    {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_3DMJBgType + getGameTag(), i);
                        postEvent("changeMJBgEvent", i);
                    }
                }
            }
        };

        //  2、3D刷新麻将皮肤状态
        for (var i = 0; i < nodeList3DMJBg.length; i++){
            nodeList3DMJBg[i].addEventListener(MJBg3DEventCb, this);
        }
        for (var i = 0; i < nodeList2DMJBg.length; i++){
            nodeList2DMJBg[i].addEventListener(MJBg2DEventCb, this);
        }
        this.updateMJSkinSelected();   // 刷新麻将皮肤状态

        // ----------------------------------Panel2 功能设置 -------------------------------
        this.SliderMusic = this.panel2.getChildByName("SliderMusic");
        this.SliderVoice = this.panel2.getChildByName("SliderVoice");
        this.SliderSpeak = this.panel2.getChildByName("SliderSpeak");
        this.CheckBoxMusic = this.panel2.getChildByName("CheckBoxMusic");   // noMusic
        this.CheckBoxVoice = this.panel2.getChildByName("CheckBoxVoice");   // noVoice
        this.CheckBoxSpeak = this.panel2.getChildByName("CheckBoxSpeak");   // noSpeak
        this.CheckBoxMandarin = this.panel2.getChildByName("CheckBoxMandarin");  // 普通话
        this.CheckBoxDialect = this.panel2.getChildByName("CheckBoxDialect");  // 本地话
        this.CheckBoxChangSha = this.panel2.getChildByName("CheckBoxChangSha");  // 长沙话
        if(this.CheckBoxChangSha){
            if((MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) &&
            (MjClient.gameType === MjClient.GAME_TYPE.CHANG_SHA)){
                this.CheckBoxChangSha.visible = true;
            }else{
                this.CheckBoxChangSha.visible = false;
                this.CheckBoxChangSha = null;
            }
        }
        this.DaCard = this.panel2.getChildByName("DaCard");
        this.XiaoCard = this.panel2.getChildByName("XiaoCard");
        this.txtCardSize = this.panel2.getChildByName("txtCardSize");
        this.AnimChaPai = this.panel2.getChildByName("AnimChaPai");
        this.AnimChuPai = this.panel2.getChildByName("AnimChuPai");
        this.txtAnim = this.panel2.getChildByName("txtAnim");

        // 音乐和音效
        this.CheckBoxMusic.setSelected(util.localStorageEncrypt.getNumberItem("oldMusicVolume", -1) !== -1);
        this.CheckBoxVoice.setSelected(util.localStorageEncrypt.getNumberItem("oldEffectVolume", -1) !== -1);
        this.CheckBoxMusic.addEventListener(function (sender, type) {
            switch (type){
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", this.SliderMusic.getPercent() / 100);
                    this.CheckBoxMusic.setSelected(true);
                    this.SliderMusic.setPercent(0);
                    setMusicVolume(0);
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Yinyue_Guanbi", {uid: SelfUid()});
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var v = util.localStorageEncrypt.getNumberItem("oldMusicVolume", 0);
                    this.CheckBoxMusic.setSelected(false);
                    this.SliderMusic.setPercent(v * 100);
                    setMusicVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                    break;
            }
        }, this);

        this.CheckBoxVoice.addEventListener(function(sender,type) {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", this.SliderVoice.getPercent() / 100);
                    this.CheckBoxVoice.setSelected(true);
                    this.SliderVoice.setPercent(0);
                    setEffectsVolume(0);
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_YinXiao_Guanbi", {uid: SelfUid()});
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var v = util.localStorageEncrypt.getNumberItem("oldEffectVolume", 0);
                    this.CheckBoxVoice.setSelected(false);
                    this.SliderVoice.setPercent(v * 100);
                    setEffectsVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                    break;
            }
        },this);

        if (this.CheckBoxSpeak) {
            this.CheckBoxSpeak.setSelected(util.localStorageEncrypt.getNumberItem("oldSpeakVolume", -1) !== -1);
            this.CheckBoxSpeak.addEventListener(function(sender,type) {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        util.localStorageEncrypt.setNumberItem("oldSpeakVolume", this.SliderSpeak.getPercent() / 100);
                        this.CheckBoxSpeak.setSelected(true);
                        this.SliderSpeak.setPercent(0);
                        setSpeakVolume(0);
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_YuYin_Guanbi", {uid: SelfUid()});
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        var v = util.localStorageEncrypt.getNumberItem("oldSpeakVolume", 0);
                        this.CheckBoxSpeak.setSelected(false);
                        this.SliderSpeak.setPercent(v * 100);
                        setSpeakVolume(v);
                        util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                        break;
                }
            },this);
        }


        // 手牌大小设置
        if(this.XiaoCard && this.DaCard){
            this.XiaoCard.addTouchEventListener(function (sender, type) {
                if (type === 2) {
                    util.localStorageEncrypt.setNumberItem(MjClient.KEY_mjhand_size, 1);
                    COMMON_UI.mjhandSizeSet();
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Shoupaidaxiao_Xiao", {uid: SelfUid()});
                }
            });

            this.DaCard.addTouchEventListener(function (sender, type) {
                if (type === 2) {
                    util.localStorageEncrypt.setNumberItem(MjClient.KEY_mjhand_size, 0);
                    COMMON_UI.mjhandSizeSet();
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Shoupaidaxiao_Da", {uid: SelfUid()});

                }
            });


            var cardSizeList = [];
            cardSizeList.push(this.DaCard);
            cardSizeList.push(this.XiaoCard);
            this.cardSizeList_radio = createRadioBoxForCheckBoxs(cardSizeList, this.radioBoxSelectCB, 1);
            this.addListenerText(cardSizeList, this.cardSizeList_radio);


            if(GameClass[MjClient.gameType] === MjClient.GAME_CLASS.MA_JIANG) {
                var cardSize = util.localStorageEncrypt.getNumberItem(MjClient.KEY_mjhand_size, 1);
                this.cardSizeList_radio.selectItem(cardSize);
                this.radioBoxSelectCB(cardSize, cardSizeList[cardSize], cardSizeList);
            }else{
                this.XiaoCard.visible = false;
                this.DaCard.visible = false;
                this.txtCardSize.visible = false;
            }
        }


        // ------------------------------- 山西专用  start----------------------------------------
        if(isJinZhongAPPType() || MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ)
        {
            // 出牌动画
            this.AnimChuPai.setSelected(util.localStorageEncrypt.getBoolItem("AnimChuPai", false));
            this.AnimChuPai.getChildByName("text").setTextColor(util.localStorageEncrypt.getBoolItem("AnimChuPai", false) ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
            this.AnimChuPai.addEventListener(function (sender, type) {
                if(type === ccui.CheckBox.EVENT_SELECTED || type === ccui.CheckBox.EVENT_UNSELECTED) {
                    var isSelected = type === ccui.CheckBox.EVENT_SELECTED;
                    var color = isSelected ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2;
                    util.localStorageEncrypt.setBoolItem("AnimChuPai", isSelected);
                    this.AnimChuPai.getChildByName("text").setTextColor(color);
                    COMMON_UI.isPutScale = isSelected;
                }
            }, this);
            this.addListenerText(this.AnimChuPai);


            // 插牌动画
            this.AnimChaPai.setSelected(util.localStorageEncrypt.getBoolItem("AnimChaPai", false));
            this.AnimChaPai.getChildByName("text").setTextColor(util.localStorageEncrypt.getBoolItem("AnimChaPai", false) ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
            this.AnimChaPai.addEventListener(function (sender, type) {
                if(type === ccui.CheckBox.EVENT_SELECTED || type === ccui.CheckBox.EVENT_UNSELECTED) {
                    var isSelected = type === ccui.CheckBox.EVENT_SELECTED;
                    var color = isSelected ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2;
                    util.localStorageEncrypt.setBoolItem("AnimChaPai", isSelected);
                    this.AnimChaPai.getChildByName("text").setTextColor(color);
                    COMMON_UI.isChaPai = isSelected;
                }
            }, this);
            this.addListenerText(this.AnimChaPai);

            // 山西, 除麻将外，屏蔽【出牌动效】功能
            if(GameClass[MjClient.gameType] === MjClient.GAME_CLASS.MA_JIANG) {
                var pl = getUIPlayer(0);
                var tData = MjClient.data.sData.tData;
                var isZhuang = tData.uids[tData.zhuang] === SelfUid();
                // 山西麻将，点击设置，恢复吃碰杠胡之前的操作
                if(pl && !pl.isTing && (isZhuang || (!isZhuang && pl.putCount !== 0))) {
                    MjClient.clickTing = false;
                    MjClient.playui.hideYingKouButton && MjClient.playui.hideYingKouButton();
                    hideCurrentTingNum();
                    if(cc.sys.isObjectValid(MjClient.playui)){
                        MjClient.playui.EatVisibleCheck();
                        MjClient.playui.CardLayoutRestore(MjClient.playui._downNode, 0);
                    }
                }
            }else{
                this.AnimChaPai.setVisible(false);
                this.AnimChuPai.setVisible(false);
                this.txtAnim.setVisible(false);
            }
        }
        // ------------------------------- 山西专用 end----------------------------------------

        // 语音包设置
        var languageList = [];
        languageList.push(this.CheckBoxMandarin);
        languageList.push(this.CheckBoxDialect);
        if(this.CheckBoxChangSha){
            languageList.push(this.CheckBoxChangSha);
        }

        this.language_radio = createRadioBoxForCheckBoxs(languageList, this.radioBoxSelectCB);
        this.addListenerText(languageList, this.language_radio);

        var voiceType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 0);
        if(this.CheckBoxChangSha && util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceCHANGSHA, 0) === 1){
            voiceType = languageList.indexOf(this.CheckBoxChangSha);
        }
        this.language_radio.selectItem(voiceType);
        this.radioBoxSelectCB(voiceType, languageList[voiceType], languageList);


        // 3D特效
        var texiaoOn = this.panel2.getChildByName("texiao_1");
        var texiaoOff = this.panel2.getChildByName("texiao_2");
        var txtTeXiao = this.panel2.getChildByName("Text_texiao");
        var nodeList3DMJTexiao = [];
        nodeList3DMJTexiao.push(texiaoOn);
        nodeList3DMJTexiao.push(texiaoOff);
        var gameTexiaoEventCb_3D = function (sender, type) {
            if (type === ccui.CheckBox.EVENT_SELECTED || type === ccui.CheckBox.EVENT_UNSELECTED) {
                for (var i = 0; i < nodeList3DMJTexiao.length; i ++) {

                    var isSelected = sender === nodeList3DMJTexiao[i];
                    var color = isSelected ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2;
                    nodeList3DMJTexiao[i].setSelected(isSelected);
                    if(nodeList3DMJTexiao[i].getChildByName("text")) {
                        nodeList3DMJTexiao[i].getChildByName("text").setTextColor(color);
                    }

                    if(isSelected) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_3DMJTexiaoType, i);
                        MjClient.Game3DTexiao = i;
                        COMMON_UI.addAniEatCardsBtn(); // 设置一次3d麻将的吃碰杠按钮特效
                    }
                }
            }
        };

        this._playNode_MJGameTexiao_3D_radio = createRadioBoxForCheckBoxs(nodeList3DMJTexiao, this.radioBoxSelectCB);
        texiaoOn.addEventListener(gameTexiaoEventCb_3D, this);
        texiaoOff.addEventListener(gameTexiaoEventCb_3D, this);
        this.addListenerText(nodeList3DMJTexiao, this._playNode_MJGameTexiao_3D_radio);

        // 0 为开，1 为关
        var texiao = util.localStorageEncrypt.getNumberItem(MjClient.KEY_3DMJTexiaoType, 0);
        this._playNode_MJGameTexiao_3D_radio.selectItem(texiao);
        this.radioBoxSelectCB(texiao, nodeList3DMJTexiao[texiao], nodeList3DMJTexiao);

        if(GameClass[MjClient.gameType] !== MjClient.GAME_CLASS.MA_JIANG){
            texiaoOn.visible = false;
            texiaoOff.visible = false;
            txtTeXiao.visible = false;
        }


        // ----------------------------------Panel3 扑克界面 -------------------------------
        var nodeListgamePKBg = [];
        for (var i = 0; true; i ++) {
            var gameBg = this.panel3.getChildByName("gameBg" + (i + 1));
            if (!gameBg) break;
            var file = getGameBgFile(i);

            if(i === 0){
                if(MjClient.gameType === MjClient.GAME_TYPE.LV_LIANG_DA_QI || MjClient.gameType === MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN){
                    file = "playing/daqi/beijing_5.jpg";
                }else if(MjClient.gameType === MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI){
                    file = "playing/zhaGuZi/bg.png";
                }else if(MjClient.gameType === MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER){
                    file = "playing/sanDaEr/beijing_1.jpg";
                    gameBg.getChildByName('text').setString('复古');
                }
            }else if(i === 2){
                if(MjClient.gameType === MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER){
                    gameBg.getChildByName('text').setString('圆桌');
                }
            }
            setBgTexture(gameBg, gameBg.getChildByName("Image_" + (i + 1)),file);
            nodeListgamePKBg.push(gameBg);
        }
        this._playNode_PKGameBg_radio = createRadioBoxForCheckBoxs(nodeListgamePKBg);
        this.addListenerText(nodeListgamePKBg, this._playNode_PKGameBg_radio);

        for (var i = 0; i < nodeListgamePKBg.length; i ++) {
            var image_node = nodeListgamePKBg[i].getChildByName("Image_" + (i + 1));
            cc.eventManager.addListener(this.setTextClick(nodeListgamePKBg, i, this._playNode_PKGameBg_radio), image_node);
            var text_node = nodeListgamePKBg[i].getChildByName("text");
            if (text_node) {
                cc.eventManager.addListener(this.setTextClick(nodeListgamePKBg, i, this._playNode_PKGameBg_radio), text_node);
                if(gameBGName) text_node.setString(gameBGName[i]);
            }
        }

        var gameBgEventCb_Poker = function (sender, type) {
            if (type === ccui.CheckBox.EVENT_SELECTED || type === ccui.CheckBox.EVENT_UNSELECTED) {
                for (var i = 0; i < nodeListgamePKBg.length; i ++) {
                    var selected = sender === nodeListgamePKBg[i];
                    var color = sender === nodeListgamePKBg[i] ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2;
                    nodeListgamePKBg[i].setSelected(selected);
                    if(nodeListgamePKBg[i].getChildByName("text")) {
                        nodeListgamePKBg[i].getChildByName("text").setTextColor(color);
                    }
                    if(selected) {
                        setCurrentGameBgType(i);
                        postEvent("changeGameBgEvent");
                    }
                }
            }
        };

        var gameBgType = getCurrentGameBgType();
        for (var i = 0; i < nodeListgamePKBg.length; i ++) {
            nodeListgamePKBg[i].setSelected(gameBgType === i);
            nodeListgamePKBg[i].addEventListener(gameBgEventCb_Poker, this);
            nodeListgamePKBg[i].getChildByName("text").setTextColor(gameBgType === i ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
        }



        var nodeListPKImg = [];
        for (var i = 0; true; i ++) {
            var PKImg = this.panel3.getChildByName("poker" + (i + 1));
            if (!PKImg) break;
            nodeListPKImg.push(PKImg);
        }
        this._playNode_PKImg_radio = createRadioBoxForCheckBoxs(nodeListPKImg);
        this.addListenerText(nodeListPKImg, this._playNode_PKImg_radio);

        for (var i = 0; i < nodeListPKImg.length; i ++) {
            cc.eventManager.addListener(this.setTextClick(nodeListPKImg, i, this._playNode_PKImg_radio), nodeListPKImg[i].getChildByName("Image"));
            var text_node = nodeListPKImg[i].getChildByName("text");
            if (text_node) cc.eventManager.addListener(this.setTextClick(nodeListPKImg, i, this._playNode_PKImg_radio), text_node);
        }

        var pokerImgEventCb = function (sender, type) {
            if (type === ccui.CheckBox.EVENT_SELECTED || type === ccui.CheckBox.EVENT_UNSELECTED) {
                for (var i = 0; i < nodeListPKImg.length; i ++) {
                    var selected = sender === nodeListPKImg[i];
                    var color = sender === nodeListPKImg[i] ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2;
                    nodeListPKImg[i].setSelected(selected);
                    if(nodeListPKImg[i].getChildByName("text")) {
                        nodeListPKImg[i].getChildByName("text").setTextColor(color);
                    }

                    if(selected) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_PKImgType + getGameTag(), i);
                        postEvent("changePKImgEvent", i);
                    }
                }
            }
        };

        var PKImgType = getCurrentPKImgType();
        for (var i = 0; i < nodeListPKImg.length; i ++) {
            nodeListPKImg[i].setSelected(PKImgType === i);
            nodeListPKImg[i].addEventListener(pokerImgEventCb, this);
            nodeListPKImg[PKImgType].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_1);
        }
        MjClient.setui = this;
        BindUiAndLogic(setui.node, this.jsBind);
        this.addChild(setui.node);
        return true;
    },
    onEnter:function(){
        this._super();
        this.update3DTo2DView();
    },
    onExit:function() {
        this._super();
        if(this.AnimChaPai && this.AnimChuPai) {
            util.localStorageEncrypt.setBoolItem("AnimChaPai", this.AnimChaPai.isSelected());
            util.localStorageEncrypt.setBoolItem("AnimChuPai", this.AnimChuPai.isSelected());
            COMMON_UI.isChaPai = this.AnimChaPai.isSelected();
            COMMON_UI.isPutScale = this.AnimChuPai.isSelected();
        }

        var languageIndex = 0;
        if(MjClient.setui.CheckBoxMandarin.isSelected()) {
            languageIndex = 0;
        }else if(MjClient.setui.CheckBoxDialect.isSelected()) {
            languageIndex = 1;
        }
        if(MjClient.setui.CheckBoxChangSha && MjClient.setui.CheckBoxChangSha.isSelected()){
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceCHANGSHA, 1);
        }else{
            if(MjClient.setui.CheckBoxChangSha){
                util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceCHANGSHA, 0);
            }
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, languageIndex);
        }
    },
    getRoomSettingPanel:function (type) {
        var btnPicture = this.menu.getChildByName("picture");
        var btnFunction = this.menu.getChildByName("function");
        var type = type ? type : util.localStorageEncrypt.getNumberItem("menu", 1);
        if (type === 1) {
            btnPicture.loadTextureNormal("setting/setting_new/bg_menu1.png");
            btnPicture.loadTexturePressed("setting/setting_new/bg_menu1.png");
            btnFunction.loadTextureNormal("setting/setting_new/bg_menu2_n.png");
            btnFunction.loadTexturePressed("setting/setting_new/bg_menu2_n.png");
        } else {
            btnPicture.loadTextureNormal("setting/setting_new/bg_menu1_n.png");
            btnPicture.loadTexturePressed("setting/setting_new/bg_menu1_n.png");
            btnFunction.loadTextureNormal("setting/setting_new/bg_menu2.png");
            btnFunction.loadTexturePressed("setting/setting_new/bg_menu2.png");
        }
    },
    addListenerText: function(node, radio, callback) {
        if (node && radio) {
            for (var i = 0; i < node.length; i++) {
                node[i].getChildByName("text").ignoreContentAdaptWithSize(true);
                cc.eventManager.addListener(this.setTextClick(node, i, radio, callback), node[i].getChildByName("text"));
            }
        } else if (callback) {
            node.getChildByName("text").ignoreContentAdaptWithSize(true);
            cc.eventManager.addListener(this.setTextClick(null, null, null, callback), node.getChildByName("text"));
        }else {
            node.getChildByName("text").ignoreContentAdaptWithSize(true);
            cc.eventManager.addListener(this.setTextClick(), node.getChildByName("text"));
        }
    },
    radioBoxSelectCB: function(index, sender, list) {
        if (sender) {
            var txt = sender.getChildByName("text");
            txt.setTextColor(COLOR.SETTNG_COLOR_1);
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var radioBox = list[i];
                if (radioBox !== sender || sender.isSelected() == false) {
                    txt = radioBox.getChildByName("text");
                    txt.setTextColor(COLOR.SETTNG_COLOR_2);
                }
            }
        }
    },
    setTextClick: function (listnode,number,radio,callback) {
        var that = this;
        var _callback = callback || function(){};
        return cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
                if(radio) radio.childIsMove = false;
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
            onTouchMoved: function (touch, event) {
                if(radio) radio.childIsMove = true;
            },
            onTouchEnded: function (touch, event) {
                if(radio && radio.childIsMove) return;   // 如果复选框的子节点（文字或者图片）被滑动，则阻止事件触发
                var target = event.getCurrentTarget();
                var pos = target.getParent().convertTouchToNodeSpace(touch); // 世界坐标转换 (子节点相对于父节点的位置)
                if (listnode) {
                    for (var i = 0; i < listnode.length; i++) {
                        if (i==number) {
                            listnode[i].setSelected(true);
                            var txt = listnode[i].getChildByName("text");
                            txt.setTextColor(COLOR.SETTNG_COLOR_1);
                            txt.ignoreContentAdaptWithSize(true);
                            radio.selectItem(i);
                        }else{
                            listnode[i].setSelected(false);
                            var txt = listnode[i].getChildByName("text");
                            txt.setTextColor(COLOR.SETTNG_COLOR_2);
                            txt.ignoreContentAdaptWithSize(true);
                        }
                    }
                    // _playNode_MJGameBg_radio
                    if (radio == that._playNode_MJGameBg_radio) {
                        cc.log(" ======= sender  MJGameBg", number);
                        var gameBgType = number;
                        setCurrentGameBgType(gameBgType);
                        postEvent("changeGameBgEvent");
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Huamianshezhi_MJ_Beijing_"+(number+1), {uid:SelfUid()});

                    }

                    // _playNode_MJGameBg_3D_radio
                    if (radio == that._playNode_MJGameBg_3D_radio) {
                        cc.log(" ======= sender  MJGameBg_3D", number);
                        setCurrentGameBgType(number);
                        postEvent("changeGameBgEvent");
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Huamianshezhi_MJ_Beijing_"+(number+1), {uid:SelfUid()});
                    }

                    // _playNode_MJGameTexiao_3D_radio
                    if (radio == that._playNode_MJGameTexiao_3D_radio) {
                        cc.log(" ======= sender  MJGameTexiao_3D", number);
                        var type = number;
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_3DMJTexiaoType, type);
                        MjClient.Game3DTexiao = type;
                        COMMON_UI.addAniEatCardsBtn(); // 设置一次3d麻将的吃碰杠按钮特效
                    }

                    // _playNode_MJGameBg_radio
                    if (radio == that._playNode_PKGameBg_radio) {
                        cc.log(" ======= sender  MJGameBg", number);
                        var gameBgType = number;
                        setCurrentGameBgType(gameBgType);
                        postEvent("changeGameBgEvent");
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Huamianshezhi_PK_Beijing_"+(number+1), {uid:SelfUid()});

                    }

                    if (radio === that._playNode_2DMJBg_radio) {
                        cc.log(" ======= sender  2DMJBg  ",number);
                        var type = number;
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJBgType + getGameTag(), type);
                        postEvent("changeMJBgEvent", type);
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Huamianshezhi_MJ_Paibei_"+(number+1), {uid:SelfUid()});
                    }

                    if (radio === that._playNode_3DMJBg_radio) {
                        cc.log(" ======= sender  3DMJBg  ",number);
                        var type = number;
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_3DMJBgType + getGameTag(), type);
                        postEvent("changeMJBgEvent", type);
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Huamianshezhi_MJ_Paibei_"+(number+1), {uid:SelfUid()});
                    }

                    if (radio == that._playNode_PKImg_radio) {
                        var type = number;
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_PKImgType + getGameTag(), type);
                        postEvent("changePKImgEvent", type);
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Huamianshezhi_PK_Paibei_"+(number+1), {uid:SelfUid()});
                    }


                    if(radio == that.cardSizeList_radio){
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_mjhand_size, number);
                        COMMON_UI.mjhandSizeSet();
                    }

                    if(radio == that.language_radio){
                        if(that.CheckBoxChangSha && listnode[number] == that.CheckBoxChangSha){
                            util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceCHANGSHA, 1);
                        }else{
                            if(MjClient.setui.CheckBoxChangSha){
                                util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceCHANGSHA, 0);
                            }
                            util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, number);
                            if(number == 0){
                                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Yuyin_Putonghua", {uid:SelfUid()});
                            }else if(number == 1){
                                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Yuyin_Bendihua", {uid:SelfUid()});
                            }
                        }
                    }

                }
                else {
                    // 如果触碰起始地点在本区域中
                    if(!cc.rectContainsPoint(target.getBoundingBox(), pos))
                        return;

                    target.parent.setSelected(!target.parent.isSelected());

                    var txt = target.parent.getChildByName("text");
                    txt.ignoreContentAdaptWithSize(true);
                    if (txt && target.parent.isSelected()) {
                        txt.setTextColor(COLOR.SETTNG_COLOR_1);
                    } else {
                        txt.setTextColor(COLOR.SETTNG_COLOR_2);
                    }
                }
                _callback(number);
            }
        });
    },
    update3DTo2DView: function () {
        var is3D = COMMON_UI3D.getIs3DFromLocalStorage();
        var btn_2D = this.panel1.getChildByName("btn_2D");
        var btn_3D = this.panel1.getChildByName("btn_3D");
        var scrollView_2D = this.panel1.getChildByName("scrollView_2D");
        var scrollView_3D = this.panel1.getChildByName("scrollView_3D");
        scrollView_2D.scrollToTop(0.01, true);
        scrollView_3D.scrollToTop(0.01, true);

        // 可以设置3D桌面
        if(COMMON_UI3D.isCanChangTo3D()) {

            if (is3D) {
                btn_3D.loadTextureNormal("setting/setting_new/3D_s.png");
                btn_2D.loadTextureNormal("setting/setting_new/2D_n.png");
            } else {
                btn_3D.loadTextureNormal("setting/setting_new/3D_n.png");
                btn_2D.loadTextureNormal("setting/setting_new/2D_s.png");
            }

            scrollView_2D.visible = !is3D;
            scrollView_3D.visible = is3D;
        }
        else
        {
            // 非3D桌面
            btn_3D.loadTextureNormal("setting/setting_new/3D0.png");
            btn_2D.loadTextureNormal("setting/setting_new/2D_s.png");
            btn_3D.setTouchEnabled(false);
            btn_2D.setTouchEnabled(false);

            scrollView_2D.visible = true;
            scrollView_3D.visible = false;
        }
    },
    updateMJSkinSelected: function() {
        var MJType = getCurrentMJBgType();
        var curNodeList = [];
        if(COMMON_UI3D.is3DUI()){
            curNodeList = this.nodeList3DMJBg;
        }else{
            curNodeList = this.nodeList2DMJBg;
        }
        if(curNodeList){
            for (var i = 0; i < curNodeList.length; i++) {
                curNodeList[i].setSelected(MJType === i);
                curNodeList[i].getChildByName("text").setTextColor(MJType === i ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
            }
        }
    },
    updateGameBgSelected: function(){
        var gameBgType = getCurrentGameBgType();
        var curNodeList = [];
        if(COMMON_UI3D.is3DUI()){
            curNodeList = this.nodeListgame3DMJBg;
        }else{
            curNodeList = this.nodeListgame2DMJBg;
        }
        if(curNodeList){
            for (var i = 0; i < curNodeList.length; i++) {
                curNodeList[i].setSelected(gameBgType === i);
                curNodeList[i].getChildByName("text").setTextColor(gameBgType === i ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
            }
        }
    },
    removeSettingPanel: function () {
        if(cc.sys.isObjectValid(MjClient.setui)) {
            MjClient.setui.removeFromParent(true);
            delete MjClient.setui;
        }
    }
});

// 牛十别设置
var NiuShiBieSetting = cc.Layer.extend({
    jsBind:{
        _event:{
            roundEnd: function()
            {
                if(cc.sys.isObjectValid(MjClient.setui))
                {
                    MjClient.setui.removeFromParent(true);
                    delete MjClient.setui;
                }
            },
        },
        block:{
            _layout:[[1,1],[0.5,0.5],[0,0],true],
            _click: function () {
                if(MjClient.setui)
                {
                    MjClient.setui.removeFromParent(true);
                    MjClient.setui = null;
                }
            }
        },
        back:{
            _layout:[[1,1],[1,0],[0,0]],
            _click: function(btn) {
                
            },
            delRoom:{
                _run:function(){
                    if(!MjClient.data || !MjClient.data.sData ||!MjClient.data.sData.tData){
                        this.setVisible(false);
                        return;
                    }
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    if (tData.matchId || tData.fieldId) {
                        this.setVisible(false);
                    }
                },
                _click:function()
                {
                    if (!IsRoomCreator() && (MjClient.data.sData.tData.tState == TableState.waitJoin || MjClient.data.sData.tData.tState == TableState.waitReady))
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
                    } else {
                        MjClient.showMsg("是否解散房间？", function ()
                        {
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
            SliderVoice:{
                _run:function(){ this.setPercent(getEffectsVolume()*100); },
                _slider:function(sdr,tp){
                    setEffectsVolume(this.getPercent()/100);
                    MjClient.setui.CheckBoxVoice.setSelected(false);
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                }
            },
            SliderMusic:{
                _run:function(){ this.setPercent(setMusicVolume(-1)*100); },
                _slider:function(sdr,tp){
                    setMusicVolume(this.getPercent()/100);
                    MjClient.setui.CheckBoxMusic.setSelected(false);
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                }
            },
            SliderSpeak:{
                    _run:function(){ this.setPercent(getSpeakVolume()*100); },
                    _slider:function(sdr,tp){
                        setSpeakVolume(this.getPercent()/100);
                        MjClient.setui.CheckBoxSpeak.setSelected(false);
                        util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                    }
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
                    var isVibrato = util.localStorageEncrypt.getBoolItem("isVibrato", true);
                    if(isVibrato){
                        btn.loadTextureNormal("game_picture/vibrato_off.png");
                        util.localStorageEncrypt.setBoolItem("isVibrato", false);
                    }else {
                        btn.loadTextureNormal("game_picture/vibrato_on.png");
                        util.localStorageEncrypt.setBoolItem("isVibrato", true);
                    }
                }
            },
            fixBtn: {
                _visible: true,
                _run: function()
                {
                    if (MjClient.isShenhe === true)
                    {
                        this.setVisible(false);
                    }
                },
                _click: function ()
                {
                    removeUpdataDirectory();
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Yijianxiufu", {uid:SelfUid()});
                }
            },
        },
    },
    ctor: function () {
        this._super();
        var jsonFile = "setting_niushibie.json";
        var setui = ccs.load(jsonFile);
        var _back = setui.node.getChildByName("back");

        var gameBGName = ["经典","海蓝","典雅","森林"];

        this.SliderMusic = _back.getChildByName("SliderMusic");
        this.SliderVoice = _back.getChildByName("SliderVoice");
        this.SliderSpeak = _back.getChildByName("SliderSpeak");
        this.CheckBoxMusic = _back.getChildByName("CheckBoxMusic");   // noMusic
        this.CheckBoxVoice = _back.getChildByName("CheckBoxVoice");   // noVoice
        this.CheckBoxSpeak = _back.getChildByName("CheckBoxSpeak");

        // 音乐和音效
        this.CheckBoxMusic.setSelected(util.localStorageEncrypt.getNumberItem("oldMusicVolume", -1) != -1);
        this.CheckBoxVoice.setSelected(util.localStorageEncrypt.getNumberItem("oldEffectVolume", -1) != -1);
        this.CheckBoxMusic.addEventListener(function (sender, type) {
            switch (type){
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", this.SliderMusic.getPercent() / 100);
                    this.CheckBoxMusic.setSelected(true);
                    this.SliderMusic.setPercent(0);
                    setMusicVolume(0);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var v = util.localStorageEncrypt.getNumberItem("oldMusicVolume", 0);
                    this.CheckBoxMusic.setSelected(false);
                    this.SliderMusic.setPercent(v * 100);
                    setMusicVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                    break;
            }
        }, this);

        this.CheckBoxVoice.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", this.SliderVoice.getPercent() / 100);
                    this.CheckBoxVoice.setSelected(true);
                    this.SliderVoice.setPercent(0);
                    setEffectsVolume(0);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var v = util.localStorageEncrypt.getNumberItem("oldEffectVolume", 0);
                    this.CheckBoxVoice.setSelected(false);
                    this.SliderVoice.setPercent(v * 100);
                    setEffectsVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                    break;
            }
        },this);

        if (this.CheckBoxSpeak) {
            this.CheckBoxSpeak.setSelected(util.localStorageEncrypt.getNumberItem("oldSpeakVolume", -1) != -1);
            this.CheckBoxSpeak.addEventListener(function(sender, type) {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        util.localStorageEncrypt.setNumberItem("oldSpeakVolume", this.SliderSpeak.getPercent() / 100);
                        this.CheckBoxSpeak.setSelected(true);
                        this.SliderSpeak.setPercent(0);
                        setSpeakVolume(0);
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        var v = util.localStorageEncrypt.getNumberItem("oldSpeakVolume", 0);
                        this.CheckBoxSpeak.setSelected(false);
                        this.SliderSpeak.setPercent(v * 100);
                        setSpeakVolume(v);
                        util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                        break;
                }
            }, this);
        }

        var nodeListgamePKBg = [];
        for (var i = 0; true; i ++)
        {
            var gameBg = _back.getChildByName("gameBg" + (i + 1));
            if (!gameBg)
                break;

            var file = getGameBgFile(i);
            setBgTexture(gameBg,gameBg.getChildByName("Image_" + (i + 1)),file);

            nodeListgamePKBg.push(gameBg);
        }
        this._playNode_PKGameBg_radio = createRadioBoxForCheckBoxs(nodeListgamePKBg);
        this.addListenerText(nodeListgamePKBg, this._playNode_PKGameBg_radio);

        for (var i = 0; i < nodeListgamePKBg.length; i ++)
        {
            var image_node = nodeListgamePKBg[i].getChildByName("Image_" + (i + 1));
            cc.eventManager.addListener(this.setTextClick(nodeListgamePKBg, i, this._playNode_PKGameBg_radio), image_node);
            var text_node = nodeListgamePKBg[i].getChildByName("text");
            if (text_node)
            {
                cc.eventManager.addListener(this.setTextClick(nodeListgamePKBg, i, this._playNode_PKGameBg_radio), text_node);
                if(gameBGName)
                {
                    text_node.setString(gameBGName[i]);
                }
            }
        }

        var gameBgEventCb = function (sender, type) {
            if (type == ccui.CheckBox.EVENT_SELECTED || type == ccui.CheckBox.EVENT_UNSELECTED)
            {
                var gameBgType = 0;
                for (var i = 0; i < nodeListgamePKBg.length; i ++)
                {
                    nodeListgamePKBg[i].setSelected(sender == nodeListgamePKBg[i]);
                    if (sender == nodeListgamePKBg[i])
                    {
                        gameBgType = i;
                        if(nodeListgamePKBg[i].getChildByName("text"))
                        {
                            nodeListgamePKBg[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_1);
                        }
                    }
                    else {
                        if (nodeListgamePKBg[i].getChildByName("text"))
                        {
                            nodeListgamePKBg[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_2);
                        }
                    }
                }
                setCurrentGameBgType(gameBgType);
                postEvent("changeGameBgEvent");
            }
        }

        var gameBgType = getCurrentGameBgType();
        for (var i = 0; i < nodeListgamePKBg.length; i ++)
        {
            nodeListgamePKBg[i].setSelected(gameBgType == i);
            nodeListgamePKBg[i].addEventListener(gameBgEventCb, this);
            nodeListgamePKBg[gameBgType].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_1);
        }

        // 牌面设置
        var nodeListPKImg = [];
        for (var i = 0; true; i ++)
        {
            var PKImg = _back.getChildByName("poker" + (i + 1));
            if (!PKImg)
                break;

            nodeListPKImg.push(PKImg);
        }
        this._playNode_PKImg_radio = createRadioBoxForCheckBoxs(nodeListPKImg);
        this.addListenerText(nodeListPKImg, this._playNode_PKImg_radio);

        for (var i = 0; i < nodeListPKImg.length; i ++)
        {
            cc.eventManager.addListener(this.setTextClick(nodeListPKImg, i, this._playNode_PKImg_radio), nodeListPKImg[i].getChildByName("Image"));
            var text_node = nodeListPKImg[i].getChildByName("text");
            if (text_node)
                cc.eventManager.addListener(this.setTextClick(nodeListPKImg, i, this._playNode_PKImg_radio), text_node);
        }

        var PKImgEventCb = function (sender, type) {
            if (type == ccui.CheckBox.EVENT_SELECTED || type == ccui.CheckBox.EVENT_UNSELECTED)
            {
                var type = 0;
                for (var i = 0; i < nodeListPKImg.length; i ++)
                {
                    nodeListPKImg[i].setSelected(sender == nodeListPKImg[i]);
                    if (sender == nodeListPKImg[i])
                    {
                        type = i;
                        if(nodeListPKImg[i].getChildByName("text"))
                        {
                            nodeListPKImg[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_1);
                        }
                    }
                    else {
                        if (nodeListPKImg[i].getChildByName("text"))
                        {
                            nodeListPKImg[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_2);
                        }
                    }
                }

                util.localStorageEncrypt.setNumberItem(MjClient.KEY_PKImgType + getGameTag(), type);
                postEvent("changePKImgEvent", type);
            }
        }

        var PKImgType = getCurrentPKImgType();
        cc.log("PKImgType = " + PKImgType);
        for (var i = 0; i < nodeListPKImg.length; i ++)
        {
            nodeListPKImg[i].setSelected(PKImgType == i);
            nodeListPKImg[i].addEventListener(PKImgEventCb, this);
            nodeListPKImg[PKImgType].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_1);
        }

        MjClient.setui = this;
        BindUiAndLogic(setui.node, this.jsBind);
        this.addChild(setui.node);
        return true;
    },
    onEnter:function(){
        this._super();
    },
    onExit:function()
    {
        this._super();
    },
    addListenerText: function(node, radio, callback) {
        if (node && radio) {
            for (var i = 0; i < node.length; i++) {
                node[i].getChildByName("text").ignoreContentAdaptWithSize(true);
                cc.eventManager.addListener(this.setTextClick(node, i, radio, callback), node[i].getChildByName("text"));
            }
        } else if (callback) {
            node.getChildByName("text").ignoreContentAdaptWithSize(true);
            cc.eventManager.addListener(this.setTextClick(null, null, null, callback), node.getChildByName("text"));
        }else {
            node.getChildByName("text").ignoreContentAdaptWithSize(true);
            cc.eventManager.addListener(this.setTextClick(), node.getChildByName("text"));
        }
    },
    radioBoxSelectCB: function(index, sender, list) {
        if (sender) {
            var txt = sender.getChildByName("text");
            txt.setTextColor(COLOR.SETTNG_COLOR_1);
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var radioBox = list[i];
                if (radioBox !== sender || sender.isSelected() == false) {
                    txt = radioBox.getChildByName("text");
                    txt.setTextColor(COLOR.SETTNG_COLOR_2);
                }
            }
        }
    },
    setTextClick:function (listnode,number,radio,callback) {
        var that = this;
        var _callback = callback || function(){};
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
                            var txt = listnode[i].getChildByName("text");
                            txt.setTextColor(COLOR.SETTNG_COLOR_1);
                            txt.ignoreContentAdaptWithSize(true);
                            radio.selectItem(i);
                        }else{
                            listnode[i].setSelected(false);
                            var txt = listnode[i].getChildByName("text");
                            txt.setTextColor(COLOR.SETTNG_COLOR_2);
                            txt.ignoreContentAdaptWithSize(true);
                        }
                    }

                    // _playNode_PKGameBg_radio
                    if (radio == that._playNode_PKGameBg_radio) {
                        cc.log(" ======= sender  PKGameBg", number);
                        var gameBgType = number;
                        setCurrentGameBgType(gameBgType);
                        postEvent("changeGameBgEvent");
                    }

                    if (radio == that._playNode_PKImg_radio) {
                        var type = number;
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_PKImgType + getGameTag(), type);
                        postEvent("changePKImgEvent", type);
                    }
                }
                else {
                    // 如果触碰起始地点在本区域中
                    if(!cc.rectContainsPoint(target.getBoundingBox(), pos))
                        return;

                    target.parent.setSelected(!target.parent.isSelected());

                    var txt = target.parent.getChildByName("text");
                    txt.ignoreContentAdaptWithSize(true);
                    if (txt && target.parent.isSelected()) {
                        txt.setTextColor(COLOR.SETTNG_COLOR_1);
                    } else {
                        txt.setTextColor(COLOR.SETTNG_COLOR_2);
                    }
                }
                _callback(number);
            }
        });
    },
});

// 掂坨设置
var DianTuoSetting = cc.Layer.extend({
    jsBind:{
        _event:{
            roundEnd: function()
            {
                if(cc.sys.isObjectValid(MjClient.setui))
                {
                    MjClient.setui.removeFromParent(true);
                    delete MjClient.setui;
                }
            },
        },
        block:{
            _layout:[[1,1],[0.5,0.5],[0,0],true],
            _click: function () {
                if(MjClient.setui)
                {
                    MjClient.setui.removeFromParent(true);
                    MjClient.setui = null;
                }
            }
        },
        back:{
            _layout:[[1,1],[1,0],[0,0]],
            _click: function(btn) {
                
            },
            delRoom:{
                _run:function(){
                    if(!MjClient.data || !MjClient.data.sData ||!MjClient.data.sData.tData){
                        this.setVisible(false);
                        return;
                    }
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    if (tData.matchId || tData.fieldId) {
                        this.setVisible(false);
                    }
                },
                _click:function()
                {
                    if (!IsRoomCreator() && (MjClient.data.sData.tData.tState == TableState.waitJoin || MjClient.data.sData.tData.tState == TableState.waitReady))
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
                    } else {
                        MjClient.showMsg("是否解散房间？", function ()
                        {
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
            SliderVoice:{
                _run:function(){ this.setPercent(getEffectsVolume()*100); },
                _slider:function(sdr,tp){
                    setEffectsVolume(this.getPercent()/100);
                    MjClient.setui.CheckBoxVoice.setSelected(false);
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                }
            },
            SliderMusic:{
                _run:function(){ this.setPercent(setMusicVolume(-1)*100); },
                _slider:function(sdr,tp){
                    setMusicVolume(this.getPercent()/100);
                    MjClient.setui.CheckBoxMusic.setSelected(false);
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                }
            },
            SliderSpeak:{
                _run:function(){ this.setPercent(getSpeakVolume()*100); },
                _slider:function(sdr,tp){
                    setSpeakVolume(this.getPercent()/100);
                    MjClient.setui.CheckBoxSpeak.setSelected(false);
                    util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                }
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
                    var isVibrato = util.localStorageEncrypt.getBoolItem("isVibrato", true);
                    if(isVibrato){
                        btn.loadTextureNormal("game_picture/vibrato_off.png");
                        util.localStorageEncrypt.setBoolItem("isVibrato", false);
                    }else {
                        btn.loadTextureNormal("game_picture/vibrato_on.png");
                        util.localStorageEncrypt.setBoolItem("isVibrato", true);
                    }
                }
            },
            fixBtn: {
                _visible: true,
                _run: function()
                {
                    if (MjClient.isShenhe === true)
                    {
                        this.setVisible(false);
                    }
                },
                _click: function ()
                {
                    removeUpdataDirectory();
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Yijianxiufu", {uid:SelfUid()});
                }
            },
        },
    },
    ctor: function () {
        this._super();
        var jsonFile = "setting_diantuo.json";
        var setui = ccs.load(jsonFile);
        var _back = setui.node.getChildByName("back");

        var gameBGName = ["","","",""];

        this.SliderMusic = _back.getChildByName("SliderMusic");
        this.SliderVoice = _back.getChildByName("SliderVoice");
        this.SliderSpeak = _back.getChildByName("SliderSpeak");
        this.CheckBoxMusic = _back.getChildByName("CheckBoxMusic");   // noMusic
        this.CheckBoxVoice = _back.getChildByName("CheckBoxVoice");   // noVoice
        this.CheckBoxSpeak = _back.getChildByName("CheckBoxSpeak");   // noSpeak

        // 音乐和音效
        this.CheckBoxMusic.setSelected(util.localStorageEncrypt.getNumberItem("oldMusicVolume", -1) != -1);
        this.CheckBoxVoice.setSelected(util.localStorageEncrypt.getNumberItem("oldEffectVolume", -1) != -1);
        
        this.CheckBoxMusic.addEventListener(function (sender, type) {
            switch (type){
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", this.SliderMusic.getPercent() / 100);
                    this.CheckBoxMusic.setSelected(true);
                    this.SliderMusic.setPercent(0);
                    setMusicVolume(0);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var v = util.localStorageEncrypt.getNumberItem("oldMusicVolume", 0);
                    this.CheckBoxMusic.setSelected(false);
                    this.SliderMusic.setPercent(v * 100);
                    setMusicVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                    break;
            }
        }, this);

        this.CheckBoxVoice.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", this.SliderVoice.getPercent() / 100);
                    this.CheckBoxVoice.setSelected(true);
                    this.SliderVoice.setPercent(0);
                    setEffectsVolume(0);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var v = util.localStorageEncrypt.getNumberItem("oldEffectVolume", 0);
                    this.CheckBoxVoice.setSelected(false);
                    this.SliderVoice.setPercent(v * 100);
                    setEffectsVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                    break;
            }
        },this);

        if (this.CheckBoxSpeak) {
            this.CheckBoxSpeak.setSelected(util.localStorageEncrypt.getNumberItem("oldSpeakVolume", -1) != -1);
            this.CheckBoxSpeak.addEventListener(function(sender, type) {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        util.localStorageEncrypt.setNumberItem("oldSpeakVolume", this.SliderSpeak.getPercent() / 100);
                        this.CheckBoxSpeak.setSelected(true);
                        this.SliderSpeak.setPercent(0);
                        setSpeakVolume(0);
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        var v = util.localStorageEncrypt.getNumberItem("oldSpeakVolume", 0);
                        this.CheckBoxSpeak.setSelected(false);
                        this.SliderSpeak.setPercent(v * 100);
                        setSpeakVolume(v);
                        util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                        break;
                }
            }, this);
        }
        


        var nodeListgamePKBg = [];
        for (var i = 0; true; i ++)
        {
            var gameBg = _back.getChildByName("gameBg" + (i + 1));

            if (!gameBg)
                break;
            var file = getGameBgFile(i);

            if (file != "")
            {
                gameBg.getChildByName("Image_" + (i + 1)).loadTexture(file);
            }
            else
            {
                gameBg.setVisible(false);
            }


            nodeListgamePKBg.push(gameBg);
        }
        this._playNode_PKGameBg_radio = createRadioBoxForCheckBoxs(nodeListgamePKBg);
        this.addListenerText(nodeListgamePKBg, this._playNode_PKGameBg_radio);

        for (var i = 0; i < nodeListgamePKBg.length; i ++)
        {
            var image_node = nodeListgamePKBg[i].getChildByName("Image_" + (i + 1));
            cc.eventManager.addListener(this.setTextClick(nodeListgamePKBg, i, this._playNode_PKGameBg_radio), image_node);
            var text_node = nodeListgamePKBg[i].getChildByName("text");
            if (text_node)
            {
                cc.eventManager.addListener(this.setTextClick(nodeListgamePKBg, i, this._playNode_PKGameBg_radio), text_node);
                if(gameBGName)
                {
                    text_node.setString(gameBGName[i]);
                }
            }
        }

        var gameBgEventCb = function (sender, type) {
            if (type == ccui.CheckBox.EVENT_SELECTED || type == ccui.CheckBox.EVENT_UNSELECTED)
            {
                var gameBgType = 0;
                for (var i = 0; i < nodeListgamePKBg.length; i ++)
                {
                    nodeListgamePKBg[i].setSelected(sender == nodeListgamePKBg[i]);
                    if (sender == nodeListgamePKBg[i])
                    {
                        gameBgType = i;
                        if(nodeListgamePKBg[i].getChildByName("text"))
                        {
                            nodeListgamePKBg[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_1);
                        }
                    }
                    else {
                        if (nodeListgamePKBg[i].getChildByName("text"))
                        {
                            nodeListgamePKBg[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_2);
                        }
                    }
                }
                setCurrentGameBgType(gameBgType);
                postEvent("changeGameBgEvent");
            }
        }

        var gameBgType = getCurrentGameBgType();
        for (var i = 0; i < nodeListgamePKBg.length; i ++)
        {
            nodeListgamePKBg[i].setSelected(gameBgType == i);
            nodeListgamePKBg[i].addEventListener(gameBgEventCb, this);
            nodeListgamePKBg[gameBgType].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_1);
        }

        var nodeListPKImg = [];
        for (var i = 0; true; i ++)
        {
            var PKImg = _back.getChildByName("poker" + (i + 1));
            if (!PKImg)
                break;

            nodeListPKImg.push(PKImg);
        }
        this._playNode_PKImg_radio = createRadioBoxForCheckBoxs(nodeListPKImg);
        this.addListenerText(nodeListPKImg, this._playNode_PKImg_radio);

        for (var i = 0; i < nodeListPKImg.length; i ++)
        {
            cc.eventManager.addListener(this.setTextClick(nodeListPKImg, i, this._playNode_PKImg_radio), nodeListPKImg[i].getChildByName("Image"));
            var text_node = nodeListPKImg[i].getChildByName("text");
            if (text_node)
                cc.eventManager.addListener(this.setTextClick(nodeListPKImg, i, this._playNode_PKImg_radio), text_node);
        }

        var PKImgEventCb = function (sender, type) {
            if (type == ccui.CheckBox.EVENT_SELECTED || type == ccui.CheckBox.EVENT_UNSELECTED)
            {
                var type = 0;
                for (var i = 0; i < nodeListPKImg.length; i ++)
                {
                    nodeListPKImg[i].setSelected(sender == nodeListPKImg[i]);
                    if (sender == nodeListPKImg[i])
                    {
                        type = i;
                        if(nodeListPKImg[i].getChildByName("text"))
                        {
                            nodeListPKImg[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_1);
                        }
                    }
                    else {
                        if (nodeListPKImg[i].getChildByName("text"))
                        {
                            nodeListPKImg[i].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_2);
                        }
                    }
                }

                util.localStorageEncrypt.setNumberItem(MjClient.KEY_PKImgType + getGameTag(), type);
                postEvent("changePKImgEvent", type);
            }
        }

        var PKImgType = getCurrentPKImgType();
        cc.log("PKImgType = " + PKImgType);
        for (var i = 0; i < nodeListPKImg.length; i ++)
        {
            nodeListPKImg[i].setSelected(PKImgType == i);
            nodeListPKImg[i].addEventListener(PKImgEventCb, this);
            nodeListPKImg[PKImgType].getChildByName("text").setTextColor(COLOR.SETTNG_COLOR_1);
        }
        MjClient.setui = this;
        BindUiAndLogic(setui.node, this.jsBind);
        this.addChild(setui.node);
 
        var puTongHua = _back.getChildByName("voice_1");
        var puTongHua_txt = puTongHua.getChildByName("text")
        this.puTongHua_txt = puTongHua_txt;
        var benDiHua  = _back.getChildByName("voice_2");
        var benDiHua_txt = benDiHua.getChildByName("text")
        this.benDiHua_txt = benDiHua_txt;
        var nodeListHua = [];
        nodeListHua.push( puTongHua );
        nodeListHua.push( benDiHua );
        this._playNode_Hua_radio = createRadioBoxForCheckBoxs(nodeListHua);
        cc.eventManager.addListener(this.setTextClick(nodeListHua,0,this._playNode_Hua_radio),nodeListHua[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(nodeListHua,1,this._playNode_Hua_radio),nodeListHua[1].getChildByName("text"));


        puTongHua.setSelected(true);
        benDiHua.setSelected(false);
        puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
        benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
        benDiHua_txt.ignoreContentAdaptWithSize(true);
        puTongHua_txt.ignoreContentAdaptWithSize(true);
        var voiceType = getCurrentVoiceType();
        if(voiceType  == 0)
        {
            puTongHua.setSelected(true);
            benDiHua.setSelected(false);
            puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
            benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
        }else{
            puTongHua.setSelected(false);
            benDiHua.setSelected(true);
            benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
            puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
        }

        benDiHua.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    puTongHua.setSelected(false);
                    benDiHua.setSelected(true);
                    benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
                    puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
                    util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, 1);
                    break;
            }
        },this);

        puTongHua.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    puTongHua.setSelected(true);
                    benDiHua.setSelected(false);
                    puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
                    benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
                    util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, 0);
                    break;
            }
        },this);


        return true;
    },
    onEnter:function(){
        this._super();
    },
    onExit:function()
    {
        this._super();
    },
    addListenerText: function(node, radio, callback) {
        if (node && radio) {
            for (var i = 0; i < node.length; i++) {
                node[i].getChildByName("text").ignoreContentAdaptWithSize(true);
                cc.eventManager.addListener(this.setTextClick(node, i, radio, callback), node[i].getChildByName("text"));
            }
        } else if (callback) {
            node.getChildByName("text").ignoreContentAdaptWithSize(true);
            cc.eventManager.addListener(this.setTextClick(null, null, null, callback), node.getChildByName("text"));
        }else {
            node.getChildByName("text").ignoreContentAdaptWithSize(true);
            cc.eventManager.addListener(this.setTextClick(), node.getChildByName("text"));
        }
    },
    radioBoxSelectCB: function(index, sender, list) {
        if (sender) {
            var txt = sender.getChildByName("text");
            txt.setTextColor(COLOR.SETTNG_COLOR_1);
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var radioBox = list[i];
                if (radioBox !== sender || sender.isSelected() == false) {
                    txt = radioBox.getChildByName("text");
                    txt.setTextColor(COLOR.SETTNG_COLOR_2);
                }
            }
        }
    },
    setTextClick:function (listnode,number,radio,callback) {
        var that = this;
        var _callback = callback || function(){};
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
                            var txt = listnode[i].getChildByName("text");
                            txt.setTextColor(COLOR.SETTNG_COLOR_1);
                            txt.ignoreContentAdaptWithSize(true);
                            radio.selectItem(i);
                        }else{
                            listnode[i].setSelected(false);
                            var txt = listnode[i].getChildByName("text");
                            txt.setTextColor(COLOR.SETTNG_COLOR_2);
                            txt.ignoreContentAdaptWithSize(true);
                        }
                    }

                    // _playNode_PKGameBg_radio
                    if (radio == that._playNode_PKGameBg_radio) {
                        cc.log(" ======= sender  PKGameBg", number);
                        var gameBgType = number;
                        setCurrentGameBgType(gameBgType);
                        postEvent("changeGameBgEvent");
                    }

                    //
                    if (radio == that._playNode_Hua_radio) { 

                        if(number == 0){ 
                            that.puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
                            that.benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
                        }else{ 
                            that.benDiHua_txt.setTextColor(COLOR.SETTNG_COLOR_1);
                            that.puTongHua_txt.setTextColor(COLOR.SETTNG_COLOR_2);
                            
                        } 
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, number);

                    }


                }
                else {
                    // 如果触碰起始地点在本区域中
                    if(!cc.rectContainsPoint(target.getBoundingBox(), pos))
                        return;

                    target.parent.setSelected(!target.parent.isSelected());

                    var txt = target.parent.getChildByName("text");
                    txt.ignoreContentAdaptWithSize(true);
                    if (txt && target.parent.isSelected()) {
                        txt.setTextColor(COLOR.SETTNG_COLOR_1);
                    } else {
                        txt.setTextColor(COLOR.SETTNG_COLOR_2);
                    }
                }
                _callback(number);
            }
        });
    },
});

/**
 * 永州项目设置界面(大厅)
 *
 **/
var SettingView_yongzhou = cc.Layer.extend({
    _soundTypeKey:"Setting_sound_type",

    jsBind:{
        block:{
            _layout:[[1,1],[0.5,0.5],[0,0],true]
        },
        back: { 
            // _layout:[[0.80,0.93],[0.5,0.5],[0,0]],
            // _layout:[[0, 520 / 720],[1, 0.5],[-0.5 * 1280 / 982, 0]],
            _run: function() {
                if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXHHZP
                    || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP) {
                    setWgtLayout(this, [0, 520 / 720],[1, 0.5],[-0.5 * 1280 / 982, 0]);
                    if(MjClient.setui.getMovePlayYZ() && !!MjClient.playui){ // 永州移植到邵阳的玩法
                        if(isIPhoneX()){
                            this.setAnchorPoint(cc.p(1,0.5));
                            setWgtLayout(this, [1, 1],[1,0.5],[0,0]);
                        }else if(isIPad()){
                            this.setAnchorPoint(cc.p(1,0.5));
                            setWgtLayout(this, [0, 1],[1,0.5],[0,0]);
                        }
                        else{
                            setWgtLayout(this, [1, 1],[0.5, 0.5],[0, 0]);
                        }
                        
                    }

                } else if(MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ){
                    setWgtLayout(this, [1, 1],[0.5, 0.5],[0, 0]);
                }else if(MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP){
                    setWgtLayout(this, [0.65, 0.65], [0.5, 0.5], [0, 0.1]);   //房间外
                    if(!!MjClient.playui)                                     //房间内
                    {
                        setWgtLayout(this, [1, 1],[0.5, 0.5],[0, 0]);
                    }
                }else if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                    //var h = this.getContentSize().height;
                    setWgtLayout(this, [0, 1],[1, 0],[-1, 0]);
                }
                else {
                    setWgtLayout(this, [0.80,0.93],[0.5,0.5], [0,0]);
                }
            },
            close:{
                _click:function(){
                    MjClient.setui.removeFromParent(true);
                }
            },
            delBtn:{
                _click:function(){
                    //MjClient.delRoom(true);
                    //MjClient.setui.removeFromParent(true);
                    //MjClient.delRoomTime = new Date().getTime();//记录点击申请解散房间按钮的时间

                    if (!IsRoomCreator() &&
                        (MjClient.data.sData.tData.tState == TableState.waitJoin || MjClient.data.sData.tData.tState == TableState.waitReady))
                    {
                        MjClient.showMsg("确定要退出房间吗？",
                            function() {
                                MjClient.leaveGame();
                                MjClient.setui.removeFromParent(true);
                                MjClient.delRoomTime = new Date().getTime();//记录点击申请解散房间按钮的时间
                                if (!MjClient.enterui && !getClubInfoInTable())
                                    MjClient.Scene.addChild(new EnterRoomLayer());
                            },
                            function() {});
                    }
                    else {
                        MjClient.showMsg("是否解散房间？", function () {
                            MjClient.delRoom(true);
                            MjClient.setui.removeFromParent(true);
                            MjClient.delRoomTime = new Date().getTime();//记录点击申请解散房间按钮的时间
                        }, function(){}, 1);
                    }
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Jiesanfangjian", {uid:SelfUid()});
                }
            }
            ,
            exitBtn:
            {
                _visible:MjClient.playui,
                _click:function(){
                   MjClient.logout();
                   MjClient.setui.removeFromParent(true);
                }
            },
            ExitGame:{
                _click:function () {
                    showExitGameLayer();
                }
            },
            Btn_playrule: {
                _visible : true,
                _run : function(){
                    this.visible = true;
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP)
                    {
                        this.visible = false;
                    }
                },
                _click: function() {
                    MjClient.openWeb({url:MjClient.gameType,help:true});
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Chakanguize", {uid: SelfUid()});
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
                                    if(MjClient.playui || MjClient.goldMatchingui){
                                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Yijianxiufu", {uid:SelfUid()});
                                    }else{
                                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yijianxiufu", {uid:SelfUid()});
                                    }
                                    break;
                                default :
                                    break;
                            }
                        });
                        _fixBtn.setPosition(25, -this.getContentSize().height* 2/3);
                        _fixBtn.setScale(0.7);
                        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                            _fixBtn.setPositionY(-this.getContentSize().height* 2/3 - 5);
                        }else if (MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ && MjClient.homeui) {
                            _fixBtn.setPosition(-25 , -this.getContentSize().height* 2/3 + 110);
                        }
                        this.addChild(_fixBtn);
                    },
                    _text:function(){
                        return "    ";
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
            },
            btn_outcardScale:{//出牌放大
                _run:function () {
                    var isoutCardScale = util.localStorageEncrypt.getBoolItem("isoutCardScale", true);
                    cc.log("=====btn_outcardScale====" +isoutCardScale);
                    if(isoutCardScale){
                        this.loadTextureNormal("game_picture/vibrato_on.png");
                    }else {
                        this.loadTextureNormal("game_picture/vibrato_off.png");
                    }
                },
                _click: function(btn) {
                    cc.log("wxd=======_click===");
                    var isoutCardScale = util.localStorageEncrypt.getBoolItem("isoutCardScale", true);
                    if(isoutCardScale){
                        btn.loadTextureNormal("game_picture/vibrato_off.png");
                        util.localStorageEncrypt.setBoolItem("isoutCardScale", false);
                    }else {
                        btn.loadTextureNormal("game_picture/vibrato_on.png");
                        util.localStorageEncrypt.setBoolItem("isoutCardScale", true);
                    }
                }
            },
            btn_repotPlayer: {
                _click: function() {
                    MjClient.Scene.addChild(new reportPlayerLayer());
                }
            }

        }
        

    },
    ctor:function (jsonSrc) {
        this._super();
        var jsonFile = jsonSrc === undefined ? "setting.json" : jsonSrc;
        if ((MjClient.playui || MjClient.goldMatchingui)&& typeof(GameClass[MjClient.gameType]) != "undefined" && typeof(GameClassSettingJson[GameClass[MjClient.gameType]]) != "undefined")
        {
            var file = GameClassSettingJson[GameClass[MjClient.gameType]];

            if(MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO){
                file = "setting_poker.json";
            }

            if (jsb.fileUtils.isFileExist(file))
                jsonFile = file;
        }
        MjClient.setui=this;
        var setui = ccs.load(jsonFile);
        BindUiAndLogic(setui.node,this.jsBind);
        this.addChild(setui.node);
        this.spNode = setui.node
        settingView = this;
        var _back = setui.node.getChildByName("back");
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP && jsonFile == 'setting.json') {
            setWgtLayout(_back, [820/1280, 0], [0.5, 0.5], [0, 0]);
        }
        var puTongHua = _back.getChildByName("voice_1");
        var puTongHua_txt = puTongHua.getChildByName("text")
        this.puTongHua_txt = puTongHua_txt;
        var benDiHua  = _back.getChildByName("voice_2");
        var benDiHua_txt = benDiHua.getChildByName("text")
        this.benDiHua_txt = benDiHua_txt;

        // if(MjClient.gameType != MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG){
        var nodeListHua = [];
        nodeListHua.push(puTongHua);
        nodeListHua.push(benDiHua);
        this._playNode_Hua_radio = createRadioBoxForCheckBoxs(nodeListHua);
        cc.eventManager.addListener(this.setTextClick(nodeListHua,0,this._playNode_Hua_radio),nodeListHua[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(nodeListHua,1,this._playNode_Hua_radio),nodeListHua[1].getChildByName("text"));
        // }
        this.voiceBtnColor_select = null;
        this.voiceBtnColor_unSelect = null;
        if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA ||
            MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI || MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI){
            this.voiceBtnColor_select = cc.color(255,255,255);
            this.voiceBtnColor_unSelect = cc.color(255,255,255);
        }else if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ){
            this.voiceBtnColor_select = cc.color(66,94,112);
            this.voiceBtnColor_unSelect = cc.color(66,94,112);
        }else{
            this.voiceBtnColor_select = cc.color(255,119,28);
            this.voiceBtnColor_unSelect = cc.color(118,99,42);
        }

        puTongHua.setSelected(true);
        benDiHua.setSelected(false);
        puTongHua_txt.setTextColor(this.voiceBtnColor_select);
        benDiHua_txt.setTextColor(this.voiceBtnColor_unSelect);

        var yuyingTxt = _back.getChildByName("YYBg");
        if(yuyingTxt && yuyingTxt.ignoreContentAdaptWithSize){
            yuyingTxt.ignoreContentAdaptWithSize(true);
        }

        var voiceType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 0); 
        // 王钓麻将新增
        if(MjClient.playui && MjClient.gameType == MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG)
        {
            yuyingTxt.setVisible(false);
            // 显示出      
            puTongHua.setVisible(true);  
            benDiHua.setVisible(true);
            var voice_text = benDiHua.getChildByName("text");
            voice_text.setString("祁阳话");   
            voiceType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 0); 
        }    
        // 道州麻将新增
        if(MjClient.playui && MjClient.gameType == MjClient.GAME_TYPE.DAO_ZHOU_MJ)
        {
            voiceType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 1); 
            yuyingTxt.setVisible(false);
            // 显示出      
            puTongHua.setVisible(true);  
            benDiHua.setVisible(true);
            //切换位置
            var pos = puTongHua.getPosition();
            puTongHua.setPosition(benDiHua.getPosition());
            benDiHua.setPosition(pos);

            var voice_text = benDiHua.getChildByName("text");
            voice_text.setString("道县话");  
        }
        // 邵阳麻将新增
        if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG)
        {
            yuyingTxt.setVisible(true);
            // 显示出      
            puTongHua.setVisible(true);  
            benDiHua.setVisible(true);
            var voice_text = benDiHua.getChildByName("text");
            voice_text.setString("邵阳话");   
            voiceType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 0); 
        }  

        cc.log(MjClient.gameType);
        if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA ||
            MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI || MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI)
        {    
            puTongHua.setVisible(true);  
            benDiHua.setVisible(true); 

            voiceType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 1);     
        }

        if(MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ){
            puTongHua.setVisible(false);  
            benDiHua.setVisible(false);
        }
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ &&
            (MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG || MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN))
        {
            puTongHua.setVisible(true);
            benDiHua.setVisible(true);
            var lange = _back.getChildByName("langue");
            if(lange && lange.ignoreContentAdaptWithSize){
                lange.ignoreContentAdaptWithSize(true);
            }
        }

        var sizeVoiceBtnClick = function(radioBtn,type){
            if (type == ccui.CheckBox.EVENT_SELECTED || type == ccui.CheckBox.EVENT_UNSELECTED){
                var touchType = 0;
                for(var i = 0;i < nodeListHua.length;i++){
                    nodeListHua[i].setSelected(false);
                    var text_node = nodeListHua[i].getChildByName("text");
                    text_node.setTextColor(this.voiceBtnColor_unSelect);
                    if(radioBtn == nodeListHua[i]){
                        nodeListHua[i].setSelected(true);
                        text_node.setTextColor(this.voiceBtnColor_select);
                        touchType = i;
                    }
                } 
                util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType,touchType);
            }             
        };

        for(var i = 0;i < nodeListHua.length;i++){
            nodeListHua[i].setSelected(false);
            var text_node = nodeListHua[i].getChildByName("text");
            text_node.setTextColor(this.voiceBtnColor_unSelect);
            if(i == voiceType){
                nodeListHua[i].setSelected(true);
                text_node.setTextColor(this.voiceBtnColor_select);
            }
            nodeListHua[i].addEventListener(sizeVoiceBtnClick,this);
            cc.eventManager.addListener(this.setTextClick(nodeListHua, i, this._playNode_Hua_radio), text_node);
        }        
    
        this.noEffect = _back.getChildByName("noEffect");
        this.noMusic = _back.getChildByName("noMusic");
        this.noSpeak = _back.getChildByName("noSpeak");
        this.Slider_effect = _back.getChildByName("Slider_effect");
        this.Slider_music = _back.getChildByName("Slider_music");
        this.Slider_speak = _back.getChildByName("Slider_speak");

        var zipaiTxt = _back.getChildByName("MJBg");
        if(zipaiTxt && zipaiTxt.ignoreContentAdaptWithSize){
            zipaiTxt.ignoreContentAdaptWithSize(true);
        }

        var gameBgTxt = _back.getChildByName("gameBg");
        if(gameBgTxt && gameBgTxt.ignoreContentAdaptWithSize){
            gameBgTxt.ignoreContentAdaptWithSize(true);
        }

        this.noEffect.setSelected(util.localStorageEncrypt.getNumberItem("oldEffectVolume", -1) != -1);
        this.noMusic.setSelected(util.localStorageEncrypt.getNumberItem("oldMusicVolume", -1) != -1);
        

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
            this.noSpeak.setSelected(util.localStorageEncrypt.getNumberItem("oldSpeakVolume", -1) != -1);
            this.noSpeak.addEventListener(function(sender,type)
            {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyinkaiguan", {uid:SelfUid()});
                        util.localStorageEncrypt.setNumberItem("oldSpeakVolume", this.Slider_speak.getPercent() / 100);
                        this.noSpeak.setSelected(true);
                        this.Slider_speak.setPercent(0);
                        setSpeakVolume(0);
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Shezhi_Yuyinkaiguan", {uid:SelfUid()});
                        this.noSpeak.setSelected(false);
                        var v = util.localStorageEncrypt.getNumberItem("oldSpeakVolume", 0);
                        this.Slider_speak.setPercent(v * 100);
                        setSpeakVolume(v);
                        util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                        break;
                }
            },this);
        }

        var pokerText = _back.getChildByName("poker");
        if (pokerText)
            pokerText.ignoreContentAdaptWithSize(true);

        // 桌面背景设置：
        var nodeListgameBg = [];
        for (var i = 0; true; i ++)
        {
            if((MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA == MjClient.gameType || MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA == MjClient.gameType
                || MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI )
                && i == 3)
            {
                break;
            }
            var gameBg = _back.getChildByName("gameBg" + (i + 1));
            if (!gameBg)
                break;

            var file = getGameBgFile(i);
            setBgTexture(gameBg,gameBg.getChildByName("Image_" + (i + 1)),file);

            nodeListgameBg.push(gameBg);
        }
        this._playNode_gameBg_radio = createRadioBoxForCheckBoxs(nodeListgameBg);
        for (var i = 0; i < nodeListgameBg.length; i ++)
        {
            var image_node = nodeListgameBg[i].getChildByName("Image_" + (i + 1));
            cc.eventManager.addListener(this.setTextClick(nodeListgameBg, i, this._playNode_gameBg_radio), image_node);
            var text_node = nodeListgameBg[i].getChildByName("text");
            if (text_node)
                cc.eventManager.addListener(this.setTextClick(nodeListgameBg, i, this._playNode_gameBg_radio), text_node);
        }

        var gameBgEventCb = function (sender, type) {
            if (type == ccui.CheckBox.EVENT_SELECTED || type == ccui.CheckBox.EVENT_UNSELECTED)
            {
                var gameBgType = 0;
                for (var i = 0; i < nodeListgameBg.length; i ++)
                {
                    nodeListgameBg[i].setSelected(sender == nodeListgameBg[i]);
                    if (sender == nodeListgameBg[i])
                        gameBgType = i; 
                } 
                setCurrentGameBgType(gameBgType);
                postEvent("changeGameBgEvent", gameBgType);
            }
        }

        var gameBgType = getCurrentGameBgType();
        for (var i = 0; i < nodeListgameBg.length; i ++)
        {
            nodeListgameBg[i].setSelected(gameBgType == i);
            nodeListgameBg[i].addEventListener(gameBgEventCb, this);
        }

        // 麻将背景设置：
        var nodeListMJBg = [];
        var pos = null;
        for (var i = 0; true; i ++)
        {
            var MJBg = _back.getChildByName("MJBg" + (i + 1));
            if (!MJBg)
                break;
            nodeListMJBg.push(MJBg);
        }
        this._playNode_MJBg_radio = createRadioBoxForCheckBoxs(nodeListMJBg);
        for (var i = 0; i < nodeListMJBg.length; i ++)
        {
            cc.eventManager.addListener(this.setTextClick(nodeListMJBg, i, this._playNode_MJBg_radio), nodeListMJBg[i].getChildByName("Image"));
            var text_node = nodeListMJBg[i].getChildByName("text");
            if (text_node)
                cc.eventManager.addListener(this.setTextClick(nodeListMJBg, i, this._playNode_MJBg_radio), text_node);
        }

        var MJBgEventCb = function (sender, type) {
            if (type == ccui.CheckBox.EVENT_SELECTED || type == ccui.CheckBox.EVENT_UNSELECTED)
            {
                var type = 0;
                for (var i = 0; i < nodeListMJBg.length; i ++)
                {
                    nodeListMJBg[i].setSelected(sender == nodeListMJBg[i]);
                    if (sender == nodeListMJBg[i])
                        type = i;
                }

                if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ)
                {
                    if (type == 0)
                        type = 3;
                }

                setCurrentMJBgType(type);
                postEvent("changeMJBgEvent", type);
            }
        }

        var MJBgType = getCurrentMJBgType();
        cc.log("MJBgType = " + MJBgType);
        for (var i = 0; i < nodeListMJBg.length; i ++)
        {
            if (i == 0 && MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ)
                nodeListMJBg[i].setSelected(MJBgType == 3);
            else
                nodeListMJBg[i].setSelected(MJBgType == i);
            nodeListMJBg[i].addEventListener(MJBgEventCb, this);
        }

        // 扑克牌设置：
        var nodeListPKImg = [];
        for (var i = 0; true; i ++)
        {
            var PKImg = _back.getChildByName("pokerImg" + (i + 1));
            if (!PKImg)
                break;

            nodeListPKImg.push(PKImg);
        }

        // 湘乡扑克设置特殊处理
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ && jsonFile == GameClassSettingJson[MjClient.GAME_CLASS.PAO_DE_KUAI]) {
            if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI || MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_JZ || 
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_GZ) {
                var playRule = _back.getChildByName("Btn_playrule");

                playRule.setVisible(false);
                _back.getChildByName("Text_vibrato").setPositionY(playRule.getPositionY());
                _back.getChildByName("btn_vibrato").setPositionY(playRule.getPositionY());
            } else {
                nodeListPKImg = [];

                _back.getChildByName("pkImgDes").setVisible(false);
                for (var i = 0; true; i ++)
                {
                    var pkImg = _back.getChildByName("pokerImg" + (i + 1));
                    if (!pkImg)
                        break;

                    pkImg.setVisible(false);
                }
            }
        }

        // 邵阳扑克牌面处理
        if ((MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG)&&
            jsonFile == GameClassSettingJson[MjClient.GAME_CLASS.PAO_DE_KUAI] && 
            GameClass[MjClient.gameType] != MjClient.GAME_CLASS.PAO_DE_KUAI) {
            nodeListPKImg[nodeListPKImg.length - 1].visible = false;
        }

        // 耒阳扑克牌面处理
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP && 
            jsonFile == GameClassSettingJson[MjClient.GAME_CLASS.PAO_DE_KUAI] && 
            GameClass[MjClient.gameType] != MjClient.GAME_CLASS.PAO_DE_KUAI) {

            // 非跑得快牌面设置隐藏
            var line_2 = _back.getChildByName("line_2");
            line_2 && line_2.setVisible(false);

            for(var i = 0; i < nodeListPKImg.length; i++){
                nodeListPKImg[i].visible = false;
            }
            nodeListPKImg = [];
        }

        if(!MjClient.gameType || MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG == MjClient.gameType || MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN == MjClient.gameType ||  MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA == MjClient.gameType
            || MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO ){
            //打筒子 霸炸弹隐藏
            var line_2 = _back.getChildByName("line_2");
            line_2 && line_2.setVisible(false);

            for(var i = 0; i < nodeListPKImg.length; i++){
                nodeListPKImg[i].visible = false;
            }
        }

        this._playNode_PKImg_radio = createRadioBoxForCheckBoxs(nodeListPKImg);
        for (var i = 0; i < nodeListPKImg.length; i ++)
        {
            cc.eventManager.addListener(this.setTextClick(nodeListPKImg, i, this._playNode_PKImg_radio), nodeListPKImg[i].getChildByName("Image"));
        }

        var PKImgEventCb = function (sender, type) {
            if (type == ccui.CheckBox.EVENT_SELECTED || type == ccui.CheckBox.EVENT_UNSELECTED)
            {
                var type = 0;
                for (var i = 0; i < nodeListPKImg.length; i ++)
                {
                    nodeListPKImg[i].setSelected(sender == nodeListPKImg[i]);
                    if (sender == nodeListPKImg[i])
                        type = i;
                }
                
                util.localStorageEncrypt.setNumberItem(MjClient.KEY_PKImgType, type);
                postEvent("changePKImgEvent", type);
            }
        }

        var PKImgType = getCurrentPKImgType();
        cc.log("PKImgType = " + PKImgType);
        for (var i = 0; i < nodeListPKImg.length; i ++)
        {
            nodeListPKImg[i].setSelected(PKImgType == i);
            nodeListPKImg[i].addEventListener(PKImgEventCb, this);
        }
        // 声音设置：
        var soundTypes = [];
        var type1 = _back.getChildByName("newSound");
        soundTypes.push(type1);
        var type2 = _back.getChildByName("oldSound");
        soundTypes.push(type2);
        if(type1){
            var self = this;
            this.soundTypes = createRadioBoxForCheckBoxs(soundTypes,function(index, sender, list){
                var uid = SelfUid();
                util.localStorageEncrypt.setNumberItem(self._soundTypeKey + "_" + uid, index);
            });
            cc.eventManager.addListener(this.setTextClick(soundTypes,0,this.soundTypes),soundTypes[0].getChildByName("text"));
            cc.eventManager.addListener(this.setTextClick(soundTypes,1,this.soundTypes),soundTypes[1].getChildByName("text"));
        }

        //北斗跑胡子
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ){
            type1 && type1.setVisible(false);
            type2 && type2.setVisible(false);
            var uid = SelfUid();
            util.localStorageEncrypt.setNumberItem(this._soundTypeKey + "_" + uid, 1);  //老语音
        }
         
        //永州
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP|| this.getMovePlayYZ()){
            var layoutArr = [];
            if(_back.getChildByName("effectType1")){
                layoutArr.push(_back.getChildByName("effectType1"));
            }
            if(_back.getChildByName("effectType2")){
                layoutArr.push(_back.getChildByName("effectType2"));
            }
            if(layoutArr.length > 0){
                this._playNode_layout_radio = createRadioBoxForCheckBoxs(layoutArr);
                cc.eventManager.addListener(this.setTextClick(layoutArr,0,this._playNode_layout_radio),layoutArr[0].getChildByName("text"));
                cc.eventManager.addListener(this.setTextClick(layoutArr,1,this._playNode_layout_radio),layoutArr[1].getChildByName("text"));
                var sizeVoiceBtnClick = function(radioBtn,type){
                    if (type == ccui.CheckBox.EVENT_SELECTED || type == ccui.CheckBox.EVENT_UNSELECTED){
                        var touchType = 0;
                        for(var i = 0;i < layoutArr.length;i++){
                            layoutArr[i].setSelected(false);;
                            if(radioBtn == layoutArr[i]){
                                layoutArr[i].setSelected(true);
                                touchType = i;
                            }
                        } 
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_QXYZ_LAYOUT_SELECT,touchType);
                        postEvent("EZP_layout",{});
                    }             
                };

                var defauleValue = util.localStorageEncrypt.getNumberItem(MjClient.KEY_QXYZ_LAYOUT_SELECT,1);
                for(var i = 0;i < layoutArr.length;i++){
                    layoutArr[i].setSelected(false);
                    if(defauleValue == i){
                        layoutArr[i].setSelected(true);
                    }
                    var text_node = layoutArr[i].getChildByName("text");
                    layoutArr[i].addEventListener(sizeVoiceBtnClick,this);
                    cc.eventManager.addListener(this.setTextClick(layoutArr, i, this._playNode_layout_radio), text_node);
                }
            }
        }

        // 永州字牌的速度
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI
            || this.getMovePlayYZ() ){
            var speedArr = [];
            var name = ["speed_m","speed_bz","speed_k","speed_jk"];
            for (var i = 0; i < name.length; i++) {
                if(_back.getChildByName(name[i])){
                    speedArr.push(_back.getChildByName(name[i]));
                }
            }
            if(speedArr.length > 0){
                this._playNode_Speed_radio = createRadioBoxForCheckBoxs(speedArr);

                cc.eventManager.addListener(this.setTextClick(speedArr,0,this._playNode_Speed_radio),speedArr[0].getChildByName("text"));
                cc.eventManager.addListener(this.setTextClick(speedArr,1,this._playNode_Speed_radio),speedArr[1].getChildByName("text"));
                cc.eventManager.addListener(this.setTextClick(speedArr,2,this._playNode_Speed_radio),speedArr[2].getChildByName("text"));
                cc.eventManager.addListener(this.setTextClick(speedArr,3,this._playNode_Speed_radio),speedArr[3].getChildByName("text"));
                var speedBtnClick = function(radioBtn,type){
                    if (type == ccui.CheckBox.EVENT_SELECTED || type == ccui.CheckBox.EVENT_UNSELECTED){
                        var touchType = 0;
                        for(var i = 0;i < speedArr.length;i++){
                            speedArr[i].setSelected(false);;
                            if(radioBtn == speedArr[i]){
                                speedArr[i].setSelected(true);
                                touchType = i;
                            }
                        } 
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_QXYZ_CARD_SPEED,touchType);
                        // postEvent("EZP_Speed",{});
                    }             
                };

                var defauleValue = util.localStorageEncrypt.getNumberItem(MjClient.KEY_QXYZ_CARD_SPEED,1);
                if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ && this.getMovePlayYZ()) {
                    defauleValue = util.localStorageEncrypt.getNumberItem(MjClient.KEY_QXYZ_CARD_SPEED,3);
                }

                for(var i = 0;i < speedArr.length;i++){
                    speedArr[i].setSelected(false);
                    if(defauleValue == i){
                        speedArr[i].setSelected(true);
                    }
                    var text_node = speedArr[i].getChildByName("text");
                    speedArr[i].addEventListener(speedBtnClick,this);
                    cc.eventManager.addListener(this.setTextClick(speedArr, i, this._playNode_Speed_radio), text_node);
                }
            }
        }

        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
            this.initVibrato(_back);
        }

        if(MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP && 
            GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI){
            this.initSuDu(_back);
        }

        // MjClient.setui=this;
        // cc.log("machao_data "+JSON.stringify(MjClient.data));
        return true;
    },
    // 永州移植到邵阳的玩法
    getMovePlayYZ:function(){ 
        // 下面几个玩法被拿到邵阳了，所以在针对玩法增加
        return (MjClient.gameType === MjClient.GAME_TYPE.PAO_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_ER ||
             MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR ||
             MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_King ||  MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_LR_King ||  
              MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King || MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z);

    },

    initSuDu: function(back) {
        var speedArr = [];
        var suDu = back.getChildByName("suDu");
        var name = ["yb","bz","js","js1"];
        for (var i = 0; i < name.length; i++) {
            speedArr.push(suDu.getChildByName(name[i]));
        }
        var speed_radio = createRadioBoxForCheckBoxs(speedArr);

        cc.eventManager.addListener(this.setTextClick(speedArr,0,speed_radio),speedArr[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(speedArr,1,speed_radio),speedArr[1].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(speedArr,2,speed_radio),speedArr[2].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(speedArr,3,speed_radio),speedArr[3].getChildByName("text"));
        var speedBtnClick = function(radioBtn,type){
            if (type == ccui.CheckBox.EVENT_SELECTED || type == ccui.CheckBox.EVENT_UNSELECTED){
                var touchType = 0;
                for(var i = 0;i < speedArr.length;i++){
                    speedArr[i].setSelected(false);;
                    if(radioBtn == speedArr[i]){
                        speedArr[i].setSelected(true);
                        touchType = i;
                    }
                } 
                util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_SU_DU_TYPE,touchType);
                // postEvent("EZP_Speed",{});
            }             
        };

        var defauleValue = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_SU_DU_TYPE,1);
        for(var i = 0;i < speedArr.length;i++){
            speedArr[i].setSelected(false);
            if(defauleValue == i){
                speedArr[i].setSelected(true);
            }
            var text_node = speedArr[i].getChildByName("text");
            speedArr[i].addEventListener(speedBtnClick,this);
            cc.eventManager.addListener(this.setTextClick(speedArr, i, speed_radio), text_node);
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
                    // gameBgEventCb  this._playNode_gameBg_radio
                    if (radio == that._playNode_gameBg_radio) {
                        var gameBgType = number;
                        setCurrentGameBgType(gameBgType);
                        postEvent("changeGameBgEvent");
                    }
                    // _playNode_MJBg_radio
                    if (radio == that._playNode_MJBg_radio) {
                        var type = number;

                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ)
                        {
                            if (type == 0)
                                type = 3;
                        }
                        if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
                        {
                            if(!MjClient.playui || (MjClient.playui && 
                                GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI))
                            {
                                util.localStorageEncrypt.setNumberItem(MjClient.KEY_ZI_PAI_HAND_SIZE_TYPE,number);
                            }
                        } 
                        setCurrentMJBgType(type);
                        postEvent("changeMJBgEvent", type);
                    }
                    if (radio == that._playNode_PKImg_radio) {
                        var type = number;
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_PKImgType, type);
                        postEvent("changePKImgEvent", type);
                    }

                    if(radio == that._sizeList_radio){
                        for(var i = 0;i < listnode.length;i++){
                            listnode[i].setSelected(false);
                            if(i == number){
                                listnode[i].setSelected(true);
                            }
                        }
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_XXZP_CARD_SIZE,number);
                        postEvent("changeMJBgSize", number);                        
                    }
                    if(radio == that._huxishowList_radio){
                        for(var i = 0;i < listnode.length;i++){
                            listnode[i].setSelected(false);
                            if(i == number){
                                listnode[i].setSelected(true);
                            }
                        } 
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_XXZP_HUXISHOW_SELECT,number);
                        postEvent("changeMJHuxishowselect", number);                        
                    }
                    if(radio == that._layoutselectList_radio){
                        for(var i = 0;i < listnode.length;i++){
                            listnode[i].setSelected(false);
                            if(i == number){
                                listnode[i].setSelected(true);
                            }
                        } 
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_XXZP_LAYOUT_SELECT,number);
                        postEvent("changeMJLayoutselect", number);                        
                    }
                    if(radio == that._playNode_Hua_radio){
                        for(var i = 0;i < listnode.length;i++){
                            listnode[i].getChildByName("text").setTextColor(that.voiceBtnColor_unSelect);
                            if(i == number){
                                listnode[i].getChildByName("text").setTextColor(that.voiceBtnColor_select);
                            }
                        }                        
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, number);
                    }
                    if(radio == that._playNode_layout_radio){
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_QXYZ_LAYOUT_SELECT, number);
                        postEvent("EZP_layout",{});
                    }
                    if(radio === that.soundTypes){
                        util.localStorageEncrypt.setNumberItem(that._soundTypeKey + "_" + SelfUid(), number);
                    }
                }else{
                    // 如果触碰起始地点在本区域中
                    if(!cc.rectContainsPoint(target.getBoundingBox(), pos))
                        return;
                    target.parent.setSelected(!target.parent.isSelected());
                }
                
            }
        });       
    },
    onEnter:function () 
    {
        this._super();

        if (this.getName() == "HomeClick" || this.getName() == "MatchingClick")
        {
            this.jsBind.back.exitBtn._node.visible = (this.getName() == "HomeClick") ;
            this.jsBind.back.exitBtn._node.setEnabled((this.getName() == "HomeClick"));
            this.jsBind.back.delBtn._node.visible= false;
            this.jsBind.back.delBtn._node.setEnabled(false);
        }
        else if(this.getName() == "PlayLayerClick")
        {
            var sData=MjClient.data.sData;
            var tData=sData.tData;

            this.jsBind.back.exitBtn._node.visible = false;
            this.jsBind.back.exitBtn._node.setEnabled(false);

            //增加CD时间10s
            this.jsBind.back.delBtn._node.visible = true;
            var text = new ccui.Text();
            text.setTextColor(cc.color(123,78,63));
            text.setFontSize(32);
            text.setString("");
            text.setPosition(94,98);
            text.setName("textString");
            this.jsBind.back.delBtn._node.addChild(text);
            if (cc.isUndefined(MjClient.delRoomTime))
            {
                MjClient.delRoomTime = 0;
            }
            this.jsBind.back.delBtn._node.schedule(function()
            {
                var time = (new Date().getTime()) - MjClient.delRoomTime;
                time = parseInt(time/1000);
                if (time >= 10)
                {
                    MjClient.setui.jsBind.back.delBtn._node.setEnabled(true);
                    text.setString("");
                }
                else
                {
                    MjClient.setui.jsBind.back.delBtn._node.setEnabled(false);+
                    text.setString((10-time).toString() + "秒后可再次申请");
                }
            });
            if(tData.matchId || tData.fieldId){
                this.jsBind.back.delBtn._node.visible = false;
                MjClient.setui.jsBind.back.delBtn._node.setEnabled(false);
            }
        }


        //设置声音 selectItem
        var uid = SelfUid();
        var index = util.localStorageEncrypt.getNumberItem(this._soundTypeKey + "_" + uid,1);
        this.soundTypes && this.soundTypes.selectItem(index);

        //北斗跑胡子
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ){
            this.soundTypes && this.soundTypes.selectItem(1);  //老语音
        }
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
    }
});

// 邵阳大厅设置 耒阳复用
var HomeSettingView_shaoyang = cc.Layer.extend({
    jsBind:{
        block:{
            _layout:[[1,1],[0.5,0.5],[0,0],true]
        },
        back:{
            _layout:[[0.7,0.7],[0.5,0.5],[0,0]],
            close:{
                _click: function () {
                    if(MjClient.homeSetUi)
                    {
                        MjClient.homeSetUi.removeFromParent(true);
                        MjClient.homeSetUi = null;
                    }
                }
            },
            SwitchAccount:{
                _click:function(){
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
                    showExitGameLayer();
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
            SliderVoice:{
                _run: function () {
                    this.setPercent(getEffectsVolume()*100);
                },
                _slider:function(sdr,tp){
                    setEffectsVolume(this.getPercent()/100);
                    MjClient.homeSetUi.CheckBoxVoice.setSelected(false);
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                }
            },
            SliderMusic:{
                _run:function(){
                    this.setPercent(setMusicVolume(-1)*100);
                },
                _slider:function(sdr,tp){
                    setMusicVolume(this.getPercent()/100);
                    MjClient.homeSetUi.CheckBoxMusic.setSelected(false);
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                }
            },
            Sliderpeak:{
                _run:function(){
                    this.setPercent(getSpeakVolume()*100);
                },
                _slider:function(sdr,tp){
                    setSpeakVolume(this.getPercent()/100);
                    MjClient.homeSetUi.CheckBoxSpeak.setSelected(false);
                    util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                }
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
            },
            btn_repotPlayer: {
                _click: function() {
                    MjClient.Scene.addChild(new reportPlayerLayer());
                }
            }
        }

    },
    ctor: function () {
        this._super();
        var homeSetUi = ccs.load("setting_home.json");
        var _back = homeSetUi.node.getChildByName("back");

        this.SliderMusic = _back.getChildByName("SliderMusic");
        this.SliderVoice = _back.getChildByName("SliderVoice");
        this.SliderSpeak = _back.getChildByName("SliderSpeak");
        this.CheckBoxMusic = _back.getChildByName("CheckBoxMusic");   // noMusic
        this.CheckBoxVoice = _back.getChildByName("CheckBoxVoice");   // noVoice
        this.CheckBoxSpeak = _back.getChildByName("CheckBoxSpeak");   // noSpeak

        //一键修复
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||  MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP) {
            var _fixBtn = _back.getChildByName("xiufuBtn");
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
        }

        MjClient.homeSetUi = this;
        BindUiAndLogic(homeSetUi.node, this.jsBind);
        this.addChild(homeSetUi.node);

        this.CheckBoxMusic.setSelected(util.localStorageEncrypt.getNumberItem("oldMusicVolume", -1) != -1);
        this.CheckBoxVoice.setSelected(util.localStorageEncrypt.getNumberItem("oldEffectVolume", -1) != -1);
        this.CheckBoxSpeak.setSelected(util.localStorageEncrypt.getNumberItem("oldSpeakVolume", -1) != -1);

        this.CheckBoxMusic.addEventListener(function (sender, type) {
            switch (type){
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", this.SliderMusic.getPercent() / 100);
                    this.CheckBoxMusic.setSelected(true);
                    this.SliderMusic.setPercent(0);
                    setMusicVolume(0);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var v = util.localStorageEncrypt.getNumberItem("oldMusicVolume", 0);
                    this.CheckBoxMusic.setSelected(false);
                    this.SliderMusic.setPercent(v * 100);
                    setMusicVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                    break;
            }
        }, this);


        this.CheckBoxVoice.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", this.SliderVoice.getPercent() / 100);
                    this.CheckBoxVoice.setSelected(true);
                    this.SliderVoice.setPercent(0);
                    setEffectsVolume(0);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var v = util.localStorageEncrypt.getNumberItem("oldEffectVolume", 0);
                    this.CheckBoxVoice.setSelected(false);
                    this.SliderVoice.setPercent(v * 100);
                    setEffectsVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                    break;
            }
        },this);

        this.CheckBoxSpeak.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setNumberItem("oldSpeakVolume", this.SliderSpeak.getPercent() / 100);
                    this.CheckBoxSpeak.setSelected(true);
                    this.SliderSpeak.setPercent(0);
                    setEffectsVolume(0);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var v = util.localStorageEncrypt.getNumberItem("oldSpeakVolume", 0);
                    this.CheckBoxSpeak.setSelected(false);
                    this.SliderSpeak.setPercent(v * 100);
                    setEffectsVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                    break;
            }
        },this);

        this.isShowOpenPos();
        // 邵阳 新旧版UI选项
        if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
            this.initUISetting(_back);
        }
        return true;
    },

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
                    if (radio == that.uiListRadio) {
                        that.uiListRadio._callback(number, listnode[number], listnode);
                    }
                }else{
                    // 如果触碰起始地点在本区域中
                    
                }
                
            }
        });       
    },

    initUISetting : function(node){
        var uiList = [];
        uiList.push(node.getChildByName("uiOld")); 
        uiList.push(node.getChildByName("uiNew"));

        var type = util.localStorageEncrypt.getNumberItem(MjClient.KEY_QXSYDTZ_HOME_UI_TYPE, 1);
        this.uiListRadio = createRadioBoxForCheckBoxs(uiList, null, type);
        cc.eventManager.addListener(this.setTextClick(uiList,0,this.uiListRadio),uiList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(uiList,1,this.uiListRadio),uiList[1].getChildByName("text"));

        var self = this;
        this.uiListRadio.setSelectCallBack(function(index, sender, nodeList){
            var t = util.localStorageEncrypt.getNumberItem(MjClient.KEY_QXSYDTZ_HOME_UI_TYPE, 1);
            if(t != index){
                postEvent("changeUIEvent", index);
            }
            util.localStorageEncrypt.setNumberItem(MjClient.KEY_QXSYDTZ_HOME_UI_TYPE, index);
            
            self.removeFromParent(true); 
        });
    },

    //是否显示开启定位
    isShowOpenPos :function()
    {   
        var btn_openPosition = this.jsBind.back.btn_openPosition._node;
        var btn_openImpower = this.jsBind.back.btn_openImpower._node;

        if(MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP){
            //耒阳暂时没有这个功能
            btn_openPosition.visible = false;
            btn_openImpower.visible = false;
            return;
        }
        
        if (!isCurrentNativeVersionBiggerThan("11.0.0"))
        {
            btn_openPosition.visible = false;
            btn_openImpower.visible = false;
            return;
        }

        if (!btn_openPosition || !btn_openImpower)
            return;

        
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

// 麻将设置   目前用于邵阳,永州,耒阳地区
var RoomMaJiangSetting = cc.Layer.extend({
    jsBind:{
        _event:{
            roundEnd: function()
            {
                MjClient.setui.removeSettingPanel();
            },
            LeaveGame: function ()
            {
                MjClient.setui.removeSettingPanel();
            },
            endRoom: function ()
            {
                MjClient.setui.removeSettingPanel();
            }
        },
        block:{
            _layout:[[1,1],[0.5,0.5],[0,0],true],
            _click: function () {
                MjClient.setui.removeSettingPanel();
            }
        },
        back:{
            _layout:[[1,1],[1,0],[0,0]],
            menu:{
                _run: function(){
                    MjClient.setui.getRoomSettingPanel();
                },
                picture:{
                    _click: function () {
                        var type = 1;
                        var curGameType = GameClass[MjClient.gameType];
                        MjClient.setui.getRoomSettingPanel(type);
                        postEvent("showRoomSettingPanel", {type: type, gameType: curGameType});
                        util.localStorageEncrypt.setNumberItem("menu", type);
                    }
                },
                function:{
                    _click: function () {
                        var type = 2;
                        var curGameType = GameClass[MjClient.gameType];
                        MjClient.setui.getRoomSettingPanel(type);
                        postEvent("showRoomSettingPanel", {type: type, gameType: curGameType});
                        util.localStorageEncrypt.setNumberItem("menu", type);
                    }
                }
            },
            delRoom:{
                _run:function(){
                    if(!MjClient.data || !MjClient.data.sData ||!MjClient.data.sData.tData){
                        this.setVisible(false);
                        return;
                    }
                    var sData = MjClient.data.sData;
                    var tData = sData.tData;
                    if (tData.matchId || tData.fieldId) {
                        this.setVisible(false);
                    }
                },
                _click:function()
                {
                    if (!IsRoomCreator() && (MjClient.data.sData.tData.tState === TableState.waitJoin || MjClient.data.sData.tData.tState === TableState.waitReady))
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
                    } else {
                        MjClient.showMsg("确认解散房间？", function ()
                        {
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
            panel1:{   // 麻将画面设置
                _visible: false,
                _event:
                    {
                        showRoomSettingPanel: function (ed)
                        {
                            if(ed.gameType == MjClient.GAME_CLASS.MA_JIANG) {
                                if (ed.type == 1) {
                                    this.visible = true;
                                } else {
                                    this.visible = false;
                                }
                            }
                        }
                    },
                _run:function(){
                    var type = util.localStorageEncrypt.getNumberItem("menu", 1);
                    if(type === 1)
                    {
                        this.visible = true;
                    }
                },
                btn_3D:{
                    _visible:true,
                    _click:function (){
                        var currentTableIs3D = COMMON_UI3D.getIs3DFromLocalStorage();
                        // 不是3D再进行切换, 防止连续点击, 导致卡顿
                        if(currentTableIs3D === false)
                        {
                            COMMON_UI3D.setIs3DFromLocalStorage(true);
                            COMMON_UI3D.switch2DTo3D();
                            MjClient.setui.update3DTo2DView();
                            MjClient.setui.updateGameBgSelected();   // 刷新桌面背景状态
                            MjClient.setui.updateMJSkinSelected();   // 刷新麻将皮肤状态
                            postEvent("changeGameBgEvent");
                            postEvent("changeMJBgEvent");
                        }
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Huamianshezhi_Shitu_Xinban3D", {uid: SelfUid()});
                    }
                },
                btn_2D:{
                    _visible:true,
                    _click:function() {
                        var currentTableIs3D = COMMON_UI3D.getIs3DFromLocalStorage();
                        // 不是2D再进行切换, 防止连续点击, 导致卡顿
                        if(currentTableIs3D === true)
                        {
                            COMMON_UI3D.setIs3DFromLocalStorage(false);
                            COMMON_UI3D.switch2DTo3D();
                            MjClient.setui.update3DTo2DView();
                            MjClient.setui.updateGameBgSelected();   // 刷新桌面背景状态
                            MjClient.setui.updateMJSkinSelected();   // 刷新麻将皮肤状态
                            postEvent("changeGameBgEvent");
                            postEvent("changeMJBgEvent");
                        }
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Huamianshezhi_Shitu_Jingdian2D", {uid: SelfUid()});
                    }
                },
                scrollView_2D:{
                    _run: function(){
                        this.visible = !COMMON_UI3D.is3DUI();
                        this.scrollToTop(0.01, true);
                    }
                },
                scrollView_3D:{
                    _run: function(){
                        this.visible = COMMON_UI3D.is3DUI();
                        this.scrollToTop(0.01, true);
                    }
                },
            },
            panel2:{   // 房间功能设置
                _visible: false,
                _event:
                    {
                        showRoomSettingPanel: function (ed)
                        {
                            if(ed.type == 2)
                            {
                                this.visible = true;
                            }
                            else
                            {
                                this.visible = false;
                            }
                        }
                    },
                _run: function(){
                    var type = util.localStorageEncrypt.getNumberItem("menu", 1);
                    if(type === 2)
                    {
                        this.visible = true;
                    }
                },
                SliderVoice:{
                    _run:function(){ this.setPercent(getEffectsVolume()*100); },
                    _slider:function(sdr,tp){
                        setEffectsVolume(this.getPercent()/100);
                        MjClient.setui.CheckBoxVoice.setSelected(false);
                        util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                    }
                },
                SliderMusic:{
                    _run:function(){ this.setPercent(setMusicVolume(-1)*100); },
                    _slider:function(sdr,tp){
                        setMusicVolume(this.getPercent()/100);
                        MjClient.setui.CheckBoxMusic.setSelected(false);
                        util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                    }
                },
                SliderSpeak:{
                    _run:function(){ this.setPercent(getSpeakVolume()*100); },
                    _slider:function(sdr,tp){
                        setSpeakVolume(this.getPercent()/100);
                        MjClient.setui.CheckBoxSpeak.setSelected(false);
                        util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                    }
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
                        var isVibrato = util.localStorageEncrypt.getBoolItem("isVibrato", true);
                        if(isVibrato){
                            btn.loadTextureNormal("game_picture/vibrato_off.png");
                            util.localStorageEncrypt.setBoolItem("isVibrato", false);
                        }else {
                            btn.loadTextureNormal("game_picture/vibrato_on.png");
                            util.localStorageEncrypt.setBoolItem("isVibrato", true);
                        }
                    }
                },

            },
            fixBtn: {
                _visible: true,
                _run: function()
                {
                    if (MjClient.isShenhe === true)
                    {
                        this.setVisible(false);
                    }
                },
                _click: function ()
                {
                    removeUpdataDirectory();
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Yijianxiufu", {uid:SelfUid()});
                }
            },
        },
    },
    ctor: function () {
        this._super();
        var jsonFile = "setting_majiang.json";
        var setui = ccs.load(jsonFile);
        var _back = setui.node.getChildByName("back");
        this.menu = _back.getChildByName("menu");
        this.panel1 = _back.getChildByName("panel1");
        this.panel2 = _back.getChildByName("panel2");
        this.scrollView_2D = this.panel1.getChildByName("scrollView_2D");
        this.scrollView_3D = this.panel1.getChildByName("scrollView_3D");
        if(MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP ||
           MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ)
        {
            COLOR.SETTNG_COLOR_1 = cc.color(52,128,255);   //选中
            COLOR.SETTNG_COLOR_2 = cc.color(66,94,112);    //未选中
        }
        // ----------------------------------Panel1 麻将界面 -------------------------------
        // 2D牌桌背景
        var nodeListgame2DMJBg = [];
        for (var i = 0; true; i ++)
        {
            var gameBg = this.scrollView_2D.getChildByName("gameBg" + (i + 1));
            if (!gameBg)
                break;
            var file = getGameBgFile(i);
            if (file !== "")
                gameBg.getChildByName("Image_" + (i + 1)).loadTexture(file);
            else
                gameBg.setVisible(false);

            nodeListgame2DMJBg.push(gameBg);
        }
        this.nodeListgame2DMJBg = nodeListgame2DMJBg;
        this._playNode_MJGameBg_radio = createRadioBoxForCheckBoxs(nodeListgame2DMJBg);

        var gameBGName = null;
        for (var i = 0; i < nodeListgame2DMJBg.length; i ++)
        {
            var image_node = nodeListgame2DMJBg[i].getChildByName("Image_" + (i + 1));
            cc.eventManager.addListener(this.setTextClick(nodeListgame2DMJBg, i, this._playNode_MJGameBg_radio), image_node);
            var text_node = nodeListgame2DMJBg[i].getChildByName("text");
            if (text_node)
            {
                cc.eventManager.addListener(this.setTextClick(nodeListgame2DMJBg, i, this._playNode_MJGameBg_radio), text_node);
                if(gameBGName) text_node.setString(gameBGName[i]);
            }
        }

        var gameBgEventCb_2D = function (sender, type) {
            if (type === ccui.CheckBox.EVENT_SELECTED || type === ccui.CheckBox.EVENT_UNSELECTED) {
                for (var i = 0; i < nodeListgame2DMJBg.length; i ++) {
                    var color = sender === nodeListgame2DMJBg[i] ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2;
                    nodeListgame2DMJBg[i].setSelected(sender === nodeListgame2DMJBg[i]);
                    if (nodeListgame2DMJBg[i].getChildByName("text")) {
                        nodeListgame2DMJBg[i].getChildByName("text").setTextColor(color);
                    }

                    if(sender === nodeListgame2DMJBg[i]) {
                        setCurrentGameBgType(i);
                        postEvent("changeGameBgEvent");
                    }
                }
            }
        };

        // 3D牌桌背景
        var nodeListgame3DMJBg = [];
        for (var i = 0; true; i ++) {
            var game3DBg = this.scrollView_3D.getChildByName("game3DBg_" + (i + 1));
            if (!game3DBg) break;
            var file = getGameBgFile_3D(i);
            setBgTexture(game3DBg, game3DBg.getChildByName("Image"), file);
            nodeListgame3DMJBg.push(game3DBg);
        }
        this.nodeListgame3DMJBg = nodeListgame3DMJBg;
        this._playNode_MJGameBg_3D_radio = createRadioBoxForCheckBoxs(nodeListgame3DMJBg, this.radioBoxSelectCB);

        for (var i = 0; i < nodeListgame3DMJBg.length; i++) {
            cc.eventManager.addListener(this.setTextClick(nodeListgame3DMJBg, i, this._playNode_MJGameBg_3D_radio), nodeListgame3DMJBg[i].getChildByName("Image"));
            var text_node = nodeListgame3DMJBg[i].getChildByName("text");
            if (text_node) cc.eventManager.addListener(this.setTextClick(nodeListgame3DMJBg, i, this._playNode_MJGameBg_3D_radio), text_node);
        }


        var gameBgEventCb_3D = function (sender, type) {
            if (type === ccui.CheckBox.EVENT_SELECTED || type === ccui.CheckBox.EVENT_UNSELECTED) {
                for (var i = 0; i < nodeListgame3DMJBg.length; i ++) {
                    var color = sender === nodeListgame3DMJBg[i] ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2;
                    nodeListgame3DMJBg[i].setSelected(sender === nodeListgame3DMJBg[i]);
                    if(nodeListgame3DMJBg[i].getChildByName("text")) {
                        nodeListgame3DMJBg[i].getChildByName("text").setTextColor(color);
                    }

                    if(sender === nodeListgame3DMJBg[i]) {
                        setCurrentGameBgType(i);
                        postEvent("changeGameBgEvent");
                    }
                }
            }
        };


        // 2、3D桌面背景初始化
        for (var i = 0; i < nodeListgame3DMJBg.length; i ++){
            nodeListgame3DMJBg[i].addEventListener(gameBgEventCb_3D, this);
        }
        for (var i = 0; i < nodeListgame2DMJBg.length; i ++){
            nodeListgame2DMJBg[i].addEventListener(gameBgEventCb_2D, this);
        }
        this.updateGameBgSelected();    // 刷新桌面背景状态

        // 3D特效
        var nodeList3DMJTexiao = [];
        if (this.panel2) {
            for (var i = 0; true; i ++) {
                var game3DBg = this.panel2.getChildByName("texiao_" + (i + 1));
                if (!game3DBg) break;
                nodeList3DMJTexiao.push(game3DBg);
            }
        }
        this.nodeList3DMJTexiao = nodeList3DMJTexiao;
        this._playNode_MJGameTexiao_3D_radio = createRadioBoxForCheckBoxs(nodeList3DMJTexiao, this.radioBoxSelectCB);

        for (var i = 0; i < nodeList3DMJTexiao.length; i++) {
            cc.eventManager.addListener(this.setTextClick(nodeList3DMJTexiao, i, this._playNode_MJGameTexiao_3D_radio), nodeList3DMJTexiao[i].getChildByName("Image"));
            var text_node = nodeList3DMJTexiao[i].getChildByName("text");
            if (text_node) cc.eventManager.addListener(this.setTextClick(nodeList3DMJTexiao, i, this._playNode_MJGameTexiao_3D_radio), text_node);
        }

        var gameTexiaoEventCb_3D = function (sender, type) {
            if (type === ccui.CheckBox.EVENT_SELECTED || type === ccui.CheckBox.EVENT_UNSELECTED) {
                for (var i = 0; i < nodeList3DMJTexiao.length; i ++) {

                    var isSelected = sender === nodeList3DMJTexiao[i];
                    var color = isSelected ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2;
                    nodeList3DMJTexiao[i].setSelected(isSelected);
                    if(nodeList3DMJTexiao[i].getChildByName("text")) {
                        nodeList3DMJTexiao[i].getChildByName("text").setTextColor(color);
                    }

                    if(isSelected) {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_3DMJTexiaoType, i);
                        MjClient.Game3DTexiao = i;
                        COMMON_UI.addAniEatCardsBtn(); // 设置一次3d麻将的吃碰杠按钮特效
                    }
                }
            }
        };
        var texiaoList = [];
        var gameTexiaoType = getCurrent3DMJTexiaoType();
        texiaoList = nodeList3DMJTexiao.slice();
        for (var i = 0; i < texiaoList.length; i ++){
            var color = gameTexiaoType === i ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2;
            texiaoList[i].setSelected(gameTexiaoType === i);
            texiaoList[i].addEventListener(gameTexiaoEventCb_3D, this);
            texiaoList[i].getChildByName("text").setTextColor(color);
        }


        // 2D麻将皮肤设置
        var nodeList2DMJBg = [];
        for (var i = 0; true; i ++)
        {
            var MJBg = this.scrollView_2D.getChildByName("MJBg" + (i + 1));
            if (!MJBg) break;
            nodeList2DMJBg.push(MJBg);
        }
        this.nodeList2DMJBg = nodeList2DMJBg;
        this._playNode_2DMJBg_radio = createRadioBoxForCheckBoxs(nodeList2DMJBg, this.radioBoxSelectCB);
        this.addListenerText(nodeList2DMJBg, this._playNode_2DMJBg_radio);

        for (var i = 0; i < nodeList2DMJBg.length; i ++)
        {
            cc.eventManager.addListener(this.setTextClick(nodeList2DMJBg, i, this._playNode_2DMJBg_radio), nodeList2DMJBg[i].getChildByName("Image"));
            var text_node = nodeList2DMJBg[i].getChildByName("text");
            if (text_node) cc.eventManager.addListener(this.setTextClick(nodeList2DMJBg, i, this._playNode_2DMJBg_radio), text_node);
        }

        var MJBg2DEventCb = function (sender, type) {
            if (type === ccui.CheckBox.EVENT_SELECTED || type === ccui.CheckBox.EVENT_UNSELECTED)
            {
                for (var i = 0; i < nodeList2DMJBg.length; i ++)
                {
                    var color = nodeList2DMJBg[i] === sender ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2;
                    nodeList2DMJBg[i].setSelected(sender === nodeList2DMJBg[i]);
                    if(nodeList2DMJBg[i].getChildByName("text"))
                    {
                        nodeList2DMJBg[i].getChildByName("text").setTextColor(color);
                    }

                    if(sender === nodeList2DMJBg[i])
                    {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJBgType, i);
                        postEvent("changeMJBgEvent", i);
                    }
                }
            }
        };

        // 3D麻将皮肤设置
        var nodeList3DMJBg = [];
        for (var i = 0; true; i ++) {
            var MJBg = this.scrollView_3D.getChildByName("MJ3D" + (i + 1));
            if (!MJBg) break;
            nodeList3DMJBg.push(MJBg);
        }
        this.nodeList3DMJBg = nodeList3DMJBg;
        this._playNode_3DMJBg_radio = createRadioBoxForCheckBoxs(nodeList3DMJBg, this.radioBoxSelectCB);
        this.addListenerText(nodeList3DMJBg, this._playNode_3DMJBg_radio);

        for (var i = 0; i < nodeList3DMJBg.length; i ++) {
            cc.eventManager.addListener(this.setTextClick(nodeList3DMJBg, i, this._playNode_3DMJBg_radio), nodeList3DMJBg[i].getChildByName("Image"));
            var text_node = nodeList3DMJBg[i].getChildByName("text");
            if (text_node) cc.eventManager.addListener(this.setTextClick(nodeList3DMJBg, i, this._playNode_3DMJBg_radio), text_node);
        }

        var MJBg3DEventCb = function (sender, type) {
            if (type === ccui.CheckBox.EVENT_SELECTED || type === ccui.CheckBox.EVENT_UNSELECTED)
            {
                for (var i = 0; i < nodeList3DMJBg.length; i ++)
                {
                    var color = nodeList3DMJBg[i] === sender ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2;
                    nodeList3DMJBg[i].setSelected(sender === nodeList3DMJBg[i]);
                    if(nodeList3DMJBg[i].getChildByName("text"))
                    {
                        nodeList3DMJBg[i].getChildByName("text").setTextColor(color);
                    }

                    if(sender === nodeList3DMJBg[i])
                    {
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_3DMJBgType, i);
                        postEvent("changeMJBgEvent", i);
                    }
                }
            }
        };

        //  2、3D刷新麻将皮肤状态
        for (var i = 0; i < nodeList3DMJBg.length; i++){
            nodeList3DMJBg[i].addEventListener(MJBg3DEventCb, this);
        }
        for (var i = 0; i < nodeList2DMJBg.length; i++){
            nodeList2DMJBg[i].addEventListener(MJBg2DEventCb, this);
        }
        this.updateMJSkinSelected();   // 刷新麻将皮肤状态


        // ----------------------------------Panel2 功能设置 -------------------------------
        this.SliderMusic = this.panel2.getChildByName("SliderMusic");
        this.SliderVoice = this.panel2.getChildByName("SliderVoice");
        this.SliderSpeak = this.panel2.getChildByName("SliderSpeak");
        this.CheckBoxMusic = this.panel2.getChildByName("CheckBoxMusic");   // noMusic
        this.CheckBoxVoice = this.panel2.getChildByName("CheckBoxVoice");   // noVoice
        this.CheckBoxSpeak = this.panel2.getChildByName("CheckBoxSpeak");   // noSpeak
        this.CheckBoxMandarin = this.panel2.getChildByName("CheckBoxMandarin");  // 普通话
        this.CheckBoxDialect = this.panel2.getChildByName("CheckBoxDialect");  // 本地话
        this.DaCard = this.panel2.getChildByName("daCard");                    // 大手牌
        this.XiaoCard = this.panel2.getChildByName("xiaoCard");                // 小手牌
        this.txtCardSize = this.panel2.getChildByName("txtCardSize");

        // 音乐和音效
        this.CheckBoxMusic.setSelected(util.localStorageEncrypt.getNumberItem("oldMusicVolume", -1) != -1);
        this.CheckBoxVoice.setSelected(util.localStorageEncrypt.getNumberItem("oldEffectVolume", -1) != -1);
        this.CheckBoxSpeak.setSelected(util.localStorageEncrypt.getNumberItem("oldSpeakVolume", -1) != -1);
        this.CheckBoxMusic.addEventListener(function (sender, type) {
            switch (type){
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", this.SliderMusic.getPercent() / 100);
                    this.CheckBoxMusic.setSelected(true);
                    this.SliderMusic.setPercent(0);
                    setMusicVolume(0);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var v = util.localStorageEncrypt.getNumberItem("oldMusicVolume", 0);
                    this.CheckBoxMusic.setSelected(false);
                    this.SliderMusic.setPercent(v * 100);
                    setMusicVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldMusicVolume", -1);
                    break;
            }
        }, this);


        this.CheckBoxVoice.addEventListener(function(sender,type) {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", this.SliderVoice.getPercent() / 100);
                    this.CheckBoxVoice.setSelected(true);
                    this.SliderVoice.setPercent(0);
                    setEffectsVolume(0);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var v = util.localStorageEncrypt.getNumberItem("oldEffectVolume", 0);
                    this.CheckBoxVoice.setSelected(false);
                    this.SliderVoice.setPercent(v * 100);
                    setEffectsVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldEffectVolume", -1);
                    break;
            }
        },this);

        this.CheckBoxSpeak.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    util.localStorageEncrypt.setNumberItem("oldSpeakVolume", this.SliderSpeak.getPercent() / 100);
                    this.CheckBoxSpeak.setSelected(true);
                    this.SliderSpeak.setPercent(0);
                    setSpeakVolume(0);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var v = util.localStorageEncrypt.getNumberItem("oldSpeakVolume", 0);
                    this.CheckBoxSpeak.setSelected(false);
                    this.SliderSpeak.setPercent(v * 100);
                    setSpeakVolume(v);
                    util.localStorageEncrypt.setNumberItem("oldSpeakVolume", -1);
                    break;
            }
        },this);


        // 语音包设置
        var languageList = [];
        languageList.push(this.CheckBoxMandarin);
        languageList.push(this.CheckBoxDialect);

        this.language_radio = createRadioBoxForCheckBoxs(languageList, this.radioBoxSelectCB);
        this.addListenerText(languageList, this.language_radio);

        var voiceType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 0);
        this.language_radio.selectItem(voiceType);
        this.radioBoxSelectCB(voiceType, languageList[voiceType], languageList);


        // 手牌大小设置
        if(this.XiaoCard && this.DaCard){
            this.XiaoCard.addTouchEventListener(function (sender, type) {
                if (type === 2) {
                    util.localStorageEncrypt.setNumberItem(MjClient.KEY_mjhand_size, 1);
                    COMMON_UI.mjhandSizeSet();
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Shoupaidaxiao_Xiao", {uid: SelfUid()});
                }
            });

            this.DaCard.addTouchEventListener(function (sender, type) {
                if (type === 2) {
                    util.localStorageEncrypt.setNumberItem(MjClient.KEY_mjhand_size, 0);
                    COMMON_UI.mjhandSizeSet();
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Gongenengshezhi_Shoupaidaxiao_Da", {uid: SelfUid()});

                }
            });


            var cardSizeList = [];
            cardSizeList.push(this.DaCard);
            cardSizeList.push(this.XiaoCard);
            this.cardSizeList_radio = createRadioBoxForCheckBoxs(cardSizeList, this.radioBoxSelectCB, 1);
            this.addListenerText(cardSizeList, this.cardSizeList_radio);


            if(GameClass[MjClient.gameType] === MjClient.GAME_CLASS.MA_JIANG) {
                var cardSize = util.localStorageEncrypt.getNumberItem(MjClient.KEY_mjhand_size, 1);
                this.cardSizeList_radio.selectItem(cardSize);
                this.radioBoxSelectCB(cardSize, cardSizeList[cardSize], cardSizeList);
            }else{
                this.XiaoCard.visible = false;
                this.DaCard.visible = false;
                this.txtCardSize.visible = false;
            }
        }

        MjClient.setui = this;
        BindUiAndLogic(setui.node, this.jsBind);
        this.addChild(setui.node);
        return true;
    },
    onEnter:function(){
        this._super();
        this.update3DTo2DView();
    },
    onExit:function() {
        this._super();
        var languageIndex = 0;
        if(MjClient.setui.CheckBoxMandarin.isSelected())
        {
            languageIndex = 0;
        }else if(MjClient.setui.CheckBoxDialect.isSelected()) {
            languageIndex = 1;
        }
        util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, languageIndex);
    },
    getRoomSettingPanel:function (type) {
        var btnPicture = this.menu.getChildByName("picture");
        var btnFunction = this.menu.getChildByName("function");
        var type = type ? type : util.localStorageEncrypt.getNumberItem("menu", 1);
        if (type === 1) {
            btnPicture.loadTextureNormal("setting/setting_new/bg_menu1.png");
            btnPicture.loadTexturePressed("setting/setting_new/bg_menu1.png");
            btnFunction.loadTextureNormal("setting/setting_new/bg_menu2_n.png");
            btnFunction.loadTexturePressed("setting/setting_new/bg_menu2_n.png");
        } else {
            btnPicture.loadTextureNormal("setting/setting_new/bg_menu1_n.png");
            btnPicture.loadTexturePressed("setting/setting_new/bg_menu1_n.png");
            btnFunction.loadTextureNormal("setting/setting_new/bg_menu2.png");
            btnFunction.loadTexturePressed("setting/setting_new/bg_menu2.png");
        }
    },
    addListenerText: function(node, radio, callback) {
        if (node && radio) {
            for (var i = 0; i < node.length; i++) {
                node[i].getChildByName("text").ignoreContentAdaptWithSize(true);
                cc.eventManager.addListener(this.setTextClick(node, i, radio, callback), node[i].getChildByName("text"));
            }
        } else if (callback) {
            node.getChildByName("text").ignoreContentAdaptWithSize(true);
            cc.eventManager.addListener(this.setTextClick(null, null, null, callback), node.getChildByName("text"));
        }else {
            node.getChildByName("text").ignoreContentAdaptWithSize(true);
            cc.eventManager.addListener(this.setTextClick(), node.getChildByName("text"));
        }
    },
    radioBoxSelectCB: function(index, sender, list) {
        if (sender) {
            var txt = sender.getChildByName("text");
            txt.setTextColor(COLOR.SETTNG_COLOR_1);
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var radioBox = list[i];
                if (radioBox !== sender || sender.isSelected() == false) {
                    txt = radioBox.getChildByName("text");
                    txt.setTextColor(COLOR.SETTNG_COLOR_2);
                }
            }
        }
    },
    setTextClick: function (listnode,number,radio,callback) {
        var that = this;
        var _callback = callback || function(){};
        return cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
                radio.childIsMove = false;
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
            onTouchMoved: function (touch, evnet) {
                radio.childIsMove = true;
            },
            onTouchEnded: function (touch, event) {
                if(radio.childIsMove) return;    // 如果复选框孩子节点（图片或者文字）被滑动，则阻止事件触发
                var target = event.getCurrentTarget();
                var pos = target.getParent().convertTouchToNodeSpace(touch); // 世界坐标转换 (子节点相对于父节点的位置)
                if (listnode) {
                    for (var i = 0; i < listnode.length; i++) {
                        if (i==number) {
                            listnode[i].setSelected(true);
                            var txt = listnode[i].getChildByName("text");
                            txt.setTextColor(COLOR.SETTNG_COLOR_1);
                            txt.ignoreContentAdaptWithSize(true);
                            radio.selectItem(i);
                        }else{
                            listnode[i].setSelected(false);
                            var txt = listnode[i].getChildByName("text");
                            txt.setTextColor(COLOR.SETTNG_COLOR_2);
                            txt.ignoreContentAdaptWithSize(true);
                        }
                    }
                    // _playNode_MJGameBg_radio
                    if (radio == that._playNode_MJGameBg_radio) {
                        cc.log(" ======= sender  MJGameBg", number);
                        var gameBgType = number;
                        setCurrentGameBgType(gameBgType);
                        postEvent("changeGameBgEvent");
                    }

                    // _playNode_MJGameBg_3D_radio
                    if (radio == that._playNode_MJGameBg_3D_radio) {
                        cc.log(" ======= sender  MJGameBg_3D", number);
                        setCurrentGameBgType(number);
                        postEvent("changeGameBgEvent");
                    }

                    // _playNode_MJGameTexiao_3D_radio
                    if (radio == that._playNode_MJGameTexiao_3D_radio) {
                        cc.log(" ======= sender  MJGameTexiao_3D", number);
                        var type = number;
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_3DMJTexiaoType, type);
                        MjClient.Game3DTexiao = type;
                        COMMON_UI.addAniEatCardsBtn(); // 设置一次3d麻将的吃碰杠按钮特效
                    }

                    if(radio === that.cardSizeList_radio){
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_mjhand_size, number);
                        COMMON_UI.mjhandSizeSet();
                    }

                    // _playNode_2DMJBg_radio
                    if (radio == that._playNode_2DMJBg_radio) {
                        cc.log(" ======= sender  MJBg  ",number);
                        var type = number;
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJBgType, type);
                        postEvent("changeMJBgEvent", type);
                    }

                    // _playNode_3DMJBg_radio
                    if (radio === that._playNode_3DMJBg_radio) {
                        cc.log(" ======= sender  3DMJBg  ",number);
                        var type = number;
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_3DMJBgType, type);
                        postEvent("changeMJBgEvent", type);
                    }

                    if (radio == that._playNode_PKImg_radio) {
                        var type = number;
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_PKImgType, type);
                        postEvent("changePKImgEvent", type);
                    }


                    if(radio == that.language_radio){
                        util.localStorageEncrypt.setNumberItem(MjClient.KEY_voiceType, number);
                    }

                }
                else {
                    // 如果触碰起始地点在本区域中
                    if(!cc.rectContainsPoint(target.getBoundingBox(), pos))
                        return;

                    target.parent.setSelected(!target.parent.isSelected());

                    var txt = target.parent.getChildByName("text");
                    txt.ignoreContentAdaptWithSize(true);
                    if (txt && target.parent.isSelected()) {
                        txt.setTextColor(COLOR.SETTNG_COLOR_1);
                    } else {
                        txt.setTextColor(COLOR.SETTNG_COLOR_2);
                    }
                }
                _callback(number);
            }
        });
    },
    update3DTo2DView: function () {
        var is3D = COMMON_UI3D.getIs3DFromLocalStorage();
        var btn_2D = this.panel1.getChildByName("btn_2D");
        var btn_3D = this.panel1.getChildByName("btn_3D");
        var scrollView_2D = this.panel1.getChildByName("scrollView_2D");
        var scrollView_3D = this.panel1.getChildByName("scrollView_3D");
        scrollView_2D.scrollToTop(0.01, true);
        scrollView_3D.scrollToTop(0.01, true);

        // 可以设置3D桌面
        if(COMMON_UI3D.isCanChangTo3D()) {

            if (is3D) {
                btn_3D.loadTextureNormal("setting/setting_new/3D_s.png");
                btn_2D.loadTextureNormal("setting/setting_new/2D_n.png");
            } else {
                btn_3D.loadTextureNormal("setting/setting_new/3D_n.png");
                btn_2D.loadTextureNormal("setting/setting_new/2D_s.png");
            }

            scrollView_2D.visible = !is3D;
            scrollView_3D.visible = is3D;
        }
        else
        {
            // 非3D桌面
            btn_3D.loadTextureNormal("setting/setting_new/3D0.png");
            btn_2D.loadTextureNormal("setting/setting_new/2D_s.png");
            btn_3D.setTouchEnabled(false);
            btn_2D.setTouchEnabled(false);

            scrollView_2D.visible = true;
            scrollView_3D.visible = false;
        }
    },
    updateMJSkinSelected: function() {
        var MJType = getCurrentMJBgType();
        var curNodeList = [];
        if(COMMON_UI3D.is3DUI()){
            curNodeList = this.nodeList3DMJBg;
        }else{
            curNodeList = this.nodeList2DMJBg;
        }
        if(curNodeList){
            for (var i = 0; i < curNodeList.length; i++) {
                curNodeList[i].setSelected(MJType === i);
                curNodeList[i].getChildByName("text").setTextColor(MJType === i ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
            }
        }
    },
    updateGameBgSelected: function(){
        var gameBgType = getCurrentGameBgType();
        var curNodeList = [];
        if(COMMON_UI3D.is3DUI()){
            curNodeList = this.nodeListgame3DMJBg;
        }else{
            curNodeList = this.nodeListgame2DMJBg;
        }
        if(curNodeList){
            for (var i = 0; i < curNodeList.length; i++) {
                curNodeList[i].setSelected(gameBgType === i);
                curNodeList[i].getChildByName("text").setTextColor(gameBgType === i ? COLOR.SETTNG_COLOR_1 : COLOR.SETTNG_COLOR_2);
            }
        }
    },
    removeSettingPanel: function () {
        if(cc.sys.isObjectValid(MjClient.setui)) {
            MjClient.setui.removeFromParent(true);
            delete MjClient.setui;
        }
    }
});

function getgametabindex(gameType) {
    var _list1 = MjClient.gameListConfig.majiangList || [];
    var _list2 = MjClient.gameListConfig.jinZhongList || [];
    var _list3 = MjClient.gameListConfig.lvLiangList || [];
    var _list4 = MjClient.gameListConfig.linFenList || [];
    var _list5 = MjClient.gameListConfig.xinZhouList || [];
    var _list6 = MjClient.gameListConfig.daTongList || [];
    var _list7 = MjClient.gameListConfig.yunChengList || [];
    var _btnNameArray = ["all", "jinzhong", "lvliang", "linfen", "xinzhou", "datong", "yuncheng"];
    var gameList = [_list1, _list2, _list3, _list4, _list5, _list6,_list7];
     gameType=getsamegametype(gameType);
    var searchindex=0;
    for (var i=0;i<gameList.length;i++)
    {
       var  gameTypeList = gameList[i];
        if (gameTypeList.indexOf(gameType) >=0) {
            searchindex=i;
            break;
        }
        if(i==(gameList.length-1)&&gameTypeList.indexOf(gameType)<0)
        {
            gameType = gameTypeList[0];
            //找不到
        }
    }
    return searchindex;
}

var NetErrorLayer = cc.Layer.extend({
	jsBind:{
		block:{
			_layout:[[1,1],[0.5,0.5],[0,0],true],
		},
		restart:{
			_layout:[[0.5,0.5],[0.5,0.5],[0,0]],
			_click:function()
			{
                MjClient.restartGame();
			}
		},
	},
    ctor:function ()
	{
		this._super();
        var netui = ccs.load("NetError.json");
		BindUiAndLogic(netui.node,this.jsBind);
        this.addChild(netui.node);
		MjClient.netui=this;
        return true;
	}
});



// 山西，湖南，牌桌3D/2D开关 - by Tom
var RoomTableSwitch = cc.Layer.extend({
    jsBind:
    {
        block:
        {
            _layout:[[1,1],[0.5,0.5],[0,0],true],
        },
        back:
        {
            btn_3D:
            {
                _visible: true,
                _click:function()
                {
                    var bool = true;
                    MjClient.roomTableSwitch.switchTable(bool);
                }
            },
            btn_2D:
            {
                _visible:true,
                _click:function()
                {
                    var bool = false;
                    MjClient.roomTableSwitch.switchTable(bool);
                }
            },
            submit:
            {
                _visible: true,
                _click: function()
                {
                    if(MjClient.roomTableSwitch)
                    {
                        MjClient.roomTableSwitch.removeFromParent(true);
                        MjClient.roomTableSwitch = null;
                        util.localStorageEncrypt.setBoolItem("canShowRoomTableSwitch", false);
                    }
                }
            }
        }
    },
    ctor: function ()
    {
        this._super();
        var jsonFile = "setting_table.json";
        var ui = ccs.load(jsonFile);
        MjClient.roomTableSwitch = this;
        BindUiAndLogic(ui.node, this.jsBind);
        this.addChild(ui.node);

        var _back = ui.node.getChildByName("back");
        this.btn_3D = _back.getChildByName("btn_3D");
        this.btn_2D = _back.getChildByName("btn_2D");
        MjClient.roomTableSwitch.updateButton();
        setWgtLayout(_back, [0.72, 0.72], [0.5, 0.5], [0, 0], true);
        if(isIPad()) setWgtLayout(_back, [0.5, 0.5], [0.5, 0.5], [0, 0], true);

        return true;
    },
    updateButton: function ()
    {
        var is3D = COMMON_UI3D.getIs3DFromLocalStorage();
        var btn_2D = this.btn_2D;
        var btn_3D = this.btn_3D;
        if(is3D)
        {
            btn_3D.loadTextureNormal("setting/setting_table/3D_s.png");
            btn_2D.loadTextureNormal("setting/setting_table/2D_n.png");
        }
        else
        {
            btn_3D.loadTextureNormal("setting/setting_table/3D_n.png");
            btn_2D.loadTextureNormal("setting/setting_table/2D_s.png");
        }
    },
    switchTable: function (bool)
    {
        var currentTableIs3D = COMMON_UI3D.getIs3DFromLocalStorage();
        // 防止连续点击:当前选项和当前选择不一致时，再进行切换
        if(currentTableIs3D !== bool)
        {
            if (MjClient.playui.isNewFrameMaJiang) {
                //新版麻将框架
                MjClient.playui.set3DType(bool);  
                postEvent("switch2Dor3D", {is3D: bool}); 
            } else {
                COMMON_UI3D.switch2DTo3D();
            }

            COMMON_UI3D.setIs3DFromLocalStorage(bool);
            postEvent("changeGameBgEvent");
            postEvent("changeMJBgEvent");
            MjClient.roomTableSwitch.updateButton();
        }
    }
});


if(isJinZhongAPPType() ||
    MjClient.getAppType() === MjClient.APP_TYPE.QXJSMJ ||
    MjClient.getAppType() === MjClient.APP_TYPE.AYGUIZHOUMJ ||
    MjClient.getAppType() === MjClient.APP_TYPE.QXXZMJ ||
    MjClient.getAppType() === MjClient.APP_TYPE.QXHAMJ ||
    MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP ||
    MjClient.getAppType() === MjClient.APP_TYPE.QXHAIANMJ ||
    MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
    MjClient.getAppType() === MjClient.APP_TYPE.YLHUNANMJ)
{
    SettingView = RoomPerfectSettingView;
    SettingViewCard = RoomPerfectSettingView;
}

//永州项目方法转换
if(MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() === MjClient.APP_TYPE.QXLYQP ||
    MjClient.getAppType() === MjClient.APP_TYPE.BDHYZP || MjClient.getAppType() === MjClient.APP_TYPE.BDYZPHZ ||
    MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
    MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ)
{
    getCurrentGameBgType = getCurrentGameBgType_yongzhou;
    setCurrentGameBgType = setCurrentGameBgType_yongzhou;
    getCurrentMJBgType = getCurrentMJBgType_yongzhou;
    SettingView = SettingView_yongzhou;
}
