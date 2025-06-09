/**
 * 岳阳3.0 邮件功能
 */

var EmailLayer_v3 = cc.Layer.extend({

    ctor:function ()
    {
        this._super();
        var UI = ccs.load("YouJianLayer_3.0.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.7281, 0.75], [0.5, 0.5], [0, 0]);
        COMMON_UI.popDialogAni(_back);

        _back.getChildByName("close").addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Youjian_Close", {uid:SelfUid()});
                that.removeFromParent();
            }
        }, this);


        this._ListView =  _back.getChildByName("ListView_eMail");
        this._cell = _back.getChildByName("cell_eMail");
        this._cell.visible = false;

        this._nullTip_image = _back.getChildByName("nullTip_image");
        if (this._nullTip_image)
        {
            this._nullTip_image.visible = false;
        }

        this.addItems();
        var _receiveAll = _back.getChildByName("ReceiveAll");
        _receiveAll.addTouchEventListener(function(sender,type){
            if (type == 2) {
                if (!that.canReceive) return MjClient.showToast("没有可领取的奖励");
                MjClient.gamenet.request("pkplayer.handler.mailOperateAll",{key: 2},function(rtn){
                    var emailLayerReceive = new EMailLayerReceive_v3(rtn.data, function(){
                        
                    });
                    that.addChild(emailLayerReceive);
                });
            }
        });
        var _deleteAll = _back.getChildByName("DeleteAll");
        _deleteAll.addTouchEventListener(function(sender,type){
            if (type == 2) {
                if (!that.canDelete) return MjClient.showToast("没有可删除的奖励");
                MjClient.gamenet.request("pkplayer.handler.mailOperateAll",{key: 1},function(){
                });
            }
        });
        UIEventBind(null, _receiveAll, "refresh_mail_list", function (eD) {
             that.addItems();
        });
        UIEventBind(null, _deleteAll, "refresh_mail_list", function (eD) {
             that.addItems();
        });
    },
    createItem:function(oneData)
    {
        cc.log("oneData",JSON.stringify(oneData));
        var copyNode = this._cell.clone();
        copyNode.visible = true;
        copyNode.setTag(oneData.id);

        var icon = copyNode.getChildByName("icon");
        var title = copyNode.getChildByName("Text_tile");
        var content = copyNode.getChildByName("Text_content");
        var btn = copyNode.getChildByName("btn_get");
        var btn_txt = copyNode.getChildByName("btn_txt");
        var iconImg = "EMail_3.0/receivestate" + oneData.type + ".png";
        var btnImg = "EMail_3.0/btn_lingqu.png";
        if (oneData.type == 1 || oneData.type == 3 || oneData.type == 4) {
            btnImg = "EMail_3.0/btn_xiangqing.png";
        }
        icon.ignoreContentAdaptWithSize(true);
        icon.loadTexture(iconImg);
        icon.loadTexture(iconImg);
        btn.loadTextureNormal(btnImg);
        btn.setTag(oneData.id);
        btn.setUserData(oneData);
        copyNode.setTag(oneData.id);
        copyNode.setUserData(oneData);
        var that = this;
        var clickCallBack = function (sender, type){
            if (type == 2){
                if (!!oneData.product)//奖励
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Youjian_Lingqu", {uid:SelfUid()});
                else
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Youjian_Chakanxiangqing", {uid:SelfUid()});
                var emailID = sender.getTag();
                var data = sender.getUserData();
                MjClient.gamenet.request("pkplayer.handler.mailOperate",{id:emailID,key:1},function(){});
                var iconImgChange = "EMail_3.0/receivestate" + (oneData.type - 3) + ".png";
                icon.loadTexture(iconImgChange);
                that.canDelete = true;
                var emailDetailLayer = new EmailDetailLayer_v3(data, function(id){
                    if (!cc.sys.isObjectValid(copyNode)) {
                        return;
                    }
                    if (emailID == id && copyNode && copyNode.getParent())
                    {
                        copyNode.runAction(cc.sequence(cc.scaleTo(0.3, 0), cc.callFunc(function()
                        {
                            that._ListView.removeItem(that._ListView.getIndex(copyNode));

                            if (that._ListView.getItems().length == 0 )
                            {
                                that._nullTip_image.visible = true;
                            }
                        })));
                    }
                });
                that.addChild(emailDetailLayer);
            }
        }
        copyNode.addTouchEventListener(clickCallBack);
        btn.addTouchEventListener(clickCallBack);
        title.ignoreContentAdaptWithSize(true);
        title.setString(getNewName(unescape(oneData.title), 13));
        var len = 18;
        var contentStr = unescape(oneData.content);
        if(contentStr)
        {
            contentStr = contentStr.replace(/\n/g, '  ');
            content.setString(getNewName(unescape(contentStr), len));
        }
        return copyNode;
    },
    addItems:function()
    {
        this._ListView.removeAllItems();
        this.canDelete = false;
        this.canReceive = false;
        var _emailList = MjClient.emailData;
        for(var i = 0; _emailList && i < _emailList.length ;i++)
        {
            if(cc.sys.isObjectValid(this._cell)) {
                this._ListView.pushBackCustomItem(this.createItem(_emailList[i]));
            }
            if (_emailList[i].type == 1 || _emailList[i].type == 3) {
                this.canDelete = true;
            }else if(_emailList[i].type == 2 || _emailList[i].type == 5){
                this.canReceive = true;
            }
        }
        
        var itemNum = this._ListView.getItems().length;

        this._nullTip_image.visible = itemNum == 0;
    },
});
/*
    邮件详情
 */
