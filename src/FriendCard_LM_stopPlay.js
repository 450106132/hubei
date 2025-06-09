
// 联盟禁玩名单
var Friendcard_LM_stopPlay = cc.Layer.extend({
    ctor:function (clubId) {
        this._super();
        this.clubId = clubId;
        this.data = null;
        var node = ccs.load("friendcard_LM_stopPlay.json").node;
        this.addChild(node);
        this.node = node;

        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Panel"), [1, 1], [0.5, 0.5], [0, 0]);
        
        popupAnm(node.getChildByName("Panel"));
        this.initStopPlayLayer()
        this.rquestLMStopPlayList()
    },
    //请求列表
    rquestLMStopPlayList:function()
    {
        var that = this;
        MjClient.block();
        var sendInfo = {
            leagueId: this.clubId,
            type:4,
            length:10000,
        }
        cc.log("rquestLMStopPlayList sendInfo",JSON.stringify(sendInfo))
        MjClient.gamenet.request("pkplayer.handler.leaguePlayerList", sendInfo,  function(rtn)
        {   
            MjClient.unblock();
            if(rtn.code == 0){
                that.data = rtn.data.list;
                that.refreshStopPlayList();
            }
            else{
                FriendCard_Common.serverFailToast(rtn);
            }  
        });
    },
    //刷新列表
    refreshStopPlayList:function()
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
        var that = this;
        var itemData = this.data[index];
        //createTime
        var time = item.getChildByName("Text_time");
        time.ignoreContentAdaptWithSize(true);
        var timeStr = MjClient.dateFormat(new Date(parseInt(itemData.forbidTime)), 'yyyy-MM-dd\nhh:mm:ss');
        time.setString(timeStr);

        var text_content = item.getChildByName("Text_content");
        var contentStr = unescape(itemData.nickname) + "("+itemData.userId+")" +",会长:"+ unescape(itemData.chairman)+",分组:";
        if(itemData.group){
            contentStr += (itemData.group+"组");
            if(itemData.assistantNo){
                contentStr += "("+itemData.assistantNo+")"
            }
        }else{
            contentStr += "未分组";
        }
        contentStr += ",操作人:";
        if(itemData.forbidOperatorRoleId == 3){
            contentStr += "盟主,"
        }else if(itemData.forbidOperatorRoleId == 6){
            contentStr += "超级管理员,"
        }else{
            contentStr += ""
        }
        contentStr += getNewName(unescape(itemData.forbidOperatorName));

        text_content.setString(contentStr);

        //原因
        var yuanyin = item.getChildByName("Text_yuanyin");
        if(itemData.forbidMsg){
            yuanyin.setString(getNewName_new(unescape(itemData.forbidMsg) + " ",18) )
        }
        else{
            yuanyin.setString("   ")
        } 
        //删除
        item.getChildByName("Button_delete").addTouchEventListener(function(sender, type){
            if (type == 2)
            {
                var sendInfo = {
                    leagueId:that.clubId,
                    userId:itemData.userId,
                    type:6,
                    value:1
                }
                MjClient.gamenet.request("pkplayer.handler.leaguePlayerUpdate", sendInfo,  function(rtn)
                {
                    MjClient.unblock();
                    if(rtn.code == 0)
                    {
                        that.data.splice(index, 1);
                        that.refreshStopPlayList();
                        MjClient.showToast("删除禁玩玩家成功！");
                    }
                    else
                    {
                        FriendCard_Common.serverFailToast(rtn);
                    }
                });
            }
        }, this);
        
    },
    //init互斥界面
    initStopPlayLayer:function()
    {
        var panel = this.node.getChildByName("Panel");
        this.list = panel.getChildByName("list");
        this.item = panel.getChildByName("item");
        this.text_nullTip = panel.getChildByName("Text_nullTip");
        this.text_nullTip.visible = false;
        this.item.visible = false;

        panel.getChildByName("Button_add").addTouchEventListener(function(sender, type){
        if (type == 2)
            {
                this.addChild(new Friendcard_LM_stopPlayAdd(this.clubId));
            }
        }, this);

        var _close = panel.getChildByName("Button_close")
        _close.addTouchEventListener(function(sender, type){
            if (type == 2){
                this.removeFromParent();
            }
        }, this);
        closeBtnAddLight(_close);

        UIEventBind(null, this, "clubStopPlayAdd", function(rtn) {
            this.rquestLMStopPlayList();
        }, this);
    },
    onExit: function () {
        this._super();
    },
});

// 联盟添加禁玩名单
var Friendcard_LM_stopPlayAdd = cc.Layer.extend({
    ctor:function (clubId) {
        this._super();
        this.clubId = clubId;
        this.data = null;
        var node = ccs.load("friendcard_LM_stopPlayAdd.json").node;
        this.addChild(node);
        this.node = node;
         COMMON_UI.setNodeTextAdapterSize(node);
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        if(FriendCard_Common.getSkinType() == 1){
            setWgtLayout(node.getChildByName("Panel"), [1, 1], [0.5, 0.5], [0, 0]);
        }else{
            setWgtLayout(node.getChildByName("Panel"), [0.5055, 0.5472], [0.5, 0.5], [0, 0]);
        }

        popupAnm(node.getChildByName("Panel"));
        
        this.initStopPlayAddLayer();  

    },
    initStopPlayAddLayer:function()
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
                // 向服务器请求玩家信息
                MjClient.block();

                var sendInfo = {
                    leagueId: this.clubId,
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
            }
        }, this);

        var img_yuanyin = panel.getChildByName("img_yuanyin");
        this.edtReason = new cc.EditBox(img_yuanyin.getContentSize(), new cc.Scale9Sprite("friendCards/common/img_dikuang.png"));
        setEditBoxConfig(img_yuanyin,this.edtReason,"最多输入17个字。。。",-1);

        //玩家信息
        this.playerHeadNode = panel.getChildByName("playerHead");
        this.playerHeadNode.visible = false;
        //确认按钮
        var btn_OK = panel.getChildByName("btn_OK");
        btn_OK.addTouchEventListener(function(sender, type){
            if (type == 2){
                if(!this.playerHeadNode.visible){
                    return;
                }
                if(this.edtReason.getString().length > 17){
                    MjClient.showToast("原因最多输入17个字。");
                    return;
                }
                //原因
                var remarkStr = this.edtReason.getString();

                var sendInfo = {
                    leagueId:that.clubId,
                    userId:this.playerHeadNode._data.userId,
                    type:6,
                    value:2,
                    reason:remarkStr
                }
                cc.log("leaguePlayerUpdate sendInfo",JSON.stringify(sendInfo))
                MjClient.gamenet.request("pkplayer.handler.leaguePlayerUpdate", sendInfo,  function(rtn)
                {
                    MjClient.unblock();
                    if(rtn.code == 0){
                        that.removeFromParent();
                        MjClient.showToast("添加禁玩玩家成功！");
                        postEvent("clubStopPlayAdd");
                    }
                    else{
                        FriendCard_Common.serverFailToast(rtn);
                    }
                });
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