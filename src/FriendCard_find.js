/*
* @Author: lms
* @Date:   2017-11-21 21:41:46
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-25 10:51:09
*/
function InputRoomNumber2(n)
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
           FindFriendCard(clubId, MjClient.friendcard_ui.getParent());
		   MjClient.friendcard_ui.removeFromParent(true);
	   }
    }
}

function FindFriendCard(clubId, parent) {
    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.clubInfo", {
            clubId: clubId
        },
        function(rtn) {
            MjClient.unblock();
            if (rtn.code == 0) {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Qinyouquan_cetan_Jiaruqinyouquan_Chenggong", {uid:SelfUid()});
                if (parent && cc.sys.isObjectValid(parent))
                    parent.addChild(new FriendCard_FindAgain_Layer(rtn.data));

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



function ApplyFriendCard(clubId) {
    MjClient.block();
    MjClient.gamenet.request("pkplayer.handler.clubApply", {clubId : clubId},
        function(rtn) {
            MjClient.unblock();
            if (rtn.message) {
                MjClient.showToast(rtn.message);
                if (MjClient.FriendCard_FindAgain_ui && cc.sys.isObjectValid(MjClient.FriendCard_FindAgain_ui)) {
                    MjClient.FriendCard_FindAgain_ui.removeFromParent();
                }
            } else {
                MjClient.showToast("申请失败");
            }
        }
    );
}

function EnterAddText2()
{
	var idx=parseInt(this.getName()[2]+"");
	var enterfriendcode=MjClient.enterfriendcode;
	if(idx<enterfriendcode.length)
	{
		this.getChildByName("Text").setString(enterfriendcode[idx]);
	}
	else this.getChildByName("Text").setString("");
}
function EmptyString2(){return "";}

var FriendCardFindLayer = cc.Layer.extend({
    sprite:null,
	jsBind:{
		back:
		{
			top:{
				bg0:{ _event:{ EnterAddText2:EnterAddText2  } ,Text:{ _text:EmptyString2 }  },
				bg1:{ _event:{ EnterAddText2:EnterAddText2  } ,Text:{ _text:EmptyString2 }  },
				bg2:{ _event:{ EnterAddText2:EnterAddText2  } ,Text:{ _text:EmptyString2 }  },
				bg3:{ _event:{ EnterAddText2:EnterAddText2  } ,Text:{ _text:EmptyString2 }  },
				bg4:{ _event:{ EnterAddText2:EnterAddText2  } ,Text:{ _text:EmptyString2 }  },
				bg5:{ _event:{ EnterAddText2:EnterAddText2  } ,Text:{ _text:EmptyString2 }  }
			}
		},
	},
    ctor:function () {
        this._super();
        var that = this;
        var friendcard_ui = ccs.load("friendcard_find.json");
		BindUiAndLogic(friendcard_ui.node,this.jsBind);
        this.addChild(friendcard_ui.node);
		MjClient.friendcard_ui=this;
		MjClient.enterfriendcode=[];

        var _block = friendcard_ui.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], 2);

        var _back = friendcard_ui.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);

        if(isJinZhongAPPType())
            popupAnm(_back)

        var _btnClose = _back.getChildByName("close");
        _btnClose.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Qinyouquan_cetan_Jiaruqinyouquan_Close", {uid:SelfUid()});
                    that.removeFromParent();
                    break;
                default :
                    break;
            }
        }, this);

        //数字按键
        var _num = _back.getChildByName("num");
        function numBtnTouchEvent(sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                var itag = sender.getTag();
                cc.log(" ===== itag : ",itag);
                InputRoomNumber2(itag);
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
                    InputRoomNumber2(-2);
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
                    InputRoomNumber2(-1);;
                    break;
                default :
                    break;
            }
        }, this);

        return true;
    },
});


var FriendCard_FindAgain_Layer = cc.Layer.extend({
    ctor:function (data) {
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
        var _headImgContentSize = _headImg.getContentSize();
        var url = data.avatar;
        if(!url) url="png/default_headpic.png";
        MjClient.loadImgQX(url, {isCrossOrigin : true}, function(err, texture)
        {
            if(!err&&texture&&sys.isObjectValid(_headImg))
            {
                var headSprite = new cc.Sprite(texture);
                if(FriendCard_Common.getSkinType() == 1)
                {
                    var clippingNode = new cc.ClippingNode();
                    var mask = new cc.Sprite("friendCards/common/headMask_da.png");
                    clippingNode.setAlphaThreshold(0);
                    clippingNode.setStencil(mask);

                    headSprite.setScale(mask.getContentSize().width/headSprite.getContentSize().width);
                    clippingNode.addChild(headSprite);
                    clippingNode.setScale(0.999);

                    clippingNode.setPosition(_headImg.getContentSize().width/2,_headImg.getContentSize().height/2);

                    _headImg.addChild(clippingNode);
                }
                else if(FriendCard_Common.getSkinType() == 2 || FriendCard_Common.getSkinType() == 3 || FriendCard_Common.getSkinType() == 4)
                {
                    var clippingNode = new cc.ClippingNode();
                    var mask = new cc.Sprite("friendCards/common/headMask1.png");
                    clippingNode.setAlphaThreshold(0);
                    clippingNode.setStencil(mask);

                    headSprite.setScale(mask.getContentSize().width/headSprite.getContentSize().width);
                    clippingNode.addChild(headSprite);
                    clippingNode.setScale(0.999);

                    clippingNode.setPosition(_headImg.getContentSize().width/2,_headImg.getContentSize().height/2)

                    var hideblock = new cc.Sprite("friendCards/common/head_kuang1.png");
                    hideblock.setPosition(_headImg.getContentSize().width / 2, _headImg.getContentSize().height / 2);
                    _headImg.addChild(clippingNode);
                    _headImg.addChild(hideblock);
                }
                else
                {
                    headSprite.setPosition(_headImgContentSize.width/2, _headImgContentSize.height/2);
                    headSprite.setScale((_headImgContentSize.width-8)/headSprite.getContentSize().width);
                    _headImg.addChild(headSprite);
                }
            }
        });
        var _text_1 = _back.getChildByName("Text_paiyouhui");
        _text_1.setString(unescape(data.title))
        var _text_2 = _back.getChildByName("Text_creator");
        _text_2.setString("创建者：" + getNewName(unescape(data.creatorName)));
        var _btn_refind = _back.getChildByName("btn_check");
        _btn_refind.addTouchEventListener(function (sender, Type) {
            if (Type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Qinyouquan_cetan_Jiaruqinyouquan_Chazhaoqueren_Chongxinchazhao", {uid:SelfUid()});
                that.getParent().addChild(new FriendCardFindLayer());
                that.removeFromParent();
            }
        }, this);

        var _btn_enter = _back.getChildByName("btn_enter");
        _btn_enter.addTouchEventListener(function (sender, Type) {
            if (Type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Qinyouquan_cetan_Jiaruqinyouquan_Chazhaoqueren_Shenqingjiaru", {uid:SelfUid()});
                ApplyFriendCard(data.clubId)
            }
        }, this);


    },
});








