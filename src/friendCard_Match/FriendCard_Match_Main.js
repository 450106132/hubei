
var Friendcard_Match_Main = cc.Layer.extend({
    ctor: function(clubData) {
        this._super();
        var that = this;
        that.clubData = clubData;
        that.clubId = clubData.info.clubId;
        that.isLM = FriendCard_Common.getClubisLM(clubData.info);
        that.nameMaxLen = 6;
        var resJson = "friendcard_Match_Main.json";
        if (isIPhoneX() && FriendCard_Common.getSkinType() != 4) {
            resJson = "friendcard_Match_MainX.json";
        }
        var UI = ccs.load(resJson);
        that.addChild(UI.node);

        that.uinode = UI.node;
        COMMON_UI.setNodeTextAdapterSize(UI.node);

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        that._back = _back;

        if (FriendCard_Common.getSkinType() == 2) {//岳阳皮肤
            var _close = that.uinode.getChildByName("close");
            var Image_di = that.uinode.getChildByName("Image_di");
            var suizi = that.uinode.getChildByName("suizi")
            var listView_leftBG = that.uinode.getChildByName("ListView_leftBG");

            Image_di.width = MjClient.size.width;
            Image_di.height = MjClient.size.height * 0.9306;
            Image_di.setPosition(MjClient.size.width / 2, MjClient.size.height / 2);


            if (isIPhoneX()) {
                setWgtLayout(_close, [0.1, 0.2815], [0.9741, 0.8407], [0, 0], false);
                setWgtLayout(suizi, [0.0148, 0.3853], [0.9764, 0.8733], [0, 0], false);
                setWgtLayout(_back, [1, 0.9653], [0.5, 0.5], [0, 0], false);
                listView_leftBG.width = MjClient.size.width * 0.2170;
                listView_leftBG.height = MjClient.size.height * 0.8885;
                listView_leftBG.setPosition(0, MjClient.size.height * 0.4991);
            } else {
                setWgtLayout(_close, [0.1188, 0.2236], [0.9713, 0.8657], [0, 0], false);
                setWgtLayout(suizi, [0.0148, 0.3853], [0.9764, 0.8733], [0, 0], false);
                setWgtLayout(_back, [1, 0.9306], [0.5, 0.5], [0, 0], false);
                listView_leftBG.width = MjClient.size.width * 0.2069;
                listView_leftBG.height = MjClient.size.height * 0.8897;
                listView_leftBG.setPosition(0, MjClient.size.height * 0.4999);
            }
            closeBtnAddLight(_close);
        }else if(FriendCard_Common.getSkinType() == 1){//晋中
            var _close = that.uinode.getChildByName("close");
            var Image_di = that.uinode.getChildByName("Image_di");
            setWgtLayout(_close , [0.15, 0.1097], [0.997, 1], [0, 0],false);
            Image_di.width = MjClient.size.width;
            Image_di.height = MjClient.size.height *0.9653;
            Image_di.setPosition(MjClient.size.width/2,MjClient.size.height/2);
            setWgtLayout(that._back , [2.0, 0.9653], [0.5, 0.5], [0, 0],false);
            var Image_hua = that.uinode.getChildByName("Image_hua");
            var Image_left = that.uinode.getChildByName("Image_left");
            if(isIPhoneX()){
                setWgtLayout(Image_left , [0.2976   , 1.0402], [0, 0], [0, 0],false);
                setWgtLayout(Image_hua , [0.1830, 0.2220], [0.0156, 0.9792], [0, 0],false);
            }else{
                setWgtLayout(Image_hua, [0.1773, 0.1764], [0.0156, 0.9792], [0, 0],false);
                setWgtLayout(Image_left, [0.2883, 0.8264], [0, 0], [0, 0],false);
            }
            closeBtnAddLight(_close);
        }else if(FriendCard_Common.getSkinType() == 4){//湖北皮肤
            var _close = that._back.getChildByName("close");
            setWgtLayout(_back, [1, 0.9653], [0.5, 0.5], [0, 0], false);
        }

       

        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent();
            }
        });

        
        that.initPanels();
        that.initBtnList();
        that.initSortSearch();
        that.hideAllListPanel();

        if (FriendCard_Common.isLeader() || that.clubData.matchQuotaAudit == 1) 
        {
            that.refreshRequest(that._managerPanel);
        }else{
           that.refreshRequest(that._checkPanel); 
        }
        

        UIEventBind(null, that, "matchInfoChange", function(eD) {
            that._managerPanel.datas = null;
            that._memberListPanel.datas = null;
            that._checkPanel.datas = null;
            var actionTag = 20191205;
            that.stopActionByTag(actionTag);
            var action = cc.sequence(cc.delayTime(0.3), cc.callFunc(function() {
                that.refreshRequest(that._curPanel);
            }))
            action.setTag(actionTag);
            that.runAction(action);
        });

        UIEventBind(null, that, "update_match_check", function(eD) {
            postEvent("matchInfoChange", {});
            that.clubData.redpointMatchButton = eD.isShow;
            that.updateCheckRedPoint();
        });


    },
    initPanels: function(){
        var that = this;
        that._managerPanel = that._back.getChildByName("Panel_manager");
        that._memberListPanel = that._back.getChildByName("Panel_memberList");
        that._checkPanel = that._back.getChildByName("Panel_check");

        that._managerPanel.getChildByName("cell").setVisible(false);
        that._memberListPanel.getChildByName("cell").setVisible(false);
        that._checkPanel.getChildByName("cell").setVisible(false);

        // that._memberListPanel.pageIdx = 1;
        that._memberListPanel.pageLen = 20;
        that._memberListPanel.pageCount = 0;
        that._memberListPanel.isLoadingData = false;

        var memberList = that._memberListPanel.getChildByName("content_list");
        FriendCard_UI.setListAutoLoadMore(memberList,function(){
            FriendCard_UI.addListBottomTipUi(memberList,1)
            that.requestMemberList();
        },function(){
            if (!that._memberListPanel.isLoadingData && that._memberListPanel.hasMoreData){
                return true;
            }
            return false
        })

        that._checkPanel.pageIdx = 1;
        that._checkPanel.pageLen = 20;
        that._checkPanel.isLoadingData = false;
        var checkList = that._checkPanel.getChildByName("content_list");
        FriendCard_UI.setListAutoLoadMore(checkList,function(){
            FriendCard_UI.addListBottomTipUi(checkList,1)
            that.requestCheckList();
        },function(){
            if (!that._checkPanel.isLoadingData && that._checkPanel.hasMoreData){
                return true;
            }
            return false
        })
    },
    initBtnList: function() {
        var that = this;
        if (FriendCard_Common.getSkinType() == 4) {
            //湖北
            var Panel_Left = that._back.getChildByName("Panel_Left")

        }else{
            var Panel_Left = that.uinode.getChildByName("Panel_Left")
            setWgtLayout(Panel_Left, [0.2063, 1], [0, 0], [0, 0], false);
            if (FriendCard_Common.getSkinType() == 1) {
                setWgtLayout(Panel_Left, [0.1463, 0.8], [0.0868, 0.0896], [0, 0], false);
            }
        }
        

        var btnListView = Panel_Left.getChildByName("btnListView");

        if (!Panel_Left.getChildByName("_btn_rank")) {
			var _btn_rank = new ccui.Button("friendCards_Match/btnRank_n.png","friendCards_Match/btnRank_s.png","friendCards_Match/btnRank_s.png");
			_btn_rank.setPosition(cc.p(Panel_Left.width/2, 85));
			_btn_rank.setName("_btn_rank");
            Panel_Left.addChild(_btn_rank);
            var clubId = that.clubData.info.leagueId? that.clubData.info.leagueId:that.clubData.info.clubId;
            that._matchData = that.clubData.matchUser;
			_btn_rank.addTouchEventListener(function (sender, type) {
				if (type == 2) {
                    that.addChild(new FriendCard_Match_rankLayer(that.clubData.info, clubId, that._matchData.matchId, that.clubData.subClubId));

				}
			},this);
			this._btn_rank = _btn_rank;
		}

        if (!Panel_Left.getChildByName("_btn_tongji")) {
            var _btn_tongji = new ccui.Button("friendCards_Match/btn_tongji_n.png","friendCards_Match/btn_tongji_p.png","friendCards_Match/btn_tongji_p.png");
            _btn_tongji.setPosition(cc.p(Panel_Left.width/2, 150));
            _btn_tongji.setName("_btn_tongji");
            Panel_Left.addChild(_btn_tongji);
            _btn_tongji.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    that.addChild(new FriendCard_Match_Tongji(that.clubData));
                }
            },this);
            this._btn_tongji = _btn_tongji;
        }

        // btnListView.setVisible(false);
        var setBtnEnabled = function(btn, bEnable){
            btn.setEnabled(bEnable);
            if (FriendCard_Common.getSkinType() == 4) {
                btn.getChildByName("txt_normal").visible = bEnable;
                btn.getChildByName("txt_select").visible = !bEnable;
            }
        }

        var resetTouch = function() {
            setBtnEnabled(btn_memberList, true);
            setBtnEnabled(btn_check, true);
            setBtnEnabled(btn_manager, true);
        }

        //参赛成员列表
        var btn_memberList = btnListView.getChildByName("btn_memberList");
        // btn_memberList.setEnabled(false);
        btn_memberList.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                resetTouch();
                setBtnEnabled(btn_memberList, false);
                if (that._memberListPanel.datas)
                    that.showMemberListPanel();
                else
                    that.refreshRequest(that._memberListPanel);
            }
        });

        // 比赛审核
        var btn_check = btnListView.getChildByName("btn_check");
        btn_check.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                resetTouch();
                setBtnEnabled(btn_check, false);
                if (that._checkPanel.datas){
                    that.showCheckPanel();
                }
                else{
                    that._checkPanel.pageIdx = 1;
                    that.refreshRequest(that._checkPanel);
                }
            }
        });
        


        var btn_manager = btnListView.getChildByName("btn_manager");
        btn_manager.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                resetTouch();
                setBtnEnabled(btn_manager, false);
                if (that._managerPanel.datas)
                    that.showManagerPanel();
                else
                    that.refreshRequest(that._managerPanel);
            }
        });
        that.updateCheckRedPoint();

        if (FriendCard_Common.isLeader() || that.clubData.matchQuotaAudit == 1) 
        {
            setBtnEnabled(btn_manager, false);
        }else{
            setBtnEnabled(btn_check, false);
            btn_manager.removeFromParent();
        }
    },

    updateCheckRedPoint: function(){
        if (FriendCard_Common.getSkinType() == 4) {
            //湖北
            var Panel_Left = this._back.getChildByName("Panel_Left")

        }else{
            var Panel_Left = this.uinode.getChildByName("Panel_Left")
        }
        var Image_point =  Panel_Left.getChildByName("btnListView").getChildByName("btn_check").getChildByName("Image_point");
        Image_point.setVisible(this.clubData.redpointMatchButton == 1)
    },
    initSortSearch: function() {
        var that = this;

        var sortSearchPanel = that._back.getChildByName("sortSearchPanel");
        that._sortSearchPanel = sortSearchPanel;
        that._sortSelectNode = sortSearchPanel.getChildByName("sortSelectNode");
        that._sortOptionNode = sortSearchPanel.getChildByName("sortOptionNode");
        that._groupSelectNode = sortSearchPanel.getChildByName("groupSelectNode");
        that._search = sortSearchPanel.getChildByName("Image_search");

        that._sortSelectNode.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.sortSelectOption(that._sortSelectNode, sortList.getItems(), that._curPanel.searchData.sort || 0, that._sortOptionNode);
                that._sortOptionNode.setVisible(true);
                that._sortSelectNode.getChildByName("Button_jiaotou").setBright(false);
            }
        });

        that._sortOptionNode.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that._sortOptionNode.setVisible(false);
                that._sortSelectNode.getChildByName("Button_jiaotou").setBright(true);
            }
        });

        var sortValues = {
            0: "综合排序",
            1: "新加入在前",
            2: "新加入在后",
            3: "只看组长",
            4: "只看在线",
            5: "只看对局中",
            6: "只看离线",
            7: "只看管理员",
            8: "登陆时间倒序",
            9: "直属成员",

        };
        var sortList = that._sortOptionNode.getChildByName("sortList");
        var cell = that._sortOptionNode.getChildByName("cell");
        cell.setVisible(true);
        that._sortSelectNode.sort = 0;
        for (var sort in sortValues) {
            var item = cell.clone();
            sortList.pushBackCustomItem(item);
            item.getChildByName("Text_sort").setString(sortValues[sort]);
            item.sort = Number(sort);
            item.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    that.sortSelectOption(that._sortSelectNode, sortList.getItems(), sender.sort, that._sortOptionNode);
                    if (!that._curPanel.searchData)
                        that._curPanel.searchData = {}; 
                    that._curPanel.searchData.sort = sender.sort;
                    that.refreshRequest(that._curPanel);
                }
            });
        }
        cell.setVisible(false);

        that._groupSelectNode.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var others = [];
                others.push("全部分组");
                others.push("未分组");
                var data = {
                    event: "FRIENDCARD_MATCH_CHECKFENZU",
                    numberGroup: FriendCard_Common.getGroupNumber(),
                    others: others
                };
                that.addChild(new friendcard_selectGroup(data));
            }
        });

        that._groupSelectNode.groupId = -1;
        UIEventBind(null, that._groupSelectNode, "FRIENDCARD_MATCH_CHECKFENZU", function(eD) {
            var groupId = eD.groupType;
            if (groupId == "全部分组") {
                that._groupSelectNode.getChildByName("text").setString("全部分组");
                groupId = -1;
            } else if (eD.groupType == "未分组") {
                that._groupSelectNode.getChildByName("text").setString("未分组");
                groupId = 0;
            } else {
                that._groupSelectNode.getChildByName("text").setString(eD.groupType + "组");
                groupId = eD.groupType;
            }
            if (!that._curPanel.searchData)
                that._curPanel.searchData = {};
            that._curPanel.searchData.groupId = groupId;
            that.refreshRequest(that._curPanel);
        });

        var userIdEditBox = new cc.EditBox(that._search.getContentSize(), new cc.Scale9Sprite("friendCards/common/img_dikuang.png"));
        that._userIdEditBox = userIdEditBox;
        userIdEditBox.setFontColor(cc.color("E33232"));
        userIdEditBox.setMaxLength(10);
        userIdEditBox.setFontSize(30);
        //userIdEditBox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        userIdEditBox.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        userIdEditBox.setFontName("fonts/lanting.TTF");
        userIdEditBox.setPlaceholderFontSize(30);
        userIdEditBox.setPlaceHolder("请输入玩家信息...");
        userIdEditBox.setPosition(that._search.width / 2, that._search.height / 2);
        that._search.addChild(userIdEditBox);

        that._search.userId = -1;
        that._search.getChildByName("Button_find").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (!that._curPanel.searchData)
                    that._curPanel.searchData = {};
                that._curPanel.searchData.userId = userIdEditBox.getString();
                that.refreshRequest(that._curPanel);
            }
        });

        sortSearchPanel.getChildByName("Button_all_member").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (!that._curPanel.searchData)
                    that._curPanel.searchData = {};
                that._curPanel.searchData.userId = -1;
                userIdEditBox.setString("");
                that.refreshRequest(that._curPanel);
            }
        });

        // var curPanel = null;
        // sortSearchPanel.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function() {
        //     if (curPanel == that._curPanel)
        //         return;

        //     curPanel = that._curPanel;
        //     var searchData = curPanel.searchData;
        //     if (!searchData) {
        //         searchData = curPanel.searchData = {};
        //     }

        //     var textNode = that._sortSelectNode.getChildByName("text");
        //     textNode.setString("sort" in searchData ? sortValues[searchData.sort] : sortValues[0]);
        //     textNode.setScale(textNode.getString().length >= 6 ? 0.8 : 1);

        //     if (!("groupId" in searchData) || searchData.groupId == -1)
        //         that._groupSelectNode.getChildByName("text").setString("全部分组");
        //     else
        //         that._groupSelectNode.getChildByName("text").setString(searchData.groupId == 0 ? "未分组" : searchData.groupId + "组");
            
        //     userIdEditBox.setString("userId" in searchData && searchData.userId != -1 ? searchData.userId + "" : "");
        // })).repeatForever());
    },
    sortSelectOption: function(selectNode, itemNodes, sort, optionNode) {
        for (var i = 0; i < itemNodes.length; i++) {
            if(itemNodes[i].getChildByName("Image_selected")){
                itemNodes[i].getChildByName("Image_selected").setVisible(itemNodes[i].sort == sort);
            }
            if (itemNodes[i].sort == sort) {
                var textNode = selectNode.getChildByName("text");
                textNode.setString(itemNodes[i].getChildByName("Text_sort").getString());
                textNode.setScale(textNode.getString().length >= 6 ? 0.8 : 1);
            }
        }

        optionNode.visible = false;
        selectNode.getChildByName("Button_jiaotou").setBright(true);
    },

    setSortSearchForCurPanel: function() {
        var that = this;
        var sortValues = {};
        if (that._curPanel == that._checkPanel) {
            if (that.isLM) {
                sortValues = {
                    0: "综合排序",
                    1: "只看参赛",
                    2: "只看退赛",
                    3: "只看到期",
                    4: "只看删除",
                    5: "只看取消",
                };
            }else{
                sortValues = {
                    1: "综合排序",
                    2: "时间倒序",
                    3: "时间正序",
                    4: "只看同意",
                    5: "只看拒绝",
                    6: "只看参赛",
                    7: "只看退赛",
                    8: "只看到期",
                    9: "只看删除",
                };
            }
            
        }else{
            sortValues = {
                0: "综合排序",
                1: "只看参赛中",
                2: "只看已淘汰",
                3: "只看已退赛",
            };
        }
        var sortList = that._sortOptionNode.getChildByName("sortList");
        var cell = that._sortOptionNode.getChildByName("cell");
        if (that.isLM) {
            var itemNum = that._curPanel == that._checkPanel ? 6:4
        }else{
            var itemNum = that._curPanel == that._checkPanel ? 7:4
        }
        cell.setVisible(true);
        that._sortSelectNode.sort = 0;
        sortList.removeAllItems();
        sortList.height = cell.height * itemNum;
        that._sortOptionNode.getChildByName("di").height = sortList.height;

        for (var sort in sortValues) {
            var item = cell.clone();
            sortList.pushBackCustomItem(item);
            item.getChildByName("Text_sort").setString(sortValues[sort]);
            item.sort = Number(sort);
            item.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    that.sortSelectOption(that._sortSelectNode, sortList.getItems(), sender.sort, that._sortOptionNode);
                    if (!that._curPanel.searchData)
                        that._curPanel.searchData = {}; 
                    that._curPanel.searchData.sort = sender.sort;
                    that.refreshRequest(that._curPanel);
                }
            });
        }
        cell.setVisible(false);
        if (that.isLM) {
            var defaultSort = 0;
        }else{
            var defaultSort = that._curPanel == that._checkPanel ? 1:0;
        }
        var curSort = defaultSort
        if (that._curPanel.searchData && that._curPanel.searchData.sort) {
            curSort =  that._curPanel.searchData.sort;
        }


        var searchData = that._curPanel.searchData;
        if (!searchData) {
            searchData = that._curPanel.searchData = {};
        }
        var textNode = that._sortSelectNode.getChildByName("text");
        textNode.setString("sort" in searchData ? sortValues[searchData.sort] : sortValues[defaultSort]);
        textNode.setScale(textNode.getString().length >= 6 ? 0.8 : 1);

        if (!("groupId" in searchData) || searchData.groupId == -1)
            that._groupSelectNode.getChildByName("text").setString("全部分组");
        else
            that._groupSelectNode.getChildByName("text").setString(searchData.groupId == 0 ? "未分组" : searchData.groupId + "组");
        that._userIdEditBox.setString("userId" in searchData && searchData.userId != -1 ? searchData.userId + "" : "");


        that.sortSelectOption(that._sortSelectNode, sortList.getItems(), curSort, that._sortOptionNode);
    },

    refreshHead: function(url, head) {
        head.needScale = 8;
        head.isMask = true;
        COMMON_UI.refreshHead(this, url ? url : "png/default_headpic.png", head);
    },
    //请求比赛列表
    requestMatchList:function(){
        var that = this;
        var sendInfo = {}
        if (that.isLM)
            sendInfo.leagueId = that.clubId;
        else
            sendInfo.clubId = that.clubId;
        sendInfo.tab = 0; //0:比赛管理 1:参赛列表
        MjClient.block();
        var api = that.isLM ? "pkplayer.handler.leagueMatchInfo" : "pkplayer.handler.clubMatchInfo";
        cc.log("apid = " + api +" sendInfo =" +JSON.stringify(sendInfo));
        MjClient.gamenet.request(api, sendInfo, function(rtn) {
            MjClient.unblock();
            if (rtn.code == 0) {
                that.showManagerPanel(rtn.data);
            } else {
                // var param = {};
                // param.clubData = that.clubData;
                // param.noCallBack = function(){
                //     // that.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(function() {
                //         that.removeFromParent();
                //     // }))); 
                // };
                // that.getParent().addChild(new Friendcard_Match_createTip(param));
                FriendCard_Common.serverFailToast(rtn);
            }
        }); 
    },

    //请求参赛成员列表
    requestMemberList:function(){
        var that = this;
        that._memberListPanel.isLoadingData = true;
        var sort = null;
        var groupId = null;
        var userId = null;
        if (this._memberListPanel.searchData) {
            sort = this._memberListPanel.searchData.sort;
            if (this._memberListPanel.searchData.userId != -1)
                userId = this._memberListPanel.searchData.userId;
            if (this._memberListPanel.searchData.groupId != -1)
                groupId = this._memberListPanel.searchData.groupId;
        }
        if (!sort) {
            sort = 0;
        }
        if (groupId == -1)
            groupId = undefined;
        if (userId == -1)
            userId = null;

        if (this.isLM && (userId || userId === 0)) {
            userId = Number(userId)
        }
        var sendInfo = {}
        var sendInfo = {
            sort: sort, 
            group: groupId,
            keyword: userId,
            pageLen: that._memberListPanel.pageLen
        }

        if (that.isLM){
            sendInfo.leagueId = that.clubId;
            sendInfo.clubId = that.clubData.subClubId;
            sendInfo.pageCount = that._memberListPanel.pageCount;
        }else{
            sendInfo.clubId = that.clubId;
            sendInfo.lastId = that._memberListPanel.lastId;
        }
        MjClient.block();
        var api = that.isLM ? "pkplayer.handler.listLeagueMatchUser" : "pkplayer.handler.listClubMatchUser";
        cc.log("api = "+api + " msg = " + JSON.stringify(sendInfo));
        MjClient.gamenet.request(api, sendInfo, function(rtn) {
            MjClient.unblock();
            if (rtn.code == 0) {
                if (that.isLM) {
                    that.showMemberListPanel(rtn.data.list);
                    that._memberListPanel.pageCount = rtn.data.pageCount;
                }else{
                    that.showMemberListPanel(rtn.data);
                }
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
        }); 
    },

    //请求参赛审核列表
    requestCheckList:function(){
        var that = this;
        that._checkPanel.isLoadingData = true;

        var sort = undefined;
        var groupId = undefined;
        var userId = undefined;
        if (that._checkPanel.searchData) {
            sort = that._checkPanel.searchData.sort;
            if (that._checkPanel.searchData.userId != -1)
                userId = that._checkPanel.searchData.userId;
            if (that._checkPanel.searchData.groupId != -1)
                groupId = that._checkPanel.searchData.groupId;
        }
        if (!sort) {
            if (that.isLM) {
                sort = 0;    
            }else{
                sort = 1;
            }
        }
        if (groupId == -1)
            groupId = undefined;
        if (userId == -1)
            userId = undefined;

        var sendInfo = {}
        var sendInfo = {
            sort: sort, 
            group: groupId,
            keyword: userId,
            pageIdx: that._checkPanel.pageIdx,
            pageLen: that._checkPanel.pageLen
        }

        if (that.isLM){
            sendInfo.leagueId = that.clubId;
            sendInfo.clubId = that.clubData.subClubId;
        }else{
            sendInfo.clubId = that.clubId;
        }

        MjClient.block();
        var api = that.isLM ? "pkplayer.handler.listLeagueMatchUserForAudit" : "pkplayer.handler.listClubMatchUserForAudit";
        cc.log("api = " + api +" sendInfo = " + JSON.stringify(sendInfo));
        MjClient.gamenet.request(api, sendInfo, function(rtn) {
            MjClient.unblock();
            if (rtn.code == 0) {
                that.showCheckPanel(rtn.data);
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
        }); 
    },

    //比赛开关 state:0:关闭比赛 1:开启比赛
    requestSetMatchState:function(state){
        var that = this;
        var that = this;
        var sendInfo = {};

        if (that.isLM)
            sendInfo.leagueId = that.clubId;
        else
            sendInfo.clubId = that.clubId;

        sendInfo.matchOpen = state;
        MjClient.block();
        var api = that.isLM ? "pkplayer.handler.leagueUpdateMatch" : "pkplayer.handler.clubUpdateMatch";
        cc.log("api = " + api +" sendInfo = " + JSON.stringify(sendInfo));
        MjClient.gamenet.request(api, sendInfo, function(rtn) {
            MjClient.unblock();
            if (rtn.result == 0) {
               if (rtn.matchOpen==0) {
                    //关闭比赛清空所有比赛
                    var contentList = that._managerPanel.getChildByName("content_list");
                    contentList.removeAllItems();
               }
            } else {
                if(!that.checkUiNodeValid()){
                    return;
                }
                var openCheckBox = that._managerPanel.getChildByName("Panel_bottom").getChildByName("openCheckBox");
                openCheckBox.setSelected(!openCheckBox.isSelected());
                FriendCard_Common.serverFailToast(rtn);
            }
        }); 
    },

    //设置用户申请 opt: 1 同意 2 拒绝  type:0 退赛 1参赛
    requestSetUserApply:function(matchId, userId, opt, type)
    {
        var that = this;
        var sendInfo = {};
        sendInfo.id = matchId;
        sendInfo.state = opt;
        var api = that.isLM ? "pkplayer.handler.setLeagueMatchUserForAudit" : "pkplayer.handler.setClubMatchUserForAudit";
        if (that.isLM && type == 0) {
            api = "pkplayer.handler.leagueMatchQuitAudit";
        }

        MjClient.block();
        MjClient.gamenet.request(api, sendInfo, function(rtn) {
            MjClient.unblock();
            if (rtn.code == 0) {
                postEvent("matchInfoChange", {});
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
        }); 
    },

    //踢人请求
    requestKickUser: function(id){
        var that = this;
        var sendInfo = {}
        if (that.isLM){
            sendInfo.leagueId = that.clubId;
            sendInfo.clubId = that.clubData.subClubId;
        }else{
            sendInfo.clubId = that.clubId;
        }
        sendInfo.id = id;
        MjClient.block();
        var api = that.isLM ? "pkplayer.handler.leagueKickMatch" : "pkplayer.handler.clubKickMatch";
        MjClient.gamenet.request(api, sendInfo, function(rtn) {
            MjClient.unblock();
            if (rtn.code == 0) {
                postEvent("matchInfoChange", {});
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
        }); 
    },

    refreshRequest: function(panel) {
        var that = this;
        that.hideAllListPanel();
        switch (panel) {
            case that._managerPanel:
                that.requestMatchList();
                break;
            case that._memberListPanel:
                if(that.isLM){
                    that._memberListPanel.pageCount = 0;
                }else{
                    delete(that._memberListPanel.lastId);
                }
                that.requestMemberList();
                break;
            case that._checkPanel:
                that._checkPanel.pageIdx = 1;
                that.requestCheckList();
                break;
            default:
                cc.log("refreshRequest todo");
        }
    },

    hideAllListPanel: function() {
        this._sortSearchPanel.setVisible(false);
        this._managerPanel.setVisible(false);
        this._memberListPanel.setVisible(false);
        this._checkPanel.setVisible(false);
    },
    //参赛成员列表
    showMemberListPanel: function(datas){
        var that = this;
        if(!that.checkUiNodeValid()){
            return;
        }
        that.hideAllListPanel();
        that._curPanel = that._memberListPanel;
        that.setSortSearchForCurPanel();
        this._memberListPanel.setVisible(true);
        this._sortSearchPanel.setVisible(true);
        if (this.isLM) {
            this._userIdEditBox.setPlaceHolder("请输入完整ID...");
            this._userIdEditBox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        }else{
            this._userIdEditBox.setPlaceHolder("请输入玩家信息...");
            this._userIdEditBox.setInputMode(cc.KEYBOARD_RETURNTYPE_DONE);
        }

        var text_title_onlineState = that._memberListPanel.getChildByName("Panle_title").getChildByName("text_title_onlineState")
        if (text_title_onlineState) {
            text_title_onlineState.visible = false;
        }
        var text_title_rank = that._memberListPanel.getChildByName("Panle_title").getChildByName("text_title_rank")
        if (text_title_rank) {
            text_title_rank.setString("赛事积分");
        }
        if (!datas)
            return;
        that._memberListPanel.isLoadingData = false;
        that._curPanel.datas = datas;
        var cell = that._memberListPanel.getChildByName("cell");
        var contentList = that._memberListPanel.getChildByName("content_list");
        if ((that.isLM && that._memberListPanel.pageCount == 0) || (!that.isLM && !that._memberListPanel.lastId) ) {
            contentList.removeAllItems();
        }
        
        cell.setVisible(true);
        var len = contentList.getItems().length;
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var item = cell.clone();
            item.dataIndex = len + i;
            contentList.pushBackCustomItem(item);
            item.data = data;
            that.refreshHead(data.headimgurl, item.getChildByName("image_head"));
            item.getChildByName("text_name").setString(getNewName(unescape(data.nickname), that.nameMaxLen));
            item.getChildByName("text_ID").setString(data.userId + "");
            item.getChildByName("text_matchName").setString(unescape(data.title));
            var text_rankPoint = item.getChildByName("text_rankPoint");
            var text_rankPos = item.getChildByName("text_rankPos")
            text_rankPoint.setString(data.score);
            text_rankPos.setString("");  
            text_rankPoint.y = (text_rankPoint.y + text_rankPos.y)/2;
            item.getChildByName("text_group").setString(data.group == 0 ? "未分组" : data.group + "组");
            item.getChildByName("text_matchState").setString(["","参赛中","已淘汰","已退赛"][data.status]);
            // that.setStateStr(item.getChildByName("text_onlineState"), data.isPlaying, data.isOnline, data.lastLoginTime);
            item.getChildByName("text_onlineState").setString("");
            var btn_kickout = item.getChildByName("btn_kickout");
            btn_kickout.visible = data.isKickPermission && (data.status==1 || data.status==2);//可踢出参赛中和已淘汰
            btn_kickout.addTouchEventListener(function(sender, type) {
                //踢出按钮
                if (type == 2) {
                    var param = {};
                    var data = sender.getParent().data;
                    param.userId = data.userId;
                    param.matchname = data.title;
                    param.nickname = data.nickname
                    param.headimgurl = data.headimgurl;
                    param.type_shenhe = 3;
                    var callBack = function(){
                        that.requestKickUser(data.id);
                    }
                    that.getParent().addChild(new Friendcard_match_shenhe(param, 3, callBack));
                }
            }); 
            if (!that.isLM) {
                that._memberListPanel.lastId = data.id;
            }
            
        }
        cell.setVisible(false);
        if (that.isLM) {
            that._memberListPanel.hasMoreData = datas.length>1;
        }else{
            that._memberListPanel.hasMoreData = datas.length >= that._memberListPanel.pageLen;
        }
        FriendCard_UI.addListBottomTipUi(contentList,that._memberListPanel.hasMoreData ? 2 : 3);
        that.showEmptyText(datas.length+len == 0);
    },
    setStateStr: function(stateLabel, isPlaying, isOnline, lastLoginTime) {
        if (isPlaying) {
            stateLabel.setString("对局中");
            stateLabel.setTextColor(cc.color("#d3260e"));
   
        } else if (isOnline) {
            stateLabel.setString("在线");
            stateLabel.setTextColor(cc.color("#24a92a"));
        }else if (lastLoginTime){
            stateLabel.setString(lastLoginTime + "在线");
        } else {
            stateLabel.setString("离线");
        }
    },
    //比赛审核
    showCheckPanel: function(datas){
        var that = this;
        if(!that.checkUiNodeValid()){
            return;
        }
        that.hideAllListPanel();
        that._curPanel = that._checkPanel;
        that.setSortSearchForCurPanel();
        that._checkPanel.setVisible(true);
        that._sortSearchPanel.setVisible(true);

        this._userIdEditBox.setPlaceHolder("请输入玩家信息...");
        this._userIdEditBox.setInputMode(cc.KEYBOARD_RETURNTYPE_DONE);

        if (!datas)
            return;
        that._curPanel.datas = datas;
        that._checkPanel.isLoadingData = false;
        var cell = that._checkPanel.getChildByName("cell");
        var contentList = that._checkPanel.getChildByName("content_list");
        if (that._checkPanel.pageIdx <= 1) {
            contentList.removeAllItems();
        }

        cell.setVisible(true);
        var bHasUncheck = false;
        var len = contentList.getItems().length;
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var item = cell.clone();
            item.data = data;
            item.dataIndex = len + i;
            contentList.pushBackCustomItem(item);

            that.refreshHead(data.headimgurl, item.getChildByName("image_head"));
            item.getChildByName("text_name").setString(getNewName(unescape(data.nickname), that.nameMaxLen));
            item.getChildByName("text_ID").setString(data.userId + "");

            var timeStr = MjClient.dateFormat(new Date(parseInt(data.createTime)), 'yyyy-MM-dd hh:mm:ss');
            timeStr = timeStr.split(" ");
            item.getChildByName("text_createData").setString(timeStr[0]);
            item.getChildByName("text_createTime").setString(timeStr[1]);
            item.getChildByName("text_group").setString(data.group == 0 ? "未分组" : data.group + "组");
            
            //审核内容
            //data.status 0参赛未审核，1参赛通过，2参赛被拒，3退赛未审核，4退赛通过，5退赛被拒, 6比赛到期，7比赛删除,8邀请参赛，9踢出参赛, 10取消报名
            var strEvent = "";
            var text_event = item.getChildByName("text_event");
            var normalColor = "'#443333'";
            if (FriendCard_Common.getSkinType() == 4) {
                normalColor = "'#738875'";
            }else if (FriendCard_Common.getSkinType() == 1) {
                normalColor = "'#2B344D'";
            }

            function getEventXMLStr(eventName, matchName, scoreName, score, scoreColor){
                var contextStr = "<font size='20' face='fonts/lanting.ttf' color="+ normalColor +">"+eventName+"<br><br></font>" +
                "<font size='20' face='fonts/lanting.ttf' color="+ normalColor +"> <br>"+unescape(matchName)+"</font>" +
                "<font size='20' face='fonts/lanting.ttf' color="+ scoreColor + "> <br>"+scoreName+":"+score+"</font>";
                return contextStr;
            }

            if(data.status >= 0 && data.status<=2){
                //申请参赛
                //strEvent = "报名参加:\n" + unescape(data.matchname) + "\n参赛积分:" + data.score;
                var contextStr = getEventXMLStr("报名参赛", data.matchname, "参赛积分", data.score, "'#ff0000'");                
            }else if (data.status >= 3 && data.status<=5) {
                //退赛申请
                // strEvent = "申请退赛:\n退赛积分:"+data.score+"\n排名:"+data.rank;
                if (that.isLM) {
                    var contextStr = getEventXMLStr("申请退赛", data.matchname, "退赛积分", data.score, "'#24a92a'");
                }else{
                    var contextStr = "<font size='20' face='fonts/lanting.ttf' color="+ normalColor +">申请退赛<br><br></font>" +
                    "<font size='20' face='fonts/lanting.ttf' color='#24a92a'> <br>"+"退赛积分:"+ data.score +"</font>" +
                    "<font size='20' face='fonts/lanting.ttf' color="+ normalColor +"> <br>"+"排名:"+ data.rank +"</font>";
                }
            }else if(data.status == 6){
                //比赛到期
                if (that.isLM) {
                    var contextStr = getEventXMLStr("比赛到期", data.matchname, "退赛积分", data.score, "'#24a92a'");
                    // strEvent = "比赛到期:\n"+ unescape(data.matchname) + "\n退赛积分:"+data.score;
                 }else{
                    strEvent = "比赛到期:\n积分:"+data.score+"\n排名:"+data.rank;
                 }  
               
            }else if(data.status == 7){
                //比赛删除
                if (that.isLM) {
                    var contextStr = getEventXMLStr("删除比赛", data.matchname, "退赛积分", data.score, "'#24a92a'");
                    // strEvent = "删除比赛:\n" + unescape(data.matchname) + "\n退赛积分:"+data.score;
                }else{
                    strEvent = "删除比赛:\n积分:"+data.score+"\n排名:"+data.rank;
                }
            }else if (data.status == 8) {
                //邀请加入
                if (that.isLM) {
                    var contextStr = getEventXMLStr("邀请加入", data.matchname, "参赛积分", data.score, "'#ff0000'");
                }else{
                    strEvent = "邀请加入:\n" + unescape(data.matchname) + "\n参赛积分:" + data.score;
                }
            }else if(data.status == 9){
                //被踢出比赛
                if (that.isLM) {
                    var contextStr = getEventXMLStr("踢出比赛", data.matchname, "退赛积分", data.score, "'#24a92a'");
                }else{
                    strEvent = "踢出比赛:\n" + unescape(data.matchname) + "\n退赛积分:" + data.score;
                }
                
            }else if(data.status == 10){
                //取消报名
                strEvent = "报名参加:\n" + unescape(data.matchname) + "\n参赛积分:" + data.score;
            }else if(data.status == 11){
                //系统踢出
                if (that.isLM) {
                    var contextStr = getEventXMLStr("踢出比赛", data.matchname, "退赛积分", data.score, "'#24a92a'");
                }else{
                    strEvent = "踢出比赛:\n" + unescape(data.matchname) + "\n退赛积分:" + data.score;
                }
            }
            
            if ((data.status>=0 && data.status<=5) || (that.isLM && data.status>=6 && data.status<=11 && data.status!=10) ) {
                var richContext = new ccui.RichText();
                richContext.initWithXML(contextStr, null);
                richContext.setContentSize(165,70);
                richContext.ignoreContentAdaptWithSize(false);
                var pos = text_event.getPosition();
                pos.x += 20
                richContext.setPosition(pos);
                text_event.setString("")
                item.addChild(richContext);
            }else{
                text_event.setString(strEvent);

            }

            //往期成绩
            if (data.lastMatchId && data.lastMatchId > 0 && (data.status < 3 || data.status == 8) ) {
                if (that.isLM) {
                    item.getChildByName("text_history").setString("分数:" + data.lastMatchScore);
                }else{
                    item.getChildByName("text_history").setString("排名:" + (i+1)+ "\n分数:" + data.lastMatchScore);
                }
            } else{
                item.getChildByName("text_history").setString("无");
            }
            


            var text_opInfo = item.getChildByName("text_opInfo")
            var btn_agree = item.getChildByName("btn_agree")
            var btn_refuse = item.getChildByName("btn_refuse")
            var Image_optFlag = item.getChildByName("Image_optFlag")
            Image_optFlag.ignoreContentAdaptWithSize(true);
            Image_optFlag.setVisible(false);
            if (data.status == 0 || data.status == 3) {
                //未审核，显示同意，决绝操作按钮；
                text_opInfo.setVisible(false);
                Image_optFlag.setVisible(false);
                btn_agree.setVisible(true);
                btn_refuse.setVisible(true);
                bHasUncheck = true;
            }else{
                //已审核，显示操作信息。
                var optTimeStr = MjClient.dateFormat(new Date(parseInt(data.optCreateTime)), 'yyyy-MM-dd hh:mm:ss');
                var strOpInfo = "";
                if (data.status == 6 || data.status == 7 || data.status == 10 || data.status == 11) {//比赛到期、比赛删除只显示时间
                    strOpInfo = "\n\n" + optTimeStr;
                }else{
                    strOpInfo = getNewName(unescape(data.optNickname), 6) + "\nID:" + data.optUserId + "\n" + optTimeStr;
                }
                text_opInfo.setString(strOpInfo);
                text_opInfo.setVisible(true);
                btn_agree.setVisible(false);
                btn_refuse.setVisible(false);
                Image_optFlag.setVisible(true);

                //显示操作图标
                
                if(data.status == 6){//比赛到期
                    Image_optFlag.x = text_opInfo.x;
                    Image_optFlag.y += 13;
                    Image_optFlag.loadTexture("friendCards_Match/main/img_expired.png");
                }else if(data.status == 7){//比赛删除
                    Image_optFlag.x = text_opInfo.x;
                    Image_optFlag.y += 13;
                    Image_optFlag.loadTexture("friendCards_Match/main/img_delete.png");
                }else if (data.status == 8) {//邀请
                    Image_optFlag.loadTexture("friendCards_Match/main/img_invite.png");
                }else if(data.status == 9){//被踢
                    Image_optFlag.loadTexture("friendCards_Match/main/img_kickout.png");

                }else if(data.status == 10){//手动取消报名
                    Image_optFlag.x = text_opInfo.x;
                    Image_optFlag.y += 13;
                    Image_optFlag.loadTexture("friendCards_Match/main/img_cancel.png");
                }else if(data.status == 11){//系统踢出
                    Image_optFlag.x = text_opInfo.x;
                    Image_optFlag.y += 13;
                    Image_optFlag.loadTexture("friendCards_Match/main/img_sysKick.png");
                }else{//同意拒绝参赛退赛申请
                    if(data.status == 1 || data.status == 4){//同意
                        Image_optFlag.loadTexture("friendCards_Match/main/agree.png");            
                    }else{//拒绝
                        Image_optFlag.loadTexture("friendCards_Match/main/refuse.png");
                    }
                }

            }

            item.data = data;

 
            item.getChildByName("btn_agree").addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    var param = {};
                    var data = sender.getParent().data;
                    param.userId = data.userId;
                    param.matchname = data.matchname;
                    param.nickname = data.nickname
                    param.headimgurl = data.headimgurl;
                    param.type_shenhe = data.status >= 3 ? 0 : 1;
                    var callBack = function(){
                        that.requestSetUserApply(data.id, data.userId, 1, param.type_shenhe);
                    }
                    that.getParent().addChild(new Friendcard_match_shenhe(param, 1, callBack));

                }
            });  
            item.getChildByName("btn_refuse").addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    var param = {};
                    var data = sender.getParent().data;
                    param.userId = data.userId;
                    param.matchname = data.matchname;
                    param.nickname = data.nickname
                    param.headimgurl = data.headimgurl;
                    param.type_shenhe = data.status >= 3 ? 0 : 1;
                    var callBack = function(){
                        that.requestSetUserApply(data.id, data.userId, 2, param.type_shenhe);
                    }
                    that.getParent().addChild(new Friendcard_match_shenhe(param, 0, callBack));
                }
            }); 
        }
        cell.setVisible(false);

        that._checkPanel.hasMoreData = datas.length >= that._checkPanel.pageLen;
        FriendCard_UI.addListBottomTipUi(contentList,that._checkPanel.hasMoreData ? 2 : 3)
        that._checkPanel.pageIdx++;
        that.clubData.redpointMatchButton = bHasUncheck;
        MjClient.FriendCard_main_ui.data.redpointMatchButton = bHasUncheck;
        that.updateCheckRedPoint();
        MjClient.FriendCard_main_ui.updateMatchRedPoint();
        var Panel_bottom = that._checkPanel.getChildByName("Panel_bottom")
        var btn_rightSet = Panel_bottom.getChildByName("btn_rightSet");
        btn_rightSet.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.getParent().addChild(new FriendCard_Match_CheckRight(that.clubData));
            }
        });  
        // btn_rightSet.setVisible(FriendCard_Common.isLeader() || FriendCard_Common.getRoleTextByRoleId(that.clubData.roleId) == "会长");

        btn_rightSet.setVisible(that.clubData.matchQuotaAudit == 1 
            && !FriendCard_Common.isAssistants() 
            && (!FriendCard_Common.isManager() || FriendCard_Common.isLeader() || FriendCard_Common.isLMChair()));

        if (that.isLM && FriendCard_Common.isAssistants() && that.clubData.matchQuotaAudit == 1) {
            btn_rightSet.visible = true;
        }

        var btn_warnScoreSet = Panel_bottom.getChildByName("btn_warnScoreSet");
        btn_warnScoreSet.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.getParent().addChild(new FriendCard_WarnScore(that.clubData.info));
            }
        });
        btn_warnScoreSet.setVisible(!FriendCard_Common.isAssistants() 
            && (!FriendCard_Common.isManager() || FriendCard_Common.isLeader() || FriendCard_Common.isLMChair()));
        
        that.showEmptyText(datas.length+len == 0);
    },
    //比赛管理
    showManagerPanel: function(datas){
        var that = this;
        if(!that.checkUiNodeValid()){
            return;
        }
        // if (datas && datas.list.length == 0) {
        //     var param = {};
        //     param.clubData = that.clubData;
        //     param.noCallBack = function(){
        //         // that.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(function() {
        //             that.removeFromParent();
        //         // }))); 
        //     };
        //     that.getParent().addChild(new Friendcard_Match_createTip(param));
        // }
        that.hideAllListPanel();
        this._managerPanel.setVisible(true);
        that._curPanel = that._managerPanel;
        if (!datas)
            return;
        that._curPanel.datas = datas;
        var cell = that._managerPanel.getChildByName("cell");
        var contentList = that._managerPanel.getChildByName("content_list");
        contentList.removeAllItems();
        cell.setVisible(true);
        for (var i = 0; i < datas.list.length; i++) {
            var data = datas.list[i];
            var item = cell.clone();
            contentList.pushBackCustomItem(item);

            item.getChildByName("text_matchName").setString(unescape(data.title));
            item.getChildByName("text_matchPoint").setString("比赛分数：基础" + data.scoreInitial + "分");
            item.getChildByName("text_outPoint").setString("淘汰分数：低于"+ data.scoreBottom +"分淘汰");

            var strMatchTime = "比赛时长："+data.day+"天";
            if (data.extendDay>0) {
                strMatchTime = strMatchTime + "+"+data.extendDay+"天";
            }
            var startTimeStr = MjClient.dateFormat(new Date(parseInt(data.startTime)), 'MM.dd hh:mm');
            var endTimeStr = MjClient.dateFormat(new Date(parseInt(data.endTime)), 'MM.dd hh:mm');
            strMatchTime = strMatchTime+"("+startTimeStr+"-"+endTimeStr+")";
            item.getChildByName("text_matchTime").setString(strMatchTime);   
            item.getChildByName("text_playerNum").setString("参赛人数："+data.count+"人");

            if (!that.isLM && data.matchType == 1) {//比赛类型，0:单个比赛名额审核（旧） 1:团队授权分审核（新）
                var img_newMatch = new ccui.ImageView("friendCards_Match/main/img_new.png");
                img_newMatch.setAnchorPoint(cc.p(0, 1));
                item.addChild(img_newMatch);
                img_newMatch.setPosition(cc.p(0, item.height));
            }

            var signUpCheckBox =  item.getChildByName("signUpCheckBox");
            item.matchId = data.matchId;
            item.matchName = data.title;
            signUpCheckBox.addTouchEventListener(function(sender, type) {
                if (type != 2)
                    return;
                var sendInfo = {}
                if (that.isLM)
                    sendInfo.leagueId = that.clubId;
                else
                    sendInfo.clubId = that.clubId;
                sendInfo.matchId = sender.getParent().matchId;
                sendInfo.status = sender.isSelected() ? 0:1; //0 关闭允许报名 1 允许报名 2 删除比赛
                MjClient.block();
                var api = that.isLM ? "pkplayer.handler.leagueMatchChangeStatus" : "pkplayer.handler.clubMatchChangeStatus";
                cc.log("api = " + api +"sendInfo = " + JSON.stringify(sendInfo));
                MjClient.gamenet.request(api, sendInfo, function(rtn) {
                    MjClient.unblock();
                    if (rtn.code == 0) {
                    } else {
                        if(!that.checkUiNodeValid()){
                            return;
                        }
                        sender.setSelected(!sender.isSelected());
                        FriendCard_Common.serverFailToast(rtn);
                    }
                    sender.getParent().getChildByName("btn_invite").visible  = sender.isSelected();
                }); 

            });
            signUpCheckBox.setSelected(data.status == 1);//1,允许报名 0：不允许

            item.getChildByName("btn_prolong").addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    var param = {};
                    param.clubId = that.clubId;
                    param.isLM = that.isLM;
                    param.matchId = sender.getParent().matchId;
                    that.getParent().addChild(new Friendcard_Match_prolongTime(param));
                }
            });  
            item.getChildByName("btn_delete").addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    var param = {};
                    param.isLM = that.isLM;
                    param.clubId = that.clubId;
                    param.matchId = sender.getParent().matchId;
                    that.getParent().addChild(new Friendcard_Match_deleteMatch(param));
                }
            }); 
            item.getChildByName("btn_invite").visible = data.status == 1;
            item.getChildByName("btn_invite").addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    var parent = sender.getParent(); 
                    var matchData = {
                        matchId : parent.matchId,
                        matchName : parent.matchName
                    };

                    that.getParent().addChild(new FriendCard_Match_Invite(that.clubData, matchData));
                }
            }); 
            if(!FriendCard_Common.isLeader()){
                item.getChildByName("btn_prolong").setVisible(false);
                item.getChildByName("btn_delete").setVisible(false);
                item.getChildByName("signUpCheckBox").setVisible(false);
            }
        }
        cell.setVisible(false);

        var Panel_bottom = that._managerPanel.getChildByName("Panel_bottom");
        var openCheckBox = Panel_bottom.getChildByName("openCheckBox");
        openCheckBox.setSelected(datas.matchOpen == 1); //0,否，1是
        openCheckBox.addTouchEventListener(function(sender, type) {
            if (type != 2)
                return;
            if (sender.isSelected()) {
                var param = {};
                param.yesCallback = function(){
                    //请求关闭比赛
                    that.requestSetMatchState(0);
                };
                param.noCallback = function(){
                    sender.setSelected(true);
                };
                that.getParent().addChild(new Friendcard_Match_closeMatch(param));
            }
            else{
                var param = {};
                param.title = "开启比赛";
                if (FriendCard_Common.getSkinType() == 1){
                    param.title ="开   启   比   赛";
                }
                param.content = "确定开启比赛";
                param.yesCallback = function(){
                    //请求开启比赛
                    that.requestSetMatchState(1);
                };
                param.noCallback = function(){
                    sender.setSelected(false);
                };
                that.getParent().addChild(new Friendcard_Match_confirmBox(param));  
            }
        });
        var btn_createMatch = Panel_bottom.getChildByName("btn_createMatch");
        btn_createMatch.addTouchEventListener(function(sender, type) {
            if (type != 2)
                return;
            that.getParent().addChild(new FriendCard_Match_Create(that.clubData, null));
        });
        if(!FriendCard_Common.isLeader()){
            Panel_bottom.setVisible(false);
        }
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

    checkUiNodeValid: function(){
        if (cc.sys.isObjectValid(this.uinode)){
            return true;
        }
        return false;
    },
});