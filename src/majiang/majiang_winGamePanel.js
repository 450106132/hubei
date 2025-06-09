
var majiang_winGamePanel = cc.Layer.extend({
	_jsBind:{
		block: {
            _layout: [[1, 1], [0.5, 0.5], [0, 0], true]
        }, 
		back:{
            _layout:[[1,1],[0.5,0.5],[0,0]],
			img_titleType:{
				_run:function(){
					this.zIndex = 99;
					MjClient.endoneui.showTileType(this,getUIPlayer(0));
				}
			},
			btn_share: {
				_run: function(){
                    MjClient.endoneui.resetShareBtn(this);
                },
				_click:function(btn,eT){
					MjClient.endoneui.btnShareEevent(btn);
				},
				_visible :function(){
					var tData = MjClient.data.sData.tData;
					return (!MjClient.remoteCfg.guestLogin && !tData.matchId);
				},
				_event:{
					captureScreen_OK:function(){
						if (MjClient.endoneui.capture_screen != true)
							return;
						MjClient.endoneui.capture_screen = false;
						var writePath = jsb.fileUtils.getWritablePath();
						var textrueName = "wxcapture_screen.png";
						var savepath = writePath+textrueName;
						MjClient.shareImageToSelectedPlatform(savepath);
						this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function(){
							this.setTouchEnabled(true);
						}.bind(this))));
					}
				}
			},
			btn_ready:{
				_run:function (){
					if(MjClient.remoteCfg.guestLogin){
						setWgtLayout(this, [0.15, 0.15],[0.5, 0.085],[0, 0], false, true);
					}
				},
				_click:function(btn,eT){
					MjClient.endoneui.btnReadyEvent();
					// 重置头像所在位置
                    if(MjClient.playui) MjClient.playui.resetPlayerHeadLayout();
				},
				_visible :function(){
					var tData = MjClient.data.sData.tData;
					return !tData.matchId;
				}
			},
			text_info: {// 左上角
				_text: function () {
					var tData = MjClient.data.sData.tData;
					var content = tData.gameCnName + "  房间号:" + tData.tableid;
					return content;
				}
			},
			text_dir: {
				_text: function () {
					return  MjClient.playui.getGameDesc(); // 后期用麻将 里面写的那个configCN内容
				}
			},
			text_time:{
				_text:function(){
					return MjClient.roundEndTime + "";
				}
			}
		}
	},
	//用于子类
    jsBind : {},
    endOneJson : null,
    ctor:function (jsonSrc) {
        this._super();
        this.zIndex = MjClient.playui.getTuoGuanLayerZIndex() - 1;
        var jsonFile = jsonSrc === undefined ? "endOne_maJiang.json" : jsonSrc; 
        var endoneui = ccs.load(jsonFile);
        MjClient.endoneui=this;
        util.assign(this.jsBind, this._jsBind);
        BindUiAndLogic(endoneui.node,this.jsBind);
        this.addChild(endoneui.node);
        this.endOneJson = endoneui;
        var pl = MjClient.playui.getPlayerInfoByOff();
        if(!pl.mjhand) {
            this.visible = false;
            this.removeFromParent(true);
            return ;
        }
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var backLayer = endoneui.node.getChildByName("back");
        this.initLayoutInfo(backLayer, tData.maxPlayer);



        // 显示底牌内容
		this.showFinalCard(backLayer);

		this.showAddBird(backLayer, tData);

 		return true;
    }
});

// 分享按钮点击事件
majiang_winGamePanel.prototype.btnShareEevent = function(btn){
    var tData = MjClient.data.sData.tData;
    if (tData.roundNum >0 && this.isCanShuffleCards()){
        MjClient.gamenet.request("pkroom.handler.tableMsg", {
            cmd: "MJShuffle"
        },function(data) {
            if (data != null && data.code == -1){
                MjClient.showToast(data.message);
                return;
            }
            MjClient.endoneui.btnReadyEvent();
            // 重置头像所在位置
            if(MjClient.playui) MjClient.playui.resetPlayerHeadLayout();
        });
    }else{
        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Xiaojiesuanjiemian_Fenxiang", {uid:SelfUid()});
        MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function() {
            postEvent("capture_screen");
            MjClient.endoneui.capture_screen = true;
            btn.setTouchEnabled(false);
        });
    }
};

