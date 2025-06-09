function InputRoomNumber2_LM(n, callBack)
{
	var change=true;
	if(n>=0&&MjClient.enterfriendcode.length<5)       MjClient.enterfriendcode.push(n);
    else if(n==-1&&MjClient.enterfriendcode.length>0) MjClient.enterfriendcode.length=MjClient.enterfriendcode.length-1;
	else if(n==-2&&MjClient.enterfriendcode.length>0) MjClient.enterfriendcode.length=0;
	else change=false;
	if(change) 
	{
	   postEvent("EnterAddText2");
	   if(MjClient.enterfriendcode.length==5)
	   {
		   var enterfriendcode=MjClient.enterfriendcode;
		   var clubId=0;
		   for(var i=0;i<enterfriendcode.length;i++)
		   {
			   clubId=clubId*10+enterfriendcode[i];
		   }
		   callBack(clubId);
	   }
    }
}

function FindFriendCard_LM(clubId, parent, selfClubId, selfLMId) {
    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.clubInfo", {
            clubId: clubId
        },
        function(rtn) {
            MjClient.unblock();
            if (rtn.code == 0) {
                if (parent && cc.sys.isObjectValid(parent))
                    parent.addChild(new FriendCard_LM_FindAgain_Layer(rtn.data, selfClubId, selfLMId));

            } else {
                if (rtn.message) {
                    MjClient.showToast(rtn.message);
                } else {
                    MjClient.showToast("寻找失败");
                }
            }
        }
    );
}

function EnterAddText2_LM()
{
	var idx=parseInt(this.getName()[2]+"");
	var enterfriendcode=MjClient.enterfriendcode;
	if(idx<enterfriendcode.length)
	{
		this.getChildByName("Text").setString(enterfriendcode[idx]);
	}
	else this.getChildByName("Text").setString("");
}
function EmptyString2_LM(){return "";}

var FriendCard_LM_FindLayer = cc.Layer.extend({
    sprite:null,
	jsBind:{
		back:
		{
			top:{
				bg0:{ _event:{ EnterAddText2:EnterAddText2_LM  } ,Text:{ _text:EmptyString2_LM }  },
				bg1:{ _event:{ EnterAddText2:EnterAddText2_LM  } ,Text:{ _text:EmptyString2_LM }  },
				bg2:{ _event:{ EnterAddText2:EnterAddText2_LM  } ,Text:{ _text:EmptyString2_LM }  },
				bg3:{ _event:{ EnterAddText2:EnterAddText2_LM  } ,Text:{ _text:EmptyString2_LM }  },
				bg4:{ _event:{ EnterAddText2:EnterAddText2_LM  } ,Text:{ _text:EmptyString2_LM }  },
				bg5:{ _event:{ EnterAddText2:EnterAddText2_LM  } ,Text:{ _text:EmptyString2_LM }  }
			}
		},
	},
    ctor:function (selfClubId, selfLMId) {
        this._super();
        var that = this;
        var friendcard_LM_ui = ccs.load("friendcard_LM_find.json");
		BindUiAndLogic(friendcard_LM_ui.node,this.jsBind);
        this.addChild(friendcard_LM_ui.node);
		MjClient.friendcard_LM_ui=this;
		MjClient.enterfriendcode=[];

        var _block = friendcard_LM_ui.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], 2);

        var _back = friendcard_LM_ui.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);

        if(isJinZhongAPPType())
            popupAnm(_back)

        var _btnClose = _back.getChildByName("close");
        _btnClose.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    that.removeFromParent();
                    break;
                default :
                    break;
            }
        }, this);
		
		var callBack = function(clubId) {
			FindFriendCard_LM(clubId, MjClient.friendcard_LM_ui.getParent(), selfClubId, selfLMId);
			MjClient.friendcard_LM_ui.removeFromParent(true);
		}

        //数字按键
        var _num = _back.getChildByName("num");
        function numBtnTouchEvent(sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                var itag = sender.getTag();
                cc.log(" ===== itag : ",itag);
                InputRoomNumber2_LM(itag, callBack);
            }
        }
        for (var i = 0; i <= 9; i++) {
            var _btnNum = _num.getChildByName("Button_" + i);
            _btnNum.setTag(i);
            _btnNum.addTouchEventListener(numBtnTouchEvent, this);
        }

        //清除所有
        var _clear =  _num.getChildByName("clear");
        _clear.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    InputRoomNumber2_LM(-2);
                    break;
                default :
                    break;
            }
        }, this);

        //删除
        var _del =  _num.getChildByName("del");
        _del.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    InputRoomNumber2_LM(-1);;
                    break;
                default :
                    break;
            }
        }, this);

        return true;
    },
});



