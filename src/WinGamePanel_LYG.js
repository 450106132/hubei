

function SetEndOneUserUI(node,off)
{
	var sData=MjClient.data.sData;
	var tData=sData.tData;
	var pl=MjClient.getPlayerByIndex(off);
	node.setVisible(false);
	if(!pl)return;
	node.setVisible(true);
	setUserOfflineWinGamePanel(node,pl);
	node=node.getChildByName("head");
	var zhuangNode = node.getChildByName("zhuang");
	var tempZhuang = (typeof MjClient.preZhuang != 'undefined') ? MjClient.preZhuang : tData.zhuang;
    zhuangNode.setVisible(tData.uids[tempZhuang] == pl.info.uid);
	zhuangNode.zIndex=10;

    //add by sking
    var name = node.getChildByName("name");
    name.ignoreContentAdaptWithSize(true);

	var uibind= {
		head: {
			name: {
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                },
				_text: function () {
				    var _nameStr = unescape(pl.info.nickname ) + "";
				    //this.ignoreContentAdaptWithSize(true);
                    return getNewName (_nameStr);
				}
			},
			id: {
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
				_text: function () {
					return "ID:" + pl.info.uid.toString();
				}
			},

			winType: {
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
				_text: function () {
					return pl.baseWin > 0 ? ("X" + pl.baseWin) : "0";
				},
			},
			up: {
				_visible: false
				, _run: function () {
					var arry = [];
					//明杠
					for (var i = 0; i < pl.mjgang0.length; i++) {

						for (var j = 0; j < 4; j++) {
							if (j == 3) {
								arry.push(getNewCard(node, "up", "gang0", pl.mjgang0[i], 0, "isgang4"))
							} else {
								arry.push(getNewCard(node, "up", "gang0", pl.mjgang0[i], 0));
							}

						}
					}

					//添加暗杠
					for (var i = 0; i < pl.mjgang1.length; i++) {

						for (var j = 0; j < 4; j++) {

							if (j == 3) {
								var card = getNewCard(node, "down", "gang1", 0, 0, "isgang4");
								card.tag = pl.mjgang1[i];
								arry.push(card);

							} else {
								arry.push(getNewCard(node, "up", "gang1", pl.mjgang1[i], 0));
							}
						}

					}
					//添加碰
					for (var i = 0; i < pl.mjpeng.length; i++) {
						for (var j = 0; j < 3; j++) {
							arry.push(getNewCard(node, "up", "peng", pl.mjpeng[i], 0));
						}
					}

					//添加吃
					for (var i = 0; i < pl.mjchi.length; i++) {

						arry.push(getNewCard(node, "up", "chi", pl.mjchi[i], 0));
					}
					//添加手牌
					for (var i = 0; i < pl.mjhand.length; i++) {

						arry.push(getNewCard(node, "up", "mjhand", pl.mjhand[i], 0));
					}

					for (var i = 0; i < arry.length; i++) {
						arry[i].visible = true;
						arry[i].enabled = false;
                        arry[i].setScale(arry[i].getScale()*1.1);
					}


					CardLayoutRestoreForEndOne(node, pl);

				},
			},
			down: {
				_visible: false
			},
			stand: {
				_visible: false
			}, cardType: {
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
				_text: function () {
					return pl.mjdesc + ""
				},
			}

		}
		, winNum: {
			_text: function () {
				var pre = "";
				if (pl.winone > 0) pre = "+";
				return pre + (tData.fieldId ? getJinbiStr(pl.winone):pl.winone);
			},
			_run: function () {
				if(pl.winone < 0) { // 分数小于零，改变字体颜色
		            this.setTextColor(cc.color(124,198,236));
		            this.enableOutline(cc.color(92,100,199), 2);
		        }
			}
			, hu: {
				_run: function () {
					setGameOverPanelPlayerState(this, pl, true);
				}
			}
            , fenshu: {
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
            }
		}
	}
	BindUiAndLogic(node.parent,uibind);
	addWxHeadToEndUI(uibind.head._node,off);
	//uibind.winNum._node.y=uibind.head._node.y;
}


