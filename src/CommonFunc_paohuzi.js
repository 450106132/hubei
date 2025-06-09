
/* ======================================
 *  放一些共用的方法
 *  ====================================== */


// 永州字牌全局方法
MjClient.MaxPlayerNum_paohuzi = 3;
MjClient.cardPath_paohuzi = "playing/paohuzi/";
var ActionType_paohuzi =  //图片提示
{
	CHI:1,
	PENG:2,
	WEI:3,
	PAO:4,
	TI:5,
	HU:6,
	WANGDIAO:7,
	WANGCHUANG:8,
	WANGZHA:9,
	XIAHUO:10,
	FANXING:11,
	GENXING:12,
};

//初始化玩家金币、名字、胡息
function InitUserCoinAndName_paohuzi(node, off){
	var pl = getUIPlayer_paohuzi(off);
	if(!pl){
		return;
	}

	var tData = MjClient.data.sData.tData;
	var bind ={
		head:{
			name:{
				_run: function() {
					this.setFontName("Arial");
					this.setFontSize(this.getFontSize());
				},
				_text: function()
				{
				    var _nameStr = unescape(pl.info.nickname);
					return getNewName(_nameStr);
				}
			},
			coin:{
				_visible: true,
				_run: function(){
					//sk,todo,这里有问题，服务器的pl.winall没有赋值，这里加了有个毛用？
					var coin = tData.initCoin;
					//this.setString("" + coin);
					changeAtalsForLabel(this, coin + pl.winall);
				}
			},
		}
	};
    //add by sking
    var name = node.getChildByName("head").getChildByName("name");
    name.ignoreContentAdaptWithSize(true);

	BindUiAndLogic(node, bind);
}

//向服务器发送王闯王钓操作
function HZWangChuangToServer_paohuzi(type){
	var tData = MjClient.data.sData.tData;
	cc.log("====================HZWangChuangToServer_paohuzi=================");
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
		cmd: "HZWangChuang",
		type: type,
		cardNext:tData.cardNext,
		card:tData.lastPutCard
	});	
}

//向服务器发送打牌操作
function HZPutCardToServer_paohuzi(card){
	cc.log("====================HZPutCardToServer_paohuzi=================");
    MjClient.gamenet.request("pkroom.handler.tableMsg", {
		cmd: "MJPut",
		card: card
	});	
}

// 向服务器发送吃牌
function HZChiToServer_paohuzi(eatCards,biCards){
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
	cc.log("====================HZChiToServer_paohuzi=================");
	if(biCards){
		MjClient.gamenet.request("pkroom.handler.tableMsg", {
			cmd: "MJChi",
			eatCards: eatCards,
			biCards: biCards
		});
	}else{
		MjClient.gamenet.request("pkroom.handler.tableMsg", {
			cmd: "MJChi",
			eatCards: eatCards
		});
	}

}

//像服务器发送碰牌
function HZPengToServer_paohuzi()
{
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
	cc.log("====================HZPengToServer_paohuzi=================");
	MjClient.gamenet.request("pkroom.handler.tableMsg", {
		cmd: "MJPeng"
	});
}

// 向服务器发送过牌
function HZPassConfirmToServer_paohuzi(){

    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
    var tData = MjClient.data.sData.tData;
	cc.log("====================HZPassConfirmToServer_paohuzi=================");
	MjClient.gamenet.request("pkroom.handler.tableMsg", {
		cmd: "MJPass",
		eatFlag: EatFlag_paohuzi(),
		cardNext: tData.cardNext,
		card:tData.lastPutCard
	});
}

//发送跑牌命令
function HZGangToServer_paohuzi(type){
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
	cc.log("====================HZGangToServer_paohuzi=================");
	MjClient.gamenet.request("pkroom.handler.tableMsg", {
		cmd: "MJGang",
		type: type,
		eatFlag: EatFlag_paohuzi()
	});	
}

//发送偎牌命令
function HZWeiToServer_paohuzi(type){
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
	cc.log("====================HZWeiToServer_paohuzi=================");
	MjClient.gamenet.request("pkroom.handler.tableMsg", {
		cmd: "HZWeiCard"
	});	
}

//向服务器发送发牌命令
function HZNewCardToServer_paohuzi(){
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
	cc.log("====================HZNewCardToServer_paohuzi=================");
	MjClient.gamenet.request("pkroom.handler.tableMsg", {
		cmd: "HZNewCard"
	});
}

//向服务器发送胡牌命令
function MJHuToServer_paohuzi(){
    if (MjClient.rePlayVideo != -1) return; // 回放时候不能请求
	cc.log("====================MJHuToServer=================");
	MjClient.gamenet.request("pkroom.handler.tableMsg", {
		cmd: "MJHu",
		eatFlag: EatFlag_paohuzi()
	});
}

//添加吃的牌
function addEatCard_paohuzi(node,name,mjNum,off){
	//根据牌的类型获得需要添加的节点
	var eatNode = node.getChildByName("eatNode");
	if(!eatNode){
		return;
	}
	var type = 2;
	//设置牌
	var newCard = getNewCard_paohuzi(mjNum,type,off);
	var parentCount = eatNode.childrenCount;
	//首先根据name判断cpNode中是否已经添加
	var cardParent = eatNode.getChildByName(name);
	if(!cardParent){
		cardParent = new cc.Node();
		cardParent.setName(name);
		if(node.getName() == "down"){
			cardParent.x = parentCount * newCard.width;
			cardParent.y = 0;
		}else if (node.getName() == "right"){
			cardParent.x = eatNode.width - parentCount * newCard.width;
			cardParent.y = eatNode.height;
		}else if (node.getName() == "left"){
			cardParent.x = parentCount * newCard.width;
			cardParent.y = eatNode.height;
		}else if (node.getName() == "xing"){
            cardParent.x = eatNode.width - parentCount * newCard.width;
            cardParent.y = 0;
		}
		eatNode.addChild(cardParent);
	}
	var off_y = 0;
	if(node.getName() == "down"){
		off_y = newCard.height;
		newCard.anchorX = 0;
		newCard.anchorY = 0;
	}else if(node.getName() == "right"){
		off_y = -newCard.height;
		newCard.anchorX = 1;
		newCard.anchorY = 1;
	}else if(node.getName() == "left"){
		off_y = -newCard.height;
		newCard.anchorX = 0;
		newCard.anchorY = 1;
	}else if (node.getName() == "xing"){
        off_y = newCard.height;
        newCard.anchorX = 1;
        newCard.anchorY = 0;
	}
	var cardCount = cardParent.childrenCount;
	newCard.zIndex = 4 - cardCount;
	newCard.x = 0;

	newCard.y = cardCount * off_y;
	cardParent.addChild(newCard);
}

/**
添加手牌(回放)
*/
function addHandCardReplay_paohuzi(tagName,index,mjNum,off){
	var _node = getNode_paohuzi(off);
	//根据牌的类型获得需要添加的节点
	var addNode = _node.getChildByName("replayNode");
	if(!addNode){
		return;
	}
	//设置牌
	var type = 2;
	var newCard = getNewCard_paohuzi(mjNum,type,off);
	var scale_y = newCard.scaleY;
	var parentCount = addNode.childrenCount;
	//首先根据name判断cpNode中是否已经添加
	var cardParent = addNode.getChildByTag(tagName);
	if(!cardParent){
		cardParent = new cc.Node();
		cardParent.tag = tagName;
		if(_node.getName() == "down"){
			cardParent.x = parentCount * newCard.width;
			cardParent.y = 0;
		}else if (_node.getName() == "right"){
			cardParent.x = addNode.width - parentCount * newCard.width;
			cardParent.y = 0;
		}else if (_node.getName() == "left"){
			cardParent.x = parentCount * newCard.width;
			cardParent.y = 0;
		}else if (_node.getName() == "xing"){
            cardParent.x = addNode.width - parentCount * newCard.width;
            cardParent.y = 0;
		}
		addNode.addChild(cardParent);
	}
	var off_y = 0;
	if(_node.getName() == "down" || _node.getName() == "left"){
		off_y = newCard.height;
		newCard.anchorX = 0;
		newCard.anchorY = 0;
	}else if(_node.getName() == "right" || _node.getName() == "xing"){
		off_y = newCard.height;
		newCard.anchorX = 1;
		newCard.anchorY = 0;
	}
	var cardCount = cardParent.childrenCount;
	newCard.zIndex = 4 - cardCount;
	newCard.x = 0;
	newCard.y = cardCount * off_y;
	cardParent.addChild(newCard);
}

function checkCard_paohuzi(node, off){
    if(off != 0 || MjClient.rePlayVideo != -1){
        return;
    }
    if(off == 0 && node.getName() != "down"){
        return;//2人玩法right节点同为玩家节点
    }
    var sData = MjClient.data.sData;
    var tData = sData.tData; 

    // 在小结算数据的时候，不需要在去检测手牌内容了
    if(tData.tState == TableState.roundFinish ){
        return;
    }
    var pl = getUIPlayer_paohuzi(off);
    if(!pl){
        return;
    }
    var cardHandArr = [];
    if (MjClient.HandCardArr) {
        for(var i = 0; i < MjClient.HandCardArr.length; i++){
            for(var j = 0; j < MjClient.HandCardArr[i].length; j++){
                cardHandArr.push(MjClient.HandCardArr[i][j]);
            }
        }
    }
    var cardHand = [];
    if(pl.mjhand){
        cardHand = pl.mjhand.slice();
    }
    if(cardHandArr.length > cardHand.length){
        cardHandArr.sort(function (a, b) {
            return a - b;
        });
        cardHand.sort(function (a, b) {
            return a - b;
        });
        for(var i = 0;i < cardHandArr.length; i++){
            if(cardHandArr[i] != cardHand[i]){
                RemoveHandCard_paohuzi(node, cardHandArr[i], off);
                cardHandArr.splice(i, 1);
                i--;
            }
        }
    }
}

/*
添加手牌(正常打牌)
每一组添加到一个节点,比如4个同样的为一个节点，单牌也为一个节点
*/
function addHandCard_paohuzi(tagName,index,mjNum,off){
	if(off != 0){
		return;
	}
	var _node = getNode_paohuzi(off);
	//根据牌的类型获得需要添加的节点
	var addNode = _node.getChildByName("handNode");
	if(!addNode){
		return;
	}
	//设置牌
	var newCard = getNewCard_paohuzi(mjNum,1,off);
	var scale_y = newCard.scaleY;
	//var parentCount = addNode.childrenCount;
	//首先根据name判断cpNode中是否已经添加
	var cardParent = addNode.getChildByTag(tagName);
	if(!cardParent){
		cardParent = new cc.Node();
		cardParent.tag = tagName;
		// cardParent.setName(0);			//用于标记子节点的name,用于排序
		cardParent.width = newCard.width;
		addNode.addChild(cardParent);
		// SetTouchCardHandler_paohuzi(cardParent);
	}

	var beginPoint = cc.p(0,0);
	var off_y = newCard.height * scale_y - newCard.height/4 * scale_y;

	var cardCount = cardParent.childrenCount;
	newCard.setName(index);
	newCard.zIndex = 4 - index;
	newCard.anchorX = 0;
	newCard.anchorY = 0;
	newCard.x = beginPoint.x;
	newCard.y = beginPoint.y + cardCount * off_y;
	cardParent.addChild(newCard);
}

function refreshHandCard_paohuzi(tagName,index,mjNum,off){
	if(off != 0){
		return;
	}
	var _node = getNode_paohuzi(off);
	//根据牌的类型获得需要添加的节点
	var addNode = _node.getChildByName("handNode");
	if(!addNode){
		return;
	}
	
	//var parentCount = addNode.childrenCount;
	//首先根据name判断cpNode中是否已经添加
	var cardParent = addNode.getChildByTag(tagName);
	if(!cardParent){
		cardParent = new cc.Node();
		cardParent.tag = tagName;
		// cardParent.setName(0);			//用于标记子节点的name,用于排序
		addNode.addChild(cardParent);
		// SetTouchCardHandler_paohuzi(cardParent);
	}

	var newCard = findChildByNameAndIndex_paohuzi(cardParent, mjNum, index);

	if(newCard){
		// cardParent.width = newCard.width;
		// cc.log( "===========hehe ============");
		// var tempT = newCard.tag;
		// cc.log( "===========hehe ============" + tempT);
		// cc.log( "===========hehe ============" + (tempT != mjNum));
		// if(tempT != mjNum){
		// 	newCard.removeFromParent();
		// 	newCard = null;
		// 	newCard = getNewCard_paohuzi(mjNum,1,off);
		// 	cardParent.addChild(newCard);
		// }else{
		// 	// return;
		// }
	}else{
		if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
			newCard = getNewCard_paohuzi(mjNum,1,off);
		}else if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
			newCard = getNewCard_hengYang(mjNum,1,off);

			// 永州移植到邵阳的玩法
			if(MjClient.gameType === MjClient.GAME_TYPE.PAO_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_ER ||
				MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_King || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King ||
				MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_LR_King ||MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO 
				|| MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR || MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z){
				newCard = getNewCard_paohuzi(mjNum,1,off);
			}

		}
		else{
			newCard = getNewCard_leiyang(mjNum,1,off);
		}
		

		var scale_y = newCard.scaleY;
		var beginPoint = cc.p(0,0);
		var off_y = newCard.height * scale_y - newCard.height/4 * scale_y;

		newCard.x = beginPoint.x;
		newCard.y = beginPoint.y + index * off_y;
		cardParent.addChild(newCard);
		if(cardParent.width == 0){
			cardParent.width = newCard.width;
		}
		
	}
	
	var scale_y = newCard.scaleY;

	var beginPoint = cc.p(0,0);
	var off_y = newCard.height * scale_y - newCard.height/4 * scale_y;

	var cardCount = cardParent.childrenCount;
	newCard.setName(index);
	newCard.zIndex = 4 - index;
	newCard.anchorX = 0;
	newCard.anchorY = 0;
	// newCard.x = beginPoint.x;
	// newCard.y = beginPoint.y + cardCount * off_y;

	
	doMovetoAction(newCard, cc.p(beginPoint.x, beginPoint.y + index * off_y));
	
}

//通过名字和tag 查找节点
function findChildByNameAndIndex_paohuzi(cardParent, mjNum, index){
	var child = cardParent.getChildByName(index);
	if(!child){
		var count = cardParent.childrenCount;
		for(var i = index+1; i < 4; i++){
			child = cardParent.getChildByName(i);
			if(child && child.tag == mjNum){
				return child;
			}
		}
	}

	return child;
}

//一列中是否是相同的牌
function hasSameChild_paohuzi(cardParent){
	var count = cardParent.childrenCount;
	var mjNum = -1;
	var sameNum = 0;
	for(var i = 0; i < count; i++){
		var child = cardParent.getChildByName(i);
		if(child){
			if(mjNum == -1){
				mjNum = child.tag;
				sameNum = 1;
			}else{
				if(mjNum == child.tag){
					sameNum += 1;
				}
			}
		}
	}

	if(count > 0 && sameNum == count){
		return true;
	}
	return false;
}

/**
mjNum:牌的数字
type:类型，1:手牌 2：吃牌 3：打的牌
**/
function getNewCard_paohuzi(mjNum, type, off, isTurn){
	var _node = getNode_paohuzi(off);
	var copyNode = null;
	if(type == 1){
		//手牌
		copyNode = _node.getChildByName("handCard");
	}else if(type == 2){
		//吃的牌
		copyNode = _node.getChildByName("out0");
	}else if(type == 4){
        //醒牌
        copyNode = _node.getChildByName("xingPai");
    }else{
		//打出的牌
		copyNode = _node.getChildByName("put");
	}
	var mjNode = copyNode.clone(); //克隆一个白板，上面没有任何条纹的麻将 ，by sking

    mjNode.visible = true;

    //cc.log("getNewCard_paohuzi:"+mjNum+","+type+","+off+","+isTurn);
	if(mjNum > 0){
	    //创建一个带有麻将信息的麻将 cp为创建后的麻将
		setCardSprite_paohuzi(mjNode, mjNum, type, isTurn);
		if(type == 1){
			//只有手牌才会有点击事件
			SetTouchCardHandler_paohuzi(mjNode,off);
		}
	}

	return mjNode;
}

/**
设置牌的渲染
mjNode:麻将node
mjNum:麻将tag
type:类型，1:手牌 2：吃牌 3：打的牌
*/
function setCardSprite_paohuzi(mjNode, mjNum, type, isTurn){
 //    if(getCurrentMJBgType() == 0){
 //        MjClient.cardPath_paohuzi = "playing/paohuzi/";
	// }else if(getCurrentMJBgType() == 1 && MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP){
 //        MjClient.cardPath_paohuzi = "playing/paohuzi/MJBg1/";
	// }else {
 //        MjClient.cardPath_paohuzi = "playing/paohuzi/";
	// }

	if(MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
		setCardSprite_hengYang(mjNode, mjNum, type, isTurn);
		return;
	}

	MjClient.cardPath_paohuzi = "playing/paohuzi/";
	if(type == 1){
		mjNode.loadTexture(MjClient.cardPath_paohuzi+"hand" + mjNum + ".png");
	}
	if(type == 2){
		mjNode.loadTexture(MjClient.cardPath_paohuzi+"out" + mjNum + ".png");
		if(isTurn){
			mjNode.loadTexture(MjClient.cardPath_paohuzi+"huxiBG.png");
		}
	}
	if(type == 3 || type == 4){
		mjNode.loadTexture(MjClient.cardPath_paohuzi+"put" + mjNum + ".png");
		if(isTurn){
			mjNode.loadTexture(MjClient.cardPath_paohuzi+"normalBG.png");
		}
	}
	mjNode.tag = mjNum;
}