var FriendCard_LM_FindAgain_Layer = cc.Layer.extend({
    ctor:function (data, selfClubId, selfLMId) {
        this._super();
        var that = this;
        MjClient.FriendCard_FindAgain_ui = this;
        var UI = ccs.load("friendcard_findagain.json");
        this.addChild(UI.node);


        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], 2);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);

        if(isJinZhongAPPType())
            popupAnm(_back);

        var _btnClose = _back.getChildByName("close");
        _btnClose.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    this.removeFromParent();
                    break;
                default :
                    break;
            }
        }, this);

        var _headImg = _back.getChildByName("head");
        COMMON_UI.refreshHead(this, data.avatar,_headImg)
        var _text_1 = _back.getChildByName("Text_paiyouhui");
        _text_1.setString(unescape(data.title))
        var _text_2 = _back.getChildByName("Text_creator");
        _text_2.setFontName("Arial");
        _text_2.setString("创建者：" + getNewName(unescape(data.creatorName)));
        var _btn_refind = _back.getChildByName("btn_check");
        _btn_refind.addTouchEventListener(function (sender, Type) {
            if (Type == 2) {
                that.getParent().addChild(new FriendCard_LM_FindLayer(selfClubId, selfLMId));
                that.removeFromParent();
            }
        }, this);

        var _btn_enter = _back.getChildByName("btn_enter");
		_btn_enter.loadTextureNormal("friendCards_LM/yaoqingLM2_n.png");
        _btn_enter.addTouchEventListener(function (sender, Type) {
            if (Type == 2) {
                that.getParent().addChild(new FriendCard_LM_protocolDialog(true, function() {
                    FriendCard_LM_requestLM(selfClubId, selfLMId, data.clubId);
                }, function() {}));
                that.removeFromParent();
            }
        }, this);
    },
});

