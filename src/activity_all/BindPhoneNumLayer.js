/**
 * Created by WuXiaoDong on 2018/6/14.
 */

var bindPhoneNumLayer = cc.Layer.extend({
    _bindPhonePanel:null,
    _currentBinding:null,
    _modifyBind:null,
    _title:null,
    _bindPhoneNum0:null,
    _hintNum0:null,
    _hintNum1:null,
    _leftTime:null,
    _btnSend:null,
    _data:null,
    ctor: function (data) {
        this._super();
        if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) 
            var UI = ccs.load("bindingShouJi_3.0.json");
        else
            var UI = ccs.load("bindingShouJi.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;
        this._closeCallback = null;
        this._data = data;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = UI.node.getChildByName("back");

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            setWgtLayout(_back, [0.65,0.65],[0.5,0.5],[0,0]);
        }
        else {
            setWgtLayout(_back, [0.6,0.75],[0.5,0.5],[0,0]);
        }

        //关闭按钮
        var _close = _back.getChildByName("close");
        _close.visible = MjClient.systemConfig.bindMobileCfg != 1;
        if (cc.sys.OS_WINDOWS == cc.sys.os) {
            _close.visible = true;
        }
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if (this._data)
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Xiugaibangding_Close", {uid:SelfUid()});
                self.removeFromParent();
                delete MjClient.jiaYouRedPacketui;
                if (this._closeCallback) {
                    this._closeCallback();
                }
            }
        }, this);
        this._close = _close;

        this._title = _back.getChildByName("title");
        this._bindPhonePanel = _back.getChildByName("Node_bindPhone");
        this._currentBinding = _back.getChildByName("Node_currentBinding");
        this._modifyBind = _back.getChildByName("Node_modifyBind");

        this.initUI();
        return true;
    },

    initUI:function () {
        this._bindPhonePanel.setVisible(false);
        this._currentBinding.setVisible(false);
        this._modifyBind.setVisible(false);

        var pinfo = MjClient.data.pinfo;
        cc.log("wxd=======pinfo"+JSON.stringify(pinfo));
        if(this._data){
            this._close.visible = true;
            this._modifyBind.setVisible(true);
            if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
                this._title.setContentSize(new cc.Sprite("bindPhoneNum_3.0/title_xiugaibangding.png").getContentSize());
                this._title.loadTexture("bindPhoneNum_3.0/title_xiugaibangding.png");
            }
            else {
                this._title.loadTexture("bindPhoneNum/title_modifyBind.png");
            }
            this.initModifyBindPanel();
        }else {
            
            if(pinfo.mobileNum){
                this._close.visible = true;
                this._currentBinding.setVisible(true);
                this._title.loadTexture("bindPhoneNum/title_currentBinding.png");
                this.initCurrentBindingPanel();
            }else {
                this._bindPhonePanel.setVisible(true);
                this._title.loadTexture("bindPhoneNum/title_bindPhone.png");
                this.initBindPhonePanel();
            }
        }
    },

    initBindPhonePanel:function () {
        var self = this;

        //手机号码输入框
        var imagePhoneNum = this._bindPhonePanel.getChildByName("Image_phoneNum");
        this._bindPhoneNum0 = new cc.EditBox(cc.size(460,60), new cc.Scale9Sprite("store/into_number.png"));
        this._bindPhoneNum0.setPlaceholderFontSize(28);
        this._bindPhoneNum0.setMaxLength(11);
        this._bindPhoneNum0.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._bindPhoneNum0.setPlaceHolder("请输入手机号码");
        this._bindPhoneNum0.setPosition(imagePhoneNum.getContentSize().width/2, imagePhoneNum.getContentSize().height/2);
        imagePhoneNum.addChild(this._bindPhoneNum0);

        //验证码
        var imageSecurityCode = this._bindPhonePanel.getChildByName("Image_securityCode");
        this._hintNum0 = new cc.EditBox(cc.size(330,60), new cc.Scale9Sprite("store/into_number.png"));
        this._hintNum0.setPlaceholderFontSize(28);
        this._hintNum0.setMaxLength(6);
        this._hintNum0.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._hintNum0.setPlaceHolder("请输验证码");
        this._hintNum0.setPosition(imageSecurityCode.getContentSize().width/2, imageSecurityCode.getContentSize().height/2);
        imageSecurityCode.addChild(this._hintNum0);

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            this._bindPhoneNum0.setContentSize(cc.size(404,42));
            this._bindPhoneNum0.setFontColor(cc.color("#d3260e"));
            this._bindPhoneNum0.setPlaceholderFontColor(cc.color(255,255,255));
            this._hintNum0.setContentSize(cc.size(270,42));
            this._hintNum0.setFontColor(cc.color("#d3260e"));
            this._hintNum0.setPlaceholderFontColor(cc.color(255,255,255));
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
            this._bindPhoneNum0.setContentSize(cc.size(381,39));
            this._bindPhoneNum0.setFontColor(cc.color("#d3260e"));
            this._bindPhoneNum0.setPlaceholderFontColor(cc.color(255,255,255));
            this._hintNum0.setContentSize(cc.size(200,39));
            this._hintNum0.setFontColor(cc.color("#d3260e"));
            this._hintNum0.setPlaceholderFontColor(cc.color(255,255,255));
        }
        else {
            this._bindPhoneNum0.setFontColor(cc.color("#9f6a36"));
            this._bindPhoneNum0.setPlaceholderFontColor(cc.color("#9f6a36"));
            this._hintNum0.setFontColor(cc.color("#9f6a36"));
            this._hintNum0.setPlaceholderFontColor(cc.color("#9f6a36"));
        }

        var textHint = this._bindPhonePanel.getChildByName("Text_hint");
        textHint.ignoreContentAdaptWithSize(true);
        textHint.setVisible(false);

        this._btnSend = this._bindPhonePanel.getChildByName("btn_send");
        this._btnSend.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                var _str = self._bindPhoneNum0.getString();
                if(_str.length != 11 || parseInt(_str) == 0)
                {
                    MjClient.showToast("请输入正确的手机号码");
                    return;
                }


                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.getVerifyCode", {mobileNum:Number(_str), type:1}, function(rtn)
                {
                    if(rtn.code==0)
                    {
                        MjClient.showToast(rtn.message);
                        sender.setBright(false);
                        sender.setTouchEnabled(false);
                        self._leftTime = 60;
                        self.schedule(self.scheduleUpdateBtn, 1, cc.REPEAT_FOREVER, 0);
                    }
                    else
                    {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showMsg(rtn.message);
                    }
                    MjClient.unblock();
                });
            }
        },this);

        var btnSureBind = this._bindPhonePanel.getChildByName("btn_sureBind");
        btnSureBind.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                var _str = self._bindPhoneNum0.getString();
                if(_str.length != 11 || parseInt(_str) == 0)
                {
                    MjClient.showToast("请输入正确的手机号码");
                    return;
                }

                var _str1 = self._hintNum0.getString();
                if(_str1.length != 6 || parseInt(_str1) == 0)
                {
                    MjClient.showToast("请输入正确的验证码");
                    return;
                }


                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.bindMobileNum", {mobileNum:Number(_str), verifyCode:Number(_str1)}, function(rtn)
                {
                    if(rtn.code==0)
                    {
                        self.initUI();
                        var pinfo = MjClient.data.pinfo;
                        pinfo.mobileNum = _str;
                        self.unscheduleAllCallbacks();
                    }
                    else
                    {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showMsg(rtn.message);
                    }
                    MjClient.unblock();
                });
            }
        },this);
    },

    initCurrentBindingPanel:function () {
        var self = this;
        var textPhoneNum = this._currentBinding.getChildByName("Text_phoneNum_0");
        var pinfo = MjClient.data.pinfo;
        if(pinfo.mobileNum){
            textPhoneNum.setString(pinfo.mobileNum);
        }else {
            textPhoneNum.setString("");
        }

        var btnModifyBind = this._currentBinding.getChildByName("btn_modifyBind");
        btnModifyBind.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                self._bindPhonePanel.setVisible(false);
                self._currentBinding.setVisible(false);
                self._modifyBind.setVisible(true);
                self._title.loadTexture("bindPhoneNum/title_modifyBind.png");
                self.initModifyBindPanel();
            }
        },this)
    },

    initModifyBindPanel:function () {
        var self = this;
        var textPhoneNum = this._modifyBind.getChildByName("Text_phoneNum_1");
        var pinfo = MjClient.data.pinfo;
        if(pinfo.mobileNum){
            textPhoneNum.setString(pinfo.mobileNum);
        }else {
            textPhoneNum.setString("");
        }

        //验证码
        var imageSecurityCode = this._modifyBind.getChildByName("Image_securityCode_1");
        this._hintNum1 = new cc.EditBox(cc.size(330,60), new cc.Scale9Sprite("store/into_number.png"));
        this._hintNum1.setPlaceholderFontSize(28);
        this._hintNum1.setMaxLength(6);
        this._hintNum1.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._hintNum1.setPlaceHolder("请输验证码");
        this._hintNum1.setPosition(imageSecurityCode.getContentSize().width/2, imageSecurityCode.getContentSize().height/2);
        imageSecurityCode.addChild(this._hintNum1);

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            this._hintNum1.setContentSize(cc.size(270,42));
            this._hintNum1.setFontColor(cc.color("#d3260e"));
            this._hintNum1.setPlaceholderFontColor(cc.color(255,255,255));
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
            this._hintNum1.setContentSize(cc.size(200,39));
            this._hintNum1.setFontColor(cc.color("#d3260e"));
            this._hintNum1.setPlaceholderFontColor(cc.color(255,255,255));
        }
        else {
            this._hintNum1.setFontColor(cc.color("#9f6a36"));
            this._hintNum1.setPlaceholderFontColor(cc.color("#9f6a36"));
        }

        var textHint = this._modifyBind.getChildByName("Text_hint_1");
        textHint.ignoreContentAdaptWithSize(true);
        textHint.setVisible(false);

        this._btnSend = this._modifyBind.getChildByName("btn_send_1");
        this._btnSend.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Xiugaibangding_Fasong", {uid:SelfUid()});
                var _str = MjClient.data.pinfo.mobileNum;
                if(!_str)
                {
                    return;
                }

                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.getVerifyCode", {mobileNum:Number(_str), type:2}, function(rtn)
                {
                    if(rtn.code==0)
                    {
                        MjClient.showToast(rtn.message);
                        sender.setBright(false);
                        sender.setTouchEnabled(false);
                        self._leftTime = 60;
                        self.schedule(self.scheduleUpdateBtn, 1, cc.REPEAT_FOREVER, 0);
                    }
                    else
                    {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showMsg(rtn.message);
                    }
                    MjClient.unblock();
                });
            }
        },this);

        var btnSubmit = this._modifyBind.getChildByName("btn_submit");
        btnSubmit.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Xiugaibangding_Tijiao", {uid:SelfUid()});
                var _str1 = self._hintNum1.getString();
                if(_str1.length != 6 || parseInt(_str1) == 0)
                {
                    MjClient.showToast("请输入正确的验证码");
                    return;
                }

                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.checkVerifyCode", {mobileNum:Number(pinfo.mobileNum), verifyCode:Number(_str1)}, function(rtn)
                {
                    if(rtn.code==0)
                    {
                        self._bindPhonePanel.setVisible(true);
                        self._currentBinding.setVisible(false);
                        self._modifyBind.setVisible(false);
                        self._title.loadTexture("bindPhoneNum/title_bindPhone.png");
                        self.unscheduleAllCallbacks();
                        self.initBindPhonePanel();
                    }
                    else
                    {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showMsg(rtn.message);
                    }
                    MjClient.unblock();
                });
            }
        },this);
    },

    scheduleUpdateBtn:function () {
        // cc.log("wxd++++++schedule");
        if(this._leftTime > 0){
            this._btnSend.getTitleRenderer().setString(this._leftTime+"s");
            this._btnSend.getTitleRenderer().setPosition(this._btnSend.width/2, -this._btnSend.height/4);
        }else {
            this.unschedule(this.scheduleUpdateBtn);
            this._btnSend.getTitleRenderer().setString("");
            this._btnSend.setBright(true);
            this._btnSend.setTouchEnabled(true);
        }
        this._leftTime--;
    },
    setCloseCallback:function(callback)
    {
        
        this._closeCallback = callback;

    },
});


