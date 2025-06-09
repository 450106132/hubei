/*
 * @Author: lms  ~~~~~~~~~~~~~~岳阳皮肤~~~~~~~~~~~~~~~~~~
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
		if(data){
			this.joinType = data.joinType || null;
			this.clubId = data.clubId || -1;
		}
		else{
			this.joinType = null;
			this.clubId = -1;
		}

		this.ruleIndex = 1;
		this.customInfo =false; //当前规则是否是可创建房间
		this.reallyWanfaNum = 0;
		this._matchData = null;

        this.ruleBtnNum = FriendCard_Common.getRuleNumber();

		if (MjClient.FriendCard_main_ui && cc.sys.isObjectValid(MjClient.FriendCard_main_ui))
			MjClient.FriendCard_main_ui.removeFromParent(true);

		var ui = ccs.load("friendcard_main.json");
		MjClient.FriendCard_main_ui = this;
		this.addChild(ui.node);
		var that = this;
		this._uiNode = ui.node;
		if (type == 1) {
			// 代表从主界面 进来
			FriendCard_Common.isPopView(this);
		}

		var back = this._uiNode.getChildByName("back");
		this.back = back;

		this.btn_showClubList = this._uiNode.getChildByName("btn_showClubList");
		if(isIPhoneX()){
            setWgtLayout(this.btn_showClubList, [0.0922, 0.3792], [0.025, 0.5], [0, 0]);
        }else {
            setWgtLayout(this.btn_showClubList, [0.0922, 0.3792], [0, 0.5], [0, 0]);
        }
        this._bg1 = this._uiNode.getChildByName("img_bg1");
        this._bg2 = this._uiNode.getChildByName("img_bg2");
        setWgtLayout(this._bg1, [1, 1], [0.5, 0.5], [0, 0],true);
        setWgtLayout(this._bg2, [1, 1], [0.5, 0.5], [0, 0],true);
        //主题窗外背景,亲友圈里面不用监听变化了，没有入口设置
        var themeIdx = MjClient.getUIThemeIndex();
        this.setTheme(themeIdx);

        //亲友圈列表按钮
		this.btn_showClubList.addTouchEventListener(function(sender, type) {
			if (type != 2)
				return;
				this.showClubList();
		}, this);

		//亲友圈列表
		MjClient.friendcard_main_clubList = ccs.load("friendcard_main_clubList.json").node
		this.addChild(MjClient.friendcard_main_clubList);
		this._node_clubList = MjClient.friendcard_main_clubList.getChildByName("node_clubList");
		cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function(touch, event){
            	MjClient.FriendCard_main_ui.closeClubList();
            }
        }), this._node_clubList);

		this._node_clubList.scale = MjClient.size.height / this._node_clubList.height;
		this._node_clubList.y = 0;
		this._node_clubList.x = -that._node_clubList.width * this._node_clubList.scale;
		this._node_clubList.visible = false;
		this._node_clubList.enabled = false;
		//杂七杂八
		this.initOther(back);
		this.initPanelTip();
		this.adaptation();
		setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
		// 底部信息栏
		this.initBottom();
		this.setNullShow(true);
		// 绑定事件
		FriendCard_Common.eventBind(that);
		this.requestClubList();

		if (FriendCard_Common.isOpenLM()){
			FriendCard_LM_handleInviteMsg(that);
		}

		if(MjClient._isNeedShowFriendCardActLuckyDraw){
			MjClient._isNeedShowFriendCardActLuckyDraw = false;
			MjClient.FriendCard_main_ui.runAction(cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
				MjClient.FriendCard_main_ui.addChild(new FriendCard_actLuckyDraw());
			})))
		}
	},
	setTheme: function(themeIdx){
		var themeInfo = MjClient.getThemeInfo(themeIdx);
        this._bg1.loadTexture("home_3.0/bg/" + themeInfo.bg);
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
		this.initDeskData();
        
		//右上角玩法
		this._ruleLayout = this._image_top.getChildByName("ruleLayout");
		this.initRuleCommonBtn()
		

		// 底部栏
		this._image_bottom = back.getChildByName("image_bottom");

		

		// 点击加入房间
		this._imgPoint = this._node_desk.getChildByName("Img_tip");// 空桌子箭头
		this._imgtext = this._node_desk.getChildByName("Image_tipText");

		// 关闭俱乐部列表
		this._btn_close = this._node_clubList.getChildByName("btn_close");
		this._btn_close.addTouchEventListener(function(sender, type) {
			if (type != 2)
				return;
			
			if (this.clubList.length == 0) {
				this.requestLeaveClub(true);
			} else {
				this.closeClubList();
			}
		}, this);

		//女管家
		this.img_nvguanjia = this._image_top.getChildByName("img_nvguanjia");
		this.img_nvguanjia.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				this.closeClubList();

				if (this.isManager()) {
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

		//俱乐部信息
		this._clubInfo = this._image_top.getChildByName("clubInfo");
		// 返回按钮
		var btn_fanhui = this._clubInfo.getChildByName("btn_fanhui");
		btn_fanhui.addTouchEventListener(function(sender, type) {
			if (type != 2)
				return;
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
		this.text_deskFullNum = this._clubInfo.getChildByName("text_deskFullNum");
		this.text_deskFullNum.ignoreContentAdaptWithSize(true);
		this.text_deskFullNum.visible = false;
		this.text_deskWaitNum = this._clubInfo.getChildByName("text_deskWaitNum");
		this.text_deskWaitNum.ignoreContentAdaptWithSize(true);
		this.text_deskWaitNum.visible = false;
		this.text_deskDeskInfo = this._clubInfo.getChildByName("text_deskDeskInfo");
		this.text_deskDeskInfo.ignoreContentAdaptWithSize(true);
		this.text_deskDeskInfo.visible = false;
		this.btn_deskInfo = this._clubInfo.getChildByName("btn_deskInfo");
		this.btn_deskInfo.addTouchEventListener(function(sender, type) {
			if (type != 2)
				return;
			var Image_bg = this.btn_deskInfo.getChildByName("Image_bg");
			var Image_line = Image_bg.getChildByName("Image_line")
			if (this.text_deskDeskInfo.visible == false) {
				this.text_deskDeskInfo.visible = true;
				this.text_deskWaitNum.visible = false;
				this.text_deskFullNum.visible = false;
				Image_line.visible = false;
				Image_bg.width = 60;
			}else{
				this.text_deskDeskInfo.visible = false;
				this.text_deskWaitNum.visible = true;
				this.text_deskFullNum.visible = true;
				Image_line.visible = true;
				Image_bg.width = 190;
			}
		}, this);
		
		this.gonggao_bg = this._clubInfo.getChildByName("gonggao_bg")
		//房卡
		this.fangkaBG = this._clubInfo.getChildByName("fangkaBG");
		if (this.fangkaBG) {
			COMMON_UI.setNodeTextAdapterSize(this.fangkaBG);
			var gotoStoreFunc = function(){
				if(that.data && that.data.info){
					if(that.data.info.type == 1){
						if(FriendCard_Common.isOpenFriendShop()){
							MjClient.block();
			                var sendInfo = {};
			                cc.log("isAuditAuth sendInfo",JSON.stringify(sendInfo));
			                MjClient.gamenet.request("pkplayer.handler.isAuditAuth", sendInfo,  function(rtn)
			                {
			                    MjClient.unblock();
			                    if(rtn.data && rtn.data.isFunc){
			                    	var hasSheet = (MjClient.systemConfig && MjClient.systemConfig.isNewDiamondOrder);
			                    	var showIndex = hasSheet ? 4 : 1; 
			                        var layer = enter_store(showIndex,true,rtn.data.isFunc);
									MjClient.Scene.addChild(layer);
			                    }
			                    else{
			                    	var layer = enter_store(1,true,false);
									MjClient.Scene.addChild(layer);
			                    }
			                });
						}else{
							var layer = enter_store(1);
							MjClient.Scene.addChild(layer);
						}
					}else{
						var layer = enter_store(0);
						MjClient.Scene.addChild(layer);
					}
				}
			}
			var btn_addFK = this.fangkaBG.getChildByName("btn_addFK")
			btn_addFK.addTouchEventListener(function(sender, type) {
				if (type == 2) {
					gotoStoreFunc();
				}
			});
			this.fangkaBG.setTouchEnabled(true)
			this.fangkaBG.addTouchEventListener(function(sender, type) {
				if (type == 2) {
					gotoStoreFunc();
				}
			});
			var text_fangka = this.fangkaBG.getChildByName("text_fangka")
			this.text_fangka = text_fangka;
			text_fangka.ignoreContentAdaptWithSize(true);
			text_fangka.setString("");
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
		this._friendShopSheetTipImg = this._clubInfo.getChildByName("Image_tip_shop_sheet");
		this.setShopSheetTip();
		//比赛场信息
		this.matchNode = this._clubInfo.getChildByName("matchBg");
		if(this.matchNode){
			COMMON_UI.setNodeTextAdapterSize(this.matchNode);
			this.matchNode.visible = false;
			var Text_score = this.matchNode.getChildByName("Text_score");
			var Text_rank = this.matchNode.getChildByName("Text_rank");
			Text_score.setString("");
			Text_rank.setString("");
			this.matchNode.getChildByName("Panel_rankChangeAni").setVisible(false);
		}
        //创建亲友圈
		this.btn_createQYQ = this._node_clubList.getChildByName("btn_create")
		this.btn_createQYQ.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				if (isAgent()) {
					this.addChild(new FriendCard_info());
					MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chuangjian", {uid:SelfUid()});
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
				this.addChild(new FriendCardFindLayer());
				MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Jiaru", {uid:SelfUid()});
			}
		}, this);

	},
	//水平居中的提示panel
	initPanelTip:function() {
		var panelTip = this._uiNode.getChildByName("Panel_tip");
		panelTip.setTouchEnabled(false);
		setWgtLayout(panelTip, [1, 1], [0.5, 0.5], [0, 0]);
		// 暂停开房
		this._img_stop = panelTip.getChildByName("img_stop");
		this._img_stop.setVisible(false);
		//打烊
		this._img_dayang_tip = panelTip.getChildByName("img_dayang_tip")
		this._img_dayang_tip.visible = false;
		//隐藏俱乐部
		this._img_hide_club_tip = panelTip.getChildByName("img_hide_club_tip")
		this._img_hide_club_tip.visible = false;
		// 群主请检查元宝是否足够开房
		this._img_check = panelTip.getChildByName("img_check");
		this._img_check.setVisible(false);
	},
	//设置主界面桌子
	setMainDeskBGImg: function(_ruleIndex, skinType,skinCfg) {
		if (!this.listView_table)
			return

		for (var i = 0; i < this.listView_table.children.length; i++) {
			var item = this.listView_table.children[i];
			for (var j = 0; j < item.children.length; j++) {
				//cell
				var desks = item.children[j];
				for (var q = 0; q < desks.children.length; q++) {
					if(desks.children[q].visible && desks.children[q].room){
						var ruleIndex = desks.children[q].room.ruleIndex
						if (ruleIndex === _ruleIndex) {
							this.setDeskBGImg(desks.children[q], skinType,skinCfg)
						}
					}
				}
					
			}
		}
	},
	//设置单个桌子图片
	setDeskBGImg: function(desk, skinType,skinCfg) {
		if(skinType == -1)
			skinType = skinCfg[FriendCard_Common.getGameCalssType(desk.room.gameType)+"BG"] || 0;
		if(!skinType)
			skinType = 0;

		var path = "friendCards/setSkin/";
		desk.getChildByName("table").loadTexture(path + "xg_imgDesk_" + skinType + ".png");
		for (var k = 1; k < 5; k++) {
			var yizi = desk.getChildByName("Image_table").getChildByName("yizi_" + k);
			if(!yizi){
				continue;
			}
			if (yizi){
				if(skinType >= 6){
					//圆椅子
					if(desk.room.maxPlayer == 3){
						if(k == 1 || k == 3){
							yizi.loadTexture(path +"bg_zhuozi_yizi_yuanzhuo_1.png");
						}else{
							yizi.loadTexture(path +"bg_zhuozi_yizi_yuanzhuo_2_1.png");
						}
					}else{
						if(k == 1 || k == 4){
							yizi.loadTexture(path +"bg_zhuozi_yizi_yuanzhuo_1.png");
						}else{
							yizi.loadTexture(path +"bg_zhuozi_yizi_yuanzhuo_2.png");
						}
					}
				}else{
					//方椅子
					if(desk.room.maxPlayer == 3){
						if(k == 1 || k == 3){
							yizi.loadTexture(path +"bg_zhuozi_yizi_fangzhuo_1.png");
						}else{
							yizi.loadTexture(path +"bg_zhuozi_yizi_fangzhuo_2.png");
						}
					}else{
						if(k == 1 || k == 4){
							yizi.loadTexture(path +"bg_zhuozi_yizi_fangzhuo_1.png");
						}else{
							yizi.loadTexture(path +"bg_zhuozi_yizi_fangzhuo_2.png");
						}
					}
				}
				
			}
		}

		

	},
	//获得本地保存的数据
	getNativeSkinCfg:function()
	{
		return FriendCard_Common.getNativeSkinCfg(this);
	},
	//修改本地保存的数据
	setNativeSkinCfg:function(info)
	{
		FriendCard_Common.setNativeSkinCfg(this,info)
	},
	adaptation: function() {	// 自适应显示
		var back = this.back;

		if (MjClient.size.width / MjClient.size.height > back.width / back.height) {
			var a = (MjClient.size.width / MjClient.size.height) / (back.width / back.height);
			this._image_top.width *= a;
			this._image_top.x += (back.width * a - back.width);

			this._clubInfo.x -= (back.width * a - back.width) / 2;
			this.img_nvguanjia.x += (back.width * a - back.width) / 2;
			this._ruleLayout.x += (back.width * a - back.width) / 2;
			back.width *= a;
		} else {
			var a = (back.width / back.height) / (MjClient.size.width / MjClient.size.height);
			this._node_desk.y += (back.height * a - back.height) / 2;

			back.height *= a;
			this._image_top.y = back.height;
		}
		if(!this.listView_table.initX){
			this.listView_table.initX = this.listView_table.x;
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
		if (MjClient.FriendCard_main_ui.matchNotice) {
            delete MjClient.FriendCard_main_ui.matchNotice;
        }
		this._matchData = data.matchUser;
		MjClient.friendCard_replay = data.info.againGame;
		that.data.room = that.data.room || {};
		util.localStorageEncrypt.setNumberItem(FriendCard_Common.LocalKey.lastIntoClub, that.clubId);
		
		that.ruleIndex = FriendCard_Common.getClubRulesSelect(that.clubId)[0];
		that.setShopSheetTip();
		that.setNativeSkinCfg(that.data.info);
		that.setNullShow(false);
		FriendCard_Common.reSetCurSelectRule();
		that.syncClubList();
		that.refreshClubList();
		that.refreshInfo();
		that.refreshDeskList();
		that.tipCheck();
		FriendCard_Common.doDaYangAction(this);
		FriendCard_Common.guideLayer(this);
		that.updateMatchRedPoint();

		that.updateRedPackageIcon();
	},
	updateRedPackageIcon:function(){
		if(!FriendCard_Common.isOpenForceMiankoujiashi()){
			return;
		}
		var that = this;
		var btnList = that._image_bottom.getChildByName("btnList");
		var redPackageBtn = btnList.getChildByName("redPackageBtn");
		if(!redPackageBtn){
			if(!that.bottomBtnsPos){
				cc.log("bottomBtnsPos not init")
				return;
			}
			redPackageBtn = new ccui.Button("friendCards/actRedPackage/main/btn_redpackage_n.png");
			redPackageBtn.setName("redPackageBtn");
			var pos = cc.p(that.bottomBtnsPos[0].x,that.bottomBtnsPos[0].y);
			pos.y += redPackageBtn.height+10;
			redPackageBtn.setPosition(pos);
			btnList.addChild(redPackageBtn);

			redPackageBtn.addTouchEventListener(function(sender,type){
				if(type == 2){
					that.addChild(new friendcard_redPackage_record());
				}
			})
		}
		redPackageBtn.visible = this.data.redPacketOpen ? true : false;
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
	setNullShow: function(isNullShow) {
		var visible = !isNullShow;
		this._image_top.setVisible(visible);
		this._image_bottom.setVisible(visible);
		this._node_desk.setVisible(visible);
	},
	initBottom: function() {
		var _btnList = this._image_bottom.getChildByName("btnList");
		var that = this;

		//搜索
		this.searchNode = this._image_bottom.getChildByName("searchBg");
		if (this.searchNode) {
	        var btn_search = this.searchNode.getChildByName("btn_search");
			var size = this.searchNode.getContentSize();
			size.width -= btn_search.width;
			size.height = 30;
			var inputEditBox = new cc.EditBox(size, new cc.Scale9Sprite());
	        inputEditBox.setFontColor(cc.color("#ffffff"));
	        inputEditBox.setMaxLength(10);
	        inputEditBox.setFontSize(20);
	        inputEditBox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
	        inputEditBox.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
	        inputEditBox.setFontName("fonts/lanting.TTF");
	        inputEditBox.setPlaceholderFontSize(20);
	        inputEditBox.setPlaceHolder("搜索房间内玩家");
	        inputEditBox.setPosition(this.searchNode.width / 2 + btn_search.width/2, this.searchNode.height / 2);
	        this.searchNode.addChild(inputEditBox);
	        this.searchNode.inputEditBox = inputEditBox;
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

		this._btn_more = _btnList.getChildByName("btn_more");//这个位置不要改
		that.bottomAllBtns = [
			"_btn_rule",//规则
			"_btn_member",//成员
			"_btn_tongji",//统计
			"_btn_webZhanji",//网页战绩
			"_btn_match",//比赛场
			"_btn_rankList",//排行榜
			"_btn_record",//战绩
			"_btn_record2",//战绩
			"_btn_setSkin",//换肤
			"_btn_personal_shop",//个人商城
			"_btn_yaoqing",//邀请
			"_agentBtn",//代理
		];
		FriendCard_Common.initBottom(that.bottomAllBtns);
		
		var moreLayer = this._btn_more.getChildByName("moreLayer");
		this._btn_more._moreLayer = moreLayer;
		this._btn_more._moreLayer.visible = false;
		cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            status: null,
            onTouchBegan: function(touch, event) {
                if (moreLayer.isVisible() && !moreLayer.isHiding) {
                	moreLayer.isHiding = true;
                    moreLayer.runAction(cc.sequence(cc.fadeOut(0.3), cc.hide(),cc.callFunc(function(){
                    	moreLayer.isHiding = false;
                    })));
                    return true;
                }

                return false;
            },
        }, this._btn_more._moreLayer);
		

		this._btn_more.addTouchEventListener(function (sender, type) {
			if (type == 2) {
				if(moreLayer.isHiding){
					return;
				}
				moreLayer.setVisible(true);
        		moreLayer.setOpacity(0);
        		moreLayer.runAction(cc.fadeIn(0.3));
			}
		},this);

		// 快速加入按钮
		var _btn_join = _btnList.getChildByName("btn_join");
		_btn_join.x = this.back.width;
		_btn_join.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				if (sender.textureType != "返回房间"){
					MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Kuaisujiaru", {uid:SelfUid()});
				}
				else{
					MjClient.native.umengEvent4CountWithProperty("Qinyouquan_fanhuifangjian", {uid:SelfUid()});
				}

				if (FriendCard_Common.getOSDClub(that) && sender.textureType != "返回房间"){
					that.showKaifangRuleSelectDialog(function(ruleIndex){that.quicklyJoinGame(ruleIndex)});
				}
				else{
					that.quicklyJoinGame();
				}
			}
		}, this);

		this._btn_signMatch = _btnList.getChildByName("btn_signMatch");
		this._btn_signMatch.x = this.back.width - 184;
		this._btn_signMatch.addTouchEventListener(function (sender, type) {
			if (type == 2) {
				this.addChild(new FriendCard_Match_joinLayer(this.data));
			}
		},this);
		this._btn_outMatch = _btnList.getChildByName("btn_outMatch");
		this._btn_outMatch.x = this.back.width;
		this._btn_outMatch.addTouchEventListener(function (sender, type) {
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

		//	俱乐部返回大厅功能：by_jcw
		FriendCard_Common.toTheHallEvent(this,_btn_join);
		
	},
	showKaifangRuleSelectDialog: function(retFunc) {
		if (!FriendCard_Common.getOSDClub(this)) {
			retFunc(this.ruleIndex);
			return;
		}

		var ruleList = [];
		for (var i = 1; i <= FriendCard_Common.getRuleNumber(); i++) {
			var otherRule = this.data.info["rule" + i];
			if (otherRule && otherRule != "delete") {
				otherRule._index = i;
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
	
	setShopSheetTip:function(){
		var that = this;
		if(this._friendShopSheetTipImg){
			if (!that.data || !that.data.info || that.data.info.type != 1) {
				this._friendShopSheetTipImg.stopAllActions();
				this._friendShopSheetTipImg.visible = false;
            	return;
        	}
        	var preVisible = this._friendShopSheetTipImg.visible;
			if(MjClient.systemConfig && MjClient.systemConfig.isNewDiamondOrder){
				this._friendShopSheetTipImg.visible = true;
			}else{
				this._friendShopSheetTipImg.visible = false;
			}
			if(!this._friendShopSheetTipImg.visible){
				this._friendShopSheetTipImg.stopAllActions();
			}else{
				if(!preVisible){
					this._friendShopSheetTipImg.stopAllActions();
					var action =  cc.sequence(cc.delayTime(10),cc.callFunc(function(){
						that._friendShopSheetTipImg.setOpacity(0);
					}),cc.delayTime(20),cc.callFunc(function(){
						that._friendShopSheetTipImg.setOpacity(255);
					})).repeatForever();
					this._friendShopSheetTipImg.runAction(action);
				}
			}
			cc.log("setShopSheetTip",this._friendShopSheetTipImg.visible,MjClient.systemConfig.isNewDiamondOrder)

		}
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
				if("onlineCount" in info){
					that.clubList[i].onlineCount = info.onlineCount;
				}

				if("totalCount" in info){
					that.clubList[i].playerCount = info.totalCount;
				}
				var allNum = cell.getChildByName("allNum");
				allNum.setString(that.clubList[i].onlineCount + "/" + that.clubList[i].playerCount);

				if(that.clubList[i].leagueId && that.clubList[i].playerCount > 99){
					allNum.setString("99+");
				}
				if(that.clubList[i].isHideCount == 1  && that.clubList[i].roleId == 0  && !that.clubList[i].leagueId){
					allNum.visible = false;
				}else{
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
		var allNum = _cell.getChildByName("allNum");
		allNum.ignoreContentAdaptWithSize(true);
		allNum.setString("");
		_cell.setVisible(true);
		var offsetY = clubListView.getInnerContainerPosition()//.y;
		clubListView.removeAllChildren();
		var list = that.clubList//FriendCard_Common.getLocalClubListSort(that.clubList)
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

					that.requestEnterClub(sender.clubId);
				}
			}, this);

			var head = cell.getChildByName("head")
			head.isMask = true;
			this.refreshHead(list[i].avatar, head);
			var title = cell.getChildByName("title");
			
			var titleStr = unescape(list[i].title);
			titleStr = titleStr.replace(/\n/g, "");
			titleStr = titleStr.replace(/\r/g, "");
			title.setString(titleStr);
			var isSelected = list[i].clubId == this.clubId;
			title.ignoreContentAdaptWithSize(true);

			var allNum = cell.getChildByName("allNum");
			allNum.setString(list[i].onlineCount+"/" + list[i].playerCount);
			allNum.ignoreContentAdaptWithSize(true);

			if(list[i].leagueId && list[i].playerCount > 99){
				allNum.setString("99+");
			}
			if(list[i].isHideCount == 1 && list[i].roleId == 0 && !list[i].leagueId){
				allNum.visible = false;
			}else{
				allNum.visible = true;
			}

			var clubID = cell.getChildByName("clubID");
			clubID.setString("ID:" + list[i].clubId);
			clubID.ignoreContentAdaptWithSize(true);
			if(list[i].clubId == this.clubId){
				title.setColor(cc.color("#b86400"));
				clubID.setColor(cc.color("#b86400"));
				allNum.setColor(cc.color("#b86400"));
			}else{
				title.setColor(cc.color("#666666"));
				clubID.setColor(cc.color("#b6b6b5"));
				allNum.setColor(cc.color("#b6b6b5"));
			}
			//头像框
			var head_kuang = cell.getChildByName("head_kuang");
			//head_kuang.loadTexture(list[i].clubId == this.clubId ? "friendCards/main/img_head_kuang_n.png" : "friendCards/main/img_head_kuang_s.png");
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

		clubListView.setScrollBarOpacity(0);
		//clubListView.setScrollBarPositionFromCornerForVertical(cc.p(295,0));
		clubListView.setScrollBarColor(cc.color("#486295"));

		_cell.setVisible(false);

		if (!this._firstContact) {
			this._firstContact = true;
			clubListView.jumpToPercentVertical(0)
		} else {
			clubListView.setInnerContainerPosition(offsetY);
		}
		if(list.length == 0){
			this.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function(){
        		that.showClubList();
        	})))
			this.addChild(new FriendCard_tip_club_guide());
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
		text_clubName.setString(getPlayerName(titleStr,8)+"("+this.data.info.clubId+")");

		//房卡
		if (this.fangkaBG) {
			//this.fangkaBG.visible = this.data.info.type == 1 ? true : false
			this.fangkaBG.visible = true;
			if(this.data.info.type == 1){
				this.text_fangka.setString(MjClient.data.pinfo.fangka + "");
				this.fangkaBG.getChildByName("btn_addFK").loadTextureNormal("friendCards/main/btn_zuanshi.png");
			}else{
				this.text_fangka.setString(MjClient.data.pinfo.money + "");
				this.fangkaBG.getChildByName("btn_addFK").loadTextureNormal("friendCards/main/btn_yuanbao.png");
			}
		}

		if (this.mpNode) {
			this.mpNode.visible = this.data.mpIsOpen;
			this.mpNode.refreshMp();
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
				this.matchNode.getChildByName("Text_rank").setString("" + revise(this._matchData.rank));
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
		
        
        FriendCard_Common.pageRunText(this.gonggao_bg,this.data.info.notice);
        this.gonggao_bg.visible = true;

		this.refreshPeopleCount();
        //this._btn_setting.setVisible(isManager);
		this._btn_tongji.setVisible((this.data.info.isShowStats != 0) || isManager || isGroupLeader || isAssistants);
		this._btn_yaoqing.setVisible(false);//isManager

		if(FriendCard_Common.getClubisLM()){
			this._btn_yaoqing.setVisible(false);
		}
		this._btn_setSkin.setVisible(FriendCard_Common.isLeader());
		this._btn_record.setVisible(isManager || FriendCard_Common.isGroupLeader(this.data.info));
		this._btn_record2.setVisible(!this._btn_record.visible);
		

		this._btn_rule.setVisible(true);

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

		this._btn_webZhanji.setVisible(MjClient.systemConfig.openUserInfoShare + "" == "true" && (!this._btn_FCM || !this._btn_FCM.isVisible() || !this._btn_match.visible));
		if(this._btn_personal_shop){
			//【风控】【亲友圈&联盟】去掉主界面的个人商城按钮
			this._btn_personal_shop.visible = false;
		}
		
        // 绑定邀请码：排除南通房卡模式
		var haveMemberId = MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.memberId && parseInt(MjClient.data.pinfo.memberId) > 0;
		if (this.data.info.memberId && !haveMemberId){
			this._agentBtn.visible = true;
			if (util.localStorageEncrypt.getBoolItem("clubBindingAgentAutoPop_" + this.clubId, true)) {
        		util.localStorageEncrypt.setBoolItem("clubBindingAgentAutoPop_" + this.clubId, false);
        		this.bindingAgent();
        	}
		}
		else{
			this._agentBtn.visible = false;
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

		FriendCard_Common.bottomBtnSort(this,this.bottomAllBtns);
		//更多按钮兼容start，注意这里没有改变节点this.xxxx，红点等的消息会不更新
		var maxShowItem = 6;
		for(var i = 0 ; i < this._btn_more._moreLayer.children.length; i++){
			this._btn_more._moreLayer.children[i].visible = false
		}

		var visibleBtns = [];//显示出来的按钮数组
		for(var i = 0 ; i < this.bottomAllBtns.length; i++){
			if(this[this.bottomAllBtns[i]] && this[this.bottomAllBtns[i]].isVisible()){
				visibleBtns.push(this.bottomAllBtns[i]);
			}
		}
		var visibleLength = visibleBtns.length;
		if (visibleLength > maxShowItem) {//超过最大显示数，将超过的按钮放在更多里面
			for(var i = maxShowItem-1; i < visibleLength; i++){
				var moreLayoutItem = this._btn_more._moreLayer.getChildByName(this[visibleBtns[i]].getName());
				if(!moreLayoutItem){
					moreLayoutItem = this[visibleBtns[i]].clone();
					moreLayoutItem.setAnchorPoint(0.5,0);
					this._btn_more._moreLayer.addChild(moreLayoutItem);
				}
				moreLayoutItem.visible = true;
				this[visibleBtns[i]].visible = false;
			}
		}
		
		if(visibleLength > maxShowItem){
			this._btn_more.visible = true;
			var moreLayeVisibleLength = 0;
			for(var i = 0 ; i < this._btn_more._moreLayer.children.length; i++){
				if(this._btn_more._moreLayer.children[i].visible){
					this._btn_more._moreLayer.children[i].x = 75 + moreLayeVisibleLength * 150;
					this._btn_more._moreLayer.children[i].y = this._btn_more._moreLayer.children[i].height * 0.61;
				}
				moreLayeVisibleLength++;
			}
			if(moreLayeVisibleLength > 0){
				this._btn_more._moreLayer.width = 150 * moreLayeVisibleLength;
			}
		}else{
			this._btn_more.visible = false;
		}//更多兼容end

		this.updateMemberRedPoint();
		this.refreshRuleList();
		
	},
	refreshPeopleCount:function() {
		var text_clubId = this._clubInfo.getChildByName("text_clubId");
		var text_allNum = this._clubInfo.getChildByName("text_allNum");
		text_allNum.ignoreContentAdaptWithSize(true);
		text_allNum.setString(this.data.info.onlineCount+"/" + this.data.info.totalCount);

		if(FriendCard_Common.isLMClub() && this.data.info.totalCount > 99){
			text_allNum.setString("99+");
		}
		if(this.data.info.isHideCount == 1 && FriendCard_Common.isOrdinaryMember() && !FriendCard_Common.isLMClub()){
			text_allNum.setVisible(false);
		}else{
			text_allNum.setVisible(true);
		}


	},
	refreshClubMatch:function(data){
		// 参赛
		switch (data.status) {
            case 0:
                break;
            case 1:
				this.matchNode.visible = true;
				this._matchData = data;
				// this._btn_signMatch.loadTextureNormal("friendCards_Match/btn_outMatch.png");
                break;
            case 2:
				//  str = "你的参赛审核已被拒绝";
				//this._matchData = {}; //如果这句不注释掉，重新报名被拒参赛信息会不见
                break;
            case 3:
                // str = "你的退赛还未审核";
                break;
            case 4:
				// str = "你的退赛审核已被同意";
				this.matchId = 0;
				this._matchData = {};
				// this._btn_signMatch.loadTextureNormal("friendCards_Match/btn_signMatch.png");
				this.matchNode.visible = false;
                break;
            case 5:
				// str = "你的退赛审核已被拒绝";
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
	showClubList: function(time) {
		var that = this;
		var px = 0;
		if(this._node_clubList.isShow == true ){
			return;
		}

        this._node_clubList.isShow = true;

		that._node_clubList.stopAllActions();
		that.listView_table.stopAllActions();


        //俱乐部桌子
        var listView_tableGoX = this.listView_table.x + that._node_clubList.width / 2 + 10;
        this.listView_table.runAction(cc.sequence(cc.callFunc(function(){
             //that._node_clubList.visible = true;
        }),cc.moveTo(0.3, cc.p(listView_tableGoX , this.listView_table.y))))
        
        //俱乐部列表
        this._node_clubList.runAction(cc.sequence(cc.callFunc(function(){
             that._node_clubList.visible = true;
        }),cc.moveTo(0.3, cc.p(px, this._node_clubList.y)),cc.delayTime(0.2),cc.callFunc(function(){
            that._node_clubList.enabled = true

             if(!time)
             	that._node_clubList.stopAllActions();
        })));

       

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
        	}),
        	cc.moveTo(0.3, cc.p(that.listView_table.initX , 95.00))))

        
		
	},
	updateDeskNum: function(ruleRoomData) {
		if(!this.isManager() || (FriendCard_Common.isLMClub() && this.data.info.isHideChairmanTableCnt && !FriendCard_Common.isSupperManger())){
			this.text_deskWaitNum.visible = false;
			this.text_deskFullNum.visible = false;
			this.btn_deskInfo.visible = false;
			return;
		}
		this.btn_deskInfo.visible = true;
		var Image_bg = this.btn_deskInfo.getChildByName("Image_bg");
		var Image_line = Image_bg.getChildByName("Image_line");

		var bshowInfo = this.text_deskDeskInfo.visible;
		this.text_deskFullNum.visible = !bshowInfo;
		this.text_deskWaitNum.visible = !bshowInfo;
		Image_line.visible = !bshowInfo;
		Image_bg.width = bshowInfo ?  60 : 190;

		this.text_deskFullNum.setString("满:" + ruleRoomData.fullDeskNum);
		this.text_deskWaitNum.setString("等:" + ruleRoomData.nofullDeskNum);

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

		
		if(FriendCard_Common.getOSDClub(that)){
			this._btn_all_rule.visible = true;
		}else{
			this._btn_all_rule.visible = false;
		}
		this._btn_outline_rule.visible = FriendCard_Common.isManager();
        function setRuleBtnsUI(btn,isBright){
        	var textRuleName = btn.getChildByName("text");
        	var textRuleNumber = btn.getChildByName("text_xuhao");
        	if(!isBright){
        		textRuleName.enableShadow(cc.color("#0055a5"),textRuleName.getVirtualRenderer().getShadowOffset(),textRuleName.getVirtualRenderer().getShadowBlurRadius());
        		if(textRuleNumber){
        			textRuleNumber.enableShadow(cc.color("#0055a5"),textRuleNumber.getVirtualRenderer().getShadowOffset(),textRuleNumber.getVirtualRenderer().getShadowBlurRadius());
        		}
        	}else{
        		textRuleName.enableShadow(cc.color("#8c3100"),textRuleName.getVirtualRenderer().getShadowOffset(),textRuleName.getVirtualRenderer().getShadowBlurRadius());
        		if(textRuleNumber){
        			textRuleNumber.enableShadow(cc.color("#8c3100"),textRuleNumber.getVirtualRenderer().getShadowOffset(),textRuleNumber.getVirtualRenderer().getShadowBlurRadius());
        		}
        	}
        	btn.setBright(!isBright);
        }
		var indexs = [];
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
        setRuleBtnsUI(this._btn_all_rule,clubRulesSelect.indexOf(-1) > -1 ? true : false);

        setRuleBtnsUI(this._btn_outline_rule,FriendCard_Common.isOnlyShowOutLineDesk() ? true : false);

		for (var i = 0; i <=indexs.length-1; i++) {
			var btn_rule = this._listView_rule.getChildByName("btn_rule_"+i);
			if(!btn_rule){
				btn_rule = this._btn_rule_cell.clone();
				btn_rule.setName("btn_rule_"+i);
				this._listView_rule.addChild(btn_rule);
			}
			btn_rule.visible = true;
			btn_rule.setTag(indexs[i]);
			var text = btn_rule.getChildByName("text");
			text.ignoreContentAdaptWithSize(true);
			text.getVirtualRenderer().setLineSpacing(0);
			var rule = this.data.info["rule" + indexs[i]];
			var splitRuleName = FriendCard_Common.splitClubRuleName(unescape(rule.ruleName));
			if (rule.ruleName) {
				var ruleName = splitRuleName[1];
				if(!splitRuleName[0]){
					ruleName = GameCnName[rule.gameType]+"";
				}
				var textName = "";
				var middleIndex = parseInt(ruleName.length/2)-1;
				for (var j = 0; j < ruleName.length; j++) {
					if (j == middleIndex){
						textName = textName + ruleName.charAt(j) + "\n";
					}else{
						textName = textName + ruleName.charAt(j);
					}
				}
				text.setString(textName);
			}
			btn_rule.setEnabled(true);
			setRuleBtnsUI(btn_rule,clubRulesSelect.indexOf(btn_rule.getTag()) > -1 ? true : false);
			//序号
			var text_xuhao = btn_rule.getChildByName("text_xuhao");
			if(splitRuleName[0]){
				text_xuhao.setString(splitRuleName[0]+"");
			}else{
				text_xuhao.setString("");
			}
			btn_rule.addTouchEventListener(function(sender, type) {
				if (type == 2) {
					this.closeClubList();
					var index = sender.getTag();
					that.ruleIndex = index;

					FriendCard_Common.reSetClubRulesSelect(that.clubId,index,sender.isBright(),FriendCard_Common.getOSDClub(that));
					that.refreshRuleList();
					that.refreshDeskList();

				}
			}, this);
			ruleBtns.push(btn_rule);
		}

		this._btn_addRule.visible = false;
		if (FriendCard_Common.getClubisLM()) {
			if (indexs.length < this.ruleBtnNum && this.isCreator()) {
				this._btn_addRule.visible = true;
			}
		} else {
			if (indexs.length < this.ruleBtnNum && this.isManager()) {
				this._btn_addRule.visible = true;
			}
		}
		if(this._btn_addRule.visible){
			this._btn_zhankai.loadTextures("friendCards/main/bg_zhankai_2.png","friendCards/main/bg_zhankai_2.png");
		}else{
			this._btn_zhankai.loadTextures("friendCards/main/bg_zhankai_1.png","friendCards/main/bg_zhankai_1.png");
		}

		
		this._ruleLayout.stopAllActions();

		this._ruleListMode = this._ruleListMode || 1;//1展开，2收起
		if(this._ruleListMode == 1){
			this._btn_shouqi.visible = true;
			this._btn_zhankai.visible = false;
		}else{
			this._btn_shouqi.visible = false;
			this._btn_zhankai.visible = true;
		}
		var ruleLayoutVisItems = [];
		var itemSpace = 5;

		for(var i = 0 ; i < this._ruleLayoutItems.length; i++){
			if(this._ruleLayoutItems[i] && this._ruleLayoutItems[i].visible){
				ruleLayoutVisItems.push(this._ruleLayoutItems[i]);
			}
		}
		this._ruleLayout.width = this._ruleLayout.standWidth;
		this._btn_all_rule.x = this._btn_all_rule.standX;
		this._btn_outline_rule.x = this._btn_outline_rule.standX;
		this._btn_addRule.x = this._btn_addRule.standX;
		this._btn_shouqi.x = this._btn_shouqi.standX;
		this._btn_zhankai.x = this._btn_zhankai.standX;
		this._listView_rule.x = this._listView_rule.standX;
		this._listView_rule.width = this._listView_rule.standWidth;

		if(this._btn_outline_rule.visible){
			this._listView_rule.width -= (this._btn_outline_rule.width+itemSpace);
			this._listView_rule.x += (this._btn_outline_rule.width+itemSpace);
		}

		if(!this._btn_addRule.visible){
			this._btn_zhankai.x = this._btn_addRule.standX;
			this._listView_rule.width += this._btn_addRule.width;
		}
		if(this._btn_all_rule.visible){
			this._listView_rule.width -= (this._btn_all_rule.width+itemSpace);
			this._listView_rule.x += (this._btn_all_rule.width+itemSpace);
		}else{
			this._btn_outline_rule.x -= (this._btn_all_rule.width+itemSpace);
		}

		if(this._ruleListMode == 2){
			//隐藏后的坐标
			var endWidth = this._btn_zhankai.width + (this._btn_addRule.visible ? this._btn_addRule.width : 0) + 10;
			var startWidth = this._ruleLayout.width;
			var dw = startWidth - endWidth;
			this._ruleLayout.width = startWidth - dw * 1;
			for(var i = 0 ; i < this._ruleLayoutItems.length; i++){
				this._ruleLayoutItems[i].x = this._ruleLayoutItems[i].x - dw * 1;
			}
		}
		for(var i = 0 ; i < this._ruleLayoutItems.length; i++){
			this._ruleLayoutItems[i].showX = this._ruleLayoutItems[i].x;
		}

		var itemCount = indexs.length;
		var innerWidth = itemCount * this._btn_rule_cell.width + (itemCount - 1) * itemSpace;
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
		var startX = 0;
		var allSortBtn = [].concat(ruleBtns)
		for(var i = 0; i < allSortBtn.length; i++){
			var dx = i * (this._btn_rule_cell.width + itemSpace)
			allSortBtn[i].setPositionX(startX +dx);
		}
		
	},
	initRuleCommonBtn:function() {
		if(this._hasInitRuleCommonBtn){
			return;
		}
		this._hasInitRuleCommonBtn = true;
		var that = this;

		this._listView_rule = this._ruleLayout.getChildByName("ListView_rule");
        this._listView_rule.setScrollBarEnabled(false);
        COMMON_UI.setNodeTextAdapterSize(this._ruleLayout);
        this._listView_rule.standWidth = this._listView_rule.width;
        this._listView_rule.standX =  this._listView_rule.x;

		this._btn_rule_cell = this._ruleLayout.getChildByName("btn_rule_cell");
		this._btn_rule_cell.visible = false;

		this._btn_all_rule = this._ruleLayout.getChildByName("btn_all_rule");
		this._btn_all_rule.visible = false;
		this._btn_all_rule.standX = this._btn_all_rule.x;

		this._btn_all_rule.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				//非同屏才会显示全部玩法按钮
				FriendCard_Common.reSetClubRulesSelect(that.clubId,-1);
				that.refreshRuleList();
				that.refreshDeskList();
			}
		});

		this._btn_outline_rule = this._ruleLayout.getChildByName("btn_outline_rule");
		this._btn_outline_rule.visible = false;
		this._btn_outline_rule.standX = this._btn_outline_rule.x;
		this._btn_outline_rule.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				FriendCard_Common.setOnlyShowOutLineDesk(FriendCard_Common.isOnlyShowOutLineDesk() ? 0 : 1);
				that.refreshRuleList();
				that.refreshDeskList();
			}
		});

		this._btn_addRule = this._ruleLayout.getChildByName("btn_addRule");
		this._btn_addRule.visible = false;
		this._btn_addRule.standX = this._btn_addRule.x;

		this._btn_addRule.addTouchEventListener(function(sender, type) {
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

		var actionTime = 0.3;
		this._btn_shouqi = this._ruleLayout.getChildByName("btn_shouqi");
		this._btn_shouqi.visible = false;
		this._btn_shouqi.standX = this._btn_shouqi.x;

		this._btn_shouqi.addTouchEventListener(function(sender,type) {
			if(type == 2){
				that._btn_shouqi.visible = false;

				var actionShouqi = cc.delayTime(actionTime);
				var endWidth = that._btn_zhankai.width + (that._btn_addRule.visible ? that._btn_addRule.width : 0) + 10;
				var startWidth = that._ruleLayout.width;
				var dw = startWidth - endWidth;
				actionShouqi.update = function(percent) {
					that._ruleLayout.width = startWidth - dw * percent;
					for(var i = 0 ; i < that._ruleLayoutItems.length; i++){
						that._ruleLayoutItems[i].x = that._ruleLayoutItems[i].showX - dw * percent;
					}
				}
				that._ruleLayout.runAction(cc.sequence(actionShouqi,cc.callFunc(function() {
					that._listView_rule.visible = false;
					that._btn_zhankai.visible = true;
					for(var i = 0 ; i < that._ruleLayoutItems.length; i++){
						that._ruleLayoutItems[i].showX = that._ruleLayoutItems[i].x;
					}
					that._ruleListMode == 2;
				})))
			}
		})
		this._btn_zhankai = this._ruleLayout.getChildByName("btn_zhankai");
		this._btn_zhankai.visible = false;
		this._btn_zhankai.standX = this._btn_zhankai.x;
		this._btn_zhankai.addTouchEventListener(function(sender,type) {
			if(type == 2){
				that._btn_zhankai.visible = false;
				that._listView_rule.visible = true;
				that._btn_shouqi.visible = true;

				var actionZhankai = cc.delayTime(actionTime);
				var endWidth = that._ruleLayout.standWidth;
				var startWidth = that._ruleLayout.width;
				var dw = startWidth - endWidth;
				actionZhankai.update = function(percent) {
					that._ruleLayout.width = startWidth - dw * percent;
					for(var i = 0 ; i < that._ruleLayoutItems.length; i++){
						that._ruleLayoutItems[i].x = that._ruleLayoutItems[i].showX - dw * percent;
					}
				}
				that._ruleLayout.runAction(cc.sequence(actionZhankai,cc.callFunc(function() {
					for(var i = 0 ; i < that._ruleLayoutItems.length; i++){
						that._ruleLayoutItems[i].showX = that._ruleLayoutItems[i].x;
					}
					that._ruleListMode == 1;
				})))
			}
		});
		this._ruleLayout.standWidth = this._ruleLayout.width;
		this._ruleLayoutItems = [this._btn_shouqi,this._btn_all_rule,this._btn_outline_rule,this._listView_rule,this._btn_zhankai,this._btn_addRule];
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
		if(!FriendCard_Common.isShowTable(this)){
			return;
		}
		this._node_desk.getChildByName("text_isShowZhuozi").visible = false;
		if (!this.data.room["roomList" + this.ruleIndex]){
			this.data.room["roomList" + this.ruleIndex] = [];
		}
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
					this._img_dayang_tip.getChildByName("Text").setString("本亲友圈今天已打烊~\n打烊时间"+startHour+":"+startMinute+"——"+endHour+":"+endMinute)
				}
			}
		}
		this._img_hide_club_tip.visible = this.data.info.clubHideStatus == 1;
		if(!this._img_stop.visible){
			this._img_stop.visible = this.data.info.clubHideStatus == 1;
		}

		this._img_check.setVisible(false);

		this.initDeskData();
		//俱乐部桌子排序
		if(params.isUpdate && this._deskRoomData){
			var hasSort = FriendCard_Common.reHandleDeskSort(this,params);
			if(!hasSort){
				cc.log("当前可见桌子数据没有变化不用处理刷新")
				return;
			}
		}else{
        	this._deskRoomData = FriendCard_Common.deskSort(this);
		}
		//更新桌子数量
		this.updateDeskNum(this._deskRoomData);
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
	},
	getDeskStartIndexByScrollX:function(){
		var index = 0;
		if(this.listView_table._lastRound){
			index = this.listView_table._lastRound * this._deskItemSize * this._deskRankNum;
		}
		return index;
	},
	
    refreshDeskItem:function(){
    	//刷新桌子对应的item
    	var shouldRefresh = this.refreshDeskItemPosition();
    	if(shouldRefresh){
    		var ruleRoom = this._deskRoomData.ruleRoom;
	    	var skinCfg = this.data.info.skinCfg;
	        if(FriendCard_Common.isLeader()){
	        	skinCfg = this.getNativeSkinCfg();
	        }
	    	var startIndex = this.getDeskStartIndexByScrollX();
	        var endIndex = startIndex + this._deskLayoutSize * this._deskItemSize * this._deskRankNum;

			for (var i = startIndex; i < endIndex; i++) {
				var room = ruleRoom[i];
				this.buildDeskItem(i,room,skinCfg);
			}
    	}
    },
    refreshDeskItemPosition:function(){
    	//刷新桌子面板位置
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
	        	//this.listView_table._lastRound = round;
	        	// if(preLastRound === this.listView_table._lastRound){
		        // 	return false;
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
		//获取桌子item，一个item有_deskRankNum个桌子
        var deskLayoutName = "deskLayout_"+parseInt((i%(this._deskRankNum * this._deskItemSize * this._deskLayoutSize))/ (this._deskRankNum * this._deskItemSize)+1);
        var p2 = (parseInt((i%(this._deskRankNum * this._deskItemSize))/(this._deskRankNum))+1);
        var name2 = "item_"+ p2;
        var item = this.listView_table.getChildByName(deskLayoutName).getChildByName(name2);
        if(!item){
        	var cloneItem = this.getDeskItem(0);
        	item = cloneItem.clone();
        	item.x = (p2-1) * item.width;
        	item.name = name2;
        	
        	this.listView_table.getChildByName(deskLayoutName).addChild(item);
        }
        return item;
    },
	buildDeskItem:function(i,room,skinCfg){
		//构建桌子cell,因为复用注意操作的还原
		var item = this.getDeskItem(i);
		item.visible = true;
		for(var j = 0; j < 3; j++){
			var otherCell = item.getChildByName("cell"+(j+3)+"_"+(i%2+1));
			if(otherCell){
				otherCell.visible = false;
			}
		}
		if(!room){
        	return;
        }
        var cell = null;
        var cloneCellName = "";
        if (room.maxPlayer == 3) {
			cloneCellName = "cell3";
			cell = item.getChildByName("cell3"+"_"+(i%2+1));
		}else{
			cloneCellName = "cell4";
			cell = item.getChildByName("cell4"+"_"+(i%2+1));
		}
        if(!cell){
        	var cloneCell = this.getDeskItem(0).getChildByName(cloneCellName+"_1");
        	cell = cloneCell.clone();
        	cell.name = cloneCellName+"_"+(i%2+1);
        	cell.setPosition(cc.p(item.width/2,((i%2+1) == 1)? cloneCell.y : (item.height - cloneCell.y)))
        	item.addChild(cell);
        }

        cell.setVisible(true);
        cell.room = room;
        cell.isMask = true;
        cell.addTouchEventListener(this.joinGame,this);

        if(FriendCard_Common.isLeader()){
        	this.setDeskBGImg(cell,skinCfg["rule" + cell.room.ruleIndex],skinCfg);
        }else{
        	var tableBoardCfg = this.data.info["rule"+cell.room.ruleIndex].tableBoardCfg;
        	if(tableBoardCfg != 0 && !tableBoardCfg){
        		tableBoardCfg = -1;
        	}
        	this.setDeskBGImg(cell, tableBoardCfg,skinCfg);
        }

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
        
        var text_xuhao = cell.getChildByName("Image_round").getChildByName("Text_xuhao");
		text_xuhao.setString(this._ruleSort[room.ruleIndex]+"");
		text_xuhao.ignoreContentAdaptWithSize(true);
        for (var j = 0; j < 4 || j < room.maxPlayer; j++) {

            var head = cell.getChildByName("head_" + (j + 1));
            var yizi = cell.getChildByName("Image_table").getChildByName("yizi_" + (j + 1));
            if(!head){
            	continue;
            }
            head.setVisible(true);
            yizi.setVisible(true);
            // 当2人玩/3人玩时，不显示多余的头像、椅子
            if (j >= room.maxPlayer) {
                head.setVisible(false);
                yizi.setVisible(false);
                continue;
            }

            //没有玩家的时候不显示头像， 晋中显示坐下头像
            if (!room.players || j > room.players.length - 1){
                head.setVisible(false);
                continue;
            }

            head.isMask = isMask;
            head.headkuang = "friendCards/common/head_kuang.png";
            head.headMask = "friendCards/common/headMask.png";
            this.deleteCellRemoteHeadUI(head);
            this.refreshHead(room.players[j].headimgurl, head);

            var name = head.getChildByName("Text_name");
            name.setString(getPlayerName(unescape(room.players[j].nickname),5));
            name.ignoreContentAdaptWithSize(true);
            var text_nameBg = head.getChildByName("Text_nameBg");
            text_nameBg.visible = true;
            var off_line = head.getChildByName("img_off_line");
            off_line.visible = (room.players[j].offline == true);
            off_line.zIndex = 11;
        }
	},
	getCurSelGameType: function(_ruleIndex){
    	var ruleIndex;
    	if(_ruleIndex){
    		ruleIndex = _ruleIndex;
    	}
        else{
        	ruleIndex = this.ruleIndex	
        }
    	return 	this.data.info["rule" + ruleIndex].gameType;
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

		var Panel_rankChangeAni = this.matchNode.getChildByName("Panel_rankChangeAni");
		var txt_rankChangeNum = Panel_rankChangeAni.getChildByName("txt_rankChangeNum");
		var txt_rankChangeUnit = Panel_rankChangeAni.getChildByName("txt_rankChangeUnit");
		var img_changeType = Panel_rankChangeAni.getChildByName("img_changeType")
		Panel_rankChangeAni.setVisible(true);
		txt_rankChangeNum.ignoreContentAdaptWithSize(true);

		var sign = 1;
		if (rankChangeNum < 0) {
			img_changeType.loadTexture("res/friendCards_Match/img_arrow_red.png");
			txt_rankChangeUnit.setTextColor(cc.color("#ff873f"));
			txt_rankChangeNum.setTextColor(cc.color("#ff873f"));
			sign =-1;
		}else{
			txt_rankChangeUnit.setTextColor(cc.color("#6CFC70"));
			txt_rankChangeNum.setTextColor(cc.color("#6CFC70"));
			img_changeType.loadTexture("res/friendCards_Match/img_arrow_green.png");
			sign =1;
		}

	    txt_rankChangeNum.setString(Math.abs(rankChangeNum));

	    img_changeType.runAction(cc.sequence(
	    	cc.sequence(
	    		cc.moveBy(0.3, 0, 8*sign).easing(cc.easeSineIn()),
	    		cc.moveBy(0.3, 0, -8*sign)
	    		).repeat(3),
	    	cc.callFunc(function(){ 
	    	 	Panel_rankChangeAni.runAction(cc.sequence(cc.fadeOut(0.5), cc.callFunc(function(){
	    	 		Panel_rankChangeAni.visible = false
	    	 	})))
	    	})
	    ));
	    
	},
	
});


