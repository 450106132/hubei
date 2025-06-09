/**
* Created by fenghanwei on 2019/10/31.
* 用户成长贵族活动
*/


/*
*贵族钻石理财
*/
var UserGroup_act_zuanshilicai = cc.Layer.extend({
    fontName:"fonts/lanting.TTF",
    maxNum:30,
    minNum:1,
    preNumPay:10,//每份10钻石
    ctor:function (callbackFunc) {
        this._super();
        var self = this;
        var node = ccs.load("userGroup_act_zuanshilicai.json").node;
        this.node = node;
        this.addChild(node);
        this.back = node.getChildByName("back");
        this.block = node.getChildByName("block")
        setWgtLayout(this.block, [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(this.back, [1, 1], [0.5, 0.5], [0, 0],false);
        this.initRulePanel();
        popupAnm(this.back);
        if(MjClient.growInfoData && MjClient.growInfoData.diamondManageCraveUp){
            MjClient.growInfoData.diamondManageCraveUp.isShow = false;
            postEvent("user_growth_activity",MjClient.growInfoData);
        }
        
        this.block.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                self.removeFromParent(true);
            }
        }, this);
        var close = this.back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                self.removeFromParent(true);
            }
        }, this);
        if(cc.sys.isObjectValid(MjClient.userInfoLayerUi) && MjClient.userInfoLayerUi._data){
            self._diamondManage = MjClient.userInfoLayerUi._data.diamondManage;
        }
        this.refreshActData();
        this.refreshOtherHisList();
        this.getActData();
    },
    getActData:function(){
        //用户下注瓜分相关信息，包含自己的历史瓜分信息
        var self = this;
        MjClient.block();
        var sendInfo = {}
        MjClient.gamenet.request("pkplayer.handler.userDiamondCraveUpInfo", sendInfo,
        function(rtn) {
            MjClient.unblock();
            if(!cc.sys.isObjectValid(self)){
                return;
            }
            if (rtn.code == 0){
                self._actData = rtn.data;
                self.refreshActData();
            }else{
                if(rtn.message){
                    MjClient.showToast(rtn.message+"")
                }
            }
            self.getOtherHisData();
        });
    },
    getTodayStatus:function(){
        //用户今日下注状态
        var self = this;
        if(cc.sys.isObjectValid(MjClient.userInfoLayerUi) 
            && MjClient.userInfoLayerUi._data 
            && MjClient.userInfoLayerUi._data.diamondManage){
            self._diamondManage = MjClient.userInfoLayerUi._data.diamondManage;
            self.refreshActData();
            return;
        }
        MjClient.block();
        var sendInfo = {}
        MjClient.gamenet.request("pkplayer.handler.userNobleActivityState", sendInfo,
        function(rtn) {
            MjClient.unblock();
            if(!cc.sys.isObjectValid(self)){
                return;
            }
            if (rtn.code == 0){
                self._diamondManage = rtn.data.diamondManage;
                self.refreshActData();
            }else{
                if(rtn.message){
                    MjClient.showToast(rtn.message+"")
                }
            }

        });
    },
    getOtherHisData:function(){
        //用户昨日瓜分流水(不是全部是自己的)
        var self = this;
        MjClient.block();
        var sendInfo = {
            length:30
        }
        MjClient.gamenet.request("pkplayer.handler.userHistoryDiamondCraveUpList", sendInfo,
        function(rtn) {
            MjClient.unblock();
            if(!cc.sys.isObjectValid(self)){
                return;
            }
            if (rtn.code == 0){
                self._actHisData = rtn.data;
                self.refreshOtherHisList();
                self.getTodayStatus();
            }else{
                if(rtn.message){
                    MjClient.showToast(rtn.message+"")
                }
            }
        });
    },
    toBug:function(){
        //下注
        var self = this;
        MjClient.block();
        var sendInfo = {
            betsCnt:this.textBuyNum._num,
            consumeDiamond:this.textBuyNum._num * this.preNumPay,
        }
        MjClient.gamenet.request("pkplayer.handler.userDiamondBets", sendInfo,
        function(rtn) {
            MjClient.unblock();
            if(!cc.sys.isObjectValid(self)){
                return;
            }
            if (rtn.code == 0){
                MjClient.showToast("今天已下注"+self.textBuyNum._num+"份,记得明天再来哦!");
                //todo更新今天已下注的data，更新ui
                self._diamondManage = {
                    isBets:2,
                    betsCnt:self.textBuyNum._num,
                }
                if(cc.sys.isObjectValid(MjClient.userInfoLayerUi) &&
                    MjClient.userInfoLayerUi._data){
                    MjClient.userInfoLayerUi._data.diamondManage = self._diamondManage;
                }
                self.getActData();
            }else{
                if(rtn.message){
                    MjClient.showToast(rtn.message+"")
                }
            }
        });
    },
    refreshActData:function(){
        var self = this;
        if(!this._actData){
            this._actData = {};
        }
        //明天瓜分总钻石数 
        var textAwardPool = this.back.getChildByName("Image_award_pool_di").getChildByName("Text_award_pool");
        textAwardPool.visible = false;
        textAwardPool.getParent().removeChildByName("RichText_award_pool")
        if("totalDiamond" in this._actData){
            var richText = new ccui.RichText();
            richText.setName("RichText_award_pool")
            var richTextItem1 = new ccui.RichElementText(1, cc.color("#ffed21"), 255, this._actData.totalDiamond, this.fontName, 26);
            var richTextItem2 = new ccui.RichElementText(1, cc.color("#ffffff"), 255, "钻石", this.fontName, 26);
            richText.pushBackElement(richTextItem1);
            richText.pushBackElement(richTextItem2);
            richText.setAnchorPoint(textAwardPool.getAnchorPoint());
            richText.setPosition(textAwardPool.getPosition());
            textAwardPool.getParent().addChild(richText);
        }

        //今天的操作ui
        var imgAward = this.back.getChildByName("Image_award");
        var imgNumdi = imgAward.getChildByName("Image_num_di");
        var btnDel = imgNumdi.getChildByName("Button_del"); 
        //参与份数
        var textBuyNum = imgNumdi.getChildByName("Text_num");
        textBuyNum.ignoreContentAdaptWithSize(true);
        this.textBuyNum = textBuyNum; 
        var btnAdd = imgNumdi.getChildByName("Button_add"); 
        //今天参与了的提示
        var textTodayTip =  imgAward.getChildByName("Text_tip");
        textTodayTip.visible = false;
        textTodayTip.getParent().removeChildByName("RichText_TodayTip");
        var btnBuy = imgAward.getChildByName("Button_buy");
        var textBuyMoney = btnBuy.getChildByName("Text");
        textBuyMoney.ignoreContentAdaptWithSize(true);
        //今天是否参与
        if("betsInfo" in this._actData && self._diamondManage){//
            if(self._diamondManage && self._diamondManage.isBets == 2){//今天已经参与过
                var num = self._diamondManage.betsCnt;
                imgNumdi.visible = false;
                btnBuy.visible = false;
                var richText = new ccui.RichText();
                richText.setName("RichText_TodayTip")
                var richTextItem1 = new ccui.RichElementText(1, cc.color("#733220"), 255, "今天已下注", this.fontName, 26);
                var richTextItem2 = new ccui.RichElementText(1, cc.color("#1c7625"), 255, num+"", this.fontName, 26);
                var richTextItem3 = new ccui.RichElementText(1, cc.color("#733220"), 255, "份", this.fontName, 26);
                var richTextItem4 = new ccui.RichElementText(1, cc.color("#733220"), 255, "记得明天再来哦!", this.fontName, 26);
                richText.pushBackElement(richTextItem1);
                richText.pushBackElement(richTextItem2);
                richText.pushBackElement(richTextItem3);
                richText.pushBackElement(richTextItem4);
                richText.setAnchorPoint(textTodayTip.getAnchorPoint());
                richText.setPosition(textTodayTip.getPosition());
                richText.ignoreContentAdaptWithSize(false);
                richText.width = num >= 10 ? 8 * 26 : 7 * 26;
                richText.height = textTodayTip.height;
                textTodayTip.getParent().addChild(richText);
            }else{//今天未参与可以下注
                imgNumdi.visible = true;
                btnBuy.visible = true;
                if(!textBuyNum._num){
                    textBuyNum._num = self.minNum;
                    textBuyNum.setString(textBuyNum._num+"份");
                }
                textBuyMoney.setString((textBuyNum._num * self.preNumPay)+"钻石");
                btnAdd.addTouchEventListener(function(sender,type){
                    if(type == 2){
                        textBuyNum._num++;
                        if(textBuyNum._num > self.maxNum){
                            textBuyNum._num = self.minNum;
                        }
                        textBuyNum.setString(textBuyNum._num+"份");
                        textBuyMoney.setString((textBuyNum._num * self.preNumPay)+"钻石");
                    }
                });
                btnDel.addTouchEventListener(function(sender,type){
                    if(type == 2){
                        textBuyNum._num--;
                        if(textBuyNum._num < self.minNum){
                            textBuyNum._num = self.maxNum;
                        }
                        textBuyNum.setString(textBuyNum._num+"份");
                        textBuyMoney.setString((textBuyNum._num * self.preNumPay)+"钻石");
                    }
                });
                //购买
                btnBuy.addTouchEventListener(function(sender,type){
                    if(type == 2){
                        self.toBug();
                    }
                });
            }
        }else{
            imgNumdi.visible = false;
            btnBuy.visible = false;
        }

        //昨天操作ui
        var imgHongbao = this.back.getChildByName("Image_hongbao");
        var textFinishStatus = imgHongbao.getChildByName("Image_di").getChildByName("Text_finish_status");
        textFinishStatus.ignoreContentAdaptWithSize(true);
        var textYesterdayTip = imgHongbao.getChildByName("Text_tip");
        textYesterdayTip.ignoreContentAdaptWithSize(true);
        textYesterdayTip.getParent().removeChildByName("RichText_yesterday_Tip")
        if("betsInfo" in this._actData){//
            textFinishStatus.visible = true;
            if(this._actData.betsInfo && this._actData.betsInfo.isBets){//昨天已经参与过
                textFinishStatus.setString("完成有效场次"+this._actData.betsInfo.gameEnabled+"/"+this._actData.betsInfo.gameNeedFinshed);
                if(this._actData.betsInfo.gameEnabled >= this._actData.betsInfo.gameNeedFinshed){
                    //已完成
                    textFinishStatus.setTextColor(cc.color("#fffd5b"));
                    textYesterdayTip.visible = false;
                    var richText = new ccui.RichText();
                    richText.setName("RichText_yesterday_Tip")
                    var richTextItem1 = new ccui.RichElementText(1, cc.color("#733220"), 255, "等待", this.fontName, 18);
                    var richTextItem2 = new ccui.RichElementText(1, cc.color("#1c7625"), 255, "24:00", this.fontName, 18);
                    var richTextItem3 = new ccui.RichElementText(1, cc.color("#733220"), 255, "点瓜分", this.fontName, 18);
                    richText.pushBackElement(richTextItem1);
                    richText.pushBackElement(richTextItem2);
                    richText.pushBackElement(richTextItem3);
                    richText.setAnchorPoint(textYesterdayTip.getAnchorPoint());
                    richText.setPosition(textYesterdayTip.getPosition());
                    textYesterdayTip.getParent().addChild(richText);
                }else{
                    textYesterdayTip.visible = true;
                    textFinishStatus.setTextColor(cc.color("#ffffff"));
                    textYesterdayTip.setString("任务完成，24点自动瓜分\n任务未完成，瓜分失败");
                }
            }else{//昨天未参
                textYesterdayTip.visible = true;
                textFinishStatus.setTextColor(cc.color("#ffffff"))
                textFinishStatus.setString("昨日未参与");
                textYesterdayTip.setString("今日参与，明日瓜分");
            }
        }else{
            textFinishStatus.visible = false;
            textYesterdayTip.visible = false;
        }

        //规则
        var btnRule = this.back.getChildByName("Button_rule"); 
        btnRule.addTouchEventListener(function(sender,type){
            if(type == 2){
                self.rulePanel.visible = true;
            }
        });

        //我的瓜分列表
        var bgMyAward = this.back.getChildByName("Image_di_1"); 
        var listViewMyAward = bgMyAward.getChildByName("ListView_my_award"); 
        listViewMyAward._cell = bgMyAward.getChildByName("Cell");
        listViewMyAward._cell.visible = false;
        listViewMyAward.setScrollBarEnabled(false);
        listViewMyAward.removeAllItems();
        if("craveUpList" in this._actData){
            for(var i = 0; i < this._actData.craveUpList.length; i++){
                var itemData = this._actData.craveUpList[i];
                var item = listViewMyAward._cell.clone();
                item.visible = true;
                var textCell =  item.getChildByName("Text_cell");
                var timeStr = MjClient.dateFormat(new Date(parseInt(itemData.createTime)), 'yy/MM/dd');

                if(i == 0){
                    textCell.visible = true;
                    textCell.ignoreContentAdaptWithSize(true);
                    textCell.setTextColor(cc.color("#cdb364"))
                    textCell.setString(timeStr +"-瓜分"+itemData.craveupDiamond+"钻石");
                }else{
                    textCell.visible = false;
                    var richText = new ccui.RichText();
                    richText.setName("RichText_yesterday_Tip")
                    var richTextItem1 = new ccui.RichElementText(1, cc.color("#a45644"), 255, timeStr+"-瓜分", this.fontName, 20);
                    var richTextItem2 = new ccui.RichElementText(1, cc.color("#ed1212"), 255, itemData.craveupDiamond+"", this.fontName, 20);
                    var richTextItem3 = new ccui.RichElementText(1, cc.color("#a45644"), 255, "钻石", this.fontName, 20);
                    richText.pushBackElement(richTextItem1);
                    richText.pushBackElement(richTextItem2);
                    richText.pushBackElement(richTextItem3);
                    richText.setAnchorPoint(textCell.getAnchorPoint());
                    richText.setPosition(textCell.getPosition());
                    textCell.getParent().addChild(richText);
                }
                listViewMyAward.pushBackCustomItem(item);
            }
        }
    },
    refreshOtherHisList:function(){
        if(!this._actHisData){
            this._actHisData = [];
        }
        var panelOtherAwardRecord = this.back.getChildByName("Panel_other_award_record");
        this.panelOtherAwardRecord = panelOtherAwardRecord;
        panelOtherAwardRecord.stopAllActions();

        var text1 = panelOtherAwardRecord.getChildByName("Text_1");
        var text2 = panelOtherAwardRecord.getChildByName("Text_2");
        var text3 = panelOtherAwardRecord.getChildByName("Text_3");
        if(!text1.standPos){
            text1.standPos = JSON.parse(JSON.stringify(text1.getPosition()));
        }
        if(!text2.standPos){
            text2.standPos = JSON.parse(JSON.stringify(text2.getPosition()));
        }
        if(!text3.standPos){
            text3.standPos = JSON.parse(JSON.stringify(text3.getPosition()));
        }
        text1.setPosition(text1.standPos);
        text2.setPosition(text2.standPos);
        text3.setPosition(text3.standPos);

        text1.visible = false;
        text2.visible = false;
        text3.visible = false;

        panelOtherAwardRecord.colorBright = cc.color("#fff82c");
        panelOtherAwardRecord.colorNormal = cc.color("#ff9388");
        if(this._actHisData.length == 1){
            text2.visible = true;
            text2.setString(this.getHisText(0));
            text2.setTextColor(panelOtherAwardRecord.colorBright);
        }else if(this._actHisData.length > 1){
            this.doHisAutoScrollAction(0)
        }
    },
    doHisAutoScrollAction:function(startIndex){
        var self = this;
        var panelOtherAwardRecord = this.panelOtherAwardRecord;
        panelOtherAwardRecord.stopAllActions();
        var text1 = panelOtherAwardRecord.getChildByName("Text_1");
        var text2 = panelOtherAwardRecord.getChildByName("Text_2");
        var text3 = panelOtherAwardRecord.getChildByName("Text_3");

        var textList = [text1,text2,text3];
        textList.sort(function(a,b){
            return a.y - b.y;
        });
        var dy = text2.standPos.y - text1.standPos.y;
        textList[0].setPosition(text1.standPos);
        textList[1].setPosition(text2.standPos);
        textList[2].setPosition(text3.standPos);
        textList[0].visible = true;
        textList[1].visible = true;
        textList[2].visible = false;

        textList[0].setString(this.getHisText((this._actHisData.length + startIndex -1)%this._actHisData.length));
        textList[0].setTextColor(panelOtherAwardRecord.colorNormal);
        textList[1].setString(this.getHisText((this._actHisData.length + startIndex)%this._actHisData.length));
        textList[1].setTextColor(panelOtherAwardRecord.colorBright);
        textList[2].setString(this.getHisText((this._actHisData.length + startIndex+1)%this._actHisData.length));
        textList[2].setTextColor(panelOtherAwardRecord.colorBright);

        panelOtherAwardRecord.runAction(cc.sequence(cc.delayTime(3),cc.callFunc(function(){
            textList[0].visible = true;
            textList[1].visible = true;
            textList[2].visible = true;
            textList[0].runAction(cc.moveTo(1.4,cc.p(textList[0].x,textList[0].y-dy)));
            textList[1].runAction(cc.moveTo(1.4,cc.p(textList[1].x,textList[1].y-dy)));
            textList[2].runAction(cc.moveTo(1.4,cc.p(textList[2].x,textList[2].y-dy)));
        }),cc.delayTime(1.5),cc.callFunc(function(){
            self.doHisAutoScrollAction(startIndex+1)
        })))
    },
    getHisText:function(index){
        var itemData = this._actHisData[index];
        return "恭喜"+getPlayerName(unescape(itemData.nickname))+"玩家瓜分昨日奖池"+itemData.craveupDiamond+"钻石";
    },
    initRulePanel:function(){
        var self = this;
        this.rulePanel = this.node.getChildByName("rulePanel");
        setWgtLayout(this.rulePanel, [1, 1], [0.5, 0.5], [0, 0],false);
        this.rulePanel.visible = false;
        var block = this.rulePanel.getChildByName("block");
        block.addTouchEventListener(function(sender,type){
            if(type == 2){
                self.rulePanel.visible = false;
            }
        })
    }
});

