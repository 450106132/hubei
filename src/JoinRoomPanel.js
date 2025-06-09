function InputRoomNumber(n)
{
	var change=true;
	if(n>=0&&MjClient.entercode.length<6)       MjClient.entercode.push(n);
    else if(n==-1&&MjClient.entercode.length>0) MjClient.entercode.length=MjClient.entercode.length-1;
	else if(n==-2&&MjClient.entercode.length>0) MjClient.entercode.length=0;
	else change=false;
	if(change) 
	{
	   postEvent("EnterAddText");
	   if(MjClient.entercode.length==6)
	   {
		   var entercode=MjClient.entercode;
		   var tableid=0;
		   for(var i=0;i<entercode.length;i++)
		   {
			   tableid=tableid*10+entercode[i];
		   }

		   MjClient.joinGame(tableid, function(rtn)
           {
               if (rtn.result == 0)
               {
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Shurufanghaochenggong", {uid:SelfUid()});
                   if (MjClient.enterui) MjClient.enterui.removeFromParent(true);
               }
               else
               {
                   InputRoomNumber(-2);
               }
           });
	   }
    }
}
function EnterAddText()
{
	var idx=parseInt(this.getName()[2]+"");
	var entercode=MjClient.entercode;
	if(idx<entercode.length)
	{
		this.getChildByName("Text").setString(entercode[idx]);
	}
	else this.getChildByName("Text").setString("");
}
function EmptyString(){return "";}

var EnterRoomLayer = cc.Layer.extend({
    sprite:null,
	jsBind:{
		back:
		{
			top:{
				bg0:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
				bg1:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
				bg2:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
				bg3:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
				bg4:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
				bg5:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  }
			}
		},
	},
    ctor:function () {
        this._super();

        // 如果是回放本页面不打开 
        if(MjClient.rePlayVideo >= 0 && MjClient.replayui &&
            (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType())){
            MjClient.replayui.replayEnd();
            this.removeFromParent();  
            return true; // 回放不显示加入房间界面
        }

        var enterui = ccs.load(res.Enter_json);
		BindUiAndLogic(enterui.node,this.jsBind);
        this.addChild(enterui.node);
		MjClient.enterui=this;
		MjClient.entercode=[];

		/*
		    changed by sking
		*/
        var _block = enterui.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], 2);

        var _back = enterui.node.getChildByName("back");
        setWgtLayout(_back, [0.97, 0.97], [0.5, 0.5], [0, 0]);

        var _btnClose = _back.getChildByName("close");
        _btnClose.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.createRoomLayer = null;
                    this.removeFromParent();
                    var key = "Zhujiemian_Jiarufangjian_Close";
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
                    {
                        key = "WodefangjianGuanbiClick";
                    }
                    MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid()});
                    break;
                default :
                    break;
            }
        }, this);

        //数字按键
        var _num = _back.getChildByName("num");
        function numBtnTouchEvent(sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                var itag = sender.getTag();
                InputRoomNumber(itag);
            }
        }
        for (var i = 0; i <= 9; i++) {
            var _btnNum = _num.getChildByName("Button_" + i);
            _btnNum.setTag(i);
            _btnNum.addTouchEventListener(numBtnTouchEvent, this);
        }

        //清除所有
        var _clear =  _num.getChildByName("clear");
        _clear.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
					MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Qingkong", {uid:SelfUid()});
                    InputRoomNumber(-2);
                    break;
                default :
                    break;
            }
        }, this);

        //删除
        var _del =  _num.getChildByName("del");
        _del.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
					MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Shanchu", {uid:SelfUid()});
                    InputRoomNumber(-1);;
                    break;
                default :
                    break;
            }
        }, this);


        //我的房间
        this.InitMyRoom(_back);

        return true;
    },
    InitMyRoom:function(_back)
    {

        var _btnRoomHistory = _back.getChildByName("Button_record");
        _btnRoomHistory.setTouchEnabled(true);
        _btnRoomHistory.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_Kaifangjilu", {uid:SelfUid()});
                    _back.setVisible(false);
                    MjClient.createRoomLayer = _back;
                    if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
                        this.addChild(new createRoomRecordLayer_v3());
                    else
                        this.addChild(new createRoomRecordLayer());
                    break;
                default :
                    break;
            }
        }, this);

        var _btnCreateRoom = _back.getChildByName("Button_10_0");
        _btnCreateRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (!MjClient.data.sData)
                    {
                        _back.setVisible(false);
                        MjClient.createRoomLayer = _back;
                        postEvent("createRoom",{});
                        var key = "Zhujiemian_Jiarufangjian_Wodefangjian_Chuangjianfangjian";
                        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                            MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
                            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
                        {
                            key = "WodefangjianChuangjianClick";
                        }
                        MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid()});
                    }
                    else
                    {
                        MjClient.showMsg("房间已经创建,请直接加入房间。");
                    }
                    break;
                default :
                    break;
            }
        }, this);

        var _roomCell = _back.getChildByName("room_cell");
        _roomCell.visible = false;
        var _imgqx = _back.getChildByName("Image_qixing");
        if (_imgqx) {
            _imgqx.visible = true;
        }
        
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
            MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
        {
            _imgqx.visible = false;
        }

        var _listViewNode = _back.getChildByName("ListView_1");
        _listViewNode.removeAllItems();

        function createOneCell(oneRoomData)
        {
            cc.log("createOneCell oneRoomData = " + JSON.stringify(oneRoomData));

            var _copyNode = _roomCell.clone();
            _copyNode.visible = true;
            _copyNode.setTouchEnabled(true);
            _copyNode.addTouchEventListener(function (sender, Type)
            {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
						MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_Jiaoru", {uid:SelfUid()});
                        MjClient.joinGame(oneRoomData.tableid);
                        break;
                }
            });

            var _roomId = _copyNode.getChildByName("roomID");
            _roomId.setString(oneRoomData.tableid);
            _roomId.ignoreContentAdaptWithSize(true);
            var _leftTime = _copyNode.getChildByName("time");
            _leftTime.ignoreContentAdaptWithSize(true);
            _leftTime.setString("");
            var seconds = parseInt(oneRoomData.remainTime/1000);
            _leftTime.schedule(function(){
                if(oneRoomData.tableState == "ongoing")
                {
                    _leftTime.setString("正在游戏");
                }
                else
                {
                    seconds--;
                    var _minTime = parseInt(seconds/60);//转化为分钟
                    if(_minTime < 1)
                    {
                        _minTime  = 1;
                    }
                    _leftTime.setString(_minTime + "分钟");
                }
            }, 1);



            var _JinduText = _copyNode.getChildByName("Image_jindu").getChildByName("Text_4");
            _JinduText.setString(oneRoomData.playerCount+"/"+(oneRoomData.maxPlayerCount||4));
            _JinduText.ignoreContentAdaptWithSize(true);

            var _JinduBar = _copyNode.getChildByName("Image_jindu").getChildByName("LoadingBar_1");
            _JinduBar.setPercent(oneRoomData.playerCount/(oneRoomData.maxPlayerCount||4) * 100);

            var _textNode = _copyNode.getChildByName("Image_jindu")

            _textNode.setPositionY(_textNode.getPositionY() - 12);

            var _gameName = new ccui.Text();
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {//岳阳同一使用方正兰亭
                _gameName.setFontName("fonts/lanting.TTF");
            }
            _gameName.setFontSize(26);
            if(MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ){
                _gameName.setColor(cc.color(91,95,128));
            }
            else if (isJinZhongAPPType()) {
                _gameName.setColor(cc.color(66,94,112));
            }
            else {
                _gameName.setColor(cc.color(174,132,105));
            }
            _gameName.setString("");


            if(oneRoomData.gameType != -1)
            {
                if((MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                    MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
                    MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
                    MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                    MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) && 
                    oneRoomData.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG)
                {
                    _gameName.setString("六胡抢");

                }else if((MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                            MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
                            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
                            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) &&
                            oneRoomData.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA)
                {
                    _gameName.setString("十胡卡");

                }else{
                    _gameName.setString(GameCnName[oneRoomData.gameType]);
                }
                
                _gameName.setPosition(_JinduBar.getContentSize().width/2,_JinduBar.getContentSize().height/2 + 32);
                _textNode.addChild(_gameName);
            }


            var _invatButton = _copyNode.getChildByName("Button_12");
            if (MjClient.remoteCfg.guestLogin == true|| oneRoomData.playerCount == oneRoomData.maxPlayerCount)
            {
                _invatButton.setVisible(false);
                _invatButton.setTouchEnabled(false);
            }
            _invatButton.addTouchEventListener(function (sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        var _sumStr = getPlaySelectPara(oneRoomData.gameType,oneRoomData.areaSelectMode,oneRoomData.maxPlayerCount);
                        var num = ["零","一","二","三","四","五","六","七","八"];
                        var _roleCount = "  "+num[oneRoomData.maxPlayerCount]+"缺"+num[oneRoomData.maxPlayerCount-oneRoomData.playerCount];

                        _sumStr += (oneRoomData.areaSelectMode.isQuan == true) ? "2圈" : (oneRoomData.roundAll + "局");
                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP )
                        {
                            _sumStr += ",速度加入【"+AppCnName[MjClient.getAppType()]+"】";
                        }
                        else
                        {
                            _sumStr += ",点击立即加入牌局>>>";
                        }
                        var _urlStr = MjClient.remoteCfg.entreRoomUrl+"?vipTable="+oneRoomData.tableid;
                        var _titleStr = GameCnName[oneRoomData.gameType] + "  " + oneRoomData.tableid + _roleCount + "  点击加入>>>";
                        cc.log("邀请信息：" + _titleStr);
                        cc.log(_sumStr);
                        MjClient.getInviteUrl(function (_urlStr) {
                            if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb())
                            {
                                h5.weixinHelper.wxShareUrl(_urlStr, _titleStr, _sumStr);
                            }
                            else
                            {
                                MjClient.shareUrlToMultiPlatform(_urlStr, _titleStr, _sumStr);
                            }
                        }, oneRoomData.tableid);
                        var key = "Zhujiemian_Jiarufangjian_Wodefangjian_Yaoqing";
                        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                            MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || 
                            MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
                        {
                            key = "WodefangjianYaoqingClick";
                        }
                        MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid(), gameType:oneRoomData.gameType});
                        break;
                    default :
                        break;
                }
            }, this);

            return _copyNode;
        }


        function InitRoomsData(RoomDatas) {
            _listViewNode.removeAllItems();

            if (!cc.isUndefined(RoomDatas)) {
                for (var i = 0; i < RoomDatas.length; i++) {
                    if (RoomDatas[i].gameType != -1) {
                        _listViewNode.pushBackCustomItem(createOneCell(RoomDatas[i]));
                    }
                }
                if (_imgqx) {
                    if (RoomDatas.length <= 0) {
                        _imgqx.visible = true;
                    } else {
                        _imgqx.visible = false;
                    }
                }
            }

        }

        InitRoomsData(MjClient.createRoomDatas);

        //请求开房历史
        UIEventBind(null,this,"refreshMyTables",function(data) {
            cc.log("data_list = ");
            InitRoomsData(data);
        });

    },
    onExit:function()
    {
        this._super();
        MjClient.enterui = null;
        MjClient.createRoomLayer = null;
    },
});

