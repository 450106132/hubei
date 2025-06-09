/**
 * 金币场活动
 */
var ActiveGoldPlaying = cc.Layer.extend({
    ctor: function() {
        this._super();
        if(!MjClient._redPacketInfo || !isGoldActivityOpen()){
            this.removeFromParent();
            return;
        }
        var UI = ccs.load("Act_gold_playing.json");
        this.addChild(UI.node);
        COMMON_UI.setNodeTextAdapterSize(this);
        var that = this;
        MjClient.ActiveGoldPlayingLayer = this;
        this._block = UI.node.getChildByName("block");
        setWgtLayout(this._block, [1, 1], [0.5, 0.5], [0, 0], true);

        this.Panel_Activity = UI.node.getChildByName("Panel_Activity");
        setWgtLayout( this.Panel_Activity, [1, 1], [0.5, 0.5], [0, 0], false);

        this.btn_hongbao =  this.Panel_Activity.getChildByName("Button_hongbao");
        this.actTime1Bg = this.btn_hongbao.getChildByName("Image_time1bg");
        this.actTime1 = this.actTime1Bg.getChildByName("Text_time");
        this.actTime2Bg = this.btn_hongbao.getChildByName("Image_time2bg");
        this.actTime2 = this.actTime2Bg.getChildByName("Text_time");
        this.act_info = this.btn_hongbao.getChildByName("Image_info");
        this.act_info_loading_bar = this.act_info.getChildByName("LoadingBar");
        this.act_info_jushu = this.act_info.getChildByName("Text_jushu");
        this.act_info_tip = this.act_info.getChildByName("Text_tip");


        this.Panel_Hongbao = UI.node.getChildByName("Panel_Hongbao");
        setWgtLayout(this.Panel_Hongbao, [1, 1], [0.5, 0.5], [0, 0], false);
        this.btn_linghaobong = this.Panel_Hongbao.getChildByName("Button_linghaobong");

        this.lingqu_success = this.Panel_Hongbao.getChildByName("Panel_success");
        this.hongbao_money = this.lingqu_success.getChildByName("Image_hongbao").getChildByName("Text_money");
        this.hongbao_light = this.lingqu_success.getChildByName("Image_light");
        this.initView();
        this.setViewEvent();
        var updateFunc = function () {
            var currentTime = MjClient.timeBetween +  Date.now();
            if(currentTime < MjClient._redPacketInfo.endTime){
                that.actTime1Bg.visible = true;
                that.actTime2Bg.visible = false;
                var secondTime = (MjClient._redPacketInfo.endTime-currentTime)/1000;
                that.actTime1.setString(that.changeTime(secondTime))
            }else if(currentTime < MjClient._redPacketInfo.expireTime){
                that.actTime1Bg.visible = false;
                that.actTime2Bg.visible = true;
                var secondTime = (MjClient._redPacketInfo.expireTime -currentTime)/1000;
                that.actTime2.setString(""+parseInt(secondTime)+"");
            }else{
                that.actTime1Bg.visible = false;
                that.actTime2Bg.visible = true;
                that.actTime2.setString(""+0+"");
            }
        };
        updateFunc();
        this.schedule(updateFunc,0.2);
        return true;
    },
    initView:function () {
        this._block.visible = false;
        this.Panel_Hongbao.visible = false;
        this.btn_linghaobong.visible = false;
        this.lingqu_success.visible = false;

        this.act_info.visible = false;
        this.Panel_Activity.visible = true;
    },
    showActInfo:function () {
        //活动信息，不可领取显示
        var that = this;
        if(!this.act_info.standScale){
            this.act_info.standScale = this.act_info.getScale();
        }
        this.act_info.stopAllActions();
        this.act_info.setScale(this.act_info.standScale);
        this.act_info.visible = true;

        this.act_info_jushu.setString(this.currentRedPacketInfo.complete+"/"+this.currentRedPacketInfo.need);
        var minTime = (this.currentRedPacketInfo.endTime-this.currentRedPacketInfo.startTime)/1000/60;
        this.act_info_tip.setString("每轮（"+minTime+"分钟）时间内\n完成"+MjClient._redPacketInfo.round+"局即可领取红包");

        this.act_info_loading_bar.setPercent(Number(this.currentRedPacketInfo.complete/this.currentRedPacketInfo.need)* 100);
        this.act_info.runAction(cc.sequence(cc.delayTime(5),cc.scaleTo(0.3,0),cc.callFunc(function () {
            that.act_info.visible = false;
        })));
    },

    showQiangHongbao:function () {
        //抢红包ui
        this.Panel_Hongbao.visible = true;
        this._block.visible = true;
        this.lingqu_success.visible = false;
        this.btn_linghaobong.visible = true;
        this.btn_linghaobong.stopAllActions();
        this.btn_linghaobong.setRotation(-2);
        this.btn_linghaobong.runAction(cc.repeatForever(cc.sequence(cc.rotateTo(0.1, 2), cc.rotateTo(0.1, -2))));
    },
    showQiangHongbaoSuccess:function () {
        //抢红包成功ui
        this.btn_linghaobong.stopAllActions();
        this.Panel_Hongbao.visible = true;
        this._block.visible = true;
        this.btn_linghaobong.setRotation(0);
        this.btn_linghaobong.visible = false;
        this.lingqu_success.visible = true;
        this.hongbao_money.setString(this.hongbaoInfo.amount+"元");
        this.hongbao_light.setRotation(0);
        this.hongbao_light.runAction(cc.repeatForever(cc.sequence(cc.rotateBy(1.5, 90))));
    },
    setViewEvent:function () {
        var that = this;
        this._block.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    that.initView();
                    break;
                default :
                    break;
            }
        },this);

        this.btn_hongbao.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    that.goldfieldRedPacketInfo();
                    break;
                default :
                    break;
            }
        },this);

        this.btn_linghaobong.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    that.goldfieldRedPacketRecv();
                    break;
                default :
                    break;
            }
        },this);
    },
    changeTime:function (second_time) {
        var time = "00:"+(second_time < 10 ? ("0"+parseInt(second_time)):(""+parseInt(second_time)));
        if( parseInt(second_time)> 60){
            var second = parseInt(second_time) % 60;
            var min = parseInt(second_time / 60);
            time = (min <10 ?("0"+min):(min)) + ":" + (second < 10 ?("0"+second):(second))+ "";
            if( min > 60 ){
                min = parseInt(second_time / 60) % 60;
                var hour = parseInt( parseInt(second_time / 60) /60 );
                time = (hour <10 ? ("0"+hour) :(hour)) + ":" + (min <10 ?("0"+min):(min)) + ":" + (second < 10 ?("0"+second):(second))+ "";
                if( hour > 24 ){
                    hour = parseInt( parseInt(second_time / 60) /60 ) % 24;
                    var day = parseInt( parseInt( parseInt(second_time / 60) /60 ) / 24 );
                    time = day + "天 " + (hour <10 ? ("0"+hour) :(hour)) + ":" + (min <10 ?("0"+min):(min)) + ":" + (second < 10 ?("0"+second):(second))+ "";
                }
            }
        }
        return time;
    },
    goldfieldRedPacketInfo:function () {
        var that = this;
        MjClient.gamenet.request("pkplayer.handler.goldfieldRedPacketInfo", { fieldId: MjClient._LAST_FIELD.fieldId }, function(rtn) {
            if(!cc.sys.isObjectValid(that)){
                return;
            }
            if (rtn.code == 0) {
                that.currentRedPacketInfo = rtn.data;
                if(rtn.data.status == 0){//不可领取,弹出信息
                    that.showActInfo();
                }else if(rtn.data.status == 1){//可以领取,弹出抢红包
                    that.showQiangHongbao();
                }else if(rtn.data.status == 2){//已经领取
                    MjClient.showToast("您已经领取过");
                }
            }else{
                if(rtn.message){
                    MjClient.showToast(rtn.message);
                }
            }
        });
    },
    goldfieldRedPacketRecv:function () {
        var that = this;
        MjClient.gamenet.request("pkplayer.handler.goldfieldRedPacketRecv", { fieldId: MjClient._LAST_FIELD.fieldId }, function(rtn) {
            if(!cc.sys.isObjectValid(that)){
                return;
            }
            if (rtn.code == 0) {
                that.hongbaoInfo = rtn.data;
                that.showQiangHongbaoSuccess();
            }else{
                that.initView();
                if(rtn.message){
                    MjClient.showToast(rtn.message);
                }
            }
        });
    },
    onExit:function () {
        this._super();
        this.unscheduleAllCallbacks();
    }

});