//刷新手牌移动时的坐标
var btn_oPos = null;
function updateBtnMovedPosition_paohuzi(btn, eventType){
    if (eventType == ccui.Widget.TOUCH_BEGAN) {
        if(!btn_oPos){
            btn_oPos = btn.getTouchBeganPosition();
        }
    }else if(eventType == ccui.Widget.TOUCH_MOVED){
        if(!btn_oPos){
            //在移动牌的过程中，有吃碰偎跑操作导致btn_oPos=null
            btn.setPosition(cc.pSub(btn.getTouchMovePosition(), btn.parent.getPosition()));
            btn_oPos = btn.getPosition();
        }else{
            var touchPos = btn.getTouchMovePosition();
            var deltePos = cc.pSub(touchPos, btn_oPos);
            var factPos = cc.pAdd(btn.getPosition(), deltePos);
            btn.setPosition(factPos);
            btn_oPos = touchPos;
        }
    }else if(eventType == ccui.Widget.TOUCH_ENDED || eventType == ccui.Widget.TOUCH_CANCELED){
        btn_oPos = null;
    }
}

MjClient.movingCard_paohuzi = null;
//MjClient.cloneCard = null;
//MjClient.putCard = null;
MjClient.hasPut = false;
MjClient.touchCell = null;
MjClient.copyCell = null;
function SetTouchCardHandler_paohuzi(card,off){
	var cardTag = card.tag;
	var pl = getUIPlayer_paohuzi(off);
	var mjhand = pl.mjhand;
	var cardArr = {};
	for(var i = 0;i< mjhand.length;i++){
		if(!cardArr[mjhand[i]]){
			cardArr[mjhand[i]] = 1;
		}else{
			cardArr[mjhand[i]] ++;
		}
	}
	if(cardArr[cardTag + ""] >= 3 && !MjClient.majiang.isEqualHunCard(cardTag)){
		return;
	}
	var _node = getNode_paohuzi(off);
	var moveSP = null;
	var moveT = null;
	var cloneCard = null;
	var touchTime = 0;
    // var movingCard_paohuzi = null;
	card.addTouchEventListener(function(btn,eventType){

		//禁止同时移动多个牌
		if(MjClient.movingCard_paohuzi !== null && cc.sys.isObjectValid(MjClient.movingCard_paohuzi) && MjClient.movingCard_paohuzi !== btn){
			return;
		}

		if(MjClient.isRefreshNodeing){
			return;
		}

		if(eventType == ccui.Widget.TOUCH_BEGAN){
			touchTime = new Date().getTime();
			MjClient.movingCard_paohuzi = btn;

			var beginPos = btn.getPosition();
			var touchPos = beginPos;//btn.parent.convertToWorldSpace(beginPos);
			touchPos = cc.p(touchPos.x + (0.5 - btn.anchorX) * btn.width * btn.scaleX,
				touchPos.y + (0.5 - btn.anchorY) * btn.height * btn.scaleY);
			cloneCard = btn.clone();
			setCardSprite_paohuzi(cloneCard, cardTag, 1, false);
			cloneCard.opacity = 100;
			if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ && MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z){
				cloneCard.opacity = 0;
			}
			// cloneCard.setTouchEnabled(false);
			btn.parent.addChild(cloneCard);


			MjClient.touchCell = btn;
			MjClient.copyCell = cloneCard;

            btn.anchorX = 0.5;
            btn.anchorY = 0.5;
			var maxZOrder = -1;
			if (btn.parent && btn.parent.parent)
			{
				var handNode = btn.parent.parent;
				for (var i=0; i<handNode.getChildrenCount(); i++)
				{
					var zorder = handNode.getChildren()[i].getLocalZOrder();
					if (maxZOrder < zorder) maxZOrder = zorder;
				}
			}
			else
			{
				maxZOrder = 2000;
			}
			btn.parent.zIndex = maxZOrder+1;
			btn.zIndex = 5;
			btn.x = touchPos.x;
			btn.y = touchPos.y;
			updateBtnMovedPosition_paohuzi(btn, eventType);
			ShowPutCardIcon();
		}
		if(eventType == ccui.Widget.TOUCH_MOVED){
			if (MjClient.movingCard_paohuzi==null) return;
			updateBtnMovedPosition_paohuzi(btn, eventType);
			// var movePos = btn.getTouchMovePosition();
   //          movePos = cc.pSub(movePos, btn.parent.getPosition());
			// btn.x = movePos.x;
			// btn.y = movePos.y;
		}
		if(eventType == ccui.Widget.TOUCH_CANCELED || eventType == ccui.Widget.TOUCH_ENDED){
            if (MjClient.movingCard_paohuzi==null) {
            	return;
            }
            updateBtnMovedPosition_paohuzi(btn, eventType);
            if(eventType == ccui.Widget.TOUCH_CANCELED){
            	touchTime = 0;
            }
            MjClient.movingCard_paohuzi = null;
            var btnParent = btn.parent;
            var btnTag = btn.tag;
            var btnName = btn.name;
            var scale_x = btn.scaleX;
            var endPos = btn.getTouchEndPosition();
            var pl = getUIPlayer_paohuzi(0);
            var tData = MjClient.data.sData.tData;
            var isPut = false;
            var cutLine = MjClient.playui.jsBind.cutLine._node;

            if(MjClient.HandCardArr[btnParent.tag].indexOf(btnTag) < 0){
                MjClient.touchCell = null;
                MjClient.copyCell = null;

                MjClient.playui.ResetHandCard(MjClient.playui._downNode,off);
                ShowPutCardIcon();

                MjClient.addGroupIndex = -1;    //新增列标志
                return;
            }

			var isWangBa = MjClient.majiang.isEqualHunCard(btnTag);

			btn.removeFromParent(true);
			if(cloneCard && cc.sys.isObjectValid(cloneCard)){
				cloneCard.opacity = 255;
			}
			cloneCard = null;


			if(!isWangBa && IsTurnToMe() && tData.tState == TableState.waitPut && pl.mjState == TableState.waitPut)
			{

				// var moveEndT = new Date().getTime();
				// var gapT = moveEndT - moveT;
				// var isCanChu = false;
				// if(gapT < 500 && (endPos.y + btn.height * btn.scaleY * 0.5) >= cutLine.y && !MjClient.hasPut && !MjClient.isCommon){
				// 	isCanChu = true;
				// }

				if(!MjClient.isCommon && endPos.y >= cutLine.y && !MjClient.hasPut)
				{

					if(MjClient.playui.isFangWei &&  MjClient.playui.isFangWei(btnTag)){
						MjClient.showMsg("掀明招后将不能吃碰，是否确定？",
                        function(){

                        	var uid = MjClient.data.pinfo.uid;
							var player = MjClient.data.sData.players[uid];
							if(player && _hasValueInArr_paohuzi(player.mjhand, btnTag)){
								isPut = true;
								MjClient.hasPut = true;
								MjClient.isCommon = false;
								MjClient.HandCardArr[btnParent.tag].splice(parseInt(btnName),1);
								HZPutCardToServer_paohuzi(btnTag);


								//出牌后直接落牌，add by maoyu
								var putNode = MjClient.playui._downNode.getChildByName("put");
								putNode.removeAllChildren();
								var putCard = getNewCard_paohuzi(btnTag, 3 ,off);
								putCard.scaleX = putCard.width/putNode.width - 0.16;
								putCard.scaleY = putCard.width/putNode.width - 0.06;
								putCard.x = putCard.width/2;
								putCard.y = putCard.height/2;
								putNode.addChild(putCard);
								putNode.visible = true;
								var pos = putNode.getUserData().pos;
								putNode.setScale(0);
								putNode.setPosition(cc.p(pos.x ,pos.y - 100));
								var action1 = cc.scaleTo(0.2,putNode.getUserData().scale);
								var action2 = cc.moveTo(0.2,pos.x,pos.y);
								putNode.runAction(cc.spawn(action1,action2));
							}

                            
                            MjClient.touchCell = null;
							MjClient.copyCell = null;

							MjClient.playui.ResetHandCard(MjClient.playui._downNode,off);
							ShowPutCardIcon();
							MjClient.addGroupIndex = -1;	//新增列标志
                        },
                        function(){
                            MjClient.touchCell = null;
							MjClient.copyCell = null;

							MjClient.playui.ResetHandCard(MjClient.playui._downNode,off);
							ShowPutCardIcon();
							MjClient.addGroupIndex = -1;	//新增列标志
                        }, "1");
                        return;
					}else{
						//fix by 千千
						var uid = MjClient.data.pinfo.uid;
						var player = MjClient.data.sData.players[uid];
						if(player && _hasValueInArr_paohuzi(player.mjhand, btnTag)){
							isPut = true;
							MjClient.hasPut = true;
							MjClient.isCommon = false;
							MjClient.HandCardArr[btnParent.tag].splice(parseInt(btnName),1);
							HZPutCardToServer_paohuzi(btnTag);

							//出牌后直接落牌，add by maoyu
							var putNode = MjClient.playui._downNode.getChildByName("put");
							putNode.removeAllChildren();
							var putCard = getNewCard_paohuzi(btnTag, 3 ,off);
							putCard.scaleX = putCard.width/putNode.width - 0.16;
							putCard.scaleY = putCard.width/putNode.width - 0.06;
							putCard.x = putCard.width/2;
							putCard.y = putCard.height/2;
							putNode.addChild(putCard);
							putNode.visible = true;
							var pos = putNode.getUserData().pos;
							putNode.setScale(0);
							putNode.setPosition(cc.p(pos.x ,pos.y - 100));
							var action1 = cc.scaleTo(0.2,putNode.getUserData().scale);
							var action2 = cc.moveTo(0.2,pos.x,pos.y);
							putNode.runAction(cc.spawn(action1,action2));
						}else{

						}
					}
				}
			}
			if(!isPut || isWangBa)
			{
				var count = btnParent.parent.childrenCount;
				var totalWidth = btnParent.width * scale_x * count;
				var min_x = (MjClient.size.width - totalWidth)/2;
				var selectIndex = Math.ceil((endPos.x - min_x)/(btnParent.width * scale_x));
				var selectParentTag = selectIndex - 1;
				if(selectParentTag == btnParent.tag){
					//fix 千千
					var selectArr = MjClient.HandCardArr[selectParentTag];
					var endTime = new Date().getTime();
					if(selectArr){
						if((endTime - touchTime) < 0.3 * 1000){
							_resetArrIndex_paohuzi(selectArr, btnTag, MjClient.copyCell);
						}else{
							_changeArrIndex_paohuzi(selectArr, btnTag, btn);
						}
					}
				}
				else if(selectParentTag >= 0 && selectParentTag < count){
					//在手牌node的范围内
					var selectArr = MjClient.HandCardArr[selectParentTag];
					var cardNum = 4;
					if(selectArr){
						if(selectArr.length >= cardNum){

						}else{
							// selectArr.push(btnTag);
							// MjClient.HandCardArr[btnParent.tag].splice(parseInt(btnName),1);

							//todo 千千
							_fixArrIndex_paohuzi(selectArr, btnTag, btn);
							MjClient.HandCardArr[btnParent.tag].splice(parseInt(btnName),1);

							// _refreshAddNode_paohuzi(MjClient.playui._downNode,selectParentTag);
							// _refreshAddNode_paohuzi(MjClient.playui._downNode,btnParent.tag,false, btnName);
						}
					}
					
				}
				else{
					//最左边的牌的坐标不能小于头像的坐标
					var head = MjClient.playui._downNode.getChildByName("head");
					var head_max_x = head.x + (1 - head.anchorX) * head.width * head.scaleX;
					var handCard = MjClient.playui._downNode.getChildByName("handCard");
					var handNode = MjClient.playui._downNode.getChildByName("handNode");
					var children = handNode.children;
					var singleWidth = handCard.width * handCard.scaleX;
					var minX = (MjClient.size.width - (children.length+1) * singleWidth)/2;
					if(minX > head_max_x){
						MjClient.HandCardArr[btnParent.tag] && MjClient.HandCardArr[btnParent.tag].splice(parseInt(btnName),1);
						var arr = [];
						arr.push(btnTag);
						if(selectParentTag < 0){
							MjClient.HandCardArr.splice(0,0,arr);
							MjClient.addGroupIndex = 0;	//新增列标志
						}else if(selectParentTag >= count){
							MjClient.HandCardArr.push(arr);
							MjClient.addGroupIndex = MjClient.HandCardArr.length - 1;
						}
					}
				}
			}

			MjClient.touchCell = null;
			MjClient.copyCell = null;

			MjClient.playui.ResetHandCard(MjClient.playui._downNode,off);
			ShowPutCardIcon();
			MjClient.addGroupIndex = -1;	//新增列标志

			//todo 千千
			// _moveCards_paohuzi(MjClient.playui._downNode);
			// ShowPutCardIcon();
			
		}
		//if(false){
		//	if (movingCard_paohuzi==null) {
		//		return;
		//	}
		//	btn.removeFromParent(true);
		//	if(cloneCard){
		//		cloneCard.opacity = 255;
		//	}
         //   movingCard_paohuzi = null;
         //   MjClient.playui.ResetHandCard(MjClient.playui._downNode,off);
		//	ShowPutCardIcon();
		//	MjClient.addGroupIndex = -1;	//新增列标志
		//}
	}, card);
}

function _refreshAddNode_paohuzi(posNode,arrTag,isNew,delName){
	var handNode = posNode.getChildByName("handNode");
    var cardArr = MjClient.HandCardArr;
    var handCard = posNode.getChildByName("handCard");
    var scale_x = handCard.scaleX;
    var winSize = MjClient.size;
    var totalWidth = handCard.width * cardArr.length * scale_x;

	if(isNew){

	}else{
		var addNode = handNode.getChildByTag(arrTag);
		if(delName){
			var delC = addNode.getChildByName(delName);
			if(delC){
				delC.removeFromParent();
			}
		}

		var arr = cardArr[arrTag];
		for(var i = 0; i < arr.length; i++){
			var mjNum = arr[i];
			var card = addNode.getChildByTag(mjNum);
			if(!card){
				addHandCard_paohuzi(arrTag, i, mjNum,0);
			}else{
				card.zIndex = 4 - i;
			}
		}
	}
}

function _moveCards_paohuzi(posNode,selectParentTag){
	var handNode = posNode.getChildByName("handNode");
    var cardArr = MjClient.HandCardArr;
    var oldLen = cardArr.length;
    var deleIndex = -1;
    //清理空数组
    for(var k = cardArr.length - 1;k >=0;k--){
        if(cardArr[k].length == 0){
            cardArr.splice(k,1);
            deleIndex = k;
        }
    }

    var len = cardArr.length;
    var handCard = posNode.getChildByName("handCard");
    var scale_x = handCard.scaleX;
    var winSize = MjClient.size;
    var totalWidth = handCard.width * cardArr.length * scale_x;
    var index = 0;
    for(var i = 0; i < oldLen; i++){
    	var addNode = handNode.getChildByTag(i);
    	index = i;
    	if(addNode && addNode.tag == deleIndex){
    		addNode.removeFromParent();
    		addNode = null;
    		continue;
    	}else if(deleIndex >= 0 && addNode.tag > deleIndex){
    		addNode.tag -= 1;
    		index -= 1;
    	}

    	doMovetoAction(addNode, cc.p((winSize.width - totalWidth)/2 + index * handCard.width * scale_x,0));
    }

}

function doMovetoAction(node,endP){
	node.stopAllActions();
    var ac = cc.moveTo(0.1,endP);
    node.runAction(ac);
}

//点击换牌的位置
function _resetArrIndex_paohuzi(arr, btnTag, btn){
	if(arr && !_isKan_paohuzi(arr)){
		if(arr.length <= 1){
			return;
		}
		var copyArr = arr.slice();
		var len = copyArr.length;
		for(var i = 0; i < len; i++){
			var tag = copyArr[i];
			if(tag == btnTag){
				copyArr.splice(i,1);
				break;
			}
		}
		if(_isKan_paohuzi(copyArr)){
			return;
		}

		var childArr = btn.parent.children.reverse();
		var pos = btn.getPosition();
		for(var i = 0,count = childArr.length;i< count;i++){
			var childPos = childArr[i].getPosition();
			if(Math.abs(childPos.y - pos.y) <= 1){
				index = i;
				break;
			}
		}
		var changeIndex = index == len - 1 ? index - 1 : index + 1;
		var oCard = arr[index];
		arr[index] = arr[changeIndex];
		arr[changeIndex] = oCard;
	}	
}

//根据坐标Y，添加到数组对应的位置
function _fixArrIndex_paohuzi(arr, btnTag, btn){
	if(arr){
		if(_isKan_paohuzi(arr)){
			arr.push(btnTag);
		}else{
			var off_y = btn.height/4 * btn.scaleY;
			var maxH = btn.height * btn.scaleY * 3 - off_y * 2;
			if(btn.y > maxH){
				arr.push(btnTag);
			}else if(btn.y > btn.height * btn.scaleY * 2 - off_y){
				arr.splice(2,0,btnTag);
			}else if(btn.y > btn.height * btn.scaleY){
				arr.splice(1,0,btnTag);
			}else{
				arr.splice(0,0,btnTag);
			}
		}

		cc.log('_fixArrIndex_paohuzi====:',arr);
	}
}

