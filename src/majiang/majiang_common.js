/******************************************************
 *			       游戏通用相关方法					  *
 *		          add by zhenggang 					  *
 *			          2019.3.8						  *
 ******************************************************/


/**********************************************命令**********************************************/
/**
 *	发送过的命令
 **/
majiang_panel.prototype.sendPassToServer = function(){
    if (MjClient.rePlayVideo != -1) {
    	return;
    }

    var tData = MjClient.data.sData.tData;
    var sendMsg = {
    	cmd: "MJPass",
    	eatFlag: this.getEatFlag(),
    	cardNext: tData.cardNext
    };
    MjClient.gamenet.request("pkroom.handler.tableMsg", sendMsg);
};

/**
 *	发送吃的命令
 **/
majiang_panel.prototype.sendChiToServer = function (pos){
    if (MjClient.rePlayVideo != -1) {
    	return;
    }
    this.sendAutoPutToServer(false);
    var sendMsg = {
    	cmd: "MJChi",
    	pos:  pos,
    	eatFlag: this.getEatFlag()
    };
    MjClient.gamenet.request("pkroom.handler.tableMsg", sendMsg);
};

/**
 *	发送碰的命令
 **/
majiang_panel.prototype.sendPengToServer = function (){
    if (MjClient.rePlayVideo != -1) {
    	return;
    }
    this.sendAutoPutToServer(false);
    var sendMsg = {
    	cmd: "MJPeng",
    	eatFlag: this.getEatFlag()
    };
    MjClient.gamenet.request("pkroom.handler.tableMsg", sendMsg);
};

/**
 *	发送杠的命令
 **/
majiang_panel.prototype.sendGangToServer = function (card){
    if (MjClient.rePlayVideo != -1) {
    	return;
    }
    this.sendAutoPutToServer(false);
    var sendMsg = {
    	cmd: "MJGang",
    	card: card,
    	eatFlag: this.getEatFlag()
    };
    MjClient.gamenet.request("pkroom.handler.tableMsg", sendMsg);
};

/**
 *	发送胡的命令
 **/
majiang_panel.prototype.sendHuToServer = function (){
    if (MjClient.rePlayVideo != -1) {
    	return;
    }
    this.sendAutoPutToServer(false);
    var sendMsg = {
    	cmd: "MJHu",
    	eatFlag: this.getEatFlag()
    };    
    MjClient.gamenet.request("pkroom.handler.tableMsg", sendMsg);
};

/**
 *	发送语音信息、GPS
 **/
majiang_panel.prototype.sendChatToServer = function (uid, type, msg, index){
	if (MjClient.rePlayVideo != -1){
		return;
	}
	
	var sendMsg = {
		cmd: "MJChat",
		uid: uid,
		type: type,
		msg: msg,
		num: index
	};
    MjClient.gamenet.request("pkroom.handler.tableMsg", sendMsg);
};

/**
 *	发送打牌命令
 **/
majiang_panel.prototype.sendPutToServer = function(cardTag){
    var sendMsg = {
        cmd: "MJPut",
        card: cardTag,
        tingAfterPut: MjClient.playui.clickTing, //这个后台有检测 by sking
    };
	MjClient.gamenet.request("pkroom.handler.tableMsg", sendMsg);	
};

/**
 *	发送打牌命令
 **/
majiang_panel.prototype.sendTingToServer = function(cardTag){
    var sendMsg = {
        cmd: "MJTing",
        card: cardTag,
    };
    MjClient.gamenet.request("pkroom.handler.tableMsg", sendMsg);
};

/**
 *	发送加注命令
 **/
majiang_panel.prototype.sendJiaZhuToServer = function(zhuNum,uid){
    zhuNum = zhuNum || 0;
    var msg = {
        cmd: "MJJiazhu",
        uid: uid,
        jiazhuNum: zhuNum,
    };
    MjClient.gamenet.request("pkroom.handler.tableMsg", msg); 
};
/**
 *  发送自动摸打命令
 **/
majiang_panel.prototype.sendAutoPutToServer = function(isAuto){
    if(!this.isCanAutoPut()){
        return;
    }
    var sendMsg = {
        cmd: "MJTouchPutCard",
        tPutCard: isAuto,
    };
    MjClient.gamenet.request("pkroom.handler.tableMsg", sendMsg);    
};

