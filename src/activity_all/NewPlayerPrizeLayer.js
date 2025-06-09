/**
 * @Author:      Lms
 * @Email:       lms_190865480@163.com
 * @QQ:       190865480
 * @DateTime:     2018-03-30 
 * @Description: 新手礼包 
 */

var NewPlayerPrizeLayer = cc.Layer.extend({
    onExit:function()
    {
        this._super();     

    },
	ctor:function(data) {
		this._super();
		var UI = ccs.load("newPlayerPrize_main.json");
		this.addChild(UI.node);
		MjClient.NewPlayerPrize_ui = this;

		this._data = data;
        this._share_pic = false;
        this._closeCallback = null;
		var self = this;

		var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);

        //退出
        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (this._closeCallback) {
                    this._closeCallback();
                }
            	MjClient.NewPlayerPrize_ui = null;
                playEffect("activity/getBoxClick",false);

                self.removeFromParent(); 
            }
        }, this);


        var _btnfuli = this._back.getChildByName("btn_fuli");
        _btnfuli.addTouchEventListener(function(sender, type) {
            switch(type) {
            	case ccui.Widget.TOUCH_ENDED:
                    playEffect("activity/getBoxClick",false);
            		var Layer = new NewPlayerRuleLayer();
                     MjClient.Scene.addChild(Layer);
            		break;
            	default:
                        break;
            }
        }, this);

        this.text_leftdays = this._back.getChildByName("Text_leftdays");

        this.text_todaynum = this._back.getChildByName("Text_todaynum");


        this.node_mid = this._back.getChildByName("node_mid");
        this.text_myNum = this.node_mid.getChildByName("Text_mynumber");
        this._jindutiao = this.node_mid.getChildByName("LoadingBar_1");

        var touchFunc = function(sender, type) {
            var tag = sender.getTag();
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:

                    if (this["imgtishi_"+tag]) {
                        this["imgtishi_"+tag].visible = true;
                    }
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;                
                case ccui.Widget.TOUCH_ENDED:
                    if (!this._data) {
                        return;
                    }
                    playEffect("activity/getBoxClick",false);
                    if (this["imgtishi_"+tag]) {
                        this["imgtishi_"+tag].visible = false;
                    }
                    if (tag == 3) {
                        var Layer = new NewPlayerChanceLayer(this._data.infoList.award[tag].isAward,this._data.images);
                        MjClient.Scene.addChild(Layer);
                    }else{                        
                        if( this._data.activity >= this._data.infoList.award[tag].integral){
                            this.reqGetYB(this._data.infoList.award[tag].key);
                        }

                    }
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    if (this["imgtishi_"+tag]) {
                        this["imgtishi_"+tag].visible = false;
                    }
                    
                    break;
                default:
                    break;
            }
        }.bind(this);

        
        
        
        for (var i = 0; i < 4; i++) {
        	this["prize_"+i] = this.node_mid.getChildByName("btnPrize_" + i);

        	this["imgtishi_"+i] = this.node_mid.getChildByName("tipPrize_" + i);
        	if (this["imgtishi_"+i]) {
        		this["imgtishi_"+i].visible = false;
        	}
            this["imgshine_"+i] = this.node_mid.getChildByName("shinePrize_" + i);
            // this["imgshine_"+i].setZOrder(-1);
            if (this["imgshine_"+i]) {
                var act_s1 = cc.scaleTo(1,1.5);
                var act_s2 = cc.scaleTo(1,0.8);
                var act_s3 = cc.rotateBy(10,360);
                var act_func = function(d) {
                    self["imgshine_" + d].runAction(cc.rotateBy(10,360).repeatForever());
                };
                act_func(i);
                this["imgshine_"+i].setOpacity(0);
            }
        	this["prize_"+i].setTag(i);
        	this["prize_"+i].addTouchEventListener(touchFunc);
        }




        this.listView = this._back.getChildByName("ListView_work");

        this._cell = this._back.getChildByName("cell");
        this._cell.visible = false;
        

        var bg_act = this.node_mid.getChildByName("bg_1");
        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("newPlayerPrize/bg_2.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        bg_act.addChild(clipper);
        var sprite = new cc.Sprite("newPlayerPrize/saoguang.png");
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction);//进行向右移动的重复动作
        this.text_todaynum.setString("");
        this.text_myNum.setString("");    
        this.text_leftdays.setString("");
        if (data) {
            this.refresh_main();
        }else{
            this.reqMainMsg();
        }

        this._shareType = null;
        UIEventBind(null, this.listView, "WX_SHARE_SUCCESS", function(data) {
            if (parseInt(data.errCode) == 0) {
                    if (self._shareType && !MjClient.NewPlayerBack_ui) {
                        this.runAction(cc.sequence(cc.DelayTime(0.3), cc.callFunc(function() {
                            self.reqTodayShare();
                        })));
                    }else if( MjClient.NewPlayerBack_ui ){
                        cc.log(" ==========  NewPlayerBack_ui");
                        this.runAction(cc.sequence(cc.DelayTime(0.3), cc.callFunc(function() {
                            MjClient.NewPlayerBack_ui.removeFromParent();
                            MjClient.NewPlayerBack_ui = null;
                            self.reqShare();
                        })));
                    }
                    
            }
            if (self._shareType != 1) {
                MjClient.wxShareImageToPYQ = false;
            }
            

        });
        

	},
	refresh_main:function(){
        if (!cc.sys.isObjectValid(this.text_todaynum)) return;
        this.text_todaynum.setString(this._data.todayActivity +"");
        this.text_myNum.setString(this._data.activity +"");    
        this.text_leftdays.setString(this._data.remainDay +"");
        this.addItems();
        var percent = this._data.activity/160 *100;
        if (percent >= 100)     percent = 100;
        this._jindutiao.setPercent(percent);

        var setPos_award = function(number){
            var sum = this._data.infoList.award[3].integral;
            var sum_1 = this._data.infoList.award[number].integral;
            return sum_1 / sum * 760 + 360;
        }.bind(this);

        var table_1 = [15, 50, 100, 160];
        // this._data.award = {}
        for (var i = 0; i < 4; i++) {
            cc.log(" ==== !this._data.recv[i]", this._data.activity >= this._data.infoList.award[i].integral);
            var number = 41 + i;
            var pos_x = setPos_award(i);
            if (this["imgtishi_"+i]) {
                var Text_1 = this["imgtishi_"+i].getChildByName("Text_1");//ignoreContentAdaptWithSize
                Text_1.setString(this._data.infoList.award[i].integral);
                var Text_2 = this["imgtishi_"+i].getChildByName("Text_2");
                Text_2.setString(this._data.infoList.award[i].integralAward);

                this["imgtishi_"+i].setPositionX(pos_x);
            }

            this.node_mid.getChildByName("bg_hyd_" + i).getChildByName("Text_1").setString(this._data.infoList.award[i].integral);
            this["imgshine_"+i].setPositionX(pos_x);
            this["prize_"+i].setPositionX(pos_x);
            if (this._data.infoList.award[i].isAward) {
                this["imgshine_" + i].setOpacity(255);
                var act_1 = cc.rotateTo(0.2,-7.5);
                var act_2 = cc.rotateTo(0.2,7.5);                
                this["prize_"+i].runAction(cc.sequence(act_1,act_2).repeatForever());

            } else {
                this["imgshine_" + i].setOpacity(0);
                this["prize_"+i].stopAllActions();
                this["prize_"+i].setScale(1);
                this["prize_"+i].setRotation(0);
                if (this._data.activity >= this._data.infoList.award[i].integral && i<3) {
                    this["prize_"+i].loadTextureNormal("newPlayerPrize/prizebox2_" + (i + 1) + ".png");
                    this["prize_"+i].setTouchEnabled(false);
                }

            }



        }

    },
    type_work:function(type){
        switch(type) {
            case 1:
                // 登录
                break;
            case 2:
                //大赢家
                break;
            case 3://首充  商城

                if (MjClient.APP_TYPE.QXNTQP == MjClient.getAppType()) {
                    var layer = new StoreTipDialog();
                    MjClient.Scene.addChild(layer);
                }else{
                    var layer = enter_store();
                    MjClient.Scene.addChild(layer);
                }
                break;
            case 4: // 分享 首页
                this._shareType = 1;
                if (cc.sys.OS_WINDOWS == cc.sys.os) {
                    MjClient.wxShareImageToPYQ = true;
                    postEvent("WX_SHARE_SUCCESS", {
                        errCode: 0
                    });
                }

                var fileContent = MjClient.getShareImageFileToPYQ();
                MjClient.native.wxShareImageToPYQ(fileContent.file, fileContent.content);
                break;
            case 5:// 分享 活动图
                this._shareType = 2;
                if (cc.sys.OS_WINDOWS == cc.sys.os) {
                    MjClient.wxShareImageToPYQ = true;
                    postEvent("WX_SHARE_SUCCESS", {
                        errCode: 0
                    });
                }
                var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "newPlayerPrize/participator_1.jpg";
                MjClient.native.wxShareImageToPYQ(filePath);
                break;
            case 6://开房 对战
                cc.log(" ======开房 对战 ")
                postEvent("createRoom", {});
                this.removeFromParent();
                break;
            case 7:// 亲友圈场次
                MjClient.Scene.addChild(new FriendCard_main());
                this.removeFromParent()
                break;
        }
    },
	
    createItem:function(dataInfo,number)
    {
        var copyNode = this._cell.clone();
        copyNode.visible = true;

        var icon = copyNode.getChildByName("img_icon");
        icon.loadTexture("newPlayerPrize/icon_gold_" + (number + 1) + ".png");
        var text_1 = copyNode.getChildByName("Text_1");
        text_1.setString(dataInfo.title);
        var text_2 = copyNode.getChildByName("Text_2");
        text_2.setString(dataInfo.desc);
        var text_3 = copyNode.getChildByName("Text_3");
        text_3.setString(dataInfo.activity);
        var text_4 = copyNode.getChildByName("Text_4");
        var text = "";
        text = dataInfo.count >= dataInfo.total ? dataInfo.total + "/" + dataInfo.total: dataInfo.count + "/" + dataInfo.total;
        cc.log(" ====== text ",text)
        text_4.setString(text);
        var _btnget = copyNode.getChildByName("btn_get");
        _btnget.setTag(dataInfo.key);
        _btnget.type = dataInfo.type;
        _btnget.canRecv = dataInfo.count >= dataInfo.total;

        _btnget.addTouchEventListener(function(sender,type){
            var tag = sender.getTag();
            var recv = sender.canRecv;
            var type2 = sender.type;
            cc.log(" ======== 222222222  tag ",tag,recv,type2)
            if (type == 2) {
                if (recv) {
                    this.reqGetPrize(tag);
                }else{
                    cc.log(" ====== type ")
                    this.type_work(type2); 
                }
                
            }
        },this)
        if (dataInfo.count >= dataInfo.total) {
            if (dataInfo.isRecv) {
                _btnget.loadTextureNormal("newPlayerPrize/btn_get.png");
            } else {
                _btnget.loadTextureNormal("newPlayerPrize/btnyiling.png");
                _btnget.setTouchEnabled(false);
            }
        }else{
            _btnget.loadTextureNormal("newPlayerPrize/btn_go.png");
        }
        
        this["work_" + number] = copyNode;
        return copyNode;
    },
    refresh_workData:function(node,dataInfo,number){
        var copyNode = node;

        var icon = copyNode.getChildByName("img_icon");
        icon.loadTexture("newPlayerPrize/icon_gold_" + (number + 1) + ".png");
        var text_1 = copyNode.getChildByName("Text_1");
        text_1.setString(dataInfo.title);
        var text_2 = copyNode.getChildByName("Text_2");
        text_2.setString(dataInfo.desc);
        var text_3 = copyNode.getChildByName("Text_3");
        text_3.setString(dataInfo.activity);
        var text_4 = copyNode.getChildByName("Text_4");
        var text = "";
        text = dataInfo.count >= dataInfo.total ? dataInfo.total + "/" + dataInfo.total: dataInfo.count + "/" + dataInfo.total;
        text_4.setString(text);
        var _btnget = copyNode.getChildByName("btn_get");
        _btnget.setTag(dataInfo.key);
        _btnget.type = dataInfo.type;
        _btnget.canRecv = dataInfo.count >= dataInfo.total;

        _btnget.addTouchEventListener(function(sender,type){
            var tag = sender.getTag();
            var recv = sender.canRecv;
            var type2 = sender.type;
            cc.log(" ======== 222222222  tag ",tag,recv,type2)
            if (type == 2) {
                if (recv) {
                    this.reqGetPrize(tag);
                }else{
                    cc.log(" ====== type ")
                    this.type_work(type2); 
                }
                
            }
        },this)
        if (dataInfo.count >= dataInfo.total) {
            if (dataInfo.isRecv) {
                _btnget.loadTextureNormal("newPlayerPrize/btn_get.png");
            } else {
                _btnget.loadTextureNormal("newPlayerPrize/btnyiling.png");
                _btnget.setTouchEnabled(false);
            }
        }else{
            _btnget.loadTextureNormal("newPlayerPrize/btn_go.png");
        }

    },
    addItems:function()
    {
        var infoList = this._data.infoList.arr;
        // {
        //     title:["每日任务","每日分享","大赢家次数","加入亲友圈","创建房间"],
        //     desc:["每天完成2场牌局","每天分享1次","累计获得大赢家3次","加入至少1个亲友圈","创建房间并邀请好友完成牌局2次"],
        //     activity:["+10活跃度","+10活跃度","+20活跃度","+20活跃度","+20活跃度"]
        // }
        // this.listView.removeAllItems();
        for(var i = 0;i < infoList.length ;i++)
        {   
            cc.log(" ======== infoList ",i)
            if (this["work_" + i]) {
                this.refresh_workData(this["work_" + i],infoList[i],i);
            }else{
                if(cc.sys.isObjectValid(this._cell)) {
                    this.listView.pushBackCustomItem(this.createItem(infoList[i],i));
                }
            }
            
        }
        
    },
    reqMainMsg:function(){
        if (!cc.sys.isObjectValid(this)) return;
        var self = this;
        MjClient.block(); 
        MjClient.gamenet.request("pkplayer.handler.activityInfo", {
            },
            function(rtn) {
                 cc.log("pkplayer.handler.activityInfo ----------- " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                    self._data = rtn.data;
                    self.refresh_main();
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }
                }

                MjClient.unblock();
            }
        );
    },
    reqGetYB:function(number){
        
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.activityOpen", {
            type:number
            },
            function(rtn) {
                 cc.log("pkplayer.handler.activityOpen ----------- " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                    self.reqMainMsg();
                    var  type = 1;
                    var money_number = number - 41;
                    cc.log(" ========= money_number ",money_number,self._data.infoList.award[money_number].integralAward)
                    var layer = new NewPlayerBackLayer(type,self._data.infoList.award[money_number].integralAward);
                     MjClient.Scene.addChild(layer);
                    

                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }
                }

                MjClient.unblock();
            }
        );
    },
    reqGetPrize:function(number){
        
         var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.activityRecv", {
            type:number
            },
            function(rtn) {
                 cc.log("pkplayer.handler.activityRecv ----------- " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                    MjClient.showToast("领取成功");
                    self.runAction(cc.sequence(cc.DelayTime(0.3), cc.callFunc(function() {
                        self.reqMainMsg();
                    })));
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }
                }

                MjClient.unblock();
            }
        );
    },
    reqTodayShare: function() {
        var self = this;
        MjClient.gamenet.request("pkplayer.handler.lotteryShare", {key: "XINSHOU"},
            function(rtn) {
                if (rtn.code == 0) {
                    cc.log(" ===== lotteryShare ===   " + JSON.stringify(rtn))
                    self.reqMainMsg();
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }

                }

            }


        );
    },
    reqShare:function(){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.lotteryCallback", {},
            function(rtn) {
                 cc.log("pkplayer.handler.lotteryCallback ----------- " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                    MjClient.showToast("分享成功,请去公众号领取");
                    self.reqMainMsg();
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }
                }

                MjClient.unblock();
            }
        );
    },
    setCloseCallback:function(callback)
    {
        this._closeCallback = callback;
    },
});

