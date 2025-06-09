var FriendCard_Match_Create = cc.Layer.extend({
    ctor: function(clubData, successCallback) {
        this._super();
        var that = this;
        that.clubData = clubData;
        that.clubId = clubData.info.clubId;
        that.isLM = FriendCard_Common.getClubisLM(clubData.info);
        that.successCallback = successCallback;

        var node = ccs.load("friendcard_Match_create.json").node;
        that.addChild(node);
        that.uinode = node;
        that.panel = node.getChildByName("Panel");
        COMMON_UI.setNodeTextAdapterSize(node);
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5,0.5], [0, 0], true);
        setWgtLayout(this.panel, [1, 1], [0.5,0.5], [0, 0]);
        popupAnm(that.panel);
        this.init();
    },
    init: function(){
    	var that = this;
    	//比赛名称
    	var imgMatchName = that.panel.getChildByName("img_matchName");
    	var matchNameEditBox = new cc.EditBox(imgMatchName.getContentSize(), new cc.Scale9Sprite("friendCards/common/img_dikuang.png"));
        matchNameEditBox.setFontColor(cc.color("#443333"));
        matchNameEditBox.setMaxLength(8);
        matchNameEditBox.setFontSize(30);
        //matchNameEditBox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        matchNameEditBox.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        matchNameEditBox.setFontName("fonts/lanting.TTF");
        matchNameEditBox.setPlaceholderFontSize(30);
        matchNameEditBox.setPlaceHolder("点击输入比赛名称，最多八个字");
        matchNameEditBox.setPosition(imgMatchName.width / 2, imgMatchName.height / 2);
        imgMatchName.addChild(matchNameEditBox);
        that.matchNameEditBox = matchNameEditBox;

        //比赛时长
        that.matchTimeList = [];
        that.matchTimeList.selectIndex = util.localStorageEncrypt.getNumberItem("FriendCard_Match_MatchTimeIdx_" + that.clubId, 4);

        
        var onClickTime = function(index){
        	if (index>=5 || index<0) {
        		return;
        	}
        	for (var i = 0; i < 5; i++) {
        		that.matchTimeList[i].setSelected(false);
        	}
        	that.matchTimeList[index].setSelected(true);
        	that.matchTimeList.selectIndex = index;

        }
        for (var i = 0; i < 5; i++) {
        	that.matchTimeList[i] = that.panel.getChildByName("checkBox_time" + i);
        	that.matchTimeList[i]._index = i;
        	that.matchTimeList[i].addTouchEventListener(function(sender, type) {
				if (type == 2){
					that.runAction(cc.callFunc(function() {
	                    onClickTime(sender._index);
	                }));  
					
				}
			}, that);
			that.matchTimeList[i].getChildByName("text").addTouchEventListener(function(sender, type) {
				if (type == 2){
					that.runAction(cc.callFunc(function() {
	                    onClickTime(sender.getParent()._index);  
	                }));  
				}
			}, that);
        }
        onClickTime(that.matchTimeList.selectIndex);

        //比赛分数
        var maxMatchPoint = 10000;//最大值
        var minMatchPoint = 0;//最小值
        var matchOffset = 50;//档位
        var matchMaxPercent = (maxMatchPoint - minMatchPoint)/matchOffset;
        var slider_matchPoint = that.panel.getChildByName("slider_matchPoint");
        slider_matchPoint.setMaxPercent(matchMaxPercent);
        var matchPoint = util.localStorageEncrypt.getNumberItem("FriendCard_Match_MatchPoint_" + that.clubId, 1000);
        var matchPercent = matchPoint/matchOffset;
        var sliderWidth = slider_matchPoint.getContentSize().width;
        var startPosX = slider_matchPoint.getPositionX() - sliderWidth/2;
        var txt_matchPointSel = that.panel.getChildByName("txt_matchPointSel");
        that.txtMatchPointSel = txt_matchPointSel;
        slider_matchPoint.setPercent(matchPercent);
        txt_matchPointSel.setString(matchPoint.toString());
	    txt_matchPointSel.setPositionX(startPosX + sliderWidth*matchPercent/matchMaxPercent);
        slider_matchPoint.addEventListener(function (sender, type) {
	        switch (type) {
	            case ccui.Slider.EVENT_PERCENT_CHANGED:
	                var slider = sender;
	                var percent = slider.getPercent();
	                txt_matchPointSel.setString(minMatchPoint + percent.toFixed(0)*matchOffset);
	                txt_matchPointSel.setPositionX(startPosX + sliderWidth*percent/matchMaxPercent);
	                break;
	            default:
	                break;
	        }
	    },that);
        that.panel.getChildByName("btn_matchPointSub").addTouchEventListener(function(sender, type) {
            if (type == 2){
                var percent = slider_matchPoint.getPercent();
                percent--;
                if (percent < 0) {
                    percent = 0;
                }
                slider_matchPoint.setPercent(percent);
                txt_matchPointSel.setString(minMatchPoint + percent.toFixed(0)*matchOffset);
                txt_matchPointSel.setPositionX(startPosX + sliderWidth*percent/matchMaxPercent);
            }
        }, that);
        that.panel.getChildByName("btn_matchPointAdd").addTouchEventListener(function(sender, type) {
            if (type == 2){
                var percent = slider_matchPoint.getPercent();
                percent++;
                if (percent > matchMaxPercent) {
                    percent = matchMaxPercent;
                }
                slider_matchPoint.setPercent(percent);
                txt_matchPointSel.setString(minMatchPoint + percent.toFixed(0)*matchOffset);
                txt_matchPointSel.setPositionX(startPosX + sliderWidth*percent/matchMaxPercent);
            }
        }, that);

	    //淘汰分数
        var maxOutPoint = 10000;//最大值
        var minOutPoint = -2000;//最小值
        var outOffset = 50;//档位
        var outMaxPercent = (maxOutPoint - minOutPoint)/outOffset;
	    var outPoint = util.localStorageEncrypt.getNumberItem("FriendCard_Match_OutPoint_" + that.clubId, 100);
        var outPercent = (outPoint - minOutPoint)/outOffset;
	    var slider_outPoint = that.panel.getChildByName("slider_outPoint");
        slider_outPoint.setMaxPercent(outMaxPercent);        
        var sliderWidth1 = slider_outPoint.getContentSize().width;
        var startPosX1 = slider_outPoint.getPositionX() - sliderWidth1/2;
        var txt_outPointSel = that.panel.getChildByName("txt_outPointSel");
        that.txtOutPointSel = txt_outPointSel;
        slider_outPoint.setPercent(outPercent);
        txt_outPointSel.setString(outPoint);
	    txt_outPointSel.setPositionX(startPosX + sliderWidth*outPercent/outMaxPercent);
        slider_outPoint.addEventListener(function (sender, type) {
	        switch (type) {
	            case ccui.Slider.EVENT_PERCENT_CHANGED:
	                var slider = sender;
	                var percent = slider.getPercent();
	                txt_outPointSel.setString(minOutPoint+percent.toFixed(0)*outOffset);
	                txt_outPointSel.setPositionX(startPosX1 + sliderWidth1*percent/outMaxPercent);
	                break;
	            default:
	                break;
	        }
	    },that)
        that.panel.getChildByName("btn_outPointSub").addTouchEventListener(function(sender, type) {
            if (type == 2){
                var percent = slider_outPoint.getPercent();
                percent--;
                if (percent < 0) {
                    percent = 0;
                }
                slider_outPoint.setPercent(percent);
                txt_outPointSel.setString(minOutPoint + percent.toFixed(0)*outOffset);
                txt_outPointSel.setPositionX(startPosX1 + sliderWidth1*percent/outMaxPercent);
            }
        }, that);
        that.panel.getChildByName("btn_outPointAdd").addTouchEventListener(function(sender, type) {
            if (type == 2){
                var percent = slider_outPoint.getPercent();
                percent++;
                if (percent > outMaxPercent) {
                    percent = outMaxPercent;
                }
                slider_outPoint.setPercent(percent);
                txt_outPointSel.setString(minOutPoint + percent.toFixed(0)*outOffset);
                txt_outPointSel.setPositionX(startPosX1 + sliderWidth1*percent/outMaxPercent);
            }
        }, that);

	    //公告
	    that.noticeList = [];
	    for(var i = 0; i<3; i++)
	    {
	    	var img_nortice = that.panel.getChildByName("img_nortice" + i);
	    	var noticeEditBox = new cc.EditBox(imgMatchName.getContentSize(), new cc.Scale9Sprite("friendCards/common/img_dikuang.png"));
	        noticeEditBox.setFontColor(cc.color("#443333"));
	        noticeEditBox.setMaxLength(20);
	        noticeEditBox.setFontSize(30);
	        //noticeEditBox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
	        noticeEditBox.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
	        noticeEditBox.setFontName("fonts/lanting.TTF");
	        noticeEditBox.setPlaceholderFontSize(30);
	        noticeEditBox.setPlaceHolder("点击输入比赛公告，最多20个字");
	        noticeEditBox.setPosition(img_nortice.width / 2, img_nortice.height / 2);
	        img_nortice.addChild(noticeEditBox);
	        that.noticeList[i] = noticeEditBox;
	    }

	    that.panel.getChildByName("Button_Cancel").addTouchEventListener(function(sender, type) {
			if (type == 2){
				that.removeFromParent();
			}
		}, that);
        var _close = that.panel.getChildByName("close");
        closeBtnAddLight(_close);
		_close.addTouchEventListener(function(sender, type) {
			if (type == 2){
				that.removeFromParent();
			}
		}, that);

		that.panel.getChildByName("Button_Create").addTouchEventListener(function(sender, type) {
			if (type == 2){
                var matchPointPercent = slider_matchPoint.getPercent();
                var outPointPercent = slider_outPoint.getPercent();
                var matchPoint = minMatchPoint + matchPointPercent.toFixed(0) * matchOffset;
                var outPoint = minOutPoint + outPointPercent.toFixed(0) * outOffset;
                if (that.matchNameEditBox.getString().length <= 0) {
                    MjClient.showToast("比赛名称为空!");
                    return; 
                }
                if(matchPoint<= outPoint){
                    MjClient.showToast("比赛分数必须大于淘汰分数！");
                    return; 
                }

                util.localStorageEncrypt.setNumberItem("FriendCard_Match_MatchPoint_" + that.clubId, matchPoint);
                util.localStorageEncrypt.setNumberItem("FriendCard_Match_OutPoint_" + that.clubId, outPoint);
                util.localStorageEncrypt.setNumberItem("FriendCard_Match_MatchTimeIdx_" + that.clubId, that.matchTimeList.selectIndex);
                that.requestCreateMatch();
				that.removeFromParent();
			}
		}, that);
    },
    requestCreateMatch:function(){
        var that = this;
        var sendInfo = {};

        if (that.isLM)
            sendInfo.leagueId = that.clubId;
        else
            sendInfo.clubId = that.clubId;
        sendInfo.title = that.matchNameEditBox.getString();
        sendInfo.scoreInitial = that.txtMatchPointSel.getString();
        sendInfo.scoreBottom = that.txtOutPointSel.getString();
        sendInfo.day = [1,3,7,15,30][that.matchTimeList.selectIndex];
        sendInfo.notice1 = that.noticeList[0].getString();
        sendInfo.notice2 = that.noticeList[1].getString();
        sendInfo.notice3 = that.noticeList[2].getString();
        sendInfo.matchType = 1;//比赛类型，0:单个比赛名额审核（旧） 1:团队授权分审核（新）
        MjClient.block();
        var api = that.isLM ? "pkplayer.handler.leagueCreateMatch" : "pkplayer.handler.clubCreateMatch";
        MjClient.gamenet.request(api, sendInfo, function(rtn) {
            MjClient.unblock();
            if (rtn.code == 0) {
                if(that.successCallback){
                    that.successCallback();
                }
                postEvent("matchInfoChange", {});
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
        }); 
    },

})