var UserGrowth_actQiFu = cc.Layer.extend({
    fontName:"fonts/lanting.TTF",
    ctor: function(pinfo){
        this._super();
        var self = this;
        this.pinfo = pinfo;
        var node = ccs.load("userGrowth_actQiFu.json").node;
        this.node = node;
        this.addChild(node);
        this._data = {};

        this.back = node.getChildByName("back");
        this.block = node.getChildByName("block")
        setWgtLayout(this.block, [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(this.back, [1, 1], [0.5, 0.5], [0, 0]);
        var close = this.back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                self.removeFromParent(true);
            }
        }, this);

        var bg_list = this.back.getChildByName("img_list");
        this.listView = bg_list.getChildByName("ListView_1");
        this.listView.setScrollBarOpacity(0);
        this.listView.setScrollBarEnabled(false)
        this.cell = bg_list.getChildByName("Text_cell");
        this.cell.visible = false;

        this.btn_lv1 = this.back.getChildByName("btn_1");
        this.btn_lv1.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(this.pinfo.userGrade < 5){
                    MjClient.showToast("贵族5可解锁");
                    return;
                }
                self.reqQiFu(1);
            }
        }, this);
        this.text_lv1= this.btn_lv1.getChildByName("Text_1");
        this.text_lv1.setString("");


        this.btn_lv2 = this.back.getChildByName("btn_2");
        this.btn_lv2.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(this.pinfo.userGrade < 7){
                    MjClient.showToast("贵族7可解锁");
                    return;
                }
                self.reqQiFu(2);
            }
        }, this);
        this.text_lv2= this.btn_lv2.getChildByName("Text_1");
        this.text_lv2.setString("");
        // Text_can1
        this.text1 = this.back.getChildByName("Text_can1");
        this.text1.visible = false;
        this.text2 = this.back.getChildByName("Text_can2");
        this.text2.visible = false;
        
        this.img_suo2 = this.back.getChildByName("img_suo2");
        this.img_suo2.visible = false;

        this.img_suo1 = this.back.getChildByName("img_suo1");
        this.img_suo1.visible = false;

        this.reqFuDaiData();

    },

    init_fudai:function(allData, type){
        if(type == 0){
            this.text_lv1.setString(allData.type1ConsumeHpCy);
            this.text_lv2.setString(allData.type2ConsumeHpCy);
            var data = allData.list;
            for (let index = 0; index < data.length; index++) {
                var type2 = data[index].type;
                cc.log("=== lms --- ",type2);
                if(type2 == 1){
                    this.btn_lv1.visible = false;
                    this.text1.visible = true;
                }else if(type2 == 2){
                    this.btn_lv2.visible = false;
                    this.text2.visible = true;
                }
                
            }
        }
        else{
            if(type == 1){
                this.btn_lv1.visible = false;
                this.text1.visible = true;
            }else if(type == 2){
                this.btn_lv2.visible = false;
                this.text2.visible = true;
            }
        }
        

        
        
        // 添加数据列表
        if(this.pinfo.userGrade < 5){
            // this.btn_lv1.visible = false;
            // this.text1 = false;
            this.img_suo1.visible = true;
        }

        if(this.pinfo.userGrade < 7){
            // this.btn_lv2.visible = false;
            // this.text2 = false;
            this.img_suo2.visible = true;
        }


    },

    getPrizeStr: function (data) {
        if (data.extend.attr == "none") {
            return "  未中奖";
        } else if (data.extend.attr == "diamond") {
            return "  祈福获得" + data.extend.value + "钻石";
        } else if (data.extend.attr == "hpCy") {
            return "  祈福获得" + data.extend.value + "乐币";
        } else if (data.extend.attr == "recharge") {
            return "  祈福获得" + data.extend.value + "话费";
        } else if (data.extend.attr == "redpacket") {
            return "  祈福获得" + data.extend.value + "红包";
        } else if (data.extend.attr == "empirical") {
            return "  祈福获得" + data.extend.value + "经验";
        } else if (data.extend.attr == "prop1") {
            return "  祈福获得聊天表情";
        }else if(data.extend.attr == "prop1"){
            return "  祈福获得互动表情";
        }else{
            return "  祈福获得"+ data.title;
        }

    },
    init_list:function(data){
        this.listView.removeAllItems();
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            var _str = "";
            var timeStr = MjClient.dateFormat(new Date(parseInt(element.createTime)), 'yy/MM/dd');

            var getStr = this.getPrizeStr(element)
            _str = timeStr + getStr;
            var cell = this.cell.clone();
            cell.visible = true;
            cell.setString(_str);
            this.listView.pushBackCustomItem(cell);
            
        }
        
    },

    //打开界面时请求数据
    reqFuDaiData:function(){
        var self = this;
        MjClient.block();
        var sendInfo = {}
        MjClient.gamenet.request("pkplayer.handler.userTodayBlessingInfo", sendInfo,
        function(rtn) {
            MjClient.unblock();
            if(!cc.sys.isObjectValid(self)){
                return;
            }
            if (rtn.code == 0){
                self.init_fudai(rtn.data, 0);
            }else{
                if(rtn.message){
                    MjClient.showToast(rtn.message+"")
                }
            }
            self.reqHistory();
        });
    },

    //点击领取福袋 
    reqQiFu:function(type){
        var self = this;
        MjClient.block();
        var sendInfo = {level:type}
        MjClient.gamenet.request("pkplayer.handler.userBlessingOpen", sendInfo,
        function(rtn) {
            MjClient.unblock();
            if(!cc.sys.isObjectValid(self)){
                return;
            }
            if (rtn.code == 0){
                self.init_fudai(rtn.data, type);
                self.addChild(new UserGrowth_actQiFu_reward(rtn.data, self.pinfo));
                self.reqHistory(1);
                
            }else{
                if(rtn.message){
                    MjClient.showToast(rtn.message+"")
                }

                if(rtn.message == "账户乐币值不足"){
                    self.addChild(new UserInfo_exChangeMoney());
                }
            }

        });
    },

    reqHistory:function(type){
        var self = this;
        MjClient.block();
        var sendInfo = {}
        MjClient.gamenet.request("pkplayer.handler.userBlessingInfo", sendInfo,
        function(rtn) {
            MjClient.unblock();
            if(!cc.sys.isObjectValid(self)){
                return;
            }
            if (rtn.code == 0){
                self.init_list(rtn.data);
            }else{
                if(rtn.message){
                    MjClient.showToast(rtn.message+"")
                }
            }            

        });
    },


});

