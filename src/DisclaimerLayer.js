/**
 * Created by WuXiaoDong on 2019/8/8.
 */

var disclaimerReminderLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var UI = ccs.load("disclaimerReminderLayer.json");
        if(MjClient.isUseUIv3 && MjClient.isUseUIv3()){
            UI = ccs.load("disclaimerReminderLayer_3.0.json");
        }
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = UI.node.getChildByName("back");
        if(MjClient.isUseUIv3 && MjClient.isUseUIv3()){
            setWgtLayout(_back, [1,1],[0.5,0.5],[0,0]);
        }else{
            setWgtLayout(_back, [0.64,0.78],[0.5,0.5],[0,0]);
        }
        

        //关闭按钮
        var _close = _back.getChildByName("no");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        var checkBoxAgree = _back.getChildByName("checkBoxAgree");

        var checkBoxNoRem = _back.getChildByName("checkBoxNoRem");

        var btnSure = _back.getChildByName("yes");
        btnSure.addTouchEventListener(function (sender, type) {
            if(type == ccui.Widget.TOUCH_ENDED){
                if(checkBoxAgree.isSelected()){
                    util.localStorageEncrypt.setBoolItem("_Disclaimer_Agree_", true)
                }else {
                    MjClient.showToast("请勾选同意免责协议");
                    return;
                }
                util.localStorageEncrypt.setBoolItem("_Disclaimer_NoRem_", checkBoxNoRem.isSelected());
                self.removeFromParent();

                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.openBrowser", { type: 16 }, function (rtn) {
                    MjClient.unblock();
                    if (rtn.code == 0) {
                        MjClient.native.OpenUrl(rtn.data);
                        //MjClient.native.wxShareUrl(rtn.data, unescape(MjClient.data.pinfo.nickname) + "的战绩", "个人记录请勿对外分享\n绿色健康游戏，享受美好生活");
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
            }
        });

        var btn_agreement = _back.getChildByName("btn_agreement");
        btn_agreement.addTouchEventListener(function (sender, type) {
            if(type == ccui.Widget.TOUCH_ENDED){
                MjClient.Scene.addChild(new disclaimerMainLayer());
            }
        });

        return true;
    },
});


var disclaimerMainLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var UI = ccs.load("disclaimerMainLayer.json");
        if(MjClient.isUseUIv3 && MjClient.isUseUIv3()){
            UI = ccs.load("disclaimerMainLayer_3.0.json");
        }
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = UI.node.getChildByName("back");
        if(MjClient.isUseUIv3 && MjClient.isUseUIv3()){
            setWgtLayout(_back, [1, 1],[0.5,0.5],[0,0]);
        }else{
            setWgtLayout(_back, [0.8,0.85],[0.5,0.5],[0,0]);
        }
        

        //关闭按钮
        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        return true;
    },
});