var Friendcard_Match_prolongTime = cc.Layer.extend({
    ctor: function(param) {
    	var that = this;
        that._super();
        var uiNode = ccs.load("friendcard_Match_prolongTime.json").node;
        that.addChild(uiNode);
        var block = uiNode.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0],true);

        var back = uiNode.getChildByName("back");
        that.panel = back;
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        popupAnm(back);
        //比赛时长
        that.matchTimeList = [];
        that.matchTimeList.selectIndex = 0;
        var onClickTime = function(index){
        	if (index>=5 || index<0) {
        		return;
        	}
        	for (var i = 0; i < 5; i++) {
        		that.matchTimeList[i].setSelected(false);
        	}
        	that.matchTimeList[index].setSelected(true);
        	that.matchTimeList.selectIndex = index;

        }
        for (var i = 0; i < 5; i++) {
        	that.matchTimeList[i] = that.panel.getChildByName("checkBox_time" + i);
        	that.matchTimeList[i]._index = i;
            if(i == 4){//需求：去掉30天选项
                that.matchTimeList[i].visible = false;
            }
        	that.matchTimeList[i].addTouchEventListener(function(sender, type) {
				if (type == 2){
					that.runAction(cc.callFunc(function() {
	                    onClickTime(sender._index);
	                }));  
					
				}
			}, that);
			that.matchTimeList[i].getChildByName("text").addTouchEventListener(function(sender, type) {
				if (type == 2){
					that.runAction(cc.callFunc(function() {
	                    onClickTime(sender.getParent()._index);  
	                }));  
				}
			}, that);
        }
        onClickTime(that.matchTimeList.selectIndex);


        back.getChildByName("btn_close").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent(true)
            }
        }, that);

        back.getChildByName("btn_cancel").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent(true)
            }
        }, that);

        var btn_confirm = back.getChildByName("btn_confirm");
        btn_confirm.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent(true);
                var sendInfo = {}
                if (param.isLM)
                    sendInfo.leagueId = param.clubId;
                else
                    sendInfo.clubId = param.clubId;
                sendInfo.extendDay = [1,3,7,15,30][that.matchTimeList.selectIndex];
                sendInfo.matchId = param.matchId;
                MjClient.block();
                var api = param.isLM ? "pkplayer.handler.leagueMatchExtend" : "pkplayer.handler.clubMatchExtend";
                cc.log("api = " + api +"sendInfo = " + JSON.stringify(sendInfo));
                MjClient.gamenet.request(api, sendInfo, function(rtn) {
                    MjClient.unblock();
                    if (rtn.code == 0) {
                        postEvent("matchInfoChange", {});
                    } else {
                        FriendCard_Common.serverFailToast(rtn);
                    }
                }); 

            }
        }, that);
        var Text_tip = back.getChildByName("Text_tip");  
        var posX = Text_tip.x - Text_tip.width/2;  
        Text_tip.setString("最多只可以延长一次,总天数不超过30天."); 
        Text_tip.setAnchorPoint(cc.p(0, 0.5));
        Text_tip.ignoreContentAdaptWithSize(true);  
        Text_tip.x = posX; 
    },
});



var Friendcard_Match_deleteMatch = cc.Layer.extend({
    ctor: function(param) {
        this._super();
        var uiNode = ccs.load("friendcard_Match_deleteMatch.json").node;
        this.addChild(uiNode);
        var block = uiNode.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0],true);

        var back = uiNode.getChildByName("back");
        this.panel = back;
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        popupAnm(back)

        var btn_close = back.getChildByName("btn_close");
        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true)
            }
        }, this);

        back.getChildByName("btn_cancel").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true)
            }
        }, this);

        var btn_confirm = back.getChildByName("btn_confirm");
        
        btn_confirm.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true);
                var sendInfo = {}
                if (param.isLM)
                    sendInfo.leagueId = param.clubId;
                else
                    sendInfo.clubId = param.clubId;
                sendInfo.status = 2; //0 关闭允许报名 1 允许报名 2 删除比赛
                sendInfo.matchId = param.matchId;
                MjClient.block();
                var api = param.isLM ? "pkplayer.handler.leagueMatchChangeStatus" : "pkplayer.handler.clubMatchChangeStatus";

                MjClient.gamenet.request(api, sendInfo, function(rtn) {
                    MjClient.unblock();
                    if (rtn.code == 0) {
                        postEvent("matchInfoChange", {});
                    } else {
                        if (rtn.code == -1 && rtn.matchUserList) {
                             MjClient.Scene.addChild(new Friendcard_Match_changeRightTip(rtn.matchUserList, 1, rtn.message));
                        }else{
                            FriendCard_Common.serverFailToast(rtn);
                        }
                    }
                }); 

            }
        }, this);

        var timeLabel = back.getChildByName("txt_time");
        var time = 20;
        // if (cc.sys.OS_WINDOWS == cc.sys.os){
        //     time = 1;
        // }
        timeLabel.setString(time);
        timeLabel.setVisible(true);
        timeLabel.ignoreContentAdaptWithSize(true);
        btn_confirm.setEnabled(false);
        btn_confirm.schedule(function() {
            if (time == 0) {
            	back.getChildByName("txt_timeOverTip").setVisible(false);
                back.getChildByName("Image_timeBg").setVisible(false);
                timeLabel.setVisible(false);
                btn_confirm.setEnabled(true);
                btn_confirm.unscheduleAllCallbacks();
            }
            time --;
            timeLabel.setString(time);
        }, 1);
        
        return true;
    },
    
});

