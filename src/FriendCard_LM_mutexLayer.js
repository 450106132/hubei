/**
 * Created by cyc on 2017/11/21.
 */

// 联盟 - 亲友圈-添加互斥玩家名单
var Friendcard_LM_mutexLayer = cc.Layer.extend({
    ctor:function (clubId) {
        this._super();
        this.clubId = clubId;
        this.data = null;
        var node = ccs.load("friendcard_LM_mutexLayer.json").node;
        this.addChild(node);
        this.node = node;

        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Panel"), [1, 1], [0.5, 0.5], [0, 0]);
        
        popupAnm(node.getChildByName("Panel"));
        this.initMutexLayer()
        this.rquestClubMutexList();
    },
    //请求列表
    rquestClubMutexList:function()
    {
        var that = this;
        MjClient.block();
        var sendInfo = {
            mutexType:this._mutexType,
            leagueId:this.clubId
        }
        if(that._searchUserId){
            sendInfo.userId = that._searchUserId;
        }
        MjClient.gamenet.request("pkplayer.handler.leagueMutexList", sendInfo,  function(rtn)
        {   
            MjClient.unblock();
            if(rtn.code == 0){
                cc.log()
                that.data = rtn.data;
                that.refreshMutexList();
            }else{
                FriendCard_Common.serverFailToast(rtn);
            }  
        });
    },
    //刷新列表
    refreshMutexList:function()
    {
        if(!cc.sys.isObjectValid(this.item)) return;

        var listView = this.list;
        var cell = this.item;
        cell.visible = false;
       
        listView.removeAllItems();
        this.startIndex = 0;
        
        var that = this;

        for (var i = this.startIndex; i < this.data.length ; i ++)
        {
            var item = cell.clone();
            listView.pushBackCustomItem(item);
            this.createItem(item, i);
            item.visible = true;
            item.dataIndex = i;
        }
        if(this.data.length == 0)
            this.text_nullTip.visible = true;
        else
            this.text_nullTip.visible = false;
    },
    createItem:function(item,index)
    {
        var itemData = this.data[index];
        var that = this;
        var UsrtInfo = function(item,userHead,userID,userName)
        {
            item.isMask = true;
            COMMON_UI.refreshHead(that, userHead, item);
            // 名称
            var name = item.getChildByName("player_name");
            name.ignoreContentAdaptWithSize(true);
            name.setString(getNewName(unescape(userName)));
            
            var ID = item.getChildByName("player_ID");
            ID.ignoreContentAdaptWithSize(true);
            ID.setString(userID);
        }  

        //createTime
        var time = item.getChildByName("Text_time");
        time.ignoreContentAdaptWithSize(true);
        var timeStr = MjClient.dateFormat(new Date(parseInt(itemData.createTime)), 'yyyy-MM-dd\nhh:mm:ss');
        time.setString(timeStr);
        //玩家信息
        UsrtInfo(item.getChildByName("player1_hand"),itemData.headimgurl1,itemData.userId1,itemData.nickname1)
        UsrtInfo(item.getChildByName("player2_hand"),itemData.headimgurl2,itemData.userId2,itemData.nickname2)
        //原因
        var yuanyin = item.getChildByName("Text_yuanyin");
        if(itemData.remark && itemData.remark != "undefined")
            yuanyin.setString(getNewName_new(unescape(itemData.remark) + " ",18) )
        else    
            yuanyin.setString("   ")
        //删除
        item.getChildByName("Button_delete").addTouchEventListener(function(sender, type){
            if (type == 2)
            {
                MjClient.gamenet.request("pkplayer.handler.leagueMutexDelete", {leagueId:this.clubId,id:itemData.id},  function(rtn)
                {
                    MjClient.unblock();
                    if(rtn.code == 0)
                    {
                        that.data.splice(index, 1);
                        that.refreshMutexList();
                        MjClient.showToast("删除互斥玩家成功！");
                    }
                    else
                    {
                        FriendCard_Common.serverFailToast(rtn);
                    }
                });
            }
        }, this);
        
    },
    updateForbMutex2:function () {
        var sendInfo = {};
        sendInfo.leagueId = this.clubId;
        sendInfo.isForbMutex2 = this.checkbox_isForbMutex2.isSelected();
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.leagueUpdate", sendInfo,
            function(rtn) {
                MjClient.unblock();
                if (rtn.code == 0 || rtn.result == 0) {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    }
                } else {
                    FriendCard_Common.serverFailToast(rtn)
                }
            }
        );
    },
    //init互斥界面
    initMutexLayer:function()
    {
        var that = this;
        var panel = this.node.getChildByName("Panel");
        this.list = panel.getChildByName("list");
        this.item = panel.getChildByName("item");
        this.text_nullTip = panel.getChildByName("Text_nullTip");
        this.text_nullTip.visible = false;
        this.item.visible = false;

        var checkbox_isForbMutex2 = panel.getChildByName("checkbox_isForbMutex2");
        this.checkbox_isForbMutex2 = checkbox_isForbMutex2;
        checkbox_isForbMutex2.getChildByName("text").addTouchEventListener(function(sender, type) {
            if (type == 2){
                checkbox_isForbMutex2.setSelected(!checkbox_isForbMutex2.isSelected());
                that.runAction(cc.callFunc(function() {
                    that.updateForbMutex2();
                }));
            }
        });
        checkbox_isForbMutex2.addTouchEventListener(function(sender, type) {
            if (type == 2){
                that.runAction(cc.callFunc(function() {
                    that.updateForbMutex2();
                }));   
            }
        });
        checkbox_isForbMutex2.visible = FriendCard_Common.isSupperManger();
        var clubInfo = FriendCard_Common.getClubInfo();
        checkbox_isForbMutex2.setSelected(clubInfo.isForbMutex2 == 1);

        var btnPlayer = panel.getChildByName("Image_title_player").getChildByName("panel_button");
        var btnTeam = panel.getChildByName("Image_title_team").getChildByName("panel_button");
        this._mutexType = 1;
        panel.getChildByName("Image_title_player").visible = false;
        btnPlayer.addTouchEventListener(function(sender, type){
            if (type == 2){
                panel.getChildByName("Image_title_player").visible = false;
                panel.getChildByName("Image_title_team").visible = true;
                that._mutexType = 1;
                that.data = [];
                that.refreshMutexList();
                that.rquestClubMutexList();
            }
        }, this);
        btnTeam.addTouchEventListener(function(sender, type){
            if (type == 2){
                if(FriendCard_Common.getClubInfo().isForbMutex2 == 1 && !FriendCard_Common.isSupperManger()){
                    MjClient.showToast("盟主已禁止会长使用团队互斥");
                    return;
                }
                panel.getChildByName("Image_title_player").visible = true;
                panel.getChildByName("Image_title_team").visible = false;
                that._mutexType = 2;
                that.data = [];
                that.refreshMutexList();
                that.rquestClubMutexList();
            }
        }, this);
        panel.getChildByName("Button_add").addTouchEventListener(function(sender, type){
        if (type == 2)
            {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Renwu_Huchimingdan_Tianjia", {uid:SelfUid()});
                this.addChild(new Friendcard_LM_addMutexLayer(this.clubId,this._mutexType));
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

        var setEditBoxConfig = function(_parent,_child,str) {
            _child.setFontColor(cc.color(0x40, 0x40, 0x40));
            _child.setMaxLength(8);
            _child.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
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
        setEditBoxConfig(img_userId,this.edtUserId,"请输入玩家ID");

        img_userId.getChildByName("btn_inquire").addTouchEventListener(function(sender, type){
            if (type == 2){
                var idStr = this.edtUserId.getString();
                that._searchUserId = idStr;
                that.rquestClubMutexList();
            }
        }, this);

        UIEventBind(null, this, "clubMutexAdd", function(rtn) {
            this.rquestClubMutexList();
        }, this);
    },
    onExit: function () {
        this._super();
        MjClient.friendCardFindPlayer_ui = null;
    },
});

// 亲友圈-添加互斥玩家名单
var Friendcard_LM_addMutexLayer = cc.Layer.extend({
    ctor:function (clubId,mutexType) {
        this._super();
        this.clubId = clubId;
        this.mutexType = mutexType;
        this.data = null;
        if(this.mutexType == 2){
            var node = ccs.load("friendcard_addMutexLayer2.json").node;
        }else{
            var node = ccs.load("friendcard_addMutexLayer.json").node;
        }
        this.addChild(node);
        this.node = node;

        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Panel"), [1, 1], [0.5, 0.5], [0, 0]);

        popupAnm(node.getChildByName("Panel"));
        
        this.initMutexAddLayer();  

    },
    initMutexAddLayer:function()
    {
        var that = this;
        this.mutexAddLayer = this.node.getChildByName("Panel").getChildByName("mutexAddLayer")
        //修改EditBox配置
        var setEditBoxConfig = function(_parent,_child,str,index,size) {
            _child.setFontColor(cc.color(0x40, 0x40, 0x40));
            var size = size ? size : 34
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
            _child.setPlaceholderFontSize(size);
            _child.setPosition(_parent.getContentSize().width / 2, _parent.getContentSize().height / 2);
            _parent.addChild(_child);
            if(index != -1)
            {
                _parent.getChildByName("btn_inquire").addTouchEventListener(function(sender, type){
                if (type == 2)
                    {
                        MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Renwu_Huchimingdan_Tianjia_Sousuo", {uid:SelfUid()});
                        var idStr = _child.getString();
                        var id = Number(idStr);
                        if (!id || id < 1000)
                        {
                            MjClient.showToast("请输入正确的玩家id！");
                            return;
                        }
                        // 向服务器请求玩家信息
                        MjClient.block();

                        if(that.mutexType == 2){
                            var sendInfo = {
                                sourceId : that.clubId,
                                target:2,
                                userId:id
                            }
                            // 向服务器请求玩家信息
                            MjClient.block();
                            MjClient.gamenet.request("pkplayer.handler.mutexUserInfo", sendInfo,  function(rtn)
                            {
                                MjClient.unblock();
                                if(rtn.code == 0 && rtn.data){
                                    that.setplayerInfo(rtn.data,index)
                                }else{
                                    FriendCard_Common.serverFailToast(rtn);
                                }
                            });
                        }else{
                            MjClient.gamenet.request("pkcon.handler.getUserInfo", {userId: id},  function(rtn)
                            {
                                MjClient.unblock();
                                if(rtn.code == 0 && rtn.data){
                                    that.setplayerInfo(rtn.data,index)
                                }else{
                                    FriendCard_Common.serverFailToast(rtn);
                                }
                            });
                        }
                        
                    }
                }, this);
            } 
        }.bind(this);

        var mutexPlayer0 = this.mutexAddLayer.getChildByName("Image0");
        this.mutexPlayer0 = new cc.EditBox(mutexPlayer0.getContentSize(), new cc.Scale9Sprite("friendCards/common/img_dikuang.png"));
        if(this.mutexType == 2){
            setEditBoxConfig(mutexPlayer0,this.mutexPlayer0,"输入会长或组长的ID",0,24);
        }else{
            setEditBoxConfig(mutexPlayer0,this.mutexPlayer0,"请输入玩家ID",0);
        }

        var mutexPlayer1 = this.mutexAddLayer.getChildByName("Image1");
        this.mutexPlayer1 = new cc.EditBox(mutexPlayer1.getContentSize(), new cc.Scale9Sprite("friendCards/common/img_dikuang.png"));
        if(this.mutexType == 2){
            setEditBoxConfig(mutexPlayer1,this.mutexPlayer1,"输入会长或组长的ID",1,24);
        }else{
            setEditBoxConfig(mutexPlayer1,this.mutexPlayer1,"请输入玩家ID",1);
        }

        var img_yuanyin = this.mutexAddLayer.getChildByName("img_yuanyin");
        this.img_yuanyin = new cc.EditBox(img_yuanyin.getContentSize(), new cc.Scale9Sprite("friendCards/common/img_dikuang.png"));
        setEditBoxConfig(img_yuanyin,this.img_yuanyin,"最多输入17个字。。。",-1);

        //玩家信息
        this.mutexPayers = []
        for(var i = 0;i<2; i++)
        {
            this.mutexPayers[i] = this.mutexAddLayer.getChildByName("player"+ (i+1) +"_hand");
            this.mutexPayers[i].visible = false;
        }

        //确认按钮
        var btn_OK = this.mutexAddLayer.getChildByName("btn_OK");
        btn_OK.addTouchEventListener(function(sender, type){
        if (type == 2)
            {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Renwu_Huchimingdan_Tianjia_Sure", {uid:SelfUid()});
                var id1 = Number(this.mutexPlayer0.getString());
                var id2 = Number(this.mutexPlayer1.getString());
                if(id1 == id2)
                {
                    MjClient.showToast("互斥玩家的ID不能一样");
                    return;
                }
                //原因
                var remarkStr = false;
                if(this.img_yuanyin.getString().length > 17)
                {
                    MjClient.showToast("原因最多输入17个字。");
                    return;
                }else if(this.img_yuanyin.getString().length > 1)
                {
                    remarkStr = this.img_yuanyin.getString();
                }
                var sendMessage = {
                    leagueId:that.clubId, 
                    userId1: id1,
                    userId2: id2,
                    mutexType:that.mutexType
                }
                if (remarkStr){
                   sendMessage.remark = remarkStr;
                }
                // 向服务器请求玩家信息
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.leagueMutexAdd", sendMessage,  function(rtn)
                {   
                    MjClient.unblock();
                    if(rtn.code == 0)
                    {
                        that.emptyInput();
                        that.removeFromParent();
                        MjClient.showToast("添加互斥玩家成功！");
                        postEvent("clubMutexAdd");
                    }
                    else
                    {
                        FriendCard_Common.serverFailToast(rtn);
                    }
                });
            }
        }, this);

        //关闭按钮
        var close = this.mutexAddLayer.getChildByName("btn_close");
        close.addTouchEventListener(function(sender, type){
        if (type == 2)
            {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Renwu_Huchimingdan_Tianjia_Close", {uid:SelfUid()});
                that.removeFromParent();
            }
        }, this);
        closeBtnAddLight(close);

    },
    //清空用户输入信息
    emptyInput:function()
    {
        this.mutexPlayer0.setString("");
        this.mutexPlayer1.setString("");
        this.img_yuanyin.setString("");

        for(var i=0;i<this.mutexPayers.length;i++)
        {
            this.mutexPayers[i].visible = false;
        }
    },
    setplayerInfo:function(playerData,index)
    {
        var player  = this.mutexPayers[index]

        player.getChildByName("player_name").ignoreContentAdaptWithSize(true)
        player.getChildByName("player_name").setString(getNewName(unescape(playerData.nickname)));
        player.getChildByName("player_name").setFontName("Arial");
        player.getChildByName("player_name").setFontSize(25);
        player.getChildByName("player_ID").ignoreContentAdaptWithSize(true)
        if(this.mutexType == 2){
            player.getChildByName("player_ID").setString("人数:" + playerData.userCnt);
        }else{
            player.getChildByName("player_ID").setString("ID:" + playerData.userId);
        }
        player.isMask = true;
        COMMON_UI.refreshHead(this, playerData.headimgurl, player);
        this.mutexPayers[index].visible = true;
    },
    onExit: function () {
        this._super();
        MjClient.friendCardFindPlayer_ui = null;
    },
});