//改变数组元素的位置
function _changeArrIndex_paohuzi(arr, btnTag, btn){
	if(arr && !_isKan_paohuzi(arr)){
		var len = arr.length;
		for(var i = 0; i < len; i++){
			var tag = arr[i];
			if(tag == btnTag){
				arr.splice(i,1);
				break;
			}
		}
		_fixArrIndex_paohuzi(arr, btnTag, btn);
	}
}

//数组里的是否为三个相同的牌
function _isKan_paohuzi(arr){
	if(arr){
		var len = arr.length;
		if(len < 3){
			return false;
		}

		var count = 1;
		var temTag = arr[0];
		for(var i = 1; i < len; i++){
			var tag = arr[i];
			if(tag == temTag){
				count += 1;
			}
		}
		if(count >= 3){
			return true;
		}
	}
	return false;
}


//断线重连之后，显示之前玩家打的牌
function DealOffLineCard_paohuzi(node, off){
	cc.log("====================DealOffLineCard_paohuzi=================");
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	if(tData.tState != TableState.waitPut && tData.tState != TableState.waitEat && tData.tState != TableState.waitCard)
	{
		return;
	}
	if(typeof(tData.currCard) != "undefined" && tData.currCard != -1 && tData.currCard != 91){
		var uids = tData.uids;
		var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_paohuzi;
		var curPlayer = tData.curPlayer;
		if(tData.putType == 4){
			curPlayer = (curPlayer - 1 + MjClient.MaxPlayerNum_paohuzi) % MjClient.MaxPlayerNum_paohuzi;
			var otherIndex = (uids.indexOf(SelfUid()) + curPlayer) % MjClient.MaxPlayerNum_paohuzi;
			if(otherIndex == tData.xingPlayer){
				curPlayer = (curPlayer - 1 + MjClient.MaxPlayerNum_paohuzi) % MjClient.MaxPlayerNum_paohuzi;
			}			
		}
		if(uids[selfIndex] == uids[curPlayer]){
			var putCard = getNewCard_paohuzi(tData.currCard, 3, off);
			var putNode = node.getChildByName("put");
			putNode.setScale(putNode.getUserData().scale);
			putNode.removeAllChildren(true);
			putCard.scaleX = putCard.width/putNode.width - 0.16;
			putCard.scaleY = putCard.width/putNode.width - 0.06;
			putCard.x = putCard.width/2;
			putCard.y = putCard.height/2;
			putNode.visible = true;
            putNode.setPosition(putNode.getUserData().pos);
			putNode.addChild(putCard);

			var pl = sData.players[uids[curPlayer]];
			if(pl && !pl.isNew) {
                putNode.loadTexture("playing/paohuzi/chupai_bj.png");
            }else {
                putNode.loadTexture("playing/paohuzi/mopai_bj.png");
            }
		}
	}	
}

//发牌
MjClient.isCommon = false;
function DealNewCard_paohuzi(node, msg, off){
	cc.log("======DealNewCard_paohuzi======= " + off);
	//没有发牌过来的时候直接忽略
	if(!msg.newCard){
		RemovePutCardOut_paohuzi();
		MjClient.playui.EatVisibleCheck();
		return;
	}
	//存在发牌
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var uids = tData.uids;
	var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_paohuzi;
	if(uids[selfIndex] == msg.uid){
		//清理之前玩家打的牌
		var lastPlayer = tData.lastPlayer;
		if(lastPlayer != -1){
			//var lastOff = (off + MjClient.MaxPlayerNum_paohuzi - selfIndex) % MjClient.MaxPlayerNum_paohuzi;
			RemovePutCardOut_paohuzi();
		}
		var pl = sData.players[uids[selfIndex]];

		var putCard = null;
        if ((pl.eatFlag & 16 || pl.eatFlag & 8) && msg.uid != SelfUid()) {
            putCard = getNewCard_paohuzi(msg.newCard, 3, off, true);
        }else {
            putCard = getNewCard_paohuzi(msg.newCard, 3, off);
		}

		var putNode = node.getChildByName("put");
		putNode.removeAllChildren();
		putCard.scaleX = putCard.width/putNode.width - 0.16;
		putCard.scaleY = putCard.width/putNode.width - 0.06;
		putCard.x = putCard.width/2;
		putCard.y = putCard.height/2;
		putNode.visible = true;
		putNode.addChild(putCard);

        //添加动作
        putNode.setScale(0);
        putNode.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2+120));
        var action1 = cc.scaleTo(0.2,putNode.getUserData().scale);
        var action2 = cc.moveTo(0.2,putNode.getUserData().pos);
        putNode.runAction(cc.spawn(action1,action2).easing(cc.easeCubicActionOut()));

		if(!msg.isCommon){
			if(MjClient.rePlayVideo == -1){
				MjClient.isCommon = true;
				//王霸牌需要收回
				var callback = function(){
					// RemovePutCardOut_paohuzi();
					putNode.removeAllChildren();
            		putNode.visible = false;
					//如果是自己则需要重新整理手牌
					if(msg.uid == SelfUid()){
						var cardArr = MjClient.HandCardArr;
						var isAdd = false;
						for(var i = 0;i < cardArr.length;i++){
							var tmpArr = cardArr[i];
							if(tmpArr.length <= 2){
								isAdd = true;
								MjClient.HandCardArr[i].push(msg.newCard);
								break;
							}
						}
						if(!isAdd){
							MjClient.HandCardArr.push([msg.newCard]);
						}
						//MjClient.playui.CardLayoutRestore(node,off);
                        MjClient.playui.ResetHandCard(node,off);//mod by maoyu
					}
					MjClient.isCommon = false;
					ShowPutCardIcon();
					MjClient.playui.EatVisibleCheck();
				};
				var delay = cc.delayTime(1.3);
				var remove = cc.callFunc(callback);
				var seq = cc.sequence(delay,remove);
				putNode.runAction(seq);
			}else{
				var cardArr = [];
                if(msg.uid == SelfUid()){
                    cardArr = MjClient.HandCardArr;
                }else {
                    cardArr = MjClient.OtherHandArr[off];
				}
				var isAdd = false;
                putNode.runAction(cc.sequence(
                    cc.delayTime(0.2),
                    cc.callFunc(function(){RemovePutCardOut_paohuzi();})
                ));
				for(var i = 0;i < cardArr.length;i++){
					var tmpArr = cardArr[i];
					if(tmpArr.length <= 2){
						isAdd = true;
						//addHandCard_paohuzi(i,tmpArr.length.length + 1,msg.newCard,off);
                        tmpArr.push(msg.newCard);
						break;
					}
				}
				if(!isAdd){
                    cardArr.push([msg.newCard]);
				}
				MjClient.playui.CardLayoutRestore(node,off);
				MjClient.playui.EatVisibleCheck();
                cc.log("cardArr="+JSON.stringify(cardArr));
			}
		}else{
			// MjClient.playui.EatVisibleCheck(off);
		}
	}
	else{
        //MjClient.playui.ResetOtherCard(node,off);//mod by maoyu
		MjClient.playui.ResetPutCard(node,off);
	}	
}

//翻醒发牌
function DealFanXingNewCard_paohuzi(card){
    var putCard = getNewCard_paohuzi(card, 4, 0);
    var putNode = MjClient.playui._downNode.getChildByName("xingPai");
    putNode.removeAllChildren();
    putCard.scaleX = putCard.width/putNode.width - 0.16;
    putCard.scaleY = putCard.width/putNode.width - 0.06;
    putCard.x = putCard.width/2;
    putCard.y = putCard.height/2;
    putNode.visible = true;
    putNode.addChild(putCard);

    //添加动作
    putNode.setScale(0.1);
    putNode.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2+120));
    var action1 = cc.scaleTo(0.2,putNode.getUserData().scale);
    var action2 = cc.moveTo(0.2,putNode.getUserData().pos);
    putNode.runAction(cc.spawn(action1,action2).easing(cc.easeCubicActionOut()));
}

//王闯/王钓
function DealWangChuang_paohuzi(node,msg,off){
	var sData = MjClient.data.sData;
	var tData = sData.tData;

	var uids = tData.uids;
	var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_paohuzi;
	if(uids[selfIndex] == msg.uid){
		var pl = sData.players[uids[selfIndex]];
		var lastPlayer = tData.lastPlayer;
		if(lastPlayer != -1){
			//var lastOff = (off + MjClient.MaxPlayerNum_paohuzi - selfIndex) % MjClient.MaxPlayerNum_paohuzi;
			RemovePutCardOut_paohuzi();
		}
		if(pl.wangType == 1){
			var putCard = getNewCard_paohuzi(91, 3, off);
			var putNode = node.getChildByName("put");
			putNode.loadTexture("playing/gameTable/empty.png");
			putCard.scaleX = putCard.width/putNode.width - 0.16;
			putCard.scaleY = putCard.width/putNode.width - 0.06;
			putCard.x = putCard.width/2;
			putCard.y = putCard.height/2;
			putNode.visible = true;
			putNode.setPosition(putNode.getUserData().pos);
            putNode.setScale(putNode.getUserData().scale);
			putNode.addChild(putCard);

			ShowEatActionAnim_paohuzi(node, ActionType_paohuzi.WANGDIAO, off);

			var delay = cc.delayTime(1.5);
			var callback = function(){
				RemovePutCardOut_paohuzi();
				//HZNewCardToServer_paohuzi();
			}
			//putNode.runAction(cc.sequence(delay,cc.callFunc(callback)));
		}else if(pl.wangType == 2){
			var putCard = getNewCard_paohuzi(91, 3, off);
			var putCard1 = getNewCard_paohuzi(91, 3, off);
			var putNode = node.getChildByName("put");
			putNode.loadTexture("playing/gameTable/empty.png");
			putCard.scaleX = putCard.width/putNode.width - 0.16;
			putCard.scaleY = putCard.width/putNode.width - 0.06;
			putCard1.scaleX = putCard.width/putNode.width - 0.16;
			putCard1.scaleY = putCard.width/putNode.width - 0.06;
			if(node.getName() == "down"){
				putCard.x = - 15;
				putCard.y = putCard.height/2;
				putCard1.x = putCard.width + 15;
				putCard1.y = putCard.height/2;
			}else if(node.getName() == "right"){
				putCard.x = putCard.width/2;
				putCard.y = putCard.height/2;
				putCard1.x = - putCard.width/2 - 30;
				putCard1.y = putCard.height/2;
			}else if(node.getName() == "left"){
				putCard.x = putCard.width/2;
				putCard.y = putCard.height/2;
				putCard1.x = putCard.width/2 + putCard.width + 30;
				putCard1.y = putCard.height/2;
			}
			putNode.visible = true;
            putNode.setPosition(putNode.getUserData().pos);
            putNode.setScale(putNode.getUserData().scale);
			putNode.addChild(putCard);
			putNode.addChild(putCard1);
			ShowEatActionAnim_paohuzi(node, ActionType_paohuzi.WANGCHUANG, off);
			var delay = cc.delayTime(1.5);
			var callback = function(){
				RemovePutCardOut_paohuzi();
				//HZNewCardToServer_paohuzi();
			}
			//putNode.runAction(cc.sequence(delay,cc.callFunc(callback)));
		}else if(pl.wangType == 4){
			var putCard = getNewCard_paohuzi(91, 3, off);
			var putCard1 = getNewCard_paohuzi(91, 3, off);
			var putCard2 = getNewCard_paohuzi(91, 3, off);
			var putNode = node.getChildByName("put");
			putNode.loadTexture("playing/gameTable/empty.png");
			putCard.scaleX = putCard.width/putNode.width - 0.16;
			putCard.scaleY = putCard.width/putNode.width - 0.06;
			putCard1.scaleX = putCard.width/putNode.width - 0.16;
			putCard1.scaleY = putCard.width/putNode.width - 0.06;
			putCard2.scaleX = putCard.width/putNode.width - 0.16;
			putCard2.scaleY = putCard.width/putNode.width - 0.06;
			if(node.getName() == "down"){
				putCard.x = putCard.width/2;
				putCard.y = putCard.height/2;
				putCard1.x = -(putCard.width/2 + 15);
				putCard1.y = putCard.height/2;
				putCard2.x = putCard.width/2 + putCard.width + 15;
				putCard2.y = putCard.height/2;
			}else if(node.getName() == "right"){
				putCard.x = putCard.width/2;
				putCard.y = putCard.height/2;
				putCard1.x = - putCard.width/2 - 30;
				putCard1.y = putCard.height/2;
				putCard2.x = - putCard.width/2 - putCard.width - 45;
				putCard2.y = putCard.height/2;
			}else if(node.getName() == "left"){
				putCard.x = putCard.width/2;
				putCard.y = putCard.height/2;
				putCard1.x = putCard.width/2 + putCard.width + 30;
				putCard1.y = putCard.height/2;
				putCard2.x = putCard.width/2 + (putCard.width + 30) * 2;
				putCard2.y = putCard.height/2;
			}
			putNode.visible = true;
            putNode.setPosition(putNode.getUserData().pos);
            putNode.setScale(putNode.getUserData().scale);
			putNode.addChild(putCard);
			putNode.addChild(putCard1);
			putNode.addChild(putCard2);
			ShowEatActionAnim_paohuzi(node, ActionType_paohuzi.WANGZHA, off);
			var delay = cc.delayTime(1.5);
			var callback = function(){
				RemovePutCardOut_paohuzi();
				//HZNewCardToServer_paohuzi();
			}
			//putNode.runAction(cc.sequence(delay,cc.callFunc(callback)));
		}

		var eat = MjClient.playui.jsBind.eat;
		eat.chi._node.visible = false;
    	eat.peng._node.visible = false;
		eat.guo._node.visible = false;
	    eat.wangDiao._node.visible = false;
	    eat.wangChuang._node.visible = false;
	    eat.wangZha._node.visible = false;
	    eat.chi._node.setTouchEnabled(false);
	    eat.peng._node.setTouchEnabled(false);
		eat.guo._node.setTouchEnabled(false);
		eat.wangDiao._node.setTouchEnabled(false);
		eat.wangChuang._node.setTouchEnabled(false);
		eat.wangZha._node.setTouchEnabled(false);
	}
}

//处理出牌
function DealPutCard_paohuzi(node, msg, off){
    cc.log("======DealPutCard_paohuzi======= " + off);
    MjClient.hasPut = false;
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var uids = tData.uids;
	var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_paohuzi;
	if(uids[selfIndex] == msg.uid)
    {
        //别人出牌或者回放时，添加动作
        if (SelfUid() != msg.uid || MjClient.rePlayVideo != -1)
        {
            var putNode = node.getChildByName("put");
            putNode.removeAllChildren();
            var putCard = getNewCard_paohuzi(msg.card, 3 ,off);
            putCard.scaleX = putCard.width/putNode.width - 0.16;
            putCard.scaleY = putCard.width/putNode.width - 0.06;
            putCard.x = putCard.width/2;
            putCard.y = putCard.height/2;
            putNode.addChild(putCard);
            putNode.visible = true;
            // putNode.setScale(putNode.getUserData().scale);
            putNode.setPosition(putNode.getUserData().pos);


            var pos = putNode.getUserData().pos;
            putNode.setScale(0);
            if(SelfUid() == msg.uid){
                putNode.setPosition(cc.p(pos.x ,pos.y - 100));
            }else if(node.getName() == "left"){
                putNode.setPosition(cc.p(pos.x - 50 ,pos.y + 50));
            }else if(node.getName() == "right"){
            	putNode.setPosition(cc.p(pos.x + 50 ,pos.y + 50));
            }else if(node.getName() == "xing"){
            	putNode.setPosition(cc.p(pos.x + 50 ,pos.y - 50));
            }
            var action1 = cc.scaleTo(0.2,putNode.getUserData().scale);
            var action2 = cc.moveTo(0.2,pos.x,pos.y);
            putNode.runAction(cc.spawn(action1,action2).easing(cc.easeCubicActionOut()));
        }

        var pl = getUIPlayer_paohuzi(off);
        if(pl.canNotPutCard){
            pl.canNotPutCard = [];
        }
        if(pl.limitHuPutCard){
            pl.limitHuPutCard = [];
        }
        if(MjClient.rePlayVideo == -1 && off == 0){
            MjClient.playui.ResetHandCard(node,off);
		}
		
		if(MjClient.rePlayVideo != -1){
			RemoveHandCard_paohuzi(node,msg.card,off);
	        MjClient.playui.ResetHandCard(node,off);
		}
	}
}

function GetEatPosX_paohuzi(node, off, width, removeCount){
	var eatNode = node.getChildByName("eatNode");
	var sData = MjClient.data.sData;
	var uids = MjClient.data.sData.tData.uids;
	var pl = sData.players[uids[off]];
	var count = pl.mjwei.length + pl.mjgang1.length + pl.mjgang0.length + pl.mjpeng.length;
	for (var i = 0; i < pl.mjchi.length; i++) {
        count += 1;
        if (pl.mjchi[i].biCards) {
            count += pl.mjchi[i].biCards.length;
        }
    }
    removeCount = removeCount || 0;
    count -= removeCount;
    var pos_x = 0;
    if(node.getName() == "down" || node.getName() == "left"){
    	pos_x = count * width;
    }else if(node.getName() == "right" || node.getName() == "xing"){
    	pos_x = eatNode.width - count * width;
    }
    return pos_x;
}

function ResetEatAnchor_paohuzi(node, card){
	if(node.getName() == "down" || node.getName() == "left"){
		card.setAnchorPoint(cc.p(0,0));
	}else if(node.getName() == "right" || node.getName() == "xing"){
		card.setAnchorPoint(cc.p(1,0));
	}
}