/**********************************************通用方法**********************************************/

/**
 *	iphone适配
 *	return {Boolean}
 **/
majiang_panel.prototype.isIPhoneX = function(){
    var fator = 2;//2960/1440;
    var currentFator = cc.winSize.width/cc.winSize.height;
    if(currentFator >= fator){
        return true;
    }
    return false;
};

/**
 *	ipad适配
 **/
majiang_panel.prototype.isIPad = function(){
    var fator = 2048/1536;
    var currentFator = cc.winSize.width/cc.winSize.height;
    if(currentFator <= fator){
        return true;
    }
    return false;
};

/**
 *	格式化用户名
 *	userName: 用户名
 *	maxLength: 最大显示长度
 *	isSuffix: 省略的字是否用"..."表示
 **/
majiang_panel.prototype.formatUserName = function(userName, maxLength, isSuffix){
	var name = userName;
    var factLength = name.length;
    maxLength = maxLength === undefined ? 5 : maxLength;
    isSuffix = isSuffix === undefined ? true : isSuffix;

    if(factLength > maxLength){
    	if (isSuffix){
    		name = name.substring(0, maxLength - 1);
    		name += "...";
    	}else{
    		name = name.substring(0, maxLength);
    	}
    }
    return name;
};

/**
 *	最后一个特定分隔符内容
 **/
majiang_panel.prototype.sliceLastWithSep = function(content, sep){
	if(sep == "" || sep === undefined){
		return content;
	}
	var lastIndex = content.lastIndexOf(sep);
	return content.substring(lastIndex + 1, content.length);
};

/**
 *	获取随机数
 **/
majiang_panel.prototype.getRandomRange = function (min, max){
    max = max - min + 1;
    return min + Math.floor(Math.random() * max);
};



/**********************************************通用方法**********************************************/

/**
 *  是否是新版麻将框架
 **/
majiang_panel.prototype.isNewFrameMaJiang = true;

/**
 *	是否支持前端先行
 **/
majiang_panel.prototype.isFrontFirst = function(){
	return true;
};

/**
 *  是否显示癞子牌
 **/
majiang_panel.prototype.isHunCardShow = function(){
    return true;
};

/**
 *  是否显示3D癞子牌
 *  如果是不需要显示的玩法，则直接return false即可
 **/
majiang_panel.prototype.isHunCardShow3D = function(){
    var tData = MjClient.data.sData.tData;
    if (this.isInGame()) {
        return true;
    }
    return false;
};


/**
 *  是否显示飘的文字部分
 **/

majiang_panel.prototype.isShowTextPiao = function(){
    return true;
};


/**
 *	是否显示吃、碰、杠的方向
 **/
majiang_panel.prototype.isShowCardArrow = function(){
	return false;
};

// 是否开启出牌放大特效
majiang_panel.prototype.isOpenPutOutCardAnima = function(){
    return false;
};

/**
 * 是否允许打开 摸牌动画
 * @returns {boolean}
 */
majiang_panel.prototype.isCanPlayNewCardAction = function () {
    return false;
};

/**
 * 是否允许打开 插牌动画
 * @returns {boolean}
 */
majiang_panel.prototype.isCanInsertcard = function () {
    return true;
};

/**
 *  是否可以自动摸打
 **/
majiang_panel.prototype.isCanAutoPut = function(){
    return true;
};

/**
 *  是否显示听牌灯泡标识
 **/
majiang_panel.prototype.isShowTingLight = function(){
    return false;
};

/**
 *  是否显示听牌
 *  return {Boolean}
 **/
majiang_panel.prototype.isShowTingCards = function(){
    var tData = MjClient.data.sData.tData;
    if ("isOpenTingTip" in tData.areaSelectMode){
        return tData.areaSelectMode.isOpenTingTip;
    }
    return true;
};

/**
 *  是否能添加癞子标识
 **/
majiang_panel.prototype.isCanAddLaiZiIcon = function(cardTag){
    var tData = MjClient.data.sData.tData;
    if(!MjClient.majiang.isHunCard || !MjClient.majiang.isHunCard(cardTag, tData.hunCard)){
        return false;
    }
    return true;
};

/**
 *  获得游戏最大人数
 *  return {int}
 **/