var authorizationStoreLayer = cc.Layer.extend({
    isClub:null,
    clubeUid:null,
    ctor: function (isClub, clubeUid) {
        this._super();
        var UI = ccs.load("AuthorizationStoreLayer.json");
        if(MjClient.isUseUIv3 && MjClient.isUseUIv3()){
            UI = ccs.load("AuthorizationStoreLayer_3.0.json");
        }
        
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        this.isClub = isClub;
        this.clubeUid = clubeUid;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = UI.node.getChildByName("back");
        if(MjClient.isUseUIv3 && MjClient.isUseUIv3()){
            setWgtLayout(_back, [1, 1],[0.5,0.5],[0,0]);
        }else{
            setWgtLayout(_back, [0.8,0.8],[0.5,0.5],[0,0]);
        }
        

        //关闭按钮
        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        this._node_weishouquan = _back.getChildByName("Node_weishouquan");
        this._node_weishouquan.setVisible(false);
        this._node_yishouquan = _back.getChildByName("Node_yishouquan");
        this._node_yishouquan.setVisible(false);

        this.getUserStandingInfo();

        return true;
    },

    initUI:function (data) {
        var self = this;
        if(data.authInfo || this.isClub){
            this._node_weishouquan.setVisible(false);
            this._node_yishouquan.setVisible(true);

            var dataA = null;
            if(this.isClub && !data.authInfo){
                if(data.authList){
                    for(var i = 0; i<data.authList.length; i++){
                        if(self.clubeUid == data.authList[i].creator){
                            dataA = data.authList[i];
                        }
                    }
                }
                var textTitle = this._node_yishouquan.getChildByName("Text_21");
                textTitle.ignoreContentAdaptWithSize(true);
                textTitle.setString("会长授权 ");
            }

            var headImg = this._node_yishouquan.getChildByName("headImg");
            var url = data.authInfo.headimgurl;
            if(this.isClub && !data.authInfo && dataA){
                url = dataA.headimgurl;
            }
            if(url) {
                cc.loader.loadImg(url, {isCrossOrigin: true}, function (err, texture) {
                    if (!err && texture && cc.sys.isObjectValid(this)) {
                        var headSprite = new cc.Sprite(texture);
                        headSprite.setName("headSprite");
                        headSprite.setPosition(cc.p(this.width / 2, this.height / 2));
                        headSprite.setScaleX(this.width / headSprite.getContentSize().width);
                        headSprite.setScaleY(this.height / headSprite.getContentSize().height);
                        this.addChild(headSprite);
                    }
                }.bind(headImg));
            }

            var Text_id = this._node_yishouquan.getChildByName("Text_id");
            Text_id.ignoreContentAdaptWithSize(true);
            var Text_name = this._node_yishouquan.getChildByName("Text_name");
            Text_name.ignoreContentAdaptWithSize(true);

            var btn_quxiao = this._node_yishouquan.getChildByName("Button_quxiao");

            if(this.isClub && !data.authInfo && dataA){
                Text_id.setString(dataA.creator);
                Text_name.setString(unescape(dataA.title));
                btn_quxiao.loadTextureNormal("usernfo/shangCShouquan/btn_shouquan.png");
                btn_quxiao.clubId = dataA.clubId;
                btn_quxiao.addTouchEventListener(function (sender, type) {
                    if (type == ccui.Widget.TOUCH_ENDED) {
                        self.reqUserStandingAuth(sender.clubId);
                    }
                }, this);
            }else {
                Text_id.setString(data.authInfo.gameId);
                Text_name.setString(unescape(data.authInfo.nickname));
                btn_quxiao.addTouchEventListener(function (sender, type) {
                    if (type == ccui.Widget.TOUCH_ENDED) {
                        self.reqUserStandingAuthCancel(data.authInfo.id);
                    }
                }, this);
            }
        }else {
            this._node_weishouquan.setVisible(true);
            this._node_yishouquan.setVisible(false);

            var image_item = this._node_weishouquan.getChildByName("Image_item");
            image_item.setVisible(false);
            var textName = image_item.getChildByName("Text_23");
            textName.ignoreContentAdaptWithSize(true);

            var listView = this._node_weishouquan.getChildByName("Image_bg").getChildByName("ListView_1");
            listView.setClippingEnabled(true);

            var Text_name = this._node_weishouquan.getChildByName("Image_xuanze").getChildByName("Text_name");
            Text_name.ignoreContentAdaptWithSize(true);

            if(data.authList){
                for(var i = 0; i<data.authList.length; i++){
                    var item = image_item.clone();
                    item.setVisible(true);
                    var textNameItem = item.getChildByName("Text_23");
                    textNameItem.setAnchorPoint(cc.p(0, 0.5));
                    textNameItem.x = 0;
                    textNameItem.setString(data.authList[i].creator+"（"+unescape(data.authList[i].title)+"）");
                    listView.pushBackCustomItem(item);
                    item.title = data.authList[i].title;
                    item.clubId = data.authList[i].clubId;

                    item.addTouchEventListener(function (sender, type) {
                        if (type == ccui.Widget.TOUCH_ENDED) {
                            self.reqUserStandingAuth(sender.clubId);
                        }
                    }, this);
                }
            }
        }
    },

    getUserStandingInfo:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userStandingInfo",{},function(rtn){
            cc.log("wxd pkplayer.handler.userStandingInfo:"+JSON.stringify(rtn));
            MjClient.unblock();
            if(rtn.code == 0) {
                self.initUI(rtn.data);
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    },

    reqUserStandingAuth:function (clubId) {
        var self = this;

        MjClient.showMsg("授权后，会长可以操作您的商城，确定授权吗？", function() {
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.userStandingAuth",{clubId:clubId},function(rtn){
                cc.log("wxd pkplayer.handler.userStandingAuth:"+JSON.stringify(rtn));
                MjClient.unblock();
                if(rtn.code == 0) {
                    self.removeFromParent();
                    MjClient.showToast(rtn.message);
                }else {
                    MjClient.showToast(rtn.message);
                }
            });
        }, function() {}, "1");

    },

    reqUserStandingAuthCancel:function (id) {
        var self = this;

        MjClient.showMsg("确定取消授权吗？", function() {
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.userStandingAuthCancel",{id:id},function(rtn){
                cc.log("wxd pkplayer.handler.userStandingAuthCancel:"+JSON.stringify(rtn));
                MjClient.unblock();
                if(rtn.code == 0) {
                    self.removeFromParent();
                    MjClient.showToast(rtn.message);
                }else {
                    MjClient.showToast(rtn.message);
                }
            });
        }, function() {}, "1");
    },
});


