
var FriendCard_Match_Tongji = cc.Layer.extend({
    ctor: function(clubData) {
        this._super();
        var that = this;
        that.clubData = clubData;
        that.clubId = clubData.info.clubId;
        that.isLM = FriendCard_Common.getClubisLM(clubData.info);
        that.nameMaxLen = 6;
        var resJson = "friendCard_Match_tongji.json";

        var UI = ccs.load(resJson);
        that.addChild(UI.node);

        that.uinode = UI.node;
        COMMON_UI.setNodeTextAdapterSize(UI.node);

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        that._back = _back;
        setWgtLayout(this._back, [1, 1], [0.5,0.5], [0, 0]);

        var _close = _back.getChildByName("btn_close");
        closeBtnAddLight(_close);
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent();
            }
        });

        that.initPanels();
        that.initBtnList();
        that.initDateSearch();
        that.initSearch();
        that.hideAllPanel();

        var panelArr = [that._clubPanel, that._groupPanel, that._assistantPanel]
        var btnArr = [that._btnClub, that._btnGroup, that._btnAssistant]
        for(i = 0; i<btnArr.length; i++){
            if (btnArr[i].visible) {
                that.refreshRequest(panelArr[i]);
                break;
            }
        }

        var txt_tip = that._back.getChildByName("Panel_bottom").getChildByName("txt_tip");
        if (txt_tip) {
            txt_tip.setString("小提示:榜单是以单个管理者审核的参赛人次进行排行,每10分钟刷新一次");
            if (FriendCard_Common.getSkinType() == 1) {
                txt_tip.setFontSize(18);
            }else if(FriendCard_Common.getSkinType() == 4){
                txt_tip.setString("小提示:榜单是以单个管理者审核的参赛人次进行\n排行,每10分钟刷新一次");
            }
            else{
                txt_tip.setFontSize(22);
            }
        }
    },
    initDateSearch: function(){
        var that = this;
        var bottomPanel = that._back.getChildByName("Panel_bottom");
        var btnPreDay = bottomPanel.getChildByName("Button_pre_date");
        var btnNextDay = bottomPanel.getChildByName("Button_next_date");
        var txtDate = bottomPanel.getChildByName("image_date").getChildByName("Text");

        btnPreDay.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var date = that._curPanel.date ? that._curPanel.date : (new Date()).getTime();
                date -= 24*60*60*1000;
                that._curPanel.date = date;
                that.refreshRequest(that._curPanel);
            }
        });
        btnNextDay.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var date = that._curPanel.date ? that._curPanel.date : (new Date()).getTime();
                date += 24*60*60*1000;
                that._curPanel.date = date;
                that.refreshRequest(that._curPanel);
            }
        });
        txtDate.setString(MjClient.dateFormat(new Date(), 'yyyy-MM-dd'));
    },
    initSearch: function(){
        var that = this;

        var img_search = that._back.getChildByName("img_search");
        var userIdEditBox = new cc.EditBox(img_search.getContentSize(), new cc.Scale9Sprite());
        this._userIdEditBox = userIdEditBox;
        userIdEditBox.setFontColor(cc.color("c3c3c3"));
        userIdEditBox.setMaxLength(10);
        userIdEditBox.setFontSize(20);
        userIdEditBox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        userIdEditBox.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        userIdEditBox.setFontName("fonts/lanting.TTF");
        userIdEditBox.setPlaceholderFontSize(20);
        userIdEditBox.setPlaceHolder("输入ID快速查找");
        userIdEditBox.setPosition(img_search.width / 2, img_search.height / 2);
        img_search.addChild(userIdEditBox);

        this.btn_search = img_search.getChildByName("btn_search");
        this.btn_clear = img_search.getChildByName("btn_clear");
        this.btn_search.visible = true;
        this.btn_clear.visible = false;

        this.btn_search.addTouchEventListener(function(sender, type) {
            if (type == 2) {
               var userId = userIdEditBox.getString();
               if (userId.length>0) {
                   that._curPanel.userId = parseInt(userId);
                   that.btn_search.visible = false;
                   that.btn_clear.visible = true;
                   that.refreshRequest(that._curPanel);
               }
            }
        });
        this.btn_clear.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                userIdEditBox.setString("");
                that._curPanel.userId = 0;
                that.btn_search.visible = true;
                that.btn_clear.visible = false;
                that.refreshRequest(that._curPanel);
            }
        });
    },
    setDate: function(){
        var that = this;
        var date = that._curPanel.date ? that._curPanel.date : (new Date()).getTime();
        var dataStr  = MjClient.dateFormat(new Date(date), 'yyyy-MM-dd');
        that._back.getChildByName("Panel_bottom").getChildByName("image_date").getChildByName("Text").setString(dataStr);
    },
    initPanels: function(){
        var that = this;
        that._clubPanel = that._back.getChildByName("Panel_club");
        that._groupPanel = that._back.getChildByName("Panel_group");
        that._assistantPanel = that._back.getChildByName("Panel_assistant");
        that._clubPanel.getChildByName("cell").setVisible(false);
        that._groupPanel.getChildByName("cell").setVisible(false);
        that._assistantPanel.getChildByName("cell").setVisible(false);
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        var time = date.getTime();
        that._clubPanel.date = time;
        that._groupPanel.date = time;
        that._assistantPanel.date = time;
    },
    initBtnList: function() {
        var that = this;
        var btn_club = that._back.getChildByName("btn_club");
        var btn_group = that._back.getChildByName("btn_group");
        var btn_assistant = that._back.getChildByName("btn_assistant");

        that._btnClub = btn_club;
        that._btnGroup = btn_group;
        that._btnAssistant = btn_assistant;

        var setBtnEnabled = function(btn, bEnable){
            btn.setEnabled(bEnable);
            if (FriendCard_Common.getSkinType() == 4) {
                btn.getChildByName("txt_normal").visible = bEnable;
                btn.getChildByName("txt_select").visible = !bEnable;
            }
        }

        var resetTouch = function() {
            setBtnEnabled(btn_club, true);
            setBtnEnabled(btn_group, true);
            setBtnEnabled(btn_assistant, true);
        }

        //亲友圈势力榜
        btn_club.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                resetTouch();
                setBtnEnabled(btn_club, false);
    
                if (that._clubPanel.userId){
                    that._userIdEditBox.setString(that._clubPanel.userId);
                    that.btn_search.visible = false;
                    that.btn_clear.visible = true;
                }else{
                    that._userIdEditBox.setString("");
                    that.btn_search.visible = true;
                    that.btn_clear.visible = false;
                }
        
                if (that._clubPanel.datas)
                    that.showClubPanel();
                else
                    that.refreshRequest(that._clubPanel);
            }
        });

        // 组长势力榜
        btn_group.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                resetTouch();
                setBtnEnabled(btn_group, false);
                if (that._groupPanel.userId){
                    that._userIdEditBox.setString(that._groupPanel.userId);
                    that.btn_search.visible = false;
                    that.btn_clear.visible = true;
                }else{
                    that._userIdEditBox.setString("");
                    that.btn_search.visible = true;
                    that.btn_clear.visible = false;
                }
                if (that._groupPanel.datas)
                    that.showGroupPanel();
                else
                    that.refreshRequest(that._groupPanel);
            }
        });
        
        //助理势力榜
        btn_assistant.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                resetTouch();
                setBtnEnabled(btn_assistant, false);

                if (that._assistantPanel.userId){
                    that._userIdEditBox.setString(that._assistantPanel.userId);
                    that.btn_search.visible = false;
                    that.btn_clear.visible = true;
                }else{
                    that._userIdEditBox.setString("");
                    that.btn_search.visible = true;
                    that.btn_clear.visible = false;
                }

                if (that._assistantPanel.datas)
                    that.showAssistantPanel();
                else
                    that.refreshRequest(that._assistantPanel);
            }
        });
        var btnArr = [btn_club,btn_group,btn_assistant];
        var btnPosArr = [];
        for(var i = 0; i<btnArr.length; i++){
            btnPosArr[i] = btnArr[i].getPosition();
        }

        if (that.isLM) 
        {//联盟
            btn_club.visible = FriendCard_Common.isLMChair() || FriendCard_Common.isSupperManger() || FriendCard_Common.isManager();//亲友圈势力榜，会长|盟主可见
            btn_group.visible = FriendCard_Common.isLMChair() || FriendCard_Common.isSupperManger() || FriendCard_Common.isManager() || FriendCard_Common.isGroupLeader() !== false;//组长势力榜，会长|盟主|组长可见
        }else{//亲友圈
            btn_club.visible = false; //亲友圈势力榜不可见
            btn_group.visible = FriendCard_Common.isLeader() || FriendCard_Common.isManager() || FriendCard_Common.isGroupLeader() !== false;//组长势力榜，会长|组长可见
        }
        btn_assistant.visible =  FriendCard_Common.isGroupLeader() !== false || FriendCard_Common.isAssistants();//助理势力榜，助理|组长可见

        var showIdx = 0;
        for(var i = 0; i<btnArr.length; i++){
            if (btnArr[i].visible) {
                btnArr[i].setPosition(btnPosArr[showIdx++])
            }
        }
        resetTouch();
        for(var i = 0; i<btnArr.length; i++){
            if (btnArr[i].visible) {
                setBtnEnabled(btnArr[i], false);
                break;
            }
        }

    },

    refreshRequest: function(panel) {
        var that = this;
        var sendInfo = {}
        if (that.isLM){
            sendInfo.leagueId = that.clubId;
            sendInfo.clubId = that.clubData.subClubId;
        }else{
            sendInfo.clubId = that.clubId;
        }
        sendInfo.startTime = panel.date;
        sendInfo.endTime = sendInfo.startTime + 24*60*60*1000;
        if (panel.userId) {
            sendInfo.userId = panel.userId;
        }
        MjClient.block();
        var api = that.isLM ? "pkplayer.handler.leagueMatchInfluence" : "pkplayer.handler.clubMatchInfluence";
        cc.log("api = " + api +" sendInfo = " + JSON.stringify(sendInfo));
        MjClient.gamenet.request(api, sendInfo, function(rtn) {
            MjClient.unblock();
            if (rtn.code == 0) {
                switch (panel) {
                    case that._clubPanel:
                        that.showClubPanel(rtn.data.club);
                        break;
                    case that._groupPanel:
                        that.showGroupPanel(rtn.data.group, rtn.data.groupScore);
                        break;
                    case that._assistantPanel:
                        that.showAssistantPanel(rtn.data.assis, rtn.data.assisScore);
                        break;
                    default:
                        cc.log("refreshRequest todo");
                }
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
        }); 
    },

    hideAllPanel: function() {
        this._clubPanel.setVisible(false);
        this._groupPanel.setVisible(false);
        this._assistantPanel.setVisible(false);
    },
    //亲友圈势力榜
    showClubPanel: function(datas){
        var that = this;
        that.hideAllPanel();
        that._curPanel = that._clubPanel;
        this._clubPanel.setVisible(true);
        that.setDate();
        if (!datas)
            return;
        that._curPanel.datas = datas;
        that._curPanel.getChildByName("txt_totalScore").visible = false;
        that._curPanel.getChildByName("txt_totalScoreTitle").visible = false;
        var cell = that._clubPanel.getChildByName("cell");
        var contentList = that._clubPanel.getChildByName("content_list");
        contentList.removeAllItems();
        cell.setVisible(true);
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var item = cell.clone();
            contentList.pushBackCustomItem(item);
            item.getChildByName("text_name").setString(getNewName(unescape(data.nickname), that.nameMaxLen));
            item.getChildByName("text_ID").setString(data.userId + "");
            item.getChildByName("text_club").setString(unescape(data.clubname) +"\n" + data.clubId);
            item.getChildByName("text_totalScore").setString(data.score +"")   
            item.getChildByName("text_userNums").setString(data.players +"");
            var Image_rank = item.getChildByName("Image_rank");
            var text_rank = item.getChildByName("text_rank")
            if (data.rank>0 && data.rank<=3) {
                Image_rank.loadTexture("friendCards_Match/img_rank_"+data.rank+".png")
                text_rank.visible = false;
                Image_rank.visible = true;
            }else{
                text_rank.setString(data.rank +"");
                text_rank.visible = true;
                Image_rank.visible = false;
            }
            var btn_detail = item.getChildByName("btn_detail")
            btn_detail.visible = false;
            if(data.clubId == that.clubData.subClubId){
                btn_detail.visible  = true
                btn_detail.data = data;
                btn_detail.addTouchEventListener(function(sender, type) {
                    if (type == 2){
                        var param = {};
                        param.clubId = sender.data.clubId;
                        param.date = that._curPanel.date;
                        that.addChild(new FriendCard_Match_TongjiDetail(that.clubData, param));
                    }
                }, that);
            }
            
        }
        cell.setVisible(false);
        that.showEmptyText(datas.length == 0);
    },
    //组长势力榜
    showGroupPanel: function(datas, totalScore){
        var that = this;
        that.hideAllPanel();
        that._curPanel = that._groupPanel;
        that._groupPanel.setVisible(true);
        that.setDate();

        if (!datas)
            return;

        var txt_totalScore = that._curPanel.getChildByName("txt_totalScore");
        var txt_totalScoreTitle = that._curPanel.getChildByName("txt_totalScoreTitle");
        if (typeof(totalScore) != "undefined" && that.isLM && FriendCard_Common.isGroupLeader() === false) {
            txt_totalScore.visible = true;
            txt_totalScoreTitle.visible = true;
            txt_totalScore.setString(totalScore);
        }else{
            txt_totalScore.visible = false;
            txt_totalScoreTitle.visible = false;
        }

        that._curPanel.datas = datas;
        var cell = that._groupPanel.getChildByName("cell");
        var contentList = that._groupPanel.getChildByName("content_list");
        contentList.removeAllItems();
        cell.setVisible(true);
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var item = cell.clone();
            contentList.pushBackCustomItem(item);
            item.getChildByName("text_name").setString(getNewName(unescape(data.nickname), that.nameMaxLen));
            item.getChildByName("text_ID").setString(data.userId + "");
            item.getChildByName("text_group").setString(data.group==0 ? "未分组": data.group+"组");
            item.getChildByName("text_totalScore").setString(data.score + "")   
            item.getChildByName("text_userNums").setString(data.players + "");

            var Image_rank = item.getChildByName("Image_rank");
            var text_rank = item.getChildByName("text_rank")
            if (data.rank>0 && data.rank<=3) {
                Image_rank.loadTexture("friendCards_Match/img_rank_"+data.rank+".png")
                text_rank.visible = false;
                Image_rank.visible = true;
            }else{
                text_rank.setString(data.rank +"");
                text_rank.visible = true;
                Image_rank.visible = false;
            }

            var roleText = FriendCard_Common.getRoleTextByRoleId(data.roleId) ;
            var hasGroupLeader = false;
            if (roleText != "组长" && roleText != "会长" && roleText != "盟主") {
                //没有组长显示无；会长|盟主为未分组的组长
                item.getChildByName("text_name").setString("无");
                item.getChildByName("text_name").y = item.getChildByName("text_group").y;
                item.getChildByName("text_ID").visible = false;
            }
            else{
                hasGroupLeader = true;
                if (data.isPermission==0) {
                    //有组长，没有审核权限
                    var noRightImg = new ccui.ImageView("friendCards_Match/tongji/noRight.png");
                    item.addChild(noRightImg);
                    noRightImg.x = item.getChildByName("text_rank").x+80;
                    noRightImg.y = item.getChildByName("text_rank").y;
                }
            }
            
            
            var btn_detail = item.getChildByName("btn_detail")
            btn_detail.visible = false;

            //有组长的，组长可查看自己租的选手；没有组长或者组长没有审核权限，会长可查看选手
            if( (hasGroupLeader && (data.userId == SelfUid() || (FriendCard_Common.isManager() && data.group==0)))
            || ((!hasGroupLeader || data.isPermission==0) && (FriendCard_Common.isManager() || FriendCard_Common.isLMChair() ||  FriendCard_Common.isLeader())) ){
                btn_detail.visible  = true
                btn_detail.data = data;
                btn_detail.addTouchEventListener(function(sender, type) {
                    if (type == 2){
                        var param = {};
                        param.clubId = sender.data.clubId;
                        param.groupId = sender.data.group;
                        param.date = that._curPanel.date;
                        that.addChild(new FriendCard_Match_TongjiDetail(that.clubData, param));
                    }
                }, that);
            }
        }
        cell.setVisible(false);
        that.showEmptyText(datas.length == 0);
    },
    //助理势力榜
    showAssistantPanel: function(datas, totalScore){
        var that = this;
        that.hideAllPanel();
        this._assistantPanel.setVisible(true);
        that._curPanel = that._assistantPanel;
        that.setDate();

        if (!datas)
            return;


        var txt_totalScore = that._curPanel.getChildByName("txt_totalScore");
        var txt_totalScoreTitle = that._curPanel.getChildByName("txt_totalScoreTitle");
        if (typeof(totalScore) != "undefined" && !FriendCard_Common.isAssistants()) {
            txt_totalScore.visible = true;
            txt_totalScoreTitle.visible = true;
            txt_totalScore.setString(totalScore);
        }else{
            txt_totalScore.visible = false;
            txt_totalScoreTitle.visible = false;
        }
        that._curPanel.datas = datas;
        var cell = that._assistantPanel.getChildByName("cell");
        var contentList = that._assistantPanel.getChildByName("content_list");
        contentList.removeAllItems();
        cell.setVisible(true);
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var item = cell.clone();
            contentList.pushBackCustomItem(item);
            item.getChildByName("text_name").setString(getNewName(unescape(data.nickname), that.nameMaxLen));
            item.getChildByName("text_ID").setString(data.userId + "");
            if (FriendCard_Common.getRoleTextByRoleId(data.roleId) == "组长") {
                item.getChildByName("text_group").setString("组长");
            }else{
                item.getChildByName("text_group").setString("助理"+data.assistantNo);
            }
            item.getChildByName("text_totalScore").setString(data.score +"")   
            item.getChildByName("text_userNums").setString(data.players +"");

            var Image_rank = item.getChildByName("Image_rank");
            var text_rank = item.getChildByName("text_rank")
            if (data.rank>0 && data.rank<=3) {
                Image_rank.loadTexture("friendCards_Match/img_rank_"+data.rank+".png")
                text_rank.visible = false;
                Image_rank.visible = true;
            }else{
                text_rank.setString(data.rank +"");
                text_rank.visible = true;
                Image_rank.visible = false;
            }
            var btn_detail = item.getChildByName("btn_detail")
            btn_detail.visible = true;
            btn_detail.visible = false;
            if(data.userId == SelfUid()){
                btn_detail.visible  = true
                btn_detail.data = data;
                btn_detail.addTouchEventListener(function(sender, type) {
                    if (type == 2){
                        var param = {};
                        param.clubId = sender.data.clubId;
                        param.groupId = sender.data.group;
                        param.assisId = sender.data.userId;
                        param.date = that._curPanel.date;
                        that.addChild(new FriendCard_Match_TongjiDetail(that.clubData, param));
                    }
                }, that);
            }
            if (data.isPermission==0) {
                //没有审核权限
                var noRightImg = new ccui.ImageView("friendCards_Match/tongji/noRight.png");
                item.addChild(noRightImg);
                noRightImg.x = item.getChildByName("text_rank").x+80;
                noRightImg.y = item.getChildByName("text_rank").y;
            }
        }
        cell.setVisible(false);
        that._curPanel.data = (new Date()).getTime();
        that.showEmptyText(datas.length == 0);
    },

    showEmptyText: function(isShow) {
        var that = this;
        if (that._curPanel.emptyTxt) {
            that._curPanel.emptyTxt.setVisible(isShow);
            return;
        } else if (!isShow) {
            return;
        }

        var emptyTxt = new ccui.Text();
        emptyTxt.setFontName("fonts/lanting.TTF");
        emptyTxt.setFontSize(30);
        emptyTxt.setString("暂无数据");
        emptyTxt.setColor(cc.color(0x79, 0x34, 0x12));
        emptyTxt.setName("emptyTextTip");
        emptyTxt.setPosition(that._curPanel.width / 2, that._curPanel.height / 2);
        that._curPanel.addChild(emptyTxt);
        that._curPanel.emptyTxt = emptyTxt;
    },
});