var Friendcard_Match_closeMatch = cc.Layer.extend({
    ctor: function(param) {
        this._super();
        var uiNode = ccs.load("friendcard_Match_closeMatch.json").node;
        this.addChild(uiNode);
        var block = uiNode.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0],true);

        var back = uiNode.getChildByName("back");
        this.panel = back;
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        popupAnm(back)

        back.getChildByName("btn_close").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (param.noCallback) {
                    param.noCallback();
                }
                this.removeFromParent(true)
            }
        }, this);

        back.getChildByName("btn_cancel").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (param.noCallback) {
                    param.noCallback();
                }
                this.removeFromParent(true)
            }
        }, this);
        var btn_confirm = back.getChildByName("btn_confirm");
        btn_confirm.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (param.yesCallback) {
                    param.yesCallback();
                }
                this.removeFromParent(true);
            }
        }, this);

        var timeLabel = back.getChildByName("txt_time");
        var time = 20;
        timeLabel.setString(time);
        timeLabel.setVisible(true);
        timeLabel.ignoreContentAdaptWithSize(true);
        btn_confirm.setEnabled(false);
        btn_confirm.schedule(function() {
            if (time == 0) {
                back.getChildByName("txt_timeOverTip").setVisible(false);;
            	back.getChildByName("Image_timebg").setVisible(false);;
                timeLabel.setVisible(false);
                btn_confirm.setEnabled(true);
                btn_confirm.unscheduleAllCallbacks();
            }
            time --;
            timeLabel.setString(time);
        }, 1);
        
        return true;
    },   
});

var Friendcard_Match_confirmBox = cc.Layer.extend({
    ctor: function(param) {
        this._super();
        var uiNode = ccs.load("friendcard_Match_confirmBox.json").node;
        this.uiNode = uiNode;
        this.addChild(uiNode);
        var block = uiNode.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0],true);

        var back = uiNode.getChildByName("back");
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        popupAnm(back)

        
        back.getChildByName("txt_title").setString(param.title);
        back.getChildByName("txt_content").setString(param.content);
        back.getChildByName("btn_confirm").addTouchEventListener(function(sender, type) {
            if (type == 2) {
            	if (param.yesCallback) {
            		param.yesCallback();
            	}
                this.removeFromParent(true);
            }
        }, this);
        back.getChildByName("btn_cancel").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (param.noCallback) {
                    param.noCallback();
                }
                this.removeFromParent(true)
            }
        }, this);
        if (param.bHideBtnCancel) {
            back.getChildByName("btn_cancel").visible = false;
            back.getChildByName("btn_confirm").x = (back.getChildByName("btn_confirm").x + back.getChildByName("btn_cancel").x)/2;
        }
        back.getChildByName("btn_close").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (param.noCallback) {
                    param.noCallback();
                }
                this.removeFromParent(true)
            }
        }, this);
        return true;
    },
    
});

var Friendcard_Match_createTip = cc.Layer.extend({
    ctor: function(param) {
        var that = this;
        that._super();
        var uiNode = ccs.load("friendcard_Match_createTip.json").node;
        that.addChild(uiNode);
        var block = uiNode.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0],true);

        var back = uiNode.getChildByName("back");
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        popupAnm(back);

        var txt_content = back.getChildByName("txt_content");
        var btn_create = back.getChildByName("btn_create");
        var roleText = FriendCard_Common.getRoleTextByRoleId(param.clubData.roleId);
        if (roleText == '会长' || roleText == "盟主") 
        {
            txt_content.setString("您还没有创建任何比赛");
            btn_create.setVisible(true);
        }
        else
        {
            btn_create.setVisible(false);
            txt_content.setString("亲友圈管理员暂时未创建比赛")
        }
        btn_create.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                // this.removeFromParent(true);
                // if (param.yesCallback) {
                //     param.yesCallback();
                // }   
                var createSuccessCb = function(){
                    that.removeFromParent();
                }
                that.getParent().addChild(new FriendCard_Match_Create(param.clubData, createSuccessCb));
            }
        }, that);
        back.getChildByName("btn_close").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(true);
                if (param.noCallBack) {
                    param.noCallBack();
                }
            }
        }, that);
         UIEventBind(null, that, "createMatchSuccess", function(eD) {
            that.removeFromParent(true);
        });
        return true;
    },
    
});