var FriendCard_LM_protocolDialog = cc.Layer.extend({
    ctor: function(byFaqi, sureCallBack, cancelCallBack) {
        this._super();
        var that = this;
        MjClient.protocolLMDialog = this;
        var ui = ccs.load("friendCard_LM_protocolDialog.json");
        this.addChild(ui.node);

        var block = ui.node.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], 2);

        var back = ui.node.getChildByName("back");
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);

        if (isJinZhongAPPType())
            popupAnm(back)

        var contextScrollView = back.getChildByName("contextScrollView");

        var richContext = new ccui.RichText();
        if (byFaqi) {
            var contextStr = "<font size='32' face='fonts/lanting.ttf' color='#000000'>" +
                "                                           联盟说明<br><br></font>" +

                "<font size='26' face='fonts/lanting.ttf' color='#000000'> <br>联盟模式：</font>" +
                "<font size='24' face='fonts/lanting.ttf' color='#101010'>　<br>" + 
                "1、  邀请其他亲友圈组成一个联盟，您将拥有设置、高级设置、修改规则等权限。<br>" +
                "2、  发起邀请后，须对方同意联盟，邀请通知保留3天，对方同意后须在3天内完成创建步骤。<br>" +
                "3、  联盟中所有亲友圈内的成员均可以自由组局，各亲友圈各自添加和管理自己的成员。<br>" +
                "4、  各会长及管理员都有解散房间等管理权限。<br>" +
                "5、  非联盟成员无法加入联盟房间，玩家不能主动加入联盟。<br>" +
                "6、  原有亲友圈将继续保留，一个亲友圈只能加入一个联盟。\n</font>" +

                "<font size='26' face='fonts/lanting.ttf' color='#000000'><br>重复人员：<br></font>" +
                "<font size='24' face='fonts/lanting.ttf' color='#101010'>" + 
                "1、  若同一玩家在两个亲友圈中都有特殊身份（盟主、会长、组长、助理），则这两个亲友圈不能联盟。<br>" +
                "2、  若同一玩家在两个亲友圈中都是普通成员时，保留加入时间更早的一个亲友圈成员身份。<br>" +
                "3、  若同一玩家在两个亲友圈中一边是成员，一边是特殊身份，则保留特殊身份。<br>" +
                "</font>";
        } else {
            var contextStr = "<font size='32' face='fonts/lanting.ttf' color='#000000'>" +
                "                                           联盟说明<br><br></font>" +

                "<font size='26' face='fonts/lanting.ttf' color='#000000'> <br>联盟模式：</font>" +
                "<font size='24' face='fonts/lanting.ttf' color='#101010'><br>" + 
                "1、  接受邀请组成联盟，您不能对联盟进行设置、高级设置、修改规则等操作。<br>" +
                "2、  联盟中所有亲友圈内的成员均可以自由组局，各亲友圈各自添加和管理自己的成员。<br>" +
                "3、  您在联盟中将拥有解散房间等管理员权限。<br>" +
                "4、  非联盟成员无法加入联盟房间，玩家不能主动加入联盟。<br>" +
                "5、  原有亲友圈将继续保留，一个亲友圈只能加入一个联盟。\n</font>" +

                "<font size='26' face='fonts/lanting.ttf' color='#000000'><br>重复人员：<br></font>" +
                "<font size='24' face='fonts/lanting.ttf' color='#101010'>" + 
                "1、  若同一玩家在两个亲友圈中都有特殊身份（盟主、会长、组长、助理），则这两个亲友圈不能联盟。<br>" +
                "2、  若同一玩家在两个亲友圈中都是普通成员，①创建联盟时，保留加入亲友圈时间更早的身份；②已有联盟时，保留联盟身份。<br>" +
                "3、  若同一玩家在两个亲友圈中一边是成员，一边是特殊身份，则保留特殊身份。<br>" +
                "</font>";
        }
        richContext.initWithXML(contextStr, null);
        richContext.setContentSize(contextScrollView.getContentSize());
        richContext.ignoreContentAdaptWithSize(false);
        contextScrollView.addChild(richContext);
        richContext.setPosition(contextScrollView.width/2, contextScrollView.height/2 + 100);
        contextScrollView.setInnerContainerSize(cc.size(contextScrollView.getInnerContainerSize().width, 600));

        var closeBtn = back.getChildByName("closeBtn");
        closeBtnAddLight(closeBtn)
        closeBtn.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    that.removeFromParent();
                    cancelCallBack();
                    break;
                default:
                    break;
            }
        }, this);

        var sureBtn = back.getChildByName("sureBtn");
        sureBtn.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    that.removeFromParent();
                    sureCallBack();
                    break;
                default:
                    break;
            }
        }, this);

        
    },
});

var FriendCard_LM_requestLM = function(selfClubId, selfMLId, otherClubId) {
    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.leagueInvite", {
            type: selfClubId ? 0 : 1,
            inviterId: selfClubId ? selfClubId: selfMLId,
            clubId: otherClubId
        },
        function(rtn) {
            MjClient.unblock();
            cc.log("FriendCard_LM_requestLM:", JSON.stringify(rtn));
            if (rtn.code == 0)
                MjClient.showToast("已发送邀请！");
            else{
                if ((rtn.specialList && rtn.specialList.length > 0) ||
                    (rtn.specMatchUserList && rtn.specMatchUserList.length > 0)) {
                    MjClient.Scene.addChild(new FriendCard_LM_failDialog(rtn.specialList,rtn.specMatchUserList));
                }else{
                    FriendCard_Common.serverFailToast(rtn);
                }
            }
        }
    );
}