var UserGrowth_actQiFu_reward = cc.Layer.extend({
    ctor:function(allData, pinfo){
        this._super();
        var self = this;
        var data = allData.extend;
        var node = ccs.load("userGrowth_actQiFu_reward.json").node;
        this.node = node;
        this.addChild(node);

        this.back = node.getChildByName("back");
        this.block = node.getChildByName("block")
        setWgtLayout(this.block, [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(this.back, [1, 1], [0.5, 0.5], [0, 0]);

        this.back.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                self.removeFromParent(true);
            }
        }, this);

        for (let index = 0; index < 7; index++) {
            this["node_" + index] = this.back.getChildByName("node_" + index);
            this["node_" + index].visible = false;            
        }
        var getType = function(){
            if(data.attr == "none"){
                return 0;
            }else if(data.attr == "diamond"){
                return 1;
            }else if(data.attr == "prop1"){
                return 5;
                
            }else if(data.attr == "prop2"){
                return 5;
                
            }else if(data.attr == "hpCy"){
                return 3;
                
            }else if(data.attr == "recharge"){
                return 2;
                
            }else if(data.attr == "empirical"){
                return 4;
                
            }else if(data.attr == "redpacket"){
                return 6;
                
            }
            
        }
        var _number = getType();
        this["node_" + _number].visible = true;
        var _text1 = this["node_" + _number].getChildByName("Text_1");
        _text1.ignoreContentAdaptWithSize(true);
        if(data.value){
            _text1.setString(data.value);
            if(_number == 2) _text1.setString(data.value + "元");
        }
            

        var _text3 = this["node_" + _number].getChildByName("Text_3");
        if(_text3){
            _text3.ignoreContentAdaptWithSize(true);
            _text3.setString("X" + data.multi);
        }
        
        if( 5 === _number){
            var _text2 = this["node_" + _number].getChildByName("Text_2");
            _text2.visible = false;
            var _iamge = this["node_" + _number].getChildByName("Image_2");
            if(data.attr == "prop2"){
                _text1.setString("互动道具");
                _iamge.loadTexture("userInfo_3.0/zhuangBan/tools/" + data.aliasId + ".png");
                self.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
                    if(cc.sys.isObjectValid(MjClient.userInfoLayerUi) && MjClient.userInfoLayerUi.reqZhuangBanDJ_data){
                        MjClient.userInfoLayerUi.reqZhuangBanDJ_data(1);
                    }
                })))
            }else{
                _text1.setString("聊天表情");
                _iamge.loadTexture("userInfo_3.0/zhuangBan/chat_emoji/" + data.aliasId + ".png");
                self.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
                    if(cc.sys.isObjectValid(MjClient.userInfoLayerUi) && MjClient.userInfoLayerUi.reqZhuangBanBQ_data){
                        MjClient.userInfoLayerUi.reqZhuangBanBQ_data(1);
                    }
                })))
            }
            if(data.isConvert && data.convertHpCy){
                _text2.visible = true;
                _text2.setString("已拥有，折算成" + data.convertHpCy + "乐币")
            }
            
            
            
        }
        // 没有绑定电话号码的 弹绑定电话号码
        if(2 === _number && !pinfo.mobileNum){
            MjClient.showToast("请先绑定充值电话号码");
            this.addChild(new bindPhoneNumNewLayer());
        }

        // if(getType() == 0){
        //     this["node_0"].visible = false;

        // }else if(getType() == 0){

        // }





    },
});

