/******************************************************
 *			       游戏设置相关方法					  *
 *		          add by zhenggang 					  *
 *			          2019.3.8						  *
 ******************************************************/

majiang_panel.prototype.initSettingData = function(){
	MjClient.KEY_MA_JIANG_SETTING_TYPE 			= "_MJ_SETTING_TYPE";							//麻将设置页面

	MjClient.KEY_MA_JIANG_BG_TYPE  				= "_MJ_BG_TYPE" + this.getGameType();			//麻将牌背背景
	MjClient.KEY_GAME_BG_TYPE 					= "_GAME_BG_TYPE" + this.getGameType();			//麻将游戏背景

	MjClient.KEY_MJ_SPEAK_VOLUME    			= "SpeakVolume";                        		//通话语音音量
	MjClient.KEY_MJ_EFFECT_VOLUME   			= "EffectVolume";                       		//麻将音效音量
	MjClient.KEY_MJ_MUSIC_VOLUME    			= "MusicVolume";                        		//麻将背景音量
	MjClient.KEY_MJ_VOICE_TYPE      			= "_VOICE_TYPE";                        		//麻将语音类别（普通话/方言）
	MjClient.KEY_MJ_3D_EFFECT_TYPE  			= "_3DMJ_TEXIAO_TYPE";            				//开启麻将中的特效
	MjClient.KEY_MJ_CARD_SIZE_TYPE  			= "_MJHAND_SIZE";            					//麻将的大小

	MjClient.KEY_MJ_3D_STYLE_GOLD_FIELD   		= "GoldFieldTableIs3D";							//金币场3D
	MjClient.KEY_MJ_3D_STYLE_COMMON   			= "TableIs3D";									//普通场

	MjClient.KEY_3D_MA_JIANG_BG_TYPE  			= "_3DMJ_BG_TYPE" + this.getGameType();			//3D麻将牌背
	MjClient.KEY_3D_GAME_BG_TYPE 				= "_GAME_BG_TYPE_3D" + this.getGameType();		//3D游戏背景

	MjClient.hasPutScale                        = "hasPutScale";                        //是否需要出牌放大 getPutCardScaleConfig()
	MjClient.hasInsertAni                       = "hasInsertAni";                       //是否需要插牌动画 getInsertCardAniConfig()
};

/**
 *	获得游戏类型
 *	return {Number}
 **/
majiang_panel.prototype.getGameType = function(){
	return MjClient.gameType;
};

/**
 *	获得麻将背景
 *	return {Number}
 **/
majiang_panel.prototype.getMaJiangSettingType = function(){
	return util.localStorageEncrypt.getNumberItem(MjClient.KEY_MA_JIANG_SETTING_TYPE, 1);
};

/**
 *	设置麻将背景
 *	return {Number}
 **/
majiang_panel.prototype.setMaJiangSettingType = function(number){
	return util.localStorageEncrypt.setNumberItem(MjClient.KEY_MA_JIANG_SETTING_TYPE, number);
};

/**
 *	获得麻将背景
 *	return {Number}
 **/
majiang_panel.prototype.getMaJiangBgType = function(){
	var is3D = this.get3DType();
	if(is3D){
		var value = util.localStorageEncrypt.getNumberItem(MjClient.KEY_3D_MA_JIANG_BG_TYPE, 0);
		value = value > 1 ? 0 : value;
		return value;
	}
	return util.localStorageEncrypt.getNumberItem(MjClient.KEY_MA_JIANG_BG_TYPE, 1);
};

/**
 *	设置麻将背景
 *	return {Number}
 **/
majiang_panel.prototype.setMaJiangBgType = function(number){
	var is3D = this.get3DType();
	if(is3D){
		util.localStorageEncrypt.setNumberItem(MjClient.KEY_3D_MA_JIANG_BG_TYPE, number);
	}else{
		util.localStorageEncrypt.setNumberItem(MjClient.KEY_MA_JIANG_BG_TYPE, number);
	}
};

/**
 *	获得游戏背景
 *	return {Number}
 **/