//吃牌
function DealChiCard_paohuzi(node, msg, off){
	cc.log("======DealChiCard_paohuzi======= " + off);
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var uids = tData.uids;
	var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_paohuzi;
	if (tData.curPlayer == selfIndex){
		RemovePutCardOut_paohuzi();
		var pl = sData.players[uids[selfIndex]];
		var mjchi = pl.mjchi;
		var eatAndBiCards = mjchi[mjchi.length-1];
		var mjchiCard = pl.mjchiCard;
		var chiCard = mjchiCard[mjchiCard.length-1];
		var eatCards = eatAndBiCards.eatCards;
		var tmpEatCards = eatCards.slice();
		tmpEatCards.splice(tmpEatCards.indexOf(chiCard),1);
		for(var i = 0;i < tmpEatCards.length;i++){
			RemoveHandCard_paohuzi(node,tmpEatCards[i],off);
		}
		var biCards = eatAndBiCards.biCards;
		if(biCards){
			for(var k = 0;k < biCards.length;k++){
				var biArr = biCards[k];
				var tmpBiArr = biArr.slice();
				for(var m = 0;m<biArr.length;m++){
					if(tmpBiArr.indexOf(biArr[m]) >= 0){
						tmpBiArr.splice(tmpBiArr.indexOf(biArr[m]),1);
						RemoveHandCard_paohuzi(node,biArr[m],off);
					}
				}
			}
		}
        MjClient.playui.ResetHandCard(node,off);

		//吃牌动作
        var eatNode = node.getChildByName("eatNode");
		var parent = new cc.Node();
		var cardWidth = 0;
		var off_y = 0;
		eatCards.splice(eatCards.indexOf(chiCard),1);
		eatCards.push(chiCard);
		var count = 1;
		for(var i = 0;i < eatCards.length;i++){
			var card = getNewCard_paohuzi(eatCards[i],2,off);
			card.tag = eatCards[i];
			if(i == 2){
				card.setColor(cc.color(170, 170, 170));
			}
            cardWidth = card.width * card.scaleX;
			card.zIndex = 4 - i;
			card.setAnchorPoint(cc.p(0,0));
			card.x = 0;
			if(node.getName() == "right" || node.getName() == "xing"){
				card.x = -cardWidth;
			}
			card.y = i * card.height * card.scaleY;
			if(off_y == 0){
				off_y = card.height * card.scaleY;
			}
			parent.addChild(card);
		}
		if(biCards){
			count += biCards.length;
			for(var k = 0;k < biCards.length;k++){
				var biArr = biCards[k];
				biArr.splice(biArr.indexOf(chiCard),1);
				biArr.push(chiCard);
				for(var m = 0;m<biArr.length;m++){
					var card = getNewCard_paohuzi(biArr[m],2,off);
					card.tag = biArr[m];
					if(m == 2){
						card.setColor(cc.color(170, 170, 170));
					}
					var childCount = parent.childrenCount;
					card.zIndex = 4 - m;
					card.setAnchorPoint(cc.p(0,0));
					if(node.getName() == "right" || node.getName() == "xing"){
						card.x = -(k + 2) * cardWidth;
					}else{
						card.x = (k + 1) * cardWidth;
					}
					card.y = m * card.height * card.scaleY;
					parent.addChild(card);
				}
			}
		}

		var putNode = node.getChildByName("put");
        putNode.setPosition(putNode.getUserData().pos);
        var eatNodeConvertPos = eatNode.convertToNodeSpace(putNode.getUserData().pos);
		parent.x = eatNodeConvertPos.x - count * cardWidth/2;
		parent.y = eatNodeConvertPos.y - 2 * off_y;
		var parentScale = parent.scale;
		var eatNodeScale = eatNode.getUserData().scale;
		parent.setScale(putNode.getUserData().scale * 0.1/eatNodeScale);
		eatNode.addChild(parent);

		var action1 = cc.scaleTo(0.2, putNode.getUserData().scale * 1.7/eatNodeScale);
		var delay = cc.delayTime(0.4);
		var action4 = cc.scaleTo(0.3, parentScale);

        var moveX = GetEatPosX_paohuzi(node,selfIndex,cardWidth, count);
		var moveY = 0;
		if(node.getName() == "right" || node.getName() == "left"){
			moveY = eatNode.height - 3 * cardWidth;
		}
		var action2 = cc.moveTo(0.3,moveX,moveY);
		var callback = function(){
			// parent.removeFromParent(true);
            // MjClient.playui.ResetOtherCard(node, off);
		};
		parent.runAction(cc.sequence(action1,delay,cc.spawn(action4, action2),cc.callFunc(callback)));

        if(biCards){
			ShowEatActionAnim_paohuzi(node, ActionType_paohuzi.XIAHUO, off);
		}else{
			ShowEatActionAnim_paohuzi(node, ActionType_paohuzi.CHI, off);
		}
	}
	//MjClient.playui.CardLayoutRestore(node,off);
}

// 处理碰
function DealPengCard_paohuzi(node, msg, off){
	cc.log("======DealChiCard_paohuzi======= ");
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var uids = tData.uids;
	var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_paohuzi;
	if(tData.curPlayer == selfIndex){
		RemovePutCardOut_paohuzi();

		var parent = new cc.Node();
        var eatNode = node.getChildByName("eatNode");
        var cardWidth = 0;
		var pl = sData.players[tData.uids[selfIndex] + ""];
		var pengCard = pl.mjpeng[pl.mjpeng.length-1];
		var off_y = 0;
		for(var i = 0;i < 3;i++){
			var card = getNewCard_paohuzi(pengCard,2,off);
			card.tag = pengCard;
            cardWidth = card.width*card.scaleX;
			var childCount = parent.childrenCount;
			card.zIndex = 4 - childCount;
			card.setAnchorPoint(cc.p(0,0));
			card.x = 0;
			if(node.getName() == "right" || node.getName() == "xing"){
				card.x = -cardWidth;
			}
			card.y = childCount * card.height * card.scaleY;
			if(off_y == 0){
				off_y = card.height * card.scaleY;
			}
			parent.addChild(card);
		}

		var putNode = node.getChildByName("put");
        putNode.setPosition(putNode.getUserData().pos);
        var eatNodeConvertPos = eatNode.convertToNodeSpace(putNode.getUserData().pos);
		parent.x = eatNodeConvertPos.x - cardWidth/2;
		parent.y = eatNodeConvertPos.y - 2 * off_y;
		var parentScale = parent.scale;
		var eatNodeScale = eatNode.getUserData().scale;
		parent.setScale(putNode.getUserData().scale*0.1/eatNodeScale);
		eatNode.addChild(parent);

		RemoveHandCard_paohuzi(node,pengCard,off);
		RemoveHandCard_paohuzi(node,pengCard,off);
        MjClient.playui.ResetHandCard(node, off);
		ShowEatActionAnim_paohuzi(node, ActionType_paohuzi.PENG, off);


		var callback = function(){
			ShowPutCardIcon();
		};

        var action1 = cc.scaleTo(0.2, putNode.getUserData().scale * 1.7/eatNodeScale);
        var delay = cc.delayTime(0.4);
		var action4 = cc.scaleTo(0.3, parentScale);

        var moveX = GetEatPosX_paohuzi(node,selfIndex,cardWidth,1);
		var moveY = 0;
		if(node.getName() == "right" || node.getName() == "left"){
			moveY = eatNode.height - 3 * cardWidth;
		}
		var action2 = cc.moveTo(0.3,moveX,moveY);
		var action3 = cc.callFunc(callback);
		parent.runAction(cc.sequence(action1,delay,cc.spawn(action2, action4),action3));
	}
}

//偎牌
function DealWeiCard_paohuzi(node,msg,off){
	cc.log("======DealWeiCard_paohuzi======= ");
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var uids = tData.uids;
	var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_paohuzi;
	if(tData.curPlayer == selfIndex){
		RemovePutCardOut_paohuzi();
		ShowEatActionAnim_paohuzi(node, ActionType_paohuzi.WEI, off);

		var parent = new cc.Node();
        var eatNode = node.getChildByName("eatNode");
        var cardWidth = 0;
		var pl = sData.players[tData.uids[selfIndex] + ""];
		var weiCard = msg.newCard;
		var off_y = 0;
		for(var i = 0;i < 3;i++){
			var isTurn = true;
			var card = getNewCard_paohuzi(weiCard,2,off);
			card.tag = weiCard;
            cardWidth = card.width*card.scaleX;
			card.zIndex = 4 - i;
			card.setAnchorPoint(cc.p(0,0));
			card.x = 0;
			if(node.getName() == "right" || node.getName() == "xing"){
				card.x = -cardWidth;
			}
			card.y = i * card.height * card.scaleY;
			if(off_y == 0){
				off_y = card.height * card.scaleY;
			}
			parent.addChild(card);
		}

		var childArr = parent.children;
		var skipPeng = pl.skipPeng;
        if(!skipPeng || skipPeng.indexOf(weiCard) < 0){
		    for(var i = 0;i < childArr.length;i++){
		        var child = childArr[i];
		        if(pl.info.uid == SelfUid() || 
		        	(tData.curPlayer == tData.zhuang && uids.indexOf(SelfUid()) == tData.xingPlayer))
		        {
		            var shade = new cc.Sprite("playing/paohuzi/huxiBG1.png");
		            shade.opacity = 100;
		            shade.x = shade.width/2;
		            shade.y = shade.height/2;
		            child.addChild(shade);
		        }else{
		            child.loadTexture("playing/paohuzi/huxiBG.png");
		        }
		    }
        }else{
            for(var i = 0;i < childArr.length;i++){
                var child = childArr[i];
                if(i != childArr.length - 1){
                    child.loadTexture("playing/paohuzi/huxiBG.png");
                }
            }
        }

		var putNode = node.getChildByName("put");
        putNode.setPosition(putNode.getUserData().pos);
        var eatNodeConvertPos = eatNode.convertToNodeSpace(putNode.getUserData().pos);
		parent.x = eatNodeConvertPos.x - cardWidth/2;
		parent.y = eatNodeConvertPos.y - 2 * off_y;
		var parentScale = parent.scale;
		var eatNodeScale = eatNode.getUserData().scale;
		parent.setScale(putNode.getUserData().scale*0.1/eatNodeScale);
		eatNode.addChild(parent);

		RemoveHandCard_paohuzi(node,weiCard,off);
		RemoveHandCard_paohuzi(node,weiCard,off);
        MjClient.playui.ResetHandCard(node, off);

		var callback = function(){
			ShowPutCardIcon();
			if(pl.mjState == TableState.waitEat){
				MjClient.playui.EatVisibleCheck();
			}
		};

        var moveX = GetEatPosX_paohuzi(node,selfIndex,cardWidth,1);
		var moveY = 0;
		if(node.getName() == "right" || node.getName() == "left"){
			moveY = eatNode.height - 3 * cardWidth;
		}


		var action1 = cc.scaleTo(0.2, putNode.getUserData().scale * 1.7/eatNodeScale);
        var delay = cc.delayTime(0.4);
        var action4 = cc.scaleTo(0.3, parentScale);

		var action2 = cc.moveTo(0.3,moveX,moveY);
		var action3 = cc.callFunc(callback);
		parent.runAction(cc.sequence(action1,delay,cc.spawn(action2, action4),action3));
		if(MjClient.rePlayVideo != -1){
			MjClient.playui.EatVisibleCheck();
		}
	}
}

//跑牌或者提牌
function DealGangCard_paohuzi(node,msg,off){
	cc.log("======DealGangCard_paohuzi======= ");
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var uids = tData.uids;
	var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_paohuzi;
	var gangUid = msg.cpginfo.uid;
	if(uids.indexOf(gangUid) == selfIndex){
        RemovePutCardOut_paohuzi();
		if(msg.type == 2){
			ShowEatActionAnim_paohuzi(node, ActionType_paohuzi.PAO, off);
		}else{
			ShowEatActionAnim_paohuzi(node, ActionType_paohuzi.TI, off);
		}
		var eatNode = node.getChildByName("eatNode");
		var gangCard = msg.newCard;
		var paoMovePos = 0;
        if((msg.type == 2 && msg.pos && msg.pos == 3 || msg.pos == 2) || msg.type == 1){
        	var outNodeChilden = eatNode.getChildren();
        	for(var i = 0;i < outNodeChilden.length;i++){
        		var tmpOutNode = outNodeChilden[i];
        		var tmpChildren = tmpOutNode.getChildren();
        		if(tmpChildren.length != 3){
        			continue;
        		}
        		if(tmpChildren[0].tag == gangCard &&　tmpChildren[0].tag == tmpChildren[2].tag){
        			paoMovePos = tmpOutNode.getPosition();
        			tmpOutNode.removeFromParent(true);
        			break;
        		}
        	}
        }

		var parent = new cc.Node();
        var cardWidth = 0;
		var pl = sData.players[tData.uids[selfIndex] + ""];
		var off_y = 0;
		for(var i = 0;i < 4;i++){
			var card = null;
            if(msg.type == 1){
            	if(pl.info.uid == SelfUid() || (tData.curPlayer == tData.zhuang && uids.indexOf(SelfUid()) == tData.xingPlayer)){
            		card = getNewCard_paohuzi(gangCard,2,off);
            	}else{
            		card = getNewCard_paohuzi(gangCard,2,off,true);
            	}
            }else if(msg.type == 2){
                card = getNewCard_paohuzi(gangCard,2,off);
			}
			card.tag = gangCard;
            cardWidth = card.width*card.scaleX;
			var childCount = parent.childrenCount;
			card.zIndex = 4 - childCount;
			card.setAnchorPoint(cc.p(0,0));
			card.x = 0;
			if(node.getName() == "right" || node.getName() == "xing"){
				card.x = -cardWidth;
			}
			card.y = childCount * card.height * card.scaleY;
			if(off_y == 0){
				off_y = card.height * card.scaleY;
			}
			parent.addChild(card);
		}

		if(msg.type == 1 && (pl.info.uid == SelfUid() || 
			(tData.curPlayer == tData.zhuang && uids.indexOf(SelfUid()) == tData.xingPlayer)))
		{
			var childArr = parent.children;
		    for(var i = 0;i < childArr.length;i++){
		        var child = childArr[i];
	            var shade = new cc.Sprite("playing/paohuzi/huxiBG1.png");
	            shade.opacity = 100;
	            shade.x = shade.width/2;
	            shade.y = shade.height/2;
	            child.addChild(shade);
		    }
		}

		var putNode = node.getChildByName("put");
        putNode.setPosition(putNode.getUserData().pos);
        var eatNodeConvertPos = eatNode.convertToNodeSpace(putNode.getUserData().pos);
		parent.x = eatNodeConvertPos.x - cardWidth/2;
		parent.y = eatNodeConvertPos.y - 2 * off_y;
		var parentScale = parent.scale;
		var eatNodeScale = eatNode.getUserData().scale;
        parent.setScale(putNode.getUserData().scale*0.1/eatNodeScale);
		eatNode.addChild(parent);

		RemoveHandCard_paohuzi(node,gangCard,off);
		RemoveHandCard_paohuzi(node,gangCard,off);
		RemoveHandCard_paohuzi(node,gangCard,off);
		if(msg.isGangHand){
            RemoveHandCard_paohuzi(node,gangCard,off);
		}
        MjClient.playui.ResetHandCard(node, off);


		var callback = function(){
			ShowPutCardIcon();
			if(pl.mjState == TableState.waitCard){
				//HZNewCardToServer_paohuzi();
			}else if(pl.mjState == TableState.waitEat){
				MjClient.playui.EatVisibleCheck();
			}
		};
        var action1 = cc.scaleTo(0.2, putNode.getUserData().scale * 1.7/eatNodeScale);
        var delay = cc.delayTime(0.4);
        var action4 = cc.scaleTo(0.3, parentScale);

        var moveX = GetEatPosX_paohuzi(node,selfIndex,cardWidth,1);
        if((msg.type == 2 && msg.pos && msg.pos == 3 || msg.pos == 2) || (msg.type == 1 && paoMovePos != 0)){
        	moveX = paoMovePos.x;
        }
        var moveY = 0;
		if(node.getName() == "right" || node.getName() == "left"){
			moveY = eatNode.height - 4 * cardWidth;
		}
		var action2 = cc.moveTo(0.3,moveX,moveY);
		var action3 = cc.callFunc(callback);
		parent.runAction(cc.sequence(action1,delay,cc.spawn(action2, action4),action3));
		if(MjClient.rePlayVideo != -1){
			MjClient.playui.EatVisibleCheck();
		}
	}
	//MjClient.playui.CardLayoutRestore(node,off);
}

