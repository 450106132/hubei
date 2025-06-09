/**
 * Created by WuXiaoDong on 2017/8/25.
 */

var gameRecordLayer = cc.Layer.extend({
    _gameDesData:null,
    _recordList:null,
    ctor:function () {
        this._super();
        var UI = ccs.load("gameRecordLayer.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;

        //每次获取新数据
        this.getGameDesData();

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.95, 1], [0.5, 0.5], [0, -0.08]);

        //关闭按钮
        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
                if (this._closeCallback)
                {
                    this._closeCallback();
                }
            }
        }, this);

        //领取红包方法
        var btnWay = _back.getChildByName("btn_way");
        btnWay.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                MjClient.Scene.addChild(new getRewardLayer());
            }
        }, this);
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ){
            btnWay.setVisible(false);
        }

        this._recordList = _back.getChildByName("playList");

        this.initPlayerInfo();
        //this.initRecordList();
        return true;
    },

    initPlayerInfo:function(){
        var textID = ccui.helper.seekWidgetByName(this._rootUI, "Text_id");
        textID.setString(SelfUid());
        var textYuanbao = ccui.helper.seekWidgetByName(this._rootUI, "Text_yuanbao");
        textYuanbao.width = 100;
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

    initRecordList:function(){
        if(!this._gameDesData){
            return;
        }

        this._recordList.removeAllChildren();
        var itemPlay = ccui.helper.seekWidgetByName(this._rootUI, "item_play");

        cc.log("wxd............gameDesData:"+JSON.stringify(this._gameDesData));

        var list = this._gameDesData.data;

        for(var i=0 ; i<list.length ; i++){
            var newitem = itemPlay.clone();
            this.initItem(newitem, list[i]);
            this._recordList.pushBackCustomItem(newitem);
        }
    },

    initItem:function (item, data) {
        var self = this;

        var textTime = item.getChildByName("Text_time");
        var textDetail = item.getChildByName("Text_detail");
        var btnReceive = item.getChildByName("btn_receive");
        var btnReceived = item.getChildByName("btn_received");
        btnReceive.setVisible(false);
        btnReceived.setVisible(false);

        var _timeStr = "";
        if(data.matchStatus == 2){
            _timeStr = "比赛未结束";
        }else {
            _timeStr = MjClient.dateFormat(new Date(parseInt(data.endTime)), 'yyyy-MM-dd hh:mm:ss');
        }
        textTime.setString(_timeStr);

        var strRank = "";
        if(data.rank){
            strRank = "】，荣获第" + data.rank + "名"
        }else {
            strRank = "】，未获得名次"
        }
        if(data.awardDesc){
            textDetail.setString("您在【" + data.title + strRank + "，获得" + data.awardDesc + "，请您领取奖励。");
            switch (data.awardStatus){
                case -1001:     //审核不通过
                    btnReceived.setVisible(true);
                    btnReceived.loadTextureNormal("gameRecord/butongguo.png");
                    break;
                case 0:      //待领取
                    btnReceive.setVisible(true);
                    break;
                case 1002:      //待审核
                    btnReceived.setVisible(true);
                    btnReceived.loadTextureNormal("gameRecord/daishenhe.png");
                    break;
                case 1003:      //待发货
                    btnReceived.setVisible(true);
                    btnReceived.loadTextureNormal("gameRecord/daifahuo.png");
                    break;
                case 1004:      //处理中
                    btnReceived.setVisible(true);
                    btnReceived.loadTextureNormal("gameRecord/chulizhong.png");
                    break;
                default:        //已领取
                    btnReceived.setVisible(true);
                    btnReceived.loadTextureNormal("gameRecord/yilingqu.png");
                    break;
            }
        }else {
            textDetail.setString("您在【" + data.title + strRank + "，很抱歉，未获得奖励！再来一把证明自己吧，加油！");
            if(data.rank == 1 || data.rank == 2 || data.rank == 3){
                textDetail.setString("您在【" + data.title + strRank + "。");
            }
        }

        btnReceive.addTouchEventListener(function (target, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.matchAwardRecv",{id:data.id},function(rtn){
                    MjClient.unblock();
                    if(rtn.code == -1)
                    {
                        MjClient.showToast(rtn.message);

                    }else if(rtn.code == 0){
                        MjClient.showToast(rtn.message);
                        //领取成功
                        cc.log("wxd..........领取成功"+JSON.stringify(rtn));
                        self.getGameDesData();

                        if(rtn.message && rtn.message.length > 0){
                            //MjClient.Scene.addChild(new getRewardLayer(rtn.message));
                            MjClient.showMsg(rtn.message, function () {}, "1");
                        }
                    }
                });
            }
        },this);
    },

    getGameDesData:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.matchRecord",{userId:SelfUid()},function(rtn){
            MjClient.unblock();
            if(rtn.code == -1)
            {
                MjClient.showToast(rtn.message);
            }else if(rtn.code == 0){
                self._gameDesData=rtn;
                self.initRecordList();
            }
        });
    }
});