// 新江苏换皮（江苏，徐州）
var EnterRoomLayer_lyg = cc.Layer.extend({
    sprite:null,
    jsBind:{
        back:
        {
            Image_1:
            {
                top:{
                    bg0:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                    bg1:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                    bg2:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                    bg3:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                    bg4:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                    bg5:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  }
                }
            }
        },
    },
    ctor:function () {
        this._super();
        var enterui = ccs.load(res.Enter_json);
        BindUiAndLogic(enterui.node,this.jsBind);
        this.addChild(enterui.node);
        MjClient.enterui=this;
        MjClient.entercode=[];

        /*
            changed by sking
        */
        var _block = enterui.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], 2);

        var _back = enterui.node.getChildByName("back");
        setWgtLayout(_back, [0.97, 0.97], [0.5, 0.5], [0, 0]);

        var _btnClose = _back.getChildByName("close");
        _btnClose.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.createRoomLayer = null;
                    this.removeFromParent();
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Close", {uid:SelfUid()});
                    break;
                default :
                    break;
            }
        }, this);

        // 选项卡
        var _Image_1 = _back.getChildByName("Image_1");
        _Image_1.setVisible(true);
        var _Image_2 = _back.getChildByName("Image_2");
        _Image_2.setVisible(false);

        var _joinRoom = _back.getChildByName("enterRoom_head");
        _joinRoom.enabled = false;
        var _myRoom = _back.getChildByName("myRoom_head");
        _myRoom.enabled = true;

        _joinRoom.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                _joinRoom.enabled = false;
                _myRoom.enabled = true;
                _Image_1.setVisible(true);
                _Image_2.setVisible(false);
            }
        }, this);

        _myRoom.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian", {uid: SelfUid()});
                _joinRoom.enabled = true;
                _myRoom.enabled = false;
                _Image_1.setVisible(false);
                _Image_2.setVisible(true);
            }
        }, this);

        //数字按键
        var _num = _back.getChildByName("Image_1").getChildByName("num");
        function numBtnTouchEvent(sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                var itag = sender.getTag();
                InputRoomNumber(itag);
            }
        }
        for (var i = 0; i <= 9; i++) {
            var _btnNum = _num.getChildByName("Button_" + i);
            _btnNum.setTag(i);
            _btnNum.addTouchEventListener(numBtnTouchEvent, this);
        }

        //清除所有
        var _clear =  _num.getChildByName("clear");
        _clear.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
					MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Qingkong", {uid: SelfUid()});
                    InputRoomNumber(-2);
                    break;
                default :
                    break;
            }
        }, this);

        //删除
        var _del =  _num.getChildByName("del");
        _del.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
					MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Shanchu", {uid: SelfUid()});
                    InputRoomNumber(-1);;
                    break;
                default :
                    break;
            }
        }, this);


        //我的房间
        this.InitMyRoom(_back);

        return true;
    },
    InitMyRoom:function(_back)
    {

        var _btnRoomHistory = _back.getChildByName("Image_2").getChildByName("Button_record");
        _btnRoomHistory.setTouchEnabled(true);
        _btnRoomHistory.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_Kaifangjilu", {uid:SelfUid()});
                    _back.setVisible(false);
                    MjClient.createRoomLayer = _back;
                    this.addChild(new createRoomRecordLayer());
                    break;
                default :
                    break;
            }
        }, this);

        var _btnCreateRoom = _back.getChildByName("Image_2").getChildByName("Button_10_0");
        _btnCreateRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (!MjClient.data.sData)
                    {
                        _back.setVisible(false);
                        MjClient.createRoomLayer = _back;
                        postEvent("createRoom",{});
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_Chuangjianfangjian", {uid:SelfUid()});
                    }
                    else
                    {
                        MjClient.showMsg("房间已经创建,请直接加入房间。");
                    }
                    break;
                default :
                    break;
            }
        }, this);

        var _roomCell = _back.getChildByName("Image_2").getChildByName("room_cell");
        _roomCell.visible = false;
        var _imgqx = _back.getChildByName("Image_2").getChildByName("Image_qixing");
        if (_imgqx) {
            _imgqx.visible = true;
        }
        
        var _textTip = _back.getChildByName("Image_2").getChildByName("Text_tip");
        var _title = _back.getChildByName("Image_2").getChildByName("title");
        var _listViewNode = _back.getChildByName("Image_2").getChildByName("ListView_1");
        _listViewNode.removeAllItems();

        function createOneCell(oneRoomData)
        {
            cc.log("createOneCell oneRoomData = " + JSON.stringify(oneRoomData));

            var _copyNode = _roomCell.clone();
            _copyNode.visible = true;
            _copyNode.setTouchEnabled(true);
            _copyNode.addTouchEventListener(function (sender, Type)
            {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
						MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_Jiaoru", {uid:SelfUid()});
                        MjClient.joinGame(oneRoomData.tableid);
                        break;
                }
            });

            var _roomId = _copyNode.getChildByName("roomID");
            _roomId.setString(oneRoomData.tableid);
            _roomId.ignoreContentAdaptWithSize(true);
            var _leftTime = _copyNode.getChildByName("time");
            _leftTime.ignoreContentAdaptWithSize(true);
            _leftTime.setString("");
            var seconds = parseInt(oneRoomData.remainTime/1000);
            _leftTime.schedule(function(){
                if(oneRoomData.tableState == "ongoing")
                {
                    _leftTime.setString("正在游戏");
                }
                else
                {
                    seconds--;
                    var _minTime = parseInt(seconds/60);//转化为分钟
                    if(_minTime < 1)
                    {
                        _minTime  = 1;
                    }
                    _leftTime.setString(_minTime + "分钟");
                }
            }, 1);



            var _JinduText = _copyNode.getChildByName("Image_jindu").getChildByName("Text_4");
            _JinduText.setString(oneRoomData.playerCount+"/"+(oneRoomData.maxPlayerCount||4));
            _JinduText.ignoreContentAdaptWithSize(true);

            var _JinduBar = _copyNode.getChildByName("Image_jindu").getChildByName("LoadingBar_1");
            _JinduBar.setPercent(oneRoomData.playerCount/(oneRoomData.maxPlayerCount||4) * 100);

            var _textNode = _copyNode.getChildByName("Image_jindu");

            _textNode.setPositionY(_textNode.getPositionY() - 12);

            var _gameName = new ccui.Text();
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {//岳阳同一使用方正兰亭
                _gameName.setFontName("fonts/lanting.TTF");
            }
            _gameName.setFontSize(26);
            _gameName.setColor(cc.color(174,132,105));
            if(MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ){
                _gameName.setColor(cc.color(91,95,128));
            }
            else if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
                _gameName.setColor(cc.color(114,39,19));
            }
            _gameName.setString("");


            if(oneRoomData.gameType != -1)
            {
                _gameName.setString(GameCnName[oneRoomData.gameType]);
                _gameName.setPosition(_JinduBar.getContentSize().width/2,_JinduBar.getContentSize().height/2 + 32);
                _textNode.addChild(_gameName);
            }


            var _invatButton = _copyNode.getChildByName("Button_12");
            if (MjClient.remoteCfg.guestLogin == true|| oneRoomData.playerCount == oneRoomData.maxPlayerCount)
            {
                _invatButton.setVisible(false);
                _invatButton.setTouchEnabled(false);
            }
            _invatButton.addTouchEventListener(function (sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        var _sumStr = getPlaySelectPara(oneRoomData.gameType,oneRoomData.areaSelectMode,oneRoomData.maxPlayerCount);
                        var num = ["零","一","二","三","四","五","六","七","八"];
                        var _roleCount = "  "+num[oneRoomData.maxPlayerCount]+"缺"+num[oneRoomData.maxPlayerCount-oneRoomData.playerCount];

                        _sumStr += (oneRoomData.areaSelectMode.isQuan == true) ? "2圈" : (oneRoomData.roundAll + "局");
                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP )
                        {
                            _sumStr += ",速度加入【"+AppCnName[MjClient.getAppType()]+"】";
                        }
                        else
                        {
                            _sumStr += ",点击立即加入牌局>>>";
                        }
                        var _urlStr = MjClient.remoteCfg.entreRoomUrl+"?vipTable="+oneRoomData.tableid;
                        var _titleStr = GameCnName[oneRoomData.gameType] + "  " + oneRoomData.tableid + _roleCount + "  点击加入>>>";
                        cc.log("邀请信息：" + _titleStr);
                        cc.log(_sumStr);
                        MjClient.getInviteUrl(function (_urlStr) {
                            if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb())
                            {
                                h5.weixinHelper.wxShareUrl(_urlStr, _titleStr, _sumStr);
                            }
                            else
                            {
                                MjClient.shareUrlToMultiPlatform(_urlStr, _titleStr, _sumStr);
                            }
                        }, oneRoomData.tableid);
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_Yaoqing", {uid:SelfUid(), gameType:oneRoomData.gameType});
                        break;
                    default :
                        break;
                }
            }, this);

            return _copyNode;
        }

        var isRoomData = false;
        function InitRoomsData(RoomDatas) {
            _listViewNode.removeAllItems();

            if (!cc.isUndefined(RoomDatas)) {
                for (var i = 0; i < RoomDatas.length; i++) {
                    if (RoomDatas[i].gameType != -1) {
                        _listViewNode.pushBackCustomItem(createOneCell(RoomDatas[i]));
                    }
                }
                if (_imgqx) {
                    if (RoomDatas.length <= 0) {
                        _imgqx.visible = true;
                        isRoomData = false;
                    } else {
                        _imgqx.visible = false;
                        isRoomData = true;
                    }
                }
            }

            if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
                _title.visible = isRoomData;
                _textTip.visible = isRoomData;
                _listViewNode.visible = isRoomData;
            }

        }

        InitRoomsData(MjClient.createRoomDatas);

        //请求开房历史
        UIEventBind(null,this,"refreshMyTables",function(data) {
            cc.log("data_list = ");
            InitRoomsData(data);
        });

    },
    onExit:function()
    {
        this._super();
        MjClient.enterui = null;
        MjClient.createRoomLayer = null;
    },
});