// 处理胡
function DealHu_paohuzi(node, msg, off){
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var selfIndex = (tData.uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_paohuzi;
	var pl = getUIPlayer_paohuzi(off);
	if(tData.uids[selfIndex] != msg.uid){
		return;
	}
	if(pl){
		pl.eatFlag = 0;
		MjClient.playui.EatVisibleCheck();
		ShowEatActionAnim_paohuzi(node,ActionType_paohuzi.HU,off);
	}
}

//清除打出的牌
function RemovePutCardOut_paohuzi(noAction){
	var jsBind = MjClient.playui.jsBind;
	var uiList = [jsBind.down, jsBind.right, jsBind.left];
	if (MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King)
    {
        uiList = [jsBind.down, jsBind.right, jsBind.xing, jsBind.left];
    }
    else if(MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO || MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z)
    {
	    if (MjClient.MaxPlayerNum_paohuzi == 3)
        {
            uiList = [jsBind.down, jsBind.right, jsBind.left];
        }
        else if(MjClient.MaxPlayerNum_paohuzi == 4)
        {
            uiList = [jsBind.down, jsBind.xing, jsBind.right, jsBind.left];
        }
        else if(MjClient.MaxPlayerNum_paohuzi == 2)
        {
			uiList = [jsBind.down, jsBind.right];
			// if(MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType()){
			// 	uiList.pop();
			// 	uiList.push(jsBind.left)
			// }
        }
	}
	else if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_ER || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_LR_King)
	{
		uiList = [jsBind.down, jsBind.right];
	}

	for(var i = 0;i < uiList.length;i++){
		var _node = uiList[i];
		var putNode = _node._node.getChildByName("put");
		//putNode.removeAllChildren();
		//putNode.visible = false;

        if (!putNode)
        {
            continue;
        }


        var pl = getUIPlayer_paohuzi(i);
        if (MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King)
        {
            pl = getUIPlayer_paohuzi(getOffByXing_paohuzi(i));
        }


        if (!noAction &&
            MjClient.data.sData.tData.xingPlayer!=MjClient.data.sData.tData.uids.indexOf(SelfUid()) &&//醒家视角时播动作有bug未解决
            pl &&
            pl.mjput.length>0 &&
            putNode.getChildren().length>0 &&
            putNode.getChildren()[0].tag == pl.mjput[pl.mjput.length-1]
        )
        {
            var outNode = _node._node.getChildByName("outNode");

            var moveX = outNode.getPosition().x;
            var outNodeChilden = outNode.getChildren();
            var outNodeCount = outNode.getChildrenCount();
            if(outNodeCount>0){
                if((MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO || MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z) && MjClient.MaxPlayerNum_paohuzi == 4){
                    if(_node._node.getName() == "down" || _node._node.getName() == "xing" ||_node._node.getName() == "right"){
                        moveX = outNode.getPosition().x - outNodeChilden[0].width*outNodeCount*outNode.getScale();
                    }else if(_node._node.getName() == "left"){
                        moveX = outNode.getPosition().x + outNodeChilden[0].width*outNodeCount*outNode.getScale();
                    }
                }else {
                    if(_node._node.getName() == "down" || _node._node.getName() == "right"){
                        moveX = outNode.getPosition().x - outNodeChilden[0].width*outNodeCount*outNode.getScale();
                    }else if(_node._node.getName() == "left"){
                        moveX = outNode.getPosition().x + outNodeChilden[0].width*outNodeCount*outNode.getScale();
                    }
                }
            }



            var targetPos = cc.p(moveX, outNode.getPosition().y);
            putNode.runAction(cc.sequence(
                cc.spawn(cc.moveTo(0.2, targetPos), cc.scaleTo(0.2, putNode.getUserData().scale*0.3)),
                cc.callFunc(function () {
                    this.removeAllChildren();
                    this.visible = false;
                }.bind(putNode))
            ));
        }
        else
        {
            putNode.removeAllChildren();
            putNode.visible = false;
        }
	}
}

//发手牌时再清理一遍
function clearMJHandCardUI_paohuzi() {
    // var handNode = MjClient.playui._downNode.getChildByName("handNode");
    // handNode.removeAllChildren();
    var eatNode = MjClient.playui._downNode.getChildByName("eatNode");
    eatNode.removeAllChildren();
    var outNode = MjClient.playui._downNode.getChildByName("outNode");
    outNode.removeAllChildren();
    var eatNodeR = MjClient.playui._rightNode.getChildByName("eatNode");
    eatNodeR.removeAllChildren();
    var outNodeR = MjClient.playui._rightNode.getChildByName("outNode");
    outNodeR.removeAllChildren();
    var eatNodeL = MjClient.playui._topNode.getChildByName("eatNode");
    eatNodeL.removeAllChildren();
    var outNodeL = MjClient.playui._topNode.getChildByName("outNode");
    outNodeL.removeAllChildren();
    if((MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO || MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z) && MjClient.MaxPlayerNum_paohuzi == 4){
        var eatNodeX = MjClient.playui._xingNode.getChildByName("eatNode");
        eatNodeX.removeAllChildren();
        var outNodeX = MjClient.playui._xingNode.getChildByName("outNode");
        outNodeX.removeAllChildren();
	}
    RemovePutCardOut_paohuzi(true);
}

//出牌表示状态
function ShowPutCardIcon(){
	if (MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ) {
        ShowPutCardIcon_new();
        return;
    }

	var finger = MjClient.playui.jsBind.finger._node;
	var cutLine = MjClient.playui.jsBind.cutLine._node;
	if(MjClient.hasPut){
		cutLine.visible = false;
		finger.visible = false;
	}else{
		var tData = MjClient.data.sData.tData;
		var status = true;
		if(!IsTurnToMe() || tData.tState != TableState.waitPut){
	        status = false;
	    }else{
	        status = true;
	        var pl = getUIPlayer_paohuzi(0);
	        if(pl.isQiHu){
	        	status = false;
	        }
	    }
		finger.stopAllActions();
		finger.visible = status;
		var action1 = cc.fadeTo(0.5,0);
		var action2 = cc.fadeTo(0.5,255);
		var seq = cc.sequence(action1,action2);
		finger.runAction(cc.repeatForever(seq));

		cutLine.visible = status;
		// if(MjClient.movingCard_paohuzi){
		// 	cutLine.visible = status;
		// }
	}
}

//出牌表示状态
function ShowPutCardIcon_new(){
	var finger = MjClient.playui.jsBind.finger._node;
	var cutLine = MjClient.playui.jsBind.cutLine._node;
	if(MjClient.hasPut){
		cutLine.visible = false;
		finger.visible = false;
	}else{
		var tData = MjClient.data.sData.tData;
		var status = true;
		if(!IsTurnToMe() || tData.tState != TableState.waitPut){
	        status = false;
	    }else{
	        status = true;
	        var pl = getUIPlayer_paohuzi(0);
	        if(pl.isQiHu){
	        	status = false;
	        }
	    }

		finger.visible = status;
		cutLine.visible = status;
        finger.loadTexture("playing/fingerEffer/finger.png");

		if(!finger.getChildByName("animSprite")){
            var animSprite = new cc.Sprite("playing/fingerEffer/finger0.png");
            animSprite.x = 120;
            animSprite.y = 120;
            finger.addChild(animSprite);
            animSprite.setName("animSprite");
            var action = createAnimation("playing/fingerEffer/finger",13,cc.rect(0, 0,166,195),0.07);
            animSprite.runAction(cc.sequence([action]).repeatForever());
        }
	}
}

//清除手牌
function RemoveHandCard_paohuzi(node,card,off){
	if(MjClient.rePlayVideo == -1 && off != 0){
		return;
	}
	var cardArr = MjClient.HandCardArr;
	if(off != 0 && MjClient.rePlayVideo != -1){
		cardArr = MjClient.OtherHandArr[off];
	}
	cc.log("++++++++off:" + off +"-------cardArr:" + JSON.stringify(cardArr));
    for(var i = 0;i < cardArr.length;i++){
		var groupList = cardArr[i];
		var isRemove = false;
		for(var k = 0;k < groupList.length;k++){
			if(groupList[k] == card){
				isRemove = true;
				groupList.splice(k,1);
				if(groupList.length == 0){
					//fix 千千
                    // cardArr.splice(i,1);
				}
				break;
			}
		}
		if(isRemove){
			break;
		}
	}
}


// 初始化吃碰杠胡动作
function InitShowEatActionNode_paohuzi(plNode){
	var play_tips = plNode.getChildByName("play_tips");
	for(var i = 0; i < play_tips.children.length; i++){
		play_tips.children[i].visible = false;
	}
}

// 重置吃碰杠胡动作
function resetEatActionAnim_paohuzi()
{
	var jsBind = MjClient.playui.jsBind;
	var ui = [jsBind.down,jsBind.right,jsBind.left];
	var tData = MjClient.data.sData.tData;
	if((MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO || MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z) && tData.maxPlayer == 4){
		ui = [jsBind.down, jsBind.xing,jsBind.right, jsBind.left];
	}
	var count = MjClient.MaxPlayerNum_paohuzi;
	if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King){
		count = 3;
	}
	for(var i = 0; i < count && ui[i]; i++)
	{
		InitShowEatActionNode_paohuzi(ui[i]._node);
	}
}

//播放头像移动
function tableStartHeadMoveAction_paohuzi(node){
	// var down = node.getChildByName("down").getChildByName("head");
	// var left = node.getChildByName("left").getChildByName("head");
	// var right = node.getChildByName("right").getChildByName("head");
	// setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 2.8], false, false);
	// setWgtLayout(left, [0.13, 0.13], [0, 0.5], [0.6, 1.8], false, false);
	// setWgtLayout(right, [0.13, 0.13], [1, 0.5], [-0.6, 2.4], false, false);

	// var downPoint = cc.p(down.x, down.y);
	// var rightPoint = cc.p(right.x, right.y);
	// var leftPoint = cc.p(left.x, left.y);

	// setWgtLayout(down, [0.13, 0.13], [0.5, 0.5], [0, -2], false, false);
	// setWgtLayout(left, [0.13, 0.13], [0.5, 0.5], [-3, 0.1], false, false);
	// setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [3, 0.1], false, false);
 //    down.runAction(cc.moveTo(0.3, downPoint).easing(cc.easeCubicActionOut()));
 //    left.runAction(cc.moveTo(0.3, leftPoint).easing(cc.easeCubicActionOut()));
 //    right.runAction(cc.moveTo(0.3, rightPoint).easing(cc.easeCubicActionOut()));

	sendGPS();
}

//重置3家头像位置
function reConectHeadLayout_paohuzi(node){
	var tData = MjClient.data.sData.tData;
	var down = node.getChildByName("down").getChildByName("head");
	var left = node.getChildByName("left").getChildByName("head");
	var right = node.getChildByName("right").getChildByName("head");
	var xing = node.getChildByName("xing").getChildByName("head");

	resetEatActionAnim_paohuzi();
	setWgtLayout(down, [0.12, 0.12], [0.06, 0.15], [0, 0], false, false);
	setWgtLayout(left, [0.12, 0.12], [0.06, 0.87], [0, 0], false, false);
	setWgtLayout(right,[0.12, 0.12], [0.94, 0.88], [0, 0], false, false);
	setWgtLayout(xing,[0.12, 0.12], [0.94, 0.15], [0, 0], false, false);
	// if(tData.tState == TableState.waitJoin || tData.tState == TableState.roundFinish)
	// {
	// 	setWgtLayout(down, [0.13, 0.13], [0.5, 0.5], [0, -2], false, false);
	// 	setWgtLayout(left, [0.13, 0.13], [0.5, 0.5], [-4.8, 0.1], false, false);
	// 	setWgtLayout(right, [0.13, 0.13], [0.5, 0.5], [4.8, 0.1], false, false);
	// }
	// else
	// {
	// 	setWgtLayout(down, [0.13, 0.13], [0, 0], [0.6, 2.8], false, false);
	// 	setWgtLayout(left, [0.13, 0.13], [0, 0.5], [0.6, 1.8], false, false);
	// 	setWgtLayout(right, [0.13, 0.13], [1, 0.5], [-0.6, 2.4], false, false);
	// }
}

//根据偏移获得玩家node
function getNode_paohuzi(off){
    var _node = null;
    if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King){
    	var tData = MjClient.data.sData.tData;
    	var selfIndex = tData.uids.indexOf(SelfUid());
    	if(selfIndex == tData.xingPlayer){
    		// off = (tData.zhuang + 2 + off + MjClient.MaxPlayerNum_paohuzi) % MjClient.MaxPlayerNum_paohuzi;
    		if(off == MjClient.MaxPlayerNum_paohuzi - 1){
    			//如果是最后一个玩家，则偏移需要移动一个，换算成3人
    			off -= 1;
    		}
    	}else{
			if((selfIndex + 1 + MjClient.MaxPlayerNum_paohuzi)%MjClient.MaxPlayerNum_paohuzi == tData.xingPlayer && off != 0){
				//如果下家是醒家，则另外两家的偏移都要往前移动一位
				off -= 1;
			}
			if(off == MjClient.MaxPlayerNum_paohuzi - 1){
				off -= 1;
			}
    	}
    }
    switch (off){
        case 0:
            _node = MjClient.playui._downNode;
            break;
        case 1:
            _node = MjClient.playui._rightNode;
            break;
        case 2:
            _node = MjClient.playui._topNode;
            break;
        default:
            break;
    }
    if(MjClient.MaxPlayerNum_paohuzi == 4 && (MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO || MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z)){
        switch (off){
            case 0:
                _node = MjClient.playui._downNode;
                break;
            case 1:
                _node = MjClient.playui._xingNode;
                break;
            case 2:
                _node = MjClient.playui._rightNode;
                break;
            case 3:
                _node = MjClient.playui._topNode;
                break;
            default:
                break;
        }
	}
    return _node;
}

/**
 * 通过相对于 我 的偏移量 获取 pl对象 (偏移量：uids的差)  (我的位置down:0)
 * @param  {number} off 相对于我的偏移量
 * @return {object} 玩家数据
 */
function getUIPlayer_paohuzi(off){
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var uids = tData.uids;
	var selfIndex = uids.indexOf(SelfUid());
	selfIndex = (selfIndex + off) % MjClient.MaxPlayerNum_paohuzi;
	if(selfIndex < uids.length){
		return sData.players[uids[selfIndex]];
	}

	return null;
}

// 获取ui头像，通过偏移值
function getUIHeadByOff_paohuzi(off){
	var pl = getUIPlayer_paohuzi(off);
	if(!pl)
	{
		return {};
	}

	return {
		uid: pl.info.uid,
		url: pl.info.headimgurl
	};
}

/**
 * 下载录音, 调用 播放函数
 * */
function downAndPlayVoice_paohuzi(uid, filePath){
	var index = getUiOffByUid_paohuzi(uid);
	//console.log("index is downAndPlayVoice" + index);
	MjClient.native.DownLoadFile(jsb.fileUtils.getWritablePath(), index + ".mp3", MjClient.remoteCfg.voiceUrl + filePath, "playVoice");
}

function getUiOffByUid_paohuzi(uid){
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var uids = tData.uids;
	var selfIndex = uids.indexOf(SelfUid());
	var targetIndex = uids.indexOf(uid);
	return (targetIndex - selfIndex + MjClient.MaxPlayerNum_paohuzi) % MjClient.MaxPlayerNum_paohuzi;
}

//设置微信头像
function setWxHead_paohuzi(node, d, off){
	if(d.uid == getUIHeadByOff_paohuzi(off).uid){
		var nobody = node.getChildByName("nobody");
		var wxHead = nobody.getChildByName("WxHead");
		if(wxHead)
			wxHead.removeFromParent();

		var sp = new cc.Sprite(d.img);
		sp.setName("WxHead");
		nobody.addChild(sp);
		setWgtLayout(sp, [0.91, 0.91], [0.5, 0.5], [0, 0], false, true);
		COMMON_UI.addNobleHeadFrame(nobody,getUIPlayer_paohuzi(off))
	}
}

//显示玩家庄的ui
function showUserZhuangLogo_paohuzi(node, off){
	var tData = MjClient.data.sData.tData;
	var pl = getUIPlayer_paohuzi(off);
	node.zIndex = 100;
	if(tData && pl){
		if(tData.uids[tData.zhuang] == pl.info.uid){
			node.visible = true;
			var linkZhuang = node.getChildByName("linkZhuang");
			linkZhuang.visible = false;
			// var path = "playing/gameTable/shuzi/shuzi_" + pl.linkZhuang + ".png";
			//cc.log("path = " + path);
			// linkZhuang.loadTexture(path);
			// var isVisible = (tData.gameType == MjClient.GAME_TYPE.SHEN_YANG);
			// linkZhuang.setVisible(isVisible);
		}else{
			node.visible = false;
		}
	}
}

//显示房主  add by sking
function showFangzhuTagIcon_paohuzi(node,off)
{
    var pl = getUIPlayer_paohuzi(off);
    if(!pl) //位置上没人则删掉房主标签
    {
        if(node.getChildByName("fangTag"))
        {
            node.removeChildByName("fangTag");
        }
        if(node.getChildByName("playerDirection"))
        {
            node.removeChildByName("playerDirection");
        }
        return;
    }

    var tData = MjClient.data.sData.tData;
    if (tData.owner == pl.info.uid)
    {
        // if(!node.getChildByName("fangTag"))
        // {
        //     var sp = new cc.Sprite("playing/gameTable/fangzhu.png");
        //     sp.setPosition(node.getContentSize().width - 7,17);
        //     sp.setAnchorPoint(1,0);
        //     sp.setName("fangTag");
        //     node.addChild(sp);
        // }
        node.removeChildByName("fangTag");
    }
    else
    {
        if(node.getChildByName("fangTag"))
        {
            node.removeChildByName("fangTag");
        }
    }


	// 显示东南西北
    var directionGameType = [];
	directionGameType.push(MjClient.GAME_TYPE.LUO_DI_SAO);
	directionGameType.push(MjClient.GAME_TYPE.JIANG_YONG_15Z);
	directionGameType.push(MjClient.GAME_TYPE.PAO_HU_ZI_SR);
	directionGameType.push(MjClient.GAME_TYPE.PAO_HU_ZI);
	directionGameType.push(MjClient.GAME_TYPE.PAO_HU_ZI_ER);
	directionGameType.push(MjClient.GAME_TYPE.PAO_HU_ZI_King);
	directionGameType.push(MjClient.GAME_TYPE.PAO_HU_ZI_SR_King);
	
  //   if( directionGameType.indexOf(MjClient.gameType) >= 0 ){
		// var uidIndex = tData.uids.indexOf(pl.info.uid);
		// var font = ['dong', 'nan', 'xi', 'bei'];
		// var sp = cc.Sprite("playing/gameTable/youxizhong_zuo_" + font[uidIndex] + ".png");
		// sp.setName('playerDirection')
		// sp.x = -10;
		// if(node.getChildByName('playerDirection'))	node.getChildByName('playerDirection').removeFromParent();
		// node.addChild(sp);
		// cc.log('directionGameType ok ok ok ');

  //   }

  //改成文字
    if(directionGameType.indexOf(MjClient.gameType) >= 0){
        var uidIndex = tData.uids.indexOf(pl.info.uid);
        var font = ['东', '南', '西', '北'];
        var sp = new cc.LabelTTF( font[uidIndex],"fonts/fzcy.ttf",25);
        sp.setName('playerDirection');
        cc.log("node.getName():" + node.getName());
        if(node.parent.getName() == "down" || node.parent.getName() == "left"){
	        sp.x = -9;
	        sp.y = 42;
        }else{
	        sp.x = 135;
	        sp.y = 42;
        }
        if(node.getChildByName('playerDirection'))  node.getChildByName('playerDirection').removeFromParent();
        node.addChild(sp);
        cc.log('directionGameType ok ok ok ');
    }

}