//审核权限
var FriendCard_Match_CheckRight = cc.Layer.extend({
    onExit:function(){
        this._super();
        FriendCard_UI.FriendCard_Match_CheckRight = null;
    },
    ctor: function(clubData) {
        this._super();
        var that = this;
        that.maxScore = 900000;

        FriendCard_UI.FriendCard_Match_CheckRight = this;
        that.clubData = clubData;
        that.clubId = clubData.info.clubId;
        that.isLM = FriendCard_Common.getClubisLM(clubData.info);
        that.ver =  util.localStorageEncrypt.getNumberItem("FriendCard_Match_Version" + that.clubId, 1);; // 0:旧版 1：新版
        if (FriendCard_Common.getSkinType() == 4 || that.isLM) {
            //湖北皮肤没有旧版
            that.ver = 1;
        }

        var node = ccs.load("friendcard_Match_checkRight.json").node;
        that.addChild(node);
        that.uinode = node;
        that.panel = node.getChildByName("Panel");
        COMMON_UI.setNodeTextAdapterSize(node);
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5,0.5], [0, 0], true);
        setWgtLayout(this.panel, [1, 1], [0.5,0.5], [0, 0]);
        popupAnm(that.panel);

        var _close = that.panel.getChildByName("close");
        closeBtnAddLight(_close);
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2){
                if (that.ver == 1) {
                    var contentList = that.panel.getChildByName("content_list");
                    var items = contentList.getItems();
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if(item.getChildByName("checkBox_right").isSelected() && item.req){
                            var data = item.data;
                            that.requestSetGrantScore(data.userId, data.matchGrantScore);
                        } 
                    }
                }
                that.removeFromParent();
            }
        }, that);
        var btn_verSwitch = that.panel.getChildByName("btn_verSwitch");
        if (that.isLM) {
            btn_verSwitch.visible = false;
        }
        var imgFile = that.ver == 0 ? "friendCards_Match/btn_switchNewMatch.png" : "friendCards_Match/btn_switchOldMatch.png";
        btn_verSwitch.loadTextureNormal(imgFile);
        that.panel.getChildByName("Panle_title").getChildByName("text_matchNum").setString(that.ver==0? "参赛名额": "权限范围")

        btn_verSwitch.addTouchEventListener(function(sender, type) {
            if (type == 2){
                that.ver ^= 1;
                util.localStorageEncrypt.setNumberItem("FriendCard_Match_Version" + that.clubId, that.ver);; // 0:旧版 1：新版
                that.panel.getChildByName("Panle_title").getChildByName("text_matchNum").setString(that.ver==0? "参赛名额": "权限范围")
                var imgFile = that.ver == 0 ? "friendCards_Match/btn_switchNewMatch.png" : "friendCards_Match/btn_switchOldMatch.png";
                sender.loadTextureNormal(imgFile);
                that.rquestCheckRightList();
            }
        }, that);

        var Panle_title = that.panel.getChildByName("Panle_title")
        if (that.isLM) {
            //联盟
        }else{
            Panle_title.getChildByName("text_title_useNum").visible = false;
            that.panel.getChildByName("cell").getChildByName("txt_distributed").visible = false;
        }
        
        that.panel.getChildByName("cell").setVisible(false);
        that.rquestCheckRightList();
        that.initSearch()

    },

    initSearch: function(){
        var that = this;

        var img_search = that.panel.getChildByName("img_search");
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
                   that.rquestCheckRightList();
               }
            }
        });
        this.btn_clear.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                userIdEditBox.setString("");
                that.searchUserId = 0;
                that.btn_search.visible = true;
                that.btn_clear.visible = false;
                that.rquestCheckRightList();
            }
        });
    },

    //请求列表
    rquestCheckRightList:function()
    {
        var that = this;
        MjClient.block();
        var api = that.isLM ? "pkplayer.handler.listLeagueMatchAdmin" : "pkplayer.handler.listClubMatchAdmin";

        var sendInfo = {};

        if (that.isLM){
            sendInfo.leagueId = that.clubId;
            sendInfo.clubId = that.clubData.subClubId;
        }else{
            sendInfo.clubId = that.clubId;
        }
        sendInfo.matchType = that.ver;
        if (that.searchUserId) {
            sendInfo.userId = that.searchUserId;
        }
        MjClient.gamenet.request(api, sendInfo,  function(rtn)
        {   
            MjClient.unblock();
            if(rtn.code == 0)
            {
                that.data = rtn.data;
                if(sys.isObjectValid(that)){
                    that.ver == 0? that.refreshCheckRightList(rtn.data) :  that.refreshCheckRightList_new(rtn.data);
                }
            }
            else
            {
                FriendCard_Common.serverFailToast(rtn);
            }  
        });
    },

    //设置权限
    requestSetRight:function(userId, state)
    {//state:1授权， 2取消授权
        var that = this;
        MjClient.block();
        var api = that.isLM ? "pkplayer.handler.setLeagueMatchAdmin" : "pkplayer.handler.setClubMatchAdmin";

        var sendInfo = {};
        if (that.isLM){
            sendInfo.leagueId = that.clubId;
            sendInfo.clubId = that.clubData.subClubId;
        }else{
            sendInfo.clubId = that.clubId;
        }
        sendInfo.userId = userId;
        sendInfo.matchAudit = state;
        
        MjClient.gamenet.request(api, sendInfo,  function(rtn)
        {   
            MjClient.unblock();
            if(rtn.code != 0)
            {
                that.rquestCheckRightList();
                if (rtn.code == -1 && rtn.joinUserList) {
                    MjClient.Scene.addChild(new Friendcard_Match_changeRightTip(rtn.joinUserList, 0, rtn.message));
                }else{
                    FriendCard_Common.serverFailToast(rtn);
                }
            }  
        });
    },
    refreshHead: function(url, head) {
        head.needScale = 8;
        head.isMask = true;
        COMMON_UI.refreshHead(this, url ? url : "png/default_headpic.png", head);
    },
    refreshCheckRightList:function(datas)
    {   
        var that = this;
        this.dataLen = datas.length;
        var listData = datas.list;
        var matchListData = datas.matchList;
        var cell = that.panel.getChildByName("cell");
        var contentList = that.panel.getChildByName("content_list");
        contentList.removeAllItems();
        cell.setVisible(true);
        for (var i = 0; i < listData.length; i++) {
            var data = listData[i];
            var item = cell.clone();
            item.data = data;
            contentList.pushBackCustomItem(item);
            that.refreshHead(data.headimgurl, item.getChildByName("image_head"));
            item.getChildByName("text_group").setString(data.group == 0 ? "" : data.group + "");
            item.getChildByName("text_name").setString(getNewName(unescape(data.nickname), 6));
            item.getChildByName("text_ID").setString(data.userId + "");
            item.getChildByName("text_role").setString(FriendCard_Common.getRoleTextByRoleId(data.roleId));
            var checkBox_right =  item.getChildByName("checkBox_right");
            checkBox_right.setSelected(data.matchAudit == 1)//0:无权限 1：有权限
            checkBox_right.addEventListener(function(sender, type) {
                var data = sender.getParent().data;
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        that.requestSetRight(data.userId, 1);  
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        that.requestSetRight(data.userId, 0);
                        break;
                }
            });

            var text_ren = item.getChildByName("txt_ren");
            text_ren.setString("");

            var bSelf = data.userId == SelfUid();
            var bManager = false;
            if (this.isLM) {
                bManager = data.roleId == 5 || data.roleId == 6;
            }else{
                bManager = data.roleId == 1;
            }

            text_ren.visible = bSelf;
            var btn_setQuota =  item.getChildByName("btn_setQuota")
            btn_setQuota.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    var data = sender.getParent().data;
                    that.addChild(new FriendCard_Match_SetQuota(that.clubData, data, matchListData, function() {that.rquestCheckRightList()}));
                }
            },this);
            btn_setQuota.visible = !bSelf && !bManager;
            item.getChildByName("btn_sub").visible = false;
            item.getChildByName("btn_add").visible = false;
            item.getChildByName("img_quotaBg").visible = false;
            if( bSelf && FriendCard_Common.isLeader()){//联盟盟主|亲友圈的会长
                text_ren.setString("请分配人数");
                checkBox_right.setSelected(false);
                checkBox_right.visible = false;              
            }else{
                if (bSelf) {
                    var quotaDatas = JSON.parse(data.matchQuotas);
                    var str = "可分配名额:\n";
                    var lineNum = 1;
                    for(var key in matchListData){
                        var quota = 0;
                        if (quotaDatas[matchListData[key].matchId] > 0) {
                            quota = quotaDatas[matchListData[key].matchId]                  
                        }
                        str += getNewName(unescape(matchListData[key].title),6) + ":" + quota + "\n";
                        lineNum ++ ;
                    }
                    var scrollView = new ccui.ScrollView();
                    scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
                    scrollView.setTouchEnabled(true);
                    scrollView.setContentSize(cc.size(170, item.height));
                    scrollView.setBounceEnabled(true);
                    scrollView.setPosition(text_ren.getPosition());
                    scrollView.setInnerContainerSize(cc.size(170,  lineNum*30));
                    scrollView.setAnchorPoint(0.5,0.5)
                    var text = new ccui.Text();
                    text.setAnchorPoint(0.5,1)
                    text.y = scrollView.getInnerContainerSize().height;
                    text.x = scrollView.getInnerContainerSize().width/2;
                    text.setFontName("fonts/lanting.ttf");
                    text.setString(str);
                    text.setColor(cc.color("#443333"));
                    text.setFontSize(20);
                    text.ignoreContentAdaptWithSize(true);
                    text.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                    scrollView.addChild(text);
                    item.addChild(scrollView);
                    text_ren.visible = false;

                    checkBox_right.setSelected(false);
                    checkBox_right.visible = false;
                }
            } 
        }
        cell.setVisible(false);
        that.showEmptyText(listData.length == 0);
    },
    refreshCheckRightList_new:function(datas)
    {   
        var that = this;
        this.dataLen = datas.length;
        var listData = datas.list;
        var matchListData = datas.matchList;
        var cell = that.panel.getChildByName("cell");
        var contentList = that.panel.getChildByName("content_list");
        contentList.removeAllItems();
        cell.setVisible(true);
        for (var i = 0; i < listData.length; i++) {
            var data = listData[i];
            var item = cell.clone();
            item.data = data;
            contentList.pushBackCustomItem(item);
            that.refreshHead(data.headimgurl, item.getChildByName("image_head"));
            item.getChildByName("text_group").setString(data.group == 0 ? "" : data.group + "");
            item.getChildByName("text_name").setString(getNewName(unescape(data.nickname), 6));
            item.getChildByName("text_ID").setString(data.userId + "");
            item.getChildByName("text_role").setString(FriendCard_Common.getRoleTextByRoleId(data.roleId));
            var checkBox_right =  item.getChildByName("checkBox_right");
            checkBox_right.setSelected(data.matchAudit == 1)//0:无权限 1：有权限
            checkBox_right.addEventListener(function(sender, type) {
                var data = sender.getParent().data;
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        that.requestSetRight(data.userId, 1);  
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        that.requestSetRight(data.userId, 0);
                        break;
                }
            });

            


            var text_ren = item.getChildByName("txt_ren");
            text_ren.setString("");

            var bSelf = data.userId == SelfUid();
            var bManager = false;
            if (this.isLM) {
                bManager = data.roleId == 5 || data.roleId == 6;
            }else{
                bManager = data.roleId == 1;
            }

            text_ren.visible = bSelf;
            item.getChildByName("btn_setQuota").visible = false;
            var btn_sub = item.getChildByName("btn_sub");
            var btn_add = item.getChildByName("btn_add");
            var img_quotaBg = item.getChildByName("img_quotaBg");
            btn_sub.visible = !bSelf && !bManager;
            btn_add.visible =  btn_sub.visible;
            img_quotaBg.visible =  btn_sub.visible;

            if (btn_sub.visible) {
                var img_quotaBg = item.getChildByName("img_quotaBg")
                var size = img_quotaBg.getContentSize();
                if (FriendCard_Common.getSkinType() == 4) {
                    size.width -= 60;
                }else{
                    size.width -= 20;
                }
                
                var numEditBox = new cc.EditBox(size, new cc.Scale9Sprite());
                if (FriendCard_Common.getSkinType() == 4) {
                    numEditBox.setFontColor(cc.color("#ffffff"));
                   numEditBox.setFontSize(24);
                }else{
                   numEditBox.setFontColor(cc.color("#443333"));
                   numEditBox.setFontSize(28);
                }
                
                numEditBox.setMaxLength(10);
                
                numEditBox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
                numEditBox.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
                numEditBox.setFontName("fonts/lanting.TTF");
                numEditBox.setPlaceholderFontSize(30);
                numEditBox.setPosition(img_quotaBg.getPosition());
                numEditBox.setString(data.matchGrantScore);
                numEditBox.isEditBox = true;
                item.addChild(numEditBox);
                item.numEditBox = numEditBox;
                var edtDelegate = {}
                edtDelegate.editBoxEditingDidEnd = function (editBox) {
                    var inputNum = editBox.getString();
                    var parent = editBox.getParent();
                    var data = parent.data;
                    if (inputNum.length == 0) {
                        editBox.setString(""+data.matchGrantScore);
                    }
                    else
                    {
                        parent.stopAllActions();
                        parent.req = false;
                        inputNum = Number(inputNum);
                        if (inputNum > that.maxScore) {
                            inputNum = that.maxScore;
                        }
                        inputNum = parseInt(inputNum/100);//输入非整百数目时向下取整百
                        inputNum *= 100;
                        editBox.setString(inputNum);
                        if (data.matchGrantScore != inputNum) {
                            data.matchGrantScore = inputNum;  
                            that.requestSetGrantScore(data.userId, data.matchGrantScore);   
                        }      
                    }
                };
                numEditBox.setDelegate(edtDelegate);
                var btnCallBack = function(sender, type, bAdd){
                    if (type != 2) return ;
                    var parent = sender.getParent();
                    var data = parent.data;
                    if (bAdd) {
                        data.matchGrantScore += 100;
                        if(data.matchGrantScore>that.maxScore){
                            data.matchGrantScore = 0;
                        }
                    }else{
                        data.matchGrantScore -= 100;
                        if(data.matchGrantScore < 0){
                            data.matchGrantScore = that.maxScore;
                        }
                    }
                    parent.req = true;
                    parent.numEditBox.setString(data.matchGrantScore);
                    parent.stopAllActions();
                    parent.runAction(cc.sequence(cc.delayTime(1.25),cc.callFunc(function(){
                        if(parent.getChildByName("checkBox_right").isSelected() && parent.req){
                            parent.req = false;
                            that.requestSetGrantScore(data.userId, data.matchGrantScore);
                        }
                    })));
                }
                item.getChildByName("btn_add").addTouchEventListener(function (sender, type) {
                    btnCallBack(sender, type, true);
                },this);
                item.getChildByName("btn_sub").addTouchEventListener(function (sender, type) {
                    btnCallBack(sender, type, false);
                },this);
            }

            if( bSelf && FriendCard_Common.isLeader()){//联盟盟主|亲友圈的会长
                if (that.isLM) {
                    text_ren.setString("可分配:无限制");
                }else{
                    text_ren.setString("请分配");
                }
                checkBox_right.setSelected(false);
                checkBox_right.visible = false;              
            }else{
                if (bSelf) {
                    var str = "可分配:" + data.matchGrantScore;

                    if (that.isLM && !FriendCard_Common.isAssistants()) {
                        str+= "\n已分配:"+ datas.subGrantScore;
                    }
                    text_ren.setString(str);
                    checkBox_right.setSelected(false);
                    checkBox_right.visible = false;
                }else{

                }
            } 

            //聯盟显示已用的参赛中分数
            if (that.isLM) {
                var txt_distributed = item.getChildByName("txt_distributed");
                if (bSelf) {
                    if (FriendCard_Common.isAssistants()) {
                        var str = ""
                    }else{
                        var str = FriendCard_Common.isGroupLeader() ? "助理:" : "组长:";
                        str += datas.subAuditScore+"\n"
                    }
                    str += "成员:"+datas.auditScore;
                    txt_distributed.setString(str);
                    txt_distributed.visible = true;
                }else{
                    txt_distributed.visible = false;
                }
            }
        }
        cell.setVisible(false);
        that.showEmptyText(listData.length == 0);
    },
    requestSetGrantScore: function(userId, grantScore){
        var that = this;
        MjClient.block();
        var api = that.isLM ? "pkplayer.handler.leagueMatchUpdateGrantScore" : "pkplayer.handler.clubMatchUpdateGrantScore";

        var sendInfo = {};
        if (that.isLM){
            sendInfo.leagueId = that.clubId;
            sendInfo.clubId = that.clubData.subClubId;
        }else{
            sendInfo.clubId = that.clubId;
        }
        sendInfo.userId = userId;
        sendInfo.grantScore = grantScore;
        
        MjClient.gamenet.request(api, sendInfo,  function(rtn)
        {   
            MjClient.unblock();
            if(rtn.code != 0)
            {
                that.rquestCheckRightList();
                FriendCard_Common.serverFailToast(rtn);
            }  
        });
    },

    showEmptyText: function(isShow) {
        var that = this;

        if (that.emptyTxt) {
            that.emptyTxt.setVisible(isShow);
            return;
        } else if (!isShow) {
            return;
        }

        var emptyTxt = new ccui.Text();
        emptyTxt.setFontName("fonts/lanting.TTF");
        emptyTxt.setFontSize(30);
        emptyTxt.setString("暂无数据");
        emptyTxt.setColor(cc.color(0x79, 0x34, 0x12));
        emptyTxt.setName("emptyTextTip");
        emptyTxt.setPosition(that.panel.width / 2, that.panel.height / 2);
        that.panel.addChild(emptyTxt);
        that.emptyTxt = emptyTxt;
    },

});

