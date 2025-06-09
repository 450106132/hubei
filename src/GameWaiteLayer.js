/**
 * Created by WuXiaoDong on 2017/8/31.
 */

var gameWaiteLayer = cc.Layer.extend({
    _data:null,
    _back:null,
    ctor: function (data) {
        this._super();
        var UI = ccs.load("gameWaiteLayer.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        MjClient.gemewaitingui=this;
        var self = this;
        
        this._data = data;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0], [0, 0]);

        var _block0 = UI.node.getChildByName("block_0");
        setWgtLayout(_block0, [1, 1], [0.5, 0.5], [0, 0], true);
        _block0.setVisible(false);

        var _back0 = UI.node.getChildByName("back_0");
        setWgtLayout(_back0, [0.5, 0.5], [0.5, 0.5], [0, 0]);
        _back0.setVisible(false);

        //关闭按钮
        var btnSure = _back0.getChildByName("btn_sure");
        var text29 = _back0.getChildByName("Text_29");
        text29.ignoreContentAdaptWithSize(true);

        //退出等待按钮
        var doorClose = this._back.getChildByName("close");
        doorClose.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                btnSure.type = 0;
                text29.setString("是否离开比赛？");
                _block0.setVisible(true);
                _back0.setVisible(true);
            }
        }, this);

        //取消报名按钮
        var btnQuite = this._back.getChildByName("btn_quite");
        btnQuite.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                btnSure.type = 1;
                text29.setString("是否取消报名？");
                _block0.setVisible(true);
                _back0.setVisible(true);
            }
        }, this);

        btnSure.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if(sender.type == 0){
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.matchLeave",{matchId:this._data.info.id},function(rtn){
                        MjClient.unblock();
                        if(rtn.code == -1)
                        {
                            MjClient.showToast(rtn.message);
                        }else if(rtn.code == 0){
                            //退赛成功
                            //cc.log("wxd..........离开比赛成功"+JSON.stringify(rtn));
                            self.removeFromParent();
                            delete MjClient.gemewaitingui;
                            if(cc.sys.isObjectValid(MjClient.playgroundui)){
                                MjClient.playgroundui.getPlayDetailData();
                            }
                        }
                    })
                }else if(sender.type == 1){
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.matchQuit",{matchId:this._data.info.id},function(rtn){
                        MjClient.unblock();
                        if(rtn.code == -1)
                        {
                            MjClient.showToast(rtn.message);
                        }else if(rtn.code == 0){
                            MjClient.showToast(rtn.message);
                            self.removeFromParent();
                            delete MjClient.gemewaitingui;
                            if(cc.sys.isObjectValid(MjClient.playgroundui)){
                                MjClient.playgroundui.getPlayDetailData();
                            }
                        }
                    });
                }
            }
        }, this);

        //分享按钮
        var btnShare = this._back.getChildByName("btn_share");
        var shareImage = this._data.info.shareImage;
        if(shareImage&& shareImage.length>0)
        {
            var nameArr = shareImage.split("/");
            var nameStr = nameArr[nameArr.length - 1];
            var filePath = jsb.fileUtils.getWritablePath() + nameStr;
            if (jsb.fileUtils.isFileExist(filePath))
            {
                btnShare.setUserData(filePath);
            }
            else
            {
                MjClient.urlImageDown(shareImage, nameStr,function (sprite, savepath)
                {
                    btnShare.setUserData(savepath);
                },function ()
                {
                    cc.log("download failed:"+shareImage);
                });
            }
        }
        btnShare.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if(sender.getUserData()){
                    MjClient.native.wxShareImageToPYQ(sender.getUserData());
                }else {
                    MjClient.showToast("比赛分享图下载失败，请稍候重试");
                }
            }
        }, this);

        UIEventBind(null,this,"WX_SHARE_SUCCESS",function(data){
            if(MjClient.wxShareImageToPYQ == true) {
                MjClient.wxShareImageToPYQ = false;
                if(parseInt(data.errCode) == 0){
                    //MjClient.showToast("   分享成功   ");
                }
            }
        });

        UIEventBind(null, this, "match_cancel",function(data) {
            if(data.matchId == this._data.info.id){
                //MjClient.showToast("比赛已取消，解散并退还费用");
                self.removeFromParent();
                if(cc.sys.isObjectValid(MjClient.playgroundui)){
                    //MjClient.playgroundui.getPlayListData();
                    MjClient.playgroundui.getPlayDetailData();
                }
            }
            // if(data.haveMoney && data.title){
            //     MjClient.showMsg("您报名的"+data.title+"因故取消，已返还报名费用", function(){},"1");
            // }
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
        //this.playAni();
        return true;
    },

    initUI:function () {
        var self = this;

        //cc.log("wxd..........................._data:"+JSON.stringify(this._data));
        if(!this._data){
            return;
        }

        var textTitle = this._back.getChildByName("Text_title");
        textTitle.ignoreContentAdaptWithSize(true);
        if(this._data.info.title){
            textTitle.setString(this._data.info.title);
        }else {
            textTitle.setString("比赛");
        }

        var timeText = this._back.getChildByName("Text_Time");
        timeText.ignoreContentAdaptWithSize(true);
        var leftTime = (this._data.info.startTime - this._data.serverTime)/1000;//比赛开始剩余时间（秒）
        var str1 = "";
        if(leftTime>0) {
            str1 += parseInt(leftTime / 60) + "分";
            str1 += parseInt(((leftTime % 86400) % 3600) % 60) + "秒";
            timeText.setString(str1);
            timeText.unscheduleAllCallbacks();
            timeText.schedule(function () {
                var str2 = "";
                str2 += parseInt(leftTime / 60) + "分";
                str2 += parseInt(((leftTime % 86400) % 3600) % 60) + "秒";
                timeText.setString(str2);
                if (leftTime > 0) {
                    leftTime--;
                }
            }, 1, cc.REPEAT_FOREVER, 0);
        }else {
            timeText.setString("0分0秒");
            MjClient.gamenet.request("pkplayer.handler.queryMatchState",{matchId:self._data.info.id},function(rtn){
                //cc.log("wxd pkplayer.handler.queryMatchState:"+JSON.stringify(rtn))
                MjClient.unblock();
                if(rtn.code == -1)
                {
                    MjClient.showToast(rtn.message);
                }else if(rtn.code == 0){
                    if(rtn.data.state == 1 && rtn.data.tableid){
                        MjClient.Scene.addChild(new gameWaiteLayer(rtn.data));
                        MjClient.joinGame(rtn.data.tableid);
                    }
                }
            });
        }

        //准备人数
        var textPnum = this._back.getChildByName("Text_Pnum");
        textPnum.ignoreContentAdaptWithSize(true);
        textPnum.setString(this._data.userCount);

        UIEventBind(null,this,"match_refresh_info",function(data){
            textPnum.setString(data.userCount);
        })

        var textRewards = this._back.getChildByName("Text_Rewards");
        var strRewars = "";
        for(var i = 0; i<this._data.info.awards.length; i++){
            strRewars += "第"+(i+1)+"名："+this._data.info.awards[i].desc+"\n";
        }
        textRewards.setString(strRewars);

        var textRule = this._back.getChildByName("Text_Rule");
        var strRule = "";
        for(var i = 1; i<this._data.info.roundCfg.length; i++){
            strRule += "第"+i+"轮："+this._data.info.roundCfg[i-1].round+"局 积分排名前"+this._data.info.roundCfg[i].count+"名晋级\n";
        }
        textRule.setString(strRule);
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
    },
});