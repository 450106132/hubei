/**
 * Created by cyc on 2018/05/04.
 */

var friendCard_yaoqingMember_timeList = {};
var friendCard_yaoqingMember_all = {}
// 亲友圈-邀请亲友圈成员一起对局
var FriendCard_yaoqingMember = cc.Layer.extend({
    ctor: function(clubId, roomId, clubTitle) {
        this._super();
        this.clubId = clubId;
        this.roomId = roomId;
        this.alreadyCount = 0;
        this.haveMore = true;

        this.clubInfoTable = getClubInfoInTable();

        if (MjClient.friendCardYaoqingMember_ui && cc.sys.isObjectValid(MjClient.friendCardYaoqingMember_ui))
            MjClient.friendCardYaoqingMember_ui.removeFromParent(true);
        
        MjClient.friendCardYaoqingMember_ui = this;

        var node = ccs.load("friendcard_yaoqingMember.json").node;
        this.addChild(node);

        var that = this;
        var Image_bg = node.getChildByName("Image_bg");
        var _close = Image_bg.getChildByName("Button_close")

        if(FriendCard_Common.getSkinType() == 3)
        {
            setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
            setWgtLayout(Image_bg, [0.5602, 0.6361], [0.5, 0.5], [0, 0]);
        }
        else if(FriendCard_Common.getSkinType() == 2)
        {
            setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
            setWgtLayout(Image_bg, [0.8078, 0.7264], [0.5, 0.5], [0, 0]);
        }
        else if(FriendCard_Common.getSkinType() == 1)
        {
            setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
            setWgtLayout(Image_bg, [0.8078, 0.7264], [0.5, 0.5], [0, 0]);
        }
        else if(FriendCard_Common.getSkinType() == 4)
        {
            setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
            setWgtLayout(Image_bg, [0.5391, 0.7639], [0.5, 0.5], [0, 0]);
        }
        else
        {
            node.setAnchorPoint(cc.p(0.5, 0.5));
            setWgtLayout(node, [1, 1], [0.5, 0.5], [0, 0], 2);
        }

        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent(true);
            }
        });

        if(isJinZhongAPPType())
            closeBtnAddLight(_close);
        

        this.listView = Image_bg.getChildByName("list");

        //增加一键邀请按钮
        this.btnYaoQingAll = null;
        if(FriendCard_Common.getSkinType() != 0)
        {
            this.btnYaoQingAll = Image_bg.getChildByName("btnYaoQingAll")
        }
        else
        {
           var dy = 60;
            this.listView.setPositionY(this.listView.getPositionY()+dy*(1-this.listView.getAnchorPoint().y))
            this.listView.height -= dy;
            this.btnYaoQingAll = ccui.Button("friendCards/yaoqing/btn_all_yaoqing_n.png","friendCards/yaoqing/btn_all_yaoqing_s.png","friendCards/yaoqing/btn_all_yaoqing_s.png");
            this.btnYaoQingAll.setAnchorPoint(cc.p(0.5, 0));
            this.btnYaoQingAll.setPosition(cc.p(Image_bg.width/2,0));

            Image_bg.addChild(this.btnYaoQingAll); 
        }
        this.btnYaoQingAll.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                friendCard_yaoqingMember_all[that.clubId] = new Date().getTime();
                that.timeing(that.btnYaoQingAll.getParent(),60);
                that.reqInviteGame();
            }
        });
        this.btnYaoQingAll.visible = false
        //增加一键邀请按钮end

        this.nullTip = Image_bg.getChildByName("Image_nullTip");
        this.cell = Image_bg.getChildByName("item");
        this.cell.visible = false;
        this.nullTip.visible = false;
        Image_bg.getChildByName("Text_title").ignoreContentAdaptWithSize(true);
        Image_bg.getChildByName("Text_title").setString(clubTitle);

        this.reqPlayerList();
    },
    reqPlayerList: function() {
        var that = this;
        MjClient.block();
        if(this.clubInfoTable && this.clubInfoTable.isLMClub){
            var sendInfo = {
                leagueId: this.clubId, 
                currcnt: this.alreadyCount,
                sort:9,
            }
            sendInfo.pmruleId = this.clubInfoTable.ruleId;
            cc.log("leaguePlayerList sendInfo",JSON.stringify(sendInfo));
            MjClient.gamenet.request("pkplayer.handler.leaguePlayerList", sendInfo, function(rtn) {
                MjClient.unblock();

                if (!cc.sys.isObjectValid(that))
                    return;
                if (rtn.code == 0) {
                    that.haveMore = false;//rtn.data.length > 5;
                    if (that.alreadyCount == 0) {
                        for(var i = 0 ; i < rtn.data.list.length; i++){
                            if(rtn.data.list[i].userId == MjClient.data.pinfo.uid){
                                rtn.data.list.splice(i,1);
                                break;
                            }
                        }
                        that.data = rtn.data.list;
                        that.refreshList();
                    } else if (rtn.data.list.length > 0) {
                        for(var i = 0 ; i < rtn.data.list.length; i++){
                            if(rtn.data.list[i].userId == MjClient.data.pinfo.uid){
                                rtn.data.list.splice(i,1);
                                break;
                            }
                        }
                        that.data = that.data.concat(rtn.data.list);
                        that.bottomOffset();
                    } else {
                        that.refreshMoreTip();
                    }
                } else {
                    FriendCard_Common.serverFailToast(rtn)
                    if (!that.visible)
                        that.removeFromParent();
                }
            });
        }else{
            var sendInfo = {
                clubId: this.clubId,
                alreadyCount: this.alreadyCount,
                status: "online"
            }
            if(this.clubInfoTable){
                sendInfo.pmruleId = this.clubInfoTable.ruleId;
            }
            MjClient.gamenet.request("pkplayer.handler.clubPlayerList", sendInfo, function(rtn) {
                MjClient.unblock();

                if (!cc.sys.isObjectValid(that))
                    return;

                if (rtn.code == 0) {
                    that.haveMore = false;//rtn.data.length > 5;
                    if (that.alreadyCount == 0) {
                        that.data = rtn.data;
                        that.refreshList();
                    } else if (rtn.data.length > 0) {
                        that.data = that.data.concat(rtn.data);
                        that.bottomOffset();
                    } else {
                        that.refreshMoreTip();
                    }
                } else {
                    FriendCard_Common.serverFailToast(rtn)
                    if (!that.visible)
                        that.removeFromParent();
                }
            });
        }
        
    },
    reqInviteGame: function(userId) {
        if(this.clubInfoTable && this.clubInfoTable.isLMClub){
            this.reqInviteGameLM(userId)
            return;
        }
        MjClient.block();
        var reqData = {};
        reqData.clubId = this.clubId;
        reqData.roomNum = this.roomId;
        if(userId){
            reqData.userId = userId;
        }
        if(this.clubInfoTable){
            reqData.pmruleId = this.clubInfoTable.ruleId;
        }
        MjClient.gamenet.request("pkplayer.handler.clubInviteGame", reqData, function(rtn) {
            MjClient.unblock();

            if (rtn.code == 0) {
                MjClient.showToast("已发送邀请");
            } else {
                FriendCard_Common.serverFailToast(rtn)
            }
        });
    },
    reqInviteGameLM:function(userId){
        MjClient.block();
        var reqData = {};
        reqData.leagueId = this.clubId;
        reqData.roomNum = this.roomId;
        if(userId){
            reqData.userId = userId;
        }
        if(this.clubInfoTable){
            reqData.pmruleId = this.clubInfoTable.ruleId;
        }
        cc.log("leagueInviteGame reqData",JSON.stringify(reqData))
        MjClient.gamenet.request("pkplayer.handler.leagueInviteGame", reqData, function(rtn) {
            MjClient.unblock();

            if (rtn.code == 0) {
                MjClient.showToast("已发送邀请");
            } else {
                FriendCard_Common.serverFailToast(rtn)
            }
        });
    },
    timeing: function(item, time) {
        var that = this;
        time = time - time % 1;
        var timeingLabel = new cc.LabelTTF("" + time, MjClient.fzcyfont, 30);
        timeingLabel.setColor(cc.color(40, 40, 40));
        if(item.yaoyingBtn){
            timeingLabel.setPosition(item.yaoyingBtn.getPosition());
            item.yaoyingBtn.setVisible(false);

        }else{
            //timeingLabel.setAnchorPoint(cc.p(0.5,0.5));
            timeingLabel.setPosition(that.btnYaoQingAll.getPosition());
            if (FriendCard_Common.getSkinType() != 0) {}
            else timeingLabel.setPositionY(that.btnYaoQingAll.getPositionY() + that.btnYaoQingAll.height)
            that.btnYaoQingAll.setVisible(false);

            var children = that.listView.getChildren();
            for (var i = 0; i <children.length ; i++) {
                if(children[i].timeingLabel){
                    children[i].timeingLabel.removeFromParent();
                    children[i].timeingLabel = null;
                }

                var timeingLabelList = new cc.LabelTTF("" + time, MjClient.fzcyfont, 30);
                timeingLabelList.setColor(cc.color(40, 40, 40));
                timeingLabelList.setPosition( children[i].yaoyingBtn.getPosition());
                children[i].yaoyingBtn.setVisible(false);
                children[i].addChild(timeingLabelList);
                children[i].timeingLabel = timeingLabelList;
                children[i].timeingLabel.setString("" + time);
            }

        }
        item.addChild(timeingLabel);
        item.timeingLabel = timeingLabel;
        timeingLabel.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1), cc.callFunc(function() {
            if (time == 0) {
                timeingLabel.removeFromParent();
                item.timeingLabel = null
                if(item.yaoyingBtn){
                    item.yaoyingBtn.setVisible(true);
                }else{
                    var children = that.listView.getChildren();
                    for (var i = 0; i <children.length ; i++) {
                        if(children[i].timeingLabel){
                            children[i].timeingLabel.removeFromParent();
                            children[i].timeingLabel = null;
                        }
                        children[i].yaoyingBtn.setVisible(true);
                    }
                    that.btnYaoQingAll.setVisible(true);
                }
            } else {
                time--;
                timeingLabel.setString("" + time);
                if(!item.yaoyingBtn){
                    var children = that.listView.getChildren();
                    for (var i = 0; i <children.length ; i++) {
                        if(!children[i].timeingLabel){
                            var timeingLabelList = new cc.LabelTTF("" + time, MjClient.fzcyfont, 30);
                            timeingLabelList.setColor(cc.color(40, 40, 40));
                            timeingLabelList.setPosition( children[i].yaoyingBtn.getPosition());
                            children[i].yaoyingBtn.setVisible(false);
                            children[i].addChild(timeingLabelList);
                            children[i].timeingLabel = timeingLabelList;
                        }
                        children[i].timeingLabel.setString("" + time);
                    }
                }
            }
        }))));
    },
    createItem: function(item, index) {
        var itemData = this.data[index];

        // 头像
        var head = item.getChildByName("Image_head");
        head.isMask = true;
        COMMON_UI.refreshHead(this, itemData.headimgurl, head);

        // 名称
        var name = item.getChildByName("Text_name");
        name.ignoreContentAdaptWithSize(true);
        name.setString(getNewName(unescape(itemData.nickname)));
        name.setFontName("Arial");
        name.setFontSize(name.getFontSize());

        // 玩家ID
        var id = item.getChildByName("Text_ID");
        id.ignoreContentAdaptWithSize(true);
        var idStr = "" + itemData.userId;
        if (idStr.length > 4)
            idStr = idStr.slice(0, 2) + "******".slice(0, idStr.length - 4) + idStr.slice(-2);
        id.setString(idStr);

        var yaoyingBtn = item.getChildByName("Button_yaoying");
        var that = this;
        yaoyingBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                
                that.reqInviteGame(itemData.userId);
                friendCard_yaoqingMember_timeList[that.clubId + "_" + itemData.userId] = new Date().getTime();
                that.timeing(item, 60);
            }
        });
        item.yaoyingBtn = yaoyingBtn;

        var now = new Date().getTime();
        var last = friendCard_yaoqingMember_timeList[that.clubId + "_" + itemData.userId];
        if (now - last < 1000 * 60)
            that.timeing(item, 60 - (now - last) / 1000);

        return item;
    },
    upOffset: function() {
        if (this.listView.getItems().length <= 0 || this.listView.getItem(0).dataIndex == 0)
            return;

        var listView = this.listView;
        var cell = this.cell;
        cell.visible = true;

        var srcItemNum = listView.getItems().length;
        var srcStartIndex = this.startIndex;
        for (var i = 0; i < srcItemNum - 60; i++) {
            listView.removeLastItem();
        }

        srcItemNum = listView.getItems().length;
        for (var i = srcStartIndex - 1; i >= 0 && srcStartIndex + srcItemNum - i <= 120; i--) {
            var item = cell.clone();
            listView.insertCustomItem(item, 0);
            this.createItem(item, i);
            item.dataIndex = i;
            this.startIndex--;
        }

        this.refreshMoreTip();
        listView.forceDoLayout();
        listView.jumpToItem(listView.getItems().length - srcItemNum, cc.p(0.5, 1.0), cc.p(0.5, 1.0));
        listView.scrollToItem(listView.getItems().length - srcItemNum - 1, cc.p(0.5, 1.0), cc.p(0.5, 1.0));

        cell.visible = false;
    },
    bottomOffset: function() {
        var listView = this.listView;
        var cell = this.cell;
        cell.visible = true;

        var srcItemNum = listView.getItems().length;
        var srcStartIndex = this.startIndex;

        for (var i = 0; i < srcItemNum - 60; i++) {
            listView.removeItem(0);
            this.startIndex++;
        }

        srcItemNum = listView.getItems().length;
        for (var i = this.startIndex + srcItemNum; i < this.data.length && i - this.startIndex <= 120; i++) {
            var item = cell.clone();
            listView.pushBackCustomItem(item);
            this.createItem(item, i);
            item.dataIndex = i;
        }

        this.refreshMoreTip();
        listView.forceDoLayout();
        listView.jumpToItem(srcItemNum - 1, cc.p(0.5, 0.0), cc.p(0.5, 0.0));
        listView.scrollToItem(srcItemNum, cc.p(0.5, 0.0), cc.p(0.5, 0.0));

        cell.visible = false;
    },
    refreshMoreTip: function() {
        var listView = this.listView;
        var items = listView.getItems();
        for (var i = 0; i < items.length; i++) {
            if (items[i].getChildByName("moreTextTip"))
                items[i].removeChildByName("moreTextTip");
        }

        if (this.haveMore && items.length > 0) {
            var item = items[items.length - 1];
            var moreTextTip = new cc.LabelTTF("上拉显示更多成员", MjClient.fzcyfont, 26);
            moreTextTip.setColor(cc.color(0x79, 0x34, 0x12));
            moreTextTip.setName("moreTextTip");
            moreTextTip.setPosition(item.width / 2, -30);
            item.addChild(moreTextTip);
        }
    },
    refreshList: function() {
        if (!cc.sys.isObjectValid(this.cell))
            return;
        this.nullTip.visible = this.data.length <= 0;
        this.btnYaoQingAll.visible = this.data.length > 0;

        var listView = this.listView;
        var cell = this.cell;
        cell.visible = true;

        listView.removeAllItems();
        this.startIndex = 0;

        var that = this;
        for (var i = this.startIndex; i < this.data.length && i < this.startIndex + 120; i++) {
            var item = cell.clone();
            listView.pushBackCustomItem(item);
            this.createItem(item, i);
            item.dataIndex = i;
        }

        this.refreshMoreTip();
        listView.forceDoLayout();

        var listViewState = 0;
        listView.addCCSEventListener(function(sender, type) {
            // **新老引擎bug**
            var EVENT_AUTOSCROLL_ENDED = ccui.ScrollView.EVENT_AUTOSCROLL_ENDED;
            if (cc.sys.OS_WINDOWS == cc.sys.os || cc.ENGINE_VERSION.indexOf("3.16") >= 0)
                EVENT_AUTOSCROLL_ENDED = 12;

            switch (type) {
                case ccui.ScrollView.EVENT_SCROLL_TO_TOP:
                    if (that.listViewState == 0)
                        listViewState = -1;
                    else
                        that.listViewState = 0;
                    break;
                case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                    listViewState = 1;
                    break;
                case EVENT_AUTOSCROLL_ENDED:
                    if (listViewState == -1 && that.listView.getCurSelectedIndex() < 6) {
                        //MjClient.showToast("to top!!");
                        that.upOffset();
                    } else if (listViewState == 1) {
                        //MjClient.showToast("to bottom!!");
                        var items = that.listView.getItems()
                        if (items.length != 0 && items[items.length - 1].dataIndex < that.data.length - 1) {
                            that.bottomOffset();
                        } 
                        // else if (!cc.sys.isObjectValid(MjClient.blockui)) {
                        //     that.alreadyCount = that.data.length;
                        //     that.reqPlayerList();
                        // }
                    } else {
                        //MjClient.showToast("to null!!");
                    }
                    listViewState = 0;
            }
        });
        if(friendCard_yaoqingMember_all[this.clubId]){
            var last = friendCard_yaoqingMember_all[this.clubId];
            var now = new Date().getTime();
            if (now - last < 1000 * 60)
                this.timeing(this.btnYaoQingAll.getParent(), 60 - (now - last) / 1000);
        }
        cell.visible = false;
    },
    onExit: function() {
        this._super();
        MjClient.friendCardYaoqingMember_ui = null;
    },
});

