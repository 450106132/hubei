

var CustomDanZhaFengDingLayer = cc.Layer.extend({
    _textField1:null,
    ctor:function(){
        this._super();
        

        var UI = ccs.load("customBaseScoreLayer.json");
        this._rootUI = this.addChild(UI.node);

        MjClient.playbackui=this;
        var self = this;
        MjClient._customFengDing="";

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.5, 1], [0.5, 0.5], [0, 0]);

        // if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
        //     MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP) {
        //     setWgtLayout(_back,[0.6, 1], [0.5, 0.5], [0, 0]);
        // }
        // else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
        //     MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
        //     MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
        //     MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
        //     MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
        //     MjClient.getAppType() == MjClient.APP_TYPE.BDHYZ) 
        // {
           
        //      if (MjClient.isUseUIv3 && MjClient.isUseUIv3()){
        //         setWgtLayout(_back,[0.5391, 0.7042], [0.5, 0.5], [0, 0]);
        //      }else{
        //          setWgtLayout(_back,[0.75, 0.75], [0.5, 0.5], [0, 0]);
        //      }

        // }else if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
        //     setWgtLayout(_back,[0.7, 0.7], [0.5, 0.5], [0, 0]);
        // }
        
        
        setWgtLayout(_back,[0.5391, 0.7042], [0.5, 0.5], [0, 0]);

        //关闭按钮
        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);
        _close.setVisible(false);

        // if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
        //     this._textRoomNum = [];
        //     this._replayCode = [];
        //     var roomNumBg = _back.getChildByName("img_roomNumBg");
        //     for (var i = 1; i <= 9; i++) {  
        //         var txtUi = roomNumBg.getChildByName("txt_num"+i);
        //         txtUi.setString("");
        //         this._textRoomNum.push(txtUi);
        //     }
        // } else {
            this._textField1 = _back.getChildByName("xiaotanchuang").getChildByName("TextField_1");
            this._textField1.setTouchEnabled(false);
        //}

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

                    if( !( parseInt(MjClient._customFengDing)  > 0  && parseInt(MjClient._customFengDing) <= 100 && 
                        MjClient._customFengDing.substr(0, 1) != "0" ) ){
                         MjClient.showToast("请重新输入正确封顶数");
                         MjClient._customFengDing = "";
                         this._textField1.setString(MjClient._customFengDing);
                    }else{
                        MjClient._customDanZhaFengDingNode.setString(MjClient._customFengDing);
                        self.removeFromParent();
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

        if(n>=0&&MjClient._customFengDing.length<15)       MjClient._customFengDing += n;
        else if(n==-1&&MjClient._customFengDing.length>0) MjClient._customFengDing = MjClient._customFengDing.substring(0,MjClient._customFengDing.length-1);
        else if(n==-2&&MjClient._customFengDing.length>0) MjClient._customFengDing = "";
        else change=false;
        if(change)
        {
            this._textField1.setString(MjClient._customFengDing);
        }

        if(MjClient._customFengDing.length >= 3 &&  parseInt(MjClient._customFengDing) > 100 ){
             MjClient.showToast("封顶数上限值100，请重新输入");
             MjClient._customFengDing = "";
             this._textField1.setString(MjClient._customFengDing);
        }
    }
});