// 晋中换皮
var EnterRoomLayer_jinzhong = cc.Layer.extend({
    sprite:null,
    jsBind:{
        back:
        {
            top:{
                bg0:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                bg1:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                bg2:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                bg3:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                bg4:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                bg5:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  }
            }
        },
    },
    ctor:function () {
        this._super();
        var enterui = ccs.load(res.Enter_json);
        BindUiAndLogic(enterui.node,this.jsBind);
        this.addChild(enterui.node);
        MjClient.enterui=this;
        MjClient.entercode=[];

        var _block = enterui.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], 2);

        var _back = enterui.node.getChildByName("back");
        if (MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
            setWgtLayout(_back, [0.8, 0.8], [0.5, 0.5], [0, 0]);
        }
        else {
            setWgtLayout(_back, [0.97, 0.97], [0.5, 0.5], [0, 0]);
        }

        var _btnClose = _back.getChildByName("close");
        _btnClose.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.createRoomLayer = null;
                    this.removeFromParent();
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Close", {uid:SelfUid()});
                    break;
                default :
                    break;
            }
        }, this);

        //数字按键
        var _num = _back.getChildByName("num");
        function numBtnTouchEvent(sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                var itag = sender.getTag();
                InputRoomNumber(itag);
            }
        }
        for (var i = 0; i <= 9; i++) {
            var _btnNum = _num.getChildByName("Button_" + i);
            _btnNum.setTag(i);
            _btnNum.addTouchEventListener(numBtnTouchEvent, this);
        }

        //清除所有
        var _clear =  _num.getChildByName("clear");
        _clear.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Qingkong", {uid:SelfUid()});
                    InputRoomNumber(-2);
                    break;
                default :
                    break;
            }
        }, this);

        //删除
        var _del =  _num.getChildByName("del");
        _del.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Shanchu", {uid:SelfUid()});
                    InputRoomNumber(-1);;
                    break;
                default :
                    break;
            }
        }, this);

        var that = this;
        // 我的房间
        var _myRoomBtn =  _back.getChildByName("myRoomBtn");
        _myRoomBtn.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    //MjClient.showMsg("暂未开放!");
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian", {uid: SelfUid()});

                    var EnterMyRoomUi = ccs.load(res.Eenter_myRoom_json);
                    that.addChild(EnterMyRoomUi.node);
                    var _block = EnterMyRoomUi.node.getChildByName("block");
                    setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], 2);
                    var _back = EnterMyRoomUi.node.getChildByName("back");
                    if (MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
                        setWgtLayout(_back, [0.8, 0.8], [0.5, 0.5], [0, 0]);
                    }
                    else {
                        setWgtLayout(_back, [0.97, 0.97], [0.5, 0.5], [0, 0]);
                    }

                    var _btnClose = _back.getChildByName("close");
                    _btnClose.addTouchEventListener(function (sender, Type) {
                        switch (Type) {
                            case ccui.Widget.TOUCH_ENDED:
                                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_Close", {uid: SelfUid()});
                                EnterMyRoomUi.node.removeFromParent();
                                if (MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
                                    MjClient.createRoomLayer = null;
                                    this.removeFromParent();
                                }
                                break;
                            default :
                                break;
                        }
                    }, that);

                    var _btnJoinRoom = _back.getChildByName("BtnJoinRoom");
                    if (_btnJoinRoom) {
                        _btnJoinRoom.addTouchEventListener(function (sender, Type) {
                            switch (Type) {
                                case ccui.Widget.TOUCH_ENDED:
                                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_Close", {uid: SelfUid()});
                                    EnterMyRoomUi.node.removeFromParent();
                                    break;
                                default :
                                    break;
                            }
                        }, that);
                    }

                    that.InitMyRoom(_back);
                    break;
                default:
                    break;
            }
        }, this);


        //我的房间
        // this.InitMyRoom(_back);

        return true;
    },
    InitMyRoom:function(_back)
    {

        var _btnRoomHistory = _back.getChildByName("Button_record");
        _btnRoomHistory.setTouchEnabled(true);
        _btnRoomHistory.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_Kaifangjilu", {uid:SelfUid()});
                    _back.setVisible(false);
                    MjClient.createRoomLayer = _back;
                    this.addChild(new createRoomRecordLayer());
                    break;
                default :
                    break;
            }
        }, this);

        var _btnCreateRoom = _back.getChildByName("Button_10_0");
        _btnCreateRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_Chuangjianfangjian", {uid:SelfUid()});
                    if (!MjClient.data.sData)
                    {
                        _back.setVisible(false);
                        MjClient.createRoomLayer = _back;
                        postEvent("createRoom",{});
                    }
                    else
                    {
                        MjClient.showMsg("房间已经创建,请直接加入房间。");
                    }
                    break;
                default :
                    break;
            }
        }, this);

        var _roomCell = _back.getChildByName("room_cell");
        _roomCell.visible = false;
        var _imgqx = _back.getChildByName("Image_qixing");
        if (_imgqx) {
            _imgqx.visible = true;
        }

        if (isJinZhongAPPType()) {
            var _nullRecord1 = _back.getChildByName("Image_6");
            _nullRecord1.visible = false;
            var _nullRecord2 = _back.getChildByName("Text_1");
            _nullRecord2.visible = false;
        }
        
        var _listViewNode = _back.getChildByName("ListView_1");
        _listViewNode.removeAllItems();

        function createOneCell(oneRoomData)
        {
            cc.log("createOneCell oneRoomData = " + JSON.stringify(oneRoomData));

            var _copyNode = _roomCell.clone();
            _copyNode.visible = true;
            _copyNode.setTouchEnabled(true);
            _copyNode.addTouchEventListener(function (sender, Type)
            {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_Jiaoru", {uid:SelfUid()});
                        MjClient.joinGame(oneRoomData.tableid);
                        break;
                }
            });

            var _roomId = _copyNode.getChildByName("roomID");
            _roomId.setString(oneRoomData.tableid);
            _roomId.ignoreContentAdaptWithSize(true);
            var _leftTime = _copyNode.getChildByName("time");
            _leftTime.ignoreContentAdaptWithSize(true);
            _leftTime.setString("");
            var seconds = parseInt(oneRoomData.remainTime/1000);
            _leftTime.schedule(function(){
                if(oneRoomData.tableState == "ongoing")
                {
                    _leftTime.setString("正在游戏");
                }
                else
                {
                    seconds--;
                    var _minTime = parseInt(seconds/60);//转化为分钟
                    if(_minTime < 1)
                    {
                        _minTime  = 1;
                    }
                    _leftTime.setString(_minTime + "分钟");
                }
            }, 1);



            var _JinduText = _copyNode.getChildByName("Image_jindu").getChildByName("Text_4");
            _JinduText.setString(oneRoomData.playerCount+"/"+(oneRoomData.maxPlayerCount||4));
            _JinduText.ignoreContentAdaptWithSize(true);

            var _JinduBar = _copyNode.getChildByName("Image_jindu").getChildByName("LoadingBar_1");
            _JinduBar.setPercent(oneRoomData.playerCount/(oneRoomData.maxPlayerCount||4) * 100);

            var _textNode = _copyNode.getChildByName("Image_jindu")

            _textNode.setPositionY(_textNode.getPositionY() - 12);

            var _gameName = new ccui.Text();
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {//岳阳同一使用方正兰亭
                _gameName.setFontName("fonts/lanting.TTF");
            }
            _gameName.setFontSize(26);
            if (isJinZhongAPPType()) {
                _gameName.setColor(cc.color(66,94,112));
            }
            else {
                _gameName.setColor(cc.color(174,132,105));
            }
            _gameName.setString("");


            if(oneRoomData.gameType != -1)
            {
                _gameName.setString(GameCnName[oneRoomData.gameType]);
                _gameName.setPosition(_JinduBar.getContentSize().width/2,_JinduBar.getContentSize().height/2 + 32);
                _textNode.addChild(_gameName);
            }


            var _invatButton = _copyNode.getChildByName("Button_12");
            if (MjClient.remoteCfg.guestLogin == true|| oneRoomData.playerCount == oneRoomData.maxPlayerCount)
            {
                _invatButton.setVisible(false);
                _invatButton.setTouchEnabled(false);
            }
            _invatButton.addTouchEventListener(function (sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        var _sumStr = getPlaySelectPara(oneRoomData.gameType,oneRoomData.areaSelectMode,oneRoomData.maxPlayerCount);
                        var num = ["零","一","二","三","四","五","六","七","八"];
                        var _roleCount = "  "+num[oneRoomData.maxPlayerCount]+"缺"+num[oneRoomData.maxPlayerCount-oneRoomData.playerCount];

                        _sumStr += (oneRoomData.areaSelectMode.isQuan == true) ? "2圈" : (oneRoomData.roundAll + "局");
                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP )
                        {
                            _sumStr += ",速度加入【"+AppCnName[MjClient.getAppType()]+"】";
                        }
                        else
                        {
                            _sumStr += ",点击立即加入牌局>>>";
                        }
                        var _urlStr = MjClient.remoteCfg.entreRoomUrl+"?vipTable="+oneRoomData.tableid;
                        var _titleStr = GameCnName[oneRoomData.gameType] + "  " + oneRoomData.tableid + _roleCount + "  点击加入>>>";
                        cc.log("邀请信息：" + _titleStr);
                        cc.log(_sumStr);
                        MjClient.getInviteUrl(function (_urlStr) {
                            if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb())
                            {
                                h5.weixinHelper.wxShareUrl(_urlStr, _titleStr, _sumStr);
                            }
                            else
                            {
                                MjClient.shareUrlToMultiPlatform(_urlStr, _titleStr, _sumStr);
                            }
                        }, oneRoomData.tableid);

                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_Yaoqing", {uid:SelfUid(), gameType:oneRoomData.gameType});
                        break;
                    default :
                        break;
                }
            }, this);

            return _copyNode;
        }


        function InitRoomsData(RoomDatas) {
            if(!sys.isObjectValid(_listViewNode)) return;
            _listViewNode.removeAllItems();

            if (!cc.isUndefined(RoomDatas)) {
                for (var i = 0; i < RoomDatas.length; i++) {
                    if (RoomDatas[i].gameType != -1) {
                        _listViewNode.pushBackCustomItem(createOneCell(RoomDatas[i]));
                    }
                }
                if (_imgqx) {
                    if (RoomDatas.length <= 0) {
                        _imgqx.visible = true;
                        if (isJinZhongAPPType()) {
                            _nullRecord1.visible = false;
                            _nullRecord2.visible = false;
                        }
                    } else {
                        _imgqx.visible = false;
                        if (isJinZhongAPPType()) {
                            _nullRecord1.visible = true;
                            _nullRecord2.visible = true;
                        }
                    }
                }
            }

        }

        InitRoomsData(MjClient.createRoomDatas);

        //请求开房历史
        UIEventBind(null,this,"refreshMyTables",function(data) {
            cc.log("data_list = ");
            InitRoomsData(data);
        });

    },
    onExit:function()
    {
        this._super();
        MjClient.enterui = null;
        MjClient.createRoomLayer = null;
    },
});

// 岳阳换皮
var EnterRoomLayer_QXYYQP = cc.Layer.extend({
    sprite:null,
    jsBind:{
        back:
        {
            joinRoom:
            {
                top:{
                    bg0:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                    bg1:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                    bg2:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                    bg3:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                    bg4:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                    bg5:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  }
                }
            },
        },
    },
    ctor:function () {
        this._super();
        var enterui = ccs.load(res.Enter_json);
        BindUiAndLogic(enterui.node,this.jsBind);
        this.addChild(enterui.node);
        MjClient.enterui=this;
        MjClient.entercode=[];

        /*
            changed by sking
        */
        var _block = enterui.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], 2);

        var _back = enterui.node.getChildByName("back");
        setWgtLayout(_back, [0.97, 0.97], [0.5, 0.5], [0, 0]);

        var _suizi = _back.getChildByName("suizi");
        //穗子动画
        if(_suizi) 
            COMMON_UI.suiziAni(_suizi,8);
        else
            COMMON_UI.popDialogAni(_back);

        var _btnClose = _back.getChildByName("close");
        _btnClose.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.createRoomLayer = null;
                    this.removeFromParent();
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Close", {uid:SelfUid()});
                    break;
                default :
                    break;
            }
        }, this);

        // 选项卡
        var _joinRoom = _back.getChildByName("joinRoom");
        _joinRoom.setVisible(true);
        var _myRoom = _back.getChildByName("myRoom");
        _myRoom.setVisible(false);

        var _joinRoomBtn = _back.getChildByName("joinRoom_btn");
        var _myRoomBtn = _back.getChildByName("myRoom_btn");

        var _btnBG1 = _back.getChildByName("btn_BG1");
        _btnBG1.setVisible(true);
        var _btnBG2 = _back.getChildByName("btn_BG2");
        _btnBG2.setVisible(false);

        if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ
            || MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
            _btnBG1.setVisible(false);
            _btnBG2.setVisible(false);
            _joinRoomBtn.setEnabled(false);
            _myRoomBtn.setEnabled(true);
        }

       _joinRoomBtn.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                _joinRoom.setVisible(true);
                _myRoom.setVisible(false);
                if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ
                    || MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
                    _btnBG1.setVisible(false);
                    _btnBG2.setVisible(false);
                    _joinRoomBtn.setEnabled(false);
                    _myRoomBtn.setEnabled(true);
                }
                else {
                    _btnBG1.setVisible(true);
                    _btnBG2.setVisible(false);
                }
            }
        }, this);

        _myRoomBtn.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian", {uid: SelfUid()});
                _joinRoom.setVisible(false);
                _myRoom.setVisible(true);
                if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ
                    || MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
                    _btnBG1.setVisible(false);
                    _btnBG2.setVisible(false);
                    _joinRoomBtn.setEnabled(true);
                    _myRoomBtn.setEnabled(false);
                }
                else {
                    _btnBG1.setVisible(false);
                    _btnBG2.setVisible(true);
                }
            }
        }, this);

        //数字按键
        var _num = _joinRoom.getChildByName("num");
        function numBtnTouchEvent(sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                var itag = sender.getTag();
                InputRoomNumber(itag);
            }
        }
        for (var i = 0; i <= 9; i++) {
            var _btnNum = _num.getChildByName("Button_" + i);
            _btnNum.setTag(i);
            _btnNum.addTouchEventListener(numBtnTouchEvent, this);
        }

        //清除所有
        var _clear =  _num.getChildByName("clear");
        _clear.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
					MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Qingkong", {uid: SelfUid()});
                    InputRoomNumber(-2);
                    break;
                default :
                    break;
            }
        }, this);

        //删除
        var _del =  _num.getChildByName("del");
        _del.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
					MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Shanchu", {uid: SelfUid()});
                    InputRoomNumber(-1);;
                    break;
                default :
                    break;
            }
        }, this);


        //我的房间
        this.InitMyRoom(_back);

        return true;
    },
    InitMyRoom:function(_back)
    {
        var _myRoomBG = _back.getChildByName("myRoom");
        var _btnRoomHistory = _myRoomBG.getChildByName("Button_record");
        _btnRoomHistory.setTouchEnabled(true);
        _btnRoomHistory.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_Kaifangjilu", {uid:SelfUid()});
                    _back.setVisible(false);
                    MjClient.createRoomLayer = _back;
                    if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
                        this.addChild(new createRoomRecordLayer_v3());
                    else
                        this.addChild(new createRoomRecordLayer());
                    break;
                default :
                    break;
            }
        }, this);

        var _btnCreateRoom = _myRoomBG.getChildByName("Button_10_0");
        _btnCreateRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (!MjClient.data.sData)
                    {
                        _back.setVisible(false);
                        MjClient.createRoomLayer = _back;
                        postEvent("createRoom",{});
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_Chuangjianfangjian", {uid:SelfUid()});
                    }
                    else
                    {
                        MjClient.showMsg("房间已经创建,请直接加入房间。");
                    }
                    break;
                default :
                    break;
            }
        }, this);

        var _roomCell = _back.getChildByName("room_cell");
        _roomCell.visible = false;
        var _imgqx = _myRoomBG.getChildByName("Image_qixing");
        if (_imgqx) {
            _imgqx.visible = true;
        }
        
        var _listViewNode = _myRoomBG.getChildByName("ListView_1");
        _listViewNode.removeAllItems();

        function createOneCell(oneRoomData)
        {
            cc.log("createOneCell oneRoomData = " + JSON.stringify(oneRoomData));

            var _copyNode = _roomCell.clone();
            _copyNode.visible = true;
            _copyNode.setTouchEnabled(true);
            _copyNode.addTouchEventListener(function (sender, Type)
            {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
						MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_Jiaoru", {uid:SelfUid()});
                        MjClient.joinGame(oneRoomData.tableid);
                        break;
                }
            });

            var _roomId = _copyNode.getChildByName("roomID");
            _roomId.setString(oneRoomData.tableid);
            _roomId.ignoreContentAdaptWithSize(true);
            var _leftTime = _copyNode.getChildByName("time");
            _leftTime.ignoreContentAdaptWithSize(true);
            _leftTime.setString("");
            var seconds = parseInt(oneRoomData.remainTime/1000);
            _leftTime.schedule(function(){
                if(oneRoomData.tableState == "ongoing")
                {
                    _leftTime.setString("正在游戏");
                }
                else
                {
                    seconds--;
                    var _minTime = parseInt(seconds/60);//转化为分钟
                    if(_minTime < 1)
                    {
                        _minTime  = 1;
                    }
                    _leftTime.setString(_minTime + "分钟");
                }
            }, 1);



            var _JinduText = _copyNode.getChildByName("Image_jindu").getChildByName("Text_4");
            _JinduText.setString(oneRoomData.playerCount+"/"+(oneRoomData.maxPlayerCount||4));
            _JinduText.ignoreContentAdaptWithSize(true);

            var _JinduBar = _copyNode.getChildByName("Image_jindu").getChildByName("LoadingBar_1");
            _JinduBar.setPercent(oneRoomData.playerCount/(oneRoomData.maxPlayerCount||4) * 100);

            var _textNode = _copyNode.getChildByName("Image_jindu")

            _textNode.setPositionY(_textNode.getPositionY() - 12);

            var _gameName = new ccui.Text();
            _gameName.setFontName("fonts/lanting.TTF");
            _gameName.setFontSize(26);
            if(MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ){
                _gameName.setColor(cc.color(91,95,128));
            }
            else if (isJinZhongAPPType()) {
                _gameName.setColor(cc.color(66,94,112));
            }
            else if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                _gameName.setColor(cc.color("#774E39"));
            }
            else {
                _gameName.setColor(cc.color(174,132,105));
            }
            _gameName.setString("");


            if(oneRoomData.gameType != -1)
            {
                _gameName.setString(GameCnName[oneRoomData.gameType]);
                _gameName.setPosition(_JinduBar.getContentSize().width/2,_JinduBar.getContentSize().height/2 + 32);
                _textNode.addChild(_gameName);
            }


            var _invatButton = _copyNode.getChildByName("Button_12");
            if (MjClient.remoteCfg.guestLogin == true|| oneRoomData.playerCount == oneRoomData.maxPlayerCount)
            {
                _invatButton.setVisible(false);
                _invatButton.setTouchEnabled(false);
            }
            _invatButton.addTouchEventListener(function (sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        var _sumStr = getPlaySelectPara(oneRoomData.gameType,oneRoomData.areaSelectMode,oneRoomData.maxPlayerCount);
                        var num = ["零","一","二","三","四","五","六","七","八"];
                        var _roleCount = "  "+num[oneRoomData.maxPlayerCount]+"缺"+num[oneRoomData.maxPlayerCount-oneRoomData.playerCount];

                        _sumStr += (oneRoomData.areaSelectMode.isQuan == true) ? "2圈" : (oneRoomData.roundAll + "局");
                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP )
                        {
                            _sumStr += ",速度加入【"+AppCnName[MjClient.getAppType()]+"】";
                        }
                        else
                        {
                            _sumStr += ",点击立即加入牌局>>>";
                        }
                        var _urlStr = MjClient.remoteCfg.entreRoomUrl+"?vipTable="+oneRoomData.tableid;
                        var _titleStr = GameCnName[oneRoomData.gameType] + "  " + oneRoomData.tableid + _roleCount + "  点击加入>>>";
                        cc.log("邀请信息：" + _titleStr);
                        cc.log(_sumStr);
                        MjClient.getInviteUrl(function (_urlStr) {
                            if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb())
                            {
                                h5.weixinHelper.wxShareUrl(_urlStr, _titleStr, _sumStr);
                            }
                            else
                            {
                                MjClient.shareUrlToMultiPlatform(_urlStr, _titleStr, _sumStr);
                            }
                        }, oneRoomData.tableid);

                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_Yaoqing", {uid:SelfUid(), gameType:oneRoomData.gameType});
                        break;
                    default :
                        break;
                }
            }, this);

            return _copyNode;
        }


        function InitRoomsData(RoomDatas) {
            _listViewNode.removeAllItems();

            if (!cc.isUndefined(RoomDatas)) {
                for (var i = 0; i < RoomDatas.length; i++) {
                    if (RoomDatas[i].gameType != -1) {
                        _listViewNode.pushBackCustomItem(createOneCell(RoomDatas[i]));
                    }
                }
                if (_imgqx) {
                    if (RoomDatas.length <= 0) {
                        _imgqx.visible = true;
                    } else {
                        _imgqx.visible = false;
                    }
                }
            }

        }

        InitRoomsData(MjClient.createRoomDatas);

        //请求开房历史
        UIEventBind(null,this,"refreshMyTables",function(data) {
            cc.log("data_list = ");
            InitRoomsData(data);
        });

    },
    onExit:function()
    {
        this._super();
        MjClient.enterui = null;
        MjClient.createRoomLayer = null;
    },
});

