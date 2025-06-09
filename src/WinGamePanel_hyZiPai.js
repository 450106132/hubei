

function addWxHeadToEndUI_hyZiPai(node,off)
{
     var pl = getUIPlayer_leiyang(off);
    //var pl= getUIPlayer_changpai(off);
    cc.log(pl);
    if(!pl) return; 

     // 写个分数，写个名字
    var nameLabel = node.getChildByName("name");
    var _nameStr = unescape(pl.info.nickname ) + "";
	nameLabel.setString(getNewName (_nameStr)); 
	nameLabel.setFontName("Arial");
	nameLabel.setFontSize(nameLabel.getFontSize());

	var scoreLabel = node.getChildByName("score");

	scoreLabel.ignoreContentAdaptWithSize(true); 
	nameLabel.ignoreContentAdaptWithSize(true); 
	
	if(pl.winone >= 0){
		scoreLabel.setString((pl.winone > 0 ? "+":" ") +  pl.winone);
		// scoreLabel.setTextColor(cc.color(226,43,0));
	}else{
		scoreLabel.setString( pl.winone);
		// scoreLabel.setTextColor(cc.color(34,116,12));
		scoreLabel.setProperty(pl.winone, "ui/common/fufen.png", 40, 53, "+");
	}  
 
	var sData=MjClient.data.sData;
	var tData=sData.tData;
	
	var chuizi_tips = node.getChildByName("chuizi_tips"); 
	if(tData.areaSelectMode.isJiaChui){
		chuizi_tips.setVisible(true);
	    var fileName = pl.jiachuiNum == 1 ? "playing/other/jiachuizi.png" : "playing/other/buchui.png";
	    chuizi_tips.loadTexture(fileName); 
	}


    var img = "png/default_headpic.png";
    if(pl && pl.wxHeadImg)
    {
        img = pl.wxHeadImg;
    }
    else
    {
        return;
    }

    var sp = new cc.Sprite(img);
    node.addChild(sp);
    var frame = node.getChildByName("frame");
    if (frame){
        frame.zIndex = sp.zIndex + 1;
    }
    sp.setPosition(cc.p(frame.getPosition())); 
    // setWgtLayout(sp,[0.88,0.88],[0.5,0.5],[0,0],false,true);

    var headSc = (frame.getContentSize().height - 5) / sp.getContentSize().height;
    sp.setScale(headSc);
     
}

function huXiScore_hyZiPai(type,card)
{ 
    var cardType = Math.ceil(card/10);
    var score = 0;
    switch(type)
    {
        case "mjgang1": // 提
            if(cardType == 1){
                score += 9;
            }else if(cardType == 3){
                score += 12;
            }
            break;
        case "mjwei": // 偎
            if(cardType == 1){
                score += 3;
            }else if(cardType == 3){
                score += 6;
            }
            break;
        case "mjgang0": // 跑
            if(cardType == 1){
                score += 6;
            }else if(cardType == 3){
                score += 9;
            }
            break;
        case "mjpeng": // 碰
            if(cardType == 1){
                score += 1;
            }else if(cardType == 3){
                score += 3;
            }
            break; 
    }
    return score;
}

