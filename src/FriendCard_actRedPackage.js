/**
* Created by fenghanwei on 2019/10/10.
*/


/*
*红包局宣传页
*/
var friendcard_redPackage_ad = cc.Layer.extend({
    gradeDesc:[
        "一等奖",
        "二等奖",
        "三等奖",
        "四等奖",
        "五等奖",
        "六等奖",
        "七等奖",
        "八等奖",
        "九等奖",
        "十等奖",
        "十一等奖",
        "十二等奖",
        "十三等奖",
        "十四等奖",
        "十五等奖",
        "十六等奖",
        "十七等奖",
        "十八等奖",
        "十九等奖",
    ],
    ctor:function (callbackFunc) {
        this._super();
        var that = this;
        var node = ccs.load("friendcard_redPackage_ad.json").node;
        this.addChild(node);
        this.back = node.getChildByName("back");
        this.block = node.getChildByName("block")
        setWgtLayout(this.block, [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(this.back, [1, 1], [0.5, 0.5], [0, 0],false);

        popupAnm(this.back)

        this.block.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent(true);
            }
        }, this);
        var close = this.back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent(true);
            }
        }, this);

        var btnRecord = this.back.getChildByName("Button_record");
        btnRecord.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(cc.sys.isObjectValid(MjClient.FriendCard_main_ui)){
                    MjClient.FriendCard_main_ui.addChild(new friendcard_redPackage_record());
                }
                that.removeFromParent(true);
            }
        }, this);

        this.initText();
    },
    initText:function(){
        var data = MjClient._FriendCard_RedPackageConfig || {};
        data.config = data.config || "";
        var awardConfig = data.config.split(",");
        var colorNormal = cc.color("#784d08");
        var colorRed = cc.color("#d03b16");
        var fontSize = 24;
        var fontSizeLittle = 19;
        var fontName = "fonts/lanting.TTF";
        //1-3奖励
        for(var i = 0; i < 3; i++){
            var itemNode = this.back.getChildByName("Item"+(i+1));
            var text1 = itemNode.getChildByName("Text_money");//奖励金额
            text1.ignoreContentAdaptWithSize(true);
            var moneyStr = awardConfig[i] ? awardConfig[i] : "";
            text1.setString(moneyStr);
            var text2 = itemNode.getChildByName("Text_desc");//奖励金额描述
            text2.visible = false;
            var richText = new ccui.RichText();
            var richTextItem1 = new ccui.RichElementText(1, colorNormal, 255, "价值", fontName, fontSize);
            var richTextItem2 = new ccui.RichElementText(1, colorRed, 255, moneyStr, fontName, fontSize);
            var richTextItem3 = new ccui.RichElementText(1, colorNormal, 255, "现金红包", fontName, fontSize);
            richText.pushBackElement(richTextItem1);
            richText.pushBackElement(richTextItem2);
            richText.pushBackElement(richTextItem3);
            richText.setPosition(text2.getPosition());
            itemNode.addChild(richText);
        }//1-3奖励end

        //4-11奖励
        var listViewAward = this.back.getChildByName("ListView_award");
        listViewAward.setScrollBarEnabled(false);
        for(var i = 3; i < 11; i++){
            var itemNode = listViewAward.getChildByName("Item_award_"+(i-3));
            var text1 = itemNode.getChildByName("Text_rank");//几等奖
            text1.ignoreContentAdaptWithSize(true);
            text1.setString(this.gradeDesc[i]);
            var moneyStr = awardConfig[i] ? awardConfig[i] : "";
            var text2 = itemNode.getChildByName("Text_money");//奖励金额
            text2.ignoreContentAdaptWithSize(true);
            text2.setString("￥"+moneyStr);
        }//4-11奖励end

        //12-19奖励
        var textOtherAward = this.back.getChildByName("Text_other_award");
        textOtherAward.visible = false;
        var richText1 = new ccui.RichText();
        for(var i = 11; i < 15; i++){
            var moneyStr = awardConfig[i] ? awardConfig[i] : "";
            var richTextItem1 = new ccui.RichElementText(1, colorNormal, 255, this.gradeDesc[i], fontName, fontSizeLittle);
            var richTextItem2 = new ccui.RichElementText(1, colorRed, 255, " "+moneyStr+" ", fontName, fontSizeLittle);
            var richTextItem3 = new ccui.RichElementText(1, colorNormal, 255, "红包； ", fontName, fontSizeLittle);
            richText1.pushBackElement(richTextItem1);
            richText1.pushBackElement(richTextItem2);
            richText1.pushBackElement(richTextItem3);
        }
        var richText2 = new ccui.RichText();
        for(var i = 15; i < 19; i++){
            var moneyStr = awardConfig[i] ? awardConfig[i] : "";
            var richTextItem1 = new ccui.RichElementText(1, colorNormal, 255, this.gradeDesc[i], fontName, fontSizeLittle);
            var richTextItem2 = new ccui.RichElementText(1, colorRed, 255, " "+moneyStr+" ", fontName, fontSizeLittle);
            var richTextItem3 = new ccui.RichElementText(1, colorNormal, 255, "红包； ", fontName, fontSizeLittle);
            richText2.pushBackElement(richTextItem1);
            richText2.pushBackElement(richTextItem2);
            richText2.pushBackElement(richTextItem3);
            
        }
        richText1.setPosition(textOtherAward.getPosition());
        var pos2 = textOtherAward.getPosition();
        pos2.y -= (textOtherAward.height + 5);
        richText2.setPosition(pos2);
        textOtherAward.getParent().addChild(richText1);
        textOtherAward.getParent().addChild(richText2);//12-19奖励end

        //活动时间
        var textActTime = this.back.getChildByName("Text_act_time");
        var startTime = MjClient.dateFormat(data.startTime ? new Date(parseInt(data.startTime)) : new Date(), 'yyyy-MM-dd');
        var endTime = MjClient.dateFormat(data.endTime ? new Date(parseInt(data.endTime)) : new Date(), 'yyyy-MM-dd');
        textActTime.ignoreContentAdaptWithSize(true);
        textActTime.setString("活动时间："+startTime+"至"+endTime);

    }
});

