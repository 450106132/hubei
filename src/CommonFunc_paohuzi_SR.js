
// MjClient.movingCard = null;
// MjClient.cloneCard = null;
// MjClient.putCard = null;
// var moveBeginPos = null;
// var movePos = null;
// function SetTouchCardHandler_paohuzi(card,off){
// 	var cardTag = card.tag;
// 	var pl = getUIPlayer_paohuzi(off);
// 	var mjhand = pl.mjhand;
// 	var cardArr = {};
// 	for(var i = 0;i< mjhand.length;i++){
// 		if(!cardArr[mjhand[i]]){
// 			cardArr[mjhand[i]] = 1;
// 		}else{
// 			cardArr[mjhand[i]] ++;
// 		}
// 	}
// 	if(cardArr[cardTag + ""] >= 3 && !MjClient.majiang.isEqualHunCard(cardTag)){
// 		return;
// 	}
// 	var _node = getNode_paohuzi(off);
// 	card.addTouchEventListener(function(btn,eventType){
// 		if(eventType == ccui.Widget.TOUCH_BEGAN){

// 			if(MjClient.movingCard != null){
// 				return false;
// 			}
// 			//
// 			var beginPos = btn.getPosition();
// 			var touchPos = btn.parent.convertToWorldSpace(beginPos);
// 			touchPos = cc.p(touchPos.x + (0.5 - btn.anchorX) * btn.width * btn.scaleX,
// 				touchPos.y + (0.5 - btn.anchorY) * btn.height * btn.scaleY);

// 			moveBeginPos = touchPos;
// 			MjClient.cloneCard = getNewCard_paohuzi(btn.tag,1,off);
// 			MjClient.cloneCard.setName(btn.getName());
// 			MjClient.cloneCard.anchorX = 0;
// 			MjClient.cloneCard.anchorY = 0;
// 			MjClient.cloneCard.zIndex = btn.zIndex;
// 			MjClient.cloneCard.x = btn.x;
// 			MjClient.cloneCard.y = btn.y;
// 			MjClient.cloneCard.opacity = 100;
// 			MjClient.cloneCard.tag = btn.tag;
// 			btn.parent.addChild(MjClient.cloneCard);

// 			MjClient.movingCard = btn;
// 			btn.removeFromParent();
// 			MjClient.movingCard.anchorX = 0.5;
// 			MjClient.movingCard.anchorY = 0.5;
// 			MjClient.movingCard.zIndex = 2000;
// 			MjClient.movingCard.x = touchPos.x;
// 			MjClient.movingCard.y = touchPos.y;
// 			_node.addChild(MjClient.movingCard);
// 			ShowPutCardIcon();
// 			return true;
// 		}
// 		if(eventType == ccui.Widget.TOUCH_MOVED){
// 			movePos = MjClient.movingCard.getTouchMovePosition();
// 			MjClient.movingCard.x = movePos.x;
// 			MjClient.movingCard.y = movePos.y;
// 		}
// 		if(eventType == ccui.Widget.TOUCH_ENDED){
// 			var endPos = MjClient.movingCard.getTouchEndPosition();
// 			var pl = getUIPlayer_paohuzi(0);
// 			var tData = MjClient.data.sData.tData;
// 			var isPut = false;
// 			var isWangBa = MjClient.majiang.isEqualHunCard(MjClient.cloneCard.tag);
// 			MjClient.movingCard.removeFromParent(true);
// 			MjClient.movingCard = null;