var EmailDetailLayer_v3 = cc.Layer.extend({
    ctor: function (data, callback) {
        this._super();
        var UI = ccs.load("eMailLayer_3.0.json");
        this.addChild(UI.node);
        var that = this;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.66, 0.695], [0.5, 0.5], [0, 0]);
        COMMON_UI.popDialogAni(_back);
        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Youjian_Chakanxiangqing_Close", {uid:SelfUid()});
                that.removeFromParent();
            }
        }, this);


        var _Text_tile = _back.getChildByName("Text_tile");
        _Text_tile.ignoreContentAdaptWithSize(true);
        _Text_tile.setString(unescape(data.title));

        var scrollView = _back.getChildByName("ScrollView");
        var _Text_desc = scrollView.getChildByName("Text_desc");
        _Text_desc.setString(unescape(data.content));
        _Text_desc.setTextAreaSize(cc.size(_Text_desc.width, 0));
        _Text_desc.ignoreContentAdaptWithSize(true);

        //scrollView.setInnerContainerSize(cc.size(_Text_desc.width, _Text_desc.height+170));
        //_Text_desc.setPosition(cc.p(scrollView.getInnerContainerSize().width/2, scrollView.getInnerContainerSize().height));

        _Text_tile.setString(getNewName("标题:" + unescape(data.title), 25));
        _Text_desc.setString(unescape(data.content));

        var _Text_ = scrollView.getChildByName("Text_");
        _Text_.visible = true;
        _Text_.ignoreContentAdaptWithSize(true);

        var yOffset = 160;
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
        {
            yOffset = 200;
        }
        _Text_desc.y = _Text_desc.height+yOffset;
        _Text_.y = _Text_desc.y;

        var iconI = 0;
        var icon0 = scrollView.getChildByName("Icon_0");
        icon0.y = _Text_desc.y - _Text_desc.getContentSize().height - 70;
        if(data.product && data.product.money){
            icon0.loadTexture("EMail_3.0/yuanbao.png");
            icon0.getChildByName("statuSign").visible = data.type == 3;
            var text = icon0.getChildByName("Text_1");
            text.setString("元宝X"+data.product.money);
            text.ignoreContentAdaptWithSize(true);
        }else {
            icon0.setVisible(false);
            iconI++;
        }
        var icon1 = scrollView.getChildByName("Icon_1");
        var dX = icon1.x - icon0.x;
        if(data.product && data.product.integral){
            icon1.loadTexture("EMail_3.0/giftCertificate.png");
            icon1.getChildByName("statuSign").visible = data.type == 3;
            var text = icon1.getChildByName("Text_1");
            text.setString("礼券X"+data.product.integral);
            text.ignoreContentAdaptWithSize(true);
            icon1.x = icon1.x-iconI*dX;
            icon1.y = icon0.y;
        }else {
            icon1.setVisible(false);
            iconI++;
        }
        var icon2 = scrollView.getChildByName("Icon_2");
        if(data.product && data.product.redPacket){
            icon2.loadTexture("EMail_3.0/redPacket.png");
            icon2.getChildByName("statuSign").visible = data.type == 3;
            var text = icon2.getChildByName("Text_1");
            text.setString("红包X"+data.product.redPacket);
            text.ignoreContentAdaptWithSize(true);
            icon2.x = icon2.x-iconI*dX;
            icon2.y = icon0.y;
        }else {
            icon2.setVisible(false);
            iconI++;
        }
        var icon3 = scrollView.getChildByName("Icon_3");
        if(data.product && data.product.activity){
            icon3.loadTexture("EMail_3.0/active.png");
            icon3.getChildByName("statuSign").visible = data.type == 3;
            var text = icon3.getChildByName("Text_1");
            text.setString("活跃度X"+data.product.activity);
            text.ignoreContentAdaptWithSize(true);
            icon3.x = icon3.x-iconI*dX;
            icon3.y = icon0.y;
        }else {
            icon3.setVisible(false);
            iconI++;
        }
        var icon4 = scrollView.getChildByName("Icon_4");
        if(data.product && data.product.gold){
            icon4.loadTexture("EMail_3.0/coin.png");
            icon4.getChildByName("statuSign").visible = data.type == 3;
            var text = icon4.getChildByName("Text_1");
            text.setString("金币X"+data.product.gold);
            text.ignoreContentAdaptWithSize(true);
            icon4.x = icon4.x-iconI*dX;
            icon4.y = icon0.y;
        }else {
            icon4.setVisible(false);
        }
        if(data.product){
            var len = Object.keys(data.product).length;
            var dis = dX/2*(5-len);
            icon0.x = icon0.x+dis;
            icon1.x = icon1.x+dis;
            icon2.x = icon2.x+dis;
            icon3.x = icon3.x+dis;
            icon4.x = icon4.x+dis;
        }
        scrollView.setInnerContainerSize(cc.size(scrollView.getInnerContainerSize().width,  _Text_desc.getContentSize().height + yOffset));

        var btn = _back.getChildByName("Button_get");
        btn.ignoreContentAdaptWithSize(true);
        if (!!data.product)//奖励
        {
            btn.loadTextureNormal("EMail_3.0/btn_lingqujiangli.png");
            btn.setTag(2);
        }
        else//通知
        {
            btn.loadTextureNormal("EMail_3.0/btn_shanchuyoujian.png");
            btn.setTag(3);
        }
        switch(data.type){
            case 1:
            case 3:
            case 4:
            btn.loadTextureNormal("EMail_3.0/btn_shanchuyoujian.png");
                btn.setTag(3);
                break;
        }
        function refreshStatu(isShow){

            if(data.product && data.product.money){
                icon0.getChildByName("statuSign").visible = isShow;
            }
            if(data.product && data.product.integral){
                icon1.getChildByName("statuSign").visible = isShow;
            }
            if(data.product && data.product.redPacket){
                icon2.getChildByName("statuSign").visible = isShow;
            }
            if(data.product && data.product.activity){
                icon3.getChildByName("statuSign").visible = isShow;
            }
            if(data.product && data.product.gold){
                icon4.getChildByName("statuSign").visible = isShow;
            }
        };

        btn.addTouchEventListener(function (sender, type)
        {
            if (type == 2)
            {
                if (!!data.product)//奖励
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Youjian_Chakanxiangqing_Lingqu", {uid:SelfUid()});
                else
                    MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Youjian_Chakanxiangqing_Zhidaole", {uid:SelfUid()});
                
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.mailOperate",{id:data.id,key:sender.getTag()},
                    function(rtn)
                    {
                        MjClient.unblock();
                        if(rtn.message && rtn.message.length>0)
                        {
                            MjClient.showToast(rtn.message);
                        }

                        if(rtn.code == 0 && sender.getTag() == 3)
                        {
                            callback(data.id);
                            that.removeFromParent();
                        }else if (rtn.code == 0 && sender.getTag() == 2) {
                            var emailLayerReceive = new EMailLayerReceive_v3(data, function(){
                                refreshStatu(true);
                                that.refreshBtn(sender,data);
                            });
                            that.addChild(emailLayerReceive);
                        }
                    }
                );

            }
        });
    },
    refreshBtn:function(playerNode,data){
        if (!!data.product)//奖励
        {
            playerNode.loadTextureNormal("EMail_3.0/lingqu.png");
            playerNode.setTag(2);
        }
        else//通知
        {
            bplayerNodetn.loadTextureNormal("EMail_3.0/shanchu.png");
            playerNode.setTag(3);
        }
        switch(data.type){
            case 1:
            case 3:
            case 4:
                playerNode.loadTextureNormal("EMail_3.0/shanchu.png");
                playerNode.setTag(3);
                break;
        }
    }
});

