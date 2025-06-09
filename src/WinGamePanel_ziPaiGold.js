
function showUserInfoGold_ziPai(node,off)
{
     var pl = getUIPlayer_hengYang(off);
    //var pl= getUIPlayer_changpai(off);
    cc.log(pl);
    if(!pl) return; 

     // 写个分数，写个名字
    var nameLabel = node.getChildByName("name");
    var _nameStr = unescape(pl.info.nickname ) + "";
    var preArr = ["本家", "下家", "上家"];
	nameLabel.setString(preArr[off] + " " + getNewName (_nameStr)); 
	nameLabel.setFontName("Arial");
	nameLabel.setFontSize(nameLabel.getFontSize());

	var scoreLabel = node.getChildByName("score");
	var jinBi = pl.winone;
	if(MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA){
		jinBi = pl.fenshu;
	}

	scoreLabel.ignoreContentAdaptWithSize(true); 
	nameLabel.ignoreContentAdaptWithSize(true); 
	nameLabel.setTextColor(cc.color(255,255,255));
	if(jinBi >= 0){
		if(scoreLabel.setProperty){
			scoreLabel.setProperty("+" + jinBi, "game_picture/gold/end/phz/redNum.png", 28, 43, "+");
		}else{
			scoreLabel.setString((jinBi > 0 ? "+":" ") +  jinBi);
			scoreLabel.setTextColor(cc.color(255,231,74));
			nameLabel.setTextColor(cc.color(255,231,74));
		}
	}else{
		if(scoreLabel.setProperty){
			scoreLabel.setProperty(jinBi, "game_picture/gold/end/phz/blueNum.png", 28, 43, "+");
		}else{
			scoreLabel.setString(jinBi);
			scoreLabel.setTextColor(cc.color(237,255,255));
		}
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
    var frame = node.getChildByName("frame");
    frame.addChild(sp)
    sp.width = frame.width;
    sp.height = frame.height;
    sp.x = sp.width * 0.5;
    sp.y = sp.height * 0.5;  

    var kuang = frame.getChildByName("kuang");
    kuang.setLocalZOrder(1);
    if(off == 0){
    	kuang.loadTexture("game_picture/gold/end/phz/headYellow.png");
    }

    var flagIcon = node.getChildByName("flagIcon");
    if(flagIcon){
    	flagIcon.visible = false;
    	if(pl.winone > 0){
    		flagIcon.visible = true;
    		var imgUrl = "game_picture/gold/end/phz/hu.png";
    		if(pl.winType == 1){
    			imgUrl = "game_picture/gold/end/phz/jiepao.png";
    		}else if(pl.winType == 3){
    			imgUrl = "game_picture/gold/end/phz/zimo.png";
    		}
    		flagIcon.loadTexture(imgUrl);
    	}else{
    		var tData = MjClient.data.sData.tData;
    		if(tData.winner >= 0){
    			var winPl = MjClient.getPlayerByIndex(tData.winner);
	    		var lastPl = MjClient.getPlayerByIndex(tData.lastPutPlayer);
	    		if(winPl.winType == 1 && lastPl.info.uid == pl.info.uid){
	    			//点炮玩家
	    			flagIcon.visible = true;
	    			flagIcon.loadTexture("game_picture/gold/end/phz/dianpao.png");
	    		}
    		}
    	}
    }
}

var EndOneView_ziPaiGold = cc.Layer.extend({
    _block:null,
    _endoneuiNode:null, 
	jsBind:{
		block: {
		    _run:function () {
		    	// this.setOpacity(255 * 0.85);
                MjClient.endoneui._block = this;
            },
			_layout:[[1,1],[0.5,0.5],[0,0],true]
		},
		btn_share: { 
			_layout:[[240/1280, 0],[0.3735, 0.09],[0, 0],true],
			_run: function(){
				var sData = MjClient.data.sData;
        		var tData = sData.tData;
    			if(tData.winner == -1){
    				setWgtLayout(this, [240/1280, 0],[0.3735, 0.12],[0, 0]); 
    			}
			},
			_click:function(btn,eT){
				MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
				{
					postEvent("capture_screen");
                    MjClient.endoneui.capture_screen = true;
                    btn.setTouchEnabled(false);
				});
			}
			,_event:{
				captureScreen_OK:function(){
					if (MjClient.endoneui.capture_screen != true)
                        return;
                    MjClient.endoneui.capture_screen = false;
                    var writePath = jsb.fileUtils.getWritablePath();
                    var textrueName = "wxcapture_screen.png";
                    var savepath = writePath+textrueName;
                    MjClient.shareImageToSelectedPlatform(savepath);
                    this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function()
                    {
                        this.setTouchEnabled(true);
                        // this.setBright(true);
                    }.bind(this))));
				}
			},
		}, 
		btn_again:{
			_run: function(){
				setWgtLayout(this, [240/1280, 0],[0.6352, 0.09],[0, 0]); 
				var sData = MjClient.data.sData;
        		var tData = sData.tData;
    			if(tData.winner == -1){
    				setWgtLayout(this, [240/1280, 0],[0.6352, 0.12],[0, 0]); 
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
				setWgtLayout(this, [72/1280, 0],[0.0294, 0.93],[0, 0]); 
			},
			_click: function(btn,eT){ 
				if (MjClient.data.sData.tData.fieldId){
                    leaveGameClearUI();
                    return;
                }
			} 
		},
		uiNode: {
			_layout:[[0,1],[0.5,0.5],[0,0],true],   
			huang : {
				_run : function(){
					var sData = MjClient.data.sData;
            		var tData = sData.tData;
        			if(tData.winner == -1){
        				this.visible = true;
        			}else{
        				this.visible = false;
        			}
				},

				head: {
					_run : function(){
						showUserInfoGold_ziPai(this, 2);//上家

						var index = 0
						while(index < 2){
							var clone = this.clone();
			   				this.getParent().addChild(clone);
			   				clone.setPositionX(this.x + this.width * (index + 1));
			   				showUserInfoGold_ziPai(clone, index);
			   				index += 1;
						}
					}
				}
			},
			result : {
				_run : function(){
					var sData = MjClient.data.sData;
            		var tData = sData.tData;
        			if(tData.winner == -1){
        				this.visible = false;
        				return;
        			}

        			this.visible = true;

        			var bg_top = this.getChildByName("bg_top");
        			var bg_bottom = this.getChildByName("bg_bottom");
        			var selfBg = this.getChildByName("selfBg");
        			var titleBg = this.getChildByName("titleBg");
        			var title_flag = this.getChildByName("title_flag");
        			var pl = getUIPlayer_leiyang(0);  
					if(!pl)	return; 
					if(pl.winone > 0){
						bg_top.loadTexture("game_picture/gold/end/phz/winBg.png");
						bg_bottom.loadTexture("game_picture/gold/end/phz/winBg1.png");
						selfBg.loadTexture("game_picture/gold/end/phz/winBg2.png");
						titleBg.loadTexture("game_picture/gold/end/phz/titleWinBg.png");
						title_flag.loadTexture("game_picture/gold/end/phz/title_win.png");
					}else{
						bg_top.loadTexture("game_picture/gold/end/phz/failBg.png");
						bg_bottom.loadTexture("game_picture/gold/end/phz/failBg1.png");
						selfBg.loadTexture("game_picture/gold/end/phz/failBg2.png");
						titleBg.loadTexture("game_picture/gold/end/phz/titleFialBg.png");
						title_flag.loadTexture("game_picture/gold/end/phz/title_fail.png");
						titleBg.ignoreContentAdaptWithSize(true);
						titleBg.x = 609;
						title_flag.y = 664; 
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

			   			var cards = sData.cards;
			   			var cloneNum = 0; 
			   			var self = this;
			   			var view = this.getChildByName("view");
			   			if(view){
			   				self = view;
			   				var startPosX = view.getChildByName("card").x;
			   			}else{
			   				var startPosX = this.getChildByName("card").x;
			   			}

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

			   			if(tData.maxPlayer == 2){
			   				// 两人有埋牌，最后20个为埋牌内容

			   				if(!tData.areaSelectMode.isMaiPai && 
			   					(MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || 
			   						MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA || 
			   						MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI || 
			   						MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI)){
			   					//do nothing 二人不埋牌
			   				}else{
			   					lineMaxNum = sumCardNum - 20; 
				   				// 加一个埋牌文本
				   				var tips = this.getChildByName("tips");
				   				var cloneTips = tips.clone();
				   				tips.setPositionY(76);
				   				cloneTips.setPositionY(35);
				   				cloneTips.setString("埋牌：");
				   				this.addChild(cloneTips); 
			   				}
			   				
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
				headNode: {
					_run: function(){ 
						showUserInfoGold_ziPai(this, 2);//上家

						var index = 0
						while(index < 2){
							var clone = this.clone();
			   				this.getParent().addChild(clone);
			   				clone.setPositionX(this.x + this.width * (index + 1));
			   				showUserInfoGold_ziPai(clone, index);
			   				index += 1;
						}
					}
				},
				sumScoreNode: { 
					score: {
						_run: function(){ 
							if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA){
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
			}, 
		} 
	},
    ctor:function () {
        this._super();
        MjClient.endoneui=this;
        var endoneui = ccs.load("endOne_ziPai_gold.json");
		BindUiAndLogic(endoneui.node,this.jsBind);
        this.addChild(endoneui.node);

        this._endoneuiNode = endoneui.node;
        this.setHuNameContnet();
        
 		this.setWinCard();

 		return true;
    }, 

    getHuXiScore : function (type,card)
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
	},

    // 赢的玩家的手牌
    setWinCard: function(){ 
    	// 初始UI
    	var uiNode = this._endoneuiNode.getChildByName("uiNode");
    	var result = uiNode.getChildByName("result");
    	var cardContnetNode = result.getChildByName("cardContnetNode");
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
				cloneCard.setPositionY(cardImg.getPositionY() - (i * 41)); 
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
				textNum.setString(mjSortArr[index].score || this.getHuXiScore(name,cardNum));
	    		textName.setString(data[0]);
	    		if(isHand == false && cardNum == huCard && cardImg){
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
    	var result = uiNode.getChildByName("result");
    	var huNameNode = result.getChildByName("huNameNode");
    	var startPosY = huNameNode.getPositionY();
    	// 玩家数据
    	var sData = MjClient.data.sData;
   		var players = sData.players;
   		var pl = players[tData.uids[tData.winner] + ""];
 
   		var mingTangIndex = 0; 
   		var scoreLabelNum = 0;

   		//安化 自摸加一囤 特殊处理
		if (MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI){
			if (pl.hzdesc["ziMoJiaYiTun"]){
                pl.hzdesc["ziMoJiaYiTun"] = "";
			}
		}

		//左右两边的(名堂 番数 等 居中对齐) begin
        var rightCount = 0;
        var leftCount = 0;
        for (var index in pl.hzdesc){
            if(index == "huXi" || index == "totalFan" || index == "totalTun"){
                rightCount++;
            }else if(index == "xing"){
                if(tData.areaSelectMode.xingType == 0 || MjClient.isDismiss || tData.hunCard == -1 || tData.winner == -1)
                {
                }else{
                    leftCount++;
				}
            }
            else{
                leftCount++;
            }
        }
        rightCount++;

        var middleY = result.getChildByName("bg_top").y;
        var node = result.getChildByName("huXiNode");
        node.setPositionY((rightCount - 1) / 2 * 40 + middleY);
        var sumScoreNode = result.getChildByName("sumScoreNode");
        if (sumScoreNode){
            sumScoreNode.setPositionY(node.y - (rightCount - 1) * 40);
		}

        startPosY = (leftCount - 1) / 2 * 40 + middleY;
        huNameNode.setPositionY(startPosY);
        var xingText = result.getChildByName("xingText");
        if (xingText){
            xingText.setPositionY(startPosY - (leftCount - 1) * 40);
		}
        //左右两边的(名堂 番数 等 居中对齐) end

		if (MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA){
			this.setOverScore_fangPaoFa(pl.hzdesc.huXi, pl.winone);
		}

   		for (var index in pl.hzdesc) {
   			cc.log("index = "+index + "hzdesc = " + pl.hzdesc[index]);
   			if(index == "huXi" || index == "totalFan" || index == "totalTun"){ 
   				if((MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI) && (index == "totalTun" || index == "totalFan")) 
   					continue; // 邵阳剥皮没有囤数没有番数
   			  
   				if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI && index == "totalTun")
   					continue; // 邵阳字牌没有囤数

   				if (MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA){
					continue; // 邵阳放炮罚在上面已经处理过了
				}

   				this.setOverScore(index,pl.hzdesc[index],scoreLabelNum);
   				scoreLabelNum++; 
   			}else if(index == "xing"){
   				if (MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA){
					continue; // 邵阳放炮罚在上面已经处理过了
				}

   				this.setXingCardData(tData,pl.hzdesc[index]); 
   			}else if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA && index == "dianpao"){
				continue; // 邵阳放炮罚在上面已经处理过了
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
    	var result = uiNode.getChildByName("result");
    	var xingText = result.getChildByName("xingText");
    	xingText.setVisible(true);
    	var text = (tData.areaSelectMode.xingType == 2) ? "翻醒" : "跟醒" ;
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
    	var result = uiNode.getChildByName("result");
    	// 这里改一下，改成固定位置
        var node = result.getChildByName("huXiNode");
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
    // 放炮罚设置胡的结算内容
    setOverScore_fangPaoFa: function(originHuXiPl, huxiScorePl){
    	var uiNode = this._endoneuiNode.getChildByName("uiNode"); 
    	var result = uiNode.getChildByName("result");
    	// 这里改一下，改成固定位置
        var node = result.getChildByName("huXiNode");
        node.setVisible(true);

    	var huxiScore  = node.clone();
    	uiNode.addChild(huxiScore);
    	huxiScore.setPositionY(node.getPositionY() - 40);

    	var originHuXiName = node.getChildByName("huName");
    	var originHuXiNum = node.getChildByName("huNum");

    	var huxiScoreName = huxiScore.getChildByName("huName");
    	var huxiScoreNum = huxiScore.getChildByName("huNum");

        originHuXiName.setString("原始胡息：");  
        originHuXiNum.setString(originHuXiPl);
        originHuXiName.ignoreContentAdaptWithSize(true);
        originHuXiNum.ignoreContentAdaptWithSize(true);
        originHuXiNum.x = originHuXiName.x + originHuXiName.width;

        huxiScoreName.setString("本局胡息：");  
        huxiScoreNum.setString(huxiScorePl);
        huxiScoreName.ignoreContentAdaptWithSize(true);
        huxiScoreNum.ignoreContentAdaptWithSize(true);
        huxiScoreNum.x = huxiScoreName.x + huxiScoreName.width;
    },
    getMingTangInfo: function(name,tData){
        var infoData = {name:"",icon:"x"};
        var table = {xing: "醒", ziMo: "自摸", zimo: "自摸", hongHu: "红胡", heiHu: "黑胡", daKaHu: "大卡胡", juShou: "举手", tianHu: "天胡",
            wuHu: "无胡", xiaoKaHu: "小卡胡", yiDianHong: "一点红", daHong: "大红", diHu: "地胡", haiDiHu: "海底胡", xiaoHong: "小红",
            yiDianZhu: "一点朱", xiaoHongHu: "小红胡", daHongHu: "大红胡", dianHu:"点胡",shiBaDa:"十八大",shiBaXiao:"十八小",sanTiWuKan:"三提五坎",
            paPo:"爬坡",ziMoJiaYiTun:"自摸加一囤",ziMoFanBei:"自摸", 
            shiHong: "十红", shiSanHong: "十三红", duiZiHu: "对子胡", dianHu: "点胡", piaoHu: "飘胡", kaHuSanShi: "30胡", kaHuErShi: "20胡", 
        	yiTiaoBian: "一条扁", wuhu: "乌胡", 
        	tianhu: "天胡", kahusanshi: "30胡", kahuershi: "20胡", yitiaobian: "一条扁", yidianhong: "一点红", haidilao: "海底胡", shihong: "十红",
        	shisanhong: "十三红", dihu: "地胡"};

        switch(name) {
            case "xing":
                // 需要处理
                break;
            case "ziMo":
                if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
                    infoData.icon = "+";
                }
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
                if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
                    infoData.icon = "+";
                }
                break;
            case "heiHu":
                if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
                    infoData.icon = tData.areaSelectMode.hongHeiType == 1 ? "+" : "=";
                }
                else if(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI){
                	infoData.icon = "";  
                }
                break;
            case "daHongHu":
                if(MjClient.gameType != MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI  ){
                    infoData.icon = "=";
                }
                break;
            case "tianHu":
                if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
                    infoData.icon = tData.areaSelectMode.tianDiHuType == 1 ? "x" : "+";
                }
                else if(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA  ){
                    infoData.icon = "+";
                }

                break;
            case "tianhu":
                infoData.icon = "+";
                break;
            case "diHu":
                if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI  ){
                    infoData.icon = tData.areaSelectMode.tianDiHuType == 1 ? "x" : "+";
                }
                break;
            case "dihu":
            		if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA  ){
                    	infoData.icon = "+";
                    }
                break;
            case "ziMoJiaYiTun":
                if(MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI  ){
                    infoData.icon = "";
                }
                break;
            case "kaHuSanShi":
                    infoData.icon = "+";
                break;
           	case "kahusanshi":
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
            case "shisanhong":
                    infoData.icon = "+";
                break;
        }
        if(name == "daKaHu" || name == "wuHu" ||name == "xiaoKaHu" )
            infoData.icon = "";

        infoData.name = table[name] || "";
        return infoData;
    }
});

 