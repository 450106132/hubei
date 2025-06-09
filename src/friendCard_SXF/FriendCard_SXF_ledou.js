// 亲友圈-乐豆管理
var FriendCard_SXF_ledou = cc.Layer.extend({
    ctor:function(clubInfo,roleId) {
        this._super();
        MjClient.FriendCard_SXF_ledou = this;
        this.clubData = clubInfo
        this.clubInfo = clubInfo.info
        this.roleId = roleId
        var node = ccs.load("friendcard_SXF_ledou.json").node;
        this.node = node
        this.addChild(node);
        var back = node.getChildByName("back");
        this.back = back;
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        setWgtLayout(node.getChildByName("block"), [1, 1], [0.5, 0.5], [0, 0], true);
        COMMON_UI.setNodeTextAdapterSize(back);
        this.init(back)
        if(this.roleId == 1 || this.roleId == 2 || this.roleId == 3 ||this.roleId == 10){
            this.btnCallBack(0)
            // if(this.roleId == 2 || this.roleId == 3 || this.roleId == 10){
            //     this.refreshBtnByHideList([4])
            // }
            let temp = [4,5];
            this.refreshBtnByHideList(temp)
        }else{
            this.btnCallBack(1)
            this.refreshBtnByHideList([0,2,3,4,5,6])
        }
    },
    init:function(back){
        var btn_close = back.getChildByName("btn_close")
        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true)
            }
        },this);
        this.btnlist = []
        var btnNameList = [
            "btn_ldgl",//乐豆管理
            "btn_czrz",//操作日志
            "btn_wdgx",//我的贡献
            "btn_gxjl",//贡献记录
            "btn_xptj",//洗牌统计
            "btn_zzlb",//组长列表
            "btn_mrtj",//会员统计
        ]
        var leftBg = back.getChildByName("Panel_leftBg")
        for(var i = 0;i < btnNameList.length;i++){
            var btn = leftBg.getChildByName(btnNameList[i])
            this.btnlist.push(btn)
            let index = i
            btn.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    this.btnCallBack(index)
                }
            },this);
        }

        // this._gameTypeList = [];
        // this._gameType = -1;
        // this._selectedRenshu = -1;
        // this.isGroupLeader = FriendCard_Common.isGroupLeader(this.clubInfo);
        // this.isAssistants = FriendCard_Common.isAssistants(this.clubInfo);
    },
    btnCallBack:function(index){
        this.updateBtnEnabled(index)
        this.updateUIByBtnIndex(index)
    },
    refreshBtnByHideList:function(hideList){
        if(hideList && hideList.length > 0){
            var posList = []
            for(var i = 0;i < this.btnlist.length;i++){
                posList.push(this.btnlist[i].getPosition())
            }
            cc.log("posList = ",JSON.stringify(posList));
            for(var i = 0;i < hideList.length; i++){
                this.btnlist[hideList[i]].setVisible(false)
            }
            var num = 0
            for(var i = 0;i < this.btnlist.length; i++){
                if(this.btnlist[i].visible){
                    this.btnlist[i].setPosition(posList[num])
                    num = num + 1
                }
            }
        }
    },
    updateBtnEnabled:function(index){
        if(this.btnlist && this.btnlist.length > 0){
            for(var i = 0;i < this.btnlist.length;i++){
                if(this.btnlist[i]){
                    if(i == index){
                        this.btnlist[i].setEnabled(false);
                    }
                    else{
                        this.btnlist[i].setEnabled(true);
                    }
                }
            }
        }
    },
    updateUIByBtnIndex:function(index){
        var panelList = [
            "Panel_ldgl",//乐豆管理
            "Panel_czrz",//操作日志
            "Panel_wdgx",//我的贡献
            "Panel_gxjl",//贡献记录
            "Panel_xptj",//洗牌统计
            "Panel_zzlb",//组长列表
            "Panel_mrtj",//会员统计
        ]
        for(var i = 0;i < panelList.length;i++){
            this.back.getChildByName(panelList[i]).setVisible(false)
        }
        var panel_now = this.back.getChildByName(panelList[index])
        panel_now.setVisible(true)

        var that = this
        var thatParent = MjClient.FriendCard_main_ui;
        this.xiajiList = []

        if(index == 0){
            var cell = panel_now.getChildByName("listCell")
            var listView_info = panel_now.getChildByName("ListView_info")
            var panel_xiaji = panel_now.getChildByName("Panel_xiaji")
            var btnSetWarnLeDou = panel_now.getChildByName("btnSetWarnLeDou")
            // btnSetWarnLeDou.setVisible(false);
            panel_xiaji.setVisible(false)
            listView_info.removeAllItems();


            var panel_gxbl = panel_now.getChildByName("Panel_gxbl")
            panel_gxbl.setVisible(false)

            // var btnSetWarnScore = _panel.getChildByName("btnSetWarnScore");
            // if (btnSetWarnLeDou) {
            //     btnSetWarnLeDou.visible = false;
            // }
            // if(MjClient.isWarnScoreOpen() && (FriendCard_Common.isLeader() || FriendCard_Common.isLMChair() || FriendCard_Common.isGroupLeader())){
            //     if (!btnSetWarnLeDou) {
            //         btnSetWarnLeDou = new ccui.Button("friendCards/warnScore/btn_wanrScoreSet.png");
            //         _panel.addChild(btnSetWarnLeDou);
            //         btnSetWarnLeDou.setAnchorPoint(cc.p(1, 0));
            //         if (FriendCard_Common.getSkinType() == 1) {
            //             btnSetWarnLeDou.setPosition(cc.p(_panel.width-40, -50));
            //         }else if(FriendCard_Common.getSkinType() == 4){
            //             btnSetWarnLeDou.setPosition(cc.p(_panel.width-40, 20));
            //         }else{
            //             btnSetWarnLeDou.setPosition(cc.p(_panel.width-40, 5));
            //         }
            //     }
            //     btnSetWarnLeDou.visible = true;
                btnSetWarnLeDou.addTouchEventListener(function (sender, type) {
                    if (type == 2) {
                        MjClient.FriendCard_main_ui.addChild(new FriendCard_WarnScore(that.clubInfo));
                    }
                }, this);
            // }

            //这是客户端发过去要求的条数，服务端可以不用动
            //做分分页的话这里不用动，
            //修改currcnt就可以了，
            //currcnt就是从第几条开始
            //currcnt = 页数*panel_now._prePageLength
            panel_now._prePageLength = 200;//本地测试分页
            if (cc.sys.OS_WINDOWS != cc.sys.os) {
                panel_now._prePageLength = 200;
            }

            this.refresClubHappyBeanPlayerList = function(data,playerInfo){
                if(playerList == null || playerList.length <= 0){
                    // return;
                }

                var ledouNum = panel_now.getChildByName("Text_ledouNum")
                var ledouNum_team = panel_now.getChildByName("Text_ledouNum_team")
                ledouNum.setString("我的乐豆：" + data.myHappyBean)
                ledouNum_team.setString("团队乐豆：" + data.myTeamHappyBean)

                thatParent.refreshHappyBean(data.myHappyBean)

                var playerList = data.playerList
                var listView_info = panel_now.getChildByName("ListView_info")
                var listView_xiajiinfo = panel_xiaji.getChildByName("ListView_xiajiinfo")
                var listView_now;
                listView_info.removeAllItems();
                listView_xiajiinfo.removeAllItems();
                if(playerInfo != null){
                    panel_xiaji.setVisible(true)
                    listView_info.setVisible(false)
                    listView_now = listView_xiajiinfo
                    var name = getPlayerName(unescape(playerInfo.nickname))
                    var str = "合伙人 " + name + "（" + playerInfo.userId + "）所属下级"
                    var text_xiaji = panel_xiaji.getChildByName("Text_xiaji")
                    text_xiaji.setString(str)

                    var btn_back = panel_xiaji.getChildByName("btn_back")
                    btn_back.addTouchEventListener(function(sender, type){
                        if (type == 2) {
                            if(that.xiajiList && that.xiajiList.length >= 2){
                                that.xiajiList.pop()
                                that.rquestClubHappyBeanPlayerList(0,0,that.xiajiList[that.xiajiList.length-1])
                            }
                            else{
                                that.xiajiList = []
                                that.rquestClubHappyBeanPlayerList()
                            }
                        }
                    });
                }
                else{
                    panel_xiaji.setVisible(false)
                    listView_info.setVisible(true)
                    listView_now = listView_info
                }
                for(var i = 0 ; i < playerList.length ; i++){
                    var item = cell.clone();
                    listView_now.pushBackCustomItem(item);
                    var text_name = item.getChildByName("Text_name");
                    var text_id = item.getChildByName("Text_ID");
                    var text_ledouNum = item.getChildByName("Text_ledouNum");
                    var text_ledouNumTeam = item.getChildByName("Text_ledouNum_Team");
                    text_name.setString(getPlayerName(unescape(playerList[i].nickname)));
                    text_id.setString("ID:" + playerList[i].userId);
                    text_ledouNum.setString(playerList[i].happyBean)
                    text_ledouNumTeam.setString(playerList[i].myTeamHappyBean)

                    // if (itemData.isDirectly == 1){//直属会员
                    //     if(FriendCard_Common.getSkinType() == 3){
                    //         text_id.setTextColor(cc.color("#04a013"));
                    //     }else{
                    //         text_id.setTextColor(cc.color("#4d58b6"));
                    //     }
                    // }
                    // if(itemData.isAgent) {//是否代理
                    //     if(FriendCard_Common.getSkinType() == 3){
                    //         text_id.setTextColor(cc.color("#d33c00"));
                    //     }else{
                    //         text_id.setTextColor(cc.color("#ab3215"));
                    //     }
                    // }

                    var text_rank = item.getChildByName("Text_rank");
                    text_rank.setString("")
                    var roleIdlist = [1,2,3,10]
                    var textlist = ["管理员","组长","会长","合伙人"]
                    for(var j = 0 ; j < roleIdlist.length ; j++){
                        if(roleIdlist[j] == playerList[i].roleId){
                            text_rank.setString(textlist[j])
                        }
                    }

                    var head = item.getChildByName("Image_head");
                    head.isMask = true;
                    that.refreshHead(playerList[i].headimgurl ? playerList[i].headimgurl : "png/default_headpic.png", head);

                    var btn_xiaji = item.getChildByName("btn_xiaji");
                    var btn_fafang = item.getChildByName("btn_fafang");
                    var btn_huishou = item.getChildByName("btn_huishou");
                    var btn_gxbl = item.getChildByName("btn_gxbl");

                    let playerInfo = playerList[i]

                    if(playerList[i].roleId != 2 && playerList[i].roleId != 10 && playerList[i].roleId != 1){
                        btn_xiaji.setVisible(false)
                    }
                    else{
                        btn_xiaji.addTouchEventListener(function(sender, type) {
                            if (type == 2) {
                                that.xiajiList.push(playerInfo)
                                that.rquestClubHappyBeanPlayerList(0,0,playerInfo)
                            }
                        });
                    }
                    if(playerList[i].roleId == 3){
                        btn_huishou.setVisible(false);
                        btn_fafang.setVisible(false);
                    }
                    cc.log("(playerList[i].userId:", (playerList[i].userId));
                    cc.log("(MjClient.data.pinfo.uid:", MjClient.data.pinfo.uid);
                    if(playerList[i].userId == MjClient.data.pinfo.uid){
                        btn_huishou.setVisible(false);
                        btn_fafang.setVisible(false);
                        btn_xiaji.setVisible(false)
                        btn_gxbl.setVisible(false)
                    }
                    if(playerList[i].roleId != 2 && playerList[i].roleId != 10 && playerList[i].roleId != 1){
                        btn_gxbl.setVisible(false)
                    }
                    else{
                        btn_gxbl.addTouchEventListener(function(sender, type) {
                            if (type == 2) {
                                // that.bili.setString("")
                                // that.playerInfo_gxbl = playerInfo
                                // that.rquestGetPartnerCommission(2,playerInfo.userId)
                                // panel_gxbl.setVisible(true)
                                that.addChild(new FriendCard_SXF_ledou_gxbl(that.clubInfo.clubId,playerInfo.userId,that.roleId,callback));
                            }
                        });
                    }
                    var callback = function(){
                        if(that.xiajiList && that.xiajiList.length >= 1){
                            that.rquestClubHappyBeanPlayerList(0,0,that.xiajiList[that.xiajiList.length])
                        }
                        else{
                            that.rquestClubHappyBeanPlayerList()
                        }
                    }
                    btn_fafang.addTouchEventListener(function(sender, type){
                        if (type == 2) {
                            that.addChild(new FriendCard_SXF_ledou_operate(that.clubInfo.clubId,playerInfo,1,callback));
                        }
                    });
                    btn_huishou.addTouchEventListener(function(sender, type){
                        if (type == 2) {

                            that.addChild(new FriendCard_SXF_ledou_operate(that.clubInfo.clubId,playerInfo,2,callback));
                        }
                    });
                }
            }

            this.rquestClubHappyBeanPlayerList = function(keyword,length,playerInfo,searchid){
                var userId = 0
                var alreadyCount = 0
                var searchId = 0
                if(playerInfo){
                    userId = playerInfo.userId
                }
                if(keyword){
                    alreadyCount = keyword
                }
                if(searchid){
                    searchId = searchid
                }
                var sendInfo = {
                    clubId: this.clubInfo.clubId,
                    currcnt: alreadyCount,
                    length:panel_now._prePageLength,
                    parentUserId:userId,
                    userId:searchId
                }
                cc.log("clubId = " + sendInfo.clubId + ",currcnt = " + sendInfo.currcnt + ",length" + sendInfo.length + ",parentUserId" + sendInfo.parentUserId)
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.clubHappyBeanPlayerList", sendInfo, function(rtn) {
                    MjClient.unblock();
                    cc.log(" ===== pkplayer.handler.clubHappyBeanPlayerList === " + JSON.stringify(rtn))
                    if (rtn.code == 0) {
                        var data = rtn.data  ? rtn.data : [];
                        that.refresClubHappyBeanPlayerList(data,playerInfo)
                    }else{
                        if(rtn.message){
                            MjClient.showMsgTop(rtn.message);
                        }
                    }
                });
            }


            this.rquestSetPartnerCommission = function(setType,setUserId,setCommission){
                var sendInfo = {
                    type: setType,
                    clubId: this.clubInfo.clubId,
                    userId:setUserId,
                    commission:setCommission,
                }
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.SetPartnerCommission", sendInfo, function(rtn) {
                    MjClient.unblock();
                    cc.log(" ===== pkplayer.handler.SetPartnerCommission === " + JSON.stringify(rtn))
                    if (rtn.code == 0) {
                        // mylog("设置贡献比例成功")
                        MjClient.showToast("操作成功");
                    }else{
                        if(rtn.message){
                            MjClient.showMsgTop(rtn.message);
                        }
                    }
                });
            }

            this.rquestGetPartnerCommission = function(getType,getUserId){
                var sendInfo = {
                    type: getType,
                    clubId: this.clubInfo.clubId,
                    userId:getUserId,
                }
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.GetPartnerCommission", sendInfo, function(rtn) {
                    MjClient.unblock();
                    cc.log(" ===== pkplayer.handler.GetPartnerCommission === " + JSON.stringify(rtn))
                    if (rtn.code == 0) {
                        if(rtn.data && rtn.data[0].parentCommission){
                            that.bili.setString(rtn.data[0].parentCommission + "")
                        }
                    }else{
                        if(rtn.message){
                            MjClient.showMsgTop(rtn.message);
                        }
                    }
                });
            }

            var playerID = panel_now.getChildByName("Image_playerID");
            if(this.playerID){
                this.playerID.removeFromParent(true)
            }
            this.playerID = new cc.EditBox(playerID.getContentSize(), new cc.Scale9Sprite("friendCards/tongji/inputbg.png"));
            this.playerID.setPlaceholderFontSize(30);
            this.playerID.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            this.playerID.setPlaceHolder("请输入玩家ID");
            this.playerID.setPosition(playerID.getContentSize().width/2, playerID.getContentSize().height/2);
            this.playerID.setFontColor(cc.color("#9f6a36"));
            playerID.addChild(this.playerID);
            this.playerID.setDelegate(this);

            var bili = panel_gxbl.getChildByName("Image_bili");
            if(this.bili){
                this.bili.removeFromParent(true)
            }
            this.bili = new cc.EditBox(bili.getContentSize(), new cc.Scale9Sprite("friendCards/tongji/inputbg.png"));
            this.bili.setPlaceholderFontSize(30);
            this.bili.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            this.bili.setPlaceHolder("请输入数额");
            this.bili.setPosition(bili.getContentSize().width/2, bili.getContentSize().height/2);
            this.bili.setFontColor(cc.color("#9f6a36"));
            bili.addChild(this.bili);
            this.bili.setDelegate(this);

            this.editBoxEditingDidEnd = function (editBox) {
                // if(editBox.name == "playerID" && this.playerID.getString() != ""){
                //     this.playerID.setString(Number(this.playerID.getString()))
                // }
                // if(editBox.name == "bili" && this.bili.getString() != ""){
                //     this.bili.setString(Number(this.bili.getString()))
                // }
                if(editBox.getString() != ""){
                    editBox.setString(Number(editBox.getString()))
                }
            };

            var btn_find = panel_now.getChildByName("btn_find")
            btn_find.addTouchEventListener(function(sender, type){
                if (type == 2) {
                    var id = Number(that.playerID.getString());
                    if (!id || id < 1000)
                    {
                        MjClient.showToast("请输入正确的玩家id！");
                        return;
                    }
                    that.rquestClubHappyBeanPlayerList(0,0,null,id)
                    that.playerID.setString("")
                }
            });

            var btn_allMember = panel_now.getChildByName("btn_allMember")
            btn_allMember.addTouchEventListener(function(sender, type){
                if (type == 2) {
                    that.xiajiList = []
                    that.rquestClubHappyBeanPlayerList()
                }
            });

            var btn_ok = panel_gxbl.getChildByName("btn_ok")
            btn_ok.addTouchEventListener(function(sender, type) {
                if (type == 2 && panel_gxbl != null) {
                    if(that.bili.getString() != "" && that.playerInfo_gxbl != null){
                        that.rquestSetPartnerCommission(2,that.playerInfo_gxbl.userId,that.bili.getString())
                    }
                    that.playerInfo_gxbl = null
                    panel_gxbl.setVisible(false)
                }
            });
            var btn_no = panel_gxbl.getChildByName("btn_no")
            btn_no.addTouchEventListener(function(sender, type) {
                if (type == 2 && panel_gxbl != null) {
                    that.playerInfo_gxbl = null
                    panel_gxbl.setVisible(false)
                }
            });

            this.rquestClubHappyBeanPlayerList()
        }
        else if(index == 1){
            var playerID = panel_now.getChildByName("Image_playerID");
            if(this.playerID){
                this.playerID.removeFromParent(true)
            }
            this.playerID = new cc.EditBox(playerID.getContentSize(), new cc.Scale9Sprite("friendCards/tongji/inputbg.png"));
            this.playerID.setPlaceholderFontSize(30);
            this.playerID.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            this.playerID.setPlaceHolder("请输入玩家ID");
            this.playerID.setPosition(playerID.getContentSize().width/2, playerID.getContentSize().height/2);
            this.playerID.setFontColor(cc.color("#9f6a36"));
            playerID.addChild(this.playerID);
            this.playerID.setDelegate(this);

            this.editBoxEditingDidEnd = function (editBox) {
                if(this.playerID.getString() != ""){
                    this.playerID.setString(Number(this.playerID.getString()))
                }
            };

            var btn_find = panel_now.getChildByName("btn_find")
            btn_find.addTouchEventListener(function(sender, type){
                if (type == 2) {
                    var id = Number(that.playerID.getString());
                    if (!id || id < 1000)
                    {
                        MjClient.showToast("请输入正确的玩家id！");
                        return;
                    }
                    // that.rquestClubHappyBeanPlayerList(0,0,null,id)
                    that.playerID.setString("")
                }
            });

            var btn_fafang = panel_now.getChildByName("btn_fafang")
            var btn_huishou = panel_now.getChildByName("btn_huishou")
            var Text_title3 = panel_now.getChildByName("Text_title3")

            btn_fafang.addTouchEventListener(function(sender, type) {
                if (type == 2) {

                }
            });
            btn_huishou.addTouchEventListener(function(sender, type) {
                if (type == 2) {

                }
            });
            btn_fafang.setVisible(false)
            btn_huishou.setVisible(false)

            var btn_fenzu = panel_now.getChildByName("btn_fenzu")
            btn_fenzu.setVisible(false)

            this.refresClubHappyBeanRecord = function(recordlist){
                var cell = panel_now.getChildByName("listCell")
                var listView = panel_now.getChildByName("ListView_info")
                listView.removeAllItems();
                for(var i = 0 ; i < recordlist.length ; i++){
                    var item = cell.clone();
                    listView.pushBackCustomItem(item);

                    var text_fenzu = item.getChildByName("Text_fenzu")
                    var text_name1 = item.getChildByName("Text_name1")
                    var text_ledouNum = item.getChildByName("Text_ledouNum")
                    var text_ledouNumRemain = item.getChildByName("Text_ledouNumRemain")
                    var text_name2 = item.getChildByName("Text_name2")
                    var text_time = item.getChildByName("Text_time")

                    text_fenzu.setString(recordlist[i].record_content)
                    var name1 = getPlayerName(unescape(recordlist[i].opNickname))
                    text_name1.setString(name1)
                    text_name1.setVisible(false)
                    var name2 = getPlayerName(unescape(recordlist[i].targetNickname))
                    text_name2.setString(name2)
                    text_ledouNum.setString(recordlist[i].opHappyBeanCount)
                    text_ledouNumRemain.setString(recordlist[i].opUserHappyBeanAfter)
                    var timeStr = MjClient.dateFormat(new Date(parseInt(recordlist[i].insertTime)), 'yyyy-MM-dd hh:mm:ss');
                    text_time.setString(timeStr)

                }
            }

            this.rquestClubHappyBeanRecord = function(){
                var sendInfo = {
                    clubId: this.clubInfo.clubId,
                    startTime: this._start_time_date,
                    endTime: this._end_time_date,
                }
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.clubHappyBeanRecord", sendInfo, function(rtn) {
                    MjClient.unblock();
                    cc.log(" ===== pkplayer.handler.clubHappyBeanRecord === " + JSON.stringify(rtn))
                    if (rtn.code == 0) {
                        var recordlist = rtn.data  ? rtn.data : [];
                        that.refresClubHappyBeanRecord(recordlist)
                    }else{
                        if(rtn.message){
                            MjClient.showMsgTop(rtn.message);
                        }
                    }
                });
            }

            var start_Time = panel_now.getChildByName("image_date1_bg");
            var end_Time = panel_now.getChildByName("image_date2_bg");
            this.addSelectTime(start_Time,end_Time)

            var btn_search = panel_now.getChildByName("btn_search");
            btn_search.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if (that.is_RightData()) {
                        var oneDayTime = 86400000;
                        if ((that._end_time_date - that._start_time_date) > oneDayTime * 7) {
                            MjClient.showToast("时间搜索跨度不能超过7天。")
                        }else{
                            that.rquestClubHappyBeanRecord()
                        }
                    } else {
                        MjClient.showToast("输入日期不合法")
                    }
                }
            });

            var btn_selectDay = panel_now.getChildByName("btn_selectDay");
            this.addCheckDay(btn_selectDay)
            this.rquestClubHappyBeanRecord()
        }
        else if(index == 2){
            var text_clubName = panel_now.getChildByName("Text_clubName")
            text_clubName.setString(unescape(this.clubInfo.title))
            var text_clubID = panel_now.getChildByName("Text_clubID")
            text_clubID.setString("亲友圈ID：" + this.clubInfo.clubId)
            var panel_tqld = panel_now.getChildByName("Panel_tqld")
            panel_tqld.setVisible(false)

            this.refresClubHappyBeanStatistics = function(datalist){
                var cell = panel_now.getChildByName("listCell")
                var listView = panel_now.getChildByName("ListView_info")
                listView.removeAllItems();

                that.remainContribute = datalist.remainContribute

                var image_zongji = panel_now.getChildByName("Image_zongji")
                var namelist = ["Num_ybxh","Num_dyjcc","Num_qbcc","Num_zgx","Num_xjzd","Num_dtqgx"]
                var numlist = [datalist.allCost,datalist.allWinner,datalist.allPlayCount,datalist.allContribute,datalist.allHappyCount,datalist.remainContribute]
                for(var i = 0 ; i < namelist.length ; i++){
                    var text = image_zongji.getChildByName(namelist[i])
                    if(numlist[i] != null){
                        text.setString(numlist[i])
                    }
                }
                for(var i = 0 ; i < datalist.playerList.length ; i++){
                    var playerdata = datalist.playerList[i]
                    var item = cell.clone();
                    listView.pushBackCustomItem(item);
                    var name = getPlayerName(unescape(playerdata.Nickname))
                    namelist = ["Text_name","Text_ID","Text_dayingjia","Text_cc","Text_score","Text_xhyb","Text_gxld"]
                    numlist = [name,playerdata.userId,playerdata.winnerCount,playerdata.playCount,playerdata.score,playerdata.diamonds,playerdata.contribute]
                    for(var j = 0 ; j < namelist.length ; j++){
                        var text = item.getChildByName(namelist[j])
                        if(numlist[j] != null){
                            text.setString(numlist[j])
                        }
                    }
                }
            }

            this.rquestClubHappyBeanStatistics = function(){
                var sendInfo = {
                    clubId: this.clubInfo.clubId,
                    startTime: this._start_time_date,
                    endTime: this._end_time_date,
                }
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.clubHappyBeanStatistics", sendInfo, function(rtn) {
                    MjClient.unblock();
                    cc.log(" ===== pkplayer.handler.clubHappyBeanStatistics === " + JSON.stringify(rtn))
                    if (rtn.code == 0) {
                        var datalist = rtn.data  ? rtn.data : [];
                        that.refresClubHappyBeanStatistics(datalist)
                    }else{
                        if(rtn.message){
                            MjClient.showMsgTop(rtn.message);
                        }
                    }
                });
            }

            this.remainContribute = null
            var btn_tiqu = panel_now.getChildByName("Image_zongji").getChildByName("btn_tiqu")
            btn_tiqu.addTouchEventListener(function(sender, type) {
                if (type == 2 && that.remainContribute != null) {
                    panel_tqld.getChildByName("Text_tqld").setString("是否提取" + that.remainContribute + "乐豆")
                    panel_tqld.setVisible(true)
                }
            });

            var that = this;
            var btn_tiqu_jilu = panel_now.getChildByName("Image_zongji").getChildByName("btn_tiqu_jilu")
            btn_tiqu_jilu.addTouchEventListener(function(sender, type) {
                if (type == 2 && that.remainContribute != null) {
                    that.node.addChild(new FriendCard_SXF_WithdrawRecord(that.clubInfo.clubId, SelfUid()));
                }
            });

            this.rquestClubWithdrawHappyBeanCommission = function(){
                var sendInfo = {
                    clubId: this.clubInfo.clubId,
                }
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.clubWithdrawHappyBeanCommission", sendInfo, function(rtn) {
                    MjClient.unblock();
                    cc.log(" ===== pkplayer.handler.clubWithdrawHappyBeanCommission === " + JSON.stringify(rtn))
                    if (rtn.code == 0) {
                        MjClient.showMsgTop("提取成功");
                        thatParent.refreshHappyBean(rtn.data.happyBeanCountAfterWithdraw)
                        panel_now.getChildByName("Image_zongji").getChildByName("Num_dtqgx").setString("" + 0)
                        that.remainContribute = 0
                    }else{
                        if(rtn.message){
                            MjClient.showMsgTop(rtn.message);
                        }
                    }
                });
            }

            var btn_ok = panel_tqld.getChildByName("btn_ok")
            btn_ok.addTouchEventListener(function(sender, type) {
                if (type == 2 && that.remainContribute != null) {
                    that.rquestClubWithdrawHappyBeanCommission()
                    panel_tqld.setVisible(false)
                }
            });
            var btn_no = panel_tqld.getChildByName("btn_no")
            btn_no.addTouchEventListener(function(sender, type) {
                if (type == 2 && panel_tqld != null) {
                    panel_tqld.setVisible(false)
                }
            });

            //分组
            var btn_fenzu = panel_now.getChildByName("btn_fenzu");
            btn_fenzu.setVisible(false)

            //玩法
            var btn_wanfa = panel_now.getChildByName("btn_wanfa");
            btn_wanfa.setVisible(false)
            // if(this.btn_wanfa){
            //     this.btn_wanfa.addTouchEventListener(function(sender, type) {
            //         if (type == 2) {
            //             var data = {event:"LEDOU_WANFA",clubId:this.clubInfo.clubId};
            //             if(this._gameTypeList.length > 0){
            //                 data._gameTypeList = this._gameTypeList;
            //             }
            //             that.node.addChild(new Friendcard_selectWanfa(data));
            //             MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Ledou_Wanjiatongji_Quanbuwanfa", {uid:SelfUid()});
            //         }
            //     }, this);
            //     UIEventBind(null, this.btn_wanfa, "LEDOU_WANFA", function (eD) {
            //         if (eD.gameType != -1){
            //             if(this.btn_wanfa.getChildByName("Text")){
            //                 this.btn_wanfa.getChildByName("Text").setString(eD.gameName);
            //             }else{
            //                 this.btn_wanfa.setTitleText(eD.gameName);
            //             }
            //             this._gameType = eD.gameType;
            //         }else{
            //             if(this.btn_wanfa.getChildByName("Text")){
            //                 this.btn_wanfa.getChildByName("Text").setString("全部玩法");
            //             }else{
            //                 this.btn_wanfa.setTitleText("全部玩法");

            //             }
            //             this._gameType = -1;
            //         }
            //         this._selectedRenshu = eD.renshu;
            //         MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Ledou_Wanjiatongji_Quanbuwanfa_Xuanzewanfa", {uid:SelfUid()});
            //     }.bind(this));
            // }

            var playerID = panel_now.getChildByName("image_inputID");
            if(this.playerID){
                this.playerID.removeFromParent(true)
            }
            this.playerID = new cc.EditBox(playerID.getContentSize(), new cc.Scale9Sprite("friendCards/tongji/inputbg.png"));
            this.playerID.setPlaceholderFontSize(22);
            this.playerID.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            this.playerID.setPlaceHolder("请输入ID");
            this.playerID.setPosition(playerID.getContentSize().width/2, playerID.getContentSize().height/2);
            this.playerID.setFontColor(cc.color("#9f6a36"));
            playerID.addChild(this.playerID);
            this.playerID.setDelegate(this);

            this.editBoxEditingDidEnd = function (editBox) {
                if(this.playerID.getString() != ""){
                    this.playerID.setString(Number(this.playerID.getString()))
                }
            };

            var start_Time = panel_now.getChildByName("image_date1_bg");
            var end_Time = panel_now.getChildByName("image_date2_bg");
            this.addSelectTime(start_Time,end_Time)

            var btn_search = panel_now.getChildByName("btn_search");
            btn_search.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if (that.is_RightData()) {
                        var oneDayTime = 86400000;
                        if ((that._end_time_date - that._start_time_date) > oneDayTime * 7) {
                            MjClient.showToast("时间搜索跨度不能超过7天。")
                        }else{
                            that.rquestClubHappyBeanStatistics()
                        }
                    } else {
                        MjClient.showToast("输入日期不合法")
                    }
                }
            });

            var btn_selectDay = panel_now.getChildByName("btn_selectDay");
            this.addCheckDay(btn_selectDay)
            this.rquestClubHappyBeanStatistics()
        }
        else if(index == 3){
            var playerID = panel_now.getChildByName("Image_playerID");
            if(this.playerID){
                this.playerID.removeFromParent(true)
            }
            this.playerID = new cc.EditBox(playerID.getContentSize(), new cc.Scale9Sprite("friendCards/tongji/inputbg.png"));
            this.playerID.setPlaceholderFontSize(30);
            this.playerID.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            this.playerID.setPlaceHolder("请输入玩家ID");
            this.playerID.setPosition(playerID.getContentSize().width/2, playerID.getContentSize().height/2);
            this.playerID.setFontColor(cc.color("#9f6a36"));
            playerID.addChild(this.playerID);
            this.playerID.setDelegate(this);

            this.editBoxEditingDidEnd = function (editBox) {
                if(this.playerID.getString() != ""){
                    this.playerID.setString(Number(this.playerID.getString()))
                }
            };

            var btn_find = panel_now.getChildByName("btn_find")
            btn_find.addTouchEventListener(function(sender, type){
                if (type == 2) {
                    var id = Number(that.playerID.getString());
                    if (!id || id < 1000)
                    {
                        MjClient.showToast("请输入正确的玩家id！");
                        return;
                    }
                    // that.rquestClubHappyBeanPlayerList(0,0,null,id)
                    that.playerID.setString("")
                }
            });

            this.refresContributeRecord = function(data){
                // cc.log("---乐豆---"+JSON.stringify(data));//wj
                var cell = panel_now.getChildByName("listCell")
                var listView = panel_now.getChildByName("ListView_info")
                listView.removeAllItems();
                for(var i = 0 ; i < data.length ; i++){
                    var item = cell.clone();
                    listView.pushBackCustomItem(item);

                    var text_name = item.getChildByName("Text_name")
                    var text_ledouNum = item.getChildByName("Text_ledouNum")
                    var text_time = item.getChildByName("Text_time")
                    var text_source = item.getChildByName("Text_source")

                    var name = getPlayerName(unescape(data[i].targetNickname))
                    text_name.setString(name)
                    text_ledouNum.setString(data[i].opHappyBeanCount)
                    var timeStr = MjClient.dateFormat(new Date(parseInt(data[i].insertTime)), 'yyyy-MM-dd hh:mm:ss');
                    text_time.setString(timeStr)
                    text_source.setString(data[i].record_content)
                }
            }

            this.rquestContributeRecord = function(){
                var sendInfo = {
                    clubId: this.clubInfo.clubId,
                    startTime: this._start_time_date,
                    endTime: this._end_time_date,
                }
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.ContributeRecord", sendInfo, function(rtn) {
                    MjClient.unblock();
                    cc.log(" ===== pkplayer.handler.ContributeRecord === " + JSON.stringify(rtn))
                    if (rtn.code == 0) {
                        var data = rtn.data  ? rtn.data : [];
                        that.refresContributeRecord(data)
                    }else{
                        if(rtn.message){
                            MjClient.showMsgTop(rtn.message);
                        }
                    }
                });
            }

            var start_Time = panel_now.getChildByName("image_date1_bg");
            var end_Time = panel_now.getChildByName("image_date2_bg");
            this.addSelectTime(start_Time,end_Time)

            var btn_search = panel_now.getChildByName("btn_search");
            btn_search.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if (that.is_RightData()) {
                        var oneDayTime = 86400000;
                        if ((that._end_time_date - that._start_time_date) > oneDayTime * 7) {
                            MjClient.showToast("时间搜索跨度不能超过7天。")
                        }else{
                            that.rquestContributeRecord()
                        }
                    } else {
                        MjClient.showToast("输入日期不合法")
                    }
                }
            });

            var btn_selectDay = panel_now.getChildByName("btn_selectDay");
            this.addCheckDay(btn_selectDay)
            this.rquestContributeRecord()
        }
        else if(index == 4){
            var playerID = panel_now.getChildByName("Image_playerID");
            if(this.playerID){
                this.playerID.removeFromParent(true)
            }
            this.playerID = new cc.EditBox(playerID.getContentSize(), new cc.Scale9Sprite("friendCards/tongji/inputbg.png"));
            this.playerID.setPlaceholderFontSize(30);
            this.playerID.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            this.playerID.setPlaceHolder("请输入玩家ID");
            this.playerID.setPosition(playerID.getContentSize().width/2, playerID.getContentSize().height/2);
            this.playerID.setFontColor(cc.color("#9f6a36"));
            playerID.addChild(this.playerID);
            this.playerID.setDelegate(this);

            this.editBoxEditingDidEnd = function (editBox) {
                if(this.playerID.getString() != ""){
                    this.playerID.setString(Number(this.playerID.getString()))
                }
            };

            var btn_find = panel_now.getChildByName("btn_find")
            btn_find.addTouchEventListener(function(sender, type){
                if (type == 2) {
                    var id = Number(that.playerID.getString());
                    if (!id || id < 1000)
                    {
                        MjClient.showToast("请输入正确的玩家id！");
                        return;
                    }
                    // that.rquestClubHappyBeanPlayerList(0,0,null,id)
                    that.playerID.setString("")
                }
            });

            this.refresShuffleRecord = function(data){
                var cell = panel_now.getChildByName("listCell")
                var listView = panel_now.getChildByName("ListView_info")
                listView.removeAllItems();
                for(var i = 0 ; i < data.length ; i++){
                    var item = cell.clone();
                    listView.pushBackCustomItem(item);

                    var text_ID = item.getChildByName("Text_ID")
                    var text_name = item.getChildByName("Text_name")
                    var text_game = item.getChildByName("Text_game")
                    var text_time = item.getChildByName("Text_time")

                    text_ID.setString(data[i].targetUserId)
                    var name = getPlayerName(unescape(data[i].targetNickname))
                    text_name.setString(name )
                    text_game.setString(data[i].record_content)
                    var timeStr = MjClient.dateFormat(new Date(parseInt(data[i].insertTime)), 'yyyy-MM-dd hh:mm:ss');
                    text_time.setString(timeStr)
                }
            }

            this.rquestShuffleRecord = function(){
                var sendInfo = {
                    clubId: this.clubInfo.clubId,
                    startTime: this._start_time_date,
                    endTime: this._end_time_date,
                }
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.ShuffleRecord", sendInfo, function(rtn) {
                    MjClient.unblock();
                    cc.log(" ===== pkplayer.handler.ShuffleRecord === " + JSON.stringify(rtn))
                    if (rtn.code == 0) {
                        var data = rtn.data  ? rtn.data : [];
                        that.refresShuffleRecord(data)
                    }else{
                        if(rtn.message){
                            MjClient.showMsgTop(rtn.message);
                        }
                    }
                });
            }

            var start_Time = panel_now.getChildByName("image_date1_bg");
            var end_Time = panel_now.getChildByName("image_date2_bg");
            this.addSelectTime(start_Time,end_Time)

            var btn_search = panel_now.getChildByName("btn_search");
            btn_search.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if (that.is_RightData()) {
                        var oneDayTime = 86400000;
                        if ((that._end_time_date - that._start_time_date) > oneDayTime * 7) {
                            MjClient.showToast("时间搜索跨度不能超过7天。")
                        }else{
                            that.rquestShuffleRecord()
                        }
                    } else {
                        MjClient.showToast("输入日期不合法")
                    }
                }
            });

            var btn_selectDay = panel_now.getChildByName("btn_selectDay");
            this.addCheckDay(btn_selectDay)
            this.rquestShuffleRecord()
        }
        else if(index == 5){
            var cell = panel_now.getChildByName("listCell")
            var cell_xiaji = panel_now.getChildByName("listCell_xiaji")
            var listView_info = panel_now.getChildByName("ListView_info")
            var panel_xiaji = panel_now.getChildByName("Panel_xiaji")
            panel_xiaji.setVisible(false)
            listView_info.removeAllItems();

            var playerID = panel_now.getChildByName("Image_playerID");
            if(this.playerID){
                this.playerID.removeFromParent(true)
            }
            this.playerID = new cc.EditBox(playerID.getContentSize(), new cc.Scale9Sprite("friendCards/tongji/inputbg.png"));
            this.playerID.setPlaceholderFontSize(30);
            this.playerID.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            this.playerID.setPlaceHolder("请输入玩家ID");
            this.playerID.setPosition(playerID.getContentSize().width/2, playerID.getContentSize().height/2);
            this.playerID.setFontColor(cc.color("#9f6a36"));
            playerID.addChild(this.playerID);
            this.playerID.setDelegate(this);

            this.editBoxEditingDidEnd = function (editBox) {
                if(this.playerID.getString() != ""){
                    this.playerID.setString(Number(this.playerID.getString()))
                }
            };

            var btn_find = panel_now.getChildByName("btn_find")
            btn_find.addTouchEventListener(function(sender, type){
                if (type == 2) {
                    var id = Number(that.playerID.getString());
                    if (!id || id < 1000)
                    {
                        MjClient.showToast("请输入正确的玩家id！");
                        return;
                    }
                    that.playerID.setString("")
                }
            });

            var start_Time = panel_now.getChildByName("image_date1_bg");
            var end_Time = panel_now.getChildByName("image_date2_bg");
            this.addSelectTime(start_Time,end_Time)

            var btn_search = panel_now.getChildByName("btn_search");
            btn_search.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if (that.is_RightData()) {
                        var oneDayTime = 86400000;
                        if ((that._end_time_date - that._start_time_date) > oneDayTime * 7) {
                            MjClient.showToast("时间搜索跨度不能超过7天。")
                        }else{
                            that.rquestClubGroupLeaderContribute()
                        }
                    } else {
                        MjClient.showToast("输入日期不合法")
                    }
                }
            });

            var btn_selectDay = panel_now.getChildByName("btn_selectDay");
            this.addCheckDay(btn_selectDay)

            this.refresClubGroupLeaderContribute = function(data,playerInfo){
                if(data.playerList == null || data.playerList.length <= 0){
                    // return;
                }

                var playerList = data.playerList
                var listView_info = panel_now.getChildByName("ListView_info")
                var panel_xiaji = panel_now.getChildByName("Panel_xiaji")
                var panel_title = panel_now.getChildByName("Panel_title")
                var text_xiaji = panel_xiaji.getChildByName("Text_xiaji")
                var listView_xiajiinfo = panel_xiaji.getChildByName("ListView_xiajiinfo")
                panel_xiaji.setVisible(false)
                text_xiaji.setVisible(false)
                var listView_now;
                listView_info.removeAllItems();
                listView_xiajiinfo.removeAllItems();
                //下级信息
                if(playerInfo != null){
                    panel_xiaji.setVisible(true)
                    var btn_back = panel_xiaji.getChildByName("btn_back")
                    btn_back.addTouchEventListener(function(sender, type) {
                        if (type == 2) {
                            if(that.roleId == 3){
                                that.rquestClubGroupLeaderContribute();
                            }
                            else{
                                that.rquestClubGroupLeaderPlayerContribute("", 0,0, MjClient.data.pinfo.uid)
                            }
                        }
                    });
                    listView_info.setVisible(false)
                    panel_title.setVisible(false)
                    listView_now = listView_xiajiinfo

                    for(var i = 0 ; i < playerInfo.length ; i++){
                        var item = cell_xiaji.clone();
                        listView_xiajiinfo.pushBackCustomItem(item);
                        var name = getPlayerName(unescape(playerInfo[i].nickname))
                        var text_name = item.getChildByName("Text_name")
                        text_name.setString(name)
                        text_xiaji.setString(name)
                        var text_ID = item.getChildByName("Text_ID")
                        text_ID.setString("ID:" + playerInfo[i].userId)
                        var text_xiashuInfo = item.getChildByName("Text_xiashuInfo")
                        text_xiashuInfo.setString("下属: 0 积分: 0")
                        var text_jifen = item.getChildByName("Text_jifen")
                        text_jifen.setString(playerInfo[i].happyBean)
                        var text_wdsy = item.getChildByName("Text_wdsy")
                        text_wdsy.setString(playerInfo[i].myContribute)
                        var rext_bqxh = item.getChildByName("Text_bqxh")
                        rext_bqxh.setString(playerInfo[i].allPartnerContribute)
                        var text_hhrbl = item.getChildByName("Text_hhrbl");
                        text_hhrbl.setString(playerList[i].parentCommission + "%");
                        var text_hhrsy = item.getChildByName("Text_hhrsy");
                        text_hhrsy.setString(playerList[i].partnerContribute);

                        var head = item.getChildByName("Image_head");
                        head.isMask = true;
                        that.refreshHead(playerInfo[i].headimgurl ? playerList[i].headimgurl : "png/default_headpic.png", head);
                        var btn_xq = item.getChildByName("btn_xq");
                        let userIdTemp = playerList[i].userId;
                        btn_xq.addTouchEventListener(function(sender, type) {
                            if (type == 2) {
                                that.rquestClubGroupLeaderPlayerContribute("", 0,0, userIdTemp)
                            }
                        });
                        var text_other_happybean = item.getChildByName("Text_other_happybean");
                        text_other_happybean.setString("保险箱：" + playerList[i].happyBeanInBank + " 待提取:" + playerList[i].happyBeanCommission);
                    }
                    return;
                }
                else{
                    panel_xiaji.setVisible(false)
                    listView_info.setVisible(true)
                    listView_now = listView_info
                    panel_title.setVisible(true)
                }
                //一级
                for(var i = 0 ; i < playerList.length ; i++){
                    var item = cell.clone();
                    listView_now.pushBackCustomItem(item);
                    var text_name = item.getChildByName("Text_name");
                    var text_id = item.getChildByName("Text_ID");
                    var text_xiashuInfo = item.getChildByName("Text_xiashuInfo");
                    var text_jifen = item.getChildByName("Text_jifen");
                    var text_wdsy = item.getChildByName("Text_wdsy");
                    var text_bqxh = item.getChildByName("Text_bqxh");
                    var text_hhrbl = item.getChildByName("Text_hhrbl");
                    var text_other_happybean = item.getChildByName("Text_other_happybean");
                    var text_hhrsy = item.getChildByName("Text_hhrsy");
                    var btn_xq = item.getChildByName("btn_xq");
                    text_name.setString(getPlayerName(unescape(playerList[i].nickname)));
                    text_id.setString("ID:" + playerList[i].userId);
                    text_xiashuInfo.setString("下属:" + playerList[i].playerCount + " 积分:" + playerList[i].allHappyCount);
                    text_jifen.setString(playerList[i].happyBean);
                    text_wdsy.setString(playerList[i].myContribute);
                    text_bqxh.setString(playerList[i].allPartnerContribute);
                    text_hhrbl.setString(playerList[i].parentCommission + "%");
                    text_hhrsy.setString(playerList[i].partnerContribute);
                    text_other_happybean.setString("保险箱：" + playerList[i].happyBeanInBank + " 待提取:" + playerList[i].happyBeanCommission);
                    let userIdTemp = playerList[i].userId;
                    btn_xq.addTouchEventListener(function(sender, type) {
                        if (type == 2) {
                            that.rquestClubGroupLeaderPlayerContribute("", 0,0, userIdTemp)
                        }
                    });
                    var head = item.getChildByName("Image_head");
                    head.isMask = true;
                    that.refreshHead(playerList[i].headimgurl ? playerList[i].headimgurl : "png/default_headpic.png", head);
                }
            }

            this.rquestClubGroupLeaderContribute = function(keyword,length,playerInfo,searchid){
                var userId = 0
                var alreadyCount = 0
                var searchId = 0
                if(playerInfo){
                    userId = playerInfo.userId
                }
                if(keyword){
                    alreadyCount = keyword
                }
                if(searchid){
                    searchId = searchid
                }
                var sendInfo = {
                    clubId: this.clubInfo.clubId,
                    currcnt: alreadyCount,
                    length:panel_now._prePageLength,
                    parentUserId:userId,
                    userId:searchId,
                    startTime: this._start_time_date,
                    endTime: this._end_time_date,
                }
                cc.log("clubId = " + sendInfo.clubId + ",currcnt = " + sendInfo.currcnt + ",length" + sendInfo.length + ",parentUserId" + sendInfo.parentUserId)
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.ClubGroupLeaderContribute", sendInfo, function(rtn) {
                    MjClient.unblock();
                    cc.log(" ===== pkplayer.handler.clubHappyBeanPlayerList === " + JSON.stringify(rtn))
                    if (rtn.code == 0) {
                        var data = rtn.data  ? rtn.data : [];
                        that.refresClubGroupLeaderContribute(data,playerInfo)
                    }else{
                        if(rtn.message){
                            MjClient.showMsgTop(rtn.message);
                        }
                    }
                });
            }

            this.rquestClubGroupLeaderPlayerContribute = function(keyword,length,playerInfo,searchid){
                var userId = 0
                var alreadyCount = 0
                var searchId = 0
                if(playerInfo){
                    userId = playerInfo.userId
                }
                if(keyword){
                    alreadyCount = keyword
                }
                if(searchid){
                    searchId = searchid
                }
                var sendInfo = {
                    clubId: this.clubInfo.clubId,
                    currcnt: alreadyCount,
                    length:panel_now._prePageLength,
                    userId:searchId,
                    startTime: this._start_time_date,
                    endTime: this._end_time_date,
                }
                cc.log("clubId = " + sendInfo.clubId + ",currcnt = " + sendInfo.currcnt + ",length" + sendInfo.length + ",userId" + sendInfo.userId)
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.ClubGroupLeaderPlayerContribute", sendInfo, function(rtn) {
                    MjClient.unblock();
                    cc.log(" ===== pkplayer.handler.ClubGroupLeaderPlayerContribute === " + JSON.stringify(rtn))
                    if (rtn.code == 0) {
                        var data = rtn.data  ? rtn.data : [];
                        that.refresClubGroupLeaderContribute(data,data.playerList)
                    }else{
                        if(rtn.message){
                            MjClient.showMsgTop(rtn.message);
                        }
                    }
                });
            }
            if(this.roleId == 3){
                this.rquestClubGroupLeaderContribute();
            }
            else{
                cc.log("MjClient.data.pinfo.uid", MjClient.data.pinfo.uid);
                that.rquestClubGroupLeaderPlayerContribute("", 0,0, MjClient.data.pinfo.uid)
            }
        }
        else if(index == 6){
            var cell = panel_now.getChildByName("listCell")
            var cell_xiaji = panel_now.getChildByName("listCell_xiaji")
            var listView_info = panel_now.getChildByName("ListView_info")
            var panel_xiaji = panel_now.getChildByName("Panel_xiaji")
            panel_xiaji.setVisible(false)
            listView_info.removeAllItems();

            var playerID = panel_now.getChildByName("Image_playerID");
            if(this.playerID){
                this.playerID.removeFromParent(true)
            }
            this.playerID = new cc.EditBox(playerID.getContentSize(), new cc.Scale9Sprite("friendCards/tongji/inputbg.png"));
            this.playerID.setPlaceholderFontSize(30);
            this.playerID.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            this.playerID.setPlaceHolder("请输入玩家ID");
            this.playerID.setPosition(playerID.getContentSize().width/2, playerID.getContentSize().height/2);
            this.playerID.setFontColor(cc.color("#9f6a36"));
            playerID.addChild(this.playerID);
            this.playerID.setDelegate(this);
            var lastPlayerInfo = 0;

            this.editBoxEditingDidEnd = function (editBox) {
                if(this.playerID.getString() != ""){
                    this.playerID.setString(Number(this.playerID.getString()))
                }
            };

            var btn_find = panel_now.getChildByName("btn_find")
            btn_find.addTouchEventListener(function(sender, type){
                if (type == 2) {
                    var id = Number(that.playerID.getString());
                    if (!id || id < 1000)
                    {
                        MjClient.showToast("请输入正确的玩家id！");
                        return;
                    }
                    that.playerID.setString("")
                }
            });

            var start_Time = panel_now.getChildByName("image_date1_bg");
            var end_Time = panel_now.getChildByName("image_date2_bg");
            this.addSelectTime(start_Time,end_Time)

            var btn_search = panel_now.getChildByName("btn_search");
            btn_search.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if (that.is_RightData()) {
                        var oneDayTime = 86400000;
                        if ((that._end_time_date - that._start_time_date) > oneDayTime * 15) {
                            MjClient.showToast("时间搜索跨度不能超过15天。")
                        }else{
                            if(that.roleId == 3 || that.roleId == 1){
                                that.rquestClubEveryDayStatistics();
                            }
                            else{
                                cc.log("MjClient.data.pinfo.uid", MjClient.data.pinfo.uid);
                                that.rquestClubPlayerEveryDayStatistics("", 0,0, MjClient.data.pinfo.uid)
                            }
                        }
                    } else {
                        MjClient.showToast("输入日期不合法")
                    }
                }
            });

            var btn_selectDay = panel_now.getChildByName("btn_selectDay");
            this.addCheckDay(btn_selectDay)

            //3种数据，data.playerList就是组长列表，playerInfo是下级合伙人，myDirectlyPlayer
            this.refresClubEveryDayStatistics = function(data,playerInfo,myDirectlyPlayer, searchUser){
                if(data.playerList == null || data.playerList.length <= 0){
                    // return;
                }
                cc.log(myDirectlyPlayer);

                var text_validPlayerCounts = panel_now.getChildByName("Text_validPlayerCounts")
                var text_allPlayerCounts = panel_now.getChildByName("Text_allPlayerCounts")
                var text_bigWinnerCounts = panel_now.getChildByName("Text_bigWinnerCounts")
                var text_gameWinLost = panel_now.getChildByName("Text_gameWinLost")
                var text_allRewards = panel_now.getChildByName("Text_allRewards")
                var text_allGameWinLost = panel_now.getChildByName("Text_allGameWinLost")
                text_validPlayerCounts.setString(data.validPlayerCounts);
                text_allPlayerCounts.setString(data.allPlayerCounts);
                text_bigWinnerCounts.setString(data.bigWinnerCounts);
                text_gameWinLost.setString(data.gameWinLost);
                text_allRewards.setString(data.allRewards);
                text_allGameWinLost.setString(data.allGameWinLost);

                var playerList = data.playerList
                var listView_info = panel_now.getChildByName("ListView_info")
                var panel_xiaji = panel_now.getChildByName("Panel_xiaji")
                var panel_title = panel_now.getChildByName("Panel_title")
                var text_xiaji = panel_xiaji.getChildByName("Text_xiaji")
                var listView_xiajiinfo = panel_xiaji.getChildByName("ListView_xiajiinfo")
                panel_xiaji.setVisible(false)
                text_xiaji.setVisible(false)
                var listView_now;
                listView_info.removeAllItems();
                listView_xiajiinfo.removeAllItems();
                //下级信息
                if(playerInfo != null || myDirectlyPlayer != null){
                    panel_xiaji.setVisible(true)
                    var btn_back = panel_xiaji.getChildByName("btn_back")
                    btn_back.addTouchEventListener(function(sender, type) {
                        if (type == 2) {
                            if(that.roleId == 3 || that.roleId == 3){
                                that.rquestClubEveryDayStatistics();
                            }
                            else{
                                that.rquestClubPlayerEveryDayStatistics("", 0,0, MjClient.data.pinfo.uid)
                            }
                        }
                    });
                    listView_info.setVisible(false)
                    panel_title.setVisible(false)
                    listView_now = listView_xiajiinfo

                    // if(searchUser != null){
                    //     searchUser.isParent = true;
                    //     if(playerInfo != null){
                    //         playerInfo.unshift(searchUser);
                    //     }
                    //     if((playerInfo == null || playerInfo.length == 0) && myDirectlyPlayer != null){
                    //         searchUser.id = searchUser.userId;
                    //         myDirectlyPlayer.unshift(searchUser);
                    //     }
                    // }
                    playerInfo = playerInfo || [];
                    myDirectlyPlayer = myDirectlyPlayer || [];
                    for(var i = 0 ; i < playerInfo.length ; i++){
                        var item = cell_xiaji.clone();
                        listView_xiajiinfo.pushBackCustomItem(item);
                        var text_name = item.getChildByName("Text_name");
                        var text_id = item.getChildByName("Text_ID");
                        var text_zcc = item.getChildByName("Text_zcc");
                        var text_yxcc = item.getChildByName("Text_yxcc");
                        var text_dyj = item.getChildByName("Text_dyj");
                        var text_yxsy = item.getChildByName("Text_yxsy");
                        var text_jl = item.getChildByName("Text_jl");
                        var text_yxzsy = item.getChildByName("Text_yxzsy");
                        var btn_xq = item.getChildByName("btn_xq");
                        text_name.setString(getPlayerName(unescape(playerInfo[i].nickname)));
                        text_id.setString("ID:" + playerInfo[i].userId);
                        text_zcc.setString(playerInfo[i].allPlayerCounts);
                        text_yxcc.setString(playerInfo[i].validPlayerCounts);
                        text_dyj.setString(playerInfo[i].bigWinnerCounts);
                        text_yxsy.setString(playerInfo[i].gameWinLost);
                        text_jl.setString(playerInfo[i].allRewards);
                        text_yxzsy.setString(playerInfo[i].allGameWinLost);
                        let userIdTemp = playerInfo[i].userId;
                        let userTemp = playerInfo[i];
                        btn_xq.addTouchEventListener(function(sender, type) {
                            if (type == 2) {
                                // lastPlayerInfo = userIdTemp;
                                if(userTemp.isParent){
                                    that.rquestClubDirectlyPlayerEveryDayStatistics("", 0,0, userIdTemp,userTemp)
                                }
                                else{
                                    that.rquestClubPlayerEveryDayStatistics("", 0,0, userIdTemp,userTemp)
                                }
                            }
                        });
                        var head = item.getChildByName("Image_head");
                        head.isMask = true;
                        that.refreshHead(playerInfo[i].headimgurl ? playerInfo[i].headimgurl : "png/default_headpic.png", head);

                        if(playerInfo[i].isShowVideo){
                            btn_xq.setTitleText("回放");
                            let userIdTemp = {
                                userId: playerInfo[i].userId,
                                startTime: that._start_time_date,
                                endTime: that._end_time_date
                            };
                            btn_xq.addTouchEventListener(function(sender, type) {
                                if (type == 2) {
                                    that.addChild(new FriendCard_roomRecord(that.clubData, null, null, userIdTemp));
                                }
                            });
                        }
                    }

                    for(var i = 0 ; i < myDirectlyPlayer.length ; i++){
                        var item = cell_xiaji.clone();
                        listView_xiajiinfo.pushBackCustomItem(item);
                        var text_name = item.getChildByName("Text_name");
                        var text_id = item.getChildByName("Text_ID");
                        var text_zcc = item.getChildByName("Text_zcc");
                        var text_yxcc = item.getChildByName("Text_yxcc");
                        var text_dyj = item.getChildByName("Text_dyj");
                        var text_yxsy = item.getChildByName("Text_yxsy");
                        var text_jl = item.getChildByName("Text_jl");
                        var text_yxzsy = item.getChildByName("Text_yxzsy");
                        var btn_xq = item.getChildByName("btn_xq");
                        text_name.setString(getPlayerName(unescape(myDirectlyPlayer[i].nickname)));
                        text_id.setString("ID:" + myDirectlyPlayer[i].id);
                        text_zcc.setString(myDirectlyPlayer[i].allPlayerCounts);
                        text_yxcc.setString(myDirectlyPlayer[i].validPlayerCounts);
                        text_dyj.setString(myDirectlyPlayer[i].bigWinnerCounts);
                        text_yxsy.setString(myDirectlyPlayer[i].gameWinLost);
                        text_jl.setString(myDirectlyPlayer[i].allRewards);
                        text_yxzsy.setString(myDirectlyPlayer[i].allGameWinLost);
                        var head = item.getChildByName("Image_head");
                        head.isMask = true;
                        that.refreshHead(myDirectlyPlayer[i].headimgurl ? myDirectlyPlayer[i].headimgurl : "png/default_headpic.png", head);
                        var btn_xq = item.getChildByName("btn_xq");
                        btn_xq.setTitleText("回放");
                        let userIdTemp = {
                            userId: myDirectlyPlayer[i].id,
                            startTime: that._start_time_date,
                            endTime: that._end_time_date
                        };
                        btn_xq.addTouchEventListener(function(sender, type) {
                            if (type == 2) {
                                that.addChild(new FriendCard_roomRecord(that.clubData, null, null, userIdTemp));
                            }
                        });
                        var text_other_happybean = item.getChildByName("Text_other_happybean");
                        text_other_happybean.setVisible(false);
                    }
                    return;
                }
                else{
                    panel_xiaji.setVisible(false)
                    listView_info.setVisible(true)
                    listView_now = listView_info
                    panel_title.setVisible(true)
                }
                //组长
                for(var i = 0 ; i < playerList.length ; i++){
                    var item = cell.clone();
                    listView_now.pushBackCustomItem(item);
                    var text_name = item.getChildByName("Text_name");
                    var text_id = item.getChildByName("Text_ID");
                    var text_zcc = item.getChildByName("Text_zcc");
                    var text_yxcc = item.getChildByName("Text_yxcc");
                    var text_dyj = item.getChildByName("Text_dyj");
                    var text_yxsy = item.getChildByName("Text_yxsy");
                    var text_jl = item.getChildByName("Text_jl");
                    var text_yxzsy = item.getChildByName("Text_yxzsy");
                    var btn_xq = item.getChildByName("btn_xq");
                    text_name.setString(getPlayerName(unescape(playerList[i].nickname)));
                    text_id.setString("ID:" + playerList[i].userId);
                    text_zcc.setString(playerList[i].allPlayerCounts);
                    text_yxcc.setString(playerList[i].validPlayerCounts);
                    text_dyj.setString(playerList[i].bigWinnerCounts);
                    text_yxsy.setString(playerList[i].gameWinLost);
                    text_jl.setString(playerList[i].allRewards);
                    text_yxzsy.setString(playerList[i].allGameWinLost);
                    let userIdTemp = playerList[i].userId;
                    let userTemp = playerList[i];
                    btn_xq.addTouchEventListener(function(sender, type) {
                        if (type == 2) {
                            // lastPlayerInfo = userIdTemp;
                            that.rquestClubPlayerEveryDayStatistics("", 0,0, userIdTemp, userTemp)
                        }
                    });
                    var head = item.getChildByName("Image_head");
                    head.isMask = true;
                    that.refreshHead(playerList[i].headimgurl ? playerList[i].headimgurl : "png/default_headpic.png", head);
                }
            }

            this.rquestClubEveryDayStatistics = function(keyword,length,playerInfo,searchid){
                var userId = 0
                var alreadyCount = 0
                var searchId = 0
                if(playerInfo){
                    userId = playerInfo.userId
                }
                if(keyword){
                    alreadyCount = keyword
                }
                if(searchid){
                    searchId = searchid
                }
                var sendInfo = {
                    clubId: this.clubInfo.clubId,
                    currcnt: alreadyCount,
                    length:panel_now._prePageLength,
                    parentUserId:userId,
                    userId:searchId,
                    startTime: this._start_time_date,
                    endTime: this._end_time_date,
                }
                cc.log("clubId = " + sendInfo.clubId + ",currcnt = " + sendInfo.currcnt + ",length" + sendInfo.length + ",parentUserId" + sendInfo.parentUserId)
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.ClubEveryDayStatistics", sendInfo, function(rtn) {
                    MjClient.unblock();
                    cc.log(" ===== pkplayer.handler.ClubEveryDayStatistics === " + JSON.stringify(rtn))
                    if (rtn.code == 0) {
                        var data = rtn.data  ? rtn.data : [];
                        that.refresClubEveryDayStatistics(data,playerInfo)
                    }else{
                        if(rtn.message){
                            MjClient.showMsgTop(rtn.message);
                        }
                    }
                });
            }

            this.rquestClubPlayerEveryDayStatistics = function(keyword,length,playerInfo,searchid,searchUser){
                var userId = 0
                var alreadyCount = 0
                var searchId = 0
                if(playerInfo){
                    userId = playerInfo.userId
                }
                if(keyword){
                    alreadyCount = keyword
                }
                if(searchid){
                    searchId = searchid
                }
                var sendInfo = {
                    clubId: this.clubInfo.clubId,
                    currcnt: alreadyCount,
                    length:panel_now._prePageLength,
                    userId:searchId,
                    startTime: this._start_time_date,
                    endTime: this._end_time_date,
                }
                cc.log("clubId = " + sendInfo.clubId + ",currcnt = " + sendInfo.currcnt + ",length" + sendInfo.length + ",userId" + sendInfo.userId)
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.ClubPlayerEveryDayStatistics", sendInfo, function(rtn) {
                    MjClient.unblock();
                    cc.log(" ===== pkplayer.handler.ClubPlayerEveryDayStatistics === " + JSON.stringify(rtn))
                    if (rtn.code == 0) {
                        var data = rtn.data  ? rtn.data : [];
                        that.refresClubEveryDayStatistics(data,data.playerList,data.myDirectlyPlayer, searchUser)
                    }else{
                        if(rtn.message){
                            MjClient.showMsgTop(rtn.message);
                        }
                    }
                });
            }

            this.rquestClubDirectlyPlayerEveryDayStatistics = function(keyword,length,playerInfo,searchid,searchUser){
                var userId = 0
                var alreadyCount = 0
                var searchId = 0
                if(playerInfo){
                    userId = playerInfo.userId
                }
                if(keyword){
                    alreadyCount = keyword
                }
                if(searchid){
                    searchId = searchid
                }
                var sendInfo = {
                    clubId: this.clubInfo.clubId,
                    currcnt: alreadyCount,
                    length:panel_now._prePageLength,
                    userId:searchId,
                    startTime: this._start_time_date,
                    endTime: this._end_time_date,
                }
                cc.log("clubId = " + sendInfo.clubId + ",currcnt = " + sendInfo.currcnt + ",length" + sendInfo.length + ",userId" + sendInfo.userId)
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.ClubDirectlyPlayerEveryDayStatistics", sendInfo, function(rtn) {
                    MjClient.unblock();
                    cc.log(" ===== pkplayer.handler.ClubDirectlyPlayerEveryDayStatistics === " + JSON.stringify(rtn))
                    if (rtn.code == 0) {
                        var data = rtn.data  ? rtn.data : [];
                        that.refresClubEveryDayStatistics(data,data.playerList,data.myDirectlyPlayer, searchUser)
                    }else{
                        if(rtn.message){
                            MjClient.showMsgTop(rtn.message);
                        }
                    }
                });
            }
            if(this.roleId == 3 || this.roleId == 1){
                this.rquestClubEveryDayStatistics();
            }
            else{
                cc.log("MjClient.data.pinfo.uid", MjClient.data.pinfo.uid);
                that.rquestClubPlayerEveryDayStatistics("", 0,0, MjClient.data.pinfo.uid)
            }
        }
    },
    refreshHead: function(url, head) {
        head.needScale = 8;
        COMMON_UI.refreshHead(this, url, head);
    },
    addSelectTime:function(start_Time, end_Time){
        var that = this
        var nowTime = MjClient.getCurrentTime();

        // var _start_Time = panel_now.getChildByName("image_date1_bg");
        var _start_Time = start_Time
        var  point1 = _start_Time.convertToWorldSpace(_start_Time.getAnchorPointInPoints());

        point1.y = (point1.y+_start_Time.getBoundingBox().height/2);
        _start_Time.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var str =that._start_Time_date_txt.getString();
                str = str.replace(/-/g,"/");
                var date = new Date(str);
                var data = {event:"CZRZ_start_Time_date_txt",date:date,px:point1.x,py:point1.y};
                that.node.addChild(new friendcard_selectTime(data));
            }
        }, this);
        this._start_Time_date_txt = _start_Time.getChildByName("Text_date_start");
        this._start_Time_date_txt.setTextHorizontalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER)
        // this._start_Time_date_txt.setFontSize(this._start_Time_date_txt.getFontSize()-2)
        this._start_Time_date_txt.ignoreContentAdaptWithSize(true);
        this._setShowTime(this._start_Time_date_txt, nowTime[0], nowTime[1], nowTime[2], "00", "00");
        UIEventBind(null, this._start_Time_date_txt, "CZRZ_start_Time_date_txt", function (eD) {
            this._setShowTime(this._start_Time_date_txt,eD.year,eD.month,eD.day,eD.hour,eD.minute);
        }.bind(this));

        // var _end_Time = panel_now.getChildByName("image_date2_bg");
        var _end_Time = end_Time
        var  point2 = _end_Time.convertToWorldSpace(_end_Time.getAnchorPointInPoints());
        point2.y = (point2.y+_end_Time.getBoundingBox().height/2);
        _end_Time.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var str =that._end_Time_date_txt.getString();
                str = str.replace(/-/g,"/");
                var date = new Date(str);
                var data = {event:"CZRZ_end_Time_date_txt",date:date,px:point2.x,py:point2.y};
                that.node.addChild(new friendcard_selectTime(data));
            }
        }, this);
        this._end_Time_date_txt = _end_Time.getChildByName("Text_date_end");
        this._end_Time_date_txt.setTextHorizontalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER)
        // this._end_Time_date_txt.setFontSize(this._end_Time_date_txt.getFontSize()-2)
        this._end_Time_date_txt.ignoreContentAdaptWithSize(true);

        var nextDate = new Date(nowTime[0],nowTime[1]-1,nowTime[2] + 1);
        var nextTime = MjClient.getCurrentTime(nextDate);
        this._setShowTime(this._end_Time_date_txt,nextTime[0],nextTime[1],nextTime[2],"00","00");

        UIEventBind(null, this._end_Time_date_txt, "CZRZ_end_Time_date_txt", function (eD) {
            this._setShowTime(this._end_Time_date_txt,eD.year,eD.month,eD.day,eD.hour,eD.minute);
        }.bind(this));
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
    addCheckDay:function(btn_checkday){
        var that = this
        this.btn_checkDay = btn_checkday
        var  checkWeek_point = this.btn_checkDay.convertToWorldSpace(this.btn_checkDay.getAnchorPointInPoints());
        checkWeek_point.y = (checkWeek_point.y+this.btn_checkDay.getBoundingBox().height/2);
        this.btn_checkDay.addTouchEventListener(function(sender, type) {
            if (type != 2)
                return;
            MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_shijian_caidan", {uid:SelfUid()});
            var dayList = ["近5天","近3天","近2天","本周","今天"];
            var resList = null;
            if(FriendCard_Common.getSkinType() == 4){
                resList = [
                    "friendCards/tongji/btn_near_5day.png",
                    "friendCards/tongji/btn_near_3day.png",
                    "friendCards/tongji/btn_near_2day.png",
                    "friendCards/tongji/btn_cur_weekend_n.png",
                    "friendCards/tongji/btn_today_n.png"
                ]
            }
            var data = {event:"ledou_selectDay",list:dayList,resList:resList,px:checkWeek_point.x,py:checkWeek_point.y};
            that.node.addChild(new Friendcard_selectTJDay(data));
        }, this);
        UIEventBind(null, this.btn_checkDay, "ledou_selectDay", function(eD) {
            var str = eD.str
            var now = new Date();
            var startTime;
            if (str == "本周") {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Ledou_shijian_benzhou", {uid:SelfUid()});
                if (now.getDay() != 0) {
                    startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1); //从周一开始
                } else {
                    startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
                }
            }
            else if(str == "今天"){
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Ledou_shijian_jintian", {uid:SelfUid()});
                startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            }else {
                var rimeRange = Number(str.substring(1, 2));
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Ledou_shijian_" + rimeRange + "tian", {uid:SelfUid()});
                startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (rimeRange - 1));
            }
            this._setShowTime(this._start_Time_date_txt, startTime.getFullYear(), startTime.getMonth() + 1, startTime.getDate(),startTime.getHours(),startTime.getMinutes());
            this._setShowTime(this._end_Time_date_txt, now.getFullYear(), now.getMonth() + 1, now.getDate(),now.getHours(),now.getMinutes());
            var res = eD.res;
            if(res){
                this.btn_checkDay.loadTextureNormal(res);
            }else{
                this.btn_checkDay.getChildByName("Text_day").setString(str);
            }
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
    onExit: function () {
        this._super();
        MjClient.FriendCard_SXF_ledou = null;
    },
});


