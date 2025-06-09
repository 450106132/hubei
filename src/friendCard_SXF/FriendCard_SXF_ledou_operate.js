// 亲友圈-乐豆发放回收操作
var FriendCard_SXF_ledou_operate = cc.Layer.extend({
    ctor:function(clubId,playerInfo,type,callback) {
        this._super();
        MjClient.FriendCard_SXF_ledou_operate = this;
        var node = ccs.load("friendcard_SXF_ledou_operate.json").node;
        this.addChild(node);
        this.clubId = clubId
        this.playerInfo = playerInfo
        this.operateType = type//操作类型1.发放，2.回收
        this.callback = callback
        var back = node.getChildByName("back");
        setWgtLayout(back, [0.6, 0.6], [0.5, 0.5], [0, 0]);
        setWgtLayout(node.getChildByName("block"), [1, 1], [0.5, 0.5], [0, 0], true);
        COMMON_UI.setNodeTextAdapterSize(back);
        this.init(back);
    },
    init:function(back){
        var that = this

        this.rquestClubGiveHappyBean = function(userId,ledouNum,operateType,callback){
            var sendInfo = {
                clubId: this.clubId, 
                userId: userId,
                happyBean:ledouNum,
                opType:operateType//1赠送；2回收
            }
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.clubGiveHappyBean", sendInfo, function(rtn) {
                MjClient.unblock();
                cc.log(" ===== pkplayer.handler.clubGiveHappyBean === " + JSON.stringify(rtn))
                if (rtn.code == 0) {
                    // cc.log("操作成功")
                    if(callback){
                        callback()
                    }
                }else{
                    if(rtn.message){
                        MjClient.showMsgTop(rtn.message);
                    }
                }
            });
        }

        var btn_fafang = back.getChildByName("btn_fafang");
        var btn_huishou = back.getChildByName("btn_huishou");
        var str
        if(this.operateType == 1){
            str = "发放"
            btn_huishou.setVisible(false)
            btn_fafang.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    that.rquestClubGiveHappyBean(that.playerInfo.userId,Number(that.ledouNum.getString()),that.operateType,that.callback)
                    that.removeFromParent(true)
                }
            });
        }
        else{
            str = "回收"
            btn_fafang.setVisible(false)
            btn_huishou.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    that.rquestClubGiveHappyBean(that.playerInfo.userId,Number(that.ledouNum.getString()),that.operateType,that.callback)
                    that.removeFromParent(true)
                }
            });
        }

        var btn_close = back.getChildByName("btn_close");
        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent(true)
            }
        });

        var text_title = back.getChildByName("Text_title");
        var name = getPlayerName(unescape(this.playerInfo.nickname))
        text_title.setString("向“" + name + "”" + str + "乐豆")

        var titlestr = "Image_title" + this.operateType
        back.getChildByName(titlestr).setVisible(false)

        var text_ledouNum = back.getChildByName("Text_ledouNum");
        text_ledouNum.setString("玩家剩余乐豆：" + this.playerInfo.happyBean)

        var ledouNum = back.getChildByName("Image_ledouNum");
        this.ledouNum = new cc.EditBox(ledouNum.getContentSize(), new cc.Scale9Sprite("friendCards/tongji/inputbg.png"));
        this.ledouNum.setPlaceholderFontSize(30);
        this.ledouNum.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this.ledouNum.setPlaceHolder("请输入数额");
        this.ledouNum.setPosition(ledouNum.getContentSize().width/2, ledouNum.getContentSize().height/2);
        this.ledouNum.setFontColor(cc.color("#9f6a36"));
        ledouNum.addChild(this.ledouNum);
        this.ledouNum.setDelegate(this);

        this.editBoxEditingDidEnd = function (editBox) {
            this.ledouNum.setString(Number(this.ledouNum.getString()))
        };
    },
    onExit: function () {
        this._super();
        MjClient.FriendCard_SXF_ledou_operate = null;
    },
});