var EMailLayerReceive_v3 = cc.Layer.extend({
    ctor:function(data,callback){
        this._super();
        var UI = ccs.load("eMailLayerReceive_3.0.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        if (MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
            setWgtLayout(_back,[0.6, 0.6], [0.5, 0.5], [0, 0]);
        }
        else {
            setWgtLayout(_back,[0.66, 0.695], [0.5, 0.5], [0, 0]);
        }
        COMMON_UI.popDialogAni(_back);
        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Youjian_Chakanxiangqing_Close", {uid:SelfUid()});
                that.removeFromParent();
            }
        }, this);

        var iconI = 0;
        var icon0 = _back.getChildByName("Icon_0");
        var iconYMult = 0.5;
        if(data.product && data.product.money){
            icon0.loadTexture("EMail_3.0/yuanbao.png");
            var text = icon0.getChildByName("Text_1");
            text.setString("元宝X"+data.product.money);
            text.ignoreContentAdaptWithSize(true);
            icon0.y = _back.getContentSize().height*iconYMult;
        }else if (data && data.money) {
            icon0.loadTexture("EMail_3.0/yuanbao.png");
            var text = icon0.getChildByName("Text_1");
            text.setString("元宝X"+data.money);
            text.ignoreContentAdaptWithSize(true);
            icon0.y = _back.getContentSize().height*iconYMult;
        }else {
            icon0.setVisible(false);
            iconI++;
        }
        var icon1 = _back.getChildByName("Icon_1");
        var dX = icon1.x - icon0.x;
        if(data.product && data.product.integral){
            icon1.loadTexture("EMail_3.0/giftCertificate.png");
            var text = icon1.getChildByName("Text_1");
            text.setString("礼券X"+data.product.integral);
            text.ignoreContentAdaptWithSize(true);
            icon1.x = icon1.x-iconI*dX;
            icon1.y = icon0.y;
        }else if (data && data.gold) {
            icon1.loadTexture("EMail_3.0/coin.png");
            var text = icon1.getChildByName("Text_1");
            text.setString("金币X"+data.gold);
            text.ignoreContentAdaptWithSize(true);
            icon1.x = icon1.x-iconI*dX;
            icon1.y = icon0.y;
        }else {
            icon1.setVisible(false);
            iconI++;
        }
        var icon2 = _back.getChildByName("Icon_2");
        if(data.product && data.product.redPacket){
            icon2.loadTexture("EMail_3.0/redPacket.png");
            var text = icon2.getChildByName("Text_1");
            text.setString("红包X"+data.product.redPacket);
            text.ignoreContentAdaptWithSize(true);
            icon2.x = icon2.x-iconI*dX;
            icon2.y = icon0.y;
        }else if(data  && data.redPacket){
            icon2.loadTexture("EMail_3.0/redPacket.png");
            var text = icon2.getChildByName("Text_1");
            text.setString("红包X"+data.redPacket);
            text.ignoreContentAdaptWithSize(true);
            icon2.x = icon2.x-iconI*dX;
            icon2.y = icon0.y;
        }else {
            icon2.setVisible(false);
            iconI++;
        }
        var icon3 = _back.getChildByName("Icon_3");
        if(data.product && data.product.activity){
            icon3.loadTexture("EMail_3.0/active.png");
            var text = icon3.getChildByName("Text_1");
            text.setString("活跃度X"+data.product.activity);
            text.ignoreContentAdaptWithSize(true);
            icon3.x = icon3.x-iconI*dX;
            icon3.y = icon0.y;
        }else if(data && data.integral){
            icon3.loadTexture("EMail_3.0/giftCertificate.png");
            var text = icon3.getChildByName("Text_1");
            text.setString("礼券X"+data.integral);
            text.ignoreContentAdaptWithSize(true);
            icon3.x = icon3.x-iconI*dX;
            icon3.y = icon0.y;
        }else {
            icon3.setVisible(false);
            iconI++;
        }
        var icon4 = _back.getChildByName("Icon_4");
        if(data.product && data.product.gold){
            icon4.loadTexture("EMail_3.0/coin.png");
            var text = icon4.getChildByName("Text_1");
            text.setString("金币X"+data.product.gold);
            text.ignoreContentAdaptWithSize(true);
            icon4.x = icon4.x-iconI*dX;
            icon4.y = icon0.y;
        }else if(data && data.fangka){
            icon4.loadTexture("EMail_3.0/diamond.png");
            var text = icon4.getChildByName("Text_1");
            text.setString("钻石X"+data.fangka);
            text.ignoreContentAdaptWithSize(true);
            icon4.x = icon4.x-iconI*dX;
            icon4.y = icon0.y;
        }else {
            icon4.setVisible(false);
        }
        if(data.product){
            var len = Object.keys(data.product).length;
            var dis = dX/2*(5-len);
            icon0.x = icon0.x+dis;
            icon1.x = icon1.x+dis;
            icon2.x = icon2.x+dis;
            icon3.x = icon3.x+dis;
            icon4.x = icon4.x+dis;
        }else{
            var len = 0;
           if (typeof(data.money) != "undefined") len = Object.keys(data).length;
            var dis = dX/2*(5-len);
            icon0.x = icon0.x+dis;
            icon1.x = icon1.x+dis;
            icon2.x = icon2.x+dis;
            icon3.x = icon3.x+dis;
            icon4.x = icon4.x+dis; 
        }



        //领代金券
        if(data.product && data.product.treasVoucher){
            var voucherText = new ccui.Text();
            voucherText.setFontName("fonts/lanting.TTF");
            voucherText.setTextColor(cc.color("#D3260E"));
            voucherText.setFontSize(30);
            voucherText.setPosition(cc.p(_back.width/2,icon0.y+icon0.height/2));
            _back.addChild(voucherText);

            var str = "";
            if(data.product.treasVoucher){
                str += data.product.treasVoucher+"元宝箱现金券x1\n"
            }
            voucherText.setString(str)
        }else if(data && (data.voucher158 || data.voucher166 || data.voucher168 || data.voucher198)){
            var voucherText = new ccui.Text();
            voucherText.setFontName("fonts/lanting.TTF");
            voucherText.setTextColor(cc.color("#D3260E"));
            voucherText.setFontSize(30);
            voucherText.setPosition(cc.p(_back.width/2,icon0.y+icon0.width));
            _back.addChild(voucherText);

            var str = "";
            if(data.voucher158){
                str += "158元宝箱现金券x"+ data.voucher158 +"\n"
            }
            if(data.voucher166){
                str += "166元宝箱现金券x"+ data.voucher166 +"\n"
            }
            if(data.voucher168){
                str += "168元宝箱现金券x"+ data.voucher168 +"\n"
            }
            if(data.voucher198){
                str += "198元宝箱现金券x"+ data.voucher198 +"\n"
            }
            voucherText.setString(str)
        }


        var btn = _back.getChildByName("Button_get");
        btn.ignoreContentAdaptWithSize(true);
        btn.addTouchEventListener(function(sender,type){
            if (type == 2) {
                that.removeFromParent();
                callback();
            }
        });
    }
});









