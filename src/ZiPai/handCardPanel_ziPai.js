var HandCardPanel_ziPai = cc.Layer.extend({
	jsBind:{
		block: {
		    _run:function () {
		    	this.setOpacity(255 * 0.85);
            },
			_layout:[[1,1],[0.5,0.5],[0,0],true]
		},
		uiNode: {
			_layout:[[1,0],[0.5,0.5],[0,0],true],
			_run : function() {
				if(isIPhoneX()) {
                  setWgtLayout(this,[0.98, 0.98], [0.5, 0.5], [0, 0]);
				}
			}
		} 
	},
	ctor : function() {
		this._super();

		var uiNode = ccs.load("handCardPanel.json");
		BindUiAndLogic(uiNode.node,this.jsBind);
        this.addChild(uiNode.node);

		this._initHandCard();
		this._initUI(uiNode.node);
	},

	_initUI : function(panelNode) {
		var sData = MjClient.data.sData;
    	var tData = sData.tData;

		var uiNode = panelNode.getChildByName("uiNode");
		var close = uiNode.getChildByName("close");
		close.addTouchEventListener(function(sender, eventType){
			if (eventType == ccui.Widget.TOUCH_ENDED) {
		    	for (var i = 0; i < tData.maxPlayer; i++) {
		    		var pl = sData.players[tData.uids[i]];
		    		pl.mjhandTemp = null;
		    	}
                this.removeFromParent();
            }
		}, this);
		var itemList = uiNode.getChildByName("itemList");
		var item = uiNode.getChildByName("item");
		item.visible = false;

		var gap = 10;
		var allW = item.width * tData.maxPlayer + (tData.maxPlayer * gap);
		var sx = (itemList.width - allW) * 0.5;
		var sy = itemList.height * 0.5;
    	for (var i = 0; i < tData.maxPlayer; i++) {
    		var pl = sData.players[tData.uids[i]];
    		var copyItem = item.clone();
    		copyItem.visible = true;
    		copyItem.x = sx + i * (copyItem.width + gap);
    		copyItem.y = sy;
    		itemList.addChild(copyItem);
    		this._setPlayerInfo(copyItem, pl);
    	}
	},

	_setPlayerInfo : function(node, pl) {
		var headNode = node.getChildByName("headNode");
		this._addWxHead(headNode, pl);

		var cardContnet = node.getChildByName("cardContnet");
		var cloneCardNode = cardContnet.clone();
		var idx = 0;
		var cloneNodeFunc = function(){
    		if(idx != 0){
    			var cloneNode = cloneCardNode.clone();
    			node.addChild(cloneNode);
    			cloneNode.setPositionX(cloneCardNode.getPositionX() + (idx * 26));
    			return cloneNode;
    		}
    		return cardContnet;
    	}
    	var cloneCardsSetData = function(cardNode,i,num){
    		var cardImg = cardNode.getChildByName("card_img");  
			if(i != 0){ 
				var cloneCard = cardImg.clone();
				cloneCard.removeAllChildren();
				cardNode.addChild(cloneCard);
				cloneCard.setPositionY(cardImg.getPositionY() + (i * 45)); 
				cardImg = cloneCard;
			} 
			if(MjClient.playui.getCardSrc) {
				MjClient.playui.loadCardTexture(cardImg, MjClient.playui.getCardSrc("out", num), MjClient.playui.getResType()); 
			}else {
				//老版
				MjClient.playui.loadCardTexture(cardImg, num);
			}
			
			return cardImg;
    	}

    	if(!pl.mjhandTemp || pl.mjhandTemp.length == 0) {
    		var cardImg = cardContnet.getChildByName("card_img"); 
    		cardImg.visible = false;
    		return;
    	}

		var handSortArr =MjClient.majiang.sortCard(pl.mjhandTemp);
        if (handSortArr.length > 10) {
            for (var i = 1; i <= handSortArr.length - 10; i++) {
                for (var j = handSortArr.length-1; j >= 0 ; j--) {
                    if (handSortArr[j].length == 1) {
                        for (var k = j - 1; k >= 0 ; k--) {
                            if (handSortArr[k].length == 1) {
                                handSortArr[j] = handSortArr[j].concat(handSortArr[k]);
                                handSortArr.splice(k, 1);
                                break;
                            }
                        }
                        break;
                    }
                }
            }
        }
		for (var index in handSortArr) {
    		var cardNode = cloneNodeFunc(); 
    		var cards = handSortArr[index]; 
    		var cardImg = null;
    		for (var i = 0; i < cards.length; i++) {
    			cloneCardsSetData(cardNode, i, cards[i]);
    		}   
    		idx++;
    	} 
	},

	_initHandCard : function() {
		var sData = MjClient.data.sData;
    	var tData = sData.tData;
    	var cards = sData.cards;
    	var cardNext = 0;
    	var zhuang = null;
    	for (var i = 0; i < tData.maxPlayer; i++) {
    		var idx = (i + tData.zhuang + tData.maxPlayer) % tData.maxPlayer;
    		if(this._isXingPlayer(idx)){
    			continue;
    		}
    		var pl = sData.players[tData.uids[idx]];
    		pl.mjhandTemp = [];
    		if(i == 0) {
    			zhuang = pl;
    		}
    		var handCount = MjClient.playui.getHandCount();
    		for (var j = 0; j < handCount; j++) {
                var newCard = cards[cardNext++];
                pl.mjhandTemp.push(newCard);
            }
    	}
    	if(zhuang) {
    		zhuang.mjhandTemp.push(cards[cardNext++]);
    	}
	},

	_isXingPlayer : function(idx){
	    var tData = MjClient.data.sData.tData;
	    if(tData.xingPlayer == idx){
	        return true;
	    }
	    return false;
	},

	_addWxHead : function(node,pl)
	{
	    cc.log(pl);
	    if(!pl) return; 

	    var nameLabel = node.getChildByName("name");
	    var _nameStr = unescape(pl.info.nickname ) + "";
		nameLabel.setString(getNewName (_nameStr)); 
		nameLabel.ignoreContentAdaptWithSize(true); 
		var ID = node.getChildByName("ID");
		ID.setString("ID:" + pl.info.uid); 
		ID.ignoreContentAdaptWithSize(true); 
	 
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
	    if (frame){
	        frame.zIndex = sp.zIndex + 1;
	    }

	    var clippingNode = new cc.ClippingNode();
	    var mask = new cc.Sprite("gameOver/gameOver_headBg2.png");
	    clippingNode.setAlphaThreshold(0);
	    clippingNode.setStencil(mask); 

	    sp.setScale(mask.getContentSize().width / sp.getContentSize().width);
	    clippingNode.addChild(sp);
	    clippingNode.setPosition(frame.getContentSize().width / 2, frame.getContentSize().height / 2);
	    // //遮罩框
	    var hideblock = new cc.Sprite("gameOver/gameOver_headBg3.png");
	    hideblock.setPosition(frame.getContentSize().width / 2, frame.getContentSize().height / 2);
	    frame.addChild(clippingNode);

	    setRoundEndUserOffline_shaoyang(frame, pl);
	    frame.addChild(hideblock);
	}
});