// 永州换皮
var EnterRoomLayer_yongzhou = cc.Layer.extend({
    sprite:null,
    jsBind:{
        back:
        {
            top:{
                bg0:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                bg1:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                bg2:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                bg3:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                bg4:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                bg5:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  }
            }
        },
    },
    ctor:function () {
        this._super();
        var enterui = ccs.load("enter.json");
        BindUiAndLogic(enterui.node,this.jsBind);
        this.addChild(enterui.node);
        MjClient.enterui=this;
        MjClient.entercode=[];

        var _block = enterui.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], 2);

        var _back = enterui.node.getChildByName("back");
        setWgtLayout(_back, [0.97, 0.97], [0.5, 0.5], [0, 0]);

        var _btnClose = _back.getChildByName("close");
        _btnClose.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.createRoomLayer = null;
                    this.removeFromParent();
                    MjClient.native.umengEvent4CountWithProperty("WodefangjianGuanbiClick", {uid:SelfUid()});
                    break;
                default :
                    break;
            }
        }, this);

        //数字按键
        var _num = _back.getChildByName("num");
        function numBtnTouchEvent(sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                var itag = sender.getTag();
                InputRoomNumber(itag);
            }
        }
        for (var i = 0; i <= 9; i++) {
            var _btnNum = _num.getChildByName("Button_" + i);
            _btnNum.setTag(i);
            _btnNum.addTouchEventListener(numBtnTouchEvent, this);
        }

        //清除所有
        var _clear =  _num.getChildByName("clear");
        _clear.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    InputRoomNumber(-2);
                    break;
                default :
                    break;
            }
        }, this);

        //删除
        var _del =  _num.getChildByName("del");
        _del.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    InputRoomNumber(-1);;
                    break;
                default :
                    break;
            }
        }, this);

        var that = this;
        // 我的房间
        var _myRoomBtn =  _back.getChildByName("myRoomBtn");
        _myRoomBtn.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    //MjClient.showMsg("暂未开放!");
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian", {uid: SelfUid()});
                    var EnterMyRoomUi = ccs.load("enter_myRoom.json");
                    that.addChild(EnterMyRoomUi.node);
                    var _block = EnterMyRoomUi.node.getChildByName("block");
                    setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], 2);
                    var _back = EnterMyRoomUi.node.getChildByName("back");
                    setWgtLayout(_back, [0.97, 0.97], [0.5, 0.5], [0, 0]);

                    var _btnClose = _back.getChildByName("close");
                    _btnClose.addTouchEventListener(function (sender, Type) {
                        switch (Type) {
                            case ccui.Widget.TOUCH_ENDED:
                                EnterMyRoomUi.node.removeFromParent();
                                break;
                            default :
                                break;
                        }
                    }, that);

                    that.InitMyRoom(_back);
                    break;
                default:
                    break;
            }
        }, this);


        //我的房间
        // this.InitMyRoom(_back);

        return true;
    },
    InitMyRoom:function(_back)
    {

        var _btnRoomHistory = _back.getChildByName("Button_record");
        _btnRoomHistory.setTouchEnabled(true);
        _btnRoomHistory.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_kaifangjili", {uid:SelfUid()});
                    _back.setVisible(false);
                    MjClient.createRoomLayer = _back;
                    this.addChild(new createRoomRecordLayer());
                    break;
                default :
                    break;
            }
        }, this);

        var _btnCreateRoom = _back.getChildByName("Button_10_0");
        _btnCreateRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (!MjClient.data.sData)
                    {
                        _back.setVisible(false);
                        MjClient.createRoomLayer = _back;
                        postEvent("createRoom",{});
                        MjClient.native.umengEvent4CountWithProperty("WodefangjianChuangjianClick", {uid:SelfUid()});
                    }
                    else
                    {
                        MjClient.showMsg("房间已经创建,请直接加入房间。");
                    }
                    break;
                default :
                    break;
            }
        }, this);

        var _roomCell = _back.getChildByName("room_cell");
        _roomCell.visible = false;
        var _imgqx = _back.getChildByName("Image_qixing");
        if (_imgqx) {
            _imgqx.visible = true;
        }

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ) {
            var _nullRecord1 = _back.getChildByName("Image_6");
            _nullRecord1.visible = false;
            var _nullRecord2 = _back.getChildByName("Text_1");
            _nullRecord2.visible = false;
        }
        
        var _listViewNode = _back.getChildByName("ListView_1");
        _listViewNode.removeAllItems();

        function createOneCell(oneRoomData)
        {
            cc.log("createOneCell oneRoomData = " + JSON.stringify(oneRoomData));

            var _copyNode = _roomCell.clone();
            _copyNode.visible = true;
            _copyNode.setTouchEnabled(true);
            _copyNode.addTouchEventListener(function (sender, Type)
            {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        MjClient.joinGame(oneRoomData.tableid);
                        break;
                }
            });

            var _roomId = _copyNode.getChildByName("roomID");
            _roomId.setString(oneRoomData.tableid);
            _roomId.ignoreContentAdaptWithSize(true);
            var _leftTime = _copyNode.getChildByName("time");
            _leftTime.ignoreContentAdaptWithSize(true);
            _leftTime.setString("");
            var seconds = parseInt(oneRoomData.remainTime/1000);
            _leftTime.schedule(function(){
                if(oneRoomData.tableState == "ongoing")
                {
                    _leftTime.setString("正在游戏");
                }
                else
                {
                    seconds--;
                    var _minTime = parseInt(seconds/60);//转化为分钟
                    if(_minTime < 1)
                    {
                        _minTime  = 1;
                    }
                    _leftTime.setString(_minTime + "分钟");
                }
            }, 1);



            var _JinduText = _copyNode.getChildByName("Image_jindu").getChildByName("Text_4");
            _JinduText.setString(oneRoomData.playerCount+"/"+(oneRoomData.maxPlayerCount||4));
            _JinduText.ignoreContentAdaptWithSize(true);

            var _JinduBar = _copyNode.getChildByName("Image_jindu").getChildByName("LoadingBar_1");
            _JinduBar.setPercent(oneRoomData.playerCount/(oneRoomData.maxPlayerCount||4) * 100);

            var _textNode = _copyNode.getChildByName("Image_jindu")

            _textNode.setPositionY(_textNode.getPositionY() - 12);

            var _gameName = new ccui.Text();
            _gameName.setFontSize(26);
            if (MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ) {
                _gameName.setColor(cc.color(66,94,112));
            }
            else {
                _gameName.setColor(cc.color(174,132,105));
            }
            _gameName.setString("");


            if(oneRoomData.gameType != -1)
            {
                _gameName.setString(GameCnName[oneRoomData.gameType]);
                _gameName.setPosition(_JinduBar.getContentSize().width/2,_JinduBar.getContentSize().height/2 + 32);
                _textNode.addChild(_gameName);
            }


            var _invatButton = _copyNode.getChildByName("Button_12");
            if (MjClient.remoteCfg.guestLogin == true|| oneRoomData.playerCount == oneRoomData.maxPlayerCount)
            {
                _invatButton.setVisible(false);
                _invatButton.setTouchEnabled(false);
            }
            _invatButton.addTouchEventListener(function (sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        var _sumStr = getPlaySelectPara(oneRoomData.gameType,oneRoomData.areaSelectMode,oneRoomData.maxPlayerCount);
                        var num = ["零","一","二","三","四","五","六","七","八"];
                        var _roleCount = "  "+num[oneRoomData.maxPlayerCount]+"缺"+num[oneRoomData.maxPlayerCount-oneRoomData.playerCount];

                        _sumStr += (oneRoomData.areaSelectMode.isQuan == true) ? "2圈" : (oneRoomData.roundAll + "局");
                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP )
                        {
                            _sumStr += ",速度加入【"+AppCnName[MjClient.getAppType()]+"】";
                        }
                        else
                        {
                            _sumStr += ",点击立即加入牌局>>>";
                        }
                        var _urlStr = MjClient.remoteCfg.entreRoomUrl+"?vipTable="+oneRoomData.tableid;
                        var _titleStr = GameCnName[oneRoomData.gameType] + "  " + oneRoomData.tableid + _roleCount + "  点击加入>>>";
                        cc.log("邀请信息：" + _titleStr);
                        cc.log(_sumStr);
                        MjClient.getInviteUrl(function (_urlStr) {
                            if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb())
                            {
                                h5.weixinHelper.wxShareUrl(_urlStr, _titleStr, _sumStr);
                            }
                            else
                            {
                                MjClient.shareUrlToMultiPlatform(_urlStr, _titleStr, _sumStr);
                            }
                        }, oneRoomData.tableid);

                        MjClient.native.umengEvent4CountWithProperty("WodefangjianYaoqingClick", {uid:SelfUid(), gameType:oneRoomData.gameType});
                        break;
                    default :
                        break;
                }
            }, this);

            return _copyNode;
        }


        function InitRoomsData(RoomDatas) {
            _listViewNode.removeAllItems();

            if (!cc.isUndefined(RoomDatas)) {
                for (var i = 0; i < RoomDatas.length; i++) {
                    if (RoomDatas[i].gameType != -1) {
                        _listViewNode.pushBackCustomItem(createOneCell(RoomDatas[i]));
                    }
                }
                if (_imgqx) {
                    if (RoomDatas.length <= 0) {
                        _imgqx.visible = true;
                        if (MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ) {
                            _nullRecord1.visible = false;
                            _nullRecord2.visible = false;
                        }
                    } else {
                        _imgqx.visible = false;
                        if (MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ) {
                            _nullRecord1.visible = true;
                            _nullRecord2.visible = true;
                        }
                    }
                }
            }

        }

        InitRoomsData(MjClient.createRoomDatas);

        //请求开房历史
        UIEventBind(null,this,"refreshMyTables",function(data) {
            cc.log("data_list = ");
            InitRoomsData(data);
        });

    },
    onExit:function()
    {
        this._super();
        MjClient.enterui = null;
        MjClient.createRoomLayer = null;
    },
});