// 准备按钮点击事件
majiang_winGamePanel.prototype.btnReadyEvent = function(){ 
	var sData=MjClient.data.sData;
	var tData=sData.tData;
    for(var i = 0; i < tData.maxPlayer;i++){
		var pl = MjClient.playui.getPlayerWithIndex(i);
		if (!pl)
			continue;
		// 准备的时候清理花和加注
		if (pl.mjflower)
			pl.mjflower = [];
		if (pl.jiazhuNum)
			pl.jiazhuNum = 0;
    }
	postEvent("clearCardUI");
	MjClient.endoneui.removeFromParent(true);
    MjClient.endoneui = null;
    if (MjClient.rePlayVideo >= 0 && MjClient.replayui) {
    	MjClient.replayui.replayEnd();
    }
    else {
        MjClient.playui.sendPassToServer();
    }
	if (MjClient.endallui){
		MjClient.endallui.setVisible(true);
	} 

	if(MjClient.playui){
        MjClient.playui.hideEatNodeChildren();
        var playerNodeArr = MjClient.playui.playerNodeArr;
        for (var k = 0; k < playerNodeArr.length; k++) {
            MjClient.playui.removeAllCards(playerNodeArr[k]);
        }
	}
};

// 标题表述输赢
majiang_winGamePanel.prototype.showTileType = function(title,pl){
	if(pl.winone > 0){ // 胜利
		title.loadTexture("gameOver/duihuan_10.png");
	}else if(pl.winone < 0){ // 败了
		title.loadTexture("gameOver/duihuan_16.png");
	}else{
		var sData = MjClient.data.sData;
		var tData = sData.tData;
        if (MjClient.isDismiss){
        	title.loadTexture("gameOver/jiesan.png");
        } else if (tData.winner === -1) {
        	title.loadTexture("gameOver/huangzhuan_35.png");
        } else {
            title.loadTexture("gameOver/pingju_03.png");
        }
	}
};

// 显示抓鸟内容
majiang_winGamePanel.prototype.showAddBird = function(back, tData){
	//显示抓鸟的牌
    var img_bridTips = back.getChildByName("img_bridTips");
    var cards = tData.mopai || [];
    var cardNode = img_bridTips.getChildByName(MjClient.playui.CsdDefaultCardType["EatCardFront"]);
    var countNode = img_bridTips.getChildByName("text_count");
    cardNode.visible = false;
    var slotwith = cardNode.width * cardNode.scale * 0.9;//0.05;

	var zhongCount = 0;
    for(var i = 0;i < cards.length;i++){
        var cloneNode = util.clone(cardNode);
        cloneNode.setName(MjClient.playui.HandleCardType["Chi"]);
        cloneNode.setTag(cards[i]);
        cloneNode.visible = true;
        cloneNode.setPosition(cc.p(cardNode.x + slotwith*i,cardNode.y));
		img_bridTips.addChild(cloneNode);
        MjClient.playui.setCardSprite(cloneNode, cards[i], true);

        if (this.isZhongNiao(cards[i])) {
            zhongCount++;
        }else{
        	cloneNode.setColor(cc.color(170,170,170));
        }
    }

    if(zhongCount == 0){
    	countNode.setVisible(false);
    }else{
    	var pos = cc.p(cardNode.x + slotwith * cards.length  - slotwith/2, cardNode.y);
    	countNode.setPosition(pos);
    	countNode.setString("+" + zhongCount);
    }
};

// 写中鸟条件
majiang_winGamePanel.prototype.isZhongNiao = function(card){
	if(MjClient.playui.getIsZhongBird) return MjClient.playui.getIsZhongBird(card);

	return card === 71 || (card < 30 && card % 10 === 1 || card % 10 === 5 || card % 10 === 9);
};

// 初始化单个玩家数据
majiang_winGamePanel.prototype.initLayoutInfo = function(back,maxPlayer){
	var img_info = back.getChildByName("img_info");
	var infoBg = back.getChildByName("img_bg");
	var height = infoBg.height / 4;
	img_info.visible = false;
	for (var i = 0; i < maxPlayer; i++) {
		var cloneInfoImg = util.clone(img_info);
		this.setCloneImgTexture(img_info, cloneInfoImg, i);
		back.addChild(cloneInfoImg);
		var spacing = 0.95; // 上下item的间距
		var poy = infoBg.height - (height * i * spacing);
		cloneInfoImg.setPositionY(poy + (img_info.height / 2));
		this.setEndOneUserUI(cloneInfoImg, i);
	}
};

/**
 *	设置clone的图片路径
 **/
