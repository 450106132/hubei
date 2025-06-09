/**
 * Created by cyc on 2017/11/21.
 */

// 亲友圈-添加互斥玩家名单
var Friendcard_mutexLayer = cc.Layer.extend({
    ctor:function (clubId) {
        this._super();
        this.clubId = clubId;
        this.data = null;
        var node = ccs.load("friendcard_mutexLayer.json").node;
        this.addChild(node);
        this.node = node;

        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Panel"), [1, 1], [0.5, 0.5], [0, 0]);


        popupAnm(node.getChildByName("Panel"));
        this.initMutexLayer()
        this.rquestClubMutexList()
    },
    //请求列表
    rquestClubMutexList:function()
    {
        var that = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.clubMutexList", {clubId: this.clubId},  function(rtn)
        {
            MjClient.unblock();
            if(rtn.code == 0)
            {
                cc.log()
                that.data = rtn.data;
                that.refreshMutexList();
            }
            else
            {
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
                MjClient.gamenet.request("pkplayer.handler.clubMutexDelete", {clubId:this.clubId,id:itemData.id},  function(rtn)
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
    //init互斥界面
    initMutexLayer:function()
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
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Renwu_Huchimingdan_Tianjia", {uid:SelfUid()});
                this.addChild(new Friendcard_addMutexLayer(this.clubId));
            }
        }, this);

        var _close = panel.getChildByName("Button_close")
        _close.addTouchEventListener(function(sender, type){
            if (type == 2){
                this.removeFromParent();
            }
        }, this);
        closeBtnAddLight(_close);

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
var Friendcard_addMutexLayer = cc.Layer.extend({
    ctor:function (clubId, userId) {
        this._super();
        this.clubId = clubId;
        this.userId = userId;
        this.data = null;
        var node = ccs.load("friendcard_addMutexLayer.json").node;
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
            if(index == 0){
                _child.setString(that.userId);
            }
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
                        MjClient.gamenet.request("pkcon.handler.getUserInfo", {userId: id},  function(rtn)
                        {
                            MjClient.unblock();
                            if(rtn.code == 0 && rtn.data){
                                that.setplayerInfo(rtn.data,index)
                            }
                            else{
                                FriendCard_Common.serverFailToast(rtn);
                            }
                        });
                    }
                }, this);
            }
        }.bind(this);

        var mutexPlayer0 = this.mutexAddLayer.getChildByName("Image0");
        this.mutexPlayer0 = new cc.EditBox(mutexPlayer0.getContentSize(), new cc.Scale9Sprite("friendCards/common/img_dikuang.png"));
        setEditBoxConfig(mutexPlayer0,this.mutexPlayer0,"请输入玩家ID",0);

        var mutexPlayer1 = this.mutexAddLayer.getChildByName("Image1");
        this.mutexPlayer1 = new cc.EditBox(mutexPlayer1.getContentSize(), new cc.Scale9Sprite("friendCards/common/img_dikuang.png"));
        setEditBoxConfig(mutexPlayer1,this.mutexPlayer1,"请输入玩家ID",1);

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
                    clubId:that.clubId,
                    userId1: id1,
                    userId2: id2
                }
                if (remarkStr)
                {
                   sendMessage.remark = remarkStr;
                }
                // 向服务器请求玩家信息
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.clubMutexAdd", sendMessage,  function(rtn)
                {
                    MjClient.unblock();
                    if(rtn.code == 0){
                        that.emptyInput();
                        that.removeFromParent();
                        MjClient.showToast("添加互斥玩家成功！");
                        postEvent("clubMutexAdd");
                    }
                    else{
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
        player.getChildByName("player_ID").setString("ID:" + playerData.userId);
        player.isMask = true;
        COMMON_UI.refreshHead(this, playerData.headimgurl, player);
        this.mutexPayers[index].visible = true;
    },
    onExit: function () {
        this._super();
        MjClient.friendCardFindPlayer_ui = null;
    },
});