var EndOneView_LYG = cc.Layer.extend({
	jsBind:{
		block: {
            _layout: [[1, 1], [0.5, 0.5], [0, 0], true]
        },
		back:{
			_layout:[[1,1],[0.5,0.5],[0,0]]
		,wintitle:
		{
			_visible:function(){
				  var pl=getUIPlayer(0);
				  if(pl)
				  {
                      //playEffect("win");
					  return pl.winone >=1;
				  }
				  return false;
			}
		},losetitle:
		{
			_visible:function(){
				  var pl=getUIPlayer(0);
				  if(pl)
				  {
                      //playEffect("lose");
					  return pl.winone <0;
				  }
				  return false;
			}
		},pingju:
		{
			_visible:function(){

				  var pl=getUIPlayer(0);
				  
				  if(pl)
				  {
                      //playEffect("lose");
					  return pl.winone==0;
				  }
				  return false;
			},_run:function()
			{
				var sData = MjClient.data.sData;
				var tData = sData.tData;
                if (MjClient.isDismiss)
                {
                    this.loadTexture("gameOver/jiesan.png");
                }
				else if(MjClient.CheckPlayerCount(function(p){ if(p.winone==0){return true;} return false;}) == tData.maxPlayer)
				{
					if(isRealHuangZhuang()) this.loadTexture("gameOver/huangzhuan_35.png");
				}
			}
		}
        ,
		share:{
			_click:function(btn,eT){
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Xiaojiesuanjiemian_Fenxiang", {uid:SelfUid()});
				
				MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
				{
					postEvent("capture_screen");
					MjClient.endoneui.capture_screen = true;
					btn.setTouchEnabled(false);
				});
			}
			,_event:{
				captureScreen_OK: function () {
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
					}.bind(this))));
				}
			}
			,_visible :function()
			{
					var tData = MjClient.data.sData.tData;
					return (!MjClient.remoteCfg.guestLogin && !tData.matchId);
			}
		},
		ready:{
			_run:function ()
			{
				if(MjClient.remoteCfg.guestLogin)
				{
					setWgtLayout(this, [0.15, 0.15],[0.5, 0.085],[0, 0], false, true);
				}
				var sData = MjClient.data.sData;
                var tData = sData.tData;
                if(tData.fieldId){
                    this.loadTextureNormal("gameOver/btn_again_n.png");
                    this.loadTexturePressed("gameOver/btn_again_s.png");
                    this.loadTextureDisabled("gameOver/btn_again_s.png");
                }
			},
			_click:function(btn,eT)
			{
                var sData = MjClient.data.sData;
                var tData = sData.tData;
                if(!tData.fieldId){
                    postEvent("clearCardUI");
                    MjClient.endoneui.removeFromParent(true);
                    MjClient.endoneui = null;
                }
				reInitarrCardVisible();
				if (MjClient.rePlayVideo != -1 && MjClient.replayui) {
					MjClient.replayui.replayEnd();
				}
				else {
                    if (tData.fieldId){
                        leaveGameClearUI();
                        MjClient.Scene.addChild(new goldMatchingLayer({matching:false,gameType:tData.gameType}));
                        MjClient.goldfieldEnter(tData.fieldId,tData.gameType);
                        return;
                    }else{
                        MjClient.MJPass2NetForLianYunGang();
                    }
				}
			},
			_visible :function()
			{
				var tData = MjClient.data.sData.tData;
				return !tData.matchId;
			}
		},
		close:{
			_visible: function () {
				var sData = MjClient.data.sData;
				var tData = sData.tData;
				if(tData.fieldId){
					return true;
				}
				return false;
			},
			_click: function (btn, eT) {
				leaveGameClearUI();
			}
		},
		dir:
		{
			_visible:true,
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
            },
			_text: function () {
                var sData = MjClient.data.sData;
                var tData = sData.tData;
                if(tData.fieldId){
                    var payWay = tData.areaSelectMode.payWay;
                    delete tData.areaSelectMode.payWay;
                    var result = GameCnName[MjClient.gameType] + ","+getPlayingRoomInfo(0);
                }else{
                    var result = getPlayingRoomInfo(3);
				}
                if(payWay){
                    tData.areaSelectMode.payWay = payWay;
                }
                return result;

			}
		},
		head0:{
			head:{
				zhuang:{_visible:false}
			},
		    winNum:{
			},
		   _run:function(){ SetEndOneUserUI(this,0); },
		   
		}
		,head1:{ 
		   head:{
			   zhuang:{_visible:false}
		   },
	       winNum:{
			   // _layout:[[0.08,0.08],[1,0.5],[-2.5,0.75]]
		   },
		  _run:function(){ SetEndOneUserUI(this,1); }
		}
		
		,head2:{ 
		   head:{
			   zhuang:{_visible:false}
		   },
	       winNum:{
			   // _layout:[[0.08,0.08],[1,0.5],[-2.5,-0.75]]
		   },
		   _run:function(){ SetEndOneUserUI(this,2); }
		}
		,head3:{
			 head:
			 {
				zhuang:{_visible:false}
			 },
			 winNum:{
				 // _layout:[[0.08,0.08],[1,0.5],[-2.5,-2.25]]
			 },
			_run:function(){ SetEndOneUserUI(this,3); }
			},
            count_down:{
                _visible :function()
                {
                    var tData = MjClient.data.sData.tData;
                    return tData.matchId;
                },
                _run:function()
				{
                    schedulLoadTexture(this);
				}
			}
		}
	},
    ctor:function () {
        this._super();
        var endoneui = ccs.load(res.EndOne_json);
		BindUiAndLogic(endoneui.node,this.jsBind);
        this.addChild(endoneui.node);

        var _dir = endoneui.node.getChildByName("back").getChildByName("dir");
        _dir.ignoreContentAdaptWithSize(true);

        //时间
        var _back = endoneui.node.getChildByName("back");
        var _time =  _back.getChildByName("time");
        _time.visible = true;
        //function _setTime()
        //{
        //    var time = MjClient.getCurrentTime();
        //    var str = " " + time[0] + "-" + time[1] + "-" + time[2] + " " + time[3] + ":" + time[4] + ":" + time[5];
        //    return str;
        //}
        _time.setString(MjClient.roundEndTime);

		MjClient.endoneui=this;

		changeMJBg(this, getCurrentMJBgType());
 		return true;
    }
});