var EndOneView_hyZiPai = cc.Layer.extend({
    _block:null,
    _endoneuiNode:null, 
	jsBind:{
		block: {
		    _run:function () {
		    	this.setOpacity(255 * 0.85);
                MjClient.endoneui._block = this;
            },
			_layout:[[1,1],[0.5,0.5],[0,0],true]
		},
		btn_share: { 
			_layout:[[0.08, 0.08],[0.88, 0.95],[0, 0],true],
			_click:function(btn,eT){
				MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
				{
					 
				});
			}
			,_event:{
				captureScreen_OK:function(){
					// 分享成功
				}
			},
		}, 
		btn_ready:{
			_run: function(){
				setWgtLayout(this, [0.18, 0.18],[0.75, 0.06],[0, 0]); 
			},
			_click: function(btn,eT){
				postEvent("clearCardUI");
				postEvent("clearCardArr"); 
				MjClient.endoneui.gameMain = null; 
				MjClient.endoneui.removeFromParent(true);
				MjClient.endoneui = null; 
				var sData=MjClient.data.sData;
				var tData=sData.tData;
                if (MjClient.rePlayVideo >= 0 && MjClient.replayui) {
                    MjClient.replayui.replayEnd();
                }else {
                    MjClient.MJPass2NetForleiyang();
                }

                if (MjClient.endallui)
				{
                    MjClient.endallui.setVisible(true);
				} 
				reInitarrCardVisible_shaoYang();
			}
		},
		btn_logic: {
			_run: function(){
				setWgtLayout(this, [0.18, 0.18],[0.25, 0.06],[0, 0]);  
				// MjClient.endoneui.gameMain.visible(false);
				this.getParent().getChildByName("main").setVisible(false);
			},
			_click: function(btn,eT){ 
				// uiNode
				var uiNode = btn.getParent().getChildByName("uiNode");
				if(uiNode.isVisible()){ 
					btn.loadTextures("gameOver/newOver/btn_jieSuan_0.png","gameOver/newOver/btn_jieSuan_1.png");
					uiNode.setVisible(false);
					MjClient.endoneui._block.setVisible(false);
					MjClient.endoneui.gameMain.visible = true;
				}else{ 
					MjClient.endoneui.gameMain.visible = false;
					uiNode.setVisible(true);
					MjClient.endoneui._block.setVisible(true);
					btn.loadTextures("gameOver/newOver/btn_zhuoMian_0.png","gameOver/newOver/btn_zhuoMian_1.png");
					
				}
			} 
		},
		btn_again:{
			_run: function(){
				setWgtLayout(this, [0.18, 0.18],[0.75, 0.06],[0, 0]); 
				this.visible = false; 
				if (MjClient.data.sData.tData.fieldId){
            		this.visible = true;
                }
			},
			_click: function(btn,eT){ 
                if (MjClient.data.sData.tData.fieldId){
            		var gameType = MjClient.gameType;
            		var fieldId = MjClient.data.sData.tData.fieldId;
                    leaveGameClearUI();
                    // MjClient.Scene.addChild(new goldMatchingLayer({matching:false, gameType:gameType}));
                    MjClient.goldfieldEnter(fieldId, gameType);
                    return;
                }
			}
		},
		btn_return: {
			_run: function(){
				setWgtLayout(this, [0.18, 0.18],[0.25, 0.06],[0, 0]);
				this.visible = false; 
				if (MjClient.data.sData.tData.fieldId){
            		this.visible = true;
                }
			},
			_click: function(btn,eT){ 
				if (MjClient.data.sData.tData.fieldId){
                    leaveGameClearUI();
                    return;
                }
			} 
		},
		main:{
			_layout:[[0,1],[0.5,0.5],[0,0],true],
			_run:function(){
				MjClient.endoneui.gameMain = this;
				this.setTouchEnabled(true);
				// 跑胡非胡玩家处理 去掉展示牌(已经在胡家吃牌中) 
				var sData = MjClient.data.sData;
			    var tData = sData.tData;
				if (tData.winner != -1 && tData.uids[tData.winner] != SelfUid()) {
					var huPl = sData.players[tData.uids[tData.winner]];
					if (huPl.mjgang0.indexOf(tData.lastPutCard) >= 0) {
						delPutCard_paohuzi();
					}
				}
			},
			diPai:{
		   		title:{
		   			_visible:false
		   		},
		   		_run:function(){
		   			var sData = MjClient.data.sData;
		   			var tData = sData.cards;
		   			if(tData.winner == -1){
		   				return;
		   			}
		   			
		   			var cards = sData.cards;
		   			if(tData.cardNext < cards.length){
		   				var size = this.getContentSize();
		   				var cardObj = this.getChildByName("card");
		   				var totalWidth = cardObj.width * (cards.length - tData.cardNext);
		   				var width20Cards = cardObj.width * 20;
                        var startPos = cc.p((size.width - totalWidth)/2 + cardObj.width/2,size.height/2);
		   				if((cards.length - tData.cardNext) > 20){
                            startPos = cc.p((size.width - width20Cards)/2 + cardObj.width/2,size.height/2);
						}
		   				var nameImg = this.getChildByName("title");
		   				nameImg.visible = true;
		   				nameImg.setPosition(cc.p(startPos.x - nameImg.width/2,startPos.y));

		   				for(var i = tData.cardNext;i < cards.length;i++){
		   					var card = cards[i];
		   					var cloneCard = cardObj.clone();
		   					cloneCard.visible = true;
		   					cloneCard.loadTexture(MjClient.cardPath_hengYang+"out" + card +".png");
                            var cardPos = cc.p(0, 0);
		   					if(i < tData.cardNext + 20){
		   						cardPos = cc.p(startPos.x + cloneCard.width*(i - tData.cardNext), startPos.y);
							}else {
                                cardPos = cc.p(startPos.x + cloneCard.width*(i - tData.cardNext - 20), -startPos.y+15);
							}
		   					cloneCard.setPosition(cardPos);
		   					this.addChild(cloneCard);
		   				}
		   			}
		   		}
			},
			leftPanel:{
				_run:function(){
                    if ((MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA ||
                    	MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI || 
                    	MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || 
                    	MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA || 
                    	MjClient.gameType == MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI) &&  MjClient.data.sData.tData.maxPlayer == 2){
                        this.setVisible(false);
                    }else{
                        addWinMjHand_shaoYang(this, MjClient.MaxPlayerNum_leiyang - 1);
                    }
                    if(MjClient.rePlayVideo != -1){
                    	this.visible = false;
                    }
				}
			},
			rightPanel:{
				_run:function(){
                    if ((MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA ||
                    	MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI || 
                    	MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || 
                    	MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA || 
                    	MjClient.gameType == MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI) && MjClient.data.sData.tData.maxPlayer == 2){
                        addWinMjHand_shaoYang(this, 1);
                    }else{
                        addWinMjHand_shaoYang(this, MjClient.MaxPlayerNum_leiyang - 2);
                    }
                    if(MjClient.rePlayVideo != -1){
                    	this.visible = false;
                    }
				}
			},
			xingPanel:{
                _run:function(){
                    if(MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
                        var tData = MjClient.data.sData.tData;
                        if(tData.maxPlayer == 3 || tData.maxPlayer == 2){
                            this.setVisible(false);
                        }else{
                            addWinMjHand_shaoYang(this,1);
                        }
                    }
                    if(MjClient.rePlayVideo != -1){
                    	this.visible = false;
                    }
                }
			}
		}, 
		uiNode: {
			_layout:[[0,1],[0.5,0.5],[0,0],true], 
			// 房间ID
			roomID:{
				_run: function(){ 
					this.ignoreContentAdaptWithSize(true);
				},
				_text: function(){
					var sData=MjClient.data.sData;
					var tData=sData.tData; 
					if(MjClient.data.sData.tData.fieldId){
						return "";
					}
					return "房间号:" + tData.tableid;						
				}
			},
			// 游戏结束时间
			roomTime: {
				_run: function(){
					this.ignoreContentAdaptWithSize(true);
				},
				_text: function(){
					return MjClient.roundEndTime;
				}
			},
			// 玩法名称
			roomInfo: {
				_run: function(){
					this.ignoreContentAdaptWithSize(true);
				},
				_text:function(){ 
					var sData = MjClient.data.sData;
		   			var tData = sData.tData;
		   			if (tData.gameCnName){
                        return tData.gameCnName;//"邵阳剥皮";
					}else{
		   				return GameCnName[MjClient.gameType];
					}
				}
			},  
			diPaiNode: {
				_run: function(){
					var sData = MjClient.data.sData;
		   			var tData = sData.tData;
		   			// if(tData.winner == -1){
		   			// 	return;
		   			// } 
		   			if(MjClient.isDismiss)
		   				return; // 解散不显示底牌和埋牌

		   			var view = this.getChildByName("view");
		   			var cards = sData.cards;
		   			var cloneNum = 0; 
		   			var startPosX = view.getChildByName("card").x;
		   			var self = view;
		   			var cloneFunc = function(cardNum){
		   				if(cloneNum != 0){
		   					var cloneCard = self.getChildByName("card").clone();
		   					self.addChild(cloneCard);
		   					cloneCard.setPositionX(startPosX + (cloneNum * 45));
		   					cloneCard.loadTexture(MjClient.cardPath_hengYang+"out" + cardNum + ".png");
		   					cloneNum++;
		   					return cloneCard;
		   				}   
		   				cloneNum++;
		   				var cardImg = self.getChildByName("card");
		   				cardImg.loadTexture(MjClient.cardPath_hengYang+"out" + cardNum + ".png");
		   				return cardImg;
		   			}
		   			var sumCardNum = cards.length - tData.cardNext; // 大于21个就放两行 
		   			var oneLine = true;// 一行
		   			var lineMaxNum = 21;
		   			//安化暂时没有埋牌
		   			if( (MjClient.gameType == MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI && tData.areaSelectMode.huxiType == 1) || 
		   				(MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA && tData.areaSelectMode.isMaiPai) || 
		   				(MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG && tData.areaSelectMode.isMaiPai) ||
		   				(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA && tData.maxPlayer == 2 && tData.areaSelectMode.maiPaiNum > 0)){
		   				// 两人有埋牌，最后20个为埋牌内容
		   			    var maiPaiNum = tData.areaSelectMode.maiPaiNum ? tData.areaSelectMode.maiPaiNum : 20
		   				lineMaxNum = sumCardNum - maiPaiNum; 
		   				// 加一个埋牌文本
		   				var tips = this.getChildByName("tips");
		   				var cloneTips = tips.clone();
		   				tips.setPositionY(76);
		   				cloneTips.setPositionY(35);
		   				cloneTips.setString("埋牌：");
		   				this.addChild(cloneTips); 
		   			}  
 
					for (var i = tData.cardNext; i < cards.length; i++) {
		   				var cardImg = cloneFunc(cards[i]);
		   				cardImg.setVisible(true);
		   				cardImg.setPositionY(35);
		   				if(sumCardNum > lineMaxNum && oneLine){
		   					cardImg.setPositionY(76); 
		   				}
		   				if((i - tData.cardNext) >= lineMaxNum && oneLine){
		   					cloneNum = 1;
		   					cardImg.setPositionY(35);
		   					cardImg.setPositionX(startPosX);
		   					oneLine = false;
		   				}   
		   			}		   			 
		   			
		   			if(!oneLine) this.setPositionY(266); 
				}
			},
			uiBg:{
				headNode: {
					_run: function(){ 
						var sData = MjClient.data.sData;
				   		var tData = sData.tData;
				   		var winOff = 0; 

						// 玩家数据
						var players = sData.players;
						var pl = players[tData.uids[tData.winner] + ""];
	 
						if(tData.winner != -1)
							winOff = getUiOffByUid_hengYang(pl.info.uid); 

						addWxHeadToEndUI_hyZiPai(this,winOff); 
						var playerCount = Object.keys(players).length;  

						var posSc = [0.15,0.475,0.80]; 
						if(playerCount == 4){
							posSc = [0.1,0.33,0.56,0.80]; 
						}else if(playerCount == 2) {
							posSc = [0.3,0.7];
						} 
 
						var uiBg = this.getParent();
						var boxWidth = uiBg.getContentSize().width;
						var posX = boxWidth / (playerCount + 1);
						this.setPositionX(boxWidth * posSc[0]);
						var cloneNum = 2;

				 		
				   		for(var index = 0;index<playerCount;index++){
				   			if(index != winOff){
				   				var cloneThis = this.clone(); // node 节点不允许被clone
				   				this.getParent().addChild(cloneThis);
				   				cloneThis.setPositionX(posSc[cloneNum-1] * boxWidth);// 第几个
				   				addWxHeadToEndUI_hyZiPai(cloneThis,index);
				   				cloneNum++;
				   			}
				   		}
					}
				} 
			},
			
			title_img: {
				_run:function(){
					var sData = MjClient.data.sData;
            		var tData = sData.tData;
            		if (MjClient.isDismiss){
            			this.loadTexture("gameOver/newOver/title_2.png");
            		}else{
            			var selfPlayer = getUiOffByUid(SelfUid()); 
            			if(tData.winner == -1){
            				this.loadTexture("gameOver/newOver/title_1.png");
            			}else{ 
            				var pl = getUIPlayer_leiyang(0);  
							if(!pl)	return; 
 							if(pl.winone > 0){
 								this.loadTexture("gameOver/newOver/title_3.png");
 							}else{
 								this.loadTexture("gameOver/newOver/title_4.png");
 							}  
            			}
            		}
				}
			},
			sumScoreNode: { 
				score: {
					_run: function(){ 
						if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI || MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA){
		   					return;
		   				}

						var sData = MjClient.data.sData;
			   			var tData = sData.tData;
			   			if(tData.winner == -1){
		   					return;
		   				}
		   				this.getParent().visible = true;
		   				var players = sData.players;
			   			var pl = players[tData.uids[tData.winner] + ""];
			   			this.setString(pl.hzdesc.totalFan * pl.hzdesc.totalTun);
	                    this.ignoreContentAdaptWithSize(true);
	                    if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI){
	                    	this.setString(pl.hzdesc.totalTun);
	                    } 
					}
				}
			} 
		} 
	},
    ctor:function () {
        this._super();
        MjClient._originalHuxiScore = 0;
        MjClient.endoneui=this;
        var endoneui = ccs.load("endOne_hyZiPai.json");
		BindUiAndLogic(endoneui.node,this.jsBind);
        this.addChild(endoneui.node);

        this._endoneuiNode = endoneui.node;
        this.setHuNameContnet();
        
 		this.setWinCard();

 		if(MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA){
 			this.setOverScore_hyFangPaoFa(3);
 		}

 		return true;
    }, 

    // 赢的玩家的手牌
    setWinCard: function(){ 
    	// 初始UI
    	var uiNode = this._endoneuiNode.getChildByName("uiNode");
    	var cardContnetNode = uiNode.getChildByName("cardContnetNode");
    	var cardContnet = cardContnetNode.getChildByName("cardContnet");

    	var sData = MjClient.data.sData;
   		var tData = sData.tData;
		if(tData.winner == -1){
			cardContnetNode.setVisible(false);
			return;
		}
		// 玩家数据
		var players = sData.players;
		var pl = players[tData.uids[tData.winner] + ""]; 
    	var startPosX = cardContnet.getPositionX();
 		  
    	var mjSortArr = pl.mjsort; // 桌子上的牌
    	var handSortArr = pl.handSort; // 手牌
  
    	var cloneCardNodeNum = 0; // 克隆的节点的的次数
    	var spacing = 65; // 两行之间的间距
    	// 克隆节点
    	var cloneCardNode = cardContnet.clone(); // 存储最初的内容
    	var cloneNodeFunc = function(){
    		if(cloneCardNodeNum != 0){
    			var cloneNode = cloneCardNode.clone();
    			cardContnetNode.addChild(cloneNode);
    			cloneNode.setPositionX(cloneCardNode.getPositionX() + (spacing * cloneCardNodeNum));
    			return cloneNode;
    		}
    		return cardContnet;
    	}
    	// 克隆卡牌设置牌面
    	var cloneCardsSetData = function(cardNode,i,num){
    		var cardImg = cardNode.getChildByName("card_img");  
			if(i != 0){ 
				var cloneCard = cardImg.clone();
				cloneCard.removeAllChildren();
				cardNode.addChild(cloneCard);
				cloneCard.setPositionY(cardImg.getPositionY() - (i * 45)); 
				cardImg = cloneCard;
			} 
			cardImg.loadTexture(MjClient.cardPath_hengYang+"out" + num + ".png"); 
			return cardImg;
    	}

		//添加胡牌标志
		var isHand = !pl.isHuByHand; // 胡的牌是否在手牌中
		if (tData.isLastDraw && !(pl.mjgang1.toString() == [tData.lastPutCard].toString())) {
			isHand = true;
		}
    	var huCard = tData.lastPutCard;
		// 补牌天胡
		if (tData.isLastDraw && pl.mjgang1.length >= 2) {
			huCard = pl.mjhand[pl.mjhand.length - 1];
		}
		var isClose = false;
		var setSyHuCardMark = function(img){
			if(isClose) return;  
			var huMark = ccui.ImageView("gameOver/newOver/hu_tips.png");
		    huMark.setPosition(cc.p(img.width / 2,img.height / 2));
		    img.addChild(huMark);
		    isClose = true; 
		}

 		var forNum = {mjgang1:["提",4],mjwei:["偎",3],mjgang0:["跑",4],mjpeng:["碰",3]};
	    // 桌子上的牌
	    for (var index in mjSortArr) {
	    	var cardNode = cloneNodeFunc();
	    	var name = mjSortArr[index].name;
	    	var pos = mjSortArr[index].pos;

	    	var textNum = cardNode.getChildByName("num");
	    	var textName = cardNode.getChildByName("name");
	    	textNum.setString("0");
	    	if(name == "mjchi"){
	    		var getHuXi = function(cards){
	        		cards = [].concat(cards);
	        		cards.sort(function(a, b) {return a - b});
	        		var normal = [[1,2,3],[21,22,23], [2, 7, 10], [22, 27, 30], [1, 5, 10], [21, 25, 30]];
	        		for(var t = 0;t < normal.length;t++){
	        			if(normal[t].toString() == cards.toString()){
	        				var huxi = huXiScore_hengYang("chi",cards[0]);
	        				MjClient._originalHuxiScore += huxi;
	        				return huxi;
	        			}
	        		} 
	        		return 0;			        		
	        	}


	    		var cardData = pl[name][pos]; 
	    		var cardImg = null;
	    		for (var i = 0; i < 3; i++) {
	    			cardImg = cloneCardsSetData(cardNode, i, cardData.eatCards[i]);
	    		}
	    		var cards = cardData.eatCards;
 				var tips = (cards[0] == cards[1] || cards[0] == cards[2] || cards[1] == cards[2]) ? "绞" : "顺";  
	    		textNum.setPositionY(cardImg.getPositionY() - 40);  
	    		textNum.setString(getHuXi(cards));
	    		textName.setString(tips);  

	    		var biCards = pl.mjchi[pos].biCards;
	            if(biCards && biCards.length > 0){ 
	            	//计算坐标
	            	for(var m = 0;m < biCards.length;m++){ 
	            		cloneCardNodeNum++; 
		            	var cardNode = cloneNodeFunc();
	            		var textNum1 = cardNode.getChildByName("num");
    					var textName1 = cardNode.getChildByName("name"); 
	            		var biArr = biCards[m];
		            	
		            	cardImg = null;
			            for(i = 0;i < 3;i++){ 
			            	var card = biArr[i]; 
			            	if(card){
			            		cardImg = cloneCardsSetData(cardNode, i, card); 
			            	}  
			            } 
			            var tips1 = (biArr[0] == biArr[1] || biArr[0] == biArr[2] || biArr[1] == biArr[2]) ? "绞" : "顺"; 
		            	textName1.setString(tips1);
		            	textNum1.setPositionY(cardImg.getPositionY() - 40); 
		            	textNum1.setString(getHuXi(biArr));
	            	}       
	            }


	    	}else{
	    		var data = forNum[name];
	    		var cardNum = pl[name][pos]; 
	    		var cardImg = null;
	    		for (var i = 0; i < data[1]; i++) {
	    			cardImg = cloneCardsSetData(cardNode, i, cardNum);
	    		}
	    		textNum.setPositionY(cardImg.getPositionY() - 40);  
	    		textName.setString(data[0]);

	    		var score = "score" in mjSortArr[index] ? mjSortArr[index].score : huXiScore_hyZiPai(name,cardNum);
	    		textNum.setString(score);
	    		MjClient._originalHuxiScore += score;

	    		// // 二人跑胡子，自己计算
	    		// if( MjClient.gameType == MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI ){ 
	    		// 	var score = huXiScore_hyZiPai(name,cardNum);
	    		// 	textNum.setString(score); 
	    		// } else{
	    		// 	textNum.setString(mjSortArr[index].score || 0);

	    		// 	if(mjSortArr[index].score) MjClient._originalHuxiScore += mjSortArr[index].score;
	    		// }
	    		if (isHand == false && cardNum == huCard && cardImg){
                    setSyHuCardMark(cardImg);
				} 
	    	}  
	    	cloneCardNodeNum++;
	    } 

	  	// 手里的牌的名字
 		var myYCNName = {kan: "坎",ti: "提", peng : "碰"};
    	// 设置位置，设置资源 
    	for (var index in handSortArr) {
    		var cardNode = cloneNodeFunc(); 
    		var cardData = handSortArr[index]; 
    		var cardImg = null;
    		for (var i = 0; i < cardData.cards.length; i++) {
    			cardImg = cloneCardsSetData(cardNode, i, cardData.cards[i]);
    			if(isHand && cardData.cards[i] == huCard && cardImg ){
                    setSyHuCardMark(cardImg);
				}
    		}   
    		var textNum = cardNode.getChildByName("num");
    		if(cardImg){
    			textNum.setPositionY(cardImg.getPositionY() - 40);
    		} 
 			textNum.setString(cardData.score);
 			if(cardData.score) MjClient._originalHuxiScore += cardData.score;
 			var textName = cardNode.getChildByName("name");

 			if(myYCNName[cardData.name]) {
 				textName.setString(myYCNName[cardData.name]);
 			}else if(cardData.name == "chi"){
 				var cards = cardData.cards;
 				var tips = (cards[0] == cards[1] || cards[0] == cards[2] || cards[1] == cards[2]) ? "绞" : "顺";  
	            textName.setString(tips);
	        //安化 三提五坎 剩余牌 不显示牌型
 			}else if (cardData.name == ""){
                textName.setString("");
 			}else{
                textName.setString("将");
            }
    		cloneCardNodeNum++;
    	} 
 
    	// cardContnetNode.x += (spacing / 2) * (7 - cloneCardNodeNum);
    	if(cloneCardNodeNum < 6){
    		cardContnetNode.x += spacing;
    	}  
    },

    // 左边胡的名称
    setHuNameContnet: function(){
    	var tData = MjClient.data.sData.tData;
		if(tData.winner == -1){
			return;
		}
		// 初始UI
    	var uiNode = this._endoneuiNode.getChildByName("uiNode");
    	var huNameNode = uiNode.getChildByName("huNameNode");
    	var startPosY = huNameNode.getPositionY();
    	// 玩家数据
    	var sData = MjClient.data.sData;
   		var players = sData.players;
   		var pl = players[tData.uids[tData.winner] + ""];
 
   		var mingTangIndex = 0; 
   		var scoreLabelNum = 0;
   		for (var index in pl.hzdesc) { 
   			cc.log("index = "+index + "hzdesc = " + pl.hzdesc[index]);
   			if(index == "huXi" || index == "totalFan" || index == "totalTun"){ 
   				if((MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI) && (index == "totalTun" || index == "totalFan")) 
   					continue; // 邵阳剥皮没有囤数没有番数
   			  
   				if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI && index == "totalTun")
   					continue; // 邵阳字牌没有囤数

   				if(MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA){
		   			continue ; //  衡阳放炮罚在ctor里面特殊处理
		   		}

   				this.setOverScore(index,pl.hzdesc[index],scoreLabelNum);
   				scoreLabelNum++; 
   			}else if(index == "xing"){
   				this.setXingCardData(tData,pl.hzdesc[index]); 
   			}
   			else{
   				var infoData = this.getMingTangInfo(index,tData);
   				var name = huNameNode.getChildByName("huName");
   				var num = huNameNode.getChildByName("huNum");
   				huNameNode.setVisible(true);
   				if(mingTangIndex != 0){
   					var cloneNode = huNameNode.clone();
   					uiNode.addChild(cloneNode);
   					cloneNode.setPositionY(startPosY - (mingTangIndex * 40));
   					name = cloneNode.getChildByName("huName");
   					num = cloneNode.getChildByName("huNum");
   				}  
   				name.ignoreContentAdaptWithSize(true);
   				num.ignoreContentAdaptWithSize(true);

   				name.setString(infoData.name);
   				num.setString(infoData.icon + pl.hzdesc[index]); 
   				// 衡阳十五胡内容不一致，特殊处理
   				if(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI){
   					if(index == "zimo"){
   						num.setString(infoData.icon); 
   					}else if(index == "honghu"){
   						name.setString("红胡");
   						num.setString("x2");
   					}else if(index == "heihu"){
   						name.setString("黑胡");
   						num.setString(""); 
   					}
   				} 
   				mingTangIndex++;  
   			}  
   		} 
    },
    // set之醒的牌
    setXingCardData: function(tData,num){
    	if(tData.areaSelectMode.xingType == 0)
    		return;
    	if(MjClient.isDismiss || tData.hunCard == -1 || tData.winner == -1){ 
        	return;
        }  
    	var uiNode = this._endoneuiNode.getChildByName("uiNode"); 
    	var xingText = uiNode.getChildByName("xingText");
    	xingText.setVisible(true);
    	var text = (tData.areaSelectMode.xingType == 2) ? "翻醒" : "随醒" ;
    	xingText.setString(text);
    	var card_img = xingText.getChildByName("card_img");
    	var xingNum = xingText.getChildByName("xingNum");  
    	// var huCard = tData.lastPutCard;
    	
    	card_img.loadTexture(MjClient.cardPath_hengYang+"out" + tData.hunCard +".png");
    	xingNum.setVisible(num > 0);
    	if(num > 0){
    		xingNum.setString("+" + num);
    	}
    },
    // 设置胡的结算内容
    setOverScore: function(name,num,index){
    	var uiNode = this._endoneuiNode.getChildByName("uiNode"); 
    	// 这里改一下，改成固定位置
        var node = uiNode.getChildByName("huXiNode");
        node.setVisible(true);
        if(name != "huXi"){  
        	var cloneNode = node.clone();
        	uiNode.addChild(cloneNode);
        	var posNum = {huXi: 0,totalTun: 1,totalFan: 2};
        	cloneNode.setPositionY(node.getPositionY() - (posNum[name] * 40));
         
        	node = cloneNode;
        }  
        var cnName = {huXi: "胡息：",totalFan: "番数：", totalTun: "囤数："};

        node.getChildByName("huNum").setString(num);  
        node.getChildByName("huName").setString(cnName[name]);
        if(name == "totalFan")
        	node.getChildByName("huNum").setString(num);  
    },
    // 衡阳放炮罚设置得分统计的结算内容
    setOverScore_hyFangPaoFa: function(num){
    	var sData = MjClient.data.sData;
    	var tData = sData.tData;
    	if(tData.winner == -1){
			return;
		}

   		var players = sData.players;
   		var pl = players[tData.uids[tData.winner] + ""];
    	var uiNode = this._endoneuiNode.getChildByName("uiNode"); 
        var node = uiNode.getChildByName("huXiNode");
        var cnName = {1: "牌型胡息：",2: "本局胡息：", 3: "累计胡息："};
        var cnNameNum = {1: MjClient._originalHuxiScore, 2: pl.winone, 3: pl.winall};
        do{  
        	var cloneNode = node.clone();
        	var cloneHuNum = cloneNode.getChildByName("huNum");
        	var cloneHuName = cloneNode.getChildByName("huName");
        	cloneNode.setVisible(true);
        	cloneNode.setPositionY(node.getPositionY() - (num * 40));
        	uiNode.addChild(cloneNode);

        	cloneHuNum.ignoreContentAdaptWithSize(true);  
        	cloneHuNum.setString(cnNameNum[num]); 
        	cloneHuNum.setPositionX(cloneHuNum.getPositionX() + cloneHuName.getCustomSize().width / 4);
        	cloneHuName.ignoreContentAdaptWithSize(true);
        	cloneHuName.setString(cnName[num]);
        	cloneHuName.setPositionX(cloneHuName.getPositionX() - cloneHuName.getCustomSize().width / 4);
        	num --;
        }while(num != 0);  
    },
    getMingTangInfo: function(name,tData){
        var infoData = {name:"",icon:"x"};
        var table = {xing: "醒", ziMo: "自摸",zimo: "自摸", hongHu: "红胡", heiHu: "黑胡", daKaHu: "大卡胡", juShou: "举手", tianHu: "天胡",
            wuHu: "无胡", xiaoKaHu: "小卡胡", yiDianHong: "一点红", daHong: "大红", diHu: "地胡", haiDiHu: "海底胡", xiaoHong: "小红",
            yiDianZhu: "一点朱", xiaoHongHu: "小红胡", daHongHu: "大红胡",shiHong: "十红",shiSanHong: "十三红",duiZiHu: "对子胡",
        	dianHu: "点胡",piaoHu: "飘胡",kaHuSanShi: "30胡",kaHuErShi: "20胡",yiTiaoBian: "一条扁",wuhu: "乌胡"};
 
        switch(name) {
            case "xing":
                // 需要处理
                break;
            case "zimo":
            	if(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI){
            		if(tData.areaSelectMode.isZiMoRate)
	   				{
                   		// item.getChildByName("count").setString("x" + "2");  
                   		infoData.icon = "x2"; 
	   				}
                   	else
                   	{
                   		// item.getChildByName("count").setString("");
                   		// 没选就什么内容都没有吗？
                   		infoData.icon = "";   
                   	} 
            	}  
                break;
            case "piaoHu":
                 	infoData.icon = "=";
                break;
            case "hongHu":
                 
                break;
            case "heiHu":
                if(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI){
                	// 黑胡什么内容都没有？
                	infoData.icon = "";  
                }
                break;
            case "daHongHu":
                if(MjClient.gameType != MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI  ){
                    infoData.icon = "=";
                }
                break;
            case "tianHu":
             	if(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA  ){
                    infoData.icon = "+";
                }
                break;
            case "kaHuSanShi":
                    infoData.icon = "+";
                break;
            case "wuhu":
                    infoData.icon = "+";
                break;
            case "shiSanHong":
             	if(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA  ){
                    infoData.icon = "+";
                }
                break;
            case "diHu":
             	if(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA  ){
                    infoData.icon = "+";
                }
                break;
            case "ziMoJiaYiTun":
                if(MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI  ){
                    infoData.icon = "+";
                }
        }

        if(name == "daKaHu" || name == "wuHu" ||name == "xiaoKaHu" || name == "dianpao")
            infoData.icon = "";

        infoData.name = table[name] || "";
        return infoData;
    }
});

 