var friendCard_yaoqingIntoGameList = [];
var friendCard_yaoqingIntoGame = function(data) {
    if (!data)
        return;

    if (MjClient.playui && !MjClient.endallui && MjClient.rePlayVideo == -1) // 在正常游戏中忽略邀请
        return;

    if (MjClient.GoldHallLayer && cc.sys.isObjectValid(MjClient.GoldHallLayer)) //金币场内忽略邀请
        return;

    var list = friendCard_yaoqingIntoGameList;
    list.push(data);

    if (MjClient.Scene.getActionByTag(213))
        return;

    var action = cc.repeatForever(cc.sequence(cc.delayTime(0.2), cc.callFunc(function() {
        if (MjClient.playui && !MjClient.endallui && MjClient.rePlayVideo == -1)
            friendCard_yaoqingIntoGameCancel(-1);
        else if (MjClient.playui)
            return;

        if (list.length > 0 && !MjClient.friendCardYaoqinIntoGameDialog && !MjClient.Scene.getChildByName("NewPopMsgView"))
            MjClient.Scene.addChild(new FriendCard_yaoqingIntoGameDialog(list.shift()));

        if (list.length <= 0)
            MjClient.Scene.stopActionByTag(213);
    })));

    action.setTag(213);
    MjClient.Scene.runAction(action);
}

