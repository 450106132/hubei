// 比赛场 规则
var FriendCard_Match_ruleLayer = cc.Layer.extend({

    ctor: function(clubData) {
        this._super();
        this.clubData = clubData;
        this.ruleData = null;
        var node = ccs.load("friendCard_Match_ruleLayer.json").node;
        this.addChild(node);
        this.node = node;
        var back = node.getChildByName("back")
        setWgtLayout(node.getChildByName("block"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("back"), [1, 1], [0.5, 0.5], [0, 0]);
        MjClient.FriendCard_Match_ruleLayer = this;

        this.isJurisdiction = false;
        if (FriendCard_Common.getClubisLM()) {
            this.isJurisdiction = FriendCard_Common.isSupperManger();
        } else {
            this.isJurisdiction = FriendCard_Common.isManager();
        }
        this.keyQuickGamesWitch = FriendCard_Common.LocalKey.quickGameSwitch + this.clubData.clubId;
        this._quickStartListLocalSwitch = util.localStorageEncrypt.getStringItem(this.keyQuickGamesWitch,"");
        cc.log("this._quickStartListLocalSwitch",this._quickStartListLocalSwitch)
        if(!this._quickStartListLocalSwitch || this._quickStartListLocalSwitch == ""){
            this._quickStartListLocalSwitch = {};
        }else{
            this._quickStartListLocalSwitch = JSON.parse(this._quickStartListLocalSwitch)
        }
        this.getInviteSet();
        this.initRuleLayer(back);
        popupAnm(back);      



    },
    getInviteSet:function(){
        var that = this;
        if(FriendCard_Common.isLMClub(this.clubData)){
            MjClient.block();
            var sendInfo = {
                leagueId:this.clubData.leagueId,
                userId:MjClient.data.pinfo.uid,
            }
            cc.log("leaguePlayerList",JSON.stringify(sendInfo))
            MjClient.gamenet.request("pkplayer.handler.leaguePlayerList", sendInfo ,  function(rtn)
            {
                MjClient.unblock();
                if (!cc.sys.isObjectValid(that)) {
                    return;
                }
                if(rtn.code == 0){
                    that._acceptInvite = rtn.data.mine.acceptInvite;
                    that.reflashUI(true);
                }
                
            });
        }else{
            MjClient.block();
            var sendInfo = {
                clubId:this.clubData.clubId,
                userId:MjClient.data.pinfo.uid,
            }
            cc.log("clubPlayerList",JSON.stringify(sendInfo))
            MjClient.gamenet.request("pkplayer.handler.clubPlayerList", sendInfo ,  function(rtn)
            {
                MjClient.unblock();
                if (!cc.sys.isObjectValid(that)) {
                    return;
                }
                if(rtn.code == 0){
                    that._acceptInvite = rtn.acceptInvite;
                    that.reflashUI(true);
                }
                
            });
        }
    },
    saveInviteSet:function(){
        var that = this;

        var acceptRange = [];
        for(var key in this._acceptInviteSwitch){
            if(this._acceptInviteSwitch[key] == 1){
                acceptRange.push(parseInt(key));
            }
        }
        if(FriendCard_Common.isLMClub(this.clubData)){
            var sendInfo = {
                leagueId:this.clubData.leagueId,
            }
            if(this._cb_isAcceptAllInvite.isSelected()){
                sendInfo.accept = 1;
            }else if(acceptRange.length == 0){
                sendInfo.accept = 0;
            }else{
                sendInfo.accept = 2;
                sendInfo.acceptRange = acceptRange;
            }
            cc.log("leagueInviteSet",JSON.stringify(sendInfo))
            MjClient.gamenet.request("pkplayer.handler.leagueInviteSet", sendInfo ,  function(rtn)
            {
                if(rtn.code != 0){
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    }
                }
            });
        }else{
            var sendInfo = {
                clubId:this.clubData.clubId,
            }
            if(this._cb_isAcceptAllInvite.isSelected()){
                sendInfo.accept = 1;
            }else if(acceptRange.length == 0){
                sendInfo.accept = 0;
            }else{
                sendInfo.accept = 2;
                sendInfo.acceptRange = acceptRange;
            }
            cc.log("clubInviteSet",JSON.stringify(sendInfo))
            MjClient.gamenet.request("pkplayer.handler.clubInviteSet", sendInfo ,  function(rtn)
            {
                if(rtn.code != 0){
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    }
                }
                
            });
        }
    },
    reflashUI:function(isClear){
        var listView = this._listView;
        var _item = this._item;
        _item.visible = false;
        if(isClear){
            listView.removeAllItems();
        }
        this._acceptInviteSwitch = []
        var allAcceptInvite = true;
        for (var i = 0; i < this._ruleListData.length; i++) {
            var isOpenInvite = this.isOpenInvite(this._ruleListData[i]._index)? 1 : 0;
            this._acceptInviteSwitch[this._ruleListData[i]._index.toString()] = isOpenInvite;
            if(!isOpenInvite){
                allAcceptInvite = false;
            }
            var itemData = this._ruleListData[i];
            itemData._localIndex = i;
            if(listView.getItems()[i]){
                this.createItem(listView.getItems()[i], itemData, i)
            }else{
                var item = _item.clone();
                listView.pushBackCustomItem(this.createItem(item, itemData, i))
            }
        }
        this._cb_isAcceptAllInvite.visible = true;
        this._cb_isAcceptAllInvite.setSelected(allAcceptInvite)
    },
    reSetSelectAllInvite:function(){
        var allAcceptInvite = true;
        for (var i = 0; i < this._ruleListData.length; i++) {
            var isOpenInvite = this._acceptInviteSwitch[this._ruleListData[i]._index.toString()];
            if(!isOpenInvite){
                allAcceptInvite = false;
            }
        }
        this._cb_isAcceptAllInvite.setSelected(allAcceptInvite)
    },
    isOpenInvite:function(index){
        if(typeof(this._acceptInvite) === 'number'){
            return this._acceptInvite === 1;
        }else if(typeof(this._acceptInvite) === 'object'){
            return this._acceptInvite.indexOf(index) > -1;
        }
        return false;
    },
    updateRuleStopRoom:function(index,isStop){
        var that = this;
        if(FriendCard_Common.isLMClub(this.clubData)){
            var sendInfo = {
                leagueId:this.clubData.leagueId,
            }
            sendInfo.ruleId = index;
            sendInfo.action = isStop ? 0 : 1;
            cc.log("leagueRuleSwitch",JSON.stringify(sendInfo))
            MjClient.gamenet.request("pkplayer.handler.leagueRuleSwitch", sendInfo ,  function(rtn)
            {
                if(rtn.code != 0){
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    }
                }
            });
        }else{
            var sendInfo = {
                clubId:this.clubData.clubId,
            }
            sendInfo.ruleId = index;
            sendInfo.action = isStop ? 0 : 1;
            cc.log("clubRuleSwitch",JSON.stringify(sendInfo))
            MjClient.gamenet.request("pkplayer.handler.clubRuleSwitch", sendInfo ,  function(rtn)
            {
                if(rtn.code != 0){
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    }
                }
            });
        }
    },
    createItem: function(item, itemData, i) {
        var text_wanfaNum = item.getChildByName("text_wanfaNum")
        var text_ruleName = item.getChildByName("text_ruleName")
        var text_ruleDesc = item.getChildByName("text_ruleDesc")
        var btn_setRule = item.getChildByName("btn_setRule")

        var guizeStr = stringDBCtoSBC(unescape(itemData.ruleDesc));
        text_ruleDesc.runAction(cc.sequence(cc.DelayTime(0.01), cc.callFunc(function() {
            text_ruleDesc.setString(guizeStr);
            var i = 0;
            while (text_ruleDesc.getVirtualRenderer().getStringNumLines() > 3) {
                i++;
                text_ruleDesc.setString(guizeStr.substring(0, guizeStr.length - i) + "...");
            }
        })));
        text_wanfaNum.setString("玩法" + (i + 1) + ":")
        text_ruleName.setString(unescape(itemData.ruleName));
        btn_setRule.visible = this.isJurisdiction;
        btn_setRule._wanFaIndex = itemData._index;
        var isShowLibertyCreRoom = false;
        if (itemData.customInfo){
            isShowLibertyCreRoom = itemData.customInfo;
        }
        btn_setRule._isShowLibertyCreRoom = isShowLibertyCreRoom
        
        btn_setRule.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                cc.log("createRoom ruleNumer",sender._wanFaIndex)
                postEvent("createRoom", {
                    IsFriendCard: true,
                    ruleNumer: sender._wanFaIndex,
                    ruleName: itemData.ruleName,
                    clubType: this.clubData.type,
                    isShowLibertyCreRoom:sender._isShowLibertyCreRoom,
                    isMatch:true,
                });
            }
        }, this);

        var btn_black_list = item.getChildByName("btn_black_list");
        if(FriendCard_Common.isLMClub()){
            btn_black_list.visible = FriendCard_Common.isSupperManger() || FriendCard_Common.isLMChair() || FriendCard_Common.isGroupLeader() !== false;
        }else{
            btn_black_list.visible = FriendCard_Common.isManager() || FriendCard_Common.isGroupLeader() !== false;
        }
        btn_black_list._ruleData = itemData;
        btn_black_list.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var data = JSON.parse(JSON.stringify(this.clubData));
                data.pmruleId = sender._ruleData._index;
                data.ruleData = sender._ruleData;
                this.addChild(new Friendcard_ruleBlackList(data));
            }
        }, this);

        var cb_isStopRoom = item.getChildByName("cb_isStopRoom");
        if(FriendCard_Common.isLMClub()){
            cb_isStopRoom.visible = FriendCard_Common.isSupperManger();
        }else{
            cb_isStopRoom.visible = FriendCard_Common.isManager();
        }
        cb_isStopRoom.ignoreContentAdaptWithSize(true);
        var isStopRoom = ((!((itemData._index+"") in this.clubData.ruleSwitch)) || this.clubData.ruleSwitch[itemData._index+""]) ? false : true;
        cb_isStopRoom.setSelected(isStopRoom ? true : false);
        cb_isStopRoom._data = itemData;
        cb_isStopRoom.addTouchEventListener(function(sender, type) {
            if (type == 2){
                this.updateRuleStopRoom(sender._data._index,sender.isSelected()?false:true);
            }
        }, this);
        cb_isStopRoom.getChildByName("text").addTouchEventListener(function(sender, type) {
            if (type == 2){
                sender.getParent().setSelected(!sender.getParent().isSelected());
                this.updateRuleStopRoom(sender.getParent()._data._index,sender.getParent().isSelected()?true:false);
            }   
        }, this);

        var cb_isAcceptInvite = item.getChildByName("cb_isAcceptInvite");
        cb_isAcceptInvite.ignoreContentAdaptWithSize(true);
        cb_isAcceptInvite.setSelected(this._acceptInviteSwitch[itemData._index.toString()] == 1);
        cb_isAcceptInvite._data = itemData;
        cb_isAcceptInvite.addTouchEventListener(function(sender, type) {
            if (type == 2){
                this._acceptInviteSwitch[sender._data._index.toString()] = sender.isSelected() ? 0 : 1;
                this.reSetSelectAllInvite();
            }   
        }, this);
        cb_isAcceptInvite.getChildByName("text").addTouchEventListener(function(sender, type) {
            if (type == 2){
                sender.getParent().setSelected(!sender.getParent().isSelected());
                this._acceptInviteSwitch[sender.getParent()._data._index.toString()] = sender.getParent().isSelected() ? 1 : 0;
                this.reSetSelectAllInvite();
            }   
        }, this);

        var cb_isAddQuickStartList = item.getChildByName("cb_isAddQuickStartList");
        cb_isAddQuickStartList.ignoreContentAdaptWithSize(true);
        if(itemData._index.toString() in this._quickStartListLocalSwitch){
            cb_isAddQuickStartList.setSelected(this._quickStartListLocalSwitch[itemData._index.toString()] == 1)
        }else{
            cb_isAddQuickStartList.setSelected(true)
        }
        cb_isAddQuickStartList._data = itemData;
        cb_isAddQuickStartList.addTouchEventListener(function(sender, type) {
            if (type == 2){
                this._quickStartListLocalSwitch[sender._data._index.toString()] = sender.isSelected() ? 0 : 1;
            }   
        }, this);
        cb_isAddQuickStartList.getChildByName("text").addTouchEventListener(function(sender, type) {
            if (type == 2){
                sender.getParent().setSelected(!sender.getParent().isSelected());
                this._quickStartListLocalSwitch[sender.getParent()._data._index.toString()] = sender.getParent().isSelected() ? 1 : 0;
            }   
        }, this);
        item.visible = true;

        return item
    },
    createItem_rule: function(itemData, i) {
        var item = this._cell.clone();
        var text_title = item.getChildByName("text_title");
        text_title.ignoreContentAdaptWithSize(true);
        text_title.setString(unescape(itemData.title));
        var text_time = item.getChildByName("text_time");
        var _days = itemData.day + itemData.extendDay;
        text_time.setString("比赛时长：" + _days + "天")
        var text_score = item.getChildByName("text_score");
        text_score.setString("比赛分数：" + itemData.scoreInitial);
        var text_out = item.getChildByName("text_out");
        text_out.setString("淘汰分数：" + itemData.scoreBottom);
        var text_reward = item.getChildByName("text_reward");

        var str22 = JSON.parse(itemData.notice);
        var str_23 = "比赛公告：" + "" + str22[0] + "\n";
        for(var i = 1;i<str22.length;i++){
            str_23 =str_23 + "                 " +""+ str22[i] + "\n";

        }
        
        text_reward.setString(str_23);
        var text_rewardDesc = item.getChildByName("text_rewardDesc");
        var str = "比赛说明：亲友圈比赛支持不同比赛的参赛者加入同一房间进行游戏，以积分累计形式进行的参赛选手排名的比赛，每人参赛分数为"+
        itemData.scoreInitial +"分，低于" + itemData.scoreBottom + "分则被淘汰；淘汰之后可以申请报名重新参赛；比赛最后两天为决赛轮，决赛轮不允许继续报名参赛；另外比赛设置了参与榜和胜局榜的排名；赶快报名参赛吧。"
        text_rewardDesc.setString(str);


        item.visible = true;

        return item;
    },
    initRuleLayer: function(panel) {
        var self = this;
        var _close = panel.getChildByName("btn_close")
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                util.localStorageEncrypt.setStringItem(this.keyQuickGamesWitch,JSON.stringify(this._quickStartListLocalSwitch));
                this.saveInviteSet();
                this.removeFromParent(true)
            }
        }, this);
        closeBtnAddLight(_close);


        var ruleList = [];
        var ruleNum = -1;
        for (var i = 1; i <= FriendCard_Common.getRuleNumber(); i++) {
            var otherRule = this.clubData["rule" + i];
            if (otherRule && otherRule != "delete") {
                otherRule._index = i;
                ruleList.push(otherRule);
            } else if (ruleNum == -1) {
                ruleNum = i;
            }
        }
        var node_play = panel.getChildByName("node_play");

        var btn_addRule = node_play.getChildByName("btn_addRule");
        btn_addRule.visible = this.isJurisdiction && ruleNum != -1;
        btn_addRule.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                postEvent("createRoom", {
                    IsFriendCard: true,
                    ruleNumer: ruleNum,
                    clubType: this.clubData.type,
                    isMatch:true,
                });

            }
        }, this);

        this._cb_isAcceptAllInvite = node_play.getChildByName("cb_isAcceptAllInvite");
        this._cb_isAcceptAllInvite.ignoreContentAdaptWithSize(true);
        this._cb_isAcceptAllInvite.visible = false;

        this._cb_isAcceptAllInvite.addTouchEventListener(function(sender, type) {
            if (type == 2){
                this._acceptInvite = sender.isSelected() ? 0 : 1;
                sender.runAction(cc.sequence(cc.callFunc(function(){
                    this.reflashUI();
                }.bind(this))))
            }   
        }, this);
        this._cb_isAcceptAllInvite.getChildByName("text").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                sender.getParent().setSelected(!sender.getParent().isSelected());
                this._acceptInvite = sender.getParent().isSelected() ? 1 : 0;
                this.reflashUI();
            }
        }, this);
        
        var node_rule = panel.getChildByName("node_rule");
        this.node_rule = node_rule;
        this._listViewRule = node_rule.getChildByName("listView_rule");
        this._listViewRule.setScrollBarOpacity(0);
        this._cell = node_rule.getChildByName("cell_1");
        this._cell.visible = false;


        var btn_left = node_rule.getChildByName("btn_left");
        var btn_right = node_rule.getChildByName("btn_right");
        this.icon_tip = node_rule.getChildByName("Image_1");
        this.icon_tip.visible = false;


        btn_left.addTouchEventListener(function(sender,type){
            if(type == 2){
                var _indexs = this._listViewRule.getItems().length;
                var _destion = this._listViewRule.getScrolledPercentHorizontal();
                var _du = 100/(_indexs-1);
                var _pos = Math.round(_destion/_du - 1) * (_du);

                var _destion = this._listViewRule.getScrolledPercentHorizontal();
                if(_pos <= 100 && _pos >=0)
                    self._listViewRule.jumpToPercentHorizontal(_pos);
                var _destion = this._listViewRule.getScrolledPercentHorizontal();
                var _num = Math.round(_destion / _du) +1 ;
                for(var i = 1;i<=_indexs;i++){
                    if(i == _num){
                        self["tip_" + i].loadTexture("friendCards_Match/matchRule/icon_s.png");
                    }else{
                        self["tip_" + i].loadTexture("friendCards_Match/matchRule/icon_n.png");
                    }
                }
                if(_pos <= 0){
                    btn_left.visible = false;
                    btn_right.visible = true;
                }else if(_pos >= 100){
                    btn_right.visible = false;
                    btn_left.visible = true;
                }else{
                    btn_left.visible = true;
                    btn_right.visible = true;
                }
                
                
            }
        },this);
        
        btn_right.addTouchEventListener(function(sender,type){
            if(type == 2){

                var _indexs = this._listViewRule.getItems().length;
                var _destion = this._listViewRule.getScrolledPercentHorizontal();

                var _du = 100/(_indexs-1);
                var _pos = Math.round(_destion/_du + 1) * _du;
                
                if(_pos <= 100 && _pos >=0)
                    self._listViewRule.jumpToPercentHorizontal(_pos);
                var _destion = this._listViewRule.getScrolledPercentHorizontal();
                var _num = Math.round(_destion / _du) +1 ;
                for(var i = 1;i<=_indexs;i++){
                    if(i == _num){
                        self["tip_" + i].loadTexture("friendCards_Match/matchRule/icon_s.png");
                    }else{
                        self["tip_" + i].loadTexture("friendCards_Match/matchRule/icon_n.png");
                    }
                }
                if(_pos <= 0){
                    btn_left.visible = false;
                    btn_right.visible = true;
                }else if(_pos >= 100){
                    btn_right.visible = false;
                    btn_left.visible = true;
                }else{
                    btn_left.visible = true;
                    btn_right.visible = true;
                }
            }
        },this);

        btn_right.schedule(function () {
            var _indexs = self._listViewRule.getItems().length;
            var _destion = self._listViewRule.getScrolledPercentHorizontal();
            var _du = 100 / (_indexs - 1);
            var _pos = Number(Math.round(_destion / _du) * _du) ;
            if(_pos <= 100 && _pos >=0)
                self._listViewRule.jumpToPercentHorizontal(_pos);
            var _num = Math.round(_destion / _du) +1 ;
            for(var i = 1;i<=_indexs;i++){
                if(i == _num){
                    self["tip_" + i].loadTexture("friendCards_Match/matchRule/icon_s.png");
                }else{
                    self["tip_" + i].loadTexture("friendCards_Match/matchRule/icon_n.png");
                }
            }
            
            if(_pos <= 0){
                btn_left.visible = false;
                btn_right.visible = true;
            }else if(_pos >= 100){
                btn_right.visible = false;
                btn_left.visible = true;
            }else{
                btn_left.visible = true;
                btn_right.visible = true;
            }
            if(_indexs == 1){
                self["tip_" + 1].loadTexture("friendCards_Match/matchRule/icon_s.png");
                btn_left.visible = false;
                btn_right.visible = false;
            }
        }, 3);




        var btn_titlePlay = panel.getChildByName("btn_titlePlay");
        var btn_titleRule = panel.getChildByName("btn_titleRule");
        btn_titlePlay.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                node_rule.visible = false;
                node_play.visible = true;
                btn_titlePlay.setBright(false);
                btn_titleRule.setBright(true);

                // node_play.loadTextureNormal("");
                // node_rule.loadTextureNormal("");

            }
        }, this);
        
        btn_titleRule.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                node_rule.visible = true;
                node_play.visible = false;
                btn_titlePlay.setBright(true);
                btn_titleRule.setBright(false);
                if(!this.ruleData)
                    this.reqMatchInfo(this.clubData.clubId);
            }
        }, this);
        node_rule.visible = false;
        node_play.visible = true;
        btn_titlePlay.setBright(false);
        btn_titleRule.setBright(true);
        
        var _tip1 = node_play.getChildByName("text_tip");
        var _tip2 = node_rule.getChildByName("text_tip");
        var str = "注意：亲友圈比赛是由亲友圈管理员创建，比赛规则奖项设置与奖品兑换发放均由俱乐部管理员负责。亲友圈比赛一切事宜与游戏官方无关。"
        _tip1.setString(str);
        _tip2.setString(str);

        this._listView = node_play.getChildByName("listView")
        this._item = node_play.getChildByName("item")
        this._item.visible = false;
        this._ruleListData = ruleList;
    },
    reqChange: function(selectNumber) {
        if(FriendCard_Common.getClubisLM()){
            this.reqChangeLM(selectNumber);
            return;
        }
        var that = this;
        var newRule = MjClient.RuleParam["rule" + selectNumber];
        if(this._ruleListData.length == 1 && "delete" == newRule){
            MjClient.showToast("亲友圈至少有一个玩法！");
            return;
        }
        var sendInfo = {};
        sendInfo["rule" + selectNumber] = newRule;
        sendInfo.clubId = this.clubData.clubId;

        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.clubUpdate", sendInfo,
            function(rtn) {
                MjClient.unblock();
                if (rtn.code == 0 || rtn.result == 0) {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    }
                    if (cc.sys.isObjectValid(that)) {
                        that.removeFromParent(true);
                    }
                } else {
                    FriendCard_Common.serverFailToast(rtn)
                }

            }
        );
    },
    reqChangeLM: function(selectNumber) {
        var that = this;
        var newRule = MjClient.RuleParam["rule" + selectNumber];
        if(this._ruleListData.length == 1 && "delete" == newRule){
            MjClient.showToast("亲友圈至少有一个玩法！");
            return;
        }
        var sendInfo = {};
        sendInfo["rule" + selectNumber] = newRule;
        sendInfo.leagueId = this.clubData.clubId;

        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.leagueUpdate", sendInfo,
            function(rtn) {
                MjClient.unblock();
                if (rtn.code == 0 || rtn.result == 0) {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    }
                    if (cc.sys.isObjectValid(that)) {
                        that.removeFromParent(true);
                    }
                } else {
                    FriendCard_Common.serverFailToast(rtn)
                }

            }
        );
    },
    reqMatchInfo: function(clubId) {
        var that = this;
        MjClient.block();
        var api;
        var sendInfo ={};
        if(clubId < 9999){
            api = "pkplayer.handler.leagueMatchInfo";
            sendInfo.leagueId = clubId;
        }else{
            api = "pkplayer.handler.clubMatchInfo";
            sendInfo.clubId = clubId;
        }
        sendInfo.tab = 1; //0:比赛管理 1:参赛列表
        MjClient.gamenet.request(api, sendInfo,
            function(rtn) {
                MjClient.unblock();
                if (rtn.code == 0) {
                    that.ruleData = rtn.data;
                    that.addItem(rtn.data.list);
                    
                } else {
                    MjClient.showToast(rtn.message);
                }

            }
        );
    },
    addItem: function (data) {
        this._listViewRule.removeAllItems();
        // for (var j = 0; j < 2; j++) {
        //     data.push(data[0]);
        // }
        var pos_x = 0;
        for (var i = 0; i < data.length; i++) {
            this._listViewRule.pushBackCustomItem(this.createItem_rule(data[i], i));
            this["tip_" + (i + 1)] = this.icon_tip.clone();
            this["tip_" + (i + 1)].visible= true;
            this.node_rule.addChild(this["tip_" + (i + 1)]);
            this["tip_" + (i + 1)].y = this.icon_tip.y;
            if (i == 0) {
                var num = Math.floor(data.length / 2);
                pos_x = this._listViewRule.x + this._listViewRule.width/2 - 50 * num;
                this["tip_" + (i + 1)].x = pos_x;
            } else {
                pos_x += 50;
                this["tip_" + (i + 1)].x = pos_x;
            }


        }

    },
    onExit: function() {
        this._super();
        MjClient.FriendCard_Match_ruleLayer = null;
    },
});