function GetDelUserInfo(off)
{
	var sData=MjClient.data.sData;
	var tData=sData.tData;
	if(tData.firstDel<0) return null;
	var idx=(tData.uids.indexOf(tData.firstDel)+off)%tData.maxPlayer;
	return sData.players[tData.uids[idx]+""];
}

// 新解散房间玩家信息设置
function DelRoomPlayerInfo(node, off, delPlayer)
{
	var pl = GetDelUserInfo(off);
	if(!node) return;
	if(!pl) {
        node.setVisible(false);
        return;
    }
    node.setVisible(true);

    // 申请解散玩家显示
    if(delPlayer && off == 0)
	{
		node.setString(""+unescape(pl.info.nickname));
		node.setFontName("Arial");
		node.setFontSize(node.getFontSize());
		return;
	}

	var sData = MjClient.data.sData;
	var tData = sData.tData;

    var name = node.getChildByName("name");
    if(name){
        name.ignoreContentAdaptWithSize(true);
        name.setFontName("Arial");
        name.setFontSize(name.getFontSize());
    }else{
        node.setString("玩家[" + getNewName(unescape(pl.info.nickname)+"") + "]申请解散房间");
    }
    var tipBgWait = node.getChildByName("tipBg_wait");
    if(tipBgWait){
        tipBgWait.getChildByName("Text").ignoreContentAdaptWithSize(true);
    }
    var tipBgSure = node.getChildByName("tipBg_sure");
    if(tipBgSure)
        tipBgSure.getChildByName("Text").ignoreContentAdaptWithSize(true);

    var head = node.getChildByName("headImg");
    if(head) {
        // 显示玩家头像
        var url = pl.info.headimgurl;
        if (!url) url = "png/default_headpic.png";
        cc.loader.loadImg(url, {isCrossOrigin: true}, function (err, texture) {
            if (!err && texture && cc.sys.isObjectValid(head)) {
                var clippingNode = new cc.ClippingNode();
                var maskImg = "home/zhezhao.png";
                var hideblockImg = "home/homeHeadCusPic.png";
                if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                    MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
                    maskImg = "home/zhezhao.png";
                    hideblockImg = "home/zhezhao_mask.png"
                }
                var mask = new cc.Sprite(maskImg);
                clippingNode.setAlphaThreshold(0);
                clippingNode.setStencil(mask);
                var img = new cc.Sprite(texture);
                img.setScale(mask.getContentSize().width / img.getContentSize().width);
                clippingNode.addChild(img);
                
                if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP) {
                	clippingNode.setScale(0.95);
                	clippingNode.setPosition(head.getContentSize().width / 1.613, head.getContentSize().height / 1.9);
                }
                else {
                	clippingNode.setScale(0.97);
		    		clippingNode.setPosition(head.getContentSize().width / 2, head.getContentSize().height / 2);
                }

                //遮罩框
                var hideblock = new cc.Sprite(hideblockImg);
                hideblock.setPosition(hideblock.getContentSize().width / 2, hideblock.getContentSize().height / 2);
                head.addChild(clippingNode);
                head.addChild(hideblock);
            }
        });
    }

    if(name){
        name.setString(getNewName(unescape(pl.info.nickname)+""));
        name.setFontName("Arial");
        name.setFontSize(name.getFontSize());
    }
    if(pl.delRoom > 0) // 同意
	{
        if(tipBgWait)
            tipBgWait.visible = false;
        if(tipBgSure)
            tipBgSure.visible = true;
	}
	else if(pl.delRoom == 0) // 等待选择
	{
        if(tipBgWait)
            tipBgWait.visible = true;
        if(tipBgSure)
            tipBgSure.visible = false;
	}
	else if(pl.delRoom < 0) // 拒绝
	{
        if(tipBgWait)
            tipBgWait.visible = false;
        if(tipBgSure)
            tipBgSure.visible = false;
	}
}
function showDelRoomCountdown_new(node)
{

	var callback = function(){
		var sData = MjClient.data.sData;
		var tData = sData.tData;
		var  time = sData.serverNow + Date.now();
		var  needtime = tData.delEnd - time;
		var need_s = Math.floor((needtime / 1000) % 60);
		var need_m = Math.floor((needtime / 1000) / 60);
		if (need_s == 0 && need_m == 0) 
		{
			node.stopAllActions();
		}
		node.setString("发起解散申请，牌桌将于(" + need_m + "分" + need_s + ")后自动解散");
	};
	node.x = node.getParent().width+10;
	node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(callback),cc.delayTime(1.0))));
}