// 邵阳换皮
var EnterRoomLayer_sy = cc.Layer.extend({
    sprite:null,
    jsBind:{
        back:
        {
            joinRoom:
            {
                top:{
                    bg0:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                    bg1:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                    bg2:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                    bg3:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                    bg4:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                    bg5:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  }
                }
            },
        },
    },
    ctor:function () {
        this._super();

        // 如果是回放本页面不打开 
        if(MjClient.rePlayVideo >= 0 && MjClient.replayui &&
            (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType())){
            MjClient.replayui.replayEnd();
            this.removeFromParent();  
            return true; // 回放不显示加入房间界面
        } 

        var enterui = ccs.load("enter.json");
        BindUiAndLogic(enterui.node,this.jsBind);
        this.addChild(enterui.node);
        MjClient.enterui=this;
        MjClient.entercode=[];

        /*
            changed by sking
        */
        var _block = enterui.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], 2);

        var _back = enterui.node.getChildByName("back");
        setWgtLayout(_back, [0.97, 0.97], [0.5, 0.5], [0, 0]);
        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG)
        {
            setWgtLayout(_back, [0.8, 0.8], [0.5, 0.5], [0, 0]);
        }

        var _suizi = _back.getChildByName("suizi");
        //穗子动画
        if(_suizi) 
            COMMON_UI.suiziAni(_suizi,8);
        else
            COMMON_UI.popDialogAni(_back);

        var _btnClose = _back.getChildByName("close");
        _btnClose.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.createRoomLayer = null;
                    this.removeFromParent();
                    MjClient.native.umengEvent4CountWithProperty("WodefangjianGuanbiClick", {uid:SelfUid()});
                    break;
                default :
                    break;
            }
        }, this);

        // 选项卡
        var _joinRoom = _back.getChildByName("joinRoom");
        _joinRoom.setVisible(true);
        var _myRoom = _back.getChildByName("myRoom");
        _myRoom.setVisible(false);

        var _joinRoomBtn = _back.getChildByName("joinRoom_btn");
        var _myRoomBtn = _back.getChildByName("myRoom_btn");

        var _btnBG1 = _back.getChildByName("btn_BG1");
        _btnBG1.setVisible(true);
        var _btnBG2 = _back.getChildByName("btn_BG2");
        _btnBG2.setVisible(false);

        _joinRoomBtn.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                _btnBG1.setVisible(true);
                _btnBG2.setVisible(false);
                _joinRoom.setVisible(true);
                _myRoom.setVisible(false);
            }
        }, this);

        _myRoomBtn.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian", {uid: SelfUid()});
                _btnBG1.setVisible(false);
                _btnBG2.setVisible(true);
                _joinRoom.setVisible(false);
                _myRoom.setVisible(true);
            }
        }, this);

        //数字按键
        var _num = _joinRoom.getChildByName("num");
        function numBtnTouchEvent(sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                var itag = sender.getTag();
                InputRoomNumber(itag);
            }
        }
        for (var i = 0; i <= 9; i++) {
            var _btnNum = _num.getChildByName("Button_" + i);
            _btnNum.setTag(i);
            _btnNum.addTouchEventListener(numBtnTouchEvent, this);
        }

        //清除所有
        var _clear =  _num.getChildByName("clear");
        _clear.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    InputRoomNumber(-2);
                    break;
                default :
                    break;
            }
        }, this);

        //删除
        var _del =  _num.getChildByName("del");
        _del.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    InputRoomNumber(-1);;
                    break;
                default :
                    break;
            }
        }, this);


        //我的房间
        this.InitMyRoom(_back);

        return true;
    },
    InitMyRoom:function(_back)
    {
        var _myRoomBG = _back.getChildByName("myRoom");
        var _btnRoomHistory = _myRoomBG.getChildByName("Button_record");
        _btnRoomHistory.setTouchEnabled(true);
        _btnRoomHistory.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_kaifangjili", {uid:SelfUid()});
                    _back.setVisible(false);
                    MjClient.createRoomLayer = _back;
                    this.addChild(new createRoomRecordLayer());
                    break;
                default :
                    break;
            }
        }, this);

        var _btnCreateRoom = _myRoomBG.getChildByName("Button_10_0");
        _btnCreateRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (!MjClient.data.sData)
                    {
                        _back.setVisible(false);
                        MjClient.createRoomLayer = _back;
                        postEvent("createRoom",{});
                        MjClient.native.umengEvent4CountWithProperty("WodefangjianChuangjianClick", {uid:SelfUid()});
                    }
                    else
                    {
                        MjClient.showMsg("房间已经创建,请直接加入房间。");
                    }
                    break;
                default :
                    break;
            }
        }, this);

        var _roomCell = _back.getChildByName("room_cell");
        _roomCell.visible = false;
        var _imgqx = _myRoomBG.getChildByName("Image_qixing");
        if (_imgqx) {
            _imgqx.visible = true;
        }
        
        var _listViewNode = _myRoomBG.getChildByName("ListView_1");
        _listViewNode.removeAllItems();

        function createOneCell(oneRoomData)
        {
            cc.log("createOneCell oneRoomData = " + JSON.stringify(oneRoomData));

            var _copyNode = _roomCell.clone();
            _copyNode.visible = true;
            _copyNode.setTouchEnabled(true);
            _copyNode.addTouchEventListener(function (sender, Type)
            {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        MjClient.joinGame(oneRoomData.tableid);
                        break;
                }
            });

            var _roomId = _copyNode.getChildByName("roomID");
            _roomId.setString(oneRoomData.tableid);
            _roomId.ignoreContentAdaptWithSize(true);
            var _leftTime = _copyNode.getChildByName("time");
            _leftTime.ignoreContentAdaptWithSize(true);
            _leftTime.setString("");
            var seconds = parseInt(oneRoomData.remainTime/1000);
            _leftTime.schedule(function(){
                if(oneRoomData.tableState == "ongoing")
                {
                    _leftTime.setString("正在游戏");
                }
                else
                {
                    seconds--;
                    var _minTime = parseInt(seconds/60);//转化为分钟
                    if(_minTime < 1)
                    {
                        _minTime  = 1;
                    }
                    _leftTime.setString(_minTime + "分钟");
                }
            }, 1);



            var _JinduText = _copyNode.getChildByName("Image_jindu").getChildByName("Text_4");
            _JinduText.setString(oneRoomData.playerCount+"/"+(oneRoomData.maxPlayerCount||4));
            _JinduText.ignoreContentAdaptWithSize(true);

            var _JinduBar = _copyNode.getChildByName("Image_jindu").getChildByName("LoadingBar_1");
            _JinduBar.setPercent(oneRoomData.playerCount/(oneRoomData.maxPlayerCount||4) * 100);

            var _textNode = _copyNode.getChildByName("Image_jindu")

            _textNode.setPositionY(_textNode.getPositionY() - 12);

            var _gameName = new ccui.Text();
            _gameName.setFontSize(26);
            if(MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ){
                _gameName.setColor(cc.color(91,95,128));
            }
            else if (isJinZhongAPPType()) {
                _gameName.setColor(cc.color(66,94,112));
            }
            else {
                _gameName.setColor(cc.color(174,132,105));
            }
            _gameName.setString("");


            if(oneRoomData.gameType != -1)
            {
                _gameName.setString(GameCnName[oneRoomData.gameType]);
                _gameName.setPosition(_JinduBar.getContentSize().width/2,_JinduBar.getContentSize().height/2 + 32);
                _textNode.addChild(_gameName);
            }


            var _invatButton = _copyNode.getChildByName("Button_12");
            if (MjClient.remoteCfg.guestLogin == true|| oneRoomData.playerCount == oneRoomData.maxPlayerCount)
            {
                _invatButton.setVisible(false);
                _invatButton.setTouchEnabled(false);
            }
            _invatButton.addTouchEventListener(function (sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        var _sumStr = getPlaySelectPara(oneRoomData.gameType,oneRoomData.areaSelectMode,oneRoomData.maxPlayerCount);
                        var num = ["零","一","二","三","四","五","六","七","八"];
                        var _roleCount = "  "+num[oneRoomData.maxPlayerCount]+"缺"+num[oneRoomData.maxPlayerCount-oneRoomData.playerCount];

                        _sumStr += (oneRoomData.areaSelectMode.isQuan == true) ? "2圈" : (oneRoomData.roundAll + "局");
                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP )
                        {
                            _sumStr += ",速度加入【"+AppCnName[MjClient.getAppType()]+"】";
                        }
                        else
                        {
                            _sumStr += ",点击立即加入牌局>>>";
                        }
                        var _urlStr = MjClient.remoteCfg.entreRoomUrl+"?vipTable="+oneRoomData.tableid;
                        var _titleStr = GameCnName[oneRoomData.gameType] + "  " + oneRoomData.tableid + _roleCount + "  点击加入>>>";
                        cc.log("邀请信息：" + _titleStr);
                        cc.log(_sumStr);
                        MjClient.getInviteUrl(function (_urlStr) {
                            if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb())
                            {
                                h5.weixinHelper.wxShareUrl(_urlStr, _titleStr, _sumStr);
                            }
                            else
                            {
                                MjClient.shareUrlToMultiPlatform(_urlStr, _titleStr, _sumStr);
                            }
                        }, oneRoomData.tableid);

                        MjClient.native.umengEvent4CountWithProperty("WodefangjianYaoqingClick", {uid:SelfUid(), gameType:oneRoomData.gameType});
                        break;
                    default :
                        break;
                }
            }, this);

            return _copyNode;
        }


        function InitRoomsData(RoomDatas) {
            _listViewNode.removeAllItems();

            if (!cc.isUndefined(RoomDatas)) {
                for (var i = 0; i < RoomDatas.length; i++) {
                    if (RoomDatas[i].gameType != -1) {
                        _listViewNode.pushBackCustomItem(createOneCell(RoomDatas[i]));
                    }
                }
                if (_imgqx) {
                    if (RoomDatas.length <= 0) {
                        _imgqx.visible = true;
                    } else {
                        _imgqx.visible = false;
                    }
                }
            }

        }

        InitRoomsData(MjClient.createRoomDatas);

        //请求开房历史
        UIEventBind(null,this,"refreshMyTables",function(data) {
            cc.log("data_list = ");
            InitRoomsData(data);
        });

    },
    onExit:function()
    {
        this._super();
        MjClient.enterui = null;
        MjClient.createRoomLayer = null;
    },
});