majiang_winGamePanel.prototype.setCloneImgTexture = function(infoBg, cloneInfoBg, idx){
	var infoData = infoBg.getChildByName("layout_infoData");
	var eatFrontCard = infoData.getChildByName("img_eatFrontCard");
	var eatBackCard = infoData.getChildByName("img_eatBackCard");

	var cloneInfoData = cloneInfoBg.getChildByName("layout_infoData");
	cloneInfoData.getChildByName("img_eatFrontCard").loadTexture(eatFrontCard.getRenderFile().file);
	cloneInfoData.getChildByName("img_eatBackCard").loadTexture(eatBackCard.getRenderFile().file);

	var pl = MjClient.playui.getPlayerWithIndex(idx);
	if(!pl)return;
	if (pl.winone > 0)
		cloneInfoBg.loadTexture("gameOver/di_red.png");
};

// 设置单个玩家面板数据
majiang_winGamePanel.prototype.setEndOneUserUI = function(infoImg,off){
	//积分不能低于0份  调用注意 在setEndOneUserUI函数 最前面 调用
	this.addInfoScoreNotEnough(infoImg,off);
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var pl = MjClient.playui.getPlayerWithIndex(off);
	if(!pl)return;

	infoImg.setVisible(true);
	infoImg = infoImg.getChildByName("layout_infoData");
	 
	var img_zhuang = infoImg.getChildByName("img_zhuang");
	var zhuangIndex = (typeof MjClient.preZhuang != 'undefined') ? MjClient.preZhuang : tData.zhuang;
    img_zhuang.setVisible(tData.uids[zhuangIndex] == pl.info.uid);
	img_zhuang.zIndex=10;
	var temp = this;
	var uibind= {
		layout_infoData: {
			text_name: {
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    this.setFontName("Arial");
					this.setFontSize(this.getFontSize());
					MjClient.endoneui.setUserNameAndIdColor(this, pl);
                },
				_text: function () {
				    var nameStr = unescape(pl.info.nickname ) + "";
                    return MjClient.playui.formatUserName(nameStr, 7, true);
				}
			},
			text_id: {
                _run:function(){
					this.ignoreContentAdaptWithSize(true);
					MjClient.endoneui.setUserNameAndIdColor(this, pl);
                },
				_text: function () {
					return "ID:" + pl.info.uid.toString();
				}
			},
			img_eatFrontCard: {_visible: false},
			img_eatBackCard: {_visible: false},
			img_handCard: {_visible: false},
			text_cardType: {
                _run:function(){
					this.ignoreContentAdaptWithSize(true);
					MjClient.endoneui.setUserCardTypeDescColor(this, pl);
                },
				_text: function () {
					return MjClient.endoneui.getCardTypeDesc(pl,sData);
				},
			},
			img_tingIcon:{
				_run: function(){
					this.visible = false;
					MjClient.endoneui.showTingIcon(pl,this);
				}
			},
			text_winNum: {
				_run:function(){
					this.ignoreContentAdaptWithSize(true);
				},
				_text: function () {
					var pre = "";
					if (pl.winone > 0) pre = "+";
					if(tData.areaSelectMode.scoreNeedEnough){
                        pl.winone2 = revise(pl.winone2);
                        return pre + pl.winone2;
                    }
					return pre + pl.winone;
				}
			},
			img_huType: {
				_run: function () {
					MjClient.endoneui.setGameOverPanelPlayerState(this, pl, true);
				}
			}
		}
	};
	BindUiAndLogic(infoImg.parent, uibind);
    this.addWxHeadToEndUI(infoImg.getChildByName("img_head"), off);
    this.showHandCard(pl, infoImg);
    MjClient.playui.setUserOfflineInWinGame(infoImg.getChildByName("img_head"), pl);
};
//积分不能低于0份  调用注意 在setEndOneUserUI函数 最前面 调用
majiang_winGamePanel.prototype.addInfoScoreNotEnough= function(infoImg,off){
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	// cc.log(" ==== tData.areaSelectMode.scoreNeedEnough ",tData.areaSelectMode.scoreNeedEnough)
	if(!tData.areaSelectMode.scoreNeedEnough) return;
	var pl = MjClient.playui.getPlayerWithIndex(off);
	if(!pl)return;
	infoImg = infoImg.getChildByName("layout_infoData");

	if(pl.winone == pl.winone2){
		return;
	}
	 
	var img_zhuang = infoImg.getChildByName("img_zhuang");
	// 低分不能低于0
    // cc.log(" ======lms --- UUUU ",tData.areaSelectMode.scoreNeedEnough,JSON.stringify(tData.matchScoreLimitUser) != "{}",JSON.stringify(tData.matchScoreLimitUser));
    if(tData.areaSelectMode.scoreNeedEnough && JSON.stringify(tData.matchScoreLimitUser) != "{}"){
        if ((tData.areaSelectMode.scoreNeedEnough == 1) && tData.matchScoreLimitUser[tData.uids[off]] &&
        tData.matchScoreLimitUser[tData.uids[off]].score <= 0) {
            // var textTip = new ccui.Text("积分不足","fonts/lanting.TTF",20);
			var textTip = new ccui.ImageView("gameOver/newOver/jifenbuzu.png");
            var pox1 = img_zhuang.x + img_zhuang.width + 20;
            textTip.setPosition(cc.p(pox1, img_zhuang.y));
            infoImg.addChild(textTip);
        }
		var text_winNum = infoImg.getChildByName("text_winNum");
		var textScores = new ccui.Text("", "fonts/lanting.TTF", 20);
		text_winNum.ignoreContentAdaptWithSize(true);
        var pox2 = text_winNum.x + text_winNum.width * 0.5 + 20;
        textScores.setPosition(cc.p(pox2, text_winNum.y));
        textScores.setColor(cc.color("#fff000"));
        textScores.setString("("+pl.winone+")");
        infoImg.addChild(textScores);
    }

};