var personalMallLayer = cc.Layer.extend({
    _Data:null,
    _offset:1,
    ctor: function () {
        this._super();
        var UI = ccs.load("PersonalMallLayer.json");
        if(MjClient.isUseUIv3 && MjClient.isUseUIv3()){
            UI = ccs.load("PersonalMallLayer_3.0.json");
        }
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        this._back = UI.node.getChildByName("back");
        
        if(MjClient.isUseUIv3 && MjClient.isUseUIv3()){
            setWgtLayout(this._back, [1, 1],[0.5, 0.5],[0, 0]);
        }else{
            setWgtLayout(this._back, [0.8,0.8],[0.5,0.5],[0,0]);
        }

        //关闭按钮
        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        var imageIDNum = this._back.getChildByName("Image_ss_di");
        this._imageIDNum0 = new cc.EditBox(cc.size(imageIDNum.width, imageIDNum.height), new cc.Scale9Sprite("usernfo/shangCShouquan/shrk.png"));
        this._imageIDNum0.setPlaceholderFontSize(26);
        this._imageIDNum0.setMaxLength(7);
        this._imageIDNum0.setFontColor(cc.color("#89572F"));
        this._imageIDNum0.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._imageIDNum0.setPlaceHolder("按ID查找已授权好友");
        this._imageIDNum0.setPosition(imageIDNum.getContentSize().width/2, imageIDNum.getContentSize().height/2);
        imageIDNum.addChild(this._imageIDNum0);

        var btnSearch = imageIDNum.getChildByName("btn_search");
        btnSearch.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                var _str = self._imageIDNum0.getString();
                if(!(((parseInt(_str)).toString()).length == 6 || ((parseInt(_str)).toString()).length == 7 )|| parseInt(_str) == 0)
                {
                    MjClient.showToast("请输入正确的ID");
                    return;
                }
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.userMallList",{userId:parseInt(_str)},function(rtn){
                    cc.log("wxd pkplayer.handler.userMallList:"+JSON.stringify(rtn));
                    MjClient.unblock();
                    if(rtn.code == 0) {
                        if(rtn.list.length == 1){
                            MjClient.native.OpenUrl(rtn.list[0].url)
                        }else {
                            MjClient.showToast("该玩家未授权");
                        }
                    }else {
                        MjClient.showToast(rtn.message);
                    }
                });
            }
        }, this);

        this._listView = this._back.getChildByName("Image_bg").getChildByName("ListView_1");
        var _listViewState = 0;
        this._listView.addCCSEventListener(function(sender, type) {
            switch (type) {
                case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                    if (_listViewState == 0) {
                        _listViewState = 1;
                    }
                    break;
                case ccui.ScrollView.EVENT_AUTOSCROLL_ENDED:
                    if (_listViewState == 1) {
                        self.getUserMallListInfo();
                    }
                    _listViewState = 0;
                    break;
            }
        });

        this.getUserMallListInfo();

        return true;
    },

    initUI:function () {
        var self = this;
        if(this._Data.length == 0){
            return;
        }
        var itemRecord = this._back.getChildByName("Image_item");
        for(var i = 0; i < this._Data.length; i++){
            var item = itemRecord.clone();

            var textNameItem = item.getChildByName("Text_23");
            textNameItem.setAnchorPoint(cc.p(0, 0.5));
            textNameItem.x = 0;
            textNameItem.setString( this._Data[i].userId+"（"+unescape(this._Data[i].nickname)+"）");
            this._listView.pushBackCustomItem(item);
            item.url = this._Data[i].url;

            item.addTouchEventListener(function (sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED) {
                    MjClient.native.OpenUrl(sender.url)
                }
            }, this);
        }
    },

    getUserMallListInfo:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userMallList",{index:this._offset, pageNum:10},function(rtn){
            cc.log("wxd pkplayer.handler.userMallList:"+JSON.stringify(rtn));
            MjClient.unblock();
            if(rtn.code == 0) {
                self._Data = rtn.list;
                self._offset += self._Data.length;
                self.initUI();
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    },
});


var authorizationStoreTipLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var UI;
        if(MjClient.isUseUIv3 && MjClient.isUseUIv3()){
            UI = ccs.load("AuthorizationStoreTipLayer_3.0.json");
        }
        else {
            UI = ccs.load("AuthorizationStoreTipLayer.json");
        }
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        this._back = UI.node.getChildByName("back");
        if(MjClient.isUseUIv3 && MjClient.isUseUIv3()){
            setWgtLayout(this._back, [1, 1],[0.5, 0.5],[0, 0]);
        }else{
            setWgtLayout(this._back, [0.8, 0.8],[0.5, 0.5],[0, 0]);
        }

        //关闭按钮
        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        this._btnPersonalMall = this._back.getChildByName("btn_personalMall");
        this._btnPersonalMall.setVisible(false);
        this._btnPersonalMall.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
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

        this._btnAuthorizationMall = this._back.getChildByName("btn_authorizationMall");
        this._btnAuthorizationMall.visible = false;
        this._btnAuthorizationMall.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                MjClient.Scene.addChild(new authorizationStoreLayer(true,sender.clubeUid));
            }
        }, this);

        this._btnFriendsMall = this._back.getChildByName("btn_friendsMall");
        this._btnFriendsMall.setVisible(false);
        this._btnFriendsMall.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                MjClient.Scene.addChild(new personalMallLayer());
            }
        }, this);

        this.getUserStandingByClubId();
        return true;
    },

    getUserStandingByClubId:function () {
        var self = this;
        MjClient.block();
        var clubId = FriendCard_Common.getClubInfo().clubId;
        if(FriendCard_Common.isLMClub()){
            clubId = MjClient.FriendCard_main_ui.data.subClubId
        }
        MjClient.gamenet.request("pkplayer.handler.userStandingByClubId",{clubId:clubId},function(rtn){
            cc.log("wxd pkplayer.handler.userStandingByClubId:"+JSON.stringify(rtn));
            MjClient.unblock();
            if(rtn.code == 0) {
                self._btnPersonalMall.setVisible(true);
                self._btnFriendsMall.setVisible(true);
                if(rtn.message != SelfUid()){
                    self._btnAuthorizationMall.visible = true;
                    self._btnAuthorizationMall.clubeUid = rtn.message;
                }
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    }
});