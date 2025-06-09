/**create by Lms
 * @DateTime:     2018-03-05 
 * @Description: 签到有礼 
 */


var QiandaoLayer = cc.Layer.extend({
     jsBind: {
        back: {

            btn_share: {
                // _run:function(){
                //     cc.log(" ==== rrrrrrrrr ");
                //     MjClient.showToast(" ======== rrrrr =========");
                // },
                _click: function() {
                    if (cc.sys.OS_WINDOWS == cc.sys.os) {
                        MjClient.wxShareImageToPYQ = true;
                        postEvent("WX_SHARE_SUCCESS", {
                            errCode: 0
                        });
                    }
                    cc.log(" ========== btn_share btn_share  btn_share ");
                    var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "QianDaoPrize/participator_1.jpg";
                    MjClient.native.wxShareImageToPYQ(filePath);
                                       
                },
                _event: {

                    WX_SHARE_SUCCESS: function(data) {
                        if (parseInt(data.errCode) == 0 && MjClient.wxShareImageToPYQ == true) {
                            if (MjClient.QiandaoLayer_ui) {
                                MjClient.QiandaoLayer_ui.getShare();
                                cc.log(" ======== 分享成功 share ");
                            }
                        }
                        MjClient.wxShareImageToPYQ = false;
                    }
                },
            },
        }
    },
    onExit:function()
    {
        this._super();       
    },
    _closeCallback:null,
    _listDay:null,
    ctor: function(data) {
        this._super();
        
        var UI = ccs.load("QiandaoLayer.json");        
        BindUiAndLogic(UI.node,this.jsBind);
        this.addChild(UI.node);
        MjClient.QiandaoLayer_ui = this;

        var self = this;
        this._today = null;
        this._data = data;
        this._isCanPrize = false;
        this._yiqian_day = 0;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.0, 0.0], [0, 0]);

        //退出
        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (this._closeCallback) {
                    this._closeCallback();
                }
                self.removeFromParent(); 
            }
        }, this);

        this._btn_rule = this._back.getChildByName("btn_rule");
        this._btn_rule.addTouchEventListener(function(sender, type){
            switch(type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (this._data) {
                        var layer = new QiandaoRule(this._data);
                        MjClient.Scene.addChild(layer);
                    }
                    
                    break;
                default:
                    break;
            }
        },this);

        for (var i = 1; i < 8; i++) {
            this["_day_" + (i-1)] = this._back.getChildByName("btn_day_" + i);
            
            this["_buTag_" + (i-1)] = this["_day_" + (i-1)].getChildByName("image_0")
            this["_buTag_" + (i-1)].visible = false;

            this["_buqian_" + (i-1)] = this["_day_" + (i-1)].getChildByName("img_buqian")
            this["_buqian_" + (i-1)].visible = false;
        }


        this._big_prize = this._back.getChildByName("btn_bigPrize");
        this._big_prize.addTouchEventListener(function(sender,type){
            switch(type) {
                case ccui.Widget.TOUCH_ENDED: 
                    var layer = new Qiandao_bigPrize(this._isCanPrize);
                    MjClient.Scene.addChild(layer);
                    
                    break;
                default:
                    break;
            }
        },this);


        this._myprize = this._back.getChildByName("btn_myprize");
        this._myprize.addTouchEventListener(function(sender,type){
            switch(type) {
                case ccui.Widget.TOUCH_ENDED:
                    var layer = new Qiandao_myPrize();
                    MjClient.Scene.addChild(layer);
                    break;
                default:
                    break;
            }
        },this)

        this._text_day = this._back.getChildByName("text_day");
        this._text_day.setString("");
        
        this._currentStr = MjClient.dateFormat(new Date(), "yyyyMMdd");
        cc.log(" ========== currentStr : ",this._currentStr);
        this._today = this._currentStr;
        if (data) {
            this._listDay = data.list;
            this._isCanPrize = data.canLottery;
            this._yiqian_day = data.count;
            this.initSelf();
        }else{
            this.reqQiandao();
        }
        
       
    },

    initSelf: function() {
        /**create by Lms
         * @DateTime:     2018-03-09 
         * @Description: 先从后台里找今天的日期(本地时间不一定正确)，找不到在取本地 时间过了还是可以补签到活动结束 
         */
        if (!cc.sys.isObjectValid(this)) return;
        for (var i = 0; i < this._listDay.length; i++) {
            if (this._listDay[i].isToday == true) {
                this._today = this._listDay[i].date;
            }
        }
        cc.log(" ======= time _today ",this._today);
        var self =this;
        this._text_day.setString(this._yiqian_day + "");
        for (var i = 0; i < this._listDay.length; i++) {
            this["_day_" + i].setTag(this._listDay[i].date);
            this["_day_" + i].addTouchEventListener(function(sender,type){
                    switch(type) {
                        case ccui.Widget.TOUCH_ENDED:
                             var selectNum = sender.getTag();
                            cc.log(" ===== selectNum ",selectNum);
                            if (selectNum < self._today) {
                                // MjClient.showMsg("是否要消耗5元宝来进行补签？",
                                //             function() {
                                //                 MjClient.showToast("=====34288----");
                                //                 self.req_qianDao(selectNum);

                                //             },
                                //             function() {},"1")
                                //Qiandao_tishi
                                var layer = new Qiandao_tishi(1,selectNum);
                                MjClient.Scene.addChild(layer);
                            }else if (selectNum > self._today) {
                                MjClient.showToast("签到时间还未到");
                            }
                            else{
                                if (cc.sys.OS_WINDOWS == cc.sys.os) {
                                MjClient.wxShareImageToPYQ = true;
                                postEvent("WX_SHARE_SUCCESS", { errCode: 0 });
                                }

                            
                                //"QianDaoPrize/participator_1.jpg"
                                var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "QianDaoPrize/participator_1.jpg";
                                MjClient.native.wxShareImageToPYQ(filePath);
                                        // self.req_qianDao(selectNum);
                            }

                            break;
                        default:
                            break;
                    }
                },this)


            if (this._listDay[i].date < this._today) {
                if (!this._listDay[i].isSignin && !this._listDay[i].isRepair) {
                    this["_buTag_" + i].visible = false;
                    this["_buqian_" + i].visible = true;
                }else{
                    this["_buqian_" + i].visible = false;
                    this["_buTag_" + i].visible = true;
                    this["_day_" + i].setTouchEnabled(false); // 签到后按钮不能点击
                }
                
            }else if (this._listDay[i].isToday ) {
                if (!this._listDay[i].isSignin && !this._listDay[i].isRepair) {
                    this["_buTag_" + i].visible = false;
                }else{
                    this["_buTag_" + i].visible = true;
                    this["_day_" + i].setTouchEnabled(false);
                }
                // this["_buTag_" + i].runAction(cc.blink(1,5).repeatForever());
            }
        }
        if (this._isCanPrize) {
            this._big_prize.loadTextureNormal("QianDaoPrize/btn_iphoneopen.png");
        }else{
            this._big_prize.loadTextureNormal("QianDaoPrize/btn_iphoneclose.png");
        }
        // this._big_prize.setTouchEnabled(this._isCanPrize);


    },
    //刷新页面
    refresh_main:function(){
        if (!cc.sys.isObjectValid(this)) return;
        this.reqQiandao();
    },
   
    req_qianDao:function(date){
        var self = this;
        if (!cc.sys.isObjectValid(this)) return;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.signin", {date:date},
            function(rtn) {
                cc.log(" =====   signin === " + JSON.stringify(rtn))
                if (rtn.code == 0) {
                    cc.log(" =====   signin data === " + JSON.stringify(rtn.data));
                    MjClient.showToast("签到成功");
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
   

    reqQiandao: function() {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.signinMsg", {},
            function(rtn) {
                cc.log(" ===== signinMsg === " + JSON.stringify(rtn))
                if (rtn.code == 0) {
                    cc.log(" ===== signinMsg 2222 === " + JSON.stringify(rtn.data))
                    self._data = rtn.data;
                    self._listDay = rtn.data.list;
                    self._isCanPrize = rtn.data.canLottery;
                    self._yiqian_day = rtn.data.count;
                    self.initSelf();
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
    getShare:function(){
        this.req_qianDao(this._today);
    },
 
    setCloseCallback:function(callback)
    {
        this._closeCallback = callback;
    },

});


/**create by Lms
 * @DateTime:     2018-03-08 
 * @Description: 规则界面 
 */

var QiandaoRule = cc.Layer.extend({
    ctor: function(data) {
        this._super();
        
        var UI = ccs.load("QiandaoRule.json");
        this.addChild(UI.node);

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.0, 0.0], [0, 0]);

        //退出
        this._back.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(); 
            }
        }, this);
        var date1 = data.startDate;
        var date2 = data.endDate; 

        var text = this._back.getChildByName("Text_1");
        text.setString("");
        cc.log(" ============= date1 date2",date1,date2);
        if (date1 && date1) {
            var str1 = date1.substring(0,4);
            var str2 = date1.substring(4,6);
            var str3 = date1.substring(6,8);
            var time_1 = str1+"."+str2+"."+str3;

            // var day1 = str1+"-"+str2+"-"+str3;
            // var day2 = Date.parse(day1) + 86400000 * 9; // 从第一天开始 加9天 共10天
            // var date=new Date(day2);
            // var txt_1 = date.getFullYear(); 
            // var txt_2 = date.getMonth() + 1 + ""; 
            // var txt_3 = date.getDate() + "";
            // txt_2 = txt_2.length <2? "0"+txt_2:txt_2;
            // txt_3 = txt_3.length<2? "0"+txt_3:txt_3;
            // var day3 = txt_1 + "." + txt_2 +"." +txt_3; 
            var str4 = date2.substring(0,4);
            var str5 = date2.substring(4,6);
            var str6 = date2.substring(6,8);
            var time_2 = str4+"."+str5+"."+str6;

            text.setString(data.activityDate.startTime + "~" + data.activityDate.endTime);

            for (var i = 1; i <= 16; i++) {
                 this["txt_" + i] = this._back.getChildByName("Text_" + i);
             }
             this.txt_8.setString("3.忘签、漏签可以花费" + MjClient.QiandaoLayer_ui._data.needMoney + "个元宝进行补签");
             this.txt_16.setString("5.在正常签到时间（" + str3 +"-"+ str6 +"日）期间开始签到，可往后顺延签到时间。"+ str6 +"日起未签到的玩家可进行补签");
        }

        


    }
});