majiang_winGamePanel.prototype.setGameOverPanelPlayerState = function(stateNode, pl)
{
	var sData = MjClient.data.sData;
	var tData = sData.tData;
    var fileName = "";
	var cardCount = MjClient.majiang.CardCount(pl);
	
	var isDiaoPaoHu = false;
	for(var i = 0; i < tData.uids.length; i++){
		var player = sData.players[tData.uids[i]];
		if(player.winType == 1 || player.winType == 8){//点炮胡或者杠上炮
			isDiaoPaoHu = true;
			break;
		}
	}

    if (pl.winType == 3 && cardCount == 14){ 
        fileName = "gameOver/ico_zimo.png"; 

    }else if (pl.winType > 0 && cardCount == 14){ 
        fileName = "gameOver/ico_hu-0.png"; 

    } else if (((pl.mjdesc + "").indexOf("点炮") >= 0 || (pl.mjdesc + "").indexOf("放炮") >= 0 || (pl.info.uid == tData.uids[tData.lastPutPlayer] && isDiaoPaoHu)) && cardCount == 13){
        stateNode.visible = true; 
        fileName = "gameOver/ico_dianpao.png"; 
    }

    if (fileName != ""){
        stateNode.loadTexture(fileName);
        stateNode.ignoreContentAdaptWithSize(true);
    } else {
        stateNode.visible = false;
    }
}

//获取小结算中单个玩家的牌型描述
majiang_winGamePanel.prototype.getCardTypeDesc = function(pl,sData){
	return pl.mjdesc + ""; 
};

//显示小结算中单个玩家的听牌图标
majiang_winGamePanel.prototype.showTingIcon = function(pl,node){
	if (!node || !cc.sys.isObjectValid(node)) return;
	if(!this.isTingIconNecessary()) return;
	var isShow = pl.isTing && (pl.mjdesc + "").indexOf("未听牌") < 0;
	node.setVisible(isShow);
};

//是否需要显示听牌标记
majiang_winGamePanel.prototype.isTingIconNecessary = function(){
	return false;
}

// 显示手牌内容
majiang_winGamePanel.prototype.showHandCard = function(pl, infoImg){
	var arry = this.createEndSortCardArr(pl, infoImg);
	var posx = 0;
	var gangNum = 0; // 杠要叠牌
	for (var i = 0; i < arry.length; i++) {
		if(arry[i] === 1){
			posx += 8;
			continue;
		}

		if(!arry[i]){
            MjClient.showToast("报错了！！！");
            continue;
        }

		arry[i].visible = true;
		arry[i].enabled = false;
        arry[i].setScale(arry[i].getScale());
        if(arry[i].name == "anGang" || arry[i].name == "mingGang"){
        	gangNum++;
        	if(gangNum % 3 == 0 && gangNum != 0){
        		posx -= arry[i].width * arry[i].getScale();
        		arry[i].y += 8; 
        	}else if(gangNum == 4){
        		gangNum = 0;
        	} 
        }else{
        	gangNum = 0;
        }
        arry[i].x += posx;
        posx += arry[i].width * arry[i].getScale() * 0.97; 
	}
};