// 			if(!isWangBa && IsTurnToMe() && tData.tState == TableState.waitPut && pl.mjState == TableState.waitPut){
// 				var cutLine = MjClient.playui.jsBind.cutLine._node;
// 				if(!MjClient.isCommon && endPos.y >= cutLine.y){
// 					isPut = true;
// 					MjClient.isCommon = false;
// 					var parent = MjClient.cloneCard.parent;
// 					MjClient.HandCardArr[parent.tag].splice(Number(MjClient.cloneCard.name),1);
// 					HZPutCardToServer_paohuzi(MjClient.cloneCard.tag);
// 					MjClient.cloneCard.removeFromParent(true);
// 					MjClient.cloneCard = null;
// 					MjClient.playui.ResetHandCard(MjClient.playui._downNode,off);
// 				}
// 			}
// 			if(!isPut || isWangBa){
// 				var parent = MjClient.cloneCard.parent;
// 				var scale_x = MjClient.cloneCard.scaleX;
// 				var count = parent.parent.childrenCount;
// 				var totalWidth = parent.width * scale_x * count;
// 				var min_x = (MjClient.size.width - totalWidth)/2;
// 				var selectIndex = Math.ceil((endPos.x - min_x)/(parent.width * scale_x));
// 				var selectParentTag = selectIndex - 1;
// 				if(selectParentTag == parent.tag){
// 					//位置没有发生变化
// 					MjClient.cloneCard.opacity = 255;
// 				}else if(selectParentTag >= 0 && selectParentTag < count){
// 					//在手牌node的范围内
// 					var selectArr = MjClient.HandCardArr[selectParentTag];
// 					if(selectArr.length >= 3){
// 						MjClient.cloneCard.opacity = 255;
// 					}else{
// 						selectArr.push(MjClient.cloneCard.tag);
// 						MjClient.HandCardArr[parent.tag].splice(Number(MjClient.cloneCard.name),1);
// 					}
// 				}else{
// 					//最左边的牌的坐标不能小于头像的坐标
// 					var head = MjClient.playui._downNode.getChildByName("head");
// 					var head_max_x = head.x + (1 - head.anchorX) * head.width * head.scaleX;
// 					var handCard = MjClient.playui._downNode.getChildByName("handCard");
// 					var handNode = MjClient.playui._downNode.getChildByName("handNode");
// 					var children = handNode.children;
// 					var singleWidth = handCard.width * handCard.scaleX;
// 					var minX = (MjClient.size.width - (children.length+1) * singleWidth)/2;
// 					if(minX > head_max_x){
// 						MjClient.HandCardArr[parent.tag].splice(Number(MjClient.cloneCard.name),1);
// 						var arr = [];
// 						arr.push(MjClient.cloneCard.tag);
// 						if(selectParentTag < 0){
// 							MjClient.HandCardArr.splice(0,0,arr);
// 						}else if(selectParentTag >= count){
// 							MjClient.HandCardArr.push(arr);
// 						}
// 					}else{
// 						MjClient.cloneCard.opacity = 255;
// 					}
// 				}
// 				MjClient.cloneCard.removeFromParent(true);
// 				MjClient.cloneCard = null;
// 				MjClient.playui.ResetHandCard(MjClient.playui._downNode,off);
// 			}
// 			ShowPutCardIcon();
// 		}
// 		if(eventType == ccui.Widget.TOUCH_CANCELED){
// 			//判断有效移动距离
// 			MjClient.movingCard.setPosition(moveBeginPos);
// 			var dis_x = movePos.x - moveBeginPos.x;
// 			var dis_y = movePos.y - moveBeginPos.y;
// 			var distance = Math.sqrt(dis_x * dis_x + dis_y * dis_y);
// 			if(distance > 10 && dis_y > 0){
// 				var moveDis_x = (120*dis_x)/distance;
// 				var moveDis_y = (120*dis_y)/distance;
// 				var moveAction = cc.MoveBy(0.1,cc.p(moveDis_x,moveDis_y));
// 				var callback = function(){
// 					var endPos = cc.p(moveBeginPos.x + moveDis_x,moveBeginPos.y + moveDis_y);
// 					var isWangBa = MjClient.majiang.isEqualHunCard(MjClient.cloneCard.tag);
// 					var pl = getUIPlayer_paohuzi(0);
// 					var tData = MjClient.data.sData.tData;
// 					if(!isWangBa && IsTurnToMe() && tData.tState == TableState.waitPut && pl.mjState == TableState.waitPut){
// 						var cutLine = MjClient.playui.jsBind.cutLine._node;
// 						if(!MjClient.isCommon && endPos.y >= cutLine.y){
// 							MjClient.isCommon = false;
// 							var parent = MjClient.cloneCard.parent;
// 							MjClient.HandCardArr[parent.tag].splice(Number(MjClient.cloneCard.name),1);
// 							HZPutCardToServer_paohuzi(MjClient.cloneCard.tag);
// 							MjClient.movingCard.stopAllActions();
// 							MjClient.movingCard.removeFromParent(true);
// 							MjClient.movingCard = null;
// 							MjClient.cloneCard.removeFromParent(true);
// 							MjClient.cloneCard = null;
// 							MjClient.playui.ResetHandCard(MjClient.playui._downNode,off);
// 							ShowPutCardIcon();
// 						}
// 					}
// 				};
// 				var moveAction1 = cc.MoveBy(0.1,cc.p(-moveDis_x,-moveDis_y));
// 				var callback1 = function(){
// 					MjClient.movingCard.removeFromParent(true);
// 					MjClient.movingCard = null;
// 					ShowPutCardIcon();
// 					if(MjClient.cloneCard){
// 						MjClient.cloneCard.opacity = 255;
// 						MjClient.cloneCard = null;
// 					}
// 				};
// 				var seqAction = cc.sequence(moveAction,cc.callFunc(callback),moveAction1,cc.callFunc(callback1));
// 				MjClient.movingCard.runAction(seqAction);
// 			}else{
// 				MjClient.movingCard.removeFromParent(true);
// 				MjClient.movingCard = null;
// 				ShowPutCardIcon();
// 				if(MjClient.cloneCard){
// 					MjClient.cloneCard.opacity = 255;
// 					MjClient.cloneCard = null;
// 				}
// 			}
// 		}
// 	});
// }