/**
 * @Author:      Lms
 * @Email:       lms_190865480@163.com
 * @QQ:       190865480
 * @DateTime:     2018-03-30 
 * @Description: 抽奖界面 
 */

var NewPlayerChanceLayer = cc.Layer.extend({

    ctor: function(data,img_data) {
        this._super();
        if (img_data.length != 9){
            MjClient.showToast("请配置9个奖励");
            return;
        }      
        var UI = ccs.load("newPlayerPrize_chance.json");
        this.addChild(UI.node);
        MjClient.NewPlayerChance_ui = this;
        this._prizeType = null;
        this._prizeNumber = null;

        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);
        this._node_prize = this._back.getChildByName("node_prize");       
        //退出
        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                playEffect("activity/getBoxClick",false);
                self.removeFromParent(); 
            }
        }, this);
        //点击抽奖
        this._click = this._back.getChildByName("prize_click");
        this._click.addTouchEventListener(function(sender, type) {
            if (type == 2) { 
                cc.log( " ============ _click  ")
                self.reqChance();
                // self.setPrize(2,18.88);
            }
        }, this);
        if (!data) {
            this._click.loadTextureNormal("newPlayerPrize/btn_choujiang_1.png");
            this._click.setTouchEnabled(false);
        }



       var bg_1 = this._back.getChildByName("bg_1");
       var bg_2 = this._back.getChildByName("bg_2");
       var bShow = true;
        bg_1.schedule(function () {
            if (bShow) {
                bg_1.setVisible(true);
                bg_2.setVisible(false);
                bShow = false;
            }
            else {
                bg_1.setVisible(false);
                bg_2.setVisible(true);
                bShow = true;
                
            }
        }, 0.5);

        var imgFunc = function(number){
            var vecImageUrl = img_data[number].image;
            var imageUrl = vecImageUrl;
            var self = this;
            cc.loader.loadImg(imageUrl,   {
                isCrossOrigin :  true
            },  function(err, img) {
                if (err) {
                    cc.log(err);
                }
                else if (img && sys.isObjectValid(self["prize_" + number]))
                {
                    var sprite_bg = new cc.Sprite("newPlayerPrize/prize_1.png");
                    sprite_bg.setTexture(img);
                    var pos = self["prize_pic_" +number].getPosition();
                    sprite_bg.setPosition(pos);
                    self["prize_" + number].addChild(sprite_bg);
                }
            });
            
        }.bind(this);

        for (var i = 0; i <= 8; i++) {
            this["prize_" + i] = this._node_prize.getChildByName("prize_" + i);
            this["prize_bg_" +i] = this["prize_" + i].getChildByName("bg_1");
            this["prize_bg_" +i].visible = false;
            this["prize_pic_" +i] = this["prize_" + i].getChildByName("bg_2");
            this["prize_pic_" +i].visible = false;
            imgFunc(i);
            
        }



    },


    RotationAct: function(number) {
        if (!cc.sys.isObjectValid(this["prize_" + number])) return;
        this._play = playEffect("activity/runClick",true);
        var self = this;
        var sum = 9 * 3 + number;
        cc.log(" ====== sum ",sum);
        var timedelay = 0.1 ;
        var type = this._timeType;
        var _act = cc.scaleTo(timedelay, 1.2)
        var _act_1 = cc.scaleTo(timedelay, 1.0)
        for (var i = 0; i <= sum; i++) {
            var time = i * timedelay;
            var func = function(d) {
                var num = d % 9;

                self["prize_" + num].runAction(cc.sequence(cc.DelayTime(time), cc.callFunc(function() {
                    self["prize_bg_" + num].visible = true;
                    
                }), _act, cc.callFunc(function() {
                    if (d < sum ) {
                        self["prize_bg_" + num].visible = false;
                    }

                }), _act_1));


            }
            func(i);

        }

        this.runAction(cc.sequence(cc.DelayTime(sum * timedelay + 0.5),cc.callFunc(function() {
                        stopEffect(self._play);
                        playEffect("activity/runGetClick",false);
                       MjClient.Scene.addChild(new NewPlayerBackLayer(self._prizeType,self._prizeNumber));
                    })));

    },

    reqChance: function() {
        playEffect("activity/getBoxClick",false);
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.lottery", {
                type:44
            },
            function(rtn) {
                 cc.log("pkplayer.handler.lottery  ----------- " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                    self._click.loadTextureNormal("newPlayerPrize/btn_choujiang_1.png");
                    self._click.setTouchEnabled(false);
                    self._prizeType = rtn.data.type;
                    self._prizeNumber = rtn.data.amount;
                    self.setPrize(rtn.data.num);
                    MjClient.NewPlayerPrize_ui.reqMainMsg();

                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }
                }

                MjClient.unblock();
            }
        );
        cc.log(" ======== reqChance =======")

    },

    setPrize: function(number) {
        this.RotationAct(number);         
    },

});