majiang_panel.prototype.getGameBgType = function(){
	if(this.get3DType()){
		return util.localStorageEncrypt.getNumberItem(MjClient.KEY_3D_GAME_BG_TYPE, 0);
	}
	return util.localStorageEncrypt.getNumberItem(MjClient.KEY_GAME_BG_TYPE, 2);
};

// 设置游戏背景
majiang_panel.prototype.setGameBgType = function(number){
	if(this.get3DType()){
		util.localStorageEncrypt.setNumberItem(MjClient.KEY_3D_GAME_BG_TYPE, number);
		return;
	}
	util.localStorageEncrypt.setNumberItem(MjClient.KEY_GAME_BG_TYPE, number);
};

// 获得牌的字体 文件路径 FileName
majiang_panel.prototype.getCurrentCardTypeFile = function(){ 
	var type = this.getCurrentCardType(); 
	return "res/...";
};

// 设置通话音量
majiang_panel.prototype.setSpeakVolume = function(number){ 
	if(number > 1) number = number * 0.01; // 传进来的值是100为标准需要转换
	util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJ_SPEAK_VOLUME, number);
};

// 获取通话音量
majiang_panel.prototype.getSpeakVolume = function(){ 
	return util.localStorageEncrypt.getNumberItem(MjClient.KEY_MJ_SPEAK_VOLUME, 0.5);
};

// 设置麻将音效音量
majiang_panel.prototype.setEffectVolume = function(number){ 
	if(number > 1) number = number * 0.01; // 传进来的值是100为标准需要转换
	util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJ_EFFECT_VOLUME, number);
};

// 麻将音效音量
majiang_panel.prototype.getEffectVolume = function(){ 
	return util.localStorageEncrypt.getNumberItem(MjClient.KEY_MJ_EFFECT_VOLUME, 0.5);
};

// 设置麻将音效音量
majiang_panel.prototype.setMusicVolume = function(number){ 
	if(number > 1) number = number * 0.01; // 传进来的值是100为标准需要转换
	cc.audioEngine.setMusicVolume(number);
	util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJ_MUSIC_VOLUME, number);
};

// 麻将音效音量
majiang_panel.prototype.getMusicVolume = function(){ 
	return util.localStorageEncrypt.getNumberItem(MjClient.KEY_MJ_MUSIC_VOLUME, 0.5);
};

// 设置麻将音效类型
majiang_panel.prototype.setVoiceType = function(number){ 
	util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJ_VOICE_TYPE, number);
};

// 获取麻将音效类型 
majiang_panel.prototype.getVoiceType = function(){ 
	return util.localStorageEncrypt.getNumberItem(MjClient.KEY_MJ_VOICE_TYPE, 1);
};

// 设置麻将特效开关
majiang_panel.prototype.set3DTeXiaoType = function(number){ 
	util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJ_3D_EFFECT_TYPE, number);
};

// 设置麻将特效开关
majiang_panel.prototype.get3DTeXiaoType = function(){ 
	return util.localStorageEncrypt.getNumberItem(MjClient.KEY_MJ_3D_EFFECT_TYPE, 0);
};

// 获取麻将显示的大小
majiang_panel.prototype.getCardSizeType = function(){ 
	return util.localStorageEncrypt.getNumberItem(MjClient.KEY_MJ_CARD_SIZE_TYPE, 1);
};

// 设置麻将显示的大小
majiang_panel.prototype.setCardSizeType = function(number){ 
	util.localStorageEncrypt.setNumberItem(MjClient.KEY_MJ_CARD_SIZE_TYPE, number);
};

// top位置玩家出的牌是否相对down玩家旋转180
majiang_panel.prototype.isCardRotationOfTopPlayer = function(cardNode){ 
	return false;
};


// 获取语音名字
majiang_panel.prototype.getVoiceNameList = function(){  
	return ["普通话","本地话","长沙话"];
};


