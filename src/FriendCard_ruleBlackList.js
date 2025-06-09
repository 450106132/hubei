
// 玩法禁玩名单
var Friendcard_ruleBlackList = cc.Layer.extend({
    ctor:function (data) {
        this._super();
        this._data = data;
        var node = ccs.load("friendcard_ruleBlackList.json").node;
        this.addChild(node);
        this.node = node;
        COMMON_UI.setNodeTextAdapterSize(node);
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Panel"), [1, 1], [0.5, 0.5], [0, 0]);
        
        popupAnm(node.getChildByName("Panel"));
        this.initRuleBlackListLayer()
        this.rquestRuleBlackList()
    },
    //请求列表
    rquestRuleBlackList:function(){

        var that = this;
        MjClient.block();
        var sendInfo = {
            pmruleId:this._data.pmruleId,
        }
        if(FriendCard_Common.isLMClub()){
            sendInfo.leagueId = this._data.clubId;
        }else{
            sendInfo.clubId = this._data.clubId;
        }
        var url = FriendCard_Common.isLMClub() ? "pkplayer.handler.listLeagueRulesForbid" : "pkplayer.handler.listClubRulesForbid"
        cc.log("rquestRuleBlackList sendInfo",JSON.stringify(sendInfo))
        MjClient.gamenet.request(url, sendInfo,  function(rtn)
        {   
            MjClient.unblock();
            if(rtn.code == 0){
                if(!rtn.data.club){
                    rtn.data.club = [];
                }
                if(!rtn.data.group){
                    rtn.data.group = [];
                }
                if(!rtn.data.user){
                    rtn.data.user = [];
                }
                FriendCard_Common.runAll(rtn.data.club,"dataType",3);
                FriendCard_Common.runAll(rtn.data.group,"dataType",2);
                FriendCard_Common.runAll(rtn.data.user,"dataType",1);
                that._listView._data = [].concat(rtn.data.club).concat(rtn.data.group).concat(rtn.data.user);
                that.refreshRuleBlackList();
            }
            else{
                FriendCard_Common.serverFailToast(rtn);
            }  
        });
    },
    //刷新列表
    refreshRuleBlackList:function()
    {
        if(!cc.sys.isObjectValid(this.item)) return;

        var listView = this._listView;
        var cell = this.item;
        cell.visible = false;
        listView.removeAllItems();
        for (var i = 0; i < this._listView._data.length ; i ++){
            var item = cell.clone();
            listView.pushBackCustomItem(item);
            this.createItem(item, i);
            item.visible = true;
            item.dataIndex = i;
        }
        if(this._listView._data.length == 0)
            this.text_nullTip.visible = true;
        else
            this.text_nullTip.visible = false;
    },
    createItem:function(item,index)
    {
        var that = this;
        var itemData = this._listView._data[index];
        //createTime
        var image_head = item.getChildByName("Image_head");
        image_head.isMask = true;
        COMMON_UI.refreshHead(this,itemData.headurl,image_head)
        
        var text_nickname = item.getChildByName("Text_nickname");
        text_nickname.setString(""+getNewName(unescape(itemData.nickname)))

        var text_id = item.getChildByName("Text_id");
        if(itemData.dataType == 2){
            if(itemData.group){
                text_id.setString(itemData.group+"组");
            }else{
                text_id.setString("未分组");
            }
         }else{
            text_id.setString("ID:"+itemData.userId);
         }

        var text_people = item.getChildByName("Text_people");
        text_people.setString((itemData.count ? itemData.count : 1)+"人")

        var text_opt_role = item.getChildByName("Text_opt_role");
        text_opt_role.setString(""+FriendCard_Common.getRoleTextByRoleId(itemData.optRoleId));

        var text_opt_nickname = item.getChildByName("Text_opt_nickname");
        text_opt_nickname.setString(""+getNewName(unescape(itemData.optNickname)))
        //删除
        item.getChildByName("Button_delete").addTouchEventListener(function(sender, type){
            if (type == 2){
                var sendInfo = {
                    objType:itemData.dataType,
                    objId:[(itemData.dataType == 2 ? itemData.group : itemData.userId)],
                    pmruleId:this._data.pmruleId,
                    opt:"del"
                }
                if(FriendCard_Common.isLMClub()){
                    sendInfo.leagueId = this._data.clubId;
                }else{
                    sendInfo.clubId = this._data.clubId;
                }
                cc.log("RulesForbid sendInfo",JSON.stringify(sendInfo));
                var url = FriendCard_Common.isLMClub() ? "pkplayer.handler.setLeagueRulesForbid" : "pkplayer.handler.setClubRulesForbid"
                MjClient.gamenet.request(url, sendInfo,  function(rtn)
                {
                    MjClient.unblock();
                    if(rtn.code == 0){
                        that._listView._data.splice(index, 1);
                        that.refreshRuleBlackList();
                        MjClient.showToast("删除屏蔽名单成功！");
                    }
                    else{
                        FriendCard_Common.serverFailToast(rtn);
                    }
                });
            }
        }, this);
        
    },
    initRuleBlackListLayer:function()
    {
        var panel = this.node.getChildByName("Panel");
        this._listView = panel.getChildByName("list");
        this.item = panel.getChildByName("item");
        this.text_nullTip = panel.getChildByName("Text_nullTip");
        this.text_nullTip.visible = false;
        this.item.visible = false;

        var text_desc = panel.getChildByName("Text_desc");
        text_desc.setString("玩法" + (this._data.ruleData._localIndex + 1) + ":"+unescape(this._data.ruleData.ruleName)+"的屏蔽名单")
        
        panel.getChildByName("Button_add").addTouchEventListener(function(sender, type){
        if (type == 2)
            {
                this.addChild(new Friendcard_ruleBlackListAdd(this._data));
            }
        }, this);

        var _close = panel.getChildByName("Button_close")
        _close.addTouchEventListener(function(sender, type){
        if (type == 2)
            {
                this.removeFromParent();
            }
        }, this);
        closeBtnAddLight(_close);

        UIEventBind(null, this, "clubRuleBlackListAdd", function(rtn) {
            this.rquestRuleBlackList();
        }, this);
    },
    onExit: function () {
        this._super();
    },
});