var UserGrowth_remainInfoLayer = cc.Layer.extend({

    ctor: function(data) {
        this._super();
        var UI = ccs.load("ShopOfJiFen_info_2.json");
        this.addChild(UI.node);
        var self = this;
        this._select = {};
        this._select.province = ""; 
        this._select.city = ""; 
        this._select.district = "";
        this._select.number = 1;
        var allData = {};
        allData.addressInfo = data;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);

        var closeBtn = _back.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                playEffect("ShopOfJiFen/click_btn", false);
                self.removeFromParent();
            }
        });

        this.bg_info = _back.getChildByName("bg_infolist");
        this.info_list = this.bg_info.getChildByName("info_list");
        this.info_list_2 = this.bg_info.getChildByName("info_list_2");
        this.info_list_3 = this.bg_info.getChildByName("info_list_3");
        this.info_list.height = 435;
        this.info_list.y += 13;
        this.info_cell = this.bg_info.getChildByName("info_cell");
        this.info_cell.setVisible(false);
        this.bg_info.visible = false;
        this.bg_info.setZOrder(1);

        var input_ren = _back.getChildByName("input_ren");
        this.input_ren = new cc.EditBox(cc.size(575, 42), new cc.Scale9Sprite("ShopOfJiFen/input_1.png"));
        this.input_ren.setFontColor(cc.color(0x8c, 0x15, 0x15));
        this.input_ren.setMaxLength(20);
        this.input_ren.setFontSize(20);
        this.input_ren.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_ren.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        this.input_ren.setPlaceHolder("请输入收货人名字");
        this.input_ren.setPlaceholderFontSize(18);
        this.input_ren.setPosition(input_ren.getContentSize().width / 2, input_ren.getContentSize().height / 2);
        input_ren.addChild(this.input_ren);
        if (allData.addressInfo && allData.addressInfo.realname) {
            this.input_ren.setString(allData.addressInfo.realname);
        }


        var input_number = _back.getChildByName("input_number");
        this.input_number = new cc.EditBox(cc.size(575, 42), new cc.Scale9Sprite("ShopOfJiFen/input_1.png"));
        this.input_number.setFontColor(cc.color(0x8c, 0x15, 0x15));
        this.input_number.setMaxLength(11);
        this.input_number.setFontSize(20);
        this.input_number.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_number.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this.input_number.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        this.input_number.setPlaceHolder("请输入收货人电话");
        this.input_number.setPlaceholderFontSize(18);
        this.input_number.setPosition(input_number.getContentSize().width / 2, input_number.getContentSize().height / 2);
        input_number.addChild(this.input_number);
        if (allData.addressInfo && allData.addressInfo.mobileNum) {
            this.input_number.setString(allData.addressInfo.mobileNum);
        }

        var input_dizhi = _back.getChildByName("input_dizhi");
        this.input_dizhi = new cc.EditBox(cc.size(575, 93), new cc.Scale9Sprite("ShopOfJiFen/input_2.png"));
        this.input_dizhi.setFontColor(cc.color(0x8c, 0x15, 0x15));
        this.input_dizhi.setMaxLength(50);
        this.input_dizhi.setFontSize(20);
        this.input_dizhi.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_dizhi.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        this.input_dizhi.setPlaceHolder("如乡镇、街道、门牌号等");
        this.input_dizhi.setPlaceholderFontSize(18);
        this.input_dizhi.setPosition(input_dizhi.getContentSize().width / 2, input_dizhi.getContentSize().height / 2);
        input_dizhi.addChild(this.input_dizhi);
        if (allData.addressInfo && allData.addressInfo.address) {
            var str = allData.addressInfo.address.split(",");
            this.input_dizhi.setString(str[1]);
        }

        var input_dizhi_2 = _back.getChildByName("input_dizhi_2");
        input_dizhi_2.setTouchEnabled(true);
        input_dizhi_2.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.bg_info.visible = true;
                this.fresh_listView();
            }
        }, this);
        var icon_arrow = input_dizhi_2.getChildByName("img_arrow");
        icon_arrow.setZOrder(2);
        this.input_dizhi_2 = new cc.EditBox(cc.size(575, 42), new cc.Scale9Sprite("ShopOfJiFen/input_1.png"));
        this.input_dizhi_2.setFontColor(cc.color(0x8c, 0x15, 0x15));
        this.input_dizhi_2.setMaxLength(50);
        this.input_dizhi_2.setFontSize(20);
        this.input_dizhi_2.setPlaceHolder("所在地区");
        this.input_dizhi_2.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_dizhi_2.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        if (allData.addressInfo && allData.addressInfo.address) {
            var str = allData.addressInfo.address.split(",");
            this.input_dizhi_2.setString(str[0]);
        }

        if (allData.addressInfo && allData.addressInfo.addressCode) {
            var _address = allData.addressInfo.addressCode.split(",");
            if (_address[0] || _address[0] === 0) {
                this._select.province = _address[0];
            }
            if (_address[1] || _address[1] === 0) {
                this._select.city = _address[1];
            }
            if (_address[2] || _address[2] === 0) {
                this._select.district = _address[2];
            }
        }

        this.input_dizhi_2.setPlaceholderFontSize(18);
        this.input_dizhi_2.setPosition(input_dizhi_2.getContentSize().width / 2, input_dizhi_2.getContentSize().height / 2);
        input_dizhi_2.addChild(this.input_dizhi_2);
        this.input_dizhi_2.setTouchEnabled(false);
        this.input_dizhi_2.setSwallowTouches(false);

        var btn_yes = _back.getChildByName("btn_yes");

        btn_yes.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                playEffect("ShopOfJiFen/click_btn", false);
                var str_1 = this.input_number.getString();
                var str_2 = this.input_dizhi.getString();
                var str_3 = this.input_ren.getString();
                var str_4 = this.input_dizhi_2.getString();
                if (!str_1 || !str_2 || !str_3 || !str_4) {
                    MjClient.showToast("请填写完整的地址信息！");
                    return;
                }
                var province = this._select.province;
                var city = this._select.city;
                var district = this._select.district;
                if (this._select.province === "" || this._select.city === "" ||this._select.district === "") {
                    // cc.log(" ====== this._select.province  ",this._select.province == "",this._select.city== "",this._select.district== "")
                    MjClient.showToast("请填写完整所在地区地址！");
                    return;
 
                }


                var param = {};
                param.realname = this.input_ren.getString();
                param.mobileNum = this.input_number.getString();
                param.address = this.input_dizhi_2.getString() + "," + this.input_dizhi.getString();
                param.addressCode = province + "," + city + "," + district;
                // if(allData.addressInfo.addrId)
                //     param.addrId = allData.addressInfo.addrId;
                // if(allData.addressInfo.addressCode){
                //     this.reqAddressUpdata(param);
                // }else
                // {
                //     this.reqAddress(param);
                // }

                this.reqAddress(param);
                
            }
        }, this);

        this.btn_sheng = this.bg_info.getChildByName("btn_1");
        this.btn_sheng.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this._select.number = 1;
                this.addItems(this._select);
            }
        }, this);
        this.btn_shi = this.bg_info.getChildByName("btn_2");
        this.btn_shi.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this._select.number = 2;
                this.addItems(this._select);
            }
        }, this);

        this.btn_xian = this.bg_info.getChildByName("btn_3");

        this.btn_yes2 = this.bg_info.getChildByName("btn_yes2");
        this.btn_yes2.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var data = this._select;
                var area_1 = GameConfig_area.root.province[data.province];
                var str_1 = "";
                var str_2 = "";
                var str_3 = "";
                if (area_1 && area_1.name) {
                    str_1 = area_1.name;
                    if (area_1.city[data.city] && area_1.city[data.city].name) {
                        str_2 = area_1.city[data.city].name;
                        if (area_1.city[data.city].district[data.district] && area_1.city[data.city].district[data.district].name) {
                            str_3 = area_1.city[data.city].district[data.district].name;
                        }
                    }
                }
                var str = str_1 + str_2 +str_3;
                this.input_dizhi_2.setString(str);
                this.bg_info.visible = false;
            }
        }, this);

        this.btn_close = this.bg_info.getChildByName("btn_close");
        this.btn_close.addTouchEventListener(function(sender, type){
            if(type == 2){
                this.bg_info.visible = false;
            }
        },this)
    },

    fresh_listView: function(number) {
        // if (this._select.district || this._select.district === 0) {
        //     this._select.number = 3;
        // }else if (this._select.city || this._select.city === 0) {
        //     this._select.number = 2;
        // }else 
        // {
        //     this._select.number = 1;
        // }
        this._select.number = 1;
        this.addItems(this._select);
        
    },
    select_district: function(number) {
        this.btn_sheng.loadTextureNormal("ShopOfJiFen/btnCity_n.png");
        this.btn_shi.loadTextureNormal("ShopOfJiFen/btnCity_n.png");
        this.btn_xian.loadTextureNormal("ShopOfJiFen/btnCity_n.png");
        if (number == 1) {
            this.btn_sheng.loadTextureNormal("ShopOfJiFen/btnCity_s.png");
            this.btn_sheng.setTitleText("请选择省份");
            this.btn_shi.setTitleText("请选择城市");
            this.btn_xian.setTitleText("请选择县/区");
        } else if (number == 2) {
            this.btn_shi.loadTextureNormal("ShopOfJiFen/btnCity_s.png");
            this.btn_shi.setTitleText("请选择城市");
            this.btn_xian.setTitleText("请选择县/区");
        } else if (number >= 3) {
            this.btn_xian.loadTextureNormal("ShopOfJiFen/btnCity_s.png");
        }
    },
    addItems: function(data) {
        var dataList = null;
        var i = 0;
        this.info_list_3.removeAllItems();
        if (data.number == 1) {
            this.info_list.removeAllItems();
            this.select_district(data.number);
            this._select.city = "";
            this._select.district = "";
            dataList = GameConfig_area.root.province;
            for (i = 0; i < dataList.length; i++) {
                this.info_list.pushBackCustomItem(this.createItems(dataList[i], i, 1, dataList.length));
            }
            this.info_list_2.removeAllItems();
        } else if (data.number == 2 && data.province >= 0) {
            var _area = GameConfig_area.root.province[data.province];
            if (!_area) {
                return;
            }
            this.select_district(data.number);
            this.info_list_2.removeAllItems();
            if (_area.name.length > 11) {
                var _name = _area.name.substring(0, 11);
                _name += "...";
                this.btn_sheng.setTitleText(_name);
            } else {
                this.btn_sheng.setTitleText(_area.name);
            }
            this._select.district = "";
            dataList = _area.city;
            for (i = 0; i < dataList.length; i++) {
                this.info_list_2.pushBackCustomItem(this.createItems(dataList[i], i, 2, dataList.length));
            }
        } else if (data.number == 3 && data.province >= 0 && data.city >= 0) {
            var area = GameConfig_area.root.province[data.province].city[data.city];
            if (!area) {
                return;
            }
            this.select_district(data.number);
            this.info_list_3.removeAllItems();
            var _area = GameConfig_area.root.province[data.province];
            if (_area.name.length > 11) {
                var _name = _area.name.substring(0, 11);
                _name += "...";
                this.btn_sheng.setTitleText(_name);
            } else {
                this.btn_sheng.setTitleText(_area.name);
            }
            if (area.name.length > 11) {
                var _name = area.name.substring(0, 11);
                _name += "...";
                this.btn_shi.setTitleText(_name);
            } else {
                this.btn_shi.setTitleText(area.name);
            }
            var area2 = _area.city[data.city].district[data.district];
            if (area2) {
                if (area2.name.length > 11) {
                    var _name2 = area2.name.substring(0, 11);
                    _name2 += "...";
                    this.btn_xian.setTitleText(_name2);
                } else {
                    this.btn_xian.setTitleText(area2.name);
                }
            }
            
            dataList = area.district;
            for (i = 0; i < dataList.length; i++) {
                this.info_list_3.pushBackCustomItem(this.createItems(dataList[i], i, 3, dataList.length));
            }
        } else if (data.number == 4) {
            this.select_district(data.number);
            var area_1 = GameConfig_area.root.province[data.province];
            var str = area_1.name + area_1.city[data.city].name + area_1.city[data.city].district[data.district].name;
            this.input_dizhi_2.setString(str);
            this.bg_info.visible = false;
            var area2 = area_1.city[data.city].district[data.district];
            if (area2.name.length > 11) {
                var _name2 = area2.name.substring(0, 11);
                _name2 += "...";
                this.btn_xian.setTitleText(_name2);
            } else {
                this.btn_xian.setTitleText(area2.name);
            }

            
        }
    },


    createItems: function(oneData, number, number_area, dataLen) {
        var self = this;
        if(!this["area_" + number_area]) this["area_" + number_area] = {};
        var copyNode = this.info_cell.clone();
        copyNode.visible = true;
        copyNode.getChildByName("Image_bg").visible = false;
        copyNode.setTouchEnabled(true);
        copyNode.setTag(number);
        copyNode.len = dataLen;
        copyNode.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var tag = sender.getTag();
                if (number_area == 1) {
                    this._select.province = tag;

                } else if (number_area == 2) {
                    this._select.city = tag;
                } else if (number_area == 3) {
                    this._select.district = tag;
                }
                for (var i = 0; i < sender.len; i++) {
                    self["area_" + number_area][i] .getChildByName("Image_bg").visible = false;
                    if(i == tag)
                        self["area_" + number_area][i] .getChildByName("Image_bg").visible = true;
                    
                }
                
                this._select.number = number_area + 1;
                this.addItems(this._select);

            }
        }, this);
        var text = copyNode.getChildByName("Text_1");
        if (oneData.name.length > 9) {
            var _name = oneData.name.substring(0, 8);
            _name += "...";
            text.setString(_name);
        } else {
            text.setString(oneData.name);
        }

        
        
        this["area_" + number_area][number] = copyNode;
        return copyNode;
    },
    reqAddress:function(data){
        var self = this;
        MjClient.block();

        MjClient.gamenet.request("pkplayer.handler.userAddressCreate", data,
        function(rtn) {
            MjClient.unblock();
            if(!cc.sys.isObjectValid(self)){
                return;
            }
            if (rtn.code == 0){
                MjClient.showToast("地址保存成功");
                if(MjClient.GrowthDuoBao_ui){
                    MjClient.GrowthDuoBao_ui.addressData = data;
                }

            }else{
                if(rtn.message){
                    MjClient.showToast(rtn.message+"")
                }
            }
            self.removeFromParent();
            
        });
    },

    reqAddressUpdata:function(data){
        var self = this;
        MjClient.block();

        MjClient.gamenet.request("pkplayer.handler.userAddressUpdate", data,
        function(rtn) {
            MjClient.unblock();
            if(!cc.sys.isObjectValid(self)){
                return;
            }
            if (rtn.code == 0){
                MjClient.showToast("地址保存成功");

            }else{
                if(rtn.message){
                    MjClient.showToast(rtn.message+"")
                }
            }
            self.removeFromParent();
            
        });
    },


});

