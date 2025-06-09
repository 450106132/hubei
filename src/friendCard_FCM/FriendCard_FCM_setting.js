// add by cyc 20190724

var FriendCard_FCM_setting = cc.Layer.extend({
    ctor: function(clubData, mpUse, mpScoreForbid, mpTimeForbid, mpGameCntForbid, mpBottom, mpGameTimeLimit, mpGameCntLimit) {
        this._super();

        var that = this;
        that.clubData = clubData;
        that.isLM = FriendCard_Common.getClubisLM(clubData.info);

        var node = ccs.load("friendcard_FCM_setting.json").node;
        that.addChild(node);
        COMMON_UI.setNodeTextAdapterSize(node);

        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);

        that.panel = node.getChildByName("Panel")
        setWgtLayout(that.panel, [that.panel.width / 1280, that.panel.height / 720], [0.5, 0.5], [0, 0]);

        popupAnm(that.panel);

        var openCheckBox = that.panel.getChildByName("openCheckBox");
        openCheckBox.setSelected(!!mpUse);
        openCheckBox.addTouchEventListener(function(sender, type) {
            if (type != 2)
                return;

            if (that.isLM && FriendCard_Common.getRoleTextByRoleId(clubData.roleId) != "盟主") {
                MjClient.showToast("联盟状态下，只有盟主才能设置是否开启防沉迷系统。");
                openCheckBox.runAction(cc.sequence(cc.delayTime(0.05), cc.callFunc(function() {
                    openCheckBox.setSelected(!openCheckBox.isSelected());
                })));
                return;
            }

            that.addChild(new Friendcard_FCM_saveSure(!openCheckBox.isSelected(), setTouchFunc,
                function() {
                    openCheckBox.setSelected(!openCheckBox.isSelected());
                }));
        });

        var setTouchFunc = function() {
            if (openCheckBox.isSelected()) {
                checkBox1.setSelected(checkBox1.tempSelect);
                checkBox1.setEnabled(true);

                checkBox2.setSelected(checkBox2.tempSelect);
                checkBox2.setEnabled(true);

                checkBox3.setSelected(checkBox3.tempSelect);
                checkBox3.setEnabled(true);
            } else {
                checkBox1.tempSelect = checkBox1.isSelected();
                checkBox1.setSelected(false);
                checkBox1.setEnabled(false);

                checkBox2.tempSelect = checkBox2.isSelected();
                checkBox2.setSelected(false);
                checkBox2.setEnabled(false);

                checkBox3.tempSelect = checkBox3.isSelected();
                checkBox3.setSelected(false);
                checkBox3.setEnabled(false);
            }
        }

        var setTextFunc = function(selectNode, text) {
            selectNode.getChildByName("text").setString(text);
            selectNode.text = text;
            selectNode.getChildByName("Button_jiaotou").setBright(true);
        }

        var optionNode = that.panel.getChildByName("optionNode");
        var checkBox1 = that.panel.getChildByName("checkBox1");
        var selectNode1 = that.panel.getChildByName("selectNode1");

        checkBox1.setSelected(!!mpScoreForbid);
        checkBox1.tempSelect = checkBox1.isSelected();
        setTextFunc(selectNode1, mpBottom);
        selectNode1.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var optionTexts = ["-8000", "-5000", "-3000", "-2000", "-1500", "-1000", "-900", "-800",
                    "-700", "-600", "-500", "-400", "-300", "-200", "-100", "-50", "0", "100", "200", "500", "1000", "2000", "5000", "8000"
                ];
                that.showOptionPanel(selectNode1, optionNode, optionTexts, setTextFunc);
                optionNode.x = selectNode1.x;
                optionNode.y = selectNode1.y - selectNode1.height / 2 - 5 - optionNode.height / 2;
            }
        });

        var checkBox2 = that.panel.getChildByName("checkBox2");
        var selectNode2 = that.panel.getChildByName("selectNode2");

        checkBox2.setSelected(!!mpTimeForbid);
        checkBox2.tempSelect = checkBox2.isSelected();
        setTextFunc(selectNode2, mpGameTimeLimit + "小时");
        selectNode2.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var optionTexts = [];
                for (var i = 0; i < 24; i++) {
                    optionTexts[i] = (i + 1) + "小时";
                }
                that.showOptionPanel(selectNode2, optionNode, optionTexts, setTextFunc);
                optionNode.x = selectNode2.x;
                optionNode.y = selectNode2.y + selectNode2.height / 2 + 5 + optionNode.height / 2;
            }
        });

        var checkBox3 = that.panel.getChildByName("checkBox3");
        var selectNode3 = that.panel.getChildByName("selectNode3");

        checkBox3.setSelected(!!mpGameCntForbid);
        checkBox3.tempSelect = checkBox3.isSelected();
        setTextFunc(selectNode3, mpGameCntLimit + "场");
        selectNode3.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var optionTexts = ["50场", "100场", "200场"];
                that.showOptionPanel(selectNode3, optionNode, optionTexts, setTextFunc);
                optionNode.x = selectNode3.x;
                optionNode.y = selectNode3.y + selectNode2.height / 2 + 5 + optionNode.height / 2;
            }
        });

        setTouchFunc();

        that.panel.getChildByName("close").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent();
            }
        });

        that.panel.getChildByName("saveBtn").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var mpBottom = checkBox1.isSelected() ? Number(selectNode1.text) : -1;
                var mpGameTimeLimit = checkBox2.isSelected() ? Number(selectNode2.text.replace("小时", "")) : -1;
                var mpGameCntLimit = checkBox3.isSelected() ? Number(selectNode3.text.replace("场", "")) : -1;

                that.requestUpdateMpReset(openCheckBox.isSelected() ? 1 : 0, mpBottom, mpGameTimeLimit, mpGameCntLimit);
            }
        });

        that.panel.getChildByName("tipBtn").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.addChild(new Friendcard_FCM_help("防沉迷设置"));
            }
        });
    },

    showOptionPanel: function(selectNode, optionNode, optionTexts, setTextFunc) {
        var optionList = optionNode.getChildByName("optionList");
        var cell = optionNode.getChildByName("cell");

        optionList.removeAllItems();
        cell.setVisible(true);
        var curText = selectNode.text;
        for (var i = 0; i < optionTexts.length; i++) {
            var itemNode = cell.clone();
            optionList.pushBackCustomItem(itemNode);
            itemNode.getChildByName("text").setString(optionTexts[i]);
            if(itemNode.getChildByName("Image_selected")){
                itemNode.getChildByName("Image_selected").setVisible(optionTexts[i] == curText);
            }
            itemNode.text = optionTexts[i];
            itemNode.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    optionNode.setVisible(false);
                    cc.eventManager.removeListener(touchListener);
                    selectNode.getChildByName("Button_jiaotou").setBright(true);
                    setTextFunc(selectNode, sender.text);
                }
            });
        }

        var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event) {
                return true;
            },
            onTouchEnded: function(touch, event) {
                optionNode.setVisible(false);
                cc.eventManager.removeListener(touchListener);
                selectNode.getChildByName("Button_jiaotou").setBright(true);
            }
        });
        cc.eventManager.addListener(touchListener, optionNode);

        cell.setVisible(false);
        optionNode.visible = true;
        selectNode.getChildByName("Button_jiaotou").setBright(false);
    },

    requestUpdateMpReset: function(mpUse, mpBottom, mpGameTimeLimit, mpGameCntLimit) {
        var that = this;

        var sendInfo;
        if (that.isLM) {
            var sendInfo = {
                leagueId: that.clubData.info.clubId,
            }
            if (FriendCard_Common.isLeader(that.clubData.info))
                sendInfo.mpUse = mpUse;
        } else {
            var sendInfo = {
                clubId: that.clubData.info.clubId,
                mpUse: mpUse
            }
        }

        sendInfo.mpScoreForbid = mpBottom == -1 ? 0 : 1;
        if (mpBottom != -1) sendInfo.mpBottom = mpBottom;

        sendInfo.mpTimeForbid = mpGameTimeLimit == -1 ? 0 : 1;
        if (mpGameTimeLimit != -1) sendInfo.mpGameTimeLimit = mpGameTimeLimit;

        sendInfo.mpGameCntForbid = mpGameCntLimit == -1 ? 0 : 1;
        if (mpGameCntLimit != -1) sendInfo.mpGameCntLimit = mpGameCntLimit;

        MjClient.block();
        var api = that.isLM ? "pkplayer.handler.leagueUpdateMp" : "pkplayer.handler.clubUpdate";
        MjClient.gamenet.request(api, sendInfo, function(rtn) {
            MjClient.unblock();
            cc.log("requestUpdateMpReset ret:", JSON.stringify(rtn));
            if (rtn.result == 0 || rtn.code == 0) {
                MjClient.showToast(rtn.message || "操作成功！");
                postEvent("setMpSuccess", {});
                that.removeFromParent();
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },
});

var friendcard_FCM_resetMpTipDialog = cc.Layer.extend({
    ctor: function(callback) {
        this._super();
        var uiNode = ccs.load("friendcard_FCM_resetMpTipDialog.json").node;
        this.addChild(uiNode);
        var block = uiNode.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0],true);

        var back = uiNode.getChildByName("back");
        this._panel = back;
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        popupAnm(back)

        var btn_close = back.getChildByName("btn_close");
        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true)
            }
        }, this);

        back.getChildByName("btn_cancel").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true)
            }
        }, this);

        var btn_confirm = back.getChildByName("btn_confirm");
        var timeLabel = btn_confirm.getChildByName("time");
        btn_confirm.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                callback();
                this.removeFromParent(true);
            }
        }, this);

        var time = 5;
        timeLabel.setString(time);
        timeLabel.setVisible(true);
        timeLabel.ignoreContentAdaptWithSize(true);
        btn_confirm.setEnabled(false);
        btn_confirm.schedule(function() {
            if (time == 0) {
                timeLabel.setVisible(false);
                btn_confirm.setEnabled(true);
                btn_confirm.unscheduleAllCallbacks();
            }
            time --;
            timeLabel.setString(time);
        }, 1);
        
        return true;
    },
    
});