majiang_panel.prototype.getMaxPlayer = function(){
    return MjClient.data.sData.tData.maxPlayer;
};

/**
 *  获得打出去牌，每列的最大数
 **/
majiang_panel.prototype.getOutCardMaxRow = function(){
    var maxPlayer = this.getMaxPlayer();
    if(maxPlayer == 2){
        return 20;
    }
    return 12;
};

/**
 *  获得新摸牌的间距
 **/
majiang_panel.prototype.getNewCardSpace = function(){
    return 28;
};

/**
 *  获得吃碰杠的间距，可能根据分辨率需要调整
 **/
majiang_panel.prototype.getEatCardSpace = function(){
    return cc.winSize.height / 36;
};

/**
 *  判断胡牌类型是否为自摸
 */
majiang_panel.prototype.isZiMo = function(huDesc){
    if(!huDesc){
        return false;
    }
    return huDesc.indexOf("zimo") >= 0 || huDesc.indexOf("gangkai") >= 0;
};

/**
 *  获得癞子牌
 **/
majiang_panel.prototype.getHunCard = function(){
    if(MjClient.majiang.getHunCard){
        return MjClient.majiang.getHunCard();
    }
    return MjClient.data.sData.tData.hunCard;
};

/**
 *  是否满员
 *  return {Boolean}
 **/
majiang_panel.prototype.isTableFull = function(){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    return Object.keys(sData.players).length == tData.maxPlayer;
};

/**
 *  是否正在游戏
 *  return {Boolean}
 **/
majiang_panel.prototype.isInGame = function(){
	var tData = MjClient.data.sData.tData;
    if (!tData){
        return false;
    }

    if ( tData.tState == TableState.waitPut ||
         tData.tState == TableState.waitEat ||
         tData.tState == TableState.waitCard)
    {
        return true;
    }
    return false;
};

// 中鸟的内容  
majiang_panel.prototype.getIsZhongBird = function(cd){
    if (cd == 71 ||(cd < 30 && cd % 10 == 1 || cd % 10 == 5 || cd % 10 == 9)) 
    {
       return true;
    }
    return false;
};

/**
 *  是否听所有的牌
 **/
majiang_panel.prototype.isTingAllCards = function(tingCards){
    var allCards = [1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,27,28,29];
    if(Object.keys(tingCards).length < allCards.length){
        return false;
    }
    return true;
};

majiang_panel.prototype.isTing = function(){
    
};

/**
 *  是否开启显示最多听牌标识
 **/
majiang_panel.prototype.isShowMaxTingCards = function(){
    return false;
};


/***
 * 插牌动画需要 倾斜
 * @returns {boolean}
 */
majiang_panel.prototype.isNeedCardRotateAction = function(){
    return false;
};


/**
 *  是否已经开始游戏
 *  return {Boolean}
 **/
majiang_panel.prototype.isBeganGame = function(){
	var tData = MjClient.data.sData.tData;
    if (!tData){
        return false;
    }

    if (tData.tState == TableState.waitPut ||
        tData.tState == TableState.waitEat ||
        tData.tState == TableState.waitCard ||
        tData.tState == TableState.waitSelect ||
        tData.tState == TableState.roundFinish ||
        tData.tState == TableState.waitJiazhu)
    {
        return true;
    }
    return false;
};

/**
 *  获得自己的UID
 *  return {int}
 **/
majiang_panel.prototype.getSelfUid = function(){
    if (MjClient.devLogUid) {
        return Number(MjClient.devLogUid);
    }
    if (MjClient.otherReplayUid) {
        return MjClient.otherReplayUid;
    }
    return MjClient.data.pinfo.uid;
};

/**
 *	获得uid的索引
 **/
majiang_panel.prototype.getUidIndex = function(pUid){
	var tData = MjClient.data.sData.tData;
	return tData.uids.indexOf(pUid);
};

/**
 *  根据uid的获得玩家信息
 **/
majiang_panel.prototype.getUIPlayerByUID = function(uid) {
    var sData = MjClient.data.sData;
    var player = sData.players[uid];
    return player;
};

/**
 *	pUid距离自己的偏移量(根据玩家uid计算该玩家的off)
 **/