// 清理ui
function clearCardUI_paohuzi(node,off){
	mylog("clearCardUI_paohuzi");
	var children = node.children;
	for(var i = 0; i < children.length; i++)
	{
		var ni = children[i];
		if(ni.getName() != "head"
			&& ni.getName() != "handNode"
			&& ni.getName() != "eatNode"
			&& ni.getName() != "outNode"
			&& ni.getName() != "out0"
			&& ni.getName() != "handCard"
			&& ni.getName() != "replayNode"
			&& ni.getName() != "put"
			&& ni.getName() != "ready"
			&& ni.getName() != "play_tips"
			&& ni.getName() != "tai_layout"
            && ni.getName() != "tingCardsNode"
            && ni.getName() != "tingCardNumNode"
            && ni.getName() != "fangTag"
            && ni.getName() != "xingPai"
        )
		{
			ni.removeFromParent(true);
		}
		else if(ni.getName() == "play_tips")
		{
			InitShowEatActionNode_paohuzi(ni.getParent());
		}
	}
}

function EatFlag_paohuzi(){
	var eat = MjClient.playui.jsBind.eat;
	var eatFlag = 0;

	if(eat.hu._node.visible)
	{
		eatFlag = eatFlag + 32;
	}

	if(eat.chi &&　eat.chi._node.visible)
	{
		eatFlag = eatFlag + 1;
	}

	if(eat.peng._node.visible)
	{
		eatFlag = eatFlag + 2;
	}

	mylog("eatFlag" + eatFlag);
	return eatFlag;
}

function huXiScore_paohuzi(type,card)
{
	var cardType = Math.ceil(card/10);
	var score = 0;
	switch(type)
	{
		case "tiPai":
			if(cardType == 1){
				score += 9;
			}else if(cardType == 3){
				score += 12;
			}
			break;
		case "weiPai":
			if(cardType == 1){
				score += 3;
			}else if(cardType == 3){
				score += 6;
			}
			break;
		case "paoPai":
			if(cardType == 1){
				score += 6;
			}else if(cardType == 3){
				score += 9;
			}
			break;
		case "peng":
			if(cardType == 1){
				score += 1;
			}else if(cardType == 3){
				score += 3;
			}
			break;
		case "kan":
			if(cardType == 1){
				score += 3;
			}else if(cardType == 3){
				score += 6;
			}
			break;
		case "chi":
			if(cardType == 1){
				score += 3;
			}else if(cardType == 3){
				score += 6;
			}
			break;		
	}
	return score;
}

//刷新胡息
function UpdateHuXi_paohuzi(off){
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var score = 0;
	var pl = getUIPlayer_paohuzi(off);
	if(!pl){
		return;
	}
	//跑牌
	var mjpao = pl.mjgang0;
	if(mjpao.length>0){
		for(var p=0;p<mjpao.length;p++){
			score += huXiScore_paohuzi("paoPai",mjpao[p]);
		}	
	}

	//碰
	var mjpeng = pl.mjpeng;
	if(mjpeng.length>0){
		for(var i=0;i<mjpeng.length;i++){
			score += huXiScore_paohuzi("peng",mjpeng[i]);
		}
	}

	//吃
	var mjchi = pl.mjchi;
	if(mjchi.length>0){
		var chiScore = function(cards){
			cards = [].concat(cards);
			cards.sort(function(a, b) {return a - b}); // 耒阳调整了eatCards顺序
			var chiXiArr = [[1,2,3],[21,22,23],[2,7,10],[22,27,30]];
			for(var k=0;k<chiXiArr.length;k++){
				var chiXiList = chiXiArr[k];
				if(cards.toString() == chiXiList.toString()){
					score += huXiScore_paohuzi("chi",cards[0]);
				}
			}
		};

		for(var i=0;i<mjchi.length;i++){
			var eatCards = mjchi[i].eatCards;
			var biCards = mjchi[i].biCards;
			chiScore(eatCards);
			if(biCards){
				for(var m = 0;m<biCards.length;m++){
					chiScore(biCards[m]);
				}
			}
		}		
	}
	
	if(pl.info.uid == SelfUid()){
		//提牌
		var mjti = pl.mjgang1;
		if(mjti.length>0){
			for(var t=0;t<mjti.length;t++){
				score += huXiScore_paohuzi("tiPai",mjti[t]);
			}	
		}	
		//偎牌
		var mjwei = pl.mjwei;
		if(mjwei.length>0){
			for(var w=0;w<mjwei.length;w++){
				score += huXiScore_paohuzi("weiPai",mjwei[w]);
			}	
		}
	}
	var selfIndex = tData.uids.indexOf(SelfUid());
	if(tData.xingPlayer == selfIndex){
		pl = getUIPlayer_paohuzi(2);
		//提牌
		var mjti = pl.mjgang1;
		if(mjti.length>0){
			for(var t=0;t<mjti.length;t++){
				score += huXiScore_paohuzi("tiPai",mjti[t]);
			}	
		}	
		//偎牌
		var mjwei = pl.mjwei;
		if(mjwei.length>0){
			for(var w=0;w<mjwei.length;w++){
				score += huXiScore_paohuzi("weiPai",mjwei[w]);
			}	
		}
	}

	return score;
}

//设置转盘显示状态
function IsArrowVisible_paohuzi(){
    var pl = getUIPlayer_paohuzi(0);
    if (!pl)
    {
        return;
    }

    if(
        TableState.waitPut == pl.mjState ||
        TableState.waitEat == pl.mjState ||
        TableState.waitCard == pl.mjState ||
        TableState.roundFinish == pl.mjState ||
        TableState.waitJiazhu == pl.mjState
    )
    {
        return true;
    }else{
        return false;
    }
}

// 显示吃碰杠胡动作
function ShowEatActionAnim_paohuzi(node, actType, off){
	var delayTime = 1;
    switch(actType)
    {
        case ActionType_paohuzi.FANXING || ActionType_paohuzi.GENXING:
            delayTime = 1.6;
        	break;
		default:
			break;
    }
	var eatActionNode = node.getChildByName("play_tips");
	if(!eatActionNode){
		return;
	}
	var eatActionChild;
	var callback = function (){
		eatActionChild.visible = false;
	};
	eatActionNode.visible = true;
	switch(actType)
	{
		case ActionType_paohuzi.CHI:

			eatActionChild = eatActionNode.getChildByName("chi");
			eatActionChild.visible = true;
			eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
			break;

		case ActionType_paohuzi.PENG:

			eatActionChild = eatActionNode.getChildByName("peng");
			eatActionChild.visible = true;
			eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
			break;

		case ActionType_paohuzi.WEI:
			eatActionChild = eatActionNode.getChildByName("wei");
			eatActionChild.visible = true;
			eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
			break;

		case ActionType_paohuzi.HU:
			eatActionChild = eatActionNode.getChildByName("hu");
			eatActionChild.removeAllChildren();
			eatActionChild.visible = true;
            var projNode = createSpine("spine/zipaiHu/skeleton.json", "spine/zipaiHu/skeleton.atlas");
            projNode.setAnimation(0, 'animation', false);
            projNode.setPosition(50,50);
            projNode.setScale(0.5);
            projNode.setTimeScale(0.75);
            eatActionChild.addChild(projNode,999999);
			break;
		case ActionType_paohuzi.PAO:
			eatActionChild = eatActionNode.getChildByName("pao");
			eatActionChild.visible = true;
			eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
			break;
		case ActionType_paohuzi.TI:
			
			eatActionChild = eatActionNode.getChildByName("ti");
			eatActionChild.visible = true;
			eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
			break;
		case ActionType_paohuzi.WANGDIAO:
			eatActionChild = eatActionNode.getChildByName("wangDiao");
			eatActionChild.removeAllChildren();
			eatActionChild.visible = true;
            var projNode = createSpine("spine/wangdiao/skeleton.json", "spine/wangdiao/skeleton.atlas");
            projNode.setAnimation(0, 'animation', false);
            projNode.setPosition(50,50);
            projNode.setScale(0.5);
            projNode.setTimeScale(1.5);
            var animationListener = function(skeletonNode, trackEntry, eventType, event, loopCount){
            	if(eventType == sp.ANIMATION_EVENT_TYPE.COMPLETE){
	            	eatActionNode.getChildByName("wangDiao").visible = false;
            	}
            };
            projNode.setAnimationListener(projNode,animationListener);
            eatActionChild.addChild(projNode,999999);			
			break;
		case ActionType_paohuzi.WANGCHUANG:
			eatActionChild = eatActionNode.getChildByName("wangChuang");
			eatActionChild.removeAllChildren();
			eatActionChild.visible = true;
            var projNode = createSpine("spine/wangchuang/skeleton.json", "spine/wangchuang/skeleton.atlas");
            projNode.setAnimation(0, 'animation', false);
            projNode.setPosition(50,50);
            projNode.setScale(0.5);
            projNode.setTimeScale(1.5);
            var animationListener = function(skeletonNode, trackEntry, eventType, event, loopCount){
            	if(eventType == sp.ANIMATION_EVENT_TYPE.COMPLETE){
	            	eatActionNode.getChildByName("wangChuang").visible = false;
            	}
            };
            projNode.setAnimationListener(projNode,animationListener);
            eatActionChild.addChild(projNode,999999);
			break;
		case ActionType_paohuzi.WANGZHA:
			eatActionChild = eatActionNode.getChildByName("wangZha");
			eatActionChild.removeAllChildren();
			eatActionChild.visible = true;
            var projNode = createSpine("spine/wangzha/skeleton.json", "spine/wangzha/skeleton.atlas");
            projNode.setAnimation(0, 'animation', false);
            projNode.setPosition(50,50);
            projNode.setScale(0.5);
            projNode.setTimeScale(1.5);
            var animationListener = function(skeletonNode, trackEntry, eventType, event, loopCount){
            	if(eventType == sp.ANIMATION_EVENT_TYPE.COMPLETE){
	            	eatActionNode.getChildByName("wangZha").visible = false;
            	}
            };
            projNode.setAnimationListener(projNode,animationListener);
            eatActionChild.addChild(projNode,999999);
			break;
		case ActionType_paohuzi.XIAHUO:
			eatActionChild = eatActionNode.getChildByName("xiahuo");
			eatActionChild.visible = true;
			eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
			break;
        case ActionType_paohuzi.FANXING:
            eatActionChild = eatActionNode.getChildByName("fanxing");
            eatActionChild.visible = true;
            eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
            break;
        case ActionType_paohuzi.GENXING:
            eatActionChild = eatActionNode.getChildByName("genxing");
            eatActionChild.visible = true;
            eatActionChild.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(callback)));
            break;
	}
}

//显示玩家信息
function showPlayerInfo_paohuzi(off, node){
	//var tData = MjClient.data.sData.tData;
	var pl = getUIPlayer_paohuzi(off);
	if(pl){
        if (pl.info.uid == SelfUid()){
            MjClient.showPlayerInfo(pl.info, false, true);
        }else{
            MjClient.showPlayerInfoPlaying(pl.info);
        }
	}
}

//展示吃的牌
var initSize = null;				//吃牌背景的初始大小

function resetChiParam_paohuzi(){

}

function setChiVisible_paohuzi(){
	var eat = MjClient.playui.jsBind.eat;
    eat.chi._node.visible = false;
    eat.peng._node.visible = false;
    eat.hu._node.visible = false;
    eat.guo._node.visible = false;
    eat.cancel._node.visible = false;
    eat.wangDiao._node.visible = false;
    eat.wangChuang._node.visible = false;
    eat.wangZha._node.visible = false;
    eat.chiSelect._node.visible = false;
    eat.biSelect._node.visible = false;
    eat.biSelect1._node.visible = false;

	eat.chi._node.setTouchEnabled(false);
	eat.peng._node.setTouchEnabled(false);
	eat.hu._node.setTouchEnabled(false);
	eat.guo._node.setTouchEnabled(false);
	eat.cancel._node.setTouchEnabled(false);
	eat.wangDiao._node.setTouchEnabled(false);
	eat.wangChuang._node.setTouchEnabled(false);
	eat.wangZha._node.setTouchEnabled(false);
	eat.chiSelect._node.setTouchEnabled(false);
	eat.biSelect._node.setTouchEnabled(false);
	eat.biSelect1._node.setTouchEnabled(false);
}

function showSelectEatCards_paohuzi(node,cardNum){
	var eat = MjClient.playui.jsBind.eat;
    eat.chi._node.visible = false;
    eat.guo._node.visible = false;
    eat.peng._node.visible = false;
    eat.hu._node.visible = false;
    eat.cancel._node.visible = true;

	eat.chi._node.setTouchEnabled(false);
	eat.guo._node.setTouchEnabled(false);
	eat.peng._node.setTouchEnabled(false);
	eat.hu._node.setTouchEnabled(false);
	eat.cancel._node.setTouchEnabled(true);
	eat.cancel._node.setBright(true);

	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var putCard = tData.lastPutCard;
	cc.log("显示吃牌：" + putCard);
	var pl = sData.players[SelfUid()];
	var chiSet = MjClient.majiang.getChiCards(pl.mjhand,putCard);
	if(chiSet.length <= 0){
		eat.cancel._node.visible = false;
		eat.cancel._node.setTouchEnabled(false);
		return;
	}

	var parent = node.getParent();
	var chiBg = parent.getChildByName("chiSelect");
	if(!initSize){
		//保存chiBg的初始大小
		initSize = chiBg.getContentSize();
	}
	var cardArr = pl.mjhand.slice();
	addEatCards_paohuzi(parent,cardArr,putCard);
}

//添加可以吃的牌
function addEatCards_paohuzi(node,handCardArr,putCard){
	var chiBg = node.getChildByName("chiSelect");
	chiBg.x = cc.winSize.width * 0.5;
	chiBg.visible = true;

	var children = chiBg.children;
	for(var i = 0; i < children.length; i++){
		if(children[i].getName() == "cloneBtn"){
			children[i].removeFromParent(true);
		}
	}

	var off_x = 20,off_y = 20;
	var selectBtn = chiBg.getChildByName("selectBtn");
	var startPos = selectBtn.getPosition();

	var chiSet = MjClient.majiang.getChiCards(handCardArr,putCard);
	var off_width = (initSize.width-selectBtn.width)/2;
	chiBg.setContentSize(cc.size(selectBtn.width * chiSet.length + (chiSet.length-1) * off_x + off_width*2,initSize.height));

	for(var i = 0;i < chiSet.length;i++){
		var chiCloneBtn = selectBtn.clone();
		chiCloneBtn.visible = true;
		chiCloneBtn.setName("cloneBtn");

		var cardList = chiSet[i];
		for(var k = 0;k < cardList.length;k++){
			var card = cardList[k];
			var cardNode = chiCloneBtn.getChildByName("card_" + k);
			cardNode.visible = true;
			cardNode.loadTexture(MjClient.cardPath_paohuzi+"out" + card + ".png");
			cardNode.zIndex = cardList.length - k;
		}
		chiCloneBtn.setPosition(cc.p(startPos.x + (chiCloneBtn.width + off_x) * i , startPos.y));
		chiBg.addChild(chiCloneBtn);
		chiCloneBtn.setUserData(cardList);

		chiCloneBtn.addClickEventListener(function(chiBtn){
			if(MjClient.playui.jsBind.eat.biSelect._node.visible){
				MjClient.playui.jsBind.eat.biSelect.hasShow = true;
			}else{
				MjClient.playui.jsBind.eat.biSelect.hasShow = false;
			}
			MjClient.playui.jsBind.eat.biSelect._node.visible = false;
			MjClient.playui.jsBind.eat.biSelect1._node.visible = false;
			MjClient.playui.jsBind.eat.biSelect._node.setTouchEnabled(false);
			MjClient.playui.jsBind.eat.biSelect1._node.setTouchEnabled(false);

			var btnList = chiBg.children;
			for(var m = 0;m < btnList.length;m++){
				btnList[m].setBright(true);
			}
			chiBtn.setBright(false);
			var chiArr = chiBtn.getUserData();
			var tmpHandCardArr = handCardArr.slice();
			var ttArr = chiArr.slice();
			ttArr.splice(ttArr.indexOf(putCard),1);
			for(var i = 0;i < ttArr.length;i++){
				tmpHandCardArr.splice(tmpHandCardArr.indexOf(ttArr[i]),1);
			}
			if(tmpHandCardArr.indexOf(putCard) < 0){
				setChiVisible_paohuzi();
				HZChiToServer_paohuzi(chiArr,null);
			}else{
				var biSet = MjClient.majiang.getBiCards(tmpHandCardArr,putCard);
				if(biSet && biSet.length > 0){
					addFirstBiCards_paohuzi(node,biSet,putCard,tmpHandCardArr,chiArr);
				}
			}
		});
	}
}