/*
*红包局，红包记录
*/
var friendcard_redPackage_record = cc.Layer.extend({
    ctor:function (type) {
        this._super();
        var node = ccs.load("friendcard_redPackage_record.json").node;
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
        var that = this;
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
            that._listView._isLoadingData = false;
            if(!cc.sys.isObjectValid(that)){
                return;
            }
            if(rtn.code == 0){
                var dataLength = rtn.data.list.length;
                that._listView._hasMoreData = dataLength >= that._listView._prePageLength;
                if(lastId){
                    that._listView._data.list = that._listView._data.list.concat(rtn.data.list);
                }else{
                    that._listView._data = rtn.data;
                }
                that.refreshLayout(lastId ? false : true);
            }
            else{
                FriendCard_Common.serverFailToast(rtn);
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
        var that = this;
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
        var that = this;
        var panel = this.back;
        this._listView = panel.getChildByName("ListView");
        this._listView._data = {};
        this._listView._data.list = [];
        this._listView._hasMoreData = true;
        that._listView._prePageLength = 20;//不可改后端写死的
        this.item = panel.getChildByName("Item");
        this.text_nullTip = panel.getChildByName("Text_nullTip");
        this.text_nullTip.visible = false;
        this.item.visible = false;
            
        FriendCard_UI.setListAutoLoadMore(that._listView,function(){
            FriendCard_UI.addListBottomTipUi(that._listView,1)
            that.rquestData(that._listView._data.list[that._listView._data.list.length -1].orderId);
        },function(){
            if (!that._listView._isLoadingData &&
                that._listView._hasMoreData){
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
                that.panleQuestion.visible = true;
            }
        });
        //立即提现
        var btnTakeMoney = panelMsg.getChildByName("btn_take_now");
        this.btnTakeMoney = btnTakeMoney;
        btnTakeMoney.addTouchEventListener(function(sender, type){
            if (type == 2){
                if(that._listView._data.extractTimes < 1){
                    MjClient.showToast("今日提取次数已用完，请明日再来")
                    return;
                }
                MjClient.block();
                var sendInfo = {}
                MjClient.gamenet.request("pkplayer.handler.redPacketExtract", sendInfo,  function(rtn)
                {   
                    MjClient.unblock();
                    if(!cc.sys.isObjectValid(that)){
                        return;
                    }
                    if(rtn.code == 0){
                        that._listView._data.extractTimes = rtn.data.extractTimes;
                        if(that._listView._data.money > 5000){
                            MjClient.showToast("已成功提取金额5000元")
                        }
                        that._listView._data.money = rtn.data.money;
                        that.refreshBottomMsg();
                        if(that._type == 2){
                            that.rquestData();
                        }
                    }
                    else{
                        FriendCard_Common.serverFailToast(rtn);
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
        closeBtnAddLight(_close);

        this.initQuestionLayout();
        
    },
    initQuestionLayout:function(){
        var that = this;
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
                that.panleQuestion.visible = false;
            }
        }, this);
    },
    onExit: function () {
        this._super();
    },
});

/*
*红包局，抢红包
*/
var friendcard_redPackage_dialog = cc.Layer.extend({
    ctor:function () {
        this._super();
        var node = ccs.load("friendcard_redPackage_dialog.json").node;
        this.addChild(node);
        this.node = node;
        this.back = node.getChildByName("back");
        this.block = node.getChildByName("block")
        setWgtLayout(this.block, [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(this.back, [1, 1], [0.5, 0.5], [0, 0],false);
        
        this.back.standScale= this.back.scale;

        this.clubInfoTable = getClubInfoInTable();
        this.panelNormal = this.back.getChildByName("Panel_normal");
        this.panelNormal.initFunc = this.initNormalLayer;
        this.panelWin = this.back.getChildByName("Panel_win");
        this.panelWin.initFunc = this.initWinLayer;
        this.panelLose = this.back.getChildByName("Panel_lose");
        this.panelLose.initFunc = this.initLoseLayer;
        this.panelViews = [
            this.panelNormal,
            this.panelWin,
            this.panelLose,
        ];
        
        this.showPanel(this.panelNormal);
    },
    showPanel:function(panel,data){
        this.showingPanel = panel;
        for(var i = 0; i < this.panelViews.length; i++){
            if(this.panelViews[i] == panel){
                this.panelViews[i].visible = true;
                this.panelViews[i].initFunc.bind(this)(data);
            }else{
                this.panelViews[i].visible = false;
            }
        }
    },
    popupAnm:function(node,action,callback){
        var _currentScale = node.getScale();
        if(action == 1){
            node.setScale(node.standScale);
        }else{
            node.setScale(0);
        }
        var toScale = action == 1 ? 0 : node.standScale;
        node.runAction(cc.sequence(cc.scaleTo(0.2,toScale).easing(cc.easeBackOut()),cc.callFunc(function(){
            if(callback){
                callback();
            }
        })));
    },
    initNormalLayer:function(data){
        var that = this;
        this.popupAnm(this.back,0);
        //抢红包
        var btnStick = this.panelNormal.getChildByName("Button_stick");
        btnStick.addTouchEventListener(function(sender,type){
            if(type == 2){
                if(that.showingPanel != that.panelNormal){
                    return;
                }
                var sendInfo = {
                    orgId:that.clubInfoTable.clubId,
                    orgType:that.clubInfoTable.isLMClub ? 2 : 1
                }
                MjClient.block();
                cc.log("redpacketDraw sendInfo",JSON.stringify(sendInfo))
                MjClient.gamenet.request("pkplayer.handler.redpacketDraw", sendInfo,  function(rtn)
                {   
                    MjClient.unblock();
                    if(!cc.sys.isObjectValid(that)){
                        return;
                    }
                    if(rtn.code == 0){
                        MjClient._friendcard_redPackage_count = rtn.data.count;
                        that.showingPanel = null;
                        that.popupAnm(that.back,1,function(){
                            if(rtn.data.amount > 0){
                                that.showPanel(that.panelWin,rtn.data);
                            }else{
                                that.showPanel(that.panelLose,rtn.data);
                            }
                        });
                    }
                    else{
                        FriendCard_Common.serverFailToast(rtn);
                        that.removeFromParent();
                    }  
                });
            }
        })
        //剩余抢红包次数
        var textTip2 = this.panelNormal.getChildByName("Text_tip2");
        textTip2.ignoreContentAdaptWithSize(true);
        textTip2.setString("剩余可抽奖次数："+MjClient._friendcard_redPackage_count);
    },
    initWinLayer:function(data){
        var that = this;
        this.popupAnm(this.back,0);
        var btnClose = this.panelWin.getChildByName("Button_close");
        btnClose.visible = (data.level > 0 && data.level <= 10) ? false : true;
        btnClose.addTouchEventListener(function(sender,type){
            if(type == 2){
                that.removeFromParent();
            }
        })

        var btnStick = this.panelWin.getChildByName("Button_stick");
        btnStick.addTouchEventListener(function(sender,type){
            if(type == 2){
                if(that.showingPanel != that.panelWin){
                    return;
                }
                that.showingPanel = null;
                that.popupAnm(that.back,1,function(){
                    that.showPanel(that.panelNormal);
                });
            }
        })
        //红包金额
        var textTip1 = this.panelWin.getChildByName("Text_tip1");
        textTip1.ignoreContentAdaptWithSize(true);
        textTip1.setString(data.amount + "");
        
        //剩余抢红包次数
        var textTip2 = this.panelWin.getChildByName("Text_tip3");
        textTip2.ignoreContentAdaptWithSize(true);
        textTip2.setString("剩余可抽奖次数："+MjClient._friendcard_redPackage_count);
        if(MjClient._friendcard_redPackage_count <= 0){
            btnStick.visible = false;
        }

        var textTip3 = this.panelWin.getChildByName("Text_tip2");
        textTip3.ignoreContentAdaptWithSize(true);
        if(data.level > 0 && data.level <= 10){
            textTip3.setString("手气爆棚，获得大额奖励！");
        }else{
            textTip3.setString("恭喜你获得红包局红包");
        }

        var btnShare = this.panelWin.getChildByName("Button_share");
        //分享
        btnShare.addTouchEventListener(function(sender,type){
            if(type == 2){
                btnClose.runAction(cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
                    btnClose.visible = true;
                })))
                MjClient.block();
                FriendCard_UI.shareAward(data.amount,function(result){
                    MjClient.unblock();
                    if(!result){
                        cc.log("shareAward result fail");
                        return;
                    }
                    cc.log("shareAward result",result.path);
                    if (cc.sys.OS_WINDOWS == cc.sys.os) {
                        MjClient.wxShareImageToPYQ = true;
                        postEvent("WX_SHARE_SUCCESS", {
                            errCode: 0
                        });
                    }
                    MjClient.native.wxShareImageToPYQ(result.path);
                })
            }
        })
        
        UIEventBind(null, btnShare, "WX_SHARE_SUCCESS", function(wxdata) {
            cc.log("friendcard_redPackage_dialog WX_SHARE_SUCCESS")
            MjClient.wxShareImageToPYQ = false;
        });
    },
    initLoseLayer:function(data){
        var that = this;
        this.popupAnm(this.back,0);
        var btnClose = this.panelLose.getChildByName("Button_close");
        btnClose.addTouchEventListener(function(sender,type){
            if(type == 2){
                that.removeFromParent();
            }
        })
        var btnStick = this.panelLose.getChildByName("Button_stick");
        btnStick.addTouchEventListener(function(sender,type){
            if(type == 2){
                if(that.showingPanel != that.panelLose){
                    return;
                }
                that.showingPanel = null;
                that.popupAnm(that.back,1,function(){
                    that.showPanel(that.panelNormal);
                });
            }
        });
        //手气值
        var textTip1 = this.panelLose.getChildByName("Text_tip1");
        textTip1.ignoreContentAdaptWithSize(true);
        //20-90
        var luckyValue = Math.floor(Math.random()*71) + 20;
        textTip1.setString("手气值+"+luckyValue+"%");
        //剩余抢红包次数
        var textTip2 = this.panelLose.getChildByName("Text_tip3");
        textTip2.ignoreContentAdaptWithSize(true);
        textTip2.setString("剩余可抽奖次数："+MjClient._friendcard_redPackage_count);
        if(MjClient._friendcard_redPackage_count <= 0){
            btnStick.visible = false;
        }
    },
    onExit: function () {
        this._super();
    },
});

/*
*红包局，牌桌触发提示
*/
var friendcard_redPackage_beginTip = cc.Layer.extend({
    ctor:function () {
        this._super();
        var node = ccs.load("friendcard_redPackage_begin_tip.json").node;
        this.addChild(node);
        this.node = node;
        this.back = node.getChildByName("back");
        this.block = node.getChildByName("block")
        setWgtLayout(this.block, [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(this.back, [1, 1], [0.5, 0.5], [0, 0],false);
        
        var that = this;
        this.panelNormal = this.back.getChildByName("Panel_normal");
        var btnSure = this.panelNormal.getChildByName("Button_sure");
        btnSure.addTouchEventListener(function(sender,type){
            if(type == 2){
                that.removeFromParent();
            }
        })
    },
    onExit: function () {
        this._super();
    },
});

var FriendCard_UI = FriendCard_UI || {};
/*
*红包局获奖toast
*/
FriendCard_UI.showAwardToast = function() {
    if(!MjClient._redPackageToastList){
        MjClient._redPackageToastList = [];
    }
    var data = MjClient._redPackageToastList;
    var redPackageAwardToastUI = MjClient.Scene.getChildByName("redPackageAwardToastUI");
    if (!data || data.length == 0) {
        if(redPackageAwardToastUI && !redPackageAwardToastUI.isDoingDestory){
            //移除效果
            var action = cc.sequence(cc.fadeOut(0.3),cc.callFunc(function(){
                redPackageAwardToastUI.removeFromParent();
            }));
            action.setTag(20191011);
            redPackageAwardToastUI.isDoingDestory = true;
            redPackageAwardToastUI.runAction(action)
        }
        return;
    }
    var awardData = data[0];
    if(awardData.level < 1 || awardData.level > 10){
        //不是1到10等奖不用全局广播
        data.splice(0,1);
        FriendCard_UI.showAwardToast();
        return;
    }
    var clubInfoTable = getClubInfoInTable();
    if(!clubInfoTable){
        //不是房间内不用广播
        data.splice(0,1);
        FriendCard_UI.showAwardToast();
        return;
    }

    if(clubInfoTable.clubId != awardData.clubId && clubInfoTable.clubId != awardData.leagueId){
        //不是同一个俱乐部或联盟
        data.splice(0,1);
        FriendCard_UI.showAwardToast();
        return;
    }

    var otherActionTime = 0;
    if(!redPackageAwardToastUI){
        redPackageAwardToastUI = ccs.load("friendcard_redPackage_toast.json").node;
        redPackageAwardToastUI.setName("redPackageAwardToastUI");
        MjClient.Scene.addChild(redPackageAwardToastUI, 99999);
        var action = cc.fadeIn(0.3);
        otherActionTime += 0.3;
        redPackageAwardToastUI.runAction(action);
    }


    var back = redPackageAwardToastUI.getChildByName("back");
    setWgtLayout(back, [0.5781, 0.0458], [0.5, 0.775], [0, 0]);

    var bg_text = back.getChildByName("bg_text");
    var text = bg_text.getChildByName("text");
    text.ignoreContentAdaptWithSize(true);

    redPackageAwardToastUI.stopActionByTag(20191011);
    if(redPackageAwardToastUI.isDoingDestory){
        //在执行销毁
        redPackageAwardToastUI.isDoingDestory = false;
        var action = cc.fadeIn(0.3);
        otherActionTime += 0.3;
        redPackageAwardToastUI.runAction(action);
    }else{
        //已经在正常执行中
        if(text.getActionByTag(20191010)){
            return;
        }
    }
    data.splice(0,1);
    var msg = text;
    msg.ignoreContentAdaptWithSize(true);
    msg.setVisible(true);
    msg.setString(unescape(awardData.text));
    msg.anchorX = 0;
    //bg_text.addChild(msg);

    var dx = 30;
    msg.x = bg_text.width + dx;
    var callBack2 = new cc.CallFunc(function() {
        redPackageAwardToastUI.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
            FriendCard_UI.showAwardToast();
        })));
    }.bind(msg))

    var time2 = (bg_text.width + msg.width + 2 * dx) / 75;
    var action2 = cc.sequence(cc.delayTime(otherActionTime),cc.moveTo(time2, cc.p(-(dx + msg.width), bg_text.height / 2)), callBack2);
    action2.setTag(20191010)
    msg.runAction(action2);
}



FriendCard_UI.shareAward = function (money,callback) {
    // 正在截图中判断
    if (MjClient._isCapturingRedPackageShare) {
        return;
    }
    MjClient._isCapturingRedPackageShare = true;

    // 截图文件判断
    var fileName = "friendcard_redPackage_share.jpg";
    var fullPath = jsb.fileUtils.getWritablePath() + fileName;
    if (jsb.fileUtils.isFileExist(fullPath)) {
        jsb.fileUtils.removeFile(fullPath);
    }
    var node = ccs.load("friendcard_redPackage_share.json").node;
    node.retain();
    var capturingRedPackageShare = function(){
        // 截图并保存图片文件
        var size = {
            width:node.width,
            height:node.height,
        } // 获取视图大小
        var texture = new cc.RenderTexture(size.width, size.height,cc.Texture2D.PIXEL_FORMAT_RGBA8888, gl.DEPTH24_STENCIL8_OES); // 新建渲染纹理
        texture.setPosition(cc.p(size.width / 2, size.height / 2)); // 移动渲染纹理到视图中心
        texture.begin(); // 开始渲染
        node.visit(); // 访问当前node
        texture.end(); // 渲染结束
        texture.saveToFile(fileName, cc.IMAGE_FORMAT_JPG); // 保存渲染纹理到图片文件
        cc.log("shareAward 渲染纹理完成");
        // 延时50毫秒，检测截图文件是否存在
        // 重复10次这个过程，如果超过10次仍没检测到图片文件，截图失败（超时）
        var tryTimes = 0;
        var fn = function () {
            
            if (jsb.fileUtils.isFileExist(fullPath)) {
                // 调用相应平台微信分享图片方法
                if(callback){
                    callback({path:fullPath})
                }
                node.release();
                MjClient._isCapturingRedPackageShare = false;
            } else {
                tryTimes++;
                if (tryTimes > 10) {
                    if(callback){
                        callback()
                    }
                    node.release();
                    MjClient._isCapturingRedPackageShare = false;
                    cc.log("shareAward 截图失败，超时~");
                    return;
                }
                setTimeout(fn, 50);
            }
        };
        setTimeout(fn, 50);
        cc.log("shareAward 截图完成！！");
    }
    var textMoney = node.getChildByName("back").getChildByName("Text_money");
    textMoney.ignoreContentAdaptWithSize(true);
    textMoney.setString(""+money);
    var nameStr = unescape(MjClient.data.pinfo.nickname);
    var textNickname = node.getChildByName("back").getChildByName("Text_nickname");
    textNickname.ignoreContentAdaptWithSize(true);
    textNickname.setString(""+nameStr);
    var imgHead = node.getChildByName("back").getChildByName("Image_head");
    var headUrl = MjClient.data.pinfo.headimgurl;
    //加载完头像再开始渲染截图
    if(headUrl){
        MjClient.loadImgQX(headUrl, { isCrossOrigin: true }, function(err, texture) {
            if (!err && texture) {
                var sp = new cc.Sprite(texture);
                var clippingNode = new cc.ClippingNode();
                var headMask = "friendCards/actRedPackage/share/head_kuang.png";
                var mask = new cc.Sprite(headMask);
                mask.width = imgHead.width;
                mask.height = imgHead.height;
                clippingNode.setAlphaThreshold(0);
                clippingNode.setStencil(mask);

                sp.setScale(mask.getContentSize().width/sp.getContentSize().width);
                clippingNode.addChild(sp);
                clippingNode.setPosition(imgHead.getContentSize().width/2,imgHead.getContentSize().height/2);
                imgHead.addChild(clippingNode);
            }
            setTimeout(capturingRedPackageShare, 50);
            
            
        });
    }else{
        capturingRedPackageShare();
    }
}