var Friendcard_Match_changeRightTip = cc.Layer.extend({
    ctor: function(userList, ListType, text) {
        var that = this;
        that._super();
        var uiNode = ccs.load("friendcard_Match_ChangeRightTip.json").node;
        that.addChild(uiNode);
        var block = uiNode.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0],true);

        var back = uiNode.getChildByName("back");
        that.panel = back;
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0]);
        popupAnm(back);
        back.getChildByName("btn_close").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent(true)
            }
        }, that);

        back.getChildByName("btn_cancel").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (ListType == 1) {
                    MjClient.Scene.addChild(new FriendCard_Match_memberList1(userList))
                }else{
                    MjClient.Scene.addChild(new FriendCard_Match_memberList(userList))
                }
            }
        }, that);
        if (text) {
            back.getChildByName("Text").setString(text)
        }

        var btn_confirm = back.getChildByName("btn_confirm");
        btn_confirm.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent(true);
                
            }
        }, that);
    }
});

var FriendCard_Match_memberList = cc.Layer.extend({

    ctor: function(userList) {
        this._super();
        var that = this;

        var node = ccs.load("friendcard_Match_memberList.json").node;
        that.addChild(node);
        that.uinode = node;
        that.panel = node.getChildByName("Panel");
        COMMON_UI.setNodeTextAdapterSize(node);
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5,0.5], [0, 0], true);
        setWgtLayout(this.panel, [1, 1], [0.5,0.5], [0, 0]);
        popupAnm(that.panel);

        var _close = that.panel.getChildByName("close");
        closeBtnAddLight(_close);
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2){
                that.removeFromParent();
            }
        }, that);

        that.panel.getChildByName("cell").setVisible(false);

        that.refreshUserList(userList);
    },

    refreshUserList:function(datas)
    {   
        var that = this;
        var cell = that.panel.getChildByName("cell");
        var contentList = that.panel.getChildByName("content_list");
        contentList.removeAllItems();
        cell.setVisible(true);
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var item = cell.clone();
            item.data = data;
            contentList.pushBackCustomItem(item);
            var head = item.getChildByName("image_head");
            head.needScale = 8;
            head.isMask = true;
            COMMON_UI.refreshHead(this, data.headimgurl ? data.headimgurl : "png/default_headpic.png", head);
            item.getChildByName("text_ID").setString(data.userId + "");
            item.getChildByName("text_name").setString( getNewName(unescape(data.nickname),6) + "");
        }
        cell.setVisible(false);
    },
});

