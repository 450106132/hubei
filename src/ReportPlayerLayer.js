/**
 * Created by WuXiaoDong on 2019/3/6.
 */

var reportPlayerLayer = cc.Layer.extend({
    _back:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("ReportPlayerLayer.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.64, 0.64], [0.5, 0.5], [0, 0]);

        //关闭按钮
        var close = this._back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        var btnExit = this._back.getChildByName("exit");
        if(btnExit) {
            btnExit.addTouchEventListener(function (sender, type) {
                if (type === ccui.Widget.TOUCH_ENDED) {
                    self.removeFromParent();
                }
            }, this);
        }

        //ID输入框
        var ID_bg = this._back.getChildByName("ID_bg");
        this._IDNum = new cc.EditBox(cc.size(ID_bg.width, ID_bg.height), new cc.Sprite("reportPlayer/input_bg.png"));
        this._IDNum.setPlaceholderFontSize(20);
        this._IDNum.setFontColor(cc.color("#936a4a"));
        this._IDNum.setMaxLength(7);
        this._IDNum.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._IDNum.setPlaceHolder("请输入你需要举报的用户游戏ID");
        this._IDNum.setPosition(ID_bg.getContentSize().width/2, ID_bg.getContentSize().height/2);
        ID_bg.addChild(this._IDNum);

        var des_bg = this._back.getChildByName("des_bg");
        this._des = new cc.EditBox(cc.size(des_bg.width, des_bg.height), new cc.Sprite("reportPlayer/reason_bg.png"));
        this._des.setPlaceholderFontSize(20);
        this._des.setFontSize(20);
        this._des.setFontColor(cc.color("#936a4a"));
        this._des.setMaxLength(120);
        //this._des.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._des.setPlaceHolder("请输入你需要举报的内容（最多80字）");
        this._des.setPosition(des_bg.getContentSize().width/2, des_bg.getContentSize().height/2);
        des_bg.addChild(this._des);

        for(var i = 0; i < 6; i++){
            var checkBox = this._back.getChildByName("CheckBox_"+i);
            var text = checkBox.getChildByName("Text");
            text.ignoreContentAdaptWithSize(true);
            text.setTouchEnabled(true);
            text.addTouchEventListener(function (sender, type) {
                if(type === ccui.Widget.TOUCH_ENDED) {
                    sender.parent.setSelected(!sender.parent.isSelected());
                }
            })
        }

        var btnSure = this._back.getChildByName("btn_sure");
        btnSure.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                var para = {};
                var IDStr = this._IDNum.getString();
                if(IDStr.length != 7 || parseInt(IDStr) == 0)
                {
                    MjClient.showToast("请输入正确的ID");
                    return;
                }
                para.userId = IDStr;

                var checkStr = "";
                var isFirst = true;
                for(var i = 0; i < 6; i++){
                    var checkBox = self._back.getChildByName("CheckBox_"+i);
                    if(checkBox.isSelected()){
                        if(isFirst){
                            checkStr += i.toString();
                            isFirst = false;
                        }else {
                            checkStr += (","+i);
                        }
                    }
                }
                if(checkStr.length == 0){
                    MjClient.showToast("请输选择一个理由举报");
                    return;
                }
                para.type = checkStr;

                para.content = this._des.getString();

                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.userReport", para, function (rtn) {
                    MjClient.unblock();
                    cc.log("pkplayer.handler.userReport"+JSON.stringify(rtn));
                    if (rtn.code == 0) {
                        self.removeFromParent();
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        }
                        else {
                            MjClient.showToast("举报成功");
                        }
                    }
                    else {
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        }
                        else {
                            MjClient.showToast("举报失败");
                        }
                    }
                });
            }
        }, this);

        return true;
    },
});


