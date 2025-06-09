/*
* @Author: Administrator
* @Date:   2017-11-24 19:18:08
* @Last Modified by:   Administrator
*/

var FriendCard_roomRecord = cc.Layer.extend({
	ctor: function(data,openType,isByFCM,reqInfo) {
		cc.log(" ======== FriendCard_roomRecord  data : ",JSON.stringify(data));
		this._super();
		this._numberRecord = 0;
        this._clubData = data;
        this._isByFCM = isByFCM;
        this._gameType = -1;
        this._lastId = -1;
        this._gameTypeList = []; //用于选择玩法界面
        this._selectedRenshu = -1;
        this.isLMClub = FriendCard_Common.isLMClub(this._clubData.info);
        this.isManager = FriendCard_Common.isManager(this._clubData.info);
        this.isGroupLeader = FriendCard_Common.isGroupLeader(this._clubData.info);
        this.isCreator =  FriendCard_Common.isSupperManger(this._clubData.info);
        this.isPartner =  FriendCard_Common.isPartner(this._clubData.info);
        if(reqInfo){
            this.reqUserId = reqInfo.userId;
            this.reqInfo = reqInfo;
        }
        //openType = 1是从玩家统计中打开
        if( openType )
        {
            this.openType = openType;
            this.openPlayerInfo = data.openPlayerInfo;
        }
        else
        {
            this.openType = null;
            this.openPlayerInfo = null;
        }


		var UI = ccs.load("friendcard_roomRecord.json");
		this.addChild(UI.node);
		var that = this;
        this.uinode = UI.node;
		var _block = UI.node.getChildByName("block");
		setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


		var _back = UI.node.getChildByName("back");
		if(FriendCard_Common.getSkinType() == 3 || FriendCard_Common.getSkinType() == 4){
            setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);
        }else{
            setWgtLayout(_back, [0.99, 0.944], [0.5, 0.5], [0, 0]);
        }
		this._node_1 = _back.getChildByName("Node_1");


        //玩法头像
        this.initPlayerInfo(_back);
        this.initPanelCheckView(_back)

		var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if (FriendCard_Common.club_roleId) {
                    FriendCard_Common.club_roleId =null;
                }
                that.removeFromParent();
            }
        }, this);
        closeBtnAddLight(_close);

        this.Button_showReflash =  _back.getChildByName("roomRecordPanel").getChildByName("Button_showReflash");
        COMMON_UI.setNodeTextAdapterSize(this.Button_showReflash);
        this.Button_showReflash.visible = false;
        this.Button_showReflash.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.Button_showReflash.visible = false;
                this._lastId = -1;
                this.addItems(this._tempRtn.data.list);
                //更新底部信息
                this.updateBottomMsg(this._tempRtn);
            }
        }, this);
        this._listDataCount = 0;
        this._ListView =  _back.getChildByName("roomRecordPanel").getChildByName("list");
        var _listViewState = 0;
        var EVENT_AUTOSCROLL_ENDED = ccui.ScrollView.EVENT_AUTOSCROLL_ENDED;
        if (cc.sys.OS_WINDOWS == cc.sys.os || cc.ENGINE_VERSION.indexOf("3.16") >= 0)
            EVENT_AUTOSCROLL_ENDED = 12;
        this._ListView.addCCSEventListener(function(sender,type){
            switch (type) {
                case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                    _listViewState = 1;
                    break;
                case EVENT_AUTOSCROLL_ENDED:
                    if (_listViewState == 1)
                    {
                        that.reqRecord(data.info.clubId, that._lastId, that._gameType);
                    }
                    _listViewState = 0;
                    break;
            }
        });

        this._cell0 = _back.getChildByName("roomRecordPanel").getChildByName("item");  // 4人
        this._cell0.getChildByName("tableid").x += 10;//玩法名称最多可设八个字，调整位置
        //this._cell0.getChildByName("fangkaRebateText").x += 50;//玩法名称最多可设八个字，调整位置
        this._cell0.visible = false;

        this._itemTime = _back.getChildByName("roomRecordPanel").getChildByName("itemTime");  // 4人
        this._itemTime.visible = false;

        this._nullTip_text = _back.getChildByName("nullTip_text");
		if (this._nullTip_text)
		{
        	this._nullTip_text.visible = false;
		}
		this._text_record = _back.getChildByName("roomRecordPanel").getChildByName("Text_record");
        this._text_record.ignoreContentAdaptWithSize(true);
        if ((!this.isManager && !this.isGroupLeader))
        {
            this._text_record.setString("房间记录保留30天  战绩只保留3天");
        }else{
            if(this.isLMClub){
                this._text_record.setString("回放只保留5天");
            }
        }
        //选择玩法
        this.btnOtherFunc = _back.getChildByName("roomRecordPanel").getChildByName("btnOtherFunc");
        COMMON_UI.setNodeTextAdapterSize(this.btnOtherFunc);

        this.btnOtherFunc.visible = (!this.isManager && !this.isGroupLeader) || this.openType === "1";
        if(this.openPlayerInfo){
            this._gameType = this.openPlayerInfo.gameType;
            var gameName = this._gameType != -1 ? GameCnName[this._gameType] : "全部玩法";
            if(this.btnOtherFunc.getChildByName("Text")){
                this.btnOtherFunc.getChildByName("Text").setString(gameName);
            }else{
                this.btnOtherFunc.setTitleText(gameName);
            }
        }
        if(!this.openPlayerInfo || this._gameType == -1){
            this.btnOtherFunc.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Jilu_Xuanzewanfa", {uid: SelfUid()});
                    var data = {event:"ROOM_WANFA"};
                    data._gameTypeList = this._gameTypeList;
                    UI.node.addChild(new Friendcard_selectWanfa(data));
                }
            }, this);
        }

        popupAnm(_back);
        this.reqRecord(data.info.clubId, this._lastId, this._gameType);
        that.doAutoReflash();

	},
    doAutoReflash:function () {
        if(this.isManager || this.isGroupLeader){
            var that= this;
            //管理员15秒自动刷新
            this.stopActionByTag(20190304);
            this.runAction(cc.repeatForever(cc.sequence(cc.delayTime(15),cc.callFunc(function () {
                that.reqRecord(that._clubData.info.clubId, -1, that._gameType,"autoReflash");
            })))).setTag(20190304);
        }
    },
    //从亲友圈统计中打开, 显示玩家头像,  玩家头像初始化
    initPlayerInfo:function(back)
    {
        //this.openPlayerInfo
        var img_head = back.getChildByName("img_head");
        if(img_head && this.openType && this.openType === "1")
        {
            img_head.isMask = true;
            COMMON_UI.refreshHead(this, this.openPlayerInfo.headimgurl ? this.openPlayerInfo.headimgurl : "png/default_headpic.png", img_head);

            var  name = img_head.getChildByName("text_name");
            name.ignoreContentAdaptWithSize(true);
            name.setString(getNewName(unescape(this.openPlayerInfo.nickname)));
            name.setFontName("Arial");
            name.setFontSize(name.getFontSize());
            var id = img_head.getChildByName("text_id");
            id.ignoreContentAdaptWithSize(true);
            id.setString("ID："+this.openPlayerInfo.userId);

            img_head.visible = true;
        }
        else if(img_head)
        {
            img_head.visible = false;
        }
    },
    initPanelCheckView:function(_back) {
        var that = this;
        //Panel_playertongji_manager
        //修改年月日的EditBox配置
        var setEditBoxConfig = function(_parent,_child,str,MaxLength) {
            if(FriendCard_Common.getSkinType() == 3){
                _child.setFontColor(cc.color("#AD8F64"));
                _child.setPlaceholderFontColor(cc.color("#AD8F64"));
            }else if(FriendCard_Common.getSkinType() == 4){
                _child.setFontColor(cc.color("#b6b6b5"));
                _child.setPlaceholderFontColor(cc.color("#b6b6b5"));
            }else{
                _child.setFontColor(cc.color(0x77, 0x77, 0x77));
            }
            _child.setMaxLength(MaxLength);
            _child.setFontSize(20);
            _child.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            _child.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            _child.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            _child.setPlaceHolder(str);
            _child.setPlaceholderFontSize(20);
            _child.setPosition(_parent.getContentSize().width / 2, _parent.getContentSize().height / 2);
            _parent.addChild(_child);
        }.bind(this);
        //输入玩家ID
        var panel_check = _back.getChildByName("roomRecordPanel").getChildByName("panel_check");

        if(this.openType === "1")
            panel_check.visible = false;
        else
            panel_check.visible = this.isManager || this.isGroupLeader;

        var img_IDorName = panel_check.getChildByName("img_IDorName");
        this.img_IDorName = new cc.EditBox(img_IDorName.getContentSize(), new cc.Scale9Sprite("friendCards/tongji/inputbg.png"));
        setEditBoxConfig(img_IDorName, this.img_IDorName,"请输入ID",10);

        var nowTime = MjClient.getCurrentTime();
        var _start_Time = panel_check.getChildByName("image_date1_bg");
        var  point1 = _start_Time.convertToWorldSpace(_start_Time.getAnchorPointInPoints());

        point1.y = (point1.y-_start_Time.getBoundingBox().height/2);
        _start_Time.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var str =that._start_Time_date_txt.getString();
                str = str.replace(/-/g,"/");
                var date = new Date(str);
                var data = {event:"ROOM_start_Time_date_txt",date:date,px:point1.x,py:point1.y,WASD:"S"};
                that.uinode.addChild(new friendcard_selectTime(data));
            }
        }, this);
        this._start_Time_date_txt = _start_Time.getChildByName("Text_date_start");
        this._start_Time_date_txt.setTextHorizontalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER)
        this._start_Time_date_txt.setFontSize(this._start_Time_date_txt.getFontSize()-2)
        this._start_Time_date_txt.ignoreContentAdaptWithSize(true);
        this._setShowTime(this._start_Time_date_txt, nowTime[0], nowTime[1], nowTime[2], "00", "00");
        UIEventBind(null, this._start_Time_date_txt, "ROOM_start_Time_date_txt", function (eD) {
            this._setShowTime(this._start_Time_date_txt,eD.year,eD.month,eD.day,eD.hour,eD.minute);
        }.bind(this));

        var _end_Time = panel_check.getChildByName("image_date2_bg");
        var  point2 = _end_Time.convertToWorldSpace(_end_Time.getAnchorPointInPoints());
        point2.y = (point2.y-_end_Time.getBoundingBox().height/2);
        _end_Time.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var str =that._end_Time_date_txt.getString();
                str = str.replace(/-/g,"/");
                var date = new Date(str);
                var data = {event:"ROOM_end_Time_date_txt",date:date,px:point2.x,py:point2.y,WASD:"S"};
                that.uinode.addChild(new friendcard_selectTime(data));
            }
        }, this);
        this._end_Time_date_txt = _end_Time.getChildByName("Text_date_end");
        this._end_Time_date_txt.setTextHorizontalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER)
        this._end_Time_date_txt.setFontSize(this._end_Time_date_txt.getFontSize()-2)
        this._end_Time_date_txt.ignoreContentAdaptWithSize(true);

        var nextDate = new Date(nowTime[0],nowTime[1]-1,nowTime[2] + 1);
        var nextTime = MjClient.getCurrentTime(nextDate);
        this._setShowTime(this._end_Time_date_txt,nextTime[0],nextTime[1],nextTime[2],"00","00");

        UIEventBind(null, this._end_Time_date_txt, "ROOM_end_Time_date_txt", function (eD) {
            this._setShowTime(this._end_Time_date_txt,eD.year,eD.month,eD.day,eD.hour,eD.minute);
        }.bind(this));


        this.btn_check = panel_check.getChildByName("btn_check");
        this.btn_check.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.getData();
            }
        }, this);

        //玩法
        this.btn_wanFa = panel_check.getChildByName("btn_wanFa");
        COMMON_UI.setNodeTextAdapterSize(this.btn_wanFa);
        this.btn_wanFa.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var data = {event:"ROOM_WANFA"};
                data._gameTypeList = this._gameTypeList;

                that.uinode.addChild(new Friendcard_selectWanfa(data));
            }
        }, this);
        UIEventBind(null, this.btn_wanFa, "ROOM_WANFA", function (eD) {
            if (eD.gameType != -1){
                if(this.btnOtherFunc.getChildByName("Text")){
                    this.btnOtherFunc.getChildByName("Text").setString(eD.gameName);
                }else{
                    this.btnOtherFunc.setTitleText(eD.gameName);
                }
                if(this.btn_wanFa.getChildByName("Text")){
                    this.btn_wanFa.getChildByName("Text").setString(eD.gameName);
                }else{
                    this.btn_wanFa.setTitleText(eD.gameName);
                }
            }else{
                if(this.btnOtherFunc.getChildByName("Text")){
                    this.btnOtherFunc.getChildByName("Text").setString("全部玩法");
                }else{
                    this.btnOtherFunc.setTitleText("全部玩法");
                }
                if(this.btn_wanFa.getChildByName("Text")){
                    this.btn_wanFa.getChildByName("Text").setString("全部玩法");
                }else{
                    this.btn_wanFa.setTitleText("全部玩法");
                }
            }
            this._gameType = eD.gameType;
            this._selectedRenshu = eD.renshu;
            this.getData();
        }.bind(this));
    },
    _setShowTime:function(node,txt_1,txt_2,txt_3,txt_4,txt_5){
        if((txt_2+"").length < 2){
            txt_2 = "0"+txt_2;
        }
        if((txt_3+"").length < 2){
            txt_3 = "0"+txt_3;
        }
        if((txt_4+"").length < 2){
            txt_4 = "0"+txt_4;
        }
        if((txt_5+"").length < 2){
            txt_5 = "0"+txt_5;
        }
        node.setString(txt_1+"-"+txt_2+"-"+txt_3+"\n"+txt_4+":"+txt_5);
    },
    //校准时间的合法性
    is_RightData: function() {
        this._start_time = this._start_Time_date_txt.getString();
        this._end_time = this._end_Time_date_txt.getString();
        var time_1 = FriendCard_Common.transdate(this._start_time.substring(0,4),Number(this._start_time.substring(5,7))-1,this._start_time.substring(8,10),this._start_time.substring(11,13),this._start_time.substring(14,16));
        var time_2 = FriendCard_Common.transdate(this._end_time.substring(0,4),Number(this._end_time.substring(5,7))-1,this._end_time.substring(8,10),this._end_time.substring(11,13),this._end_time.substring(14,16));

        if(!time_1 || !time_2) return false;

        this._start_time_date = time_1 < time_2 ? time_1:time_2;
        this._end_time_date = time_1 > time_2 ? time_1:time_2;
        if(time_1  > time_2){
            var endTime = this._end_time;
            this._end_time = this._start_time;
            this._start_time = endTime;
        }
        return true;

        // this._start_time = this._start_Time_date_txt.getString();
        // this._end_time = this._end_Time_date_txt.getString();
        // var startDate = new Date(this._start_time);
        // var timezoneOffsetStartDay = startDate.getTimezoneOffset();
        // //因为默认使用的是标准时区转化为当前时区的时间
        // startDate.setTime(startDate.getTime() + timezoneOffsetStartDay * 60 * 1000);

        // var endDate = new Date(this._end_time);
        // var timezoneOffsetEndDay = endDate.getTimezoneOffset();
        // endDate.setTime(endDate.getTime() + timezoneOffsetEndDay * 60 * 1000);
        // var day_start = MjClient.dateFormat(startDate, "yyyy-MM-dd");
        // var day_end = MjClient.dateFormat(endDate, "yyyy-MM-dd");

        // if (day_start == this._start_time && day_end == this._end_time) {
        //     // 时间前后排序
        //     var time_1 = FriendCard_Common.transdate(this._start_time.substring(0,4),Number(this._start_time.substring(5,7))-1,this._start_time.substring(8,10),0);
        //     var time_2 = FriendCard_Common.transdate(this._end_time.substring(0,4),Number(this._end_time.substring(5,7))-1,this._end_time.substring(8,10),24);
        //     this._start_time_date = time_1 < time_2 ? time_1:time_2;
        //     this._end_time_date = time_1 > time_2 ? time_1:time_2;
        //     cc.log(" 一天的时间戳 ：", time_1 - time_2 )
        //     return true;
        // } else {
        //     cc.log(" day_start = "+day_start+ "day_end = "+day_end );
        //     cc.log(" this._start_time = "+this._start_time+ "this._end_time = "+this._end_time );
        //     return false;
        // }
    },

    getData:function () {
        this.reqRecord(this._clubData.info.clubId,-1,this._gameType);
    },
    //请求房间记录
	reqRecord: function(clubId,lastId,gameType,reflashType) {
		var that = this;

        var requestInfo =  {
            lastId: lastId == -1 ? null : lastId,
            gameType: gameType == -1 ? null : gameType
        };
        if(this.isLMClub){
            requestInfo.leagueId = clubId;
        }else{
            requestInfo.clubId = clubId;
        }
        if (this.openType === "1") {
            requestInfo.userId = this.openPlayerInfo.userId;
            requestInfo.startTime = this.openPlayerInfo.startTime;
            requestInfo.endTime = this.openPlayerInfo.endTime;
            requestInfo.max = this.openPlayerInfo.fensuData.max;
            requestInfo.min = this.openPlayerInfo.fensuData.min;
            requestInfo.groupId = this.openPlayerInfo.group;
        } else {
            if (this.is_RightData() && (this.isManager || this.isGroupLeader)) {//房间记录只有管理员可以选择时间段
                requestInfo.startTime = this._start_time_date;
                requestInfo.endTime = this._end_time_date;
                var oneDayTime = 86400000;
                if ((this._end_time_date - this._start_time_date) > oneDayTime * 7) {
                    if (reflashType != "autoReflash") {
                        MjClient.showToast("时间搜索跨度不能超过7天。")
                    }
                    return;
                }
            } else if((this.isManager || this.isGroupLeader)){
                MjClient.showToast("输入日期不合法")
                return;
            }
            //查询玩家ID
            if (this.img_IDorName && this.img_IDorName.getString().length > 2)
                requestInfo.userId = this.img_IDorName.getString();
            if(that.reqUserId){
                requestInfo.userId = that.reqUserId;
                requestInfo.startTime = that.reqInfo.startTime;
                requestInfo.endTime = that.reqInfo.endTime;
                that._start_Time_date_txt.setString(that.passUxinGetTime2(that.reqInfo.startTime));
                that._end_Time_date_txt.setString(that.passUxinGetTime2(that.reqInfo.endTime));
                if (this.img_IDorName)
                this.img_IDorName.setString(requestInfo.userId);
            }
            cc.log("requestInfo", that.reqUserId)
        }
        if (!(reflashType && reflashType == "autoReflash")) {
            MjClient.block();
        }

        if (this._selectedRenshu != -1) { //人数
            requestInfo.playerNum = this._selectedRenshu
        }

        var api = "";
        if (this._isByFCM) {
            api = this.isLMClub ? "pkplayer.handler.leagueMpGameRecord" : "pkplayer.handler.clubMpGameRecord";
        }
        else {
            api = this.isLMClub ? "pkplayer.handler.leagueGameRecord" : "pkplayer.handler.clubGameRecord";
        }

        cc.log(api + ":" + JSON.stringify(requestInfo));
		MjClient.gamenet.request(api,requestInfo,
			function(rtn) {
                MjClient.unblock();
                if (!cc.sys.isObjectValid(that))
                    return;
				if (rtn.code == 0) {

                    //贵州需要隐藏用户id
                    if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
                        var hideId = !(that.isManager || that.isGroupLeader);
                        for (var i = 0; i < rtn.data.list.length; i++) {
                            for (var j = 0; j < rtn.data.list[i].players.length; j++) {
                                var pl = rtn.data.list[i].players[j];
                                pl.isHideId = hideId && pl.userId != SelfUid();
                            }
                        }
                    }

                    if((reflashType && reflashType == "autoReflash")){
                        //自动刷新的先保存数据
                        that.checkHasNewData(rtn);
                    }else{
                        that._gameType = gameType;
                        that._lastId = lastId;
                        that.addItems(rtn.data.list);
                        //更新底部信息
                        that.updateBottomMsg(rtn);
                    }

				}
                else
                {
					if (rtn.message) {
						MjClient.showToast(rtn.message);

					} else {
						MjClient.showToast("获取数据失败,请重新打开");
					}
				}
				that.doAutoReflash();
			}
		);
	},
    checkHasNewData:function(rtn){
        var listData = rtn.data.list;
        if(listData && listData.length > 0){
            var tempFistId = listData[0].id;
        }else{
            var tempFistId = -1;
        }
        this.Button_showReflash.visible = (tempFistId != this._firstId);
        this._tempRtn = rtn;
    },
    //更新底部信息
    updateBottomMsg:function(rtn)
    {
        if ((this.isManager || this.isGroupLeader))
        {
            //从统计那里进来 显示的不一样
            if (this.openType === "1")
            {
                var str =this.openPlayerInfo.fensuData.text +"  ";
                if (this.openPlayerInfo.startTime && this.openPlayerInfo.endTime)
                    str += this.passUxinGetTime(this.openPlayerInfo.startTime)+" - "+this.passUxinGetTime(this.openPlayerInfo.endTime)+"  ";

                if("all" in rtn.data){
                    if( !this._gameType || this._gameType === -1 ){
                        str += "所有玩法: ";
                    }
                    else{
                        str += GameCnName[this._gameType] + ": ";
                    }
                    str += (rtn.data.all+"次");
                }
                str += "   回放只保留5天";
                this._text_record.setString(str);
            }
            else if(this.img_IDorName && this.img_IDorName.getString().length > 2)
            {
                this._text_record.setString("");
            }
            else
            {
                this._text_record.setString("回放只保留5天");
                /*if(this.isLMClub){
                    this._text_record.setString("回放只保留5天");
                }else{
                    var _str = "今日： " + rtn.data.today + "场       昨日：" + rtn.data.yesterday + "场";
                    this._text_record.setString(_str  + "   回放只保留5天");
                }*/
            }
        }
    },

    //通过时间戳来获得年月日
    passUxinGetTime:function(Uxin)
    {
        var date = new Date(Uxin);
        var Y = date.getFullYear() + '.';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
        var D = date.getDate() + ' ';
        var h = date.getHours();
        var m = date.getMinutes();
        // s = date.getSeconds();
        if (Number(h) <= 9)
            h = "0" + h
        if (Number(m) <= 9)
            m = "0" + m

        h += ':'
        return Y + M + D + h + m;
    },
    passUxinGetTime2:function(Uxin)
    {
        var date = new Date(Uxin);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours();
        var m = date.getMinutes();
        // s = date.getSeconds();
        if (Number(h) <= 9)
            h = "0" + 0
        if (Number(m) <= 9)
            m = "0" + 0

        h += ':'
        return Y + M + D + h + m;
    },
    sortLog: function(oneData)
    {
        var players = oneData.players;
        players.sort(function(p1, p2){
            return p2.score - p1.score;
        })
    },
    createItem:function(oneData)
    {
        this.sortLog(oneData);
        var copyNode = null;
        var WinerId = oneData.winner;
        copyNode = this._cell0.clone();


        copyNode.visible = true;

        this._numberRecord ++;

        var num = copyNode.getChildByName("num");
        num.ignoreContentAdaptWithSize(true);
        num.setString(this._numberRecord + "")

        var gameType = copyNode.getChildByName("gameType");
        gameType.ignoreContentAdaptWithSize(true);
        if (oneData.ruleName) {
            gameType.setString(unescape(oneData.ruleName));
        }
        else if ((MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) && oneData.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG){
            gameType.setString("六胡抢");
        } else if ((MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
             MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
             MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) && oneData.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA){
            gameType.setString("十胡卡");
        } else {
            gameType.setString(GameCnName[oneData.gameType]);
        }
        var gameName = gameType.getString();
        if(gameName.length >= 5){
            if(gameName.length < 6){
                gameType.setFontSize(gameType.getFontSize() - 3);
            }else{
                gameType.setFontSize(gameType.getFontSize() - 6);
            }
        }
        this._gameTypeList.push(oneData.gameType);
        var tableid = copyNode.getChildByName("tableid"); //roomNum
        tableid.ignoreContentAdaptWithSize(true);

        tableid.setString(" "+oneData.roomNum);//"房间ID:"+oneData.roomNum

        var fangkaRebateText = copyNode.getChildByName("fangkaRebateText");
        fangkaRebateText.ignoreContentAdaptWithSize(true);
        fangkaRebateText.setVisible(true);
        fangkaRebateText.setString("");
        if(oneData.fangkaRebate && ((this.isLMClub && this.isManager) ||  this.isCreator)){
            fangkaRebateText.setVisible(true);
            if(oneData.fangkaRebate == -1){
                fangkaRebateText.setString("免");
                fangkaRebateText.setTextColor(tableid.getTextColor());
            }else {
                fangkaRebateText.setString(oneData.fangkaRebate);
                if(FriendCard_Common.getSkinType() != 4){
                    fangkaRebateText.setTextColor(cc.color("#000000"));
                }
            }
        }

        if(oneData.matchScoreLimitUser && Object.keys(oneData.matchScoreLimitUser).length > 0){
            fangkaRebateText.setString(fangkaRebateText.getString() +"(低分解散)");
        }

        var huifang = copyNode.getChildByName("huifang");
        if (!huifang) {
            //有些地区前面有空格
            huifang = copyNode.getChildByName(" huifang");
        }
        if (huifang) {
            huifang.setVisible(oneData.playbackUrl?true:false);
        }

        if (oneData.roundNum && oneData.roundNum < 40 && oneData.roundBeen) {
            tableid.setString(" "+oneData.roomNum +" (" +oneData.roundBeen + "/" + oneData.roundNum + "" + ")");
        }

        function nameText(idx) {
            if (!oneData.players[idx]) {
                cc.log("Error:data.players is null");
                return "";
            }
            var _name = copyNode.getChildByName("player" + idx);
            //ID
            var playerID = _name.getChildByName("playerID");
            if(playerID)
            {
                playerID.ignoreContentAdaptWithSize(true);
                if(oneData.players[idx].isDiffClub || oneData.players[idx].isHideId){
                    playerID.setString("ID:"+FriendCard_Common.getHideIdStr(oneData.players[idx].userId));
                }else{
                    playerID.setString("ID:"+oneData.players[idx].userId);
                }
            }
            //分数
            var playerScore = _name.getChildByName("playerScore");
            if(Number(oneData.players[idx].score) > 0  && playerScore)
            {
                playerScore.ignoreContentAdaptWithSize(true);
                if(FriendCard_Common.getSkinType() != 4){
                    playerScore.setTextColor(cc.color("#AB3215"));
                }else{
                    playerScore.setTextColor(cc.color("#FF6F20"));
                }
                _name.zIndex = 1;
                if(oneData.players[idx].score != undefined) playerScore.setString(" +" + Number(oneData.players[idx].score));
            }
            else if(playerScore)
            {
                playerScore.ignoreContentAdaptWithSize(true);
                if(FriendCard_Common.getSkinType() != 4){
                    playerScore.setTextColor(cc.color("#0B9500"));
                }else{
                    playerScore.setTextColor(cc.color("#38AE6F"));
                }
                _name.zIndex = 1;
                if(oneData.players[idx].score != undefined) playerScore.setString(" " + Number(oneData.players[idx].score));
            }

            return getPlayerName(unescape(oneData.players[idx].nickname), 5);
        }

        var player0 = copyNode.getChildByName("player0");
        player0.ignoreContentAdaptWithSize(true);
        player0.setString(nameText(0));
        player0.setFontName("Arial");
        player0.setFontSize(25);

        var player1 = copyNode.getChildByName("player1");
        player1.ignoreContentAdaptWithSize(true);
        player1.setString(nameText(1));
        player1.setFontName("Arial");
        player1.setFontSize(25);

        var player2 = copyNode.getChildByName("player2");
        player2.ignoreContentAdaptWithSize(true);
        player2.setFontName("Arial");
        player2.setFontSize(25);
        if (oneData.players.length >= 3) {
            player2.setString(nameText(2));
        } else {
            player2.visible = false;
        }


        var player3 = copyNode.getChildByName("player3");
        player3.ignoreContentAdaptWithSize(true);
        player3.setFontName("Arial");
        player3.setFontSize(25);
        if (oneData.players.length >= 4) {
            player3.setString(nameText(3));
        } else {
            player3.visible = false;
        }

        var player4 = copyNode.getChildByName("player4");
		if (player4) {
	        player4.ignoreContentAdaptWithSize(true);
            player4.setFontName("Arial");
            player4.setFontSize(25);
	        if (oneData.players.length >= 5) {
	            player4.setString(nameText(4));
	        } else {
	            player4.visible = false;
	        }
		}

        if(isJinZhongAPPType())
        {
            var player5 = copyNode.getChildByName("player5");
    		if (player5) {
    	        player5.ignoreContentAdaptWithSize(true);
                player5.setFontName("Arial");
                player5.setFontSize(25);
    	        if (oneData.players.length >= 6) {
    	            player5.setString(nameText(5));
    	        } else {
    	            player5.visible = false;
    	        }
    		}
        }




        var time = copyNode.getChildByName("time");
        var _timeStr = MjClient.dateFormat(new Date(parseInt(oneData.createTime)), 'yyyy-MM-dd hh:mm:ss');
        time.ignoreContentAdaptWithSize(true);
        if (oneData.showTime) {
            time.setString(oneData.showTime);
        }else{
            time.setString(_timeStr);
        }

        copyNode.setTag(this._numberRecord);
        copyNode.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var playUrl = oneData.playbackUrl;
                if(!playUrl){
                    return;
                }
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Jilu_Chakanhuifang", {uid:SelfUid()});
                //var index = sender.getTag();
                //cc.log(" ========= index", index);
                this.reqRecord_one(oneData);
            }
        },this);

        var copyBtn = copyNode.getChildByName("copyBtn");
        if (copyBtn != null) {
            copyBtn.addTouchEventListener(function(sender, Type) {
                if (Type != ccui.Widget.TOUCH_ENDED)
                    return;

                copyPlayLogResult_friendCard(oneData);
            });
        }

        this._lastId = oneData.id;
        return copyNode;
    },
    createTimeItem:function(oneData)
    {
        var _timeStr = MjClient.dateFormat(new Date(parseInt(oneData.createTime)), 'yyyy-MM-dd');
        if(this._ListView._timeStr == _timeStr)
        {
            return;
        }
        var copyNode = null;
        copyNode = this._itemTime.clone();
        this._ListView._timeStr = _timeStr
        copyNode.visible = true;

        var text_time = copyNode.getChildByName("text_time");
        text_time.ignoreContentAdaptWithSize(true);
        text_time.setString(_timeStr);
        this._ListView.pushBackCustomItem(copyNode);

    },
    //房间记录
    addItems:function(data)
    {
        if (this._lastId == -1) {
            this._ListView.removeAllItems();
            this._numberRecord = 0;
            this._listDataCount = 0;
            this._ListView._timeStr = ""
            this._firstId = -1;
        }

        this._listDataCount += data.length;
        var _len = this._ListView.getItems().length;
        //将房间记录列表当天倒叙排列
        data.sort(function(a, b) {
             return b.createTime - a.createTime;
        });
        for(var i = 0;i < data.length ;i++)
        {
            if(i == 0 && _len == 0){
                this._firstId = data[i].id;
            }
            this.createTimeItem(data[i]);
            this._ListView.pushBackCustomItem(this.createItem(data[i]));
        }

        this._ListView.jumpToItem(_len, cc.p(0.5, 1.0), cc.p(0.5, 1.0));

        if (this._listDataCount == 0)
        {
            if (this._nullTip_text)
            {
                this._nullTip_text.visible = true;
            }
            else
            {
                // MjClient.showToast("已显示所有房间记录");
            }
        }
        else
        {
            if(this._nullTip_text)
                this._nullTip_text.visible = false;
        }
    },
    reqRecord_one: function(oneData) {
        var playUrl = oneData.playbackUrl;
        if(!playUrl){
            MjClient.showToast("文件已过期，不能回放");
            return;
        }
        var _timeStr = MjClient.dateFormat(new Date(parseInt(oneData.createTime)), 'yyyy-MM-dd hh:mm:ss');
        for (var i = 0; i < oneData.players.length; i++)
        {
            oneData.players[i].uid = oneData.players[i].userId;
        }
        oneData.tableid = oneData.roomNum;
        oneData.gametype = oneData.gameType;
        oneData.now = _timeStr;
        oneData.isClub = true;
        playLogInfoItem = oneData;
        var dialog = new UnclosedTipLayer("正在获取回放数据，请不要离开游戏");
        MjClient.Scene.addChild(dialog);
        var xhr = cc.loader.getXMLHttpRequest();
        //var playUrl = GamePlaybackUrlPrefix[MjClient.getAppType()] + _timeStr.substr(0, 10) + "/" + this._clubData.info.creator + "_" + oneData.roomNum + ".json";
        cc.log(" ==== playUrl : ", playUrl);
        xhr.open("GET", playUrl);
        xhr.onreadystatechange = function() {
            if(cc.sys.isObjectValid(dialog)) dialog.removeFromParent();
            if (xhr.readyState == 4 && xhr.status == 200) {
                var rep = null;
                try {
                    rep = JSON.parse(xhr.responseText);
                } catch (e) {
                    rep = null;
                    MjClient.showToast("网络不好，请稍后再试.");
                }
                if (rep)
                {
                    var keys = Object.keys(rep[0].data.players);
                    if (keys.indexOf(SelfUid() + "") == -1)
                    {
                        MjClient.otherReplayUid = Number(keys[0]); // 代理查看其他牌局的视角
                        FriendCard_Common.club_roleId = Number(keys[0]);
                    }
                    MjClient.playLogOne(rep);
                }
            }
        };
        xhr.onerror = function(event) {
            if(cc.sys.isObjectValid(dialog)) dialog.removeFromParent();
            MjClient.showToast("网络请求错误，请稍后再试...");
        };
        xhr.ontimeout = function (event)
        {
            if(cc.sys.isObjectValid(dialog)) dialog.removeFromParent();
            MjClient.showToast("网络超时，请稍后再试");
        };
        xhr.onabort = function (event)
        {
            if(cc.sys.isObjectValid(dialog)) dialog.removeFromParent();
            MjClient.showToast("网络请求中断，请稍后再试");
        };
        xhr.timeout = 5000; //5s超时
        xhr.send();
    },

    onExit: function () {
        if(FriendCard_Common.getSkinType() == 3 && MjClient.FriendCard_main_ui)
        {
            MjClient.FriendCard_main_ui.bottomBtnDelLight()
        }
        this._super();
    },
});