majiang_panel.prototype.getOffIndexWithSelf = function(pUid) {
	var index = this.getUidIndex(pUid);
	var maxPlayer = this.getMaxPlayer();
	var selfIndex = this.getUidIndex(this.getSelfUid());
	var offIndex = (index - selfIndex + maxPlayer) % maxPlayer;
	return offIndex;
};

/**
 * 根据index获得玩家信息
 * index: tData.uids里面的索引
 **/
majiang_panel.prototype.getPlayerWithIndex = function(index){
    var tData = MjClient.data.sData.tData;
    var pUid = tData.uids[index];
    var player = this.getUIPlayerByUID(pUid); 
    return player;   
};

/**
 *  是否轮到自己摸牌然后操作
 *  return {Boolean}
 **/
majiang_panel.prototype.isTurnMe = function(){
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var pl = sData.players[this.getSelfUid()];
    if (this.getSelfUid() == tData.uids[tData.curPlayer] && pl.mjState == TableState.waitPut && tData.tState == TableState.waitPut){
        return true;
    }
    return false;
};

/**
 *	获得自己的eatFlag
 *	return {Number}
 **/
majiang_panel.prototype.getEatFlag = function(){
	var sData = MjClient.data.sData;
	return sData.players[this.getSelfUid()].eatFlag;
};


/**
 *  游戏选项拼接
 *  return {String}
 **/
majiang_panel.prototype.getGameDesc = function(){
    var tData = MjClient.data.sData.tData;
    var areaSelectMode = tData.areaSelectMode;
    var contentArr = [];
    for (var key in areaSelectMode){
        var string = getGameCnDesc(tData.gameType, key, areaSelectMode[key], areaSelectMode);
        if(string == ""){
        	continue;
        }
        contentArr.push(string);
    }
    var content = contentArr.join();
    return content;
};

/**
 *  根据cardTag获得对应的听牌
 **/
majiang_panel.prototype.getLimitTingCards = function(cardTag){
    cardTag = cardTag === undefined ? 0 : cardTag;
    var tingCards = this.tingCardsArray[cardTag];
    if(tingCards === undefined){
        return {};
    }
    return tingCards;
};

/**
 *  移除听牌数量为0的牌
 **/
majiang_panel.prototype.removeLimitTingCards = function(tingCards){
    if(Object.keys(tingCards).length == 0){
        return {};
    }
    var cards = JSON.parse(JSON.stringify(tingCards));
    for(var key in cards){
        if(cards[key] == 0){
            delete cards[key];
        }
    }
    return cards;
};

/**
 *  获得最多听牌的手牌
 **/
majiang_panel.prototype.getMaxTingHandCards = function(){
    if(!this.isShowMaxTingCards()){
        return [];
    }
    var tingCardsArray = this.tingCardsArray;
    var searchCards = {}, maxCount = 0;
    for(var key in tingCardsArray){
        if(parseInt[key] == 0){
            continue;
        }
        if(Object.keys(tingCardsArray[key]).length == 0){
            continue;
        }
        var tingCards = tingCardsArray[key];
        var count = 0;
        for(var card in tingCards){
            count += tingCards[card];
        }
        maxCount = count >= maxCount ? count : maxCount;
        searchCards[key] = count;
    }
    if(Object.keys(searchCards).length <= 1){
        return [];
    }

    var maxTingCards = [], isSameCount = true;
    for(var sCard in searchCards){
        var searchCount = searchCards[sCard];
        if(searchCount != maxCount){
            isSameCount = false;
        }
        if(searchCount == maxCount){
            maxTingCards.push(parseInt(sCard));
        }
    }
    if(isSameCount){
        return [];
    }
    return maxTingCards;
};

/**
 *  获得所有的听牌
 **/
majiang_panel.prototype.searchAllTingCards = function(){
    var player = this.getPlayerInfoByName("node_down");
    var mjhand = player.mjhand;
    var tingCards = {}, cardArr = [];
    this.tingCardsArray = {};
    if(mjhand && mjhand.length % 3 == 2){
        var newCard = mjhand[mjhand.length - 1];
        cardArr = this.getAllTouchCards();
        for(var i = 0;i < mjhand.length;i++){
            var card = mjhand[i];
            tingCards = this.getTingCardsWithCount(cardArr, card);
            this.tingCardsArray[card] = tingCards;
        }
    }else if(mjhand && mjhand.length % 3 == 1){
        cardArr = this.getAllTouchCards();
        tingCards = this.getTingCardsWithCount(cardArr);
        this.tingCardsArray[0] = tingCards;
    }
};