var bindPhoneNumNewLayer = cc.Layer.extend({
    _nodeBindPhone:null,
    _nodeGetReward:null,
    _btnSend:null,
    _textTime:null,
    _textHint:null,
    _rewardData:null,
    _rewardType:0,
    ctor: function (sourceName) {
        this._super();
        var UI = ccs.load("bindingShoujiNewLayer.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;
        this._closeCallback = null;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [0.6,0.75],[0.5,0.5],[0,0]);

        //关闭按钮
        var _close = _back.getChildByName("close");
        _close.visible = MjClient.systemConfig.bindMobileCfg != 1;
        if (cc.sys.OS_WINDOWS == cc.sys.os) {
            _close.visible = true;
        }
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if (sourceName == "autoPop")
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jinrutanchuang_Bangdingshoujihao_Close", {uid:SelfUid()});
                else
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingshouji_Close", {uid:SelfUid()});
                self.removeFromParent();
                if (this._closeCallback) {
                    this._closeCallback();
                }
            }
        }, this);

        var close2 = _close.clone();
        close2.visible = true;
        close2.setPosition(cc.p(450, 560));
        close2.setOpacity(0);
        _back.addChild(close2);
        this._clickNum = 0;
        close2.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if(this._clickNum < 4){
                    this._clickNum++;
                    return;
                }
                self.removeFromParent();
                if (this._closeCallback) {
                    this._closeCallback();
                }
            }
        }, this, false);

        

        this._nodeBindPhone = _back.getChildByName("Node_bindPhone");
        this._nodeGetReward = _back.getChildByName("Node_getReward");

        this.initBindPhoneUI(sourceName);
        return true;
    },

    initBindPhoneUI:function (sourceName) {
        this._nodeBindPhone.setVisible(true);
        this._nodeGetReward.setVisible(false);

        // var TextTishi = this._nodeBindPhone.getChildByName("Text_tishi");
        // TextTishi.ignoreContentAdaptWithSize(true);
        // if(isAgent()){
        //     TextTishi.setString("亲爱的代理，输入手机号码领取惊喜礼包哦！绑定手机号，\n微信被封手机登。账户更安全，收益有保障！");
        // }else {
        //     TextTishi.setString("亲爱的玩家，输入手机号码领取惊喜礼包哦！绑定\n手机更安全更方便~");
        // }

        var self = this;

        //手机号码输入框
        var imagePhoneNum = this._nodeBindPhone.getChildByName("Image_phoneNum");
        this._bindPhoneNum0 = new cc.EditBox(cc.size(imagePhoneNum.width,imagePhoneNum.height), new cc.Scale9Sprite("bindPhoneNum/input.png"));
        this._bindPhoneNum0.setPlaceholderFontSize(30);
        this._bindPhoneNum0.setMaxLength(11);
        this._bindPhoneNum0.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._bindPhoneNum0.setPlaceHolder("请输入手机号码");
        this._bindPhoneNum0.setPosition(imagePhoneNum.width/2, imagePhoneNum.height/2);
        imagePhoneNum.addChild(this._bindPhoneNum0);

        //验证码
        var imageSecurityCode = this._nodeBindPhone.getChildByName("Image_securityCode");
        this._hintNum0 = new cc.EditBox(cc.size(imageSecurityCode.width,imageSecurityCode.height), new cc.Scale9Sprite("bindPhoneNum/input.png"));
        this._hintNum0.setPlaceholderFontSize(28);
        this._hintNum0.setMaxLength(6);
        this._hintNum0.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._hintNum0.setPlaceHolder("请输验证码");
        this._hintNum0.setPosition(imageSecurityCode.width/2, imageSecurityCode.height/2);
        imageSecurityCode.addChild(this._hintNum0);

        this._bindPhoneNum0.setFontColor(cc.color("#f35f00"));
        this._bindPhoneNum0.setPlaceholderFontColor(cc.color("#a19e94"));
        this._hintNum0.setFontColor(cc.color("#f35f00"));
        this._hintNum0.setPlaceholderFontColor(cc.color("#a19e94"));

        this._textTime = this._nodeBindPhone.getChildByName("Text_time");
        this._textTime.ignoreContentAdaptWithSize(true);
        this._textTime.setVisible(false);
        this._textHint = this._nodeBindPhone.getChildByName("Text_hint");
        this._textHint.ignoreContentAdaptWithSize(true);
        this._textHint.setVisible(false);

        var Text_tip = new ccui.Text("老朋友，为了保证回馈到您，此步骤不能跳过哦.","fonts/lanting.TTF",24);
        Text_tip.setTextColor(cc.color("#852B0C"));
        Text_tip.setPosition(cc.p(0, 94));
        this._nodeBindPhone.addChild(Text_tip);

        this._btnSend = this._nodeBindPhone.getChildByName("btn_send");
        this._btnSend.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingshouji_Fasong", {uid:SelfUid()});
                var _str = self._bindPhoneNum0.getString();
                if(_str.length != 11 || parseInt(_str) == 0)
                {
                    MjClient.showToast("请输入正确的手机号码");
                    return;
                }


                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.getVerifyCode", {mobileNum:Number(_str), type:1}, function(rtn) {
                    if(rtn.code==0) {
                        MjClient.showToast(rtn.message);
                        sender.setBright(false);
                        sender.setTouchEnabled(false);
                        self._leftTime = 60;
                        self.schedule(self.scheduleUpdateBtn, 1, cc.REPEAT_FOREVER, 0);
                    } else {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showMsg(rtn.message);
                    }
                    MjClient.unblock();
                });
            }
        },this);

        var btnSureBind = this._nodeBindPhone.getChildByName("btn_sureBind");
        btnSureBind.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if (sourceName == "autoPop")
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jinrutanchuang_Bangdingshoujihao_Lingqulibao", {uid:SelfUid()});
                else
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingshouji_Lingqulibao", {uid:SelfUid()});
                var _str = self._bindPhoneNum0.getString();
                if(_str.length != 11 || parseInt(_str) == 0) {
                    MjClient.showToast("请输入正确的手机号码");
                    return;
                }

                var _str1 = self._hintNum0.getString();
                if(_str1.length != 6 || parseInt(_str1) == 0) {
                    MjClient.showToast("请输入正确的验证码");
                    return;
                }

                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.bindMobileNum", {mobileNum:Number(_str), verifyCode:Number(_str1)}, function(rtn) {
                    cc.log("wxd.....获取奖品接口..."+JSON.stringify(rtn));
                    if(rtn.code==0) {
                        MjClient.homeui._btn_bangdingshouji.visible = false;
                        MjClient.showToast(rtn.message);
                        var pinfo = MjClient.data.pinfo;
                        pinfo.mobileNum = _str;
                        self.unscheduleAllCallbacks();
                        if(rtn.data.bind){
                            self._rewardData = rtn.data.award;
                            self.initGetRewardUI();
                        }else {
                            self.removeFromParent();
                        }
                    } else {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showToast(rtn.message);
                    }
                    MjClient.unblock();
                });
            }
        },this);
    },

    initGetRewardUI:function () {
        this._nodeBindPhone.setVisible(false);
        this._nodeGetReward.setVisible(true);

        var self = this;
        // this._rewardData = {};
        // this._rewardData.integral = 30;
        // this._rewardData.money = 30;
        // this._rewardData.gold = 30;

        // var textPhone = this._nodeGetReward.getChildByName("Text_phone_0");
        // textPhone.ignoreContentAdaptWithSize(true);
        // var pinfo = MjClient.data.pinfo;
        // if(pinfo.mobileNum){
        //     textPhone.setString("您已成功绑定手机号："+pinfo.mobileNum+"\n"+"请选择元宝或礼券领取~");
        //     if(MjClient.APP_TYPE.AYGUIZHOUMJ == MjClient.getAppType()){
        //         textPhone.setString("您已成功绑定手机号："+pinfo.mobileNum+"\n"+"请选择元宝领取~");
        //     }
        // }
        var rewardArr = [];
        var yuanbao = this._nodeGetReward.getChildByName("yuanbao");
        var yuanbaoImage_select = yuanbao.getChildByName("Image_select");
        yuanbaoImage_select.setVisible(false);
        if(this._rewardData.money && this._rewardData.money>0) {
            var textYuanbao = yuanbao.getChildByName("Text_yuanbao");
            textYuanbao.ignoreContentAdaptWithSize(true);
            textYuanbao.setString(this._rewardData.money + "元宝");
            rewardArr.push(yuanbao);
        }else {
            yuanbao.setVisible(false);
        }

        var liquan = this._nodeGetReward.getChildByName("liquan");
        var liquanImage_select = liquan.getChildByName("Image_select");
        liquanImage_select.setVisible(false);
        if(this._rewardData.integral && this._rewardData.integral>0) {
            var textLiquan = liquan.getChildByName("Text_liquan");
            textLiquan.ignoreContentAdaptWithSize(true);
            textLiquan.setString(this._rewardData.integral + "礼券");
            rewardArr.push(liquan);
        }else {
            liquan.setVisible(false);
        }

        var zuanshi = this._nodeGetReward.getChildByName("zuanshi");
        var zuanshiImage_select = zuanshi.getChildByName("Image_select");
        zuanshiImage_select.setVisible(false);
        if(this._rewardData.gold && this._rewardData.gold>0){
            var textZuanshi = zuanshi.getChildByName("Text_zuanshi");
            textZuanshi.ignoreContentAdaptWithSize(true);
            textZuanshi.setString(this._rewardData.gold + "金币");
            rewardArr.push(zuanshi);
        }else {
            zuanshi.setVisible(false);
        }


        if(rewardArr.length == 1){
            rewardArr[0].x = 0;
        }else if(rewardArr.length == 2){
            rewardArr[0].x = -125;
            rewardArr[1].x = 125;
        }else if(rewardArr.length == 3){
            rewardArr[0].x = -250;
            rewardArr[1].x = 0;
            rewardArr[2].x = 250;
        }

        yuanbao.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                self._rewardType = 1;
                yuanbaoImage_select.setVisible(true);
                liquanImage_select.setVisible(false);
                zuanshiImage_select.setVisible(false);
            }
        },this);
        liquan.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                self._rewardType = 4;
                yuanbaoImage_select.setVisible(false);
                liquanImage_select.setVisible(true);
                zuanshiImage_select.setVisible(false);
            }
        },this);
        zuanshi.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                self._rewardType = 6;
                yuanbaoImage_select.setVisible(false);
                liquanImage_select.setVisible(false);
                zuanshiImage_select.setVisible(true);
            }
        },this);

        var btnSureGet = this._nodeGetReward.getChildByName("btn_sure_get");
        btnSureGet.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(self._rewardType == 0){
                    MjClient.showToast("请选择一个奖品");
                }else {
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.bindMobileNumAward", {key:self._rewardType}, function(rtn) {
                        if(rtn.code==0) {
                            MjClient.showToast(rtn.message);
                            self.removeFromParent();
                            MjClient.Scene.addChild(new bindPhoneRewardLayer(rtn.data))
                        } else {
                            if (!cc.isUndefined(rtn.message))
                                MjClient.showToast(rtn.message);
                        }
                        MjClient.unblock();
                    });
                }
            }
        },this);
    },

    scheduleUpdateBtn:function () {
        // cc.log("wxd++++++schedule");
        if(this._leftTime > 0){
            this._textTime.setVisible(true);
            this._textTime.setString(this._leftTime);
            this._textHint.setVisible(true);
        }else {
            this.unschedule(this.scheduleUpdateBtn);
            this._textTime.setString("");
            this._textHint.setVisible(false);
            this._btnSend.setBright(true);
            this._btnSend.setTouchEnabled(true);
        }
        this._leftTime--;
    },

    setCloseCallback:function(callback) {
        this._closeCallback = callback;
    }
});