function DelRoomConsent(node,off)
{
	var pl=GetDelUserInfo(off);
	if(!pl) return;
	if(!node) return;
	var sData=MjClient.data.sData;
	var tData=sData.tData;
	node.setFontName("Arial");
	node.setFontSize(node.getFontSize());
	if(off==0)
	{
		node.setString("玩家["+unescape(pl.info.nickname)+"]申请解散房间");
	}
	else
	{
		if(pl.delRoom>0)
		{
			node.setString("玩家["+unescape(pl.info.nickname)+"]同意");
		}
		else if(pl.delRoom==0)
		{
			node.setString("玩家["+unescape(pl.info.nickname)+"]等待选择");
		}
		else if(pl.delRoom<0)
		{
			node.setString("玩家["+unescape(pl.info.nickname)+"]拒绝");
		}
	}
}
function setDelRoomVisible(node)
{
	var pl=getUIPlayer(0);
	node.visible=pl.delRoom==0;
}

function showDelRoomCountdown(node)
{

	var callback = function(){
		var sData =MjClient.data.sData;
		var tData = sData.tData;
		var  time = sData.serverNow + Date.now();
		var  needtime =tData.delEnd-time;
		var need_s =Math.floor((needtime /1000)%60);
		var need_m = Math.floor((needtime / 1000) /60);
		if (need_s==0 && need_m==0) 
		{
			node.stopAllActions();
		}
		node.setString("在"+need_m+"分"+need_s+"之后将自动同意");
	};
	node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(callback),cc.delayTime(1.0))));
}