//审核权限
var FriendCard_Match_TongjiDetail = cc.Layer.extend({
    ctor: function(clubData, param) {
        this._super();
        var that = this;
        that.param = param;
        that.clubData = clubData;
        that.clubId = clubData.info.clubId;
        that.isLM = FriendCard_Common.getClubisLM(clubData.info);

        that.nameMaxLen = 6;
        var node = ccs.load("friendcard_Match_tongjiDetail.json").node;
        that.addChild(node);
        that.uinode = node;
        that.panel = node.getChildByName("Panel");
        COMMON_UI.setNodeTextAdapterSize(node);
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5,0.5], [0, 0], true);
        setWgtLayout(this.panel, [1, 1], [0.5,0.5], [0, 0]);
        popupAnm(that.panel);
        var _close = that.panel.getChildByName("close");
        closeBtnAddLight(_close);
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2){
                that.removeFromParent();
            }
        }, that);
        that.panel.getChildByName("cell").setVisible(false);
        that.rquestMemberList();

    },

    rquestMemberList:function()
    {
        var that = this;
        MjClient.block();
        var api = that.isLM ? "pkplayer.handler.leagueMatchInfluencePlayer" : "pkplayer.handler.clubMatchInfluencePlayer";

        var sendInfo = {};

        if (that.isLM){
            sendInfo.leagueId = that.clubId;
            sendInfo.clubId = that.clubData.subClubId;
        }else{
            sendInfo.clubId = that.clubId;
        }
        sendInfo.groupId = that.param.groupId;
        sendInfo.assisId = that.param.assisId;
        sendInfo.startTime = that.param.date;
        sendInfo.endTime = sendInfo.startTime + 24*60*60*1000;
        MjClient.gamenet.request(api, sendInfo,  function(rtn)
        {   
            MjClient.unblock();
            if(rtn.code == 0)
            {
                if(cc.sys.isObjectValid(that))
                    that.showMemblist(rtn.data);
            }
            else
            {
                FriendCard_Common.serverFailToast(rtn);
            }  
        });
    },
    showMemblist: function(datas){
        var that = this;
         if (!datas)
            return;
        var cell = that.panel.getChildByName("cell");
        var contentList = that.panel.getChildByName("content_list");
        contentList.removeAllItems();
        cell.setVisible(true);
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var item = cell.clone();
            contentList.pushBackCustomItem(item);
            that.refreshHead(data.headimgurl, item.getChildByName("image_head"));
            item.getChildByName("text_name").setString(getNewName(unescape(data.nickname), that.nameMaxLen));
            item.getChildByName("text_ID").setString(data.userId + "");
            item.getChildByName("text_rank").setString(data.rank +"");
            item.getChildByName("text_match").setString(unescape(data.matchname));
            item.getChildByName("text_matchState").setString(["","参赛中","已淘汰","已退赛"][data.status])   
            that.setStateStr(item.getChildByName("text_onlineState"), data.isOnline) 
        }
        cell.setVisible(false);

        if (datas.length == 0) {
            var emptyTxt = new ccui.Text();
            emptyTxt.setFontName("fonts/lanting.TTF");
            emptyTxt.setFontSize(30);
            emptyTxt.setString("暂无数据");
            emptyTxt.setColor(cc.color(0x79, 0x34, 0x12));
            emptyTxt.setName("emptyTextTip");
            emptyTxt.setPosition(that.panel.width / 2, that.panel.height / 2);
            that.panel.addChild(emptyTxt);
        }
    },
    setStateStr: function(stateLabel, isOnline) {
        if (isOnline) {
            stateLabel.setString("在线");
            stateLabel.setTextColor(cc.color("#24a92a"));
        } else {
            stateLabel.setString("离线");
        }
    },
    refreshHead: function(url, head) {
        head.needScale = 8;
        head.isMask = true;
        COMMON_UI.refreshHead(this, url ? url : "png/default_headpic.png", head);
    },

});