var bindPhoneRewardLayer = cc.Layer.extend({
    ctor: function (data) {
        this._super();
        var UI = ccs.load("bindShoujiRewardLayer.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1,1],[0.5,0.5],[0,0]);

        //关闭按钮
        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        var img = _back.getChildByName("Image");
        var textReward = img.getChildByName("Text_reward");
        textReward.ignoreContentAdaptWithSize(true);
        var textTishi = _back.getChildByName("Text_tishi");
        textTishi.ignoreContentAdaptWithSize(true);
        if(data.money){
            img.loadTexture("bindPhoneNum/yuanbao.png");
            textReward.setString(data.money+"元宝");
            textTishi.setString("绑定成功，恭喜获得"+data.money+"元宝！")
        }else if(data.integral){
            img.loadTexture("bindPhoneNum/liquan.png");
            textReward.setString(data.integral+"礼券");
            textTishi.setString("绑定成功，恭喜获得"+data.integral+"礼券！")
        }else if(data.gold){
            img.loadTexture("bindPhoneNum/jinbi.png");
            textReward.setString(data.gold+"金币");
            textTishi.setString("绑定成功，恭喜获得"+data.gold+"金币！")
        }

        var imageGuang = _back.getChildByName("Image_guang");
        imageGuang.runAction(cc.repeatForever(cc.rotateBy(3, 360)));

        for(var i = 0; i<5; i++){
            var light = _back.getChildByName("light_"+i);
            light.setOpacity(0);
            light.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.2*i),cc.fadeTo(0.2,255),cc.delayTime(0.2),cc.fadeTo(0.2,0),cc.sequence(cc.delayTime(1.2 - 0.2*i)))));
        }

        return true;
    },
});