// 添加玩法禁玩名单
var Friendcard_ruleBlackListAdd = cc.Layer.extend({
    ctor:function (data) {
        this._super();
        this._data = data;
        var node = ccs.load("friendcard_ruleBlackListAdd.json").node;
        this.addChild(node);
        this.node = node;
        COMMON_UI.setNodeTextAdapterSize(node);
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Panel"), [1,1], [0.5, 0.5], [0, 0]);

        popupAnm(node.getChildByName("Panel"));
        this.initRuleBlackListAddLayer();  
        this.showPanleView(this.panelKey.addPlayer);
        var panel = this.node.getChildByName("Panel");
        if (FriendCard_Common.isGroupLeader() !== false) {
            panel.getChildByName("Button_add_player").setVisible(false);
            panel.getChildByName("Button_add_club").setVisible(false);
            panel.getChildByName("Button_add_group").setVisible(false);
        }
        if(!FriendCard_Common.isLMClub()){
            panel.getChildByName("Button_add_club").setVisible(false);
        }else{
            if(!FriendCard_Common.isSupperManger()){
                panel.getChildByName("Button_add_club").setVisible(false);
            }
        }
    },
    initRuleBlackListAddLayer:function()
    {
        var that = this;
        var panel = this.node.getChildByName("Panel");
        //修改EditBox配置
        var setEditBoxConfig = function(_parent,_child,str,index) {
            _child.setFontColor(cc.color(0x40, 0x40, 0x40));
            if(index != -1)
            {
                _child.setMaxLength(8);
                _child.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            }
            else
            {
                _child.setMaxLength(20);
                _child.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
            }
            _child.setFontSize(34);
            _child.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            _child.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            _child.setPlaceHolder(str);
            _child.setFontName("fonts/lanting.TTF");
            _child.setPlaceholderFontSize(34);
            _child.setPosition(_parent.getContentSize().width / 2, _parent.getContentSize().height / 2);
            _parent.addChild(_child);
            
        }.bind(this);

        var img_userId = panel.getChildByName("img_userId");
        this.edtUserId = new cc.EditBox(img_userId.getContentSize(), new cc.Scale9Sprite("friendCards/common/img_dikuang.png"));
        setEditBoxConfig(img_userId,this.edtUserId,"请输入玩家ID",0);

        img_userId.getChildByName("btn_inquire").addTouchEventListener(function(sender, type){
            if (type == 2){
                var idStr = this.edtUserId.getString();
                var id = Number(idStr);
                if (!id || id < 1000){
                    MjClient.showToast("请输入正确的玩家id！");
                    return;
                }
                MjClient.block();
                if(FriendCard_Common.isLMClub()){
                    var sendInfo = {
                        leagueId:this._data.clubId,
                        type:4,
                        userId:id,
                    }
                    cc.log("leaguePlayerList sendInfo",JSON.stringify(sendInfo))
                    MjClient.gamenet.request("pkplayer.handler.leaguePlayerList", sendInfo,  function(rtn)
                    {
                        MjClient.unblock();
                        if(rtn.code == 0){
                            if(rtn.data && rtn.data.list && rtn.data.list.length == 1){
                                that.setplayerInfo(rtn.data.list[0])
                            }else{
                                MjClient.showToast("未找到该用户")
                            }
                        }
                        else{
                            FriendCard_Common.serverFailToast(rtn);
                        }
                    });
                }else{
                    var sendInfo = {
                        clubId:this._data.clubId,
                        userId:id,
                    }
                    cc.log("clubPlayerList sendInfo",JSON.stringify(sendInfo))
                    MjClient.gamenet.request("pkplayer.handler.clubPlayerList", sendInfo,  function(rtn)
                    {
                        MjClient.unblock();
                        if(rtn.code == 0){
                            if(rtn.data && rtn.data.length == 1){
                                that.setplayerInfo(rtn.data[0])
                            }else{
                                MjClient.showToast("未找到该用户")
                            }
                        }
                        else{
                            FriendCard_Common.serverFailToast(rtn);
                        }
                    });
                }
            }
        }, this);

        //玩家信息
        this.playerHeadNode = panel.getChildByName("playerHead");
        this.playerHeadNode.canVisible = function(){
            return this._data ? true : false;
        }
        this.playerHeadNode.visible = false;

        this._panelView = {};
        this._panelView[this.panelKey.addPlayer] = [];
        this._panelView[this.panelKey.addPlayer].push(img_userId);
        this._panelView[this.panelKey.addPlayer].push(this.playerHeadNode);


        var listView = panel.getChildByName("ListView");
        this._clubListView = listView;
        listView._cell = panel.getChildByName("Cell");
        listView._cell.visible = false;
        this._panelView[this.panelKey.addClub] = [];
        this._panelView[this.panelKey.addClub].push(listView);


        this._groupListView = this._clubListView.clone();
        this._clubListView.getParent().addChild(this._groupListView);
        this._groupListView._cell = panel.getChildByName("Cell");
        this._groupListView._cell.visible = false;
        this._panelView[this.panelKey.addGroup] = [];
        this._panelView[this.panelKey.addGroup].push(this._groupListView);


        var btnAddPlayer = panel.getChildByName("Button_add_player");
        btnAddPlayer._panelKey = this.panelKey.addPlayer;
        
        var btnAddClub = panel.getChildByName("Button_add_club");
        btnAddClub._panelKey = this.panelKey.addClub;

        var btnAddGroup = panel.getChildByName("Button_add_group");
        btnAddGroup._panelKey = this.panelKey.addGroup;

        this._tabBtns = [btnAddPlayer,btnAddClub,btnAddGroup];
       
        btnAddPlayer.addTouchEventListener(function(sender, type){
            if (type == 2){
                this.showPanleView(sender._panelKey);
            }
        }, this);
        btnAddClub.addTouchEventListener(function(sender, type){
            if (type == 2){
                this.showPanleView(sender._panelKey);
            }
        }, this);

        btnAddGroup.addTouchEventListener(function(sender, type){
            if (type == 2){
                this.showPanleView(sender._panelKey);
            }
        }, this);

        //搜索
        var img_search = panel.getChildByName("img_search");
        this._img_search = img_search;
        if (img_search) {  
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
                       that.searchUserId = parseInt(userId);
                       that.btn_search.visible = false;
                       that.btn_clear.visible = true;
                       //联盟列表搜索，通过leaguePlayerList 搜索用户，来筛选联盟。
                       if(that._showingPosition == that.panelKey.addClub){
                            if (that._clubListView._data) {
                                var cell = that._clubListView._cell;
                                cell.visible = false;
                                that._clubListView.removeAllItems();
                                for (var i = 0; i < that._clubListView._data.length ; i ++){
                                    var itemData = that._clubListView._data[i];
                                    if (itemData.userId == that.searchUserId || itemData.clubId == that.searchUserId) {                                          
                                        var item = cell.clone();
                                        that._clubListView.pushBackCustomItem(item);

                                        var image_head = item.getChildByName("Image_head");
                                        image_head.isMask = true;
                                        COMMON_UI.refreshHead(that,itemData.clubHeadUrl,image_head);
                                        var text_nickname = item.getChildByName("Text_nickname");
                                        text_nickname.setString(""+getNewName(unescape(itemData.clubName)))

                                        var text_id = item.getChildByName("Text_id");
                                        text_id.setString("ID:"+itemData.clubId);

                                        var text_people = item.getChildByName("Text_people");
                                        text_people.setString(itemData.count+"人")

                                        item.visible = true;
                                        item.dataIndex = i;
                                    }
                                }
                            }else{
                                that._clubListView.removeAllItems();
                            }                      

                        }
                        else{
                            that._hasInitGroupListView = false;
                            that.initGroupListView();
                        }
                       
                   }
                }
            });
            this.btn_clear.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    userIdEditBox.setString("");
                    that.searchUserId = 0;
                    that.btn_search.visible = true;
                    that.btn_clear.visible = false;
                    if(that._showingPosition == that.panelKey.addClub){
                        that._hasInitClubListView = false;
                        that.initClubListView();
                    }else if(that._showingPosition == that.panelKey.addGroup){
                        that._hasInitGroupListView = false;
                        that.initGroupListView();
                    }
                    
                }
            });
        }

        //确认按钮
        var btn_OK = panel.getChildByName("btn_OK");
        btn_OK.addTouchEventListener(function(sender, type){
            if (type == 2){
                
                if(this._showingPosition == this.panelKey.addPlayer){
                    if(!this.playerHeadNode._data){
                        return;
                    }
                    var sendInfo = {
                        objType:1,
                        objId:[this.playerHeadNode._data.userId],
                        pmruleId:this._data.pmruleId,
                        opt:"add"
                    }
                    if(FriendCard_Common.isLMClub()){
                        sendInfo.leagueId = this._data.clubId;
                    }else{
                        sendInfo.clubId = this._data.clubId;
                    }
                    MjClient.block();
                    var url = FriendCard_Common.isLMClub() ? "pkplayer.handler.setLeagueRulesForbid" : "pkplayer.handler.setClubRulesForbid"
                    MjClient.gamenet.request(url, sendInfo,  function(rtn)
                    {
                        MjClient.unblock();
                        if(rtn.code == 0){
                            that.removeFromParent();
                            MjClient.showToast("添加屏蔽名单成功！");
                            postEvent("clubRuleBlackListAdd");
                        }
                        else{
                            FriendCard_Common.serverFailToast(rtn);
                        }
                    });
                }else{
                    var curListView = this._showingPosition == this.panelKey.addClub ? this._clubListView : this._groupListView;
                    var children = curListView.getChildren();
                    var userArr = [];
                    for (var i = 0; i <children.length ; i++){
                        if(children[i].getChildByName("checkBox").isSelected()){
                            if(this._showingPosition == this.panelKey.addClub){
                                userArr.push(curListView._data[children[i].dataIndex].clubId);
                            }else{
                                userArr.push(curListView._data[children[i].dataIndex].group);
                            }
                        }
                    }
                    if (userArr.length == 0){
                        that.removeFromParent();
                        return;
                    }
                    var sendInfo = {
                        objType:(this._showingPosition == this.panelKey.addClub)?3:2,
                        objId:userArr,
                        pmruleId:this._data.pmruleId,
                        opt:"add"
                    }
                    if(FriendCard_Common.isLMClub()){
                        sendInfo.leagueId = this._data.clubId;
                    }else{
                        sendInfo.clubId = this._data.clubId;
                    }
                    cc.log("RulesForbid sendInfo",JSON.stringify(sendInfo));
                    MjClient.block();
                    var url = FriendCard_Common.isLMClub() ? "pkplayer.handler.setLeagueRulesForbid" : "pkplayer.handler.setClubRulesForbid"
                    MjClient.gamenet.request(url, sendInfo,  function(rtn)
                    {
                        MjClient.unblock();
                        if(rtn.code == 0){
                            that.removeFromParent();
                            MjClient.showToast("添加屏蔽名单成功！");
                            postEvent("clubRuleBlackListAdd");
                        }
                        else{
                            FriendCard_Common.serverFailToast(rtn);
                        }
                    });
                }

                
            }
        }, this);

        //关闭按钮
        var close = panel.getChildByName("btn_close");
        close.addTouchEventListener(function(sender, type){
        if (type == 2)
            {
                that.removeFromParent();
            }
        }, this);
        closeBtnAddLight(close);
    },
    panelKey:{
        addPlayer:0,
        addClub:1,
        addGroup:2,
    },
    showPanleView:function(postion){
        this._showingPosition = postion;
        for(key in this.panelKey){
            cc.log("showPanleView key",key,"this.panelKey.key",this.panelKey[key])
            var panelview = this._panelView[this.panelKey[key]];

            for(var i = 0; i < this._tabBtns.length; i++){
                this._tabBtns[i].setEnabled(postion != this._tabBtns[i]._panelKey)
            }
            for(var i = 0 ; i < panelview.length; i++){
                panelview[i].visible = (postion == this.panelKey[key])
                if(panelview[i].visible && panelview[i].canVisible){
                    panelview[i].visible = panelview[i].canVisible();
                }
            }
        }
        this._img_search.visible = (postion != this.panelKey.addPlayer)

        if(postion == this.panelKey.addClub){
            this.initClubListView();
        }else if(postion == this.panelKey.addGroup){
            this.initGroupListView();
        }
    },
    initGroupListView:function(){

        var that = this;
        if(this._hasInitGroupListView){
            return;
        }
        this._hasInitGroupListView = true;
        this.refreshGroupListView = function(){
            var cell = this._groupListView._cell;
            cell.visible = false;
            this._groupListView.removeAllItems();
            for (var i = 0; i < this._groupListView._data.length ; i ++){
                var item = cell.clone();

                this._groupListView.pushBackCustomItem(item);
                var itemData = this._groupListView._data[i];

                var image_head = item.getChildByName("Image_head");
                image_head.isMask = true;
                COMMON_UI.refreshHead(this,itemData.headimgurl,image_head);

                var text_nickname = item.getChildByName("Text_nickname");
                text_nickname.setString(""+getPlayerName(unescape(itemData.nickname))+"\n"+"ID:"+itemData.userId);
                if(!itemData.userId){
                    text_nickname.visible = false;
                }else{
                    text_nickname.visible = true;
                }
                var text_id = item.getChildByName("Text_id");
                if(itemData.group){
                    text_id.setString(itemData.group+"组");
                }else{
                    text_id.setString("未分组");
                }

                var text_people = item.getChildByName("Text_people");
                text_people.setString(itemData.groupCount+"人")

                item.visible = true;
                item.dataIndex = i;
            }
        }
        MjClient.block();
      
        var sendInfo = {
            clubId: this._data.clubId, 
            length:10000,
            type:2,
            range:3
        }
        if (this.searchUserId) {
            sendInfo.userId = this.searchUserId;
        }
        if(FriendCard_Common.isLMClub()){
            sendInfo.leagueId = this._data.clubId;
        }
        sendInfo.state = 5;
        sendInfo.pmruleId = this._data.pmruleId;
        cc.log("clubPlayerList sendInfo",JSON.stringify(sendInfo))
        
        var api = FriendCard_Common.isLMClub() ? "pkplayer.handler.leaguePlayerList" : "pkplayer.handler.clubPlayerList"
        MjClient.gamenet.request(api, sendInfo,  function(rtn)
        {
            MjClient.unblock();
            if(!cc.sys.isObjectValid(that)){
                return;
            }
            if(rtn.code == 0){
                that._groupListView._data = rtn.data ? rtn.data : [];
                if (FriendCard_Common.isLMClub()) {
                    that._groupListView._data = rtn.data.list ? rtn.data.list : [];
                }
                that.refreshGroupListView();
            }else{
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },
    //初始化俱乐部或者组列表
    initClubListView:function(){
        var that = this;
        if(this._hasInitClubListView){
            return;
        }
        this._hasInitClubListView = true;
        this.refreshClubListView = function(){
            var cell = this._clubListView._cell;
            cell.visible = false;
            this._clubListView.removeAllItems();
            for (var i = 0; i < this._clubListView._data.length ; i ++){
                var itemData = this._clubListView._data[i];
                
                var item = cell.clone();
                this._clubListView.pushBackCustomItem(item);

                var image_head = item.getChildByName("Image_head");
                image_head.isMask = true;
                COMMON_UI.refreshHead(this,itemData.clubHeadUrl,image_head);
                var text_nickname = item.getChildByName("Text_nickname");
                text_nickname.setString(""+getNewName(unescape(itemData.clubName)))

                var text_id = item.getChildByName("Text_id");
                text_id.setString("ID:"+itemData.clubId);

                var text_people = item.getChildByName("Text_people");
                text_people.setString(itemData.count+"人")

                item.visible = true;
                item.dataIndex = i;
            }
        }
        MjClient.block();
        var sendInfo = {
            leagueId: this._data.clubId,
        }
        if (this.searchUserId) {
            sendInfo.userId = this.searchUserId;
        }
        sendInfo.forbidRuleId = this._data.pmruleId;
        cc.log("leagueList sendInfo",JSON.stringify(sendInfo))
        MjClient.gamenet.request("pkplayer.handler.leagueList", sendInfo,  function(rtn)
        {
            MjClient.unblock();
            if(!cc.sys.isObjectValid(that)){
                return;
            }
            if(rtn.code == 0){
                that._clubListView._data = rtn.data ? rtn.data : [];
                that.refreshClubListView();
            }else{
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },
    setplayerInfo:function(playerData){
        var player  = this.playerHeadNode;
        player.getChildByName("player_name").setString(getNewName(unescape(playerData.nickname)));
        player.getChildByName("player_ID").setString("" + playerData.userId);
        player.getChildByName("text_chair_name").setString("会长："+getNewName(unescape(playerData.chairman)));
        var groupStr = "分组：";
        if(playerData.group){
            groupStr += playerData.group+"组";
            if(playerData.assistantNo){
                groupStr += "（"+playerData.assistantNo+"）"
            }
        }else{
            groupStr += "未分组";
        }
        player.getChildByName("text_group_assistant").setString(groupStr);

        player.isMask = true;
        COMMON_UI.refreshHead(this, playerData.headimgurl, player);
        player.visible = true;
        player._data = playerData;
    },
    onExit: function () {
        this._super();
    },
});