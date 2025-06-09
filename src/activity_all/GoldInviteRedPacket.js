/**
 * Created by WuXiaoDong on 2018/11/1.
 */

var goldInviteRedPacketLayer = cc.Layer.extend({
    _back:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("GoldInviteRedpacketLayer.json");
        this._rootUI = UI.node;
        this.addChild(this._rootUI);
        var self = this;
        MjClient.goldInviteRedPacketui = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.94, 0.94], [0.5, 0.48], [0, 0]);

        //分享按钮
        var close = this._back.getChildByName("close");
        close.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
            }
        }, this);

        var imageLine = this._back.getChildByName("Image_line");
        imageLine.setVisible(false);

        this.initData();

        return true;
    },

    initData:function () {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.goldfieldInviteInfo",{},function(rtn){
            cc.log("wxd pkplayer.handler.goldfieldInviteInfo:"+JSON.stringify(rtn))
            MjClient.unblock();
            if(rtn.code == 0) {
                self.initUI(rtn.data);
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    },

    initUI:function (data) {
        var self = this;

        var imageLine = this._back.getChildByName("Image_line");
        imageLine.setVisible(true);

        //能否一键领取
        var isAKeyGet = false;

        var listData = data.list;
        if(listData){
            for(var i = 0; i< listData.length; i++){
                var headNode = imageLine.getChildByName("Node_"+ i);
                if(headNode){
                    var btnAdd = headNode.getChildByName("btn_add");
                    btnAdd.addTouchEventListener(function (sender, type) {
                        if (type == ccui.Widget.TOUCH_ENDED) {
                            self.removeFromParent();
                            var layer = new shareLayer(data.shareUrl);
                            MjClient.Scene.addChild(layer);
                        }
                    }, this);
                    var headDi = headNode.getChildByName("headDi");
                    var btnGold = headNode.getChildByName("btn_gold");

                    if(listData[i].id){
                        headDi.setVisible(true);
                        btnAdd.setVisible(false);

                        //显示头像
                        var _headFrame = headDi.getChildByName("head");
                        var url = listData[i].headimgurl;
                        if(!url) url="png/default_headpic.png";
                        function loadHead(i, _headFrame) {
                            cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
                            {
                                if(!err&&texture&&cc.sys.isObjectValid(imageLine))
                                {
                                    var clipper = new cc.ClippingNode();
                                    var sten = cc.Sprite.create("active_gold_yaoQingHongBao/head.png");
                                    var stenSize = sten.getContentSize();
                                    sten.setPosition(_headFrame.getPosition());
                                    clipper.setContentSize(stenSize);
                                    clipper.setStencil(sten);
                                    clipper.setAlphaThreshold(0.5);
                                    imageLine.getChildByName("Node_"+ i).getChildByName("headDi").addChild(clipper);
                                    var headSprite = new cc.Sprite(texture);
                                    headSprite.setPosition(sten.getPosition());
                                    headSprite.setScaleX(_headFrame.width/headSprite.width);
                                    headSprite.setScaleY(_headFrame.height/headSprite.height);
                                    clipper.addChild(headSprite);
                                }
                            });
                        }
                        loadHead(i, _headFrame);
                    }else {
                        headDi.setVisible(false);
                        btnAdd.setVisible(true);
                    }

                    if(listData[i].status == 2){
                        btnGold.getTitleRenderer().setString("已领取")
                    }else {
                        var str = "";
                        if(listData[i].award.money > 0){
                            str = listData[i].award.money + "元宝";
                        }else if(listData[i].award.gold > 0){
                            str = listData[i].award.gold + "金币";
                        }else if(listData[i].award.redpacket > 0){
                            str = listData[i].award.redpacket + "红包";
                        }else if(listData[i].award.integral > 0){
                            str = listData[i].award.integral + "礼券";
                        }
                        btnGold.getTitleRenderer().setString(str);
                        if(listData[i].status == 0){
                            btnGold.setBright(false);
                        }else if(listData[i].status == 1){
                            btnGold.setBright(true);
                            isAKeyGet = true;
                        }
                    }
                }
            }
        }

        var imageLight = imageLine.getChildByName("Image_light");
        if(data.extra.status == 1){
            imageLight.setVisible(true);
        }else {
            imageLight.setVisible(false);
        }
        imageLight.runAction(cc.repeatForever(cc.rotateBy(5, 360)));

        var imageRedpacket = imageLine.getChildByName("Image_redpacket");
        for(var i = 0; i< 3; i++){
            var light = imageRedpacket.getChildByName("Image_light_"+i);
            if(data.extra.status == 1){
                light.setVisible(false);
                light.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.2*i),cc.callFunc(function () {this.setVisible(true)}.bind(light)),cc.delayTime(0.2),cc.callFunc(function () {this.setVisible(false)}.bind(light)),cc.sequence(cc.delayTime(0.6 - 0.2*i)))));
            }else {
                light.stopAllActions();
                light.setVisible(false);
            }
        }

        var btnGet = imageRedpacket.getChildByName("btn_get");
        if(data.extra.status == 1){
            btnGet.setBright(true);
        }else {
            btnGet.setBright(false);
        }
        btnGet.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                cc.log("红包领奖");
                var self = this;
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.goldfieldInviteRecv", {type: 2}, function (rtn) {
                    cc.log("wxd pkplayer.handler.goldfieldInviteRecv:" + JSON.stringify(rtn));
                    MjClient.unblock();
                    if (rtn.code == 0) {
                        MjClient.Scene.addChild(new goldInviteRedPacketRewardLayer(rtn.data));
                    } else {
                        MjClient.showToast(rtn.message);
                    }
                });
            }
        }, this);

        // 闪光效果
        btnGet.removeAllChildren();
        if(data.extra.status == 1) {
            var clipper = cc.ClippingNode.create();
            var sten = cc.Sprite.create("active_gold_yaoQingHongBao/btn_get_N.png");
            var stenSize = sten.getContentSize();
            clipper.setContentSize(stenSize);
            clipper.setStencil(sten);
            clipper.setAlphaThreshold(0.5);
            sten.setPosition(btnGet.width / 2, btnGet.height / 2);
            btnGet.addChild(clipper, 2);
            var sprite = new cc.Sprite("active_gold_yaoQingHongBao/saoguang.png");
            clipper.addChild(sprite, 1);
            var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
                cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
                cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
                cc.delayTime(0.8)));
            sprite.runAction(repeatAction); //进行向右移动的重复动作
        }
        // if(data.extra.status == 1){
        //     sprite.setVisible(true);
        // }else {
        //     sprite.setVisible(false);
        // }

        var btnToInvite = this._back.getChildByName("btn_toInvite");
        btnToInvite.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
                var layer = new shareLayer(data.shareUrl);
                MjClient.Scene.addChild(layer);
            }
        }, this);
        var qipao = btnToInvite.getChildByName("qipao");
        qipao.setVisible(false);
        qipao.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.7, 0, -10), cc.moveBy(0.7, 0, 10))));
        var hongdian = btnToInvite.getChildByName("hongdian");
        hongdian.setVisible(false);

        var btnAKeyGet = this._back.getChildByName("btn_aKeyGet");
        btnAKeyGet.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                cc.log("一键领取");
                var self = this;
                if(isAKeyGet) {
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.goldfieldInviteRecv", {type: 1}, function (rtn) {
                        cc.log("wxd pkplayer.handler.goldfieldInviteRecv:" + JSON.stringify(rtn));
                        MjClient.unblock();
                        if (rtn.code == 0) {
                            MjClient.Scene.addChild(new goldInviteRedPacketRewardLayer(rtn.data));
                        } else {
                            MjClient.showToast(rtn.message);
                        }
                    });
                }else {
                    MjClient.showToast("没有可领取的奖励");
                }
            }
        }, this);
    },
});