var FriendCard_Match_memberList1 = cc.Layer.extend({

    ctor: function(userList) {
        this._super();
        var that = this;

        var node = ccs.load("friendcard_Match_memberList1.json").node;
        that.addChild(node);
        that.uinode = node;
        that.panel = node.getChildByName("Panel");
        COMMON_UI.setNodeTextAdapterSize(node);
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5,0.5], [0, 0], true);
        setWgtLayout(this.panel, [1, 1], [0.5,0.5], [0, 0]);
        popupAnm(that.panel);

        var _close = that.panel.getChildByName("close");
        closeBtnAddLight(_close);
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2){
                that.removeFromParent();
            }
        }, that);

        that.panel.getChildByName("cell").setVisible(false);

        that.refreshUserList(userList);
    },

    refreshUserList:function(datas)
    {   
        var that = this;
        var cell = that.panel.getChildByName("cell");
        var contentList = that.panel.getChildByName("content_list");
        contentList.removeAllItems();
        cell.setVisible(true);
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var item = cell.clone();
            item.data = data;
            contentList.pushBackCustomItem(item);
            var head = item.getChildByName("image_head");
            head.needScale = 8;
            head.isMask = true;
            COMMON_UI.refreshHead(this, data.headimgurl ? data.headimgurl : "png/default_headpic.png", head);
            item.getChildByName("text_ID").setString(data.userId + "");
            item.getChildByName("text_name").setString( getNewName(unescape(data.nickname),6) + "");
            item.getChildByName("text_club_id").setString(data.clubId + "");
            item.getChildByName("text_status").setString(["参赛审核中","参赛中","退赛审核中"][data.matchStatus]);
            item.getChildByName("text_leader_name").setString( getNewName(unescape(data.clubMasterName),6) + "");
            item.getChildByName("text_leader_id").setString(data.clubMasterId + "");

        }
        cell.setVisible(false);
    },
});

//分配参赛名额
var FriendCard_Match_SetQuota = cc.Layer.extend({

    ctor: function(clubData, userInfo, matchList, successCallback) {
        this._super();
        var that = this;
        that.maxQuota = 1000; //最大可设置分配额
        that.clubData = clubData;
        that.clubId = clubData.info.clubId;
        that.userInfo = userInfo;
        that.matchList = matchList;
        that.successCallback = successCallback;
        that.isLM = FriendCard_Common.getClubisLM(clubData.info);
        var node = ccs.load("friendcard_Match_setQuota.json").node;
        that.addChild(node);
        that.uinode = node;
        that.panel = node.getChildByName("Panel");
        COMMON_UI.setNodeTextAdapterSize(node);
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5,0.5], [0, 0], true);
        setWgtLayout(this.panel, [1, 1], [0.5,0.5], [0, 0]);
        popupAnm(that.panel);


        var _close = that.panel.getChildByName("close");
        closeBtnAddLight(_close);
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2){
                that.removeFromParent();
            }
        }, that);

        that.panel.getChildByName("btn_cancel").addTouchEventListener(function(sender, type) {
            if (type == 2){
                that.removeFromParent();
            }
        }, that);

        that.panel.getChildByName("btn_confirm").addTouchEventListener(function(sender, type) {
            if (type == 2){
                that.requestSetQuota();
                that.removeFromParent();
            }
        }, that);

        that.panel.getChildByName("cell").setVisible(false);
        that.refreshSetQuotaList(matchList, userInfo)
    },

    //设置权限
    requestSetQuota:function()
    {//
        var that = this;
        MjClient.block();
        var api = that.isLM ? "pkplayer.handler.setLeagueMatchAdmin" : "pkplayer.handler.setClubMatchAdmin";

        var sendInfo = {};
        if (that.isLM){
            sendInfo.leagueId = that.clubId;
            sendInfo.clubId = that.clubData.subClubId;
        }else{
            sendInfo.clubId = that.clubId;
        }
        sendInfo.userId = that.userInfo.userId;
        sendInfo.matchQuotas = {};

        var children =  that.panel.getChildByName("content_list").getChildren();
        for (var i = 0; i < children.length; i++) {
            var item = children[i];
            var data = item.data;
            sendInfo.matchQuotas[data.matchId.toString()] = data.matchQuota;
        }
        
        MjClient.gamenet.request(api, sendInfo,  function(rtn)
        {   
            MjClient.unblock();
            if(rtn.code == 0){
                MjClient.showToast("操作成功！");
                that.successCallback();
            }
            else
            {
                FriendCard_Common.serverFailToast(rtn);
            }  
        });
    },
    refreshSetQuotaList:function(matchList, userInfo)
    {   
        var that = this;
        var quotaDatas = JSON.parse(userInfo.matchQuotas);
        var cell = that.panel.getChildByName("cell");
        var contentList = that.panel.getChildByName("content_list");
        contentList.removeAllItems();
        cell.setVisible(true);
        for (var i = 0; i < matchList.length; i++) {
            var data = matchList[i];
            if (data.matchType == 1) {//过滤新版比赛
                continue;
            }
            if( quotaDatas[data.matchId.toString()]){
                data.matchQuota = quotaDatas[data.matchId.toString()];
            }else{
                data.matchQuota = 0;
            }
            var item = cell.clone();
            item.data = data;
            contentList.pushBackCustomItem(item);


            item.getChildByName("text_matchName").setString(unescape(data.title))
            item.getChildByName("text_iniScore").setString("参赛起始积分:"+data.scoreInitial)

            var img_quotaBg = item.getChildByName("img_quotaBg")
            var size = img_quotaBg.getContentSize();
            size.width -= 20;
            var numEditBox = new cc.EditBox(size, new cc.Scale9Sprite("createNewPng/bg_difen.png"));
            numEditBox.setFontColor(cc.color("#443333"));
            numEditBox.setMaxLength(10);
            numEditBox.setFontSize(28);
            numEditBox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
            numEditBox.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            numEditBox.setFontName("fonts/lanting.TTF");
            numEditBox.setPlaceholderFontSize(30);
            numEditBox.setPosition(img_quotaBg.getPosition());
            numEditBox.setString(data.matchQuota);
            numEditBox.isEditBox = true;
            item.addChild(numEditBox);
            item.numEditBox = numEditBox;
            var edtDelegate = {}
            edtDelegate.editBoxEditingDidEnd = function (editBox) {
                var inputNum = editBox.getString();
                var parent = editBox.getParent();
                var data = parent.data;
                if (inputNum.length == 0) {
                    editBox.setString(""+data.matchQuota);
                }
                else
                {
                    parent.stopAllActions();
                    inputNum = Number(inputNum);
                    if (inputNum > that.maxQuota) {
                        inputNum = that.maxQuota;
                    }
                    editBox.setString(inputNum);
                    data.matchQuota = inputNum;           
                }
            };
            numEditBox.setDelegate(edtDelegate);
            var btnCallBack = function(sender, type, bAdd){
                if (type != 2) return ;
                var parent = sender.getParent();
                var data = parent.data;
                if (bAdd) {
                    if(data.matchQuota<that.maxQuota){
                        data.matchQuota++;
                    }else{
                        data.matchQuota = 0;
                    }
                }else{
                    if(data.matchQuota >0){
                        data.matchQuota--;
                    }else{
                        data.matchQuota = that.maxQuota;
                    }
                }
                parent.numEditBox.setString(data.matchQuota);
            }
            item.getChildByName("btn_add").addTouchEventListener(function (sender, type) {
                btnCallBack(sender, type, true);
            },this);
            item.getChildByName("btn_sub").addTouchEventListener(function (sender, type) {
                btnCallBack(sender, type, false);
            },this);

        }
        cell.setVisible(false);
    },
});


/*
 审核弹窗提示
 */
