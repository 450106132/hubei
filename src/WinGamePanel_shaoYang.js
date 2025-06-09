function addWxHeadToEndUI_shaoYang(node,off)
{
    var pl = getUIPlayer_hengYang(off);
    //var pl= getUIPlayer_changpai(off);
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
    setWgtLayout(sp,[0.88,0.88],[0.5,0.5],[0,0],false,true);
}

function reInitarrCardVisible_shaoYang()
{
	// MjClient.arrowbkNode.setVisible(false);
	if(MjClient.roundnumImgNode && cc.sys.isObjectValid(MjClient.roundnumImgNode)){
        MjClient.roundnumImgNode.setVisible(false);
	}
	if(MjClient.cardNumImgNode && cc.sys.isObjectValid(MjClient.cardNumImgNode)){
        MjClient.cardNumImgNode.setVisible(false);
	}
}

var EndOneView_shaoYang = cc.Layer.extend({
    _block:null,
	jsBind:{
		block:{
		    _run:function () {
                MjClient.endoneui._block = this;
            },
			_layout:[[1,1],[0.5,0.5],[0,0],true]
		},
		parent:{
            _layout:[[1,1],[0.5,0.5],[0,0],false],
			// shareBtn:{
			// 	_click:function(){
			// 		postEvent("capture_screen");
			// 	},
			// 	_event:{
			// 		captureScreen_OK:function(){MjClient.native.wxShareImage();}
			// 	},
			// 	_visible :function(){
			// 		return !MjClient.remoteCfg.guestLogin;
			// 	},
			// 	_run:function(){
			// 		cc.log("shareBtn:" + JSON.stringify(this.getPosition()));
			// 	}
			// },
			readyBtn:{
				_run:function (){
					if(MjClient.remoteCfg.guestLogin){
						setWgtLayout(this, [0.15, 0.15],[0.5, 0.085],[0, 0], false, true);
					}
				},
				_click:function(btn,eT){
					postEvent("clearCardUI");
					postEvent("clearCardArr");
					MjClient.endoneui.gameBalance = null;
					MjClient.endoneui.gameMain = null;
					MjClient.endoneui._block = null;
					MjClient.endoneui.removeFromParent(true);
					MjClient.endoneui = null;
					var sData=MjClient.data.sData;
					var tData=sData.tData;
	                if (MjClient.rePlayVideo >= 0 && MjClient.replayui && !MjClient.endallui) {
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
			switchImg:{
				tableImg:{
					_touch:function(btn, eT){
						if(eT == 2){
							if(!MjClient.endoneui.gameMain.visible){
								var switchBtn = btn.parent.getChildByName("switchBtn");
								switchBtn.getChildByName("img").loadTexture("playing/paohuzi/xianshizhuom.png");
								var pos = switchBtn.getPosition();
								switchBtn.setPosition(cc.p(pos.x + 140,32));
								MjClient.endoneui.gameBalance.visible = false;
								MjClient.endoneui.gameMain.visible = true;
                                MjClient.endoneui._block.setOpacity(0);
							}
						}
					}
				},
				balanceImg:{
					_touch:function(btn, eT){
						if(eT == 2){
							if(!MjClient.endoneui.gameBalance.visible){
								var switchBtn = btn.parent.getChildByName("switchBtn");
								switchBtn.getChildByName("img").loadTexture("playing/paohuzi/jiesuan.png");
								var pos = switchBtn.getPosition();
								switchBtn.setPosition(cc.p(pos.x-140,32));
								MjClient.endoneui.gameBalance.visible = true;
								MjClient.endoneui.gameMain.visible = false;
                                MjClient.endoneui._block.setOpacity(255);
							}
						}
					}
				},
			},
			xingPaiImg:{
				_run:function()
				{
					MjClient.endoneui._xingPaiImg = this;
					if(MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ || 
						MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI ||
						MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
                        this.setVisible(false);
					}
				},
				pai:{
					_run:function(){
				        //醒牌
				        var tData = MjClient.data.sData.tData;
				        if(MjClient.isDismiss || tData.hunCard == -1 || tData.winner == -1){
				        	this.visible = false;
				        }else{
				        	this.loadTexture("playing/paohuzi/out" + tData.hunCard + ".png");
				        }
					}
				}
			},
			balance:{
				_run:function(){
					MjClient.endoneui.gameBalance = this;
				},
	            winImg:{
	            	_run:function(){
	            		var sData = MjClient.data.sData;
	            		var tData = sData.tData;
	            		if (MjClient.isDismiss){
	            			this.loadTexture("playing/paohuzi/jiesan.png");
	            		}else{
	            			var pl=getUIPlayer(0);
	            			var isHuang = false;
	            			if(pl.winone > 0){
	            				this.loadTexture("playing/paohuzi/win.png");
	            			}else if(pl.winone == 0){
	            				this.loadTexture("playing/paohuzi/win.png");
	            				if(MjClient.CheckPlayerCount(function(p){ if(p.winone==0){return true;} return false;}) == tData.maxPlayer){
	            					this.loadTexture("playing/paohuzi/huangzhuang.png");
	            					isHuang = true;
	            				}
	            			}else if(pl.winone < 0){
	            				this.loadTexture("playing/paohuzi/lose.png");
	            			}

	            			if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI && !isHuang){
	            				this.loadTexture("playing/paohuzi/endTitle.png");
	            			}
	            			if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI && tData.winner == -1){
	            				this.loadTexture("playing/paohuzi/huangzhuang.png");
	            			}
	            		}
	            	},
				},
				descLabel:{
				    _run:function () {
                        this.ignoreContentAdaptWithSize(true);
                    },
					_text:function(){
						var sData=MjClient.data.sData;
						var tData=sData.tData;
						return "房间号:" + tData.tableid;						
					}
				},
				tableLabel:{
                    _run:function () {
                        this.ignoreContentAdaptWithSize(true);
                    },
					_text:function(){
						var sData=MjClient.data.sData;
						var tData=sData.tData;
						var text = "";
                        if(MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ){
                            text += "耒阳字牌,";
                            text += (tData.areaSelectMode.jushou) ? "举手做声," : "" ;
                            text += (tData.areaSelectMode.budaihu) ? "不带无胡," : "带无胡," ;
                            text += (tData.areaSelectMode.isPutLimit) ? "吃边打边," : "" ;
                            text += (tData.areaSelectMode.budaiyihong) ? "不带一点红" : "带一点红" ;
                        }else if(MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG){
                            text += "六胡抢,";
                            text += (tData.areaSelectMode.xiNum == 6) ? "6息," : (tData.areaSelectMode.xiNum == 9) ? "9息," : "15息," ;
                            text += (tData.areaSelectMode.suanfenType == 0) ? "" : (tData.areaSelectMode.suanfenType == 1) ? "底分2分," : "1息1囤,";
                            text += (tData.areaSelectMode.isMingwei) ? "明偎,\n" : "\n" ;
                            text += (tData.areaSelectMode.isYiwushi) ? "一五十," : "" ;
                            text += (tData.areaSelectMode.isHongheidian) ? "红黑点," : "" ;
                            text += (tData.areaSelectMode.isTiandihu) ? "天地胡," : "" ;
			                text += (tData.areaSelectMode.isTianhu) ? "天胡," : "" ;
			                text += (tData.areaSelectMode.isDihu) ? "地胡," : "" ;
                            text += (tData.areaSelectMode.xingType == 0) ? "不带醒" : (tData.areaSelectMode.xingType == 2) ? "翻醒" : "随醒" ;
						}else if(MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA){
                            text += "十胡卡,";
                            text += (tData.areaSelectMode.bihuType == 0) ? "有胡必胡," : "点炮必胡," ;
                            text += (tData.areaSelectMode.hongziType == 0) ? "10红3倍13红5倍," : "10红3倍多一红+3胡," ;
                            text += (tData.areaSelectMode.fangpaoType == 0) ? "3倍," : "2倍," ;
                            text += (tData.areaSelectMode.isErfen) ? "底分2分,\n" : "\n" ;
                            text += (tData.areaSelectMode.isYiwushi) ? "一五十," : "" ;
                            text += (tData.areaSelectMode.isTiandihu) ? "天地胡," : "" ;
			                text += (tData.areaSelectMode.isTianhu) ? "天胡," : "" ;
			                text += (tData.areaSelectMode.isDihu) ? "地胡," : "" ;
                            text += (tData.areaSelectMode.isHaidihu) ? "海底胡," : "" ;
                            text += (tData.areaSelectMode.xingType == 0) ? "不带醒" : (tData.areaSelectMode.xingType == 2) ? "翻醒" : "随醒" ;
                        }else if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI){
                        	text += "邵阳字牌,";
                        	text += (tData.areaSelectMode.huXiType == 3)?"3胡一囤":"5胡一囤";
                        }else if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
                        	text += "邵阳剥皮,";
                        	text += tData.areaSelectMode.maxPlayer + "人";
		                    text += tData.areaSelectMode.isHongheidian ? ",红黑点" : "";
		                    text += tData.areaSelectMode.isSpringDouble ? ",春天翻倍" : "";
		                    // text += tData.areaSelectMode.isTianDiHu ? ",天地胡" : ""; 
		                    text += [",天地胡加十胡",",天地胡翻倍",",无天地胡"][tData.areaSelectMode.tianDiHuType];
	  
		                    if(tData.areaSelectMode.isLianZhuang){
		                        text += ",可连庄";
		                        if(tData.areaSelectMode.fengDing == -1){
		                            text += ",不封顶";
		                        }else{
		                            text += "," + tData.areaSelectMode.fengDing + "胡封顶";
		                        }
		                    }
                        }
						return text;						
					}
				},
				timeLabel:{
                    _run:function () {
                        this.ignoreContentAdaptWithSize(true);
                    },
					_text:function(){
						return MjClient.roundEndTime;						
					}
				},
				showList:{
					head:{
						_visible:false
					},
				   	_run:function(){
				   		var sData = MjClient.data.sData;
				   		var tData = sData.tData;
				   		var players = sData.players;
				   		var bgSize = this.getCustomSize();
				   		var head = this.getChildByName("head");
				   		var headSize = head.getContentSize();
				   		var playerCount = Object.keys(players).length;
				   		var off_x = (bgSize.width - headSize.width * playerCount)/(playerCount+1);
				   		var uids = tData.uids;
				   		var selfIndex = tData.uids.indexOf(SelfUid());
				   		for(var index = 0;index<playerCount;index++){
				   			var cloneHead = head.clone();
				   			cloneHead.visible = true;
				   			cloneHead.setPosition(cc.p((index+1) * off_x + index*headSize.width,bgSize.height/2));
				   			this.addChild(cloneHead);

				   			var zhuang = cloneHead.getChildByName("zhuang");
				   			if(index == tData.zhuang){
				   				zhuang.visible = true;
				   				zhuang.zIndex = 100;
				   			}else{
				   				zhuang.visible = false;
				   			}

				   			var nameLabel = cloneHead.getChildByName("name");
				   			nameLabel.ignoreContentAdaptWithSize(true);
				   			var uid = uids[index];
				   			var pl = players[uid + ""];
						    var _nameStr = unescape(pl.info.nickname ) + "";
						    nameLabel.setString(getNewName (_nameStr));
						    nameLabel.setFontName("Arial");
						    nameLabel.setFontSize(nameLabel.getFontSize());

						    var scoreLabel = cloneHead.getChildByName("score");
						    scoreLabel.ignoreContentAdaptWithSize(true);
						    var score = pl.winone;
						    if(tData.winner == -1){
						    	if(pl.winone == 0){
						    		scoreLabel.setString(0);
						    	}else{

                                    if(MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ || 
                                    	MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI)
                                    {
                                        scoreLabel.setString(score > 0?"+" + score:score);
                                    }else {
                                        scoreLabel.setString("王霸" + (score > 0?"+" + score:score));
									}
						    	}
						    }else{
						    	scoreLabel.setString(score > 0?"+" + score:score);
						    }

						    if(pl.winone < 0){
						    	nameLabel.setColor(cc.color(243,243,109));
						    	scoreLabel.setColor(cc.color(243,243,109));
						    }

						    var longCards = pl.longCard;
						    var card0 = cloneHead.getChildByName("card_0");
						    var pos0 = card0.getPosition();
						    for(var i = 0; i < longCards.length; i++){
                                var card = longCards[i];
                                var cloneCard = card0.clone();
                                cloneCard.visible = true;
                                cloneCard.loadTexture(MjClient.cardPath_hengYang+"out" + card +".png");
                                if(i < 3){
                                    cloneCard.setPosition(cc.p(pos0.x + i*card0.width , pos0.y));
                                }else {
                                    cloneCard.setPosition(cc.p(pos0.x + (i-3)*card0.width  ,pos0.y - (card0.height + 5)));
                                }
                                cloneHead.addChild(cloneCard);
                            }

                            var text_Long = cloneHead.getChildByName("Text_Long");
                            text_Long.visible = longCards.length > 0;

                            var chuizi_tips = cloneHead.getChildByName("chuizi_tips"); 
                            chuizi_tips.setVisible(tData.areaSelectMode.isJiaChui);
                            var fileName = pl.jiachuiNum == 1 ? "playing/other/jiachuizi.png" : "playing/other/buchui.png";
                            chuizi_tips.loadTexture(fileName);


						    var showIndex = (index - selfIndex + tData.maxPlayer) % tData.maxPlayer;
						    addWxHeadToEndUI_shaoYang(cloneHead,showIndex);
				   		}
				   	},
				},
				showInfo:{
				   	diPai:{
				   		title:{
				   			_visible:false
				   		},
				   		_run:function(){
				   			var sData = MjClient.data.sData;
				   			var tData = sData.tData;
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
				   	listView:{
				   		_visible: false,
				   		_run:function(){
				   			var tData = MjClient.data.sData.tData;
				   			if(tData.winner == -1){
				   				return;
				   			}
				   			this.visible = true;
				   			this.setScrollBarEnabled(true);
				   			var itemModel = this.children[0];
				   			this.setItemModel(itemModel);
				   			this.removeAllChildren();
				   			var listView = this;
				   			var getItem = function(name,mult){
				   				listView.pushBackDefaultItem();
				   				var children = listView.children;
				   				var insertItem = children[children.length-1];
				   				return insertItem;
				   			};

					   		var sData = MjClient.data.sData;
					   		var players = sData.players;
					   		var pl = players[tData.uids[tData.winner] + ""];
					   		var item = null;
					   		// if(pl.hzdesc.wangCards){
					   		// 	var wangCards = pl.hzdesc.wangCards;
					   		// 	for(var i = 0;i < wangCards.length;i++){
					   		// 		item = getItem();
					   		// 		var card = wangCards[i];
					   		// 		item.getChildByName("imgName").visible = false;
					   		// 		item.getChildByName("count").visible = false;
					   		// 		var imgLeft = item.getChildByName("imgLeft");
					   		// 		imgLeft.visible = true;
					   		// 		imgLeft.loadTexture("playing/paohuzi/out" + 91 + ".png");
					   		// 		var imgRight = item.getChildByName("imgRight");
					   		// 		imgRight.visible = true;
					   		// 		imgRight.loadTexture("playing/paohuzi/out" + card + ".png");
					   		// 	}
					   		// }
				   			if(pl.hzdesc.xing){
				   				item = getItem();
				   				item.getChildByName("imgName").loadTexture("playing/paohuzi/xing.png");
				   				item.getChildByName("count").setString(pl.hzdesc.xing);
				   			}
				   			if(pl.hzdesc.ziMo){
				   				item = getItem();
				   				item.getChildByName("imgName").loadTexture("playing/paohuzi/zimo.png");
                                item.getChildByName("count").setString("");
                                if(MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA||MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG){
                                    item.getChildByName("count").setString("x" +pl.hzdesc.ziMo);
                                }else if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
                                	item.getChildByName("count").setString("+" +pl.hzdesc.ziMo);
                                }
				   			}
				   			if(pl.hzdesc.hongHu){
				   				item = getItem();
				   				item.getChildByName("imgName").loadTexture("playing/paohuzi/honghu.png");
				   				if(MjClient.gameType != MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
				   					item.getChildByName("count").setString("x"+pl.hzdesc.hongHu);
				   				}else{
				   					if(tData.maxPlayer == 4){
				   						item.getChildByName("count").setString("+"+pl.hzdesc.hongHu);
				   					}
				   				}
				   			}
				   			// if(pl.hzdesc.yidianZhu){
				   			// 	item = getItem();
				   			// 	item.getChildByName("imgName").loadTexture("playing/paohuzi/yidianzhu.png");
				   			// 	item.getChildByName("count").setString("x"+pl.hzdesc.yidianZhu);
				   			// }
				   			if(pl.hzdesc.heiHu){
				   				item = getItem();
				   				item.getChildByName("imgName").loadTexture("playing/paohuzi/heihu.png");
				   				if(MjClient.gameType != MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
				   					item.getChildByName("count").setString("x"+pl.hzdesc.heiHu);			
				   				}else{
				   					if(tData.maxPlayer == 4){
				   						item.getChildByName("count").setString("+"+pl.hzdesc.heiHu);
				   					}else{
				   						item.getChildByName("count").setString("="+pl.hzdesc.heiHu);
				   					}
				   				}
				   			}
				   			// if(pl.hzdesc.hongZhuanZhu){
				   			// 	item = getItem();
				   			// 	item.getChildByName("imgName").loadTexture("playing/paohuzi/HZZ.png");
				   			// 	item.getChildByName("count").setString(pl.hzdesc.hongZhuanZhu);
				   			// }
				   			// if(pl.hzdesc.hongZhuanHei){
				   			// 	item = getItem();
				   			// 	item.getChildByName("imgName").loadTexture("playing/paohuzi/hzh.png");
				   			// 	item.getChildByName("count").setString(pl.hzdesc.hongZhuanHei);
				   			// }
				   			// if(pl.hzdesc.wangZhaWang){
				   			// 	item = getItem();
				   			// 	item.getChildByName("imgName").loadTexture("playing/paohuzi/wangzhawang.png");
				   			// 	item.getChildByName("count").setString(pl.hzdesc.wangZhaWang);
				   			// }
				   			// if(pl.hzdesc.wangZha){
				   			// 	item = getItem();
				   			// 	item.getChildByName("imgName").loadTexture("playing/paohuzi/wangzha.png");
				   			// 	item.getChildByName("count").setString(pl.hzdesc.wangZha);
				   			// }
				   			// if(pl.hzdesc.wangChuangWang){
				   			// 	item = getItem();
				   			// 	item.getChildByName("imgName").loadTexture("playing/paohuzi/wangchuangw.png");
				   			// 	item.getChildByName("count").setString(pl.hzdesc.wangChuangWang);
				   			// }
				   			// if(pl.hzdesc.wangChuang){
				   			// 	item = getItem();
				   			// 	item.getChildByName("imgName").loadTexture("playing/paohuzi/wangchuang.png");
				   			// 	item.getChildByName("count").setString(pl.hzdesc.wangChuang);
				   			// }
				   			// if(pl.hzdesc.wangDiaoWang){
				   			// 	item = getItem();
				   			// 	item.getChildByName("imgName").loadTexture("playing/paohuzi/wangdiaowang.png");
				   			// 	item.getChildByName("count").setString(pl.hzdesc.wangDiaoWang);
				   			// }
				   			// if(pl.hzdesc.wangDiao){
				   			// 	item = getItem();
				   			// 	item.getChildByName("imgName").loadTexture("playing/paohuzi/wangdiao.png");
				   			// 	item.getChildByName("count").setString(pl.hzdesc.wangDiao);
				   			// }
                            // if(pl.hzdesc.quanHong){
                             //    item = getItem();
                             //    item.getChildByName("imgName").loadTexture("playing/paohuzi/quanhong.png");
                             //    item.getChildByName("count").setString(pl.hzdesc.quanHong);
                            // }
                            // if(pl.hzdesc.totalFan == 1){
                             //    item = getItem();
                             //    item.getChildByName("imgName").loadTexture("playing/paohuzi/pinghu.png");
                             //    item.getChildByName("count").setString("1");
							// }
                            if(pl.hzdesc.daKaHu){
                                item = getItem();
                                item.getChildByName("imgName").loadTexture("playing/paohuzi/daka.png");
                                item.getChildByName("count").setString(pl.hzdesc.daKaHu);
                            }
                            if(pl.hzdesc.juShou){
                                item = getItem();
                                item.getChildByName("imgName").loadTexture("playing/paohuzi/jushou.png");
                                item.getChildByName("count").setString("x"+pl.hzdesc.juShou);
                            }
                            if(pl.hzdesc.tianHu){
                                item = getItem();
                                item.getChildByName("imgName").loadTexture("playing/paohuzi/tianhu.png");
                                item.getChildByName("count").setString("x"+pl.hzdesc.tianHu);
                                if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
                                	var addText = tData.areaSelectMode.tianDiHuType == 1 ? "x" : "+";    
				   					item.getChildByName("count").setString(addText+pl.hzdesc.tianHu);
				   				}
                            }
                            if(pl.hzdesc.wuHu){
                                item = getItem();
                                item.getChildByName("imgName").loadTexture("playing/paohuzi/wuhu.png");
                                item.getChildByName("count").setString(pl.hzdesc.wuHu);
                            }
                            if(pl.hzdesc.xiaoKaHu){
                                item = getItem();
                                item.getChildByName("imgName").loadTexture("playing/paohuzi/xiaoka.png");
                                item.getChildByName("count").setString(pl.hzdesc.xiaoKaHu);
                            }
                            if(pl.hzdesc.yiDianHong){
                                item = getItem();
                                item.getChildByName("imgName").loadTexture("playing/paohuzi/yidian.png");
                                item.getChildByName("count").setString("x"+pl.hzdesc.yiDianHong);
                            }
                            if(pl.hzdesc.daHong){
                                item = getItem();
                                item.getChildByName("imgName").loadTexture("playing/paohuzi/dahong.png");
                                item.getChildByName("count").setString("x"+pl.hzdesc.daHong);
                            }
                            if(pl.hzdesc.diHu){
                                item = getItem();
                                item.getChildByName("imgName").loadTexture("playing/paohuzi/dihu.png");
                                item.getChildByName("count").setString("x"+pl.hzdesc.diHu);
                                if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
                                	var addText = tData.areaSelectMode.tianDiHuType == 1 ? "x" : "+";  
				   					item.getChildByName("count").setString(addText+pl.hzdesc.diHu); 
				   				}
                            }
                            if(pl.hzdesc.haiDiHu){
                                item = getItem();
                                item.getChildByName("imgName").loadTexture("playing/paohuzi/haidihu.png");
                                item.getChildByName("count").setString("x"+pl.hzdesc.haiDiHu);
                            }
                            if(pl.hzdesc.xiaoHong){
                                item = getItem();
                                item.getChildByName("imgName").loadTexture("playing/paohuzi/xiaohong.png");
                                item.getChildByName("count").setString("x"+pl.hzdesc.xiaoHong);
                            }
                       		if(pl.hzdesc.yiDianZhu){
                                item = getItem();
 				   				item.getChildByName("imgName").loadTexture("playing/paohuzi/yidianzhu.png");
				   				item.getChildByName("count").setString("x"+pl.hzdesc.yiDianZhu);
                            }
                            if(pl.hzdesc.xiaoHongHu){
                            	item = getItem();
                                item.getChildByName("imgName").loadTexture("playing/paohuzi/xiaohong.png");
                                item.getChildByName("count").setString("x"+pl.hzdesc.xiaoHongHu);                            
                            }
                          	if(pl.hzdesc.daHongHu){
                            	item = getItem();
                                item.getChildByName("imgName").loadTexture("playing/paohuzi/dahong.png");    
                                item.getChildByName("count").setString("="+pl.hzdesc.daHongHu);                        
                            }
				   		}
				   	},
				   	cardInfo:{
				   		info:{
				   			_visible:false
				   		},
				   		_run:function(){
					   		var sData = MjClient.data.sData;
					   		var tData = sData.tData;
				   			if(tData.winner == -1){
				   				return;
				   			}
					   		var players = sData.players;
					   		var pl = players[tData.uids[tData.winner] + ""];

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

				   			var bgSize = this.getCustomSize();
				   			var off_x = (bgSize.width - 7*42)/6-13;
				  			var info = this.getChildByName("info");
                            var mjSortArr = pl.mjsort;
                            var handSortArr = pl.handSort;
				   			var startPos = cc.p((bgSize.width-(mjSortArr.length+handSortArr.length)*42-(handSortArr.length+mjSortArr.length-1)*off_x)/2+21,info.x - 10);
							for(k = 0;k < mjSortArr.length;k++){
						        var mjsort = mjSortArr[k];
						        var pos = mjsort.pos;
						        var name = mjsort.name;
						        var cardNum = 0;
						        //提
						        if(name == "mjgang1"){
						            cardNum = pl.mjgang1[pos];
						            clone = info.clone();
						            clone.visible = true;
						            clone.getChildByName("title").loadTexture("playing/paohuzi/ti.png");
						            for(i = 1;i <= 4;i++){
						                var up = clone.getChildByName("card" + i);
						                up.loadTexture(MjClient.cardPath_hengYang+"out" + cardNum + ".png");
						                if(i==4 && isHand == false && cardNum == huCard){
                                            setHuCardMark(up);
										}
						            }
						            var huxi = huXiScore_hengYang("tiPai",cardNum);
						            clone.setString(huxi);
						            clone.setPosition(startPos);
						            this.addChild(clone);
						            startPos = cc.p(startPos.x + off_x + 42,startPos.y);
						        }
						        //偎
						        if(name == "mjwei"){
						            cardNum = pl.mjwei[pos]; 
						            clone = info.clone();
						            clone.visible = true;
						            clone.getChildByName("title").loadTexture("playing/paohuzi/wei.png");
						            for(i = 1;i <= 4;i++){
						                var up = clone.getChildByName("card" + i);
						                if(i == 4){
						                	up.visible = false;
						                }else{
						                	up.loadTexture(MjClient.cardPath_hengYang+"out" + cardNum + ".png");
						                }
                                        if(i==3 && isHand == false && cardNum == huCard){
                                            setHuCardMark(up);
                                        }
						            }
						            var huxi = huXiScore_hengYang("weiPai",cardNum);
						            clone.setString(huxi);
						            clone.setPosition(startPos);
						            this.addChild(clone);
						            startPos = cc.p(startPos.x + off_x + 42,startPos.y);
						        }
						        //跑
						        if(name == "mjgang0"){
						            cardNum = pl.mjgang0[pos];
						            clone = info.clone();
						            clone.visible = true;
						            clone.getChildByName("title").loadTexture("playing/paohuzi/pao.png");
						            for(i = 1;i <= 4;i++){
						                var up = clone.getChildByName("card" + i);
						                up.loadTexture(MjClient.cardPath_hengYang+"out" + cardNum + ".png");
                                        if(i==4 && isHand == false && cardNum == huCard){
                                            setHuCardMark(up);
                                        }
						            }
						            var huxi = huXiScore_hengYang("paoPai",cardNum);
						            clone.setString(huxi);
						            clone.setPosition(startPos);
						            this.addChild(clone);
						            startPos = cc.p(startPos.x + off_x + 42,startPos.y);
						        }
						        //碰
						        if(name == "mjpeng"){
						            cardNum = pl.mjpeng[pos];
						            clone = info.clone();
						            clone.visible = true;
						            clone.getChildByName("title").loadTexture("playing/paohuzi/peng.png");
						            for(i = 1;i <= 4;i++){
						                var up = clone.getChildByName("card" + i);
						               	if(i == 4){
						               		up.visible = false;
						               	}else{
						               		up.loadTexture(MjClient.cardPath_hengYang+"out" + cardNum + ".png");
						               	}
						            }
						            var huxi = huXiScore_hengYang("peng",cardNum);
						            clone.setString(huxi);
						            clone.setPosition(startPos);
						            this.addChild(clone);
						            startPos = cc.p(startPos.x + off_x + 42,startPos.y);
						        }
						        //吃
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

						            var eatCards = pl.mjchi[pos].eatCards;
						            clone = info.clone();
						            clone.visible = true;
						            clone.getChildByName("title").loadTexture("playing/paohuzi/chi.png");
						            for(i = 1;i <= 4;i++){
						            	var up = clone.getChildByName("card" + i);
						            	var card = eatCards[i-1];
						            	if(card){
						            		up.loadTexture(MjClient.cardPath_hengYang+"out" + card + ".png");
						            	}else{
						            		up.visible = false;
						            	}
						            	if(i == 3){
						            		up.setColor(cc.color(170, 170, 170));
										}
						            }
						            var huxi = getHuXi(eatCards);
						            clone.setString(huxi);
						            clone.setPosition(startPos);
						            this.addChild(clone);
						            startPos = cc.p(startPos.x + off_x + 42,startPos.y);

						            var biCards = pl.mjchi[pos].biCards;
						            if(biCards && biCards.length > 0){
						            	//计算坐标
						            	for(var m = 0;m < biCards.length;m++){
						            		var biArr = biCards[m];
							            	clone = info.clone();
								            clone.visible = true;
								            clone.getChildByName("title").loadTexture("playing/paohuzi/chi.png");
								            for(i = 1;i <= 4;i++){
								            	var up = clone.getChildByName("card" + i);
								            	var card = biArr[i-1];
								            	if(card){
								            		up.loadTexture(MjClient.cardPath_hengYang+"out" + card + ".png");
								            	}else{
								            		up.visible = false;
								            	}
                                                if(i == 3){
                                                    up.setColor(cc.color(170, 170, 170));
                                                }
								            }
								          	var huxi = getHuXi(biArr);
							            	clone.setString(huxi);
							            	clone.setPosition(startPos);
							            	this.addChild(clone);
							            	startPos = cc.p(startPos.x + off_x + 42,startPos.y);
						            	}      
						            }
						        }
						    }

						    //手牌
						    for(var index in handSortArr){
						    	var handSort = handSortArr[index];
						    	clone = info.clone();
					            clone.visible = true;
					            if(handSort.name){
					            	if(handSort.name == "chi"){
					            		clone.getChildByName("title").loadTexture("playing/paohuzi/chi.png");
					            	}
					            	if(handSort.name == "kan"){
					            		clone.getChildByName("title").loadTexture("playing/paohuzi/kan.png");
					            	}
					            	if(handSort.name == "ti"){
					            		clone.getChildByName("title").loadTexture("playing/paohuzi/ti.png");
					            	}
					            	if(handSort.name == "peng"){
                                        clone.getChildByName("title").loadTexture("playing/paohuzi/peng.png");
									}
					            }else{
					            	clone.getChildByName("title").visible = false;
					            }
					            
					            var cards = handSort.cards;
					            var cardNum = 0;
					            for (var i = 0; i < pl.mjhand.length; i++) {
					            	if (pl.mjhand[i] == tData.lastPutCard) {
					            		cardNum++;
					            	}
					            }

					            for(i = 4;i >= 1; i--) {
					            	var up = clone.getChildByName("card" + i);
					            	var card = cards[i-1];
					            	if(card){
					            		up.loadTexture(MjClient.cardPath_hengYang+"out" + card + ".png");
					            	}else{
					            		up.visible = false;
					            	}

					            	if (!(cardNum == 4 && cards[0] == tData.lastPutCard && cards.length == 3 && cards[0] == cards[1] && cards[0] == cards[2])) {
					            		if (isHand && card == huCard){
					            		    setHuCardMark(up);
					            		    isHand = false;
					            		}
					            	}
					            }
					            clone.setString(handSort.score);
					            clone.setPosition(startPos);
					            this.addChild(clone);
					            startPos = cc.p(startPos.x + off_x + 42,startPos.y);
						    }
				   		}
				   	},
				   	scoreInfo:{
				   		_visible: false,
				   		tun:{
				   			_run:function(){
				   				if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI || 
				   					MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI)
				   				{
				   					this.setVisible(false);
				   				}				   				
				   			}
				   		},
				   		fan:{
				   			_run:function(){
				   				if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
				   					this.setVisible(false);
				   				}				   				
				   			}
				   		},				   		
				   		total:{
				   			_run:function(){
				   				if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
				   					this.setVisible(false);
				   				}				   				
				   			}
				   		},
				   		huxiScore:{
				   			_run:function(){
				   				var sData = MjClient.data.sData;
					   			var tData = sData.tData;
						   		if(tData.winner == -1){
				   					return;
				   				}
				   				this.getParent().visible = true;
				   				var players = sData.players;
					   			var pl = players[tData.uids[tData.winner] + ""];
					   			this.setString(pl.hzdesc.huXi);
					   			this.ignoreContentAdaptWithSize(true);
				   			}
				   		},
				   		tunScore:{
				   			_run:function(){
				   				if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI || 
				   					MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI)
				   				{
				   					this.setVisible(false);
				   				}
				   				var sData = MjClient.data.sData;
					   			var tData = sData.tData;
					   			if(tData.winner == -1){
				   					return;
				   				}
				   				this.getParent().visible = true;
				   				var players = sData.players;
					   			var pl = players[tData.uids[tData.winner] + ""];
					   			this.setString(pl.hzdesc.totalTun);
                                this.ignoreContentAdaptWithSize(true);
				   			}
				   		},
				   		fanScore:{
				   			_run:function(){
				   				if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
				   					this.setVisible(false);
				   				}
				   				var sData = MjClient.data.sData;
					   			var tData = sData.tData;
					   			if(tData.winner == -1){
				   					return;
				   				}
				   				this.getParent().visible = true;
				   				var players = sData.players;
					   			var pl = players[tData.uids[tData.winner] + ""];
					   			this.setString(pl.hzdesc.totalFan);
                                this.ignoreContentAdaptWithSize(true);
				   			}
				   		},
				   		totalScore:{
				   			_run:function(){
				   				if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
				   					this.setVisible(false);
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
			},
			main:{
				_run:function(){
					MjClient.endoneui.gameMain = this;

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
						addWinMjHand_shaoYang(this, MjClient.data.sData.tData.maxPlayer - 1);
						if(MjClient.rePlayVideo != -1){
	                    	this.visible = false;
	                    }
					}
				},
				rightPanel:{
					_run:function(){
						if(MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG){
							addWinMjHand_shaoYang(this, MjClient.data.sData.tData.maxPlayer - 2);
						}else{
							var tData = MjClient.data.sData.tData;
							addWinMjHand_shaoYang(this, MjClient.data.sData.tData.maxPlayer - 2);
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
	                    	if(tData.maxPlayer == 3){
	                    		this.setVisible(false);
							}
	                        addWinMjHand_shaoYang(this,1);
                    	}
                    	if(MjClient.rePlayVideo != -1){
	                    	this.visible = false;
	                    }
                    }
				}
			}
		},
	},
    ctor:function () {
        this._super();
        MjClient.endoneui=this;
        var endoneui = ccs.load("endOne_zplychz.json");
		BindUiAndLogic(endoneui.node,this.jsBind);
        this.addChild(endoneui.node);
 		return true;
    }
});

