/**
 * Created by WuXiaoDong on 2017/9/19.
 */

var playbackLayer = cc.Layer.extend({
    _textField1:null,
    ctor:function(){
        this._super();
        
        if (MjClient.isUseUIv3 && MjClient.isUseUIv3()){
            var UI = ccs.load("playBackLayer_3.0.json");
        }
        else{
            var UI = ccs.load("playBackLayer.json");
        }
        this._rootUI = this.addChild(UI.node);

        MjClient.playbackui=this;
        var self = this;
        MjClient.playbackcode="";

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.5, 1], [0.5, 0.5], [0, 0]);

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP) {
            setWgtLayout(_back,[0.6, 1], [0.5, 0.5], [0, 0]);
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZ) 
        {
           
             if (MjClient.isUseUIv3 && MjClient.isUseUIv3()){
                setWgtLayout(_back,[0.5391, 0.7042], [0.5, 0.5], [0, 0]);
             }else{
                 setWgtLayout(_back,[0.75, 0.75], [0.5, 0.5], [0, 0]);
             }

        }else if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            setWgtLayout(_back,[0.7, 0.7], [0.5, 0.5], [0, 0]);
        }

        //关闭按钮
        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Zhanji_Chakantarenhuifang_Close", {uid:SelfUid()});
                self.removeFromParent();
            }
        }, this);

        if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            this._textRoomNum = [];
            this._replayCode = [];
            var roomNumBg = _back.getChildByName("img_roomNumBg");
            for (var i = 1; i <= 9; i++) {  
                var txtUi = roomNumBg.getChildByName("txt_num"+i);
                txtUi.setString("");
                this._textRoomNum.push(txtUi);
            }
        } else {
            this._textField1 = _back.getChildByName("xiaotanchuang").getChildByName("TextField_1");
            this._textField1.setTouchEnabled(false);
        }

        //数字按键
        var _num = _back.getChildByName("num");
        function numBtnTouchEvent(sender, Type) {
            if (Type == ccui.Widget.TOUCH_ENDED) {
                var itag = sender.getTag();
                self.InputPlaybackNumber(itag);
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
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Zhanji_Chakantarenhuifang_Off", {uid:SelfUid()});
                    self.InputPlaybackNumber(-2);
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
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Zhanji_Chakantarenhuifang_Delete", {uid:SelfUid()});
                    self.InputPlaybackNumber(-1);
                    break;
                default :
                    break;
            }
        }, this);


        //确定
        var btnSure = _back.getChildByName("btnSure");
        btnSure.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Zhanji_Chakantarenhuifang_Sure", {uid:SelfUid()});
                    if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                        if (this._replayCode.length > 0) {
                            var replayCode = parseInt(this._replayCode.join(""));
                            MjClient.getOtherPlayLog(replayCode);
                        }
                        else
                            MjClient.showToast("请输入正确的回放码");
                    } 
                    else {
                        var playbackcode = parseInt(MjClient.playbackcode);
                        if (playbackcode>0)
                            MjClient.getOtherPlayLog(playbackcode);
                        else
                            MjClient.showToast("请输入正确的回放码");
                    }

                    break;
                default :
                    break;
            }
        }, this);

        return true;
    },

    InputPlaybackNumber:function(n) {
        var change=true;
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            if(n>=0 && this._replayCode.length<15) this._replayCode.push(n);  
            else if(n==-1 && this._replayCode.length>0) this._replayCode.length -= 1;
            else if(n==-2 && this._replayCode.length>0) this._replayCode = [];
            else change = false;
            if(change)
            {
                for (var i = 0; i < this._textRoomNum.length; i++) {
                    var code = this._replayCode[i];
                    this._textRoomNum[i].setString(typeof(code) == 'undefined' ? "" : code);
                }
            }
        }
        else {
            if(n>=0&&MjClient.playbackcode.length<15)       MjClient.playbackcode += n;
            else if(n==-1&&MjClient.playbackcode.length>0) MjClient.playbackcode = MjClient.playbackcode.substring(0,MjClient.playbackcode.length-1);
            else if(n==-2&&MjClient.playbackcode.length>0) MjClient.playbackcode = "";
            else change=false;
            if(change)
            {
                this._textField1.setString(MjClient.playbackcode);
            }
        }
    }
});