// 获取小结算手牌排序过的数组 【明杠,1，暗杠，1，碰，吃，赖子，手牌】 数组内容带1 增加间隔
majiang_winGamePanel.prototype.createEndSortCardArr = function(pl, infoImg){
	//明杠
	var i, j, cardNode, arry = [];
	for (i = 0; i < pl.mjgang0.length; i++) {
		for (j = 0; j < 4; j++) {
			cardNode = MjClient.playui.createCard(infoImg, MjClient.playui.CsdDefaultCardType.EatCardFront, 
				MjClient.playui.HandleCardType.MingGang, pl.mjgang0[i], true);
			arry.push(cardNode);
		}
		arry.push(1); // 标志多移动一点
	}
	//添加暗杠
	for (i = 0; i < pl.mjgang1.length; i++) {
		for (j = 0; j < 4; j++) { 
			// 给牌背
			var handleCardType = j == 2 ? MjClient.playui.CsdDefaultCardType.EatCardBack : MjClient.playui.CsdDefaultCardType.EatCardFront;
			var cardTag = j == 2 ? null : pl.mjgang1[i];
            cardNode = MjClient.playui.createCard(infoImg, handleCardType, MjClient.playui.HandleCardType.AnGang, cardTag, true);
			arry.push(cardNode);
		}
		arry.push(1); // 标志多移动一点
	}
	//添加碰
	for (i = 0; i < pl.mjpeng.length; i++) {
		for (j = 0; j < 3; j++) {
			cardNode= MjClient.playui.createCard(infoImg, MjClient.playui.CsdDefaultCardType.EatCardFront, 
				MjClient.playui.HandleCardType.Peng, pl.mjpeng[i], true);
			arry.push(cardNode);
		}
		arry.push(1); // 标志多移动一点
	}
	//添加吃
	for (i = 0; i < pl.mjchi.length; i++) {
		cardNode = MjClient.playui.createCard(infoImg, MjClient.playui.CsdDefaultCardType.EatCardFront, 
			MjClient.playui.HandleCardType.Chi, pl.mjchi[i], true);
		arry.push(cardNode);
		if(i != 0 && (i + 1) % 3 == 0) arry.push(1); // 标志多移动一点
	} 
	arry.push(1); // 标志多移动一点 ;

	 
	var isSeparate = false; // 是否需要隔开最后一张-
    if (pl.mjhand && pl.mjhand.length > 0){
        var count = MjClient.majiang.CardCount(pl);
        isSeparate = (count == 14); 
    }  
    var sortHandCard = this.getHandSort(pl.mjhand, isSeparate);
    if(!sortHandCard) return MjClient.endoneui.removeFromParent(true);
	//添加手牌
	for (i = 0; i < sortHandCard.length; i++) {
		if( isSeparate && i == (sortHandCard.length - 1)){
			arry.push(1); // 标志多移动一点
		}
		cardNode = MjClient.playui.createCard(infoImg, MjClient.playui.CsdDefaultCardType.HandCard, 
			MjClient.playui.HandleCardType.Hand, sortHandCard[i], true);
		arry.push(cardNode);

	} 
	return arry;
};

// 返回手牌排序结果 【赖子，手牌，胡的牌】 pl.winType > 0
majiang_winGamePanel.prototype.getHandSort = function(handCards, isHu){
    if(!handCards) return MjClient.endoneui.removeFromParent(true);
	var cardsArr = handCards.slice();
	var hunCard = MjClient.data.sData.tData.hunCard;
	var handArr = [], laiZiArr = [];
	var huCard = isHu ? cardsArr.pop() : 0;
	for(var i = 0;i < cardsArr.length;i++){
		var card = cardsArr[i];
		if(card && MjClient.majiang.isHunCard(card, hunCard)){
			laiZiArr.push(card);
			continue;
		}
		handArr.push(card);
	}
	handArr.sort(function(a, b){
		return a - b;
	});
	var sortArr = [].concat(laiZiArr, handArr);
	if(huCard){
		sortArr.push(huCard);
	}
	return sortArr;
};