// 衡阳换皮
var EnterRoomLayer_hy = cc.Layer.extend({
    sprite:null,
    hasRecord:false,
    jsBind:{
        back:
        {
            pnl_join:{
                top:{
                    bg0:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                    bg1:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                    bg2:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                    bg3:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                    bg4:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  },
                    bg5:{ _event:{ EnterAddText:EnterAddText  } ,Text:{ _text:EmptyString }  }
                }
            }
        },
    },
    ctor:function () {
        this._super();
        
        // 如果是回放本页面不打开 
        if(MjClient.rePlayVideo >= 0 && MjClient.replayui &&
            MjClient.APP_TYPE.BDHYZP == MjClient.getAppType()){
            MjClient.replayui.replayEnd();
            this.removeFromParent();  
            return true; // 回放不显示加入房间界面
        } 

        var enterui = ccs.load("enter.json");
        BindUiAndLogic(enterui.node,this.jsBind);
        this.addChild(enterui.node);
        MjClient.enterui=this;
        MjClient.entercode=[];

        /*
            changed by sking
        */
        var _block = enterui.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], 2);

        var _back = enterui.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);

        var imgBg = enterui.node.getChildByName("img_bg");
        setWgtLayout(imgBg, [1, 1], [0.5, 0.5], [0, 0], true);

        var _btnClose = _back.getChildByName("btn_close");
        _btnClose.setEnabled(false);
        //使用代理pnl点击关闭
        var _btnDelegateClose = _back.getChildByName("pnl_closeDelegate");
        _btnDelegateClose.setTouchEnabled(true);
        var scale = _btnClose.scale;
        var y = _btnClose.y
        _btnDelegateClose.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_BEGAN:
                    _btnClose.setScale(scale * 0.95);
                    _btnClose.y += 5;
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    _btnClose.setScale(scale);
                    _btnClose.y = y;
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.createRoomLayer = null;
                    this.removeFromParent();
                    MjClient.native.umengEvent4CountWithProperty("WodefangjianGuanbiClick", {uid:SelfUid()});
                    break;
                default :
                    break;
            }
        }, this);

        //衡阳添加粒子动画
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
            var starParticle1 =  new cc.ParticleSystem("ui/Particle/particle_texture.plist");
            starParticle1.setPosition(_back.getContentSize().width*0.2, 60);
            starParticle1.setScale(0.8);
            starParticle1.setTotalParticles(50);
            _back.addChild(starParticle1,10);   


            var starParticle2 =  new cc.ParticleSystem("ui/Particle/particle_texture.plist");
            starParticle2.setPosition(_back.getContentSize().width*0.8, 60);
            starParticle2.setScale(0.8);
            starParticle2.setTotalParticles(50);
            _back.addChild(starParticle2,10);         
        }

        // 选项卡
        var pnlJoin = _back.getChildByName("pnl_join");
        pnlJoin.setVisible(true);
        var pnlMyRoom = _back.getChildByName("pnl_myRoom");
        pnlMyRoom.setVisible(false);

        var imgJoinRoom = _back.getChildByName("img_join");
        var imgMyRoom = _back.getChildByName("img_myRoom");
        imgJoinRoom.setVisible(true);
        imgMyRoom.setVisible(false);

        //代理标签按钮
        var pnlJoinDelegate = _back.getChildByName("pnl_joinDelegate");
        var pnlMyRoomDelegate = _back.getChildByName("pnl_myRoomDelegate");

        pnlJoinDelegate.setTouchEnabled(true);
        pnlMyRoomDelegate.setTouchEnabled(true);
        pnlJoinDelegate.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                imgJoinRoom.setVisible(true);
                imgMyRoom.setVisible(false);
                pnlJoin.setVisible(true);
                pnlMyRoom.setVisible(false);
                var img = _back.getChildByName("img_qixing");
                img.visible = false;
                var txtTips = _back.getChildByName("txt_noRecordTips");
                txtTips.visible = false;
            }
        }, this);

        pnlMyRoomDelegate.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian", {uid: SelfUid()});
                imgJoinRoom.setVisible(false);
                imgMyRoom.setVisible(true);
                pnlJoin.setVisible(false);
                pnlMyRoom.setVisible(true);
                var img = _back.getChildByName("img_qixing");
                img.visible = !MjClient.enterui.hasRecord;
                var txtTips = _back.getChildByName("txt_noRecordTips");
                txtTips.visible = !MjClient.enterui.hasRecord;
            }
        }, this);

        //数字按键
        var _num = pnlJoin.getChildByName("num");
        function numBtnTouchEvent(sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                var itag = sender.getTag();
                InputRoomNumber(itag);
            }
        }
        for (var i = 0; i <= 9; i++) {
            var _btnNum = _num.getChildByName("Button_" + i);
            _btnNum.setTag(i);
            _btnNum.addTouchEventListener(numBtnTouchEvent, this);
        }

        //清除所有
        var _clear =  _num.getChildByName("clear");
        _clear.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    InputRoomNumber(-2);
                    break;
                default :
                    break;
            }
        }, this);

        //删除
        var _del =  _num.getChildByName("del");
        _del.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    InputRoomNumber(-1);;
                    break;
                default :
                    break;
            }
        }, this);

        //先隐藏
        var imgQx = _back.getChildByName("img_qixing");
        if (imgQx) {
            imgQx.visible = false;
        }
        var txtNoTips = _back.getChildByName("txt_noRecordTips");
        if (txtNoTips) {
            txtNoTips.visible = false;
        }

        //我的房间
        this.InitMyRoom(_back);

        return true;
    },
    InitMyRoom:function(_back)
    {
        var pnlMyRoom = _back.getChildByName("pnl_myRoom");
        var _btnRoomHistory = pnlMyRoom.getChildByName("btn_record");
        _btnRoomHistory.setTouchEnabled(true);
        _btnRoomHistory.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_kaifangjili", {uid:SelfUid()});
                    _back.setVisible(false);
                    MjClient.createRoomLayer = _back;
                    this.addChild(new createRoomRecordLayer());
                    break;
                default :
                    break;
            }
        }, this);

        var _btnCreateRoom = pnlMyRoom.getChildByName("btn_create");
        _btnCreateRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (!MjClient.data.sData)
                    {
                        _back.setVisible(false);
                        MjClient.createRoomLayer = _back;
                        postEvent("createRoom",{});
                        MjClient.native.umengEvent4CountWithProperty("WodefangjianChuangjianClick", {uid:SelfUid()});
                    }
                    else
                    {
                        MjClient.showMsg("房间已经创建,请直接加入房间。");
                    }
                    break;
                default :
                    break;
            }
        }, this);

        var _roomCell = _back.getChildByName("room_cell");
        _roomCell.visible = false;

        var imgQx = _back.getChildByName("img_qixing");
        if (imgQx) {
            imgQx.visible = false;
        }
        var txtNoTips = _back.getChildByName("txt_noRecordTips");
        if (txtNoTips) {
            txtNoTips.visible = false;
        }
        
        var _listViewNode = pnlMyRoom.getChildByName("list_record");
        _listViewNode.removeAllItems();

        function createOneCell(oneRoomData)
        {
            cc.log("createOneCell oneRoomData = " + JSON.stringify(oneRoomData));

            var _copyNode = _roomCell.clone();
            _copyNode.visible = true;
            _copyNode.setTouchEnabled(true);
            _copyNode.addTouchEventListener(function (sender, Type)
            {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        MjClient.joinGame(oneRoomData.tableid);
                        break;
                }
            });

            var _roomId = _copyNode.getChildByName("txt_roomID");
            _roomId.setString(oneRoomData.tableid);
            _roomId.ignoreContentAdaptWithSize(true);
            var _leftTime = _copyNode.getChildByName("txt_time");
            _leftTime.ignoreContentAdaptWithSize(true);
            _leftTime.setString("");
            var seconds = parseInt(oneRoomData.remainTime/1000);
            _leftTime.schedule(function(){
                if(oneRoomData.tableState == "ongoing")
                {
                    _leftTime.setString("正在游戏");
                }
                else
                {
                    seconds--;
                    var _minTime = parseInt(seconds/60);//转化为分钟
                    if(_minTime < 1)
                    {
                        _minTime  = 1;
                    }
                    _leftTime.setString(_minTime + "分钟");
                }
            }, 1);

            var _JinduText = _copyNode.getChildByName("txt_jindu");
            _JinduText.ignoreContentAdaptWithSize(true);
            _JinduText.setString(oneRoomData.playerCount+"/"+(oneRoomData.maxPlayerCount||4));

            /*
            var _JinduBar = _copyNode.getChildByName("Image_jindu").getChildByName("LoadingBar_1");
            _JinduBar.setPercent(oneRoomData.playerCount/(oneRoomData.maxPlayerCount||4) * 100);
            

            var _textNode = _copyNode.getChildByName("Image_jindu")

            _textNode.setPositionY(_textNode.getPositionY() - 12);

            var _gameName = new ccui.Text();
            _gameName.setFontSize(26);
            _gameName.setColor(cc.color(174,132,105));
            _gameName.setString("");
            */
            var _gameName = _copyNode.getChildByName("txt_game");
            _gameName.setString("");

            if(oneRoomData.gameType != -1)
            {
                if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP && 
                    oneRoomData.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG)
                {
                    _gameName.setString("六胡抢");

                }else if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP && 
                            oneRoomData.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA)
                {
                    _gameName.setString("十胡卡");

                }else
                {
                    _gameName.setString(GameCnName[oneRoomData.gameType]);
                } 
                /*
                _gameName.setPosition(_JinduBar.getContentSize().width/2,_JinduBar.getContentSize().height/2 + 32);
                _textNode.addChild(_gameName);
                */
            }


            var _invatButton = _copyNode.getChildByName("btn_envite");
            if (MjClient.remoteCfg.guestLogin == true|| oneRoomData.playerCount == oneRoomData.maxPlayerCount)
            {
                _invatButton.setVisible(false);
                _invatButton.setTouchEnabled(false);
            }
            _invatButton.addTouchEventListener(function (sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        var _sumStr = getPlaySelectPara(oneRoomData.gameType,oneRoomData.areaSelectMode,oneRoomData.maxPlayerCount);
                        var num = ["零","一","二","三","四","五","六","七","八"];
                        var _roleCount = "  "+num[oneRoomData.maxPlayerCount]+"缺"+num[oneRoomData.maxPlayerCount-oneRoomData.playerCount];

                        _sumStr += (oneRoomData.areaSelectMode.isQuan == true) ? "2圈" : (oneRoomData.roundAll + "局");
                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP )
                        {
                            _sumStr += ",速度加入【"+AppCnName[MjClient.getAppType()]+"】";
                        }
                        else
                        {
                            _sumStr += ",点击立即加入牌局>>>";
                        }
                        var _urlStr = MjClient.remoteCfg.entreRoomUrl+"?vipTable="+oneRoomData.tableid;
                        var _titleStr = GameCnName[oneRoomData.gameType] + "  " + oneRoomData.tableid + _roleCount + "  点击加入>>>";
                        cc.log("邀请信息：" + _titleStr);
                        cc.log(_sumStr);
                        MjClient.getInviteUrl(function (_urlStr) {
                            MjClient.shareUrlToMultiPlatform(_urlStr, _titleStr, _sumStr);
                        }, oneRoomData.tableid);

                        MjClient.native.umengEvent4CountWithProperty("WodefangjianYaoqingClick", {uid:SelfUid(), gameType:oneRoomData.gameType});
                        break;
                    default :
                        break;
                }
            }, this);

            return _copyNode;
        }

        var pnlMyRoom = _back.getChildByName("pnl_myRoom");

        function InitRoomsData(RoomDatas)
        {
            _listViewNode.removeAllItems();

            if (!cc.isUndefined(RoomDatas)) {
                for (var i = 0; i < RoomDatas.length; i++) {
                    if (RoomDatas[i].gameType != -1) {
                        _listViewNode.pushBackCustomItem(createOneCell(RoomDatas[i]));
                    }
                }

                if (imgQx && txtNoTips) {
                    if (RoomDatas.length <= 0) {
                        if (pnlMyRoom && pnlMyRoom.isVisible()) {
                            imgQx.visible = true;
                            txtNoTips.visible = true;
                        }
                        MjClient.enterui.hasRecord = false;
                    } else {
                        imgQx.visible = false;
                        txtNoTips.visible = false;
                        MjClient.enterui.hasRecord = true;
                    }
                }
            }
            
        }

        InitRoomsData(MjClient.createRoomDatas);

        //请求开房历史
        UIEventBind(null,this,"refreshMyTables",function(data) {
            cc.log("data_list = ");
            InitRoomsData(data);
        });

    },
    onExit:function()
    {
        this._super();
        MjClient.enterui = null;
        MjClient.createRoomLayer = null;
    },
});