function DealXingPlayerNewCard_paohuzi(node,msg,off){
	var sData = MjClient.data.sData;
	var tData = sData.tData;

	var selfIndex = tData.uids.indexOf(SelfUid());
	if(tData.xingPlayer == selfIndex && tData.curPlayer == tData.zhuang ){
		if(msg.newCard == 91){
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
			// 更新醒家视觉的 房主手牌
			MjClient.playui.ResetHandCard(MjClient.playui._downNode,0);
			// MjClient.playui.ResetHandCard(node,off);
		}
	}	
}

//处理醒家出牌
function DealXingPlayerPutCard_paohuzi(node,msg,off){
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var selfIndex = (tData.uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_paohuzi;
	if(tData.xingPlayer == selfIndex && tData.curPlayer == tData.zhuang){
		RemoveHandCard_paohuzi(node,msg.card,off);
	    MjClient.playui.ResetHandCard(node,off);
	} else if (tData.xingPlayer == selfIndex && MjClient.rePlayVideo != -1) {
		var isZhuangFirstPut = true;
		for (var uid in sData.players) {
			var pl = sData.players[uid];
			if (pl.mjgang0.length + pl.mjgang1.length + pl.mjwei.length + pl.mjpeng.length + pl.mjchi.length > 0) {
				isZhuangFirstPut = false;
				break;
			}
		}

		//回放而且是庄家打的第一张牌的时候特殊处理
		if (isZhuangFirstPut) {
			RemoveHandCard_paohuzi(node,msg.card,off);
		    MjClient.playui.ResetHandCard(node,off);	
		}
	}
}

//处理醒家出牌(邵阳剥皮坐醒)
function DealXingPlayerPutCard_shaoyang(node,msg,off){
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var selfIndex = (tData.uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_leiyang;
	if(tData.xingPlayer == selfIndex && tData.curPlayer == tData.zhuang){
		RemoveHandCard_hengYang(node,msg.card,off);
	    MjClient.playui.ResetHandCard(node,off);
	} else if (tData.xingPlayer == selfIndex && MjClient.rePlayVideo != -1) {
		var isZhuangFirstPut = true;
		for (var uid in sData.players) {
			var pl = sData.players[uid];
			if (pl.mjgang0.length + pl.mjgang1.length + pl.mjwei.length + pl.mjpeng.length + pl.mjchi.length > 0) {
				isZhuangFirstPut = false;
				break;
			}
		}

		//回放而且是庄家打的第一张牌的时候特殊处理
		if (isZhuangFirstPut) {
			RemoveHandCard_hengYang(node,msg.card,off);
		    MjClient.playui.ResetHandCard(node,off);	
		}
	}
}

//处理醒家吃牌
function DealXingPlayerChiCard_paohuzi(node,msg,off){
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var selfIndex = (tData.uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_paohuzi;
	if(tData.xingPlayer == selfIndex && tData.curPlayer == tData.zhuang){
		var mjchi = msg.mjchi;
		var mjchiCard = msg.mjchiCard;

		var eatAndBiCards = mjchi[mjchi.length-1];
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
		//MjClient.playui.CardLayoutRestore(node,off);
		MjClient.playui.ResetHandCard(node,off);
	}	
}

//处理醒家吃牌
function DealXingPlayerChiCard_shaoyang(node,msg,off){
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var selfIndex = (tData.uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_leiyang;
	if(tData.xingPlayer == selfIndex && tData.curPlayer == tData.zhuang){
		var mjchi = msg.mjchi;
		var mjchiCard = msg.mjchiCard;

		var eatAndBiCards = mjchi[mjchi.length-1];
		var chiCard = mjchiCard[mjchiCard.length-1];
		var eatCards = eatAndBiCards.eatCards;
		var tmpEatCards = eatCards.slice();
		tmpEatCards.splice(tmpEatCards.indexOf(chiCard),1);
		for(var i = 0;i < tmpEatCards.length;i++){
			RemoveHandCard_hengYang(node,tmpEatCards[i],off);
		}
		var biCards = eatAndBiCards.biCards;
		if(biCards){
			for(var k = 0;k < biCards.length;k++){
				var biArr = biCards[k];
				var tmpBiArr = biArr.slice();
				for(var m = 0;m<biArr.length;m++){
					if(tmpBiArr.indexOf(biArr[m]) >= 0){
						tmpBiArr.splice(tmpBiArr.indexOf(biArr[m]),1);
						RemoveHandCard_hengYang(node,biArr[m],off);
					}
				}
			}	
		}
		//MjClient.playui.CardLayoutRestore(node,off);
		MjClient.playui.ResetHandCard(node,off);
	}	
}

//处理醒家的碰牌
function DealXingPlayerPengCard_paohuzi(node,msg,off){
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var selfIndex = (tData.uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_paohuzi;
	if(tData.xingPlayer == selfIndex && tData.curPlayer == tData.zhuang){
		var pl = sData.players[tData.uids[tData.zhuang] + ""];
		var pengCard = pl.mjpeng[pl.mjpeng.length-1];
		RemoveHandCard_paohuzi(node,pengCard,off);
		RemoveHandCard_paohuzi(node,pengCard,off);
		//MjClient.playui.CardLayoutRestore(node,off);
		MjClient.playui.ResetHandCard(node,off);
	}	
}

//处理醒家的碰牌
function DealXingPlayerPengCard_shaoyang(node,msg,off){
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var selfIndex = (tData.uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_leiyang;
	if(tData.xingPlayer == selfIndex && tData.curPlayer == tData.zhuang){
		var pl = sData.players[tData.uids[tData.zhuang] + ""];
		var pengCard = pl.mjpeng[pl.mjpeng.length-1];
		RemoveHandCard_hengYang(node,pengCard,off);
		RemoveHandCard_hengYang(node,pengCard,off);
		//MjClient.playui.CardLayoutRestore(node,off);
		MjClient.playui.ResetHandCard(node,off);
	}	
}

//处理醒家的偎牌
function DealXingPlayerWeiCard_paohuzi(node,msg,off){
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var selfIndex = (tData.uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_paohuzi;
	if(tData.xingPlayer == selfIndex && tData.curPlayer == tData.zhuang){
		var weiCard = msg.newCard;
		RemoveHandCard_paohuzi(node,weiCard,off);
		RemoveHandCard_paohuzi(node,weiCard,off);
		//MjClient.playui.CardLayoutRestore(node,off);
		MjClient.playui.ResetHandCard(node,off);
	}	
}

//处理醒家的偎牌
function DealXingPlayerWeiCard_shaoyang(node,msg,off){
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var selfIndex = (tData.uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_leiyang;
	if(tData.xingPlayer == selfIndex && tData.curPlayer == tData.zhuang){
		var weiCard = msg.newCard;
		RemoveHandCard_hengYang(node,weiCard,off);
		RemoveHandCard_hengYang(node,weiCard,off);
		//MjClient.playui.CardLayoutRestore(node,off);
		MjClient.playui.ResetHandCard(node,off);
	}	
}

//处理醒家的跑牌或者提牌
function DealXingPlayerGangCard_paohuzi(node,msg,off){
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var selfIndex = (tData.uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_paohuzi;
	if(tData.xingPlayer == selfIndex && tData.curPlayer == tData.zhuang){
		var gangCard = msg.newCard;
		RemoveHandCard_paohuzi(node,gangCard,off);
		RemoveHandCard_paohuzi(node,gangCard,off);
		RemoveHandCard_paohuzi(node,gangCard,off);
        if (msg.isGangHand) {
            RemoveHandCard_leiyang(node, gangCard, off);
        }
		//MjClient.playui.CardLayoutRestore(node,off);
		MjClient.playui.ResetHandCard(node,off);
	}
}

//处理醒家的跑牌或者提牌
function DealXingPlayerGangCard_shaoyang(node,msg,off){
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var selfIndex = (tData.uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_leiyang;
	var cpginfo = msg.cpginfo;
	var cpgIndex = tData.uids.indexOf(cpginfo.uid);
	if(tData.xingPlayer == selfIndex && cpgIndex == tData.zhuang){
		var gangCard = msg.newCard;
		RemoveHandCard_hengYang(node,gangCard,off);
		RemoveHandCard_hengYang(node,gangCard,off);
		RemoveHandCard_hengYang(node,gangCard,off);
        if (msg.isGangHand) {
            RemoveHandCard_hengYang(node, gangCard, off);
        }
		//MjClient.playui.CardLayoutRestore(node,off);
		MjClient.playui.ResetHandCard(node,off);
	}
}

function DealXingPlayerPickCard_shaoyang(node,msg,off){
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var selfIndex = (tData.uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_leiyang;
	if(tData.xingPlayer == selfIndex && tData.curPlayer == tData.zhuang && msg.card && off == 0){
		var pl = sData.players[tData.uids[selfIndex]];
		pl.mjhand.push(msg.card);
		MjClient.HandCardArr = MjClient.majiang.sortHandCardSpecial(pl.mjhand);
		// 更新醒家视觉的 房主手牌
		MjClient.playui.ResetHandCard(node,off);
	}
}

function DealXingPlayerAddCard_shaoyang(node,msg,off){
	var sData = MjClient.data.sData;
	var tData = sData.tData;
	var selfIndex = (tData.uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_leiyang;
	if(tData.xingPlayer == selfIndex && tData.curPlayer == tData.zhuang && off == 0){
		var cardArr = MjClient.HandCardArr;
		cardArr.push(msg.cardList);
		// 更新醒家视觉的 房主手牌
		MjClient.playui.ResetHandCard(node,off);
	}
}

function DealNewCard_shaoyang(node, msg, off){
    //存在发牌
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var uids = tData.uids;
    var selfIndex = (uids.indexOf(SelfUid()) + off) % MjClient.MaxPlayerNum_leiyang;
    if(tData.xingPlayer == selfIndex && tData.curPlayer == tData.zhuang){
        var pl = sData.players[uids[selfIndex]];
        var putCard = getNewCard_hengYang(msg.newCard, 3, off);
        var putNode = node.getChildByName("put");
        putNode.setPosition(putNode.getUserData().pos);
        putNode.removeAllChildren();
        putCard.scaleX = putCard.width/putNode.width - 0.16;
        putCard.scaleY = putCard.width/putNode.width - 0.06;
        putCard.x = putCard.width/2;
        putCard.y = putCard.height/2;
        putNode.visible = true;
        putNode.addChild(putCard);

        //添加动作
        putNode.setScale(0);
        putNode.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2+160));
        var action1 = cc.scaleTo(0.25,putNode.getUserData().scale);
        var action2 = cc.moveTo(0.25,putNode.getUserData().pos);
        putNode.runAction(cc.spawn(action1,action2).easing(cc.easeCubicActionOut()));
        // putNode.runAction(cc.sequence(cc.delayTime(0.4), cc.spawn(action1,action2).easing(cc.easeCubicActionOut())));

        if(!msg.isCommon){
            if(MjClient.rePlayVideo == -1){
                MjClient.isCommon = true;
                //王霸牌需要收回
                var callback = function(){
                    RemovePutCardOut_hengYang();
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
                    ShowPutCardIcon_hengYang();
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
                    cc.callFunc(function(){RemovePutCardOut_hengYang();})
                ));
                for(var i = 0;i < cardArr.length;i++){
                    var tmpArr = cardArr[i];
                    if(tmpArr.length <= 2){
                        isAdd = true;
                        //addHandCard_hengYang(i,tmpArr.length.length + 1,msg.newCard,off);
                        tmpArr.push(msg.newCard);
                        break;
                    }
                }
                if(!isAdd){
                    cardArr.push([msg.newCard]);
                }
                MjClient.playui.CardLayoutRestore(node,off);

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

/*
 设置弃胡状态
 */
function setQiHuState_paohuzi_SR()
{
    var pl = getUIPlayer_paohuzi(getOffByXing_paohuzi(0));
    if (pl.isQiHu) {
        var _skipHuIconNode = MjClient.playui._downNode.getChildByName("head").getChildByName("skipHuIconTag");
        _skipHuIconNode.visible = true;
    }
}