(function(){
	

//申请解散房间
RemoveRoomView = cc.Layer.extend({
	jsBind:{
		back:{
			player0:
			{
				_event:{DelRoom:function(){ DelRoomConsent(this,0);  }}
			},
			player1:{
				_event:{DelRoom:function(){ DelRoomConsent(this,1);  }}
			},
			player2:{
				_event:{DelRoom:function(){ DelRoomConsent(this,2);  }}
			},
			player3:{
				//_run:function(){ DelRoomConsent(this,3);  },
				_event:{DelRoom:function(){ DelRoomConsent(this,3);  }}
			},
			player4:{
				_event:{DelRoom:function(){ DelRoomConsent(this,4);  }}
			},
			yes:{
				_event:{DelRoom:function(){ setDelRoomVisible(this);  }}
			},
			no:{
                _event:{DelRoom:function(){ setDelRoomVisible(this);  }}
			}
		},
		_event:{
			endRoom:function() {MjClient.delroomui.removeFromParent(true); delete MjClient.delroomui; },
			roundEnd:function(){MjClient.delroomui.removeFromParent(true); delete MjClient.delroomui; },
			LeaveGame:function(){MjClient.delroomui.removeFromParent(true); delete MjClient.delroomui; }
		}
	},
    ctor:function () {
        this._super();
        var delroomui = ccs.load("DelRoom.json");
		BindUiAndLogic(delroomui.node,this.jsBind);
        this.addChild(delroomui.node);
		MjClient.delroomui=this;
		dismissTipInRedPackageRoom();
		/*
		    changed by sking
		*/
		var _block = delroomui.node.getChildByName("block");
		setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = delroomui.node.getChildByName("back");
        setWgtLayout(_back,[0.6,0.75],[0.5,0.5],[0,0]);

        var _player0 = _back.getChildByName("player0");
        DelRoomConsent(_player0,0);
        _player0.ignoreContentAdaptWithSize(true);

        var _player1 = _back.getChildByName("player1");
        DelRoomConsent(_player1,1);
        _player1.ignoreContentAdaptWithSize(true);

        var _player2 = _back.getChildByName("player2");
        DelRoomConsent(_player2,2);
        _player2.ignoreContentAdaptWithSize(true);

        var _player3 = _back.getChildByName("player3");
        DelRoomConsent(_player3,3);
        _player3.ignoreContentAdaptWithSize(true);

        var _player4 = _back.getChildByName("player4");
        if(_player4){
        	DelRoomConsent(_player4,4);
        	_player4.ignoreContentAdaptWithSize(true);
        }
        if(MjClient.data.sData.tData.maxPlayer == 2){
        	_player3.visible = false;
        	if(_player4){
        		_player4.visible = false;
        	}
        }else if(MjClient.data.sData.tData.maxPlayer == 3 && _player4){
			_player4.visible = false;
        }

        var _time = _back.getChildByName("time");
        showDelRoomCountdown(_time);

        //确定解散
        var _yes = _back.getChildByName("yes");
        setDelRoomVisible(_yes);
        _yes.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.delRoom(true);
                    break;
                default :
                    break;
            }
        }, this);

        //取消
        var _no = _back.getChildByName("no");
        setDelRoomVisible(_no);
        _no.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.delRoom(false);
                    break;
                default :
                    break;
            }
        }, this);


        return true;
    }
});

//新版申请解散房间
RemoveRoomView_new = cc.Layer.extend({
	jsBind:{
		back:{
			player0:
			{
				_event:{DelRoom:function(){ DelRoomPlayerInfo(this, 0, true);  }}
			},
			yes:{
				_event:{DelRoom:function(){ setDelRoomVisible(this);  }}
			},
			no:{
                _event:{DelRoom:function(){ setDelRoomVisible(this);  }}
			},
			item:{
				_visible: false
			},
		},
		_event:{
			endRoom:function() {MjClient.delroomui.removeFromParent(true); delete MjClient.delroomui; },
			roundEnd:function(){MjClient.delroomui.removeFromParent(true); delete MjClient.delroomui; },
			LeaveGame:function(){MjClient.delroomui.removeFromParent(true); delete MjClient.delroomui; }
		}
	},
    ctor:function () {
        this._super();
        var delroomui = ccs.load("DelRoom.json");
		BindUiAndLogic(delroomui.node, this.jsBind);
        this.addChild(delroomui.node);
		MjClient.delroomui = this;

		dismissTipInRedPackageRoom();
		/*
		    changed by sking
		*/
		var _block = delroomui.node.getChildByName("block");
		setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = delroomui.node.getChildByName("back");
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP) {
        	setWgtLayout(_back,[0.65,0.65],[0.5,0.5],[0,0]);
        }
        else {
        	setWgtLayout(_back,[0.8,0.8],[0.5,0.5],[0,0]);
        }

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
        	MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ) {
        	delroomui.node.getChildByName("back").getChildByName("DelRoom_title").setVisible(true);
        	delroomui.node.getChildByName("back").getChildByName("hePai_title").setVisible(false);
        }

        var _player0 = _back.getChildByName("player0");
        DelRoomPlayerInfo(_player0, 0, true);
        _player0.ignoreContentAdaptWithSize(true);

        var listViewNode = _back.getChildByName("ListView");
        listViewNode.removeAllChildren();
        listViewNode.width = MjClient.data.sData.tData.maxPlayer * 168;
        var playerItem = listViewNode.getParent().getChildByName("item");
   		for (var i = 0; i < MjClient.data.sData.tData.maxPlayer; i++) {
   			var newitem = playerItem.clone();
   			newitem.setName("item"+i);
   			listViewNode.pushBackCustomItem(newitem);
			DelRoomPlayerInfo(newitem, i);
   		}
		listViewNode.setScrollBarEnabled(false);

		var uibind = {
	        	item0: {
					_event:{DelRoom:function(){ DelRoomPlayerInfo(this,0);  }}
				},
				item1: {
					_event:{DelRoom:function(){ DelRoomPlayerInfo(this,1);  }}
				},
				item2: {
					_event:{DelRoom:function(){ DelRoomPlayerInfo(this,2);  }}
				},
				item3: {
					_event:{DelRoom:function(){ DelRoomPlayerInfo(this,3);  }}
				},
				item4: {
					_event:{DelRoom:function(){ DelRoomPlayerInfo(this,4);  }}
				},
		    }
		BindUiAndLogic(listViewNode, uibind);

        var _time = _player0.getChildByName("time");
        _time.ignoreContentAdaptWithSize(true);
        showDelRoomCountdown_new(_time);

        //确定解散
        var _yes = _back.getChildByName("yes");
        setDelRoomVisible(_yes);
        _yes.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.delRoom(true);
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Jiesanfangjian_Tongyii", {uid: SelfUid(),gameType:MjClient.gameType});

                    break;
                default :
                    break;
            }
        }, this);

        //取消
        var _no = _back.getChildByName("no");
        setDelRoomVisible(_no);
        _no.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.delRoom(false);
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Shezhi_Jiesanfangjian_Jujue", {uid: SelfUid(),gameType:MjClient.gameType});
                    break;
                default :
                    break;
            }
        }, this);

        // UIEventBind(null, delroomui.node, "initSceneData", function (eD) {
        //     if(MjClient.delroomui){
        //         MjClient.delroomui.removeFromParent(true);
        //         delete MjClient.delroomui;
        //     }
        // });


        return true;
    }
});

