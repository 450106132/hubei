/**
 * Created by WuXiaoDong on 2017/8/31.
 */

var gameWaitingLayer = cc.Layer.extend({
    _data:null,
    _back:null,
    ctor: function (data) {
        this._super();
        var UI = ccs.load("gameWaitingLayer.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        MjClient.gemewaitingui=this;
        var self = this;
        
        this._data = data;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.75, 0.75], [0.5, 0.5], [0, -0.17]);

        var _block0 = UI.node.getChildByName("block_0");
        setWgtLayout(_block0, [1, 1], [0.5, 0.5], [0, 0], true);
        _block0.setVisible(false);

        var _back0 = UI.node.getChildByName("back_0");
        setWgtLayout(_back0, [0.5, 0.5], [0.5, 0.5], [0, 0]);
        _back0.setVisible(false);

        //退出比赛按钮
        var doorClose = this._back.getChildByName("close");
        doorClose.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                _block0.setVisible(true);
                _back0.setVisible(true);
            }
        }, this);

        //关闭按钮
        var btnSure = _back0.getChildByName("btn_sure");
        btnSure.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.matchRetire",{matchId:this._data.id},function(rtn){
                    MjClient.unblock();
                    if(rtn.code == -1)
                    {
                        MjClient.showToast(rtn.message);
                    }else if(rtn.code == 0){
                        //退赛成功
                        cc.log("wxd..........退赛成功"+JSON.stringify(rtn));
                        self.removeFromParent();
                        delete MjClient.gemewaitingui;
                    }
                })
            }
        }, this);

        UIEventBind(null, this, "dismissMatch",function(data) {
            if(data.matchId == this._data.id){
                MjClient.showToast("比赛已过报名时间，解散并退还费用");
                self.removeFromParent();
                if(MjClient.playgroundui){
                    MjClient.playgroundui.getPlaygroundData();
                }
            }
        });

        //取消按钮
        var btnCancle = _back0.getChildByName("btn_cancle");
        btnCancle.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                _block0.setVisible(false);
                _back0.setVisible(false);
            }
        }, this);

        this.initUI();
        this.playAni();
        return true;
    },

    initUI:function () {
        var self = this;

        cc.log("wxd..........................._data:"+JSON.stringify(this._data));
        if(!this._data){
            return;
        }

        var textTitle = this._back.getChildByName("Text_title");
        if(this._data.title){
            textTitle.setString(this._data.title);
        }else {
            textTitle.setString("比赛");
        }

        for(var i=0 ; i<3 ; i++){
            var imgBg = this._back.getChildByName("Image_bg_" + i);
            if(this._data.rewords && this._data.rewords[i]){
                imgBg.setVisible(true);
                var textReward = imgBg.getChildByName("Text_reward");
                if(this._data.rewords[i].awardType == 1){
                    textReward.setString("元宝x" + this._data.rewords[i].awardCount)
                }else if(this._data.rewords[i].awardType == 2){
                    textReward.setString("现金" + this._data.rewords[i].awardCount + "元")
                }else if(this._data.rewords[i].awardType == 3){
                    textReward.setString("话费" + this._data.rewords[i].awardCount + "元")
                }

            }else {
                imgBg.setVisible(false);
            }
        }

        var imageYuanbao = this._back.getChildByName("Image_yuanbao");
        if(this._data.rewords && this._data.rewords.length == 1){
            imageYuanbao.setVisible(true);
        }else {
            imageYuanbao.setVisible(false);
        }

        var panelPeople = this._back.getChildByName("Panel_people");
        if(this._data.type == 1){
            panelPeople.setVisible(true);
        }else {
            panelPeople.setVisible(false);
        }

        var mNum = panelPeople.getChildByName("Text_mNum");
        var num = panelPeople.getChildByName("Text_Num");
        if(this._data.signUpCount){
            num.setString(this._data.condition - this._data.signUpCount);
        }else {
            if(this._data.userCount){
                num.setString(this._data.condition -  this._data.userCount);
            }else {
                num.setString(0);
            }
        }

        if(this._data.type == 1){
            if(this._data.signUpCount){
                mNum.setString(this._data.signUpCount);
            }else {
                mNum.setString(0);
            }
        }

        UIEventBind(null,this,"signUpInfo",function(data){
            num.setString(self._data.condition - data.signUpCount);
            mNum.setString(data.signUpCount);
        })
    },

    playAni:function () {
        var panelPPZ = this._back.getChildByName("Panel_PPZ");

        for(var i=0 ; i<6 ; i++){
            cc.log("wxd............name:"+ "Image_zi_" + i);
            var imgZi = panelPPZ.getChildByName("Image_zi_" + i);

            var hei = 20;
            if(i>=3){
                hei = 10;
            }
            if(imgZi){
                imgZi.runAction(cc.repeatForever(cc.sequence(
                    cc.delayTime(i*0.3),
                    cc.moveBy(0.3, 0, hei),
                    cc.moveBy(0.3, 0, -hei),
                    cc.delayTime(2 - i*0.3)
                )));
            }
        }
    }
});