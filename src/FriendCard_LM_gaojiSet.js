/** 
 * @Description: 联盟 - 亲友圈高级设置界面 - 使用独立UI
 */

 //使用独立的UI 和房卡的高级设置不一样
var Friendcard_LM_gaojiSet = cc.Layer.extend({
	_dissolveTimeConfig:[0,1,3,5,15,10],
	_kickOutDayConfig:[10,20,30],
    ctor:function (data,clubId) {
        this._super();
        this.clubId = clubId;
        this.data = data || null;
        var node = ccs.load("friendcard_LM_gaojiSet.json").node;
        this.addChild(node);
        this.node = node;
        this.panel = node.getChildByName("Panel");
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5,0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Panel"), [1, 1], [0.5,0.5], [0, 0]);

        popupAnm(this.panel);

        this.initGaojiSetLayer();
        this.setDefaultOption(data);

        var that = this;
        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function(touch, event){
        		that.hidePanelListSelector()
            }
        }), this.Image_title);
    },
    hidePanelListSelector:function() {
    	for(var i = 0 ; i < this._panelListSelector.length; i++){
    		this._panelListSelector[i].visible = false;
    		this._panelListSelector[i].getParent().zIndex = 0;
    	}
    },
    setTimeStr:function(sender,hour,minute){
    	if(typeof(hour) !== 'undefined'){
			sender._hour = hour;
    		sender._minute = minute;
    	}
    	var timeStr = "" + (sender._hour >= 10 ? sender._hour : ("0"+sender._hour))+":";
    	timeStr += (sender._minute >= 10 ? sender._minute : ("0"+sender._minute));
    	sender._textUI.setString(timeStr)
    },
     //init高级设置界面
    initGaojiSetLayer:function()
    {
    	var that = this;
    	var Image_title 	= 	this.panel.getChildByName("ScrollView").getChildByName("play_panel");
		var saveBtn 		= 	this.panel.getChildByName("saveBtn");
		var close 			= 	this.panel.getChildByName("close");
		var play_jieSan 	= 	Image_title.getChildByName("play_jieSan");
		var play_jieSanTime = 	Image_title.getChildByName("play_jieSanTime");
		var play_antiCheat 	= 	Image_title.getChildByName("play_antiCheat");
		play_antiCheat.visible = false;

		this.Image_title = Image_title;
		closeBtnAddLight(close);

		this._panelListSelector = [];//需要另外弹出面板的view，点击其他地方需要隐藏

		this.play_dingshidayang = Image_title.getChildByName("play_dingshidayang");
		this.play_dingshidayang.getChildByName("text").addTouchEventListener(function(sender, type) {
			if (type != 2)
				return;

			that.runAction(cc.callFunc(function() {
                that.onClickDingShiDaYang();
            }));    
		}, this);

		this.play_dingshidayang._startTimeUI = this.play_dingshidayang.getChildByName("image_date1_bg");
		this.play_dingshidayang._startTimeUI._textUI = this.play_dingshidayang._startTimeUI.getChildByName("text")
		this.play_dingshidayang._startTimeUI._textUI.ignoreContentAdaptWithSize(true);
		this.play_dingshidayang._endTimeUI = this.play_dingshidayang.getChildByName("image_date2_bg");
		this.play_dingshidayang._endTimeUI._textUI = this.play_dingshidayang._endTimeUI.getChildByName("text")
		this.play_dingshidayang._endTimeUI._textUI.ignoreContentAdaptWithSize(true);

		this.play_dingshidayang._startTimeUI.addTouchEventListener(function(sender,type){
            if(type == 2){
            	sender._point = sender.convertToWorldSpace(sender.getAnchorPointInPoints());
	        	sender._point.y = (sender._point.y-sender.getBoundingBox().height/2);
	            
	            var point = sender._point;
	            var data = {
	            	px:point.x,
	            	py:point.y,
	            	WASD:"S",
	            	hour:sender._hour,
	            	minute:sender._minute
	            };
	            that.node.addChild(new friendcard_selectTime2(data,function(result){
	            	that.setTimeStr(sender,result.hour,result.minute);
	            }));
            }
            
		})
		this.play_dingshidayang._endTimeUI.addTouchEventListener(function(sender,type){
            if(type == 2){
            	sender._point = sender.convertToWorldSpace(sender.getAnchorPointInPoints());
	        	sender._point.y = (sender._point.y-sender.getBoundingBox().height/2);
	            var point = sender._point;
	            var data = {
	            	px:point.x,
	            	py:point.y,
	            	WASD:"S",
	            	hour:sender._hour,
	            	minute:sender._minute
	            };
	            that.node.addChild(new friendcard_selectTime2(data,function(result){
	            	that.setTimeStr(sender,result.hour,result.minute);
	            }));
            }
            
		})

		this.play_jiesanList = play_jieSan.getChildByName("panel");
		this._panelListSelector.push(this.play_jiesanList);
		this.img_jiesanKuang = play_jieSan.getChildByName("Image_di");
		this.text_jieshan = play_jieSan.getChildByName("text_jieSan")
        this.Button_sanjiao_jiesan = play_jieSan.getChildByName("Button_sanjiao");
		
		this.img_jiesanKuang.touchEnabled = true;
		this.img_jiesanKuang.addTouchEventListener(function(sender, type) {
			if (type == 2){	
				if(FriendCard_Common.getSkinType() == 1){
                	this.Button_sanjiao_jiesan.setBright(false);
            	}
            	this.hidePanelListSelector();
				this.play_jiesanList.visible = true;
				this.play_jiesanList.getParent().zIndex = 1;
			}
		}, this);

		this.play_jiesanTimeList = play_jieSanTime.getChildByName("panel");
		this._panelListSelector.push(this.play_jiesanTimeList);
		this.image_TimeKuang = play_jieSanTime.getChildByName("Image_di");
		this.text_jieshanTime = play_jieSanTime.getChildByName("text_jieSanTime");
		this.text_jieshanTime.ignoreContentAdaptWithSize(true);
        this.Button_sanjiao_jiesanTime = play_jieSanTime.getChildByName("Button_sanjiao");
		
		this.image_TimeKuang.touchEnabled = true;
		this.image_TimeKuang.addTouchEventListener(function(sender, type) {
			if (type == 2){
				if(FriendCard_Common.getSkinType() == 1){
	                this.Button_sanjiao_jiesanTime.setBright(false);
	            }
	            this.hidePanelListSelector();
				this.play_jiesanTimeList.visible = true;
				this.play_jiesanTimeList.getParent().zIndex = 1;
			}	
		}, this);

		var play_isKickOutNotLogin = 	Image_title.getChildByName("play_isKickOutNotLogin");
		this.play_isKickOutNotLogin = play_isKickOutNotLogin;
		this.play_isKickOutNotLogin.addTouchEventListener(function(sender, type) {
			if (type != 2)
				return;
			if(!sender.isSelected()){
				that.showKickOutNotLoginTip(that.gaojiSet_kickOutNotLoginIndex,function(type){
					if(type != 1){
						sender.setSelected(false);
					}
				});
			}
			
		}, this);
		COMMON_UI.setNodeTextAdapterSize(play_isKickOutNotLogin);
		this.play_kickOutNotLoginList = play_isKickOutNotLogin.getChildByName("panel");
		this._panelListSelector.push(this.play_kickOutNotLoginList);
		this.image_kickOutNotLogin = play_isKickOutNotLogin.getChildByName("Image_di");
		this.text_kickOutNotLogin = play_isKickOutNotLogin.getChildByName("text");
        this.Button_sanjiao_kickOutNotLogin = play_isKickOutNotLogin.getChildByName("Button_sanjiao");
		
		this.image_kickOutNotLogin.touchEnabled = true;
		this.image_kickOutNotLogin.addTouchEventListener(function(sender, type) {
			if (type == 2){
				if(FriendCard_Common.getSkinType() == 1){
	                this.Button_sanjiao_kickOutNotLogin.setBright(false);
	            }
	            this.hidePanelListSelector();
				this.play_kickOutNotLoginList.visible = true;
				this.play_kickOutNotLoginList.getParent().zIndex = 1;
			}	
		}, this);
		this.kickOutNotLoginNodeList = [];
		for (var i = 0; i < this._kickOutDayConfig.length; i ++) {
			this.kickOutNotLoginNodeList[i] = this.play_kickOutNotLoginList.getChildByName("Item" + i);
			this.kickOutNotLoginNodeList[i].index = i;
			this.kickOutNotLoginNodeList[i].getChildByName("text").setString("踢出"+this._kickOutDayConfig[i]+"天未登陆玩家   ")
			this.kickOutNotLoginNodeList[i].addTouchEventListener(function(sender, type) {
				if (type != 2)
					return;
				that.runAction(cc.callFunc(function() {
	                that.onClickKickOutNotLoginBtn(sender.index)
	            }));  
			}, this);
		}


		var play_isKickOutNotPlay = Image_title.getChildByName("play_isKickOutNotPlay");
		this.play_isKickOutNotPlay = play_isKickOutNotPlay;
		this.play_isKickOutNotPlay.addTouchEventListener(function(sender, type) {
			if (type != 2)
				return;
			if(!sender.isSelected()){
				that.showKickOutNotPlayTip(that.gaojiSet_kickOutNotLoginIndex,function(type){
					if(type != 1){
						sender.setSelected(false);
					}
				});
			}
		}, this);
		COMMON_UI.setNodeTextAdapterSize(play_isKickOutNotPlay);
		this.play_kickOutNotPlayList = play_isKickOutNotPlay.getChildByName("panel");
		this._panelListSelector.push(this.play_kickOutNotPlayList);
		this.image_kickOutNotPlay = play_isKickOutNotPlay.getChildByName("Image_di");
		this.text_kickOutNotPlay = play_isKickOutNotPlay.getChildByName("text");
        this.Button_sanjiao_kickOutNotPlay = play_isKickOutNotPlay.getChildByName("Button_sanjiao");
		
		this.image_kickOutNotPlay.touchEnabled = true;
		this.image_kickOutNotPlay.addTouchEventListener(function(sender, type) {
			if (type == 2){
				if(FriendCard_Common.getSkinType() == 1){
	                this.Button_sanjiao_kickOutNotPlay.setBright(false);
	            }
	            this.hidePanelListSelector();
				this.play_kickOutNotPlayList.visible = true;
				this.play_kickOutNotPlayList.getParent().zIndex = 1;
			}	
		}, this);
		this.kickOutNotPlayNodeList = [];
		for (var i = 0; i < this._kickOutDayConfig.length; i ++) {
			this.kickOutNotPlayNodeList[i] = this.play_kickOutNotPlayList.getChildByName("Item" + i);
			this.kickOutNotPlayNodeList[i].index = i;
        	this.kickOutNotPlayNodeList[i].getChildByName("text").setString("踢出"+this._kickOutDayConfig[i]+"天未玩牌玩家   ")

			this.kickOutNotPlayNodeList[i].addTouchEventListener(function(sender, type) {
				if (type != 2)
					return;
				that.runAction(cc.callFunc(function() {
	                that.onClickKickOutNotPlayBtn(sender.index)
	            }));  
			}, this);
		}


		//不满人不开桌
		this.play_unStartCount = Image_title.getChildByName("play_unStartCount");
		this.play_unStartCount.getChildByName("text").addTouchEventListener(function(sender, type) {
			if (type == 2){
				that.play_unStartCount.setSelected(!that.play_unStartCount.isSelected());
				if(that.play_unStartCount.isSelected())
					that.play_replay.setSelected(false);
			}
				
		}, this);

		this.play_unStartCount.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
					that.play_replay.setSelected(false);
					break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    
                    break;
            }
        });

        //是否可见统计清除分数
		this.play_allowToViewClearScore1 = Image_title.getChildByName("play_allowToViewClearScore1");
		this.play_allowToViewClearScore1.getChildByName("text").addTouchEventListener(function(sender, type) {
			if (type == 2)
				that.play_allowToViewClearScore1.setSelected(!that.play_allowToViewClearScore1.isSelected());
		}, this);

		this.play_allowToViewClearScore2 = Image_title.getChildByName("play_allowToViewClearScore2");
		this.play_allowToViewClearScore2.getChildByName("text").addTouchEventListener(function(sender, type) {
			if (type == 2)
				that.play_allowToViewClearScore2.setSelected(!that.play_allowToViewClearScore2.isSelected());
		}, this);

		this.play_isClubMasterNotDissolve = Image_title.getChildByName("play_isClubMasterNotDissolve");
		this.play_isClubMasterNotDissolve.getChildByName("text").addTouchEventListener(function(sender, type) {
			if (type == 2)
				that.play_isClubMasterNotDissolve.setSelected(!that.play_isClubMasterNotDissolve.isSelected());
		}, this);
		

        //禁用语音
		this.play_isForbVoice = Image_title.getChildByName("play_isForbVoice");
		this.play_isForbVoice.getChildByName("text").addTouchEventListener(function(sender, type) {
			if (type == 2)
				that.play_isForbVoice.setSelected(!that.play_isForbVoice.isSelected());
		}, this);

		//禁用聊天
		this.play_isForbChat = Image_title.getChildByName("play_isForbChat");
		this.play_isForbChat.visible = false;
		this.play_isForbChat.getChildByName("text").addTouchEventListener(function(sender, type) {
			if (type == 2)
				that.play_isForbChat.setSelected(!that.play_isForbChat.isSelected());
		}, this);

		this.play_isEmptyDeskFirst = Image_title.getChildByName("play_isEmptyDeskFirst");
		this.play_isEmptyDeskFirst.getChildByName("text").addTouchEventListener(function(sender, type) {
			if (type == 2)
				that.play_isEmptyDeskFirst.setSelected(!that.play_isEmptyDeskFirst.isSelected());
		}, this);

		//是否显示桌子
		this.play_isNoShowTable = Image_title.getChildByName("play_isNoShowTable");
		this.play_isNoShowTable.getChildByName("text").addTouchEventListener(function(sender, type) {
			if (type == 2)
				that.play_isNoShowTable.setSelected(!that.play_isNoShowTable.isSelected());
		}, this);

		//牌桌是否禁用攻击表情
		this.play_isNoAttackProp = Image_title.getChildByName("play_isNoAttackProp");
		this.play_isNoAttackProp.getChildByName("text").addTouchEventListener(function(sender, type) {
			if (type == 2)
				that.play_isNoAttackProp.setSelected(!that.play_isNoAttackProp.isSelected());
		}, this);

		//会长隐藏桌数,岳阳皮肤，湖北皮肤
		this.play_isHideChairmanTableCnt = Image_title.getChildByName("play_isHideChairmanTableCnt");
		if(this.play_isHideChairmanTableCnt){
			this.play_isHideChairmanTableCnt.getChildByName("text").addTouchEventListener(function(sender, type) {
				if (type == 2)
					that.play_isHideChairmanTableCnt.setSelected(!that.play_isHideChairmanTableCnt.isSelected());
			}, this);
		}
		
		//俱乐部大厅是否无法看到俱乐部人数
		this.play_isHideCount = Image_title.getChildByName("play_isHideCount");
		this.play_isHideCount.visible = false;
		this.play_isHideCount.getChildByName("text").addTouchEventListener(function(sender, type) {
			if (type == 2)
				that.play_isHideCount.setSelected(!that.play_isHideCount.isSelected());
		}, this);

		//联盟统计会长不可见
		this.play_isHideLeagueStatis = Image_title.getChildByName("play_isHideLeagueStatis");
		this.play_isHideLeagueStatis.getChildByName("text").addTouchEventListener(function(sender, type) {
			if (type == 2)
				that.play_isHideLeagueStatis.setSelected(!that.play_isHideLeagueStatis.isSelected());
		}, this);

		//限制解散次数
		this.play_isLimitDelRoom = Image_title.getChildByName("play_isLimitDelRoom");
		this.play_isLimitDelRoom.getChildByName("text").addTouchEventListener(function(sender, type) {
			if (type == 2)
				that.play_isLimitDelRoom.setSelected(!that.play_isLimitDelRoom.isSelected());
		}, this);

		//再来一局
		this.play_replay = Image_title.getChildByName("play_replay");
		if(this.play_replay){
			this.play_replay.visible = true;
			this.play_replay.getChildByName("text").addTouchEventListener(function(sender, type) {
				if (type == 2){
					that.play_replay.setSelected(!that.play_replay.isSelected());
					if(that.play_replay.isSelected())
						that.play_unStartCount.setSelected(false);
				}
					
			}, this);
			var btn_tip = this.play_replay.getChildByName("btn_tip");
			var image_tip = this.play_replay.getChildByName("image_tip");
			image_tip.visible = false;
			btn_tip.addTouchEventListener(function (sender, type) {
				if (type == 2) {
					image_tip.visible = true;
				}
			}, this);

			this.play_replay.addEventListener(function(sender,type)
			{
				switch (type) {
					case ccui.CheckBox.EVENT_SELECTED:
						that.play_unStartCount.setSelected(false);
						break;
					case ccui.CheckBox.EVENT_UNSELECTED:
						
						break;
				}
			});

			cc.eventManager.addListener({
				event: cc.EventListener.TOUCH_ONE_BY_ONE,
				swallowTouches: false,
				status: null,
				onTouchBegan: function(touch, event) {
					if (image_tip.isVisible()) {
						image_tip.setVisible(false);
						return true;
					} else {
						return false;
					}
				},
			}, image_tip);

		}
				
		

		// //允许玩家查看统计
		// this.play_isShowStats = Image_title.getChildByName("play_isShowStats");
		// this.play_isShowStats.getChildByName("text").addTouchEventListener(function(sender, type) {
		// 	if (type == 2)
		// 		that.play_isShowStats.setSelected(!that.play_isShowStats.isSelected());
		// }, this);

		//允许玩家查看统计
		this.statsList = [];
        for (var i = 0; i < 4; i++) {
        	this.statsList[i] = Image_title.getChildByName("play_isShowStats" + i);
        	if(!this.statsList[i])
        	{
        		this.statsList[i] = this.statsList[1].clone();
        		this.statsList[i].y = this.statsList[1].y;
        		Image_title.addChild(this.statsList[i]);
        		this.statsList[i].x = this.statsList[1].x + (this.statsList[1].x - this.statsList[2].x);
        		var text = this.statsList[i].getChildByName("text");
        		text.setString("今天")
        	}

        	this.statsList[i]._index = i;

        	this.statsList[i].addTouchEventListener(function(sender, type) {
				if (type != 2)
					return;

				that.runAction(cc.callFunc(function() {
                    that.onClickStats(sender._index);
                }));    
			}, this);

			this.statsList[i].getChildByName("text").addTouchEventListener(function(sender, type) {
				if (type != 2)
					return;

				that.runAction(cc.callFunc(function() {

					if(sender.getParent()._index == 0){
						that.statsList[0].setSelected(!that.statsList[0].isSelected());
					}
                    that.onClickStats(sender.getParent()._index);
                }));    
			}, this);
        }

        //踢出占位置的离线玩家
        var play_kickout = Image_title.getChildByName("play_kickout");
        //屏蔽是否踢出玩家时间
		this.play_kickoutList = [];
        for (var i = 0; i < 3; i++) {
        	this.play_kickoutList[i] = play_kickout.getChildByName("kickout" + i);
        	this.play_kickoutList[i]._index = i;

        	this.play_kickoutList[i].addTouchEventListener(function(sender, type) {
				if (type != 2)
					return;

				that.runAction(cc.callFunc(function() {
                    that.onClickKickout(sender._index);
                }));    
			}, this);

			this.play_kickoutList[i].getChildByName("text").addTouchEventListener(function(sender, type) {
				if (type != 2)
					return;

				that.runAction(cc.callFunc(function() {
                    that.onClickKickout(sender.getParent()._index);
                }));    
			}, this);
        }

        //隐藏已开打桌子桌子
        var play_hideTable = Image_title.getChildByName("play_hideTable");
		this.play_hideTableList = [];
        for (var i = 0; i < 4; i++) {
        	var node = play_hideTable.getChildByName("hidetable" + (i+1));
        	if (!node) {
        		continue;
        	}
        	this.play_hideTableList[i] = node;
        	this.play_hideTableList[i]._index = i;

        	this.play_hideTableList[i].addTouchEventListener(function(sender, type) {
				if (type != 2)
					return;

				that.runAction(cc.callFunc(function() {
                    that.onClickHideTable(sender._index);
                }));    
			}, this);

			this.play_hideTableList[i].getChildByName("text").addTouchEventListener(function(sender, type) {
				if (type != 2)
					return;

				that.runAction(cc.callFunc(function() {
                    that.onClickHideTable(sender.getParent()._index);
                }));    
			}, this);
        }

		//开启邀请
		this.play_isCanInvite = Image_title.getChildByName("play_isCanInvite");
		this.play_isCanInvite.getChildByName("text").addTouchEventListener(function(sender, type) {
			if (type == 2)
				that.play_isCanInvite.setSelected(!that.play_isCanInvite.isSelected());
		}, this);

		//是否开启准备
		this.play_isNeedReady = Image_title.getChildByName("play_isNeedReady");
		this.play_isNeedReady.getChildByName("text").addTouchEventListener(function(sender, type) {
			if (type == 2)
				that.play_isNeedReady.setSelected(!that.play_isNeedReady.isSelected());
		}, this);

		if(!FriendCard_Common.IsOpeNeedReady())
		{
			this.play_isNeedReady.visible = false;  //是否准备屏蔽 占时不上
		}

		//是否同屏玩法
		this.displayList = [];
        for (var i = 1; i < 3; i++) {
        	this.displayList[i] = Image_title.getChildByName("play_display" + i);
        	this.displayList[i].index = i;

        	this.displayList[i].addTouchEventListener(function(sender, type) {
				if (type != 2)
					return;

				that.runAction(cc.callFunc(function() {
                    that.onClickDisplay(sender.index);
                }));    
			}, this);

			this.displayList[i].getChildByName("text").addTouchEventListener(function(sender, type) {
				if (type != 2)
					return;

				that.runAction(cc.callFunc(function() {
                    that.onClickDisplay(sender.getParent().index);
                }));    
			}, this);
        }

        //满人桌子是否排前面
		this.sortordList = [];
        for (var i = 1; i <= 4; i++) {

        	var sortordNode = Image_title.getChildByName("play_sortord" + i);
        	if(!sortordNode){
        		continue;
        	}
        	this.sortordList.push(sortordNode);
        	sortordNode.index = i;

        	sortordNode.addTouchEventListener(function(sender, type) {
				if (type != 2)
					return;

				that.runAction(cc.callFunc(function() {
                    that.onClickSortord(sender.index);
                }));    
			}, this);

			sortordNode.getChildByName("text").addTouchEventListener(function(sender, type) {
				if (type != 2)
					return;

				that.runAction(cc.callFunc(function() {
                    that.onClickSortord(sender.getParent().index);
                }));    
			}, this);
        }

		//添加互斥名单
		// var btn_mutex = this._node_3.getChildByName("btn_mutex");
		// btn_mutex.visible = this._data ? true:false;
		// btn_mutex.addTouchEventListener(function(sender, type) {
		// if (type == 2)
		// 	MjClient.Scene.addChild(new Friendcard_LM_mutexLayer(that._data.info.clubId));
		// }, this);
		
		//解散方式
		this.jieSanNodeList = [];
		for (var i = 0; i < 3; i ++) {
			this.jieSanNodeList[i] = this.play_jiesanList.getChildByName("jiesan" + i);
			this.jieSanNodeList[i].index = i;
			this.jieSanNodeList[i].addTouchEventListener(function(sender, type) {
				if (type != 2)
					return;

				that.runAction(cc.callFunc(function() {
                    that.onClickJieSanBtn(sender.index);
                }));    
			}, this);
		}

		//解散时间 
		this.jieSanTimeNodeList = [];
		for (var i = 0; i < this._dissolveTimeConfig.length; i ++) {
			this.jieSanTimeNodeList[i] = this.play_jiesanTimeList.getChildByName("jiesan" + i);
			this.jieSanTimeNodeList[i].index = i;
			this.jieSanTimeNodeList[i].addTouchEventListener(function(sender, type) {
				if (type != 2)
					return;

				that.runAction(cc.callFunc(function() {
                    that.onClickJieSanTimeBtn(sender.index);
                }));    
			}, this);
		}

		//防作弊
		this.antiCheatList = [];
		for (i = 0; i < 5; i ++) {
			this.antiCheatList[i] = play_antiCheat.getChildByName("antiCheat_" + (i + 1));
			this.antiCheatList[i].index = i;
			this.antiCheatList[i].setSelected(false);
			this.antiCheatList[i].addTouchEventListener(function(sender, type) {
				if (type != 2)
					return;

				that.runAction(cc.callFunc(function() {
					sender.setSelected(!sender.isSelected());
                    that.onClickAntiCheatBtn(sender.index);
                }));    
			}, this);

			this.antiCheatList[i].getChildByName("text").addTouchEventListener(function(sender, type) {
				if (type == 2)
					that.onClickAntiCheatBtn(sender.getParent().index);
			}, this);
		}
        

		saveBtn.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Renwu_Gaojishezhi_Baocun", {uid: SelfUid()});
				this.reqSet();
			}
		}, this);

		close.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				this.removeFromParent();
			}
		}, this);
    },
    onClickDingShiDaYang:function(){
    	this.play_dingshidayang.setSelected(!this.play_dingshidayang.isSelected());
    },
    //同屏玩法
    onClickDisplay:function(index)
    {
    	if(!this.displayList)
    		return;

    	for (var i = 1; i < this.displayList.length; i++) {
			 this.displayList[i].setSelected(false)
		}
		this.displayList[index].setSelected(true);
		this.displayList._index = index;
    },
    //满人桌子是否排前面
    onClickSortord:function(index)
    {	
    	if(!this.sortordList)
    		return;

    	for (var i = 0; i < this.sortordList.length; i++) {
			 this.sortordList[i].setSelected(this.sortordList[i].index == index)
		}
		
		this.sortordList._index = index;
		if(this.play_isEmptyDeskFirst){
			this.setEmptyDeskUiEnable(index == 1 || index == 4);
		}
    },
    setEmptyDeskUiEnable:function(isEnabled){
    	if(isEnabled){
			this.play_isEmptyDeskFirst.getChildByName("text").setOpacity(0.7 * 255);
			this.play_isEmptyDeskFirst.setEnabled(false);
		}else{
			this.play_isEmptyDeskFirst.getChildByName("text").setOpacity(1 * 255);
			this.play_isEmptyDeskFirst.setEnabled(true);
		}
    },
    //踢出占位置的离线玩家play_kickoutList
    onClickKickout:function(index)
    {	
    	if(!this.play_kickoutList)
    		return;

    	for (var i = 0; i < this.play_kickoutList.length; i++) {
			 this.play_kickoutList[i].setSelected(false)
		}
		this.play_kickoutList[index].setSelected(true);
		this.play_kickoutList._index = index;
    },
    onClickHideTable:function(index)
    {	
    	if(!this.play_hideTableList)
    		return;

    	for (var i = 0; i < this.play_hideTableList.length; i++) {
			 this.play_hideTableList[i].setSelected(false)
		}
		this.play_hideTableList[index].setSelected(true);
		this.play_hideTableList._index = index;
    },
	//是否玩家查看统计 isDefault 是否是设置默认选项
	onClickStats: function(index, isDefault) {
		if (!this.statsList)
			return;

		var _checkBox = this.statsList[index];
		var checkBoxEasyui = function(bool) {
			for (var i = 1; i < this.statsList.length; i++) {
				var check = this.statsList[i]
				check.setEnabled(bool);
				var text = check.getChildByName("text");
				text.setTextColor(bool ? cc.color(68, 51, 51) : cc.color(177, 177, 177));
			}
		}.bind(this);

		if (index == 0) {
			if (isDefault) {
				_checkBox.setSelected(false);
				this.statsList[1].setSelected(true)
				this.statsList[2].setSelected(false)
				this.statsList[3].setSelected(false)
				checkBoxEasyui(false);
				this.setAllowToViewClear2UiEnable(false);
				return;
			} else if (_checkBox.isSelected() == false) {
				checkBoxEasyui(false);
				this.setAllowToViewClear2UiEnable(false);
				return;
			} else {
				checkBoxEasyui(true);
				this.setAllowToViewClear2UiEnable(true)
				return;
			}
		}

		for (var i = 1; i < this.statsList.length; i++) {
			var check = this.statsList[i]
			check.setSelected(false)
		}

		this.statsList[index].setSelected(true);
	},
	setAllowToViewClear2UiEnable:function(isEnabled){
    	if(!isEnabled){
			this.play_allowToViewClearScore2.getChildByName("text").setOpacity(0.7 * 255);
			this.play_allowToViewClearScore2.setEnabled(false);
		}else{
			this.play_allowToViewClearScore2.getChildByName("text").setOpacity(1 * 255);
			this.play_allowToViewClearScore2.setEnabled(true);
		}
    },
	showKickOutNotLoginTip:function(index,callback){
		var uiPara = {}
        uiPara.uiStyle = "friendcard_posUpMsg_daoshu2";
        uiPara.msg = "是否确认开启";
        uiPara.msgRed2 = "开启后，每日3点会踢出"+this._kickOutDayConfig[index]+"天内未上线的普通玩家。是否确认开启";
        uiPara.msgRed = "";
        uiPara.yes = function() {
            callback(1)
        }
        uiPara.no = function() {
        	callback(0)
        }
        uiPara.close = function() {
        	callback(0)
        }
        MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
	},
	//踢出XX天未登录玩家
	onClickKickOutNotLoginBtn:function(index){
		if(FriendCard_Common.getSkinType() == 1){
        	this.Button_sanjiao_kickOutNotLogin.setBright(true);
    	}
    	this.hidePanelListSelector();
    	this.text_kickOutNotLogin.getChildByName("text0").setString("（注：选中后，系统每日3点自动踢出联盟内离线超过"+this._kickOutDayConfig[index]+"天的普通玩家）")
		for (var i = 0; i < this.kickOutNotLoginNodeList.length; i ++) {
			var node = this.kickOutNotLoginNodeList[i]
			var text = node.getChildByName("text")
			if(i == index){
				node.getChildByName("img_bg").visible = true;
				this.text_kickOutNotLogin.setString(text.getString());
			}
			else{
				node.getChildByName("img_bg").visible = false;
			}
		}
		this.gaojiSet_kickOutNotLoginIndex = index;

	},
	showKickOutNotPlayTip:function(index,callback){
		var uiPara = {}
        uiPara.uiStyle = "friendcard_posUpMsg_daoshu2";
        uiPara.msg = "是否确认开启";
        uiPara.msgRed2 = "开启后，每日3点会踢出"+this._kickOutDayConfig[index]+"天内未在本联盟玩牌的普通玩家";
        uiPara.msgRed = "";
        uiPara.yes = function() {
            callback(1)
        }
        uiPara.no = function() {
        	callback(0)
        }
        uiPara.close = function() {
        	callback(0)
        }
        MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
	},
	//踢出XX天未玩牌玩家
	onClickKickOutNotPlayBtn:function(index,showTip){
		if(FriendCard_Common.getSkinType() == 1){
        	this.Button_sanjiao_kickOutNotPlay.setBright(true);
    	}
		this.hidePanelListSelector();
		this.text_kickOutNotPlay.getChildByName("text0").setString("（注：选中后，系统每日3点自动踢出超过"+this._kickOutDayConfig[index]+"天未在此联盟玩牌的普通玩家）")

		for (var i = 0; i < this.kickOutNotPlayNodeList.length; i ++) {
			var node = this.kickOutNotPlayNodeList[i]
			var text = node.getChildByName("text")
			if(i == index){
				node.getChildByName("img_bg").visible = true;
				this.text_kickOutNotPlay.setString(text.getString());
			}
			else{
				node.getChildByName("img_bg").visible = false;
			}
		}
		this.gaojiSet_kickOutNotPlayIndex = index;

	},
    //解散方式
	onClickJieSanBtn:function(index)
	{
		if(FriendCard_Common.getSkinType() == 1)
		{
	        this.Button_sanjiao_jiesan.setBright(true);
	    }
		this.hidePanelListSelector();
		for (var i = 0; i < this.jieSanNodeList.length; i ++) {
			var jieSanNode = this.jieSanNodeList[i]
			var text = jieSanNode.getChildByName("text")
			if(i == index)
			{
				jieSanNode.getChildByName("img_bg").visible = true;
				//text.setTextColor(cc.color("#ffffff"));
				this.text_jieshan.setString(text.getString());
			}
			else
			{
				jieSanNode.getChildByName("img_bg").visible = false;
				//text.setTextColor(cc.color("#000000"));
			}
		}
		this.gaojiSet_jieSanIndex = index;
	},
	//解散时间
	onClickJieSanTimeBtn:function(index)
	{
		if(FriendCard_Common.getSkinType() == 1)
		{
        	this.Button_sanjiao_jiesanTime.setBright(true);
    	}
		this.hidePanelListSelector();
		for (var i = 0; i < this.jieSanTimeNodeList.length; i ++) {
			var jieSanNode = this.jieSanTimeNodeList[i]
			var text = jieSanNode.getChildByName("text")
			if(i == index)
			{
				jieSanNode.getChildByName("img_bg").visible = true;
				//text.setTextColor(cc.color("#ffffff"));
				this.text_jieshanTime.setString(text.getString());
			}
			else{
				jieSanNode.getChildByName("img_bg").visible = false;
				//text.setTextColor(cc.color("#000000"));
			}
		}
		this.gaojiSet_jieSanTimeIndex = this._dissolveTimeConfig[index];
		if(!this.gaojiSet_jieSanTimeIndex){
			this.gaojiSet_jieSanTimeIndex = 0;
		}

	},
	//默认选择
    setDefaultOption:function(data)
    {
    	var data = data;
    	if(!data)
    		return;
    	if(data.info.useClose == 1){
    		this.play_dingshidayang.setSelected(true);
    	}else{
    		this.play_dingshidayang.setSelected(false);
    	}
    	if(data.info.dailyCloseTime && !data.info.dailyCloseTime == ""){
    		this.play_dingshidayang._startTimeUI._hour = parseInt(data.info.dailyCloseTime.substring(0,2));
    		this.play_dingshidayang._startTimeUI._minute = parseInt(data.info.dailyCloseTime.substring(3,5));
    		this.play_dingshidayang._endTimeUI._hour = parseInt(data.info.dailyCloseTime.substring(6,8));
    		this.play_dingshidayang._endTimeUI._minute = parseInt(data.info.dailyCloseTime.substring(9,11));
    	}else{
    		this.play_dingshidayang._startTimeUI._hour = 0;
    		this.play_dingshidayang._startTimeUI._minute = 0;
    		this.play_dingshidayang._endTimeUI._hour = 6;
    		this.play_dingshidayang._endTimeUI._minute = 0;
    	}
    	this.setTimeStr(this.play_dingshidayang._startTimeUI);
    	this.setTimeStr(this.play_dingshidayang._endTimeUI);

    	if(data.info.isNeedReady == 1){
    		this.play_isNeedReady.setSelected(true);
    	}
    	else{
    		this.play_isNeedReady.setSelected(false);
		}

		this.play_allowToViewClearScore1.setSelected(data && (data.info.allowToViewClearScore+ "").indexOf("1") > -1);
    	this.play_allowToViewClearScore2.setSelected(data && (data.info.allowToViewClearScore+ "").indexOf("2") > -1);
		
		if (this.play_replay) {
			if (data.info.againGame == 1)
				this.play_replay.setSelected(true);
			else
				this.play_replay.setSelected(false);
		}
		if(data.info.isForbVoice == 1)
    		this.play_isForbVoice.setSelected(true);
    	else
    		this.play_isForbVoice.setSelected(false);

    	if(data.info.isClubMasterNotDissolve == 1)
    		this.play_isClubMasterNotDissolve.setSelected(true);
    	else
    		this.play_isClubMasterNotDissolve.setSelected(false);

    	if(data.info.isForbChat == 1)
    		this.play_isForbChat.setSelected(true);
    	else
    		this.play_isForbChat.setSelected(false);

    	this.play_isNoShowTable.setSelected(data && data.info.isShowTable == 0);
    	this.play_isNoAttackProp.setSelected(data && data.info.noAttackProp == 1);
    	if(this.play_isHideChairmanTableCnt){
    		this.play_isHideChairmanTableCnt.setSelected(data && data.info.isHideChairmanTableCnt == 1);
    	}

    	this.play_isHideCount.setSelected(data && data.info.isHideCount == 1);
		this.play_isHideLeagueStatis.setSelected(data && data.info.isHideLeagueStatis == 1);
		this.play_isLimitDelRoom.setSelected(data && data.info.isOpenLimitDelRoomCnt == 1);
    	
		this.play_unStartCount.setSelected(data && data.info.unStartCount == 1);
		this.play_isEmptyDeskFirst.setSelected(data && data.info.isEmptyDeskFirst == 1);
		this.setEmptyDeskUiEnable(FriendCard_Common.getClubsortord() == 1 || FriendCard_Common.getClubsortord() == 4);

		this.play_isCanInvite.setSelected((data && data.info.isCanInvite == 1) || !data);

    	var antiCheat = data && "antiCheat" in data.info ? "" + data.info.antiCheat : "0";
    	if (antiCheat == "0")
			this.onClickAntiCheatBtn(0);
		if (antiCheat.indexOf("1") >= 0)
			this.onClickAntiCheatBtn(1);
		if (antiCheat.indexOf("2") >= 0)
			this.onClickAntiCheatBtn(2);
		if (antiCheat.indexOf("3") >= 0)
			this.onClickAntiCheatBtn(3);
		if (antiCheat.indexOf("4") >= 0)
			this.onClickAntiCheatBtn(4);

		this.onClickStats(data ? data.info.isShowStats : 0 , true);
		this.onClickSortord(FriendCard_Common.getClubsortord());
		this.onClickDisplay(FriendCard_Common.getClubDisplay());
		this.onClickJieSanBtn(data ? data.info.dissolveMode : 0);
		this.onClickKickout((data && data.info && ("kickout" in data.info))? data.info.kickout : 0)
		this.onClickHideTable((data && data.info && ("isTableHidden" in data.info))? (data.info.isTableHidden -1): 0);
		if (data && data.info.isKickOutNotLogin){
			this.onClickKickOutNotLoginBtn(data.info.isKickOutNotLogin-1);
		}else{
			this.onClickKickOutNotLoginBtn(0);
		}
		this.play_isKickOutNotLogin.setSelected(data && data.info.isKickOutNotLogin);

		if (data && data.info.isKickOutNotPlay){
			this.onClickKickOutNotPlayBtn(data.info.isKickOutNotPlay-1);
		}else{
			this.onClickKickOutNotPlayBtn(0);
		}
		this.play_isKickOutNotPlay.setSelected(data && data.info.isKickOutNotPlay);

		if (data && data.info.dissolveTime){
			var index = this._dissolveTimeConfig.indexOf(data.info.dissolveTime);
			if(index < 0){
				index = 0;
			}
			this.onClickJieSanTimeBtn(index);
		}else{
			this.onClickJieSanTimeBtn(0);
		}

    },
    getSendInfo:function()
    {
    	var param = {};
    	var that = this;

    	if(that.play_dingshidayang.isSelected()){
    		param.useClose = 1;
    		var timeStr = "" + (that.play_dingshidayang._startTimeUI._hour >= 10 ? that.play_dingshidayang._startTimeUI._hour : ("0"+that.play_dingshidayang._startTimeUI._hour))+"/";
    		timeStr += (that.play_dingshidayang._startTimeUI._minute >= 10 ? that.play_dingshidayang._startTimeUI._minute : ("0"+that.play_dingshidayang._startTimeUI._minute))+"/";
    		timeStr += (that.play_dingshidayang._endTimeUI._hour >= 10 ? that.play_dingshidayang._endTimeUI._hour : ("0"+that.play_dingshidayang._endTimeUI._hour))+"/";
    		timeStr += (that.play_dingshidayang._endTimeUI._minute >= 10 ? that.play_dingshidayang._endTimeUI._minute : ("0"+that.play_dingshidayang._endTimeUI._minute));
    		param.dailyCloseTime = "" + timeStr;
    	}else{
			param.useClose = 0;
    	}
    	//新加高级设置选项
		if (that.play_isNeedReady.isSelected()) {
			param.isNeedReady = 1;
		} else {
			param.isNeedReady = 0; 
		}
		
		param.allowToViewClearScore = 0;
		if (that.play_allowToViewClearScore1.isSelected()) {
			param.allowToViewClearScore = param.allowToViewClearScore * 10 + 1;
		}
		if (that.play_allowToViewClearScore2.isSelected()) {
			param.allowToViewClearScore = param.allowToViewClearScore * 10 + 2;
		}

		if (that.play_isForbVoice.isSelected()) {
			param.isForbVoice = 1;
		} else {
			param.isForbVoice = 0; 
		}

		if (that.play_isClubMasterNotDissolve.isSelected()) {
			param.isClubMasterNotDissolve = 1;
		} else {
			param.isClubMasterNotDissolve = 0; 
		}

		
		if(this.play_isKickOutNotLogin.isSelected()){
			param.isKickOutNotLogin = this.gaojiSet_kickOutNotLoginIndex+1;
		}else{
			param.isKickOutNotLogin = 0;
		}
		if(this.play_isKickOutNotPlay.isSelected()){
			param.isKickOutNotPlay = this.gaojiSet_kickOutNotPlayIndex+1;
		}else{
			param.isKickOutNotPlay = 0;
		}
		if (that.play_isForbChat.isSelected()) {
			param.isForbChat = 1;
		} else {
			param.isForbChat = 0; 
		}
		if(!FriendCard_Common.IsOpeNeedReady())
		{
			delete param.isNeedReady; //是否准备屏蔽 暂时不上
		}
		
		if(this.play_replay){
			if (that.play_replay.isSelected()) {
				param.againGame = 1;
			} else {
				param.againGame = 0;
			}
		}

		if (that.play_unStartCount.isSelected()) {
			param.unStartCount = 1;
		} else {
			param.unStartCount = 4;
		}
		
		if (that.play_isEmptyDeskFirst.isSelected() && that.play_isEmptyDeskFirst.isEnabled()) {
			param.isEmptyDeskFirst = 1;
		} else {
			param.isEmptyDeskFirst = 0;
		}
		
		if (that.play_isNoShowTable.isSelected()) {
			param.isShowTable = 0;
		} else {
			param.isShowTable = 1;
		}
		
		if (that.play_isNoAttackProp.isSelected()) {
			param.noAttackProp = 1;
		} else {
			param.noAttackProp = 0;
		}
		if (that.play_isHideChairmanTableCnt && that.play_isHideChairmanTableCnt.isSelected()) {
			param.isHideChairmanTableCnt = 1;
		} else {
			param.isHideChairmanTableCnt = 0;
		}

		if (that.play_isHideCount.isSelected()) {
			param.isHideCount = 1;
		} else {
			param.isHideCount = 0;
		}
		if (that.play_isHideLeagueStatis.isSelected()) {
			param.isHideLeagueStatis = 1;
		} else {
			param.isHideLeagueStatis = 0;
		}
		if (that.play_isLimitDelRoom.isSelected()) {
			param.isOpenLimitDelRoomCnt = 1;
		} else {
			param.isOpenLimitDelRoomCnt = 0;
		}

		if (!that.statsList[0].isSelected()) {
			param.isShowStats = 0;
		} else if (that.statsList[1].isSelected()) {
			param.isShowStats = 1;
		} else if(that.statsList[2].isSelected()){
			param.isShowStats = 2;
		} else {
			param.isShowStats = 3;
		}
		if (that.play_isCanInvite.isSelected()) {
			param.isCanInvite = 1;
		} else {
			param.isCanInvite = 0;
		}

		if(this.data.info.dissolveMode != that.gaojiSet_jieSanIndex)
			param.dissolveMode = that.gaojiSet_jieSanIndex ? that.gaojiSet_jieSanIndex : 0;

		if(this.data.info.dissolveTime != that.gaojiSet_jieSanTimeIndex)
		    param.dissolveTime = that.gaojiSet_jieSanTimeIndex ? that.gaojiSet_jieSanTimeIndex : 0;

        if (that.antiCheatList) {
			param.antiCheat = 0;
			// if (that.antiCheatList[1].isSelected())
			// 	param.antiCheat = 1;
			// if (that.antiCheatList[2].isSelected())
			// 	param.antiCheat = param.antiCheat * 10 + 2;
			// if (that.antiCheatList[3].isSelected())
			// 	param.antiCheat = param.antiCheat * 10 + 3;
			// if (that.antiCheatList[4].isSelected())
			// 	param.antiCheat = param.antiCheat * 10 + 4;
        }

        if(this.sortordList) param.sortord = this.sortordList._index;
        if(this.displayList) param.display = this.displayList._index;
        if(this.play_kickoutList) param.kickout = this.play_kickoutList._index;
        if(this.play_hideTableList) param.isTableHidden = this.play_hideTableList._index + 1;

        //遍历保存的设置和服务器传来的data是否有修改
        for(var x in param)
        {
        	if(!cc.isUndefined(this.data.info[x]) && (param[x] == this.data.info[x]))
        	{
        		delete param[x]
        	}
        }

        return param;

    },
    onClickAntiCheatBtn:function(index)
	{
        if (!this.antiCheatList)
            return;
            
		if (index == 0 && !this.antiCheatList[0].isSelected()) {
			this.antiCheatList[1].setSelected(false);
			this.antiCheatList[2].setSelected(false);
			this.antiCheatList[3].setSelected(false);
			this.antiCheatList[4].setSelected(false);
		}
		else if (index == 1) {
			this.antiCheatList[1].setSelected(!this.antiCheatList[1].isSelected());
			if (!this.antiCheatList[1].isSelected())
				this.antiCheatList[3].setSelected(false);
		}
		else if (index == 2) {
			this.antiCheatList[2].setSelected(!this.antiCheatList[2].isSelected());
		}
		else if (index == 3) {
			this.antiCheatList[3].setSelected(!this.antiCheatList[3].isSelected());
			if (this.antiCheatList[3].isSelected())
				this.antiCheatList[1].setSelected(true);
		}
		else if (index == 4) {
			this.antiCheatList[4].setSelected(!this.antiCheatList[4].isSelected());
		}
		this.antiCheatList[0].setSelected(!this.antiCheatList[1].isSelected() && !this.antiCheatList[2].isSelected() && !this.antiCheatList[3].isSelected() && !this.antiCheatList[4].isSelected());
	},
    reqSet: function() {
		var that = this;
		var sendInfo = this.getSendInfo();
		sendInfo.leagueId = this.clubId;
		if(sendInfo.dailyCloseTime){
			if(sendInfo.dailyCloseTime.substring(0,5) == sendInfo.dailyCloseTime.substring(6,11)){
				MjClient.showToast("打烊开始时间与结束时间不能相同");
				return;
			}
		}
		if(Object.keys(sendInfo).length <= 1)
		{
			//没有做任何修改
			that.removeFromParent();
			return;
		}
		cc.log("leagueUpdate sendInfo",JSON.stringify(sendInfo));
		MjClient.block();
		MjClient.gamenet.request("pkplayer.handler.leagueUpdate", sendInfo,
			function(rtn) {
				MjClient.unblock();
				if (rtn.code == 0) {
					MjClient.showToast(rtn.message);	
					if (cc.sys.isObjectValid(that))
						that.removeFromParent();
				} else {
					if (rtn.message) {
						MjClient.showToast(rtn.message);	
					} else {
						MjClient.showToast("修改失败");
					}
				}

			}
		);
	},
	
    onExit: function () {
        this._super();
    },
});