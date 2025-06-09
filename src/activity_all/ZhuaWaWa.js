/**
 * Created by lms.
 */

var ZhuaWaWa_mainLayer = cc.Layer.extend({

    onExit:function()
    {
        this._super();
        playMusic("bgMain");
    },
    ctor: function(data) {
        this._super();

        var UI = ccs.load("ZhuaWaWa_main.json");
        this.addChild(UI.node);

        MjClient.ZhuaWaWa_mainUI = this;


        var self = this;
        this._zhuaData = null;
        this._data = data;
        this._fangxiang = false;
        this._canrun = true;
        this._schedule = true;
        this._schedule_switch = false;
        this._closeCallback = null;

        //分享相关
        this.luckyPrize_number = null;
        this.luckyPrize_type = null;
        this._shareType = null;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        //setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);

        this._closeBtn = this._back.getChildByName("close");
        this._closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (this._closeCallback)
                {
                    this._closeCallback();
                }
                playMusic("bgMain");
                self._clickBtnVoice(1,false);
                MjClient.ZhuaWaWa_mainUI = null;
                self.removeFromParent();
            }
        },this);

        this.node_right = this._back.getChildByName("node_right");
        this.node_left = this._back.getChildByName("node_left");
        this._text_left = this.node_right.getChildByName("text_left");
        this._text_left.setString("");

        this._gouzi = this.node_left.getChildByName("img_gouzi");
        this._gouzi.setPosition(cc.p(90, 850));

        this._zhuazi = this._gouzi.getChildByName("img_1");
        this._gen_1 = this._zhuazi.getChildByName("img_left");
        this._gen_2 = this._zhuazi.getChildByName("img_right");

        
        if (MjClient.size.width / MjClient.size.height > this._back.width / this._back.height) {
            var a = (MjClient.size.width / MjClient.size.height) / (this._back.width / this._back.height);
            this._back.width *= a;
        } else {
            var a = (this._back.width / this._back.height) / (MjClient.size.width / MjClient.size.height);
            this._back.height *= a;
        }
        this._closeBtn.x = this._back.width - 50;
        this.node_right.x = this._back.width;
        this.node_right.y = this._back.height/2;
        this.node_left.width = this._back.width - this.node_right.width;
        this.node_left.y = this._back.height/2;
        this.node_left.getChildByName("bg_1").width = this.node_left.width;
        this.node_left.getChildByName("ScrollView_1").width = this.node_left.getChildByName("bg_1").width - 70 - 90;
        this.node_left.getChildByName("node_1").x = this.node_left.width/2;
        this.node_left.getChildByName("viewLayer").width = this.node_left.width;
        this.node_left.getChildByName("btn_wenhao").x = this.node_left.width - 45;

        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);


        this.btn_list = this.node_right.getChildByName("btn_list");
        this.btn_list.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                self._clickBtnVoice(1,false);
                MjClient.Scene.addChild(new ZhuaWaWa_listLayer(this._data));
            }
        }, this);
        this.btn_wenhao = this.node_left.getChildByName("btn_wenhao");
        this.btn_wenhao.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                self._clickBtnVoice(1,false);
                MjClient.Scene.addChild(new ZhuaWaWa_ruleLayer(this._data));
                // MjClient.Scene.addChild(new ZhuaWaWaBackLayer(1,1,true));
            }
        }, this);
        this.btn_zhua = this.node_right.getChildByName("btn_zhua");
        this.btn_zhua.setTouchEnabled(false);
        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("ZhuaWaWa/btn_zhua.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setScale(1.24);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        this.btn_zhua.addChild(clipper);
        var sprite = new cc.Sprite("ZhuaWaWa/zhua_guang2.png");
        sprite.setScale(1.24);
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));

        sprite.runAction(repeatAction); //进行向右移动的重复动作
        this._guang_1 = sprite;

        this.btn_guang = this.btn_zhua.getChildByName("img_guang");
        this.btn_guang.runAction(cc.sequence(cc.delayTime(0.7), cc.callFunc(function() {
            self.btn_guang.visible = false;
        }), cc.delayTime(0.1), cc.callFunc(function() {
            self.btn_guang.visible = true;
        }), cc.delayTime(1.3)).repeatForever());

        this.btn_zhua.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (!self._gouzhong) {
                    this._gouzi.stopAllActions();
                    self._gouzhong = true;
                } else {
                    MjClient.showToast("上次抓还未结束");
                    return;
                }


                if (this._schedule) {
                    this._clickBtnVoice(2,false)
                    this._zhuazi.haveThings = false;
                    this._schedule = false;
                    this._gouzi.stopAllActions();
                    // cc.log(" ======== this._gouzi", this._gouzi, self.act_3, self.act_3);
                    var act_3 = cc.moveBy(1.5, cc.p(0, -385));

                    var act_g1 = cc.rotateBy(1.3, 30);
                    var act_g2 = cc.rotateBy(0.2, -30);
                    var act_g3 = cc.rotateBy(1.3, -30);
                    var act_g4 = cc.rotateBy(0.2, 30);

                    var call = function() {

                        if (self._zhuazi.zhuaThing) {
                            self._zhuazi.zhuaThing.setZOrder(1);
                            var sp_g = new cc.Sprite("ZhuaWaWa/guang_bg.png");
                            sp_g.setPosition(75,75);
                            sp_g.runAction(cc.blink(2,5).repeatForever())
                            sp_g.setZOrder(-1);
                            self._zhuazi.zhuaThing.addChild(sp_g);

                            var pos_gouzi = self._gouzi.getPositionX();
                            var act_f = cc.scaleTo(1,2.0);
                            
                            var act_h = cc.moveBy(1,cc.p(self._back.width/2-pos_gouzi,-170));
                            if (self.luckyPrize_type) {
                                self._clickBtnVoice(4,false);
                                self._zhuazi.zhuaThing.runAction(cc.sequence(cc.spawn(act_f,act_h), cc.delayTime(0.1),cc.callFunc(function(){
                                    self._zhuazi.zhuaThing.removeFromParent();
                                    self._zhuazi.zhuaThing = null;
                                    self.addChild(new ZhuaWaWaBackLayer(self.luckyPrize_type , self.luckyPrize_number, true), 200);
                                })));
                            }else{
                                self._clickBtnVoice(5,false);
                                self._zhuazi.zhuaThing.removeFromParent();
                                self._zhuazi.zhuaThing = null;
                                self.addChild(new ZhuaWaWaBackLayer(self.luckyPrize_type, self.luckyPrize_number, true), 200);
                            }


                        } else {
                            self._clickBtnVoice(5,false);
                            self.reqZhua(9999);
                            self.addChild(new ZhuaWaWaBackLayer(0, 0, true), 200);
                        }

                        self.reqMainMsg();

                    }



                    self._gen_1.runAction(cc.sequence(act_g1, act_g2));
                    self._gen_2.runAction(cc.sequence(act_g3, act_g4));


                    self._zhuazi.runAction(cc.sequence(act_3, cc.callFunc(function() {
                        // self.reqZhua();
                        var act_4 = cc.moveBy(2.5, cc.p(0, 385));
                        self._canLaQi = false;
                        self._isNoPrize = false;
                        var randomNum = Math.random() < 0.5 ? 0 : 1;

                        self._zhuazi.schedule(function() {

                            var act_5 = cc.moveBy(2, cc.p(0, -3000));
                            var r1 = 10;
                            var time = 0.09;
                            var act_21 = cc.rotateTo(time, r1);
                            var act_22 = cc.rotateTo(time, -1 * r1);
                            var act_23 = cc.rotateTo(time, r1);
                            var act_24 = cc.rotateTo(time, -1 * r1);
                            var act_25 = cc.rotateTo(time, r1);
                            var act_26 = cc.rotateTo(time, -1 * r1);

                            if (self._onetime) {
                                self._onetime = false;
                                if (self._zhuaData && self._zhuaData.title) {
                                    self._canLaQi = true;
                                } else {
                                    self._isNoPrize = true;
                                }
                            }
                            if (self._isNoPrize) {
                                self._isNoPrize = false;
                                if (self._zhuazi.zhuaThing) {
                                    if (randomNum == 1) {
                                        self._zhuazi.zhuaThing.runAction(cc.sequence(cc.delayTime(0.6), act_5));
                                    } else {
                                        self._zhuazi.zhuaThing.runAction(cc.sequence(act_21, act_22, act_23, act_24, act_25, act_26));
                                        self._zhuazi.zhuaThing.runAction(cc.sequence(cc.delayTime(0.2), act_5));
                                    }


                                }

                            }
                            if (self._canLaQi) {
                                self._canLaQi = false;
                            }
                        }, 0.1);

                        self._zhuazi.runAction(cc.sequence(cc.delayTime(0.1), act_4, cc.callFunc(call)));



                    })));


                }

            }
        }, this);

        this._listView = this.node_left.getChildByName("viewLayer");
        this._cell = this._listView.getChildByName("img_1");
        this.img_shui = this._listView.getChildByName("img_shui");

        this._cell.visible = false;
        this._list = [];
        this._listShui = [];
        

        UIEventBind(null, this.node_right, "WX_SHARE_SUCCESS", function(data) {
            cc.log(" ====== data",JSON.stringify(data))
            if (parseInt(data.errCode) == 0) {
                    if (self._shareType) {
                        this.runAction(cc.sequence(cc.DelayTime(0.3), cc.callFunc(function() {
                            self.reqTodayShare();
                        })));
                    }
                    
            }
            if (self._shareType != 1) {
                MjClient.wxShareImageToPYQ = false;
            }

        });

        this._listShui = [];
        for (var i = 0; i < 3; i++) {
            this._listShui[i] = this._listView.getChildByName("img_shui_" + i);
        }


        this.sprite_bigPrize = this.node_left.getChildByName("node_1").getChildByName("sprite_bigPrize");
        this.sprite_bigPrize.setTexture("ZhuaWaWa/icon_empty.png");
        this.text_bigPrize = this.node_left.getChildByName("node_1").getChildByName("text_bigPrize");
        this.text_bigPrize.setString("");

        this._listDanMu = this.node_left.getChildByName("ScrollView_1");
        this._cellDanMu = this.node_left.getChildByName("Text_danmu");
        this._cellDanMu.visible = false;

        this._work_list = this.node_right.getChildByName("ListView_1");
        this._work_cell = this.node_right.getChildByName("cell_item");
        this._work_cell.visible = false;

        if (!this._data) {
            this.reqMainMsg();
        }else{
            this.initMain();
        }
        playMusic("act_zhua_wa_wa/bgm_zww");


        if (this._schedule) {
            this._gouzi.schedule(function() {
                var pos_x = this.getPositionX();
                var width = self.node_left.width - 90;
                // cc.log("====== pos_x", pos_x)
                var time_1 = (width - pos_x) / 100;
                var time_2 = (pos_x - 90) / 100;
                var act_1 = cc.moveTo(time_1, cc.p(width, 850));
                var act_2 = cc.moveTo(time_2, cc.p(90, 850));



                if (pos_x >= width || pos_x <= 90) {
                    this.stopAllActions();
                    self._canrun = true;
                }

                if (self._canrun) {
                    self._canrun = false;
                    if (!self._fangxiang) {
                        this.stopAllActions();
                        this.runAction(act_1);
                        self._fangxiang = true;
                    } else {
                        this.stopAllActions();
                        this.runAction(act_2);
                        self._fangxiang = false;
                    }
                }
                if (self._gouzhong) {
                    self._closeBtn.setTouchEnabled(false);
                    this.stopAllActions();

                }else{
                    self._closeBtn.setTouchEnabled(true);
                }


            }, 0.5);
        }
    },


    type_work:function(type){
        if (this._gouzhong) return;
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

                var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "ZhuaWaWa/participator_1.jpg";
                MjClient.native.wxShareImageToPYQ(filePath);
                break;
            case 6://开房 对战
                postEvent("createRoom", {});
                this.removeFromParent();
                break;
            case 7:// 亲友圈场次
                MjClient.Scene.addChild(new FriendCard_main());
                this.removeFromParent()
                break;
        }
    },

     createItem_work:function(oneData,number)
    {
        var self = this;
        var copyNode = this._work_cell.clone();
        copyNode.visible = true;

        var Text_rule = copyNode.getChildByName("Text_rule");
        Text_rule.ignoreContentAdaptWithSize(true);
        Text_rule.setString("·"+oneData.title);

        var Text_1 = copyNode.getChildByName("Text_1");
        Text_1.ignoreContentAdaptWithSize(true);
        Text_1.setString(oneData.count + "/" + oneData.total);
        self["btn_rule_" + number] = copyNode.getChildByName("btn_rule");
        self["btn_rule_" + number].setTag(oneData.type);
        self["btn_rule_" + number].addTouchEventListener(function(sender,type){
            var tag = sender.getTag();
            if (type == 2) {
                this.type_work(tag);
            }
        },this)

        if (oneData.count >= oneData.total) {
            self["btn_rule_" + number].loadTextureNormal("ZhuaWaWa/btn_ok.png");
            self["btn_rule_" + number].setTouchEnabled(false);
        } else {
            self["btn_rule_" + number].loadTextureNormal("ZhuaWaWa/btn_go.png");
            self["btn_rule_" + number].setTouchEnabled(true);
        }
      

        return copyNode;
    },
    addItems_work:function()
    {
        var _emailList = this._data.arr;
        this._work_list.removeAllItems();
        for(var i = 0;i < _emailList.length ;i++)
        {
            if(cc.sys.isObjectValid(this._work_cell)) {
                this._work_list.pushBackCustomItem(this.createItem_work(_emailList[i],i));
            }
        }
        this._work_list.setScrollBarOpacity(0);
    },

    createItem: function(oneData, number) {
        var copyNode = this._cell.clone();
        copyNode.visible = false;
        var pos_y = copyNode.getPositionY();
        var pos_x = copyNode.getPositionX();
        pos_x = pos_x + number * 200;

        var sprite_bg = new cc.Sprite("ZhuaWaWa/icon_empty.png");
        sprite_bg.setPosition(cc.p(pos_x, pos_y))
        this._listView.addChild(sprite_bg);

        var sprite_2;
        if (number % 2 == 1) {
            sprite_2 = new cc.Sprite("ZhuaWaWa/bg_quan_1.png");
        } else {
            sprite_2 = new cc.Sprite("ZhuaWaWa/bg_quan_2.png");
        }
        sprite_2.setPosition(cc.p(90, 78));
        sprite_bg.addChild(sprite_2, -1);

        var imageUrl = oneData.image;
        cc.loader.loadImg(imageUrl ? imageUrl : "ZhuaWaWa/icon_empty.png", {
            isCrossOrigin: true
        }, function(err, img) {
            if (err) {
                cc.log(err);
            } else if (img && cc.sys.isObjectValid(sprite_bg)) {
                sprite_bg.setTexture(img);
            }
        });
        sprite_bg.setScale(1.0);

        var act_func = function(node,time1,time2){
            node.runAction(cc.sequence(cc.delayTime(time1),cc.spawn(cc.fadeIn(1),cc.scaleTo(1,1)) ,cc.delayTime(1),cc.callFunc(function(){
                node.setOpacity(0);
                node.setScale(0.1);
            }),cc.delayTime(time2)).repeatForever());
        }

        if (oneData.title == "小熊熊") {
            var sprite_3 = new cc.Sprite("ZhuaWaWa/speak_3.png");
            sprite_3.setPosition(cc.p(78,200));
            sprite_3.setOpacity(0);
            sprite_3.setScale(0.1)
            act_func(sprite_3,1,4);
            sprite_bg.addChild(sprite_3);
        }else if (oneData.title.indexOf("红包")>= 0) {
            var sprite_3 = new cc.Sprite("ZhuaWaWa/speak_1.png");
            sprite_3.setPosition(cc.p(78,200));
            sprite_3.setOpacity(0);
            sprite_3.setScale(0.1);
            act_func(sprite_3,2,3);
            sprite_bg.addChild(sprite_3);
        }else if (oneData.title == "iphoneX") {
            var sprite_3 = new cc.Sprite("ZhuaWaWa/speak_2.png");
            sprite_3.setPosition(cc.p(78,200));
            sprite_3.setOpacity(0);
            sprite_3.setScale(0.1);
            act_func(sprite_3,3,2);
            sprite_bg.addChild(sprite_3);
        }else if (oneData.title.indexOf("元宝")>= 0) {
            var sprite_3 = new cc.Sprite("ZhuaWaWa/speak_1.png");
            sprite_3.setPosition(cc.p(78,200));
            sprite_3.setOpacity(0);
            sprite_3.setScale(0.1);
            act_func(sprite_3,4,1);
            sprite_bg.addChild(sprite_3);
        }
        
        this._list[number] = sprite_bg;
        this._list[number].title = oneData.title;

        // var v = new cc.LayerColor(cc.color(255, 0, 0), sprite_bg.width, sprite_bg.height);
        // sprite_bg.addChild(v);

    },
    _clickBtnVoice:function(type,isbool){
        // type 1 常用按键 2 抓按键 3 抓  4 抓成功 5 抓失败
        switch(type) {
            case 1:
                playEffect("act_zhua_wa_wa/click_btn",isbool);
                break;
            case 2:
                playEffect("act_zhua_wa_wa/click_zhua",isbool);
                break;
            case 3:
                playEffect("act_zhua_wa_wa/zhua_music",isbool);
                break;
            case 4:
                playEffect("act_zhua_wa_wa/prize_music",isbool);
                break;
            case 5:
                playEffect("act_zhua_wa_wa/fail_music",isbool);
                break;

            default :
                
                break;
        }
    },

    checkBox: function() {
        if (this._zhuazi.haveThings)
            return;
        var self = this;
        var p = {};
        p.x = this._zhuazi.x + this._zhuazi.width * (0.5 - this._zhuazi.getAnchorPoint().x);
        p.y = this._zhuazi.y - this._zhuazi.height * this._zhuazi.getAnchorPoint().y + 75;
        p = this._zhuazi.getParent().convertToWorldSpace(p);

        for (var i = 0; i < this._list.length; i++) {
            var node = this._list[i];
            var rect = node.getBoundingBox();
            if (node.title.indexOf("元宝") == -1  && node.title.indexOf("红包") == -1) {
                rect.x += rect.width*2/5;
                rect.width -= rect.width*4/5;
            }
            var startP = node.getParent().convertToWorldSpace(cc.p(rect.x, rect.y));
            var endP = node.getParent().convertToWorldSpace(cc.p(rect.x + rect.width, rect.y + rect.height));
            

            if (startP.x < p.x && startP.y < p.y && p.x < endP.x && p.y < endP.y && node.visible) {
                node.setVisible(false);
                this.reqZhua(node.title);
                this._zhuazi.zhuaThing = cc.Sprite.create(node.getSpriteFrame());
                this._zhuazi.zhuaThing.setPosition(cc.p(75, 0));
                this._zhuazi.zhuaThing.visible = true;
                this._zhuazi.addChild(this._zhuazi.zhuaThing, -1)

                this._zhuazi.haveThings = true;
                cc.log("- zhua zhu --");
                // this._clickBtnVoice(3,false);
            }
        }
    },

    initMain: function() {
        var self = this;
        this.addItems_work();
        this._text_left.setString("您还有" + this._data.lastChance + "次机会");

        var Text_desc= this.node_right.getChildByName("Text_desc");
        Text_desc.ignoreContentAdaptWithSize(true);
        if (MjClient.APP_TYPE.BDHYZP == MjClient.getAppType() ) {
            Text_desc.setString("获得现金奖励可到公众号("+this._data.wechat +")·北斗红包领取");
        }else if (MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType() ) {
            Text_desc.setString("获得现金奖励可到公众号("+this._data.wechat +")·天天红包领取");
        }else if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG){
            Text_desc.setString("获得现金奖励可到公众号("+this._data.wechat +")·旺旺红包领取");
        }   
        else {
            Text_desc.setString("获得现金奖励可到公众号("+this._data.wechat +")·牌友联盟红包领取");
        }
        

        var sprite_bg = this.sprite_bigPrize;
        if (!this._data.specialAward.title) {
            this.text_bigPrize.setString("暂无大奖");
        }else{
           this.text_bigPrize.setString(this._data.specialAward.title); 
        }
        var imageUrl = this._data.specialAward.image;
        cc.loader.loadImg(imageUrl ? imageUrl : "ZhuaWaWa/icon_empty.png", {
            isCrossOrigin: true
        }, function(err, img) {
            if (err) {
                cc.log(err);
            } else if (img && cc.sys.isObjectValid(sprite_bg)) {
                sprite_bg.setTexture(img);
            }
        });


        if (this._data.lastChance <= 0) {
            this.btn_zhua.loadTextureNormal("ZhuaWaWa/btn_zhua2.png");
            this.btn_zhua.setTouchEnabled(false);
            this._guang_1.visible = false;
            this.btn_guang.setOpacity(0);
        } else {
            this.btn_zhua.loadTextureNormal("ZhuaWaWa/btn_zhua.png");
            this.btn_zhua.setTouchEnabled(true);
            this._guang_1.visible = true;
            this.btn_guang.setOpacity(255);
        }

        var _list = this._data.awardList;


        for (var i = 0; i < _list.length; i++) {
            if (!this._list[i]) {
                this.createItem(_list[i], i);
                var act_1 = cc.moveBy(1, cc.p(-160, 0)).repeatForever();
                var act_a = cc.sequence(cc.moveBy(1, cc.p(0, 20)), cc.moveBy(1, cc.p(0, -20))).repeatForever();
                var act_g = cc.moveBy(1, cc.p(-160, 0)).repeatForever();
                // var act_b = cc.moveTo(2,cc.p(0,-12));
                self._list[i].runAction(act_1);
                self._list[i].runAction(act_a);
                if (self._listShui[i] && cc.sys.isObjectValid(self._listShui[i])) {

                    self._listShui[i].runAction(act_g);
                }
                var funcRun = function(i, len) {
                    if (!self._list[i].run) {
                        // cc.log(" =====self._list[i].run i ", self._list[i].run, i)
                        self._list[i].run = true;


                        self._list[i].schedule(function() {
                            var pos_x1 = self._list[i].getPositionX();
                            var pos_y1 = self._list[i].getPositionY();
                            var left_one = i>0 ? i-1:len-1;
                            var pos_x2 = self._list[left_one].getPositionX();
                            var pos_y2 = self._list[left_one].getPositionY();

                            if(pos_x1 > 200 && pos_x1-pos_x2 != 200) 
                                    self._list[i].setPositionX(pos_x2 + 200);
                            
                            if (pos_x1 <= -100) {

                                self._list[i].setPosition(cc.p(200 * len - 50, pos_y1));
                                self._list[i].visible = true;
                                
                            }
                            if (self._listShui[i]) {
                                var left_one = i>0 ? i-1:2;
                                var pos_sx = self._listShui[i].getPositionX();
                                var pos_sy = self._listShui[i].getPositionY();
                                var pos_x2 = self._listShui[left_one].getPositionX();
                                var pos_y2 = self._listShui[left_one].getPositionY();

                                if(pos_sx > 800 && pos_sx-pos_x2 != 700) 
                                        self._listShui[i].setPositionX(pos_x2 + 700);                                
                                if (pos_sx <= -383) {
                                    self._listShui[i].setPosition(cc.p(1135, pos_sy));
                                }

                            }
                        }, 0.5);

                    }
                }
                funcRun(i, _list.length);
            }

        }

        this.schedule(function() {
            this.checkBox();
        }, 0.1);



        var elements = this._data.lotteryList;
        this._listDanMu.setInnerContainerSize(cc.size(450 * elements.length, 80));
        this._listDanMu.setScrollBarOpacity(0);
        this._listDanMu.setTouchEnabled(false);

        var pos_topX = this._listDanMu.getContentSize().width - this._listDanMu.getInnerContainerSize().width;
        cc.log(" ==== this._listDanMu.getContentSize().widt ", this._listDanMu.getContentSize().width, this._listDanMu.getInnerContainerSize().width)
        var pos_BotX = 0;
        var number_bar = pos_topX / 600;
        var per = 3500 * 3 / -pos_topX; // 每条3500像素高度 * 每次滚几条 
        var pos_to = 0;
        this._listDanMu.removeAllChildren();
        var _scroll = this._listDanMu;
        // var _txt2 = ""


        for (var i = 0; i < elements.length; i++) {
            // cc.log(" -----i === ", i, elements[i],elements[i]["nickname"],elements[i]["title"]);
            var _txt1 = this._cellDanMu.clone();
            _txt1.visible = true;
            var _txt2 = ""
            if (i < elements.length - 1) {
                _txt2 += " " + this.setNewName(unescape(elements[i]["nickname"]), 6) + "：" + "获得" + (elements[i]["title"]) + "";
            } else {
                _txt2 += " " + this.setNewName(unescape(elements[i]["nickname"]), 6) + "：" + "获得" + (elements[i]["title"]) + "";
            }

            _txt1.setString(_txt2);
            _txt1.setFontSize(28);
            _txt1.setPosition( i  * 450, 0);
            _scroll.addChild(_txt1);
        }
        for (var i = elements.length - 1; i >= 0; i--) {
            // cc.log(" -----i === ", i, elements[i],elements[i]["nickname"],elements[i]["title"]);
            var _txt1 = this._cellDanMu.clone();
            _txt1.visible = true;
            var _txt2 = ""
            if (i < elements.length - 1) {
                _txt2 += " " + this.setNewName(unescape(elements[i]["nickname"]), 6) + "：" + "获得" + (elements[i]["title"]) + "";
            } else {
                _txt2 += " " + this.setNewName(unescape(elements[i]["nickname"]), 6) + "：" + "获得" + (elements[i]["title"]) + "";
            }

            _txt1.setString(_txt2);
            _txt1.setFontSize(28);
            _txt1.setPosition((elements.length - i - 1) * 450 + 200, 40);
            _scroll.addChild(_txt1);
        }


        if (!self._schedule_danmu) {
            if (elements.length > 3) {
                var timeTotal = 0;
                _scroll.schedule(function() {
                    if (timeTotal == 0)
                        _scroll.scrollToPercentHorizontal(100, (100 - timeTotal) * 1.5, 0) // pos_to 位置稍微上调一点
                    timeTotal += 1;

                    self._schedule_danmu = true;
                    if (timeTotal > 100) {
                        timeTotal = 0;
                        _scroll.jumpToLeft();
                        // _scroll.jumpToPercentVertical(0);
                    }

                }, 0.5);
            }
        }

    },
    setNewName: function(name, length) {
        var _newName = name;
        var strlen = name.length;
        if (cc.isUndefined(length) || length == null) {
            length = 4; //默认名字限制6个字符
        }
        if (length < 4) {
            length = 4;
        }
        if (strlen >= length) {
            _newName = name.substring(0, length - 1);
            _newName += "...";
        }
        return _newName;
    },

    reqZhua: function(title) {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.lottery", {
                key: "DOLL",
                title: title
            },
            function(rtn) {
                cc.log(" ===== reqZhua lottery  === " + JSON.stringify(rtn))
                if (rtn.code == 0) {
                    self._onetime = true;
                    if (rtn.data && rtn.data.type) {
                        self._zhuaData = rtn.data;
                        self.luckyPrize_type = rtn.data.type;
                        self.luckyPrize_number = rtn.data.amount;
                    } else {
                        self._zhuaData = null;
                        self.luckyPrize_number = null;
                        self.luckyPrize_type = null;
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

    reqMainMsg: function() {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.lotteryMsg", {
                key: "DOLL"
            },
            function(rtn) {
                cc.log(" ===== reqMainMsg lotteryMsg === " + JSON.stringify(rtn))
                if (rtn.code == 0) {
                    self._data = rtn.data;
                    self.initMain();
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
    reqShare: function() {
        var self = this;
        MjClient.gamenet.request("pkplayer.handler.lotteryCallback", {key: "DOLL"},
            function(rtn) {
                if (rtn.code == 0) {
                    cc.log(" ===== lotteryCallback ===   " + JSON.stringify(rtn))
                    if (self.luckyPrize_type == 1) {
                        MjClient.showToast("元宝已发放到账户中");
                    } else if (self.luckyPrize_type == 2) {
                        MjClient.showToast("请去公众号领取");
                    }
                    self.addChild(new ZhuaWaWaBackLayer(self.luckyPrize_type, self.luckyPrize_number, false), 200);
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
    reqTodayShare: function() {
        var self = this;
        MjClient.gamenet.request("pkplayer.handler.lotteryShare", {key: "DOLL"},
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
    setCloseCallback: function(callback) {
        this._closeCallback = callback;
    }
});



/**
 * @Author:      Lms
 * @Email:       lms_190865480@163.com
 * @QQ:       190865480
 * @DateTime:     2018-04-11 
 * @Description: 中奖纪录 
 */


var ZhuaWaWa_listLayer = cc.Layer.extend({

    ctor: function(data) {
        this._super();
        var UI = ccs.load("Luckly_Rank.json");
        this.addChild(UI.node);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [0.676, 0.788], [0.5, 0.5], [0, 0]);

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {

                self.removeFromParent();
            }
        }, this);

        this._cell = _back.getChildByName("cell_prize");
        this._cell.visible = false;

        this._listDataCount = 0;
        this._ListView = _back.getChildByName("ListView_Prize");
        var _listViewState = 0;
        this._ListView.addCCSEventListener(function(sender, type) {
            switch (type) {
                case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                    if (_listViewState == 0) {
                        _listViewState = 1;
                    }
                    break;
                case ccui.ScrollView.EVENT_AUTOSCROLL_ENDED:
                    if (_listViewState == 1) {
                        self.reqprize(self._listDataCount, 15);
                    }
                    _listViewState = 0;
                    break;
            }
        });

        var text_desc = _back.getChildByName("Text_2");
        if (text_desc) {
            text_desc.ignoreContentAdaptWithSize(true);
            var str_1 = "温馨提示：现金红包请前往公众号（" + MjClient.systemConfig.gongzhonghao + "）领取，元宝实时到账。";
            text_desc.setString(str_1);
        }
        




        this._nullTip_text = _back.getChildByName("nullTip_text");
        this._nullTip_image = _back.getChildByName("nullTip_image");
        if (this._nullTip_text) {
            this._nullTip_text.visible = false;
            this._nullTip_image.visible = false;
        }

        this.reqprize(0, 15);

    },
    createItem: function(oneData) {
        if (!cc.sys.isObjectValid(this._cell)) return;
        var copyNode = this._cell.clone();
        copyNode.visible = true;

        var _time = copyNode.getChildByName("Text_time");
        var _tai = copyNode.getChildByName("Text_tai");
        var _content = copyNode.getChildByName("Text_content");
        var _timeStr = MjClient.dateFormat(new Date(parseInt(oneData.createTime)), 'yyyy-MM-dd hh:mm:ss');
        _content.ignoreContentAdaptWithSize(true);
        _time.ignoreContentAdaptWithSize(true);
        _time.setString(_timeStr);
        if (oneData.type == 1) {
            _content.setString("元宝X" + oneData.amount);
        } else if (oneData.type == 2) {
            _content.setString(oneData.amount + "元现金");
        } else {
            _content.setString("谢谢参与");
        }
        _tai.setString(oneData.remark);
        this._lastId = oneData.id;
        return copyNode;
    },
    addItems: function(data) {
        var _emailList = data;
        this._listDataCount += _emailList.length;
        for (var i = 0; i < _emailList.length; i++) {
            this._ListView.pushBackCustomItem(this.createItem(_emailList[i]));
        }

        if (this._listDataCount == 0) {
            if (this._nullTip_text) {
                this._nullTip_text.visible = true;
                this._nullTip_image.visible = true;
            } else {
                MjClient.showToast("已显示所有记录");
            }
        }
    },
    reqprize: function() {
        var self = this;
        var _lastId = this._lastId;
        MjClient.gamenet.request("pkplayer.handler.personLottery", {
                lastId: _lastId,
                key: "DOLL"
            },
            function(rtn) {
                if (rtn.code == 0) {
                    self.addItems(rtn.data);
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }

                }
            }
        );
    }
});


/**
 * @Author:      Lms
 * @Email:       lms_190865480@163.com
 * @QQ:       190865480
 * @DateTime:     2018-04-11 
 * @Description: 问题说明 
 */


var ZhuaWaWa_ruleLayer = cc.Layer.extend({
    ctor: function(data) {
        this._super();

        var UI = ccs.load("ZhuaWaWa_rule.json");
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
        
        var _wexin = MjClient.systemConfig.gongzhonghao;
        if (data && data.weixin) {
            _wexin = data.weixin;
        }
        if (MjClient.APP_TYPE.BDHYZP == MjClient.getAppType() ) {
            var _txt = "北斗";
        }else if (MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType() ) {
            var _txt = "天天";
        }else if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG){
            var _txt = "旺旺";
        }
        else {
            var _txt = "牌友联盟";
        }
        var str = "1、因网络波动影响，夹娃娃动画表现可能出现误差，最终结果以中奖为准 \n" +
            "2、实物奖中奖后，请在【中奖纪录】截图，联系客服微信“ " + _wexin + "” \n" +
            "3、实物奖品，不提供发票，中奖后，请在3天内联系客服，逾期将自动取消中奖资格 \n" +
            "4、获得现金奖励可到公众号(" + MjClient.systemConfig.gongzhonghao + ")-" + _txt + "红包领取";

        var text = this._back.getChildByName("Text_1");
        text.setString(str);


    }
});


/**
 * @Author:      Lms
 * @Email:       lms_190865480@163.com
 * @QQ:       190865480
 * @DateTime:     2018-04-12 
 * @Description: Description 
 */


var ZhuaWaWaBackLayer = cc.Layer.extend({

    jsBind: {
        back: {

            btn_share: {
                _click: function() {
                    if (cc.sys.OS_WINDOWS == cc.sys.os) {
                        MjClient.wxShareImageToPYQ = true;
                        postEvent("WX_SHARE_SUCCESS", {
                            errCode: 0
                        });
                    }
                    if (MjClient.ZhuaWaWa_mainUI.luckyPrize_type == 1) {
                        var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "ZhuaWaWa/participator_1.jpg";
                        MjClient.native.wxShareImageToPYQ(filePath);
                    } else if (MjClient.ZhuaWaWa_mainUI.luckyPrize_type == 2) {
                        var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "ZhuaWaWa/participator_1.jpg";
                        MjClient.native.wxShareImageToPYQ(filePath);
                    }

                },
                _event: {
                    WX_SHARE_SUCCESS: function(data) {
                        MjClient.wxShareImageToPYQ = false;
                        if (parseInt(data.errCode) == 0) {
                            if (MjClient.ZhuaWaWaBack_ui) {
                                MjClient.ZhuaWaWaBack_ui.getShare();
                                // MjClient.showToast("分享成功"); 回调已经有飘提示了
                            }

                        }
                    }
                },
            },
        }
    },
    ctor: function(type, number, isbool) {
        this._super();
        cc.log(" =========== type, number,isbool", type, number, isbool)
        var UI = ccs.load("ZhuaWaWa_Back.json");
        BindUiAndLogic(UI.node, this.jsBind);
        this.addChild(UI.node);
        MjClient.ZhuaWaWaBack_ui = this;
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
        for (var i = 2; i <= 3; i++) {
            for (var j = 1; j <= 2; j++) {
                this["_luckyNode_" + i].getChildByName("Text_" + j).setVisible(false);
            }
            this["_luckyNode_" + i].getChildByName("Image_1").setVisible(false);
            this["_luckyNode_" + i].getChildByName("Image_3").setVisible(false);
        }
        this["_luckyNode_" + 3].getChildByName("Image_2").setVisible(false);
        close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                MjClient.showMsg("取消分享会视为您放弃此次奖励哦 ！",
                    function() {
                        self.removeFromParent();
                    },
                    function() {}, "1");
            }
        }, this);

        this._list_suiji1= [];
        this._list_suiji2= [];
        this._list_suiji3= [];
        var node_xing  = _back.getChildByName("node_xing");
        for (var i = 1; i <= 23; i++) {
            this["xing_" + i] = node_xing.getChildByName("icon_xing_" + i);
            this["xing_" + i].setOpacity(0);
            this["xing_" + i].setScale(0.1);
            if (i%3 == 1) {
                this._list_suiji1.push(i);
            }else if (i%3 == 2) {
                this._list_suiji2.push(i);
            }else{
                this._list_suiji3.push(i);
            }
        }

        var shine_2 = function(list,number){
            var rotate_num = Math.random() > 0.5? 180: -180;
            for (var i = 0; i < list.length; i++) {
                var xing_num = list[i];
                self["xing_" + xing_num].runAction(cc.sequence(cc.delayTime(0.5*number),cc.spawn(cc.scaleTo(0.5,1), cc.fadeIn(0.5)),cc.delayTime(0.2), cc.spawn(cc.scaleTo(2,0.1),cc.fadeOut(2),cc.rotateBy(2,rotate_num),cc.delayTime(0.5*number))).repeatForever());
            }
        }.bind(this);

        shine_2(this._list_suiji1, 1);
        shine_2(this._list_suiji2, 2);
        shine_2(this._list_suiji3, 3);

        var guang_2 = function(node,number){
            var _Image_light_scale = node.getScale();
            var _time = number * 0.3;                        
            var a = cc.scaleTo(_time,_Image_light_scale*1.05);
            var aa = cc.fadeIn(_time);
            var a1 = cc.scaleTo(_time,_Image_light_scale*1.2);
            var a2 = cc.fadeOut(_time);
            var a3 = cc.callFunc(function(){
                node.setScale(_Image_light_scale*1.0);
                node.setOpacity(0);
            });
            node.runAction(cc.sequence(cc.spawn(a,aa),a3,cc.delayTime(0.1)).repeatForever());
        };

        var node_bg  = _back.getChildByName("node_bg");

        for (var i = 1; i <= 3; i++) {
            var _bg  = node_bg.getChildByName("bg_guang_" + i);
            _bg.setScale((1 + 0.1* i));
            _bg.setOpacity(122);
            guang_2(_bg,i);
        }








        var _btn_back = _back.getChildByName("btn_back");
        _btn_back.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                self.removeFromParent();
            }
        }, this);
        _btn_back.visible = false;

        if (!isbool) {
            // _block.addTouchEventListener(function(sender, type) {
            //     if (type == 2) {
            //         self.removeFromParent();
            //     }
            // }, this);
            _btn_share.setVisible(false);
            close.setVisible(false);
            _btn_back.setVisible(true);
            if (type == 1) {
                this._luckyNode_2.setVisible(true);
                var _img = this._luckyNode_2.getChildByName("Image_1")
                _img.setVisible(true);
                // var _img3 = this._luckyNode_2.getChildByName("Image_3")
                // _img3.setVisible(true);
                var _txt = this._luckyNode_2.getChildByName("Text_1")
                _txt.setVisible(true)
                _txt.setString("恭喜您获得" + number + "元宝奖励，请在游戏内查收");
            } else if (type == 2) {
                this._luckyNode_3.setVisible(true);
                var _img = this._luckyNode_3.getChildByName("Image_1")
                _img.setVisible(true);
                // var _img3 = this._luckyNode_3.getChildByName("Image_3")
                // _img3.setVisible(true);
                var _txt1 = this._luckyNode_3.getChildByName("Text_1")
                _txt1.setVisible(true)
                _txt1.setString("" + number);
                var _txt2 = this._luckyNode_3.getChildByName("Text_2")
                _txt2.setVisible(true)
                _txt2.setString("恭喜您获得" + number + "元红包奖励\n 请前往公众号领取");
            }
        } else {
            if (type == 1) {
                this._luckyNode_2.setVisible(true);
                var _img = this._luckyNode_2.getChildByName("Image_1")
                _img.setVisible(true);
                var _text_2 = this._luckyNode_2.getChildByName("Text_2")
                _text_2.setVisible(true);
            } else if (type == 2) {
                this._luckyNode_3.setVisible(true);
                var _img_2 = this._luckyNode_3.getChildByName("Image_2")
                var _text_2 = this._luckyNode_3.getChildByName("Text_2")
                _text_2.setVisible(true);
                _img_2.setVisible(true);
            } else {
                this._luckyNode_1.setVisible(true);
                _btn_share.setVisible(false);
                close.setVisible(false);
                _btn_back.setVisible(true);
                _block.setTouchEnabled(true);
                cc.log(" ---- _block ----------");
                // _block.addTouchEventListener(function(sender, type) {
                //     if (type == 2) {
                //         self.removeFromParent();
                //     }
                // }, this);
            }

        }
        this.runAction(cc.sequence(cc.delayTime(0.3),cc.callFunc(function(){
            MjClient.ZhuaWaWa_mainUI._gouzhong = false;
            MjClient.ZhuaWaWa_mainUI._schedule = true;
            MjClient.ZhuaWaWa_mainUI._canrun = true;
            MjClient.ZhuaWaWa_mainUI._fangxiang = !self._fangxiang;
            MjClient.ZhuaWaWa_mainUI._zhuaData = null;
        })));
        
        // var _btn_share = _back.getChildByName("btn_share");
        // _btn_share.addTouchEventListener(function(sender, type) {
        //     if (type == 2) {
        //         postEvent("capture_screen");
        //         MjClient.native.wxShareImage();
        //         this.reqShare();
        //     }
        // }, this);
    },
    getShare: function() {
        cc.log(" ============ZhuaWaWa_mainUI  ZhuaWaWa_mainUI")
        this.removeFromParent();
        MjClient.ZhuaWaWa_mainUI.reqShare();
    }


});