/**
 * Created by lms.
 */

var JFHXJ_mainLayer = cc.Layer.extend({

    ctor: function(data) {
        this._super();
        
        var UI = ccs.load("JFHXJ_main.json");
        this.addChild(UI.node);

        MjClient.JFHXJ_mainUI = this;


        var self = this;
        this._data = data;
        this._schedule = false;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);

        var closeBtn = this._back.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                MjClient.JFHXJ_mainUI = null;
                self.removeFromParent();
            }
        });

        this._text_fen = this._back.getChildByName("text_fen");
        this._text_fen.setString(data.integral);

        this._btn_rule = this._back.getChildByName("btn_rule");
        this._btn_rule.addTouchEventListener(function(sender,type){
            if (type == 2) {
                // MjClient.showMsg(data.explain,
                //         function() {},function() {});
                MjClient.Scene.addChild(new JFHXJ_ruleLayer());
            }
        },this)

        this._node_change = this._back.getChildByName("node_change");
        this._node_get = this._back.getChildByName("node_get");
        this._node_mylist = this._back.getChildByName("node_mylist");

        this._btn_change = this._back.getChildByName("btn_change");
        this._btn_get = this._back.getChildByName("btn_get");
        this._btn_mylist =this._back.getChildByName("btn_mylist");

        this._text_change = this._back.getChildByName("text_change");
        this._text_get = this._back.getChildByName("text_get");
        this._text_mylist = this._back.getChildByName("text_mylist");

        this._btn_change.addTouchEventListener(function(sender,type){
            if (type == 2) {
                this.select_jifen(1);

            }
        },this)

        this._btn_get.addTouchEventListener(function(sender,type){
            if (type == 2) {
                this.select_jifen(2);

            }
        },this)

        this._btn_mylist.addTouchEventListener(function(sender,type){
            if (type == 2) {
                this.select_jifen(3);

            }
        },this)

        this.select_jifen(1);

        this._change_scrollView = this._node_change.getChildByName("ScrollView_1");
        this._cell_hongbao = this._node_change.getChildByName("cell_change_hb");
        this._cell_hongbao.visible = false;
        this._cell_yuanbao = this._node_change.getChildByName("cell_change_yb");
        this._cell_yuanbao.visible = false;

        this._mylist_listView = this._node_mylist.getChildByName("listView_mylist");
        this._cell_mylist = this._node_mylist.getChildByName("cell_mylist");
        this._cell_mylist.visible = false;

        this._get_listView = this._node_get.getChildByName("listView");
        this._cell_get = this._node_get.getChildByName("cell_record");
        this._cell_get.visible = false;

        for (var i = 1; i < 7; i++) {
            this["get_text_" + i] = this._node_get.getChildByName("text_" + i);
            this["get_btn_" + i] = this._node_get.getChildByName("btn_" + i);
            this["get_btn_" + i].setTag(i);
            this["get_btn_" + i].addTouchEventListener(function(sender,type){
                if (type == 2) {
                    var tag = sender.getTag();
                    this.get_work(tag);
                }
                
            },this);

        }
        var self = this;
        UIEventBind(null, this.get_btn_2, "WX_SHARE_SUCCESS", function(data) { 
            if (parseInt(data.errCode) == 0 && MjClient.wxShareImageToPYQ == true) {
                MjClient.gamenet.request("pkplayer.handler.wxShare", {
                        type: 1
                    },
                    function(rtn) {
                        cc.log("===wxShare JFHXJ_mainLayer----------- " + JSON.stringify(rtn));
                        self.reqTableMsg();
                        // MjClient.showToast( rtn.message);
                    })
            }
            MjClient.wxShareImageToPYQ = false;
        });

        UIEventBind(null, this, "waitReady", function (eD) {
            this.removeFromParent();
        });
        this.refresh_table();
        
    },
    get_work:function(number){
        if (number == 1 && !this._data.todayRecvList["1"]) {
            cc.log(" ============= get_work   get_work  ======");
            this.reqGetJiFen(number);
        }else if (number == 2) {
            if (this._data.todayShare == 1 && !this._data.todayRecvList["2"] ) {
                this.reqGetJiFen(number);
            }else{
                //分享
                // MjClient.showToast(" 分享功能正在设计中，请等待...");
                if (cc.sys.OS_WINDOWS == cc.sys.os) {
                        MjClient.wxShareImageToPYQ = true;
                        postEvent("WX_SHARE_SUCCESS", {
                            errCode: 0
                        });
                    }
                var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "JFHXJ_res/bg_share.jpg";
                MjClient.native.wxShareImageToPYQ(filePath);
            }
        }else if (number == 3) {
            if (this._data.todayGame >= 1 && !this._data.todayRecvList["3"]) {
                this.reqGetJiFen(number);
            }else{
                postEvent("createRoom", {});
                this.removeFromParent();
            }
        }else if (number == 4) {
            if (this._data.todayGame >= 5 && !this._data.todayRecvList["4"]) {
                this.reqGetJiFen(number);
            }else{
                postEvent("createRoom", {});
                this.removeFromParent();
            }
        }else if (number == 5) {
            if (this._data.todayGame >= 10 && !this._data.todayRecvList["5"]) {
                this.reqGetJiFen(number);
            }else{
                postEvent("createRoom", {});
                this.removeFromParent();
            }
        }else if (number == 6) {
            if (this._data.todayGame >= 30 && !this._data.todayRecvList["6"]) {
                this.reqGetJiFen(number);
            }else{
                postEvent("createRoom", {});
                this.removeFromParent();
            }
        }

    },
    
    changeNode_createItem:function(oneData,number){
        var copyNode = this._cell_yuanbao.clone();        
        copyNode.visible = true;
        var sprite_bg = new cc.Sprite("JFHXJ_res/btn_hongbao.png");
        sprite_bg.setAnchorPoint(cc.p(0,0));
        var imageUrl = oneData.image;
        // cc.log(" =========222222 imageUrl sprite_bg  ",imageUrl,sprite_bg);
        cc.loader.loadImg(imageUrl ? imageUrl : "png/default_headpic.png",   {
            isCrossOrigin :  true
        },  function(err, img) {
            if (err) {
                cc.log(err);
            }
            else if (img && cc.sys.isObjectValid(sprite_bg))
            {
                sprite_bg.setTexture(img);
            }
        });
        var bg_1 = copyNode.getChildByName("img_bg");
        bg_1.visible = false;
        copyNode.addChild(sprite_bg,-1);
        var _txt1 = copyNode.getChildByName("text_1");
        _txt1.setString("");
        _txt1.visible = false;
        var _txt2 = copyNode.getChildByName("text_2");
        _txt2.setString("剩余" + oneData.limit + "份");
        var _txt3 = copyNode.getChildByName("text_3");
        _txt3.setString(oneData.price + "积分兑换");

        var btn_1 = copyNode.getChildByName("btn_1");;
        btn_1.data = oneData;
        if (this._data.integral < oneData.price) {
            btn_1.loadTextureNormal("JFHXJ_res/btn_1.png");
        }else{
            btn_1.loadTextureNormal("JFHXJ_res/btn_2.png");
        }
        btn_1.addTouchEventListener(function(sender,type){
            if (type == 2) {
                var pos_click = sender.getParent().getPosition();
                if (this._data.integral < sender.data.price) {
                    MjClient.Scene.addChild(new JFHXJ_tipLayer());
                }else{
                    this.reqExchange(sender.data);
                }
                
            }
        },this)

        this["changItem_" + number] = copyNode;
        return copyNode;

    },
    fresh_changeData:function(node,oneData){
        var copyNode = node;        
        var sprite_bg = new cc.Sprite("JFHXJ_res/btn_hongbao.png");
        sprite_bg.setAnchorPoint(cc.p(0,0));
        var imageUrl = oneData.image;
        // cc.log(" =========222222 imageUrl sprite_bg  ",imageUrl,sprite_bg);
        cc.loader.loadImg(imageUrl,   {
            isCrossOrigin :  true
        },  function(err, img) {
            if (err) {
                cc.log(err);
            }
            else if (img && cc.sys.isObjectValid(sprite_bg))
            {
                sprite_bg.setTexture(img);
            }
        });
        var bg_1 = copyNode.getChildByName("img_bg");
        bg_1.visible = false;
        copyNode.addChild(sprite_bg,-1);
        var _txt1 = copyNode.getChildByName("text_1");
        _txt1.setString("");
        _txt1.visible = false;
        var _txt2 = copyNode.getChildByName("text_2");
        _txt2.setString("剩余" + oneData.limit + "份");
        var _txt3 = copyNode.getChildByName("text_3");
        _txt3.setString(oneData.price + "积分兑换");

        var btn_1 = copyNode.getChildByName("btn_1");;
        btn_1.data = oneData;
        if (this._data.integral < oneData.price) {
            btn_1.loadTextureNormal("JFHXJ_res/btn_1.png");
        }else{
            btn_1.loadTextureNormal("JFHXJ_res/btn_2.png");
        }
        btn_1.addTouchEventListener(function(sender,type){
            if (type == 2) {
                var pos_click = sender.getParent().getPosition();

                if (this._data.integral < sender.data.price) {
                    MjClient.Scene.addChild(new JFHXJ_tipLayer());
                }else{
                    this.reqExchange(sender.data);
                }
                
            }
        },this)
    },
    changeNode_fresh:function(){
        var _List = this._data.productList;
        // for (var i = 0; i < 20; i++) {
        //     _List.push(_List[0]);
        // }
        // this._change_scrollView.removeAllChildren();
        
        for (var i = 0; i < _List.length; i++) {
            cc.log(" =======this[changItem_+ i] ",this["changItem_" + i])
            if (this["changItem_" + i]) {
                this.fresh_changeData(this["changItem_" + i], _List[i])
            } else {
                this._change_scrollView.setInnerContainerSize(cc.size(420, Math.ceil(_List.length / 5) * 320));
                var pos_topY = this._change_scrollView.getInnerContainerSize().height;
                if (cc.sys.isObjectValid(this._cell_hongbao)) {
                    var item = this.changeNode_createItem(_List[i], i);
                    // cc.log(" ======= item i ",item,i);
                    var lieshu = i % 5;
                    var hangshu = Math.floor(i / 5);
                    var pos_x = lieshu * 230;
                    var pos_y = pos_topY - hangshu * 320 - 320;
                    item.setPosition(cc.p(pos_x, pos_y));
                    // cc.log(" ====== x  y   lieshu hangshu=== ",pos_x,pos_y,lieshu,hangshu)

                    this._change_scrollView.addChild(item);
                }
            }
        }


    },
    myList_fresh:function(){
        var _myList = this._data.myExchangeList;
        this._mylist_listView.removeAllChildren();
        // for (var i = 0; i < 20; i++) {
        //     _myList.push(_myList[0]);
        // }
        for (var i = 0; i < _myList.length; i++) {

            if (cc.sys.isObjectValid(this._cell_mylist)) {
                this._mylist_listView.pushBackCustomItem(this.myList_createItem(_myList[i]));
            }


        }
    },
    myList_createItem:function(oneData)
    {
        var copyNode = this._cell_mylist.clone();
        copyNode.visible = true;

        var  sprite_bg = new cc.Sprite("JFHXJ_res/icon_hongbao.png");
        
        var _txt1 = copyNode.getChildByName("text_1");
        var _txt2 = copyNode.getChildByName("text_2");
        _txt1.setString(oneData.productTitle);        
        var time = MjClient.dateFormat(new Date(oneData.createTime), "yyyy/MM/dd");
        _txt2.setString(time);
        var icon = copyNode.getChildByName("icon");
        icon.visible = false;
        sprite_bg.setPosition(icon.getPosition())
        copyNode.addChild(sprite_bg);

        var imageUrl = oneData.productImage;
        
        // cc.log(" ========= imageUrl sprite_bg time ",imageUrl,sprite_bg,time);
         cc.loader.loadImg(imageUrl ? imageUrl : "png/default_headpic.png",   {
            isCrossOrigin :  true
        },  function(err, img) {
            if (err) {
                cc.log(err);
            }
            else if (img && cc.sys.isObjectValid(sprite_bg))
            {
                sprite_bg.setTexture(img);
            }
        });

        return copyNode;
    },
    getNode_fresh:function(){
        var self = this;
        for (var i = 1; i < 7; i++) {
            if (this._data.todayRecvList[i]) {
                this["get_btn_" + i].setTouchEnabled(false);
                this["get_btn_" + i].loadTextureNormal("JFHXJ_res/btn_get.png");
            }else{
                if (i == 1) {
                    if (!this._data.todayRecvList[i]) {
                        this["get_btn_" + i].loadTextureNormal("JFHXJ_res/btn_ok.png");
                    }
                }else if (i==2 ) {
                    if (this._data.todayShare >= 1) {
                        this["get_btn_" + i].loadTextureNormal("JFHXJ_res/btn_ok.png");
                    }else{
                        this["get_btn_" + i].loadTextureNormal("JFHXJ_res/btn_go.png");
                    }
                    
                }else if (i ==3 ) {
                    if (this._data.todayGame >= 1) {
                         this["get_btn_" + i].loadTextureNormal("JFHXJ_res/btn_ok.png");
                    }else{
                        this["get_btn_" + i].loadTextureNormal("JFHXJ_res/btn_go.png");
                    }
                }else if (i == 4) {
                    if (this._data.todayGame >= 5) {
                         this["get_btn_" + i].loadTextureNormal("JFHXJ_res/btn_ok.png");
                    }else{
                        this["get_btn_" + i].loadTextureNormal("JFHXJ_res/btn_go.png");
                    }
                }else if (i == 5) {
                    if (this._data.todayGame >= 10) {
                         this["get_btn_" + i].loadTextureNormal("JFHXJ_res/btn_ok.png");
                    }else{
                        this["get_btn_" + i].loadTextureNormal("JFHXJ_res/btn_go.png");
                    }
                }else if (i == 6) {
                    if (this._data.todayGame >= 30) {
                         this["get_btn_" + i].loadTextureNormal("JFHXJ_res/btn_ok.png");
                    }else{
                        this["get_btn_" + i].loadTextureNormal("JFHXJ_res/btn_go.png");
                    }
                }
            }


            
        }
        
        this.get_text_1.setString(this._data.todayLogin + "/1");
        var  txt_0 = this._data.todayShare >= 1? 1:this._data.todayShare;
        this.get_text_2.setString(txt_0 + "/1");
        var  txt_1 = this._data.todayGame >= 1? 1:this._data.todayGame;
        this.get_text_3.setString(txt_1 + "/1");
        var  txt_2 = this._data.todayGame >= 5? 5:this._data.todayGame;
        this.get_text_4.setString(txt_2 + "/5");
        var  txt_3 = this._data.todayGame >= 10? 10:this._data.todayGame;
        this.get_text_5.setString(txt_3 + "/10");
        var  txt_4 = this._data.todayGame >= 30? 30:this._data.todayGame;
        this.get_text_6.setString(txt_4 + "/30");
        
        var _scroll = this._get_listView;
        var _txt = this._cell_get;
        var elements = this._data.otherExchangeList;
        
        // elements.splice(7,elements.length-7); test
        cc.log(" ======== elements.length ",elements.length);
        _scroll.setInnerContainerSize(cc.size(440, elements.length * 40));
        _scroll.setScrollBarOpacity(0);
        _scroll.setTouchEnabled(false);
        
        var pos_topY = _scroll.getContentSize().height - _scroll.getInnerContainerSize().height;
        var pos_BotY = 0;
        var number_bar = pos_topY / 50;
        var per = 4000 * 5 / -pos_topY; // 每条3500像素高度 * 每次滚几条 
        var pos_to = 0;
        _scroll.removeAllChildren();
        
        
        for (var i = 0; i < elements.length; i++) {
            // cc.log(" -----i === ", i, elements[i],elements[i]["nickname"],elements[i]["productTitle"]);
            var _txt1 = _txt.clone();
            _txt1.visible = true;
            var _txt2 = ""
            if (i < elements.length - 1) {
                _txt2 += " 恭喜" + this.setNewName(unescape(elements[i]["nickname"]), 6) + "成功兑换" + (elements[i]["productTitle"]) +  "奖励"  + "\n\n";
            } else {
                _txt2 += " 恭喜" + this.setNewName(unescape(elements[i]["nickname"]), 6) + "成功兑换" + (elements[i]["productTitle"]) +  "奖励";
            }
            _txt1.setString(_txt2);
            _txt1.setFontSize(25);
            _txt1.setPosition(0, (elements.length - i -1) * 35 );
            _scroll.addChild(_txt1);
        }
        if (!self._schedule) {
            if (elements.length > 6) {
                _scroll.schedule(function() {

                    self._schedule = true;
                    if (pos_to >= 98) {
                        pos_to = -per;
                        //_scroll.jumpToBottom();
                        _scroll.jumpToTop();
                    }
                    pos_to = pos_to + per;
                    _scroll.scrollToPercentVertical(pos_to  , 1, 0.8) // pos_to 位置稍微上调一点
                }, 2);
            }  
        }       


    },
    select_jifen:function(number){
        var visible_1 = number == 1 ? 255:0;
        var visible_2 = number == 2 ? 255 : 0;
        var visible_3 = number == 3 ? 255 : 0;
        this._btn_change.setOpacity(visible_1);
        this._btn_get.setOpacity(visible_2);
        this._btn_mylist.setOpacity(visible_3);
        this._node_change.visible = number == 1;
        this._node_get.visible = number == 2;
        this._node_mylist.visible = number == 3;

        var color_1 = number == 1? cc.color(255,255,255):cc.color(255,243,180);
        var color_2 = number == 2? cc.color(255,255,255):cc.color(255,243,180);
        var color_3 = number == 3? cc.color(255,255,255):cc.color(255,243,180);
        this._text_change.setColor(color_1);
        this._text_get.setColor(color_2);
        this._text_mylist.setColor(color_3);

    },
    initSelf:function(){
        
    },

    refresh_table:function(){
        this._text_fen.setString(this._data.integral);
        this.getNode_fresh();
        this.myList_fresh();
        this.changeNode_fresh();
        

    },

    setNewName:function (name,length) {
        var _newName = name;
        var strlen = name.length;
        if(cc.isUndefined(length) || length == null)
        {
            length = 4;//默认名字限制6个字符
        }
        if(length < 4)
        {
            length  = 4;
        }
        if(strlen >= length)
        {
            _newName =  name.substring(0,length - 1);
            _newName += "...";
        }
        return _newName;
    },

    reqGetJiFen:function(number){
        var self = this;
        MjClient.block();
         MjClient.gamenet.request("pkplayer.handler.integralRecv", {type:number},
            function(rtn) {
                cc.log(" ===== integralRecv === " + JSON.stringify(rtn))
                if (rtn.code == 0) {
                    self.reqTableMsg();
                    MjClient.showToast("积分领取成功");
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
    reqTableMsg:function(){
        var self = this;
        MjClient.block();
         MjClient.gamenet.request("pkplayer.handler.integralInfo", {},
            function(rtn) {
                cc.log(" ===== integralInfo integralInfo === " + JSON.stringify(rtn))
                if (rtn.code == 0) {
                    self._data = rtn.data;
                    self.refresh_table();
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
    reqExchange:function(data){
        if (data.limit <= 0) {
            MjClient.showToast("兑换物品已不足，请选择其他物品");
            return;
        }
        var self = this;
        MjClient.block();
         MjClient.gamenet.request("pkplayer.handler.integralExchange", {id:data.id},
            function(rtn) {
                if (rtn.code == 0) {
                    MjClient.showToast("兑换成功");
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }
                }
                self.reqTableMsg();

                MjClient.unblock();
            }
        );

    },

});




var JFHXJ_tipLayer = cc.Layer.extend({

    ctor: function() {
        this._super();
        var UI = ccs.load("JFHXJ_tip.json");
        this.addChild(UI.node);
        var self = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [0.676, 0.788], [0.5, 0.5], [0, 0]);

        _block.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (MjClient.JFHXJ_mainUI) {
                    MjClient.JFHXJ_mainUI.select_jifen(2);
                }
                self.removeFromParent();
            }
        }, this);

      

    },
   
});


var JFHXJ_ruleLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var UI = ccs.load("JFHXJ_rule.json");
        this.addChild(UI.node);
        var self = this;

        var block = UI.node.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = UI.node.getChildByName("back");
        setWgtLayout(back, [0.828, 0.98], [0.5, 0.485], [0, 0]);
        this.back = back;

        var closeBtn = back.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                self.removeFromParent();
            }
        });

        
    },

    
});