var UserGrowth_actDuoBao = cc.Layer.extend({
    onExit:function(){
        this._super();
        MjClient.GrowthDuoBao_ui = null;
    },
    ctor:function(pinfo, data){
        this._super();
        var self = this;
        this.pinfo = MjClient.data.pinfo;
        self.indexId = 0;
        var node = ccs.load("userGrowth_actDuoBao.json").node;
        this.node = node;
        this.addChild(node);
        this.addressData = null;
        MjClient.GrowthDuoBao_ui = this;
        this.data = data;

        this.back = node.getChildByName("back");
        this.block = node.getChildByName("block")
        setWgtLayout(this.block, [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(this.back, [1, 1], [0.5, 0.5], [0, 0]);

        var close = this.back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                self.removeFromParent(true);
                    
            }
        }, this);

        this.ListView_1 = this.back.getChildByName("ListView_1");
        this.cell_1 = this.back.getChildByName("cell_1");
        this.cell_1.visible = false;
        var _listViewState = 0;
        this.ListView_1.setScrollBarWidth(5);
        this.ListView_1.addCCSEventListener(function(sender, type) {
            switch (type) {
                case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                    if (_listViewState == 0) {
                        _listViewState = 1;
                    }
                    break;
                case ccui.ScrollView.EVENT_AUTOSCROLL_ENDED:
                    if (_listViewState == 1) {
                        self.req_list(self.indexId, 10);
                    }
                    _listViewState = 0;
                    break;
            }
        });
        this.node_info = this.back.getChildByName("node_info");
        this.node_info.visible = false;
        
        this.btn_1 = this.back.getChildByName("btn_1");
        this.btn_1.visible = false;

        this.btn_2 = this.back.getChildByName("btn_2");
        this.btn_2.visible = false;

        this.btn_2 = this.back.getChildByName("btn_2");
        this.btn_2.visible = false;

        this.img_prize = this.back.getChildByName("img_prize");
        this.img_prize.visible = false;

        this.isFinishImg = this.back.getChildByName("isFinishImg");
        this.isFinishImg.visible = false;
        

        var btn_dizhi = this.back.getChildByName("btn_dizhi");
        btn_dizhi.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.reqAdressData();
            }
        }, this);
        // var title = this.back.getChildByName("title");
        // title.visible = false;

        if(data){
            this.init_view(data);
            self.req_list();
        }else{
            this.req_data();
        }
        

        UIEventBind(null, this, "user_treasure_activity", function(d) {
            self.req_data();
        });


        return true;
    },
    
    reqAdressData:function(type){
        var self = this;
        MjClient.block();

        MjClient.gamenet.request("pkplayer.handler.userAddressList", {},
        function(rtn) {
            MjClient.unblock();
            if(!cc.sys.isObjectValid(self)){
                return;
            }
            if (rtn.code == 0){
                self.addressData = rtn.data[0];
                if(type == 1){
                    return;
                }else{
                    self.addChild(new UserGrowth_remainInfoLayer(rtn.data[0]));
                }
                

            }else{
                if(rtn.message){
                    MjClient.showToast(rtn.message+"")
                }
            }
            
        });
    },

    init_view:function(data){
        var self = this;
        var node = this.node_info;
        var title = this.back.getChildByName("title_0");
        title.ignoreContentAdaptWithSize(true);
        title.setString(data.treaInfo.title);
        // title.setString(data.treaInfo.title +"");
        var rule = this.back.getChildByName("rule");
        var str = "购买" + data.treaInfo.openNums + "份后开奖  " + data.treaInfo.hasNums + "/" + data.treaInfo.openNums;
        rule.setString(str);

        var buy = node.getChildByName("buy");
        buy.setString(data.userTreaInfo.nums);

        var per = node.getChildByName("per");
        per.setString((data.userTreaInfo.probability*100).toFixed(2) + "%");

        if(data.treaInfo.isFinish){
            node.visible = false;
            this.isFinishImg.visible = true;
        }else{
            node.visible = true;
            this.isFinishImg.visible = false;
        }

        var headicon = this.img_prize;
        var url = data.treaInfo.prizeImg;
        cc.loader.loadImg(url, {
            isCrossOrigin: true
        }, function(err, texture) {
            if (!err && texture && cc.sys.isObjectValid(headicon)) {
                var sp = new cc.Sprite(texture);
                sp.x = headicon.x;
                sp.y = headicon.y;
                sp.setScaleX(headicon.width/sp.width);
                sp.setScaleY(headicon.height/sp.height);
                self.back.addChild(sp);
                
            }
        });
        this.btn_1.visible = true;
        this.btn_2.visible = true;
        var guizu_1 = this.btn_1.getChildByName("img_2");
        var grade1 = data.treaDetail[0].userGrade ? data.treaDetail[0].userGrade : data.treaDetail[0].useGrade;
        guizu_1.loadTexture("userInfo_3.0/guiZu/gz_0" + grade1 + ".png");

        var text_1 = this.btn_1.getChildByName("Text_1");
        text_1.setString(data.treaDetail[0].amount);

        var Text_num = this.btn_1.getChildByName("Text_num");
        Text_num.setString(data.treaDetail[0].limitNums);

        var guizu_2 = this.btn_2.getChildByName("img_2");
        var grade2 = data.treaDetail[1].userGrade ? data.treaDetail[1].userGrade : data.treaDetail[1].useGrade;
        guizu_2.loadTexture("userInfo_3.0/guiZu/gz_0" + grade2 + ".png");

        var Text_num2 = this.btn_2.getChildByName("Text_num");
        Text_num2.setString(data.treaDetail[1].limitNums);

        var text_2 = this.btn_2.getChildByName("Text_1");
        text_2.setString(data.treaDetail[1].amount);
        this.btn_1.tag = data.treaDetail[0].treaConfId; //(data.treaInfo.id);
        this.btn_1.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(data.treaInfo.isFinish){
                    MjClient.showToast("本期活动已经结束");
                    return;
                }
                if(!this.addressData){
                    MjClient.showToast("请先填写您的地址");
                    this.reqAdressData();
                    return ;
                }
                if(this.pinfo.userGrade < data.treaDetail[0].userGrade){
                    MjClient.showToast("贵族" + data.treaDetail[0].userGrade + "可参与");
                    return;
                }
                this.req_duoBaoCreate(sender.tag);
            }
        }, this);

        this.btn_2.tag = data.treaDetail[1].treaConfId;//(data.treaInfo.id);
        this.btn_2.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(data.treaInfo.isFinish){
                    MjClient.showToast("本期活动已经结束");
                    return;
                }
                if(!this.addressData){
                    MjClient.showToast("请先填写您的地址");
                    this.reqAdressData();
                    return;
                }

                if(this.pinfo.userGrade < data.treaDetail[1].userGrade){
                    MjClient.showToast("贵族" + data.treaDetail[1].userGrade + "可参与");
                    return;
                }
                this.req_duoBaoCreate(sender.tag);
            }
        }, this);

    },

    addHead: function(url, head) {
        cc.loader.loadImg(url ? url : "png/default_headpic.png", {
            isCrossOrigin: true
        }, function(err, texture) {
            if (err || !texture || !sys.isObjectValid(head))
                return;

            var sp = new cc.Sprite(texture);
            if (!sp)
                return;

            sp.setScale((head.width - 8) / sp.width);
            sp.setPosition(cc.p(head.width / 2, head.height / 2));
            head.addChild(sp);
        });
    },

    init_list:function(data){
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            this.ListView_1.pushBackCustomItem(this.addItems(element));
            
        }

    },

    addItems: function (oneData) {
        if (!cc.sys.isObjectValid(this.cell_1)) return;
        var copyNode = this.cell_1.clone();
        copyNode.visible = true;

        
        var head = copyNode.getChildByName("headImg");
        this.addHead(oneData.headimgurl, head);

        var _Text_name = copyNode.getChildByName("name");
        var _nameStr = unescape(oneData.nickname);
        _Text_name.setString(getNewName(_nameStr, 6));
        _Text_name.ignoreContentAdaptWithSize(true);

        var icon_guizu = copyNode.getChildByName("guizu");
        icon_guizu.loadTexture("userInfo_3.0/guiZu/gz_0" + oneData.userGrade + ".png");

        var Text_time = copyNode.getChildByName("time");
		Text_time.ignoreContentAdaptWithSize(true);
		var timeStr = MjClient.dateFormat(new Date(parseInt(oneData.lotteryTime)), 'yyyy/MM/dd hh:mm');
        Text_time.setString("" + timeStr);
        
        var text_reward = copyNode.getChildByName("reward");
        text_reward.ignoreContentAdaptWithSize(true);
        text_reward.setString(oneData.title);

        this.indexId = oneData.id;
        return copyNode;

    },

    req_duobao:function(){
        var self = this;
        var treaId = this.data.treaInfo.id;
        MjClient.block();

        MjClient.gamenet.request("pkplayer.handler.userTreasureLottery", {treaId:treaId},
        function(rtn) {
            MjClient.unblock();
            if(!cc.sys.isObjectValid(self)){

                return;
            }
            if (rtn.code == 0){

                MjClient.showToast("成功参与");

            }else{
                if(rtn.message){
                    MjClient.showToast(rtn.message+"")
                }
            }
            
        });
    },
    //pkplayer.handler.userTreasureCreate
    fresh_info:function(data){
        var self = this;
        var node = this.node_info;
        var rule = this.back.getChildByName("rule");
        var str = "购买" + data.openNums + "份后开奖  " + data.hasNums + "/" + data.openNums;
        rule.setString(str);

        var buy = node.getChildByName("buy");
        buy.setString(data.nums);

        var per = node.getChildByName("per");
        per.setString(data.probability*100 + "%");

    },
    req_duoBaoCreate:function(treaId){
        var self = this;
        MjClient.block();
        cc.log(" =====  pkplayer.handler.userTreasureCreat ",treaId)
        MjClient.gamenet.request("pkplayer.handler.userTreasureCreate", {treaConfId:treaId},
        function(rtn) {
            MjClient.unblock();
            if(!cc.sys.isObjectValid(self)){
                return;
            }
            if (rtn.code == 0){
                self.fresh_info(rtn.data);
                if(rtn.data.isLottery === 1){
                    self.req_duobao();
                }else{
                    MjClient.showToast("成功参与");
                }

            }else{
                if(rtn.message){
                    MjClient.showToast(rtn.message+"")
                }
                if(rtn.message == "乐币不足"){
                    self.addChild(new UserInfo_exChangeMoney());
                }
            }
            
        });
    },

    req_list:function(){
        var index = this.indexId;
        var self = this;
        MjClient.block();

        MjClient.gamenet.request("pkplayer.handler.userTreasureLotteryList", {lastIndex :index, length: 10},
        function(rtn) {
            MjClient.unblock();
            if(!cc.sys.isObjectValid(self)){
                return;
            }
            if (rtn.code == 0){
                self.init_list(rtn.data)

            }else{
                if(rtn.message){
                    MjClient.showToast(rtn.message+"")
                }
            }
            self.reqAdressData(1);
            
        });
    },

    req_data:function(){
        var self = this;
        MjClient.block();

        MjClient.gamenet.request("pkplayer.handler.userTreasureBaseInfo", {},
        function(rtn) {
            MjClient.unblock();
            if(!cc.sys.isObjectValid(self)){
                return;
            }
            if (rtn.code == 0){
                self.init_view(rtn.data);

            }else{
                if(rtn.message){
                    MjClient.showToast(rtn.message+"")
                }
            }
            self.req_list();
            
        });
    },
});
//这个类 放着贵族里面监听
var UserGrowth_actDuoBao_check = cc.Layer.extend({

    ctor:function(lotteryId){
        this._super();
        var self = this;
        this.lotteryId = lotteryId;
        self.indexId = 0;
        var node = ccs.load("userGrowth_actDuoBao_check.json").node;
        this.node = node;
        this.addChild(node);
        this.addressData = null;
        MjClient.GrowthDuoBao_ui = this;

        this.back = node.getChildByName("back");
        this.block = node.getChildByName("block")
        setWgtLayout(this.block, [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(this.back, [1, 1], [0.5, 0.5], [0, 0]);

        var close = this.back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                self.removeFromParent(true);
            }
        }, this);

        this.init_check();
        return true;
    },

    init_check:function () {
        var self = this;

        var _fontSize = 24;
        //手机号码输入框
        var imagePhoneNum = this.back.getChildByName("Image_phoneNum");
        this._bindPhoneNum0 = new cc.EditBox(cc.size(imagePhoneNum.width, imagePhoneNum.height), new cc.Scale9Sprite("store/into_number.png"));
        // this._bindPhoneNum0.setPlaceholderFontSize(24);
        this._bindPhoneNum0.setMaxLength(11);
        this._bindPhoneNum0.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._bindPhoneNum0.setPlaceHolder("请输入手机号码");
        this._bindPhoneNum0.setPosition(imagePhoneNum.getContentSize().width/2, imagePhoneNum.getContentSize().height/2);
        imagePhoneNum.addChild(this._bindPhoneNum0);
        this._bindPhoneNum0.setFont("fonts/lanting.TTF", _fontSize);
        this._bindPhoneNum0.setPlaceholderFont("fonts/lanting.TTF", _fontSize);

        //验证码
        var imageSecurityCode = this.back.getChildByName("Image_securityCode");
        this._hintNum0 = new cc.EditBox(cc.size(imageSecurityCode.width, imageSecurityCode.height), new cc.Scale9Sprite("store/into_number.png"));
        // this._hintNum0.setPlaceholderFontSize(24);
        this._hintNum0.setMaxLength(6);
        this._hintNum0.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._hintNum0.setPlaceHolder("请输验证码");
        this._hintNum0.setPosition(imageSecurityCode.getContentSize().width/2, imageSecurityCode.getContentSize().height/2);
        imageSecurityCode.addChild(this._hintNum0);
        this._hintNum0.setFont("fonts/lanting.TTF", _fontSize);
        this._hintNum0.setPlaceholderFont("fonts/lanting.TTF", _fontSize);


        this._bindPhoneNum0.setFontColor(cc.color("#443333"));
        this._bindPhoneNum0.setPlaceholderFontColor(cc.color("#b7b7b7"));
        this._hintNum0.setFontColor(cc.color("#443333"));
        this._hintNum0.setPlaceholderFontColor(cc.color("#b7b7b7"));



        var textHint = this.back.getChildByName("Text_hint");
        textHint.ignoreContentAdaptWithSize(true);
        textHint.setVisible(false);

        this._btnSend = this.back.getChildByName("btn_send");
        this._btnSend.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                var _str = self._bindPhoneNum0.getString();
                if(_str.length != 11 || parseInt(_str) == 0)
                {
                    MjClient.showToast("请输入正确的手机号码");
                    return;
                }


                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.userTreasureSmsCode", {mobileNum:Number(_str)}, function(rtn)
                {
                    if(rtn.code==0)
                    {
                        MjClient.showToast(rtn.message);
                        sender.setBright(false);
                        sender.setTouchEnabled(false);
                        self._leftTime = 60;
                        self.schedule(self.scheduleUpdateBtn, 1, cc.REPEAT_FOREVER, 0);
                    }
                    else
                    {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showMsg(rtn.message);
                    }
                    MjClient.unblock();
                });
            }
        },this);

        var btnSure = this.back.getChildByName("btn_sure");
        btnSure.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                var _str = self._bindPhoneNum0.getString();
                if(_str.length != 11 || parseInt(_str) == 0)
                {
                    MjClient.showToast("请输入正确的手机号码");
                    return;
                }

                var _str1 = self._hintNum0.getString();
                if(_str1.length != 6 || parseInt(_str1) == 0)
                {
                    MjClient.showToast("请输入正确的验证码");
                    return;
                }


                MjClient.block();
                var param = {};
                param.mobileNum = Number(_str);
                param.smsCode = Number(_str1);
                param.lotteryId = self.lotteryId;
                MjClient.gamenet.request("pkplayer.handler.userTeasureInfoVerfiy", param, function(rtn)
                {
                    if(rtn.code==0)
                    {

                        self.unscheduleAllCallbacks();
                        self.removeFromParent();
                    }
                    else
                    {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showMsg(rtn.message);
                    }
                    MjClient.unblock();
                });
            }
        },this);
    },

    scheduleUpdateBtn:function () {
        // cc.log(" ++++++  schedule");
        if(this._leftTime > 0){
            this._btnSend.getTitleRenderer().setString(this._leftTime+"s");
            this._btnSend.getTitleRenderer().setPosition(this._btnSend.width/2, -this._btnSend.height/4);
        }else {
            this.unschedule(this.scheduleUpdateBtn);
            this._btnSend.getTitleRenderer().setString("");
            this._btnSend.setBright(true);
            this._btnSend.setTouchEnabled(true);
        }
        this._leftTime--;
    },
    


});
var UserGrowth_actJieRi = cc.Layer.extend({
    fontName:"fonts/lanting.TTF",
    ctor: function(data){
        this._super();
        var self = this;
        var node = ccs.load("userGrowth_actJieRi.json").node;
        this.node = node;
        this.addChild(node);
        this._data = {};

        this.back = node.getChildByName("back");
        this.block = node.getChildByName("block")
        setWgtLayout(this.block, [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(this.back, [1, 1], [0.5, 0.5], [0, 0]);
        

        this.node_1 = this.back.getChildByName("node_1");
        this.listView = this.node_1.getChildByName("ListView_1");
        this.listView.setScrollBarOpacity(0);
        this.cell = this.node_1.getChildByName("cell_1");
        this.cell.visible = false;
        var close = this.node_1.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                self.removeFromParent(true);
            }
        }, this);

        this.node_2 = this.back.getChildByName("node_2");
        var close2 = this.node_2.getChildByName("close");
        close2.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                self.removeFromParent(true);
            }
        }, this);

        this.node_1.visible = true;
        this.node_2.visible = false;

        this.init_dengji();
        self.add_prize(data);


    },

    init_dengji:function(){
        var node = this.node_2;

        var _fontSize = 24;
        var input_ren = node.getChildByName("input_person");
        this.input_ren = new cc.EditBox(cc.size(input_ren.width, input_ren.height), new cc.Scale9Sprite("usernfo/jieRiGuanhuai/shrk.png"));
        this.input_ren.setFontColor(cc.color("#88714d"));
        this.input_ren.setMaxLength(20);
        this.input_ren.setFontSize(_fontSize);
        this.input_ren.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_ren.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        this.input_ren.setPlaceHolder("请输入收货人名字");
        this.input_ren.setPlaceholderFontSize(_fontSize);
        this.input_ren.setPlaceholderFont("fonts/lanting.TTF", _fontSize);
        this.input_ren.setPlaceholderFontColor(cc.color("#88714d"));
        this.input_ren.setPosition(input_ren.getContentSize().width / 2, input_ren.getContentSize().height / 2);
        input_ren.addChild(this.input_ren);


        var input_number = node.getChildByName("input_phoneNum");
        this.input_number = new cc.EditBox(cc.size(input_number.width, input_number.height), new cc.Scale9Sprite("usernfo/jieRiGuanhuai/shrk.png"));
        this.input_number.setFontColor(cc.color("#88714d"));
        this.input_number.setPlaceholderFont("fonts/lanting.TTF", _fontSize);
        this.input_number.setPlaceholderFontColor(cc.color("#88714d"));
        this.input_number.setMaxLength(11);
        this.input_number.setFontSize(_fontSize);
        this.input_number.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_number.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this.input_number.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        this.input_number.setPlaceHolder("请输入收货人电话");
        // this.input_number.setPlaceholderFontSize(18);
        this.input_number.setPosition(input_number.getContentSize().width / 2, input_number.getContentSize().height / 2);
        input_number.addChild(this.input_number);

        var input_dizhi = node.getChildByName("input_address");
        this.input_dizhi = new cc.EditBox(cc.size(input_dizhi.width, input_dizhi.height), new cc.Scale9Sprite("usernfo/jieRiGuanhuai/shrk.png"));
        this.input_dizhi.setFontColor(cc.color("#88714d"));
        this.input_dizhi.setPlaceholderFont("fonts/lanting.TTF", _fontSize);
        this.input_dizhi.setPlaceholderFontColor(cc.color("#88714d"));
        this.input_dizhi.setMaxLength(50);
        this.input_dizhi.setFontSize(_fontSize);
        this.input_dizhi.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_dizhi.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        this.input_dizhi.setPlaceHolder("请输入收货人地址");
        // this.input_dizhi.setPlaceholderFontSize(18);
        this.input_dizhi.setPosition(input_dizhi.getContentSize().width / 2, input_dizhi.getContentSize().height / 2);
        input_dizhi.addChild(this.input_dizhi);

        //  btn_login  
        var btn_login = this.node_2.getChildByName("btn_login");
        btn_login.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                var str_1 = this.input_number.getString();
                var str_2 = this.input_dizhi.getString();
                var str_3 = this.input_ren.getString();
                if (!str_1 || !str_2 || !str_3) {
                    MjClient.showToast("请填写完整的地址信息！");
                    return;
                }
                if(str_1 && str_1[0] != "1"){
                    MjClient.showToast("请填写正确电话号码！");
                    return;
                }

                var param = {};
                param.pid = this.tag;
                param.realname = str_3;
                param.mobileNum = str_1;
                param.deliveryAddr = str_2;
                this.reqDengJi(param);
            }
        }, this);

    },

    add_prize:function(data){
        this.listView.removeAllItems();
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            this.listView.pushBackCustomItem(this.createItem(element));
            
        }
        

    },
    createItem: function(oneData) {
        if (!cc.sys.isObjectValid(this.cell)) return;
        var copyNode = this.cell.clone();
        copyNode.visible = true;

        var _title = copyNode.getChildByName("title");
        _title.ignoreContentAdaptWithSize(true);
        _title.setString(oneData.title);

        var _number = copyNode.getChildByName("number");
        _number.ignoreContentAdaptWithSize(true);
        _number.setString(oneData.soldNums + "/" + oneData.totalNums);

        for (let index = 1; index <= 4; index++) {
            var _tai = copyNode.getChildByName("tai_" + index);
            if(index == oneData.status){
                _tai.visible = true;
                if(oneData.status == 4 ){
                    var _timeStr = MjClient.dateFormat(new Date(parseInt(oneData.openTime)), 'MM月dd日');
                    var str = _timeStr + "开放登记";
                    _tai.ignoreContentAdaptWithSize(true);
                    _tai.setString(str);
                }
            }else{
                _tai.visible = false;
            }
            
        }

        var btn_tai = copyNode.getChildByName("tai_1");
        btn_tai.tag = oneData.pid;
        btn_tai.addTouchEventListener(function(sender, type){
            if(type == 2){
                this.tag = sender.tag;
                // this.reqDengJi(sender.tag);
                this.node_1.visible = false;
                this.node_2.visible = true;
                
            }
        },this);

        return copyNode;
    },


    //打开界面时请求数据
    reqJieRiData:function(){
        var self = this;
        MjClient.block();
        var sendInfo = {}
        MjClient.gamenet.request("pkplayer.handler.userFestivalCarePresentList", sendInfo,
        function(rtn) {
            MjClient.unblock();
            if(!cc.sys.isObjectValid(self)){
                return;
            }
            if (rtn.code == 0){
                self.add_prize(rtn.data);
            }else{
                if(rtn.message){
                    MjClient.showToast(rtn.message+"")
                }
            }
        });
    },

    //点击登记  
    reqDengJi:function(sendInfo){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userFestivalCarePresentCreate", sendInfo,
        function(rtn) {
            MjClient.unblock();
            if(!cc.sys.isObjectValid(self)){
                return;
            }
            if (rtn.code == 0){
                MjClient.showToast("登记成功")
                self.removeFromParent();
            }else{
                if(rtn.message){
                    MjClient.showToast(rtn.message+"")
                }
            }

        });
    },

});

