/**
 * Created by Administrator on 2018/6/20.
 */

var mobilePhoneLoginLayer = cc.Layer.extend({
    ctor: function (callback) {
        this._super();
        if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
            var UI = ccs.load("mobilePhoneLogin_3.0.json");
        else
            var UI = ccs.load("mobilePhoneLogin.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [0.6,0.75],[0.5,0.5],[0,0]);

        //关闭按钮
        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
                if (this._closeCallback) {
                    this._closeCallback();
                }
            }
        }, this);

        this._phoneLoginPanel = _back.getChildByName("Node_phoneLogin");

        var self = this;

        //手机号码输入框
        var imagePhoneNum = this._phoneLoginPanel.getChildByName("Image_phoneNum");
        //this._bindPhoneNum0 = new cc.EditBox(cc.size(460,60), new cc.Scale9Sprite("store/into_number.png"));
        if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            this._bindPhoneNum0 = new cc.EditBox(cc.size(imagePhoneNum.width,imagePhoneNum.height), new cc.Scale9Sprite("ui/playRecord/shurukuang.png"));
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
            this._bindPhoneNum0 = new cc.EditBox(cc.size(imagePhoneNum.width,imagePhoneNum.height), new cc.Scale9Sprite("bindPhoneNum/input.png"));
        }
        else if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
            this._bindPhoneNum0 = new cc.EditBox(cc.size(imagePhoneNum.width,imagePhoneNum.height), new cc.Scale9Sprite());
        }
        else {
            this._bindPhoneNum0 = new cc.EditBox(cc.size(imagePhoneNum.width,imagePhoneNum.height), new cc.Scale9Sprite("store/into_number.png"));
        }

        if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
            this._bindPhoneNum0.setFontColor(cc.color("#ff6f20"));
            this._bindPhoneNum0.setPlaceholderFontSize(26);
            this._bindPhoneNum0.setPlaceholderFontColor(cc.color("#b6b6b5"));
        }
        else {
            this._bindPhoneNum0.setFontColor(cc.color("#ffe28c"));
            this._bindPhoneNum0.setPlaceholderFontSize(28);
            this._bindPhoneNum0.setPlaceholderFontColor(cc.color("#e4ecf0"));
        }
        this._bindPhoneNum0.setMaxLength(11);
        this._bindPhoneNum0.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._bindPhoneNum0.setPlaceHolder("请输入手机号码");
        this._bindPhoneNum0.setPosition(imagePhoneNum.getContentSize().width/2, imagePhoneNum.getContentSize().height/2);
        imagePhoneNum.addChild(this._bindPhoneNum0);

        //验证码
        var imageSecurityCode = this._phoneLoginPanel.getChildByName("Image_securityCode");
        //this._hintNum0 = new cc.EditBox(cc.size(330,60), new cc.Scale9Sprite("store/into_number.png"));
        if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            this._hintNum0 = new cc.EditBox(cc.size(imageSecurityCode.width,imageSecurityCode.height), new cc.Scale9Sprite("ui/playRecord/shurukuang.png"));
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
            this._hintNum0 = new cc.EditBox(cc.size(imageSecurityCode.width,imageSecurityCode.height), new cc.Scale9Sprite("bindPhoneNum/input.png"));
        }
        else if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
            this._hintNum0 = new cc.EditBox(cc.size(imageSecurityCode.width,imageSecurityCode.height), new cc.Scale9Sprite());
        }
        else {
            this._hintNum0 = new cc.EditBox(cc.size(imageSecurityCode.width,imageSecurityCode.height), new cc.Scale9Sprite("store/into_number.png"));
        }
        if (MjClient.isUseUIv3 && MjClient.isUseUIv3()) {
            this._hintNum0.setFontColor(cc.color("#ff6f20"));
            this._hintNum0.setPlaceholderFontSize(26);
            this._hintNum0.setPlaceholderFontColor(cc.color("#b6b6b5"));
        }
        else {
            this._hintNum0.setFontColor(cc.color("#ffe28c"));
            this._hintNum0.setPlaceholderFontSize(28);
            this._hintNum0.setPlaceholderFontColor(cc.color("#e4ecf0"));
        }
        this._hintNum0.setMaxLength(6);
        this._hintNum0.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._hintNum0.setPlaceHolder("请输验证码");
        this._hintNum0.setPosition(imageSecurityCode.getContentSize().width/2, imageSecurityCode.getContentSize().height/2);
        imageSecurityCode.addChild(this._hintNum0);

        // if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || 
        //     MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
        //     MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
        //     MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
        //     MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP) 
        // {
        //     this._bindPhoneNum0.setContentSize(cc.size(404,42));
        //     this._hintNum0.setContentSize(cc.size(270,42));
        // }
        // else if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
        //     this._bindPhoneNum0.setContentSize(cc.size(508,42));
        //     this._hintNum0.setContentSize(cc.size(270,42));
        // }

        if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            this._bindPhoneNum0.setFontColor(cc.color("#db1500"));
            this._hintNum0.setFontColor(cc.color("#db1500"));
            this._bindPhoneNum0.setFontName("fonts/lanting.TTF");
            this._hintNum0.setFontName("fonts/lanting.TTF");
        }

        var textHint = this._phoneLoginPanel.getChildByName("Text_hint");
        textHint.ignoreContentAdaptWithSize(true);
        textHint.setVisible(false);

        this._btnSend = this._phoneLoginPanel.getChildByName("btn_send");
        this._btnSend.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                var _str = self._bindPhoneNum0.getString();
                if(_str.length != 11 || parseInt(_str) == 0)
                {
                    MjClient.showToast("请输入正确的手机号码");
                    return;
                }


                MjClient.block();
                MjClient.gamenet.request("pkcon.handler.getVerifyCode", {mobileNum:Number(_str)}, function(rtn)
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

        var btnSureBind = this._phoneLoginPanel.getChildByName("btn_sureBind");
        btnSureBind.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                var mobileNum = self._bindPhoneNum0.getString();
                if(mobileNum.length != 11 || parseInt(mobileNum) == 0)
                {
                    MjClient.showToast("请输入正确的手机号码");
                    return;
                }

                var verifyCode = self._hintNum0.getString();
                if(verifyCode.length != 6 || parseInt(verifyCode) == 0)
                {
                    MjClient.showToast("请输入正确的验证码");
                    return;
                }

                MjClient.mobileNum = mobileNum;
                MjClient.verifyCode = verifyCode;

                if (callback) callback(mobileNum, verifyCode);
            }
        },this);


        return true;
    },

    scheduleUpdateBtn:function () {
        // cc.log("wxd++++++schedule");
        if(this._leftTime > 0){
            this._btnSend.getTitleRenderer().setString(this._leftTime+"s")
            this._btnSend.getTitleRenderer().setPosition(this._btnSend.width/2, -this._btnSend.height/4)
        }else {
            this.unschedule(this.scheduleUpdateBtn);
            this._btnSend.getTitleRenderer().setString("");
            this._btnSend.setBright(true);
            this._btnSend.setTouchEnabled(true);
        }
        this._leftTime--;
    }
});