var FriendCard_LM_answerLM = function(data, yesOrNo, callback) {
    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.answerLeagueInvite", {
            type: data.type,
            inviterId: data.inviterId,
            clubId: data.clubId,
            action: yesOrNo ? 1 : 0
        },
        function(rtn) {
            MjClient.unblock();
            cc.log("FriendCard_LM_answerLM:", JSON.stringify(rtn));
            if (rtn.code == 0) {
                MjClient.showToast("发送成功！");
            } else {
                if ((rtn.specialList && rtn.specialList.length > 0) ||
                    (rtn.specMatchUserList && rtn.specMatchUserList.length > 0)) {
                    MjClient.Scene.addChild(new FriendCard_LM_failDialog(rtn.specialList,rtn.specMatchUserList));
                }else{
                    FriendCard_Common.serverFailToast(rtn);
                }
            }

            // 同意联盟后，移除本俱乐部已接收到的其他联盟邀请
            // 不同意或失败，只移除相印邀请信息
            FriendCard_LM_removeInviteMsg(rtn.code == 0 && yesOrNo ? null : data.inviterId, data.clubId);
            callback();
        }
    );
}

var FriendCard_LM_acceptDialog = cc.Layer.extend({
    ctor: function(data) {
        this._super();
        var that = this;
        MjClient.acceptLMDialog = this;

        var ui = ccs.load("friendCard_LM_acceptDialog.json");
        this.addChild(ui.node);

        var block = ui.node.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], 2);

        var back = ui.node.getChildByName("back");
        setWgtLayout(back, [0.64, 0.78], [0.5, 0.5], [0, 0]);

        if (isJinZhongAPPType())
            popupAnm(back)

        var _headImg = back.getChildByName("head");
        COMMON_UI.refreshHead(this,data.inviterHeadUrl,_headImg)
        
        var clubOrLMName = back.getChildByName("clubOrLMName");
        clubOrLMName.ignoreContentAdaptWithSize(true);
        clubOrLMName.setString(unescape(data.inviterTitle));

        var userName = back.getChildByName("userName");
        userName.ignoreContentAdaptWithSize(true);
        userName.setFontName("Arial");
        userName.setString(unescape(data.inviterName));

        var msg = back.getChildByName("msg");
        var str = "对方邀请与你的亲友圈：" + unescape(data.clubTitle) + "(" + data.clubId + ")联盟，是否接受?";
        msg.setString(str);

        var removeThat = function() {
            MjClient.acceptMLDialog = null;
            that.removeFromParent();
        }

        var sureBtn = back.getChildByName("yes");
        sureBtn.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var protocolDialog = new FriendCard_LM_protocolDialog(false, function() {
                        FriendCard_LM_answerLM(data, true, removeThat);
                    }, function() {
                        //FriendCard_LM_answerLM(data, false, removeThat);
                    });
                    that.getParent().addChild(protocolDialog);
                    break;
                default:
                    break;
            }
        }, this);

        var cancelBtn = back.getChildByName("no");
        cancelBtn.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    FriendCard_LM_answerLM(data, false, removeThat);
                    break;
                default:
                    break;
            }
        }, this);

        var closeBtn = back.getChildByName("close");
        closeBtn.setVisible(false);
        closeBtn.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    FriendCard_LM_answerLM(data, false, removeThat);
                    break;
                default:
                    break;
            }
        }, this);
    },
});

var FriendCard_LM_agreementDialog = cc.Layer.extend({
    ctor: function(data) {
        this._super();
        var that = this;
        MjClient.agreementLMDialog = this;
        var ui = ccs.load("friendCard_LM_acceptDialog.json");
        this.addChild(ui.node);
        this.setName("agreeInvite" + data.inviterId + data.clubId);

        var block = ui.node.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], 2);

        var back = ui.node.getChildByName("back");
        setWgtLayout(back, [0.64, 0.78], [0.5, 0.5], [0, 0]);

        if (isJinZhongAPPType())
            popupAnm(back)

        var _headImg = back.getChildByName("head");
        COMMON_UI.refreshHead(this,data.headimgurl,_headImg)
        var clubOrLMName = back.getChildByName("clubOrLMName");
        clubOrLMName.ignoreContentAdaptWithSize(true);
        clubOrLMName.setString(unescape(data.clubTitle));

        var userName = back.getChildByName("userName");
        userName.ignoreContentAdaptWithSize(true);
        userName.setFontName("Arial");
        userName.setString(unescape(data.nickname));

        var msg = back.getChildByName("msg");
        var str = "对方已同意与你联盟，请点击下方按钮创建联盟亲友圈并配置规则。";
        msg.setString(str);

        back.getChildByName("no").setVisible(false);
        back.getChildByName("close").setVisible(false);

        var sureBtn = back.getChildByName("yes");
        sureBtn.loadTextureNormal("friendCards_LM/createLM.png");
        sureBtn.x = back.width/2;
        sureBtn.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    that.getParent().addChild(new FriendCard_LM_info(null, null, null, "createLM", data.inviterId, data.clubId));
                    break;
                default:
                    break;
            }
        }, this);

        UIEventBind(null, that, "createLM_ret", function(rtn) {
            FriendCard_LM_removeInviteMsg(data.inviterId, data.clubId);
            that.removeFromParent();
        });
    },
});