//添加第一个比牌
function addFirstBiCards_paohuzi(node,biSet,putCard,handCardArr,chiArr){
	var biBg = node.getChildByName("biSelect");
	biBg.x = cc.winSize.width * 0.5;
	biBg.visible = true;
	biBg.setTouchEnabled(true);

	var children = biBg.children;
	for(var i = 0; i < children.length; i++){
		if(children[i].getName() == "cloneBtn"){
			children[i].removeFromParent(true);
		}
	}
	var off_x = 20,off_y = 20;
	var selectBtn = biBg.getChildByName("selectBtn");
	var startPos = selectBtn.getPosition();

	var off_width = (initSize.width-selectBtn.width)/2;
	biBg.setContentSize(cc.size(selectBtn.width * biSet.length + (biSet.length-1) * off_x + off_width*2,initSize.height));

	for(var i = 0;i < biSet.length;i++){
		var cardList = biSet[i];
		var cloneBtn = selectBtn.clone();
		cloneBtn.visible = true;
		cloneBtn.setName("cloneBtn");
		cloneBtn.setUserData(cardList);

		for(var k = 0;k < cardList.length;k++){
			var card = cardList[k];
			var cardNode = cloneBtn.getChildByName("card_" + k);
			cardNode.visible = true;
			cardNode.loadTexture(MjClient.cardPath_paohuzi+"out" + card + ".png");
			cardNode.zIndex = cardList.length - k;
		}
		cloneBtn.setPosition(cc.p(startPos.x + (cloneBtn.width + off_x) * i , startPos.y));
		biBg.addChild(cloneBtn);

		cloneBtn.addClickEventListener(function(btn){
			if(MjClient.playui.jsBind.eat.biSelect1._node.visible){
				MjClient.playui.jsBind.eat.biSelect1.hasShow = true;
			}else{
				MjClient.playui.jsBind.eat.biSelect1.hasShow = false;
			}
			MjClient.playui.jsBind.eat.biSelect1._node.visible = false;
			MjClient.playui.jsBind.eat.biSelect1._node.setTouchEnabled(false);
			var btnList = biBg.children;
			for(var m = 0;m < btnList.length;m++){
				btnList[m].setBright(true);
			}
			btn.setBright(false);
			var tmpHandCardArr = handCardArr.slice();
			var biArr = btn.getUserData();
			for(var i = 0;i < biArr.length;i++){
				tmpHandCardArr.splice(tmpHandCardArr.indexOf(biArr[i]),1);
			}

			if(tmpHandCardArr.indexOf(putCard) >= 0){
				var biSet = MjClient.majiang.getBiCards(tmpHandCardArr,putCard);
				if(biSet && biSet.length > 0){
					addSecBiCards_paohuzi(node,biSet,putCard,tmpHandCardArr,chiArr,biArr);
				}
			}else{
				setChiVisible_paohuzi();
				HZChiToServer_paohuzi(chiArr,[biArr]);
			}
		});
	}

	var isScale = true;
	if(MjClient.playui.jsBind.eat.biSelect.hasShow){
		isScale = false;
	}
	var chiBg = node.getChildByName("chiSelect");
	biBg.scale = chiBg.scale;
	doMoveCenterAction([chiBg,biBg],isScale);
	
}

//添加第二个比牌
function addSecBiCards_paohuzi(node,biSet,putCard,handCardArr,chiArr,firstBiArr){
	var biBg = node.getChildByName("biSelect1");
	biBg.x = cc.winSize.width * 0.5;
	biBg.visible = true;
	biBg.setTouchEnabled(true);

	var children = biBg.children;
	for(var i = 0; i < children.length; i++){
		if(children[i].getName() == "cloneBtn"){
			children[i].removeFromParent(true);
		}
	}
	var off_x = 20,off_y = 20;
	var selectBtn = biBg.getChildByName("selectBtn");
	var startPos = selectBtn.getPosition();

	var off_width = (initSize.width-selectBtn.width)/2;
	biBg.setContentSize(cc.size(selectBtn.width * biSet.length + (biSet.length-1) * off_x + off_width*2,initSize.height));

	for(var i = 0;i < biSet.length;i++){
		var cardList = biSet[i];
		var cloneBtn = selectBtn.clone();
		cloneBtn.visible = true;
		cloneBtn.setName("cloneBtn");
		cloneBtn.setUserData(cardList);
		
		for(var k = 0;k < cardList.length;k++){
			var card = cardList[k];
			var cardNode = cloneBtn.getChildByName("card_" + k);
			cardNode.visible = true;
			cardNode.loadTexture(MjClient.cardPath_paohuzi+"out" + card + ".png");
			cardNode.zIndex = cardList.length - k;
		}
		cloneBtn.setPosition(cc.p(startPos.x + (cloneBtn.width + off_x) * i , startPos.y));
		biBg.addChild(cloneBtn);

		cloneBtn.addClickEventListener(function(btn){
			var biArr = btn.getUserData();
			var btnList = biBg.children;
			for(var m = 0;m < btnList.length;m++){
				btnList[m].setBright(true);
			}
			btn.setBright(false);
			setChiVisible_paohuzi();
			HZChiToServer_paohuzi(chiArr,[firstBiArr,biArr]);
		});
	}

	var isScale = true;
	if(MjClient.playui.jsBind.eat.biSelect1.hasShow){
		isScale = false;
	}
	var chiBg = node.getChildByName("chiSelect");
	var biBg0 = node.getChildByName("biSelect");
	biBg.scale = chiBg.scale;
	biBg0.scale = chiBg.scale;
	doMoveCenterAction([chiBg,biBg0,biBg],isScale);
}

function GetReadyVisible_paohuzi(node, off) {
	if (off < 0) {
		node.visible = false;
		return false;
	}

	var sData = MjClient.data.sData;
	var tData = sData.tData;
	if (Object.keys(sData.players).length < tData.maxPlayer) {
		node.visible = false;
		return false;
	}

	var pl = getUIPlayer_paohuzi(off);
	if (pl && pl.mjState == TableState.isReady && tData.tState != TableState.waitJoin && tData.tState != TableState.waitShuffle) {
		node.visible = true;
	} else {
		node.visible = false;
	}

	return node.visible;
}

//设置玩家掉线头像
function setUserOffline_paohuzi(node, off){
	var pl = getUIPlayer_paohuzi(off);
	if(!pl){
		return;
	}

	// 离线自己不可见
    if (off == 0) {
        node.getChildByName("head").getChildByName("offlineBg").visible = false;
        node.getChildByName("head").getChildByName("offline").visible = false;
        return;
    }

	node.getChildByName("head").getChildByName("offlineBg").visible = !pl.onLine;
 //    node.getChildByName("head").getChildByName("offline").y = 80;
	// node.getChildByName("head").getChildByName("offline").zIndex = 99;
	node.getChildByName("head").getChildByName("offline").visible = !pl.onLine;
}

//显示玩家文字
function showUserChat_paohuzi(node, off, msg){
	var tData = MjClient.data.sData.tData;
	if(msg.type == 4 && off == 0 && tData.roundNum==tData.roundAll && tData.maxPlayer > 2){ //位置截取
		var geogData = [];
		for (var i = 0; i < tData.uids.length; i++) {
			var pl = MjClient.data.sData.players[tData.uids[i]];
			if (pl && pl.locationMsg) {
				geogData.push(pl.locationMsg);
			}
		}

		if (geogData.length == tData.maxPlayer && tData.maxPlayer > 2)
		{
			var displayCount = 0;
			for(var i=0; i<geogData.length; i++)
			{
				for(var j=i+1; j<geogData.length; j++)
				{
					var plyoneV = new Array();
					var plytwoV = new Array();
					plyoneV = geogData[i].split(";");
					plytwoV = geogData[j].split(";");

                    var plone = getUIPlayerByUID(plyoneV[3]);
                    var _oneLatitude = plone.info.location.latitude;
                    var _oneLongitude = plone.info.location.longitude;
                    if(!_oneLatitude)  _oneLatitude = plyoneV[0];
                    if(!_oneLongitude)  _oneLongitude =  plyoneV[1];

                    var pltwo = getUIPlayerByUID(plytwoV[3]);
                    var _twoLatitude = pltwo.info.location.latitude;
                    var _twoLongitude = pltwo.info.location.longitude;
                    if(!_twoLatitude) _twoLatitude = plytwoV[0];
                    if(!_twoLongitude) _twoLongitude =  plytwoV[1];

                    var distance = MjClient.native.CalculateLineDistance(_oneLatitude, _oneLongitude, _twoLatitude, _twoLongitude);
					if( distance < 50 && distance >=0 )
					{
						displayCount++;
						break;
					}
				}

				if (displayCount>0)
				{
					break;
				}
			}

			//add by sking 当有人距离小于500米 时候提示
			// if(displayCount >= 1 && !tData.matchId)
			// {
			// 	if (tData.maxPlayer == 3)
			// 		MjClient.Scene.addChild(new showDistance3PlayerLayer());
			// 	else
			// 		MjClient.Scene.addChild(new showDistanceLayer());
			// }
		}

		return;
	}

	var pl = getUIPlayer_paohuzi(off);
	//var uid = msg.uid;
	var type = msg.type;
	var message = msg.msg;
	var num = msg.num;

	if(pl && msg.uid == pl.info.uid)
	{
		if(type == 0)
		{
			node.getParent().visible = true;
			node.setString(message);
			var callback = function()
			{
				node.getParent().visible = false;
			};

			node.getParent().width = node.stringLength * node.fontSize + 72;
			node.runAction(cc.sequence(cc.delayTime(2.5), cc.callFunc(callback)));
		}
		else if(type == 1)
		{
			node.getParent().visible = true;
			node.setString(message.text);
			var callback = function()
			{
				node.getParent().visible = false;
			};

			var musicnum = msg.num + 1;

			//var one = node.getCustomSize().width / 20.0;
			node.getParent().width = node.stringLength * node.fontSize + 72;
            var voiceType = /*message.voiceType == 0 ? "normal" :*/ MjClient.gameType;
			playEffect(GameSound4Chat[voiceType][getRandomRange(0,GameSound4Chat[voiceType].length-1)] + musicnum, false, pl.info.sex);
			node.runAction(cc.sequence(cc.delayTime(2.5), cc.callFunc(callback)));
		}
		else if(type == 2)
		{
			var em_node = node.getParent().getParent().getChildByName("emoji");
			PlayEmojiAct(em_node, msg.num);
		}
		else if(type == 3)//播放录音
		{
			playRecord(node, num, message);
		}
		else if (type == 5) // 转运道具
		{
			var em_node = node.getParent().getParent().getChildByName("emoji");
			playZhuanYunPropAct(em_node, msg.num);
		}
	}
}

/**
 * 当前玩家是不是自己
 * @param  {number} off 和‘我’在uids的下标的差
 * @return {bool} true:轮到我操作  false:不是我在操作
 */	
function curPlayerIsMe_paohuzi(off){
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	if(tData.tState == TableState.waitReady){
		return false;
	}
	var selfIndex = tData.uids.indexOf(SelfUid());
	selfIndex = (selfIndex + off)%MjClient.MaxPlayerNum_paohuzi;
	return selfIndex == tData.curPlayer;
}

function getVisablePlayerCount_paohuzi(){
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var uids = tData.uids;
	var count = 0;
	for(var i = 0;i < uids.length;i++){
		if(uids[i] != 0){
			count ++;
		}
	}
	return count;
}

/**
 * 获取醒家相对我的位置偏移 (醒家和我的距离) uids下标的差
 * @return {number} [description]
 */
function getXingPlayerIndex_paohuzi(){
	if(MjClient.MaxPlayerNum_paohuzi != 4){
		return -1;
	}
	if(getVisablePlayerCount_paohuzi() < 3){
		return -1;
	}
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var zhuang = tData.zhuang;
	if(zhuang == -1){
		zhuang = 0;
	}
	var xingIndex = (zhuang + 2 + MjClient.MaxPlayerNum_paohuzi) % MjClient.MaxPlayerNum_paohuzi;
	var selfIndex = tData.uids.indexOf(SelfUid());
	xingIndex = (xingIndex - selfIndex + MjClient.MaxPlayerNum_paohuzi) % MjClient.MaxPlayerNum_paohuzi;
	return xingIndex;
}

/**
 * 获取 我和off的距离（我和off在uids的下标的差） (如果醒家,醒家传过来的off固定是2)
 * @param  {number} off 在ui层上的位置 (down=0 right=1 left/top=3 xing=2)
 * @return {number} 返回偏移后的resoff  则 selfIndex 和 off位置的玩家 的距离, 
 *                  提供 getUIPlayer_paohuzi(resoff) 获取 off位置玩家数据
 */
function getOffByXing_paohuzi(off){
	var resOff = off
	if(MjClient.MaxPlayerNum_paohuzi != 4){
		return resOff;
	}
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var zhuang = tData.zhuang;
	//当庄还没确定的时候
	if(zhuang == -1){
		zhuang = 0;
	}
	var xingIndex = (zhuang + 2 + MjClient.MaxPlayerNum_paohuzi) % MjClient.MaxPlayerNum_paohuzi;
	//开局之后的判断
	var selfIndex = tData.uids.indexOf(SelfUid());
	if(selfIndex == xingIndex){ // xing为off固定为2， 参数off
		resOff = (2 + off) % MjClient.MaxPlayerNum_paohuzi;
	}else{
		// 如果我的下家是醒家，且是ui层传过来的是位置是1 则跳过
		if((selfIndex + 1 + MjClient.MaxPlayerNum_paohuzi) % MjClient.MaxPlayerNum_paohuzi == xingIndex && off == 1){
			resOff = off + 1;

		// 如果我的上家是醒家，且是ui层传过来的是位置是3 则跳过
		}else if((selfIndex -1 + MjClient.MaxPlayerNum_paohuzi) % MjClient.MaxPlayerNum_paohuzi == xingIndex 
				&& off == MjClient.MaxPlayerNum_paohuzi - 1){
			resOff = off - 1;

		// 如果我的上家是醒家, 且 传过来的是位置是2 , (发表情时发的是2）
		}else if( off==2 ){
			if((selfIndex + 1 + MjClient.MaxPlayerNum_paohuzi) % MjClient.MaxPlayerNum_paohuzi == xingIndex ){
				resOff = 1;
			}
			if((selfIndex - 1 + MjClient.MaxPlayerNum_paohuzi) % MjClient.MaxPlayerNum_paohuzi == xingIndex ){
				resOff = 3;
			}
		}
	}
	return resOff;
}

//重新开始后，重置MjClient.HandCardArr
function resetHandAfterBegin_paohuzi(){
	var sData = MjClient.data.sData;
	var pl = sData.players[SelfUid() + ""];
	if(pl.mjState == TableState.isReady){
		MjClient.HandCardArr = [];
	}
}


/*
 设置弃胡状态
 */
function setQiHuState_paohuzi()
{
    var pl = getUIPlayer_paohuzi(0);
    if (pl.isQiHu) {
        var _skipHuIconNode = MjClient.playui._downNode.getChildByName("head").getChildByName("skipHuIconTag");
        _skipHuIconNode.visible = true;
    }
}


function changeMJBg_paohuzi(node, type)
{
    if (node.toString() == "[object ImageView]") {
        var oldFile = node.getRenderFile().file;
        var newFile = getNewMJBgFile_paohuzi(oldFile, type);

        if (newFile != oldFile) {
            node.loadTexture(newFile);
        }
    }

    var childArray = node.getChildren();
    for(var index in childArray)
    {
        var child = childArray[index];
        changeMJBg_paohuzi(child, type);
    }
}

function getNewMJBgFile_paohuzi(oldFile, type)
{
    if (oldFile.indexOf("playing/paohuzi/") == -1)
        return oldFile;

    if (type == undefined)
        type = getCurrentMJBgType();

    var newFile = "";
    if (type == 0) {
        if (oldFile.indexOf("playing/paohuzi/MJBg1/") != -1){
            newFile = oldFile.replace("/MJBg1", "");
            MjClient.cardPath_paohuzi = "playing/paohuzi/";
		}
    }
    else if (type == 1) {
        if (oldFile.indexOf("/MJBg1") != -1)
            ;
        else if (oldFile.indexOf("playing/paohuzi/") != -1) {
            newFile = oldFile.replace("playing/paohuzi/", "playing/paohuzi/MJBg1/");
            MjClient.cardPath_paohuzi = "playing/paohuzi/MJBg1/";
        }
    }

    cc.log("newFile=" + newFile);
    if (newFile != "" && !jsb.fileUtils.isFileExist(newFile)) {
        cc.log("getNewMJBgFile file not exsit : " + newFile);
        newFile = "";
    }
    cc.log("oldFile=" + oldFile + "\r\nnewFile" + newFile);

    return newFile != "" ? newFile : oldFile;
}