/**create by Lms
 * @DateTime:     2018-03-08 
 * @Description: type 1 补签 2 提现 3 兑换  number 1 日期 2,3是金额
 */

var Qiandao_tishi = cc.Layer.extend({
    ctor: function(type,number) {
        this._super();
        
        var UI = ccs.load("Qiandao_tishi.json");
        this.addChild(UI.node);

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);

        var node_buqian = this._back.getChildByName("img_buqian");
        node_buqian.visible = false;

        var  Text_rule = node_buqian.getChildByName("Text_rule");
        Text_rule.ignoreContentAdaptWithSize(true);
        if (MjClient.QiandaoLayer_ui && MjClient.QiandaoLayer_ui._data && MjClient.QiandaoLayer_ui._data.needMoney) {
            Text_rule.setString("是否消耗" + MjClient.QiandaoLayer_ui._data.needMoney +"个元宝进行补签？");
        }else{
            Text_rule.setString("是否消耗5个元宝进行补签？");
        }
        

        var node_tixian = this._back.getChildByName("img_tixian");
        node_tixian.visible = false;

        var node_change = this._back.getChildByName("img_change");
        node_change.visible = false;

        if (type == 1) {
            node_buqian.visible = true;
            var btn_1 = node_buqian.getChildByName("Button_1");
            btn_1.addTouchEventListener(function(sender,type){
                if (type == 2) {
                    if (number) {
                        this.req_qianDao(number);
                    }
                }
            },this);
            var btn_2 = node_buqian.getChildByName("Button_2");
            btn_2.addTouchEventListener(function(sender,type){
                if (type == 2) {
                        this.removeFromParent();
                }
            },this);

        }else if (type == 2 ) {
            node_tixian.visible = true;
            if (MjClient.QiandaoMyPrize_ui) {
                MjClient.QiandaoMyPrize_ui.refresh_myPrize();
            }
            var text_money = node_tixian.getChildByName("Text_1");
            text_money.setString(number + "");
            var btn_1 = node_tixian.getChildByName("Button_1");
            btn_1.addTouchEventListener(function(sender,type){
                if (type == 2) {
                        this.removeFromParent();
                }
            },this);
            var text_hao = node_tixian.getChildByName("Text_hao"); //MjClient.systemConfig.gongzhonghao
            if (text_hao) {
                text_hao.ignoreContentAdaptWithSize(true);
                text_hao.setString(MjClient.systemConfig.gongzhonghao);
            }

        }else if (type == 3) {
            node_change.visible = true;
            var text_money = node_change.getChildByName("Text_1");
            text_money.setString(number + "");
            var btn_1 = node_change.getChildByName("Button_1");
            btn_1.addTouchEventListener(function(sender,type){
                if (type == 2) {
                        this.req_change();
                }
            },this);
            var btn_2 = node_change.getChildByName("Button_2");
            btn_2.addTouchEventListener(function(sender,type){
                if (type == 2) {
                        this.removeFromParent();
                }
            },this);
        }

        //退出
        // this._back.addTouchEventListener(function(sender, type) {
        //     if (type == 2) {
        //         this.removeFromParent(); 
        //     }
        // }, this);

    },
    req_qianDao:function(date){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.signin", {date:date},
            function(rtn) {
                cc.log(" =====   signin ttt === " + JSON.stringify(rtn))
                if (rtn.code == 0) {
                    cc.log(" =====   signin ttt data === " + JSON.stringify(rtn.data))
                    MjClient.showToast("签到成功");
                    if ( cc.sys.isObjectValid(MjClient.QiandaoLayer_ui)) {
                        MjClient.QiandaoLayer_ui.refresh_main();
                    }
                    if ( cc.sys.isObjectValid(MjClient.QiandaoMyPrize_ui)) {
                        MjClient.QiandaoMyPrize_ui.refresh_myPrize();
                    }
                    self.removeFromParent();
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

    req_change:function(){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.exchangeMoney", {},
            function(rtn) {
                cc.log(" ===== exchangeMoney  222 === " + JSON.stringify(rtn))
                if (rtn.code == 0) {
                    cc.log(" ===== exchangeMoney  222 data === " + JSON.stringify(rtn.data));
                    MjClient.showToast("兑换成功");
                    if (MjClient.QiandaoMyPrize_ui) {
                        MjClient.QiandaoMyPrize_ui.refresh_myPrize();
                    }
                    self.removeFromParent();
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
});



var Qiandao_myPrize = cc.Layer.extend({
   
    ctor: function() {
        this._super();
        this._today = null;
        this._myMoney = null;
        var UI = ccs.load("Qiandao_myPrize.json");
        this.addChild(UI.node);
        MjClient.QiandaoMyPrize_ui = this;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.0, 0.0], [0, 0]);

        //退出
        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(); 
            }
        }, this);

        this._btn_get = this._back.getChildByName("btn_get");
        this._btn_get.addTouchEventListener(function(sender,type){
            switch(type) {
                case ccui.Widget.TOUCH_ENDED: 
                    if (this._myMoney < 10) {
                        MjClient.showToast("提现金额不足");
                    }else{
                        this.req_getMoney();
                    }                   
                    
                    break;
                default:
                    break;
            }
        },this);


        this._btn_change = this._back.getChildByName("btn_change");
        this._btn_change.addTouchEventListener(function(sender,type){
            switch(type) {
                case ccui.Widget.TOUCH_ENDED:
                    // this.req_change();
                    if (this._myMoney >0) {
                        var layer = new Qiandao_tishi(3,this._myMoney);
                        MjClient.Scene.addChild(layer);
                    }else{
                        MjClient.showToast("兑换金额不足");
                    }
                    
                    break;
                default:
                    break;
            }
        },this)

        this._listView = this._back.getChildByName("listView");
        this._cell = this._back.getChildByName("cell");
        this._cell.visible = false;
        this.req_myPrize();

        this._money = this._back.getChildByName("text_money");
        this._money.setString("");
        this._money.ignoreContentAdaptWithSize(true);
        this._currentStr = MjClient.dateFormat(new Date(), "yyyyMMdd");
        cc.log(" ========== currentStr : ",this._currentStr);
        this._today = this._currentStr;


    },

    refresh_myPrize:function(){
        this.req_myPrize();
    },
    initSelf:function(){
        this._money.setString(this._myMoney);
    },
    req_getMoney:function(){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.withdraw", {},
            function(rtn) {
                cc.log(" ===== withdraw   === " + JSON.stringify(rtn))
                if (rtn.code == 0) {
                    cc.log(" ===== withdraw   data === " + JSON.stringify(rtn.data))
                    var layer = new Qiandao_tishi(2,self._myMoney);
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
    req_change:function(){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.exchangeMoney", {},
            function(rtn) {
                cc.log(" ===== exchangeMoney   === " + JSON.stringify(rtn))
                if (rtn.code == 0) {
                    cc.log(" ===== exchangeMoney   data === " + JSON.stringify(rtn.data))
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
    req_myPrize:function(){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.signinMsg", {},
            function(rtn) {
                cc.log(" ===== signinMsg  req_myPrize === " + JSON.stringify(rtn))
                if (rtn.code == 0) {
                    cc.log(" ===== signinMsg  req_myPrize data === " + JSON.stringify(rtn.data))
                    self._listDay = rtn.data.list;
                    self._myMoney = rtn.data.redPacket || 0;
                    self.initSelf();
                    self.addItems(rtn.data);
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
    createItem:function(oneData){
        var copyNode = this._cell.clone();
        copyNode.visible = true;
        var self = this;
        var _qiandao = copyNode.getChildByName("btn_qiandao");
        _qiandao.setTag(oneData.date)
        _qiandao.addTouchEventListener(function(sender,type){
            if (type == 2 ) {
                var selectNum = sender.getTag();
                cc.log(" ===== selectNum ",selectNum);
                if (selectNum < self._today) {
                    // MjClient.showMsg("是否要消耗5元宝来进行补签？",
                    //             function() {
                    //                 MjClient.showToast("=====HJSFHSJ----");
                    //                 self.req_qianDao(selectNum);

                    //             },
                    //             function() {},"1")
                    var layer = new Qiandao_tishi(1,selectNum);
                    MjClient.Scene.addChild(layer);
                }else{
                    self.req_qianDao(selectNum);
                }
                
            }
        },this)
        var _title = _qiandao.getTitleRenderer();
        // _title.setString("")
        
         if (oneData.date < this._today && !oneData.isSignin && !oneData.isRepair) {
            _qiandao.setColor(cc.color(255,255,255));
            _qiandao.setTouchEnabled(true);
            // _title.setString("补签");
        }else{
            _qiandao.setColor(cc.color(120,120,120));
            _qiandao.setTouchEnabled(false);
        }



        // if (oneData.isToday && !oneData.isSignin ) {
        //     _title.setString("签到");
        // }else if (oneData.isToday && oneData.isSignin) {
        //     _title.setString("已签");
        //     _qiandao.setTouchEnabled(false);
        // }else if (oneData.date < this._today && !oneData.isSignin && !oneData.isRepair) {
        //     _title.setString("补签");
        // }else if(oneData.date < this._today){
        //     _title.setString("已补签");
        //     _qiandao.setTouchEnabled(false);
        // }else{
        //     _qiandao.visible =false;
        // }




        return copyNode;
    },
    addItems:function(data)
    {
        var _daylist = data.list;
        for(var t = 0;t < _daylist.length ;t++)
        {
            if (this._listDay[t].isToday == true) {
                this._today = this._listDay[t].date;
            }
        }
        this._listView.removeAllChildren();
        for(var i = 0;i < _daylist.length ;i++)
        {
            this._listView.pushBackCustomItem(this.createItem(_daylist[i]));
        }
        this._listView.setScrollBarOpacity(0);
       
    },

    req_qianDao:function(date){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.signin", {date:date},
            function(rtn) {
                cc.log(" ===== signinMsg  signin === " + JSON.stringify(rtn))
                if (rtn.code == 0) {
                    cc.log(" ===== signinMsg  signin data === " + JSON.stringify(rtn.data))
                    MjClient.showToast("签到成功");
                    self.req_myPrize();
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

});




/**create by Lms
 * @DateTime:     2018-03-06 
 * @Description: 抽大奖页面 
 */

var Qiandao_bigPrize = cc.Layer.extend({
    ctor: function(_isCanPrize) {
        this._super();
        this._prizeType = null;
        this._prizeNumber = null;
        var UI = ccs.load("QiandaoPrize.json");
        this.addChild(UI.node);
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);

        //退出
        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(); 
            }
        }, this);
        this._node_prize = this._back.getChildByName("node_prize");
        this._node_shine = this._back.getChildByName("node_shine");
        for (var i = 0; i <= 7; i++) {
            this["prize_" + i] = this._node_prize.getChildByName("prize_" + i);
            this["shine_" + i] = this._node_shine.getChildByName("prize_" + i);
            this["shine_" + i].visible = false;
        }
        this._click = this._back.getChildByName("prize_click");
        this._click.addTouchEventListener(function(sender, type) {
            if (type == 2) { 
                cc.log( " ============ _click  ")
                this.reqBigPrize();
            }
        }, this);
        this._click.setTouchEnabled(_isCanPrize);
        if (!_isCanPrize) {
            this._click.loadTextureNormal("QianDaoPrize/btn_go2.png");
        }

        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("QianDaoPrize/btn_go.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        this._click.addChild(clipper);
        var sprite = new cc.Sprite("QianDaoPrize/saoguang.png");
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));

        sprite.runAction(repeatAction); //进行向右移动的重复动作
        this._guang = sprite;
        sprite.visible = _isCanPrize;
        

    },
    RotationAct: function(number) {
        if (!cc.sys.isObjectValid(this["prize_" + number])) return;
        var self = this;
        var sum = 8 * 3 + number;
        cc.log(" ====== sum ", sum);
        var timedelay = 0.1;
        var _act = cc.scaleTo(timedelay, 1.2)
        var _act_1 = cc.scaleTo(timedelay, 1.0)
        for (var i = 0; i <= sum; i++) {
            var time = i * timedelay;
            var func = function(d) {
                var num = d % 8;

                self["prize_" + num].runAction(cc.sequence(cc.DelayTime(time), cc.callFunc(function() {
                    self["shine_" + num].visible = true;
                }), _act, cc.callFunc(function() {
                    if (d < sum) {
                        self["shine_" + num].visible = false;
                    }

                }), _act_1));


            }
            func(i);
        }

        this.runAction(cc.sequence(cc.DelayTime(sum * timedelay + 0.5),cc.callFunc(function() {
                       self.addChild(new Qiandao_back(self._prizeType,self._prizeNumber));
                    })));
    },
    reqBigPrize: function() {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.lottery", {
                key : "SIGNIN",
            },
            function(rtn) {
                 cc.log("  ------- reqBigPrize  -------- " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                    if (rtn.data.type == 1) { // 元宝或钻石
                        self._prizeType =1;
                        self._prizeNumber = rtn.data.amount;
                        self.setPrize(self._prizeType,rtn.data.amount);
                    }else if(rtn.data.type == 2){//随机红包
                        self._prizeType =2;
                        self._prizeNumber = rtn.data.amount;
                        self.setPrize(self._prizeType,rtn.data.amount);
                    }else{//默认最小值 1元宝
                        self._prizeType =1;
                        self._prizeNumber = 1;
                        self.setPrize(self._prizeType,self._prizeNumber);
                    }
                    self._click.loadTextureNormal("QianDaoPrize/btn_go2.png");
                    self._click.setTouchEnabled(false);
                    self._guang.visible = false;
                    if ( cc.sys.isObjectValid(MjClient.QiandaoLayer_ui)) {
                        MjClient.QiandaoLayer_ui.refresh_main();
                    }
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
    setPrize: function(typeid, number) {
        if (typeid == 1) { //元宝
            switch (number) {
                case 1:
                    var randomNum = Math.random() < 0.5 ? 2 : 5;
                    this.RotationAct(randomNum);
                    break;
                case 10:
                    this.RotationAct(7);
                    break;
                default:
                    // this.RotationAct(3);
                    break;
            }
        } else if (typeid == 2) { // 红包
            if (number) {
                if (number == 3) {
                    this.RotationAct(1);
                } else if (number == 88) {
                    this.RotationAct(3);
                }
            }
        }


    },
});


/**create by Lms
 * @DateTime:     2018-03-08 
 * @Description: 抽奖返回界面 
 */


var Qiandao_back = cc.Layer.extend({
    ctor: function(type,moneyNumber) {
        this._super();
        
        var UI = ccs.load("Qiandao_back.json");
        this.addChild(UI.node);

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);

        var node_1 = this._back.getChildByName("img_1");
        node_1.visible = false;
        var txt_1 = node_1.getChildByName("Text_1");
        txt_1.setString(moneyNumber + "");
        var node_2 = this._back.getChildByName("img_2");
        node_2.visible = false;
        var txt_2 = node_2.getChildByName("Text_1");
        txt_2.setString(moneyNumber + "");

        if (type == 1) {
            node_1.visible = true;
        }else if (type == 2) {
            node_2.visible = true;
        }

        //退出
        this._back.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.removeFromParent(); 
            }
        }, this);

    }
});