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
		this.newRuleData = {};

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
            setWgtLayout(this.btn_showClubList, [0.1047, 0.3806], [0, 0.5], [0, 0]);

        }else {
            setWgtLayout(this.btn_showClubList, [0.1047, 0.3806], [-0.0456, 0.5], [0, 0]);

        }

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

         //setWgtLayout(this._node_clubList, [0.3016, 1], [-0.3063, 0], [0, 0]);

		this._node_clubList.scale = MjClient.size.height / this._node_clubList.height;
		this._node_clubList.y = 0;
		this._node_clubList.x = -that._node_clubList.width * this._node_clubList.scale;
		this._node_clubList.visible = false;
		this._node_clubList.enabled = false;

        //跑马灯
		this.gonggao_bg = UI.node.getChildByName("gonggao_bg")

        setWgtLayout(this.gonggao_bg, [0.5781, 0.458], [0.5, 0.775], [0, 0]);
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

		if (FriendCard_Common.isOpenLM()){
			FriendCard_LM_handleInviteMsg(that);
		}

		if(MjClient._isNeedShowFriendCardActLuckyDraw){
			MjClient._isNeedShowFriendCardActLuckyDraw = false;
			MjClient.FriendCard_main_ui.runAction(cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
				MjClient.FriendCard_main_ui.addChild(new FriendCard_actLuckyDraw());
			})))
		}

		this.wanfabg = UI.node.getChildByName("wanfabg");
		this.wanfabg.visible = false;
		setWgtLayout(this.wanfabg, [1, 1], [0.5, 0.5], [0, 0]);
		this.wanfabg.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                sender.visible = false;
            }
        }, this);
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

		this._ruleviewlist = this._image_top.getChildByName("newrule");
		this._ruleviewlistreal = this._image_top.getChildByName("ListView_rule_new");
		this._ruleviewlistreal.width = 408;
        this.defaultItem = this._ruleviewlist.getChildByName('btn_rule1');
        this._ruleviewlistreal.setItemModel(this.defaultItem);
        this._ruleviewlistreal.setScrollBarEnabled(false);

		//右上角玩法
		this._listView_rule = this._image_top.getChildByName("ListView_rule");
		this._listView_rule._standWidth = this._listView_rule.width;
        this._listView_rule.setScrollBarEnabled(false);
        this._listView_rule.visible = false;
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


		// 群主请检查房卡是否足够开房
		this._img_check = back.getChildByName("img_check");
		this._img_check.setVisible(false);

		// 点击加入房间
		this._imgPoint = this._node_desk.getChildByName("Img_tip");// 空桌子箭头
		this._imgPoint.setVisible(false);
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

		this.addNGJDonghua();

		//俱乐部信息
		this._clubInfo = this._image_top.getChildByName("clubInfo");
		this._clubInfoBg = this._clubInfo.getChildByName("Image_bg")
		this.text_deskNum = this._clubInfo.getChildByName("text_deskNum");
		this.text_deskNum.ignoreContentAdaptWithSize(true);
		this._clubInfoBg.initHeight = this._clubInfoBg.height;
		this.text_deskNum.visible = false;
		if(isIPhoneX())
		{
			this._clubInfo.setPosition(cc.p(5,84))
			this._img_stop.x = this.back.width*0.6;
			this._img_hide_club_tip.x = this.back.width*0.6;
			this._img_dayang_tip.x = this.back.width*0.6;
		}

		//收起按钮
		this.btn_shouqi = this._image_top.getChildByName("btn_shouqi");
		this.btn_shouqi.isClose = false;
		this.btn_shouqi.addTouchEventListener(function(sender, type) {
			if (type == 2) {
				if (!this.btn_shouqi.isClose)
					MjClient.native.umengEvent4CountWithProperty("Qinyouquan_shouqi", {uid:SelfUid()});
				else
					MjClient.native.umengEvent4CountWithProperty("Qinyouquan_zhankai", {uid:SelfUid()});

				this.closeBtns(!this.btn_shouqi.isClose);
			}
		}, this);
		//乐豆
		this.ledouBG = this._image_top.getChildByName("ledouBG");
		COMMON_UI.setNodeTextAdapterSize(this.ledouBG);
		this.text_ledou = this.ledouBG.getChildByName("text_ledou")
		//房卡
		this.fangkaBG = this._image_top.getChildByName("fangkaBG");
		if (this.fangkaBG) {
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
			btn_addFK.visible = false;
			// btn_addFK.addTouchEventListener(function(sender, type) {
			// 	if (type == 2) {
			// 		gotoStoreFunc();
			// 	}
			// });
			// this.fangkaBG.setTouchEnabled(true)
			// this.fangkaBG.addTouchEventListener(function(sender, type) {
			// 	if (type == 2) {
			// 		gotoStoreFunc();
			// 	}
			// });

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
		this._friendShopSheetTipImg = this._image_top.getChildByName("Image_tip_shop_sheet");
		this.setShopSheetTip();
		this.mpNode = this._image_top.getChildByName("mpBg");
		if (this.mpNode) {
			this.mpNode.refreshMp = function() {
				that.mpNode.removeAllChildren();
				var mpTextNode = new ccui.RichText();
				var contextStr = "<font size='20' face='fonts/lanting.ttf' color='#ffffff'>防沉迷：<font color='#fcff00'>" + that.data.mp + "</font></font>";
				mpTextNode.initWithXML(contextStr, null);
				mpTextNode.setContentSize(160, 30);
				mpTextNode.setPosition(120, that.mpNode.height * 0.5);
				that.mpNode.addChild(mpTextNode);
			}
		}

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
	        inputEditBox.setPlaceHolder("搜索房间内玩家");
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


		//飞鸟
        var _flyNode = back.getChildByName("Panel_flyBire");
        this._flyNode = _flyNode;

        var path = "friendCards/main/ani/xiaoniao0";
        var butterflys0 = COMMON_UI.creatFrameAni(path,"xiaoniao_",93,45);
        butterflys0.setScale(0.6)
        butterflys0.setPosition(cc.p(-_flyNode.getContentSize().width*0.1,_flyNode.getContentSize().height*0.8));
        var a0 = cc.moveTo(30,cc.p(_flyNode.getContentSize().width*1.2,_flyNode.getContentSize().height*0.8));
        butterflys0.runAction(cc.sequence(cc.DelayTime(0.1),a0,cc.callFunc(function(){
            butterflys0.setPosition(cc.p(-_flyNode.getContentSize().width*0.1,_flyNode.getContentSize().height*0.8));
        }),cc.DelayTime(0.7)).repeatForever());
        _flyNode.addChild(butterflys0);

        var path = "friendCards/main/ani/xiaoniao1";
        var butterflys = COMMON_UI.creatFrameAni(path,"xiaoxiaoniao_",93,80);
        butterflys.setScale(0.6)
        butterflys.setPosition(cc.p(-_flyNode.getContentSize().width*0.1,_flyNode.getContentSize().height*0.85));
        var a0 = cc.moveTo(30,cc.p(_flyNode.getContentSize().width*1.2,_flyNode.getContentSize().height*0.85));
        butterflys.runAction(cc.sequence(cc.DelayTime(0.5),a0,cc.callFunc(function(){
            butterflys.setPosition(cc.p(-_flyNode.getContentSize().width*0.1,_flyNode.getContentSize().height*0.85));
        }),cc.DelayTime(0.3)).repeatForever());
        _flyNode.addChild(butterflys);


        var path = "friendCards/main/ani/xiaoniao1";
        var butterflys1 = COMMON_UI.creatFrameAni(path,"xiaoxiaoniao_",93);
        butterflys1.setScale(0.6)
        butterflys1.setPosition(cc.p(-_flyNode.getContentSize().width*0.1,_flyNode.getContentSize().height*0.9));
        var a0 = cc.moveTo(30,cc.p(_flyNode.getContentSize().width*1.2,_flyNode.getContentSize().height*0.9));
        butterflys1.runAction(cc.sequence(cc.DelayTime(0.7),a0,cc.callFunc(function(){
            butterflys1.setPosition(cc.p(-_flyNode.getContentSize().width*0.1,_flyNode.getContentSize().height*0.9));
        }),cc.DelayTime(0.1)).repeatForever());
        _flyNode.addChild(butterflys1);

        var path = "friendCards/main/ani/xiaoniao1";
        var butterflys7 = COMMON_UI.creatFrameAni(path,"xiaoxiaoniao_",93);
        butterflys7.setScale(0.4);
        butterflys7.visible = false;
        butterflys7.setPosition(cc.p(_flyNode.getContentSize().width*0.3,_flyNode.getContentSize().height*0.6));
        var a0 = cc.moveTo(18,cc.p(_flyNode.getContentSize().width*0.7 + Math.random()*100,_flyNode.getContentSize().height*0.6));
        butterflys7.runAction(cc.sequence(cc.DelayTime(Math.random()*10),
        	cc.callFunc(function(){
        		butterflys7.visible = true
        	}),
	        cc.fadeIn(0.2),a0,cc.fadeOut(0.2),
	        cc.callFunc(function(){
	            butterflys7.setPosition(cc.p(_flyNode.getContentSize().width*0.3 + Math.random()*100 ,_flyNode.getContentSize().height*0.6));
	        })).repeatForever());
        _flyNode.addChild(butterflys7);

		var path = "friendCards/main/ani/xiaoniao1";
        var butterflys8 = COMMON_UI.creatFrameAni(path,"xiaoxiaoniao_",93);
        butterflys8.setScale(0.5);
        butterflys8.visible = false;
        butterflys8.setPosition(cc.p(_flyNode.getContentSize().width*0.3,_flyNode.getContentSize().height*0.9));
        var a0 = cc.moveTo(20,cc.p(_flyNode.getContentSize().width*0.7 +  Math.random()*100,_flyNode.getContentSize().height*0.9));
        butterflys8.runAction(cc.sequence(cc.DelayTime(Math.random()*10 + 3),
        	cc.callFunc(function(){
        		butterflys8.visible = true
        	}),
	        cc.fadeIn(0.2),a0,cc.fadeOut(0.2),
	        cc.callFunc(function(){
	            butterflys8.setPosition(cc.p(_flyNode.getContentSize().width*0.3 + Math.random()*100 ,_flyNode.getContentSize().height*0.9));
	        })).repeatForever());
        _flyNode.addChild(butterflys8);


        this.listView_table.addCCSEventListener(function(sender,type){
			//**新老引擎bug**
			var EVENT_AUTOSCROLL_ENDED = ccui.ScrollView.EVENT_AUTOSCROLL_ENDED;
			if (cc.sys.OS_WINDOWS == cc.sys.os || cc.ENGINE_VERSION.indexOf("3.16") >= 0)
				EVENT_AUTOSCROLL_ENDED = 12;

            switch (type) {
            	case EVENT_AUTOSCROLL_ENDED:
            		break;
				case 9:
   			 		that.updateBG();
					break;

            }


        });
	},
	addNGJDonghua:function(){
		var that = this;
		var nowHours = new Date().getHours();
		//大背景
		var img_bg1 = this.back.getChildByName("img_bg1");

		//移动背景
		var img_bg2 = this.back.getChildByName("img_bg2");

		this._img_bg1 = img_bg1;
		if(nowHours >= 20 || nowHours < 4){
			this.currentWeather = "晚上";
		}
		else{
			this.currentWeather = "白天";
		}


		if(MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ)
		{
			var roleAni = createSpine("spine/home/renwu/miaozunv.json", "spine/home/renwu/miaozunv.atlas");
	        roleAni.setAnimation(0, 'animation', true);
	        roleAni.setPosition(cc.p(this.img_nvguanjia.width*0.4,-30));
	        roleAni.setScale(0.22);
	        this.img_nvguanjia.addChild(roleAni,-1);
		}
		else
		{
			//女管家动画白天
			// var _nvGuanjiaAniBT = createSpine("friendCards/nvguanjia/qinnv/1.json", "friendCards/nvguanjia/qinnv/1.atlas");
            // _nvGuanjiaAniBT.setAnimation(0, 'animation', true);
            // _nvGuanjiaAniBT.setTimeScale(0.5);
            // _nvGuanjiaAniBT.setScale(0.7);
            // this.img_nvguanjia.addChild(_nvGuanjiaAniBT,-1);
            // _nvGuanjiaAniBT.setPosition(cc.p(this.img_nvguanjia.width/2,8));
            // _nvGuanjiaAniBT.visible = (this.currentWeather == "白天");
            // this._nvGuanjiaAniBT = _nvGuanjiaAniBT;
            // this._nvGuanjiaAniBT.visible = false;
            //
            // //女管家动画晚上
			// var _nvGuanjiaAniWS = createSpine("friendCards/nvguanjia/xiezi/2.json", "friendCards/nvguanjia/xiezi/2.atlas");
            // _nvGuanjiaAniWS.setAnimation(0, 'animation', true);
            // _nvGuanjiaAniWS.setTimeScale(0.5);
            // _nvGuanjiaAniWS.setScale(0.7);
            // this.img_nvguanjia.addChild(_nvGuanjiaAniWS,-1);
            // _nvGuanjiaAniWS.setPosition(cc.p(this.img_nvguanjia.width/2,0));
            // _nvGuanjiaAniWS.visible = (this.currentWeather == "晚上");
            // this._nvGuanjiaAniWS = _nvGuanjiaAniWS;
            // this._nvGuanjiaAniWS.visible = false;

            // var guanjia = new ccui.ImageView();
            // guanjia.loadTexture("res/friendCards/main/guanjia.png");
            // guanjia.setPosition(cc.p(this.img_nvguanjia.width/2,this.img_nvguanjia.height/2));
            // guanjia.setScale(0.7);
            // this.img_nvguanjia.addChild(guanjia,-1);
            // this._nvGuanjiaAniBT = guanjia;

		}

	},
	updateBG:function(){
		if(MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ)
			 return;

		var px = this.listView_table.getScrolledPercentHorizontal();
		if (px > 100){
			px = 100
		}

		if (px < 0){
			px = 0
		}

		if (!px){
			px = 0
		}

		if(!this._img_bg1.initX)
		{
			this._img_bg1.initX = -211;
			this._img_bg1.x = -211;
			this._img_bg1.px = px;
			//this._img_bg1.x += 1
		}

		if ((this._img_bg1.px > px) && (this._img_bg1.px - 0.01 > px)) {
			this._img_bg1.px = px;
			if (this._img_bg1.x > -200) {
				return;
			}
			this._img_bg1.x += 0.5 //* px / 100 // + px/100
		} else if ((this._img_bg1.px < px) && (this._img_bg1.px + 0.01 < px)) {
			this._img_bg1.px = px;
			if ((this._img_bg1.x + this._img_bg1.width - 650) < MjClient.size.width) {
				return;
			}
			this._img_bg1.x -= 0.5 //* px / 100 //+ px/100
		}
	},
	setMainBG:function()
	{
		this.setMainBGImg(FriendCard_Common.isLeader() ? util.localStorageEncrypt.getNumberItem("Friendcard_SkinCfg_mainBG_" + this.clubId, 0) : this.data.info.skinCfg.mainBG);
		this.setMainDibanImg(FriendCard_Common.isLeader() ? util.localStorageEncrypt.getNumberItem("Friendcard_SkinCfg_DBBG_" + this.clubId, 0) : this.data.info.skinCfg.DBBG)
	},
	//设置主界面背景
	setMainBGImg: function(skinType) {
		if (!this.back)
			return;
		var img_bg1 = this.back.getChildByName("img_bg1");
		var img_bg2 = this.back.getChildByName("img_bg2");

		var path = "friendCards/setSkin/";
		img_bg1.loadTexture(path + "bg1_" + skinType + ".png");
		img_bg2.loadTexture(path + "bg2_" + skinType + ".png");

		if(MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ)
			return;

		// if(skinType === 1)
		// {
		// 	this._nvGuanjiaAniBT.visible = false;
		// 	this._nvGuanjiaAniWS.visible = true;
		// }
		// else
		// {
		// 	this._nvGuanjiaAniBT.visible = true;
		// 	this._nvGuanjiaAniWS.visible = false;
		// }

		this.mainBGImgType = skinType;
		this._flyNode.visible = skinType!=2;
	},
	//设置主界面背景底板
	setMainDibanImg: function(skinType) {
		if (!this.back)
			return;

		if (this.mainBGImgType != 0)
			return;

		var img_bg2 = this.back.getChildByName("img_bg2");

		var path = "friendCards/setSkin/";
		if (skinType != 0)
			skinType = "0" + skinType;
		img_bg2.loadTexture(path + "bg2_" + skinType + ".png")
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
		desk.getChildByName("table").loadTexture(path + "zhuozi_" + skinType + ".png");
		for (var k = 1; k < 5; k++) {
			var yizi = desk.getChildByName("yizi_" + k)
			if (yizi)
				yizi.loadTexture(path + "yizi_" + k + ".png");
		}

		//调整局数文本位置
		var text_roundNum = desk.getChildByName("table").getChildByName("text_roundNum")
		// if(skinType < 3 || (skinType > 5 && skinType < 9)){
		// 	text_roundNum.setPosition(cc.p(106,141))
		// }
		// else{
		// 	text_roundNum.setPosition(cc.p(106,147))
		// }
		if(skinType == 0 || skinType == 3){//浅蓝色
			text_roundNum.enableOutline(cc.color("#0f75a6"), 1);
		}else if(skinType == 1 || skinType == 4){//深绿色
			text_roundNum.enableOutline(cc.color("#1d8368"), 1);
		}else if(skinType == 2 || skinType == 5){//红色
			text_roundNum.enableOutline(cc.color("#a31d38"), 1);
		}else if(skinType == 6 || skinType == 9){//紫色
			text_roundNum.enableOutline(cc.color("#862dac"), 1);
		}else if(skinType == 7 || skinType == 10){//浅绿色
			text_roundNum.enableOutline(cc.color("#20924f"), 1);
		}else if(skinType == 8 || skinType == 11){//深蓝色
			text_roundNum.enableOutline(cc.color("#24539a"), 1);
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
			//this._node_desk.x += (back.width * a - back.width) / 2;

			this._flyNode.width *= a;


			this._image_top.getChildByName("clubInfo").x -= (back.width * a - back.width) / 2;
			back.width *= a;
			back.getChildByName("img_bg2").width  *= a;
			back.getChildByName("img_bg2").x = back.width/2; //img_baitian
			if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
				back.getChildByName("img_bg1").width *= a;
				back.getChildByName("img_bg1").x = back.width / 2
			}
		} else {
			var a = (back.width / back.height) / (MjClient.size.width / MjClient.size.height);
			this._node_desk.y += (back.height * a - back.height) / 2;

			//this._node_gonggao.y += (back.height * a - back.height) / 2;
			back.height *= a;
			this._image_top.y = back.height;

			back.getChildByName("img_bg2").height  *= a;
			back.getChildByName("img_bg2").y = back.height/2

			if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
				back.getChildByName("img_bg1").height *= a;
				back.getChildByName("img_bg1").y = back.height / 2
			} else {
				back.getChildByName("img_bg1").y = back.height;
				back.getChildByName("img_bg1").height *= a;
			}
		}



		this.btn_shouqi.x = this._clubInfo.x + this._clubInfo.width + this.btn_shouqi.width / 2 + 10
		if (this.fangkaBG) {
			this.fangkaBG.x = this.btn_shouqi.x + this.btn_shouqi.width / 2 + this.fangkaBG.width / 2 + 5;
			this._ruleviewlistreal.x = this.btn_shouqi.x + this.btn_shouqi.width / 2 + this.fangkaBG.width / 2 + this.img_nvguanjia.width / 2 +this._btn_all_rule.width / 2 +this._ruleviewlistreal.width / 2;
			this._btn_all_rule.x = this.btn_shouqi.x + this.btn_shouqi.width / 2 + this.fangkaBG.width / 2 + this.img_nvguanjia.width / 2 +this._btn_all_rule.width / 2 + 40
			this.img_nvguanjia.x = this.btn_shouqi.x + this.btn_shouqi.width / 2 + this.fangkaBG.width / 2 + this.img_nvguanjia.width / 2 + 100;

			if (!this.fangkaBG.initP)
				this.fangkaBG.initP = this.fangkaBG.getPosition();
		}
		// if (this.img_nvguanjia) {
		// 	this.img_nvguanjia.x = this.btn_shouqi.x + this.btn_shouqi.width / 2 + this.img_nvguanjia.width / 2 + 5;
		// 	if (!this.img_nvguanjia.initP)
		// 		this.img_nvguanjia.initP = this.img_nvguanjia.getPosition();
		// }
		if (this._friendShopSheetTipImg) {
			this._friendShopSheetTipImg.x = this.btn_shouqi.x + this.btn_shouqi.width / 2 + this._friendShopSheetTipImg.width / 2 + 5;
			if (!this._friendShopSheetTipImg.initP)
				this._friendShopSheetTipImg.initP = this._friendShopSheetTipImg.getPosition();
		}
		if (this.mpNode) {
			this.mpNode.x = this.btn_shouqi.x + this.btn_shouqi.width / 2 + this.mpNode.width / 2 + 5;
			if (!this.mpNode.initP)
				this.mpNode.initP = this.mpNode.getPosition();
		}
		if (this.searchNode) {
			this.searchNode.x = this.btn_shouqi.x + this.btn_shouqi.width / 2 + this.searchNode.width / 2 + 5;
		}

		if(this.matchNode){
			this.matchNode.x = this._clubInfo.x;
			this.matchNode.y = this._clubInfo.y - this._clubInfo.height - 60;
			if(isIPhoneX()){
	            setWgtLayout(this.btn_showClubList, [0.1047, 0.3806], [0, 0.45], [0, 0]);
	            this.matchNode.x += 65;
	        }else {
	            setWgtLayout(this.btn_showClubList, [0.1047, 0.3806], [-0.0456, 0.45], [0, 0]);

	        }
		}

		if(this.ledouBG){
			this.ledouBG.x = this._clubInfo.x;
		}

		if(!this.btn_shouqi.initP)
			this.btn_shouqi.initP = this.btn_shouqi.getPosition();

		if(!this.listView_table.initX)
		{
			this.listView_table.initX = this.listView_table.x;
		}

		for (var i = this.ruleBtnNum; i > 0; i--) {
			var btn_rule = this._image_top.getChildByName("btn_rule" + i);
			if(!btn_rule) break;
            btn_rule.x = this._image_top.width - ((6-i) * btn_rule.width*1.15)-(back.width * a - back.width)/2 - 30
		}

		if(isIPhoneX()){
			this._listView_rule.x = this._image_top.width -(back.width * a - back.width)/2 + 30
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
		that.setMainBG();
		FriendCard_Common.doDaYangAction(this);
		FriendCard_Common.guideLayer(this);

		that.updateMatchRedPoint();

		that.updateRedPackageIcon();

		if(that.isLeader()){
			that.img_nvguanjia.setVisible(true);
		}
		else{
			that.img_nvguanjia.setVisible(false);
		}
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
			"_btn_rule",//规则
			"_btn_member",//成员
			"_btn_record",//战绩
			"_btn_record2",//战绩
			"_btn_tongji",//统计
			"_btn_yaoqing",//邀请
			"_btn_setSkin",//换肤
			"_btn_webZhanji",//网页战绩
			"_btn_personal_shop",//个人商城
			"_agentBtn",//代理
			"_btn_FCM",//防沉迷
			"_btn_match",//比赛场
			"_btn_rankList",//排行榜
			//"_btn_safebox",//保险箱
			"_btn_ledou"//乐豆
		];
    	if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
			that.bottomAllBtns.push("_btn_shangChengShouQuan");
		}
		FriendCard_Common.initBottom(that.bottomAllBtns);

		// 快速加入按钮
		var _btn_join = _btnList.getChildByName("btn_join");
		_btn_join.visible = false;
		// _btn_join.x = this.back.width;
		// _btn_join.addTouchEventListener(function(sender, type) {
			// if (type == 2) {
				// if (sender.textureType != "返回房间"){
					// MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Kuaisujiaru", {uid:SelfUid()});
				// }
				// else{
					// MjClient.native.umengEvent4CountWithProperty("Qinyouquan_fanhuifangjian", {uid:SelfUid()});
				// }

				// if (FriendCard_Common.getOSDClub(that) && sender.textureType != "返回房间"){
					// that.showKaifangRuleSelectDialog(function(ruleIndex){that.quicklyJoinGame(ruleIndex)});
				// }
				// else{
					// that.quicklyJoinGame();
				// }
			// }
        // }, this);

        //20201026--重开上一局玩法
        this.Btn_lasttable = _btnList.getChildByName("Btn_lasttable");
        this.Btn_lasttable.x = this.back.width;
        // this.Btn_lasttable.addTouchEventListener(function(sender, type) {
			// if (type == 2) {
				// if (sender.textureType != "返回房间"){
					// MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Kuaisujiaru", {uid:SelfUid()});
				// }
				// else{
					// MjClient.native.umengEvent4CountWithProperty("Qinyouquan_fanhuifangjian", {uid:SelfUid()});
				// }

				// //cc.log("-------重开上一局玩法-----------", util.localStorageEncrypt.getNumberItem("LAST_RULE_INDEX" + this.data.info.clubId), "LAST_RULE_INDEX" + this.data.info.clubId);
				// that.quicklyJoinGame1(util.localStorageEncrypt.getNumberItem("LAST_RULE_INDEX" + this.data.info.clubId))
			// }
        // }, this);
		this.Btn_lasttable.addTouchEventListener(function(sender, type) {
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
    showKaifangRuleSelectDialog1: function(retFunc) {
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
        //cc.log("rulelist:----------------------------",JSON.stringify(ruleList));
		if(ruleList.length >= 1){
			this.quicklyJoinGame1(ruleList[0]._index);
		}else{
			this.quicklyJoinGame1(this.ruleIndex);
        }

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
    quicklyJoinGame1: function(ruleIndex) {
		FriendCard_Common.quicklyJoinGame1(this,ruleIndex);
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
	isLeader: function() {
		if(!this.data || !this.data.info){
			return false;
		}
		return FriendCard_Common.isLeader(this.data.info);
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
				var onlineCount = cell.getChildByName("onlineCount");
				var allNum = cell.getChildByName("allNum");

				onlineCount.setString(that.clubList[i].onlineCount + "");
				allNum.setString("/" + that.clubList[i].playerCount);

				if(that.clubList[i].leagueId && that.clubList[i].playerCount > 99){
					onlineCount.setString("99+");
					allNum.setString("");
				}
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
			//var _color = isSelected ? "#FFFFFF" : "#A9E0FF";
			//title.setTextColor(cc.color(_color));
			title.ignoreContentAdaptWithSize(true);

			var onlineCount = cell.getChildByName("onlineCount");
			onlineCount.setString(list[i].onlineCount + "");
			onlineCount.ignoreContentAdaptWithSize(true)
			//onlineCount.setTextColor(cc.color(isSelected ? "#FFFFFF" : "#58E6CD"))

			var allNum = cell.getChildByName("allNum");
			allNum.setString("/" + list[i].playerCount);
			allNum.ignoreContentAdaptWithSize(true);

			if(list[i].leagueId && list[i].playerCount > 99){
				onlineCount.setString("99+");
				allNum.setString("");
			}
			if(list[i].isHideCount == 1 && list[i].roleId == 0 && !list[i].leagueId){
				onlineCount.visible = false;
				allNum.visible = false;
			}else{
				onlineCount.visible = true;
				allNum.visible = true;
			}

			var clubID = cell.getChildByName("clubID");
			clubID.setString("ID:" + list[i].clubId);
			clubID.ignoreContentAdaptWithSize(true);
			//allNum.setTextColor(cc.color(isSelected ? "#FFFFFF" : "#A9E0FF"))

			//成员图片
			var image_7 = cell.getChildByName("Image_7");
			onlineCount.x = image_7.x + image_7.width + onlineCount.width
			allNum.x = onlineCount.x
			//image_7.loadTexture(list[i].clubId == this.clubId ? "friendCards/main/img_xuanzhongMem.png" : "friendCards/main/img_feixuanzhongMem.png");

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


		var goX = FriendCard_Common.isOpenLM() ? 194.44 : 173.44;
		if(list.length == 0){
			this.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function(){
        		that.showClubList();
        	})))
			this._node_clubListbg.touchEnabled = false;
			// this.btn_createQYQ.setPosition(cc.p(goX,596))
			// this.btn_joinQYQ.setPosition(cc.p(goX,513))
			this._node_clubList.getChildByName("Image_bg").visible = true;
			this.addChild(new FriendCard_tip_club_guide());
		}
		else{
			// this.btn_createQYQ.setPosition(cc.p(goX,138.00))
			// this.btn_joinQYQ.setPosition(cc.p(goX,55.34))
			this._node_clubListbg.touchEnabled = true;
			this._node_clubList.getChildByName("Image_bg").visible = false;

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

		//房卡
        var moneyback = this._clubInfo.getChildByName("moneyback");
        if(moneyback){
            moneyback.visible = false;
		}

		//房卡
		if (this.fangkaBG) {
			//this.fangkaBG.visible = this.data.info.type == 1 ? true : false
			//管理员可见
			if (this.isManager()) {
				this.fangkaBG.visible = true;
			}else{
				this.fangkaBG.visible = false;
			}
			// this.fangkaBG.visible = true;
			this.text_fangka_type.setString("我的房卡");
			// if(this.data.info.type == 1){
			// 	this.text_fangka.setString(MjClient.data.pinfo.fangka + "");
			// 	this.fangkaBG.loadTexture("friendCards/main/fangka_kuang.png");
			// }else{
				// this.text_fangka_type.setString("我的房卡");
				this.text_fangka.setString(MjClient.data.pinfo.money + "");
				this.fangkaBG.loadTexture("friendCards/main/yuanbao_kuang.png");
			// }
		}

		if(this.ledouBG){
			var ledouNum = this.data.happyBean == null ? 0 : this.data.happyBean
			this.text_ledou.setString(ledouNum)
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
				this.matchNode.getChildByName("AtlasLabel_rank").setString("" + revise(this._matchData.rank));
				this.matchNode.addTouchEventListener(function (sender, type) {
					if (type == 2) {
						this.addChild(new FriendCard_Match_rankLayer(that.data.info, this.clubId, this._matchData.matchId, that.data.subClubId));
					}
				}, this)

			}


		}
		if(this._btn_signMatch){
			// if(this._matchData && this._matchData.status == 1){ // 已经参赛的 显示退赛按钮
			// 	this._btn_signMatch.loadTextureNormal("friendCards_Match/btn_outMatch.png");
			// }else if(this._matchData && this._matchData.status == 2){
			// 	this._btn_signMatch.loadTextureNormal("friendCards_Match/btn_outMatch.png");
			// }else{
			// 	this._btn_signMatch.loadTextureNormal("friendCards_Match/btn_signMatch.png");
			// }
			this._btn_signMatch.setVisible(this.data.info.matchIsOpen & 2);
			this._btn_outMatch.setVisible(this.data.info.matchIsOpen & 2);
			// if(this._matchData && this._matchData.status == 2)
			// 	this._btn_signMatch.visible = false;
		}

		if(this.matchNode){
			this.matchNode.setVisible((this.data.info.matchIsOpen & 2) && this._matchData && this._matchData.matchId && this.data.info.matchConf[this._matchData.matchId])
			if(this._matchData && this._matchData.status == 1){
				this.matchNode.visible = true;
			}else if(this._matchData && this._matchData.status == 0){
				this.matchNode.visible = false;
			}

		}

		/*var money = this._clubInfo.getChildByName("moneyback").getChildByName("money");
		money.ignoreContentAdaptWithSize(true);
		money.setString(MjClient.data.pinfo.money + "");
		UIEventBind(null, this, "updateInfo", function() {
			money.setString(MjClient.data.pinfo.money + "");
		});

		var btn_addYB = this._clubInfo.getChildByName("moneyback").getChildByName("btn_add");
        btn_addYB.addTouchEventListener(function(sender,type){
            if(type === 2){
            	this.closeClubList();
                MjClient.native.umengEvent4CountWithProperty("Yuanbaozengjia", {uid:SelfUid()});
                MjClient.Scene.addChild(enter_store());
            }
        },this);*/


        FriendCard_Common.pageRunText(this.gonggao_bg,this.data.info.notice);
        this.gonggao_bg.visible = true;

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

		this.refreshPeopleCount();
        //this._btn_setting.setVisible(isManager);
		this._btn_tongji.setVisible((this.data.info.isShowStats != 0) || isManager || isGroupLeader || isAssistants);
		this._btn_yaoqing.setVisible(false);//isManager

		if(FriendCard_Common.getClubisLM()){
			this._btn_yaoqing.setVisible(false);
		}
		this._btn_setSkin.setVisible(FriendCard_Common.isLeader());
		// this._btn_record.setVisible(isManager || FriendCard_Common.isGroupLeader(this.data.info));
		// this._btn_record2.setVisible(!this._btn_record.visible);
		this._btn_record.setVisible(false);
		this._btn_record2.setVisible(false);
		if (this._btn_FCM)
			this._btn_FCM.setVisible(this.data.mpIsOpen && !FriendCard_Common.isOrdinaryMember(that.data.info));



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

		if(this.data.info.isOpenAntiAddiction & 1)
		{
			//this._btn_safebox.setVisible(false)
			this._btn_ledou.setVisible(true)
			this.ledouBG.setVisible(true)
			var ledouNum = this.data.happyBean == null ? 0 : this.data.happyBean
			this.text_ledou.setString(ledouNum)
		}
		else{
			//this._btn_safebox.setVisible(false)
			this._btn_ledou.setVisible(false)
			this.ledouBG.setVisible(false)
		}

        // 绑定邀请码：排除南通房卡模式
		if (!MjClient.APP_TYPE.QXNTQP || MjClient.getAppType() != MjClient.APP_TYPE.QXNTQP) {
			var haveMemberId = MjClient.data && MjClient.data.pinfo && MjClient.data.pinfo.memberId && parseInt(MjClient.data.pinfo.memberId) > 0;
			if (this.data.info.memberId && !haveMemberId)
			{
				// this._agentBtn.visible = true;
				this._agentBtn.visible = false;
				if (util.localStorageEncrypt.getBoolItem("clubBindingAgentAutoPop_" + this.clubId, true)) {
					util.localStorageEncrypt.setBoolItem("clubBindingAgentAutoPop_" + this.clubId, false);
					// this.bindingAgent();
	        	}
				FriendCard_Common.bindToAgent(this);
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

		//搜索按钮
		if (this.searchNode) {
			//联盟中的盟主、会长、超级管理员、管理员可见
			if (FriendCard_Common.isLMClub() && (FriendCard_Common.isManager() || FriendCard_Common.isLeader() || FriendCard_Common.isLMChair())) {
				this.searchNode.visible = true;
			}else{
				this.searchNode.visible = false;
			}
		}

		FriendCard_Common.bottomBtnSort(this,that.bottomAllBtns)
		this.updateMemberRedPoint();
		this.refreshRuleList();

	},
	refreshHappyBean:function(num) {
		if(num != null){
			this.data.happyBean = num
			this.text_ledou.setString(num)
		}
	},
	refreshPeopleCount:function() {
		var text_clubId = this._clubInfo.getChildByName("text_clubId");
		var text_allNum = this._clubInfo.getChildByName("text_allNum");
		text_allNum.ignoreContentAdaptWithSize(true);
		text_allNum.setString("/" + this.data.info.totalCount + "人");

		var text_onlineCount = this._clubInfo.getChildByName("text_onlineCount");
		text_onlineCount.ignoreContentAdaptWithSize(true);
		text_onlineCount.setString(this.data.info.onlineCount)

		text_onlineCount.x = text_clubId.x;
		text_allNum.x = text_onlineCount.x+text_onlineCount.width;
		if(FriendCard_Common.isLMClub() && this.data.info.totalCount > 99){
			text_onlineCount.setString("99+");
			text_allNum.setString("999+");
		}
		if(this.data.info.isHideCount == 1 && FriendCard_Common.isOrdinaryMember() && !FriendCard_Common.isLMClub()){
			text_onlineCount.setVisible(false);
			text_allNum.setVisible(false);
		}else{
			text_onlineCount.setVisible(true);
			text_allNum.setVisible(true);
		}

		if (FriendCard_Common.isLeader() || FriendCard_Common.isManager()){
			text_onlineCount.setVisible(true);
			text_allNum.setVisible(true);
		}
		else{
			text_onlineCount.setVisible(false);
			text_allNum.setVisible(false);
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
		if (FriendCard_Common.isOpenLM()) {
			px = -25 * (MjClient.size.width / 1280); //-(that._node_clubList.getChildByName("clubListView").x - 30)
		}
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
            that._node_clubList.enabled = true

             if(!time)
             	that._node_clubList.stopAllActions();
        })));

        this.btn_shouqi.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function(){
             //;
        }),cc.moveTo(0.3, cc.p(that.btn_shouqi.x - that.btn_shouqi.width , that.btn_shouqi.initP.y))));

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
				that.btn_shouqi.visible = true;

            })
        ));

        this.listView_table.runAction(cc.sequence(
        	cc.delayTime(time ? time : 0),
        	cc.callFunc(function(){
        	}),
        	cc.moveTo(0.3, cc.p(that.listView_table.initX , 67))))

        this.btn_shouqi.runAction(cc.sequence(cc.callFunc(function(){
             //;
        }),cc.moveTo(0.3, cc.p(that.btn_shouqi.initP.x , that.btn_shouqi.initP.y))));

	},
	updateDeskNum: function(ruleRoomData) {
		if(!this.isManager() || (FriendCard_Common.isLMClub() && this.data.info.isHideChairmanTableCnt && !FriendCard_Common.isSupperManger())){
			this._clubInfoBg.height = this._clubInfoBg.initHeight - 25;
			this.text_deskNum.visible = false;
			return;
		}
		this._clubInfoBg.height =  this._clubInfoBg.initHeight;
		this.text_deskNum.setString("满人：" + ruleRoomData.fullDeskNum + "桌    " + "等待：" + ruleRoomData.nofullDeskNum + "桌");
		this.text_deskNum.visible = false;
	},
	closeBtns:function(isClose){
		if(isClose == this.btn_shouqi.isClose)
			return;

		this.btn_shouqi.isClose = !this.btn_shouqi.isClose;

		var that = this;
		if(!that._image_bottom.initY)
			that._image_bottom.initY = that._image_bottom.y

		if(!that._clubInfo.initX)
			that._clubInfo.initX = that._clubInfo.x

		if(!that.ledouBG.initX)
			that.ledouBG.initX = that.ledouBG.x

		if(!that.btn_showClubList.initX && that.btn_showClubList.initX != 0)
			that.btn_showClubList.initX = that.btn_showClubList.x

		this.btn_shouqi.x = this._clubInfo.x + this._clubInfo.width + this.btn_shouqi.width / 2 + 10;

		if(this._listView_rule){
			if(!this._listView_rule.initY){
				this._listView_rule.initY = this._listView_rule.y
			}
			if(isClose){
				this._btn_all_rule.visible = false;
				this._btn_outline_rule.visible = false;

				this._listView_rule.runAction(cc.moveTo(0.3, cc.p(this._listView_rule.x , this._listView_rule.y+this._listView_rule.height+10)))
			}
			else{
				this._btn_all_rule.visible = true;
				this._btn_outline_rule.visible = true;
				this._listView_rule.runAction(cc.moveTo(0.3, cc.p(this._listView_rule.x , this._listView_rule.initY)))
			}
		}


		if (isClose) {
			that.btn_showClubList.runAction(cc.moveTo(0.3, cc.p(that.btn_showClubList.x - that.btn_showClubList.width, that.btn_showClubList.y)))
			that._image_bottom.runAction(cc.moveTo(0.3, cc.p(that._image_bottom.x, that._image_bottom.y - that._image_bottom.height - 10)));
			that._clubInfo.runAction(cc.moveTo(0.3, cc.p(that._clubInfo.x - that._clubInfo.width - 40, that._clubInfo.y)));
			that.listView_table.runAction(cc.moveTo(0.3, cc.p(that.btn_showClubList.x - that.btn_showClubList.initX  , that.listView_table.y)))
			if (that.fangkaBG)
				that.fangkaBG.runAction(cc.moveTo(0.3, cc.p(that.fangkaBG.x, that.fangkaBG.initP.y + that.fangkaBG.height + 10)));
			if (that.ledouBG)
				that.ledouBG.runAction(cc.moveTo(0.3, cc.p(that.ledouBG.x - that.ledouBG.width - 70, that.ledouBG.y)));
			if (that.mpNode)
				that.mpNode.runAction(cc.moveTo(0.3, cc.p(that.mpNode.x, that.mpNode.initP.y + that.mpNode.height + 100)));
			that.btn_shouqi.runAction(cc.sequence(
				cc.moveTo(0.3, cc.p(0+that.btn_shouqi.width , that.btn_shouqi.y)),
				cc.callFunc(function() {
					that.btn_shouqi.loadTextureNormal("friendCards/main/img_deng2.png")
				})
			))

		} else {
			that.btn_showClubList.runAction(cc.moveTo(0.3, cc.p(that.btn_showClubList.initX, that.btn_showClubList.y)))
			that._image_bottom.runAction(cc.moveTo(0.3, cc.p(that._image_bottom.x, that._image_bottom.y+ that._image_bottom.height + 10)));
			that._clubInfo.runAction(cc.moveTo(0.3, cc.p(that._clubInfo.initX, that._clubInfo.y)));
			that.listView_table.runAction(cc.moveTo(0.3, cc.p(that.listView_table.initX, that.listView_table.y)))
			if (that.fangkaBG)
				that.fangkaBG.runAction(cc.moveTo(0.3, cc.p(that.fangkaBG.x, that.fangkaBG.initP.y)));
			if (that.ledouBG)
				that.ledouBG.runAction(cc.moveTo(0.3, cc.p(that.ledouBG.initX, that.ledouBG.y)));
			if (that.mpNode)
				that.mpNode.runAction(cc.moveTo(0.3, that.mpNode.initP));
			that.btn_shouqi.runAction(cc.sequence(
				cc.moveTo(0.3, cc.p(that.btn_shouqi.initP.x, that.btn_shouqi.y)),
				cc.callFunc(function() {
					that.btn_shouqi.loadTextureNormal("friendCards/main/img_deng1.png")
				})
			))
		}

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
		// btn_all_rule.visible = false;
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
		// var btn_addRule = this._ruleviewlist.getChildByName("btn_addRules");
		var btn_addRule = this._image_top.getChildByName("btn_addRule");
		btn_addRule.x = btn_addRule.width/ 2 + this.btn_shouqi.x + this.btn_shouqi.width / 2 + this.fangkaBG.width / 2 + this.img_nvguanjia.width / 2 +this._btn_all_rule.width / 2 +this._ruleviewlistreal.width / 2 + 380;
		COMMON_UI.setNodeTextAdapterSize(btn_addRule);
		btn_addRule.visible = (this.isManager() || this.isCreator());

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
        	// if(!isBright){
        		btn.getChildByName("text").setTextColor(cc.color("#FFFFFF"));
        	// 	btn.setPositionY(that._listView_rule.y - (that._listView_rule.height - btn_addRule.y));
        	// }else{
        		btn.getChildByName("text").setTextColor(cc.color("#ffef8a"));
        	// 	btn.setPositionY(that._listView_rule.y - (that._listView_rule.height - btn_rule_cell.y));
        	// }
        	btn.setBright(!isBright);
        }
        function setRuleBtnsUI(btn,isBright){
        	if(!isBright){
        		// btn.getChildByName("text_rule_no").setTextColor(cc.color("#FFFFFF"));
        		btn.getChildByName("text").setTextColor(cc.color("#FFFFFF"));
        		// btn.setPositionY(btn_addRule.y);
        	}else{
        		// btn.getChildByName("text_rule_no").setTextColor(cc.color("#ffef8a"));
        		btn.getChildByName("text").setTextColor(cc.color("#ffef8a"));
        		// btn.setPositionY(btn_rule_cell.y);
        	}
        	btn.setBright(!isBright);
        }
		var indexs = [];
		this.ruleBtnNum = FriendCard_Common.getRuleNumber();
		this.newRuleData = FriendCard_Common.getNewRuleList(this);

		this._ruleSort = {};
		this._ruleviewlistreal.removeAllItems();
		for (var i = 1; i <= this.ruleBtnNum; i ++) {
			// var btn_rule = this._ruleviewlist.getChildByName("btn_rule"+i);
			// if(btn_rule){
			// 	btn_rule.visible = false;
			// }
			var rule = this.newRuleData.gamelist[i-1];
			if (rule){
				this._ruleviewlistreal.pushBackDefaultItem();
                var btn_rule = this._ruleviewlistreal.getItem(i - 1);
                if(btn_rule){
                    btn_rule.visible = false;
                }
                indexs.push(i);
                this._ruleSort[i] = indexs.length;
			}
		}
        var ruleBtns = [];
		var clubRulesSelect = FriendCard_Common.getClubRulesSelect(that.clubId);
		for (var i = 0; i <=indexs.length-1; i++) {
			// var btn_rule = this._ruleviewlist.getChildByName("btn_rule"+(i+1));
			var btn_rule = this._ruleviewlistreal.getItem(i);
			// if(!btn_rule){
			// 	btn_rule = btn_rule_cell.clone();
			// 	btn_rule.setName("btn_rule_"+i);
			// 	this._listView_rule.addChild(btn_rule);
			// }
			btn_rule.setName("btn_rule"+(i+1));
			btn_rule.visible = true;
			btn_rule.setTag(indexs[i]);
			var text = btn_rule.getChildByName("text");
			text.ignoreContentAdaptWithSize(true);
			var gameType = this.newRuleData.gamelist[i]
			var gamename = GameCnName[gameType];
			text.setString(gamename || "");
			btn_rule.setEnabled(true);
			var otherRule = that.data.info["rule" + clubRulesSelect]
			if (otherRule && otherRule != "delete") {
				setRuleBtnsUI(btn_rule,gameType==otherRule.gameType);
			}else{
				setRuleBtnsUI(btn_rule,false);
			}
			btn_rule.addTouchEventListener(function(sender, type) {
				if (type == 2) {
					var index = sender.getTag();
					that.showWanfaBg(index, sender.getPosition());
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
		var baseItemCount = 5;
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
			// allSortBtn[i].setPositionX(startX +dx);
		}
		// if(btn_outline_rule.visible){
		// 	btn_outline_rule.setPositionX(this._listView_rule.x - (this._listView_rule.width - startX) - itemSpace - btn_all_rule.width);
		// 	btn_all_rule.setPositionX(this._listView_rule.x - (this._listView_rule.width - startX) - 2 * (itemSpace + btn_all_rule.width));
		// }else{
		// 	btn_all_rule.setPositionX(this._listView_rule.x - (this._listView_rule.width - startX) - itemSpace - btn_all_rule.width);
		// }

		setAllRuleBtnsUI(btn_all_rule,clubRulesSelect.indexOf(-1) > -1 ? true : false);
		setAllRuleBtnsUI(btn_outline_rule,FriendCard_Common.isOnlyShowOutLineDesk() ? true : false);
		// if(FriendCard_Common.getOSDClub(that)){
		// 	btn_all_rule.visible = true;
		// }else{
		// 	btn_all_rule.visible = false;
		// }
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
					if(!this._img_dayang_tip.getChildByName("text")){
						var text = new ccui.Text("","fonts/lanting.TTF",24);
						text.setName("text");
						text.setPosition(cc.p(this._img_dayang_tip.width/2,this._img_dayang_tip.height/2));
						text.setTextColor(cc.color("#f8f9e9"));
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
		this.updateBG();
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
		//构建桌子cell,因为复用注意操作的还原
		var item = this.getDeskItem(i);
		item.visible = true;
		for(var j = 0; j < 3; j++){
			var otherCell = item.getChildByName("cell"+(j+3)+"_"+(i%2+1));
			if(otherCell){
				otherCell.visible = false;
			}
		}
        var cell = item.getChildByName("cell4"+"_"+(i%2+1))
        if(!cell){
        	var cloneCell = this.getDeskItem(0).getChildByName("cell4"+"_1");
        	cell = cloneCell.clone();
        	cell.name = "cell4"+"_"+(i%2+1);
        	cell.setPosition(cc.p(item.width/2,((i%2+1) == 1)? cloneCell.y : (item.height - cloneCell.y)))

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


        if(!room){
        	cell.visible = false;
        	return;
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
		textRuleNo.setFontSize(29 - splitRuleName[0].length);
		// if(splitRuleName[0].length > 6){
		// 	let ruleNameLength = parseInt(splitRuleName[0].length / 2);
		// 	splitRuleName[0] = splitRuleName[0].slice(0,ruleNameLength) + '\n' + splitRuleName[0].slice(ruleNameLength)
		// }
        if(splitRuleName[0]){
        	textRuleNo.setString(""+splitRuleName[0]+"")
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

		cell.getChildByName("Image_19").setVisible(false);//by verket
        var img_xuhao = cell.getChildByName("Image_19").getChildByName("img_xuhao");
		img_xuhao.setString(this._ruleSort[room.ruleIndex]);
		img_xuhao.ignoreContentAdaptWithSize(true);
        for (var j = 0; j < 4 || j < room.maxPlayer; j++) {

            var head = cell.getChildByName("head_" + (j + 1));
            var yizi = cell.getChildByName("yizi_" + (j + 1));
            if(!head.initPos){
                head.initPos = head.getPosition();
			}
            if(!yizi.initPos){
                yizi.initPos = yizi.getPosition();
            }
            head.setPosition(head.initPos);
            yizi.setPosition(yizi.initPos);
            head.setVisible(true);
            yizi.setVisible(true);
            // 当2人玩/3人玩时，不显示多余的头像、椅子
            if (j >= room.maxPlayer) {
                if (yizi)
                    yizi.setVisible(false);
                head.setVisible(false);
                continue;
            }

            //当3人玩的时候 左上角的桌子位置换到右下角
            // if (room.maxPlayer == 3 && j == 2){
            //     var head4P = cell.getChildByName("head_4").initPos ? cell.getChildByName("head_4").initPos : cell.getChildByName("head_4").getPosition();
            // 	var yizi4P = cell.getChildByName("yizi_4").initPos ? cell.getChildByName("yizi_4").initPos : cell.getChildByName("yizi_4").getPosition();

            //     head.setPosition(head4P);
            //     yizi.setPosition(yizi4P);
            // }

            //没有玩家的时候不显示头像， 晋中显示坐下头像
            if (!room.players || j > room.players.length - 1){
                head.setVisible(false);
                continue;
            }

            if (yizi){
                yizi.setVisible(false);
            }

            head.isMask = isMask;
            head.headMask = "friendCards/common/headMask.png";
            this.deleteCellRemoteHeadUI(head);

            // 贵州头像缓存优化--20201020--俱乐部闪退卡顿处理
			this.refreshHead(room.players[j].headimgurl, head);
            // if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
                // var loadUrl = MjClient.getWxHeadLocalUrl(room.players[j].uid, room.players[j].headimgurl);
                // this.refreshHead(loadUrl, head);
            // } else {
                // this.refreshHead(room.players[j].headimgurl, head);
            // }

            var name = head.getChildByName("Text_name");
            name.setString(getNewName_new(unescape(room.players[j].nickname),isMask ? 5 : 6));
            name.setFontName("Arial");
            name.setFontSize(name.getFontSize());
            name.ignoreContentAdaptWithSize(true);
            //晋中新加名字名字bg  其他还没加
            var text_nameBg = head.getChildByName("Text_nameBg");
            text_nameBg.visible = true;
            if(!text_nameBg.initWidth){
            	text_nameBg.initWidth = text_nameBg.width
            }
            if(name.getString().length > 5){
            	text_nameBg.width = text_nameBg.initWidth + 20;
            }
            else{
            	text_nameBg.width = text_nameBg.initWidth
            }
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

	showWanfaBg: function(index,pos){
		this.wanfabg.visible = true;
		var that = this;
		var gameType = this.newRuleData.gamelist[index-1];
		var list = this.newRuleData.rulelist[gameType]
		var wanfabgs = that.wanfabg.getChildByName("wanfabgs").getChildByName("wanfalist");
		var listX = [0,660,800,940,1080]
		var itemPos = this._ruleviewlistreal.getInnerContainerPosition();
        let dis = pos.x - 60 + itemPos.x;
		// cc.log("TTTTTTTTTTTTTTTTTTTTTTTT   ",wanfabgs.getPositionX())
		cc.log("====================", pos.x, "  ", itemPos.x);
		// that.wanfabg.getChildByName("wanfabgs").setPositionX(listX[index]);
		that.wanfabg.getChildByName("wanfabgs").setPositionX(810 + dis);
		wanfabgs.removeAllChildren();
		var wfbtn = that.wanfabg.getChildByName("wanfabtn")
		wfbtn.visible = false;
		var allheight = wanfabgs.getContentSize().height
		if (list.length > 4){
			allheight = (wfbtn.getContentSize().height + 8) * list.length;
		}
		wanfabgs.setInnerContainerSize(cc.size(160, allheight));
		for(var i = 0; i < list.length; i++){
			var wfbtns = wfbtn.clone();
			wfbtns.setPosition(cc.p(wfbtns.getContentSize().width/2, allheight - (wfbtns.getContentSize().height+8)*(0.6 + i)));
			wfbtns.setTag(list[i].ruleIndex || "");
			wfbtns.visible = true;
			var text = wfbtns.getChildByName("text");
			text.ignoreContentAdaptWithSize(true);
			if (list[i].ruleName) {
				var splitRuleName = FriendCard_Common.splitClubRuleName(unescape(list[i].ruleName));
				text.setString(splitRuleName[0] || GameCnName[gameType]);
			}else{
				text.setString(GameCnName[gameType]);
			}
			var fontSize = 22 * (wfbtns.getContentSize().width - 2) / text.getContentSize().width;
			text.setFontSize(fontSize > 22 ? 22 : fontSize);
			wfbtns.setEnabled(true);
			wanfabgs.addChild(wfbtns);
			wfbtns.addTouchEventListener(function(sender, type) {
				if (type == 2) {
					this.closeClubList();
					that.ruleIndex = sender.getTag();
					FriendCard_Common.reSetClubRulesSelect(that.clubId,that.ruleIndex,true,false);//FriendCard_Common.getOSDClub(that));
					that.refreshRuleList();
					that.refreshDeskList();

					that.wanfabg.visible = false;
				}
			}, this);
		}
	},

});