//fix by 千千 吃碰落牌效果
function refreshNode_paohuzi(posNode,off,needAction){
	var handNode = posNode.getChildByName("handNode");
	if(!handNode){
		//容错 正常情况不会
		return;
	}

	MjClient.isRefreshNodeing = true;	//正在刷新手牌，用于在此期间禁止拖动

	cc.log("执行动画前手牌 refreshNode_paohuzi=====:" , MjClient.HandCardArr);

	//刷新之前清除掉拖动数据
	if(MjClient.touchCell && cc.sys.isObjectValid(MjClient.touchCell)){

		if(MjClient.copyCell && cc.sys.isObjectValid(MjClient.copyCell)){
			MjClient.touchCell.x = MjClient.copyCell.x;
			MjClient.touchCell.y = MjClient.copyCell.y;

			MjClient.copyCell.removeFromParent();
		}
		MjClient.copyCell = null;
		MjClient.touchCell = null;
	}

    handNode.visible = true;
    // handNode.removeAllChildren();
    var cardArr = MjClient.HandCardArr;
    var oldLen = cardArr.length;
    var deleIndexArr = [];
    //清理空数组
    for(var k = cardArr.length - 1;k >=0;k--){
        if(cardArr[k].length == 0){
            cardArr.splice(k,1);
            deleIndexArr.push(k);
        }
    }

    _checkIsAddGroup_paohuzi();

    var index = 0;
    for(var k = 0;k < oldLen;k++){
        var groupList = cardArr[index];

        if(_hasValueInArr_paohuzi(deleIndexArr, k)){
            continue;
        }

        _checkGroupList_paohuzi(groupList,k);
        for(var j = 0;j < groupList.length;j++){

            refreshHandCard_paohuzi(k,j,groupList[j],off);
        }
        index += 1;
    }

    var handCard = posNode.getChildByName("handCard");
    var scale_x = handCard.scaleX;
    var winSize = MjClient.size;
    var totalWidth = handCard.width * cardArr.length * scale_x;
    var index = 0;
    for(var i = 0; i < oldLen; i++){
        var addNode = handNode.getChildByTag(i);
        if(addNode && _hasValueInArr_paohuzi(deleIndexArr, addNode.tag)){
            addNode.removeFromParent();
            addNode = null;
            continue;
        }
        if(addNode){

            addNode.tag = index;
            if(addNode.x == 0){
                addNode.x = (winSize.width - totalWidth)/2 + index * handCard.width * scale_x;
            }
            doMovetoAction(addNode, cc.p((winSize.width - totalWidth)/2 + index * handCard.width * scale_x,0));
            index += 1;
        }
    }

    //为了修复理牌时，最后一列没清除的问题
    var count = handNode.childrenCount;
    if(count > cardArr.length){
        for(var i = cardArr.length; i < count; i++){
            var child = handNode.getChildByTag(i);
            if(child){
                child.removeFromParent();
                child = null;
            }
        }
    }

    cc.log("执行动画后手牌 refreshNode_paohuzi=====:" , MjClient.HandCardArr);


    if (MjClient.isRefreshNodeingTimeID) {
      clearTimeout(MjClient.isRefreshNodeingTimeID);
      MjClient.isRefreshNodeingTimeID = null;
    }
    
    MjClient.isRefreshNodeingTimeID = setTimeout(function(){
    	MjClient.isRefreshNodeing = false;

    	//备用---粗暴的方法：解决多牌少牌变牌
    	// MjClient.HandCardArr[0][0] = 23;
    	// MjClient.HandCardArr[0][0] = 23;
    	// var result = checkMjhand_HandCards(MjClient.HandCardArr);
    	// if(!result.isSame){
    	// 	_fixHandCards_paohuzi(result);
    	// 	MjClient.HandCardArr = MjClient.majiang.sortByUser();
    	// }
    }, 200);		
}

function _checkIsAddGroup_paohuzi(){
    var cardArr = MjClient.HandCardArr;
    var _node = getNode_paohuzi(0);
    //根据牌的类型获得需要添加的节点
    var addNode = _node.getChildByName("handNode");
    if(!addNode){
        return;
    }

    var childNum = addNode.childrenCount;
    //有新增
    if(MjClient.addGroupIndex == 0){
        //添加在前面
        for(var i = 0; i < childNum; i++){
            var cardParent = addNode.getChildByTag(i);
            if(cardParent){
                cardParent.tag += 1; 
            }
        }

    }else if(MjClient.addGroupIndex == cardArr.length){
        //添加在后面

    }
}

function _hasValueInArr_paohuzi(arr,value){
    var len = arr.length;
    for(var i = 0; i < len; i++){
        var temp = arr[i];
        if(temp == value){
            return true;
        }
    }
    return false;
}

//检测并删除一列里多余的牌
function _checkGroupList_paohuzi(groupList,tagName){
    var _node = getNode_paohuzi(0);
    //根据牌的类型获得需要添加的节点
    var addNode = _node.getChildByName("handNode");
    if(!addNode){
        return;
    }

    var cardParent = addNode.getChildByTag(tagName);
    // if(cardParent)cardParent.removeAllChildren();
    // return;


    if(cardParent){
        var len = groupList.length;
        if(cardParent.childrenCount >= 4 && cardParent.childrenCount >= groupList.length){
        	cardParent.removeAllChildren();
        	return;
        }

        for(var i = 0; i < len; i++){
            var mjName = groupList[i];
            var card = cardParent.getChildByName(i);
            if(card && card.tag != mjName){
                card.removeFromParent(true);
                card = null;
            }else{

            }
        }
        for(var j = len; j < 4; j++){
            var card = cardParent.getChildByName(j);
            if(card && 
                (!_hasValueInArr_paohuzi(groupList,card.tag) || 
                    hasSameChild_paohuzi(cardParent) ))// || cardParent.childrenCount > groupList.length))
            {
                card.removeFromParent();
            }
        }

        //当拖动时，一列中有相同的两张牌时 不会删牌的问题
        if(cardParent.childrenCount > groupList.length){
            for(var j = len; j < 4; j++){

                if(cardParent.childrenCount <= groupList.length){
                    break;
                }

                var card = cardParent.getChildByName(j);
                if(card && 
                    (!_hasValueInArr_paohuzi(groupList,card.tag) || 
                        hasSameChild_paohuzi(cardParent) || cardParent.childrenCount > groupList.length))
                {
                    card.removeFromParent();
                }
            }
        }

    }
}

function delPutCard_paohuzi(){
	for(var i = 0; i < 4; i++){
		var node = getNode_paohuzi(i);
		if(node){
			var put = node.getChildByName("put");
			if (!put) {
				put = node.getChildByName("img_putCard");//新版
			}
			
			if (put) {
				put.visible = false;
			}
		}
	}
}


//判断是否是跑胡
function isPaoHu_paohuzi(playerData, currCard){
	var mjgang = playerData.mjgang0;
	var flg = _hasValueInArr_paohuzi(mjgang, currCard);
	if(flg){
		return true;
	}
	// mjgang = playerData.mjgang1;
	// flg = _hasValueInArr_paohuzi(mjgang, currCard);
	if(flg){
		return true;
	}

	return false;
}

//隐藏IP中间两位
function hideIP_paohuzi(ip){
	if(MjClient.APP_TYPE.QXLYQP == MjClient.getAppType()){
		return ip;
	}
	
	if(ip && ip.length > 6){
		var arr = ip.split(".");
		arr.splice(1,2,"*","*");
		var str = arr.join(".");
		return str;
	}
	return "";
}

function _fixHandCards_paohuzi(result){
	if(!result.isSame){
		var handCards = MjClient.HandCardArr;

		function delValueInArr(arr, v){
			if(arr && arr.length > 0){
				var len = arr.length;
				for(var i = 0; i < len; i++){
					if(v == arr[i]){
						arr.splice(i,1);
						return true;
					}
				}
			}
			return false;
		}

		function changeValueInArr(arr, obj){
			if(arr && arr.length > 0){
				var len = arr.length;
				for(var i = 0; i < len; i++){
					if(obj[arr[i]]){
						arr[i] = obj[arr[i]];
						return true;
					}
				}
			}
			return false;
		}

		//处理多牌
		var arr = result.reList;
		var len = arr.length;
		if(len > 0){
			for(var i = 0; i < len; i++){
				var card = arr[i];
				for(var j = 0; j < handCards.length; j++){
					if(delValueInArr(handCards[j], card)){
						break;
					}
				}
			}
		}

		//处理少牌
		var arr = result.lackList;
		var len = arr.length;
		if(len > 0){
			for(var i = 0; i < len; i++){
				var card = arr[i];
				var hasAdd = false;
				for(var j = 0; j < handCards.length; j++){
					var cardList = handCards[j];
					if(cardList.length < 3){
						cardList.push(card);
						hasAdd = true;
						break;
					}
				}
				if(!hasAdd){
					handCards.pus([card]);
				}
			}
		}

		//处理变牌
		var arr = result.changeObj;
		var len = arr.length;
		if(len > 0){
			for(var i = 0; i < len; i++){
				var obj = arr[i];
				for(var j = 0; j < handCards.length; j++){
					if(changeValueInArr(handCards[j], obj)){
						break;
					}
				}
			}
		}
	}
}

//比较本地数据和服务端同步的数据，如果有差异返回差异的牌
//@return Array
function checkMjhand_HandCards(tempArr){
	var result = {};
	result.isSame = true; //是否一样
	result.reList = [];	//多牌
	result.lackList = [];	//少牌
	result.changeObj = [];	//变牌 对象数组 Obj[现在的牌] = 原来的牌

	if(!tempArr){
		return result;
	}

	var uid = MjClient.data.pinfo.uid;
	var player = MjClient.data.sData.players[uid];
	if (player && player.mjhand) {
		var mjhand = player.mjhand.concat();;
		var handCards = [];
		for(var i = 0; i < tempArr.length; i++){
			var arr = tempArr[i];
			handCards = handCards.concat(arr);
		}

		mjhand.sort();
		handCards.sort();
		if(mjhand.length != handCards.length){
			result.isSame = false;
			if(mjhand.length > handCards.length){
				//少牌
				result.lackList = _getReList(mjhand,handCards);
			}else{
				//多牌
				result.reList = _getReList(handCards, mjhand);
			}
		}else{
			var len = mjhand.length;
			for(var i = 0; i < len; i++){
				var srcV = mjhand[i];
				var nowV = handCards[i];
				if(srcV != nowV){
					var obj = {};
					obj[nowV] = srcV;
					result.changeObj.push(obj);
				}
			}
			if(result.changeObj.length > 0){
				//变牌
				result.isSame = false;
			}
		}		

		return result;
	}else{
		return result;
	}
}

function _getReList(big,  small){
	var big = big.concat();
	var small = small.concat();
	var len = small.length;
	var gap = big.length - len;

	for(var i = 0; i < len; i++){
		var v = small[i];
		for(var j = 0; j < big.length; j++){
			if(v == big[j]){
				big.splice(j,1);
				break;
			}
		}
	}

	if(big.length > gap){
		//说明有变牌现象,下一步会做变牌处理
		big.splice(0,(big.length - gap));
	}
	return big;
}

/*
    by sking 2018.1.29
    function : 复制信息,或者获取房间信息打开微信，复制信息
    @infoType :
        0  房间信息  <roundInfo>
        1  复制房间号 <getRoomNum>
        2  微信邀请   <wxinvite>
        3  小结算描述
        4  大结算描述
 */
getPlayingRoomInfo_paohuzi = function(infoType)
{
    var roomInfo = "";
    var tData = MjClient.data.sData.tData;
    var _MaxPlayerCount = parseInt(MjClient.data.sData.tData.maxPlayer);
    if(infoType == 0) //房间玩法信息
    {
        roomInfo = getPlaySelectPara(MjClient.gameType,tData.areaSelectMode,_MaxPlayerCount);
        roomInfo  = roomInfo.substring(0, roomInfo.lastIndexOf(',')); //去掉最后的逗号

        // 房卡房间的房间等级名称
        var fangkaRoomLevelName = FriendCard_Common.getFangkaRoomLevelName();
        if (fangkaRoomLevelName)
            roomInfo += "," + fangkaRoomLevelName + "房间";

        //比赛场
        var BSStr = "";
        if(tData.matchId){
            BSStr = ",10秒出牌";
            roomInfo += BSStr;
            roomInfo = GameCnName[MjClient.gameType]+","+roomInfo;
        }
    }
    else if(infoType == 1) //复制房间号
    {
        roomInfo = GameCnName[MjClient.gameType] + "," + getPlaySelectPara(MjClient.gameType,tData.areaSelectMode,_MaxPlayerCount);
        var _playerCount = Object.keys(MjClient.data.sData.players).length;
        var _needCount = _MaxPlayerCount - _playerCount;

        var str1 = tData.roundNum + "局";
        if(tData.areaSelectMode.isQuan)
        {
            str1 = parseInt(tData.roundNum/tData.areaSelectMode.maxPlayer) + "圈";
        }

        var str2 = "";
		if(_needCount == 1){
	        if(tData.maxPlayer == 4){
	        	str2 = ",三缺一";
	        }else if(tData.maxPlayer == 3){
	        	str2 = ",二缺一";
	        }else if(tData.maxPlayer == 2){
	        	str2 = ",一缺一";
	        }
		}else if(_needCount == 2){
	        if(tData.maxPlayer == 4){
	        	str2 = ",二缺二";
	        }else if(tData.maxPlayer == 3){
	        	str2 = ",一缺二";
	        }
		}else if(_needCount == 3){
	        if(tData.maxPlayer == 4){
	        	str2 = ",一缺三";
	        }			
		}        

        var str8 = str1 + str2 + ",速度加入【"+AppCnName[MjClient.getAppType()]+"】\n" + "(复制此消息打开游戏可直接进入该房间)";
        GLog(roomInfo + str8);
        MjClient.native.doCopyToPasteBoard("房间号:[" + tData.tableid + "]\n" + roomInfo + str8);
        MjClient.showMsg("已复制房间号，请不要返回大厅。打开微信后粘贴房间信息。", function(){
            MjClient.native.openWeixin();
        }, function(){});
    }
    else if(infoType == 2) //微信邀请
    {

        roomInfo = getPlaySelectPara(MjClient.gameType,tData.areaSelectMode,_MaxPlayerCount);

        //湘乡告胡子和娄底放炮罚显示不限局数
        if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI || 
        	MjClient.gameType == MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA ||
        	MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA ||
        	MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA)
        	var str1 ="";
        else{
	        var str1 = tData.roundNum + "局,";
	        if(tData.areaSelectMode.isQuan)
	        {
	            str1 = parseInt(tData.roundNum/tData.areaSelectMode.maxPlayer) + "圈,";
	        }
    	}	

        var _playerCount = Object.keys(MjClient.data.sData.players).length;
        var _needCount = _MaxPlayerCount - _playerCount;

        var str2 = "";
		if(_needCount == 1){
	        if(tData.maxPlayer == 4){
	        	str2 = "三缺一";
	        }else if(tData.maxPlayer == 3){
	        	str2 = "二缺一";
	        }else if(tData.maxPlayer == 2){
	        	str2 = "一缺一";
	        }
		}else if(_needCount == 2){
	        if(tData.maxPlayer == 4){
	        	str2 = "二缺二";
	        }else if(tData.maxPlayer == 3){
	        	str2 = "一缺二";
	        }
		}else if(_needCount == 3){
	        if(tData.maxPlayer == 4){
	        	str2 = "一缺三";
	        }			
		}

        var str7 = str1 + str2 + "," + "速度加入【"+AppCnName[MjClient.getAppType()]+"】";
        GLog(roomInfo + str7);

        var clubInfoTable = getClubInfoInTable();
        var txt_club = clubInfoTable ? "(亲友圈:" + clubInfoTable.clubId + "," + getPlayersName(MjClient.data.sData.players) +  ")" : 
                                "(" + getPlayersName(MjClient.data.sData.players) + ")";

        var _urlStr = MjClient.remoteCfg.entreRoomUrl+"?vipTable="+tData.tableid
        var _contentStr = roomInfo + str7;

        var _titleStr = GameCnName[MjClient.gameType] + "  " + tData.tableid + str2 +  " 点击加入>>>" + txt_club;
            
        cc.log("邀请信息:", _titleStr, _contentStr)
        MjClient.getInviteUrl(function (url) {
            MjClient.shareUrlToMultiPlatform(url, _titleStr, _contentStr);
        })
    }
    else if(infoType == 3) //小结算描述
    {
        roomInfo = GameCnName[MjClient.gameType] + "," + getPlaySelectPara(MjClient.gameType,tData.areaSelectMode,_MaxPlayerCount) + "房间号:" + tData.tableid;
        if(MjClient.isShenhe){
            roomInfo = "牌友联盟"+GameCnName[MjClient.gameType] + "," + getPlaySelectPara(MjClient.gameType,tData.areaSelectMode,_MaxPlayerCount) + "房间号:" + tData.tableid;
        }
        cc.log(" roomInfo 3 = " + roomInfo);
    }
    else if(infoType == 4) //大结算描述
    {
        // roomInfo = GameCnName[MjClient.gameType] + "," + getPlaySelectPara(MjClient.gameType,tData.areaSelectMode,_MaxPlayerCount) + "房间号:" + tData.tableid;
        // if(MjClient.isShenhe){
        //     roomInfo = "牌友联盟"+GameCnName[MjClient.gameType] + "," + getPlaySelectPara(MjClient.gameType,tData.areaSelectMode,_MaxPlayerCount) + "房间号:" + tData.tableid;
        // }
        // cc.log(" roomInfo 3 = " + roomInfo);
    }


    return roomInfo;
}