/**
 *	获得听牌和听牌数量
 **/
majiang_panel.prototype.getTingCardsWithCount = function(cardArr, cardTag){
	var tingCards = this.getTingCards(cardTag);
	if(Object.keys(tingCards).length == 0){
		return tingCards;
	}
    for (var card in tingCards) {
        var existCount = cardArr[card] ? cardArr[card] : 0;
        existCount = (4 - existCount >= 0) ? (4 - existCount) : 0;
        tingCards[card] = existCount;
    }
    return tingCards;
};

/**
 *  获得听的牌
 *  return {Object}
 **/
majiang_panel.prototype.getTingCards = function(cardTag){
    var tingCards = {};
    if (!this.isInGame()){
        return tingCards;
    }

    if (!this.isShowTingCards()){
        return tingCards;
    }

    var player = this.getPlayerInfoByOff();

    if(!player.mjhand) return tingCards;
    
    var tData = MjClient.data.sData.tData;
    var handCards = player.mjhand.slice();
    if(cardTag){
    	handCards.splice(handCards.indexOf(cardTag), 1);
    }
    tingCards = MjClient.majiang.calTingSet(handCards, tData.hunCard);
    return tingCards;
};

/**
 *	暂停所有的音乐和音效
 *	retrurn {void}
 **/
majiang_panel.prototype.pauseMusicAndAllEffects = function(){
    cc.audioEngine.pauseMusic();
    cc.audioEngine.stopAllEffects();
};

/**
 *	启动背景音乐
 **/
majiang_panel.prototype.resumeMusicAndAllEffects = function(){
	cc.audioEngine.resumeMusic();
};

/**
 *	
 **/
majiang_panel.prototype.stopEffect = function (id){
    if(id == undefined || id == null) return;
    cc.audioEngine.stopEffect(id);
};

/**
 *  播放音效
 **/
majiang_panel.prototype.playEffectInPlay = function(cardTag, isLoop){
    var voiceType = this.getVoiceType() == 0 ? "normal" : MjClient.gameType;
    var origSounds = GameSound4Play[voiceType][cardTag.toString()];
    var sounds = origSounds.concat();
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var player = sData.players[tData.uids[tData.curPlayer]];
    if (!player){
        player = sData.players[this.getSelfUid()];
    }

    if (player && player.info.sex == 1){
        for (var i = 0; i < sounds.length; i++){
            var resetPath = sounds[i].replace("/nv/", "/nan/").replace("/nv_local/", "/nan_local/");
            var fullFilePath = "sound/" + resetPath + ".mp3";
            if (jsb.fileUtils.isFileExist(fullFilePath)){
                sounds[i] = resetPath;
            }
        }
    }
    var randomIndex = Math.floor(Math.random() * sounds.length);
    var soundFile = sounds[randomIndex];
    if(!jsb.fileUtils.isFileExist("sound/" + soundFile + "" + ".mp3")){
        soundFile = sounds[0];
    }
    var str = "sound/"+soundFile+".mp3";
    return this.reallyPlayEffect(str, isLoop);
};

/**
 *	播放音效
 *	sound: 音效名
 *	isLoop: 是否循环
 *	sex: 性别
 **/
majiang_panel.prototype.playEffect = function (sound, isLoop, sex){
    if(MjClient.native.yayaVoice && MjClient.native.yayaVoice._isOpenVoice ){
        return; // 实时语音状态不播放音效    
    }

    var content = "sound/" + sound + ".mp3";
    //支持男女声
    if (content.indexOf("/nv/") >= 0 && sex == 1){
        var fullFilePath = content.replace("/nv/", "/nan/");
        if (jsb.fileUtils.isFileExist(fullFilePath)){
            content = fullFilePath;
        }
    }
    
    return this.reallyPlayEffect(content, isLoop);
};

/**
 *	播放音效
 *	sound: 播放内容
 *	isLoop: 是否循环
 *	isRecord: 是否是语音
 **/