/**
 * @Author:      Lms
 * @Email:       lms_190865480@163.com
 * @QQ:       190865480
 * @DateTime:     2018-03-30 
 * @Description:  
 */

var NewPlayerBackLayer = cc.Layer.extend({
    
    ctor: function(type, number) {
        this._super();
        var UI = ccs.load("newPlayerPrize_back.json");
        this.addChild(UI.node);
        MjClient.NewPlayerBack_ui = this;
        var self = this;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        
        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);

        var _btn_share = _back.getChildByName("btn_share");
        var close = _back.getChildByName("close");
        this._luckyNode_1 = _back.getChildByName("lucky_1");
        this._luckyNode_1.setVisible(false);
        this._luckyNode_2 = _back.getChildByName("lucky_2");
        this._luckyNode_2.setVisible(false);
        this._luckyNode_3 = _back.getChildByName("lucky_3");
        this._luckyNode_3.setVisible(false);
        
            

        if (type == 0) {
            this._luckyNode_1.setVisible(true);
            _btn_share.setVisible(false);
            close.setVisible(false);
            // _block.setTouchEnabled(true);
            cc.log(" ---- _block ----------")
            _block.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    
                    self.removeFromParent();
                    MjClient.NewPlayerBack_ui = null;
                    
                }
            }, this);
            
        } else if (type == 1) {
            this._luckyNode_2.setVisible(true);
            _btn_share.setVisible(false);
            close.setVisible(false);
            var _txt2 = this._luckyNode_2.getChildByName("Text_2")
            _txt2.setString("恭喜您获得"+number+"元宝。请点击屏幕返回游戏查看");
            _block.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    
                    self.removeFromParent();
                    MjClient.NewPlayerBack_ui = null;
                    
                }
            }, this);
            
        } else if (type == 2) {
            this._luckyNode_3.setVisible(true);
            var _txt = this._luckyNode_3.getChildByName("Text_1")
            _txt.setString("" + number + "");
            var _txt2 = this._luckyNode_3.getChildByName("Text_2")
            _txt2.setString("恭喜您获得"+number+"元新人红包\n请分享后关注（"+ MjClient.systemConfig.gongzhonghao +"）领取");

        }
        
        close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                MjClient.showMsg("取消分享会视为您放弃此次奖励哦 ！",
                    function() {
                        playEffect("activity/getBoxClick",false);
                        self.removeFromParent();
                    },
                    function() {}, "1");
            }
        }, this);

        _btn_share.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                playEffect("activity/getBoxClick",false);
                MjClient.NewPlayerPrize_ui.type_work(5);
                // if (cc.sys.OS_WINDOWS == cc.sys.os) {
                //     MjClient.wxShareImageToPYQ = true;
                //     postEvent("WX_SHARE_SUCCESS", {
                //         errCode: 0
                //     });
                // }

                // var fileContent = MjClient.getShareImageFileToPYQ();
                // MjClient.native.wxShareImageToPYQ(fileContent.file, fileContent.content);
            }
        }, this);
        // UIEventBind(null, _btn_share, "WX_SHARE_SUCCESS", function(data) {

        //     if (parseInt(data.errCode) == 0) {
        //         this.runAction(cc.sequence(cc.DelayTime(0.5), cc.callFunc(function() {
        //             self.getShare();
        //         })));
        //     }
        //     MjClient.wxShareImageToPYQ = false;
        // });
    },
    getShare:function(){
        this.removeFromParent();
        MjClient.NewPlayerPrize_ui.reqShare();
        MjClient.NewPlayerBack_ui = null;
        
    }
    

});