var mobilePhone_selectRole = cc.Layer.extend({
    ctor:function (data, callback) {
        this._super();
        var UI = ccs.load("Login_selectRole.json");
        if(MjClient.isUseUIv3 && MjClient.isUseUIv3()){
            UI = ccs.load("Login_selectRole_3.0.json");
        }
        this.addChild(UI.node);
        // data = [{
        //         "id": 1000166,
        //         "headimgurl": "http://thirdwx.qlogo.cn/mmopen/vi_32/Y1mCaIQVQWwPwibpial7xKiaI6ciaWgglIj26HJ1TTiaibiaZvOiaTEEz333EHxrVZlc5ag6DKkqxb9LM2icJTAXYk8BLXg/132",
        //         "nickname": "166%uD83C%uDF84%uD83C%uDF8A%uD83C%uDF38%uD83E%uDD8C",
        //         "mobileNum": "18618399406",
        //         "loginMsg": {
        //             "type": 3,
        //             "desc": "3小时前登录"
        //         }
        //     }, {
        //         "id": 1000168,
        //         "headimgurl": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJVJor0bmCEibIRtJgedLdbBVShJWuFrrUB87wBZG7fCMVeovoqfb7IUjFYygEZ41OibQzGYpLcjc6w/132",
        //         "nickname": "168%uD83C%uDF84%uD83C%uDF8A%uD83C%uDF38%uD83E%uDD8C",
        //         "mobileNum": "18618399406",
        //         "loginMsg": {
        //             "type": 1,
        //             "desc": "离线"
        //         }
        //     }, {
        //         "id": 1992354,
        //         "headimgurl": "http://image.jtcfgame.com/client/yueyang-test/1564729917131.png",
        //         "nickname": "%u5C0F%u8302%u8302%20",
        //         "mobileNum": "18618399406",
        //         "loginMsg": {
        //             "type": 1,
        //             "desc": "离线"
        //         }
        //     }];
        this.data = data;
        this.callback = callback;

        var block = UI.node.getChildByName("block");
        setWgtLayout(block,[1,1],[0.5,0.5],[0,0],true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[1,1],[0.5,0.5],[0,0]);
        var close = _back.getChildByName("close");
        close.addTouchEventListener(function(sender, type){
            if(type == 2){
                this.removeFromParent();
            }
        },this);
        

        var _number = data[0].mobileNum + "";
        var strNumber = ""
        for (var index = 0; index < _number.length; index++) {
            if (index >= 3 && index < 8) {
                strNumber += "*"
            } else {
                strNumber += _number[index]
            }
        }
    
        var text_phone = _back.getChildByName("text_phone");
        text_phone.setString(strNumber);

        for (let i = 1; i <= 5; i++) {
            var _node = _back.getChildByName("cell_" + i);
            if(!_node) continue;
            if(!data[i-1]) {
                _node.visible = false;
                continue;
            }
            this.initItem(_node, data[i-1])
            
        }
        
        
       
        return true;
    },

    initItem:function(copyNode, oneData){
        var path = "login/selectRole/";
        if(MjClient.isUseUIv3 && MjClient.isUseUIv3()){
            path = "login_3.0/selectRole/";
        }
        var text_name = copyNode.getChildByName("text_name");
        text_name.setString(getNewName(unescape(oneData.nickname)));

        var text_id = copyNode.getChildByName("text_id");
        text_id.setString( "ID:" + oneData.id);
        
        var bg_1 = copyNode.getChildByName("bg_1");
        bg_1.loadTexture(path +"lixian_k.png");
        
        var head = copyNode.getChildByName("head");
        this.initHead(oneData.headimgurl, head);
        var img_status = copyNode.getChildByName("img_status");
        var text_status = copyNode.getChildByName("text_status");
        text_status.setString(oneData.loginMsg.desc)
        if(oneData.loginMsg.type == 1){
            img_status.loadTexture(path +"hui.png");
            text_status.setTextColor(cc.color("#88714d"));
        }else if(oneData.loginMsg.type == 2){
            img_status.loadTexture(path +"lv.png");
            text_status.setTextColor(cc.color("#63db28"));
            bg_1.loadTexture(path +"zaixian_k.png")
        }else if(oneData.loginMsg.type == 3){
            img_status.loadTexture(path +"cheng.png");
            text_status.setTextColor(cc.color("#eb982b"));
            
        }
        copyNode.tag = oneData.id;
        copyNode.setTouchEnabled(true);
        copyNode.addTouchEventListener(function(sender, type){
            if(type == 2){
                if(this.callback){
                    this.callback(MjClient.mobileNum, MjClient.verifyCode, sender.tag);
                }
                this.removeFromParent();
                
            }
        },this);

    },
    
    initHead: function(url, head) {

        if(MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
            if(!url) url = "png/default_headpic.png";
            cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
            {
            if(!err && texture && cc.sys.isObjectValid(head))
            {
            var clippingNode = new cc.ClippingNode();
            var mask = new cc.Sprite("hall/headMask.png");
            clippingNode.setAlphaThreshold(0);
            clippingNode.setStencil(mask);
            var img = new cc.Sprite(texture);
            img.setScale(mask.getContentSize().width / img.getContentSize().width);
            clippingNode.addChild(img);
            clippingNode.setPosition(head.getContentSize().width / 2, head.getContentSize().height / 2);

            head.addChild(clippingNode);
            }
            });
        }else{
            cc.loader.loadImg(url ? url : "png/default_headpic.png", {
                isCrossOrigin: true
            }, function(err, texture) {
                if (err || !texture || !sys.isObjectValid(head))
                    return;
    
                var sp = new cc.Sprite(texture);
                if (!sp)
                    return;
    
                sp.setScale((head.width) / sp.width);
                sp.setPosition(cc.p(head.width / 2, head.height / 2));
                head.addChild(sp);
            });
        }
        
    },


});