majiang_panel.prototype.reallyPlayEffect = function (content, isLoop, isRecord){
    var vol = 0;
    if (isRecord === true) {
        vol = this.getSpeakVolume();
    }else{
        vol = this.getEffectVolume();
    }

    if (MjClient.atRecord && isLoop !== true){
        return 0;
    }

    if (MjClient.isPlayRecord && isLoop !== true && !isRecord){
        return 0;
    }

    var ret = cc.audioEngine.playEffect(content, isLoop === true, 1, 0, vol + 0.0001);//ios系统不识别0的音效设置
    if (ret && (MjClient.atRecord || (MjClient.isPlayRecord && !isRecord))){
        cc.audioEngine.pauseEffect(ret);
    }

    return ret;
};

/**
 * 下载录音, 调用 播放函数
 * */
majiang_panel.prototype.downAndPlayVoice = function (uid, filePath){
    var index = getUiOffByUid(uid);
    MjClient.native.DownLoadFile(jsb.fileUtils.getWritablePath(), index + ".mp3", MjClient.remoteCfg.voiceUrl + filePath, "playVoice");
};

/**
 *	刷新GPS信息
 **/
majiang_panel.prototype.updateGPSData = function (){
	if(MjClient.rePlayVideo != -1){
		return;
	}

    //高德地图
    var uids = MjClient.data.sData.tData.uids;
    var selfUId = this.getSelfUid();
    var selfIndex = uids.indexOf(selfUId); //自己的位置

    var msg = "";
    var latitude = MjClient.native.GetLatitudePos(); //纬度
    var longitude = MjClient.native.GetLongitudePos(); //经度
    var address = MjClient.native.GetAddress(); //地址
    if (latitude == null || latitude == 0 || latitude == "") {
        latitude = 0;
    }
    if (longitude == null || longitude == 0 || longitude == "") {
        longitude = 0;
    }
    msg = latitude + ";" + longitude + ";" + selfIndex + ";" + SelfUid() + ";" + address;
    this.sendChatToServer(selfUId, 4, msg, 0);
};

/**
 *	信息类型转换
 **/
majiang_panel.prototype.convertInfoType = function(infoType){
	if (MjClient.systemConfig.roomInviteType == "1" && infoType == 2) {
		infoType = 1;
	}
	return infoType;
};

/*
 function : 复制信息,或者获取房间信息打开微信，复制信息
 @infoType :
 0  房间信息  <roundInfo> 通过getGameDesc获取
 1  复制房间号 <getRoomNum>
 2  微信邀请   <wxinvite>
 3  小结算描述
 4  大结算描述
 */
majiang_panel.prototype.inviteFriends = function(infoType){
	infoType = this.convertInfoType(infoType);
    switch(infoType){
    	case 1:
    		this.copyRoomInfo(infoType);
    		break;
    	case 2:
    		this.wxInviteInfo(infoType);
    		break;
    }
};

/**
 *	复制房间信息
 **/
majiang_panel.prototype.copyRoomInfo = function(){
	var tData = MjClient.data.sData.tData;
	var maxPlayer = this.getMaxPlayer();
    var roomInfo = GameCnName[MjClient.gameType] + "," + this.getGameDesc();
    var playerCount = Object.keys(MjClient.data.sData.players).length;
    var needCount = maxPlayer - playerCount;

    var content = tData.roundNum + "局";
    if(tData.areaSelectMode.isQuan){
        content = parseInt(tData.roundNum / tData.areaSelectMode.maxPlayer) + "圈";
    }

    content = content + ",缺" + needCount + "人,速度加入(" + AppCnName[MjClient.getAppType()] + ")\n" + "(复制此消息打开游戏可直接进入该房间)";
    MjClient.native.doCopyToPasteBoard("房间号:[" + tData.tableid + "]\n" + roomInfo + content);
    MjClient.showMsg("已复制房间号，请不要返回大厅。选择社交平台后粘贴房间信息。", function(){
        MjClient.openAppToMultiPlatform();
    }, function(){});
};

/**
 *	微信邀请信息
 **/