//新版 岳阳 邵阳
var bindPhoneNumNewLayer2 = cc.Layer.extend({
    _nodeBindPhone:null,
    _nodeGetReward:null,
    _btnSend:null,
    _textTime:null,
    _textHint:null,
    _rewardData:null,
    _rewardType:0,
    ctor: function (sourceName) {
        this._super();
        var UI = ccs.load("bindingShoujiNewLayer.json");
        this._rootUI = UI.node;
        // this.addChild(this._rootUI);//wj 隐藏绑定手机界面
        var self = this;
        this._closeCallback = null;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1,1],[0.5,0.5],[0,0]);
        _back.visible = true;
        this._back = _back;

        var _back0 = UI.node.getChildByName("back_0");
        _back0.visible = false;
        setWgtLayout(_back0, [1,1],[0.5,0.5],[0,0]);
        this._back0 = _back0;

        //关闭按钮
        var _close = _back.getChildByName("close");

        _close.visible = MjClient.systemConfig.bindMobileCfg != 1;
        if (cc.sys.OS_WINDOWS == cc.sys.os) {
            _close.visible = true;
        }
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if (sourceName == "autoPop")
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jinrutanchuang_Bangdingshoujihao_Close", {uid:SelfUid()});
                else
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingshouji_Close", {uid:SelfUid()});
                self.removeFromParent();
                if (this._closeCallback) {
                    this._closeCallback();
                }
            }
        }, this);

        var close2 = _close.clone();
        close2.visible = true;
        close2.setPosition(cc.p(1070, 340));
        close2.setOpacity(0);
        _back.addChild(close2);
        this._clickNum = 0;
        close2.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if(this._clickNum < 4 ){
                    this._clickNum++;
                    return;
                }
                self.removeFromParent();
                if (this._closeCallback) {
                    this._closeCallback();
                }
            }
        }, this, false);

        var _close2 = _back0.getChildByName("close");
        _close2.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if (sourceName == "autoPop")
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jinrutanchuang_Bangdingshoujihao_Close", {uid:SelfUid()});
                else
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingshouji_Close", {uid:SelfUid()});
                self.removeFromParent();
                if (this._closeCallback) {
                    this._closeCallback();
                }
            }
        }, this);

        this._nodeBindPhone = _back.getChildByName("Node_bindPhone");
        this._nodeGetReward = _back0.getChildByName("Node_getReward");

        this.initBindPhoneUI(sourceName);
        // this.initGetRewardUI();
        return true;
    },

    initBindPhoneUI:function (sourceName) {
        this._back.setVisible(true);
        this._back0.setVisible(false);

        // var TextTishi = this._nodeBindPhone.getChildByName("Text_tishi");
        // TextTishi.ignoreContentAdaptWithSize(true);
        // if(isAgent()){
        //     TextTishi.setString("亲爱的代理，输入手机号码领取惊喜礼包哦！绑定手机号，\n微信被封手机登。账户更安全，收益有保障！");
        // }else {
        //     TextTishi.setString("亲爱的玩家，输入手机号码领取惊喜礼包哦！绑定\n手机更安全更方便~");
        // }

        var self = this;

        //手机号码输入框
        var imagePhoneNum = this._nodeBindPhone.getChildByName("Image_phoneNum");
        this._bindPhoneNum0 = new cc.EditBox(cc.size(imagePhoneNum.width,imagePhoneNum.height), new cc.Scale9Sprite("bindPhoneNum/input.png"));
        this._bindPhoneNum0.setPlaceholderFontSize(30);
        this._bindPhoneNum0.setMaxLength(11);
        this._bindPhoneNum0.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._bindPhoneNum0.setPlaceHolder("请输入手机号码");
        this._bindPhoneNum0.setPosition(imagePhoneNum.width/2, imagePhoneNum.height/2);
        imagePhoneNum.addChild(this._bindPhoneNum0);

        //验证码
        var imageSecurityCode = this._nodeBindPhone.getChildByName("Image_securityCode");
        this._hintNum0 = new cc.EditBox(cc.size(imageSecurityCode.width,imageSecurityCode.height), new cc.Scale9Sprite("bindPhoneNum/input.png"));
        this._hintNum0.setPlaceholderFontSize(28);
        this._hintNum0.setMaxLength(6);
        this._hintNum0.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._hintNum0.setPlaceHolder("请输验证码");
        this._hintNum0.setPosition(imageSecurityCode.width/2, imageSecurityCode.height/2);
        imageSecurityCode.addChild(this._hintNum0);

        this._bindPhoneNum0.setFontColor(cc.color("#f35f00"));
        this._bindPhoneNum0.setPlaceholderFontColor(cc.color("#a19e94"));
        this._hintNum0.setFontColor(cc.color("#f35f00"));
        this._hintNum0.setPlaceholderFontColor(cc.color("#a19e94"));

        this._textTime = this._nodeBindPhone.getChildByName("Text_time");
        this._textTime.ignoreContentAdaptWithSize(true);
        this._textTime.setVisible(false);
        this._textHint = this._nodeBindPhone.getChildByName("Text_hint");
        this._textHint.ignoreContentAdaptWithSize(true);
        this._textHint.setVisible(false);

        this._text_desc = this._nodeBindPhone.getChildByName("Text_desc");
        this._text_desc.ignoreContentAdaptWithSize(true);
        this._text_desc.setString("老朋友，为了保证回馈到您，此步骤不能跳过哦。");
        this._text_desc.x -= 50;
        this._text_desc.setVisible(true);

        this._btnSend = this._nodeBindPhone.getChildByName("btn_send");
        this._btnSend.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingshouji_Fasong", {uid:SelfUid()});
                var _str = self._bindPhoneNum0.getString();
                if(_str.length != 11 || parseInt(_str) == 0)
                {
                    MjClient.showToast("请输入正确的手机号码");
                    return;
                }


                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.getVerifyCode", {mobileNum:Number(_str), type:1}, function(rtn) {
                    if(rtn.code==0) {
                        MjClient.showToast(rtn.message);
                        sender.setBright(false);
                        sender.setTouchEnabled(false);
                        self._leftTime = 60;
                        self.schedule(self.scheduleUpdateBtn, 1, cc.REPEAT_FOREVER, 0);
                    } else {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showMsg(rtn.message);
                    }
                    MjClient.unblock();
                });
            }
        },this);

        var btnSureBind = this._nodeBindPhone.getChildByName("btn_sureBind");
        btnSureBind.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if (sourceName == "autoPop")
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jinrutanchuang_Bangdingshoujihao_Lingqulibao", {uid:SelfUid()});
                else
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingshouji_Lingqulibao", {uid:SelfUid()});
                var _str = self._bindPhoneNum0.getString();
                if(_str.length != 11 || parseInt(_str) == 0) {
                    MjClient.showToast("请输入正确的手机号码");
                    return;
                }

                var _str1 = self._hintNum0.getString();
                if(_str1.length != 6 || parseInt(_str1) == 0) {
                    MjClient.showToast("请输入正确的验证码");
                    return;
                }

                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.bindMobileNum", {mobileNum:Number(_str), verifyCode:Number(_str1)}, function(rtn) {
                    cc.log("wxd.....获取奖品接口..."+JSON.stringify(rtn));
                    if(rtn.code==0) {
                        MjClient.homeui._btn_bangdingshouji.visible = false;
                        MjClient.showToast(rtn.message);
                        var pinfo = MjClient.data.pinfo;
                        pinfo.mobileNum = _str;
                        self.unscheduleAllCallbacks();
                        if(rtn.data.bind){
                            self._rewardData = rtn.data.award;
                            self.initGetRewardUI();
                        }else {
                            self.removeFromParent();
                        }
                    } else {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showToast(rtn.message);
                    }
                    MjClient.unblock();
                });
            }
        },this);
    },

    initGetRewardUI:function () {
        this._back.setVisible(false);
        this._back0.setVisible(true);

        var self = this;
        // this._rewardData = {};
        // this._rewardData.integral = 30;
        // this._rewardData.money = 30;
        // this._rewardData.fangka = 30;

        // var textPhone = this._nodeGetReward.getChildByName("Text_phone_0");
        // textPhone.ignoreContentAdaptWithSize(true);
        // var pinfo = MjClient.data.pinfo;
        // if(pinfo.mobileNum){
        //     textPhone.setString("您已成功绑定手机号："+pinfo.mobileNum+"\n"+"请选择元宝或礼券领取~");
        //     if(MjClient.APP_TYPE.AYGUIZHOUMJ == MjClient.getAppType()){
        //         textPhone.setString("您已成功绑定手机号："+pinfo.mobileNum+"\n"+"请选择元宝领取~");
        //     }
        // }
        var rewardArr = [];
        var yuanbao = this._nodeGetReward.getChildByName("yuanbao");
        var yuanbaoImage_select = yuanbao.getChildByName("Image_select");
        yuanbaoImage_select.setVisible(false);
        if(this._rewardData.money && this._rewardData.money>0) {
            var textYuanbao = yuanbao.getChildByName("Text_yuanbao");
            textYuanbao.ignoreContentAdaptWithSize(true);
            textYuanbao.setString(this._rewardData.money + "元宝");
            rewardArr.push(yuanbao);
        }else {
            yuanbao.setVisible(false);
        }

        var zuanshi = this._nodeGetReward.getChildByName("zuanshi");
        var zuanshiImage_select = zuanshi.getChildByName("Image_select");
        zuanshiImage_select.setVisible(false);
        if(this._rewardData.gold && this._rewardData.gold>0){
            var textZuanshi = zuanshi.getChildByName("Text_zuanshi");
            textZuanshi.ignoreContentAdaptWithSize(true);
            textZuanshi.setString(this._rewardData.gold + "金币");
            rewardArr.push(zuanshi);
        }else {
            zuanshi.setVisible(false);
        }

        var liquan = this._nodeGetReward.getChildByName("liquan");
        var liquanImage_select = liquan.getChildByName("Image_select");
        liquanImage_select.setVisible(false);
        if(this._rewardData.integral && this._rewardData.integral>0) {
            var textLiquan = liquan.getChildByName("Text_liquan");
            textLiquan.ignoreContentAdaptWithSize(true);
            textLiquan.setString(this._rewardData.integral + "礼券");
            rewardArr.push(liquan);
        }else {
            liquan.setVisible(false);
        }

        if(rewardArr.length == 1){
            rewardArr[0].x = -87;
        }else if(rewardArr.length == 2){
            rewardArr[0].x = -216;
            rewardArr[1].x = 42;
        }else if(rewardArr.length == 3){
            rewardArr[0].x = -276;
            rewardArr[1].x = -87;
            rewardArr[2].x = 102;
        }

        yuanbao.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                self._rewardType = 1;
                yuanbaoImage_select.setVisible(true);
                liquanImage_select.setVisible(false);
                zuanshiImage_select.setVisible(false);
                btnSureGet.setBright(true);
                // btnSureGet.setTouchEnabled(true);
            }
        },this);
        liquan.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                self._rewardType = 4;
                yuanbaoImage_select.setVisible(false);
                liquanImage_select.setVisible(true);
                zuanshiImage_select.setVisible(false);
                btnSureGet.setBright(true);
                // btnSureGet.setTouchEnabled(true);
            }
        },this);
        zuanshi.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                self._rewardType = 6;
                yuanbaoImage_select.setVisible(false);
                liquanImage_select.setVisible(false);
                zuanshiImage_select.setVisible(true);
                btnSureGet.setBright(true);
                // btnSureGet.setTouchEnabled(true);
            }
        },this);

        var btnSureGet = this._nodeGetReward.getChildByName("btn_sure_get");
        btnSureGet.setBright(false);
        // btnSureGet.setTouchEnabled(false);
        btnSureGet.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(self._rewardType == 0){
                    MjClient.showToast("请选择一个奖品");
                }else {
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.bindMobileNumAward", {key:self._rewardType}, function(rtn) {
                        if(rtn.code==0) {
                            MjClient.showToast(rtn.message);
                            self.removeFromParent();
                            MjClient.Scene.addChild(new bindPhoneRewardLayer2(rtn.data))
                        } else {
                            if (!cc.isUndefined(rtn.message))
                                MjClient.showToast(rtn.message);
                        }
                        MjClient.unblock();
                    });
                }
            }
        },this);
    },

    scheduleUpdateBtn:function () {
        // cc.log("wxd++++++schedule");
        if(this._leftTime > 0){
            this._textTime.setVisible(true);
            this._textTime.setString(this._leftTime);
            this._textHint.setVisible(true);
            this._text_desc.setVisible(false);
        }else {
            this.unschedule(this.scheduleUpdateBtn);
            this._textTime.setString("");
            this._textHint.setVisible(false);
            this._btnSend.setBright(true);
            this._btnSend.setTouchEnabled(true);
            this._text_desc.setVisible(true);
        }
        this._leftTime--;
    },

    setCloseCallback:function(callback) {
        this._closeCallback = callback;
    }
});


