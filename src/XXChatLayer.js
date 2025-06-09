/**
 * Created by sking on 2017/4/8.
 */

(function() {

    var CHAT_TYPE_INPUT = 0;
    var CHAT_TYPE_DEFULT = 1;
    var CHAT_TYPE_EMOJI = 2;
    var playerChatLayer = null;
    var input = null;

    function emojiAction_xx(num) {
        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Duihua_Biaoqing", {uid: SelfUid()});
        MJChat_xx(SelfUid(), CHAT_TYPE_EMOJI, "", num);
        if(playerChatLayer)
        {
            playerChatLayer.removeFromParent(true);
            playerChatLayer = null;
        }
    }

    function ItemsBind_xx(node, num) {
        var bind = {
            _click: function() {
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Duihua_wenziyuyin", {uid: SelfUid()});
                MJChat_xx(SelfUid(), CHAT_TYPE_DEFULT, {text:node.getChildByName("text").getString(), voiceType:getCurrentVoiceType()}, num);
                if(playerChatLayer)
                {
                    playerChatLayer.removeFromParent(true);
                    playerChatLayer = null;
                }
            },
            text: {
                _run: function() {
                    // this.ignoreContentAdaptWithSize(true);

                    // 游戏独立的聊天语， 在 PlayerGamePanel 实现 getCahtText 来获取
                    if (cc.sys.isObjectValid(MjClient.playui) && MjClient.playui.__proto__.getCahtText) {
                        var text = MjClient.playui.getCahtText(num);
                        // cc.log('ChatLayer getCahtText', num, text);
                        this.setString(text);
                        return;
                    }

                    if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ||
                        MjClient.gameType === MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA ||
                        MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI ||
                        MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI)
                    {
                        this.ignoreContentAdaptWithSize(false);
                        var voiceType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 1);
                        if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI) voiceType = 0;
                        
                        var content;
                        switch(num){
                            case 0:
                                content = voiceType == 0?"拼一拼，搏一搏，单车变摩托！":"湘乡有首歌，上碰下自摸！";
                                break;
                            case 1:
                                content = voiceType == 0?"怎么又断线了，你网络怎么这么差！":"莫喷泡子里，快递出牌咯！";
                                break;
                            case 2:
                                content = voiceType == 0?"不好意思，接个电话！":"嗯滴牌几就硬打的嬲噻啦，朋友啊！";
                                break;
                            case 3:
                                content = voiceType == 0?"你以为你是潘先生，不要这么浪，还是认真打牌，莫吵！":"么噶又断噶线里啊，换多好滴手机看看！";
                                break;
                            case 4:
                                content = voiceType == 0?"你要多出点师傅费，下次你才赢得前到！":"嗯是二炮导弹部队的老班长哦，放炮专业户！";
                                break;
                            case 5:
                                content = voiceType == 0?"大炮一响，黄金万两，关公保佑我赢钱！":"输的噶茄子样的，裤底舍噶哩，再输只能起跳涟水河里！";
                                break;
                            case 6:
                                content = voiceType == 0?"今天输大了，小妹（大哥）我跟你回家把！":"昨一子找杨哈子算了一挂，今天打牌手气好，恁搞打是滴！";
                                break;
                            case 7:
                                content = voiceType == 0?"你是不是踩了狗屎运，手气怎么这么好！":"打了这么久，就赢了一碗银粉丝的钱！";
                                break;
                            case 8:
                                content = voiceType == 0?"你放炮、我不胡！":"出来混，迟早是要还的，低调！";
                                break;
                            case 9:
                                content = voiceType == 0?"你太牛了牌打得这么好！":"专心耍咯，摸紧哒噶吵哩！";
                                break;
                            case 10:
                                content = "快点出牌咯！";
                                break;
                            case 11:
                                content = "这样打牌，你家里钱多啊！";
                                break;
                            case 12:
                                content = "你是帅哥还是靓妹，我们交个朋友吧！";
                                break;
                            case 13:
                                content = "要自摸了，今天真高兴！";
                                break;
                            case 14:
                                content = "出来混的迟早是要还的，你也得让我胡几手牌吧！";
                                break;
                            default:
                                break;
                        }
                        if(content){
                            this.setString(content);
                        }
                    }
                    else if(MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN){
                        this.ignoreContentAdaptWithSize(false);
                        var sData = MjClient.data.sData;
                        var tData = sData.tData;
                        var uid = SelfUid();
                        var pl = sData.players[uid];
                        var sexType = 0;
                        var content;
                        if(pl.info.sex == 1){
                            sexType = 1;
                        }
                        switch (num) {
                            case 0:
                                this.setString("搏一搏，单车变摩托~");
                                break;
                            case 1:
                                this.setString("时间就是金钱，我的朋友！");
                                break;
                            case 2:
                                this.setString("一点小钱，拿去喝茶吧!");
                                break;
                            case 3:
                                this.setString("有没有天理有没有王法，这牌也输");
                                break;
                            case 4:
                                this.setString("快点啊，我等到花都谢了！");
                                break;
                            case 5:
                                this.setString("怎么又断线了，网络怎么这么差啊！");
                                break;
                            case 6:
                                this.setString("不要走，决战到天亮~");
                                break;
                            case 7:
                                this.setString("你的牌打得太好了~");
                                break;
                            case 8:
                                this.setString("你是妹妹还是哥哥？");
                                break;
                            case 9:
                                this.setString("跟你合作实在太愉快了~");
                                break;
                            case 10:
                                this.setString("大家好，很高兴见到各位~");
                                break;
                            case 11:
                                this.setString("各位不好意思，我得离开一会~");
                                break;
                            case 12:
                                this.setString("不要吵，专心玩游戏~");
                                break;
                            default:
                                break;
                        }
                        if(content){
                            this.setString(content);
                        }
                    }
                    else if (MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA) {
                        switch(num){
                            case 0:
                                this.setString("搏一搏，单车变摩托~");
                                break;
                            case 1:
                                this.setString("时间就是金钱，我的朋友！");
                                break;
                            case 2:
                                this.setString("一点小钱，拿去喝茶吧!");
                                break;
                            case 3:
                                this.setString("有没有天理有没有王法，这牌也输");
                                break;
                            case 4:
                                this.setString("快点啊，我等到花都谢了！");
                                break;
                            case 5:
                                this.setString("怎么又断线了，网络怎么这么差啊！");
                                break;
                            case 6:
                                this.setString("不要走，决战到天亮~");
                                break;
                            case 7:
                                this.setString("你的牌打得太好了~");
                                break;
                            case 8:
                                this.setString("你是妹妹还是哥哥？");
                                break;
                            case 9:
                                this.setString("跟你合作实在太愉快了~");
                                break;
                            case 10:
                                this.setString("大家好，很高兴见到各位~");
                                break;
                            case 11:
                                this.setString("各位不好意思，我得离开一会~");
                                break;
                            case 12:
                                this.setString("不要吵，专心玩游戏~");
                                break;
                            default:
                                break;
                        }
                    }

                }
            }

        };
        BindUiAndLogic(node, bind);
    }

    function MJChat_xx(uid, type, msg, num) {
        MjClient.gamenet.request("pkroom.handler.tableMsg", {
            cmd: "MJChat",
            uid: uid,
            type: type,
            msg: msg,
            num: num
        });
    }

    function SendChatMessage_xx() {
        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Duihua_Fasong", {uid: SelfUid()});
        if (cc.sys.isObjectValid(input) && input.getString()) {
            var newString = checkChatWords(input.getString());
            MJChat_xx(SelfUid(), CHAT_TYPE_INPUT, newString, 0);
        }

        if(playerChatLayer)
        {
            playerChatLayer.removeFromParent(true);
            playerChatLayer = null;
        }
    }

    window.XXChatLayer = cc.Layer.extend({
        editBoxEditingDidBegin: function(editBox) {
            cc.log("editBox  DidBegin !");
        },
        editBoxEditingDidEnd: function(editBox) {
            cc.log("editBox  DidEnd !");
        },
        editBoxTextChanged: function(editBox, text) {
            cc.log("editBox , TextChanged, text: " + text);
        },
        editBoxReturn: function(editBox) {
            cc.log("editBox  was returned !");
            console.log("------发送消息");
            this.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(SendChatMessage_xx)));
        },
        ctor: function() {
            this._super();
            var chatui = ccs.load("PlayerChatXX.json");

            //chatui.node.setScale(1.2);
            //BindUiAndLogic(chatui.node,this.jsBind);
            this.addChild(chatui.node);
            playerChatLayer = this;
            /*
                changed by sking
             */
            var _block = chatui.node.getChildByName("block");
            _block.setTouchEnabled(true);
            setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
            var _back = chatui.node.getChildByName("back");
            setWgtLayout(_back, [0.9, 0.9], [0.7, 0.5], [0, 0]);

            var _closeBtn = new ccui.Button();
            _closeBtn.loadTextureNormal("game_picture/btn_x_normal.png");
            _closeBtn.setPosition(cc.p(_back.getContentSize().width, _back.getContentSize().height));
            _back.addChild(_closeBtn);
            _closeBtn.addTouchEventListener(function(sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        if(playerChatLayer)
                        {
                            playerChatLayer.removeFromParent(true);
                            playerChatLayer = null;
                        }
                        break;
                    default:
                        break;
                }
            }, this);
            var inputimg = _back.getChildByName("inputimg");
            input = new cc.EditBox(inputimg.getContentSize(), new cc.Scale9Sprite());
            input.setFontColor(cc.color(0x7E, 0x5C, 0x45));
            input.setPlaceholderFontColor(cc.color(128, 128, 128));
            input.setMaxLength(20);
            input.setFontSize(34);
            input.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            input.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
            input.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            input.setPlaceHolder("请输入文字");
            input.setPlaceholderFontSize(28);
            input.setPosition(inputimg.getContentSize().width / 2, inputimg.getContentSize().height / 2);
            input.setDelegate(this);
            inputimg.addChild(input);
            //发送按钮
            var send_btn = _back.getChildByName("send_btn");
            send_btn.addTouchEventListener(function(sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        console.log("------发送消息");
                        SendChatMessage_xx();
                        break;
                    default:
                        break;
                }
            }, this);
            if(true){
                inputimg.setVisible(false);
                send_btn.setVisible(false);
            }
            //常用语列表
            var changyong_list = _back.getChildByName("changyong_list");
            changyong_list.visible = true;
            //表情列表
            var emoji_list = _back.getChildByName("emoji_list");
            emoji_list.visible = false;

            if (MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ) {
                //常用语
                var changyongBtn = _back.getChildByName("changyong");
                changyongBtn.selected = false;
                changyongBtn.bright = false;

                //表情
                var emojiBtn = _back.getChildByName("emoji");
                emojiBtn.selected = true;
                emojiBtn.bright = true;
                changyongBtn.addEventListener(function(sender, type) {
                    switch (type) {
                        case ccui.CheckBox.EVENT_SELECTED:
                            changyongBtn.selected = true;
                            changyongBtn.bright = true;
                            emojiBtn.selected = false;
                            emojiBtn.bright = false;
                            changyongBtn.zIndex = 10;
                            emoji.zIndex = 5;
                            changyong_list.visible = false;
                            emoji_list.visible = true;
                            break;
                        case ccui.CheckBox.EVENT_UNSELECTED:
                            changyongBtn.selected = false;
                            changyongBtn.bright = false;
                            emojiBtn.selected = true;
                            emojiBtn.bright = true;
                            changyongBtn.zIndex = 5;
                            emojiBtn.zIndex = 10;
                            changyong_list.visible = true;
                            emoji_list.visible = false;
                            break;
                    }
                }, this);

                emojiBtn.addEventListener(function(sender, type) {
                    switch (type) {
                        case ccui.CheckBox.EVENT_SELECTED:
                            changyongBtn.selected = false;
                            changyongBtn.bright = false;
                            emojiBtn.selected = true;
                            emojiBtn.bright = true;
                            emojiBtn.zIndex = 10;
                            changyongBtn.zIndex = 5;
                            changyong_list.visible = true;
                            emoji_list.visible = false;
                            break;
                        case ccui.CheckBox.EVENT_UNSELECTED:
                            changyongBtn.selected = true;
                            changyongBtn.bright = true;
                            emojiBtn.selected = false;
                            emojiBtn.bright = false;
                            emojiBtn.zIndex = 5;
                            changyongBtn.zIndex = 10;
                            changyong_list.visible = false;
                            emoji_list.visible = true;
                            break;
                    }
                }, this);
                var changyong_item = changyong_list.getChildByName("item");
                var num = 8;
                if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ||
                    MjClient.gameType == MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA ||
                    MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI ||
                    MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI)
                {
                    var voiceType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 0);
                    if(voiceType == 0){
                        num = 14;
                    }else{
                        num = 9;
                    }
                }
                if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ) {
                    num = 10;
                }
                if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {
                    num = 9;
                }

                if(MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN || 
                    MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA){
                    num = 13;
                }
                for (var i = 0; i < num; i++) {
                    var item = i == 0 ? changyong_item : changyong_item.clone();
                    if (i != 0)
                        changyong_list.insertCustomItem(item, i);
                    ItemsBind_xx(item, i);
                }

                function emojiEvent(sender, eType) {
                    if (eType == ccui.Widget.TOUCH_ENDED) {
                        var itag = sender.getTag();
                        emojiAction_xx(itag);
                    }
                }

                var emoji_item = emoji_list.getChildByName("item");
                var emoji_names = ["bb1", "daku1", "fennu1", "guzhang1", "kaiqiang1", "kaixin1", "keshui1", "pp1", "tuxue1"];
                for (var i = 0; i < 4; i++) {
                    var item = i == 0 ? emoji_item : emoji_item.clone();
                    if (i != 0)
                        emoji_list.insertCustomItem(item, i);

                    for (var j = 0; j < 4; j++) {
                        var index = i * 4 + j;

                        var emoji = item.getChildByName("emoji" + j);
                        if (index <= emoji_names.length - 1) {
                            emoji.loadTexture("chat/" + emoji_names[index] + ".png");
                            if(MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN){
                                emoji.ignoreContentAdaptWithSize(false);
                            }else{
                                emoji.ignoreContentAdaptWithSize(true);
                            }
                            emoji.setTag(index);
                            emoji.addTouchEventListener(emojiEvent, this);
                        } else {
                            emoji.setVisible(false);
                        }
                    }
                }

            } else {
                //常用语列表
                var changyong_list = _back.getChildByName("changyong_list");
                //表情列表
                var emoji_list = _back.getChildByName("emoji_list");
                emoji_list.visible = true;
                var changyong_item = changyong_list.getChildByName("item");
                var num = 9;
                for (var i = 0; i < num; i++) {
                    var item = i == 0 ? changyong_item : changyong_item.clone();
                    if (i != 0)
                        changyong_list.insertCustomItem(item, i);
                    ItemsBind_xx(item, i);
                }

                function emojiEvent(sender, eType) {
                    if (eType == ccui.Widget.TOUCH_ENDED) {
                        var itag = sender.getTag();
                        emojiAction_xx(itag);
                    }
                }

                var temp = _back.getChildByName("emoji_list_new");
                temp && temp.setVisible(false);
                
                var emoji_item = emoji_list.getChildByName("item");
                var emoji_names = ["bb1", "daku1", "fennu1", "guzhang1", "kaiqiang1", "kaixin1", "keshui1", "pp1", "tuxue1"];

                var col = 3;
                var gap = 15;


                for (var i = 0; i < 5; i++) {
                    var item = i == 0 ? emoji_item : emoji_item.clone();
                    if (i != 0)
                        emoji_list.insertCustomItem(item, i);

                    for (var j = 0; j < col; j++) {
                        var index = i * col + j;

                        var emoji = item.getChildByName("emoji" + j);
                        if (emoji && index <= emoji_names.length - 1) {
                            var sprite = new cc.Sprite("chat/" + emoji_names[index] + ".png");
                            //emoji.loadTexture("chat/" + emoji_names[index] + ".png");
                            //emoji.ignoreContentAdaptWithSize(true);
                            sprite.setScale((emoji.getContentSize().width - gap) / sprite.getContentSize().width);
                            sprite.setPosition(emoji.getContentSize().width / 2, emoji.getContentSize().height / 2);
                            emoji.addChild(sprite);
                            emoji.setTag(index);
                            emoji.addTouchEventListener(emojiEvent, this);
                        } else {
                            emoji.setVisible(false);
                        }
                    }
                }

            }



            return true;
        }
    });


})();