var FriendCard_LM_failDialog = cc.Layer.extend({
    ctor: function(specialList, specMatchUserList) {
        this._super();
        var that = this;
        var ui = ccs.load("friendCard_LM_failDialog.json");
        this.addChild(ui.node);

        var block = ui.node.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], 2);

        var back = ui.node.getChildByName("back");
        setWgtLayout(back, [back.width/1280, back.height/720], [0.5, 0.5], [0, 0]);

        if (isJinZhongAPPType())
            popupAnm(back);
        if(!specialList){
            specialList = [];
        }
        if(!specMatchUserList){
            specMatchUserList = [];
        }
        var context = back.getChildByName("context");
        context.setFontName("Arial");
        var str = "";
        for (var i = 0; i < specialList.length; i++) {
            if(i == 0){
                str += "联盟失败，不可在不同联盟亲友圈中同时担任特殊身份。如助理、组长等。\n";
            }
            str += (i + 1) + "、" + unescape(specialList[i].nickname) + " " + specialList[i].userId + "\n";
        }
        if(specialList.length > 0){
            str += "\n";
        }
        for (var i = 0; i < specMatchUserList.length; i++) {
            if(i == 0){
                str += "联盟失败，玩家亲友圈从属关系发生变化，请先联系以下玩家退赛或拒绝该玩家的参赛申请。\n";
            }
            str += (i + 1) + "、" + unescape(specMatchUserList[i].nickname) + " " + specMatchUserList[i].userId + "\n";
        }
        context.setString(str);

        var closeBtn = back.getChildByName("closeBtn");
        closeBtnAddLight(closeBtn)
        closeBtn.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    that.removeFromParent();
                    break;
                default:
                    break;
            }
        }, this);

        var sureBtn = back.getChildByName("sureBtn");
        sureBtn.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    that.removeFromParent();
                    break;
                default:
                    break;
            }
        }, this);
    },
});

// 联盟 被邀请联盟/俱乐部同意(拒绝邀请发邮件）
var FriendCard_LM_handleInviteMsg = function(mainUi) {
    var that = mainUi;

    var action = cc.repeatForever(cc.sequence(cc.delayTime(0.2), cc.callFunc(function() {
        var list = MjClient.league_club_invite_list;
        if (!list || list.length == 0)
            return;

        var haveLMDialog = cc.sys.isObjectValid(MjClient.acceptLMDialog) || cc.sys.isObjectValid(MjClient.agreementLMDialog);
        if (haveLMDialog)
            return;

        if (list[0].action == "sendInvite") {// 被邀请联盟
            that.addChild(new FriendCard_LM_acceptDialog(list[0]));
        }
        else {// if (rtn.action == "agreeinvite") // 俱乐部同意
            that.addChild(new FriendCard_LM_agreementDialog(list[0]));
        }
    })));

    that.runAction(action);
}

var FriendCard_LM_removeInviteMsg = function(inviterId, clubId) {
    var list = MjClient.league_club_invite_list;
    if (!list || list.length == 0)
        return; 

    for (var i = list.length - 1; i >= 0; i --) {
        if ((inviterId == null || list[i].inviterId == inviterId) && list[i].clubId == clubId) {
            list.splice(i, 1);
        }
    }
}
