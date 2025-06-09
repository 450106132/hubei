
//主界面头像调用 新版~~~优先做岳阳 邵阳
var PlayerInfoBindView_v3 = cc.Layer.extend({
    pinfo:null,
    jsBind:{
        back:{
            node_info:{
                headImg:{
                    _event: {
                        loadWxHead: function (d) {
                            if (d.uid == MjClient.userInfoLayerUi.pinfo.uid) {

                                var sp = new cc.Sprite(d.img);
                                var _pos = {
                                    "x": this.getContentSize().width / 2,
                                    "y": this.getContentSize().height / 2
                                };
                                sp.setPosition(_pos);
                                sp.setScaleX((this.width) / sp.width);
                                sp.setScaleY((this.height) / sp.height);
                                this.addChild(sp);
                                // setWgtLayout(sp, [0.88, 0.88], [0.5, 0.5], [0, 0], false, true);

                            }
                        }
                    }
                },
                headFrame:{
                    _run:function() {
                        this.visible = util.localStorageEncrypt.getBoolItem("_HeadKuangs", true);
                    },
                    _event: {
                        loadWxHead: function (d) {
                            if (d.uid == MjClient.userInfoLayerUi.pinfo.uid) {
                                //遮罩框 用来 替换不同的头像框
                                var _strKuang = MjClient.data.pinfo.aliasId || "TX0";
                                this.loadTexture("userInfo_3.0/zhuangBan/headFrame/" + _strKuang +".png")
                            }
                        },
                        headFrameChange: function () {
                            this.visible = util.localStorageEncrypt.getBoolItem("_HeadKuangs", true);
                        }
                    }
                },
            },
            node_zhuangban:{
                node_touxiang:{
                    img_head:{
                        _event: {
                            loadWxHead: function (d) {
                                if (d.uid == MjClient.userInfoLayerUi.pinfo.uid) {
    
                                    var sp = new cc.Sprite(d.img);
                                    var _pos = {
                                        "x": this.getContentSize().width / 2,
                                        "y": this.getContentSize().height / 2
                                    };
                                    sp.setPosition(_pos);
                                    sp.setScaleX((this.getContentSize().width) / sp.getContentSize().width);
                                    sp.setScaleY((this.getContentSize().height) / sp.getContentSize().height);
                                    this.addChild(sp);
    
                                }
                            }
                        }
                    }
                }
            }
            
        }
    },
    initPhotoShow: function (_back, userInfoLayerUi) {
        var photoNode = _node_info.getChildByName("node_photo")
        var photo = photoNode.getChildByName("img_photo");
        var updatePhotoBtn = photoNode.getChildByName("btn_updatePhoto");

        function refreshPhoto(url) {
            cc.loader.loadImg(url, {
                isCrossOrigin: true
            }, function(err, texture) {
                if (!err && texture && sys.isObjectValid(photo)) {
                    var sp = new cc.Sprite(texture);
                    photo.removeChildByName("sp");
                    photo.removeChildByName("tip");
                    photo.addChild(sp);
                    sp.setName("sp");
                    sp.setPosition(photo.width / 2, photo.height / 2);
                    sp.setScale(photo.width / sp.width < photo.height / sp.height ? photo.width / sp.width : photo.height / sp.height);
                }
            });
        }

        function postPhoto(file) {
            var data = jsb.fileUtils.getDataFromFile(file);
            cc.log("postPhoto:", data ? "data.length=" + data.length : "data=null");
            if (data.length > 512000) {
                cc.log("----test 1-----");
                MjClient.showToastDelay("你选择的图片过大");
                cc.log("----test 2-----");
                return;
            }

            // data 是一个特殊的对像，使用转成数组
            var dataStr = [];
            for (var i = 0; i < data.length; i++) {
                dataStr[i] = data[i];
            }

            var index = file.lastIndexOf(".");
            var sendData = {
                suffix: index != -1 ? file.substring(index) : ".jpg",
                data: dataStr
            }
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.updateInfo", sendData, function(rtn) {
                MjClient.unblock();
                cc.log("postPhoto request ret:", JSON.stringify(rtn));
                if (rtn.message)
                    MjClient.showMsg(rtn.message);
            });
        }

        if (MjClient.data.pinfo.photo)
            refreshPhoto(MjClient.data.pinfo.photo);
        else {
            var tipLabel = new ccui.Text();
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)   //岳阳同一使用方正兰亭
                tipLabel.setFontName("fonts/lanting.TTF");
            else
                tipLabel.setFontName(MjClient.fzcyfont);
            tipLabel.setString("添加个性头像\n让朋友更了解你吧");
            tipLabel.setColor(cc.color(0x44, 0x33, 0x33));
            tipLabel.setFontSize(26);
            tipLabel.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            tipLabel.setName("tip");
            tipLabel.setPosition(photo.width/2, photo.height/2);
            photo.addChild(tipLabel);
        }

        var selectPhotoBlock = userInfoLayerUi.node.getChildByName("selectPhotoBlock");
        setWgtLayout(selectPhotoBlock,[1,1],[0.5,0.5],[0,0],true);

        var selectPhotoNode = userInfoLayerUi.node.getChildByName("selectPhotoNode");
        setWgtLayout(selectPhotoNode, [1,1],[0.5,0.5],[0,0]);

        var cancelBtn = selectPhotoNode.getChildByName("btn_cancel");
        var selectPhotoBtn1 = selectPhotoNode.getChildByName("btn_selectPhoto1");
        var selectPhotoBtn2 = selectPhotoNode.getChildByName("btn_selectPhoto2"); 

        cancelBtn.addTouchEventListener(function (sender, type) {
            if(type == ccui.Widget.TOUCH_ENDED){
                selectPhotoBlock.setVisible(false);
                selectPhotoNode.setVisible(false);
            }
        },this);

        selectPhotoBtn1.addTouchEventListener(function (sender, type) {
            if(type == ccui.Widget.TOUCH_ENDED){
                selectPhotoBlock.setVisible(false);
                selectPhotoNode.setVisible(false);
                MjClient.native.pickPicture.showCamera();
            }
        },this);

        selectPhotoBtn2.addTouchEventListener(function (sender, type) {
            if(type == ccui.Widget.TOUCH_ENDED){
                selectPhotoBlock.setVisible(false);
                selectPhotoNode.setVisible(false);
                MjClient.native.pickPicture.showGallery();
            }
        },this);

        updatePhotoBtn.addTouchEventListener(function (sender, type) {
            if(type == ccui.Widget.TOUCH_ENDED){
                selectPhotoBlock.setVisible(true);
                selectPhotoNode.setVisible(true);
            }
        },this);

        UIEventBind(null, this, "PickPictureFinished", function(rtn) {
            cc.log("PickPictureFinished:", rtn.file);
            if (rtn.file)
                postPhoto(rtn.file);
            cc.log("---------end--------");
        });

        UIEventBind(null, this, "updateInfo", function(rtn) {
            if (rtn.photo)
                refreshPhoto(rtn.photo);
        });
    },
    onExit:function(){
        this._super();
        MjClient.userInfoLayerUi = null;
    },
    ctor:function (pinfo,canEditSignature, showMoney) {
        this._super();
        this.pinfo = pinfo;
        this._data = {};
        var userInfoLayerUi = ccs.load("UserInfo_3.0.json");
        BindUiAndLogic(userInfoLayerUi.node,this.jsBind);
        this.addChild(userInfoLayerUi.node);
        MjClient.userInfoLayerUi = this;
        this.init_guizu = false;
        this.init_zhuangban = false;
        this.selectPage = 1;
       

        var self = this;
        var _block = userInfoLayerUi.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = userInfoLayerUi.node.getChildByName("back");
        setWgtLayout(_back, [1,1],[0.5,0.5],[0,0]);


        
        var _suizi = _back.getChildByName("suizi");
        //穗子动画
        if(_suizi) 
            COMMON_UI.suiziAni(_suizi,8);
        else
            COMMON_UI.popDialogAni(_back);
        //关闭 按钮
        var _btnClose = _back.getChildByName("close");
        _btnClose.addTouchEventListener(function (sender, Type)
        {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    self.removeFromParent();
                    // postEvent("user_treasure_activity",{"lotteryId":17,"isPrize":1});

                    break;
                default :
                    break;
            }
        }, this);
        this._node_info = _back.getChildByName("node_info");
        this._node_guizu = _back.getChildByName("node_guizu");
        this._node_zhuangban = _back.getChildByName("node_zhuangban");

        this._btn_info = _back.getChildByName("btn_info");
        this._btn_info.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                // MjClient.showToast("==== 1")
                this.select_btn(1);
            }
        }, this);
        this._btn_guizu = _back.getChildByName("btn_guizu");
        self._btn_guizu.getChildByName("img_hongdian").visible = false;
        this._btn_guizu.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                // MjClient.showToast("==== 2")
                this.select_btn(2);

                this.reqHuoDong_data();
                // this.init_guizu = false;
                // this.init_zhuangban = false;
                
            }
        }, this);
        this._btn_zhuangban = _back.getChildByName("btn_zhuangban");
        self._btn_zhuangban.getChildByName("img_hongdian").visible = false;
        this._btn_zhuangban.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                // MjClient.showToast("==== 3")
                this.select_btn(3);
                if(!this._initZB){
                    this.init_zhuangBan();
                }
                // this.init_guizu = false;
                // this.init_zhuangban = false;
            }
        }, this);

        // this._btn_info.visible = false;
        // this._btn_guizu.visible = false;
        // this._btn_zhuangban.visible = false;



        this._node_record = _back.getChildByName("node_record");
        if(this._node_record)
            this._node_record.setVisible(false);

        cosPlayTableInfo(this);
        this.init_info(pinfo,canEditSignature, showMoney);
        this.init_guiZu(pinfo);
        this.select_btn(1);
        // this.reqHuoDong_data();

        this.refresh_hongdian();
        this.refresh_baseInfo();

        return true;
    }, 

    select_btn:function(number){
        this._node_info.visible = (number == 1);
        this._node_guizu.visible = (number == 2);
        this._node_zhuangban.visible = (number == 3);
        this._btn_info.setBright(number !== 1);
        this._btn_info.getChildByName("Image_1").setVisible(number == 1);
        this._btn_info.getChildByName("Image_2").setVisible(number !== 1);
        this._btn_guizu.setBright(number !== 2);
        this._btn_guizu.getChildByName("Image_1").setVisible(number == 2);
        this._btn_guizu.getChildByName("Image_2").setVisible(number !== 2);
        this._btn_zhuangban.setBright(number !== 3);
        this._btn_zhuangban.getChildByName("Image_1").setVisible(number == 3);
        this._btn_zhuangban.getChildByName("Image_2").setVisible(number !== 3);
        this.selectPage = number;
        if(number == 2){
            if(MjClient.duoBaoPrizeData && !MjClient.duoBaoPrizeDataShow){
                MjClient.Scene.addChild(new UserGrowth_actDuoBao_check(MjClient.duoBaoPrizeData.lotteryId));
                //标志弹过就不弹了
                MjClient.duoBaoPrizeDataShow = true;
            }
        }
    },

    init_info:function(pinfo,canEditSignature, showMoney){
        var self = this;
        var that = this;
        var _node_info = this._node_info;
        //姓名
        var _name = _node_info.getChildByName("name");
        var _nameStr = unescape(pinfo.nickname);
        _name.ignoreContentAdaptWithSize(true);
        _name.setString(getNewName (_nameStr,12));
        _name.setFontName("Arial");
        _name.setFontSize(_name.getFontSize());
        
        //头像
        // var _headImg = _node_info.getChildByName("headImg");
        MjClient.loadWxHead(pinfo.uid,pinfo.headimgurl);

        //ID
        var _ID = _node_info.getChildByName("ID");
        _ID.setString("ID:"+pinfo.uid);
        _ID.ignoreContentAdaptWithSize(true);

        var _signature = _node_info.getChildByName("signature");
        _signature.setVisible(false);//又双叒叕去掉个性签名。。。
        _signature.setString("个性签名:"+unescape(pinfo.signature));
        if(pinfo.uid == SelfUid() && canEditSignature)
        {
            _signature.setVisible(false);
            this._textFeildName = new cc.EditBox(cc.size(430,100), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
            this._textFeildName.setFontColor(cc.color(255,255,255));
            this._textFeildName.setMaxLength(17*3);
            this._textFeildName.setFontSize(24);
            this._textFeildName.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            this._textFeildName.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
            this._textFeildName.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            this._textFeildName.setPlaceHolder("点击输入个性签名");
            this._textFeildName.setPlaceholderFontSize(24);
            this._textFeildName.setPosition(520,270);
            _node_info.addChild(this._textFeildName);
            this._textFeildName.setString(unescape(pinfo.signature));
            this._textFeildName.setDelegate(this);
            this._textFeildName.setVisible(false);
            this._textFeildName.setEnabled(false);
        }

        var isShow = (MjClient.systemConfig.openUserInfoShare + "" == "true");
        var jinrushangcBtn = _node_info.getChildByName("btn_jrsc");
        //jinrushangcBtn.setVisible(isShow);
        jinrushangcBtn.setVisible(false);
        jinrushangcBtn.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                cc.log("wxdkokokokok" + util.localStorageEncrypt.getBoolItem("_Disclaimer_NoRem_", false));
                if (util.localStorageEncrypt.getBoolItem("_Disclaimer_Agree_", false) && util.localStorageEncrypt.getBoolItem("_Disclaimer_NoRem_", false)) {
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.openBrowser", {type: 16}, function (rtn) {
                        MjClient.unblock();
                        if (rtn.code == 0) {
                            MjClient.native.OpenUrl(rtn.data);
                            //MjClient.native.wxShareUrl(rtn.data, unescape(pinfo.nickname) + "的战绩", "个人记录请勿对外分享\n绿色健康游戏，享受美好生活");
                        }
                        else {
                            if (rtn.message) {
                                MjClient.showToast(rtn.message);
                            }
                            else {
                                MjClient.showToast("获取数据失败，请重试");
                            }
                        }
                    });
                } else {
                    MjClient.Scene.addChild(new disclaimerReminderLayer());
                }
            }
        }, this);
        
        

        //商城授权
        var btnShangchengshouquan = _node_info.getChildByName("btn_scsq");
        //btnShangchengshouquan.setVisible(isShow);
        btnShangchengshouquan.setVisible(false);
        btnShangchengshouquan.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                MjClient.Scene.addChild(new authorizationStoreLayer())
            }
        }, this);
        
        

        //好友商城
        var btnHaoyoushangc = _node_info.getChildByName("btn_hysc");
        //btnHaoyoushangc.setVisible(isShow);
        btnHaoyoushangc.setVisible(false);
        btnHaoyoushangc.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                MjClient.Scene.addChild(new personalMallLayer())
            }
        }, this);
        

        //换头像
        var btn_htxk = _node_info.getChildByName("btn_htxk");
        btn_htxk.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                this.select_btn(3);
                if(!this._initZB){
                    this.init_zhuangBan();
                }
                
            }
        }, this); 
        // btn_htxk.visible = false;     

        //IP
        var _IP = _node_info.getChildByName("IP");
        _IP.ignoreContentAdaptWithSize(true);
        if (MjClient.remoteCfg.guestLogin)
        {
            var addressInfo = "地址:";
            var addressVec = JSON.parse(MjClient.native.GetAddress());
            for (var i=1; i<addressVec.length-1; i++)
            {
                addressInfo += addressVec[i];
            }
            _IP.setString(addressInfo);
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
            {
                _IP.setString(hideIP_paohuzi(addressInfo));
            }
        }
        else
        {
            var ipInfo = "";
            if(pinfo.remoteIP)
            {
                ipInfo = "IP:" + pinfo.remoteIP;
            }
            _IP.setString(ipInfo);
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
            {
                _IP.setString(hideIP_paohuzi(ipInfo));
            }
        }

        //实名认证   img_renzheng  btn_shimingrenzheng  res\userInfo_3.0
        var btnRenzheng = _node_info.getChildByName("img_renzheng");//new ccui.Button("usernfo/btn_smrz.png","","usernfo/btn_ysm.png");
        btnRenzheng.setTouchEnabled(!pinfo.identityNum);
        btnRenzheng.addTouchEventListener(function(sender,type){
            if(type == ccui.Widget.TOUCH_ENDED) {
                MjClient.Scene.addChild(new shiMingRenZhengLayer());
                this.removeFromParent();
            }
        },this);

        if(!pinfo.identityNum){
            btnRenzheng.loadTexture("userInfo_3.0/btn_shimingrenzheng.png")
        }

        //道具开关
        var _props = util.localStorageEncrypt.getBoolItem("_InteractiveProps", true);
        var _nodeProps = _node_info.getChildByName("checkBox_tools");
        var _propsText = _nodeProps.getChildByName("Text_1");
        _nodeProps.setSelected(_props);
        selectedCB(_propsText, _props);
        _propsText.addTouchEventListener(function(sender,type){
            if(type == ccui.Widget.TOUCH_ENDED) {
                _nodeProps.setSelected(!_nodeProps.isSelected())
                selectedCB(_propsText, _nodeProps.isSelected());
                util.localStorageEncrypt.setBoolItem("_InteractiveProps", _nodeProps.isSelected());

            }
        });
        _nodeProps.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    selectedCB(_propsText, true);
                    util.localStorageEncrypt.setBoolItem("_InteractiveProps", true);
                    var key = "Zhujiemian_Selfinformation_Touxiang_Shiyonghudongdaoju_Xuanzhong";
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                     MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
                    {
                        key = "Zhujiemian_Gerenzhuye_Hudongdaoju";
                    }
                    MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid(),open:1});
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    selectedCB(_propsText, false);
                    util.localStorageEncrypt.setBoolItem("_InteractiveProps", false);
                    var key = "Zhujiemian_Selfinformation_Touxiang_Shiyonghudongdaoju_Quxiaoxuanzhong";
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
                    {
                        key = "Zhujiemian_Gerenzhuye_Hudongdaoju";
                    }
                    MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid(),open:0});
                    break;
            }
        }, _nodeProps);

        //头像框开关
        var _kuangs = util.localStorageEncrypt.getBoolItem("_HeadKuangs", true);
        var _nodeKuangs = _node_info.getChildByName("checkBox_headK");
        var _kuangsText = _nodeKuangs.getChildByName("Text_1");
        _nodeKuangs.setSelected(_kuangs);
        selectedCB(_kuangsText, _kuangs);
        _kuangsText.addTouchEventListener(function(sender,type){
            if(type == 2) {
                _nodeKuangs.setSelected(!_nodeKuangs.isSelected())
                selectedCB(_kuangsText, _nodeKuangs.isSelected());
                util.localStorageEncrypt.setBoolItem("_HeadKuangs", _nodeKuangs.isSelected());
                postEvent("headFrameChange");
            }
        });
        _nodeKuangs.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    selectedCB(_kuangsText, true);
                    util.localStorageEncrypt.setBoolItem("_HeadKuangs", true);
                    postEvent("headFrameChange");
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    selectedCB(_kuangsText, false);
                    util.localStorageEncrypt.setBoolItem("_HeadKuangs", false);
                    postEvent("headFrameChange");
                    break;
            }
        }, _nodeKuangs);


        //入场动画开关
        var _animates = util.localStorageEncrypt.getBoolItem("_RuChangAni", true);
        var _nodeAnimates = _node_info.getChildByName("checkBox_animate");
        if(_nodeAnimates){
            var _animatesText = _nodeAnimates.getChildByName("Text_1");
            _nodeAnimates.setSelected(_animates);
            selectedCB(_animatesText, _animates);
            _animatesText.addTouchEventListener(function(sender,type){
                if(type == 2) {
                    _nodeAnimates.setSelected(!_nodeAnimates.isSelected())
                    selectedCB(_animatesText, _nodeAnimates.isSelected());
                    util.localStorageEncrypt.setBoolItem("_RuChangAni", _nodeAnimates.isSelected());
                }
            });
            _nodeAnimates.addEventListener(function(sender,type)
            {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        selectedCB(_animatesText, true);
                        util.localStorageEncrypt.setBoolItem("_RuChangAni", true);
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        selectedCB(_animatesText, false);
                        util.localStorageEncrypt.setBoolItem("_RuChangAni", false);
                        break;
                }
            }, _nodeAnimates);
        }


        function selectedCB(text, isSelected) {
            if (isSelected) {
                text.setTextColor(CREATEROOM_COLOR_1);
            } else {
                text.setTextColor(CREATEROOM_COLOR_2);
            }
        }


        //获得钻石数量
        var _money = _node_info.getChildByName("money");
        if (_money) {
            var _num = _money.getChildByName("num");
            _num.setString(pinfo.money);
            _num.ignoreContentAdaptWithSize(true);
            _money.addTouchEventListener(function(sender, Type) {
                if (Type == ccui.Widget.TOUCH_ENDED) {
                    MjClient.Scene.addChild(enter_store(0));
                }
            }, this);
        }


        var _zuanshi = _node_info.getChildByName("zuanshi");
        if (_zuanshi) {
            var _num = _zuanshi.getChildByName("num");
            _num.setString(pinfo.fangka);
            _num.ignoreContentAdaptWithSize(true);
            _zuanshi.addTouchEventListener(function(sender, Type) {
                if (Type == ccui.Widget.TOUCH_ENDED) {
                    MjClient.Scene.addChild(enter_store(1));
                }
            }, this);

            if(this.isJS_skin()){
                _zuanshi.visible = false;
            }

        }


        var liquan = _node_info.getChildByName("liquan");
        if (liquan) {
            liquan.setTouchEnabled(false);
            var _num = liquan.getChildByName("num");
            _num.setString(pinfo.integral);
            _num.ignoreContentAdaptWithSize(true);
            if(this.isJS_skin()){
                liquan.x -= 150;
            }
        }
        

        var img_gztq = _node_info.getChildByName("img_gztq");
        if (img_gztq) {

            var str_gz = pinfo.userGrade > 0 ? pinfo.userGrade : 0;
            img_gztq.loadTexture("userInfo_3.0/guiZu/gz_0" + str_gz + ".png")
            img_gztq.addTouchEventListener(function(sender, Type) {
                if (Type == ccui.Widget.TOUCH_ENDED) {
                    this.select_btn(2);
                }
            }, this);
            var btn_cktq = _node_info.getChildByName("btn_cktq");
            btn_cktq.addTouchEventListener(function(sender, Type) {
                if (Type == ccui.Widget.TOUCH_ENDED) {
                    this.select_btn(2);
                }
            }, this);

            // 这个版本不开放功能
            // img_gztq.setTouchEnabled(false);
            // img_gztq.setVisible(false);
            // btn_cktq.setVisible(false);
        }
        
        var _btnHongBao = _node_info.getChildByName("btn_myHB"); // new ccui.Button("usernfo/btn_myHB.png");
        _btnHongBao.addTouchEventListener(function(sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                        if(MjClient.isUseUIv3 && MjClient.isUseUIv3()){
                            self.addChild(new UserInfo_redPacket_v3(1));
                        }else{
                            self.addChild(new friendcard_redPackage_record(1));
                        }
                    
                    break;
                default:
                    break;
            }
        }, this);
        

        var bindPhoneNum = _node_info.getChildByName("ScrollView_5").getChildByName("bindPhoneNum");
        if(bindPhoneNum){
            var btnBindNum = bindPhoneNum.getChildByName("btn_bindNum");
            var btnModifyBind = bindPhoneNum.getChildByName("btn_modifyBind");
            var pinfo = MjClient.data.pinfo;
            if(pinfo.mobileNum){
                btnModifyBind.setVisible(true);
                btnBindNum.setVisible(false);
            }else {
                btnModifyBind.setVisible(false);
                btnBindNum.setVisible(true);
            }
            btnBindNum.getChildByName("img_tip").visible = false;
            btnBindNum.addTouchEventListener(function (sender, type) {
                if(type == ccui.Widget.TOUCH_ENDED){
                    var key = "Zhujiemian_Selfinformation_Touxiang_Bangdingshouji";
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ || 
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
                    {
                        key = "Zhujiemian_Gerenzhuye_Bangdingshouji";
                    }
                    MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid()});
                    self.removeFromParent();
                    MjClient.Scene.addChild(new bindPhoneNumNewLayer());
                }
            },this)

            var textSecurityCode = btnModifyBind.getChildByName("Text_securityCode");
            if (textSecurityCode)
                textSecurityCode.ignoreContentAdaptWithSize(true);

            var textPhoneNum = btnModifyBind.getChildByName("Text_phoneNum");
            if(pinfo.mobileNum) {
                textPhoneNum.setString(pinfo.mobileNum);
            }

            btnModifyBind.addTouchEventListener(function (sender, type) {
                if(type == ccui.Widget.TOUCH_ENDED){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Xiugaibangding", {uid:SelfUid()});
                    self.removeFromParent();
                    MjClient.Scene.addChild(new bindPhoneNumLayer(1));
                }
            },this)
        }
        var bindWeixin = _node_info.getChildByName("ScrollView_5").getChildByName("bindWeixin");
        if(bindWeixin){
            var btnBindWeixin = bindWeixin.getChildByName("btn_bindWeixin");
            var imgBindedWeixin = bindWeixin.getChildByName("img_bindedWeixin");
            var pinfo = MjClient.data.pinfo;
            if(pinfo.openid && pinfo.openid.indexOf("openid") == -1){
                imgBindedWeixin.setVisible(true);
                btnBindWeixin.setVisible(false);
            }else {
                imgBindedWeixin.setVisible(false);
                btnBindWeixin.setVisible(true);
            }
            btnBindWeixin.addTouchEventListener(function (sender, type) {
                if(type == ccui.Widget.TOUCH_ENDED){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingweixin", {uid:SelfUid()});
                    MjClient.native.wxLogin("userInfo");
                }
            },this);
            //register event weChat login call back  注册函数 ，微信登录成功回调
            UIEventBind(null,bindWeixin,"WX_USER_LOGIN",function(para)
            {
                if (cc.isString(para))
                {
                    para = JSON.parse(para);
                }

                if(para.openid)
                {
                    that.removeFromParent();
                    cc.loader.loadTxt(jsb.fileUtils.getWritablePath()+"nickname.txt",
                        function(er,txt){
                            if(txt)
                            {
                                para.nickname=escape(txt);
                            }
                            LoginByWeChatAccountUser(para);
                        });
                }
                else
                {
                    MjClient.showToastDelay("绑定微信失败，请重试");

                }

            });
            // UIEventBind(null, bindWeixin, "XL_USER_LOGIN", function(para) {
            //     if (cc.isString(para))
            //     {
            //         para = JSON.parse(para);
            //     }
            //
            //     if(para.openId)
            //     {
            //         self.removeFromParent();
            //         MjClient.block();
            //         MjClient.gamenet.request("pkplayer.handler.bindThirdLoginId",{xianliaoid:para.openId},function(rtn){
            //             MjClient.unblock();
            //             if(rtn.code==0) {
            //                 MjClient.showToast(rtn.message);
            //             } else {
            //                 if (!cc.isUndefined(rtn.message))
            //                     MjClient.showToast(rtn.message);
            //             }
            //         });
            //     }
            //     else
            //     {
            //         MjClient.showToastDelay("微信绑定失败，请重试");
            //     }
            // });
        }
        var bindXianliao = _node_info.getChildByName("ScrollView_5").getChildByName("bindXianliao");
        if(bindXianliao){
            var btnBindXianliao = bindXianliao.getChildByName("btn_bindXianliao");
            var imgBindedXianliao = bindXianliao.getChildByName("img_bindedXianliao");
            var pinfo = MjClient.data.pinfo;
            if(pinfo.xianliaoid){
                imgBindedXianliao.setVisible(true);
                btnBindXianliao.setVisible(false);
            }else {
                imgBindedXianliao.setVisible(false);
                btnBindXianliao.setVisible(true);
            }
            btnBindXianliao.addTouchEventListener(function (sender, type) {
                if(type == ccui.Widget.TOUCH_ENDED){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingxiaoliao", {uid:SelfUid()});
                    MjClient.native.xlLogin("userInfo");
                }
            },this);
            UIEventBind(null, bindXianliao, "XL_USER_LOGIN", function(para) {
                if (cc.isString(para))
                {
                    para = JSON.parse(para);
                }

                if(para.openId)
                {
                    self.removeFromParent();
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.bindThirdLoginId",{xianliaoid:para.openId},function(rtn){
                        MjClient.unblock();
                        if(rtn.code==0) {
                            MjClient.showToast(rtn.message);
                        } else {
                            if (!cc.isUndefined(rtn.message))
                                MjClient.showToast(rtn.message);
                        }
                    });
                }
                else
                {
                    MjClient.showToastDelay("闲聊绑定失败，请重试");
                }
            });
        }
        var bindXiangliao = _node_info.getChildByName("ScrollView_5").getChildByName("bindXiangliao");
        if(bindXiangliao){
            if(MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP &&
                MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&
                MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP &&
                MjClient.getAppType() != MjClient.APP_TYPE.HUNANWANGWANG &&
                MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ)
            {
                bindXiangliao.setVisible(false);
            }
            var btnBindXiangliao = bindXiangliao.getChildByName("btn_bindXiangliao");
            var imgBindedXiangliao = bindXiangliao.getChildByName("img_bindedXiangliao");
            var pinfo = MjClient.data.pinfo;
            if(pinfo.xiangliaoid){
                imgBindedXiangliao.setVisible(true);
                btnBindXiangliao.setVisible(false);
            }else {
                imgBindedXiangliao.setVisible(false);
                btnBindXiangliao.setVisible(true);
            }
            btnBindXiangliao.addTouchEventListener(function (sender, type) {
                if(type == ccui.Widget.TOUCH_ENDED){
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Selfinformation_Touxiang_Bangdingxiangliao", {uid:SelfUid()});
                    MjClient.native.xiangliaoLogin("userInfo");
                }
            },this);
            UIEventBind(null, bindXiangliao, "XIANGL_USER_LOGIN", function(para) {
                if (cc.isString(para))
                {
                    para = JSON.parse(para);
                }

                if(para.openId||para.opendId)
                {
                    if(para.opendId){
                        para.openId = para.opendId
                    }
                    self.removeFromParent();
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.bindThirdLoginId",{xiangliaoid:para.openId},function(rtn){
                        MjClient.unblock();
                        if(rtn.code==0) {
                            MjClient.showToast(rtn.message);
                        } else {
                            if (!cc.isUndefined(rtn.message))
                                MjClient.showToast(rtn.message);
                        }
                    });
                }
                else
                {
                    MjClient.showToastDelay("乡聊绑定失败，请重试");
                }
            });

        }
        
    },

    refresh_baseInfo: function () {
        var self = this;
        UIEventBind(null, this, "updateInfo", function (d) {
            if (d && d.happyCy) {
                var text_lb = self._node_guizu.getChildByName("img_lb").getChildByName("Text_num");
                text_lb.ignoreContentAdaptWithSize(true);
                text_lb.setString(d.happyCy + "");

                var text_lb2 = self._node_zhuangban.getChildByName("img_lb").getChildByName("Text_num");
                text_lb2.ignoreContentAdaptWithSize(true);
                text_lb2.setString(d.happyCy + "");
            }

            if(d && d.fangka){
                var _zuanshi = self._node_info.getChildByName("zuanshi");
                var _num = _zuanshi.getChildByName("num");
                _num.setString(d.fangka);
            }

            if (d && d.grade) {
                var img_gztq = self._node_info.getChildByName("img_gztq");
                var str_gz = d.grade > 0 ? d.grade : 0;
                img_gztq.loadTexture("userInfo_3.0/guiZu/gz_0" + str_gz + ".png")
                var node_gzqy = self._node_guizu.getChildByName("node_gzqy");
                

                var _icon = node_gzqy.getChildByName("Image_1");
                _icon.loadTexture("userInfo_3.0/guiZu/gz_0" + d.grade + ".png");
                var _icon2 = node_gzqy.getChildByName("Image_2");
                var _grade = (d.grade + 1);
                if(_grade> 9) _grade= 9;
                _icon2.loadTexture("userInfo_3.0/guiZu/gz_0" + _grade + ".png");
                var _icon3 = node_gzqy.getChildByName("Image_3");
                _icon3.loadTexture("userInfo_3.0/icon_gui_" + _grade +".png");

                if (d.empirical) {
                    var loadBar = node_gzqy.getChildByName("LoadingBar_1");
                    var _per = d.empirical / self.Exp_tab[d.grade] * 100;
                    loadBar.setPercent(_per);
                }

            }

            if(d && d.aliasId){
                var _headFrame = self._node_info.getChildByName("headFrame");
                var _strKuang = d.aliasId;
                _headFrame.loadTexture("userInfo_3.0/zhuangBan/headFrame/" + _strKuang +".png");
            }
            

        });

    },

    init_guiZu:function(pinfo){
        var self = this;
        var _node = this._node_guizu;
        // pinfo.userGrade = 9;

        var node_gzqy = _node.getChildByName("node_gzqy");
        var node_gzhd = _node.getChildByName("node_gzhd");

        var  btn_gzqy = _node.getChildByName("btn_gzqy");
        btn_gzqy.getChildByName("img_hongdian").visible = false;
        btn_gzqy.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                btn_gzqy.setBright(false);
                btn_gzhd.setBright(true);
                node_gzqy.visible = true;
                node_gzhd.visible = false;
                
            }
        }, this);

        var  btn_gzhd = _node.getChildByName("btn_gzhd");
        btn_gzhd.getChildByName("img_hongdian").visible = false;
        btn_gzhd.setZOrder(9);
        btn_gzhd.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                btn_gzqy.setBright(true);
                btn_gzhd.setBright(false);
                node_gzqy.visible = false;
                node_gzhd.visible = true;
            }
        }, this);
        // var _data = MjClient.growInfoData;
        // var isShow = false;
        // if(_data){
        //     if(_data.diamondManageCraveUp && _data.diamondManageCraveUp.isShow){
        //         isShow = true;
        //     }
        //     if(_data.dailyLoginEmpirical && _data.dailyLoginEmpirical.isShow){
        //         isShow = true;
        //     }
        // }
        
        // btn_gzhd.getChildByName("img_hongdian").visible = isShow;
        this._btn_gzhd = btn_gzhd;

        var tip_bind = node_gzqy.getChildByName("tip_bind");
        var btn_go = tip_bind.getChildByName("btn_go");
        var pinfo = MjClient.data.pinfo;
        var btn_expRecord = node_gzqy.getChildByName("btn_expRecord");
        tip_bind.setVisible(!pinfo.mobileNum);
        btn_expRecord.setVisible(pinfo.mobileNum);
        btn_expRecord.addTouchEventListener(function(sender, type){
            if(type == ccui.Widget.TOUCH_ENDED){
                this.initRecord();
            }
        },this)
        var btn_exp = node_gzqy.getChildByName("btn_exp");
        btn_exp.addTouchEventListener(function(sender, type){
            if(type == ccui.Widget.TOUCH_ENDED){
                this.initRecord();
            }
        },this)

        //cc.log("lms ---pinfo ",JSON.stringify(pinfo))
        
        btn_go.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                var key = "Zhujiemian_Selfinformation_Touxiang_Bangdingshouji";
                if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                    MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                    MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
                    MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                    MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                    MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                    MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ) {
                    key = "Zhujiemian_Gerenzhuye_Bangdingshouji";
                }
                MjClient.native.umengEvent4CountWithProperty(key, { uid: SelfUid() });
                self.removeFromParent();
                MjClient.Scene.addChild(new bindPhoneNumNewLayer());
            }
        }, this)

        var  _icon = node_gzqy.getChildByName("Image_1");
        _icon.loadTexture("userInfo_3.0/guiZu/gz_0" + pinfo.userGrade + ".png");
        var _icon2 = node_gzqy.getChildByName("Image_2");
        var _grade = (pinfo.userGrade + 1);
        if(_grade> 9) _grade= 9;
        _icon2.loadTexture("userInfo_3.0/guiZu/gz_0" + _grade + ".png");
        var _icon3 = node_gzqy.getChildByName("Image_3");
        _icon3.loadTexture("userInfo_3.0/icon_gui_" + _grade +".png");

        var  Text_tip = node_gzqy.getChildByName("Text_tip");
        var _number = (this.Exp_tab[pinfo.userGrade] - pinfo.empirical)/10;
        _number = _number > 0 ? _number : 0;
        Text_tip.setString("再打"+ Math.ceil(_number) +"场即可晋升");
        Text_tip.ignoreContentAdaptWithSize(true);
        if(pinfo.userGrade + 1 > 9){
            Text_tip.setString("恭喜您贵族等级升到最高");
            // _icon3.visible = false;
        }


        var  loadBar = node_gzqy.getChildByName("LoadingBar_1");
        // pinfo.empirical = 160;
        var _per = pinfo.empirical/this.Exp_tab[pinfo.userGrade]*100;
        loadBar.setPercent(_per);
        
        var text_per =  loadBar.getChildByName("Text_11")
        text_per.setString(pinfo.empirical + "/" + this.Exp_tab[pinfo.userGrade])


        
        var  text_lb = _node.getChildByName("img_lb").getChildByName("Text_num");
        text_lb.ignoreContentAdaptWithSize(true);
        text_lb.setString(pinfo.happyCy + "");

        var  btn_rule = _node.getChildByName("btn_rule");
        var  img_rule = btn_rule.getChildByName("img_rule");
        img_rule.visible = false;
        btn_rule.addTouchEventListener(function (sender, type) {
            if(type != ccui.Widget.TOUCH_ENDED)
                return;
            img_rule.visible = true; 
        }, this);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            status: null,
            onTouchBegan: function(touch, event) {
                if (img_rule.isVisible()) {
                    img_rule.setVisible(false);
                    return true;
                }
                else {
                    return false;
                }
            },
        }, img_rule);

        this.listView_hd = node_gzhd.getChildByName("ListView_2");
        this.cell_hd = node_gzhd.getChildByName("cell_2");
        this.cell_hd.visible = false;

        this.refresh_gzhd();

        this.listView_qy = node_gzqy.getChildByName("ListView_1");
        this.scrollView_qy = node_gzqy.getChildByName("ScrollView_1");
        this.cell_qy = node_gzqy.getChildByName("cell_1");
        this.cell_qy.visible = false;
        this.scrollView_qy.visible = false;

        this.cell_0 = node_gzqy.getChildByName("cell_0");
        this.cell_0.visible = false;
        var btn_createRoom = this.cell_0.getChildByName("btn_createRoom");
        btn_createRoom.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if (!MjClient.data.sData) {
                    postEvent("createRoom", {});
                    self.removeFromParent();
                }
                else {
                    MjClient.showMsg("房间已经创建,请直接加入房间。");
                }
            }
        }, this);

        var btn_club = this.cell_0.getChildByName("btn_club");
        btn_club.addTouchEventListener(function (sender, type) {
            if(type == ccui.Widget.TOUCH_ENDED){
                MjClient.Scene.addChild(new FriendCard_main(null, 1));
                self.removeFromParent();
            }
        }, this);
        

        this.ImageGuiZu = node_gzqy.getChildByName("ImageGuiZu");
        // this.ImageGuiZu.visible = false;

        var  btn_left = node_gzqy.getChildByName("btn_left");
        var  btn_right = node_gzqy.getChildByName("btn_right");
        this.addItem_quanyi();

        var clickLookGrade = function(page){
            var _indexs = this.listView_qy.getItems().length;
            var _destion = this.listView_qy.getScrolledPercentHorizontal();
            var _du = 100/(_indexs-1);
            var _pos = Math.round(_destion/_du + page) * (_du);

            var _destion = this.listView_qy.getScrolledPercentHorizontal();
            if(_pos <= 100 && _pos >=0)
                self.listView_qy.jumpToPercentHorizontal(_pos);
            var _destion = this.listView_qy.getScrolledPercentHorizontal();
            if(_pos <= 0){
                btn_left.visible = false;
                btn_right.visible = true;
            }else if(_pos >= 100){
                btn_right.visible = false;
                btn_left.visible = true;
            }else{
                btn_left.visible = true;
                btn_right.visible = true;
            }
            var _destion = this.listView_qy.getScrolledPercentHorizontal();
            var _du = 100/(_indexs-1);
            var _grade = Math.round(_destion/_du - 1);
            if(this.pinfo.userGrade == 0) _grade++;
            else _grade+=2;
            this.ImageGuiZu.loadTexture("userInfo_3.0/guiZu/gz_0" + _grade + ".png");
        }.bind(this);

        btn_left.addTouchEventListener(function(sender,type){
            if(type == ccui.Widget.TOUCH_ENDED){
                clickLookGrade(-1);
            }
        },this);
        
        btn_right.addTouchEventListener(function(sender,type){
            if(type == ccui.Widget.TOUCH_ENDED){
                clickLookGrade(+1);
            }
        },this);

        btn_gzqy.setBright(false);
        btn_gzhd.setBright(true);
        node_gzqy.visible = true;
        node_gzhd.visible = false;

        var setCurrentPage = function(){
            var _grade = this.pinfo.userGrade;
            this.ImageGuiZu.loadTexture("userInfo_3.0/guiZu/gz_0" + _grade + ".png");
            if(_grade)  _grade--;
            var _indexs = this.listView_qy.getItems().length;
            var _destion = this.listView_qy.getScrolledPercentHorizontal();
            var _du = 100/(_indexs-1);
            var _pos = Math.round(_grade) * (_du);

            if(_grade == 0){
                btn_left.visible = false;
                btn_right.visible = true;
                self.listView_qy.jumpToPercentHorizontal(0);
            } 
            else{
                self.listView_qy.jumpToPercentHorizontal(_pos);
                if(_grade == 9){
                    btn_left.visible = true;
                    btn_right.visible = false;
                }
                if(_grade == 1){
                    btn_left.visible = false;
                    btn_right.visible = true;
                }
            }
            
            
        }.bind(this);
        setCurrentPage();

    },

    refresh_gzhd:function(){
        this.listView_hd.removeAllItems();
        var _tab = this.GZHD_tab;

        var addItem_huodong = function(oneData, index){
            var copyNode = this.cell_hd.clone();
            copyNode.visible = true;
    
            var title = copyNode.getChildByName("title");
            title.ignoreContentAdaptWithSize(true);
            title.setString(oneData.title);
    
            var img_hongdian = copyNode.getChildByName("img_hongdian");
            img_hongdian.setZOrder(1);
            img_hongdian.setVisible(oneData.hongdian);
    
            var img_hongdian = copyNode.getChildByName("img_hongdian");
            
            var desc = copyNode.getChildByName("desc");
            // desc.ignoreContentAdaptWithSize(true);
            desc.setString(oneData.desc);
    
            var img_bg = copyNode.getChildByName("img_bg");
            img_bg.loadTexture(oneData.img)
            
            var img_gz = copyNode.getChildByName("img_gz");
            var path = "userInfo_3.0/guiZu/gz_0" + oneData.gz_lv + ".png";
            img_gz.loadTexture(path);
    
            var _btn0 = copyNode.getChildByName("btn_1");
            _btn0.visible = false;
            var btn = new ccui.Button(oneData.btn[0]);
            btn.x = _btn0.x;
            btn.y = _btn0.y;
            copyNode.addChild(btn);
            btn.opt = oneData.opt;
            btn.addTouchEventListener(function(sender, type){
                if(type == ccui.Widget.TOUCH_ENDED){
                    var opt = sender.opt;
                    this.senderTouchFunc(opt);
                }
            },this);
            if (oneData.btn2 && this.pinfo.userGrade >= oneData.gz_lv) {
                var btn2 = new ccui.Button(oneData.btn2[0])
                copyNode.addChild(btn2);
                var _posy = btn.y;
                btn.y = _posy - 30;
                btn2.y = _posy + 20;
                btn2.x = btn.x;
                btn2.opt = "kefu2";
                btn2.addTouchEventListener(function(sender, type){
                    if(type == ccui.Widget.TOUCH_ENDED){
                        var opt = sender.opt;
                        this.senderTouchFunc(opt);
                    }
                },this)
            }
            if(index === 0 && oneData.status == 2 && this.pinfo.userGrade){
                btn.loadTextureNormal("userInfo_3.0/btn_yilingqu.png");
                btn.ignoreContentAdaptWithSize(true);
                btn.setTouchEnabled(false);
            }else if(index === 0 && oneData.status == 0 && !this.pinfo.userGrade){
                btn.loadTextureNormal("userInfo_3.0/icon_weikaiqi.png");
                btn.ignoreContentAdaptWithSize(true);
                btn.setTouchEnabled(false);
            }
            
            if(index == 5){
                if (this.pinfo.userGrade > 0) {
                    btn.loadTextureNormal("userInfo_3.0/btn_qukankan.png");
                    btn.ignoreContentAdaptWithSize(true);
                    btn.setTouchEnabled(true);
                }else{
                    btn.loadTextureNormal("userInfo_3.0/icon_weikaiqi.png");
                    btn.ignoreContentAdaptWithSize(true);
                    btn.setTouchEnabled(false);
                }
                
    
                var img_gz2 = img_gz.clone();
                var path2 = "userInfo_3.0/guiZu/gz_01.png";
                img_gz2.loadTexture(path2);
                img_gz2.setPosition(img_gz.getPosition());
                copyNode.addChild(img_gz2);
                img_gz.x += 70;
                desc.height += 23;
    
    
            }else if(this.pinfo.userGrade < oneData.gz_lv){
                btn.loadTextureNormal("userInfo_3.0/icon_weikaiqi.png");
                btn.ignoreContentAdaptWithSize(true);
                btn.setTouchEnabled(false);
            }
    
            return copyNode;
        }.bind(this);


        for (let index = 0; index < _tab.length; index++) {
            this.listView_hd.pushBackCustomItem(addItem_huodong(_tab[index], index));
        }

        
        // cc.log("=== lms ----MjClient.duoBaoPrizeData , !MjClient.duoBaoPrizeDataShow ",JSON.stringify(MjClient.duoBaoPrizeData) )
        // if(MjClient.duoBaoPrizeData && !MjClient.duoBaoPrizeDataShow){
        //     MjClient.Scene.addChild(new UserGrowth_actDuoBao_check(MjClient.duoBaoPrizeData.lotteryId));
        //     //标志弹过就不弹了
        //     MjClient.duoBaoPrizeDataShow = true;
        // }
    },

    refresh_hongdian:function(){
        var self = this;
        var _showRedPoint = function(){
            if(MjClient.growInfoData){
                var d = MjClient.growInfoData;
                var isShow = false;
                var isShow_zhuangban = false;
                var isShow_zhuangban1 = false;
                var isShow_zhuangban2 = false;
                var isShow_zhuangban3 = false;
                var isShow_zhuangban4 = false;
                if(d){
                    this.GZHD_tab[0].hongdian = false;
                    if(d.dailyLoginEmpirical && d.dailyLoginEmpirical.isShow){
                        isShow = true;
                        this.GZHD_tab[0].hongdian = true;
                    }
                    this.GZHD_tab[1].hongdian = false;
                    if(d.diamondManageCraveUp && d.diamondManageCraveUp.isShow){
                        isShow = true;
                        this.GZHD_tab[1].hongdian = true;
                    }
                    this.GZHD_tab[2].hongdian = false;
                    if(d.dailyBlessingLv1Open && d.dailyBlessingLv1Open.isShow){
                        isShow = true;
                        this.GZHD_tab[2].hongdian = true;
                    }
                    this.GZHD_tab[3].hongdian = false;
                    if(d.dailyBlessingLv2Open && d.dailyBlessingLv2Open.isShow){
                        isShow = true;
                        this.GZHD_tab[3].hongdian = true;
                    }
    
                    if(d.prop1New && d.prop1New.isShow ){
                        isShow_zhuangban = true;
                        isShow_zhuangban1 = true;
                    }
                    if(d.prop2New && d.prop2New.isShow ){
                        isShow_zhuangban = true;
                        isShow_zhuangban2 = true;
                    }
                    if(d.prop3New && d.prop3New.isShow ){
                        isShow_zhuangban = true;
                        isShow_zhuangban3 = true;
                    }
                    if(d.prop4New && d.prop4New.isShow ){
                        isShow_zhuangban = true;
                        isShow_zhuangban4 = true;
                    }
    
                }
                self.refresh_gzhd();
                self._btn_guizu.getChildByName("img_hongdian").visible = isShow;
                self._btn_gzhd.getChildByName("img_hongdian").visible = isShow;
                self._btn_zhuangban.getChildByName("img_hongdian").visible = isShow_zhuangban;
                if(self._btnZB_touxiang){
                    self._btnZB_touxiang.getChildByName("img_hongdian").visible = isShow_zhuangban3;
                    self._btnZB_donghua.getChildByName("img_hongdian").visible = isShow_zhuangban4;
                    self._btnZB_biaoqing.getChildByName("img_hongdian").visible = isShow_zhuangban1;
                    self._btnZB_daoju.getChildByName("img_hongdian").visible = isShow_zhuangban2;
                }
            }
        }.bind(this);
        _showRedPoint();
        UIEventBind(null, this, "user_growth_activity", function(d) {
            _showRedPoint();
        });

        
    },

    addItem_quanyi:function(){
        this.scrollView_qy.removeAllChildren();
        var _tab = this.GZQY_tab;

        var createItem_qy = function(oneData, index){
            var self = this;
            var copyNode = this.scrollView_qy.clone();
            copyNode.setScrollBarWidth(5);
            copyNode.visible = true;
    
            
            if (Math.ceil(oneData.length / 5) > 2) {
                var _num = Math.ceil(oneData.length / 5);
                copyNode.setInnerContainerSize(cc.size(850, 145 * _num));
            }
    
            for (let index = 0; index < oneData.length; index++) {
                var cell = this.cell_qy.clone();
                var path = "userInfo_3.0/guiZu/" + oneData[index+1];
                cell.loadTexture(path);
                cell.visible = true;
                var pai = Math.floor(index / 5);
                var lie = index % 5;
                cell.setPosition(cc.p(160 * lie + 75, copyNode.getInnerContainerSize().height - (140 * pai + 70)));
                copyNode.addChild(cell);
    
            }
    
            return copyNode;
        }.bind(this);

        if(!this.pinfo.userGrade){
            var copyNode = this.cell_0.clone();
            copyNode.visible = true;
            this.listView_qy.pushBackCustomItem(copyNode);
        }

        for (let index = 0; index < _tab.length; index++) {
            this.listView_qy.pushBackCustomItem(createItem_qy(_tab[index], index));
        }


    },
    senderTouchFunc:function(opt){
        if(opt == "lingqu"){
            // MjClient.showToast(" lingqu")
            this.reqLingQu();
        }else if(opt == "licai"){
            this.addChild(new UserGroup_act_zuanshilicai());
            //MjClient.showToast(" licai")
        }else if(opt == "qifu1" || opt == "qifu2"){
            // MjClient.showToast(" qifu1");
            this.addChild(new UserGrowth_actQiFu(this.pinfo));
        }else if(opt == "kefu" || opt == "kefu2"){
            // MjClient.showToast(" kefu1")
            MjClient.showMsg("微信：qxing7777 \n手机号：13418440727",
                    function() {},
                    function() {});
        }else if(opt == "duobao"){
            // MjClient.showToast(" duobao")
            var that = this;
            (function(){
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.userTreasureBaseInfo", {},
                function(rtn) {
                    MjClient.unblock();
                    if(!cc.sys.isObjectValid(that)){
                        return;
                    }
                    if (rtn.code == 0){
                        // that.init_view(rtn.data);
                        if(!rtn.data.treaDetail || (rtn.data.treaDetail.length == 0)){
                            MjClient.showMsg("活动还未开启");
                            return;
                        }
                        that.addChild(new UserGrowth_actDuoBao(this.pinfo, rtn.data));
        
                    }else{
                        if(rtn.message){
                            MjClient.showToast(rtn.message+"")
                        }
                    }
                    
                });
            })()
            
        }else if(opt == "jieri"){
            var that = this;
            //打开界面时请求数据
            var reqJieRiData=function(){
                MjClient.block();
                var sendInfo = {}
                MjClient.gamenet.request("pkplayer.handler.userFestivalCarePresentList", sendInfo,
                function(rtn) {
                    MjClient.unblock();
                    if(!cc.sys.isObjectValid(that)){
                        return;
                    }
                    if (rtn.code == 0){
                        var data = rtn.data;
                        if (data && data.length > 0) {
                            that.addChild(new UserGrowth_actJieRi(data));
                        }
                        else {
                            MjClient.showToast("活动未开启");
                        }
                            
                    }else{
                        MjClient.showToast("活动未开启");
                    }
                   

                });
            };
            reqJieRiData();
            
        }

    },
    
    select_zhuangBan:function(number){
        this._nodeZB_touxiang.visible = (number == 1);
        this._nodeZB_donghua.visible = (number == 2);
        this._nodeZB_biaoqing.visible = (number == 3);
        this._nodeZB_daoju.visible = (number == 4);


        this._btnZB_touxiang.setBright(number !== 1);
        this._btnZB_donghua.setBright(number !== 2);
        this._btnZB_biaoqing.setBright(number !== 3);
        this._btnZB_daoju.setBright(number !== 4);


        // 入场动画 暂不开放
        //this._btnZB_donghua.setTouchEnabled(false);
        
    },

    init_zhuangBan:function(){
        var self = this;
        var _node = this._node_zhuangban;
        
        this._initZB = true;

        var  test_lb = _node.getChildByName("img_lb").getChildByName("Text_num");
        test_lb.ignoreContentAdaptWithSize(true);
        test_lb.setString(this.pinfo.happyCy + "");
        
        var  btn_change = _node.getChildByName("btn_change");
        btn_change.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                
                this.addChild(new UserInfo_exChangeMoney());
            }
        }, this);
        

        this._btnZB_touxiang = _node.getChildByName("btn_touxiang");
        this._btnZB_donghua = _node.getChildByName("btn_donghua");
        this._btnZB_biaoqing = _node.getChildByName("btn_biaoqing");
        this._btnZB_daoju = _node.getChildByName("btn_daoju");
        this._btnZB_touxiang.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                this.select_zhuangBan(1);
            }
        }, this);
        this._btnZB_donghua.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                this.select_zhuangBan(2);
            }
        }, this);
        
        this._btnZB_biaoqing.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                this.select_zhuangBan(3);
            }
        }, this);
        if(MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ){
            this._btnZB_donghua.visible = false;
            this._btnZB_biaoqing.x = 410;
            this._btnZB_daoju.x = 618;
        }
        
        this._btnZB_daoju.addTouchEventListener(function (sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                this.select_zhuangBan(4);
            }
        }, this);

        this._nodeZB_touxiang = _node.getChildByName("node_touxiang");
        this._nodeZB_touxiang.visible = false;
        this._nodeZB_donghua = _node.getChildByName("node_donghua");
        this._nodeZB_donghua.visible = false;
        this._nodeZB_biaoqing = _node.getChildByName("node_biaoqing");
        this._nodeZB_biaoqing.visible = false;
        this._nodeZB_daoju = _node.getChildByName("node_daoju");
        this._nodeZB_daoju.visible = false;
        self._btnZB_touxiang.getChildByName("img_hongdian").visible = false;
        self._btnZB_donghua.getChildByName("img_hongdian").visible = false;
        self._btnZB_biaoqing.getChildByName("img_hongdian").visible = false;
        self._btnZB_daoju.getChildByName("img_hongdian").visible = false;


        var headF_title = this._nodeZB_touxiang.getChildByName("headF_title");
        headF_title.setString("");

        var headF_desc = this._nodeZB_touxiang.getChildByName("headF_desc");
        headF_desc.setString("");

        var btn_useTX = this._nodeZB_touxiang.getChildByName("btn_useTX");
        btn_useTX.visible = false;

        var btn_jiesuoTX = this._nodeZB_touxiang.getChildByName("btn_jiesuoTX");
        btn_jiesuoTX.visible = false;
        
        var text_use = btn_useTX.getChildByName("text_use");
        text_use.setString("");

        this.ScrollView_headFrame = this._nodeZB_touxiang.getChildByName("ScrollView_headFrame");
        this.cell_headFrame = this._nodeZB_touxiang.getChildByName("cell_headFrame");
        this.cell_headFrame.visible = false;


        var donghua_title = this._nodeZB_donghua.getChildByName("donghua_title");
        donghua_title.setString("");

        var donghua_desc = this._nodeZB_donghua.getChildByName("donghua_desc");
        donghua_desc.setString("");

        var btn_useDH = this._nodeZB_donghua.getChildByName("btn_useDH");
        btn_useDH.visible = false;

        //   ListView_donghua   
        this.ListView_donghua = this._nodeZB_donghua.getChildByName("ListView_donghua");
        this.cell_donghua = this._nodeZB_donghua.getChildByName("cell_donghua");
        this.cell_donghua.visible = false;
          
        this.ScrollView_biaoqing = this._nodeZB_biaoqing.getChildByName("ScrollView_biaoqing");
        this.cell_biaoqing = this._nodeZB_biaoqing.getChildByName("cell_biaoqing");
        this.cell_biaoqing.visible = false;

        this.ScrollView_daoju = this._nodeZB_daoju.getChildByName("ScrollView_daoju");
        this.cell_daoju = this._nodeZB_daoju.getChildByName("cell_daoju");
        this.cell_daoju.visible = false;

        var daoju_title = this._nodeZB_daoju.getChildByName("daoju_title");
        daoju_title.setString("");

        var daoju_desc = this._nodeZB_daoju.getChildByName("daoju_desc");
        daoju_desc.setString("");

        var daoju_money = this._nodeZB_daoju.getChildByName("daoju_money");
        daoju_money.setString("");

        var btn_jiesuo = this._nodeZB_daoju.getChildByName("btn_jiesuo");
        btn_jiesuo.visible = false;

        var img_lebi = this._nodeZB_daoju.getChildByName("img_lebi");
        img_lebi.visible = false;

        this.select_zhuangBan(1);
        if(!this._dataOfHeadFrame){
            this.reqZhuangBanTXK_data();
        }
        postEvent("user_growth_activity",MjClient.growInfoData);
        
    },

    init_zhuangBanTXK:function(data){
        if(!cc.sys.isObjectValid(this) || !data) return;

        var fresh_txk = function( number){
            for (let index = 1; index <= data.length; index++) {
                var node = this["_zhuangBanTXK" + index];
                if(!node || !cc.sys.isObjectValid(node)) return;
                var imge_select = node.getChildByName("image_select");
                imge_select.visible = number == index;
                if(number == index){
                    var headF_title = this._nodeZB_touxiang.getChildByName("headF_title");
                    headF_title.setString(node.data.title);
    
                    var headF_desc = this._nodeZB_touxiang.getChildByName("headF_desc");
                    headF_desc.setString(node.data.describe);
                    headF_desc.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

                    var imge_headF = this._nodeZB_touxiang.getChildByName("imge_headF");
                    imge_headF.loadTexture("userInfo_3.0/zhuangBan/headFrame/" + node.data.aliasId +".png");


                    var btn_useTX = this._nodeZB_touxiang.getChildByName("btn_useTX");
                    btn_useTX.visible = true;
                    btn_useTX.index = index;
                    btn_useTX.data = node.data;
                    btn_useTX.addTouchEventListener(function(sender, type){
                        if(type == ccui.Widget.TOUCH_ENDED){
                            if(sender.data.isUsed){
                                MjClient.showToast("已使用");
                                return;
                            }
                            if(sender.data.isLocked == 0){

                                if(sender.data.unlockType == 51){
                                    var _num = sender.index - 1;
                                    this.reqJieSuo(this._dataOfHeadFrame[_num].propId, _num, 1);
                                }else{
                                    MjClient.showToast("请先解锁");
                                }
                                
                                return;
                            }
                            // node.data.propId
                            var _num = sender.index - 1;
                            this.reqUseBtn(this._dataOfHeadFrame[_num].propId, _num, 1);
                        }
                    },this);
                    var text_use = btn_useTX.getChildByName("text_use");
                    text_use.setString("永久使用");

                    

                    var btn_jiesuoTX = this._nodeZB_touxiang.getChildByName("btn_jiesuoTX");
                    btn_jiesuoTX.visible = true;
                    btn_jiesuoTX.index = index;
                    btn_jiesuoTX.data = node.data;
                    btn_jiesuoTX.addTouchEventListener(function(sender, type){
                        if(type == ccui.Widget.TOUCH_ENDED){
                            var _num = sender.index - 1;
                            this.reqJieSuo(this._dataOfHeadFrame[_num].propId, _num, 1);
                            
                        }
                    },this);
                    var money = btn_jiesuoTX.getChildByName("money");
                    money.setString("");
                    if(node.data.unlockType == 51 && node.data.isLocked == 0){
                        money.setString(node.data.extend.consume);
                    }

                    var _iconSYZ = this._nodeZB_touxiang.getChildByName("icon_syz");
                    if(!_iconSYZ){
                        var _iconSYZ = ccui.ImageView("userInfo_3.0/bg_shiyongzhong.png");
                        _iconSYZ.setPosition(cc.p(btn_useTX.x, btn_useTX.y));
                        _iconSYZ.setName("icon_syz");
                        this._nodeZB_touxiang.addChild(_iconSYZ);
                    }
                    btn_jiesuoTX.visible = (node.data.isLocked == 0 && node.data.unlockType == 51);
                    btn_useTX.visible = !btn_jiesuoTX.visible;
                    

                    _iconSYZ.visible = false;
                    if(node.data.isUsed){
                        btn_useTX.visible = false;
                        _iconSYZ.visible = true;
                    }

                }
                
                
            }
        }.bind(this);
        var addTXK = function(oneData, index){
            var copyNode = this.cell_headFrame.clone();
            copyNode.visible = true;
            var image_using = copyNode.getChildByName("image_using");
            image_using.visible = oneData.isUsed ==  1;

            var image_lock = copyNode.getChildByName("image_lock");
            image_lock.visible = oneData.isLocked == 0;

            var img_hongdian = copyNode.getChildByName("img_hongdian");
            img_hongdian.visible = (oneData.isLocked == 1 && oneData.isRead == 0);

            var imge_select = copyNode.getChildByName("image_select");
            imge_select.visible = false;

            var img_guizu = copyNode.getChildByName("img_guizu");
            img_guizu.visible = false;

            var img_lebi = copyNode.getChildByName("img_lebi");
            img_lebi.visible = false;
            
            var img_bg2 = copyNode.getChildByName("img_bg2");
            img_bg2.visible= false;
            if(oneData.isLocked == 0){
                if(oneData.unlockType <= 9){
                    img_guizu.visible = true;
                    img_bg2.visible= true;
                    // img_guizu.loadTexture("userInfo_3.0/guiZu/gz_0" + oneData.unlockType + ".png");
                    img_guizu.setString("贵族 " + oneData.unlockType + " 解锁 ");
                    // img_guizu.loadTexture("userInfo_3.0/zhuangBan/chat_emoji/" + oneData.aliasId + ".png");
                }else if(oneData.unlockType == 51){
                    img_lebi.visible = true;
                    img_bg2.visible= true;
                    img_bg2.loadTexture("userInfo_3.0/bg_jiesuoneirong_2.png");
                }else if(oneData.unlockType == 52){
                    img_guizu.visible = true;
                    img_bg2.visible= true;
                    img_guizu.setString("活动解锁");
                }else if(oneData.unlockType == 53){
                    img_guizu.visible = true;
                    img_bg2.visible= true;
                    img_guizu.setString("礼包解锁");
                }
            }else if(oneData.isLocked == 1){
                //解锁后的操作 目前没有
            }

            var imge_frame = copyNode.getChildByName("image_frame");
            imge_frame.loadTexture("userInfo_3.0/zhuangBan/headFrame/" + oneData.aliasId +".png");
            imge_frame.setScale9Enabled(false);
            imge_frame.index = index;
            imge_frame.data = oneData;
            imge_frame.addTouchEventListener(function(sender, type){
                if(type == ccui.Widget.TOUCH_ENDED){
                    fresh_txk(sender.index);
                    var _num = sender.index - 1;
                    if(this._dataOfHeadFrame[_num].isLocked == 1 &&  this._dataOfHeadFrame[_num].isRead == 0){
                        this._dataOfHeadFrame[_num].isRead = 1;
                        this.reqClearRedpoint(this._dataOfHeadFrame[_num].propId, 1,sender.getParent());
                    }
                }
            },this);
            
            copyNode.data = oneData;
            this["_zhuangBanTXK" + index] = copyNode;

            return copyNode;

        }.bind(this);

        this.ScrollView_headFrame.removeAllChildren();
        this._dataOfHeadFrame = data;
        var pai = Math.ceil(data.length / 4);
        this.ScrollView_headFrame.setInnerContainerSize(cc.size(600, 165* pai > 500 ? 165 * pai : 500))
        var _height = this.ScrollView_headFrame.getInnerContainerSize().height;
        var _selectTX = 1;
        for (let index = 1; index <= data.length; index++) {
            var lie = index % 4;
            var pai = Math.ceil(index / 4);
            var pos_x = 100 + (lie-1) * 165;
            var pos_y = (_height - 80) - (pai - 1) * 175;
            if(lie == 0) pos_x = 100 + 165*3;
            if(data[(index - 1)].isUsed) _selectTX = index;
            var item = addTXK(data[(index - 1)], index);
            item.x = pos_x;
            item.y = pos_y;
            
            this.ScrollView_headFrame.addChild(item);

        }
        fresh_txk(_selectTX);
    },

    reqZhuangBanTXK_data:function(type){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userDressTXList",{length : 50},function(rtn){
            cc.log(" pkplayer.handler.userDressTXList ",JSON.stringify(rtn))
            if(rtn.code==0)
            {
                self.init_zhuangBanTXK(rtn.data);
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("请求数据失败");
            }
            if(!type){
                self.reqZhuangBanDH_data();
            }
            
            MjClient.unblock();
        });
    },

    init_zhuangBanDongHua:function(data){
        if(!cc.sys.isObjectValid(this) || !data) return;
        
        var fresh_donghua = function( number){
            for (let index = 1; index <= data.length; index++) {
                // cc.log("==== lms -- index ",index);
                var node = this["_zhuangBanDH" + index];
                if(!node || !cc.sys.isObjectValid(node)) return;
                var imge_select = node.getChildByName("image_select");
                imge_select.visible = number == index;
                if(number == index){
                    var donghua_title = this._nodeZB_donghua.getChildByName("donghua_title");
                    donghua_title.setString(node.data.title);

                    var donghua_desc = this._nodeZB_donghua.getChildByName("donghua_desc");
                    donghua_desc.setString(node.data.describe);

                    var img_dh = this._nodeZB_donghua.getChildByName("imge_donghua");
                    // img_dh.loadTexture("userInfo_3.0/zhuangBan/cartoon/" + node.data.aliasId + ".png");

                    if(img_dh.getChildByName("icon_dh")){
                        img_dh.getChildByName("icon_dh").removeFromParent();
                    }
                    
                    if(img_dh.getChildByName("animation")){
                        img_dh.getChildByName("animation").removeFromParent();
                    }

                    cc.log("==== node.data.aliasId ",node.data.aliasId)
                    if(this.RCDH_tab && this.RCDH_tab[node.data.aliasId]){
                        var _json = "userInfo_3.0/zhuangBan/cartoon/" + this.RCDH_tab[node.data.aliasId] + "/" + this.RCDH_tab[node.data.aliasId] + ".json";
                        var _atlas = "userInfo_3.0/zhuangBan/cartoon/" + this.RCDH_tab[node.data.aliasId] + "/" + this.RCDH_tab[node.data.aliasId] + ".atlas";
                        var projNode = createSpine(_json, _atlas);
                        projNode.setAnimation(0, 'animation', true);
                        projNode.setPosition(cc.p(img_dh.width * 0.5,img_dh.height * 0.2));
                        projNode.setScale(0.4);
                        projNode.setName("animation");
                        img_dh.addChild(projNode, 9);
                    }else{
                        var _icon  = ccui.ImageView("userInfo_3.0/zhuangBan/cartoon/" + node.data.aliasId +".png");
                        _icon.setPosition(cc.p(img_dh.width/2,img_dh.height/2));
                        _icon.setName("icon_dh");
                        img_dh.addChild(_icon);


                    }
                    

                    var btn_useDH = this._nodeZB_donghua.getChildByName("btn_useDH");
                    btn_useDH.visible = true;
                    btn_useDH.index = index;
                    btn_useDH.data = node.data;
                    btn_useDH.addTouchEventListener(function(sender, type){
                        if(type == ccui.Widget.TOUCH_ENDED){
                            if (sender.data.isUsed) {
                                MjClient.showToast("已使用");
                                return;
                            }
                            if (sender.data.unlockType == 52) {
                                MjClient.showToast("请参加限定活动");
                                return;
                            }
                            if (sender.data.unlockType == 53) {
                                MjClient.showToast("请前往商城礼包解锁");
                                return;
                            }
                            if (sender.data.isLocked == 0) {
                                MjClient.showToast("请先解锁");
                                return;
                            }
                            // node.data.propId
                            var _num = sender.index - 1;
                            this.reqUseBtn(this._dataOfDongHua[_num].propId, _num, 2);
                        }
                    }, this);

                    var _iconSYZ = this._nodeZB_donghua.getChildByName("icon_syz");
                    if(!_iconSYZ){
                        var _iconSYZ = ccui.ImageView("userInfo_3.0/bg_shiyongzhong.png");
                        _iconSYZ.setPosition(cc.p(btn_useDH.x, btn_useDH.y));
                        _iconSYZ.setName("icon_syz");
                        this._nodeZB_donghua.addChild(_iconSYZ);
                    }

                    _iconSYZ.visible = false;
                    if(node.data.isUsed){
                        btn_useDH.visible = false;
                        _iconSYZ.visible = true;
                    }

                }
                
                
            }
        }.bind(this);
        var addDongHua = function(oneData, index){
            var copyNode = this.cell_donghua.clone();
            copyNode.visible = true;
            var title = copyNode.getChildByName("title");
            title.setString(oneData.title);

            var desc = copyNode.getChildByName("desc");
            desc.setString(oneData.describe);
            var imge_frame = copyNode.getChildByName("bg");
            imge_frame.index = index;
            imge_frame.data = oneData;
            imge_frame.addTouchEventListener(function(sender, type){
                if(type == ccui.Widget.TOUCH_ENDED){
                    fresh_donghua(sender.index);
                    if(sender.data.isRead == 0){

                    }
                }
            },this);

            var img_dh = copyNode.getChildByName("img_dh");
            img_dh.loadTexture("userInfo_3.0/zhuangBan/cartoon/" + oneData.aliasId + ".png");

            var imge_select = copyNode.getChildByName("image_select");
            imge_select.visible = false;

            var img_hongdian = copyNode.getChildByName("img_hongdian");
            img_hongdian.visible = false;

            var img_guizu = copyNode.getChildByName("img_guizu");
            if(oneData.unlockType <= 9)
                img_guizu.loadTexture("userInfo_3.0/guiZu/gz_0" + oneData.unlockType + ".png");
            else 
                img_guizu.visible = false;
            

            var status_1 = copyNode.getChildByName("status_1");
            status_1.visible = false;

            var status_2 = copyNode.getChildByName("status_2");
            status_2.visible = false;
            

            var status_3 = copyNode.getChildByName("status_3");
            status_3.visible = false;
            var _btnUse = status_3.getChildByName("btnStatus_3");
            _btnUse.index = index;
            _btnUse.addTouchEventListener(function (sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED) {
                    var _num = sender.index - 1;
                    this.reqUseBtn(this._dataOfDongHua[_num].propId, _num , 2);
                }
            }, this);
            _btnUse.visible = false;
            var Image_3 = status_3.getChildByName("Image_3");
            Image_3.visible = false;

            var status_4 = copyNode.getChildByName("status_4");
            status_4.visible = false;   


            cc.log(" ====== oneData.isLocked ",oneData.isLocked,oneData.unlockType);
            if(oneData.isLocked == 0){
                if (oneData.unlockType <= 9) {
                    status_1.visible = true;
                } else if (oneData.unlockType == 51) {
                    status_2.visible = true;
                    var money =status_2.getChildByName("money");
                    money.setString(oneData.extend.consume);

                }else if(oneData.unlockType == 52){
                    status_4.visible = true;
                    var _str = status_4.getChildByName("text_4");
                    _str.ignoreContentAdaptWithSize(true);
                    _str.setString("参与限定活动解锁")
                }else if(oneData.unlockType == 53){
                    status_4.visible = true;
                    var _str = status_4.getChildByName("text_4");
                    _str.ignoreContentAdaptWithSize(true);
                    _str.setString("礼包解锁")
                }

            }else if(oneData.isLocked == 1){
                status_3.visible = true;
                if(oneData.isUsed == 1){
                    Image_3.visible = true;
                }else{
                    _btnUse.visible = true;
                }
            }

            var btn_unlock = status_2.getChildByName("btn_unlock");
            btn_unlock.data = oneData;
            btn_unlock.index = index;
            btn_unlock.addTouchEventListener(function (sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED) {
                    var _num = sender.index - 1;
                    this.reqJieSuo(this._dataOfDongHua[_num].propId, _num, 2);
                }
            }, this);
            



            
            copyNode.data = oneData;
            this["_zhuangBanDH" + index] = copyNode;

            return copyNode;

        }.bind(this);

        this.ListView_donghua.removeAllChildren();
        this._dataOfDongHua = data;
        var _selectDH = 1;
        for (let index = 1; index <= data.length; index++) {
            
            this.ListView_donghua.pushBackCustomItem(addDongHua(data[index - 1], index));
            if(data[index - 1].isUsed)
                _selectDH = index;
        }
        fresh_donghua(_selectDH)
    },

    reqZhuangBanDH_data:function(type){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userDressRCDHList",{length : 100},function(rtn){
            cc.log(" pkplayer.handler.userDressRCDHList ",JSON.stringify(rtn))
            if(rtn.code==0)
            {
                self.init_zhuangBanDongHua(rtn.data);
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("请求数据失败");
            }
            MjClient.unblock();
            if(!type){
                self.reqZhuangBanBQ_data();
            }
            
        });
    },

    init_zhuangBanBQ:function(data){
        if(!cc.sys.isObjectValid(this) || !data) return;
        // pkplayer.handler.userDressCurrencyUnlock
        var self = this;
        var fresh_BQ = function( number){
            for (let index = 1; index <= data.length; index++) {
                var node = this["_zhuangBanBQ" + index];
                if(!node || !cc.sys.isObjectValid(node)) return;
                var imge_select = node.getChildByName("image_select");
                cc.log("=====index  number == index",index,number == index)
                imge_select.visible = number == index;
                if(number == index){
                    
                    var biaoqing_title = this._nodeZB_biaoqing.getChildByName("biaoqing_title");
                    biaoqing_title.setString(node.data.title);
    
                    var biaoqing_desc = this._nodeZB_biaoqing.getChildByName("biaoqing_desc");
                    biaoqing_desc.setString(node.data.describe);
                    var biaoqing_money = this._nodeZB_biaoqing.getChildByName("biaoqing_money");
                    var img_lebi = this._nodeZB_biaoqing.getChildByName("img_lebi");
                    if(node.data.unlockType == 51 && node.data.isLocked == 0){
                        biaoqing_money.visible = true;
                        biaoqing_money.setString(node.data.extend.consume);
                        img_lebi.visible = true;
                    }else{
                        biaoqing_money.visible = false;
                        img_lebi.visible = false;
                    }

                    var img_biaoqing = this._nodeZB_biaoqing.getChildByName("img_biaoqing");
                    // img_biaoqing.loadTexture("userInfo_3.0/zhuangBan/chat_emoji/" + node.data.aliasId + ".png");
                    var _act = img_biaoqing.getChildByName("animation");
                    if(_act) _act.removeFromParent();

                    var _json = "userInfo_3.0/zhuangBan/chat_emoji/" + this.LTBQ_tab[node.data.aliasId] + "/" + this.LTBQ_tab[node.data.aliasId] + ".json";
                    var _atlas = "userInfo_3.0/zhuangBan/chat_emoji/" + this.LTBQ_tab[node.data.aliasId] + "/" + this.LTBQ_tab[node.data.aliasId] + ".atlas";
                    var projNode = createSpine(_json, _atlas);
                    projNode.setAnimation(0, 'animation', true);
                    projNode.setPosition(img_biaoqing.width/2, 0);
                    projNode.setScale(0.6);
                    projNode.setName("animation");
                    img_biaoqing.addChild(projNode, 9);

                    // var img_guizu = img_biaoqing.getChildByName("img_guizu");
                    // img_guizu.loadTexture("userInfo_3.0/guiZu/gz_0" + node.data.unlockType + ".png");


                    var btn_jiesuo = this._nodeZB_biaoqing.getChildByName("btn_jiesuo");
                    btn_jiesuo.visible = true;
                    btn_jiesuo.index = index;
                    btn_jiesuo.data = node.data;
                    if(node.data.isLocked == 1){
                        btn_jiesuo.visible = false;
                    }
                    
                    btn_jiesuo.addTouchEventListener(function(sender, type){
                        if(type == ccui.Widget.TOUCH_ENDED){
                            
                            var node = this["_zhuangBanBQ" + sender.index];
                            cc.log("=====node.data.unlockType ",node.data.unlockType,sender.index)
                            if(node.data.unlockType == 51){
                                var _num = sender.index - 1;
                                this.reqJieSuo(this._dataOfBiaoQing[_num].propId, _num, 3);
                                return;
                            }

                            if(node.data.unlockType == 52){
                                MjClient.showToast("请参加限定活动");
                                return;
                            }
                            if(node.data.unlockType == 53){
                                MjClient.showToast("请前往商城礼包解锁");
                                return;
                            }
                            if(sender.data.isLocked == 0){
                                MjClient.showToast("请先解锁");
                                return;
                            }
                            // node.data.propId
                            // var _num = sender.index - 1;
                            // this.reqUseBtn(this._dataOfHeadFrame[_num].propId, _num, 3);
                        }
                    },this);
                    imge_select.visible = true;

                }
                
                
            }
        }.bind(this);
        var addBQ = function(oneData, index){
            var copyNode = this.cell_biaoqing.clone();
            copyNode.visible = true;
            var imge_select = copyNode.getChildByName("image_select");
            imge_select.visible = false;
            var image_lock = copyNode.getChildByName("img_suo");
            image_lock.visible = oneData.isLocked == 0;

            var img_guizu = copyNode.getChildByName("img_guizu");
            img_guizu.visible = false;

            var img_lebi = copyNode.getChildByName("img_lebi");
            img_lebi.visible = false;
            var name = copyNode.getChildByName("img_name").getChildByName("name");
            name.setString( this.LTBQ_nameTab[oneData.aliasId]);
            
            var img_bg2 = copyNode.getChildByName("img_bg2");
            img_bg2.visible= false;
            if(oneData.isLocked == 0){
                if(oneData.unlockType <= 9){
                    img_guizu.visible = true;
                    img_bg2.visible= true;
                    // img_guizu.loadTexture("userInfo_3.0/guiZu/gz_0" + oneData.unlockType + ".png");
                    img_guizu.setString("贵族 " + oneData.unlockType + " 解锁 ");
                    // img_guizu.loadTexture("userInfo_3.0/zhuangBan/chat_emoji/" + oneData.aliasId + ".png");
                }else if(oneData.unlockType == 51){
                    img_lebi.visible = true;
                    img_bg2.visible= true;
                    img_bg2.loadTexture("userInfo_3.0/bg_jiesuoneirong_2.png");
                }else if(oneData.unlockType == 52){
                    img_guizu.visible = true;
                    img_bg2.visible= true;
                    img_guizu.setString("活动解锁");
                }else if(oneData.unlockType == 53){
                    img_guizu.visible = true;
                    img_bg2.visible= true;
                    img_guizu.setString("礼包解锁");
                }
            }else if(oneData.isLocked == 1){
                
            }

            var img_hongdian = copyNode.getChildByName("img_hongdian");
            img_hongdian.visible = (oneData.isLocked == 1 && oneData.isRead == 0);

            
            var imge_frame = copyNode.getChildByName("icon");
            imge_frame.index = index;
            imge_frame.data = oneData;
            imge_frame.loadTexture("userInfo_3.0/zhuangBan/chat_emoji/" + oneData.aliasId + ".png")
            imge_frame.addTouchEventListener(function(sender, type){
                if(type == ccui.Widget.TOUCH_ENDED){
                    fresh_BQ(sender.index);
                    var _num = sender.index - 1;
                    if(this._dataOfBiaoQing[_num].isLocked == 1 &&  this._dataOfBiaoQing[_num].isRead == 0){
                        this._dataOfBiaoQing[_num].isRead = 1;
                        this.reqClearRedpoint(this._dataOfBiaoQing[_num].propId, 3,sender.getParent());
                    }
                }
            },this);
            
            copyNode.data = oneData;
            this["_zhuangBanBQ" + index] = copyNode;

            return copyNode;

        }.bind(this);

        this.ScrollView_biaoqing.removeAllChildren();
        this._dataOfBiaoQing = data;
        var pai = Math.ceil(data.length / 5);
        this.ScrollView_biaoqing.setInnerContainerSize(cc.size(720, 145 * pai > 500 ? 145 * pai : 500))
        var _height = this.ScrollView_biaoqing.getInnerContainerSize().height;
        var _selectBQ = 1;
        for (let index = 1; index <= data.length; index++) {
            var lie = index % 5;
            var pai = Math.ceil(index / 5);
            var pos_x = 75 + (lie-1) * 145;
            var pos_y = (_height - 80) - (pai - 1) * 145;
            if(lie == 0) pos_x = 75 + 145*4;
            var item = addBQ(data[(index - 1)], index);
            item.x = pos_x;
            item.y = pos_y;
            // cc.log("==== lms ---- 105 * pai = ",105 * pai)
            // this.ScrollView_biaoqing.setInnerContainerSize(cc.size(620, 105 * pai > 620 ? 105 * pai : 410))
            this.ScrollView_biaoqing.addChild(item);

            if(data[(index - 1)].isUsed){
                _selectBQ = index;
            }
        }
        fresh_BQ(_selectBQ);
    },
    // 请求表情数据
    reqZhuangBanBQ_data:function(type){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userDressLTBQList",{length : 100},function(rtn){
            cc.log(" pkplayer.handler.userDressLTBQList ",JSON.stringify(rtn))
            if(rtn.code==0)
            {
                self.init_zhuangBanBQ(rtn.data);
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("请求数据失败");
            }
            if(!type){
                self.reqZhuangBanDJ_data();
            }
            
            MjClient.unblock();
        });
    },
    init_zhuangBanDJ:function(data){
        if(!cc.sys.isObjectValid(this) || !data) return;

        var fresh_DJ = function( number){
            for (let index = 1; index <= data.length; index++) {
                var node = this["_zhuangBanDJ" + index];
                if(!node || !cc.sys.isObjectValid(node)) return;
                var imge_select = node.getChildByName("image_select");
                imge_select.visible = number == index;
                if(number == index){
                    var biaoqing_title = this._nodeZB_daoju.getChildByName("daoju_title");
                    biaoqing_title.setString(node.data.title);
    
                    var biaoqing_desc = this._nodeZB_daoju.getChildByName("daoju_desc");
                    biaoqing_desc.setString(node.data.describe);
                    var biaoqing_money = this._nodeZB_daoju.getChildByName("daoju_money");
                    var img_lebi = this._nodeZB_daoju.getChildByName("img_lebi");
                    biaoqing_money.visible = false;
                    img_lebi.visible = false;
                    if(node.data.unlockType == 51 && node.data.isLocked == 0){
                        biaoqing_money.visible = true;
                        biaoqing_money.setString(node.data.extend.consume);
                        img_lebi.visible = true;
                    }
                    

                    var img_daoju = this._nodeZB_daoju.getChildByName("img_daoju");
                    // img_daoju.loadTexture("userInfo_3.0/zhuangBan/tools/" + node.data.aliasId +".png");
                    if(img_daoju.getChildByName("icon_daoju")){
                        img_daoju.getChildByName("icon_daoju").removeFromParent();
                    }
                    
                    if(img_daoju.getChildByName("animation")){
                        img_daoju.getChildByName("animation").removeFromParent();
                    }

                    
                    if(this.HDDJ_tab[node.data.aliasId]){
                        var _json = "userInfo_3.0/zhuangBan/tools/" + this.HDDJ_tab[node.data.aliasId] + "/" + this.HDDJ_tab[node.data.aliasId] + ".json";
                        var _atlas = "userInfo_3.0/zhuangBan/tools/" + this.HDDJ_tab[node.data.aliasId] + "/" + this.HDDJ_tab[node.data.aliasId] + ".atlas";
                        var projNode = createSpine(_json, _atlas);
                        projNode.setAnimation(0, 'animation', true);
                        projNode.setPosition(cc.p(img_daoju.width * 0.5,img_daoju.height * 0.2));
                        projNode.setScale(1);
                        projNode.setName("animation");
                        img_daoju.addChild(projNode, 9);
                    }else{
                        var _icon  = ccui.ImageView("userInfo_3.0/zhuangBan/tools/" + node.data.aliasId +".png");
                        _icon.setPosition(cc.p(img_daoju.width/2,img_daoju.height/2));
                        _icon.setName("icon_daoju");
                        img_daoju.addChild(_icon);


                    }
                    


                    var btn_jiesuo = this._nodeZB_daoju.getChildByName("btn_jiesuo");
                    btn_jiesuo.visible = node.data.isLocked == 0;
                    btn_jiesuo.index = index;
                    btn_jiesuo.data = node.data;

                    
                    btn_jiesuo.addTouchEventListener(function(sender, type){
                        if(type == ccui.Widget.TOUCH_ENDED){
                            if(sender.data.isUsed){
                                MjClient.showToast("已使用");
                                return;
                            }
                            if(sender.data.unlockType == 52){
                                MjClient.showToast("请参加限定活动");
                                return;
                            }
                            if(sender.data.unlockType == 53){
                                MjClient.showToast("请前往商城礼包解锁");
                                return;
                            }
                            if(sender.data.unlockType !== 51 && sender.data.isLocked == 0){
                                MjClient.showToast("解锁条件不足");
                                return;
                            }

                            
                            // node.data.propId
                            var _num = sender.index - 1;
                            this.reqJieSuo(this._dataOfDaoJu[_num].propId, _num, 4);
                        }
                    },this);

                }
                
                
            }
        }.bind(this);
        var addDJ = function(oneData, index){
            var copyNode = this.cell_daoju.clone();
            copyNode.visible = true;
            var imge_select = copyNode.getChildByName("image_select");
            imge_select.visible = false;
            var image_lock = copyNode.getChildByName("img_suo");
            image_lock.visible = oneData.isLocked == 0;

            var img_guizu = copyNode.getChildByName("img_guizu");
            img_guizu.visible = false;

            var img_lebi = copyNode.getChildByName("img_lebi");
            img_lebi.visible = false;

            var img_name = copyNode.getChildByName("img_name");
            img_name.visible = false;

            var img_bg2 = copyNode.getChildByName("img_bg2");
            img_bg2.visible= false;
            if(oneData.isLocked == 0){
                if(oneData.unlockType <= 9){
                    img_guizu.visible = true;
                    img_bg2.visible= true;
                    // "userInfo_3.0/zhuangBan/tools/" + node.data.aliasId +".png");
                    // img_guizu.loadTexture("userInfo_3.0/guiZu/gz_0" + oneData.unlockType + ".png");
                    img_guizu.setString("贵族 " + oneData.unlockType + " 解锁 ");
                    // img_guizu.loadTexture("userInfo_3.0/zhuangBan/chat_emoji/" + oneData.aliasId + ".png");
                }else if(oneData.unlockType == 51){
                    img_lebi.visible = true;
                    img_bg2.visible= true;
                    img_bg2.loadTexture("userInfo_3.0/bg_jiesuoneirong_2.png");
                }else if(oneData.unlockType == 52){
                    img_guizu.visible = true;
                    img_bg2.visible= true;
                    img_guizu.setString("活动解锁");
                }else if(oneData.unlockType == 53){
                    img_guizu.visible = true;
                    img_bg2.visible= true;
                    img_guizu.setString("礼包解锁");
                }
            }else if(oneData.isLocked == 1){
                
            }
            

            

            var img_hongdian = copyNode.getChildByName("img_hongdian");
            img_hongdian.visible = (oneData.isLocked == 1 && oneData.isRead == 0);

            
            var icon = copyNode.getChildByName("icon");
            icon
            var imge_frame = copyNode.getChildByName("icon");
            imge_frame.index = index;
            imge_frame.data = oneData;
            imge_frame.loadTexture("userInfo_3.0/zhuangBan/tools/" + oneData.aliasId + ".png")
            imge_frame.addTouchEventListener(function(sender, type){
                if(type == ccui.Widget.TOUCH_ENDED){
                    fresh_DJ(sender.index);
                    var _num = sender.index - 1;
                    if(this._dataOfDaoJu[_num].isLocked == 1 &&  this._dataOfDaoJu[_num].isRead == 0){
                        this._dataOfDaoJu[_num].isRead = 1;
                        this.reqClearRedpoint(this._dataOfDaoJu[_num].propId, 3,sender.getParent());
                    }
                    
                }
            },this);
            
            copyNode.data = oneData;
            this["_zhuangBanDJ" + index] = copyNode;
            return copyNode;

        }.bind(this);

        this.ScrollView_daoju.removeAllChildren();
        this._dataOfDaoJu = data;
        this._unlockDJ = false;

        var pai = Math.ceil(data.length / 5);
        this.ScrollView_daoju.setInnerContainerSize(cc.size(720, 145 * pai > 500 ? 145 * pai : 500))
        var _height = this.ScrollView_daoju.getInnerContainerSize().height;
        var _selectDJ = 1;
        for (let index = 1; index <= data.length; index++) {
            var lie = index % 5;
            var pai = Math.ceil(index / 5);
            var pos_x = 75 + (lie-1) * 145;
            var pos_y = (_height - 80) - (pai - 1) * 145;
            if(lie == 0) pos_x = 75 + 145*4;
            var item = addDJ(data[(index - 1)], index);
            item.x = pos_x;
            item.y = pos_y;
            // cc.log("==== lms ---- 105 * pai = ",105 * pai)
            // this.ScrollView_biaoqing.setInnerContainerSize(cc.size(620, 105 * pai > 620 ? 105 * pai : 410))
            this.ScrollView_daoju.addChild(item);
            if(data[(index - 1)].isUsed){
                _selectDJ = index;
            }
        }
        fresh_DJ(_selectDJ);

    },

    reqZhuangBanDJ_data:function(type){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userDressHDDJList",{length : 100},function(rtn){
            cc.log(" pkplayer.handler.userDressHDDJList ",JSON.stringify(rtn))
            if(rtn.code==0)
            {
                self.init_zhuangBanDJ(rtn.data);
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("请求数据失败");
            }
            MjClient.unblock();
        });
    },

    reqUseBtn:function(propId, number, type2){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userDressPropUse",{propId : propId},function(rtn){
            if(rtn.code==0)
            {
                if(type2 == 1){
                    self.reqZhuangBanTXK_data(1);
                }else if(type2 == 2){
                    self.reqZhuangBanDH_data(1);
                }else if(type2 == 3){
                    self.reqZhuangBanBQ_data(1);
                }else if(type2 == 4){
                    self.reqZhuangBanDJ_data(1);
                }
                // if (rtn.message)
                //     MjClient.showToast(rtn.message);
                
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("请求数据失败");
            }
            MjClient.unblock();
        });
    },

    reqJieSuo:function(propId, number, type2){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userDressCurrencyUnlock",{propId : propId},function(rtn){
            if(rtn.code==0)
            {
                if(type2 == 1){
                    self.reqZhuangBanTXK_data(1);
                }else if(type2 == 2){
                    self.reqZhuangBanDH_data(1);
                }else if(type2 == 3){
                    self.reqZhuangBanBQ_data(1);
                }else if(type2 == 4){
                    self.reqZhuangBanDJ_data(1);
                }
                MjClient.showToast("解锁成功");
                
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("请求数据失败");
                if(rtn.message == "乐币不足")
                    self.addChild(new UserInfo_exChangeMoney());
            }
            MjClient.unblock();
        });
    },

    reqHuoDong_data:function(){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userNobleActivityState",{},function(rtn){
            if(rtn.code==0)
            {
                self._data = rtn.data;
                self.GZHD_tab[0].status = rtn.data.isRecLogin;
                self.GZHD_tab[1].status = rtn.data.diamondManage.isBets;
                self.refresh_gzhd();
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("领取失败");
            }
            MjClient.unblock();
        });

    },

    // pkplayer.handler.userDressClearRedpoint
    reqClearRedpoint:function(propId, type, node){
        var self = this;
        // MjClient.showToast("清除红点");
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userDressClearRedpoint",{propId : propId},function(rtn){
            if(rtn.code==0)
            {
                
                node.getChildByName("img_hongdian").visible = false;
                
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("请求数据失败");
            }
            MjClient.unblock();
        });
    },

    reqLingQu:function(){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userLoginEmpirical",{},function(rtn){
            if(rtn.code==0)
            {
                MjClient.showToast("领取成功");
                self.GZHD_tab[0].status = 2;
                self._data.isRecLogin = 2;

            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("领取失败");
            }
            MjClient.unblock();
        });
    },

    initRecord:function(){
        var self = this;
        if(!this._node_record) return;
        this._node_record.visible = true;
        var _back = this._node_record.getChildByName("back_0");
        var _close = _back.getChildByName("close");
        _close.setTouchEnabled(true);
        _close.addTouchEventListener(function(sender, type){
            if(type == ccui.Widget.TOUCH_ENDED){
                this._node_record.visible = false;
            }
        },this);

        var list_record =  _back.getChildByName("list_record");
        var cell_record =  _back.getChildByName("cell_record");
        cell_record.visible = false;

        //method 1:首次绑定手机，2：vip1以上的用户登录领取经验，3：玩牌场次经验，4：连续7天未有牌局行为或充值行为，5：祈福袋获得
        // type 1：获得，2.扣除
        //empirical 经验值，如果type值为2，前端需要将当前值前面加个“负号“ 
        // curEmpirical 结余经验值 
        // createTime 创建时间-时间戳

        var initRecordItem = function(oneData){
            if (!cc.sys.isObjectValid(this)) return;
            var copyNode = cell_record.clone();
            copyNode.visible = true;
            var getList = ["首次绑定手机", "vip1以上的用户登录领取经验", "玩牌场次经验", "连续7天未有牌局行为或充值行为", "祈福袋获得"]

            var text_huode = copyNode.getChildByName("text_huode");
            text_huode.ignoreContentAdaptWithSize(true);
            text_huode.setString(getList[(oneData.method - 1)]);

            var text_expNumber = copyNode.getChildByName("text_expNumber");
            text_expNumber.ignoreContentAdaptWithSize(true);
            var expNumber = oneData.type == 1 ? "+" + oneData.empirical : "-" + oneData.empirical;
            text_expNumber.setString(expNumber);

            var text_expTotal = copyNode.getChildByName("text_expTotal");
            text_expTotal.ignoreContentAdaptWithSize(true);
            text_expTotal.setString(oneData.curEmpirical);

            var _timeStr = MjClient.dateFormat(new Date(parseInt(oneData.createTime)), 'yyyy-MM-dd hh:mm:ss');
            var text_time = copyNode.getChildByName("text_time");
            text_time.ignoreContentAdaptWithSize(true);
            text_time.setString(_timeStr);

            return copyNode;

        }.bind(this);
        
        var reqRecordData = function(){
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.userEmpRecord",{},function(rtn){
                cc.log(" pkplayer.handler.userEmpRecord ",JSON.stringify(rtn))
                if(rtn.code==0)
                {
                    var _data = rtn.data;
                    list_record.removeAllItems();
                    for (var i = 0; i < _data.length; i++) {
                        list_record.pushBackCustomItem(initRecordItem(_data[i]));
                        
                    }

                }
                else
                {
                    if (rtn.message)
                        MjClient.showToast(rtn.message);
                    else
                        MjClient.showToast("数据读取失败，请重试");
                }
                MjClient.unblock();
            });
        }.bind(this);

        
        
        //list_record
        reqRecordData();



    },
    



    isJS_skin:function(){
        if(MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ || 
           MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
           MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
           MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
           MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ||
            MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ ){
            return true;
        }
        return false;
    },


    editBoxReturn: function (editBox)
    {
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.updateSignature",{signature:escape(editBox.getString())},function(rtn){
            if(rtn.code==0)
            {
                MjClient.showToast("更新个性签名成功");
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("更新个性签名失败");
            }
            MjClient.unblock();
        });
    },
});