majiang_panel.prototype.wxInviteInfo = function(){
	var tData = MjClient.data.sData.tData;
	var maxPlayer = this.getMaxPlayer();
    var roomInfo = this.getGameDesc();
    var playerCount = Object.keys(MjClient.data.sData.players).length;
    var needCount = maxPlayer - playerCount;

    var content = tData.roundNum + "局";
    if(tData.areaSelectMode.isQuan){
        content = parseInt(tData.roundNum / tData.areaSelectMode.maxPlayer) + "圈";
    }

    content = content + "," + "速度加入【" +AppCnName[MjClient.getAppType()] + "】";
    var clubInfoTable = getClubInfoInTable();
    var clubInfo = clubInfoTable ? "亲友圈" + clubInfoTable.clubId : "";

    var url = MjClient.remoteCfg.entreRoomUrl + "?vipTable=" + tData.tableid;
    if (clubInfoTable){
        url += ((clubInfoTable.isLMClub ? "&leagueId=":"&clubId=") + clubInfoTable.clubId);
    }
    if (tData.ruleId){
        url += "&ruleId=" + tData.ruleId;
    }

    var title = GameCnName[MjClient.gameType] + " " + tData.tableid + " 缺" + needCount +"人" +  " 点击加入>>>" + clubInfo;
    content = ((clubInfoTable && clubInfoTable.ruleName) ? GameCnName[MjClient.gameType] + "," : "") + roomInfo + content;

    MjClient.getInviteUrl(function (url) {
        if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb()){
            h5.weixinHelper.wxShareUrl(url, title, content);
        }else{
            MjClient.shareUrlToMultiPlatform(url, title, content);
        }
    });
};

/**
 * 判断是否为癞子牌
 * @param cd
 * @returns {boolean}
 */
majiang_panel.prototype.isHunCard = function(cd) {
    var tData = MjClient.data.sData.tData;
    if (MjClient.majiang.isHunCard) {
        return MjClient.majiang.isHunCard(cd, tData.hunCard);
    }

    if ((tData.hunCard && tData.hunCard == cd) ||
        (tData.hunCard2 && tData.hunCard2 == cd))
    {
        return true;
    }
    return false;
};

// 复制分享内容
majiang_panel.prototype.copyBntSharLogic = function(cd) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;

    var copytext = "\n";
    // 亲友圈玩法名称
    var clubInfoTable = getClubInfoInTable();
    if (clubInfoTable && clubInfoTable.ruleName) {
        var ruleName = unescape(clubInfoTable.ruleName);
        copytext += ruleName + "\n";
    }
    
    // 房间id
    var strTableid = '【' + tData.tableid + '】 ';
    // 玩法名称
    var strRoomName = GameCnName[MjClient.gameType] + ' ';
    // 局数
    var roundNumPre = tData.roundNumPre || tData.roundNum;
    var factRoundNum = tData.roundAll - roundNumPre + 1;
    factRoundNum = factRoundNum > tData.roundAll ? tData.roundAll : factRoundNum;
    var strRoundNum = tData.roundAll < 50 ? factRoundNum + "/" + tData.roundAll + "局" : "";
    copytext += strTableid + strRoomName + strRoundNum + '\n';
    // 日期
    var strDate = MjClient.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
    copytext += strDate + '\n';
    copytext += "=====  战绩  ===== \n"
    var MaxWinAll = 0;
    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            MaxWinAll = MaxWinAll > pi.winall ? MaxWinAll : pi.winall;
        }
    }

    for (var i in sData.players) {
        var pl_data = MjClient.data.sData.players[i];
        var name = getNewName(unescape(pl_data.info.nickname));
        copytext += "【" + name + "】";
        if (MaxWinAll != 0 && MaxWinAll == pl_data.winall) copytext += ' 大赢家';
        copytext += '\n';
        if (pl_data.winall > 0) {
            copytext += '战绩: +' + pl_data.winall;
        } else if (pl_data.winall < 0) {
            copytext += '战绩: ' + pl_data.winall;
        } else {
            copytext += '战绩: ' + pl_data.winall;
        }
        copytext += '\n';
    } 

    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.openBrowser", { type: 10, creator: tData.owner, roomNum: tData.tableid, time: sData.serverTime}, function (rtn) {
        MjClient.unblock();
        if (rtn.code == 0 && rtn.data)
            copytext += "\n" + rtn.data + "\n";
        MjClient.showToast('战绩已复制到粘贴板,快去分享吧');
        MjClient.native.doCopyToPasteBoard(copytext);
        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Zhanjifuzhi",  {uid:SelfUid(),gameType:MjClient.gameType});
    });
  
};