var friendCard_yaoqingIntoGameCancel = function(clubId) {
    if (clubId == -1)
        friendCard_yaoqingIntoGameList.length = 0;

    var list = friendCard_yaoqingIntoGameList;
    for (var i = list.length - 1; i >= 0; i--) {
        if (list[i].clubId == clubId || list[i].leagueId == clubId)
            list.splice(i, 1);
    }
}

// 亲友圈-被亲友圈成员邀请一起对局
var FriendCard_yaoqingIntoGameDialog = cc.Layer.extend({
    jsBind: {
        _run: function() {
            this.setAnchorPoint(cc.p(0.5, 0.5));
            setWgtLayout(this, [1, 1], [0.5, 0.5], [0, 0], true);
        },
        Image_di:{
            run: function() {
                setWgtLayout(this, [1, 1], [0.5, 0.5], [0, 0], true);
            },
            _click: function(btn) {
                var that = MjClient.friendCardYaoqinIntoGameDialog;
                that.removeFromParent();
            }
        },
        Image_bg: {
            Button_close: {
                _click: function(btn) {
                    var that = MjClient.friendCardYaoqinIntoGameDialog;
                    that.requestInviteSet(true, that.noReceiveCheckBox.isSelected());
                    that.removeFromParent();
                }
            },
            Button_cancel: {
                _click: function(btn) {
                    var that = MjClient.friendCardYaoqinIntoGameDialog;
                    that.requestInviteSet(true, that.noReceiveCheckBox.isSelected());
                    that.removeFromParent();
                },
            },
            Button_sure: {
                _click: function(btn) {
                    var that = MjClient.friendCardYaoqinIntoGameDialog;
                    cc.log("进入游戏:roomNum=" + that.data.roomNum);
                    var params = {};
                    if(that.data.leagueId){
                        params.leagueId = that.data.leagueId
                    }else if(that.data.clubId){
                        params.clubId = that.data.clubId
                    }
                    MjClient.joinGame(that.data.roomNum, null, true,that.data.gameType,false,params);
                    if (that.noReceiveCheckBox.isSelected())
                        that.requestInviteSet(false, true);
                    that.removeFromParent();
                },
            },
            CheckBox_noReceive: {
                _run: function() {
                    MjClient.friendCardYaoqinIntoGameDialog.noReceiveCheckBox = this;
                    this.getChildByName("text").ignoreContentAdaptWithSize(true);
                },
                text: {
                    _click: function(text) {
                        var checkBox = MjClient.friendCardYaoqinIntoGameDialog.noReceiveCheckBox;
                        checkBox.setSelected(!checkBox.isSelected());
                        if(checkBox.isSelected())
                        {
                           MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Paiyouyaoqing_Buzaijieshougaiqinyouquanyaoqing_Xuanzhong", {uid:SelfUid()}); 
                        }
                    }
                }
            }
        },
    },
    requestInviteSet: function(isCancel, noReceive) {
        if(this.data.leagueId){
            this.requestInviteSetLM(isCancel, noReceive)
            return;
        }
        var that = this;
        MjClient.block();
        var sendData = {};
        if (isCancel)
            sendData.inviterId = this.data.inviterId;
        if (noReceive) {
            sendData.clubId = this.data.clubId;
            sendData.accept = 0;
            friendCard_yaoqingIntoGameCancel(sendData.clubId);
        }
        MjClient.gamenet.request("pkplayer.handler.clubInviteSet", sendData, function(rtn) {
            MjClient.unblock();
            if (rtn.code != 0) {
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },
    requestInviteSetLM:function(isCancel, noReceive) {
        if(!this.data.leagueId){
            return;
        }
        var that = this;
        MjClient.block();
        var sendData = {};
        if (isCancel)
            sendData.inviterId = this.data.inviterId;
        if (noReceive) {
            sendData.leagueId = this.data.leagueId;
            sendData.accept = 0;
            friendCard_yaoqingIntoGameCancel(sendData.leagueId);
        }
        MjClient.gamenet.request("pkplayer.handler.leagueInviteSet", sendData, function(rtn) {
            MjClient.unblock();
            if (rtn.code != 0) {
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },
    ctor: function(data) {
        this._super();
        this.data = data;

        if(!this.data.clubTitle){
            this.data.clubTitle = this.data.leagueTitle
        }
        MjClient.friendCardYaoqinIntoGameDialog = this;

        var node = ccs.load("friendcard_yaoyingIntoGameDialog.json").node;
        BindUiAndLogic(node, this.jsBind);
        this.addChild(node);


        var Image_bg = node.getChildByName("Image_bg");
        Image_bg.getChildByName("Text_info").setString(unescape(data.clubTitle) + "亲友圈" + unescape(data.inviterName) + "邀请您玩一局");
        Image_bg.getChildByName("Text_rule").setString("玩法：" + data.roomInfo);

        if (MjClient.webViewLayer != null && cc.sys.isObjectValid(MjClient.webViewLayer)) {
            MjClient.webViewLayer.close();
        }
    },
    onExit: function() {
        this._super();
        MjClient.friendCardYaoqinIntoGameDialog = null;
    },
});