// 岳阳换皮
var EnterRoomLayer_QXYYQP_v3 = cc.Layer.extend({
    sprite:null,
    jsBind: {
        back:
        {
            joinRoom:
            {
                top: {
                    bg0: { _event: { EnterAddText: EnterAddText }, Text: { _text: EmptyString } },
                    bg1: { _event: { EnterAddText: EnterAddText }, Text: { _text: EmptyString } },
                    bg2: { _event: { EnterAddText: EnterAddText }, Text: { _text: EmptyString } },
                    bg3: { _event: { EnterAddText: EnterAddText }, Text: { _text: EmptyString } },
                    bg4: { _event: { EnterAddText: EnterAddText }, Text: { _text: EmptyString } },
                    bg5: { _event: { EnterAddText: EnterAddText }, Text: { _text: EmptyString } }
                }
            },

        },
    },
    ctor:function () {
        this._super();
        var enterui = ccs.load("enter_3.0.json");
        BindUiAndLogic(enterui.node,this.jsBind);
        this.addChild(enterui.node);
        MjClient.enterui=this;
        MjClient.entercode=[];

        var self = this;

        /*
            changed by sking
        */
        var _block = enterui.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], 2);

        var _back = enterui.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);

        var _suizi = _back.getChildByName("suizi");
        //穗子动画
        if(_suizi) 
            COMMON_UI.suiziAni(_suizi,8);
        else
            COMMON_UI.popDialogAni(_back);

        var _btnClose = _back.getChildByName("close");
        _btnClose.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.createRoomLayer = null;
                    this.removeFromParent();
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Close", {uid:SelfUid()});
                    break;
                default :
                    break;
            }
        }, this);

        // 选项卡
        var _joinRoom = _back.getChildByName("joinRoom");
        _joinRoom.setVisible(true);
        var _myRoom = _back.getChildByName("myRoom");
        _myRoom.setVisible(true);

        var _joinRoomBtn = _back.getChildByName("joinRoom_btn");
        var _myRoomBtn = _back.getChildByName("myRoom_btn");

        var _btnBG1 = _back.getChildByName("btn_BG1");
        _btnBG1.setVisible(true);
        var _btnBG2 = _back.getChildByName("btn_BG2");
        _btnBG2.setVisible(false);

        if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ
            || MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
            _btnBG1.setVisible(false);
            _btnBG2.setVisible(false);
            _joinRoomBtn.setEnabled(false);
            _myRoomBtn.setEnabled(true);
        }
        _joinRoom.setVisible(true);
        _myRoom.setVisible(false);

       _joinRoomBtn.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                _joinRoom.setVisible(true);
                _myRoom.setVisible(false);
                _joinRoomBtn.setBright(false);
                _myRoomBtn.setBright(true);
                _btnBG1.setVisible(true);
                _btnBG2.setVisible(false);
            

            }
        }, this);
        _joinRoom.setVisible(true);
        _myRoom.setVisible(false);
        _joinRoomBtn.setBright(false);
        _myRoomBtn.setBright(true);
        _btnBG1.setVisible(true);
        _btnBG2.setVisible(false);

        _myRoomBtn.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian", {uid: SelfUid()});
                _joinRoom.setVisible(false);
                _myRoom.setVisible(true);
                _joinRoomBtn.setBright(true);
                _myRoomBtn.setBright(false);
                _btnBG1.setVisible(false);
                _btnBG2.setVisible(true);

            }
        }, this);

        //数字按键
        var _num = _joinRoom.getChildByName("num");
        function numBtnTouchEvent(sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                var itag = sender.getTag();
                InputRoomNumber(itag);
            }
        }
        for (var i = 0; i <= 9; i++) {
            var _btnNum = _num.getChildByName("Button_" + i);
            _btnNum.setTag(i);
            _btnNum.addTouchEventListener(numBtnTouchEvent, this);
        }

        //清除所有
        var _clear =  _num.getChildByName("clear");
        _clear.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Qingkong", {uid: SelfUid()});
                    InputRoomNumber(-2);
                    break;
                default :
                    break;
            }
        }, this);

        //删除
        var _del =  _num.getChildByName("del");
        _del.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Shanchu", {uid: SelfUid()});
                    InputRoomNumber(-1);;
                    break;
                default :
                    break;
            }
        }, this);


        //我的房间
        this.InitMyRoom(_back);

        return true;
    },
    InitMyRoom:function(_back)
    {
        var _myRoomBG = _back.getChildByName("myRoom");
        var _btnRoomHistory = _myRoomBG.getChildByName("Button_record");
        _btnRoomHistory.setTouchEnabled(true);
        _btnRoomHistory.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_Kaifangjilu", {uid:SelfUid()});
                    _back.setVisible(false);
                    MjClient.createRoomLayer = _back;
                    this.addChild(new createRoomRecordLayer_v3());
                    break;
                default :
                    break;
            }
        }, this);

        var _btnCreateRoom = _myRoomBG.getChildByName("Button_10_0");
        _btnCreateRoom.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (!MjClient.data.sData)
                    {
                        _back.setVisible(false);
                        MjClient.createRoomLayer = _back;
                        postEvent("createRoom",{});
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_Chuangjianfangjian", {uid:SelfUid()});
                    }
                    else
                    {
                        MjClient.showMsg("房间已经创建,请直接加入房间。");
                    }
                    break;
                default :
                    break;
            }
        }, this);

        var _roomCell = _back.getChildByName("room_cell");
        _roomCell.visible = false;
        var _imgqx = _myRoomBG.getChildByName("Image_qixing");
        if (_imgqx) {
            _imgqx.visible = true;
        }
        
        var _listViewNode = _myRoomBG.getChildByName("ListView_1");
        _listViewNode.removeAllItems();

        function createOneCell(oneRoomData)
        {
            cc.log("createOneCell oneRoomData = " + JSON.stringify(oneRoomData));

            var _copyNode = _roomCell.clone();
            _copyNode.visible = true;
            _copyNode.setTouchEnabled(true);
            _copyNode.addTouchEventListener(function (sender, Type)
            {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_Jiaoru", {uid:SelfUid()});
                        MjClient.joinGame(oneRoomData.tableid);
                        break;
                }
            });

            var _roomId = _copyNode.getChildByName("roomID");
            _roomId.setString(oneRoomData.tableid);
            _roomId.ignoreContentAdaptWithSize(true);
            var _leftTime = _copyNode.getChildByName("time");
            _leftTime.ignoreContentAdaptWithSize(true);
            _leftTime.setString("");
            var seconds = parseInt(oneRoomData.remainTime/1000);
            _leftTime.schedule(function(){
                if(oneRoomData.tableState == "ongoing")
                {
                    _leftTime.setString("正在游戏");
                }
                else
                {
                    seconds--;
                    var _minTime = parseInt(seconds/60);//转化为分钟
                    if(_minTime < 1)
                    {
                        _minTime  = 1;
                    }
                    _leftTime.setString(_minTime + "分钟");
                }
            }, 1);



            var _JinduText = _copyNode.getChildByName("Image_jindu").getChildByName("Text_4");
            _JinduText.setString(oneRoomData.playerCount+"/"+(oneRoomData.maxPlayerCount||4));
            _JinduText.ignoreContentAdaptWithSize(true);

            var _JinduBar = _copyNode.getChildByName("Image_jindu").getChildByName("LoadingBar_1");
            _JinduBar.setPercent(oneRoomData.playerCount/(oneRoomData.maxPlayerCount||4) * 100);

            var _textNode = _copyNode.getChildByName("Image_jindu")

            _textNode.setPositionY(_textNode.getPositionY() - 12);

            var _gameName = new ccui.Text();
            _gameName.setFontName("fonts/lanting.TTF");
            _gameName.setFontSize(26);
            if(MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ){
                _gameName.setColor(cc.color(91,95,128));
            }
            else if (isJinZhongAPPType()) {
                _gameName.setColor(cc.color(66,94,112));
            }
            else if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                _gameName.setColor(cc.color("#774E39"));
            }
            else {
                _gameName.setColor(cc.color(255,255,255));
            }
            _gameName.setString("");


            if(oneRoomData.gameType != -1)
            {
                _gameName.setString(GameCnName[oneRoomData.gameType]);
                _gameName.setPosition(_JinduBar.getContentSize().width/2,_JinduBar.getContentSize().height/2 + 32);
                _textNode.addChild(_gameName);
            }


            var _invatButton = _copyNode.getChildByName("Button_12");
            if (MjClient.remoteCfg.guestLogin == true|| oneRoomData.playerCount == oneRoomData.maxPlayerCount)
            {
                _invatButton.setVisible(false);
                _invatButton.setTouchEnabled(false);
            }
            _invatButton.addTouchEventListener(function (sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        var _sumStr = getPlaySelectPara(oneRoomData.gameType,oneRoomData.areaSelectMode,oneRoomData.maxPlayerCount);
                        var num = ["零","一","二","三","四","五","六","七","八"];
                        var _roleCount = "  "+num[oneRoomData.maxPlayerCount]+"缺"+num[oneRoomData.maxPlayerCount-oneRoomData.playerCount];

                        _sumStr += (oneRoomData.areaSelectMode.isQuan == true) ? "2圈" : (oneRoomData.roundAll + "局");
                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP )
                        {
                            _sumStr += ",速度加入【"+AppCnName[MjClient.getAppType()]+"】";
                        }
                        else
                        {
                            _sumStr += ",点击立即加入牌局>>>";
                        }
                        var _urlStr = MjClient.remoteCfg.entreRoomUrl+"?vipTable="+oneRoomData.tableid;
                        var _titleStr = GameCnName[oneRoomData.gameType] + "  " + oneRoomData.tableid + _roleCount + "  点击加入>>>";
                        cc.log("邀请信息：" + _titleStr);
                        cc.log(_sumStr);
                        MjClient.getInviteUrl(function (_urlStr) {
                            if (typeof(h5) != 'undefined' && h5.nativeHelper.isWeb())
                            {
                                h5.weixinHelper.wxShareUrl(_urlStr, _titleStr, _sumStr);
                            }
                            else
                            {
                                MjClient.shareUrlToMultiPlatform(_urlStr, _titleStr, _sumStr);
                            }
                        }, oneRoomData.tableid);

                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jiarufangjian_Wodefangjian_Yaoqing", {uid:SelfUid(), gameType:oneRoomData.gameType});
                        break;
                    default :
                        break;
                }
            }, this);

            return _copyNode;
        }


        function InitRoomsData(RoomDatas) {
            _listViewNode.removeAllItems();

            if (!cc.isUndefined(RoomDatas)) {
                for (var i = 0; i < RoomDatas.length; i++) {
                    if (RoomDatas[i].gameType != -1) {
                        _listViewNode.pushBackCustomItem(createOneCell(RoomDatas[i]));
                    }
                }
                if (_imgqx) {
                    if (RoomDatas.length <= 0) {
                        _imgqx.visible = true;
                    } else {
                        _imgqx.visible = false;
                    }
                }
            }

        }

        InitRoomsData(MjClient.createRoomDatas);

        //请求开房历史
        UIEventBind(null,this,"refreshMyTables",function(data) {
            cc.log("data_list = ");
            InitRoomsData(data);
        });

    },
    onExit:function()
    {
        this._super();
        MjClient.enterui = null;
        MjClient.createRoomLayer = null;
    },
});
var Switch_enterRoom = function() {
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
        EnterRoomLayer = EnterRoomLayer_lyg;
    } else if (MjClient.getAppType() === MjClient.APP_TYPE.TXJINZHONGMJ ||
        MjClient.getAppType() === MjClient.APP_TYPE.DQSHANXIMJ ||
        MjClient.getAppType() === MjClient.APP_TYPE.LYSICHUANMJ) {
        EnterRoomLayer = EnterRoomLayer_jinzhong;
    } else if (MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ) {
        EnterRoomLayer = EnterRoomLayer_QXYYQP_v3;
    }else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
        MjClient.getAppType() === MjClient.APP_TYPE.AYGUIZHOUMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
        cc.log("====  MjClient.isUseUIv3() ",MjClient.isUseUIv3 && MjClient.isUseUIv3());
        if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
            EnterRoomLayer = EnterRoomLayer_QXYYQP_v3;
        else
            EnterRoomLayer = EnterRoomLayer_QXYYQP;
    } else if (MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ) {
        EnterRoomLayer = EnterRoomLayer_yongzhou;
    } else if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP) {
        if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
            EnterRoomLayer = EnterRoomLayer_QXYYQP_v3;
        else
            EnterRoomLayer = EnterRoomLayer_sy;
    } else if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
        EnterRoomLayer = EnterRoomLayer_hy;
    }


};

Switch_enterRoom();