var goldInviteRedPacketRewardLayer = cc.Layer.extend({
    ctor: function(listData) {
        this._super();
        var UI = ccs.load("GoldInviteRedpacketRewardLayer.json");
        this.addChild(UI.node);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);

        var _close = _back.getChildByName("btn_yes");
        _close.addTouchEventListener(function(sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                self.removeFromParent();
                if(cc.sys.isObjectValid(MjClient.goldInviteRedPacketui)){
                    MjClient.goldInviteRedPacketui.initData();
                }
            }
        }, this);

        var img_1 = _back.getChildByName("img_1");
        var pos = img_1.getPosition();
        img_1.setVisible(false);
        var text = "";
        if(listData){
            var Arr = Object.keys(listData);
            var newArr = [];
            for(var i=0; i< Arr.length; i++){
                if(listData[Arr[i]]>0){
                    newArr.push(Arr[i]);
                }
            }
            for (var j=0; j< newArr.length; j++){
                var cloneItem = img_1.clone();
                cloneItem.setVisible(true);
                cloneItem.x = pos.x - (newArr.length-1)*100 + j*200;
                cloneItem.y = pos.y;
                _back.addChild(cloneItem);
                var _icon = cloneItem.getChildByName("icon_prize");
                var _txt_num = cloneItem.getChildByName("Text_num");
                _txt_num.ignoreContentAdaptWithSize(true);
                if(newArr[j] == "money"){
                    _icon.loadTexture("active_gold_yaoQingHongBao/gold.png");
                    _txt_num.setString("元宝X"+listData[newArr[j]]);
                    text += listData[newArr[j]]+"元宝，";
                }else if(newArr[j] == "gold"){
                    _icon.loadTexture("active_gold_yaoQingHongBao/gold.png");
                    _txt_num.setString("金币X"+listData[newArr[j]]);
                    text += listData[newArr[j]]+"金币，";
                }else if(newArr[j] == "redpacket"){
                    _icon.loadTexture("active_gold_yaoQingHongBao/redPacket.png");
                    _txt_num.setString("红包X"+listData[newArr[j]]);
                    text += listData[newArr[j]]+"元红包，";
                }else if(newArr[j] == "integral"){
                    _icon.loadTexture("active_gold_yaoQingHongBao/gold.png");
                    _txt_num.setString("礼券X"+listData[newArr[j]]);
                    text += listData[newArr[j]]+"礼券，";
                }
            }
        }

        var _moneyText = _back.getChildByName("Text_1");
        _moneyText.ignoreContentAdaptWithSize(true);
        _moneyText.setString("恭喜您获得"+text +"奖励已发放到账，请注意查收");

        return true;
    }
});