var UserInfo_redPacket_v3 = cc.Layer.extend({
    ctor:function (type) {
        this._super();
        var node = ccs.load("UserInfo_redPacket_3.0.json").node;
        this.addChild(node);
        this.node = node;
        this.type = type;
        this.back = node.getChildByName("back");
        COMMON_UI.setNodeTextAdapterSize(this.back);
        
        this.block = node.getChildByName("block")
        setWgtLayout(this.block, [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(this.back, [1, 1], [0.5, 0.5], [0, 0],false);
        popupAnm(this.back);
        this.initLayer();
        this.showPanel(1);
    },
    showPanel:function(type){
        this._type = type;
        for(var i = 0; i < this.panelBtns.length; i++){
            this.panelBtns[i].setBright((i != type - 1)); 
        }
        this.rquestData();
    },
    //请求列表
    rquestData:function(lastId){
        var self = this;
        if(this._listView._isLoadingData){
            return;
        }
        MjClient.block();
        var sendInfo = {
            type:this._type,
        }
        if(lastId){
            sendInfo.lastId = lastId;
        }
        this._listView._isLoadingData = true;
        cc.log("redPacketPrizeRecord sendInfo",JSON.stringify(sendInfo))
        MjClient.gamenet.request("pkplayer.handler.redPacketPrizeRecord", sendInfo,  function(rtn)
        {   
            MjClient.unblock();
            self._listView._isLoadingData = false;
            if(!cc.sys.isObjectValid(self)){
                return;
            }
            if(rtn.code == 0){
                var dataLength = rtn.data.list.length;
                self._listView._hasMoreData = dataLength >= self._listView._prePageLength;
                if(lastId){
                    self._listView._data.list = self._listView._data.list.concat(rtn.data.list);
                }else{
                    self._listView._data = rtn.data;
                }
                self.refreshLayout(lastId ? false : true);
            }
            else{
                FriendCard_server_ret_fail(rtn);
            }  
        });
    },
    refreshLayout:function(shouldClear){
        this.refreshBottomMsg();
        this.refreshList(shouldClear);
    },
    refreshBottomMsg:function(){
        this.textExtractTimes.setString(this._listView._data.extractTimes+"");
        this.textWaitTakeMoney.setString(this._listView._data.money+"");
        this.btnTakeMoney.visible = (this._listView._data.money > 0)
    },
    //刷新列表
    refreshList:function(shouldClear)
    {
        if(!cc.sys.isObjectValid(this.item)) return;

        var listView = this._listView;
        var cell = this.item;
        cell.visible = false;

        var preItemNum = listView.getItems().length;
        var curentPoint = listView.getInnerContainerPosition();
        if(curentPoint.y > 0){
            curentPoint.y = 0;
        }
        var initPointY = listView.height - listView.getInnerContainerSize().height;
        if(shouldClear || (listView._data.list.length == 0)){
            cc.log("refreshList removeAllItems")
            listView.removeAllItems();
            preItemNum = 0;
        }
        if(listView._data.list.length == 0){
            this.text_nullTip.visible = true;
            return;
        }
        this.text_nullTip.visible = false;
        for (var i = 0; i < this._listView._data.list.length ; i ++){
            var item = listView.getItems()[i];
            if(!item){
                item = cell.clone();
                listView.pushBackCustomItem(item);
            }
            this.createItem(item, i);
            item.visible = true;
            item.dataIndex = i;
        }

        for(var i = preItemNum - 1; i >= listView._data.length; i--){
            listView.getItems()[i].removeFromParent(true);
        }
        FriendCard_UI.addListBottomTipUi(listView,listView._hasMoreData ? 2 : 3)
        listView.forceDoLayout();
        if(preItemNum > 0){
            curentPoint.y = curentPoint.y + listView.getInnerContainerPosition().y - initPointY;
            var totalY = (listView.height - listView.getInnerContainerSize().height);
            if(totalY == 0){
                var percent = 0;
            }else{
                var percent = 100 - curentPoint.y * 100 / totalY;
            }
            listView.jumpToPercentVertical(percent)
        }

    },
    createItem:function(item,index)
    {
        var self = this;
        var itemData = this._listView._data.list[index];
        var textTime = item.getChildByName("Text_time");
        var textMoney = item.getChildByName("Text_money");
        var textOpe = item.getChildByName("Text_opt");
        var timeStr = MjClient.dateFormat(new Date(parseInt(itemData.createTime)), 'yyyy-MM-dd hh:mm');
        textTime.setString(timeStr+"");
        textMoney.setString("￥"+itemData.amount)
        textOpe.setString(itemData.reason+"");
        if(this._type == 1){
            textOpe.setTextColor(cc.color("#443333"))
        }else{
            if(itemData.status == 0){
                textOpe.setTextColor(cc.color("#179c24"))
            }else{
                textOpe.setTextColor(cc.color("#d3260e"))
            }
        }
    },
    initLayer:function(){
        var self = this;
        var panel = this.back;
        this._listView = panel.getChildByName("ListView");
        this._listView._data = {};
        this._listView._data.list = [];
        this._listView._hasMoreData = true;
        self._listView._prePageLength = 20;//不可改后端写死的
        this.item = panel.getChildByName("Item");
        this.text_nullTip = panel.getChildByName("Text_nullTip");
        this.text_nullTip.visible = false;
        this.item.visible = false;
            
        FriendCard_UI.setListAutoLoadMore(self._listView,function(){
            FriendCard_UI.addListBottomTipUi(self._listView,1)
            self.rquestData(self._listView._data.list[self._listView._data.list.length -1].orderId);
        },function(){
            if (!self._listView._isLoadingData &&
                self._listView._hasMoreData){
                return true;
            }
            return false;
        })

        var panelMsg = panel.getChildByName("Panle_msg");
        this.textId = panelMsg.getChildByName("Text_ID");
        this.textExtractTimes = panelMsg.getChildByName("Text_take_remain");
        this.textWaitTakeMoney = panelMsg.getChildByName("Text_wait_take");
        this.textId.setString(MjClient.data.pinfo.uid+"");
        this.textExtractTimes.setString("");
        this.textWaitTakeMoney.setString("");
        //疑问
        var btnQuestion = panelMsg.getChildByName("btn_question");
        btnQuestion.addTouchEventListener(function(sender, type){
            if (type == 2){
                self.panleQuestion.visible = true;
            }
        });
        //立即提现
        var btnTakeMoney = panelMsg.getChildByName("btn_take_now");
        this.btnTakeMoney = btnTakeMoney;
        btnTakeMoney.addTouchEventListener(function(sender, type){
            if (type == 2){
                if(self._listView._data.extractTimes < 1){
                    MjClient.showToast("今日提取次数已用完，请明日再来")
                    return;
                }
                MjClient.block();
                var sendInfo = {}
                MjClient.gamenet.request("pkplayer.handler.redPacketExtract", sendInfo,  function(rtn)
                {   
                    MjClient.unblock();
                    if(!cc.sys.isObjectValid(self)){
                        return;
                    }
                    if(rtn.code == 0){
                        self._listView._data.extractTimes = rtn.data.extractTimes;
                        if(self._listView._data.money > 5000){
                            MjClient.showToast("已成功提取金额5000元")
                        }
                        self._listView._data.money = rtn.data.money;
                        self.refreshBottomMsg();
                        if(self._type == 2){
                            self.rquestData();
                        }
                    }
                    else{
                        FriendCard_server_ret_fail(rtn);
                    }  
                });
            }
        });
        var panelBottom = panel.getChildByName("Panle_bottom");
        var btnRewardRecord = panelBottom.getChildByName("btn_reward_record");
        var btnTakeRecord = panelBottom.getChildByName("btn_take_record");
        var btnContactServer = panelBottom.getChildByName("btn_contact_server");
        //获奖记录
        btnRewardRecord.addTouchEventListener(function(sender, type){
            if (type == 2){
                this.showPanel(1);
            }
        }, this);
        //提取记录
        btnTakeRecord.addTouchEventListener(function(sender, type){
            if (type == 2){
                this.showPanel(2);
            }
        }, this);

        this.panelBtns = [
            btnRewardRecord,
            btnTakeRecord
        ];
        //联系客服
        btnContactServer.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_kefu_dianji", {uid:SelfUid()});
                MjClient.block();
                if (!isCurrentNativeVersionBiggerThan("14.0.0"))
                {
                    MjClient.gamenet.request("pkplayer.handler.openBrowser", { type: 9 }, function (rtn) {
                        MjClient.unblock();
                        if (rtn.code == 0) {
                            MjClient.Scene.addChild(new NormalWebviewLayer(rtn.data));
                        }
                        else {
                            if (rtn.message) {
                                MjClient.showToast(rtn.message);
                            }
                            else {
                                MjClient.showToast("获取数据失败");
                            }
                        }
                    });
                }
                else{
                    MjClient.unblock();
                    MjClient.native.showQiYuChatDialog();
                }
            }
        }, this);

        var _close = panel.getChildByName("Button_close")
        _close.addTouchEventListener(function(sender, type){
            if (type == 2){
                this.removeFromParent();
            }
        }, this);

        this.initQuestionLayout();
        
    },
    initQuestionLayout:function(){
        var self = this;
        var panleQuestion = this.node.getChildByName("Panle_question");
        this.panleQuestion = panleQuestion;
        panleQuestion.setPosition(cc.p(MjClient.size.width/2, MjClient.size.height/2));
        panleQuestion.width = MjClient.size.width;
        panleQuestion.height = MjClient.size.height;
        panleQuestion.visible = false;
        var back = panleQuestion.getChildByName("back");
        var block = panleQuestion.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0],true);
        setWgtLayout(back, [1, 1], [0.5, 0.5], [0, 0],false);
        var text_title = back.getChildByName("Image_bg").getChildByName("Text_1");

        var text_help = back.getChildByName("Image_bg").getChildByName("Text_2");
        var str1 = "1、只有免房费的玩法，才有机会参与红包局游戏\n" +
            "2、完成红包局即有机会获得红包奖励。红包局中途解散无法获得红包奖励\n" +
            "3、获得的红包会存入“我的红包”中，每日有3次提现机会。每日0:00刷新次数\n" +
            "4、为了保证您的权益，请在活动结束前进行提现\n" +
            "5、对本活动如有疑问或建议，请联系客服处理";
        var str2 = "1、游戏内获得的所有红包，都会记录在“我的红包”中。每日有3次提现机会\n" +
            "2、单次提取的金额范围为1-5000元\n" +
            "3、提取的红包，会直接发到微信钱包中，请尽量保证的微信资料完整\n" +
            "4、为了保证您的权益，请在活动结束前进行提现\n" +
            "5、如有问题或建议，请及时联系客服处理";

        if(this.type == 1){
            text_help.setString(str2);
            text_title.setString("帮助");
        }else{
            text_help.setString(str1);
            text_title.setString("活动说明");
        }

        block.addTouchEventListener(function(sender, type){
            if (type == 2){
                self.panleQuestion.visible = false;
            }
        }, this);
    },
    onExit: function () {
        this._super();
    },
});

