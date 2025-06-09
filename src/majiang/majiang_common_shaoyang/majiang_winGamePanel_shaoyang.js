/***
 * 邵阳App麻将玩法小结算基类
 * @type {void | Class | *}
 */
var majiang_winGamePanel_shaoyang = majiang_winGamePanel.extend({
	jsBind:{
		btn_closeTable:{
			_run: function(){
        		setWgtLayout(this, [0.15, 0.15],[0.5, 0.5],[0, 0]); 
        	},
        	_click:function(btn,eT){ 
				postEvent("showTableEvent",false);
			},
			_event:{
				showTableEvent:function(isShow){ 
            		this.setVisible(isShow);
            	}
			} 
		},
		block:{
			_event:{
	            showTableEvent:function(isShow){   
	        		if(MjClient.endallui){
	        			MjClient.endallui.setVisible(!isShow);
	        		}
	        		if(isShow){
            			this.setOpacity(0);
            		}else{
            			this.setOpacity(255 * 0.9);
            		} 
	        	}
            }
		},
		back:{  
			btn_showTable: { // 显示桌面按钮
				_click:function(btn,eT){ 
					postEvent("showTableEvent",true);
				}
			},
			_event:{
	            showTableEvent:function(isShow){   
	        		this.setVisible(!isShow);
	        	},
	        	DelRoom:function(isShow){   
	        		postEvent("showTableEvent",false);
	        	}
            }  
		}
	},
	ctor : function(jsonSrc){
		this._super(jsonSrc);
	}
});

// 返回手牌排序结果 【赖子，手牌，胡的牌】 pl.winType > 0
majiang_winGamePanel_shaoyang.prototype.getHandSort = function(handCards, isHu){
    if(!handCards) return MjClient.endoneui.removeFromParent(true);
	var cardsArr = handCards.slice();
	var hunCard = MjClient.data.sData.tData.hunCard || 0;
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

// 显示手牌内容
majiang_winGamePanel_shaoyang.prototype.showHandCard = function(pl, infoImg){
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
        posx += arry[i].width * arry[i].getScale() * 0.94; 
	}
};

// 准备按钮点击事件
majiang_winGamePanel_shaoyang.prototype.btnReadyEvent = function(){ 
	var sData=MjClient.data.sData;
	var tData=sData.tData;
    for(var i = 0; i < tData.maxPlayer;i++){
		var pl = MjClient.playui.getPlayerWithIndex(i);
		if (!pl)
			continue;
		// 准备的时候清理花和加注
		if (pl.mjflower)
			pl.mjflower = [];
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