//管理记录
var FriendCard_managerRecordJZ = cc.Layer.extend({
    ctor: function(data,openType) {
        this._super();
        this._clubData = data;
        this._opeLastId = -1; //操作记录LastID
        this._opeNumberRecord = 0; //操作
        this.isManager = FriendCard_Common.isManager(this._clubData.info);

        //openType = 1是从玩家统计中打开
        if( openType )
        {
            this.openType = openType;
            this.openPlayerInfo = data.openPlayerInfo;
        }
        else
        {
            this.openType = null;
            this.openPlayerInfo = null;
        }


        var UI = ccs.load("friendcard_manageRecord.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [0.99, 0.944], [0.5, 0.5], [0, 0]);

        popupAnm(_back);

        this._node_1 = _back.getChildByName("Node_1");

        this.initBtns(_back)
        //操作记录 and 操作记录按钮和房间记录按钮
        this.initOpeRecord(_back);
        this.onClickBtn(0);

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if (FriendCard_Common.club_roleId) {
                    FriendCard_Common.club_roleId =null;
                }
                that.removeFromParent();
            }
        }, this);
        closeBtnAddLight(_close);


    },
    initBtns:function(_back)
    {
        var btn_quanbu = _back.getChildByName("btn_quanbu");
        var btn_chengyuan = _back.getChildByName("btn_chengyuan");
        var btn_fangjian = _back.getChildByName("btn_fangjian");
        var btn_wanfa = _back.getChildByName("btn_wanfa");
        var btn_qita = _back.getChildByName("btn_qita");
        var btn_chazhao = _back.getChildByName("btn_chazhao");

        this.btnList = [btn_quanbu,btn_chengyuan,btn_fangjian,btn_wanfa,btn_qita];

        var inputimg = _back.getChildByName("inputimg");

        this.playerID = new cc.EditBox(cc.size(inputimg.width, inputimg.height), new cc.Scale9Sprite("friendCards/manageRecord/img_input.png"));
        if(FriendCard_Common.getSkinType() == 1) {
            this.playerID.setFontColor(cc.color("#8d8c8c"));
        }else if(FriendCard_Common.getSkinType() == 2){
            this.playerID.setFontColor(cc.color("#443333"));
        }else if(FriendCard_Common.getSkinType() == 4){
            this.playerID.setFontColor(cc.color("#b6b6b5"));
        }else {
            this.playerID.setFontColor(cc.color("#ad8f64"));
        }
        this.playerID.setFontSize(20);
        this.playerID.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this.playerID.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        this.playerID.setFontName("fonts/lanting.TTF");
        this.playerID.setPlaceHolder("请输入玩家ID");
        this.playerID.setPlaceholderFontSize(20);
        this.playerID.setPosition(inputimg.getContentSize().width / 2, inputimg.getContentSize().height / 2);

        inputimg.addChild(this.playerID)
        for (var i = 0; i < this.btnList.length; i++) {
            this.btnList[i]._index = i;
            this.btnList[i].addTouchEventListener(function(sender, type) {
                if (type == 2)
                {
                    this.onClickBtn(sender._index)
                }
            }, this);
        }

        btn_chazhao.addTouchEventListener(function(sender, type) {
            if (type == 2)
            {
                this._opeLastId = -1;
                this.reqOpeRecord(this._clubData.info.clubId,this._opeLastId);
            }
        }, this);
    },
    onClickBtn:function(index)
    {
        if(!this.btnList) return;

        for (var i = 0; i < this.btnList.length; i++) {
            this.btnList[i].setEnabled(true);
        }
        this.btnList[index].setEnabled(false);

        this.modeIndex = index;
        this._opeLastId = -1;
        this.reqOpeRecord(this._clubData.info.clubId,this._opeLastId);
    },
    //init操作记录
    initOpeRecord:function(_back)
    {
        var that = this;
        this.opeRecordPanel = _back.getChildByName("opeRecordPanel");
        this.opeList = this.opeRecordPanel.getChildByName("list");
        this.opeItem = this.opeRecordPanel.getChildByName("item");
        this.opeItem.visible = false;
        this.opeList.setItemsMargin(0);

        this.roomRecordPanel = _back.getChildByName("roomRecordPanel");

        var _opelistViewState = 0;

        // **新老引擎bug**
        var EVENT_AUTOSCROLL_ENDED = ccui.ScrollView.EVENT_AUTOSCROLL_ENDED;
        if (cc.sys.OS_WINDOWS == cc.sys.os || cc.ENGINE_VERSION.indexOf("3.16") >= 0)
            EVENT_AUTOSCROLL_ENDED = 12;
        this.opeList.addCCSEventListener(function(sender,type){
            switch (type) {
                case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                    _opelistViewState = 1;
                    break;
                case EVENT_AUTOSCROLL_ENDED:
                    if (_opelistViewState == 1)
                    {
                        that.reqOpeRecord(that._clubData.info.clubId,that._opeLastId);
                    }
                    _opelistViewState = 0;
                    break;
            }
        });
    },
    //请求操作记录
    reqOpeRecord: function(clubId,lastId) {
        var that = this;
        MjClient.block();
        var requestInfo =  {clubId: clubId, lastId: lastId == -1 ? null : lastId};
        requestInfo.mode = this.modeIndex ? this.modeIndex : 0;
        var userId = this.playerID.getString();
        if(userId.length >= 6)
            requestInfo.userId = userId;
        else if(userId.length > 0 )
            MjClient.showToast("请输入玩家正确ID");

        var jiekouName = "pkplayer.handler.clubActionRecord";
        if (requestInfo.clubId <= 9999) {
            jiekouName = "pkplayer.handler.leagueActionRecord"
            requestInfo.leagueId = requestInfo.clubId
        }
        MjClient.gamenet.request(jiekouName,requestInfo,
            function(rtn) {
                MjClient.unblock();
                if (!cc.sys.isObjectValid(that))
                    return;

                if (rtn.code == 0) {
                    cc.log(" =====pkplayer.handler.clubActionRecord  === " + JSON.stringify(rtn.data));
                    that._opeLastId = lastId;
                    that.addOpeItems(rtn.data);
                }
                else
                {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);

                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }
                }
            }
        );
    },
    createOpeItem:function(oneData)
    {
        var copyNode = this.opeItem.clone();
        copyNode.visible = true;
        this._opeNumberRecord ++;

        var time = copyNode.getChildByName("time");
        time.ignoreContentAdaptWithSize(true);
        time.setString(oneData.time.substring(0,10));

        var time1 = copyNode.getChildByName("time1");
        time1.ignoreContentAdaptWithSize(true);
        time1.setString(oneData.time.substring(11));

        var info = copyNode.getChildByName("info"); //roomNum
        info.ignoreContentAdaptWithSize(true);
        info.setString(getNewName_new(unescape(oneData.title), 21));//unescape
        copyNode.getChildByName("btn_xiangqing").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Renwu_Guanlijilu_Xiangqing", {uid: SelfUid()});
                MjClient.Scene.addChild(new UnclosedTipLayer_New(oneData.content));
            }
        },this);

        this._opeLastId = oneData.id;
        return copyNode;
    },
    //添加操作记录Item
    addOpeItems:function(data)
    {
        if (this._opeLastId == -1) {
            this.opeList.removeAllItems();
            this._opeNumberRecord = 0;
        }

        this.opeRecordPanel.removeChildByName("emptyTextTip");
        if ((!data || data.length <= 0) && this.opeList.getItems().length <= 0){
            var emptyTxt = new ccui.Text();
            emptyTxt.setFontName("fonts/lanting.TTF");
            emptyTxt.setFontSize(30);
            emptyTxt.setString("暂无数据");
            emptyTxt.setColor(cc.color(0x79, 0x34, 0x12));
            emptyTxt.setName("emptyTextTip");
            emptyTxt.setPosition(this.opeRecordPanel.width/2,this.opeRecordPanel.height/2);
            this.opeRecordPanel.addChild(emptyTxt);
        }

        if (data.length <= 0)
            return;

        var _len = this.opeList.getItems().length;
        for(var i = 0;i < data.length ;i++)
        {
            this.opeList.pushBackCustomItem(this.createOpeItem(data[i]));
        }

        this.opeList.forceDoLayout();
        if (_len > 0 && data.length > 0) {
            this.opeList.jumpToItem(_len - 1, cc.p(0.5, 0.0), cc.p(0.5, 0.0));
            this.opeList.scrollToItem(_len, cc.p(0.5, 0.0), cc.p(0.5, 0.0));
        }
    },
});