var Friendcard_FCM_saveSure = cc.Layer.extend({
    ctor: function(isOpen, sureCallBack, cancelCallBack) {
        this._super();

        var that = this;

        var node = ccs.load("friendcard_FCM_saveSure.json").node;
        that.addChild(node);
        COMMON_UI.setNodeTextAdapterSize(node);

        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);

        that.panel = node.getChildByName("Panel")
        setWgtLayout(that.panel, [that.panel.width / 1280, that.panel.height / 720], [0.5, 0.5], [0, 0]);

        popupAnm(that.panel);

        if (!isOpen)
            that.panel.getChildByName("msg").setString("你确定要关闭防沉迷系统吗？");

        that.panel.getChildByName("btn_close").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent();
                cancelCallBack();
            }
        });

        that.panel.getChildByName("no").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent();
                cancelCallBack();
            }
        });

        that.panel.getChildByName("yes").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent();
                sureCallBack();
            }
        });
    }
});

var Friendcard_FCM_opRecord = cc.Layer.extend({
    ctor: function(clubId, userId, recordName) {
        this._super();
        this.recordName = recordName;

        var that = this;
        that.isLM = FriendCard_Common.getClubisLM();

        var node = ccs.load("friendcard_FCM_opRecord.json").node;
        that.addChild(node);
        COMMON_UI.setNodeTextAdapterSize(node);

        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);

        that.panel = node.getChildByName("Panel")
        setWgtLayout(that.panel, [that.panel.width / 1280, that.panel.height / 720], [0.5, 0.5], [0, 0]);

        popupAnm(that.panel);

        that.panel.getChildByName("close").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent();
            }
        });

        if (FriendCard_Common.getSkinType() == 2)
            that.nameMaxLen = 5;
        else
            that.nameMaxLen = 6;

        that.panel.getChildByName("cell").setVisible(false);

        var listView = that.panel.getChildByName("listView");
        FriendCard_UI.setListAutoLoadMore(listView,function(){
                FriendCard_UI.addListBottomTipUi(listView,1)
                that.requestResetSumRecord(clubId, userId, recordName);
            },function(){
                if (!that._isLoadingData &&
                    that._hasMoreData
                     ){
                    return true;
                }
                return false
            })
        that.curPageId = 999999999;
        that.requestLen = 20;
        that._isLoadingData = false;
        that._hasMoreData = true;

        that.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function() {
            that.requestResetSumRecord(clubId, userId, recordName);
        })));
    },

    requestResetSumRecord: function(clubId, userId, recordName) {
        var that = this;

        var sendInfo = {
            userId: userId,
            pageId: that.curPageId,
            pageLen: that.requestLen,
        }
        if (that.isLM)
            sendInfo.leagueId = clubId;
        else
            sendInfo.clubId = clubId;

        var api = "";
        if (recordName == "huizhangRecord")
            api = "pkplayer.handler.leagueMpChairmanRecord";
        else if (recordName == "resetRecord")
            api = that.isLM ? "pkplayer.handler.leagueMpResetRecord" : "pkplayer.handler.clubMpResetRecord";
        else if (recordName == "managerRecord")
            api = that.isLM ? "pkplayer.handler.leagueMpAdminRecord" : "pkplayer.handler.clubMpAdminRecord";
        else if (recordName == "groupRecord")
            api = that.isLM ? "pkplayer.handler.leagueMpGroupRecord" : "pkplayer.handler.clubMpGroupRecord";
        else if (recordName == "zuliRecord")
            api = that.isLM ? "pkplayer.handler.leagueMpAssistantRecord" : "pkplayer.handler.clubMpAssistantRecord";

        MjClient.block();
        that._isLoadingData = true;
        MjClient.gamenet.request(api, sendInfo, function(rtn) {
            MjClient.unblock();
            cc.log(api + " ret:", JSON.stringify(rtn));
            if (rtn.code == 0 && rtn.data) {
                that.refreshList(rtn.data);
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },

    showEmptyText: function(isShow) {
        var that = this;

        var emptyTxt = new ccui.Text();
        emptyTxt.setFontName("fonts/lanting.TTF");
        emptyTxt.setFontSize(30);
        emptyTxt.setString("暂无数据");
        emptyTxt.setColor(cc.color(0x79, 0x34, 0x12));
        emptyTxt.setName("emptyTextTip");
        emptyTxt.setPosition(that.panel.width / 2, that.panel.height / 2);
        that.panel.addChild(emptyTxt);
    },

    refreshList: function(data) {
        var that = this;

        that._isLoadingData = false;
        that._hasMoreData = data.length >= that.requestLen;       
        var cell = that.panel.getChildByName("cell");
        var contentList = that.panel.getChildByName("listView");
        var len = contentList.getItems().length;

        //contentList.removeAllItems();
        cell.setVisible(true);
        for (var i = 0; i < data.length; i++) {
            var itemData = data[i];
            that.curPageId = itemData.id;
            var item = cell.clone();
            item.dataIndex = len + i;
            contentList.pushBackCustomItem(item);

            if (that.recordName == "huizhangRecord") {
                itemData.operatorId = FriendCard_Common.getHideIdStr(itemData.operatorId);
                itemData.userId = FriendCard_Common.getHideIdStr(itemData.userId);
            }

            item.getChildByName("timeText").setString(MjClient.dateFormat(new Date(itemData.createTime), 'yyyy-MM-dd hh:mm'));
            item.getChildByName("opText").setString(getNewName(unescape(itemData.operatorName), that.nameMaxLen) + "(" + itemData.operatorId + ")");
            item.getChildByName("resetText").setString(getNewName(unescape(itemData.userName), that.nameMaxLen) + "(" + itemData.userId + ")");
            item.getChildByName("tiliText").setString(itemData.amount + "");
        }
        if (data.length > 0) {
            var percent = (len *100) /(data.length+len);
            contentList.jumpToPercentVertical(percent)
        }
        cell.setVisible(false);
        FriendCard_UI.addListBottomTipUi(contentList,that._hasMoreData ? 2 : 3)
        if (data.length == 0)
            that.showEmptyText();
    },

    refreshDefMpChangeList: function(data) {
        var that = this;

        var cell = that.panel.getChildByName("cell");
        var contentList = that.panel.getChildByName("listView");

        var titleReset = that.panel.getChildByName("title_reset");
        var titleTili = that.panel.getChildByName("title_tili");
        var resetText = cell.getChildByName("resetText");
        var tiliText = cell.getChildByName("tiliText");
        titleTili.setVisible(false);
        tiliText.setVisible(false);
        titleReset.setString("操作");
        resetText.x -= 50;

        contentList.removeAllItems();
        cell.setVisible(true);
        for (var i = 0; i < data.length; i++) {
            var itemData = data[i];
            var item = cell.clone();
            contentList.pushBackCustomItem(item);

            item.getChildByName("timeText").setString(MjClient.dateFormat(new Date(itemData.createTime), 'yyyy-MM-dd hh:mm'));
            item.getChildByName("opText").setString(getNewName(unescape(itemData.nickname), that.nameMaxLen) + "(" + itemData.userId + ")");
            item.getChildByName("resetText").setString(itemData.reason + "");
        }
        cell.setVisible(false);

        if (data.length == 0)
            that.showEmptyText();
    }
});

var Friendcard_FCM_help = cc.Layer.extend({
    ctor: function(name) {
        this._super();

        var that = this;

        var node = ccs.load("friendcard_FCM_help.json").node;
        that.addChild(node);

        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);

        that.panel = node.getChildByName("Panel")
        setWgtLayout(that.panel, [that.panel.width / 1280, that.panel.height / 720], [0.5, 0.5], [0, 0]);

        popupAnm(that.panel);

        var titleNode = that.panel.getChildByName("title");
        titleNode.ignoreContentAdaptWithSize(true);
        titleNode.setString(name);

        var msgStr = "";
        switch (name) {
            case "重置总计":
                msgStr = "显示亲友圈内会长、管理员、组长、助理对每位玩家重置防沉迷分数的总和。";
                break;
            case "限制列表":
                msgStr = "当玩家满足会长设置的防沉迷禁玩条件时，将自动进入限制列并禁止玩牌，可通过点击“重置”按钮重置玩家防沉迷分数并移除禁玩状态。";
                break;
            case "组统计":
                msgStr = "重置总计：计算每组组长和助理共对组内的玩家重置防沉迷分数总和。\n\n防沉迷总分：计算该组内所有成员的防沉迷分数总和。";
                break;
            case "助理统计":
                msgStr = "重置总计：计算每位助理共对名下玩家重置的防沉迷分数总和。\n\n防沉迷总分：计算该助理名下所有成员的防沉迷分数总和。";
                break;
            case "会长统计":
                msgStr = "重置总计：计算每个亲友圈共对亲友圈内玩家重置的防沉迷分数总和。\n\n防沉迷总分：计算该会长名下所有成员的防沉迷分数总和。";
                break;
            case "权限设置":
                msgStr = "1.   可设置自己的下级是否拥有重置权限\n\
  （1）会长可设置管理员和组长，管理员可设置组长，组长可以设置助理。\n\n\
2.  没有重置权限的玩家不可给下级设置重置权限。（例如，组长没有重置权限，则不可给下级助理设置重置权限）\n\
3.  各角色仅能给自己的下级玩家进行重置和查看记录。";
                break;
            case "管理员统计":
                msgStr = "重置总计：计算管理员共对亲友圈内玩家重置的防沉迷分数总和";
                break;
            case "防沉迷设置":
                msgStr = "1.   防沉迷开关：开启防沉迷后，对局游戏会影响玩家的防沉迷分数。关闭后对局游戏不会对防沉迷分数产生影响。\n\n\
2.  开启防沉迷分数达到多少禁玩后，当玩家的防沉迷分数达到会长设定的这个数值时，玩家会被禁止加入游戏，并且进入限制列表。\n\n\
3.  开启玩家游戏时长高于多少小时禁玩后，当玩家本日的游戏时长高于会长设定的这个数值时，玩家会被禁止加入游戏，并且进入限制列表。\n\n\
4.  开启玩家对局数达到多少场禁玩后，当玩家本日的游戏对局场次高于于会长设定的这个数值时，玩家会被禁止加入游戏，并且进入限制列表。\n\n\
5.开启多个禁玩选项后，只要满足其中一项便会禁止玩牌，并进入限制列表。";
                break;
        }

        var msgScrollView = that.panel.getChildByName("msgScrollView");
        var msgNode = msgScrollView.getChildByName("msg");
        msgNode.setTextAreaSize(cc.size(msgNode.width, 0));
        msgNode.ignoreContentAdaptWithSize(true);
        msgNode.setString(msgStr);

        if (msgNode.height > msgScrollView.height) {
            msgNode.y = msgNode.height;
            msgScrollView.setInnerContainerSize(cc.size(msgScrollView.width, msgNode.height));
        }

        that.panel.getChildByName("btn_close").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent();
            }
        });
    }
});