// 晋中新解散房间
if (MjClient.getAppType()  ===  MjClient.APP_TYPE.TXJINZHONGMJ ||
	MjClient.getAppType()  ===  MjClient.APP_TYPE.DQSHANXIMJ ||
    MjClient.getAppType() ===  MjClient.APP_TYPE.AYGUIZHOUMJ ||
    MjClient.getAppType() ===  MjClient.APP_TYPE.LYSICHUANMJ  ||
	MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
    MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
	MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
	RemoveRoomView = RemoveRoomView_new;
}


//房间已解散
var endroomui;
StopRoomView = cc.Layer.extend({

    ctor:function () {
        this._super();
        endroomui = ccs.load("EndRoom.json");
		//BindUiAndLogic(endroomui.node,this.jsBind);
        this.addChild(endroomui.node);

		/*
		    changed by sking
		*/
		var _block = endroomui.node.getChildByName("block");
		setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = endroomui.node.getChildByName("back");
        setWgtLayout(_back,[0.6,0.75],[0.5,0.5],[0,0]);
        //返回大厅
        var _toHome = _back.getChildByName("tohome");
        _toHome.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    var msg=MjClient.endRoomMsg;
                    if(msg.reason>=0)
                    {
                        MjClient.leaveGame();
                    }

                    if( cc.sys.isObjectValid(endroomui) ) {
                    	endroomui.removeFromParent(true);
                    }

                    //if (MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                    //	MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP)
                    //{
                    //	if (!MjClient.enterui && !MjClient.FriendCard_main_ui)
                    //    	MjClient.Scene.addChild(new EnterRoomLayer());
                    //}
                    break;
                default :
                    break;
            }
        },this);

        //文字信息
        var _info = _back.getChildByName("info");
        function _setInfo()
        {
			var msg = MjClient.endRoomMsg;
			if (msg.reason == 0) {
				if (MjClient.remoteCfg.hideMoney) return "还没有开始打牌";
				var sData = MjClient.data.sData;
				var tData = sData.tData;
				if (tData.uids[0] == SelfUid()){
					var str = "游戏未开始，解散房间将不会扣除元宝";
					if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
						str = "游戏未开始，解散房间将不会扣除元宝";
					}
					return str;
				}
				return "房间已被" + GetNameByUid([tData.uids[0]]) + "解散,请重新加入游戏";
			} else if (msg.reason == 1) {
				return "解散房间申请超时";
			} else if (msg.reason == 2) {
				return "玩家 " + GetNameByUid(msg.yesuid) + " 同意解散房间";
			} else if (msg.reason == 3) {
				return "   房间已被" + unescape(msg.disbander.nickname) + "（" + msg.disbander.uid + "）解散，如有疑问请截图询问会长或管理员。";
			} else if (msg.reason == 4) {
                if(msg.disbander){
                    return "   房间已被" + unescape(msg.disbander.nickname) + "（" + msg.disbander.uid + "）解散";
                }else {
                    return "           房间已被房主解散";
                }
			} else if (msg.reason == 5) {
				return "           房间已被系统解散";
			}
        }
        _info.setString(_setInfo());
        // 岳阳去掉文字空格
        if(MjClient.APP_TYPE.QXYYQP == MjClient.getAppType() ||
			MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
        	MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
        	MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
        	MjClient.APP_TYPE.BDHYZP == MjClient.getAppType())
        {
            _info.setString(_setInfo().trim());
        }
        endroomui = this;
		if (MjClient.webViewLayer != null)
		{
			MjClient.webViewLayer.close();
		}
        if(cc.sys.isObjectValid(MjClient.playerChatLayer)){
            MjClient.playerChatLayer.removeFromParent(true);
            delete MjClient.playerChatLayer;
        }
        if(cc.sys.isObjectValid(MjClient.setui)){
        	MjClient.setui.removeFromParent(true);
        	delete MjClient.setui;
		}

        return true;
    }
});


})();