var createRoomRecordLayer = cc.Layer.extend({
    ctor:function ()
    {
        this._super();
        var UI = ccs.load("createRoomRecord.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        if (MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {
            setWgtLayout(_back, [1, 1], [0.5, 0.45], [0, 0]);
        }else if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            setWgtLayout(_back, [0.9, 0.9], [0.5, 0.4836], [0, 0]);
        }
        else {
            setWgtLayout(_back,[0.95, 0.95], [0.5, 0.5], [0, 0]);
        }

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if (MjClient.createRoomLayer){
                    MjClient.createRoomLayer.setVisible(true);
                }
                that.removeFromParent();
            }
        }, this);

        var nullTip_image = _back.getChildByName("nullTip_image");
        var nullTip_text = _back.getChildByName("nullTip_text");
        if (nullTip_image)
        {
            if(MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ || MjClient.getAppType() === MjClient.APP_TYPE.QXHHZP){
                nullTip_image.setTexture("game_picture/beidou.png");
            }
            nullTip_image.visible = false; 
            nullTip_text.visible = false;
        }

        var _cellRecord = UI.node.getChildByName("item");
        _cellRecord.visible = false;

        var _listView = _back.getChildByName("list");
        _listView.removeAllItems();

        var that = this;

        function createOneCell(oneData,i)
        {
            var WinerId = oneData.winner;

            var _copy = _cellRecord.clone();
            _copy.visible = true;

            var tableID = _copy.getChildByName("tableid");
            tableID.ignoreContentAdaptWithSize(true);
            tableID.setString("房间ID:"+oneData.roomNum);

            var _num = _copy.getChildByName("num");
            _num.ignoreContentAdaptWithSize(true);
            _num.setString("" + (i + 1));

            var _time = _copy.getChildByName("time");
            var _timeStr = MjClient.dateFormat(new Date(parseInt(oneData.createTime)), 'yyyy-MM-dd hh:mm:ss');
            _time.ignoreContentAdaptWithSize(true);
            _time.setString(_timeStr);

            var _info= _copy.getChildByName("Text_1");
            _info.ignoreContentAdaptWithSize(true);
            var playString = "";
            switch (oneData.payWay)
            {
                case 0:
                    playString += "房主付";
                    break;
                case 1:
                    playString += "AA付";
                    break;
                case 2:
                    var content = "大赢家付";
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
                    {
                        content = "亲友圈付";
                    }
                    playString += content;
                    break;
            }
            _info.setString(oneData.roundNum + "局" + "," + playString);


            var _gameType = _copy.getChildByName("gameType");
            cc.log("oneData.gameType == " + oneData.gameType);
            _gameType.setString(GameCnName[oneData.gameType]);
            _gameType.ignoreContentAdaptWithSize(true);


            var _nameText = _copy.getChildByName("player0");
            _nameText.ignoreContentAdaptWithSize(true);


            if( oneData.players.length <= 0)
            {
                return _copy;
            }

            cc.log("==================nameText = " + JSON.stringify(oneData));
            function nameText(idx){

                var _name = _copy.getChildByName("player" + idx);
                cc.log("==================nameText = " + idx);
                _name.getChildByName("tagIcon").visible = false;

                if (isJinZhongAPPType() || 
                    MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
                    MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
                    MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
                    MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ ||
                    MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP || 
                    MjClient.getAppType() === MjClient.APP_TYPE.BDYZPHZ || 
                    MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ ||
                    MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                    MjClient.getAppType() === MjClient.APP_TYPE.QXLYQP
                ) {
                    var _uName = _name.getChildByName("Text_name");
                    _uName.ignoreContentAdaptWithSize(true);
                    var _uScore = _name.getChildByName("Text_score");
                    _uScore.ignoreContentAdaptWithSize(true);
                    _uName.setString(getNewName(unescape(oneData.players[idx].playerName), 8) + "");
                    if ((isJinZhongAPPType() ||
                        MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP || 
                        MjClient.getAppType() === MjClient.APP_TYPE.BDYZPHZ || 
                        MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() === MjClient.APP_TYPE.QXLYQP) && 
                        Number(oneData.players[idx].score) <= 0) 
                    {
                        _uScore.setColor(cc.color(72,132,162));
                    }
                    else if ((
                        MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ
                        || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP
                        || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ
                        || MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) 
                        && Number(oneData.players[idx].score) <= 0) {
                        _uScore.setColor(cc.color("#443333"));
                    }
                    _uScore.setString(oneData.players[idx].score + "");
                    return "ID:" + oneData.players[idx].userId;
                }
                else {
                    if( oneData.players[idx].userId == WinerId)
                    {
                        _name.getChildByName("tagIcon").visible = true;
                    }
                    cc.log("oneData.players[idx].userId = " +oneData.players[idx].userId);
                    cc.log("that.WinerId = " +that.WinerId);

                    return getNewName(unescape(oneData.players[idx].playerName), 8) + ":" + oneData.players[idx].score;
                }
            }


            var _nameText0 = _copy.getChildByName("player0");
            _nameText0.ignoreContentAdaptWithSize(true);
            _nameText0.setString(nameText(0));

            var _nameText1 = _copy.getChildByName("player1");
            _nameText1.ignoreContentAdaptWithSize(true);
            _nameText1.setString(nameText(1));

            var _nameText2 = _copy.getChildByName("player2");
            _nameText2.ignoreContentAdaptWithSize(true);
            if (oneData.players.length >= 3)
            {
                _nameText2.setString(nameText(2));
            }
            else
            {
                _nameText2.visible = false;
            }

            var _nameText3 = _copy.getChildByName("player3");
            _nameText3.ignoreContentAdaptWithSize(true);
            if (oneData.players.length >= 4)
            {
                _nameText3.setString(nameText(3));
            }
            else
            {
                _nameText3.visible = false;
            }

            var _nameText4 = _copy.getChildByName("player4");
            if (_nameText4) {
                _nameText4.ignoreContentAdaptWithSize(true);
                if (oneData.players.length >= 5)
                {
                    _nameText4.setString(nameText(4));
                }
                else
                {
                    _nameText4.visible = false;
                }
            }

            var line = _copy.getChildByName("line_shu3");
            if (line && oneData.players.length <= 2) {
                line.visible = false;
            }

            return _copy;
        }


        function initRoomRecordList(Data)
        {
            cc.log("initRoomRecordList = " + JSON.stringify(Data));
           
            for(var i = 0; i < Data.length;i++)
            {
                cc.log("Data[i] = " + JSON.stringify(Data[i]));
                if(Data[i].gameType != -1)
                {
                    _listView.pushBackCustomItem(createOneCell(Data[i],i));
                }
            }
            
            if (nullTip_image)
            {
                nullTip_image.visible = _listView.getItems().length == 0; 
                nullTip_text.visible = _listView.getItems().length == 0;
            }
        }

        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.roomHistory",{index:1,pageNum:20},
            function(rtn)
            {
                if(rtn.code == 0)
                {

                    initRoomRecordList(rtn.data.list);
                }
                else
                {
                    if(rtn.message)
                    {
                        MjClient.showToast(rtn.message);
                    }
                    else
                    {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }

                }

                MjClient.unblock();
            }
        );

    }
});


var createRoomRecordLayer_v3 = cc.Layer.extend({
    ctor:function ()
    {
        this._super();
        var UI = ccs.load("createRoomRecord_3.0.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        if (MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {
            setWgtLayout(_back, [0.95, 0.95], [0.5, 0.5], [0, 0]);
        }else if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            setWgtLayout(_back, [0.9, 0.9], [0.5, 0.4836], [0, 0]);
        }
        else {
            setWgtLayout(_back,[0.95, 0.95], [0.5, 0.5], [0, 0]);
        }

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if (MjClient.createRoomLayer){
                    MjClient.createRoomLayer.setVisible(true);
                }
                that.removeFromParent();
            }
        }, this);

        var nullTip_image = _back.getChildByName("nullTip_image");
        var nullTip_text = _back.getChildByName("nullTip_text");
        if (nullTip_image)
        {
            if(MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ || MjClient.getAppType() === MjClient.APP_TYPE.QXHHZP){
                nullTip_image.setTexture("game_picture/beidou.png");
            }
            nullTip_image.visible = false; 
            nullTip_text.visible = false;
        }

        var _cellRecord = UI.node.getChildByName("item");
        _cellRecord.visible = false;

        var _listView = _back.getChildByName("list");
        _listView.removeAllItems();

        var that = this;

        function createOneCell(oneData,i)
        {
            var WinerId = oneData.winner;

            var _copy = _cellRecord.clone();
            _copy.visible = true;

            var tableID = _copy.getChildByName("tableid");
            tableID.ignoreContentAdaptWithSize(true);
            tableID.setString("房间ID:"+oneData.roomNum);

            var _num = _copy.getChildByName("num");
            _num.ignoreContentAdaptWithSize(true);
            _num.setString("" + (i + 1));

            var _time = _copy.getChildByName("time");
            var _timeStr = MjClient.dateFormat(new Date(parseInt(oneData.createTime)), 'yyyy-MM-dd hh:mm:ss');
            _time.ignoreContentAdaptWithSize(true);
            _time.setString(_timeStr);

            var _info= _copy.getChildByName("Text_1");
            _info.ignoreContentAdaptWithSize(true);
            var playString = "";
            switch (oneData.payWay)
            {
                case 0:
                    playString += "房主付";
                    break;
                case 1:
                    playString += "AA付";
                    break;
                case 2:
                    var content = "大赢家付";
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
                    {
                        content = "亲友圈付";
                    }
                    playString += content;
                    break;
            }
            _info.setString(oneData.roundNum + "局" + "," + playString);


            var _gameType = _copy.getChildByName("gameType");
            cc.log("oneData.gameType == " + oneData.gameType);
            _gameType.setString(GameCnName[oneData.gameType]);
            _gameType.ignoreContentAdaptWithSize(true);


            var _nameText = _copy.getChildByName("player0");
            _nameText.ignoreContentAdaptWithSize(true);


            if( oneData.players.length <= 0)
            {
                return _copy;
            }

            cc.log("==================nameText = " + JSON.stringify(oneData));
            function nameText(idx){

                var _name = _copy.getChildByName("player" + idx);
                cc.log("==================nameText = " + idx);
                _name.getChildByName("tagIcon").visible = false;

                if (isJinZhongAPPType() || 
                    MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
                    MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
                    MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
                    MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ ||
                    MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP || 
                    MjClient.getAppType() === MjClient.APP_TYPE.BDYZPHZ || 
                    MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ ||
                    MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                    MjClient.getAppType() === MjClient.APP_TYPE.QXLYQP
                ) {
                    var _uName = _name.getChildByName("Text_name");
                    _uName.ignoreContentAdaptWithSize(true);
                    var _uScore = _name.getChildByName("Text_score");
                    _uScore.ignoreContentAdaptWithSize(true);
                    _uName.setString(getNewName(unescape(oneData.players[idx].playerName), 8) + "");
                    if ((isJinZhongAPPType() ||
                        MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP || 
                        MjClient.getAppType() === MjClient.APP_TYPE.BDYZPHZ || 
                        MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() === MjClient.APP_TYPE.QXLYQP) && 
                        Number(oneData.players[idx].score) <= 0) 
                    {
                        _uScore.setColor(cc.color(72,132,162));
                    }
                    else if ((MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP
                        || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ
                        || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ
                        || MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) 
                        && Number(oneData.players[idx].score) <= 0) {
                        _uScore.setColor(cc.color("#08460e"));
                    }
                    _uScore.setString(oneData.players[idx].score + "");
                    return "ID:" + oneData.players[idx].userId;
                }
                else {
                    if( oneData.players[idx].userId == WinerId)
                    {
                        _name.getChildByName("tagIcon").visible = true;
                    }
                    cc.log("oneData.players[idx].userId = " +oneData.players[idx].userId);
                    cc.log("that.WinerId = " +that.WinerId);

                    return getNewName(unescape(oneData.players[idx].playerName), 8) + ":" + oneData.players[idx].score;
                }
            }


            var _nameText0 = _copy.getChildByName("player0");
            _nameText0.ignoreContentAdaptWithSize(true);
            _nameText0.setString(nameText(0));

            var _nameText1 = _copy.getChildByName("player1");
            _nameText1.ignoreContentAdaptWithSize(true);
            _nameText1.setString(nameText(1));

            var _nameText2 = _copy.getChildByName("player2");
            _nameText2.ignoreContentAdaptWithSize(true);
            if (oneData.players.length >= 3)
            {
                _nameText2.setString(nameText(2));
            }
            else
            {
                _nameText2.visible = false;
            }

            var _nameText3 = _copy.getChildByName("player3");
            _nameText3.ignoreContentAdaptWithSize(true);
            if (oneData.players.length >= 4)
            {
                _nameText3.setString(nameText(3));
            }
            else
            {
                _nameText3.visible = false;
            }

            var _nameText4 = _copy.getChildByName("player4");
            if (_nameText4) {
                _nameText4.ignoreContentAdaptWithSize(true);
                if (oneData.players.length >= 5)
                {
                    _nameText4.setString(nameText(4));
                }
                else
                {
                    _nameText4.visible = false;
                }
            }

            var line = _copy.getChildByName("line_shu3");
            if (line && oneData.players.length <= 2) {
                line.visible = false;
            }

            return _copy;
        }


        function initRoomRecordList(Data)
        {
            cc.log("initRoomRecordList = " + JSON.stringify(Data));
           
            for(var i = 0; i < Data.length;i++)
            {
                cc.log("Data[i] = " + JSON.stringify(Data[i]));
                if(Data[i].gameType != -1)
                {
                    _listView.pushBackCustomItem(createOneCell(Data[i],i));
                }
            }
            
            if (nullTip_image)
            {
                nullTip_image.visible = _listView.getItems().length == 0; 
                nullTip_text.visible = _listView.getItems().length == 0;
            }
        }

        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.roomHistory",{index:1,pageNum:20},
            function(rtn)
            {
                if(rtn.code == 0)
                {

                    initRoomRecordList(rtn.data.list);
                }
                else
                {
                    if(rtn.message)
                    {
                        MjClient.showToast(rtn.message);
                    }
                    else
                    {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }

                }

                MjClient.unblock();
            }
        );

    }
});