// 显示麻将小结算底牌
majiang_winGamePanel.prototype.showFinalCard = function (_back) {
    var finalView = _back.getChildByName("listiew_finalView");   
    var cardItem = _back.getChildByName("img_eatFrontCard");
    cardItem.setVisible(false);

    var dipaiCard = MjClient.data.sData.cards; 
    if (dipaiCard) {

    	var cardSize = cc.size(cardItem.width * cardItem.scale, cardItem.height * cardItem.scale );
    	var backLayout = new ccui.Layout();
        backLayout.setContentSize(cc.size(cardSize.width * dipaiCard.length,cardSize.height));  
        finalView.pushBackCustomItem(backLayout);

        for (var i = 0; i < dipaiCard.length; i ++) {
            var cardNode = MjClient.playui.createCard(_back, MjClient.playui.CsdDefaultCardType.EatCardFront,
            				MjClient.playui.HandleCardType.Chi, dipaiCard[i], true);
            cardNode.removeFromParent();
            cardNode.visible = true; 
            cardNode.x = (cardSize.width /2) + i * cardSize.width;
            cardNode.y = backLayout.height / 2;
            backLayout.addChild(cardNode);
        }
        finalView.forceDoLayout();
    }
};

//是否可以码牌(默认为false)
majiang_winGamePanel.prototype.isCanShuffleCards = function(){
	return false;
};

//重置分享按钮
majiang_winGamePanel.prototype.resetShareBtn = function(btn){
	if(!this.isCanShuffleCards()){
		return;
	}
    var tData = MjClient.data.sData.tData;
    if (tData.roundNum >0 && MjClient.rePlayVideo == -1){
        btn.loadTextureNormal("gameOver/newOver/btn_mapai_n.png");
        btn.loadTexturePressed("gameOver/newOver/btn_mapai_s.png");
       
        var texturePath = "gameOver/newOver/ico_yuanbao.png";
        var propNum = 2;
        if(MjClient.data.sData.tData.areaSelectMode.fangkaCount != undefined) {	//钻石场
            texturePath = "gameOver/newOver/ico_zuanshi.png";
            propNum = 1
        }

        var text = ccui.Text.create("x"+propNum, "res/fonts/lanting.TTF", 32);
        text.setAnchorPoint(cc.p(0,0.5));
        text.setPosition(cc.p(btn.width/2 * btn.scaleX + 20, btn.height/2));
        text.setColor(cc.color("#ff0000"));
        btn.addChild(text);

        var img = ccui.ImageView.create(texturePath);
        img.setPosition(cc.p(text.x + text.width + img.width/2 + 3, btn.height/2));
        img.setScale(0.9);
        btn.addChild(img);
    }else{
        btn.removeAllChildren();
        btn.loadTextureNormal("gameOver/duihuan_37.png");
        btn.loadTexturePressed("gameOver/duihuan_37_s.png");
    }
};

// 加载微信头像
majiang_winGamePanel.prototype.addWxHeadToEndUI = function(node, off){

	var pl = MjClient.playui.getPlayerWithIndex(off);
    var img = "png/default_headpic.png";
    if (pl && pl.wxHeadImg) {
        img = pl.wxHeadImg;
        loadWxHead();
    } else { // 回放直接弹总结算 没有缓存头像
        MjClient.loadImgQX(pl.info.headimgurl, {isCrossOrigin: true}, function(err, texture) {
            if (!err && texture) {
                img = texture;
                loadWxHead();
            }
        });
    }

    function loadWxHead() { 
        var sp = new cc.Sprite(img);
        var frame = node;
        if (!cc.sys.isObjectValid(frame)) {
        	return;
        }

        var clippingNode = new cc.ClippingNode();
        var mask = new cc.Sprite("gameOver/gameOver_headBg2.png");
        clippingNode.setAlphaThreshold(0);
        clippingNode.setStencil(mask);

        sp.setScale(mask.getContentSize().width / sp.getContentSize().width);
        clippingNode.addChild(sp);
        clippingNode.setPosition(frame.getContentSize().width / 2, frame.getContentSize().height / 2);
        //遮罩框
        var hideblock = new cc.Sprite("gameOver/gameOver_headBg3.png");
        hideblock.setPosition(frame.getContentSize().width / 2, frame.getContentSize().height / 2);
        frame.addChild(clippingNode);
        frame.addChild(hideblock);
    }
};

//设置玩家名字和昵称的颜色
majiang_winGamePanel.prototype.setUserNameAndIdColor = function(node, pl){
	if(!node || !pl) return;
};

//设置牌型描述颜色
majiang_winGamePanel.prototype.setUserCardTypeDescColor = function(node, pl){
	if(!node || !pl) return;
}