var bindPhoneRewardLayer2 = cc.Layer.extend({
    ctor: function (data) {
        this._super();
        var data = data ||{};
        var UI = ccs.load("bindShoujiRewardLayer.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1,1],[0.5,0.5],[0,0]);

        //关闭按钮
        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        var img = _back.getChildByName("Image");
        var textReward = _back.getChildByName("Text_reward");
        textReward.ignoreContentAdaptWithSize(true);

        if(data.money){
            img.loadTexture("usernfo/icon_yuanbao.png");
            textReward.setString("X " + data.money);
        }else if(data.integral){
            img.loadTexture("usernfo/icon_liquan.png");
            textReward.setString("X " + data.integral);
        }else if(data.gold){
            img.loadTexture("store/jb1.png");
            textReward.setString("X " + data.gold);
        }

        var node_2 = _back.getChildByName("node_2");
        this._phoneLoginPanel = _back.getChildByName("Node_phoneLogin");
        this._phoneLoginPanel.visible = false;
        node_2.visible = true;

        var btn_renzheng = _back.getChildByName("btn_renzheng");
        btn_renzheng.addTouchEventListener(function(sender, type){
            if(type == ccui.Widget.TOUCH_ENDED){  
                this._phoneLoginPanel.visible = true;
                node_2.visible = false;
            }
        },this);

        var btn_shouji = node_2.getChildByName("btn_shouji");
        btn_shouji.addTouchEventListener(function(sender, type){
            if(type == ccui.Widget.TOUCH_ENDED){
                MjClient.logout();
                this.removeFromParent();

            }
        },this);

        var btn_zhidao = node_2.getChildByName("btn_zhidao");
        btn_zhidao.addTouchEventListener(function(sender, type){
            if(type == ccui.Widget.TOUCH_ENDED){
                this.removeFromParent();
            }
        },this);


        var appType = MjClient.getAppType();
        var self = this;
        var defaultColor1 = cc.color("#9f6a36");
        var defaultColor2 = cc.color("#9f6a36");
        if(appType === MjClient.APP_TYPE.QXYYQP || appType == MjClient.APP_TYPE.HUBEIMJ || appType == MjClient.APP_TYPE.YLHUNANMJ)
        {
            defaultColor1 = cc.color("#d3260e");
            defaultColor2 = cc.color("#ffffff");
        } else if(appType == MjClient.APP_TYPE.BDHYZP) {
            defaultColor1 = cc.color("#db1500");
            defaultColor2 = cc.color("#ffffff");
        }

        var textphone = this._phoneLoginPanel.getChildByName("Text_phone");
        var textSecurityCode = this._phoneLoginPanel.getChildByName("Text_securityCode");
        textphone.ignoreContentAdaptWithSize(true);
        textSecurityCode.ignoreContentAdaptWithSize(true);
        //手机号码输入框
        var imagePhoneNum = this._phoneLoginPanel.getChildByName("Image_phoneNum");
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            this._bindPhoneNum0 = new cc.EditBox(cc.size(imagePhoneNum.width,imagePhoneNum.height), new cc.Scale9Sprite("ui/shiMingRenZheng/shuru.png"));
        }else {
            this._bindPhoneNum0 = new cc.EditBox(cc.size(imagePhoneNum.width,imagePhoneNum.height), new cc.Scale9Sprite("store/into_number.png"));
        }

        this._bindPhoneNum0.setFontColor(defaultColor1);
        this._bindPhoneNum0.setPlaceholderFontSize(28);
        if(appType == MjClient.APP_TYPE.BDHYZP) {
            this._bindPhoneNum0.setFontSize(24);
        }
        this._bindPhoneNum0.setPlaceholderFontColor(defaultColor2);
        this._bindPhoneNum0.setMaxLength(11);
        this._bindPhoneNum0.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        this._bindPhoneNum0.setPlaceHolder("请填写姓名");
        this._bindPhoneNum0.setPosition(imagePhoneNum.getContentSize().width/2, imagePhoneNum.getContentSize().height/2);
        imagePhoneNum.addChild(this._bindPhoneNum0);

        //验证码
        var imageSecurityCode = this._phoneLoginPanel.getChildByName("Image_securityCode");
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            this._hintNum0 = new cc.EditBox(cc.size(imageSecurityCode.width,imageSecurityCode.height), new cc.Scale9Sprite("ui/shiMingRenZheng/shuru.png"));
        }else {
            this._hintNum0 = new cc.EditBox(cc.size(imageSecurityCode.width,imageSecurityCode.height), new cc.Scale9Sprite("store/into_number.png"));
        }
        this._hintNum0.setFontColor(cc.color(defaultColor1));
        this._hintNum0.setPlaceholderFontSize(28);
        if(appType == MjClient.APP_TYPE.BDHYZP) {
            this._hintNum0.setFontSize(24);
        }
        this._hintNum0.setPlaceholderFontColor(defaultColor2);
        this._hintNum0.setMaxLength(18);
        this._hintNum0.setInputMode(cc.EDITBOX_INPUT_MODE_EMAILADDR);
        this._hintNum0.setPlaceHolder("请输入身份证号");
        this._hintNum0.setPosition(imageSecurityCode.getContentSize().width/2, imageSecurityCode.getContentSize().height/2);
        imageSecurityCode.addChild(this._hintNum0);


        // 岳阳不隐藏提示语
        var textHint = this._phoneLoginPanel.getChildByName("Text_hint");
        textHint.ignoreContentAdaptWithSize(true);
        if(appType !== MjClient.APP_TYPE.QXYYQP &&  appType !== MjClient.APP_TYPE.YLHUNANMJ &&  appType !== MjClient.APP_TYPE.HUBEIMJ) textHint.setVisible(false);

        var textHint0 = this._phoneLoginPanel.getChildByName("Text_hint_0");
        textHint0.ignoreContentAdaptWithSize(true);
        if(appType !== MjClient.APP_TYPE.QXYYQP &&  appType !== MjClient.APP_TYPE.YLHUNANMJ &&  appType !== MjClient.APP_TYPE.HUBEIMJ) textHint0.setVisible(false);

        var textHint1 = this._phoneLoginPanel.getChildByName("Text_hint_1");
        textHint1.ignoreContentAdaptWithSize(true);


        var btnSureBind = this._phoneLoginPanel.getChildByName("btn_sureBind");
        btnSureBind.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                var mobileNum = self._bindPhoneNum0.getString();
                if(mobileNum.length == 0)
                {
                    MjClient.showToast("请输入正确的姓名");
                    return;
                }

                var verifyCode = self._hintNum0.getString();
                if(verifyCode.length != 18 || parseInt(verifyCode) == 0)
                {
                    MjClient.showToast("请输入正确的身份证号码");
                    return;
                }

                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.updateInfo", {realname:mobileNum, identityNum:verifyCode}, function(rtn)
                {
                    if(rtn.code==0)
                    {
                        MjClient.showToast(rtn.message);
                        self.removeFromParent();
                        if(MjClient.homeui._btn_shimingrenzheng){
                            MjClient.homeui._btn_shimingrenzheng.setVisible(false);
                        }
                    }
                    else
                    {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showMsg(rtn.message);
                    }
                    MjClient.unblock();
                });
            }
        },this);


        return true;
    },
});