majiang_panel.prototype.getGameBgList = function(is3D) {
	if(is3D){ // 3dBG资源
		return ["playing/gameTable/beijing3D_1.jpg", "playing/gameTable/beijing3D_2.jpg",
    	"playing/gameTable/beijing3D_3.jpg", "playing/gameTable/beijing3D_4.jpg"];
	}
    return ["playing/gameTable/beijing_1.png", "playing/gameTable/beijing_2.jpg",
    "playing/gameTable/beijing_3.jpg", "playing/gameTable/beijing_4.jpg"];
};

// 背景名称
majiang_panel.prototype.getGameBgNameList = function(is3D) {
	if(is3D){
		return ["经典","碧绿","翡翠","海蓝"];
	}
	return ["蓝绿","靛蓝","湖蓝","淡绿"];
};

// 牌背
majiang_panel.prototype.getCardBgList = function(is3D) {
	if(is3D){
		return ["playing/MJ/MJBg3D1", "playing/MJ/MJBg3D2"];
	}
    return ["playing/MJ/MJBg2", "playing/MJ/MJBg1", "playing/MJ/MJBg4", "playing/MJ/MJBg3"];
};

// 牌背
majiang_panel.prototype.getCardBgNameList = function(is3D) {
	if(is3D){
		return ["经典", "流行"];
	}
    return ["经典绿","土豪金","自然","精致"];
};

// 牌面
majiang_panel.prototype.getCardFrontList = function(is3D) {
	if(is3D){
		return ["playing/MJ/MJCard3D1", "playing/MJ/MJCard3D2"];
	}
    return ["playing/MJ/MJCard2", "playing/MJ/MJCard1", "playing/MJ/MJCard4", "playing/MJ/MJCard3"];
};


// 插牌动画 数据持久化 默认开启
majiang_panel.prototype.setInsertCardAniConfig = function(bool){
	util.localStorageEncrypt.setBoolItem(MjClient.hasInsertAni, Boolean(bool));
};


majiang_panel.prototype.getInsertCardAniConfig = function(){
	return util.localStorageEncrypt.getBoolItem(MjClient.hasInsertAni, true);
};

// 是否显示动效text
majiang_panel.prototype.isShowDonXiaoText = function(){
	return true;
};

// 是否显示插牌动画开关
majiang_panel.prototype.isShowInsertCard = function(){
	return true;
};

// 是否显示出牌放大开关
majiang_panel.prototype.isShowPutCardScale = function(){
	return true;
};

// 出牌放大 数据持久化 默认开启
majiang_panel.prototype.setPutCardScaleConfig = function(bool){
	util.localStorageEncrypt.setBoolItem(MjClient.hasPutScale, Boolean(bool));
};


majiang_panel.prototype.getPutCardScaleConfig = function(){
	return util.localStorageEncrypt.getBoolItem(MjClient.hasPutScale, true);
};

// 设置是否is3D, 金币场和普通场，记录分离
majiang_panel.prototype.set3DType = function(bool){
    if(typeof (bool) === 'undefined' || !MjClient.playui) return;
    var tData = MjClient.data.sData.tData;
    var isGoldField = tData.fieldId;
    if(isGoldField){
        util.localStorageEncrypt.setBoolItem(MjClient.KEY_MJ_3D_STYLE_GOLD_FIELD, bool);
    }else{
        util.localStorageEncrypt.setBoolItem(MjClient.KEY_MJ_3D_STYLE_COMMON, bool);
    }
};

// 获得3D类型
majiang_panel.prototype.get3DType = function(){
    var is3DNormal = util.localStorageEncrypt.getBoolItem(MjClient.KEY_MJ_3D_STYLE_COMMON, true);
    var is3DGoldField = util.localStorageEncrypt.getBoolItem(MjClient.KEY_MJ_3D_STYLE_GOLD_FIELD, true);
    var sData = MjClient.data.sData;
    if(MjClient.playui && sData){
        var isGoldField = sData.tData.fieldId;
        return isGoldField ? is3DGoldField : is3DNormal;
    }
    return is3DNormal;
};

//是否需要过胡提示
majiang_panel.prototype.isNeedSkipHuTip = function(){
	return false;
};

//是否显示飘分
majiang_panel.prototype.isShowPiao = function(){
	return true;
};