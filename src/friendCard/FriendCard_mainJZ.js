/*
 * @Author: lms  ~~~~~~~~~~~~~~晋中皮肤~~~~~~~~~~~~~~~~~~
 * @Date:   2017-11-21 14:11:10
 */

var FriendCard_main = cc.Layer.extend({
	data: {
		info: {
			title: ""
		},
		room: {}
	},
	clubList:[],
	onExit: function() {
		this._super();
		MjClient.FriendCard_main_ui = null;
	},
	ctor: function(data, type) {
		this._super();
        if (cc.sys.isObjectValid(MjClient.webViewLayer)){
            MjClient.webViewLayer.close();
        }
		if(data)
		{
			this.joinType = data.joinType || null;
			this.clubId = data.clubId || -1;
		}
		else
		{
			this.joinType = null;
			this.clubId = -1;
		}

		this.ruleIndex = 1;
        this.customInfo =false; //当前规则是否是可创建房间

        this.ruleBtnNum = FriendCard_Common.getRuleNumber();

		if (MjClient.FriendCard_main_ui && cc.sys.isObjectValid(MjClient.FriendCard_main_ui))
			MjClient.FriendCard_main_ui.removeFromParent(true);

		var UI = ccs.load("friendcard_main.json");
		MjClient.FriendCard_main_ui = this;
		this.addChild(UI.node);
		var that = this;

		if (type == 1) {
			// 代表从主界面 进来
			FriendCard_Common.isPopView(this);
		}

		var back = UI.node.getChildByName("back");
		this.back = back;


		this.btn_showClubList = UI.node.getChildByName("btn_showClubList");
		if(isIPhoneX()){
            setWgtLayout(this.btn_showClubList, [0.25, 0.25], [-0.01, 0.5], [0, 0]);
        }else {
            setWgtLayout(this.btn_showClubList, [0.25, 0.25], [-0.06, 0.5], [0, 0]);
        }

        //亲友圈列表按钮
		this.btn_showClubList.addTouchEventListener(function(sender, type) {
			if (type != 2)
				return;

			MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Qinyouquan_cetan", {uid:SelfUid()});
			this.showClubList();
		}, this);

		//亲友圈列表
		this._node_clubList = UI.node.getChildByName("node_clubList");
		this._node_clubList.scale = MjClient.size.height / this._node_clubList.height;
		this._node_clubList.y = 0;
		this._node_clubList.x = -that._node_clubList.width * this._node_clubList.scale;
		this._node_clubList.visible = false;
		this._node_clubList.enabled = false;

		this.gonggao_bg = UI.node.getChildByName("gonggao_bg")
        setWgtLayout(this.gonggao_bg, [0.5781, 0.458], [0.5, 0.715], [0, 0]);
        this.gonggao_bg.visible = false;
		//杂七杂八
		this.initOther(back)

		this.adaptation();
		setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);

		// 底部信息栏
		this.initBottom();

		this.setNullShow(true);
		// 绑定事件
		FriendCard_Common.eventBind(that);

		this.requestClubList();


		if(this.joinType == "home")
        {
        	if(util.localStorageEncrypt.getBoolItem("clubFirst_SHOW_CLUBLIST", true))
        	{
        		util.localStorageEncrypt.setBoolItem("clubFirst_SHOW_CLUBLIST", false);
        		this.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function(){
	        		that._node_clubList.isShow = false;
	        		that.showClubList(5);
        		})))
        	}
        }
        else
        {
        	this.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function(){
        		that.closeClubList();
        	})))
        }
		this.showNvGuanjiaAni();

		if (FriendCard_Common.isOpenLM())
			FriendCard_LM_handleInviteMsg(that);
	},
	updateMatchRedPoint: function(){
		if (this.data.info.matchIsOpen && this._btn_match) {
			if((this.data.redpointMatchButton && !FriendCard_Common.isOrdinaryMember())){
				this._btn_match.getChildByName("Image_point").visible = true;
			}else{
				this._btn_match.getChildByName("Image_point").visible = false;
			}
		}
	},
	initOther: function(back){
		var that = this
		//顶部栏
		this._image_top = back.getChildByName("image_top");

		// 桌子列表
		this._node_desk = back.getChildByName("node_desk");
		this.listView_table = this._node_desk.getChildByName("deskLayout");
		if(!this.listView_table.initX)
		{
			this.listView_table.initX = this.listView_table.x;
		}
		this.initDeskData();
		
		//右上角玩法
		this._listView_rule = this._image_top.getChildByName("ListView_rule");
		this._listView_rule._standWidth = this._listView_rule.width;
        this._listView_rule.setScrollBarEnabled(false);
        this._btn_all_rule = this._image_top.getChildByName("btn_all_rule");
       	this._btn_outline_rule = this._image_top.getChildByName("btn_outline_rule");
        COMMON_UI.setNodeTextAdapterSize(this._btn_all_rule);
        COMMON_UI.setNodeTextAdapterSize(this._btn_outline_rule);

        // 亲友圈列表
        this._node_clubListbg = back.getChildByName("node_clubListbg");
        this._node_clubListbg.visible = false;
        this._node_clubListbg.setEnabled(false);
		this._node_clubListbg.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.closeClubList();
            }
        }, this);



		// 底部栏
		this._image_bottom = back.getChildByName("image_bottom");

		// 暂停开房
		this._img_stop = back.getChildByName("img_stop");
		this._img_stop.setVisible(false);

		//打烊
		this._img_dayang_tip = back.getChildByName("img_dayang_tip")
		if(!this._img_dayang_tip){
			this._img_dayang_tip = ccui.ImageView("friendCards/main/img_dayang.png");
			this._img_dayang_tip.setPosition(this._img_stop.x,this._img_stop.y);
			back.addChild(this._img_dayang_tip);
		}
		this._img_dayang_tip.visible = false;

		//隐藏俱乐部
		this._img_hide_club_tip = back.getChildByName("img_hide_club_tip")
		if(!this._img_hide_club_tip){
			this._img_hide_club_tip = ccui.ImageView("friendCards/main/img_hide_club_tip.png");
			this._img_hide_club_tip.setPosition(this._img_stop.x,this._img_stop.y - this._img_hide_club_tip.height);
			back.addChild(this._img_hide_club_tip);
		}
		this._img_hide_club_tip.visible = false;

		// 群主请检查元宝是否足够开房
		this._img_check = back.getChildByName("img_check");
		this._img_check.setVisible(false);

		// 点击加入房间
		this._imgPoint = this._node_desk.getChildByName("Img_tip");// 空桌子箭头
		this._imgtext = this._node_desk.getChildByName("Image_tipText");

		// 关闭俱乐部列表
		this._btn_close = this._node_clubList.getChildByName("btn_close");
		this._btn_close.addTouchEventListener(function(sender, type) {
			if (type != 2)
				return;

			MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Qinyouquan_cetan_Tuichuqinyouquan", {uid:SelfUid()});

			// 俱乐部返回大厅功能：by_jcw
			// 离开俱乐部，需要离开未离开的房间
			var sData = MjClient.data.sData;
			var that = this;
			if (sData && sData.tData) {
				MjClient.showMsgTop("你已经在房间中，返回主页将离开房间",
                    function() {
						MjClient.block();
					    MjClient.gamenet.request("pkplayer.handler.LeaveGame", {}, function(rtn) {
					        MjClient.unblock();
					        if (rtn.result == 0 || rtn.code == 0) {
					            delete MjClient.data.sData;
					            delete MjClient.gameType;
					        } else if (rtn.message) {
					            MjClient.showMsg(rtn.message);
					        }
					    });
			            MjClient.native.umengEvent4CountWithProperty("LikaifangjianClick", {uid:SelfUid(), gameType:MjClient.gameType});
			            that.requestLeaveClub(true);
                    },
                    function() {
                    	var roomId = MjClient.data.sData.tData.tableid;
                    	if (roomId > 0) {
							MjClient.joinGame(roomId, null,false,MjClient.gameType);
						} 
                    }, "_backHall");
				return;
			}

			this.requestLeaveClub(true);
		}, this);


		//女管家
		this.img_nvguanjia = this._image_top.getChildByName("img_nvguanjia");
		this.img_nvguanjia.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Renwu", {uid:SelfUid()});
				
				this.closeClubList();

				this.img_nvguanjia.stopAllActions();
				this._nvGuanjiaAni.setAnimation(0,"idle2",false);
				that.img_nvguanjia.isAnim = false;

				this.img_nvguanjia.runAction(cc.sequence(cc.delayTime(5),cc.callFunc(function(){
					that.img_nvguanjia.isAnim = true;
        		_nvGuanjiaAni.setAnimation(0, 'idle', true);

					that.showNvGuanjiaAni1();
				})))
					
					
				this.img_shouzhi.visible = false;
				if(cc.sys.isObjectValid(this.img_shouzhi))
				{
					this.img_shouzhi.stopAllActions();
				}
				if(this.img_nvguanjia.children.length)
				for (var i = 0; i < this.img_nvguanjia.children.length; i++) {
					 var _module = this.img_nvguanjia.children[i];
					 if(_module.name == "dongGanGuangBo")
					 	_module.visible = false;
				}

				if(this.isManager())
				{		
					var data = {};
					data.data = this.data;
					data.clubId = this.clubId;
					data.ruleIndex = this.ruleIndex;
					data.isCreator = this.isCreator();
					if (FriendCard_Common.getClubisLM()) {
						this.addChild(new Friendcard_LM_nvguanjia(data));
					} else {
						this.addChild(new Friendcard_nvguanjia(data));
					}
				}
			}
		}, this);

		this.img_shouzhi = this.img_nvguanjia.getChildByName("img_shouzhi");	
		this.img_shouzhi.visible = false;

		//房卡
		this.fangkaBG = this._image_top.getChildByName("fangkaBG");
		if (this.fangkaBG) {
			var btn_addFK = this.fangkaBG.getChildByName("btn_addFK")
			btn_addFK.addTouchEventListener(function(sender, type) {
				if (type == 2) {
					if(that.data && that.data.info){
						if(that.data.info.type == 1){
							var layer = enter_store(1);
							MjClient.Scene.addChild(layer);
						}else{
							var layer = enter_store(0);
							MjClient.Scene.addChild(layer);
						}
					}
				}
			});
			this.fangkaBG.setTouchEnabled(true)
			this.fangkaBG.addTouchEventListener(function(sender, type) {
				if (type == 2) {
					if(that.data && that.data.info){
						if(that.data.info.type == 1){
							var layer = enter_store(1);
							MjClient.Scene.addChild(layer);
						}else{
							var layer = enter_store(0);
							MjClient.Scene.addChild(layer);
						}
					}
				}
			});

			this.text_fangka_type = this.fangkaBG.getChildByName("Text_1");
			this.text_fangka_type.ignoreContentAdaptWithSize(true);

			var text_fangka = this.fangkaBG.getChildByName("text_fangka")
			this.text_fangka = text_fangka;
			text_fangka.ignoreContentAdaptWithSize(true);
			text_fangka.setString(""+MjClient.data.pinfo.fangka);
			UIEventBind(null, text_fangka, "updateInfo", function() {
				if(that.data && that.data.info){
					if(that.data.info.type == 1){
						text_fangka.setString(MjClient.data.pinfo.fangka + "");
					}else{
						text_fangka.setString(MjClient.data.pinfo.money + "");
					}
				}
			});
		}

		//女管家动画
		var _nvGuanjiaAni = createSpine("friendCards/nvguanjia/anm/idle.json", "friendCards/nvguanjia/anm/idle.atlas");
        _nvGuanjiaAni.setAnimation(0, 'idle', true);
        _nvGuanjiaAni.setTimeScale(0.5);
        _nvGuanjiaAni.setScale(0.28);
        this.img_nvguanjia.addChild(_nvGuanjiaAni,-1);
        _nvGuanjiaAni.setPosition(cc.p(this.img_nvguanjia.width/2,0));
        this._nvGuanjiaAni = _nvGuanjiaAni;

        //比赛场信息
		this.matchNode = this._image_top.getChildByName("matchBg");
		if(this.matchNode){
			this.matchNode.visible = false;
			var Text_score = this.matchNode.getChildByName("Text_score");
			var AtlasLabel_rank = this.matchNode.getChildByName("AtlasLabel_rank");
			Text_score.setString("");
			Text_score.ignoreContentAdaptWithSize(true);
			AtlasLabel_rank.setString("");
			AtlasLabel_rank.ignoreContentAdaptWithSize(true);
			this.matchNode.getChildByName("img_sspmBg").setVisible(false);
		}

        //创建亲友圈
		this.btn_createQYQ = this._node_clubList.getChildByName("btn_create")
		this.btn_createQYQ.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Qinyouquan_cetan_Chuangjianqinyouquan", {uid:SelfUid()});
				if (isAgent()) {
					this.addChild(new FriendCard_info());
				}
                else { // 不是代理
                	this.addChild(new FriendCard_tip_create_club_guide());
                    //MjClient.showToast("仅代理可创建亲友圈");
                }
			}
		}, this);

		//加入亲友圈
		this.btn_joinQYQ = this._node_clubList.getChildByName("btn_join")
		this.btn_joinQYQ.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Qinyouquan_cetan_Jiaruqinyouquan", {uid:SelfUid()});
				this.addChild(new FriendCardFindLayer());
			}
		}, this);

		//搜索
		this.searchNode = this._image_top.getChildByName("searchBg");
		if (this.searchNode) {
			var size = this.searchNode.getContentSize();
			size.width -= 20;
			var inputEditBox = new cc.EditBox(size, new cc.Scale9Sprite());
	        inputEditBox.setFontColor(cc.color("#ffffff"));
	        inputEditBox.setMaxLength(10);
	        inputEditBox.setFontSize(20);
	        inputEditBox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
	        inputEditBox.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
	        inputEditBox.setFontName("fonts/lanting.TTF");
	        inputEditBox.setPlaceholderFontSize(20);
	        inputEditBox.setPlaceHolder("  搜索房间内玩家");
	        inputEditBox.setPosition(this.searchNode.width / 2, this.searchNode.height / 2);
	        this.searchNode.addChild(inputEditBox);
	        this.searchNode.inputEditBox = inputEditBox;
	        var btn_search = this.searchNode.getChildByName("btn_search");
	        btn_search.addTouchEventListener(function(sender, type) {
	            if (type == 2) {
	                 var sendInfo = {}
	                    sendInfo.leagueId = that.data.info.clubId;
	                    sendInfo.clubId = that.data.subClubId;
	                    var inputNum = Number(that.searchNode.inputEditBox.getString());
	                    sendInfo.keyword = inputNum;
	                    MjClient.block();
	                    MjClient.gamenet.request("pkplayer.handler.leaguePlayerSearch", sendInfo, function(rtn) {
	                        MjClient.unblock();
	                        if (rtn.code == 0) {
	                            rtn.data.info.clubId = rtn.data.info.leagueId ? rtn.data.info.leagueId : rtn.data.info.clubId;
	                            var room = {};
	                            room.ruleIndex = rtn.data.ruleId;
	                            room.roundNum = 0
	                            MjClient.FriendCard_main_ui.addChild(new Friendcard_roomInfoDialog(rtn.data, room));
	                        } else {
	                            FriendCard_Common.serverFailToast(rtn);
	                        }
	                    }); 
	            }
	        }, this);
		}


		cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function(touch, event)
            {
            	if(cc.sys.isObjectValid(MjClient.FriendCard_img_info))
            	{
                	MjClient.FriendCard_img_info.setVisible(false);
                	MjClient.FriendCard_img_info = null;
            	}
            	//MjClient.FriendCard_main_ui._node_clubList.stopAllActions();
            	MjClient.FriendCard_main_ui.closeClubList();
            }
        }), this.back.getChildByName("node_clubListbg"));

		//俱乐部信息
		this._clubInfo = this._image_top.getChildByName("clubInfo");
		if(isIPhoneX())
		{
			this._clubInfo.setPosition(cc.p(6,-20))
			this._img_stop.x = this.back.width*0.6;
			this._img_hide_club_tip.x = this.back.width*0.6;
			this._img_dayang_tip.x = this.back.width*0.6;
		}
	},
	adaptation: function() {	// 自适应显示
		var back = this.back;

		if (MjClient.size.width / MjClient.size.height > back.width / back.height) {
			var a = (MjClient.size.width / MjClient.size.height) / (back.width / back.height);
			this._image_top.width *= a;
			this._image_top.x += (back.width * a - back.width);
			//this._node_desk.x += (back.width * a - back.width) / 2;

            for (var i = this.ruleBtnNum; i > 0; i--) {
				var btn_rule = this._image_top.getChildByName("btn_rule" + i);
				if(!btn_rule) break;
                btn_rule.x = this._image_top.width - (80 +(6-i) * 90)-(back.width * a - back.width)/2;
            }

			this._image_top.getChildByName("clubInfo").x -= (back.width * a - back.width) / 2;
			back.width *= a;

		} else {
			var a = (back.width / back.height) / (MjClient.size.width / MjClient.size.height);
			this._node_desk.y += (back.height * a - back.height) / 2;
			back.height *= a;
			this._image_top.y = back.height;
		}

		if(isIPhoneX()){
			this._listView_rule.x = this._image_top.width -(back.width * a - back.width)/2 + 30
		}

		if(this.matchNode){
			this.matchNode.x = this._clubInfo.x;
			this.matchNode.y = this._clubInfo.y - 60;
			if(isIPhoneX()){
	            setWgtLayout(this.btn_showClubList, [0.1047, 0.3806], [0, 0.45], [0, 0]);
	            this.matchNode.x += 65;
	        }else {
	            setWgtLayout(this.btn_showClubList, [0.1047, 0.3806], [-0.0456, 0.45], [0, 0]);

	        }
		}
	},
	removeClub: function(clubId) {
		FriendCard_Common.removeClub(this,clubId);
	},
	syncClubList: function() {
		return FriendCard_Common.syncClubList(this);
	},
	requestClubList: function(clubId) {		// 注意：些函数在断线重连时，Logic.js 会再次调用
         FriendCard_Common.requestClubList(this,clubId);
    },
	requestEnterClub: function(clubId) {	// 注意：些函数在断线重连时，Logic.js 会再次调用
		FriendCard_Common.requestEnterClub(this,clubId);
	},
	enterClubRet: function(data) {
		if (!data)
			return;

		var that = this;
		that.clubId =  data.info.clubId;
		that.data = data;
		that.data.room = that.data.room || {};
		this._matchData = data.matchUser;
		MjClient.friendCard_replay = data.info.againGame;
		util.localStorageEncrypt.setNumberItem(FriendCard_Common.LocalKey.lastIntoClub, that.clubId);
		if (MjClient.data.pinfo.uid == data.info.creator && !util.localStorageEncrypt.getBoolItem("clubFirstInto_" + that.clubId, false)) {
			util.localStorageEncrypt.setBoolItem("clubFirstInto_" + that.clubId, true);
			this.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function(){
        		that.closeClubList();
        	})))
			MjClient.FriendCard_main_ui.addChild(new Friendcard_guideLayer(1,that.data,that.ruleIndex));
		}

		that.ruleIndex = FriendCard_Common.getClubRulesSelect(that.clubId)[0];
		that.setNullShow(false);
		FriendCard_Common.reSetCurSelectRule();
		that.syncClubList();
		that.refreshClubList();
		that.refreshInfo();
		that.refreshDeskList();
		that.tipCheck();
		FriendCard_Common.doDaYangAction(this);

		that.updateMatchRedPoint();
	},
	requestRoomInfo: function(room) {
		FriendCard_Common.requestRoomInfo(this,room);
	},
	requestLeaveClub: function(isClose) {
		FriendCard_Common.requestLeaveClub(this,isClose);
	},
	requestDeleteRule: function(index) {
		FriendCard_Common.requestDeleteRule(this,index);
	},
	requestSortRule: function(indexs) {
		cc.log("requestSortRule: indexs=", indexs);
		var that = this;
		var msg = {clubId: that.data.info.clubId};
		var isChange = false;
		for (var i = 1, j = 0; i <= FriendCard_Common.getRuleNumber(); i ++) {
			if (!that.data.info["rule" + i])
				continue;
			if (i != indexs[j]) {
				msg["rule" + i] = that.data.info["rule" + indexs[j]];
				isChange = true;
			}
			j ++;
		}
		if (!isChange)
			return;

		MjClient.block();
		MjClient.gamenet.request("pkplayer.handler.clubUpdate", msg,
			function(rtn) {
				MjClient.unblock();
				if (rtn.code != 0)
					FriendCard_Common.serverFailToast(rtn);
			});
	},
	setNullShow: function(isNullShow) {
		var visible = !isNullShow;
		this._image_top.setVisible(visible);
		this._image_bottom.setVisible(visible);
		this._node_desk.setVisible(visible);
	},
	initBottom: function() {
		var _btnList = this._image_bottom.getChildByName("btnList");
		var that = this;

		if (!this._image_bottom.getChildByName("_btn_signMatch")) {
			var _btn_signMatch = new ccui.Button("friendCards_Match/btn_signMatch.png");
			_btn_signMatch.setPosition(cc.p(this.back.width - _btn_signMatch.width / 2, 135));
			_btn_signMatch.setName("_btn_signMatch");
			this._image_bottom.addChild(_btn_signMatch);
			_btn_signMatch.addTouchEventListener(function (sender, type) {
				if (type == 2) {
					this.addChild(new FriendCard_Match_joinLayer(this.data));
				}
			},this);
			this._btn_signMatch = _btn_signMatch;
		}

		if (!this._image_bottom.getChildByName("_btn_outMatch")) {
			var _btn_outMatch = new ccui.Button("friendCards_Match/btn_outMatch.png");
			_btn_outMatch.setPosition(cc.p(this.back.width - _btn_outMatch.width *3 / 2, 135));
			_btn_outMatch.setName("_btn_outMatch");
			this._image_bottom.addChild(_btn_outMatch);
			_btn_outMatch.addTouchEventListener(function (sender, type) {
				if (type == 2) {
					if (this._matchData && this._matchData.status == 1) {// 已经参赛的 显示退赛按钮
						MjClient.showMsg("申请退赛后，无法加入房间进行比赛！",
							function () {
								if(that.data.info.leagueId){
									FriendCard_Common.leagueQuitMatch(that._matchData.matchId);
								}else{
									FriendCard_Common.clubQuitMatch(that._matchData.matchId);
								}
							},
							function () { }, "1");
					} else if (this._matchData && this._matchData.status == 2) {
						MjClient.showToast("你已申请退赛");
					}else if(FriendCard_Common.isLMClub() && this._matchData && this._matchData.status == 0){
						MjClient.showMsg("您有已报名的申请，是否取消？\n\n取消后返回报名前的状态。",
                    	function() {
                    		FriendCard_Common.leagueQuitMatch(that._matchData.matchId);
	                    },
	                    function() {}, "1");
					} else {
						MjClient.showToast("你尚未参加任何比赛");
					}
				}
			},this);
			this._btn_outMatch = _btn_outMatch;
		}

		that.bottomAllBtns = [
			"_btn_setting",//设置
			"_btn_member",//成员
			"_btn_record",//战绩
			"_btn_record2",//战绩
			"_btn_tongji",//统计
			"_btn_yaoqing",//邀请
			"_btn_rule",//规则
			"_btn_webZhanji",//网页战绩
			"_btn_personal_shop",//个人商城
			"_agentBtn",//代理
			"_btn_match",//比赛场
			"_btn_rankList"//排行榜
		];

		FriendCard_Common.initBottom(that.bottomAllBtns);

		//晋中玩家自主开房
		this._btn_privacyRoom = _btnList.getChildByName("btn_privacyRoom");
		if(isJinZhongAPPType())
		{
			this._btn_privacyRoom.addTouchEventListener(function(sender, type) {
				if (type == 2) {
					MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chuangjianfangjian", {uid:SelfUid()});
					postEvent("createRoom", {
							IsFriendCard: true,
							isCreateRoom: true,
							clubId: that.clubId,
							ruleId: that.ruleIndex,
							info: that.data.info["rule" + that.ruleIndex],
							clubType: that.data.info.type,
							isMatch:(that.data.info.matchIsOpen & 2)
						});
				}
			}, this);

			//提示界面
			if(that._btn_privacyRoom.visible && that.data.info["rule"+that.ruleIndex])
			{
				if (!util.localStorageEncrypt.getBoolItem("CLUB_IS_SHOW_TISHI2" + that.clubId+that.ruleIndex, false) && !MjClient.FriendCard_infoUI) {
					util.localStorageEncrypt.setBoolItem("CLUB_IS_SHOW_TISHI2" + that.clubId+that.ruleIndex, true);
					MjClient.FriendCard_main_ui.addChild(new Friendcard_guideLayer(2,that.data,that.ruleIndex));
				}
			}
		}else{
			if(this._btn_privacyRoom){
				this._btn_privacyRoom.visible = false;
			}
		}


		// 快速加入按钮
		var _btn_join = _btnList.getChildByName("btn_join");
		_btn_join.addTouchEventListener(function(sender, type) {
			if (type == 2) {

				MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Kuaisujiaru", {uid:SelfUid()});
				if (FriendCard_Common.getOSDClub(that) && sender.textureType != "返回房间"  && !this.customInfo)
					that.showKaifangRuleSelectDialog(function(ruleIndex){that.quicklyJoinGame(ruleIndex)});
				else
					that.quicklyJoinGame();
			}
		}, this);

		// 俱乐部返回大厅功能：by_jcw
		FriendCard_Common.toTheHallEvent(this,_btn_join);
		if(isIPhoneX()){ 
			_btn_join.x = this.back.width - _btn_join.width/2 - 20;
      		if(this._btn_privacyRoom){
			  this._btn_privacyRoom.x = _btn_join.x - _btn_join.width - 20
      		}
		}
	},
	showKaifangRuleSelectDialog: function(retFunc) {
		if (!FriendCard_Common.getOSDClub(this)) {
			retFunc(this.ruleIndex);
			return;
		}
		var ruleList = [];
		for (var i = 1; i <= FriendCard_Common.getRuleNumber(); i++) {
			var otherRule = this.data.info["rule" + i];
			if (otherRule && otherRule != "delete" && !otherRule.customInfo) {
				otherRule._index = i
				ruleList.push(otherRule);
			}
		}

		var keyQuickGamesWitch = FriendCard_Common.LocalKey.quickGameSwitch + this.data.info.clubId;
        var quickStartListLocalSwitch = util.localStorageEncrypt.getStringItem(keyQuickGamesWitch,"");
        if(!quickStartListLocalSwitch || quickStartListLocalSwitch == ""){
            quickStartListLocalSwitch = {};
        }else{
            quickStartListLocalSwitch = JSON.parse(quickStartListLocalSwitch)
        }
        var length = ruleList.length;
        for(var i = length -1; i >= 0 ; i--){
            var ruleData = ruleList[i];
            ruleData._showNum = (i+1)
            if(ruleData._index.toString() in quickStartListLocalSwitch){
                if(!quickStartListLocalSwitch[ruleData._index.toString()]){
                    ruleList.splice(i,1);
                }
            }
        }
        
		if(ruleList.length<=1)
		{
			if(ruleList.length == 1){
				retFunc(ruleList[0]._index);
			}else{
				retFunc(this.ruleIndex);
			}
			return;
		}
		MjClient.FriendCard_main_ui.addChild(new Friendcard_ruleSelectDialog({
			ruleList: ruleList,
			callFunc: retFunc
		}))
		
	},
	tipCheck: function() {
		FriendCard_Common.tipCheck(this);
	},
	joinGame: function(sender, type) {
		if (type != 2)
			return;

		if (cc.sys.isObjectValid(MjClient.blockui)) // 规避因多点触屏，MjClient.block()后再次进入到这里 by cyc
			return;

		this.closeClubList();
		FriendCard_Common.joinGame(this,sender);
	},
	quicklyJoinGame: function(ruleIndex) {
		FriendCard_Common.quicklyJoinGame(this,ruleIndex);
	},
    bindingAgent: function()
	{
		FriendCard_Common.bindingAgent(this);
	},
	isCreator: function() {
		if(!this.data || !this.data.info){
			return false;
		}
		return FriendCard_Common.isSupperManger(this.data.info)
	},
	isManager: function() {
		if(!this.data || !this.data.info){
			return false;
		}
		return FriendCard_Common.isManager(this.data.info);
	},
	refreshHead: function(url, head) {
		var callFunc = function() {
			var text_name = head.getChildByName("Text_name");
			var text_nameBg = head.getChildByName("Text_nameBg");
			if (text_name && text_nameBg) {
				text_name.zIndex = 10;
				text_nameBg.zIndex = 9;
			}
		}
		head.callFunc = callFunc;
		head.needScale = 8;
		COMMON_UI.refreshHead(this, url, head);
		
	},
	refreshClubListPlayerCount:function(info){
		//这里未必是当前的亲友圈
		var that = this;
		if(!that.clubList){
			return;
		}
		if(!info){
			return;
		}
		var clubListView = this._node_clubList.getChildByName("clubListView");
		for(var i = 0 ; i < that.clubList.length; i++){
			var cell = clubListView.getChildByName("clubListViewItem_"+i);
			if(cell.itemData.clubId == info.clubId){
				if("isHideCount" in info){
					that.clubList[i].isHideCount = info.isHideCount;
				}
				var onlineCount = cell.getChildByName("onlineCount");
				var allNum = cell.getChildByName("allNum");

				if(that.clubList[i].isHideCount == 1  && that.clubList[i].roleId == 0  && !that.clubList[i].leagueId){
					onlineCount.visible = false;
					allNum.visible = false;
				}else{
					onlineCount.visible = true;
					allNum.visible = true;
				}
			}
		}
	},
	refreshClubList: function() {
		var that = this;
		var clubListView = this._node_clubList.getChildByName("clubListView");
		var _cell = this._node_clubList.getChildByName("cell");
		var title = _cell.getChildByName("title");
		title.ignoreContentAdaptWithSize(true);
		title.setString("");
		title.setFontSize(24);
		var allNum = _cell.getChildByName("allNum");
		allNum.ignoreContentAdaptWithSize(true);
		allNum.setString("");
		_cell.setVisible(true);
		var offsetY = clubListView.getInnerContainerPosition()//.y;
		clubListView.removeAllChildren();	
		var list = that.clubList //FriendCard_Common.clubListSort(that.clubList,[])
		var itemHeight = _cell.height;
		var verticalSpcae = 2;
		var totalHeight = list.length * itemHeight + (list.length-1) * verticalSpcae;
		var scrollHeight = (clubListView.height > totalHeight ? clubListView.height : totalHeight);
		clubListView.setInnerContainerSize(cc.size(clubListView.getInnerContainerSize().width,scrollHeight));
		for (var i = 0; i < list.length; i ++)
		{
			var cell = _cell.clone();
			cell.setName("clubListViewItem_"+i);
			clubListView.addChild(cell);
			cell.setPosition(cc.p(0,scrollHeight - (i +1) * itemHeight - i * verticalSpcae));
			var btn = cell.getChildByName("btn");
			btn.setEnabled(list[i].clubId != this.clubId);
			cell.itemData = list[i];
			var that = this;
			btn.clubId = list[i].clubId;
			btn.addTouchEventListener(function(sender, type) {
				if (type == 0) {
                    sender.beginTime = new Date().getTime();
                } else if (type == 2 || type == 3) {
                    if ((new Date().getTime() - sender.beginTime) > FriendCard_Common.touchBeginTime)
                        return;
                }

				if (type == 2) {
					if (cc.sys.isObjectValid(MjClient.blockui)) // 规避因多点触屏，MjClient.block()后再次进入到这里 by cyc
						return;

					MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Qinyouquan_cetan_Qiehuanjqinyouquan", {uid:SelfUid()});
					that.requestEnterClub(sender.clubId);
				}
			}, this);

			var head = cell.getChildByName("head")
			head.isMask = true;
			head.hideblock = true;
			head.headMask = "friendCards/head/headMask.png"
			this.refreshHead(list[i].avatar, head);
			var title = cell.getChildByName("title");
			var titleStr = unescape(list[i].title);
			titleStr = titleStr.replace(/\n/g, "");
			titleStr = titleStr.replace(/\r/g, "");
			title.setString(titleStr);
			var isSelected = list[i].clubId == this.clubId;
			var _color = isSelected ? "#FFFFFF" : "#A9E0FF";
			title.setTextColor(cc.color(_color));
			title.ignoreContentAdaptWithSize(true);

			var onlineCount = cell.getChildByName("onlineCount");
			onlineCount.setString(list[i].onlineCount + "");
			onlineCount.ignoreContentAdaptWithSize(true)
			onlineCount.setTextColor(cc.color(isSelected ? "#FFFFFF" : "#58E6CD"))


			var allNum = cell.getChildByName("allNum");
			allNum.setString("/" + list[i].playerCount);
			allNum.ignoreContentAdaptWithSize(true)
			allNum.setTextColor(cc.color(isSelected ? "#FFFFFF" : "#A9E0FF"))

			//成员图片
			var image_7 = cell.getChildByName("Image_7");
			image_7.loadTexture(list[i].clubId == this.clubId ? "friendCards/main/img_xuanzhongMem.png" : "friendCards/main/img_feixuanzhongMem.png");
			onlineCount.x = image_7.x + image_7.width + onlineCount.width
			allNum.x = onlineCount.x

			if(list[i].leagueId && list[i].playerCount > 99){
				onlineCount.setString("99+");
				allNum.setString("");
			}
			if(list[i].isHideCount == 1 && list[i].roleId == 0  && !list[i].leagueId){
				onlineCount.visible = false;
				allNum.visible = false;
			}else{
				onlineCount.visible = true;
				allNum.visible = true;
			}

			//头像框
			var head_kuang = cell.getChildByName("head_kuang");
			head_kuang.loadTexture(list[i].clubId == this.clubId ? "friendCards/main/img_head_kuang_n.png" : "friendCards/main/img_head_kuang_s.png");
			
			//房卡标签
			var img_fangka = cell.getChildByName("img_fangka");
			if (img_fangka) {
				img_fangka.visible = list[i].type == 1 ? true : false;
			}
			
			var img_LM = cell.getChildByName("img_LM");
			if (img_LM) {
				img_LM.visible = list[i].leagueId  ? true : false;
			} 

			//暂停开房标签
			var img_stop = cell.getChildByName("img_stop");
			img_stop.visible = list[i].createSwitch == 0;
		}

		//clubListView.setScrollBarAutoHideEnabled(true)
		if(this.clubList.length < 5)
			clubListView.setScrollBarOpacity(0);
		else
			clubListView.setScrollBarAutoHideTime(60);

		//clubListView.setScrollBarPositionFromCornerForVertical(cc.p(295,0));
		clubListView.setScrollBarColor(cc.color("#486295"));

		_cell.setVisible(false);
		
		if (!this._firstContact) {
			this._firstContact = true;
			clubListView.jumpToPercentVertical(0)
		} else {
			clubListView.setInnerContainerPosition(offsetY);
		}
		
		
		if(this.clubList.length == 0)
		{
			this.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function(){
        		that.showClubList();
        	})))
			this._node_clubListbg.touchEnabled = false;
			this.btn_createQYQ.setPosition(cc.p(210,550));
			this.btn_joinQYQ.setPosition(cc.p(210,460));
			this.addChild(new FriendCard_tip_club_guide());
		}
		else
		{
			this.btn_createQYQ.setPosition(cc.p(210,137))
			this.btn_joinQYQ.setPosition(cc.p(210,50))
			this._node_clubListbg.touchEnabled = true;
		}
		FriendCard_Common.clublistDrag(that)
	},
	refreshInfo: function() {
		var that = this;
		var isManager = this.isManager();
		var isGroupLeader = FriendCard_Common.isGroupLeader(that.data.info);
		var isAssistants = FriendCard_Common.isAssistants(that.data.info);


		//俱乐部名字
		var text_clubName = this._clubInfo.getChildByName("text_clubName");
		text_clubName.ignoreContentAdaptWithSize(true);//unescape(this.data.info.title)
		var titleStr = unescape(this.data.info.title)
		titleStr = titleStr.replace(/\n/g, "");
		titleStr = titleStr.replace(/\r/g, "");
		text_clubName.setString(getNewName_new(titleStr,11));

		//俱乐部ID
		var text_clubId = this._clubInfo.getChildByName("text_clubId");
		text_clubId.ignoreContentAdaptWithSize(true);
		text_clubId.setString("ID:"+this.data.info.clubId );

		//元宝
        var moneyback = this._clubInfo.getChildByName("moneyback");
        if(moneyback){
            moneyback.visible = false;
		}

        //房卡
		if (this.fangkaBG) {
			//this.fangkaBG.visible = this.data.info.type == 1 ? true : false
			this.fangkaBG.visible = true;
			if(this.data.info.type == 1){
				this.text_fangka_type.setString("我的房卡");
				this.text_fangka.setString(MjClient.data.pinfo.fangka + "");
				this.fangkaBG.loadTexture("friendCards/main/fangka_kuang.png");
			}else{
				this.text_fangka_type.setString("我的元宝");
				this.text_fangka.setString(MjClient.data.pinfo.money + "");
				this.fangkaBG.loadTexture("friendCards/main/yuanbao_kuang.png");
			}
		}	

		FriendCard_Common.pageRunText(this.gonggao_bg,this.data.info.notice);
        this.gonggao_bg.visible = true;
        this.gonggao_bg.visible = true;

        // 返回按钮
		var btn_fanhui = this._clubInfo.getChildByName("btn_fanhui");
		btn_fanhui.addTouchEventListener(function(sender, type) {
			if (type != 2)
				return;

			MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tuichuqinyouquan", {uid:SelfUid()});

			// 俱乐部返回大厅功能：by_jcw
			// 离开俱乐部，需要离开未离开的房间
			var sData = MjClient.data.sData;
			var that = this;
			if (sData && sData.tData) {
				MjClient.showMsgTop("你已经在房间中，返回主页将离开房间",
                    function() {
						MjClient.block();
					    MjClient.gamenet.request("pkplayer.handler.LeaveGame", {}, function(rtn) {
					        MjClient.unblock();
					        if (rtn.result == 0 || rtn.code == 0) {
					            delete MjClient.data.sData;
					            delete MjClient.gameType;
					        } else if (rtn.message) {
					            MjClient.showMsg(rtn.message);
					        }
					    });
			            MjClient.native.umengEvent4CountWithProperty("LikaifangjianClick", {uid:SelfUid(), gameType:MjClient.gameType});
			            that.requestLeaveClub(true);
                    },
                    function() {
                    	var roomId = MjClient.data.sData.tData.tableid;
                    	if (roomId > 0) {
							MjClient.joinGame(roomId, null,false,MjClient.gameType);
						} 
                    }, "_backHall");
				return;
			}

			this.requestLeaveClub(true);
		}, this);

		this.refreshPeopleCount();

		if(FriendCard_Common.isLMClub()){
			this._btn_setting.setVisible(FriendCard_Common.isSupperManger());
		}else{
        	this._btn_setting.setVisible(isManager);
		}
		this._btn_tongji.setVisible((this.data.info.isShowStats != 0) || isManager || isGroupLeader || isAssistants);
		this._btn_yaoqing.setVisible(false);//isManager
		if(FriendCard_Common.getClubisLM()){
			this._btn_yaoqing.setVisible(false);
		}


		this._btn_record.setVisible(isManager || FriendCard_Common.isGroupLeader(this.data.info));
		this._btn_record2.setVisible(!this._btn_record.visible);
		this._btn_webZhanji.setVisible(MjClient.systemConfig.openUserInfoShare + "" == "true");
		
		if(this._btn_personal_shop){
			//【风控】【亲友圈&联盟】去掉主界面的个人商城按钮
			this._btn_personal_shop.visible = false;
		}
		
        that.reflashPrivacyRoom();
		
        // 绑定邀请码：排除南通房卡模式
		if (!MjClient.APP_TYPE.QXNTQP || MjClient.getAppType() != MjClient.APP_TYPE.QXNTQP) {
			var haveMemberId = MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.memberId && parseInt(MjClient.data.pinfo.memberId) > 0;
			if (this.data.info.memberId && !haveMemberId)
			{
				this._agentBtn.visible = true;
				if (util.localStorageEncrypt.getBoolItem("clubBindingAgentAutoPop_" + this.clubId, true)) {
	        		util.localStorageEncrypt.setBoolItem("clubBindingAgentAutoPop_" + this.clubId, false);
	        		this.bindingAgent();
	        	}
			}
			else
			{
				this._agentBtn.visible = false;
			}
		}
		else
		{
			this._agentBtn.visible = false;
		}
        
        //手指点击动画
		if(isManager)
		{											
			if (util.localStorageEncrypt.getBoolItem("THEFIRST_JOINCLUB", true))
			{
				this.showShouzhiAnm();

				util.localStorageEncrypt.setBoolItem("THEFIRST_JOINCLUB", false);
				this.img_shouzhi.visible = true;
			}
			else
			{
				if(!this.img_nvguanjia.isAnim)
				{
					this.img_nvguanjia.isAnim = true;
					this.showNvGuanjiaAni();
				}
				this.img_shouzhi.visible = false;
				for (var i = 0; i < this.img_nvguanjia.children.length; i++) {
					 var _module = this.img_nvguanjia.children[i];
					 if(_module.name == "dongGanGuangBo")
					 	_module.visible = false;
				}
			}

			this.img_nvguanjia.visible = true;
		}
		else
		{
			this.img_shouzhi.visible = false;
			for (var i = 0; i < this.img_nvguanjia.children.length; i++) {
				 var _module = this.img_nvguanjia.children[i];
				 if(_module.name == "dongGanGuangBo")
				 	_module.visible = false;
			}
		}

		//搜索按钮
		if (this.searchNode) {
			//联盟中的盟主、会长、超级管理员、管理员可见
			if (FriendCard_Common.isLMClub() && (FriendCard_Common.isManager() || FriendCard_Common.isLeader() || FriendCard_Common.isLMChair())) {
				this.searchNode.visible = true;
			}else{
				this.searchNode.visible = false;
			}
		}

		if (this.matchNode && this._matchData) {
			if (!that.data.info.matchConf || !that.data.info.matchConf[this._matchData.matchId]) {
				this._matchData = {};
			} else {
				if (!this._matchData.rank) {
					this._matchData.rank = 1001; //后端某些情况下会缺失，应后端要求加上；
				}
				this.showMatchRankChangeAni();
				this.matchNode.getChildByName("Text_score").setString("" + revise(this._matchData.score));
				this.matchNode.getChildByName("AtlasLabel_rank").setString("" + revise(this._matchData.rank));
				this.matchNode.setTouchEnabled(true);	
				this.matchNode.addTouchEventListener(function (sender, type) {
					if (type == 2) {
						this.addChild(new FriendCard_Match_rankLayer(that.data.info, this.clubId, this._matchData.matchId, that.data.subClubId));
					}
				}, this)

			}


		}
		if(this._btn_signMatch){
			this._btn_signMatch.setVisible(this.data.info.matchIsOpen & 2);
			this._btn_outMatch.setVisible(this.data.info.matchIsOpen & 2);
		}

		if(this.matchNode){
			this.matchNode.setVisible((this.data.info.matchIsOpen & 2) && this._matchData && this._matchData.matchId && this.data.info.matchConf[this._matchData.matchId])
			if(this._matchData && this._matchData.status == 1){
				this.matchNode.visible = true;
			}else if(this._matchData && this._matchData.status == 0){
				this.matchNode.visible = false;
			}
				
		}
		if (this._btn_rankList && this._btn_match) {
			this._btn_rankList.setVisible(false);
			this._btn_match.setVisible(false);
			var matchIsOpen = this.data.info.matchIsOpen;
			if (matchIsOpen > 0) {
				if (FriendCard_Common.isOrdinaryMember(that.data.info)) {
					this._btn_rankList.setVisible(matchIsOpen&2);
				}
				else {
					this._btn_match.setVisible(FriendCard_Common.isLeader() || matchIsOpen&2);
				}
			}
		}
		FriendCard_Common.bottomBtnSort(this,that.bottomAllBtns);
		this.updateMemberRedPoint();
		this.refreshRuleList();
	},
	refreshPeopleCount:function() {
		//在线人数与总数
		var text_allNum = this._clubInfo.getChildByName("text_allNum");
		text_allNum.ignoreContentAdaptWithSize(true);
		text_allNum.setString(this.data.info.onlineCount + "/" + this.data.info.totalCount);

		if(FriendCard_Common.isLMClub() && this.data.info.totalCount > 99){
			text_allNum.setString("99+");
		}
		if(this.data.info.isHideCount == 1 && FriendCard_Common.isOrdinaryMember()  && !FriendCard_Common.isLMClub()){
			text_allNum.setVisible(false);
		}else{
			text_allNum.setVisible(true);
		}
	},
	refreshClubMatch:function(data){
		// cc.log("==== lms----- pass ",JSON.stringify(data))
		// 参赛
		switch (data.status) {
            case 0:
                break;
            case 1:
				this.matchNode.visible = true;
				this._matchData = data;
                break;
            case 2:

                break;
            case 3:
                // str = "你的退赛还未审核";
                break;
            case 4:
				// str = "你的退赛审核已被同意";
				this.matchId = 0;
				this._matchData = {};
				this.matchNode.visible = false;
                break;
            case 5:
				this._matchData.status = 1;
                break;
            case 6:
            	//系统踢出
            	this.matchId = 0;
				this._matchData = {};
				this.matchNode.visible = false;
                break;
        }	
		this.refreshInfo();

	},
	updateMemberRedPoint:function(){
		if(MjClient.clubPlayerApplyList.indexOf(this.clubId) != -1 || 
			(this.data.redpointMemberButton && !FriendCard_Common.isOrdinaryMember())){
			this._btn_member.getChildByName("Image_point").visible = true
		}else{
			this._btn_member.getChildByName("Image_point").visible = false;
		}
	},
	getCurSelGameType: function(_ruleIndex){
    	var ruleIndex;
    	if(_ruleIndex)
    	{
    		ruleIndex = _ruleIndex;
    	}
        else
        {
        	ruleIndex = this.ruleIndex	
        }

    	return 	this.data.info["rule" + ruleIndex].gameType;
    },
	showNvGuanjiaAni:function(){
        return; //取消女管家动画

        if(this.img_shouzhi.visible)
        	return;
        if(!this.img_nvguanjia.isAnim)
        	return;
        var that = this;
        var moveTo1 = cc.moveTo(/*(that.img_nvguanjia.x - 350) / 30*/5, cc.p(350, -36.28));
        var moveTo2 = cc.moveTo((580 - that.img_nvguanjia.x) / 30, cc.p(580.59, -36.28));

        var callFunc1 = cc.callFunc(function() {
        	that._nvGuanjiaAni.setAnimation(0, 'walk', true)
        	that.img_nvguanjia.setFlippedX(true);
        })

        var callFunc2 = cc.callFunc(function() {
        	that._nvGuanjiaAni.setAnimation(0, 'idle', true)
        	that.img_nvguanjia.setFlippedX(true);
        })

        var callFunc3 = cc.callFunc(function() {
        	that._nvGuanjiaAni.setAnimation(0, 'walk', true)
        	that.img_nvguanjia.setFlippedX(false);
        })
        this.img_nvguanjia.runAction(cc.repeatForever(cc.sequence(cc.delayTime(3),callFunc3,moveTo2,callFunc2,cc.delayTime(4),callFunc1,moveTo1,callFunc2,cc.delayTime(0.5))));
    },
    //这个函数是点击女管家后执行的动画, 这个动画不是一直执行, 最后会调用上面那个函数
    showNvGuanjiaAni1:function(){
    	return; //取消女管家动画

        if(!this.img_nvguanjia.isAnim)
        	return;

        var that = this;
        var moveTo1 = cc.moveTo((that.img_nvguanjia.x - 350) / 30, cc.p(350, -36.28));

        var callFunc2 = cc.callFunc(function() {
        	that._nvGuanjiaAni.setAnimation(0, 'idle', true)
        	that.img_nvguanjia.setFlippedX(false);
        	that.showNvGuanjiaAni();
        })

        var callFunc3 = cc.callFunc(function() {
        	that._nvGuanjiaAni.setAnimation(0, 'walk', true)
        	that.img_nvguanjia.setFlippedX(true);
        })
        this.img_nvguanjia.runAction(cc.sequence(cc.delayTime(3),callFunc3,moveTo1,callFunc2));
	},
	showShouzhiAnm:function()
	{
		var that = this
        // var rotateTo1 = new cc.RotateTo(0.4, -40);
        // var rotateTo2 = new cc.RotateTo(0.8, 30);
        // var rotateTo3 = new cc.RotateTo(0.8, -40);
        // var rotateTo4 = new cc.RotateTo(0.4, 0);
        // var delayTime = new cc.DelayTime(1);
        // var moveTo1 = cc.moveTo(1.6, cc.p(200, 110));
        // var moveTo2 = cc.moveTo(1.6, cc.p(280, 110));
        // var	rotate = cc.sequence(rotateTo1, rotateTo2, rotateTo3, rotateTo2, rotateTo4)
        // var moveTo = cc.sequence(moveTo1,moveTo2)
        // this.img_shouzhi.runAction(cc.repeatForever(cc.spawn(moveTo,rotate)));
        // //this.img_shouzhi.runAction(cc.spawn (rotate.repeatForever(),moveTo.repeatForever()));

        // var rotateTo1 = new cc.RotateTo(0.4, -20);
        // var rotateTo2 = new cc.RotateTo(0.8, 20);
        // var rotateTo3 = new cc.RotateTo(0.8, -20);
        // var rotateTo4 = new cc.RotateTo(0.4, 0);
        // var delayTime = new cc.DelayTime(1);
        // this.img_shouzhi.runAction(cc.repeatForever(cc.sequence(rotateTo1, rotateTo2, rotateTo3, rotateTo2, rotateTo4, delayTime)));

        //cc.fadeIn(1),
        var addDongGanGuangBo = cc.callFunc(function() {
            var dongGanGuangBo =  ccui.ImageView.create("friendCards/common/img_dianjiquan.png"); 
            dongGanGuangBo.setScale(0.5)
         	dongGanGuangBo.runAction(cc.sequence(cc.scaleBy(0.01,2.5),cc.callFunc(function(){
         		dongGanGuangBo.removeFromParent()
         	})))
         	dongGanGuangBo.name = "dongGanGuangBo"
         	this.img_nvguanjia.addChild(dongGanGuangBo);

         	var dongGanGuangBo1 =  ccui.ImageView.create("friendCards/common/img_dianjiquan.png"); 
         	dongGanGuangBo1.setScale(0.5)
         	dongGanGuangBo1.runAction(cc.sequence(cc.scaleBy(0.03,2.5),cc.callFunc(function(){
         		dongGanGuangBo1.removeFromParent()
         	})))
         	dongGanGuangBo1.name = "dongGanGuangBo"
         	this.img_nvguanjia.addChild(dongGanGuangBo1);

         	var dongGanGuangBo2 =  ccui.ImageView.create("friendCards/common/img_dianjiquan.png"); 
         	dongGanGuangBo2.setScale(0.5)
         	dongGanGuangBo2.runAction(cc.sequence(cc.scaleBy(0.05,2.5),cc.callFunc(function(){
         		dongGanGuangBo2.removeFromParent()
         	})))
         	dongGanGuangBo2.name = "dongGanGuangBo"
         	this.img_nvguanjia.addChild(dongGanGuangBo2);

         	dongGanGuangBo.setPosition(cc.p(128,130))
         	dongGanGuangBo1.setPosition(cc.p(128,130))
         	dongGanGuangBo2.setPosition(cc.p(128,130))

        }.bind(this));
        

        var rotateTo1 = new cc.RotateTo(0.08, -10);
        var rotateTo2 = new cc.RotateTo(0.08, 5);
        var rotateTo3 = new cc.RotateTo(0.08, -10);
        var rotateTo4 = new cc.RotateTo(0.08, 0);
        //var delayTime = new cc.DelayTime(1);
        var moveTo1 = cc.moveTo(0, cc.p(350, 50));
        var moveTo2 = cc.moveTo(0.2, cc.p(230, 50));
        var	rotate = cc.sequence(rotateTo1, rotateTo2, rotateTo3,rotateTo2)
        var moveTo = cc.sequence(moveTo1,moveTo2,rotateTo1,addDongGanGuangBo,rotateTo2, rotateTo3,addDongGanGuangBo,rotateTo4)

        if(cc.sys.isObjectValid(this.img_shouzhi))
        {
        	this.img_shouzhi.stopAllActions();
        	this.img_shouzhi.runAction(cc.repeatForever(cc.sequence(moveTo,cc.delayTime(2))));
        }
	},
	showClubList: function(time) {
		var that = this;
		var px = -(that._node_clubList.width / 20); //-(that._node_clubList.getChildByName("clubListView").x - 30)
		if(isIPhoneX())
			px = 0
     
		if(this._node_clubList.isShow == true )
			return;

        this._node_clubList.isShow = true;

		that._node_clubList.stopAllActions();
		that.listView_table.stopAllActions();

        //俱乐部桌子
        var listView_tableGoX = this.listView_table.x + that._node_clubList.width / 2 + 10;
        this.listView_table.runAction(cc.sequence(cc.callFunc(function(){
             //that._node_clubList.visible = true;
        }),cc.moveTo(0.3, cc.p(listView_tableGoX , 67))))
        
        //俱乐部列表
        this._node_clubList.runAction(cc.sequence(cc.callFunc(function(){
             that._node_clubList.visible = true;
        }),cc.moveTo(0.3, cc.p(px, 0)),cc.delayTime(0.2),cc.callFunc(function(){
            // that._node_clubListbg.enabled = true;
             that._node_clubList.enabled = true

             if(!time)
             	that._node_clubList.stopAllActions();
        })));



        if(time)
        {
        	this.closeClubList(time);
        }
	},
	
	closeClubList:function(time){
		if(this.clubList.length == 0)
			return;

		//点击屏幕会一直执行closeClubList  这里isShow判断
		if(this._node_clubList.isShow == false)
			return;

		if(!time)
			this._node_clubList.isShow = false;

		var that = this;
		that._node_clubList.stopAllActions();
		that.listView_table.stopAllActions();
		
        this._node_clubList.runAction(cc.sequence(cc.delayTime(0.01),
        	cc.callFunc(function() {
            	if(that.clubList.length == 0)
                {
                	that._node_clubList.stopAllActions();
                }
            }),
			cc.delayTime(time ? time : 0),
        	cc.moveTo(0.3, cc.p(-that._node_clubList.width*that._node_clubList.scale, 0)),
        	cc.callFunc(function() {
                that._node_clubList.visible = false;
                that._node_clubList.enabled = false;
				that._node_clubList.isShow = false;
            })
        ));

        this.listView_table.runAction(cc.sequence(
        	cc.delayTime(time ? time : 0),
        	cc.callFunc(function(){
        	//that._node_clubList.visible = true;
        	}),
        	cc.moveTo(0.3, cc.p(that.listView_table.initX , 67))))
		
	},
	refreshRuleList: function() {
		var that = this;
		if(!cc.sys.isObjectValid(MjClient.FriendCard_infoUI)){
			FriendCard_Common.reSetRuleParm();
		}
		//同屏/非同屏切换重置玩法配置
		if(FriendCard_Common.getClubRulesSelectOSD(that.clubId) != FriendCard_Common.getOSDClub()){
			FriendCard_Common.reSetClubRulesSelect(that.clubId,-1);
		}
		FriendCard_Common.setClubRulesSelectOSD(that.clubId,FriendCard_Common.getOSDClub());

		var btn_all_rule = this._btn_all_rule;
		btn_all_rule.visible = false;
		btn_all_rule.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				//非同屏才会显示全部玩法按钮
				FriendCard_Common.reSetClubRulesSelect(that.clubId,-1);
				that.refreshRuleList();
				that.refreshDeskList();
			}
		});

		var btn_outline_rule = this._btn_outline_rule;
		btn_outline_rule.visible = FriendCard_Common.isManager();
		btn_outline_rule.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				FriendCard_Common.setOnlyShowOutLineDesk(FriendCard_Common.isOnlyShowOutLineDesk() ? 0 : 1);
				that.refreshRuleList();
				that.refreshDeskList();
			}
		});

		var btn_rule_cell = this._listView_rule.getChildByName("btn_rule_cell");
		btn_rule_cell.visible = false;
		var btn_addRule = this._listView_rule.getChildByName("btn_addRule");
		btn_addRule.visible = false;

		btn_addRule.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				that.closeClubList();
				MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tianjiawanfa", {uid:SelfUid()});
				var index = sender.getTag();
				if (FriendCard_Common.getClubisLM()) {
					that.addChild(new FriendCard_LM_info(that.data, MjClient.FriendCard_main_ui, index));
				} else {
					that.addChild(new FriendCard_info(that.data, MjClient.FriendCard_main_ui, index));
				}
			}
		});

		function setAllRuleBtnsUI(btn,isBright){
        	if(!isBright){
        		btn.getChildByName("text").setTextColor(cc.color("#ffffff"));
        		btn.getChildByName("text").enableOutline(cc.color("#8b130f"),2);
        		btn.setPositionY(that._listView_rule.y - (that._listView_rule.height - btn_addRule.y));
        	}else{
        		btn.getChildByName("text").setTextColor(cc.color("#862212"));
        		btn.getChildByName("text").enableOutline(cc.color(187,77,24,0),1);
        		btn.setPositionY(that._listView_rule.y - (that._listView_rule.height - btn_rule_cell.y));
        	}
        	btn.setBright(!isBright);
        }		
        function setRuleBtnsUI(btn,isBright){
        	if(!isBright){
        		btn.getChildByName("text_rule_no").setTextColor(cc.color("#ffffff"));
        		btn.getChildByName("text_rule_no").enableOutline(cc.color("#8b130f"),2);
        		btn.getChildByName("text").setTextColor(cc.color("#ffffff"));
        		btn.getChildByName("text").enableOutline(cc.color("#8b130f"),2);
        		btn.setPositionY(btn_addRule.y);
        	}else{
        		btn.getChildByName("text_rule_no").setTextColor(cc.color("#862212"));
        		btn.getChildByName("text_rule_no").enableOutline(cc.color(187,77,24,0),1);
        		btn.getChildByName("text").setTextColor(cc.color("#862212"));
        		btn.getChildByName("text").enableOutline(cc.color(187,77,24,0),1);
        		btn.setPositionY(btn_rule_cell.y);
        	}
        	btn.setBright(!isBright);
        }
		var indexs = [];
		this.ruleBtnNum = FriendCard_Common.getRuleNumber();
        this._ruleSort = {};
		for (var i = 1; i <= this.ruleBtnNum; i ++) {
			var btn_rule = this._listView_rule.getChildByName("btn_rule_"+i);
			if(btn_rule){
				btn_rule.visible = false;
			}
			var rule = this.data.info["rule" + i];
			if (rule && rule != "delete"){
                indexs.push(i);
                this._ruleSort[i] = indexs.length;
			}
		}
        var ruleBtns = [];
		var clubRulesSelect = FriendCard_Common.getClubRulesSelect(that.clubId);
		for (var i = 0; i <=indexs.length-1; i++) {
			var btn_rule = this._listView_rule.getChildByName("btn_rule_"+i);
			if(!btn_rule){
				btn_rule = btn_rule_cell.clone();
				btn_rule.setName("btn_rule_"+i);
				this._listView_rule.addChild(btn_rule);
			}
			btn_rule.visible = true;
			btn_rule.setTag(indexs[i]);
			var text = btn_rule.getChildByName("text");
			text.ignoreContentAdaptWithSize(true);

			var textRuleNo = btn_rule.getChildByName("text_rule_no");
			textRuleNo.ignoreContentAdaptWithSize(true);
			textRuleNo.setString("");
			var rule = this.data.info["rule" + indexs[i]];
			if (rule.ruleName) {
				var splitRuleName = FriendCard_Common.splitClubRuleName(unescape(rule.ruleName));
				textRuleNo.setString(splitRuleName[0]+"");
				var ruleName = splitRuleName[1];
				if(!splitRuleName[0]){
					ruleName = GameCnName[rule.gameType]+"";
				}
				var textName = "";
				for (var j = 0; j < ruleName.length; j++) {
					if (j ==  ruleName.length-1){
						textName = textName + ruleName.charAt(j);
					}else{
						textName = textName + ruleName.charAt(j) + "\n";
					}
				}
				if (ruleName.length <= 4) {
					text.setFontSize(24);
					text.getVirtualRenderer().setLineSpacing(-8);
				}else if(ruleName.length == 5){
					text.setFontSize(21);
					text.getVirtualRenderer().setLineSpacing(-8);
				}else if(ruleName.length == 6){
					text.setFontSize(18);
					text.getVirtualRenderer().setLineSpacing(-7);
				}else if(ruleName.length >= 7){
					text.setFontSize(15);
					text.getVirtualRenderer().setLineSpacing(-7);
				}
				text.setString(textName);
			}
			btn_rule.setEnabled(true);
			setRuleBtnsUI(btn_rule,clubRulesSelect.indexOf(btn_rule.getTag()) > -1 ? true : false);
			//序号
			var text_xuhao = btn_rule.getChildByName("text_xuhao");
			if(text_xuhao){
				text_xuhao.setString(i+1);
				text_xuhao.ignoreContentAdaptWithSize(true);
				text_xuhao.setVisible(true);
			}

			//自主创房角标
			var img_jiaobiao = btn_rule.getChildByName("img_jiaobiao");
			if(img_jiaobiao){
				img_jiaobiao.visible = rule.customInfo;
			}

			btn_rule.addTouchEventListener(function(sender, type) {
				if (type == 2) {
					this.closeClubList();
					var index = sender.getTag();
					var preIsCustomRule = that.curIsCustomRule();
					that.ruleIndex = index;
					var curIsCustomRule = that.curIsCustomRule();
					var isMulSelect = FriendCard_Common.getOSDClub(that);
					if(preIsCustomRule || curIsCustomRule){
						isMulSelect = false;
					}
					FriendCard_Common.reSetClubRulesSelect(that.clubId,index,sender.isBright(),isMulSelect);
					that.refreshRuleList();
					that.refreshDeskList();

				}
			}, this);
			ruleBtns.push(btn_rule);
		}

		if (FriendCard_Common.getClubisLM()) {
			if (indexs.length < this.ruleBtnNum && this.isCreator()) {
				btn_addRule.visible = true;
			}
		} else {
			if (indexs.length < this.ruleBtnNum && this.isManager()) {
				btn_addRule.visible = true;
			}
		}
		var baseItemCount = 4;
		var itemSpace = (this._listView_rule.width - btn_rule_cell.width * baseItemCount) / (baseItemCount-1);
		var itemCount = ((indexs.length) + (btn_addRule.visible ? 1 : 0))
		var innerWidth = itemCount * btn_rule_cell.width + (itemCount - 1) * itemSpace;
		if(innerWidth < this._listView_rule.width){
			innerWidth = this._listView_rule.width;
		}
		this._listView_rule._scrollx = -this._listView_rule.getInnerContainerPosition().x;
		if(this._listView_rule._scrollx < 0){
            this._listView_rule._scrollx = 0;
        }else if(this._listView_rule._scrollx > innerWidth){
        	this._listView_rule._scrollx = innerWidth;
        }

		this._listView_rule.setInnerContainerSize(cc.size(innerWidth, this._listView_rule.height));
		this._listView_rule.setInnerContainerPosition(cc.p(-this._listView_rule._scrollx,this._listView_rule.getInnerContainerPosition().y))

		var startX = (itemCount < baseItemCount) ? ((baseItemCount - itemCount) * (btn_rule_cell.width + itemSpace)) : 0;
		var allSortBtn = [];
		allSortBtn = allSortBtn.concat(ruleBtns);
		allSortBtn.push(btn_addRule);
		for(var i = 0; i < allSortBtn.length; i++){
			var dx = i * (btn_rule_cell.width + itemSpace)
			allSortBtn[i].setPositionX(startX +dx);
		}

		if(btn_outline_rule.visible){
			btn_outline_rule.setPositionX(this._listView_rule.x - (this._listView_rule.width - startX) - itemSpace - btn_all_rule.width);
			btn_all_rule.setPositionX(this._listView_rule.x - (this._listView_rule.width - startX) - 2 * (itemSpace + btn_all_rule.width));
		}else{
			btn_all_rule.setPositionX(this._listView_rule.x - (this._listView_rule.width - startX) - itemSpace - btn_all_rule.width);
		}
		
		setAllRuleBtnsUI(btn_all_rule,clubRulesSelect.indexOf(-1) > -1 ? true : false);
		setAllRuleBtnsUI(btn_outline_rule,FriendCard_Common.isOnlyShowOutLineDesk() ? true : false);
		
		if(FriendCard_Common.getOSDClub(that)){
			btn_all_rule.visible = true;
		}else{
			btn_all_rule.visible = false;
		}
		that.reflashPrivacyRoom((clubRulesSelect.indexOf(-1) > -1));

	},
	curIsCustomRule:function(){
		var rule = this.data.info["rule"+this.ruleIndex];
        if(rule && rule.customInfo ){
            return true;
        }
        return false;
	},
	reflashPrivacyRoom:function (forceHide) {
        if(isJinZhongAPPType()){
            var rule = this.data.info["rule"+this.ruleIndex];
            if(rule && rule.customInfo && !forceHide){
                this._btn_privacyRoom.visible = true;
                this.back.loadTexture("friendCards/main/img_2D.jpg");
            }
            else{
                this.back.loadTexture("friendCards/main/main_bg.jpg");
                this._btn_privacyRoom.visible = false;
            }
        }
    },
	initDeskData:function () {
		if(this._hasInitDeskData){
			return;
		}
        this._hasInitDeskData = true;
        this._deskLayoutSize = 2;//修改这个值影响很大，慎重
        this._deskItemSize = 4;//一个layout有多少列
        this._deskMaxPlayerNum = 6;
        this._deskRankNum = 2;
        this._deskScrollx = 0;//这个值很重要，根据这个值来获取起始的i
        this._deskMaxScrollx = 0;
        this.listView_table.setScrollBarEnabled(false);
        this.listView_table.layoutWidth = this.listView_table.getChildByName("deskLayout_1").width;
        for(var p = 0; p < this._deskLayoutSize; p++){
        	var deskLayout = this.listView_table.getChildByName("deskLayout_"+(p+1));
        	if(!deskLayout){
        		deskLayout = this.listView_table.getChildByName("deskLayout_1").clone();
        		deskLayout.name = "deskLayout_"+(p+1);
        		this.listView_table.addChild(deskLayout);
        	}
			for(var i = 0; i < this._deskItemSize; i++){
	        	var item = deskLayout.getChildByName("item_"+(i+1));
	        	if(!item){
	        		continue;
	        	}
	        	var childrens = item.getChildren();
	        	for(var j = 0; j < childrens.length; j++){
	        		childrens[j].visible = false;
	        		for(var k = 0; k < this._deskMaxPlayerNum; k++){
	        			var head = childrens[j].getChildByName("head_" + (k + 1));
	        			if(head){
	            			var name = head.getChildByName("Text_name");
							name.setString("");
	            			head.getChildByName("Text_nameBg").visible = false;
	        			}
	        		}
	        	}
	        }
        }
        
    },
	refreshDeskList: function(params){ // 刷新左侧牌桌列表
		if(!params){
			params = {};
		}
		if(!FriendCard_Common.isShowTable(this))
			return;

		this._node_desk.getChildByName("text_isShowZhuozi").visible = false;

		if (!this.data.room["roomList" + this.ruleIndex])
			this.data.room["roomList" + this.ruleIndex] = [];

		this._img_stop.visible = this.data.info.createSwitch == 0;

		this._img_dayang_tip.visible = false;
		if(!this._img_stop.visible){
			if(this.data.info.useClose == 1){
				if(FriendCard_Common.isInDaYangTime()){
					this._img_dayang_tip.visible = true;
					var startHour = this.data.info.dailyCloseTime.substring(0,2);
    				var startMinute = this.data.info.dailyCloseTime.substring(3,5);
    				var endHour = this.data.info.dailyCloseTime.substring(6,8);
    				var endMinute = this.data.info.dailyCloseTime.substring(9,11);
					if(!this._img_dayang_tip.getChildByName("text")){
						var text = new ccui.Text("","fonts/lanting.TTF",24);
						text.setName("text");
						text.setPosition(cc.p(this._img_dayang_tip.width/2,this._img_dayang_tip.height/2));
						text.setTextColor(cc.color("#cfeaff"));
					    this._img_dayang_tip.addChild(text);
					}
					this._img_dayang_tip.getChildByName("text").setString("本亲友圈今天已打烊~\n打烊时间"+startHour+":"+startMinute+"——"+endHour+":"+endMinute)
				}
			}
		}
		this._img_hide_club_tip.visible = this.data.info.clubHideStatus == 1;
		if(!this._img_stop.visible){
			this._img_stop.visible = this.data.info.clubHideStatus == 1;
		}
		this._img_check.setVisible(false);

		this.initDeskData();

		var clubRulesSelect = FriendCard_Common.getClubRulesSelect(this.clubId);
		
		
		//俱乐部桌子排序
		if(params.isUpdate && this._deskRoomData){
			var hasSort = FriendCard_Common.reHandleDeskSort(this,params);
			if(!hasSort){
				//数据没有变化不用处理
				return;
			}
		}else{
			var rule = this.data.info["rule" + this.ruleIndex];
			this.customInfo = (rule && rule.customInfo && clubRulesSelect.indexOf(-1) < 0);
			//俱乐部桌子排序
			if (this.customInfo) {
				var ruleRoomData = FriendCard_Common.deskSort(this,this.ruleIndex);
			} else {
				//非自主创房排序
				var ruleRoomData = FriendCard_Common.deskSort(this);
			}
        	this._deskRoomData = ruleRoomData;
		}
		//更新桌子数量,晋中皮肤没有
		//this.updateDeskNum(ruleRoomData);
		//测试加桌子用
        /*for(var k = 0 ;k < 20;k++){
            ruleRoom.push(ruleRoom[0]);
		}*/
		var ruleRoom = this._deskRoomData.ruleRoom;
		var rowNum = (parseInt(ruleRoom.length /this._deskRankNum) + ((ruleRoom.length %this._deskRankNum) == 0 ? 0 : 1));
		
		this._deskMaxScrollx = rowNum * (this.listView_table.layoutWidth/this._deskItemSize);
		if(this._deskMaxScrollx < this.listView_table.width){
			this._deskMaxScrollx = this.listView_table.width
		}

		this.listView_table.setInnerContainerSize(cc.size(this._deskMaxScrollx, this.listView_table.height))
		var posX = this._deskScrollx > this._deskMaxScrollx ? (-this._deskMaxScrollx) : (-this._deskScrollx);
		this.listView_table.setInnerContainerPosition(cc.p(posX,this.listView_table.getInnerContainerPosition().y))
		//这里一定要删除_lastRound字段，不然房间不会刷新
		delete this.listView_table._lastRound;
		this.refreshDeskItem();
		FriendCard_UI.setClubDeskTouchEvent(this.listView_table);
		//this.updateBG();//晋中皮肤没有
	},
	getDeskStartIndexByScrollX:function(){
		var index = 0;
		if(this.listView_table._lastRound){
			index = this.listView_table._lastRound * this._deskItemSize * this._deskRankNum;
		}
		return index;
	},
	
    refreshDeskItem:function(){
    	var shouldRefresh = this.refreshDeskItemPosition();
    	if(shouldRefresh){
    		var ruleRoom = this._deskRoomData.ruleRoom;
	    	var startIndex = this.getDeskStartIndexByScrollX();
	        var endIndex = startIndex + this._deskLayoutSize * this._deskItemSize * this._deskRankNum;
	        
			for (var i = startIndex; i < endIndex; i++) {
				var room = ruleRoom[i];
				this.buildDeskItem(i,room);
			}
    	}
    },
    refreshDeskItemPosition:function(){
    	var childrens = this.listView_table.getChildren();
    	if(this._deskScrollx < 0){
            this._deskScrollx = 0;
        }else if(this._deskScrollx > this._deskMaxScrollx){
        	this._deskScrollx = this._deskMaxScrollx;
        }
        
    	//滑动了多少个面板
    	var round = parseInt(parseInt(this._deskScrollx)/this.listView_table.layoutWidth);
    	var preLastRound = this.listView_table._lastRound;
    	if(preLastRound === round){
        	return false;
        }
        this.listView_table._lastRound = round;

        /*if(this.listView_table._lastRound > 0){
        	var startIndex = this.getDeskStartIndexByScrollX();
	        if(!this._deskRoom[startIndex + this._deskItemSize * this._deskRankNum]){
	        	//避免最后的item是null导致缺失桌子
	        	round -= 1;
	        	this.listView_table._lastRound = round;
	        	// if(preLastRound === this.listView_table._lastRound){
		        // 	//return false;
		        // }
	        }
        }*/
        if(this._deskMaxScrollx == 0){
        	delete this.listView_table._lastRound;
        }
        cc.log("refreshDeskItemPosition round",round)
        for(var p = 0; p < this._deskLayoutSize; p++){
        	var deskLayout = this.listView_table.getChildByName("deskLayout_"+(p+1));
        	var posX = (parseInt(round/2)*2 + p) * this.listView_table.layoutWidth;
        	if(p == 0){
        		posX += (round % 2) * 2 * this.listView_table.layoutWidth;
        	}
        	deskLayout.setPosition(cc.p(posX,0))
        	if(posX >= this._deskMaxScrollx || this._deskMaxScrollx == 0){
        		deskLayout.visible = false;
        	}else{
        		deskLayout.visible = true;
        	}
        }
        return true;
    },
	deleteCellRemoteHeadUI:function (headNode) {
		return;
    },
	getDeskItem:function (i) {
        var deskLayoutName = "deskLayout_"+parseInt((i%(this._deskRankNum * this._deskItemSize * this._deskLayoutSize))/ (this._deskRankNum * this._deskItemSize)+1);
        var p2 = (parseInt((i%(this._deskRankNum * this._deskItemSize))/(this._deskRankNum))+1);
        var name2 = "item_"+ p2;
        var item = this.listView_table.getChildByName(deskLayoutName).getChildByName(name2);
        if(!item){
        	var cloneItem = this.getDeskItem(0);
        	item = cloneItem.clone();
        	item.x = (p2-1) * item.width;
        	item.name = name2;
        	for(var k = 0; k < cloneItem.children.length; k++){
        		var cloneCell = cloneItem.children[k];
        		for (var j = 0; j < 6; j++) {
        			if(cloneCell.name){
        				var cell = item.getChildByName(cloneCell.name);
			            var head = cell.getChildByName("head_" + (j + 1));
			            var yizi = cell.getChildByName("yizi_" + (j + 1));

			            var headClone = cloneCell.getChildByName("head_" + (j + 1));
			            var yiziClone = cloneCell.getChildByName("yizi_" + (j + 1));
			            if(headClone && headClone.initPos && head){
			            	head.initPos = headClone.initPos;
			            }
			            if(yiziClone && yiziClone.initPos && yizi){
			                yizi.initPos = yiziClone.initPos;
						}
        			}
		        }
        	}
        	this.listView_table.getChildByName(deskLayoutName).addChild(item);
        }
        return item;
    },
	buildDeskItem:function(i,room,skinCfg){
		var item = this.getDeskItem(i);
		item.visible = true;
		for(var j = 0; j < 3; j++){
			var otherCell = item.getChildByName("cell"+(j+3)+"_"+(i%2+1));
			if(otherCell){
				otherCell.visible = false;
			}
		}
		if(item.getChildByName("cell_new_"+(i%2+1))){
			item.getChildByName("cell_new_"+(i%2+1)).visible = false;
		}
		
		if(!room){
        	return;
        }
        var cell = null;
        var isMask = false;
        var cloneCellName = "";
		//这里修改item 晋中5人桌和新桌子
		if (room.maxPlayer == 5) {
			cloneCellName = "cell5";
			cell = item.getChildByName("cell5_"+(i%2+1));
		}else if(this.customInfo){
			cloneCellName = "cell_new";
			cell = item.getChildByName("cell_new_"+(i%2+1));
		}else if(room.maxPlayer < 4 && isJinZhongAPPType()){//小于4人的时候用圆桌
			cloneCellName = "cell3";
			cell = item.getChildByName("cell3_"+(i%2+1));
			isMask = true;
		}else{//4人的时候用方桌
			cloneCellName = "cell4";
			cell = item.getChildByName("cell4_"+(i%2+1));
			isMask = true;
		}
        if(!cell){
        	var cloneCell = this.getDeskItem(0).getChildByName(cloneCellName+"_1");
        	cell = cloneCell.clone();
        	cell.name = cloneCellName+"_"+(i%2+1);
        	cell.setPosition(cc.p(item.width/2,((i%2+1) == 1)? cloneCell.y : (item.height - cloneCell.y)));
        	for (var j = 0; j < 6; j++) {
	            var head = cell.getChildByName("head_" + (j + 1));
	            var yizi = cell.getChildByName("yizi_" + (j + 1));
	            var headClone = cloneCell.getChildByName("head_" + (j + 1));
	            var yiziClone = cloneCell.getChildByName("yizi_" + (j + 1));
	            if(headClone && headClone.initPos && head){
	            	head.initPos = headClone.initPos;
	            }
	            if(yiziClone && yiziClone.initPos && yizi){
	                yizi.initPos = yiziClone.initPos;
				}
	        }
        	item.addChild(cell);
        }

        
        if(i%2 == 0){
        	cell.scale = 0.94
        }
        cell.setVisible(true);
        cell.room = room;
        cell.isMask = isMask;
        cell.addTouchEventListener(this.joinGame,this);

        var isMask = cell.isMask;

        var table = cell.getChildByName("table");
        var roundNumText = table.getChildByName("text_roundNum");
        FriendCard_Common.deskRoundNumText(this,roundNumText,room);

        var textRuleNo = table.getChildByName("text_rule_no");
        textRuleNo.ignoreContentAdaptWithSize(true);
        var splitRuleName = FriendCard_Common.splitClubRuleName(unescape(this.data.info["rule" + room.ruleIndex].ruleName));
        if(splitRuleName[0]){
        	textRuleNo.setString("("+splitRuleName[0]+")")
        }else{
			textRuleNo.setString("");
        }

		var btn_detail = table.getChildByName("Button_detail");
        if(btn_detail){
        	btn_detail.addTouchEventListener(function (sender,type) {
				if(type == 2){
					MjClient.FriendCard_main_ui.addChild(new FriendCard_rule_detail(cell.room));
				}
			})
        }
        for (var j = 0; j < 4 || j < room.maxPlayer; j++) {
            var head = cell.getChildByName("head_" + (j + 1));
            var yizi = cell.getChildByName("yizi_" + (j + 1));
            if(!head.initPos){
                head.initPos = head.getPosition();
			}
            if(yizi){
            	if(!yizi.initPos){
                	yizi.initPos = yizi.getPosition();
            	}
            	yizi.setPosition(yizi.initPos);
            	yizi.setVisible(true);
            }	
            head.setPosition(head.initPos);
            head.setVisible(true);
            // 当2人玩/3人玩时，不显示多余的头像、椅子
            if (j >= room.maxPlayer) {
                if (yizi){
                    yizi.setVisible(false);
                }
                head.setVisible(false);
                continue;
            }

            //当3人玩的时候 左上角的桌子位置换到右下角
            if (room.maxPlayer == 3 && j == 2 && MjClient.getAppType() != MjClient.APP_TYPE.TXJINZHONGMJ && MjClient.getAppType() != MjClient.APP_TYPE.DQSHANXIMJ){
                var head4P = cell.getChildByName("head_4").initPos ? cell.getChildByName("head_4").initPos : cell.getChildByName("head_4").getPosition();
            	var yizi4P = cell.getChildByName("yizi_4").initPos ? cell.getChildByName("yizi_4").initPos : cell.getChildByName("yizi_4").getPosition();

                head.setPosition(head4P);
                yizi.setPosition(yizi4P);
            }

            //没有玩家的时候不显示头像， 晋中显示坐下头像
            if (!room.players || j > room.players.length - 1){
                head.setVisible(false);
                continue;
            }

            if (yizi){
                yizi.setVisible(false);
            }

            head.isMask = isMask;
            this.deleteCellRemoteHeadUI(head);
            this.refreshHead(room.players[j].headimgurl, head);

            head.getChildByName("Text_nameBg").visible = true;

            var name = head.getChildByName("Text_name");
			name.setString(getNewName_new(unescape(room.players[j].nickname),isMask ? 5 : 6));
			name.setFontName("Arial");
			name.setFontSize(name.getFontSize());
			name.ignoreContentAdaptWithSize(true);

            var off_line = head.getChildByName("img_off_line");
            off_line.visible = (room.players[j].offline == true);
            off_line.zIndex = 11;
        }

        //里面处理晋中其他的不同
		if(isJinZhongAPPType() && this.customInfo){
			cell.getChildByName("text_info").visible = true;
			cell.getChildByName("img_info").visible = true;
			cell.getChildByName("btn_info").visible = true;

			var ruleGameType = this.data.info["rule" + this.ruleIndex].gameType;
			var text_info1 = cell.getChildByName("text_info").getChildByName("text");
			var appTypeList = [2018070,2018071,2018072,2018073,2018076,2018075,2017050,2018096]
			if(room.gameType == ruleGameType || appTypeList.indexOf(room.gameType) != -1){
				var str = getNewName_new(unescape(room.shortDesc),18);
			}
			else{
				var str = getNewName_new(unescape(room.ruleDesc),18);
			}
            
			text_info1.ignoreContentAdaptWithSize(true)
			text_info1.setString(str);

			var img_info = cell.getChildByName("img_info");
			img_info.visible = false;
			if(room.ruleDesc){
				img_info.getChildByName("text").setString(unescape(room.ruleDesc))
			}
			else{
				img_info.getChildByName("text").setString(unescape(this.data.info["rule" + this.ruleIndex]).ruleDesc)
			}

			var btn_info = cell.getChildByName("btn_info");
			btn_info.addTouchEventListener(function(sender, type) {
				if (type == 2) {
					MjClient.FriendCard_img_info = sender.getParent().getChildByName("img_info");
					MjClient.FriendCard_img_info.visible = true;
				}
			}, this);
		}
		//5人并且不是自主创房的时候, 隐藏信息
		else if(isJinZhongAPPType() &&  room.maxPlayer == 5 && !this.customInfo){
			cell.getChildByName("text_info").visible = false;
			cell.getChildByName("img_info").visible = false;
			cell.getChildByName("btn_info").visible = false;
		}
		
		//晋中桌子不显示标签
		if(isJinZhongAPPType()){
			var image_19 = cell.getChildByName("Image_19");
			if(image_19){
				image_19.visible = false;
			}
		}
		else if(cell.getChildByName("Image_19")){
			var text_xuhao = cell.getChildByName("Image_19").getChildByName("Text_xuhao");
			if(text_xuhao){
				text_xuhao.ignoreContentAdaptWithSize(true);
				text_xuhao.setString(this._ruleSort[room.ruleIndex]);
			}
		}

		if(room.maxPlayer != 5){
			if (i%2 == 0) {
				if(this.customInfo){
					cell.setPosition(cc.p(item.width * 0.5, item.height * 0.73));
				}
				else{
					cell.setPosition(cc.p(item.width * 0.5, item.height * 0.65));
				}
			}else{
				if(this.customInfo){
					cell.setPosition(cc.p(item.width * 0.5, item.height * 0.25));
				}
				else{
					cell.setPosition(cc.p(item.width * 0.5, item.height * 0.23));
				}
			}
		}else{
			if (i%2 == 0) {
				cell.setPosition(cc.p(item.width * 0.5, item.height * 0.75));
			}else{
				cell.setPosition(cc.p(item.width * 0.5, item.height * 0.27));
			}
		}
	},
	//比赛场排名变化动画
	showMatchRankChangeAni: function(){
		var rankChangeNum = 0;
		if (this._matchData && typeof(this._matchData.rank) != "undefined") {
			var preRank = util.localStorageEncrypt.getNumberItem("Friendcard_Match_Rank_" + this.clubId, 0);
			util.localStorageEncrypt.setNumberItem("Friendcard_Match_Rank_" + this.clubId, this._matchData.rank);
			if (preRank == 0 || preRank == 1000 || preRank == 1001 || this._matchData.rank == 1000 || this._matchData.rank == 1001) {
				//之前没有记录或者记录为后台给的初始默认值直接返回
				return;
			}
			rankChangeNum = this._matchData.rank - preRank;
		}
		if (rankChangeNum == 0 ) {
			return;//排名没有变化直接返回
		}

		var img_sspmBg = this.matchNode.getChildByName("img_sspmBg");
		var txt_rankChangeNum = img_sspmBg.getChildByName("txt_rankChangeNum");
		var txt_rankChangeType = img_sspmBg.getChildByName("txt_rankChangeType")
		img_sspmBg.setVisible(true);
		img_sspmBg.setOpacity(255);
		txt_rankChangeNum.ignoreContentAdaptWithSize(true);
		txt_rankChangeNum.visible = false;
		txt_rankChangeType.ignoreContentAdaptWithSize(true);

		if (rankChangeNum < 0) {
			txt_rankChangeType.setString("上升");
		}else{
			txt_rankChangeType.setString("下降");
		}

		//滚动蒙版
		var clippingNode=new cc.ClippingNode();
	    var mask=new cc.Sprite("friendCards_Match/img_sspm_bg.png");
	    clippingNode.setAlphaThreshold(0);
	    clippingNode.setStencil(mask);
	    clippingNode.setAnchorPoint(0.5,0.5);
	    clippingNode.setPosition(img_sspmBg.width/2,img_sspmBg.height/2);
	    img_sspmBg.addChild(clippingNode);

	    //滚动数字
	    for (var i = 9; i >= 0; i--) {
	    	var item = txt_rankChangeNum.clone();
	    	item.visible = true;
	    	clippingNode.addChild(item);
	    	item.setPosition(clippingNode.width/2+3,clippingNode.height/2);
	    	item.y = item.y - i*item.height;
	    	item.setString(i);
	    	var yOfffset = i*item.height+100;
	    	item.runAction(cc.sequence(cc.moveBy(yOfffset/100, 0, yOfffset)));
	    }
	    //最后变化的排名
	    var finalChangeNum = txt_rankChangeNum.clone();
	    finalChangeNum.visible = true;
	    clippingNode.addChild(finalChangeNum);
	    finalChangeNum.setPosition(clippingNode.width/2+3,clippingNode.height/2);
	    finalChangeNum.y = finalChangeNum.y - 10*item.height;
	    finalChangeNum.setString(Math.abs(rankChangeNum));
	    var moveOffset = 10*item.height;
	    finalChangeNum.runAction(cc.sequence(
	    	cc.moveBy(moveOffset/100, 0, moveOffset),
	    	cc.scaleTo(0.3, 1.5), 
	    	cc.scaleTo(0.3, 1),
	    	cc.delayTime(1),
	    	cc.callFunc(function(){ 
	    	 	img_sspmBg.runAction(cc.sequence(cc.fadeOut(0.5), cc.callFunc(function(){
	    	 		clippingNode.removeFromParent();
	    	 	})))
	    	})
	    ));
	    
	},
	
});