var Friendcard_match_shenhePopMsg = cc.Layer.extend({
    ctor:function (data, type, isLM) {
        this._super();
        var msgui = ccs.load("friendcard_Match_shenheNotice.json");
        this.addChild(msgui.node);

        var _back = msgui.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 1], [0, 0]);
        COMMON_UI.setNodeTextAdapterSize(_back);
        var that = this;
        data.type_shenhe = type;
        this.data = data;
        this.isCurUI = false; //可能出现多个审核UI, 这个判断当前操作是否是此UI
        _back.y = _back.y + _back.height;

        var moveTo1 = cc.moveTo(0.3, cc.p(_back.x, _back.y - _back.height));

        var callFunc2 = cc.callFunc(function() {});
        _back.runAction(cc.sequence(moveTo1, callFunc2));

        var btn_no = _back.getChildByName("btn_no");
        var btn_close = _back.getChildByName("btn_close");
        var btn_ok = _back.getChildByName("btn_ok");

        var player_name = _back.getChildByName("player_name");
        var player_ID = _back.getChildByName("player_ID");
        var player_head = _back.getChildByName("player_head");
        var text_content = _back.getChildByName("Text_content");
        text_content.ignoreContentAdaptWithSize(true);

        player_name.setString(getNewName(unescape(data.nickname),5));
        player_name.setFontName("Arial");
        player_name.setFontSize(25);
        player_ID.setString("（" + data.userId + "）");

        var _text_group = player_ID.clone();
        _text_group.x = player_name.x - 40;
        if (FriendCard_Common.getSkinType() == 4) {
            _text_group.x = player_name.x - 80;
        }
        _text_group.setString(data.group == 0 ? "未分组" : data.group + "组");
        _back.addChild(_text_group);


        var contentStr = "申请参加\n" + unescape(data.matchname) + "比赛";
        if(type == 0){
            text_content.setColor(cc.color(255, 0, 0));
            contentStr = "申请退出" + unescape(data.matchname) + "比赛"; 
            if (isLM) {
                contentStr += "\n当前积分：" + data.score;  
            }else{
                contentStr += "\n当前排名：" + data.rank + " 当前积分：" + data.score;
            }
            
        }
        text_content.setString(contentStr);

        //往期成绩
        if (isLM) {
            if (typeof(data.oldScore) != "undefined") { 
                text_content.x -= 20;
                text_content.setFontSize(18);
                var text_oldScore = text_content.clone();
                _back.addChild(text_oldScore);
                text_oldScore.x += text_content.width + 50;
                text_oldScore.setString("往期成绩:\n" + "积分:"+ data.oldScore);
            }
        }else{
            if (typeof(data.oldRank) != "undefined" && typeof(data.oldScore) != "undefined" && data.oldRank != 0) { 
                text_content.x -= 20;
                text_content.setFontSize(18);
                var text_oldScore = text_content.clone();
                _back.addChild(text_oldScore);
                text_oldScore.x += text_content.width + 50;
                text_oldScore.setString("往期成绩:\n" + "积分:"+ data.oldScore +" 排名:" + data.oldRank);
            }
        }
 
        
        player_ID.x = player_head.x - player_ID.width - player_head.width / 2 - 5;
        player_name.x = player_ID.x - player_name.width - 5;

        MjClient.loadImgQX(data.headimgurl ? data.headimgurl : "png/default_headpic.png", {
            isCrossOrigin: true
        }, function(err, texture) {
            if (err || !texture || !sys.isObjectValid(player_head))
                return;

            var sp = new cc.Sprite(texture);
            if (!sp)
                return;

            sp.setScale((player_head.width - 8) / sp.width);
            sp.setPosition(cc.p(player_head.width / 2, player_head.height / 2));
            player_head.addChild(sp);
        });


        var request = function(pass) {
            MjClient.block();
            var api_name = "pkplayer.handler.setClubMatchUserForAudit";
            if(isLM){
                if(type == 0){
                    //退赛
                    api_name = "pkplayer.handler.leagueMatchQuitAudit";
                }else{
                    //参赛
                    api_name = "pkplayer.handler.setLeagueMatchUserForAudit";
                }
                
            }

            var sendInfo = {
                id: data.id,
                state: pass
            }
            cc.log("setClubMatchUserForAudit sendInfo",JSON.stringify(sendInfo))
            MjClient.gamenet.request(api_name, sendInfo, function(rtn) {
                MjClient.unblock();
                if (!cc.sys.isObjectValid(that)) {
                    return;
                }

                if (rtn.code == 0) {
                    MjClient.showToast(rtn.message);
                } else {
                    FriendCard_Common.serverFailToast(rtn);
                }
                that.removeFromParent();
            });
        }

        

        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent();
            }
        }, this);
        btn_ok.addTouchEventListener(function(sender, type) {
            if (type == 2) {

                that.addChild(new Friendcard_match_shenhe(data,1,function(){
                    request(1);
                }))
            }
        }, this);
        btn_no.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.addChild(new Friendcard_match_shenhe(data,0,function(){
                    request(2);
                }))
            }
        }, this);
        _back.addTouchEventListener(function(sender, type) {
            if (type == 0) {
                this.isCurUI = true;
            }
        }, this);

        function closeMe() {
            if (!that.isCurUI)
                return;

            var moveTo1 = cc.moveTo(0.3, cc.p(_back.x, _back.y + _back.height));

            var callFunc2 = cc.callFunc(function() {
                that.removeFromParent();
            });
            _back.runAction(cc.sequence(moveTo1, callFunc2));
        }

        function intoMoveCloseMe() {
            that.touchListener = cc.EventListener.create(getTouchListener());
            cc.eventManager.addListener(that.touchListener, _back.getChildByName("touch"));
        }

        function getTouchListener() {
            var isClose = false;
            var ret = {
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: false,
                onTouchBegan: function(touch, event) {
                    return true;
                },
                onTouchMoved: function(touch, event) {

                    if (!touch._py)
                        touch._py = touch.getLocation().y;

                    if (touch._py < (_back.y - _back.height)) {
                        touch._py = false;
                        return false;
                    }
                    var curPy = touch.getLocation().y;

                    if (touch._py <= (curPy - 10)) {
                        isClose = true
                    }
                    return true;

                },
                onTouchEnded: function(touch, event) {
                    if (isClose) {
                        closeMe();
                    }
                }
            };
            return ret;
        }
        intoMoveCloseMe();

        return true;
    }
});

var Friendcard_match_shenhe = cc.Layer.extend({
    ctor:function (data,type,callFunc) {
        this._super();

        var msgui = ccs.load("friendcard_Match_shenhePopMsg.json");
        this.addChild(msgui.node);

        var _back = msgui.node.getChildByName("back");
        setWgtLayout(msgui.node.getChildByName("block"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(msgui.node.getChildByName("back"), [1, 1], [0.5, 0.5], [0, 0]);

        var that = this;
        this.data = data;
        this.isCurUI = false; //可能出现多个审核UI, 这个判断当前操作是否是此UI

        var btn_no = _back.getChildByName("btn_no");
        var btn_close = _back.getChildByName("btn_close");
        var btn_ok = _back.getChildByName("btn_ok");
        var btn_close = _back.getChildByName("btn_close");
        var text_title = _back.getChildByName("Text_1");
        var player_name = _back.getChildByName("player_name");
        var player_ID = _back.getChildByName("player_ID");
        var player_head = _back.getChildByName("player_head");
        var text_content = _back.getChildByName("Text_content");
        var text_idea = _back.getChildByName("Text_idea");
        text_idea.ignoreContentAdaptWithSize(true);
        if(type == 1){//审核同意
            text_idea.setString("同意")
        }else if (type == 2){//邀请确认
            text_idea.setString("确认邀请")
            text_idea.x = text_idea.x - 15;
        }else if (type == 3){//踢出确认
            text_idea.setString("确认将")
            text_idea.x = text_idea.x;
        }else{//审核拒绝
            text_idea.setString("拒绝")
        }

        player_name.setString(getNewName(unescape(data.nickname),8));
        player_name.setFontName("Arial");
        player_name.setFontSize(25);
        player_ID.ignoreContentAdaptWithSize(true);
        player_ID.setString("ID:" + data.userId);

        var contentStr = "申请参加" + unescape(data.matchname) + "比赛";
        var bJZSkinType = FriendCard_Common.getSkinType() == 1;
        var strTitle = bJZSkinType ? "参   赛   审   核" : "参赛审核";
        if(data.type_shenhe == 0){//退赛审核
            contentStr = "申请退出" + unescape(data.matchname) + "比赛";
            strTitle = bJZSkinType ? "退   赛   审   核" : "退赛审核";
        }else if(data.type_shenhe == 2){//邀请参赛
            contentStr = "加入" + unescape(data.matchname) + "比赛";
            strTitle = bJZSkinType ? "邀   请   确   认" : "邀请确认";
        }else if(data.type_shenhe == 3){//踢出确认
            contentStr = "从" + unescape(data.matchname) + "比赛踢出";
            strTitle = bJZSkinType ? "踢   出   确   认" : "踢出确认";
        }
        text_title.ignoreContentAdaptWithSize(true);
        text_title.setString(strTitle)

        text_content.width = 500
        text_content.setString(contentStr);

        that.refreshHead(data.headimgurl, player_head);       

        btn_ok.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                callFunc();
                this.removeFromParent();
            }
        }, this);
        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent();
            }
        }, this);

        btn_no.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent();
            }
        }, this);


        return true;
    },
    refreshHead: function(url, head) {
        head.needScale = 8;
        head.isMask = true;
        COMMON_UI.refreshHead(this, url ? url : "png/default_headpic.png", head);
    },
});