var UserInfo_exChangeMoney = cc.Layer.extend({
	ctor:function (){
		this._super();
		var UI = ccs.load("UserInfo_exChangeMoney.json");
        this.addChild(UI.node);
        var pinfo = MjClient.data.pinfo;
        
        var self = this;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        var backBg = UI.node.getChildByName("back");
        setWgtLayout(backBg, [1, 1],[0.5,0.5],[0,0]);
        var _back = backBg.getChildByName("mainBg");
        this._conuntNum = 0;
        this.pinfo = pinfo;

        var close = _back.getChildByName("close");
        close.addTouchEventListener(function(sender, type){
            if(type == 2){
                this.removeFromParent();
            }
        },this);

        var btn_exChange = _back.getChildByName("btn_exChange");
        btn_exChange.addTouchEventListener(function(sender, type){
            if(type == 2){ 
                if(this._conuntNum == 0){
                    MjClient.showToast("请输入有效数字");
                    return;
                }
                this.reqData(this._conuntNum);
            }
        },this)
        var number1 = _back.getChildByName("number1");
        number1.ignoreContentAdaptWithSize(true);
        number1.setString(pinfo.fangka);
        var Text_2 = _back.getChildByName("Text_2");
        Text_2.x = number1.x + number1.width + 5;
        var number2 = _back.getChildByName("number2");
        number2.ignoreContentAdaptWithSize(true);
        number2.setString(pinfo.fangka); //happyCy


        var input = _back.getChildByName("input");
        this.input_number = new cc.EditBox(cc.size(input.width, input.height), new cc.Scale9Sprite("common_3.0/bg_shurukuang.png"));
        this.input_number.setFontColor(cc.color("#ff6f20"));
        this.input_number.setMaxLength(20);
        this.input_number.setFontSize(30);
        this.input_number.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.input_number.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this.input_number.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        this.input_number.setPlaceholderFontSize(30);
        this.input_number.setPlaceholderFontColor(cc.color("#ff6f20"));
        this.input_number.setPosition(input.getContentSize().width / 2, input.getContentSize().height / 2);
        input.addChild(this.input_number);

        this.editBoxEditingDidBegin = function(editBox) {
        	// MjClient.showToast(" =====editBoxEditingDidBegin")
        }.bind(this);
        this.editBoxEditingDidEnd = function(editBox) {
        	// MjClient.showToast(" =====editBoxEditingDidEnd")
        }.bind(this);
        
        this.editBoxTextChanged = function(editBox, text) {
            // MjClient.showToast(" =====editBoxTextChanged")
            var _str = editBox.getString();
            this._conuntNum = _str;
            // input.setString(_str);
            number2.setString(pinfo.fangka - _str);

        }.bind(this);

        this.editBoxReturn = function(editBox) {
        	// MjClient.showToast(" =====editBoxReturn")
        }.bind(this);
        this.input_number.setDelegate(this);



    },
    
    reqData:function(number){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userDiamondToHappyCy",{diamond:number},function(rtn){
            if(rtn.code==0)
            {

                MjClient.showToast("兑换成功");
                self.removeFromParent();
            }
            else
            {
                if (rtn.message)
                    MjClient.showToast(rtn.message);
                else
                    MjClient.showToast("领取失败");
            }
            MjClient.unblock();
        });
    },
});