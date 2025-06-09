/**
 * Created by WuXiaoDong on 2017/8/24.
 */

var playgroundLayer = cc.Layer.extend({
    _gameList:null,
    _gameListData:null,
    _playGroundList:null,
    _playListData:null,
    _sortPlaygroudData:null,
    _matchInfoData:null,
    _rootUI:null,
    _gameType:null,
    _imgMoreGame:null,
    _imgDi:null,
    _imgDetail:null,
    _nodeRight:null,
    ctor:function () {
        this._super();
        var UI = ccs.load("playgroundLayer.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        MjClient.playgroundui = this;
        var self = this;

        //每次获取新数据
        this.getPlayListData();

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var imgTop = UI.node.getChildByName("Image_1");
        setWgtLayout(imgTop,[1, 1], [0.5, 1], [0, 0]);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.95, 1], [0.5, 0.5], [0, -0.08]);

        //关闭按钮
        var _close = imgTop.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
                if (this._closeCallback)
                {
                    this._closeCallback();
                }
                MjClient.gamenet.request("pkplayer.handler.lobbyLeave",{name:"match"},function(rtn){
                    //cc.log("wxd pkplayer.handler.lobbyLeave:"+JSON.stringify(rtn))
                    if(rtn.code == -1) {
                        MjClient.showToast(rtn.message);
                    }else if(rtn.code == 0){}
                });
            }
        }, this);

        //比赛记录按钮
        var btnRecord = imgTop.getChildByName("btn_record");
        btnRecord.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                //MjClient.showToast("比赛记录,即将开放,敬请期待");
                MjClient.Scene.addChild(new gameRecordLayer());
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Bisaichang_Jilu", {uid:SelfUid()});
            }
        }, this);

        //跑马灯
        var _msg = _back.getChildByName("Node_laba").getChildByName("scroll").getChildByName("msg");
        var msgArr = [];
        UIEventBind(null,this,"matchWinnerBroadcast",function(data){
            msgArr = data.winnerBroadcast;
        });
        playPageRunText(_msg);
        function playPageRunText(node) {
            var length = node.getString().length * node.getFontSize() + 695;
            node.width = length;
            node.x = 695;
            var startPosX = node.x;

            var i = 0;
            var callback1 = function () {
                if(msgArr.length > 0){
                    node.setString(unescape(msgArr[(i%msgArr.length)]));
                }else {
                    node.setString("");
                }
                i++;
            };

            var callback2 = function() {
                node.x = startPosX;
            };

            console.log("=====doomsky say:length======", length);
            node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(callback1),cc.moveBy(length/200.0,cc.p(-length,0)),cc.callFunc(callback2))));
        }


        //右上玩法按钮列表
        this._gameList = imgTop.getChildByName("gameList");
        this._gameList.setScrollBarEnabled(false);

        this.initPlayerInfo();

        cc.log("wxd........_playListData:"+JSON.stringify(this._playListData));

        UIEventBind(null,this,"WX_SHARE_SUCCESS",function(data){
            if(MjClient.wxShareImageToPYQ == true || cc.sys.os == cc.sys.OS_WINDOWS){
                MjClient.wxShareImageToPYQ = false;
                if(parseInt(data.errCode) == 0){
                    self.matchShare();
                }
            }
        });

        UIEventBind(null, this, "match_cancel",function(data) {
            // if(data.matchId == self._gameType){
            //     MjClient.showToast("比赛已取消，解散并退还费用");
            //     self.getPlayListData();
            // }
            if(data.haveMoney && data.title){
                MjClient.showMsg("您报名的"+data.title+"因故取消，已返还报名费用", function(){},"1");
            }
        });

        this._imgMoreGame = ccui.helper.seekWidgetByName(this._rootUI, "Image_4");
        this._imgDi = ccui.helper.seekWidgetByName(this._rootUI, "Image_Di");
        this._imgDetail = ccui.helper.seekWidgetByName(this._rootUI, "Image_Detail");
        this._nodeRight = _back.getChildByName("Node_Right");
        return true;
    },

    initPlay:function () {
        var self = this;

        //初始化玩法列表
        //var keys1 = Object.keys(this._sortPlaygroudData);
        var isMatchid = false;
        if(this._gameType){
            this._playListData.forEach(function(e){
                if(e.matchId == self._gameType){
                    isMatchid = true;
                }
            });
        }
        if(!isMatchid && this._playListData.length> 0){
            this._gameType = this._playListData[0].matchId;
        }

        // if(!this._gameType || keys1.indexOf(this._gameType) == -1){
        //     this._gameType = keys1[0];
        // }
        this.initGameList();

        //获取比赛详情数据
        this.getPlayDetailData();
    },

    initPlayerInfo:function(){
        var textID = ccui.helper.seekWidgetByName(this._rootUI, "Text_id");
        textID.setString(SelfUid());
        var textYuanbao = ccui.helper.seekWidgetByName(this._rootUI, "Text_yuanbao");
        textYuanbao.setString(MjClient.data.pinfo.money);
        UIEventBind(this.jsBind,textYuanbao,"updateInfo",function() {

            var icurrentMoney = parseInt(textYuanbao.getString());
            var lastMoney = parseInt(MjClient.data.pinfo.money);
            if(lastMoney > icurrentMoney)
            {
                //成功后，加粒子效果
                var starParticle =  new cc.ParticleSystem("Particle/diamondtail.plist");
                starParticle.setPosition(textYuanbao.getContentSize().width/2, textYuanbao.getContentSize().height/2);
                textYuanbao.addChild(starParticle);
                textYuanbao.runAction(cc.sequence(cc.scaleTo(1,1.5).easing(cc.easeBackOut()),cc.scaleTo(0.3,1)));
            }
            textYuanbao.setString(MjClient.data.pinfo.money);
        });
        UIEventBind(this.jsBind,textYuanbao,"loginOK",function() {
            textYuanbao.setString(MjClient.data.pinfo.money);
        });
    },

    initGameList:function(){
        this._gameList.removeAllChildren();

        var gameItem = ccui.helper.seekWidgetByName(this._rootUI, "item_btn");

        //根据类型设置item tag
        for(var i=0; i<this._playListData.length; i++){
            var index = this._playListData[i].matchId;

            var newitem = gameItem.clone();
            //this.loadItemTexture(newitem,index);
            newitem.getTitleRenderer().setString(this._playListData[i].title);
            newitem.setTag(index);
            if(index == this._gameType){
                newitem.bright = false;
                newitem.setTitleColor(cc.color("#FFFFFF"));
            }else {
                newitem.setTitleColor(cc.color("#A83419"));
            }
            newitem.addClickEventListener(function (target) {
                this._gameType = target.getTag();
                cc.log("wxd.................type:"+this._gameType);

                var gameList = target.getParent();
                for (var i = 0; i < this._playListData.length; i++)
                {
                    var index = this._playListData[i].matchId;
                    var item = gameList.getChildByTag(index);

                    if (index == this._gameType)
                    {
                        cc.log("current touched idx == " + index);
                        item.touchEnabled = false;
                        item.bright = false;
                        item.setTitleColor(cc.color("#FFFFFF"));
                    }
                    else
                    {
                        item.touchEnabled = true;
                        item.bright = true;
                        item.setTitleColor(cc.color("#A83419"));
                    }
                }

                this.getPlayDetailData();
            }.bind(this));
            this._gameList.pushBackCustomItem(newitem);
            cc.log(" set tag item ------------");
        }
    },

    initPlayDetail:function () {
        var self = this;

        this._imgMoreGame.setVisible(false);

        this._imgDi.setVisible(false);
        var  img = this._imgDi.getChildByName("Image_3");

        this._imgDetail.setVisible(false);

        var headSprite1 = this._imgDi.getChildByName("headSprite");
        if(headSprite1){
            headSprite1.removeFromParent(true);
        }
        var url = this._matchInfoData.icon;
        cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
        {
            if(!err&&texture)
            {
                var headSprite = new cc.Sprite(texture);
                headSprite.setName("headSprite");
                headSprite.setPosition(img.getPosition());
                headSprite.setScaleX(img.width/headSprite.getContentSize().width);
                headSprite.setScaleY(img.height/headSprite.getContentSize().height);
                self._imgDi.setVisible(true);
                self._imgDi.addChild(headSprite);
            }
        });

        var btnClose = this._imgDetail.getChildByName("Button_1");
        btnClose.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self._imgDetail.setVisible(false);
            }
        }, this);
        var textDetail = this._imgDetail.getChildByName("ScrollView_1").getChildByName("Text_1");
        var str = "【比赛规则】\n";
        str += this._matchInfoData.content+"\n\n";
        str += "【比赛奖品】";

        var desArr = [];
        for(var k = 0; k<this._matchInfoData.awards.length; k++){
            if(desArr.indexOf(this._matchInfoData.awards[k].desc) == -1){
                desArr.push(this._matchInfoData.awards[k].desc)
            }
        }
        for(var i = 0; i<desArr.length; i++){
            var levelArr = [];
            var des = desArr[i];
            for(var j = 0; j<this._matchInfoData.awards.length; j++){
                if(des == this._matchInfoData.awards[j].desc){
                    levelArr.push(j);
                }
            }
            if(levelArr.length>0 && levelArr.length <= 1){
                str += "\n第" + (levelArr[0] + 1) + "名：" + des;
            }else if(levelArr.length > 1){
                str += "\n第" + (levelArr[0] + 1)+"-"+(levelArr[levelArr.length-1] + 1) + "名：" + des;
            }
        }

        str += "\n\n【比赛轮次】";
        for(var i = 1; i< this._matchInfoData.roundCfg.length; i++){
            str += "\n第"+i+"轮："+this._matchInfoData.roundCfg[i-1].round+"局 积分排名前"+this._matchInfoData.roundCfg[i].count+"名晋级";
        }
        str += "";
        textDetail.setString(str);
        textDetail.setTextAreaSize(cc.size(660, 0));
        textDetail.ignoreContentAdaptWithSize(true);
        this._imgDetail.getChildByName("ScrollView_1").setInnerContainerSize(cc.size(textDetail.width, textDetail.height));
        textDetail.setPosition(cc.p(330, this._imgDetail.getChildByName("ScrollView_1").getInnerContainerSize().height));

        var textTitle = this._nodeRight.getChildByName("Text_Title");
        textTitle.ignoreContentAdaptWithSize(true);
        textTitle.setString(this._matchInfoData.title);
        textTitle.setVisible(true);
        var textTime = this._nodeRight.getChildByName("Text_Time");
        textTime.ignoreContentAdaptWithSize(true);
        textTime.setString("比赛时间：" + MjClient.dateFormat(new Date(this._matchInfoData.startTime), "MM月dd日 hh:mm"));
        textTime.setVisible(true);
        var textReward = this._nodeRight.getChildByName("Text_Reward");
        textReward.ignoreContentAdaptWithSize(true);
        textReward.setString("比赛奖励：" + "第"+1+"名 "+this._matchInfoData.awards[0].desc);
        textReward.setVisible(true);

        var btnDetail = this._nodeRight.getChildByName("Button_Detail");
        btnDetail.setVisible(true);
        btnDetail.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self._imgDetail.setVisible(true);
            }
        }, this);


        var btnApply = this._nodeRight.getChildByName("Button_Apply");
        var shareImage = this._matchInfoData.shareImage;
        if(shareImage&& shareImage.length>0)
        {
            var nameArr = shareImage.split("/");
            var nameStr = nameArr[nameArr.length - 1];
            var filePath = jsb.fileUtils.getWritablePath() + nameStr;
            if (jsb.fileUtils.isFileExist(filePath))
            {
                btnApply.setUserData(filePath);
            }
            else
            {
                MjClient.urlImageDown(shareImage, nameStr,function (sprite, savepath)
                {
                    btnApply.setUserData(savepath);
                },function ()
                {
                    cc.log("download failed:"+shareImage);
                });
            }
        }


        btnApply.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                if(!this._matchInfoData.applyTime){//报名
                    var isCanApple = true;
                    for(var i = 0; i<this._matchInfoData.conditions.length; i++){
                        if(!this._matchInfoData.conditions[i].finish){
                            isCanApple = false;
                            var str3 = "";
                            switch (parseInt(this._matchInfoData.conditions[i].key))
                            {
                                case 1001:
                                    str3 += "没有分享比赛,是否去分享比赛？";
                                    MjClient.showMsg(str3, function(){
                                        if(cc.sys.os == cc.sys.OS_WINDOWS){
                                            postEvent("WX_SHARE_SUCCESS",{errCode:0})
                                        }
                                        if(sender.getUserData()){
                                            MjClient.native.wxShareImageToPYQ(sender.getUserData());
                                        }else {
                                            MjClient.showToast("比赛分享图下载失败，请稍候重试");
                                        }
                                    },function () {} ,"1");
                                    break;
                                case 1002:
                                    str3 += "元宝数量不够";
                                    MjClient.showMsg(str3, function(){}, "1");
                                    break;
                                case 1003:
                                    str3 += "不是新玩家";
                                    MjClient.showMsg(str3, function(){}, "1");
                                    break;
                                case 1004:
                                    str3 += "不是老玩家";
                                    MjClient.showMsg(str3, function(){}, "1");
                                    break;
                                case 1005:
                                    str3 += "东方红禾嘉股份";
                                    break;
                                default:
                                    str3 += "";
                                    break;
                            }
                            break;
                        }
                    }
                    //cc.log("wxd..........btnApplybtnApplybtnApply........"+isCanApple)
                    if(isCanApple){
                        self.gameApply();
                    }
                }else {//进入等待界面
                    if(this._matchInfoData.serverTime <= this._matchInfoData.readyTime){//显示你已报名
                        self.matchQuit();
                    }else if(this._matchInfoData.serverTime > this._matchInfoData.readyTime && this._matchInfoData.serverTime < this._matchInfoData.startTime){//显示进入比赛
                        self.matchEnter();
                    }else {//比赛已开始

                    }
                }
            }
        }, this);
        var textCondition = this._nodeRight.getChildByName("Text_Condition");
        var textStartTime = this._nodeRight.getChildByName("Text_Start_Time");
        var textApplied = this._nodeRight.getChildByName("Text_Applied");
        textApplied.ignoreContentAdaptWithSize(true);
        textApplied.setVisible(true);
        textApplied.setString(this._matchInfoData.applyCount + "人已报名")
        if(!this._matchInfoData.applyTime){//还没有报名
            btnApply.setVisible(true);
            btnApply.loadTextureNormal("playground/baoming_1.png");
            textCondition.setVisible(true);
            textStartTime.setVisible(false);
            for(var i = 0; i<3; i++){
                var conditionNode = textCondition.getChildByName("condition_"+i);
                if(this._matchInfoData.conditions[i]){//条件有没有
                    conditionNode.setVisible(true);
                    var str1 = "";
                    switch (parseInt(this._matchInfoData.conditions[i].key))
                    {
                        case 1001:
                            str1 += "分享"+this._matchInfoData.conditions[i].value+"次比赛";
                            break;
                        case 1002:
                            str1 += "消耗"+this._matchInfoData.conditions[i].value+"个元宝";
                            break;
                        case 1003:
                            str1 += "新玩家";
                            break;
                        case 1004:
                            str1 += "老玩家";
                            break;
                        case 1005:
                            str1 += "东方红禾嘉股份";
                            break;
                        default:
                            str1 += "";
                            break;
                    }
                    //cc.log("wxd............str1......."+str1);
                    conditionNode.getChildByName("Text_Con").setString(str1);
                    conditionNode.getChildByName("Text_Con").ignoreContentAdaptWithSize(true);
                    if(this._matchInfoData.conditions[i].finish){//条件完成没有
                        conditionNode.getChildByName("Image_gou").setVisible(true);
                    }else {
                        conditionNode.getChildByName("Image_gou").setVisible(false);
                    }
                }else {
                    conditionNode.setVisible(false);
                }
            }
        }else {//报名了
            textCondition.setVisible(false);
            textStartTime.setVisible(true);
            var timeText = textStartTime.getChildByName("Text_Time");
            timeText.ignoreContentAdaptWithSize(true);
            var leftTime = (this._matchInfoData.startTime - this._matchInfoData.serverTime)/1000;//比赛开始剩余时间（秒）
            var str1 = "";
            if(leftTime>0) {
                if(parseInt(leftTime / 86400) != 0){
                    str1 += parseInt(leftTime / 86400) + "天";
                }
                if(parseInt(leftTime / 86400) != 0 || parseInt((leftTime % 86400) / 3600) != 0) {
                    str1 += parseInt((leftTime % 86400) / 3600) + "小时";
                }
                if(parseInt(leftTime / 86400) != 0 || parseInt((leftTime % 86400) / 3600) != 0 || parseInt(((leftTime % 86400) % 3600) / 60) != 0){
                    str1 += parseInt(((leftTime % 86400) % 3600) / 60) + "分";
                }
                str1 += parseInt(((leftTime % 86400) % 3600) % 60) + "秒";
                timeText.setString(str1);
                timeText.unscheduleAllCallbacks();
                timeText.schedule(function () {
                    var str2 = "";
                    if(parseInt(leftTime / 86400) != 0) {
                        str2 += parseInt(leftTime / 86400) + "天";
                    }
                    if(parseInt(leftTime / 86400) != 0 || parseInt((leftTime % 86400) / 3600) != 0) {
                        str2 += parseInt((leftTime % 86400) / 3600) + "小时";
                    }
                    if(parseInt(leftTime / 86400) != 0 || parseInt((leftTime % 86400) / 3600) != 0 || parseInt(((leftTime % 86400) % 3600) / 60) != 0) {
                        str2 += parseInt(((leftTime % 86400) % 3600) / 60) + "分";
                    }
                    str2 += parseInt(((leftTime % 86400) % 3600) % 60) + "秒";
                    timeText.setString(str2);
                    if (leftTime > 0) {
                        leftTime--;
                    }
                }, 1, cc.REPEAT_FOREVER, 0);
            }else {
                timeText.setString("0秒");
            }

            if(this._matchInfoData.serverTime <= this._matchInfoData.readyTime){//显示你已报名
                btnApply.setVisible(true);
                btnApply.loadTextureNormal("playground/quxiaobaoming.png");
            }else if(this._matchInfoData.serverTime > this._matchInfoData.readyTime && this._matchInfoData.serverTime < this._matchInfoData.startTime){//显示进入比赛
                btnApply.setVisible(true);
                btnApply.loadTextureNormal("playground/jion.png");
            }else {//比赛已开始

            }
        }
    },

    initPlayDetailNoSee:function () {
        this._imgMoreGame.setVisible(true);
        this._imgDi.setVisible(false);
        this._imgDetail.setVisible(false);
        var textTitle = this._nodeRight.getChildByName("Text_Title");
        textTitle.setVisible(false);
        var textTime = this._nodeRight.getChildByName("Text_Time");
        textTime.setVisible(false);
        var textReward = this._nodeRight.getChildByName("Text_Reward");
        textReward.setVisible(false);
        var btnDetail = this._nodeRight.getChildByName("Button_Detail");
        btnDetail.setVisible(false);
        var btnApply = this._nodeRight.getChildByName("Button_Apply");
        btnApply.setVisible(false);
        var textCondition = this._nodeRight.getChildByName("Text_Condition");
        textCondition.setVisible(false);
        var textStartTime = this._nodeRight.getChildByName("Text_Start_Time");
        textStartTime.setVisible(false);
        var textApplied = this._nodeRight.getChildByName("Text_Applied");
        textApplied.setVisible(false);
    },

    loadItemTexture:function(item, index)
    {
        var textureNormal,texturePress;
        var preStr = pkGameButton[index];
        textureNormal = preStr + "_normal.png";
        texturePress = preStr + "_press.png";
        item.loadTextures(textureNormal,textureNormal,texturePress);
    },

    getPlayListData:function(){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.lobbyEnter",{name:"match"},function(rtn){
            //cc.log("wxd pkplayer.handler.lobbyEnter:"+JSON.stringify(rtn))
            MjClient.unblock();
            if(rtn.code == -1)
            {
                MjClient.showToast(rtn.message);
            }else if(rtn.code == 0){
                self._playListData=rtn.data;
                self.initPlay();
                if(self._playListData.length == 0){
                    //MjClient.showToast("没有比赛");
                    self.initPlayDetailNoSee();
                }
            }
        });
    },

    getPlayDetailData:function () {
        var self = this;
        if(self._playListData.length > 0){
            MjClient.gamenet.request("pkplayer.handler.matchInfo",{matchId:self._gameType},function(rtn){
                //cc.log("wxd pkplayer.handler.matchInfo:"+JSON.stringify(rtn))
                if(rtn.code == -1)
                {
                    self.initPlayDetailNoSee();
                    //MjClient.showToast(rtn.message);
                }else if(rtn.code == 0){
                    self._matchInfoData=rtn.data;
                    self.initPlayDetail();
                }
            });
        }
    },

    gameApply:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.matchApply",{matchId:self._gameType},function(rtn){
            //cc.log("wxd pkplayer.handler.matchApply:"+JSON.stringify(rtn))
            MjClient.unblock();
            if(rtn.code == -1)
            {
                //MjClient.showToast(rtn.message);
            }else if(rtn.code == 0){
                //self._matchInfoData=rtn.data;
                MjClient.showToast("比赛报名成功");
                //self.getPlayListData();
                self.getPlayDetailData();
            }else if(rtn.code == 404){
                MjClient.showToast(rtn.message);
                //self.getPlayListData();
            }
        });
    },

    matchEnter:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.matchEnter",{matchId:self._gameType},function(rtn){
            //cc.log("wxd pkplayer.handler.matchEnter:"+JSON.stringify(rtn))
            MjClient.unblock();
            if(rtn.code == -1)
            {
                MjClient.showToast(rtn.message);
            }else if(rtn.code == 0){
                //self._matchInfoData=rtn.data;
                MjClient.Scene.addChild(new gameWaiteLayer(rtn.data));
            }else if(rtn.code == 404){
                MjClient.showToast(rtn.message);
                //self.getPlayListData();
            }
        });
    },

    matchShare:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.matchShare",{matchId:self._gameType},function(rtn){
            //cc.log("wxd pkplayer.handler.matchShare:"+JSON.stringify(rtn))
            MjClient.unblock();
            if(rtn.code == -1)
            {
                MjClient.showToast(rtn.message);
            }else if(rtn.code == 0){
                //self._matchInfoData=rtn.data;
                MjClient.showToast("分享成功，可以去报名比赛了");
                //self.getPlayListData();
                self.getPlayDetailData();
            }
        });
    },

    matchQuit:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.matchQuit",{matchId:self._gameType},function(rtn){
            //cc.log("wxd pkplayer.handler.matchQuit:"+JSON.stringify(rtn))
            MjClient.unblock();
            if(rtn.code == -1)
            {
                MjClient.showToast(rtn.message);
            }else if(rtn.code == 0){
                MjClient.showMsg(rtn.message, function(){},"1");
                self.getPlayDetailData();
            }
        });
    }
    // onEnter:function()
    // {
    //     this._super();
    //     cc.log("wxd...........onEnter");
    //     this.getPlayListData();
    // }
});