//参赛邀请
var FriendCard_Match_Invite = cc.Layer.extend({

    ctor: function(clubData, matchData) {
        this._super();
        var that = this;
        that.clubData = clubData;
        that.matchData = matchData;
        that.clubId = clubData.info.clubId;
        that.isLM = FriendCard_Common.getClubisLM(clubData.info);
        that.datas = [];

        var node = ccs.load("friendcard_Match_invite.json").node;
        that.addChild(node);
        that.uinode = node;
        that.panel = node.getChildByName("Panel");
        COMMON_UI.setNodeTextAdapterSize(node);
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5,0.5], [0, 0], true);
        setWgtLayout(this.panel, [1, 1], [0.5,0.5], [0, 0]);
        popupAnm(that.panel);

        var _close = that.panel.getChildByName("close");
        closeBtnAddLight(_close);
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2){
                that.removeFromParent();
            }
        }, that);
        that.initSortSearch();
        that.panel.getChildByName("cell").setVisible(false);

        that.rquestInviteUserList();
    },

    //请求列表
    rquestInviteUserList:function()
    {
        var that = this;
        MjClient.block();
        var api = that.isLM ? "pkplayer.handler.leagueInviteMatchUsers" : "pkplayer.handler.clubInviteMatchUsers";

        var sendInfo = {};

        if (that.isLM){
            sendInfo.leagueId = that.clubId;
            sendInfo.clubId = that.clubData.subClubId;
        }else{
            sendInfo.clubId = that.clubId;
        }
        sendInfo.group = that.searchData.groupIdx;
        MjClient.gamenet.request(api, sendInfo,  function(rtn)
        {   
            MjClient.unblock();
            if(rtn.code == 0)
            {
                that.datas = rtn.data;
                if(sys.isObjectValid(that))
                    that.refreshInviteUserList(that.filterData(that.datas));
            }
            else
            {
                FriendCard_Common.serverFailToast(rtn);
            }  
        });
    },

    //邀请玩家请求
    rquestInvite:function(userId, matchId)
    {
        var that = this;
        MjClient.block();
        var api = that.isLM ? "pkplayer.handler.leagueInviteMatch" : "pkplayer.handler.clubInviteMatch";

        var sendInfo = {};

        if (that.isLM){
            sendInfo.leagueId = that.clubId;
            sendInfo.clubId = that.clubData.subClubId;
        }else{
            sendInfo.clubId = that.clubId;
        }
        sendInfo.userId = userId;
        sendInfo.matchId = matchId;
        MjClient.gamenet.request(api, sendInfo,  function(rtn)
        {   
            MjClient.unblock();
            if(rtn.code == 0){
                MjClient.showToast("邀请成功!");
                postEvent("matchInfoChange", {});
                that.rquestInviteUserList();
            }else
            {
                FriendCard_Common.serverFailToast(rtn);
            }  
        });
    },

    filterData: function(datas)
    {
        var newDatas = [];
        if ( !(this.searchData.searchKey && this.searchData.searchKey.length>0) ) { 
            return datas
        }
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var nickName = unescape(data.nickname);
            var userId = data.userId.toString();
            if(nickName.indexOf(this.searchData.searchKey)>=0 || userId.indexOf(this.searchData.searchKey)>=0){
                newDatas.push(data)
            }
        }
        return newDatas;
    },

    refreshInviteUserList:function(datas)
    {   
        var that = this;
        var cell = that.panel.getChildByName("cell");
        var contentList = that.panel.getChildByName("content_list");
        contentList.removeAllItems();
        cell.setVisible(true);
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var item = cell.clone();
            item.data = data;
            contentList.pushBackCustomItem(item);
            var head = item.getChildByName("image_head");
            head.needScale = 8;
            head.isMask = true;
            COMMON_UI.refreshHead(this, data.headimgurl ? data.headimgurl : "png/default_headpic.png", head);
            item.getChildByName("text_ID").setString(data.userId + "");
            item.getChildByName("text_name").setString( getNewName(unescape(data.nickname),6) + "");
            item.getChildByName("text_group").setString(data.group==0 ? "未分组" : data.group+"组");
            item.getChildByName("text_state").setString(["未参赛","参赛中","已淘汰","已退赛"][data.status]);// 0未参赛，1参赛中， 2已淘汰， 3已退赛
            item.getChildByName("Button_invite").addTouchEventListener(function(sender, type) {
                if (type == 2){ 
                    var data = sender.getParent().data;
                    data.matchname = that.matchData.matchName;
                    data.type_shenhe = 2;
                    that.addChild(new Friendcard_match_shenhe(data,2,function(){
                        that.rquestInvite(data.userId, that.matchData.matchId);
                    }))
                }
            }, that);
        }
        cell.setVisible(false);
    },
    initSortSearch: function() {
        var that = this;
        that.searchData = {};
        var sortSearchPanel = that.panel.getChildByName("sortSearchPanel");
        that._sortSearchPanel = sortSearchPanel;
        that._groupOptionNode = sortSearchPanel.getChildByName("groupOptionNode");
        that._groupSelectNode = sortSearchPanel.getChildByName("groupSelectNode");
        that._search = sortSearchPanel.getChildByName("Image_search");
        that._groupOptionNode.setVisible(false);

        that._groupSelectNode.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var others = [];
                others.push("全部分组");
                others.push("未分组");
                var data = {
                    event: "FRIENDCARD_MATCH_INVITE_CHECKFENZU",
                    numberGroup: FriendCard_Common.getGroupNumber(),
                    others: others
                };
                that.addChild(new friendcard_selectGroup(data));
            }
        });

        that._groupSelectNode.groupId = -1;
        UIEventBind(null, that._groupSelectNode, "FRIENDCARD_MATCH_INVITE_CHECKFENZU", function(eD) {
            var groupId = eD.groupType;
            if (groupId == "全部分组") {
                that._groupSelectNode.getChildByName("text").setString("全部分组");
                groupId = null;
            } else if (eD.groupType == "未分组") {
                that._groupSelectNode.getChildByName("text").setString("未分组");
                groupId = 0;
            } else {
                that._groupSelectNode.getChildByName("text").setString(eD.groupType + "组");
                groupId = eD.groupType;
            }
            that.searchData.groupIdx = groupId;
            that.rquestInviteUserList();
        });



        var userIdEditBox = new cc.EditBox(that._search.getContentSize(), new cc.Scale9Sprite("friendCards/common/img_dikuang.png"));
        that._userIdEditBox = userIdEditBox;
        userIdEditBox.setFontColor(cc.color("E33232"));
        userIdEditBox.setMaxLength(10);
        userIdEditBox.setFontSize(30);
        //userIdEditBox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        userIdEditBox.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        userIdEditBox.setFontName("fonts/lanting.TTF");
        userIdEditBox.setPlaceholderFontSize(30);
        userIdEditBox.setPlaceHolder("请输入玩家信息...");
        userIdEditBox.setPosition(that._search.width / 2, that._search.height / 2);
        that._search.addChild(userIdEditBox);

        that._search.userId = -1;
        that._search.getChildByName("Button_find").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.searchData.searchKey = userIdEditBox.getString();
                that.refreshInviteUserList(that.filterData(that.datas));
            }
        });

        sortSearchPanel.getChildByName("Button_all_member").addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.searchData.searchKey = "";
                userIdEditBox.setString("");
                that.refreshInviteUserList(that.filterData(that.datas));
            }
        });
    },

});