//添加手牌
function addWinMjHand_shaoYang(_node,off) {
	var sData = MjClient.data.sData;
    var tData = sData.tData;
    if(MjClient.GAME_TYPE.PAO_HU_ZI_SR == MjClient.gameType){
    	off = getOffByXing_shaoyang(off);
    }

	//fix by 千千
    var pl = getUIPlayer_hengYang(off);
    var copyMjhand = pl.mjhand.concat();
    // 胡家手牌 去掉桌面当前展示牌
    if (tData.currCard != -1 && tData.winner != -1 && pl.info.uid == tData.uids[tData.winner]) {
    	copyMjhand.pop();
    }

    // if(tData.currCard != -1) {
    // 	//删掉手牌里胡的牌
    // 	if(tData.uids[tData.winner] != MjClient.data.pinfo._id && 
    // 		tData.uids[tData.winner] == pl.info._id)
    // 	{
    // 		if(isPaoHu_paohuzi(MjClient.data.sData.players[tData.uids[tData.winner]], tData.currCard)){
    // 			//删显示的牌
    // 			delPutCard_paohuzi(off);
    // 		}else{
    // 			//删手牌
    // 			copyMjhand.pop();
    // 		}
    // 	}
    // }

    var sortArr = MjClient.majiang.sortHandCardSpecial(copyMjhand);
    //end
    
    //按照产品需求，邵阳字牌2人玩法对家结算手牌移动到头像旁边
    if((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) &&
     (MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI ||
      MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI ||
      MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG ||
      MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA ||
      MjClient.gameType == MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO)){
      	if(MjClient.MaxPlayerNum_leiyang == 2) {
      		_node.x -= 80;
      		_node.y += 214;
      		_node.setScale(_node.getScale()*0.7);
      	}
    }

	//根据牌的类型获得需要添加的节点
	var cardNode = _node.getChildByName("card");
	for(var i = 0;i < sortArr.length;i++){
		var cardParent = new cc.Node();
		if (_node.getName() == "rightPanel"){
			cardParent.x = _node.width - i * cardNode.width;
			cardParent.y = _node.height;
			if(MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG && tData.maxPlayer == 2){
				cardParent.y = _node.height + 80;
			}
		}else if (_node.getName() == "leftPanel"){
			cardParent.x = i * cardNode.width;
			cardParent.y = _node.height;
		}else if (_node.getName() == "xingPanel"){
			cardParent.x = _node.width - i * cardNode.width;
			cardParent.y = 0;
		}
		_node.addChild(cardParent);

		cc.log("winGame_ZPLYPHZ@@@");
		var childSort = sortArr[i];
        for(var j = 0;j < childSort.length;j++){
			var card = childSort[j];
			var clone = cardNode.clone();
			clone.visible = true;
			clone.loadTexture(MjClient.cardPath_hengYang+"out" + card +".png");
			var off_y = 0;
			if(_node.getName() == "rightPanel"){
				off_y = clone.height;
				clone.anchorX = 1;
				clone.anchorY = 0;
			}else if(_node.getName() == "leftPanel"){
				off_y = clone.height;
				clone.anchorX = 0;
				clone.anchorY = 0;
			}else if(_node.getName() == "xingPanel"){
                off_y = clone.height;
                clone.anchorX = 1;
                clone.anchorY = 0;
            }

   //         	if(_node.getName() == "rightPanel"){
			// 	off_y = -clone.height;
			// 	clone.anchorX = 1;
			// 	clone.anchorY = 1;
			// }else if(_node.getName() == "leftPanel"){
			// 	off_y = -clone.height;
			// 	clone.anchorX = 0;
			// 	clone.anchorY = 1;
			// }else if(_node.getName() == "xingPanel"){
   //              off_y = clone.height;
   //              clone.anchorX = 1;
   //              clone.anchorY = 0;
   //          }

			clone.zIndex = j;
			clone.x = 0;
			clone.y = ( j -2 - 54 /42)* off_y;
			cardParent.addChild(clone);
        }
	}	
}