/**
 * @Author:      Lms
 * @Email:       lms_190865480@163.com
 * @QQ:       190865480
 * @DateTime:     2018-03-30 
 * @Description: Description 
 */



var NewPlayerRuleLayer = cc.Layer.extend({

    ctor: function() {
        this._super();     
        var UI = ccs.load("newPlayerPrize_rule.json");
        this.addChild(UI.node);
        MjClient.NewPlayerChance_ui = this;

        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ|| MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ) {
            setWgtLayout(this._back, [0.866, 0.71], [0.5, 0.5], [0, 0]);
        }else{
            setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]); 
        }
            
        //退出
        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                playEffect("activity/getBoxClick",false);
                self.removeFromParent(); 
            }
        }, this);
        //点击抽奖

        var content1 = this._back.getChildByName("contentScrollView").getChildByName("content1");
        var str = "1、新用户进入游戏前6天内完成新人任务即可获得相应活跃度，活跃度达到一定数量可领取宝箱奖励\n" +
            "2、新用户6天内共可获得180活跃度，活跃度达到160即可抽新人红包\n" +
            "3、每日场次与每日分享数据每天0点重置，其他任务数据可累加 \n" +
            "4、新人福利共6天（自登陆时间起），6天后自动下线，请及时领取奖励\n" +
            "5、新人红包与其他红包不累计计算\n" +
            "6、提现成功后需关注公众号（" + MjClient.systemConfig.gongzhonghao + "）领取红包";
        content1.setString(str);


    },

});







