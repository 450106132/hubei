// add by cyc 20190723

var FriendCard_FCM_tongji = cc.Layer.extend({
    ctor: function(clubData) {
        this._super();
        var that = this;

        that.clubData = clubData;
        that.clubId = clubData.info.clubId;
        that.isLM = FriendCard_Common.getClubisLM(clubData.info);

        var resJson = "friendcard_FCM_tongji.json";
        if (isIPhoneX()) {
            resJson = "friendcard_FCM_tongjiX.json";
        }
        var UI = ccs.load(resJson);
        that.addChild(UI.node);

        that.uinode = UI.node;
        COMMON_UI.setNodeTextAdapterSize(UI.node);

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        that._back = _back;

        var Image_di = that.uinode.getChildByName("Image_di");
        var _close = that.uinode.getChildByName("close");
        var suizi = that.uinode.getChildByName("suizi")
        var listView_leftBG = that.uinode.getChildByName("ListView_leftBG");

        Image_di.width = MjClient.size.width;
        Image_di.height = MjClient.size.height * 0.9306;
        Image_di.setPosition(MjClient.size.width / 2, MjClient.size.height / 2);

        if (isIPhoneX()) {
            setWgtLayout(_close, [0.1226, 0.2815], [0.9741, 0.8407], [0, 0], false);
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
        var pos1 = listView_leftBG.getPosition();
        pos1.x = pos1.x + listView_leftBG.width / 2;
        pos1 = that._back.convertToNodeSpace(pos1);

        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                delete that.clubData.openPlayerInfo;
                that.removeFromParent();
            }
        });

        that._mpListPanel = that._back.getChildByName("Panel_mpList");
        that._resetSumListPanel = that._back.getChildByName("Panel_resetSumList");
        that._mpLimitListPanel = that._back.getChildByName("Panel_mpLimitList");
        that._huizhangTJPanel = that._back.getChildByName("Panel_huizhangTJ");
        that._groupTJPanel = that._back.getChildByName("Panel_groupTJ");
        that._zuliTJPanel = that._back.getChildByName("Panel_zuliTJ");
        that._managerTJPanel = that._back.getChildByName("Panel_managerTJ");
        that._powerSettingPanel = that._back.getChildByName("Panel_powerSetting");

        if(FriendCard_Common.getSkinType() == 2)
            that.nameMaxLen = 5;
        else
            that.nameMaxLen = 6;

        that.initBtnList();
        that.initSortSearch();
        that.initDateSearch();
        that.hideAllListPanel();
        that.refreshRequest(that._mpListPanel);

        UIEventBind(null, that, "setMpSuccess", function(eD) {
            that._mpListPanel.datas = null;
            that._resetSumListPanel.datas = null;
            that._mpLimitListPanel.datas = null;
            that._huizhangTJPanel.datas = null;
            that._groupTJPanel.datas = null;
            that._zuliTJPanel.datas = null;
            that._managerTJPanel.datas = null;
            that._powerSettingPanel.datas = null;

            that.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(function() {
                that.refreshRequest(that._curPanel);
            })));
        });

        UIEventBind(null, that, "userMpResetSuccess", function(eD) {
            var datas = that._curPanel.datas;

            that._mpListPanel.datas = null;
            that._resetSumListPanel.datas = null;
            that._mpLimitListPanel.datas = null;
            that._huizhangTJPanel.datas = null;
            that._groupTJPanel.datas = null;
            that._zuliTJPanel.datas = null;
            that._managerTJPanel.datas = null;
            that._powerSettingPanel.datas = null;

            that._curPanel.datas = datas;
        });
    },
    initBtnList: function() {
        var that = this;

        var btnListView = that._back.getChildByName("btnListView");

        var resetTouch = function() {
            btn_mpList.setEnabled(true);
            btn_resetSum.setEnabled(true);
            btn_xianzhiList.setEnabled(true);
            btn_huizhangTJ.setEnabled(true);
            btn_groupTJ.setEnabled(true);
            btn_managerTJ.setEnabled(true);
            btn_zhuliTJ.setEnabled(true);
            btn_setting.setEnabled(true);
        }

        // 体力值列表
        var btn_mpList = btnListView.getChildByName("btn_mpList");
        btn_mpList.setEnabled(false);
        btn_mpList.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                resetTouch();
                btn_mpList.setEnabled(false);
                if (that._mpListPanel.datas)
                    that.showMpListPanel();
                else
                    that.refreshRequest(that._mpListPanel);
            }
        });

        // 重置总计
        var btn_resetSum = btnListView.getChildByName("btn_resetSum");
        btn_resetSum.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                resetTouch();
                btn_resetSum.setEnabled(false);
                if (that._resetSumListPanel.datas)
                    that.showResetSumListPanel();
                else
                    that.refreshRequest(that._resetSumListPanel);
            }
        });

        // 限制列表
        var btn_xianzhiList = btnListView.getChildByName("btn_xianzhiList");
        btn_xianzhiList.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                resetTouch();
                btn_xianzhiList.setEnabled(false);
                if (that._mpLimitListPanel.datas)
                    that.showMpLimitListPanel();
                else
                    that.refreshRequest(that._mpLimitListPanel);
            }
        });

        // 会长统计
        var btn_huizhangTJ = btnListView.getChildByName("btn_huizhangTJ");
        btn_huizhangTJ.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                resetTouch();
                btn_huizhangTJ.setEnabled(false);
                if (that._huizhangTJPanel.datas)
                    that.showGroupOrZuliTJPanel(that._huizhangTJPanel);
                else
                    that.refreshRequest(that._huizhangTJPanel);
            }
        });

        // 组统计
        var btn_groupTJ = btnListView.getChildByName("btn_groupTJ");
        btn_groupTJ.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                resetTouch();
                btn_groupTJ.setEnabled(false);
                if (that._groupTJPanel.datas)
                    that.showGroupOrZuliTJPanel(that._groupTJPanel);
                else
                    that.refreshRequest(that._groupTJPanel);
            }
        });

        // 管理员统计
        var btn_managerTJ = btnListView.getChildByName("btn_managerTJ");
        btn_managerTJ.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                resetTouch();
                btn_managerTJ.setEnabled(false);
                if (that._managerTJPanel.datas)
                    that.showManagerTJPanel();
                else
                    that.refreshRequest(that._managerTJPanel);
            }
        });

        // 助理统计
        var btn_zhuliTJ = btnListView.getChildByName("btn_zhuliTJ");
        btn_zhuliTJ.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                resetTouch();
                btn_zhuliTJ.setEnabled(false);
                if (that._zuliTJPanel.datas)
                    that.showGroupOrZuliTJPanel(that._zuliTJPanel);
                else
                    that.refreshRequest(that._zuliTJPanel);
            }
        });

        // 权限设置 
        var btn_setting = btnListView.getChildByName("btn_setting");
        btn_setting.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                resetTouch();
                btn_setting.setEnabled(false);
                if (that._powerSettingPanel.datas)
                    that.showPowerSettingPanel();
                else
                    that.refreshRequest(that._powerSettingPanel);
            }
        });

        if (that.isLM) {
             // 盟主、超级管理员
            if (FriendCard_Common.isSupperManger(that.clubData.info)) {
                btn_zhuliTJ.removeFromParent();
            }
            // 会长
            else if (that.clubData.roleId == 1) {
                btn_zhuliTJ.removeFromParent();
                btn_huizhangTJ.removeFromParent();
            }
            // 管理员
            else if (FriendCard_Common.isManager(that.clubData.info)) {
                btn_managerTJ.removeFromParent();
                btn_zhuliTJ.removeFromParent();
                btn_huizhangTJ.removeFromParent();
            }
            // 组长
            else if (FriendCard_Common.isGroupLeader(that.clubData.info)) {
                btn_managerTJ.removeFromParent();
                btn_groupTJ.removeFromParent();
                btn_huizhangTJ.removeFromParent();
            }
            // 助理
            else if (FriendCard_Common.isAssistants(that.clubData.info)) {
                btn_managerTJ.removeFromParent();
                btn_groupTJ.removeFromParent();
                btn_zhuliTJ.removeFromParent();
                btn_setting.removeFromParent();
                btn_huizhangTJ.removeFromParent();
            }
        }
        else {
            btn_huizhangTJ.removeFromParent();
            // 会长
            if (FriendCard_Common.isLeader(that.clubData.info)) {
                btn_zhuliTJ.removeFromParent();
            }
            // 管理员
            else if (FriendCard_Common.isManager(that.clubData.info)) {
                btn_managerTJ.removeFromParent();
                btn_zhuliTJ.removeFromParent();
            }
            // 组长
            else if (FriendCard_Common.isGroupLeader(that.clubData.info)) {
                btn_managerTJ.removeFromParent();
                btn_groupTJ.removeFromParent();
            }
            // 助理
            else if (FriendCard_Common.isAssistants(that.clubData.info)) {
                btn_managerTJ.removeFromParent();
                btn_groupTJ.removeFromParent();
                btn_zhuliTJ.removeFromParent();
                btn_setting.removeFromParent();
            }
        }
    },

    initSortSearch: function() {
        var that = this;

        var sortSearchPanel = that._back.getChildByName("sortSearchPanel");
        that._sortSelectNode = sortSearchPanel.getChildByName("sortSelectNode");
        that._sortOptionNode = sortSearchPanel.getChildByName("sortOptionNode");
        that._groupSelectNode = sortSearchPanel.getChildByName("groupSelectNode");
        that._search = sortSearchPanel.getChildByName("Image_search");

        that._sortSelectNode.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                selectOption(that._sortSelectNode, sortList.getItems(), that._curPanel.searchData.sort || 0, that._sortOptionNode);
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

        var selectOption = function(selectNode, itemNodes, sort, optionNode) {
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
        }

        var sortValues = {
            0: "综合排序",
            1: "新加入在前",
            2: "新加入在后",
            3: "只看组长",
            4: "只看在线",
            5: "只看对局中",
            6: "只看离线",
            7: "只看禁玩",
            8: "登陆时间倒序"
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
                    selectOption(that._sortSelectNode, sortList.getItems(), sender.sort, that._sortOptionNode);
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
                    event: "FCM_CHECKFENZU",
                    numberGroup: FriendCard_Common.getGroupNumber(),
                    others: others
                };
                that.addChild(new friendcard_selectGroup(data));
            }
        });

        that._groupSelectNode.groupId = -1;
        UIEventBind(null, that._groupSelectNode, "FCM_CHECKFENZU", function(eD) {
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
        userIdEditBox.setFontColor(cc.color("E33232"));
        userIdEditBox.setMaxLength(10);
        userIdEditBox.setFontSize(30);
        userIdEditBox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
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
                that._curPanel.searchData.userId = Number(userIdEditBox.getString());
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

        var curPanel = null;
        sortSearchPanel.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function() {
            if (curPanel == that._curPanel)
                return;

            curPanel = that._curPanel;
            var searchData = curPanel.searchData;
            if (!searchData) {
                searchData = curPanel.searchData = {};
            }

            cc.log("sort:", searchData.sort);
            var textNode = that._sortSelectNode.getChildByName("text");
            textNode.setString("sort" in searchData ? sortValues[searchData.sort] : sortValues[0]);
            textNode.setScale(textNode.getString().length >= 6 ? 0.8 : 1);

            if (!("groupId" in searchData) || searchData.groupId == -1)
                that._groupSelectNode.getChildByName("text").setString("全部分组");
            else
                that._groupSelectNode.getChildByName("text").setString(searchData.groupId == 0 ? "未分组" : searchData.groupId + "组");
            
            userIdEditBox.setString("userId" in searchData && searchData.userId != -1 ? searchData.userId + "" : "");
        })).repeatForever());
    },

    initDateSearch: function() {
        var that = this;

        var nowTime = MjClient.getCurrentTime();
        var startTime = FriendCard_Common.transdate(nowTime[0], nowTime[1] - 1, nowTime[2], 0, 0);

        var nextDate = new Date(nowTime[0], nowTime[1]-1,nowTime[2] + 1);
        var nextTime = MjClient.getCurrentTime(nextDate);
        var endTime = FriendCard_Common.transdate(nextTime[0], nextTime[1], nextTime[2], 0, 0);

        that._resetSumListPanel.startTime = startTime;
        that._resetSumListPanel.endTime = endTime;

        that._huizhangTJPanel.startTime = startTime;
        that._huizhangTJPanel.endTime = endTime;

        that._managerTJPanel.startTime = startTime;
        that._managerTJPanel.endTime = endTime;

        that._zuliTJPanel.startTime = startTime;
        that._zuliTJPanel.endTime = endTime;

        that._groupTJPanel.startTime = startTime;
        that._groupTJPanel.endTime = endTime;
    },

    initPanleSortView: function(_panel, beginIndex, endIndex, nameFix) {
        var that = this;
        if (!nameFix) {
            nameFix = ""
        }
        if (!beginIndex) {
            beginIndex = 0;
        }
        if (!endIndex) {
            endIndex = 10;
        }
        var sortBg = _panel.getChildByName("sortBg" + nameFix)
        var text_sort = sortBg.getChildByName("Text_sort")
        var button_jiaotou = sortBg.getChildByName("Button_jiaotou")
        var sortListBg = _panel.getChildByName("sortListBg" + nameFix);
        sortListBg._beginIndex = beginIndex;
        sortListBg._endIndex = endIndex;
        text_sort.initFontSize = text_sort.getFontSize();
        sortListBg.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                sortListBg.visible = false;
                button_jiaotou.setBright(!sortListBg.visible);
            }
        });
        var sortList = sortListBg.getChildByName("sortList");
        sortList.setScrollBarEnabled(false);
        for (var i = beginIndex; i < endIndex; i++) {
            var sortNode = sortList.getChildByName("sort" + i);
            if (sortNode) {
                var str = FriendCard_Common.strReplace(sortNode.getChildByName("Text_sort").getString());
                if ((i == 5 || i == 8) && this.isAssistants) {
                    sortNode.removeFromParent()
                }
                sortNode.setTag(i);
                that.initSortListItem(sortNode, i, _panel.sortEventName);
            }
        }
        sortBg.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                sortListBg.visible = !sortListBg.visible;
                button_jiaotou.setBright(!sortListBg.visible);
            }
        });
        UIEventBind(null, sortListBg, _panel.sortEventName, function(data) {
            var sortType = data.position;
            if (sortListBg._beginIndex > sortType || sortListBg._endIndex < sortType) {
                return;
            }
            that.setSortInfo(_panel, sortType);
            sortListBg.visible = false;
            button_jiaotou.setBright(!sortListBg.visible);
            text_sort.setString(data.txt + "");
            if (text_sort.getString().length > 4) {
                text_sort.setFontSize(text_sort.initFontSize - 5)
            } else {
                text_sort.setFontSize(text_sort.initFontSize)
            }
            if (_panel.updateEventName) {
                postEvent(_panel.updateEventName);
            }
        });
    },

    refreshHead: function(url, head) {
        head.needScale = 8;
        head.isMask = true;
        COMMON_UI.refreshHead(this, url ? url : "png/default_headpic.png", head);
    },
    
    requestPanelList: function(apiName, sort, groupId, userId, startTime, endTime, callFunc) {
        var that = this;

        var sendInfo = {
            sort: sort, // 0 综合排序 1 新加入在前 2 新加入在后 3 只看组长 4 只看在线 5 只看对局中 6 只看离线 7 只看禁玩 8 登陆时间倒序
            groupId: groupId,
            userId: userId,
            startTime: startTime,
            endTime: endTime
        }

        if (that.isLM)
            sendInfo.leagueId = that.clubId;
        else
            sendInfo.clubId = that.clubId;

        MjClient.block();
        MjClient.gamenet.request(apiName, sendInfo, function(rtn) {
            MjClient.unblock();
            cc.log(apiName + " ret:", JSON.stringify(rtn));
            callFunc(rtn);
        });
    },

    requestMpList: function(sort, groupId, userId) {
        var that = this;

        var api = that.isLM ? "pkplayer.handler.leagueMpList" : "pkplayer.handler.clubMpList";
        that.requestPanelList(api, sort, groupId, userId, null, null, function(rtn) {
            if (rtn.code == 0 && rtn.data && rtn.data.list) {
                that.showMpListPanel(rtn.data);
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },

    requestResetSumList: function(sort, groupId, userId, startTime, endTime) {
        var that = this;

        var api = that.isLM ? "pkplayer.handler.leagueMpResetSta" : "pkplayer.handler.clubMpResetSta";
        that.requestPanelList(api, sort, groupId, userId, startTime, endTime, function(rtn) {
            if (rtn.code == 0 && rtn.data) {
                that.showResetSumListPanel(rtn.data);
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },

    requestHuizhangTJ: function(sort, groupId, userId, startTime, endTime) {
        var that = this;

        var api = "pkplayer.handler.leagueMpChairmanSta";
        that.requestPanelList(api, sort, groupId, userId, startTime, endTime, function(rtn) {
            if (rtn.code == 0 && rtn.data) {
                that.showGroupOrZuliTJPanel(that._huizhangTJPanel, rtn.data);
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },

    requestGroupTJ: function(sort, groupId, userId, startTime, endTime) {
        var that = this;

        var api = that.isLM ? "pkplayer.handler.leagueMpGroupSta" : "pkplayer.handler.clubMpGroupSta";
        that.requestPanelList(api, sort, groupId, userId, startTime, endTime, function(rtn) {
            if (rtn.code == 0 && rtn.data) {
                that.showGroupOrZuliTJPanel(that._groupTJPanel, rtn.data);
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },

    requestZuliTJ: function(sort, groupId, userId, startTime, endTime) {
        var that = this;

        var api = that.isLM ? "pkplayer.handler.leagueMpAssistantSta" : "pkplayer.handler.clubMpAssistantSta";
        that.requestPanelList(api, sort, groupId, userId, startTime, endTime, function(rtn) {
            if (rtn.code == 0 && rtn.data) {
                that.showGroupOrZuliTJPanel(that._zuliTJPanel, rtn.data);
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },

    requestManagerTJ: function(sort, groupId, userId, startTime, endTime) {
        var that = this;

        var api = that.isLM ? "pkplayer.handler.leagueMpAdminSta" : "pkplayer.handler.clubMpAdminSta";
        that.requestPanelList(api, sort, groupId, userId, startTime, endTime, function(rtn) {
            if (rtn.code == 0 && rtn.data) {
                that.showManagerTJPanel(rtn.data);
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },

    requestMpLimitList: function(sort, groupId, userId) {
        var that = this;
        
        var api =  that.isLM ? "pkplayer.handler.leagueMpLimitList" : "pkplayer.handler.clubMpLimitList";
        that.requestPanelList(api, sort, groupId, userId, null, null, function(rtn) {
            if (rtn.code == 0) {
                that.showMpLimitListPanel(rtn.data);
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },

    requestPowerList: function(sort, groupId, userId) {
        var that = this;
        
        var api = that.isLM ? "pkplayer.handler.leagueMperList" : "pkplayer.handler.clubMperList";
        that.requestPanelList(api, sort, groupId, userId, null, null, function(rtn) {
            if (rtn.code == 0 && rtn.data) {
                that.showPowerSettingPanel(rtn.data);
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },

    requestUserMpReset: function(userId, callBack) {
        var that = this;

        var sendInfo = {
            userId: userId,
        }

        if (that.isLM)
            sendInfo.leagueId = that.clubId;
        else
            sendInfo.clubId = that.clubId;

        MjClient.block();
        var api = that.isLM ? "pkplayer.handler.leagueUserMpReset" : "pkplayer.handler.clubUserMpReset";
        MjClient.gamenet.request(api, sendInfo, function(rtn) {
            MjClient.unblock();
            cc.log("requestUserMpReset ret:", JSON.stringify(rtn));
            if (rtn.code == 0) {
                callBack();
                postEvent("userMpResetSuccess", {});
                MjClient.showToast("操作成功！");
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },

    requestAllUserMpReset:function(){
        var that = this;
        var sendInfo = {}
        if (that.isLM){
            sendInfo.leagueId = that.clubId;
        }
        else{
            sendInfo.clubId = that.clubId;
        }
        MjClient.block();
        var api = that.isLM ? "pkplayer.handler.resetLeagueUserDefaultMp" : "pkplayer.handler.resetClubUserDefaultMp";
        MjClient.gamenet.request(api, sendInfo, function(rtn) {
            MjClient.unblock();
            cc.log("requestAllUserMpReset ret:", JSON.stringify(rtn));
            if (rtn.code == 0) {
                postEvent("setMpSuccess", {});
                MjClient.showToast("操作成功！");
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
        });

    },

    requestSetMpPermission: function(userId, pmsReset, callBack) {
        var that = this;

        var sendInfo = {
            userId: userId,
            pmsReset: pmsReset
        }

        if (that.isLM)
            sendInfo.leagueId = that.clubId;
        else
            sendInfo.clubId = that.clubId;

        MjClient.block();
        var api = that.isLM ? "pkplayer.handler.leagueMpPermission" : "pkplayer.handler.clubMpPermission";
        MjClient.gamenet.request(api, sendInfo, function(rtn) {
            MjClient.unblock();
            cc.log("clubMpPermission ret:", JSON.stringify(rtn));
            if (rtn.code == 0) {
                MjClient.showToast("操作成功！");
                callBack(true);
            } else {
                callBack(false);
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },

    refreshRequest: function(panel) {
        var that = this;

        var sort = null;
        var groupId = null;
        var userId = null;

        cc.log("refreshRequest:", "searchData=" + JSON.stringify(panel.searchData));
        if (panel.searchData) {
            sort = panel.searchData.sort;
            if (panel.searchData.userId != -1)
                userId = panel.searchData.userId;
            if (panel.searchData.groupId != -1)
                groupId = panel.searchData.groupId;
        }
       
        if (groupId == -1)
            groupId = null;
        if (userId == -1)
            userId = null;

        switch (panel) {
            case that._mpListPanel:
                that.requestMpList(sort, groupId, userId);
                break;
            case that._mpLimitListPanel:
                that.requestMpLimitList(sort, groupId, userId);
                break;
            case that._resetSumListPanel:
                that.requestResetSumList(sort, groupId, userId, that._resetSumListPanel.startTime, that._resetSumListPanel.endTime);
                break;
            case that._huizhangTJPanel:
                that.requestHuizhangTJ(sort, groupId, userId, that._huizhangTJPanel.startTime, that._huizhangTJPanel.endTime);
                break;
            case that._groupTJPanel:
                that.requestGroupTJ(sort, groupId, userId, that._groupTJPanel.startTime, that._groupTJPanel.endTime);
                break;
            case that._zuliTJPanel:
                that.requestZuliTJ(sort, groupId, userId, that._zuliTJPanel.startTime, that._zuliTJPanel.endTime);
                break;
            case that._managerTJPanel:
                that.requestManagerTJ(sort, groupId, userId, that._managerTJPanel.startTime, that._managerTJPanel.endTime);
                break;
            case that._powerSettingPanel:
                that.requestPowerList(sort, groupId, userId);
                break;
            default:
                cc.log("refreshRequest todo");
        }
    },

    hideAllListPanel: function() {
        this._mpListPanel.setVisible(false);
        this._resetSumListPanel.setVisible(false);
        this._mpLimitListPanel.setVisible(false);
        this._huizhangTJPanel.setVisible(false);
        this._groupTJPanel.setVisible(false);
        this._zuliTJPanel.setVisible(false);
        this._managerTJPanel.setVisible(false);
        this._powerSettingPanel.setVisible(false);
    },

    showMpListPanel: function(datas) {
        var that = this;

        that.hideAllListPanel();
        that._mpListPanel.setVisible(true);
        that._curPanel = that._mpListPanel;

        if (!datas)
            return;

        that._curPanel.datas = datas;

        var cell = that._mpListPanel.getChildByName("cell");
        var contentList = that._mpListPanel.getChildByName("content_list");

        contentList.removeAllItems();
        cell.setVisible(true);
        for (var i = 0; i < datas.list.length; i++) {
            var data = datas.list[i];
            var item = cell.clone();
            contentList.pushBackCustomItem(item);

            that.refreshHead(data.headimgurl, item.getChildByName("image_head"));
            item.getChildByName("text_fenzu").setString(data.groupId == 0 ? "" : data.groupId + "");
            item.getChildByName("text_name").setString(getNewName(unescape(data.nickname), that.nameMaxLen));
            item.getChildByName("text_ID").setString(data.userId + "");
            item.getChildByName("text_mp").setString(data.mp + "");
            item.getChildByName("text_tag").setVisible(false);
            item.getChildByName("text_name").y = item.getChildByName("text_mp").y;

            var reset = item.getChildByName("btn_reset");
            reset.data = data;
            reset.item = item;
            reset.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    MjClient.showMsg("确定要重置该玩家的防沉迷分数吗？",
                        function() {
                            that.requestUserMpReset(sender.data.userId, function() {
                                var mpInitial = datas.mpInitial || that.clubData.info.mpInitial || 0;
                                datas.total += mpInitial - sender.data.mp;
                                datas.total = revise(datas.total, 100);
                                sender.data.mp = mpInitial;
                                sender.item.getChildByName("text_mp").setString(mpInitial + "");
                                bottomPanel.getChildByName("text_mpSum").setString("总计：" + datas.total);
                            });
                        },
                        function() {}, "1");
                }
            });

            var zhanji = item.getChildByName("btn_zhanji");
            zhanji.data = data;
            zhanji.addTouchEventListener(function(sender, type) {
                if (type == 2) {

                    that.clubData.openPlayerInfo = sender.data;
                    that.clubData.openPlayerInfo.fensuData = {text: ""};
                    that.clubData.openPlayerInfo.gameType = -1;
                    that.clubData.openPlayerInfo.endTime = "";
                    that.clubData.openPlayerInfo.startTime = "";

                    if (MjClient.APP_TYPE.QXSYDTZ && (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)) {
                        that.getParent().addChild(new FriendCard_roomRecord_daTongZi(that.clubData, "1", true));
                    } else {
                        that.getParent().addChild(new FriendCard_roomRecord(that.clubData, "1", true));
                    }
                }
            });
        }
        cell.setVisible(false);

        var bottomPanel = that._mpListPanel.getChildByName("Panel_bottom");
        bottomPanel.getChildByName("text_mpSum").setString("总计：" + datas.total);

        var setting = bottomPanel.getChildByName("btn_setting");
        setting.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.addChild(new FriendCard_FCM_setting(that.clubData, datas.mpUse, datas.mpScoreForbid, datas.mpTimeForbid, datas.mpGameCntForbid,
                    datas.mpBottom, datas.mpGameTimeLimit, datas.mpGameCntLimit));
            }
        });
        setting.setVisible(FriendCard_Common.isLeader(that.clubData.info));
        if (that.isLM && that.clubData.roleId == 1) // 会长
            setting.setVisible(true);

        var resetAllMpBtn = bottomPanel.getChildByName("btn_resetAllMp");

        var tipBtn = bottomPanel.getChildByName("tipBtn");
        var roleText = FriendCard_Common.getRoleTextByRoleId(that.clubData.roleId);
        if (roleText == '会长' || roleText == "盟主") {
            resetAllMpBtn.setVisible(true);
            tipBtn.setVisible(true);
            tipBtn.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    MjClient.showMsg("每日只能操作一次，点击所有成员的【防沉迷分数】都会清零，请谨慎操作。")
                }
            });
            resetAllMpBtn.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    that.addChild(new friendcard_FCM_resetMpTipDialog(function (){
                        that.requestAllUserMpReset();
                    }));
                }
            }); 
        }
        else
        {
            resetAllMpBtn.setVisible(false);
            tipBtn.setVisible(false);
        }
        bottomPanel.getChildByName("tip").setVisible(false);

        that.showEmptyText(datas.list.length == 0);
    },

    showResetSumListPanel: function(datas) {
        var that = this;

        that.hideAllListPanel();
        that._resetSumListPanel.setVisible(true);
        that._curPanel = that._resetSumListPanel;

        if (!datas)
            return;

        that._curPanel.datas = datas;

        var cell = that._resetSumListPanel.getChildByName("cell");
        var contentList = that._resetSumListPanel.getChildByName("content_list");

        contentList.removeAllItems();
        cell.setVisible(true);
        var sumMp1 = 0;
        var sumMp2 = 0;
        var sumMp3 = 0;
        var sumMp4 = 0;
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var item = cell.clone();
            contentList.pushBackCustomItem(item);

            that.refreshHead(data.headimgurl, item.getChildByName("image_head"));
            item.getChildByName("text_group").setString(data.group == 0 ? "" : data.group + "");
            item.getChildByName("text_name").setString(getNewName(unescape(data.nickname), that.nameMaxLen));
            item.getChildByName("text_ID").setString(data.userId + "");
            if ("roleId" in data) {
                var roleName = FriendCard_Common.getRoleTextByRoleId(data.roleId);
                item.getChildByName("text_tag").setString(roleName != "未知身份" ? roleName : "");
            }
            else {
                item.getChildByName("text_tag").setVisible(false);
                item.getChildByName("text_name").y = item.getChildByName("text_ID").y;
            }

            if (that.isLM) {
                item.getChildByName("text_mp_1").setString(data.amount1 + ""); // 会长重置
                item.getChildByName("text_mp_2").setString(data.amount5 + ""); // 管理员重置
                item.getChildByName("text_mp_3").setString(data.amount2 + ""); // 组长重置
                item.getChildByName("text_mp_4").setString(data.amount4 + ""); // 助理重置

                sumMp1 += data.amount1;
                sumMp2 += data.amount2;
                sumMp3 += data.amount5;
                sumMp4 += data.amount4;
            }
            else {
                item.getChildByName("text_mp_1").setString(data.amount3 + ""); // 会长重置
                item.getChildByName("text_mp_2").setString(data.amount1 + ""); // 管理员重置
                item.getChildByName("text_mp_3").setString(data.amount2 + ""); // 组长重置
                item.getChildByName("text_mp_4").setString(data.amount4 + ""); // 助理重置

                sumMp1 += data.amount3;
                sumMp2 += data.amount2;
                sumMp3 += data.amount1;
                sumMp4 += data.amount4;
            }

            var jilu = item.getChildByName("btn_jilu");
            jilu.data = data;
            jilu.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    that.addChild(new Friendcard_FCM_opRecord(that.clubId, sender.data.userId, "resetRecord"));
                }
            });
        }
        cell.setVisible(false);

        var bottomPanel = that._resetSumListPanel.getChildByName("Panel_bottom");
        var text_mp1 = bottomPanel.getChildByName("text_mp1");
        var text_mp2 = bottomPanel.getChildByName("text_mp2");
        var text_mp3 = bottomPanel.getChildByName("text_mp3");
        var text_mp4 = bottomPanel.getChildByName("text_mp4");
        text_mp1.setString("会长:" + revise(sumMp1, 100));
        text_mp2.setString("组长:" + revise(sumMp2, 100));
        text_mp3.setString("管理员:" + revise(sumMp3, 100));
        text_mp4.setString("助理:" + revise(sumMp4, 100));
        text_mp3.x = text_mp1.x + 148;
        text_mp4.x = text_mp1.x + 148;

        that.setTimeSelectNode(that._resetSumListPanel);

        bottomPanel.getChildByName("tipBtn").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.addChild(new Friendcard_FCM_help("重置总计"));
            }
        });

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

    setTimeSelectNode: function(panel) {
        var that = this;

        var bottomPanel = panel.getChildByName("Panel_bottom");

        var getMyTimeArray = function(time) {
            var now = new Date();
            now.setTime(time);
            var year = now.getFullYear(); //年
            var month = now.getMonth() + 1; //月
            var day = now.getDate(); //日

            var hh = now.getHours(); //时
            var mm = now.getMinutes(); //分
            var ss = now.getSeconds(); //秒

            return [year, month, day, hh, mm, ss];
        };

        var startTimeArray = getMyTimeArray(panel.startTime);
        var endTimeArray = getMyTimeArray(panel.endTime);

        var startTimeNode = bottomPanel.getChildByName("image_date1_bg");
        var point1 = startTimeNode.convertToWorldSpace(startTimeNode.getAnchorPointInPoints());
        startTimeNode.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var str = startTimeTextNode.getString();
                str = str.replace(/-/g, "/");
                var date = new Date(str);
                var data = {
                    event: "refreshStartTime_" + panel.getName(),
                    date: date,
                    px: point1.x,
                    py: point1.y
                };
                that.addChild(new friendcard_selectTime(data));
            }
        });
        var startTimeTextNode = startTimeNode.getChildByName("Text_date_start");
        startTimeTextNode.setFontSize(18);
        startTimeTextNode.setTextHorizontalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        that.setShowTime(startTimeTextNode, startTimeArray[0], startTimeArray[1], startTimeArray[2], "00", "00");

        UIEventBind(null, startTimeTextNode, "refreshStartTime_" + panel.getName(), function(eD) {
            that.setShowTime(startTimeTextNode, eD.year, eD.month, eD.day, eD.hour, eD.minute);
        });

        var endTimeNode = bottomPanel.getChildByName("image_date2_bg");
        var point2 = endTimeNode.convertToWorldSpace(endTimeNode.getAnchorPointInPoints());

        endTimeNode.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var str = endTimeTextNode.getString();
                str = str.replace(/-/g, "/");
                var date = new Date(str);
                var data = {
                    event: "refreshEndTime_" + panel.getName(),
                    date: date,
                    px: point2.x,
                    py: point2.y
                };
                that.addChild(new friendcard_selectTime(data));
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tongji_Wanjiatongji_Shijianxuanze", {
                    uid: SelfUid()
                });
            }
        });
        var endTimeTextNode = endTimeNode.getChildByName("Text_date_end");
        endTimeTextNode.setFontSize(18);
        endTimeTextNode.setTextHorizontalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER)

        that.setShowTime(endTimeTextNode, endTimeArray[0], endTimeArray[1], endTimeArray[2], "00", "00");

        UIEventBind(null, endTimeTextNode, "refreshEndTime_" + panel.getName(), function(eD) {
            that.setShowTime(endTimeTextNode, eD.year, eD.month, eD.day, eD.hour, eD.minute);
        });

        var check = bottomPanel.getChildByName("btn_check");
        check.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var time = startTimeTextNode.getString();
                panel.startTime = FriendCard_Common.transdate(time.substring(0, 4), Number(time.substring(5, 7)) - 1, time.substring(8, 10), time.substring(11, 13), time.substring(14, 16));

                var time = endTimeTextNode.getString();
                panel.endTime = FriendCard_Common.transdate(time.substring(0, 4), Number(time.substring(5, 7)) - 1, time.substring(8, 10), time.substring(11, 13), time.substring(14, 16));

                that.refreshRequest(panel);
            }
        });

        var today = bottomPanel.getChildByName("btn_today");
        today.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var nowTime = MjClient.getCurrentTime();
                that.setShowTime(startTimeTextNode, nowTime[0], nowTime[1], nowTime[2], "00", "00");

                var nextDate = new Date(nowTime[0],nowTime[1]-1,nowTime[2] + 1);
                var nextTime = MjClient.getCurrentTime(nextDate);
                that.setShowTime(endTimeTextNode,nextTime[0],nextTime[1],nextTime[2],"00","00");

                var time = startTimeTextNode.getString();
                panel.startTime = FriendCard_Common.transdate(time.substring(0, 4), Number(time.substring(5, 7)) - 1, time.substring(8, 10), time.substring(11, 13), time.substring(14, 16));
                var time = endTimeTextNode.getString();
                panel.endTime = FriendCard_Common.transdate(time.substring(0, 4), Number(time.substring(5, 7)) - 1, time.substring(8, 10), time.substring(11, 13), time.substring(14, 16));

                that.refreshRequest(panel);
            }
        });
    },

    setShowTime: function(node, txt_1, txt_2, txt_3, txt_4, txt_5) {
        if ((txt_2 + "").length < 2) {
            txt_2 = "0" + txt_2;
        }
        if ((txt_3 + "").length < 2) {
            txt_3 = "0" + txt_3;
        }
        if ((txt_4 + "").length < 2) {
            txt_4 = "0" + txt_4;
        }
        if ((txt_5 + "").length < 2) {
            txt_5 = "0" + txt_5;
        }

        node.setString(txt_1 + "-" + txt_2 + "-" + txt_3 + "\n" + txt_4 + ":" + txt_5);
    },

    // sortBy 0=不排序 1=小到大 -1=大到小
    setTitleSort: function(titleNode, data, sortKey, sortBy, callBack) {
        var that = this;

        if (data.length > 0 && !("srcIndex" in data[0])) {
            for (var i = 0; i < data.length; i++) {
                data[i].srcIndex = i;
            }
        }

        var sanjiao_n = titleNode.getChildByName("Image_sanjiao_n");
        var sanjiao_s = titleNode.getChildByName("Image_sanjiao_s");
        var switchSort = function() {
            if (sortBy == 0)
                sortBy = 1;
            else if (sortBy == 1)
                sortBy = -1;
            else if (sortBy == -1)
                sortBy = 0;

            //cc.log("data=", JSON.stringify(data));
            //cc.log("sortKey=", sortKey);
            //cc.log("sortBy=", sortBy)
            data.sort(function(a, b) {
                if (sortBy == 0)
                    return a.srcIndex - b.srcIndex;
                else if (sortBy == 1)
                    return a[sortKey] - b[sortKey];
                else if (sortBy == -1)
                    return b[sortKey] - a[sortKey];
            });
            //cc.log("data=", JSON.stringify(data));

            callBack(sortBy);
        }

        titleNode.setTouchEnabled(true);
        titleNode.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                switchSort();
            }
        });

        sanjiao_n.setTouchEnabled(true);
        sanjiao_n.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                switchSort();
            }
        });

        sanjiao_s.setTouchEnabled(true);
        sanjiao_s.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                switchSort();
            }
        });

        sanjiao_n.setVisible(sortBy == 0);
        sanjiao_s.setVisible(sortBy != 0);
        if (sortBy != 0) {
            sanjiao_n.setFlippedY(sortBy == 1);
            sanjiao_s.setFlippedY(sortBy == 1);
        }
        titleNode.setTextColor(sortBy == 0 ? cc.color("#443333"): cc.color("#AB3215"));
    },

    showMpLimitListPanel: function(datas, sortBy) {
        var that = this;

        that.hideAllListPanel();
        that._mpLimitListPanel.setVisible(true);
        that._curPanel = that._mpLimitListPanel;

        if (!datas)
            return;

        that._curPanel.datas = datas;
        if (typeof(sortBy) == "undefined")
            sortBy = 0;

        var cell = that._mpLimitListPanel.getChildByName("cell");
        var contentList = that._mpLimitListPanel.getChildByName("content_list");

        contentList.removeAllItems();
        cell.setVisible(true);
        for (var i = 0; i < datas.userList.length; i++) {
            var data = datas.userList[i];
            var item = cell.clone();
            contentList.pushBackCustomItem(item);

            that.refreshHead(data.headimgurl, item.getChildByName("image_head"));
            item.getChildByName("text_fenzu").setString(data.groupId == 0 ? "" : data.groupId + "");
            item.getChildByName("text_name").setString(getNewName(unescape(data.nickname), that.nameMaxLen));
            item.getChildByName("text_ID").setString(data.userId + "");
            item.getChildByName("text_detail").setString(data.limitDesc + "");
            if ("roleId" in data) {
                var roleName = FriendCard_Common.getRoleTextByRoleId(data.roleId);
                item.getChildByName("text_tag").setString(roleName != "未知身份" ? roleName : "");
            }
            else {
                item.getChildByName("text_tag").setVisible(false);
                item.getChildByName("text_name").y = item.getChildByName("text_ID").y;
            }
            item.getChildByName("text_mp").setString(data.mp + "");

            var reset = item.getChildByName("btn_reset");
            reset.data = data;
            reset.item = item;
            reset.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    MjClient.showMsg("确定要重置该玩家的防沉迷分数吗？",
                        function() {
                            that.requestUserMpReset(sender.data.userId, function() {
                                var index = datas.userList.indexOf(sender.data);
                                if (index >= 0) {
                                    contentList.removeChild(sender.item);
                                    datas.userList.splice(index, 1);
                                }
                            });
                        },
                        function() {}, "1");
                }
            });
        }
        cell.setVisible(false);

        var titlePanel = that._mpLimitListPanel.getChildByName("Panle_title");
        that.setTitleSort(titlePanel.getChildByName("text_title_mp"), datas.userList, "mp", sortBy, function(sortBy) {
            that.showMpLimitListPanel(datas, sortBy);
        });

        var bottomPanel = that._mpLimitListPanel.getChildByName("Panel_bottom");

        var setting = bottomPanel.getChildByName("btn_setting");
        setting.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.addChild(new FriendCard_FCM_setting(that.clubData, datas.mpUse, datas.mpScoreForbid, datas.mpTimeForbid, datas.mpGameCntForbid,
                    datas.mpBottom, datas.mpGameTimeLimit, datas.mpGameCntLimit));
            }
        });
        setting.setVisible(FriendCard_Common.isLeader(that.clubData.info));

        bottomPanel.getChildByName("tipBtn").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.addChild(new Friendcard_FCM_help("限制列表"));
            }
        });

        that.showEmptyText(datas.userList.length == 0);
    },

    showGroupOrZuliTJPanel: function(panel, datas, sortKey, sortBy) {
        var that = this;

        that.hideAllListPanel();
        panel.setVisible(true);
        that._curPanel = panel;

        if (!datas)
            return;

        panel.datas = datas;

        var cell = panel.getChildByName("cell");
        var contentList = panel.getChildByName("content_list");

        contentList.removeAllItems();
        cell.setVisible(true);
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var item = cell.clone();
            contentList.pushBackCustomItem(item);

            that.refreshHead(data.headimgurl, item.getChildByName("image_head"));
            item.getChildByName("text_num").setString(data.count + "");
            item.getChildByName("text_name").setString(getNewName(unescape(data.nickname), that.nameMaxLen));
            item.getChildByName("text_ID").setString(data.userId + "");
            if ("roleId" in data) {
                var roleName = FriendCard_Common.getRoleTextByRoleId(data.roleId);
                item.getChildByName("text_tag").setString(roleName != "未知身份" ? roleName : "");
            }
            else {
                item.getChildByName("text_tag").setVisible(false);
                item.getChildByName("text_name").y = item.getChildByName("text_ID").y;
            }
            item.getChildByName("text_mp_2").setString(data.getAmount + ""); // 重置总分
            item.getChildByName("text_mp_3").setString(data.noAmount + ""); // 防沉迷总分

            var jilu = item.getChildByName("btn_jilu");
            jilu.data = data;
            jilu.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    var recordName;
                    if (panel == that._groupTJPanel)
                        recordName = "groupRecord";
                    else if (panel == that._zuliTJPanel)
                        recordName = "zuliRecord";
                    else if (panel == that._huizhangTJPanel)
                        recordName = "huizhangRecord";
                    that.addChild(new Friendcard_FCM_opRecord(that.clubId, sender.data.userId, recordName));
                }
            });
        }
        cell.setVisible(false);

        var titlePanel = panel.getChildByName("Panle_title");

        that.setTitleSort(titlePanel.getChildByName("text_title_mp_1"), datas, "getAmount", sortKey == "getAmount" ? sortBy : 0, function(sortBy) {
            that.showGroupOrZuliTJPanel(panel, datas, "getAmount", sortBy);
        });

        that.setTitleSort(titlePanel.getChildByName("text_title_mp_2"), datas, "noAmount", sortKey == "noAmount" ? sortBy : 0, function(sortBy) {
            that.showGroupOrZuliTJPanel(panel, datas, "noAmount", sortBy);
        });

        that.setTimeSelectNode(panel);

        var bottomPanel = panel.getChildByName("Panel_bottom");
        bottomPanel.getChildByName("tipBtn").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var name = "";
                if (panel == that._groupTJPanel)
                    name = "组统计";
                else if (panel == that._zuliTJPanel)
                    name = "助理统计";
                else if (panel == that._huizhangTJPanel)
                    name = "会长统计";
                that.addChild(new Friendcard_FCM_help(name));
            }
        });

        that.showEmptyText(datas.length == 0);
    },

    showManagerTJPanel: function(datas, sortKey, sortBy) {
        var that = this;

        that.hideAllListPanel();
        that._managerTJPanel.setVisible(true);
        that._curPanel = that._managerTJPanel;

        if (!datas)
            return;

        var panel = that._managerTJPanel;
        panel.datas = datas;

        var cell = panel.getChildByName("cell");
        var contentList = panel.getChildByName("content_list");

        contentList.removeAllItems();
        cell.setVisible(true);
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var item = cell.clone();
            contentList.pushBackCustomItem(item);

            that.refreshHead(data.headimgurl, item.getChildByName("image_head"));
            item.getChildByName("text_name").setString(getNewName(unescape(data.nickname), that.nameMaxLen));
            item.getChildByName("text_ID").setString(data.userId + "");
           if ("roleId" in data) {
                var roleName = FriendCard_Common.getRoleTextByRoleId(data.roleId);
                item.getChildByName("text_tag").setString(roleName != "未知身份" ? roleName : "");
            }
            else {
                item.getChildByName("text_tag").setVisible(false);
                item.getChildByName("text_name").y = item.getChildByName("text_ID").y;
            }
            item.getChildByName("text_mp_1").setString(data.getAmount + ""); // 重置总计

            var jilu = item.getChildByName("btn_jilu");
            jilu.data = data;
            jilu.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    that.addChild(new Friendcard_FCM_opRecord(that.clubId, sender.data.userId, "managerRecord"));
                }
            });
        }
        cell.setVisible(false);

        var titlePanel = that._managerTJPanel.getChildByName("Panle_title");
        that.setTitleSort(titlePanel.getChildByName("text_title_mp_0"), datas, "getAmount", sortKey == "getAmount" ? sortBy : 0, function(sortBy) {
            that.showManagerTJPanel(datas, "getAmount", sortBy);
        });

        that.setTimeSelectNode(that._managerTJPanel);

        var bottomPanel = that._curPanel.getChildByName("Panel_bottom");
        bottomPanel.getChildByName("tipBtn").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.addChild(new Friendcard_FCM_help("管理员统计"));
            }
        });

        that.showEmptyText(datas.length == 0);
    },

    showPowerSettingPanel: function(datas) {
        var that = this;

        that.hideAllListPanel();
        that._powerSettingPanel.setVisible(true);
        that._curPanel = that._powerSettingPanel;

        that.hideAllListPanel();
        that._powerSettingPanel.setVisible(true);

        if (!datas)
            return;

        that._powerSettingPanel.datas = datas;

        var cell = that._powerSettingPanel.getChildByName("cell");
        var contentList = that._powerSettingPanel.getChildByName("content_list");

        contentList.removeAllItems();
        cell.setVisible(true);
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var item = cell.clone();
            contentList.pushBackCustomItem(item);

            that.refreshHead(data.headimgurl, item.getChildByName("image_head"));
            item.getChildByName("text_group").setString(data.group == 0 ? "" : data.group + "");
            item.getChildByName("text_name").setString(getNewName(unescape(data.nickname), that.nameMaxLen));
            item.getChildByName("text_ID").setString(data.userId + "");
            item.getChildByName("text_loginTime").setString(MjClient.dateFormat(new Date(data.lastLoginTime), 'yyyy-MM-dd\nhh:mm:ss'));
            item.getChildByName("text_loginState").setString(data.isOnline ? "在线" : "离线");

            var checkBox = item.getChildByName("checkBox");
            checkBox.setSelected(data.mpPermission & 1 == 1);
            checkBox.data = data;
            checkBox.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    that.requestSetMpPermission(sender.data.userId, sender.data.mpPermission & 1 ? 0 : 1, function(isSuccess) {
                        if (isSuccess)
                            sender.data.mpPermission ^= 1;
                        sender.setSelected(sender.data.mpPermission & 1);
                    });
                }
            });
        }
        cell.setVisible(false);

        var bottomPanel = that._curPanel.getChildByName("Panel_bottom");
        bottomPanel.getChildByName("tipBtn").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.addChild(new Friendcard_FCM_help("权限设置"));
            }
        });

        that.showEmptyText(datas.length == 0);
    }
});