// 3.0版本
var bindPhoneNumNewLayer_v3 = cc.Layer.extend({
    _nodeBindPhone:null,
    _nodeGetReward:null,
    _btnSend:null,
    _textTime:null,
    _textHint:null,
    _rewardData:null,
    _rewardType:0,
    ctor: function (sourceName) {
        this._super();
        var UI = ccs.load("bindingShoujiNewLayer_3.0.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;
        this._closeCallback = null;


        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1,1],[0.5,0.5],[0,0]);
        _back.visible = true;
        this._back = _back;

        var _back0 = UI.node.getChildByName("back_0");
        _back0.visible = false;
        setWgtLayout(_back0, [1,1],[0.5,0.5],[0,0]);
        this._back0 = _back0;

        var _suizi = _back.getChildByName("suizi");
        //穗子动画
        if(_suizi) 
            COMMON_UI.suiziAni(_suizi,8);
        else
            COMMON_UI.popDialogAni(_back);

        //关闭按钮
        var _close = _back.getChildByName("close");
        _close.visible = MjClient.systemConfig.bindMobileCfg != 1;
        if (cc.sys.OS_WINDOWS == cc.sys.os) {
            _close.visible = true;
        }
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if (sourceName == "autoPop")
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jinrutanchuang_Bangdingshoujihao_Close", {uid:SelfUid()});
                else
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingshouji_Close", {uid:SelfUid()});
                self.removeFromParent();
                if (this._closeCallback) {
                    this._closeCallback();
                }
            }
        }, this);

        var close2 = _close.clone();
        close2.visible = true;
        close2.setPosition(cc.p(1070, 340));
        close2.setOpacity(0);
        _back.addChild(close2);
        this._clickNum = 0;
        close2.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if(this._clickNum < 4 ){
                    this._clickNum++;
                    return;
                }
                self.removeFromParent();
                if (this._closeCallback) {
                    this._closeCallback();
                }
            }
        }, this, false);

        var _close2 = _back0.getChildByName("close");
        _close2.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if (sourceName == "autoPop")
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jinrutanchuang_Bangdingshoujihao_Close", {uid:SelfUid()});
                else
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingshouji_Close", {uid:SelfUid()});
                self.removeFromParent();
                if (this._closeCallback) {
                    this._closeCallback();
                }
            }
        }, this);

        this._nodeBindPhone = _back.getChildByName("Node_bindPhone");
        this._nodeGetReward = _back0.getChildByName("Node_getReward");

        this.initBindPhoneUI(sourceName);
        // this.initGetRewardUI();
        return true;
    },

    initBindPhoneUI:function (sourceName) {
        this._back.setVisible(true);
        this._back0.setVisible(false);

        // var TextTishi = this._nodeBindPhone.getChildByName("Text_tishi");
        // TextTishi.ignoreContentAdaptWithSize(true);
        // if(isAgent()){
        //     TextTishi.setString("亲爱的代理，输入手机号码领取惊喜礼包哦！绑定手机号，\n微信被封手机登。账户更安全，收益有保障！");
        // }else {
        //     TextTishi.setString("亲爱的玩家，输入手机号码领取惊喜礼包哦！绑定\n手机更安全更方便~");
        // }

        var self = this;

        //手机号码输入框
        var imagePhoneNum = this._nodeBindPhone.getChildByName("Image_phoneNum");
        this._bindPhoneNum0 = new cc.EditBox(cc.size(imagePhoneNum.width,imagePhoneNum.height), new cc.Scale9Sprite("bindPhoneNum/input.png"));
        this._bindPhoneNum0.setPlaceholderFontSize(30);
        this._bindPhoneNum0.setMaxLength(11);
        this._bindPhoneNum0.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._bindPhoneNum0.setPlaceHolder("请输入手机号码");
        this._bindPhoneNum0.setPosition(imagePhoneNum.width/2, imagePhoneNum.height/2);
        imagePhoneNum.addChild(this._bindPhoneNum0);

        //验证码
        var imageSecurityCode = this._nodeBindPhone.getChildByName("Image_securityCode");
        this._hintNum0 = new cc.EditBox(cc.size(imageSecurityCode.width,imageSecurityCode.height), new cc.Scale9Sprite("bindPhoneNum/input.png"));
        this._hintNum0.setPlaceholderFontSize(28);
        this._hintNum0.setMaxLength(6);
        this._hintNum0.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._hintNum0.setPlaceHolder("请输验证码");
        this._hintNum0.setPosition(imageSecurityCode.width/2, imageSecurityCode.height/2);
        imageSecurityCode.addChild(this._hintNum0);

        this._bindPhoneNum0.setFontColor(cc.color("#f35f00"));
        this._bindPhoneNum0.setPlaceholderFontColor(cc.color("#a19e94"));
        this._hintNum0.setFontColor(cc.color("#f35f00"));
        this._hintNum0.setPlaceholderFontColor(cc.color("#a19e94"));

        this._textTime = this._nodeBindPhone.getChildByName("Text_time");
        this._textTime.ignoreContentAdaptWithSize(true);
        this._textTime.setVisible(false);
        this._textHint = this._nodeBindPhone.getChildByName("Text_hint");
        this._textHint.ignoreContentAdaptWithSize(true);
        this._textHint.setVisible(false);

        this._text_desc = this._nodeBindPhone.getChildByName("Text_desc");
        this._text_desc.ignoreContentAdaptWithSize(true);
        this._text_desc.setString("老朋友，为了保证回馈到您，此步骤不能跳过哦。");
        this._text_desc.x -= 50;
        this._text_desc.setVisible(true);

        this._btnSend = this._nodeBindPhone.getChildByName("btn_send");
        this._btnSend.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingshouji_Fasong", {uid:SelfUid()});
                var _str = self._bindPhoneNum0.getString();
                if(_str.length != 11 || parseInt(_str) == 0)
                {
                    MjClient.showToast("请输入正确的手机号码");
                    return;
                }


                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.getVerifyCode", {mobileNum:Number(_str), type:1}, function(rtn) {
                    if(rtn.code==0) {
                        MjClient.showToast(rtn.message);
                        sender.setBright(false);
                        sender.setTouchEnabled(false);
                        self._leftTime = 60;
                        self.schedule(self.scheduleUpdateBtn, 1, cc.REPEAT_FOREVER, 0);
                    } else {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showMsg(rtn.message);
                    }
                    MjClient.unblock();
                });
            }
        },this);

        var btnSureBind = this._nodeBindPhone.getChildByName("btn_sureBind");
        btnSureBind.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if (sourceName == "autoPop")
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Jinrutanchuang_Bangdingshoujihao_Lingqulibao", {uid:SelfUid()});
                else
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingshouji_Lingqulibao", {uid:SelfUid()});
                var _str = self._bindPhoneNum0.getString();
                if(_str.length != 11 || parseInt(_str) == 0) {
                    MjClient.showToast("请输入正确的手机号码");
                    return;
                }

                var _str1 = self._hintNum0.getString();
                if(_str1.length != 6 || parseInt(_str1) == 0) {
                    MjClient.showToast("请输入正确的验证码");
                    return;
                }

                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.bindMobileNum", {mobileNum:Number(_str), verifyCode:Number(_str1)}, function(rtn) {
                    cc.log("wxd.....获取奖品接口..."+JSON.stringify(rtn));
                    if(rtn.code==0) {
                        MjClient.homeui._btn_bangdingshouji.visible = false;
                        MjClient.showToast(rtn.message);
                        var pinfo = MjClient.data.pinfo;
                        pinfo.mobileNum = _str;
                        self.unscheduleAllCallbacks();
                        if(rtn.data.bind){
                            self._rewardData = rtn.data.award;
                            self.initGetRewardUI();
                        }else {
                            self.removeFromParent();
                        }
                    } else {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showToast(rtn.message);
                    }
                    MjClient.unblock();
                });
            }
        },this);
    },

    initGetRewardUI:function () {
        this._back.setVisible(false);
        this._back0.setVisible(true);

        var self = this;
        // this._rewardData = {};
        // this._rewardData.integral = 10;
        // this._rewardData.money = 30;
        // this._rewardData.fangka = 20;

        // var textPhone = this._nodeGetReward.getChildByName("Text_phone_0");
        // textPhone.ignoreContentAdaptWithSize(true);
        // var pinfo = MjClient.data.pinfo;
        // if(pinfo.mobileNum){
        //     textPhone.setString("您已成功绑定手机号："+pinfo.mobileNum+"\n"+"请选择元宝或礼券领取~");
        //     if(MjClient.APP_TYPE.AYGUIZHOUMJ == MjClient.getAppType()){
        //         textPhone.setString("您已成功绑定手机号："+pinfo.mobileNum+"\n"+"请选择元宝领取~");
        //     }
        // }
        var rewardArr = [];
        var yuanbao = this._nodeGetReward.getChildByName("yuanbao");
        var yuanbaoImage_select = yuanbao.getChildByName("Image_select");
        yuanbaoImage_select.setVisible(false);
        if(this._rewardData.money && this._rewardData.money>0) {
            var textYuanbao = yuanbao.getChildByName("Text_yuanbao");
            textYuanbao.ignoreContentAdaptWithSize(true);
            textYuanbao.setString(this._rewardData.money + "元宝");
            rewardArr.push(yuanbao);
        }else {
            yuanbao.setVisible(false);
        }

        var zuanshi = this._nodeGetReward.getChildByName("zuanshi");
        var zuanshiImage_select = zuanshi.getChildByName("Image_select");
        zuanshiImage_select.setVisible(false);
        if(this._rewardData.gold && this._rewardData.gold>0){
            var textZuanshi = zuanshi.getChildByName("Text_zuanshi");
            textZuanshi.ignoreContentAdaptWithSize(true);
            textZuanshi.setString(this._rewardData.gold + "金币");
            rewardArr.push(zuanshi);
        }else {
            zuanshi.setVisible(false);
        }

        var liquan = this._nodeGetReward.getChildByName("liquan");
        var liquanImage_select = liquan.getChildByName("Image_select");
        liquanImage_select.setVisible(false);
        if(this._rewardData.integral && this._rewardData.integral>0) {
            var textLiquan = liquan.getChildByName("Text_liquan");
            textLiquan.ignoreContentAdaptWithSize(true);
            textLiquan.setString(this._rewardData.integral + "礼券");
            rewardArr.push(liquan);
        }else {
            liquan.setVisible(false);
        }

        var _pos1 = yuanbao.x;
        var _pos2 = zuanshi.x;
        var _pos3 = liquan.x;

        if(rewardArr.length == 1){
            rewardArr[0].x = _pos2;
        }else if(rewardArr.length == 2){
            rewardArr[0].x = _pos1 + 15;
            rewardArr[1].x = _pos3 - 15;
        }else if(rewardArr.length == 3){
            rewardArr[0].x = _pos1;
            rewardArr[1].x = _pos2;
            rewardArr[2].x = _pos3;
        }

        yuanbao.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                self._rewardType = 1;
                yuanbaoImage_select.setVisible(true);
                liquanImage_select.setVisible(false);
                zuanshiImage_select.setVisible(false);
                btnSureGet.setBright(true);
                // btnSureGet.setTouchEnabled(true);
            }
        },this);
        liquan.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                self._rewardType = 4;
                yuanbaoImage_select.setVisible(false);
                liquanImage_select.setVisible(true);
                zuanshiImage_select.setVisible(false);
                btnSureGet.setBright(true);
                // btnSureGet.setTouchEnabled(true);
            }
        },this);
        zuanshi.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                self._rewardType = 6;
                yuanbaoImage_select.setVisible(false);
                liquanImage_select.setVisible(false);
                zuanshiImage_select.setVisible(true);
                btnSureGet.setBright(true);
                // btnSureGet.setTouchEnabled(true);
            }
        },this);

        var btnSureGet = this._nodeGetReward.getChildByName("btn_sure_get");
        btnSureGet.setBright(false);
        // btnSureGet.setTouchEnabled(false);
        btnSureGet.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(self._rewardType == 0){
                    MjClient.showToast("请选择一个奖品");
                }else {
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.bindMobileNumAward", {key:self._rewardType}, function(rtn) {
                        if(rtn.code==0) {
                            MjClient.showToast(rtn.message);
                            self.removeFromParent();
                            MjClient.Scene.addChild(new bindPhoneRewardLayer_v3(rtn.data))
                        } else {
                            if (!cc.isUndefined(rtn.message))
                                MjClient.showToast(rtn.message);
                        }
                        MjClient.unblock();
                    });
                }
            }
        },this);
    },

    scheduleUpdateBtn:function () {
        // cc.log("wxd++++++schedule");
        if(this._leftTime > 0){
            this._textTime.setVisible(true);
            this._textTime.setString(this._leftTime);
            this._textHint.setVisible(true);
            this._text_desc.setVisible(false);
        }else {
            this.unschedule(this.scheduleUpdateBtn);
            this._textTime.setString("");
            this._textHint.setVisible(false);
            this._btnSend.setBright(true);
            this._btnSend.setTouchEnabled(true);
            this._text_desc.setVisible(true);
        }
        this._leftTime--;
    },

    setCloseCallback:function(callback) {
        this._closeCallback = callback;
    }
});