var reportPlayerLayer_v3 = cc.Layer.extend({
    _back:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("ReportPlayerLayer_3.0.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);

        //关闭按钮
        var close = this._back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        var btnExit = this._back.getChildByName("exit");
        if(btnExit) {
            btnExit.addTouchEventListener(function (sender, type) {
                if (type === ccui.Widget.TOUCH_ENDED) {
                    self.removeFromParent();
                }
            }, this);
        }

        //ID输入框
        var ID_bg = this._back.getChildByName("ID_bg");
        var _fontSize = 20;
        this._IDNum = new cc.EditBox(cc.size(ID_bg.width, ID_bg.height), new cc.Scale9Sprite("common_3.0/bg_shurukuang.png"));
        // this._IDNum.setPlaceholderFontSize(_fontSize);
        this._IDNum.setFontColor(cc.color("#08460e"));
        
        this._IDNum.setPlaceholderFontColor(cc.color("#a3a39f"));
        this._IDNum.setMaxLength(7);
        this._IDNum.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._IDNum.setPlaceHolder("请输入你需要举报的用户游戏ID");
        this._IDNum.setFont("fonts/lanting.TTF", _fontSize);
        this._IDNum.setPlaceholderFont("fonts/lanting.TTF", _fontSize);
        this._IDNum.setPosition(ID_bg.getContentSize().width/2, ID_bg.getContentSize().height/2);
        ID_bg.addChild(this._IDNum);

        var des_bg = this._back.getChildByName("des_bg");
        this._des = new cc.EditBox(cc.size(des_bg.width, des_bg.height), new cc.Scale9Sprite("common_3.0/bg_shurukuang.png"));
        // this._des.setPlaceholderFontSize(_fontSize);
        // this._des.setFontName("fonts/lanting.TTF");
        this._des.setFontSize(_fontSize);
        this._des.setFontColor(cc.color("#08460e"));
        
        this._des.setPlaceholderFontColor(cc.color("#a3a39f"));
        this._des.setMaxLength(120);
        //this._des.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._des.setPlaceHolder("请输入你需要举报的内容（最多80字）");
        this._des.setFont("fonts/lanting.TTF", _fontSize);
        this._des.setPlaceholderFont("fonts/lanting.TTF", _fontSize);
        this._des.setPosition(des_bg.getContentSize().width/2, des_bg.getContentSize().height/2);
        des_bg.addChild(this._des);

        for(var i = 0; i < 6; i++){
            var checkBox = this._back.getChildByName("CheckBox_"+i);
            var text = checkBox.getChildByName("Text");
            text.ignoreContentAdaptWithSize(true);
            text.setTouchEnabled(true);
            text.addTouchEventListener(function (sender, type) {
                if(type === ccui.Widget.TOUCH_ENDED) {
                    sender.parent.setSelected(!sender.parent.isSelected());
                }
            })
        }

        var btnSure = this._back.getChildByName("btn_sure");
        btnSure.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                var para = {};
                var IDStr = this._IDNum.getString();
                if(IDStr.length != 7 || parseInt(IDStr) == 0)
                {
                    MjClient.showToast("请输入正确的ID");
                    return;
                }
                para.userId = IDStr;

                var checkStr = "";
                var isFirst = true;
                for(var i = 0; i < 6; i++){
                    var checkBox = self._back.getChildByName("CheckBox_"+i);
                    if(checkBox.isSelected()){
                        if(isFirst){
                            checkStr += i.toString();
                            isFirst = false;
                        }else {
                            checkStr += (","+i);
                        }
                    }
                }
                if(checkStr.length == 0){
                    MjClient.showToast("请输选择一个理由举报");
                    return;
                }
                para.type = checkStr;

                para.content = this._des.getString();

                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.userReport", para, function (rtn) {
                    MjClient.unblock();
                    cc.log("pkplayer.handler.userReport"+JSON.stringify(rtn));
                    if (rtn.code == 0) {
                        self.removeFromParent();
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        }
                        else {
                            MjClient.showToast("举报成功");
                        }
                    }
                    else {
                        if (rtn.message) {
                            MjClient.showToast(rtn.message);
                        }
                        else {
                            MjClient.showToast("举报失败");
                        }
                    }
                });
            }
        }, this);

        return true;
    },
});