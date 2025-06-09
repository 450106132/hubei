/**
 * @Author:      XiaoMaoGe
 * @Email:       lms_190865480@163.com
 * @QQ:       190865480
 * @DateTime:     2017-12-25 
 * @Description: 亲友圈创建和修改页面 
 */

var FriendCard_LM_info = cc.Layer.extend({
    onExit:function()
    {
        this._super();
        FriendCard_Common.reSetRuleParm();
        MjClient.FriendCard_infoUI = null;
    },
    ctor: function(data,layer,ruleIndex,sourceName,inviterId,clubId) {
        this._super();
        this._parent = layer;
        this._data = data;
        this._ruleIndex = ruleIndex;
        //注意，如果俱乐部与联盟玩法个数不同不能用次方法
        this._ruleBtnNum = FriendCard_Common.getRuleNumber();
        this._sourceName = sourceName;
        this._isMatch = this._data ? (this._data.info.matchIsOpen & 2) : false;
        this._isAntiAddictionMode = this._data ? (this._data.info.isOpenAntiAddiction & 1) :false;
        this._clubType = 1; //房卡俱乐部 普通俱乐部
        this._inviterId = inviterId;
        this._clubId = clubId;
        for (var i = 1; i <= this._ruleBtnNum; i++) {
            MjClient.RuleParam["rule" + i] = null;
        }

        var UI = ccs.load("friendcard_LM_info.json");
        this.addChild(UI.node);
        MjClient.FriendCard_infoUI = this;
        

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        this.back = UI.node.getChildByName("back");
        this.initLayer(UI.node,data,layer,ruleIndex,sourceName);
        this.initSelectLayer(UI.node);
        //创建俱乐部时 //联盟俱乐部只有房卡模式
        if (FriendCard_Common.IsOpenRoomCardPay() && false) 
        {
            if(!this._data && MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)//永利不需要选择俱乐部类型界面
            {
                this.switchLayer(2);
                this._clubType = 1; //直接默认房卡类型;
            }
            else if (!this._data) {
                this.switchLayer(1)
            } else {
                this.switchLayer(2)
            }
        }
        else{
            this.switchLayer(2);
        }
    },
    updateWanfa:function () {
        // if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ) {
        //     for (var i = 1; i <= 3; i++) {
        //         this["_play_text_" + i].setString("固定玩法" +i);
        //         this["btton_" + i].visible = true;
        //     }
        //     return;
        // }

        var sumNum = 0;
        var number_1 = 0;
        var pos_num = 0;
        this.Play_table = [];
        this.noPlay_table_2 = [];
        for (var i = 1; i <= this._ruleBtnNum; i++) {
            if (MjClient.RuleParam["rule" + i] && MjClient.RuleParam["rule" + i].ruleName) {
                var ruleName = unescape(MjClient.RuleParam["rule" + i].ruleName);
                if(FriendCard_Common.getSkinType() == 3)
                {
                    if (ruleName.length > 6) {
                        this["_play_text_" + i].setFontSize(17);
                    }
                }else if (FriendCard_Common.getSkinType() == 4) {
                    var textName = "";
                    var middleIndex = parseInt(ruleName.length/2)-1;
                    for (var j = 0; j < ruleName.length; j++) {
                        if (j == middleIndex){
                            textName = textName + ruleName.charAt(j) + "\n";
                        }else{
                            textName = textName + ruleName.charAt(j);
                        }
                    }
                    ruleName = textName;
                }
                else if (ruleName.length > 6) {
                    this["_play_text_" + i].setFontSize(18);
                }
                else if(ruleName.length > 5){
                    this["_play_text_" + i].setFontSize(25);
                }
                this["_play_text_" + i].setString(ruleName);
                this["btton_" + i].visible = true;
                if(FriendCard_Common.getSkinType() == 4){
                    this["btton_" + i].loadTextureNormal("friendCards/info/btn_rule_n.png");
                }else{
                    this["btton_" + i].loadTextures("friendCards/info/btn_rule_n.png","friendCards/info/btn_rule_s.png");
                }
                this["_play_text_" + i].visible = true;
                this["btton_" + i].pos = ++pos_num;
                this.Play_table.push(i);
                sumNum++;
            }
            if (MjClient.RuleParam["rule" + i] == "delete" ) {
                this["_play_text_" + i].setString("玩法" +i);
                this["btton_" + i].visible = false;
            }
        }



        this._btn_setPlay.visible = sumNum == 0;
        for (var j = 1; j <= this._ruleBtnNum; j++) {
            this["btton_" + j].isAddButton = false;
            if (this.Play_table.indexOf(j) != -1) {
                //var number = this["btton_" + j].pos;
                //this["btton_" + j].setPosition(this["btn_pos_" + number]);
                this["btton_" + j].setPosition(this["btton_" + j].tempP);
            }else{
                this.noPlay_table_2.push(j);
                this["btton_" + j].visible = false;
                this["btton_" + j].setPosition(this["btn_pos_" + (++sumNum)]);
            }
        }
        var buttonAdd;
        if (pos_num != 0 && pos_num < this._ruleBtnNum) {
            pos_num++;
            var number_2 = this.noPlay_table_2[0];

            this["btton_" + number_2].isAddButton = true;
            this["btton_" + number_2].visible = true;
            buttonAdd = this["btton_" + number_2];
            this["_play_text_" + number_2].visible = false;
            this["btton_" + number_2].setPosition(this["btn_pos_" + pos_num]);
            this["btton_" + number_2].tempP = this["btn_pos_" + pos_num];
            if(FriendCard_Common.getSkinType() == 4){
                this["btton_" + number_2].loadTextureNormal("friendCards/info/btn_addRule_n.png");
            }else{
                this["btton_" + number_2].loadTextures("friendCards/info/btn_addRule_n.png","friendCards/info/btn_addRule_s.png");
            }
        }else{
            if(!this._data){
                this["btton_" + 1].isAddButton = true;
                this["btton_" + 1].visible = true;
                buttonAdd = this["btton_" + 1];
                this["_play_text_" + 1].visible = false;
                this["btton_" + 1].setPosition(this["btn_pos_" + 1]);
                this["btton_" + 1].tempP = this["btn_pos_" + 1]
                if(FriendCard_Common.getSkinType() == 4){
                    this["btton_" + 1].loadTextureNormal("friendCards/info/btn_addRule_n.png");
                }else{
                    this["btton_" + 1].loadTextures("friendCards/info/btn_addRule_n.png","friendCards/info/btn_addRule_s.png");
                }
                this._btn_setPlay.visible = false;// 为了更精准的定位到第一个添加按钮位置， 不再使用这个按钮 下个版本优化将直接丢弃
            }
        }

        
        //先隐藏，排序

        this.wanfaBtns.sort(function(a, b) {
            if (!b.visible) return -1;
            if (!a.visible) return 1;
            if (b.isAddButton) return -1;
            if (a.isAddButton) return 1;
            if(a.y > b.y){
                return -1;
            }else if (a.y == b.y){
                return a.x < b.x ? -1:1;
            }else{
                return 1;
            }
        })
        var visibleWanfaSize = this.Play_table.length
        for (var j = 0; j < visibleWanfaSize; j++) {
            this.wanfaBtns[j].setPosition(this["btn_pos_"+(j+1)]);
            this.wanfaBtns[j].tempP = this["btn_pos_"+(j+1)];
        }
        if(buttonAdd){
            this.wanfaBtns[visibleWanfaSize].setPosition(this["btn_pos_"+(visibleWanfaSize+1)]);
            this.wanfaBtns[visibleWanfaSize].tempP = this["btn_pos_"+(visibleWanfaSize+1)];
        }
        for (var j = visibleWanfaSize+1; j < this._ruleBtnNum; j++) {
            this.wanfaBtns[j].setPosition(this["btn_pos_"+(j+1)]);
            this.wanfaBtns[j].tempP = this["btn_pos_"+(j+1)];
        }
        this.wanfaBtns.sort(function(a, b) {
            if(a.y > b.y){
                return -1;
            }else if (a.y == b.y){
                return a.x < b.x ? -1:1;
            }else{
                return 1;
            }
        })
        //处理序号
        for (var j = 0; j < visibleWanfaSize; j++) {
            this.xuhaoImgs[j].visible = true;
        }
        for (var j = visibleWanfaSize; j < this._ruleBtnNum; j++) {
            this.xuhaoImgs[j].visible = false;
        }
    },
    reqStop: function(createSwitch,clubId) {
        var that = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.leagueUpdate", {
                createSwitch:createSwitch,
                leagueId:clubId
            },
            function(rtn) {
                MjClient.unblock();
                if (rtn.message) {
                    MjClient.showToast(rtn.message);
                    if (cc.sys.isObjectValid(that))
                        that.removeFromParent();
                } else {
                    MjClient.showToast("修改失败");
                }
            }
        );
    },
    reqJiesan: function(clubId) {
        var that = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.clubDestroy", {clubId:clubId},
            function(rtn) {
                MjClient.unblock();
                if (rtn.code == 0) {
                    if (cc.sys.isObjectValid(that)) {
                        that.removeFromParent();

                        if (that._parent && that._parent != MjClient.FriendCard_main_ui)
                            that._parent.removeFromParent();
                    }
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("解散失败");
                    }
                }

            }
        );
    },
    reqCreate: function(param, ruleParam) {
        var that = this;
        var param_2 = this.compareChange(param,ruleParam,true);

        var sendInfo = this.getSendInfo(param_2.new_param);
        sendInfo["type"] = 1;
        sendInfo.inviterId = that._inviterId; //发起邀请的俱乐部ID
        sendInfo.clubId = that._clubId; //被邀请的俱乐部ID

        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.leagueCreate", sendInfo,
            function(rtn) {
                MjClient.unblock();
                postEvent("createLM_ret", {inviterId: that._inviterId, clubId:that._clubId});
                if (rtn.code == 0) {
                    if (MjClient.FriendCard_main_ui)
                    {
                        postEvent("friendCard_clubListUpdate", {clubId: rtn.data ? rtn.data.leagueId : null});
                    }
                    else
                        MjClient.Scene.addChild(new FriendCard_main(rtn.data.leagueId));
                    if (cc.sys.isObjectValid(that))
                        that.removeFromParent();

                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Qinyouquan_cetan_Chuangjianqinyouquan_Chuangjian_Chenggong", {uid:SelfUid()});
                } else {
                    if (rtn.specialList && rtn.specialList.length > 0) {
                        MjClient.Scene.addChild(new FriendCard_LM_failDialog(rtn.specialList));
                        if (cc.sys.isObjectValid(that))
                            that.removeFromParent();
                    }

                    if (rtn.message) {
                        MjClient.showToast(rtn.message);

                    } else {
                        MjClient.showToast("创建失败");
                    }
                }

            }
        );
    },
    //如果设置自主开房,将不传其他参数
    getSendInfo:function(param)
    {
        var noDelInfo = ["gameType", "maxPlayer", "round", "payWay", "customInfo", "isFangzuobi", "convertible", "ruleName","fangkaSource","fangkaCount","fangkaFree","fangkaExtra"];
        for (var i = 1; i <= this._ruleBtnNum; i++) {
            if (param["rule" + i] && param["rule" + i].customInfo == true) {
                for (var info in param["rule" + i]) {
                    if (noDelInfo.indexOf(info) == -1) {
                        delete param["rule" + i][info];
                    }
                }
            }
        }
        return param;
    },
    reqChange: function(clubId,param, ruleParam) {
        var that = this;
        var param_2 = this.compareChange(param,ruleParam);

        if (!param_2.isChange) {
            if (!param.isRemain)
                that.removeFromParent();
            else if (that._ruleIndex) {
                that.removeFromParent();
            }
            return;
        }
        param_2.new_param.leagueId = clubId;
        var sendInfo = this.getSendInfo(param_2.new_param);

        cc.log("leagueUpdate sendInfo",JSON.stringify(sendInfo))
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.leagueUpdate", sendInfo,
            function(rtn) {
                MjClient.unblock();
                if (rtn.message) {
                    MjClient.showToast(rtn.message);
                    if (cc.sys.isObjectValid(that) && !param.isRemain)
                        that.removeFromParent();
                    else if (cc.sys.isObjectValid(that) && that._ruleIndex) {
                        that.removeFromParent();
                    }
                } else {
                    MjClient.showToast("修改失败");
                }

            }
        );
    },
    //对比改变
    compareChange:function(param, ruleParam,isCreate){
        cc.log(" ===== 对比改变 +++++");
        var new_param = {};
        var isChange = false;
        param.title = escape(FriendCard_Common.strReplace(param.title));
        param.notice = escape(FriendCard_Common.strReplace(param.notice));
        
        if(this.play_isArrearage && this.play_isArrearage.visible){
            param.isArrearage = this.play_isArrearage.isSelected() ? 1 :0;
            param.isArrearage = 0;
        }

        if (isCreate) {
            new_param = param;
            for (var i = 1; i <= this._ruleBtnNum; i++) {
                new_param["rule" + i] = ruleParam["rule" + i];
                isChange = true;
            }
        }else{
            if (!param.isRemain) {
                for (var key in param) {
                    if (param[key] != this._data.info[key] && (this._data.info[key] == 0 || this._data.info[key])) {
                        new_param[key] = param[key];
                        isChange = true;
                    }
                }
                for(var i = 1; i <= this._ruleBtnNum; i++){
                    if(JSON.stringify(ruleParam["rule" + i] || "") != JSON.stringify(this._data.info["rule" + i] || "")){
                        new_param["rule" + i] = ruleParam["rule" + i];
                        isChange = true;
                    }
                }
            } else {
                if (param.isRemain) {
                    var number = param.isRemain;
                    if (!this._data.info["rule" + number] && ruleParam["rule" + number] != "delete") {
                        //添加新的玩法
                        new_param["rule" + number] = ruleParam["rule" + number];
                        isChange = true;
                    } else if (!this._data.info["rule" + number] && ruleParam["rule" + number] == "delete") {
                        // 添加新的玩法的时候，并没有保存而是删除本来就没有的玩法
                        return {new_param:new_param,isChange:isChange};
                    } else {
                        if (JSON.stringify(ruleParam["rule" + number]) != JSON.stringify(this._data.info["rule" + number])) {
                            new_param["rule" + number] = ruleParam["rule" + number];
                            isChange = true;
                        }
                    }
                } else {
                    for (var i = 1; i <= this._ruleBtnNum; i++) {
                        if(JSON.stringify(ruleParam["rule" + i] || "") != JSON.stringify(this._data.info["rule" + i] || "")){
                            new_param["rule" + i] = ruleParam["rule" + i];
                            isChange = true;
                        }
                    }
                }
            }
        }
        
        return {new_param:new_param,isChange:isChange};
    },
    initSelectLayer: function(node) {
        var back_selectType = node.getChildByName("back_selectType")
        if (!back_selectType) return;
        this._back_selectType = back_selectType;
        setWgtLayout(back_selectType,[0.5055,0.5472],[0.5,0.5],[0,0]);
        for (var i = 0; i < 2; i++) {
            var btn = back_selectType.getChildByName("btn_type" + i)
            btn.selType = i;
            btn.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    this._clubType = sender.selType;
                    this.switchLayer(2)
                }  
            }, this);
        }
        var btn_close =  back_selectType.getChildByName("btn_close")
        btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent();
            }
        }, this);
    },
    //index = 1 创建俱乐部 打开选择俱乐部类型
    //index = 2 打开俱乐部设置
    switchLayer: function(index) {
        if (index == 1) {
            this._back.visible = false;
            this._back_selectType.visible = true;
            popupAnm(this._back_selectType);
        } else {
            if (this._back_selectType) {
                this._back_selectType.visible = false;
            }
            this._back.visible = true;
            popupAnm(this._back);
        }
        this.playIsArrearage();
    },
    playIsArrearage: function() {
        //允许欠一次房卡  
        if(this.play_isArrearage)
        {
             this.play_isArrearage.visible = this._clubType == 1;
             this.play_isArrearage.setSelected(this._data && this._data.info.isArrearage);
             return
        }
        this.play_isArrearage = this.back.getChildByName("play_isArrearage");
        if (this.play_isArrearage) {
            this.play_isArrearage.getChildByName("text").ignoreContentAdaptWithSize(true);
            this.play_isArrearage.getChildByName("text").setString("允许0钻石试玩一次");
            if(FriendCard_Common.getSkinType() == 3){
                this.play_isArrearage.x -= 50;
            }
            this.play_isArrearage.setSelected(this._data && this._data.info.isArrearage);
            this.play_isArrearage.getChildByName("text").addTouchEventListener(function(sender, type) {
                if (type == 2)
                    this.play_isArrearage.setSelected(!this.play_isArrearage.isSelected());
            }, this);
            this.play_isArrearage.visible = this._clubType == 1;
            this.play_isArrearage.visible = false;
        }
    },
    initLayer: function(node, data, layer, ruleIndex, sourceName) {
        var that = this;
        var _back = node.getChildByName("back");
        this._back = _back;
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);
        COMMON_UI.setNodeTextAdapterSize(_back);

        this._node_1 = _back.getChildByName("Node_1");
        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Qinyouquan_cetan_Chuangjianqinyouquan_Guanbi", {
                    uid: SelfUid()
                });
                that.removeFromParent();
            }
        }, this);
        closeBtnAddLight(_close);

        var _btn_jiesan = this._node_1.getChildByName("btn_jiesan");
        _btn_jiesan.visible = false; //产品需求 先将解散俱乐部屏蔽
        // if (data && data.info.creator && MjClient.data.pinfo.uid == data.info.creator) 
        //  _btn_jiesan.setVisible(true);
        // else
        //  _btn_jiesan.setVisible(false);

        // _btn_jiesan.addTouchEventListener(function(sender, type) {
        //     if (type == 2) {
        //         var uiPara = {}
        //         uiPara.msg = "解散亲友圈后，数据不可恢复，\n请慎重操作！";
        //         uiPara.yes = function() {
        //             that.reqJiesan(data.info.clubId);  
        //         }
        //         uiPara.no = function() {
        //         }
        //         uiPara.close = function() {
        //         }
        //         MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
        //     }
        // }, this);

        var _TextBg = this._node_1.getChildByName("inputimg");
        this._textName = new cc.EditBox(cc.size(_TextBg.width, _TextBg.height), new cc.Scale9Sprite("friendCards/info/img_di.png"));
        this._textName.setFontColor(cc.color("2b344d"));
        this._textName.setMaxLength(8);
        this._textName.setFontSize(30);
        this._textName.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        this._textName.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        this._textName.setFontName("fonts/lanting.TTF");
        this._textName.setPlaceHolder("最多8个字");
        this._textName.setPlaceholderFontSize(30);
        this._textName.setPlaceholderFontColor(cc.color("2b344d"))
        this._textName.setPosition(_TextBg.getContentSize().width / 2, _TextBg.getContentSize().height / 2);
        _TextBg.addChild(this._textName);


        var _TextBg_2 = this._node_1.getChildByName("inputimg_2");
        this._textNotice = new cc.EditBox(cc.size(_TextBg_2.width, _TextBg_2.height), new cc.Scale9Sprite("friendCards/info/img_di1.png"));
        this._textNotice.setFontColor(cc.color("2b344d"));
        this._textNotice.setMaxLength(80);
        this._textNotice.setFontSize(30);
        this._textNotice.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this._textNotice.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        this._textNotice.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        this._textNotice.setFontName("fonts/lanting.TTF");
        this._textNotice.setPlaceHolder("最多可输入" + FriendCard_Common.FRIEND_NOTICE_MAX_LENGTH + "个字");
        this._textNotice.setPlaceholderFontSize(30);

        this._textNotice.setString("请遵守法律法规，健康游戏，禁止赌博！");
        this._textNotice.setTouchEnabled(true);
        
        this.editBoxEditingDidBegin = function(editBox) {

        }.bind(this);
        this.editBoxEditingDidEnd = function(editBox) {

        }.bind(this);
        this.editBoxTextChanged = function(editBox, text) {
            var result = stringLengthForMysql(editBox.getString(), FriendCard_Common.FRIEND_NOTICE_MAX_LENGTH * 3);
            if (result.len > FriendCard_Common.FRIEND_NOTICE_MAX_LENGTH * 3) {
                editBox.setString(result.txt);
                MjClient.showToast("最多可输入" + FriendCard_Common.FRIEND_NOTICE_MAX_LENGTH + "个字");
            }
        }.bind(this);

        this.editBoxReturn = function(editBox) {

        }.bind(this);
        this._textNotice.setDelegate(this);

        this._textNotice.setPlaceholderFont("点击输入内容", 24);
        this._textNotice.setPosition(_TextBg_2.getContentSize().width / 2, _TextBg_2.getContentSize().height / 2);
        _TextBg_2.addChild(this._textNotice);

        if (data) {
            this._textName.setString(unescape(data.info.title))
            this._textNotice.setString(unescape(data.info.notice))
        }

        //右边的节点
        this._node_2 = _back.getChildByName("Node_2");
        //描述
        var text_desc = this._node_2.getChildByName("Text_0");
        text_desc.setString("最多配置"+this._ruleBtnNum+"种玩法，拖动玩法按钮可以修改排序");

        this._textRule = this._node_2.getChildByName("Text_rule");
        this._textRule.setString("");
        this._btnScrollView = this._node_2.getChildByName("ScrollView_1");
        this._btn_setPlay = this._btnScrollView.getChildByName("Button_setPlay");
        this._btn_setPlay.visible = false;// 联盟里面 可以完全不用 这个 按钮了


        this._btn_setPlay.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (that._sourceName != "addRule") {
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Shezhi_Tianjiawanfa", {
                        uid: SelfUid()
                    });
                }

                var number = 1;
                var ruleName = "";
                if (MjClient.RuleParam["rule" + number] && MjClient.RuleParam["rule" + number].ruleName)
                    ruleName = MjClient.RuleParam["rule" + number].ruleName;
                else if (data && data.info["rule" + number] && data.info["rule" + number].ruleName)
                    ruleName = data.info["rule" + number].ruleName;

                postEvent("createRoom", {
                    IsFriendCard: true,
                    isLM: true, // 是否联盟
                    ruleNumer: number,
                    ruleName: ruleName,
                    clubType: that._clubType,
                    isLM: true,
                    isMatch:that._isMatch,
                    isAntiAddictionMode:that._isAntiAddictionMode
                });
            }
        });


        var wanfaBtns = [];
        this.wanfaBtns = wanfaBtns;
        this.xuhaoImgs = [];
        var onTouchListerer = function(sender, type) {
            if (type == 0) {
                sender.beginTime = new Date().getTime();
            } else if (type == 2 || type == 3) {
                if (that.isDeleteMoveRuleMode && new Date().getTime() - sender.beginTime > 500)
                    return;
            }
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tianjiachuangjian", {
                    uid: SelfUid()
                });
                var number = this.wanFaIndex;
                var ruleName = "";
                var isShowLibertyCreRoom = false;
                if (MjClient.RuleParam["rule" + number] && MjClient.RuleParam["rule" + number].ruleName)
                    ruleName = MjClient.RuleParam["rule" + number].ruleName;
                else if (data && data.info["rule" + number] && data.info["rule" + number].ruleName)
                    ruleName = data.info["rule" + number].ruleName;

                if (MjClient.RuleParam["rule" + number] && MjClient.RuleParam["rule" + number].customInfo)
                    isShowLibertyCreRoom = MjClient.RuleParam["rule" + number].customInfo;
                else if (data && data.info["rule" + number] && data.info["rule" + number].customInfo)
                    isShowLibertyCreRoom = data.info["rule" + number].customInfo;

                postEvent("createRoom", {
                    IsFriendCard: true,
                    ruleNumer: number,
                    ruleName: ruleName,
                    clubType: that._clubType,
                    isShowLibertyCreRoom: isShowLibertyCreRoom,
                    isLM: true,
                    isMatch:that._isMatch,
                    isAntiAddictionMode:that._isAntiAddictionMode
                });
            }
        };
        var _wanfaBtn = this._btnScrollView.getChildByName("Button_1");
        _wanfaBtn.visible = false;
        var _xuhao = this._btnScrollView.getChildByName("xuhao_1");
        _xuhao.visible = false;
        var hang = Math.ceil(this._ruleBtnNum/2);
        
        this._diliverHieght = _wanfaBtn.height/ 5 ;
        this._wanfaItemHeight = _wanfaBtn.height;
        var totalHeight = hang * this._wanfaItemHeight + (hang-1) * this._diliverHieght + 50;
        this._btnScrollView.setInnerContainerSize(cc.size(this._btnScrollView.width, totalHeight));

        for (var i = 1; i <= this._ruleBtnNum; i++) {
            var wanfaBtn = _wanfaBtn.clone();
            var xuhao = _xuhao.clone();
            wanfaBtn.visible = true;
            xuhao.visible = true;
            xuhao.getChildByName("Text").setString(i);
            var _posXw = i % 2 == 1 ? 126 : 326;
            var _posXx = i % 2 == 1 ? 30 : 230;
            var _posY = totalHeight - this._wanfaItemHeight * Math.ceil(i / 2) - (Math.ceil(i / 2)-1) * this._diliverHieght;

            wanfaBtn.setPosition(cc.p(_posXw, _posY));
            xuhao.setPosition(cc.p(_posXx, _posY));
            
            this._btnScrollView.addChild(wanfaBtn);
            this._btnScrollView.addChild(xuhao);
            this.xuhaoImgs.push(xuhao);

            this["btton_" + i] = wanfaBtn;
            wanfaBtns.push(wanfaBtn);
            this["btton_" + i].visible = false;
            this["_play_text_" + i] = this["btton_" + i].getChildByName("Text");
            this["btton_" + i].wanFaIndex = i;

            
            this["btton_" + i].addTouchEventListener(onTouchListerer);
            if (typeof(ruleIndex) != "undefined" && ruleIndex == i) {
                this.setVisible(false);
                this.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(function() {
                    that.setVisible(true);
                    postEvent("createRoom", {
                        IsFriendCard: true,
                        ruleNumer: ruleIndex,
                        ruleName: data && data.info["rule" + ruleIndex] ? data.info["rule" + ruleIndex].ruleName : "",
                        clubType: that._clubType,
                        isLM: true,
                        isMatch:that._isMatch,
                        isAntiAddictionMode:that._isAntiAddictionMode
                    });
                })));
            }
            if (data) {
                if (data.info["rule" + i] && data.info["rule" + i].ruleName) {
                    var ruleName = unescape(data.info["rule" + i].ruleName);

                    if (FriendCard_Common.getSkinType() == 3) {
                        if (ruleName.length > 6) {
                            this["_play_text_" + i].setFontSize(17);
                        }
                    }else if (FriendCard_Common.getSkinType() == 4) {
                        var textName = "";
                        var middleIndex = parseInt(ruleName.length/2)-1;
                        for (var j = 0; j < ruleName.length; j++) {
                            if (j == middleIndex){
                                textName = textName + ruleName.charAt(j) + "\n";
                            }else{
                                textName = textName + ruleName.charAt(j);
                            }
                        }
                        ruleName = textName;
                    } else if (ruleName.length > 6) {
                        this["_play_text_" + i].setFontSize(18);
                    }else if(ruleName.length > 5){
                        this["_play_text_" + i].setFontSize(25);
                    }

                    this["_play_text_" + i].setString(ruleName);
                    MjClient.RuleParam["rule" + i] = data.info["rule" + i];
                }
            } else {
                MjClient.RuleParam["rule" + i] = null;
                this["btton_" + i].visible = false;
            }
        }
        //初始化玩法的位置，保证横排y相等，竖排x相等。这个位置会影响wanfaBtns的排序
        for (var i = 1; i <= this._ruleBtnNum; i++) {
            this["btn_pos_" + i] = wanfaBtns[(i - 1)].getPosition();
        }
        for (var i = 1; i <= this._ruleBtnNum; i++) {
            if (i % 2 == 0) {
                this["btn_pos_" + i].y = this["btn_pos_" + (i - 1)].y;
                if (this["btn_pos_" + (i - 2)]) {
                    this["btn_pos_" + i].x = this["btn_pos_" + (i - 2)].x;
                }
            } else {
                if (this["btn_pos_" + (i - 2)]) {
                    this["btn_pos_" + i].x = this["btn_pos_" + (i - 2)].x;
                }
            }
            this.wanfaBtns[i - 1].setPosition(this["btn_pos_" + i]);
            this.wanfaBtns[i - 1].tempP = this["btn_pos_" + i];
        }
        this.updateWanfa();
        UIEventBind(null, this, "friend_room_info_change", function(clubId) {
            that.updateWanfa();
        });

        UIEventBind(null, this, "retainRule", function(clubId) {
            if (typeof(ruleIndex) != "undefined") {
                cc.log("---立即更新玩法---")
                this.onAchieve();
            }
        });
        UIEventBind(null, this, "createRoomPanel_Close", function(clubId) {
            if (typeof(ruleIndex) != "undefined") {
                cc.log("---更新玩法 close---")
                this.removeFromParent();
            }
        });

        var _btn_achieve = this._node_2.getChildByName("btn_achieve");
        

        if (data && data.info.creator) {
            if(FriendCard_Common.getSkinType() == 4){
                _btn_achieve.loadTextureNormal("friendCards/info/btn_save_n.png");
            }else{
                _btn_achieve.loadTextures("friendCards/info/btn_save_n.png", "friendCards/info/btn_save_s.png", "friendCards/info/btn_save_s.png");
            }
        } else {
            if(FriendCard_Common.getSkinType() == 4){
                _btn_achieve.loadTextureNormal("friendCards/info/btn_chuangjian_n.png");
            }else{
                _btn_achieve.loadTextures("friendCards/info/btn_chuangjian_n.png", "friendCards/info/btn_chuangjian_s.png", "friendCards/info/btn_chuangjian_s.png");
            }
        }
        var param = {};

        var onAchieve = function(type) {
            that.updateWanfa();
            var _txt = that._textName.getString();
            _txt = _txt.replace(/\n/g, "");
            _txt = _txt.replace(/\r/g, "");
            param.title = _txt;
            that._textName.setString(_txt);
            param.notice = that._textNotice.getString();
            param.isRemain = type;


            var is_noPlay = false;
            for (var i = 1; i <= this._ruleBtnNum; i++) {
                if (data) {
                    if (MjClient.RuleParam["rule" + i] != "delete") {
                        if ((MjClient.RuleParam["rule" + i] &&
                                MjClient.RuleParam["rule" + i] != "") || (data.info["rule" + i] &&
                                data.info["rule" + i] != "" && data.info["rule" + i] != "delete")) {
                            is_noPlay = true;
                        }
                    }
                } else {
                    if (MjClient.RuleParam["rule" + i] != "delete") {
                        if (MjClient.RuleParam["rule" + i] &&
                            MjClient.RuleParam["rule" + i] != "") {
                            is_noPlay = true;
                        }
                    }
                    
                }
            }
            var ruleParam = {};
            for (i = 1; i <= that._ruleBtnNum; i++) {
                //转换移动的玩法，点保存才转换
                var tranPosition = type ? i : wanfaBtns[(i - 1)].wanFaIndex;
                ruleParam["rule" + i] = MjClient.RuleParam["rule" + tranPosition];
                if (MjClient.RuleParam["rule" + i] && !ruleParam["rule" + i]) {
                    ruleParam["rule" + i] = "delete";
                }
                //cc.log("tranPosition = "+tranPosition +" data = "+JSON.stringify(MjClient.RuleParam["rule" + tranPosition]));
            }
            if (param.title == "") {
                MjClient.showToast("亲友圈名字为空！");
            } else if (param.notice == "") {
                MjClient.showToast("亲友圈公告为空！");
            } else if (!is_noPlay) {
                MjClient.showToast("亲友圈至少有一个玩法！");
            } else {
                if (data) {
                    that.reqChange(data.info.clubId, param, ruleParam);
                } else {
                    that.reqCreate(param, ruleParam);
                }
            }
        }
        this.onAchieve = onAchieve;
        _btn_achieve.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (that._sourceName == "addRule")
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Tianjiawanfa_Baocun", {
                        uid: SelfUid()
                    });
                else if (!data)
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Shezhi_Baocun", {
                        uid: SelfUid()
                    });
                that.onAchieve();
            }
        }, this);

        //移动玩法
        var touchNode = that._btnScrollView.getChildByName("touchNode");
        touchNode.setZOrder(999);
        function intoDeleteMoveRuleMode() {
            if (that.isDeleteMoveRuleMode) {
                return;
            }
            wanfaBtns.sort(function(a, b) {
                if (a.y > b.y) {
                    return -1;
                } else if (a.y == b.y) {
                    return a.x < b.x ? -1 : 1;
                } else {
                    return 1;
                }
            })
            that.isDeleteMoveRuleMode = true;
            that.canMoveWanfaItem = true;
            that.touchListener = cc.EventListener.create(getTouchListener());
            cc.eventManager.addListener(that.touchListener, touchNode);
        }

        var listViewPos = that._btnScrollView.getPosition();
        listViewPos.x = listViewPos.x - (that._btnScrollView.getAnchorPoint().x - 0.5) * that._btnScrollView.width;
        listViewPos.y = listViewPos.y - (that._btnScrollView.getAnchorPoint().y - 0.5) * that._btnScrollView.height;
        var listBottomP = that._btnScrollView.getParent().convertToWorldSpace(cc.p(listViewPos.x,listViewPos.y - that._btnScrollView.height/2));
        var listTopP = that._btnScrollView.getParent().convertToWorldSpace(cc.p(listViewPos.x,listViewPos.y + that._btnScrollView.height/2));
        function getTouchListener() {
            var curIndex = -1;
            var curCloneItem = null;
            var ret = {
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: false,
                onTouchBegan: function(touch, event) {
                    //防止多点触摸异常

                    if (curIndex != -1 && curCloneItem) {
                        wanfaBtns[curIndex].visible = true;
                        wanfaBtns[curIndex].setPosition(wanfaBtns[curIndex].tempP);
                        curCloneItem.removeFromParent(true);
                        delete curCloneItem;
                        curCloneItem = null;
                    }
                    if (!that.canMoveWanfaItem) {
                        return false;
                    }
                    curIndex = -1;
                    that.touchBeginTime = new Date().getTime();
                    var p = touchNode.getParent().convertToNodeSpace(touch.getLocation());
                    for (var i = 0; i < that._ruleBtnNum; i++) {
                        if (wanfaBtns[i].visible && cc.rectContainsPoint(wanfaBtns[i].getBoundingBox(), p)) {
                            curIndex = i;
                            if (wanfaBtns[curIndex].isAddButton) {
                                //wanfaBtns[curIndex].onTouchListerer(wanfaBtns[curIndex],2);
                                return -1;
                            }

                        }
                    }

                    return curIndex != -1;
                },
                onTouchMoved: function(touch, event) {
                    cc.log("onTouchMoved friend info");
                    if (curIndex == -1) {
                        return;
                    }
                    if (!curCloneItem) {
                        var nowTime = new Date().getTime();
                        if (nowTime - that.touchBeginTime > 500) {
                            curCloneItem = wanfaBtns[curIndex].clone();
                            wanfaBtns[curIndex].visible = false;
                            that._btnScrollView.addChild(curCloneItem);
                        } else {
                            return;
                        }
                    }
                    that._btnScrollView.setTouchEnabled(false);
                    var p = touchNode.getParent().convertToNodeSpace(touch.getLocation());
                    curCloneItem.setPosition(p);
                    //判断是否可以玩法区域，偏差30
                    if (p.y > wanfaBtns[0].tempP.y + wanfaBtns[0].height / 2 + 30 || p.y < wanfaBtns[that._ruleBtnNum - 1].tempP.y - wanfaBtns[that._ruleBtnNum - 1].height / 2 - 30 ||
                        p.x < wanfaBtns[0].tempP.x - wanfaBtns[0].width / 2 - 30 || p.x > wanfaBtns[that._ruleBtnNum - 1].tempP.x + wanfaBtns[that._ruleBtnNum - 1].height / 2 + 30) {
                        //cc.log("onTouchMoved friend info can not move");
                        return;
                    } 
                    //找到最近的目标
                    var distance = -1;
                    var moveToIndex = -1;
                    for (var i = 0; i < that._ruleBtnNum; i++) {
                        if (i != curIndex && wanfaBtns[i].visible && !wanfaBtns[i].isAddButton) {
                            var tempDistance = Math.sqrt(Math.pow(curCloneItem.x - wanfaBtns[i].x, 2) + Math.pow(curCloneItem.y - wanfaBtns[i].y, 2));
                            if (distance == -1 || tempDistance < distance) {
                                distance = tempDistance;
                                moveToIndex = i;
                            }
                        }
                    }
                    //最近的目标中心点偏移25内可移动
                    if (moveToIndex > -1 && distance < 25) {
                        //cc.log("onTouchMoved friend info can moveToIndex =  " + moveToIndex);
                        if (!that.canMoveWanfaItem) {
                            return;
                        }
                        that.canMoveWanfaItem = false;

                        //交换数据
                        var tempP = wanfaBtns[curIndex].tempP;
                        var moveAction = cc.moveTo(0.3, wanfaBtns[curIndex].tempP);
                        wanfaBtns[curIndex].tempP = wanfaBtns[moveToIndex].tempP;
                        wanfaBtns[curIndex].setPosition(wanfaBtns[curIndex].tempP);
                        wanfaBtns[moveToIndex].tempP = tempP;

                        wanfaBtns[moveToIndex].runAction(cc.sequence(moveAction, cc.callFunc(function() {
                            that.canMoveWanfaItem = true;
                        })));
                        //这里用用tempP，因为有0.3秒的动画
                        wanfaBtns.sort(function(a, b) {
                            if (a.tempP.y > b.tempP.y) {
                                return -1;
                            } else if (a.tempP.y == b.tempP.y) {
                                return a.tempP.x < b.tempP.x ? -1 : 1;
                            } else {
                                return 1;
                            }
                        })
                        curIndex = moveToIndex;
                    }

                    if(moveToIndex > -1){
                        var oneItemtime = 0.3;//画过1个item要0.5秒
                        var nowP = touch.getLocation();
                        var row = parseInt(wanfaBtns.length/2) + wanfaBtns.length%2;
                        var curRow = parseInt(moveToIndex/2) + moveToIndex%2;
                        if(nowP.y - listBottomP.y < 20){//滑到列表低（不是指最后一个）
                            that._btnScrollView.scrollToBottom(oneItemtime * (row - curRow),false);
                        }else if(listTopP.y - nowP.y < 20){//滑到列表顶（不是指第一个）
                            that._btnScrollView.scrollToTop(oneItemtime * (curRow + 1),false);
                        }else{
                            that._btnScrollView.stopAutoScroll();
                        }
                    }else{
                        that._btnScrollView.stopAutoScroll();
                    }

                },
                onTouchEnded: function(touch, event) {
                    if (curCloneItem && curIndex > -1) {
                        wanfaBtns[curIndex].setPosition(curCloneItem.getPosition());
                        wanfaBtns[curIndex].visible = true;
                        curCloneItem.visible = false;
                        curCloneItem.removeFromParent(true);
                        delete curCloneItem;
                        curCloneItem = null;
                        that.canMoveWanfaItem = false;
                        var moveAction = cc.moveTo(0.3, wanfaBtns[curIndex].tempP);
                        wanfaBtns[curIndex].runAction(cc.sequence(moveAction, cc.callFunc(function() {
                            that.canMoveWanfaItem = true;
                        })));
                    }
                    curIndex = -1;
                    that._btnScrollView.setTouchEnabled(true);
                    that._btnScrollView.stopAutoScroll();
                },
                onTouchCancelled: function(touch, event) {
                    ret.onTouchEnded(touch, event);
                    that._btnScrollView.setTouchEnabled(true);
                    that._btnScrollView.stopAutoScroll();
                }
            };
            return ret;
        }
        intoDeleteMoveRuleMode()
            
    },

});