function reInitarrCardVisible()
{
    if(cc.sys.isObjectValid(MjClient.arrowbkNode) && MjClient.arrowbkNode.getParent())
    {
        MjClient.arrowbkNode.setVisible(false);
    }

    if(cc.sys.isObjectValid(MjClient.arrowbk3DNode) && MjClient.arrowbk3DNode.getParent())
    {
        MjClient.arrowbk3DNode.setVisible(false);
    }

    if(cc.sys.isObjectValid(MjClient.roundnumImgNode) && MjClient.roundnumImgNode.getParent())
    {
        MjClient.roundnumImgNode.setVisible(false);
    }
    if(cc.sys.isObjectValid(MjClient.cardNumImgNode) && MjClient.cardNumImgNode.getParent())
    {
        MjClient.cardNumImgNode.setVisible(false);
    }
}

function addWxHeadToEndUI(node,off)
{
	var pl = MjClient.getPlayerByIndex(off);
	var img = "png/default_headpic.png";
	//if(pl && pl.wxHeadImg)
	//{
	//	img = pl.wxHeadImg;
	//}
	//else
	//{
	//	return;
	//}

	if(pl && pl.info.headimgurl)
	{
		cc.loader.loadImg(pl.info.headimgurl, { isCrossOrigin: true }, function(err, texture) {
			if (!err && texture) {
				img = texture;
			}
		});
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

function CardLayoutRestoreForEndOne(node, endonepl, isHu)
{
    if(isJinZhongAPPType())
    {
        return CardLayoutRestoreForEndOne_jinzhong(node, endonepl);
    }

    // node 是克隆新建的一个麻将节点 by sking

    var newC = null; //先创建麻将的UI节点
    var newVal = 0; //新牌的值，是几万，几筒，几条....为数字
    var pl = endonepl; //player 信息



    var mjhandNum = 0;
    var children = node.children;
    for(var i = 0; i < children.length; i++)
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {
            mjhandNum++;
        }
    }

    var tempMaJiang = MjClient.majiang; //麻将的各种方法判断，是否可以杠，是否可以吃... by sking

    //排序麻将的位置 by sking
    if (pl.mjhand && pl.mjhand.length > 0)
    {
        var count = tempMaJiang.CardCount(pl);
        if(count == 14 && mjhandNum == pl.mjhand.length)
        {
            newVal = pl.mjhand[pl.mjhand.length - 1]; //为什么取最后一个节点 ？
        }
    }

    //up stand 是2种麻将的图。
    var up = node.getChildByName("up");
    var stand = node.getChildByName("stand");
    var start = up, offui = stand;


    var upSize = offui.getSize();
    var upS = offui.scale;
    //mjhand standPri out chi peng gang0 gang1
    var uipeng = [];
    var uigang0 = [];
    var uigang1 = [];
    var uichi = [];
    var uistand = [];
    var uihun = [];//癞子牌在最左边
    // var sData = MjClient.data.sData;
    // var tData = sData.tData;
    for(var i = 0; i < children.length; i++) //children 为 "down" 节点下的字节点
    {
        var ci = children[i];
        if(ci.name == "mjhand")
        {
            if(newC == null && newVal == ci.tag)
            {
                newC = ci; //从down 节点下，复制一个麻将node保存在newC 里 by sking
            }
            else
            {
                if(MjClient.data.sData.tData.hunCard == ci.tag)
                {
                    uihun.push(ci);
                }
                else
                {
                    uistand.push(ci);
                }
            }

            //if(MjClient.data.sData.tData.hunCard == ci.tag)
            //{
            //    ci.setColor(cc.color(255,255,63));
            //}

        }
        else if(ci.name == "standPri")
        {
            uistand.push(ci);
        }
        else if(ci.name == "gang0")
        {
            uigang0.push(ci);
        }
        else if (ci.name == "gang1")
        {
            uigang1.push(ci);
        }
        else if (ci.name == "chi")
        {
            uichi.push(ci);
        }
        else if (ci.name == "peng")
        {
            uipeng.push(ci);
        }
    }


    if(MjClient.gameType === MjClient.GAME_TYPE.XU_ZHOU)
    {
        uistand.sort(TagOrder_xz);
    }else if((MjClient.gameType === MjClient.GAME_TYPE.DAO_ZHOU_MJ && 
    	!MjClient.majiang.so13(pl.mjhand, MjClient.data.sData.tData.hunCard))||
    		MjClient.gameType === MjClient.GAME_TYPE.YONG_ZHOU_MJ)
    {
    	uistand.sort(function(node_a,node_b){
	        var tag_a = node_a.tag;
	        var tag_b = node_b.tag;
	        if(tag_a == 71){
	            tag_a = MjClient.data.sData.tData.hunCard;
	        }
	        if(tag_b == 71){
	            tag_b = MjClient.data.sData.tData.hunCard;
	        }
	        return tag_a - tag_b;
	    });
    }
    else
    {
        uistand.sort(TagOrder);
    }


    if(uihun.length > 0) //是否有柰子，有则放在最前面 by sking
    {
        for(var i = 0; i < uihun.length; i++)
        {
            uistand.unshift(uihun[i]); //向数组开头添加一个元素 unshift
        }
    }

    if(newC)
    {
        uistand.push(newC); //把这张牌放入手牌的数组里  by sking
    }

    var uiOrder = [uigang1, uigang0, uipeng, uichi, uistand];


    var orders = []; //重新排序后装到数组里 by sking
    for(var j = 0; j < uiOrder.length; j++)
    {
        var uis = uiOrder[j];
        for(var i = 0; i < uis.length; i++)
        {
            orders.push(uis[i]);
        }
    }

    //设置麻将大小
    var slotwith = upSize.width * upS * 0.2;//0.05;
    var slotheigt = upSize.height * upS * 0.3;
    for(var i = 0; i < orders.length; i++)
    {
        var ci = orders[i];
        if (ci.name == "mjhand" && MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
        	ci.y += 5;
        }
        if(i != 0)
        {
            if(ci.name == orders[i - 1].name)
            {
                if(ci.isgang4)
                {
                    ci.x = orders[i - 2].x;
                    ci.y = orders[i - 2].y + upSize.height * upS * 0.18;
                }
                else if (orders[i - 1].isTeshuGang3_3)
                {
                    ci.x = orders[i - 1].x + upSize.width * upS + slotwith;
                }
                else if(orders[i - 1].isgang4)
                {
                    ci.x = orders[i - 2].x + upSize.width * upS*1.2 + slotwith;
                }
                else
                {
                    if(ci.name == "mjhand")
                    {
                        ci.x = orders[i - 1].x + upSize.width * upS *1.35;
                    }
                    else
                    {
                        ci.x = orders[i - 1].x + upSize.width * upS *1.2;
                    }
                }
            }
            else if(orders[i - 1].name == "gang0" || orders[i - 1].name == "gang1")
            {
				if (orders[i - 1].y - orders[i - 2].y < upSize.height * upS * 0.1)
					ci.x = orders[i - 1].x + upSize.width * upS*1.2 + slotwith;
				else
                	ci.x = orders[i - 2].x + upSize.width * upS*1.2 + slotwith;
            }
            else
            {
                ci.x = orders[i - 1].x + upSize.width * upS*1.2 + slotwith;
            }

            if(i == orders.length - 1)
            {
                console.log("--------newC--------"+newC);
                if(newC && endonepl)
                {
                    ci.x = ci.x + slotwith + 10;
                }
                else if(newC)
                {
                    ci.x = ci.x + slotwith + 10;
                    ci.y += 20;
                }


                //如果胡牌，pl.winType（胡牌类型）一定大于0
                if(isHu && newC && pl.winType > 0)
                {
                    var cardTag = new ccui.ImageView("playing/other/huTag.png");
                    cardTag.setPosition(newC.getContentSize().width*0.9,newC.getContentSize().height *0.8);
                    cardTag.setScale(2.2);
                    newC.addChild(cardTag,50);
                }
            }
        }
        else
        {
            ci.x = start.x + upSize.width * upS;
        }


        // 海安小结算3D麻将牌面调整
        if(COMMON_UI3D.is3DUI()) {
			if(MjClient.APP_TYPE.QXHAIANMJ === MjClient.getAppType()) {
				var imgNode = ci.getChildByName("imgNode");
				if(imgNode) imgNode.setScale(1.1);
			}
		}
    }
}