var bindPhoneRewardLayer_v3 = cc.Layer.extend({
    ctor: function (data) {
        this._super();
        var data = data ||{};
        var UI = ccs.load("bindShoujiRewardLayer_3.0.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1,1],[0.5,0.5],[0,0]);

        var _suizi = _back.getChildByName("suizi");
        //穗子动画
        if(_suizi) 
            COMMON_UI.suiziAni(_suizi,8);
        else
            COMMON_UI.popDialogAni(_back);

        //关闭按钮
        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        var img = _back.getChildByName("Image");
        var textReward = img.getChildByName("Text_reward");
        textReward.ignoreContentAdaptWithSize(true);

        if(data.money){
            img.loadTexture("EMail_3.0/gold.png");
            textReward.setString("元宝 X " + data.money);
        }else if(data.integral){
            img.loadTexture("EMail_3.0/giftCertificate.png");
            textReward.setString("礼券 X " + data.integral);
        }else if(data.gold){
            img.loadTexture("EMail_3.0/coin.png");
            textReward.setString("金币 X " + data.gold);
        }
        img.x = 645;





        var node_2 = _back.getChildByName("node_2");
        this._phoneLoginPanel = _back.getChildByName("Node_phoneLogin");
        this._phoneLoginPanel.visible = false;
        node_2.visible = true;

        var btn_renzheng = _back.getChildByName("btn_renzheng");
        btn_renzheng.addTouchEventListener(function(sender, type){
            if(type == ccui.Widget.TOUCH_ENDED){
                this._phoneLoginPanel.visible = true;
                node_2.visible = false;
                img.x = 426;
            }
        },this);

        var btn_shouji = node_2.getChildByName("btn_shouji");
        btn_shouji.addTouchEventListener(function(sender, type){
            if(type == ccui.Widget.TOUCH_ENDED){
                MjClient.logout();
                this.removeFromParent();

            }
        },this);

        var btn_zhidao = node_2.getChildByName("btn_zhidao");
        btn_zhidao.addTouchEventListener(function(sender, type){
            if(type == ccui.Widget.TOUCH_ENDED){
                this.removeFromParent();
            }
        },this);


        var appType = MjClient.getAppType();
        var self = this;
        var defaultColor1 = cc.color("#9f6a36");
        var defaultColor2 = cc.color("#9f6a36");
        if(appType === MjClient.APP_TYPE.QXYYQP || appType == MjClient.APP_TYPE.HUBEIMJ || appType == MjClient.APP_TYPE.YLHUNANMJ)
        {
            defaultColor1 = cc.color("#d3260e");
            defaultColor2 = cc.color("#ffffff");
        } else if(appType == MjClient.APP_TYPE.BDHYZP) {
            defaultColor1 = cc.color("#db1500");
            defaultColor2 = cc.color("#ffffff");
        }

        var textphone = this._phoneLoginPanel.getChildByName("Text_phone");
        var textSecurityCode = this._phoneLoginPanel.getChildByName("Text_securityCode");
        textphone.ignoreContentAdaptWithSize(true);
        textSecurityCode.ignoreContentAdaptWithSize(true);
        //手机号码输入框
        var imagePhoneNum = this._phoneLoginPanel.getChildByName("Image_phoneNum");
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            this._bindPhoneNum0 = new cc.EditBox(cc.size(imagePhoneNum.width,imagePhoneNum.height), new cc.Scale9Sprite("ui/shiMingRenZheng/shuru.png"));
        }else {
            this._bindPhoneNum0 = new cc.EditBox(cc.size(imagePhoneNum.width,imagePhoneNum.height), new cc.Scale9Sprite("store/into_number.png"));
        }

        this._bindPhoneNum0.setFontColor(defaultColor1);
        this._bindPhoneNum0.setPlaceholderFontSize(28);
        if(appType == MjClient.APP_TYPE.BDHYZP) {
            this._bindPhoneNum0.setFontSize(24);
        }
        this._bindPhoneNum0.setPlaceholderFontColor(defaultColor2);
        this._bindPhoneNum0.setMaxLength(11);
        this._bindPhoneNum0.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        this._bindPhoneNum0.setPlaceHolder("请填写姓名");
        this._bindPhoneNum0.setPosition(imagePhoneNum.getContentSize().width/2, imagePhoneNum.getContentSize().height/2);
        imagePhoneNum.addChild(this._bindPhoneNum0);

        //验证码
        var imageSecurityCode = this._phoneLoginPanel.getChildByName("Image_securityCode");
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            this._hintNum0 = new cc.EditBox(cc.size(imageSecurityCode.width,imageSecurityCode.height), new cc.Scale9Sprite("ui/shiMingRenZheng/shuru.png"));
        }else {
            this._hintNum0 = new cc.EditBox(cc.size(imageSecurityCode.width,imageSecurityCode.height), new cc.Scale9Sprite("store/into_number.png"));
        }
        this._hintNum0.setFontColor(cc.color(defaultColor1));
        this._hintNum0.setPlaceholderFontSize(28);
        if(appType == MjClient.APP_TYPE.BDHYZP) {
            this._hintNum0.setFontSize(24);
        }
        this._hintNum0.setPlaceholderFontColor(defaultColor2);
        this._hintNum0.setMaxLength(18);
        this._hintNum0.setInputMode(cc.EDITBOX_INPUT_MODE_EMAILADDR);
        this._hintNum0.setPlaceHolder("请输入身份证号");
        this._hintNum0.setPosition(imageSecurityCode.getContentSize().width/2, imageSecurityCode.getContentSize().height/2);
        imageSecurityCode.addChild(this._hintNum0);


        // 岳阳不隐藏提示语
        var textHint = this._phoneLoginPanel.getChildByName("Text_hint");
        textHint.ignoreContentAdaptWithSize(true);
        if(appType !== MjClient.APP_TYPE.QXYYQP &&  appType !== MjClient.APP_TYPE.YLHUNANMJ && appType !== MjClient.APP_TYPE.HUBEIMJ) textHint.setVisible(false);

        var textHint0 = this._phoneLoginPanel.getChildByName("Text_hint_0");
        textHint0.ignoreContentAdaptWithSize(true);
        if(appType !== MjClient.APP_TYPE.QXYYQP &&  appType !== MjClient.APP_TYPE.YLHUNANM && appType !== MjClient.APP_TYPE.HUBEIMJ) textHint0.setVisible(false);

        var textHint1 = this._phoneLoginPanel.getChildByName("Text_hint_1");
        textHint1.ignoreContentAdaptWithSize(true);


        var btnSureBind = this._phoneLoginPanel.getChildByName("btn_sureBind");
        btnSureBind.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                var mobileNum = self._bindPhoneNum0.getString();
                if(mobileNum.length == 0)
                {
                    MjClient.showToast("请输入正确的姓名");
                    return;
                }

                var verifyCode = self._hintNum0.getString();
                if(verifyCode.length != 18 || parseInt(verifyCode) == 0)
                {
                    MjClient.showToast("请输入正确的身份证号码");
                    return;
                }

                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.updateInfo", {realname:mobileNum, identityNum:verifyCode}, function(rtn)
                {
                    if(rtn.code==0)
                    {
                        MjClient.showToast(rtn.message);
                        self.removeFromParent();
                        if(MjClient.homeui._btn_shimingrenzheng){
                            MjClient.homeui._btn_shimingrenzheng.setVisible(false);
                        }
                    }
                    else
                    {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showMsg(rtn.message);
                    }
                    MjClient.unblock();
                });
            }
        },this);


        return true;
    },
});

Switch_bindPhone = function(){
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP){
        bindPhoneNumNewLayer = bindPhoneNumNewLayer2;
    }
    if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
        bindPhoneNumNewLayer = bindPhoneNumNewLayer_v3;
    }
}

Switch_bindPhone();

